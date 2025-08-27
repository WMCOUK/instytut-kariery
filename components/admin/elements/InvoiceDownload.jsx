import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table'
import { getBillingInfo } from '@/utils/getBillingInfo'
import { DownloadIcon, ExternalLinkIcon } from 'lucide-react'
import moment from 'moment'
import Link from 'next/link'

export default async function InvoiceDownload({ isBillingInfo }) {
	


	const filteredInvoices = isBillingInfo?.invoices?.data?.filter(invoice => invoice.lines.data.length) || []

	console.log(isBillingInfo);
	

	return (
		<>
			<div>
				<h2 className="text-xl mt-8 mb-4">Invoice History</h2>
				<div className="p-4 w-full border border-secondary rounded-lg">
					<Table>
						<TableBody>
							{filteredInvoices.map(invoice => (
								<TableRow key={invoice.id}>
									<TableCell className="font-medium">
										{moment(new Date(invoice.created * 1000)).format("MMM DD, YYYY")}{" "}
										<Link title="view invoice" href={invoice.hosted_invoice_url || "#"} target="_blank">
											<ExternalLinkIcon className="inline h-4 w-4 ml-1 hover:text-blue-500" />
										</Link>
									</TableCell>
									<TableCell>${(invoice.total / 100).toFixed(2)}</TableCell>
									<TableCell>
										{invoice.status === "open" && (
											<Link title="Pay now" href={invoice.hosted_invoice_url || "#"} target="_blank">
												<Badge variant="destructive" className="ml-2">
													Past Due
													<ExternalLinkIcon className="inline h-4 w-4 ml-1" />
												</Badge>
											</Link>
										)}
										{invoice.status === "paid" && (
											<Badge variant="success" className="ml-2">
												Paid
											</Badge>
										)}
									</TableCell>
									<TableCell>
										<Link title="download" href={invoice.invoice_pdf || "#"} target="_blank">
											<DownloadIcon className="inline h-4 w-4 ml-1 hover:text-blue-500" />
										</Link>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</div>
			</div>
		</>
	)
}
