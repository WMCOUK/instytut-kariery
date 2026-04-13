import { Skeleton } from "@/components/ui/skeleton"

export default function DashboardLoading() {
	return (
		<div className="relative min-h-screen">
			{/* Sidebar skeleton (desktop only) */}
			<aside className="hidden md:block fixed left-0 top-0 h-full w-[260px] border-r bg-background p-4 space-y-3">
				<Skeleton className="h-10 w-32 mb-6" />
				{[...Array(8)].map((_, i) => (
					<Skeleton key={i} className="h-10 w-full" />
				))}
			</aside>

			{/* Header skeleton */}
			<header className="fixed top-0 right-0 left-0 md:left-[260px] h-[88px] border-b bg-background flex items-center justify-between px-6">
				<Skeleton className="h-8 w-48" />
				<div className="flex items-center gap-3">
					<Skeleton className="h-9 w-9 rounded-full" />
					<Skeleton className="h-9 w-9 rounded-full" />
				</div>
			</header>

			{/* Content skeleton */}
			<div className="pt-[88px] pb-20 md:pl-[260px]">
				<main className="container mx-auto p-6 space-y-6">
					{/* Breadcrumb */}
					<div className="space-y-2">
						<Skeleton className="h-4 w-48" />
						<Skeleton className="h-8 w-64" />
					</div>

					{/* Stats grid */}
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
						{[...Array(4)].map((_, i) => (
							<Skeleton key={i} className="h-32 rounded-lg" />
						))}
					</div>

					{/* Table/list area */}
					<Skeleton className="h-12 w-full rounded-md" />
					<div className="space-y-2">
						{[...Array(6)].map((_, i) => (
							<Skeleton key={i} className="h-16 w-full rounded-md" />
						))}
					</div>
				</main>
			</div>
		</div>
	)
}
