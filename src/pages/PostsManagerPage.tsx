import { useEffect, useState } from "react"
import { Plus, Search } from "lucide-react"
import { useLocation, useNavigate } from "react-router-dom"
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Pagination,
} from "../shared/ui"
import { PostList } from "../entities/post/ui"
import { TagSelect } from "../entities/tag/ui/TagSelect"
import { PostFormDialog } from "../widgets/postFormDialog/ui/PostFormDialog"
import { CommentFormDialog } from "../widgets/commentFormDialog/ui/CommentFormDialog"
import { PostDetailDialog } from "../widgets/postDetailDialog/ui/PostDetailDialog"
import { UserDetailDialog } from "../widgets/useDetailDialog/ui/UserDetailDialog"

import { Comment } from "../entities/comment/model/types"
import { Post } from "../entities/post/model/types"
import { CommentFormData } from "../entities/comment/model/types"

import { usePostsWithUsers } from "../features/post/hooks/usePostsWithUsers"
import { useTagsQuery } from "../features/tag/hooks/useTagsQuery"
import usePostStore from "../entities/post/model/postStore"
import useUserStore from "../entities/user/model/useStore"
import usePageStore from "../shared/ui/pagination/model/pageStore"
import usePostDialogStore from "../entities/post/model/postDialog"
import useCommentDialogStore from "../entities/comment/model/commentDialogStore"
import useTagStore from "../entities/tag/model/tagStore"
import useNewPostStore from "../entities/post/model/newPostStore"
import useSelectedPostStore from "../entities/post/model/selectedPostStore"
import useNewCommentStore from "../entities/comment/model/newCommentStore"
import useSelectedCommentStore from "../entities/comment/model/selectedCommentStore"
import useCommentsStore from "../entities/comment/model/commentsStore"

const PostsManager = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)

  // 상태 관리
  const { posts, setPosts } = usePostStore()
  const { skip, limit, setSkip, setLimit, setTotal } = usePageStore()
  const { selectedUser, setSelectedUser } = useUserStore()
  const { setShowAddDialog, setShowEditDialog, setShowPostDetailDialog, setShowUserModal } = usePostDialogStore()
  const { setShowAddCommentDialog, setShowEditCommentDialog } = useCommentDialogStore()
  const { tags, setTags } = useTagStore()
  const { newPost, setNewPost } = useNewPostStore()
  const { selectedPost, setSelectedPost } = useSelectedPostStore()

  const { selectedComment, setSelectedComment } = useSelectedCommentStore()

  const [searchQuery, setSearchQuery] = useState(queryParams.get("search") || "")
  const [sortBy, setSortBy] = useState(queryParams.get("sortBy") || "")
  const [sortOrder, setSortOrder] = useState(queryParams.get("sortOrder") || "asc")

  const [loading, setLoading] = useState(false)

  const [selectedTag, setSelectedTag] = useState(queryParams.get("tag") || "")

  const [comments, setComments] = useState<Record<number, Comment[]>>({})
  // const { comments, setComments, setPostComments } = useCommentsStore()
  // const [selectedComment, setSelectedComment] = useState<Partial<Comment> | null>(null)

  const { newComment, setNewComment } = useNewCommentStore()

  // URL 업데이트 함수
  const updateURL = () => {
    const params = new URLSearchParams()
    if (skip) params.set("skip", skip.toString())
    if (limit) params.set("limit", limit.toString())
    if (searchQuery) params.set("search", searchQuery)
    if (sortBy) params.set("sortBy", sortBy)
    if (sortOrder) params.set("sortOrder", sortOrder)
    if (selectedTag) params.set("tag", selectedTag)
    navigate(`?${params.toString()}`)
  }

  // 게시물 가져오기 Hooks 사용
  const { fetchPosts } = usePostsWithUsers(limit, skip, selectedTag, setTotal, setLoading)

  // 태그 가져오기 Hooks 사용
  useTagsQuery(setTags)

  // 게시물 검색
  const searchPosts = async () => {
    if (!searchQuery) {
      fetchPosts()
      return
    }
    setLoading(true)
    try {
      const response = await fetch(`/api/posts/search?q=${searchQuery}`)
      const data = await response.json()
      setPosts(data.posts)
      setTotal(data.total)
    } catch (error) {
      console.error("게시물 검색 오류:", error)
    }
    setLoading(false)
  }

  // 태그별 게시물 가져오기
  const fetchPostsByTag = async (tag) => {
    if (!tag || tag === "all") {
      fetchPosts()
      return
    }
    setLoading(true)
    try {
      const [postsResponse, usersResponse] = await Promise.all([
        fetch(`/api/posts/tag/${tag}`),
        fetch("/api/users?limit=0&select=username,image"),
      ])
      const postsData = await postsResponse.json()
      const usersData = await usersResponse.json()

      const postsWithUsers = postsData.posts.map((post) => ({
        ...post,
        author: usersData.users.find((user) => user.id === post.userId),
      }))

      setPosts(postsWithUsers)
      setTotal(postsData.total)
    } catch (error) {
      console.error("태그별 게시물 가져오기 오류:", error)
    }
    setLoading(false)
  }

  // 게시물 추가
  const addPost = async () => {
    try {
      const response = await fetch("/api/posts/add", {
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
      const response = await fetch(`/api/posts/${selectedPost?.id}`, {
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

  // 게시물 삭제
  const deletePost = async (id: number) => {
    try {
      await fetch(`/api/posts/${id}`, {
        method: "DELETE",
      })
      setPosts(posts.filter((post) => post.id !== id))
    } catch (error) {
      console.error("게시물 삭제 오류:", error)
    }
  }

  // 댓글 가져오기
  const fetchComments = async (postId: number) => {
    if (comments[postId]) return // 이미 불러온 댓글이 있으면 다시 불러오지 않음
    try {
      const response = await fetch(`/api/comments/post/${postId}`)
      const data = await response.json()
      setComments((prev) => ({ ...prev, [postId]: data.comments }))
    } catch (error) {
      console.error("댓글 가져오기 오류:", error)
    }
  }

  // 댓글 추가
  const addComment = async () => {
    try {
      const response = await fetch("/api/comments/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newComment),
      })
      const data = await response.json()
      setComments((prev) => ({
        ...prev,
        [data.postId]: [...(prev[data.postId] || []), data],
      }))
      setShowAddCommentDialog(false)
      setNewComment({ body: "", postId: null, userId: 1 })
    } catch (error) {
      console.error("댓글 추가 오류:", error)
    }
  }

  // 댓글 업데이트
  const updateComment = async () => {
    try {
      const response = await fetch(`/api/comments/${selectedComment?.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ body: selectedComment?.body }),
      })
      const data = await response.json()
      setComments((prev) => ({
        ...prev,
        [data.postId]: prev[data.postId].map((comment) => (comment.id === data.id ? data : comment)),
      }))
      setShowEditCommentDialog(false)
    } catch (error) {
      console.error("댓글 업데이트 오류:", error)
    }
  }

  // 댓글 삭제
  const deleteComment = async (id: number, postId: number) => {
    try {
      await fetch(`/api/comments/${id}`, {
        method: "DELETE",
      })
      setComments((prev) => ({
        ...prev,
        [postId]: prev[postId].filter((comment) => comment.id !== id),
      }))
    } catch (error) {
      console.error("댓글 삭제 오류:", error)
    }
  }

  // 댓글 좋아요
  const likeComment = async (id: number, postId: number) => {
    try {
      const response = await fetch(`/api/comments/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ likes: comments[postId].find((c) => c.id === id).likes + 1 }),
      })
      const data = await response.json()
      setComments((prev) => ({
        ...prev,
        [postId]: prev[postId].map((comment) =>
          comment.id === data.id ? { ...data, likes: comment.likes + 1 } : comment,
        ),
      }))
    } catch (error) {
      console.error("댓글 좋아요 오류:", error)
    }
  }

  // 게시물 상세 보기
  const openPostDetail = (post: Post) => {
    setSelectedPost(post)
    fetchComments(post.id)
    setShowPostDetailDialog(true)
  }

  // 사용자 모달 열기
  const openUserModal = async (user) => {
    try {
      const response = await fetch(`/api/users/${user.id}`)
      const userData = await response.json()
      setSelectedUser(userData)
      setShowUserModal(true)
    } catch (error) {
      console.error("사용자 정보 가져오기 오류:", error)
    }
  }

  useEffect(() => {
    if (selectedTag) {
      fetchPostsByTag(selectedTag)
    } else {
      fetchPosts()
    }
    updateURL()
  }, [skip, limit, sortBy, sortOrder, selectedTag])

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    setSkip(parseInt(params.get("skip") || "0"))
    setLimit(parseInt(params.get("limit") || "10"))
    setSearchQuery(params.get("search") || "")
    setSortBy(params.get("sortBy") || "")
    setSortOrder(params.get("sortOrder") || "asc")
    setSelectedTag(params.get("tag") || "")
  }, [location.search])

  // 하이라이트 함수 추가
  const highlightText = (text: string, highlight: string) => {
    if (!text) return null
    if (!highlight.trim()) {
      return <span>{text}</span>
    }
    const regex = new RegExp(`(${highlight})`, "gi")
    const parts = text.split(regex)
    return (
      <span>
        {parts.map((part, i) => (regex.test(part) ? <mark key={i}>{part}</mark> : <span key={i}>{part}</span>))}
      </span>
    )
  }

  return (
    <Card className="w-full max-w-6xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>게시물 관리자</span>
          <Button onClick={() => setShowAddDialog(true)}>
            <Plus className="w-4 h-4 mr-2" />
            게시물 추가
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          {/* 검색 및 필터 컨트롤 */}
          <div className="flex gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="게시물 검색..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && searchPosts()}
                />
              </div>
            </div>
            <TagSelect
              selectedTag={selectedTag}
              onTagSelect={setSelectedTag}
              updateURL={updateURL}
              fetchPostsByTag={fetchPostsByTag}
            />

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="정렬 기준" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">없음</SelectItem>
                <SelectItem value="id">ID</SelectItem>
                <SelectItem value="title">제목</SelectItem>
                <SelectItem value="reactions">반응</SelectItem>
              </SelectContent>
            </Select>

            <Select value={sortOrder} onValueChange={setSortOrder}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="정렬 순서" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="asc">오름차순</SelectItem>
                <SelectItem value="desc">내림차순</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* 게시물 테이블 */}
          {loading ? (
            <div className="flex justify-center p-4">로딩 중...</div>
          ) : (
            <PostList
              searchQuery={searchQuery}
              selectedTag={selectedTag}
              onTagSelect={setSelectedTag}
              onViewDetail={openPostDetail}
              onDelete={deletePost}
              onUserSelect={openUserModal}
              highlightText={highlightText}
              updateURL={updateURL}
            />
          )}

          {/* 페이지네이션 */}
          <Pagination pageSize={limit} />
        </div>
      </CardContent>

      {/* 게시물 추가 대화상자 */}
      <PostFormDialog onSubmit={addPost} isEdit={false} />

      {/* 게시물 수정 대화상자 */}
      <PostFormDialog onSubmit={updatePost} isEdit={true} />

      {/* 댓글 추가 대화상자 */}
      <CommentFormDialog
        title="새 댓글 추가"
        formData={newComment}
        onChangeFormData={(name, value) => setNewComment({ ...newComment, [name]: value })}
        onSubmit={addComment}
        isEdit={false}
      />

      {/* 댓글 수정 대화상자 */}
      <CommentFormDialog
        title="댓글 수정"
        formData={selectedComment ? { body: selectedComment.body || "" } : { body: "" }}
        onChangeFormData={(name, value) => setSelectedComment({ ...selectedComment, [name]: value })}
        onSubmit={updateComment}
        isEdit={true}
      />

      {/* 게시물 상세 보기 대화상자 */}
      <PostDetailDialog
        post={selectedPost}
        comments={selectedPost?.id !== undefined ? (comments[selectedPost.id] ?? []) : []}
        searchQuery={searchQuery}
        highlightText={highlightText}
        onAddComment={(postId) => {
          setNewComment((prev) => ({ ...prev, postId }))
          setShowAddCommentDialog(true)
        }}
        onLikeComment={likeComment}
        onEditComment={(comment) => {
          setSelectedComment(comment)
          setShowEditCommentDialog(true)
        }}
        onDeleteComment={deleteComment}
      />

      {/* 사용자 모달 */}
      <UserDetailDialog title="사용자 정보" />
    </Card>
  )
}

export default PostsManager
