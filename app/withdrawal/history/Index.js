import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { TabsContent } from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"
import * as LucideIcons from "lucide-react"
import { useUsersContext } from '@/app/AllContext/UsersContext'

const Index = () => {
    const { getUserTransactionsAPI, user } = useUsersContext()
    const [transactions, setTransactions] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    useEffect(() => {
        const fetchTransactions = async () => {
            if (!user?._id) return
            setLoading(true)
            setError("")

            const result = await getUserTransactionsAPI(user._id)

            if (result.error) {
                setError(result.error)
            } else {
                // Map backend data to table-friendly format
                const formatted = result.map((tx, index) => ({
                    id: tx._id,
                    date: new Date(tx.createdAt).toLocaleDateString(),
                    amount: tx.transactionAmount.toFixed(2),
                    status:
                        tx.status === "Successful"
                            ? "Completed"
                            : tx.status === "Pending"
                                ? "Pending"
                                : "Failed",
                    transactionId: tx._id,
                    method: tx.type === "Debit" ? "Withdraw" : "Deposit",
                    fee: "0.00", // You can customize fee if your backend sends it
                }))
                setTransactions(formatted)
            }

            setLoading(false)
        }

        fetchTransactions()
    }, [user])

    const getStatusBadge = (status) => {
        const statusConfig = {
            Completed: {
                bg: "bg-gradient-to-r from-green-100 to-emerald-100",
                text: "text-green-700",
                icon: LucideIcons.CheckCircle,
            },
            Pending: {
                bg: "bg-gradient-to-r from-yellow-100 to-orange-100",
                text: "text-yellow-700",
                icon: LucideIcons.Clock,
            },
            Failed: {
                bg: "bg-gradient-to-r from-red-100 to-pink-100",
                text: "text-red-700",
                icon: LucideIcons.XCircle,
            },
        }

        const config = statusConfig[status] || statusConfig.Pending
        const Icon = config.icon

        return (
            <div
                className={`inline-flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1 rounded-full text-xs font-semibold ${config.bg} ${config.text}`}
            >
                <Icon className="h-3 w-3" />
                <span className="hidden sm:inline">{status}</span>
                <span className="sm:hidden">{status.charAt(0)}</span>
            </div>
        )
    }

    if (loading)
        return (
            <Card className="p-4 sm:p-6 bg-white/70 backdrop-blur-sm shadow-2xl border border-white/20 rounded-3xl text-center">
                <p>Loading transactions...</p>
            </Card>
        )

    if (error)
        return (
            <Card className="p-4 sm:p-6 bg-white/70 backdrop-blur-sm shadow-2xl border border-white/20 rounded-3xl text-center text-red-600">
                <p>{error}</p>
            </Card>
        )

    return (
        <TabsContent value="history" className="mt-0">
            <Card className="p-4 sm:p-6 bg-white/70 backdrop-blur-sm shadow-2xl border border-white/20 rounded-3xl">
                <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                    <div className="p-2 sm:p-3 rounded-2xl bg-gradient-to-r from-purple-500 to-violet-600">
                        <LucideIcons.History className="h-4 w-4 sm:h-6 sm:w-6 text-white" />
                    </div>
                    <h2 className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                        Transaction History
                    </h2>
                </div>

                {transactions.length > 0 ? (
                    <div className="overflow-x-auto -mx-2 sm:mx-0">
                        <div className="inline-block min-w-full align-middle">
                            <Table className="min-w-full">
                                <TableHeader>
                                    <TableRow className="bg-gradient-to-r from-slate-50 to-blue-50 hover:from-slate-100 hover:to-blue-100 border-b-2 border-slate-200">
                                        <TableHead className="text-slate-700 font-bold text-xs sm:text-sm px-2 sm:px-4">Date</TableHead>
                                        <TableHead className="text-slate-700 font-bold text-xs sm:text-sm px-2 sm:px-4">Amount</TableHead>
                                        <TableHead className="text-slate-700 font-bold text-xs sm:text-sm px-2 sm:px-4">Status</TableHead>
                                        <TableHead className="text-slate-700 font-bold text-xs sm:text-sm px-2 sm:px-4">Type</TableHead>
                                        <TableHead className="text-slate-600 px-2 sm:px-4 hidden sm:table-cell">Fee</TableHead>
                                        <TableHead className="text-slate-500 text-xs font-mono px-2 sm:px-4 hidden lg:table-cell">Transaction ID</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {transactions.map((item) => (
                                        <TableRow key={item.id} className="border-b border-slate-100 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-200">
                                            <TableCell className="font-medium text-slate-700 px-2 sm:px-4 py-2 sm:py-3">
                                                <div className="flex items-center gap-1 sm:gap-2">
                                                    <LucideIcons.Calendar className="h-3 w-3 sm:h-4 sm:w-4 text-slate-400" />
                                                    <span className="text-xs sm:text-sm">{item.date}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell className="px-2 sm:px-4 py-2 sm:py-3">
                                                <div className="font-bold text-slate-800 text-xs sm:text-sm">${item.amount}</div>
                                            </TableCell>
                                            <TableCell className="px-2 sm:px-4 py-2 sm:py-3">{getStatusBadge(item.status)}</TableCell>
                                            <TableCell className="px-2 sm:px-4 py-2 sm:py-3">{item.method}</TableCell>
                                            <TableCell className="text-slate-600 px-2 sm:px-4 py-2 sm:py-3 hidden sm:table-cell">
                                                <div className="flex items-center gap-1 text-xs sm:text-sm">
                                                    <LucideIcons.Minus className="h-3 w-3" />${item.fee}
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-slate-500 text-xs font-mono px-2 sm:px-4 py-2 sm:py-3 hidden lg:table-cell">
                                                {item.transactionId}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </div>
                ) : (
                    <div className="text-center py-8 sm:py-12">
                        <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-slate-100 to-slate-200 rounded-2xl mb-3 sm:mb-4">
                            <LucideIcons.FileX className="h-6 w-6 sm:h-8 sm:w-8 text-slate-400" />
                        </div>
                        <p className="text-slate-500 text-base sm:text-lg">No withdrawal history found</p>
                    </div>
                )}
            </Card>
        </TabsContent>
    )
}

export default Index
