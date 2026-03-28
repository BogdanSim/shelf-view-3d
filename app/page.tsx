"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Shelf3DScene } from "@/components/shelf-3d-scene"
import { Check, Box, Layers, Image as ImageIcon, ArrowRight, Play } from "lucide-react"
import Link from "next/link"

const features = [
  {
    icon: Box,
    title: "3D Product Library",
    description: "Access thousands of real-world products with accurate dimensions and textures ready to place on shelves."
  },
  {
    icon: Layers,
    title: "Smart Shelf Builder",
    description: "Drag and drop shelf configuration with snap-to-grid placement and realistic product physics."
  },
  {
    icon: ImageIcon,
    title: "Photorealistic Export",
    description: "Server-rendered HD images with professional lighting and studio-quality output."
  }
]

const pricingPlans = [
  {
    name: "Starter",
    price: "$29",
    description: "Perfect for small brands",
    features: [
      "5 active projects",
      "500 products from library",
      "10 HD renders/month",
      "Standard shelf templates",
      "PNG/JPEG export",
      "Email support"
    ]
  },
  {
    name: "Professional",
    price: "$79",
    description: "For growing agencies",
    popular: true,
    features: [
      "Unlimited projects",
      "Full product library",
      "50 HD renders/month",
      "All shelf templates + custom",
      "All export formats + transparent",
      "Upload custom 3D models (up to 20)",
      "Priority support",
      "Brand presets"
    ]
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For large organizations",
    features: [
      "Everything in Professional",
      "Unlimited HD renders",
      "Unlimited custom model uploads",
      "Custom shelf templates",
      "API access",
      "Dedicated account manager",
      "SSO / team management",
      "On-premise rendering option"
    ]
  }
]

const trustedCompanies = [
  "Unilever",
  "Nestlé",
  "P&G",
  "Coca-Cola",
  "PepsiCo"
]

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-8">
            <Link href="/" className="text-xl font-bold text-foreground">
              ShelfView<span className="text-primary">3D</span>
            </Link>
            <nav className="hidden items-center gap-6 md:flex">
              <Link href="#features" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                Features
              </Link>
              <Link href="#pricing" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                Pricing
              </Link>
              <Link href="#about" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                About
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost" size="sm">
                Log in
              </Button>
            </Link>
            <Link href="/register">
              <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
                Start Free Trial
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-20 lg:pt-40 lg:pb-32">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-8">
            <div className="relative z-10">
              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl text-balance">
                Visualize Your Products on Any Shelf
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground text-pretty">
                The fastest way for brands and agencies to create photorealistic shelf mockups. Design, configure, and export stunning 3D shelf visualizations in minutes.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link href="/register">
                  <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                    Start Free Trial
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Button variant="outline" size="lg" className="group">
                  <Play className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />
                  Watch Demo
                </Button>
              </div>
              <p className="mt-4 text-sm text-muted-foreground">
                14-day free trial. No credit card required.
              </p>
            </div>
            <div className="relative h-[400px] lg:h-[500px]">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/20 via-transparent to-transparent" />
              <Shelf3DScene className="h-full w-full rounded-2xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="border-y border-border/40 bg-card/50 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="mb-8 text-center text-sm font-medium text-muted-foreground">
            Trusted by 50+ leading agencies and brands
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 lg:gap-16">
            {trustedCompanies.map((company) => (
              <div 
                key={company} 
                className="text-lg font-semibold text-muted-foreground/60 transition-colors hover:text-muted-foreground"
              >
                {company}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
              Everything you need to visualize products
            </h2>
            <p className="mt-4 text-lg text-muted-foreground text-pretty">
              Powerful tools designed for retail professionals, brand managers, and creative agencies.
            </p>
          </div>
          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {features.map((feature) => (
              <Card key={feature.title} className="border-border/50 bg-card/50 backdrop-blur-sm transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5">
                <CardHeader>
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl text-foreground">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed text-muted-foreground">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="bg-card/30 py-20 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
              Simple, transparent pricing
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Choose the plan that fits your needs. All plans include a 14-day free trial.
            </p>
          </div>
          <div className="mt-16 grid gap-8 lg:grid-cols-3">
            {pricingPlans.map((plan) => (
              <Card 
                key={plan.name} 
                className={`relative border-border/50 bg-card backdrop-blur-sm transition-all hover:shadow-lg ${
                  plan.popular 
                    ? "border-primary shadow-lg shadow-primary/10" 
                    : "hover:border-border"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                      Most Popular
                    </span>
                  </div>
                )}
                <CardHeader className="pb-4">
                  <CardTitle className="text-xl text-foreground">{plan.name}</CardTitle>
                  <CardDescription className="text-muted-foreground">{plan.description}</CardDescription>
                  <div className="mt-4">
                    <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                    {plan.price !== "Custom" && (
                      <span className="text-muted-foreground">/month</span>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className={`mt-8 w-full ${
                      plan.popular 
                        ? "bg-primary text-primary-foreground hover:bg-primary/90" 
                        : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                    }`}
                  >
                    Start Free Trial
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/20 via-primary/10 to-transparent p-8 lg:p-16">
            <div className="relative z-10 mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
                Ready to transform your shelf visualizations?
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Join thousands of brands and agencies creating stunning shelf mockups.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Link href="/register">
                  <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                    Start Free Trial
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Button variant="outline" size="lg">
                  Contact Sales
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 bg-card/30 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <Link href="/" className="text-xl font-bold text-foreground">
                ShelfView<span className="text-primary">3D</span>
              </Link>
              <p className="mt-4 text-sm text-muted-foreground">
                The fastest way for brands and agencies to create photorealistic shelf mockups.
              </p>
            </div>
            <div>
              <h4 className="mb-4 text-sm font-semibold text-foreground">Product</h4>
              <ul className="space-y-2">
                <li><Link href="#features" className="text-sm text-muted-foreground hover:text-foreground">Features</Link></li>
                <li><Link href="#pricing" className="text-sm text-muted-foreground hover:text-foreground">Pricing</Link></li>
                <li><Link href="/dashboard" className="text-sm text-muted-foreground hover:text-foreground">Dashboard</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4 text-sm font-semibold text-foreground">Company</h4>
              <ul className="space-y-2">
                <li><Link href="#about" className="text-sm text-muted-foreground hover:text-foreground">About</Link></li>
                <li><Link href="#" className="text-sm text-muted-foreground hover:text-foreground">Blog</Link></li>
                <li><Link href="#" className="text-sm text-muted-foreground hover:text-foreground">Careers</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4 text-sm font-semibold text-foreground">Legal</h4>
              <ul className="space-y-2">
                <li><Link href="#" className="text-sm text-muted-foreground hover:text-foreground">Privacy</Link></li>
                <li><Link href="#" className="text-sm text-muted-foreground hover:text-foreground">Terms</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 border-t border-border/40 pt-8">
            <p className="text-center text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} ShelfView3D. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
