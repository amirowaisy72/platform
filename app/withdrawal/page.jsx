"use client"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import * as LucideIcons from "lucide-react"
import TransactionHistory from './history/Index'
import Bottom from '@/app/Common/Bottom/Bottom'
import WithdrawForm from './withdraw/Index'
import { useUsersContext } from "../AllContext/UsersContext"

export default function WithdrawalPage() {
  const { user } = useUsersContext()

  if (!user) return null

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Enhanced Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 border-b border-white/20 shadow-lg">
        <div className="flex items-center justify-between p-4">
          <Link
            href="/"
            className="flex items-center gap-2 sm:gap-3 text-slate-600 hover:text-blue-600 transition-colors rounded-xl hover:bg-blue-50 p-2"
          >
            <LucideIcons.ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
            <span className="font-medium text-sm sm:text-base">Back</span>
          </Link>
          <h1 className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Withdrawal
          </h1>
          <div className="w-12 sm:w-16" />
        </div>
      </header>

      <main className="flex-1 overflow-auto p-3 sm:p-4 md:p-6 pb-28 sm:pb-32 lg:pb-48">
        <div className="max-w-7xl mx-auto w-full">
          {/* Hero Section */}
          <div className="text-center mb-6 sm:mb-8">
            <div className="inline-flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4 px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-green-100 to-emerald-100 rounded-full">
              <LucideIcons.Wallet className="h-4 w-4 sm:h-6 sm:w-6 text-green-600" />
              <span className="text-green-800 font-semibold text-sm sm:text-base">Secure Withdrawals</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
              Manage Your Funds
            </h2>
            <p className="text-base sm:text-lg text-slate-600 px-4">
              Quick and secure withdrawals processed within an hour
            </p>
          </div>

          <Tabs defaultValue="withdraw" className="w-full">
            {/* Enhanced Tabs */}
            <TabsList className="grid w-full grid-cols-2 bg-white/70 backdrop-blur-sm border border-white/20 rounded-2xl p-1 shadow-lg mb-6 sm:mb-8">
              <TabsTrigger
                value="withdraw"
                className="rounded-xl font-semibold transition-all duration-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-lg text-slate-600 text-sm sm:text-base"
              >
                <LucideIcons.ArrowDownCircle className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                Withdraw
              </TabsTrigger>
              <TabsTrigger
                value="history"
                className="rounded-xl font-semibold transition-all duration-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-lg text-slate-600 text-sm sm:text-base"
              >
                <LucideIcons.History className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                History
              </TabsTrigger>
            </TabsList>

            {/* Withdraw Tab */}
            <TabsContent value="withdraw" className="mt-0">
              <div className="grid gap-6 sm:gap-8 xl:grid-cols-3">
                {/* Account Balance Card */}
                <div className="xl:col-span-1 order-2 xl:order-1">
                  <Card className="p-4 sm:p-6 bg-gradient-to-br from-green-50 to-emerald-50 border border-green-100 rounded-3xl shadow-xl">
                    <div className="text-center">
                      <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl mb-3 sm:mb-4">
                        <LucideIcons.Wallet className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                      </div>
                      <h3 className="text-base sm:text-lg font-semibold text-slate-700 mb-2">Available Balance</h3>
                      <p className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-2">
                        {user.walletBalance.toFixed(2)}
                      </p>
                      <p className="text-xs sm:text-sm text-slate-500">Ready for withdrawal</p>
                    </div>
                  </Card>

                  {/* Quick Stats */}
                  <div className="mt-4 sm:mt-6 space-y-3 sm:space-y-4">
                    <div className="flex items-center justify-between p-3 sm:p-4 bg-white/70 backdrop-blur-sm rounded-2xl border border-white/20">
                      <div className="flex items-center gap-2 sm:gap-3">
                        <div className="p-1.5 sm:p-2 rounded-xl bg-gradient-to-r from-blue-100 to-cyan-100">
                          <LucideIcons.Clock className="h-3 w-3 sm:h-4 sm:w-4 text-blue-600" />
                        </div>
                        <span className="text-xs sm:text-sm font-medium text-slate-600">Processing Time</span>
                      </div>
                      <span className="text-xs sm:text-sm font-bold text-slate-800">&lt; 1 Hour</span>
                    </div>
                    <div className="flex items-center justify-between p-3 sm:p-4 bg-white/70 backdrop-blur-sm rounded-2xl border border-white/20">
                      <div className="flex items-center gap-2 sm:gap-3">
                        <div className="p-1.5 sm:p-2 rounded-xl bg-gradient-to-r from-purple-100 to-violet-100">
                          <LucideIcons.Shield className="h-3 w-3 sm:h-4 sm:w-4 text-purple-600" />
                        </div>
                        <span className="text-xs sm:text-sm font-medium text-slate-600">Security</span>
                      </div>
                      <span className="text-xs sm:text-sm font-bold text-green-600">Secured</span>
                    </div>
                  </div>
                </div>

                {/* Withdrawal Form */}
                <WithdrawForm />
              </div>
            </TabsContent>

            {/* History Tab */}
            <TransactionHistory />
          </Tabs>
        </div>
      </main>

      {/* Enhanced Bottom Navigation */}
      <Bottom />
    </div>
  )
}
