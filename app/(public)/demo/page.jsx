import LayoutDemo from "@/components/landing/layout/demo"
import CredentialsCard from "@/components/landing/sections/demo/credentials-card"
// import CandidateFeaturesShowcase from "@/components/landing/sections/demo/CandidateFeaturesShowcase"
// import DashboardShowcase from "@/components/landing/sections/demo/DashboardShowcase"
// import DemoHero from "@/components/landing/sections/demo/DemoHero"
// import FeaturesMarquee from "@/components/landing/sections/demo/FeaturesMarquee"
// import JobFeaturesShowcase from "@/components/landing/sections/demo/JobFeaturesShowcase"
import PackageShowcase from "@/components/landing/sections/demo/PackageShowcase"
import PageShowcase from "@/components/landing/sections/demo/PageShowcase"
// import ProfileFeaturesShowcase from "@/components/landing/sections/demo/ProfileFeaturesShowcase"
// import RecruiterFeaturesShowcase from "@/components/landing/sections/demo/RecruiterFeaturesShowcase"
// import SettingsFeaturesShowcase from "@/components/landing/sections/demo/SettingsFeaturesShowcase"
// import WhyPurchaseSection from "@/components/landing/sections/demo/WhyPurchaseSection"

export default function DemoPage() {
	return (
		<LayoutDemo>
			<main className="pt-16">
				{/* <DemoHero /> */}
				{/* <FeaturesMarquee /> */}
				<PageShowcase />
				<CredentialsCard />
				{/* <WhyPurchaseSection /> */}
				{/* <JobFeaturesShowcase /> */}
				{/* <RecruiterFeaturesShowcase /> */}
				{/* <CandidateFeaturesShowcase /> */}
				{/* <ProfileFeaturesShowcase /> */}
				{/* <SettingsFeaturesShowcase /> */}
				{/* <DashboardShowcase /> */}
				<PackageShowcase />
			</main>
		</LayoutDemo>
	)
}

