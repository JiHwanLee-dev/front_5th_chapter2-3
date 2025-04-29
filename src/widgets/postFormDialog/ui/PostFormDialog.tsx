// src/widgets/postFormDialog/ui/PostFormDialog.tsx
import { FC } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../../shared/ui"
import { PostForm } from "../../../features/postForm/ui/PostForm"

interface PostFormDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  formData: any
  onChangeFormData: (name: string, value: any) => void
  onSubmit?: (data: any) => void
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
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isEdit ? "게시물 수정" : "새 게시물 추가"}</DialogTitle>
        </DialogHeader>
        <PostForm data={formData} onChange={onChangeFormData} onSubmit={onSubmit} isEdit={isEdit} />
      </DialogContent>
    </Dialog>
  )
}
