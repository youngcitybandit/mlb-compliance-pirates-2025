import { Download, Upload, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { SubstancesList } from "@/components/substances-list"
import { SubstanceCategories } from "@/components/substance-categories"
import { RecentUpdates } from "@/components/recent-updates"

export default function SubstancesPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="MLB Prohibited Substances" text="Complete list of substance categories prohibited by MLB.">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button variant="outline" size="sm">
            <Upload className="mr-2 h-4 w-4" />
            Import
          </Button>
          <Button size="sm">
            <Plus className="mr-2 h-4 w-4" />
            Add Substance
          </Button>
        </div>
      </DashboardHeader>
      <div className="grid gap-4 md:grid-cols-7">
        <Card className="col-span-7">
          <CardHeader>
            <CardTitle>Recent Updates</CardTitle>
            <CardDescription>Latest changes to the MLB prohibited substances list.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <div>
                  <p className="text-sm font-medium">New Category Added</p>
                  <p className="text-xs text-muted-foreground">Metabolic Modulators - May affect energy metabolism</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <div>
                  <p className="text-sm font-medium">Category Updated</p>
                  <p className="text-xs text-muted-foreground">Hormone Modulators - Updated testing protocols</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-7">
        <Card className="col-span-5">
          <CardHeader>
            <CardTitle>Substances List</CardTitle>
            <CardDescription>Complete list of substances prohibited by MLB.</CardDescription>
            <div className="flex w-full max-w-sm items-center space-x-2 mt-2">
              <Input type="search" placeholder="Search substances..." />
              <Button type="submit">Search</Button>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all" className="space-y-4">
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="performance">Performance Enhancing</TabsTrigger>
                <TabsTrigger value="stimulants">Stimulants</TabsTrigger>
                <TabsTrigger value="diuretics">Diuretics</TabsTrigger>
                <TabsTrigger value="hormones">Hormones</TabsTrigger>
              </TabsList>
              <TabsContent value="all">
                <SubstancesList />
              </TabsContent>
              <TabsContent value="performance">
                <SubstancesList />
              </TabsContent>
              <TabsContent value="stimulants">
                <SubstancesList />
              </TabsContent>
              <TabsContent value="diuretics">
                <SubstancesList />
              </TabsContent>
              <TabsContent value="hormones">
                <SubstancesList />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Categories</CardTitle>
            <CardDescription>Substance categories and counts.</CardDescription>
          </CardHeader>
          <CardContent>
            <SubstanceCategories />
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  )
}
