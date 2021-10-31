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
        t: "fab fa-accessible-icon",
        sT: [],
      },
      {
        t: "fab fa-accusoft",
        sT: [],
      },
      {
        t: "fab fa-acquisitions-incorporated",
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
        t: "fab fa-airbnb",
        sT: [],
      },
      {
        t: "fab fa-algolia",
        sT: [],
      },
      {
        t: "fab fa-alipay",
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
        t: "fab fa-amilia",
        sT: [],
      },
      {
        t: "fab fa-android",
        sT: [],
      },
      {
        t: "fab fa-angellist",
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
        t: "fab fa-apple-pay",
        sT: [],
      },
      {
        t: "fab fa-artstation",
        sT: [],
      },
      {
        t: "fab fa-asymmetrik",
        sT: [],
      },
      {
        t: "fab fa-atlassian",
        sT: [],
      },
      {
        t: "fab fa-audible",
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
        t: "fab fa-aws",
        sT: [],
      },
      {
        t: "fab fa-bandcamp",
        sT: [],
      },
      {
        t: "fab fa-battle-net",
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
        t: "fab fa-bimobject",
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
        t: "fab fa-bootstrap",
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
        t: "fab fa-buromobelexperte",
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
        t: "fab fa-canadian-maple-leaf",
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
        t: "fab fa-centercode",
        sT: [],
      },
      {
        t: "fab fa-centos",
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
        t: "fab fa-cloudflare",
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
        t: "fab fa-codepen",
        sT: [],
      },
      {
        t: "fab fa-codiepie",
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
        t: "fab fa-contao",
        sT: [],
      },
      {
        t: "fab fa-cotton-bureau",
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
        t: "fab fa-critical-role",
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
        t: "fab fa-dailymotion",
        sT: [],
      },
      {
        t: "fab fa-dashcube",
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
        t: "fab fa-deploydog",
        sT: [],
      },
      {
        t: "fab fa-deskpro",
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
        t: "fab fa-dhl",
        sT: [],
      },
      {
        t: "fab fa-diaspora",
        sT: [],
      },
      {
        t: "fab fa-digg",
        sT: [],
      },
      {
        t: "fab fa-digital-ocean",
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
        t: "fab fa-dochub",
        sT: [],
      },
      {
        t: "fab fa-docker",
        sT: [],
      },
      {
        t: "fab fa-draft2digital",
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
        t: "fab fa-dropbox",
        sT: [],
      },
      {
        t: "fab fa-drupal",
        sT: [],
      },
      {
        t: "fab fa-dyalog",
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
        t: "fab fa-edge",
        sT: [],
      },
      {
        t: "fab fa-edge-legacy",
        sT: [],
      },
      {
        t: "fab fa-elementor",
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
        t: "fab fa-envira",
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
        t: "fab fa-etsy",
        sT: [],
      },
      {
        t: "fab fa-evernote",
        sT: [],
      },
      {
        t: "fab fa-expeditedssl",
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
        t: "fab fa-fantasy-flight-games",
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
        t: "fab fa-figma",
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
        t: "fab fa-flickr",
        sT: [],
      },
      {
        t: "fab fa-flipboard",
        sT: [],
      },
      {
        t: "fab fa-fly",
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
        t: "fab fa-fonticons",
        sT: [],
      },
      {
        t: "fab fa-fonticons-fi",
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
        t: "fab fa-foursquare",
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
        t: "fab fa-fulcrum",
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
        t: "fab fa-glide",
        sT: [],
      },
      {
        t: "fab fa-glide-g",
        sT: [],
      },
      {
        t: "fab fa-gofore",
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
        t: "fab fa-gratipay",
        sT: [],
      },
      {
        t: "fab fa-grav",
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
        t: "fab fa-gulp",
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
        t: "fab fa-hips",
        sT: [],
      },
      {
        t: "fab fa-hire-a-helper",
        sT: [],
      },
      {
        t: "fab fa-hive",
        sT: [],
      },
      {
        t: "fab fa-hooli",
        sT: [],
      },
      {
        t: "fab fa-hornbill",
        sT: [],
      },
      {
        t: "fab fa-hotjar",
        sT: [],
      },
      {
        t: "fab fa-houzz",
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
        t: "fab fa-ideal",
        sT: [],
      },
      {
        t: "fab fa-imdb",
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
        t: "fab fa-intercom",
        sT: [],
      },
      {
        t: "fab fa-internet-explorer",
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
        t: "fab fa-java",
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
        t: "fab fa-joomla",
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
        t: "fab fa-kaggle",
        sT: [],
      },
      {
        t: "fab fa-keybase",
        sT: [],
      },
      {
        t: "fab fa-keycdn",
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
        t: "fab fa-korvue",
        sT: [],
      },
      {
        t: "fab fa-laravel",
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
        t: "fab fa-leanpub",
        sT: [],
      },
      {
        t: "fab fa-less",
        sT: [],
      },
      {
        t: "fab fa-line",
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
        t: "fab fa-lyft",
        sT: [],
      },
      {
        t: "fab fa-magento",
        sT: [],
      },
      {
        t: "fab fa-mailchimp",
        sT: [],
      },
      {
        t: "fab fa-mandalorian",
        sT: [],
      },
      {
        t: "fab fa-markdown",
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
        t: "fab fa-medrt",
        sT: [],
      },
      {
        t: "fab fa-meetup",
        sT: [],
      },
      {
        t: "fab fa-megaport",
        sT: [],
      },
      {
        t: "fab fa-mendeley",
        sT: [],
      },
      {
        t: "fab fa-microblog",
        sT: [],
      },
      {
        t: "fab fa-microsoft",
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
        t: "fab fa-modx",
        sT: [],
      },
      {
        t: "fab fa-monero",
        sT: [],
      },
      {
        t: "fab fa-napster",
        sT: [],
      },
      {
        t: "fab fa-neos",
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
        t: "fab fa-old-republic",
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
        t: "fab fa-osi",
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
        t: "fab fa-palfed",
        sT: [],
      },
      {
        t: "fab fa-patreon",
        sT: [],
      },
      {
        t: "fab fa-paypal",
        sT: [],
      },
      {
        t: "fab fa-penny-arcade",
        sT: [],
      },
      {
        t: "fab fa-perbyte",
        sT: [],
      },
      {
        t: "fab fa-periscope",
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
        t: "fab fa-php",
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
        t: "fab fa-playstation",
        sT: [],
      },
      {
        t: "fab fa-product-hunt",
        sT: [],
      },
      {
        t: "fab fa-pushed",
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
        t: "fab fa-quinscape",
        sT: [],
      },
      {
        t: "fab fa-quora",
        sT: [],
      },
      {
        t: "fab fa-r-project",
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
        t: "fab fa-renren",
        sT: [],
      },
      {
        t: "fab fa-replyd",
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
        t: "fab fa-rev",
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
        t: "fab fa-rust",
        sT: [],
      },
      {
        t: "fab fa-safari",
        sT: [],
      },
      {
        t: "fab fa-salesforce",
        sT: [],
      },
      {
        t: "fab fa-sass",
        sT: [],
      },
      {
        t: "fab fa-schlix",
        sT: [],
      },
      {
        t: "fab fa-scribd",
        sT: [],
      },
      {
        t: "fab fa-searchengin",
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
        t: "fab fa-servicestack",
        sT: [],
      },
      {
        t: "fab fa-shirtsinbulk",
        sT: [],
      },
      {
        t: "fab fa-shopify",
        sT: [],
      },
      {
        t: "fab fa-shopware",
        sT: [],
      },
      {
        t: "fab fa-simplybuilt",
        sT: [],
      },
      {
        t: "fab fa-sistrix",
        sT: [],
      },
      {
        t: "fab fa-sith",
        sT: [],
      },
      {
        t: "fab fa-sketch",
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
        t: "fab fa-slideshare",
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
        t: "fab fa-soundcloud",
        sT: [],
      },
      {
        t: "fab fa-sourcetree",
        sT: [],
      },
      {
        t: "fab fa-speakap",
        sT: [],
      },
      {
        t: "fab fa-speaker-deck",
        sT: [],
      },
      {
        t: "fab fa-spotify",
        sT: [],
      },
      {
        t: "fab fa-squarespace",
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
        t: "fab fa-staylinked",
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
        t: "fab fa-sticker-mule",
        sT: [],
      },
      {
        t: "fab fa-strava",
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
        t: "fab fa-superpowers",
        sT: [],
      },
      {
        t: "fab fa-supple",
        sT: [],
      },
      {
        t: "fab fa-suse",
        sT: [],
      },
      {
        t: "fab fa-swift",
        sT: [],
      },
      {
        t: "fab fa-symfony",
        sT: [],
      },
      {
        t: "fab fa-teamspeak",
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
        t: "fab fa-tencent-weibo",
        sT: [],
      },
      {
        t: "fab fa-the-red-yeti",
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
        t: "fab fa-think-peaks",
        sT: [],
      },
      {
        t: "fab fa-tiktok",
        sT: [],
      },
      {
        t: "fab fa-trade-federation",
        sT: [],
      },
      {
        t: "fab fa-trello",
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
        t: "fab fa-uikit",
        sT: [],
      },
      {
        t: "fab fa-umbraco",
        sT: [],
      },
      {
        t: "fab fa-uncharted",
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
        t: "fab fa-unsplash",
        sT: [],
      },
      {
        t: "fab fa-untappd",
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
        t: "fab fa-usps",
        sT: [],
      },
      {
        t: "fab fa-ussunnah",
        sT: [],
      },
      {
        t: "fab fa-vaadin",
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
        t: "fab fa-viber",
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
        t: "fab fa-vk",
        sT: [],
      },
      {
        t: "fab fa-vnv",
        sT: [],
      },
      {
        t: "fab fa-vuejs",
        sT: [],
      },
      {
        t: "fab fa-watchman-monitoring",
        sT: [],
      },
      {
        t: "fab fa-waze",
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
        t: "fab fa-weixin",
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
        t: "fab fa-whmcs",
        sT: [],
      },
      {
        t: "fab fa-wikipedia-w",
        sT: [],
      },
      {
        t: "fab fa-windows",
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
