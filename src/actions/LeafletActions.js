import { server } from "../config/server";

export const getPlaces = async () => {
  const requestOptions = {
    headers: { "Content-Type": "application/json" },
    method: "GET",
    // body: JSON.stringify(info),
  };
  const response = await fetch(`${server}/get-places`, requestOptions);
  const data = await response.json();
  return data;
};

export const addPlace = async (info) => {
  console.log(info);
  const requestOptions = {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    body: JSON.stringify(info),
  };
  const response = await fetch(`${server}/add-place`, requestOptions);
  const data = await response.json();
  return data;
};

export const deletePlace = async (placeId) => {
  const requestOptions = {
    headers: { "Content-Type": "application/json" },
    method: "DELETE",
  };
  const response = await fetch(
    `${server}/delete-place/${placeId}`,
    requestOptions
  );
  const data = await response.json();
  return data;
};
