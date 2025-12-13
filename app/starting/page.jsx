"use client"
import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import * as LucideIcons from "lucide-react"
import { useRouter } from 'next/navigation';
import { useUsersContext } from "../AllContext/UsersContext"
import Optimization from "./Optimization/Index"
import Bottom from '@/app/Common/Bottom/Bottom'

export default function StartingPage() {
  const router = useRouter()
  const { user } = useUsersContext()

  const [userDetails, setUserDetails] = useState(null)
  const [walletBalance, setWalletBalance] = useState(0)
  const [todayProfit, setTodayProfit] = useState(0)
  const [profilePhotoLink, setProfilePhotoLink] = useState("")
  const [showResetDialog, setShowResetDialog] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)

  const fileInputRef = useRef(null)

  // Load user from localStorage safely (CSR only)
  useEffect(() => {
    const stored = localStorage.getItem("user")

    if (!stored) {
      router.push("/login")
      return
    }

    const parsed = JSON.parse(stored)
    setUserDetails(parsed)
    setWalletBalance(parsed.walletBalance || 0)
    setProfilePhotoLink(parsed.profile?.photoLink || "")
  }, [router])


  // Stop rendering until userDetails is loaded
  if (!userDetails) return null


  const supportReps = [
    { name: "Support Representative 1", phone: "1234567890" },
    { name: "Support Representative 2", phone: "1234567891" },
    { name: "Support Representative 3", phone: "1234567892" }
  ]


  const userinfo = {
    profilePic: "/professional-profile-avatar.png",
    name: userDetails.username,
    vipLevel: `VIP${userDetails.currentVIPLevel.number} - ${userDetails.currentVIPLevel.name}`,
    totalBalance: walletBalance.toFixed(2),
    walletBalance: walletBalance.toFixed(2),
    frozenBalance: "0.00",
    todayProfit: todayProfit.toFixed(2),
    salary: "0.00",
  }


  const notifications = [
    "🎉 Important update regarding service changes. Please check your inbox for details.",
    "🚀 NEW EVENT: Coming soon! Stay tuned for more information.",
    "💎 Don't miss out on our special VIP offers!",
  ]


  // Upload Profile Image
  const handleProfileImageUpload = (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onloadend = () => {
      const base64 = reader.result

      const stored = localStorage.getItem("user")
      if (!stored) return

      const parsed = JSON.parse(stored)
      parsed.profile = parsed.profile || {}
      parsed.profile.photoLink = base64

      localStorage.setItem("user", JSON.stringify(parsed))
      setProfilePhotoLink(base64)
    }

    reader.readAsDataURL(file)
  }

  // Frozen balance logic
  const frozenBalance = userDetails.walletBalance <= 0
    ? Math.abs(userDetails.totalBalance || 0) + Math.abs(userDetails.walletBalance || 0)
    : 0

 if (!user) return null

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Enhanced Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 border-b border-white/20 shadow-lg">
        <div className="flex items-center justify-between p-4">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
              <LucideIcons.Zap className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent tracking-wide">
              YourBrand
            </h1>
          </Link>
          <div className="flex items-center gap-3 relative">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative text-slate-600 hover:text-blue-600 transition-colors rounded-xl hover:bg-blue-50"
            >
              <LucideIcons.Bell className="h-6 w-6" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-red-500 to-pink-500 rounded-full animate-pulse"></div>
            </Button>
            <Link
              href="/profile"
              className="text-slate-600 hover:text-purple-600 transition-colors rounded-xl hover:bg-purple-50 p-2"
            >
              <LucideIcons.UserCircle className="h-6 w-6" />
            </Link>

            {/* Enhanced Notification Dropdown */}
            {showNotifications && (
              <Card className="absolute top-full right-0 mt-3 w-80 bg-white/95 backdrop-blur-xl border border-white/20 shadow-2xl rounded-2xl z-50 overflow-hidden">
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <LucideIcons.Bell className="h-5 w-5" />
                    Notifications
                  </h3>
                </div>
                <div className="p-4">
                  {notifications.length > 0 ? (
                    <ul className="space-y-3">
                      {notifications.map((notification, index) => (
                        <li
                          key={index}
                          className="text-sm text-slate-700 p-3 rounded-xl bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-100 hover:shadow-md transition-all duration-200"
                        >
                          {notification}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-slate-500 text-sm text-center py-4">No new notifications.</p>
                  )}
                </div>
              </Card>
            )}
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-auto p-4 md:p-6 pb-32 lg:pb-48">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Enhanced User Profile and Balance Section */}
          <Card className="relative p-6 lg:p-8 bg-gradient-to-br from-white to-blue-50/50 shadow-2xl border border-white/20 rounded-3xl overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5"></div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-2xl"></div>

            <div className="relative z-10">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-8">

                <div className="relative">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleProfileImageUpload}
                    className="hidden"
                    aria-label="Upload profile picture"
                  />
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="relative group w-28 h-28 rounded-3xl overflow-hidden border-4 border-white shadow-2xl bg-gradient-to-br from-blue-500 to-purple-600 p-1 hover:shadow-3xl transition-shadow cursor-pointer"
                  >
                    {profilePhotoLink ? (
                      <div className="w-full h-full rounded-2xl overflow-hidden">
                        <Image
                          src={profilePhotoLink || "/placeholder.svg"}
                          alt="Profile Picture"
                          width={120}
                          height={120}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-full h-full rounded-2xl overflow-hidden bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                        <LucideIcons.User className="h-12 w-12 text-white" />
                      </div>
                    )}
                    {/* Upload overlay on hover */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center rounded-2xl">
                      <LucideIcons.Camera className="h-6 w-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </button>

                  {/* Online Status */}
                  <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full border-4 border-white flex items-center justify-center">
                    <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
                  </div>
                </div>

                <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-2">
                    Hi, {user.username}
                  </h2>
                  <div className="flex items-center gap-2 mb-3 px-3 py-1 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-full">
                    <LucideIcons.Crown className="h-4 w-4 text-yellow-600" />
                    <span className="text-sm font-medium text-slate-700">VIP{user.currentVIPLevel.number} - {user.currentVIPLevel.name}</span>
                  </div>
                </div>
              </div>

              {/* Enhanced Balance Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-100">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-600">
                      <LucideIcons.Wallet className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-sm font-medium text-slate-600">Total Balance</span>
                  </div>
                  <p className="text-2xl font-bold text-blue-600">${user.totalBalance.toFixed(2)}</p>
                </div>

                <div className="p-4 rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 border border-green-100">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600">
                      <LucideIcons.PiggyBank className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-sm font-medium text-slate-600">Wallet Balance</span>
                  </div>
                  <p className="text-2xl font-bold text-green-600">${user.walletBalance.toFixed(2)}</p>
                </div>

                <div className="p-4 rounded-2xl bg-gradient-to-br from-purple-50 to-violet-50 border border-purple-100">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 rounded-xl bg-gradient-to-r from-purple-500 to-violet-600">
                      <LucideIcons.TrendingUp className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-sm font-medium text-slate-600">Today's Profit</span>
                  </div>
                  <p className="text-2xl font-bold text-purple-600">${user.commissionTotal.toFixed(2)}</p>
                </div>

                <div className="p-4 rounded-2xl bg-gradient-to-br from-orange-50 to-red-50 border border-orange-100">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 rounded-xl bg-gradient-to-r from-orange-500 to-red-600">
                      <LucideIcons.Lock className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-sm font-medium text-slate-600">Frozen Balance</span>
                  </div>
                  <p className="text-2xl font-bold text-orange-600">${frozenBalance.toFixed(2)}</p>
                </div>

                <div className="p-4 rounded-2xl bg-gradient-to-br from-indigo-50 to-blue-50 border border-indigo-100">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 rounded-xl bg-gradient-to-r from-indigo-500 to-blue-600">
                      <LucideIcons.DollarSign className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-sm font-medium text-slate-600">Salary</span>
                  </div>
                  <p className="text-2xl font-bold text-indigo-600">${userinfo.salary}</p>
                </div>
              </div>
            </div>
          </Card>

          <Optimization user={user} />

          {/* Enhanced Task Reset Dialog */}
          <Dialog open={showResetDialog} onOpenChange={setShowResetDialog}>
            <DialogContent className="sm:max-w-[425px] bg-white/95 backdrop-blur-xl border border-white/20 rounded-2xl">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Contact Support to Reset Tasks
                </DialogTitle>
                <DialogDescription className="text-slate-600">
                  Congratulations! You have completed all 40 tasks. Please contact a support representative to reset
                  your tasks and continue earning.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                {supportReps.map((rep, index) => (
                  <a key={index} href={`https://wa.me/${rep.phone}`} target="_blank" rel="noopener noreferrer">
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-slate-700 hover:text-green-600 hover:bg-green-50 rounded-xl p-4 transition-all duration-200"
                    >
                      <div className="p-2 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 mr-3">
                        <LucideIcons.MessageCircle className="h-4 w-4 text-white" />
                      </div>
                      {rep.name}
                    </Button>
                  </a>
                ))}
              </div>
            </DialogContent>
          </Dialog>

          {/* Enhanced Notice Section */}
          <Card className="p-6 bg-gradient-to-br from-yellow-50 to-orange-50 shadow-xl border border-yellow-100 rounded-3xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-2xl bg-gradient-to-r from-yellow-500 to-orange-600">
                <LucideIcons.Info className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                Important Notice
              </h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-4 bg-white/70 rounded-2xl border border-yellow-200">
                <div className="p-2 rounded-xl bg-gradient-to-r from-blue-100 to-cyan-100">
                  <LucideIcons.Clock className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <span className="font-semibold text-slate-700">Online Support Hours</span>
                  <p className="text-slate-600">09:30 - 21:30 (Daily)</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-white/70 rounded-2xl border border-yellow-200">
                <div className="p-2 rounded-xl bg-gradient-to-r from-green-100 to-emerald-100">
                  <LucideIcons.MessageSquare className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <span className="font-semibold text-slate-700">Need Assistance?</span>
                  <p className="text-slate-600">Contact our online support team for help!</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </main>

      <Bottom />
    </div>
  )
}
