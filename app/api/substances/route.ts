import { NextResponse } from "next/server"

// This would be a real implementation that fetches substances from a database
async function getSubstances(query?: string, category?: string) {
  // In a real implementation, this would:
  // 1. Connect to a database
  // 2. Query the substances table with filters
  // 3. Return the results

  // Mock implementation for demonstration
  const substances = [
    {
      id: "1",
      name: "Boldenone",
      category: "Performance Enhancing",
      dateAdded: "Jan 15, 2023",
      status: "Existing",
    },
    {
      id: "2",
      name: "Ibutamoren (MK-677)",
      category: "Growth Hormone",
      dateAdded: "May 15, 2025",
      status: "New",
    },
    {
      id: "3",
      name: "Dehydrochlormethyltestosterone",
      category: "Anabolic Steroid",
      dateAdded: "Mar 10, 2024",
      status: "Existing",
    },
    {
      id: "4",
      name: "Selective Androgen Receptor Modulator S-23",
      category: "SARM",
      dateAdded: "May 15, 2025",
      status: "New",
    },
    {
      id: "5",
      name: "Ostarine",
      category: "SARM",
      dateAdded: "Sep 22, 2023",
      status: "Existing",
    },
  ]

  let filteredSubstances = [...substances]

  if (query) {
    filteredSubstances = filteredSubstances.filter((s) => s.name.toLowerCase().includes(query.toLowerCase()))
  }

  if (category && category !== "all") {
    filteredSubstances = filteredSubstances.filter((s) => s.category.toLowerCase() === category.toLowerCase())
  }

  return filteredSubstances
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get("query") || undefined
    const category = searchParams.get("category") || undefined

    const substances = await getSubstances(query, category)

    return NextResponse.json({ substances })
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch substances" }, { status: 500 })
  }
}
