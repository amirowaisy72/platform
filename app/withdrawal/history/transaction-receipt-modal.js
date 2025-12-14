"use client"
import { X, Receipt, Calendar, DollarSign, CreditCard, Wallet, CheckCircle, XCircle, Clock } from "lucide-react"

const TransactionReceiptModal = ({ transaction, onClose }) => {
    if (!transaction) return null

    const getStatusConfig = (status) => {
        const configs = {
            Successful: {
                color: "text-green-600",
                bg: "bg-green-50",
                icon: CheckCircle,
                label: "Successful",
            },
            Pending: {
                color: "text-yellow-600",
                bg: "bg-yellow-50",
                icon: Clock,
                label: "Pending",
            },
            Failed: {
                color: "text-red-600",
                bg: "bg-red-50",
                icon: XCircle,
                label: "Failed",
            },
        }
        return configs[status] || configs.Pending
    }

    const statusConfig = getStatusConfig(transaction.status)
    const StatusIcon = statusConfig.icon

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-purple-600 p-6 rounded-t-3xl">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                                <Receipt className="h-6 w-6 text-white" />
                            </div>
                            <h2 className="text-xl font-bold text-white">Transaction Receipt</h2>
                        </div>
                        <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-xl transition-colors">
                            <X className="h-5 w-5 text-white" />
                        </button>
                    </div>

                    {/* Status Badge */}
                    <div
                        className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${statusConfig.bg} ${statusConfig.color}`}
                    >
                        <StatusIcon className="h-4 w-4" />
                        <span className="font-semibold">{statusConfig.label}</span>
                    </div>
                </div>

                {/* Receipt Body */}
                <div className="p-6 space-y-6">
                    {/* Transaction Amount */}
                    <div className="text-center py-4 bg-gradient-to-r from-slate-50 to-blue-50 rounded-2xl">
                        <p className="text-sm text-slate-600 mb-1">Transaction Amount</p>
                        <p className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            ${transaction.transactionAmount.toFixed(2)}
                        </p>
                    </div>

                    {/* Transaction Details */}
                    <div className="space-y-4">
                        <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl">
                            <Calendar className="h-5 w-5 text-slate-600 mt-0.5" />
                            <div className="flex-1">
                                <p className="text-xs text-slate-500 mb-0.5">Date & Time</p>
                                <p className="text-sm font-semibold text-slate-800">
                                    {new Date(transaction.createdAt).toLocaleDateString("en-US", {
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                    })}
                                </p>
                                <p className="text-xs text-slate-600">
                                    {new Date(transaction.createdAt).toLocaleTimeString("en-US", {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                        second: "2-digit",
                                    })}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl">
                            <CreditCard className="h-5 w-5 text-slate-600 mt-0.5" />
                            <div className="flex-1">
                                <p className="text-xs text-slate-500 mb-0.5">Transaction Type</p>
                                <p
                                    className={`text-sm font-semibold ${transaction.type === "Credit" ? "text-green-600" : "text-red-600"}`}
                                >
                                    {transaction.type === "Credit" ? "Deposit" : "Withdrawal"}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl">
                            <DollarSign className="h-5 w-5 text-slate-600 mt-0.5" />
                            <div className="flex-1">
                                <p className="text-xs text-slate-500 mb-0.5">Transaction ID</p>
                                <p className="text-xs font-mono text-slate-700 break-all">{transaction._id}</p>
                            </div>
                        </div>

                        {/* Wallet Details */}
                        {transaction.walletId && (
                            <div className="border-t border-slate-200 pt-4 mt-4">
                                <div className="flex items-center gap-2 mb-3">
                                    <Wallet className="h-5 w-5 text-purple-600" />
                                    <h3 className="font-semibold text-slate-800">Wallet Information</h3>
                                </div>

                                <div className="space-y-3">
                                    <div className="p-3 bg-purple-50 rounded-xl">
                                        <p className="text-xs text-purple-600 mb-0.5">Wallet Label</p>
                                        <p className="text-sm font-semibold text-purple-900">{transaction.walletId.walletLabel}</p>
                                    </div>

                                    <div className="p-3 bg-purple-50 rounded-xl">
                                        <p className="text-xs text-purple-600 mb-0.5">Wallet Address</p>
                                        <p className="text-xs font-mono text-purple-900 break-all">{transaction.walletId.walletAddress}</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Last Updated */}
                        <div className="text-center text-xs text-slate-500 pt-4 border-t border-slate-200">
                            Last updated: {new Date(transaction.updatedAt).toLocaleString()}
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="p-6 bg-slate-50 rounded-b-3xl">
                    <button
                        onClick={onClose}
                        className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl"
                    >
                        Close Receipt
                    </button>
                </div>
            </div>
        </div>
    )
}

export default TransactionReceiptModal
