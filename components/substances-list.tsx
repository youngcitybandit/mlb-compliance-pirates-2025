"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

type Substance = {
  id: string
  name: string
  category: string
  dateAdded: string
  status: "New" | "Updated" | "Existing"
}

const substances: Substance[] = [
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
  {
    id: "6",
    name: "Cardarine (GW501516)",
    category: "PPAR Agonist",
    dateAdded: "May 15, 2025",
    status: "New",
  },
  {
    id: "7",
    name: "Clomiphene",
    category: "Anti-Estrogen",
    dateAdded: "Feb 28, 2024",
    status: "Updated",
  },
]

export function SubstancesList() {
  const [sortedSubstances, setSortedSubstances] = useState<Substance[]>(substances)
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Substance | null
    direction: "ascending" | "descending"
  }>({
    key: null,
    direction: "ascending",
  })

  const requestSort = (key: keyof Substance) => {
    let direction: "ascending" | "descending" = "ascending"

    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending"
    }

    const sorted = [...sortedSubstances].sort((a, b) => {
      if (a[key] < b[key]) {
        return direction === "ascending" ? -1 : 1
      }
      if (a[key] > b[key]) {
        return direction === "ascending" ? 1 : -1
      }
      return 0
    })

    setSortedSubstances(sorted)
    setSortConfig({ key, direction })
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[300px] cursor-pointer" onClick={() => requestSort("name")}>
              Substance Name
            </TableHead>
            <TableHead className="cursor-pointer" onClick={() => requestSort("category")}>
              Category
            </TableHead>
            <TableHead className="cursor-pointer" onClick={() => requestSort("dateAdded")}>
              Date Added
            </TableHead>
            <TableHead className="cursor-pointer" onClick={() => requestSort("status")}>
              Status
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedSubstances.map((substance) => (
            <TableRow key={substance.id}>
              <TableCell className="font-medium">{substance.name}</TableCell>
              <TableCell>{substance.category}</TableCell>
              <TableCell>{substance.dateAdded}</TableCell>
              <TableCell>
                <Badge
                  variant={
                    substance.status === "New" ? "destructive" : substance.status === "Updated" ? "default" : "outline"
                  }
                  className={substance.status === "New" ? "bg-pirates-yellow text-pirates-black" : ""}
                >
                  {substance.status}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
