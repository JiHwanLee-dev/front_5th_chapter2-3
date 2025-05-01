// src/widgets/userDetailDialog/ui/UserDetailDialog.tsx
import { FC } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../../shared/ui"
import { UserDetails } from "../../../entities/user/ui/UserDetails"
import useUserStore from "../../../entities/user/model/useStore"
import usePostDialogStore from "../../../entities/post/model/postDialog"

interface UserDetailDialogProps {
  title?: string
}

export const UserDetailDialog: FC<UserDetailDialogProps> = ({ title = "사용자 정보" }) => {
  const { selectedUser } = useUserStore()
  const { showUserModal, setShowUserModal } = usePostDialogStore()

  return (
    <Dialog open={showUserModal} onOpenChange={setShowUserModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <UserDetails user={selectedUser} />
      </DialogContent>
    </Dialog>
  )
}
