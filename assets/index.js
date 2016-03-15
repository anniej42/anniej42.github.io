var images = [];

$(document).ready(function() {
    $(".images").dimmer("show");
    var w = window.innerWidth;
    var h = window.innerHeight;

    crop_align = "center center";
    var overlayWidth = 1000;
    var image_max_height = 0.6 * h;
    getImages(setupScrolling);
    rsn.uniformHeight(0.6 * h);
    // loadImages().done(setupScrolling);
    // setupScrolling();

    $(window).load(function() {
        console.log("loaded")
        // All descendant images have loaded, now slide up.
        $(".images").dimmer("hide");
        $(window).trigger('resize');
    });

});

function setupScrolling() {
    $('.navbar').on("click", "a", function() {
        $(".navbar").children().removeClass("selected");

        var $this = $(this),
            href = $this.attr("href"),
            left = $(href).offset().left;
        $this.parent().addClass("selected");

        TweenMax.to($(window), 2, {
                scrollTo: {
                    x: left - $("#leftmenu").width(),
                    autoKill: true
                },
                ease: Power3.easeOut
            })
            // .timeScale( 2000/dist);
        return false;
    });
}

function getImages(callback) {

    // var img = $("<img />").attr('src', 'welcome.png').attr('data-dimensions', "1200x960")
    //     .on('load', function() {
    //         $("#welcomeAnchor").append(img);
    //     });

    $.get("https://api.flickrcom/services/rest/?method=flickr.photos.search&api_key=5ea239335e1d705835061e7147f53dad&user_id=125879274%40N02&sort=interestingness-desc&extras=url_l&per_page=20&format=json&nojsoncallback=1", function(data) {
        var photos = data.photos.photo;
        for (var i = 0; i < data.photos.photo.length; i++) {
            var url = photos[i].url_l;
            var title = photos[i].title;
            if (i == 0) {
                a = '<li data-date="" id="photoAnchor"><a title="' + title + '"">'
            } else {
                a = '<li data-date=""><a title="' + title + '"">'
            }
            img = '<img src="' + url + '" data-dimensions="640x960"></a></li>'
            $(".images").append(a + img);
        }
    }).fail(function() {
        console.log("fail");
    }).done(function() {
        callback;
    });
}

(function(i, s, o, g, r, a, m) {
    i['GoogleAnalyticsObject'] = r;
    i[r] = i[r] || function() {
        (i[r].q = i[r].q || []).push(arguments)
    }, i[r].l = 1 * new Date();
    a = s.createElement(o),
        m = s.getElementsByTagName(o)[0];
    a.async = 1;
    a.src = g;
    m.parentNode.insertBefore(a, m)
})(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');

ga('create', 'UA-71093829-1', 'auto');
ga('send', 'pageview');

// function loadImages() {
//     var r = $.Deferred();
//     images = [{
//         "src": "https://farm2.staticflickr.com/1567/25191447315_4509312638_k.jpg",
//         "title": "dead sea"
//     }, {
//         "src": "https://farm2.staticflickr.com/1689/23714615834_a5d79c4340_k.jpg",
//         "title": "wuzhen, china"
//     }, {
//         "src": "https://farm1.staticflickr.com/529/19098424830_c0ebc289d1_k.jpg",
//         "title": "high places"
//     }, {
//         "src": "https://farm6.staticflickr.com/5752/20953841663_e7d81e2910_k.jpg",
//         "title": "Untitled"
//     }, {
//         "src": "https://farm1.staticflickr.com/628/20317163464_4b264b8157_k.jpg",
//         "title": "best wishes"
//     }, {
//         "src": "https://farm1.staticflickr.com/769/20191493704_94a77998db_k.jpg",
//         "title": "Iozan"
//     }, {
//         "src": "https://farm1.staticflickr.com/301/19452293675_ba8b67534b_k.jpg",
//         "title": "flares &amp; rumors"
//     }, {
//         "src": "https://c2.staticflickr.com/4/3910/18852975610_e284c7a707_k.jpg",
//         "title": "edges"
//     }, {
//         "src": "https://c1.staticflickr.com/1/501/18918258586_5aeb31ed88_k.jpg",
//         "title": "cataract falls"
//     }, {
//         "src": "https://farm1.staticflickr.com/381/17927851534_a384c5916b_h.jpg",
//         "title": " "
//     }, {
//         "src": "https://farm9.staticflickr.com/8806/18051237342_b741aad8b3_h.jpg",
//         "title": " "
//     }, {
//         "src": "https://farm8.staticflickr.com/7658/17061232527_9841427416_h.jpg",
//         "title": " "
//     }, {
//         "src": "https://farm8.staticflickr.com/7283/16328273153_5fd149ad4c_h.jpg",
//         "title": " "
//     }, {
//         "src": "https://farm9.staticflickr.com/8278/15650439077_37d1878ac0_b.jpg",
//         "title": " "
//     }, {
//         "src": "https://farm8.staticflickr.com/7624/16572895060_bf5caca158_b.jpg",
//         "title": " "
//     }, {
//         "src": "https://farm8.staticflickr.com/7421/16441361556_73b4b3244c_b.jpg",
//         "title": " "
//     }, ];

//     for (var i = 0; i < images.length; i++) {
//         if (i == 0) {
//             a = '<li data-date="" id="photoAnchor"><a title="' + images[i].title + '"">'
//         } else {
//             a = '<li data-date=""><a title="' + images[i].title + '"">'
//         }
//         img = '<img src="' + images[i].src + '" data-dimensions="640x960"></a></li>'
//         $(".images").append(a + img);
//     }

//     setTimeout(function() {
//         // and call `resolve` on the deferred object, once you're done
//         r.resolve();
//     }, 2000);

//     // return the deferred object
//     return r;
// }
