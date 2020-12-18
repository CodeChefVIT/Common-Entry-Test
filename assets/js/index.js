chupaHuaAnda();

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
        var xh = new XMLHttpRequest();
        xh.open("POST", "https://cet-prereg.codechefvit.com/api/studentForm/add", true)
        xh.setRequestHeader('Content-Type', 'application/json')
        xh.send(JSON.stringify(data))
        xh.onload = function () {
            if (this.status == 201) {
                M.toast({ html: 'You have been successfully registered 🎉' });
                document.getElementById("regBtn").disabled = false;
            } else if (this.status == 400) {
                M.toast({ html: 'Seems like you didn\'t enter something 😔' });
                document.getElementById("regBtn").disabled = false;
            } else if (this.status == 401 || this.status == 409) {
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

// Anda Dhoond
function chupaHuaAnda() {
    "use strict";
    var key = [67, 79, 79, 75, 79, 70, 70, 68, 69, 86, 83, 79, 67];
    var ck = 0;
    var max = key.length;
    var chupaHuaAnda = function () {
        var shock = document.createElement('div');
        var img = new Image;
        img.src = data;
        img.style.pointerEvents = "none";
        img.style.width = '300px';
        img.style.height = '300px';
        img.style.transition = '1s all';
        img.style.position = 'fixed';
        img.style.left = 'calc(50% - 150px)';
        img.style.bottom = 'calc(50% - 150px)';
        img.style.zIndex = 999999;
        var audio = new Audio('assets/music/scam-1992-theme.mp3');
        audio.play();
        document.body.appendChild(img);
        var xh = new XMLHttpRequest();
        xh.open(
            "GET",
            "https://cet-prereg.codechefvit.com/api/easterEgg/generateOTP",
            true
        );
        xh.setRequestHeader("Content-Type", "application/json");
        xh.send();
        xh.onload = function () {
            if (this.status == 200 || this.status == 201) {
                var andaData = JSON.parse(this.responseText);
                var andeKaFunda = andaData.otp;
                $('#chupaHuaAndaModal').modal('open');
                $("#regBtnSpec").click(function () {
                    document.getElementById("regBtnSpec").disabled = true;
                    var email = document.getElementById("emailSpec").value;
                    var registrationNumber = document.getElementById("registrationNumberSpec").value;
                    var name = document.getElementById("nameSpec").value;
                    var phoneNumber = document.getElementById("phoneNumberSpec").value;
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
                            otp: andeKaFunda,
                            // captcha: { token }
                        }
                        var xh = new XMLHttpRequest();
                        xh.open("POST", "https://cet-prereg.codechefvit.com/api/easterEgg/form", true)
                        xh.setRequestHeader('Content-Type', 'application/json')
                        xh.send(JSON.stringify(data))
                        xh.onload = function () {
                            if (this.status == 201) {

                                M.toast({ html: 'You have been successfully moved ahead 🎉' });
                                document.getElementById("regBtnSpec").disabled = false;
                                $('#chupaHuaAndaModal').modal('close');
                            } else if (this.status == 400) {
                                M.toast({ html: 'Seems like you didn\'t enter something 😔' });
                                document.getElementById("regBtnSpec").disabled = false;
                            } else if (this.status == 401 || this.status == 409) {
                                M.toast({ html: 'Looks like you have already moved ahead ✨' });
                                document.getElementById("regBtnSpec").disabled = false;
                            } else {
                                M.toast({ html: 'Oops something seems to be wrong. Our team is finding out what went wrong 😢' });
                                document.getElementById("regBtnSpec").disabled = false;
                            }
                        }
                        //     });
                        // });
                    }
                    else {
                        M.toast({ html: 'Seems like you didn\'t enter something 😔' });
                    }
                });
            } else {
                M.toast({ html: 'Oops something seems to be wrong. Our team is finding out what went wrong 😢' });
            }
        }
        window.setTimeout(function () {
            img.style.bottom = '-300px';
        }, 3000);
        window.setTimeout(function () {
            img.parentNode.removeChild(img);
        }, 3500);
    };
    var record = function (e) {
        if (e.which === key[ck]) {
            ck++;
        } else {
            ck = 0;
        }
        if (ck >= max) {
            chupaHuaAnda();
            ck = 0;
        }
    };
    var init = function (data) {
        document.addEventListener('keyup', record);
    };
    var data = 'assets/img/studChef.gif';
    init(data);
}

console.clear();