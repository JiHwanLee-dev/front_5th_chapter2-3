import { FC } from "react"
import { ThumbsUp, Edit2, Trash2 } from "lucide-react"
import { Button } from "../../../shared/ui"
import { Comment } from "../model/types"

interface CommentItemProps {
  comment: Comment
  postId: number
  searchQuery: string
  highlightText: (text: string, highlight: string) => React.ReactNode
  onLike: (id: number, postId: number) => void
  onEdit: (comment: Comment) => void
  onDelete: (id: number, postId: number) => void
}

export const CommentItem: FC<CommentItemProps> = ({
  comment,
  postId,
  searchQuery,
  highlightText,
  onLike,
  onEdit,
  onDelete,
}) => {
  return (
    <div key={comment.id} className="flex items-center justify-between text-sm border-b pb-1">
      <div className="flex items-center space-x-2 overflow-hidden">
        <span className="font-medium truncate">{comment.user?.username || "Unknown user"}:</span>
        <span className="truncate">{highlightText(comment.body, searchQuery)}</span>
      </div>
      <div className="flex items-center space-x-1">
        <Button variant="ghost" size="sm" onClick={() => onLike(comment.id, postId)}>
          <ThumbsUp className="w-3 h-3" />
          <span className="ml-1 text-xs">{comment.likes}</span>
        </Button>
        <Button variant="ghost" size="sm" onClick={() => onEdit(comment)}>
          <Edit2 className="w-3 h-3" />
        </Button>
        <Button variant="ghost" size="sm" onClick={() => onDelete(comment.id, postId)}>
          <Trash2 className="w-3 h-3" />
        </Button>
      </div>
    </div>
  )
}

export default CommentItem
