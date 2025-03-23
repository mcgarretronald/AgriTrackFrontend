import Navbar from "@/Components/NavBar";
import Sidebar from "@/Components/Sidebar";


export default function ProfileLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="overflow-hidden max-h-screen">
          <Navbar/>
          <div className="flex">
            {/* Sidebar (Only for /profile pages) */}
            <Sidebar/>

            {/* Page Content */}
            <div className="flex-1 ml-2 p-5 border">{children}</div>
        </div>
        </div>
    );
}
