

import React, { Suspense } from "react";
import CategoryList from "../_components/CategoryList";
import Spinner from "@/ui/Spinner";
import Search from "@/ui/Search";
import BlogSort from "@/components/BlogSort";


const Layout = ({ children }) => {
    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-center text-secondary-700">
                <h1 className="text-lg font-bold text-center md:text-right">
                    لیست بلاگ‌ها
                </h1>
                <div className="md:col-span-1 lg:col-span-1">
                    <Suspense>
                        <Search />
                    </Suspense>

                </div>
                <div className="md:col-span-1 lg:col-span-1">
                    <Suspense>
                        <BlogSort />
                    </Suspense>
                </div>
            </div>

            <div className="grid grid-cols-12 gap-6">
                <aside className="col-span-12 lg:col-span-3 xl:col-span-2 text-secondary-500 space-y-4 ">
                    <Suspense fallback={<Spinner />}>
                        <CategoryList />
                    </Suspense>
                </aside>
                <section className="col-span-12 lg:col-span-9 xl:col-span-10 order-1 lg:order-2">
                    {children}
                </section>
            </div>
        </div>
    );
};

export default Layout;
