
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
// var Tawk_API = Tawk_API || {}, Tawk_LoadStart = new Date();
// (function () {
//     var s1 = document.createElement("script"), s0 = document.getElementsByTagName("script")[0];
//     s1.async = true;
//     s1.src = 'https://embed.tawk.to/5fd2f14cdf060f156a8bf264/default';
//     s1.charset = 'UTF-8';
//     s1.setAttribute('crossorigin', '*');
//     s0.parentNode.insertBefore(s1, s0);
// })();

// Pre Register
document.getElementById('preRegForm').addEventListener('submit', (e) => {
    e.preventDefault();
    preReg();
});

function preReg() {
    document.getElementById("regBtn").disabled = true;
    var email = document.getElementById("email").value;
    var registrationNumber = document.getElementById("registrationNumber").value;
    var name = document.getElementById("name").value;
    var phoneNumber = document.getElementById("phoneNumber").value;
    if (name != "" && registrationNumber != "" && email != "" && phoneNumber != "") {
        // grecaptcha.ready(() => {
        //     grecaptcha.execute('6LemmQMaAAAAAJEXiW2zQ1Dk06GKeU-0YbYc56oR', {
        //         action: '/'
        //     }).then((token) => {
        var data = {
            email,
            registrationNumber,
            name,
            phoneNumber,
            // captcha: { token }
        }
        console.log(data)
        var xh = new XMLHttpRequest();
        xh.open("POST", "https://cet-dev-api.herokuapp.com/api/studentForm/add", true)
        xh.setRequestHeader('Content-Type', 'application/json')
        xh.send(JSON.stringify(data))
        xh.onload = function () {
            if (this.status == 201) {
                M.toast({ html: 'You have been successfully registered 🎉' });
                document.getElementById("regBtn").disabled = false;
            } else if (this.status == 400) {
                M.toast({ html: 'Seems like you didn\'t enter something 😔' });
                document.getElementById("regBtn").disabled = false;
            } else if (this.status == 401) {
                M.toast({ html: 'Looks like you are already registered with us ✨' });
                document.getElementById("regBtn").disabled = false;
            } else {
                M.toast({ html: 'Oops something seems to be wrong. Our team is finding out what went wrong 😢' });
                document.getElementById("regBtn").disabled = false;
            }
        }
        //     });
        // });
    }
    else {
        M.toast({ html: 'Seems like you didn\'t enter something 😔' });
    }
}

console.clear();