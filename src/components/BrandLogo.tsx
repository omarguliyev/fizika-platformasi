import Image from "next/image"
import Link from "next/link"

type BrandLogoProps = {
  className?: string
  imageClassName?: string
  showName?: boolean
}

export function BrandLogo({
  className = "",
  imageClassName = "h-9 w-9",
  showName = false,
}: BrandLogoProps) {
  return (
    <Link
      href="/"
      aria-label="RFO Fizika ana səhifə"
      className={`inline-flex shrink-0 items-center gap-2 ${className}`}
    >
      <Image
        src="/atom.png"
        alt="RFO Fizika atom loqosu"
        width={40}
        height={40}
        className={imageClassName}
      />
      {showName && <span className="font-semibold text-gray-900">RFO Fizika</span>}
    </Link>
  )
}
