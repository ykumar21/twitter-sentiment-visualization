window.onload = function() {

  const el = document.getElementById('map');

  google.charts.load('current', {
    'packages': ['geochart'],
    'mapsApiKey': 'AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY'
  });

  google.charts.setOnLoadCallback(function() {
    const data = google.visualization.arrayToDataTable([
      ['Country', 'Weighted Score'],
      ['India', 1], ['Germany', 0.8],
      ['China', 0.4], ['Australia', 0.5]
    ]);

    const opts = {
      backgroundColor: '#ecf0f1',

    };

    const chart = new google.visualization.GeoChart(el);
    chart.draw(data, opts);
  });

}
