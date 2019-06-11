window.onload = function() {

  const el = document.getElementById('map');

  google.charts.load('current', {
    'packages': ['geochart'],
    'mapsApiKey': 'AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY'
  });

  google.charts.setOnLoadCallback(function() {
    const data = google.visualization.arrayToDataTable([
      ['State', 'Population'],
    ['Uttar Pradesh', 199581477],
    ['Maharashtra', 112372972],
    ['Bihar', 103804637],
    ['West Bengal', 91347736],
    ['Madhya Pradesh', 72597565],
    ['Tamil Nadu', 72138958],
    ['Rajasthan', 68621012],
    ['Karnataka', 61130704],
    ['Gujarat', 60383628],
    ['Andhra Pradesh', 49386799],
    ['Odisha', 41947358],
    ['Telangana', 35286757],
    ['Kerala', 33387677],
    ['Jharkhand', 32966238],
    ['Assam', 31169272],
    ['Punjab', 27704236],
    ['Chhattisgarh', 25540196],
    ['Haryana', 25353081],
    ['Jammu and Kashmir', 12548926],
    ['Uttarakhand', 10116752],
    ['Himachal Pradesh', 6856509],
    ['Tripura', 3671032],
    ['Meghalaya', 2964007],
    ['Manipur', 2721756],
    ['Nagaland', 1980602],
    ['Goa', 1457723],
    ['Arunachal Pradesh', 1382611],
    ['Mizoram', 1091014],
    ['Sikkim', 607688],
    ['Delhi', 16753235],
    ['Puducherry', 1244464],
    ['Chandigarh', 1054686],
    ['Andaman and Nicobar Islands', 379944],
    ['Dadra and Nagar Haveli', 342853],
    ['Daman and Diu', 242911],
    ['Lakshadweep', 64429]
    ]);

    const opts = {
      backgroundColor: '#ecf0f1',
      region: 'IN',
      displayMode: 'regions',
      resolution: 'provinces'

    };

    const chart = new google.visualization.GeoChart(el);
    chart.draw(data, opts);
  });

}
