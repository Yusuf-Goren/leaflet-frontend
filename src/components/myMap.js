import { useMapEvent } from "react-leaflet/hooks";
export default function AddMarker({ setMarkerTemp }) {
  const map = useMapEvent("click", (e) => {
    map.flyTo(e.latlng, map.getZoom());

    setMarkerTemp(e.latlng);

    map.locate();
  });
  return null;
}
