
(function ($) {
    "use strict";

    // Loader
    $(function () {
        var loader = function () {
            setTimeout(function () {
                if ($('#loader').length > 0) {
                    $('#loader').removeClass('show');
                }
            }, 1);
        };
        loader();
    });

    // Auto Init 
    M.AutoInit();

    // Carousel
    var elems = document.querySelectorAll('.carousel');
    var options = {
        fullWidth: true,
        indicators: false
    };
    var instances = M.Carousel.init(elems, options);
    setInterval(function () {
        $('.carousel').carousel('next');
    }, 5000);

})(jQuery);

// tawk.to
var Tawk_API = Tawk_API || {}, Tawk_LoadStart = new Date();
(function () {
    var s1 = document.createElement("script"), s0 = document.getElementsByTagName("script")[0];
    s1.async = true;
    s1.src = 'https://embed.tawk.to/5fd2f14cdf060f156a8bf264/default';
    s1.charset = 'UTF-8';
    s1.setAttribute('crossorigin', '*');
    s0.parentNode.insertBefore(s1, s0);
})();

console.clear();