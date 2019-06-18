const host = window.location.host;
console.log(host);
const socket = io.connect(host);
let fire = 0; // Checks if 'final' event has been fired
function HandleEmptyRequest(target, time) {
  // Checks if the 'final' event fires after 
  // a 30 seconds. If the event doesn't fire
  // means that an empty request has been 
  // recieved by the server and so the user is
  // redirected back to home

  setTimeout(function() {
    if(!fire) {
      swal({
        title: 'Connection Timeout!',
        text: 'Please try searching for the query again!',
        type: 'error',

      })
      $('.swal2-confirm').click(function(){
        window.location.href = '/';
      });
      
    }
  }, time * 1000);
}

// Check for empty request after 30s 
HandleEmptyRequest('final', 30);

socket.on('final', function(data) {
  fire = 1;
  document.getElementById('status').innerHTML = 'Back to home';
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
      region: 'US',
      displayMode: 'regions',
      resolution: 'provinces',

    };

    const chart = new google.visualization.GeoChart(el);
    chart.draw(data, opts);
  });
}
