import React from "react"
import { FC } from "react"
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell, Button } from "../../../shared/ui"
import { ThumbsUp, ThumbsDown, MessageSquare, Edit2, Trash2 } from "lucide-react"
import { Post } from "../model/types"
import PostCard from "./PostCard"

interface PostListProps {
  posts: Post[]
  searchQuery: string
  selectedTag: string
  highlightText: (text: string, highlight: string) => React.ReactNode
  onTagSelect: (tag: string) => void
  onViewDetail: (post: Post) => void
  onEdit: (post: Post) => void
  onDelete: (id: number) => void
  onUserSelect: (user: any) => void
  updateURL: () => void
}

export const PostList: FC<PostListProps> = ({
  posts,
  searchQuery,
  selectedTag,
  loading = false,
  highlightText,
  onTagSelect,
  onViewDetail,
  onEdit,
  onDelete,
  onUserSelect,
  updateURL,
}) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[50px]">ID</TableHead>
          <TableHead>제목</TableHead>
          <TableHead className="w-[150px]">작성자</TableHead>
          <TableHead className="w-[150px]">반응</TableHead>
          <TableHead className="w-[150px]">작업</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {posts.map((post) => (
          // 이 부분을 음 PostCard로 붙인다..
          <PostCard
            key={post.id}
            post={post}
            searchQuery={searchQuery}
            selectedTag={selectedTag}
            highlightText={highlightText}
            onTagSelect={onTagSelect}
            onViewDetail={onViewDetail}
            onEdit={onEdit}
            onDelete={onDelete}
            onUserSelect={onUserSelect}
            updateURL={updateURL}
          />
        ))}
      </TableBody>
    </Table>
  )
}

export default PostList
