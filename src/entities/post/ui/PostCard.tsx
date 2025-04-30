import React from "react"
import { TableRow, TableCell, Button } from "../../../shared/ui"
import { ThumbsUp, ThumbsDown, MessageSquare, Edit2, Trash2 } from "lucide-react"
import { Post } from "../model/types"

interface Author {
  id: number
  username: string
  image?: string
}

interface PostCardProps {
  post: Post
  searchQuery: string
  selectedTag: string
  highlightText: (text: string, highlight: string) => React.ReactNode
  onTagSelect: (tag: string) => void
  onViewDetail: (post: Post) => void
  onEdit: (post: Post) => void
  onDelete: (id: number) => void
  onUserSelect: (user: Author) => void
  updateURL: () => void
}

const PostCard = ({
  post,
  searchQuery,
  selectedTag,
  highlightText,
  onTagSelect,
  onViewDetail,
  onEdit,
  onDelete,
  onUserSelect,
  updateURL,
}: PostCardProps) => {
  return (
    <TableRow key={post.id}>
      <TableCell>{post.id}</TableCell>
      <TableCell>
        <div className="space-y-1">
          <div>{highlightText(post.title, searchQuery)}</div>

          <div className="flex flex-wrap gap-1">
            {post.tags?.map((tag) => (
              <span
                key={tag}
                className={`px-1 text-[9px] font-semibold rounded-[4px] cursor-pointer ${
                  selectedTag === tag
                    ? "text-white bg-blue-500 hover:bg-blue-600"
                    : "text-blue-800 bg-blue-100 hover:bg-blue-200"
                }`}
                onClick={() => {
                  onTagSelect(tag)
                  updateURL()
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </TableCell>
      {/* 이 부분을 사용자 정보로 따로 떄네서 표시 ? */}
      <TableCell>
        {/* <UserAvatar user={post.author} onClick={onUserSelect} /> */}
        <div
          className="flex items-center space-x-2 cursor-pointer"
          onClick={() => post.author && onUserSelect(post.author)}
        >
          <img src={post.author?.image} alt={post.author?.username} className="w-8 h-8 rounded-full" />
          <span>{post.author?.username}</span>
        </div>
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <ThumbsUp className="w-4 h-4" />
          <span>{post.reactions?.likes || 0}</span>
          <ThumbsDown className="w-4 h-4" />
          <span>{post.reactions?.dislikes || 0}</span>
        </div>
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={() => onViewDetail(post)}>
            <MessageSquare className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              onEdit(post)
            }}
          >
            <Edit2 className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={() => onDelete(post.id)}>
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  )
}

export default PostCard
