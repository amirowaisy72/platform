"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import * as LucideIcons from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useUsersContext } from "@/app/AllContext/UsersContext"
import { Dialog } from "@/components/ui/dialog"
import CS from "@/app/Common/CustomerService/CS"

const Index = ({ user, setShowTaskSubmissionDialog, setTask, starting, setStarting, tasksState, setTasksState }) => {
  const { fetchOptimizationProducts, fetchTasks, getTaskForUser } = useUsersContext()
  const [shuffled, setShuffled] = useState([])
  const [showCSModal, setShowCSModal] = useState(false)
  const [csMessage, setCSMessage] = useState("")

  const fetchTasksAndSetState = async () => {
    if (!user?._id) return
    const result = await fetchTasks(user._id)
    setTasksState(result?.length || 0)
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

    if (tasksState >= totalTasks) {
      setStarting(false)
      setCSMessage("You've completed your set, please contact support to get reset")
      setShowCSModal(true)
      return
    }
    if (user.totalBalance < 70) {
      setCSMessage("Minimum required balance to start optimization is $70")
      setShowCSModal(true)
      return
    }

    try {
      const taskNo = tasksState === 0 ? 1 : tasksState + 1
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
      <Card className="relative p-4 lg:p-6 bg-[#3d4f3f] shadow-2xl border border-[#a3d65c]/30 rounded-3xl overflow-hidden backdrop-blur-xl">
        <div className="absolute inset-0 bg-gradient-to-br from-[#a3d65c]/5 to-transparent"></div>
        <div className="absolute top-0 right-0 w-36 h-36 bg-[#a3d65c]/10 rounded-full blur-2xl"></div>

        <div className="relative z-10">
          <div className="mb-6 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-gradient-to-br from-[#a3d65c] to-[#8bc34a] shadow-md">
                <LucideIcons.Sparkles className="h-6 w-6 text-[#2d3e2f]" />
              </div>
              <div>
                <h2 className="text-2xl lg:text-3xl font-bold text-white tracking-tight">Product Optimization</h2>
                <p className="text-xs lg:text-sm text-gray-300 mt-1">
                  Optimize your products and complete tasks to earn rewards
                </p>
              </div>
            </div>
          </div>

          <div className="mb-6 lg:mb-8 p-3 lg:p-5 bg-[#2d3e2f] rounded-xl border border-[#a3d65c]/30 shadow-sm backdrop-blur-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-gradient-to-r from-[#a3d65c] to-[#8bc34a] shadow-sm">
                  <LucideIcons.Target className="h-5 w-5 text-[#2d3e2f]" />
                </div>
                <span className="text-sm lg:text-base font-semibold text-white">Task Progress</span>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-right">
                  <div className="text-xl lg:text-2xl font-bold text-[#a3d65c]">{tasksState}</div>
                  <div className="text-xs text-gray-400">of {totalTasks}</div>
                </div>
                <div className="h-12 w-1 bg-gradient-to-b from-[#a3d65c] to-[#8bc34a] rounded-full"></div>
              </div>
            </div>

            <div className="mt-4 h-2 bg-[#2d3e2f] rounded-full overflow-hidden border border-[#a3d65c]/20">
              <div
                className="h-full bg-gradient-to-r from-[#a3d65c] to-[#8bc34a] rounded-full transition-all duration-500"
                style={{ width: `${(tasksState / totalTasks) * 100}%` }}
              ></div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 lg:gap-4 items-center justify-items-center">
            {[0, 1, 2].map((i) => {
              const item = getItem(i)
              return (
                <div key={`top-${i}`} className="w-full flex justify-center">
                  <div className="relative overflow-hidden rounded-xl border-2 border-[#a3d65c]/30 shadow-md bg-[#2d3e2f] backdrop-blur-lg p-1">
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

            <div className="w-full flex justify-center">
              <div className="relative overflow-hidden rounded-xl border-2 border-[#a3d65c]/30 shadow-md bg-[#2d3e2f] backdrop-blur-lg p-1">
                <Image
                  src={getItem(3)?.productImage?.url || "/placeholder.svg"}
                  alt={getItem(3)?.productName || "Product"}
                  width={100}
                  height={100}
                  className="w-full h-auto object-cover rounded-lg"
                />
              </div>
            </div>

            <div className="flex items-center justify-center w-full">
              <Button
                onClick={handleStartOptimization}
                disabled={starting}
                className="
                  relative
                  w-24 sm:w-28 md:w-32 lg:w-60
                  h-24 sm:h-28 md:h-32 lg:h-60
                  rounded-full
                  bg-gradient-to-br from-[#a3d65c] to-[#8bc34a]
                  hover:from-[#8bc34a] hover:to-[#a3d65c]
                  shadow-xl hover:shadow-2xl
                  transition-all duration-300
                  disabled:opacity-75 disabled:cursor-not-allowed
                  text-[#2d3e2f]
                  font-extrabold
                  flex items-center justify-center
                  border-4 border-[#a3d65c]/40
                "
              >
                <span className="text-xl sm:text-2xl md:text-3xl lg:text-5xl tracking-wide select-none">
                  {starting ? "Starting..." : "Start"}
                </span>
              </Button>
            </div>

            <div className="w-full flex justify-center">
              <div className="relative overflow-hidden rounded-xl border-2 border-[#a3d65c]/30 shadow-md bg-[#2d3e2f] backdrop-blur-lg p-1">
                <Image
                  src={getItem(4)?.productImage?.url || "/placeholder.svg"}
                  alt={getItem(4)?.productName || "Product"}
                  width={100}
                  height={100}
                  className="w-full h-auto object-cover rounded-lg"
                />
              </div>
            </div>

            {[5, 6, 7].map((i) => {
              const item = getItem(i)
              return (
                <div key={`bottom-${i}`} className="w-full flex justify-center">
                  <div className="relative overflow-hidden rounded-xl border-2 border-[#a3d65c]/30 shadow-md bg-[#2d3e2f] backdrop-blur-lg p-1">
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
