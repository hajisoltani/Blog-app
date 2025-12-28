"use client"

import { useCategories } from '@/hook/useCategories';
import { getCategoriesApi } from '@/services/categoryService';
import Button from '@/ui/Button';
import ButtonIcon from '@/ui/ButtonIcon';
import FileInput from '@/ui/FileInput';
import RHFSelect from '@/ui/RHFSelect';
import RHFTextField from '@/ui/RHFTextField';
import TextField from '@/ui/TextField';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { yupResolver } from '@hookform/resolvers/yup';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup'
import useCreatePost from './useCreatePost';
import SpinnerMini from '@/ui/SpinnerMini';
import { useRouter } from 'next/navigation';
import EditPage from '../../[postId]/edit/page';
import useEditPost from './useEditPost';
import { imageUrlToFile } from 'utils/fileFormatter';


const schema = yup
    .object({
        title: yup
            .string()
            .min(5, "حداقل ۵ کاراکتر را وارد کنید")
            .required("عنوان ضروری است"),
        briefText: yup
            .string()
            .min(5, "حداقل ۱۰ کاراکتر را وارد کنید")
            .required("توضیحات ضروری است"),
        text: yup
            .string()
            .min(5, "حداقل ۱۰ کاراکتر را وارد کنید")
            .required("توضیحات ضروری است"),
        slug: yup.string().required("اسلاگ ضروری است"),
        readingTime: yup
            .number()
            .positive()
            .integer()
            .required("زمان مطالعه ضروری است")
            .typeError("یک عدد را وارد کنید"),
        category: yup.string().required("دسته بندی ضروری است"),
    })
    .required();

export default function CreatePostForm({ postToEdit = {} }) {
    const { _id: editId } = postToEdit
    const isEditeSeccion = Boolean(editId)

    const {
        title,
        text,
        slug,
        briefText,
        readingTime,
        category,
        coverImage,
        coverImageUrl: prevCoverImageUrl
    } = postToEdit

    let editValues = {}
    if (isEditeSeccion) {
        editValues = {
            title,
            text,
            slug,
            briefText,
            readingTime,
            category: category._id,
            coverImage,

        }
    }


    const [urlCoverImg, setUrlCoverImg] = useState(prevCoverImageUrl || null)
    const { categories } = useCategories()
    const { createPost, isCreating } = useCreatePost()
    const { editPost, isEditting } = useEditPost()
    const router = useRouter()



    const {
        control,
        rest,
        register,
        reset,
        formState: { errors },
        handleSubmit,
        setValue,
    } = useForm({
        mode: "onTouched",
        resolver: yupResolver(schema),
        defaultValues: editValues,
    });


    useEffect(() => {
        if (prevCoverImageUrl) {
            async function fetchMyApi() {
                const file = await imageUrlToFile(prevCoverImageUrl)
                setValue('coverImage', file)
            }
            fetchMyApi()
        }
    }, [editId])

    const onSubmit = (data) => {
        console.log({ data });
        const formData = new FormData();

        for (const key in data) {
            formData.append(key, data[key]);
        }

        if (isEditeSeccion) {
            editPost({ id: editId, data: formData }, {
                onSuccess: () => {
                    reset()
                    router.push('/profile/posts')
                }
            })

        } else {
            createPost(formData, {
                onSuccess: () => {
                    router.push("/profile/posts");
                },
            });
        }


    }


    return (
        <form className="form" onSubmit={handleSubmit(onSubmit)} >
            <RHFTextField
                name="title"
                label="عنوان"
                errors={errors}
                register={register}
                isRequired
            />
            <RHFTextField
                name="briefText"
                label="متن کوتاه"
                errors={errors}
                register={register}
                isRequired
            />
            <RHFTextField
                name="text"
                label="متن"
                errors={errors}
                register={register}
                isRequired
            />
            <RHFTextField
                name="slug"
                label="اسلاگ"
                errors={errors}
                register={register}
                isRequired
            />
            <RHFTextField
                name="readingTime"
                label="زمان مطالعه"
                errors={errors}
                register={register}
                isRequired
            />
            <RHFSelect
                name="category"
                label="دسته بندی"
                errors={errors}
                register={register}
                isRequired
                options={categories}
            />
            <Controller
                name="coverImage"
                control={control}
                rules={{ required: "کاور پست الزامی است." }}
                render={({ field: { value, onChange, ...reset } }) => {
                    return (
                        <FileInput
                            label="انتخاب کاور پست"
                            name="coverImage"
                            isRequired
                            errors={errors}
                            {...rest}
                            value={value?.fileName}
                            onChange={(event) => {
                                const file = event.target.files[0];
                                // console.log(file);
                                onChange(file);
                                setUrlCoverImg(URL.createObjectURL(file));
                                event.target.value = null;
                            }}
                        />
                    );
                }}

            />
            {
                urlCoverImg && (
                    <div className="relative aspect-video overflow-hidden rounded-lg">
                        <Image
                            fill
                            alt="cover-img"
                            src={urlCoverImg}
                            className="object-cover object-center"

                        />
                        <ButtonIcon
                            onClick={() => {
                                setUrlCoverImg(null);
                                setValue("coverImage", null);
                            }}
                            variant="red"
                            className="w-6 h-6 absolute left-4 top-4"
                        >
                            <XMarkIcon />
                        </ButtonIcon>
                    </div>
                )
            }
            <div>
                {
                    isCreating ? (<SpinnerMini />) :
                        (<Button variant='primary' type="submit" className='w-full'>
                            تایید
                        </Button>)
                }
            </div>

        </form>
    );
}

