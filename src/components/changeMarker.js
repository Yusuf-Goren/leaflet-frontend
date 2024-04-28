import { useEffect } from "react";
import { useMap } from "react-leaflet/hooks";

export default function ChangeMarker({ marker }) {
  const map = useMap();

  useEffect(() => {
    map.setView([marker.lat, marker.lng]);
  }, [marker]);
  return null;
}
