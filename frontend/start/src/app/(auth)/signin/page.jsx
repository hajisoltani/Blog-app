'use client'

import RHFTextField from "@/ui/RHFTextField";
import { useForm } from "react-hook-form";
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { useAuth } from "@/context/AuthContext";
import SpinnerMini from "@/ui/SpinnerMini";
import Button from "@/ui/Button";
import Link from "next/link";



export const metaData = {
    title: "ورود"
}
const schema = yup.object({
    email: yup.string("ایمیل نامعتبر است.").required("ایمیل الزامی است."),
    password: yup.string().required("رمزعبور الزامی است.")
})

const Signin = () => {

    const {
        register,
        handleSubmit,
        formState: { errors, isLoading }
    } = useForm({
        resolver: yupResolver(schema),
        mode: "onTouched"
    })

    const { Signin } = useAuth()

    const onSubmit = async (values) => {
        await Signin(values)
    }

    return (
        <>
            <h1 className="text-xl font-bold text-secondary-500 text-center mb-6">ورود</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">

                <RHFTextField
                    label="ایمیل"
                    name="email"
                    register={register}
                    dir="rtl"
                    isRequired
                    errors={errors}
                />
                <RHFTextField
                    label="رمزعبور"
                    name="password"
                    register={register}
                    type="password"
                    dir="rtl"
                    isRequired
                    errors={errors}
                />
                {
                    isLoading ? (<SpinnerMini />) : (
                        <Button type="submit" variant="primary" className="w-full">
                            ورود
                        </Button>
                    )
                }

            </form>
            <button className="w-full border-2 border-primary-700 mt-5 p-2 rounded-xl hover:bg-primary-200 ">
                <Link href="/signup" className="text-secondary-500">
                    ثبت نام
                </Link>
            </button>

        </>
    );
}

export default Signin;
