import { create } from "zustand"

interface SelectedTag {
  selectedTag: string
  setSelectedTag: (tag: string) => void
}

const useSelectedTag = create<SelectedTag>((set) => ({
  selectedTag: "",
  setSelectedTag: (tag) => set({ selectedTag: tag }),
}))

export default useSelectedTag
