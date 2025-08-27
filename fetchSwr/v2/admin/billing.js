
import { baseUrl } from '@/utils/baseUrl'
import useSWR from 'swr'
import { fetcher } from '../common'

export const fetchAdminCustomers = (page) => {
  const { data, error, mutate, isLoading } = useSWR(
    `${baseUrl}/api/v1/admin/billing/customers?page=${page}`,
    fetcher
  )
  return {
    customers: data?.customers || [],
    totalPage: data?.totalPage || 0,
    error,
    mutate,
    isLoading,
  }
}

export const fetchAdminCustomerById = (id) => {
  const { data, error, mutate, isLoading } = useSWR(
    id ? `${baseUrl}/api/v1/admin/billing/customers/${id}` : null,
    fetcher
  )
  return {
    customer: data?.customer || null,
    error,
    mutate,
    isLoading,
  }
}

export const fetchAdminSubscriptions = (page) => {
  const { data, error, mutate, isLoading } = useSWR(
    `${baseUrl}/api/v1/admin/billing/subscriptions?page=${page}`,
    fetcher
  )
  return {
    subscriptions: data?.subscriptions || [],
    totalPage: data?.totalPage || 0,
    error,
    mutate,
    isLoading,
  }
}

export const fetchAdminSubscriptionById = (id) => {
  const { data, error, mutate, isLoading } = useSWR(
    id ? `${baseUrl}/api/v1/admin/billing/subscriptions/${id}` : null,
    fetcher
  )
  return {
    subscription: data?.subscription || null,
    error,
    mutate,
    isLoading,
  }
}

export const fetchAdminInvoices = (page) => {
  const { data, error, mutate, isLoading } = useSWR(
    `${baseUrl}/api/v1/admin/billing/invoices?page=${page}`,
    fetcher
  )
  return {
    invoices: data?.invoices || [],
    totalPage: data?.totalPage || 0,
    error,
    mutate,
    isLoading,
  }
}

export const fetchAdminInvoiceById = (id) => {
  const { data, error, mutate, isLoading } = useSWR(
    id ? `${baseUrl}/api/v1/admin/billing/invoices/${id}` : null,
    fetcher
  )
  return {
    invoice: data?.invoice || null,
    error,
    mutate,
    isLoading,
  }
}