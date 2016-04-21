$(function() {
    var images = [];

    NProgress.start();
    var w = window.innerWidth;
    var h = window.innerHeight;

    crop_align = "center center";
    var overlayWidth = 1000;
    var image_max_height = 0.6 * h;
    getFlickr(setupScrolling);
    rsn.uniformHeight(0.6 * h);
    // loadImages().done(setupScrolling);
    // setupScrolling();

    $(".spinner").hide();

    $.ajax({
        url: "/illustration",
        success: function(data) {
            $(data).find("a:contains(.png)").each(function(i) {
                // will loop through 
                var images = $(this).attr("href");
                var id = "";
                if (i==0){
                  id = "illustrationAnchor"
                }
                // 
                var HTML = '<li id="'+id+'"><a> <img src="'+ images + '" data-dimensions="640x960"></a></li>'
                $(".images").append(HTML)
                $(window).trigger('resize');
            });
        }
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
            return false;
        });

        // listen for .images loading, update loading bar
        $('.images').imagesLoaded()
            .always(function() {
                NProgress.done();
            });
    }

    function getFlickr(callback) {
        $.get("https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=5ea239335e1d705835061e7147f53dad&user_id=125879274%40N02&sort=interestingness-desc&extras=url_l&per_page=20&format=json&nojsoncallback=1", function(data) {
            //https://farm{farm-id}.staticflickr.com/{server-id}/{id}_{secret}_[mstzb].jpg
            var photos = data.photos.photo;
            for (var i = 0; i < data.photos.photo.length; i++) {
                var url = photos[i].url_l;
                var title = photos[i].title;

                if (i == 0) {
                    a = '<li id="photoAnchor"><a title="' + title + '"">'
                } else {
                    a = '<li><a title="' + title + '"">'
                }
                img = '<img src="' + url + '" data-dimensions="640x960"></a></li>'
                $(".images").append(a + img);
            }
            $(window).trigger('resize');

        }).fail(function() {
            console.log("fail");
        }).done(callback);
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
});
