/**
 * 태그 목록을 가져오는 API 함수
 */
export const fetchTagsApi = async () => {
  const response = await fetch("/api/posts/tags")
  if (!response.ok) throw new Error("태그 불러오기 실패")
  return response.json() // 태그 배열 반환
}
