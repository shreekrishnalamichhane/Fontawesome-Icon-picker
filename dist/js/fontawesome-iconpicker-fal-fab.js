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
        t: "fal fa-abacus",
        sT: [],
      },
      {
        t: "fal fa-acorn",
        sT: [],
      },
      {
        t: "fal fa-ad",
        sT: [],
      },
      {
        t: "fal fa-address-book",
        sT: [],
      },
      {
        t: "fal fa-address-card",
        sT: [],
      },
      {
        t: "fal fa-adjust",
        sT: [],
      },
      {
        t: "fal fa-air-conditioner",
        sT: [],
      },
      {
        t: "fal fa-air-freshener",
        sT: [],
      },
      {
        t: "fal fa-alarm-clock",
        sT: [],
      },
      {
        t: "fal fa-alarm-exclamation",
        sT: [],
      },
      {
        t: "fal fa-alarm-plus",
        sT: [],
      },
      {
        t: "fal fa-alarm-snooze",
        sT: [],
      },
      {
        t: "fal fa-album",
        sT: [],
      },
      {
        t: "fal fa-album-collection",
        sT: [],
      },
      {
        t: "fal fa-alicorn",
        sT: [],
      },
      {
        t: "fal fa-alien",
        sT: [],
      },
      {
        t: "fal fa-alien-monster",
        sT: [],
      },
      {
        t: "fal fa-align-center",
        sT: [],
      },
      {
        t: "fal fa-align-justify",
        sT: [],
      },
      {
        t: "fal fa-align-left",
        sT: [],
      },
      {
        t: "fal fa-align-right",
        sT: [],
      },
      {
        t: "fal fa-align-slash",
        sT: [],
      },
      {
        t: "fal fa-allergies",
        sT: [],
      },
      {
        t: "fal fa-ambulance",
        sT: [],
      },
      {
        t: "fal fa-american-sign-language-interpreting",
        sT: [],
      },
      {
        t: "fal fa-amp-guitar",
        sT: [],
      },
      {
        t: "fal fa-analytics",
        sT: [],
      },
      {
        t: "fal fa-anchor",
        sT: [],
      },
      {
        t: "fal fa-angel",
        sT: [],
      },
      {
        t: "fal fa-angle-double-down",
        sT: [],
      },
      {
        t: "fal fa-angle-double-left",
        sT: [],
      },
      {
        t: "fal fa-angle-double-right",
        sT: [],
      },
      {
        t: "fal fa-angle-double-up",
        sT: [],
      },
      {
        t: "fal fa-angle-down",
        sT: [],
      },
      {
        t: "fal fa-angle-left",
        sT: [],
      },
      {
        t: "fal fa-angle-right",
        sT: [],
      },
      {
        t: "fal fa-angle-up",
        sT: [],
      },
      {
        t: "fal fa-angry",
        sT: [],
      },
      {
        t: "fal fa-ankh",
        sT: [],
      },
      {
        t: "fal fa-apple-alt",
        sT: [],
      },
      {
        t: "fal fa-apple-crate",
        sT: [],
      },
      {
        t: "fal fa-archive",
        sT: [],
      },
      {
        t: "fal fa-archway",
        sT: [],
      },
      {
        t: "fal fa-arrow-alt-circle-down",
        sT: [],
      },
      {
        t: "fal fa-arrow-alt-circle-left",
        sT: [],
      },
      {
        t: "fal fa-arrow-alt-circle-right",
        sT: [],
      },
      {
        t: "fal fa-arrow-alt-circle-up",
        sT: [],
      },
      {
        t: "fal fa-arrow-alt-down",
        sT: [],
      },
      {
        t: "fal fa-arrow-alt-from-bottom",
        sT: [],
      },
      {
        t: "fal fa-arrow-alt-from-left",
        sT: [],
      },
      {
        t: "fal fa-arrow-alt-from-right",
        sT: [],
      },
      {
        t: "fal fa-arrow-alt-from-top",
        sT: [],
      },
      {
        t: "fal fa-arrow-alt-left",
        sT: [],
      },
      {
        t: "fal fa-arrow-alt-right",
        sT: [],
      },
      {
        t: "fal fa-arrow-alt-square-down",
        sT: [],
      },
      {
        t: "fal fa-arrow-alt-square-left",
        sT: [],
      },
      {
        t: "fal fa-arrow-alt-square-right",
        sT: [],
      },
      {
        t: "fal fa-arrow-alt-square-up",
        sT: [],
      },
      {
        t: "fal fa-arrow-alt-to-bottom",
        sT: [],
      },
      {
        t: "fal fa-arrow-alt-to-left",
        sT: [],
      },
      {
        t: "fal fa-arrow-alt-to-right",
        sT: [],
      },
      {
        t: "fal fa-arrow-alt-to-top",
        sT: [],
      },
      {
        t: "fal fa-arrow-alt-up",
        sT: [],
      },
      {
        t: "fal fa-arrow-circle-down",
        sT: [],
      },
      {
        t: "fal fa-arrow-circle-left",
        sT: [],
      },
      {
        t: "fal fa-arrow-circle-right",
        sT: [],
      },
      {
        t: "fal fa-arrow-circle-up",
        sT: [],
      },
      {
        t: "fal fa-arrow-down",
        sT: [],
      },
      {
        t: "fal fa-arrow-from-bottom",
        sT: [],
      },
      {
        t: "fal fa-arrow-from-left",
        sT: [],
      },
      {
        t: "fal fa-arrow-from-right",
        sT: [],
      },
      {
        t: "fal fa-arrow-from-top",
        sT: [],
      },
      {
        t: "fal fa-arrow-left",
        sT: [],
      },
      {
        t: "fal fa-arrow-right",
        sT: [],
      },
      {
        t: "fal fa-arrow-square-down",
        sT: [],
      },
      {
        t: "fal fa-arrow-square-left",
        sT: [],
      },
      {
        t: "fal fa-arrow-square-right",
        sT: [],
      },
      {
        t: "fal fa-arrow-square-up",
        sT: [],
      },
      {
        t: "fal fa-arrow-to-bottom",
        sT: [],
      },
      {
        t: "fal fa-arrow-to-left",
        sT: [],
      },
      {
        t: "fal fa-arrow-to-right",
        sT: [],
      },
      {
        t: "fal fa-arrow-to-top",
        sT: [],
      },
      {
        t: "fal fa-arrow-up",
        sT: [],
      },
      {
        t: "fal fa-arrows",
        sT: [],
      },
      {
        t: "fal fa-arrows-alt",
        sT: [],
      },
      {
        t: "fal fa-arrows-alt-h",
        sT: [],
      },
      {
        t: "fal fa-arrows-alt-v",
        sT: [],
      },
      {
        t: "fal fa-arrows-h",
        sT: [],
      },
      {
        t: "fal fa-arrows-v",
        sT: [],
      },
      {
        t: "fal fa-assistive-listening-systems",
        sT: [],
      },
      {
        t: "fal fa-asterisk",
        sT: [],
      },
      {
        t: "fal fa-at",
        sT: [],
      },
      {
        t: "fal fa-atlas",
        sT: [],
      },
      {
        t: "fal fa-atom",
        sT: [],
      },
      {
        t: "fal fa-atom-alt",
        sT: [],
      },
      {
        t: "fal fa-audio-description",
        sT: [],
      },
      {
        t: "fal fa-award",
        sT: [],
      },
      {
        t: "fal fa-axe",
        sT: [],
      },
      {
        t: "fal fa-axe-battle",
        sT: [],
      },
      {
        t: "fal fa-baby",
        sT: [],
      },
      {
        t: "fal fa-baby-carriage",
        sT: [],
      },
      {
        t: "fal fa-backpack",
        sT: [],
      },
      {
        t: "fal fa-backspace",
        sT: [],
      },
      {
        t: "fal fa-backward",
        sT: [],
      },
      {
        t: "fal fa-bacon",
        sT: [],
      },
      {
        t: "fal fa-bacteria",
        sT: [],
      },
      {
        t: "fal fa-bacterium",
        sT: [],
      },
      {
        t: "fal fa-badge",
        sT: [],
      },
      {
        t: "fal fa-badge-check",
        sT: [],
      },
      {
        t: "fal fa-badge-dollar",
        sT: [],
      },
      {
        t: "fal fa-badge-percent",
        sT: [],
      },
      {
        t: "fal fa-badge-sheriff",
        sT: [],
      },
      {
        t: "fal fa-badger-honey",
        sT: [],
      },
      {
        t: "fal fa-bags-shopping",
        sT: [],
      },
      {
        t: "fal fa-bahai",
        sT: [],
      },
      {
        t: "fal fa-balance-scale",
        sT: [],
      },
      {
        t: "fal fa-balance-scale-left",
        sT: [],
      },
      {
        t: "fal fa-balance-scale-right",
        sT: [],
      },
      {
        t: "fal fa-ball-pile",
        sT: [],
      },
      {
        t: "fal fa-ballot",
        sT: [],
      },
      {
        t: "fal fa-ballot-check",
        sT: [],
      },
      {
        t: "fal fa-ban",
        sT: [],
      },
      {
        t: "fal fa-band-aid",
        sT: [],
      },
      {
        t: "fal fa-banjo",
        sT: [],
      },
      {
        t: "fal fa-barcode",
        sT: [],
      },
      {
        t: "fal fa-barcode-alt",
        sT: [],
      },
      {
        t: "fal fa-barcode-read",
        sT: [],
      },
      {
        t: "fal fa-barcode-scan",
        sT: [],
      },
      {
        t: "fal fa-bars",
        sT: [],
      },
      {
        t: "fal fa-baseball",
        sT: [],
      },
      {
        t: "fal fa-baseball-ball",
        sT: [],
      },
      {
        t: "fal fa-basketball-ball",
        sT: [],
      },
      {
        t: "fal fa-basketball-hoop",
        sT: [],
      },
      {
        t: "fal fa-bat",
        sT: [],
      },
      {
        t: "fal fa-bath",
        sT: [],
      },
      {
        t: "fal fa-battery-bolt",
        sT: [],
      },
      {
        t: "fal fa-battery-empty",
        sT: [],
      },
      {
        t: "fal fa-battery-full",
        sT: [],
      },
      {
        t: "fal fa-battery-half",
        sT: [],
      },
      {
        t: "fal fa-battery-quarter",
        sT: [],
      },
      {
        t: "fal fa-battery-slash",
        sT: [],
      },
      {
        t: "fal fa-battery-three-quarters",
        sT: [],
      },
      {
        t: "fal fa-bed",
        sT: [],
      },
      {
        t: "fal fa-bed-alt",
        sT: [],
      },
      {
        t: "fal fa-bed-bunk",
        sT: [],
      },
      {
        t: "fal fa-bed-empty",
        sT: [],
      },
      {
        t: "fal fa-beer",
        sT: [],
      },
      {
        t: "fal fa-bell",
        sT: [],
      },
      {
        t: "fal fa-bell-exclamation",
        sT: [],
      },
      {
        t: "fal fa-bell-on",
        sT: [],
      },
      {
        t: "fal fa-bell-plus",
        sT: [],
      },
      {
        t: "fal fa-bell-school",
        sT: [],
      },
      {
        t: "fal fa-bell-school-slash",
        sT: [],
      },
      {
        t: "fal fa-bell-slash",
        sT: [],
      },
      {
        t: "fal fa-bells",
        sT: [],
      },
      {
        t: "fal fa-betamax",
        sT: [],
      },
      {
        t: "fal fa-bezier-curve",
        sT: [],
      },
      {
        t: "fal fa-bible",
        sT: [],
      },
      {
        t: "fal fa-bicycle",
        sT: [],
      },
      {
        t: "fal fa-biking",
        sT: [],
      },
      {
        t: "fal fa-biking-mountain",
        sT: [],
      },
      {
        t: "fal fa-binoculars",
        sT: [],
      },
      {
        t: "fal fa-biohazard",
        sT: [],
      },
      {
        t: "fal fa-birthday-cake",
        sT: [],
      },
      {
        t: "fal fa-blanket",
        sT: [],
      },
      {
        t: "fal fa-blender",
        sT: [],
      },
      {
        t: "fal fa-blender-phone",
        sT: [],
      },
      {
        t: "fal fa-blind",
        sT: [],
      },
      {
        t: "fal fa-blinds",
        sT: [],
      },
      {
        t: "fal fa-blinds-open",
        sT: [],
      },
      {
        t: "fal fa-blinds-raised",
        sT: [],
      },
      {
        t: "fal fa-blog",
        sT: [],
      },
      {
        t: "fal fa-bold",
        sT: [],
      },
      {
        t: "fal fa-bolt",
        sT: [],
      },
      {
        t: "fal fa-bomb",
        sT: [],
      },
      {
        t: "fal fa-bone",
        sT: [],
      },
      {
        t: "fal fa-bone-break",
        sT: [],
      },
      {
        t: "fal fa-bong",
        sT: [],
      },
      {
        t: "fal fa-book",
        sT: [],
      },
      {
        t: "fal fa-book-alt",
        sT: [],
      },
      {
        t: "fal fa-book-dead",
        sT: [],
      },
      {
        t: "fal fa-book-heart",
        sT: [],
      },
      {
        t: "fal fa-book-medical",
        sT: [],
      },
      {
        t: "fal fa-book-open",
        sT: [],
      },
      {
        t: "fal fa-book-reader",
        sT: [],
      },
      {
        t: "fal fa-book-spells",
        sT: [],
      },
      {
        t: "fal fa-book-user",
        sT: [],
      },
      {
        t: "fal fa-bookmark",
        sT: [],
      },
      {
        t: "fal fa-books",
        sT: [],
      },
      {
        t: "fal fa-books-medical",
        sT: [],
      },
      {
        t: "fal fa-boombox",
        sT: [],
      },
      {
        t: "fal fa-boot",
        sT: [],
      },
      {
        t: "fal fa-booth-curtain",
        sT: [],
      },
      {
        t: "fal fa-border-all",
        sT: [],
      },
      {
        t: "fal fa-border-bottom",
        sT: [],
      },
      {
        t: "fal fa-border-center-h",
        sT: [],
      },
      {
        t: "fal fa-border-center-v",
        sT: [],
      },
      {
        t: "fal fa-border-inner",
        sT: [],
      },
      {
        t: "fal fa-border-left",
        sT: [],
      },
      {
        t: "fal fa-border-none",
        sT: [],
      },
      {
        t: "fal fa-border-outer",
        sT: [],
      },
      {
        t: "fal fa-border-right",
        sT: [],
      },
      {
        t: "fal fa-border-style",
        sT: [],
      },
      {
        t: "fal fa-border-style-alt",
        sT: [],
      },
      {
        t: "fal fa-border-top",
        sT: [],
      },
      {
        t: "fal fa-bow-arrow",
        sT: [],
      },
      {
        t: "fal fa-bowling-ball",
        sT: [],
      },
      {
        t: "fal fa-bowling-pins",
        sT: [],
      },
      {
        t: "fal fa-box",
        sT: [],
      },
      {
        t: "fal fa-box-alt",
        sT: [],
      },
      {
        t: "fal fa-box-ballot",
        sT: [],
      },
      {
        t: "fal fa-box-check",
        sT: [],
      },
      {
        t: "fal fa-box-fragile",
        sT: [],
      },
      {
        t: "fal fa-box-full",
        sT: [],
      },
      {
        t: "fal fa-box-heart",
        sT: [],
      },
      {
        t: "fal fa-box-open",
        sT: [],
      },
      {
        t: "fal fa-box-tissue",
        sT: [],
      },
      {
        t: "fal fa-box-up",
        sT: [],
      },
      {
        t: "fal fa-box-usd",
        sT: [],
      },
      {
        t: "fal fa-boxes",
        sT: [],
      },
      {
        t: "fal fa-boxes-alt",
        sT: [],
      },
      {
        t: "fal fa-boxing-glove",
        sT: [],
      },
      {
        t: "fal fa-brackets",
        sT: [],
      },
      {
        t: "fal fa-brackets-curly",
        sT: [],
      },
      {
        t: "fal fa-braille",
        sT: [],
      },
      {
        t: "fal fa-brain",
        sT: [],
      },
      {
        t: "fal fa-bread-loaf",
        sT: [],
      },
      {
        t: "fal fa-bread-slice",
        sT: [],
      },
      {
        t: "fal fa-briefcase",
        sT: [],
      },
      {
        t: "fal fa-briefcase-medical",
        sT: [],
      },
      {
        t: "fal fa-bring-forward",
        sT: [],
      },
      {
        t: "fal fa-bring-front",
        sT: [],
      },
      {
        t: "fal fa-broadcast-tower",
        sT: [],
      },
      {
        t: "fal fa-broom",
        sT: [],
      },
      {
        t: "fal fa-browser",
        sT: [],
      },
      {
        t: "fal fa-brush",
        sT: [],
      },
      {
        t: "fal fa-bug",
        sT: [],
      },
      {
        t: "fal fa-building",
        sT: [],
      },
      {
        t: "fal fa-bullhorn",
        sT: [],
      },
      {
        t: "fal fa-bullseye",
        sT: [],
      },
      {
        t: "fal fa-bullseye-arrow",
        sT: [],
      },
      {
        t: "fal fa-bullseye-pointer",
        sT: [],
      },
      {
        t: "fal fa-burger-soda",
        sT: [],
      },
      {
        t: "fal fa-burn",
        sT: [],
      },
      {
        t: "fal fa-burrito",
        sT: [],
      },
      {
        t: "fal fa-bus",
        sT: [],
      },
      {
        t: "fal fa-bus-alt",
        sT: [],
      },
      {
        t: "fal fa-bus-school",
        sT: [],
      },
      {
        t: "fal fa-business-time",
        sT: [],
      },
      {
        t: "fal fa-cabinet-filing",
        sT: [],
      },
      {
        t: "fal fa-cactus",
        sT: [],
      },
      {
        t: "fal fa-calculator",
        sT: [],
      },
      {
        t: "fal fa-calculator-alt",
        sT: [],
      },
      {
        t: "fal fa-calendar",
        sT: [],
      },
      {
        t: "fal fa-calendar-alt",
        sT: [],
      },
      {
        t: "fal fa-calendar-check",
        sT: [],
      },
      {
        t: "fal fa-calendar-day",
        sT: [],
      },
      {
        t: "fal fa-calendar-edit",
        sT: [],
      },
      {
        t: "fal fa-calendar-exclamation",
        sT: [],
      },
      {
        t: "fal fa-calendar-minus",
        sT: [],
      },
      {
        t: "fal fa-calendar-plus",
        sT: [],
      },
      {
        t: "fal fa-calendar-star",
        sT: [],
      },
      {
        t: "fal fa-calendar-times",
        sT: [],
      },
      {
        t: "fal fa-calendar-week",
        sT: [],
      },
      {
        t: "fal fa-camcorder",
        sT: [],
      },
      {
        t: "fal fa-camera",
        sT: [],
      },
      {
        t: "fal fa-camera-alt",
        sT: [],
      },
      {
        t: "fal fa-camera-home",
        sT: [],
      },
      {
        t: "fal fa-camera-movie",
        sT: [],
      },
      {
        t: "fal fa-camera-polaroid",
        sT: [],
      },
      {
        t: "fal fa-camera-retro",
        sT: [],
      },
      {
        t: "fal fa-campfire",
        sT: [],
      },
      {
        t: "fal fa-campground",
        sT: [],
      },
      {
        t: "fal fa-candle-holder",
        sT: [],
      },
      {
        t: "fal fa-candy-cane",
        sT: [],
      },
      {
        t: "fal fa-candy-corn",
        sT: [],
      },
      {
        t: "fal fa-cannabis",
        sT: [],
      },
      {
        t: "fal fa-capsules",
        sT: [],
      },
      {
        t: "fal fa-car",
        sT: [],
      },
      {
        t: "fal fa-car-alt",
        sT: [],
      },
      {
        t: "fal fa-car-battery",
        sT: [],
      },
      {
        t: "fal fa-car-building",
        sT: [],
      },
      {
        t: "fal fa-car-bump",
        sT: [],
      },
      {
        t: "fal fa-car-bus",
        sT: [],
      },
      {
        t: "fal fa-car-crash",
        sT: [],
      },
      {
        t: "fal fa-car-garage",
        sT: [],
      },
      {
        t: "fal fa-car-mechanic",
        sT: [],
      },
      {
        t: "fal fa-car-side",
        sT: [],
      },
      {
        t: "fal fa-car-tilt",
        sT: [],
      },
      {
        t: "fal fa-car-wash",
        sT: [],
      },
      {
        t: "fal fa-caravan",
        sT: [],
      },
      {
        t: "fal fa-caravan-alt",
        sT: [],
      },
      {
        t: "fal fa-caret-circle-down",
        sT: [],
      },
      {
        t: "fal fa-caret-circle-left",
        sT: [],
      },
      {
        t: "fal fa-caret-circle-right",
        sT: [],
      },
      {
        t: "fal fa-caret-circle-up",
        sT: [],
      },
      {
        t: "fal fa-caret-down",
        sT: [],
      },
      {
        t: "fal fa-caret-left",
        sT: [],
      },
      {
        t: "fal fa-caret-right",
        sT: [],
      },
      {
        t: "fal fa-caret-square-down",
        sT: [],
      },
      {
        t: "fal fa-caret-square-left",
        sT: [],
      },
      {
        t: "fal fa-caret-square-right",
        sT: [],
      },
      {
        t: "fal fa-caret-square-up",
        sT: [],
      },
      {
        t: "fal fa-caret-up",
        sT: [],
      },
      {
        t: "fal fa-carrot",
        sT: [],
      },
      {
        t: "fal fa-cars",
        sT: [],
      },
      {
        t: "fal fa-cart-arrow-down",
        sT: [],
      },
      {
        t: "fal fa-cart-plus",
        sT: [],
      },
      {
        t: "fal fa-cash-register",
        sT: [],
      },
      {
        t: "fal fa-cassette-tape",
        sT: [],
      },
      {
        t: "fal fa-cat",
        sT: [],
      },
      {
        t: "fal fa-cat-space",
        sT: [],
      },
      {
        t: "fal fa-cauldron",
        sT: [],
      },
      {
        t: "fal fa-cctv",
        sT: [],
      },
      {
        t: "fal fa-certificate",
        sT: [],
      },
      {
        t: "fal fa-chair",
        sT: [],
      },
      {
        t: "fal fa-chair-office",
        sT: [],
      },
      {
        t: "fal fa-chalkboard",
        sT: [],
      },
      {
        t: "fal fa-chalkboard-teacher",
        sT: [],
      },
      {
        t: "fal fa-charging-station",
        sT: [],
      },
      {
        t: "fal fa-chart-area",
        sT: [],
      },
      {
        t: "fal fa-chart-bar",
        sT: [],
      },
      {
        t: "fal fa-chart-line",
        sT: [],
      },
      {
        t: "fal fa-chart-line-down",
        sT: [],
      },
      {
        t: "fal fa-chart-network",
        sT: [],
      },
      {
        t: "fal fa-chart-pie",
        sT: [],
      },
      {
        t: "fal fa-chart-pie-alt",
        sT: [],
      },
      {
        t: "fal fa-chart-scatter",
        sT: [],
      },
      {
        t: "fal fa-check",
        sT: [],
      },
      {
        t: "fal fa-check-circle",
        sT: [],
      },
      {
        t: "fal fa-check-double",
        sT: [],
      },
      {
        t: "fal fa-check-square",
        sT: [],
      },
      {
        t: "fal fa-cheese",
        sT: [],
      },
      {
        t: "fal fa-cheese-swiss",
        sT: [],
      },
      {
        t: "fal fa-cheeseburger",
        sT: [],
      },
      {
        t: "fal fa-chess",
        sT: [],
      },
      {
        t: "fal fa-chess-bishop",
        sT: [],
      },
      {
        t: "fal fa-chess-bishop-alt",
        sT: [],
      },
      {
        t: "fal fa-chess-board",
        sT: [],
      },
      {
        t: "fal fa-chess-clock",
        sT: [],
      },
      {
        t: "fal fa-chess-clock-alt",
        sT: [],
      },
      {
        t: "fal fa-chess-king",
        sT: [],
      },
      {
        t: "fal fa-chess-king-alt",
        sT: [],
      },
      {
        t: "fal fa-chess-knight",
        sT: [],
      },
      {
        t: "fal fa-chess-knight-alt",
        sT: [],
      },
      {
        t: "fal fa-chess-pawn",
        sT: [],
      },
      {
        t: "fal fa-chess-pawn-alt",
        sT: [],
      },
      {
        t: "fal fa-chess-queen",
        sT: [],
      },
      {
        t: "fal fa-chess-queen-alt",
        sT: [],
      },
      {
        t: "fal fa-chess-rook",
        sT: [],
      },
      {
        t: "fal fa-chess-rook-alt",
        sT: [],
      },
      {
        t: "fal fa-chevron-circle-down",
        sT: [],
      },
      {
        t: "fal fa-chevron-circle-left",
        sT: [],
      },
      {
        t: "fal fa-chevron-circle-right",
        sT: [],
      },
      {
        t: "fal fa-chevron-circle-up",
        sT: [],
      },
      {
        t: "fal fa-chevron-double-down",
        sT: [],
      },
      {
        t: "fal fa-chevron-double-left",
        sT: [],
      },
      {
        t: "fal fa-chevron-double-right",
        sT: [],
      },
      {
        t: "fal fa-chevron-double-up",
        sT: [],
      },
      {
        t: "fal fa-chevron-down",
        sT: [],
      },
      {
        t: "fal fa-chevron-left",
        sT: [],
      },
      {
        t: "fal fa-chevron-right",
        sT: [],
      },
      {
        t: "fal fa-chevron-square-down",
        sT: [],
      },
      {
        t: "fal fa-chevron-square-left",
        sT: [],
      },
      {
        t: "fal fa-chevron-square-right",
        sT: [],
      },
      {
        t: "fal fa-chevron-square-up",
        sT: [],
      },
      {
        t: "fal fa-chevron-up",
        sT: [],
      },
      {
        t: "fal fa-child",
        sT: [],
      },
      {
        t: "fal fa-chimney",
        sT: [],
      },
      {
        t: "fal fa-church",
        sT: [],
      },
      {
        t: "fal fa-circle",
        sT: [],
      },
      {
        t: "fal fa-circle-notch",
        sT: [],
      },
      {
        t: "fal fa-city",
        sT: [],
      },
      {
        t: "fal fa-clarinet",
        sT: [],
      },
      {
        t: "fal fa-claw-marks",
        sT: [],
      },
      {
        t: "fal fa-clinic-medical",
        sT: [],
      },
      {
        t: "fal fa-clipboard",
        sT: [],
      },
      {
        t: "fal fa-clipboard-check",
        sT: [],
      },
      {
        t: "fal fa-clipboard-list",
        sT: [],
      },
      {
        t: "fal fa-clipboard-list-check",
        sT: [],
      },
      {
        t: "fal fa-clipboard-prescription",
        sT: [],
      },
      {
        t: "fal fa-clipboard-user",
        sT: [],
      },
      {
        t: "fal fa-clock",
        sT: [],
      },
      {
        t: "fal fa-clone",
        sT: [],
      },
      {
        t: "fal fa-closed-captioning",
        sT: [],
      },
      {
        t: "fal fa-cloud",
        sT: [],
      },
      {
        t: "fal fa-cloud-download",
        sT: [],
      },
      {
        t: "fal fa-cloud-download-alt",
        sT: [],
      },
      {
        t: "fal fa-cloud-drizzle",
        sT: [],
      },
      {
        t: "fal fa-cloud-hail",
        sT: [],
      },
      {
        t: "fal fa-cloud-hail-mixed",
        sT: [],
      },
      {
        t: "fal fa-cloud-meatball",
        sT: [],
      },
      {
        t: "fal fa-cloud-moon",
        sT: [],
      },
      {
        t: "fal fa-cloud-moon-rain",
        sT: [],
      },
      {
        t: "fal fa-cloud-music",
        sT: [],
      },
      {
        t: "fal fa-cloud-rain",
        sT: [],
      },
      {
        t: "fal fa-cloud-rainbow",
        sT: [],
      },
      {
        t: "fal fa-cloud-showers",
        sT: [],
      },
      {
        t: "fal fa-cloud-showers-heavy",
        sT: [],
      },
      {
        t: "fal fa-cloud-sleet",
        sT: [],
      },
      {
        t: "fal fa-cloud-snow",
        sT: [],
      },
      {
        t: "fal fa-cloud-sun",
        sT: [],
      },
      {
        t: "fal fa-cloud-sun-rain",
        sT: [],
      },
      {
        t: "fal fa-cloud-upload",
        sT: [],
      },
      {
        t: "fal fa-cloud-upload-alt",
        sT: [],
      },
      {
        t: "fal fa-clouds",
        sT: [],
      },
      {
        t: "fal fa-clouds-moon",
        sT: [],
      },
      {
        t: "fal fa-clouds-sun",
        sT: [],
      },
      {
        t: "fal fa-club",
        sT: [],
      },
      {
        t: "fal fa-cocktail",
        sT: [],
      },
      {
        t: "fal fa-code",
        sT: [],
      },
      {
        t: "fal fa-code-branch",
        sT: [],
      },
      {
        t: "fal fa-code-commit",
        sT: [],
      },
      {
        t: "fal fa-code-merge",
        sT: [],
      },
      {
        t: "fal fa-coffee",
        sT: [],
      },
      {
        t: "fal fa-coffee-pot",
        sT: [],
      },
      {
        t: "fal fa-coffee-togo",
        sT: [],
      },
      {
        t: "fal fa-coffin",
        sT: [],
      },
      {
        t: "fal fa-coffin-cross",
        sT: [],
      },
      {
        t: "fal fa-cog",
        sT: [],
      },
      {
        t: "fal fa-cogs",
        sT: [],
      },
      {
        t: "fal fa-coin",
        sT: [],
      },
      {
        t: "fal fa-coins",
        sT: [],
      },
      {
        t: "fal fa-columns",
        sT: [],
      },
      {
        t: "fal fa-comet",
        sT: [],
      },
      {
        t: "fal fa-comment",
        sT: [],
      },
      {
        t: "fal fa-comment-alt",
        sT: [],
      },
      {
        t: "fal fa-comment-alt-check",
        sT: [],
      },
      {
        t: "fal fa-comment-alt-dollar",
        sT: [],
      },
      {
        t: "fal fa-comment-alt-dots",
        sT: [],
      },
      {
        t: "fal fa-comment-alt-edit",
        sT: [],
      },
      {
        t: "fal fa-comment-alt-exclamation",
        sT: [],
      },
      {
        t: "fal fa-comment-alt-lines",
        sT: [],
      },
      {
        t: "fal fa-comment-alt-medical",
        sT: [],
      },
      {
        t: "fal fa-comment-alt-minus",
        sT: [],
      },
      {
        t: "fal fa-comment-alt-music",
        sT: [],
      },
      {
        t: "fal fa-comment-alt-plus",
        sT: [],
      },
      {
        t: "fal fa-comment-alt-slash",
        sT: [],
      },
      {
        t: "fal fa-comment-alt-smile",
        sT: [],
      },
      {
        t: "fal fa-comment-alt-times",
        sT: [],
      },
      {
        t: "fal fa-comment-check",
        sT: [],
      },
      {
        t: "fal fa-comment-dollar",
        sT: [],
      },
      {
        t: "fal fa-comment-dots",
        sT: [],
      },
      {
        t: "fal fa-comment-edit",
        sT: [],
      },
      {
        t: "fal fa-comment-exclamation",
        sT: [],
      },
      {
        t: "fal fa-comment-lines",
        sT: [],
      },
      {
        t: "fal fa-comment-medical",
        sT: [],
      },
      {
        t: "fal fa-comment-minus",
        sT: [],
      },
      {
        t: "fal fa-comment-music",
        sT: [],
      },
      {
        t: "fal fa-comment-plus",
        sT: [],
      },
      {
        t: "fal fa-comment-slash",
        sT: [],
      },
      {
        t: "fal fa-comment-smile",
        sT: [],
      },
      {
        t: "fal fa-comment-times",
        sT: [],
      },
      {
        t: "fal fa-comments",
        sT: [],
      },
      {
        t: "fal fa-comments-alt",
        sT: [],
      },
      {
        t: "fal fa-comments-alt-dollar",
        sT: [],
      },
      {
        t: "fal fa-comments-dollar",
        sT: [],
      },
      {
        t: "fal fa-compact-disc",
        sT: [],
      },
      {
        t: "fal fa-compass",
        sT: [],
      },
      {
        t: "fal fa-compass-slash",
        sT: [],
      },
      {
        t: "fal fa-compress",
        sT: [],
      },
      {
        t: "fal fa-compress-alt",
        sT: [],
      },
      {
        t: "fal fa-compress-arrows-alt",
        sT: [],
      },
      {
        t: "fal fa-compress-wide",
        sT: [],
      },
      {
        t: "fal fa-computer-classic",
        sT: [],
      },
      {
        t: "fal fa-computer-speaker",
        sT: [],
      },
      {
        t: "fal fa-concierge-bell",
        sT: [],
      },
      {
        t: "fal fa-construction",
        sT: [],
      },
      {
        t: "fal fa-container-storage",
        sT: [],
      },
      {
        t: "fal fa-conveyor-belt",
        sT: [],
      },
      {
        t: "fal fa-conveyor-belt-alt",
        sT: [],
      },
      {
        t: "fal fa-cookie",
        sT: [],
      },
      {
        t: "fal fa-cookie-bite",
        sT: [],
      },
      {
        t: "fal fa-copy",
        sT: [],
      },
      {
        t: "fal fa-copyright",
        sT: [],
      },
      {
        t: "fal fa-corn",
        sT: [],
      },
      {
        t: "fal fa-couch",
        sT: [],
      },
      {
        t: "fal fa-cow",
        sT: [],
      },
      {
        t: "fal fa-cowbell",
        sT: [],
      },
      {
        t: "fal fa-cowbell-more",
        sT: [],
      },
      {
        t: "fal fa-credit-card",
        sT: [],
      },
      {
        t: "fal fa-credit-card-blank",
        sT: [],
      },
      {
        t: "fal fa-credit-card-front",
        sT: [],
      },
      {
        t: "fal fa-cricket",
        sT: [],
      },
      {
        t: "fal fa-croissant",
        sT: [],
      },
      {
        t: "fal fa-crop",
        sT: [],
      },
      {
        t: "fal fa-crop-alt",
        sT: [],
      },
      {
        t: "fal fa-cross",
        sT: [],
      },
      {
        t: "fal fa-crosshairs",
        sT: [],
      },
      {
        t: "fal fa-crow",
        sT: [],
      },
      {
        t: "fal fa-crown",
        sT: [],
      },
      {
        t: "fal fa-crutch",
        sT: [],
      },
      {
        t: "fal fa-crutches",
        sT: [],
      },
      {
        t: "fal fa-cube",
        sT: [],
      },
      {
        t: "fal fa-cubes",
        sT: [],
      },
      {
        t: "fal fa-curling",
        sT: [],
      },
      {
        t: "fal fa-cut",
        sT: [],
      },
      {
        t: "fal fa-dagger",
        sT: [],
      },
      {
        t: "fal fa-database",
        sT: [],
      },
      {
        t: "fal fa-deaf",
        sT: [],
      },
      {
        t: "fal fa-debug",
        sT: [],
      },
      {
        t: "fal fa-deer",
        sT: [],
      },
      {
        t: "fal fa-deer-rudolph",
        sT: [],
      },
      {
        t: "fal fa-democrat",
        sT: [],
      },
      {
        t: "fal fa-desktop",
        sT: [],
      },
      {
        t: "fal fa-desktop-alt",
        sT: [],
      },
      {
        t: "fal fa-dewpoint",
        sT: [],
      },
      {
        t: "fal fa-dharmachakra",
        sT: [],
      },
      {
        t: "fal fa-diagnoses",
        sT: [],
      },
      {
        t: "fal fa-diamond",
        sT: [],
      },
      {
        t: "fal fa-dice",
        sT: [],
      },
      {
        t: "fal fa-dice-d10",
        sT: [],
      },
      {
        t: "fal fa-dice-d12",
        sT: [],
      },
      {
        t: "fal fa-dice-d20",
        sT: [],
      },
      {
        t: "fal fa-dice-d4",
        sT: [],
      },
      {
        t: "fal fa-dice-d6",
        sT: [],
      },
      {
        t: "fal fa-dice-d8",
        sT: [],
      },
      {
        t: "fal fa-dice-five",
        sT: [],
      },
      {
        t: "fal fa-dice-four",
        sT: [],
      },
      {
        t: "fal fa-dice-one",
        sT: [],
      },
      {
        t: "fal fa-dice-six",
        sT: [],
      },
      {
        t: "fal fa-dice-three",
        sT: [],
      },
      {
        t: "fal fa-dice-two",
        sT: [],
      },
      {
        t: "fal fa-digging",
        sT: [],
      },
      {
        t: "fal fa-digital-tachograph",
        sT: [],
      },
      {
        t: "fal fa-diploma",
        sT: [],
      },
      {
        t: "fal fa-directions",
        sT: [],
      },
      {
        t: "fal fa-disc-drive",
        sT: [],
      },
      {
        t: "fal fa-disease",
        sT: [],
      },
      {
        t: "fal fa-divide",
        sT: [],
      },
      {
        t: "fal fa-dizzy",
        sT: [],
      },
      {
        t: "fal fa-dna",
        sT: [],
      },
      {
        t: "fal fa-do-not-enter",
        sT: [],
      },
      {
        t: "fal fa-dog",
        sT: [],
      },
      {
        t: "fal fa-dog-leashed",
        sT: [],
      },
      {
        t: "fal fa-dollar-sign",
        sT: [],
      },
      {
        t: "fal fa-dolly",
        sT: [],
      },
      {
        t: "fal fa-dolly-empty",
        sT: [],
      },
      {
        t: "fal fa-dolly-flatbed",
        sT: [],
      },
      {
        t: "fal fa-dolly-flatbed-alt",
        sT: [],
      },
      {
        t: "fal fa-dolly-flatbed-empty",
        sT: [],
      },
      {
        t: "fal fa-donate",
        sT: [],
      },
      {
        t: "fal fa-door-closed",
        sT: [],
      },
      {
        t: "fal fa-door-open",
        sT: [],
      },
      {
        t: "fal fa-dot-circle",
        sT: [],
      },
      {
        t: "fal fa-dove",
        sT: [],
      },
      {
        t: "fal fa-download",
        sT: [],
      },
      {
        t: "fal fa-drafting-compass",
        sT: [],
      },
      {
        t: "fal fa-dragon",
        sT: [],
      },
      {
        t: "fal fa-draw-circle",
        sT: [],
      },
      {
        t: "fal fa-draw-polygon",
        sT: [],
      },
      {
        t: "fal fa-draw-square",
        sT: [],
      },
      {
        t: "fal fa-dreidel",
        sT: [],
      },
      {
        t: "fal fa-drone",
        sT: [],
      },
      {
        t: "fal fa-drone-alt",
        sT: [],
      },
      {
        t: "fal fa-drum",
        sT: [],
      },
      {
        t: "fal fa-drum-steelpan",
        sT: [],
      },
      {
        t: "fal fa-drumstick",
        sT: [],
      },
      {
        t: "fal fa-drumstick-bite",
        sT: [],
      },
      {
        t: "fal fa-dryer",
        sT: [],
      },
      {
        t: "fal fa-dryer-alt",
        sT: [],
      },
      {
        t: "fal fa-duck",
        sT: [],
      },
      {
        t: "fal fa-dumbbell",
        sT: [],
      },
      {
        t: "fal fa-dumpster",
        sT: [],
      },
      {
        t: "fal fa-dumpster-fire",
        sT: [],
      },
      {
        t: "fal fa-dungeon",
        sT: [],
      },
      {
        t: "fal fa-ear",
        sT: [],
      },
      {
        t: "fal fa-ear-muffs",
        sT: [],
      },
      {
        t: "fal fa-eclipse",
        sT: [],
      },
      {
        t: "fal fa-eclipse-alt",
        sT: [],
      },
      {
        t: "fal fa-edit",
        sT: [],
      },
      {
        t: "fal fa-egg",
        sT: [],
      },
      {
        t: "fal fa-egg-fried",
        sT: [],
      },
      {
        t: "fal fa-eject",
        sT: [],
      },
      {
        t: "fal fa-elephant",
        sT: [],
      },
      {
        t: "fal fa-ellipsis-h",
        sT: [],
      },
      {
        t: "fal fa-ellipsis-h-alt",
        sT: [],
      },
      {
        t: "fal fa-ellipsis-v",
        sT: [],
      },
      {
        t: "fal fa-ellipsis-v-alt",
        sT: [],
      },
      {
        t: "fal fa-empty-set",
        sT: [],
      },
      {
        t: "fal fa-engine-warning",
        sT: [],
      },
      {
        t: "fal fa-envelope",
        sT: [],
      },
      {
        t: "fal fa-envelope-open",
        sT: [],
      },
      {
        t: "fal fa-envelope-open-dollar",
        sT: [],
      },
      {
        t: "fal fa-envelope-open-text",
        sT: [],
      },
      {
        t: "fal fa-envelope-square",
        sT: [],
      },
      {
        t: "fal fa-equals",
        sT: [],
      },
      {
        t: "fal fa-eraser",
        sT: [],
      },
      {
        t: "fal fa-ethernet",
        sT: [],
      },
      {
        t: "fal fa-euro-sign",
        sT: [],
      },
      {
        t: "fal fa-exchange",
        sT: [],
      },
      {
        t: "fal fa-exchange-alt",
        sT: [],
      },
      {
        t: "fal fa-exclamation",
        sT: [],
      },
      {
        t: "fal fa-exclamation-circle",
        sT: [],
      },
      {
        t: "fal fa-exclamation-square",
        sT: [],
      },
      {
        t: "fal fa-exclamation-triangle",
        sT: [],
      },
      {
        t: "fal fa-expand",
        sT: [],
      },
      {
        t: "fal fa-expand-alt",
        sT: [],
      },
      {
        t: "fal fa-expand-arrows",
        sT: [],
      },
      {
        t: "fal fa-expand-arrows-alt",
        sT: [],
      },
      {
        t: "fal fa-expand-wide",
        sT: [],
      },
      {
        t: "fal fa-external-link",
        sT: [],
      },
      {
        t: "fal fa-external-link-alt",
        sT: [],
      },
      {
        t: "fal fa-external-link-square",
        sT: [],
      },
      {
        t: "fal fa-external-link-square-alt",
        sT: [],
      },
      {
        t: "fal fa-eye",
        sT: [],
      },
      {
        t: "fal fa-eye-dropper",
        sT: [],
      },
      {
        t: "fal fa-eye-evil",
        sT: [],
      },
      {
        t: "fal fa-eye-slash",
        sT: [],
      },
      {
        t: "fal fa-fan",
        sT: [],
      },
      {
        t: "fal fa-fan-table",
        sT: [],
      },
      {
        t: "fal fa-farm",
        sT: [],
      },
      {
        t: "fal fa-fast-backward",
        sT: [],
      },
      {
        t: "fal fa-fast-forward",
        sT: [],
      },
      {
        t: "fal fa-faucet",
        sT: [],
      },
      {
        t: "fal fa-faucet-drip",
        sT: [],
      },
      {
        t: "fal fa-fax",
        sT: [],
      },
      {
        t: "fal fa-feather",
        sT: [],
      },
      {
        t: "fal fa-feather-alt",
        sT: [],
      },
      {
        t: "fal fa-female",
        sT: [],
      },
      {
        t: "fal fa-field-hockey",
        sT: [],
      },
      {
        t: "fal fa-fighter-jet",
        sT: [],
      },
      {
        t: "fal fa-file",
        sT: [],
      },
      {
        t: "fal fa-file-alt",
        sT: [],
      },
      {
        t: "fal fa-file-archive",
        sT: [],
      },
      {
        t: "fal fa-file-audio",
        sT: [],
      },
      {
        t: "fal fa-file-certificate",
        sT: [],
      },
      {
        t: "fal fa-file-chart-line",
        sT: [],
      },
      {
        t: "fal fa-file-chart-pie",
        sT: [],
      },
      {
        t: "fal fa-file-check",
        sT: [],
      },
      {
        t: "fal fa-file-code",
        sT: [],
      },
      {
        t: "fal fa-file-contract",
        sT: [],
      },
      {
        t: "fal fa-file-csv",
        sT: [],
      },
      {
        t: "fal fa-file-download",
        sT: [],
      },
      {
        t: "fal fa-file-edit",
        sT: [],
      },
      {
        t: "fal fa-file-excel",
        sT: [],
      },
      {
        t: "fal fa-file-exclamation",
        sT: [],
      },
      {
        t: "fal fa-file-export",
        sT: [],
      },
      {
        t: "fal fa-file-image",
        sT: [],
      },
      {
        t: "fal fa-file-import",
        sT: [],
      },
      {
        t: "fal fa-file-invoice",
        sT: [],
      },
      {
        t: "fal fa-file-invoice-dollar",
        sT: [],
      },
      {
        t: "fal fa-file-medical",
        sT: [],
      },
      {
        t: "fal fa-file-medical-alt",
        sT: [],
      },
      {
        t: "fal fa-file-minus",
        sT: [],
      },
      {
        t: "fal fa-file-music",
        sT: [],
      },
      {
        t: "fal fa-file-pdf",
        sT: [],
      },
      {
        t: "fal fa-file-plus",
        sT: [],
      },
      {
        t: "fal fa-file-powerpoint",
        sT: [],
      },
      {
        t: "fal fa-file-prescription",
        sT: [],
      },
      {
        t: "fal fa-file-search",
        sT: [],
      },
      {
        t: "fal fa-file-signature",
        sT: [],
      },
      {
        t: "fal fa-file-spreadsheet",
        sT: [],
      },
      {
        t: "fal fa-file-times",
        sT: [],
      },
      {
        t: "fal fa-file-upload",
        sT: [],
      },
      {
        t: "fal fa-file-user",
        sT: [],
      },
      {
        t: "fal fa-file-video",
        sT: [],
      },
      {
        t: "fal fa-file-word",
        sT: [],
      },
      {
        t: "fal fa-files-medical",
        sT: [],
      },
      {
        t: "fal fa-fill",
        sT: [],
      },
      {
        t: "fal fa-fill-drip",
        sT: [],
      },
      {
        t: "fal fa-film",
        sT: [],
      },
      {
        t: "fal fa-film-alt",
        sT: [],
      },
      {
        t: "fal fa-film-canister",
        sT: [],
      },
      {
        t: "fal fa-filter",
        sT: [],
      },
      {
        t: "fal fa-fingerprint",
        sT: [],
      },
      {
        t: "fal fa-fire",
        sT: [],
      },
      {
        t: "fal fa-fire-alt",
        sT: [],
      },
      {
        t: "fal fa-fire-extinguisher",
        sT: [],
      },
      {
        t: "fal fa-fire-smoke",
        sT: [],
      },
      {
        t: "fal fa-fireplace",
        sT: [],
      },
      {
        t: "fal fa-first-aid",
        sT: [],
      },
      {
        t: "fal fa-fish",
        sT: [],
      },
      {
        t: "fal fa-fish-cooked",
        sT: [],
      },
      {
        t: "fal fa-fist-raised",
        sT: [],
      },
      {
        t: "fal fa-flag",
        sT: [],
      },
      {
        t: "fal fa-flag-alt",
        sT: [],
      },
      {
        t: "fal fa-flag-checkered",
        sT: [],
      },
      {
        t: "fal fa-flag-usa",
        sT: [],
      },
      {
        t: "fal fa-flame",
        sT: [],
      },
      {
        t: "fal fa-flashlight",
        sT: [],
      },
      {
        t: "fal fa-flask",
        sT: [],
      },
      {
        t: "fal fa-flask-poison",
        sT: [],
      },
      {
        t: "fal fa-flask-potion",
        sT: [],
      },
      {
        t: "fal fa-flower",
        sT: [],
      },
      {
        t: "fal fa-flower-daffodil",
        sT: [],
      },
      {
        t: "fal fa-flower-tulip",
        sT: [],
      },
      {
        t: "fal fa-flushed",
        sT: [],
      },
      {
        t: "fal fa-flute",
        sT: [],
      },
      {
        t: "fal fa-flux-capacitor",
        sT: [],
      },
      {
        t: "fal fa-fog",
        sT: [],
      },
      {
        t: "fal fa-folder",
        sT: [],
      },
      {
        t: "fal fa-folder-download",
        sT: [],
      },
      {
        t: "fal fa-folder-minus",
        sT: [],
      },
      {
        t: "fal fa-folder-open",
        sT: [],
      },
      {
        t: "fal fa-folder-plus",
        sT: [],
      },
      {
        t: "fal fa-folder-times",
        sT: [],
      },
      {
        t: "fal fa-folder-tree",
        sT: [],
      },
      {
        t: "fal fa-folder-upload",
        sT: [],
      },
      {
        t: "fal fa-folders",
        sT: [],
      },
      {
        t: "fal fa-font",
        sT: [],
      },
      {
        t: "fal fa-font-case",
        sT: [],
      },
      {
        t: "fal fa-football-ball",
        sT: [],
      },
      {
        t: "fal fa-football-helmet",
        sT: [],
      },
      {
        t: "fal fa-forklift",
        sT: [],
      },
      {
        t: "fal fa-forward",
        sT: [],
      },
      {
        t: "fal fa-fragile",
        sT: [],
      },
      {
        t: "fal fa-french-fries",
        sT: [],
      },
      {
        t: "fal fa-frog",
        sT: [],
      },
      {
        t: "fal fa-frosty-head",
        sT: [],
      },
      {
        t: "fal fa-frown",
        sT: [],
      },
      {
        t: "fal fa-frown-open",
        sT: [],
      },
      {
        t: "fal fa-function",
        sT: [],
      },
      {
        t: "fal fa-funnel-dollar",
        sT: [],
      },
      {
        t: "fal fa-futbol",
        sT: [],
      },
      {
        t: "fal fa-galaxy",
        sT: [],
      },
      {
        t: "fal fa-game-board",
        sT: [],
      },
      {
        t: "fal fa-game-board-alt",
        sT: [],
      },
      {
        t: "fal fa-game-console-handheld",
        sT: [],
      },
      {
        t: "fal fa-gamepad",
        sT: [],
      },
      {
        t: "fal fa-gamepad-alt",
        sT: [],
      },
      {
        t: "fal fa-garage",
        sT: [],
      },
      {
        t: "fal fa-garage-car",
        sT: [],
      },
      {
        t: "fal fa-garage-open",
        sT: [],
      },
      {
        t: "fal fa-gas-pump",
        sT: [],
      },
      {
        t: "fal fa-gas-pump-slash",
        sT: [],
      },
      {
        t: "fal fa-gavel",
        sT: [],
      },
      {
        t: "fal fa-gem",
        sT: [],
      },
      {
        t: "fal fa-genderless",
        sT: [],
      },
      {
        t: "fal fa-ghost",
        sT: [],
      },
      {
        t: "fal fa-gift",
        sT: [],
      },
      {
        t: "fal fa-gift-card",
        sT: [],
      },
      {
        t: "fal fa-gifts",
        sT: [],
      },
      {
        t: "fal fa-gingerbread-man",
        sT: [],
      },
      {
        t: "fal fa-glass",
        sT: [],
      },
      {
        t: "fal fa-glass-champagne",
        sT: [],
      },
      {
        t: "fal fa-glass-cheers",
        sT: [],
      },
      {
        t: "fal fa-glass-citrus",
        sT: [],
      },
      {
        t: "fal fa-glass-martini",
        sT: [],
      },
      {
        t: "fal fa-glass-martini-alt",
        sT: [],
      },
      {
        t: "fal fa-glass-whiskey",
        sT: [],
      },
      {
        t: "fal fa-glass-whiskey-rocks",
        sT: [],
      },
      {
        t: "fal fa-glasses",
        sT: [],
      },
      {
        t: "fal fa-glasses-alt",
        sT: [],
      },
      {
        t: "fal fa-globe",
        sT: [],
      },
      {
        t: "fal fa-globe-africa",
        sT: [],
      },
      {
        t: "fal fa-globe-americas",
        sT: [],
      },
      {
        t: "fal fa-globe-asia",
        sT: [],
      },
      {
        t: "fal fa-globe-europe",
        sT: [],
      },
      {
        t: "fal fa-globe-snow",
        sT: [],
      },
      {
        t: "fal fa-globe-stand",
        sT: [],
      },
      {
        t: "fal fa-golf-ball",
        sT: [],
      },
      {
        t: "fal fa-golf-club",
        sT: [],
      },
      {
        t: "fal fa-gopuram",
        sT: [],
      },
      {
        t: "fal fa-graduation-cap",
        sT: [],
      },
      {
        t: "fal fa-gramophone",
        sT: [],
      },
      {
        t: "fal fa-greater-than",
        sT: [],
      },
      {
        t: "fal fa-greater-than-equal",
        sT: [],
      },
      {
        t: "fal fa-grimace",
        sT: [],
      },
      {
        t: "fal fa-grin",
        sT: [],
      },
      {
        t: "fal fa-grin-alt",
        sT: [],
      },
      {
        t: "fal fa-grin-beam",
        sT: [],
      },
      {
        t: "fal fa-grin-beam-sweat",
        sT: [],
      },
      {
        t: "fal fa-grin-hearts",
        sT: [],
      },
      {
        t: "fal fa-grin-squint",
        sT: [],
      },
      {
        t: "fal fa-grin-squint-tears",
        sT: [],
      },
      {
        t: "fal fa-grin-stars",
        sT: [],
      },
      {
        t: "fal fa-grin-tears",
        sT: [],
      },
      {
        t: "fal fa-grin-tongue",
        sT: [],
      },
      {
        t: "fal fa-grin-tongue-squint",
        sT: [],
      },
      {
        t: "fal fa-grin-tongue-wink",
        sT: [],
      },
      {
        t: "fal fa-grin-wink",
        sT: [],
      },
      {
        t: "fal fa-grip-horizontal",
        sT: [],
      },
      {
        t: "fal fa-grip-lines",
        sT: [],
      },
      {
        t: "fal fa-grip-lines-vertical",
        sT: [],
      },
      {
        t: "fal fa-grip-vertical",
        sT: [],
      },
      {
        t: "fal fa-guitar",
        sT: [],
      },
      {
        t: "fal fa-guitar-electric",
        sT: [],
      },
      {
        t: "fal fa-guitars",
        sT: [],
      },
      {
        t: "fal fa-h-square",
        sT: [],
      },
      {
        t: "fal fa-h1",
        sT: [],
      },
      {
        t: "fal fa-h2",
        sT: [],
      },
      {
        t: "fal fa-h3",
        sT: [],
      },
      {
        t: "fal fa-h4",
        sT: [],
      },
      {
        t: "fal fa-hamburger",
        sT: [],
      },
      {
        t: "fal fa-hammer",
        sT: [],
      },
      {
        t: "fal fa-hammer-war",
        sT: [],
      },
      {
        t: "fal fa-hamsa",
        sT: [],
      },
      {
        t: "fal fa-hand-heart",
        sT: [],
      },
      {
        t: "fal fa-hand-holding",
        sT: [],
      },
      {
        t: "fal fa-hand-holding-box",
        sT: [],
      },
      {
        t: "fal fa-hand-holding-heart",
        sT: [],
      },
      {
        t: "fal fa-hand-holding-magic",
        sT: [],
      },
      {
        t: "fal fa-hand-holding-medical",
        sT: [],
      },
      {
        t: "fal fa-hand-holding-seedling",
        sT: [],
      },
      {
        t: "fal fa-hand-holding-usd",
        sT: [],
      },
      {
        t: "fal fa-hand-holding-water",
        sT: [],
      },
      {
        t: "fal fa-hand-lizard",
        sT: [],
      },
      {
        t: "fal fa-hand-middle-finger",
        sT: [],
      },
      {
        t: "fal fa-hand-paper",
        sT: [],
      },
      {
        t: "fal fa-hand-peace",
        sT: [],
      },
      {
        t: "fal fa-hand-point-down",
        sT: [],
      },
      {
        t: "fal fa-hand-point-left",
        sT: [],
      },
      {
        t: "fal fa-hand-point-right",
        sT: [],
      },
      {
        t: "fal fa-hand-point-up",
        sT: [],
      },
      {
        t: "fal fa-hand-pointer",
        sT: [],
      },
      {
        t: "fal fa-hand-receiving",
        sT: [],
      },
      {
        t: "fal fa-hand-rock",
        sT: [],
      },
      {
        t: "fal fa-hand-scissors",
        sT: [],
      },
      {
        t: "fal fa-hand-sparkles",
        sT: [],
      },
      {
        t: "fal fa-hand-spock",
        sT: [],
      },
      {
        t: "fal fa-hands",
        sT: [],
      },
      {
        t: "fal fa-hands-heart",
        sT: [],
      },
      {
        t: "fal fa-hands-helping",
        sT: [],
      },
      {
        t: "fal fa-hands-usd",
        sT: [],
      },
      {
        t: "fal fa-hands-wash",
        sT: [],
      },
      {
        t: "fal fa-handshake",
        sT: [],
      },
      {
        t: "fal fa-handshake-alt",
        sT: [],
      },
      {
        t: "fal fa-handshake-alt-slash",
        sT: [],
      },
      {
        t: "fal fa-handshake-slash",
        sT: [],
      },
      {
        t: "fal fa-hanukiah",
        sT: [],
      },
      {
        t: "fal fa-hard-hat",
        sT: [],
      },
      {
        t: "fal fa-hashtag",
        sT: [],
      },
      {
        t: "fal fa-hat-chef",
        sT: [],
      },
      {
        t: "fal fa-hat-cowboy",
        sT: [],
      },
      {
        t: "fal fa-hat-cowboy-side",
        sT: [],
      },
      {
        t: "fal fa-hat-santa",
        sT: [],
      },
      {
        t: "fal fa-hat-winter",
        sT: [],
      },
      {
        t: "fal fa-hat-witch",
        sT: [],
      },
      {
        t: "fal fa-hat-wizard",
        sT: [],
      },
      {
        t: "fal fa-hdd",
        sT: [],
      },
      {
        t: "fal fa-head-side",
        sT: [],
      },
      {
        t: "fal fa-head-side-brain",
        sT: [],
      },
      {
        t: "fal fa-head-side-cough",
        sT: [],
      },
      {
        t: "fal fa-head-side-cough-slash",
        sT: [],
      },
      {
        t: "fal fa-head-side-headphones",
        sT: [],
      },
      {
        t: "fal fa-head-side-mask",
        sT: [],
      },
      {
        t: "fal fa-head-side-medical",
        sT: [],
      },
      {
        t: "fal fa-head-side-virus",
        sT: [],
      },
      {
        t: "fal fa-head-vr",
        sT: [],
      },
      {
        t: "fal fa-heading",
        sT: [],
      },
      {
        t: "fal fa-headphones",
        sT: [],
      },
      {
        t: "fal fa-headphones-alt",
        sT: [],
      },
      {
        t: "fal fa-headset",
        sT: [],
      },
      {
        t: "fal fa-heart",
        sT: [],
      },
      {
        t: "fal fa-heart-broken",
        sT: [],
      },
      {
        t: "fal fa-heart-circle",
        sT: [],
      },
      {
        t: "fal fa-heart-rate",
        sT: [],
      },
      {
        t: "fal fa-heart-square",
        sT: [],
      },
      {
        t: "fal fa-heartbeat",
        sT: [],
      },
      {
        t: "fal fa-heat",
        sT: [],
      },
      {
        t: "fal fa-helicopter",
        sT: [],
      },
      {
        t: "fal fa-helmet-battle",
        sT: [],
      },
      {
        t: "fal fa-hexagon",
        sT: [],
      },
      {
        t: "fal fa-highlighter",
        sT: [],
      },
      {
        t: "fal fa-hiking",
        sT: [],
      },
      {
        t: "fal fa-hippo",
        sT: [],
      },
      {
        t: "fal fa-history",
        sT: [],
      },
      {
        t: "fal fa-hockey-mask",
        sT: [],
      },
      {
        t: "fal fa-hockey-puck",
        sT: [],
      },
      {
        t: "fal fa-hockey-sticks",
        sT: [],
      },
      {
        t: "fal fa-holly-berry",
        sT: [],
      },
      {
        t: "fal fa-home",
        sT: [],
      },
      {
        t: "fal fa-home-alt",
        sT: [],
      },
      {
        t: "fal fa-home-heart",
        sT: [],
      },
      {
        t: "fal fa-home-lg",
        sT: [],
      },
      {
        t: "fal fa-home-lg-alt",
        sT: [],
      },
      {
        t: "fal fa-hood-cloak",
        sT: [],
      },
      {
        t: "fal fa-horizontal-rule",
        sT: [],
      },
      {
        t: "fal fa-horse",
        sT: [],
      },
      {
        t: "fal fa-horse-head",
        sT: [],
      },
      {
        t: "fal fa-horse-saddle",
        sT: [],
      },
      {
        t: "fal fa-hospital",
        sT: [],
      },
      {
        t: "fal fa-hospital-alt",
        sT: [],
      },
      {
        t: "fal fa-hospital-symbol",
        sT: [],
      },
      {
        t: "fal fa-hospital-user",
        sT: [],
      },
      {
        t: "fal fa-hospitals",
        sT: [],
      },
      {
        t: "fal fa-hot-tub",
        sT: [],
      },
      {
        t: "fal fa-hotdog",
        sT: [],
      },
      {
        t: "fal fa-hotel",
        sT: [],
      },
      {
        t: "fal fa-hourglass",
        sT: [],
      },
      {
        t: "fal fa-hourglass-end",
        sT: [],
      },
      {
        t: "fal fa-hourglass-half",
        sT: [],
      },
      {
        t: "fal fa-hourglass-start",
        sT: [],
      },
      {
        t: "fal fa-house",
        sT: [],
      },
      {
        t: "fal fa-house-damage",
        sT: [],
      },
      {
        t: "fal fa-house-day",
        sT: [],
      },
      {
        t: "fal fa-house-flood",
        sT: [],
      },
      {
        t: "fal fa-house-leave",
        sT: [],
      },
      {
        t: "fal fa-house-night",
        sT: [],
      },
      {
        t: "fal fa-house-return",
        sT: [],
      },
      {
        t: "fal fa-house-signal",
        sT: [],
      },
      {
        t: "fal fa-house-user",
        sT: [],
      },
      {
        t: "fal fa-hryvnia",
        sT: [],
      },
      {
        t: "fal fa-humidity",
        sT: [],
      },
      {
        t: "fal fa-hurricane",
        sT: [],
      },
      {
        t: "fal fa-i-cursor",
        sT: [],
      },
      {
        t: "fal fa-ice-cream",
        sT: [],
      },
      {
        t: "fal fa-ice-skate",
        sT: [],
      },
      {
        t: "fal fa-icicles",
        sT: [],
      },
      {
        t: "fal fa-icons",
        sT: [],
      },
      {
        t: "fal fa-icons-alt",
        sT: [],
      },
      {
        t: "fal fa-id-badge",
        sT: [],
      },
      {
        t: "fal fa-id-card",
        sT: [],
      },
      {
        t: "fal fa-id-card-alt",
        sT: [],
      },
      {
        t: "fal fa-igloo",
        sT: [],
      },
      {
        t: "fal fa-image",
        sT: [],
      },
      {
        t: "fal fa-image-polaroid",
        sT: [],
      },
      {
        t: "fal fa-images",
        sT: [],
      },
      {
        t: "fal fa-inbox",
        sT: [],
      },
      {
        t: "fal fa-inbox-in",
        sT: [],
      },
      {
        t: "fal fa-inbox-out",
        sT: [],
      },
      {
        t: "fal fa-indent",
        sT: [],
      },
      {
        t: "fal fa-industry",
        sT: [],
      },
      {
        t: "fal fa-industry-alt",
        sT: [],
      },
      {
        t: "fal fa-infinity",
        sT: [],
      },
      {
        t: "fal fa-info",
        sT: [],
      },
      {
        t: "fal fa-info-circle",
        sT: [],
      },
      {
        t: "fal fa-info-square",
        sT: [],
      },
      {
        t: "fal fa-inhaler",
        sT: [],
      },
      {
        t: "fal fa-integral",
        sT: [],
      },
      {
        t: "fal fa-intersection",
        sT: [],
      },
      {
        t: "fal fa-inventory",
        sT: [],
      },
      {
        t: "fal fa-island-tropical",
        sT: [],
      },
      {
        t: "fal fa-italic",
        sT: [],
      },
      {
        t: "fal fa-jack-o-lantern",
        sT: [],
      },
      {
        t: "fal fa-jedi",
        sT: [],
      },
      {
        t: "fal fa-joint",
        sT: [],
      },
      {
        t: "fal fa-journal-whills",
        sT: [],
      },
      {
        t: "fal fa-joystick",
        sT: [],
      },
      {
        t: "fal fa-jug",
        sT: [],
      },
      {
        t: "fal fa-kaaba",
        sT: [],
      },
      {
        t: "fal fa-kazoo",
        sT: [],
      },
      {
        t: "fal fa-kerning",
        sT: [],
      },
      {
        t: "fal fa-key",
        sT: [],
      },
      {
        t: "fal fa-key-skeleton",
        sT: [],
      },
      {
        t: "fal fa-keyboard",
        sT: [],
      },
      {
        t: "fal fa-keynote",
        sT: [],
      },
      {
        t: "fal fa-khanda",
        sT: [],
      },
      {
        t: "fal fa-kidneys",
        sT: [],
      },
      {
        t: "fal fa-kiss",
        sT: [],
      },
      {
        t: "fal fa-kiss-beam",
        sT: [],
      },
      {
        t: "fal fa-kiss-wink-heart",
        sT: [],
      },
      {
        t: "fal fa-kite",
        sT: [],
      },
      {
        t: "fal fa-kiwi-bird",
        sT: [],
      },
      {
        t: "fal fa-knife-kitchen",
        sT: [],
      },
      {
        t: "fal fa-lambda",
        sT: [],
      },
      {
        t: "fal fa-lamp",
        sT: [],
      },
      {
        t: "fal fa-lamp-desk",
        sT: [],
      },
      {
        t: "fal fa-lamp-floor",
        sT: [],
      },
      {
        t: "fal fa-landmark",
        sT: [],
      },
      {
        t: "fal fa-landmark-alt",
        sT: [],
      },
      {
        t: "fal fa-language",
        sT: [],
      },
      {
        t: "fal fa-laptop",
        sT: [],
      },
      {
        t: "fal fa-laptop-code",
        sT: [],
      },
      {
        t: "fal fa-laptop-house",
        sT: [],
      },
      {
        t: "fal fa-laptop-medical",
        sT: [],
      },
      {
        t: "fal fa-lasso",
        sT: [],
      },
      {
        t: "fal fa-laugh",
        sT: [],
      },
      {
        t: "fal fa-laugh-beam",
        sT: [],
      },
      {
        t: "fal fa-laugh-squint",
        sT: [],
      },
      {
        t: "fal fa-laugh-wink",
        sT: [],
      },
      {
        t: "fal fa-layer-group",
        sT: [],
      },
      {
        t: "fal fa-layer-minus",
        sT: [],
      },
      {
        t: "fal fa-layer-plus",
        sT: [],
      },
      {
        t: "fal fa-leaf",
        sT: [],
      },
      {
        t: "fal fa-leaf-heart",
        sT: [],
      },
      {
        t: "fal fa-leaf-maple",
        sT: [],
      },
      {
        t: "fal fa-leaf-oak",
        sT: [],
      },
      {
        t: "fal fa-lemon",
        sT: [],
      },
      {
        t: "fal fa-less-than",
        sT: [],
      },
      {
        t: "fal fa-less-than-equal",
        sT: [],
      },
      {
        t: "fal fa-level-down",
        sT: [],
      },
      {
        t: "fal fa-level-down-alt",
        sT: [],
      },
      {
        t: "fal fa-level-up",
        sT: [],
      },
      {
        t: "fal fa-level-up-alt",
        sT: [],
      },
      {
        t: "fal fa-life-ring",
        sT: [],
      },
      {
        t: "fal fa-light-ceiling",
        sT: [],
      },
      {
        t: "fal fa-light-switch",
        sT: [],
      },
      {
        t: "fal fa-light-switch-off",
        sT: [],
      },
      {
        t: "fal fa-light-switch-on",
        sT: [],
      },
      {
        t: "fal fa-lightbulb",
        sT: [],
      },
      {
        t: "fal fa-lightbulb-dollar",
        sT: [],
      },
      {
        t: "fal fa-lightbulb-exclamation",
        sT: [],
      },
      {
        t: "fal fa-lightbulb-on",
        sT: [],
      },
      {
        t: "fal fa-lightbulb-slash",
        sT: [],
      },
      {
        t: "fal fa-lights-holiday",
        sT: [],
      },
      {
        t: "fal fa-line-columns",
        sT: [],
      },
      {
        t: "fal fa-line-height",
        sT: [],
      },
      {
        t: "fal fa-link",
        sT: [],
      },
      {
        t: "fal fa-lips",
        sT: [],
      },
      {
        t: "fal fa-lira-sign",
        sT: [],
      },
      {
        t: "fal fa-list",
        sT: [],
      },
      {
        t: "fal fa-list-alt",
        sT: [],
      },
      {
        t: "fal fa-list-music",
        sT: [],
      },
      {
        t: "fal fa-list-ol",
        sT: [],
      },
      {
        t: "fal fa-list-ul",
        sT: [],
      },
      {
        t: "fal fa-location",
        sT: [],
      },
      {
        t: "fal fa-location-arrow",
        sT: [],
      },
      {
        t: "fal fa-location-circle",
        sT: [],
      },
      {
        t: "fal fa-location-slash",
        sT: [],
      },
      {
        t: "fal fa-lock",
        sT: [],
      },
      {
        t: "fal fa-lock-alt",
        sT: [],
      },
      {
        t: "fal fa-lock-open",
        sT: [],
      },
      {
        t: "fal fa-lock-open-alt",
        sT: [],
      },
      {
        t: "fal fa-long-arrow-alt-down",
        sT: [],
      },
      {
        t: "fal fa-long-arrow-alt-left",
        sT: [],
      },
      {
        t: "fal fa-long-arrow-alt-right",
        sT: [],
      },
      {
        t: "fal fa-long-arrow-alt-up",
        sT: [],
      },
      {
        t: "fal fa-long-arrow-down",
        sT: [],
      },
      {
        t: "fal fa-long-arrow-left",
        sT: [],
      },
      {
        t: "fal fa-long-arrow-right",
        sT: [],
      },
      {
        t: "fal fa-long-arrow-up",
        sT: [],
      },
      {
        t: "fal fa-loveseat",
        sT: [],
      },
      {
        t: "fal fa-low-vision",
        sT: [],
      },
      {
        t: "fal fa-luchador",
        sT: [],
      },
      {
        t: "fal fa-luggage-cart",
        sT: [],
      },
      {
        t: "fal fa-lungs",
        sT: [],
      },
      {
        t: "fal fa-lungs-virus",
        sT: [],
      },
      {
        t: "fal fa-mace",
        sT: [],
      },
      {
        t: "fal fa-magic",
        sT: [],
      },
      {
        t: "fal fa-magnet",
        sT: [],
      },
      {
        t: "fal fa-mail-bulk",
        sT: [],
      },
      {
        t: "fal fa-mailbox",
        sT: [],
      },
      {
        t: "fal fa-male",
        sT: [],
      },
      {
        t: "fal fa-mandolin",
        sT: [],
      },
      {
        t: "fal fa-map",
        sT: [],
      },
      {
        t: "fal fa-map-marked",
        sT: [],
      },
      {
        t: "fal fa-map-marked-alt",
        sT: [],
      },
      {
        t: "fal fa-map-marker",
        sT: [],
      },
      {
        t: "fal fa-map-marker-alt",
        sT: [],
      },
      {
        t: "fal fa-map-marker-alt-slash",
        sT: [],
      },
      {
        t: "fal fa-map-marker-check",
        sT: [],
      },
      {
        t: "fal fa-map-marker-edit",
        sT: [],
      },
      {
        t: "fal fa-map-marker-exclamation",
        sT: [],
      },
      {
        t: "fal fa-map-marker-minus",
        sT: [],
      },
      {
        t: "fal fa-map-marker-plus",
        sT: [],
      },
      {
        t: "fal fa-map-marker-question",
        sT: [],
      },
      {
        t: "fal fa-map-marker-slash",
        sT: [],
      },
      {
        t: "fal fa-map-marker-smile",
        sT: [],
      },
      {
        t: "fal fa-map-marker-times",
        sT: [],
      },
      {
        t: "fal fa-map-pin",
        sT: [],
      },
      {
        t: "fal fa-map-signs",
        sT: [],
      },
      {
        t: "fal fa-marker",
        sT: [],
      },
      {
        t: "fal fa-mars",
        sT: [],
      },
      {
        t: "fal fa-mars-double",
        sT: [],
      },
      {
        t: "fal fa-mars-stroke",
        sT: [],
      },
      {
        t: "fal fa-mars-stroke-h",
        sT: [],
      },
      {
        t: "fal fa-mars-stroke-v",
        sT: [],
      },
      {
        t: "fal fa-mask",
        sT: [],
      },
      {
        t: "fal fa-meat",
        sT: [],
      },
      {
        t: "fal fa-medal",
        sT: [],
      },
      {
        t: "fal fa-medkit",
        sT: [],
      },
      {
        t: "fal fa-megaphone",
        sT: [],
      },
      {
        t: "fal fa-meh",
        sT: [],
      },
      {
        t: "fal fa-meh-blank",
        sT: [],
      },
      {
        t: "fal fa-meh-rolling-eyes",
        sT: [],
      },
      {
        t: "fal fa-memory",
        sT: [],
      },
      {
        t: "fal fa-menorah",
        sT: [],
      },
      {
        t: "fal fa-mercury",
        sT: [],
      },
      {
        t: "fal fa-meteor",
        sT: [],
      },
      {
        t: "fal fa-microchip",
        sT: [],
      },
      {
        t: "fal fa-microphone",
        sT: [],
      },
      {
        t: "fal fa-microphone-alt",
        sT: [],
      },
      {
        t: "fal fa-microphone-alt-slash",
        sT: [],
      },
      {
        t: "fal fa-microphone-slash",
        sT: [],
      },
      {
        t: "fal fa-microphone-stand",
        sT: [],
      },
      {
        t: "fal fa-microscope",
        sT: [],
      },
      {
        t: "fal fa-microwave",
        sT: [],
      },
      {
        t: "fal fa-mind-share",
        sT: [],
      },
      {
        t: "fal fa-minus",
        sT: [],
      },
      {
        t: "fal fa-minus-circle",
        sT: [],
      },
      {
        t: "fal fa-minus-hexagon",
        sT: [],
      },
      {
        t: "fal fa-minus-octagon",
        sT: [],
      },
      {
        t: "fal fa-minus-square",
        sT: [],
      },
      {
        t: "fal fa-mistletoe",
        sT: [],
      },
      {
        t: "fal fa-mitten",
        sT: [],
      },
      {
        t: "fal fa-mobile",
        sT: [],
      },
      {
        t: "fal fa-mobile-alt",
        sT: [],
      },
      {
        t: "fal fa-mobile-android",
        sT: [],
      },
      {
        t: "fal fa-mobile-android-alt",
        sT: [],
      },
      {
        t: "fal fa-money-bill",
        sT: [],
      },
      {
        t: "fal fa-money-bill-alt",
        sT: [],
      },
      {
        t: "fal fa-money-bill-wave",
        sT: [],
      },
      {
        t: "fal fa-money-bill-wave-alt",
        sT: [],
      },
      {
        t: "fal fa-money-check",
        sT: [],
      },
      {
        t: "fal fa-money-check-alt",
        sT: [],
      },
      {
        t: "fal fa-money-check-edit",
        sT: [],
      },
      {
        t: "fal fa-money-check-edit-alt",
        sT: [],
      },
      {
        t: "fal fa-monitor-heart-rate",
        sT: [],
      },
      {
        t: "fal fa-monkey",
        sT: [],
      },
      {
        t: "fal fa-monument",
        sT: [],
      },
      {
        t: "fal fa-moon",
        sT: [],
      },
      {
        t: "fal fa-moon-cloud",
        sT: [],
      },
      {
        t: "fal fa-moon-stars",
        sT: [],
      },
      {
        t: "fal fa-mortar-pestle",
        sT: [],
      },
      {
        t: "fal fa-mosque",
        sT: [],
      },
      {
        t: "fal fa-motorcycle",
        sT: [],
      },
      {
        t: "fal fa-mountain",
        sT: [],
      },
      {
        t: "fal fa-mountains",
        sT: [],
      },
      {
        t: "fal fa-mouse",
        sT: [],
      },
      {
        t: "fal fa-mouse-alt",
        sT: [],
      },
      {
        t: "fal fa-mouse-pointer",
        sT: [],
      },
      {
        t: "fal fa-mp3-player",
        sT: [],
      },
      {
        t: "fal fa-mug",
        sT: [],
      },
      {
        t: "fal fa-mug-hot",
        sT: [],
      },
      {
        t: "fal fa-mug-marshmallows",
        sT: [],
      },
      {
        t: "fal fa-mug-tea",
        sT: [],
      },
      {
        t: "fal fa-music",
        sT: [],
      },
      {
        t: "fal fa-music-alt",
        sT: [],
      },
      {
        t: "fal fa-music-alt-slash",
        sT: [],
      },
      {
        t: "fal fa-music-slash",
        sT: [],
      },
      {
        t: "fal fa-narwhal",
        sT: [],
      },
      {
        t: "fal fa-network-wired",
        sT: [],
      },
      {
        t: "fal fa-neuter",
        sT: [],
      },
      {
        t: "fal fa-newspaper",
        sT: [],
      },
      {
        t: "fal fa-not-equal",
        sT: [],
      },
      {
        t: "fal fa-notes-medical",
        sT: [],
      },
      {
        t: "fal fa-object-group",
        sT: [],
      },
      {
        t: "fal fa-object-ungroup",
        sT: [],
      },
      {
        t: "fal fa-octagon",
        sT: [],
      },
      {
        t: "fal fa-oil-can",
        sT: [],
      },
      {
        t: "fal fa-oil-temp",
        sT: [],
      },
      {
        t: "fal fa-om",
        sT: [],
      },
      {
        t: "fal fa-omega",
        sT: [],
      },
      {
        t: "fal fa-ornament",
        sT: [],
      },
      {
        t: "fal fa-otter",
        sT: [],
      },
      {
        t: "fal fa-outdent",
        sT: [],
      },
      {
        t: "fal fa-outlet",
        sT: [],
      },
      {
        t: "fal fa-oven",
        sT: [],
      },
      {
        t: "fal fa-overline",
        sT: [],
      },
      {
        t: "fal fa-page-break",
        sT: [],
      },
      {
        t: "fal fa-pager",
        sT: [],
      },
      {
        t: "fal fa-paint-brush",
        sT: [],
      },
      {
        t: "fal fa-paint-brush-alt",
        sT: [],
      },
      {
        t: "fal fa-paint-roller",
        sT: [],
      },
      {
        t: "fal fa-palette",
        sT: [],
      },
      {
        t: "fal fa-pallet",
        sT: [],
      },
      {
        t: "fal fa-pallet-alt",
        sT: [],
      },
      {
        t: "fal fa-paper-plane",
        sT: [],
      },
      {
        t: "fal fa-paperclip",
        sT: [],
      },
      {
        t: "fal fa-parachute-box",
        sT: [],
      },
      {
        t: "fal fa-paragraph",
        sT: [],
      },
      {
        t: "fal fa-paragraph-rtl",
        sT: [],
      },
      {
        t: "fal fa-parking",
        sT: [],
      },
      {
        t: "fal fa-parking-circle",
        sT: [],
      },
      {
        t: "fal fa-parking-circle-slash",
        sT: [],
      },
      {
        t: "fal fa-parking-slash",
        sT: [],
      },
      {
        t: "fal fa-passport",
        sT: [],
      },
      {
        t: "fal fa-pastafarianism",
        sT: [],
      },
      {
        t: "fal fa-paste",
        sT: [],
      },
      {
        t: "fal fa-pause",
        sT: [],
      },
      {
        t: "fal fa-pause-circle",
        sT: [],
      },
      {
        t: "fal fa-paw",
        sT: [],
      },
      {
        t: "fal fa-paw-alt",
        sT: [],
      },
      {
        t: "fal fa-paw-claws",
        sT: [],
      },
      {
        t: "fal fa-peace",
        sT: [],
      },
      {
        t: "fal fa-pegasus",
        sT: [],
      },
      {
        t: "fal fa-pen",
        sT: [],
      },
      {
        t: "fal fa-pen-alt",
        sT: [],
      },
      {
        t: "fal fa-pen-fancy",
        sT: [],
      },
      {
        t: "fal fa-pen-nib",
        sT: [],
      },
      {
        t: "fal fa-pen-square",
        sT: [],
      },
      {
        t: "fal fa-pencil",
        sT: [],
      },
      {
        t: "fal fa-pencil-alt",
        sT: [],
      },
      {
        t: "fal fa-pencil-paintbrush",
        sT: [],
      },
      {
        t: "fal fa-pencil-ruler",
        sT: [],
      },
      {
        t: "fal fa-pennant",
        sT: [],
      },
      {
        t: "fal fa-people-arrows",
        sT: [],
      },
      {
        t: "fal fa-people-carry",
        sT: [],
      },
      {
        t: "fal fa-pepper-hot",
        sT: [],
      },
      {
        t: "fal fa-percent",
        sT: [],
      },
      {
        t: "fal fa-percentage",
        sT: [],
      },
      {
        t: "fal fa-person-booth",
        sT: [],
      },
      {
        t: "fal fa-person-carry",
        sT: [],
      },
      {
        t: "fal fa-person-dolly",
        sT: [],
      },
      {
        t: "fal fa-person-dolly-empty",
        sT: [],
      },
      {
        t: "fal fa-person-sign",
        sT: [],
      },
      {
        t: "fal fa-phone",
        sT: [],
      },
      {
        t: "fal fa-phone-alt",
        sT: [],
      },
      {
        t: "fal fa-phone-laptop",
        sT: [],
      },
      {
        t: "fal fa-phone-office",
        sT: [],
      },
      {
        t: "fal fa-phone-plus",
        sT: [],
      },
      {
        t: "fal fa-phone-rotary",
        sT: [],
      },
      {
        t: "fal fa-phone-slash",
        sT: [],
      },
      {
        t: "fal fa-phone-square",
        sT: [],
      },
      {
        t: "fal fa-phone-square-alt",
        sT: [],
      },
      {
        t: "fal fa-phone-volume",
        sT: [],
      },
      {
        t: "fal fa-photo-video",
        sT: [],
      },
      {
        t: "fal fa-pi",
        sT: [],
      },
      {
        t: "fal fa-piano",
        sT: [],
      },
      {
        t: "fal fa-piano-keyboard",
        sT: [],
      },
      {
        t: "fal fa-pie",
        sT: [],
      },
      {
        t: "fal fa-pig",
        sT: [],
      },
      {
        t: "fal fa-piggy-bank",
        sT: [],
      },
      {
        t: "fal fa-pills",
        sT: [],
      },
      {
        t: "fal fa-pizza",
        sT: [],
      },
      {
        t: "fal fa-pizza-slice",
        sT: [],
      },
      {
        t: "fal fa-place-of-worship",
        sT: [],
      },
      {
        t: "fal fa-plane",
        sT: [],
      },
      {
        t: "fal fa-plane-alt",
        sT: [],
      },
      {
        t: "fal fa-plane-arrival",
        sT: [],
      },
      {
        t: "fal fa-plane-departure",
        sT: [],
      },
      {
        t: "fal fa-plane-slash",
        sT: [],
      },
      {
        t: "fal fa-planet-moon",
        sT: [],
      },
      {
        t: "fal fa-planet-ringed",
        sT: [],
      },
      {
        t: "fal fa-play",
        sT: [],
      },
      {
        t: "fal fa-play-circle",
        sT: [],
      },
      {
        t: "fal fa-plug",
        sT: [],
      },
      {
        t: "fal fa-plus",
        sT: [],
      },
      {
        t: "fal fa-plus-circle",
        sT: [],
      },
      {
        t: "fal fa-plus-hexagon",
        sT: [],
      },
      {
        t: "fal fa-plus-octagon",
        sT: [],
      },
      {
        t: "fal fa-plus-square",
        sT: [],
      },
      {
        t: "fal fa-podcast",
        sT: [],
      },
      {
        t: "fal fa-podium",
        sT: [],
      },
      {
        t: "fal fa-podium-star",
        sT: [],
      },
      {
        t: "fal fa-police-box",
        sT: [],
      },
      {
        t: "fal fa-poll",
        sT: [],
      },
      {
        t: "fal fa-poll-h",
        sT: [],
      },
      {
        t: "fal fa-poll-people",
        sT: [],
      },
      {
        t: "fal fa-poo",
        sT: [],
      },
      {
        t: "fal fa-poo-storm",
        sT: [],
      },
      {
        t: "fal fa-poop",
        sT: [],
      },
      {
        t: "fal fa-popcorn",
        sT: [],
      },
      {
        t: "fal fa-portal-enter",
        sT: [],
      },
      {
        t: "fal fa-portal-exit",
        sT: [],
      },
      {
        t: "fal fa-portrait",
        sT: [],
      },
      {
        t: "fal fa-pound-sign",
        sT: [],
      },
      {
        t: "fal fa-power-off",
        sT: [],
      },
      {
        t: "fal fa-pray",
        sT: [],
      },
      {
        t: "fal fa-praying-hands",
        sT: [],
      },
      {
        t: "fal fa-prescription",
        sT: [],
      },
      {
        t: "fal fa-prescription-bottle",
        sT: [],
      },
      {
        t: "fal fa-prescription-bottle-alt",
        sT: [],
      },
      {
        t: "fal fa-presentation",
        sT: [],
      },
      {
        t: "fal fa-print",
        sT: [],
      },
      {
        t: "fal fa-print-search",
        sT: [],
      },
      {
        t: "fal fa-print-slash",
        sT: [],
      },
      {
        t: "fal fa-procedures",
        sT: [],
      },
      {
        t: "fal fa-project-diagram",
        sT: [],
      },
      {
        t: "fal fa-projector",
        sT: [],
      },
      {
        t: "fal fa-pump-medical",
        sT: [],
      },
      {
        t: "fal fa-pump-soap",
        sT: [],
      },
      {
        t: "fal fa-pumpkin",
        sT: [],
      },
      {
        t: "fal fa-puzzle-piece",
        sT: [],
      },
      {
        t: "fal fa-qrcode",
        sT: [],
      },
      {
        t: "fal fa-question",
        sT: [],
      },
      {
        t: "fal fa-question-circle",
        sT: [],
      },
      {
        t: "fal fa-question-square",
        sT: [],
      },
      {
        t: "fal fa-quidditch",
        sT: [],
      },
      {
        t: "fal fa-quote-left",
        sT: [],
      },
      {
        t: "fal fa-quote-right",
        sT: [],
      },
      {
        t: "fal fa-quran",
        sT: [],
      },
      {
        t: "fal fa-rabbit",
        sT: [],
      },
      {
        t: "fal fa-rabbit-fast",
        sT: [],
      },
      {
        t: "fal fa-racquet",
        sT: [],
      },
      {
        t: "fal fa-radar",
        sT: [],
      },
      {
        t: "fal fa-radiation",
        sT: [],
      },
      {
        t: "fal fa-radiation-alt",
        sT: [],
      },
      {
        t: "fal fa-radio",
        sT: [],
      },
      {
        t: "fal fa-radio-alt",
        sT: [],
      },
      {
        t: "fal fa-rainbow",
        sT: [],
      },
      {
        t: "fal fa-raindrops",
        sT: [],
      },
      {
        t: "fal fa-ram",
        sT: [],
      },
      {
        t: "fal fa-ramp-loading",
        sT: [],
      },
      {
        t: "fal fa-random",
        sT: [],
      },
      {
        t: "fal fa-raygun",
        sT: [],
      },
      {
        t: "fal fa-receipt",
        sT: [],
      },
      {
        t: "fal fa-record-vinyl",
        sT: [],
      },
      {
        t: "fal fa-rectangle-landscape",
        sT: [],
      },
      {
        t: "fal fa-rectangle-portrait",
        sT: [],
      },
      {
        t: "fal fa-rectangle-wide",
        sT: [],
      },
      {
        t: "fal fa-recycle",
        sT: [],
      },
      {
        t: "fal fa-redo",
        sT: [],
      },
      {
        t: "fal fa-redo-alt",
        sT: [],
      },
      {
        t: "fal fa-refrigerator",
        sT: [],
      },
      {
        t: "fal fa-registered",
        sT: [],
      },
      {
        t: "fal fa-remove-format",
        sT: [],
      },
      {
        t: "fal fa-repeat",
        sT: [],
      },
      {
        t: "fal fa-repeat-1",
        sT: [],
      },
      {
        t: "fal fa-repeat-1-alt",
        sT: [],
      },
      {
        t: "fal fa-repeat-alt",
        sT: [],
      },
      {
        t: "fal fa-reply",
        sT: [],
      },
      {
        t: "fal fa-reply-all",
        sT: [],
      },
      {
        t: "fal fa-republican",
        sT: [],
      },
      {
        t: "fal fa-restroom",
        sT: [],
      },
      {
        t: "fal fa-retweet",
        sT: [],
      },
      {
        t: "fal fa-retweet-alt",
        sT: [],
      },
      {
        t: "fal fa-ribbon",
        sT: [],
      },
      {
        t: "fal fa-ring",
        sT: [],
      },
      {
        t: "fal fa-rings-wedding",
        sT: [],
      },
      {
        t: "fal fa-road",
        sT: [],
      },
      {
        t: "fal fa-robot",
        sT: [],
      },
      {
        t: "fal fa-rocket",
        sT: [],
      },
      {
        t: "fal fa-rocket-launch",
        sT: [],
      },
      {
        t: "fal fa-route",
        sT: [],
      },
      {
        t: "fal fa-route-highway",
        sT: [],
      },
      {
        t: "fal fa-route-interstate",
        sT: [],
      },
      {
        t: "fal fa-router",
        sT: [],
      },
      {
        t: "fal fa-rss",
        sT: [],
      },
      {
        t: "fal fa-rss-square",
        sT: [],
      },
      {
        t: "fal fa-ruble-sign",
        sT: [],
      },
      {
        t: "fal fa-ruler",
        sT: [],
      },
      {
        t: "fal fa-ruler-combined",
        sT: [],
      },
      {
        t: "fal fa-ruler-horizontal",
        sT: [],
      },
      {
        t: "fal fa-ruler-triangle",
        sT: [],
      },
      {
        t: "fal fa-ruler-vertical",
        sT: [],
      },
      {
        t: "fal fa-running",
        sT: [],
      },
      {
        t: "fal fa-rupee-sign",
        sT: [],
      },
      {
        t: "fal fa-rv",
        sT: [],
      },
      {
        t: "fal fa-sack",
        sT: [],
      },
      {
        t: "fal fa-sack-dollar",
        sT: [],
      },
      {
        t: "fal fa-sad-cry",
        sT: [],
      },
      {
        t: "fal fa-sad-tear",
        sT: [],
      },
      {
        t: "fal fa-salad",
        sT: [],
      },
      {
        t: "fal fa-sandwich",
        sT: [],
      },
      {
        t: "fal fa-satellite",
        sT: [],
      },
      {
        t: "fal fa-satellite-dish",
        sT: [],
      },
      {
        t: "fal fa-sausage",
        sT: [],
      },
      {
        t: "fal fa-save",
        sT: [],
      },
      {
        t: "fal fa-sax-hot",
        sT: [],
      },
      {
        t: "fal fa-saxophone",
        sT: [],
      },
      {
        t: "fal fa-scalpel",
        sT: [],
      },
      {
        t: "fal fa-scalpel-path",
        sT: [],
      },
      {
        t: "fal fa-scanner",
        sT: [],
      },
      {
        t: "fal fa-scanner-image",
        sT: [],
      },
      {
        t: "fal fa-scanner-keyboard",
        sT: [],
      },
      {
        t: "fal fa-scanner-touchscreen",
        sT: [],
      },
      {
        t: "fal fa-scarecrow",
        sT: [],
      },
      {
        t: "fal fa-scarf",
        sT: [],
      },
      {
        t: "fal fa-school",
        sT: [],
      },
      {
        t: "fal fa-screwdriver",
        sT: [],
      },
      {
        t: "fal fa-scroll",
        sT: [],
      },
      {
        t: "fal fa-scroll-old",
        sT: [],
      },
      {
        t: "fal fa-scrubber",
        sT: [],
      },
      {
        t: "fal fa-scythe",
        sT: [],
      },
      {
        t: "fal fa-sd-card",
        sT: [],
      },
      {
        t: "fal fa-search",
        sT: [],
      },
      {
        t: "fal fa-search-dollar",
        sT: [],
      },
      {
        t: "fal fa-search-location",
        sT: [],
      },
      {
        t: "fal fa-search-minus",
        sT: [],
      },
      {
        t: "fal fa-search-plus",
        sT: [],
      },
      {
        t: "fal fa-seedling",
        sT: [],
      },
      {
        t: "fal fa-send-back",
        sT: [],
      },
      {
        t: "fal fa-send-backward",
        sT: [],
      },
      {
        t: "fal fa-sensor",
        sT: [],
      },
      {
        t: "fal fa-sensor-alert",
        sT: [],
      },
      {
        t: "fal fa-sensor-fire",
        sT: [],
      },
      {
        t: "fal fa-sensor-on",
        sT: [],
      },
      {
        t: "fal fa-sensor-smoke",
        sT: [],
      },
      {
        t: "fal fa-server",
        sT: [],
      },
      {
        t: "fal fa-shapes",
        sT: [],
      },
      {
        t: "fal fa-share",
        sT: [],
      },
      {
        t: "fal fa-share-all",
        sT: [],
      },
      {
        t: "fal fa-share-alt",
        sT: [],
      },
      {
        t: "fal fa-share-alt-square",
        sT: [],
      },
      {
        t: "fal fa-share-square",
        sT: [],
      },
      {
        t: "fal fa-sheep",
        sT: [],
      },
      {
        t: "fal fa-shekel-sign",
        sT: [],
      },
      {
        t: "fal fa-shield",
        sT: [],
      },
      {
        t: "fal fa-shield-alt",
        sT: [],
      },
      {
        t: "fal fa-shield-check",
        sT: [],
      },
      {
        t: "fal fa-shield-cross",
        sT: [],
      },
      {
        t: "fal fa-shield-virus",
        sT: [],
      },
      {
        t: "fal fa-ship",
        sT: [],
      },
      {
        t: "fal fa-shipping-fast",
        sT: [],
      },
      {
        t: "fal fa-shipping-timed",
        sT: [],
      },
      {
        t: "fal fa-shish-kebab",
        sT: [],
      },
      {
        t: "fal fa-shoe-prints",
        sT: [],
      },
      {
        t: "fal fa-shopping-bag",
        sT: [],
      },
      {
        t: "fal fa-shopping-basket",
        sT: [],
      },
      {
        t: "fal fa-shopping-cart",
        sT: [],
      },
      {
        t: "fal fa-shovel",
        sT: [],
      },
      {
        t: "fal fa-shovel-snow",
        sT: [],
      },
      {
        t: "fal fa-shower",
        sT: [],
      },
      {
        t: "fal fa-shredder",
        sT: [],
      },
      {
        t: "fal fa-shuttle-van",
        sT: [],
      },
      {
        t: "fal fa-shuttlecock",
        sT: [],
      },
      {
        t: "fal fa-sickle",
        sT: [],
      },
      {
        t: "fal fa-sigma",
        sT: [],
      },
      {
        t: "fal fa-sign",
        sT: [],
      },
      {
        t: "fal fa-sign-in",
        sT: [],
      },
      {
        t: "fal fa-sign-in-alt",
        sT: [],
      },
      {
        t: "fal fa-sign-language",
        sT: [],
      },
      {
        t: "fal fa-sign-out",
        sT: [],
      },
      {
        t: "fal fa-sign-out-alt",
        sT: [],
      },
      {
        t: "fal fa-signal",
        sT: [],
      },
      {
        t: "fal fa-signal-1",
        sT: [],
      },
      {
        t: "fal fa-signal-2",
        sT: [],
      },
      {
        t: "fal fa-signal-3",
        sT: [],
      },
      {
        t: "fal fa-signal-4",
        sT: [],
      },
      {
        t: "fal fa-signal-alt",
        sT: [],
      },
      {
        t: "fal fa-signal-alt-1",
        sT: [],
      },
      {
        t: "fal fa-signal-alt-2",
        sT: [],
      },
      {
        t: "fal fa-signal-alt-3",
        sT: [],
      },
      {
        t: "fal fa-signal-alt-slash",
        sT: [],
      },
      {
        t: "fal fa-signal-slash",
        sT: [],
      },
      {
        t: "fal fa-signal-stream",
        sT: [],
      },
      {
        t: "fal fa-signature",
        sT: [],
      },
      {
        t: "fal fa-sim-card",
        sT: [],
      },
      {
        t: "fal fa-sink",
        sT: [],
      },
      {
        t: "fal fa-siren",
        sT: [],
      },
      {
        t: "fal fa-siren-on",
        sT: [],
      },
      {
        t: "fal fa-sitemap",
        sT: [],
      },
      {
        t: "fal fa-skating",
        sT: [],
      },
      {
        t: "fal fa-skeleton",
        sT: [],
      },
      {
        t: "fal fa-ski-jump",
        sT: [],
      },
      {
        t: "fal fa-ski-lift",
        sT: [],
      },
      {
        t: "fal fa-skiing",
        sT: [],
      },
      {
        t: "fal fa-skiing-nordic",
        sT: [],
      },
      {
        t: "fal fa-skull",
        sT: [],
      },
      {
        t: "fal fa-skull-cow",
        sT: [],
      },
      {
        t: "fal fa-skull-crossbones",
        sT: [],
      },
      {
        t: "fal fa-slash",
        sT: [],
      },
      {
        t: "fal fa-sledding",
        sT: [],
      },
      {
        t: "fal fa-sleigh",
        sT: [],
      },
      {
        t: "fal fa-sliders-h",
        sT: [],
      },
      {
        t: "fal fa-sliders-h-square",
        sT: [],
      },
      {
        t: "fal fa-sliders-v",
        sT: [],
      },
      {
        t: "fal fa-sliders-v-square",
        sT: [],
      },
      {
        t: "fal fa-smile",
        sT: [],
      },
      {
        t: "fal fa-smile-beam",
        sT: [],
      },
      {
        t: "fal fa-smile-plus",
        sT: [],
      },
      {
        t: "fal fa-smile-wink",
        sT: [],
      },
      {
        t: "fal fa-smog",
        sT: [],
      },
      {
        t: "fal fa-smoke",
        sT: [],
      },
      {
        t: "fal fa-smoking",
        sT: [],
      },
      {
        t: "fal fa-smoking-ban",
        sT: [],
      },
      {
        t: "fal fa-sms",
        sT: [],
      },
      {
        t: "fal fa-snake",
        sT: [],
      },
      {
        t: "fal fa-snooze",
        sT: [],
      },
      {
        t: "fal fa-snow-blowing",
        sT: [],
      },
      {
        t: "fal fa-snowboarding",
        sT: [],
      },
      {
        t: "fal fa-snowflake",
        sT: [],
      },
      {
        t: "fal fa-snowflakes",
        sT: [],
      },
      {
        t: "fal fa-snowman",
        sT: [],
      },
      {
        t: "fal fa-snowmobile",
        sT: [],
      },
      {
        t: "fal fa-snowplow",
        sT: [],
      },
      {
        t: "fal fa-soap",
        sT: [],
      },
      {
        t: "fal fa-socks",
        sT: [],
      },
      {
        t: "fal fa-solar-panel",
        sT: [],
      },
      {
        t: "fal fa-solar-system",
        sT: [],
      },
      {
        t: "fal fa-sort",
        sT: [],
      },
      {
        t: "fal fa-sort-alpha-down",
        sT: [],
      },
      {
        t: "fal fa-sort-alpha-down-alt",
        sT: [],
      },
      {
        t: "fal fa-sort-alpha-up",
        sT: [],
      },
      {
        t: "fal fa-sort-alpha-up-alt",
        sT: [],
      },
      {
        t: "fal fa-sort-alt",
        sT: [],
      },
      {
        t: "fal fa-sort-amount-down",
        sT: [],
      },
      {
        t: "fal fa-sort-amount-down-alt",
        sT: [],
      },
      {
        t: "fal fa-sort-amount-up",
        sT: [],
      },
      {
        t: "fal fa-sort-amount-up-alt",
        sT: [],
      },
      {
        t: "fal fa-sort-circle",
        sT: [],
      },
      {
        t: "fal fa-sort-circle-down",
        sT: [],
      },
      {
        t: "fal fa-sort-circle-up",
        sT: [],
      },
      {
        t: "fal fa-sort-down",
        sT: [],
      },
      {
        t: "fal fa-sort-numeric-down",
        sT: [],
      },
      {
        t: "fal fa-sort-numeric-down-alt",
        sT: [],
      },
      {
        t: "fal fa-sort-numeric-up",
        sT: [],
      },
      {
        t: "fal fa-sort-numeric-up-alt",
        sT: [],
      },
      {
        t: "fal fa-sort-shapes-down",
        sT: [],
      },
      {
        t: "fal fa-sort-shapes-down-alt",
        sT: [],
      },
      {
        t: "fal fa-sort-shapes-up",
        sT: [],
      },
      {
        t: "fal fa-sort-shapes-up-alt",
        sT: [],
      },
      {
        t: "fal fa-sort-size-down",
        sT: [],
      },
      {
        t: "fal fa-sort-size-down-alt",
        sT: [],
      },
      {
        t: "fal fa-sort-size-up",
        sT: [],
      },
      {
        t: "fal fa-sort-size-up-alt",
        sT: [],
      },
      {
        t: "fal fa-sort-up",
        sT: [],
      },
      {
        t: "fal fa-soup",
        sT: [],
      },
      {
        t: "fal fa-spa",
        sT: [],
      },
      {
        t: "fal fa-space-shuttle",
        sT: [],
      },
      {
        t: "fal fa-space-station-moon",
        sT: [],
      },
      {
        t: "fal fa-space-station-moon-alt",
        sT: [],
      },
      {
        t: "fal fa-spade",
        sT: [],
      },
      {
        t: "fal fa-sparkles",
        sT: [],
      },
      {
        t: "fal fa-speaker",
        sT: [],
      },
      {
        t: "fal fa-speakers",
        sT: [],
      },
      {
        t: "fal fa-spell-check",
        sT: [],
      },
      {
        t: "fal fa-spider",
        sT: [],
      },
      {
        t: "fal fa-spider-black-widow",
        sT: [],
      },
      {
        t: "fal fa-spider-web",
        sT: [],
      },
      {
        t: "fal fa-spinner",
        sT: [],
      },
      {
        t: "fal fa-spinner-third",
        sT: [],
      },
      {
        t: "fal fa-splotch",
        sT: [],
      },
      {
        t: "fal fa-spray-can",
        sT: [],
      },
      {
        t: "fal fa-sprinkler",
        sT: [],
      },
      {
        t: "fal fa-square",
        sT: [],
      },
      {
        t: "fal fa-square-full",
        sT: [],
      },
      {
        t: "fal fa-square-root",
        sT: [],
      },
      {
        t: "fal fa-square-root-alt",
        sT: [],
      },
      {
        t: "fal fa-squirrel",
        sT: [],
      },
      {
        t: "fal fa-staff",
        sT: [],
      },
      {
        t: "fal fa-stamp",
        sT: [],
      },
      {
        t: "fal fa-star",
        sT: [],
      },
      {
        t: "fal fa-star-and-crescent",
        sT: [],
      },
      {
        t: "fal fa-star-christmas",
        sT: [],
      },
      {
        t: "fal fa-star-exclamation",
        sT: [],
      },
      {
        t: "fal fa-star-half",
        sT: [],
      },
      {
        t: "fal fa-star-half-alt",
        sT: [],
      },
      {
        t: "fal fa-star-of-david",
        sT: [],
      },
      {
        t: "fal fa-star-of-life",
        sT: [],
      },
      {
        t: "fal fa-star-shooting",
        sT: [],
      },
      {
        t: "fal fa-starfighter",
        sT: [],
      },
      {
        t: "fal fa-starfighter-alt",
        sT: [],
      },
      {
        t: "fal fa-stars",
        sT: [],
      },
      {
        t: "fal fa-starship",
        sT: [],
      },
      {
        t: "fal fa-starship-freighter",
        sT: [],
      },
      {
        t: "fal fa-steak",
        sT: [],
      },
      {
        t: "fal fa-steering-wheel",
        sT: [],
      },
      {
        t: "fal fa-step-backward",
        sT: [],
      },
      {
        t: "fal fa-step-forward",
        sT: [],
      },
      {
        t: "fal fa-stethoscope",
        sT: [],
      },
      {
        t: "fal fa-sticky-note",
        sT: [],
      },
      {
        t: "fal fa-stocking",
        sT: [],
      },
      {
        t: "fal fa-stomach",
        sT: [],
      },
      {
        t: "fal fa-stop",
        sT: [],
      },
      {
        t: "fal fa-stop-circle",
        sT: [],
      },
      {
        t: "fal fa-stopwatch",
        sT: [],
      },
      {
        t: "fal fa-stopwatch-20",
        sT: [],
      },
      {
        t: "fal fa-store",
        sT: [],
      },
      {
        t: "fal fa-store-alt",
        sT: [],
      },
      {
        t: "fal fa-store-alt-slash",
        sT: [],
      },
      {
        t: "fal fa-store-slash",
        sT: [],
      },
      {
        t: "fal fa-stream",
        sT: [],
      },
      {
        t: "fal fa-street-view",
        sT: [],
      },
      {
        t: "fal fa-stretcher",
        sT: [],
      },
      {
        t: "fal fa-strikethrough",
        sT: [],
      },
      {
        t: "fal fa-stroopwafel",
        sT: [],
      },
      {
        t: "fal fa-subscript",
        sT: [],
      },
      {
        t: "fal fa-subway",
        sT: [],
      },
      {
        t: "fal fa-suitcase",
        sT: [],
      },
      {
        t: "fal fa-suitcase-rolling",
        sT: [],
      },
      {
        t: "fal fa-sun",
        sT: [],
      },
      {
        t: "fal fa-sun-cloud",
        sT: [],
      },
      {
        t: "fal fa-sun-dust",
        sT: [],
      },
      {
        t: "fal fa-sun-haze",
        sT: [],
      },
      {
        t: "fal fa-sunglasses",
        sT: [],
      },
      {
        t: "fal fa-sunrise",
        sT: [],
      },
      {
        t: "fal fa-sunset",
        sT: [],
      },
      {
        t: "fal fa-superscript",
        sT: [],
      },
      {
        t: "fal fa-surprise",
        sT: [],
      },
      {
        t: "fal fa-swatchbook",
        sT: [],
      },
      {
        t: "fal fa-swimmer",
        sT: [],
      },
      {
        t: "fal fa-swimming-pool",
        sT: [],
      },
      {
        t: "fal fa-sword",
        sT: [],
      },
      {
        t: "fal fa-sword-laser",
        sT: [],
      },
      {
        t: "fal fa-sword-laser-alt",
        sT: [],
      },
      {
        t: "fal fa-swords",
        sT: [],
      },
      {
        t: "fal fa-swords-laser",
        sT: [],
      },
      {
        t: "fal fa-synagogue",
        sT: [],
      },
      {
        t: "fal fa-sync",
        sT: [],
      },
      {
        t: "fal fa-sync-alt",
        sT: [],
      },
      {
        t: "fal fa-syringe",
        sT: [],
      },
      {
        t: "fal fa-table",
        sT: [],
      },
      {
        t: "fal fa-table-tennis",
        sT: [],
      },
      {
        t: "fal fa-tablet",
        sT: [],
      },
      {
        t: "fal fa-tablet-alt",
        sT: [],
      },
      {
        t: "fal fa-tablet-android",
        sT: [],
      },
      {
        t: "fal fa-tablet-android-alt",
        sT: [],
      },
      {
        t: "fal fa-tablet-rugged",
        sT: [],
      },
      {
        t: "fal fa-tablets",
        sT: [],
      },
      {
        t: "fal fa-tachometer",
        sT: [],
      },
      {
        t: "fal fa-tachometer-alt",
        sT: [],
      },
      {
        t: "fal fa-tachometer-alt-average",
        sT: [],
      },
      {
        t: "fal fa-tachometer-alt-fast",
        sT: [],
      },
      {
        t: "fal fa-tachometer-alt-fastest",
        sT: [],
      },
      {
        t: "fal fa-tachometer-alt-slow",
        sT: [],
      },
      {
        t: "fal fa-tachometer-alt-slowest",
        sT: [],
      },
      {
        t: "fal fa-tachometer-average",
        sT: [],
      },
      {
        t: "fal fa-tachometer-fast",
        sT: [],
      },
      {
        t: "fal fa-tachometer-fastest",
        sT: [],
      },
      {
        t: "fal fa-tachometer-slow",
        sT: [],
      },
      {
        t: "fal fa-tachometer-slowest",
        sT: [],
      },
      {
        t: "fal fa-taco",
        sT: [],
      },
      {
        t: "fal fa-tag",
        sT: [],
      },
      {
        t: "fal fa-tags",
        sT: [],
      },
      {
        t: "fal fa-tally",
        sT: [],
      },
      {
        t: "fal fa-tanakh",
        sT: [],
      },
      {
        t: "fal fa-tape",
        sT: [],
      },
      {
        t: "fal fa-tasks",
        sT: [],
      },
      {
        t: "fal fa-tasks-alt",
        sT: [],
      },
      {
        t: "fal fa-taxi",
        sT: [],
      },
      {
        t: "fal fa-teeth",
        sT: [],
      },
      {
        t: "fal fa-teeth-open",
        sT: [],
      },
      {
        t: "fal fa-telescope",
        sT: [],
      },
      {
        t: "fal fa-temperature-down",
        sT: [],
      },
      {
        t: "fal fa-temperature-frigid",
        sT: [],
      },
      {
        t: "fal fa-temperature-high",
        sT: [],
      },
      {
        t: "fal fa-temperature-hot",
        sT: [],
      },
      {
        t: "fal fa-temperature-low",
        sT: [],
      },
      {
        t: "fal fa-temperature-up",
        sT: [],
      },
      {
        t: "fal fa-tenge",
        sT: [],
      },
      {
        t: "fal fa-tennis-ball",
        sT: [],
      },
      {
        t: "fal fa-terminal",
        sT: [],
      },
      {
        t: "fal fa-text",
        sT: [],
      },
      {
        t: "fal fa-text-height",
        sT: [],
      },
      {
        t: "fal fa-text-size",
        sT: [],
      },
      {
        t: "fal fa-text-width",
        sT: [],
      },
      {
        t: "fal fa-th",
        sT: [],
      },
      {
        t: "fal fa-th-large",
        sT: [],
      },
      {
        t: "fal fa-th-list",
        sT: [],
      },
      {
        t: "fal fa-theater-masks",
        sT: [],
      },
      {
        t: "fal fa-thermometer",
        sT: [],
      },
      {
        t: "fal fa-thermometer-empty",
        sT: [],
      },
      {
        t: "fal fa-thermometer-full",
        sT: [],
      },
      {
        t: "fal fa-thermometer-half",
        sT: [],
      },
      {
        t: "fal fa-thermometer-quarter",
        sT: [],
      },
      {
        t: "fal fa-thermometer-three-quarters",
        sT: [],
      },
      {
        t: "fal fa-theta",
        sT: [],
      },
      {
        t: "fal fa-thumbs-down",
        sT: [],
      },
      {
        t: "fal fa-thumbs-up",
        sT: [],
      },
      {
        t: "fal fa-thumbtack",
        sT: [],
      },
      {
        t: "fal fa-thunderstorm",
        sT: [],
      },
      {
        t: "fal fa-thunderstorm-moon",
        sT: [],
      },
      {
        t: "fal fa-thunderstorm-sun",
        sT: [],
      },
      {
        t: "fal fa-ticket",
        sT: [],
      },
      {
        t: "fal fa-ticket-alt",
        sT: [],
      },
      {
        t: "fal fa-tilde",
        sT: [],
      },
      {
        t: "fal fa-times",
        sT: [],
      },
      {
        t: "fal fa-times-circle",
        sT: [],
      },
      {
        t: "fal fa-times-hexagon",
        sT: [],
      },
      {
        t: "fal fa-times-octagon",
        sT: [],
      },
      {
        t: "fal fa-times-square",
        sT: [],
      },
      {
        t: "fal fa-tint",
        sT: [],
      },
      {
        t: "fal fa-tint-slash",
        sT: [],
      },
      {
        t: "fal fa-tire",
        sT: [],
      },
      {
        t: "fal fa-tire-flat",
        sT: [],
      },
      {
        t: "fal fa-tire-pressure-warning",
        sT: [],
      },
      {
        t: "fal fa-tire-rugged",
        sT: [],
      },
      {
        t: "fal fa-tired",
        sT: [],
      },
      {
        t: "fal fa-toggle-off",
        sT: [],
      },
      {
        t: "fal fa-toggle-on",
        sT: [],
      },
      {
        t: "fal fa-toilet",
        sT: [],
      },
      {
        t: "fal fa-toilet-paper",
        sT: [],
      },
      {
        t: "fal fa-toilet-paper-alt",
        sT: [],
      },
      {
        t: "fal fa-toilet-paper-slash",
        sT: [],
      },
      {
        t: "fal fa-tombstone",
        sT: [],
      },
      {
        t: "fal fa-tombstone-alt",
        sT: [],
      },
      {
        t: "fal fa-toolbox",
        sT: [],
      },
      {
        t: "fal fa-tools",
        sT: [],
      },
      {
        t: "fal fa-tooth",
        sT: [],
      },
      {
        t: "fal fa-toothbrush",
        sT: [],
      },
      {
        t: "fal fa-torah",
        sT: [],
      },
      {
        t: "fal fa-torii-gate",
        sT: [],
      },
      {
        t: "fal fa-tornado",
        sT: [],
      },
      {
        t: "fal fa-tractor",
        sT: [],
      },
      {
        t: "fal fa-trademark",
        sT: [],
      },
      {
        t: "fal fa-traffic-cone",
        sT: [],
      },
      {
        t: "fal fa-traffic-light",
        sT: [],
      },
      {
        t: "fal fa-traffic-light-go",
        sT: [],
      },
      {
        t: "fal fa-traffic-light-slow",
        sT: [],
      },
      {
        t: "fal fa-traffic-light-stop",
        sT: [],
      },
      {
        t: "fal fa-trailer",
        sT: [],
      },
      {
        t: "fal fa-train",
        sT: [],
      },
      {
        t: "fal fa-tram",
        sT: [],
      },
      {
        t: "fal fa-transgender",
        sT: [],
      },
      {
        t: "fal fa-transgender-alt",
        sT: [],
      },
      {
        t: "fal fa-transporter",
        sT: [],
      },
      {
        t: "fal fa-transporter-1",
        sT: [],
      },
      {
        t: "fal fa-transporter-2",
        sT: [],
      },
      {
        t: "fal fa-transporter-3",
        sT: [],
      },
      {
        t: "fal fa-transporter-empty",
        sT: [],
      },
      {
        t: "fal fa-trash",
        sT: [],
      },
      {
        t: "fal fa-trash-alt",
        sT: [],
      },
      {
        t: "fal fa-trash-restore",
        sT: [],
      },
      {
        t: "fal fa-trash-restore-alt",
        sT: [],
      },
      {
        t: "fal fa-trash-undo",
        sT: [],
      },
      {
        t: "fal fa-trash-undo-alt",
        sT: [],
      },
      {
        t: "fal fa-treasure-chest",
        sT: [],
      },
      {
        t: "fal fa-tree",
        sT: [],
      },
      {
        t: "fal fa-tree-alt",
        sT: [],
      },
      {
        t: "fal fa-tree-christmas",
        sT: [],
      },
      {
        t: "fal fa-tree-decorated",
        sT: [],
      },
      {
        t: "fal fa-tree-large",
        sT: [],
      },
      {
        t: "fal fa-tree-palm",
        sT: [],
      },
      {
        t: "fal fa-trees",
        sT: [],
      },
      {
        t: "fal fa-triangle",
        sT: [],
      },
      {
        t: "fal fa-triangle-music",
        sT: [],
      },
      {
        t: "fal fa-trophy",
        sT: [],
      },
      {
        t: "fal fa-trophy-alt",
        sT: [],
      },
      {
        t: "fal fa-truck",
        sT: [],
      },
      {
        t: "fal fa-truck-container",
        sT: [],
      },
      {
        t: "fal fa-truck-couch",
        sT: [],
      },
      {
        t: "fal fa-truck-loading",
        sT: [],
      },
      {
        t: "fal fa-truck-monster",
        sT: [],
      },
      {
        t: "fal fa-truck-moving",
        sT: [],
      },
      {
        t: "fal fa-truck-pickup",
        sT: [],
      },
      {
        t: "fal fa-truck-plow",
        sT: [],
      },
      {
        t: "fal fa-truck-ramp",
        sT: [],
      },
      {
        t: "fal fa-trumpet",
        sT: [],
      },
      {
        t: "fal fa-tshirt",
        sT: [],
      },
      {
        t: "fal fa-tty",
        sT: [],
      },
      {
        t: "fal fa-turkey",
        sT: [],
      },
      {
        t: "fal fa-turntable",
        sT: [],
      },
      {
        t: "fal fa-turtle",
        sT: [],
      },
      {
        t: "fal fa-tv",
        sT: [],
      },
      {
        t: "fal fa-tv-alt",
        sT: [],
      },
      {
        t: "fal fa-tv-music",
        sT: [],
      },
      {
        t: "fal fa-tv-retro",
        sT: [],
      },
      {
        t: "fal fa-typewriter",
        sT: [],
      },
      {
        t: "fal fa-ufo",
        sT: [],
      },
      {
        t: "fal fa-ufo-beam",
        sT: [],
      },
      {
        t: "fal fa-umbrella",
        sT: [],
      },
      {
        t: "fal fa-umbrella-beach",
        sT: [],
      },
      {
        t: "fal fa-underline",
        sT: [],
      },
      {
        t: "fal fa-undo",
        sT: [],
      },
      {
        t: "fal fa-undo-alt",
        sT: [],
      },
      {
        t: "fal fa-unicorn",
        sT: [],
      },
      {
        t: "fal fa-union",
        sT: [],
      },
      {
        t: "fal fa-universal-access",
        sT: [],
      },
      {
        t: "fal fa-university",
        sT: [],
      },
      {
        t: "fal fa-unlink",
        sT: [],
      },
      {
        t: "fal fa-unlock",
        sT: [],
      },
      {
        t: "fal fa-unlock-alt",
        sT: [],
      },
      {
        t: "fal fa-upload",
        sT: [],
      },
      {
        t: "fal fa-usb-drive",
        sT: [],
      },
      {
        t: "fal fa-usd-circle",
        sT: [],
      },
      {
        t: "fal fa-usd-square",
        sT: [],
      },
      {
        t: "fal fa-user",
        sT: [],
      },
      {
        t: "fal fa-user-alien",
        sT: [],
      },
      {
        t: "fal fa-user-alt",
        sT: [],
      },
      {
        t: "fal fa-user-alt-slash",
        sT: [],
      },
      {
        t: "fal fa-user-astronaut",
        sT: [],
      },
      {
        t: "fal fa-user-chart",
        sT: [],
      },
      {
        t: "fal fa-user-check",
        sT: [],
      },
      {
        t: "fal fa-user-circle",
        sT: [],
      },
      {
        t: "fal fa-user-clock",
        sT: [],
      },
      {
        t: "fal fa-user-cog",
        sT: [],
      },
      {
        t: "fal fa-user-cowboy",
        sT: [],
      },
      {
        t: "fal fa-user-crown",
        sT: [],
      },
      {
        t: "fal fa-user-edit",
        sT: [],
      },
      {
        t: "fal fa-user-friends",
        sT: [],
      },
      {
        t: "fal fa-user-graduate",
        sT: [],
      },
      {
        t: "fal fa-user-hard-hat",
        sT: [],
      },
      {
        t: "fal fa-user-headset",
        sT: [],
      },
      {
        t: "fal fa-user-injured",
        sT: [],
      },
      {
        t: "fal fa-user-lock",
        sT: [],
      },
      {
        t: "fal fa-user-md",
        sT: [],
      },
      {
        t: "fal fa-user-md-chat",
        sT: [],
      },
      {
        t: "fal fa-user-minus",
        sT: [],
      },
      {
        t: "fal fa-user-music",
        sT: [],
      },
      {
        t: "fal fa-user-ninja",
        sT: [],
      },
      {
        t: "fal fa-user-nurse",
        sT: [],
      },
      {
        t: "fal fa-user-plus",
        sT: [],
      },
      {
        t: "fal fa-user-robot",
        sT: [],
      },
      {
        t: "fal fa-user-secret",
        sT: [],
      },
      {
        t: "fal fa-user-shield",
        sT: [],
      },
      {
        t: "fal fa-user-slash",
        sT: [],
      },
      {
        t: "fal fa-user-tag",
        sT: [],
      },
      {
        t: "fal fa-user-tie",
        sT: [],
      },
      {
        t: "fal fa-user-times",
        sT: [],
      },
      {
        t: "fal fa-user-unlock",
        sT: [],
      },
      {
        t: "fal fa-user-visor",
        sT: [],
      },
      {
        t: "fal fa-users",
        sT: [],
      },
      {
        t: "fal fa-users-class",
        sT: [],
      },
      {
        t: "fal fa-users-cog",
        sT: [],
      },
      {
        t: "fal fa-users-crown",
        sT: [],
      },
      {
        t: "fal fa-users-medical",
        sT: [],
      },
      {
        t: "fal fa-users-slash",
        sT: [],
      },
      {
        t: "fal fa-utensil-fork",
        sT: [],
      },
      {
        t: "fal fa-utensil-knife",
        sT: [],
      },
      {
        t: "fal fa-utensil-spoon",
        sT: [],
      },
      {
        t: "fal fa-utensils",
        sT: [],
      },
      {
        t: "fal fa-utensils-alt",
        sT: [],
      },
      {
        t: "fal fa-vacuum",
        sT: [],
      },
      {
        t: "fal fa-vacuum-robot",
        sT: [],
      },
      {
        t: "fal fa-value-absolute",
        sT: [],
      },
      {
        t: "fal fa-vector-square",
        sT: [],
      },
      {
        t: "fal fa-venus",
        sT: [],
      },
      {
        t: "fal fa-venus-double",
        sT: [],
      },
      {
        t: "fal fa-venus-mars",
        sT: [],
      },
      {
        t: "fal fa-vest",
        sT: [],
      },
      {
        t: "fal fa-vest-patches",
        sT: [],
      },
      {
        t: "fal fa-vhs",
        sT: [],
      },
      {
        t: "fal fa-vial",
        sT: [],
      },
      {
        t: "fal fa-vials",
        sT: [],
      },
      {
        t: "fal fa-video",
        sT: [],
      },
      {
        t: "fal fa-video-plus",
        sT: [],
      },
      {
        t: "fal fa-video-slash",
        sT: [],
      },
      {
        t: "fal fa-vihara",
        sT: [],
      },
      {
        t: "fal fa-violin",
        sT: [],
      },
      {
        t: "fal fa-virus",
        sT: [],
      },
      {
        t: "fal fa-virus-slash",
        sT: [],
      },
      {
        t: "fal fa-viruses",
        sT: [],
      },
      {
        t: "fal fa-voicemail",
        sT: [],
      },
      {
        t: "fal fa-volcano",
        sT: [],
      },
      {
        t: "fal fa-volleyball-ball",
        sT: [],
      },
      {
        t: "fal fa-volume",
        sT: [],
      },
      {
        t: "fal fa-volume-down",
        sT: [],
      },
      {
        t: "fal fa-volume-mute",
        sT: [],
      },
      {
        t: "fal fa-volume-off",
        sT: [],
      },
      {
        t: "fal fa-volume-slash",
        sT: [],
      },
      {
        t: "fal fa-volume-up",
        sT: [],
      },
      {
        t: "fal fa-vote-nay",
        sT: [],
      },
      {
        t: "fal fa-vote-yea",
        sT: [],
      },
      {
        t: "fal fa-vr-cardboard",
        sT: [],
      },
      {
        t: "fal fa-wagon-covered",
        sT: [],
      },
      {
        t: "fal fa-walker",
        sT: [],
      },
      {
        t: "fal fa-walkie-talkie",
        sT: [],
      },
      {
        t: "fal fa-walking",
        sT: [],
      },
      {
        t: "fal fa-wallet",
        sT: [],
      },
      {
        t: "fal fa-wand",
        sT: [],
      },
      {
        t: "fal fa-wand-magic",
        sT: [],
      },
      {
        t: "fal fa-warehouse",
        sT: [],
      },
      {
        t: "fal fa-warehouse-alt",
        sT: [],
      },
      {
        t: "fal fa-washer",
        sT: [],
      },
      {
        t: "fal fa-watch",
        sT: [],
      },
      {
        t: "fal fa-watch-calculator",
        sT: [],
      },
      {
        t: "fal fa-watch-fitness",
        sT: [],
      },
      {
        t: "fal fa-water",
        sT: [],
      },
      {
        t: "fal fa-water-lower",
        sT: [],
      },
      {
        t: "fal fa-water-rise",
        sT: [],
      },
      {
        t: "fal fa-wave-sine",
        sT: [],
      },
      {
        t: "fal fa-wave-square",
        sT: [],
      },
      {
        t: "fal fa-wave-triangle",
        sT: [],
      },
      {
        t: "fal fa-waveform",
        sT: [],
      },
      {
        t: "fal fa-waveform-path",
        sT: [],
      },
      {
        t: "fal fa-webcam",
        sT: [],
      },
      {
        t: "fal fa-webcam-slash",
        sT: [],
      },
      {
        t: "fal fa-weight",
        sT: [],
      },
      {
        t: "fal fa-weight-hanging",
        sT: [],
      },
      {
        t: "fal fa-whale",
        sT: [],
      },
      {
        t: "fal fa-wheat",
        sT: [],
      },
      {
        t: "fal fa-wheelchair",
        sT: [],
      },
      {
        t: "fal fa-whistle",
        sT: [],
      },
      {
        t: "fal fa-wifi",
        sT: [],
      },
      {
        t: "fal fa-wifi-1",
        sT: [],
      },
      {
        t: "fal fa-wifi-2",
        sT: [],
      },
      {
        t: "fal fa-wifi-slash",
        sT: [],
      },
      {
        t: "fal fa-wind",
        sT: [],
      },
      {
        t: "fal fa-wind-turbine",
        sT: [],
      },
      {
        t: "fal fa-wind-warning",
        sT: [],
      },
      {
        t: "fal fa-window",
        sT: [],
      },
      {
        t: "fal fa-window-alt",
        sT: [],
      },
      {
        t: "fal fa-window-close",
        sT: [],
      },
      {
        t: "fal fa-window-frame",
        sT: [],
      },
      {
        t: "fal fa-window-frame-open",
        sT: [],
      },
      {
        t: "fal fa-window-maximize",
        sT: [],
      },
      {
        t: "fal fa-window-minimize",
        sT: [],
      },
      {
        t: "fal fa-window-restore",
        sT: [],
      },
      {
        t: "fal fa-windsock",
        sT: [],
      },
      {
        t: "fal fa-wine-bottle",
        sT: [],
      },
      {
        t: "fal fa-wine-glass",
        sT: [],
      },
      {
        t: "fal fa-wine-glass-alt",
        sT: [],
      },
      {
        t: "fal fa-won-sign",
        sT: [],
      },
      {
        t: "fal fa-wreath",
        sT: [],
      },
      {
        t: "fal fa-wrench",
        sT: [],
      },
      {
        t: "fal fa-x-ray",
        sT: [],
      },
      {
        t: "fal fa-yen-sign",
        sT: [],
      },
      {
        t: "fal fa-yin-yang",
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
