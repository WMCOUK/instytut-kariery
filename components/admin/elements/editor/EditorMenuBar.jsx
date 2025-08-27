import { Toggle } from "@/components/ui/toggle"
import {
	AlignCenter,
	AlignJustify,
	AlignLeft,
	AlignRight,
	Bold,
	Code,
	Heading1,
	Heading2,
	Heading3,
	Italic,
	List,
	ListOrdered,
	Strikethrough,
	Underline,
} from "lucide-react"

export function EditorMenuBar({ editor }) {
	if (!editor) {
		return null
	}

	return (
		<div className="flex flex-wrap gap-2 p-2 bg-muted h-[48px] items-center">
			<Toggle
				size="sm"
				pressed={editor.isActive("bold")}
				onPressedChange={() => editor.chain().focus().toggleBold().run()}
			>
				<Bold className="h-4 w-4" />
			</Toggle>
			<Toggle
				size="sm"
				pressed={editor.isActive("italic")}
				onPressedChange={() => editor.chain().focus().toggleItalic().run()}
			>
				<Italic className="h-4 w-4" />
			</Toggle>
			<Toggle
				size="sm"
				pressed={editor.isActive("underline")}
				onPressedChange={() => editor.chain().focus().toggleUnderline().run()}
			>
				<Underline className="h-4 w-4" />
			</Toggle>
			<Toggle
				size="sm"
				pressed={editor.isActive("strike")}
				onPressedChange={() => editor.chain().focus().toggleStrike().run()}
			>
				<Strikethrough className="h-4 w-4" />
			</Toggle>
			<Toggle
				size="sm"
				pressed={editor.isActive("code")}
				onPressedChange={() => editor.chain().focus().toggleCode().run()}
			>
				<Code className="h-4 w-4" />
			</Toggle>
			<Toggle
				size="sm"
				pressed={editor.isActive("heading", { level: 1 })}
				onPressedChange={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
			>
				<Heading1 className="h-4 w-4" />
			</Toggle>
			<Toggle
				size="sm"
				pressed={editor.isActive("heading", { level: 2 })}
				onPressedChange={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
			>
				<Heading2 className="h-4 w-4" />
			</Toggle>
			<Toggle
				size="sm"
				pressed={editor.isActive("heading", { level: 3 })}
				onPressedChange={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
			>
				<Heading3 className="h-4 w-4" />
			</Toggle>
			<Toggle
				size="sm"
				pressed={editor.isActive("bulletList")}
				onPressedChange={() => editor.chain().focus().toggleBulletList().run()}
			>
				<List className="h-4 w-4" />
			</Toggle>
			<Toggle
				size="sm"
				pressed={editor.isActive("orderedList")}
				onPressedChange={() => editor.chain().focus().toggleOrderedList().run()}
			>
				<ListOrdered className="h-4 w-4" />
			</Toggle>
			<Toggle
				size="sm"
				pressed={editor.isActive({ textAlign: "left" })}
				onPressedChange={() => editor.chain().focus().setTextAlign("left").run()}
			>
				<AlignLeft className="h-4 w-4" />
			</Toggle>
			<Toggle
				size="sm"
				pressed={editor.isActive({ textAlign: "center" })}
				onPressedChange={() => editor.chain().focus().setTextAlign("center").run()}
			>
				<AlignCenter className="h-4 w-4" />
			</Toggle>
			<Toggle
				size="sm"
				pressed={editor.isActive({ textAlign: "right" })}
				onPressedChange={() => editor.chain().focus().setTextAlign("right").run()}
			>
				<AlignRight className="h-4 w-4" />
			</Toggle>
			<Toggle
				size="sm"
				pressed={editor.isActive({ textAlign: "justify" })}
				onPressedChange={() => editor.chain().focus().setTextAlign("justify").run()}
			>
				<AlignJustify className="h-4 w-4" />
			</Toggle>
		</div>
	)
}

