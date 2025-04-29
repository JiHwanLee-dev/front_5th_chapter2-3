// src/features/postForm/model/types.ts
export interface PostFormData {
  title: string
  body: string
  userId: number
}

export interface PostFormProps {
  initialData?: Partial<PostFormData>
  onSubmit: (data: PostFormData) => void
  isEdit?: boolean
}

export interface PostFormDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmitSuccess?: (data: any) => void
  initialData?: Partial<PostFormData>
  isEdit?: boolean
  title?: string
  submitButtonText?: string
}
