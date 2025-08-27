
import { baseUrl } from '@/utils/baseUrl'
import useSWR from 'swr'
import { fetcher } from '../common'

export const fetchAdminAuditLogs = (page) => {
  const { data, error, mutate, isLoading } = useSWR(
    `${baseUrl}/api/v1/admin/audit-logs?page=${page}`,
    fetcher
  )
  return {
    auditLogs: data?.auditLogs || [],
    totalPage: data?.totalPage || 0,
    error,
    mutate,
    isLoading,
  }
}