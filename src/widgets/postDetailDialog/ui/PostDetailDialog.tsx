// src/widgets/postDetailDialog/ui/PostDetailDialog.tsx
import { FC } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../../shared/ui"
import { CommentList } from "../../../entities/comment/ui"
import { Post } from "../../../entities/post/model/types"
import { Comment } from "../../../entities/comment/model/types"
import usePostDialogStore from "../../../entities/post/model/postDialog"
import useFilterStore from "../../../features/postFiltering/model/filterStore"

interface PostDetailDialogProps {
  post: Partial<Post> | null
  comments: Comment[] | undefined
  highlightText: (text: string, highlight: string) => React.ReactNode
  onAddComment: (postId: number) => void
  onLikeComment: (id: number, postId: number) => void
  onEditComment: (comment: Comment) => void
  onDeleteComment: (id: number, postId: number) => void
}

export const PostDetailDialog: FC<PostDetailDialogProps> = ({
  post,
  comments,
  highlightText,
  onAddComment,
  onLikeComment,
  onEditComment,
  onDeleteComment,
}) => {
  const { showPostDetailDialog, setShowPostDetailDialog } = usePostDialogStore()
  const { searchQuery } = useFilterStore()

  if (!post) return null
  return (
    <Dialog open={showPostDetailDialog} onOpenChange={setShowPostDetailDialog}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>{highlightText(post.title || "", searchQuery)}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p>{highlightText(post.body || "", searchQuery)}</p>
          {post.id !== undefined && (
            <CommentList
              comments={comments}
              postId={post.id}
              searchQuery={searchQuery}
              highlightText={highlightText}
              onAddComment={onAddComment}
              onLikeComment={onLikeComment}
              onEditComment={onEditComment}
              onDeleteComment={onDeleteComment}
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
