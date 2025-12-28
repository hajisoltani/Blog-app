import PostTable from "../posts/-/components/PostsTable";


export default function LatestPosts() {

    const query ="sort=latest&limit=5"
    return (
        <>
            <PostTable query={query} />
        </>
    );
}


