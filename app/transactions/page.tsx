import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Image from "next/image"

interface RosterTransaction {
  id: string
  team: string
  teamLogo: string
  date: string // MM/DD/YY
  description: React.ReactNode
}

const transactions: RosterTransaction[] = [
  {
    id: "1",
    team: "Pittsburgh Pirates",
    teamLogo: "/pirates-logo-p.png",
    date: "06/21/25",
    description: (
      <>
        <b>Pittsburgh Pirates</b> activated RF <b>Bryan Reynolds</b> from the paternity list.
      </>
    ),
  },
  {
    id: "2",
    team: "Pittsburgh Pirates",
    teamLogo: "/pirates-logo-p.png",
    date: "06/21/25",
    description: (
      <>
        <b>Pittsburgh Pirates</b> placed LHP <b>Ryan Borucki</b> on the 15-day injured list. Low back inflammation.
      </>
    ),
  },
  {
    id: "3",
    team: "Indianapolis Indians",
    teamLogo: "/pirates-logo-p.png",
    date: "06/21/25",
    description: (
      <>
        <b>Pittsburgh Pirates</b> optioned OF <b>Billy Cook</b> to Indianapolis Indians.
      </>
    ),
  },
  {
    id: "4",
    team: "Pittsburgh Pirates",
    teamLogo: "/pirates-logo-p.png",
    date: "06/21/25",
    description: (
      <>
        <b>Pittsburgh Pirates</b> recalled RHP <b>Hunter Stratton</b> from Indianapolis Indians.
      </>
    ),
  },
  {
    id: "5",
    team: "Pittsburgh Pirates",
    teamLogo: "/pirates-logo-p.png",
    date: "06/21/25",
    description: (
      <>
        <b>Pittsburgh Pirates</b> acquired <b>Wilson Contreras</b> from the St. Louis Cardinals.
      </>
    ),
  },
  {
    id: "6",
    team: "Pittsburgh Pirates",
    teamLogo: "/pirates-logo-p.png",
    date: "06/21/25",
    description: (
      <>
        <b>Pittsburgh Pirates</b> acquired <b>Nolan Arenado</b> from the St. Louis Cardinals.
      </>
    ),
  },
  {
    id: "7",
    team: "Pittsburgh Pirates",
    teamLogo: "/pirates-logo-p.png",
    date: "06/21/25",
    description: (
      <>
        <b>Pittsburgh Pirates</b> acquired <b>Paul Goldschmidt</b> from the New York Yankees.
      </>
    ),
  },
]

export default function TransactionsPage() {
  return (
    <DashboardShell>
      <DashboardHeader 
        heading="Recent Transactions" 
        text="Latest roster moves and player transactions."
      />
      <Card>
        <CardHeader>
          <CardTitle>Player Transactions</CardTitle>
          <div className="flex justify-end mt-4">
            <button
              className="flex items-center gap-2 bg-[#FFD600] hover:bg-[#FFCA28] text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-150"
              style={{ fontWeight: 600 }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{display:'block'}}><path d="M18 16.5V11a6 6 0 1 0-12 0v5.5l-1.29 1.29A1 1 0 0 0 6 20h12a1 1 0 0 0 .71-1.71L18 16.5z"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
              <span style={{color: 'white'}}>Send New Notification</span>
            </button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-16">Team</TableHead>
                  <TableHead className="w-28">Date</TableHead>
                  <TableHead>Transaction</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.map((txn) => (
                  <TableRow key={txn.id}>
                    <TableCell>
                      <Image src={txn.teamLogo} alt={txn.team} width={32} height={32} style={{maxWidth:32, maxHeight:32}} />
                    </TableCell>
                    <TableCell>{txn.date}</TableCell>
                    <TableCell>{txn.description}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </DashboardShell>
  )
} 