import { useState, useEffect } from "react";

import { useAuth } from "../../context/AuthContext";

import {
  addProduct,
  updateProduct
} from "../../services/products/productService";

import "./ProductForm.css";


function ProductForm({
  onSuccess,
  product
}) {

  const { profile } = useAuth();

  const [loading, setLoading] = useState(false);



  const [form, setForm] = useState({

    name: "",
    category: "",
    price: "",
    stock: "",

  });



  useEffect(() => {

    if (product) {

      setForm({

        name: product.name || "",
        category: product.category || "",
        price: product.price || "",
        stock: product.stock || "",

      });


    } else {

      setForm({

        name: "",
        category: "",
        price: "",
        stock: "",

      });

    }


  }, [product]);




  const handleChange = (e) => {

    setForm({

      ...form,

      [e.target.name]: e.target.value,

    });

  };





  const handleSubmit = async (e) => {

    e.preventDefault();


    if (loading) return;



    try {

      setLoading(true);



      const productData = {

        name: form.name,

        category: form.category,

        price: Number(form.price),

        stock: Number(form.stock),

      };




      if (product) {


        await updateProduct(
          product.id,
          productData
        );


      } else {


        console.log("ENVIANDO PRODUCTO:", {
          productData,
          companyId: profile.companyId
        });


        await addProduct(

          productData,

          profile.companyId

        );


      }




      setForm({

        name:"",
        category:"",
        price:"",
        stock:"",

      });



      onSuccess();



    } catch(error) {


      console.error(
        "Error guardando producto:",
        error
      );


    } finally {


      setLoading(false);


    }


  };





  return (


    <form

      className="product-form"

      onSubmit={handleSubmit}

    >



      <h2>

        {
          product
          ? "Editar producto"
          : "Nuevo producto"
        }

      </h2>




      <input

        name="name"

        placeholder="Nombre del producto"

        value={form.name}

        onChange={handleChange}

        required

      />




      <input

        name="category"

        placeholder="Categoría"

        value={form.category}

        onChange={handleChange}

        required

      />




      <input

        name="price"

        type="number"

        placeholder="Precio"

        value={form.price}

        onChange={handleChange}

        required

      />




      <input

        name="stock"

        type="number"

        placeholder="Stock"

        value={form.stock}

        onChange={handleChange}

        required

      />





      <button

        type="submit"

        disabled={loading}

      >

        {

          loading

          ? "Guardando..."

          : product

            ? "Actualizar producto"

            : "Guardar producto"

        }


      </button>



    </form>


  );

}


export default ProductForm;