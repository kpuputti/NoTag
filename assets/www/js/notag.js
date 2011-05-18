/*jslint white: true, devel: true, onevar: false, undef: true, nomen: true,
  regexp: true, plusplus: true, bitwise: true, newcap: true, maxerr: 50,
  indent: 4 */
/*global $: false, navigator: false, Camera: false */

var notag = {};

notag.takePhotoSuccess = function (imageURI) {
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

notag.takePhotoFailure = function () {
    alert('Could not take photo.');
};

notag.takePhoto = function () {
    var options = {
        quality: 50,
        destinationType: Camera.DestinationType.FILE_URI
    };
    navigator.camera.getPicture(notag.takePhotoSuccess,
                                notag.takePhotoFailure,
                                options);
};

notag.addEvents = function () {
    $('#take-photo').click(notag.takePhoto);
};

notag.init = function () {
    notag.addEvents();
};
