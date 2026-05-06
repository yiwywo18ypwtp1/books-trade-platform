import SideBar from "@/components/SideBar";

export default function MainLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex">
            <SideBar />

            <main className="flex-1 bg-gray-50 min-h-screen">
                {children}
            </main>
        </div>
    );
}
