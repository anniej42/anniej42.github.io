(function(factory) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory;
    } else {
        factory(jQuery);
    }
}(function($) { // SET UP SCROLLING
    var toFix = ['wheel', 'mousewheel', 'DOMMouseScroll', 'MozMousePixelScroll'];
    var toBind = 'onwheel' in document || document.documentMode >= 9 ? ['wheel'] : ['mousewheel', 'DomMouseScroll', 'MozMousePixelScroll'];
    var lowestDelta, lowestDeltaXY;
    if ($.event.fixHooks) {
        for (var i = toFix.length; i;) {
            $.event.fixHooks[toFix[--i]] = $.event.mouseHooks;
        }
    }
    $.event.special.mousewheel = {
        setup: function() {
            if (this.addEventListener) {
                for (var i = toBind.length; i;) {
                    this.addEventListener(toBind[--i], handler, false);
                }
            } else {
                this.onmousewheel = handler;
            }
        },
        teardown: function() {
            if (this.removeEventListener) {
                for (var i = toBind.length; i;) {
                    this.removeEventListener(toBind[--i], handler, false);
                }
            } else {
                this.onmousewheel = null;
            }
        }
    };
    $.fn.extend({
        mousewheel: function(fn) {
            return fn ? this.bind("mousewheel", fn) : this.trigger("mousewheel");
        },
        unmousewheel: function(fn) {
            return this.unbind("mousewheel", fn);
        }
    });

    function handler(event) {
        var orgEvent = event || window.event,
            args = [].slice.call(arguments, 1),
            delta = 0,
            deltaX = 0,
            deltaY = 0,
            absDelta = 0,
            absDeltaXY = 0,
            fn;
        event = $.event.fix(orgEvent);
        event.type = "mousewheel";
        if (orgEvent.wheelDelta) {
            delta = orgEvent.wheelDelta;
        }
        if (orgEvent.detail) {
            delta = orgEvent.detail * -1;
        }
        if (orgEvent.deltaY) {
            deltaY = orgEvent.deltaY * -1;
            delta = deltaY;
        }
        if (orgEvent.deltaX) {
            deltaX = orgEvent.deltaX;
            delta = deltaX * -1;
        }
        if (orgEvent.wheelDeltaY !== undefined) {
            deltaY = orgEvent.wheelDeltaY;
        }
        if (orgEvent.wheelDeltaX !== undefined) {
            deltaX = orgEvent.wheelDeltaX * -1;
        }
        absDelta = Math.abs(delta);
        if (!lowestDelta || absDelta < lowestDelta) {
            lowestDelta = absDelta;
        }
        absDeltaXY = Math.max(Math.abs(deltaY), Math.abs(deltaX));
        if (!lowestDeltaXY || absDeltaXY < lowestDeltaXY) {
            lowestDeltaXY = absDeltaXY;
        }
        fn = delta > 0 ? 'floor' : 'ceil';
        delta = Math[fn](delta / lowestDelta);
        deltaX = Math[fn](deltaX / lowestDeltaXY);
        deltaY = Math[fn](deltaY / lowestDeltaXY);
        args.unshift(event, delta, deltaX, deltaY);
        return ($.event.dispatch || $.event.handle).apply(this, args);
    }
}));
if (jQuery)(function() {
    $.extend($.fn, {
        rightClick: function(handler) {
            $(this).each(function() {
                $(this).mousedown(function(e) {
                    var evt = e;
                    $(this).mouseup(function() {
                        $(this).unbind('mouseup');
                        if (evt.button == 2) {
                            handler.call($(this), evt);
                            return false;
                        } else {
                            return true;
                        }
                    });
                });
                $(this)[0].oncontextmenu = function() {
                    return false;
                }
            });
            return $(this);
        },
        rightMouseDown: function(handler) {
            $(this).each(function() {
                $(this).mousedown(function(e) {
                    if (e.button == 2) {
                        handler.call($(this), e);
                        return false;
                    } else {
                        return true;
                    }
                });
                $(this)[0].oncontextmenu = function() {
                    return false;
                }
            });
            return $(this);
        },
        rightMouseUp: function(handler) {
            $(this).each(function() {
                $(this).mouseup(function(e) {
                    if (e.button == 2) {
                        handler.call($(this), e);
                        return false;
                    } else {
                        return true;
                    }
                });
                $(this)[0].oncontextmenu = function() {
                    return false;
                }
            });
            return $(this);
        },
        noContext: function() {
            $(this).each(function() {
                $(this)[0].oncontextmenu = function() {
                    return false;
                }
            });
            return $(this);
        }
    });
})(jQuery);;

// required
! function(a) {
    function b() {}

    function c(a) {
        function c(b) {
            b.prototype.option || (b.prototype.option = function(b) {
                a.isPlainObject(b) && (this.options = a.extend(!0, this.options, b))
            })
        }

        function e(b, c) {
            a.fn[b] = function(e) {
                if ("string" == typeof e) {
                    for (var g = d.call(arguments, 1), h = 0, i = this.length; i > h; h++) {
                        var j = this[h],
                            k = a.data(j, b);
                        if (k)
                            if (a.isFunction(k[e]) && "_" !== e.charAt(0)) {
                                var l = k[e].apply(k, g);
                                if (void 0 !== l) return l
                            } else f("no such method '" + e + "' for " + b + " instance");
                        else f("cannot call methods on " + b + " prior to initialization; attempted to call '" + e + "'")
                    }
                    return this
                }
                return this.each(function() {
                    var d = a.data(this, b);
                    d ? (d.option(e), d._init()) : (d = new c(this, e), a.data(this, b, d))
                })
            }
        }
        if (a) {
            var f = "undefined" == typeof console ? b : function(a) {
                console.error(a)
            };
            return a.bridget = function(a, b) {
                c(b), e(a, b)
            }, a.bridget
        }
    }
    var d = Array.prototype.slice;
    "function" == typeof define && define.amd ? define("jquery-bridget/jquery.bridget", ["jquery"], c) : c("object" == typeof exports ? require("jquery") : a.jQuery)
}(window),
function() {
    function a() {}

    function b(a, b) {
        for (var c = a.length; c--;)
            if (a[c].listener === b) return c;
        return -1
    }

    function c(a) {
        return function() {
            return this[a].apply(this, arguments)
        }
    }
    var d = a.prototype,
        e = this,
        f = e.EventEmitter;
    d.getListeners = function(a) {
        var b, c, d = this._getEvents();
        if (a instanceof RegExp) {
            b = {};
            for (c in d) d.hasOwnProperty(c) && a.test(c) && (b[c] = d[c])
        } else b = d[a] || (d[a] = []);
        return b
    }, d.flattenListeners = function(a) {
        var b, c = [];
        for (b = 0; b < a.length; b += 1) c.push(a[b].listener);
        return c
    }, d.getListenersAsObject = function(a) {
        var b, c = this.getListeners(a);
        return c instanceof Array && (b = {}, b[a] = c), b || c
    }, d.addListener = function(a, c) {
        var d, e = this.getListenersAsObject(a),
            f = "object" == typeof c;
        for (d in e) e.hasOwnProperty(d) && -1 === b(e[d], c) && e[d].push(f ? c : {
            listener: c,
            once: !1
        });
        return this
    }, d.on = c("addListener"), d.addOnceListener = function(a, b) {
        return this.addListener(a, {
            listener: b,
            once: !0
        })
    }, d.once = c("addOnceListener"), d.defineEvent = function(a) {
        return this.getListeners(a), this
    }, d.defineEvents = function(a) {
        for (var b = 0; b < a.length; b += 1) this.defineEvent(a[b]);
        return this
    }, d.removeListener = function(a, c) {
        var d, e, f = this.getListenersAsObject(a);
        for (e in f) f.hasOwnProperty(e) && (d = b(f[e], c), -1 !== d && f[e].splice(d, 1));
        return this
    }, d.off = c("removeListener"), d.addListeners = function(a, b) {
        return this.manipulateListeners(!1, a, b)
    }, d.removeListeners = function(a, b) {
        return this.manipulateListeners(!0, a, b)
    }, d.manipulateListeners = function(a, b, c) {
        var d, e, f = a ? this.removeListener : this.addListener,
            g = a ? this.removeListeners : this.addListeners;
        if ("object" != typeof b || b instanceof RegExp)
            for (d = c.length; d--;) f.call(this, b, c[d]);
        else
            for (d in b) b.hasOwnProperty(d) && (e = b[d]) && ("function" == typeof e ? f.call(this, d, e) : g.call(this, d, e));
        return this
    }, d.removeEvent = function(a) {
        var b, c = typeof a,
            d = this._getEvents();
        if ("string" === c) delete d[a];
        else if (a instanceof RegExp)
            for (b in d) d.hasOwnProperty(b) && a.test(b) && delete d[b];
        else delete this._events;
        return this
    }, d.removeAllListeners = c("removeEvent"), d.emitEvent = function(a, b) {
        var c, d, e, f, g = this.getListenersAsObject(a);
        for (e in g)
            if (g.hasOwnProperty(e))
                for (d = g[e].length; d--;) c = g[e][d], c.once === !0 && this.removeListener(a, c.listener), f = c.listener.apply(this, b || []), f === this._getOnceReturnValue() && this.removeListener(a, c.listener);
        return this
    }, d.trigger = c("emitEvent"), d.emit = function(a) {
        var b = Array.prototype.slice.call(arguments, 1);
        return this.emitEvent(a, b)
    }, d.setOnceReturnValue = function(a) {
        return this._onceReturnValue = a, this
    }, d._getOnceReturnValue = function() {
        return this.hasOwnProperty("_onceReturnValue") ? this._onceReturnValue : !0
    }, d._getEvents = function() {
        return this._events || (this._events = {})
    }, a.noConflict = function() {
        return e.EventEmitter = f, a
    }, "function" == typeof define && define.amd ? define("eventEmitter/EventEmitter", [], function() {
        return a
    }) : "object" == typeof module && module.exports ? module.exports = a : e.EventEmitter = a
}.call(this),
    function(a) {
        function b(a) {
            if (a) {
                if ("string" == typeof d[a]) return a;
                a = a.charAt(0).toUpperCase() + a.slice(1);
                for (var b, e = 0, f = c.length; f > e; e++)
                    if (b = c[e] + a, "string" == typeof d[b]) return b
            }
        }
        var c = "Webkit Moz ms Ms O".split(" "),
            d = document.documentElement.style;
        "function" == typeof define && define.amd ? define("get-style-property/get-style-property", [], function() {
            return b
        }) : "object" == typeof exports ? module.exports = b : a.getStyleProperty = b
    }(window),
    function(a) {
        function b(a) {
            var b = parseFloat(a),
                c = -1 === a.indexOf("%") && !isNaN(b);
            return c && b
        }

        function c() {}

        function d() {
            for (var a = {
                    width: 0,
                    height: 0,
                    innerWidth: 0,
                    innerHeight: 0,
                    outerWidth: 0,
                    outerHeight: 0
                }, b = 0, c = g.length; c > b; b++) {
                var d = g[b];
                a[d] = 0
            }
            return a
        }

        function e(c) {
            function e() {
                if (!m) {
                    m = !0;
                    var d = a.getComputedStyle;
                    if (j = function() {
                            var a = d ? function(a) {
                                return d(a, null)
                            } : function(a) {
                                return a.currentStyle
                            };
                            return function(b) {
                                var c = a(b);
                                return c || f("Style returned " + c + ". Are you running this code in a hidden iframe on Firefox? See http://bit.ly/getsizebug1"), c
                            }
                        }(), k = c("boxSizing")) {
                        var e = document.createElement("div");
                        e.style.width = "200px", e.style.padding = "1px 2px 3px 4px", e.style.borderStyle = "solid", e.style.borderWidth = "1px 2px 3px 4px", e.style[k] = "border-box";
                        var g = document.body || document.documentElement;
                        g.appendChild(e);
                        var h = j(e);
                        l = 200 === b(h.width), g.removeChild(e)
                    }
                }
            }

            function h(a) {
                if (e(), "string" == typeof a && (a = document.querySelector(a)), a && "object" == typeof a && a.nodeType) {
                    var c = j(a);
                    if ("none" === c.display) return d();
                    var f = {};
                    f.width = a.offsetWidth, f.height = a.offsetHeight;
                    for (var h = f.isBorderBox = !(!k || !c[k] || "border-box" !== c[k]), m = 0, n = g.length; n > m; m++) {
                        var o = g[m],
                            p = c[o];
                        p = i(a, p);
                        var q = parseFloat(p);
                        f[o] = isNaN(q) ? 0 : q
                    }
                    var r = f.paddingLeft + f.paddingRight,
                        s = f.paddingTop + f.paddingBottom,
                        t = f.marginLeft + f.marginRight,
                        u = f.marginTop + f.marginBottom,
                        v = f.borderLeftWidth + f.borderRightWidth,
                        w = f.borderTopWidth + f.borderBottomWidth,
                        x = h && l,
                        y = b(c.width);
                    y !== !1 && (f.width = y + (x ? 0 : r + v));
                    var z = b(c.height);
                    return z !== !1 && (f.height = z + (x ? 0 : s + w)), f.innerWidth = f.width - (r + v), f.innerHeight = f.height - (s + w), f.outerWidth = f.width + t, f.outerHeight = f.height + u, f
                }
            }

            function i(b, c) {
                if (a.getComputedStyle || -1 === c.indexOf("%")) return c;
                var d = b.style,
                    e = d.left,
                    f = b.runtimeStyle,
                    g = f && f.left;
                return g && (f.left = b.currentStyle.left), d.left = c, c = d.pixelLeft, d.left = e, g && (f.left = g), c
            }
            var j, k, l, m = !1;
            return h
        }
        var f = "undefined" == typeof console ? c : function(a) {
                console.error(a)
            },
            g = ["paddingLeft", "paddingRight", "paddingTop", "paddingBottom", "marginLeft", "marginRight", "marginTop", "marginBottom", "borderLeftWidth", "borderRightWidth", "borderTopWidth", "borderBottomWidth"];
        "function" == typeof define && define.amd ? define("get-size/get-size", ["get-style-property/get-style-property"], e) : "object" == typeof exports ? module.exports = e(require("desandro-get-style-property")) : a.getSize = e(a.getStyleProperty)
    }(window),
    function(a) {
        function b(a, b) {
            return a[g](b)
        }

        function c(a) {
            if (!a.parentNode) {
                var b = document.createDocumentFragment();
                b.appendChild(a)
            }
        }

        function d(a, b) {
            c(a);
            for (var d = a.parentNode.querySelectorAll(b), e = 0, f = d.length; f > e; e++)
                if (d[e] === a) return !0;
            return !1
        }

        function e(a, d) {
            return c(a), b(a, d)
        }
        var f, g = function() {
            if (a.matchesSelector) return "matchesSelector";
            for (var b = ["webkit", "moz", "ms", "o"], c = 0, d = b.length; d > c; c++) {
                var e = b[c],
                    f = e + "MatchesSelector";
                if (a[f]) return f
            }
        }();
        if (g) {
            var h = document.createElement("div"),
                i = b(h, "div");
            f = i ? b : e
        } else f = d;
        "function" == typeof define && define.amd ? define("matches-selector/matches-selector", [], function() {
            return f
        }) : "object" == typeof exports ? module.exports = f : window.matchesSelector = f
    }(Element.prototype),
    function(a) {
        function b(a, b) {
            for (var c in b) a[c] = b[c];
            return a
        }

        function c(a) {
            for (var b in a) return !1;
            return b = null, !0
        }

        function d(a) {
            return a.replace(/([A-Z])/g, function(a) {
                return "-" + a.toLowerCase()
            })
        }

        function e(a, e, f) {
            function h(a, b) {
                a && (this.element = a, this.layout = b, this.position = {
                    x: 0,
                    y: 0
                }, this._create())
            }
            var i = f("transition"),
                j = f("transform"),
                k = i && j,
                l = !!f("perspective"),
                m = {
                    WebkitTransition: "webkitTransitionEnd",
                    MozTransition: "transitionend",
                    OTransition: "otransitionend",
                    transition: "transitionend"
                }[i],
                n = ["transform", "transition", "transitionDuration", "transitionProperty"],
                o = function() {
                    for (var a = {}, b = 0, c = n.length; c > b; b++) {
                        var d = n[b],
                            e = f(d);
                        e && e !== d && (a[d] = e)
                    }
                    return a
                }();
            b(h.prototype, a.prototype), h.prototype._create = function() {
                this._transn = {
                    ingProperties: {},
                    clean: {},
                    onEnd: {}
                }, this.css({
                    position: "absolute"
                })
            }, h.prototype.handleEvent = function(a) {
                var b = "on" + a.type;
                this[b] && this[b](a)
            }, h.prototype.getSize = function() {
                this.size = e(this.element)
            }, h.prototype.css = function(a) {
                var b = this.element.style;
                for (var c in a) {
                    var d = o[c] || c;
                    b[d] = a[c]
                }
            }, h.prototype.getPosition = function() {
                var a = g(this.element),
                    b = this.layout.options,
                    c = b.isOriginLeft,
                    d = b.isOriginTop,
                    e = parseInt(a[c ? "left" : "right"], 10),
                    f = parseInt(a[d ? "top" : "bottom"], 10);
                e = isNaN(e) ? 0 : e, f = isNaN(f) ? 0 : f;
                var h = this.layout.size;
                e -= c ? h.paddingLeft : h.paddingRight, f -= d ? h.paddingTop : h.paddingBottom, this.position.x = e, this.position.y = f
            }, h.prototype.layoutPosition = function() {
                var a = this.layout.size,
                    b = this.layout.options,
                    c = {};
                b.isOriginLeft ? (c.left = this.position.x + a.paddingLeft + "px", c.right = "") : (c.right = this.position.x + a.paddingRight + "px", c.left = ""), b.isOriginTop ? (c.top = this.position.y + a.paddingTop + "px", c.bottom = "") : (c.bottom = this.position.y + a.paddingBottom + "px", c.top = ""), this.css(c), this.emitEvent("layout", [this])
            };
            var p = l ? function(a, b) {
                return "translate3d(" + a + "px, " + b + "px, 0)"
            } : function(a, b) {
                return "translate(" + a + "px, " + b + "px)"
            };
            h.prototype._transitionTo = function(a, b) {
                this.getPosition();
                var c = this.position.x,
                    d = this.position.y,
                    e = parseInt(a, 10),
                    f = parseInt(b, 10),
                    g = e === this.position.x && f === this.position.y;
                if (this.setPosition(a, b), g && !this.isTransitioning) return void this.layoutPosition();
                var h = a - c,
                    i = b - d,
                    j = {},
                    k = this.layout.options;
                h = k.isOriginLeft ? h : -h, i = k.isOriginTop ? i : -i, j.transform = p(h, i), this.transition({
                    to: j,
                    onTransitionEnd: {
                        transform: this.layoutPosition
                    },
                    isCleaning: !0
                })
            }, h.prototype.goTo = function(a, b) {
                this.setPosition(a, b), this.layoutPosition()
            }, h.prototype.moveTo = k ? h.prototype._transitionTo : h.prototype.goTo, h.prototype.setPosition = function(a, b) {
                this.position.x = parseInt(a, 10), this.position.y = parseInt(b, 10)
            }, h.prototype._nonTransition = function(a) {
                this.css(a.to), a.isCleaning && this._removeStyles(a.to);
                for (var b in a.onTransitionEnd) a.onTransitionEnd[b].call(this)
            }, h.prototype._transition = function(a) {
                if (!parseFloat(this.layout.options.transitionDuration)) return void this._nonTransition(a);
                var b = this._transn;
                for (var c in a.onTransitionEnd) b.onEnd[c] = a.onTransitionEnd[c];
                for (c in a.to) b.ingProperties[c] = !0, a.isCleaning && (b.clean[c] = !0);
                if (a.from) {
                    this.css(a.from);
                    var d = this.element.offsetHeight;
                    d = null
                }
                this.enableTransition(a.to), this.css(a.to), this.isTransitioning = !0
            };
            var q = j && d(j) + ",opacity";
            h.prototype.enableTransition = function() {
                this.isTransitioning || (this.css({
                    transitionProperty: q,
                    transitionDuration: this.layout.options.transitionDuration
                }), this.element.addEventListener(m, this, !1))
            }, h.prototype.transition = h.prototype[i ? "_transition" : "_nonTransition"], h.prototype.onwebkitTransitionEnd = function(a) {
                this.ontransitionend(a)
            }, h.prototype.onotransitionend = function(a) {
                this.ontransitionend(a)
            };
            var r = {
                "-webkit-transform": "transform",
                "-moz-transform": "transform",
                "-o-transform": "transform"
            };
            h.prototype.ontransitionend = function(a) {
                if (a.target === this.element) {
                    var b = this._transn,
                        d = r[a.propertyName] || a.propertyName;
                    if (delete b.ingProperties[d], c(b.ingProperties) && this.disableTransition(), d in b.clean && (this.element.style[a.propertyName] = "", delete b.clean[d]), d in b.onEnd) {
                        var e = b.onEnd[d];
                        e.call(this), delete b.onEnd[d]
                    }
                    this.emitEvent("transitionEnd", [this])
                }
            }, h.prototype.disableTransition = function() {
                this.removeTransitionStyles(), this.element.removeEventListener(m, this, !1), this.isTransitioning = !1
            }, h.prototype._removeStyles = function(a) {
                var b = {};
                for (var c in a) b[c] = "";
                this.css(b)
            };
            var s = {
                transitionProperty: "",
                transitionDuration: ""
            };
            return h.prototype.removeTransitionStyles = function() {
                this.css(s)
            }, h.prototype.removeElem = function() {
                this.element.parentNode.removeChild(this.element), this.emitEvent("remove", [this])
            }, h.prototype.remove = function() {
                if (!i || !parseFloat(this.layout.options.transitionDuration)) return void this.removeElem();
                var a = this;
                this.on("transitionEnd", function() {
                    return a.removeElem(), !0
                }), this.hide()
            }, h.prototype.reveal = function() {
                delete this.isHidden, this.css({
                    display: ""
                });
                var a = this.layout.options;
                this.transition({
                    from: a.hiddenStyle,
                    to: a.visibleStyle,
                    isCleaning: !0
                })
            }, h.prototype.hide = function() {
                this.isHidden = !0, this.css({
                    display: ""
                });
                var a = this.layout.options;
                this.transition({
                    from: a.visibleStyle,
                    to: a.hiddenStyle,
                    isCleaning: !0,
                    onTransitionEnd: {
                        opacity: function() {
                            this.isHidden && this.css({
                                display: "none"
                            })
                        }
                    }
                })
            }, h.prototype.destroy = function() {
                this.css({
                    position: "",
                    left: "",
                    right: "",
                    top: "",
                    bottom: "",
                    transition: "",
                    transform: ""
                })
            }, h
        }
        var f = a.getComputedStyle,
            g = f ? function(a) {
                return f(a, null)
            } : function(a) {
                return a.currentStyle
            };
        "function" == typeof define && define.amd ? define("outlayer/item", ["eventEmitter/EventEmitter", "get-size/get-size", "get-style-property/get-style-property"], e) : "object" == typeof exports ? module.exports = e(require("wolfy87-eventemitter"), require("get-size"), require("desandro-get-style-property")) : (a.Outlayer = {}, a.Outlayer.Item = e(a.EventEmitter, a.getSize, a.getStyleProperty))
    }(window),
    function(a) {
        function b(a, b) {
            for (var c in b) a[c] = b[c];
            return a
        }

        function c(a) {
            return "[object Array]" === l.call(a)
        }

        function d(a) {
            var b = [];
            if (c(a)) b = a;
            else if (a && "number" == typeof a.length)
                for (var d = 0, e = a.length; e > d; d++) b.push(a[d]);
            else b.push(a);
            return b
        }

        function e(a, b) {
            var c = n(b, a); - 1 !== c && b.splice(c, 1)
        }

        function f(a) {
            return a.replace(/(.)([A-Z])/g, function(a, b, c) {
                return b + "-" + c
            }).toLowerCase()
        }

        function g(c, g, l, n, o, p) {
            function q(a, c) {
                if ("string" == typeof a && (a = h.querySelector(a)), !a || !m(a)) return void(i && i.error("Bad " + this.constructor.namespace + " element: " + a));
                this.element = a, this.options = b({}, this.constructor.defaults), this.option(c);
                var d = ++r;
                this.element.outlayerGUID = d, s[d] = this, this._create(), this.options.isInitLayout && this.layout()
            }
            var r = 0,
                s = {};
            return q.namespace = "outlayer", q.Item = p, q.defaults = {
                containerStyle: {
                    position: "relative"
                },
                isInitLayout: !0,
                isOriginLeft: !0,
                isOriginTop: !0,
                isResizeBound: !0,
                isResizingContainer: !0,
                transitionDuration: "0.4s",
                hiddenStyle: {
                    opacity: 0,
                    transform: "scale(0.001)"
                },
                visibleStyle: {
                    opacity: 1,
                    transform: "scale(1)"
                }
            }, b(q.prototype, l.prototype), q.prototype.option = function(a) {
                b(this.options, a)
            }, q.prototype._create = function() {
                this.reloadItems(), this.stamps = [], this.stamp(this.options.stamp), b(this.element.style, this.options.containerStyle), this.options.isResizeBound && this.bindResize()
            }, q.prototype.reloadItems = function() {
                this.items = this._itemize(this.element.children)
            }, q.prototype._itemize = function(a) {
                for (var b = this._filterFindItemElements(a), c = this.constructor.Item, d = [], e = 0, f = b.length; f > e; e++) {
                    var g = b[e],
                        h = new c(g, this);
                    d.push(h)
                }
                return d
            }, q.prototype._filterFindItemElements = function(a) {
                a = d(a);
                for (var b = this.options.itemSelector, c = [], e = 0, f = a.length; f > e; e++) {
                    var g = a[e];
                    if (m(g))
                        if (b) {
                            o(g, b) && c.push(g);
                            for (var h = g.querySelectorAll(b), i = 0, j = h.length; j > i; i++) c.push(h[i])
                        } else c.push(g)
                }
                return c
            }, q.prototype.getItemElements = function() {
                for (var a = [], b = 0, c = this.items.length; c > b; b++) a.push(this.items[b].element);
                return a
            }, q.prototype.layout = function() {
                this._resetLayout(), this._manageStamps();
                var a = void 0 !== this.options.isLayoutInstant ? this.options.isLayoutInstant : !this._isLayoutInited;
                this.layoutItems(this.items, a), this._isLayoutInited = !0
            }, q.prototype._init = q.prototype.layout, q.prototype._resetLayout = function() {
                this.getSize()
            }, q.prototype.getSize = function() {
                this.size = n(this.element)
            }, q.prototype._getMeasurement = function(a, b) {
                var c, d = this.options[a];
                d ? ("string" == typeof d ? c = this.element.querySelector(d) : m(d) && (c = d), this[a] = c ? n(c)[b] : d) : this[a] = 0
            }, q.prototype.layoutItems = function(a, b) {
                a = this._getItemsForLayout(a), this._layoutItems(a, b), this._postLayout()
            }, q.prototype._getItemsForLayout = function(a) {
                for (var b = [], c = 0, d = a.length; d > c; c++) {
                    var e = a[c];
                    e.isIgnored || b.push(e)
                }
                return b
            }, q.prototype._layoutItems = function(a, b) {
                function c() {
                    d.emitEvent("layoutComplete", [d, a])
                }
                var d = this;
                if (!a || !a.length) return void c();
                this._itemsOn(a, "layout", c);
                for (var e = [], f = 0, g = a.length; g > f; f++) {
                    var h = a[f],
                        i = this._getItemLayoutPosition(h);
                    i.item = h, i.isInstant = b || h.isLayoutInstant, e.push(i)
                }
                this._processLayoutQueue(e)
            }, q.prototype._getItemLayoutPosition = function() {
                return {
                    x: 0,
                    y: 0
                }
            }, q.prototype._processLayoutQueue = function(a) {
                for (var b = 0, c = a.length; c > b; b++) {
                    var d = a[b];
                    this._positionItem(d.item, d.x, d.y, d.isInstant)
                }
            }, q.prototype._positionItem = function(a, b, c, d) {
                d ? a.goTo(b, c) : a.moveTo(b, c)
            }, q.prototype._postLayout = function() {
                this.resizeContainer()
            }, q.prototype.resizeContainer = function() {
                if (this.options.isResizingContainer) {
                    var a = this._getContainerSize();
                    a && (this._setContainerMeasure(a.width, !0), this._setContainerMeasure(a.height, !1))
                }
            }, q.prototype._getContainerSize = k, q.prototype._setContainerMeasure = function(a, b) {
                if (void 0 !== a) {
                    var c = this.size;
                    c.isBorderBox && (a += b ? c.paddingLeft + c.paddingRight + c.borderLeftWidth + c.borderRightWidth : c.paddingBottom + c.paddingTop + c.borderTopWidth + c.borderBottomWidth), a = Math.max(a, 0), this.element.style[b ? "width" : "height"] = a + "px"
                }
            }, q.prototype._itemsOn = function(a, b, c) {
                function d() {
                    return e++, e === f && c.call(g), !0
                }
                for (var e = 0, f = a.length, g = this, h = 0, i = a.length; i > h; h++) {
                    var j = a[h];
                    j.on(b, d)
                }
            }, q.prototype._find = function(a) {
                return a ? ("string" == typeof a && (a = this.element.querySelectorAll(a)), a = d(a)) : void 0
            }, q.prototype._getBoundingRect = function() {
                var a = this.element.getBoundingClientRect(),
                    b = this.size;
                this._boundingRect = {
                    left: a.left + b.paddingLeft + b.borderLeftWidth,
                    top: a.top + b.paddingTop + b.borderTopWidth,
                    right: a.right - (b.paddingRight + b.borderRightWidth),
                    bottom: a.bottom - (b.paddingBottom + b.borderBottomWidth)
                }
            }, q.prototype.handleEvent = function(a) {
                var b = "on" + a.type;
                this[b] && this[b](a)
            }, q.prototype.bindResize = function() {
                this.isResizeBound || (c.bind(a, "resize", this), this.isResizeBound = !0)
            }, q.prototype.unbindResize = function() {
                this.isResizeBound && c.unbind(a, "resize", this), this.isResizeBound = !1
            }, q.prototype.onresize = function() {
                function a() {
                    b.resize(), delete b.resizeTimeout
                }
                this.resizeTimeout && clearTimeout(this.resizeTimeout);
                var b = this;
                this.resizeTimeout = setTimeout(a, 100)
            }, q.prototype.resize = function() {
                this.isResizeBound && this.needsResizeLayout() && this.layout()
            }, q.prototype.needsResizeLayout = function() {
                var a = n(this.element),
                    b = this.size && a;
                return b && a.innerWidth !== this.size.innerWidth
            }, q.prototype.addItems = function(a) {
                var b = this._itemize(a);
                return b.length && (this.items = this.items.concat(b)), b
            }, q.prototype.appended = function(a) {
                var b = this.addItems(a);
                b.length && (this.layoutItems(b, !0), this.reveal(b))

            }, q.prototype.getItem = function(a) {
                for (var b = 0, c = this.items.length; c > b; b++) {
                    var d = this.items[b];
                    if (d.element === a) return d
                }
            }, q.prototype.getItems = function(a) {
                if (a && a.length) {
                    for (var b = [], c = 0, d = a.length; d > c; c++) {
                        var e = a[c],
                            f = this.getItem(e);
                        f && b.push(f)
                    }
                    return b
                }
            }, q.prototype.remove = function(a) {
                a = d(a);
                var b = this.getItems(a);
                if (b && b.length) {
                    this._itemsOn(b, "remove", function() {
                        this.emitEvent("removeComplete", [this, b])
                    });
                    for (var c = 0, f = b.length; f > c; c++) {
                        var g = b[c];
                        g.remove(), e(g, this.items)
                    }
                }
            }, q.prototype.destroy = function() {
                var a = this.element.style;
                a.height = "", a.position = "", a.width = "";
                for (var b = 0, c = this.items.length; c > b; b++) {
                    var d = this.items[b];
                    d.destroy()
                }
                this.unbindResize();
                var e = this.element.outlayerGUID;
                delete s[e], delete this.element.outlayerGUID, j && j.removeData(this.element, this.constructor.namespace)
            }, q.data = function(a) {
                var b = a && a.outlayerGUID;
                return b && s[b]
            }, q.create = function(a, c) {
                function d() {
                    q.apply(this, arguments)
                }
                return Object.create ? d.prototype = Object.create(q.prototype) : b(d.prototype, q.prototype), d.prototype.constructor = d, d.defaults = b({}, q.defaults), b(d.defaults, c), d.prototype.settings = {}, d.namespace = a, d.data = q.data, d.Item = function() {
                    p.apply(this, arguments)
                }, d.Item.prototype = new p, g(function() {
                    for (var b = f(a), c = h.querySelectorAll(".js-" + b), e = "data-" + b + "-options", g = 0, k = c.length; k > g; g++) {
                        var l, m = c[g],
                            n = m.getAttribute(e);
                        try {
                            l = n && JSON.parse(n)
                        } catch (o) {
                            i && i.error("Error parsing " + e + " on " + m.nodeName.toLowerCase() + (m.id ? "#" + m.id : "") + ": " + o);
                            continue
                        }
                        var p = new d(m, l);
                        j && j.data(m, a, p)
                    }
                }), j && j.bridget && j.bridget(a, d), d
            }, q.Item = p, q
        }
        var h = a.document,
            i = a.console,
            j = a.jQuery,
            k = function() {},
            l = Object.prototype.toString,
            m = "function" == typeof HTMLElement || "object" == typeof HTMLElement ? function(a) {
                return a instanceof HTMLElement
            } : function(a) {
                return a && "object" == typeof a && 1 === a.nodeType && "string" == typeof a.nodeName
            },
            n = Array.prototype.indexOf ? function(a, b) {
                return a.indexOf(b)
            } : function(a, b) {
                for (var c = 0, d = a.length; d > c; c++)
                    if (a[c] === b) return c;
                return -1
            };
        "function" == typeof define && define.amd ? define("outlayer/outlayer", ["eventie/eventie", "doc-ready/doc-ready", "eventEmitter/EventEmitter", "get-size/get-size", "matches-selector/matches-selector", "./item"], g) : "object" == typeof exports ? module.exports = g(require("eventie"), require("doc-ready"), require("wolfy87-eventemitter"), require("get-size"), require("desandro-matches-selector"), require("./item")) : a.Outlayer = g(a.eventie, a.docReady, a.EventEmitter, a.getSize, a.matchesSelector, a.Outlayer.Item)
    }(window);
(function(factory) {
    if (typeof define === 'function' && define.amd && define.amd.jQuery) {
        define(['jquery'], factory);
    } else {
        factory(jQuery);
    }
});

var rsnBrowser = new Object();
rsnBrowser.detect = function() {
    var ua = window.navigator.userAgent.toLowerCase();
    var platform = new Object();
    platform.os = new Object();
    platform.browser = new Object();
    if (ua.indexOf("mac os x") != -1) {
        platform.os.name = "osx";
    } else if (ua.indexOf("windows") != -1) {
        platform.os.name = "windows";
    } else if (ua.indexOf("linux") != -1) {
        platform.os.name = "linux";
    }
    if (ua.indexOf('webkit') != -1) {
        platform.browser.engine = "webkit";
    } else if (ua.indexOf('gecko') != -1) {
        platform.browser.engine = "gecko";
    } else if (ua.indexOf('msie') != -1) {
        platform.browser.engine = "msie";
    }
    var browser = ua.match(/(opera|chrome|safari|firefox|trident|applewebkit)\/?\s*(\.?\d+(\.\d+)*)/i);
    if (browser) {
        if (browser[1] && browser[1] == "trident") {
            platform.browser.name = "msie";
        } else if (browser[1]) {
            platform.browser.name = browser[1];
        } else {
            platform.browser.name = "unknown";
        }
        if (browser[2]) {
            platform.browser.version = browser[2];
        } else {
            platform.browser.version = "unknown";
        }
        if (platform.browser.name == "safari") platform.browser.version = ua.match(/version\/?\s*(\.?\d+(\.\d+)*)/i)[1];
    }
    return platform;
};
rsnBrowser.compareVersions = function(v1, v2) {
    var v1parts = v1.split('.');
    var v2parts = v2.split('.');
    for (var i = 0; i < v1parts.length; ++i) {
        if (v2parts.length == i) return true;
        if (v1parts[i] == v2parts[i]) {
            continue;
        } else if (v1parts[i] > v2parts[i]) {
            return true;
        } else {
            return false;
        }
    }
    if (v1parts.length != v2parts.length) return false;
    return true;
};
var rsn = new Object();
rsn.usingDownloadBlocker = false;
rsn.usingShareButton = false;

rsn.findFullSizeImages = function() {
    return $('img[src*="_image_"], img[src*="_slide_"]:last-child, ul.images img, #overlay img').not('.body img, .html img, .blocker, form img, footer img');
};
rsn.browserDetect = function() {
    platform = rsnBrowser.detect();
    $('body').addClass(platform.browser.engine);
    if (/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream) {
        $('body').addClass('ios');
        // $("ul").addClass("ui items");
        // $("li").addClass("item");
    }
};

(function($) {
    $.fn.getImageSizeWhileLoading = function(parameters) {
        parameters = parameters || {};
        var defaults = {
            findDimension: 'width',
            assignTo: 'self'
        };
        parameters = $.extend(defaults, parameters);
        return this.each(function() {
            $(this).find('img').each(function() {
                var $image = $(this);
                var $target = (parameters.assignTo === "self" ? $image : $image.closest(parameters.assignTo));
                if ($image.data('dimensions') && $image.data('dimensions').match(/^\d+x\d+$/)) {
                    var aspectRatio = $image.data('dimensions').split('x');
                    var aspectRatio = aspectRatio[0] / aspectRatio[1];
                } else {
                    var aspectRatio = $image.attr('width') / $image.attr('height');
                }
                if (parameters.findDimension === "width") {
                    var newHeight = parseInt($image.css('height'));
                    var newWidth = Math.round(newHeight * aspectRatio);
                } else {
                    var newWidth = parseInt($image.css('width'));
                    var newHeight = Math.round(newWidth / aspectRatio);
                }
                $target.css({
                    width: newWidth + 'px',
                    height: newHeight + 'px'
                });
            });
        });
    };
})(jQuery);

rsn.sideScroll = new Object();
rsn.sideScroll.resize = function() {
    var windowWidth = (platform.browser.name == "msie" ? document.body.clientWidth : window.innerWidth);
    // var marginTop = parseInt($('.images > li:first-child').css('margin-top'));
    // var marginBottom = parseInt($('.images > li:first-child').css('margin-bottom'));
    var windowHeight = $(window).height();
    var marginTop = windowHeight * 0.2;
    var marginBottom = windowHeight * 0.2;
    if ($('.layout-header-wide').length > 0) {
        var imagesHeight = rsn.sideScroll.availableSpace();
        $('.sidescroll .images').css({
            'line-height': imagesHeight + 'px',
            'height': imagesHeight + 'px'
        });
    } else {
        var sidebarWidth = $('header').width();
        var contentWidth = windowWidth - sidebarWidth;
        var imagesHeight = windowHeight;
        $('.sidescroll .images').css({
            'height': imagesHeight + 'px',
            'line-height': windowHeight - 30 + 'px'
        });
        if (marginTop > 0 || marginBottom > 0) {
            var maxHeight = windowHeight - marginTop - marginBottom;
            $('.images > li').css({
                'max-height': maxHeight + 'px'
            });
            $(".left nav").offset({ top: marginTop });
        }
    }

    // firefox + IE
    if (platform.browser.engine == "gecko" || platform.browser.name == "msie") {
        var maxHeight = parseInt(imagesHeight * .96);
        $('.images img:not(.blocker)').css('max-height', maxHeight + 'px');
    }
    $('.sidescroll').addClass('show');
};
rsn.sideScroll.availableSpace = function() {
    var windowHeight = (platform.browser.name == "msie" ? document.documentElement.clientHeight : $('html')[0].clientHeight);
    var headerHeight = $('header').height();
    var footerHeight = $('footer:visible').outerHeight();
    var contentPadding = parseInt($('#content').css('padding-top')) + parseInt($('#content').css('padding-bottom'));
    var usedSpace = headerHeight + footerHeight + contentPadding
    var availableSpace = windowHeight - usedSpace;
    return availableSpace;
};
rsn.uniformHeight = function(commonHeight) {
    if (typeof commonHeight == "undefined") var commonHeight = 675;
    if ($('.centered .sidescroll').length > 0) {
        $('.centered .sidescroll img').css({
            'max-height': "100%"
        });
    }
};
rsn.sideScroll.sidebar = function() {
    rsn.sideScroll.resize();
    if (!$('body').hasClass('ios')) $(window).resize(rsn.sideScroll.resize);
    $('#content').css('visibility', 'visible');
    if ($('.sidescroll').length > 0) {
        $('body').append('<div id="scrollcatcher"></div>');
        var scrollModifier = (navigator.appVersion.indexOf("Mac") != -1 ? 25 : 75);
        $('html,body').mousewheel(function(event, delta, deltaX, deltaY) {
            if (deltaY > 0 && deltaY > deltaX || deltaY < 0 && deltaY < deltaX) {
                var speed = deltaY * scrollModifier;
                if (speed > 200) var speed = 200;
                if (speed < -200) var speed = -200;
                if (platform.browser.name == "msie") {
                    var position = document.documentElement.scrollLeft + -speed;
                    document.documentElement.scrollLeft = position;
                } else if (platform.browser.engine == "gecko") {
                    var position = $(document).scrollLeft() + -speed;
                    window.scrollTo(position, 0);
                } else {
                    var position = $(this).scrollLeft() + -speed;
                    $(this)[0].scrollLeft = position;
                }
                return false;
            }
        });
        $(document).keydown(function(e) {
            var sidebarWidth = parseInt($('header').css('width'));
            var windowWidth = parseInt($(window).width());
            var contentWidth = windowWidth - sidebarWidth;
            var padding = 20;
            if (e.which == 37) {
                $('html, body').stop();
                var scrollLeft = $(window).scrollLeft();
                $($('.images > li').get().reverse()).each(function() {
                    var offset = parseInt($(this).offset().left - scrollLeft);
                    var rightEdge = offset + parseInt($(this).width());
                    var limit = sidebarWidth + contentWidth / 2;
                    if (rightEdge < limit - padding) {
                        var imageWidth = parseInt($(this).width());
                        var scrollTo = parseInt(scrollLeft + offset - sidebarWidth - contentWidth / 2 + imageWidth / 2);
                        $('html, body').animate({
                            scrollLeft: scrollTo
                        }, 500);
                        return false;
                    }
                });
                return false;
            } else if (e.which == 39) {
                $('html, body').stop();
                var scrollLeft = $(window).scrollLeft();
                $('.images > li').each(function() {
                    var offset = parseInt($(this).offset().left - scrollLeft);
                    var limit = sidebarWidth + contentWidth / 2;
                    if (offset > limit + padding) {
                        var imageWidth = parseInt($(this).width());
                        var scrollTo = parseInt(scrollLeft + offset - sidebarWidth - contentWidth / 2 + imageWidth / 2);
                        $('html, body').animate({
                            scrollLeft: scrollTo
                        }, 500);
                        return false;
                    }
                });
                return false;
            }
        });
        $(document).on('click', '.images img', function(e) {
            e.preventDefault();
            // var e = $.Event('keydown');
            // e.which = 39;
            // $(document).trigger(e);
        });
        var $sidebar = $('header');
        var $footer = $('footer');
        var sidebarWidth = $sidebar.width();
    }
};
rsn.computedStyles = function() {
    var footerColor = $('footer p').css('color');
    $('.credit path').css({
        fill: footerColor
    });

    if ($('body.left').length > 0) {
        if (!$('nav').is(':visible')) $('nav').show();
        $('header h1 a').data({
            top: parseInt($('header h1 a').position().top)
        });
        $('nav').data({
            top: parseInt($('nav').position().top)
        });
        $('footer').data({
            height: parseInt($('footer').height())
        });
        rsn.computedStyles.prototype.responsiveSidebar();
        $(window).resize(rsn.computedStyles.prototype.responsiveSidebar);
    }
    if ($('body.left').length > 0 && $('.textpage').length > 0 || $('.layout-header-wide').length > 0 && $('.textpage').length > 0) {
        function responsiveTextPage() {
            var width = $('.textpage').width();
            if (width < 700) {
                $('.text-left').addClass('text-centered').addClass('text-left-disabled').removeClass('text-left');
                $('.text-right').addClass('text-centered').addClass('text-right-disabled').removeClass('text-right');
            } else {
                $('.text-left-disabled').removeClass('text-centered').removeClass('text-left-disabled').addClass('text-left');
                $('.text-right-disabled').removeClass('text-centered').removeClass('text-right-disabled').addClass('text-right');
            }
        }
        responsiveTextPage();
        $(window).resize(responsiveTextPage);
    }
    var $group = $('.layout-header-wide div.group:not(.tile), .layout-header-wide div.archive:not(.tile)');
    if ($group.length > 0) {
        function centerGroup($group) {
            var groupWidth = $group.width();
            var items = $group.children('.thumbs').children('li').length;
            var itemColumns = Math.floor(groupWidth / itemWidth);
            if (items < itemColumns) var itemColumns = items;
            var spaceUsed = itemWidth * itemColumns;
            $group.children('.thumbs').css({
                width: spaceUsed + 'px'
            });
        }
        $group.children('.thumbs').css({
            float: 'none',
            margin: '0 auto'
        });
        var itemWidth = $group.children('.thumbs').children('li:first-child').outerWidth(true);
        centerGroup($group, itemWidth);
        $group.addClass('opaque');
        $(window).resize(function() {
            centerGroup($group, itemWidth)
        });
    }
    $('div.archive').addClass('opaque');
};
rsn.computedStyles.prototype.responsiveSidebar = function() {
    var $logo = $('header h1 a');
    var $nav = $('nav');
    var $footer = $('footer');
    var headerHeight = $(".name").offset().top + $(".name").height();
    var logoTop = $logo.data('top');
    var navTop = $nav.data('top');
    var navHeight = $nav[0].scrollHeight;
    var footerHeight = $footer.data('height');
    var windowHeight = $(window).height();
    var availableNavSpace = windowHeight - headerHeight - footerHeight - 10;
    if (navHeight > availableNavSpace) {
        $nav.addClass('scroll').css({
            height: availableNavSpace + 'px'
        });
    } else {
        $nav.removeClass('scroll').css({
            height: 'auto'
        });
    }
};
rsn.pages = function() {
    $(window).scroll(function() {
        if (typeof(loadNextPage) != "undefined") {
            clearTimeout(loadNextPage);
        }
        loadNextPage = setTimeout(function() {
            if ($(window).height() + $(window).scrollTop() >= $(document).height() - 600) {
                rsn.nextPage();
            }
        }, 250);
    });
};

$(document).ready(function() {
    try {
        rsn.browserDetect();
        if ($('body.left div.sidescroll').length > 0) rsn.sideScroll.sidebar();
        rsn.computedStyles();
        if ($('.paged').length > 0) rsn.pages();
        if (typeof peek != "undefined") rsn.peek();
        if ($('#confirmation').length > 0) rsn.confirmation();
    } catch (error) {
        alert(error);
    }
});
$(window).load(function() {});
