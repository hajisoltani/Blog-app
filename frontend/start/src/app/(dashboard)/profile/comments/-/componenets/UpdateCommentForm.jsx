"use Client"

import RHFSelect from "@/ui/RHFSelect"
import SubmitButton from "@/ui/SubmitButton"
import { useActionState, useEffect } from "react"
import { updateComment } from "../actions/updateComment"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"




const options = [
    {
        id: 1,
        label: "رد شده",
        value: 0,
    },
    {
        id: 2,
        label: "در انتظار تایید",
        value: 1,
    },
    {
        id: 3,
        label: "قبول",
        value: 2,
    },
]


export default function UpdateCommentForm({ onClose, comment }) {

    const [state, formAction] = useActionState(updateComment, {
        error: "",
        message: ""
    })
    const { register } = useForm({
        status: comment.status
    })

    useEffect(() => {
        if (state?.message) {
            toast.success(state.message)
            onClose()
        }
        if (state?.error) {
            toast.error(state.error)
        }
    }, [state])

    return (
        <form
            className="form"
            action={async (formData) => formAction({ formData, commentId: comment._id })}

        >
            <RHFSelect
                label="تغییر وضعیت"
                isRequired
                name="status"
                register={register}
                options={options}
            />
            <SubmitButton type="submit" varient="primary" className="w-full" >تایید</SubmitButton>
        </form>

    )
}