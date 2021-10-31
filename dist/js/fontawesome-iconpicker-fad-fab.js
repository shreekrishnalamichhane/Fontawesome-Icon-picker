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
        t: "fad fa-abacus",
        sT: [],
      },
      {
        t: "fad fa-acorn",
        sT: [],
      },
      {
        t: "fad fa-ad",
        sT: [],
      },
      {
        t: "fad fa-address-book",
        sT: [],
      },
      {
        t: "fad fa-address-card",
        sT: [],
      },
      {
        t: "fad fa-adjust",
        sT: [],
      },
      {
        t: "fad fa-air-conditioner",
        sT: [],
      },
      {
        t: "fad fa-air-freshener",
        sT: [],
      },
      {
        t: "fad fa-alarm-clock",
        sT: [],
      },
      {
        t: "fad fa-alarm-exclamation",
        sT: [],
      },
      {
        t: "fad fa-alarm-plus",
        sT: [],
      },
      {
        t: "fad fa-alarm-snooze",
        sT: [],
      },
      {
        t: "fad fa-album",
        sT: [],
      },
      {
        t: "fad fa-album-collection",
        sT: [],
      },
      {
        t: "fad fa-alicorn",
        sT: [],
      },
      {
        t: "fad fa-alien",
        sT: [],
      },
      {
        t: "fad fa-alien-monster",
        sT: [],
      },
      {
        t: "fad fa-align-center",
        sT: [],
      },
      {
        t: "fad fa-align-justify",
        sT: [],
      },
      {
        t: "fad fa-align-left",
        sT: [],
      },
      {
        t: "fad fa-align-right",
        sT: [],
      },
      {
        t: "fad fa-align-slash",
        sT: [],
      },
      {
        t: "fad fa-allergies",
        sT: [],
      },
      {
        t: "fad fa-ambulance",
        sT: [],
      },
      {
        t: "fad fa-american-sign-language-interpreting",
        sT: [],
      },
      {
        t: "fad fa-amp-guitar",
        sT: [],
      },
      {
        t: "fad fa-analytics",
        sT: [],
      },
      {
        t: "fad fa-anchor",
        sT: [],
      },
      {
        t: "fad fa-angel",
        sT: [],
      },
      {
        t: "fad fa-angle-double-down",
        sT: [],
      },
      {
        t: "fad fa-angle-double-left",
        sT: [],
      },
      {
        t: "fad fa-angle-double-right",
        sT: [],
      },
      {
        t: "fad fa-angle-double-up",
        sT: [],
      },
      {
        t: "fad fa-angle-down",
        sT: [],
      },
      {
        t: "fad fa-angle-left",
        sT: [],
      },
      {
        t: "fad fa-angle-right",
        sT: [],
      },
      {
        t: "fad fa-angle-up",
        sT: [],
      },
      {
        t: "fad fa-angry",
        sT: [],
      },
      {
        t: "fad fa-ankh",
        sT: [],
      },
      {
        t: "fad fa-apple-alt",
        sT: [],
      },
      {
        t: "fad fa-apple-crate",
        sT: [],
      },
      {
        t: "fad fa-archive",
        sT: [],
      },
      {
        t: "fad fa-archway",
        sT: [],
      },
      {
        t: "fad fa-arrow-alt-circle-down",
        sT: [],
      },
      {
        t: "fad fa-arrow-alt-circle-left",
        sT: [],
      },
      {
        t: "fad fa-arrow-alt-circle-right",
        sT: [],
      },
      {
        t: "fad fa-arrow-alt-circle-up",
        sT: [],
      },
      {
        t: "fad fa-arrow-alt-down",
        sT: [],
      },
      {
        t: "fad fa-arrow-alt-from-bottom",
        sT: [],
      },
      {
        t: "fad fa-arrow-alt-from-left",
        sT: [],
      },
      {
        t: "fad fa-arrow-alt-from-right",
        sT: [],
      },
      {
        t: "fad fa-arrow-alt-from-top",
        sT: [],
      },
      {
        t: "fad fa-arrow-alt-left",
        sT: [],
      },
      {
        t: "fad fa-arrow-alt-right",
        sT: [],
      },
      {
        t: "fad fa-arrow-alt-square-down",
        sT: [],
      },
      {
        t: "fad fa-arrow-alt-square-left",
        sT: [],
      },
      {
        t: "fad fa-arrow-alt-square-right",
        sT: [],
      },
      {
        t: "fad fa-arrow-alt-square-up",
        sT: [],
      },
      {
        t: "fad fa-arrow-alt-to-bottom",
        sT: [],
      },
      {
        t: "fad fa-arrow-alt-to-left",
        sT: [],
      },
      {
        t: "fad fa-arrow-alt-to-right",
        sT: [],
      },
      {
        t: "fad fa-arrow-alt-to-top",
        sT: [],
      },
      {
        t: "fad fa-arrow-alt-up",
        sT: [],
      },
      {
        t: "fad fa-arrow-circle-down",
        sT: [],
      },
      {
        t: "fad fa-arrow-circle-left",
        sT: [],
      },
      {
        t: "fad fa-arrow-circle-right",
        sT: [],
      },
      {
        t: "fad fa-arrow-circle-up",
        sT: [],
      },
      {
        t: "fad fa-arrow-down",
        sT: [],
      },
      {
        t: "fad fa-arrow-from-bottom",
        sT: [],
      },
      {
        t: "fad fa-arrow-from-left",
        sT: [],
      },
      {
        t: "fad fa-arrow-from-right",
        sT: [],
      },
      {
        t: "fad fa-arrow-from-top",
        sT: [],
      },
      {
        t: "fad fa-arrow-left",
        sT: [],
      },
      {
        t: "fad fa-arrow-right",
        sT: [],
      },
      {
        t: "fad fa-arrow-square-down",
        sT: [],
      },
      {
        t: "fad fa-arrow-square-left",
        sT: [],
      },
      {
        t: "fad fa-arrow-square-right",
        sT: [],
      },
      {
        t: "fad fa-arrow-square-up",
        sT: [],
      },
      {
        t: "fad fa-arrow-to-bottom",
        sT: [],
      },
      {
        t: "fad fa-arrow-to-left",
        sT: [],
      },
      {
        t: "fad fa-arrow-to-right",
        sT: [],
      },
      {
        t: "fad fa-arrow-to-top",
        sT: [],
      },
      {
        t: "fad fa-arrow-up",
        sT: [],
      },
      {
        t: "fad fa-arrows",
        sT: [],
      },
      {
        t: "fad fa-arrows-alt",
        sT: [],
      },
      {
        t: "fad fa-arrows-alt-h",
        sT: [],
      },
      {
        t: "fad fa-arrows-alt-v",
        sT: [],
      },
      {
        t: "fad fa-arrows-h",
        sT: [],
      },
      {
        t: "fad fa-arrows-v",
        sT: [],
      },
      {
        t: "fad fa-assistive-listening-systems",
        sT: [],
      },
      {
        t: "fad fa-asterisk",
        sT: [],
      },
      {
        t: "fad fa-at",
        sT: [],
      },
      {
        t: "fad fa-atlas",
        sT: [],
      },
      {
        t: "fad fa-atom",
        sT: [],
      },
      {
        t: "fad fa-atom-alt",
        sT: [],
      },
      {
        t: "fad fa-audio-description",
        sT: [],
      },
      {
        t: "fad fa-award",
        sT: [],
      },
      {
        t: "fad fa-axe",
        sT: [],
      },
      {
        t: "fad fa-axe-battle",
        sT: [],
      },
      {
        t: "fad fa-baby",
        sT: [],
      },
      {
        t: "fad fa-baby-carriage",
        sT: [],
      },
      {
        t: "fad fa-backpack",
        sT: [],
      },
      {
        t: "fad fa-backspace",
        sT: [],
      },
      {
        t: "fad fa-backward",
        sT: [],
      },
      {
        t: "fad fa-bacon",
        sT: [],
      },
      {
        t: "fad fa-bacteria",
        sT: [],
      },
      {
        t: "fad fa-bacterium",
        sT: [],
      },
      {
        t: "fad fa-badge",
        sT: [],
      },
      {
        t: "fad fa-badge-check",
        sT: [],
      },
      {
        t: "fad fa-badge-dollar",
        sT: [],
      },
      {
        t: "fad fa-badge-percent",
        sT: [],
      },
      {
        t: "fad fa-badge-sheriff",
        sT: [],
      },
      {
        t: "fad fa-badger-honey",
        sT: [],
      },
      {
        t: "fad fa-bags-shopping",
        sT: [],
      },
      {
        t: "fad fa-bahai",
        sT: [],
      },
      {
        t: "fad fa-balance-scale",
        sT: [],
      },
      {
        t: "fad fa-balance-scale-left",
        sT: [],
      },
      {
        t: "fad fa-balance-scale-right",
        sT: [],
      },
      {
        t: "fad fa-ball-pile",
        sT: [],
      },
      {
        t: "fad fa-ballot",
        sT: [],
      },
      {
        t: "fad fa-ballot-check",
        sT: [],
      },
      {
        t: "fad fa-ban",
        sT: [],
      },
      {
        t: "fad fa-band-aid",
        sT: [],
      },
      {
        t: "fad fa-banjo",
        sT: [],
      },
      {
        t: "fad fa-barcode",
        sT: [],
      },
      {
        t: "fad fa-barcode-alt",
        sT: [],
      },
      {
        t: "fad fa-barcode-read",
        sT: [],
      },
      {
        t: "fad fa-barcode-scan",
        sT: [],
      },
      {
        t: "fad fa-bars",
        sT: [],
      },
      {
        t: "fad fa-baseball",
        sT: [],
      },
      {
        t: "fad fa-baseball-ball",
        sT: [],
      },
      {
        t: "fad fa-basketball-ball",
        sT: [],
      },
      {
        t: "fad fa-basketball-hoop",
        sT: [],
      },
      {
        t: "fad fa-bat",
        sT: [],
      },
      {
        t: "fad fa-bath",
        sT: [],
      },
      {
        t: "fad fa-battery-bolt",
        sT: [],
      },
      {
        t: "fad fa-battery-empty",
        sT: [],
      },
      {
        t: "fad fa-battery-full",
        sT: [],
      },
      {
        t: "fad fa-battery-half",
        sT: [],
      },
      {
        t: "fad fa-battery-quarter",
        sT: [],
      },
      {
        t: "fad fa-battery-slash",
        sT: [],
      },
      {
        t: "fad fa-battery-three-quarters",
        sT: [],
      },
      {
        t: "fad fa-bed",
        sT: [],
      },
      {
        t: "fad fa-bed-alt",
        sT: [],
      },
      {
        t: "fad fa-bed-bunk",
        sT: [],
      },
      {
        t: "fad fa-bed-empty",
        sT: [],
      },
      {
        t: "fad fa-beer",
        sT: [],
      },
      {
        t: "fad fa-bell",
        sT: [],
      },
      {
        t: "fad fa-bell-exclamation",
        sT: [],
      },
      {
        t: "fad fa-bell-on",
        sT: [],
      },
      {
        t: "fad fa-bell-plus",
        sT: [],
      },
      {
        t: "fad fa-bell-school",
        sT: [],
      },
      {
        t: "fad fa-bell-school-slash",
        sT: [],
      },
      {
        t: "fad fa-bell-slash",
        sT: [],
      },
      {
        t: "fad fa-bells",
        sT: [],
      },
      {
        t: "fad fa-betamax",
        sT: [],
      },
      {
        t: "fad fa-bezier-curve",
        sT: [],
      },
      {
        t: "fad fa-bible",
        sT: [],
      },
      {
        t: "fad fa-bicycle",
        sT: [],
      },
      {
        t: "fad fa-biking",
        sT: [],
      },
      {
        t: "fad fa-biking-mountain",
        sT: [],
      },
      {
        t: "fad fa-binoculars",
        sT: [],
      },
      {
        t: "fad fa-biohazard",
        sT: [],
      },
      {
        t: "fad fa-birthday-cake",
        sT: [],
      },
      {
        t: "fad fa-blanket",
        sT: [],
      },
      {
        t: "fad fa-blender",
        sT: [],
      },
      {
        t: "fad fa-blender-phone",
        sT: [],
      },
      {
        t: "fad fa-blind",
        sT: [],
      },
      {
        t: "fad fa-blinds",
        sT: [],
      },
      {
        t: "fad fa-blinds-open",
        sT: [],
      },
      {
        t: "fad fa-blinds-raised",
        sT: [],
      },
      {
        t: "fad fa-blog",
        sT: [],
      },
      {
        t: "fad fa-bold",
        sT: [],
      },
      {
        t: "fad fa-bolt",
        sT: [],
      },
      {
        t: "fad fa-bomb",
        sT: [],
      },
      {
        t: "fad fa-bone",
        sT: [],
      },
      {
        t: "fad fa-bone-break",
        sT: [],
      },
      {
        t: "fad fa-bong",
        sT: [],
      },
      {
        t: "fad fa-book",
        sT: [],
      },
      {
        t: "fad fa-book-alt",
        sT: [],
      },
      {
        t: "fad fa-book-dead",
        sT: [],
      },
      {
        t: "fad fa-book-heart",
        sT: [],
      },
      {
        t: "fad fa-book-medical",
        sT: [],
      },
      {
        t: "fad fa-book-open",
        sT: [],
      },
      {
        t: "fad fa-book-reader",
        sT: [],
      },
      {
        t: "fad fa-book-spells",
        sT: [],
      },
      {
        t: "fad fa-book-user",
        sT: [],
      },
      {
        t: "fad fa-bookmark",
        sT: [],
      },
      {
        t: "fad fa-books",
        sT: [],
      },
      {
        t: "fad fa-books-medical",
        sT: [],
      },
      {
        t: "fad fa-boombox",
        sT: [],
      },
      {
        t: "fad fa-boot",
        sT: [],
      },
      {
        t: "fad fa-booth-curtain",
        sT: [],
      },
      {
        t: "fad fa-border-all",
        sT: [],
      },
      {
        t: "fad fa-border-bottom",
        sT: [],
      },
      {
        t: "fad fa-border-center-h",
        sT: [],
      },
      {
        t: "fad fa-border-center-v",
        sT: [],
      },
      {
        t: "fad fa-border-inner",
        sT: [],
      },
      {
        t: "fad fa-border-left",
        sT: [],
      },
      {
        t: "fad fa-border-none",
        sT: [],
      },
      {
        t: "fad fa-border-outer",
        sT: [],
      },
      {
        t: "fad fa-border-right",
        sT: [],
      },
      {
        t: "fad fa-border-style",
        sT: [],
      },
      {
        t: "fad fa-border-style-alt",
        sT: [],
      },
      {
        t: "fad fa-border-top",
        sT: [],
      },
      {
        t: "fad fa-bow-arrow",
        sT: [],
      },
      {
        t: "fad fa-bowling-ball",
        sT: [],
      },
      {
        t: "fad fa-bowling-pins",
        sT: [],
      },
      {
        t: "fad fa-box",
        sT: [],
      },
      {
        t: "fad fa-box-alt",
        sT: [],
      },
      {
        t: "fad fa-box-ballot",
        sT: [],
      },
      {
        t: "fad fa-box-check",
        sT: [],
      },
      {
        t: "fad fa-box-fragile",
        sT: [],
      },
      {
        t: "fad fa-box-full",
        sT: [],
      },
      {
        t: "fad fa-box-heart",
        sT: [],
      },
      {
        t: "fad fa-box-open",
        sT: [],
      },
      {
        t: "fad fa-box-tissue",
        sT: [],
      },
      {
        t: "fad fa-box-up",
        sT: [],
      },
      {
        t: "fad fa-box-usd",
        sT: [],
      },
      {
        t: "fad fa-boxes",
        sT: [],
      },
      {
        t: "fad fa-boxes-alt",
        sT: [],
      },
      {
        t: "fad fa-boxing-glove",
        sT: [],
      },
      {
        t: "fad fa-brackets",
        sT: [],
      },
      {
        t: "fad fa-brackets-curly",
        sT: [],
      },
      {
        t: "fad fa-braille",
        sT: [],
      },
      {
        t: "fad fa-brain",
        sT: [],
      },
      {
        t: "fad fa-bread-loaf",
        sT: [],
      },
      {
        t: "fad fa-bread-slice",
        sT: [],
      },
      {
        t: "fad fa-briefcase",
        sT: [],
      },
      {
        t: "fad fa-briefcase-medical",
        sT: [],
      },
      {
        t: "fad fa-bring-forward",
        sT: [],
      },
      {
        t: "fad fa-bring-front",
        sT: [],
      },
      {
        t: "fad fa-broadcast-tower",
        sT: [],
      },
      {
        t: "fad fa-broom",
        sT: [],
      },
      {
        t: "fad fa-browser",
        sT: [],
      },
      {
        t: "fad fa-brush",
        sT: [],
      },
      {
        t: "fad fa-bug",
        sT: [],
      },
      {
        t: "fad fa-building",
        sT: [],
      },
      {
        t: "fad fa-bullhorn",
        sT: [],
      },
      {
        t: "fad fa-bullseye",
        sT: [],
      },
      {
        t: "fad fa-bullseye-arrow",
        sT: [],
      },
      {
        t: "fad fa-bullseye-pointer",
        sT: [],
      },
      {
        t: "fad fa-burger-soda",
        sT: [],
      },
      {
        t: "fad fa-burn",
        sT: [],
      },
      {
        t: "fad fa-burrito",
        sT: [],
      },
      {
        t: "fad fa-bus",
        sT: [],
      },
      {
        t: "fad fa-bus-alt",
        sT: [],
      },
      {
        t: "fad fa-bus-school",
        sT: [],
      },
      {
        t: "fad fa-business-time",
        sT: [],
      },
      {
        t: "fad fa-cabinet-filing",
        sT: [],
      },
      {
        t: "fad fa-cactus",
        sT: [],
      },
      {
        t: "fad fa-calculator",
        sT: [],
      },
      {
        t: "fad fa-calculator-alt",
        sT: [],
      },
      {
        t: "fad fa-calendar",
        sT: [],
      },
      {
        t: "fad fa-calendar-alt",
        sT: [],
      },
      {
        t: "fad fa-calendar-check",
        sT: [],
      },
      {
        t: "fad fa-calendar-day",
        sT: [],
      },
      {
        t: "fad fa-calendar-edit",
        sT: [],
      },
      {
        t: "fad fa-calendar-exclamation",
        sT: [],
      },
      {
        t: "fad fa-calendar-minus",
        sT: [],
      },
      {
        t: "fad fa-calendar-plus",
        sT: [],
      },
      {
        t: "fad fa-calendar-star",
        sT: [],
      },
      {
        t: "fad fa-calendar-times",
        sT: [],
      },
      {
        t: "fad fa-calendar-week",
        sT: [],
      },
      {
        t: "fad fa-camcorder",
        sT: [],
      },
      {
        t: "fad fa-camera",
        sT: [],
      },
      {
        t: "fad fa-camera-alt",
        sT: [],
      },
      {
        t: "fad fa-camera-home",
        sT: [],
      },
      {
        t: "fad fa-camera-movie",
        sT: [],
      },
      {
        t: "fad fa-camera-polaroid",
        sT: [],
      },
      {
        t: "fad fa-camera-retro",
        sT: [],
      },
      {
        t: "fad fa-campfire",
        sT: [],
      },
      {
        t: "fad fa-campground",
        sT: [],
      },
      {
        t: "fad fa-candle-holder",
        sT: [],
      },
      {
        t: "fad fa-candy-cane",
        sT: [],
      },
      {
        t: "fad fa-candy-corn",
        sT: [],
      },
      {
        t: "fad fa-cannabis",
        sT: [],
      },
      {
        t: "fad fa-capsules",
        sT: [],
      },
      {
        t: "fad fa-car",
        sT: [],
      },
      {
        t: "fad fa-car-alt",
        sT: [],
      },
      {
        t: "fad fa-car-battery",
        sT: [],
      },
      {
        t: "fad fa-car-building",
        sT: [],
      },
      {
        t: "fad fa-car-bump",
        sT: [],
      },
      {
        t: "fad fa-car-bus",
        sT: [],
      },
      {
        t: "fad fa-car-crash",
        sT: [],
      },
      {
        t: "fad fa-car-garage",
        sT: [],
      },
      {
        t: "fad fa-car-mechanic",
        sT: [],
      },
      {
        t: "fad fa-car-side",
        sT: [],
      },
      {
        t: "fad fa-car-tilt",
        sT: [],
      },
      {
        t: "fad fa-car-wash",
        sT: [],
      },
      {
        t: "fad fa-caravan",
        sT: [],
      },
      {
        t: "fad fa-caravan-alt",
        sT: [],
      },
      {
        t: "fad fa-caret-circle-down",
        sT: [],
      },
      {
        t: "fad fa-caret-circle-left",
        sT: [],
      },
      {
        t: "fad fa-caret-circle-right",
        sT: [],
      },
      {
        t: "fad fa-caret-circle-up",
        sT: [],
      },
      {
        t: "fad fa-caret-down",
        sT: [],
      },
      {
        t: "fad fa-caret-left",
        sT: [],
      },
      {
        t: "fad fa-caret-right",
        sT: [],
      },
      {
        t: "fad fa-caret-square-down",
        sT: [],
      },
      {
        t: "fad fa-caret-square-left",
        sT: [],
      },
      {
        t: "fad fa-caret-square-right",
        sT: [],
      },
      {
        t: "fad fa-caret-square-up",
        sT: [],
      },
      {
        t: "fad fa-caret-up",
        sT: [],
      },
      {
        t: "fad fa-carrot",
        sT: [],
      },
      {
        t: "fad fa-cars",
        sT: [],
      },
      {
        t: "fad fa-cart-arrow-down",
        sT: [],
      },
      {
        t: "fad fa-cart-plus",
        sT: [],
      },
      {
        t: "fad fa-cash-register",
        sT: [],
      },
      {
        t: "fad fa-cassette-tape",
        sT: [],
      },
      {
        t: "fad fa-cat",
        sT: [],
      },
      {
        t: "fad fa-cat-space",
        sT: [],
      },
      {
        t: "fad fa-cauldron",
        sT: [],
      },
      {
        t: "fad fa-cctv",
        sT: [],
      },
      {
        t: "fad fa-certificate",
        sT: [],
      },
      {
        t: "fad fa-chair",
        sT: [],
      },
      {
        t: "fad fa-chair-office",
        sT: [],
      },
      {
        t: "fad fa-chalkboard",
        sT: [],
      },
      {
        t: "fad fa-chalkboard-teacher",
        sT: [],
      },
      {
        t: "fad fa-charging-station",
        sT: [],
      },
      {
        t: "fad fa-chart-area",
        sT: [],
      },
      {
        t: "fad fa-chart-bar",
        sT: [],
      },
      {
        t: "fad fa-chart-line",
        sT: [],
      },
      {
        t: "fad fa-chart-line-down",
        sT: [],
      },
      {
        t: "fad fa-chart-network",
        sT: [],
      },
      {
        t: "fad fa-chart-pie",
        sT: [],
      },
      {
        t: "fad fa-chart-pie-alt",
        sT: [],
      },
      {
        t: "fad fa-chart-scatter",
        sT: [],
      },
      {
        t: "fad fa-check",
        sT: [],
      },
      {
        t: "fad fa-check-circle",
        sT: [],
      },
      {
        t: "fad fa-check-double",
        sT: [],
      },
      {
        t: "fad fa-check-square",
        sT: [],
      },
      {
        t: "fad fa-cheese",
        sT: [],
      },
      {
        t: "fad fa-cheese-swiss",
        sT: [],
      },
      {
        t: "fad fa-cheeseburger",
        sT: [],
      },
      {
        t: "fad fa-chess",
        sT: [],
      },
      {
        t: "fad fa-chess-bishop",
        sT: [],
      },
      {
        t: "fad fa-chess-bishop-alt",
        sT: [],
      },
      {
        t: "fad fa-chess-board",
        sT: [],
      },
      {
        t: "fad fa-chess-clock",
        sT: [],
      },
      {
        t: "fad fa-chess-clock-alt",
        sT: [],
      },
      {
        t: "fad fa-chess-king",
        sT: [],
      },
      {
        t: "fad fa-chess-king-alt",
        sT: [],
      },
      {
        t: "fad fa-chess-knight",
        sT: [],
      },
      {
        t: "fad fa-chess-knight-alt",
        sT: [],
      },
      {
        t: "fad fa-chess-pawn",
        sT: [],
      },
      {
        t: "fad fa-chess-pawn-alt",
        sT: [],
      },
      {
        t: "fad fa-chess-queen",
        sT: [],
      },
      {
        t: "fad fa-chess-queen-alt",
        sT: [],
      },
      {
        t: "fad fa-chess-rook",
        sT: [],
      },
      {
        t: "fad fa-chess-rook-alt",
        sT: [],
      },
      {
        t: "fad fa-chevron-circle-down",
        sT: [],
      },
      {
        t: "fad fa-chevron-circle-left",
        sT: [],
      },
      {
        t: "fad fa-chevron-circle-right",
        sT: [],
      },
      {
        t: "fad fa-chevron-circle-up",
        sT: [],
      },
      {
        t: "fad fa-chevron-double-down",
        sT: [],
      },
      {
        t: "fad fa-chevron-double-left",
        sT: [],
      },
      {
        t: "fad fa-chevron-double-right",
        sT: [],
      },
      {
        t: "fad fa-chevron-double-up",
        sT: [],
      },
      {
        t: "fad fa-chevron-down",
        sT: [],
      },
      {
        t: "fad fa-chevron-left",
        sT: [],
      },
      {
        t: "fad fa-chevron-right",
        sT: [],
      },
      {
        t: "fad fa-chevron-square-down",
        sT: [],
      },
      {
        t: "fad fa-chevron-square-left",
        sT: [],
      },
      {
        t: "fad fa-chevron-square-right",
        sT: [],
      },
      {
        t: "fad fa-chevron-square-up",
        sT: [],
      },
      {
        t: "fad fa-chevron-up",
        sT: [],
      },
      {
        t: "fad fa-child",
        sT: [],
      },
      {
        t: "fad fa-chimney",
        sT: [],
      },
      {
        t: "fad fa-church",
        sT: [],
      },
      {
        t: "fad fa-circle",
        sT: [],
      },
      {
        t: "fad fa-circle-notch",
        sT: [],
      },
      {
        t: "fad fa-city",
        sT: [],
      },
      {
        t: "fad fa-clarinet",
        sT: [],
      },
      {
        t: "fad fa-claw-marks",
        sT: [],
      },
      {
        t: "fad fa-clinic-medical",
        sT: [],
      },
      {
        t: "fad fa-clipboard",
        sT: [],
      },
      {
        t: "fad fa-clipboard-check",
        sT: [],
      },
      {
        t: "fad fa-clipboard-list",
        sT: [],
      },
      {
        t: "fad fa-clipboard-list-check",
        sT: [],
      },
      {
        t: "fad fa-clipboard-prescription",
        sT: [],
      },
      {
        t: "fad fa-clipboard-user",
        sT: [],
      },
      {
        t: "fad fa-clock",
        sT: [],
      },
      {
        t: "fad fa-clone",
        sT: [],
      },
      {
        t: "fad fa-closed-captioning",
        sT: [],
      },
      {
        t: "fad fa-cloud",
        sT: [],
      },
      {
        t: "fad fa-cloud-download",
        sT: [],
      },
      {
        t: "fad fa-cloud-download-alt",
        sT: [],
      },
      {
        t: "fad fa-cloud-drizzle",
        sT: [],
      },
      {
        t: "fad fa-cloud-hail",
        sT: [],
      },
      {
        t: "fad fa-cloud-hail-mixed",
        sT: [],
      },
      {
        t: "fad fa-cloud-meatball",
        sT: [],
      },
      {
        t: "fad fa-cloud-moon",
        sT: [],
      },
      {
        t: "fad fa-cloud-moon-rain",
        sT: [],
      },
      {
        t: "fad fa-cloud-music",
        sT: [],
      },
      {
        t: "fad fa-cloud-rain",
        sT: [],
      },
      {
        t: "fad fa-cloud-rainbow",
        sT: [],
      },
      {
        t: "fad fa-cloud-showers",
        sT: [],
      },
      {
        t: "fad fa-cloud-showers-heavy",
        sT: [],
      },
      {
        t: "fad fa-cloud-sleet",
        sT: [],
      },
      {
        t: "fad fa-cloud-snow",
        sT: [],
      },
      {
        t: "fad fa-cloud-sun",
        sT: [],
      },
      {
        t: "fad fa-cloud-sun-rain",
        sT: [],
      },
      {
        t: "fad fa-cloud-upload",
        sT: [],
      },
      {
        t: "fad fa-cloud-upload-alt",
        sT: [],
      },
      {
        t: "fad fa-clouds",
        sT: [],
      },
      {
        t: "fad fa-clouds-moon",
        sT: [],
      },
      {
        t: "fad fa-clouds-sun",
        sT: [],
      },
      {
        t: "fad fa-club",
        sT: [],
      },
      {
        t: "fad fa-cocktail",
        sT: [],
      },
      {
        t: "fad fa-code",
        sT: [],
      },
      {
        t: "fad fa-code-branch",
        sT: [],
      },
      {
        t: "fad fa-code-commit",
        sT: [],
      },
      {
        t: "fad fa-code-merge",
        sT: [],
      },
      {
        t: "fad fa-coffee",
        sT: [],
      },
      {
        t: "fad fa-coffee-pot",
        sT: [],
      },
      {
        t: "fad fa-coffee-togo",
        sT: [],
      },
      {
        t: "fad fa-coffin",
        sT: [],
      },
      {
        t: "fad fa-coffin-cross",
        sT: [],
      },
      {
        t: "fad fa-cog",
        sT: [],
      },
      {
        t: "fad fa-cogs",
        sT: [],
      },
      {
        t: "fad fa-coin",
        sT: [],
      },
      {
        t: "fad fa-coins",
        sT: [],
      },
      {
        t: "fad fa-columns",
        sT: [],
      },
      {
        t: "fad fa-comet",
        sT: [],
      },
      {
        t: "fad fa-comment",
        sT: [],
      },
      {
        t: "fad fa-comment-alt",
        sT: [],
      },
      {
        t: "fad fa-comment-alt-check",
        sT: [],
      },
      {
        t: "fad fa-comment-alt-dollar",
        sT: [],
      },
      {
        t: "fad fa-comment-alt-dots",
        sT: [],
      },
      {
        t: "fad fa-comment-alt-edit",
        sT: [],
      },
      {
        t: "fad fa-comment-alt-exclamation",
        sT: [],
      },
      {
        t: "fad fa-comment-alt-lines",
        sT: [],
      },
      {
        t: "fad fa-comment-alt-medical",
        sT: [],
      },
      {
        t: "fad fa-comment-alt-minus",
        sT: [],
      },
      {
        t: "fad fa-comment-alt-music",
        sT: [],
      },
      {
        t: "fad fa-comment-alt-plus",
        sT: [],
      },
      {
        t: "fad fa-comment-alt-slash",
        sT: [],
      },
      {
        t: "fad fa-comment-alt-smile",
        sT: [],
      },
      {
        t: "fad fa-comment-alt-times",
        sT: [],
      },
      {
        t: "fad fa-comment-check",
        sT: [],
      },
      {
        t: "fad fa-comment-dollar",
        sT: [],
      },
      {
        t: "fad fa-comment-dots",
        sT: [],
      },
      {
        t: "fad fa-comment-edit",
        sT: [],
      },
      {
        t: "fad fa-comment-exclamation",
        sT: [],
      },
      {
        t: "fad fa-comment-lines",
        sT: [],
      },
      {
        t: "fad fa-comment-medical",
        sT: [],
      },
      {
        t: "fad fa-comment-minus",
        sT: [],
      },
      {
        t: "fad fa-comment-music",
        sT: [],
      },
      {
        t: "fad fa-comment-plus",
        sT: [],
      },
      {
        t: "fad fa-comment-slash",
        sT: [],
      },
      {
        t: "fad fa-comment-smile",
        sT: [],
      },
      {
        t: "fad fa-comment-times",
        sT: [],
      },
      {
        t: "fad fa-comments",
        sT: [],
      },
      {
        t: "fad fa-comments-alt",
        sT: [],
      },
      {
        t: "fad fa-comments-alt-dollar",
        sT: [],
      },
      {
        t: "fad fa-comments-dollar",
        sT: [],
      },
      {
        t: "fad fa-compact-disc",
        sT: [],
      },
      {
        t: "fad fa-compass",
        sT: [],
      },
      {
        t: "fad fa-compass-slash",
        sT: [],
      },
      {
        t: "fad fa-compress",
        sT: [],
      },
      {
        t: "fad fa-compress-alt",
        sT: [],
      },
      {
        t: "fad fa-compress-arrows-alt",
        sT: [],
      },
      {
        t: "fad fa-compress-wide",
        sT: [],
      },
      {
        t: "fad fa-computer-classic",
        sT: [],
      },
      {
        t: "fad fa-computer-speaker",
        sT: [],
      },
      {
        t: "fad fa-concierge-bell",
        sT: [],
      },
      {
        t: "fad fa-construction",
        sT: [],
      },
      {
        t: "fad fa-container-storage",
        sT: [],
      },
      {
        t: "fad fa-conveyor-belt",
        sT: [],
      },
      {
        t: "fad fa-conveyor-belt-alt",
        sT: [],
      },
      {
        t: "fad fa-cookie",
        sT: [],
      },
      {
        t: "fad fa-cookie-bite",
        sT: [],
      },
      {
        t: "fad fa-copy",
        sT: [],
      },
      {
        t: "fad fa-copyright",
        sT: [],
      },
      {
        t: "fad fa-corn",
        sT: [],
      },
      {
        t: "fad fa-couch",
        sT: [],
      },
      {
        t: "fad fa-cow",
        sT: [],
      },
      {
        t: "fad fa-cowbell",
        sT: [],
      },
      {
        t: "fad fa-cowbell-more",
        sT: [],
      },
      {
        t: "fad fa-credit-card",
        sT: [],
      },
      {
        t: "fad fa-credit-card-blank",
        sT: [],
      },
      {
        t: "fad fa-credit-card-front",
        sT: [],
      },
      {
        t: "fad fa-cricket",
        sT: [],
      },
      {
        t: "fad fa-croissant",
        sT: [],
      },
      {
        t: "fad fa-crop",
        sT: [],
      },
      {
        t: "fad fa-crop-alt",
        sT: [],
      },
      {
        t: "fad fa-cross",
        sT: [],
      },
      {
        t: "fad fa-crosshairs",
        sT: [],
      },
      {
        t: "fad fa-crow",
        sT: [],
      },
      {
        t: "fad fa-crown",
        sT: [],
      },
      {
        t: "fad fa-crutch",
        sT: [],
      },
      {
        t: "fad fa-crutches",
        sT: [],
      },
      {
        t: "fad fa-cube",
        sT: [],
      },
      {
        t: "fad fa-cubes",
        sT: [],
      },
      {
        t: "fad fa-curling",
        sT: [],
      },
      {
        t: "fad fa-cut",
        sT: [],
      },
      {
        t: "fad fa-dagger",
        sT: [],
      },
      {
        t: "fad fa-database",
        sT: [],
      },
      {
        t: "fad fa-deaf",
        sT: [],
      },
      {
        t: "fad fa-debug",
        sT: [],
      },
      {
        t: "fad fa-deer",
        sT: [],
      },
      {
        t: "fad fa-deer-rudolph",
        sT: [],
      },
      {
        t: "fad fa-democrat",
        sT: [],
      },
      {
        t: "fad fa-desktop",
        sT: [],
      },
      {
        t: "fad fa-desktop-alt",
        sT: [],
      },
      {
        t: "fad fa-dewpoint",
        sT: [],
      },
      {
        t: "fad fa-dharmachakra",
        sT: [],
      },
      {
        t: "fad fa-diagnoses",
        sT: [],
      },
      {
        t: "fad fa-diamond",
        sT: [],
      },
      {
        t: "fad fa-dice",
        sT: [],
      },
      {
        t: "fad fa-dice-d10",
        sT: [],
      },
      {
        t: "fad fa-dice-d12",
        sT: [],
      },
      {
        t: "fad fa-dice-d20",
        sT: [],
      },
      {
        t: "fad fa-dice-d4",
        sT: [],
      },
      {
        t: "fad fa-dice-d6",
        sT: [],
      },
      {
        t: "fad fa-dice-d8",
        sT: [],
      },
      {
        t: "fad fa-dice-five",
        sT: [],
      },
      {
        t: "fad fa-dice-four",
        sT: [],
      },
      {
        t: "fad fa-dice-one",
        sT: [],
      },
      {
        t: "fad fa-dice-six",
        sT: [],
      },
      {
        t: "fad fa-dice-three",
        sT: [],
      },
      {
        t: "fad fa-dice-two",
        sT: [],
      },
      {
        t: "fad fa-digging",
        sT: [],
      },
      {
        t: "fad fa-digital-tachograph",
        sT: [],
      },
      {
        t: "fad fa-diploma",
        sT: [],
      },
      {
        t: "fad fa-directions",
        sT: [],
      },
      {
        t: "fad fa-disc-drive",
        sT: [],
      },
      {
        t: "fad fa-disease",
        sT: [],
      },
      {
        t: "fad fa-divide",
        sT: [],
      },
      {
        t: "fad fa-dizzy",
        sT: [],
      },
      {
        t: "fad fa-dna",
        sT: [],
      },
      {
        t: "fad fa-do-not-enter",
        sT: [],
      },
      {
        t: "fad fa-dog",
        sT: [],
      },
      {
        t: "fad fa-dog-leashed",
        sT: [],
      },
      {
        t: "fad fa-dollar-sign",
        sT: [],
      },
      {
        t: "fad fa-dolly",
        sT: [],
      },
      {
        t: "fad fa-dolly-empty",
        sT: [],
      },
      {
        t: "fad fa-dolly-flatbed",
        sT: [],
      },
      {
        t: "fad fa-dolly-flatbed-alt",
        sT: [],
      },
      {
        t: "fad fa-dolly-flatbed-empty",
        sT: [],
      },
      {
        t: "fad fa-donate",
        sT: [],
      },
      {
        t: "fad fa-door-closed",
        sT: [],
      },
      {
        t: "fad fa-door-open",
        sT: [],
      },
      {
        t: "fad fa-dot-circle",
        sT: [],
      },
      {
        t: "fad fa-dove",
        sT: [],
      },
      {
        t: "fad fa-download",
        sT: [],
      },
      {
        t: "fad fa-drafting-compass",
        sT: [],
      },
      {
        t: "fad fa-dragon",
        sT: [],
      },
      {
        t: "fad fa-draw-circle",
        sT: [],
      },
      {
        t: "fad fa-draw-polygon",
        sT: [],
      },
      {
        t: "fad fa-draw-square",
        sT: [],
      },
      {
        t: "fad fa-dreidel",
        sT: [],
      },
      {
        t: "fad fa-drone",
        sT: [],
      },
      {
        t: "fad fa-drone-alt",
        sT: [],
      },
      {
        t: "fad fa-drum",
        sT: [],
      },
      {
        t: "fad fa-drum-steelpan",
        sT: [],
      },
      {
        t: "fad fa-drumstick",
        sT: [],
      },
      {
        t: "fad fa-drumstick-bite",
        sT: [],
      },
      {
        t: "fad fa-dryer",
        sT: [],
      },
      {
        t: "fad fa-dryer-alt",
        sT: [],
      },
      {
        t: "fad fa-duck",
        sT: [],
      },
      {
        t: "fad fa-dumbbell",
        sT: [],
      },
      {
        t: "fad fa-dumpster",
        sT: [],
      },
      {
        t: "fad fa-dumpster-fire",
        sT: [],
      },
      {
        t: "fad fa-dungeon",
        sT: [],
      },
      {
        t: "fad fa-ear",
        sT: [],
      },
      {
        t: "fad fa-ear-muffs",
        sT: [],
      },
      {
        t: "fad fa-eclipse",
        sT: [],
      },
      {
        t: "fad fa-eclipse-alt",
        sT: [],
      },
      {
        t: "fad fa-edit",
        sT: [],
      },
      {
        t: "fad fa-egg",
        sT: [],
      },
      {
        t: "fad fa-egg-fried",
        sT: [],
      },
      {
        t: "fad fa-eject",
        sT: [],
      },
      {
        t: "fad fa-elephant",
        sT: [],
      },
      {
        t: "fad fa-ellipsis-h",
        sT: [],
      },
      {
        t: "fad fa-ellipsis-h-alt",
        sT: [],
      },
      {
        t: "fad fa-ellipsis-v",
        sT: [],
      },
      {
        t: "fad fa-ellipsis-v-alt",
        sT: [],
      },
      {
        t: "fad fa-empty-set",
        sT: [],
      },
      {
        t: "fad fa-engine-warning",
        sT: [],
      },
      {
        t: "fad fa-envelope",
        sT: [],
      },
      {
        t: "fad fa-envelope-open",
        sT: [],
      },
      {
        t: "fad fa-envelope-open-dollar",
        sT: [],
      },
      {
        t: "fad fa-envelope-open-text",
        sT: [],
      },
      {
        t: "fad fa-envelope-square",
        sT: [],
      },
      {
        t: "fad fa-equals",
        sT: [],
      },
      {
        t: "fad fa-eraser",
        sT: [],
      },
      {
        t: "fad fa-ethernet",
        sT: [],
      },
      {
        t: "fad fa-euro-sign",
        sT: [],
      },
      {
        t: "fad fa-exchange",
        sT: [],
      },
      {
        t: "fad fa-exchange-alt",
        sT: [],
      },
      {
        t: "fad fa-exclamation",
        sT: [],
      },
      {
        t: "fad fa-exclamation-circle",
        sT: [],
      },
      {
        t: "fad fa-exclamation-square",
        sT: [],
      },
      {
        t: "fad fa-exclamation-triangle",
        sT: [],
      },
      {
        t: "fad fa-expand",
        sT: [],
      },
      {
        t: "fad fa-expand-alt",
        sT: [],
      },
      {
        t: "fad fa-expand-arrows",
        sT: [],
      },
      {
        t: "fad fa-expand-arrows-alt",
        sT: [],
      },
      {
        t: "fad fa-expand-wide",
        sT: [],
      },
      {
        t: "fad fa-external-link",
        sT: [],
      },
      {
        t: "fad fa-external-link-alt",
        sT: [],
      },
      {
        t: "fad fa-external-link-square",
        sT: [],
      },
      {
        t: "fad fa-external-link-square-alt",
        sT: [],
      },
      {
        t: "fad fa-eye",
        sT: [],
      },
      {
        t: "fad fa-eye-dropper",
        sT: [],
      },
      {
        t: "fad fa-eye-evil",
        sT: [],
      },
      {
        t: "fad fa-eye-slash",
        sT: [],
      },
      {
        t: "fad fa-fan",
        sT: [],
      },
      {
        t: "fad fa-fan-table",
        sT: [],
      },
      {
        t: "fad fa-farm",
        sT: [],
      },
      {
        t: "fad fa-fast-backward",
        sT: [],
      },
      {
        t: "fad fa-fast-forward",
        sT: [],
      },
      {
        t: "fad fa-faucet",
        sT: [],
      },
      {
        t: "fad fa-faucet-drip",
        sT: [],
      },
      {
        t: "fad fa-fax",
        sT: [],
      },
      {
        t: "fad fa-feather",
        sT: [],
      },
      {
        t: "fad fa-feather-alt",
        sT: [],
      },
      {
        t: "fad fa-female",
        sT: [],
      },
      {
        t: "fad fa-field-hockey",
        sT: [],
      },
      {
        t: "fad fa-fighter-jet",
        sT: [],
      },
      {
        t: "fad fa-file",
        sT: [],
      },
      {
        t: "fad fa-file-alt",
        sT: [],
      },
      {
        t: "fad fa-file-archive",
        sT: [],
      },
      {
        t: "fad fa-file-audio",
        sT: [],
      },
      {
        t: "fad fa-file-certificate",
        sT: [],
      },
      {
        t: "fad fa-file-chart-line",
        sT: [],
      },
      {
        t: "fad fa-file-chart-pie",
        sT: [],
      },
      {
        t: "fad fa-file-check",
        sT: [],
      },
      {
        t: "fad fa-file-code",
        sT: [],
      },
      {
        t: "fad fa-file-contract",
        sT: [],
      },
      {
        t: "fad fa-file-csv",
        sT: [],
      },
      {
        t: "fad fa-file-download",
        sT: [],
      },
      {
        t: "fad fa-file-edit",
        sT: [],
      },
      {
        t: "fad fa-file-excel",
        sT: [],
      },
      {
        t: "fad fa-file-exclamation",
        sT: [],
      },
      {
        t: "fad fa-file-export",
        sT: [],
      },
      {
        t: "fad fa-file-image",
        sT: [],
      },
      {
        t: "fad fa-file-import",
        sT: [],
      },
      {
        t: "fad fa-file-invoice",
        sT: [],
      },
      {
        t: "fad fa-file-invoice-dollar",
        sT: [],
      },
      {
        t: "fad fa-file-medical",
        sT: [],
      },
      {
        t: "fad fa-file-medical-alt",
        sT: [],
      },
      {
        t: "fad fa-file-minus",
        sT: [],
      },
      {
        t: "fad fa-file-music",
        sT: [],
      },
      {
        t: "fad fa-file-pdf",
        sT: [],
      },
      {
        t: "fad fa-file-plus",
        sT: [],
      },
      {
        t: "fad fa-file-powerpoint",
        sT: [],
      },
      {
        t: "fad fa-file-prescription",
        sT: [],
      },
      {
        t: "fad fa-file-search",
        sT: [],
      },
      {
        t: "fad fa-file-signature",
        sT: [],
      },
      {
        t: "fad fa-file-spreadsheet",
        sT: [],
      },
      {
        t: "fad fa-file-times",
        sT: [],
      },
      {
        t: "fad fa-file-upload",
        sT: [],
      },
      {
        t: "fad fa-file-user",
        sT: [],
      },
      {
        t: "fad fa-file-video",
        sT: [],
      },
      {
        t: "fad fa-file-word",
        sT: [],
      },
      {
        t: "fad fa-files-medical",
        sT: [],
      },
      {
        t: "fad fa-fill",
        sT: [],
      },
      {
        t: "fad fa-fill-drip",
        sT: [],
      },
      {
        t: "fad fa-film",
        sT: [],
      },
      {
        t: "fad fa-film-alt",
        sT: [],
      },
      {
        t: "fad fa-film-canister",
        sT: [],
      },
      {
        t: "fad fa-filter",
        sT: [],
      },
      {
        t: "fad fa-fingerprint",
        sT: [],
      },
      {
        t: "fad fa-fire",
        sT: [],
      },
      {
        t: "fad fa-fire-alt",
        sT: [],
      },
      {
        t: "fad fa-fire-extinguisher",
        sT: [],
      },
      {
        t: "fad fa-fire-smoke",
        sT: [],
      },
      {
        t: "fad fa-fireplace",
        sT: [],
      },
      {
        t: "fad fa-first-aid",
        sT: [],
      },
      {
        t: "fad fa-fish",
        sT: [],
      },
      {
        t: "fad fa-fish-cooked",
        sT: [],
      },
      {
        t: "fad fa-fist-raised",
        sT: [],
      },
      {
        t: "fad fa-flag",
        sT: [],
      },
      {
        t: "fad fa-flag-alt",
        sT: [],
      },
      {
        t: "fad fa-flag-checkered",
        sT: [],
      },
      {
        t: "fad fa-flag-usa",
        sT: [],
      },
      {
        t: "fad fa-flame",
        sT: [],
      },
      {
        t: "fad fa-flashlight",
        sT: [],
      },
      {
        t: "fad fa-flask",
        sT: [],
      },
      {
        t: "fad fa-flask-poison",
        sT: [],
      },
      {
        t: "fad fa-flask-potion",
        sT: [],
      },
      {
        t: "fad fa-flower",
        sT: [],
      },
      {
        t: "fad fa-flower-daffodil",
        sT: [],
      },
      {
        t: "fad fa-flower-tulip",
        sT: [],
      },
      {
        t: "fad fa-flushed",
        sT: [],
      },
      {
        t: "fad fa-flute",
        sT: [],
      },
      {
        t: "fad fa-flux-capacitor",
        sT: [],
      },
      {
        t: "fad fa-fog",
        sT: [],
      },
      {
        t: "fad fa-folder",
        sT: [],
      },
      {
        t: "fad fa-folder-download",
        sT: [],
      },
      {
        t: "fad fa-folder-minus",
        sT: [],
      },
      {
        t: "fad fa-folder-open",
        sT: [],
      },
      {
        t: "fad fa-folder-plus",
        sT: [],
      },
      {
        t: "fad fa-folder-times",
        sT: [],
      },
      {
        t: "fad fa-folder-tree",
        sT: [],
      },
      {
        t: "fad fa-folder-upload",
        sT: [],
      },
      {
        t: "fad fa-folders",
        sT: [],
      },
      {
        t: "fad fa-font",
        sT: [],
      },
      {
        t: "fad fa-font-case",
        sT: [],
      },
      {
        t: "fad fa-football-ball",
        sT: [],
      },
      {
        t: "fad fa-football-helmet",
        sT: [],
      },
      {
        t: "fad fa-forklift",
        sT: [],
      },
      {
        t: "fad fa-forward",
        sT: [],
      },
      {
        t: "fad fa-fragile",
        sT: [],
      },
      {
        t: "fad fa-french-fries",
        sT: [],
      },
      {
        t: "fad fa-frog",
        sT: [],
      },
      {
        t: "fad fa-frosty-head",
        sT: [],
      },
      {
        t: "fad fa-frown",
        sT: [],
      },
      {
        t: "fad fa-frown-open",
        sT: [],
      },
      {
        t: "fad fa-function",
        sT: [],
      },
      {
        t: "fad fa-funnel-dollar",
        sT: [],
      },
      {
        t: "fad fa-futbol",
        sT: [],
      },
      {
        t: "fad fa-galaxy",
        sT: [],
      },
      {
        t: "fad fa-game-board",
        sT: [],
      },
      {
        t: "fad fa-game-board-alt",
        sT: [],
      },
      {
        t: "fad fa-game-console-handheld",
        sT: [],
      },
      {
        t: "fad fa-gamepad",
        sT: [],
      },
      {
        t: "fad fa-gamepad-alt",
        sT: [],
      },
      {
        t: "fad fa-garage",
        sT: [],
      },
      {
        t: "fad fa-garage-car",
        sT: [],
      },
      {
        t: "fad fa-garage-open",
        sT: [],
      },
      {
        t: "fad fa-gas-pump",
        sT: [],
      },
      {
        t: "fad fa-gas-pump-slash",
        sT: [],
      },
      {
        t: "fad fa-gavel",
        sT: [],
      },
      {
        t: "fad fa-gem",
        sT: [],
      },
      {
        t: "fad fa-genderless",
        sT: [],
      },
      {
        t: "fad fa-ghost",
        sT: [],
      },
      {
        t: "fad fa-gift",
        sT: [],
      },
      {
        t: "fad fa-gift-card",
        sT: [],
      },
      {
        t: "fad fa-gifts",
        sT: [],
      },
      {
        t: "fad fa-gingerbread-man",
        sT: [],
      },
      {
        t: "fad fa-glass",
        sT: [],
      },
      {
        t: "fad fa-glass-champagne",
        sT: [],
      },
      {
        t: "fad fa-glass-cheers",
        sT: [],
      },
      {
        t: "fad fa-glass-citrus",
        sT: [],
      },
      {
        t: "fad fa-glass-martini",
        sT: [],
      },
      {
        t: "fad fa-glass-martini-alt",
        sT: [],
      },
      {
        t: "fad fa-glass-whiskey",
        sT: [],
      },
      {
        t: "fad fa-glass-whiskey-rocks",
        sT: [],
      },
      {
        t: "fad fa-glasses",
        sT: [],
      },
      {
        t: "fad fa-glasses-alt",
        sT: [],
      },
      {
        t: "fad fa-globe",
        sT: [],
      },
      {
        t: "fad fa-globe-africa",
        sT: [],
      },
      {
        t: "fad fa-globe-americas",
        sT: [],
      },
      {
        t: "fad fa-globe-asia",
        sT: [],
      },
      {
        t: "fad fa-globe-europe",
        sT: [],
      },
      {
        t: "fad fa-globe-snow",
        sT: [],
      },
      {
        t: "fad fa-globe-stand",
        sT: [],
      },
      {
        t: "fad fa-golf-ball",
        sT: [],
      },
      {
        t: "fad fa-golf-club",
        sT: [],
      },
      {
        t: "fad fa-gopuram",
        sT: [],
      },
      {
        t: "fad fa-graduation-cap",
        sT: [],
      },
      {
        t: "fad fa-gramophone",
        sT: [],
      },
      {
        t: "fad fa-greater-than",
        sT: [],
      },
      {
        t: "fad fa-greater-than-equal",
        sT: [],
      },
      {
        t: "fad fa-grimace",
        sT: [],
      },
      {
        t: "fad fa-grin",
        sT: [],
      },
      {
        t: "fad fa-grin-alt",
        sT: [],
      },
      {
        t: "fad fa-grin-beam",
        sT: [],
      },
      {
        t: "fad fa-grin-beam-sweat",
        sT: [],
      },
      {
        t: "fad fa-grin-hearts",
        sT: [],
      },
      {
        t: "fad fa-grin-squint",
        sT: [],
      },
      {
        t: "fad fa-grin-squint-tears",
        sT: [],
      },
      {
        t: "fad fa-grin-stars",
        sT: [],
      },
      {
        t: "fad fa-grin-tears",
        sT: [],
      },
      {
        t: "fad fa-grin-tongue",
        sT: [],
      },
      {
        t: "fad fa-grin-tongue-squint",
        sT: [],
      },
      {
        t: "fad fa-grin-tongue-wink",
        sT: [],
      },
      {
        t: "fad fa-grin-wink",
        sT: [],
      },
      {
        t: "fad fa-grip-horizontal",
        sT: [],
      },
      {
        t: "fad fa-grip-lines",
        sT: [],
      },
      {
        t: "fad fa-grip-lines-vertical",
        sT: [],
      },
      {
        t: "fad fa-grip-vertical",
        sT: [],
      },
      {
        t: "fad fa-guitar",
        sT: [],
      },
      {
        t: "fad fa-guitar-electric",
        sT: [],
      },
      {
        t: "fad fa-guitars",
        sT: [],
      },
      {
        t: "fad fa-h-square",
        sT: [],
      },
      {
        t: "fad fa-h1",
        sT: [],
      },
      {
        t: "fad fa-h2",
        sT: [],
      },
      {
        t: "fad fa-h3",
        sT: [],
      },
      {
        t: "fad fa-h4",
        sT: [],
      },
      {
        t: "fad fa-hamburger",
        sT: [],
      },
      {
        t: "fad fa-hammer",
        sT: [],
      },
      {
        t: "fad fa-hammer-war",
        sT: [],
      },
      {
        t: "fad fa-hamsa",
        sT: [],
      },
      {
        t: "fad fa-hand-heart",
        sT: [],
      },
      {
        t: "fad fa-hand-holding",
        sT: [],
      },
      {
        t: "fad fa-hand-holding-box",
        sT: [],
      },
      {
        t: "fad fa-hand-holding-heart",
        sT: [],
      },
      {
        t: "fad fa-hand-holding-magic",
        sT: [],
      },
      {
        t: "fad fa-hand-holding-medical",
        sT: [],
      },
      {
        t: "fad fa-hand-holding-seedling",
        sT: [],
      },
      {
        t: "fad fa-hand-holding-usd",
        sT: [],
      },
      {
        t: "fad fa-hand-holding-water",
        sT: [],
      },
      {
        t: "fad fa-hand-lizard",
        sT: [],
      },
      {
        t: "fad fa-hand-middle-finger",
        sT: [],
      },
      {
        t: "fad fa-hand-paper",
        sT: [],
      },
      {
        t: "fad fa-hand-peace",
        sT: [],
      },
      {
        t: "fad fa-hand-point-down",
        sT: [],
      },
      {
        t: "fad fa-hand-point-left",
        sT: [],
      },
      {
        t: "fad fa-hand-point-right",
        sT: [],
      },
      {
        t: "fad fa-hand-point-up",
        sT: [],
      },
      {
        t: "fad fa-hand-pointer",
        sT: [],
      },
      {
        t: "fad fa-hand-receiving",
        sT: [],
      },
      {
        t: "fad fa-hand-rock",
        sT: [],
      },
      {
        t: "fad fa-hand-scissors",
        sT: [],
      },
      {
        t: "fad fa-hand-sparkles",
        sT: [],
      },
      {
        t: "fad fa-hand-spock",
        sT: [],
      },
      {
        t: "fad fa-hands",
        sT: [],
      },
      {
        t: "fad fa-hands-heart",
        sT: [],
      },
      {
        t: "fad fa-hands-helping",
        sT: [],
      },
      {
        t: "fad fa-hands-usd",
        sT: [],
      },
      {
        t: "fad fa-hands-wash",
        sT: [],
      },
      {
        t: "fad fa-handshake",
        sT: [],
      },
      {
        t: "fad fa-handshake-alt",
        sT: [],
      },
      {
        t: "fad fa-handshake-alt-slash",
        sT: [],
      },
      {
        t: "fad fa-handshake-slash",
        sT: [],
      },
      {
        t: "fad fa-hanukiah",
        sT: [],
      },
      {
        t: "fad fa-hard-hat",
        sT: [],
      },
      {
        t: "fad fa-hashtag",
        sT: [],
      },
      {
        t: "fad fa-hat-chef",
        sT: [],
      },
      {
        t: "fad fa-hat-cowboy",
        sT: [],
      },
      {
        t: "fad fa-hat-cowboy-side",
        sT: [],
      },
      {
        t: "fad fa-hat-santa",
        sT: [],
      },
      {
        t: "fad fa-hat-winter",
        sT: [],
      },
      {
        t: "fad fa-hat-witch",
        sT: [],
      },
      {
        t: "fad fa-hat-wizard",
        sT: [],
      },
      {
        t: "fad fa-hdd",
        sT: [],
      },
      {
        t: "fad fa-head-side",
        sT: [],
      },
      {
        t: "fad fa-head-side-brain",
        sT: [],
      },
      {
        t: "fad fa-head-side-cough",
        sT: [],
      },
      {
        t: "fad fa-head-side-cough-slash",
        sT: [],
      },
      {
        t: "fad fa-head-side-headphones",
        sT: [],
      },
      {
        t: "fad fa-head-side-mask",
        sT: [],
      },
      {
        t: "fad fa-head-side-medical",
        sT: [],
      },
      {
        t: "fad fa-head-side-virus",
        sT: [],
      },
      {
        t: "fad fa-head-vr",
        sT: [],
      },
      {
        t: "fad fa-heading",
        sT: [],
      },
      {
        t: "fad fa-headphones",
        sT: [],
      },
      {
        t: "fad fa-headphones-alt",
        sT: [],
      },
      {
        t: "fad fa-headset",
        sT: [],
      },
      {
        t: "fad fa-heart",
        sT: [],
      },
      {
        t: "fad fa-heart-broken",
        sT: [],
      },
      {
        t: "fad fa-heart-circle",
        sT: [],
      },
      {
        t: "fad fa-heart-rate",
        sT: [],
      },
      {
        t: "fad fa-heart-square",
        sT: [],
      },
      {
        t: "fad fa-heartbeat",
        sT: [],
      },
      {
        t: "fad fa-heat",
        sT: [],
      },
      {
        t: "fad fa-helicopter",
        sT: [],
      },
      {
        t: "fad fa-helmet-battle",
        sT: [],
      },
      {
        t: "fad fa-hexagon",
        sT: [],
      },
      {
        t: "fad fa-highlighter",
        sT: [],
      },
      {
        t: "fad fa-hiking",
        sT: [],
      },
      {
        t: "fad fa-hippo",
        sT: [],
      },
      {
        t: "fad fa-history",
        sT: [],
      },
      {
        t: "fad fa-hockey-mask",
        sT: [],
      },
      {
        t: "fad fa-hockey-puck",
        sT: [],
      },
      {
        t: "fad fa-hockey-sticks",
        sT: [],
      },
      {
        t: "fad fa-holly-berry",
        sT: [],
      },
      {
        t: "fad fa-home",
        sT: [],
      },
      {
        t: "fad fa-home-alt",
        sT: [],
      },
      {
        t: "fad fa-home-heart",
        sT: [],
      },
      {
        t: "fad fa-home-lg",
        sT: [],
      },
      {
        t: "fad fa-home-lg-alt",
        sT: [],
      },
      {
        t: "fad fa-hood-cloak",
        sT: [],
      },
      {
        t: "fad fa-horizontal-rule",
        sT: [],
      },
      {
        t: "fad fa-horse",
        sT: [],
      },
      {
        t: "fad fa-horse-head",
        sT: [],
      },
      {
        t: "fad fa-horse-saddle",
        sT: [],
      },
      {
        t: "fad fa-hospital",
        sT: [],
      },
      {
        t: "fad fa-hospital-alt",
        sT: [],
      },
      {
        t: "fad fa-hospital-symbol",
        sT: [],
      },
      {
        t: "fad fa-hospital-user",
        sT: [],
      },
      {
        t: "fad fa-hospitals",
        sT: [],
      },
      {
        t: "fad fa-hot-tub",
        sT: [],
      },
      {
        t: "fad fa-hotdog",
        sT: [],
      },
      {
        t: "fad fa-hotel",
        sT: [],
      },
      {
        t: "fad fa-hourglass",
        sT: [],
      },
      {
        t: "fad fa-hourglass-end",
        sT: [],
      },
      {
        t: "fad fa-hourglass-half",
        sT: [],
      },
      {
        t: "fad fa-hourglass-start",
        sT: [],
      },
      {
        t: "fad fa-house",
        sT: [],
      },
      {
        t: "fad fa-house-damage",
        sT: [],
      },
      {
        t: "fad fa-house-day",
        sT: [],
      },
      {
        t: "fad fa-house-flood",
        sT: [],
      },
      {
        t: "fad fa-house-leave",
        sT: [],
      },
      {
        t: "fad fa-house-night",
        sT: [],
      },
      {
        t: "fad fa-house-return",
        sT: [],
      },
      {
        t: "fad fa-house-signal",
        sT: [],
      },
      {
        t: "fad fa-house-user",
        sT: [],
      },
      {
        t: "fad fa-hryvnia",
        sT: [],
      },
      {
        t: "fad fa-humidity",
        sT: [],
      },
      {
        t: "fad fa-hurricane",
        sT: [],
      },
      {
        t: "fad fa-i-cursor",
        sT: [],
      },
      {
        t: "fad fa-ice-cream",
        sT: [],
      },
      {
        t: "fad fa-ice-skate",
        sT: [],
      },
      {
        t: "fad fa-icicles",
        sT: [],
      },
      {
        t: "fad fa-icons",
        sT: [],
      },
      {
        t: "fad fa-icons-alt",
        sT: [],
      },
      {
        t: "fad fa-id-badge",
        sT: [],
      },
      {
        t: "fad fa-id-card",
        sT: [],
      },
      {
        t: "fad fa-id-card-alt",
        sT: [],
      },
      {
        t: "fad fa-igloo",
        sT: [],
      },
      {
        t: "fad fa-image",
        sT: [],
      },
      {
        t: "fad fa-image-polaroid",
        sT: [],
      },
      {
        t: "fad fa-images",
        sT: [],
      },
      {
        t: "fad fa-inbox",
        sT: [],
      },
      {
        t: "fad fa-inbox-in",
        sT: [],
      },
      {
        t: "fad fa-inbox-out",
        sT: [],
      },
      {
        t: "fad fa-indent",
        sT: [],
      },
      {
        t: "fad fa-industry",
        sT: [],
      },
      {
        t: "fad fa-industry-alt",
        sT: [],
      },
      {
        t: "fad fa-infinity",
        sT: [],
      },
      {
        t: "fad fa-info",
        sT: [],
      },
      {
        t: "fad fa-info-circle",
        sT: [],
      },
      {
        t: "fad fa-info-square",
        sT: [],
      },
      {
        t: "fad fa-inhaler",
        sT: [],
      },
      {
        t: "fad fa-integral",
        sT: [],
      },
      {
        t: "fad fa-intersection",
        sT: [],
      },
      {
        t: "fad fa-inventory",
        sT: [],
      },
      {
        t: "fad fa-island-tropical",
        sT: [],
      },
      {
        t: "fad fa-italic",
        sT: [],
      },
      {
        t: "fad fa-jack-o-lantern",
        sT: [],
      },
      {
        t: "fad fa-jedi",
        sT: [],
      },
      {
        t: "fad fa-joint",
        sT: [],
      },
      {
        t: "fad fa-journal-whills",
        sT: [],
      },
      {
        t: "fad fa-joystick",
        sT: [],
      },
      {
        t: "fad fa-jug",
        sT: [],
      },
      {
        t: "fad fa-kaaba",
        sT: [],
      },
      {
        t: "fad fa-kazoo",
        sT: [],
      },
      {
        t: "fad fa-kerning",
        sT: [],
      },
      {
        t: "fad fa-key",
        sT: [],
      },
      {
        t: "fad fa-key-skeleton",
        sT: [],
      },
      {
        t: "fad fa-keyboard",
        sT: [],
      },
      {
        t: "fad fa-keynote",
        sT: [],
      },
      {
        t: "fad fa-khanda",
        sT: [],
      },
      {
        t: "fad fa-kidneys",
        sT: [],
      },
      {
        t: "fad fa-kiss",
        sT: [],
      },
      {
        t: "fad fa-kiss-beam",
        sT: [],
      },
      {
        t: "fad fa-kiss-wink-heart",
        sT: [],
      },
      {
        t: "fad fa-kite",
        sT: [],
      },
      {
        t: "fad fa-kiwi-bird",
        sT: [],
      },
      {
        t: "fad fa-knife-kitchen",
        sT: [],
      },
      {
        t: "fad fa-lambda",
        sT: [],
      },
      {
        t: "fad fa-lamp",
        sT: [],
      },
      {
        t: "fad fa-lamp-desk",
        sT: [],
      },
      {
        t: "fad fa-lamp-floor",
        sT: [],
      },
      {
        t: "fad fa-landmark",
        sT: [],
      },
      {
        t: "fad fa-landmark-alt",
        sT: [],
      },
      {
        t: "fad fa-language",
        sT: [],
      },
      {
        t: "fad fa-laptop",
        sT: [],
      },
      {
        t: "fad fa-laptop-code",
        sT: [],
      },
      {
        t: "fad fa-laptop-house",
        sT: [],
      },
      {
        t: "fad fa-laptop-medical",
        sT: [],
      },
      {
        t: "fad fa-lasso",
        sT: [],
      },
      {
        t: "fad fa-laugh",
        sT: [],
      },
      {
        t: "fad fa-laugh-beam",
        sT: [],
      },
      {
        t: "fad fa-laugh-squint",
        sT: [],
      },
      {
        t: "fad fa-laugh-wink",
        sT: [],
      },
      {
        t: "fad fa-layer-group",
        sT: [],
      },
      {
        t: "fad fa-layer-minus",
        sT: [],
      },
      {
        t: "fad fa-layer-plus",
        sT: [],
      },
      {
        t: "fad fa-leaf",
        sT: [],
      },
      {
        t: "fad fa-leaf-heart",
        sT: [],
      },
      {
        t: "fad fa-leaf-maple",
        sT: [],
      },
      {
        t: "fad fa-leaf-oak",
        sT: [],
      },
      {
        t: "fad fa-lemon",
        sT: [],
      },
      {
        t: "fad fa-less-than",
        sT: [],
      },
      {
        t: "fad fa-less-than-equal",
        sT: [],
      },
      {
        t: "fad fa-level-down",
        sT: [],
      },
      {
        t: "fad fa-level-down-alt",
        sT: [],
      },
      {
        t: "fad fa-level-up",
        sT: [],
      },
      {
        t: "fad fa-level-up-alt",
        sT: [],
      },
      {
        t: "fad fa-life-ring",
        sT: [],
      },
      {
        t: "fad fa-light-ceiling",
        sT: [],
      },
      {
        t: "fad fa-light-switch",
        sT: [],
      },
      {
        t: "fad fa-light-switch-off",
        sT: [],
      },
      {
        t: "fad fa-light-switch-on",
        sT: [],
      },
      {
        t: "fad fa-lightbulb",
        sT: [],
      },
      {
        t: "fad fa-lightbulb-dollar",
        sT: [],
      },
      {
        t: "fad fa-lightbulb-exclamation",
        sT: [],
      },
      {
        t: "fad fa-lightbulb-on",
        sT: [],
      },
      {
        t: "fad fa-lightbulb-slash",
        sT: [],
      },
      {
        t: "fad fa-lights-holiday",
        sT: [],
      },
      {
        t: "fad fa-line-columns",
        sT: [],
      },
      {
        t: "fad fa-line-height",
        sT: [],
      },
      {
        t: "fad fa-link",
        sT: [],
      },
      {
        t: "fad fa-lips",
        sT: [],
      },
      {
        t: "fad fa-lira-sign",
        sT: [],
      },
      {
        t: "fad fa-list",
        sT: [],
      },
      {
        t: "fad fa-list-alt",
        sT: [],
      },
      {
        t: "fad fa-list-music",
        sT: [],
      },
      {
        t: "fad fa-list-ol",
        sT: [],
      },
      {
        t: "fad fa-list-ul",
        sT: [],
      },
      {
        t: "fad fa-location",
        sT: [],
      },
      {
        t: "fad fa-location-arrow",
        sT: [],
      },
      {
        t: "fad fa-location-circle",
        sT: [],
      },
      {
        t: "fad fa-location-slash",
        sT: [],
      },
      {
        t: "fad fa-lock",
        sT: [],
      },
      {
        t: "fad fa-lock-alt",
        sT: [],
      },
      {
        t: "fad fa-lock-open",
        sT: [],
      },
      {
        t: "fad fa-lock-open-alt",
        sT: [],
      },
      {
        t: "fad fa-long-arrow-alt-down",
        sT: [],
      },
      {
        t: "fad fa-long-arrow-alt-left",
        sT: [],
      },
      {
        t: "fad fa-long-arrow-alt-right",
        sT: [],
      },
      {
        t: "fad fa-long-arrow-alt-up",
        sT: [],
      },
      {
        t: "fad fa-long-arrow-down",
        sT: [],
      },
      {
        t: "fad fa-long-arrow-left",
        sT: [],
      },
      {
        t: "fad fa-long-arrow-right",
        sT: [],
      },
      {
        t: "fad fa-long-arrow-up",
        sT: [],
      },
      {
        t: "fad fa-loveseat",
        sT: [],
      },
      {
        t: "fad fa-low-vision",
        sT: [],
      },
      {
        t: "fad fa-luchador",
        sT: [],
      },
      {
        t: "fad fa-luggage-cart",
        sT: [],
      },
      {
        t: "fad fa-lungs",
        sT: [],
      },
      {
        t: "fad fa-lungs-virus",
        sT: [],
      },
      {
        t: "fad fa-mace",
        sT: [],
      },
      {
        t: "fad fa-magic",
        sT: [],
      },
      {
        t: "fad fa-magnet",
        sT: [],
      },
      {
        t: "fad fa-mail-bulk",
        sT: [],
      },
      {
        t: "fad fa-mailbox",
        sT: [],
      },
      {
        t: "fad fa-male",
        sT: [],
      },
      {
        t: "fad fa-mandolin",
        sT: [],
      },
      {
        t: "fad fa-map",
        sT: [],
      },
      {
        t: "fad fa-map-marked",
        sT: [],
      },
      {
        t: "fad fa-map-marked-alt",
        sT: [],
      },
      {
        t: "fad fa-map-marker",
        sT: [],
      },
      {
        t: "fad fa-map-marker-alt",
        sT: [],
      },
      {
        t: "fad fa-map-marker-alt-slash",
        sT: [],
      },
      {
        t: "fad fa-map-marker-check",
        sT: [],
      },
      {
        t: "fad fa-map-marker-edit",
        sT: [],
      },
      {
        t: "fad fa-map-marker-exclamation",
        sT: [],
      },
      {
        t: "fad fa-map-marker-minus",
        sT: [],
      },
      {
        t: "fad fa-map-marker-plus",
        sT: [],
      },
      {
        t: "fad fa-map-marker-question",
        sT: [],
      },
      {
        t: "fad fa-map-marker-slash",
        sT: [],
      },
      {
        t: "fad fa-map-marker-smile",
        sT: [],
      },
      {
        t: "fad fa-map-marker-times",
        sT: [],
      },
      {
        t: "fad fa-map-pin",
        sT: [],
      },
      {
        t: "fad fa-map-signs",
        sT: [],
      },
      {
        t: "fad fa-marker",
        sT: [],
      },
      {
        t: "fad fa-mars",
        sT: [],
      },
      {
        t: "fad fa-mars-double",
        sT: [],
      },
      {
        t: "fad fa-mars-stroke",
        sT: [],
      },
      {
        t: "fad fa-mars-stroke-h",
        sT: [],
      },
      {
        t: "fad fa-mars-stroke-v",
        sT: [],
      },
      {
        t: "fad fa-mask",
        sT: [],
      },
      {
        t: "fad fa-meat",
        sT: [],
      },
      {
        t: "fad fa-medal",
        sT: [],
      },
      {
        t: "fad fa-medkit",
        sT: [],
      },
      {
        t: "fad fa-megaphone",
        sT: [],
      },
      {
        t: "fad fa-meh",
        sT: [],
      },
      {
        t: "fad fa-meh-blank",
        sT: [],
      },
      {
        t: "fad fa-meh-rolling-eyes",
        sT: [],
      },
      {
        t: "fad fa-memory",
        sT: [],
      },
      {
        t: "fad fa-menorah",
        sT: [],
      },
      {
        t: "fad fa-mercury",
        sT: [],
      },
      {
        t: "fad fa-meteor",
        sT: [],
      },
      {
        t: "fad fa-microchip",
        sT: [],
      },
      {
        t: "fad fa-microphone",
        sT: [],
      },
      {
        t: "fad fa-microphone-alt",
        sT: [],
      },
      {
        t: "fad fa-microphone-alt-slash",
        sT: [],
      },
      {
        t: "fad fa-microphone-slash",
        sT: [],
      },
      {
        t: "fad fa-microphone-stand",
        sT: [],
      },
      {
        t: "fad fa-microscope",
        sT: [],
      },
      {
        t: "fad fa-microwave",
        sT: [],
      },
      {
        t: "fad fa-mind-share",
        sT: [],
      },
      {
        t: "fad fa-minus",
        sT: [],
      },
      {
        t: "fad fa-minus-circle",
        sT: [],
      },
      {
        t: "fad fa-minus-hexagon",
        sT: [],
      },
      {
        t: "fad fa-minus-octagon",
        sT: [],
      },
      {
        t: "fad fa-minus-square",
        sT: [],
      },
      {
        t: "fad fa-mistletoe",
        sT: [],
      },
      {
        t: "fad fa-mitten",
        sT: [],
      },
      {
        t: "fad fa-mobile",
        sT: [],
      },
      {
        t: "fad fa-mobile-alt",
        sT: [],
      },
      {
        t: "fad fa-mobile-android",
        sT: [],
      },
      {
        t: "fad fa-mobile-android-alt",
        sT: [],
      },
      {
        t: "fad fa-money-bill",
        sT: [],
      },
      {
        t: "fad fa-money-bill-alt",
        sT: [],
      },
      {
        t: "fad fa-money-bill-wave",
        sT: [],
      },
      {
        t: "fad fa-money-bill-wave-alt",
        sT: [],
      },
      {
        t: "fad fa-money-check",
        sT: [],
      },
      {
        t: "fad fa-money-check-alt",
        sT: [],
      },
      {
        t: "fad fa-money-check-edit",
        sT: [],
      },
      {
        t: "fad fa-money-check-edit-alt",
        sT: [],
      },
      {
        t: "fad fa-monitor-heart-rate",
        sT: [],
      },
      {
        t: "fad fa-monkey",
        sT: [],
      },
      {
        t: "fad fa-monument",
        sT: [],
      },
      {
        t: "fad fa-moon",
        sT: [],
      },
      {
        t: "fad fa-moon-cloud",
        sT: [],
      },
      {
        t: "fad fa-moon-stars",
        sT: [],
      },
      {
        t: "fad fa-mortar-pestle",
        sT: [],
      },
      {
        t: "fad fa-mosque",
        sT: [],
      },
      {
        t: "fad fa-motorcycle",
        sT: [],
      },
      {
        t: "fad fa-mountain",
        sT: [],
      },
      {
        t: "fad fa-mountains",
        sT: [],
      },
      {
        t: "fad fa-mouse",
        sT: [],
      },
      {
        t: "fad fa-mouse-alt",
        sT: [],
      },
      {
        t: "fad fa-mouse-pointer",
        sT: [],
      },
      {
        t: "fad fa-mp3-player",
        sT: [],
      },
      {
        t: "fad fa-mug",
        sT: [],
      },
      {
        t: "fad fa-mug-hot",
        sT: [],
      },
      {
        t: "fad fa-mug-marshmallows",
        sT: [],
      },
      {
        t: "fad fa-mug-tea",
        sT: [],
      },
      {
        t: "fad fa-music",
        sT: [],
      },
      {
        t: "fad fa-music-alt",
        sT: [],
      },
      {
        t: "fad fa-music-alt-slash",
        sT: [],
      },
      {
        t: "fad fa-music-slash",
        sT: [],
      },
      {
        t: "fad fa-narwhal",
        sT: [],
      },
      {
        t: "fad fa-network-wired",
        sT: [],
      },
      {
        t: "fad fa-neuter",
        sT: [],
      },
      {
        t: "fad fa-newspaper",
        sT: [],
      },
      {
        t: "fad fa-not-equal",
        sT: [],
      },
      {
        t: "fad fa-notes-medical",
        sT: [],
      },
      {
        t: "fad fa-object-group",
        sT: [],
      },
      {
        t: "fad fa-object-ungroup",
        sT: [],
      },
      {
        t: "fad fa-octagon",
        sT: [],
      },
      {
        t: "fad fa-oil-can",
        sT: [],
      },
      {
        t: "fad fa-oil-temp",
        sT: [],
      },
      {
        t: "fad fa-om",
        sT: [],
      },
      {
        t: "fad fa-omega",
        sT: [],
      },
      {
        t: "fad fa-ornament",
        sT: [],
      },
      {
        t: "fad fa-otter",
        sT: [],
      },
      {
        t: "fad fa-outdent",
        sT: [],
      },
      {
        t: "fad fa-outlet",
        sT: [],
      },
      {
        t: "fad fa-oven",
        sT: [],
      },
      {
        t: "fad fa-overline",
        sT: [],
      },
      {
        t: "fad fa-page-break",
        sT: [],
      },
      {
        t: "fad fa-pager",
        sT: [],
      },
      {
        t: "fad fa-paint-brush",
        sT: [],
      },
      {
        t: "fad fa-paint-brush-alt",
        sT: [],
      },
      {
        t: "fad fa-paint-roller",
        sT: [],
      },
      {
        t: "fad fa-palette",
        sT: [],
      },
      {
        t: "fad fa-pallet",
        sT: [],
      },
      {
        t: "fad fa-pallet-alt",
        sT: [],
      },
      {
        t: "fad fa-paper-plane",
        sT: [],
      },
      {
        t: "fad fa-paperclip",
        sT: [],
      },
      {
        t: "fad fa-parachute-box",
        sT: [],
      },
      {
        t: "fad fa-paragraph",
        sT: [],
      },
      {
        t: "fad fa-paragraph-rtl",
        sT: [],
      },
      {
        t: "fad fa-parking",
        sT: [],
      },
      {
        t: "fad fa-parking-circle",
        sT: [],
      },
      {
        t: "fad fa-parking-circle-slash",
        sT: [],
      },
      {
        t: "fad fa-parking-slash",
        sT: [],
      },
      {
        t: "fad fa-passport",
        sT: [],
      },
      {
        t: "fad fa-pastafarianism",
        sT: [],
      },
      {
        t: "fad fa-paste",
        sT: [],
      },
      {
        t: "fad fa-pause",
        sT: [],
      },
      {
        t: "fad fa-pause-circle",
        sT: [],
      },
      {
        t: "fad fa-paw",
        sT: [],
      },
      {
        t: "fad fa-paw-alt",
        sT: [],
      },
      {
        t: "fad fa-paw-claws",
        sT: [],
      },
      {
        t: "fad fa-peace",
        sT: [],
      },
      {
        t: "fad fa-pegasus",
        sT: [],
      },
      {
        t: "fad fa-pen",
        sT: [],
      },
      {
        t: "fad fa-pen-alt",
        sT: [],
      },
      {
        t: "fad fa-pen-fancy",
        sT: [],
      },
      {
        t: "fad fa-pen-nib",
        sT: [],
      },
      {
        t: "fad fa-pen-square",
        sT: [],
      },
      {
        t: "fad fa-pencil",
        sT: [],
      },
      {
        t: "fad fa-pencil-alt",
        sT: [],
      },
      {
        t: "fad fa-pencil-paintbrush",
        sT: [],
      },
      {
        t: "fad fa-pencil-ruler",
        sT: [],
      },
      {
        t: "fad fa-pennant",
        sT: [],
      },
      {
        t: "fad fa-people-arrows",
        sT: [],
      },
      {
        t: "fad fa-people-carry",
        sT: [],
      },
      {
        t: "fad fa-pepper-hot",
        sT: [],
      },
      {
        t: "fad fa-percent",
        sT: [],
      },
      {
        t: "fad fa-percentage",
        sT: [],
      },
      {
        t: "fad fa-person-booth",
        sT: [],
      },
      {
        t: "fad fa-person-carry",
        sT: [],
      },
      {
        t: "fad fa-person-dolly",
        sT: [],
      },
      {
        t: "fad fa-person-dolly-empty",
        sT: [],
      },
      {
        t: "fad fa-person-sign",
        sT: [],
      },
      {
        t: "fad fa-phone",
        sT: [],
      },
      {
        t: "fad fa-phone-alt",
        sT: [],
      },
      {
        t: "fad fa-phone-laptop",
        sT: [],
      },
      {
        t: "fad fa-phone-office",
        sT: [],
      },
      {
        t: "fad fa-phone-plus",
        sT: [],
      },
      {
        t: "fad fa-phone-rotary",
        sT: [],
      },
      {
        t: "fad fa-phone-slash",
        sT: [],
      },
      {
        t: "fad fa-phone-square",
        sT: [],
      },
      {
        t: "fad fa-phone-square-alt",
        sT: [],
      },
      {
        t: "fad fa-phone-volume",
        sT: [],
      },
      {
        t: "fad fa-photo-video",
        sT: [],
      },
      {
        t: "fad fa-pi",
        sT: [],
      },
      {
        t: "fad fa-piano",
        sT: [],
      },
      {
        t: "fad fa-piano-keyboard",
        sT: [],
      },
      {
        t: "fad fa-pie",
        sT: [],
      },
      {
        t: "fad fa-pig",
        sT: [],
      },
      {
        t: "fad fa-piggy-bank",
        sT: [],
      },
      {
        t: "fad fa-pills",
        sT: [],
      },
      {
        t: "fad fa-pizza",
        sT: [],
      },
      {
        t: "fad fa-pizza-slice",
        sT: [],
      },
      {
        t: "fad fa-place-of-worship",
        sT: [],
      },
      {
        t: "fad fa-plane",
        sT: [],
      },
      {
        t: "fad fa-plane-alt",
        sT: [],
      },
      {
        t: "fad fa-plane-arrival",
        sT: [],
      },
      {
        t: "fad fa-plane-departure",
        sT: [],
      },
      {
        t: "fad fa-plane-slash",
        sT: [],
      },
      {
        t: "fad fa-planet-moon",
        sT: [],
      },
      {
        t: "fad fa-planet-ringed",
        sT: [],
      },
      {
        t: "fad fa-play",
        sT: [],
      },
      {
        t: "fad fa-play-circle",
        sT: [],
      },
      {
        t: "fad fa-plug",
        sT: [],
      },
      {
        t: "fad fa-plus",
        sT: [],
      },
      {
        t: "fad fa-plus-circle",
        sT: [],
      },
      {
        t: "fad fa-plus-hexagon",
        sT: [],
      },
      {
        t: "fad fa-plus-octagon",
        sT: [],
      },
      {
        t: "fad fa-plus-square",
        sT: [],
      },
      {
        t: "fad fa-podcast",
        sT: [],
      },
      {
        t: "fad fa-podium",
        sT: [],
      },
      {
        t: "fad fa-podium-star",
        sT: [],
      },
      {
        t: "fad fa-police-box",
        sT: [],
      },
      {
        t: "fad fa-poll",
        sT: [],
      },
      {
        t: "fad fa-poll-h",
        sT: [],
      },
      {
        t: "fad fa-poll-people",
        sT: [],
      },
      {
        t: "fad fa-poo",
        sT: [],
      },
      {
        t: "fad fa-poo-storm",
        sT: [],
      },
      {
        t: "fad fa-poop",
        sT: [],
      },
      {
        t: "fad fa-popcorn",
        sT: [],
      },
      {
        t: "fad fa-portal-enter",
        sT: [],
      },
      {
        t: "fad fa-portal-exit",
        sT: [],
      },
      {
        t: "fad fa-portrait",
        sT: [],
      },
      {
        t: "fad fa-pound-sign",
        sT: [],
      },
      {
        t: "fad fa-power-off",
        sT: [],
      },
      {
        t: "fad fa-pray",
        sT: [],
      },
      {
        t: "fad fa-praying-hands",
        sT: [],
      },
      {
        t: "fad fa-prescription",
        sT: [],
      },
      {
        t: "fad fa-prescription-bottle",
        sT: [],
      },
      {
        t: "fad fa-prescription-bottle-alt",
        sT: [],
      },
      {
        t: "fad fa-presentation",
        sT: [],
      },
      {
        t: "fad fa-print",
        sT: [],
      },
      {
        t: "fad fa-print-search",
        sT: [],
      },
      {
        t: "fad fa-print-slash",
        sT: [],
      },
      {
        t: "fad fa-procedures",
        sT: [],
      },
      {
        t: "fad fa-project-diagram",
        sT: [],
      },
      {
        t: "fad fa-projector",
        sT: [],
      },
      {
        t: "fad fa-pump-medical",
        sT: [],
      },
      {
        t: "fad fa-pump-soap",
        sT: [],
      },
      {
        t: "fad fa-pumpkin",
        sT: [],
      },
      {
        t: "fad fa-puzzle-piece",
        sT: [],
      },
      {
        t: "fad fa-qrcode",
        sT: [],
      },
      {
        t: "fad fa-question",
        sT: [],
      },
      {
        t: "fad fa-question-circle",
        sT: [],
      },
      {
        t: "fad fa-question-square",
        sT: [],
      },
      {
        t: "fad fa-quidditch",
        sT: [],
      },
      {
        t: "fad fa-quote-left",
        sT: [],
      },
      {
        t: "fad fa-quote-right",
        sT: [],
      },
      {
        t: "fad fa-quran",
        sT: [],
      },
      {
        t: "fad fa-rabbit",
        sT: [],
      },
      {
        t: "fad fa-rabbit-fast",
        sT: [],
      },
      {
        t: "fad fa-racquet",
        sT: [],
      },
      {
        t: "fad fa-radar",
        sT: [],
      },
      {
        t: "fad fa-radiation",
        sT: [],
      },
      {
        t: "fad fa-radiation-alt",
        sT: [],
      },
      {
        t: "fad fa-radio",
        sT: [],
      },
      {
        t: "fad fa-radio-alt",
        sT: [],
      },
      {
        t: "fad fa-rainbow",
        sT: [],
      },
      {
        t: "fad fa-raindrops",
        sT: [],
      },
      {
        t: "fad fa-ram",
        sT: [],
      },
      {
        t: "fad fa-ramp-loading",
        sT: [],
      },
      {
        t: "fad fa-random",
        sT: [],
      },
      {
        t: "fad fa-raygun",
        sT: [],
      },
      {
        t: "fad fa-receipt",
        sT: [],
      },
      {
        t: "fad fa-record-vinyl",
        sT: [],
      },
      {
        t: "fad fa-rectangle-landscape",
        sT: [],
      },
      {
        t: "fad fa-rectangle-portrait",
        sT: [],
      },
      {
        t: "fad fa-rectangle-wide",
        sT: [],
      },
      {
        t: "fad fa-recycle",
        sT: [],
      },
      {
        t: "fad fa-redo",
        sT: [],
      },
      {
        t: "fad fa-redo-alt",
        sT: [],
      },
      {
        t: "fad fa-refrigerator",
        sT: [],
      },
      {
        t: "fad fa-registered",
        sT: [],
      },
      {
        t: "fad fa-remove-format",
        sT: [],
      },
      {
        t: "fad fa-repeat",
        sT: [],
      },
      {
        t: "fad fa-repeat-1",
        sT: [],
      },
      {
        t: "fad fa-repeat-1-alt",
        sT: [],
      },
      {
        t: "fad fa-repeat-alt",
        sT: [],
      },
      {
        t: "fad fa-reply",
        sT: [],
      },
      {
        t: "fad fa-reply-all",
        sT: [],
      },
      {
        t: "fad fa-republican",
        sT: [],
      },
      {
        t: "fad fa-restroom",
        sT: [],
      },
      {
        t: "fad fa-retweet",
        sT: [],
      },
      {
        t: "fad fa-retweet-alt",
        sT: [],
      },
      {
        t: "fad fa-ribbon",
        sT: [],
      },
      {
        t: "fad fa-ring",
        sT: [],
      },
      {
        t: "fad fa-rings-wedding",
        sT: [],
      },
      {
        t: "fad fa-road",
        sT: [],
      },
      {
        t: "fad fa-robot",
        sT: [],
      },
      {
        t: "fad fa-rocket",
        sT: [],
      },
      {
        t: "fad fa-rocket-launch",
        sT: [],
      },
      {
        t: "fad fa-route",
        sT: [],
      },
      {
        t: "fad fa-route-highway",
        sT: [],
      },
      {
        t: "fad fa-route-interstate",
        sT: [],
      },
      {
        t: "fad fa-router",
        sT: [],
      },
      {
        t: "fad fa-rss",
        sT: [],
      },
      {
        t: "fad fa-rss-square",
        sT: [],
      },
      {
        t: "fad fa-ruble-sign",
        sT: [],
      },
      {
        t: "fad fa-ruler",
        sT: [],
      },
      {
        t: "fad fa-ruler-combined",
        sT: [],
      },
      {
        t: "fad fa-ruler-horizontal",
        sT: [],
      },
      {
        t: "fad fa-ruler-triangle",
        sT: [],
      },
      {
        t: "fad fa-ruler-vertical",
        sT: [],
      },
      {
        t: "fad fa-running",
        sT: [],
      },
      {
        t: "fad fa-rupee-sign",
        sT: [],
      },
      {
        t: "fad fa-rv",
        sT: [],
      },
      {
        t: "fad fa-sack",
        sT: [],
      },
      {
        t: "fad fa-sack-dollar",
        sT: [],
      },
      {
        t: "fad fa-sad-cry",
        sT: [],
      },
      {
        t: "fad fa-sad-tear",
        sT: [],
      },
      {
        t: "fad fa-salad",
        sT: [],
      },
      {
        t: "fad fa-sandwich",
        sT: [],
      },
      {
        t: "fad fa-satellite",
        sT: [],
      },
      {
        t: "fad fa-satellite-dish",
        sT: [],
      },
      {
        t: "fad fa-sausage",
        sT: [],
      },
      {
        t: "fad fa-save",
        sT: [],
      },
      {
        t: "fad fa-sax-hot",
        sT: [],
      },
      {
        t: "fad fa-saxophone",
        sT: [],
      },
      {
        t: "fad fa-scalpel",
        sT: [],
      },
      {
        t: "fad fa-scalpel-path",
        sT: [],
      },
      {
        t: "fad fa-scanner",
        sT: [],
      },
      {
        t: "fad fa-scanner-image",
        sT: [],
      },
      {
        t: "fad fa-scanner-keyboard",
        sT: [],
      },
      {
        t: "fad fa-scanner-touchscreen",
        sT: [],
      },
      {
        t: "fad fa-scarecrow",
        sT: [],
      },
      {
        t: "fad fa-scarf",
        sT: [],
      },
      {
        t: "fad fa-school",
        sT: [],
      },
      {
        t: "fad fa-screwdriver",
        sT: [],
      },
      {
        t: "fad fa-scroll",
        sT: [],
      },
      {
        t: "fad fa-scroll-old",
        sT: [],
      },
      {
        t: "fad fa-scrubber",
        sT: [],
      },
      {
        t: "fad fa-scythe",
        sT: [],
      },
      {
        t: "fad fa-sd-card",
        sT: [],
      },
      {
        t: "fad fa-search",
        sT: [],
      },
      {
        t: "fad fa-search-dollar",
        sT: [],
      },
      {
        t: "fad fa-search-location",
        sT: [],
      },
      {
        t: "fad fa-search-minus",
        sT: [],
      },
      {
        t: "fad fa-search-plus",
        sT: [],
      },
      {
        t: "fad fa-seedling",
        sT: [],
      },
      {
        t: "fad fa-send-back",
        sT: [],
      },
      {
        t: "fad fa-send-backward",
        sT: [],
      },
      {
        t: "fad fa-sensor",
        sT: [],
      },
      {
        t: "fad fa-sensor-alert",
        sT: [],
      },
      {
        t: "fad fa-sensor-fire",
        sT: [],
      },
      {
        t: "fad fa-sensor-on",
        sT: [],
      },
      {
        t: "fad fa-sensor-smoke",
        sT: [],
      },
      {
        t: "fad fa-server",
        sT: [],
      },
      {
        t: "fad fa-shapes",
        sT: [],
      },
      {
        t: "fad fa-share",
        sT: [],
      },
      {
        t: "fad fa-share-all",
        sT: [],
      },
      {
        t: "fad fa-share-alt",
        sT: [],
      },
      {
        t: "fad fa-share-alt-square",
        sT: [],
      },
      {
        t: "fad fa-share-square",
        sT: [],
      },
      {
        t: "fad fa-sheep",
        sT: [],
      },
      {
        t: "fad fa-shekel-sign",
        sT: [],
      },
      {
        t: "fad fa-shield",
        sT: [],
      },
      {
        t: "fad fa-shield-alt",
        sT: [],
      },
      {
        t: "fad fa-shield-check",
        sT: [],
      },
      {
        t: "fad fa-shield-cross",
        sT: [],
      },
      {
        t: "fad fa-shield-virus",
        sT: [],
      },
      {
        t: "fad fa-ship",
        sT: [],
      },
      {
        t: "fad fa-shipping-fast",
        sT: [],
      },
      {
        t: "fad fa-shipping-timed",
        sT: [],
      },
      {
        t: "fad fa-shish-kebab",
        sT: [],
      },
      {
        t: "fad fa-shoe-prints",
        sT: [],
      },
      {
        t: "fad fa-shopping-bag",
        sT: [],
      },
      {
        t: "fad fa-shopping-basket",
        sT: [],
      },
      {
        t: "fad fa-shopping-cart",
        sT: [],
      },
      {
        t: "fad fa-shovel",
        sT: [],
      },
      {
        t: "fad fa-shovel-snow",
        sT: [],
      },
      {
        t: "fad fa-shower",
        sT: [],
      },
      {
        t: "fad fa-shredder",
        sT: [],
      },
      {
        t: "fad fa-shuttle-van",
        sT: [],
      },
      {
        t: "fad fa-shuttlecock",
        sT: [],
      },
      {
        t: "fad fa-sickle",
        sT: [],
      },
      {
        t: "fad fa-sigma",
        sT: [],
      },
      {
        t: "fad fa-sign",
        sT: [],
      },
      {
        t: "fad fa-sign-in",
        sT: [],
      },
      {
        t: "fad fa-sign-in-alt",
        sT: [],
      },
      {
        t: "fad fa-sign-language",
        sT: [],
      },
      {
        t: "fad fa-sign-out",
        sT: [],
      },
      {
        t: "fad fa-sign-out-alt",
        sT: [],
      },
      {
        t: "fad fa-signal",
        sT: [],
      },
      {
        t: "fad fa-signal-1",
        sT: [],
      },
      {
        t: "fad fa-signal-2",
        sT: [],
      },
      {
        t: "fad fa-signal-3",
        sT: [],
      },
      {
        t: "fad fa-signal-4",
        sT: [],
      },
      {
        t: "fad fa-signal-alt",
        sT: [],
      },
      {
        t: "fad fa-signal-alt-1",
        sT: [],
      },
      {
        t: "fad fa-signal-alt-2",
        sT: [],
      },
      {
        t: "fad fa-signal-alt-3",
        sT: [],
      },
      {
        t: "fad fa-signal-alt-slash",
        sT: [],
      },
      {
        t: "fad fa-signal-slash",
        sT: [],
      },
      {
        t: "fad fa-signal-stream",
        sT: [],
      },
      {
        t: "fad fa-signature",
        sT: [],
      },
      {
        t: "fad fa-sim-card",
        sT: [],
      },
      {
        t: "fad fa-sink",
        sT: [],
      },
      {
        t: "fad fa-siren",
        sT: [],
      },
      {
        t: "fad fa-siren-on",
        sT: [],
      },
      {
        t: "fad fa-sitemap",
        sT: [],
      },
      {
        t: "fad fa-skating",
        sT: [],
      },
      {
        t: "fad fa-skeleton",
        sT: [],
      },
      {
        t: "fad fa-ski-jump",
        sT: [],
      },
      {
        t: "fad fa-ski-lift",
        sT: [],
      },
      {
        t: "fad fa-skiing",
        sT: [],
      },
      {
        t: "fad fa-skiing-nordic",
        sT: [],
      },
      {
        t: "fad fa-skull",
        sT: [],
      },
      {
        t: "fad fa-skull-cow",
        sT: [],
      },
      {
        t: "fad fa-skull-crossbones",
        sT: [],
      },
      {
        t: "fad fa-slash",
        sT: [],
      },
      {
        t: "fad fa-sledding",
        sT: [],
      },
      {
        t: "fad fa-sleigh",
        sT: [],
      },
      {
        t: "fad fa-sliders-h",
        sT: [],
      },
      {
        t: "fad fa-sliders-h-square",
        sT: [],
      },
      {
        t: "fad fa-sliders-v",
        sT: [],
      },
      {
        t: "fad fa-sliders-v-square",
        sT: [],
      },
      {
        t: "fad fa-smile",
        sT: [],
      },
      {
        t: "fad fa-smile-beam",
        sT: [],
      },
      {
        t: "fad fa-smile-plus",
        sT: [],
      },
      {
        t: "fad fa-smile-wink",
        sT: [],
      },
      {
        t: "fad fa-smog",
        sT: [],
      },
      {
        t: "fad fa-smoke",
        sT: [],
      },
      {
        t: "fad fa-smoking",
        sT: [],
      },
      {
        t: "fad fa-smoking-ban",
        sT: [],
      },
      {
        t: "fad fa-sms",
        sT: [],
      },
      {
        t: "fad fa-snake",
        sT: [],
      },
      {
        t: "fad fa-snooze",
        sT: [],
      },
      {
        t: "fad fa-snow-blowing",
        sT: [],
      },
      {
        t: "fad fa-snowboarding",
        sT: [],
      },
      {
        t: "fad fa-snowflake",
        sT: [],
      },
      {
        t: "fad fa-snowflakes",
        sT: [],
      },
      {
        t: "fad fa-snowman",
        sT: [],
      },
      {
        t: "fad fa-snowmobile",
        sT: [],
      },
      {
        t: "fad fa-snowplow",
        sT: [],
      },
      {
        t: "fad fa-soap",
        sT: [],
      },
      {
        t: "fad fa-socks",
        sT: [],
      },
      {
        t: "fad fa-solar-panel",
        sT: [],
      },
      {
        t: "fad fa-solar-system",
        sT: [],
      },
      {
        t: "fad fa-sort",
        sT: [],
      },
      {
        t: "fad fa-sort-alpha-down",
        sT: [],
      },
      {
        t: "fad fa-sort-alpha-down-alt",
        sT: [],
      },
      {
        t: "fad fa-sort-alpha-up",
        sT: [],
      },
      {
        t: "fad fa-sort-alpha-up-alt",
        sT: [],
      },
      {
        t: "fad fa-sort-alt",
        sT: [],
      },
      {
        t: "fad fa-sort-amount-down",
        sT: [],
      },
      {
        t: "fad fa-sort-amount-down-alt",
        sT: [],
      },
      {
        t: "fad fa-sort-amount-up",
        sT: [],
      },
      {
        t: "fad fa-sort-amount-up-alt",
        sT: [],
      },
      {
        t: "fad fa-sort-circle",
        sT: [],
      },
      {
        t: "fad fa-sort-circle-down",
        sT: [],
      },
      {
        t: "fad fa-sort-circle-up",
        sT: [],
      },
      {
        t: "fad fa-sort-down",
        sT: [],
      },
      {
        t: "fad fa-sort-numeric-down",
        sT: [],
      },
      {
        t: "fad fa-sort-numeric-down-alt",
        sT: [],
      },
      {
        t: "fad fa-sort-numeric-up",
        sT: [],
      },
      {
        t: "fad fa-sort-numeric-up-alt",
        sT: [],
      },
      {
        t: "fad fa-sort-shapes-down",
        sT: [],
      },
      {
        t: "fad fa-sort-shapes-down-alt",
        sT: [],
      },
      {
        t: "fad fa-sort-shapes-up",
        sT: [],
      },
      {
        t: "fad fa-sort-shapes-up-alt",
        sT: [],
      },
      {
        t: "fad fa-sort-size-down",
        sT: [],
      },
      {
        t: "fad fa-sort-size-down-alt",
        sT: [],
      },
      {
        t: "fad fa-sort-size-up",
        sT: [],
      },
      {
        t: "fad fa-sort-size-up-alt",
        sT: [],
      },
      {
        t: "fad fa-sort-up",
        sT: [],
      },
      {
        t: "fad fa-soup",
        sT: [],
      },
      {
        t: "fad fa-spa",
        sT: [],
      },
      {
        t: "fad fa-space-shuttle",
        sT: [],
      },
      {
        t: "fad fa-space-station-moon",
        sT: [],
      },
      {
        t: "fad fa-space-station-moon-alt",
        sT: [],
      },
      {
        t: "fad fa-spade",
        sT: [],
      },
      {
        t: "fad fa-sparkles",
        sT: [],
      },
      {
        t: "fad fa-speaker",
        sT: [],
      },
      {
        t: "fad fa-speakers",
        sT: [],
      },
      {
        t: "fad fa-spell-check",
        sT: [],
      },
      {
        t: "fad fa-spider",
        sT: [],
      },
      {
        t: "fad fa-spider-black-widow",
        sT: [],
      },
      {
        t: "fad fa-spider-web",
        sT: [],
      },
      {
        t: "fad fa-spinner",
        sT: [],
      },
      {
        t: "fad fa-spinner-third",
        sT: [],
      },
      {
        t: "fad fa-splotch",
        sT: [],
      },
      {
        t: "fad fa-spray-can",
        sT: [],
      },
      {
        t: "fad fa-sprinkler",
        sT: [],
      },
      {
        t: "fad fa-square",
        sT: [],
      },
      {
        t: "fad fa-square-full",
        sT: [],
      },
      {
        t: "fad fa-square-root",
        sT: [],
      },
      {
        t: "fad fa-square-root-alt",
        sT: [],
      },
      {
        t: "fad fa-squirrel",
        sT: [],
      },
      {
        t: "fad fa-staff",
        sT: [],
      },
      {
        t: "fad fa-stamp",
        sT: [],
      },
      {
        t: "fad fa-star",
        sT: [],
      },
      {
        t: "fad fa-star-and-crescent",
        sT: [],
      },
      {
        t: "fad fa-star-christmas",
        sT: [],
      },
      {
        t: "fad fa-star-exclamation",
        sT: [],
      },
      {
        t: "fad fa-star-half",
        sT: [],
      },
      {
        t: "fad fa-star-half-alt",
        sT: [],
      },
      {
        t: "fad fa-star-of-david",
        sT: [],
      },
      {
        t: "fad fa-star-of-life",
        sT: [],
      },
      {
        t: "fad fa-star-shooting",
        sT: [],
      },
      {
        t: "fad fa-starfighter",
        sT: [],
      },
      {
        t: "fad fa-starfighter-alt",
        sT: [],
      },
      {
        t: "fad fa-stars",
        sT: [],
      },
      {
        t: "fad fa-starship",
        sT: [],
      },
      {
        t: "fad fa-starship-freighter",
        sT: [],
      },
      {
        t: "fad fa-steak",
        sT: [],
      },
      {
        t: "fad fa-steering-wheel",
        sT: [],
      },
      {
        t: "fad fa-step-backward",
        sT: [],
      },
      {
        t: "fad fa-step-forward",
        sT: [],
      },
      {
        t: "fad fa-stethoscope",
        sT: [],
      },
      {
        t: "fad fa-sticky-note",
        sT: [],
      },
      {
        t: "fad fa-stocking",
        sT: [],
      },
      {
        t: "fad fa-stomach",
        sT: [],
      },
      {
        t: "fad fa-stop",
        sT: [],
      },
      {
        t: "fad fa-stop-circle",
        sT: [],
      },
      {
        t: "fad fa-stopwatch",
        sT: [],
      },
      {
        t: "fad fa-stopwatch-20",
        sT: [],
      },
      {
        t: "fad fa-store",
        sT: [],
      },
      {
        t: "fad fa-store-alt",
        sT: [],
      },
      {
        t: "fad fa-store-alt-slash",
        sT: [],
      },
      {
        t: "fad fa-store-slash",
        sT: [],
      },
      {
        t: "fad fa-stream",
        sT: [],
      },
      {
        t: "fad fa-street-view",
        sT: [],
      },
      {
        t: "fad fa-stretcher",
        sT: [],
      },
      {
        t: "fad fa-strikethrough",
        sT: [],
      },
      {
        t: "fad fa-stroopwafel",
        sT: [],
      },
      {
        t: "fad fa-subscript",
        sT: [],
      },
      {
        t: "fad fa-subway",
        sT: [],
      },
      {
        t: "fad fa-suitcase",
        sT: [],
      },
      {
        t: "fad fa-suitcase-rolling",
        sT: [],
      },
      {
        t: "fad fa-sun",
        sT: [],
      },
      {
        t: "fad fa-sun-cloud",
        sT: [],
      },
      {
        t: "fad fa-sun-dust",
        sT: [],
      },
      {
        t: "fad fa-sun-haze",
        sT: [],
      },
      {
        t: "fad fa-sunglasses",
        sT: [],
      },
      {
        t: "fad fa-sunrise",
        sT: [],
      },
      {
        t: "fad fa-sunset",
        sT: [],
      },
      {
        t: "fad fa-superscript",
        sT: [],
      },
      {
        t: "fad fa-surprise",
        sT: [],
      },
      {
        t: "fad fa-swatchbook",
        sT: [],
      },
      {
        t: "fad fa-swimmer",
        sT: [],
      },
      {
        t: "fad fa-swimming-pool",
        sT: [],
      },
      {
        t: "fad fa-sword",
        sT: [],
      },
      {
        t: "fad fa-sword-laser",
        sT: [],
      },
      {
        t: "fad fa-sword-laser-alt",
        sT: [],
      },
      {
        t: "fad fa-swords",
        sT: [],
      },
      {
        t: "fad fa-swords-laser",
        sT: [],
      },
      {
        t: "fad fa-synagogue",
        sT: [],
      },
      {
        t: "fad fa-sync",
        sT: [],
      },
      {
        t: "fad fa-sync-alt",
        sT: [],
      },
      {
        t: "fad fa-syringe",
        sT: [],
      },
      {
        t: "fad fa-table",
        sT: [],
      },
      {
        t: "fad fa-table-tennis",
        sT: [],
      },
      {
        t: "fad fa-tablet",
        sT: [],
      },
      {
        t: "fad fa-tablet-alt",
        sT: [],
      },
      {
        t: "fad fa-tablet-android",
        sT: [],
      },
      {
        t: "fad fa-tablet-android-alt",
        sT: [],
      },
      {
        t: "fad fa-tablet-rugged",
        sT: [],
      },
      {
        t: "fad fa-tablets",
        sT: [],
      },
      {
        t: "fad fa-tachometer",
        sT: [],
      },
      {
        t: "fad fa-tachometer-alt",
        sT: [],
      },
      {
        t: "fad fa-tachometer-alt-average",
        sT: [],
      },
      {
        t: "fad fa-tachometer-alt-fast",
        sT: [],
      },
      {
        t: "fad fa-tachometer-alt-fastest",
        sT: [],
      },
      {
        t: "fad fa-tachometer-alt-slow",
        sT: [],
      },
      {
        t: "fad fa-tachometer-alt-slowest",
        sT: [],
      },
      {
        t: "fad fa-tachometer-average",
        sT: [],
      },
      {
        t: "fad fa-tachometer-fast",
        sT: [],
      },
      {
        t: "fad fa-tachometer-fastest",
        sT: [],
      },
      {
        t: "fad fa-tachometer-slow",
        sT: [],
      },
      {
        t: "fad fa-tachometer-slowest",
        sT: [],
      },
      {
        t: "fad fa-taco",
        sT: [],
      },
      {
        t: "fad fa-tag",
        sT: [],
      },
      {
        t: "fad fa-tags",
        sT: [],
      },
      {
        t: "fad fa-tally",
        sT: [],
      },
      {
        t: "fad fa-tanakh",
        sT: [],
      },
      {
        t: "fad fa-tape",
        sT: [],
      },
      {
        t: "fad fa-tasks",
        sT: [],
      },
      {
        t: "fad fa-tasks-alt",
        sT: [],
      },
      {
        t: "fad fa-taxi",
        sT: [],
      },
      {
        t: "fad fa-teeth",
        sT: [],
      },
      {
        t: "fad fa-teeth-open",
        sT: [],
      },
      {
        t: "fad fa-telescope",
        sT: [],
      },
      {
        t: "fad fa-temperature-down",
        sT: [],
      },
      {
        t: "fad fa-temperature-frigid",
        sT: [],
      },
      {
        t: "fad fa-temperature-high",
        sT: [],
      },
      {
        t: "fad fa-temperature-hot",
        sT: [],
      },
      {
        t: "fad fa-temperature-low",
        sT: [],
      },
      {
        t: "fad fa-temperature-up",
        sT: [],
      },
      {
        t: "fad fa-tenge",
        sT: [],
      },
      {
        t: "fad fa-tennis-ball",
        sT: [],
      },
      {
        t: "fad fa-terminal",
        sT: [],
      },
      {
        t: "fad fa-text",
        sT: [],
      },
      {
        t: "fad fa-text-height",
        sT: [],
      },
      {
        t: "fad fa-text-size",
        sT: [],
      },
      {
        t: "fad fa-text-width",
        sT: [],
      },
      {
        t: "fad fa-th",
        sT: [],
      },
      {
        t: "fad fa-th-large",
        sT: [],
      },
      {
        t: "fad fa-th-list",
        sT: [],
      },
      {
        t: "fad fa-theater-masks",
        sT: [],
      },
      {
        t: "fad fa-thermometer",
        sT: [],
      },
      {
        t: "fad fa-thermometer-empty",
        sT: [],
      },
      {
        t: "fad fa-thermometer-full",
        sT: [],
      },
      {
        t: "fad fa-thermometer-half",
        sT: [],
      },
      {
        t: "fad fa-thermometer-quarter",
        sT: [],
      },
      {
        t: "fad fa-thermometer-three-quarters",
        sT: [],
      },
      {
        t: "fad fa-theta",
        sT: [],
      },
      {
        t: "fad fa-thumbs-down",
        sT: [],
      },
      {
        t: "fad fa-thumbs-up",
        sT: [],
      },
      {
        t: "fad fa-thumbtack",
        sT: [],
      },
      {
        t: "fad fa-thunderstorm",
        sT: [],
      },
      {
        t: "fad fa-thunderstorm-moon",
        sT: [],
      },
      {
        t: "fad fa-thunderstorm-sun",
        sT: [],
      },
      {
        t: "fad fa-ticket",
        sT: [],
      },
      {
        t: "fad fa-ticket-alt",
        sT: [],
      },
      {
        t: "fad fa-tilde",
        sT: [],
      },
      {
        t: "fad fa-times",
        sT: [],
      },
      {
        t: "fad fa-times-circle",
        sT: [],
      },
      {
        t: "fad fa-times-hexagon",
        sT: [],
      },
      {
        t: "fad fa-times-octagon",
        sT: [],
      },
      {
        t: "fad fa-times-square",
        sT: [],
      },
      {
        t: "fad fa-tint",
        sT: [],
      },
      {
        t: "fad fa-tint-slash",
        sT: [],
      },
      {
        t: "fad fa-tire",
        sT: [],
      },
      {
        t: "fad fa-tire-flat",
        sT: [],
      },
      {
        t: "fad fa-tire-pressure-warning",
        sT: [],
      },
      {
        t: "fad fa-tire-rugged",
        sT: [],
      },
      {
        t: "fad fa-tired",
        sT: [],
      },
      {
        t: "fad fa-toggle-off",
        sT: [],
      },
      {
        t: "fad fa-toggle-on",
        sT: [],
      },
      {
        t: "fad fa-toilet",
        sT: [],
      },
      {
        t: "fad fa-toilet-paper",
        sT: [],
      },
      {
        t: "fad fa-toilet-paper-alt",
        sT: [],
      },
      {
        t: "fad fa-toilet-paper-slash",
        sT: [],
      },
      {
        t: "fad fa-tombstone",
        sT: [],
      },
      {
        t: "fad fa-tombstone-alt",
        sT: [],
      },
      {
        t: "fad fa-toolbox",
        sT: [],
      },
      {
        t: "fad fa-tools",
        sT: [],
      },
      {
        t: "fad fa-tooth",
        sT: [],
      },
      {
        t: "fad fa-toothbrush",
        sT: [],
      },
      {
        t: "fad fa-torah",
        sT: [],
      },
      {
        t: "fad fa-torii-gate",
        sT: [],
      },
      {
        t: "fad fa-tornado",
        sT: [],
      },
      {
        t: "fad fa-tractor",
        sT: [],
      },
      {
        t: "fad fa-trademark",
        sT: [],
      },
      {
        t: "fad fa-traffic-cone",
        sT: [],
      },
      {
        t: "fad fa-traffic-light",
        sT: [],
      },
      {
        t: "fad fa-traffic-light-go",
        sT: [],
      },
      {
        t: "fad fa-traffic-light-slow",
        sT: [],
      },
      {
        t: "fad fa-traffic-light-stop",
        sT: [],
      },
      {
        t: "fad fa-trailer",
        sT: [],
      },
      {
        t: "fad fa-train",
        sT: [],
      },
      {
        t: "fad fa-tram",
        sT: [],
      },
      {
        t: "fad fa-transgender",
        sT: [],
      },
      {
        t: "fad fa-transgender-alt",
        sT: [],
      },
      {
        t: "fad fa-transporter",
        sT: [],
      },
      {
        t: "fad fa-transporter-1",
        sT: [],
      },
      {
        t: "fad fa-transporter-2",
        sT: [],
      },
      {
        t: "fad fa-transporter-3",
        sT: [],
      },
      {
        t: "fad fa-transporter-empty",
        sT: [],
      },
      {
        t: "fad fa-trash",
        sT: [],
      },
      {
        t: "fad fa-trash-alt",
        sT: [],
      },
      {
        t: "fad fa-trash-restore",
        sT: [],
      },
      {
        t: "fad fa-trash-restore-alt",
        sT: [],
      },
      {
        t: "fad fa-trash-undo",
        sT: [],
      },
      {
        t: "fad fa-trash-undo-alt",
        sT: [],
      },
      {
        t: "fad fa-treasure-chest",
        sT: [],
      },
      {
        t: "fad fa-tree",
        sT: [],
      },
      {
        t: "fad fa-tree-alt",
        sT: [],
      },
      {
        t: "fad fa-tree-christmas",
        sT: [],
      },
      {
        t: "fad fa-tree-decorated",
        sT: [],
      },
      {
        t: "fad fa-tree-large",
        sT: [],
      },
      {
        t: "fad fa-tree-palm",
        sT: [],
      },
      {
        t: "fad fa-trees",
        sT: [],
      },
      {
        t: "fad fa-triangle",
        sT: [],
      },
      {
        t: "fad fa-triangle-music",
        sT: [],
      },
      {
        t: "fad fa-trophy",
        sT: [],
      },
      {
        t: "fad fa-trophy-alt",
        sT: [],
      },
      {
        t: "fad fa-truck",
        sT: [],
      },
      {
        t: "fad fa-truck-container",
        sT: [],
      },
      {
        t: "fad fa-truck-couch",
        sT: [],
      },
      {
        t: "fad fa-truck-loading",
        sT: [],
      },
      {
        t: "fad fa-truck-monster",
        sT: [],
      },
      {
        t: "fad fa-truck-moving",
        sT: [],
      },
      {
        t: "fad fa-truck-pickup",
        sT: [],
      },
      {
        t: "fad fa-truck-plow",
        sT: [],
      },
      {
        t: "fad fa-truck-ramp",
        sT: [],
      },
      {
        t: "fad fa-trumpet",
        sT: [],
      },
      {
        t: "fad fa-tshirt",
        sT: [],
      },
      {
        t: "fad fa-tty",
        sT: [],
      },
      {
        t: "fad fa-turkey",
        sT: [],
      },
      {
        t: "fad fa-turntable",
        sT: [],
      },
      {
        t: "fad fa-turtle",
        sT: [],
      },
      {
        t: "fad fa-tv",
        sT: [],
      },
      {
        t: "fad fa-tv-alt",
        sT: [],
      },
      {
        t: "fad fa-tv-music",
        sT: [],
      },
      {
        t: "fad fa-tv-retro",
        sT: [],
      },
      {
        t: "fad fa-typewriter",
        sT: [],
      },
      {
        t: "fad fa-ufo",
        sT: [],
      },
      {
        t: "fad fa-ufo-beam",
        sT: [],
      },
      {
        t: "fad fa-umbrella",
        sT: [],
      },
      {
        t: "fad fa-umbrella-beach",
        sT: [],
      },
      {
        t: "fad fa-underline",
        sT: [],
      },
      {
        t: "fad fa-undo",
        sT: [],
      },
      {
        t: "fad fa-undo-alt",
        sT: [],
      },
      {
        t: "fad fa-unicorn",
        sT: [],
      },
      {
        t: "fad fa-union",
        sT: [],
      },
      {
        t: "fad fa-universal-access",
        sT: [],
      },
      {
        t: "fad fa-university",
        sT: [],
      },
      {
        t: "fad fa-unlink",
        sT: [],
      },
      {
        t: "fad fa-unlock",
        sT: [],
      },
      {
        t: "fad fa-unlock-alt",
        sT: [],
      },
      {
        t: "fad fa-upload",
        sT: [],
      },
      {
        t: "fad fa-usb-drive",
        sT: [],
      },
      {
        t: "fad fa-usd-circle",
        sT: [],
      },
      {
        t: "fad fa-usd-square",
        sT: [],
      },
      {
        t: "fad fa-user",
        sT: [],
      },
      {
        t: "fad fa-user-alien",
        sT: [],
      },
      {
        t: "fad fa-user-alt",
        sT: [],
      },
      {
        t: "fad fa-user-alt-slash",
        sT: [],
      },
      {
        t: "fad fa-user-astronaut",
        sT: [],
      },
      {
        t: "fad fa-user-chart",
        sT: [],
      },
      {
        t: "fad fa-user-check",
        sT: [],
      },
      {
        t: "fad fa-user-circle",
        sT: [],
      },
      {
        t: "fad fa-user-clock",
        sT: [],
      },
      {
        t: "fad fa-user-cog",
        sT: [],
      },
      {
        t: "fad fa-user-cowboy",
        sT: [],
      },
      {
        t: "fad fa-user-crown",
        sT: [],
      },
      {
        t: "fad fa-user-edit",
        sT: [],
      },
      {
        t: "fad fa-user-friends",
        sT: [],
      },
      {
        t: "fad fa-user-graduate",
        sT: [],
      },
      {
        t: "fad fa-user-hard-hat",
        sT: [],
      },
      {
        t: "fad fa-user-headset",
        sT: [],
      },
      {
        t: "fad fa-user-injured",
        sT: [],
      },
      {
        t: "fad fa-user-lock",
        sT: [],
      },
      {
        t: "fad fa-user-md",
        sT: [],
      },
      {
        t: "fad fa-user-md-chat",
        sT: [],
      },
      {
        t: "fad fa-user-minus",
        sT: [],
      },
      {
        t: "fad fa-user-music",
        sT: [],
      },
      {
        t: "fad fa-user-ninja",
        sT: [],
      },
      {
        t: "fad fa-user-nurse",
        sT: [],
      },
      {
        t: "fad fa-user-plus",
        sT: [],
      },
      {
        t: "fad fa-user-robot",
        sT: [],
      },
      {
        t: "fad fa-user-secret",
        sT: [],
      },
      {
        t: "fad fa-user-shield",
        sT: [],
      },
      {
        t: "fad fa-user-slash",
        sT: [],
      },
      {
        t: "fad fa-user-tag",
        sT: [],
      },
      {
        t: "fad fa-user-tie",
        sT: [],
      },
      {
        t: "fad fa-user-times",
        sT: [],
      },
      {
        t: "fad fa-user-unlock",
        sT: [],
      },
      {
        t: "fad fa-user-visor",
        sT: [],
      },
      {
        t: "fad fa-users",
        sT: [],
      },
      {
        t: "fad fa-users-class",
        sT: [],
      },
      {
        t: "fad fa-users-cog",
        sT: [],
      },
      {
        t: "fad fa-users-crown",
        sT: [],
      },
      {
        t: "fad fa-users-medical",
        sT: [],
      },
      {
        t: "fad fa-users-slash",
        sT: [],
      },
      {
        t: "fad fa-utensil-fork",
        sT: [],
      },
      {
        t: "fad fa-utensil-knife",
        sT: [],
      },
      {
        t: "fad fa-utensil-spoon",
        sT: [],
      },
      {
        t: "fad fa-utensils",
        sT: [],
      },
      {
        t: "fad fa-utensils-alt",
        sT: [],
      },
      {
        t: "fad fa-vacuum",
        sT: [],
      },
      {
        t: "fad fa-vacuum-robot",
        sT: [],
      },
      {
        t: "fad fa-value-absolute",
        sT: [],
      },
      {
        t: "fad fa-vector-square",
        sT: [],
      },
      {
        t: "fad fa-venus",
        sT: [],
      },
      {
        t: "fad fa-venus-double",
        sT: [],
      },
      {
        t: "fad fa-venus-mars",
        sT: [],
      },
      {
        t: "fad fa-vest",
        sT: [],
      },
      {
        t: "fad fa-vest-patches",
        sT: [],
      },
      {
        t: "fad fa-vhs",
        sT: [],
      },
      {
        t: "fad fa-vial",
        sT: [],
      },
      {
        t: "fad fa-vials",
        sT: [],
      },
      {
        t: "fad fa-video",
        sT: [],
      },
      {
        t: "fad fa-video-plus",
        sT: [],
      },
      {
        t: "fad fa-video-slash",
        sT: [],
      },
      {
        t: "fad fa-vihara",
        sT: [],
      },
      {
        t: "fad fa-violin",
        sT: [],
      },
      {
        t: "fad fa-virus",
        sT: [],
      },
      {
        t: "fad fa-virus-slash",
        sT: [],
      },
      {
        t: "fad fa-viruses",
        sT: [],
      },
      {
        t: "fad fa-voicemail",
        sT: [],
      },
      {
        t: "fad fa-volcano",
        sT: [],
      },
      {
        t: "fad fa-volleyball-ball",
        sT: [],
      },
      {
        t: "fad fa-volume",
        sT: [],
      },
      {
        t: "fad fa-volume-down",
        sT: [],
      },
      {
        t: "fad fa-volume-mute",
        sT: [],
      },
      {
        t: "fad fa-volume-off",
        sT: [],
      },
      {
        t: "fad fa-volume-slash",
        sT: [],
      },
      {
        t: "fad fa-volume-up",
        sT: [],
      },
      {
        t: "fad fa-vote-nay",
        sT: [],
      },
      {
        t: "fad fa-vote-yea",
        sT: [],
      },
      {
        t: "fad fa-vr-cardboard",
        sT: [],
      },
      {
        t: "fad fa-wagon-covered",
        sT: [],
      },
      {
        t: "fad fa-walker",
        sT: [],
      },
      {
        t: "fad fa-walkie-talkie",
        sT: [],
      },
      {
        t: "fad fa-walking",
        sT: [],
      },
      {
        t: "fad fa-wallet",
        sT: [],
      },
      {
        t: "fad fa-wand",
        sT: [],
      },
      {
        t: "fad fa-wand-magic",
        sT: [],
      },
      {
        t: "fad fa-warehouse",
        sT: [],
      },
      {
        t: "fad fa-warehouse-alt",
        sT: [],
      },
      {
        t: "fad fa-washer",
        sT: [],
      },
      {
        t: "fad fa-watch",
        sT: [],
      },
      {
        t: "fad fa-watch-calculator",
        sT: [],
      },
      {
        t: "fad fa-watch-fitness",
        sT: [],
      },
      {
        t: "fad fa-water",
        sT: [],
      },
      {
        t: "fad fa-water-lower",
        sT: [],
      },
      {
        t: "fad fa-water-rise",
        sT: [],
      },
      {
        t: "fad fa-wave-sine",
        sT: [],
      },
      {
        t: "fad fa-wave-square",
        sT: [],
      },
      {
        t: "fad fa-wave-triangle",
        sT: [],
      },
      {
        t: "fad fa-waveform",
        sT: [],
      },
      {
        t: "fad fa-waveform-path",
        sT: [],
      },
      {
        t: "fad fa-webcam",
        sT: [],
      },
      {
        t: "fad fa-webcam-slash",
        sT: [],
      },
      {
        t: "fad fa-weight",
        sT: [],
      },
      {
        t: "fad fa-weight-hanging",
        sT: [],
      },
      {
        t: "fad fa-whale",
        sT: [],
      },
      {
        t: "fad fa-wheat",
        sT: [],
      },
      {
        t: "fad fa-wheelchair",
        sT: [],
      },
      {
        t: "fad fa-whistle",
        sT: [],
      },
      {
        t: "fad fa-wifi",
        sT: [],
      },
      {
        t: "fad fa-wifi-1",
        sT: [],
      },
      {
        t: "fad fa-wifi-2",
        sT: [],
      },
      {
        t: "fad fa-wifi-slash",
        sT: [],
      },
      {
        t: "fad fa-wind",
        sT: [],
      },
      {
        t: "fad fa-wind-turbine",
        sT: [],
      },
      {
        t: "fad fa-wind-warning",
        sT: [],
      },
      {
        t: "fad fa-window",
        sT: [],
      },
      {
        t: "fad fa-window-alt",
        sT: [],
      },
      {
        t: "fad fa-window-close",
        sT: [],
      },
      {
        t: "fad fa-window-frame",
        sT: [],
      },
      {
        t: "fad fa-window-frame-open",
        sT: [],
      },
      {
        t: "fad fa-window-maximize",
        sT: [],
      },
      {
        t: "fad fa-window-minimize",
        sT: [],
      },
      {
        t: "fad fa-window-restore",
        sT: [],
      },
      {
        t: "fad fa-windsock",
        sT: [],
      },
      {
        t: "fad fa-wine-bottle",
        sT: [],
      },
      {
        t: "fad fa-wine-glass",
        sT: [],
      },
      {
        t: "fad fa-wine-glass-alt",
        sT: [],
      },
      {
        t: "fad fa-won-sign",
        sT: [],
      },
      {
        t: "fad fa-wreath",
        sT: [],
      },
      {
        t: "fad fa-wrench",
        sT: [],
      },
      {
        t: "fad fa-x-ray",
        sT: [],
      },
      {
        t: "fad fa-yen-sign",
        sT: [],
      },
      {
        t: "fad fa-yin-yang",
        sT: [],
      },
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
