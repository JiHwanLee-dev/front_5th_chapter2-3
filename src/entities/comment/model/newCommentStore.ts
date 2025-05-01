import { create } from "zustand"
import { CommentFormData } from "./types"

interface NewCommentStore {
  newComment: CommentFormData
  setNewComment: (newComment: CommentFormData) => void
}

const useNewCommentStore = create<NewCommentStore>((set) => ({
  newComment: { body: "", postId: null, userId: 1 },

  setNewComment: (newComment: ((prev: CommentFormData) => CommentFormData) | CommentFormData) => {
    set((prev) => ({
      ...prev,
      newComment: typeof newComment === "function" ? newComment(prev.newComment) : newComment,
    }))
  },
}))

export default useNewCommentStore
