"use client"
import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import * as LucideIcons from "lucide-react"
import { useUsersContext } from "../AllContext/UsersContext"
import Bottom from '@/app/Common/Bottom/Bottom'

export default function RecordsPage() {
    const [searchTerm, setSearchTerm] = useState("")
    const [filterStatus, setFilterStatus] = useState("all")
    const [showNotifications, setShowNotifications] = useState(false)
    const [loading, setLoading] = useState(false)
    const [taskRecords, setTaskRecords] = useState([])

    const { user, fetchTasks } = useUsersContext()


    const notifications = [
        "🎉 Important update regarding service changes. Please check your inbox for details.",
        "🚀 NEW EVENT: Coming soon! Stay tuned for more information.",
        "💎 Don't miss out on our special VIP offers!",
    ]

    // Load tasks from backend and calculate commission
    useEffect(() => {
        const loadTasks = async () => {
            if (!user?._id) return
            setLoading(true)
            const tasks = await fetchTasks(user._id)
            const vipLevel = user.currentVIPLevel?.number || 1

            let commissionRate = 0.004
            switch (vipLevel) {
                case 1:
                    commissionRate = 0.004
                    break
                case 2:
                    commissionRate = 0.006
                    break
                case 3:
                    commissionRate = 0.008
                    break
                case 4:
                    commissionRate = 0.01
                    break
                default:
                    commissionRate = 0.004
            }

            const formattedTasks = tasks.map((t) => {
                const productValue = t.product?.productValue || 0
                const calculatedCommission = +(productValue * commissionRate).toFixed(2)
                return {
                    id: t._id,
                    taskCode: t.product?.taskCode || "N/A",
                    productName: t.product?.productName || "Unnamed Product",
                    productImage: t.product?.productImage?.url || "/placeholder.svg",
                    value: productValue,
                    commission: calculatedCommission,
                    status: t.status,
                    submittedAt: t.createdAt,
                    completedAt: t.updatedAt,
                }
            })

            setTaskRecords(formattedTasks)
            setLoading(false)
        }

        loadTasks()
    }, [user, fetchTasks])

    // Filter records based on search and status
    const filteredRecords = taskRecords.filter((record) => {
        const matchesSearch =
            record.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            record.taskCode.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesStatus = filterStatus === "all" || record.status === filterStatus
        return matchesSearch && matchesStatus
    })

    // Calculate statistics
    const totalTasks = taskRecords.length
    const completedTasks = taskRecords.filter((r) => r.status === "completed").length
    const processingTasks = taskRecords.filter((r) => r.status === "processing").length
    const failedTasks = taskRecords.filter((r) => r.status === "failed").length
    const totalEarnings = taskRecords
        .filter((r) => r.status === "completed")
        .reduce((sum, r) => sum + r.commission, 0)

    const getStatusBadge = (status) => {
        switch (status) {
            case "completed":
                return (
                    <Badge className="bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 border-green-200 hover:from-green-200 hover:to-emerald-200">
                        <LucideIcons.CheckCircle className="h-3 w-3 mr-1" />
                        Completed
                    </Badge>
                )
            case "processing":
                return (
                    <Badge className="bg-gradient-to-r from-yellow-100 to-orange-100 text-yellow-700 border-yellow-200 hover:from-yellow-200 hover:to-orange-200">
                        <LucideIcons.Clock className="h-3 w-3 mr-1" />
                        Processing
                    </Badge>
                )
            case "failed":
                return (
                    <Badge className="bg-gradient-to-r from-red-100 to-pink-100 text-red-700 border-red-200 hover:from-red-200 hover:to-pink-200">
                        <LucideIcons.XCircle className="h-3 w-3 mr-1" />
                        Failed
                    </Badge>
                )
            default:
                return null
        }
    }

    if (!user) return null

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

            {/* Main Content */}
            <main className="flex-1 overflow-auto p-4 md:p-6 pb-32 lg:pb-48">
                <div className="max-w-6xl mx-auto space-y-8">
                    {/* Page Title */}
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-3 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600">
                            <LucideIcons.ClipboardList className="h-6 w-6 text-white" />
                        </div>
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                            Task Records
                        </h1>
                    </div>

                    {/* Statistics Cards */}
                    <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
                        <Card className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-100 rounded-2xl">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="p-2 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-600">
                                    <LucideIcons.Target className="h-4 w-4 text-white" />
                                </div>
                                <span className="text-sm font-medium text-slate-600">Total Tasks</span>
                            </div>
                            <p className="text-2xl font-bold text-blue-600">{totalTasks}</p>
                        </Card>

                        <Card className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 border border-green-100 rounded-2xl">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="p-2 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600">
                                    <LucideIcons.CheckCircle className="h-4 w-4 text-white" />
                                </div>
                                <span className="text-sm font-medium text-slate-600">Completed</span>
                            </div>
                            <p className="text-2xl font-bold text-green-600">{completedTasks}</p>
                        </Card>

                        <Card className="p-4 bg-gradient-to-br from-yellow-50 to-orange-50 border border-yellow-100 rounded-2xl">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="p-2 rounded-xl bg-gradient-to-r from-yellow-500 to-orange-600">
                                    <LucideIcons.Clock className="h-4 w-4 text-white" />
                                </div>
                                <span className="text-sm font-medium text-slate-600">Processing</span>
                            </div>
                            <p className="text-2xl font-bold text-yellow-600">{processingTasks}</p>
                        </Card>

                        <Card className="p-4 bg-gradient-to-br from-red-50 to-pink-50 border border-red-100 rounded-2xl">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="p-2 rounded-xl bg-gradient-to-r from-red-500 to-pink-600">
                                    <LucideIcons.XCircle className="h-4 w-4 text-white" />
                                </div>
                                <span className="text-sm font-medium text-slate-600">Failed</span>
                            </div>
                            <p className="text-2xl font-bold text-red-600">{failedTasks}</p>
                        </Card>

                        <Card className="p-4 bg-gradient-to-br from-purple-50 to-violet-50 border border-purple-100 rounded-2xl">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="p-2 rounded-xl bg-gradient-to-r from-purple-500 to-violet-600">
                                    <LucideIcons.DollarSign className="h-4 w-4 text-white" />
                                </div>
                                <span className="text-sm font-medium text-slate-600">Total Earned</span>
                            </div>
                            <p className="text-2xl font-bold text-purple-600">${totalEarnings.toFixed(2)}</p>
                        </Card>
                    </div>

                    {/* Search & Filter + Records List */}
                    <Card className="p-6 bg-white/70 backdrop-blur-sm shadow-xl border border-white/20 rounded-3xl">
                        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mb-6">
                            <div className="relative flex-1 max-w-md">
                                <LucideIcons.Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                                <Input
                                    placeholder="Search by product name or task code..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10 h-12 rounded-xl border-slate-200 focus:border-blue-500 focus:ring-blue-500"
                                />
                            </div>
                            <div className="flex gap-2">
                                <Button
                                    variant={filterStatus === "all" ? "default" : "outline"}
                                    onClick={() => setFilterStatus("all")}
                                    className="rounded-xl"
                                >
                                    All
                                </Button>
                                <Button
                                    variant={filterStatus === "completed" ? "default" : "outline"}
                                    onClick={() => setFilterStatus("completed")}
                                    className="rounded-xl"
                                >
                                    Completed
                                </Button>
                                <Button
                                    variant={filterStatus === "processing" ? "default" : "outline"}
                                    onClick={() => setFilterStatus("processing")}
                                    className="rounded-xl"
                                >
                                    Processing
                                </Button>
                                <Button
                                    variant={filterStatus === "failed" ? "default" : "outline"}
                                    onClick={() => setFilterStatus("failed")}
                                    className="rounded-xl"
                                >
                                    Failed
                                </Button>
                            </div>
                        </div>

                        {/* Records List */}
                        <div className="space-y-4">
                            {loading ? (
                                <p className="text-center text-slate-500 py-6">Loading tasks...</p>
                            ) : filteredRecords.length > 0 ? (
                                filteredRecords.map((record) => (
                                    <Card
                                        key={record.id}
                                        className="p-4 bg-white/80 border border-slate-200 rounded-2xl hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="relative overflow-hidden rounded-xl border-2 border-white shadow-md">
                                                <Image
                                                    src={record.productImage || "/placeholder.svg"}
                                                    alt={record.productName}
                                                    width={60}
                                                    height={60}
                                                    className="object-cover"
                                                />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <h3 className="text-lg font-bold text-slate-800 truncate">{record.productName}</h3>
                                                    {getStatusBadge(record.status)}
                                                </div>
                                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-sm text-slate-600">
                                                    <div>
                                                        <span className="font-medium">Task Code:</span>
                                                        <p className="text-blue-600 font-mono">{record.taskCode}</p>
                                                    </div>
                                                    <div>
                                                        <span className="font-medium">Value:</span>
                                                        <p className="text-slate-800 font-semibold">${record.value.toFixed(2)}</p>
                                                    </div>
                                                    <div>
                                                        <span className="font-medium">Commission:</span>
                                                        <p className="text-green-600 font-semibold">${record.commission.toFixed(2)}</p>
                                                    </div>
                                                    <div>
                                                        <span className="font-medium">Submitted:</span>
                                                        <p className="text-slate-600">{new Date(record.submittedAt).toLocaleDateString()}</p>
                                                    </div>
                                                </div>
                                                {record.completedAt && (
                                                    <div className="mt-2 text-sm text-slate-600">
                                                        <span className="font-medium">Completed:</span>
                                                        <span className="ml-1 text-green-600">{new Date(record.completedAt).toLocaleString()}</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </Card>
                                ))
                            ) : (
                                <Card className="p-12 text-center bg-white/50 border border-slate-200 rounded-2xl">
                                    <div className="flex flex-col items-center gap-4">
                                        <div className="p-4 rounded-full bg-gradient-to-r from-slate-100 to-slate-200">
                                            <LucideIcons.Search className="h-8 w-8 text-slate-400" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold text-slate-600 mb-2">No Records Found</h3>
                                            <p className="text-slate-500">
                                                {searchTerm || filterStatus !== "all"
                                                    ? "Try adjusting your search or filter criteria."
                                                    : "You haven't submitted any tasks yet. Start optimizing products to see your records here!"}
                                            </p>
                                        </div>
                                    </div>
                                </Card>
                            )}
                        </div>
                    </Card>

                </div>
            </main>

            {/* Bottom Navigation */}
            <Bottom />
        </div>
    )
}
