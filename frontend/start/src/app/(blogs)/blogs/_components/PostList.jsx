
// import React from 'react';
// import CoverImage from './CoverImage';
// import Link from 'next/link';
// import { ClockIcon } from '@heroicons/react/24/outline';
// import Author from './Author';
// import PostInteraction from './PostInteraction';


// async function PostList({ posts }) {




//     return posts.length > 0 ? (
//         <div className="grid grid-cols-12 gap-8">
//             {posts.map((post) => (
//                 <div className="col-span-12 sm:col-span-6 lg:col-span-4 border border-secondary-100 p-2 rounded-lg" key={post._id}>
//                     <CoverImage {...post} />
//                     <div>
//                         <Link href={`/blogs/${post.slug}`}>
//                             <h2 className='mb-4 font-bold text-secondary-700'>
//                                 {post.title}
//                             </h2>
//                         </Link>

//                         <div className="flex items-center justify-between">
//                             <Author {...post.author} />
//                             <div className="flex items-center space-x-0.5 text-[10px] text-secondary-400">
//                                 <ClockIcon className='w-4 h-4 stroke-secondary-500' />
//                                 <span className="">خواندن : </span>
//                                 <span className=" leading-3">{post.readingTime}</span>
//                                 <span>دقیقه</span>
//                             </div>
//                             <div>
//                                 <PostInteraction post={post} />
//                             </div>
//                         </div>


//                     </div>
//                 </div>
//             ))}
//         </div>
//     ) : null

// }

// export default PostList;
import React from "react";
import CoverImage from "./CoverImage";
import Link from "next/link";
import { ClockIcon } from "@heroicons/react/24/outline";
import Author from "./Author";
import PostInteraction from "./PostInteraction";

async function PostList({ posts }) {
    if (!posts?.length) return null;

    return (
        <div className="grid grid-cols-12 gap-6 sm:gap-8">
            {posts.map((post) => (
                <div
                    key={post._id}
                    className="col-span-12 sm:col-span-6 lg:col-span-4 border border-secondary-100 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 bg-white flex flex-col"
                >
                    <CoverImage {...post} />

                    <div className="flex flex-col justify-between flex-1 p-4 space-y-3">
                        <div className="flex items-center justify-between mt-1">
                            <Link href={`/blogs/${post.slug}`}>
                                <h2 className="font-bold text-secondary-700 line-clamp-2 hover:text-primary-600 transition-colors duration-200">
                                    {post.title}
                                </h2>
                            </Link>
                            <Author {...post.author} />
                        </div>



                        <div className="flex items-center justify-between mt-auto">

                            <div className="flex items-center gap-1 text-xs text-secondary-500">
                                <ClockIcon className="w-4 h-4 stroke-secondary-500" />
                                <span>خواندن:</span>
                                <span>{post.readingTime}</span>
                                <span>دقیقه</span>
                            </div>
                            <PostInteraction post={post} />
                        </div>


                    </div>
                </div>
            ))}
        </div>
    );
}

export default PostList;
