"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import * as LucideIcons from "lucide-react"
import Image from "next/image"
import { useUsersContext } from "@/app/AllContext/UsersContext"
import CS from "@/app/Common/CustomerService/CS"

const ConfettiParticles = ({ isVisible }) => {
  if (!isVisible) return null

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {[...Array(40)].map((_, i) => (
        <div
          key={i}
          className="absolute animate-pulse"
          style={{
            left: `${Math.random() * 100}%`,
            top: `-10px`,
            animation: `fall ${2 + Math.random() * 1.5}s linear infinite`,
            animationDelay: `${Math.random() * 0.5}s`,
          }}
        >
          <div
            className={`w-2 h-2 rounded-full ${
              ["bg-amber-400", "bg-yellow-400", "bg-orange-400", "bg-rose-400", "bg-pink-400"][i % 5]
            }`}
            style={{
              boxShadow: `0 0 ${3 + Math.random() * 3}px currentColor`,
            }}
          />
        </div>
      ))}

      <style jsx>{`
        @keyframes fall {
          to {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  )
}

const TaskSubmissionDialog = ({ showTaskSubmissionDialog, task, setShowTaskSubmissionDialog, user, setTasksState }) => {
  const { saveTask } = useUsersContext()
  const [infoMessage, setInfoMessage] = useState("")
  const [productsWithValue, setProductsWithValue] = useState([])
  const [totalComboValue, setTotalComboValue] = useState(0)
  const isCombo = task?.orderType === "Combo"
  const [submitting, setSubmitting] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const [showCSDialog, setShowCSDialog] = useState(false)

  // Prepare combo products values
  useEffect(() => {
    if (isCombo && task.combo && task.combo.Products?.length > 0 && user) {
      const comboPrice = Number(task.combo.comboPrice || 0)
      const userTotalBalance = Number(user.totalBalance || 0)
      const totalValue = user.walletBalance === 0 ? userTotalBalance : comboPrice + userTotalBalance

      setTotalComboValue(totalValue)

      const perProductValue = totalValue / task.combo.Products.length

      const updatedProducts = task.combo.Products.map((p) => ({
        ...p,
        productValue: perProductValue,
      }))

      setProductsWithValue(updatedProducts)
      setShowConfetti(true)
    }
  }, [task, isCombo, user])

  // Commission
  const commissionPercentage = isCombo ? task.combo.commission || 9 : Number(user?.currentVIPLevel?.commission ?? 0)
  const commission = isCombo
    ? (totalComboValue * commissionPercentage) / 100
    : (task?.product?.productValue || 0) * (commissionPercentage / 100)

  const handleSubmitTask = async () => {
    if (!task || !user) return
    setSubmitting(true)

    if (user.walletBalance < 0) {
      setShowCSDialog(true)
      setSubmitting(false)
      return
    }

    try {
      const result = await saveTask({
        userId: user._id,
        orderType: task.orderType,
        combo: isCombo ? { ...task.combo, Products: productsWithValue } : null,
        product: !isCombo ? task.product : null,
        commission,
      })

      if (result) {
        setShowTaskSubmissionDialog(false)
        setShowConfetti(false)
        setInfoMessage("")
        setTasksState(prevState => prevState + 1)
      }
    } catch (err) {
      console.error("handleSubmitTask error:", err)
      setInfoMessage("Failed to submit task. Please try again.")
    }
    setSubmitting(false)
  }

  if (!task) return null

  const truncateName = (name, maxLength = 20) => {
    if (!name) return ""
    return name.length > maxLength ? name.slice(0, maxLength) + "..." : name
  }

  return (
    <>
      <ConfettiParticles isVisible={showConfetti && isCombo} />
      <Dialog open={showTaskSubmissionDialog} onOpenChange={setShowTaskSubmissionDialog}>
        <DialogContent
          className={`w-[95vw] sm:max-w-[500px] md:max-w-[600px] lg:max-w-[700px] max-h-[90vh] overflow-y-auto ${
            isCombo
              ? "bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 border-2 border-amber-300/50 shadow-2xl"
              : "bg-gradient-to-br from-slate-50 to-blue-50 border border-slate-200"
          } rounded-3xl`}
        >
          <div className={`pt-4 sm:pt-6 px-4 sm:px-6 text-center ${isCombo ? "animate-pulse" : ""}`}>
            {isCombo && (
              <div className="mb-3 sm:mb-4 flex justify-center gap-2">
                <LucideIcons.Sparkles className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 text-amber-500 animate-spin" />
                <LucideIcons.Star className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 text-yellow-500 animate-bounce" />
                <LucideIcons.Sparkles className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 text-amber-500 animate-spin" />
              </div>
            )}

            <h2
              className={`text-2xl sm:text-3xl lg:text-4xl font-black mb-2 tracking-tight ${
                isCombo
                  ? "bg-gradient-to-r from-amber-600 via-orange-600 to-rose-600 bg-clip-text text-transparent"
                  : "bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
              }`}
            >
              {isCombo ? "🎁 PREMIUM COMBO!" : "Task Submission"}
            </h2>

            {isCombo && (
              <p className="text-xs sm:text-sm font-semibold text-amber-700 mb-3 sm:mb-4 px-2">
                Congratulations! You won a special combo opportunity
              </p>
            )}
          </div>

          <div className="grid gap-4 sm:gap-6 py-4 sm:py-6 px-4 sm:px-6">
            {isCombo && (
              <div className="relative rounded-xl sm:rounded-2xl bg-gradient-to-r from-amber-400 to-orange-400 p-4 sm:p-6 shadow-xl transform hover:scale-105 transition-transform">
                <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-white/20 backdrop-blur-sm"></div>
                <div className="relative text-center">
                  <p className="text-xs sm:text-sm font-semibold text-amber-900/60 uppercase tracking-widest mb-1 sm:mb-2">
                    Total Combo Value
                  </p>
                  <h3 className="text-3xl sm:text-4xl md:text-5xl font-black text-white drop-shadow-lg">
                    -${task.combo.comboPrice.toFixed(2)}
                  </h3>
                  <div className="flex justify-center gap-2 mt-2 sm:mt-3">
                    <span className="px-2 sm:px-3 py-1 bg-white/30 rounded-full text-xs sm:text-sm font-bold text-white backdrop-blur">
                      {task.combo?.Products?.length || 0} Products
                    </span>
                  </div>
                </div>
              </div>
            )}

            <div
              className={`grid ${isCombo ? "grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4" : "gap-4"} justify-items-center`}
            >
              {(isCombo ? productsWithValue : [task.product]).map((p, idx) => (
                <div
                  key={idx}
                  className={`flex flex-col items-center w-full transform transition-all duration-500 ${
                    isCombo ? `animate-bounce hover:scale-110` : ""
                  }`}
                  style={isCombo ? { animationDelay: `${idx * 100}ms` } : {}}
                >
                  <div
                    className={`relative overflow-hidden rounded-xl sm:rounded-2xl shadow-xl border-3 ${
                      isCombo
                        ? "border-amber-300 bg-gradient-to-br from-amber-100 to-orange-100"
                        : "border-blue-200 bg-blue-50"
                    } w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 hover:shadow-2xl transition-all`}
                  >
                    <Image
                      src={p.productImage?.url || "/placeholder.svg"}
                      alt={p.productName}
                      fill
                      className="object-cover"
                    />
                    {isCombo && <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>}
                  </div>

                  <div className="mt-2 sm:mt-3 text-center w-full px-1">
                    <p className="text-xs sm:text-sm font-bold text-slate-800 leading-tight">
                      {truncateName(p.productName, 15)}
                    </p>
                    <p className={`text-base sm:text-lg font-black ${isCombo ? "text-amber-600" : "text-green-600"}`}>
                      ${p.productValue?.toFixed(2)}
                    </p>
                    <p className="text-[10px] sm:text-xs text-slate-500 font-medium">{p.taskCode || "-"}</p>
                  </div>
                </div>
              ))}
            </div>

            <div
              className={`space-y-3 p-4 sm:p-5 rounded-xl sm:rounded-2xl border-2 shadow-lg ${
                isCombo
                  ? "bg-gradient-to-r from-amber-100 to-orange-100 border-amber-300"
                  : "bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200"
              }`}
            >
              <div className="flex justify-between items-center gap-2">
                <div className="flex items-center gap-2">
                  <LucideIcons.TrendingUp
                    className={`h-4 w-4 sm:h-5 sm:w-5 ${isCombo ? "text-amber-600" : "text-blue-600"}`}
                  />
                  <span
                    className={`text-sm sm:text-base font-semibold ${isCombo ? "text-amber-900" : "text-slate-700"}`}
                  >
                    Your Commission
                  </span>
                </div>
                <div className="text-right">
                  <p className={`text-xl sm:text-2xl font-black ${isCombo ? "text-amber-700" : "text-green-600"}`}>
                    ${commission.toFixed(2)}
                  </p>
                  <p
                    className={`text-[10px] sm:text-xs font-semibold ${isCombo ? "text-amber-600/70" : "text-slate-500"}`}
                  >
                    {commissionPercentage}% commission
                  </p>
                </div>
              </div>
            </div>

            {infoMessage && (
              <div className="text-sm sm:text-base text-red-600 font-bold text-center bg-red-50 p-3 sm:p-4 rounded-xl border border-red-200">
                {infoMessage}
              </div>
            )}

            <Button
              onClick={handleSubmitTask}
              disabled={submitting}
              className={`w-full h-12 sm:h-14 text-base sm:text-lg font-black rounded-xl sm:rounded-2xl shadow-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-75 disabled:cursor-not-allowed ${
                isCombo
                  ? "bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 hover:from-amber-600 hover:via-orange-600 hover:to-rose-600 text-white"
                  : "bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white"
              }`}
            >
              <LucideIcons.CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
              {submitting ? "Processing..." : isCombo ? "Claim Combo" : "Submit Task"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showCSDialog} onOpenChange={setShowCSDialog}>
        <CS />
      </Dialog>
    </>
  )
}

export default TaskSubmissionDialog
