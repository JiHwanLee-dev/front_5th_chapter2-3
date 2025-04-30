// src/widgets/userDetailDialog/ui/UserDetailDialog.tsx
import { FC } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../../shared/ui"
import { UserDetails } from "../../../entities/user/ui/UserDetails"
import { User } from "../../../entities/user/model/types"

interface UserDetailDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  user: User | null
  title?: string
}

export const UserDetailDialog: FC<UserDetailDialogProps> = ({ open, onOpenChange, user, title = "사용자 정보" }) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <UserDetails user={user} />
      </DialogContent>
    </Dialog>
  )
}
