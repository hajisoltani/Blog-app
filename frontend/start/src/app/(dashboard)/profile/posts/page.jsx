import React, { Suspense } from 'react';
import PostTable from './-/components/PostsTable';
import Fallback from '@/ui/Fallback';
import Search from '@/ui/Search';
import { CreatePost } from './-/components/Button';
import queryString from 'query-string';
import { getPosts } from '@/services/PostServices';
import Pagination from '@/ui/Pagination';

async function Page({ searchParams }) {
    const query = queryString.stringify(await searchParams);
    console.log(query);
    

    const { totalPages } = await getPosts(query)
   

    return (
        <div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 text-secondary-700 mb-12 items-center">
                <h1 className="font-bold text-xl">لیست پست ها </h1>
                <Search />
                <CreatePost />
            </div>
            <Suspense fallback={<Fallback />} key={query}>
                <PostTable query={query} />
            </Suspense>
            <div className="flex w-full justify-center mt-5">
                <Pagination totalPages={totalPages} />
            </div>
        </div>

    );
}

export default Page;
