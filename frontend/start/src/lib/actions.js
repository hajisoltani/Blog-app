"use server";

import { createCommentApi } from "@/services/commentService";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import setCookieOnReq from "utils/setCookieOnReq";

// export async function createComment(postId, parentId, formData) {

export async function createComment(prevState, { formData, postId, parentId }) {
  const cookiesStore = await cookies();
  const options = await setCookieOnReq(cookiesStore);

  const rawFormData = {
    postId,
    parentId,
    text: formData.get("text"),
  };

  try {
    const { message } = await createCommentApi(rawFormData, options);
    revalidatePath("/blogs");
    return { message };
  } catch (err) {
    const error = err?.response?.data?.message;
    return { error };
  }
}
