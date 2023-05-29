import { Destination } from "./Destination";

export interface BucketListItem {
  id: number;
  destination_id: number;
  owner_id: number;
  start_date: Date;
  end_date: Date;
  is_favorite: boolean;
  destination: Destination;
}
