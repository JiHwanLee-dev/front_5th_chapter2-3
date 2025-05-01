import { create } from "zustand"

interface CommentDialogState {
  showAddCommentDialog: boolean
  showEditCommentDialog: boolean
  setShowAddCommentDialog: (showAddDialog: boolean) => void
  setShowEditCommentDialog: (showEditDialog: boolean) => void
}

const useCommentDialogStore = create<CommentDialogState>((set) => ({
  showAddCommentDialog: false,
  showEditCommentDialog: false,
  setShowAddCommentDialog: (showAddCommentDialog: boolean) => set({ showAddCommentDialog }),
  setShowEditCommentDialog: (showEditCommentDialog: boolean) => set({ showEditCommentDialog }),
}))

export default useCommentDialogStore
