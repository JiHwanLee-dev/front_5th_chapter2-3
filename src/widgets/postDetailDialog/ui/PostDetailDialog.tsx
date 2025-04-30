// src/widgets/postDetailDialog/ui/PostDetailDialog.tsx
import { FC } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../../shared/ui"
import { CommentList } from "../../../entities/comment/ui"
import { Post } from "../../../entities/post/model/types"
import { Comment } from "../../../entities/comment/model/types"

interface PostDetailDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  post: Post | null
  comments: Comment[] | undefined
  searchQuery: string
  highlightText: (text: string, highlight: string) => React.ReactNode
  onAddComment: (postId: number) => void
  onLikeComment: (id: number, postId: number) => void
  onEditComment: (comment: Comment) => void
  onDeleteComment: (id: number, postId: number) => void
}

export const PostDetailDialog: FC<PostDetailDialogProps> = ({
  open,
  onOpenChange,
  post,
  comments,
  searchQuery,
  highlightText,
  onAddComment,
  onLikeComment,
  onEditComment,
  onDeleteComment,
}) => {
  if (!post) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>{highlightText(post.title, searchQuery)}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p>{highlightText(post.body, searchQuery)}</p>
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
        </div>
      </DialogContent>
    </Dialog>
  )
}
