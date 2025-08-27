import SectionTitle from '@/components/landing/elements/SectionTitle/SectionTitle1'
import LayoutLanding1 from '@/components/landing/layout/landing/LayoutLanding1'
import NewsletterSection1 from '@/components/landing/sections/newsletter/NewsletterSection1'
// import NewsletterSection1 from '@/components/sections/landing/newsletter/NewsletterSection1'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, MapPin, Phone } from 'lucide-react'

const ContactPage = () => {
	return (
		<LayoutLanding1
			breadcrumbTitle="Contact Us"
			breadcrumbSubTitle="We will be glad to hear from you"
		>
			<section className="py-20">
				<div className="container">
					<div className="mb-16">
						<SectionTitle
							style={2}
							title="Get in touch!"
							subTitle="We will be glad to hear from you"
						/>
					</div>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-center mb-16">
						<Card>
							<CardContent className="p-6">
								<Phone className="mb-6 h-12 w-12 mx-auto text-primary" />
								<div className="leading-relaxed">
									<span className="mb-4 inline-block text-muted-foreground">Phone</span>
									<p className='text-lg font-medium'>+ 48 654-430-309</p>
									<p className='text-lg font-medium'>+ 1 6532-430-309</p>
								</div>
							</CardContent>
						</Card>
						<Card>
							<CardContent className="p-6">
								<Mail className="mb-6 h-12 w-12 mx-auto text-primary" />
								<div className="leading-relaxed">
									<span className="mb-4 inline-block text-muted-foreground">E-mail</span>
									<p className='text-lg font-medium'>contact@test.com</p>
									<p className='text-lg font-medium'>pat@example.com</p>
								</div>
							</CardContent>
						</Card>
						<Card>
							<CardContent className="p-6">
								<MapPin className="mb-6 h-12 w-12 mx-auto text-primary" />
								<div className="leading-relaxed">
									<span className="mb-4 inline-block text-muted-foreground">Address</span>
									<p className='text-lg font-medium'>11567 E Broadview Dr</p>
									<p className='text-lg font-medium'>Colorado(CO), 80117</p>
								</div>
							</CardContent>
						</Card>
					</div>
					<div className="max-w-2xl lg:max-w-3xl mx-auto mt-12 mb-16">
						<div className="text-center">
							<h2 className="text-3xl font-bold mb-2">Write your opinion</h2>
							<p className="text-muted-foreground">We will be glad to hear from you</p>
						</div>
					</div>
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
						<div>
							<form className="space-y-4">
								<Input type="text" placeholder="Subject" />
								<Input type="text" placeholder="Name" />
								<Input type="email" placeholder="name@example.com" />
								<Textarea className="min-h-[200px]" placeholder="Message..." />
								<Button type="submit" size="lg">Submit</Button>
							</form>
						</div>
						<div className="w-full h-[440px] rounded-lg overflow-hidden">
							<iframe
								src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2643.6895046810805!2d-122.52642526124438!3d38.00014098339506!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085976736097a2f%3A0xbe014d20e6e22654!2sSan Rafael%2C California%2C Hoa Kỳ!5e0!3m2!1svi!2s!4v1678975266976!5m2!1svi!2s"
								width="100%"
								height="100%"
								style={{ border: 0 }}
								allowFullScreen
								loading="lazy"
								referrerPolicy="no-referrer-when-downgrade"
							/>
						</div>
					</div>
				</div>
			</section>

			<NewsletterSection1 />
		</LayoutLanding1>
	)
}

export default ContactPage

