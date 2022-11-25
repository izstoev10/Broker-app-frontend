import Geocode from "react-geocode";

const useGetLocation = (address) => {
  Geocode.setRegion("bg");
  Geocode.setLanguage("bg");
  Geocode.setApiKey(process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY);

  return Geocode.fromAddress(address).then(
    (response) => {
      const { lat, lng } = response.results[0].geometry.location;
      return { lat, lng };
    },
    (error) => {
      console.error(error);
    }
  );
};

export default useGetLocation;
