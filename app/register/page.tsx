"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { FieldGroup, Field, FieldLabel } from "@/components/ui/field"
import Link from "next/link"
import { useState } from "react"
import { Eye, EyeOff, Check } from "lucide-react"

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [companyName, setCompanyName] = useState("")
  const [acceptTerms, setAcceptTerms] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Auth logic will be handled by backend
    console.log("[v0] Register attempt:", { name, email, companyName })
  }

  const passwordRequirements = [
    { label: "At least 8 characters", met: password.length >= 8 },
    { label: "Contains a number", met: /\d/.test(password) },
    { label: "Contains uppercase letter", met: /[A-Z]/.test(password) },
  ]

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-background via-card to-background relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent" />
        <div className="relative z-10 flex flex-col justify-center px-12 lg:px-16">
          <Link href="/" className="text-3xl font-bold text-foreground mb-8">
            ShelfView<span className="text-primary">3D</span>
          </Link>
          <h1 className="text-4xl font-bold text-foreground mb-4 text-balance">
            Start Your 14-Day Free Trial
          </h1>
          <p className="text-lg text-muted-foreground text-pretty">
            No credit card required. Get full access to all Professional features.
          </p>
          
          <div className="mt-12 space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20">
                <Check className="h-4 w-4 text-primary" />
              </div>
              <span className="text-foreground">Unlimited projects during trial</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20">
                <Check className="h-4 w-4 text-primary" />
              </div>
              <span className="text-foreground">Full product library access</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20">
                <Check className="h-4 w-4 text-primary" />
              </div>
              <span className="text-foreground">10 HD renders included</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20">
                <Check className="h-4 w-4 text-primary" />
              </div>
              <span className="text-foreground">Cancel anytime</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Register Form */}
      <div className="flex w-full lg:w-1/2 items-center justify-center px-4 py-12 sm:px-6 lg:px-8 bg-background">
        <div className="w-full max-w-md">
          <div className="lg:hidden mb-8 text-center">
            <Link href="/" className="text-2xl font-bold text-foreground">
              ShelfView<span className="text-primary">3D</span>
            </Link>
          </div>

          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold text-foreground">Create your account</CardTitle>
              <CardDescription className="text-muted-foreground">
                Start your 14-day free trial today
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <FieldGroup>
                  <Field>
                    <FieldLabel htmlFor="name">Full name</FieldLabel>
                    <Input
                      id="name"
                      type="text"
                      placeholder="John Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="bg-input border-border"
                      required
                    />
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="email">Email address</FieldLabel>
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-input border-border"
                      required
                    />
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="company">Company name (optional)</FieldLabel>
                    <Input
                      id="company"
                      type="text"
                      placeholder="Your company"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      className="bg-input border-border"
                    />
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="password">Password</FieldLabel>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Create a password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="bg-input border-border pr-10"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                    {password && (
                      <div className="mt-2 space-y-1">
                        {passwordRequirements.map((req) => (
                          <div key={req.label} className="flex items-center gap-2 text-xs">
                            <div className={`h-1.5 w-1.5 rounded-full ${req.met ? "bg-green-500" : "bg-muted-foreground"}`} />
                            <span className={req.met ? "text-green-500" : "text-muted-foreground"}>
                              {req.label}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="confirmPassword">Confirm password</FieldLabel>
                    <div className="relative">
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm your password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="bg-input border-border pr-10"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                    {confirmPassword && password !== confirmPassword && (
                      <p className="mt-1 text-xs text-destructive">Passwords do not match</p>
                    )}
                  </Field>
                </FieldGroup>

                <div className="flex items-start gap-2">
                  <Checkbox
                    id="terms"
                    checked={acceptTerms}
                    onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
                    className="mt-1"
                  />
                  <label
                    htmlFor="terms"
                    className="text-sm text-muted-foreground cursor-pointer"
                  >
                    I agree to the{" "}
                    <Link href="/terms" className="text-primary hover:text-primary/80">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link href="/privacy" className="text-primary hover:text-primary/80">
                      Privacy Policy
                    </Link>
                  </label>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                  disabled={!acceptTerms || password !== confirmPassword}
                >
                  Create account
                </Button>

                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-border" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
                  </div>
                </div>

                <Button
                  type="button"
                  variant="outline"
                  className="w-full border-border bg-input hover:bg-secondary"
                >
                  <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="currentColor"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Sign up with Google
                </Button>
              </form>

              <p className="mt-6 text-center text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link href="/login" className="text-primary hover:text-primary/80 font-medium">
                  Sign in
                </Link>
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
