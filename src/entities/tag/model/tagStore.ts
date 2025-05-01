import { create } from "zustand"
import { Tag } from "../model/types"

interface TagStore {
  tags: Tag[]
  setTags: (tags: Tag[]) => void
}

const useTagStore = create<TagStore>((set) => ({
  tags: [],
  setTags: (tags: Tag[]) => set({ tags }),
}))

export default useTagStore
