import { onMount } from "solid-js";
import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import "./MapComponent.css";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import GeoJSON from "ol/format/GeoJSON";

const MapComponent = () => {
  let map;
  onMount(() => {
    map = new Map({
      target: "map",
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      view: new View({
        center: [0, 0],
        zoom: 2,
      }),
    });

    // Make the map accessible from the console
    (window as any).map = map;
  });

  const updateMap = () => {
    // Example: Change the map view
    fetchGEO();
  };

  const fetchGEO = async () => {
    //const geoJsonFormat = new GeoJSON();
    //const response = await fetch('http://localhost:8080/airports.geojson');
    const response = await fetch("http://localhost:8080/region-5a.geojson");
    if (!response.ok) {
      throw new Error(
        `Failed to fetch GeoJSON: ${response.status} ${response.statusText}`
      );
    }
    const data = await response.json();
    //const features = geoJsonFormat.readFeatures(data);
    const vectorSource = new VectorSource({
      features: new GeoJSON().readFeatures(data, {
        featureProjection: "EPSG:3857",
      }),
    });
    const vectorLayer = new VectorLayer({
      source: vectorSource,
      // style: mystyle
    });

    map.addLayer(vectorLayer);
  };

  return (
    <>
      <div id="map" class="map"></div>
      <button onClick={updateMap}>Add Region1</button>
    </>
  );
};

export default MapComponent;
