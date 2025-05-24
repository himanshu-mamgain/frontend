import PlaceList from "../components/PlaceList";
import { useParams } from "react-router-dom";

import DUMMY_PLACES from "../DUMMY_PLACES.json";

const UserPlaces = () => {
  const userId: string | undefined = useParams().userId;

  return (
    <PlaceList
      items={DUMMY_PLACES.filter((place) => place.creator === Number(userId))}
    />
  );
};

export default UserPlaces;
