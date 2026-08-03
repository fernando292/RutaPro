import { useEffect, useState } from "react";
import { getClients } from "../../services/clients/clientService";
import { getProducts } from "../../services/products/productService";
import { addOrder, updateOrder } from "../../services/orders/orderService";
import { useAuth } from "../../context/AuthContext";
import { validateStock } from "../../services/inventory/stockValidator";
import { discountStock, increaseStock } from "../../services/inventory/inventoryMovementService";
import "./OrderForm.css";

function OrderForm({ order, onSuccess }) {
  const { profile } = useAuth();

  const [loading, setLoading] = useState(false);
  const [clients, setClients] = useState([]);
  const [products, setProducts] = useState([]);

  const initialForm = {
    clientId: "",
    clientName: "",
    address: "",
    status: "Pendiente",
    items: []
  };

  const [form, setForm] = useState(initialForm);

  useEffect(() => {
    if (profile?.companyId) {
      loadData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile?.companyId]);

  useEffect(() => {
    if (order) {
      setForm({
        clientId: order.clientId || "",
        clientName: order.clientName || "",
        address: order.address || "",
        status: order.status || "Pendiente",
        items:
          order.items?.map((item) => ({
            rowId: Date.now() + Math.random(),
            productId: item.productId,
            productName: item.productName,
            price: Number(item.price) || 0,
            quantity: Number(item.quantity) || 1,
            subtotal: Number(item.subtotal) || (Number(item.price || 0) * Number(item.quantity || 1))
          })) || []
      });
    } else {
      // If no order, reset to initial form (optional)
      setForm(initialForm);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [order]);

  const loadData = async () => {
    try {
      const clientsData = await getClients(profile.companyId);
      const productsData = await getProducts(profile.companyId);
      setClients(clientsData || []);
      setProducts(productsData || []);
    } catch (error) {
      console.error("Error cargando datos:", error);
    }
  };

  const handleClientChange = (e) => {
    const value = e.target.value;
    if (!value) {
      // Clear client selection
      setForm((prev) => ({
        ...prev,
        clientId: "",
        clientName: "",
        address: ""
      }));
      return;
    }

    const client = clients.find((item) => String(item.id) === String(value));
    if (!client) return;

    setForm((prev) => ({
      ...prev,
      clientId: client.id,
      clientName: client.name,
      address: client.address || ""
    }));
  };

  const handleStatusChange = (e) => {
    setForm((prev) => ({
      ...prev,
      status: e.target.value
    }));
  };

  const addProductRow = () => {
    setForm((prev) => ({
      ...prev,
      items: [
        ...prev.items,
        {
          rowId: Date.now() + Math.random(),
          productId: "",
          productName: "",
          price: 0,
          quantity: 1,
          subtotal: 0
        }
      ]
    }));
  };

  const removeProductRow = (index) => {
    setForm((prev) => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index)
    }));
  };

  const handleProductChange = (index, productId) => {
    setForm((prev) => {
      const items = [...prev.items];
      // Ensure index exists
      if (!items[index]) return prev;

      if (!productId) {
        // Clear product selection for this row
        items[index] = {
          ...items[index],
          productId: "",
          productName: "",
          price: 0,
          subtotal: 0
        };
        return { ...prev, items };
      }

      const product = products.find((p) => String(p.id) === String(productId));
      if (!product) return prev;

      const price = Number(product.price) || 0;
      const quantity = Number(items[index].quantity) || 1;

      items[index] = {
        ...items[index],
        productId: product.id,
        productName: product.name,
        price,
        quantity,
        subtotal: price * quantity
      };

      return { ...prev, items };
    });
  };

  const handleQuantityChange = (index, quantityInput) => {
    const parsed = parseInt(quantityInput, 10);
    const value = Number.isNaN(parsed) ? 1 : Math.max(1, parsed);

    setForm((prev) => {
      const items = [...prev.items];
      if (!items[index]) return prev;

      const price = Number(items[index].price) || 0;
      items[index] = {
        ...items[index],
        quantity: value,
        subtotal: price * value
      };

      return { ...prev, items };
    });
  };

  const total = form.items.reduce((acc, item) => acc + (Number(item.subtotal) || 0), 0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    if (!form.clientId) {
      alert("Selecciona un cliente.");
      return;
    }

    if (!form.items || form.items.length === 0) {
      alert("Agrega productos al pedido.");
      return;
    }

    try {
      setLoading(true);

      // If editing, revert previous inventory movements before validating new one
      if (order?.items?.length) {
        try {
          await increaseStock(order.items, profile.companyId, "Reversión por edición de pedido");
        } catch (err) {
          console.error("Error revirtiendo inventario previo:", err);
          // Continue — let validation handle remaining issues
        }
      }

      const validation = await validateStock(form.items, profile.companyId);
      if (!validation.valid) {
        alert(validation.message || "Stock insuficiente para los productos seleccionados.");
        setLoading(false);
        return;
      }

      const orderData = {
        clientId: form.clientId,
        clientName: form.clientName,
        address: form.address,
        status: form.status,
        items: form.items.map((item) => ({
          productId: item.productId,
          productName: item.productName,
          price: item.price,
          quantity: item.quantity,
          subtotal: item.subtotal
        })),
        total,
        inventoryProcessed: true
      };

      if (order && order.id) {
        await updateOrder(order.id, orderData);
      } else {
        await addOrder({ ...orderData, createdAt: new Date() }, profile.companyId);
      }

      // Apply stock discount for the new order
      await discountStock(form.items, profile.companyId);

      setForm(initialForm);

      if (typeof onSuccess === "function") {
        await onSuccess();
      }
    } catch (error) {
      console.error("Error guardando pedido:", error);
      alert("Error guardando pedido");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="order-form" onSubmit={handleSubmit}>
      <h2>{order ? "Editar Pedido" : "Nuevo Pedido"}</h2>

      <label>Cliente</label>
      <select value={form.clientId ?? ""} onChange={handleClientChange} required>
        <option value="">Seleccione un cliente</option>
        {clients.map((client) => (
          <option key={client.id} value={client.id}>
            {client.name}
          </option>
        ))}
      </select>

      <label>Dirección</label>
      <input value={form.address ?? ""} readOnly />

      <label>Estado</label>
      <select value={form.status ?? "Pendiente"} onChange={handleStatusChange}>
        <option value="Pendiente">Pendiente</option>
        <option value="Preparando">Preparando</option>
        <option value="En ruta">En ruta</option>
        <option value="Entregado">Entregado</option>
        <option value="Cancelado">Cancelado</option>
      </select>

      <hr />

      <h3>Productos</h3>

      {form.items.map((item, index) => (
        <div key={item.rowId} className="order-product-row">
          <select
            value={item.productId ?? ""}
            onChange={(e) => handleProductChange(index, e.target.value)}
          >
            <option value="">Producto</option>
            {products.map((product) => (
              <option key={product.id} value={product.id}>
                {product.name}
              </option>
            ))}
          </select>

          <input
            type="number"
            min="1"
            value={item.quantity ?? 1}
            onChange={(e) => handleQuantityChange(index, e.target.value)}
          />

          <input readOnly value={`$${Number(item.price || 0).toLocaleString("es-CO")}`} />

          <input readOnly value={`$${Number(item.subtotal || 0).toLocaleString("es-CO")}`} />

          <button type="button" onClick={() => removeProductRow(index)}>
            Eliminar
          </button>
        </div>
      ))}

      <button type="button" onClick={addProductRow}>
        + Agregar producto
      </button>

      <hr />

      <h3>
        Total: $ {total.toLocaleString("es-CO")}
      </h3>

      <button type="submit" disabled={loading}>
        {loading ? "Guardando..." : order ? "Actualizar pedido" : "Guardar pedido"}
      </button>
    </form>
  );
}

export default OrderForm;