"use server";

import { deleteCommentApi } from "@/services/commentService";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import setCookieOnReq from "utils/setCookieOnReq";

export default async function deleteComment(
  currentState,
  { commentId, formData }
) {
  const cookieStore = await cookies();
  // const commentId = formData.get("commentId");

  if (!commentId) {
    return { error: "شناسه نظر نامعتبر است." };
  }

  try {
    const options = setCookieOnReq(cookieStore);
    const { message } = await deleteCommentApi(commentId, options);

    revalidatePath("/profile/comments");
    console.log({ message });

    return {
      message,
    };
  } catch (err) {
    const error = err?.response?.data?.message || "خطایی در حذف رخ داده است :(";
    console.log({ error });

    return {
      error,
    };
  }
}
