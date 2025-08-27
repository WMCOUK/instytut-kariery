
import FooterDemo from './FooterDemo'
import HeaderDemo from './HeaderDemo'

export default function LayoutDemo({ children,isTransparentHeader }) {
	return (
		<>
			<HeaderDemo isTransparentHeader={isTransparentHeader} />
			{children}
			<FooterDemo />
		</>
	)
}
