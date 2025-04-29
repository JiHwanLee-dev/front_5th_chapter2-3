// src/features/postForm/ui/PostForm.tsx
import { FC } from "react"
import { Input, Textarea, Button } from "../../../shared/ui"
import { PostFormData } from "../model/types"

interface PostFormProps {
  data: Partial<PostFormData>
  onChange: (name: string, value: any) => void
  onSubmit: () => void
  isEdit?: boolean // 추가/수정 모드 구분을 위한 prop
}

export const PostForm: FC<PostFormProps> = ({ data, onChange, onSubmit, isEdit = false }) => {
  console.log("PostForm")
  console.log("data: ", data)
  console.log("data: ", isEdit)

  const handleChange = (e) => {
    const { name, value } = e.target
    onChange(name, name === "userId" ? Number(value) : value)
  }

  return (
    <div className="space-y-4">
      <Input name="title" placeholder="제목" value={data.title || ""} onChange={handleChange} />
      <Textarea
        name="body"
        rows={isEdit ? 15 : 30} // 모드에 따라 다른 rows 적용
        placeholder="내용"
        value={data.body || ""}
        onChange={handleChange}
      />

      {/* 추가 모드에서만 사용자 ID 입력 표시 */}
      {!isEdit && (
        <Input name="userId" type="number" placeholder="사용자 ID" value={data.userId || 1} onChange={handleChange} />
      )}

      <Button onClick={onSubmit}>{isEdit ? "게시물 업데이트" : "게시물 추가"}</Button>
    </div>
  )
}
