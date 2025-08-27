
"use client"
import { Button } from "@/components/ui/button"
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog"
import { ChevronRight } from 'lucide-react'
import { useState } from "react"
import PricingDialog from "./PricingDialog"

export default function Price1() {
	const [open, setOpen] = useState(false)

	return (
		<div className="flex justify-center p-8">
			<Button
				variant="default"
				className="rounded-full w-full sm:w-auto px-4 sm:px-6 py-2 text-sm sm:text-base group relative overflow-hidden"
				onClick={() => setOpen(true)}
			>
				<span className="absolute inset-0 w-full h-full bg-gradient-to-r from-primary/0 via-primary-foreground/20 to-primary/0 -translate-x-full group-hover:animate-shimmer"></span>
				Post a job - $10
				<ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
			</Button>

			<Dialog open={open} onOpenChange={setOpen}>
				<DialogContent className="sm:max-w-[900px]">
					<DialogHeader>
						<DialogTitle className="text-center text-2xl font-bold">Choose a Plan</DialogTitle>
					</DialogHeader>
					<PricingDialog />
				</DialogContent>
			</Dialog>
		</div>
	)
}



