"use client"
import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  Dialog,
  DialogTrigger,
} from "@/components/ui/dialog"
import * as LucideIcons from "lucide-react"
import { useRouter } from "next/navigation";
import Bottom from '@/app/Common/Bottom/Bottom'
import CS from '@/app/Common/CustomerService/CS'

export default function HomePage() {
  const [showNotifications, setShowNotifications] = useState(false)
  const router = useRouter()
    const [storedUser, setStoredUser] = useState(null)
  
    useEffect(() => {
      const userData = localStorage.getItem("user")
      if (!userData) {
        router.push("/login")
      } else {
        setStoredUser(JSON.parse(userData))
      }
    }, [])

  const navTabs = [
    { name: "Service", iconName: "Briefcase", href: "#", color: "from-blue-500 to-cyan-500" },
    { name: "Event", iconName: "CalendarDays", href: "/event", color: "from-purple-500 to-pink-500" },
    { name: "Withdrawal", iconName: "Wallet", href: "/withdrawal", color: "from-green-500 to-emerald-500" },
    { name: "Deposit", iconName: "CreditCard", href: "/deposit", color: "from-orange-500 to-red-500" },
    { name: "T & C", iconName: "FileText", href: "/terms-and-conditions", color: "from-indigo-500 to-purple-500" },
    { name: "Certificate", iconName: "Award", href: "/certificate", color: "from-yellow-500 to-orange-500" },
    { name: "FAQs", iconName: "HelpCircle", href: "#", color: "from-teal-500 to-cyan-500" },
    { name: "About", iconName: "Info", href: "/about", color: "from-rose-500 to-pink-500" },
  ]

  const vipLevels = [
    {
      level: "VIP1",
      amount: "100.00 USD",
      iconName: "Star",
      color: "from-amber-400 to-yellow-500",
      bgColor: "bg-gradient-to-br from-amber-50 to-yellow-50",
    },
    {
      level: "VIP2",
      amount: "500.00 USD",
      iconName: "Crown",
      color: "from-purple-500 to-violet-600",
      bgColor: "bg-gradient-to-br from-purple-50 to-violet-50",
    },
    {
      level: "VIP3",
      amount: "1500.00 USD",
      iconName: "Gem",
      color: "from-emerald-500 to-teal-600",
      bgColor: "bg-gradient-to-br from-emerald-50 to-teal-50",
    },
    {
      level: "VIP4",
      amount: "5000.00 USD",
      iconName: "Diamond",
      color: "from-blue-600 to-indigo-700",
      bgColor: "bg-gradient-to-br from-blue-50 to-indigo-50",
    },
  ]

  const notifications = [
    "🎉 Important update regarding service changes. Please check your inbox for details.",
    "🚀 NEW EVENT: Coming soon! Stay tuned for more information.",
    "💎 Don't miss out on our special VIP offers!",
  ]

  // Prevent rendering until localStorage is checked
  if (!storedUser) return null

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
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

      <main className="flex-1 overflow-auto pb-24">
        {/* Enhanced Hero Section */}
        <section className="relative w-full h-[400px] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-800"></div>
          <div className="absolute inset-0 bg-[url('/placeholder.svg?height=400&width=1600')] bg-cover bg-center opacity-20"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>

          {/* Floating Elements */}
          <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-32 h-32 bg-purple-400/20 rounded-full blur-2xl animate-pulse delay-1000"></div>

          <div className="relative z-10 flex flex-col items-center justify-center h-full p-6 text-center">
            <div className="mb-6 p-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20">
              <LucideIcons.Sparkles className="h-12 w-12 text-yellow-300 mx-auto animate-spin" />
            </div>
            <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-4 leading-tight">
              Empowering Your
              <span className="block bg-gradient-to-r from-yellow-300 to-pink-300 bg-clip-text text-transparent">
                Digital Journey
              </span>
            </h2>
            <p className="text-xl text-blue-100 max-w-2xl mb-8">
              Discover seamless services, exclusive events, and unparalleled support in our premium platform.
            </p>
            <Button className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white font-bold px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              Get Started Today
              <LucideIcons.ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </section>

        {/* Enhanced Navigation Tabs */}
        <section className="w-full py-12 bg-white/50">
          <div className="max-w-7xl mx-auto px-4 md:px-6">

            <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
              Our Services
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-6">
              {navTabs.map((tab) => {
                const IconComponent = LucideIcons[tab.iconName]
                if (tab.name === "Service") {
                  return (
                    <div key={tab.name} className="w-full">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="ghost"
                            className="group relative w-full h-32 p-0 overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border border-gray-100"
                          >
                            <div
                              className={`absolute inset-0 bg-gradient-to-br ${tab.color} opacity-10 group-hover:opacity-20 transition-opacity`}
                            ></div>
                            <div className="relative z-10 flex flex-col items-center justify-center gap-3 p-4">
                              <div className={`p-3 rounded-xl bg-gradient-to-r ${tab.color} shadow-lg`}>
                                {IconComponent && <IconComponent className="h-6 w-6 text-white" />}
                              </div>
                              <span className="text-sm font-bold text-slate-700 group-hover:text-slate-900 transition-colors">
                                {tab.name}
                              </span>
                            </div>
                          </Button>
                        </DialogTrigger>
                        <CS />
                      </Dialog>
                    </div>
                  )
                } else {
                  return (
                    <Link key={tab.name} href={tab.href} className="w-full">
                      <Button
                        variant="ghost"
                        className="group relative w-full h-32 p-0 overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border border-gray-100"
                      >
                        <div
                          className={`absolute inset-0 bg-gradient-to-br ${tab.color} opacity-10 group-hover:opacity-20 transition-opacity`}
                        ></div>
                        <div className="relative z-10 flex flex-col items-center justify-center gap-3 p-4">
                          <div className={`p-3 rounded-xl bg-gradient-to-r ${tab.color} shadow-lg`}>
                            {IconComponent && <IconComponent className="h-6 w-6 text-white" />}
                          </div>
                          <span className="text-sm font-bold text-slate-700 group-hover:text-slate-900 transition-colors">
                            {tab.name}
                          </span>
                        </div>
                      </Button>
                    </Link>
                  )
                }
              })}
            </div>
          </div>
        </section>

        {/* Premium VIP Levels */}
        <section className="w-full py-16 bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 relative overflow-hidden">
          {/* Background Effects */}
          <div className="absolute inset-0 bg-[url('/placeholder.svg?height=400&width=1600')] bg-cover bg-center opacity-5"></div>
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"></div>

          <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-white mb-4">Exclusive VIP Levels</h2>
              <p className="text-xl text-blue-200 max-w-2xl mx-auto">
                Unlock premium benefits and exclusive rewards with our VIP membership tiers
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {vipLevels.map((vip, index) => {
                const IconComponent = LucideIcons[vip.iconName]
                return (
                  <Card
                    key={vip.level}
                    className="group relative p-6 text-center bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl hover:bg-white/20 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 overflow-hidden"
                  >
                    {/* Animated Background */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${vip.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                    ></div>

                    {/* Rank Badge */}
                    <div className="absolute -top-3 -right-3 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {index + 1}
                    </div>

                    <div className="relative z-10">
                      <div
                        className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${vip.color} shadow-2xl mb-6 group-hover:scale-110 transition-transform duration-300`}
                      >
                        {IconComponent && <IconComponent className="h-10 w-10 text-white" />}
                      </div>

                      <h3 className="text-3xl font-extrabold text-white mb-2 group-hover:text-yellow-300 transition-colors">
                        {vip.level}
                      </h3>

                      <div className="mb-4">
                        <p className="text-2xl font-bold text-yellow-300 mb-1">{vip.amount}</p>
                        <p className="text-blue-200 text-sm">Minimum Investment</p>
                      </div>

                      <div className="space-y-2 text-sm text-blue-100">
                        <div className="flex items-center justify-center gap-2">
                          <LucideIcons.Check className="h-4 w-4 text-green-400" />
                          <span>Premium Support</span>
                        </div>
                        <div className="flex items-center justify-center gap-2">
                          <LucideIcons.Check className="h-4 w-4 text-green-400" />
                          <span>Exclusive Events</span>
                        </div>
                        <div className="flex items-center justify-center gap-2">
                          <LucideIcons.Check className="h-4 w-4 text-green-400" />
                          <span>Priority Processing</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                )
              })}
            </div>

            <div className="flex justify-center mt-12">
              <Link href="/vip-levels">
                <Button className="group bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white font-bold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                  View All VIP Benefits
                  <LucideIcons.Crown className="ml-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="w-full py-16 bg-gradient-to-br from-blue-50 to-indigo-100">
          <div className="max-w-7xl mx-auto px-4 md:px-6 text-center">

            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
              Why Choose Us?
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Experience the future of digital services with our comprehensive platform designed for your success.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="p-6 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <LucideIcons.Shield className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">Secure & Reliable</h3>
                <p className="text-slate-600">Bank-level security with 99.9% uptime guarantee</p>
              </div>

              <div className="p-6 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <LucideIcons.Zap className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">Lightning Fast</h3>
                <p className="text-slate-600">Instant transactions and real-time processing</p>
              </div>

              <div className="p-6 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <LucideIcons.Users className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">24/7 Support</h3>
                <p className="text-slate-600">Round-the-clock customer support team</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Enhanced Fixed Badge */}
      <div className="fixed bottom-28 right-4 z-50">
        <Button className="group flex items-center gap-3 px-6 py-4 rounded-full shadow-2xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white transition-all duration-300 transform hover:scale-105 border border-white/20 backdrop-blur-sm">
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
            <LucideIcons.UserCircle className="h-5 w-5" />
          </div>
          <div className="text-left">
            <p className="text-xs text-purple-100">Welcome</p>
            <p className="font-bold text-sm">{JSON.parse(localStorage.getItem("user")).username}</p>
          </div>
          <LucideIcons.ChevronUp className="h-4 w-4 group-hover:-translate-y-1 transition-transform" />
        </Button>
      </div>

      <Bottom />
    </div>
  )
}
