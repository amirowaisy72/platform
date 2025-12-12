"use client"
import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import * as LucideIcons from "lucide-react"
import { useUsersContext } from "../AllContext/UsersContext"

export default function SignupPage() {
    const { submitNewUser } = useUsersContext()

    const [formData, setFormData] = useState({
        username: "",
        phone: "",
        transactionPassword: "",
        loginPassword: "",
        confirmLoginPassword: "",
        gender: "",
        inviteCode: "",
        agreeToTerms: false,
    })

    const [showPasswords, setShowPasswords] = useState({
        transaction: false,
        login: false,
        confirm: false,
    })

    const [isLoading, setIsLoading] = useState(false)
    const [errors, setErrors] = useState({})
    const [serverError, setServerError] = useState("")

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
        if (errors[name]) {
            setErrors((prev) => ({
                ...prev,
                [name]: "",
            }))
        }
        if (serverError) {
            setServerError("")
        }
    }

    const handleSelectChange = (name, value) => {
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
        if (errors[name]) {
            setErrors((prev) => ({
                ...prev,
                [name]: "",
            }))
        }
        if (serverError) {
            setServerError("")
        }
    }

    const handleCheckboxChange = (checked) => {
        setFormData((prev) => ({
            ...prev,
            agreeToTerms: checked,
        }))
        if (errors.agreeToTerms) {
            setErrors((prev) => ({
                ...prev,
                agreeToTerms: "",
            }))
        }
        if (serverError) {
            setServerError("")
        }
    }

    const validateForm = () => {
        const newErrors = {}

        if (!formData.username.trim()) {
            newErrors.username = "Username is required"
        }

        if (formData.username.includes(" ")) {
            newErrors.username = "Username cannot contain spaces";
        }

        if (!formData.phone.trim()) {
            newErrors.phone = "Phone number is required"
        } else if (!/^\+?[\d\s-()]+$/.test(formData.phone)) {
            newErrors.phone = "Please enter a valid phone number"
        }

        if (!formData.transactionPassword) {
            newErrors.transactionPassword = "Transaction password is required"
        } else if (formData.transactionPassword.length < 6) {
            newErrors.transactionPassword = "Transaction password must be at least 6 characters"
        }

        if (!formData.loginPassword) {
            newErrors.loginPassword = "Login password is required"
        } else if (formData.loginPassword.length < 6) {
            newErrors.loginPassword = "Login password must be at least 6 characters"
        }

        if (!formData.confirmLoginPassword) {
            newErrors.confirmLoginPassword = "Please confirm your login password"
        } else if (formData.loginPassword !== formData.confirmLoginPassword) {
            newErrors.confirmLoginPassword = "Passwords do not match"
        }

        if (!formData.gender) {
            newErrors.gender = "Please select your gender"
        }

        if (!formData.agreeToTerms) {
            newErrors.agreeToTerms = "You must agree to the terms and conditions"
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!validateForm()) {
            return
        }

        setIsLoading(true)
        setServerError("")

        const result = await submitNewUser(formData)
        if (result.error) {
            setIsLoading(false)
            setServerError(result.error)
        }
    }

    const togglePasswordVisibility = (field) => {
        setShowPasswords((prev) => ({
            ...prev,
            [field]: !prev[field],
        }))
    }

    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
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
                        Sign Up
                    </h1>
                    <div className="w-16" />
                </div>
            </header>

            <main className="flex-1 p-4 md:p-6 pb-8">
                <div className="w-full max-w-2xl mx-auto space-y-8">
                    <div className="text-center">
                        <div className="inline-flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
                                <LucideIcons.Zap className="h-7 w-7 text-white" />
                            </div>
                            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent tracking-wide">
                                YourBrand
                            </h2>
                        </div>
                        <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-gradient-to-r from-green-100 to-emerald-100 rounded-full">
                            <LucideIcons.UserPlus className="h-5 w-5 text-green-600" />
                            <span className="text-green-800 font-semibold">Create Account</span>
                        </div>
                        <p className="text-slate-600 text-lg">Join our platform today</p>
                    </div>

                    <Card className="p-6 sm:p-8 bg-white/70 backdrop-blur-sm shadow-2xl border border-white/20 rounded-3xl">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="username" className="text-slate-700 font-semibold flex items-center gap-2">
                                    <LucideIcons.User className="h-4 w-4" />
                                    Username *
                                </Label>
                                <div className="relative">
                                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                                        <LucideIcons.User className="h-5 w-5 text-slate-400" />
                                    </div>
                                    <Input
                                        id="username"
                                        name="username"
                                        type="text"
                                        placeholder="Choose a username"
                                        value={formData.username}
                                        onChange={handleInputChange}
                                        className={`pl-12 h-12 text-base bg-white/80 border-2 rounded-xl focus:ring-4 focus:ring-blue-100 transition-all ${errors.username ? "border-red-500 focus:border-red-500" : "border-slate-200 focus:border-blue-500"
                                            }`}
                                        required
                                    />
                                </div>
                                {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="phone" className="text-slate-700 font-semibold flex items-center gap-2">
                                    <LucideIcons.Phone className="h-4 w-4" />
                                    Phone Number *
                                </Label>
                                <div className="relative">
                                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                                        <LucideIcons.Phone className="h-5 w-5 text-slate-400" />
                                    </div>
                                    <Input
                                        id="phone"
                                        name="phone"
                                        type="tel"
                                        placeholder="+1234567890"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        className={`pl-12 h-12 text-base bg-white/80 border-2 rounded-xl focus:ring-4 focus:ring-blue-100 transition-all ${errors.phone ? "border-red-500 focus:border-red-500" : "border-slate-200 focus:border-blue-500"
                                            }`}
                                        required
                                    />
                                </div>
                                {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="transactionPassword" className="text-slate-700 font-semibold flex items-center gap-2">
                                    <LucideIcons.CreditCard className="h-4 w-4" />
                                    Transaction Password *
                                </Label>
                                <div className="relative">
                                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                                        <LucideIcons.CreditCard className="h-5 w-5 text-slate-400" />
                                    </div>
                                    <Input
                                        id="transactionPassword"
                                        name="transactionPassword"
                                        type={showPasswords.transaction ? "text" : "password"}
                                        placeholder="Create transaction password"
                                        value={formData.transactionPassword}
                                        onChange={handleInputChange}
                                        className={`pl-12 pr-12 h-12 text-base bg-white/80 border-2 rounded-xl focus:ring-4 focus:ring-blue-100 transition-all ${errors.transactionPassword
                                            ? "border-red-500 focus:border-red-500"
                                            : "border-slate-200 focus:border-blue-500"
                                            }`}
                                        required
                                    />
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => togglePasswordVisibility("transaction")}
                                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                                    >
                                        {showPasswords.transaction ? (
                                            <LucideIcons.EyeOff className="h-5 w-5" />
                                        ) : (
                                            <LucideIcons.Eye className="h-5 w-5" />
                                        )}
                                    </Button>
                                </div>
                                {errors.transactionPassword && <p className="text-red-500 text-sm">{errors.transactionPassword}</p>}
                                <p className="text-xs text-slate-500">Used for withdrawals and sensitive operations</p>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="loginPassword" className="text-slate-700 font-semibold flex items-center gap-2">
                                    <LucideIcons.Lock className="h-4 w-4" />
                                    Login Password *
                                </Label>
                                <div className="relative">
                                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                                        <LucideIcons.Lock className="h-5 w-5 text-slate-400" />
                                    </div>
                                    <Input
                                        id="loginPassword"
                                        name="loginPassword"
                                        type={showPasswords.login ? "text" : "password"}
                                        placeholder="Create login password"
                                        value={formData.loginPassword}
                                        onChange={handleInputChange}
                                        className={`pl-12 pr-12 h-12 text-base bg-white/80 border-2 rounded-xl focus:ring-4 focus:ring-blue-100 transition-all ${errors.loginPassword
                                            ? "border-red-500 focus:border-red-500"
                                            : "border-slate-200 focus:border-blue-500"
                                            }`}
                                        required
                                    />
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => togglePasswordVisibility("login")}
                                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                                    >
                                        {showPasswords.login ? (
                                            <LucideIcons.EyeOff className="h-5 w-5" />
                                        ) : (
                                            <LucideIcons.Eye className="h-5 w-5" />
                                        )}
                                    </Button>
                                </div>
                                {errors.loginPassword && <p className="text-red-500 text-sm">{errors.loginPassword}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="confirmLoginPassword" className="text-slate-700 font-semibold flex items-center gap-2">
                                    <LucideIcons.Lock className="h-4 w-4" />
                                    Confirm Login Password *
                                </Label>
                                <div className="relative">
                                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                                        <LucideIcons.Lock className="h-5 w-5 text-slate-400" />
                                    </div>
                                    <Input
                                        id="confirmLoginPassword"
                                        name="confirmLoginPassword"
                                        type={showPasswords.confirm ? "text" : "password"}
                                        placeholder="Confirm your login password"
                                        value={formData.confirmLoginPassword}
                                        onChange={handleInputChange}
                                        className={`pl-12 pr-12 h-12 text-base bg-white/80 border-2 rounded-xl focus:ring-4 focus:ring-blue-100 transition-all ${errors.confirmLoginPassword
                                            ? "border-red-500 focus:border-red-500"
                                            : "border-slate-200 focus:border-blue-500"
                                            }`}
                                        required
                                    />
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => togglePasswordVisibility("confirm")}
                                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                                    >
                                        {showPasswords.confirm ? (
                                            <LucideIcons.EyeOff className="h-5 w-5" />
                                        ) : (
                                            <LucideIcons.Eye className="h-5 w-5" />
                                        )}
                                    </Button>
                                </div>
                                {errors.confirmLoginPassword && <p className="text-red-500 text-sm">{errors.confirmLoginPassword}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label className="text-slate-700 font-semibold flex items-center gap-2">
                                    <LucideIcons.Users className="h-4 w-4" />
                                    Gender *
                                </Label>
                                <Select onValueChange={(value) => handleSelectChange("gender", value)}>
                                    <SelectTrigger
                                        className={`h-12 text-base bg-white border-2 rounded-xl focus:ring-4 focus:ring-blue-100 transition-all ${errors.gender ? "border-red-500" : "border-slate-200"
                                            }`}
                                    >
                                        <SelectValue placeholder="Select your gender" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-white">
                                        <SelectItem value="male">Male</SelectItem>
                                        <SelectItem value="female">Female</SelectItem>
                                        <SelectItem value="other">Other</SelectItem>
                                    </SelectContent>
                                </Select>
                                {errors.gender && <p className="text-red-500 text-sm">{errors.gender}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="inviteCode" className="text-slate-700 font-semibold flex items-center gap-2">
                                    <LucideIcons.Gift className="h-4 w-4" />
                                    Invite Code (Optional)
                                </Label>
                                <div className="relative">
                                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                                        <LucideIcons.Gift className="h-5 w-5 text-slate-400" />
                                    </div>
                                    <Input
                                        id="inviteCode"
                                        name="inviteCode"
                                        type="text"
                                        placeholder="Enter invite code if you have one"
                                        value={formData.inviteCode}
                                        onChange={handleInputChange}
                                        className="pl-12 h-12 text-base bg-white/80 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-start gap-3 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl border border-blue-100">
                                    <Checkbox
                                        id="agreeToTerms"
                                        checked={formData.agreeToTerms}
                                        onCheckedChange={handleCheckboxChange}
                                        className="mt-1"
                                    />
                                    <div className="flex-1">
                                        <Label htmlFor="agreeToTerms" className="text-sm text-slate-700 cursor-pointer">
                                            I agree to the{" "}
                                            <Link
                                                href="/terms-and-conditions"
                                                className="text-blue-600 hover:text-blue-700 font-medium underline"
                                            >
                                                Terms and Conditions
                                            </Link>{" "}
                                            and{" "}
                                            <Link href="#" className="text-blue-600 hover:text-blue-700 font-medium underline">
                                                Privacy Policy
                                            </Link>
                                        </Label>
                                    </div>
                                </div>
                                {errors.agreeToTerms && <p className="text-red-500 text-sm">{errors.agreeToTerms}</p>}
                            </div>

                            <Button
                                type="submit"
                                disabled={isLoading}
                                className="w-full h-14 text-lg font-bold bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-2xl rounded-2xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isLoading ? (
                                    <div className="flex items-center gap-2">
                                        <LucideIcons.Loader2 className="h-5 w-5 animate-spin" />
                                        Creating Account...
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-2">
                                        <LucideIcons.UserPlus className="h-5 w-5" />
                                        Create Account
                                    </div>
                                )}
                            </Button>

                            {serverError && (
                                <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-2xl">
                                    <LucideIcons.AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                                    <p className="text-red-700 text-sm font-medium">{serverError}</p>
                                </div>
                            )}
                        </form>
                    </Card>

                    <div className="text-center">
                        <p className="text-slate-600">
                            Already have an account?{" "}
                            <Link href="/login" className="text-blue-600 hover:text-blue-700 font-bold transition-colors">
                                Sign In
                            </Link>
                        </p>
                    </div>
                </div>
            </main>
        </div>
    )
}
