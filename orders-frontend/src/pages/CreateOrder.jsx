/* eslint-disable unicode-bom */
import { useState } from "react";
import { api } from "../api";
import { useNavigate } from "react-router-dom";

export default function CreateOrder() {
    const [cliente, setCliente] = useState("");
    const [produto, setProduto] = useState("");
    const [Quantidade, setQuantidade] = useState("");
    const navigate = useNavigate();

    const create = async () => {
        await api.post("/orders", {
            customer: cliente,
            product: produto,
            quantity: Number(Quantidade) // se for número
        })

        navigate("/");
    };

    return (
        <div className="p-6">
            <h1 className="text-xl font-bold mb-4">Novo Pedido</h1>

            <div className="space-y-4 max-w-md">
                <input className="border p-2 w-full"
                    placeholder="Cliente" value={cliente}
                    onChange={e => setCliente(e.target.value)} />

                <input className="border p-2 w-full"
                    placeholder="Produto" value={produto}
                    onChange={e => setProduto(e.target.value)} />

                <input className="border p-2 w-full"
                    placeholder="Quantidade" value={Quantidade}
                    onChange={e => setQuantidade(e.target.value)} />

                <button className="bg-blue-600 text-white px-4 py-2 rounded"
                    onClick={create}>
                    Criar Pedido
                </button>
            </div>
        </div>
    );
}
