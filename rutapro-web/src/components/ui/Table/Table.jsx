import "./Table.css";

function formatValue(value) {

  const statusStyles = {
    Pendiente: "status pendiente",
    Preparando: "status preparando",
    "En ruta": "status ruta",
    Entregado: "status entregado",
    Cancelado: "status cancelado"
  };

  if (statusStyles[value]) {
    return (
      <span className={statusStyles[value]}>
        {value}
      </span>
    );
  }

  if (
    value &&
    typeof value === "object" &&
    value.seconds
  ) {
    return new Date(
      value.seconds * 1000
    ).toLocaleDateString("es-CO");
  }

  if (
    value === null ||
    value === undefined ||
    value === ""
  ) {
    return "-";
  }

  if (typeof value === "number") {
    return value.toLocaleString("es-CO");
  }

  if (typeof value === "object") {
    return JSON.stringify(value);
  }

  return value;
}

function Table({
  columns,
  data,
  actions
}) {

  return (
    <div className="table-container">

      <table className="table">

        <thead>
          <tr>

            {columns.map((column) => (
              <th key={column.key}>
                {column.label}
              </th>
            ))}

            {actions && (
              <th>Acciones</th>
            )}

          </tr>
        </thead>

        <tbody>

          {data.length === 0 ? (

            <tr>
              <td
                colSpan={
                  columns.length +
                  (actions ? 1 : 0)
                }
              >
                No hay datos disponibles
              </td>
            </tr>

          ) : (

            data.map((row) => (

              <tr key={row.id}>

                {columns.map((column) => (

                  <td key={column.key}>

                    {column.render
                      ? column.render(
                          row[column.key],
                          row
                        )
                      : formatValue(
                          row[column.key]
                        )}

                  </td>

                ))}

                {actions && (
                  <td>
                    {actions(row)}
                  </td>
                )}

              </tr>

            ))

          )}

        </tbody>

      </table>

    </div>
  );
}

export default Table;