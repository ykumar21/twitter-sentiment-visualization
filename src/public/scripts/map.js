const host = window.location.host;
const socket = io.connect(host);
let clicks = 0;
let changeView = document.getElementById('switch');

changeView.addEventListener("click", function() {
  clicks++;
  if (clicks % 2 != 0) {
    changeView.innerHTML = 'Change to Local';
    $('#map').hide();
    $('#map2').show();  
  } else {
    changeView.innerHTML = 'Change to Global';
    $('#map').show();
    $('#map2').hide();   
  }
  
});
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
  console.log(data);
  fire = 1;
  renderGlobal(data);
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
  }

  DrawMap(dataTable, 'local');
});

function DrawMap(dataTable, mapView) {
  console.log(mapView);
  let el;
  
  if(mapView == 'local') {
    el = document.getElementById('map');
  } else {
    el = document.getElementById('map2');
  }

  google.charts.load('current', {
    'packages': ['geochart'],
    'mapsApiKey': 'AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY'
  });

  google.charts.setOnLoadCallback(function() {
    const data = google.visualization.arrayToDataTable(dataTable);
    let opts = new Object;

    if (mapView == 'local') {
      opts = {
        backgroundColor: '#ecf0f1',
        region: 'US',
        displayMode: 'regions',
        resolution: 'provinces',
        legend: {position: 'none'}
  
      }
    } else {
      opts = {
        backgroundColor: '#ecf0f1',
        legend: {position: 'none'}
      }
    }

    const chart = new google.visualization.GeoChart(el);
    chart.draw(data, opts);
  });
}

function renderGlobal(data) {
  let dataTable = []; // 2D Array
  let col = ['State', 'Score'];

  dataTable.push(col);

  for (let i = 0; i < data.length; i++) { 
    // Check if location is valid or not
    if (data[i].parsed) {
      if(data[i].local) {
        let row = ['United States' ,data[i].score];
        dataTable.push(row);
      } else {
        let row = [data[i].location ,data[i].score];
        dataTable.push(row);
      }
     
    }

    DrawMap(dataTable, 'global');
  }
}
