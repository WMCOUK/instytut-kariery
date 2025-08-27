import BreadcrumbLanding from "./BreadcrumbLanding"
import FooterLanding1 from "./FooterLanding1"
import HeaderLanding1 from "./HeaderLanding1"

export default function LayoutLanding1({
	children,
	breadcrumbTitle,
	breadcrumbSubTitle,
	backgroundImage,
	isTransparentHeader,
	breadcrumbItems,
	colorTransparent
}) {
	return (
		<>
			<HeaderLanding1 isTransparentHeader={isTransparentHeader} colorTransparent={colorTransparent} />
			{breadcrumbTitle && (
				<BreadcrumbLanding
					breadcrumbTitle={breadcrumbTitle}
					breadcrumbSubTitle={breadcrumbSubTitle}
					backgroundImage={backgroundImage}
					isTransparentHeader={isTransparentHeader}
					breadcrumbItems={breadcrumbItems}
				/>
			)}
			{children}
			<FooterLanding1 />
		</>
	)
}

