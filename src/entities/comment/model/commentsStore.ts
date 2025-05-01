import { create } from "zustand"
import { Comment } from "./types"

interface CommentsStore {
  comments: Record<number, Comment[]>
  setComments: (comments: Record<number, Comment[]>) => void
  setPostComments: (postId: number, comments: Comment[]) => void
}

const useCommentsStore = create<CommentsStore>((set) => ({
  comments: {},
  setComments: (comments: Record<number, Comment[]>) => set({ comments }),
  setPostComments: (postId: number, comments: Comment[]) =>
    set((state) => ({
      comments: { ...state.comments, [postId]: comments },
    })),
}))

export default useCommentsStore
