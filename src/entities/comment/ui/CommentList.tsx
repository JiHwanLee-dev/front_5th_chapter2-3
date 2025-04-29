import { FC } from "react"
import { Plus } from "lucide-react"
import { Button } from "../../../shared/ui"
import { Comment } from "../model/types"
import { CommentItem } from "./CommentItem"

interface CommentListProps {
  comments: Comment[] | undefined
  postId: number
  searchQuery: string
  highlightText: (text: string, highlight: string) => React.ReactNode
  onAddComment: (postId: number) => void
  onLikeComment: (id: number, postId: number) => void
  onEditComment: (comment: Comment) => void
  onDeleteComment: (id: number, postId: number) => void
}

export const CommentList: FC<CommentListProps> = ({
  comments,
  postId,
  searchQuery,
  highlightText,
  onAddComment,
  onLikeComment,
  onEditComment,
  onDeleteComment,
}) => {
  return (
    <div className="mt-2">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-semibold">댓글</h3>
        <Button size="sm" onClick={() => onAddComment(postId)}>
          <Plus className="w-3 h-3 mr-1" />
          댓글 추가
        </Button>
      </div>
      <div className="space-y-1">
        {comments?.map((comment) => (
          <CommentItem
            key={comment.id}
            comment={comment}
            postId={postId}
            searchQuery={searchQuery}
            highlightText={highlightText}
            onLike={onLikeComment}
            onEdit={onEditComment}
            onDelete={onDeleteComment}
          />
        ))}
      </div>
    </div>
  )
}

export default CommentList
