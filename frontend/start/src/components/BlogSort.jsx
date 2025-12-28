'use client'

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { Select } from "@/ui/Select";
import { useCallback, useEffect, useState } from "react";


export default function BlogSort() {
    const searchParams = useSearchParams()
    const [sort, setSort] = useState('latest')

    const router = useRouter()
    const pathname = usePathname()

    const selectOptions = [
        {
            label: "تاریخ ایجاد (جدید ترین)",
            value: "latest",
        },
        {
            label: "تاریخ ایجاد (قدیمی ترین)",
            value: "earliest",
        },
        {
            label: "محبوبیت",
            value: "popular",
        },
        {
            label: "زمان مطالعه (نزولی)",
            value: "time_desc",
        },
        {
            label: "زمان مطالعه (صعودی)",
            value: "time_asc",
        },

    ]

    useEffect(() => {
        const paramSort = searchParams.get("sort")
        if (paramSort) setSort(paramSort)
    }, [searchParams])

    const createQuery = useCallback((name, value) => {
        const params = new URLSearchParams(searchParams)
        params.set(name, value)
        return params.toString()
    }, [searchParams])

    return (
        <Select
            onChange={(e) => {
                setSort(e.target.value)
                router.replace(pathname + '?' + createQuery("sort", e.target.value))

            }}
            options={selectOptions}
            value={sort}
        />

    )
}