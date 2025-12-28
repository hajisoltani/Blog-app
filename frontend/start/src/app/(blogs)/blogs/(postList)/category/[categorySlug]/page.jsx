import { getPosts } from '@/services/PostServices';
import PostList from 'app/(blogs)/blogs/_components/PostList';
import { cookies } from 'next/headers';
import queryString from 'query-string';
import setCookieOnReq from 'utils/setCookieOnReq';


const Category = async ({ params, searchParams }) => {

    const { categorySlug } = await params
    const queries = `${queryString.stringify(
        await searchParams
    )}&categorySlug=${categorySlug}`;

    console.log({ queries });

    const cookieStore = await cookies()
    const options = setCookieOnReq(cookieStore)
    const { posts } = await getPosts(queries, options)


    return (
        <div>
            {
                posts.length === 0 ? <p className='text-lg text-secondary-600'>پستی در این دسته بندی پیدا نشد.</p> :
                    <PostList posts={posts} />
            }
        </div>
    );
}

export default Category;
