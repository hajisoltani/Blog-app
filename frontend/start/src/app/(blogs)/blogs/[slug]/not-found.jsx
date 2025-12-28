"use client"

import Link from 'next/link';

const NotFound = () => {

    

    return (
        <div className="container xl:max-w-screen-xl">
            <div className="flex justify-center pt-10">
                <div>
                    <h1 className="text-xl font-bold text-secondary-700 mb-8">
                        پستی که دنبالش بودید، پیدا نشد
                    </h1>
                  <Link href='/blogs'>رفتن به صفحه پست ها</Link>
                </div>
            </div>
        </div>
    );
}

export default NotFound;
