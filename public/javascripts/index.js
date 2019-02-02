function initMap() {
  const domElement = document.getElementById("map");

  if (!domElement) { return; }

  window.map = new Map(domElement);
  window.map.init();
  window.map.route();

}
