import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import homeMarkerImage from "/marker/homeMarker.png"
import tagImage from "/marker/tagMarker.png"

export const homeMarker = L.icon({
  iconUrl: homeMarkerImage,
  iconSize: [50, 50], // width and height of the icon
  iconAnchor: [16, 32], // point of the icon which will correspond to marker's location
  popupAnchor: [0, -32], // point from which the popup should open relative to the iconAnchor
});
export const tagMarker = L.icon({
  iconUrl: tagImage,
  iconSize: [50, 50], // width and height of the icon
  iconAnchor: [16, 32], // point of the icon which will correspond to marker's location
  popupAnchor: [0, -32], // point from which the popup should open relative to the iconAnchor
});
 