interface Destination {
  id?: number;
  owner_id: number;
  visibility: "public" | "private";
  is_reviewed: boolean;
  name: string;
  latitude: number;
  longitude: number;
}
