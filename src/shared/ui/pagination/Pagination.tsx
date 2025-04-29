// src/shared/ui/pagination/Pagination.tsx
import { FC } from "react"
import { Button } from "../../ui"
import { PageSizeSelect } from "./PageSizeSelect.tsx"

interface PaginationProps {
  currentPage: number
  pageSize: number
  total: number
  onPageChange: (page: number) => void
  onPageSizeChange: (size: number) => void
  pageSizeOptions?: number[]
}

export const Pagination: FC<PaginationProps> = ({
  currentPage,
  pageSize,
  total,
  onPageChange,
  onPageSizeChange,
  pageSizeOptions = [10, 20, 30],
}) => {
  const skip = currentPage * pageSize
  const hasNextPage = skip + pageSize < total
  const hasPrevPage = currentPage > 0

  return (
    <div className="flex justify-between items-center">
      <PageSizeSelect value={pageSize.toString()} onChange={onPageSizeChange} options={pageSizeOptions} />

      <div className="flex gap-2">
        <Button disabled={!hasPrevPage} onClick={() => onPageChange(currentPage - 1)}>
          이전
        </Button>
        <Button disabled={!hasNextPage} onClick={() => onPageChange(currentPage + 1)}>
          다음
        </Button>
      </div>
    </div>
  )
}
