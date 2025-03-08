
import * as React from "react"
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react"

import { cn } from "@/lib/utils"
import { ButtonProps, buttonVariants } from "@/components/ui/button"

const Pagination = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex justify-center", className)} {...props} />
))
Pagination.displayName = "Pagination"

const PaginationContent = React.forwardRef<
  HTMLUListElement,
  React.HTMLAttributes<HTMLUListElement>
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    className={cn("flex flex-wrap items-center gap-1", className)}
    {...props}
  />
))
PaginationContent.displayName = "PaginationContent"

const PaginationItem = React.forwardRef<
  HTMLLIElement,
  React.HTMLAttributes<HTMLLIElement>
>(({ className, ...props }, ref) => (
  <li ref={ref} className={cn("", className)} {...props} />
))
PaginationItem.displayName = "PaginationItem"

type PaginationLinkProps = {
  isActive?: boolean
} & Pick<ButtonProps, "size"> &
  React.ButtonHTMLAttributes<HTMLButtonElement>

const PaginationLink = React.forwardRef<HTMLButtonElement, PaginationLinkProps>(
  ({ className, isActive, size = "icon", ...props }, ref) => (
    <button
      ref={ref}
      aria-current={isActive ? "page" : undefined}
      className={cn(
        buttonVariants({
          variant: isActive ? "outline" : "ghost",
          size,
        }),
        "h-8 w-8 rounded-md",
        className
      )}
      {...props}
    />
  )
)
PaginationLink.displayName = "PaginationLink"

const PaginationPrevious = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => (
  <button
    ref={ref}
    className={cn(
      buttonVariants({
        variant: "ghost",
        size: "default",
      }),
      "h-8 w-8 p-0 rounded-md",
      className
    )}
    {...props}
  >
    <ChevronLeft className="h-4 w-4" />
    <span className="sr-only">Previous page</span>
  </button>
))
PaginationPrevious.displayName = "PaginationPrevious"

const PaginationNext = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => (
  <button
    ref={ref}
    className={cn(
      buttonVariants({
        variant: "ghost",
        size: "default",
      }),
      "h-8 w-8 p-0 rounded-md",
      className
    )}
    {...props}
  >
    <ChevronRight className="h-4 w-4" />
    <span className="sr-only">Next page</span>
  </button>
))
PaginationNext.displayName = "PaginationNext"

const PaginationEllipsis = ({
  className,
}: React.HTMLAttributes<HTMLSpanElement>) => (
  <span
    className={cn(
      "h-8 w-8 flex items-center justify-center",
      className
    )}
  >
    <MoreHorizontal className="h-4 w-4" />
    <span className="sr-only">More pages</span>
  </span>
)
PaginationEllipsis.displayName = "PaginationEllipsis"

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
}
