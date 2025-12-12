"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import * as LucideIcons from "lucide-react"

export default function AboutPage() {
  const pathname = usePathname()

  const bottomNavLinks = [
    { name: "Home", icon: LucideIcons.Home, href: "/" },
    { name: "Starting", icon: LucideIcons.PlayCircle, href: "/starting" },
    { name: "Records", icon: LucideIcons.ClipboardList, href: "#" },
  ]

  const features = [
    {
      icon: LucideIcons.Shield,
      title: "Secure Platform",
      description: "Bank-level security with advanced encryption to protect your data and funds",
      color: "from-blue-500 to-cyan-600",
      bgColor: "from-blue-50 to-cyan-50",
    },
    {
      icon: LucideIcons.Zap,
      title: "Lightning Fast",
      description: "Instant transactions and real-time processing for seamless user experience",
      color: "from-purple-500 to-violet-600",
      bgColor: "from-purple-50 to-violet-50",
    },
    {
      icon: LucideIcons.Users,
      title: "24/7 Support",
      description: "Round-the-clock customer support team ready to assist you anytime",
      color: "from-green-500 to-emerald-600",
      bgColor: "from-green-50 to-emerald-50",
    },
    {
      icon: LucideIcons.TrendingUp,
      title: "Growth Focused",
      description: "Helping businesses scale and reach new heights in the digital landscape",
      color: "from-orange-500 to-red-600",
      bgColor: "from-orange-50 to-red-50",
    },
  ]

  const stats = [
    {
      icon: LucideIcons.Users,
      value: "50K+",
      label: "Active Users",
      color: "from-blue-500 to-cyan-600",
    },
    {
      icon: LucideIcons.Globe,
      value: "100+",
      label: "Countries",
      color: "from-green-500 to-emerald-600",
    },
    {
      icon: LucideIcons.DollarSign,
      value: "$10M+",
      label: "Processed",
      color: "from-purple-500 to-violet-600",
    },
    {
      icon: LucideIcons.Award,
      value: "99.9%",
      label: "Uptime",
      color: "from-orange-500 to-red-600",
    },
  ]

  const teamMembers = [
    {
      name: "Ofer Druker",
      role: "Chairman",
      description: "Visionary leader driving innovation in digital transformation",
      icon: LucideIcons.Crown,
      color: "from-yellow-500 to-orange-600",
    },
    {
      name: "Tech Team",
      role: "Development",
      description: "Expert developers building cutting-edge solutions",
      icon: LucideIcons.Code,
      color: "from-blue-500 to-cyan-600",
    },
    {
      name: "Support Team",
      role: "Customer Success",
      description: "Dedicated professionals ensuring customer satisfaction",
      icon: LucideIcons.Headphones,
      color: "from-green-500 to-emerald-600",
    },
    {
      name: "Security Team",
      role: "Platform Security",
      description: "Cybersecurity experts protecting your digital assets",
      icon: LucideIcons.Shield,
      color: "from-red-500 to-pink-600",
    },
  ]

  const values = [
    {
      icon: LucideIcons.Target,
      title: "Innovation",
      description: "Constantly pushing boundaries with cutting-edge technology",
      color: "from-indigo-500 to-purple-600",
    },
    {
      icon: LucideIcons.Heart,
      title: "Trust",
      description: "Building lasting relationships through transparency and reliability",
      color: "from-pink-500 to-rose-600",
    },
    {
      icon: LucideIcons.Rocket,
      title: "Excellence",
      description: "Delivering exceptional quality in everything we do",
      color: "from-teal-500 to-cyan-600",
    },
  ]

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
            About Us
          </h1>
          <div className="w-12 sm:w-16" />
        </div>
      </header>

      <main className="flex-1 overflow-auto p-4 md:p-6 pb-32 lg:pb-48">
        <div className="max-w-6xl mx-auto space-y-8 sm:space-y-12">
          {/* Hero Section */}
          <div className="text-center mb-8 sm:mb-12">
            <div className="inline-flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4 px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full">
              <LucideIcons.Info className="h-4 w-4 sm:h-6 sm:w-6 text-blue-600" />
              <span className="text-blue-800 font-semibold text-sm sm:text-base">Our Story</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
              Empowering Digital Innovation
            </h2>
            <p className="text-base sm:text-lg text-slate-600 max-w-3xl mx-auto px-4">
              We're on a mission to revolutionize digital experiences and help businesses thrive in the modern economy
            </p>
          </div>

          {/* Mission Section */}
          <Card className="relative p-6 sm:p-8 lg:p-12 bg-gradient-to-br from-white to-blue-50/50 shadow-2xl border border-white/20 rounded-3xl overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5"></div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-2xl"></div>

            <div className="relative z-10">
              <div className="flex items-center gap-3 sm:gap-4 mb-6">
                <div className="p-3 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg">
                  <LucideIcons.Target className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                  Our Mission
                </h2>
              </div>
              <p className="text-base sm:text-lg text-slate-700 leading-relaxed mb-6">
                Our mission: <span className="font-bold text-blue-600">grow your business</span>. We help our partners
                reach new markets, revolutionize digital interactions, and forge new paths for enterprise success in the
                digital age.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-4 bg-white/70 rounded-2xl border border-blue-100">
                  <div className="p-2 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600">
                    <LucideIcons.CheckCircle className="h-5 w-5 text-white" />
                  </div>
                  <span className="text-slate-700 font-medium">Market Expansion</span>
                </div>
                <div className="flex items-center gap-3 p-4 bg-white/70 rounded-2xl border border-blue-100">
                  <div className="p-2 rounded-xl bg-gradient-to-r from-purple-500 to-violet-600">
                    <LucideIcons.CheckCircle className="h-5 w-5 text-white" />
                  </div>
                  <span className="text-slate-700 font-medium">Digital Innovation</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Stats Section */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <Card
                  key={index}
                  className="p-4 sm:p-6 text-center bg-white/70 backdrop-blur-sm shadow-xl border border-white/20 rounded-3xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                >
                  <div className={`inline-flex p-3 rounded-2xl bg-gradient-to-r ${stat.color} shadow-lg mb-4`}>
                    <Icon className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                  </div>
                  <div className="text-2xl sm:text-3xl font-bold text-slate-800 mb-2">{stat.value}</div>
                  <div className="text-sm sm:text-base text-slate-600 font-medium">{stat.label}</div>
                </Card>
              )
            })}
          </div>

          {/* Jellyfish Family Section */}
          <Card className="p-6 sm:p-8 bg-gradient-to-br from-purple-50 to-violet-50 shadow-2xl border border-purple-100 rounded-3xl">
            <div className="flex items-center gap-3 sm:gap-4 mb-6">
              <div className="p-3 rounded-2xl bg-gradient-to-r from-purple-500 to-violet-600 shadow-lg">
                <LucideIcons.Users className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                Part of the Jellyfish Family
              </h2>
            </div>
            <div className="space-y-4 sm:space-y-6">
              <p className="text-base sm:text-lg text-slate-700 leading-relaxed">
                We are a proud member of the <span className="font-bold text-purple-600">Jellyfish family</span>, led by
                Chairman Ofer Druker, bringing together innovative minds to shape the future of digital business.
              </p>
              <p className="text-base sm:text-lg text-slate-700 leading-relaxed">
                Jellyfish works with leading brands to shape the next era of the internet; leveraging{" "}
                <span className="font-semibold text-purple-600">AR, blockchain, AI</span>, and immersive digital
                experiences to future-proof your business.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-6">
                {["AR", "Blockchain", "AI", "Digital"].map((tech, index) => (
                  <div key={index} className="p-3 sm:p-4 text-center bg-white/70 rounded-2xl border border-purple-100">
                    <div className="text-sm sm:text-base font-bold text-purple-600">{tech}</div>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* Features Section */}
          <div>
            <div className="text-center mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold mb-4 bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                Why Choose Us
              </h2>
              <p className="text-base sm:text-lg text-slate-600">
                Discover what makes our platform the preferred choice for businesses worldwide
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {features.map((feature, index) => {
                const Icon = feature.icon
                return (
                  <Card
                    key={index}
                    className={`p-6 sm:p-8 bg-gradient-to-br ${feature.bgColor} shadow-xl border border-white/20 rounded-3xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105`}
                  >
                    <div className={`inline-flex p-3 rounded-2xl bg-gradient-to-r ${feature.color} shadow-lg mb-4`}>
                      <Icon className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-800 mb-3">{feature.title}</h3>
                    <p className="text-base sm:text-lg text-slate-600 leading-relaxed">{feature.description}</p>
                  </Card>
                )
              })}
            </div>
          </div>

          {/* Team Section */}
          <div>
            <div className="text-center mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold mb-4 bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                Our Team
              </h2>
              <p className="text-base sm:text-lg text-slate-600">Meet the dedicated professionals behind our success</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {teamMembers.map((member, index) => {
                const Icon = member.icon
                return (
                  <Card
                    key={index}
                    className="p-6 text-center bg-white/70 backdrop-blur-sm shadow-xl border border-white/20 rounded-3xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                  >
                    <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${member.color} shadow-lg mb-4`}>
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-800 mb-2">{member.name}</h3>
                    <div className="text-sm font-medium text-slate-500 mb-3">{member.role}</div>
                    <p className="text-sm text-slate-600 leading-relaxed">{member.description}</p>
                  </Card>
                )
              })}
            </div>
          </div>

          {/* Values Section */}
          <Card className="p-6 sm:p-8 bg-gradient-to-br from-indigo-50 to-purple-50 shadow-2xl border border-indigo-100 rounded-3xl">
            <div className="text-center mb-8">
              <div className="inline-flex p-3 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 shadow-lg mb-4">
                <LucideIcons.Star className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold mb-4 bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                Our Values
              </h2>
              <p className="text-base sm:text-lg text-slate-600">The principles that guide everything we do</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {values.map((value, index) => {
                const Icon = value.icon
                return (
                  <div key={index} className="text-center p-6 bg-white/70 rounded-2xl border border-indigo-100">
                    <div className={`inline-flex p-3 rounded-2xl bg-gradient-to-r ${value.color} shadow-lg mb-4`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-800 mb-3">{value.title}</h3>
                    <p className="text-slate-600 leading-relaxed">{value.description}</p>
                  </div>
                )
              })}
            </div>
          </Card>

          {/* Contact CTA */}
          <Card className="p-6 sm:p-8 text-center bg-gradient-to-r from-blue-500 to-purple-600 shadow-2xl border-0 rounded-3xl">
            <div className="text-white">
              <div className="inline-flex p-3 rounded-2xl bg-white/20 backdrop-blur-sm mb-4">
                <LucideIcons.MessageCircle className="h-6 w-6 sm:h-8 sm:w-8" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold mb-4">Ready to Get Started?</h2>
              <p className="text-lg sm:text-xl mb-6 text-blue-100">
                Join thousands of satisfied customers and experience the future of digital business
              </p>
              <Button className="bg-white text-blue-600 hover:bg-blue-50 font-bold px-8 py-3 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <LucideIcons.ArrowRight className="h-5 w-5 mr-2" />
                Contact Us Today
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
