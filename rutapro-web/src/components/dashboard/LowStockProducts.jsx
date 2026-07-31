import "./LowStockProducts.css";

function LowStockProducts({ products = [] }) {

  return (

    <div className="low-stock-card">

      <div className="low-stock-header">

        <h3>

          ⚠ Productos con bajo stock

        </h3>

        <span>

          Menos de 10 unidades

        </span>

      </div>

      {

        products.length === 0 ? (

          <div className="low-stock-empty">

            No hay productos con bajo stock.

          </div>

        ) : (

          <div className="low-stock-list">

            {

              products.map((product) => (

                <div

                  key={product.id}

                  className="low-stock-item"

                >

                  <div>

                    <h4>

                      {product.name}

                    </h4>

                    <p>

                      Código: {product.code || "-"}

                    </p>

                  </div>

                  <span className="low-stock-badge">

                    {product.stock} und

                  </span>

                </div>

              ))

            }

          </div>

        )

      }

    </div>

  );

}

export default LowStockProducts;