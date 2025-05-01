import { create } from "zustand"
import { PostFormData } from "../../../features/postForm/model/types"

interface NewPostStore {
  newPost: PostFormData
  setNewPost: (newPost: PostFormData) => void
}

const useNewPostStore = create<NewPostStore>((set) => ({
  newPost: { title: "", body: "", userId: 1 },
  setNewPost: (newPost: PostFormData) => set({ newPost }),
}))

export default useNewPostStore
