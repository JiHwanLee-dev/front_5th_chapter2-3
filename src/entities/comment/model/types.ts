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
