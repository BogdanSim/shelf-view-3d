"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FieldGroup, Field, FieldLabel } from "@/components/ui/field"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { 
  User,
  CreditCard,
  Users,
  Key,
  Upload,
  Plus,
  Download,
  Trash2,
  Copy,
  Eye,
  EyeOff
} from "lucide-react"

const billingHistory = [
  { date: "2024-01-15", description: "Professional Plan - Monthly", amount: "$79.00", invoice: "#INV-2024-001" },
  { date: "2023-12-15", description: "Professional Plan - Monthly", amount: "$79.00", invoice: "#INV-2023-012" },
  { date: "2023-11-15", description: "Professional Plan - Monthly", amount: "$79.00", invoice: "#INV-2023-011" },
]

const teamMembers = [
  { name: "John Doe", email: "john@company.com", role: "Admin", status: "Active" },
  { name: "Jane Smith", email: "jane@company.com", role: "Editor", status: "Active" },
  { name: "Mike Wilson", email: "mike@company.com", role: "Viewer", status: "Pending" },
]

const apiKeys = [
  { name: "Production API Key", key: "sv3d_live_****************************4a2b", created: "2024-01-10", lastUsed: "2 hours ago" },
  { name: "Development Key", key: "sv3d_test_****************************8c3f", created: "2024-01-05", lastUsed: "3 days ago" },
]

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile")
  const [showApiKey, setShowApiKey] = useState<string | null>(null)

  return (
    <div className="p-6 lg:p-8 max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">Account Settings</h1>
        <p className="text-muted-foreground">Manage your account, subscription, and team</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6 bg-muted">
          <TabsTrigger value="profile" className="gap-2">
            <User className="h-4 w-4" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="subscription" className="gap-2">
            <CreditCard className="h-4 w-4" />
            Subscription
          </TabsTrigger>
          <TabsTrigger value="team" className="gap-2">
            <Users className="h-4 w-4" />
            Team
          </TabsTrigger>
          <TabsTrigger value="api" className="gap-2">
            <Key className="h-4 w-4" />
            API Keys
          </TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile">
          <div className="space-y-6">
            <Card className="border-border/50 bg-card">
              <CardHeader>
                <CardTitle className="text-foreground">Profile Information</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Update your account details and preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-6">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src="/placeholder-user.jpg" />
                    <AvatarFallback className="bg-primary/10 text-primary text-xl">
                      JD
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <Button variant="outline" size="sm" className="border-border">
                      <Upload className="mr-2 h-4 w-4" />
                      Change Avatar
                    </Button>
                    <p className="text-xs text-muted-foreground mt-2">
                      JPG, PNG or GIF. Max 2MB.
                    </p>
                  </div>
                </div>

                <FieldGroup>
                  <div className="grid md:grid-cols-2 gap-4">
                    <Field>
                      <FieldLabel htmlFor="name">Full Name</FieldLabel>
                      <Input 
                        id="name" 
                        defaultValue="John Doe" 
                        className="bg-input border-border"
                      />
                    </Field>
                    <Field>
                      <FieldLabel htmlFor="email">Email Address</FieldLabel>
                      <Input 
                        id="email" 
                        type="email"
                        defaultValue="john@company.com" 
                        className="bg-input border-border"
                      />
                    </Field>
                  </div>
                  <Field>
                    <FieldLabel htmlFor="company">Company Name</FieldLabel>
                    <Input 
                      id="company" 
                      defaultValue="Acme Agency" 
                      className="bg-input border-border"
                    />
                  </Field>
                </FieldGroup>

                <div className="flex justify-end">
                  <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                    Save Changes
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/50 bg-card">
              <CardHeader>
                <CardTitle className="text-foreground">Password</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Update your password to keep your account secure
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <FieldGroup>
                  <Field>
                    <FieldLabel htmlFor="currentPassword">Current Password</FieldLabel>
                    <Input 
                      id="currentPassword" 
                      type="password"
                      className="bg-input border-border"
                    />
                  </Field>
                  <div className="grid md:grid-cols-2 gap-4">
                    <Field>
                      <FieldLabel htmlFor="newPassword">New Password</FieldLabel>
                      <Input 
                        id="newPassword" 
                        type="password"
                        className="bg-input border-border"
                      />
                    </Field>
                    <Field>
                      <FieldLabel htmlFor="confirmPassword">Confirm New Password</FieldLabel>
                      <Input 
                        id="confirmPassword" 
                        type="password"
                        className="bg-input border-border"
                      />
                    </Field>
                  </div>
                </FieldGroup>
                <div className="flex justify-end">
                  <Button variant="outline" className="border-border">
                    Update Password
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/50 bg-card">
              <CardHeader>
                <CardTitle className="text-foreground">Notification Preferences</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Choose what emails you want to receive
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-foreground">Export Notifications</p>
                    <p className="text-xs text-muted-foreground">Get notified when HD renders are complete</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-foreground">Usage Alerts</p>
                    <p className="text-xs text-muted-foreground">Alerts when approaching plan limits</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-foreground">Product Updates</p>
                    <p className="text-xs text-muted-foreground">News about new features and improvements</p>
                  </div>
                  <Switch />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Subscription Tab */}
        <TabsContent value="subscription">
          <div className="space-y-6">
            <Card className="border-border/50 bg-card">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-foreground flex items-center gap-2">
                      Professional Plan
                      <Badge className="bg-primary/10 text-primary">Current</Badge>
                    </CardTitle>
                    <CardDescription className="text-muted-foreground">
                      $79/month, billed monthly
                    </CardDescription>
                  </div>
                  <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                    Upgrade Plan
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Projects</p>
                    <p className="text-2xl font-bold text-foreground">12</p>
                    <p className="text-xs text-muted-foreground">Unlimited</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">HD Renders</p>
                    <p className="text-2xl font-bold text-foreground">47/50</p>
                    <Progress value={94} className="h-2 mt-2" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Custom Models</p>
                    <p className="text-2xl font-bold text-foreground">8/20</p>
                    <Progress value={40} className="h-2 mt-2" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Storage</p>
                    <p className="text-2xl font-bold text-foreground">2.4/5 GB</p>
                    <Progress value={48} className="h-2 mt-2" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/50 bg-card">
              <CardHeader>
                <CardTitle className="text-foreground">Payment Method</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Manage your payment information
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between p-4 rounded-lg border border-border bg-muted/30">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-14 rounded bg-gradient-to-r from-blue-600 to-blue-400 flex items-center justify-center">
                      <CreditCard className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Visa ending in 4242</p>
                      <p className="text-sm text-muted-foreground">Expires 12/2025</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="border-border">
                    Update
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/50 bg-card">
              <CardHeader>
                <CardTitle className="text-foreground">Billing History</CardTitle>
                <CardDescription className="text-muted-foreground">
                  View and download past invoices
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow className="border-border">
                      <TableHead className="text-muted-foreground">Date</TableHead>
                      <TableHead className="text-muted-foreground">Description</TableHead>
                      <TableHead className="text-muted-foreground">Amount</TableHead>
                      <TableHead className="text-muted-foreground text-right">Invoice</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {billingHistory.map((item, i) => (
                      <TableRow key={i} className="border-border">
                        <TableCell className="text-foreground">{item.date}</TableCell>
                        <TableCell className="text-foreground">{item.description}</TableCell>
                        <TableCell className="text-foreground">{item.amount}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm" className="text-primary">
                            <Download className="h-4 w-4 mr-1" />
                            PDF
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Team Tab */}
        <TabsContent value="team">
          <div className="space-y-6">
            <Card className="border-border/50 bg-card">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-foreground">Team Members</CardTitle>
                    <CardDescription className="text-muted-foreground">
                      Manage who has access to your workspace
                    </CardDescription>
                  </div>
                  <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                    <Plus className="mr-2 h-4 w-4" />
                    Invite Member
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow className="border-border">
                      <TableHead className="text-muted-foreground">Member</TableHead>
                      <TableHead className="text-muted-foreground">Role</TableHead>
                      <TableHead className="text-muted-foreground">Status</TableHead>
                      <TableHead className="text-muted-foreground text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {teamMembers.map((member, i) => (
                      <TableRow key={i} className="border-border">
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback className="bg-primary/10 text-primary text-xs">
                                {member.name.split(" ").map(n => n[0]).join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium text-foreground">{member.name}</p>
                              <p className="text-sm text-muted-foreground">{member.email}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary">{member.role}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge 
                            variant="outline" 
                            className={member.status === "Active" 
                              ? "border-green-500/50 text-green-500" 
                              : "border-yellow-500/50 text-yellow-500"
                            }
                          >
                            {member.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-destructive">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* API Keys Tab */}
        <TabsContent value="api">
          <div className="space-y-6">
            <Card className="border-border/50 bg-card">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-foreground">API Keys</CardTitle>
                    <CardDescription className="text-muted-foreground">
                      Manage your API keys for integrations
                    </CardDescription>
                  </div>
                  <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                    <Plus className="mr-2 h-4 w-4" />
                    Generate New Key
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow className="border-border">
                      <TableHead className="text-muted-foreground">Name</TableHead>
                      <TableHead className="text-muted-foreground">Key</TableHead>
                      <TableHead className="text-muted-foreground">Created</TableHead>
                      <TableHead className="text-muted-foreground">Last Used</TableHead>
                      <TableHead className="text-muted-foreground text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {apiKeys.map((apiKey, i) => (
                      <TableRow key={i} className="border-border">
                        <TableCell className="font-medium text-foreground">{apiKey.name}</TableCell>
                        <TableCell>
                          <code className="text-xs bg-muted px-2 py-1 rounded text-muted-foreground">
                            {showApiKey === apiKey.key 
                              ? apiKey.key.replace(/\*/g, "x") 
                              : apiKey.key
                            }
                          </code>
                        </TableCell>
                        <TableCell className="text-muted-foreground">{apiKey.created}</TableCell>
                        <TableCell className="text-muted-foreground">{apiKey.lastUsed}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-1">
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => setShowApiKey(showApiKey === apiKey.key ? null : apiKey.key)}
                            >
                              {showApiKey === apiKey.key ? (
                                <EyeOff className="h-4 w-4" />
                              ) : (
                                <Eye className="h-4 w-4" />
                              )}
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Copy className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="text-destructive">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card className="border-amber-500/20 bg-amber-500/5">
              <CardContent className="p-4">
                <p className="text-sm text-amber-500">
                  <strong>Security Note:</strong> Keep your API keys secure and never share them publicly. 
                  If you believe a key has been compromised, revoke it immediately and generate a new one.
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
