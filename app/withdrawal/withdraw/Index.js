import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import * as LucideIcons from "lucide-react"
import { useUsersContext } from '@/app/AllContext/UsersContext'
import Wallet from '@/app/payment-method/Wallets/Index'

const Index = () => {
    const { createTransactionAPI, user, updateUserAPI } = useUsersContext()

    const [withdrawAmount, setWithdrawAmount] = useState(user.walletBalance || 0)
    const [transactionPassword, setTransactionPassword] = useState("")
    const [walletId, setWalletId] = useState(null) // ✅ NEW
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")

    const handleWithdraw = async (e) => {
        e.preventDefault()
        setError("")
        setSuccess("")

        // 🔥 WALLET IS REQUIRED
        if (!walletId) {
            setError("Please select a wallet address.")
            return
        }

        // 🔥 Password check
        if (transactionPassword !== user.transactionPassword) {
            setError("Transaction password is incorrect.")
            return
        }

        // 🔥 Balance check
        if (withdrawAmount > user.totalBalance) {
            setError("Insufficient balance.")
            return
        }

        setLoading(true)

        try {
            // 🔥 INCLUDING WALLET ID IN API CALL
            const result = await createTransactionAPI({
                userId: user._id,
                transactionAmount: parseFloat(withdrawAmount),
                type: "Debit",
                status: "Pending",
                walletId, // 🔥 Added
            })

            if (result.error) {
                setError(result.error)
            } else {
                setSuccess("Withdrawal request submitted successfully!")

                setTransactionPassword("")
            }
        } catch (err) {
            setError("Something went wrong. Please try again.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="xl:col-span-2 order-1 xl:order-2">
            <Card className="p-4 sm:p-6 lg:p-8 bg-white/70 backdrop-blur-sm shadow-2xl border border-white/20 rounded-3xl">

                <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                    <div className="p-2 sm:p-3 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600">
                        <LucideIcons.ArrowDownCircle className="h-4 w-4 sm:h-6 sm:w-6 text-white" />
                    </div>
                    <h2 className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                        Withdraw Funds
                    </h2>
                </div>

                <form onSubmit={handleWithdraw} className="space-y-4 sm:space-y-6">
                    {error && <p className="text-red-600 text-sm sm:text-base">{error}</p>}
                    {success && <p className="text-green-600 text-sm sm:text-base">{success}</p>}

                    {/* AMOUNT */}
                    <div className="space-y-2">
                        <Label htmlFor="withdrawAmount" className="text-slate-700 font-semibold text-sm sm:text-base">
                            Withdrawal Amount (USD)
                        </Label>
                        <div className="relative">
                            <div className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2">
                                <LucideIcons.DollarSign className="h-4 w-4 sm:h-5 sm:w-5 text-slate-400" />
                            </div>
                            <Input
                                id="withdrawAmount"
                                type="number"
                                value={withdrawAmount.toFixed(2)}
                                disabled={true}
                                className="pl-10 sm:pl-12 h-12 sm:h-14 text-base sm:text-lg font-semibold bg-white/80 border-2 border-slate-200 rounded-2xl"
                            />
                        </div>
                    </div>

                    {/* PASSWORD */}
                    <div className="space-y-2">
                        <Label htmlFor="transactionPassword" className="text-slate-700 font-semibold text-sm sm:text-base">
                            Transaction Password
                        </Label>
                        <div className="relative">
                            <div className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2">
                                <LucideIcons.Lock className="h-4 w-4 sm:h-5 sm:w-5 text-slate-400" />
                            </div>
                            <Input
                                id="transactionPassword"
                                type="password"
                                placeholder="Enter your secure password"
                                value={transactionPassword}
                                onChange={(e) => setTransactionPassword(e.target.value)}
                                required
                                disabled={loading}
                                className="pl-10 sm:pl-12 h-12 sm:h-14 text-base sm:text-lg bg-white/80 border-2 border-slate-200 rounded-2xl"
                            />
                        </div>
                    </div>

                    {/* 🔥 WALLET SELECT */}
                    <Wallet setWalletId={setWalletId} walletId={walletId} page="Withdrawal" />  {/* IMPORTANT */}

                    {/* SUBMIT BUTTON */}
                    <Button
                        type="submit"
                        className={`w-full h-12 sm:h-14 text-base sm:text-lg font-bold bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
                        disabled={loading}
                    >
                        {loading ? "Processing..." : (
                            <>
                                <LucideIcons.Send className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                                Process Withdrawal
                            </>
                        )}
                    </Button>
                </form>
            </Card>
        </div>
    )
}

export default Index
