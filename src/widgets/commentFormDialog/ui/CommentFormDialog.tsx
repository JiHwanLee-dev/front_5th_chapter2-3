// src/widgets/commentFormDialog/ui/CommentFormDialog.tsx
import { FC } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../../shared/ui"
import { CommentForm } from "../../../features/commentForm/ui/CommentForm"
import { CommentFormData } from "../../../features/commentForm/model/types"
import useCommentDialogStore from "../../../entities/comment/model/commentDialogStore"

interface CommentFormDialogProps {
  title: string
  formData: Partial<CommentFormData>
  onChangeFormData: (name: string, value: string | number) => void
  onSubmit: () => void
  isEdit?: boolean
}

export const CommentFormDialog: FC<CommentFormDialogProps> = ({
  title,
  formData,
  onChangeFormData,
  onSubmit,
  isEdit = false,
}) => {
  const { showAddCommentDialog, showEditCommentDialog, setShowAddCommentDialog, setShowEditCommentDialog } =
    useCommentDialogStore()
  return (
    <Dialog
      open={isEdit ? showEditCommentDialog : showAddCommentDialog}
      onOpenChange={isEdit ? setShowEditCommentDialog : setShowAddCommentDialog}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <CommentForm data={formData} onChange={onChangeFormData} onSubmit={onSubmit} isEdit={isEdit} />
      </DialogContent>
    </Dialog>
  )
}
