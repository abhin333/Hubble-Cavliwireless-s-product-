


export interface Exhibitor {
  id: number | string;
  name: string;
  country?: string;
  profile_url?: string;
}

export interface ExhibitorLocation {
  location_id: number;
  exhibitor_id: number | string;
  exhibitor_name: string;
  profile_url?: string;
  country?: string;
  event_slug?: string;
  hall_no?: string;
  booth_no?: string;
}

export async function getExhibitors(): Promise<Exhibitor[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL }/api/exhibitors?limit=${process.env.NEXT_PUBLIC_API_EXHIBITOR_LIMIT}`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) return [];
  const data = await res.json();
  return data.results ?? data.data ?? [];
}

// Fetches exhibitors joined with hall_no/booth_no from /api/exhibitor-locations,
// for anywhere (like the footer) that needs to show booth info, not just the name.
export async function getExhibitorLocations(

) {


  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL }/api/exhibitor-locations?${process.env.NEXT_PUBLIC_API_EXHIBITOR_LIMIT}`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) return [];
  const data = await res.json();
  return data.results ?? data.data ?? [];
}