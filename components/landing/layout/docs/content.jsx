
export default function DocsContent({ title, children, path }) {
	return (
		<>
			<div className="mx-auto pb-12">
				<h2 className="text-3xl font-bold pb-5" id={path}>{title}</h2>
				{children}
			</div>
		</>
	)
}
