// src/widgets/postFormDialog/ui/PostFormDialog.tsx
import { FC } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../../shared/ui"
import { PostForm } from "../../../features/postForm/ui/PostForm"
import { PostFormData } from "../../../features/postForm/model/types"

interface PostFormDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  formData: Partial<PostFormData> | null
  onChangeFormData: (name: string, value: string | number) => void
  onSubmit?: () => void
  isEdit?: boolean
}

export const PostFormDialog: FC<PostFormDialogProps> = ({
  open,
  onOpenChange,
  formData,
  onChangeFormData,
  onSubmit,
  isEdit = false,
}) => {
  const handleSubmit = () => {
    if (onSubmit) onSubmit()
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isEdit ? "게시물 수정" : "새 게시물 추가"}</DialogTitle>
        </DialogHeader>
        <PostForm data={formData || {}} onChange={onChangeFormData} onSubmit={handleSubmit} isEdit={isEdit} />
      </DialogContent>
    </Dialog>
  )
}
