import { forwardRef } from "react"
import { ButtonProps } from "./Button.types"
import { buttonVariants } from "./button-variants"

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant, size, ...props }, ref) => {
  return <button className={buttonVariants({ variant, size, className })} ref={ref} {...props} />
})

Button.displayName = "Button"
