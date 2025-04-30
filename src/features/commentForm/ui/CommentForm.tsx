// src/features/commentForm/ui/CommentForm.tsx
import { FC, ChangeEvent } from "react"
import { Textarea, Button } from "../../../shared/ui"
import { CommentFormProps } from "../model/types"

export const CommentForm: FC<CommentFormProps> = ({ data, onChange, onSubmit, isEdit = false }) => {
  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target
    onChange(name, value)
  }

  return (
    <div className="space-y-4">
      <Textarea name="body" placeholder="댓글 내용" value={data.body || ""} onChange={handleChange} />
      <Button onClick={onSubmit}>{isEdit ? "댓글 업데이트" : "댓글 추가"}</Button>
    </div>
  )
}
