"use client";

import deleteComment from "../actions/deleteComment";
import { startTransition, useActionState, useEffect, useState } from "react";
import toast from "react-hot-toast";
import ButtonIcon from "@/ui/ButtonIcon";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import Modal from "@/ui/Modal";
import ConfirmDelete from "@/ui/ConfirmDelete";
import UpdateCommentForm from "./UpdateCommentForm";





export function DeleteComment({ id: commentId }) {
    const [formState, formAction] = useActionState(deleteComment, {
        error: "",
        message: ""
    });

    const [isDeleteOpen, setIsDeleteOpen] = useState(false);

    useEffect(() => {
        if (formState.message) {
            toast.success(formState.message);
            setIsDeleteOpen(false);
        }
        if (formState.error) {
            toast.error(formState.error);
        }
    }, [formState]);


    return (
        <>
            <ButtonIcon variant="outline" onClick={() => setIsDeleteOpen(true)}>
                <TrashIcon className="text-error" />
            </ButtonIcon>
            <Modal
                title={`حذف نظر`}
                open={isDeleteOpen}
                onClose={() => setIsDeleteOpen(false)}
            >
                <ConfirmDelete
                    title={`حذف نظر`}
                    onClose={() => setIsDeleteOpen(false)}
                    onConfirm={async (formData) => formAction({ formData, commentId })}

                />
            </Modal>
        </>
    );
}


export function UpdateComment({ comment }) {
    const [isEditOpen, setIsEditOpen] = useState(false)

    const onCLose = () => setIsEditOpen(false)

    return (
        <>

            <ButtonIcon variant="outline" onClick={() => setIsEditOpen(true)}>
                <PencilIcon />
            </ButtonIcon>
            <Modal title={"ویرایش نظر"} open={isEditOpen} onClose={onCLose}>
                <UpdateCommentForm onClose={onCLose} comment={comment} />

            </Modal>

        </>
    )
}



// {(event) => {
//                         event.preventDefault();
//                         event.stopPropagation();
//                         const fd = new FormData();
//                         fd.append("commentId", commentId);
//                         startTransition(() => {
//                             formAction(fd);
//                         });
//                     }}