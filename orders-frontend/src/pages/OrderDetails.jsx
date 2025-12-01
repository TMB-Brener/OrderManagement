/* eslint-disable unicode-bom */
import { useEffect, useState } from "react";
import { api } from "../api";
import { useParams } from "react-router-dom";

export default function OrderDetails() {
    const { id } = useParams();
    const [order, setOrder] = useState(null);

    useEffect(() => {
        api.get(`/orders/${id}`).then(res => setOrder(res.data));
    }, [id]);

    if (!order) return <p className="p-6">Carregando...</p>;

    return (
        <div className="p-6">
            <h1 className="text-xl font-bold mb-4">Detalhes do Pedido</h1>

            <div className="space-y-2">
                <p><strong>Cliente:</strong> {order.customer}</p>
                <p><strong>Produto:</strong> {order.product}</p>
                <p><strong>Valor:</strong> R$ {order.price}</p>
                <p><strong>Status:</strong> {order.status}</p>
                <p><strong>Data:</strong> {order.DateCreated}</p>
            </div>
        </div>
    );
}
