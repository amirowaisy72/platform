import { DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import * as LucideIcons from "lucide-react"

const CS = ({ message = null }) => {
  const supportReps = [
    {
      name: "Sarah Ahmed",
      phone: "1234567890",
      role: "Senior Support",
      availability: "Available now",
    },
    {
      name: "Muhammad Khan",
      phone: "1234567891",
      role: "Technical Expert",
      availability: "Available now",
    },
    {
      name: "Ayesha Ali",
      phone: "1234567892",
      role: "Customer Success",
      availability: "Available now",
    },
  ]
  return (
    <DialogContent className="sm:max-w-[500px] bg-white border-0 rounded-3xl shadow-2xl p-0 overflow-hidden">
      <div className="bg-gradient-to-br from-emerald-500 via-green-500 to-teal-500 px-6 pt-8 pb-6">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2.5 bg-white/20 backdrop-blur-sm rounded-xl">
              <LucideIcons.Headphones className="h-6 w-6 text-white" />
            </div>
            <DialogTitle className="text-3xl font-bold text-white">Contact Support</DialogTitle>
          </div>
          <DialogDescription className="text-white/90 text-base leading-relaxed">
            {message || "Our support team is ready to help. Choose a representative to start chatting on WhatsApp."}
          </DialogDescription>
        </DialogHeader>
      </div>

      <div className="px-6 py-6 space-y-3">
        {supportReps.map((rep, index) => (
          <a
            key={index}
            href={`https://wa.me/${rep.phone}`}
            target="_blank"
            rel="noopener noreferrer"
            className="block group"
          >
            <div className="relative bg-gradient-to-br from-slate-50 to-slate-100/50 rounded-2xl p-4 border border-slate-200/60 hover:border-green-300 hover:shadow-lg hover:shadow-green-100/50 transition-all duration-300 hover:-translate-y-0.5">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center text-white font-semibold text-lg shadow-md">
                    {rep.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-slate-900 text-lg leading-tight mb-0.5">{rep.name}</h3>
                  <p className="text-sm text-slate-600 mb-1">{rep.role}</p>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                    <span className="text-xs text-green-600 font-medium">{rep.availability}</span>
                  </div>
                </div>

                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 group-hover:from-green-600 group-hover:to-emerald-700 flex items-center justify-center shadow-md group-hover:shadow-lg transition-all duration-300">
                    <LucideIcons.MessageCircle className="h-5 w-5 text-white" />
                  </div>
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>

      <div className="px-6 pb-6 pt-2">
        <div className="flex items-center justify-center gap-2 text-sm text-slate-500">
          <LucideIcons.Clock className="h-4 w-4" />
          <span>Average response time: 2 minutes</span>
        </div>
      </div>
    </DialogContent>
  )
}

export default CS
