import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const FAQs = [
	{
		question: "What is Full Stack Kit?",
		answers: [
			"Full Stack Kit is a collection of prebuilt full-stack web development features and components designed to accelerate your project development.",
			"It offers features like seamless authentication, role-based access control, payments, subscriptions, internationalization, and more.",
			"It also includes a wide range of prebuilt UI components to help you build your app's interface and landing pages faster."
		]
	},
	{
		question: "How does Full Stack Kit get distributed?",
		answers: [
			"The Full Stack Kit codebase is distributed as a full-stack Next.js application via a GitHub repository. After your purchase, you'll be asked for your GitHub username, and you'll receive an email granting you access. You can clone the repository and start building immediately."
		]
	},
	{
		question: "Who can use Full Stack Kit?",
		answers: [
			"Full Stack Kit is ideal for developers and teams who want to build SaaS or web applications quickly.",
			"It's designed for those who want to save time by focusing on the app’s core logic instead of repetitive foundational setup.",
			"If you're a developer or student looking to learn Next.js from a real-world codebase, Full Stack Kit is a great resource.",
			"If you're not a developer, Full Stack Kit may not be suitable for your needs."
		]
	},
	{
		question: "What is the technology stack used in Full Stack Kit?",
		answers: [
			"Full Stack Kit is built with Next.js, TypeScript, Tailwind CSS, and Prisma with PostgreSQL as the default database, but you can switch to others like MySQL or MongoDB.",
			"It includes features such as user authentication, role-based access control, payments, subscriptions, internationalization, and much more."
		]
	},
	{
		question: "Can I customize Full Stack Kit?",
		answers: [
			"Yes, Full Stack Kit is fully customizable. You can modify the codebase to suit your specific project requirements.",
			"Whether you need to add new features, integrate third-party services, or adjust existing components, Full Stack Kit offers flexibility."
		]
	},
	{
		question: "Does Full Stack Kit offer documentation?",
		answers: [
			"Yes, Full Stack Kit comes with comprehensive documentation to guide you through setup and feature usage.",
			"It covers everything from installation to customization, making it easy to implement the toolkit into your project."
		]
	},
	{
		question: "Is there a support community for Full Stack Kit?",
		answers: [
			"After your purchase, you'll gain access to our exclusive Discord server where you can ask questions, request help, and collaborate with other Full Stack Kit users.",
			"Our community and support team are there to assist with any issues you may encounter."
		]
	},
	{
		question: "How can I request new features for Full Stack Kit?",
		answers: [
			"You can submit feature requests in the dedicated section of our Discord community.",
			"We review requests regularly and work on adding new features based on user feedback and demand."
		]
	},
	{
		question: "Are updates included with Full Stack Kit?",
		answers: [
			"Yes, when you purchase Full Stack Kit, you get lifetime access to updates. You can pull the latest changes from the GitHub repository at any time.",
			"We consistently update the codebase with new features, bug fixes, and improvements to ensure the toolkit stays up to date."
		]
	},
	{
		question: "Can I get a refund for Full Stack Kit?",
		answers: [
			"Due to the nature of digital products, Full Stack Kit purchases are non-refundable.",
			"We recommend reviewing the documentation and asking any questions before purchasing to ensure it’s the right fit for your needs."
		]
	}
]

export default function FaqSection2() {
	return (
		<section className="flex flex-col gap-2 py-24 w-full max-w-4xl mx-auto p-4" id="faqs">
			<h3 className="text-3xl md:text-4xl mb-4 max-w-xl mx-auto font-extrabold tracking-tight leading-none">
				Frequently Asked Questions
			</h3>

			<Accordion type="single" collapsible className="w-full flex flex-col gap-4">
				{FAQs.map((faq) => (
					<AccordionItem key={faq.question} value={faq.question}>
						<AccordionTrigger className="text-2xl">{faq.question}</AccordionTrigger>
						<AccordionContent className="mt-4 text-gray-200 flex flex-col gap-2">
							{faq.answers.map((answer, idx) => (
								<p className="text-lg" key={idx}>
									{answer}
								</p>
							))}
						</AccordionContent>
					</AccordionItem>
				))}
			</Accordion>
		</section>
	)
}
