// Initialize and add the map
let map;
let marker;
let dataContainer = document.getElementById('active-mission-data-container');
let missionLocation = JSON.parse(dataContainer.getAttribute('data-locations'));

  function initMap() {
    // Assuming an initial center point for the map
    const mapCenter = new google.maps.LatLng(45.41, -75.69); // You can adjust this as needed
    
    // Initialize the map
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 5, // Adjust zoom level as needed
      center: mapCenter,
      mapTypeId: "terrain",
    });
    
    // Loop through the locations array and place a marker for each mission location
    missionLocation.forEach(location => {
      const latLng = new google.maps.LatLng(location.location.lat, location.location.lng);
      new google.maps.Marker({
        position: latLng,
        map: map,
        title: location.missionId, // Optionally, use the missionId as the marker's title
      });
    });
  }
  
  // Make sure to assign the initMap function to the window object if it needs to be called from an external script
  window.initMap = initMap;