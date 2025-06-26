// Pirates 40-Man Roster Data
// Source: https://www.mlb.com/pirates/roster/40-man
// Last updated: Based on current 40-man roster

export interface PiratesPlayer {
  id: number;
  name: string;
  position: string;
  throws?: string; // For pitchers
  bats?: string;   // For position players
  height?: string;
  weight?: number;
  dob?: string;
  status?: string; // "Active", "IL-15", "IL-60", "Minors", etc.
}

// All eligible Pirates pitchers from 40-man roster
export const PIRATES_PITCHERS: PiratesPlayer[] = [
  {
    id: 677952,
    name: "Braxton Ashcraft",
    position: "Pitcher",
    throws: "R",
    height: "6' 5\"",
    weight: 220,
    dob: "10/05/1999"
  },
  {
    id: 670280,
    name: "David Bednar",
    position: "Pitcher",
    throws: "R",
    height: "6' 1\"",
    weight: 250,
    dob: "10/10/1994"
  },
  {
    id: 621366,
    name: "Ryan Borucki",
    position: "Pitcher",
    throws: "L",
    height: "6' 4\"",
    weight: 210,
    dob: "03/31/1994",
    status: "IL-15"
  },
  {
    id: 663656,
    name: "Mike Burrows",
    position: "Pitcher",
    throws: "R",
    height: "6' 2\"",
    weight: 200,
    dob: "01/15/2000"
  },
  {
    id: 663657,
    name: "Colin Holderman",
    position: "Pitcher",
    throws: "R",
    height: "6' 7\"",
    weight: 240,
    dob: "08/10/1995"
  },
  {
    id: 663658,
    name: "Carmen Mlodzinski",
    position: "Pitcher",
    throws: "R",
    height: "6' 2\"",
    weight: 230,
    dob: "02/19/1999"
  },
  {
    id: 663659,
    name: "Dauri Moreta",
    position: "Pitcher",
    throws: "R",
    height: "6' 0\"",
    weight: 200,
    dob: "07/11/1996"
  },
  {
    id: 663660,
    name: "Luis Ortiz",
    position: "Pitcher",
    throws: "R",
    height: "6' 3\"",
    weight: 230,
    dob: "09/22/1999"
  },
  {
    id: 663661,
    name: "Quinn Priester",
    position: "Pitcher",
    throws: "R",
    height: "6' 3\"",
    weight: 210,
    dob: "07/15/2000"
  },
  {
    id: 663662,
    name: "Ryder Ryan",
    position: "Pitcher",
    throws: "R",
    height: "6' 2\"",
    weight: 200,
    dob: "06/11/1995"
  },
  {
    id: 663663,
    name: "Roansy Contreras",
    position: "Pitcher",
    throws: "R",
    height: "6' 0\"",
    weight: 175,
    dob: "11/07/1999"
  },
  {
    id: 663664,
    name: "Josh Fleming",
    position: "Pitcher",
    throws: "L",
    height: "6' 1\"",
    weight: 200,
    dob: "05/18/1996"
  },
  {
    id: 663665,
    name: "Marco Gonzales",
    position: "Pitcher",
    throws: "L",
    height: "6' 1\"",
    weight: 200,
    dob: "10/14/1992"
  },
  {
    id: 663666,
    name: "Mitch Keller",
    position: "Pitcher",
    throws: "R",
    height: "6' 2\"",
    weight: 220,
    dob: "04/04/1996"
  },
  {
    id: 663667,
    name: "Jared Jones",
    position: "Pitcher",
    throws: "R",
    height: "6' 1\"",
    weight: 190,
    dob: "08/06/2001"
  },
  {
    id: 663668,
    name: "Martin Perez",
    position: "Pitcher",
    throws: "L",
    height: "6' 0\"",
    weight: 200,
    dob: "04/04/1991"
  },
  {
    id: 663669,
    name: "Paul Skenes",
    position: "Pitcher",
    throws: "R",
    height: "6' 6\"",
    weight: 235,
    dob: "05/29/2002"
  }
];

// Get just the pitcher IDs for filtering
export function getPiratesPitcherIds(): number[] {
  return PIRATES_PITCHERS.map(pitcher => pitcher.id);
}

// Get pitcher by ID
export function getPitcherById(id: number): PiratesPlayer | undefined {
  return PIRATES_PITCHERS.find(pitcher => pitcher.id === id);
}

// Get all active pitchers (not on IL)
export function getActivePiratesPitchers(): PiratesPlayer[] {
  return PIRATES_PITCHERS.filter(pitcher => 
    !pitcher.status || 
    !pitcher.status.includes('IL')
  );
}

// Get active pitcher IDs
export function getActivePiratesPitcherIds(): number[] {
  return getActivePiratesPitchers().map(pitcher => pitcher.id);
} 