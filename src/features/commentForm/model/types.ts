// src/features/commentForm/model/types.ts
export interface CommentFormData {
  body: string
  postId: number | null
  userId: number
  [key: string]: string | number | null
}

export interface CommentFormProps {
  data: Partial<CommentFormData>
  onChange: (name: string, value: string | number) => void
  onSubmit: () => void
  isEdit?: boolean
}
