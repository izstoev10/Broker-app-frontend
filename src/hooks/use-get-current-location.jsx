import { useGoogleMapsContext } from "../contexts/google-maps-context";

const useGetCurrentLocation = () => {
  const { map } = useGoogleMapsContext();
  const lat = map?.center.lat();
  const lng = map?.center.lng();
  return { lat, lng };
};

export default useGetCurrentLocation;
