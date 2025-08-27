'use client'
import { SWRConfig } from 'swr'
import { swrOptions } from './common'

export function SWRProvider({ children }) {
	return <SWRConfig value={swrOptions}>{children}</SWRConfig>
}
