const socket = io.connect('http://localhost:8080');
let status = document.getElementById('status').innerHTML;
socket.on('final', function(data) {
  status = 'Rendering Map!';
  let dataTable = []; // 2D Array
  let col = ['State', 'Score'];

  dataTable.push(col);
  for (let i = 0; i < data.length; i++) {
    // Check if location is valid or not
    if (data[i].parsed) {
      let row = [data[i].location ,data[i].score];
      dataTable.push(row);
    }

    DrawMap(dataTable);
  }
});

function DrawMap(dataTable) {
  const el = document.getElementById('map');

  google.charts.load('current', {
    'packages': ['geochart'],
    'mapsApiKey': 'AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY'
  });

  google.charts.setOnLoadCallback(function() {
    const data = google.visualization.arrayToDataTable(dataTable);

    const opts = {
      backgroundColor: '#ecf0f1',
      colorAxis: {
         colors: ['red', 'green']
      },
      region: 'US',
      displayMode: 'regions',
      resolution: 'provinces',

    };

    const chart = new google.visualization.GeoChart(el);
    chart.draw(data, opts);
  });
}
