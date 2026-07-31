import { useEffect, useState } from "react";

import { useAuth } from "../../context/AuthContext";

import {
  addRoute,
  updateRoute
} from "../../services/routes/routeService";

import {
  assignOrdersToRoute,
  getAvailableOrders
} from "../../services/routes/routeAssignmentService";

import {
  getOrdersByIds
} from "../../services/orders/orderService";

import { getDrivers } from "../../services/drivers/driverService";

import { getVehicles } from "../../services/vehicles/vehicleService";

import "./RouteForm.css";


function RouteForm({
  route,
  mode,
  onSuccess
}) {

  const { profile } = useAuth();

  const isView = mode === "view";


  const [loading, setLoading] = useState(false);

  const [drivers, setDrivers] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [orders, setOrders] = useState([]);
  const [routeOrders, setRouteOrders] = useState([]);

  const [selectedOrders, setSelectedOrders] = useState([]);
  const [assignedOrders, setAssignedOrders] = useState([]);


  const [form, setForm] = useState({

    routeNumber: "",

    driverId: "",
    driverName: "",

    vehicleId: "",
    vehiclePlate: "",

    status: "Pendiente",

    notes: ""

  });



  useEffect(() => {

    if (profile?.companyId) {

      loadData();

    }

  }, [profile?.companyId]);



  useEffect(() => {

    const loadRouteOrders = async () => {

    if (route) {

      setForm({

        routeNumber: route.routeNumber || "",

        driverId: route.driverId || "",
        driverName: route.driverName || "",

        vehicleId: route.vehicleId || "",
        vehiclePlate: route.vehiclePlate || "",

        status: route.status || "Pendiente",

        notes: route.notes || ""

      });

      const orderIds = Array.isArray(route.orders)

        ?route.orders 

        
        : []


        setSelectedOrders(orderIds);

        if (orderIds.length > 0) {
          const ordersData = await getOrdersByIds(
            orderIds
          );


          setAssignedOrders(ordersData);

      } else {

        setAssignedOrders([]);

      }
        
     

    } else {

       setSelectedOrders([]);
       setAssignedOrders([]);



       setForm({
        routeNumber: "",

        driverId: "",
        driverName: "",

        vehicleId: "",
        vehiclePlate: "",

        status: "Pendiente",
        notes: ""

      });
         
  
    }

   };

    loadRouteOrders();

  }, [route]);




  const loadData = async () => {

    try {

      const driversData = await getDrivers(
        profile.companyId
      );


      const vehiclesData = await getVehicles(
        profile.companyId
      );


      const ordersData = await getAvailableOrders(
        profile.companyId,
        route?.id || null
      );


      setDrivers(driversData);

      setVehicles(vehiclesData);

      setOrders(ordersData);


    } catch (error) {

      console.error(
        "Error cargando datos de ruta:",
        error
      );

    }

  };




  const handleDriverChange = (e) => {

    const driver = drivers.find(
      item => item.id === e.target.value
    );


    if (!driver) return;


    setForm({

      ...form,

      driverId: driver.id,

      driverName: driver.fullName

    });

  };




  const handleVehicleChange = (e) => {

    const vehicle = vehicles.find(
      item => item.id === e.target.value
    );


    if (!vehicle) return;


    setForm({

      ...form,

      vehicleId: vehicle.id,

      vehiclePlate: vehicle.plate

    });

  };




  const handleOrderSelect = (id) => {

    setSelectedOrders(prev => {

      if (prev.includes(id)) {

        return prev.filter(
          item => item !== id
        );

      }


      return [
        ...prev,
        id
      ];

    });

  };




  const handleSubmit = async (e) => {

    e.preventDefault();


    if (loading) return;

    // AQUÍ VAN LAS VALIDACIONES

    if (!form.driverId) {

      alert("Por favor, seleccione un conductor.");


      return;
    
    } 
    
    if (!form.vehicleId) {


      alert("Por favor, seleccione un vehículo.");


      return;

    } 

    try {

      setLoading(true);



      const routeData = {

        ...form,

        orders: selectedOrders,

        totalOrders: selectedOrders.length

      };



      let routeId;



      if (route) {


        await updateRoute(
          route.id,
          routeData
        );


        routeId = route.id;



      } else {


        const response = await addRoute(
          routeData,
          profile.companyId
        );


        routeId = response.id;

      }



      if (selectedOrders.length > 0) {


        await assignOrdersToRoute(

          selectedOrders,

          routeId,

          profile.companyId

        );

      }



      if (onSuccess) {

        onSuccess();

      }



    } catch (error) {


      console.error(
        "Error guardando ruta:",
        error
      );


    } finally {

      setLoading(false);

    }

  };




  return (

    <form
      className="route-form"
      onSubmit={handleSubmit}
    >


      <h2>

        {
          isView

          ? "Detalle de la ruta"

          : route

           ? "Editar ruta"

           : "Nueva ruta"

        }

      </h2>




      <input

        name="routeNumber"

        placeholder="Número de ruta"

        value={form.routeNumber}

        onChange={(e) =>

          setForm({

            ...form,

            routeNumber: e.target.value

          })

        }

        disabled={isView}

        required

      />




      <label>
        Conductor
      </label>



      <select

        value={form.driverId}

        onChange={handleDriverChange}

        disabled={isView}

      >

        <option value="">
          Seleccionar conductor
        </option>


        {
          drivers.map(driver => (

            <option
              key={driver.id}
              value={driver.id}
            >

              {driver.fullName}

            </option>

          ))
        }

       

      </select>





      <label>
        Vehículo
      </label>



      <select

        value={form.vehicleId}

        onChange={handleVehicleChange}

        disabled={isView}

      >

        <option value="">
          Seleccionar vehículo
        </option>


        {
          vehicles.map(vehicle => (

            <option
              key={vehicle.id}
              value={vehicle.id}
            >

              {vehicle.plate}

            </option>

          ))
        }

       
       
      </select>





      <label>
        Estado
      </label>



      <select

        value={form.status}

        onChange={(e) =>



          setForm({

            ...form,

            status: e.target.value

          })

        

        }

        disabled={isView}

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


        <option value="Finalizada">
          Finalizada
        </option>


        <option value="Cancelada">
          Cancelada
        </option>


      </select>





      <label>
        {
          isView
          ? "Pedidos asignados"
          : "Pedidos disponibles"
        }

      </label>



      <div className="orders-selection">


        {
          isView ? (

           selectedOrders.length === 0 ? (

            <p>
              No hay pedidos disponibles
            </p>


          ) : (

            assignedOrders.map(order => (

              <div

                key={order.id}

                className="order-checkbox"

              >


              <strong> 
                Pedido #{order.orderNumber}
              </strong>

              <p>
                Cliente: {order.clientName}
              </p>  

              <p>
                Dirección: {order.address}
              </p>

              <p>
                Estado: {order.status}
              </p>

              <p>
                Total: ${order.total}
              </p>

            </div>

            ))

          )

          ) : (

            orders.length === 0 ? (

              <p>
                No hay pedidos disponibles
              </p>

            ) : (

              orders.map(order => (

                <label
                  key={order.id}
                  className="order-checkbox"
                >

                <input

                  type="checkbox"

                  checked={
                    selectedOrders.includes(
                      order.id
                    )
                  }

                  onChange={() =>
                    handleOrderSelect(
                      order.id
                    )
                  }

                  disabled={isView}

                />


                Pedido #

                {order.orderNumber}


              </label>

            ))

          )

          )

        }


      </div>





      <textarea

        name="notes"

        placeholder="Observaciones"

        value={form.notes}

        onChange={(e) =>

          setForm({

            ...form,

            notes: e.target.value

          })

        }

        disabled={isView}

      />




     {!isView && (


      <button

        type="submit"

        disabled={loading}

      >

        {
          loading
          ? "Guardando..."
          : "Guardar ruta"
        }


      </button>

      )}




    </form>

  );

}


export default RouteForm;