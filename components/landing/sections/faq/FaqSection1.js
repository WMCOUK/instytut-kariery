'use client'

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion"
import { brandName } from "@/utils"



const faqData = [
	{
		"ques": `How do I create an account on your ${brandName}?`,
		"ans": `To create an account, simply click on the Sign Up or Register button on our homepage. Fill in the required information, including your name, email address, and password. Once you submit the registration form, you will receive a verification email to activate your account`
	},
	{
		"ques": `How much does it cost to use your ${brandName}`,
		"ans": `Our ${brandName}s free to use for job seekers. There are no charges for browsing job listings, applying for positions, or accessing basic features. However, there may be optional premium services available for employers or additional features that require a subscription or paymen`
	},
	{
		"ques": `How can I search for jobs on your ${brandName}`,
		"ans": `We provide a search bar on our homepage where you can enter keywords related to the job you're looking for, such as job title, industry, or location. Additionally, we offer advanced search options and filters to help you refine your search based on specific criteria, such as salary range, experience level, or company name`
	},
	{
		"ques": `How often are new job listings added to your ${brandName}`,
		"ans": `We strive to ensure our job listings are up-to-date and constantly refreshed. New job opportunities are added regularly, as employers post vacancies on our platform. We recommend checking our ${brandName}requently or setting up job alerts to receive notifications for newly posted positions that match your preferences`
	},
	{
		"ques": `Can I apply for jobs directly through your ${brandName}`,
		"ans": `Yes, you can apply for jobs directly through our ${brandName}Once you find a job listing that interests you, click on the Apply or Submit Application button. You may be prompted to upload your resume, cover letter, or other required documents. Follow the instructions provided by the employer and submit your application securely through our platform`
	},
	{
		"ques": `Can I edit or update my resume on your ${brandName}`,
		"ans": `Yes, you can edit and update your resume on our ${brandName}After logging into your account, navigate to your profile or dashboard, where you will find options to edit your personal information, work experience, skills, and qualifications. Make the necessary changes, save your updates, and ensure your most recent resume is available to employers`
	},
	{
		"ques": `How can I receive job alerts or notifications?`,
		"ans": `To receive job alerts or notifications, you can set up email alerts through your account settings. Specify your preferred job criteria, such as location, industry, or job title, and choose how often you want to receive alerts (daily, weekly, etc.). You will then receive email notifications when new job listings match your specified preferences`
	},
	{
		"ques": `Is my personal information secure on your ${brandName}`,
		"ans": `We take the security and privacy of your personal information seriously. We employ industry-standard security measures to protect your data from unauthorized access, loss, or misuse. However, we recommend reviewing our privacy policy to understand how we collect, use, and safeguard your information`
	},
	{
		"ques": `How can I contact your customer support?`,
		"ans": `If you have any questions, concerns, or need assistance, our customer support team is here to help. You can reach out to us through the Contact Us page on our ${brandName}r by sending an email to [support email address]. We strive to respond to inquiries promptly and provide you with the necessary support`
	},
	{
		"ques": `How can employers post job openings on your ${brandName}`,
		"ans": `Employers can post job openings on our ${brandName}y creating an employer account. They can access our employer portal, where they can enter job details, requirements, and contact information. Employers may also have the option to enhance their job listings with additional features to attract more qualified candidates`
	}
]

export default function FaqSection1() {
	return (
		<div className="w-full space-y-6">
			<Accordion type="single" collapsible className="w-full">
				{faqData.map((item, index) => (
					<AccordionItem key={index} value={`item-${index}`} className="py-5">
						<AccordionTrigger className="text-left">
							{item.ques}
						</AccordionTrigger>
						<AccordionContent className="text-base">
							{item.ans}
						</AccordionContent>
					</AccordionItem>
				))}
			</Accordion>
		</div>
	)
}

