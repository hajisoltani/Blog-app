'use client'
import Button from "@/ui/Button";
import RHFTextField from "@/ui/RHFTextField";
import { useForm } from "react-hook-form";
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { useAuth } from "@/context/AuthContext";
import SpinnerMini from "@/ui/SpinnerMini";
import Link from "next/link";



export const metaData = {
    title: "ثبت نام"
}
const schema = yup.object({
    name: yup.string().min(5, "نام باید بیشتر از 5حرف باشد.").max(15, "نام باید کمتر از 15 حرف باشد.").required("نام ونام خانوادگی الزامیست."),
    email: yup.string("ایمیل نامعتبر است.").required("ایمیل الزامی است."),
    password: yup.string().required("رمزعبور الزامی است.")
})

const Signup = () => {

    const {
        register,
        handleSubmit,
        formState: { errors, isLoading }
    } = useForm({
        resolver: yupResolver(schema),
        mode: "onTouched"
    })

    const { Signup } = useAuth()

    const onSubmit = async (values) => {
        await Signup(values)
    }

    return (
        <>
            <h1 className="text-xl font-bold text-secondary-500 text-center mb-6">ثبت نام </h1>
            <form onSubmit={handleSubmit(onSubmit)} className=" space-y-10">
                <RHFTextField
                    label="نام و نام خانوادگی"
                    name="name"
                    register={register}
                    isRequired
                    errors={errors}
                />
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
                        <Button type="submit" variant="primary" className="w-full">ثبت نام</Button>
                    )
                }
            </form>
             <button className="w-full border-2 border-primary-700 mt-5 p-2 rounded-xl hover:bg-primary-200 ">
            <Link href='/signin' className='text-secondary-500 '>
                ورود
            </Link>
            </button>
        </>
    );
}

export default Signup;
