import React, { useState, useEffect, useMemo } from "react";
import {
  GoogleMap,
  Marker,
  useJsApiLoader,
  LoadScript,
} from "@react-google-maps/api";
import { fromLatLng, setKey } from "react-geocode";
import PlacesAutocomplete from "react-places-autocomplete";
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";

//import { GoogleMapsAPI } from "./apiKey";
import "./Map.scss";
/* import { Loader } from '@googlemaps/js-api-loader';
const loader = new Loader({
  apiKey: process.env.REACT_APP_REACT_APP_GoogleMapsAPI,
  version: "weekly",
  libraries: ["places"]
});

const mapOptions = {
  center: {
    lat: 0,
    lng: 0
  },
  zoom: 4
};

loader
  .load()
  .then((google) => {
    new google.maps.Map(document.getElementById("map"), mapOptions);
  })
  .catch(e => {
    // do something
  }); */

setKey(process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "");
//Geocode.enableDebug();

function Map(props: any) {
  const {
    isVisible,
    latLngCoordinatesObject,
    setTemporaryHoldUserSelection,
    readOnly,
  } = props;
  latLngCoordinatesObject.lat = Number(latLngCoordinatesObject.lat);
  latLngCoordinatesObject.lng = Number(latLngCoordinatesObject.lng);
  const libraries = useMemo(() => ['places'], []);
  const options = {
    disableDefaultUI: true,
    zoomControl: true,
  };
  const [mapPosition, setMapPosition] = useState({
    lat: latLngCoordinatesObject.lat,
    lng: latLngCoordinatesObject.lng,
  });
  /* const [markerPosition, setMarkerPosition] = useState({
    lat: latLngCoordinatesObject.lat,
    lng: latLngCoordinatesObject.lng,
  }); */

  const [address, setAddress] = useState("");
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
    libraries: libraries as any,
  });

  /* useEffect(() => {
    let pos = latLngCoordinatesObject
      ? latLngCoordinatesObject
      : {
          lat: 20.5937,
          lng: 78.9629,
        };
    setMapPosition(pos);
    setMarkerPosition(pos);
    // eslint-disable-next-line
  }, []); */

  const getAndSetLocationDetails = (newLat: any, newLng: any) => {
    fromLatLng(newLat, newLng).then(
      (response) => {
        const address = response.results[0].formatted_address;
        let city, state, country, pincode;
        for (
          let i = 0;
          i < response.results[0].address_components.length;
          i++
        ) {
          for (
            let j = 0;
            j < response.results[0].address_components[i].types.length;
            j++
          ) {
            switch (response.results[0].address_components[i].types[j]) {
              case "locality":
                city = response.results[0].address_components[i].long_name;
                break;
              case "administrative_area_level_1":
                state = response.results[0].address_components[i].long_name;
                break;
              case "country":
                country = response.results[0].address_components[i].long_name;
                break;
              case "postal_code":
                pincode = response.results[0].address_components[i].long_name;
                break;
              default:
                break;
            }
          }
        }
        !readOnly &&
          setTemporaryHoldUserSelection({
            location: address,
            latitude: newLat,
            longitude: newLng,
            city,
            state,
            postalcode: pincode,
            country,
          });
        props.onChange &&
          props.onChange({
            location: address,
            latitude: newLat,
            longitude: newLng,
            city,
            state,
            postalcode: pincode,
            country,
          });
        setMapPosition({ lat: newLat, lng: newLng });
        //setMarkerPosition({ lat: newLat, lng: newLng });
        setAddress(address ? address : "");
      },
      (error) => {
        console.error(error);
      }
    );
  };

  useEffect(() => {
    getAndSetLocationDetails(
      latLngCoordinatesObject.lat,
      latLngCoordinatesObject.lng
    );
    // eslint-disable-next-line
  }, []);

  const onMarkerDragEnd = (event: any) => {
    let newLat = event.latLng.lat(),
      newLng = event.latLng.lng();
    getAndSetLocationDetails(newLat, newLng);
  };

  const OnLocationclick = (event: any) => {
    let newLat = event.latLng.lat(),
      newLng = event.latLng.lng();
    getAndSetLocationDetails(newLat, newLng);
  };

  const onChange = (event: any) => {
    isVisible && OnLocationclick(event);
  };

  const handleSelect = (address: any) => {
    setAddress(address);
    geocodeByAddress(address)
      .then((results: any) => getLatLng(results[0]))
      .then((latLng: any) => {
        getAndSetLocationDetails(latLng.lat, latLng.lng);
      })
      .catch((error: any) => console.error("Error", error));
  };

  const handleChange = (address: any) => {
    setAddress(address);
  };

  const handlePlaceChanged = (place: any) => {
    console.log(place);
    // setSelectedPlace(place);
  };

  return isLoaded ? (
    <div className="map-container">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          width: "100%",
          justifyContent: "center",
        }}
      >
        {!readOnly && (
          <PlacesAutocomplete
            value={address}
            onChange={handleChange}
            onSelect={handleSelect}
          >
            {({
              getInputProps,
              suggestions,
              getSuggestionItemProps,
              loading,
            }) => (
              <div>
                <input
                  {...getInputProps({
                    placeholder: "Search Places ...",
                    className: "location-search-input",
                  })}
                />
                <div className="autocomplete-dropdown-container">
                  {loading && <div>Loading...</div>}
                  {suggestions.map((suggestion: any) => {
                    const className = suggestion.active
                      ? "suggestion-item--active"
                      : "suggestion-item";
                    // inline style for demonstration purpose
                    const style = suggestion.active
                      ? { backgroundColor: "#fafafa", cursor: "pointer" }
                      : { backgroundColor: "#ffffff", cursor: "pointer" };
                    return (
                      <div
                        {...getSuggestionItemProps(suggestion, {
                          className,
                          style,
                        })}
                      >
                        <span>{suggestion.description}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </PlacesAutocomplete>
        )}

        <GoogleMap
          mapContainerStyle={{
            height: "450px",
            width: "100%",
          }}
          options={options}
          zoom={props?.zoom || 5}
          center={{ lat: mapPosition.lat, lng: mapPosition.lng }}
          onClick={readOnly ? () => {} : onChange}
        >
          <Marker
            draggable={!readOnly}
            onDragEnd={readOnly ? () => {} : onMarkerDragEnd}
            position={{ lat: mapPosition.lat, lng: mapPosition.lng }}
          />
        </GoogleMap>
      </div>
    </div>
  ) : (
    <></>
  );
}

Map.getMapLocation = async (lat: any, lng: any) => {
  if (!lat || !lng) return;
  let location = "";
  return fromLatLng(lat, lng).then((response) => {
    const address = response.results[0].formatted_address;
    location = address;
    return location;
  });
};

export default Map;
