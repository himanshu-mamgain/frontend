export interface Users {
  id: number;
  image: string;
  name: string;
  places: number;
}

export type UserItemProps = Omit<Users, "places"> & { placeCount: number };
