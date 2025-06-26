import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { AlertTriangle, Info } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export function StatisticalTriggerInfo() {
  const hitterTriggers = [
    {
      category: "HR Season-to-Season",
      trigger: "+7–11 HR from prior year",
      description: "Significant increase in home run production compared to previous season",
      substances: ["Boldenone", "Stanozolol", "Nandrolone", "Testosterone"],
    },
    {
      category: "ISO Increase",
      trigger: "+.035 or more year-over-year",
      description: "Isolated power spike indicating increased power without corresponding batting average increase",
      substances: ["Dehydrochlormethyltestosterone", "Stanozolol", "Testosterone"],
    },
    {
      category: "SLG Increase",
      trigger: "+.070 or more",
      description: "Substantial increase in slugging percentage indicating more extra-base hits",
      substances: ["Testosterone", "Nandrolone", "Methandienone"],
    },
    {
      category: "Exit Velocity",
      trigger: "+2.1+ mph avg gain",
      description: "Significant increase in average exit velocity indicating harder contact",
      substances: ["Stanozolol", "Testosterone", "Selective Androgen Receptor Modulators"],
    },
    {
      category: "K% Drop",
      trigger: "-3.5% or more (while power increases)",
      description: "Decreased strikeout rate while simultaneously increasing power metrics",
      substances: ["Selective Androgen Receptor Modulator S-23", "Ostarine"],
    },
    {
      category: "Games Played",
      trigger: "Full season after injury-plagued career",
      description: "Unusual durability after history of injuries",
      substances: ["Human Growth Hormone", "Ibutamoren (MK-677)", "Peptides"],
    },
  ]

  const pitcherTriggers = [
    {
      category: "Fastball Velocity",
      trigger: "+1.4 mph or more",
      description: "Significant increase in average fastball velocity",
      substances: ["Boldenone", "Ibutamoren (MK-677)", "Testosterone"],
    },
    {
      category: "Spin Rate",
      trigger: "+140 RPM or more",
      description: "Substantial increase in spin rate on breaking pitches",
      substances: ["Selective Androgen Receptor Modulator S-23", "Stanozolol"],
    },
    {
      category: "K% Increase",
      trigger: "+3.5% or more",
      description: "Significant increase in strikeout percentage",
      substances: ["Selective Androgen Receptor Modulator S-23", "Ostarine"],
    },
    {
      category: "Recovery",
      trigger: "Unusual recovery patterns",
      description: "Ability to pitch effectively on shorter rest than historical norms",
      substances: ["Cardarine (GW501516)", "Ibutamoren (MK-677)", "Human Growth Hormone"],
    },
    {
      category: "Velocity Maintenance",
      trigger: "Late-game velocity equal to early-game",
      description: "Unusual ability to maintain peak velocity throughout entire outings",
      substances: ["Selective Androgen Receptor Modulator S-23", "Cardarine (GW501516)"],
    },
    {
      category: "Workload Increase",
      trigger: "+21 IP year-over-year with improved metrics",
      description: "Significant increase in innings pitched while maintaining or improving performance",
      substances: ["Human Growth Hormone", "Ibutamoren (MK-677)", "Peptides"],
    },
  ]

  const statisticalTriggers = [
    {
      trigger: "Velocity Spike",
      description: "Sudden increase in fastball velocity",
      substances: ["Anabolic Agents", "Peptide Hormones", "Hormone Modulators"],
      risk: "High"
    },
    {
      trigger: "Power Surge",
      description: "Dramatic increase in home run rate",
      substances: ["Anabolic Agents", "Hormone Modulators", "Metabolic Modulators"],
      risk: "High"
    },
    {
      trigger: "Stamina Increase",
      description: "Unusual improvement in endurance",
      substances: ["Peptide Hormones", "Metabolic Modulators", "Beta-2 Agonists"],
      risk: "Medium"
    },
    {
      trigger: "Recovery Speed",
      description: "Faster than expected injury recovery",
      substances: ["Peptide Hormones", "Anabolic Agents", "Hormone Modulators"],
      risk: "High"
    },
    {
      trigger: "Control Issues",
      description: "Sudden decline in control",
      substances: ["Hormone Modulators", "Metabolic Modulators", "Stimulants"],
      risk: "Medium"
    },
    {
      trigger: "Performance Decline",
      description: "Unexpected performance drop",
      substances: ["Metabolic Modulators", "Hormone Modulators"],
      risk: "Low"
    }
  ]

  const mlbBannedSubstances = [
    {
      category: "Anabolic Agents",
      description: "Substances that may enhance muscle growth and recovery",
      examples: ["Various anabolic agents", "Hormone derivatives", "Synthetic compounds"]
    },
    {
      category: "Peptide Hormones",
      description: "Substances that may affect growth and recovery processes",
      examples: ["Growth factors", "Hormone precursors", "Peptide compounds"]
    },
    {
      category: "Beta-2 Agonists",
      description: "Substances that may enhance breathing and endurance",
      examples: ["Bronchodilators", "Respiratory enhancers", "Endurance compounds"]
    },
    {
      category: "Hormone Modulators",
      description: "Substances that may affect hormone levels",
      examples: ["Hormone regulators", "Endocrine modulators", "Receptor compounds"]
    },
    {
      category: "Metabolic Modulators",
      description: "Substances that may affect energy metabolism",
      examples: ["Metabolic enhancers", "Energy regulators", "Metabolic compounds"]
    },
    {
      category: "Diuretics",
      description: "Substances that may affect fluid balance",
      examples: ["Fluid regulators", "Electrolyte modulators", "Hydration compounds"]
    },
    {
      category: "Stimulants",
      description: "Substances that may enhance alertness and energy",
      examples: ["CNS stimulants", "Energy enhancers", "Alertness compounds"]
    },
    {
      category: "Masking Agents",
      description: "Substances that may interfere with testing procedures",
      examples: ["Detection inhibitors", "Test interference compounds", "Masking substances"]
    }
  ]

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Info className="h-5 w-5 text-blue-500" />
          <div>
            <CardTitle>MLB Drug Prevention and Treatment Program</CardTitle>
            <CardDescription>
              Statistical triggers and banned substances under the Joint Drug Prevention and Treatment Program
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle className="h-4 w-4 text-amber-500" />
              <h3 className="font-medium text-lg">Important Considerations</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              These statistical triggers are not definitive proof of any specific cause but raise eyebrows when multiple
              occur together, especially for players past age 30 or without a known swing/mechanical change. All flagged
              players should be evaluated in context of their career trajectory, injury history, and other factors.
            </p>
          </div>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="statistical-triggers">
              <AccordionTrigger>Statistical Trigger Thresholds</AccordionTrigger>
              <AccordionContent>
                <div className="grid md:grid-cols-2 gap-6 pt-2">
                  <div>
                    <h3 className="font-medium text-base mb-3">Hitter Triggers</h3>
                    <div className="rounded-md border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Category</TableHead>
                            <TableHead>Trigger Threshold</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {hitterTriggers.map((trigger, index) => (
                            <TableRow key={index}>
                              <TableCell className="font-medium">{trigger.category}</TableCell>
                              <TableCell>
                                <div className="flex flex-col">
                                  <span>{trigger.trigger}</span>
                                  <span className="text-xs text-muted-foreground">{trigger.description}</span>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium text-base mb-3">Pitcher Triggers</h3>
                    <div className="rounded-md border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Category</TableHead>
                            <TableHead>Trigger Threshold</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {pitcherTriggers.map((trigger, index) => (
                            <TableRow key={index}>
                              <TableCell className="font-medium">{trigger.category}</TableCell>
                              <TableCell>
                                <div className="flex flex-col">
                                  <span>{trigger.trigger}</span>
                                  <span className="text-xs text-muted-foreground">{trigger.description}</span>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="banned-substances">
              <AccordionTrigger>MLB Prohibited Substances</AccordionTrigger>
              <AccordionContent>
                <p className="text-sm text-muted-foreground mb-4">
                  The following substance categories are prohibited under MLB's Joint Drug Prevention and Treatment Program.
                </p>
                
                <div className="space-y-4">
                  {mlbBannedSubstances.map((category, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <h4 className="font-semibold text-red-800 mb-2">{category.category}</h4>
                      <p className="text-sm text-gray-600 mb-2">{category.description}</p>
                      <div className="text-xs text-gray-500">
                        <strong>Examples:</strong> {category.examples.join(", ")}
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 p-4 bg-yellow-50 rounded-lg border">
                  <h4 className="font-semibold text-yellow-800 mb-2">Important Note</h4>
                  <p className="text-sm text-yellow-700">
                    When statistical triggers are detected that may correlate with prohibited substance categories, additional targeted testing may be implemented.
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="testing-program">
              <AccordionTrigger>MLB Testing Program</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4 pt-2">
                  <p className="text-sm text-muted-foreground">
                    MLB's Joint Drug Prevention and Treatment Program includes comprehensive testing protocols:
                  </p>

                  <div className="space-y-3">
                    <div className="rounded-md border p-3">
                      <h4 className="font-medium mb-1">Regular Season Testing</h4>
                      <p className="text-sm text-muted-foreground">
                        All players on 40-man rosters are subject to at least one unannounced test during the season,
                        with additional random testing throughout the year.
                      </p>
                    </div>

                    <div className="rounded-md border p-3">
                      <h4 className="font-medium mb-1">Off-Season Testing</h4>
                      <p className="text-sm text-muted-foreground">
                        Players are subject to random testing during the off-season, with a minimum of 350 random tests
                        conducted.
                      </p>
                    </div>

                    <div className="rounded-md border p-3">
                      <h4 className="font-medium mb-1">Reasonable Cause Testing</h4>
                      <p className="text-sm text-muted-foreground">
                        If the MLB has information giving reasonable cause to believe a player has used a prohibited
                        substance, additional targeted testing may be implemented.
                      </p>
                    </div>

                    <div className="rounded-md border p-3">
                      <h4 className="font-medium mb-1">Follow-Up Testing</h4>
                      <p className="text-sm text-muted-foreground">
                        Players who have previously tested positive are subject to additional unannounced testing for
                        the remainder of their careers.
                      </p>
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </CardContent>
    </Card>
  )
}
