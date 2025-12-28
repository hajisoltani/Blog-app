

import Header from "./profile/_componenets/Header";
import SideBar from "./profile/_componenets/Sidebar";

export const metadata = {
  title: "پروفایل",
  description: "پروفایل",
};

export default function RootLayout({ children }) {
  return (
    <div className="bg-secondary-0 min-h-screen">
      <div className="grid lg:grid-cols-12 grid-rows-[auto_1fr] min-h-screen">
        <aside className="hidden lg:block lg:col-span-3 xl:col-span-2 row-span-2">
          <SideBar />
        </aside>
        <header className="col-span-12 lg:col-span-9 xl:col-span-10 bg-secondary-0  ">
          <Header />
        </header>
        <main className="col-span-12 lg:col-span-9 xl:col-span-10 bg-secondary-100 rounded-tr-3xl p-4 md:p-6 overflow-y-auto">
          <div className="xl:max-w-screen-xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}

