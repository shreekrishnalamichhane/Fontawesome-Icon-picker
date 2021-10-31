/*!
 * Font Awesome Icon Picker
 * https://farbelous.github.io/fontawesome-iconpicker/
 *
 * Originally written by (c) 2016 Javi Aguilar
 * Licensed under the MIT License
 * https://github.com/farbelous/fontawesome-iconpicker/blob/master/LICENSE
 *
 */
(function (a) {
  if (typeof define === "function" && define.amd) {
    define(["jquery"], a);
  } else {
    a(jQuery);
  }
})(function (a) {
  a.ui = a.ui || {};
  var b = (a.ui.version = "1.12.1");
  /*!
   * jQuery UI Position 1.12.1
   * http://jqueryui.com
   *
   * Copyright jQuery Foundation and other contributors
   * Released under the MIT license.
   * http://jquery.org/license
   *
   * http://api.jqueryui.com/position/
   */
  (function () {
    var b,
      c = Math.max,
      d = Math.abs,
      e = /left|center|right/,
      f = /top|center|bottom/,
      g = /[\+\-]\d+(\.[\d]+)?%?/,
      h = /^\w+/,
      i = /%$/,
      j = a.fn.pos;
    function k(a, b, c) {
      return [
        parseFloat(a[0]) * (i.test(a[0]) ? b / 100 : 1),
        parseFloat(a[1]) * (i.test(a[1]) ? c / 100 : 1),
      ];
    }
    function l(b, c) {
      return parseInt(a.css(b, c), 10) || 0;
    }
    function m(b) {
      var c = b[0];
      if (c.nodeType === 9) {
        return {
          width: b.width(),
          height: b.height(),
          offset: {
            top: 0,
            left: 0,
          },
        };
      }
      if (a.isWindow(c)) {
        return {
          width: b.width(),
          height: b.height(),
          offset: {
            top: b.scrollTop(),
            left: b.scrollLeft(),
          },
        };
      }
      if (c.preventDefault) {
        return {
          width: 0,
          height: 0,
          offset: {
            top: c.pageY,
            left: c.pageX,
          },
        };
      }
      return {
        width: b.outerWidth(),
        height: b.outerHeight(),
        offset: b.offset(),
      };
    }
    a.pos = {
      scrollbarWidth: function () {
        if (b !== undefined) {
          return b;
        }
        var c,
          d,
          e = a(
            "<div " +
              "style='display:block;position:absolute;width:50px;height:50px;overflow:hidden;'>" +
              "<div style='height:100px;width:auto;'></div></div>"
          ),
          f = e.children()[0];
        a("body").append(e);
        c = f.offsetWidth;
        e.css("overflow", "scroll");
        d = f.offsetWidth;
        if (c === d) {
          d = e[0].clientWidth;
        }
        e.remove();
        return (b = c - d);
      },
      getScrollInfo: function (b) {
        var c = b.isWindow || b.isDocument ? "" : b.element.css("overflow-x"),
          d = b.isWindow || b.isDocument ? "" : b.element.css("overflow-y"),
          e =
            c === "scroll" ||
            (c === "auto" && b.width < b.element[0].scrollWidth),
          f =
            d === "scroll" ||
            (d === "auto" && b.height < b.element[0].scrollHeight);
        return {
          width: f ? a.pos.scrollbarWidth() : 0,
          height: e ? a.pos.scrollbarWidth() : 0,
        };
      },
      getWithinInfo: function (b) {
        var c = a(b || window),
          d = a.isWindow(c[0]),
          e = !!c[0] && c[0].nodeType === 9,
          f = !d && !e;
        return {
          element: c,
          isWindow: d,
          isDocument: e,
          offset: f
            ? a(b).offset()
            : {
                left: 0,
                top: 0,
              },
          scrollLeft: c.scrollLeft(),
          scrollTop: c.scrollTop(),
          width: c.outerWidth(),
          height: c.outerHeight(),
        };
      },
    };
    a.fn.pos = function (b) {
      if (!b || !b.of) {
        return j.apply(this, arguments);
      }
      b = a.extend({}, b);
      var i,
        n,
        o,
        p,
        q,
        r,
        s = a(b.of),
        t = a.pos.getWithinInfo(b.within),
        u = a.pos.getScrollInfo(t),
        v = (b.collision || "flip").split(" "),
        w = {};
      r = m(s);
      if (s[0].preventDefault) {
        b.at = "left top";
      }
      n = r.width;
      o = r.height;
      p = r.offset;
      q = a.extend({}, p);
      a.each(["my", "at"], function () {
        var a = (b[this] || "").split(" "),
          c,
          d;
        if (a.length === 1) {
          a = e.test(a[0])
            ? a.concat(["center"])
            : f.test(a[0])
            ? ["center"].concat(a)
            : ["center", "center"];
        }
        a[0] = e.test(a[0]) ? a[0] : "center";
        a[1] = f.test(a[1]) ? a[1] : "center";
        c = g.exec(a[0]);
        d = g.exec(a[1]);
        w[this] = [c ? c[0] : 0, d ? d[0] : 0];
        b[this] = [h.exec(a[0])[0], h.exec(a[1])[0]];
      });
      if (v.length === 1) {
        v[1] = v[0];
      }
      if (b.at[0] === "right") {
        q.left += n;
      } else if (b.at[0] === "center") {
        q.left += n / 2;
      }
      if (b.at[1] === "bottom") {
        q.top += o;
      } else if (b.at[1] === "center") {
        q.top += o / 2;
      }
      i = k(w.at, n, o);
      q.left += i[0];
      q.top += i[1];
      return this.each(function () {
        var e,
          f,
          g = a(this),
          h = g.outerWidth(),
          j = g.outerHeight(),
          m = l(this, "marginLeft"),
          r = l(this, "marginTop"),
          x = h + m + l(this, "marginRight") + u.width,
          y = j + r + l(this, "marginBottom") + u.height,
          z = a.extend({}, q),
          A = k(w.my, g.outerWidth(), g.outerHeight());
        if (b.my[0] === "right") {
          z.left -= h;
        } else if (b.my[0] === "center") {
          z.left -= h / 2;
        }
        if (b.my[1] === "bottom") {
          z.top -= j;
        } else if (b.my[1] === "center") {
          z.top -= j / 2;
        }
        z.left += A[0];
        z.top += A[1];
        e = {
          marginLeft: m,
          marginTop: r,
        };
        a.each(["left", "top"], function (c, d) {
          if (a.ui.pos[v[c]]) {
            a.ui.pos[v[c]][d](z, {
              targetWidth: n,
              targetHeight: o,
              elemWidth: h,
              elemHeight: j,
              collisionPosition: e,
              collisionWidth: x,
              collisionHeight: y,
              offset: [i[0] + A[0], i[1] + A[1]],
              my: b.my,
              at: b.at,
              within: t,
              elem: g,
            });
          }
        });
        if (b.using) {
          f = function (a) {
            var e = p.left - z.left,
              f = e + n - h,
              i = p.top - z.top,
              k = i + o - j,
              l = {
                target: {
                  element: s,
                  left: p.left,
                  top: p.top,
                  width: n,
                  height: o,
                },
                element: {
                  element: g,
                  left: z.left,
                  top: z.top,
                  width: h,
                  height: j,
                },
                horizontal: f < 0 ? "left" : e > 0 ? "right" : "center",
                vertical: k < 0 ? "top" : i > 0 ? "bottom" : "middle",
              };
            if (n < h && d(e + f) < n) {
              l.horizontal = "center";
            }
            if (o < j && d(i + k) < o) {
              l.vertical = "middle";
            }
            if (c(d(e), d(f)) > c(d(i), d(k))) {
              l.important = "horizontal";
            } else {
              l.important = "vertical";
            }
            b.using.call(this, a, l);
          };
        }
        g.offset(
          a.extend(z, {
            using: f,
          })
        );
      });
    };
    a.ui.pos = {
      _trigger: function (a, b, c, d) {
        if (b.elem) {
          b.elem.trigger({
            type: c,
            position: a,
            positionData: b,
            triggered: d,
          });
        }
      },
      fit: {
        left: function (b, d) {
          a.ui.pos._trigger(b, d, "posCollide", "fitLeft");
          var e = d.within,
            f = e.isWindow ? e.scrollLeft : e.offset.left,
            g = e.width,
            h = b.left - d.collisionPosition.marginLeft,
            i = f - h,
            j = h + d.collisionWidth - g - f,
            k;
          if (d.collisionWidth > g) {
            if (i > 0 && j <= 0) {
              k = b.left + i + d.collisionWidth - g - f;
              b.left += i - k;
            } else if (j > 0 && i <= 0) {
              b.left = f;
            } else {
              if (i > j) {
                b.left = f + g - d.collisionWidth;
              } else {
                b.left = f;
              }
            }
          } else if (i > 0) {
            b.left += i;
          } else if (j > 0) {
            b.left -= j;
          } else {
            b.left = c(b.left - h, b.left);
          }
          a.ui.pos._trigger(b, d, "posCollided", "fitLeft");
        },
        top: function (b, d) {
          a.ui.pos._trigger(b, d, "posCollide", "fitTop");
          var e = d.within,
            f = e.isWindow ? e.scrollTop : e.offset.top,
            g = d.within.height,
            h = b.top - d.collisionPosition.marginTop,
            i = f - h,
            j = h + d.collisionHeight - g - f,
            k;
          if (d.collisionHeight > g) {
            if (i > 0 && j <= 0) {
              k = b.top + i + d.collisionHeight - g - f;
              b.top += i - k;
            } else if (j > 0 && i <= 0) {
              b.top = f;
            } else {
              if (i > j) {
                b.top = f + g - d.collisionHeight;
              } else {
                b.top = f;
              }
            }
          } else if (i > 0) {
            b.top += i;
          } else if (j > 0) {
            b.top -= j;
          } else {
            b.top = c(b.top - h, b.top);
          }
          a.ui.pos._trigger(b, d, "posCollided", "fitTop");
        },
      },
      flip: {
        left: function (b, c) {
          a.ui.pos._trigger(b, c, "posCollide", "flipLeft");
          var e = c.within,
            f = e.offset.left + e.scrollLeft,
            g = e.width,
            h = e.isWindow ? e.scrollLeft : e.offset.left,
            i = b.left - c.collisionPosition.marginLeft,
            j = i - h,
            k = i + c.collisionWidth - g - h,
            l =
              c.my[0] === "left"
                ? -c.elemWidth
                : c.my[0] === "right"
                ? c.elemWidth
                : 0,
            m =
              c.at[0] === "left"
                ? c.targetWidth
                : c.at[0] === "right"
                ? -c.targetWidth
                : 0,
            n = -2 * c.offset[0],
            o,
            p;
          if (j < 0) {
            o = b.left + l + m + n + c.collisionWidth - g - f;
            if (o < 0 || o < d(j)) {
              b.left += l + m + n;
            }
          } else if (k > 0) {
            p = b.left - c.collisionPosition.marginLeft + l + m + n - h;
            if (p > 0 || d(p) < k) {
              b.left += l + m + n;
            }
          }
          a.ui.pos._trigger(b, c, "posCollided", "flipLeft");
        },
        top: function (b, c) {
          a.ui.pos._trigger(b, c, "posCollide", "flipTop");
          var e = c.within,
            f = e.offset.top + e.scrollTop,
            g = e.height,
            h = e.isWindow ? e.scrollTop : e.offset.top,
            i = b.top - c.collisionPosition.marginTop,
            j = i - h,
            k = i + c.collisionHeight - g - h,
            l = c.my[1] === "top",
            m = l ? -c.elemHeight : c.my[1] === "bottom" ? c.elemHeight : 0,
            n =
              c.at[1] === "top"
                ? c.targetHeight
                : c.at[1] === "bottom"
                ? -c.targetHeight
                : 0,
            o = -2 * c.offset[1],
            p,
            q;
          if (j < 0) {
            q = b.top + m + n + o + c.collisionHeight - g - f;
            if (q < 0 || q < d(j)) {
              b.top += m + n + o;
            }
          } else if (k > 0) {
            p = b.top - c.collisionPosition.marginTop + m + n + o - h;
            if (p > 0 || d(p) < k) {
              b.top += m + n + o;
            }
          }
          a.ui.pos._trigger(b, c, "posCollided", "flipTop");
        },
      },
      flipfit: {
        left: function () {
          a.ui.pos.flip.left.apply(this, arguments);
          a.ui.pos.fit.left.apply(this, arguments);
        },
        top: function () {
          a.ui.pos.flip.top.apply(this, arguments);
          a.ui.pos.fit.top.apply(this, arguments);
        },
      },
    };
    (function () {
      var b,
        c,
        d,
        e,
        f,
        g = document.getElementsByTagName("body")[0],
        h = document.createElement("div");
      b = document.createElement(g ? "div" : "body");
      d = {
        visibility: "hidden",
        width: 0,
        height: 0,
        border: 0,
        margin: 0,
        background: "none",
      };
      if (g) {
        a.extend(d, {
          position: "absolute",
          left: "-1000px",
          top: "-1000px",
        });
      }
      for (f in d) {
        b.style[f] = d[f];
      }
      b.appendChild(h);
      c = g || document.documentElement;
      c.insertBefore(b, c.firstChild);
      h.style.cssText = "position: absolute; left: 10.7432222px;";
      e = a(h).offset().left;
      a.support.offsetFractions = e > 10 && e < 11;
      b.innerHTML = "";
      c.removeChild(b);
    })();
  })();
  var c = a.ui.position;
});

(function (a) {
  "use strict";
  if (typeof define === "function" && define.amd) {
    define(["jquery"], a);
  } else if (window.jQuery && !window.jQuery.fn.iconpicker) {
    a(window.jQuery);
  }
})(function (a) {
  "use strict";
  var b = {
    isEmpty: function (a) {
      return a === false || a === "" || a === null || a === undefined;
    },
    isEmptyObject: function (a) {
      return this.isEmpty(a) === true || a.length === 0;
    },
    isElement: function (b) {
      return a(b).length > 0;
    },
    isString: function (a) {
      return typeof a === "string" || a instanceof String;
    },
    isArray: function (b) {
      return a.isArray(b);
    },
    inArray: function (b, c) {
      return a.inArray(b, c) !== -1;
    },
    throwError: function (a) {
      throw "Font Awesome Icon Picker Exception: " + a;
    },
  };
  var c = function (d, e) {
    this._id = c._idCounter++;
    this.element = a(d).addClass("iconpicker-element");
    this._trigger("iconpickerCreate", {
      iconpickerValue: this.iconpickerValue,
    });
    this.options = a.extend({}, c.defaultOptions, this.element.data(), e);
    this.options.templates = a.extend(
      {},
      c.defaultOptions.templates,
      this.options.templates
    );
    this.options.originalPlacement = this.options.placement;
    this.container = b.isElement(this.options.container)
      ? a(this.options.container)
      : false;
    if (this.container === false) {
      if (this.element.is(".dropdown-toggle")) {
        this.container = a("~ .dropdown-menu:first", this.element);
      } else {
        this.container = this.element.is("input,textarea,button,.btn")
          ? this.element.parent()
          : this.element;
      }
    }
    this.container.addClass("iconpicker-container");
    if (this.isDropdownMenu()) {
      this.options.placement = "inline";
    }
    this.input = this.element.is("input,textarea")
      ? this.element.addClass("iconpicker-input")
      : false;
    if (this.input === false) {
      this.input = this.container.find(this.options.input);
      if (!this.input.is("input,textarea")) {
        this.input = false;
      }
    }
    this.component = this.isDropdownMenu()
      ? this.container.parent().find(this.options.component)
      : this.container.find(this.options.component);
    if (this.component.length === 0) {
      this.component = false;
    } else {
      this.component.find("i").addClass("iconpicker-component");
    }
    this._createPopover();
    this._createIconpicker();
    if (this.getAcceptButton().length === 0) {
      this.options.mustAccept = false;
    }
    if (this.isInputGroup()) {
      this.container.parent().append(this.popover);
    } else {
      this.container.append(this.popover);
    }
    this._bindElementEvents();
    this._bindWindowEvents();
    this.update(this.options.selected);
    if (this.isInline()) {
      this.show();
    }
    this._trigger("iconpickerCreated", {
      iconpickerValue: this.iconpickerValue,
    });
  };
  c._idCounter = 0;
  c.defaultOptions = {
    t: false,
    selected: false,
    defaultValue: false,
    placement: "bottom",
    collision: "none",
    animation: false,
    hideOnSelect: false,
    showFooter: false,
    searchInFooter: false,
    mustAccept: false,
    selectedCustomClass: "bg-primary",
    icons: [],
    fullClassFormatter: function (a) {
      return a;
    },
    input: "input,.iconpicker-input",
    inputSearch: true,
    container: false,
    component: ".input-group-addon,.iconpicker-component",
    templates: {
      popover:
        '<div class="iconpicker-popover popover"><div class="arrow"></div>' +
        '<div class="popover-t"></div><div class="popover-content"></div></div>',
      footer: '<div class="popover-footer"></div>',
      buttons:
        '<button class="iconpicker-btn iconpicker-btn-cancel btn btn-default btn-sm">Cancel</button>' +
        ' <button class="iconpicker-btn iconpicker-btn-accept btn btn-primary btn-sm">Accept</button>',
      search:
        '<input type="search" class="form-control iconpicker-search" placeholder="Type to filter" />',
      iconpicker:
        '<div class="iconpicker"><div class="iconpicker-items"></div></div>',
      iconpickerItem:
        '<a role="button" href="#" class="iconpicker-item"><i></i></a>',
    },
  };
  c.batch = function (b, c) {
    var d = Array.prototype.slice.call(arguments, 2);
    return a(b).each(function () {
      var b = a(this).data("iconpicker");
      if (!!b) {
        b[c].apply(b, d);
      }
    });
  };
  c.prototype = {
    constructor: c,
    options: {},
    _id: 0,
    _trigger: function (b, c) {
      c = c || {};
      this.element.trigger(
        a.extend(
          {
            type: b,
            iconpickerInstance: this,
          },
          c
        )
      );
    },
    _createPopover: function () {
      this.popover = a(this.options.templates.popover);
      var c = this.popover.find(".popover-t");
      if (!!this.options.t) {
        c.append(a('<div class="popover-t-text">' + this.options.t + "</div>"));
      }
      if (this.hasSeparatedSearchInput() && !this.options.searchInFooter) {
        c.append(this.options.templates.search);
      } else if (!this.options.t) {
        c.remove();
      }
      if (
        this.options.showFooter &&
        !b.isEmpty(this.options.templates.footer)
      ) {
        var d = a(this.options.templates.footer);
        if (this.hasSeparatedSearchInput() && this.options.searchInFooter) {
          d.append(a(this.options.templates.search));
        }
        if (!b.isEmpty(this.options.templates.buttons)) {
          d.append(a(this.options.templates.buttons));
        }
        this.popover.append(d);
      }
      if (this.options.animation === true) {
        this.popover.addClass("fade");
      }
      return this.popover;
    },
    _createIconpicker: function () {
      var b = this;
      this.iconpicker = a(this.options.templates.iconpicker);
      var c = function (c) {
        var d = a(this);
        if (d.is("i")) {
          d = d.parent();
        }
        b._trigger("iconpickerSelect", {
          iconpickerItem: d,
          iconpickerValue: b.iconpickerValue,
        });
        if (b.options.mustAccept === false) {
          b.update(d.data("iconpickerValue"));
          b._trigger("iconpickerSelected", {
            iconpickerItem: this,
            iconpickerValue: b.iconpickerValue,
          });
        } else {
          b.update(d.data("iconpickerValue"), true);
        }
        if (b.options.hideOnSelect && b.options.mustAccept === false) {
          b.hide();
        }
      };
      for (var d in this.options.icons) {
        if (typeof this.options.icons[d].t === "string") {
          var e = a(this.options.templates.iconpickerItem);
          e.find("i").addClass(
            this.options.fullClassFormatter(this.options.icons[d].t)
          );
          e.data("iconpickerValue", this.options.icons[d].t).on(
            "click.iconpicker",
            c
          );
          this.iconpicker
            .find(".iconpicker-items")
            .append(e.attr("t", "." + this.options.icons[d].t));
          if (this.options.icons[d].sT.length > 0) {
            var f = "";
            for (var g = 0; g < this.options.icons[d].sT.length; g++) {
              f = f + this.options.icons[d].sT[g] + " ";
            }
            this.iconpicker
              .find(".iconpicker-items")
              .append(e.attr("data-search-terms", f));
          }
        }
      }
      this.popover.find(".popover-content").append(this.iconpicker);
      return this.iconpicker;
    },
    _isEventInsideIconpicker: function (b) {
      var c = a(b.target);
      if (
        (!c.hasClass("iconpicker-element") ||
          (c.hasClass("iconpicker-element") && !c.is(this.element))) &&
        c.parents(".iconpicker-popover").length === 0
      ) {
        return false;
      }
      return true;
    },
    _bindElementEvents: function () {
      var c = this;
      this.getSearchInput().on("keyup.iconpicker", function () {
        c.filter(a(this).val().toLowerCase());
      });
      this.getAcceptButton().on("click.iconpicker", function () {
        var a = c.iconpicker.find(".iconpicker-selected").get(0);
        c.update(c.iconpickerValue);
        c._trigger("iconpickerSelected", {
          iconpickerItem: a,
          iconpickerValue: c.iconpickerValue,
        });
        if (!c.isInline()) {
          c.hide();
        }
      });
      this.getCancelButton().on("click.iconpicker", function () {
        if (!c.isInline()) {
          c.hide();
        }
      });
      this.element.on("focus.iconpicker", function (a) {
        c.show();
        a.stopPropagation();
      });
      if (this.hasComponent()) {
        this.component.on("click.iconpicker", function () {
          c.toggle();
        });
      }
      if (this.hasInput()) {
        this.input.on("keyup.iconpicker", function (d) {
          if (
            !b.inArray(
              d.keyCode,
              [
                38, 40, 37, 39, 16, 17, 18, 9, 8, 91, 93, 20, 46, 186, 190, 46,
                78, 188, 44, 86,
              ]
            )
          ) {
            c.update();
          } else {
            c._updateFormGroupStatus(c.getValid(this.value) !== false);
          }
          if (c.options.inputSearch === true) {
            c.filter(a(this).val().toLowerCase());
          }
        });
      }
    },
    _bindWindowEvents: function () {
      var b = a(window.document);
      var c = this;
      var d = ".iconpicker.inst" + this._id;
      a(window).on(
        "resize.iconpicker" + d + " orientationchange.iconpicker" + d,
        function (a) {
          if (c.popover.hasClass("in")) {
            c.updatePlacement();
          }
        }
      );
      if (!c.isInline()) {
        b.on("mouseup" + d, function (a) {
          if (!c._isEventInsideIconpicker(a) && !c.isInline()) {
            c.hide();
          }
        });
      }
    },
    _unbindElementEvents: function () {
      this.popover.off(".iconpicker");
      this.element.off(".iconpicker");
      if (this.hasInput()) {
        this.input.off(".iconpicker");
      }
      if (this.hasComponent()) {
        this.component.off(".iconpicker");
      }
      if (this.hasContainer()) {
        this.container.off(".iconpicker");
      }
    },
    _unbindWindowEvents: function () {
      a(window).off(".iconpicker.inst" + this._id);
      a(window.document).off(".iconpicker.inst" + this._id);
    },
    updatePlacement: function (b, c) {
      b = b || this.options.placement;
      this.options.placement = b;
      c = c || this.options.collision;
      c = c === true ? "flip" : c;
      var d = {
        at: "right bottom",
        my: "right top",
        of:
          this.hasInput() && !this.isInputGroup() ? this.input : this.container,
        collision: c === true ? "flip" : c,
        within: window,
      };
      this.popover.removeClass(
        "inline topLeftCorner topLeft top topRight topRightCorner " +
          "rightTop right rightBottom bottomRight bottomRightCorner " +
          "bottom bottomLeft bottomLeftCorner leftBottom left leftTop"
      );
      if (typeof b === "object") {
        return this.popover.pos(a.extend({}, d, b));
      }
      switch (b) {
        case "inline":
          {
            d = false;
          }
          break;

        case "topLeftCorner":
          {
            d.my = "right bottom";
            d.at = "left top";
          }
          break;

        case "topLeft":
          {
            d.my = "left bottom";
            d.at = "left top";
          }
          break;

        case "top":
          {
            d.my = "center bottom";
            d.at = "center top";
          }
          break;

        case "topRight":
          {
            d.my = "right bottom";
            d.at = "right top";
          }
          break;

        case "topRightCorner":
          {
            d.my = "left bottom";
            d.at = "right top";
          }
          break;

        case "rightTop":
          {
            d.my = "left bottom";
            d.at = "right center";
          }
          break;

        case "right":
          {
            d.my = "left center";
            d.at = "right center";
          }
          break;

        case "rightBottom":
          {
            d.my = "left top";
            d.at = "right center";
          }
          break;

        case "bottomRightCorner":
          {
            d.my = "left top";
            d.at = "right bottom";
          }
          break;

        case "bottomRight":
          {
            d.my = "right top";
            d.at = "right bottom";
          }
          break;

        case "bottom":
          {
            d.my = "center top";
            d.at = "center bottom";
          }
          break;

        case "bottomLeft":
          {
            d.my = "left top";
            d.at = "left bottom";
          }
          break;

        case "bottomLeftCorner":
          {
            d.my = "right top";
            d.at = "left bottom";
          }
          break;

        case "leftBottom":
          {
            d.my = "right top";
            d.at = "left center";
          }
          break;

        case "left":
          {
            d.my = "right center";
            d.at = "left center";
          }
          break;

        case "leftTop":
          {
            d.my = "right bottom";
            d.at = "left center";
          }
          break;

        default:
          {
            return false;
          }
          break;
      }
      this.popover.css({
        display: this.options.placement === "inline" ? "" : "block",
      });
      if (d !== false) {
        this.popover
          .pos(d)
          .css(
            "maxWidth",
            a(window).width() - this.container.offset().left - 5
          );
      } else {
        this.popover.css({
          top: "auto",
          right: "auto",
          bottom: "auto",
          left: "auto",
          maxWidth: "none",
        });
      }
      this.popover.addClass(this.options.placement);
      return true;
    },
    _updateComponents: function () {
      this.iconpicker
        .find(".iconpicker-item.iconpicker-selected")
        .removeClass("iconpicker-selected " + this.options.selectedCustomClass);
      if (this.iconpickerValue) {
        this.iconpicker
          .find(
            "." +
              this.options
                .fullClassFormatter(this.iconpickerValue)
                .replace(/ /g, ".")
          )
          .parent()
          .addClass("iconpicker-selected " + this.options.selectedCustomClass);
      }
      if (this.hasComponent()) {
        var a = this.component.find("i");
        if (a.length > 0) {
          a.attr(
            "class",
            this.options.fullClassFormatter(this.iconpickerValue)
          );
        } else {
          this.component.html(this.getHtml());
        }
      }
    },
    _updateFormGroupStatus: function (a) {
      if (this.hasInput()) {
        if (a !== false) {
          this.input.parents(".form-group:first").removeClass("has-error");
        } else {
          this.input.parents(".form-group:first").addClass("has-error");
        }
        return true;
      }
      return false;
    },
    getValid: function (c) {
      if (!b.isString(c)) {
        c = "";
      }
      var d = c === "";
      c = a.trim(c);
      var e = false;
      for (var f = 0; f < this.options.icons.length; f++) {
        if (this.options.icons[f].t === c) {
          e = true;
          break;
        }
      }
      if (e || d) {
        return c;
      }
      return false;
    },
    setValue: function (a) {
      var b = this.getValid(a);
      if (b !== false) {
        this.iconpickerValue = b;
        this._trigger("iconpickerSetValue", {
          iconpickerValue: b,
        });
        return this.iconpickerValue;
      } else {
        this._trigger("iconpickerInvalid", {
          iconpickerValue: a,
        });
        return false;
      }
    },
    getHtml: function () {
      return (
        '<i class="' +
        this.options.fullClassFormatter(this.iconpickerValue) +
        '"></i>'
      );
    },
    setSourceValue: function (a) {
      a = this.setValue(a);
      if (a !== false && a !== "") {
        if (this.hasInput()) {
          this.input.val(this.iconpickerValue);
        } else {
          this.element.data("iconpickerValue", this.iconpickerValue);
        }
        this._trigger("iconpickerSetSourceValue", {
          iconpickerValue: a,
        });
      }
      return a;
    },
    getSourceValue: function (a) {
      a = a || this.options.defaultValue;
      var b = a;
      if (this.hasInput()) {
        b = this.input.val();
      } else {
        b = this.element.data("iconpickerValue");
      }
      if (b === undefined || b === "" || b === null || b === false) {
        b = a;
      }
      return b;
    },
    hasInput: function () {
      return this.input !== false;
    },
    isInputSearch: function () {
      return this.hasInput() && this.options.inputSearch === true;
    },
    isInputGroup: function () {
      return this.container.is(".input-group");
    },
    isDropdownMenu: function () {
      return this.container.is(".dropdown-menu");
    },
    hasSeparatedSearchInput: function () {
      return this.options.templates.search !== false && !this.isInputSearch();
    },
    hasComponent: function () {
      return this.component !== false;
    },
    hasContainer: function () {
      return this.container !== false;
    },
    getAcceptButton: function () {
      return this.popover.find(".iconpicker-btn-accept");
    },
    getCancelButton: function () {
      return this.popover.find(".iconpicker-btn-cancel");
    },
    getSearchInput: function () {
      return this.popover.find(".iconpicker-search");
    },
    filter: function (c) {
      if (b.isEmpty(c)) {
        this.iconpicker.find(".iconpicker-item").show();
        return a(false);
      } else {
        var d = [];
        this.iconpicker.find(".iconpicker-item").each(function () {
          var b = a(this);
          var e = b.attr("t").toLowerCase();
          var f = b.attr("data-search-terms")
            ? b.attr("data-search-terms").toLowerCase()
            : "";
          e = e + " " + f;
          var g = false;
          try {
            g = new RegExp("(^|\\W)" + c, "g");
          } catch (a) {
            g = false;
          }
          if (g !== false && e.match(g)) {
            d.push(b);
            b.show();
          } else {
            b.hide();
          }
        });
        return d;
      }
    },
    show: function () {
      if (this.popover.hasClass("in")) {
        return false;
      }
      a.iconpicker.batch(
        a(".iconpicker-popover.in:not(.inline)").not(this.popover),
        "hide"
      );
      this._trigger("iconpickerShow", {
        iconpickerValue: this.iconpickerValue,
      });
      this.updatePlacement();
      this.popover.addClass("in");
      setTimeout(
        a.proxy(function () {
          this.popover.css("display", this.isInline() ? "" : "block");
          this._trigger("iconpickerShown", {
            iconpickerValue: this.iconpickerValue,
          });
        }, this),
        this.options.animation ? 300 : 1
      );
    },
    hide: function () {
      if (!this.popover.hasClass("in")) {
        return false;
      }
      this._trigger("iconpickerHide", {
        iconpickerValue: this.iconpickerValue,
      });
      this.popover.removeClass("in");
      setTimeout(
        a.proxy(function () {
          this.popover.css("display", "none");
          this.getSearchInput().val("");
          this.filter("");
          this._trigger("iconpickerHidden", {
            iconpickerValue: this.iconpickerValue,
          });
        }, this),
        this.options.animation ? 300 : 1
      );
    },
    toggle: function () {
      if (this.popover.is(":visible")) {
        this.hide();
      } else {
        this.show(true);
      }
    },
    update: function (a, b) {
      a = a ? a : this.getSourceValue(this.iconpickerValue);
      this._trigger("iconpickerUpdate", {
        iconpickerValue: this.iconpickerValue,
      });
      if (b === true) {
        a = this.setValue(a);
      } else {
        a = this.setSourceValue(a);
        this._updateFormGroupStatus(a !== false);
      }
      if (a !== false) {
        this._updateComponents();
      }
      this._trigger("iconpickerUpdated", {
        iconpickerValue: this.iconpickerValue,
      });
      return a;
    },
    destroy: function () {
      this._trigger("iconpickerDestroy", {
        iconpickerValue: this.iconpickerValue,
      });
      this.element
        .removeData("iconpicker")
        .removeData("iconpickerValue")
        .removeClass("iconpicker-element");
      this._unbindElementEvents();
      this._unbindWindowEvents();
      a(this.popover).remove();
      this._trigger("iconpickerDestroyed", {
        iconpickerValue: this.iconpickerValue,
      });
    },
    disable: function () {
      if (this.hasInput()) {
        this.input.prop("disabled", true);
        return true;
      }
      return false;
    },
    enable: function () {
      if (this.hasInput()) {
        this.input.prop("disabled", false);
        return true;
      }
      return false;
    },
    isDisabled: function () {
      if (this.hasInput()) {
        return this.input.prop("disabled") === true;
      }
      return false;
    },
    isInline: function () {
      return (
        this.options.placement === "inline" || this.popover.hasClass("inline")
      );
    },
  };
  a.iconpicker = c;
  a.fn.iconpicker = function (b) {
    return this.each(function () {
      var d = a(this);
      if (!d.data("iconpicker")) {
        d.data("iconpicker", new c(this, typeof b === "object" ? b : {}));
      }
    });
  };
  c.defaultOptions = a.extend(c.defaultOptions, {
    icons: [
      {
        t: "fab fa-500px",
        sT: [],
      },
      {
        t: "fas fa-abacus",
        sT: [],
      },
      {
        t: "far fa-abacus",
        sT: [],
      },
      {
        t: "fal fa-abacus",
        sT: [],
      },
      {
        t: "fad fa-abacus",
        sT: [],
      },
      {
        t: "fab fa-accessible-icon",
        sT: [],
      },
      {
        t: "fab fa-accusoft",
        sT: [],
      },
      {
        t: "fas fa-acorn",
        sT: [],
      },
      {
        t: "far fa-acorn",
        sT: [],
      },
      {
        t: "fal fa-acorn",
        sT: [],
      },
      {
        t: "fad fa-acorn",
        sT: [],
      },
      {
        t: "fab fa-acquisitions-incorporated",
        sT: [],
      },
      {
        t: "fas fa-ad",
        sT: [],
      },
      {
        t: "far fa-ad",
        sT: [],
      },
      {
        t: "fal fa-ad",
        sT: [],
      },
      {
        t: "fad fa-ad",
        sT: [],
      },
      {
        t: "fas fa-address-book",
        sT: [],
      },
      {
        t: "far fa-address-book",
        sT: [],
      },
      {
        t: "fal fa-address-book",
        sT: [],
      },
      {
        t: "fad fa-address-book",
        sT: [],
      },
      {
        t: "fas fa-address-card",
        sT: [],
      },
      {
        t: "far fa-address-card",
        sT: [],
      },
      {
        t: "fal fa-address-card",
        sT: [],
      },
      {
        t: "fad fa-address-card",
        sT: [],
      },
      {
        t: "fas fa-adjust",
        sT: [],
      },
      {
        t: "far fa-adjust",
        sT: [],
      },
      {
        t: "fal fa-adjust",
        sT: [],
      },
      {
        t: "fad fa-adjust",
        sT: [],
      },
      {
        t: "fab fa-adn",
        sT: [],
      },
      {
        t: "fab fa-adversal",
        sT: [],
      },
      {
        t: "fab fa-affiliatetheme",
        sT: [],
      },
      {
        t: "fas fa-air-conditioner",
        sT: [],
      },
      {
        t: "far fa-air-conditioner",
        sT: [],
      },
      {
        t: "fal fa-air-conditioner",
        sT: [],
      },
      {
        t: "fad fa-air-conditioner",
        sT: [],
      },
      {
        t: "fas fa-air-freshener",
        sT: [],
      },
      {
        t: "far fa-air-freshener",
        sT: [],
      },
      {
        t: "fal fa-air-freshener",
        sT: [],
      },
      {
        t: "fad fa-air-freshener",
        sT: [],
      },
      {
        t: "fab fa-airbnb",
        sT: [],
      },
      {
        t: "fas fa-alarm-clock",
        sT: [],
      },
      {
        t: "far fa-alarm-clock",
        sT: [],
      },
      {
        t: "fal fa-alarm-clock",
        sT: [],
      },
      {
        t: "fad fa-alarm-clock",
        sT: [],
      },
      {
        t: "fas fa-alarm-exclamation",
        sT: [],
      },
      {
        t: "far fa-alarm-exclamation",
        sT: [],
      },
      {
        t: "fal fa-alarm-exclamation",
        sT: [],
      },
      {
        t: "fad fa-alarm-exclamation",
        sT: [],
      },
      {
        t: "fas fa-alarm-plus",
        sT: [],
      },
      {
        t: "far fa-alarm-plus",
        sT: [],
      },
      {
        t: "fal fa-alarm-plus",
        sT: [],
      },
      {
        t: "fad fa-alarm-plus",
        sT: [],
      },
      {
        t: "fas fa-alarm-snooze",
        sT: [],
      },
      {
        t: "far fa-alarm-snooze",
        sT: [],
      },
      {
        t: "fal fa-alarm-snooze",
        sT: [],
      },
      {
        t: "fad fa-alarm-snooze",
        sT: [],
      },
      {
        t: "fas fa-album",
        sT: [],
      },
      {
        t: "far fa-album",
        sT: [],
      },
      {
        t: "fal fa-album",
        sT: [],
      },
      {
        t: "fad fa-album",
        sT: [],
      },
      {
        t: "fas fa-album-collection",
        sT: [],
      },
      {
        t: "far fa-album-collection",
        sT: [],
      },
      {
        t: "fal fa-album-collection",
        sT: [],
      },
      {
        t: "fad fa-album-collection",
        sT: [],
      },
      {
        t: "fab fa-algolia",
        sT: [],
      },
      {
        t: "fas fa-alicorn",
        sT: [],
      },
      {
        t: "far fa-alicorn",
        sT: [],
      },
      {
        t: "fal fa-alicorn",
        sT: [],
      },
      {
        t: "fad fa-alicorn",
        sT: [],
      },
      {
        t: "fas fa-alien",
        sT: [],
      },
      {
        t: "far fa-alien",
        sT: [],
      },
      {
        t: "fal fa-alien",
        sT: [],
      },
      {
        t: "fad fa-alien",
        sT: [],
      },
      {
        t: "fas fa-alien-monster",
        sT: [],
      },
      {
        t: "far fa-alien-monster",
        sT: [],
      },
      {
        t: "fal fa-alien-monster",
        sT: [],
      },
      {
        t: "fad fa-alien-monster",
        sT: [],
      },
      {
        t: "fas fa-align-center",
        sT: [],
      },
      {
        t: "far fa-align-center",
        sT: [],
      },
      {
        t: "fal fa-align-center",
        sT: [],
      },
      {
        t: "fad fa-align-center",
        sT: [],
      },
      {
        t: "fas fa-align-justify",
        sT: [],
      },
      {
        t: "far fa-align-justify",
        sT: [],
      },
      {
        t: "fal fa-align-justify",
        sT: [],
      },
      {
        t: "fad fa-align-justify",
        sT: [],
      },
      {
        t: "fas fa-align-left",
        sT: [],
      },
      {
        t: "far fa-align-left",
        sT: [],
      },
      {
        t: "fal fa-align-left",
        sT: [],
      },
      {
        t: "fad fa-align-left",
        sT: [],
      },
      {
        t: "fas fa-align-right",
        sT: [],
      },
      {
        t: "far fa-align-right",
        sT: [],
      },
      {
        t: "fal fa-align-right",
        sT: [],
      },
      {
        t: "fad fa-align-right",
        sT: [],
      },
      {
        t: "fas fa-align-slash",
        sT: [],
      },
      {
        t: "far fa-align-slash",
        sT: [],
      },
      {
        t: "fal fa-align-slash",
        sT: [],
      },
      {
        t: "fad fa-align-slash",
        sT: [],
      },
      {
        t: "fab fa-alipay",
        sT: [],
      },
      {
        t: "fas fa-allergies",
        sT: [],
      },
      {
        t: "far fa-allergies",
        sT: [],
      },
      {
        t: "fal fa-allergies",
        sT: [],
      },
      {
        t: "fad fa-allergies",
        sT: [],
      },
      {
        t: "fab fa-amazon",
        sT: [],
      },
      {
        t: "fab fa-amazon-pay",
        sT: [],
      },
      {
        t: "fas fa-ambulance",
        sT: [],
      },
      {
        t: "far fa-ambulance",
        sT: [],
      },
      {
        t: "fal fa-ambulance",
        sT: [],
      },
      {
        t: "fad fa-ambulance",
        sT: [],
      },
      {
        t: "fas fa-american-sign-language-interpreting",
        sT: [],
      },
      {
        t: "far fa-american-sign-language-interpreting",
        sT: [],
      },
      {
        t: "fal fa-american-sign-language-interpreting",
        sT: [],
      },
      {
        t: "fad fa-american-sign-language-interpreting",
        sT: [],
      },
      {
        t: "fab fa-amilia",
        sT: [],
      },
      {
        t: "fal fa-amp-guitar",
        sT: [],
      },
      {
        t: "far fa-amp-guitar",
        sT: [],
      },
      {
        t: "fas fa-amp-guitar",
        sT: [],
      },
      {
        t: "fad fa-amp-guitar",
        sT: [],
      },
      {
        t: "fas fa-analytics",
        sT: [],
      },
      {
        t: "far fa-analytics",
        sT: [],
      },
      {
        t: "fal fa-analytics",
        sT: [],
      },
      {
        t: "fad fa-analytics",
        sT: [],
      },
      {
        t: "fas fa-anchor",
        sT: [],
      },
      {
        t: "far fa-anchor",
        sT: [],
      },
      {
        t: "fal fa-anchor",
        sT: [],
      },
      {
        t: "fad fa-anchor",
        sT: [],
      },
      {
        t: "fab fa-android",
        sT: [],
      },
      {
        t: "fas fa-angel",
        sT: [],
      },
      {
        t: "far fa-angel",
        sT: [],
      },
      {
        t: "fal fa-angel",
        sT: [],
      },
      {
        t: "fad fa-angel",
        sT: [],
      },
      {
        t: "fab fa-angellist",
        sT: [],
      },
      {
        t: "fas fa-angle-double-down",
        sT: [],
      },
      {
        t: "far fa-angle-double-down",
        sT: [],
      },
      {
        t: "fal fa-angle-double-down",
        sT: [],
      },
      {
        t: "fad fa-angle-double-down",
        sT: [],
      },
      {
        t: "fas fa-angle-double-left",
        sT: [],
      },
      {
        t: "far fa-angle-double-left",
        sT: [],
      },
      {
        t: "fal fa-angle-double-left",
        sT: [],
      },
      {
        t: "fad fa-angle-double-left",
        sT: [],
      },
      {
        t: "fas fa-angle-double-right",
        sT: [],
      },
      {
        t: "far fa-angle-double-right",
        sT: [],
      },
      {
        t: "fal fa-angle-double-right",
        sT: [],
      },
      {
        t: "fad fa-angle-double-right",
        sT: [],
      },
      {
        t: "fas fa-angle-double-up",
        sT: [],
      },
      {
        t: "far fa-angle-double-up",
        sT: [],
      },
      {
        t: "fal fa-angle-double-up",
        sT: [],
      },
      {
        t: "fad fa-angle-double-up",
        sT: [],
      },
      {
        t: "fas fa-angle-down",
        sT: [],
      },
      {
        t: "far fa-angle-down",
        sT: [],
      },
      {
        t: "fal fa-angle-down",
        sT: [],
      },
      {
        t: "fad fa-angle-down",
        sT: [],
      },
      {
        t: "fas fa-angle-left",
        sT: [],
      },
      {
        t: "far fa-angle-left",
        sT: [],
      },
      {
        t: "fal fa-angle-left",
        sT: [],
      },
      {
        t: "fad fa-angle-left",
        sT: [],
      },
      {
        t: "fas fa-angle-right",
        sT: [],
      },
      {
        t: "far fa-angle-right",
        sT: [],
      },
      {
        t: "fal fa-angle-right",
        sT: [],
      },
      {
        t: "fad fa-angle-right",
        sT: [],
      },
      {
        t: "fas fa-angle-up",
        sT: [],
      },
      {
        t: "far fa-angle-up",
        sT: [],
      },
      {
        t: "fal fa-angle-up",
        sT: [],
      },
      {
        t: "fad fa-angle-up",
        sT: [],
      },
      {
        t: "fas fa-angry",
        sT: [],
      },
      {
        t: "far fa-angry",
        sT: [],
      },
      {
        t: "fal fa-angry",
        sT: [],
      },
      {
        t: "fad fa-angry",
        sT: [],
      },
      {
        t: "fab fa-angrycreative",
        sT: [],
      },
      {
        t: "fab fa-angular",
        sT: [],
      },
      {
        t: "fas fa-ankh",
        sT: [],
      },
      {
        t: "far fa-ankh",
        sT: [],
      },
      {
        t: "fal fa-ankh",
        sT: [],
      },
      {
        t: "fad fa-ankh",
        sT: [],
      },
      {
        t: "fab fa-app-store",
        sT: [],
      },
      {
        t: "fab fa-app-store-ios",
        sT: [],
      },
      {
        t: "fab fa-apper",
        sT: [],
      },
      {
        t: "fab fa-apple",
        sT: [],
      },
      {
        t: "fas fa-apple-alt",
        sT: [],
      },
      {
        t: "far fa-apple-alt",
        sT: [],
      },
      {
        t: "fal fa-apple-alt",
        sT: [],
      },
      {
        t: "fad fa-apple-alt",
        sT: [],
      },
      {
        t: "fas fa-apple-crate",
        sT: [],
      },
      {
        t: "far fa-apple-crate",
        sT: [],
      },
      {
        t: "fal fa-apple-crate",
        sT: [],
      },
      {
        t: "fad fa-apple-crate",
        sT: [],
      },
      {
        t: "fab fa-apple-pay",
        sT: [],
      },
      {
        t: "fas fa-archive",
        sT: [],
      },
      {
        t: "far fa-archive",
        sT: [],
      },
      {
        t: "fal fa-archive",
        sT: [],
      },
      {
        t: "fad fa-archive",
        sT: [],
      },
      {
        t: "fas fa-archway",
        sT: [],
      },
      {
        t: "far fa-archway",
        sT: [],
      },
      {
        t: "fal fa-archway",
        sT: [],
      },
      {
        t: "fad fa-archway",
        sT: [],
      },
      {
        t: "fas fa-arrow-alt-circle-down",
        sT: [],
      },
      {
        t: "far fa-arrow-alt-circle-down",
        sT: [],
      },
      {
        t: "fal fa-arrow-alt-circle-down",
        sT: [],
      },
      {
        t: "fad fa-arrow-alt-circle-down",
        sT: [],
      },
      {
        t: "fas fa-arrow-alt-circle-left",
        sT: [],
      },
      {
        t: "far fa-arrow-alt-circle-left",
        sT: [],
      },
      {
        t: "fal fa-arrow-alt-circle-left",
        sT: [],
      },
      {
        t: "fad fa-arrow-alt-circle-left",
        sT: [],
      },
      {
        t: "fas fa-arrow-alt-circle-right",
        sT: [],
      },
      {
        t: "far fa-arrow-alt-circle-right",
        sT: [],
      },
      {
        t: "fal fa-arrow-alt-circle-right",
        sT: [],
      },
      {
        t: "fad fa-arrow-alt-circle-right",
        sT: [],
      },
      {
        t: "fas fa-arrow-alt-circle-up",
        sT: [],
      },
      {
        t: "far fa-arrow-alt-circle-up",
        sT: [],
      },
      {
        t: "fal fa-arrow-alt-circle-up",
        sT: [],
      },
      {
        t: "fad fa-arrow-alt-circle-up",
        sT: [],
      },
      {
        t: "fas fa-arrow-alt-down",
        sT: [],
      },
      {
        t: "far fa-arrow-alt-down",
        sT: [],
      },
      {
        t: "fal fa-arrow-alt-down",
        sT: [],
      },
      {
        t: "fad fa-arrow-alt-down",
        sT: [],
      },
      {
        t: "fas fa-arrow-alt-from-bottom",
        sT: [],
      },
      {
        t: "far fa-arrow-alt-from-bottom",
        sT: [],
      },
      {
        t: "fal fa-arrow-alt-from-bottom",
        sT: [],
      },
      {
        t: "fad fa-arrow-alt-from-bottom",
        sT: [],
      },
      {
        t: "fas fa-arrow-alt-from-left",
        sT: [],
      },
      {
        t: "far fa-arrow-alt-from-left",
        sT: [],
      },
      {
        t: "fal fa-arrow-alt-from-left",
        sT: [],
      },
      {
        t: "fad fa-arrow-alt-from-left",
        sT: [],
      },
      {
        t: "fas fa-arrow-alt-from-right",
        sT: [],
      },
      {
        t: "far fa-arrow-alt-from-right",
        sT: [],
      },
      {
        t: "fal fa-arrow-alt-from-right",
        sT: [],
      },
      {
        t: "fad fa-arrow-alt-from-right",
        sT: [],
      },
      {
        t: "fas fa-arrow-alt-from-top",
        sT: [],
      },
      {
        t: "far fa-arrow-alt-from-top",
        sT: [],
      },
      {
        t: "fal fa-arrow-alt-from-top",
        sT: [],
      },
      {
        t: "fad fa-arrow-alt-from-top",
        sT: [],
      },
      {
        t: "fas fa-arrow-alt-left",
        sT: [],
      },
      {
        t: "far fa-arrow-alt-left",
        sT: [],
      },
      {
        t: "fal fa-arrow-alt-left",
        sT: [],
      },
      {
        t: "fad fa-arrow-alt-left",
        sT: [],
      },
      {
        t: "fas fa-arrow-alt-right",
        sT: [],
      },
      {
        t: "far fa-arrow-alt-right",
        sT: [],
      },
      {
        t: "fal fa-arrow-alt-right",
        sT: [],
      },
      {
        t: "fad fa-arrow-alt-right",
        sT: [],
      },
      {
        t: "fas fa-arrow-alt-square-down",
        sT: [],
      },
      {
        t: "far fa-arrow-alt-square-down",
        sT: [],
      },
      {
        t: "fal fa-arrow-alt-square-down",
        sT: [],
      },
      {
        t: "fad fa-arrow-alt-square-down",
        sT: [],
      },
      {
        t: "fas fa-arrow-alt-square-left",
        sT: [],
      },
      {
        t: "far fa-arrow-alt-square-left",
        sT: [],
      },
      {
        t: "fal fa-arrow-alt-square-left",
        sT: [],
      },
      {
        t: "fad fa-arrow-alt-square-left",
        sT: [],
      },
      {
        t: "fas fa-arrow-alt-square-right",
        sT: [],
      },
      {
        t: "far fa-arrow-alt-square-right",
        sT: [],
      },
      {
        t: "fal fa-arrow-alt-square-right",
        sT: [],
      },
      {
        t: "fad fa-arrow-alt-square-right",
        sT: [],
      },
      {
        t: "fas fa-arrow-alt-square-up",
        sT: [],
      },
      {
        t: "far fa-arrow-alt-square-up",
        sT: [],
      },
      {
        t: "fal fa-arrow-alt-square-up",
        sT: [],
      },
      {
        t: "fad fa-arrow-alt-square-up",
        sT: [],
      },
      {
        t: "fas fa-arrow-alt-to-bottom",
        sT: [],
      },
      {
        t: "far fa-arrow-alt-to-bottom",
        sT: [],
      },
      {
        t: "fal fa-arrow-alt-to-bottom",
        sT: [],
      },
      {
        t: "fad fa-arrow-alt-to-bottom",
        sT: [],
      },
      {
        t: "fas fa-arrow-alt-to-left",
        sT: [],
      },
      {
        t: "far fa-arrow-alt-to-left",
        sT: [],
      },
      {
        t: "fal fa-arrow-alt-to-left",
        sT: [],
      },
      {
        t: "fad fa-arrow-alt-to-left",
        sT: [],
      },
      {
        t: "fas fa-arrow-alt-to-right",
        sT: [],
      },
      {
        t: "far fa-arrow-alt-to-right",
        sT: [],
      },
      {
        t: "fal fa-arrow-alt-to-right",
        sT: [],
      },
      {
        t: "fad fa-arrow-alt-to-right",
        sT: [],
      },
      {
        t: "fas fa-arrow-alt-to-top",
        sT: [],
      },
      {
        t: "far fa-arrow-alt-to-top",
        sT: [],
      },
      {
        t: "fal fa-arrow-alt-to-top",
        sT: [],
      },
      {
        t: "fad fa-arrow-alt-to-top",
        sT: [],
      },
      {
        t: "fas fa-arrow-alt-up",
        sT: [],
      },
      {
        t: "far fa-arrow-alt-up",
        sT: [],
      },
      {
        t: "fal fa-arrow-alt-up",
        sT: [],
      },
      {
        t: "fad fa-arrow-alt-up",
        sT: [],
      },
      {
        t: "fas fa-arrow-circle-down",
        sT: [],
      },
      {
        t: "far fa-arrow-circle-down",
        sT: [],
      },
      {
        t: "fal fa-arrow-circle-down",
        sT: [],
      },
      {
        t: "fad fa-arrow-circle-down",
        sT: [],
      },
      {
        t: "fas fa-arrow-circle-left",
        sT: [],
      },
      {
        t: "far fa-arrow-circle-left",
        sT: [],
      },
      {
        t: "fal fa-arrow-circle-left",
        sT: [],
      },
      {
        t: "fad fa-arrow-circle-left",
        sT: [],
      },
      {
        t: "fas fa-arrow-circle-right",
        sT: [],
      },
      {
        t: "far fa-arrow-circle-right",
        sT: [],
      },
      {
        t: "fal fa-arrow-circle-right",
        sT: [],
      },
      {
        t: "fad fa-arrow-circle-right",
        sT: [],
      },
      {
        t: "fas fa-arrow-circle-up",
        sT: [],
      },
      {
        t: "far fa-arrow-circle-up",
        sT: [],
      },
      {
        t: "fal fa-arrow-circle-up",
        sT: [],
      },
      {
        t: "fad fa-arrow-circle-up",
        sT: [],
      },
      {
        t: "fas fa-arrow-down",
        sT: [],
      },
      {
        t: "far fa-arrow-down",
        sT: [],
      },
      {
        t: "fal fa-arrow-down",
        sT: [],
      },
      {
        t: "fad fa-arrow-down",
        sT: [],
      },
      {
        t: "fas fa-arrow-from-bottom",
        sT: [],
      },
      {
        t: "far fa-arrow-from-bottom",
        sT: [],
      },
      {
        t: "fal fa-arrow-from-bottom",
        sT: [],
      },
      {
        t: "fad fa-arrow-from-bottom",
        sT: [],
      },
      {
        t: "fas fa-arrow-from-left",
        sT: [],
      },
      {
        t: "far fa-arrow-from-left",
        sT: [],
      },
      {
        t: "fal fa-arrow-from-left",
        sT: [],
      },
      {
        t: "fad fa-arrow-from-left",
        sT: [],
      },
      {
        t: "fas fa-arrow-from-right",
        sT: [],
      },
      {
        t: "far fa-arrow-from-right",
        sT: [],
      },
      {
        t: "fal fa-arrow-from-right",
        sT: [],
      },
      {
        t: "fad fa-arrow-from-right",
        sT: [],
      },
      {
        t: "fas fa-arrow-from-top",
        sT: [],
      },
      {
        t: "far fa-arrow-from-top",
        sT: [],
      },
      {
        t: "fal fa-arrow-from-top",
        sT: [],
      },
      {
        t: "fad fa-arrow-from-top",
        sT: [],
      },
      {
        t: "fas fa-arrow-left",
        sT: [],
      },
      {
        t: "far fa-arrow-left",
        sT: [],
      },
      {
        t: "fal fa-arrow-left",
        sT: [],
      },
      {
        t: "fad fa-arrow-left",
        sT: [],
      },
      {
        t: "fas fa-arrow-right",
        sT: [],
      },
      {
        t: "far fa-arrow-right",
        sT: [],
      },
      {
        t: "fal fa-arrow-right",
        sT: [],
      },
      {
        t: "fad fa-arrow-right",
        sT: [],
      },
      {
        t: "fas fa-arrow-square-down",
        sT: [],
      },
      {
        t: "far fa-arrow-square-down",
        sT: [],
      },
      {
        t: "fal fa-arrow-square-down",
        sT: [],
      },
      {
        t: "fad fa-arrow-square-down",
        sT: [],
      },
      {
        t: "fas fa-arrow-square-left",
        sT: [],
      },
      {
        t: "far fa-arrow-square-left",
        sT: [],
      },
      {
        t: "fal fa-arrow-square-left",
        sT: [],
      },
      {
        t: "fad fa-arrow-square-left",
        sT: [],
      },
      {
        t: "fas fa-arrow-square-right",
        sT: [],
      },
      {
        t: "far fa-arrow-square-right",
        sT: [],
      },
      {
        t: "fal fa-arrow-square-right",
        sT: [],
      },
      {
        t: "fad fa-arrow-square-right",
        sT: [],
      },
      {
        t: "fas fa-arrow-square-up",
        sT: [],
      },
      {
        t: "far fa-arrow-square-up",
        sT: [],
      },
      {
        t: "fal fa-arrow-square-up",
        sT: [],
      },
      {
        t: "fad fa-arrow-square-up",
        sT: [],
      },
      {
        t: "fas fa-arrow-to-bottom",
        sT: [],
      },
      {
        t: "far fa-arrow-to-bottom",
        sT: [],
      },
      {
        t: "fal fa-arrow-to-bottom",
        sT: [],
      },
      {
        t: "fad fa-arrow-to-bottom",
        sT: [],
      },
      {
        t: "fas fa-arrow-to-left",
        sT: [],
      },
      {
        t: "far fa-arrow-to-left",
        sT: [],
      },
      {
        t: "fal fa-arrow-to-left",
        sT: [],
      },
      {
        t: "fad fa-arrow-to-left",
        sT: [],
      },
      {
        t: "fas fa-arrow-to-right",
        sT: [],
      },
      {
        t: "far fa-arrow-to-right",
        sT: [],
      },
      {
        t: "fal fa-arrow-to-right",
        sT: [],
      },
      {
        t: "fad fa-arrow-to-right",
        sT: [],
      },
      {
        t: "fas fa-arrow-to-top",
        sT: [],
      },
      {
        t: "far fa-arrow-to-top",
        sT: [],
      },
      {
        t: "fal fa-arrow-to-top",
        sT: [],
      },
      {
        t: "fad fa-arrow-to-top",
        sT: [],
      },
      {
        t: "fas fa-arrow-up",
        sT: [],
      },
      {
        t: "far fa-arrow-up",
        sT: [],
      },
      {
        t: "fal fa-arrow-up",
        sT: [],
      },
      {
        t: "fad fa-arrow-up",
        sT: [],
      },
      {
        t: "fas fa-arrows",
        sT: [],
      },
      {
        t: "far fa-arrows",
        sT: [],
      },
      {
        t: "fal fa-arrows",
        sT: [],
      },
      {
        t: "fad fa-arrows",
        sT: [],
      },
      {
        t: "fas fa-arrows-alt",
        sT: [],
      },
      {
        t: "far fa-arrows-alt",
        sT: [],
      },
      {
        t: "fal fa-arrows-alt",
        sT: [],
      },
      {
        t: "fad fa-arrows-alt",
        sT: [],
      },
      {
        t: "fas fa-arrows-alt-h",
        sT: [],
      },
      {
        t: "far fa-arrows-alt-h",
        sT: [],
      },
      {
        t: "fal fa-arrows-alt-h",
        sT: [],
      },
      {
        t: "fad fa-arrows-alt-h",
        sT: [],
      },
      {
        t: "fas fa-arrows-alt-v",
        sT: [],
      },
      {
        t: "far fa-arrows-alt-v",
        sT: [],
      },
      {
        t: "fal fa-arrows-alt-v",
        sT: [],
      },
      {
        t: "fad fa-arrows-alt-v",
        sT: [],
      },
      {
        t: "fas fa-arrows-h",
        sT: [],
      },
      {
        t: "far fa-arrows-h",
        sT: [],
      },
      {
        t: "fal fa-arrows-h",
        sT: [],
      },
      {
        t: "fad fa-arrows-h",
        sT: [],
      },
      {
        t: "fas fa-arrows-v",
        sT: [],
      },
      {
        t: "far fa-arrows-v",
        sT: [],
      },
      {
        t: "fal fa-arrows-v",
        sT: [],
      },
      {
        t: "fad fa-arrows-v",
        sT: [],
      },
      {
        t: "fab fa-artstation",
        sT: [],
      },
      {
        t: "fas fa-assistive-listening-systems",
        sT: [],
      },
      {
        t: "far fa-assistive-listening-systems",
        sT: [],
      },
      {
        t: "fal fa-assistive-listening-systems",
        sT: [],
      },
      {
        t: "fad fa-assistive-listening-systems",
        sT: [],
      },
      {
        t: "fas fa-asterisk",
        sT: [],
      },
      {
        t: "far fa-asterisk",
        sT: [],
      },
      {
        t: "fal fa-asterisk",
        sT: [],
      },
      {
        t: "fad fa-asterisk",
        sT: [],
      },
      {
        t: "fab fa-asymmetrik",
        sT: [],
      },
      {
        t: "fas fa-at",
        sT: [],
      },
      {
        t: "far fa-at",
        sT: [],
      },
      {
        t: "fal fa-at",
        sT: [],
      },
      {
        t: "fad fa-at",
        sT: [],
      },
      {
        t: "fas fa-atlas",
        sT: [],
      },
      {
        t: "far fa-atlas",
        sT: [],
      },
      {
        t: "fal fa-atlas",
        sT: [],
      },
      {
        t: "fad fa-atlas",
        sT: [],
      },
      {
        t: "fab fa-atlassian",
        sT: [],
      },
      {
        t: "fas fa-atom",
        sT: [],
      },
      {
        t: "far fa-atom",
        sT: [],
      },
      {
        t: "fal fa-atom",
        sT: [],
      },
      {
        t: "fad fa-atom",
        sT: [],
      },
      {
        t: "fas fa-atom-alt",
        sT: [],
      },
      {
        t: "far fa-atom-alt",
        sT: [],
      },
      {
        t: "fal fa-atom-alt",
        sT: [],
      },
      {
        t: "fad fa-atom-alt",
        sT: [],
      },
      {
        t: "fab fa-audible",
        sT: [],
      },
      {
        t: "fas fa-audio-description",
        sT: [],
      },
      {
        t: "far fa-audio-description",
        sT: [],
      },
      {
        t: "fal fa-audio-description",
        sT: [],
      },
      {
        t: "fad fa-audio-description",
        sT: [],
      },
      {
        t: "fab fa-autoprefixer",
        sT: [],
      },
      {
        t: "fab fa-avianex",
        sT: [],
      },
      {
        t: "fab fa-aviato",
        sT: [],
      },
      {
        t: "fas fa-award",
        sT: [],
      },
      {
        t: "far fa-award",
        sT: [],
      },
      {
        t: "fal fa-award",
        sT: [],
      },
      {
        t: "fad fa-award",
        sT: [],
      },
      {
        t: "fab fa-aws",
        sT: [],
      },
      {
        t: "fas fa-axe",
        sT: [],
      },
      {
        t: "far fa-axe",
        sT: [],
      },
      {
        t: "fal fa-axe",
        sT: [],
      },
      {
        t: "fad fa-axe",
        sT: [],
      },
      {
        t: "fas fa-axe-battle",
        sT: [],
      },
      {
        t: "far fa-axe-battle",
        sT: [],
      },
      {
        t: "fal fa-axe-battle",
        sT: [],
      },
      {
        t: "fad fa-axe-battle",
        sT: [],
      },
      {
        t: "fas fa-baby",
        sT: [],
      },
      {
        t: "far fa-baby",
        sT: [],
      },
      {
        t: "fal fa-baby",
        sT: [],
      },
      {
        t: "fad fa-baby",
        sT: [],
      },
      {
        t: "fas fa-baby-carriage",
        sT: [],
      },
      {
        t: "far fa-baby-carriage",
        sT: [],
      },
      {
        t: "fal fa-baby-carriage",
        sT: [],
      },
      {
        t: "fad fa-baby-carriage",
        sT: [],
      },
      {
        t: "fas fa-backpack",
        sT: [],
      },
      {
        t: "far fa-backpack",
        sT: [],
      },
      {
        t: "fal fa-backpack",
        sT: [],
      },
      {
        t: "fad fa-backpack",
        sT: [],
      },
      {
        t: "fas fa-backspace",
        sT: [],
      },
      {
        t: "far fa-backspace",
        sT: [],
      },
      {
        t: "fal fa-backspace",
        sT: [],
      },
      {
        t: "fad fa-backspace",
        sT: [],
      },
      {
        t: "fas fa-backward",
        sT: [],
      },
      {
        t: "far fa-backward",
        sT: [],
      },
      {
        t: "fal fa-backward",
        sT: [],
      },
      {
        t: "fad fa-backward",
        sT: [],
      },
      {
        t: "fas fa-bacon",
        sT: [],
      },
      {
        t: "far fa-bacon",
        sT: [],
      },
      {
        t: "fal fa-bacon",
        sT: [],
      },
      {
        t: "fad fa-bacon",
        sT: [],
      },
      {
        t: "fal fa-bacteria",
        sT: [],
      },
      {
        t: "far fa-bacteria",
        sT: [],
      },
      {
        t: "fas fa-bacteria",
        sT: [],
      },
      {
        t: "fad fa-bacteria",
        sT: [],
      },
      {
        t: "fal fa-bacterium",
        sT: [],
      },
      {
        t: "far fa-bacterium",
        sT: [],
      },
      {
        t: "fas fa-bacterium",
        sT: [],
      },
      {
        t: "fad fa-bacterium",
        sT: [],
      },
      {
        t: "fas fa-badge",
        sT: [],
      },
      {
        t: "far fa-badge",
        sT: [],
      },
      {
        t: "fal fa-badge",
        sT: [],
      },
      {
        t: "fad fa-badge",
        sT: [],
      },
      {
        t: "fas fa-badge-check",
        sT: [],
      },
      {
        t: "far fa-badge-check",
        sT: [],
      },
      {
        t: "fal fa-badge-check",
        sT: [],
      },
      {
        t: "fad fa-badge-check",
        sT: [],
      },
      {
        t: "fas fa-badge-dollar",
        sT: [],
      },
      {
        t: "far fa-badge-dollar",
        sT: [],
      },
      {
        t: "fal fa-badge-dollar",
        sT: [],
      },
      {
        t: "fad fa-badge-dollar",
        sT: [],
      },
      {
        t: "fas fa-badge-percent",
        sT: [],
      },
      {
        t: "far fa-badge-percent",
        sT: [],
      },
      {
        t: "fal fa-badge-percent",
        sT: [],
      },
      {
        t: "fad fa-badge-percent",
        sT: [],
      },
      {
        t: "fal fa-badge-sheriff",
        sT: [],
      },
      {
        t: "far fa-badge-sheriff",
        sT: [],
      },
      {
        t: "fas fa-badge-sheriff",
        sT: [],
      },
      {
        t: "fad fa-badge-sheriff",
        sT: [],
      },
      {
        t: "fas fa-badger-honey",
        sT: [],
      },
      {
        t: "far fa-badger-honey",
        sT: [],
      },
      {
        t: "fal fa-badger-honey",
        sT: [],
      },
      {
        t: "fad fa-badger-honey",
        sT: [],
      },
      {
        t: "fas fa-bags-shopping",
        sT: [],
      },
      {
        t: "far fa-bags-shopping",
        sT: [],
      },
      {
        t: "fal fa-bags-shopping",
        sT: [],
      },
      {
        t: "fad fa-bags-shopping",
        sT: [],
      },
      {
        t: "fas fa-bahai",
        sT: [],
      },
      {
        t: "far fa-bahai",
        sT: [],
      },
      {
        t: "fal fa-bahai",
        sT: [],
      },
      {
        t: "fad fa-bahai",
        sT: [],
      },
      {
        t: "fas fa-balance-scale",
        sT: [],
      },
      {
        t: "far fa-balance-scale",
        sT: [],
      },
      {
        t: "fal fa-balance-scale",
        sT: [],
      },
      {
        t: "fad fa-balance-scale",
        sT: [],
      },
      {
        t: "fas fa-balance-scale-left",
        sT: [],
      },
      {
        t: "far fa-balance-scale-left",
        sT: [],
      },
      {
        t: "fal fa-balance-scale-left",
        sT: [],
      },
      {
        t: "fad fa-balance-scale-left",
        sT: [],
      },
      {
        t: "fas fa-balance-scale-right",
        sT: [],
      },
      {
        t: "far fa-balance-scale-right",
        sT: [],
      },
      {
        t: "fal fa-balance-scale-right",
        sT: [],
      },
      {
        t: "fad fa-balance-scale-right",
        sT: [],
      },
      {
        t: "fas fa-ball-pile",
        sT: [],
      },
      {
        t: "far fa-ball-pile",
        sT: [],
      },
      {
        t: "fal fa-ball-pile",
        sT: [],
      },
      {
        t: "fad fa-ball-pile",
        sT: [],
      },
      {
        t: "fas fa-ballot",
        sT: [],
      },
      {
        t: "far fa-ballot",
        sT: [],
      },
      {
        t: "fal fa-ballot",
        sT: [],
      },
      {
        t: "fad fa-ballot",
        sT: [],
      },
      {
        t: "fas fa-ballot-check",
        sT: [],
      },
      {
        t: "far fa-ballot-check",
        sT: [],
      },
      {
        t: "fal fa-ballot-check",
        sT: [],
      },
      {
        t: "fad fa-ballot-check",
        sT: [],
      },
      {
        t: "fas fa-ban",
        sT: [],
      },
      {
        t: "far fa-ban",
        sT: [],
      },
      {
        t: "fal fa-ban",
        sT: [],
      },
      {
        t: "fad fa-ban",
        sT: [],
      },
      {
        t: "fas fa-band-aid",
        sT: [],
      },
      {
        t: "far fa-band-aid",
        sT: [],
      },
      {
        t: "fal fa-band-aid",
        sT: [],
      },
      {
        t: "fad fa-band-aid",
        sT: [],
      },
      {
        t: "fab fa-bandcamp",
        sT: [],
      },
      {
        t: "fas fa-banjo",
        sT: [],
      },
      {
        t: "far fa-banjo",
        sT: [],
      },
      {
        t: "fal fa-banjo",
        sT: [],
      },
      {
        t: "fad fa-banjo",
        sT: [],
      },
      {
        t: "fas fa-barcode",
        sT: [],
      },
      {
        t: "far fa-barcode",
        sT: [],
      },
      {
        t: "fal fa-barcode",
        sT: [],
      },
      {
        t: "fad fa-barcode",
        sT: [],
      },
      {
        t: "fas fa-barcode-alt",
        sT: [],
      },
      {
        t: "far fa-barcode-alt",
        sT: [],
      },
      {
        t: "fal fa-barcode-alt",
        sT: [],
      },
      {
        t: "fad fa-barcode-alt",
        sT: [],
      },
      {
        t: "fas fa-barcode-read",
        sT: [],
      },
      {
        t: "far fa-barcode-read",
        sT: [],
      },
      {
        t: "fal fa-barcode-read",
        sT: [],
      },
      {
        t: "fad fa-barcode-read",
        sT: [],
      },
      {
        t: "fas fa-barcode-scan",
        sT: [],
      },
      {
        t: "far fa-barcode-scan",
        sT: [],
      },
      {
        t: "fal fa-barcode-scan",
        sT: [],
      },
      {
        t: "fad fa-barcode-scan",
        sT: [],
      },
      {
        t: "fas fa-bars",
        sT: [],
      },
      {
        t: "far fa-bars",
        sT: [],
      },
      {
        t: "fal fa-bars",
        sT: [],
      },
      {
        t: "fad fa-bars",
        sT: [],
      },
      {
        t: "fas fa-baseball",
        sT: [],
      },
      {
        t: "far fa-baseball",
        sT: [],
      },
      {
        t: "fal fa-baseball",
        sT: [],
      },
      {
        t: "fad fa-baseball",
        sT: [],
      },
      {
        t: "fas fa-baseball-ball",
        sT: [],
      },
      {
        t: "far fa-baseball-ball",
        sT: [],
      },
      {
        t: "fal fa-baseball-ball",
        sT: [],
      },
      {
        t: "fad fa-baseball-ball",
        sT: [],
      },
      {
        t: "fas fa-basketball-ball",
        sT: [],
      },
      {
        t: "far fa-basketball-ball",
        sT: [],
      },
      {
        t: "fal fa-basketball-ball",
        sT: [],
      },
      {
        t: "fad fa-basketball-ball",
        sT: [],
      },
      {
        t: "fas fa-basketball-hoop",
        sT: [],
      },
      {
        t: "far fa-basketball-hoop",
        sT: [],
      },
      {
        t: "fal fa-basketball-hoop",
        sT: [],
      },
      {
        t: "fad fa-basketball-hoop",
        sT: [],
      },
      {
        t: "fas fa-bat",
        sT: [],
      },
      {
        t: "far fa-bat",
        sT: [],
      },
      {
        t: "fal fa-bat",
        sT: [],
      },
      {
        t: "fad fa-bat",
        sT: [],
      },
      {
        t: "fas fa-bath",
        sT: [],
      },
      {
        t: "far fa-bath",
        sT: [],
      },
      {
        t: "fal fa-bath",
        sT: [],
      },
      {
        t: "fad fa-bath",
        sT: [],
      },
      {
        t: "fas fa-battery-bolt",
        sT: [],
      },
      {
        t: "far fa-battery-bolt",
        sT: [],
      },
      {
        t: "fal fa-battery-bolt",
        sT: [],
      },
      {
        t: "fad fa-battery-bolt",
        sT: [],
      },
      {
        t: "fas fa-battery-empty",
        sT: [],
      },
      {
        t: "far fa-battery-empty",
        sT: [],
      },
      {
        t: "fal fa-battery-empty",
        sT: [],
      },
      {
        t: "fad fa-battery-empty",
        sT: [],
      },
      {
        t: "fas fa-battery-full",
        sT: [],
      },
      {
        t: "far fa-battery-full",
        sT: [],
      },
      {
        t: "fal fa-battery-full",
        sT: [],
      },
      {
        t: "fad fa-battery-full",
        sT: [],
      },
      {
        t: "fas fa-battery-half",
        sT: [],
      },
      {
        t: "far fa-battery-half",
        sT: [],
      },
      {
        t: "fal fa-battery-half",
        sT: [],
      },
      {
        t: "fad fa-battery-half",
        sT: [],
      },
      {
        t: "fas fa-battery-quarter",
        sT: [],
      },
      {
        t: "far fa-battery-quarter",
        sT: [],
      },
      {
        t: "fal fa-battery-quarter",
        sT: [],
      },
      {
        t: "fad fa-battery-quarter",
        sT: [],
      },
      {
        t: "fas fa-battery-slash",
        sT: [],
      },
      {
        t: "far fa-battery-slash",
        sT: [],
      },
      {
        t: "fal fa-battery-slash",
        sT: [],
      },
      {
        t: "fad fa-battery-slash",
        sT: [],
      },
      {
        t: "fas fa-battery-three-quarters",
        sT: [],
      },
      {
        t: "far fa-battery-three-quarters",
        sT: [],
      },
      {
        t: "fal fa-battery-three-quarters",
        sT: [],
      },
      {
        t: "fad fa-battery-three-quarters",
        sT: [],
      },
      {
        t: "fab fa-battle-net",
        sT: [],
      },
      {
        t: "fas fa-bed",
        sT: [],
      },
      {
        t: "far fa-bed",
        sT: [],
      },
      {
        t: "fal fa-bed",
        sT: [],
      },
      {
        t: "fad fa-bed",
        sT: [],
      },
      {
        t: "fas fa-bed-alt",
        sT: [],
      },
      {
        t: "far fa-bed-alt",
        sT: [],
      },
      {
        t: "fal fa-bed-alt",
        sT: [],
      },
      {
        t: "fad fa-bed-alt",
        sT: [],
      },
      {
        t: "fas fa-bed-bunk",
        sT: [],
      },
      {
        t: "far fa-bed-bunk",
        sT: [],
      },
      {
        t: "fal fa-bed-bunk",
        sT: [],
      },
      {
        t: "fad fa-bed-bunk",
        sT: [],
      },
      {
        t: "fas fa-bed-empty",
        sT: [],
      },
      {
        t: "far fa-bed-empty",
        sT: [],
      },
      {
        t: "fal fa-bed-empty",
        sT: [],
      },
      {
        t: "fad fa-bed-empty",
        sT: [],
      },
      {
        t: "fas fa-beer",
        sT: [],
      },
      {
        t: "far fa-beer",
        sT: [],
      },
      {
        t: "fal fa-beer",
        sT: [],
      },
      {
        t: "fad fa-beer",
        sT: [],
      },
      {
        t: "fab fa-behance",
        sT: [],
      },
      {
        t: "fab fa-behance-square",
        sT: [],
      },
      {
        t: "fas fa-bell",
        sT: [],
      },
      {
        t: "far fa-bell",
        sT: [],
      },
      {
        t: "fal fa-bell",
        sT: [],
      },
      {
        t: "fad fa-bell",
        sT: [],
      },
      {
        t: "fas fa-bell-exclamation",
        sT: [],
      },
      {
        t: "far fa-bell-exclamation",
        sT: [],
      },
      {
        t: "fal fa-bell-exclamation",
        sT: [],
      },
      {
        t: "fad fa-bell-exclamation",
        sT: [],
      },
      {
        t: "fas fa-bell-on",
        sT: [],
      },
      {
        t: "far fa-bell-on",
        sT: [],
      },
      {
        t: "fal fa-bell-on",
        sT: [],
      },
      {
        t: "fad fa-bell-on",
        sT: [],
      },
      {
        t: "fas fa-bell-plus",
        sT: [],
      },
      {
        t: "far fa-bell-plus",
        sT: [],
      },
      {
        t: "fal fa-bell-plus",
        sT: [],
      },
      {
        t: "fad fa-bell-plus",
        sT: [],
      },
      {
        t: "fas fa-bell-school",
        sT: [],
      },
      {
        t: "far fa-bell-school",
        sT: [],
      },
      {
        t: "fal fa-bell-school",
        sT: [],
      },
      {
        t: "fad fa-bell-school",
        sT: [],
      },
      {
        t: "fas fa-bell-school-slash",
        sT: [],
      },
      {
        t: "far fa-bell-school-slash",
        sT: [],
      },
      {
        t: "fal fa-bell-school-slash",
        sT: [],
      },
      {
        t: "fad fa-bell-school-slash",
        sT: [],
      },
      {
        t: "fas fa-bell-slash",
        sT: [],
      },
      {
        t: "far fa-bell-slash",
        sT: [],
      },
      {
        t: "fal fa-bell-slash",
        sT: [],
      },
      {
        t: "fad fa-bell-slash",
        sT: [],
      },
      {
        t: "fas fa-bells",
        sT: [],
      },
      {
        t: "far fa-bells",
        sT: [],
      },
      {
        t: "fal fa-bells",
        sT: [],
      },
      {
        t: "fad fa-bells",
        sT: [],
      },
      {
        t: "fas fa-betamax",
        sT: [],
      },
      {
        t: "far fa-betamax",
        sT: [],
      },
      {
        t: "fal fa-betamax",
        sT: [],
      },
      {
        t: "fad fa-betamax",
        sT: [],
      },
      {
        t: "fas fa-bezier-curve",
        sT: [],
      },
      {
        t: "far fa-bezier-curve",
        sT: [],
      },
      {
        t: "fal fa-bezier-curve",
        sT: [],
      },
      {
        t: "fad fa-bezier-curve",
        sT: [],
      },
      {
        t: "fas fa-bible",
        sT: [],
      },
      {
        t: "far fa-bible",
        sT: [],
      },
      {
        t: "fal fa-bible",
        sT: [],
      },
      {
        t: "fad fa-bible",
        sT: [],
      },
      {
        t: "fas fa-bicycle",
        sT: [],
      },
      {
        t: "far fa-bicycle",
        sT: [],
      },
      {
        t: "fal fa-bicycle",
        sT: [],
      },
      {
        t: "fad fa-bicycle",
        sT: [],
      },
      {
        t: "fas fa-biking",
        sT: [],
      },
      {
        t: "far fa-biking",
        sT: [],
      },
      {
        t: "fal fa-biking",
        sT: [],
      },
      {
        t: "fad fa-biking",
        sT: [],
      },
      {
        t: "fas fa-biking-mountain",
        sT: [],
      },
      {
        t: "far fa-biking-mountain",
        sT: [],
      },
      {
        t: "fal fa-biking-mountain",
        sT: [],
      },
      {
        t: "fad fa-biking-mountain",
        sT: [],
      },
      {
        t: "fab fa-bimobject",
        sT: [],
      },
      {
        t: "fas fa-binoculars",
        sT: [],
      },
      {
        t: "far fa-binoculars",
        sT: [],
      },
      {
        t: "fal fa-binoculars",
        sT: [],
      },
      {
        t: "fad fa-binoculars",
        sT: [],
      },
      {
        t: "fas fa-biohazard",
        sT: [],
      },
      {
        t: "far fa-biohazard",
        sT: [],
      },
      {
        t: "fal fa-biohazard",
        sT: [],
      },
      {
        t: "fad fa-biohazard",
        sT: [],
      },
      {
        t: "fas fa-birthday-cake",
        sT: [],
      },
      {
        t: "far fa-birthday-cake",
        sT: [],
      },
      {
        t: "fal fa-birthday-cake",
        sT: [],
      },
      {
        t: "fad fa-birthday-cake",
        sT: [],
      },
      {
        t: "fab fa-bitbucket",
        sT: [],
      },
      {
        t: "fab fa-bitcoin",
        sT: [],
      },
      {
        t: "fab fa-bity",
        sT: [],
      },
      {
        t: "fab fa-black-tie",
        sT: [],
      },
      {
        t: "fab fa-blackberry",
        sT: [],
      },
      {
        t: "fas fa-blanket",
        sT: [],
      },
      {
        t: "far fa-blanket",
        sT: [],
      },
      {
        t: "fal fa-blanket",
        sT: [],
      },
      {
        t: "fad fa-blanket",
        sT: [],
      },
      {
        t: "fas fa-blender",
        sT: [],
      },
      {
        t: "far fa-blender",
        sT: [],
      },
      {
        t: "fal fa-blender",
        sT: [],
      },
      {
        t: "fad fa-blender",
        sT: [],
      },
      {
        t: "fas fa-blender-phone",
        sT: [],
      },
      {
        t: "far fa-blender-phone",
        sT: [],
      },
      {
        t: "fal fa-blender-phone",
        sT: [],
      },
      {
        t: "fad fa-blender-phone",
        sT: [],
      },
      {
        t: "fas fa-blind",
        sT: [],
      },
      {
        t: "far fa-blind",
        sT: [],
      },
      {
        t: "fal fa-blind",
        sT: [],
      },
      {
        t: "fad fa-blind",
        sT: [],
      },
      {
        t: "fas fa-blinds",
        sT: [],
      },
      {
        t: "far fa-blinds",
        sT: [],
      },
      {
        t: "fal fa-blinds",
        sT: [],
      },
      {
        t: "fad fa-blinds",
        sT: [],
      },
      {
        t: "fas fa-blinds-open",
        sT: [],
      },
      {
        t: "far fa-blinds-open",
        sT: [],
      },
      {
        t: "fal fa-blinds-open",
        sT: [],
      },
      {
        t: "fad fa-blinds-open",
        sT: [],
      },
      {
        t: "fas fa-blinds-raised",
        sT: [],
      },
      {
        t: "far fa-blinds-raised",
        sT: [],
      },
      {
        t: "fal fa-blinds-raised",
        sT: [],
      },
      {
        t: "fad fa-blinds-raised",
        sT: [],
      },
      {
        t: "fas fa-blog",
        sT: [],
      },
      {
        t: "far fa-blog",
        sT: [],
      },
      {
        t: "fal fa-blog",
        sT: [],
      },
      {
        t: "fad fa-blog",
        sT: [],
      },
      {
        t: "fab fa-blogger",
        sT: [],
      },
      {
        t: "fab fa-blogger-b",
        sT: [],
      },
      {
        t: "fab fa-bluetooth",
        sT: [],
      },
      {
        t: "fab fa-bluetooth-b",
        sT: [],
      },
      {
        t: "fas fa-bold",
        sT: [],
      },
      {
        t: "far fa-bold",
        sT: [],
      },
      {
        t: "fal fa-bold",
        sT: [],
      },
      {
        t: "fad fa-bold",
        sT: [],
      },
      {
        t: "fas fa-bolt",
        sT: [],
      },
      {
        t: "far fa-bolt",
        sT: [],
      },
      {
        t: "fal fa-bolt",
        sT: [],
      },
      {
        t: "fad fa-bolt",
        sT: [],
      },
      {
        t: "fas fa-bomb",
        sT: [],
      },
      {
        t: "far fa-bomb",
        sT: [],
      },
      {
        t: "fal fa-bomb",
        sT: [],
      },
      {
        t: "fad fa-bomb",
        sT: [],
      },
      {
        t: "fas fa-bone",
        sT: [],
      },
      {
        t: "far fa-bone",
        sT: [],
      },
      {
        t: "fal fa-bone",
        sT: [],
      },
      {
        t: "fad fa-bone",
        sT: [],
      },
      {
        t: "fas fa-bone-break",
        sT: [],
      },
      {
        t: "far fa-bone-break",
        sT: [],
      },
      {
        t: "fal fa-bone-break",
        sT: [],
      },
      {
        t: "fad fa-bone-break",
        sT: [],
      },
      {
        t: "fas fa-bong",
        sT: [],
      },
      {
        t: "far fa-bong",
        sT: [],
      },
      {
        t: "fal fa-bong",
        sT: [],
      },
      {
        t: "fad fa-bong",
        sT: [],
      },
      {
        t: "fas fa-book",
        sT: [],
      },
      {
        t: "far fa-book",
        sT: [],
      },
      {
        t: "fal fa-book",
        sT: [],
      },
      {
        t: "fad fa-book",
        sT: [],
      },
      {
        t: "fas fa-book-alt",
        sT: [],
      },
      {
        t: "far fa-book-alt",
        sT: [],
      },
      {
        t: "fal fa-book-alt",
        sT: [],
      },
      {
        t: "fad fa-book-alt",
        sT: [],
      },
      {
        t: "fas fa-book-dead",
        sT: [],
      },
      {
        t: "far fa-book-dead",
        sT: [],
      },
      {
        t: "fal fa-book-dead",
        sT: [],
      },
      {
        t: "fad fa-book-dead",
        sT: [],
      },
      {
        t: "fas fa-book-heart",
        sT: [],
      },
      {
        t: "far fa-book-heart",
        sT: [],
      },
      {
        t: "fal fa-book-heart",
        sT: [],
      },
      {
        t: "fad fa-book-heart",
        sT: [],
      },
      {
        t: "fas fa-book-medical",
        sT: [],
      },
      {
        t: "far fa-book-medical",
        sT: [],
      },
      {
        t: "fal fa-book-medical",
        sT: [],
      },
      {
        t: "fad fa-book-medical",
        sT: [],
      },
      {
        t: "fas fa-book-open",
        sT: [],
      },
      {
        t: "far fa-book-open",
        sT: [],
      },
      {
        t: "fal fa-book-open",
        sT: [],
      },
      {
        t: "fad fa-book-open",
        sT: [],
      },
      {
        t: "fas fa-book-reader",
        sT: [],
      },
      {
        t: "far fa-book-reader",
        sT: [],
      },
      {
        t: "fal fa-book-reader",
        sT: [],
      },
      {
        t: "fad fa-book-reader",
        sT: [],
      },
      {
        t: "fas fa-book-spells",
        sT: [],
      },
      {
        t: "far fa-book-spells",
        sT: [],
      },
      {
        t: "fal fa-book-spells",
        sT: [],
      },
      {
        t: "fad fa-book-spells",
        sT: [],
      },
      {
        t: "fas fa-book-user",
        sT: [],
      },
      {
        t: "far fa-book-user",
        sT: [],
      },
      {
        t: "fal fa-book-user",
        sT: [],
      },
      {
        t: "fad fa-book-user",
        sT: [],
      },
      {
        t: "fas fa-bookmark",
        sT: [],
      },
      {
        t: "far fa-bookmark",
        sT: [],
      },
      {
        t: "fal fa-bookmark",
        sT: [],
      },
      {
        t: "fad fa-bookmark",
        sT: [],
      },
      {
        t: "fas fa-books",
        sT: [],
      },
      {
        t: "far fa-books",
        sT: [],
      },
      {
        t: "fal fa-books",
        sT: [],
      },
      {
        t: "fad fa-books",
        sT: [],
      },
      {
        t: "fas fa-books-medical",
        sT: [],
      },
      {
        t: "far fa-books-medical",
        sT: [],
      },
      {
        t: "fal fa-books-medical",
        sT: [],
      },
      {
        t: "fad fa-books-medical",
        sT: [],
      },
      {
        t: "fas fa-boombox",
        sT: [],
      },
      {
        t: "far fa-boombox",
        sT: [],
      },
      {
        t: "fal fa-boombox",
        sT: [],
      },
      {
        t: "fad fa-boombox",
        sT: [],
      },
      {
        t: "fas fa-boot",
        sT: [],
      },
      {
        t: "far fa-boot",
        sT: [],
      },
      {
        t: "fal fa-boot",
        sT: [],
      },
      {
        t: "fad fa-boot",
        sT: [],
      },
      {
        t: "fas fa-booth-curtain",
        sT: [],
      },
      {
        t: "far fa-booth-curtain",
        sT: [],
      },
      {
        t: "fal fa-booth-curtain",
        sT: [],
      },
      {
        t: "fad fa-booth-curtain",
        sT: [],
      },
      {
        t: "fab fa-bootstrap",
        sT: [],
      },
      {
        t: "fas fa-border-all",
        sT: [],
      },
      {
        t: "far fa-border-all",
        sT: [],
      },
      {
        t: "fal fa-border-all",
        sT: [],
      },
      {
        t: "fad fa-border-all",
        sT: [],
      },
      {
        t: "fas fa-border-bottom",
        sT: [],
      },
      {
        t: "far fa-border-bottom",
        sT: [],
      },
      {
        t: "fal fa-border-bottom",
        sT: [],
      },
      {
        t: "fad fa-border-bottom",
        sT: [],
      },
      {
        t: "fas fa-border-center-h",
        sT: [],
      },
      {
        t: "far fa-border-center-h",
        sT: [],
      },
      {
        t: "fal fa-border-center-h",
        sT: [],
      },
      {
        t: "fad fa-border-center-h",
        sT: [],
      },
      {
        t: "fas fa-border-center-v",
        sT: [],
      },
      {
        t: "far fa-border-center-v",
        sT: [],
      },
      {
        t: "fal fa-border-center-v",
        sT: [],
      },
      {
        t: "fad fa-border-center-v",
        sT: [],
      },
      {
        t: "fas fa-border-inner",
        sT: [],
      },
      {
        t: "far fa-border-inner",
        sT: [],
      },
      {
        t: "fal fa-border-inner",
        sT: [],
      },
      {
        t: "fad fa-border-inner",
        sT: [],
      },
      {
        t: "fas fa-border-left",
        sT: [],
      },
      {
        t: "far fa-border-left",
        sT: [],
      },
      {
        t: "fal fa-border-left",
        sT: [],
      },
      {
        t: "fad fa-border-left",
        sT: [],
      },
      {
        t: "fas fa-border-none",
        sT: [],
      },
      {
        t: "far fa-border-none",
        sT: [],
      },
      {
        t: "fal fa-border-none",
        sT: [],
      },
      {
        t: "fad fa-border-none",
        sT: [],
      },
      {
        t: "fas fa-border-outer",
        sT: [],
      },
      {
        t: "far fa-border-outer",
        sT: [],
      },
      {
        t: "fal fa-border-outer",
        sT: [],
      },
      {
        t: "fad fa-border-outer",
        sT: [],
      },
      {
        t: "fas fa-border-right",
        sT: [],
      },
      {
        t: "far fa-border-right",
        sT: [],
      },
      {
        t: "fal fa-border-right",
        sT: [],
      },
      {
        t: "fad fa-border-right",
        sT: [],
      },
      {
        t: "fas fa-border-style",
        sT: [],
      },
      {
        t: "far fa-border-style",
        sT: [],
      },
      {
        t: "fal fa-border-style",
        sT: [],
      },
      {
        t: "fad fa-border-style",
        sT: [],
      },
      {
        t: "fas fa-border-style-alt",
        sT: [],
      },
      {
        t: "far fa-border-style-alt",
        sT: [],
      },
      {
        t: "fal fa-border-style-alt",
        sT: [],
      },
      {
        t: "fad fa-border-style-alt",
        sT: [],
      },
      {
        t: "fas fa-border-top",
        sT: [],
      },
      {
        t: "far fa-border-top",
        sT: [],
      },
      {
        t: "fal fa-border-top",
        sT: [],
      },
      {
        t: "fad fa-border-top",
        sT: [],
      },
      {
        t: "fas fa-bow-arrow",
        sT: [],
      },
      {
        t: "far fa-bow-arrow",
        sT: [],
      },
      {
        t: "fal fa-bow-arrow",
        sT: [],
      },
      {
        t: "fad fa-bow-arrow",
        sT: [],
      },
      {
        t: "fas fa-bowling-ball",
        sT: [],
      },
      {
        t: "far fa-bowling-ball",
        sT: [],
      },
      {
        t: "fal fa-bowling-ball",
        sT: [],
      },
      {
        t: "fad fa-bowling-ball",
        sT: [],
      },
      {
        t: "fas fa-bowling-pins",
        sT: [],
      },
      {
        t: "far fa-bowling-pins",
        sT: [],
      },
      {
        t: "fal fa-bowling-pins",
        sT: [],
      },
      {
        t: "fad fa-bowling-pins",
        sT: [],
      },
      {
        t: "fas fa-box",
        sT: [],
      },
      {
        t: "far fa-box",
        sT: [],
      },
      {
        t: "fal fa-box",
        sT: [],
      },
      {
        t: "fad fa-box",
        sT: [],
      },
      {
        t: "fas fa-box-alt",
        sT: [],
      },
      {
        t: "far fa-box-alt",
        sT: [],
      },
      {
        t: "fal fa-box-alt",
        sT: [],
      },
      {
        t: "fad fa-box-alt",
        sT: [],
      },
      {
        t: "fas fa-box-ballot",
        sT: [],
      },
      {
        t: "far fa-box-ballot",
        sT: [],
      },
      {
        t: "fal fa-box-ballot",
        sT: [],
      },
      {
        t: "fad fa-box-ballot",
        sT: [],
      },
      {
        t: "fas fa-box-check",
        sT: [],
      },
      {
        t: "far fa-box-check",
        sT: [],
      },
      {
        t: "fal fa-box-check",
        sT: [],
      },
      {
        t: "fad fa-box-check",
        sT: [],
      },
      {
        t: "fas fa-box-fragile",
        sT: [],
      },
      {
        t: "far fa-box-fragile",
        sT: [],
      },
      {
        t: "fal fa-box-fragile",
        sT: [],
      },
      {
        t: "fad fa-box-fragile",
        sT: [],
      },
      {
        t: "fas fa-box-full",
        sT: [],
      },
      {
        t: "far fa-box-full",
        sT: [],
      },
      {
        t: "fal fa-box-full",
        sT: [],
      },
      {
        t: "fad fa-box-full",
        sT: [],
      },
      {
        t: "fas fa-box-heart",
        sT: [],
      },
      {
        t: "far fa-box-heart",
        sT: [],
      },
      {
        t: "fal fa-box-heart",
        sT: [],
      },
      {
        t: "fad fa-box-heart",
        sT: [],
      },
      {
        t: "fas fa-box-open",
        sT: [],
      },
      {
        t: "far fa-box-open",
        sT: [],
      },
      {
        t: "fal fa-box-open",
        sT: [],
      },
      {
        t: "fad fa-box-open",
        sT: [],
      },
      {
        t: "fal fa-box-tissue",
        sT: [],
      },
      {
        t: "far fa-box-tissue",
        sT: [],
      },
      {
        t: "fas fa-box-tissue",
        sT: [],
      },
      {
        t: "fad fa-box-tissue",
        sT: [],
      },
      {
        t: "fas fa-box-up",
        sT: [],
      },
      {
        t: "far fa-box-up",
        sT: [],
      },
      {
        t: "fal fa-box-up",
        sT: [],
      },
      {
        t: "fad fa-box-up",
        sT: [],
      },
      {
        t: "fas fa-box-usd",
        sT: [],
      },
      {
        t: "far fa-box-usd",
        sT: [],
      },
      {
        t: "fal fa-box-usd",
        sT: [],
      },
      {
        t: "fad fa-box-usd",
        sT: [],
      },
      {
        t: "fas fa-boxes",
        sT: [],
      },
      {
        t: "far fa-boxes",
        sT: [],
      },
      {
        t: "fal fa-boxes",
        sT: [],
      },
      {
        t: "fad fa-boxes",
        sT: [],
      },
      {
        t: "fas fa-boxes-alt",
        sT: [],
      },
      {
        t: "far fa-boxes-alt",
        sT: [],
      },
      {
        t: "fal fa-boxes-alt",
        sT: [],
      },
      {
        t: "fad fa-boxes-alt",
        sT: [],
      },
      {
        t: "fas fa-boxing-glove",
        sT: [],
      },
      {
        t: "far fa-boxing-glove",
        sT: [],
      },
      {
        t: "fal fa-boxing-glove",
        sT: [],
      },
      {
        t: "fad fa-boxing-glove",
        sT: [],
      },
      {
        t: "fas fa-brackets",
        sT: [],
      },
      {
        t: "far fa-brackets",
        sT: [],
      },
      {
        t: "fal fa-brackets",
        sT: [],
      },
      {
        t: "fad fa-brackets",
        sT: [],
      },
      {
        t: "fas fa-brackets-curly",
        sT: [],
      },
      {
        t: "far fa-brackets-curly",
        sT: [],
      },
      {
        t: "fal fa-brackets-curly",
        sT: [],
      },
      {
        t: "fad fa-brackets-curly",
        sT: [],
      },
      {
        t: "fas fa-braille",
        sT: [],
      },
      {
        t: "far fa-braille",
        sT: [],
      },
      {
        t: "fal fa-braille",
        sT: [],
      },
      {
        t: "fad fa-braille",
        sT: [],
      },
      {
        t: "fas fa-brain",
        sT: [],
      },
      {
        t: "far fa-brain",
        sT: [],
      },
      {
        t: "fal fa-brain",
        sT: [],
      },
      {
        t: "fad fa-brain",
        sT: [],
      },
      {
        t: "fas fa-bread-loaf",
        sT: [],
      },
      {
        t: "far fa-bread-loaf",
        sT: [],
      },
      {
        t: "fal fa-bread-loaf",
        sT: [],
      },
      {
        t: "fad fa-bread-loaf",
        sT: [],
      },
      {
        t: "fas fa-bread-slice",
        sT: [],
      },
      {
        t: "far fa-bread-slice",
        sT: [],
      },
      {
        t: "fal fa-bread-slice",
        sT: [],
      },
      {
        t: "fad fa-bread-slice",
        sT: [],
      },
      {
        t: "fas fa-briefcase",
        sT: [],
      },
      {
        t: "far fa-briefcase",
        sT: [],
      },
      {
        t: "fal fa-briefcase",
        sT: [],
      },
      {
        t: "fad fa-briefcase",
        sT: [],
      },
      {
        t: "fas fa-briefcase-medical",
        sT: [],
      },
      {
        t: "far fa-briefcase-medical",
        sT: [],
      },
      {
        t: "fal fa-briefcase-medical",
        sT: [],
      },
      {
        t: "fad fa-briefcase-medical",
        sT: [],
      },
      {
        t: "fas fa-bring-forward",
        sT: [],
      },
      {
        t: "far fa-bring-forward",
        sT: [],
      },
      {
        t: "fal fa-bring-forward",
        sT: [],
      },
      {
        t: "fad fa-bring-forward",
        sT: [],
      },
      {
        t: "fas fa-bring-front",
        sT: [],
      },
      {
        t: "far fa-bring-front",
        sT: [],
      },
      {
        t: "fal fa-bring-front",
        sT: [],
      },
      {
        t: "fad fa-bring-front",
        sT: [],
      },
      {
        t: "fas fa-broadcast-tower",
        sT: [],
      },
      {
        t: "far fa-broadcast-tower",
        sT: [],
      },
      {
        t: "fal fa-broadcast-tower",
        sT: [],
      },
      {
        t: "fad fa-broadcast-tower",
        sT: [],
      },
      {
        t: "fas fa-broom",
        sT: [],
      },
      {
        t: "far fa-broom",
        sT: [],
      },
      {
        t: "fal fa-broom",
        sT: [],
      },
      {
        t: "fad fa-broom",
        sT: [],
      },
      {
        t: "fas fa-browser",
        sT: [],
      },
      {
        t: "far fa-browser",
        sT: [],
      },
      {
        t: "fal fa-browser",
        sT: [],
      },
      {
        t: "fad fa-browser",
        sT: [],
      },
      {
        t: "fas fa-brush",
        sT: [],
      },
      {
        t: "far fa-brush",
        sT: [],
      },
      {
        t: "fal fa-brush",
        sT: [],
      },
      {
        t: "fad fa-brush",
        sT: [],
      },
      {
        t: "fab fa-btc",
        sT: [],
      },
      {
        t: "fab fa-buffer",
        sT: [],
      },
      {
        t: "fas fa-bug",
        sT: [],
      },
      {
        t: "far fa-bug",
        sT: [],
      },
      {
        t: "fal fa-bug",
        sT: [],
      },
      {
        t: "fad fa-bug",
        sT: [],
      },
      {
        t: "fas fa-building",
        sT: [],
      },
      {
        t: "far fa-building",
        sT: [],
      },
      {
        t: "fal fa-building",
        sT: [],
      },
      {
        t: "fad fa-building",
        sT: [],
      },
      {
        t: "fas fa-bullhorn",
        sT: [],
      },
      {
        t: "far fa-bullhorn",
        sT: [],
      },
      {
        t: "fal fa-bullhorn",
        sT: [],
      },
      {
        t: "fad fa-bullhorn",
        sT: [],
      },
      {
        t: "fas fa-bullseye",
        sT: [],
      },
      {
        t: "far fa-bullseye",
        sT: [],
      },
      {
        t: "fal fa-bullseye",
        sT: [],
      },
      {
        t: "fad fa-bullseye",
        sT: [],
      },
      {
        t: "fas fa-bullseye-arrow",
        sT: [],
      },
      {
        t: "far fa-bullseye-arrow",
        sT: [],
      },
      {
        t: "fal fa-bullseye-arrow",
        sT: [],
      },
      {
        t: "fad fa-bullseye-arrow",
        sT: [],
      },
      {
        t: "fas fa-bullseye-pointer",
        sT: [],
      },
      {
        t: "far fa-bullseye-pointer",
        sT: [],
      },
      {
        t: "fal fa-bullseye-pointer",
        sT: [],
      },
      {
        t: "fad fa-bullseye-pointer",
        sT: [],
      },
      {
        t: "fas fa-burger-soda",
        sT: [],
      },
      {
        t: "far fa-burger-soda",
        sT: [],
      },
      {
        t: "fal fa-burger-soda",
        sT: [],
      },
      {
        t: "fad fa-burger-soda",
        sT: [],
      },
      {
        t: "fas fa-burn",
        sT: [],
      },
      {
        t: "far fa-burn",
        sT: [],
      },
      {
        t: "fal fa-burn",
        sT: [],
      },
      {
        t: "fad fa-burn",
        sT: [],
      },
      {
        t: "fab fa-buromobelexperte",
        sT: [],
      },
      {
        t: "fas fa-burrito",
        sT: [],
      },
      {
        t: "far fa-burrito",
        sT: [],
      },
      {
        t: "fal fa-burrito",
        sT: [],
      },
      {
        t: "fad fa-burrito",
        sT: [],
      },
      {
        t: "fas fa-bus",
        sT: [],
      },
      {
        t: "far fa-bus",
        sT: [],
      },
      {
        t: "fal fa-bus",
        sT: [],
      },
      {
        t: "fad fa-bus",
        sT: [],
      },
      {
        t: "fas fa-bus-alt",
        sT: [],
      },
      {
        t: "far fa-bus-alt",
        sT: [],
      },
      {
        t: "fal fa-bus-alt",
        sT: [],
      },
      {
        t: "fad fa-bus-alt",
        sT: [],
      },
      {
        t: "fas fa-bus-school",
        sT: [],
      },
      {
        t: "far fa-bus-school",
        sT: [],
      },
      {
        t: "fal fa-bus-school",
        sT: [],
      },
      {
        t: "fad fa-bus-school",
        sT: [],
      },
      {
        t: "fas fa-business-time",
        sT: [],
      },
      {
        t: "far fa-business-time",
        sT: [],
      },
      {
        t: "fal fa-business-time",
        sT: [],
      },
      {
        t: "fad fa-business-time",
        sT: [],
      },
      {
        t: "fab fa-buy-n-large",
        sT: [],
      },
      {
        t: "fab fa-buysellads",
        sT: [],
      },
      {
        t: "fas fa-cabinet-filing",
        sT: [],
      },
      {
        t: "far fa-cabinet-filing",
        sT: [],
      },
      {
        t: "fal fa-cabinet-filing",
        sT: [],
      },
      {
        t: "fad fa-cabinet-filing",
        sT: [],
      },
      {
        t: "fal fa-cactus",
        sT: [],
      },
      {
        t: "far fa-cactus",
        sT: [],
      },
      {
        t: "fas fa-cactus",
        sT: [],
      },
      {
        t: "fad fa-cactus",
        sT: [],
      },
      {
        t: "fas fa-calculator",
        sT: [],
      },
      {
        t: "far fa-calculator",
        sT: [],
      },
      {
        t: "fal fa-calculator",
        sT: [],
      },
      {
        t: "fad fa-calculator",
        sT: [],
      },
      {
        t: "fas fa-calculator-alt",
        sT: [],
      },
      {
        t: "far fa-calculator-alt",
        sT: [],
      },
      {
        t: "fal fa-calculator-alt",
        sT: [],
      },
      {
        t: "fad fa-calculator-alt",
        sT: [],
      },
      {
        t: "fas fa-calendar",
        sT: [],
      },
      {
        t: "far fa-calendar",
        sT: [],
      },
      {
        t: "fal fa-calendar",
        sT: [],
      },
      {
        t: "fad fa-calendar",
        sT: [],
      },
      {
        t: "fas fa-calendar-alt",
        sT: [],
      },
      {
        t: "far fa-calendar-alt",
        sT: [],
      },
      {
        t: "fal fa-calendar-alt",
        sT: [],
      },
      {
        t: "fad fa-calendar-alt",
        sT: [],
      },
      {
        t: "fas fa-calendar-check",
        sT: [],
      },
      {
        t: "far fa-calendar-check",
        sT: [],
      },
      {
        t: "fal fa-calendar-check",
        sT: [],
      },
      {
        t: "fad fa-calendar-check",
        sT: [],
      },
      {
        t: "fas fa-calendar-day",
        sT: [],
      },
      {
        t: "far fa-calendar-day",
        sT: [],
      },
      {
        t: "fal fa-calendar-day",
        sT: [],
      },
      {
        t: "fad fa-calendar-day",
        sT: [],
      },
      {
        t: "fas fa-calendar-edit",
        sT: [],
      },
      {
        t: "far fa-calendar-edit",
        sT: [],
      },
      {
        t: "fal fa-calendar-edit",
        sT: [],
      },
      {
        t: "fad fa-calendar-edit",
        sT: [],
      },
      {
        t: "fas fa-calendar-exclamation",
        sT: [],
      },
      {
        t: "far fa-calendar-exclamation",
        sT: [],
      },
      {
        t: "fal fa-calendar-exclamation",
        sT: [],
      },
      {
        t: "fad fa-calendar-exclamation",
        sT: [],
      },
      {
        t: "fas fa-calendar-minus",
        sT: [],
      },
      {
        t: "far fa-calendar-minus",
        sT: [],
      },
      {
        t: "fal fa-calendar-minus",
        sT: [],
      },
      {
        t: "fad fa-calendar-minus",
        sT: [],
      },
      {
        t: "fas fa-calendar-plus",
        sT: [],
      },
      {
        t: "far fa-calendar-plus",
        sT: [],
      },
      {
        t: "fal fa-calendar-plus",
        sT: [],
      },
      {
        t: "fad fa-calendar-plus",
        sT: [],
      },
      {
        t: "fas fa-calendar-star",
        sT: [],
      },
      {
        t: "far fa-calendar-star",
        sT: [],
      },
      {
        t: "fal fa-calendar-star",
        sT: [],
      },
      {
        t: "fad fa-calendar-star",
        sT: [],
      },
      {
        t: "fas fa-calendar-times",
        sT: [],
      },
      {
        t: "far fa-calendar-times",
        sT: [],
      },
      {
        t: "fal fa-calendar-times",
        sT: [],
      },
      {
        t: "fad fa-calendar-times",
        sT: [],
      },
      {
        t: "fas fa-calendar-week",
        sT: [],
      },
      {
        t: "far fa-calendar-week",
        sT: [],
      },
      {
        t: "fal fa-calendar-week",
        sT: [],
      },
      {
        t: "fad fa-calendar-week",
        sT: [],
      },
      {
        t: "fas fa-camcorder",
        sT: [],
      },
      {
        t: "far fa-camcorder",
        sT: [],
      },
      {
        t: "fal fa-camcorder",
        sT: [],
      },
      {
        t: "fad fa-camcorder",
        sT: [],
      },
      {
        t: "fas fa-camera",
        sT: [],
      },
      {
        t: "far fa-camera",
        sT: [],
      },
      {
        t: "fal fa-camera",
        sT: [],
      },
      {
        t: "fad fa-camera",
        sT: [],
      },
      {
        t: "fas fa-camera-alt",
        sT: [],
      },
      {
        t: "far fa-camera-alt",
        sT: [],
      },
      {
        t: "fal fa-camera-alt",
        sT: [],
      },
      {
        t: "fad fa-camera-alt",
        sT: [],
      },
      {
        t: "fas fa-camera-home",
        sT: [],
      },
      {
        t: "far fa-camera-home",
        sT: [],
      },
      {
        t: "fal fa-camera-home",
        sT: [],
      },
      {
        t: "fad fa-camera-home",
        sT: [],
      },
      {
        t: "fas fa-camera-movie",
        sT: [],
      },
      {
        t: "far fa-camera-movie",
        sT: [],
      },
      {
        t: "fal fa-camera-movie",
        sT: [],
      },
      {
        t: "fad fa-camera-movie",
        sT: [],
      },
      {
        t: "fas fa-camera-polaroid",
        sT: [],
      },
      {
        t: "far fa-camera-polaroid",
        sT: [],
      },
      {
        t: "fal fa-camera-polaroid",
        sT: [],
      },
      {
        t: "fad fa-camera-polaroid",
        sT: [],
      },
      {
        t: "fas fa-camera-retro",
        sT: [],
      },
      {
        t: "far fa-camera-retro",
        sT: [],
      },
      {
        t: "fal fa-camera-retro",
        sT: [],
      },
      {
        t: "fad fa-camera-retro",
        sT: [],
      },
      {
        t: "fas fa-campfire",
        sT: [],
      },
      {
        t: "far fa-campfire",
        sT: [],
      },
      {
        t: "fal fa-campfire",
        sT: [],
      },
      {
        t: "fad fa-campfire",
        sT: [],
      },
      {
        t: "fas fa-campground",
        sT: [],
      },
      {
        t: "far fa-campground",
        sT: [],
      },
      {
        t: "fal fa-campground",
        sT: [],
      },
      {
        t: "fad fa-campground",
        sT: [],
      },
      {
        t: "fab fa-canadian-maple-leaf",
        sT: [],
      },
      {
        t: "fas fa-candle-holder",
        sT: [],
      },
      {
        t: "far fa-candle-holder",
        sT: [],
      },
      {
        t: "fal fa-candle-holder",
        sT: [],
      },
      {
        t: "fad fa-candle-holder",
        sT: [],
      },
      {
        t: "fas fa-candy-cane",
        sT: [],
      },
      {
        t: "far fa-candy-cane",
        sT: [],
      },
      {
        t: "fal fa-candy-cane",
        sT: [],
      },
      {
        t: "fad fa-candy-cane",
        sT: [],
      },
      {
        t: "fas fa-candy-corn",
        sT: [],
      },
      {
        t: "far fa-candy-corn",
        sT: [],
      },
      {
        t: "fal fa-candy-corn",
        sT: [],
      },
      {
        t: "fad fa-candy-corn",
        sT: [],
      },
      {
        t: "fas fa-cannabis",
        sT: [],
      },
      {
        t: "far fa-cannabis",
        sT: [],
      },
      {
        t: "fal fa-cannabis",
        sT: [],
      },
      {
        t: "fad fa-cannabis",
        sT: [],
      },
      {
        t: "fas fa-capsules",
        sT: [],
      },
      {
        t: "far fa-capsules",
        sT: [],
      },
      {
        t: "fal fa-capsules",
        sT: [],
      },
      {
        t: "fad fa-capsules",
        sT: [],
      },
      {
        t: "fas fa-car",
        sT: [],
      },
      {
        t: "far fa-car",
        sT: [],
      },
      {
        t: "fal fa-car",
        sT: [],
      },
      {
        t: "fad fa-car",
        sT: [],
      },
      {
        t: "fas fa-car-alt",
        sT: [],
      },
      {
        t: "far fa-car-alt",
        sT: [],
      },
      {
        t: "fal fa-car-alt",
        sT: [],
      },
      {
        t: "fad fa-car-alt",
        sT: [],
      },
      {
        t: "fas fa-car-battery",
        sT: [],
      },
      {
        t: "far fa-car-battery",
        sT: [],
      },
      {
        t: "fal fa-car-battery",
        sT: [],
      },
      {
        t: "fad fa-car-battery",
        sT: [],
      },
      {
        t: "fas fa-car-building",
        sT: [],
      },
      {
        t: "far fa-car-building",
        sT: [],
      },
      {
        t: "fal fa-car-building",
        sT: [],
      },
      {
        t: "fad fa-car-building",
        sT: [],
      },
      {
        t: "fas fa-car-bump",
        sT: [],
      },
      {
        t: "far fa-car-bump",
        sT: [],
      },
      {
        t: "fal fa-car-bump",
        sT: [],
      },
      {
        t: "fad fa-car-bump",
        sT: [],
      },
      {
        t: "fas fa-car-bus",
        sT: [],
      },
      {
        t: "far fa-car-bus",
        sT: [],
      },
      {
        t: "fal fa-car-bus",
        sT: [],
      },
      {
        t: "fad fa-car-bus",
        sT: [],
      },
      {
        t: "fas fa-car-crash",
        sT: [],
      },
      {
        t: "far fa-car-crash",
        sT: [],
      },
      {
        t: "fal fa-car-crash",
        sT: [],
      },
      {
        t: "fad fa-car-crash",
        sT: [],
      },
      {
        t: "fas fa-car-garage",
        sT: [],
      },
      {
        t: "far fa-car-garage",
        sT: [],
      },
      {
        t: "fal fa-car-garage",
        sT: [],
      },
      {
        t: "fad fa-car-garage",
        sT: [],
      },
      {
        t: "fas fa-car-mechanic",
        sT: [],
      },
      {
        t: "far fa-car-mechanic",
        sT: [],
      },
      {
        t: "fal fa-car-mechanic",
        sT: [],
      },
      {
        t: "fad fa-car-mechanic",
        sT: [],
      },
      {
        t: "fas fa-car-side",
        sT: [],
      },
      {
        t: "far fa-car-side",
        sT: [],
      },
      {
        t: "fal fa-car-side",
        sT: [],
      },
      {
        t: "fad fa-car-side",
        sT: [],
      },
      {
        t: "fas fa-car-tilt",
        sT: [],
      },
      {
        t: "far fa-car-tilt",
        sT: [],
      },
      {
        t: "fal fa-car-tilt",
        sT: [],
      },
      {
        t: "fad fa-car-tilt",
        sT: [],
      },
      {
        t: "fas fa-car-wash",
        sT: [],
      },
      {
        t: "far fa-car-wash",
        sT: [],
      },
      {
        t: "fal fa-car-wash",
        sT: [],
      },
      {
        t: "fad fa-car-wash",
        sT: [],
      },
      {
        t: "fas fa-caravan",
        sT: [],
      },
      {
        t: "far fa-caravan",
        sT: [],
      },
      {
        t: "fal fa-caravan",
        sT: [],
      },
      {
        t: "fad fa-caravan",
        sT: [],
      },
      {
        t: "fas fa-caravan-alt",
        sT: [],
      },
      {
        t: "far fa-caravan-alt",
        sT: [],
      },
      {
        t: "fal fa-caravan-alt",
        sT: [],
      },
      {
        t: "fad fa-caravan-alt",
        sT: [],
      },
      {
        t: "fas fa-caret-circle-down",
        sT: [],
      },
      {
        t: "far fa-caret-circle-down",
        sT: [],
      },
      {
        t: "fal fa-caret-circle-down",
        sT: [],
      },
      {
        t: "fad fa-caret-circle-down",
        sT: [],
      },
      {
        t: "fas fa-caret-circle-left",
        sT: [],
      },
      {
        t: "far fa-caret-circle-left",
        sT: [],
      },
      {
        t: "fal fa-caret-circle-left",
        sT: [],
      },
      {
        t: "fad fa-caret-circle-left",
        sT: [],
      },
      {
        t: "fas fa-caret-circle-right",
        sT: [],
      },
      {
        t: "far fa-caret-circle-right",
        sT: [],
      },
      {
        t: "fal fa-caret-circle-right",
        sT: [],
      },
      {
        t: "fad fa-caret-circle-right",
        sT: [],
      },
      {
        t: "fas fa-caret-circle-up",
        sT: [],
      },
      {
        t: "far fa-caret-circle-up",
        sT: [],
      },
      {
        t: "fal fa-caret-circle-up",
        sT: [],
      },
      {
        t: "fad fa-caret-circle-up",
        sT: [],
      },
      {
        t: "fas fa-caret-down",
        sT: [],
      },
      {
        t: "far fa-caret-down",
        sT: [],
      },
      {
        t: "fal fa-caret-down",
        sT: [],
      },
      {
        t: "fad fa-caret-down",
        sT: [],
      },
      {
        t: "fas fa-caret-left",
        sT: [],
      },
      {
        t: "far fa-caret-left",
        sT: [],
      },
      {
        t: "fal fa-caret-left",
        sT: [],
      },
      {
        t: "fad fa-caret-left",
        sT: [],
      },
      {
        t: "fas fa-caret-right",
        sT: [],
      },
      {
        t: "far fa-caret-right",
        sT: [],
      },
      {
        t: "fal fa-caret-right",
        sT: [],
      },
      {
        t: "fad fa-caret-right",
        sT: [],
      },
      {
        t: "fas fa-caret-square-down",
        sT: [],
      },
      {
        t: "far fa-caret-square-down",
        sT: [],
      },
      {
        t: "fal fa-caret-square-down",
        sT: [],
      },
      {
        t: "fad fa-caret-square-down",
        sT: [],
      },
      {
        t: "fas fa-caret-square-left",
        sT: [],
      },
      {
        t: "far fa-caret-square-left",
        sT: [],
      },
      {
        t: "fal fa-caret-square-left",
        sT: [],
      },
      {
        t: "fad fa-caret-square-left",
        sT: [],
      },
      {
        t: "fas fa-caret-square-right",
        sT: [],
      },
      {
        t: "far fa-caret-square-right",
        sT: [],
      },
      {
        t: "fal fa-caret-square-right",
        sT: [],
      },
      {
        t: "fad fa-caret-square-right",
        sT: [],
      },
      {
        t: "fas fa-caret-square-up",
        sT: [],
      },
      {
        t: "far fa-caret-square-up",
        sT: [],
      },
      {
        t: "fal fa-caret-square-up",
        sT: [],
      },
      {
        t: "fad fa-caret-square-up",
        sT: [],
      },
      {
        t: "fas fa-caret-up",
        sT: [],
      },
      {
        t: "far fa-caret-up",
        sT: [],
      },
      {
        t: "fal fa-caret-up",
        sT: [],
      },
      {
        t: "fad fa-caret-up",
        sT: [],
      },
      {
        t: "fas fa-carrot",
        sT: [],
      },
      {
        t: "far fa-carrot",
        sT: [],
      },
      {
        t: "fal fa-carrot",
        sT: [],
      },
      {
        t: "fad fa-carrot",
        sT: [],
      },
      {
        t: "fas fa-cars",
        sT: [],
      },
      {
        t: "far fa-cars",
        sT: [],
      },
      {
        t: "fal fa-cars",
        sT: [],
      },
      {
        t: "fad fa-cars",
        sT: [],
      },
      {
        t: "fas fa-cart-arrow-down",
        sT: [],
      },
      {
        t: "far fa-cart-arrow-down",
        sT: [],
      },
      {
        t: "fal fa-cart-arrow-down",
        sT: [],
      },
      {
        t: "fad fa-cart-arrow-down",
        sT: [],
      },
      {
        t: "fas fa-cart-plus",
        sT: [],
      },
      {
        t: "far fa-cart-plus",
        sT: [],
      },
      {
        t: "fal fa-cart-plus",
        sT: [],
      },
      {
        t: "fad fa-cart-plus",
        sT: [],
      },
      {
        t: "fas fa-cash-register",
        sT: [],
      },
      {
        t: "far fa-cash-register",
        sT: [],
      },
      {
        t: "fal fa-cash-register",
        sT: [],
      },
      {
        t: "fad fa-cash-register",
        sT: [],
      },
      {
        t: "fas fa-cassette-tape",
        sT: [],
      },
      {
        t: "far fa-cassette-tape",
        sT: [],
      },
      {
        t: "fal fa-cassette-tape",
        sT: [],
      },
      {
        t: "fad fa-cassette-tape",
        sT: [],
      },
      {
        t: "fas fa-cat",
        sT: [],
      },
      {
        t: "far fa-cat",
        sT: [],
      },
      {
        t: "fal fa-cat",
        sT: [],
      },
      {
        t: "fad fa-cat",
        sT: [],
      },
      {
        t: "fas fa-cat-space",
        sT: [],
      },
      {
        t: "far fa-cat-space",
        sT: [],
      },
      {
        t: "fal fa-cat-space",
        sT: [],
      },
      {
        t: "fad fa-cat-space",
        sT: [],
      },
      {
        t: "fas fa-cauldron",
        sT: [],
      },
      {
        t: "far fa-cauldron",
        sT: [],
      },
      {
        t: "fal fa-cauldron",
        sT: [],
      },
      {
        t: "fad fa-cauldron",
        sT: [],
      },
      {
        t: "fab fa-cc-amazon-pay",
        sT: [],
      },
      {
        t: "fab fa-cc-amex",
        sT: [],
      },
      {
        t: "fab fa-cc-apple-pay",
        sT: [],
      },
      {
        t: "fab fa-cc-diners-club",
        sT: [],
      },
      {
        t: "fab fa-cc-discover",
        sT: [],
      },
      {
        t: "fab fa-cc-jcb",
        sT: [],
      },
      {
        t: "fab fa-cc-mastercard",
        sT: [],
      },
      {
        t: "fab fa-cc-paypal",
        sT: [],
      },
      {
        t: "fab fa-cc-stripe",
        sT: [],
      },
      {
        t: "fab fa-cc-visa",
        sT: [],
      },
      {
        t: "fas fa-cctv",
        sT: [],
      },
      {
        t: "far fa-cctv",
        sT: [],
      },
      {
        t: "fal fa-cctv",
        sT: [],
      },
      {
        t: "fad fa-cctv",
        sT: [],
      },
      {
        t: "fab fa-centercode",
        sT: [],
      },
      {
        t: "fab fa-centos",
        sT: [],
      },
      {
        t: "fas fa-certificate",
        sT: [],
      },
      {
        t: "far fa-certificate",
        sT: [],
      },
      {
        t: "fal fa-certificate",
        sT: [],
      },
      {
        t: "fad fa-certificate",
        sT: [],
      },
      {
        t: "fas fa-chair",
        sT: [],
      },
      {
        t: "far fa-chair",
        sT: [],
      },
      {
        t: "fal fa-chair",
        sT: [],
      },
      {
        t: "fad fa-chair",
        sT: [],
      },
      {
        t: "fas fa-chair-office",
        sT: [],
      },
      {
        t: "far fa-chair-office",
        sT: [],
      },
      {
        t: "fal fa-chair-office",
        sT: [],
      },
      {
        t: "fad fa-chair-office",
        sT: [],
      },
      {
        t: "fas fa-chalkboard",
        sT: [],
      },
      {
        t: "far fa-chalkboard",
        sT: [],
      },
      {
        t: "fal fa-chalkboard",
        sT: [],
      },
      {
        t: "fad fa-chalkboard",
        sT: [],
      },
      {
        t: "fas fa-chalkboard-teacher",
        sT: [],
      },
      {
        t: "far fa-chalkboard-teacher",
        sT: [],
      },
      {
        t: "fal fa-chalkboard-teacher",
        sT: [],
      },
      {
        t: "fad fa-chalkboard-teacher",
        sT: [],
      },
      {
        t: "fas fa-charging-station",
        sT: [],
      },
      {
        t: "far fa-charging-station",
        sT: [],
      },
      {
        t: "fal fa-charging-station",
        sT: [],
      },
      {
        t: "fad fa-charging-station",
        sT: [],
      },
      {
        t: "fas fa-chart-area",
        sT: [],
      },
      {
        t: "far fa-chart-area",
        sT: [],
      },
      {
        t: "fal fa-chart-area",
        sT: [],
      },
      {
        t: "fad fa-chart-area",
        sT: [],
      },
      {
        t: "fas fa-chart-bar",
        sT: [],
      },
      {
        t: "far fa-chart-bar",
        sT: [],
      },
      {
        t: "fal fa-chart-bar",
        sT: [],
      },
      {
        t: "fad fa-chart-bar",
        sT: [],
      },
      {
        t: "fas fa-chart-line",
        sT: [],
      },
      {
        t: "far fa-chart-line",
        sT: [],
      },
      {
        t: "fal fa-chart-line",
        sT: [],
      },
      {
        t: "fad fa-chart-line",
        sT: [],
      },
      {
        t: "fas fa-chart-line-down",
        sT: [],
      },
      {
        t: "far fa-chart-line-down",
        sT: [],
      },
      {
        t: "fal fa-chart-line-down",
        sT: [],
      },
      {
        t: "fad fa-chart-line-down",
        sT: [],
      },
      {
        t: "fas fa-chart-network",
        sT: [],
      },
      {
        t: "far fa-chart-network",
        sT: [],
      },
      {
        t: "fal fa-chart-network",
        sT: [],
      },
      {
        t: "fad fa-chart-network",
        sT: [],
      },
      {
        t: "fas fa-chart-pie",
        sT: [],
      },
      {
        t: "far fa-chart-pie",
        sT: [],
      },
      {
        t: "fal fa-chart-pie",
        sT: [],
      },
      {
        t: "fad fa-chart-pie",
        sT: [],
      },
      {
        t: "fas fa-chart-pie-alt",
        sT: [],
      },
      {
        t: "far fa-chart-pie-alt",
        sT: [],
      },
      {
        t: "fal fa-chart-pie-alt",
        sT: [],
      },
      {
        t: "fad fa-chart-pie-alt",
        sT: [],
      },
      {
        t: "fas fa-chart-scatter",
        sT: [],
      },
      {
        t: "far fa-chart-scatter",
        sT: [],
      },
      {
        t: "fal fa-chart-scatter",
        sT: [],
      },
      {
        t: "fad fa-chart-scatter",
        sT: [],
      },
      {
        t: "fas fa-check",
        sT: [],
      },
      {
        t: "far fa-check",
        sT: [],
      },
      {
        t: "fal fa-check",
        sT: [],
      },
      {
        t: "fad fa-check",
        sT: [],
      },
      {
        t: "fas fa-check-circle",
        sT: [],
      },
      {
        t: "far fa-check-circle",
        sT: [],
      },
      {
        t: "fal fa-check-circle",
        sT: [],
      },
      {
        t: "fad fa-check-circle",
        sT: [],
      },
      {
        t: "fas fa-check-double",
        sT: [],
      },
      {
        t: "far fa-check-double",
        sT: [],
      },
      {
        t: "fal fa-check-double",
        sT: [],
      },
      {
        t: "fad fa-check-double",
        sT: [],
      },
      {
        t: "fas fa-check-square",
        sT: [],
      },
      {
        t: "far fa-check-square",
        sT: [],
      },
      {
        t: "fal fa-check-square",
        sT: [],
      },
      {
        t: "fad fa-check-square",
        sT: [],
      },
      {
        t: "fas fa-cheese",
        sT: [],
      },
      {
        t: "far fa-cheese",
        sT: [],
      },
      {
        t: "fal fa-cheese",
        sT: [],
      },
      {
        t: "fad fa-cheese",
        sT: [],
      },
      {
        t: "fas fa-cheese-swiss",
        sT: [],
      },
      {
        t: "far fa-cheese-swiss",
        sT: [],
      },
      {
        t: "fal fa-cheese-swiss",
        sT: [],
      },
      {
        t: "fad fa-cheese-swiss",
        sT: [],
      },
      {
        t: "fas fa-cheeseburger",
        sT: [],
      },
      {
        t: "far fa-cheeseburger",
        sT: [],
      },
      {
        t: "fal fa-cheeseburger",
        sT: [],
      },
      {
        t: "fad fa-cheeseburger",
        sT: [],
      },
      {
        t: "fas fa-chess",
        sT: [],
      },
      {
        t: "far fa-chess",
        sT: [],
      },
      {
        t: "fal fa-chess",
        sT: [],
      },
      {
        t: "fad fa-chess",
        sT: [],
      },
      {
        t: "fas fa-chess-bishop",
        sT: [],
      },
      {
        t: "far fa-chess-bishop",
        sT: [],
      },
      {
        t: "fal fa-chess-bishop",
        sT: [],
      },
      {
        t: "fad fa-chess-bishop",
        sT: [],
      },
      {
        t: "fas fa-chess-bishop-alt",
        sT: [],
      },
      {
        t: "far fa-chess-bishop-alt",
        sT: [],
      },
      {
        t: "fal fa-chess-bishop-alt",
        sT: [],
      },
      {
        t: "fad fa-chess-bishop-alt",
        sT: [],
      },
      {
        t: "fas fa-chess-board",
        sT: [],
      },
      {
        t: "far fa-chess-board",
        sT: [],
      },
      {
        t: "fal fa-chess-board",
        sT: [],
      },
      {
        t: "fad fa-chess-board",
        sT: [],
      },
      {
        t: "fas fa-chess-clock",
        sT: [],
      },
      {
        t: "far fa-chess-clock",
        sT: [],
      },
      {
        t: "fal fa-chess-clock",
        sT: [],
      },
      {
        t: "fad fa-chess-clock",
        sT: [],
      },
      {
        t: "fas fa-chess-clock-alt",
        sT: [],
      },
      {
        t: "far fa-chess-clock-alt",
        sT: [],
      },
      {
        t: "fal fa-chess-clock-alt",
        sT: [],
      },
      {
        t: "fad fa-chess-clock-alt",
        sT: [],
      },
      {
        t: "fas fa-chess-king",
        sT: [],
      },
      {
        t: "far fa-chess-king",
        sT: [],
      },
      {
        t: "fal fa-chess-king",
        sT: [],
      },
      {
        t: "fad fa-chess-king",
        sT: [],
      },
      {
        t: "fas fa-chess-king-alt",
        sT: [],
      },
      {
        t: "far fa-chess-king-alt",
        sT: [],
      },
      {
        t: "fal fa-chess-king-alt",
        sT: [],
      },
      {
        t: "fad fa-chess-king-alt",
        sT: [],
      },
      {
        t: "fas fa-chess-knight",
        sT: [],
      },
      {
        t: "far fa-chess-knight",
        sT: [],
      },
      {
        t: "fal fa-chess-knight",
        sT: [],
      },
      {
        t: "fad fa-chess-knight",
        sT: [],
      },
      {
        t: "fas fa-chess-knight-alt",
        sT: [],
      },
      {
        t: "far fa-chess-knight-alt",
        sT: [],
      },
      {
        t: "fal fa-chess-knight-alt",
        sT: [],
      },
      {
        t: "fad fa-chess-knight-alt",
        sT: [],
      },
      {
        t: "fas fa-chess-pawn",
        sT: [],
      },
      {
        t: "far fa-chess-pawn",
        sT: [],
      },
      {
        t: "fal fa-chess-pawn",
        sT: [],
      },
      {
        t: "fad fa-chess-pawn",
        sT: [],
      },
      {
        t: "fas fa-chess-pawn-alt",
        sT: [],
      },
      {
        t: "far fa-chess-pawn-alt",
        sT: [],
      },
      {
        t: "fal fa-chess-pawn-alt",
        sT: [],
      },
      {
        t: "fad fa-chess-pawn-alt",
        sT: [],
      },
      {
        t: "fas fa-chess-queen",
        sT: [],
      },
      {
        t: "far fa-chess-queen",
        sT: [],
      },
      {
        t: "fal fa-chess-queen",
        sT: [],
      },
      {
        t: "fad fa-chess-queen",
        sT: [],
      },
      {
        t: "fas fa-chess-queen-alt",
        sT: [],
      },
      {
        t: "far fa-chess-queen-alt",
        sT: [],
      },
      {
        t: "fal fa-chess-queen-alt",
        sT: [],
      },
      {
        t: "fad fa-chess-queen-alt",
        sT: [],
      },
      {
        t: "fas fa-chess-rook",
        sT: [],
      },
      {
        t: "far fa-chess-rook",
        sT: [],
      },
      {
        t: "fal fa-chess-rook",
        sT: [],
      },
      {
        t: "fad fa-chess-rook",
        sT: [],
      },
      {
        t: "fas fa-chess-rook-alt",
        sT: [],
      },
      {
        t: "far fa-chess-rook-alt",
        sT: [],
      },
      {
        t: "fal fa-chess-rook-alt",
        sT: [],
      },
      {
        t: "fad fa-chess-rook-alt",
        sT: [],
      },
      {
        t: "fas fa-chevron-circle-down",
        sT: [],
      },
      {
        t: "far fa-chevron-circle-down",
        sT: [],
      },
      {
        t: "fal fa-chevron-circle-down",
        sT: [],
      },
      {
        t: "fad fa-chevron-circle-down",
        sT: [],
      },
      {
        t: "fas fa-chevron-circle-left",
        sT: [],
      },
      {
        t: "far fa-chevron-circle-left",
        sT: [],
      },
      {
        t: "fal fa-chevron-circle-left",
        sT: [],
      },
      {
        t: "fad fa-chevron-circle-left",
        sT: [],
      },
      {
        t: "fas fa-chevron-circle-right",
        sT: [],
      },
      {
        t: "far fa-chevron-circle-right",
        sT: [],
      },
      {
        t: "fal fa-chevron-circle-right",
        sT: [],
      },
      {
        t: "fad fa-chevron-circle-right",
        sT: [],
      },
      {
        t: "fas fa-chevron-circle-up",
        sT: [],
      },
      {
        t: "far fa-chevron-circle-up",
        sT: [],
      },
      {
        t: "fal fa-chevron-circle-up",
        sT: [],
      },
      {
        t: "fad fa-chevron-circle-up",
        sT: [],
      },
      {
        t: "fas fa-chevron-double-down",
        sT: [],
      },
      {
        t: "far fa-chevron-double-down",
        sT: [],
      },
      {
        t: "fal fa-chevron-double-down",
        sT: [],
      },
      {
        t: "fad fa-chevron-double-down",
        sT: [],
      },
      {
        t: "fas fa-chevron-double-left",
        sT: [],
      },
      {
        t: "far fa-chevron-double-left",
        sT: [],
      },
      {
        t: "fal fa-chevron-double-left",
        sT: [],
      },
      {
        t: "fad fa-chevron-double-left",
        sT: [],
      },
      {
        t: "fas fa-chevron-double-right",
        sT: [],
      },
      {
        t: "far fa-chevron-double-right",
        sT: [],
      },
      {
        t: "fal fa-chevron-double-right",
        sT: [],
      },
      {
        t: "fad fa-chevron-double-right",
        sT: [],
      },
      {
        t: "fas fa-chevron-double-up",
        sT: [],
      },
      {
        t: "far fa-chevron-double-up",
        sT: [],
      },
      {
        t: "fal fa-chevron-double-up",
        sT: [],
      },
      {
        t: "fad fa-chevron-double-up",
        sT: [],
      },
      {
        t: "fas fa-chevron-down",
        sT: [],
      },
      {
        t: "far fa-chevron-down",
        sT: [],
      },
      {
        t: "fal fa-chevron-down",
        sT: [],
      },
      {
        t: "fad fa-chevron-down",
        sT: [],
      },
      {
        t: "fas fa-chevron-left",
        sT: [],
      },
      {
        t: "far fa-chevron-left",
        sT: [],
      },
      {
        t: "fal fa-chevron-left",
        sT: [],
      },
      {
        t: "fad fa-chevron-left",
        sT: [],
      },
      {
        t: "fas fa-chevron-right",
        sT: [],
      },
      {
        t: "far fa-chevron-right",
        sT: [],
      },
      {
        t: "fal fa-chevron-right",
        sT: [],
      },
      {
        t: "fad fa-chevron-right",
        sT: [],
      },
      {
        t: "fas fa-chevron-square-down",
        sT: [],
      },
      {
        t: "far fa-chevron-square-down",
        sT: [],
      },
      {
        t: "fal fa-chevron-square-down",
        sT: [],
      },
      {
        t: "fad fa-chevron-square-down",
        sT: [],
      },
      {
        t: "fas fa-chevron-square-left",
        sT: [],
      },
      {
        t: "far fa-chevron-square-left",
        sT: [],
      },
      {
        t: "fal fa-chevron-square-left",
        sT: [],
      },
      {
        t: "fad fa-chevron-square-left",
        sT: [],
      },
      {
        t: "fas fa-chevron-square-right",
        sT: [],
      },
      {
        t: "far fa-chevron-square-right",
        sT: [],
      },
      {
        t: "fal fa-chevron-square-right",
        sT: [],
      },
      {
        t: "fad fa-chevron-square-right",
        sT: [],
      },
      {
        t: "fas fa-chevron-square-up",
        sT: [],
      },
      {
        t: "far fa-chevron-square-up",
        sT: [],
      },
      {
        t: "fal fa-chevron-square-up",
        sT: [],
      },
      {
        t: "fad fa-chevron-square-up",
        sT: [],
      },
      {
        t: "fas fa-chevron-up",
        sT: [],
      },
      {
        t: "far fa-chevron-up",
        sT: [],
      },
      {
        t: "fal fa-chevron-up",
        sT: [],
      },
      {
        t: "fad fa-chevron-up",
        sT: [],
      },
      {
        t: "fas fa-child",
        sT: [],
      },
      {
        t: "far fa-child",
        sT: [],
      },
      {
        t: "fal fa-child",
        sT: [],
      },
      {
        t: "fad fa-child",
        sT: [],
      },
      {
        t: "fas fa-chimney",
        sT: [],
      },
      {
        t: "far fa-chimney",
        sT: [],
      },
      {
        t: "fal fa-chimney",
        sT: [],
      },
      {
        t: "fad fa-chimney",
        sT: [],
      },
      {
        t: "fab fa-chrome",
        sT: [],
      },
      {
        t: "fab fa-chromecast",
        sT: [],
      },
      {
        t: "fas fa-church",
        sT: [],
      },
      {
        t: "far fa-church",
        sT: [],
      },
      {
        t: "fal fa-church",
        sT: [],
      },
      {
        t: "fad fa-church",
        sT: [],
      },
      {
        t: "fas fa-circle",
        sT: [],
      },
      {
        t: "far fa-circle",
        sT: [],
      },
      {
        t: "fal fa-circle",
        sT: [],
      },
      {
        t: "fad fa-circle",
        sT: [],
      },
      {
        t: "fas fa-circle-notch",
        sT: [],
      },
      {
        t: "far fa-circle-notch",
        sT: [],
      },
      {
        t: "fal fa-circle-notch",
        sT: [],
      },
      {
        t: "fad fa-circle-notch",
        sT: [],
      },
      {
        t: "fas fa-city",
        sT: [],
      },
      {
        t: "far fa-city",
        sT: [],
      },
      {
        t: "fal fa-city",
        sT: [],
      },
      {
        t: "fad fa-city",
        sT: [],
      },
      {
        t: "fas fa-clarinet",
        sT: [],
      },
      {
        t: "far fa-clarinet",
        sT: [],
      },
      {
        t: "fal fa-clarinet",
        sT: [],
      },
      {
        t: "fad fa-clarinet",
        sT: [],
      },
      {
        t: "fas fa-claw-marks",
        sT: [],
      },
      {
        t: "far fa-claw-marks",
        sT: [],
      },
      {
        t: "fal fa-claw-marks",
        sT: [],
      },
      {
        t: "fad fa-claw-marks",
        sT: [],
      },
      {
        t: "fas fa-clinic-medical",
        sT: [],
      },
      {
        t: "far fa-clinic-medical",
        sT: [],
      },
      {
        t: "fal fa-clinic-medical",
        sT: [],
      },
      {
        t: "fad fa-clinic-medical",
        sT: [],
      },
      {
        t: "fas fa-clipboard",
        sT: [],
      },
      {
        t: "far fa-clipboard",
        sT: [],
      },
      {
        t: "fal fa-clipboard",
        sT: [],
      },
      {
        t: "fad fa-clipboard",
        sT: [],
      },
      {
        t: "fas fa-clipboard-check",
        sT: [],
      },
      {
        t: "far fa-clipboard-check",
        sT: [],
      },
      {
        t: "fal fa-clipboard-check",
        sT: [],
      },
      {
        t: "fad fa-clipboard-check",
        sT: [],
      },
      {
        t: "fas fa-clipboard-list",
        sT: [],
      },
      {
        t: "far fa-clipboard-list",
        sT: [],
      },
      {
        t: "fal fa-clipboard-list",
        sT: [],
      },
      {
        t: "fad fa-clipboard-list",
        sT: [],
      },
      {
        t: "fas fa-clipboard-list-check",
        sT: [],
      },
      {
        t: "far fa-clipboard-list-check",
        sT: [],
      },
      {
        t: "fal fa-clipboard-list-check",
        sT: [],
      },
      {
        t: "fad fa-clipboard-list-check",
        sT: [],
      },
      {
        t: "fas fa-clipboard-prescription",
        sT: [],
      },
      {
        t: "far fa-clipboard-prescription",
        sT: [],
      },
      {
        t: "fal fa-clipboard-prescription",
        sT: [],
      },
      {
        t: "fad fa-clipboard-prescription",
        sT: [],
      },
      {
        t: "fas fa-clipboard-user",
        sT: [],
      },
      {
        t: "far fa-clipboard-user",
        sT: [],
      },
      {
        t: "fal fa-clipboard-user",
        sT: [],
      },
      {
        t: "fad fa-clipboard-user",
        sT: [],
      },
      {
        t: "fas fa-clock",
        sT: [],
      },
      {
        t: "far fa-clock",
        sT: [],
      },
      {
        t: "fal fa-clock",
        sT: [],
      },
      {
        t: "fad fa-clock",
        sT: [],
      },
      {
        t: "fas fa-clone",
        sT: [],
      },
      {
        t: "far fa-clone",
        sT: [],
      },
      {
        t: "fal fa-clone",
        sT: [],
      },
      {
        t: "fad fa-clone",
        sT: [],
      },
      {
        t: "fas fa-closed-captioning",
        sT: [],
      },
      {
        t: "far fa-closed-captioning",
        sT: [],
      },
      {
        t: "fal fa-closed-captioning",
        sT: [],
      },
      {
        t: "fad fa-closed-captioning",
        sT: [],
      },
      {
        t: "fas fa-cloud",
        sT: [],
      },
      {
        t: "far fa-cloud",
        sT: [],
      },
      {
        t: "fal fa-cloud",
        sT: [],
      },
      {
        t: "fad fa-cloud",
        sT: [],
      },
      {
        t: "fas fa-cloud-download",
        sT: [],
      },
      {
        t: "far fa-cloud-download",
        sT: [],
      },
      {
        t: "fal fa-cloud-download",
        sT: [],
      },
      {
        t: "fad fa-cloud-download",
        sT: [],
      },
      {
        t: "fas fa-cloud-download-alt",
        sT: [],
      },
      {
        t: "far fa-cloud-download-alt",
        sT: [],
      },
      {
        t: "fal fa-cloud-download-alt",
        sT: [],
      },
      {
        t: "fad fa-cloud-download-alt",
        sT: [],
      },
      {
        t: "fas fa-cloud-drizzle",
        sT: [],
      },
      {
        t: "far fa-cloud-drizzle",
        sT: [],
      },
      {
        t: "fal fa-cloud-drizzle",
        sT: [],
      },
      {
        t: "fad fa-cloud-drizzle",
        sT: [],
      },
      {
        t: "fas fa-cloud-hail",
        sT: [],
      },
      {
        t: "far fa-cloud-hail",
        sT: [],
      },
      {
        t: "fal fa-cloud-hail",
        sT: [],
      },
      {
        t: "fad fa-cloud-hail",
        sT: [],
      },
      {
        t: "fas fa-cloud-hail-mixed",
        sT: [],
      },
      {
        t: "far fa-cloud-hail-mixed",
        sT: [],
      },
      {
        t: "fal fa-cloud-hail-mixed",
        sT: [],
      },
      {
        t: "fad fa-cloud-hail-mixed",
        sT: [],
      },
      {
        t: "fas fa-cloud-meatball",
        sT: [],
      },
      {
        t: "far fa-cloud-meatball",
        sT: [],
      },
      {
        t: "fal fa-cloud-meatball",
        sT: [],
      },
      {
        t: "fad fa-cloud-meatball",
        sT: [],
      },
      {
        t: "fas fa-cloud-moon",
        sT: [],
      },
      {
        t: "far fa-cloud-moon",
        sT: [],
      },
      {
        t: "fal fa-cloud-moon",
        sT: [],
      },
      {
        t: "fad fa-cloud-moon",
        sT: [],
      },
      {
        t: "fas fa-cloud-moon-rain",
        sT: [],
      },
      {
        t: "far fa-cloud-moon-rain",
        sT: [],
      },
      {
        t: "fal fa-cloud-moon-rain",
        sT: [],
      },
      {
        t: "fad fa-cloud-moon-rain",
        sT: [],
      },
      {
        t: "fas fa-cloud-music",
        sT: [],
      },
      {
        t: "far fa-cloud-music",
        sT: [],
      },
      {
        t: "fal fa-cloud-music",
        sT: [],
      },
      {
        t: "fad fa-cloud-music",
        sT: [],
      },
      {
        t: "fas fa-cloud-rain",
        sT: [],
      },
      {
        t: "far fa-cloud-rain",
        sT: [],
      },
      {
        t: "fal fa-cloud-rain",
        sT: [],
      },
      {
        t: "fad fa-cloud-rain",
        sT: [],
      },
      {
        t: "fas fa-cloud-rainbow",
        sT: [],
      },
      {
        t: "far fa-cloud-rainbow",
        sT: [],
      },
      {
        t: "fal fa-cloud-rainbow",
        sT: [],
      },
      {
        t: "fad fa-cloud-rainbow",
        sT: [],
      },
      {
        t: "fas fa-cloud-showers",
        sT: [],
      },
      {
        t: "far fa-cloud-showers",
        sT: [],
      },
      {
        t: "fal fa-cloud-showers",
        sT: [],
      },
      {
        t: "fad fa-cloud-showers",
        sT: [],
      },
      {
        t: "fas fa-cloud-showers-heavy",
        sT: [],
      },
      {
        t: "far fa-cloud-showers-heavy",
        sT: [],
      },
      {
        t: "fal fa-cloud-showers-heavy",
        sT: [],
      },
      {
        t: "fad fa-cloud-showers-heavy",
        sT: [],
      },
      {
        t: "fas fa-cloud-sleet",
        sT: [],
      },
      {
        t: "far fa-cloud-sleet",
        sT: [],
      },
      {
        t: "fal fa-cloud-sleet",
        sT: [],
      },
      {
        t: "fad fa-cloud-sleet",
        sT: [],
      },
      {
        t: "fas fa-cloud-snow",
        sT: [],
      },
      {
        t: "far fa-cloud-snow",
        sT: [],
      },
      {
        t: "fal fa-cloud-snow",
        sT: [],
      },
      {
        t: "fad fa-cloud-snow",
        sT: [],
      },
      {
        t: "fas fa-cloud-sun",
        sT: [],
      },
      {
        t: "far fa-cloud-sun",
        sT: [],
      },
      {
        t: "fal fa-cloud-sun",
        sT: [],
      },
      {
        t: "fad fa-cloud-sun",
        sT: [],
      },
      {
        t: "fas fa-cloud-sun-rain",
        sT: [],
      },
      {
        t: "far fa-cloud-sun-rain",
        sT: [],
      },
      {
        t: "fal fa-cloud-sun-rain",
        sT: [],
      },
      {
        t: "fad fa-cloud-sun-rain",
        sT: [],
      },
      {
        t: "fas fa-cloud-upload",
        sT: [],
      },
      {
        t: "far fa-cloud-upload",
        sT: [],
      },
      {
        t: "fal fa-cloud-upload",
        sT: [],
      },
      {
        t: "fad fa-cloud-upload",
        sT: [],
      },
      {
        t: "fas fa-cloud-upload-alt",
        sT: [],
      },
      {
        t: "far fa-cloud-upload-alt",
        sT: [],
      },
      {
        t: "fal fa-cloud-upload-alt",
        sT: [],
      },
      {
        t: "fad fa-cloud-upload-alt",
        sT: [],
      },
      {
        t: "fab fa-cloudflare",
        sT: [],
      },
      {
        t: "fas fa-clouds",
        sT: [],
      },
      {
        t: "far fa-clouds",
        sT: [],
      },
      {
        t: "fal fa-clouds",
        sT: [],
      },
      {
        t: "fad fa-clouds",
        sT: [],
      },
      {
        t: "fas fa-clouds-moon",
        sT: [],
      },
      {
        t: "far fa-clouds-moon",
        sT: [],
      },
      {
        t: "fal fa-clouds-moon",
        sT: [],
      },
      {
        t: "fad fa-clouds-moon",
        sT: [],
      },
      {
        t: "fas fa-clouds-sun",
        sT: [],
      },
      {
        t: "far fa-clouds-sun",
        sT: [],
      },
      {
        t: "fal fa-clouds-sun",
        sT: [],
      },
      {
        t: "fad fa-clouds-sun",
        sT: [],
      },
      {
        t: "fab fa-cloudscale",
        sT: [],
      },
      {
        t: "fab fa-cloudsmith",
        sT: [],
      },
      {
        t: "fab fa-cloudversify",
        sT: [],
      },
      {
        t: "fas fa-club",
        sT: [],
      },
      {
        t: "far fa-club",
        sT: [],
      },
      {
        t: "fal fa-club",
        sT: [],
      },
      {
        t: "fad fa-club",
        sT: [],
      },
      {
        t: "fas fa-cocktail",
        sT: [],
      },
      {
        t: "far fa-cocktail",
        sT: [],
      },
      {
        t: "fal fa-cocktail",
        sT: [],
      },
      {
        t: "fad fa-cocktail",
        sT: [],
      },
      {
        t: "fas fa-code",
        sT: [],
      },
      {
        t: "far fa-code",
        sT: [],
      },
      {
        t: "fal fa-code",
        sT: [],
      },
      {
        t: "fad fa-code",
        sT: [],
      },
      {
        t: "fas fa-code-branch",
        sT: [],
      },
      {
        t: "far fa-code-branch",
        sT: [],
      },
      {
        t: "fal fa-code-branch",
        sT: [],
      },
      {
        t: "fad fa-code-branch",
        sT: [],
      },
      {
        t: "fas fa-code-commit",
        sT: [],
      },
      {
        t: "far fa-code-commit",
        sT: [],
      },
      {
        t: "fal fa-code-commit",
        sT: [],
      },
      {
        t: "fad fa-code-commit",
        sT: [],
      },
      {
        t: "fas fa-code-merge",
        sT: [],
      },
      {
        t: "far fa-code-merge",
        sT: [],
      },
      {
        t: "fal fa-code-merge",
        sT: [],
      },
      {
        t: "fad fa-code-merge",
        sT: [],
      },
      {
        t: "fab fa-codepen",
        sT: [],
      },
      {
        t: "fab fa-codiepie",
        sT: [],
      },
      {
        t: "fas fa-coffee",
        sT: [],
      },
      {
        t: "far fa-coffee",
        sT: [],
      },
      {
        t: "fal fa-coffee",
        sT: [],
      },
      {
        t: "fad fa-coffee",
        sT: [],
      },
      {
        t: "fas fa-coffee-pot",
        sT: [],
      },
      {
        t: "far fa-coffee-pot",
        sT: [],
      },
      {
        t: "fal fa-coffee-pot",
        sT: [],
      },
      {
        t: "fad fa-coffee-pot",
        sT: [],
      },
      {
        t: "fas fa-coffee-togo",
        sT: [],
      },
      {
        t: "far fa-coffee-togo",
        sT: [],
      },
      {
        t: "fal fa-coffee-togo",
        sT: [],
      },
      {
        t: "fad fa-coffee-togo",
        sT: [],
      },
      {
        t: "fas fa-coffin",
        sT: [],
      },
      {
        t: "far fa-coffin",
        sT: [],
      },
      {
        t: "fal fa-coffin",
        sT: [],
      },
      {
        t: "fad fa-coffin",
        sT: [],
      },
      {
        t: "fas fa-coffin-cross",
        sT: [],
      },
      {
        t: "far fa-coffin-cross",
        sT: [],
      },
      {
        t: "fal fa-coffin-cross",
        sT: [],
      },
      {
        t: "fad fa-coffin-cross",
        sT: [],
      },
      {
        t: "fas fa-cog",
        sT: [],
      },
      {
        t: "far fa-cog",
        sT: [],
      },
      {
        t: "fal fa-cog",
        sT: [],
      },
      {
        t: "fad fa-cog",
        sT: [],
      },
      {
        t: "fas fa-cogs",
        sT: [],
      },
      {
        t: "far fa-cogs",
        sT: [],
      },
      {
        t: "fal fa-cogs",
        sT: [],
      },
      {
        t: "fad fa-cogs",
        sT: [],
      },
      {
        t: "fas fa-coin",
        sT: [],
      },
      {
        t: "far fa-coin",
        sT: [],
      },
      {
        t: "fal fa-coin",
        sT: [],
      },
      {
        t: "fad fa-coin",
        sT: [],
      },
      {
        t: "fas fa-coins",
        sT: [],
      },
      {
        t: "far fa-coins",
        sT: [],
      },
      {
        t: "fal fa-coins",
        sT: [],
      },
      {
        t: "fad fa-coins",
        sT: [],
      },
      {
        t: "fas fa-columns",
        sT: [],
      },
      {
        t: "far fa-columns",
        sT: [],
      },
      {
        t: "fal fa-columns",
        sT: [],
      },
      {
        t: "fad fa-columns",
        sT: [],
      },
      {
        t: "fas fa-comet",
        sT: [],
      },
      {
        t: "far fa-comet",
        sT: [],
      },
      {
        t: "fal fa-comet",
        sT: [],
      },
      {
        t: "fad fa-comet",
        sT: [],
      },
      {
        t: "fas fa-comment",
        sT: [],
      },
      {
        t: "far fa-comment",
        sT: [],
      },
      {
        t: "fal fa-comment",
        sT: [],
      },
      {
        t: "fad fa-comment",
        sT: [],
      },
      {
        t: "fas fa-comment-alt",
        sT: [],
      },
      {
        t: "far fa-comment-alt",
        sT: [],
      },
      {
        t: "fal fa-comment-alt",
        sT: [],
      },
      {
        t: "fad fa-comment-alt",
        sT: [],
      },
      {
        t: "fas fa-comment-alt-check",
        sT: [],
      },
      {
        t: "far fa-comment-alt-check",
        sT: [],
      },
      {
        t: "fal fa-comment-alt-check",
        sT: [],
      },
      {
        t: "fad fa-comment-alt-check",
        sT: [],
      },
      {
        t: "fas fa-comment-alt-dollar",
        sT: [],
      },
      {
        t: "far fa-comment-alt-dollar",
        sT: [],
      },
      {
        t: "fal fa-comment-alt-dollar",
        sT: [],
      },
      {
        t: "fad fa-comment-alt-dollar",
        sT: [],
      },
      {
        t: "fas fa-comment-alt-dots",
        sT: [],
      },
      {
        t: "far fa-comment-alt-dots",
        sT: [],
      },
      {
        t: "fal fa-comment-alt-dots",
        sT: [],
      },
      {
        t: "fad fa-comment-alt-dots",
        sT: [],
      },
      {
        t: "fas fa-comment-alt-edit",
        sT: [],
      },
      {
        t: "far fa-comment-alt-edit",
        sT: [],
      },
      {
        t: "fal fa-comment-alt-edit",
        sT: [],
      },
      {
        t: "fad fa-comment-alt-edit",
        sT: [],
      },
      {
        t: "fas fa-comment-alt-exclamation",
        sT: [],
      },
      {
        t: "far fa-comment-alt-exclamation",
        sT: [],
      },
      {
        t: "fal fa-comment-alt-exclamation",
        sT: [],
      },
      {
        t: "fad fa-comment-alt-exclamation",
        sT: [],
      },
      {
        t: "fas fa-comment-alt-lines",
        sT: [],
      },
      {
        t: "far fa-comment-alt-lines",
        sT: [],
      },
      {
        t: "fal fa-comment-alt-lines",
        sT: [],
      },
      {
        t: "fad fa-comment-alt-lines",
        sT: [],
      },
      {
        t: "fas fa-comment-alt-medical",
        sT: [],
      },
      {
        t: "far fa-comment-alt-medical",
        sT: [],
      },
      {
        t: "fal fa-comment-alt-medical",
        sT: [],
      },
      {
        t: "fad fa-comment-alt-medical",
        sT: [],
      },
      {
        t: "fas fa-comment-alt-minus",
        sT: [],
      },
      {
        t: "far fa-comment-alt-minus",
        sT: [],
      },
      {
        t: "fal fa-comment-alt-minus",
        sT: [],
      },
      {
        t: "fad fa-comment-alt-minus",
        sT: [],
      },
      {
        t: "fas fa-comment-alt-music",
        sT: [],
      },
      {
        t: "far fa-comment-alt-music",
        sT: [],
      },
      {
        t: "fal fa-comment-alt-music",
        sT: [],
      },
      {
        t: "fad fa-comment-alt-music",
        sT: [],
      },
      {
        t: "fas fa-comment-alt-plus",
        sT: [],
      },
      {
        t: "far fa-comment-alt-plus",
        sT: [],
      },
      {
        t: "fal fa-comment-alt-plus",
        sT: [],
      },
      {
        t: "fad fa-comment-alt-plus",
        sT: [],
      },
      {
        t: "fas fa-comment-alt-slash",
        sT: [],
      },
      {
        t: "far fa-comment-alt-slash",
        sT: [],
      },
      {
        t: "fal fa-comment-alt-slash",
        sT: [],
      },
      {
        t: "fad fa-comment-alt-slash",
        sT: [],
      },
      {
        t: "fas fa-comment-alt-smile",
        sT: [],
      },
      {
        t: "far fa-comment-alt-smile",
        sT: [],
      },
      {
        t: "fal fa-comment-alt-smile",
        sT: [],
      },
      {
        t: "fad fa-comment-alt-smile",
        sT: [],
      },
      {
        t: "fas fa-comment-alt-times",
        sT: [],
      },
      {
        t: "far fa-comment-alt-times",
        sT: [],
      },
      {
        t: "fal fa-comment-alt-times",
        sT: [],
      },
      {
        t: "fad fa-comment-alt-times",
        sT: [],
      },
      {
        t: "fas fa-comment-check",
        sT: [],
      },
      {
        t: "far fa-comment-check",
        sT: [],
      },
      {
        t: "fal fa-comment-check",
        sT: [],
      },
      {
        t: "fad fa-comment-check",
        sT: [],
      },
      {
        t: "fas fa-comment-dollar",
        sT: [],
      },
      {
        t: "far fa-comment-dollar",
        sT: [],
      },
      {
        t: "fal fa-comment-dollar",
        sT: [],
      },
      {
        t: "fad fa-comment-dollar",
        sT: [],
      },
      {
        t: "fas fa-comment-dots",
        sT: [],
      },
      {
        t: "far fa-comment-dots",
        sT: [],
      },
      {
        t: "fal fa-comment-dots",
        sT: [],
      },
      {
        t: "fad fa-comment-dots",
        sT: [],
      },
      {
        t: "fas fa-comment-edit",
        sT: [],
      },
      {
        t: "far fa-comment-edit",
        sT: [],
      },
      {
        t: "fal fa-comment-edit",
        sT: [],
      },
      {
        t: "fad fa-comment-edit",
        sT: [],
      },
      {
        t: "fas fa-comment-exclamation",
        sT: [],
      },
      {
        t: "far fa-comment-exclamation",
        sT: [],
      },
      {
        t: "fal fa-comment-exclamation",
        sT: [],
      },
      {
        t: "fad fa-comment-exclamation",
        sT: [],
      },
      {
        t: "fas fa-comment-lines",
        sT: [],
      },
      {
        t: "far fa-comment-lines",
        sT: [],
      },
      {
        t: "fal fa-comment-lines",
        sT: [],
      },
      {
        t: "fad fa-comment-lines",
        sT: [],
      },
      {
        t: "fas fa-comment-medical",
        sT: [],
      },
      {
        t: "far fa-comment-medical",
        sT: [],
      },
      {
        t: "fal fa-comment-medical",
        sT: [],
      },
      {
        t: "fad fa-comment-medical",
        sT: [],
      },
      {
        t: "fas fa-comment-minus",
        sT: [],
      },
      {
        t: "far fa-comment-minus",
        sT: [],
      },
      {
        t: "fal fa-comment-minus",
        sT: [],
      },
      {
        t: "fad fa-comment-minus",
        sT: [],
      },
      {
        t: "fas fa-comment-music",
        sT: [],
      },
      {
        t: "far fa-comment-music",
        sT: [],
      },
      {
        t: "fal fa-comment-music",
        sT: [],
      },
      {
        t: "fad fa-comment-music",
        sT: [],
      },
      {
        t: "fas fa-comment-plus",
        sT: [],
      },
      {
        t: "far fa-comment-plus",
        sT: [],
      },
      {
        t: "fal fa-comment-plus",
        sT: [],
      },
      {
        t: "fad fa-comment-plus",
        sT: [],
      },
      {
        t: "fas fa-comment-slash",
        sT: [],
      },
      {
        t: "far fa-comment-slash",
        sT: [],
      },
      {
        t: "fal fa-comment-slash",
        sT: [],
      },
      {
        t: "fad fa-comment-slash",
        sT: [],
      },
      {
        t: "fas fa-comment-smile",
        sT: [],
      },
      {
        t: "far fa-comment-smile",
        sT: [],
      },
      {
        t: "fal fa-comment-smile",
        sT: [],
      },
      {
        t: "fad fa-comment-smile",
        sT: [],
      },
      {
        t: "fas fa-comment-times",
        sT: [],
      },
      {
        t: "far fa-comment-times",
        sT: [],
      },
      {
        t: "fal fa-comment-times",
        sT: [],
      },
      {
        t: "fad fa-comment-times",
        sT: [],
      },
      {
        t: "fas fa-comments",
        sT: [],
      },
      {
        t: "far fa-comments",
        sT: [],
      },
      {
        t: "fal fa-comments",
        sT: [],
      },
      {
        t: "fad fa-comments",
        sT: [],
      },
      {
        t: "fas fa-comments-alt",
        sT: [],
      },
      {
        t: "far fa-comments-alt",
        sT: [],
      },
      {
        t: "fal fa-comments-alt",
        sT: [],
      },
      {
        t: "fad fa-comments-alt",
        sT: [],
      },
      {
        t: "fas fa-comments-alt-dollar",
        sT: [],
      },
      {
        t: "far fa-comments-alt-dollar",
        sT: [],
      },
      {
        t: "fal fa-comments-alt-dollar",
        sT: [],
      },
      {
        t: "fad fa-comments-alt-dollar",
        sT: [],
      },
      {
        t: "fas fa-comments-dollar",
        sT: [],
      },
      {
        t: "far fa-comments-dollar",
        sT: [],
      },
      {
        t: "fal fa-comments-dollar",
        sT: [],
      },
      {
        t: "fad fa-comments-dollar",
        sT: [],
      },
      {
        t: "fas fa-compact-disc",
        sT: [],
      },
      {
        t: "far fa-compact-disc",
        sT: [],
      },
      {
        t: "fal fa-compact-disc",
        sT: [],
      },
      {
        t: "fad fa-compact-disc",
        sT: [],
      },
      {
        t: "fas fa-compass",
        sT: [],
      },
      {
        t: "far fa-compass",
        sT: [],
      },
      {
        t: "fal fa-compass",
        sT: [],
      },
      {
        t: "fad fa-compass",
        sT: [],
      },
      {
        t: "fas fa-compass-slash",
        sT: [],
      },
      {
        t: "far fa-compass-slash",
        sT: [],
      },
      {
        t: "fal fa-compass-slash",
        sT: [],
      },
      {
        t: "fad fa-compass-slash",
        sT: [],
      },
      {
        t: "fas fa-compress",
        sT: [],
      },
      {
        t: "far fa-compress",
        sT: [],
      },
      {
        t: "fal fa-compress",
        sT: [],
      },
      {
        t: "fad fa-compress",
        sT: [],
      },
      {
        t: "fas fa-compress-alt",
        sT: [],
      },
      {
        t: "far fa-compress-alt",
        sT: [],
      },
      {
        t: "fal fa-compress-alt",
        sT: [],
      },
      {
        t: "fad fa-compress-alt",
        sT: [],
      },
      {
        t: "fas fa-compress-arrows-alt",
        sT: [],
      },
      {
        t: "far fa-compress-arrows-alt",
        sT: [],
      },
      {
        t: "fal fa-compress-arrows-alt",
        sT: [],
      },
      {
        t: "fad fa-compress-arrows-alt",
        sT: [],
      },
      {
        t: "fas fa-compress-wide",
        sT: [],
      },
      {
        t: "far fa-compress-wide",
        sT: [],
      },
      {
        t: "fal fa-compress-wide",
        sT: [],
      },
      {
        t: "fad fa-compress-wide",
        sT: [],
      },
      {
        t: "fas fa-computer-classic",
        sT: [],
      },
      {
        t: "far fa-computer-classic",
        sT: [],
      },
      {
        t: "fal fa-computer-classic",
        sT: [],
      },
      {
        t: "fad fa-computer-classic",
        sT: [],
      },
      {
        t: "fas fa-computer-speaker",
        sT: [],
      },
      {
        t: "far fa-computer-speaker",
        sT: [],
      },
      {
        t: "fal fa-computer-speaker",
        sT: [],
      },
      {
        t: "fad fa-computer-speaker",
        sT: [],
      },
      {
        t: "fas fa-concierge-bell",
        sT: [],
      },
      {
        t: "far fa-concierge-bell",
        sT: [],
      },
      {
        t: "fal fa-concierge-bell",
        sT: [],
      },
      {
        t: "fad fa-concierge-bell",
        sT: [],
      },
      {
        t: "fab fa-confluence",
        sT: [],
      },
      {
        t: "fab fa-connectdevelop",
        sT: [],
      },
      {
        t: "fas fa-construction",
        sT: [],
      },
      {
        t: "far fa-construction",
        sT: [],
      },
      {
        t: "fal fa-construction",
        sT: [],
      },
      {
        t: "fad fa-construction",
        sT: [],
      },
      {
        t: "fas fa-container-storage",
        sT: [],
      },
      {
        t: "far fa-container-storage",
        sT: [],
      },
      {
        t: "fal fa-container-storage",
        sT: [],
      },
      {
        t: "fad fa-container-storage",
        sT: [],
      },
      {
        t: "fab fa-contao",
        sT: [],
      },
      {
        t: "fas fa-conveyor-belt",
        sT: [],
      },
      {
        t: "far fa-conveyor-belt",
        sT: [],
      },
      {
        t: "fal fa-conveyor-belt",
        sT: [],
      },
      {
        t: "fad fa-conveyor-belt",
        sT: [],
      },
      {
        t: "fas fa-conveyor-belt-alt",
        sT: [],
      },
      {
        t: "far fa-conveyor-belt-alt",
        sT: [],
      },
      {
        t: "fal fa-conveyor-belt-alt",
        sT: [],
      },
      {
        t: "fad fa-conveyor-belt-alt",
        sT: [],
      },
      {
        t: "fas fa-cookie",
        sT: [],
      },
      {
        t: "far fa-cookie",
        sT: [],
      },
      {
        t: "fal fa-cookie",
        sT: [],
      },
      {
        t: "fad fa-cookie",
        sT: [],
      },
      {
        t: "fas fa-cookie-bite",
        sT: [],
      },
      {
        t: "far fa-cookie-bite",
        sT: [],
      },
      {
        t: "fal fa-cookie-bite",
        sT: [],
      },
      {
        t: "fad fa-cookie-bite",
        sT: [],
      },
      {
        t: "fas fa-copy",
        sT: [],
      },
      {
        t: "far fa-copy",
        sT: [],
      },
      {
        t: "fal fa-copy",
        sT: [],
      },
      {
        t: "fad fa-copy",
        sT: [],
      },
      {
        t: "fas fa-copyright",
        sT: [],
      },
      {
        t: "far fa-copyright",
        sT: [],
      },
      {
        t: "fal fa-copyright",
        sT: [],
      },
      {
        t: "fad fa-copyright",
        sT: [],
      },
      {
        t: "fas fa-corn",
        sT: [],
      },
      {
        t: "far fa-corn",
        sT: [],
      },
      {
        t: "fal fa-corn",
        sT: [],
      },
      {
        t: "fad fa-corn",
        sT: [],
      },
      {
        t: "fab fa-cotton-bureau",
        sT: [],
      },
      {
        t: "fas fa-couch",
        sT: [],
      },
      {
        t: "far fa-couch",
        sT: [],
      },
      {
        t: "fal fa-couch",
        sT: [],
      },
      {
        t: "fad fa-couch",
        sT: [],
      },
      {
        t: "fas fa-cow",
        sT: [],
      },
      {
        t: "far fa-cow",
        sT: [],
      },
      {
        t: "fal fa-cow",
        sT: [],
      },
      {
        t: "fad fa-cow",
        sT: [],
      },
      {
        t: "fas fa-cowbell",
        sT: [],
      },
      {
        t: "far fa-cowbell",
        sT: [],
      },
      {
        t: "fal fa-cowbell",
        sT: [],
      },
      {
        t: "fad fa-cowbell",
        sT: [],
      },
      {
        t: "fas fa-cowbell-more",
        sT: [],
      },
      {
        t: "far fa-cowbell-more",
        sT: [],
      },
      {
        t: "fal fa-cowbell-more",
        sT: [],
      },
      {
        t: "fad fa-cowbell-more",
        sT: [],
      },
      {
        t: "fab fa-cpanel",
        sT: [],
      },
      {
        t: "fab fa-creative-commons",
        sT: [],
      },
      {
        t: "fab fa-creative-commons-by",
        sT: [],
      },
      {
        t: "fab fa-creative-commons-nc",
        sT: [],
      },
      {
        t: "fab fa-creative-commons-nc-eu",
        sT: [],
      },
      {
        t: "fab fa-creative-commons-nc-jp",
        sT: [],
      },
      {
        t: "fab fa-creative-commons-nd",
        sT: [],
      },
      {
        t: "fab fa-creative-commons-pd",
        sT: [],
      },
      {
        t: "fab fa-creative-commons-pd-alt",
        sT: [],
      },
      {
        t: "fab fa-creative-commons-remix",
        sT: [],
      },
      {
        t: "fab fa-creative-commons-sa",
        sT: [],
      },
      {
        t: "fab fa-creative-commons-sampling",
        sT: [],
      },
      {
        t: "fab fa-creative-commons-sampling-plus",
        sT: [],
      },
      {
        t: "fab fa-creative-commons-share",
        sT: [],
      },
      {
        t: "fab fa-creative-commons-zero",
        sT: [],
      },
      {
        t: "fas fa-credit-card",
        sT: [],
      },
      {
        t: "far fa-credit-card",
        sT: [],
      },
      {
        t: "fal fa-credit-card",
        sT: [],
      },
      {
        t: "fad fa-credit-card",
        sT: [],
      },
      {
        t: "fas fa-credit-card-blank",
        sT: [],
      },
      {
        t: "far fa-credit-card-blank",
        sT: [],
      },
      {
        t: "fal fa-credit-card-blank",
        sT: [],
      },
      {
        t: "fad fa-credit-card-blank",
        sT: [],
      },
      {
        t: "fas fa-credit-card-front",
        sT: [],
      },
      {
        t: "far fa-credit-card-front",
        sT: [],
      },
      {
        t: "fal fa-credit-card-front",
        sT: [],
      },
      {
        t: "fad fa-credit-card-front",
        sT: [],
      },
      {
        t: "fas fa-cricket",
        sT: [],
      },
      {
        t: "far fa-cricket",
        sT: [],
      },
      {
        t: "fal fa-cricket",
        sT: [],
      },
      {
        t: "fad fa-cricket",
        sT: [],
      },
      {
        t: "fab fa-critical-role",
        sT: [],
      },
      {
        t: "fas fa-croissant",
        sT: [],
      },
      {
        t: "far fa-croissant",
        sT: [],
      },
      {
        t: "fal fa-croissant",
        sT: [],
      },
      {
        t: "fad fa-croissant",
        sT: [],
      },
      {
        t: "fas fa-crop",
        sT: [],
      },
      {
        t: "far fa-crop",
        sT: [],
      },
      {
        t: "fal fa-crop",
        sT: [],
      },
      {
        t: "fad fa-crop",
        sT: [],
      },
      {
        t: "fas fa-crop-alt",
        sT: [],
      },
      {
        t: "far fa-crop-alt",
        sT: [],
      },
      {
        t: "fal fa-crop-alt",
        sT: [],
      },
      {
        t: "fad fa-crop-alt",
        sT: [],
      },
      {
        t: "fas fa-cross",
        sT: [],
      },
      {
        t: "far fa-cross",
        sT: [],
      },
      {
        t: "fal fa-cross",
        sT: [],
      },
      {
        t: "fad fa-cross",
        sT: [],
      },
      {
        t: "fas fa-crosshairs",
        sT: [],
      },
      {
        t: "far fa-crosshairs",
        sT: [],
      },
      {
        t: "fal fa-crosshairs",
        sT: [],
      },
      {
        t: "fad fa-crosshairs",
        sT: [],
      },
      {
        t: "fas fa-crow",
        sT: [],
      },
      {
        t: "far fa-crow",
        sT: [],
      },
      {
        t: "fal fa-crow",
        sT: [],
      },
      {
        t: "fad fa-crow",
        sT: [],
      },
      {
        t: "fas fa-crown",
        sT: [],
      },
      {
        t: "far fa-crown",
        sT: [],
      },
      {
        t: "fal fa-crown",
        sT: [],
      },
      {
        t: "fad fa-crown",
        sT: [],
      },
      {
        t: "fas fa-crutch",
        sT: [],
      },
      {
        t: "far fa-crutch",
        sT: [],
      },
      {
        t: "fal fa-crutch",
        sT: [],
      },
      {
        t: "fad fa-crutch",
        sT: [],
      },
      {
        t: "fas fa-crutches",
        sT: [],
      },
      {
        t: "far fa-crutches",
        sT: [],
      },
      {
        t: "fal fa-crutches",
        sT: [],
      },
      {
        t: "fad fa-crutches",
        sT: [],
      },
      {
        t: "fab fa-css3",
        sT: [],
      },
      {
        t: "fab fa-css3-alt",
        sT: [],
      },
      {
        t: "fas fa-cube",
        sT: [],
      },
      {
        t: "far fa-cube",
        sT: [],
      },
      {
        t: "fal fa-cube",
        sT: [],
      },
      {
        t: "fad fa-cube",
        sT: [],
      },
      {
        t: "fas fa-cubes",
        sT: [],
      },
      {
        t: "far fa-cubes",
        sT: [],
      },
      {
        t: "fal fa-cubes",
        sT: [],
      },
      {
        t: "fad fa-cubes",
        sT: [],
      },
      {
        t: "fas fa-curling",
        sT: [],
      },
      {
        t: "far fa-curling",
        sT: [],
      },
      {
        t: "fal fa-curling",
        sT: [],
      },
      {
        t: "fad fa-curling",
        sT: [],
      },
      {
        t: "fas fa-cut",
        sT: [],
      },
      {
        t: "far fa-cut",
        sT: [],
      },
      {
        t: "fal fa-cut",
        sT: [],
      },
      {
        t: "fad fa-cut",
        sT: [],
      },
      {
        t: "fab fa-cuttlefish",
        sT: [],
      },
      {
        t: "fab fa-d-and-d",
        sT: [],
      },
      {
        t: "fab fa-d-and-d-beyond",
        sT: [],
      },
      {
        t: "fas fa-dagger",
        sT: [],
      },
      {
        t: "far fa-dagger",
        sT: [],
      },
      {
        t: "fal fa-dagger",
        sT: [],
      },
      {
        t: "fad fa-dagger",
        sT: [],
      },
      {
        t: "fab fa-dailymotion",
        sT: [],
      },
      {
        t: "fab fa-dashcube",
        sT: [],
      },
      {
        t: "fas fa-database",
        sT: [],
      },
      {
        t: "far fa-database",
        sT: [],
      },
      {
        t: "fal fa-database",
        sT: [],
      },
      {
        t: "fad fa-database",
        sT: [],
      },
      {
        t: "fas fa-deaf",
        sT: [],
      },
      {
        t: "far fa-deaf",
        sT: [],
      },
      {
        t: "fal fa-deaf",
        sT: [],
      },
      {
        t: "fad fa-deaf",
        sT: [],
      },
      {
        t: "fas fa-debug",
        sT: [],
      },
      {
        t: "far fa-debug",
        sT: [],
      },
      {
        t: "fal fa-debug",
        sT: [],
      },
      {
        t: "fad fa-debug",
        sT: [],
      },
      {
        t: "fas fa-deer",
        sT: [],
      },
      {
        t: "far fa-deer",
        sT: [],
      },
      {
        t: "fal fa-deer",
        sT: [],
      },
      {
        t: "fad fa-deer",
        sT: [],
      },
      {
        t: "fas fa-deer-rudolph",
        sT: [],
      },
      {
        t: "far fa-deer-rudolph",
        sT: [],
      },
      {
        t: "fal fa-deer-rudolph",
        sT: [],
      },
      {
        t: "fad fa-deer-rudolph",
        sT: [],
      },
      {
        t: "fab fa-deezer",
        sT: [],
      },
      {
        t: "fab fa-delicious",
        sT: [],
      },
      {
        t: "fas fa-democrat",
        sT: [],
      },
      {
        t: "far fa-democrat",
        sT: [],
      },
      {
        t: "fal fa-democrat",
        sT: [],
      },
      {
        t: "fad fa-democrat",
        sT: [],
      },
      {
        t: "fab fa-deploydog",
        sT: [],
      },
      {
        t: "fab fa-deskpro",
        sT: [],
      },
      {
        t: "fas fa-desktop",
        sT: [],
      },
      {
        t: "far fa-desktop",
        sT: [],
      },
      {
        t: "fal fa-desktop",
        sT: [],
      },
      {
        t: "fad fa-desktop",
        sT: [],
      },
      {
        t: "fas fa-desktop-alt",
        sT: [],
      },
      {
        t: "far fa-desktop-alt",
        sT: [],
      },
      {
        t: "fal fa-desktop-alt",
        sT: [],
      },
      {
        t: "fad fa-desktop-alt",
        sT: [],
      },
      {
        t: "fab fa-dev",
        sT: [],
      },
      {
        t: "fab fa-deviantart",
        sT: [],
      },
      {
        t: "fas fa-dewpoint",
        sT: [],
      },
      {
        t: "far fa-dewpoint",
        sT: [],
      },
      {
        t: "fal fa-dewpoint",
        sT: [],
      },
      {
        t: "fad fa-dewpoint",
        sT: [],
      },
      {
        t: "fas fa-dharmachakra",
        sT: [],
      },
      {
        t: "far fa-dharmachakra",
        sT: [],
      },
      {
        t: "fal fa-dharmachakra",
        sT: [],
      },
      {
        t: "fad fa-dharmachakra",
        sT: [],
      },
      {
        t: "fab fa-dhl",
        sT: [],
      },
      {
        t: "fas fa-diagnoses",
        sT: [],
      },
      {
        t: "far fa-diagnoses",
        sT: [],
      },
      {
        t: "fal fa-diagnoses",
        sT: [],
      },
      {
        t: "fad fa-diagnoses",
        sT: [],
      },
      {
        t: "fas fa-diamond",
        sT: [],
      },
      {
        t: "far fa-diamond",
        sT: [],
      },
      {
        t: "fal fa-diamond",
        sT: [],
      },
      {
        t: "fad fa-diamond",
        sT: [],
      },
      {
        t: "fab fa-diaspora",
        sT: [],
      },
      {
        t: "fas fa-dice",
        sT: [],
      },
      {
        t: "far fa-dice",
        sT: [],
      },
      {
        t: "fal fa-dice",
        sT: [],
      },
      {
        t: "fad fa-dice",
        sT: [],
      },
      {
        t: "fas fa-dice-d10",
        sT: [],
      },
      {
        t: "far fa-dice-d10",
        sT: [],
      },
      {
        t: "fal fa-dice-d10",
        sT: [],
      },
      {
        t: "fad fa-dice-d10",
        sT: [],
      },
      {
        t: "fas fa-dice-d12",
        sT: [],
      },
      {
        t: "far fa-dice-d12",
        sT: [],
      },
      {
        t: "fal fa-dice-d12",
        sT: [],
      },
      {
        t: "fad fa-dice-d12",
        sT: [],
      },
      {
        t: "fas fa-dice-d20",
        sT: [],
      },
      {
        t: "far fa-dice-d20",
        sT: [],
      },
      {
        t: "fal fa-dice-d20",
        sT: [],
      },
      {
        t: "fad fa-dice-d20",
        sT: [],
      },
      {
        t: "fas fa-dice-d4",
        sT: [],
      },
      {
        t: "far fa-dice-d4",
        sT: [],
      },
      {
        t: "fal fa-dice-d4",
        sT: [],
      },
      {
        t: "fad fa-dice-d4",
        sT: [],
      },
      {
        t: "fas fa-dice-d6",
        sT: [],
      },
      {
        t: "far fa-dice-d6",
        sT: [],
      },
      {
        t: "fal fa-dice-d6",
        sT: [],
      },
      {
        t: "fad fa-dice-d6",
        sT: [],
      },
      {
        t: "fas fa-dice-d8",
        sT: [],
      },
      {
        t: "far fa-dice-d8",
        sT: [],
      },
      {
        t: "fal fa-dice-d8",
        sT: [],
      },
      {
        t: "fad fa-dice-d8",
        sT: [],
      },
      {
        t: "fas fa-dice-five",
        sT: [],
      },
      {
        t: "far fa-dice-five",
        sT: [],
      },
      {
        t: "fal fa-dice-five",
        sT: [],
      },
      {
        t: "fad fa-dice-five",
        sT: [],
      },
      {
        t: "fas fa-dice-four",
        sT: [],
      },
      {
        t: "far fa-dice-four",
        sT: [],
      },
      {
        t: "fal fa-dice-four",
        sT: [],
      },
      {
        t: "fad fa-dice-four",
        sT: [],
      },
      {
        t: "fas fa-dice-one",
        sT: [],
      },
      {
        t: "far fa-dice-one",
        sT: [],
      },
      {
        t: "fal fa-dice-one",
        sT: [],
      },
      {
        t: "fad fa-dice-one",
        sT: [],
      },
      {
        t: "fas fa-dice-six",
        sT: [],
      },
      {
        t: "far fa-dice-six",
        sT: [],
      },
      {
        t: "fal fa-dice-six",
        sT: [],
      },
      {
        t: "fad fa-dice-six",
        sT: [],
      },
      {
        t: "fas fa-dice-three",
        sT: [],
      },
      {
        t: "far fa-dice-three",
        sT: [],
      },
      {
        t: "fal fa-dice-three",
        sT: [],
      },
      {
        t: "fad fa-dice-three",
        sT: [],
      },
      {
        t: "fas fa-dice-two",
        sT: [],
      },
      {
        t: "far fa-dice-two",
        sT: [],
      },
      {
        t: "fal fa-dice-two",
        sT: [],
      },
      {
        t: "fad fa-dice-two",
        sT: [],
      },
      {
        t: "fab fa-digg",
        sT: [],
      },
      {
        t: "fas fa-digging",
        sT: [],
      },
      {
        t: "far fa-digging",
        sT: [],
      },
      {
        t: "fal fa-digging",
        sT: [],
      },
      {
        t: "fad fa-digging",
        sT: [],
      },
      {
        t: "fab fa-digital-ocean",
        sT: [],
      },
      {
        t: "fas fa-digital-tachograph",
        sT: [],
      },
      {
        t: "far fa-digital-tachograph",
        sT: [],
      },
      {
        t: "fal fa-digital-tachograph",
        sT: [],
      },
      {
        t: "fad fa-digital-tachograph",
        sT: [],
      },
      {
        t: "fas fa-diploma",
        sT: [],
      },
      {
        t: "far fa-diploma",
        sT: [],
      },
      {
        t: "fal fa-diploma",
        sT: [],
      },
      {
        t: "fad fa-diploma",
        sT: [],
      },
      {
        t: "fas fa-directions",
        sT: [],
      },
      {
        t: "far fa-directions",
        sT: [],
      },
      {
        t: "fal fa-directions",
        sT: [],
      },
      {
        t: "fad fa-directions",
        sT: [],
      },
      {
        t: "fas fa-disc-drive",
        sT: [],
      },
      {
        t: "far fa-disc-drive",
        sT: [],
      },
      {
        t: "fal fa-disc-drive",
        sT: [],
      },
      {
        t: "fad fa-disc-drive",
        sT: [],
      },
      {
        t: "fab fa-discord",
        sT: [],
      },
      {
        t: "fab fa-discourse",
        sT: [],
      },
      {
        t: "fas fa-disease",
        sT: [],
      },
      {
        t: "far fa-disease",
        sT: [],
      },
      {
        t: "fal fa-disease",
        sT: [],
      },
      {
        t: "fad fa-disease",
        sT: [],
      },
      {
        t: "fas fa-divide",
        sT: [],
      },
      {
        t: "far fa-divide",
        sT: [],
      },
      {
        t: "fal fa-divide",
        sT: [],
      },
      {
        t: "fad fa-divide",
        sT: [],
      },
      {
        t: "fas fa-dizzy",
        sT: [],
      },
      {
        t: "far fa-dizzy",
        sT: [],
      },
      {
        t: "fal fa-dizzy",
        sT: [],
      },
      {
        t: "fad fa-dizzy",
        sT: [],
      },
      {
        t: "fas fa-dna",
        sT: [],
      },
      {
        t: "far fa-dna",
        sT: [],
      },
      {
        t: "fal fa-dna",
        sT: [],
      },
      {
        t: "fad fa-dna",
        sT: [],
      },
      {
        t: "fas fa-do-not-enter",
        sT: [],
      },
      {
        t: "far fa-do-not-enter",
        sT: [],
      },
      {
        t: "fal fa-do-not-enter",
        sT: [],
      },
      {
        t: "fad fa-do-not-enter",
        sT: [],
      },
      {
        t: "fab fa-dochub",
        sT: [],
      },
      {
        t: "fab fa-docker",
        sT: [],
      },
      {
        t: "fas fa-dog",
        sT: [],
      },
      {
        t: "far fa-dog",
        sT: [],
      },
      {
        t: "fal fa-dog",
        sT: [],
      },
      {
        t: "fad fa-dog",
        sT: [],
      },
      {
        t: "fas fa-dog-leashed",
        sT: [],
      },
      {
        t: "far fa-dog-leashed",
        sT: [],
      },
      {
        t: "fal fa-dog-leashed",
        sT: [],
      },
      {
        t: "fad fa-dog-leashed",
        sT: [],
      },
      {
        t: "fas fa-dollar-sign",
        sT: [],
      },
      {
        t: "far fa-dollar-sign",
        sT: [],
      },
      {
        t: "fal fa-dollar-sign",
        sT: [],
      },
      {
        t: "fad fa-dollar-sign",
        sT: [],
      },
      {
        t: "fas fa-dolly",
        sT: [],
      },
      {
        t: "far fa-dolly",
        sT: [],
      },
      {
        t: "fal fa-dolly",
        sT: [],
      },
      {
        t: "fad fa-dolly",
        sT: [],
      },
      {
        t: "fas fa-dolly-empty",
        sT: [],
      },
      {
        t: "far fa-dolly-empty",
        sT: [],
      },
      {
        t: "fal fa-dolly-empty",
        sT: [],
      },
      {
        t: "fad fa-dolly-empty",
        sT: [],
      },
      {
        t: "fas fa-dolly-flatbed",
        sT: [],
      },
      {
        t: "far fa-dolly-flatbed",
        sT: [],
      },
      {
        t: "fal fa-dolly-flatbed",
        sT: [],
      },
      {
        t: "fad fa-dolly-flatbed",
        sT: [],
      },
      {
        t: "fas fa-dolly-flatbed-alt",
        sT: [],
      },
      {
        t: "far fa-dolly-flatbed-alt",
        sT: [],
      },
      {
        t: "fal fa-dolly-flatbed-alt",
        sT: [],
      },
      {
        t: "fad fa-dolly-flatbed-alt",
        sT: [],
      },
      {
        t: "fas fa-dolly-flatbed-empty",
        sT: [],
      },
      {
        t: "far fa-dolly-flatbed-empty",
        sT: [],
      },
      {
        t: "fal fa-dolly-flatbed-empty",
        sT: [],
      },
      {
        t: "fad fa-dolly-flatbed-empty",
        sT: [],
      },
      {
        t: "fas fa-donate",
        sT: [],
      },
      {
        t: "far fa-donate",
        sT: [],
      },
      {
        t: "fal fa-donate",
        sT: [],
      },
      {
        t: "fad fa-donate",
        sT: [],
      },
      {
        t: "fas fa-door-closed",
        sT: [],
      },
      {
        t: "far fa-door-closed",
        sT: [],
      },
      {
        t: "fal fa-door-closed",
        sT: [],
      },
      {
        t: "fad fa-door-closed",
        sT: [],
      },
      {
        t: "fas fa-door-open",
        sT: [],
      },
      {
        t: "far fa-door-open",
        sT: [],
      },
      {
        t: "fal fa-door-open",
        sT: [],
      },
      {
        t: "fad fa-door-open",
        sT: [],
      },
      {
        t: "fas fa-dot-circle",
        sT: [],
      },
      {
        t: "far fa-dot-circle",
        sT: [],
      },
      {
        t: "fal fa-dot-circle",
        sT: [],
      },
      {
        t: "fad fa-dot-circle",
        sT: [],
      },
      {
        t: "fas fa-dove",
        sT: [],
      },
      {
        t: "far fa-dove",
        sT: [],
      },
      {
        t: "fal fa-dove",
        sT: [],
      },
      {
        t: "fad fa-dove",
        sT: [],
      },
      {
        t: "fas fa-download",
        sT: [],
      },
      {
        t: "far fa-download",
        sT: [],
      },
      {
        t: "fal fa-download",
        sT: [],
      },
      {
        t: "fad fa-download",
        sT: [],
      },
      {
        t: "fab fa-draft2digital",
        sT: [],
      },
      {
        t: "fas fa-drafting-compass",
        sT: [],
      },
      {
        t: "far fa-drafting-compass",
        sT: [],
      },
      {
        t: "fal fa-drafting-compass",
        sT: [],
      },
      {
        t: "fad fa-drafting-compass",
        sT: [],
      },
      {
        t: "fas fa-dragon",
        sT: [],
      },
      {
        t: "far fa-dragon",
        sT: [],
      },
      {
        t: "fal fa-dragon",
        sT: [],
      },
      {
        t: "fad fa-dragon",
        sT: [],
      },
      {
        t: "fas fa-draw-circle",
        sT: [],
      },
      {
        t: "far fa-draw-circle",
        sT: [],
      },
      {
        t: "fal fa-draw-circle",
        sT: [],
      },
      {
        t: "fad fa-draw-circle",
        sT: [],
      },
      {
        t: "fas fa-draw-polygon",
        sT: [],
      },
      {
        t: "far fa-draw-polygon",
        sT: [],
      },
      {
        t: "fal fa-draw-polygon",
        sT: [],
      },
      {
        t: "fad fa-draw-polygon",
        sT: [],
      },
      {
        t: "fas fa-draw-square",
        sT: [],
      },
      {
        t: "far fa-draw-square",
        sT: [],
      },
      {
        t: "fal fa-draw-square",
        sT: [],
      },
      {
        t: "fad fa-draw-square",
        sT: [],
      },
      {
        t: "fas fa-dreidel",
        sT: [],
      },
      {
        t: "far fa-dreidel",
        sT: [],
      },
      {
        t: "fal fa-dreidel",
        sT: [],
      },
      {
        t: "fad fa-dreidel",
        sT: [],
      },
      {
        t: "fab fa-dribbble",
        sT: [],
      },
      {
        t: "fab fa-dribbble-square",
        sT: [],
      },
      {
        t: "fas fa-drone",
        sT: [],
      },
      {
        t: "far fa-drone",
        sT: [],
      },
      {
        t: "fal fa-drone",
        sT: [],
      },
      {
        t: "fad fa-drone",
        sT: [],
      },
      {
        t: "fas fa-drone-alt",
        sT: [],
      },
      {
        t: "far fa-drone-alt",
        sT: [],
      },
      {
        t: "fal fa-drone-alt",
        sT: [],
      },
      {
        t: "fad fa-drone-alt",
        sT: [],
      },
      {
        t: "fab fa-dropbox",
        sT: [],
      },
      {
        t: "fas fa-drum",
        sT: [],
      },
      {
        t: "far fa-drum",
        sT: [],
      },
      {
        t: "fal fa-drum",
        sT: [],
      },
      {
        t: "fad fa-drum",
        sT: [],
      },
      {
        t: "fas fa-drum-steelpan",
        sT: [],
      },
      {
        t: "far fa-drum-steelpan",
        sT: [],
      },
      {
        t: "fal fa-drum-steelpan",
        sT: [],
      },
      {
        t: "fad fa-drum-steelpan",
        sT: [],
      },
      {
        t: "fas fa-drumstick",
        sT: [],
      },
      {
        t: "far fa-drumstick",
        sT: [],
      },
      {
        t: "fal fa-drumstick",
        sT: [],
      },
      {
        t: "fad fa-drumstick",
        sT: [],
      },
      {
        t: "fas fa-drumstick-bite",
        sT: [],
      },
      {
        t: "far fa-drumstick-bite",
        sT: [],
      },
      {
        t: "fal fa-drumstick-bite",
        sT: [],
      },
      {
        t: "fad fa-drumstick-bite",
        sT: [],
      },
      {
        t: "fab fa-drupal",
        sT: [],
      },
      {
        t: "fas fa-dryer",
        sT: [],
      },
      {
        t: "far fa-dryer",
        sT: [],
      },
      {
        t: "fal fa-dryer",
        sT: [],
      },
      {
        t: "fad fa-dryer",
        sT: [],
      },
      {
        t: "fas fa-dryer-alt",
        sT: [],
      },
      {
        t: "far fa-dryer-alt",
        sT: [],
      },
      {
        t: "fal fa-dryer-alt",
        sT: [],
      },
      {
        t: "fad fa-dryer-alt",
        sT: [],
      },
      {
        t: "fas fa-duck",
        sT: [],
      },
      {
        t: "far fa-duck",
        sT: [],
      },
      {
        t: "fal fa-duck",
        sT: [],
      },
      {
        t: "fad fa-duck",
        sT: [],
      },
      {
        t: "fas fa-dumbbell",
        sT: [],
      },
      {
        t: "far fa-dumbbell",
        sT: [],
      },
      {
        t: "fal fa-dumbbell",
        sT: [],
      },
      {
        t: "fad fa-dumbbell",
        sT: [],
      },
      {
        t: "fas fa-dumpster",
        sT: [],
      },
      {
        t: "far fa-dumpster",
        sT: [],
      },
      {
        t: "fal fa-dumpster",
        sT: [],
      },
      {
        t: "fad fa-dumpster",
        sT: [],
      },
      {
        t: "fas fa-dumpster-fire",
        sT: [],
      },
      {
        t: "far fa-dumpster-fire",
        sT: [],
      },
      {
        t: "fal fa-dumpster-fire",
        sT: [],
      },
      {
        t: "fad fa-dumpster-fire",
        sT: [],
      },
      {
        t: "fas fa-dungeon",
        sT: [],
      },
      {
        t: "far fa-dungeon",
        sT: [],
      },
      {
        t: "fal fa-dungeon",
        sT: [],
      },
      {
        t: "fad fa-dungeon",
        sT: [],
      },
      {
        t: "fab fa-dyalog",
        sT: [],
      },
      {
        t: "fas fa-ear",
        sT: [],
      },
      {
        t: "far fa-ear",
        sT: [],
      },
      {
        t: "fal fa-ear",
        sT: [],
      },
      {
        t: "fad fa-ear",
        sT: [],
      },
      {
        t: "fas fa-ear-muffs",
        sT: [],
      },
      {
        t: "far fa-ear-muffs",
        sT: [],
      },
      {
        t: "fal fa-ear-muffs",
        sT: [],
      },
      {
        t: "fad fa-ear-muffs",
        sT: [],
      },
      {
        t: "fab fa-earlybirds",
        sT: [],
      },
      {
        t: "fab fa-ebay",
        sT: [],
      },
      {
        t: "fas fa-eclipse",
        sT: [],
      },
      {
        t: "far fa-eclipse",
        sT: [],
      },
      {
        t: "fal fa-eclipse",
        sT: [],
      },
      {
        t: "fad fa-eclipse",
        sT: [],
      },
      {
        t: "fas fa-eclipse-alt",
        sT: [],
      },
      {
        t: "far fa-eclipse-alt",
        sT: [],
      },
      {
        t: "fal fa-eclipse-alt",
        sT: [],
      },
      {
        t: "fad fa-eclipse-alt",
        sT: [],
      },
      {
        t: "fab fa-edge",
        sT: [],
      },
      {
        t: "fab fa-edge-legacy",
        sT: [],
      },
      {
        t: "fas fa-edit",
        sT: [],
      },
      {
        t: "far fa-edit",
        sT: [],
      },
      {
        t: "fal fa-edit",
        sT: [],
      },
      {
        t: "fad fa-edit",
        sT: [],
      },
      {
        t: "fas fa-egg",
        sT: [],
      },
      {
        t: "far fa-egg",
        sT: [],
      },
      {
        t: "fal fa-egg",
        sT: [],
      },
      {
        t: "fad fa-egg",
        sT: [],
      },
      {
        t: "fas fa-egg-fried",
        sT: [],
      },
      {
        t: "far fa-egg-fried",
        sT: [],
      },
      {
        t: "fal fa-egg-fried",
        sT: [],
      },
      {
        t: "fad fa-egg-fried",
        sT: [],
      },
      {
        t: "fas fa-eject",
        sT: [],
      },
      {
        t: "far fa-eject",
        sT: [],
      },
      {
        t: "fal fa-eject",
        sT: [],
      },
      {
        t: "fad fa-eject",
        sT: [],
      },
      {
        t: "fab fa-elementor",
        sT: [],
      },
      {
        t: "fas fa-elephant",
        sT: [],
      },
      {
        t: "far fa-elephant",
        sT: [],
      },
      {
        t: "fal fa-elephant",
        sT: [],
      },
      {
        t: "fad fa-elephant",
        sT: [],
      },
      {
        t: "fas fa-ellipsis-h",
        sT: [],
      },
      {
        t: "far fa-ellipsis-h",
        sT: [],
      },
      {
        t: "fal fa-ellipsis-h",
        sT: [],
      },
      {
        t: "fad fa-ellipsis-h",
        sT: [],
      },
      {
        t: "fas fa-ellipsis-h-alt",
        sT: [],
      },
      {
        t: "far fa-ellipsis-h-alt",
        sT: [],
      },
      {
        t: "fal fa-ellipsis-h-alt",
        sT: [],
      },
      {
        t: "fad fa-ellipsis-h-alt",
        sT: [],
      },
      {
        t: "fas fa-ellipsis-v",
        sT: [],
      },
      {
        t: "far fa-ellipsis-v",
        sT: [],
      },
      {
        t: "fal fa-ellipsis-v",
        sT: [],
      },
      {
        t: "fad fa-ellipsis-v",
        sT: [],
      },
      {
        t: "fas fa-ellipsis-v-alt",
        sT: [],
      },
      {
        t: "far fa-ellipsis-v-alt",
        sT: [],
      },
      {
        t: "fal fa-ellipsis-v-alt",
        sT: [],
      },
      {
        t: "fad fa-ellipsis-v-alt",
        sT: [],
      },
      {
        t: "fab fa-ello",
        sT: [],
      },
      {
        t: "fab fa-ember",
        sT: [],
      },
      {
        t: "fab fa-empire",
        sT: [],
      },
      {
        t: "fas fa-empty-set",
        sT: [],
      },
      {
        t: "far fa-empty-set",
        sT: [],
      },
      {
        t: "fal fa-empty-set",
        sT: [],
      },
      {
        t: "fad fa-empty-set",
        sT: [],
      },
      {
        t: "fas fa-engine-warning",
        sT: [],
      },
      {
        t: "far fa-engine-warning",
        sT: [],
      },
      {
        t: "fal fa-engine-warning",
        sT: [],
      },
      {
        t: "fad fa-engine-warning",
        sT: [],
      },
      {
        t: "fas fa-envelope",
        sT: [],
      },
      {
        t: "far fa-envelope",
        sT: [],
      },
      {
        t: "fal fa-envelope",
        sT: [],
      },
      {
        t: "fad fa-envelope",
        sT: [],
      },
      {
        t: "fas fa-envelope-open",
        sT: [],
      },
      {
        t: "far fa-envelope-open",
        sT: [],
      },
      {
        t: "fal fa-envelope-open",
        sT: [],
      },
      {
        t: "fad fa-envelope-open",
        sT: [],
      },
      {
        t: "fas fa-envelope-open-dollar",
        sT: [],
      },
      {
        t: "far fa-envelope-open-dollar",
        sT: [],
      },
      {
        t: "fal fa-envelope-open-dollar",
        sT: [],
      },
      {
        t: "fad fa-envelope-open-dollar",
        sT: [],
      },
      {
        t: "fas fa-envelope-open-text",
        sT: [],
      },
      {
        t: "far fa-envelope-open-text",
        sT: [],
      },
      {
        t: "fal fa-envelope-open-text",
        sT: [],
      },
      {
        t: "fad fa-envelope-open-text",
        sT: [],
      },
      {
        t: "fas fa-envelope-square",
        sT: [],
      },
      {
        t: "far fa-envelope-square",
        sT: [],
      },
      {
        t: "fal fa-envelope-square",
        sT: [],
      },
      {
        t: "fad fa-envelope-square",
        sT: [],
      },
      {
        t: "fab fa-envira",
        sT: [],
      },
      {
        t: "fas fa-equals",
        sT: [],
      },
      {
        t: "far fa-equals",
        sT: [],
      },
      {
        t: "fal fa-equals",
        sT: [],
      },
      {
        t: "fad fa-equals",
        sT: [],
      },
      {
        t: "fas fa-eraser",
        sT: [],
      },
      {
        t: "far fa-eraser",
        sT: [],
      },
      {
        t: "fal fa-eraser",
        sT: [],
      },
      {
        t: "fad fa-eraser",
        sT: [],
      },
      {
        t: "fab fa-erlang",
        sT: [],
      },
      {
        t: "fab fa-ethereum",
        sT: [],
      },
      {
        t: "fas fa-ethernet",
        sT: [],
      },
      {
        t: "far fa-ethernet",
        sT: [],
      },
      {
        t: "fal fa-ethernet",
        sT: [],
      },
      {
        t: "fad fa-ethernet",
        sT: [],
      },
      {
        t: "fab fa-etsy",
        sT: [],
      },
      {
        t: "fas fa-euro-sign",
        sT: [],
      },
      {
        t: "far fa-euro-sign",
        sT: [],
      },
      {
        t: "fal fa-euro-sign",
        sT: [],
      },
      {
        t: "fad fa-euro-sign",
        sT: [],
      },
      {
        t: "fab fa-evernote",
        sT: [],
      },
      {
        t: "fas fa-exchange",
        sT: [],
      },
      {
        t: "far fa-exchange",
        sT: [],
      },
      {
        t: "fal fa-exchange",
        sT: [],
      },
      {
        t: "fad fa-exchange",
        sT: [],
      },
      {
        t: "fas fa-exchange-alt",
        sT: [],
      },
      {
        t: "far fa-exchange-alt",
        sT: [],
      },
      {
        t: "fal fa-exchange-alt",
        sT: [],
      },
      {
        t: "fad fa-exchange-alt",
        sT: [],
      },
      {
        t: "fas fa-exclamation",
        sT: [],
      },
      {
        t: "far fa-exclamation",
        sT: [],
      },
      {
        t: "fal fa-exclamation",
        sT: [],
      },
      {
        t: "fad fa-exclamation",
        sT: [],
      },
      {
        t: "fas fa-exclamation-circle",
        sT: [],
      },
      {
        t: "far fa-exclamation-circle",
        sT: [],
      },
      {
        t: "fal fa-exclamation-circle",
        sT: [],
      },
      {
        t: "fad fa-exclamation-circle",
        sT: [],
      },
      {
        t: "fas fa-exclamation-square",
        sT: [],
      },
      {
        t: "far fa-exclamation-square",
        sT: [],
      },
      {
        t: "fal fa-exclamation-square",
        sT: [],
      },
      {
        t: "fad fa-exclamation-square",
        sT: [],
      },
      {
        t: "fas fa-exclamation-triangle",
        sT: [],
      },
      {
        t: "far fa-exclamation-triangle",
        sT: [],
      },
      {
        t: "fal fa-exclamation-triangle",
        sT: [],
      },
      {
        t: "fad fa-exclamation-triangle",
        sT: [],
      },
      {
        t: "fas fa-expand",
        sT: [],
      },
      {
        t: "far fa-expand",
        sT: [],
      },
      {
        t: "fal fa-expand",
        sT: [],
      },
      {
        t: "fad fa-expand",
        sT: [],
      },
      {
        t: "fas fa-expand-alt",
        sT: [],
      },
      {
        t: "far fa-expand-alt",
        sT: [],
      },
      {
        t: "fal fa-expand-alt",
        sT: [],
      },
      {
        t: "fad fa-expand-alt",
        sT: [],
      },
      {
        t: "fas fa-expand-arrows",
        sT: [],
      },
      {
        t: "far fa-expand-arrows",
        sT: [],
      },
      {
        t: "fal fa-expand-arrows",
        sT: [],
      },
      {
        t: "fad fa-expand-arrows",
        sT: [],
      },
      {
        t: "fas fa-expand-arrows-alt",
        sT: [],
      },
      {
        t: "far fa-expand-arrows-alt",
        sT: [],
      },
      {
        t: "fal fa-expand-arrows-alt",
        sT: [],
      },
      {
        t: "fad fa-expand-arrows-alt",
        sT: [],
      },
      {
        t: "fas fa-expand-wide",
        sT: [],
      },
      {
        t: "far fa-expand-wide",
        sT: [],
      },
      {
        t: "fal fa-expand-wide",
        sT: [],
      },
      {
        t: "fad fa-expand-wide",
        sT: [],
      },
      {
        t: "fab fa-expeditedssl",
        sT: [],
      },
      {
        t: "fas fa-external-link",
        sT: [],
      },
      {
        t: "far fa-external-link",
        sT: [],
      },
      {
        t: "fal fa-external-link",
        sT: [],
      },
      {
        t: "fad fa-external-link",
        sT: [],
      },
      {
        t: "fas fa-external-link-alt",
        sT: [],
      },
      {
        t: "far fa-external-link-alt",
        sT: [],
      },
      {
        t: "fal fa-external-link-alt",
        sT: [],
      },
      {
        t: "fad fa-external-link-alt",
        sT: [],
      },
      {
        t: "fas fa-external-link-square",
        sT: [],
      },
      {
        t: "far fa-external-link-square",
        sT: [],
      },
      {
        t: "fal fa-external-link-square",
        sT: [],
      },
      {
        t: "fad fa-external-link-square",
        sT: [],
      },
      {
        t: "fas fa-external-link-square-alt",
        sT: [],
      },
      {
        t: "far fa-external-link-square-alt",
        sT: [],
      },
      {
        t: "fal fa-external-link-square-alt",
        sT: [],
      },
      {
        t: "fad fa-external-link-square-alt",
        sT: [],
      },
      {
        t: "fas fa-eye",
        sT: [],
      },
      {
        t: "far fa-eye",
        sT: [],
      },
      {
        t: "fal fa-eye",
        sT: [],
      },
      {
        t: "fad fa-eye",
        sT: [],
      },
      {
        t: "fas fa-eye-dropper",
        sT: [],
      },
      {
        t: "far fa-eye-dropper",
        sT: [],
      },
      {
        t: "fal fa-eye-dropper",
        sT: [],
      },
      {
        t: "fad fa-eye-dropper",
        sT: [],
      },
      {
        t: "fas fa-eye-evil",
        sT: [],
      },
      {
        t: "far fa-eye-evil",
        sT: [],
      },
      {
        t: "fal fa-eye-evil",
        sT: [],
      },
      {
        t: "fad fa-eye-evil",
        sT: [],
      },
      {
        t: "fas fa-eye-slash",
        sT: [],
      },
      {
        t: "far fa-eye-slash",
        sT: [],
      },
      {
        t: "fal fa-eye-slash",
        sT: [],
      },
      {
        t: "fad fa-eye-slash",
        sT: [],
      },
      {
        t: "fab fa-facebook",
        sT: [],
      },
      {
        t: "fab fa-facebook-f",
        sT: [],
      },
      {
        t: "fab fa-facebook-messenger",
        sT: [],
      },
      {
        t: "fab fa-facebook-square",
        sT: [],
      },
      {
        t: "fas fa-fan",
        sT: [],
      },
      {
        t: "far fa-fan",
        sT: [],
      },
      {
        t: "fal fa-fan",
        sT: [],
      },
      {
        t: "fad fa-fan",
        sT: [],
      },
      {
        t: "fas fa-fan-table",
        sT: [],
      },
      {
        t: "far fa-fan-table",
        sT: [],
      },
      {
        t: "fal fa-fan-table",
        sT: [],
      },
      {
        t: "fad fa-fan-table",
        sT: [],
      },
      {
        t: "fab fa-fantasy-flight-games",
        sT: [],
      },
      {
        t: "fas fa-farm",
        sT: [],
      },
      {
        t: "far fa-farm",
        sT: [],
      },
      {
        t: "fal fa-farm",
        sT: [],
      },
      {
        t: "fad fa-farm",
        sT: [],
      },
      {
        t: "fas fa-fast-backward",
        sT: [],
      },
      {
        t: "far fa-fast-backward",
        sT: [],
      },
      {
        t: "fal fa-fast-backward",
        sT: [],
      },
      {
        t: "fad fa-fast-backward",
        sT: [],
      },
      {
        t: "fas fa-fast-forward",
        sT: [],
      },
      {
        t: "far fa-fast-forward",
        sT: [],
      },
      {
        t: "fal fa-fast-forward",
        sT: [],
      },
      {
        t: "fad fa-fast-forward",
        sT: [],
      },
      {
        t: "fas fa-faucet",
        sT: [],
      },
      {
        t: "far fa-faucet",
        sT: [],
      },
      {
        t: "fal fa-faucet",
        sT: [],
      },
      {
        t: "fad fa-faucet",
        sT: [],
      },
      {
        t: "fas fa-faucet-drip",
        sT: [],
      },
      {
        t: "far fa-faucet-drip",
        sT: [],
      },
      {
        t: "fal fa-faucet-drip",
        sT: [],
      },
      {
        t: "fad fa-faucet-drip",
        sT: [],
      },
      {
        t: "fas fa-fax",
        sT: [],
      },
      {
        t: "far fa-fax",
        sT: [],
      },
      {
        t: "fal fa-fax",
        sT: [],
      },
      {
        t: "fad fa-fax",
        sT: [],
      },
      {
        t: "fas fa-feather",
        sT: [],
      },
      {
        t: "far fa-feather",
        sT: [],
      },
      {
        t: "fal fa-feather",
        sT: [],
      },
      {
        t: "fad fa-feather",
        sT: [],
      },
      {
        t: "fas fa-feather-alt",
        sT: [],
      },
      {
        t: "far fa-feather-alt",
        sT: [],
      },
      {
        t: "fal fa-feather-alt",
        sT: [],
      },
      {
        t: "fad fa-feather-alt",
        sT: [],
      },
      {
        t: "fab fa-fedex",
        sT: [],
      },
      {
        t: "fab fa-fedora",
        sT: [],
      },
      {
        t: "fas fa-female",
        sT: [],
      },
      {
        t: "far fa-female",
        sT: [],
      },
      {
        t: "fal fa-female",
        sT: [],
      },
      {
        t: "fad fa-female",
        sT: [],
      },
      {
        t: "fas fa-field-hockey",
        sT: [],
      },
      {
        t: "far fa-field-hockey",
        sT: [],
      },
      {
        t: "fal fa-field-hockey",
        sT: [],
      },
      {
        t: "fad fa-field-hockey",
        sT: [],
      },
      {
        t: "fas fa-fighter-jet",
        sT: [],
      },
      {
        t: "far fa-fighter-jet",
        sT: [],
      },
      {
        t: "fal fa-fighter-jet",
        sT: [],
      },
      {
        t: "fad fa-fighter-jet",
        sT: [],
      },
      {
        t: "fab fa-figma",
        sT: [],
      },
      {
        t: "fas fa-file",
        sT: [],
      },
      {
        t: "far fa-file",
        sT: [],
      },
      {
        t: "fal fa-file",
        sT: [],
      },
      {
        t: "fad fa-file",
        sT: [],
      },
      {
        t: "fas fa-file-alt",
        sT: [],
      },
      {
        t: "far fa-file-alt",
        sT: [],
      },
      {
        t: "fal fa-file-alt",
        sT: [],
      },
      {
        t: "fad fa-file-alt",
        sT: [],
      },
      {
        t: "fas fa-file-archive",
        sT: [],
      },
      {
        t: "far fa-file-archive",
        sT: [],
      },
      {
        t: "fal fa-file-archive",
        sT: [],
      },
      {
        t: "fad fa-file-archive",
        sT: [],
      },
      {
        t: "fas fa-file-audio",
        sT: [],
      },
      {
        t: "far fa-file-audio",
        sT: [],
      },
      {
        t: "fal fa-file-audio",
        sT: [],
      },
      {
        t: "fad fa-file-audio",
        sT: [],
      },
      {
        t: "fas fa-file-certificate",
        sT: [],
      },
      {
        t: "far fa-file-certificate",
        sT: [],
      },
      {
        t: "fal fa-file-certificate",
        sT: [],
      },
      {
        t: "fad fa-file-certificate",
        sT: [],
      },
      {
        t: "fas fa-file-chart-line",
        sT: [],
      },
      {
        t: "far fa-file-chart-line",
        sT: [],
      },
      {
        t: "fal fa-file-chart-line",
        sT: [],
      },
      {
        t: "fad fa-file-chart-line",
        sT: [],
      },
      {
        t: "fas fa-file-chart-pie",
        sT: [],
      },
      {
        t: "far fa-file-chart-pie",
        sT: [],
      },
      {
        t: "fal fa-file-chart-pie",
        sT: [],
      },
      {
        t: "fad fa-file-chart-pie",
        sT: [],
      },
      {
        t: "fas fa-file-check",
        sT: [],
      },
      {
        t: "far fa-file-check",
        sT: [],
      },
      {
        t: "fal fa-file-check",
        sT: [],
      },
      {
        t: "fad fa-file-check",
        sT: [],
      },
      {
        t: "fas fa-file-code",
        sT: [],
      },
      {
        t: "far fa-file-code",
        sT: [],
      },
      {
        t: "fal fa-file-code",
        sT: [],
      },
      {
        t: "fad fa-file-code",
        sT: [],
      },
      {
        t: "fas fa-file-contract",
        sT: [],
      },
      {
        t: "far fa-file-contract",
        sT: [],
      },
      {
        t: "fal fa-file-contract",
        sT: [],
      },
      {
        t: "fad fa-file-contract",
        sT: [],
      },
      {
        t: "fas fa-file-csv",
        sT: [],
      },
      {
        t: "far fa-file-csv",
        sT: [],
      },
      {
        t: "fal fa-file-csv",
        sT: [],
      },
      {
        t: "fad fa-file-csv",
        sT: [],
      },
      {
        t: "fas fa-file-download",
        sT: [],
      },
      {
        t: "far fa-file-download",
        sT: [],
      },
      {
        t: "fal fa-file-download",
        sT: [],
      },
      {
        t: "fad fa-file-download",
        sT: [],
      },
      {
        t: "fas fa-file-edit",
        sT: [],
      },
      {
        t: "far fa-file-edit",
        sT: [],
      },
      {
        t: "fal fa-file-edit",
        sT: [],
      },
      {
        t: "fad fa-file-edit",
        sT: [],
      },
      {
        t: "fas fa-file-excel",
        sT: [],
      },
      {
        t: "far fa-file-excel",
        sT: [],
      },
      {
        t: "fal fa-file-excel",
        sT: [],
      },
      {
        t: "fad fa-file-excel",
        sT: [],
      },
      {
        t: "fas fa-file-exclamation",
        sT: [],
      },
      {
        t: "far fa-file-exclamation",
        sT: [],
      },
      {
        t: "fal fa-file-exclamation",
        sT: [],
      },
      {
        t: "fad fa-file-exclamation",
        sT: [],
      },
      {
        t: "fas fa-file-export",
        sT: [],
      },
      {
        t: "far fa-file-export",
        sT: [],
      },
      {
        t: "fal fa-file-export",
        sT: [],
      },
      {
        t: "fad fa-file-export",
        sT: [],
      },
      {
        t: "fas fa-file-image",
        sT: [],
      },
      {
        t: "far fa-file-image",
        sT: [],
      },
      {
        t: "fal fa-file-image",
        sT: [],
      },
      {
        t: "fad fa-file-image",
        sT: [],
      },
      {
        t: "fas fa-file-import",
        sT: [],
      },
      {
        t: "far fa-file-import",
        sT: [],
      },
      {
        t: "fal fa-file-import",
        sT: [],
      },
      {
        t: "fad fa-file-import",
        sT: [],
      },
      {
        t: "fas fa-file-invoice",
        sT: [],
      },
      {
        t: "far fa-file-invoice",
        sT: [],
      },
      {
        t: "fal fa-file-invoice",
        sT: [],
      },
      {
        t: "fad fa-file-invoice",
        sT: [],
      },
      {
        t: "fas fa-file-invoice-dollar",
        sT: [],
      },
      {
        t: "far fa-file-invoice-dollar",
        sT: [],
      },
      {
        t: "fal fa-file-invoice-dollar",
        sT: [],
      },
      {
        t: "fad fa-file-invoice-dollar",
        sT: [],
      },
      {
        t: "fas fa-file-medical",
        sT: [],
      },
      {
        t: "far fa-file-medical",
        sT: [],
      },
      {
        t: "fal fa-file-medical",
        sT: [],
      },
      {
        t: "fad fa-file-medical",
        sT: [],
      },
      {
        t: "fas fa-file-medical-alt",
        sT: [],
      },
      {
        t: "far fa-file-medical-alt",
        sT: [],
      },
      {
        t: "fal fa-file-medical-alt",
        sT: [],
      },
      {
        t: "fad fa-file-medical-alt",
        sT: [],
      },
      {
        t: "fas fa-file-minus",
        sT: [],
      },
      {
        t: "far fa-file-minus",
        sT: [],
      },
      {
        t: "fal fa-file-minus",
        sT: [],
      },
      {
        t: "fad fa-file-minus",
        sT: [],
      },
      {
        t: "fas fa-file-music",
        sT: [],
      },
      {
        t: "far fa-file-music",
        sT: [],
      },
      {
        t: "fal fa-file-music",
        sT: [],
      },
      {
        t: "fad fa-file-music",
        sT: [],
      },
      {
        t: "fas fa-file-pdf",
        sT: [],
      },
      {
        t: "far fa-file-pdf",
        sT: [],
      },
      {
        t: "fal fa-file-pdf",
        sT: [],
      },
      {
        t: "fad fa-file-pdf",
        sT: [],
      },
      {
        t: "fas fa-file-plus",
        sT: [],
      },
      {
        t: "far fa-file-plus",
        sT: [],
      },
      {
        t: "fal fa-file-plus",
        sT: [],
      },
      {
        t: "fad fa-file-plus",
        sT: [],
      },
      {
        t: "fas fa-file-powerpoint",
        sT: [],
      },
      {
        t: "far fa-file-powerpoint",
        sT: [],
      },
      {
        t: "fal fa-file-powerpoint",
        sT: [],
      },
      {
        t: "fad fa-file-powerpoint",
        sT: [],
      },
      {
        t: "fas fa-file-prescription",
        sT: [],
      },
      {
        t: "far fa-file-prescription",
        sT: [],
      },
      {
        t: "fal fa-file-prescription",
        sT: [],
      },
      {
        t: "fad fa-file-prescription",
        sT: [],
      },
      {
        t: "fas fa-file-search",
        sT: [],
      },
      {
        t: "far fa-file-search",
        sT: [],
      },
      {
        t: "fal fa-file-search",
        sT: [],
      },
      {
        t: "fad fa-file-search",
        sT: [],
      },
      {
        t: "fas fa-file-signature",
        sT: [],
      },
      {
        t: "far fa-file-signature",
        sT: [],
      },
      {
        t: "fal fa-file-signature",
        sT: [],
      },
      {
        t: "fad fa-file-signature",
        sT: [],
      },
      {
        t: "fas fa-file-spreadsheet",
        sT: [],
      },
      {
        t: "far fa-file-spreadsheet",
        sT: [],
      },
      {
        t: "fal fa-file-spreadsheet",
        sT: [],
      },
      {
        t: "fad fa-file-spreadsheet",
        sT: [],
      },
      {
        t: "fas fa-file-times",
        sT: [],
      },
      {
        t: "far fa-file-times",
        sT: [],
      },
      {
        t: "fal fa-file-times",
        sT: [],
      },
      {
        t: "fad fa-file-times",
        sT: [],
      },
      {
        t: "fas fa-file-upload",
        sT: [],
      },
      {
        t: "far fa-file-upload",
        sT: [],
      },
      {
        t: "fal fa-file-upload",
        sT: [],
      },
      {
        t: "fad fa-file-upload",
        sT: [],
      },
      {
        t: "fas fa-file-user",
        sT: [],
      },
      {
        t: "far fa-file-user",
        sT: [],
      },
      {
        t: "fal fa-file-user",
        sT: [],
      },
      {
        t: "fad fa-file-user",
        sT: [],
      },
      {
        t: "fas fa-file-video",
        sT: [],
      },
      {
        t: "far fa-file-video",
        sT: [],
      },
      {
        t: "fal fa-file-video",
        sT: [],
      },
      {
        t: "fad fa-file-video",
        sT: [],
      },
      {
        t: "fas fa-file-word",
        sT: [],
      },
      {
        t: "far fa-file-word",
        sT: [],
      },
      {
        t: "fal fa-file-word",
        sT: [],
      },
      {
        t: "fad fa-file-word",
        sT: [],
      },
      {
        t: "fas fa-files-medical",
        sT: [],
      },
      {
        t: "far fa-files-medical",
        sT: [],
      },
      {
        t: "fal fa-files-medical",
        sT: [],
      },
      {
        t: "fad fa-files-medical",
        sT: [],
      },
      {
        t: "fas fa-fill",
        sT: [],
      },
      {
        t: "far fa-fill",
        sT: [],
      },
      {
        t: "fal fa-fill",
        sT: [],
      },
      {
        t: "fad fa-fill",
        sT: [],
      },
      {
        t: "fas fa-fill-drip",
        sT: [],
      },
      {
        t: "far fa-fill-drip",
        sT: [],
      },
      {
        t: "fal fa-fill-drip",
        sT: [],
      },
      {
        t: "fad fa-fill-drip",
        sT: [],
      },
      {
        t: "fas fa-film",
        sT: [],
      },
      {
        t: "far fa-film",
        sT: [],
      },
      {
        t: "fal fa-film",
        sT: [],
      },
      {
        t: "fad fa-film",
        sT: [],
      },
      {
        t: "fas fa-film-alt",
        sT: [],
      },
      {
        t: "far fa-film-alt",
        sT: [],
      },
      {
        t: "fal fa-film-alt",
        sT: [],
      },
      {
        t: "fad fa-film-alt",
        sT: [],
      },
      {
        t: "fas fa-film-canister",
        sT: [],
      },
      {
        t: "far fa-film-canister",
        sT: [],
      },
      {
        t: "fal fa-film-canister",
        sT: [],
      },
      {
        t: "fad fa-film-canister",
        sT: [],
      },
      {
        t: "fas fa-filter",
        sT: [],
      },
      {
        t: "far fa-filter",
        sT: [],
      },
      {
        t: "fal fa-filter",
        sT: [],
      },
      {
        t: "fad fa-filter",
        sT: [],
      },
      {
        t: "fas fa-fingerprint",
        sT: [],
      },
      {
        t: "far fa-fingerprint",
        sT: [],
      },
      {
        t: "fal fa-fingerprint",
        sT: [],
      },
      {
        t: "fad fa-fingerprint",
        sT: [],
      },
      {
        t: "fas fa-fire",
        sT: [],
      },
      {
        t: "far fa-fire",
        sT: [],
      },
      {
        t: "fal fa-fire",
        sT: [],
      },
      {
        t: "fad fa-fire",
        sT: [],
      },
      {
        t: "fas fa-fire-alt",
        sT: [],
      },
      {
        t: "far fa-fire-alt",
        sT: [],
      },
      {
        t: "fal fa-fire-alt",
        sT: [],
      },
      {
        t: "fad fa-fire-alt",
        sT: [],
      },
      {
        t: "fas fa-fire-extinguisher",
        sT: [],
      },
      {
        t: "far fa-fire-extinguisher",
        sT: [],
      },
      {
        t: "fal fa-fire-extinguisher",
        sT: [],
      },
      {
        t: "fad fa-fire-extinguisher",
        sT: [],
      },
      {
        t: "fas fa-fire-smoke",
        sT: [],
      },
      {
        t: "far fa-fire-smoke",
        sT: [],
      },
      {
        t: "fal fa-fire-smoke",
        sT: [],
      },
      {
        t: "fad fa-fire-smoke",
        sT: [],
      },
      {
        t: "fab fa-firefox",
        sT: [],
      },
      {
        t: "fab fa-firefox-browser",
        sT: [],
      },
      {
        t: "fas fa-fireplace",
        sT: [],
      },
      {
        t: "far fa-fireplace",
        sT: [],
      },
      {
        t: "fal fa-fireplace",
        sT: [],
      },
      {
        t: "fad fa-fireplace",
        sT: [],
      },
      {
        t: "fas fa-first-aid",
        sT: [],
      },
      {
        t: "far fa-first-aid",
        sT: [],
      },
      {
        t: "fal fa-first-aid",
        sT: [],
      },
      {
        t: "fad fa-first-aid",
        sT: [],
      },
      {
        t: "fab fa-first-order",
        sT: [],
      },
      {
        t: "fab fa-first-order-alt",
        sT: [],
      },
      {
        t: "fab fa-firstdraft",
        sT: [],
      },
      {
        t: "fas fa-fish",
        sT: [],
      },
      {
        t: "far fa-fish",
        sT: [],
      },
      {
        t: "fal fa-fish",
        sT: [],
      },
      {
        t: "fad fa-fish",
        sT: [],
      },
      {
        t: "fas fa-fish-cooked",
        sT: [],
      },
      {
        t: "far fa-fish-cooked",
        sT: [],
      },
      {
        t: "fal fa-fish-cooked",
        sT: [],
      },
      {
        t: "fad fa-fish-cooked",
        sT: [],
      },
      {
        t: "fas fa-fist-raised",
        sT: [],
      },
      {
        t: "far fa-fist-raised",
        sT: [],
      },
      {
        t: "fal fa-fist-raised",
        sT: [],
      },
      {
        t: "fad fa-fist-raised",
        sT: [],
      },
      {
        t: "fas fa-flag",
        sT: [],
      },
      {
        t: "far fa-flag",
        sT: [],
      },
      {
        t: "fal fa-flag",
        sT: [],
      },
      {
        t: "fad fa-flag",
        sT: [],
      },
      {
        t: "fas fa-flag-alt",
        sT: [],
      },
      {
        t: "far fa-flag-alt",
        sT: [],
      },
      {
        t: "fal fa-flag-alt",
        sT: [],
      },
      {
        t: "fad fa-flag-alt",
        sT: [],
      },
      {
        t: "fas fa-flag-checkered",
        sT: [],
      },
      {
        t: "far fa-flag-checkered",
        sT: [],
      },
      {
        t: "fal fa-flag-checkered",
        sT: [],
      },
      {
        t: "fad fa-flag-checkered",
        sT: [],
      },
      {
        t: "fas fa-flag-usa",
        sT: [],
      },
      {
        t: "far fa-flag-usa",
        sT: [],
      },
      {
        t: "fal fa-flag-usa",
        sT: [],
      },
      {
        t: "fad fa-flag-usa",
        sT: [],
      },
      {
        t: "fas fa-flame",
        sT: [],
      },
      {
        t: "far fa-flame",
        sT: [],
      },
      {
        t: "fal fa-flame",
        sT: [],
      },
      {
        t: "fad fa-flame",
        sT: [],
      },
      {
        t: "fas fa-flashlight",
        sT: [],
      },
      {
        t: "far fa-flashlight",
        sT: [],
      },
      {
        t: "fal fa-flashlight",
        sT: [],
      },
      {
        t: "fad fa-flashlight",
        sT: [],
      },
      {
        t: "fas fa-flask",
        sT: [],
      },
      {
        t: "far fa-flask",
        sT: [],
      },
      {
        t: "fal fa-flask",
        sT: [],
      },
      {
        t: "fad fa-flask",
        sT: [],
      },
      {
        t: "fas fa-flask-poison",
        sT: [],
      },
      {
        t: "far fa-flask-poison",
        sT: [],
      },
      {
        t: "fal fa-flask-poison",
        sT: [],
      },
      {
        t: "fad fa-flask-poison",
        sT: [],
      },
      {
        t: "fas fa-flask-potion",
        sT: [],
      },
      {
        t: "far fa-flask-potion",
        sT: [],
      },
      {
        t: "fal fa-flask-potion",
        sT: [],
      },
      {
        t: "fad fa-flask-potion",
        sT: [],
      },
      {
        t: "fab fa-flickr",
        sT: [],
      },
      {
        t: "fab fa-flipboard",
        sT: [],
      },
      {
        t: "fas fa-flower",
        sT: [],
      },
      {
        t: "far fa-flower",
        sT: [],
      },
      {
        t: "fal fa-flower",
        sT: [],
      },
      {
        t: "fad fa-flower",
        sT: [],
      },
      {
        t: "fas fa-flower-daffodil",
        sT: [],
      },
      {
        t: "far fa-flower-daffodil",
        sT: [],
      },
      {
        t: "fal fa-flower-daffodil",
        sT: [],
      },
      {
        t: "fad fa-flower-daffodil",
        sT: [],
      },
      {
        t: "fas fa-flower-tulip",
        sT: [],
      },
      {
        t: "far fa-flower-tulip",
        sT: [],
      },
      {
        t: "fal fa-flower-tulip",
        sT: [],
      },
      {
        t: "fad fa-flower-tulip",
        sT: [],
      },
      {
        t: "fas fa-flushed",
        sT: [],
      },
      {
        t: "far fa-flushed",
        sT: [],
      },
      {
        t: "fal fa-flushed",
        sT: [],
      },
      {
        t: "fad fa-flushed",
        sT: [],
      },
      {
        t: "fas fa-flute",
        sT: [],
      },
      {
        t: "far fa-flute",
        sT: [],
      },
      {
        t: "fal fa-flute",
        sT: [],
      },
      {
        t: "fad fa-flute",
        sT: [],
      },
      {
        t: "fas fa-flux-capacitor",
        sT: [],
      },
      {
        t: "far fa-flux-capacitor",
        sT: [],
      },
      {
        t: "fal fa-flux-capacitor",
        sT: [],
      },
      {
        t: "fad fa-flux-capacitor",
        sT: [],
      },
      {
        t: "fab fa-fly",
        sT: [],
      },
      {
        t: "fas fa-fog",
        sT: [],
      },
      {
        t: "far fa-fog",
        sT: [],
      },
      {
        t: "fal fa-fog",
        sT: [],
      },
      {
        t: "fad fa-fog",
        sT: [],
      },
      {
        t: "fas fa-folder",
        sT: [],
      },
      {
        t: "far fa-folder",
        sT: [],
      },
      {
        t: "fal fa-folder",
        sT: [],
      },
      {
        t: "fad fa-folder",
        sT: [],
      },
      {
        t: "fal fa-folder-download",
        sT: [],
      },
      {
        t: "far fa-folder-download",
        sT: [],
      },
      {
        t: "fas fa-folder-download",
        sT: [],
      },
      {
        t: "fad fa-folder-download",
        sT: [],
      },
      {
        t: "fas fa-folder-minus",
        sT: [],
      },
      {
        t: "far fa-folder-minus",
        sT: [],
      },
      {
        t: "fal fa-folder-minus",
        sT: [],
      },
      {
        t: "fad fa-folder-minus",
        sT: [],
      },
      {
        t: "fas fa-folder-open",
        sT: [],
      },
      {
        t: "far fa-folder-open",
        sT: [],
      },
      {
        t: "fal fa-folder-open",
        sT: [],
      },
      {
        t: "fad fa-folder-open",
        sT: [],
      },
      {
        t: "fas fa-folder-plus",
        sT: [],
      },
      {
        t: "far fa-folder-plus",
        sT: [],
      },
      {
        t: "fal fa-folder-plus",
        sT: [],
      },
      {
        t: "fad fa-folder-plus",
        sT: [],
      },
      {
        t: "fas fa-folder-times",
        sT: [],
      },
      {
        t: "far fa-folder-times",
        sT: [],
      },
      {
        t: "fal fa-folder-times",
        sT: [],
      },
      {
        t: "fad fa-folder-times",
        sT: [],
      },
      {
        t: "fas fa-folder-tree",
        sT: [],
      },
      {
        t: "far fa-folder-tree",
        sT: [],
      },
      {
        t: "fal fa-folder-tree",
        sT: [],
      },
      {
        t: "fad fa-folder-tree",
        sT: [],
      },
      {
        t: "fal fa-folder-upload",
        sT: [],
      },
      {
        t: "far fa-folder-upload",
        sT: [],
      },
      {
        t: "fas fa-folder-upload",
        sT: [],
      },
      {
        t: "fad fa-folder-upload",
        sT: [],
      },
      {
        t: "fas fa-folders",
        sT: [],
      },
      {
        t: "far fa-folders",
        sT: [],
      },
      {
        t: "fal fa-folders",
        sT: [],
      },
      {
        t: "fad fa-folders",
        sT: [],
      },
      {
        t: "fas fa-font",
        sT: [],
      },
      {
        t: "far fa-font",
        sT: [],
      },
      {
        t: "fal fa-font",
        sT: [],
      },
      {
        t: "fad fa-font",
        sT: [],
      },
      {
        t: "fab fa-font-awesome",
        sT: [],
      },
      {
        t: "fab fa-font-awesome-alt",
        sT: [],
      },
      {
        t: "fab fa-font-awesome-flag",
        sT: [],
      },
      {
        t: "fas fa-font-case",
        sT: [],
      },
      {
        t: "far fa-font-case",
        sT: [],
      },
      {
        t: "fal fa-font-case",
        sT: [],
      },
      {
        t: "fad fa-font-case",
        sT: [],
      },
      {
        t: "fab fa-fonticons",
        sT: [],
      },
      {
        t: "fab fa-fonticons-fi",
        sT: [],
      },
      {
        t: "fas fa-football-ball",
        sT: [],
      },
      {
        t: "far fa-football-ball",
        sT: [],
      },
      {
        t: "fal fa-football-ball",
        sT: [],
      },
      {
        t: "fad fa-football-ball",
        sT: [],
      },
      {
        t: "fas fa-football-helmet",
        sT: [],
      },
      {
        t: "far fa-football-helmet",
        sT: [],
      },
      {
        t: "fal fa-football-helmet",
        sT: [],
      },
      {
        t: "fad fa-football-helmet",
        sT: [],
      },
      {
        t: "fas fa-forklift",
        sT: [],
      },
      {
        t: "far fa-forklift",
        sT: [],
      },
      {
        t: "fal fa-forklift",
        sT: [],
      },
      {
        t: "fad fa-forklift",
        sT: [],
      },
      {
        t: "fab fa-fort-awesome",
        sT: [],
      },
      {
        t: "fab fa-fort-awesome-alt",
        sT: [],
      },
      {
        t: "fab fa-forumbee",
        sT: [],
      },
      {
        t: "fas fa-forward",
        sT: [],
      },
      {
        t: "far fa-forward",
        sT: [],
      },
      {
        t: "fal fa-forward",
        sT: [],
      },
      {
        t: "fad fa-forward",
        sT: [],
      },
      {
        t: "fab fa-foursquare",
        sT: [],
      },
      {
        t: "fas fa-fragile",
        sT: [],
      },
      {
        t: "far fa-fragile",
        sT: [],
      },
      {
        t: "fal fa-fragile",
        sT: [],
      },
      {
        t: "fad fa-fragile",
        sT: [],
      },
      {
        t: "fab fa-free-code-camp",
        sT: [],
      },
      {
        t: "fab fa-freebsd",
        sT: [],
      },
      {
        t: "fas fa-french-fries",
        sT: [],
      },
      {
        t: "far fa-french-fries",
        sT: [],
      },
      {
        t: "fal fa-french-fries",
        sT: [],
      },
      {
        t: "fad fa-french-fries",
        sT: [],
      },
      {
        t: "fas fa-frog",
        sT: [],
      },
      {
        t: "far fa-frog",
        sT: [],
      },
      {
        t: "fal fa-frog",
        sT: [],
      },
      {
        t: "fad fa-frog",
        sT: [],
      },
      {
        t: "fas fa-frosty-head",
        sT: [],
      },
      {
        t: "far fa-frosty-head",
        sT: [],
      },
      {
        t: "fal fa-frosty-head",
        sT: [],
      },
      {
        t: "fad fa-frosty-head",
        sT: [],
      },
      {
        t: "fas fa-frown",
        sT: [],
      },
      {
        t: "far fa-frown",
        sT: [],
      },
      {
        t: "fal fa-frown",
        sT: [],
      },
      {
        t: "fad fa-frown",
        sT: [],
      },
      {
        t: "fas fa-frown-open",
        sT: [],
      },
      {
        t: "far fa-frown-open",
        sT: [],
      },
      {
        t: "fal fa-frown-open",
        sT: [],
      },
      {
        t: "fad fa-frown-open",
        sT: [],
      },
      {
        t: "fab fa-fulcrum",
        sT: [],
      },
      {
        t: "fas fa-function",
        sT: [],
      },
      {
        t: "far fa-function",
        sT: [],
      },
      {
        t: "fal fa-function",
        sT: [],
      },
      {
        t: "fad fa-function",
        sT: [],
      },
      {
        t: "fas fa-funnel-dollar",
        sT: [],
      },
      {
        t: "far fa-funnel-dollar",
        sT: [],
      },
      {
        t: "fal fa-funnel-dollar",
        sT: [],
      },
      {
        t: "fad fa-funnel-dollar",
        sT: [],
      },
      {
        t: "fas fa-futbol",
        sT: [],
      },
      {
        t: "far fa-futbol",
        sT: [],
      },
      {
        t: "fal fa-futbol",
        sT: [],
      },
      {
        t: "fad fa-futbol",
        sT: [],
      },
      {
        t: "fab fa-galactic-republic",
        sT: [],
      },
      {
        t: "fab fa-galactic-senate",
        sT: [],
      },
      {
        t: "fas fa-galaxy",
        sT: [],
      },
      {
        t: "far fa-galaxy",
        sT: [],
      },
      {
        t: "fal fa-galaxy",
        sT: [],
      },
      {
        t: "fad fa-galaxy",
        sT: [],
      },
      {
        t: "fas fa-game-board",
        sT: [],
      },
      {
        t: "far fa-game-board",
        sT: [],
      },
      {
        t: "fal fa-game-board",
        sT: [],
      },
      {
        t: "fad fa-game-board",
        sT: [],
      },
      {
        t: "fas fa-game-board-alt",
        sT: [],
      },
      {
        t: "far fa-game-board-alt",
        sT: [],
      },
      {
        t: "fal fa-game-board-alt",
        sT: [],
      },
      {
        t: "fad fa-game-board-alt",
        sT: [],
      },
      {
        t: "fas fa-game-console-handheld",
        sT: [],
      },
      {
        t: "far fa-game-console-handheld",
        sT: [],
      },
      {
        t: "fal fa-game-console-handheld",
        sT: [],
      },
      {
        t: "fad fa-game-console-handheld",
        sT: [],
      },
      {
        t: "fas fa-gamepad",
        sT: [],
      },
      {
        t: "far fa-gamepad",
        sT: [],
      },
      {
        t: "fal fa-gamepad",
        sT: [],
      },
      {
        t: "fad fa-gamepad",
        sT: [],
      },
      {
        t: "fas fa-gamepad-alt",
        sT: [],
      },
      {
        t: "far fa-gamepad-alt",
        sT: [],
      },
      {
        t: "fal fa-gamepad-alt",
        sT: [],
      },
      {
        t: "fad fa-gamepad-alt",
        sT: [],
      },
      {
        t: "fas fa-garage",
        sT: [],
      },
      {
        t: "far fa-garage",
        sT: [],
      },
      {
        t: "fal fa-garage",
        sT: [],
      },
      {
        t: "fad fa-garage",
        sT: [],
      },
      {
        t: "fas fa-garage-car",
        sT: [],
      },
      {
        t: "far fa-garage-car",
        sT: [],
      },
      {
        t: "fal fa-garage-car",
        sT: [],
      },
      {
        t: "fad fa-garage-car",
        sT: [],
      },
      {
        t: "fas fa-garage-open",
        sT: [],
      },
      {
        t: "far fa-garage-open",
        sT: [],
      },
      {
        t: "fal fa-garage-open",
        sT: [],
      },
      {
        t: "fad fa-garage-open",
        sT: [],
      },
      {
        t: "fas fa-gas-pump",
        sT: [],
      },
      {
        t: "far fa-gas-pump",
        sT: [],
      },
      {
        t: "fal fa-gas-pump",
        sT: [],
      },
      {
        t: "fad fa-gas-pump",
        sT: [],
      },
      {
        t: "fas fa-gas-pump-slash",
        sT: [],
      },
      {
        t: "far fa-gas-pump-slash",
        sT: [],
      },
      {
        t: "fal fa-gas-pump-slash",
        sT: [],
      },
      {
        t: "fad fa-gas-pump-slash",
        sT: [],
      },
      {
        t: "fas fa-gavel",
        sT: [],
      },
      {
        t: "far fa-gavel",
        sT: [],
      },
      {
        t: "fal fa-gavel",
        sT: [],
      },
      {
        t: "fad fa-gavel",
        sT: [],
      },
      {
        t: "fas fa-gem",
        sT: [],
      },
      {
        t: "far fa-gem",
        sT: [],
      },
      {
        t: "fal fa-gem",
        sT: [],
      },
      {
        t: "fad fa-gem",
        sT: [],
      },
      {
        t: "fas fa-genderless",
        sT: [],
      },
      {
        t: "far fa-genderless",
        sT: [],
      },
      {
        t: "fal fa-genderless",
        sT: [],
      },
      {
        t: "fad fa-genderless",
        sT: [],
      },
      {
        t: "fab fa-get-pocket",
        sT: [],
      },
      {
        t: "fab fa-gg",
        sT: [],
      },
      {
        t: "fab fa-gg-circle",
        sT: [],
      },
      {
        t: "fas fa-ghost",
        sT: [],
      },
      {
        t: "far fa-ghost",
        sT: [],
      },
      {
        t: "fal fa-ghost",
        sT: [],
      },
      {
        t: "fad fa-ghost",
        sT: [],
      },
      {
        t: "fas fa-gift",
        sT: [],
      },
      {
        t: "far fa-gift",
        sT: [],
      },
      {
        t: "fal fa-gift",
        sT: [],
      },
      {
        t: "fad fa-gift",
        sT: [],
      },
      {
        t: "fas fa-gift-card",
        sT: [],
      },
      {
        t: "far fa-gift-card",
        sT: [],
      },
      {
        t: "fal fa-gift-card",
        sT: [],
      },
      {
        t: "fad fa-gift-card",
        sT: [],
      },
      {
        t: "fas fa-gifts",
        sT: [],
      },
      {
        t: "far fa-gifts",
        sT: [],
      },
      {
        t: "fal fa-gifts",
        sT: [],
      },
      {
        t: "fad fa-gifts",
        sT: [],
      },
      {
        t: "fas fa-gingerbread-man",
        sT: [],
      },
      {
        t: "far fa-gingerbread-man",
        sT: [],
      },
      {
        t: "fal fa-gingerbread-man",
        sT: [],
      },
      {
        t: "fad fa-gingerbread-man",
        sT: [],
      },
      {
        t: "fab fa-git",
        sT: [],
      },
      {
        t: "fab fa-git-alt",
        sT: [],
      },
      {
        t: "fab fa-git-square",
        sT: [],
      },
      {
        t: "fab fa-github",
        sT: [],
      },
      {
        t: "fab fa-github-alt",
        sT: [],
      },
      {
        t: "fab fa-github-square",
        sT: [],
      },
      {
        t: "fab fa-gitkraken",
        sT: [],
      },
      {
        t: "fab fa-gitlab",
        sT: [],
      },
      {
        t: "fab fa-gitter",
        sT: [],
      },
      {
        t: "fas fa-glass",
        sT: [],
      },
      {
        t: "far fa-glass",
        sT: [],
      },
      {
        t: "fal fa-glass",
        sT: [],
      },
      {
        t: "fad fa-glass",
        sT: [],
      },
      {
        t: "fas fa-glass-champagne",
        sT: [],
      },
      {
        t: "far fa-glass-champagne",
        sT: [],
      },
      {
        t: "fal fa-glass-champagne",
        sT: [],
      },
      {
        t: "fad fa-glass-champagne",
        sT: [],
      },
      {
        t: "fas fa-glass-cheers",
        sT: [],
      },
      {
        t: "far fa-glass-cheers",
        sT: [],
      },
      {
        t: "fal fa-glass-cheers",
        sT: [],
      },
      {
        t: "fad fa-glass-cheers",
        sT: [],
      },
      {
        t: "fas fa-glass-citrus",
        sT: [],
      },
      {
        t: "far fa-glass-citrus",
        sT: [],
      },
      {
        t: "fal fa-glass-citrus",
        sT: [],
      },
      {
        t: "fad fa-glass-citrus",
        sT: [],
      },
      {
        t: "fas fa-glass-martini",
        sT: [],
      },
      {
        t: "far fa-glass-martini",
        sT: [],
      },
      {
        t: "fal fa-glass-martini",
        sT: [],
      },
      {
        t: "fad fa-glass-martini",
        sT: [],
      },
      {
        t: "fas fa-glass-martini-alt",
        sT: [],
      },
      {
        t: "far fa-glass-martini-alt",
        sT: [],
      },
      {
        t: "fal fa-glass-martini-alt",
        sT: [],
      },
      {
        t: "fad fa-glass-martini-alt",
        sT: [],
      },
      {
        t: "fas fa-glass-whiskey",
        sT: [],
      },
      {
        t: "far fa-glass-whiskey",
        sT: [],
      },
      {
        t: "fal fa-glass-whiskey",
        sT: [],
      },
      {
        t: "fad fa-glass-whiskey",
        sT: [],
      },
      {
        t: "fas fa-glass-whiskey-rocks",
        sT: [],
      },
      {
        t: "far fa-glass-whiskey-rocks",
        sT: [],
      },
      {
        t: "fal fa-glass-whiskey-rocks",
        sT: [],
      },
      {
        t: "fad fa-glass-whiskey-rocks",
        sT: [],
      },
      {
        t: "fas fa-glasses",
        sT: [],
      },
      {
        t: "far fa-glasses",
        sT: [],
      },
      {
        t: "fal fa-glasses",
        sT: [],
      },
      {
        t: "fad fa-glasses",
        sT: [],
      },
      {
        t: "fas fa-glasses-alt",
        sT: [],
      },
      {
        t: "far fa-glasses-alt",
        sT: [],
      },
      {
        t: "fal fa-glasses-alt",
        sT: [],
      },
      {
        t: "fad fa-glasses-alt",
        sT: [],
      },
      {
        t: "fab fa-glide",
        sT: [],
      },
      {
        t: "fab fa-glide-g",
        sT: [],
      },
      {
        t: "fas fa-globe",
        sT: [],
      },
      {
        t: "far fa-globe",
        sT: [],
      },
      {
        t: "fal fa-globe",
        sT: [],
      },
      {
        t: "fad fa-globe",
        sT: [],
      },
      {
        t: "fas fa-globe-africa",
        sT: [],
      },
      {
        t: "far fa-globe-africa",
        sT: [],
      },
      {
        t: "fal fa-globe-africa",
        sT: [],
      },
      {
        t: "fad fa-globe-africa",
        sT: [],
      },
      {
        t: "fas fa-globe-americas",
        sT: [],
      },
      {
        t: "far fa-globe-americas",
        sT: [],
      },
      {
        t: "fal fa-globe-americas",
        sT: [],
      },
      {
        t: "fad fa-globe-americas",
        sT: [],
      },
      {
        t: "fas fa-globe-asia",
        sT: [],
      },
      {
        t: "far fa-globe-asia",
        sT: [],
      },
      {
        t: "fal fa-globe-asia",
        sT: [],
      },
      {
        t: "fad fa-globe-asia",
        sT: [],
      },
      {
        t: "fas fa-globe-europe",
        sT: [],
      },
      {
        t: "far fa-globe-europe",
        sT: [],
      },
      {
        t: "fal fa-globe-europe",
        sT: [],
      },
      {
        t: "fad fa-globe-europe",
        sT: [],
      },
      {
        t: "fas fa-globe-snow",
        sT: [],
      },
      {
        t: "far fa-globe-snow",
        sT: [],
      },
      {
        t: "fal fa-globe-snow",
        sT: [],
      },
      {
        t: "fad fa-globe-snow",
        sT: [],
      },
      {
        t: "fas fa-globe-stand",
        sT: [],
      },
      {
        t: "far fa-globe-stand",
        sT: [],
      },
      {
        t: "fal fa-globe-stand",
        sT: [],
      },
      {
        t: "fad fa-globe-stand",
        sT: [],
      },
      {
        t: "fab fa-gofore",
        sT: [],
      },
      {
        t: "fas fa-golf-ball",
        sT: [],
      },
      {
        t: "far fa-golf-ball",
        sT: [],
      },
      {
        t: "fal fa-golf-ball",
        sT: [],
      },
      {
        t: "fad fa-golf-ball",
        sT: [],
      },
      {
        t: "fas fa-golf-club",
        sT: [],
      },
      {
        t: "far fa-golf-club",
        sT: [],
      },
      {
        t: "fal fa-golf-club",
        sT: [],
      },
      {
        t: "fad fa-golf-club",
        sT: [],
      },
      {
        t: "fab fa-goodreads",
        sT: [],
      },
      {
        t: "fab fa-goodreads-g",
        sT: [],
      },
      {
        t: "fab fa-google",
        sT: [],
      },
      {
        t: "fab fa-google-drive",
        sT: [],
      },
      {
        t: "fab fa-google-pay",
        sT: [],
      },
      {
        t: "fab fa-google-play",
        sT: [],
      },
      {
        t: "fab fa-google-plus",
        sT: [],
      },
      {
        t: "fab fa-google-plus-g",
        sT: [],
      },
      {
        t: "fab fa-google-plus-square",
        sT: [],
      },
      {
        t: "fab fa-google-wallet",
        sT: [],
      },
      {
        t: "fas fa-gopuram",
        sT: [],
      },
      {
        t: "far fa-gopuram",
        sT: [],
      },
      {
        t: "fal fa-gopuram",
        sT: [],
      },
      {
        t: "fad fa-gopuram",
        sT: [],
      },
      {
        t: "fas fa-graduation-cap",
        sT: [],
      },
      {
        t: "far fa-graduation-cap",
        sT: [],
      },
      {
        t: "fal fa-graduation-cap",
        sT: [],
      },
      {
        t: "fad fa-graduation-cap",
        sT: [],
      },
      {
        t: "fas fa-gramophone",
        sT: [],
      },
      {
        t: "far fa-gramophone",
        sT: [],
      },
      {
        t: "fal fa-gramophone",
        sT: [],
      },
      {
        t: "fad fa-gramophone",
        sT: [],
      },
      {
        t: "fab fa-gratipay",
        sT: [],
      },
      {
        t: "fab fa-grav",
        sT: [],
      },
      {
        t: "fas fa-greater-than",
        sT: [],
      },
      {
        t: "far fa-greater-than",
        sT: [],
      },
      {
        t: "fal fa-greater-than",
        sT: [],
      },
      {
        t: "fad fa-greater-than",
        sT: [],
      },
      {
        t: "fas fa-greater-than-equal",
        sT: [],
      },
      {
        t: "far fa-greater-than-equal",
        sT: [],
      },
      {
        t: "fal fa-greater-than-equal",
        sT: [],
      },
      {
        t: "fad fa-greater-than-equal",
        sT: [],
      },
      {
        t: "fas fa-grimace",
        sT: [],
      },
      {
        t: "far fa-grimace",
        sT: [],
      },
      {
        t: "fal fa-grimace",
        sT: [],
      },
      {
        t: "fad fa-grimace",
        sT: [],
      },
      {
        t: "fas fa-grin",
        sT: [],
      },
      {
        t: "far fa-grin",
        sT: [],
      },
      {
        t: "fal fa-grin",
        sT: [],
      },
      {
        t: "fad fa-grin",
        sT: [],
      },
      {
        t: "fas fa-grin-alt",
        sT: [],
      },
      {
        t: "far fa-grin-alt",
        sT: [],
      },
      {
        t: "fal fa-grin-alt",
        sT: [],
      },
      {
        t: "fad fa-grin-alt",
        sT: [],
      },
      {
        t: "fas fa-grin-beam",
        sT: [],
      },
      {
        t: "far fa-grin-beam",
        sT: [],
      },
      {
        t: "fal fa-grin-beam",
        sT: [],
      },
      {
        t: "fad fa-grin-beam",
        sT: [],
      },
      {
        t: "fas fa-grin-beam-sweat",
        sT: [],
      },
      {
        t: "far fa-grin-beam-sweat",
        sT: [],
      },
      {
        t: "fal fa-grin-beam-sweat",
        sT: [],
      },
      {
        t: "fad fa-grin-beam-sweat",
        sT: [],
      },
      {
        t: "fas fa-grin-hearts",
        sT: [],
      },
      {
        t: "far fa-grin-hearts",
        sT: [],
      },
      {
        t: "fal fa-grin-hearts",
        sT: [],
      },
      {
        t: "fad fa-grin-hearts",
        sT: [],
      },
      {
        t: "fas fa-grin-squint",
        sT: [],
      },
      {
        t: "far fa-grin-squint",
        sT: [],
      },
      {
        t: "fal fa-grin-squint",
        sT: [],
      },
      {
        t: "fad fa-grin-squint",
        sT: [],
      },
      {
        t: "fas fa-grin-squint-tears",
        sT: [],
      },
      {
        t: "far fa-grin-squint-tears",
        sT: [],
      },
      {
        t: "fal fa-grin-squint-tears",
        sT: [],
      },
      {
        t: "fad fa-grin-squint-tears",
        sT: [],
      },
      {
        t: "fas fa-grin-stars",
        sT: [],
      },
      {
        t: "far fa-grin-stars",
        sT: [],
      },
      {
        t: "fal fa-grin-stars",
        sT: [],
      },
      {
        t: "fad fa-grin-stars",
        sT: [],
      },
      {
        t: "fas fa-grin-tears",
        sT: [],
      },
      {
        t: "far fa-grin-tears",
        sT: [],
      },
      {
        t: "fal fa-grin-tears",
        sT: [],
      },
      {
        t: "fad fa-grin-tears",
        sT: [],
      },
      {
        t: "fas fa-grin-tongue",
        sT: [],
      },
      {
        t: "far fa-grin-tongue",
        sT: [],
      },
      {
        t: "fal fa-grin-tongue",
        sT: [],
      },
      {
        t: "fad fa-grin-tongue",
        sT: [],
      },
      {
        t: "fas fa-grin-tongue-squint",
        sT: [],
      },
      {
        t: "far fa-grin-tongue-squint",
        sT: [],
      },
      {
        t: "fal fa-grin-tongue-squint",
        sT: [],
      },
      {
        t: "fad fa-grin-tongue-squint",
        sT: [],
      },
      {
        t: "fas fa-grin-tongue-wink",
        sT: [],
      },
      {
        t: "far fa-grin-tongue-wink",
        sT: [],
      },
      {
        t: "fal fa-grin-tongue-wink",
        sT: [],
      },
      {
        t: "fad fa-grin-tongue-wink",
        sT: [],
      },
      {
        t: "fas fa-grin-wink",
        sT: [],
      },
      {
        t: "far fa-grin-wink",
        sT: [],
      },
      {
        t: "fal fa-grin-wink",
        sT: [],
      },
      {
        t: "fad fa-grin-wink",
        sT: [],
      },
      {
        t: "fas fa-grip-horizontal",
        sT: [],
      },
      {
        t: "far fa-grip-horizontal",
        sT: [],
      },
      {
        t: "fal fa-grip-horizontal",
        sT: [],
      },
      {
        t: "fad fa-grip-horizontal",
        sT: [],
      },
      {
        t: "fas fa-grip-lines",
        sT: [],
      },
      {
        t: "far fa-grip-lines",
        sT: [],
      },
      {
        t: "fal fa-grip-lines",
        sT: [],
      },
      {
        t: "fad fa-grip-lines",
        sT: [],
      },
      {
        t: "fas fa-grip-lines-vertical",
        sT: [],
      },
      {
        t: "far fa-grip-lines-vertical",
        sT: [],
      },
      {
        t: "fal fa-grip-lines-vertical",
        sT: [],
      },
      {
        t: "fad fa-grip-lines-vertical",
        sT: [],
      },
      {
        t: "fas fa-grip-vertical",
        sT: [],
      },
      {
        t: "far fa-grip-vertical",
        sT: [],
      },
      {
        t: "fal fa-grip-vertical",
        sT: [],
      },
      {
        t: "fad fa-grip-vertical",
        sT: [],
      },
      {
        t: "fab fa-gripfire",
        sT: [],
      },
      {
        t: "fab fa-grunt",
        sT: [],
      },
      {
        t: "fab fa-guilded",
        sT: [],
      },
      {
        t: "fas fa-guitar",
        sT: [],
      },
      {
        t: "far fa-guitar",
        sT: [],
      },
      {
        t: "fal fa-guitar",
        sT: [],
      },
      {
        t: "fad fa-guitar",
        sT: [],
      },
      {
        t: "fas fa-guitar-electric",
        sT: [],
      },
      {
        t: "far fa-guitar-electric",
        sT: [],
      },
      {
        t: "fal fa-guitar-electric",
        sT: [],
      },
      {
        t: "fad fa-guitar-electric",
        sT: [],
      },
      {
        t: "fas fa-guitars",
        sT: [],
      },
      {
        t: "far fa-guitars",
        sT: [],
      },
      {
        t: "fal fa-guitars",
        sT: [],
      },
      {
        t: "fad fa-guitars",
        sT: [],
      },
      {
        t: "fab fa-gulp",
        sT: [],
      },
      {
        t: "fas fa-h-square",
        sT: [],
      },
      {
        t: "far fa-h-square",
        sT: [],
      },
      {
        t: "fal fa-h-square",
        sT: [],
      },
      {
        t: "fad fa-h-square",
        sT: [],
      },
      {
        t: "fas fa-h1",
        sT: [],
      },
      {
        t: "far fa-h1",
        sT: [],
      },
      {
        t: "fal fa-h1",
        sT: [],
      },
      {
        t: "fad fa-h1",
        sT: [],
      },
      {
        t: "fas fa-h2",
        sT: [],
      },
      {
        t: "far fa-h2",
        sT: [],
      },
      {
        t: "fal fa-h2",
        sT: [],
      },
      {
        t: "fad fa-h2",
        sT: [],
      },
      {
        t: "fas fa-h3",
        sT: [],
      },
      {
        t: "far fa-h3",
        sT: [],
      },
      {
        t: "fal fa-h3",
        sT: [],
      },
      {
        t: "fad fa-h3",
        sT: [],
      },
      {
        t: "fas fa-h4",
        sT: [],
      },
      {
        t: "far fa-h4",
        sT: [],
      },
      {
        t: "fal fa-h4",
        sT: [],
      },
      {
        t: "fad fa-h4",
        sT: [],
      },
      {
        t: "fab fa-hacker-news",
        sT: [],
      },
      {
        t: "fab fa-hacker-news-square",
        sT: [],
      },
      {
        t: "fab fa-hackerrank",
        sT: [],
      },
      {
        t: "fas fa-hamburger",
        sT: [],
      },
      {
        t: "far fa-hamburger",
        sT: [],
      },
      {
        t: "fal fa-hamburger",
        sT: [],
      },
      {
        t: "fad fa-hamburger",
        sT: [],
      },
      {
        t: "fas fa-hammer",
        sT: [],
      },
      {
        t: "far fa-hammer",
        sT: [],
      },
      {
        t: "fal fa-hammer",
        sT: [],
      },
      {
        t: "fad fa-hammer",
        sT: [],
      },
      {
        t: "fas fa-hammer-war",
        sT: [],
      },
      {
        t: "far fa-hammer-war",
        sT: [],
      },
      {
        t: "fal fa-hammer-war",
        sT: [],
      },
      {
        t: "fad fa-hammer-war",
        sT: [],
      },
      {
        t: "fas fa-hamsa",
        sT: [],
      },
      {
        t: "far fa-hamsa",
        sT: [],
      },
      {
        t: "fal fa-hamsa",
        sT: [],
      },
      {
        t: "fad fa-hamsa",
        sT: [],
      },
      {
        t: "fas fa-hand-heart",
        sT: [],
      },
      {
        t: "far fa-hand-heart",
        sT: [],
      },
      {
        t: "fal fa-hand-heart",
        sT: [],
      },
      {
        t: "fad fa-hand-heart",
        sT: [],
      },
      {
        t: "fas fa-hand-holding",
        sT: [],
      },
      {
        t: "far fa-hand-holding",
        sT: [],
      },
      {
        t: "fal fa-hand-holding",
        sT: [],
      },
      {
        t: "fad fa-hand-holding",
        sT: [],
      },
      {
        t: "fas fa-hand-holding-box",
        sT: [],
      },
      {
        t: "far fa-hand-holding-box",
        sT: [],
      },
      {
        t: "fal fa-hand-holding-box",
        sT: [],
      },
      {
        t: "fad fa-hand-holding-box",
        sT: [],
      },
      {
        t: "fas fa-hand-holding-heart",
        sT: [],
      },
      {
        t: "far fa-hand-holding-heart",
        sT: [],
      },
      {
        t: "fal fa-hand-holding-heart",
        sT: [],
      },
      {
        t: "fad fa-hand-holding-heart",
        sT: [],
      },
      {
        t: "fas fa-hand-holding-magic",
        sT: [],
      },
      {
        t: "far fa-hand-holding-magic",
        sT: [],
      },
      {
        t: "fal fa-hand-holding-magic",
        sT: [],
      },
      {
        t: "fad fa-hand-holding-magic",
        sT: [],
      },
      {
        t: "fal fa-hand-holding-medical",
        sT: [],
      },
      {
        t: "far fa-hand-holding-medical",
        sT: [],
      },
      {
        t: "fas fa-hand-holding-medical",
        sT: [],
      },
      {
        t: "fad fa-hand-holding-medical",
        sT: [],
      },
      {
        t: "fas fa-hand-holding-seedling",
        sT: [],
      },
      {
        t: "far fa-hand-holding-seedling",
        sT: [],
      },
      {
        t: "fal fa-hand-holding-seedling",
        sT: [],
      },
      {
        t: "fad fa-hand-holding-seedling",
        sT: [],
      },
      {
        t: "fas fa-hand-holding-usd",
        sT: [],
      },
      {
        t: "far fa-hand-holding-usd",
        sT: [],
      },
      {
        t: "fal fa-hand-holding-usd",
        sT: [],
      },
      {
        t: "fad fa-hand-holding-usd",
        sT: [],
      },
      {
        t: "fas fa-hand-holding-water",
        sT: [],
      },
      {
        t: "far fa-hand-holding-water",
        sT: [],
      },
      {
        t: "fal fa-hand-holding-water",
        sT: [],
      },
      {
        t: "fad fa-hand-holding-water",
        sT: [],
      },
      {
        t: "fas fa-hand-lizard",
        sT: [],
      },
      {
        t: "far fa-hand-lizard",
        sT: [],
      },
      {
        t: "fal fa-hand-lizard",
        sT: [],
      },
      {
        t: "fad fa-hand-lizard",
        sT: [],
      },
      {
        t: "fas fa-hand-middle-finger",
        sT: [],
      },
      {
        t: "far fa-hand-middle-finger",
        sT: [],
      },
      {
        t: "fal fa-hand-middle-finger",
        sT: [],
      },
      {
        t: "fad fa-hand-middle-finger",
        sT: [],
      },
      {
        t: "fas fa-hand-paper",
        sT: [],
      },
      {
        t: "far fa-hand-paper",
        sT: [],
      },
      {
        t: "fal fa-hand-paper",
        sT: [],
      },
      {
        t: "fad fa-hand-paper",
        sT: [],
      },
      {
        t: "fas fa-hand-peace",
        sT: [],
      },
      {
        t: "far fa-hand-peace",
        sT: [],
      },
      {
        t: "fal fa-hand-peace",
        sT: [],
      },
      {
        t: "fad fa-hand-peace",
        sT: [],
      },
      {
        t: "fas fa-hand-point-down",
        sT: [],
      },
      {
        t: "far fa-hand-point-down",
        sT: [],
      },
      {
        t: "fal fa-hand-point-down",
        sT: [],
      },
      {
        t: "fad fa-hand-point-down",
        sT: [],
      },
      {
        t: "fas fa-hand-point-left",
        sT: [],
      },
      {
        t: "far fa-hand-point-left",
        sT: [],
      },
      {
        t: "fal fa-hand-point-left",
        sT: [],
      },
      {
        t: "fad fa-hand-point-left",
        sT: [],
      },
      {
        t: "fas fa-hand-point-right",
        sT: [],
      },
      {
        t: "far fa-hand-point-right",
        sT: [],
      },
      {
        t: "fal fa-hand-point-right",
        sT: [],
      },
      {
        t: "fad fa-hand-point-right",
        sT: [],
      },
      {
        t: "fas fa-hand-point-up",
        sT: [],
      },
      {
        t: "far fa-hand-point-up",
        sT: [],
      },
      {
        t: "fal fa-hand-point-up",
        sT: [],
      },
      {
        t: "fad fa-hand-point-up",
        sT: [],
      },
      {
        t: "fas fa-hand-pointer",
        sT: [],
      },
      {
        t: "far fa-hand-pointer",
        sT: [],
      },
      {
        t: "fal fa-hand-pointer",
        sT: [],
      },
      {
        t: "fad fa-hand-pointer",
        sT: [],
      },
      {
        t: "fas fa-hand-receiving",
        sT: [],
      },
      {
        t: "far fa-hand-receiving",
        sT: [],
      },
      {
        t: "fal fa-hand-receiving",
        sT: [],
      },
      {
        t: "fad fa-hand-receiving",
        sT: [],
      },
      {
        t: "fas fa-hand-rock",
        sT: [],
      },
      {
        t: "far fa-hand-rock",
        sT: [],
      },
      {
        t: "fal fa-hand-rock",
        sT: [],
      },
      {
        t: "fad fa-hand-rock",
        sT: [],
      },
      {
        t: "fas fa-hand-scissors",
        sT: [],
      },
      {
        t: "far fa-hand-scissors",
        sT: [],
      },
      {
        t: "fal fa-hand-scissors",
        sT: [],
      },
      {
        t: "fad fa-hand-scissors",
        sT: [],
      },
      {
        t: "fal fa-hand-sparkles",
        sT: [],
      },
      {
        t: "far fa-hand-sparkles",
        sT: [],
      },
      {
        t: "fas fa-hand-sparkles",
        sT: [],
      },
      {
        t: "fad fa-hand-sparkles",
        sT: [],
      },
      {
        t: "fas fa-hand-spock",
        sT: [],
      },
      {
        t: "far fa-hand-spock",
        sT: [],
      },
      {
        t: "fal fa-hand-spock",
        sT: [],
      },
      {
        t: "fad fa-hand-spock",
        sT: [],
      },
      {
        t: "fas fa-hands",
        sT: [],
      },
      {
        t: "far fa-hands",
        sT: [],
      },
      {
        t: "fal fa-hands",
        sT: [],
      },
      {
        t: "fad fa-hands",
        sT: [],
      },
      {
        t: "fas fa-hands-heart",
        sT: [],
      },
      {
        t: "far fa-hands-heart",
        sT: [],
      },
      {
        t: "fal fa-hands-heart",
        sT: [],
      },
      {
        t: "fad fa-hands-heart",
        sT: [],
      },
      {
        t: "fas fa-hands-helping",
        sT: [],
      },
      {
        t: "far fa-hands-helping",
        sT: [],
      },
      {
        t: "fal fa-hands-helping",
        sT: [],
      },
      {
        t: "fad fa-hands-helping",
        sT: [],
      },
      {
        t: "fas fa-hands-usd",
        sT: [],
      },
      {
        t: "far fa-hands-usd",
        sT: [],
      },
      {
        t: "fal fa-hands-usd",
        sT: [],
      },
      {
        t: "fad fa-hands-usd",
        sT: [],
      },
      {
        t: "fal fa-hands-wash",
        sT: [],
      },
      {
        t: "far fa-hands-wash",
        sT: [],
      },
      {
        t: "fas fa-hands-wash",
        sT: [],
      },
      {
        t: "fad fa-hands-wash",
        sT: [],
      },
      {
        t: "fas fa-handshake",
        sT: [],
      },
      {
        t: "far fa-handshake",
        sT: [],
      },
      {
        t: "fal fa-handshake",
        sT: [],
      },
      {
        t: "fad fa-handshake",
        sT: [],
      },
      {
        t: "fas fa-handshake-alt",
        sT: [],
      },
      {
        t: "far fa-handshake-alt",
        sT: [],
      },
      {
        t: "fal fa-handshake-alt",
        sT: [],
      },
      {
        t: "fad fa-handshake-alt",
        sT: [],
      },
      {
        t: "fal fa-handshake-alt-slash",
        sT: [],
      },
      {
        t: "far fa-handshake-alt-slash",
        sT: [],
      },
      {
        t: "fas fa-handshake-alt-slash",
        sT: [],
      },
      {
        t: "fad fa-handshake-alt-slash",
        sT: [],
      },
      {
        t: "fal fa-handshake-slash",
        sT: [],
      },
      {
        t: "far fa-handshake-slash",
        sT: [],
      },
      {
        t: "fas fa-handshake-slash",
        sT: [],
      },
      {
        t: "fad fa-handshake-slash",
        sT: [],
      },
      {
        t: "fas fa-hanukiah",
        sT: [],
      },
      {
        t: "far fa-hanukiah",
        sT: [],
      },
      {
        t: "fal fa-hanukiah",
        sT: [],
      },
      {
        t: "fad fa-hanukiah",
        sT: [],
      },
      {
        t: "fas fa-hard-hat",
        sT: [],
      },
      {
        t: "far fa-hard-hat",
        sT: [],
      },
      {
        t: "fal fa-hard-hat",
        sT: [],
      },
      {
        t: "fad fa-hard-hat",
        sT: [],
      },
      {
        t: "fas fa-hashtag",
        sT: [],
      },
      {
        t: "far fa-hashtag",
        sT: [],
      },
      {
        t: "fal fa-hashtag",
        sT: [],
      },
      {
        t: "fad fa-hashtag",
        sT: [],
      },
      {
        t: "fas fa-hat-chef",
        sT: [],
      },
      {
        t: "far fa-hat-chef",
        sT: [],
      },
      {
        t: "fal fa-hat-chef",
        sT: [],
      },
      {
        t: "fad fa-hat-chef",
        sT: [],
      },
      {
        t: "fal fa-hat-cowboy",
        sT: [],
      },
      {
        t: "far fa-hat-cowboy",
        sT: [],
      },
      {
        t: "fas fa-hat-cowboy",
        sT: [],
      },
      {
        t: "fad fa-hat-cowboy",
        sT: [],
      },
      {
        t: "fal fa-hat-cowboy-side",
        sT: [],
      },
      {
        t: "far fa-hat-cowboy-side",
        sT: [],
      },
      {
        t: "fas fa-hat-cowboy-side",
        sT: [],
      },
      {
        t: "fad fa-hat-cowboy-side",
        sT: [],
      },
      {
        t: "fas fa-hat-santa",
        sT: [],
      },
      {
        t: "far fa-hat-santa",
        sT: [],
      },
      {
        t: "fal fa-hat-santa",
        sT: [],
      },
      {
        t: "fad fa-hat-santa",
        sT: [],
      },
      {
        t: "fas fa-hat-winter",
        sT: [],
      },
      {
        t: "far fa-hat-winter",
        sT: [],
      },
      {
        t: "fal fa-hat-winter",
        sT: [],
      },
      {
        t: "fad fa-hat-winter",
        sT: [],
      },
      {
        t: "fas fa-hat-witch",
        sT: [],
      },
      {
        t: "far fa-hat-witch",
        sT: [],
      },
      {
        t: "fal fa-hat-witch",
        sT: [],
      },
      {
        t: "fad fa-hat-witch",
        sT: [],
      },
      {
        t: "fas fa-hat-wizard",
        sT: [],
      },
      {
        t: "far fa-hat-wizard",
        sT: [],
      },
      {
        t: "fal fa-hat-wizard",
        sT: [],
      },
      {
        t: "fad fa-hat-wizard",
        sT: [],
      },
      {
        t: "fas fa-hdd",
        sT: [],
      },
      {
        t: "far fa-hdd",
        sT: [],
      },
      {
        t: "fal fa-hdd",
        sT: [],
      },
      {
        t: "fad fa-hdd",
        sT: [],
      },
      {
        t: "fas fa-head-side",
        sT: [],
      },
      {
        t: "far fa-head-side",
        sT: [],
      },
      {
        t: "fal fa-head-side",
        sT: [],
      },
      {
        t: "fad fa-head-side",
        sT: [],
      },
      {
        t: "fas fa-head-side-brain",
        sT: [],
      },
      {
        t: "far fa-head-side-brain",
        sT: [],
      },
      {
        t: "fal fa-head-side-brain",
        sT: [],
      },
      {
        t: "fad fa-head-side-brain",
        sT: [],
      },
      {
        t: "fal fa-head-side-cough",
        sT: [],
      },
      {
        t: "far fa-head-side-cough",
        sT: [],
      },
      {
        t: "fas fa-head-side-cough",
        sT: [],
      },
      {
        t: "fad fa-head-side-cough",
        sT: [],
      },
      {
        t: "fal fa-head-side-cough-slash",
        sT: [],
      },
      {
        t: "far fa-head-side-cough-slash",
        sT: [],
      },
      {
        t: "fas fa-head-side-cough-slash",
        sT: [],
      },
      {
        t: "fad fa-head-side-cough-slash",
        sT: [],
      },
      {
        t: "fas fa-head-side-headphones",
        sT: [],
      },
      {
        t: "far fa-head-side-headphones",
        sT: [],
      },
      {
        t: "fal fa-head-side-headphones",
        sT: [],
      },
      {
        t: "fad fa-head-side-headphones",
        sT: [],
      },
      {
        t: "fal fa-head-side-mask",
        sT: [],
      },
      {
        t: "far fa-head-side-mask",
        sT: [],
      },
      {
        t: "fas fa-head-side-mask",
        sT: [],
      },
      {
        t: "fad fa-head-side-mask",
        sT: [],
      },
      {
        t: "fas fa-head-side-medical",
        sT: [],
      },
      {
        t: "far fa-head-side-medical",
        sT: [],
      },
      {
        t: "fal fa-head-side-medical",
        sT: [],
      },
      {
        t: "fad fa-head-side-medical",
        sT: [],
      },
      {
        t: "fal fa-head-side-virus",
        sT: [],
      },
      {
        t: "far fa-head-side-virus",
        sT: [],
      },
      {
        t: "fas fa-head-side-virus",
        sT: [],
      },
      {
        t: "fad fa-head-side-virus",
        sT: [],
      },
      {
        t: "fas fa-head-vr",
        sT: [],
      },
      {
        t: "far fa-head-vr",
        sT: [],
      },
      {
        t: "fal fa-head-vr",
        sT: [],
      },
      {
        t: "fad fa-head-vr",
        sT: [],
      },
      {
        t: "fas fa-heading",
        sT: [],
      },
      {
        t: "far fa-heading",
        sT: [],
      },
      {
        t: "fal fa-heading",
        sT: [],
      },
      {
        t: "fad fa-heading",
        sT: [],
      },
      {
        t: "fas fa-headphones",
        sT: [],
      },
      {
        t: "far fa-headphones",
        sT: [],
      },
      {
        t: "fal fa-headphones",
        sT: [],
      },
      {
        t: "fad fa-headphones",
        sT: [],
      },
      {
        t: "fas fa-headphones-alt",
        sT: [],
      },
      {
        t: "far fa-headphones-alt",
        sT: [],
      },
      {
        t: "fal fa-headphones-alt",
        sT: [],
      },
      {
        t: "fad fa-headphones-alt",
        sT: [],
      },
      {
        t: "fas fa-headset",
        sT: [],
      },
      {
        t: "far fa-headset",
        sT: [],
      },
      {
        t: "fal fa-headset",
        sT: [],
      },
      {
        t: "fad fa-headset",
        sT: [],
      },
      {
        t: "fas fa-heart",
        sT: [],
      },
      {
        t: "far fa-heart",
        sT: [],
      },
      {
        t: "fal fa-heart",
        sT: [],
      },
      {
        t: "fad fa-heart",
        sT: [],
      },
      {
        t: "fas fa-heart-broken",
        sT: [],
      },
      {
        t: "far fa-heart-broken",
        sT: [],
      },
      {
        t: "fal fa-heart-broken",
        sT: [],
      },
      {
        t: "fad fa-heart-broken",
        sT: [],
      },
      {
        t: "fas fa-heart-circle",
        sT: [],
      },
      {
        t: "far fa-heart-circle",
        sT: [],
      },
      {
        t: "fal fa-heart-circle",
        sT: [],
      },
      {
        t: "fad fa-heart-circle",
        sT: [],
      },
      {
        t: "fas fa-heart-rate",
        sT: [],
      },
      {
        t: "far fa-heart-rate",
        sT: [],
      },
      {
        t: "fal fa-heart-rate",
        sT: [],
      },
      {
        t: "fad fa-heart-rate",
        sT: [],
      },
      {
        t: "fas fa-heart-square",
        sT: [],
      },
      {
        t: "far fa-heart-square",
        sT: [],
      },
      {
        t: "fal fa-heart-square",
        sT: [],
      },
      {
        t: "fad fa-heart-square",
        sT: [],
      },
      {
        t: "fas fa-heartbeat",
        sT: [],
      },
      {
        t: "far fa-heartbeat",
        sT: [],
      },
      {
        t: "fal fa-heartbeat",
        sT: [],
      },
      {
        t: "fad fa-heartbeat",
        sT: [],
      },
      {
        t: "fas fa-heat",
        sT: [],
      },
      {
        t: "far fa-heat",
        sT: [],
      },
      {
        t: "fal fa-heat",
        sT: [],
      },
      {
        t: "fad fa-heat",
        sT: [],
      },
      {
        t: "fas fa-helicopter",
        sT: [],
      },
      {
        t: "far fa-helicopter",
        sT: [],
      },
      {
        t: "fal fa-helicopter",
        sT: [],
      },
      {
        t: "fad fa-helicopter",
        sT: [],
      },
      {
        t: "fas fa-helmet-battle",
        sT: [],
      },
      {
        t: "far fa-helmet-battle",
        sT: [],
      },
      {
        t: "fal fa-helmet-battle",
        sT: [],
      },
      {
        t: "fad fa-helmet-battle",
        sT: [],
      },
      {
        t: "fas fa-hexagon",
        sT: [],
      },
      {
        t: "far fa-hexagon",
        sT: [],
      },
      {
        t: "fal fa-hexagon",
        sT: [],
      },
      {
        t: "fad fa-hexagon",
        sT: [],
      },
      {
        t: "fas fa-highlighter",
        sT: [],
      },
      {
        t: "far fa-highlighter",
        sT: [],
      },
      {
        t: "fal fa-highlighter",
        sT: [],
      },
      {
        t: "fad fa-highlighter",
        sT: [],
      },
      {
        t: "fas fa-hiking",
        sT: [],
      },
      {
        t: "far fa-hiking",
        sT: [],
      },
      {
        t: "fal fa-hiking",
        sT: [],
      },
      {
        t: "fad fa-hiking",
        sT: [],
      },
      {
        t: "fas fa-hippo",
        sT: [],
      },
      {
        t: "far fa-hippo",
        sT: [],
      },
      {
        t: "fal fa-hippo",
        sT: [],
      },
      {
        t: "fad fa-hippo",
        sT: [],
      },
      {
        t: "fab fa-hips",
        sT: [],
      },
      {
        t: "fab fa-hire-a-helper",
        sT: [],
      },
      {
        t: "fas fa-history",
        sT: [],
      },
      {
        t: "far fa-history",
        sT: [],
      },
      {
        t: "fal fa-history",
        sT: [],
      },
      {
        t: "fad fa-history",
        sT: [],
      },
      {
        t: "fab fa-hive",
        sT: [],
      },
      {
        t: "fas fa-hockey-mask",
        sT: [],
      },
      {
        t: "far fa-hockey-mask",
        sT: [],
      },
      {
        t: "fal fa-hockey-mask",
        sT: [],
      },
      {
        t: "fad fa-hockey-mask",
        sT: [],
      },
      {
        t: "fas fa-hockey-puck",
        sT: [],
      },
      {
        t: "far fa-hockey-puck",
        sT: [],
      },
      {
        t: "fal fa-hockey-puck",
        sT: [],
      },
      {
        t: "fad fa-hockey-puck",
        sT: [],
      },
      {
        t: "fas fa-hockey-sticks",
        sT: [],
      },
      {
        t: "far fa-hockey-sticks",
        sT: [],
      },
      {
        t: "fal fa-hockey-sticks",
        sT: [],
      },
      {
        t: "fad fa-hockey-sticks",
        sT: [],
      },
      {
        t: "fas fa-holly-berry",
        sT: [],
      },
      {
        t: "far fa-holly-berry",
        sT: [],
      },
      {
        t: "fal fa-holly-berry",
        sT: [],
      },
      {
        t: "fad fa-holly-berry",
        sT: [],
      },
      {
        t: "fas fa-home",
        sT: [],
      },
      {
        t: "far fa-home",
        sT: [],
      },
      {
        t: "fal fa-home",
        sT: [],
      },
      {
        t: "fad fa-home",
        sT: [],
      },
      {
        t: "fas fa-home-alt",
        sT: [],
      },
      {
        t: "far fa-home-alt",
        sT: [],
      },
      {
        t: "fal fa-home-alt",
        sT: [],
      },
      {
        t: "fad fa-home-alt",
        sT: [],
      },
      {
        t: "fas fa-home-heart",
        sT: [],
      },
      {
        t: "far fa-home-heart",
        sT: [],
      },
      {
        t: "fal fa-home-heart",
        sT: [],
      },
      {
        t: "fad fa-home-heart",
        sT: [],
      },
      {
        t: "fas fa-home-lg",
        sT: [],
      },
      {
        t: "far fa-home-lg",
        sT: [],
      },
      {
        t: "fal fa-home-lg",
        sT: [],
      },
      {
        t: "fad fa-home-lg",
        sT: [],
      },
      {
        t: "fas fa-home-lg-alt",
        sT: [],
      },
      {
        t: "far fa-home-lg-alt",
        sT: [],
      },
      {
        t: "fal fa-home-lg-alt",
        sT: [],
      },
      {
        t: "fad fa-home-lg-alt",
        sT: [],
      },
      {
        t: "fas fa-hood-cloak",
        sT: [],
      },
      {
        t: "far fa-hood-cloak",
        sT: [],
      },
      {
        t: "fal fa-hood-cloak",
        sT: [],
      },
      {
        t: "fad fa-hood-cloak",
        sT: [],
      },
      {
        t: "fab fa-hooli",
        sT: [],
      },
      {
        t: "fas fa-horizontal-rule",
        sT: [],
      },
      {
        t: "far fa-horizontal-rule",
        sT: [],
      },
      {
        t: "fal fa-horizontal-rule",
        sT: [],
      },
      {
        t: "fad fa-horizontal-rule",
        sT: [],
      },
      {
        t: "fab fa-hornbill",
        sT: [],
      },
      {
        t: "fas fa-horse",
        sT: [],
      },
      {
        t: "far fa-horse",
        sT: [],
      },
      {
        t: "fal fa-horse",
        sT: [],
      },
      {
        t: "fad fa-horse",
        sT: [],
      },
      {
        t: "fas fa-horse-head",
        sT: [],
      },
      {
        t: "far fa-horse-head",
        sT: [],
      },
      {
        t: "fal fa-horse-head",
        sT: [],
      },
      {
        t: "fad fa-horse-head",
        sT: [],
      },
      {
        t: "fal fa-horse-saddle",
        sT: [],
      },
      {
        t: "far fa-horse-saddle",
        sT: [],
      },
      {
        t: "fas fa-horse-saddle",
        sT: [],
      },
      {
        t: "fad fa-horse-saddle",
        sT: [],
      },
      {
        t: "fas fa-hospital",
        sT: [],
      },
      {
        t: "far fa-hospital",
        sT: [],
      },
      {
        t: "fal fa-hospital",
        sT: [],
      },
      {
        t: "fad fa-hospital",
        sT: [],
      },
      {
        t: "fas fa-hospital-alt",
        sT: [],
      },
      {
        t: "far fa-hospital-alt",
        sT: [],
      },
      {
        t: "fal fa-hospital-alt",
        sT: [],
      },
      {
        t: "fad fa-hospital-alt",
        sT: [],
      },
      {
        t: "fas fa-hospital-symbol",
        sT: [],
      },
      {
        t: "far fa-hospital-symbol",
        sT: [],
      },
      {
        t: "fal fa-hospital-symbol",
        sT: [],
      },
      {
        t: "fad fa-hospital-symbol",
        sT: [],
      },
      {
        t: "fas fa-hospital-user",
        sT: [],
      },
      {
        t: "far fa-hospital-user",
        sT: [],
      },
      {
        t: "fal fa-hospital-user",
        sT: [],
      },
      {
        t: "fad fa-hospital-user",
        sT: [],
      },
      {
        t: "fas fa-hospitals",
        sT: [],
      },
      {
        t: "far fa-hospitals",
        sT: [],
      },
      {
        t: "fal fa-hospitals",
        sT: [],
      },
      {
        t: "fad fa-hospitals",
        sT: [],
      },
      {
        t: "fas fa-hot-tub",
        sT: [],
      },
      {
        t: "far fa-hot-tub",
        sT: [],
      },
      {
        t: "fal fa-hot-tub",
        sT: [],
      },
      {
        t: "fad fa-hot-tub",
        sT: [],
      },
      {
        t: "fas fa-hotdog",
        sT: [],
      },
      {
        t: "far fa-hotdog",
        sT: [],
      },
      {
        t: "fal fa-hotdog",
        sT: [],
      },
      {
        t: "fad fa-hotdog",
        sT: [],
      },
      {
        t: "fas fa-hotel",
        sT: [],
      },
      {
        t: "far fa-hotel",
        sT: [],
      },
      {
        t: "fal fa-hotel",
        sT: [],
      },
      {
        t: "fad fa-hotel",
        sT: [],
      },
      {
        t: "fab fa-hotjar",
        sT: [],
      },
      {
        t: "fas fa-hourglass",
        sT: [],
      },
      {
        t: "far fa-hourglass",
        sT: [],
      },
      {
        t: "fal fa-hourglass",
        sT: [],
      },
      {
        t: "fad fa-hourglass",
        sT: [],
      },
      {
        t: "fas fa-hourglass-end",
        sT: [],
      },
      {
        t: "far fa-hourglass-end",
        sT: [],
      },
      {
        t: "fal fa-hourglass-end",
        sT: [],
      },
      {
        t: "fad fa-hourglass-end",
        sT: [],
      },
      {
        t: "fas fa-hourglass-half",
        sT: [],
      },
      {
        t: "far fa-hourglass-half",
        sT: [],
      },
      {
        t: "fal fa-hourglass-half",
        sT: [],
      },
      {
        t: "fad fa-hourglass-half",
        sT: [],
      },
      {
        t: "fas fa-hourglass-start",
        sT: [],
      },
      {
        t: "far fa-hourglass-start",
        sT: [],
      },
      {
        t: "fal fa-hourglass-start",
        sT: [],
      },
      {
        t: "fad fa-hourglass-start",
        sT: [],
      },
      {
        t: "fas fa-house",
        sT: [],
      },
      {
        t: "far fa-house",
        sT: [],
      },
      {
        t: "fal fa-house",
        sT: [],
      },
      {
        t: "fad fa-house",
        sT: [],
      },
      {
        t: "fas fa-house-damage",
        sT: [],
      },
      {
        t: "far fa-house-damage",
        sT: [],
      },
      {
        t: "fal fa-house-damage",
        sT: [],
      },
      {
        t: "fad fa-house-damage",
        sT: [],
      },
      {
        t: "fas fa-house-day",
        sT: [],
      },
      {
        t: "far fa-house-day",
        sT: [],
      },
      {
        t: "fal fa-house-day",
        sT: [],
      },
      {
        t: "fad fa-house-day",
        sT: [],
      },
      {
        t: "fas fa-house-flood",
        sT: [],
      },
      {
        t: "far fa-house-flood",
        sT: [],
      },
      {
        t: "fal fa-house-flood",
        sT: [],
      },
      {
        t: "fad fa-house-flood",
        sT: [],
      },
      {
        t: "fas fa-house-leave",
        sT: [],
      },
      {
        t: "far fa-house-leave",
        sT: [],
      },
      {
        t: "fal fa-house-leave",
        sT: [],
      },
      {
        t: "fad fa-house-leave",
        sT: [],
      },
      {
        t: "fas fa-house-night",
        sT: [],
      },
      {
        t: "far fa-house-night",
        sT: [],
      },
      {
        t: "fal fa-house-night",
        sT: [],
      },
      {
        t: "fad fa-house-night",
        sT: [],
      },
      {
        t: "fas fa-house-return",
        sT: [],
      },
      {
        t: "far fa-house-return",
        sT: [],
      },
      {
        t: "fal fa-house-return",
        sT: [],
      },
      {
        t: "fad fa-house-return",
        sT: [],
      },
      {
        t: "fas fa-house-signal",
        sT: [],
      },
      {
        t: "far fa-house-signal",
        sT: [],
      },
      {
        t: "fal fa-house-signal",
        sT: [],
      },
      {
        t: "fad fa-house-signal",
        sT: [],
      },
      {
        t: "fal fa-house-user",
        sT: [],
      },
      {
        t: "far fa-house-user",
        sT: [],
      },
      {
        t: "fas fa-house-user",
        sT: [],
      },
      {
        t: "fad fa-house-user",
        sT: [],
      },
      {
        t: "fab fa-houzz",
        sT: [],
      },
      {
        t: "fas fa-hryvnia",
        sT: [],
      },
      {
        t: "far fa-hryvnia",
        sT: [],
      },
      {
        t: "fal fa-hryvnia",
        sT: [],
      },
      {
        t: "fad fa-hryvnia",
        sT: [],
      },
      {
        t: "fab fa-html5",
        sT: [],
      },
      {
        t: "fab fa-hubspot",
        sT: [],
      },
      {
        t: "fas fa-humidity",
        sT: [],
      },
      {
        t: "far fa-humidity",
        sT: [],
      },
      {
        t: "fal fa-humidity",
        sT: [],
      },
      {
        t: "fad fa-humidity",
        sT: [],
      },
      {
        t: "fas fa-hurricane",
        sT: [],
      },
      {
        t: "far fa-hurricane",
        sT: [],
      },
      {
        t: "fal fa-hurricane",
        sT: [],
      },
      {
        t: "fad fa-hurricane",
        sT: [],
      },
      {
        t: "fas fa-i-cursor",
        sT: [],
      },
      {
        t: "far fa-i-cursor",
        sT: [],
      },
      {
        t: "fal fa-i-cursor",
        sT: [],
      },
      {
        t: "fad fa-i-cursor",
        sT: [],
      },
      {
        t: "fas fa-ice-cream",
        sT: [],
      },
      {
        t: "far fa-ice-cream",
        sT: [],
      },
      {
        t: "fal fa-ice-cream",
        sT: [],
      },
      {
        t: "fad fa-ice-cream",
        sT: [],
      },
      {
        t: "fas fa-ice-skate",
        sT: [],
      },
      {
        t: "far fa-ice-skate",
        sT: [],
      },
      {
        t: "fal fa-ice-skate",
        sT: [],
      },
      {
        t: "fad fa-ice-skate",
        sT: [],
      },
      {
        t: "fas fa-icicles",
        sT: [],
      },
      {
        t: "far fa-icicles",
        sT: [],
      },
      {
        t: "fal fa-icicles",
        sT: [],
      },
      {
        t: "fad fa-icicles",
        sT: [],
      },
      {
        t: "fas fa-icons",
        sT: [],
      },
      {
        t: "far fa-icons",
        sT: [],
      },
      {
        t: "fal fa-icons",
        sT: [],
      },
      {
        t: "fad fa-icons",
        sT: [],
      },
      {
        t: "fas fa-icons-alt",
        sT: [],
      },
      {
        t: "far fa-icons-alt",
        sT: [],
      },
      {
        t: "fal fa-icons-alt",
        sT: [],
      },
      {
        t: "fad fa-icons-alt",
        sT: [],
      },
      {
        t: "fas fa-id-badge",
        sT: [],
      },
      {
        t: "far fa-id-badge",
        sT: [],
      },
      {
        t: "fal fa-id-badge",
        sT: [],
      },
      {
        t: "fad fa-id-badge",
        sT: [],
      },
      {
        t: "fas fa-id-card",
        sT: [],
      },
      {
        t: "far fa-id-card",
        sT: [],
      },
      {
        t: "fal fa-id-card",
        sT: [],
      },
      {
        t: "fad fa-id-card",
        sT: [],
      },
      {
        t: "fas fa-id-card-alt",
        sT: [],
      },
      {
        t: "far fa-id-card-alt",
        sT: [],
      },
      {
        t: "fal fa-id-card-alt",
        sT: [],
      },
      {
        t: "fad fa-id-card-alt",
        sT: [],
      },
      {
        t: "fab fa-ideal",
        sT: [],
      },
      {
        t: "fas fa-igloo",
        sT: [],
      },
      {
        t: "far fa-igloo",
        sT: [],
      },
      {
        t: "fal fa-igloo",
        sT: [],
      },
      {
        t: "fad fa-igloo",
        sT: [],
      },
      {
        t: "fas fa-image",
        sT: [],
      },
      {
        t: "far fa-image",
        sT: [],
      },
      {
        t: "fal fa-image",
        sT: [],
      },
      {
        t: "fad fa-image",
        sT: [],
      },
      {
        t: "fas fa-image-polaroid",
        sT: [],
      },
      {
        t: "far fa-image-polaroid",
        sT: [],
      },
      {
        t: "fal fa-image-polaroid",
        sT: [],
      },
      {
        t: "fad fa-image-polaroid",
        sT: [],
      },
      {
        t: "fas fa-images",
        sT: [],
      },
      {
        t: "far fa-images",
        sT: [],
      },
      {
        t: "fal fa-images",
        sT: [],
      },
      {
        t: "fad fa-images",
        sT: [],
      },
      {
        t: "fab fa-imdb",
        sT: [],
      },
      {
        t: "fas fa-inbox",
        sT: [],
      },
      {
        t: "far fa-inbox",
        sT: [],
      },
      {
        t: "fal fa-inbox",
        sT: [],
      },
      {
        t: "fad fa-inbox",
        sT: [],
      },
      {
        t: "fas fa-inbox-in",
        sT: [],
      },
      {
        t: "far fa-inbox-in",
        sT: [],
      },
      {
        t: "fal fa-inbox-in",
        sT: [],
      },
      {
        t: "fad fa-inbox-in",
        sT: [],
      },
      {
        t: "fas fa-inbox-out",
        sT: [],
      },
      {
        t: "far fa-inbox-out",
        sT: [],
      },
      {
        t: "fal fa-inbox-out",
        sT: [],
      },
      {
        t: "fad fa-inbox-out",
        sT: [],
      },
      {
        t: "fas fa-indent",
        sT: [],
      },
      {
        t: "far fa-indent",
        sT: [],
      },
      {
        t: "fal fa-indent",
        sT: [],
      },
      {
        t: "fad fa-indent",
        sT: [],
      },
      {
        t: "fas fa-industry",
        sT: [],
      },
      {
        t: "far fa-industry",
        sT: [],
      },
      {
        t: "fal fa-industry",
        sT: [],
      },
      {
        t: "fad fa-industry",
        sT: [],
      },
      {
        t: "fas fa-industry-alt",
        sT: [],
      },
      {
        t: "far fa-industry-alt",
        sT: [],
      },
      {
        t: "fal fa-industry-alt",
        sT: [],
      },
      {
        t: "fad fa-industry-alt",
        sT: [],
      },
      {
        t: "fas fa-infinity",
        sT: [],
      },
      {
        t: "far fa-infinity",
        sT: [],
      },
      {
        t: "fal fa-infinity",
        sT: [],
      },
      {
        t: "fad fa-infinity",
        sT: [],
      },
      {
        t: "fas fa-info",
        sT: [],
      },
      {
        t: "far fa-info",
        sT: [],
      },
      {
        t: "fal fa-info",
        sT: [],
      },
      {
        t: "fad fa-info",
        sT: [],
      },
      {
        t: "fas fa-info-circle",
        sT: [],
      },
      {
        t: "far fa-info-circle",
        sT: [],
      },
      {
        t: "fal fa-info-circle",
        sT: [],
      },
      {
        t: "fad fa-info-circle",
        sT: [],
      },
      {
        t: "fas fa-info-square",
        sT: [],
      },
      {
        t: "far fa-info-square",
        sT: [],
      },
      {
        t: "fal fa-info-square",
        sT: [],
      },
      {
        t: "fad fa-info-square",
        sT: [],
      },
      {
        t: "fas fa-inhaler",
        sT: [],
      },
      {
        t: "far fa-inhaler",
        sT: [],
      },
      {
        t: "fal fa-inhaler",
        sT: [],
      },
      {
        t: "fad fa-inhaler",
        sT: [],
      },
      {
        t: "fab fa-innosoft",
        sT: [],
      },
      {
        t: "fab fa-instagram",
        sT: [],
      },
      {
        t: "fab fa-instagram-square",
        sT: [],
      },
      {
        t: "fab fa-instalod",
        sT: [],
      },
      {
        t: "fas fa-integral",
        sT: [],
      },
      {
        t: "far fa-integral",
        sT: [],
      },
      {
        t: "fal fa-integral",
        sT: [],
      },
      {
        t: "fad fa-integral",
        sT: [],
      },
      {
        t: "fab fa-intercom",
        sT: [],
      },
      {
        t: "fab fa-internet-explorer",
        sT: [],
      },
      {
        t: "fas fa-intersection",
        sT: [],
      },
      {
        t: "far fa-intersection",
        sT: [],
      },
      {
        t: "fal fa-intersection",
        sT: [],
      },
      {
        t: "fad fa-intersection",
        sT: [],
      },
      {
        t: "fas fa-inventory",
        sT: [],
      },
      {
        t: "far fa-inventory",
        sT: [],
      },
      {
        t: "fal fa-inventory",
        sT: [],
      },
      {
        t: "fad fa-inventory",
        sT: [],
      },
      {
        t: "fab fa-invision",
        sT: [],
      },
      {
        t: "fab fa-ioxhost",
        sT: [],
      },
      {
        t: "fas fa-island-tropical",
        sT: [],
      },
      {
        t: "far fa-island-tropical",
        sT: [],
      },
      {
        t: "fal fa-island-tropical",
        sT: [],
      },
      {
        t: "fad fa-island-tropical",
        sT: [],
      },
      {
        t: "fas fa-italic",
        sT: [],
      },
      {
        t: "far fa-italic",
        sT: [],
      },
      {
        t: "fal fa-italic",
        sT: [],
      },
      {
        t: "fad fa-italic",
        sT: [],
      },
      {
        t: "fab fa-itch-io",
        sT: [],
      },
      {
        t: "fab fa-itunes",
        sT: [],
      },
      {
        t: "fab fa-itunes-note",
        sT: [],
      },
      {
        t: "fas fa-jack-o-lantern",
        sT: [],
      },
      {
        t: "far fa-jack-o-lantern",
        sT: [],
      },
      {
        t: "fal fa-jack-o-lantern",
        sT: [],
      },
      {
        t: "fad fa-jack-o-lantern",
        sT: [],
      },
      {
        t: "fab fa-java",
        sT: [],
      },
      {
        t: "fas fa-jedi",
        sT: [],
      },
      {
        t: "far fa-jedi",
        sT: [],
      },
      {
        t: "fal fa-jedi",
        sT: [],
      },
      {
        t: "fad fa-jedi",
        sT: [],
      },
      {
        t: "fab fa-jedi-order",
        sT: [],
      },
      {
        t: "fab fa-jenkins",
        sT: [],
      },
      {
        t: "fab fa-jira",
        sT: [],
      },
      {
        t: "fab fa-joget",
        sT: [],
      },
      {
        t: "fas fa-joint",
        sT: [],
      },
      {
        t: "far fa-joint",
        sT: [],
      },
      {
        t: "fal fa-joint",
        sT: [],
      },
      {
        t: "fad fa-joint",
        sT: [],
      },
      {
        t: "fab fa-joomla",
        sT: [],
      },
      {
        t: "fas fa-journal-whills",
        sT: [],
      },
      {
        t: "far fa-journal-whills",
        sT: [],
      },
      {
        t: "fal fa-journal-whills",
        sT: [],
      },
      {
        t: "fad fa-journal-whills",
        sT: [],
      },
      {
        t: "fas fa-joystick",
        sT: [],
      },
      {
        t: "far fa-joystick",
        sT: [],
      },
      {
        t: "fal fa-joystick",
        sT: [],
      },
      {
        t: "fad fa-joystick",
        sT: [],
      },
      {
        t: "fab fa-js",
        sT: [],
      },
      {
        t: "fab fa-js-square",
        sT: [],
      },
      {
        t: "fab fa-jsfiddle",
        sT: [],
      },
      {
        t: "fal fa-jug",
        sT: [],
      },
      {
        t: "far fa-jug",
        sT: [],
      },
      {
        t: "fas fa-jug",
        sT: [],
      },
      {
        t: "fad fa-jug",
        sT: [],
      },
      {
        t: "fas fa-kaaba",
        sT: [],
      },
      {
        t: "far fa-kaaba",
        sT: [],
      },
      {
        t: "fal fa-kaaba",
        sT: [],
      },
      {
        t: "fad fa-kaaba",
        sT: [],
      },
      {
        t: "fab fa-kaggle",
        sT: [],
      },
      {
        t: "fas fa-kazoo",
        sT: [],
      },
      {
        t: "far fa-kazoo",
        sT: [],
      },
      {
        t: "fal fa-kazoo",
        sT: [],
      },
      {
        t: "fad fa-kazoo",
        sT: [],
      },
      {
        t: "fas fa-kerning",
        sT: [],
      },
      {
        t: "far fa-kerning",
        sT: [],
      },
      {
        t: "fal fa-kerning",
        sT: [],
      },
      {
        t: "fad fa-kerning",
        sT: [],
      },
      {
        t: "fas fa-key",
        sT: [],
      },
      {
        t: "far fa-key",
        sT: [],
      },
      {
        t: "fal fa-key",
        sT: [],
      },
      {
        t: "fad fa-key",
        sT: [],
      },
      {
        t: "fas fa-key-skeleton",
        sT: [],
      },
      {
        t: "far fa-key-skeleton",
        sT: [],
      },
      {
        t: "fal fa-key-skeleton",
        sT: [],
      },
      {
        t: "fad fa-key-skeleton",
        sT: [],
      },
      {
        t: "fab fa-keybase",
        sT: [],
      },
      {
        t: "fas fa-keyboard",
        sT: [],
      },
      {
        t: "far fa-keyboard",
        sT: [],
      },
      {
        t: "fal fa-keyboard",
        sT: [],
      },
      {
        t: "fad fa-keyboard",
        sT: [],
      },
      {
        t: "fab fa-keycdn",
        sT: [],
      },
      {
        t: "fas fa-keynote",
        sT: [],
      },
      {
        t: "far fa-keynote",
        sT: [],
      },
      {
        t: "fal fa-keynote",
        sT: [],
      },
      {
        t: "fad fa-keynote",
        sT: [],
      },
      {
        t: "fas fa-khanda",
        sT: [],
      },
      {
        t: "far fa-khanda",
        sT: [],
      },
      {
        t: "fal fa-khanda",
        sT: [],
      },
      {
        t: "fad fa-khanda",
        sT: [],
      },
      {
        t: "fab fa-kickstarter",
        sT: [],
      },
      {
        t: "fab fa-kickstarter-k",
        sT: [],
      },
      {
        t: "fas fa-kidneys",
        sT: [],
      },
      {
        t: "far fa-kidneys",
        sT: [],
      },
      {
        t: "fal fa-kidneys",
        sT: [],
      },
      {
        t: "fad fa-kidneys",
        sT: [],
      },
      {
        t: "fas fa-kiss",
        sT: [],
      },
      {
        t: "far fa-kiss",
        sT: [],
      },
      {
        t: "fal fa-kiss",
        sT: [],
      },
      {
        t: "fad fa-kiss",
        sT: [],
      },
      {
        t: "fas fa-kiss-beam",
        sT: [],
      },
      {
        t: "far fa-kiss-beam",
        sT: [],
      },
      {
        t: "fal fa-kiss-beam",
        sT: [],
      },
      {
        t: "fad fa-kiss-beam",
        sT: [],
      },
      {
        t: "fas fa-kiss-wink-heart",
        sT: [],
      },
      {
        t: "far fa-kiss-wink-heart",
        sT: [],
      },
      {
        t: "fal fa-kiss-wink-heart",
        sT: [],
      },
      {
        t: "fad fa-kiss-wink-heart",
        sT: [],
      },
      {
        t: "fas fa-kite",
        sT: [],
      },
      {
        t: "far fa-kite",
        sT: [],
      },
      {
        t: "fal fa-kite",
        sT: [],
      },
      {
        t: "fad fa-kite",
        sT: [],
      },
      {
        t: "fas fa-kiwi-bird",
        sT: [],
      },
      {
        t: "far fa-kiwi-bird",
        sT: [],
      },
      {
        t: "fal fa-kiwi-bird",
        sT: [],
      },
      {
        t: "fad fa-kiwi-bird",
        sT: [],
      },
      {
        t: "fas fa-knife-kitchen",
        sT: [],
      },
      {
        t: "far fa-knife-kitchen",
        sT: [],
      },
      {
        t: "fal fa-knife-kitchen",
        sT: [],
      },
      {
        t: "fad fa-knife-kitchen",
        sT: [],
      },
      {
        t: "fab fa-korvue",
        sT: [],
      },
      {
        t: "fas fa-lambda",
        sT: [],
      },
      {
        t: "far fa-lambda",
        sT: [],
      },
      {
        t: "fal fa-lambda",
        sT: [],
      },
      {
        t: "fad fa-lambda",
        sT: [],
      },
      {
        t: "fas fa-lamp",
        sT: [],
      },
      {
        t: "far fa-lamp",
        sT: [],
      },
      {
        t: "fal fa-lamp",
        sT: [],
      },
      {
        t: "fad fa-lamp",
        sT: [],
      },
      {
        t: "fas fa-lamp-desk",
        sT: [],
      },
      {
        t: "far fa-lamp-desk",
        sT: [],
      },
      {
        t: "fal fa-lamp-desk",
        sT: [],
      },
      {
        t: "fad fa-lamp-desk",
        sT: [],
      },
      {
        t: "fas fa-lamp-floor",
        sT: [],
      },
      {
        t: "far fa-lamp-floor",
        sT: [],
      },
      {
        t: "fal fa-lamp-floor",
        sT: [],
      },
      {
        t: "fad fa-lamp-floor",
        sT: [],
      },
      {
        t: "fas fa-landmark",
        sT: [],
      },
      {
        t: "far fa-landmark",
        sT: [],
      },
      {
        t: "fal fa-landmark",
        sT: [],
      },
      {
        t: "fad fa-landmark",
        sT: [],
      },
      {
        t: "fas fa-landmark-alt",
        sT: [],
      },
      {
        t: "far fa-landmark-alt",
        sT: [],
      },
      {
        t: "fal fa-landmark-alt",
        sT: [],
      },
      {
        t: "fad fa-landmark-alt",
        sT: [],
      },
      {
        t: "fas fa-language",
        sT: [],
      },
      {
        t: "far fa-language",
        sT: [],
      },
      {
        t: "fal fa-language",
        sT: [],
      },
      {
        t: "fad fa-language",
        sT: [],
      },
      {
        t: "fas fa-laptop",
        sT: [],
      },
      {
        t: "far fa-laptop",
        sT: [],
      },
      {
        t: "fal fa-laptop",
        sT: [],
      },
      {
        t: "fad fa-laptop",
        sT: [],
      },
      {
        t: "fas fa-laptop-code",
        sT: [],
      },
      {
        t: "far fa-laptop-code",
        sT: [],
      },
      {
        t: "fal fa-laptop-code",
        sT: [],
      },
      {
        t: "fad fa-laptop-code",
        sT: [],
      },
      {
        t: "fal fa-laptop-house",
        sT: [],
      },
      {
        t: "far fa-laptop-house",
        sT: [],
      },
      {
        t: "fas fa-laptop-house",
        sT: [],
      },
      {
        t: "fad fa-laptop-house",
        sT: [],
      },
      {
        t: "fas fa-laptop-medical",
        sT: [],
      },
      {
        t: "far fa-laptop-medical",
        sT: [],
      },
      {
        t: "fal fa-laptop-medical",
        sT: [],
      },
      {
        t: "fad fa-laptop-medical",
        sT: [],
      },
      {
        t: "fab fa-laravel",
        sT: [],
      },
      {
        t: "fal fa-lasso",
        sT: [],
      },
      {
        t: "far fa-lasso",
        sT: [],
      },
      {
        t: "fas fa-lasso",
        sT: [],
      },
      {
        t: "fad fa-lasso",
        sT: [],
      },
      {
        t: "fab fa-lastfm",
        sT: [],
      },
      {
        t: "fab fa-lastfm-square",
        sT: [],
      },
      {
        t: "fas fa-laugh",
        sT: [],
      },
      {
        t: "far fa-laugh",
        sT: [],
      },
      {
        t: "fal fa-laugh",
        sT: [],
      },
      {
        t: "fad fa-laugh",
        sT: [],
      },
      {
        t: "fas fa-laugh-beam",
        sT: [],
      },
      {
        t: "far fa-laugh-beam",
        sT: [],
      },
      {
        t: "fal fa-laugh-beam",
        sT: [],
      },
      {
        t: "fad fa-laugh-beam",
        sT: [],
      },
      {
        t: "fas fa-laugh-squint",
        sT: [],
      },
      {
        t: "far fa-laugh-squint",
        sT: [],
      },
      {
        t: "fal fa-laugh-squint",
        sT: [],
      },
      {
        t: "fad fa-laugh-squint",
        sT: [],
      },
      {
        t: "fas fa-laugh-wink",
        sT: [],
      },
      {
        t: "far fa-laugh-wink",
        sT: [],
      },
      {
        t: "fal fa-laugh-wink",
        sT: [],
      },
      {
        t: "fad fa-laugh-wink",
        sT: [],
      },
      {
        t: "fas fa-layer-group",
        sT: [],
      },
      {
        t: "far fa-layer-group",
        sT: [],
      },
      {
        t: "fal fa-layer-group",
        sT: [],
      },
      {
        t: "fad fa-layer-group",
        sT: [],
      },
      {
        t: "fas fa-layer-minus",
        sT: [],
      },
      {
        t: "far fa-layer-minus",
        sT: [],
      },
      {
        t: "fal fa-layer-minus",
        sT: [],
      },
      {
        t: "fad fa-layer-minus",
        sT: [],
      },
      {
        t: "fas fa-layer-plus",
        sT: [],
      },
      {
        t: "far fa-layer-plus",
        sT: [],
      },
      {
        t: "fal fa-layer-plus",
        sT: [],
      },
      {
        t: "fad fa-layer-plus",
        sT: [],
      },
      {
        t: "fas fa-leaf",
        sT: [],
      },
      {
        t: "far fa-leaf",
        sT: [],
      },
      {
        t: "fal fa-leaf",
        sT: [],
      },
      {
        t: "fad fa-leaf",
        sT: [],
      },
      {
        t: "fas fa-leaf-heart",
        sT: [],
      },
      {
        t: "far fa-leaf-heart",
        sT: [],
      },
      {
        t: "fal fa-leaf-heart",
        sT: [],
      },
      {
        t: "fad fa-leaf-heart",
        sT: [],
      },
      {
        t: "fas fa-leaf-maple",
        sT: [],
      },
      {
        t: "far fa-leaf-maple",
        sT: [],
      },
      {
        t: "fal fa-leaf-maple",
        sT: [],
      },
      {
        t: "fad fa-leaf-maple",
        sT: [],
      },
      {
        t: "fas fa-leaf-oak",
        sT: [],
      },
      {
        t: "far fa-leaf-oak",
        sT: [],
      },
      {
        t: "fal fa-leaf-oak",
        sT: [],
      },
      {
        t: "fad fa-leaf-oak",
        sT: [],
      },
      {
        t: "fab fa-leanpub",
        sT: [],
      },
      {
        t: "fas fa-lemon",
        sT: [],
      },
      {
        t: "far fa-lemon",
        sT: [],
      },
      {
        t: "fal fa-lemon",
        sT: [],
      },
      {
        t: "fad fa-lemon",
        sT: [],
      },
      {
        t: "fab fa-less",
        sT: [],
      },
      {
        t: "fas fa-less-than",
        sT: [],
      },
      {
        t: "far fa-less-than",
        sT: [],
      },
      {
        t: "fal fa-less-than",
        sT: [],
      },
      {
        t: "fad fa-less-than",
        sT: [],
      },
      {
        t: "fas fa-less-than-equal",
        sT: [],
      },
      {
        t: "far fa-less-than-equal",
        sT: [],
      },
      {
        t: "fal fa-less-than-equal",
        sT: [],
      },
      {
        t: "fad fa-less-than-equal",
        sT: [],
      },
      {
        t: "fas fa-level-down",
        sT: [],
      },
      {
        t: "far fa-level-down",
        sT: [],
      },
      {
        t: "fal fa-level-down",
        sT: [],
      },
      {
        t: "fad fa-level-down",
        sT: [],
      },
      {
        t: "fas fa-level-down-alt",
        sT: [],
      },
      {
        t: "far fa-level-down-alt",
        sT: [],
      },
      {
        t: "fal fa-level-down-alt",
        sT: [],
      },
      {
        t: "fad fa-level-down-alt",
        sT: [],
      },
      {
        t: "fas fa-level-up",
        sT: [],
      },
      {
        t: "far fa-level-up",
        sT: [],
      },
      {
        t: "fal fa-level-up",
        sT: [],
      },
      {
        t: "fad fa-level-up",
        sT: [],
      },
      {
        t: "fas fa-level-up-alt",
        sT: [],
      },
      {
        t: "far fa-level-up-alt",
        sT: [],
      },
      {
        t: "fal fa-level-up-alt",
        sT: [],
      },
      {
        t: "fad fa-level-up-alt",
        sT: [],
      },
      {
        t: "fas fa-life-ring",
        sT: [],
      },
      {
        t: "far fa-life-ring",
        sT: [],
      },
      {
        t: "fal fa-life-ring",
        sT: [],
      },
      {
        t: "fad fa-life-ring",
        sT: [],
      },
      {
        t: "fas fa-light-ceiling",
        sT: [],
      },
      {
        t: "far fa-light-ceiling",
        sT: [],
      },
      {
        t: "fal fa-light-ceiling",
        sT: [],
      },
      {
        t: "fad fa-light-ceiling",
        sT: [],
      },
      {
        t: "fas fa-light-switch",
        sT: [],
      },
      {
        t: "far fa-light-switch",
        sT: [],
      },
      {
        t: "fal fa-light-switch",
        sT: [],
      },
      {
        t: "fad fa-light-switch",
        sT: [],
      },
      {
        t: "fas fa-light-switch-off",
        sT: [],
      },
      {
        t: "far fa-light-switch-off",
        sT: [],
      },
      {
        t: "fal fa-light-switch-off",
        sT: [],
      },
      {
        t: "fad fa-light-switch-off",
        sT: [],
      },
      {
        t: "fas fa-light-switch-on",
        sT: [],
      },
      {
        t: "far fa-light-switch-on",
        sT: [],
      },
      {
        t: "fal fa-light-switch-on",
        sT: [],
      },
      {
        t: "fad fa-light-switch-on",
        sT: [],
      },
      {
        t: "fas fa-lightbulb",
        sT: [],
      },
      {
        t: "far fa-lightbulb",
        sT: [],
      },
      {
        t: "fal fa-lightbulb",
        sT: [],
      },
      {
        t: "fad fa-lightbulb",
        sT: [],
      },
      {
        t: "fas fa-lightbulb-dollar",
        sT: [],
      },
      {
        t: "far fa-lightbulb-dollar",
        sT: [],
      },
      {
        t: "fal fa-lightbulb-dollar",
        sT: [],
      },
      {
        t: "fad fa-lightbulb-dollar",
        sT: [],
      },
      {
        t: "fas fa-lightbulb-exclamation",
        sT: [],
      },
      {
        t: "far fa-lightbulb-exclamation",
        sT: [],
      },
      {
        t: "fal fa-lightbulb-exclamation",
        sT: [],
      },
      {
        t: "fad fa-lightbulb-exclamation",
        sT: [],
      },
      {
        t: "fas fa-lightbulb-on",
        sT: [],
      },
      {
        t: "far fa-lightbulb-on",
        sT: [],
      },
      {
        t: "fal fa-lightbulb-on",
        sT: [],
      },
      {
        t: "fad fa-lightbulb-on",
        sT: [],
      },
      {
        t: "fas fa-lightbulb-slash",
        sT: [],
      },
      {
        t: "far fa-lightbulb-slash",
        sT: [],
      },
      {
        t: "fal fa-lightbulb-slash",
        sT: [],
      },
      {
        t: "fad fa-lightbulb-slash",
        sT: [],
      },
      {
        t: "fas fa-lights-holiday",
        sT: [],
      },
      {
        t: "far fa-lights-holiday",
        sT: [],
      },
      {
        t: "fal fa-lights-holiday",
        sT: [],
      },
      {
        t: "fad fa-lights-holiday",
        sT: [],
      },
      {
        t: "fab fa-line",
        sT: [],
      },
      {
        t: "fas fa-line-columns",
        sT: [],
      },
      {
        t: "far fa-line-columns",
        sT: [],
      },
      {
        t: "fal fa-line-columns",
        sT: [],
      },
      {
        t: "fad fa-line-columns",
        sT: [],
      },
      {
        t: "fas fa-line-height",
        sT: [],
      },
      {
        t: "far fa-line-height",
        sT: [],
      },
      {
        t: "fal fa-line-height",
        sT: [],
      },
      {
        t: "fad fa-line-height",
        sT: [],
      },
      {
        t: "fas fa-link",
        sT: [],
      },
      {
        t: "far fa-link",
        sT: [],
      },
      {
        t: "fal fa-link",
        sT: [],
      },
      {
        t: "fad fa-link",
        sT: [],
      },
      {
        t: "fab fa-linkedin",
        sT: [],
      },
      {
        t: "fab fa-linkedin-in",
        sT: [],
      },
      {
        t: "fab fa-linode",
        sT: [],
      },
      {
        t: "fab fa-linux",
        sT: [],
      },
      {
        t: "fas fa-lips",
        sT: [],
      },
      {
        t: "far fa-lips",
        sT: [],
      },
      {
        t: "fal fa-lips",
        sT: [],
      },
      {
        t: "fad fa-lips",
        sT: [],
      },
      {
        t: "fas fa-lira-sign",
        sT: [],
      },
      {
        t: "far fa-lira-sign",
        sT: [],
      },
      {
        t: "fal fa-lira-sign",
        sT: [],
      },
      {
        t: "fad fa-lira-sign",
        sT: [],
      },
      {
        t: "fas fa-list",
        sT: [],
      },
      {
        t: "far fa-list",
        sT: [],
      },
      {
        t: "fal fa-list",
        sT: [],
      },
      {
        t: "fad fa-list",
        sT: [],
      },
      {
        t: "fas fa-list-alt",
        sT: [],
      },
      {
        t: "far fa-list-alt",
        sT: [],
      },
      {
        t: "fal fa-list-alt",
        sT: [],
      },
      {
        t: "fad fa-list-alt",
        sT: [],
      },
      {
        t: "fas fa-list-music",
        sT: [],
      },
      {
        t: "far fa-list-music",
        sT: [],
      },
      {
        t: "fal fa-list-music",
        sT: [],
      },
      {
        t: "fad fa-list-music",
        sT: [],
      },
      {
        t: "fas fa-list-ol",
        sT: [],
      },
      {
        t: "far fa-list-ol",
        sT: [],
      },
      {
        t: "fal fa-list-ol",
        sT: [],
      },
      {
        t: "fad fa-list-ol",
        sT: [],
      },
      {
        t: "fas fa-list-ul",
        sT: [],
      },
      {
        t: "far fa-list-ul",
        sT: [],
      },
      {
        t: "fal fa-list-ul",
        sT: [],
      },
      {
        t: "fad fa-list-ul",
        sT: [],
      },
      {
        t: "fas fa-location",
        sT: [],
      },
      {
        t: "far fa-location",
        sT: [],
      },
      {
        t: "fal fa-location",
        sT: [],
      },
      {
        t: "fad fa-location",
        sT: [],
      },
      {
        t: "fas fa-location-arrow",
        sT: [],
      },
      {
        t: "far fa-location-arrow",
        sT: [],
      },
      {
        t: "fal fa-location-arrow",
        sT: [],
      },
      {
        t: "fad fa-location-arrow",
        sT: [],
      },
      {
        t: "fas fa-location-circle",
        sT: [],
      },
      {
        t: "far fa-location-circle",
        sT: [],
      },
      {
        t: "fal fa-location-circle",
        sT: [],
      },
      {
        t: "fad fa-location-circle",
        sT: [],
      },
      {
        t: "fas fa-location-slash",
        sT: [],
      },
      {
        t: "far fa-location-slash",
        sT: [],
      },
      {
        t: "fal fa-location-slash",
        sT: [],
      },
      {
        t: "fad fa-location-slash",
        sT: [],
      },
      {
        t: "fas fa-lock",
        sT: [],
      },
      {
        t: "far fa-lock",
        sT: [],
      },
      {
        t: "fal fa-lock",
        sT: [],
      },
      {
        t: "fad fa-lock",
        sT: [],
      },
      {
        t: "fas fa-lock-alt",
        sT: [],
      },
      {
        t: "far fa-lock-alt",
        sT: [],
      },
      {
        t: "fal fa-lock-alt",
        sT: [],
      },
      {
        t: "fad fa-lock-alt",
        sT: [],
      },
      {
        t: "fas fa-lock-open",
        sT: [],
      },
      {
        t: "far fa-lock-open",
        sT: [],
      },
      {
        t: "fal fa-lock-open",
        sT: [],
      },
      {
        t: "fad fa-lock-open",
        sT: [],
      },
      {
        t: "fas fa-lock-open-alt",
        sT: [],
      },
      {
        t: "far fa-lock-open-alt",
        sT: [],
      },
      {
        t: "fal fa-lock-open-alt",
        sT: [],
      },
      {
        t: "fad fa-lock-open-alt",
        sT: [],
      },
      {
        t: "fas fa-long-arrow-alt-down",
        sT: [],
      },
      {
        t: "far fa-long-arrow-alt-down",
        sT: [],
      },
      {
        t: "fal fa-long-arrow-alt-down",
        sT: [],
      },
      {
        t: "fad fa-long-arrow-alt-down",
        sT: [],
      },
      {
        t: "fas fa-long-arrow-alt-left",
        sT: [],
      },
      {
        t: "far fa-long-arrow-alt-left",
        sT: [],
      },
      {
        t: "fal fa-long-arrow-alt-left",
        sT: [],
      },
      {
        t: "fad fa-long-arrow-alt-left",
        sT: [],
      },
      {
        t: "fas fa-long-arrow-alt-right",
        sT: [],
      },
      {
        t: "far fa-long-arrow-alt-right",
        sT: [],
      },
      {
        t: "fal fa-long-arrow-alt-right",
        sT: [],
      },
      {
        t: "fad fa-long-arrow-alt-right",
        sT: [],
      },
      {
        t: "fas fa-long-arrow-alt-up",
        sT: [],
      },
      {
        t: "far fa-long-arrow-alt-up",
        sT: [],
      },
      {
        t: "fal fa-long-arrow-alt-up",
        sT: [],
      },
      {
        t: "fad fa-long-arrow-alt-up",
        sT: [],
      },
      {
        t: "fas fa-long-arrow-down",
        sT: [],
      },
      {
        t: "far fa-long-arrow-down",
        sT: [],
      },
      {
        t: "fal fa-long-arrow-down",
        sT: [],
      },
      {
        t: "fad fa-long-arrow-down",
        sT: [],
      },
      {
        t: "fas fa-long-arrow-left",
        sT: [],
      },
      {
        t: "far fa-long-arrow-left",
        sT: [],
      },
      {
        t: "fal fa-long-arrow-left",
        sT: [],
      },
      {
        t: "fad fa-long-arrow-left",
        sT: [],
      },
      {
        t: "fas fa-long-arrow-right",
        sT: [],
      },
      {
        t: "far fa-long-arrow-right",
        sT: [],
      },
      {
        t: "fal fa-long-arrow-right",
        sT: [],
      },
      {
        t: "fad fa-long-arrow-right",
        sT: [],
      },
      {
        t: "fas fa-long-arrow-up",
        sT: [],
      },
      {
        t: "far fa-long-arrow-up",
        sT: [],
      },
      {
        t: "fal fa-long-arrow-up",
        sT: [],
      },
      {
        t: "fad fa-long-arrow-up",
        sT: [],
      },
      {
        t: "fas fa-loveseat",
        sT: [],
      },
      {
        t: "far fa-loveseat",
        sT: [],
      },
      {
        t: "fal fa-loveseat",
        sT: [],
      },
      {
        t: "fad fa-loveseat",
        sT: [],
      },
      {
        t: "fas fa-low-vision",
        sT: [],
      },
      {
        t: "far fa-low-vision",
        sT: [],
      },
      {
        t: "fal fa-low-vision",
        sT: [],
      },
      {
        t: "fad fa-low-vision",
        sT: [],
      },
      {
        t: "fas fa-luchador",
        sT: [],
      },
      {
        t: "far fa-luchador",
        sT: [],
      },
      {
        t: "fal fa-luchador",
        sT: [],
      },
      {
        t: "fad fa-luchador",
        sT: [],
      },
      {
        t: "fas fa-luggage-cart",
        sT: [],
      },
      {
        t: "far fa-luggage-cart",
        sT: [],
      },
      {
        t: "fal fa-luggage-cart",
        sT: [],
      },
      {
        t: "fad fa-luggage-cart",
        sT: [],
      },
      {
        t: "fas fa-lungs",
        sT: [],
      },
      {
        t: "far fa-lungs",
        sT: [],
      },
      {
        t: "fal fa-lungs",
        sT: [],
      },
      {
        t: "fad fa-lungs",
        sT: [],
      },
      {
        t: "fal fa-lungs-virus",
        sT: [],
      },
      {
        t: "far fa-lungs-virus",
        sT: [],
      },
      {
        t: "fas fa-lungs-virus",
        sT: [],
      },
      {
        t: "fad fa-lungs-virus",
        sT: [],
      },
      {
        t: "fab fa-lyft",
        sT: [],
      },
      {
        t: "fas fa-mace",
        sT: [],
      },
      {
        t: "far fa-mace",
        sT: [],
      },
      {
        t: "fal fa-mace",
        sT: [],
      },
      {
        t: "fad fa-mace",
        sT: [],
      },
      {
        t: "fab fa-magento",
        sT: [],
      },
      {
        t: "fas fa-magic",
        sT: [],
      },
      {
        t: "far fa-magic",
        sT: [],
      },
      {
        t: "fal fa-magic",
        sT: [],
      },
      {
        t: "fad fa-magic",
        sT: [],
      },
      {
        t: "fas fa-magnet",
        sT: [],
      },
      {
        t: "far fa-magnet",
        sT: [],
      },
      {
        t: "fal fa-magnet",
        sT: [],
      },
      {
        t: "fad fa-magnet",
        sT: [],
      },
      {
        t: "fas fa-mail-bulk",
        sT: [],
      },
      {
        t: "far fa-mail-bulk",
        sT: [],
      },
      {
        t: "fal fa-mail-bulk",
        sT: [],
      },
      {
        t: "fad fa-mail-bulk",
        sT: [],
      },
      {
        t: "fas fa-mailbox",
        sT: [],
      },
      {
        t: "far fa-mailbox",
        sT: [],
      },
      {
        t: "fal fa-mailbox",
        sT: [],
      },
      {
        t: "fad fa-mailbox",
        sT: [],
      },
      {
        t: "fab fa-mailchimp",
        sT: [],
      },
      {
        t: "fas fa-male",
        sT: [],
      },
      {
        t: "far fa-male",
        sT: [],
      },
      {
        t: "fal fa-male",
        sT: [],
      },
      {
        t: "fad fa-male",
        sT: [],
      },
      {
        t: "fab fa-mandalorian",
        sT: [],
      },
      {
        t: "fas fa-mandolin",
        sT: [],
      },
      {
        t: "far fa-mandolin",
        sT: [],
      },
      {
        t: "fal fa-mandolin",
        sT: [],
      },
      {
        t: "fad fa-mandolin",
        sT: [],
      },
      {
        t: "fas fa-map",
        sT: [],
      },
      {
        t: "far fa-map",
        sT: [],
      },
      {
        t: "fal fa-map",
        sT: [],
      },
      {
        t: "fad fa-map",
        sT: [],
      },
      {
        t: "fas fa-map-marked",
        sT: [],
      },
      {
        t: "far fa-map-marked",
        sT: [],
      },
      {
        t: "fal fa-map-marked",
        sT: [],
      },
      {
        t: "fad fa-map-marked",
        sT: [],
      },
      {
        t: "fas fa-map-marked-alt",
        sT: [],
      },
      {
        t: "far fa-map-marked-alt",
        sT: [],
      },
      {
        t: "fal fa-map-marked-alt",
        sT: [],
      },
      {
        t: "fad fa-map-marked-alt",
        sT: [],
      },
      {
        t: "fas fa-map-marker",
        sT: [],
      },
      {
        t: "far fa-map-marker",
        sT: [],
      },
      {
        t: "fal fa-map-marker",
        sT: [],
      },
      {
        t: "fad fa-map-marker",
        sT: [],
      },
      {
        t: "fas fa-map-marker-alt",
        sT: [],
      },
      {
        t: "far fa-map-marker-alt",
        sT: [],
      },
      {
        t: "fal fa-map-marker-alt",
        sT: [],
      },
      {
        t: "fad fa-map-marker-alt",
        sT: [],
      },
      {
        t: "fas fa-map-marker-alt-slash",
        sT: [],
      },
      {
        t: "far fa-map-marker-alt-slash",
        sT: [],
      },
      {
        t: "fal fa-map-marker-alt-slash",
        sT: [],
      },
      {
        t: "fad fa-map-marker-alt-slash",
        sT: [],
      },
      {
        t: "fas fa-map-marker-check",
        sT: [],
      },
      {
        t: "far fa-map-marker-check",
        sT: [],
      },
      {
        t: "fal fa-map-marker-check",
        sT: [],
      },
      {
        t: "fad fa-map-marker-check",
        sT: [],
      },
      {
        t: "fas fa-map-marker-edit",
        sT: [],
      },
      {
        t: "far fa-map-marker-edit",
        sT: [],
      },
      {
        t: "fal fa-map-marker-edit",
        sT: [],
      },
      {
        t: "fad fa-map-marker-edit",
        sT: [],
      },
      {
        t: "fas fa-map-marker-exclamation",
        sT: [],
      },
      {
        t: "far fa-map-marker-exclamation",
        sT: [],
      },
      {
        t: "fal fa-map-marker-exclamation",
        sT: [],
      },
      {
        t: "fad fa-map-marker-exclamation",
        sT: [],
      },
      {
        t: "fas fa-map-marker-minus",
        sT: [],
      },
      {
        t: "far fa-map-marker-minus",
        sT: [],
      },
      {
        t: "fal fa-map-marker-minus",
        sT: [],
      },
      {
        t: "fad fa-map-marker-minus",
        sT: [],
      },
      {
        t: "fas fa-map-marker-plus",
        sT: [],
      },
      {
        t: "far fa-map-marker-plus",
        sT: [],
      },
      {
        t: "fal fa-map-marker-plus",
        sT: [],
      },
      {
        t: "fad fa-map-marker-plus",
        sT: [],
      },
      {
        t: "fas fa-map-marker-question",
        sT: [],
      },
      {
        t: "far fa-map-marker-question",
        sT: [],
      },
      {
        t: "fal fa-map-marker-question",
        sT: [],
      },
      {
        t: "fad fa-map-marker-question",
        sT: [],
      },
      {
        t: "fas fa-map-marker-slash",
        sT: [],
      },
      {
        t: "far fa-map-marker-slash",
        sT: [],
      },
      {
        t: "fal fa-map-marker-slash",
        sT: [],
      },
      {
        t: "fad fa-map-marker-slash",
        sT: [],
      },
      {
        t: "fas fa-map-marker-smile",
        sT: [],
      },
      {
        t: "far fa-map-marker-smile",
        sT: [],
      },
      {
        t: "fal fa-map-marker-smile",
        sT: [],
      },
      {
        t: "fad fa-map-marker-smile",
        sT: [],
      },
      {
        t: "fas fa-map-marker-times",
        sT: [],
      },
      {
        t: "far fa-map-marker-times",
        sT: [],
      },
      {
        t: "fal fa-map-marker-times",
        sT: [],
      },
      {
        t: "fad fa-map-marker-times",
        sT: [],
      },
      {
        t: "fas fa-map-pin",
        sT: [],
      },
      {
        t: "far fa-map-pin",
        sT: [],
      },
      {
        t: "fal fa-map-pin",
        sT: [],
      },
      {
        t: "fad fa-map-pin",
        sT: [],
      },
      {
        t: "fas fa-map-signs",
        sT: [],
      },
      {
        t: "far fa-map-signs",
        sT: [],
      },
      {
        t: "fal fa-map-signs",
        sT: [],
      },
      {
        t: "fad fa-map-signs",
        sT: [],
      },
      {
        t: "fab fa-markdown",
        sT: [],
      },
      {
        t: "fas fa-marker",
        sT: [],
      },
      {
        t: "far fa-marker",
        sT: [],
      },
      {
        t: "fal fa-marker",
        sT: [],
      },
      {
        t: "fad fa-marker",
        sT: [],
      },
      {
        t: "fas fa-mars",
        sT: [],
      },
      {
        t: "far fa-mars",
        sT: [],
      },
      {
        t: "fal fa-mars",
        sT: [],
      },
      {
        t: "fad fa-mars",
        sT: [],
      },
      {
        t: "fas fa-mars-double",
        sT: [],
      },
      {
        t: "far fa-mars-double",
        sT: [],
      },
      {
        t: "fal fa-mars-double",
        sT: [],
      },
      {
        t: "fad fa-mars-double",
        sT: [],
      },
      {
        t: "fas fa-mars-stroke",
        sT: [],
      },
      {
        t: "far fa-mars-stroke",
        sT: [],
      },
      {
        t: "fal fa-mars-stroke",
        sT: [],
      },
      {
        t: "fad fa-mars-stroke",
        sT: [],
      },
      {
        t: "fas fa-mars-stroke-h",
        sT: [],
      },
      {
        t: "far fa-mars-stroke-h",
        sT: [],
      },
      {
        t: "fal fa-mars-stroke-h",
        sT: [],
      },
      {
        t: "fad fa-mars-stroke-h",
        sT: [],
      },
      {
        t: "fas fa-mars-stroke-v",
        sT: [],
      },
      {
        t: "far fa-mars-stroke-v",
        sT: [],
      },
      {
        t: "fal fa-mars-stroke-v",
        sT: [],
      },
      {
        t: "fad fa-mars-stroke-v",
        sT: [],
      },
      {
        t: "fas fa-mask",
        sT: [],
      },
      {
        t: "far fa-mask",
        sT: [],
      },
      {
        t: "fal fa-mask",
        sT: [],
      },
      {
        t: "fad fa-mask",
        sT: [],
      },
      {
        t: "fab fa-mastodon",
        sT: [],
      },
      {
        t: "fab fa-maxcdn",
        sT: [],
      },
      {
        t: "fab fa-mdb",
        sT: [],
      },
      {
        t: "fas fa-meat",
        sT: [],
      },
      {
        t: "far fa-meat",
        sT: [],
      },
      {
        t: "fal fa-meat",
        sT: [],
      },
      {
        t: "fad fa-meat",
        sT: [],
      },
      {
        t: "fas fa-medal",
        sT: [],
      },
      {
        t: "far fa-medal",
        sT: [],
      },
      {
        t: "fal fa-medal",
        sT: [],
      },
      {
        t: "fad fa-medal",
        sT: [],
      },
      {
        t: "fab fa-medapps",
        sT: [],
      },
      {
        t: "fab fa-medium",
        sT: [],
      },
      {
        t: "fab fa-medium-m",
        sT: [],
      },
      {
        t: "fas fa-medkit",
        sT: [],
      },
      {
        t: "far fa-medkit",
        sT: [],
      },
      {
        t: "fal fa-medkit",
        sT: [],
      },
      {
        t: "fad fa-medkit",
        sT: [],
      },
      {
        t: "fab fa-medrt",
        sT: [],
      },
      {
        t: "fab fa-meetup",
        sT: [],
      },
      {
        t: "fas fa-megaphone",
        sT: [],
      },
      {
        t: "far fa-megaphone",
        sT: [],
      },
      {
        t: "fal fa-megaphone",
        sT: [],
      },
      {
        t: "fad fa-megaphone",
        sT: [],
      },
      {
        t: "fab fa-megaport",
        sT: [],
      },
      {
        t: "fas fa-meh",
        sT: [],
      },
      {
        t: "far fa-meh",
        sT: [],
      },
      {
        t: "fal fa-meh",
        sT: [],
      },
      {
        t: "fad fa-meh",
        sT: [],
      },
      {
        t: "fas fa-meh-blank",
        sT: [],
      },
      {
        t: "far fa-meh-blank",
        sT: [],
      },
      {
        t: "fal fa-meh-blank",
        sT: [],
      },
      {
        t: "fad fa-meh-blank",
        sT: [],
      },
      {
        t: "fas fa-meh-rolling-eyes",
        sT: [],
      },
      {
        t: "far fa-meh-rolling-eyes",
        sT: [],
      },
      {
        t: "fal fa-meh-rolling-eyes",
        sT: [],
      },
      {
        t: "fad fa-meh-rolling-eyes",
        sT: [],
      },
      {
        t: "fas fa-memory",
        sT: [],
      },
      {
        t: "far fa-memory",
        sT: [],
      },
      {
        t: "fal fa-memory",
        sT: [],
      },
      {
        t: "fad fa-memory",
        sT: [],
      },
      {
        t: "fab fa-mendeley",
        sT: [],
      },
      {
        t: "fas fa-menorah",
        sT: [],
      },
      {
        t: "far fa-menorah",
        sT: [],
      },
      {
        t: "fal fa-menorah",
        sT: [],
      },
      {
        t: "fad fa-menorah",
        sT: [],
      },
      {
        t: "fas fa-mercury",
        sT: [],
      },
      {
        t: "far fa-mercury",
        sT: [],
      },
      {
        t: "fal fa-mercury",
        sT: [],
      },
      {
        t: "fad fa-mercury",
        sT: [],
      },
      {
        t: "fas fa-meteor",
        sT: [],
      },
      {
        t: "far fa-meteor",
        sT: [],
      },
      {
        t: "fal fa-meteor",
        sT: [],
      },
      {
        t: "fad fa-meteor",
        sT: [],
      },
      {
        t: "fab fa-microblog",
        sT: [],
      },
      {
        t: "fas fa-microchip",
        sT: [],
      },
      {
        t: "far fa-microchip",
        sT: [],
      },
      {
        t: "fal fa-microchip",
        sT: [],
      },
      {
        t: "fad fa-microchip",
        sT: [],
      },
      {
        t: "fas fa-microphone",
        sT: [],
      },
      {
        t: "far fa-microphone",
        sT: [],
      },
      {
        t: "fal fa-microphone",
        sT: [],
      },
      {
        t: "fad fa-microphone",
        sT: [],
      },
      {
        t: "fas fa-microphone-alt",
        sT: [],
      },
      {
        t: "far fa-microphone-alt",
        sT: [],
      },
      {
        t: "fal fa-microphone-alt",
        sT: [],
      },
      {
        t: "fad fa-microphone-alt",
        sT: [],
      },
      {
        t: "fas fa-microphone-alt-slash",
        sT: [],
      },
      {
        t: "far fa-microphone-alt-slash",
        sT: [],
      },
      {
        t: "fal fa-microphone-alt-slash",
        sT: [],
      },
      {
        t: "fad fa-microphone-alt-slash",
        sT: [],
      },
      {
        t: "fas fa-microphone-slash",
        sT: [],
      },
      {
        t: "far fa-microphone-slash",
        sT: [],
      },
      {
        t: "fal fa-microphone-slash",
        sT: [],
      },
      {
        t: "fad fa-microphone-slash",
        sT: [],
      },
      {
        t: "fas fa-microphone-stand",
        sT: [],
      },
      {
        t: "far fa-microphone-stand",
        sT: [],
      },
      {
        t: "fal fa-microphone-stand",
        sT: [],
      },
      {
        t: "fad fa-microphone-stand",
        sT: [],
      },
      {
        t: "fas fa-microscope",
        sT: [],
      },
      {
        t: "far fa-microscope",
        sT: [],
      },
      {
        t: "fal fa-microscope",
        sT: [],
      },
      {
        t: "fad fa-microscope",
        sT: [],
      },
      {
        t: "fab fa-microsoft",
        sT: [],
      },
      {
        t: "fas fa-microwave",
        sT: [],
      },
      {
        t: "far fa-microwave",
        sT: [],
      },
      {
        t: "fal fa-microwave",
        sT: [],
      },
      {
        t: "fad fa-microwave",
        sT: [],
      },
      {
        t: "fas fa-mind-share",
        sT: [],
      },
      {
        t: "far fa-mind-share",
        sT: [],
      },
      {
        t: "fal fa-mind-share",
        sT: [],
      },
      {
        t: "fad fa-mind-share",
        sT: [],
      },
      {
        t: "fas fa-minus",
        sT: [],
      },
      {
        t: "far fa-minus",
        sT: [],
      },
      {
        t: "fal fa-minus",
        sT: [],
      },
      {
        t: "fad fa-minus",
        sT: [],
      },
      {
        t: "fas fa-minus-circle",
        sT: [],
      },
      {
        t: "far fa-minus-circle",
        sT: [],
      },
      {
        t: "fal fa-minus-circle",
        sT: [],
      },
      {
        t: "fad fa-minus-circle",
        sT: [],
      },
      {
        t: "fas fa-minus-hexagon",
        sT: [],
      },
      {
        t: "far fa-minus-hexagon",
        sT: [],
      },
      {
        t: "fal fa-minus-hexagon",
        sT: [],
      },
      {
        t: "fad fa-minus-hexagon",
        sT: [],
      },
      {
        t: "fas fa-minus-octagon",
        sT: [],
      },
      {
        t: "far fa-minus-octagon",
        sT: [],
      },
      {
        t: "fal fa-minus-octagon",
        sT: [],
      },
      {
        t: "fad fa-minus-octagon",
        sT: [],
      },
      {
        t: "fas fa-minus-square",
        sT: [],
      },
      {
        t: "far fa-minus-square",
        sT: [],
      },
      {
        t: "fal fa-minus-square",
        sT: [],
      },
      {
        t: "fad fa-minus-square",
        sT: [],
      },
      {
        t: "fas fa-mistletoe",
        sT: [],
      },
      {
        t: "far fa-mistletoe",
        sT: [],
      },
      {
        t: "fal fa-mistletoe",
        sT: [],
      },
      {
        t: "fad fa-mistletoe",
        sT: [],
      },
      {
        t: "fas fa-mitten",
        sT: [],
      },
      {
        t: "far fa-mitten",
        sT: [],
      },
      {
        t: "fal fa-mitten",
        sT: [],
      },
      {
        t: "fad fa-mitten",
        sT: [],
      },
      {
        t: "fab fa-mix",
        sT: [],
      },
      {
        t: "fab fa-mixcloud",
        sT: [],
      },
      {
        t: "fab fa-mixer",
        sT: [],
      },
      {
        t: "fab fa-mizuni",
        sT: [],
      },
      {
        t: "fas fa-mobile",
        sT: [],
      },
      {
        t: "far fa-mobile",
        sT: [],
      },
      {
        t: "fal fa-mobile",
        sT: [],
      },
      {
        t: "fad fa-mobile",
        sT: [],
      },
      {
        t: "fas fa-mobile-alt",
        sT: [],
      },
      {
        t: "far fa-mobile-alt",
        sT: [],
      },
      {
        t: "fal fa-mobile-alt",
        sT: [],
      },
      {
        t: "fad fa-mobile-alt",
        sT: [],
      },
      {
        t: "fas fa-mobile-android",
        sT: [],
      },
      {
        t: "far fa-mobile-android",
        sT: [],
      },
      {
        t: "fal fa-mobile-android",
        sT: [],
      },
      {
        t: "fad fa-mobile-android",
        sT: [],
      },
      {
        t: "fas fa-mobile-android-alt",
        sT: [],
      },
      {
        t: "far fa-mobile-android-alt",
        sT: [],
      },
      {
        t: "fal fa-mobile-android-alt",
        sT: [],
      },
      {
        t: "fad fa-mobile-android-alt",
        sT: [],
      },
      {
        t: "fab fa-modx",
        sT: [],
      },
      {
        t: "fab fa-monero",
        sT: [],
      },
      {
        t: "fas fa-money-bill",
        sT: [],
      },
      {
        t: "far fa-money-bill",
        sT: [],
      },
      {
        t: "fal fa-money-bill",
        sT: [],
      },
      {
        t: "fad fa-money-bill",
        sT: [],
      },
      {
        t: "fas fa-money-bill-alt",
        sT: [],
      },
      {
        t: "far fa-money-bill-alt",
        sT: [],
      },
      {
        t: "fal fa-money-bill-alt",
        sT: [],
      },
      {
        t: "fad fa-money-bill-alt",
        sT: [],
      },
      {
        t: "fas fa-money-bill-wave",
        sT: [],
      },
      {
        t: "far fa-money-bill-wave",
        sT: [],
      },
      {
        t: "fal fa-money-bill-wave",
        sT: [],
      },
      {
        t: "fad fa-money-bill-wave",
        sT: [],
      },
      {
        t: "fas fa-money-bill-wave-alt",
        sT: [],
      },
      {
        t: "far fa-money-bill-wave-alt",
        sT: [],
      },
      {
        t: "fal fa-money-bill-wave-alt",
        sT: [],
      },
      {
        t: "fad fa-money-bill-wave-alt",
        sT: [],
      },
      {
        t: "fas fa-money-check",
        sT: [],
      },
      {
        t: "far fa-money-check",
        sT: [],
      },
      {
        t: "fal fa-money-check",
        sT: [],
      },
      {
        t: "fad fa-money-check",
        sT: [],
      },
      {
        t: "fas fa-money-check-alt",
        sT: [],
      },
      {
        t: "far fa-money-check-alt",
        sT: [],
      },
      {
        t: "fal fa-money-check-alt",
        sT: [],
      },
      {
        t: "fad fa-money-check-alt",
        sT: [],
      },
      {
        t: "fas fa-money-check-edit",
        sT: [],
      },
      {
        t: "far fa-money-check-edit",
        sT: [],
      },
      {
        t: "fal fa-money-check-edit",
        sT: [],
      },
      {
        t: "fad fa-money-check-edit",
        sT: [],
      },
      {
        t: "fas fa-money-check-edit-alt",
        sT: [],
      },
      {
        t: "far fa-money-check-edit-alt",
        sT: [],
      },
      {
        t: "fal fa-money-check-edit-alt",
        sT: [],
      },
      {
        t: "fad fa-money-check-edit-alt",
        sT: [],
      },
      {
        t: "fas fa-monitor-heart-rate",
        sT: [],
      },
      {
        t: "far fa-monitor-heart-rate",
        sT: [],
      },
      {
        t: "fal fa-monitor-heart-rate",
        sT: [],
      },
      {
        t: "fad fa-monitor-heart-rate",
        sT: [],
      },
      {
        t: "fas fa-monkey",
        sT: [],
      },
      {
        t: "far fa-monkey",
        sT: [],
      },
      {
        t: "fal fa-monkey",
        sT: [],
      },
      {
        t: "fad fa-monkey",
        sT: [],
      },
      {
        t: "fas fa-monument",
        sT: [],
      },
      {
        t: "far fa-monument",
        sT: [],
      },
      {
        t: "fal fa-monument",
        sT: [],
      },
      {
        t: "fad fa-monument",
        sT: [],
      },
      {
        t: "fas fa-moon",
        sT: [],
      },
      {
        t: "far fa-moon",
        sT: [],
      },
      {
        t: "fal fa-moon",
        sT: [],
      },
      {
        t: "fad fa-moon",
        sT: [],
      },
      {
        t: "fas fa-moon-cloud",
        sT: [],
      },
      {
        t: "far fa-moon-cloud",
        sT: [],
      },
      {
        t: "fal fa-moon-cloud",
        sT: [],
      },
      {
        t: "fad fa-moon-cloud",
        sT: [],
      },
      {
        t: "fas fa-moon-stars",
        sT: [],
      },
      {
        t: "far fa-moon-stars",
        sT: [],
      },
      {
        t: "fal fa-moon-stars",
        sT: [],
      },
      {
        t: "fad fa-moon-stars",
        sT: [],
      },
      {
        t: "fas fa-mortar-pestle",
        sT: [],
      },
      {
        t: "far fa-mortar-pestle",
        sT: [],
      },
      {
        t: "fal fa-mortar-pestle",
        sT: [],
      },
      {
        t: "fad fa-mortar-pestle",
        sT: [],
      },
      {
        t: "fas fa-mosque",
        sT: [],
      },
      {
        t: "far fa-mosque",
        sT: [],
      },
      {
        t: "fal fa-mosque",
        sT: [],
      },
      {
        t: "fad fa-mosque",
        sT: [],
      },
      {
        t: "fas fa-motorcycle",
        sT: [],
      },
      {
        t: "far fa-motorcycle",
        sT: [],
      },
      {
        t: "fal fa-motorcycle",
        sT: [],
      },
      {
        t: "fad fa-motorcycle",
        sT: [],
      },
      {
        t: "fas fa-mountain",
        sT: [],
      },
      {
        t: "far fa-mountain",
        sT: [],
      },
      {
        t: "fal fa-mountain",
        sT: [],
      },
      {
        t: "fad fa-mountain",
        sT: [],
      },
      {
        t: "fas fa-mountains",
        sT: [],
      },
      {
        t: "far fa-mountains",
        sT: [],
      },
      {
        t: "fal fa-mountains",
        sT: [],
      },
      {
        t: "fad fa-mountains",
        sT: [],
      },
      {
        t: "fas fa-mouse",
        sT: [],
      },
      {
        t: "far fa-mouse",
        sT: [],
      },
      {
        t: "fal fa-mouse",
        sT: [],
      },
      {
        t: "fad fa-mouse",
        sT: [],
      },
      {
        t: "fas fa-mouse-alt",
        sT: [],
      },
      {
        t: "far fa-mouse-alt",
        sT: [],
      },
      {
        t: "fal fa-mouse-alt",
        sT: [],
      },
      {
        t: "fad fa-mouse-alt",
        sT: [],
      },
      {
        t: "fas fa-mouse-pointer",
        sT: [],
      },
      {
        t: "far fa-mouse-pointer",
        sT: [],
      },
      {
        t: "fal fa-mouse-pointer",
        sT: [],
      },
      {
        t: "fad fa-mouse-pointer",
        sT: [],
      },
      {
        t: "fas fa-mp3-player",
        sT: [],
      },
      {
        t: "far fa-mp3-player",
        sT: [],
      },
      {
        t: "fal fa-mp3-player",
        sT: [],
      },
      {
        t: "fad fa-mp3-player",
        sT: [],
      },
      {
        t: "fas fa-mug",
        sT: [],
      },
      {
        t: "far fa-mug",
        sT: [],
      },
      {
        t: "fal fa-mug",
        sT: [],
      },
      {
        t: "fad fa-mug",
        sT: [],
      },
      {
        t: "fas fa-mug-hot",
        sT: [],
      },
      {
        t: "far fa-mug-hot",
        sT: [],
      },
      {
        t: "fal fa-mug-hot",
        sT: [],
      },
      {
        t: "fad fa-mug-hot",
        sT: [],
      },
      {
        t: "fas fa-mug-marshmallows",
        sT: [],
      },
      {
        t: "far fa-mug-marshmallows",
        sT: [],
      },
      {
        t: "fal fa-mug-marshmallows",
        sT: [],
      },
      {
        t: "fad fa-mug-marshmallows",
        sT: [],
      },
      {
        t: "fas fa-mug-tea",
        sT: [],
      },
      {
        t: "far fa-mug-tea",
        sT: [],
      },
      {
        t: "fal fa-mug-tea",
        sT: [],
      },
      {
        t: "fad fa-mug-tea",
        sT: [],
      },
      {
        t: "fas fa-music",
        sT: [],
      },
      {
        t: "far fa-music",
        sT: [],
      },
      {
        t: "fal fa-music",
        sT: [],
      },
      {
        t: "fad fa-music",
        sT: [],
      },
      {
        t: "fas fa-music-alt",
        sT: [],
      },
      {
        t: "far fa-music-alt",
        sT: [],
      },
      {
        t: "fal fa-music-alt",
        sT: [],
      },
      {
        t: "fad fa-music-alt",
        sT: [],
      },
      {
        t: "fas fa-music-alt-slash",
        sT: [],
      },
      {
        t: "far fa-music-alt-slash",
        sT: [],
      },
      {
        t: "fal fa-music-alt-slash",
        sT: [],
      },
      {
        t: "fad fa-music-alt-slash",
        sT: [],
      },
      {
        t: "fas fa-music-slash",
        sT: [],
      },
      {
        t: "far fa-music-slash",
        sT: [],
      },
      {
        t: "fal fa-music-slash",
        sT: [],
      },
      {
        t: "fad fa-music-slash",
        sT: [],
      },
      {
        t: "fab fa-napster",
        sT: [],
      },
      {
        t: "fas fa-narwhal",
        sT: [],
      },
      {
        t: "far fa-narwhal",
        sT: [],
      },
      {
        t: "fal fa-narwhal",
        sT: [],
      },
      {
        t: "fad fa-narwhal",
        sT: [],
      },
      {
        t: "fab fa-neos",
        sT: [],
      },
      {
        t: "fas fa-network-wired",
        sT: [],
      },
      {
        t: "far fa-network-wired",
        sT: [],
      },
      {
        t: "fal fa-network-wired",
        sT: [],
      },
      {
        t: "fad fa-network-wired",
        sT: [],
      },
      {
        t: "fas fa-neuter",
        sT: [],
      },
      {
        t: "far fa-neuter",
        sT: [],
      },
      {
        t: "fal fa-neuter",
        sT: [],
      },
      {
        t: "fad fa-neuter",
        sT: [],
      },
      {
        t: "fas fa-newspaper",
        sT: [],
      },
      {
        t: "far fa-newspaper",
        sT: [],
      },
      {
        t: "fal fa-newspaper",
        sT: [],
      },
      {
        t: "fad fa-newspaper",
        sT: [],
      },
      {
        t: "fab fa-nimblr",
        sT: [],
      },
      {
        t: "fab fa-node",
        sT: [],
      },
      {
        t: "fab fa-node-js",
        sT: [],
      },
      {
        t: "fas fa-not-equal",
        sT: [],
      },
      {
        t: "far fa-not-equal",
        sT: [],
      },
      {
        t: "fal fa-not-equal",
        sT: [],
      },
      {
        t: "fad fa-not-equal",
        sT: [],
      },
      {
        t: "fas fa-notes-medical",
        sT: [],
      },
      {
        t: "far fa-notes-medical",
        sT: [],
      },
      {
        t: "fal fa-notes-medical",
        sT: [],
      },
      {
        t: "fad fa-notes-medical",
        sT: [],
      },
      {
        t: "fab fa-npm",
        sT: [],
      },
      {
        t: "fab fa-ns8",
        sT: [],
      },
      {
        t: "fab fa-nutritionix",
        sT: [],
      },
      {
        t: "fas fa-object-group",
        sT: [],
      },
      {
        t: "far fa-object-group",
        sT: [],
      },
      {
        t: "fal fa-object-group",
        sT: [],
      },
      {
        t: "fad fa-object-group",
        sT: [],
      },
      {
        t: "fas fa-object-ungroup",
        sT: [],
      },
      {
        t: "far fa-object-ungroup",
        sT: [],
      },
      {
        t: "fal fa-object-ungroup",
        sT: [],
      },
      {
        t: "fad fa-object-ungroup",
        sT: [],
      },
      {
        t: "fas fa-octagon",
        sT: [],
      },
      {
        t: "far fa-octagon",
        sT: [],
      },
      {
        t: "fal fa-octagon",
        sT: [],
      },
      {
        t: "fad fa-octagon",
        sT: [],
      },
      {
        t: "fab fa-octopus-deploy",
        sT: [],
      },
      {
        t: "fab fa-odnoklassniki",
        sT: [],
      },
      {
        t: "fab fa-odnoklassniki-square",
        sT: [],
      },
      {
        t: "fas fa-oil-can",
        sT: [],
      },
      {
        t: "far fa-oil-can",
        sT: [],
      },
      {
        t: "fal fa-oil-can",
        sT: [],
      },
      {
        t: "fad fa-oil-can",
        sT: [],
      },
      {
        t: "fas fa-oil-temp",
        sT: [],
      },
      {
        t: "far fa-oil-temp",
        sT: [],
      },
      {
        t: "fal fa-oil-temp",
        sT: [],
      },
      {
        t: "fad fa-oil-temp",
        sT: [],
      },
      {
        t: "fab fa-old-republic",
        sT: [],
      },
      {
        t: "fas fa-om",
        sT: [],
      },
      {
        t: "far fa-om",
        sT: [],
      },
      {
        t: "fal fa-om",
        sT: [],
      },
      {
        t: "fad fa-om",
        sT: [],
      },
      {
        t: "fas fa-omega",
        sT: [],
      },
      {
        t: "far fa-omega",
        sT: [],
      },
      {
        t: "fal fa-omega",
        sT: [],
      },
      {
        t: "fad fa-omega",
        sT: [],
      },
      {
        t: "fab fa-opencart",
        sT: [],
      },
      {
        t: "fab fa-openid",
        sT: [],
      },
      {
        t: "fab fa-opera",
        sT: [],
      },
      {
        t: "fab fa-optin-monster",
        sT: [],
      },
      {
        t: "fab fa-orcid",
        sT: [],
      },
      {
        t: "fas fa-ornament",
        sT: [],
      },
      {
        t: "far fa-ornament",
        sT: [],
      },
      {
        t: "fal fa-ornament",
        sT: [],
      },
      {
        t: "fad fa-ornament",
        sT: [],
      },
      {
        t: "fab fa-osi",
        sT: [],
      },
      {
        t: "fas fa-otter",
        sT: [],
      },
      {
        t: "far fa-otter",
        sT: [],
      },
      {
        t: "fal fa-otter",
        sT: [],
      },
      {
        t: "fad fa-otter",
        sT: [],
      },
      {
        t: "fas fa-outdent",
        sT: [],
      },
      {
        t: "far fa-outdent",
        sT: [],
      },
      {
        t: "fal fa-outdent",
        sT: [],
      },
      {
        t: "fad fa-outdent",
        sT: [],
      },
      {
        t: "fas fa-outlet",
        sT: [],
      },
      {
        t: "far fa-outlet",
        sT: [],
      },
      {
        t: "fal fa-outlet",
        sT: [],
      },
      {
        t: "fad fa-outlet",
        sT: [],
      },
      {
        t: "fas fa-oven",
        sT: [],
      },
      {
        t: "far fa-oven",
        sT: [],
      },
      {
        t: "fal fa-oven",
        sT: [],
      },
      {
        t: "fad fa-oven",
        sT: [],
      },
      {
        t: "fas fa-overline",
        sT: [],
      },
      {
        t: "far fa-overline",
        sT: [],
      },
      {
        t: "fal fa-overline",
        sT: [],
      },
      {
        t: "fad fa-overline",
        sT: [],
      },
      {
        t: "fas fa-page-break",
        sT: [],
      },
      {
        t: "far fa-page-break",
        sT: [],
      },
      {
        t: "fal fa-page-break",
        sT: [],
      },
      {
        t: "fad fa-page-break",
        sT: [],
      },
      {
        t: "fab fa-page4",
        sT: [],
      },
      {
        t: "fab fa-pagelines",
        sT: [],
      },
      {
        t: "fas fa-pager",
        sT: [],
      },
      {
        t: "far fa-pager",
        sT: [],
      },
      {
        t: "fal fa-pager",
        sT: [],
      },
      {
        t: "fad fa-pager",
        sT: [],
      },
      {
        t: "fas fa-paint-brush",
        sT: [],
      },
      {
        t: "far fa-paint-brush",
        sT: [],
      },
      {
        t: "fal fa-paint-brush",
        sT: [],
      },
      {
        t: "fad fa-paint-brush",
        sT: [],
      },
      {
        t: "fas fa-paint-brush-alt",
        sT: [],
      },
      {
        t: "far fa-paint-brush-alt",
        sT: [],
      },
      {
        t: "fal fa-paint-brush-alt",
        sT: [],
      },
      {
        t: "fad fa-paint-brush-alt",
        sT: [],
      },
      {
        t: "fas fa-paint-roller",
        sT: [],
      },
      {
        t: "far fa-paint-roller",
        sT: [],
      },
      {
        t: "fal fa-paint-roller",
        sT: [],
      },
      {
        t: "fad fa-paint-roller",
        sT: [],
      },
      {
        t: "fas fa-palette",
        sT: [],
      },
      {
        t: "far fa-palette",
        sT: [],
      },
      {
        t: "fal fa-palette",
        sT: [],
      },
      {
        t: "fad fa-palette",
        sT: [],
      },
      {
        t: "fab fa-palfed",
        sT: [],
      },
      {
        t: "fas fa-pallet",
        sT: [],
      },
      {
        t: "far fa-pallet",
        sT: [],
      },
      {
        t: "fal fa-pallet",
        sT: [],
      },
      {
        t: "fad fa-pallet",
        sT: [],
      },
      {
        t: "fas fa-pallet-alt",
        sT: [],
      },
      {
        t: "far fa-pallet-alt",
        sT: [],
      },
      {
        t: "fal fa-pallet-alt",
        sT: [],
      },
      {
        t: "fad fa-pallet-alt",
        sT: [],
      },
      {
        t: "fas fa-paper-plane",
        sT: [],
      },
      {
        t: "far fa-paper-plane",
        sT: [],
      },
      {
        t: "fal fa-paper-plane",
        sT: [],
      },
      {
        t: "fad fa-paper-plane",
        sT: [],
      },
      {
        t: "fas fa-paperclip",
        sT: [],
      },
      {
        t: "far fa-paperclip",
        sT: [],
      },
      {
        t: "fal fa-paperclip",
        sT: [],
      },
      {
        t: "fad fa-paperclip",
        sT: [],
      },
      {
        t: "fas fa-parachute-box",
        sT: [],
      },
      {
        t: "far fa-parachute-box",
        sT: [],
      },
      {
        t: "fal fa-parachute-box",
        sT: [],
      },
      {
        t: "fad fa-parachute-box",
        sT: [],
      },
      {
        t: "fas fa-paragraph",
        sT: [],
      },
      {
        t: "far fa-paragraph",
        sT: [],
      },
      {
        t: "fal fa-paragraph",
        sT: [],
      },
      {
        t: "fad fa-paragraph",
        sT: [],
      },
      {
        t: "fas fa-paragraph-rtl",
        sT: [],
      },
      {
        t: "far fa-paragraph-rtl",
        sT: [],
      },
      {
        t: "fal fa-paragraph-rtl",
        sT: [],
      },
      {
        t: "fad fa-paragraph-rtl",
        sT: [],
      },
      {
        t: "fas fa-parking",
        sT: [],
      },
      {
        t: "far fa-parking",
        sT: [],
      },
      {
        t: "fal fa-parking",
        sT: [],
      },
      {
        t: "fad fa-parking",
        sT: [],
      },
      {
        t: "fas fa-parking-circle",
        sT: [],
      },
      {
        t: "far fa-parking-circle",
        sT: [],
      },
      {
        t: "fal fa-parking-circle",
        sT: [],
      },
      {
        t: "fad fa-parking-circle",
        sT: [],
      },
      {
        t: "fas fa-parking-circle-slash",
        sT: [],
      },
      {
        t: "far fa-parking-circle-slash",
        sT: [],
      },
      {
        t: "fal fa-parking-circle-slash",
        sT: [],
      },
      {
        t: "fad fa-parking-circle-slash",
        sT: [],
      },
      {
        t: "fas fa-parking-slash",
        sT: [],
      },
      {
        t: "far fa-parking-slash",
        sT: [],
      },
      {
        t: "fal fa-parking-slash",
        sT: [],
      },
      {
        t: "fad fa-parking-slash",
        sT: [],
      },
      {
        t: "fas fa-passport",
        sT: [],
      },
      {
        t: "far fa-passport",
        sT: [],
      },
      {
        t: "fal fa-passport",
        sT: [],
      },
      {
        t: "fad fa-passport",
        sT: [],
      },
      {
        t: "fas fa-pastafarianism",
        sT: [],
      },
      {
        t: "far fa-pastafarianism",
        sT: [],
      },
      {
        t: "fal fa-pastafarianism",
        sT: [],
      },
      {
        t: "fad fa-pastafarianism",
        sT: [],
      },
      {
        t: "fas fa-paste",
        sT: [],
      },
      {
        t: "far fa-paste",
        sT: [],
      },
      {
        t: "fal fa-paste",
        sT: [],
      },
      {
        t: "fad fa-paste",
        sT: [],
      },
      {
        t: "fab fa-patreon",
        sT: [],
      },
      {
        t: "fas fa-pause",
        sT: [],
      },
      {
        t: "far fa-pause",
        sT: [],
      },
      {
        t: "fal fa-pause",
        sT: [],
      },
      {
        t: "fad fa-pause",
        sT: [],
      },
      {
        t: "fas fa-pause-circle",
        sT: [],
      },
      {
        t: "far fa-pause-circle",
        sT: [],
      },
      {
        t: "fal fa-pause-circle",
        sT: [],
      },
      {
        t: "fad fa-pause-circle",
        sT: [],
      },
      {
        t: "fas fa-paw",
        sT: [],
      },
      {
        t: "far fa-paw",
        sT: [],
      },
      {
        t: "fal fa-paw",
        sT: [],
      },
      {
        t: "fad fa-paw",
        sT: [],
      },
      {
        t: "fas fa-paw-alt",
        sT: [],
      },
      {
        t: "far fa-paw-alt",
        sT: [],
      },
      {
        t: "fal fa-paw-alt",
        sT: [],
      },
      {
        t: "fad fa-paw-alt",
        sT: [],
      },
      {
        t: "fas fa-paw-claws",
        sT: [],
      },
      {
        t: "far fa-paw-claws",
        sT: [],
      },
      {
        t: "fal fa-paw-claws",
        sT: [],
      },
      {
        t: "fad fa-paw-claws",
        sT: [],
      },
      {
        t: "fab fa-paypal",
        sT: [],
      },
      {
        t: "fas fa-peace",
        sT: [],
      },
      {
        t: "far fa-peace",
        sT: [],
      },
      {
        t: "fal fa-peace",
        sT: [],
      },
      {
        t: "fad fa-peace",
        sT: [],
      },
      {
        t: "fas fa-pegasus",
        sT: [],
      },
      {
        t: "far fa-pegasus",
        sT: [],
      },
      {
        t: "fal fa-pegasus",
        sT: [],
      },
      {
        t: "fad fa-pegasus",
        sT: [],
      },
      {
        t: "fas fa-pen",
        sT: [],
      },
      {
        t: "far fa-pen",
        sT: [],
      },
      {
        t: "fal fa-pen",
        sT: [],
      },
      {
        t: "fad fa-pen",
        sT: [],
      },
      {
        t: "fas fa-pen-alt",
        sT: [],
      },
      {
        t: "far fa-pen-alt",
        sT: [],
      },
      {
        t: "fal fa-pen-alt",
        sT: [],
      },
      {
        t: "fad fa-pen-alt",
        sT: [],
      },
      {
        t: "fas fa-pen-fancy",
        sT: [],
      },
      {
        t: "far fa-pen-fancy",
        sT: [],
      },
      {
        t: "fal fa-pen-fancy",
        sT: [],
      },
      {
        t: "fad fa-pen-fancy",
        sT: [],
      },
      {
        t: "fas fa-pen-nib",
        sT: [],
      },
      {
        t: "far fa-pen-nib",
        sT: [],
      },
      {
        t: "fal fa-pen-nib",
        sT: [],
      },
      {
        t: "fad fa-pen-nib",
        sT: [],
      },
      {
        t: "fas fa-pen-square",
        sT: [],
      },
      {
        t: "far fa-pen-square",
        sT: [],
      },
      {
        t: "fal fa-pen-square",
        sT: [],
      },
      {
        t: "fad fa-pen-square",
        sT: [],
      },
      {
        t: "fas fa-pencil",
        sT: [],
      },
      {
        t: "far fa-pencil",
        sT: [],
      },
      {
        t: "fal fa-pencil",
        sT: [],
      },
      {
        t: "fad fa-pencil",
        sT: [],
      },
      {
        t: "fas fa-pencil-alt",
        sT: [],
      },
      {
        t: "far fa-pencil-alt",
        sT: [],
      },
      {
        t: "fal fa-pencil-alt",
        sT: [],
      },
      {
        t: "fad fa-pencil-alt",
        sT: [],
      },
      {
        t: "fas fa-pencil-paintbrush",
        sT: [],
      },
      {
        t: "far fa-pencil-paintbrush",
        sT: [],
      },
      {
        t: "fal fa-pencil-paintbrush",
        sT: [],
      },
      {
        t: "fad fa-pencil-paintbrush",
        sT: [],
      },
      {
        t: "fas fa-pencil-ruler",
        sT: [],
      },
      {
        t: "far fa-pencil-ruler",
        sT: [],
      },
      {
        t: "fal fa-pencil-ruler",
        sT: [],
      },
      {
        t: "fad fa-pencil-ruler",
        sT: [],
      },
      {
        t: "fas fa-pennant",
        sT: [],
      },
      {
        t: "far fa-pennant",
        sT: [],
      },
      {
        t: "fal fa-pennant",
        sT: [],
      },
      {
        t: "fad fa-pennant",
        sT: [],
      },
      {
        t: "fab fa-penny-arcade",
        sT: [],
      },
      {
        t: "fal fa-people-arrows",
        sT: [],
      },
      {
        t: "far fa-people-arrows",
        sT: [],
      },
      {
        t: "fas fa-people-arrows",
        sT: [],
      },
      {
        t: "fad fa-people-arrows",
        sT: [],
      },
      {
        t: "fas fa-people-carry",
        sT: [],
      },
      {
        t: "far fa-people-carry",
        sT: [],
      },
      {
        t: "fal fa-people-carry",
        sT: [],
      },
      {
        t: "fad fa-people-carry",
        sT: [],
      },
      {
        t: "fas fa-pepper-hot",
        sT: [],
      },
      {
        t: "far fa-pepper-hot",
        sT: [],
      },
      {
        t: "fal fa-pepper-hot",
        sT: [],
      },
      {
        t: "fad fa-pepper-hot",
        sT: [],
      },
      {
        t: "fab fa-perbyte",
        sT: [],
      },
      {
        t: "fas fa-percent",
        sT: [],
      },
      {
        t: "far fa-percent",
        sT: [],
      },
      {
        t: "fal fa-percent",
        sT: [],
      },
      {
        t: "fad fa-percent",
        sT: [],
      },
      {
        t: "fas fa-percentage",
        sT: [],
      },
      {
        t: "far fa-percentage",
        sT: [],
      },
      {
        t: "fal fa-percentage",
        sT: [],
      },
      {
        t: "fad fa-percentage",
        sT: [],
      },
      {
        t: "fab fa-periscope",
        sT: [],
      },
      {
        t: "fas fa-person-booth",
        sT: [],
      },
      {
        t: "far fa-person-booth",
        sT: [],
      },
      {
        t: "fal fa-person-booth",
        sT: [],
      },
      {
        t: "fad fa-person-booth",
        sT: [],
      },
      {
        t: "fas fa-person-carry",
        sT: [],
      },
      {
        t: "far fa-person-carry",
        sT: [],
      },
      {
        t: "fal fa-person-carry",
        sT: [],
      },
      {
        t: "fad fa-person-carry",
        sT: [],
      },
      {
        t: "fas fa-person-dolly",
        sT: [],
      },
      {
        t: "far fa-person-dolly",
        sT: [],
      },
      {
        t: "fal fa-person-dolly",
        sT: [],
      },
      {
        t: "fad fa-person-dolly",
        sT: [],
      },
      {
        t: "fas fa-person-dolly-empty",
        sT: [],
      },
      {
        t: "far fa-person-dolly-empty",
        sT: [],
      },
      {
        t: "fal fa-person-dolly-empty",
        sT: [],
      },
      {
        t: "fad fa-person-dolly-empty",
        sT: [],
      },
      {
        t: "fas fa-person-sign",
        sT: [],
      },
      {
        t: "far fa-person-sign",
        sT: [],
      },
      {
        t: "fal fa-person-sign",
        sT: [],
      },
      {
        t: "fad fa-person-sign",
        sT: [],
      },
      {
        t: "fab fa-phabricator",
        sT: [],
      },
      {
        t: "fab fa-phoenix-framework",
        sT: [],
      },
      {
        t: "fab fa-phoenix-squadron",
        sT: [],
      },
      {
        t: "fas fa-phone",
        sT: [],
      },
      {
        t: "far fa-phone",
        sT: [],
      },
      {
        t: "fal fa-phone",
        sT: [],
      },
      {
        t: "fad fa-phone",
        sT: [],
      },
      {
        t: "fas fa-phone-alt",
        sT: [],
      },
      {
        t: "far fa-phone-alt",
        sT: [],
      },
      {
        t: "fal fa-phone-alt",
        sT: [],
      },
      {
        t: "fad fa-phone-alt",
        sT: [],
      },
      {
        t: "fas fa-phone-laptop",
        sT: [],
      },
      {
        t: "far fa-phone-laptop",
        sT: [],
      },
      {
        t: "fal fa-phone-laptop",
        sT: [],
      },
      {
        t: "fad fa-phone-laptop",
        sT: [],
      },
      {
        t: "fas fa-phone-office",
        sT: [],
      },
      {
        t: "far fa-phone-office",
        sT: [],
      },
      {
        t: "fal fa-phone-office",
        sT: [],
      },
      {
        t: "fad fa-phone-office",
        sT: [],
      },
      {
        t: "fas fa-phone-plus",
        sT: [],
      },
      {
        t: "far fa-phone-plus",
        sT: [],
      },
      {
        t: "fal fa-phone-plus",
        sT: [],
      },
      {
        t: "fad fa-phone-plus",
        sT: [],
      },
      {
        t: "fas fa-phone-rotary",
        sT: [],
      },
      {
        t: "far fa-phone-rotary",
        sT: [],
      },
      {
        t: "fal fa-phone-rotary",
        sT: [],
      },
      {
        t: "fad fa-phone-rotary",
        sT: [],
      },
      {
        t: "fas fa-phone-slash",
        sT: [],
      },
      {
        t: "far fa-phone-slash",
        sT: [],
      },
      {
        t: "fal fa-phone-slash",
        sT: [],
      },
      {
        t: "fad fa-phone-slash",
        sT: [],
      },
      {
        t: "fas fa-phone-square",
        sT: [],
      },
      {
        t: "far fa-phone-square",
        sT: [],
      },
      {
        t: "fal fa-phone-square",
        sT: [],
      },
      {
        t: "fad fa-phone-square",
        sT: [],
      },
      {
        t: "fas fa-phone-square-alt",
        sT: [],
      },
      {
        t: "far fa-phone-square-alt",
        sT: [],
      },
      {
        t: "fal fa-phone-square-alt",
        sT: [],
      },
      {
        t: "fad fa-phone-square-alt",
        sT: [],
      },
      {
        t: "fas fa-phone-volume",
        sT: [],
      },
      {
        t: "far fa-phone-volume",
        sT: [],
      },
      {
        t: "fal fa-phone-volume",
        sT: [],
      },
      {
        t: "fad fa-phone-volume",
        sT: [],
      },
      {
        t: "fas fa-photo-video",
        sT: [],
      },
      {
        t: "far fa-photo-video",
        sT: [],
      },
      {
        t: "fal fa-photo-video",
        sT: [],
      },
      {
        t: "fad fa-photo-video",
        sT: [],
      },
      {
        t: "fab fa-php",
        sT: [],
      },
      {
        t: "fas fa-pi",
        sT: [],
      },
      {
        t: "far fa-pi",
        sT: [],
      },
      {
        t: "fal fa-pi",
        sT: [],
      },
      {
        t: "fad fa-pi",
        sT: [],
      },
      {
        t: "fas fa-piano",
        sT: [],
      },
      {
        t: "far fa-piano",
        sT: [],
      },
      {
        t: "fal fa-piano",
        sT: [],
      },
      {
        t: "fad fa-piano",
        sT: [],
      },
      {
        t: "fas fa-piano-keyboard",
        sT: [],
      },
      {
        t: "far fa-piano-keyboard",
        sT: [],
      },
      {
        t: "fal fa-piano-keyboard",
        sT: [],
      },
      {
        t: "fad fa-piano-keyboard",
        sT: [],
      },
      {
        t: "fas fa-pie",
        sT: [],
      },
      {
        t: "far fa-pie",
        sT: [],
      },
      {
        t: "fal fa-pie",
        sT: [],
      },
      {
        t: "fad fa-pie",
        sT: [],
      },
      {
        t: "fab fa-pied-piper",
        sT: [],
      },
      {
        t: "fab fa-pied-piper-alt",
        sT: [],
      },
      {
        t: "fab fa-pied-piper-hat",
        sT: [],
      },
      {
        t: "fab fa-pied-piper-pp",
        sT: [],
      },
      {
        t: "fab fa-pied-piper-square",
        sT: [],
      },
      {
        t: "fas fa-pig",
        sT: [],
      },
      {
        t: "far fa-pig",
        sT: [],
      },
      {
        t: "fal fa-pig",
        sT: [],
      },
      {
        t: "fad fa-pig",
        sT: [],
      },
      {
        t: "fas fa-piggy-bank",
        sT: [],
      },
      {
        t: "far fa-piggy-bank",
        sT: [],
      },
      {
        t: "fal fa-piggy-bank",
        sT: [],
      },
      {
        t: "fad fa-piggy-bank",
        sT: [],
      },
      {
        t: "fas fa-pills",
        sT: [],
      },
      {
        t: "far fa-pills",
        sT: [],
      },
      {
        t: "fal fa-pills",
        sT: [],
      },
      {
        t: "fad fa-pills",
        sT: [],
      },
      {
        t: "fab fa-pinterest",
        sT: [],
      },
      {
        t: "fab fa-pinterest-p",
        sT: [],
      },
      {
        t: "fab fa-pinterest-square",
        sT: [],
      },
      {
        t: "fas fa-pizza",
        sT: [],
      },
      {
        t: "far fa-pizza",
        sT: [],
      },
      {
        t: "fal fa-pizza",
        sT: [],
      },
      {
        t: "fad fa-pizza",
        sT: [],
      },
      {
        t: "fas fa-pizza-slice",
        sT: [],
      },
      {
        t: "far fa-pizza-slice",
        sT: [],
      },
      {
        t: "fal fa-pizza-slice",
        sT: [],
      },
      {
        t: "fad fa-pizza-slice",
        sT: [],
      },
      {
        t: "fas fa-place-of-worship",
        sT: [],
      },
      {
        t: "far fa-place-of-worship",
        sT: [],
      },
      {
        t: "fal fa-place-of-worship",
        sT: [],
      },
      {
        t: "fad fa-place-of-worship",
        sT: [],
      },
      {
        t: "fas fa-plane",
        sT: [],
      },
      {
        t: "far fa-plane",
        sT: [],
      },
      {
        t: "fal fa-plane",
        sT: [],
      },
      {
        t: "fad fa-plane",
        sT: [],
      },
      {
        t: "fas fa-plane-alt",
        sT: [],
      },
      {
        t: "far fa-plane-alt",
        sT: [],
      },
      {
        t: "fal fa-plane-alt",
        sT: [],
      },
      {
        t: "fad fa-plane-alt",
        sT: [],
      },
      {
        t: "fas fa-plane-arrival",
        sT: [],
      },
      {
        t: "far fa-plane-arrival",
        sT: [],
      },
      {
        t: "fal fa-plane-arrival",
        sT: [],
      },
      {
        t: "fad fa-plane-arrival",
        sT: [],
      },
      {
        t: "fas fa-plane-departure",
        sT: [],
      },
      {
        t: "far fa-plane-departure",
        sT: [],
      },
      {
        t: "fal fa-plane-departure",
        sT: [],
      },
      {
        t: "fad fa-plane-departure",
        sT: [],
      },
      {
        t: "fal fa-plane-slash",
        sT: [],
      },
      {
        t: "far fa-plane-slash",
        sT: [],
      },
      {
        t: "fas fa-plane-slash",
        sT: [],
      },
      {
        t: "fad fa-plane-slash",
        sT: [],
      },
      {
        t: "fas fa-planet-moon",
        sT: [],
      },
      {
        t: "far fa-planet-moon",
        sT: [],
      },
      {
        t: "fal fa-planet-moon",
        sT: [],
      },
      {
        t: "fad fa-planet-moon",
        sT: [],
      },
      {
        t: "fas fa-planet-ringed",
        sT: [],
      },
      {
        t: "far fa-planet-ringed",
        sT: [],
      },
      {
        t: "fal fa-planet-ringed",
        sT: [],
      },
      {
        t: "fad fa-planet-ringed",
        sT: [],
      },
      {
        t: "fas fa-play",
        sT: [],
      },
      {
        t: "far fa-play",
        sT: [],
      },
      {
        t: "fal fa-play",
        sT: [],
      },
      {
        t: "fad fa-play",
        sT: [],
      },
      {
        t: "fas fa-play-circle",
        sT: [],
      },
      {
        t: "far fa-play-circle",
        sT: [],
      },
      {
        t: "fal fa-play-circle",
        sT: [],
      },
      {
        t: "fad fa-play-circle",
        sT: [],
      },
      {
        t: "fab fa-playstation",
        sT: [],
      },
      {
        t: "fas fa-plug",
        sT: [],
      },
      {
        t: "far fa-plug",
        sT: [],
      },
      {
        t: "fal fa-plug",
        sT: [],
      },
      {
        t: "fad fa-plug",
        sT: [],
      },
      {
        t: "fas fa-plus",
        sT: [],
      },
      {
        t: "far fa-plus",
        sT: [],
      },
      {
        t: "fal fa-plus",
        sT: [],
      },
      {
        t: "fad fa-plus",
        sT: [],
      },
      {
        t: "fas fa-plus-circle",
        sT: [],
      },
      {
        t: "far fa-plus-circle",
        sT: [],
      },
      {
        t: "fal fa-plus-circle",
        sT: [],
      },
      {
        t: "fad fa-plus-circle",
        sT: [],
      },
      {
        t: "fas fa-plus-hexagon",
        sT: [],
      },
      {
        t: "far fa-plus-hexagon",
        sT: [],
      },
      {
        t: "fal fa-plus-hexagon",
        sT: [],
      },
      {
        t: "fad fa-plus-hexagon",
        sT: [],
      },
      {
        t: "fas fa-plus-octagon",
        sT: [],
      },
      {
        t: "far fa-plus-octagon",
        sT: [],
      },
      {
        t: "fal fa-plus-octagon",
        sT: [],
      },
      {
        t: "fad fa-plus-octagon",
        sT: [],
      },
      {
        t: "fas fa-plus-square",
        sT: [],
      },
      {
        t: "far fa-plus-square",
        sT: [],
      },
      {
        t: "fal fa-plus-square",
        sT: [],
      },
      {
        t: "fad fa-plus-square",
        sT: [],
      },
      {
        t: "fas fa-podcast",
        sT: [],
      },
      {
        t: "far fa-podcast",
        sT: [],
      },
      {
        t: "fal fa-podcast",
        sT: [],
      },
      {
        t: "fad fa-podcast",
        sT: [],
      },
      {
        t: "fas fa-podium",
        sT: [],
      },
      {
        t: "far fa-podium",
        sT: [],
      },
      {
        t: "fal fa-podium",
        sT: [],
      },
      {
        t: "fad fa-podium",
        sT: [],
      },
      {
        t: "fas fa-podium-star",
        sT: [],
      },
      {
        t: "far fa-podium-star",
        sT: [],
      },
      {
        t: "fal fa-podium-star",
        sT: [],
      },
      {
        t: "fad fa-podium-star",
        sT: [],
      },
      {
        t: "fas fa-police-box",
        sT: [],
      },
      {
        t: "far fa-police-box",
        sT: [],
      },
      {
        t: "fal fa-police-box",
        sT: [],
      },
      {
        t: "fad fa-police-box",
        sT: [],
      },
      {
        t: "fas fa-poll",
        sT: [],
      },
      {
        t: "far fa-poll",
        sT: [],
      },
      {
        t: "fal fa-poll",
        sT: [],
      },
      {
        t: "fad fa-poll",
        sT: [],
      },
      {
        t: "fas fa-poll-h",
        sT: [],
      },
      {
        t: "far fa-poll-h",
        sT: [],
      },
      {
        t: "fal fa-poll-h",
        sT: [],
      },
      {
        t: "fad fa-poll-h",
        sT: [],
      },
      {
        t: "fas fa-poll-people",
        sT: [],
      },
      {
        t: "far fa-poll-people",
        sT: [],
      },
      {
        t: "fal fa-poll-people",
        sT: [],
      },
      {
        t: "fad fa-poll-people",
        sT: [],
      },
      {
        t: "fas fa-poo",
        sT: [],
      },
      {
        t: "far fa-poo",
        sT: [],
      },
      {
        t: "fal fa-poo",
        sT: [],
      },
      {
        t: "fad fa-poo",
        sT: [],
      },
      {
        t: "fas fa-poo-storm",
        sT: [],
      },
      {
        t: "far fa-poo-storm",
        sT: [],
      },
      {
        t: "fal fa-poo-storm",
        sT: [],
      },
      {
        t: "fad fa-poo-storm",
        sT: [],
      },
      {
        t: "fas fa-poop",
        sT: [],
      },
      {
        t: "far fa-poop",
        sT: [],
      },
      {
        t: "fal fa-poop",
        sT: [],
      },
      {
        t: "fad fa-poop",
        sT: [],
      },
      {
        t: "fas fa-popcorn",
        sT: [],
      },
      {
        t: "far fa-popcorn",
        sT: [],
      },
      {
        t: "fal fa-popcorn",
        sT: [],
      },
      {
        t: "fad fa-popcorn",
        sT: [],
      },
      {
        t: "fas fa-portal-enter",
        sT: [],
      },
      {
        t: "far fa-portal-enter",
        sT: [],
      },
      {
        t: "fal fa-portal-enter",
        sT: [],
      },
      {
        t: "fad fa-portal-enter",
        sT: [],
      },
      {
        t: "fas fa-portal-exit",
        sT: [],
      },
      {
        t: "far fa-portal-exit",
        sT: [],
      },
      {
        t: "fal fa-portal-exit",
        sT: [],
      },
      {
        t: "fad fa-portal-exit",
        sT: [],
      },
      {
        t: "fas fa-portrait",
        sT: [],
      },
      {
        t: "far fa-portrait",
        sT: [],
      },
      {
        t: "fal fa-portrait",
        sT: [],
      },
      {
        t: "fad fa-portrait",
        sT: [],
      },
      {
        t: "fas fa-pound-sign",
        sT: [],
      },
      {
        t: "far fa-pound-sign",
        sT: [],
      },
      {
        t: "fal fa-pound-sign",
        sT: [],
      },
      {
        t: "fad fa-pound-sign",
        sT: [],
      },
      {
        t: "fas fa-power-off",
        sT: [],
      },
      {
        t: "far fa-power-off",
        sT: [],
      },
      {
        t: "fal fa-power-off",
        sT: [],
      },
      {
        t: "fad fa-power-off",
        sT: [],
      },
      {
        t: "fas fa-pray",
        sT: [],
      },
      {
        t: "far fa-pray",
        sT: [],
      },
      {
        t: "fal fa-pray",
        sT: [],
      },
      {
        t: "fad fa-pray",
        sT: [],
      },
      {
        t: "fas fa-praying-hands",
        sT: [],
      },
      {
        t: "far fa-praying-hands",
        sT: [],
      },
      {
        t: "fal fa-praying-hands",
        sT: [],
      },
      {
        t: "fad fa-praying-hands",
        sT: [],
      },
      {
        t: "fas fa-prescription",
        sT: [],
      },
      {
        t: "far fa-prescription",
        sT: [],
      },
      {
        t: "fal fa-prescription",
        sT: [],
      },
      {
        t: "fad fa-prescription",
        sT: [],
      },
      {
        t: "fas fa-prescription-bottle",
        sT: [],
      },
      {
        t: "far fa-prescription-bottle",
        sT: [],
      },
      {
        t: "fal fa-prescription-bottle",
        sT: [],
      },
      {
        t: "fad fa-prescription-bottle",
        sT: [],
      },
      {
        t: "fas fa-prescription-bottle-alt",
        sT: [],
      },
      {
        t: "far fa-prescription-bottle-alt",
        sT: [],
      },
      {
        t: "fal fa-prescription-bottle-alt",
        sT: [],
      },
      {
        t: "fad fa-prescription-bottle-alt",
        sT: [],
      },
      {
        t: "fas fa-presentation",
        sT: [],
      },
      {
        t: "far fa-presentation",
        sT: [],
      },
      {
        t: "fal fa-presentation",
        sT: [],
      },
      {
        t: "fad fa-presentation",
        sT: [],
      },
      {
        t: "fas fa-print",
        sT: [],
      },
      {
        t: "far fa-print",
        sT: [],
      },
      {
        t: "fal fa-print",
        sT: [],
      },
      {
        t: "fad fa-print",
        sT: [],
      },
      {
        t: "fas fa-print-search",
        sT: [],
      },
      {
        t: "far fa-print-search",
        sT: [],
      },
      {
        t: "fal fa-print-search",
        sT: [],
      },
      {
        t: "fad fa-print-search",
        sT: [],
      },
      {
        t: "fas fa-print-slash",
        sT: [],
      },
      {
        t: "far fa-print-slash",
        sT: [],
      },
      {
        t: "fal fa-print-slash",
        sT: [],
      },
      {
        t: "fad fa-print-slash",
        sT: [],
      },
      {
        t: "fas fa-procedures",
        sT: [],
      },
      {
        t: "far fa-procedures",
        sT: [],
      },
      {
        t: "fal fa-procedures",
        sT: [],
      },
      {
        t: "fad fa-procedures",
        sT: [],
      },
      {
        t: "fab fa-product-hunt",
        sT: [],
      },
      {
        t: "fas fa-project-diagram",
        sT: [],
      },
      {
        t: "far fa-project-diagram",
        sT: [],
      },
      {
        t: "fal fa-project-diagram",
        sT: [],
      },
      {
        t: "fad fa-project-diagram",
        sT: [],
      },
      {
        t: "fas fa-projector",
        sT: [],
      },
      {
        t: "far fa-projector",
        sT: [],
      },
      {
        t: "fal fa-projector",
        sT: [],
      },
      {
        t: "fad fa-projector",
        sT: [],
      },
      {
        t: "fal fa-pump-medical",
        sT: [],
      },
      {
        t: "far fa-pump-medical",
        sT: [],
      },
      {
        t: "fas fa-pump-medical",
        sT: [],
      },
      {
        t: "fad fa-pump-medical",
        sT: [],
      },
      {
        t: "fal fa-pump-soap",
        sT: [],
      },
      {
        t: "far fa-pump-soap",
        sT: [],
      },
      {
        t: "fas fa-pump-soap",
        sT: [],
      },
      {
        t: "fad fa-pump-soap",
        sT: [],
      },
      {
        t: "fas fa-pumpkin",
        sT: [],
      },
      {
        t: "far fa-pumpkin",
        sT: [],
      },
      {
        t: "fal fa-pumpkin",
        sT: [],
      },
      {
        t: "fad fa-pumpkin",
        sT: [],
      },
      {
        t: "fab fa-pushed",
        sT: [],
      },
      {
        t: "fas fa-puzzle-piece",
        sT: [],
      },
      {
        t: "far fa-puzzle-piece",
        sT: [],
      },
      {
        t: "fal fa-puzzle-piece",
        sT: [],
      },
      {
        t: "fad fa-puzzle-piece",
        sT: [],
      },
      {
        t: "fab fa-python",
        sT: [],
      },
      {
        t: "fab fa-qq",
        sT: [],
      },
      {
        t: "fas fa-qrcode",
        sT: [],
      },
      {
        t: "far fa-qrcode",
        sT: [],
      },
      {
        t: "fal fa-qrcode",
        sT: [],
      },
      {
        t: "fad fa-qrcode",
        sT: [],
      },
      {
        t: "fas fa-question",
        sT: [],
      },
      {
        t: "far fa-question",
        sT: [],
      },
      {
        t: "fal fa-question",
        sT: [],
      },
      {
        t: "fad fa-question",
        sT: [],
      },
      {
        t: "fas fa-question-circle",
        sT: [],
      },
      {
        t: "far fa-question-circle",
        sT: [],
      },
      {
        t: "fal fa-question-circle",
        sT: [],
      },
      {
        t: "fad fa-question-circle",
        sT: [],
      },
      {
        t: "fas fa-question-square",
        sT: [],
      },
      {
        t: "far fa-question-square",
        sT: [],
      },
      {
        t: "fal fa-question-square",
        sT: [],
      },
      {
        t: "fad fa-question-square",
        sT: [],
      },
      {
        t: "fas fa-quidditch",
        sT: [],
      },
      {
        t: "far fa-quidditch",
        sT: [],
      },
      {
        t: "fal fa-quidditch",
        sT: [],
      },
      {
        t: "fad fa-quidditch",
        sT: [],
      },
      {
        t: "fab fa-quinscape",
        sT: [],
      },
      {
        t: "fab fa-quora",
        sT: [],
      },
      {
        t: "fas fa-quote-left",
        sT: [],
      },
      {
        t: "far fa-quote-left",
        sT: [],
      },
      {
        t: "fal fa-quote-left",
        sT: [],
      },
      {
        t: "fad fa-quote-left",
        sT: [],
      },
      {
        t: "fas fa-quote-right",
        sT: [],
      },
      {
        t: "far fa-quote-right",
        sT: [],
      },
      {
        t: "fal fa-quote-right",
        sT: [],
      },
      {
        t: "fad fa-quote-right",
        sT: [],
      },
      {
        t: "fas fa-quran",
        sT: [],
      },
      {
        t: "far fa-quran",
        sT: [],
      },
      {
        t: "fal fa-quran",
        sT: [],
      },
      {
        t: "fad fa-quran",
        sT: [],
      },
      {
        t: "fab fa-r-project",
        sT: [],
      },
      {
        t: "fas fa-rabbit",
        sT: [],
      },
      {
        t: "far fa-rabbit",
        sT: [],
      },
      {
        t: "fal fa-rabbit",
        sT: [],
      },
      {
        t: "fad fa-rabbit",
        sT: [],
      },
      {
        t: "fas fa-rabbit-fast",
        sT: [],
      },
      {
        t: "far fa-rabbit-fast",
        sT: [],
      },
      {
        t: "fal fa-rabbit-fast",
        sT: [],
      },
      {
        t: "fad fa-rabbit-fast",
        sT: [],
      },
      {
        t: "fas fa-racquet",
        sT: [],
      },
      {
        t: "far fa-racquet",
        sT: [],
      },
      {
        t: "fal fa-racquet",
        sT: [],
      },
      {
        t: "fad fa-racquet",
        sT: [],
      },
      {
        t: "fas fa-radar",
        sT: [],
      },
      {
        t: "far fa-radar",
        sT: [],
      },
      {
        t: "fal fa-radar",
        sT: [],
      },
      {
        t: "fad fa-radar",
        sT: [],
      },
      {
        t: "fas fa-radiation",
        sT: [],
      },
      {
        t: "far fa-radiation",
        sT: [],
      },
      {
        t: "fal fa-radiation",
        sT: [],
      },
      {
        t: "fad fa-radiation",
        sT: [],
      },
      {
        t: "fas fa-radiation-alt",
        sT: [],
      },
      {
        t: "far fa-radiation-alt",
        sT: [],
      },
      {
        t: "fal fa-radiation-alt",
        sT: [],
      },
      {
        t: "fad fa-radiation-alt",
        sT: [],
      },
      {
        t: "fas fa-radio",
        sT: [],
      },
      {
        t: "far fa-radio",
        sT: [],
      },
      {
        t: "fal fa-radio",
        sT: [],
      },
      {
        t: "fad fa-radio",
        sT: [],
      },
      {
        t: "fas fa-radio-alt",
        sT: [],
      },
      {
        t: "far fa-radio-alt",
        sT: [],
      },
      {
        t: "fal fa-radio-alt",
        sT: [],
      },
      {
        t: "fad fa-radio-alt",
        sT: [],
      },
      {
        t: "fas fa-rainbow",
        sT: [],
      },
      {
        t: "far fa-rainbow",
        sT: [],
      },
      {
        t: "fal fa-rainbow",
        sT: [],
      },
      {
        t: "fad fa-rainbow",
        sT: [],
      },
      {
        t: "fas fa-raindrops",
        sT: [],
      },
      {
        t: "far fa-raindrops",
        sT: [],
      },
      {
        t: "fal fa-raindrops",
        sT: [],
      },
      {
        t: "fad fa-raindrops",
        sT: [],
      },
      {
        t: "fas fa-ram",
        sT: [],
      },
      {
        t: "far fa-ram",
        sT: [],
      },
      {
        t: "fal fa-ram",
        sT: [],
      },
      {
        t: "fad fa-ram",
        sT: [],
      },
      {
        t: "fas fa-ramp-loading",
        sT: [],
      },
      {
        t: "far fa-ramp-loading",
        sT: [],
      },
      {
        t: "fal fa-ramp-loading",
        sT: [],
      },
      {
        t: "fad fa-ramp-loading",
        sT: [],
      },
      {
        t: "fas fa-random",
        sT: [],
      },
      {
        t: "far fa-random",
        sT: [],
      },
      {
        t: "fal fa-random",
        sT: [],
      },
      {
        t: "fad fa-random",
        sT: [],
      },
      {
        t: "fab fa-raspberry-pi",
        sT: [],
      },
      {
        t: "fab fa-ravelry",
        sT: [],
      },
      {
        t: "fas fa-raygun",
        sT: [],
      },
      {
        t: "far fa-raygun",
        sT: [],
      },
      {
        t: "fal fa-raygun",
        sT: [],
      },
      {
        t: "fad fa-raygun",
        sT: [],
      },
      {
        t: "fab fa-react",
        sT: [],
      },
      {
        t: "fab fa-reacteurope",
        sT: [],
      },
      {
        t: "fab fa-readme",
        sT: [],
      },
      {
        t: "fab fa-rebel",
        sT: [],
      },
      {
        t: "fas fa-receipt",
        sT: [],
      },
      {
        t: "far fa-receipt",
        sT: [],
      },
      {
        t: "fal fa-receipt",
        sT: [],
      },
      {
        t: "fad fa-receipt",
        sT: [],
      },
      {
        t: "fas fa-record-vinyl",
        sT: [],
      },
      {
        t: "far fa-record-vinyl",
        sT: [],
      },
      {
        t: "fal fa-record-vinyl",
        sT: [],
      },
      {
        t: "fad fa-record-vinyl",
        sT: [],
      },
      {
        t: "fas fa-rectangle-landscape",
        sT: [],
      },
      {
        t: "far fa-rectangle-landscape",
        sT: [],
      },
      {
        t: "fal fa-rectangle-landscape",
        sT: [],
      },
      {
        t: "fad fa-rectangle-landscape",
        sT: [],
      },
      {
        t: "fas fa-rectangle-portrait",
        sT: [],
      },
      {
        t: "far fa-rectangle-portrait",
        sT: [],
      },
      {
        t: "fal fa-rectangle-portrait",
        sT: [],
      },
      {
        t: "fad fa-rectangle-portrait",
        sT: [],
      },
      {
        t: "fas fa-rectangle-wide",
        sT: [],
      },
      {
        t: "far fa-rectangle-wide",
        sT: [],
      },
      {
        t: "fal fa-rectangle-wide",
        sT: [],
      },
      {
        t: "fad fa-rectangle-wide",
        sT: [],
      },
      {
        t: "fas fa-recycle",
        sT: [],
      },
      {
        t: "far fa-recycle",
        sT: [],
      },
      {
        t: "fal fa-recycle",
        sT: [],
      },
      {
        t: "fad fa-recycle",
        sT: [],
      },
      {
        t: "fab fa-red-river",
        sT: [],
      },
      {
        t: "fab fa-reddit",
        sT: [],
      },
      {
        t: "fab fa-reddit-alien",
        sT: [],
      },
      {
        t: "fab fa-reddit-square",
        sT: [],
      },
      {
        t: "fab fa-redhat",
        sT: [],
      },
      {
        t: "fas fa-redo",
        sT: [],
      },
      {
        t: "far fa-redo",
        sT: [],
      },
      {
        t: "fal fa-redo",
        sT: [],
      },
      {
        t: "fad fa-redo",
        sT: [],
      },
      {
        t: "fas fa-redo-alt",
        sT: [],
      },
      {
        t: "far fa-redo-alt",
        sT: [],
      },
      {
        t: "fal fa-redo-alt",
        sT: [],
      },
      {
        t: "fad fa-redo-alt",
        sT: [],
      },
      {
        t: "fas fa-refrigerator",
        sT: [],
      },
      {
        t: "far fa-refrigerator",
        sT: [],
      },
      {
        t: "fal fa-refrigerator",
        sT: [],
      },
      {
        t: "fad fa-refrigerator",
        sT: [],
      },
      {
        t: "fas fa-registered",
        sT: [],
      },
      {
        t: "far fa-registered",
        sT: [],
      },
      {
        t: "fal fa-registered",
        sT: [],
      },
      {
        t: "fad fa-registered",
        sT: [],
      },
      {
        t: "fas fa-remove-format",
        sT: [],
      },
      {
        t: "far fa-remove-format",
        sT: [],
      },
      {
        t: "fal fa-remove-format",
        sT: [],
      },
      {
        t: "fad fa-remove-format",
        sT: [],
      },
      {
        t: "fab fa-renren",
        sT: [],
      },
      {
        t: "fas fa-repeat",
        sT: [],
      },
      {
        t: "far fa-repeat",
        sT: [],
      },
      {
        t: "fal fa-repeat",
        sT: [],
      },
      {
        t: "fad fa-repeat",
        sT: [],
      },
      {
        t: "fas fa-repeat-1",
        sT: [],
      },
      {
        t: "far fa-repeat-1",
        sT: [],
      },
      {
        t: "fal fa-repeat-1",
        sT: [],
      },
      {
        t: "fad fa-repeat-1",
        sT: [],
      },
      {
        t: "fas fa-repeat-1-alt",
        sT: [],
      },
      {
        t: "far fa-repeat-1-alt",
        sT: [],
      },
      {
        t: "fal fa-repeat-1-alt",
        sT: [],
      },
      {
        t: "fad fa-repeat-1-alt",
        sT: [],
      },
      {
        t: "fas fa-repeat-alt",
        sT: [],
      },
      {
        t: "far fa-repeat-alt",
        sT: [],
      },
      {
        t: "fal fa-repeat-alt",
        sT: [],
      },
      {
        t: "fad fa-repeat-alt",
        sT: [],
      },
      {
        t: "fas fa-reply",
        sT: [],
      },
      {
        t: "far fa-reply",
        sT: [],
      },
      {
        t: "fal fa-reply",
        sT: [],
      },
      {
        t: "fad fa-reply",
        sT: [],
      },
      {
        t: "fas fa-reply-all",
        sT: [],
      },
      {
        t: "far fa-reply-all",
        sT: [],
      },
      {
        t: "fal fa-reply-all",
        sT: [],
      },
      {
        t: "fad fa-reply-all",
        sT: [],
      },
      {
        t: "fab fa-replyd",
        sT: [],
      },
      {
        t: "fas fa-republican",
        sT: [],
      },
      {
        t: "far fa-republican",
        sT: [],
      },
      {
        t: "fal fa-republican",
        sT: [],
      },
      {
        t: "fad fa-republican",
        sT: [],
      },
      {
        t: "fab fa-researchgate",
        sT: [],
      },
      {
        t: "fab fa-resolving",
        sT: [],
      },
      {
        t: "fas fa-restroom",
        sT: [],
      },
      {
        t: "far fa-restroom",
        sT: [],
      },
      {
        t: "fal fa-restroom",
        sT: [],
      },
      {
        t: "fad fa-restroom",
        sT: [],
      },
      {
        t: "fas fa-retweet",
        sT: [],
      },
      {
        t: "far fa-retweet",
        sT: [],
      },
      {
        t: "fal fa-retweet",
        sT: [],
      },
      {
        t: "fad fa-retweet",
        sT: [],
      },
      {
        t: "fas fa-retweet-alt",
        sT: [],
      },
      {
        t: "far fa-retweet-alt",
        sT: [],
      },
      {
        t: "fal fa-retweet-alt",
        sT: [],
      },
      {
        t: "fad fa-retweet-alt",
        sT: [],
      },
      {
        t: "fab fa-rev",
        sT: [],
      },
      {
        t: "fas fa-ribbon",
        sT: [],
      },
      {
        t: "far fa-ribbon",
        sT: [],
      },
      {
        t: "fal fa-ribbon",
        sT: [],
      },
      {
        t: "fad fa-ribbon",
        sT: [],
      },
      {
        t: "fas fa-ring",
        sT: [],
      },
      {
        t: "far fa-ring",
        sT: [],
      },
      {
        t: "fal fa-ring",
        sT: [],
      },
      {
        t: "fad fa-ring",
        sT: [],
      },
      {
        t: "fas fa-rings-wedding",
        sT: [],
      },
      {
        t: "far fa-rings-wedding",
        sT: [],
      },
      {
        t: "fal fa-rings-wedding",
        sT: [],
      },
      {
        t: "fad fa-rings-wedding",
        sT: [],
      },
      {
        t: "fas fa-road",
        sT: [],
      },
      {
        t: "far fa-road",
        sT: [],
      },
      {
        t: "fal fa-road",
        sT: [],
      },
      {
        t: "fad fa-road",
        sT: [],
      },
      {
        t: "fas fa-robot",
        sT: [],
      },
      {
        t: "far fa-robot",
        sT: [],
      },
      {
        t: "fal fa-robot",
        sT: [],
      },
      {
        t: "fad fa-robot",
        sT: [],
      },
      {
        t: "fas fa-rocket",
        sT: [],
      },
      {
        t: "far fa-rocket",
        sT: [],
      },
      {
        t: "fal fa-rocket",
        sT: [],
      },
      {
        t: "fad fa-rocket",
        sT: [],
      },
      {
        t: "fas fa-rocket-launch",
        sT: [],
      },
      {
        t: "far fa-rocket-launch",
        sT: [],
      },
      {
        t: "fal fa-rocket-launch",
        sT: [],
      },
      {
        t: "fad fa-rocket-launch",
        sT: [],
      },
      {
        t: "fab fa-rocketchat",
        sT: [],
      },
      {
        t: "fab fa-rockrms",
        sT: [],
      },
      {
        t: "fas fa-route",
        sT: [],
      },
      {
        t: "far fa-route",
        sT: [],
      },
      {
        t: "fal fa-route",
        sT: [],
      },
      {
        t: "fad fa-route",
        sT: [],
      },
      {
        t: "fas fa-route-highway",
        sT: [],
      },
      {
        t: "far fa-route-highway",
        sT: [],
      },
      {
        t: "fal fa-route-highway",
        sT: [],
      },
      {
        t: "fad fa-route-highway",
        sT: [],
      },
      {
        t: "fas fa-route-interstate",
        sT: [],
      },
      {
        t: "far fa-route-interstate",
        sT: [],
      },
      {
        t: "fal fa-route-interstate",
        sT: [],
      },
      {
        t: "fad fa-route-interstate",
        sT: [],
      },
      {
        t: "fas fa-router",
        sT: [],
      },
      {
        t: "far fa-router",
        sT: [],
      },
      {
        t: "fal fa-router",
        sT: [],
      },
      {
        t: "fad fa-router",
        sT: [],
      },
      {
        t: "fas fa-rss",
        sT: [],
      },
      {
        t: "far fa-rss",
        sT: [],
      },
      {
        t: "fal fa-rss",
        sT: [],
      },
      {
        t: "fad fa-rss",
        sT: [],
      },
      {
        t: "fas fa-rss-square",
        sT: [],
      },
      {
        t: "far fa-rss-square",
        sT: [],
      },
      {
        t: "fal fa-rss-square",
        sT: [],
      },
      {
        t: "fad fa-rss-square",
        sT: [],
      },
      {
        t: "fas fa-ruble-sign",
        sT: [],
      },
      {
        t: "far fa-ruble-sign",
        sT: [],
      },
      {
        t: "fal fa-ruble-sign",
        sT: [],
      },
      {
        t: "fad fa-ruble-sign",
        sT: [],
      },
      {
        t: "fas fa-ruler",
        sT: [],
      },
      {
        t: "far fa-ruler",
        sT: [],
      },
      {
        t: "fal fa-ruler",
        sT: [],
      },
      {
        t: "fad fa-ruler",
        sT: [],
      },
      {
        t: "fas fa-ruler-combined",
        sT: [],
      },
      {
        t: "far fa-ruler-combined",
        sT: [],
      },
      {
        t: "fal fa-ruler-combined",
        sT: [],
      },
      {
        t: "fad fa-ruler-combined",
        sT: [],
      },
      {
        t: "fas fa-ruler-horizontal",
        sT: [],
      },
      {
        t: "far fa-ruler-horizontal",
        sT: [],
      },
      {
        t: "fal fa-ruler-horizontal",
        sT: [],
      },
      {
        t: "fad fa-ruler-horizontal",
        sT: [],
      },
      {
        t: "fas fa-ruler-triangle",
        sT: [],
      },
      {
        t: "far fa-ruler-triangle",
        sT: [],
      },
      {
        t: "fal fa-ruler-triangle",
        sT: [],
      },
      {
        t: "fad fa-ruler-triangle",
        sT: [],
      },
      {
        t: "fas fa-ruler-vertical",
        sT: [],
      },
      {
        t: "far fa-ruler-vertical",
        sT: [],
      },
      {
        t: "fal fa-ruler-vertical",
        sT: [],
      },
      {
        t: "fad fa-ruler-vertical",
        sT: [],
      },
      {
        t: "fas fa-running",
        sT: [],
      },
      {
        t: "far fa-running",
        sT: [],
      },
      {
        t: "fal fa-running",
        sT: [],
      },
      {
        t: "fad fa-running",
        sT: [],
      },
      {
        t: "fas fa-rupee-sign",
        sT: [],
      },
      {
        t: "far fa-rupee-sign",
        sT: [],
      },
      {
        t: "fal fa-rupee-sign",
        sT: [],
      },
      {
        t: "fad fa-rupee-sign",
        sT: [],
      },
      {
        t: "fab fa-rust",
        sT: [],
      },
      {
        t: "fas fa-rv",
        sT: [],
      },
      {
        t: "far fa-rv",
        sT: [],
      },
      {
        t: "fal fa-rv",
        sT: [],
      },
      {
        t: "fad fa-rv",
        sT: [],
      },
      {
        t: "fas fa-sack",
        sT: [],
      },
      {
        t: "far fa-sack",
        sT: [],
      },
      {
        t: "fal fa-sack",
        sT: [],
      },
      {
        t: "fad fa-sack",
        sT: [],
      },
      {
        t: "fas fa-sack-dollar",
        sT: [],
      },
      {
        t: "far fa-sack-dollar",
        sT: [],
      },
      {
        t: "fal fa-sack-dollar",
        sT: [],
      },
      {
        t: "fad fa-sack-dollar",
        sT: [],
      },
      {
        t: "fas fa-sad-cry",
        sT: [],
      },
      {
        t: "far fa-sad-cry",
        sT: [],
      },
      {
        t: "fal fa-sad-cry",
        sT: [],
      },
      {
        t: "fad fa-sad-cry",
        sT: [],
      },
      {
        t: "fas fa-sad-tear",
        sT: [],
      },
      {
        t: "far fa-sad-tear",
        sT: [],
      },
      {
        t: "fal fa-sad-tear",
        sT: [],
      },
      {
        t: "fad fa-sad-tear",
        sT: [],
      },
      {
        t: "fab fa-safari",
        sT: [],
      },
      {
        t: "fas fa-salad",
        sT: [],
      },
      {
        t: "far fa-salad",
        sT: [],
      },
      {
        t: "fal fa-salad",
        sT: [],
      },
      {
        t: "fad fa-salad",
        sT: [],
      },
      {
        t: "fab fa-salesforce",
        sT: [],
      },
      {
        t: "fas fa-sandwich",
        sT: [],
      },
      {
        t: "far fa-sandwich",
        sT: [],
      },
      {
        t: "fal fa-sandwich",
        sT: [],
      },
      {
        t: "fad fa-sandwich",
        sT: [],
      },
      {
        t: "fab fa-sass",
        sT: [],
      },
      {
        t: "fas fa-satellite",
        sT: [],
      },
      {
        t: "far fa-satellite",
        sT: [],
      },
      {
        t: "fal fa-satellite",
        sT: [],
      },
      {
        t: "fad fa-satellite",
        sT: [],
      },
      {
        t: "fas fa-satellite-dish",
        sT: [],
      },
      {
        t: "far fa-satellite-dish",
        sT: [],
      },
      {
        t: "fal fa-satellite-dish",
        sT: [],
      },
      {
        t: "fad fa-satellite-dish",
        sT: [],
      },
      {
        t: "fas fa-sausage",
        sT: [],
      },
      {
        t: "far fa-sausage",
        sT: [],
      },
      {
        t: "fal fa-sausage",
        sT: [],
      },
      {
        t: "fad fa-sausage",
        sT: [],
      },
      {
        t: "fas fa-save",
        sT: [],
      },
      {
        t: "far fa-save",
        sT: [],
      },
      {
        t: "fal fa-save",
        sT: [],
      },
      {
        t: "fad fa-save",
        sT: [],
      },
      {
        t: "fas fa-sax-hot",
        sT: [],
      },
      {
        t: "far fa-sax-hot",
        sT: [],
      },
      {
        t: "fal fa-sax-hot",
        sT: [],
      },
      {
        t: "fad fa-sax-hot",
        sT: [],
      },
      {
        t: "fas fa-saxophone",
        sT: [],
      },
      {
        t: "far fa-saxophone",
        sT: [],
      },
      {
        t: "fal fa-saxophone",
        sT: [],
      },
      {
        t: "fad fa-saxophone",
        sT: [],
      },
      {
        t: "fas fa-scalpel",
        sT: [],
      },
      {
        t: "far fa-scalpel",
        sT: [],
      },
      {
        t: "fal fa-scalpel",
        sT: [],
      },
      {
        t: "fad fa-scalpel",
        sT: [],
      },
      {
        t: "fas fa-scalpel-path",
        sT: [],
      },
      {
        t: "far fa-scalpel-path",
        sT: [],
      },
      {
        t: "fal fa-scalpel-path",
        sT: [],
      },
      {
        t: "fad fa-scalpel-path",
        sT: [],
      },
      {
        t: "fas fa-scanner",
        sT: [],
      },
      {
        t: "far fa-scanner",
        sT: [],
      },
      {
        t: "fal fa-scanner",
        sT: [],
      },
      {
        t: "fad fa-scanner",
        sT: [],
      },
      {
        t: "fas fa-scanner-image",
        sT: [],
      },
      {
        t: "far fa-scanner-image",
        sT: [],
      },
      {
        t: "fal fa-scanner-image",
        sT: [],
      },
      {
        t: "fad fa-scanner-image",
        sT: [],
      },
      {
        t: "fas fa-scanner-keyboard",
        sT: [],
      },
      {
        t: "far fa-scanner-keyboard",
        sT: [],
      },
      {
        t: "fal fa-scanner-keyboard",
        sT: [],
      },
      {
        t: "fad fa-scanner-keyboard",
        sT: [],
      },
      {
        t: "fas fa-scanner-touchscreen",
        sT: [],
      },
      {
        t: "far fa-scanner-touchscreen",
        sT: [],
      },
      {
        t: "fal fa-scanner-touchscreen",
        sT: [],
      },
      {
        t: "fad fa-scanner-touchscreen",
        sT: [],
      },
      {
        t: "fas fa-scarecrow",
        sT: [],
      },
      {
        t: "far fa-scarecrow",
        sT: [],
      },
      {
        t: "fal fa-scarecrow",
        sT: [],
      },
      {
        t: "fad fa-scarecrow",
        sT: [],
      },
      {
        t: "fas fa-scarf",
        sT: [],
      },
      {
        t: "far fa-scarf",
        sT: [],
      },
      {
        t: "fal fa-scarf",
        sT: [],
      },
      {
        t: "fad fa-scarf",
        sT: [],
      },
      {
        t: "fab fa-schlix",
        sT: [],
      },
      {
        t: "fas fa-school",
        sT: [],
      },
      {
        t: "far fa-school",
        sT: [],
      },
      {
        t: "fal fa-school",
        sT: [],
      },
      {
        t: "fad fa-school",
        sT: [],
      },
      {
        t: "fas fa-screwdriver",
        sT: [],
      },
      {
        t: "far fa-screwdriver",
        sT: [],
      },
      {
        t: "fal fa-screwdriver",
        sT: [],
      },
      {
        t: "fad fa-screwdriver",
        sT: [],
      },
      {
        t: "fab fa-scribd",
        sT: [],
      },
      {
        t: "fas fa-scroll",
        sT: [],
      },
      {
        t: "far fa-scroll",
        sT: [],
      },
      {
        t: "fal fa-scroll",
        sT: [],
      },
      {
        t: "fad fa-scroll",
        sT: [],
      },
      {
        t: "fas fa-scroll-old",
        sT: [],
      },
      {
        t: "far fa-scroll-old",
        sT: [],
      },
      {
        t: "fal fa-scroll-old",
        sT: [],
      },
      {
        t: "fad fa-scroll-old",
        sT: [],
      },
      {
        t: "fas fa-scrubber",
        sT: [],
      },
      {
        t: "far fa-scrubber",
        sT: [],
      },
      {
        t: "fal fa-scrubber",
        sT: [],
      },
      {
        t: "fad fa-scrubber",
        sT: [],
      },
      {
        t: "fas fa-scythe",
        sT: [],
      },
      {
        t: "far fa-scythe",
        sT: [],
      },
      {
        t: "fal fa-scythe",
        sT: [],
      },
      {
        t: "fad fa-scythe",
        sT: [],
      },
      {
        t: "fas fa-sd-card",
        sT: [],
      },
      {
        t: "far fa-sd-card",
        sT: [],
      },
      {
        t: "fal fa-sd-card",
        sT: [],
      },
      {
        t: "fad fa-sd-card",
        sT: [],
      },
      {
        t: "fas fa-search",
        sT: [],
      },
      {
        t: "far fa-search",
        sT: [],
      },
      {
        t: "fal fa-search",
        sT: [],
      },
      {
        t: "fad fa-search",
        sT: [],
      },
      {
        t: "fas fa-search-dollar",
        sT: [],
      },
      {
        t: "far fa-search-dollar",
        sT: [],
      },
      {
        t: "fal fa-search-dollar",
        sT: [],
      },
      {
        t: "fad fa-search-dollar",
        sT: [],
      },
      {
        t: "fas fa-search-location",
        sT: [],
      },
      {
        t: "far fa-search-location",
        sT: [],
      },
      {
        t: "fal fa-search-location",
        sT: [],
      },
      {
        t: "fad fa-search-location",
        sT: [],
      },
      {
        t: "fas fa-search-minus",
        sT: [],
      },
      {
        t: "far fa-search-minus",
        sT: [],
      },
      {
        t: "fal fa-search-minus",
        sT: [],
      },
      {
        t: "fad fa-search-minus",
        sT: [],
      },
      {
        t: "fas fa-search-plus",
        sT: [],
      },
      {
        t: "far fa-search-plus",
        sT: [],
      },
      {
        t: "fal fa-search-plus",
        sT: [],
      },
      {
        t: "fad fa-search-plus",
        sT: [],
      },
      {
        t: "fab fa-searchengin",
        sT: [],
      },
      {
        t: "fas fa-seedling",
        sT: [],
      },
      {
        t: "far fa-seedling",
        sT: [],
      },
      {
        t: "fal fa-seedling",
        sT: [],
      },
      {
        t: "fad fa-seedling",
        sT: [],
      },
      {
        t: "fab fa-sellcast",
        sT: [],
      },
      {
        t: "fab fa-sellsy",
        sT: [],
      },
      {
        t: "fas fa-send-back",
        sT: [],
      },
      {
        t: "far fa-send-back",
        sT: [],
      },
      {
        t: "fal fa-send-back",
        sT: [],
      },
      {
        t: "fad fa-send-back",
        sT: [],
      },
      {
        t: "fas fa-send-backward",
        sT: [],
      },
      {
        t: "far fa-send-backward",
        sT: [],
      },
      {
        t: "fal fa-send-backward",
        sT: [],
      },
      {
        t: "fad fa-send-backward",
        sT: [],
      },
      {
        t: "fas fa-sensor",
        sT: [],
      },
      {
        t: "far fa-sensor",
        sT: [],
      },
      {
        t: "fal fa-sensor",
        sT: [],
      },
      {
        t: "fad fa-sensor",
        sT: [],
      },
      {
        t: "fas fa-sensor-alert",
        sT: [],
      },
      {
        t: "far fa-sensor-alert",
        sT: [],
      },
      {
        t: "fal fa-sensor-alert",
        sT: [],
      },
      {
        t: "fad fa-sensor-alert",
        sT: [],
      },
      {
        t: "fas fa-sensor-fire",
        sT: [],
      },
      {
        t: "far fa-sensor-fire",
        sT: [],
      },
      {
        t: "fal fa-sensor-fire",
        sT: [],
      },
      {
        t: "fad fa-sensor-fire",
        sT: [],
      },
      {
        t: "fas fa-sensor-on",
        sT: [],
      },
      {
        t: "far fa-sensor-on",
        sT: [],
      },
      {
        t: "fal fa-sensor-on",
        sT: [],
      },
      {
        t: "fad fa-sensor-on",
        sT: [],
      },
      {
        t: "fas fa-sensor-smoke",
        sT: [],
      },
      {
        t: "far fa-sensor-smoke",
        sT: [],
      },
      {
        t: "fal fa-sensor-smoke",
        sT: [],
      },
      {
        t: "fad fa-sensor-smoke",
        sT: [],
      },
      {
        t: "fas fa-server",
        sT: [],
      },
      {
        t: "far fa-server",
        sT: [],
      },
      {
        t: "fal fa-server",
        sT: [],
      },
      {
        t: "fad fa-server",
        sT: [],
      },
      {
        t: "fab fa-servicestack",
        sT: [],
      },
      {
        t: "fas fa-shapes",
        sT: [],
      },
      {
        t: "far fa-shapes",
        sT: [],
      },
      {
        t: "fal fa-shapes",
        sT: [],
      },
      {
        t: "fad fa-shapes",
        sT: [],
      },
      {
        t: "fas fa-share",
        sT: [],
      },
      {
        t: "far fa-share",
        sT: [],
      },
      {
        t: "fal fa-share",
        sT: [],
      },
      {
        t: "fad fa-share",
        sT: [],
      },
      {
        t: "fas fa-share-all",
        sT: [],
      },
      {
        t: "far fa-share-all",
        sT: [],
      },
      {
        t: "fal fa-share-all",
        sT: [],
      },
      {
        t: "fad fa-share-all",
        sT: [],
      },
      {
        t: "fas fa-share-alt",
        sT: [],
      },
      {
        t: "far fa-share-alt",
        sT: [],
      },
      {
        t: "fal fa-share-alt",
        sT: [],
      },
      {
        t: "fad fa-share-alt",
        sT: [],
      },
      {
        t: "fas fa-share-alt-square",
        sT: [],
      },
      {
        t: "far fa-share-alt-square",
        sT: [],
      },
      {
        t: "fal fa-share-alt-square",
        sT: [],
      },
      {
        t: "fad fa-share-alt-square",
        sT: [],
      },
      {
        t: "fas fa-share-square",
        sT: [],
      },
      {
        t: "far fa-share-square",
        sT: [],
      },
      {
        t: "fal fa-share-square",
        sT: [],
      },
      {
        t: "fad fa-share-square",
        sT: [],
      },
      {
        t: "fas fa-sheep",
        sT: [],
      },
      {
        t: "far fa-sheep",
        sT: [],
      },
      {
        t: "fal fa-sheep",
        sT: [],
      },
      {
        t: "fad fa-sheep",
        sT: [],
      },
      {
        t: "fas fa-shekel-sign",
        sT: [],
      },
      {
        t: "far fa-shekel-sign",
        sT: [],
      },
      {
        t: "fal fa-shekel-sign",
        sT: [],
      },
      {
        t: "fad fa-shekel-sign",
        sT: [],
      },
      {
        t: "fas fa-shield",
        sT: [],
      },
      {
        t: "far fa-shield",
        sT: [],
      },
      {
        t: "fal fa-shield",
        sT: [],
      },
      {
        t: "fad fa-shield",
        sT: [],
      },
      {
        t: "fas fa-shield-alt",
        sT: [],
      },
      {
        t: "far fa-shield-alt",
        sT: [],
      },
      {
        t: "fal fa-shield-alt",
        sT: [],
      },
      {
        t: "fad fa-shield-alt",
        sT: [],
      },
      {
        t: "fas fa-shield-check",
        sT: [],
      },
      {
        t: "far fa-shield-check",
        sT: [],
      },
      {
        t: "fal fa-shield-check",
        sT: [],
      },
      {
        t: "fad fa-shield-check",
        sT: [],
      },
      {
        t: "fas fa-shield-cross",
        sT: [],
      },
      {
        t: "far fa-shield-cross",
        sT: [],
      },
      {
        t: "fal fa-shield-cross",
        sT: [],
      },
      {
        t: "fad fa-shield-cross",
        sT: [],
      },
      {
        t: "fal fa-shield-virus",
        sT: [],
      },
      {
        t: "far fa-shield-virus",
        sT: [],
      },
      {
        t: "fas fa-shield-virus",
        sT: [],
      },
      {
        t: "fad fa-shield-virus",
        sT: [],
      },
      {
        t: "fas fa-ship",
        sT: [],
      },
      {
        t: "far fa-ship",
        sT: [],
      },
      {
        t: "fal fa-ship",
        sT: [],
      },
      {
        t: "fad fa-ship",
        sT: [],
      },
      {
        t: "fas fa-shipping-fast",
        sT: [],
      },
      {
        t: "far fa-shipping-fast",
        sT: [],
      },
      {
        t: "fal fa-shipping-fast",
        sT: [],
      },
      {
        t: "fad fa-shipping-fast",
        sT: [],
      },
      {
        t: "fas fa-shipping-timed",
        sT: [],
      },
      {
        t: "far fa-shipping-timed",
        sT: [],
      },
      {
        t: "fal fa-shipping-timed",
        sT: [],
      },
      {
        t: "fad fa-shipping-timed",
        sT: [],
      },
      {
        t: "fab fa-shirtsinbulk",
        sT: [],
      },
      {
        t: "fas fa-shish-kebab",
        sT: [],
      },
      {
        t: "far fa-shish-kebab",
        sT: [],
      },
      {
        t: "fal fa-shish-kebab",
        sT: [],
      },
      {
        t: "fad fa-shish-kebab",
        sT: [],
      },
      {
        t: "fas fa-shoe-prints",
        sT: [],
      },
      {
        t: "far fa-shoe-prints",
        sT: [],
      },
      {
        t: "fal fa-shoe-prints",
        sT: [],
      },
      {
        t: "fad fa-shoe-prints",
        sT: [],
      },
      {
        t: "fab fa-shopify",
        sT: [],
      },
      {
        t: "fas fa-shopping-bag",
        sT: [],
      },
      {
        t: "far fa-shopping-bag",
        sT: [],
      },
      {
        t: "fal fa-shopping-bag",
        sT: [],
      },
      {
        t: "fad fa-shopping-bag",
        sT: [],
      },
      {
        t: "fas fa-shopping-basket",
        sT: [],
      },
      {
        t: "far fa-shopping-basket",
        sT: [],
      },
      {
        t: "fal fa-shopping-basket",
        sT: [],
      },
      {
        t: "fad fa-shopping-basket",
        sT: [],
      },
      {
        t: "fas fa-shopping-cart",
        sT: [],
      },
      {
        t: "far fa-shopping-cart",
        sT: [],
      },
      {
        t: "fal fa-shopping-cart",
        sT: [],
      },
      {
        t: "fad fa-shopping-cart",
        sT: [],
      },
      {
        t: "fab fa-shopware",
        sT: [],
      },
      {
        t: "fas fa-shovel",
        sT: [],
      },
      {
        t: "far fa-shovel",
        sT: [],
      },
      {
        t: "fal fa-shovel",
        sT: [],
      },
      {
        t: "fad fa-shovel",
        sT: [],
      },
      {
        t: "fas fa-shovel-snow",
        sT: [],
      },
      {
        t: "far fa-shovel-snow",
        sT: [],
      },
      {
        t: "fal fa-shovel-snow",
        sT: [],
      },
      {
        t: "fad fa-shovel-snow",
        sT: [],
      },
      {
        t: "fas fa-shower",
        sT: [],
      },
      {
        t: "far fa-shower",
        sT: [],
      },
      {
        t: "fal fa-shower",
        sT: [],
      },
      {
        t: "fad fa-shower",
        sT: [],
      },
      {
        t: "fas fa-shredder",
        sT: [],
      },
      {
        t: "far fa-shredder",
        sT: [],
      },
      {
        t: "fal fa-shredder",
        sT: [],
      },
      {
        t: "fad fa-shredder",
        sT: [],
      },
      {
        t: "fas fa-shuttle-van",
        sT: [],
      },
      {
        t: "far fa-shuttle-van",
        sT: [],
      },
      {
        t: "fal fa-shuttle-van",
        sT: [],
      },
      {
        t: "fad fa-shuttle-van",
        sT: [],
      },
      {
        t: "fas fa-shuttlecock",
        sT: [],
      },
      {
        t: "far fa-shuttlecock",
        sT: [],
      },
      {
        t: "fal fa-shuttlecock",
        sT: [],
      },
      {
        t: "fad fa-shuttlecock",
        sT: [],
      },
      {
        t: "fas fa-sickle",
        sT: [],
      },
      {
        t: "far fa-sickle",
        sT: [],
      },
      {
        t: "fal fa-sickle",
        sT: [],
      },
      {
        t: "fad fa-sickle",
        sT: [],
      },
      {
        t: "fas fa-sigma",
        sT: [],
      },
      {
        t: "far fa-sigma",
        sT: [],
      },
      {
        t: "fal fa-sigma",
        sT: [],
      },
      {
        t: "fad fa-sigma",
        sT: [],
      },
      {
        t: "fas fa-sign",
        sT: [],
      },
      {
        t: "far fa-sign",
        sT: [],
      },
      {
        t: "fal fa-sign",
        sT: [],
      },
      {
        t: "fad fa-sign",
        sT: [],
      },
      {
        t: "fas fa-sign-in",
        sT: [],
      },
      {
        t: "far fa-sign-in",
        sT: [],
      },
      {
        t: "fal fa-sign-in",
        sT: [],
      },
      {
        t: "fad fa-sign-in",
        sT: [],
      },
      {
        t: "fas fa-sign-in-alt",
        sT: [],
      },
      {
        t: "far fa-sign-in-alt",
        sT: [],
      },
      {
        t: "fal fa-sign-in-alt",
        sT: [],
      },
      {
        t: "fad fa-sign-in-alt",
        sT: [],
      },
      {
        t: "fas fa-sign-language",
        sT: [],
      },
      {
        t: "far fa-sign-language",
        sT: [],
      },
      {
        t: "fal fa-sign-language",
        sT: [],
      },
      {
        t: "fad fa-sign-language",
        sT: [],
      },
      {
        t: "fas fa-sign-out",
        sT: [],
      },
      {
        t: "far fa-sign-out",
        sT: [],
      },
      {
        t: "fal fa-sign-out",
        sT: [],
      },
      {
        t: "fad fa-sign-out",
        sT: [],
      },
      {
        t: "fas fa-sign-out-alt",
        sT: [],
      },
      {
        t: "far fa-sign-out-alt",
        sT: [],
      },
      {
        t: "fal fa-sign-out-alt",
        sT: [],
      },
      {
        t: "fad fa-sign-out-alt",
        sT: [],
      },
      {
        t: "fas fa-signal",
        sT: [],
      },
      {
        t: "far fa-signal",
        sT: [],
      },
      {
        t: "fal fa-signal",
        sT: [],
      },
      {
        t: "fad fa-signal",
        sT: [],
      },
      {
        t: "fas fa-signal-1",
        sT: [],
      },
      {
        t: "far fa-signal-1",
        sT: [],
      },
      {
        t: "fal fa-signal-1",
        sT: [],
      },
      {
        t: "fad fa-signal-1",
        sT: [],
      },
      {
        t: "fas fa-signal-2",
        sT: [],
      },
      {
        t: "far fa-signal-2",
        sT: [],
      },
      {
        t: "fal fa-signal-2",
        sT: [],
      },
      {
        t: "fad fa-signal-2",
        sT: [],
      },
      {
        t: "fas fa-signal-3",
        sT: [],
      },
      {
        t: "far fa-signal-3",
        sT: [],
      },
      {
        t: "fal fa-signal-3",
        sT: [],
      },
      {
        t: "fad fa-signal-3",
        sT: [],
      },
      {
        t: "fas fa-signal-4",
        sT: [],
      },
      {
        t: "far fa-signal-4",
        sT: [],
      },
      {
        t: "fal fa-signal-4",
        sT: [],
      },
      {
        t: "fad fa-signal-4",
        sT: [],
      },
      {
        t: "fas fa-signal-alt",
        sT: [],
      },
      {
        t: "far fa-signal-alt",
        sT: [],
      },
      {
        t: "fal fa-signal-alt",
        sT: [],
      },
      {
        t: "fad fa-signal-alt",
        sT: [],
      },
      {
        t: "fas fa-signal-alt-1",
        sT: [],
      },
      {
        t: "far fa-signal-alt-1",
        sT: [],
      },
      {
        t: "fal fa-signal-alt-1",
        sT: [],
      },
      {
        t: "fad fa-signal-alt-1",
        sT: [],
      },
      {
        t: "fas fa-signal-alt-2",
        sT: [],
      },
      {
        t: "far fa-signal-alt-2",
        sT: [],
      },
      {
        t: "fal fa-signal-alt-2",
        sT: [],
      },
      {
        t: "fad fa-signal-alt-2",
        sT: [],
      },
      {
        t: "fas fa-signal-alt-3",
        sT: [],
      },
      {
        t: "far fa-signal-alt-3",
        sT: [],
      },
      {
        t: "fal fa-signal-alt-3",
        sT: [],
      },
      {
        t: "fad fa-signal-alt-3",
        sT: [],
      },
      {
        t: "fas fa-signal-alt-slash",
        sT: [],
      },
      {
        t: "far fa-signal-alt-slash",
        sT: [],
      },
      {
        t: "fal fa-signal-alt-slash",
        sT: [],
      },
      {
        t: "fad fa-signal-alt-slash",
        sT: [],
      },
      {
        t: "fas fa-signal-slash",
        sT: [],
      },
      {
        t: "far fa-signal-slash",
        sT: [],
      },
      {
        t: "fal fa-signal-slash",
        sT: [],
      },
      {
        t: "fad fa-signal-slash",
        sT: [],
      },
      {
        t: "fas fa-signal-stream",
        sT: [],
      },
      {
        t: "far fa-signal-stream",
        sT: [],
      },
      {
        t: "fal fa-signal-stream",
        sT: [],
      },
      {
        t: "fad fa-signal-stream",
        sT: [],
      },
      {
        t: "fas fa-signature",
        sT: [],
      },
      {
        t: "far fa-signature",
        sT: [],
      },
      {
        t: "fal fa-signature",
        sT: [],
      },
      {
        t: "fad fa-signature",
        sT: [],
      },
      {
        t: "fas fa-sim-card",
        sT: [],
      },
      {
        t: "far fa-sim-card",
        sT: [],
      },
      {
        t: "fal fa-sim-card",
        sT: [],
      },
      {
        t: "fad fa-sim-card",
        sT: [],
      },
      {
        t: "fab fa-simplybuilt",
        sT: [],
      },
      {
        t: "fal fa-sink",
        sT: [],
      },
      {
        t: "far fa-sink",
        sT: [],
      },
      {
        t: "fas fa-sink",
        sT: [],
      },
      {
        t: "fad fa-sink",
        sT: [],
      },
      {
        t: "fas fa-siren",
        sT: [],
      },
      {
        t: "far fa-siren",
        sT: [],
      },
      {
        t: "fal fa-siren",
        sT: [],
      },
      {
        t: "fad fa-siren",
        sT: [],
      },
      {
        t: "fas fa-siren-on",
        sT: [],
      },
      {
        t: "far fa-siren-on",
        sT: [],
      },
      {
        t: "fal fa-siren-on",
        sT: [],
      },
      {
        t: "fad fa-siren-on",
        sT: [],
      },
      {
        t: "fab fa-sistrix",
        sT: [],
      },
      {
        t: "fas fa-sitemap",
        sT: [],
      },
      {
        t: "far fa-sitemap",
        sT: [],
      },
      {
        t: "fal fa-sitemap",
        sT: [],
      },
      {
        t: "fad fa-sitemap",
        sT: [],
      },
      {
        t: "fab fa-sith",
        sT: [],
      },
      {
        t: "fas fa-skating",
        sT: [],
      },
      {
        t: "far fa-skating",
        sT: [],
      },
      {
        t: "fal fa-skating",
        sT: [],
      },
      {
        t: "fad fa-skating",
        sT: [],
      },
      {
        t: "fas fa-skeleton",
        sT: [],
      },
      {
        t: "far fa-skeleton",
        sT: [],
      },
      {
        t: "fal fa-skeleton",
        sT: [],
      },
      {
        t: "fad fa-skeleton",
        sT: [],
      },
      {
        t: "fab fa-sketch",
        sT: [],
      },
      {
        t: "fas fa-ski-jump",
        sT: [],
      },
      {
        t: "far fa-ski-jump",
        sT: [],
      },
      {
        t: "fal fa-ski-jump",
        sT: [],
      },
      {
        t: "fad fa-ski-jump",
        sT: [],
      },
      {
        t: "fas fa-ski-lift",
        sT: [],
      },
      {
        t: "far fa-ski-lift",
        sT: [],
      },
      {
        t: "fal fa-ski-lift",
        sT: [],
      },
      {
        t: "fad fa-ski-lift",
        sT: [],
      },
      {
        t: "fas fa-skiing",
        sT: [],
      },
      {
        t: "far fa-skiing",
        sT: [],
      },
      {
        t: "fal fa-skiing",
        sT: [],
      },
      {
        t: "fad fa-skiing",
        sT: [],
      },
      {
        t: "fas fa-skiing-nordic",
        sT: [],
      },
      {
        t: "far fa-skiing-nordic",
        sT: [],
      },
      {
        t: "fal fa-skiing-nordic",
        sT: [],
      },
      {
        t: "fad fa-skiing-nordic",
        sT: [],
      },
      {
        t: "fas fa-skull",
        sT: [],
      },
      {
        t: "far fa-skull",
        sT: [],
      },
      {
        t: "fal fa-skull",
        sT: [],
      },
      {
        t: "fad fa-skull",
        sT: [],
      },
      {
        t: "fal fa-skull-cow",
        sT: [],
      },
      {
        t: "far fa-skull-cow",
        sT: [],
      },
      {
        t: "fas fa-skull-cow",
        sT: [],
      },
      {
        t: "fad fa-skull-cow",
        sT: [],
      },
      {
        t: "fas fa-skull-crossbones",
        sT: [],
      },
      {
        t: "far fa-skull-crossbones",
        sT: [],
      },
      {
        t: "fal fa-skull-crossbones",
        sT: [],
      },
      {
        t: "fad fa-skull-crossbones",
        sT: [],
      },
      {
        t: "fab fa-skyatlas",
        sT: [],
      },
      {
        t: "fab fa-skype",
        sT: [],
      },
      {
        t: "fab fa-slack",
        sT: [],
      },
      {
        t: "fab fa-slack-hash",
        sT: [],
      },
      {
        t: "fas fa-slash",
        sT: [],
      },
      {
        t: "far fa-slash",
        sT: [],
      },
      {
        t: "fal fa-slash",
        sT: [],
      },
      {
        t: "fad fa-slash",
        sT: [],
      },
      {
        t: "fas fa-sledding",
        sT: [],
      },
      {
        t: "far fa-sledding",
        sT: [],
      },
      {
        t: "fal fa-sledding",
        sT: [],
      },
      {
        t: "fad fa-sledding",
        sT: [],
      },
      {
        t: "fas fa-sleigh",
        sT: [],
      },
      {
        t: "far fa-sleigh",
        sT: [],
      },
      {
        t: "fal fa-sleigh",
        sT: [],
      },
      {
        t: "fad fa-sleigh",
        sT: [],
      },
      {
        t: "fas fa-sliders-h",
        sT: [],
      },
      {
        t: "far fa-sliders-h",
        sT: [],
      },
      {
        t: "fal fa-sliders-h",
        sT: [],
      },
      {
        t: "fad fa-sliders-h",
        sT: [],
      },
      {
        t: "fas fa-sliders-h-square",
        sT: [],
      },
      {
        t: "far fa-sliders-h-square",
        sT: [],
      },
      {
        t: "fal fa-sliders-h-square",
        sT: [],
      },
      {
        t: "fad fa-sliders-h-square",
        sT: [],
      },
      {
        t: "fas fa-sliders-v",
        sT: [],
      },
      {
        t: "far fa-sliders-v",
        sT: [],
      },
      {
        t: "fal fa-sliders-v",
        sT: [],
      },
      {
        t: "fad fa-sliders-v",
        sT: [],
      },
      {
        t: "fas fa-sliders-v-square",
        sT: [],
      },
      {
        t: "far fa-sliders-v-square",
        sT: [],
      },
      {
        t: "fal fa-sliders-v-square",
        sT: [],
      },
      {
        t: "fad fa-sliders-v-square",
        sT: [],
      },
      {
        t: "fab fa-slideshare",
        sT: [],
      },
      {
        t: "fas fa-smile",
        sT: [],
      },
      {
        t: "far fa-smile",
        sT: [],
      },
      {
        t: "fal fa-smile",
        sT: [],
      },
      {
        t: "fad fa-smile",
        sT: [],
      },
      {
        t: "fas fa-smile-beam",
        sT: [],
      },
      {
        t: "far fa-smile-beam",
        sT: [],
      },
      {
        t: "fal fa-smile-beam",
        sT: [],
      },
      {
        t: "fad fa-smile-beam",
        sT: [],
      },
      {
        t: "fas fa-smile-plus",
        sT: [],
      },
      {
        t: "far fa-smile-plus",
        sT: [],
      },
      {
        t: "fal fa-smile-plus",
        sT: [],
      },
      {
        t: "fad fa-smile-plus",
        sT: [],
      },
      {
        t: "fas fa-smile-wink",
        sT: [],
      },
      {
        t: "far fa-smile-wink",
        sT: [],
      },
      {
        t: "fal fa-smile-wink",
        sT: [],
      },
      {
        t: "fad fa-smile-wink",
        sT: [],
      },
      {
        t: "fas fa-smog",
        sT: [],
      },
      {
        t: "far fa-smog",
        sT: [],
      },
      {
        t: "fal fa-smog",
        sT: [],
      },
      {
        t: "fad fa-smog",
        sT: [],
      },
      {
        t: "fas fa-smoke",
        sT: [],
      },
      {
        t: "far fa-smoke",
        sT: [],
      },
      {
        t: "fal fa-smoke",
        sT: [],
      },
      {
        t: "fad fa-smoke",
        sT: [],
      },
      {
        t: "fas fa-smoking",
        sT: [],
      },
      {
        t: "far fa-smoking",
        sT: [],
      },
      {
        t: "fal fa-smoking",
        sT: [],
      },
      {
        t: "fad fa-smoking",
        sT: [],
      },
      {
        t: "fas fa-smoking-ban",
        sT: [],
      },
      {
        t: "far fa-smoking-ban",
        sT: [],
      },
      {
        t: "fal fa-smoking-ban",
        sT: [],
      },
      {
        t: "fad fa-smoking-ban",
        sT: [],
      },
      {
        t: "fas fa-sms",
        sT: [],
      },
      {
        t: "far fa-sms",
        sT: [],
      },
      {
        t: "fal fa-sms",
        sT: [],
      },
      {
        t: "fad fa-sms",
        sT: [],
      },
      {
        t: "fas fa-snake",
        sT: [],
      },
      {
        t: "far fa-snake",
        sT: [],
      },
      {
        t: "fal fa-snake",
        sT: [],
      },
      {
        t: "fad fa-snake",
        sT: [],
      },
      {
        t: "fab fa-snapchat",
        sT: [],
      },
      {
        t: "fab fa-snapchat-ghost",
        sT: [],
      },
      {
        t: "fab fa-snapchat-square",
        sT: [],
      },
      {
        t: "fas fa-snooze",
        sT: [],
      },
      {
        t: "far fa-snooze",
        sT: [],
      },
      {
        t: "fal fa-snooze",
        sT: [],
      },
      {
        t: "fad fa-snooze",
        sT: [],
      },
      {
        t: "fas fa-snow-blowing",
        sT: [],
      },
      {
        t: "far fa-snow-blowing",
        sT: [],
      },
      {
        t: "fal fa-snow-blowing",
        sT: [],
      },
      {
        t: "fad fa-snow-blowing",
        sT: [],
      },
      {
        t: "fas fa-snowboarding",
        sT: [],
      },
      {
        t: "far fa-snowboarding",
        sT: [],
      },
      {
        t: "fal fa-snowboarding",
        sT: [],
      },
      {
        t: "fad fa-snowboarding",
        sT: [],
      },
      {
        t: "fas fa-snowflake",
        sT: [],
      },
      {
        t: "far fa-snowflake",
        sT: [],
      },
      {
        t: "fal fa-snowflake",
        sT: [],
      },
      {
        t: "fad fa-snowflake",
        sT: [],
      },
      {
        t: "fas fa-snowflakes",
        sT: [],
      },
      {
        t: "far fa-snowflakes",
        sT: [],
      },
      {
        t: "fal fa-snowflakes",
        sT: [],
      },
      {
        t: "fad fa-snowflakes",
        sT: [],
      },
      {
        t: "fas fa-snowman",
        sT: [],
      },
      {
        t: "far fa-snowman",
        sT: [],
      },
      {
        t: "fal fa-snowman",
        sT: [],
      },
      {
        t: "fad fa-snowman",
        sT: [],
      },
      {
        t: "fas fa-snowmobile",
        sT: [],
      },
      {
        t: "far fa-snowmobile",
        sT: [],
      },
      {
        t: "fal fa-snowmobile",
        sT: [],
      },
      {
        t: "fad fa-snowmobile",
        sT: [],
      },
      {
        t: "fas fa-snowplow",
        sT: [],
      },
      {
        t: "far fa-snowplow",
        sT: [],
      },
      {
        t: "fal fa-snowplow",
        sT: [],
      },
      {
        t: "fad fa-snowplow",
        sT: [],
      },
      {
        t: "fal fa-soap",
        sT: [],
      },
      {
        t: "far fa-soap",
        sT: [],
      },
      {
        t: "fas fa-soap",
        sT: [],
      },
      {
        t: "fad fa-soap",
        sT: [],
      },
      {
        t: "fas fa-socks",
        sT: [],
      },
      {
        t: "far fa-socks",
        sT: [],
      },
      {
        t: "fal fa-socks",
        sT: [],
      },
      {
        t: "fad fa-socks",
        sT: [],
      },
      {
        t: "fas fa-solar-panel",
        sT: [],
      },
      {
        t: "far fa-solar-panel",
        sT: [],
      },
      {
        t: "fal fa-solar-panel",
        sT: [],
      },
      {
        t: "fad fa-solar-panel",
        sT: [],
      },
      {
        t: "fas fa-solar-system",
        sT: [],
      },
      {
        t: "far fa-solar-system",
        sT: [],
      },
      {
        t: "fal fa-solar-system",
        sT: [],
      },
      {
        t: "fad fa-solar-system",
        sT: [],
      },
      {
        t: "fas fa-sort",
        sT: [],
      },
      {
        t: "far fa-sort",
        sT: [],
      },
      {
        t: "fal fa-sort",
        sT: [],
      },
      {
        t: "fad fa-sort",
        sT: [],
      },
      {
        t: "fas fa-sort-alpha-down",
        sT: [],
      },
      {
        t: "far fa-sort-alpha-down",
        sT: [],
      },
      {
        t: "fal fa-sort-alpha-down",
        sT: [],
      },
      {
        t: "fad fa-sort-alpha-down",
        sT: [],
      },
      {
        t: "fas fa-sort-alpha-down-alt",
        sT: [],
      },
      {
        t: "far fa-sort-alpha-down-alt",
        sT: [],
      },
      {
        t: "fal fa-sort-alpha-down-alt",
        sT: [],
      },
      {
        t: "fad fa-sort-alpha-down-alt",
        sT: [],
      },
      {
        t: "fas fa-sort-alpha-up",
        sT: [],
      },
      {
        t: "far fa-sort-alpha-up",
        sT: [],
      },
      {
        t: "fal fa-sort-alpha-up",
        sT: [],
      },
      {
        t: "fad fa-sort-alpha-up",
        sT: [],
      },
      {
        t: "fas fa-sort-alpha-up-alt",
        sT: [],
      },
      {
        t: "far fa-sort-alpha-up-alt",
        sT: [],
      },
      {
        t: "fal fa-sort-alpha-up-alt",
        sT: [],
      },
      {
        t: "fad fa-sort-alpha-up-alt",
        sT: [],
      },
      {
        t: "fas fa-sort-alt",
        sT: [],
      },
      {
        t: "far fa-sort-alt",
        sT: [],
      },
      {
        t: "fal fa-sort-alt",
        sT: [],
      },
      {
        t: "fad fa-sort-alt",
        sT: [],
      },
      {
        t: "fas fa-sort-amount-down",
        sT: [],
      },
      {
        t: "far fa-sort-amount-down",
        sT: [],
      },
      {
        t: "fal fa-sort-amount-down",
        sT: [],
      },
      {
        t: "fad fa-sort-amount-down",
        sT: [],
      },
      {
        t: "fas fa-sort-amount-down-alt",
        sT: [],
      },
      {
        t: "far fa-sort-amount-down-alt",
        sT: [],
      },
      {
        t: "fal fa-sort-amount-down-alt",
        sT: [],
      },
      {
        t: "fad fa-sort-amount-down-alt",
        sT: [],
      },
      {
        t: "fas fa-sort-amount-up",
        sT: [],
      },
      {
        t: "far fa-sort-amount-up",
        sT: [],
      },
      {
        t: "fal fa-sort-amount-up",
        sT: [],
      },
      {
        t: "fad fa-sort-amount-up",
        sT: [],
      },
      {
        t: "fas fa-sort-amount-up-alt",
        sT: [],
      },
      {
        t: "far fa-sort-amount-up-alt",
        sT: [],
      },
      {
        t: "fal fa-sort-amount-up-alt",
        sT: [],
      },
      {
        t: "fad fa-sort-amount-up-alt",
        sT: [],
      },
      {
        t: "fas fa-sort-circle",
        sT: [],
      },
      {
        t: "far fa-sort-circle",
        sT: [],
      },
      {
        t: "fal fa-sort-circle",
        sT: [],
      },
      {
        t: "fad fa-sort-circle",
        sT: [],
      },
      {
        t: "fas fa-sort-circle-down",
        sT: [],
      },
      {
        t: "far fa-sort-circle-down",
        sT: [],
      },
      {
        t: "fal fa-sort-circle-down",
        sT: [],
      },
      {
        t: "fad fa-sort-circle-down",
        sT: [],
      },
      {
        t: "fas fa-sort-circle-up",
        sT: [],
      },
      {
        t: "far fa-sort-circle-up",
        sT: [],
      },
      {
        t: "fal fa-sort-circle-up",
        sT: [],
      },
      {
        t: "fad fa-sort-circle-up",
        sT: [],
      },
      {
        t: "fas fa-sort-down",
        sT: [],
      },
      {
        t: "far fa-sort-down",
        sT: [],
      },
      {
        t: "fal fa-sort-down",
        sT: [],
      },
      {
        t: "fad fa-sort-down",
        sT: [],
      },
      {
        t: "fas fa-sort-numeric-down",
        sT: [],
      },
      {
        t: "far fa-sort-numeric-down",
        sT: [],
      },
      {
        t: "fal fa-sort-numeric-down",
        sT: [],
      },
      {
        t: "fad fa-sort-numeric-down",
        sT: [],
      },
      {
        t: "fas fa-sort-numeric-down-alt",
        sT: [],
      },
      {
        t: "far fa-sort-numeric-down-alt",
        sT: [],
      },
      {
        t: "fal fa-sort-numeric-down-alt",
        sT: [],
      },
      {
        t: "fad fa-sort-numeric-down-alt",
        sT: [],
      },
      {
        t: "fas fa-sort-numeric-up",
        sT: [],
      },
      {
        t: "far fa-sort-numeric-up",
        sT: [],
      },
      {
        t: "fal fa-sort-numeric-up",
        sT: [],
      },
      {
        t: "fad fa-sort-numeric-up",
        sT: [],
      },
      {
        t: "fas fa-sort-numeric-up-alt",
        sT: [],
      },
      {
        t: "far fa-sort-numeric-up-alt",
        sT: [],
      },
      {
        t: "fal fa-sort-numeric-up-alt",
        sT: [],
      },
      {
        t: "fad fa-sort-numeric-up-alt",
        sT: [],
      },
      {
        t: "fas fa-sort-shapes-down",
        sT: [],
      },
      {
        t: "far fa-sort-shapes-down",
        sT: [],
      },
      {
        t: "fal fa-sort-shapes-down",
        sT: [],
      },
      {
        t: "fad fa-sort-shapes-down",
        sT: [],
      },
      {
        t: "fas fa-sort-shapes-down-alt",
        sT: [],
      },
      {
        t: "far fa-sort-shapes-down-alt",
        sT: [],
      },
      {
        t: "fal fa-sort-shapes-down-alt",
        sT: [],
      },
      {
        t: "fad fa-sort-shapes-down-alt",
        sT: [],
      },
      {
        t: "fas fa-sort-shapes-up",
        sT: [],
      },
      {
        t: "far fa-sort-shapes-up",
        sT: [],
      },
      {
        t: "fal fa-sort-shapes-up",
        sT: [],
      },
      {
        t: "fad fa-sort-shapes-up",
        sT: [],
      },
      {
        t: "fas fa-sort-shapes-up-alt",
        sT: [],
      },
      {
        t: "far fa-sort-shapes-up-alt",
        sT: [],
      },
      {
        t: "fal fa-sort-shapes-up-alt",
        sT: [],
      },
      {
        t: "fad fa-sort-shapes-up-alt",
        sT: [],
      },
      {
        t: "fas fa-sort-size-down",
        sT: [],
      },
      {
        t: "far fa-sort-size-down",
        sT: [],
      },
      {
        t: "fal fa-sort-size-down",
        sT: [],
      },
      {
        t: "fad fa-sort-size-down",
        sT: [],
      },
      {
        t: "fas fa-sort-size-down-alt",
        sT: [],
      },
      {
        t: "far fa-sort-size-down-alt",
        sT: [],
      },
      {
        t: "fal fa-sort-size-down-alt",
        sT: [],
      },
      {
        t: "fad fa-sort-size-down-alt",
        sT: [],
      },
      {
        t: "fas fa-sort-size-up",
        sT: [],
      },
      {
        t: "far fa-sort-size-up",
        sT: [],
      },
      {
        t: "fal fa-sort-size-up",
        sT: [],
      },
      {
        t: "fad fa-sort-size-up",
        sT: [],
      },
      {
        t: "fas fa-sort-size-up-alt",
        sT: [],
      },
      {
        t: "far fa-sort-size-up-alt",
        sT: [],
      },
      {
        t: "fal fa-sort-size-up-alt",
        sT: [],
      },
      {
        t: "fad fa-sort-size-up-alt",
        sT: [],
      },
      {
        t: "fas fa-sort-up",
        sT: [],
      },
      {
        t: "far fa-sort-up",
        sT: [],
      },
      {
        t: "fal fa-sort-up",
        sT: [],
      },
      {
        t: "fad fa-sort-up",
        sT: [],
      },
      {
        t: "fab fa-soundcloud",
        sT: [],
      },
      {
        t: "fas fa-soup",
        sT: [],
      },
      {
        t: "far fa-soup",
        sT: [],
      },
      {
        t: "fal fa-soup",
        sT: [],
      },
      {
        t: "fad fa-soup",
        sT: [],
      },
      {
        t: "fab fa-sourcetree",
        sT: [],
      },
      {
        t: "fas fa-spa",
        sT: [],
      },
      {
        t: "far fa-spa",
        sT: [],
      },
      {
        t: "fal fa-spa",
        sT: [],
      },
      {
        t: "fad fa-spa",
        sT: [],
      },
      {
        t: "fas fa-space-shuttle",
        sT: [],
      },
      {
        t: "far fa-space-shuttle",
        sT: [],
      },
      {
        t: "fal fa-space-shuttle",
        sT: [],
      },
      {
        t: "fad fa-space-shuttle",
        sT: [],
      },
      {
        t: "fas fa-space-station-moon",
        sT: [],
      },
      {
        t: "far fa-space-station-moon",
        sT: [],
      },
      {
        t: "fal fa-space-station-moon",
        sT: [],
      },
      {
        t: "fad fa-space-station-moon",
        sT: [],
      },
      {
        t: "fas fa-space-station-moon-alt",
        sT: [],
      },
      {
        t: "far fa-space-station-moon-alt",
        sT: [],
      },
      {
        t: "fal fa-space-station-moon-alt",
        sT: [],
      },
      {
        t: "fad fa-space-station-moon-alt",
        sT: [],
      },
      {
        t: "fas fa-spade",
        sT: [],
      },
      {
        t: "far fa-spade",
        sT: [],
      },
      {
        t: "fal fa-spade",
        sT: [],
      },
      {
        t: "fad fa-spade",
        sT: [],
      },
      {
        t: "fas fa-sparkles",
        sT: [],
      },
      {
        t: "far fa-sparkles",
        sT: [],
      },
      {
        t: "fal fa-sparkles",
        sT: [],
      },
      {
        t: "fad fa-sparkles",
        sT: [],
      },
      {
        t: "fab fa-speakap",
        sT: [],
      },
      {
        t: "fas fa-speaker",
        sT: [],
      },
      {
        t: "far fa-speaker",
        sT: [],
      },
      {
        t: "fal fa-speaker",
        sT: [],
      },
      {
        t: "fad fa-speaker",
        sT: [],
      },
      {
        t: "fab fa-speaker-deck",
        sT: [],
      },
      {
        t: "fas fa-speakers",
        sT: [],
      },
      {
        t: "far fa-speakers",
        sT: [],
      },
      {
        t: "fal fa-speakers",
        sT: [],
      },
      {
        t: "fad fa-speakers",
        sT: [],
      },
      {
        t: "fas fa-spell-check",
        sT: [],
      },
      {
        t: "far fa-spell-check",
        sT: [],
      },
      {
        t: "fal fa-spell-check",
        sT: [],
      },
      {
        t: "fad fa-spell-check",
        sT: [],
      },
      {
        t: "fas fa-spider",
        sT: [],
      },
      {
        t: "far fa-spider",
        sT: [],
      },
      {
        t: "fal fa-spider",
        sT: [],
      },
      {
        t: "fad fa-spider",
        sT: [],
      },
      {
        t: "fas fa-spider-black-widow",
        sT: [],
      },
      {
        t: "far fa-spider-black-widow",
        sT: [],
      },
      {
        t: "fal fa-spider-black-widow",
        sT: [],
      },
      {
        t: "fad fa-spider-black-widow",
        sT: [],
      },
      {
        t: "fas fa-spider-web",
        sT: [],
      },
      {
        t: "far fa-spider-web",
        sT: [],
      },
      {
        t: "fal fa-spider-web",
        sT: [],
      },
      {
        t: "fad fa-spider-web",
        sT: [],
      },
      {
        t: "fas fa-spinner",
        sT: [],
      },
      {
        t: "far fa-spinner",
        sT: [],
      },
      {
        t: "fal fa-spinner",
        sT: [],
      },
      {
        t: "fad fa-spinner",
        sT: [],
      },
      {
        t: "fas fa-spinner-third",
        sT: [],
      },
      {
        t: "far fa-spinner-third",
        sT: [],
      },
      {
        t: "fal fa-spinner-third",
        sT: [],
      },
      {
        t: "fad fa-spinner-third",
        sT: [],
      },
      {
        t: "fas fa-splotch",
        sT: [],
      },
      {
        t: "far fa-splotch",
        sT: [],
      },
      {
        t: "fal fa-splotch",
        sT: [],
      },
      {
        t: "fad fa-splotch",
        sT: [],
      },
      {
        t: "fab fa-spotify",
        sT: [],
      },
      {
        t: "fas fa-spray-can",
        sT: [],
      },
      {
        t: "far fa-spray-can",
        sT: [],
      },
      {
        t: "fal fa-spray-can",
        sT: [],
      },
      {
        t: "fad fa-spray-can",
        sT: [],
      },
      {
        t: "fas fa-sprinkler",
        sT: [],
      },
      {
        t: "far fa-sprinkler",
        sT: [],
      },
      {
        t: "fal fa-sprinkler",
        sT: [],
      },
      {
        t: "fad fa-sprinkler",
        sT: [],
      },
      {
        t: "fas fa-square",
        sT: [],
      },
      {
        t: "far fa-square",
        sT: [],
      },
      {
        t: "fal fa-square",
        sT: [],
      },
      {
        t: "fad fa-square",
        sT: [],
      },
      {
        t: "fas fa-square-full",
        sT: [],
      },
      {
        t: "far fa-square-full",
        sT: [],
      },
      {
        t: "fal fa-square-full",
        sT: [],
      },
      {
        t: "fad fa-square-full",
        sT: [],
      },
      {
        t: "fas fa-square-root",
        sT: [],
      },
      {
        t: "far fa-square-root",
        sT: [],
      },
      {
        t: "fal fa-square-root",
        sT: [],
      },
      {
        t: "fad fa-square-root",
        sT: [],
      },
      {
        t: "fas fa-square-root-alt",
        sT: [],
      },
      {
        t: "far fa-square-root-alt",
        sT: [],
      },
      {
        t: "fal fa-square-root-alt",
        sT: [],
      },
      {
        t: "fad fa-square-root-alt",
        sT: [],
      },
      {
        t: "fab fa-squarespace",
        sT: [],
      },
      {
        t: "fas fa-squirrel",
        sT: [],
      },
      {
        t: "far fa-squirrel",
        sT: [],
      },
      {
        t: "fal fa-squirrel",
        sT: [],
      },
      {
        t: "fad fa-squirrel",
        sT: [],
      },
      {
        t: "fab fa-stack-exchange",
        sT: [],
      },
      {
        t: "fab fa-stack-overflow",
        sT: [],
      },
      {
        t: "fab fa-stackpath",
        sT: [],
      },
      {
        t: "fas fa-staff",
        sT: [],
      },
      {
        t: "far fa-staff",
        sT: [],
      },
      {
        t: "fal fa-staff",
        sT: [],
      },
      {
        t: "fad fa-staff",
        sT: [],
      },
      {
        t: "fas fa-stamp",
        sT: [],
      },
      {
        t: "far fa-stamp",
        sT: [],
      },
      {
        t: "fal fa-stamp",
        sT: [],
      },
      {
        t: "fad fa-stamp",
        sT: [],
      },
      {
        t: "fas fa-star",
        sT: [],
      },
      {
        t: "far fa-star",
        sT: [],
      },
      {
        t: "fal fa-star",
        sT: [],
      },
      {
        t: "fad fa-star",
        sT: [],
      },
      {
        t: "fas fa-star-and-crescent",
        sT: [],
      },
      {
        t: "far fa-star-and-crescent",
        sT: [],
      },
      {
        t: "fal fa-star-and-crescent",
        sT: [],
      },
      {
        t: "fad fa-star-and-crescent",
        sT: [],
      },
      {
        t: "fas fa-star-christmas",
        sT: [],
      },
      {
        t: "far fa-star-christmas",
        sT: [],
      },
      {
        t: "fal fa-star-christmas",
        sT: [],
      },
      {
        t: "fad fa-star-christmas",
        sT: [],
      },
      {
        t: "fas fa-star-exclamation",
        sT: [],
      },
      {
        t: "far fa-star-exclamation",
        sT: [],
      },
      {
        t: "fal fa-star-exclamation",
        sT: [],
      },
      {
        t: "fad fa-star-exclamation",
        sT: [],
      },
      {
        t: "fas fa-star-half",
        sT: [],
      },
      {
        t: "far fa-star-half",
        sT: [],
      },
      {
        t: "fal fa-star-half",
        sT: [],
      },
      {
        t: "fad fa-star-half",
        sT: [],
      },
      {
        t: "fas fa-star-half-alt",
        sT: [],
      },
      {
        t: "far fa-star-half-alt",
        sT: [],
      },
      {
        t: "fal fa-star-half-alt",
        sT: [],
      },
      {
        t: "fad fa-star-half-alt",
        sT: [],
      },
      {
        t: "fas fa-star-of-david",
        sT: [],
      },
      {
        t: "far fa-star-of-david",
        sT: [],
      },
      {
        t: "fal fa-star-of-david",
        sT: [],
      },
      {
        t: "fad fa-star-of-david",
        sT: [],
      },
      {
        t: "fas fa-star-of-life",
        sT: [],
      },
      {
        t: "far fa-star-of-life",
        sT: [],
      },
      {
        t: "fal fa-star-of-life",
        sT: [],
      },
      {
        t: "fad fa-star-of-life",
        sT: [],
      },
      {
        t: "fas fa-star-shooting",
        sT: [],
      },
      {
        t: "far fa-star-shooting",
        sT: [],
      },
      {
        t: "fal fa-star-shooting",
        sT: [],
      },
      {
        t: "fad fa-star-shooting",
        sT: [],
      },
      {
        t: "fas fa-starfighter",
        sT: [],
      },
      {
        t: "far fa-starfighter",
        sT: [],
      },
      {
        t: "fal fa-starfighter",
        sT: [],
      },
      {
        t: "fad fa-starfighter",
        sT: [],
      },
      {
        t: "fas fa-starfighter-alt",
        sT: [],
      },
      {
        t: "far fa-starfighter-alt",
        sT: [],
      },
      {
        t: "fal fa-starfighter-alt",
        sT: [],
      },
      {
        t: "fad fa-starfighter-alt",
        sT: [],
      },
      {
        t: "fas fa-stars",
        sT: [],
      },
      {
        t: "far fa-stars",
        sT: [],
      },
      {
        t: "fal fa-stars",
        sT: [],
      },
      {
        t: "fad fa-stars",
        sT: [],
      },
      {
        t: "fas fa-starship",
        sT: [],
      },
      {
        t: "far fa-starship",
        sT: [],
      },
      {
        t: "fal fa-starship",
        sT: [],
      },
      {
        t: "fad fa-starship",
        sT: [],
      },
      {
        t: "fas fa-starship-freighter",
        sT: [],
      },
      {
        t: "far fa-starship-freighter",
        sT: [],
      },
      {
        t: "fal fa-starship-freighter",
        sT: [],
      },
      {
        t: "fad fa-starship-freighter",
        sT: [],
      },
      {
        t: "fab fa-staylinked",
        sT: [],
      },
      {
        t: "fas fa-steak",
        sT: [],
      },
      {
        t: "far fa-steak",
        sT: [],
      },
      {
        t: "fal fa-steak",
        sT: [],
      },
      {
        t: "fad fa-steak",
        sT: [],
      },
      {
        t: "fab fa-steam",
        sT: [],
      },
      {
        t: "fab fa-steam-square",
        sT: [],
      },
      {
        t: "fab fa-steam-symbol",
        sT: [],
      },
      {
        t: "fas fa-steering-wheel",
        sT: [],
      },
      {
        t: "far fa-steering-wheel",
        sT: [],
      },
      {
        t: "fal fa-steering-wheel",
        sT: [],
      },
      {
        t: "fad fa-steering-wheel",
        sT: [],
      },
      {
        t: "fas fa-step-backward",
        sT: [],
      },
      {
        t: "far fa-step-backward",
        sT: [],
      },
      {
        t: "fal fa-step-backward",
        sT: [],
      },
      {
        t: "fad fa-step-backward",
        sT: [],
      },
      {
        t: "fas fa-step-forward",
        sT: [],
      },
      {
        t: "far fa-step-forward",
        sT: [],
      },
      {
        t: "fal fa-step-forward",
        sT: [],
      },
      {
        t: "fad fa-step-forward",
        sT: [],
      },
      {
        t: "fas fa-stethoscope",
        sT: [],
      },
      {
        t: "far fa-stethoscope",
        sT: [],
      },
      {
        t: "fal fa-stethoscope",
        sT: [],
      },
      {
        t: "fad fa-stethoscope",
        sT: [],
      },
      {
        t: "fab fa-sticker-mule",
        sT: [],
      },
      {
        t: "fas fa-sticky-note",
        sT: [],
      },
      {
        t: "far fa-sticky-note",
        sT: [],
      },
      {
        t: "fal fa-sticky-note",
        sT: [],
      },
      {
        t: "fad fa-sticky-note",
        sT: [],
      },
      {
        t: "fas fa-stocking",
        sT: [],
      },
      {
        t: "far fa-stocking",
        sT: [],
      },
      {
        t: "fal fa-stocking",
        sT: [],
      },
      {
        t: "fad fa-stocking",
        sT: [],
      },
      {
        t: "fas fa-stomach",
        sT: [],
      },
      {
        t: "far fa-stomach",
        sT: [],
      },
      {
        t: "fal fa-stomach",
        sT: [],
      },
      {
        t: "fad fa-stomach",
        sT: [],
      },
      {
        t: "fas fa-stop",
        sT: [],
      },
      {
        t: "far fa-stop",
        sT: [],
      },
      {
        t: "fal fa-stop",
        sT: [],
      },
      {
        t: "fad fa-stop",
        sT: [],
      },
      {
        t: "fas fa-stop-circle",
        sT: [],
      },
      {
        t: "far fa-stop-circle",
        sT: [],
      },
      {
        t: "fal fa-stop-circle",
        sT: [],
      },
      {
        t: "fad fa-stop-circle",
        sT: [],
      },
      {
        t: "fas fa-stopwatch",
        sT: [],
      },
      {
        t: "far fa-stopwatch",
        sT: [],
      },
      {
        t: "fal fa-stopwatch",
        sT: [],
      },
      {
        t: "fad fa-stopwatch",
        sT: [],
      },
      {
        t: "fal fa-stopwatch-20",
        sT: [],
      },
      {
        t: "far fa-stopwatch-20",
        sT: [],
      },
      {
        t: "fas fa-stopwatch-20",
        sT: [],
      },
      {
        t: "fad fa-stopwatch-20",
        sT: [],
      },
      {
        t: "fas fa-store",
        sT: [],
      },
      {
        t: "far fa-store",
        sT: [],
      },
      {
        t: "fal fa-store",
        sT: [],
      },
      {
        t: "fad fa-store",
        sT: [],
      },
      {
        t: "fas fa-store-alt",
        sT: [],
      },
      {
        t: "far fa-store-alt",
        sT: [],
      },
      {
        t: "fal fa-store-alt",
        sT: [],
      },
      {
        t: "fad fa-store-alt",
        sT: [],
      },
      {
        t: "fal fa-store-alt-slash",
        sT: [],
      },
      {
        t: "far fa-store-alt-slash",
        sT: [],
      },
      {
        t: "fas fa-store-alt-slash",
        sT: [],
      },
      {
        t: "fad fa-store-alt-slash",
        sT: [],
      },
      {
        t: "fal fa-store-slash",
        sT: [],
      },
      {
        t: "far fa-store-slash",
        sT: [],
      },
      {
        t: "fas fa-store-slash",
        sT: [],
      },
      {
        t: "fad fa-store-slash",
        sT: [],
      },
      {
        t: "fab fa-strava",
        sT: [],
      },
      {
        t: "fas fa-stream",
        sT: [],
      },
      {
        t: "far fa-stream",
        sT: [],
      },
      {
        t: "fal fa-stream",
        sT: [],
      },
      {
        t: "fad fa-stream",
        sT: [],
      },
      {
        t: "fas fa-street-view",
        sT: [],
      },
      {
        t: "far fa-street-view",
        sT: [],
      },
      {
        t: "fal fa-street-view",
        sT: [],
      },
      {
        t: "fad fa-street-view",
        sT: [],
      },
      {
        t: "fas fa-stretcher",
        sT: [],
      },
      {
        t: "far fa-stretcher",
        sT: [],
      },
      {
        t: "fal fa-stretcher",
        sT: [],
      },
      {
        t: "fad fa-stretcher",
        sT: [],
      },
      {
        t: "fas fa-strikethrough",
        sT: [],
      },
      {
        t: "far fa-strikethrough",
        sT: [],
      },
      {
        t: "fal fa-strikethrough",
        sT: [],
      },
      {
        t: "fad fa-strikethrough",
        sT: [],
      },
      {
        t: "fab fa-stripe",
        sT: [],
      },
      {
        t: "fab fa-stripe-s",
        sT: [],
      },
      {
        t: "fas fa-stroopwafel",
        sT: [],
      },
      {
        t: "far fa-stroopwafel",
        sT: [],
      },
      {
        t: "fal fa-stroopwafel",
        sT: [],
      },
      {
        t: "fad fa-stroopwafel",
        sT: [],
      },
      {
        t: "fab fa-studiovinari",
        sT: [],
      },
      {
        t: "fab fa-stumbleupon",
        sT: [],
      },
      {
        t: "fab fa-stumbleupon-circle",
        sT: [],
      },
      {
        t: "fas fa-subscript",
        sT: [],
      },
      {
        t: "far fa-subscript",
        sT: [],
      },
      {
        t: "fal fa-subscript",
        sT: [],
      },
      {
        t: "fad fa-subscript",
        sT: [],
      },
      {
        t: "fas fa-subway",
        sT: [],
      },
      {
        t: "far fa-subway",
        sT: [],
      },
      {
        t: "fal fa-subway",
        sT: [],
      },
      {
        t: "fad fa-subway",
        sT: [],
      },
      {
        t: "fas fa-suitcase",
        sT: [],
      },
      {
        t: "far fa-suitcase",
        sT: [],
      },
      {
        t: "fal fa-suitcase",
        sT: [],
      },
      {
        t: "fad fa-suitcase",
        sT: [],
      },
      {
        t: "fas fa-suitcase-rolling",
        sT: [],
      },
      {
        t: "far fa-suitcase-rolling",
        sT: [],
      },
      {
        t: "fal fa-suitcase-rolling",
        sT: [],
      },
      {
        t: "fad fa-suitcase-rolling",
        sT: [],
      },
      {
        t: "fas fa-sun",
        sT: [],
      },
      {
        t: "far fa-sun",
        sT: [],
      },
      {
        t: "fal fa-sun",
        sT: [],
      },
      {
        t: "fad fa-sun",
        sT: [],
      },
      {
        t: "fas fa-sun-cloud",
        sT: [],
      },
      {
        t: "far fa-sun-cloud",
        sT: [],
      },
      {
        t: "fal fa-sun-cloud",
        sT: [],
      },
      {
        t: "fad fa-sun-cloud",
        sT: [],
      },
      {
        t: "fas fa-sun-dust",
        sT: [],
      },
      {
        t: "far fa-sun-dust",
        sT: [],
      },
      {
        t: "fal fa-sun-dust",
        sT: [],
      },
      {
        t: "fad fa-sun-dust",
        sT: [],
      },
      {
        t: "fas fa-sun-haze",
        sT: [],
      },
      {
        t: "far fa-sun-haze",
        sT: [],
      },
      {
        t: "fal fa-sun-haze",
        sT: [],
      },
      {
        t: "fad fa-sun-haze",
        sT: [],
      },
      {
        t: "fas fa-sunglasses",
        sT: [],
      },
      {
        t: "far fa-sunglasses",
        sT: [],
      },
      {
        t: "fal fa-sunglasses",
        sT: [],
      },
      {
        t: "fad fa-sunglasses",
        sT: [],
      },
      {
        t: "fas fa-sunrise",
        sT: [],
      },
      {
        t: "far fa-sunrise",
        sT: [],
      },
      {
        t: "fal fa-sunrise",
        sT: [],
      },
      {
        t: "fad fa-sunrise",
        sT: [],
      },
      {
        t: "fas fa-sunset",
        sT: [],
      },
      {
        t: "far fa-sunset",
        sT: [],
      },
      {
        t: "fal fa-sunset",
        sT: [],
      },
      {
        t: "fad fa-sunset",
        sT: [],
      },
      {
        t: "fab fa-superpowers",
        sT: [],
      },
      {
        t: "fas fa-superscript",
        sT: [],
      },
      {
        t: "far fa-superscript",
        sT: [],
      },
      {
        t: "fal fa-superscript",
        sT: [],
      },
      {
        t: "fad fa-superscript",
        sT: [],
      },
      {
        t: "fab fa-supple",
        sT: [],
      },
      {
        t: "fas fa-surprise",
        sT: [],
      },
      {
        t: "far fa-surprise",
        sT: [],
      },
      {
        t: "fal fa-surprise",
        sT: [],
      },
      {
        t: "fad fa-surprise",
        sT: [],
      },
      {
        t: "fab fa-suse",
        sT: [],
      },
      {
        t: "fas fa-swatchbook",
        sT: [],
      },
      {
        t: "far fa-swatchbook",
        sT: [],
      },
      {
        t: "fal fa-swatchbook",
        sT: [],
      },
      {
        t: "fad fa-swatchbook",
        sT: [],
      },
      {
        t: "fab fa-swift",
        sT: [],
      },
      {
        t: "fas fa-swimmer",
        sT: [],
      },
      {
        t: "far fa-swimmer",
        sT: [],
      },
      {
        t: "fal fa-swimmer",
        sT: [],
      },
      {
        t: "fad fa-swimmer",
        sT: [],
      },
      {
        t: "fas fa-swimming-pool",
        sT: [],
      },
      {
        t: "far fa-swimming-pool",
        sT: [],
      },
      {
        t: "fal fa-swimming-pool",
        sT: [],
      },
      {
        t: "fad fa-swimming-pool",
        sT: [],
      },
      {
        t: "fas fa-sword",
        sT: [],
      },
      {
        t: "far fa-sword",
        sT: [],
      },
      {
        t: "fal fa-sword",
        sT: [],
      },
      {
        t: "fad fa-sword",
        sT: [],
      },
      {
        t: "fas fa-sword-laser",
        sT: [],
      },
      {
        t: "far fa-sword-laser",
        sT: [],
      },
      {
        t: "fal fa-sword-laser",
        sT: [],
      },
      {
        t: "fad fa-sword-laser",
        sT: [],
      },
      {
        t: "fas fa-sword-laser-alt",
        sT: [],
      },
      {
        t: "far fa-sword-laser-alt",
        sT: [],
      },
      {
        t: "fal fa-sword-laser-alt",
        sT: [],
      },
      {
        t: "fad fa-sword-laser-alt",
        sT: [],
      },
      {
        t: "fas fa-swords",
        sT: [],
      },
      {
        t: "far fa-swords",
        sT: [],
      },
      {
        t: "fal fa-swords",
        sT: [],
      },
      {
        t: "fad fa-swords",
        sT: [],
      },
      {
        t: "fas fa-swords-laser",
        sT: [],
      },
      {
        t: "far fa-swords-laser",
        sT: [],
      },
      {
        t: "fal fa-swords-laser",
        sT: [],
      },
      {
        t: "fad fa-swords-laser",
        sT: [],
      },
      {
        t: "fab fa-symfony",
        sT: [],
      },
      {
        t: "fas fa-synagogue",
        sT: [],
      },
      {
        t: "far fa-synagogue",
        sT: [],
      },
      {
        t: "fal fa-synagogue",
        sT: [],
      },
      {
        t: "fad fa-synagogue",
        sT: [],
      },
      {
        t: "fas fa-sync",
        sT: [],
      },
      {
        t: "far fa-sync",
        sT: [],
      },
      {
        t: "fal fa-sync",
        sT: [],
      },
      {
        t: "fad fa-sync",
        sT: [],
      },
      {
        t: "fas fa-sync-alt",
        sT: [],
      },
      {
        t: "far fa-sync-alt",
        sT: [],
      },
      {
        t: "fal fa-sync-alt",
        sT: [],
      },
      {
        t: "fad fa-sync-alt",
        sT: [],
      },
      {
        t: "fas fa-syringe",
        sT: [],
      },
      {
        t: "far fa-syringe",
        sT: [],
      },
      {
        t: "fal fa-syringe",
        sT: [],
      },
      {
        t: "fad fa-syringe",
        sT: [],
      },
      {
        t: "fas fa-table",
        sT: [],
      },
      {
        t: "far fa-table",
        sT: [],
      },
      {
        t: "fal fa-table",
        sT: [],
      },
      {
        t: "fad fa-table",
        sT: [],
      },
      {
        t: "fas fa-table-tennis",
        sT: [],
      },
      {
        t: "far fa-table-tennis",
        sT: [],
      },
      {
        t: "fal fa-table-tennis",
        sT: [],
      },
      {
        t: "fad fa-table-tennis",
        sT: [],
      },
      {
        t: "fas fa-tablet",
        sT: [],
      },
      {
        t: "far fa-tablet",
        sT: [],
      },
      {
        t: "fal fa-tablet",
        sT: [],
      },
      {
        t: "fad fa-tablet",
        sT: [],
      },
      {
        t: "fas fa-tablet-alt",
        sT: [],
      },
      {
        t: "far fa-tablet-alt",
        sT: [],
      },
      {
        t: "fal fa-tablet-alt",
        sT: [],
      },
      {
        t: "fad fa-tablet-alt",
        sT: [],
      },
      {
        t: "fas fa-tablet-android",
        sT: [],
      },
      {
        t: "far fa-tablet-android",
        sT: [],
      },
      {
        t: "fal fa-tablet-android",
        sT: [],
      },
      {
        t: "fad fa-tablet-android",
        sT: [],
      },
      {
        t: "fas fa-tablet-android-alt",
        sT: [],
      },
      {
        t: "far fa-tablet-android-alt",
        sT: [],
      },
      {
        t: "fal fa-tablet-android-alt",
        sT: [],
      },
      {
        t: "fad fa-tablet-android-alt",
        sT: [],
      },
      {
        t: "fas fa-tablet-rugged",
        sT: [],
      },
      {
        t: "far fa-tablet-rugged",
        sT: [],
      },
      {
        t: "fal fa-tablet-rugged",
        sT: [],
      },
      {
        t: "fad fa-tablet-rugged",
        sT: [],
      },
      {
        t: "fas fa-tablets",
        sT: [],
      },
      {
        t: "far fa-tablets",
        sT: [],
      },
      {
        t: "fal fa-tablets",
        sT: [],
      },
      {
        t: "fad fa-tablets",
        sT: [],
      },
      {
        t: "fas fa-tachometer",
        sT: [],
      },
      {
        t: "far fa-tachometer",
        sT: [],
      },
      {
        t: "fal fa-tachometer",
        sT: [],
      },
      {
        t: "fad fa-tachometer",
        sT: [],
      },
      {
        t: "fas fa-tachometer-alt",
        sT: [],
      },
      {
        t: "far fa-tachometer-alt",
        sT: [],
      },
      {
        t: "fal fa-tachometer-alt",
        sT: [],
      },
      {
        t: "fad fa-tachometer-alt",
        sT: [],
      },
      {
        t: "fas fa-tachometer-alt-average",
        sT: [],
      },
      {
        t: "far fa-tachometer-alt-average",
        sT: [],
      },
      {
        t: "fal fa-tachometer-alt-average",
        sT: [],
      },
      {
        t: "fad fa-tachometer-alt-average",
        sT: [],
      },
      {
        t: "fas fa-tachometer-alt-fast",
        sT: [],
      },
      {
        t: "far fa-tachometer-alt-fast",
        sT: [],
      },
      {
        t: "fal fa-tachometer-alt-fast",
        sT: [],
      },
      {
        t: "fad fa-tachometer-alt-fast",
        sT: [],
      },
      {
        t: "fas fa-tachometer-alt-fastest",
        sT: [],
      },
      {
        t: "far fa-tachometer-alt-fastest",
        sT: [],
      },
      {
        t: "fal fa-tachometer-alt-fastest",
        sT: [],
      },
      {
        t: "fad fa-tachometer-alt-fastest",
        sT: [],
      },
      {
        t: "fas fa-tachometer-alt-slow",
        sT: [],
      },
      {
        t: "far fa-tachometer-alt-slow",
        sT: [],
      },
      {
        t: "fal fa-tachometer-alt-slow",
        sT: [],
      },
      {
        t: "fad fa-tachometer-alt-slow",
        sT: [],
      },
      {
        t: "fas fa-tachometer-alt-slowest",
        sT: [],
      },
      {
        t: "far fa-tachometer-alt-slowest",
        sT: [],
      },
      {
        t: "fal fa-tachometer-alt-slowest",
        sT: [],
      },
      {
        t: "fad fa-tachometer-alt-slowest",
        sT: [],
      },
      {
        t: "fas fa-tachometer-average",
        sT: [],
      },
      {
        t: "far fa-tachometer-average",
        sT: [],
      },
      {
        t: "fal fa-tachometer-average",
        sT: [],
      },
      {
        t: "fad fa-tachometer-average",
        sT: [],
      },
      {
        t: "fas fa-tachometer-fast",
        sT: [],
      },
      {
        t: "far fa-tachometer-fast",
        sT: [],
      },
      {
        t: "fal fa-tachometer-fast",
        sT: [],
      },
      {
        t: "fad fa-tachometer-fast",
        sT: [],
      },
      {
        t: "fas fa-tachometer-fastest",
        sT: [],
      },
      {
        t: "far fa-tachometer-fastest",
        sT: [],
      },
      {
        t: "fal fa-tachometer-fastest",
        sT: [],
      },
      {
        t: "fad fa-tachometer-fastest",
        sT: [],
      },
      {
        t: "fas fa-tachometer-slow",
        sT: [],
      },
      {
        t: "far fa-tachometer-slow",
        sT: [],
      },
      {
        t: "fal fa-tachometer-slow",
        sT: [],
      },
      {
        t: "fad fa-tachometer-slow",
        sT: [],
      },
      {
        t: "fas fa-tachometer-slowest",
        sT: [],
      },
      {
        t: "far fa-tachometer-slowest",
        sT: [],
      },
      {
        t: "fal fa-tachometer-slowest",
        sT: [],
      },
      {
        t: "fad fa-tachometer-slowest",
        sT: [],
      },
      {
        t: "fas fa-taco",
        sT: [],
      },
      {
        t: "far fa-taco",
        sT: [],
      },
      {
        t: "fal fa-taco",
        sT: [],
      },
      {
        t: "fad fa-taco",
        sT: [],
      },
      {
        t: "fas fa-tag",
        sT: [],
      },
      {
        t: "far fa-tag",
        sT: [],
      },
      {
        t: "fal fa-tag",
        sT: [],
      },
      {
        t: "fad fa-tag",
        sT: [],
      },
      {
        t: "fas fa-tags",
        sT: [],
      },
      {
        t: "far fa-tags",
        sT: [],
      },
      {
        t: "fal fa-tags",
        sT: [],
      },
      {
        t: "fad fa-tags",
        sT: [],
      },
      {
        t: "fas fa-tally",
        sT: [],
      },
      {
        t: "far fa-tally",
        sT: [],
      },
      {
        t: "fal fa-tally",
        sT: [],
      },
      {
        t: "fad fa-tally",
        sT: [],
      },
      {
        t: "fas fa-tanakh",
        sT: [],
      },
      {
        t: "far fa-tanakh",
        sT: [],
      },
      {
        t: "fal fa-tanakh",
        sT: [],
      },
      {
        t: "fad fa-tanakh",
        sT: [],
      },
      {
        t: "fas fa-tape",
        sT: [],
      },
      {
        t: "far fa-tape",
        sT: [],
      },
      {
        t: "fal fa-tape",
        sT: [],
      },
      {
        t: "fad fa-tape",
        sT: [],
      },
      {
        t: "fas fa-tasks",
        sT: [],
      },
      {
        t: "far fa-tasks",
        sT: [],
      },
      {
        t: "fal fa-tasks",
        sT: [],
      },
      {
        t: "fad fa-tasks",
        sT: [],
      },
      {
        t: "fas fa-tasks-alt",
        sT: [],
      },
      {
        t: "far fa-tasks-alt",
        sT: [],
      },
      {
        t: "fal fa-tasks-alt",
        sT: [],
      },
      {
        t: "fad fa-tasks-alt",
        sT: [],
      },
      {
        t: "fas fa-taxi",
        sT: [],
      },
      {
        t: "far fa-taxi",
        sT: [],
      },
      {
        t: "fal fa-taxi",
        sT: [],
      },
      {
        t: "fad fa-taxi",
        sT: [],
      },
      {
        t: "fab fa-teamspeak",
        sT: [],
      },
      {
        t: "fas fa-teeth",
        sT: [],
      },
      {
        t: "far fa-teeth",
        sT: [],
      },
      {
        t: "fal fa-teeth",
        sT: [],
      },
      {
        t: "fad fa-teeth",
        sT: [],
      },
      {
        t: "fas fa-teeth-open",
        sT: [],
      },
      {
        t: "far fa-teeth-open",
        sT: [],
      },
      {
        t: "fal fa-teeth-open",
        sT: [],
      },
      {
        t: "fad fa-teeth-open",
        sT: [],
      },
      {
        t: "fab fa-telegram",
        sT: [],
      },
      {
        t: "fab fa-telegram-plane",
        sT: [],
      },
      {
        t: "fas fa-telescope",
        sT: [],
      },
      {
        t: "far fa-telescope",
        sT: [],
      },
      {
        t: "fal fa-telescope",
        sT: [],
      },
      {
        t: "fad fa-telescope",
        sT: [],
      },
      {
        t: "fas fa-temperature-down",
        sT: [],
      },
      {
        t: "far fa-temperature-down",
        sT: [],
      },
      {
        t: "fal fa-temperature-down",
        sT: [],
      },
      {
        t: "fad fa-temperature-down",
        sT: [],
      },
      {
        t: "fas fa-temperature-frigid",
        sT: [],
      },
      {
        t: "far fa-temperature-frigid",
        sT: [],
      },
      {
        t: "fal fa-temperature-frigid",
        sT: [],
      },
      {
        t: "fad fa-temperature-frigid",
        sT: [],
      },
      {
        t: "fas fa-temperature-high",
        sT: [],
      },
      {
        t: "far fa-temperature-high",
        sT: [],
      },
      {
        t: "fal fa-temperature-high",
        sT: [],
      },
      {
        t: "fad fa-temperature-high",
        sT: [],
      },
      {
        t: "fas fa-temperature-hot",
        sT: [],
      },
      {
        t: "far fa-temperature-hot",
        sT: [],
      },
      {
        t: "fal fa-temperature-hot",
        sT: [],
      },
      {
        t: "fad fa-temperature-hot",
        sT: [],
      },
      {
        t: "fas fa-temperature-low",
        sT: [],
      },
      {
        t: "far fa-temperature-low",
        sT: [],
      },
      {
        t: "fal fa-temperature-low",
        sT: [],
      },
      {
        t: "fad fa-temperature-low",
        sT: [],
      },
      {
        t: "fas fa-temperature-up",
        sT: [],
      },
      {
        t: "far fa-temperature-up",
        sT: [],
      },
      {
        t: "fal fa-temperature-up",
        sT: [],
      },
      {
        t: "fad fa-temperature-up",
        sT: [],
      },
      {
        t: "fab fa-tencent-weibo",
        sT: [],
      },
      {
        t: "fas fa-tenge",
        sT: [],
      },
      {
        t: "far fa-tenge",
        sT: [],
      },
      {
        t: "fal fa-tenge",
        sT: [],
      },
      {
        t: "fad fa-tenge",
        sT: [],
      },
      {
        t: "fas fa-tennis-ball",
        sT: [],
      },
      {
        t: "far fa-tennis-ball",
        sT: [],
      },
      {
        t: "fal fa-tennis-ball",
        sT: [],
      },
      {
        t: "fad fa-tennis-ball",
        sT: [],
      },
      {
        t: "fas fa-terminal",
        sT: [],
      },
      {
        t: "far fa-terminal",
        sT: [],
      },
      {
        t: "fal fa-terminal",
        sT: [],
      },
      {
        t: "fad fa-terminal",
        sT: [],
      },
      {
        t: "fas fa-text",
        sT: [],
      },
      {
        t: "far fa-text",
        sT: [],
      },
      {
        t: "fal fa-text",
        sT: [],
      },
      {
        t: "fad fa-text",
        sT: [],
      },
      {
        t: "fas fa-text-height",
        sT: [],
      },
      {
        t: "far fa-text-height",
        sT: [],
      },
      {
        t: "fal fa-text-height",
        sT: [],
      },
      {
        t: "fad fa-text-height",
        sT: [],
      },
      {
        t: "fas fa-text-size",
        sT: [],
      },
      {
        t: "far fa-text-size",
        sT: [],
      },
      {
        t: "fal fa-text-size",
        sT: [],
      },
      {
        t: "fad fa-text-size",
        sT: [],
      },
      {
        t: "fas fa-text-width",
        sT: [],
      },
      {
        t: "far fa-text-width",
        sT: [],
      },
      {
        t: "fal fa-text-width",
        sT: [],
      },
      {
        t: "fad fa-text-width",
        sT: [],
      },
      {
        t: "fas fa-th",
        sT: [],
      },
      {
        t: "far fa-th",
        sT: [],
      },
      {
        t: "fal fa-th",
        sT: [],
      },
      {
        t: "fad fa-th",
        sT: [],
      },
      {
        t: "fas fa-th-large",
        sT: [],
      },
      {
        t: "far fa-th-large",
        sT: [],
      },
      {
        t: "fal fa-th-large",
        sT: [],
      },
      {
        t: "fad fa-th-large",
        sT: [],
      },
      {
        t: "fas fa-th-list",
        sT: [],
      },
      {
        t: "far fa-th-list",
        sT: [],
      },
      {
        t: "fal fa-th-list",
        sT: [],
      },
      {
        t: "fad fa-th-list",
        sT: [],
      },
      {
        t: "fab fa-the-red-yeti",
        sT: [],
      },
      {
        t: "fas fa-theater-masks",
        sT: [],
      },
      {
        t: "far fa-theater-masks",
        sT: [],
      },
      {
        t: "fal fa-theater-masks",
        sT: [],
      },
      {
        t: "fad fa-theater-masks",
        sT: [],
      },
      {
        t: "fab fa-themeco",
        sT: [],
      },
      {
        t: "fab fa-themeisle",
        sT: [],
      },
      {
        t: "fas fa-thermometer",
        sT: [],
      },
      {
        t: "far fa-thermometer",
        sT: [],
      },
      {
        t: "fal fa-thermometer",
        sT: [],
      },
      {
        t: "fad fa-thermometer",
        sT: [],
      },
      {
        t: "fas fa-thermometer-empty",
        sT: [],
      },
      {
        t: "far fa-thermometer-empty",
        sT: [],
      },
      {
        t: "fal fa-thermometer-empty",
        sT: [],
      },
      {
        t: "fad fa-thermometer-empty",
        sT: [],
      },
      {
        t: "fas fa-thermometer-full",
        sT: [],
      },
      {
        t: "far fa-thermometer-full",
        sT: [],
      },
      {
        t: "fal fa-thermometer-full",
        sT: [],
      },
      {
        t: "fad fa-thermometer-full",
        sT: [],
      },
      {
        t: "fas fa-thermometer-half",
        sT: [],
      },
      {
        t: "far fa-thermometer-half",
        sT: [],
      },
      {
        t: "fal fa-thermometer-half",
        sT: [],
      },
      {
        t: "fad fa-thermometer-half",
        sT: [],
      },
      {
        t: "fas fa-thermometer-quarter",
        sT: [],
      },
      {
        t: "far fa-thermometer-quarter",
        sT: [],
      },
      {
        t: "fal fa-thermometer-quarter",
        sT: [],
      },
      {
        t: "fad fa-thermometer-quarter",
        sT: [],
      },
      {
        t: "fas fa-thermometer-three-quarters",
        sT: [],
      },
      {
        t: "far fa-thermometer-three-quarters",
        sT: [],
      },
      {
        t: "fal fa-thermometer-three-quarters",
        sT: [],
      },
      {
        t: "fad fa-thermometer-three-quarters",
        sT: [],
      },
      {
        t: "fas fa-theta",
        sT: [],
      },
      {
        t: "far fa-theta",
        sT: [],
      },
      {
        t: "fal fa-theta",
        sT: [],
      },
      {
        t: "fad fa-theta",
        sT: [],
      },
      {
        t: "fab fa-think-peaks",
        sT: [],
      },
      {
        t: "fas fa-thumbs-down",
        sT: [],
      },
      {
        t: "far fa-thumbs-down",
        sT: [],
      },
      {
        t: "fal fa-thumbs-down",
        sT: [],
      },
      {
        t: "fad fa-thumbs-down",
        sT: [],
      },
      {
        t: "fas fa-thumbs-up",
        sT: [],
      },
      {
        t: "far fa-thumbs-up",
        sT: [],
      },
      {
        t: "fal fa-thumbs-up",
        sT: [],
      },
      {
        t: "fad fa-thumbs-up",
        sT: [],
      },
      {
        t: "fas fa-thumbtack",
        sT: [],
      },
      {
        t: "far fa-thumbtack",
        sT: [],
      },
      {
        t: "fal fa-thumbtack",
        sT: [],
      },
      {
        t: "fad fa-thumbtack",
        sT: [],
      },
      {
        t: "fas fa-thunderstorm",
        sT: [],
      },
      {
        t: "far fa-thunderstorm",
        sT: [],
      },
      {
        t: "fal fa-thunderstorm",
        sT: [],
      },
      {
        t: "fad fa-thunderstorm",
        sT: [],
      },
      {
        t: "fas fa-thunderstorm-moon",
        sT: [],
      },
      {
        t: "far fa-thunderstorm-moon",
        sT: [],
      },
      {
        t: "fal fa-thunderstorm-moon",
        sT: [],
      },
      {
        t: "fad fa-thunderstorm-moon",
        sT: [],
      },
      {
        t: "fas fa-thunderstorm-sun",
        sT: [],
      },
      {
        t: "far fa-thunderstorm-sun",
        sT: [],
      },
      {
        t: "fal fa-thunderstorm-sun",
        sT: [],
      },
      {
        t: "fad fa-thunderstorm-sun",
        sT: [],
      },
      {
        t: "fas fa-ticket",
        sT: [],
      },
      {
        t: "far fa-ticket",
        sT: [],
      },
      {
        t: "fal fa-ticket",
        sT: [],
      },
      {
        t: "fad fa-ticket",
        sT: [],
      },
      {
        t: "fas fa-ticket-alt",
        sT: [],
      },
      {
        t: "far fa-ticket-alt",
        sT: [],
      },
      {
        t: "fal fa-ticket-alt",
        sT: [],
      },
      {
        t: "fad fa-ticket-alt",
        sT: [],
      },
      {
        t: "fab fa-tiktok",
        sT: [],
      },
      {
        t: "fas fa-tilde",
        sT: [],
      },
      {
        t: "far fa-tilde",
        sT: [],
      },
      {
        t: "fal fa-tilde",
        sT: [],
      },
      {
        t: "fad fa-tilde",
        sT: [],
      },
      {
        t: "fas fa-times",
        sT: [],
      },
      {
        t: "far fa-times",
        sT: [],
      },
      {
        t: "fal fa-times",
        sT: [],
      },
      {
        t: "fad fa-times",
        sT: [],
      },
      {
        t: "fas fa-times-circle",
        sT: [],
      },
      {
        t: "far fa-times-circle",
        sT: [],
      },
      {
        t: "fal fa-times-circle",
        sT: [],
      },
      {
        t: "fad fa-times-circle",
        sT: [],
      },
      {
        t: "fas fa-times-hexagon",
        sT: [],
      },
      {
        t: "far fa-times-hexagon",
        sT: [],
      },
      {
        t: "fal fa-times-hexagon",
        sT: [],
      },
      {
        t: "fad fa-times-hexagon",
        sT: [],
      },
      {
        t: "fas fa-times-octagon",
        sT: [],
      },
      {
        t: "far fa-times-octagon",
        sT: [],
      },
      {
        t: "fal fa-times-octagon",
        sT: [],
      },
      {
        t: "fad fa-times-octagon",
        sT: [],
      },
      {
        t: "fas fa-times-square",
        sT: [],
      },
      {
        t: "far fa-times-square",
        sT: [],
      },
      {
        t: "fal fa-times-square",
        sT: [],
      },
      {
        t: "fad fa-times-square",
        sT: [],
      },
      {
        t: "fas fa-tint",
        sT: [],
      },
      {
        t: "far fa-tint",
        sT: [],
      },
      {
        t: "fal fa-tint",
        sT: [],
      },
      {
        t: "fad fa-tint",
        sT: [],
      },
      {
        t: "fas fa-tint-slash",
        sT: [],
      },
      {
        t: "far fa-tint-slash",
        sT: [],
      },
      {
        t: "fal fa-tint-slash",
        sT: [],
      },
      {
        t: "fad fa-tint-slash",
        sT: [],
      },
      {
        t: "fas fa-tire",
        sT: [],
      },
      {
        t: "far fa-tire",
        sT: [],
      },
      {
        t: "fal fa-tire",
        sT: [],
      },
      {
        t: "fad fa-tire",
        sT: [],
      },
      {
        t: "fas fa-tire-flat",
        sT: [],
      },
      {
        t: "far fa-tire-flat",
        sT: [],
      },
      {
        t: "fal fa-tire-flat",
        sT: [],
      },
      {
        t: "fad fa-tire-flat",
        sT: [],
      },
      {
        t: "fas fa-tire-pressure-warning",
        sT: [],
      },
      {
        t: "far fa-tire-pressure-warning",
        sT: [],
      },
      {
        t: "fal fa-tire-pressure-warning",
        sT: [],
      },
      {
        t: "fad fa-tire-pressure-warning",
        sT: [],
      },
      {
        t: "fas fa-tire-rugged",
        sT: [],
      },
      {
        t: "far fa-tire-rugged",
        sT: [],
      },
      {
        t: "fal fa-tire-rugged",
        sT: [],
      },
      {
        t: "fad fa-tire-rugged",
        sT: [],
      },
      {
        t: "fas fa-tired",
        sT: [],
      },
      {
        t: "far fa-tired",
        sT: [],
      },
      {
        t: "fal fa-tired",
        sT: [],
      },
      {
        t: "fad fa-tired",
        sT: [],
      },
      {
        t: "fas fa-toggle-off",
        sT: [],
      },
      {
        t: "far fa-toggle-off",
        sT: [],
      },
      {
        t: "fal fa-toggle-off",
        sT: [],
      },
      {
        t: "fad fa-toggle-off",
        sT: [],
      },
      {
        t: "fas fa-toggle-on",
        sT: [],
      },
      {
        t: "far fa-toggle-on",
        sT: [],
      },
      {
        t: "fal fa-toggle-on",
        sT: [],
      },
      {
        t: "fad fa-toggle-on",
        sT: [],
      },
      {
        t: "fas fa-toilet",
        sT: [],
      },
      {
        t: "far fa-toilet",
        sT: [],
      },
      {
        t: "fal fa-toilet",
        sT: [],
      },
      {
        t: "fad fa-toilet",
        sT: [],
      },
      {
        t: "fas fa-toilet-paper",
        sT: [],
      },
      {
        t: "far fa-toilet-paper",
        sT: [],
      },
      {
        t: "fal fa-toilet-paper",
        sT: [],
      },
      {
        t: "fad fa-toilet-paper",
        sT: [],
      },
      {
        t: "fas fa-toilet-paper-alt",
        sT: [],
      },
      {
        t: "far fa-toilet-paper-alt",
        sT: [],
      },
      {
        t: "fal fa-toilet-paper-alt",
        sT: [],
      },
      {
        t: "fad fa-toilet-paper-alt",
        sT: [],
      },
      {
        t: "fal fa-toilet-paper-slash",
        sT: [],
      },
      {
        t: "far fa-toilet-paper-slash",
        sT: [],
      },
      {
        t: "fas fa-toilet-paper-slash",
        sT: [],
      },
      {
        t: "fad fa-toilet-paper-slash",
        sT: [],
      },
      {
        t: "fas fa-tombstone",
        sT: [],
      },
      {
        t: "far fa-tombstone",
        sT: [],
      },
      {
        t: "fal fa-tombstone",
        sT: [],
      },
      {
        t: "fad fa-tombstone",
        sT: [],
      },
      {
        t: "fas fa-tombstone-alt",
        sT: [],
      },
      {
        t: "far fa-tombstone-alt",
        sT: [],
      },
      {
        t: "fal fa-tombstone-alt",
        sT: [],
      },
      {
        t: "fad fa-tombstone-alt",
        sT: [],
      },
      {
        t: "fas fa-toolbox",
        sT: [],
      },
      {
        t: "far fa-toolbox",
        sT: [],
      },
      {
        t: "fal fa-toolbox",
        sT: [],
      },
      {
        t: "fad fa-toolbox",
        sT: [],
      },
      {
        t: "fas fa-tools",
        sT: [],
      },
      {
        t: "far fa-tools",
        sT: [],
      },
      {
        t: "fal fa-tools",
        sT: [],
      },
      {
        t: "fad fa-tools",
        sT: [],
      },
      {
        t: "fas fa-tooth",
        sT: [],
      },
      {
        t: "far fa-tooth",
        sT: [],
      },
      {
        t: "fal fa-tooth",
        sT: [],
      },
      {
        t: "fad fa-tooth",
        sT: [],
      },
      {
        t: "fas fa-toothbrush",
        sT: [],
      },
      {
        t: "far fa-toothbrush",
        sT: [],
      },
      {
        t: "fal fa-toothbrush",
        sT: [],
      },
      {
        t: "fad fa-toothbrush",
        sT: [],
      },
      {
        t: "fas fa-torah",
        sT: [],
      },
      {
        t: "far fa-torah",
        sT: [],
      },
      {
        t: "fal fa-torah",
        sT: [],
      },
      {
        t: "fad fa-torah",
        sT: [],
      },
      {
        t: "fas fa-torii-gate",
        sT: [],
      },
      {
        t: "far fa-torii-gate",
        sT: [],
      },
      {
        t: "fal fa-torii-gate",
        sT: [],
      },
      {
        t: "fad fa-torii-gate",
        sT: [],
      },
      {
        t: "fas fa-tornado",
        sT: [],
      },
      {
        t: "far fa-tornado",
        sT: [],
      },
      {
        t: "fal fa-tornado",
        sT: [],
      },
      {
        t: "fad fa-tornado",
        sT: [],
      },
      {
        t: "fas fa-tractor",
        sT: [],
      },
      {
        t: "far fa-tractor",
        sT: [],
      },
      {
        t: "fal fa-tractor",
        sT: [],
      },
      {
        t: "fad fa-tractor",
        sT: [],
      },
      {
        t: "fab fa-trade-federation",
        sT: [],
      },
      {
        t: "fas fa-trademark",
        sT: [],
      },
      {
        t: "far fa-trademark",
        sT: [],
      },
      {
        t: "fal fa-trademark",
        sT: [],
      },
      {
        t: "fad fa-trademark",
        sT: [],
      },
      {
        t: "fas fa-traffic-cone",
        sT: [],
      },
      {
        t: "far fa-traffic-cone",
        sT: [],
      },
      {
        t: "fal fa-traffic-cone",
        sT: [],
      },
      {
        t: "fad fa-traffic-cone",
        sT: [],
      },
      {
        t: "fas fa-traffic-light",
        sT: [],
      },
      {
        t: "far fa-traffic-light",
        sT: [],
      },
      {
        t: "fal fa-traffic-light",
        sT: [],
      },
      {
        t: "fad fa-traffic-light",
        sT: [],
      },
      {
        t: "fas fa-traffic-light-go",
        sT: [],
      },
      {
        t: "far fa-traffic-light-go",
        sT: [],
      },
      {
        t: "fal fa-traffic-light-go",
        sT: [],
      },
      {
        t: "fad fa-traffic-light-go",
        sT: [],
      },
      {
        t: "fas fa-traffic-light-slow",
        sT: [],
      },
      {
        t: "far fa-traffic-light-slow",
        sT: [],
      },
      {
        t: "fal fa-traffic-light-slow",
        sT: [],
      },
      {
        t: "fad fa-traffic-light-slow",
        sT: [],
      },
      {
        t: "fas fa-traffic-light-stop",
        sT: [],
      },
      {
        t: "far fa-traffic-light-stop",
        sT: [],
      },
      {
        t: "fal fa-traffic-light-stop",
        sT: [],
      },
      {
        t: "fad fa-traffic-light-stop",
        sT: [],
      },
      {
        t: "fas fa-trailer",
        sT: [],
      },
      {
        t: "far fa-trailer",
        sT: [],
      },
      {
        t: "fal fa-trailer",
        sT: [],
      },
      {
        t: "fad fa-trailer",
        sT: [],
      },
      {
        t: "fas fa-train",
        sT: [],
      },
      {
        t: "far fa-train",
        sT: [],
      },
      {
        t: "fal fa-train",
        sT: [],
      },
      {
        t: "fad fa-train",
        sT: [],
      },
      {
        t: "fas fa-tram",
        sT: [],
      },
      {
        t: "far fa-tram",
        sT: [],
      },
      {
        t: "fal fa-tram",
        sT: [],
      },
      {
        t: "fad fa-tram",
        sT: [],
      },
      {
        t: "fas fa-transgender",
        sT: [],
      },
      {
        t: "far fa-transgender",
        sT: [],
      },
      {
        t: "fal fa-transgender",
        sT: [],
      },
      {
        t: "fad fa-transgender",
        sT: [],
      },
      {
        t: "fas fa-transgender-alt",
        sT: [],
      },
      {
        t: "far fa-transgender-alt",
        sT: [],
      },
      {
        t: "fal fa-transgender-alt",
        sT: [],
      },
      {
        t: "fad fa-transgender-alt",
        sT: [],
      },
      {
        t: "fas fa-transporter",
        sT: [],
      },
      {
        t: "far fa-transporter",
        sT: [],
      },
      {
        t: "fal fa-transporter",
        sT: [],
      },
      {
        t: "fad fa-transporter",
        sT: [],
      },
      {
        t: "fas fa-transporter-1",
        sT: [],
      },
      {
        t: "far fa-transporter-1",
        sT: [],
      },
      {
        t: "fal fa-transporter-1",
        sT: [],
      },
      {
        t: "fad fa-transporter-1",
        sT: [],
      },
      {
        t: "fas fa-transporter-2",
        sT: [],
      },
      {
        t: "far fa-transporter-2",
        sT: [],
      },
      {
        t: "fal fa-transporter-2",
        sT: [],
      },
      {
        t: "fad fa-transporter-2",
        sT: [],
      },
      {
        t: "fas fa-transporter-3",
        sT: [],
      },
      {
        t: "far fa-transporter-3",
        sT: [],
      },
      {
        t: "fal fa-transporter-3",
        sT: [],
      },
      {
        t: "fad fa-transporter-3",
        sT: [],
      },
      {
        t: "fas fa-transporter-empty",
        sT: [],
      },
      {
        t: "far fa-transporter-empty",
        sT: [],
      },
      {
        t: "fal fa-transporter-empty",
        sT: [],
      },
      {
        t: "fad fa-transporter-empty",
        sT: [],
      },
      {
        t: "fas fa-trash",
        sT: [],
      },
      {
        t: "far fa-trash",
        sT: [],
      },
      {
        t: "fal fa-trash",
        sT: [],
      },
      {
        t: "fad fa-trash",
        sT: [],
      },
      {
        t: "fas fa-trash-alt",
        sT: [],
      },
      {
        t: "far fa-trash-alt",
        sT: [],
      },
      {
        t: "fal fa-trash-alt",
        sT: [],
      },
      {
        t: "fad fa-trash-alt",
        sT: [],
      },
      {
        t: "fas fa-trash-restore",
        sT: [],
      },
      {
        t: "far fa-trash-restore",
        sT: [],
      },
      {
        t: "fal fa-trash-restore",
        sT: [],
      },
      {
        t: "fad fa-trash-restore",
        sT: [],
      },
      {
        t: "fas fa-trash-restore-alt",
        sT: [],
      },
      {
        t: "far fa-trash-restore-alt",
        sT: [],
      },
      {
        t: "fal fa-trash-restore-alt",
        sT: [],
      },
      {
        t: "fad fa-trash-restore-alt",
        sT: [],
      },
      {
        t: "fas fa-trash-undo",
        sT: [],
      },
      {
        t: "far fa-trash-undo",
        sT: [],
      },
      {
        t: "fal fa-trash-undo",
        sT: [],
      },
      {
        t: "fad fa-trash-undo",
        sT: [],
      },
      {
        t: "fas fa-trash-undo-alt",
        sT: [],
      },
      {
        t: "far fa-trash-undo-alt",
        sT: [],
      },
      {
        t: "fal fa-trash-undo-alt",
        sT: [],
      },
      {
        t: "fad fa-trash-undo-alt",
        sT: [],
      },
      {
        t: "fas fa-treasure-chest",
        sT: [],
      },
      {
        t: "far fa-treasure-chest",
        sT: [],
      },
      {
        t: "fal fa-treasure-chest",
        sT: [],
      },
      {
        t: "fad fa-treasure-chest",
        sT: [],
      },
      {
        t: "fas fa-tree",
        sT: [],
      },
      {
        t: "far fa-tree",
        sT: [],
      },
      {
        t: "fal fa-tree",
        sT: [],
      },
      {
        t: "fad fa-tree",
        sT: [],
      },
      {
        t: "fas fa-tree-alt",
        sT: [],
      },
      {
        t: "far fa-tree-alt",
        sT: [],
      },
      {
        t: "fal fa-tree-alt",
        sT: [],
      },
      {
        t: "fad fa-tree-alt",
        sT: [],
      },
      {
        t: "fas fa-tree-christmas",
        sT: [],
      },
      {
        t: "far fa-tree-christmas",
        sT: [],
      },
      {
        t: "fal fa-tree-christmas",
        sT: [],
      },
      {
        t: "fad fa-tree-christmas",
        sT: [],
      },
      {
        t: "fas fa-tree-decorated",
        sT: [],
      },
      {
        t: "far fa-tree-decorated",
        sT: [],
      },
      {
        t: "fal fa-tree-decorated",
        sT: [],
      },
      {
        t: "fad fa-tree-decorated",
        sT: [],
      },
      {
        t: "fas fa-tree-large",
        sT: [],
      },
      {
        t: "far fa-tree-large",
        sT: [],
      },
      {
        t: "fal fa-tree-large",
        sT: [],
      },
      {
        t: "fad fa-tree-large",
        sT: [],
      },
      {
        t: "fas fa-tree-palm",
        sT: [],
      },
      {
        t: "far fa-tree-palm",
        sT: [],
      },
      {
        t: "fal fa-tree-palm",
        sT: [],
      },
      {
        t: "fad fa-tree-palm",
        sT: [],
      },
      {
        t: "fas fa-trees",
        sT: [],
      },
      {
        t: "far fa-trees",
        sT: [],
      },
      {
        t: "fal fa-trees",
        sT: [],
      },
      {
        t: "fad fa-trees",
        sT: [],
      },
      {
        t: "fab fa-trello",
        sT: [],
      },
      {
        t: "fas fa-triangle",
        sT: [],
      },
      {
        t: "far fa-triangle",
        sT: [],
      },
      {
        t: "fal fa-triangle",
        sT: [],
      },
      {
        t: "fad fa-triangle",
        sT: [],
      },
      {
        t: "fas fa-triangle-music",
        sT: [],
      },
      {
        t: "far fa-triangle-music",
        sT: [],
      },
      {
        t: "fal fa-triangle-music",
        sT: [],
      },
      {
        t: "fad fa-triangle-music",
        sT: [],
      },
      {
        t: "fas fa-trophy",
        sT: [],
      },
      {
        t: "far fa-trophy",
        sT: [],
      },
      {
        t: "fal fa-trophy",
        sT: [],
      },
      {
        t: "fad fa-trophy",
        sT: [],
      },
      {
        t: "fas fa-trophy-alt",
        sT: [],
      },
      {
        t: "far fa-trophy-alt",
        sT: [],
      },
      {
        t: "fal fa-trophy-alt",
        sT: [],
      },
      {
        t: "fad fa-trophy-alt",
        sT: [],
      },
      {
        t: "fas fa-truck",
        sT: [],
      },
      {
        t: "far fa-truck",
        sT: [],
      },
      {
        t: "fal fa-truck",
        sT: [],
      },
      {
        t: "fad fa-truck",
        sT: [],
      },
      {
        t: "fas fa-truck-container",
        sT: [],
      },
      {
        t: "far fa-truck-container",
        sT: [],
      },
      {
        t: "fal fa-truck-container",
        sT: [],
      },
      {
        t: "fad fa-truck-container",
        sT: [],
      },
      {
        t: "fas fa-truck-couch",
        sT: [],
      },
      {
        t: "far fa-truck-couch",
        sT: [],
      },
      {
        t: "fal fa-truck-couch",
        sT: [],
      },
      {
        t: "fad fa-truck-couch",
        sT: [],
      },
      {
        t: "fas fa-truck-loading",
        sT: [],
      },
      {
        t: "far fa-truck-loading",
        sT: [],
      },
      {
        t: "fal fa-truck-loading",
        sT: [],
      },
      {
        t: "fad fa-truck-loading",
        sT: [],
      },
      {
        t: "fas fa-truck-monster",
        sT: [],
      },
      {
        t: "far fa-truck-monster",
        sT: [],
      },
      {
        t: "fal fa-truck-monster",
        sT: [],
      },
      {
        t: "fad fa-truck-monster",
        sT: [],
      },
      {
        t: "fas fa-truck-moving",
        sT: [],
      },
      {
        t: "far fa-truck-moving",
        sT: [],
      },
      {
        t: "fal fa-truck-moving",
        sT: [],
      },
      {
        t: "fad fa-truck-moving",
        sT: [],
      },
      {
        t: "fas fa-truck-pickup",
        sT: [],
      },
      {
        t: "far fa-truck-pickup",
        sT: [],
      },
      {
        t: "fal fa-truck-pickup",
        sT: [],
      },
      {
        t: "fad fa-truck-pickup",
        sT: [],
      },
      {
        t: "fas fa-truck-plow",
        sT: [],
      },
      {
        t: "far fa-truck-plow",
        sT: [],
      },
      {
        t: "fal fa-truck-plow",
        sT: [],
      },
      {
        t: "fad fa-truck-plow",
        sT: [],
      },
      {
        t: "fas fa-truck-ramp",
        sT: [],
      },
      {
        t: "far fa-truck-ramp",
        sT: [],
      },
      {
        t: "fal fa-truck-ramp",
        sT: [],
      },
      {
        t: "fad fa-truck-ramp",
        sT: [],
      },
      {
        t: "fas fa-trumpet",
        sT: [],
      },
      {
        t: "far fa-trumpet",
        sT: [],
      },
      {
        t: "fal fa-trumpet",
        sT: [],
      },
      {
        t: "fad fa-trumpet",
        sT: [],
      },
      {
        t: "fas fa-tshirt",
        sT: [],
      },
      {
        t: "far fa-tshirt",
        sT: [],
      },
      {
        t: "fal fa-tshirt",
        sT: [],
      },
      {
        t: "fad fa-tshirt",
        sT: [],
      },
      {
        t: "fas fa-tty",
        sT: [],
      },
      {
        t: "far fa-tty",
        sT: [],
      },
      {
        t: "fal fa-tty",
        sT: [],
      },
      {
        t: "fad fa-tty",
        sT: [],
      },
      {
        t: "fab fa-tumblr",
        sT: [],
      },
      {
        t: "fab fa-tumblr-square",
        sT: [],
      },
      {
        t: "fas fa-turkey",
        sT: [],
      },
      {
        t: "far fa-turkey",
        sT: [],
      },
      {
        t: "fal fa-turkey",
        sT: [],
      },
      {
        t: "fad fa-turkey",
        sT: [],
      },
      {
        t: "fas fa-turntable",
        sT: [],
      },
      {
        t: "far fa-turntable",
        sT: [],
      },
      {
        t: "fal fa-turntable",
        sT: [],
      },
      {
        t: "fad fa-turntable",
        sT: [],
      },
      {
        t: "fas fa-turtle",
        sT: [],
      },
      {
        t: "far fa-turtle",
        sT: [],
      },
      {
        t: "fal fa-turtle",
        sT: [],
      },
      {
        t: "fad fa-turtle",
        sT: [],
      },
      {
        t: "fas fa-tv",
        sT: [],
      },
      {
        t: "far fa-tv",
        sT: [],
      },
      {
        t: "fal fa-tv",
        sT: [],
      },
      {
        t: "fad fa-tv",
        sT: [],
      },
      {
        t: "fas fa-tv-alt",
        sT: [],
      },
      {
        t: "far fa-tv-alt",
        sT: [],
      },
      {
        t: "fal fa-tv-alt",
        sT: [],
      },
      {
        t: "fad fa-tv-alt",
        sT: [],
      },
      {
        t: "fas fa-tv-music",
        sT: [],
      },
      {
        t: "far fa-tv-music",
        sT: [],
      },
      {
        t: "fal fa-tv-music",
        sT: [],
      },
      {
        t: "fad fa-tv-music",
        sT: [],
      },
      {
        t: "fas fa-tv-retro",
        sT: [],
      },
      {
        t: "far fa-tv-retro",
        sT: [],
      },
      {
        t: "fal fa-tv-retro",
        sT: [],
      },
      {
        t: "fad fa-tv-retro",
        sT: [],
      },
      {
        t: "fab fa-twitch",
        sT: [],
      },
      {
        t: "fab fa-twitter",
        sT: [],
      },
      {
        t: "fab fa-twitter-square",
        sT: [],
      },
      {
        t: "fas fa-typewriter",
        sT: [],
      },
      {
        t: "far fa-typewriter",
        sT: [],
      },
      {
        t: "fal fa-typewriter",
        sT: [],
      },
      {
        t: "fad fa-typewriter",
        sT: [],
      },
      {
        t: "fab fa-typo3",
        sT: [],
      },
      {
        t: "fab fa-uber",
        sT: [],
      },
      {
        t: "fab fa-ubuntu",
        sT: [],
      },
      {
        t: "fas fa-ufo",
        sT: [],
      },
      {
        t: "far fa-ufo",
        sT: [],
      },
      {
        t: "fal fa-ufo",
        sT: [],
      },
      {
        t: "fad fa-ufo",
        sT: [],
      },
      {
        t: "fas fa-ufo-beam",
        sT: [],
      },
      {
        t: "far fa-ufo-beam",
        sT: [],
      },
      {
        t: "fal fa-ufo-beam",
        sT: [],
      },
      {
        t: "fad fa-ufo-beam",
        sT: [],
      },
      {
        t: "fab fa-uikit",
        sT: [],
      },
      {
        t: "fab fa-umbraco",
        sT: [],
      },
      {
        t: "fas fa-umbrella",
        sT: [],
      },
      {
        t: "far fa-umbrella",
        sT: [],
      },
      {
        t: "fal fa-umbrella",
        sT: [],
      },
      {
        t: "fad fa-umbrella",
        sT: [],
      },
      {
        t: "fas fa-umbrella-beach",
        sT: [],
      },
      {
        t: "far fa-umbrella-beach",
        sT: [],
      },
      {
        t: "fal fa-umbrella-beach",
        sT: [],
      },
      {
        t: "fad fa-umbrella-beach",
        sT: [],
      },
      {
        t: "fab fa-uncharted",
        sT: [],
      },
      {
        t: "fas fa-underline",
        sT: [],
      },
      {
        t: "far fa-underline",
        sT: [],
      },
      {
        t: "fal fa-underline",
        sT: [],
      },
      {
        t: "fad fa-underline",
        sT: [],
      },
      {
        t: "fas fa-undo",
        sT: [],
      },
      {
        t: "far fa-undo",
        sT: [],
      },
      {
        t: "fal fa-undo",
        sT: [],
      },
      {
        t: "fad fa-undo",
        sT: [],
      },
      {
        t: "fas fa-undo-alt",
        sT: [],
      },
      {
        t: "far fa-undo-alt",
        sT: [],
      },
      {
        t: "fal fa-undo-alt",
        sT: [],
      },
      {
        t: "fad fa-undo-alt",
        sT: [],
      },
      {
        t: "fas fa-unicorn",
        sT: [],
      },
      {
        t: "far fa-unicorn",
        sT: [],
      },
      {
        t: "fal fa-unicorn",
        sT: [],
      },
      {
        t: "fad fa-unicorn",
        sT: [],
      },
      {
        t: "fas fa-union",
        sT: [],
      },
      {
        t: "far fa-union",
        sT: [],
      },
      {
        t: "fal fa-union",
        sT: [],
      },
      {
        t: "fad fa-union",
        sT: [],
      },
      {
        t: "fab fa-uniregistry",
        sT: [],
      },
      {
        t: "fab fa-unity",
        sT: [],
      },
      {
        t: "fas fa-universal-access",
        sT: [],
      },
      {
        t: "far fa-universal-access",
        sT: [],
      },
      {
        t: "fal fa-universal-access",
        sT: [],
      },
      {
        t: "fad fa-universal-access",
        sT: [],
      },
      {
        t: "fas fa-university",
        sT: [],
      },
      {
        t: "far fa-university",
        sT: [],
      },
      {
        t: "fal fa-university",
        sT: [],
      },
      {
        t: "fad fa-university",
        sT: [],
      },
      {
        t: "fas fa-unlink",
        sT: [],
      },
      {
        t: "far fa-unlink",
        sT: [],
      },
      {
        t: "fal fa-unlink",
        sT: [],
      },
      {
        t: "fad fa-unlink",
        sT: [],
      },
      {
        t: "fas fa-unlock",
        sT: [],
      },
      {
        t: "far fa-unlock",
        sT: [],
      },
      {
        t: "fal fa-unlock",
        sT: [],
      },
      {
        t: "fad fa-unlock",
        sT: [],
      },
      {
        t: "fas fa-unlock-alt",
        sT: [],
      },
      {
        t: "far fa-unlock-alt",
        sT: [],
      },
      {
        t: "fal fa-unlock-alt",
        sT: [],
      },
      {
        t: "fad fa-unlock-alt",
        sT: [],
      },
      {
        t: "fab fa-unsplash",
        sT: [],
      },
      {
        t: "fab fa-untappd",
        sT: [],
      },
      {
        t: "fas fa-upload",
        sT: [],
      },
      {
        t: "far fa-upload",
        sT: [],
      },
      {
        t: "fal fa-upload",
        sT: [],
      },
      {
        t: "fad fa-upload",
        sT: [],
      },
      {
        t: "fab fa-ups",
        sT: [],
      },
      {
        t: "fab fa-usb",
        sT: [],
      },
      {
        t: "fas fa-usb-drive",
        sT: [],
      },
      {
        t: "far fa-usb-drive",
        sT: [],
      },
      {
        t: "fal fa-usb-drive",
        sT: [],
      },
      {
        t: "fad fa-usb-drive",
        sT: [],
      },
      {
        t: "fas fa-usd-circle",
        sT: [],
      },
      {
        t: "far fa-usd-circle",
        sT: [],
      },
      {
        t: "fal fa-usd-circle",
        sT: [],
      },
      {
        t: "fad fa-usd-circle",
        sT: [],
      },
      {
        t: "fas fa-usd-square",
        sT: [],
      },
      {
        t: "far fa-usd-square",
        sT: [],
      },
      {
        t: "fal fa-usd-square",
        sT: [],
      },
      {
        t: "fad fa-usd-square",
        sT: [],
      },
      {
        t: "fas fa-user",
        sT: [],
      },
      {
        t: "far fa-user",
        sT: [],
      },
      {
        t: "fal fa-user",
        sT: [],
      },
      {
        t: "fad fa-user",
        sT: [],
      },
      {
        t: "fas fa-user-alien",
        sT: [],
      },
      {
        t: "far fa-user-alien",
        sT: [],
      },
      {
        t: "fal fa-user-alien",
        sT: [],
      },
      {
        t: "fad fa-user-alien",
        sT: [],
      },
      {
        t: "fas fa-user-alt",
        sT: [],
      },
      {
        t: "far fa-user-alt",
        sT: [],
      },
      {
        t: "fal fa-user-alt",
        sT: [],
      },
      {
        t: "fad fa-user-alt",
        sT: [],
      },
      {
        t: "fas fa-user-alt-slash",
        sT: [],
      },
      {
        t: "far fa-user-alt-slash",
        sT: [],
      },
      {
        t: "fal fa-user-alt-slash",
        sT: [],
      },
      {
        t: "fad fa-user-alt-slash",
        sT: [],
      },
      {
        t: "fas fa-user-astronaut",
        sT: [],
      },
      {
        t: "far fa-user-astronaut",
        sT: [],
      },
      {
        t: "fal fa-user-astronaut",
        sT: [],
      },
      {
        t: "fad fa-user-astronaut",
        sT: [],
      },
      {
        t: "fas fa-user-chart",
        sT: [],
      },
      {
        t: "far fa-user-chart",
        sT: [],
      },
      {
        t: "fal fa-user-chart",
        sT: [],
      },
      {
        t: "fad fa-user-chart",
        sT: [],
      },
      {
        t: "fas fa-user-check",
        sT: [],
      },
      {
        t: "far fa-user-check",
        sT: [],
      },
      {
        t: "fal fa-user-check",
        sT: [],
      },
      {
        t: "fad fa-user-check",
        sT: [],
      },
      {
        t: "fas fa-user-circle",
        sT: [],
      },
      {
        t: "far fa-user-circle",
        sT: [],
      },
      {
        t: "fal fa-user-circle",
        sT: [],
      },
      {
        t: "fad fa-user-circle",
        sT: [],
      },
      {
        t: "fas fa-user-clock",
        sT: [],
      },
      {
        t: "far fa-user-clock",
        sT: [],
      },
      {
        t: "fal fa-user-clock",
        sT: [],
      },
      {
        t: "fad fa-user-clock",
        sT: [],
      },
      {
        t: "fas fa-user-cog",
        sT: [],
      },
      {
        t: "far fa-user-cog",
        sT: [],
      },
      {
        t: "fal fa-user-cog",
        sT: [],
      },
      {
        t: "fad fa-user-cog",
        sT: [],
      },
      {
        t: "fal fa-user-cowboy",
        sT: [],
      },
      {
        t: "far fa-user-cowboy",
        sT: [],
      },
      {
        t: "fas fa-user-cowboy",
        sT: [],
      },
      {
        t: "fad fa-user-cowboy",
        sT: [],
      },
      {
        t: "fas fa-user-crown",
        sT: [],
      },
      {
        t: "far fa-user-crown",
        sT: [],
      },
      {
        t: "fal fa-user-crown",
        sT: [],
      },
      {
        t: "fad fa-user-crown",
        sT: [],
      },
      {
        t: "fas fa-user-edit",
        sT: [],
      },
      {
        t: "far fa-user-edit",
        sT: [],
      },
      {
        t: "fal fa-user-edit",
        sT: [],
      },
      {
        t: "fad fa-user-edit",
        sT: [],
      },
      {
        t: "fas fa-user-friends",
        sT: [],
      },
      {
        t: "far fa-user-friends",
        sT: [],
      },
      {
        t: "fal fa-user-friends",
        sT: [],
      },
      {
        t: "fad fa-user-friends",
        sT: [],
      },
      {
        t: "fas fa-user-graduate",
        sT: [],
      },
      {
        t: "far fa-user-graduate",
        sT: [],
      },
      {
        t: "fal fa-user-graduate",
        sT: [],
      },
      {
        t: "fad fa-user-graduate",
        sT: [],
      },
      {
        t: "fas fa-user-hard-hat",
        sT: [],
      },
      {
        t: "far fa-user-hard-hat",
        sT: [],
      },
      {
        t: "fal fa-user-hard-hat",
        sT: [],
      },
      {
        t: "fad fa-user-hard-hat",
        sT: [],
      },
      {
        t: "fas fa-user-headset",
        sT: [],
      },
      {
        t: "far fa-user-headset",
        sT: [],
      },
      {
        t: "fal fa-user-headset",
        sT: [],
      },
      {
        t: "fad fa-user-headset",
        sT: [],
      },
      {
        t: "fas fa-user-injured",
        sT: [],
      },
      {
        t: "far fa-user-injured",
        sT: [],
      },
      {
        t: "fal fa-user-injured",
        sT: [],
      },
      {
        t: "fad fa-user-injured",
        sT: [],
      },
      {
        t: "fas fa-user-lock",
        sT: [],
      },
      {
        t: "far fa-user-lock",
        sT: [],
      },
      {
        t: "fal fa-user-lock",
        sT: [],
      },
      {
        t: "fad fa-user-lock",
        sT: [],
      },
      {
        t: "fas fa-user-md",
        sT: [],
      },
      {
        t: "far fa-user-md",
        sT: [],
      },
      {
        t: "fal fa-user-md",
        sT: [],
      },
      {
        t: "fad fa-user-md",
        sT: [],
      },
      {
        t: "fas fa-user-md-chat",
        sT: [],
      },
      {
        t: "far fa-user-md-chat",
        sT: [],
      },
      {
        t: "fal fa-user-md-chat",
        sT: [],
      },
      {
        t: "fad fa-user-md-chat",
        sT: [],
      },
      {
        t: "fas fa-user-minus",
        sT: [],
      },
      {
        t: "far fa-user-minus",
        sT: [],
      },
      {
        t: "fal fa-user-minus",
        sT: [],
      },
      {
        t: "fad fa-user-minus",
        sT: [],
      },
      {
        t: "fas fa-user-music",
        sT: [],
      },
      {
        t: "far fa-user-music",
        sT: [],
      },
      {
        t: "fal fa-user-music",
        sT: [],
      },
      {
        t: "fad fa-user-music",
        sT: [],
      },
      {
        t: "fas fa-user-ninja",
        sT: [],
      },
      {
        t: "far fa-user-ninja",
        sT: [],
      },
      {
        t: "fal fa-user-ninja",
        sT: [],
      },
      {
        t: "fad fa-user-ninja",
        sT: [],
      },
      {
        t: "fas fa-user-nurse",
        sT: [],
      },
      {
        t: "far fa-user-nurse",
        sT: [],
      },
      {
        t: "fal fa-user-nurse",
        sT: [],
      },
      {
        t: "fad fa-user-nurse",
        sT: [],
      },
      {
        t: "fas fa-user-plus",
        sT: [],
      },
      {
        t: "far fa-user-plus",
        sT: [],
      },
      {
        t: "fal fa-user-plus",
        sT: [],
      },
      {
        t: "fad fa-user-plus",
        sT: [],
      },
      {
        t: "fas fa-user-robot",
        sT: [],
      },
      {
        t: "far fa-user-robot",
        sT: [],
      },
      {
        t: "fal fa-user-robot",
        sT: [],
      },
      {
        t: "fad fa-user-robot",
        sT: [],
      },
      {
        t: "fas fa-user-secret",
        sT: [],
      },
      {
        t: "far fa-user-secret",
        sT: [],
      },
      {
        t: "fal fa-user-secret",
        sT: [],
      },
      {
        t: "fad fa-user-secret",
        sT: [],
      },
      {
        t: "fas fa-user-shield",
        sT: [],
      },
      {
        t: "far fa-user-shield",
        sT: [],
      },
      {
        t: "fal fa-user-shield",
        sT: [],
      },
      {
        t: "fad fa-user-shield",
        sT: [],
      },
      {
        t: "fas fa-user-slash",
        sT: [],
      },
      {
        t: "far fa-user-slash",
        sT: [],
      },
      {
        t: "fal fa-user-slash",
        sT: [],
      },
      {
        t: "fad fa-user-slash",
        sT: [],
      },
      {
        t: "fas fa-user-tag",
        sT: [],
      },
      {
        t: "far fa-user-tag",
        sT: [],
      },
      {
        t: "fal fa-user-tag",
        sT: [],
      },
      {
        t: "fad fa-user-tag",
        sT: [],
      },
      {
        t: "fas fa-user-tie",
        sT: [],
      },
      {
        t: "far fa-user-tie",
        sT: [],
      },
      {
        t: "fal fa-user-tie",
        sT: [],
      },
      {
        t: "fad fa-user-tie",
        sT: [],
      },
      {
        t: "fas fa-user-times",
        sT: [],
      },
      {
        t: "far fa-user-times",
        sT: [],
      },
      {
        t: "fal fa-user-times",
        sT: [],
      },
      {
        t: "fad fa-user-times",
        sT: [],
      },
      {
        t: "fal fa-user-unlock",
        sT: [],
      },
      {
        t: "far fa-user-unlock",
        sT: [],
      },
      {
        t: "fas fa-user-unlock",
        sT: [],
      },
      {
        t: "fad fa-user-unlock",
        sT: [],
      },
      {
        t: "fas fa-user-visor",
        sT: [],
      },
      {
        t: "far fa-user-visor",
        sT: [],
      },
      {
        t: "fal fa-user-visor",
        sT: [],
      },
      {
        t: "fad fa-user-visor",
        sT: [],
      },
      {
        t: "fas fa-users",
        sT: [],
      },
      {
        t: "far fa-users",
        sT: [],
      },
      {
        t: "fal fa-users",
        sT: [],
      },
      {
        t: "fad fa-users",
        sT: [],
      },
      {
        t: "fas fa-users-class",
        sT: [],
      },
      {
        t: "far fa-users-class",
        sT: [],
      },
      {
        t: "fal fa-users-class",
        sT: [],
      },
      {
        t: "fad fa-users-class",
        sT: [],
      },
      {
        t: "fas fa-users-cog",
        sT: [],
      },
      {
        t: "far fa-users-cog",
        sT: [],
      },
      {
        t: "fal fa-users-cog",
        sT: [],
      },
      {
        t: "fad fa-users-cog",
        sT: [],
      },
      {
        t: "fas fa-users-crown",
        sT: [],
      },
      {
        t: "far fa-users-crown",
        sT: [],
      },
      {
        t: "fal fa-users-crown",
        sT: [],
      },
      {
        t: "fad fa-users-crown",
        sT: [],
      },
      {
        t: "fas fa-users-medical",
        sT: [],
      },
      {
        t: "far fa-users-medical",
        sT: [],
      },
      {
        t: "fal fa-users-medical",
        sT: [],
      },
      {
        t: "fad fa-users-medical",
        sT: [],
      },
      {
        t: "fal fa-users-slash",
        sT: [],
      },
      {
        t: "far fa-users-slash",
        sT: [],
      },
      {
        t: "fas fa-users-slash",
        sT: [],
      },
      {
        t: "fad fa-users-slash",
        sT: [],
      },
      {
        t: "fab fa-usps",
        sT: [],
      },
      {
        t: "fab fa-ussunnah",
        sT: [],
      },
      {
        t: "fas fa-utensil-fork",
        sT: [],
      },
      {
        t: "far fa-utensil-fork",
        sT: [],
      },
      {
        t: "fal fa-utensil-fork",
        sT: [],
      },
      {
        t: "fad fa-utensil-fork",
        sT: [],
      },
      {
        t: "fas fa-utensil-knife",
        sT: [],
      },
      {
        t: "far fa-utensil-knife",
        sT: [],
      },
      {
        t: "fal fa-utensil-knife",
        sT: [],
      },
      {
        t: "fad fa-utensil-knife",
        sT: [],
      },
      {
        t: "fas fa-utensil-spoon",
        sT: [],
      },
      {
        t: "far fa-utensil-spoon",
        sT: [],
      },
      {
        t: "fal fa-utensil-spoon",
        sT: [],
      },
      {
        t: "fad fa-utensil-spoon",
        sT: [],
      },
      {
        t: "fas fa-utensils",
        sT: [],
      },
      {
        t: "far fa-utensils",
        sT: [],
      },
      {
        t: "fal fa-utensils",
        sT: [],
      },
      {
        t: "fad fa-utensils",
        sT: [],
      },
      {
        t: "fas fa-utensils-alt",
        sT: [],
      },
      {
        t: "far fa-utensils-alt",
        sT: [],
      },
      {
        t: "fal fa-utensils-alt",
        sT: [],
      },
      {
        t: "fad fa-utensils-alt",
        sT: [],
      },
      {
        t: "fab fa-vaadin",
        sT: [],
      },
      {
        t: "fas fa-vacuum",
        sT: [],
      },
      {
        t: "far fa-vacuum",
        sT: [],
      },
      {
        t: "fal fa-vacuum",
        sT: [],
      },
      {
        t: "fad fa-vacuum",
        sT: [],
      },
      {
        t: "fas fa-vacuum-robot",
        sT: [],
      },
      {
        t: "far fa-vacuum-robot",
        sT: [],
      },
      {
        t: "fal fa-vacuum-robot",
        sT: [],
      },
      {
        t: "fad fa-vacuum-robot",
        sT: [],
      },
      {
        t: "fas fa-value-absolute",
        sT: [],
      },
      {
        t: "far fa-value-absolute",
        sT: [],
      },
      {
        t: "fal fa-value-absolute",
        sT: [],
      },
      {
        t: "fad fa-value-absolute",
        sT: [],
      },
      {
        t: "fas fa-vector-square",
        sT: [],
      },
      {
        t: "far fa-vector-square",
        sT: [],
      },
      {
        t: "fal fa-vector-square",
        sT: [],
      },
      {
        t: "fad fa-vector-square",
        sT: [],
      },
      {
        t: "fas fa-venus",
        sT: [],
      },
      {
        t: "far fa-venus",
        sT: [],
      },
      {
        t: "fal fa-venus",
        sT: [],
      },
      {
        t: "fad fa-venus",
        sT: [],
      },
      {
        t: "fas fa-venus-double",
        sT: [],
      },
      {
        t: "far fa-venus-double",
        sT: [],
      },
      {
        t: "fal fa-venus-double",
        sT: [],
      },
      {
        t: "fad fa-venus-double",
        sT: [],
      },
      {
        t: "fas fa-venus-mars",
        sT: [],
      },
      {
        t: "far fa-venus-mars",
        sT: [],
      },
      {
        t: "fal fa-venus-mars",
        sT: [],
      },
      {
        t: "fad fa-venus-mars",
        sT: [],
      },
      {
        t: "fas fa-vest",
        sT: [],
      },
      {
        t: "fal fa-vest",
        sT: [],
      },
      {
        t: "far fa-vest",
        sT: [],
      },
      {
        t: "fad fa-vest",
        sT: [],
      },
      {
        t: "fas fa-vest-patches",
        sT: [],
      },
      {
        t: "fal fa-vest-patches",
        sT: [],
      },
      {
        t: "far fa-vest-patches",
        sT: [],
      },
      {
        t: "fad fa-vest-patches",
        sT: [],
      },
      {
        t: "fas fa-vhs",
        sT: [],
      },
      {
        t: "far fa-vhs",
        sT: [],
      },
      {
        t: "fal fa-vhs",
        sT: [],
      },
      {
        t: "fad fa-vhs",
        sT: [],
      },
      {
        t: "fab fa-viacoin",
        sT: [],
      },
      {
        t: "fab fa-viadeo",
        sT: [],
      },
      {
        t: "fab fa-viadeo-square",
        sT: [],
      },
      {
        t: "fas fa-vial",
        sT: [],
      },
      {
        t: "far fa-vial",
        sT: [],
      },
      {
        t: "fal fa-vial",
        sT: [],
      },
      {
        t: "fad fa-vial",
        sT: [],
      },
      {
        t: "fas fa-vials",
        sT: [],
      },
      {
        t: "far fa-vials",
        sT: [],
      },
      {
        t: "fal fa-vials",
        sT: [],
      },
      {
        t: "fad fa-vials",
        sT: [],
      },
      {
        t: "fab fa-viber",
        sT: [],
      },
      {
        t: "fas fa-video",
        sT: [],
      },
      {
        t: "far fa-video",
        sT: [],
      },
      {
        t: "fal fa-video",
        sT: [],
      },
      {
        t: "fad fa-video",
        sT: [],
      },
      {
        t: "fas fa-video-plus",
        sT: [],
      },
      {
        t: "far fa-video-plus",
        sT: [],
      },
      {
        t: "fal fa-video-plus",
        sT: [],
      },
      {
        t: "fad fa-video-plus",
        sT: [],
      },
      {
        t: "fas fa-video-slash",
        sT: [],
      },
      {
        t: "far fa-video-slash",
        sT: [],
      },
      {
        t: "fal fa-video-slash",
        sT: [],
      },
      {
        t: "fad fa-video-slash",
        sT: [],
      },
      {
        t: "fas fa-vihara",
        sT: [],
      },
      {
        t: "far fa-vihara",
        sT: [],
      },
      {
        t: "fal fa-vihara",
        sT: [],
      },
      {
        t: "fad fa-vihara",
        sT: [],
      },
      {
        t: "fab fa-vimeo",
        sT: [],
      },
      {
        t: "fab fa-vimeo-square",
        sT: [],
      },
      {
        t: "fab fa-vimeo-v",
        sT: [],
      },
      {
        t: "fab fa-vine",
        sT: [],
      },
      {
        t: "fas fa-violin",
        sT: [],
      },
      {
        t: "far fa-violin",
        sT: [],
      },
      {
        t: "fal fa-violin",
        sT: [],
      },
      {
        t: "fad fa-violin",
        sT: [],
      },
      {
        t: "fal fa-virus",
        sT: [],
      },
      {
        t: "far fa-virus",
        sT: [],
      },
      {
        t: "fas fa-virus",
        sT: [],
      },
      {
        t: "fad fa-virus",
        sT: [],
      },
      {
        t: "fal fa-virus-slash",
        sT: [],
      },
      {
        t: "far fa-virus-slash",
        sT: [],
      },
      {
        t: "fas fa-virus-slash",
        sT: [],
      },
      {
        t: "fad fa-virus-slash",
        sT: [],
      },
      {
        t: "fal fa-viruses",
        sT: [],
      },
      {
        t: "far fa-viruses",
        sT: [],
      },
      {
        t: "fas fa-viruses",
        sT: [],
      },
      {
        t: "fad fa-viruses",
        sT: [],
      },
      {
        t: "fab fa-vk",
        sT: [],
      },
      {
        t: "fab fa-vnv",
        sT: [],
      },
      {
        t: "fas fa-voicemail",
        sT: [],
      },
      {
        t: "far fa-voicemail",
        sT: [],
      },
      {
        t: "fal fa-voicemail",
        sT: [],
      },
      {
        t: "fad fa-voicemail",
        sT: [],
      },
      {
        t: "fas fa-volcano",
        sT: [],
      },
      {
        t: "far fa-volcano",
        sT: [],
      },
      {
        t: "fal fa-volcano",
        sT: [],
      },
      {
        t: "fad fa-volcano",
        sT: [],
      },
      {
        t: "fas fa-volleyball-ball",
        sT: [],
      },
      {
        t: "far fa-volleyball-ball",
        sT: [],
      },
      {
        t: "fal fa-volleyball-ball",
        sT: [],
      },
      {
        t: "fad fa-volleyball-ball",
        sT: [],
      },
      {
        t: "fas fa-volume",
        sT: [],
      },
      {
        t: "far fa-volume",
        sT: [],
      },
      {
        t: "fal fa-volume",
        sT: [],
      },
      {
        t: "fad fa-volume",
        sT: [],
      },
      {
        t: "fas fa-volume-down",
        sT: [],
      },
      {
        t: "far fa-volume-down",
        sT: [],
      },
      {
        t: "fal fa-volume-down",
        sT: [],
      },
      {
        t: "fad fa-volume-down",
        sT: [],
      },
      {
        t: "fas fa-volume-mute",
        sT: [],
      },
      {
        t: "far fa-volume-mute",
        sT: [],
      },
      {
        t: "fal fa-volume-mute",
        sT: [],
      },
      {
        t: "fad fa-volume-mute",
        sT: [],
      },
      {
        t: "fas fa-volume-off",
        sT: [],
      },
      {
        t: "far fa-volume-off",
        sT: [],
      },
      {
        t: "fal fa-volume-off",
        sT: [],
      },
      {
        t: "fad fa-volume-off",
        sT: [],
      },
      {
        t: "fas fa-volume-slash",
        sT: [],
      },
      {
        t: "far fa-volume-slash",
        sT: [],
      },
      {
        t: "fal fa-volume-slash",
        sT: [],
      },
      {
        t: "fad fa-volume-slash",
        sT: [],
      },
      {
        t: "fas fa-volume-up",
        sT: [],
      },
      {
        t: "far fa-volume-up",
        sT: [],
      },
      {
        t: "fal fa-volume-up",
        sT: [],
      },
      {
        t: "fad fa-volume-up",
        sT: [],
      },
      {
        t: "fas fa-vote-nay",
        sT: [],
      },
      {
        t: "far fa-vote-nay",
        sT: [],
      },
      {
        t: "fal fa-vote-nay",
        sT: [],
      },
      {
        t: "fad fa-vote-nay",
        sT: [],
      },
      {
        t: "fas fa-vote-yea",
        sT: [],
      },
      {
        t: "far fa-vote-yea",
        sT: [],
      },
      {
        t: "fal fa-vote-yea",
        sT: [],
      },
      {
        t: "fad fa-vote-yea",
        sT: [],
      },
      {
        t: "fas fa-vr-cardboard",
        sT: [],
      },
      {
        t: "far fa-vr-cardboard",
        sT: [],
      },
      {
        t: "fal fa-vr-cardboard",
        sT: [],
      },
      {
        t: "fad fa-vr-cardboard",
        sT: [],
      },
      {
        t: "fab fa-vuejs",
        sT: [],
      },
      {
        t: "fal fa-wagon-covered",
        sT: [],
      },
      {
        t: "far fa-wagon-covered",
        sT: [],
      },
      {
        t: "fas fa-wagon-covered",
        sT: [],
      },
      {
        t: "fad fa-wagon-covered",
        sT: [],
      },
      {
        t: "fas fa-walker",
        sT: [],
      },
      {
        t: "far fa-walker",
        sT: [],
      },
      {
        t: "fal fa-walker",
        sT: [],
      },
      {
        t: "fad fa-walker",
        sT: [],
      },
      {
        t: "fas fa-walkie-talkie",
        sT: [],
      },
      {
        t: "far fa-walkie-talkie",
        sT: [],
      },
      {
        t: "fal fa-walkie-talkie",
        sT: [],
      },
      {
        t: "fad fa-walkie-talkie",
        sT: [],
      },
      {
        t: "fas fa-walking",
        sT: [],
      },
      {
        t: "far fa-walking",
        sT: [],
      },
      {
        t: "fal fa-walking",
        sT: [],
      },
      {
        t: "fad fa-walking",
        sT: [],
      },
      {
        t: "fas fa-wallet",
        sT: [],
      },
      {
        t: "far fa-wallet",
        sT: [],
      },
      {
        t: "fal fa-wallet",
        sT: [],
      },
      {
        t: "fad fa-wallet",
        sT: [],
      },
      {
        t: "fas fa-wand",
        sT: [],
      },
      {
        t: "far fa-wand",
        sT: [],
      },
      {
        t: "fal fa-wand",
        sT: [],
      },
      {
        t: "fad fa-wand",
        sT: [],
      },
      {
        t: "fas fa-wand-magic",
        sT: [],
      },
      {
        t: "far fa-wand-magic",
        sT: [],
      },
      {
        t: "fal fa-wand-magic",
        sT: [],
      },
      {
        t: "fad fa-wand-magic",
        sT: [],
      },
      {
        t: "fas fa-warehouse",
        sT: [],
      },
      {
        t: "far fa-warehouse",
        sT: [],
      },
      {
        t: "fal fa-warehouse",
        sT: [],
      },
      {
        t: "fad fa-warehouse",
        sT: [],
      },
      {
        t: "fas fa-warehouse-alt",
        sT: [],
      },
      {
        t: "far fa-warehouse-alt",
        sT: [],
      },
      {
        t: "fal fa-warehouse-alt",
        sT: [],
      },
      {
        t: "fad fa-warehouse-alt",
        sT: [],
      },
      {
        t: "fas fa-washer",
        sT: [],
      },
      {
        t: "far fa-washer",
        sT: [],
      },
      {
        t: "fal fa-washer",
        sT: [],
      },
      {
        t: "fad fa-washer",
        sT: [],
      },
      {
        t: "fas fa-watch",
        sT: [],
      },
      {
        t: "far fa-watch",
        sT: [],
      },
      {
        t: "fal fa-watch",
        sT: [],
      },
      {
        t: "fad fa-watch",
        sT: [],
      },
      {
        t: "fas fa-watch-calculator",
        sT: [],
      },
      {
        t: "far fa-watch-calculator",
        sT: [],
      },
      {
        t: "fal fa-watch-calculator",
        sT: [],
      },
      {
        t: "fad fa-watch-calculator",
        sT: [],
      },
      {
        t: "fas fa-watch-fitness",
        sT: [],
      },
      {
        t: "far fa-watch-fitness",
        sT: [],
      },
      {
        t: "fal fa-watch-fitness",
        sT: [],
      },
      {
        t: "fad fa-watch-fitness",
        sT: [],
      },
      {
        t: "fab fa-watchman-monitoring",
        sT: [],
      },
      {
        t: "fas fa-water",
        sT: [],
      },
      {
        t: "far fa-water",
        sT: [],
      },
      {
        t: "fal fa-water",
        sT: [],
      },
      {
        t: "fad fa-water",
        sT: [],
      },
      {
        t: "fas fa-water-lower",
        sT: [],
      },
      {
        t: "far fa-water-lower",
        sT: [],
      },
      {
        t: "fal fa-water-lower",
        sT: [],
      },
      {
        t: "fad fa-water-lower",
        sT: [],
      },
      {
        t: "fas fa-water-rise",
        sT: [],
      },
      {
        t: "far fa-water-rise",
        sT: [],
      },
      {
        t: "fal fa-water-rise",
        sT: [],
      },
      {
        t: "fad fa-water-rise",
        sT: [],
      },
      {
        t: "fas fa-wave-sine",
        sT: [],
      },
      {
        t: "far fa-wave-sine",
        sT: [],
      },
      {
        t: "fal fa-wave-sine",
        sT: [],
      },
      {
        t: "fad fa-wave-sine",
        sT: [],
      },
      {
        t: "fal fa-wave-square",
        sT: [],
      },
      {
        t: "far fa-wave-square",
        sT: [],
      },
      {
        t: "fas fa-wave-square",
        sT: [],
      },
      {
        t: "fad fa-wave-square",
        sT: [],
      },
      {
        t: "fas fa-wave-triangle",
        sT: [],
      },
      {
        t: "far fa-wave-triangle",
        sT: [],
      },
      {
        t: "fal fa-wave-triangle",
        sT: [],
      },
      {
        t: "fad fa-wave-triangle",
        sT: [],
      },
      {
        t: "fas fa-waveform",
        sT: [],
      },
      {
        t: "far fa-waveform",
        sT: [],
      },
      {
        t: "fal fa-waveform",
        sT: [],
      },
      {
        t: "fad fa-waveform",
        sT: [],
      },
      {
        t: "fas fa-waveform-path",
        sT: [],
      },
      {
        t: "far fa-waveform-path",
        sT: [],
      },
      {
        t: "fal fa-waveform-path",
        sT: [],
      },
      {
        t: "fad fa-waveform-path",
        sT: [],
      },
      {
        t: "fab fa-waze",
        sT: [],
      },
      {
        t: "fas fa-webcam",
        sT: [],
      },
      {
        t: "far fa-webcam",
        sT: [],
      },
      {
        t: "fal fa-webcam",
        sT: [],
      },
      {
        t: "fad fa-webcam",
        sT: [],
      },
      {
        t: "fas fa-webcam-slash",
        sT: [],
      },
      {
        t: "far fa-webcam-slash",
        sT: [],
      },
      {
        t: "fal fa-webcam-slash",
        sT: [],
      },
      {
        t: "fad fa-webcam-slash",
        sT: [],
      },
      {
        t: "fab fa-weebly",
        sT: [],
      },
      {
        t: "fab fa-weibo",
        sT: [],
      },
      {
        t: "fas fa-weight",
        sT: [],
      },
      {
        t: "far fa-weight",
        sT: [],
      },
      {
        t: "fal fa-weight",
        sT: [],
      },
      {
        t: "fad fa-weight",
        sT: [],
      },
      {
        t: "fas fa-weight-hanging",
        sT: [],
      },
      {
        t: "far fa-weight-hanging",
        sT: [],
      },
      {
        t: "fal fa-weight-hanging",
        sT: [],
      },
      {
        t: "fad fa-weight-hanging",
        sT: [],
      },
      {
        t: "fab fa-weixin",
        sT: [],
      },
      {
        t: "fas fa-whale",
        sT: [],
      },
      {
        t: "far fa-whale",
        sT: [],
      },
      {
        t: "fal fa-whale",
        sT: [],
      },
      {
        t: "fad fa-whale",
        sT: [],
      },
      {
        t: "fab fa-whatsapp",
        sT: [],
      },
      {
        t: "fab fa-whatsapp-square",
        sT: [],
      },
      {
        t: "fas fa-wheat",
        sT: [],
      },
      {
        t: "far fa-wheat",
        sT: [],
      },
      {
        t: "fal fa-wheat",
        sT: [],
      },
      {
        t: "fad fa-wheat",
        sT: [],
      },
      {
        t: "fas fa-wheelchair",
        sT: [],
      },
      {
        t: "far fa-wheelchair",
        sT: [],
      },
      {
        t: "fal fa-wheelchair",
        sT: [],
      },
      {
        t: "fad fa-wheelchair",
        sT: [],
      },
      {
        t: "fas fa-whistle",
        sT: [],
      },
      {
        t: "far fa-whistle",
        sT: [],
      },
      {
        t: "fal fa-whistle",
        sT: [],
      },
      {
        t: "fad fa-whistle",
        sT: [],
      },
      {
        t: "fab fa-whmcs",
        sT: [],
      },
      {
        t: "fas fa-wifi",
        sT: [],
      },
      {
        t: "far fa-wifi",
        sT: [],
      },
      {
        t: "fal fa-wifi",
        sT: [],
      },
      {
        t: "fad fa-wifi",
        sT: [],
      },
      {
        t: "fas fa-wifi-1",
        sT: [],
      },
      {
        t: "far fa-wifi-1",
        sT: [],
      },
      {
        t: "fal fa-wifi-1",
        sT: [],
      },
      {
        t: "fad fa-wifi-1",
        sT: [],
      },
      {
        t: "fas fa-wifi-2",
        sT: [],
      },
      {
        t: "far fa-wifi-2",
        sT: [],
      },
      {
        t: "fal fa-wifi-2",
        sT: [],
      },
      {
        t: "fad fa-wifi-2",
        sT: [],
      },
      {
        t: "fas fa-wifi-slash",
        sT: [],
      },
      {
        t: "far fa-wifi-slash",
        sT: [],
      },
      {
        t: "fal fa-wifi-slash",
        sT: [],
      },
      {
        t: "fad fa-wifi-slash",
        sT: [],
      },
      {
        t: "fab fa-wikipedia-w",
        sT: [],
      },
      {
        t: "fas fa-wind",
        sT: [],
      },
      {
        t: "far fa-wind",
        sT: [],
      },
      {
        t: "fal fa-wind",
        sT: [],
      },
      {
        t: "fad fa-wind",
        sT: [],
      },
      {
        t: "fas fa-wind-turbine",
        sT: [],
      },
      {
        t: "far fa-wind-turbine",
        sT: [],
      },
      {
        t: "fal fa-wind-turbine",
        sT: [],
      },
      {
        t: "fad fa-wind-turbine",
        sT: [],
      },
      {
        t: "fas fa-wind-warning",
        sT: [],
      },
      {
        t: "far fa-wind-warning",
        sT: [],
      },
      {
        t: "fal fa-wind-warning",
        sT: [],
      },
      {
        t: "fad fa-wind-warning",
        sT: [],
      },
      {
        t: "fas fa-window",
        sT: [],
      },
      {
        t: "far fa-window",
        sT: [],
      },
      {
        t: "fal fa-window",
        sT: [],
      },
      {
        t: "fad fa-window",
        sT: [],
      },
      {
        t: "fas fa-window-alt",
        sT: [],
      },
      {
        t: "far fa-window-alt",
        sT: [],
      },
      {
        t: "fal fa-window-alt",
        sT: [],
      },
      {
        t: "fad fa-window-alt",
        sT: [],
      },
      {
        t: "fas fa-window-close",
        sT: [],
      },
      {
        t: "far fa-window-close",
        sT: [],
      },
      {
        t: "fal fa-window-close",
        sT: [],
      },
      {
        t: "fad fa-window-close",
        sT: [],
      },
      {
        t: "fas fa-window-frame",
        sT: [],
      },
      {
        t: "far fa-window-frame",
        sT: [],
      },
      {
        t: "fal fa-window-frame",
        sT: [],
      },
      {
        t: "fad fa-window-frame",
        sT: [],
      },
      {
        t: "fas fa-window-frame-open",
        sT: [],
      },
      {
        t: "far fa-window-frame-open",
        sT: [],
      },
      {
        t: "fal fa-window-frame-open",
        sT: [],
      },
      {
        t: "fad fa-window-frame-open",
        sT: [],
      },
      {
        t: "fas fa-window-maximize",
        sT: [],
      },
      {
        t: "far fa-window-maximize",
        sT: [],
      },
      {
        t: "fal fa-window-maximize",
        sT: [],
      },
      {
        t: "fad fa-window-maximize",
        sT: [],
      },
      {
        t: "fas fa-window-minimize",
        sT: [],
      },
      {
        t: "far fa-window-minimize",
        sT: [],
      },
      {
        t: "fal fa-window-minimize",
        sT: [],
      },
      {
        t: "fad fa-window-minimize",
        sT: [],
      },
      {
        t: "fas fa-window-restore",
        sT: [],
      },
      {
        t: "far fa-window-restore",
        sT: [],
      },
      {
        t: "fal fa-window-restore",
        sT: [],
      },
      {
        t: "fad fa-window-restore",
        sT: [],
      },
      {
        t: "fab fa-windows",
        sT: [],
      },
      {
        t: "fas fa-windsock",
        sT: [],
      },
      {
        t: "far fa-windsock",
        sT: [],
      },
      {
        t: "fal fa-windsock",
        sT: [],
      },
      {
        t: "fad fa-windsock",
        sT: [],
      },
      {
        t: "fas fa-wine-bottle",
        sT: [],
      },
      {
        t: "far fa-wine-bottle",
        sT: [],
      },
      {
        t: "fal fa-wine-bottle",
        sT: [],
      },
      {
        t: "fad fa-wine-bottle",
        sT: [],
      },
      {
        t: "fas fa-wine-glass",
        sT: [],
      },
      {
        t: "far fa-wine-glass",
        sT: [],
      },
      {
        t: "fal fa-wine-glass",
        sT: [],
      },
      {
        t: "fad fa-wine-glass",
        sT: [],
      },
      {
        t: "fas fa-wine-glass-alt",
        sT: [],
      },
      {
        t: "far fa-wine-glass-alt",
        sT: [],
      },
      {
        t: "fal fa-wine-glass-alt",
        sT: [],
      },
      {
        t: "fad fa-wine-glass-alt",
        sT: [],
      },
      {
        t: "fab fa-wix",
        sT: [],
      },
      {
        t: "fab fa-wizards-of-the-coast",
        sT: [],
      },
      {
        t: "fab fa-wodu",
        sT: [],
      },
      {
        t: "fab fa-wolf-pack-battalion",
        sT: [],
      },
      {
        t: "fas fa-won-sign",
        sT: [],
      },
      {
        t: "far fa-won-sign",
        sT: [],
      },
      {
        t: "fal fa-won-sign",
        sT: [],
      },
      {
        t: "fad fa-won-sign",
        sT: [],
      },
      {
        t: "fab fa-wordpress",
        sT: [],
      },
      {
        t: "fab fa-wordpress-simple",
        sT: [],
      },
      {
        t: "fab fa-wpbeginner",
        sT: [],
      },
      {
        t: "fab fa-wpexplorer",
        sT: [],
      },
      {
        t: "fab fa-wpforms",
        sT: [],
      },
      {
        t: "fab fa-wpressr",
        sT: [],
      },
      {
        t: "fas fa-wreath",
        sT: [],
      },
      {
        t: "far fa-wreath",
        sT: [],
      },
      {
        t: "fal fa-wreath",
        sT: [],
      },
      {
        t: "fad fa-wreath",
        sT: [],
      },
      {
        t: "fas fa-wrench",
        sT: [],
      },
      {
        t: "far fa-wrench",
        sT: [],
      },
      {
        t: "fal fa-wrench",
        sT: [],
      },
      {
        t: "fad fa-wrench",
        sT: [],
      },
      {
        t: "fas fa-x-ray",
        sT: [],
      },
      {
        t: "far fa-x-ray",
        sT: [],
      },
      {
        t: "fal fa-x-ray",
        sT: [],
      },
      {
        t: "fad fa-x-ray",
        sT: [],
      },
      {
        t: "fab fa-xbox",
        sT: [],
      },
      {
        t: "fab fa-xing",
        sT: [],
      },
      {
        t: "fab fa-xing-square",
        sT: [],
      },
      {
        t: "fab fa-y-combinator",
        sT: [],
      },
      {
        t: "fab fa-yahoo",
        sT: [],
      },
      {
        t: "fab fa-yammer",
        sT: [],
      },
      {
        t: "fab fa-yandex",
        sT: [],
      },
      {
        t: "fab fa-yandex-international",
        sT: [],
      },
      {
        t: "fab fa-yarn",
        sT: [],
      },
      {
        t: "fab fa-yelp",
        sT: [],
      },
      {
        t: "fas fa-yen-sign",
        sT: [],
      },
      {
        t: "far fa-yen-sign",
        sT: [],
      },
      {
        t: "fal fa-yen-sign",
        sT: [],
      },
      {
        t: "fad fa-yen-sign",
        sT: [],
      },
      {
        t: "fas fa-yin-yang",
        sT: [],
      },
      {
        t: "far fa-yin-yang",
        sT: [],
      },
      {
        t: "fal fa-yin-yang",
        sT: [],
      },
      {
        t: "fad fa-yin-yang",
        sT: [],
      },
      {
        t: "fab fa-yoast",
        sT: [],
      },
      {
        t: "fab fa-youtube",
        sT: [],
      },
      {
        t: "fab fa-youtube-square",
        sT: [],
      },
      {
        t: "fab fa-zhihu",
        sT: [],
      },
    ],
  });
});
