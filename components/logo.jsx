import { brandName, cn } from "@/utils"
import { Briefcase, Globe, PlaneTakeoff, Rocket, Send } from 'lucide-react'


export default function Logo({
	className = "",
	size = "md",
	variant = "rocket",
	theme = "light",
	font = "modern",
	iconBgColor = "bg-primary",
	showTagline = false,
	tagline = "Recruitment easy",
	animated = false,
	transparentHeader = false,
}) {
	const sizes = {
		xs: { text: "text-sm", tagline: "text-[10px]", icon: 14, padding: "p-1.5", container: "h-6" },
		sm: { text: "text-base", tagline: "text-[11px]", icon: 16, padding: "p-1.5", container: "h-7" },
		md: { text: "text-lg", tagline: "text-xs", icon: 18, padding: "p-2", container: "h-8" },
		lg: { text: "text-xl", tagline: "text-xs", icon: 22, padding: "p-2", container: "h-9" },
		xl: { text: "text-2xl", tagline: "text-sm", icon: 26, padding: "p-2.5", container: "h-10" },
	}

	// Font options
	const fonts = {
		sans: "font-sans",
		serif: "font-serif",
		mono: "font-mono",
		display: "font-sans tracking-wide",
		elegant: "font-serif tracking-wide",
		modern: "font-sans tracking-tight",
		condensed: "font-sans tracking-tighter",
		expanded: "font-sans tracking-wider",
	}

	// Determine if we should use dark theme
	const isDark =
		theme === "dark" ||
		(theme === "auto" && typeof document !== "undefined" && document.documentElement.classList.contains("dark"))

	// Colors based on theme and transparent header mode
	const primaryColor = transparentHeader ? "text-white" : isDark ? "text-white" : "text-primary"

	const secondaryColor = transparentHeader ? "text-gray-200" : isDark ? "text-gray-300" : "text-foreground"

	const iconColor = "text-primary-foreground"

	// For transparent headers, we want to ensure the icon background has good contrast
	const effectiveIconBgColor = transparentHeader
		? iconBgColor === "bg-primary"
			? "bg-primary/90"
			: iconBgColor
		: iconBgColor

	// Icon mapping with real estate directory related icons
	const icons = {
		plane: <PlaneTakeoff size={sizes[size].icon} className={`${iconColor} stroke-[2.5px]`} />,
		briefcase: <Briefcase size={sizes[size].icon} className={`${iconColor} stroke-[2.5px]`} />,
		rocket: <Rocket size={sizes[size].icon} className={`${iconColor} stroke-[2.5px]`} />,
		paperPlane: <Send size={sizes[size].icon} className={`${iconColor} stroke-[2.5px]`} />,
		globe: <Globe size={sizes[size].icon} className={`${iconColor} stroke-[2.5px]`} />
	}

	return (
		<div className={cn("flex items-center gap-3", animated && "group", className)}>
			{/* Icon with background, shadow, and border radius */}
			<div
				className={cn(
					`${effectiveIconBgColor} rounded-[10px] flex items-center justify-center ${sizes[size].padding}`,
					"shadow-sm relative overflow-hidden",
					animated && "transition-transform duration-300 group-hover:scale-110",
				)}
			>
				{/* Subtle gradient overlay */}
				<div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-70"></div>

				{icons[variant]}
			</div>

			{/* Text content with brand name and optional tagline */}
			<div className="flex flex-col">
				<span
					className={cn(
						`${primaryColor} ${fonts[font]} ${sizes[size].text} font-bold leading-tight`,
						transparentHeader && "drop-shadow-sm",
						animated && "transition-all duration-300 group-hover:tracking-wide",
					)}
				>
					{brandName}
				</span>

				{showTagline && (
					<span
						className={cn(
							`${secondaryColor} ${sizes[size].tagline} leading-tight`,
							transparentHeader && "drop-shadow-sm",
						)}
					>
						{tagline}
					</span>
				)}
			</div>
		</div>
	)
}

