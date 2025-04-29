// src/shared/ui/pagination/PageSizeSelect.tsx
import { FC } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui"

interface PageSizeSelectProps {
  value: string
  onChange: (value: number) => void
  options?: number[]
  label?: {
    before?: string
    after?: string
  }
}

export const PageSizeSelect: FC<PageSizeSelectProps> = ({
  value,
  onChange,
  options = [10, 20, 30],
  label = { before: "표시", after: "항목" },
}) => {
  return (
    <div className="flex items-center gap-2">
      {label.before && <span>{label.before}</span>}
      <Select value={value} onValueChange={(value) => onChange(Number(value))}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder={options[0].toString()} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option} value={option.toString()}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {label.after && <span>{label.after}</span>}
    </div>
  )
}
