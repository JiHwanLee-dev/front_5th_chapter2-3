export interface Comment {
  id: number
  postId: number
  body: string
  likes: number
  user?: {
    id: number
    username: string
  }
}

// 새 댓글 폼 데이터용 타입 추가
export interface CommentFormData {
  body: string
  postId: number | null
  userId: number
}
