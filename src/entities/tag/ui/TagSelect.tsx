// src/entities/tag/ui/TagSelect.tsx
import { FC } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../shared/ui"
// import { TagSelectProps } from "../model/types"
import useTagStore from "../model/tagStore"

interface TagSelectProps {
  selectedTag: string
  onTagSelect: (tag: string) => void
  updateURL: () => void
  fetchPostsByTag: (tag: string) => void
}

export const TagSelect: FC<TagSelectProps> = ({ selectedTag, onTagSelect, updateURL, fetchPostsByTag }) => {
  const { tags } = useTagStore()

  return (
    <Select
      value={selectedTag}
      onValueChange={(value) => {
        onTagSelect(value)
        fetchPostsByTag(value)
        updateURL()
      }}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="태그 선택" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">모든 태그</SelectItem>
        {tags.map((tag) => (
          <SelectItem key={tag.url} value={tag.slug}>
            {tag.slug}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export default TagSelect
