import { useState } from "react"

export default function usePagination(fullData: any, limit: number) {
  const [pageIndex, setPageIndex] = useState<number>(1)
  const lastPageIndex = Math.ceil(fullData.length / limit)

  const paginateData = () => {
    const start = (pageIndex - 1) * limit
    const end = start + limit
    return fullData?.slice(start, end)
  }

  const next = () => {
    setPageIndex((pageIndex) => Math.min(pageIndex + 1, lastPageIndex))
  }

  const prev = () => {
    setPageIndex((pageIndex) => Math.max(pageIndex - 1, 1))
  }

  const jump = (page: number) => {
    const newPageIndex = Math.max(1, page)
    setPageIndex(() => Math.min(newPageIndex, lastPageIndex))
  }

  return { next, prev, jump, paginateData, pageIndex, lastPageIndex }
}
