<!-- <template>
    <div id="map" style="height: 400px;"></div>
  </template>
  
  <script>
  import L from 'leaflet';
  import 'leaflet/dist/leaflet.css';
  import 'leaflet.heat/dist/leaflet-heat.js';
  import axios from 'axios';
  
  export default {
    mounted() {
      const map = L.map('map').setView([20, 100], 3); 
  
      const countryCoordinates = {
          Afghanistan: [33.93911, 67.709953],
          Armenia: [40.069099, 45.038189],
          Azerbaijan: [40.143105, 47.576927],
          Bahrain: [25.930414, 50.637772],
          Bangladesh: [23.684994, 90.356331],
          Bhutan: [27.514162, 90.433601],
          Brunei: [4.535277, 114.727669],
          Cambodia: [12.565679, 104.990963],
          China: [35.86166, 104.195397],
          Cyprus: [35.126413, 33.429859],
          Georgia: [42.315407, 43.356892],
          India: [20.593684, 78.96288],
          Indonesia: [-0.789275, 113.921327],
          Iran: [32.427908, 53.688046],
          Iraq: [33.223191, 43.679291],
          Israel: [31.046051, 34.851612],
          Japan: [36.204824, 138.252924],
          Jordan: [30.585164, 36.238414],
          Kazakhstan: [48.019573, 66.923684],
          Kuwait: [29.375859, 47.977405],
          Kyrgyzstan: [41.20438, 74.766098],
          Laos: [19.85627, 102.495496],
          Lebanon: [33.854721, 35.862285],
          Malaysia: [4.210484, 101.975766],
          Maldives: [3.202778, 73.22068],
          Mongolia: [46.862496, 103.846656],
          Myanmar: [21.916221, 95.955974],
          Nepal: [28.394857, 84.124008],
          Oman: [21.512583, 55.923255],
          Pakistan: [30.375321, 69.345116],
          Palestine: [31.952162, 35.233154],
          Philippines: [12.879721, 121.774017],
          Qatar: [25.354826, 51.183884],
          SaudiArabia: [23.885942, 45.079162],
          Singapore: [1.352083, 103.819836],
          South_Korea: [35.907757, 127.766922],
          Sri_Lanka: [7.873054, 80.771797],
          Syria: [34.802075, 38.996815],
          Taiwan: [23.69781, 120.960515],
          Tajikistan: [38.861034, 71.276093],
          Thailand: [15.870032, 100.992541],
          Timor_Leste: [-8.874217, 125.727539],
          Turkey: [38.963745, 35.243322],
          Turkmenistan: [38.969719, 59.556278],
          United_Arab_Emirates: [23.424076, 53.847818],
          Uzbekistan: [41.377491, 64.585262],
          Vietnam: [14.058324, 108.277199],
          Yemen: [15.552727, 48.516388],
      };
  
      axios.get('http://127.0.0.1:8000/api/artist/get/')
        .then(response => {
          const artistData = response.data;
  
          const heatmapData = artistData.map(artist => {
            const coordinates = countryCoordinates[artist.country];
            return coordinates ? [coordinates[0], coordinates[1], artist.name] : null; // Include artist's name
          }).filter(Boolean); 
  
          const heatLayer = L.heatLayer(heatmapData, { 
            radius: 20, 
            gradient: { 0.4: 'rgba(255, 0, 0, 0.8)', 0.65: 'lime', 1: 'blue' } 
          }).addTo(map); 
  
          heatLayer.eachLayer(layer => {
            const artistName = layer.getLatLng().alt;
            layer.bindPopup(artistName);
          });
        })
        .catch(error => {
          console.error('Error fetching artist data:', error);
        });
  
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
        maxZoom: 18,
      }).addTo(map);
    },
  };
  </script>
  
  <style scoped>
  /* Add custom styles here if needed */
  </style>
   -->

   <!-- <template>
    <div id="map" style="height: 400px;"></div>
  </template>
  
  <script>
  import L from 'leaflet';
  import 'leaflet/dist/leaflet.css';
  import 'leaflet.heat/dist/leaflet-heat.js';
  import axios from 'axios';
  
  export default {
    mounted() {
      const map = L.map('map').setView([20, 100], 3); 
  
      const countryCoordinates = {
        Afghanistan: [33.93911, 67.709953],
        Armenia: [40.069099, 45.038189],
        Azerbaijan: [40.143105, 47.576927],
          Bahrain: [25.930414, 50.637772],
          Bangladesh: [23.684994, 90.356331],
          Bhutan: [27.514162, 90.433601],
          Brunei: [4.535277, 114.727669],
          Cambodia: [12.565679, 104.990963],
          China: [35.86166, 104.195397],
          Cyprus: [35.126413, 33.429859],
          Georgia: [42.315407, 43.356892],
          India: [20.593684, 78.96288],
          Indonesia: [-0.789275, 113.921327],
          Iran: [32.427908, 53.688046],
          Iraq: [33.223191, 43.679291],
          Israel: [31.046051, 34.851612],
          Japan: [36.204824, 138.252924],
          Jordan: [30.585164, 36.238414],
          Kazakhstan: [48.019573, 66.923684],
          Kuwait: [29.375859, 47.977405],
          Kyrgyzstan: [41.20438, 74.766098],
          Laos: [19.85627, 102.495496],
          Lebanon: [33.854721, 35.862285],
          Malaysia: [4.210484, 101.975766],
          Maldives: [3.202778, 73.22068],
          Mongolia: [46.862496, 103.846656],
          Myanmar: [21.916221, 95.955974],
          Nepal: [28.394857, 84.124008],
          Oman: [21.512583, 55.923255],
          Pakistan: [30.375321, 69.345116],
          Palestine: [31.952162, 35.233154],
          Philippines: [12.879721, 121.774017],
          Qatar: [25.354826, 51.183884],
          SaudiArabia: [23.885942, 45.079162],
          Singapore: [1.352083, 103.819836],
          South_Korea: [35.907757, 127.766922],
          Sri_Lanka: [7.873054, 80.771797],
          Syria: [34.802075, 38.996815],
          Taiwan: [23.69781, 120.960515],
          Tajikistan: [38.861034, 71.276093],
          Thailand: [15.870032, 100.992541],
          Timor_Leste: [-8.874217, 125.727539],
          Turkey: [38.963745, 35.243322],
          Turkmenistan: [38.969719, 59.556278],
          United_Arab_Emirates: [23.424076, 53.847818],
          Uzbekistan: [41.377491, 64.585262],
          Vietnam: [14.058324, 108.277199],
          Yemen: [15.552727, 48.516388],
        // Other country coordinates...
      };
  
      axios.get('http://127.0.0.1:8000/api/artist/get/')
        .then(response => {
          const artistData = response.data;
  
          const heatmapData = artistData.map(artist => {
            const coordinates = countryCoordinates[artist.country];
            return coordinates ? [coordinates[0], coordinates[1], artist.username] : null; // Include artist's name
          }).filter(Boolean); 
  
          const heatLayer = L.heatLayer(heatmapData, { 
            radius: 20, 
            gradient: { 0.4: 'rgba(255, 0, 0, 0.8)', 0.65: 'lime', 1: 'blue' } 
          }).addTo(map); 
  
          // Add custom popups to each heatmap point
          heatLayer.eachLayer(layer => {
            const artistName = layer._data[2]; // Access artist name directly from heatmap data
            const popupContent = `<div style="background-color: white; padding: 10px; border-radius: 5px; box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);">${artistName}</div>`;
            layer.bindPopup(popupContent);
          });
        })
        .catch(error => {
          console.error('Error fetching artist data:', error);
        });
  
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
        maxZoom: 18,
      }).addTo(map);
    },
  };
  </script>
  
  <style scoped>
  /* Add custom styles here if needed */
  </style>
   -->
   <!-- <template>
    <div id="map" style="height: 400px;"></div>
  </template>
  
  <script>
  import L from 'leaflet';
  import 'leaflet/dist/leaflet.css';
  import 'leaflet.heat/dist/leaflet-heat.js';
  import axios from 'axios';
  
  export default {
    mounted() {
      const map = L.map('map').setView([20, 100], 3);
  
      const countryCoordinates = {
        Afghanistan: [33.93911, 67.709953],
        Armenia: [40.069099, 45.038189],
        Azerbaijan: [40.143105, 47.576927],
        Bahrain: [25.930414, 50.637772],
        Bangladesh: [23.684994, 90.356331],
        Bhutan: [27.514162, 90.433601],
        Brunei: [4.535277, 114.727669],
        Cambodia: [12.565679, 104.990963],
        China: [35.86166, 104.195397],
        Cyprus: [35.126413, 33.429859],
        Georgia: [42.315407, 43.356892],
        India: [20.593684, 78.96288],
        Indonesia: [-0.789275, 113.921327],
        Iran: [32.427908, 53.688046],
        Iraq: [33.223191, 43.679291],
        Israel: [31.046051, 34.851612],
        Japan: [36.204824, 138.252924],
        Jordan: [30.585164, 36.238414],
        Kazakhstan: [48.019573, 66.923684],
        Kuwait: [29.375859, 47.977405],
        Kyrgyzstan: [41.20438, 74.766098],
        Laos: [19.85627, 102.495496],
        Lebanon: [33.854721, 35.862285],
        Malaysia: [4.210484, 101.975766],
        Maldives: [3.202778, 73.22068],
        Mongolia: [46.862496, 103.846656],
        Myanmar: [21.916221, 95.955974],
        Nepal: [28.394857, 84.124008],
        Oman: [21.512583, 55.923255],
        Pakistan: [30.375321, 69.345116],
        Palestine: [31.952162, 35.233154],
        Philippines: [12.879721, 121.774017],
        Qatar: [25.354826, 51.183884],
        SaudiArabia: [23.885942, 45.079162],
        Singapore: [1.352083, 103.819836],
        South_Korea: [35.907757, 127.766922],
        Sri_Lanka: [7.873054, 80.771797],
        Syria: [34.802075, 38.996815],
        Taiwan: [23.69781, 120.960515],
        Tajikistan: [38.861034, 71.276093],
        Thailand: [15.870032, 100.992541],
        Timor_Leste: [-8.874217, 125.727539],
        Turkey: [38.963745, 35.243322],
        Turkmenistan: [38.969719, 59.556278],
        United_Arab_Emirates: [23.424076, 53.847818],
        Uzbekistan: [41.377491, 64.585262],
        Vietnam: [14.058324, 108.277199],
        Yemen: [15.552727, 48.516388],
        // Add other country coordinates...
      };
  
      axios.get('http://127.0.0.1:8000/api/artist/get/')
        .then(response => {
          const artistData = response.data;
  
          const artistCountByCountry = {}; // Object to store artist count by country
  
          // Count artists for each country
          artistData.forEach(artist => {
            const country = artist.country;
            artistCountByCountry[country] = (artistCountByCountry[country] || 0) + 1;
          });
  
          const heatmapData = Object.keys(artistCountByCountry).map(country => {
            const coordinates = countryCoordinates[country];
            const artistCount = artistCountByCountry[country];
            return coordinates ? [coordinates[0], coordinates[1], artistCount > 1 ? 'multiple' : 'single'] : null; // Include artist count in popup
          }).filter(Boolean);
  
          const singleArtistHeatmapData = heatmapData.filter(data => data[2] === 'single').map(data => [data[0], data[1]]);
          const multipleArtistsHeatmapData = heatmapData.filter(data => data[2] === 'multiple').map(data => [data[0], data[1]]);
  
          // Single artist heat layer
          L.heatLayer(singleArtistHeatmapData, {
            radius: 20,
            gradient: { 0.4: 'rgba(0, 255, 0, 0.8)', 0.65: 'lime', 1: 'blue' }
          }).addTo(map);
  
          // Multiple artists heat layer
          L.heatLayer(multipleArtistsHeatmapData, {
            radius: 20,
            gradient: { 0.4: 'rgba(255, 0, 0, 0.8)', 0.65: 'orange', 1: 'yellow' }
          }).addTo(map);
  
          // Create markers and popups
          Object.keys(artistCountByCountry).forEach(country => {
            const coordinates = countryCoordinates[country];
            const artistCount = artistCountByCountry[country];
            if (coordinates) {
              const marker = L.marker(coordinates);
              const popupContent = `<div style="background-color: white; padding: 10px; border-radius: 5px; box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);">
                                      <strong>${country}</strong><br>
                                      ${artistCount} artist${artistCount > 1 ? 's' : ''}
                                    </div>`;
              marker.bindPopup(popupContent).addTo(map);
            }
          });
        })
        .catch(error => {
          console.error('Error fetching artist data:', error);
        });
  
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
        maxZoom: 18,
      }).addTo(map);
    },
  };
  </script>
  
  <style scoped>
  /* Add custom styles here if needed */
  </style>
   -->
  <!-- last code  -->
  <template>
    <div id="map" style="height: 400px;"></div>
  </template>
  
  <script>
  import L from 'leaflet';
  import 'leaflet/dist/leaflet.css';
  import 'leaflet.heat/dist/leaflet-heat.js';
  import axios from 'axios';
  
  export default {
    mounted() {
      const map = L.map('map').setView([20, 100], 3);
  
      axios.get('http://127.0.0.1:8000/api/artist/get/')
        .then(response => {
          const artistData = response.data;
  
          const artistCountByCountry = {}; // Object to store artist count by country
  
          // Count artists for each country
          artistData.forEach(artist => {
            const country = artist.country;
            artistCountByCountry[country] = (artistCountByCountry[country] || 0) + 1;
          });
  
          // Fetch coordinates for each country using a geocoding service
          Object.keys(artistCountByCountry).forEach(country => {
            axios.get(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(country)}&format=json`)
              .then(geoResponse => {
                if (geoResponse.data.length > 0) {
                  const coordinates = [parseFloat(geoResponse.data[0].lat), parseFloat(geoResponse.data[0].lon)];
                  const artistCount = artistCountByCountry[country];
                  if (coordinates) {
                    const marker = L.marker(coordinates);
                    const popupContent = `<div style="background-color: white; padding: 10px; border-radius: 5px; box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);">
                                            <strong>${country}</strong><br>
                                            ${artistCount} artist${artistCount > 1 ? 's' : ''}
                                          </div>`;
                    marker.bindPopup(popupContent).addTo(map);
                  }
                }
              })
              .catch(error => {
                console.error(`Error fetching coordinates for ${country}:`, error);
              });
          });
        })
        .catch(error => {
          console.error('Error fetching artist data:', error);
        });
  
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
        maxZoom: 18,
      }).addTo(map);
    },
  };
  </script>
  
  <style scoped>
  /* Add custom styles here if needed */
  </style>
  