import { create } from "zustand"

interface PageState {
  skip: number
  limit: number
  total: number
  setSkip: (skip: number) => void
  setLimit: (limit: number) => void
  setTotal: (total: number) => void
}

const usePageStore = create<PageState>((set) => ({
  skip: 0,
  limit: 10,
  total: 0,
  setSkip: (skip: number) => set({ skip }),
  setLimit: (limit: number) => set({ limit }),
  setTotal: (total: number) => set({ total }),
}))

export default usePageStore
