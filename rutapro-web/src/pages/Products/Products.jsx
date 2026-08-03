import { useEffect, useState } from "react";

import { useAuth } from "../../context/AuthContext";

import {
  Pencil,
  Trash2
} from "lucide-react";

import Sidebar from "../../components/dashboard/Sidebar";
import Topbar from "../../components/dashboard/Topbar";

import Table from "../../components/ui/Table/Table";
import Modal from "../../components/ui/Modal/Modal";
import ButtonIcon from "../../components/ui/ButtonIcon/ButtonIcon";

import ProductForm from "./ProductForm";

import {
  getProducts,
  deleteProduct
} from "../../services/products/productService";

import "./Products.css";


function Products() {


  const { profile } = useAuth();


  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);

  const [openModal, setOpenModal] = useState(false);

  const [selectedProduct, setSelectedProduct] = useState(null);




  console.log(
    "EMPRESA PRODUCTOS:",
    profile
  );




  useEffect(() => {


    if(profile?.companyId){

      loadProducts();

    }


  },[profile?.companyId]);







  const loadProducts = async()=>{


    try{


      const data = await getProducts(
        profile.companyId
      );


      console.log(
        "PRODUCTOS RECIBIDOS:",
        data
      );


      setProducts(data || []);



    }catch(error){


      console.error(
        "Error cargando productos:",
        error
      );


    }finally{


      setLoading(false);


    }


  };






  const handleProductSuccess = async()=>{


    setOpenModal(false);

    setSelectedProduct(null);

    await loadProducts();


  };







  const handleDelete = async(id)=>{


    const confirmDelete = window.confirm(
      "¿Seguro que deseas eliminar este producto?"
    );


    if(!confirmDelete) return;



    try{


      await deleteProduct(id);


      await loadProducts();



    }catch(error){


      console.error(
        "Error eliminando producto:",
        error
      );


    }


  };








  const columns = [


    {
      key:"name",
      label:"Producto"
    },


    {
      key:"category",
      label:"Categoría"
    },


    {
      key:"price",
      label:"Precio",

      render:(value)=>

        `$${Number(value).toLocaleString("es-CO")}`

    },


    {
      key:"stock",
      label:"Stock"
    }


  ];






  console.log(
    "ANTES DE RENDER PRODUCTS:",
    {
      products,
      loading,
      cantidad: products.length
    }
  );







  return (


    <div className="dashboard-layout">


      <Sidebar />



      <div className="dashboard-main">


        <Topbar />



        <main className="products-page">


          <div className="products-header">


            <div>

              <h1>
                Productos
              </h1>


              <p>
                Administra el catálogo de productos.
              </p>


            </div>





            <button

              className="add-product-button"

              onClick={()=>{

                setSelectedProduct(null);

                setOpenModal(true);

              }}

            >

              + Nuevo producto


            </button>



          </div>








          {

            loading ? (

              <p>
                Cargando productos...
              </p>


            ) : (


              <Table

                columns={columns}

                data={products}


                actions={(product)=>(


                  <>


                    <ButtonIcon

                      icon={
                        <Pencil size={18}/>
                      }

                      type="edit"

                      title="Editar"

                      onClick={()=>{

                        setSelectedProduct(product);

                        setOpenModal(true);

                      }}

                    />





                    <ButtonIcon

                      icon={
                        <Trash2 size={18}/>
                      }

                      type="delete"

                      title="Eliminar"

                      onClick={()=>{

                        handleDelete(product.id);

                      }}

                    />


                  </>


                )}

              />


            )


          }






        </main>



      </div>









      <Modal

        isOpen={openModal}

        onClose={()=>{

          setOpenModal(false);

          setSelectedProduct(null);

        }}

      >


        <ProductForm

          product={selectedProduct}

          onSuccess={handleProductSuccess}

        />


      </Modal>





    </div>


  );


}


export default Products;