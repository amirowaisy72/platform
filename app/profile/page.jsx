"use client"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import * as LucideIcons from "lucide-react"
import { useState, useRef, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { useUsersContext } from "../AllContext/UsersContext"
import { useRouter } from 'next/navigation';
import Bottom from '@/app/Common/Bottom/Bottom'
import CS from '@/app/Common/CustomerService/CS'

export default function ProfilePage() {
  const { logout } = useUsersContext()
  const router = useRouter();
  const fileInputRef = useRef(null)

  const [storedUser, setStoredUser] = useState("")
  const [profilePhotoLink, setProfilePhotoLink] = useState("")
  const [loggingout, setLoggingout] = useState(false)
  const [user, setUser] = useState({
    name: null,
    invitationCode: null,
    vipLevel: null,
    vipTier: null,
    walletAmount: null,
    commission: null,
    joinDate: null,
  })

  useEffect(() => {
    const userFromStorage = localStorage.getItem("user")
    setStoredUser(userFromStorage)

    if (userFromStorage) {
      const userData = JSON.parse(userFromStorage)
      console.log(userData)

      const joinDate = new Date(userData.createdAt).toLocaleString("en-US", {
        month: "long",
        year: "numeric"
      })

      setUser({
        name: userData.username,
        invitationCode: userData.myinviteCode,
        vipLevel: "VIP " + userData.currentVIPLevel?.number,
        vipTier: userData.currentVIPLevel?.name,
        walletAmount: userData.walletBalance,
        commission: userData.commissionTotal,
        joinDate: joinDate,
      })

      setProfilePhotoLink(userData.profile?.photoLink || "")
    } else {
      router.push("/login")
    }
  }, [router])

  const handleProfileImageUpload = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const base64String = reader.result
        if (storedUser) {
          const userData = JSON.parse(storedUser)
          userData.profile = userData.profile || {}
          userData.profile.photoLink = base64String
          localStorage.setItem("user", JSON.stringify(userData))
          setProfilePhotoLink(base64String)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const financialFeatures = [
    {
      name: "Deposit",
      iconName: "ArrowUpCircle",
      href: "/deposit",
      color: "from-green-500 to-emerald-600",
      bgColor: "from-green-50 to-emerald-50",
    },
    {
      name: "Withdraw",
      iconName: "ArrowDownCircle",
      href: "/withdrawal",
      color: "from-blue-500 to-cyan-600",
      bgColor: "from-blue-50 to-cyan-50",
    },
  ]

  const myDetails = [
    {
      name: "Personal Information",
      iconName: "User",
      href: "/personal-information",
      color: "from-purple-500 to-violet-600",
      bgColor: "from-purple-50 to-violet-50",
    },
    {
      name: "Payment Method",
      iconName: "CreditCard",
      href: "/payment-method",
      color: "from-orange-500 to-red-600",
      bgColor: "from-orange-50 to-red-50",
    },
  ]

  const otherSections = [
    {
      name: "Contact Us",
      iconName: "Mail",
      href: "#",
      color: "from-teal-500 to-cyan-600",
      bgColor: "from-teal-50 to-cyan-50",
      action: "contact",
    },
    {
      name: "Notifications",
      iconName: "Bell",
      href: "#",
      color: "from-pink-500 to-rose-600",
      bgColor: "from-pink-50 to-rose-50",
      action: "notifications",
    },
  ]

  const bottomNavLinks = [
    { name: "Home", icon: LucideIcons.Home, href: "/" },
    { name: "Starting", icon: LucideIcons.PlayCircle, href: "/starting" },
    { name: "Records", icon: LucideIcons.ClipboardList, href: "#" },
  ]

  const [showNotifications, setShowNotifications] = useState(false)
  const [showContactDialog, setShowContactDialog] = useState(false)

  const notifications = [
    "🎉 Important update regarding service changes. Please check your inbox for details.",
    "🚀 NEW EVENT: Coming soon! Stay tuned for more information.",
    "💎 Don't miss out on our special VIP offers!",
  ]

  const supportReps = [
    { name: "Support Representative 1", phone: "1234567890" },
    { name: "Support Representative 2", phone: "1234567891" },
    { name: "Support Representative 3", phone: "1234567892" },
  ]

  const handleLogout = () => {
    setLoggingout(true)
    logout()
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Enhanced Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 border-b border-white/20 shadow-lg">
        <div className="flex items-center justify-between p-4">
          <Link
            href="/"
            className="flex items-center gap-3 text-slate-600 hover:text-blue-600 transition-colors rounded-xl hover:bg-blue-50 p-2"
          >
            <LucideIcons.ChevronLeft className="h-6 w-6" />
            <span className="font-medium">Back</span>
          </Link>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Profile
          </h1>
          <div className="w-16" />
        </div>
      </header>

      <main className="flex-1 overflow-auto p-4 md:p-6 pb-32 lg:pb-48">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Enhanced Profile Header Card */}
          <Card className="relative p-8 bg-gradient-to-br from-white to-blue-50/50 shadow-2xl border border-white/20 rounded-3xl overflow-hidden">
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
                  <h2 className="text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-2">
                    {user.name}
                  </h2>
                  <div className="flex items-center gap-2 mb-3 px-3 py-1 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full">
                    <LucideIcons.Hash className="h-4 w-4 text-blue-600" />
                    <span className="text-sm font-medium text-slate-700">{user.invitationCode}</span>
                  </div>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full shadow-lg">
                      <LucideIcons.Crown className="h-5 w-5 text-white" />
                      <span className="font-bold text-white">{user.vipLevel}</span>
                    </div>
                    <span className="text-lg font-semibold text-slate-600">{user.vipTier}</span>
                  </div>
                  <p className="text-sm text-slate-500">Member since {user.joinDate}</p>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 border border-green-100">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600">
                      <LucideIcons.Wallet className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-sm font-medium text-slate-600">Wallet Balance</span>
                  </div>
                  <p className="text-2xl font-bold text-green-600">${user.walletAmount}</p>
                </div>

                <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-100">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-600">
                      <LucideIcons.TrendingUp className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-sm font-medium text-slate-600">Commission</span>
                  </div>
                  <p className="text-2xl font-bold text-blue-600">${user.commission.toFixed(2)}</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Enhanced Financial Section */}
          <Card className="p-6 bg-white/70 backdrop-blur-sm shadow-xl border border-white/20 rounded-3xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-600">
                <LucideIcons.Banknote className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                My Financial
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {financialFeatures.map((feature) => {
                const IconComponent = LucideIcons[feature.iconName]
                return (
                  <Link key={feature.name} href={feature.href} className="w-full">
                    <Button
                      variant="ghost"
                      className="group relative w-full h-20 p-0 overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border border-gray-100"
                    >
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${feature.bgColor} opacity-50 group-hover:opacity-70 transition-opacity`}
                      ></div>
                      <div className="relative z-10 flex items-center justify-between w-full px-6">
                        <div className="flex items-center gap-4">
                          <div className={`p-3 rounded-xl bg-gradient-to-r ${feature.color} shadow-lg`}>
                            {IconComponent && <IconComponent className="h-6 w-6 text-white" />}
                          </div>
                          <span className="text-lg font-bold text-slate-700 group-hover:text-slate-900 transition-colors">
                            {feature.name}
                          </span>
                        </div>
                        <LucideIcons.ChevronRight className="h-6 w-6 text-slate-400 group-hover:text-slate-600 group-hover:translate-x-1 transition-all" />
                      </div>
                    </Button>
                  </Link>
                )
              })}
            </div>
          </Card>

          {/* Enhanced Details Section */}
          <Card className="p-6 bg-white/70 backdrop-blur-sm shadow-xl border border-white/20 rounded-3xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-2xl bg-gradient-to-r from-purple-500 to-violet-600">
                <LucideIcons.Settings className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                My Details
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {myDetails.map((detail) => {
                const IconComponent = LucideIcons[detail.iconName]
                return (
                  <Link key={detail.name} href={detail.href} className="w-full">
                    <Button
                      variant="ghost"
                      className="group relative w-full h-20 p-0 overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border border-gray-100"
                    >
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${detail.bgColor} opacity-50 group-hover:opacity-70 transition-opacity`}
                      ></div>
                      <div className="relative z-10 flex items-center justify-between w-full px-6">
                        <div className="flex items-center gap-4">
                          <div className={`p-3 rounded-xl bg-gradient-to-r ${detail.color} shadow-lg`}>
                            {IconComponent && <IconComponent className="h-6 w-6 text-white" />}
                          </div>
                          <span className="text-lg font-bold text-slate-700 group-hover:text-slate-900 transition-colors">
                            {detail.name}
                          </span>
                        </div>
                        <LucideIcons.ChevronRight className="h-6 w-6 text-slate-400 group-hover:text-slate-600 group-hover:translate-x-1 transition-all" />
                      </div>
                    </Button>
                  </Link>
                )
              })}
            </div>
          </Card>

          {/* Enhanced Other Section */}
          <Card className="p-6 bg-white/70 backdrop-blur-sm shadow-xl border border-white/20 rounded-3xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-2xl bg-gradient-to-r from-teal-500 to-cyan-600">
                <LucideIcons.MoreHorizontal className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                Support & Settings
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {otherSections.map((section) => {
                const IconComponent = LucideIcons[section.iconName]

                const handleClick = () => {
                  if (section.action === "contact") {
                    setShowContactDialog(true)
                  } else if (section.action === "notifications") {
                    setShowNotifications(!showNotifications)
                  }
                }

                return (
                  <div key={section.name} className="w-full">
                    <Button
                      variant="ghost"
                      onClick={handleClick}
                      className="group relative w-full h-20 p-0 overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border border-gray-100"
                    >
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${section.bgColor} opacity-50 group-hover:opacity-70 transition-opacity`}
                      ></div>
                      <div className="relative z-10 flex items-center justify-between w-full px-6">
                        <div className="flex items-center gap-4">
                          <div className={`p-3 rounded-xl bg-gradient-to-r ${section.color} shadow-lg`}>
                            {IconComponent && <IconComponent className="h-6 w-6 text-white" />}
                          </div>
                          <span className="text-lg font-bold text-slate-700 group-hover:text-slate-900 transition-colors">
                            {section.name}
                          </span>
                        </div>
                        <LucideIcons.ChevronRight className="h-6 w-6 text-slate-400 group-hover:text-slate-600 group-hover:translate-x-1 transition-all" />
                      </div>
                    </Button>
                  </div>
                )
              })}
            </div>
          </Card>

          {/* Enhanced Logout Button */}
          <div className="mt-8 mb-40 lg:mb-12">
            <Button onClick={handleLogout} className="group w-full py-4 text-lg font-bold bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white shadow-2xl rounded-2xl transition-all duration-300 transform hover:scale-105 border border-red-200">
              <div className="flex items-center justify-center gap-3">
                <div className="p-2 rounded-xl bg-white/20">
                  <LucideIcons.LogOut className="h-6 w-6" />
                </div>
                <span>{loggingout ? 'Logging Out...' : 'Logout'}</span>
                <LucideIcons.ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Button>
          </div>
        </div>
      </main>

      {/* Contact Support Dialog */}
      <Dialog open={showContactDialog} onOpenChange={setShowContactDialog}>
        <CS />
      </Dialog>
      
      {/* Enhanced Notification Panel */}
      {showNotifications && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-start justify-center pt-20">
          <Card className="w-full max-w-md mx-4 bg-white/95 backdrop-blur-xl border border-white/20 shadow-2xl rounded-2xl overflow-hidden animate-scale-in">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <LucideIcons.Bell className="h-5 w-5" />
                  Notifications
                </h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowNotifications(false)}
                  className="text-white hover:bg-white/20 rounded-xl"
                >
                  <LucideIcons.X className="h-4 w-4" />
                </Button>
              </div>
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
        </div>
      )}

      {/* Enhanced Bottom Navigation */}
      <Bottom />
    </div>
  )
}
