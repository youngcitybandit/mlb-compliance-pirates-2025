import { Shield } from "lucide-react"

export function SubstanceCategories() {
  const categories = [
    {
      name: "Performance Enhancing",
      count: 48,
      icon: Shield,
    },
    {
      name: "Stimulants",
      count: 36,
      icon: Shield,
    },
    {
      name: "Diuretics & Masking",
      count: 21,
      icon: Shield,
    },
    {
      name: "Hormones & Modulators",
      count: 19,
      icon: Shield,
    },
    {
      name: "SARMs",
      count: 12,
      icon: Shield,
    },
    {
      name: "Narcotics",
      count: 6,
      icon: Shield,
    },
  ]

  return (
    <div className="space-y-4">
      {categories.map((category) => (
        <div key={category.name} className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <category.icon className="h-4 w-4 text-muted-foreground" />
            <span>{category.name}</span>
          </div>
          <span className="font-medium">{category.count}</span>
        </div>
      ))}
    </div>
  )
}
