import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

export default function MainLayout() {
    return (
        <>
            <Navbar />
            <div className="py-18 px-8 flex flex-col gap-4">
                <Outlet />
            </div>
        </>
    );
  }