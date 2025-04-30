// features/post/api/postApi.ts
export const fetchPostsApi = async (limit: number, skip: number) => {
  const res = await fetch(`/api/posts?limit=${limit}&skip=${skip}`)
  if (!res.ok) throw new Error("게시물 불러오기 실패")
  return res.json() // { posts, total }
}
