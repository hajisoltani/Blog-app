import Link from "next/link";

async function CategoryList() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/category/list`)
    const { data: { categories } } = await res.json()
    console.log(categories);


    return (
        <>
            <ul className="space-y-4">
                <li>
                    <Link href="/blogs">همه</Link>
                </li>

                {
                    categories.map(category => {
                        return (
                            <li key={category._id}>
                                <Link href={`/blogs/category/${category.slug}`}>
                                    {category.title}
                                </Link>
                            </li>
                        )
                    })
                }

            </ul>

        </>
    )

}


export default CategoryList