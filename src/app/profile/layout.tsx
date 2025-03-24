import Navbar from "@/Components/NavBar";
import Sidebar from "@/Components/Sidebar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="h-screen flex flex-col">
            {/* Navbar */}
            <Navbar />
            
            {/* Toast Notifications */}
            <ToastContainer position="top-right" autoClose={3000} />
            
            <div className="flex flex-1 overflow-hidden">
                {/* Sidebar (Only for profile pages) */}
                <div className="w-64 h-full "> {/* Adjust width of Sidebar as necessary */}
                    <Sidebar />
                </div>

                {/* Page Content */}
                <div className="flex-1 overflow-auto py-5 rounded-md">
                    {children}
                </div>
            </div>
        </div>
    );
}
