import { create } from "zustand"

interface FilterStore {
  searchQuery: string
  setSearchQuery: (query: string) => void
  sortBy: string
  setSortBy: (sort: string) => void
  sortOrder: string
  setSortOrder: (order: string) => void
}

const useFilterStore = create<FilterStore>((set) => ({
  searchQuery: "",
  setSearchQuery: (query) => set({ searchQuery: query }),
  sortBy: "",
  setSortBy: (sort) => set({ sortBy: sort }),
  sortOrder: "asc",
  setSortOrder: (order) => set({ sortOrder: order }),
}))

export default useFilterStore
