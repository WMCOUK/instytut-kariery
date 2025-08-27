export const subscription = [
	{
		planType: "Basic",
		price: "$10",
		subPriceId: "price_1Ry7sbRtBm8qqDFyb5llilmO",
		features: ["Basic appointment scheduling", "Patient notifications", "1 office location", "Email support"],
		popular: false,
	},
	{
		planType: "Standard",
		price: "$20",
		subPriceId: "price_1Ry7ufRtBm8qqDFyytDuykA5",
		features: [
			"Advanced appointment scheduling",
			"Custom patient notifications",
			"Up to 3 office locations",
			"Phone and email support",
			"Basic analytics",
		],
		popular: true,
	},
	{
		planType: "Premium",
		price: "$30",
		subPriceId: "price_1Ry7vgRtBm8qqDFyaC0Yfhzf",
		features: [
			"Enterprise-level appointment scheduling",
			"Advanced patient engagement tools",
			"Unlimited office locations",
			"24/7 priority support",
			"Advanced analytics and reporting",
			"Custom integrations",
		],
		popular: false,
	},
]

export const sponsorPackage = [
	{
		packageType: "Job Post 30 Days",
		price: "$50",
		sponPriceId: "price_1RyNzCRtBm8qqDFyAp5LegNH",
		features: ["1 job listing", "Visible for 30 days", "Standard placement"],
		popular: false,
	},
	{
		packageType: "Job Post 60 Days",
		price: "$90",
		sponPriceId: "price_1RyO0bRtBm8qqDFyS7WGi3LJ",
		features: ["1 job listing", "Visible for 60 days", "Standard placement"],
		popular: false,
	},
	{
		packageType: "Top Job Boost 7 Days",
		price: "$25",
		sponPriceId: "price_1RyO1YRtBm8qqDFyNx0biVV0",
		features: ["Highlight as Top Job", "Boost visibility for 7 days", "Featured on homepage"],
		popular: true,
	},
	{
		packageType: "Apprenticeship Post",
		price: "$30",
		sponPriceId: "price_1RyO2zRtBm8qqDFykE8Hk68P",
		features: ["1 apprenticeship listing", "Visible for 30 days", "Basic placement"],
		popular: false,
	},
	{
		packageType: "Internship Post",
		price: "$20",
		sponPriceId: "price_1RyO47RtBm8qqDFyOaTl4YS5",
		features: ["1 internship listing", "Visible for 30 days", "Basic placement"],
		popular: false,
	},
]


export const maxJobs = {
	Basic: 100,
	Standard: 200,
	Premium: 300,
}

export const maxRecruiters = {
	Basic: 1,
	Standard: 2,
	Premium: 3,
}