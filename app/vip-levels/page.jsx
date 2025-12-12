"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import * as LucideIcons from "lucide-react"
import { useRouter } from "next/navigation";

export default function VipLevelsPage() {
  const pathname = usePathname()
  const router = useRouter();
  const storedUser = localStorage.getItem("user");

  // Enhanced VIP levels with more detailed information
  const allVipLevels = [
    {
      level: "VIP1",
      name: "Bronze Tier",
      amount: "100.00 USD",
      iconName: "Star",
      depositRequired: 100,
      color: "from-amber-400 to-yellow-500",
      bgColor: "from-amber-50 to-yellow-50",
      borderColor: "border-amber-200",
      commission: "0.4%",
      withdrawalLimit: "1300 USD",
      features: ["Basic Support", "Standard Processing", "Mobile Access"],
      badge: "Popular",
    },
    {
      level: "VIP2",
      name: "Silver Tier",
      amount: "500.00 USD",
      iconName: "Crown",
      depositRequired: 500,
      color: "from-purple-500 to-violet-600",
      bgColor: "from-purple-50 to-violet-50",
      borderColor: "border-purple-200",
      commission: "0.6%",
      withdrawalLimit: "4,000 USD",
      features: ["Priority Support", "Fast Processing", "Advanced Tools", "Email Alerts"],
      badge: "Recommended",
    },
    {
      level: "VIP3",
      name: "Gold Tier",
      amount: "1,500.00 USD",
      iconName: "Gem",
      depositRequired: 1500,
      color: "from-emerald-500 to-teal-600",
      bgColor: "from-emerald-50 to-teal-50",
      borderColor: "border-emerald-200",
      commission: "0.8%",
      withdrawalLimit: "8,000 USD",
      features: ["VIP Support", "Instant Processing", "Premium Tools", "SMS Alerts", "Personal Manager"],
      badge: "Best Value",
    },
    {
      level: "VIP4",
      name: "Diamond Tier",
      amount: "5,000.00 USD",
      iconName: "Diamond",
      depositRequired: 5000,
      color: "from-blue-600 to-indigo-700",
      bgColor: "from-blue-50 to-indigo-50",
      borderColor: "border-blue-200",
      commission: "1.0%",
      withdrawalLimit: "Unlimited",
      features: [
        "24/7 Dedicated Support",
        "Lightning Processing",
        "Exclusive Tools",
        "All Notifications",
        "Personal Manager",
        "Custom Solutions",
      ],
      badge: "Elite",
    },
  ]

  // Current user's VIP level
  const currentUserVipLevel = storedUser
    ? "VIP" + JSON.parse(localStorage.getItem("user")).currentVIPLevel.number
    : null

  // WhatsApp representative numbers
  const supportReps = [
    { name: "Support Representative 1", phone: "1234567890" },
    { name: "Support Representative 2", phone: "1234567891" },
    { name: "Support Representative 3", phone: "1234567892" },
  ]

  const bottomNavLinks = [
    { name: "Home", icon: LucideIcons.Home, href: "/" },
    { name: "Starting", icon: LucideIcons.PlayCircle, href: "/starting" },
    { name: "Records", icon: LucideIcons.ClipboardList, href: "/records" },
  ]

  const benefits = [
    {
      icon: LucideIcons.TrendingUp,
      title: "Higher Commissions",
      description: "Earn more with each transaction as you upgrade your VIP level",
      color: "from-green-500 to-emerald-600",
    },
    {
      icon: LucideIcons.Zap,
      title: "Faster Processing",
      description: "Priority processing for all your transactions and requests",
      color: "from-blue-500 to-cyan-600",
    },
    {
      icon: LucideIcons.Shield,
      title: "Enhanced Security",
      description: "Advanced security features and dedicated account protection",
      color: "from-purple-500 to-violet-600",
    },
    {
      icon: LucideIcons.Headphones,
      title: "Premium Support",
      description: "24/7 dedicated support team for VIP members",
      color: "from-orange-500 to-red-600",
    },
  ]

  if (!storedUser) {
    router.push("/login")
  }

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
            VIP Levels
          </h1>
          <div className="w-12 sm:w-16" />
        </div>
      </header>

      <main className="flex-1 overflow-auto p-4 md:p-6 pb-32 lg:pb-48">
        <div className="max-w-7xl mx-auto space-y-8 sm:space-y-12">
          {/* Hero Section */}
          <div className="text-center mb-8 sm:mb-12">
            <div className="inline-flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4 px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-full">
              <LucideIcons.Crown className="h-4 w-4 sm:h-6 sm:w-6 text-yellow-600" />
              <span className="text-yellow-800 font-semibold text-sm sm:text-base">Premium Membership</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
              Exclusive VIP Tiers
            </h2>
            <p className="text-base sm:text-lg text-slate-600 max-w-3xl mx-auto px-4">
              Unlock premium benefits and exclusive rewards with our VIP membership tiers designed for your success
            </p>
          </div>

          {/* Benefits Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon
              return (
                <Card
                  key={index}
                  className="p-6 text-center bg-white/70 backdrop-blur-sm shadow-xl border border-white/20 rounded-3xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                >
                  <div className={`inline-flex p-3 rounded-2xl bg-gradient-to-r ${benefit.color} shadow-lg mb-4`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-800 mb-2">{benefit.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{benefit.description}</p>
                </Card>
              )
            })}
          </div>

          {/* VIP Levels Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 sm:gap-8">
            {allVipLevels.map((vip, index) => {
              const IconComponent = LucideIcons[vip.iconName]
              const isCurrent = vip.level === currentUserVipLevel
              const isUpgradeable =
                !isCurrent && allVipLevels.indexOf(vip) > allVipLevels.findIndex((l) => l.level === currentUserVipLevel)

              return (
                <Card
                  key={vip.level}
                  className={`group relative p-6 sm:p-8 text-center bg-gradient-to-br ${vip.bgColor} shadow-2xl border-2 ${isCurrent ? vip.borderColor : "border-white/20"
                    } rounded-3xl hover:shadow-3xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 overflow-hidden`}
                >
                  {/* Badge */}
                  {vip.badge && (
                    <div className="absolute -top-3 -right-3 px-3 py-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold rounded-full shadow-lg animate-pulse">
                      {vip.badge}
                    </div>
                  )}

                  {/* Current Level Indicator */}
                  {isCurrent && (
                    <div className="absolute -top-3 -left-3 w-8 h-8 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg">
                      <LucideIcons.Check className="h-4 w-4 text-white" />
                    </div>
                  )}

                  {/* Animated Background */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${vip.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                  ></div>

                  <div className="relative z-10">
                    {/* Icon */}
                    <div
                      className={`inline-flex p-4 sm:p-5 rounded-3xl bg-gradient-to-r ${vip.color} shadow-2xl mb-6 group-hover:scale-110 transition-transform duration-300`}
                    >
                      {IconComponent && <IconComponent className="h-8 w-8 sm:h-10 sm:w-10 text-white" />}
                    </div>

                    {/* Level Info */}
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-800 mb-2 group-hover:text-blue-600 transition-colors">
                      {vip.level}
                    </h3>
                    <div className="text-lg font-semibold text-slate-600 mb-4">{vip.name}</div>

                    {/* Pricing */}
                    <div className="mb-6">
                      <div className="text-2xl sm:text-3xl font-bold text-slate-800 mb-1">
                        ${vip.depositRequired.toLocaleString()}
                      </div>
                      <div className="text-sm text-slate-500">Minimum Deposit</div>
                    </div>

                    {/* Key Stats */}
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center justify-between p-3 bg-white/70 rounded-xl border border-white/20">
                        <span className="text-sm font-medium text-slate-600">Commission</span>
                        <span className="text-sm font-bold text-green-600">{vip.commission}</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-white/70 rounded-xl border border-white/20">
                        <span className="text-sm font-medium text-slate-600">Withdrawal Limit</span>
                        <span className="text-sm font-bold text-blue-600">{vip.withdrawalLimit}</span>
                      </div>
                    </div>

                    {/* Features */}
                    <div className="space-y-2 mb-6">
                      {vip.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center gap-2 text-sm text-slate-600">
                          <LucideIcons.Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>

                    {/* Action Button */}
                    {isCurrent ? (
                      <div className="flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 rounded-2xl font-bold">
                        <LucideIcons.CheckCircle className="h-5 w-5" />
                        Current Level
                      </div>
                    ) : (
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            className={`w-full py-3 text-lg font-bold bg-gradient-to-r ${vip.color} hover:opacity-90 text-white shadow-2xl rounded-2xl transition-all duration-300 transform hover:scale-105`}
                          >
                            <LucideIcons.ArrowUp className="h-5 w-5 mr-2" />
                            Upgrade Now
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px] bg-white/95 backdrop-blur-xl border border-white/20 rounded-2xl">
                          <DialogHeader>
                            <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                              Upgrade to {vip.level}
                            </DialogTitle>
                            <DialogDescription className="text-slate-600">
                              Contact our support team to upgrade to {vip.level} - {vip.name} and unlock exclusive
                              benefits.
                            </DialogDescription>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl border border-blue-100">
                              <div className="flex items-center gap-3 mb-3">
                                <div className={`p-2 rounded-xl bg-gradient-to-r ${vip.color}`}>
                                  {IconComponent && <IconComponent className="h-5 w-5 text-white" />}
                                </div>
                                <div>
                                  <div className="font-bold text-slate-800">
                                    {vip.level} - {vip.name}
                                  </div>
                                  <div className="text-sm text-slate-600">
                                    Deposit: ${vip.depositRequired.toLocaleString()}
                                  </div>
                                </div>
                              </div>
                              <div className="text-sm text-slate-600">
                                Commission: <span className="font-bold text-green-600">{vip.commission}</span> | Limit:{" "}
                                <span className="font-bold text-blue-600">{vip.withdrawalLimit}</span>
                              </div>
                            </div>
                            {supportReps.map((rep, repIndex) => (
                              <a
                                key={repIndex}
                                href={`https://wa.me/${rep.phone}`}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
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
                    )}
                  </div>
                </Card>
              )
            })}
          </div>

          {/* Comparison Table */}
          <Card className="p-6 sm:p-8 bg-white/70 backdrop-blur-sm shadow-2xl border border-white/20 rounded-3xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600">
                <LucideIcons.BarChart3 className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                VIP Comparison
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-slate-200">
                    <th className="text-left p-4 font-bold text-slate-700">Feature</th>
                    {allVipLevels.map((vip) => (
                      <th key={vip.level} className="text-center p-4 font-bold text-slate-700">
                        {vip.level}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-slate-100">
                    <td className="p-4 font-medium text-slate-600">Commission Rate</td>
                    {allVipLevels.map((vip) => (
                      <td key={vip.level} className="text-center p-4 font-bold text-green-600">
                        {vip.commission}
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b border-slate-100">
                    <td className="p-4 font-medium text-slate-600">Withdrawal Limit</td>
                    {allVipLevels.map((vip) => (
                      <td key={vip.level} className="text-center p-4 font-bold text-blue-600">
                        {vip.withdrawalLimit}
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b border-slate-100">
                    <td className="p-4 font-medium text-slate-600">Support Level</td>
                    {allVipLevels.map((vip, index) => (
                      <td key={vip.level} className="text-center p-4">
                        <div className="flex justify-center">
                          {Array.from({ length: index + 1 }, (_, i) => (
                            <LucideIcons.Star key={i} className="h-4 w-4 text-yellow-500 fill-current" />
                          ))}
                        </div>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </Card>

          {/* Call to Action */}
          <Card className="p-6 sm:p-8 text-center bg-gradient-to-r from-blue-500 to-purple-600 shadow-2xl border-0 rounded-3xl">
            <div className="text-white">
              <div className="inline-flex p-3 rounded-2xl bg-white/20 backdrop-blur-sm mb-4">
                <LucideIcons.Sparkles className="h-6 w-6 sm:h-8 sm:w-8" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold mb-4">Ready to Upgrade?</h2>
              <p className="text-lg sm:text-xl mb-6 text-blue-100">
                Join thousands of VIP members and unlock exclusive benefits today
              </p>
              <Button className="bg-white text-blue-600 hover:bg-blue-50 font-bold px-8 py-3 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <LucideIcons.Crown className="h-5 w-5 mr-2" />
                Contact Support
              </Button>
            </div>
          </Card>
        </div>
      </main>

      {/* Enhanced Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-xl border-t border-white/20 p-3 sm:p-4 shadow-2xl z-40">
        <div className="flex justify-around items-center max-w-md mx-auto">
          {bottomNavLinks.map((link) => {
            const Icon = link.icon
            const isActive = pathname === link.href
            return (
              <Link key={link.name} href={link.href} className="flex-1">
                <Button
                  variant="ghost"
                  className={`flex flex-col items-center gap-1 sm:gap-2 w-full p-2 sm:p-3 rounded-2xl transition-all duration-300 ${isActive
                    ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg transform scale-105"
                    : "text-slate-600 hover:text-blue-600 hover:bg-blue-50"
                    }`}
                >
                  <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
                  <span className="text-xs font-semibold">{link.name}</span>
                  {isActive && <div className="w-1 h-1 bg-white rounded-full"></div>}
                </Button>
              </Link>
            )
          })}
        </div>
      </nav>
    </div>
  )
}
