import { useQuery } from "@tanstack/react-query"
import { fetchTagsApi } from "../api/tagApi"
import { useEffect } from "react"

/**
 * 태그 목록을 가져오는 쿼리 훅
 */
export const useTagsQuery = (setTags: (tags: string[]) => void) => {
  const tagsQuery = useQuery({
    queryKey: ["tags"],
    queryFn: fetchTagsApi,
    staleTime: 1000 * 60 * 10, // 10분 캐싱 (태그는 자주 변경되지 않음)
  })

  // 데이터 업데이트
  useEffect(() => {
    if (tagsQuery.data) {
      setTags(tagsQuery.data)
    }
  }, [tagsQuery.data, setTags])

  return {
    tagsQuery,
    fetchTags: () => tagsQuery.refetch(),
  }
}
