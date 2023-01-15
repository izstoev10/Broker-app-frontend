import Geocode from "react-geocode";

const useGetCity = (latitude, longitude) => {
  Geocode.setRegion("bg");
  Geocode.setLanguage("bg");
  Geocode.setApiKey(process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY);

  return Geocode.fromLatLng(latitude, longitude).then(
    (response) => {
      const city = response.results[0].address_components[0].long_name;
      return city;
    },
    (error) => {
      console.error(error);
    }
  );
};

export default useGetCity;
