import { create } from "zustand"
import { Comment } from "./types"

interface SelectedCommentStore {
  selectedComment: Comment | null
  setSelectedComment: (selectedComment: Comment | null) => void
}

const useSelectedCommentStore = create<SelectedCommentStore>((set) => ({
  selectedComment: null,
  setSelectedComment: (selectedComment: Comment | null) => set({ selectedComment }),
}))

export default useSelectedCommentStore
