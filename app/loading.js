import Logo from '@/components/logo'
import { Loader } from 'lucide-react'

export default function Preloader() {
	return (
		<div className="flex h-screen items-center justify-center bg-background">
			<div className="relative flex flex-col items-center justify-center space-y-4">
				<Loader className="animate-spin text-primary h-12 w-12 z-10" />
				<div className="z-10 flex flex-col items-center">
					<Logo size='lg' />
					{/* <p className="text-sm text-muted-foreground">Loading your experience...</p> */}
				</div>
				<div className="absolute inset-0 -z-10 bg-gradient-to-t from-primary/10 to-transparent blur-xl" />
			</div>
		</div>
	)
}

