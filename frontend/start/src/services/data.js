import { cookies } from "next/headers";
import { getPosts } from "./PostServices";
import setCookieOnReq from "utils/setCookieOnReq";
import { getAllUserApi } from "./authService";
import { getAllCommentsApi } from "./commentService";

export default async function fetchCardData() {
  const cookieStore = await cookies();
  const options = setCookieOnReq(cookieStore);

  try {
    const data = await Promise.all([
      getAllUserApi(options),
      getAllCommentsApi(options),
      getPosts(),
    ]);

    const numberOfUsers = Number(data[0].users.length ?? "0");
    const numberOfPosts = Number(data[2].posts.length ?? "0");
    const numberOfComments = Number(data[1].commentsCount ?? "0");

    console.log(numberOfPosts);
    

    return {
      numberOfUsers,
      numberOfPosts,
      numberOfComments,
    };
  } catch (error) {
    console.log("error in fetchCardData" + error);

    throw new Error(
      "خطا در بارگذاری اطلاعات: " +
        (error.response?.data?.message || error.message)
    );
  }
}
