window.onload = function() {

  const el = document.getElementById('map');

  google.charts.load('current', {
    'packages': ['geochart'],
    'mapsApiKey': 'AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY'
  });

  google.charts.setOnLoadCallback(function() {
    const data = google.visualization.arrayToDataTable([
      ['State', 'Population'],
      ['TX', 100], ['New Jersey', 150], ['CA', 100]
    ]);

    const opts = {
      backgroundColor: '#ecf0f1',
      region: 'US',
      displayMode: 'regions',
      resolution: 'provinces'

    };

    const chart = new google.visualization.GeoChart(el);
    chart.draw(data, opts);
  });

}
