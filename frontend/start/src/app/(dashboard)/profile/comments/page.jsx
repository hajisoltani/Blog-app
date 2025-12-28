import React, { Suspense } from 'react';
import CommentsTable from './-/componenets/CommentsTable';

const Page = () => {
    return (
        <div>
            <div className="flex items-center justify-between">
                <h1 className="text-secondary-700 mb-8 font-bold text-xl">
                    لیست نظرات
                </h1>
            </div>
            <Suspense>
                <CommentsTable />
            </Suspense>

        </div>
    );
}

export default Page;
