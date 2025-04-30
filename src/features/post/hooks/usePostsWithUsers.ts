import { useQuery } from "@tanstack/react-query"
import { fetchPostsApi } from "../api/postApi"
import { fetchUsersApi } from "../api/userApi"
import { useEffect } from "react"
import { Post } from "../../../entities/post/model/types"
import usePostStore from "../../../entities/post/model/postStore"
/**
 * 게시물 목록 및 사용자 정보를 가져오고 결합하는 커스텀 훅
 */
export const usePostsWithUsers = (
  limit: number,
  skip: number,
  selectedTag: string | null,
  setTotal: (total: number) => void,
  setLoading: (loading: boolean) => void,
) => {
  // 게시물 쿼리
  const postsQuery = useQuery({
    queryKey: ["posts", limit, skip],
    queryFn: () => fetchPostsApi(limit, skip),
    enabled: !selectedTag,
  })
  const { setPosts } = usePostStore()

  // 사용자 쿼리
  const usersQuery = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsersApi,
    staleTime: 1000 * 60 * 5, // 5분 캐싱
  })

  // 데이터 결합 및 상태 업데이트
  useEffect(() => {
    if (postsQuery.data && usersQuery.data) {
      const postsWithUsers = postsQuery.data.posts.map((post: Post) => ({
        ...post,
        author: usersQuery.data.users.find((user: { id: number }) => user.id === post.userId),
      }))

      setPosts(postsWithUsers)
      setTotal(postsQuery.data.total)
    }
  }, [postsQuery.data, usersQuery.data, setPosts, setTotal])

  // 로딩 상태 관리
  useEffect(() => {
    setLoading(postsQuery.isLoading || postsQuery.isFetching || usersQuery.isLoading || usersQuery.isFetching)
  }, [postsQuery.isLoading, postsQuery.isFetching, usersQuery.isLoading, usersQuery.isFetching, setLoading])

  // 필요한 함수와 상태 반환
  return {
    postsQuery,
    usersQuery,
    fetchPosts: () => {
      postsQuery.refetch()
      usersQuery.refetch()
    },
  }
}
