"use client"

import TextAlign from "@tiptap/extension-text-align"
import Underline from "@tiptap/extension-underline"
import { EditorContent, useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import { EditorMenuBar } from "./EditorMenuBar"

import { cn } from "@/utils"
import { common, createLowlight } from "lowlight"
import { useCallback, useEffect, useState } from "react"
// import ResizableImage from "./ResizableImage"

const lowlight = createLowlight(common)

const TipTapEditor = ({ value, onChange, className, onImageUpload }) => {
	const [wordCount, setWordCount] = useState(0)

	const editor = useEditor({
		extensions: [
			StarterKit.configure({
				heading: {
					levels: [1, 2, 3],
				},
				bulletList: {
					keepMarks: true,
					keepAttributes: false,
				},
				orderedList: {
					keepMarks: true,
					keepAttributes: false,
				},
			}),
			Underline,
			TextAlign.configure({
				types: ["heading", "paragraph"],
			}),
		],
		content: value,
		onUpdate: ({ editor }) => {
			const html = editor.getHTML()
			onChange(html)
		},
		editable: true,
	})

	const calculateWordCount = useCallback((content) => {
		const text = content.replace(/<[^>]*>/g, "")
		const words = text.trim().split(/\s+/)
		return words.length
	}, [])

	useEffect(() => {
		setWordCount(calculateWordCount(value))
	}, [value, calculateWordCount])

	return (
		<div className={cn("border border-input bg-background rounded-md", className)}>
			{editor && <EditorMenuBar editor={editor} />}
			<EditorContent
				editor={editor}
				className="prose prose-sm sm:prose-base lg:prose-lg xl:prose-xl max-w-none p-4 min-h-[300px] h-[calc(100%-80px)] overflow-y-auto"
			/>
			<style jsx global>{`
        .ProseMirror {
          height: 300px;
          outline: none;
        }
        .ProseMirror p {
          margin-bottom: 1em;
        }
      `}</style>
			<div className="flex justify-between items-center p-2 bg-muted text-muted-foreground text-sm">
				<div>Word count: {wordCount}</div>
			</div>
		</div>
	)
}

export default TipTapEditor

