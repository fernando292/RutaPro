import { useEffect, useState } from "react";

import { getClients } from "../../services/clientService";
import { getProducts } from "../../services/productService";
import { addOrder } from "../../services/orderService";
import { useAuth } from "../../context/AuthContext";

import "./OrderForm.css";


function OrderForm({ onSuccess }) {
  
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

    loadData();

  }, []);



  const loadData = async () => {

    try {

      const clientsData = await getClients();

      const productsData = await getProducts();


      setClients(clientsData);

      setProducts(productsData);


    } catch (error) {

      console.error(
        "Error cargando datos:",
        error
      );

    }

  };



  const handleClientChange = (e) => {

    const client = clients.find(
      item => item.id === e.target.value
    );


    if (!client) return;


    setForm(prev => ({

      ...prev,

      clientId: client.id,

      clientName: client.name,

      address: client.address || ""

    }));

  };



  const handleStatusChange = (e) => {

    setForm(prev => ({

      ...prev,

      status: e.target.value

    }));

  };



  const addProductRow = () => {

    setForm(prev => ({

      ...prev,

      items: [

        ...prev.items,

        {

          rowId: Date.now(),

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


    setForm(prev => ({

      ...prev,

      items: prev.items.filter(
        (_, i) => i !== index
      )

    }));

  };



  const handleProductChange = (
    index,
    productId
  ) => {


    const product = products.find(
      item => item.id === productId
    );


    if (!product) return;



    setForm(prev => {


      const items = [...prev.items];


      items[index] = {

        ...items[index],

        productId: product.id,

        productName: product.name,

        price: Number(product.price) || 0,

        subtotal:
          (Number(product.price) || 0) *
          Number(items[index].quantity || 1)

      };


      return {

        ...prev,

        items

      };


    });


  };



  const handleQuantityChange = (
    index,
    quantity
  ) => {


    const value = Math.max(
      1,
      Number(quantity)
    );



    setForm(prev => {


      const items = [...prev.items];


      items[index] = {

        ...items[index],

        quantity: value,

        subtotal:
          Number(items[index].price) *
          value

      };


      return {

        ...prev,

        items

      };


    });


  };




  const total = form.items.reduce(

    (acc, item) =>

      acc + Number(item.subtotal || 0),

    0

  );




  const handleSubmit = async (e) => {


    e.preventDefault();



    if (loading) return;



    if (!form.clientId) {

      alert(
        "Selecciona un cliente."
      );

      return;

    }



    if (form.items.length === 0) {

      alert(
        "Debes agregar productos."
      );

      return;

    }



    const invalidProduct =
      form.items.some(
        item =>
          !item.productId ||
          item.quantity <= 0
      );



    if (invalidProduct) {

      alert(
        "Revisa los productos agregados."
      );

      return;

    }



    try {


      setLoading(true);

      console.log("PROFILE:", profile);

      console.log("COMPANY ID:", profile?.companyId);

      await addOrder(
        
        {

        clientId: form.clientId,

        clientName: form.clientName,

        address: form.address,

        status: form.status,

        items: form.items.map(item => ({

          productId: item.productId,

          productName: item.productName,

          price: item.price,

          quantity: item.quantity,

          subtotal: item.subtotal

        })),

        total,

        createdAt: new Date()

      },

        profile.companyId


     );

      setForm(initialForm);



      if (onSuccess) {

        onSuccess();

      }



    } catch (error) {


      console.error(
        "Error creando pedido:",
        error
      );


    } finally {


      setLoading(false);


    }


  };



  return (

    <form
      className="order-form"
      onSubmit={handleSubmit}
    >


      <h2>
        Nuevo Pedido
      </h2>



      <label>
        Cliente
      </label>


      <select

        value={form.clientId}

        onChange={handleClientChange}

        required

      >

        <option value="">
          Seleccione un cliente
        </option>


        {clients.map(client => (

          <option
            key={client.id}
            value={client.id}
          >

            {client.name}

          </option>

        ))}


      </select>




      <label>
        Dirección
      </label>


      <input

        type="text"

        value={form.address}

        readOnly

      />




      <label>
        Estado
      </label>


      <select

        value={form.status}

        onChange={handleStatusChange}

      >

       <option value="Pendiente">
         Pendiente
       </option>

       <option value="Preparando">
         Preparando
       </option>

       <option value="En ruta">
          En ruta
       </option>

       <option value="Entregado">
          Entregado
       </option>

        <option value="Cancelado">
         Cancelado
        </option>

      </select>




      <hr />



      <h3>
        Productos
      </h3>




      {

        form.items.map((item,index)=>(


          <div

            key={item.rowId}

            className="order-product-row"

          >



            <select

              value={item.productId}

              onChange={(e)=>

                handleProductChange(
                  index,
                  e.target.value
                )

              }

            >


              <option value="">
                Producto
              </option>



              {

                products.map(product=>(


                  <option

                    key={product.id}

                    value={product.id}

                  >

                    {product.name}

                  </option>


                ))

              }


            </select>




            <input

              type="number"

              min="1"

              value={item.quantity}

              onChange={(e)=>

                handleQuantityChange(
                  index,
                  e.target.value
                )

              }

            />




            <input

              type="text"

              value={`$${Number(item.price).toLocaleString("es-CO")}`}

              readOnly

            />




            <input

              type="text"

              value={`$${Number(item.subtotal).toLocaleString("es-CO")}`}

              readOnly

            />




            <button

              type="button"

              onClick={()=>
                removeProductRow(index)
              }

            >

              Eliminar

            </button>



          </div>


        ))

      }





      <button

        type="button"

        onClick={addProductRow}

      >

        + Agregar producto

      </button>




      <hr />




      <h3>

        Total:
        {" "}
        ${total.toLocaleString("es-CO")}

      </h3>




      <button

        type="submit"

        disabled={loading}

      >

        {

          loading
          ? "Guardando..."
          : "Guardar pedido"

        }


      </button>



    </form>

  );

}



export default OrderForm;