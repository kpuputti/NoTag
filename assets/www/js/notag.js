/*jslint white: true, devel: true, onevar: false, undef: true, nomen: true,
  regexp: true, plusplus: true, bitwise: true, newcap: true, maxerr: 50,
  indent: 4 */
/*global $: false, navigator: false, Camera: false, google: false, window: false */

var notag = {};

// CAMERA

notag.camera = {};

notag.camera.takePhotoSuccess = function (imageURI) {
    var takeTime = new Date();
    var image = $('<img/>', {
        src: imageURI,
        width: 160,
        height: 120
    });
    $('#image-list').fadeOut(function () {
        var wrapper = $('<li></li>');
        var taken = $('<span></span>').addClass('image-date').text(takeTime.toString());
        wrapper.append(taken);
        wrapper.append(image);
        $(this).append(wrapper).fadeIn();
    });
};

notag.camera.takePhotoFailure = function () {
    navigator.notification.alert('Canceled taking a photo.');
};

notag.camera.takePhoto = function () {
    var options = {
        quality: 50,
        destinationType: Camera.DestinationType.FILE_URI
    };
    var camera = notag.camera;
    navigator.camera.getPicture(camera.takePhotoSuccess,
                                camera.takePhotoFailure,
                                options);
};

// MAP

notag.map = (function () {

    var mapContainer;
    var map;
    var mapOptions = {
        zoom: 6,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var geolocationOptions = {

    };

    var geolocationSuccess = function (position) {
        var latlng = new google.maps.LatLng(position.coords.latitude,
                                            position.coords.longitude);
        map.panTo(latlng);
        map.setZoom(14);

        var info = new google.maps.InfoWindow({
            content: 'You are somewhere around here!',
            position: latlng
        });
        info.open(map);
    };

    var geolocationFailure = function (error) {
        navigator.notification.alert('Could not get location.\n\n' +
                                     'Code: ' + error.code +
                                     '\nMessage: ' + error.message);
    };

    return {
        init: function () {
            var mapContainer = $('#map');

            // Set map container dimensions.
            mapContainer.height($(window).height());

            map = new google.maps.Map(mapContainer.get(0), mapOptions);
            map.setCenter(new google.maps.LatLng(60.1546962, 24.8867248));

            navigator.geolocation.getCurrentPosition(geolocationSuccess,
                                                     geolocationFailure,
                                                     geolocationOptions);
        }
    };
}());

// TEST

notag.test = {};

notag.test.beep = function (times) {
    navigator.notification.beep(times);
};

notag.test.vibrate = function (duration) {
    navigator.notification.vibrate(duration);
};

notag.test.alert = function (message) {
    navigator.notification.alert(message,
                                 function () {},
                                 'Custom alert title',
                                 "M'kay");
};

notag.test.confirm = function (message) {
    navigator.notification.confirm(message,
                                   function () {},
                                   'Custom confirm title',
                                   "M'kay,No way!");
};

notag.test.compass = function () {
    navigator.compass.getCurrentHeading(function (heading) {
        navigator.notification.alert('Current compass heading: ' + heading);
    }, function () {
        navigator.notification.alert('Could not get compass heading.');
    });
};

notag.test.location = function () {
    navigator.geolocation.getCurrentPosition(function (position) {
        navigator.notification.alert('Coordinates: ' +
                                     position.coords.latitude + ', ' +
                                     position.coords.longitude);
    }, function (error) {
        navigator.notification.alert('Could not get position\n\n' +
                                     'Code: ' + error.code +
                                     '\nMessage: ' + error.message);
    });
};

// GENERAL

notag.addEvents = function () {
    $('#take-photo').click(notag.camera.takePhoto);
    $('#page-map').live('pagecreate', notag.map.init);
    $('#test-beep').click(function () {
        notag.test.beep(2);
    });
    $('#test-vibrate').click(function () {
        notag.test.vibrate(500);
    });
    $('#test-alert').click(function () {
        notag.test.alert('This is an alert dialog.');
    });
    $('#test-confirm').click(function () {
        notag.test.confirm('This is a confirm dialog.');
    });
    $('#test-compass').click(notag.test.compass);
    $('#test-location').click(notag.test.location);
};

notag.init = function () {
    notag.addEvents();
};
