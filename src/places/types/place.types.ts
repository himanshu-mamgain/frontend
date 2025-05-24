export interface Places {
  id: number;
  imageUrl: string;
  title: string;
  description: string;
  address: string;
  creator: number;
  location: PlacesLocation;
}

export interface PlacesLocation {
  lat: number;
  lng: number;
}

export type PlaceItemProps = Omit<
  Places,
  "imageUrl" | "creator" | "location"
> & {
  image: string;
  creatorId: number;
  coordinates: PlacesLocation;
};
