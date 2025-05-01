// src/widgets/postFormDialog/ui/PostFormDialog.tsx
import { FC } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../../shared/ui"
import { PostForm } from "../../../features/postForm/ui/PostForm"
import { PostFormData } from "../../../features/postForm/model/types"
import usePostDialogStore from "../../../entities/post/model/postDialog"

interface PostFormDialogProps {
  formData: Partial<PostFormData> | null
  onChangeFormData: (name: string, value: string | number) => void
  onSubmit?: () => void
  isEdit?: boolean
}

export const PostFormDialog: FC<PostFormDialogProps> = ({ formData, onChangeFormData, onSubmit, isEdit = false }) => {
  const handleSubmit = () => {
    if (onSubmit) onSubmit()
  }
  const { showAddDialog, showEditDialog, setShowAddDialog, setShowEditDialog } = usePostDialogStore()

  return (
    <Dialog open={isEdit ? showEditDialog : showAddDialog} onOpenChange={isEdit ? setShowEditDialog : setShowAddDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isEdit ? "게시물 수정" : "새 게시물 추가"}</DialogTitle>
        </DialogHeader>
        <PostForm data={formData || {}} onChange={onChangeFormData} onSubmit={handleSubmit} isEdit={isEdit} />
      </DialogContent>
    </Dialog>
  )
}
