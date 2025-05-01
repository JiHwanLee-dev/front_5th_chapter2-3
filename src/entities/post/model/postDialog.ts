import { create } from "zustand"

interface PostDialogState {
  showAddDialog: boolean
  showEditDialog: boolean
  showPostDetailDialog: boolean
  showUserModal: boolean
  setShowAddDialog: (showAddDialog: boolean) => void
  setShowEditDialog: (showEditDialog: boolean) => void
  setShowPostDetailDialog: (showPostDetailDialog: boolean) => void
  setShowUserModal: (showUserModal: boolean) => void
}

const usePostDialogStore = create<PostDialogState>((set) => ({
  showAddDialog: false,
  showEditDialog: false,
  showPostDetailDialog: false,
  showUserModal: false,
  setShowAddDialog: (showAddDialog: boolean) => set({ showAddDialog }),
  setShowEditDialog: (showEditDialog: boolean) => set({ showEditDialog }),
  setShowPostDetailDialog: (showPostDetailDialog: boolean) => set({ showPostDetailDialog }),
  setShowUserModal: (showUserModal: boolean) => set({ showUserModal }),
}))

export default usePostDialogStore
