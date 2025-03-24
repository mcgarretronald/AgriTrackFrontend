import Navbar from "@/Components/NavBar";
import Sidebar from "@/Components/Sidebar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="overflow-hidden min-h-screen">
            <Navbar />
            <ToastContainer position="top-right" autoClose={3000} />
            <div className="flex">
                {/* Sidebar (Only for profile pages) */}
                <Sidebar />

                {/* Page Content */}
                <div className="flex-1 ml-2 p-5">{children}</div>
            </div>
        </div>
    );
}
