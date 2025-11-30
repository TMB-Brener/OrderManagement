/* eslint-disable unicode-bom */
import { BrowserRouter, Routes, Route } from "react-router-dom";
import OrdersList from "./pages/OrdersList";
import CreateOrder from "./pages/CreateOrder";
import OrderDetails from "./pages/OrderDetails";

export default function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<OrdersList />} />
                <Route path="/create" element={<CreateOrder />} />
                <Route path="/orders/:id" element={<OrderDetails />} />
            </Routes>
        </BrowserRouter>
    );
}
