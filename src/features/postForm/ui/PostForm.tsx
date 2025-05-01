// src/features/postForm/ui/PostForm.tsx
import { FC } from "react"
import { Input, Textarea, Button } from "../../../shared/ui"
import { PostFormData } from "../model/types"
import usePostStore from "../../../entities/post/model/postStore"
import usePostDialogStore from "../../../entities/post/model/postDialog"
import useNewPostStore from "../../../entities/post/model/newPostStore"
import useSelectedPostStore from "../../../entities/post/model/selectedPostStore"

import { getMswUrl } from "../../../shared/constants/mswUrl"

interface PostFormProps {
  data: Partial<PostFormData>
  onChange: (name: string, value: string | number) => void
  isEdit?: boolean // 추가/수정 모드 구분을 위한 prop
}

export const PostForm: FC<PostFormProps> = ({ data, onChange, isEdit = false }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    onChange(name, name === "userId" ? Number(value) : value)
  }
  const { posts, setPosts } = usePostStore()
  const { setShowAddDialog, setShowEditDialog } = usePostDialogStore()
  const { newPost, setNewPost } = useNewPostStore()
  const { selectedPost } = useSelectedPostStore()
  // 게시글 추가
  const addPost = async () => {
    try {
      const response = await fetch(`${getMswUrl}/posts/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPost),
      })
      const data = await response.json()
      setPosts([data, ...posts])
      setShowAddDialog(false)
      setNewPost({ title: "", body: "", userId: 1 })
    } catch (error) {
      console.error("게시물 추가 오류:", error)
    }
  }

  // 게시물 업데이트
  const updatePost = async () => {
    try {
      const response = await fetch(`${getMswUrl}/posts/${selectedPost?.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(selectedPost),
      })
      const data = await response.json()
      setPosts(posts.map((post) => (post.id === data.id ? data : post)))
      setShowEditDialog(false)
    } catch (error) {
      console.error("게시물 업데이트 오류:", error)
    }
  }

  return (
    <div className="space-y-4">
      <Input name="title" placeholder="제목" value={data.title || ""} onChange={handleChange} />
      <Textarea
        name="body"
        rows={isEdit ? 15 : 30} // 모드에 따라 다른 rows 적용
        placeholder="내용"
        value={data.body || ""}
        onChange={handleChange}
      />

      {/* 추가 모드에서만 사용자 ID 입력 표시 */}
      {!isEdit && (
        <Input name="userId" type="number" placeholder="사용자 ID" value={data.userId || 1} onChange={handleChange} />
      )}

      <Button onClick={isEdit ? updatePost : addPost}>{isEdit ? "게시물 업데이트" : "게시물 추가"}</Button>
    </div>
  )
}
