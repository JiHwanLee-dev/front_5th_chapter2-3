import { HTMLAttributes } from "react"

export interface TableProps extends HTMLAttributes<HTMLTableElement> {
  className?: string
}

export interface TableHeaderProps extends HTMLAttributes<HTMLTableSectionElement> {
  className?: string
}

export interface TableBodyProps extends HTMLAttributes<HTMLTableSectionElement> {
  className?: string
}

export interface TableRowProps extends HTMLAttributes<HTMLTableRowElement> {
  className?: string
}

export interface TableHeadProps extends HTMLAttributes<HTMLTableCellElement> {
  className?: string
}

export interface TableCellProps extends HTMLAttributes<HTMLTableCellElement> {
  className?: string
}
