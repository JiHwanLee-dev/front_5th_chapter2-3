// src/widgets/postFormDialog/ui/PostFormDialog.tsx
import { FC } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../../shared/ui"
import { PostForm } from "../../../features/postForm/ui/PostForm"
import usePostDialogStore from "../../../entities/post/model/postDialog"
import useNewPostStore from "../../../entities/post/model/newPostStore"
import useSelectedPostStore from "../../../entities/post/model/selectedPostStore"
// import { Post } from "../../../entities/post/model/post"
import { Post } from "../../../entities/post/model/types"
interface PostFormDialogProps {
  isEdit?: boolean
}

export const PostFormDialog: FC<PostFormDialogProps> = ({ isEdit = false }) => {
  const { showAddDialog, showEditDialog, setShowAddDialog, setShowEditDialog } = usePostDialogStore()
  const { newPost, setNewPost } = useNewPostStore()
  const { selectedPost, setSelectedPost } = useSelectedPostStore()

  return (
    <Dialog open={isEdit ? showEditDialog : showAddDialog} onOpenChange={isEdit ? setShowEditDialog : setShowAddDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isEdit ? "게시물 수정" : "새 게시물 추가"}</DialogTitle>
        </DialogHeader>
        <PostForm
          data={isEdit ? selectedPost || {} : newPost || {}}
          onChange={
            isEdit
              ? (name, value) => setSelectedPost({ ...selectedPost, [name]: value } as Post)
              : (name, value) => setNewPost({ ...newPost, [name]: value } as Post)
          }
          isEdit={isEdit}
        />
      </DialogContent>
    </Dialog>
  )
}
