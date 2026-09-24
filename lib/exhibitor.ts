// lib/exhibitors.ts
//
// Swap out the body of getExhibitors() for your real Task-2 data source.
// Examples are left in comments below for the most common setups.

export type Exhibitor = {
    id: string;
    name: string;
    logoUrl: string;
    boothNumber?: string;
    category?: string;
  };
  
  export async function getExhibitors(): Promise<Exhibitor[]> {
    // --- Option A: Prisma ---
    // const exhibitors = await prisma.exhibitor.findMany({
    //   orderBy: { name: "asc" },
    // });
    // return exhibitors;
  
    // --- Option B: Supabase ---
    // const { data, error } = await supabase.from("exhibitors").select("*");
    // if (error) throw error;
    // return data;
  
    // --- Option C: your own internal API route ---
    // const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/exhibitors`, {
    //   next: { revalidate: 60 }, // ISR: refresh every 60s
    // });
    // return res.json();
  
    // Temporary mock data so the header/footer render today.
    return [
      { id: "1", name: "Acme Robotics", logoUrl: "/logos/acme.png", boothNumber: "A12", category: "Automation" },
      { id: "2", name: "Nova Sensors", logoUrl: "/logos/nova.png", boothNumber: "B04", category: "Sensors" },
      { id: "3", name: "GreenGrid Power", logoUrl: "/logos/greengrid.png", boothNumber: "C21", category: "Energy" },
      { id: "4", name: "Vertex Systems", logoUrl: "/logos/vertex.png", boothNumber: "A05", category: "Networking" },
      { id: "5", name: "Orbital Labs", logoUrl: "/logos/orbital.png", boothNumber: "D09", category: "Analytics" },
      { id: "6", name: "Pulse Dynamics", logoUrl: "/logos/pulse.png", boothNumber: "B17", category: "Automation" },
    ];
  }