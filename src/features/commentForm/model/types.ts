// src/features/commentForm/model/types.ts
export interface CommentFormData {
  body: string
  postId: number | null
  userId: number
  [key: string]: any
}

export interface CommentFormProps {
  data: Partial<CommentFormData>
  onChange: (name: string, value: any) => void
  onSubmit: () => void
  isEdit?: boolean
}
