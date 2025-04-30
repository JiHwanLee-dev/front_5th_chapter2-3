// src/widgets/commentFormDialog/ui/CommentFormDialog.tsx
import { FC } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../../shared/ui"
import { CommentForm } from "../../../features/commentForm/ui/CommentForm"
import { CommentFormData } from "../../../features/commentForm/model/types"

interface CommentFormDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  formData: Partial<CommentFormData>
  onChangeFormData: (name: string, value: string | number) => void
  onSubmit: () => void
  isEdit?: boolean
}

export const CommentFormDialog: FC<CommentFormDialogProps> = ({
  open,
  onOpenChange,
  title,
  formData,
  onChangeFormData,
  onSubmit,
  isEdit = false,
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <CommentForm data={formData} onChange={onChangeFormData} onSubmit={onSubmit} isEdit={isEdit} />
      </DialogContent>
    </Dialog>
  )
}
