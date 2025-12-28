"use server";

import { updateCommentApi } from "@/services/commentService";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import setCookieOnReq from "utils/setCookieOnReq";

export async function updateComment(prevState, { commentId, formData }) {
  const cookieStore = cookies();

  const data = {
    status: formData.get("status"),
  };

  try {
    const options = setCookieOnReq(cookieStore);
    const { message } = await updateCommentApi(
      { id: commentId, data },
      options
    );

    revalidatePath("/profile/comments");

    return {
      message,
    };
  } catch (err) {
    const error = err?.response?.data?.message;
    console.log(error);

    return { error };
  }
}
