import { useEffect, useMemo, useState, useCallback } from "react";

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

  const initialForm = useMemo(
    () => ({
      clientId: "",
      clientName: "",
      address: "",
      status: "Pendiente",
      items: []
    }),
    []
  );

  const [form, setForm] = useState(initialForm);

  // helper id generator with fallback
  const genId = useCallback(() => {
    try {
      // prefer crypto.randomUUID if available
      // eslint-disable-next-line no-undef
      return typeof crypto !== "undefined" && crypto.randomUUID
        ? crypto.randomUUID()
        : Math.random().toString(36).slice(2, 9);
    } catch {
      return Math.random().toString(36).slice(2, 9);
    }
  }, []);

  const loadData = useCallback(async () => {
    if (!profile?.companyId) return;

    try {
      const [clientsData, productsData] = await Promise.all([
        getClients(profile.companyId),
        getProducts(profile.companyId)
      ]);
      setClients(clientsData || []);
      setProducts(productsData || []);
    } catch (error) {
      console.error("Error cargando datos:", error);
    }
  }, [profile?.companyId]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // populate form when editing an order
  useEffect(() => {
    if (!order) {
      setForm(initialForm);
      return;
    }

    setForm({
      clientId: order.clientId || "",
      clientName: order.clientName || "",
      address: order.address || "",
      status: order.status || "Pendiente",
      items:
        order.items?.map((item) => ({
          rowId: genId(),
          productId: item.productId,
          productName: item.productName,
          price: Number(item.price) || 0,
          quantity: Number(item.quantity) || 0,
          subtotal: Number(item.subtotal) || 0
        })) || []
    });
  }, [order, initialForm, genId]);

  const handleClientChange = useCallback(
    (e) => {
      const clientId = e.target.value;
      const client = clients.find((item) => String(item.id) === String(clientId));
      if (!client) {
        // If the selection is cleared
        setForm((prev) => ({ ...prev, clientId: "", clientName: "", address: "" }));
        return;
      }
      setForm((prev) => ({
        ...prev,
        clientId: client.id,
        clientName: client.name,
        address: client.address
      }));
    },
    [clients]
  );

  const handleStatusChange = useCallback((e) => {
    setForm((prev) => ({ ...prev, status: e.target.value }));
  }, []);

  const addProductRow = useCallback(() => {
    setForm((prev) => ({
      ...prev,
      items: [
        ...prev.items,
        {
          rowId: genId(),
          productId: "",
          productName: "",
          price: 0,
          quantity: 1,
          subtotal: 0
        }
      ]
    }));
  }, [genId]);

  const removeProductRow = useCallback((index) => {
    setForm((prev) => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index)
    }));
  }, []);

  const handleProductChange = useCallback(
    (index, productId) => {
      const product = products.find((item) => String(item.id) === String(productId));
      if (!product) return;

      setForm((prev) => {
        const items = [...prev.items];
        const qty = Number(items[index]?.quantity) || 1;
        const price = Number(product.price) || 0;
        items[index] = {
          ...items[index],
          productId: product.id,
          productName: product.name,
          price,
          subtotal: price * qty
        };
        return { ...prev, items };
      });
    },
    [products]
  );

  const handleQuantityChange = useCallback((index, value) => {
    const quantity = Number(value) || 0;
    setForm((prev) => {
      const items = [...prev.items];
      const price = Number(items[index]?.price) || 0;
      items[index] = {
        ...items[index],
        quantity,
        subtotal: price * quantity
      };
      return { ...prev, items };
    });
  }, []);

  const total = useMemo(() => {
    return form.items.reduce((acc, item) => acc + Number(item.subtotal || 0), 0);
  }, [form.items]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    if (!form.clientId) {
      alert("Selecciona un cliente.");
      return;
    }

    if (form.items.length === 0) {
      alert("Agrega al menos un producto.");
      return;
    }

    try {
      setLoading(true);

      // If editing an existing order, revert previous stock first
      if (order?.items?.length) {
        await increaseStock(order.items, profile.companyId, "Reversión por edición");
      }

      const validation = await validateStock(form.items, profile.companyId);
      if (!validation.valid) {
        alert(validation.message);
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
          quantity: Number(item.quantity),
          price: Number(item.price),
          subtotal: Number(item.subtotal)
        })),
        total,
        inventoryProcessed: true
      };

      if (order) {
        await updateOrder(order.id, orderData);
      } else {
        await addOrder(orderData, profile.companyId);
      }

      // Discount the current form items from stock
      await discountStock(form.items, profile.companyId);

      // reset form only when creating a new order (optional: keep for both)
      setForm(initialForm);

      if (typeof onSuccess === "function") onSuccess();
    } catch (error) {
      console.error(error);
      alert(error?.message || "Error guardando pedido.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="order-form" onSubmit={handleSubmit}>
      <h2>{order ? "Editar Pedido" : "Nuevo Pedido"}</h2>

      <label>Cliente</label>
      <select value={form.clientId} onChange={handleClientChange} required>
        <option value="">Seleccione un cliente</option>
        {clients.map((client) => (
          <option key={client.id} value={client.id}>
            {client.name}
          </option>
        ))}
      </select>

      <label>Dirección</label>
      <input value={form.address} readOnly />

      <label>Estado</label>
      <select value={form.status} onChange={handleStatusChange}>
        <option>Pendiente</option>
        <option>Preparando</option>
        <option>En ruta</option>
        <option>Entregado</option>
        <option>Cancelado</option>
      </select>

      <hr />
      <h3>Productos</h3>

      {form.items.map((item, index) => (
        <div key={item.rowId} className="order-product-row">
          <select
            value={item.productId}
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
            value={item.quantity}
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