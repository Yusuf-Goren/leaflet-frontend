import React, { useState, useEffect } from "react";
import AddMarker from "./myMap";
import ChangeMarker from "./changeMarker";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { addPlace, getPlaces, deletePlace } from "../actions/LeafletActions";
import deleteIcon from "../images/delete-icon.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function LeafletMapContainer() {
  const [markers, setMarkers] = useState([]);
  const [markerTemp, setMarkerTemp] = useState({
    lat: 40.8452,
    lng: 29.4295,
  });

  const savePoint = async () => {
    try {
      const res = await addPlace(markerTemp);
      toast.success("Nokta Kaydedildi");
      setMarkers(res);
    } catch (error) {
      toast.error("Nokta Kaydedilirken beklenmedik bir hata oluştu");
    }
  };
  const deletePoint = async (placeId) => {
    try {
      const res = await deletePlace(placeId);
      toast.success(`${placeId}. Nokta Silindi`);
      setMarkers(res);
    } catch (error) {
      toast.error("Nokta Silinirken beklenmedik bir hata oluştu");
    }
  };

  const getPoints = async () => {
    try {
      const res = await getPlaces();
      setMarkers(res);
      return;
    } catch (error) {}
    toast.error(
      "Noktalar veritabanından getirilirken beklenmedik bir hata meydana geldi"
    );
  };

  useEffect(() => {
    getPoints();
  }, []);

  return (
    <div className="container">
      <ToastContainer />
      <MapContainer
        center={[markerTemp.lat, markerTemp.lng]}
        zoom={13}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker
          key={markerTemp?.lat}
          position={[markerTemp?.lat, markerTemp?.lng]}
        >
          <Popup color>
            Nokta {markerTemp?.id}
            <br />
            <span> {markerTemp.lat} </span> <br />
            <span> {markerTemp.lng} </span>{" "}
          </Popup>
        </Marker>

        <AddMarker setMarkerTemp={setMarkerTemp} />
        {markerTemp?.lat && <ChangeMarker marker={markerTemp} />}
      </MapContainer>
      <div className="list">
        <h2> Seçili Alanlar</h2>

        {markers?.length > 0 && (
          <ul>
            {markers.map((marker, index) => (
              <div key={index} className="d-flex">
                <li
                  onClick={() => {
                    setMarkerTemp(marker);
                  }}
                >
                  <div className="d-flex">
                    <span> Enlem </span>
                    <span> {marker.lat} </span>
                  </div>
                  <div>
                    <span>Boylam</span>
                    <span>{marker.lng} </span>
                  </div>
                </li>
                <div onClick={() => deletePoint(marker.id)} className="delete">
                  {" "}
                  <img width={20} src={deleteIcon} alt="delete icon" />{" "}
                </div>
              </div>
            ))}
          </ul>
        )}
        <div className="buttons">
          <button
            className={markerTemp ? "button" : "button disabled"}
            onClick={savePoint}
          >
            Noktayı Kaydet{" "}
          </button>

          <a
            style={{ color: "black" }}
            href={`data:text/json;charset=utf-16,${encodeURIComponent(
              JSON.stringify(markers)
            )}`}
            download="filename.json"
          >
            {markers?.length > 0 && (
              <button
                className={markers?.length > 0 ? "button" : "button disabled"}
              >
                İndir
              </button>
            )}
          </a>
        </div>
      </div>
    </div>
  );
}
