"use client"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import * as LucideIcons from "lucide-react"

export default function EventPage() {
  const pathname = usePathname()

  // Enhanced dummy data for events
  const events = [
    {
      id: 1,
      title: "Annual Tech Summit 2025",
      date: "October 26, 2025",
      time: "9:00 AM - 5:00 PM",
      location: "Convention Center, Cityville",
      description: "Join industry leaders and innovators for a day of insightful talks and networking opportunities.",
      image: "/tech-conference-networking.png",
      href: "#",
      category: "Conference",
      price: "Free",
      attendees: "500+",
      color: "from-blue-500 to-cyan-600",
      bgColor: "from-blue-50 to-cyan-50",
      status: "upcoming",
    },
    {
      id: 2,
      title: "Digital Marketing Workshop",
      date: "November 10, 2025",
      time: "10:00 AM - 1:00 PM",
      location: "Online (Zoom)",
      description: "Learn the latest strategies in digital marketing from industry experts and boost your skills.",
      image: "/digital-marketing-workshop.png",
      href: "#",
      category: "Workshop",
      price: "$49",
      attendees: "150+",
      color: "from-purple-500 to-violet-600",
      bgColor: "from-purple-50 to-violet-50",
      status: "upcoming",
    },
    {
      id: 3,
      title: "Startup Pitch Competition",
      date: "December 5, 2025",
      time: "2:00 PM - 6:00 PM",
      location: "Innovation Hub, Downtown",
      description: "Witness groundbreaking ideas and support emerging startups in this exciting competition.",
      image: "/placeholder-xs19e.png",
      href: "#",
      category: "Competition",
      price: "Free",
      attendees: "300+",
      color: "from-orange-500 to-red-600",
      bgColor: "from-orange-50 to-red-50",
      status: "hot",
    },
    {
      id: 4,
      title: "Web Development Bootcamp",
      date: "January 15-17, 2026",
      time: "9:00 AM - 4:00 PM Daily",
      location: "Tech Campus, Northside",
      description: "Intensive 3-day bootcamp to kickstart your career in web development with hands-on projects.",
      image: "/coding-bootcamp-students.png",
      href: "#",
      category: "Bootcamp",
      price: "$299",
      attendees: "50+",
      color: "from-green-500 to-emerald-600",
      bgColor: "from-green-50 to-emerald-50",
      status: "upcoming",
    },
    {
      id: 5,
      title: "AI & Machine Learning Summit",
      date: "February 20, 2026",
      time: "10:00 AM - 6:00 PM",
      location: "Science Center, Midtown",
      description: "Explore the future of AI and machine learning with leading researchers and practitioners.",
      image: "/placeholder-jnkgq.png",
      href: "#",
      category: "Summit",
      price: "$99",
      attendees: "400+",
      color: "from-indigo-500 to-purple-600",
      bgColor: "from-indigo-50 to-purple-50",
      status: "new",
    },
    {
      id: 6,
      title: "UX/UI Design Masterclass",
      date: "March 8, 2026",
      time: "1:00 PM - 5:00 PM",
      location: "Design Studio, Creative District",
      description: "Master the art of user experience and interface design with practical exercises and feedback.",
      image: "/ux-ui-workshop-creative.png",
      href: "#",
      category: "Masterclass",
      price: "$79",
      attendees: "100+",
      color: "from-pink-500 to-rose-600",
      bgColor: "from-pink-50 to-rose-50",
      status: "upcoming",
    },
  ]

  const bottomNavLinks = [
    { name: "Home", icon: LucideIcons.Home, href: "/" },
    { name: "Starting", icon: LucideIcons.PlayCircle, href: "/starting" },
    { name: "Records", icon: LucideIcons.ClipboardList, href: "#" },
  ]

  const getStatusBadge = (status) => {
    switch (status) {
      case "hot":
        return (
          <div className="absolute top-4 right-4 px-3 py-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold rounded-full shadow-lg animate-pulse">
            🔥 HOT
          </div>
        )
      case "new":
        return (
          <div className="absolute top-4 right-4 px-3 py-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-bold rounded-full shadow-lg">
            ✨ NEW
          </div>
        )
      default:
        return null
    }
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
            Events
          </h1>
          <div className="w-16" />
        </div>
      </header>

      <main className="flex-1 overflow-auto p-4 md:p-6 pb-32">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 mb-4 px-6 py-3 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full">
              <LucideIcons.Calendar className="h-6 w-6 text-blue-600" />
              <span className="text-blue-800 font-semibold">Discover Amazing Events</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
              Upcoming Events
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Join our exclusive events and connect with like-minded professionals in your industry
            </p>
          </div>

          {/* Events Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event) => (
              <Card
                key={event.id}
                className="group relative bg-white/70 backdrop-blur-sm shadow-xl border border-white/20 rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2"
              >
                {/* Status Badge */}
                {getStatusBadge(event.status)}

                {/* Event Image */}
                <div className="relative w-full h-56 overflow-hidden">
                  <Image
                    src={event.image || "/placeholder.svg"}
                    alt={event.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  {/* Category Badge */}
                  <div className="absolute bottom-4 left-4">
                    <div
                      className={`px-3 py-1 bg-gradient-to-r ${event.color} text-white text-sm font-bold rounded-full shadow-lg`}
                    >
                      {event.category}
                    </div>
                  </div>
                </div>

                {/* Event Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                    {event.title}
                  </h3>

                  {/* Event Details */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-slate-600 text-sm">
                      <div className="p-1 rounded-lg bg-gradient-to-r from-blue-100 to-cyan-100 mr-3">
                        <LucideIcons.CalendarDays className="h-4 w-4 text-blue-600" />
                      </div>
                      <span className="font-medium">{event.date}</span>
                    </div>
                    <div className="flex items-center text-slate-600 text-sm">
                      <div className="p-1 rounded-lg bg-gradient-to-r from-purple-100 to-violet-100 mr-3">
                        <LucideIcons.Clock className="h-4 w-4 text-purple-600" />
                      </div>
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center text-slate-600 text-sm">
                      <div className="p-1 rounded-lg bg-gradient-to-r from-green-100 to-emerald-100 mr-3">
                        <LucideIcons.MapPin className="h-4 w-4 text-green-600" />
                      </div>
                      <span className="line-clamp-1">{event.location}</span>
                    </div>
                  </div>

                  <p className="text-slate-600 text-sm mb-4 line-clamp-2">{event.description}</p>

                  {/* Event Stats */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <LucideIcons.Users className="h-4 w-4 text-slate-500" />
                        <span className="text-sm text-slate-600 font-medium">{event.attendees}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <LucideIcons.DollarSign className="h-4 w-4 text-slate-500" />
                        <span className="text-sm font-bold text-green-600">{event.price}</span>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <Button
                      className={`flex-1 bg-gradient-to-r ${event.color} hover:opacity-90 text-white font-bold py-3 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105`}
                    >
                      <LucideIcons.Calendar className="h-4 w-4 mr-2" />
                      Register
                    </Button>
                    <Button
                      variant="outline"
                      className="px-4 py-3 rounded-xl border-2 border-slate-200 hover:bg-slate-50 transition-colors bg-transparent"
                    >
                      <LucideIcons.Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Load More Section */}
          <div className="text-center mt-12 mb-20">
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <LucideIcons.Plus className="h-5 w-5 mr-2" />
              Load More Events
            </Button>
          </div>
        </div>
      </main>

      {/* Enhanced Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-xl border-t border-white/20 p-4 shadow-2xl z-40">
        <div className="flex justify-around items-center max-w-md mx-auto">
          {bottomNavLinks.map((link) => {
            const Icon = link.icon
            const isActive = pathname === link.href
            return (
              <Link key={link.name} href={link.href} className="flex-1">
                <Button
                  variant="ghost"
                  className={`flex flex-col items-center gap-2 w-full p-3 rounded-2xl transition-all duration-300 ${isActive
                      ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg transform scale-105"
                      : "text-slate-600 hover:text-blue-600 hover:bg-blue-50"
                    }`}
                >
                  <Icon className="h-6 w-6" />
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
