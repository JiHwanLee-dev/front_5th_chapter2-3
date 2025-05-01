import React from "react"
import { FC } from "react"
import { Table, TableHeader, TableBody, TableRow, TableHead } from "../../../shared/ui"
import { Post } from "../model/types"
import PostCard from "./PostCard"
import usePostStore from "../model/postStore"
import useSelectedPostStore from "../model/selectedPostStore"
import usePostDialogStore from "../model/postDialog"
import useSelectedTag from "../../tag/model/selectedTagStore"
import useFilterStore from "../../../features/postFiltering/model/filterStore"

interface Author {
  id: number
  username: string
  image?: string
}

interface PostListProps {
  highlightText: (text: string, highlight: string) => React.ReactNode
  onViewDetail: (post: Post) => void
  onDelete: (id: number) => void
  onUserSelect: (user: Author) => void
  updateURL: () => void
}

export const PostList: FC<PostListProps> = ({ highlightText, onViewDetail, onDelete, onUserSelect, updateURL }) => {
  const { posts } = usePostStore()
  const { setShowEditDialog } = usePostDialogStore()
  const { setSelectedPost } = useSelectedPostStore()
  const { selectedTag, setSelectedTag } = useSelectedTag()
  const { searchQuery } = useFilterStore()
  const handleEdit = (post: Post) => {
    setSelectedPost(post)
    setShowEditDialog(true)
  }

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
            onTagSelect={setSelectedTag}
            onViewDetail={onViewDetail}
            onEdit={handleEdit}
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
