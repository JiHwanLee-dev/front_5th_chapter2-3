// src/widgets/commentFormDialog/ui/CommentFormDialog.tsx
import { FC } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../../shared/ui"
import { CommentForm } from "../../../features/commentForm/ui/CommentForm"
import { CommentFormData } from "../../../features/commentForm/model/types"
import useCommentDialogStore from "../../../entities/comment/model/commentDialogStore"
import useSelectedCommentStore from "../../../entities/comment/model/selectedCommentStore"
import useNewCommentStore from "../../../entities/comment/model/newCommentStore"

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
  const { selectedComment, setSelectedComment } = useSelectedCommentStore()
  const { newComment, setNewComment } = useNewCommentStore()

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
