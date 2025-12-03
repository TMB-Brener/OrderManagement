/* eslint-disable unicode-bom */
import { useEffect, useState } from "react";
import { api } from "../api";
import { Link } from "react-router-dom";

export default function OrdersList() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    api.get("/orders").then(res => setOrders(res.data));
  }, []);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Pedidos</h1>
        <Link
          to="/create"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Novo Pedido
        </Link>
      </div>

      <table className="w-full bg-white shadow rounded">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-3">Cliente</th>
            <th className="p-3">Produto</th>
            <th className="p-3">Valor</th>
            <th className="p-3">Status</th>
            <th className="p-3"></th>
          </tr>
        </thead>
        <tbody>
          {orders.map(o => (
            <tr key={o.id} className="border-b">
              <td className="p-3">{o.customer}</td>
              <td className="p-3">{o.product}</td>
              <td className="p-3">R$ {o.price}</td>
              <td className="p-3">
                <span className={`px-2 py-1 rounded text-white ${
                    o.status === "Pendente" ? "bg-yellow-500" :
                    o.status === "Processando" ? "bg-blue-500" :
                    "bg-green-600"
                }`}>
                  {o.status}
                </span>
              </td>
              <td className="p-3">
                <Link
                  to={`/orders/${o.id}`}
                  className="text-blue-600 hover:underline"
                >
                  Ver
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
