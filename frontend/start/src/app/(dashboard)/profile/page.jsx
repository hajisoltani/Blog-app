
import { Suspense } from "react";
import CardsWrapper from "./_componenets/CardsWrapper";
import Spinner from "@/ui/Spinner";
import LatestPosts from "./_componenets/LatestPosts";
import Fallback from "@/ui/Fallback";

async function Page() {


    return (
        <div>
            <h1 className="text-xl mb-8 text-secondary-700">داشبورد</h1>
            <Suspense fallback={<Fallback />}>
                <CardsWrapper />
            </Suspense>
            <h2 className="text-xl mb-8 text-secondary-600">آخرین پست ها</h2>
            <Suspense fallback={<Fallback />}>
                <LatestPosts />
            </Suspense>
            

        </div>
    );
}

export default Page;
