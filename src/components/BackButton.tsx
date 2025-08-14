import Link from "next/link";

interface BackButtonProps {
  href?: string;
  text?: string;
  className?: string;
}

export default function BackButton({
  href = "/",
  text = "뒤로가기",
  className = "flex items-center text-sm sm:text-base text-gray-600 hover:text-blue-600 transition-colors duration-200",
}: BackButtonProps) {
  return (
    <Link href={href} className={className}>
      <svg
        className="w-4 h-4 mr-2"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M10 19l-7-7m0 0l7-7m-7 7h18"
        />
      </svg>
      {text}
    </Link>
  );
}

