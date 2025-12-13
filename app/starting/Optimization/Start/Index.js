"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import * as LucideIcons from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useUsersContext } from "@/app/AllContext/UsersContext"
import { Dialog } from "@/components/ui/dialog"
import CS from "@/app/Common/CustomerService/CS"

const Index = ({ user, setShowTaskSubmissionDialog, setTask, starting, setStarting }) => {
  const { fetchOptimizationProducts, fetchTasks, getTaskForUser } = useUsersContext()
  const [shuffled, setShuffled] = useState([])
  const [tasksState, setTasksState] = useState([])
  const [showCSModal, setShowCSModal] = useState(false)
  const [csMessage, setCSMessage] = useState("")

  const fetchTasksAndSetState = async () => {
    if (!user?._id) return
    const result = await fetchTasks(user._id)
    setTasksState(result || [])
  }

  useEffect(() => {
    fetchTasksAndSetState()
  }, [user])

  const shuffleArray = (array) => {
    const newArr = [...array]
    for (let i = newArr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
        ;[newArr[i], newArr[j]] = [newArr[j], newArr[i]]
    }
    return newArr
  }

  const handleStartOptimization = async () => {
    if (!user?._id) return
    setStarting(true)

    const totalTasks =
      user?.currentVIPLevel.number === 1
        ? 40
        : user?.currentVIPLevel.number === 2
          ? 45
          : user?.currentVIPLevel.number === 3
            ? 50
            : 55

    if (tasksState.length >= totalTasks) {
      setStarting(false)
      setCSMessage("You've completed your set, please contact support to get reset")
      setShowCSModal(true)
      return
    }
    if(user.totalBalance < 70){
      setCSMessage("Minimum required balance to start optimization is $70")
      setShowCSModal(true)
      return
    }

    try {
      const taskNo = tasksState.length === 0 ? 1 : tasksState.length + 1
      const taskResult = await getTaskForUser(user._id, taskNo)
      console.log(taskResult)

      setTask(taskResult)
      setShowTaskSubmissionDialog(true)
    } catch (error) {
      console.error("handleStartOptimization error:", error)
    }
    setStarting(false)
  }

  useEffect(() => {
    const fetchAndShuffle = async () => {
      if (!user?._id) return

      const products = await fetchOptimizationProducts(8)
      setShuffled(shuffleArray(products))
    }

    fetchAndShuffle()

    const interval = setInterval(() => {
      fetchAndShuffle()
    }, 8000)

    return () => clearInterval(interval)
  }, [user?._id])

  const getItem = (idx) => shuffled[idx] || null

  const totalTasks =
    user?.currentVIPLevel.number === 1
      ? 40
      : user?.currentVIPLevel.number === 2
        ? 45
        : user?.currentVIPLevel.number === 3
          ? 50
          : 55

  return (
    <div className="w-full">
      <Card className="relative p-4 lg:p-6 bg-gradient-to-br from-white/95 to-blue-50/70 shadow-2xl border border-white/30 rounded-3xl overflow-hidden backdrop-blur-xl">
        {/* Background Glow Layers */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5"></div>
        <div className="absolute top-0 right-0 w-36 h-36 bg-gradient-to-br from-blue-400/15 to-purple-400/15 rounded-full blur-2xl"></div>

        <div className="relative z-10">
          {/* Header Section */}
          <div className="mb-6 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 shadow-md">
                <LucideIcons.Sparkles className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent tracking-tight">
                  Product Optimization
                </h2>
                <p className="text-xs lg:text-sm text-slate-500 mt-1">
                  Optimize your products and complete tasks to earn rewards
                </p>
              </div>
            </div>
          </div>

          {/* Task Progress Section */}
          <div className="mb-6 lg:mb-8 p-3 lg:p-5 bg-white/60 rounded-xl border border-white/40 shadow-sm backdrop-blur-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 shadow-sm">
                  <LucideIcons.Target className="h-5 w-5 text-white" />
                </div>
                <span className="text-sm lg:text-base font-semibold text-slate-700">Task Progress</span>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-right">
                  <div className="text-xl lg:text-2xl font-bold text-blue-600">{tasksState.length}</div>
                  <div className="text-xs text-slate-500">of {totalTasks}</div>
                </div>
                <div className="h-12 w-1 bg-gradient-to-b from-blue-600 to-blue-400 rounded-full"></div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mt-4 h-2 bg-blue-100/60 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-500"
                style={{ width: `${(tasksState.length / totalTasks) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-3 gap-2 lg:gap-4 items-center justify-items-center">
            {/* Top Row */}
            {[0, 1, 2].map((i) => {
              const item = getItem(i)
              return (
                <div key={`top-${i}`} className="w-full flex justify-center">
                  <div className="relative overflow-hidden rounded-xl border border-white/50 shadow-md bg-white/70 backdrop-blur-lg p-1">
                    <Image
                      src={item?.productImage?.url || "/placeholder.svg"}
                      alt={item?.productName || "Product"}
                      width={100}
                      height={100}
                      className="w-full h-auto object-cover rounded-lg"
                    />
                  </div>
                </div>
              )
            })}

            {/* Middle Left */}
            <div className="w-full flex justify-center">
              <div className="relative overflow-hidden rounded-xl border border-white/50 shadow-md bg-white/70 backdrop-blur-lg p-1">
                <Image
                  src={getItem(3)?.productImage?.url || "/placeholder.svg"}
                  alt={getItem(3)?.productName || "Product"}
                  width={100}
                  height={100}
                  className="w-full h-auto object-cover rounded-lg"
                />
              </div>
            </div>

            {/* Start Button */}
            <div className="flex items-center justify-center w-full">
              <Button
                onClick={handleStartOptimization}
                disabled={starting}
                className="group relative w-24 sm:w-28 md:w-32 lg:w-60 h-24 sm:h-28 md:h-32 lg:h-60 
               rounded-full bg-gradient-to-br from-blue-600 to-blue-700 
               hover:from-blue-700 hover:to-blue-800 shadow-xl hover:shadow-2xl 
               transition-all duration-300 disabled:opacity-75 disabled:cursor-not-allowed 
               text-white font-semibold flex flex-col items-center justify-center gap-1 border border-blue-500/20"
              >
                <LucideIcons.Play className="h-6 sm:h-7 md:h-8 lg:h-9 w-6 sm:w-7 md:w-8 lg:w-9" />
                <span className="text-xs sm:text-sm md:text-base lg:text-base font-bold">
                  {starting ? "Starting..." : "Start"}
                </span>
              </Button>
            </div>

            {/* Middle Right */}
            <div className="w-full flex justify-center">
              <div className="relative overflow-hidden rounded-xl border border-white/50 shadow-md bg-white/70 backdrop-blur-lg p-1">
                <Image
                  src={getItem(4)?.productImage?.url || "/placeholder.svg"}
                  alt={getItem(4)?.productName || "Product"}
                  width={100}
                  height={100}
                  className="w-full h-auto object-cover rounded-lg"
                />
              </div>
            </div>

            {/* Bottom Row */}
            {[5, 6, 7].map((i) => {
              const item = getItem(i)
              return (
                <div key={`bottom-${i}`} className="w-full flex justify-center">
                  <div className="relative overflow-hidden rounded-xl border border-white/50 shadow-md bg-white/70 backdrop-blur-lg p-1">
                    <Image
                      src={item?.productImage?.url || "/placeholder.svg"}
                      alt={item?.productName || "Product"}
                      width={100}
                      height={100}
                      className="w-full h-auto object-cover rounded-lg"
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </Card>

      <Dialog open={showCSModal} onOpenChange={setShowCSModal}>
        <CS message={csMessage} />
      </Dialog>
    </div>
  )
}

export default Index
