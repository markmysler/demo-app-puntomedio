interface AppLogoProps {
  size?: "sm" | "md" | "lg"
  className?: string
}

export function AppLogo({ size = "md", className = "" }: AppLogoProps) {
  const sizeClasses = {
    sm: "h-6 w-6 text-xs",
    md: "h-8 w-8 text-sm",
    lg: "h-10 w-10 text-base",
  }

  const textSizeClasses = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
  }

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {/* Replace this div with your actual logo image */}
      <div
        className={`${sizeClasses[size]} rounded-lg bg-[#D97757] flex items-center justify-center text-[#FFFBEA] font-bold`}
      >
        PM
      </div>
      <span className={`${textSizeClasses[size]} font-bold text-[#1E1E1E]`}>
        Punto Medio
      </span>
    </div>
  )
}
