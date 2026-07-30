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

import { getDrivers } from "../../services/drivers/driverService";

import { getVehicles } from "../../services/vehicles/vehicleService";

import "./RouteForm.css";


function RouteForm({
  route,
  onSuccess
}) {

  const { profile } = useAuth();


  const [loading, setLoading] = useState(false);

  const [drivers, setDrivers] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [orders, setOrders] = useState([]);

  const [selectedOrders, setSelectedOrders] = useState([]);


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

    }

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
        profile.companyId
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

        orders: selectedOrders.length

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
          route
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

        required

      />




      <label>
        Conductor
      </label>



      <select

        value={form.driverId}

        onChange={handleDriverChange}

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
        Pedidos disponibles
      </label>



      <div className="orders-selection">


        {
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

                />


                Pedido #

                {order.orderNumber}


              </label>

            ))

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

      />





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




    </form>

  );

}


export default RouteForm;