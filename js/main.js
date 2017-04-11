var config = {
    apiKey: "AIzaSyCw4KPnhchrsak4qJIItKxlkjrUPJoqbJM",
    authDomain: "reservation-site-7f930.firebaseapp.com",
    databaseURL: "https://reservation-site-7f930.firebaseio.com",
    projectId: "reservation-site-7f930",
    storageBucket: "reservation-site-7f930.appspot.com",
    messagingSenderId: "928916165268"
  };
  firebase.initializeApp(config);
var database = firebase.database();
var reservationData = {};

$('#datePicker').on('change', function() {
	console.log($(this).val() + ' text ' + $(this).text())
  reservationData.day = $(this).val();
});

$('.reservation-form').on('submit', function(event) {
  event.preventDefault();
  reservationData.name = $('.reservation-name').val();
  var reservationsReference = database.ref('reservations');
  reservationsReference.push(reservationData);
});

function getReservations() {
  database.ref('reservations').on('value', function(results) {
      var allReservations = results.val();
      $('.reservation tbody').empty();
	
    for (reservation in allReservations) {
      var context = {
        name: allReservations[reservation].name,
        day: allReservations[reservation].day,
        reservationId: reservation
      };
      var source = $("#reservation-template").html();
      var template = Handlebars.compile(source);
      var reservationListItem = template(context);
      $('tbody').append(reservationListItem);
    }
  });
}
getReservations();

function initMap() {
    var location = {
      lat: 40.8054491,
      lng: -73.9654415
    };

    var map = new google.maps.Map(document.getElementById('map'), {
      center: location,
      zoom: 10,
      scrollwheel: false
    });
    
    var marker = new google.maps.Marker({
    position: location,
    map: map,
    title: 'User Location'
  	});
  };

initMap();