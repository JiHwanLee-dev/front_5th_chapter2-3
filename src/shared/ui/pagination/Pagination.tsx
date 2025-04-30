// src/shared/ui/pagination/Pagination.tsx
import { FC } from "react"
import { Button } from "../../ui"
import { PageSizeSelect } from "./PageSizeSelect.tsx"
import usePageStore from "./model/pageStore"

interface PaginationProps {
  pageSize: number
  pageSizeOptions?: number[]
}

export const Pagination: FC<PaginationProps> = ({ pageSize, pageSizeOptions = [10, 20, 30] }) => {
  const { skip, limit, total, setSkip, setLimit } = usePageStore()

  return (
    <div className="flex justify-between items-center">
      <PageSizeSelect value={pageSize.toString()} onChange={setLimit} options={pageSizeOptions} />

      <div className="flex gap-2">
        <Button disabled={skip === 0} onClick={() => setSkip(skip - limit)}>
          이전
        </Button>
        <Button disabled={!(skip + limit < total)} onClick={() => setSkip(skip + limit)}>
          다음
        </Button>
      </div>
    </div>
  )
}
