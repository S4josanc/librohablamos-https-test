/*-------------------------------------------------------------------------------------------*
 *                                       CUSTOM JAVASCRIPT                                   *
 *-------------------------------------------------------------------------------------------*/

/* DOWNLOAD ATRIBUTTE MODERNIZR
 =================================================================== */
// Variables
var downloadText = "En aquellos navegadores donde no se descargue el fichero, pulse botón derecho y selecciona<span style='font-style:italic'> Descargar archivo enlazado </span> o " +
    "mantén pulsado el botón<span style='font-style:italic'> Descargar </span> y selecciona<span style='font-style:italic'> Guardar enlace </span> en dispositivos móviles.";

if (!Modernizr.adownload) {

    var mobile = true;
    var $link = $('.warning-button');
    var messageHtml = $('.download-warning').html("<div class='alert alert-error alert-dismissible download-instruction text-justify' role='alert'>" +
        "<button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button>" +
        "<p class='download-instruction-title'><strong> ¡RECUERDE! </strong></p>"+ "<span class='download-instruction-message'>" + downloadText + "</span></div>");

    $link.each(function() {
        var $download = $(this).attr('download');
        var isMobile = window.matchMedia("only screen and (max-width: 760px)");

        if ((typeof $download !== typeof undefined && $download !== false)) {

            mobile = false;
            messageHtml;
         }

        if (isMobile.matches && mobile) {
            messageHtml;
        }

    });
}

/* WORDS COUNTER
 =================================================================== */
$("#subject").countable({
    threshold: .65,
    startOpacity: .40,
    positiveCopy: "Carácteres restantes: {n}."
});
$("#message").countable({
    threshold: .70,
    startOpacity: .40,
    positiveCopy: "Carácteres restantes: {n}."
});

/* CONTACT FORM
 =================================================================== */

$(document).ready(function() {

    var contactButton = $("#contact-button");
    var email2 = $(".email2");

    contactButton.attr('disabled', 'disabled');
    email2.hide()

    $("#contact-form").keyup(function () {
        // Disable Submit Button
        contactButton.attr('disabled', 'disabled');
        // Validating Fields
        var name = $("#name").val();
        var email = $("#email").val();
        var subject = $("#subject").val();
        var message = $("#message").val();
        var filter = /^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-z0-9]{2,4}$/;
        if (!(name == "" || email == "" || subject == "" || message == "")) {
            if (filter.test(email)) {
                // Enable Submit Button
                contactButton.removeAttr('disabled');
                contactButton.addClass("validateButton");
                contactButton.removeClass("clickButton");
            }
        }
    });

    $(function() {
        // Validate the contact form
        $('#contact-form').validate({

            // Add requirements to each of the fields
            rules: {
                name: {
                    required: true
                },
                email: {
                    required: true,
                    email: true
                },
                subject: {
                    required: true,
                    minlength: 5,
                    maxlength: 100
                },
                message: {
                    required: true,
                    minlength: 10,
                    maxlength: 1000
                }
            },

            // Specify what error messages to display
            // when the user does something horrid
            messages: {
                name: {
                    required: "Por favor, introduzca su nombre."
                },
                email: {
                    required: "Por favor, introduzca su email.",
                    email: "Por favor, introduzca un email válido."
                },
                subject: {
                    required: "Por favor, introduzca un asunto.",
                    minlength: jQuery.format("Por favor, introduzca al menos 5 caracteres."),
                    maxlength: jQuery.format("Por favor, introduzca menos de 100 caracteres.")
                },
                message: {
                    required: "Por favor, introduzca su mensaje.",
                    minlength: jQuery.format("Por favor, introduzca al menos 10 caracteres."),
                    maxlength: jQuery.format("Por favor, introduzca menos de 1000 caracteres.")
                }
            },

            // Use Ajax to send everything to processForm.php
            submitHandler: function(form) {
                $("#contact-button").attr("value", "Enviando...");
                $(form).ajaxSubmit({
                    success: function(responseText, statusText, xhr, $form) {
                        $(form).slideUp("slow");
                        $('.container-contact > div').removeClass("contact-style");
                        $("#response").html(responseText).hide().slideDown("slow");
                    }
                });
                return false;
            }
        });
    });
});

/* OPAQUE NAVBAR
 =================================================================== */
// Toggle tranparent navbar when the user scrolls the page
$(window).scroll(function() {

    // Mobile devices
    if($(window).width() < 768) {
        if ($(this).scrollTop() > 60) { // Height in pixels when the navbar becomes non opaque
            $('.opaque-navbar').addClass('opaque');
        } else {
            $('.opaque-navbar').removeClass('opaque');
        }
    } else {
        if ($(this).scrollTop() > 100) { // Height in pixels when the navbar becomes non opaque
            $('.opaque-navbar').addClass('opaque');
            $('.navbar').addClass('height-navbar');
            $('.navbar-nav > li > a').addClass('text-navbar');
        } else {
            $('.opaque-navbar').removeClass('opaque');
            $('.navbar').removeClass('height-navbar');
            $('.navbar-nav > li > a').removeClass('text-navbar');
        }
    }
});

/* CLOSE NAVBAR-COLLAPSE WHEN CLICK IN A LINK
 =================================================================== */
$('.navbar-collapse').click('li', function() {
    $('.navbar-collapse').collapse('hide');
});
$('.navbar-toggle').addClass('collapsed');

/* SCROLL
 =================================================================== */
// Scroll function
function scrollToID(id, speed){
    var offSet = 50;
    var targetOffset = $(id).offset().top - offSet;
    var mainNav = $('#navigationMain');
    $('html,body').animate({scrollTop:targetOffset}, speed);
    if (mainNav.hasClass("open")) {
        mainNav.css("height", "1px").removeClass("in").addClass("collapse");
        mainNav.removeClass("open");
    }
}

// Scroll Top to bottom and Back to Top
$(document).ready(function() {
    // Navigation click actions
    $('.scroll-link').on('click', function(event){
        event.preventDefault();
        var sectionID = $(this).attr("data-id");
        scrollToID('#' + sectionID, 600);
    });
    // Scroll to top action
    $('.scroll-top').on('click', function(event) {
        event.preventDefault();
        $('html, body').animate({
            scrollTop:0
        }, 600);
    });
    // Mobile nav toggle
    $('#nav-toggle').on('click', function (event) {
        event.preventDefault();
        $('#main-nav').toggleClass("open");
    });
    //});

    /* BACK TO TOP BUTTON
     =================================================================== */
    // Browser window scroll (in pixels) after which the "back to top" link is shown
    var offset = 300;
    // Browser window scroll (in pixels) after which the "back to top" link opacity is reduced
    var offset_opacity = 1500;
    // Duration of the top scrolling animation (in ms)
    var scroll_top_duration = 700;

    // Grab the "back to top" link
    $back_to_top = $('.back-to-top');

    // Hide or show the "back to top" link
    $(window).scroll(function(){
        ( $(this).scrollTop() > offset ) ? $back_to_top.addClass('cd-is-visible') : $back_to_top.removeClass('cd-is-visible cd-fade-out');
        if( $(this).scrollTop() > offset_opacity ) {
            $back_to_top.addClass('cd-fade-out');
        }
    });

    // Smooth scroll to top
    $back_to_top.on('click', function(event){
        event.preventDefault();
        $('body,html').animate({
                scrollTop: 0
            }, scroll_top_duration
        );
    });
});
