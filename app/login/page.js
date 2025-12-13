"use client"
import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import * as LucideIcons from "lucide-react"
import { useUsersContext } from "../AllContext/UsersContext"
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    })
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

    const { loginUser } = useUsersContext()
    const [error, setError] = useState("")

    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        const result = await loginUser(formData); // 👈 send data to context
        setIsLoading(false);

        if (result.error) {
            setError(result.error);
        }
    };

    // Prevent rendering until localStorage is checked

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
                        Login
                    </h1>
                    <div className="w-16" />
                </div>
            </header>

            <main className="flex-1 flex items-center justify-center p-4 md:p-6">
                <div className="w-full max-w-md space-y-8">
                    {/* Logo Section */}
                    <div className="text-center">
                        <div className="inline-flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
                                <LucideIcons.Zap className="h-7 w-7 text-white" />
                            </div>
                            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent tracking-wide">
                                YourBrand
                            </h2>
                        </div>
                        <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full">
                            <LucideIcons.LogIn className="h-5 w-5 text-blue-600" />
                            <span className="text-blue-800 font-semibold">Welcome Back</span>
                        </div>
                        <p className="text-slate-600 text-lg">Sign in to your account</p>
                    </div>

                    {/* Login Form */}
                    <Card className="p-8 bg-white/70 backdrop-blur-sm shadow-2xl border border-white/20 rounded-3xl">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Username Field */}
                            <div className="space-y-2">
                                <Label htmlFor="username" className="text-slate-700 font-semibold flex items-center gap-2">
                                    <LucideIcons.User className="h-4 w-4" />
                                    Username
                                </Label>
                                <div className="relative">
                                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                                        <LucideIcons.User className="h-5 w-5 text-slate-400" />
                                    </div>
                                    <Input
                                        id="username"
                                        name="username"
                                        type="text"
                                        placeholder="Enter your username"
                                        value={formData.username}
                                        onChange={handleInputChange}
                                        className="pl-12 h-14 text-lg bg-white/80 border-2 border-slate-200 rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Password Field */}
                            <div className="space-y-2">
                                <Label htmlFor="password" className="text-slate-700 font-semibold flex items-center gap-2">
                                    <LucideIcons.Lock className="h-4 w-4" />
                                    Password
                                </Label>
                                <div className="relative">
                                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                                        <LucideIcons.Lock className="h-5 w-5 text-slate-400" />
                                    </div>
                                    <Input
                                        id="password"
                                        name="password"
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Enter your password"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        className="pl-12 pr-12 h-14 text-lg bg-white/80 border-2 border-slate-200 rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all"
                                        required
                                    />
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                                    >
                                        {showPassword ? (
                                            <LucideIcons.EyeOff className="h-5 w-5" />
                                        ) : (
                                            <LucideIcons.Eye className="h-5 w-5" />
                                        )}
                                    </Button>
                                </div>
                            </div>

                            {/* Forgot Password Link */}
                            <div className="text-right">
                                <Link href="#" className="text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors">
                                    Forgot Password?
                                </Link>
                            </div>

                            {error && <p className="text-red-500 text-sm text-center">{error}</p>}

                            {/* Login Button */}
                            <Button
                                type="submit"
                                disabled={isLoading}
                                className="w-full h-14 text-lg font-bold bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-2xl rounded-2xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isLoading ? (
                                    <div className="flex items-center gap-2">
                                        <LucideIcons.Loader2 className="h-5 w-5 animate-spin" />
                                        Signing In...
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-2">
                                        <LucideIcons.LogIn className="h-5 w-5" />
                                        Sign In
                                    </div>
                                )}
                            </Button>
                        </form>
                    </Card>

                    {/* Sign Up Link */}
                    <div className="text-center">
                        <p className="text-slate-600">
                            Don't have an account?{" "}
                            <Link href="/signup" className="text-blue-600 hover:text-blue-700 font-bold transition-colors">
                                Sign Up
                            </Link>
                        </p>
                    </div>

                    {/* Features */}
                    <div className="grid grid-cols-3 gap-4 mt-8">
                        <div className="text-center p-4 bg-white/50 rounded-2xl border border-white/20">
                            <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mx-auto mb-2">
                                <LucideIcons.Shield className="h-5 w-5 text-white" />
                            </div>
                            <p className="text-xs font-medium text-slate-600">Secure</p>
                        </div>
                        <div className="text-center p-4 bg-white/50 rounded-2xl border border-white/20">
                            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center mx-auto mb-2">
                                <LucideIcons.Zap className="h-5 w-5 text-white" />
                            </div>
                            <p className="text-xs font-medium text-slate-600">Fast</p>
                        </div>
                        <div className="text-center p-4 bg-white/50 rounded-2xl border border-white/20">
                            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-violet-600 rounded-xl flex items-center justify-center mx-auto mb-2">
                                <LucideIcons.Users className="h-5 w-5 text-white" />
                            </div>
                            <p className="text-xs font-medium text-slate-600">Trusted</p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}
