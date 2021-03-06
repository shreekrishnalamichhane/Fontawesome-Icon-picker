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
        t: "far fa-abacus",
        sT: [],
      },
      {
        t: "far fa-acorn",
        sT: [],
      },
      {
        t: "far fa-ad",
        sT: [],
      },
      {
        t: "far fa-address-book",
        sT: [],
      },
      {
        t: "far fa-address-card",
        sT: [],
      },
      {
        t: "far fa-adjust",
        sT: [],
      },
      {
        t: "far fa-air-conditioner",
        sT: [],
      },
      {
        t: "far fa-air-freshener",
        sT: [],
      },
      {
        t: "far fa-alarm-clock",
        sT: [],
      },
      {
        t: "far fa-alarm-exclamation",
        sT: [],
      },
      {
        t: "far fa-alarm-plus",
        sT: [],
      },
      {
        t: "far fa-alarm-snooze",
        sT: [],
      },
      {
        t: "far fa-album",
        sT: [],
      },
      {
        t: "far fa-album-collection",
        sT: [],
      },
      {
        t: "far fa-alicorn",
        sT: [],
      },
      {
        t: "far fa-alien",
        sT: [],
      },
      {
        t: "far fa-alien-monster",
        sT: [],
      },
      {
        t: "far fa-align-center",
        sT: [],
      },
      {
        t: "far fa-align-justify",
        sT: [],
      },
      {
        t: "far fa-align-left",
        sT: [],
      },
      {
        t: "far fa-align-right",
        sT: [],
      },
      {
        t: "far fa-align-slash",
        sT: [],
      },
      {
        t: "far fa-allergies",
        sT: [],
      },
      {
        t: "far fa-ambulance",
        sT: [],
      },
      {
        t: "far fa-american-sign-language-interpreting",
        sT: [],
      },
      {
        t: "far fa-amp-guitar",
        sT: [],
      },
      {
        t: "far fa-analytics",
        sT: [],
      },
      {
        t: "far fa-anchor",
        sT: [],
      },
      {
        t: "far fa-angel",
        sT: [],
      },
      {
        t: "far fa-angle-double-down",
        sT: [],
      },
      {
        t: "far fa-angle-double-left",
        sT: [],
      },
      {
        t: "far fa-angle-double-right",
        sT: [],
      },
      {
        t: "far fa-angle-double-up",
        sT: [],
      },
      {
        t: "far fa-angle-down",
        sT: [],
      },
      {
        t: "far fa-angle-left",
        sT: [],
      },
      {
        t: "far fa-angle-right",
        sT: [],
      },
      {
        t: "far fa-angle-up",
        sT: [],
      },
      {
        t: "far fa-angry",
        sT: [],
      },
      {
        t: "far fa-ankh",
        sT: [],
      },
      {
        t: "far fa-apple-alt",
        sT: [],
      },
      {
        t: "far fa-apple-crate",
        sT: [],
      },
      {
        t: "far fa-archive",
        sT: [],
      },
      {
        t: "far fa-archway",
        sT: [],
      },
      {
        t: "far fa-arrow-alt-circle-down",
        sT: [],
      },
      {
        t: "far fa-arrow-alt-circle-left",
        sT: [],
      },
      {
        t: "far fa-arrow-alt-circle-right",
        sT: [],
      },
      {
        t: "far fa-arrow-alt-circle-up",
        sT: [],
      },
      {
        t: "far fa-arrow-alt-down",
        sT: [],
      },
      {
        t: "far fa-arrow-alt-from-bottom",
        sT: [],
      },
      {
        t: "far fa-arrow-alt-from-left",
        sT: [],
      },
      {
        t: "far fa-arrow-alt-from-right",
        sT: [],
      },
      {
        t: "far fa-arrow-alt-from-top",
        sT: [],
      },
      {
        t: "far fa-arrow-alt-left",
        sT: [],
      },
      {
        t: "far fa-arrow-alt-right",
        sT: [],
      },
      {
        t: "far fa-arrow-alt-square-down",
        sT: [],
      },
      {
        t: "far fa-arrow-alt-square-left",
        sT: [],
      },
      {
        t: "far fa-arrow-alt-square-right",
        sT: [],
      },
      {
        t: "far fa-arrow-alt-square-up",
        sT: [],
      },
      {
        t: "far fa-arrow-alt-to-bottom",
        sT: [],
      },
      {
        t: "far fa-arrow-alt-to-left",
        sT: [],
      },
      {
        t: "far fa-arrow-alt-to-right",
        sT: [],
      },
      {
        t: "far fa-arrow-alt-to-top",
        sT: [],
      },
      {
        t: "far fa-arrow-alt-up",
        sT: [],
      },
      {
        t: "far fa-arrow-circle-down",
        sT: [],
      },
      {
        t: "far fa-arrow-circle-left",
        sT: [],
      },
      {
        t: "far fa-arrow-circle-right",
        sT: [],
      },
      {
        t: "far fa-arrow-circle-up",
        sT: [],
      },
      {
        t: "far fa-arrow-down",
        sT: [],
      },
      {
        t: "far fa-arrow-from-bottom",
        sT: [],
      },
      {
        t: "far fa-arrow-from-left",
        sT: [],
      },
      {
        t: "far fa-arrow-from-right",
        sT: [],
      },
      {
        t: "far fa-arrow-from-top",
        sT: [],
      },
      {
        t: "far fa-arrow-left",
        sT: [],
      },
      {
        t: "far fa-arrow-right",
        sT: [],
      },
      {
        t: "far fa-arrow-square-down",
        sT: [],
      },
      {
        t: "far fa-arrow-square-left",
        sT: [],
      },
      {
        t: "far fa-arrow-square-right",
        sT: [],
      },
      {
        t: "far fa-arrow-square-up",
        sT: [],
      },
      {
        t: "far fa-arrow-to-bottom",
        sT: [],
      },
      {
        t: "far fa-arrow-to-left",
        sT: [],
      },
      {
        t: "far fa-arrow-to-right",
        sT: [],
      },
      {
        t: "far fa-arrow-to-top",
        sT: [],
      },
      {
        t: "far fa-arrow-up",
        sT: [],
      },
      {
        t: "far fa-arrows",
        sT: [],
      },
      {
        t: "far fa-arrows-alt",
        sT: [],
      },
      {
        t: "far fa-arrows-alt-h",
        sT: [],
      },
      {
        t: "far fa-arrows-alt-v",
        sT: [],
      },
      {
        t: "far fa-arrows-h",
        sT: [],
      },
      {
        t: "far fa-arrows-v",
        sT: [],
      },
      {
        t: "far fa-assistive-listening-systems",
        sT: [],
      },
      {
        t: "far fa-asterisk",
        sT: [],
      },
      {
        t: "far fa-at",
        sT: [],
      },
      {
        t: "far fa-atlas",
        sT: [],
      },
      {
        t: "far fa-atom",
        sT: [],
      },
      {
        t: "far fa-atom-alt",
        sT: [],
      },
      {
        t: "far fa-audio-description",
        sT: [],
      },
      {
        t: "far fa-award",
        sT: [],
      },
      {
        t: "far fa-axe",
        sT: [],
      },
      {
        t: "far fa-axe-battle",
        sT: [],
      },
      {
        t: "far fa-baby",
        sT: [],
      },
      {
        t: "far fa-baby-carriage",
        sT: [],
      },
      {
        t: "far fa-backpack",
        sT: [],
      },
      {
        t: "far fa-backspace",
        sT: [],
      },
      {
        t: "far fa-backward",
        sT: [],
      },
      {
        t: "far fa-bacon",
        sT: [],
      },
      {
        t: "far fa-bacteria",
        sT: [],
      },
      {
        t: "far fa-bacterium",
        sT: [],
      },
      {
        t: "far fa-badge",
        sT: [],
      },
      {
        t: "far fa-badge-check",
        sT: [],
      },
      {
        t: "far fa-badge-dollar",
        sT: [],
      },
      {
        t: "far fa-badge-percent",
        sT: [],
      },
      {
        t: "far fa-badge-sheriff",
        sT: [],
      },
      {
        t: "far fa-badger-honey",
        sT: [],
      },
      {
        t: "far fa-bags-shopping",
        sT: [],
      },
      {
        t: "far fa-bahai",
        sT: [],
      },
      {
        t: "far fa-balance-scale",
        sT: [],
      },
      {
        t: "far fa-balance-scale-left",
        sT: [],
      },
      {
        t: "far fa-balance-scale-right",
        sT: [],
      },
      {
        t: "far fa-ball-pile",
        sT: [],
      },
      {
        t: "far fa-ballot",
        sT: [],
      },
      {
        t: "far fa-ballot-check",
        sT: [],
      },
      {
        t: "far fa-ban",
        sT: [],
      },
      {
        t: "far fa-band-aid",
        sT: [],
      },
      {
        t: "far fa-banjo",
        sT: [],
      },
      {
        t: "far fa-barcode",
        sT: [],
      },
      {
        t: "far fa-barcode-alt",
        sT: [],
      },
      {
        t: "far fa-barcode-read",
        sT: [],
      },
      {
        t: "far fa-barcode-scan",
        sT: [],
      },
      {
        t: "far fa-bars",
        sT: [],
      },
      {
        t: "far fa-baseball",
        sT: [],
      },
      {
        t: "far fa-baseball-ball",
        sT: [],
      },
      {
        t: "far fa-basketball-ball",
        sT: [],
      },
      {
        t: "far fa-basketball-hoop",
        sT: [],
      },
      {
        t: "far fa-bat",
        sT: [],
      },
      {
        t: "far fa-bath",
        sT: [],
      },
      {
        t: "far fa-battery-bolt",
        sT: [],
      },
      {
        t: "far fa-battery-empty",
        sT: [],
      },
      {
        t: "far fa-battery-full",
        sT: [],
      },
      {
        t: "far fa-battery-half",
        sT: [],
      },
      {
        t: "far fa-battery-quarter",
        sT: [],
      },
      {
        t: "far fa-battery-slash",
        sT: [],
      },
      {
        t: "far fa-battery-three-quarters",
        sT: [],
      },
      {
        t: "far fa-bed",
        sT: [],
      },
      {
        t: "far fa-bed-alt",
        sT: [],
      },
      {
        t: "far fa-bed-bunk",
        sT: [],
      },
      {
        t: "far fa-bed-empty",
        sT: [],
      },
      {
        t: "far fa-beer",
        sT: [],
      },
      {
        t: "far fa-bell",
        sT: [],
      },
      {
        t: "far fa-bell-exclamation",
        sT: [],
      },
      {
        t: "far fa-bell-on",
        sT: [],
      },
      {
        t: "far fa-bell-plus",
        sT: [],
      },
      {
        t: "far fa-bell-school",
        sT: [],
      },
      {
        t: "far fa-bell-school-slash",
        sT: [],
      },
      {
        t: "far fa-bell-slash",
        sT: [],
      },
      {
        t: "far fa-bells",
        sT: [],
      },
      {
        t: "far fa-betamax",
        sT: [],
      },
      {
        t: "far fa-bezier-curve",
        sT: [],
      },
      {
        t: "far fa-bible",
        sT: [],
      },
      {
        t: "far fa-bicycle",
        sT: [],
      },
      {
        t: "far fa-biking",
        sT: [],
      },
      {
        t: "far fa-biking-mountain",
        sT: [],
      },
      {
        t: "far fa-binoculars",
        sT: [],
      },
      {
        t: "far fa-biohazard",
        sT: [],
      },
      {
        t: "far fa-birthday-cake",
        sT: [],
      },
      {
        t: "far fa-blanket",
        sT: [],
      },
      {
        t: "far fa-blender",
        sT: [],
      },
      {
        t: "far fa-blender-phone",
        sT: [],
      },
      {
        t: "far fa-blind",
        sT: [],
      },
      {
        t: "far fa-blinds",
        sT: [],
      },
      {
        t: "far fa-blinds-open",
        sT: [],
      },
      {
        t: "far fa-blinds-raised",
        sT: [],
      },
      {
        t: "far fa-blog",
        sT: [],
      },
      {
        t: "far fa-bold",
        sT: [],
      },
      {
        t: "far fa-bolt",
        sT: [],
      },
      {
        t: "far fa-bomb",
        sT: [],
      },
      {
        t: "far fa-bone",
        sT: [],
      },
      {
        t: "far fa-bone-break",
        sT: [],
      },
      {
        t: "far fa-bong",
        sT: [],
      },
      {
        t: "far fa-book",
        sT: [],
      },
      {
        t: "far fa-book-alt",
        sT: [],
      },
      {
        t: "far fa-book-dead",
        sT: [],
      },
      {
        t: "far fa-book-heart",
        sT: [],
      },
      {
        t: "far fa-book-medical",
        sT: [],
      },
      {
        t: "far fa-book-open",
        sT: [],
      },
      {
        t: "far fa-book-reader",
        sT: [],
      },
      {
        t: "far fa-book-spells",
        sT: [],
      },
      {
        t: "far fa-book-user",
        sT: [],
      },
      {
        t: "far fa-bookmark",
        sT: [],
      },
      {
        t: "far fa-books",
        sT: [],
      },
      {
        t: "far fa-books-medical",
        sT: [],
      },
      {
        t: "far fa-boombox",
        sT: [],
      },
      {
        t: "far fa-boot",
        sT: [],
      },
      {
        t: "far fa-booth-curtain",
        sT: [],
      },
      {
        t: "far fa-border-all",
        sT: [],
      },
      {
        t: "far fa-border-bottom",
        sT: [],
      },
      {
        t: "far fa-border-center-h",
        sT: [],
      },
      {
        t: "far fa-border-center-v",
        sT: [],
      },
      {
        t: "far fa-border-inner",
        sT: [],
      },
      {
        t: "far fa-border-left",
        sT: [],
      },
      {
        t: "far fa-border-none",
        sT: [],
      },
      {
        t: "far fa-border-outer",
        sT: [],
      },
      {
        t: "far fa-border-right",
        sT: [],
      },
      {
        t: "far fa-border-style",
        sT: [],
      },
      {
        t: "far fa-border-style-alt",
        sT: [],
      },
      {
        t: "far fa-border-top",
        sT: [],
      },
      {
        t: "far fa-bow-arrow",
        sT: [],
      },
      {
        t: "far fa-bowling-ball",
        sT: [],
      },
      {
        t: "far fa-bowling-pins",
        sT: [],
      },
      {
        t: "far fa-box",
        sT: [],
      },
      {
        t: "far fa-box-alt",
        sT: [],
      },
      {
        t: "far fa-box-ballot",
        sT: [],
      },
      {
        t: "far fa-box-check",
        sT: [],
      },
      {
        t: "far fa-box-fragile",
        sT: [],
      },
      {
        t: "far fa-box-full",
        sT: [],
      },
      {
        t: "far fa-box-heart",
        sT: [],
      },
      {
        t: "far fa-box-open",
        sT: [],
      },
      {
        t: "far fa-box-tissue",
        sT: [],
      },
      {
        t: "far fa-box-up",
        sT: [],
      },
      {
        t: "far fa-box-usd",
        sT: [],
      },
      {
        t: "far fa-boxes",
        sT: [],
      },
      {
        t: "far fa-boxes-alt",
        sT: [],
      },
      {
        t: "far fa-boxing-glove",
        sT: [],
      },
      {
        t: "far fa-brackets",
        sT: [],
      },
      {
        t: "far fa-brackets-curly",
        sT: [],
      },
      {
        t: "far fa-braille",
        sT: [],
      },
      {
        t: "far fa-brain",
        sT: [],
      },
      {
        t: "far fa-bread-loaf",
        sT: [],
      },
      {
        t: "far fa-bread-slice",
        sT: [],
      },
      {
        t: "far fa-briefcase",
        sT: [],
      },
      {
        t: "far fa-briefcase-medical",
        sT: [],
      },
      {
        t: "far fa-bring-forward",
        sT: [],
      },
      {
        t: "far fa-bring-front",
        sT: [],
      },
      {
        t: "far fa-broadcast-tower",
        sT: [],
      },
      {
        t: "far fa-broom",
        sT: [],
      },
      {
        t: "far fa-browser",
        sT: [],
      },
      {
        t: "far fa-brush",
        sT: [],
      },
      {
        t: "far fa-bug",
        sT: [],
      },
      {
        t: "far fa-building",
        sT: [],
      },
      {
        t: "far fa-bullhorn",
        sT: [],
      },
      {
        t: "far fa-bullseye",
        sT: [],
      },
      {
        t: "far fa-bullseye-arrow",
        sT: [],
      },
      {
        t: "far fa-bullseye-pointer",
        sT: [],
      },
      {
        t: "far fa-burger-soda",
        sT: [],
      },
      {
        t: "far fa-burn",
        sT: [],
      },
      {
        t: "far fa-burrito",
        sT: [],
      },
      {
        t: "far fa-bus",
        sT: [],
      },
      {
        t: "far fa-bus-alt",
        sT: [],
      },
      {
        t: "far fa-bus-school",
        sT: [],
      },
      {
        t: "far fa-business-time",
        sT: [],
      },
      {
        t: "far fa-cabinet-filing",
        sT: [],
      },
      {
        t: "far fa-cactus",
        sT: [],
      },
      {
        t: "far fa-calculator",
        sT: [],
      },
      {
        t: "far fa-calculator-alt",
        sT: [],
      },
      {
        t: "far fa-calendar",
        sT: [],
      },
      {
        t: "far fa-calendar-alt",
        sT: [],
      },
      {
        t: "far fa-calendar-check",
        sT: [],
      },
      {
        t: "far fa-calendar-day",
        sT: [],
      },
      {
        t: "far fa-calendar-edit",
        sT: [],
      },
      {
        t: "far fa-calendar-exclamation",
        sT: [],
      },
      {
        t: "far fa-calendar-minus",
        sT: [],
      },
      {
        t: "far fa-calendar-plus",
        sT: [],
      },
      {
        t: "far fa-calendar-star",
        sT: [],
      },
      {
        t: "far fa-calendar-times",
        sT: [],
      },
      {
        t: "far fa-calendar-week",
        sT: [],
      },
      {
        t: "far fa-camcorder",
        sT: [],
      },
      {
        t: "far fa-camera",
        sT: [],
      },
      {
        t: "far fa-camera-alt",
        sT: [],
      },
      {
        t: "far fa-camera-home",
        sT: [],
      },
      {
        t: "far fa-camera-movie",
        sT: [],
      },
      {
        t: "far fa-camera-polaroid",
        sT: [],
      },
      {
        t: "far fa-camera-retro",
        sT: [],
      },
      {
        t: "far fa-campfire",
        sT: [],
      },
      {
        t: "far fa-campground",
        sT: [],
      },
      {
        t: "far fa-candle-holder",
        sT: [],
      },
      {
        t: "far fa-candy-cane",
        sT: [],
      },
      {
        t: "far fa-candy-corn",
        sT: [],
      },
      {
        t: "far fa-cannabis",
        sT: [],
      },
      {
        t: "far fa-capsules",
        sT: [],
      },
      {
        t: "far fa-car",
        sT: [],
      },
      {
        t: "far fa-car-alt",
        sT: [],
      },
      {
        t: "far fa-car-battery",
        sT: [],
      },
      {
        t: "far fa-car-building",
        sT: [],
      },
      {
        t: "far fa-car-bump",
        sT: [],
      },
      {
        t: "far fa-car-bus",
        sT: [],
      },
      {
        t: "far fa-car-crash",
        sT: [],
      },
      {
        t: "far fa-car-garage",
        sT: [],
      },
      {
        t: "far fa-car-mechanic",
        sT: [],
      },
      {
        t: "far fa-car-side",
        sT: [],
      },
      {
        t: "far fa-car-tilt",
        sT: [],
      },
      {
        t: "far fa-car-wash",
        sT: [],
      },
      {
        t: "far fa-caravan",
        sT: [],
      },
      {
        t: "far fa-caravan-alt",
        sT: [],
      },
      {
        t: "far fa-caret-circle-down",
        sT: [],
      },
      {
        t: "far fa-caret-circle-left",
        sT: [],
      },
      {
        t: "far fa-caret-circle-right",
        sT: [],
      },
      {
        t: "far fa-caret-circle-up",
        sT: [],
      },
      {
        t: "far fa-caret-down",
        sT: [],
      },
      {
        t: "far fa-caret-left",
        sT: [],
      },
      {
        t: "far fa-caret-right",
        sT: [],
      },
      {
        t: "far fa-caret-square-down",
        sT: [],
      },
      {
        t: "far fa-caret-square-left",
        sT: [],
      },
      {
        t: "far fa-caret-square-right",
        sT: [],
      },
      {
        t: "far fa-caret-square-up",
        sT: [],
      },
      {
        t: "far fa-caret-up",
        sT: [],
      },
      {
        t: "far fa-carrot",
        sT: [],
      },
      {
        t: "far fa-cars",
        sT: [],
      },
      {
        t: "far fa-cart-arrow-down",
        sT: [],
      },
      {
        t: "far fa-cart-plus",
        sT: [],
      },
      {
        t: "far fa-cash-register",
        sT: [],
      },
      {
        t: "far fa-cassette-tape",
        sT: [],
      },
      {
        t: "far fa-cat",
        sT: [],
      },
      {
        t: "far fa-cat-space",
        sT: [],
      },
      {
        t: "far fa-cauldron",
        sT: [],
      },
      {
        t: "far fa-cctv",
        sT: [],
      },
      {
        t: "far fa-certificate",
        sT: [],
      },
      {
        t: "far fa-chair",
        sT: [],
      },
      {
        t: "far fa-chair-office",
        sT: [],
      },
      {
        t: "far fa-chalkboard",
        sT: [],
      },
      {
        t: "far fa-chalkboard-teacher",
        sT: [],
      },
      {
        t: "far fa-charging-station",
        sT: [],
      },
      {
        t: "far fa-chart-area",
        sT: [],
      },
      {
        t: "far fa-chart-bar",
        sT: [],
      },
      {
        t: "far fa-chart-line",
        sT: [],
      },
      {
        t: "far fa-chart-line-down",
        sT: [],
      },
      {
        t: "far fa-chart-network",
        sT: [],
      },
      {
        t: "far fa-chart-pie",
        sT: [],
      },
      {
        t: "far fa-chart-pie-alt",
        sT: [],
      },
      {
        t: "far fa-chart-scatter",
        sT: [],
      },
      {
        t: "far fa-check",
        sT: [],
      },
      {
        t: "far fa-check-circle",
        sT: [],
      },
      {
        t: "far fa-check-double",
        sT: [],
      },
      {
        t: "far fa-check-square",
        sT: [],
      },
      {
        t: "far fa-cheese",
        sT: [],
      },
      {
        t: "far fa-cheese-swiss",
        sT: [],
      },
      {
        t: "far fa-cheeseburger",
        sT: [],
      },
      {
        t: "far fa-chess",
        sT: [],
      },
      {
        t: "far fa-chess-bishop",
        sT: [],
      },
      {
        t: "far fa-chess-bishop-alt",
        sT: [],
      },
      {
        t: "far fa-chess-board",
        sT: [],
      },
      {
        t: "far fa-chess-clock",
        sT: [],
      },
      {
        t: "far fa-chess-clock-alt",
        sT: [],
      },
      {
        t: "far fa-chess-king",
        sT: [],
      },
      {
        t: "far fa-chess-king-alt",
        sT: [],
      },
      {
        t: "far fa-chess-knight",
        sT: [],
      },
      {
        t: "far fa-chess-knight-alt",
        sT: [],
      },
      {
        t: "far fa-chess-pawn",
        sT: [],
      },
      {
        t: "far fa-chess-pawn-alt",
        sT: [],
      },
      {
        t: "far fa-chess-queen",
        sT: [],
      },
      {
        t: "far fa-chess-queen-alt",
        sT: [],
      },
      {
        t: "far fa-chess-rook",
        sT: [],
      },
      {
        t: "far fa-chess-rook-alt",
        sT: [],
      },
      {
        t: "far fa-chevron-circle-down",
        sT: [],
      },
      {
        t: "far fa-chevron-circle-left",
        sT: [],
      },
      {
        t: "far fa-chevron-circle-right",
        sT: [],
      },
      {
        t: "far fa-chevron-circle-up",
        sT: [],
      },
      {
        t: "far fa-chevron-double-down",
        sT: [],
      },
      {
        t: "far fa-chevron-double-left",
        sT: [],
      },
      {
        t: "far fa-chevron-double-right",
        sT: [],
      },
      {
        t: "far fa-chevron-double-up",
        sT: [],
      },
      {
        t: "far fa-chevron-down",
        sT: [],
      },
      {
        t: "far fa-chevron-left",
        sT: [],
      },
      {
        t: "far fa-chevron-right",
        sT: [],
      },
      {
        t: "far fa-chevron-square-down",
        sT: [],
      },
      {
        t: "far fa-chevron-square-left",
        sT: [],
      },
      {
        t: "far fa-chevron-square-right",
        sT: [],
      },
      {
        t: "far fa-chevron-square-up",
        sT: [],
      },
      {
        t: "far fa-chevron-up",
        sT: [],
      },
      {
        t: "far fa-child",
        sT: [],
      },
      {
        t: "far fa-chimney",
        sT: [],
      },
      {
        t: "far fa-church",
        sT: [],
      },
      {
        t: "far fa-circle",
        sT: [],
      },
      {
        t: "far fa-circle-notch",
        sT: [],
      },
      {
        t: "far fa-city",
        sT: [],
      },
      {
        t: "far fa-clarinet",
        sT: [],
      },
      {
        t: "far fa-claw-marks",
        sT: [],
      },
      {
        t: "far fa-clinic-medical",
        sT: [],
      },
      {
        t: "far fa-clipboard",
        sT: [],
      },
      {
        t: "far fa-clipboard-check",
        sT: [],
      },
      {
        t: "far fa-clipboard-list",
        sT: [],
      },
      {
        t: "far fa-clipboard-list-check",
        sT: [],
      },
      {
        t: "far fa-clipboard-prescription",
        sT: [],
      },
      {
        t: "far fa-clipboard-user",
        sT: [],
      },
      {
        t: "far fa-clock",
        sT: [],
      },
      {
        t: "far fa-clone",
        sT: [],
      },
      {
        t: "far fa-closed-captioning",
        sT: [],
      },
      {
        t: "far fa-cloud",
        sT: [],
      },
      {
        t: "far fa-cloud-download",
        sT: [],
      },
      {
        t: "far fa-cloud-download-alt",
        sT: [],
      },
      {
        t: "far fa-cloud-drizzle",
        sT: [],
      },
      {
        t: "far fa-cloud-hail",
        sT: [],
      },
      {
        t: "far fa-cloud-hail-mixed",
        sT: [],
      },
      {
        t: "far fa-cloud-meatball",
        sT: [],
      },
      {
        t: "far fa-cloud-moon",
        sT: [],
      },
      {
        t: "far fa-cloud-moon-rain",
        sT: [],
      },
      {
        t: "far fa-cloud-music",
        sT: [],
      },
      {
        t: "far fa-cloud-rain",
        sT: [],
      },
      {
        t: "far fa-cloud-rainbow",
        sT: [],
      },
      {
        t: "far fa-cloud-showers",
        sT: [],
      },
      {
        t: "far fa-cloud-showers-heavy",
        sT: [],
      },
      {
        t: "far fa-cloud-sleet",
        sT: [],
      },
      {
        t: "far fa-cloud-snow",
        sT: [],
      },
      {
        t: "far fa-cloud-sun",
        sT: [],
      },
      {
        t: "far fa-cloud-sun-rain",
        sT: [],
      },
      {
        t: "far fa-cloud-upload",
        sT: [],
      },
      {
        t: "far fa-cloud-upload-alt",
        sT: [],
      },
      {
        t: "far fa-clouds",
        sT: [],
      },
      {
        t: "far fa-clouds-moon",
        sT: [],
      },
      {
        t: "far fa-clouds-sun",
        sT: [],
      },
      {
        t: "far fa-club",
        sT: [],
      },
      {
        t: "far fa-cocktail",
        sT: [],
      },
      {
        t: "far fa-code",
        sT: [],
      },
      {
        t: "far fa-code-branch",
        sT: [],
      },
      {
        t: "far fa-code-commit",
        sT: [],
      },
      {
        t: "far fa-code-merge",
        sT: [],
      },
      {
        t: "far fa-coffee",
        sT: [],
      },
      {
        t: "far fa-coffee-pot",
        sT: [],
      },
      {
        t: "far fa-coffee-togo",
        sT: [],
      },
      {
        t: "far fa-coffin",
        sT: [],
      },
      {
        t: "far fa-coffin-cross",
        sT: [],
      },
      {
        t: "far fa-cog",
        sT: [],
      },
      {
        t: "far fa-cogs",
        sT: [],
      },
      {
        t: "far fa-coin",
        sT: [],
      },
      {
        t: "far fa-coins",
        sT: [],
      },
      {
        t: "far fa-columns",
        sT: [],
      },
      {
        t: "far fa-comet",
        sT: [],
      },
      {
        t: "far fa-comment",
        sT: [],
      },
      {
        t: "far fa-comment-alt",
        sT: [],
      },
      {
        t: "far fa-comment-alt-check",
        sT: [],
      },
      {
        t: "far fa-comment-alt-dollar",
        sT: [],
      },
      {
        t: "far fa-comment-alt-dots",
        sT: [],
      },
      {
        t: "far fa-comment-alt-edit",
        sT: [],
      },
      {
        t: "far fa-comment-alt-exclamation",
        sT: [],
      },
      {
        t: "far fa-comment-alt-lines",
        sT: [],
      },
      {
        t: "far fa-comment-alt-medical",
        sT: [],
      },
      {
        t: "far fa-comment-alt-minus",
        sT: [],
      },
      {
        t: "far fa-comment-alt-music",
        sT: [],
      },
      {
        t: "far fa-comment-alt-plus",
        sT: [],
      },
      {
        t: "far fa-comment-alt-slash",
        sT: [],
      },
      {
        t: "far fa-comment-alt-smile",
        sT: [],
      },
      {
        t: "far fa-comment-alt-times",
        sT: [],
      },
      {
        t: "far fa-comment-check",
        sT: [],
      },
      {
        t: "far fa-comment-dollar",
        sT: [],
      },
      {
        t: "far fa-comment-dots",
        sT: [],
      },
      {
        t: "far fa-comment-edit",
        sT: [],
      },
      {
        t: "far fa-comment-exclamation",
        sT: [],
      },
      {
        t: "far fa-comment-lines",
        sT: [],
      },
      {
        t: "far fa-comment-medical",
        sT: [],
      },
      {
        t: "far fa-comment-minus",
        sT: [],
      },
      {
        t: "far fa-comment-music",
        sT: [],
      },
      {
        t: "far fa-comment-plus",
        sT: [],
      },
      {
        t: "far fa-comment-slash",
        sT: [],
      },
      {
        t: "far fa-comment-smile",
        sT: [],
      },
      {
        t: "far fa-comment-times",
        sT: [],
      },
      {
        t: "far fa-comments",
        sT: [],
      },
      {
        t: "far fa-comments-alt",
        sT: [],
      },
      {
        t: "far fa-comments-alt-dollar",
        sT: [],
      },
      {
        t: "far fa-comments-dollar",
        sT: [],
      },
      {
        t: "far fa-compact-disc",
        sT: [],
      },
      {
        t: "far fa-compass",
        sT: [],
      },
      {
        t: "far fa-compass-slash",
        sT: [],
      },
      {
        t: "far fa-compress",
        sT: [],
      },
      {
        t: "far fa-compress-alt",
        sT: [],
      },
      {
        t: "far fa-compress-arrows-alt",
        sT: [],
      },
      {
        t: "far fa-compress-wide",
        sT: [],
      },
      {
        t: "far fa-computer-classic",
        sT: [],
      },
      {
        t: "far fa-computer-speaker",
        sT: [],
      },
      {
        t: "far fa-concierge-bell",
        sT: [],
      },
      {
        t: "far fa-construction",
        sT: [],
      },
      {
        t: "far fa-container-storage",
        sT: [],
      },
      {
        t: "far fa-conveyor-belt",
        sT: [],
      },
      {
        t: "far fa-conveyor-belt-alt",
        sT: [],
      },
      {
        t: "far fa-cookie",
        sT: [],
      },
      {
        t: "far fa-cookie-bite",
        sT: [],
      },
      {
        t: "far fa-copy",
        sT: [],
      },
      {
        t: "far fa-copyright",
        sT: [],
      },
      {
        t: "far fa-corn",
        sT: [],
      },
      {
        t: "far fa-couch",
        sT: [],
      },
      {
        t: "far fa-cow",
        sT: [],
      },
      {
        t: "far fa-cowbell",
        sT: [],
      },
      {
        t: "far fa-cowbell-more",
        sT: [],
      },
      {
        t: "far fa-credit-card",
        sT: [],
      },
      {
        t: "far fa-credit-card-blank",
        sT: [],
      },
      {
        t: "far fa-credit-card-front",
        sT: [],
      },
      {
        t: "far fa-cricket",
        sT: [],
      },
      {
        t: "far fa-croissant",
        sT: [],
      },
      {
        t: "far fa-crop",
        sT: [],
      },
      {
        t: "far fa-crop-alt",
        sT: [],
      },
      {
        t: "far fa-cross",
        sT: [],
      },
      {
        t: "far fa-crosshairs",
        sT: [],
      },
      {
        t: "far fa-crow",
        sT: [],
      },
      {
        t: "far fa-crown",
        sT: [],
      },
      {
        t: "far fa-crutch",
        sT: [],
      },
      {
        t: "far fa-crutches",
        sT: [],
      },
      {
        t: "far fa-cube",
        sT: [],
      },
      {
        t: "far fa-cubes",
        sT: [],
      },
      {
        t: "far fa-curling",
        sT: [],
      },
      {
        t: "far fa-cut",
        sT: [],
      },
      {
        t: "far fa-dagger",
        sT: [],
      },
      {
        t: "far fa-database",
        sT: [],
      },
      {
        t: "far fa-deaf",
        sT: [],
      },
      {
        t: "far fa-debug",
        sT: [],
      },
      {
        t: "far fa-deer",
        sT: [],
      },
      {
        t: "far fa-deer-rudolph",
        sT: [],
      },
      {
        t: "far fa-democrat",
        sT: [],
      },
      {
        t: "far fa-desktop",
        sT: [],
      },
      {
        t: "far fa-desktop-alt",
        sT: [],
      },
      {
        t: "far fa-dewpoint",
        sT: [],
      },
      {
        t: "far fa-dharmachakra",
        sT: [],
      },
      {
        t: "far fa-diagnoses",
        sT: [],
      },
      {
        t: "far fa-diamond",
        sT: [],
      },
      {
        t: "far fa-dice",
        sT: [],
      },
      {
        t: "far fa-dice-d10",
        sT: [],
      },
      {
        t: "far fa-dice-d12",
        sT: [],
      },
      {
        t: "far fa-dice-d20",
        sT: [],
      },
      {
        t: "far fa-dice-d4",
        sT: [],
      },
      {
        t: "far fa-dice-d6",
        sT: [],
      },
      {
        t: "far fa-dice-d8",
        sT: [],
      },
      {
        t: "far fa-dice-five",
        sT: [],
      },
      {
        t: "far fa-dice-four",
        sT: [],
      },
      {
        t: "far fa-dice-one",
        sT: [],
      },
      {
        t: "far fa-dice-six",
        sT: [],
      },
      {
        t: "far fa-dice-three",
        sT: [],
      },
      {
        t: "far fa-dice-two",
        sT: [],
      },
      {
        t: "far fa-digging",
        sT: [],
      },
      {
        t: "far fa-digital-tachograph",
        sT: [],
      },
      {
        t: "far fa-diploma",
        sT: [],
      },
      {
        t: "far fa-directions",
        sT: [],
      },
      {
        t: "far fa-disc-drive",
        sT: [],
      },
      {
        t: "far fa-disease",
        sT: [],
      },
      {
        t: "far fa-divide",
        sT: [],
      },
      {
        t: "far fa-dizzy",
        sT: [],
      },
      {
        t: "far fa-dna",
        sT: [],
      },
      {
        t: "far fa-do-not-enter",
        sT: [],
      },
      {
        t: "far fa-dog",
        sT: [],
      },
      {
        t: "far fa-dog-leashed",
        sT: [],
      },
      {
        t: "far fa-dollar-sign",
        sT: [],
      },
      {
        t: "far fa-dolly",
        sT: [],
      },
      {
        t: "far fa-dolly-empty",
        sT: [],
      },
      {
        t: "far fa-dolly-flatbed",
        sT: [],
      },
      {
        t: "far fa-dolly-flatbed-alt",
        sT: [],
      },
      {
        t: "far fa-dolly-flatbed-empty",
        sT: [],
      },
      {
        t: "far fa-donate",
        sT: [],
      },
      {
        t: "far fa-door-closed",
        sT: [],
      },
      {
        t: "far fa-door-open",
        sT: [],
      },
      {
        t: "far fa-dot-circle",
        sT: [],
      },
      {
        t: "far fa-dove",
        sT: [],
      },
      {
        t: "far fa-download",
        sT: [],
      },
      {
        t: "far fa-drafting-compass",
        sT: [],
      },
      {
        t: "far fa-dragon",
        sT: [],
      },
      {
        t: "far fa-draw-circle",
        sT: [],
      },
      {
        t: "far fa-draw-polygon",
        sT: [],
      },
      {
        t: "far fa-draw-square",
        sT: [],
      },
      {
        t: "far fa-dreidel",
        sT: [],
      },
      {
        t: "far fa-drone",
        sT: [],
      },
      {
        t: "far fa-drone-alt",
        sT: [],
      },
      {
        t: "far fa-drum",
        sT: [],
      },
      {
        t: "far fa-drum-steelpan",
        sT: [],
      },
      {
        t: "far fa-drumstick",
        sT: [],
      },
      {
        t: "far fa-drumstick-bite",
        sT: [],
      },
      {
        t: "far fa-dryer",
        sT: [],
      },
      {
        t: "far fa-dryer-alt",
        sT: [],
      },
      {
        t: "far fa-duck",
        sT: [],
      },
      {
        t: "far fa-dumbbell",
        sT: [],
      },
      {
        t: "far fa-dumpster",
        sT: [],
      },
      {
        t: "far fa-dumpster-fire",
        sT: [],
      },
      {
        t: "far fa-dungeon",
        sT: [],
      },
      {
        t: "far fa-ear",
        sT: [],
      },
      {
        t: "far fa-ear-muffs",
        sT: [],
      },
      {
        t: "far fa-eclipse",
        sT: [],
      },
      {
        t: "far fa-eclipse-alt",
        sT: [],
      },
      {
        t: "far fa-edit",
        sT: [],
      },
      {
        t: "far fa-egg",
        sT: [],
      },
      {
        t: "far fa-egg-fried",
        sT: [],
      },
      {
        t: "far fa-eject",
        sT: [],
      },
      {
        t: "far fa-elephant",
        sT: [],
      },
      {
        t: "far fa-ellipsis-h",
        sT: [],
      },
      {
        t: "far fa-ellipsis-h-alt",
        sT: [],
      },
      {
        t: "far fa-ellipsis-v",
        sT: [],
      },
      {
        t: "far fa-ellipsis-v-alt",
        sT: [],
      },
      {
        t: "far fa-empty-set",
        sT: [],
      },
      {
        t: "far fa-engine-warning",
        sT: [],
      },
      {
        t: "far fa-envelope",
        sT: [],
      },
      {
        t: "far fa-envelope-open",
        sT: [],
      },
      {
        t: "far fa-envelope-open-dollar",
        sT: [],
      },
      {
        t: "far fa-envelope-open-text",
        sT: [],
      },
      {
        t: "far fa-envelope-square",
        sT: [],
      },
      {
        t: "far fa-equals",
        sT: [],
      },
      {
        t: "far fa-eraser",
        sT: [],
      },
      {
        t: "far fa-ethernet",
        sT: [],
      },
      {
        t: "far fa-euro-sign",
        sT: [],
      },
      {
        t: "far fa-exchange",
        sT: [],
      },
      {
        t: "far fa-exchange-alt",
        sT: [],
      },
      {
        t: "far fa-exclamation",
        sT: [],
      },
      {
        t: "far fa-exclamation-circle",
        sT: [],
      },
      {
        t: "far fa-exclamation-square",
        sT: [],
      },
      {
        t: "far fa-exclamation-triangle",
        sT: [],
      },
      {
        t: "far fa-expand",
        sT: [],
      },
      {
        t: "far fa-expand-alt",
        sT: [],
      },
      {
        t: "far fa-expand-arrows",
        sT: [],
      },
      {
        t: "far fa-expand-arrows-alt",
        sT: [],
      },
      {
        t: "far fa-expand-wide",
        sT: [],
      },
      {
        t: "far fa-external-link",
        sT: [],
      },
      {
        t: "far fa-external-link-alt",
        sT: [],
      },
      {
        t: "far fa-external-link-square",
        sT: [],
      },
      {
        t: "far fa-external-link-square-alt",
        sT: [],
      },
      {
        t: "far fa-eye",
        sT: [],
      },
      {
        t: "far fa-eye-dropper",
        sT: [],
      },
      {
        t: "far fa-eye-evil",
        sT: [],
      },
      {
        t: "far fa-eye-slash",
        sT: [],
      },
      {
        t: "far fa-fan",
        sT: [],
      },
      {
        t: "far fa-fan-table",
        sT: [],
      },
      {
        t: "far fa-farm",
        sT: [],
      },
      {
        t: "far fa-fast-backward",
        sT: [],
      },
      {
        t: "far fa-fast-forward",
        sT: [],
      },
      {
        t: "far fa-faucet",
        sT: [],
      },
      {
        t: "far fa-faucet-drip",
        sT: [],
      },
      {
        t: "far fa-fax",
        sT: [],
      },
      {
        t: "far fa-feather",
        sT: [],
      },
      {
        t: "far fa-feather-alt",
        sT: [],
      },
      {
        t: "far fa-female",
        sT: [],
      },
      {
        t: "far fa-field-hockey",
        sT: [],
      },
      {
        t: "far fa-fighter-jet",
        sT: [],
      },
      {
        t: "far fa-file",
        sT: [],
      },
      {
        t: "far fa-file-alt",
        sT: [],
      },
      {
        t: "far fa-file-archive",
        sT: [],
      },
      {
        t: "far fa-file-audio",
        sT: [],
      },
      {
        t: "far fa-file-certificate",
        sT: [],
      },
      {
        t: "far fa-file-chart-line",
        sT: [],
      },
      {
        t: "far fa-file-chart-pie",
        sT: [],
      },
      {
        t: "far fa-file-check",
        sT: [],
      },
      {
        t: "far fa-file-code",
        sT: [],
      },
      {
        t: "far fa-file-contract",
        sT: [],
      },
      {
        t: "far fa-file-csv",
        sT: [],
      },
      {
        t: "far fa-file-download",
        sT: [],
      },
      {
        t: "far fa-file-edit",
        sT: [],
      },
      {
        t: "far fa-file-excel",
        sT: [],
      },
      {
        t: "far fa-file-exclamation",
        sT: [],
      },
      {
        t: "far fa-file-export",
        sT: [],
      },
      {
        t: "far fa-file-image",
        sT: [],
      },
      {
        t: "far fa-file-import",
        sT: [],
      },
      {
        t: "far fa-file-invoice",
        sT: [],
      },
      {
        t: "far fa-file-invoice-dollar",
        sT: [],
      },
      {
        t: "far fa-file-medical",
        sT: [],
      },
      {
        t: "far fa-file-medical-alt",
        sT: [],
      },
      {
        t: "far fa-file-minus",
        sT: [],
      },
      {
        t: "far fa-file-music",
        sT: [],
      },
      {
        t: "far fa-file-pdf",
        sT: [],
      },
      {
        t: "far fa-file-plus",
        sT: [],
      },
      {
        t: "far fa-file-powerpoint",
        sT: [],
      },
      {
        t: "far fa-file-prescription",
        sT: [],
      },
      {
        t: "far fa-file-search",
        sT: [],
      },
      {
        t: "far fa-file-signature",
        sT: [],
      },
      {
        t: "far fa-file-spreadsheet",
        sT: [],
      },
      {
        t: "far fa-file-times",
        sT: [],
      },
      {
        t: "far fa-file-upload",
        sT: [],
      },
      {
        t: "far fa-file-user",
        sT: [],
      },
      {
        t: "far fa-file-video",
        sT: [],
      },
      {
        t: "far fa-file-word",
        sT: [],
      },
      {
        t: "far fa-files-medical",
        sT: [],
      },
      {
        t: "far fa-fill",
        sT: [],
      },
      {
        t: "far fa-fill-drip",
        sT: [],
      },
      {
        t: "far fa-film",
        sT: [],
      },
      {
        t: "far fa-film-alt",
        sT: [],
      },
      {
        t: "far fa-film-canister",
        sT: [],
      },
      {
        t: "far fa-filter",
        sT: [],
      },
      {
        t: "far fa-fingerprint",
        sT: [],
      },
      {
        t: "far fa-fire",
        sT: [],
      },
      {
        t: "far fa-fire-alt",
        sT: [],
      },
      {
        t: "far fa-fire-extinguisher",
        sT: [],
      },
      {
        t: "far fa-fire-smoke",
        sT: [],
      },
      {
        t: "far fa-fireplace",
        sT: [],
      },
      {
        t: "far fa-first-aid",
        sT: [],
      },
      {
        t: "far fa-fish",
        sT: [],
      },
      {
        t: "far fa-fish-cooked",
        sT: [],
      },
      {
        t: "far fa-fist-raised",
        sT: [],
      },
      {
        t: "far fa-flag",
        sT: [],
      },
      {
        t: "far fa-flag-alt",
        sT: [],
      },
      {
        t: "far fa-flag-checkered",
        sT: [],
      },
      {
        t: "far fa-flag-usa",
        sT: [],
      },
      {
        t: "far fa-flame",
        sT: [],
      },
      {
        t: "far fa-flashlight",
        sT: [],
      },
      {
        t: "far fa-flask",
        sT: [],
      },
      {
        t: "far fa-flask-poison",
        sT: [],
      },
      {
        t: "far fa-flask-potion",
        sT: [],
      },
      {
        t: "far fa-flower",
        sT: [],
      },
      {
        t: "far fa-flower-daffodil",
        sT: [],
      },
      {
        t: "far fa-flower-tulip",
        sT: [],
      },
      {
        t: "far fa-flushed",
        sT: [],
      },
      {
        t: "far fa-flute",
        sT: [],
      },
      {
        t: "far fa-flux-capacitor",
        sT: [],
      },
      {
        t: "far fa-fog",
        sT: [],
      },
      {
        t: "far fa-folder",
        sT: [],
      },
      {
        t: "far fa-folder-download",
        sT: [],
      },
      {
        t: "far fa-folder-minus",
        sT: [],
      },
      {
        t: "far fa-folder-open",
        sT: [],
      },
      {
        t: "far fa-folder-plus",
        sT: [],
      },
      {
        t: "far fa-folder-times",
        sT: [],
      },
      {
        t: "far fa-folder-tree",
        sT: [],
      },
      {
        t: "far fa-folder-upload",
        sT: [],
      },
      {
        t: "far fa-folders",
        sT: [],
      },
      {
        t: "far fa-font",
        sT: [],
      },
      {
        t: "far fa-font-case",
        sT: [],
      },
      {
        t: "far fa-football-ball",
        sT: [],
      },
      {
        t: "far fa-football-helmet",
        sT: [],
      },
      {
        t: "far fa-forklift",
        sT: [],
      },
      {
        t: "far fa-forward",
        sT: [],
      },
      {
        t: "far fa-fragile",
        sT: [],
      },
      {
        t: "far fa-french-fries",
        sT: [],
      },
      {
        t: "far fa-frog",
        sT: [],
      },
      {
        t: "far fa-frosty-head",
        sT: [],
      },
      {
        t: "far fa-frown",
        sT: [],
      },
      {
        t: "far fa-frown-open",
        sT: [],
      },
      {
        t: "far fa-function",
        sT: [],
      },
      {
        t: "far fa-funnel-dollar",
        sT: [],
      },
      {
        t: "far fa-futbol",
        sT: [],
      },
      {
        t: "far fa-galaxy",
        sT: [],
      },
      {
        t: "far fa-game-board",
        sT: [],
      },
      {
        t: "far fa-game-board-alt",
        sT: [],
      },
      {
        t: "far fa-game-console-handheld",
        sT: [],
      },
      {
        t: "far fa-gamepad",
        sT: [],
      },
      {
        t: "far fa-gamepad-alt",
        sT: [],
      },
      {
        t: "far fa-garage",
        sT: [],
      },
      {
        t: "far fa-garage-car",
        sT: [],
      },
      {
        t: "far fa-garage-open",
        sT: [],
      },
      {
        t: "far fa-gas-pump",
        sT: [],
      },
      {
        t: "far fa-gas-pump-slash",
        sT: [],
      },
      {
        t: "far fa-gavel",
        sT: [],
      },
      {
        t: "far fa-gem",
        sT: [],
      },
      {
        t: "far fa-genderless",
        sT: [],
      },
      {
        t: "far fa-ghost",
        sT: [],
      },
      {
        t: "far fa-gift",
        sT: [],
      },
      {
        t: "far fa-gift-card",
        sT: [],
      },
      {
        t: "far fa-gifts",
        sT: [],
      },
      {
        t: "far fa-gingerbread-man",
        sT: [],
      },
      {
        t: "far fa-glass",
        sT: [],
      },
      {
        t: "far fa-glass-champagne",
        sT: [],
      },
      {
        t: "far fa-glass-cheers",
        sT: [],
      },
      {
        t: "far fa-glass-citrus",
        sT: [],
      },
      {
        t: "far fa-glass-martini",
        sT: [],
      },
      {
        t: "far fa-glass-martini-alt",
        sT: [],
      },
      {
        t: "far fa-glass-whiskey",
        sT: [],
      },
      {
        t: "far fa-glass-whiskey-rocks",
        sT: [],
      },
      {
        t: "far fa-glasses",
        sT: [],
      },
      {
        t: "far fa-glasses-alt",
        sT: [],
      },
      {
        t: "far fa-globe",
        sT: [],
      },
      {
        t: "far fa-globe-africa",
        sT: [],
      },
      {
        t: "far fa-globe-americas",
        sT: [],
      },
      {
        t: "far fa-globe-asia",
        sT: [],
      },
      {
        t: "far fa-globe-europe",
        sT: [],
      },
      {
        t: "far fa-globe-snow",
        sT: [],
      },
      {
        t: "far fa-globe-stand",
        sT: [],
      },
      {
        t: "far fa-golf-ball",
        sT: [],
      },
      {
        t: "far fa-golf-club",
        sT: [],
      },
      {
        t: "far fa-gopuram",
        sT: [],
      },
      {
        t: "far fa-graduation-cap",
        sT: [],
      },
      {
        t: "far fa-gramophone",
        sT: [],
      },
      {
        t: "far fa-greater-than",
        sT: [],
      },
      {
        t: "far fa-greater-than-equal",
        sT: [],
      },
      {
        t: "far fa-grimace",
        sT: [],
      },
      {
        t: "far fa-grin",
        sT: [],
      },
      {
        t: "far fa-grin-alt",
        sT: [],
      },
      {
        t: "far fa-grin-beam",
        sT: [],
      },
      {
        t: "far fa-grin-beam-sweat",
        sT: [],
      },
      {
        t: "far fa-grin-hearts",
        sT: [],
      },
      {
        t: "far fa-grin-squint",
        sT: [],
      },
      {
        t: "far fa-grin-squint-tears",
        sT: [],
      },
      {
        t: "far fa-grin-stars",
        sT: [],
      },
      {
        t: "far fa-grin-tears",
        sT: [],
      },
      {
        t: "far fa-grin-tongue",
        sT: [],
      },
      {
        t: "far fa-grin-tongue-squint",
        sT: [],
      },
      {
        t: "far fa-grin-tongue-wink",
        sT: [],
      },
      {
        t: "far fa-grin-wink",
        sT: [],
      },
      {
        t: "far fa-grip-horizontal",
        sT: [],
      },
      {
        t: "far fa-grip-lines",
        sT: [],
      },
      {
        t: "far fa-grip-lines-vertical",
        sT: [],
      },
      {
        t: "far fa-grip-vertical",
        sT: [],
      },
      {
        t: "far fa-guitar",
        sT: [],
      },
      {
        t: "far fa-guitar-electric",
        sT: [],
      },
      {
        t: "far fa-guitars",
        sT: [],
      },
      {
        t: "far fa-h-square",
        sT: [],
      },
      {
        t: "far fa-h1",
        sT: [],
      },
      {
        t: "far fa-h2",
        sT: [],
      },
      {
        t: "far fa-h3",
        sT: [],
      },
      {
        t: "far fa-h4",
        sT: [],
      },
      {
        t: "far fa-hamburger",
        sT: [],
      },
      {
        t: "far fa-hammer",
        sT: [],
      },
      {
        t: "far fa-hammer-war",
        sT: [],
      },
      {
        t: "far fa-hamsa",
        sT: [],
      },
      {
        t: "far fa-hand-heart",
        sT: [],
      },
      {
        t: "far fa-hand-holding",
        sT: [],
      },
      {
        t: "far fa-hand-holding-box",
        sT: [],
      },
      {
        t: "far fa-hand-holding-heart",
        sT: [],
      },
      {
        t: "far fa-hand-holding-magic",
        sT: [],
      },
      {
        t: "far fa-hand-holding-medical",
        sT: [],
      },
      {
        t: "far fa-hand-holding-seedling",
        sT: [],
      },
      {
        t: "far fa-hand-holding-usd",
        sT: [],
      },
      {
        t: "far fa-hand-holding-water",
        sT: [],
      },
      {
        t: "far fa-hand-lizard",
        sT: [],
      },
      {
        t: "far fa-hand-middle-finger",
        sT: [],
      },
      {
        t: "far fa-hand-paper",
        sT: [],
      },
      {
        t: "far fa-hand-peace",
        sT: [],
      },
      {
        t: "far fa-hand-point-down",
        sT: [],
      },
      {
        t: "far fa-hand-point-left",
        sT: [],
      },
      {
        t: "far fa-hand-point-right",
        sT: [],
      },
      {
        t: "far fa-hand-point-up",
        sT: [],
      },
      {
        t: "far fa-hand-pointer",
        sT: [],
      },
      {
        t: "far fa-hand-receiving",
        sT: [],
      },
      {
        t: "far fa-hand-rock",
        sT: [],
      },
      {
        t: "far fa-hand-scissors",
        sT: [],
      },
      {
        t: "far fa-hand-sparkles",
        sT: [],
      },
      {
        t: "far fa-hand-spock",
        sT: [],
      },
      {
        t: "far fa-hands",
        sT: [],
      },
      {
        t: "far fa-hands-heart",
        sT: [],
      },
      {
        t: "far fa-hands-helping",
        sT: [],
      },
      {
        t: "far fa-hands-usd",
        sT: [],
      },
      {
        t: "far fa-hands-wash",
        sT: [],
      },
      {
        t: "far fa-handshake",
        sT: [],
      },
      {
        t: "far fa-handshake-alt",
        sT: [],
      },
      {
        t: "far fa-handshake-alt-slash",
        sT: [],
      },
      {
        t: "far fa-handshake-slash",
        sT: [],
      },
      {
        t: "far fa-hanukiah",
        sT: [],
      },
      {
        t: "far fa-hard-hat",
        sT: [],
      },
      {
        t: "far fa-hashtag",
        sT: [],
      },
      {
        t: "far fa-hat-chef",
        sT: [],
      },
      {
        t: "far fa-hat-cowboy",
        sT: [],
      },
      {
        t: "far fa-hat-cowboy-side",
        sT: [],
      },
      {
        t: "far fa-hat-santa",
        sT: [],
      },
      {
        t: "far fa-hat-winter",
        sT: [],
      },
      {
        t: "far fa-hat-witch",
        sT: [],
      },
      {
        t: "far fa-hat-wizard",
        sT: [],
      },
      {
        t: "far fa-hdd",
        sT: [],
      },
      {
        t: "far fa-head-side",
        sT: [],
      },
      {
        t: "far fa-head-side-brain",
        sT: [],
      },
      {
        t: "far fa-head-side-cough",
        sT: [],
      },
      {
        t: "far fa-head-side-cough-slash",
        sT: [],
      },
      {
        t: "far fa-head-side-headphones",
        sT: [],
      },
      {
        t: "far fa-head-side-mask",
        sT: [],
      },
      {
        t: "far fa-head-side-medical",
        sT: [],
      },
      {
        t: "far fa-head-side-virus",
        sT: [],
      },
      {
        t: "far fa-head-vr",
        sT: [],
      },
      {
        t: "far fa-heading",
        sT: [],
      },
      {
        t: "far fa-headphones",
        sT: [],
      },
      {
        t: "far fa-headphones-alt",
        sT: [],
      },
      {
        t: "far fa-headset",
        sT: [],
      },
      {
        t: "far fa-heart",
        sT: [],
      },
      {
        t: "far fa-heart-broken",
        sT: [],
      },
      {
        t: "far fa-heart-circle",
        sT: [],
      },
      {
        t: "far fa-heart-rate",
        sT: [],
      },
      {
        t: "far fa-heart-square",
        sT: [],
      },
      {
        t: "far fa-heartbeat",
        sT: [],
      },
      {
        t: "far fa-heat",
        sT: [],
      },
      {
        t: "far fa-helicopter",
        sT: [],
      },
      {
        t: "far fa-helmet-battle",
        sT: [],
      },
      {
        t: "far fa-hexagon",
        sT: [],
      },
      {
        t: "far fa-highlighter",
        sT: [],
      },
      {
        t: "far fa-hiking",
        sT: [],
      },
      {
        t: "far fa-hippo",
        sT: [],
      },
      {
        t: "far fa-history",
        sT: [],
      },
      {
        t: "far fa-hockey-mask",
        sT: [],
      },
      {
        t: "far fa-hockey-puck",
        sT: [],
      },
      {
        t: "far fa-hockey-sticks",
        sT: [],
      },
      {
        t: "far fa-holly-berry",
        sT: [],
      },
      {
        t: "far fa-home",
        sT: [],
      },
      {
        t: "far fa-home-alt",
        sT: [],
      },
      {
        t: "far fa-home-heart",
        sT: [],
      },
      {
        t: "far fa-home-lg",
        sT: [],
      },
      {
        t: "far fa-home-lg-alt",
        sT: [],
      },
      {
        t: "far fa-hood-cloak",
        sT: [],
      },
      {
        t: "far fa-horizontal-rule",
        sT: [],
      },
      {
        t: "far fa-horse",
        sT: [],
      },
      {
        t: "far fa-horse-head",
        sT: [],
      },
      {
        t: "far fa-horse-saddle",
        sT: [],
      },
      {
        t: "far fa-hospital",
        sT: [],
      },
      {
        t: "far fa-hospital-alt",
        sT: [],
      },
      {
        t: "far fa-hospital-symbol",
        sT: [],
      },
      {
        t: "far fa-hospital-user",
        sT: [],
      },
      {
        t: "far fa-hospitals",
        sT: [],
      },
      {
        t: "far fa-hot-tub",
        sT: [],
      },
      {
        t: "far fa-hotdog",
        sT: [],
      },
      {
        t: "far fa-hotel",
        sT: [],
      },
      {
        t: "far fa-hourglass",
        sT: [],
      },
      {
        t: "far fa-hourglass-end",
        sT: [],
      },
      {
        t: "far fa-hourglass-half",
        sT: [],
      },
      {
        t: "far fa-hourglass-start",
        sT: [],
      },
      {
        t: "far fa-house",
        sT: [],
      },
      {
        t: "far fa-house-damage",
        sT: [],
      },
      {
        t: "far fa-house-day",
        sT: [],
      },
      {
        t: "far fa-house-flood",
        sT: [],
      },
      {
        t: "far fa-house-leave",
        sT: [],
      },
      {
        t: "far fa-house-night",
        sT: [],
      },
      {
        t: "far fa-house-return",
        sT: [],
      },
      {
        t: "far fa-house-signal",
        sT: [],
      },
      {
        t: "far fa-house-user",
        sT: [],
      },
      {
        t: "far fa-hryvnia",
        sT: [],
      },
      {
        t: "far fa-humidity",
        sT: [],
      },
      {
        t: "far fa-hurricane",
        sT: [],
      },
      {
        t: "far fa-i-cursor",
        sT: [],
      },
      {
        t: "far fa-ice-cream",
        sT: [],
      },
      {
        t: "far fa-ice-skate",
        sT: [],
      },
      {
        t: "far fa-icicles",
        sT: [],
      },
      {
        t: "far fa-icons",
        sT: [],
      },
      {
        t: "far fa-icons-alt",
        sT: [],
      },
      {
        t: "far fa-id-badge",
        sT: [],
      },
      {
        t: "far fa-id-card",
        sT: [],
      },
      {
        t: "far fa-id-card-alt",
        sT: [],
      },
      {
        t: "far fa-igloo",
        sT: [],
      },
      {
        t: "far fa-image",
        sT: [],
      },
      {
        t: "far fa-image-polaroid",
        sT: [],
      },
      {
        t: "far fa-images",
        sT: [],
      },
      {
        t: "far fa-inbox",
        sT: [],
      },
      {
        t: "far fa-inbox-in",
        sT: [],
      },
      {
        t: "far fa-inbox-out",
        sT: [],
      },
      {
        t: "far fa-indent",
        sT: [],
      },
      {
        t: "far fa-industry",
        sT: [],
      },
      {
        t: "far fa-industry-alt",
        sT: [],
      },
      {
        t: "far fa-infinity",
        sT: [],
      },
      {
        t: "far fa-info",
        sT: [],
      },
      {
        t: "far fa-info-circle",
        sT: [],
      },
      {
        t: "far fa-info-square",
        sT: [],
      },
      {
        t: "far fa-inhaler",
        sT: [],
      },
      {
        t: "far fa-integral",
        sT: [],
      },
      {
        t: "far fa-intersection",
        sT: [],
      },
      {
        t: "far fa-inventory",
        sT: [],
      },
      {
        t: "far fa-island-tropical",
        sT: [],
      },
      {
        t: "far fa-italic",
        sT: [],
      },
      {
        t: "far fa-jack-o-lantern",
        sT: [],
      },
      {
        t: "far fa-jedi",
        sT: [],
      },
      {
        t: "far fa-joint",
        sT: [],
      },
      {
        t: "far fa-journal-whills",
        sT: [],
      },
      {
        t: "far fa-joystick",
        sT: [],
      },
      {
        t: "far fa-jug",
        sT: [],
      },
      {
        t: "far fa-kaaba",
        sT: [],
      },
      {
        t: "far fa-kazoo",
        sT: [],
      },
      {
        t: "far fa-kerning",
        sT: [],
      },
      {
        t: "far fa-key",
        sT: [],
      },
      {
        t: "far fa-key-skeleton",
        sT: [],
      },
      {
        t: "far fa-keyboard",
        sT: [],
      },
      {
        t: "far fa-keynote",
        sT: [],
      },
      {
        t: "far fa-khanda",
        sT: [],
      },
      {
        t: "far fa-kidneys",
        sT: [],
      },
      {
        t: "far fa-kiss",
        sT: [],
      },
      {
        t: "far fa-kiss-beam",
        sT: [],
      },
      {
        t: "far fa-kiss-wink-heart",
        sT: [],
      },
      {
        t: "far fa-kite",
        sT: [],
      },
      {
        t: "far fa-kiwi-bird",
        sT: [],
      },
      {
        t: "far fa-knife-kitchen",
        sT: [],
      },
      {
        t: "far fa-lambda",
        sT: [],
      },
      {
        t: "far fa-lamp",
        sT: [],
      },
      {
        t: "far fa-lamp-desk",
        sT: [],
      },
      {
        t: "far fa-lamp-floor",
        sT: [],
      },
      {
        t: "far fa-landmark",
        sT: [],
      },
      {
        t: "far fa-landmark-alt",
        sT: [],
      },
      {
        t: "far fa-language",
        sT: [],
      },
      {
        t: "far fa-laptop",
        sT: [],
      },
      {
        t: "far fa-laptop-code",
        sT: [],
      },
      {
        t: "far fa-laptop-house",
        sT: [],
      },
      {
        t: "far fa-laptop-medical",
        sT: [],
      },
      {
        t: "far fa-lasso",
        sT: [],
      },
      {
        t: "far fa-laugh",
        sT: [],
      },
      {
        t: "far fa-laugh-beam",
        sT: [],
      },
      {
        t: "far fa-laugh-squint",
        sT: [],
      },
      {
        t: "far fa-laugh-wink",
        sT: [],
      },
      {
        t: "far fa-layer-group",
        sT: [],
      },
      {
        t: "far fa-layer-minus",
        sT: [],
      },
      {
        t: "far fa-layer-plus",
        sT: [],
      },
      {
        t: "far fa-leaf",
        sT: [],
      },
      {
        t: "far fa-leaf-heart",
        sT: [],
      },
      {
        t: "far fa-leaf-maple",
        sT: [],
      },
      {
        t: "far fa-leaf-oak",
        sT: [],
      },
      {
        t: "far fa-lemon",
        sT: [],
      },
      {
        t: "far fa-less-than",
        sT: [],
      },
      {
        t: "far fa-less-than-equal",
        sT: [],
      },
      {
        t: "far fa-level-down",
        sT: [],
      },
      {
        t: "far fa-level-down-alt",
        sT: [],
      },
      {
        t: "far fa-level-up",
        sT: [],
      },
      {
        t: "far fa-level-up-alt",
        sT: [],
      },
      {
        t: "far fa-life-ring",
        sT: [],
      },
      {
        t: "far fa-light-ceiling",
        sT: [],
      },
      {
        t: "far fa-light-switch",
        sT: [],
      },
      {
        t: "far fa-light-switch-off",
        sT: [],
      },
      {
        t: "far fa-light-switch-on",
        sT: [],
      },
      {
        t: "far fa-lightbulb",
        sT: [],
      },
      {
        t: "far fa-lightbulb-dollar",
        sT: [],
      },
      {
        t: "far fa-lightbulb-exclamation",
        sT: [],
      },
      {
        t: "far fa-lightbulb-on",
        sT: [],
      },
      {
        t: "far fa-lightbulb-slash",
        sT: [],
      },
      {
        t: "far fa-lights-holiday",
        sT: [],
      },
      {
        t: "far fa-line-columns",
        sT: [],
      },
      {
        t: "far fa-line-height",
        sT: [],
      },
      {
        t: "far fa-link",
        sT: [],
      },
      {
        t: "far fa-lips",
        sT: [],
      },
      {
        t: "far fa-lira-sign",
        sT: [],
      },
      {
        t: "far fa-list",
        sT: [],
      },
      {
        t: "far fa-list-alt",
        sT: [],
      },
      {
        t: "far fa-list-music",
        sT: [],
      },
      {
        t: "far fa-list-ol",
        sT: [],
      },
      {
        t: "far fa-list-ul",
        sT: [],
      },
      {
        t: "far fa-location",
        sT: [],
      },
      {
        t: "far fa-location-arrow",
        sT: [],
      },
      {
        t: "far fa-location-circle",
        sT: [],
      },
      {
        t: "far fa-location-slash",
        sT: [],
      },
      {
        t: "far fa-lock",
        sT: [],
      },
      {
        t: "far fa-lock-alt",
        sT: [],
      },
      {
        t: "far fa-lock-open",
        sT: [],
      },
      {
        t: "far fa-lock-open-alt",
        sT: [],
      },
      {
        t: "far fa-long-arrow-alt-down",
        sT: [],
      },
      {
        t: "far fa-long-arrow-alt-left",
        sT: [],
      },
      {
        t: "far fa-long-arrow-alt-right",
        sT: [],
      },
      {
        t: "far fa-long-arrow-alt-up",
        sT: [],
      },
      {
        t: "far fa-long-arrow-down",
        sT: [],
      },
      {
        t: "far fa-long-arrow-left",
        sT: [],
      },
      {
        t: "far fa-long-arrow-right",
        sT: [],
      },
      {
        t: "far fa-long-arrow-up",
        sT: [],
      },
      {
        t: "far fa-loveseat",
        sT: [],
      },
      {
        t: "far fa-low-vision",
        sT: [],
      },
      {
        t: "far fa-luchador",
        sT: [],
      },
      {
        t: "far fa-luggage-cart",
        sT: [],
      },
      {
        t: "far fa-lungs",
        sT: [],
      },
      {
        t: "far fa-lungs-virus",
        sT: [],
      },
      {
        t: "far fa-mace",
        sT: [],
      },
      {
        t: "far fa-magic",
        sT: [],
      },
      {
        t: "far fa-magnet",
        sT: [],
      },
      {
        t: "far fa-mail-bulk",
        sT: [],
      },
      {
        t: "far fa-mailbox",
        sT: [],
      },
      {
        t: "far fa-male",
        sT: [],
      },
      {
        t: "far fa-mandolin",
        sT: [],
      },
      {
        t: "far fa-map",
        sT: [],
      },
      {
        t: "far fa-map-marked",
        sT: [],
      },
      {
        t: "far fa-map-marked-alt",
        sT: [],
      },
      {
        t: "far fa-map-marker",
        sT: [],
      },
      {
        t: "far fa-map-marker-alt",
        sT: [],
      },
      {
        t: "far fa-map-marker-alt-slash",
        sT: [],
      },
      {
        t: "far fa-map-marker-check",
        sT: [],
      },
      {
        t: "far fa-map-marker-edit",
        sT: [],
      },
      {
        t: "far fa-map-marker-exclamation",
        sT: [],
      },
      {
        t: "far fa-map-marker-minus",
        sT: [],
      },
      {
        t: "far fa-map-marker-plus",
        sT: [],
      },
      {
        t: "far fa-map-marker-question",
        sT: [],
      },
      {
        t: "far fa-map-marker-slash",
        sT: [],
      },
      {
        t: "far fa-map-marker-smile",
        sT: [],
      },
      {
        t: "far fa-map-marker-times",
        sT: [],
      },
      {
        t: "far fa-map-pin",
        sT: [],
      },
      {
        t: "far fa-map-signs",
        sT: [],
      },
      {
        t: "far fa-marker",
        sT: [],
      },
      {
        t: "far fa-mars",
        sT: [],
      },
      {
        t: "far fa-mars-double",
        sT: [],
      },
      {
        t: "far fa-mars-stroke",
        sT: [],
      },
      {
        t: "far fa-mars-stroke-h",
        sT: [],
      },
      {
        t: "far fa-mars-stroke-v",
        sT: [],
      },
      {
        t: "far fa-mask",
        sT: [],
      },
      {
        t: "far fa-meat",
        sT: [],
      },
      {
        t: "far fa-medal",
        sT: [],
      },
      {
        t: "far fa-medkit",
        sT: [],
      },
      {
        t: "far fa-megaphone",
        sT: [],
      },
      {
        t: "far fa-meh",
        sT: [],
      },
      {
        t: "far fa-meh-blank",
        sT: [],
      },
      {
        t: "far fa-meh-rolling-eyes",
        sT: [],
      },
      {
        t: "far fa-memory",
        sT: [],
      },
      {
        t: "far fa-menorah",
        sT: [],
      },
      {
        t: "far fa-mercury",
        sT: [],
      },
      {
        t: "far fa-meteor",
        sT: [],
      },
      {
        t: "far fa-microchip",
        sT: [],
      },
      {
        t: "far fa-microphone",
        sT: [],
      },
      {
        t: "far fa-microphone-alt",
        sT: [],
      },
      {
        t: "far fa-microphone-alt-slash",
        sT: [],
      },
      {
        t: "far fa-microphone-slash",
        sT: [],
      },
      {
        t: "far fa-microphone-stand",
        sT: [],
      },
      {
        t: "far fa-microscope",
        sT: [],
      },
      {
        t: "far fa-microwave",
        sT: [],
      },
      {
        t: "far fa-mind-share",
        sT: [],
      },
      {
        t: "far fa-minus",
        sT: [],
      },
      {
        t: "far fa-minus-circle",
        sT: [],
      },
      {
        t: "far fa-minus-hexagon",
        sT: [],
      },
      {
        t: "far fa-minus-octagon",
        sT: [],
      },
      {
        t: "far fa-minus-square",
        sT: [],
      },
      {
        t: "far fa-mistletoe",
        sT: [],
      },
      {
        t: "far fa-mitten",
        sT: [],
      },
      {
        t: "far fa-mobile",
        sT: [],
      },
      {
        t: "far fa-mobile-alt",
        sT: [],
      },
      {
        t: "far fa-mobile-android",
        sT: [],
      },
      {
        t: "far fa-mobile-android-alt",
        sT: [],
      },
      {
        t: "far fa-money-bill",
        sT: [],
      },
      {
        t: "far fa-money-bill-alt",
        sT: [],
      },
      {
        t: "far fa-money-bill-wave",
        sT: [],
      },
      {
        t: "far fa-money-bill-wave-alt",
        sT: [],
      },
      {
        t: "far fa-money-check",
        sT: [],
      },
      {
        t: "far fa-money-check-alt",
        sT: [],
      },
      {
        t: "far fa-money-check-edit",
        sT: [],
      },
      {
        t: "far fa-money-check-edit-alt",
        sT: [],
      },
      {
        t: "far fa-monitor-heart-rate",
        sT: [],
      },
      {
        t: "far fa-monkey",
        sT: [],
      },
      {
        t: "far fa-monument",
        sT: [],
      },
      {
        t: "far fa-moon",
        sT: [],
      },
      {
        t: "far fa-moon-cloud",
        sT: [],
      },
      {
        t: "far fa-moon-stars",
        sT: [],
      },
      {
        t: "far fa-mortar-pestle",
        sT: [],
      },
      {
        t: "far fa-mosque",
        sT: [],
      },
      {
        t: "far fa-motorcycle",
        sT: [],
      },
      {
        t: "far fa-mountain",
        sT: [],
      },
      {
        t: "far fa-mountains",
        sT: [],
      },
      {
        t: "far fa-mouse",
        sT: [],
      },
      {
        t: "far fa-mouse-alt",
        sT: [],
      },
      {
        t: "far fa-mouse-pointer",
        sT: [],
      },
      {
        t: "far fa-mp3-player",
        sT: [],
      },
      {
        t: "far fa-mug",
        sT: [],
      },
      {
        t: "far fa-mug-hot",
        sT: [],
      },
      {
        t: "far fa-mug-marshmallows",
        sT: [],
      },
      {
        t: "far fa-mug-tea",
        sT: [],
      },
      {
        t: "far fa-music",
        sT: [],
      },
      {
        t: "far fa-music-alt",
        sT: [],
      },
      {
        t: "far fa-music-alt-slash",
        sT: [],
      },
      {
        t: "far fa-music-slash",
        sT: [],
      },
      {
        t: "far fa-narwhal",
        sT: [],
      },
      {
        t: "far fa-network-wired",
        sT: [],
      },
      {
        t: "far fa-neuter",
        sT: [],
      },
      {
        t: "far fa-newspaper",
        sT: [],
      },
      {
        t: "far fa-not-equal",
        sT: [],
      },
      {
        t: "far fa-notes-medical",
        sT: [],
      },
      {
        t: "far fa-object-group",
        sT: [],
      },
      {
        t: "far fa-object-ungroup",
        sT: [],
      },
      {
        t: "far fa-octagon",
        sT: [],
      },
      {
        t: "far fa-oil-can",
        sT: [],
      },
      {
        t: "far fa-oil-temp",
        sT: [],
      },
      {
        t: "far fa-om",
        sT: [],
      },
      {
        t: "far fa-omega",
        sT: [],
      },
      {
        t: "far fa-ornament",
        sT: [],
      },
      {
        t: "far fa-otter",
        sT: [],
      },
      {
        t: "far fa-outdent",
        sT: [],
      },
      {
        t: "far fa-outlet",
        sT: [],
      },
      {
        t: "far fa-oven",
        sT: [],
      },
      {
        t: "far fa-overline",
        sT: [],
      },
      {
        t: "far fa-page-break",
        sT: [],
      },
      {
        t: "far fa-pager",
        sT: [],
      },
      {
        t: "far fa-paint-brush",
        sT: [],
      },
      {
        t: "far fa-paint-brush-alt",
        sT: [],
      },
      {
        t: "far fa-paint-roller",
        sT: [],
      },
      {
        t: "far fa-palette",
        sT: [],
      },
      {
        t: "far fa-pallet",
        sT: [],
      },
      {
        t: "far fa-pallet-alt",
        sT: [],
      },
      {
        t: "far fa-paper-plane",
        sT: [],
      },
      {
        t: "far fa-paperclip",
        sT: [],
      },
      {
        t: "far fa-parachute-box",
        sT: [],
      },
      {
        t: "far fa-paragraph",
        sT: [],
      },
      {
        t: "far fa-paragraph-rtl",
        sT: [],
      },
      {
        t: "far fa-parking",
        sT: [],
      },
      {
        t: "far fa-parking-circle",
        sT: [],
      },
      {
        t: "far fa-parking-circle-slash",
        sT: [],
      },
      {
        t: "far fa-parking-slash",
        sT: [],
      },
      {
        t: "far fa-passport",
        sT: [],
      },
      {
        t: "far fa-pastafarianism",
        sT: [],
      },
      {
        t: "far fa-paste",
        sT: [],
      },
      {
        t: "far fa-pause",
        sT: [],
      },
      {
        t: "far fa-pause-circle",
        sT: [],
      },
      {
        t: "far fa-paw",
        sT: [],
      },
      {
        t: "far fa-paw-alt",
        sT: [],
      },
      {
        t: "far fa-paw-claws",
        sT: [],
      },
      {
        t: "far fa-peace",
        sT: [],
      },
      {
        t: "far fa-pegasus",
        sT: [],
      },
      {
        t: "far fa-pen",
        sT: [],
      },
      {
        t: "far fa-pen-alt",
        sT: [],
      },
      {
        t: "far fa-pen-fancy",
        sT: [],
      },
      {
        t: "far fa-pen-nib",
        sT: [],
      },
      {
        t: "far fa-pen-square",
        sT: [],
      },
      {
        t: "far fa-pencil",
        sT: [],
      },
      {
        t: "far fa-pencil-alt",
        sT: [],
      },
      {
        t: "far fa-pencil-paintbrush",
        sT: [],
      },
      {
        t: "far fa-pencil-ruler",
        sT: [],
      },
      {
        t: "far fa-pennant",
        sT: [],
      },
      {
        t: "far fa-people-arrows",
        sT: [],
      },
      {
        t: "far fa-people-carry",
        sT: [],
      },
      {
        t: "far fa-pepper-hot",
        sT: [],
      },
      {
        t: "far fa-percent",
        sT: [],
      },
      {
        t: "far fa-percentage",
        sT: [],
      },
      {
        t: "far fa-person-booth",
        sT: [],
      },
      {
        t: "far fa-person-carry",
        sT: [],
      },
      {
        t: "far fa-person-dolly",
        sT: [],
      },
      {
        t: "far fa-person-dolly-empty",
        sT: [],
      },
      {
        t: "far fa-person-sign",
        sT: [],
      },
      {
        t: "far fa-phone",
        sT: [],
      },
      {
        t: "far fa-phone-alt",
        sT: [],
      },
      {
        t: "far fa-phone-laptop",
        sT: [],
      },
      {
        t: "far fa-phone-office",
        sT: [],
      },
      {
        t: "far fa-phone-plus",
        sT: [],
      },
      {
        t: "far fa-phone-rotary",
        sT: [],
      },
      {
        t: "far fa-phone-slash",
        sT: [],
      },
      {
        t: "far fa-phone-square",
        sT: [],
      },
      {
        t: "far fa-phone-square-alt",
        sT: [],
      },
      {
        t: "far fa-phone-volume",
        sT: [],
      },
      {
        t: "far fa-photo-video",
        sT: [],
      },
      {
        t: "far fa-pi",
        sT: [],
      },
      {
        t: "far fa-piano",
        sT: [],
      },
      {
        t: "far fa-piano-keyboard",
        sT: [],
      },
      {
        t: "far fa-pie",
        sT: [],
      },
      {
        t: "far fa-pig",
        sT: [],
      },
      {
        t: "far fa-piggy-bank",
        sT: [],
      },
      {
        t: "far fa-pills",
        sT: [],
      },
      {
        t: "far fa-pizza",
        sT: [],
      },
      {
        t: "far fa-pizza-slice",
        sT: [],
      },
      {
        t: "far fa-place-of-worship",
        sT: [],
      },
      {
        t: "far fa-plane",
        sT: [],
      },
      {
        t: "far fa-plane-alt",
        sT: [],
      },
      {
        t: "far fa-plane-arrival",
        sT: [],
      },
      {
        t: "far fa-plane-departure",
        sT: [],
      },
      {
        t: "far fa-plane-slash",
        sT: [],
      },
      {
        t: "far fa-planet-moon",
        sT: [],
      },
      {
        t: "far fa-planet-ringed",
        sT: [],
      },
      {
        t: "far fa-play",
        sT: [],
      },
      {
        t: "far fa-play-circle",
        sT: [],
      },
      {
        t: "far fa-plug",
        sT: [],
      },
      {
        t: "far fa-plus",
        sT: [],
      },
      {
        t: "far fa-plus-circle",
        sT: [],
      },
      {
        t: "far fa-plus-hexagon",
        sT: [],
      },
      {
        t: "far fa-plus-octagon",
        sT: [],
      },
      {
        t: "far fa-plus-square",
        sT: [],
      },
      {
        t: "far fa-podcast",
        sT: [],
      },
      {
        t: "far fa-podium",
        sT: [],
      },
      {
        t: "far fa-podium-star",
        sT: [],
      },
      {
        t: "far fa-police-box",
        sT: [],
      },
      {
        t: "far fa-poll",
        sT: [],
      },
      {
        t: "far fa-poll-h",
        sT: [],
      },
      {
        t: "far fa-poll-people",
        sT: [],
      },
      {
        t: "far fa-poo",
        sT: [],
      },
      {
        t: "far fa-poo-storm",
        sT: [],
      },
      {
        t: "far fa-poop",
        sT: [],
      },
      {
        t: "far fa-popcorn",
        sT: [],
      },
      {
        t: "far fa-portal-enter",
        sT: [],
      },
      {
        t: "far fa-portal-exit",
        sT: [],
      },
      {
        t: "far fa-portrait",
        sT: [],
      },
      {
        t: "far fa-pound-sign",
        sT: [],
      },
      {
        t: "far fa-power-off",
        sT: [],
      },
      {
        t: "far fa-pray",
        sT: [],
      },
      {
        t: "far fa-praying-hands",
        sT: [],
      },
      {
        t: "far fa-prescription",
        sT: [],
      },
      {
        t: "far fa-prescription-bottle",
        sT: [],
      },
      {
        t: "far fa-prescription-bottle-alt",
        sT: [],
      },
      {
        t: "far fa-presentation",
        sT: [],
      },
      {
        t: "far fa-print",
        sT: [],
      },
      {
        t: "far fa-print-search",
        sT: [],
      },
      {
        t: "far fa-print-slash",
        sT: [],
      },
      {
        t: "far fa-procedures",
        sT: [],
      },
      {
        t: "far fa-project-diagram",
        sT: [],
      },
      {
        t: "far fa-projector",
        sT: [],
      },
      {
        t: "far fa-pump-medical",
        sT: [],
      },
      {
        t: "far fa-pump-soap",
        sT: [],
      },
      {
        t: "far fa-pumpkin",
        sT: [],
      },
      {
        t: "far fa-puzzle-piece",
        sT: [],
      },
      {
        t: "far fa-qrcode",
        sT: [],
      },
      {
        t: "far fa-question",
        sT: [],
      },
      {
        t: "far fa-question-circle",
        sT: [],
      },
      {
        t: "far fa-question-square",
        sT: [],
      },
      {
        t: "far fa-quidditch",
        sT: [],
      },
      {
        t: "far fa-quote-left",
        sT: [],
      },
      {
        t: "far fa-quote-right",
        sT: [],
      },
      {
        t: "far fa-quran",
        sT: [],
      },
      {
        t: "far fa-rabbit",
        sT: [],
      },
      {
        t: "far fa-rabbit-fast",
        sT: [],
      },
      {
        t: "far fa-racquet",
        sT: [],
      },
      {
        t: "far fa-radar",
        sT: [],
      },
      {
        t: "far fa-radiation",
        sT: [],
      },
      {
        t: "far fa-radiation-alt",
        sT: [],
      },
      {
        t: "far fa-radio",
        sT: [],
      },
      {
        t: "far fa-radio-alt",
        sT: [],
      },
      {
        t: "far fa-rainbow",
        sT: [],
      },
      {
        t: "far fa-raindrops",
        sT: [],
      },
      {
        t: "far fa-ram",
        sT: [],
      },
      {
        t: "far fa-ramp-loading",
        sT: [],
      },
      {
        t: "far fa-random",
        sT: [],
      },
      {
        t: "far fa-raygun",
        sT: [],
      },
      {
        t: "far fa-receipt",
        sT: [],
      },
      {
        t: "far fa-record-vinyl",
        sT: [],
      },
      {
        t: "far fa-rectangle-landscape",
        sT: [],
      },
      {
        t: "far fa-rectangle-portrait",
        sT: [],
      },
      {
        t: "far fa-rectangle-wide",
        sT: [],
      },
      {
        t: "far fa-recycle",
        sT: [],
      },
      {
        t: "far fa-redo",
        sT: [],
      },
      {
        t: "far fa-redo-alt",
        sT: [],
      },
      {
        t: "far fa-refrigerator",
        sT: [],
      },
      {
        t: "far fa-registered",
        sT: [],
      },
      {
        t: "far fa-remove-format",
        sT: [],
      },
      {
        t: "far fa-repeat",
        sT: [],
      },
      {
        t: "far fa-repeat-1",
        sT: [],
      },
      {
        t: "far fa-repeat-1-alt",
        sT: [],
      },
      {
        t: "far fa-repeat-alt",
        sT: [],
      },
      {
        t: "far fa-reply",
        sT: [],
      },
      {
        t: "far fa-reply-all",
        sT: [],
      },
      {
        t: "far fa-republican",
        sT: [],
      },
      {
        t: "far fa-restroom",
        sT: [],
      },
      {
        t: "far fa-retweet",
        sT: [],
      },
      {
        t: "far fa-retweet-alt",
        sT: [],
      },
      {
        t: "far fa-ribbon",
        sT: [],
      },
      {
        t: "far fa-ring",
        sT: [],
      },
      {
        t: "far fa-rings-wedding",
        sT: [],
      },
      {
        t: "far fa-road",
        sT: [],
      },
      {
        t: "far fa-robot",
        sT: [],
      },
      {
        t: "far fa-rocket",
        sT: [],
      },
      {
        t: "far fa-rocket-launch",
        sT: [],
      },
      {
        t: "far fa-route",
        sT: [],
      },
      {
        t: "far fa-route-highway",
        sT: [],
      },
      {
        t: "far fa-route-interstate",
        sT: [],
      },
      {
        t: "far fa-router",
        sT: [],
      },
      {
        t: "far fa-rss",
        sT: [],
      },
      {
        t: "far fa-rss-square",
        sT: [],
      },
      {
        t: "far fa-ruble-sign",
        sT: [],
      },
      {
        t: "far fa-ruler",
        sT: [],
      },
      {
        t: "far fa-ruler-combined",
        sT: [],
      },
      {
        t: "far fa-ruler-horizontal",
        sT: [],
      },
      {
        t: "far fa-ruler-triangle",
        sT: [],
      },
      {
        t: "far fa-ruler-vertical",
        sT: [],
      },
      {
        t: "far fa-running",
        sT: [],
      },
      {
        t: "far fa-rupee-sign",
        sT: [],
      },
      {
        t: "far fa-rv",
        sT: [],
      },
      {
        t: "far fa-sack",
        sT: [],
      },
      {
        t: "far fa-sack-dollar",
        sT: [],
      },
      {
        t: "far fa-sad-cry",
        sT: [],
      },
      {
        t: "far fa-sad-tear",
        sT: [],
      },
      {
        t: "far fa-salad",
        sT: [],
      },
      {
        t: "far fa-sandwich",
        sT: [],
      },
      {
        t: "far fa-satellite",
        sT: [],
      },
      {
        t: "far fa-satellite-dish",
        sT: [],
      },
      {
        t: "far fa-sausage",
        sT: [],
      },
      {
        t: "far fa-save",
        sT: [],
      },
      {
        t: "far fa-sax-hot",
        sT: [],
      },
      {
        t: "far fa-saxophone",
        sT: [],
      },
      {
        t: "far fa-scalpel",
        sT: [],
      },
      {
        t: "far fa-scalpel-path",
        sT: [],
      },
      {
        t: "far fa-scanner",
        sT: [],
      },
      {
        t: "far fa-scanner-image",
        sT: [],
      },
      {
        t: "far fa-scanner-keyboard",
        sT: [],
      },
      {
        t: "far fa-scanner-touchscreen",
        sT: [],
      },
      {
        t: "far fa-scarecrow",
        sT: [],
      },
      {
        t: "far fa-scarf",
        sT: [],
      },
      {
        t: "far fa-school",
        sT: [],
      },
      {
        t: "far fa-screwdriver",
        sT: [],
      },
      {
        t: "far fa-scroll",
        sT: [],
      },
      {
        t: "far fa-scroll-old",
        sT: [],
      },
      {
        t: "far fa-scrubber",
        sT: [],
      },
      {
        t: "far fa-scythe",
        sT: [],
      },
      {
        t: "far fa-sd-card",
        sT: [],
      },
      {
        t: "far fa-search",
        sT: [],
      },
      {
        t: "far fa-search-dollar",
        sT: [],
      },
      {
        t: "far fa-search-location",
        sT: [],
      },
      {
        t: "far fa-search-minus",
        sT: [],
      },
      {
        t: "far fa-search-plus",
        sT: [],
      },
      {
        t: "far fa-seedling",
        sT: [],
      },
      {
        t: "far fa-send-back",
        sT: [],
      },
      {
        t: "far fa-send-backward",
        sT: [],
      },
      {
        t: "far fa-sensor",
        sT: [],
      },
      {
        t: "far fa-sensor-alert",
        sT: [],
      },
      {
        t: "far fa-sensor-fire",
        sT: [],
      },
      {
        t: "far fa-sensor-on",
        sT: [],
      },
      {
        t: "far fa-sensor-smoke",
        sT: [],
      },
      {
        t: "far fa-server",
        sT: [],
      },
      {
        t: "far fa-shapes",
        sT: [],
      },
      {
        t: "far fa-share",
        sT: [],
      },
      {
        t: "far fa-share-all",
        sT: [],
      },
      {
        t: "far fa-share-alt",
        sT: [],
      },
      {
        t: "far fa-share-alt-square",
        sT: [],
      },
      {
        t: "far fa-share-square",
        sT: [],
      },
      {
        t: "far fa-sheep",
        sT: [],
      },
      {
        t: "far fa-shekel-sign",
        sT: [],
      },
      {
        t: "far fa-shield",
        sT: [],
      },
      {
        t: "far fa-shield-alt",
        sT: [],
      },
      {
        t: "far fa-shield-check",
        sT: [],
      },
      {
        t: "far fa-shield-cross",
        sT: [],
      },
      {
        t: "far fa-shield-virus",
        sT: [],
      },
      {
        t: "far fa-ship",
        sT: [],
      },
      {
        t: "far fa-shipping-fast",
        sT: [],
      },
      {
        t: "far fa-shipping-timed",
        sT: [],
      },
      {
        t: "far fa-shish-kebab",
        sT: [],
      },
      {
        t: "far fa-shoe-prints",
        sT: [],
      },
      {
        t: "far fa-shopping-bag",
        sT: [],
      },
      {
        t: "far fa-shopping-basket",
        sT: [],
      },
      {
        t: "far fa-shopping-cart",
        sT: [],
      },
      {
        t: "far fa-shovel",
        sT: [],
      },
      {
        t: "far fa-shovel-snow",
        sT: [],
      },
      {
        t: "far fa-shower",
        sT: [],
      },
      {
        t: "far fa-shredder",
        sT: [],
      },
      {
        t: "far fa-shuttle-van",
        sT: [],
      },
      {
        t: "far fa-shuttlecock",
        sT: [],
      },
      {
        t: "far fa-sickle",
        sT: [],
      },
      {
        t: "far fa-sigma",
        sT: [],
      },
      {
        t: "far fa-sign",
        sT: [],
      },
      {
        t: "far fa-sign-in",
        sT: [],
      },
      {
        t: "far fa-sign-in-alt",
        sT: [],
      },
      {
        t: "far fa-sign-language",
        sT: [],
      },
      {
        t: "far fa-sign-out",
        sT: [],
      },
      {
        t: "far fa-sign-out-alt",
        sT: [],
      },
      {
        t: "far fa-signal",
        sT: [],
      },
      {
        t: "far fa-signal-1",
        sT: [],
      },
      {
        t: "far fa-signal-2",
        sT: [],
      },
      {
        t: "far fa-signal-3",
        sT: [],
      },
      {
        t: "far fa-signal-4",
        sT: [],
      },
      {
        t: "far fa-signal-alt",
        sT: [],
      },
      {
        t: "far fa-signal-alt-1",
        sT: [],
      },
      {
        t: "far fa-signal-alt-2",
        sT: [],
      },
      {
        t: "far fa-signal-alt-3",
        sT: [],
      },
      {
        t: "far fa-signal-alt-slash",
        sT: [],
      },
      {
        t: "far fa-signal-slash",
        sT: [],
      },
      {
        t: "far fa-signal-stream",
        sT: [],
      },
      {
        t: "far fa-signature",
        sT: [],
      },
      {
        t: "far fa-sim-card",
        sT: [],
      },
      {
        t: "far fa-sink",
        sT: [],
      },
      {
        t: "far fa-siren",
        sT: [],
      },
      {
        t: "far fa-siren-on",
        sT: [],
      },
      {
        t: "far fa-sitemap",
        sT: [],
      },
      {
        t: "far fa-skating",
        sT: [],
      },
      {
        t: "far fa-skeleton",
        sT: [],
      },
      {
        t: "far fa-ski-jump",
        sT: [],
      },
      {
        t: "far fa-ski-lift",
        sT: [],
      },
      {
        t: "far fa-skiing",
        sT: [],
      },
      {
        t: "far fa-skiing-nordic",
        sT: [],
      },
      {
        t: "far fa-skull",
        sT: [],
      },
      {
        t: "far fa-skull-cow",
        sT: [],
      },
      {
        t: "far fa-skull-crossbones",
        sT: [],
      },
      {
        t: "far fa-slash",
        sT: [],
      },
      {
        t: "far fa-sledding",
        sT: [],
      },
      {
        t: "far fa-sleigh",
        sT: [],
      },
      {
        t: "far fa-sliders-h",
        sT: [],
      },
      {
        t: "far fa-sliders-h-square",
        sT: [],
      },
      {
        t: "far fa-sliders-v",
        sT: [],
      },
      {
        t: "far fa-sliders-v-square",
        sT: [],
      },
      {
        t: "far fa-smile",
        sT: [],
      },
      {
        t: "far fa-smile-beam",
        sT: [],
      },
      {
        t: "far fa-smile-plus",
        sT: [],
      },
      {
        t: "far fa-smile-wink",
        sT: [],
      },
      {
        t: "far fa-smog",
        sT: [],
      },
      {
        t: "far fa-smoke",
        sT: [],
      },
      {
        t: "far fa-smoking",
        sT: [],
      },
      {
        t: "far fa-smoking-ban",
        sT: [],
      },
      {
        t: "far fa-sms",
        sT: [],
      },
      {
        t: "far fa-snake",
        sT: [],
      },
      {
        t: "far fa-snooze",
        sT: [],
      },
      {
        t: "far fa-snow-blowing",
        sT: [],
      },
      {
        t: "far fa-snowboarding",
        sT: [],
      },
      {
        t: "far fa-snowflake",
        sT: [],
      },
      {
        t: "far fa-snowflakes",
        sT: [],
      },
      {
        t: "far fa-snowman",
        sT: [],
      },
      {
        t: "far fa-snowmobile",
        sT: [],
      },
      {
        t: "far fa-snowplow",
        sT: [],
      },
      {
        t: "far fa-soap",
        sT: [],
      },
      {
        t: "far fa-socks",
        sT: [],
      },
      {
        t: "far fa-solar-panel",
        sT: [],
      },
      {
        t: "far fa-solar-system",
        sT: [],
      },
      {
        t: "far fa-sort",
        sT: [],
      },
      {
        t: "far fa-sort-alpha-down",
        sT: [],
      },
      {
        t: "far fa-sort-alpha-down-alt",
        sT: [],
      },
      {
        t: "far fa-sort-alpha-up",
        sT: [],
      },
      {
        t: "far fa-sort-alpha-up-alt",
        sT: [],
      },
      {
        t: "far fa-sort-alt",
        sT: [],
      },
      {
        t: "far fa-sort-amount-down",
        sT: [],
      },
      {
        t: "far fa-sort-amount-down-alt",
        sT: [],
      },
      {
        t: "far fa-sort-amount-up",
        sT: [],
      },
      {
        t: "far fa-sort-amount-up-alt",
        sT: [],
      },
      {
        t: "far fa-sort-circle",
        sT: [],
      },
      {
        t: "far fa-sort-circle-down",
        sT: [],
      },
      {
        t: "far fa-sort-circle-up",
        sT: [],
      },
      {
        t: "far fa-sort-down",
        sT: [],
      },
      {
        t: "far fa-sort-numeric-down",
        sT: [],
      },
      {
        t: "far fa-sort-numeric-down-alt",
        sT: [],
      },
      {
        t: "far fa-sort-numeric-up",
        sT: [],
      },
      {
        t: "far fa-sort-numeric-up-alt",
        sT: [],
      },
      {
        t: "far fa-sort-shapes-down",
        sT: [],
      },
      {
        t: "far fa-sort-shapes-down-alt",
        sT: [],
      },
      {
        t: "far fa-sort-shapes-up",
        sT: [],
      },
      {
        t: "far fa-sort-shapes-up-alt",
        sT: [],
      },
      {
        t: "far fa-sort-size-down",
        sT: [],
      },
      {
        t: "far fa-sort-size-down-alt",
        sT: [],
      },
      {
        t: "far fa-sort-size-up",
        sT: [],
      },
      {
        t: "far fa-sort-size-up-alt",
        sT: [],
      },
      {
        t: "far fa-sort-up",
        sT: [],
      },
      {
        t: "far fa-soup",
        sT: [],
      },
      {
        t: "far fa-spa",
        sT: [],
      },
      {
        t: "far fa-space-shuttle",
        sT: [],
      },
      {
        t: "far fa-space-station-moon",
        sT: [],
      },
      {
        t: "far fa-space-station-moon-alt",
        sT: [],
      },
      {
        t: "far fa-spade",
        sT: [],
      },
      {
        t: "far fa-sparkles",
        sT: [],
      },
      {
        t: "far fa-speaker",
        sT: [],
      },
      {
        t: "far fa-speakers",
        sT: [],
      },
      {
        t: "far fa-spell-check",
        sT: [],
      },
      {
        t: "far fa-spider",
        sT: [],
      },
      {
        t: "far fa-spider-black-widow",
        sT: [],
      },
      {
        t: "far fa-spider-web",
        sT: [],
      },
      {
        t: "far fa-spinner",
        sT: [],
      },
      {
        t: "far fa-spinner-third",
        sT: [],
      },
      {
        t: "far fa-splotch",
        sT: [],
      },
      {
        t: "far fa-spray-can",
        sT: [],
      },
      {
        t: "far fa-sprinkler",
        sT: [],
      },
      {
        t: "far fa-square",
        sT: [],
      },
      {
        t: "far fa-square-full",
        sT: [],
      },
      {
        t: "far fa-square-root",
        sT: [],
      },
      {
        t: "far fa-square-root-alt",
        sT: [],
      },
      {
        t: "far fa-squirrel",
        sT: [],
      },
      {
        t: "far fa-staff",
        sT: [],
      },
      {
        t: "far fa-stamp",
        sT: [],
      },
      {
        t: "far fa-star",
        sT: [],
      },
      {
        t: "far fa-star-and-crescent",
        sT: [],
      },
      {
        t: "far fa-star-christmas",
        sT: [],
      },
      {
        t: "far fa-star-exclamation",
        sT: [],
      },
      {
        t: "far fa-star-half",
        sT: [],
      },
      {
        t: "far fa-star-half-alt",
        sT: [],
      },
      {
        t: "far fa-star-of-david",
        sT: [],
      },
      {
        t: "far fa-star-of-life",
        sT: [],
      },
      {
        t: "far fa-star-shooting",
        sT: [],
      },
      {
        t: "far fa-starfighter",
        sT: [],
      },
      {
        t: "far fa-starfighter-alt",
        sT: [],
      },
      {
        t: "far fa-stars",
        sT: [],
      },
      {
        t: "far fa-starship",
        sT: [],
      },
      {
        t: "far fa-starship-freighter",
        sT: [],
      },
      {
        t: "far fa-steak",
        sT: [],
      },
      {
        t: "far fa-steering-wheel",
        sT: [],
      },
      {
        t: "far fa-step-backward",
        sT: [],
      },
      {
        t: "far fa-step-forward",
        sT: [],
      },
      {
        t: "far fa-stethoscope",
        sT: [],
      },
      {
        t: "far fa-sticky-note",
        sT: [],
      },
      {
        t: "far fa-stocking",
        sT: [],
      },
      {
        t: "far fa-stomach",
        sT: [],
      },
      {
        t: "far fa-stop",
        sT: [],
      },
      {
        t: "far fa-stop-circle",
        sT: [],
      },
      {
        t: "far fa-stopwatch",
        sT: [],
      },
      {
        t: "far fa-stopwatch-20",
        sT: [],
      },
      {
        t: "far fa-store",
        sT: [],
      },
      {
        t: "far fa-store-alt",
        sT: [],
      },
      {
        t: "far fa-store-alt-slash",
        sT: [],
      },
      {
        t: "far fa-store-slash",
        sT: [],
      },
      {
        t: "far fa-stream",
        sT: [],
      },
      {
        t: "far fa-street-view",
        sT: [],
      },
      {
        t: "far fa-stretcher",
        sT: [],
      },
      {
        t: "far fa-strikethrough",
        sT: [],
      },
      {
        t: "far fa-stroopwafel",
        sT: [],
      },
      {
        t: "far fa-subscript",
        sT: [],
      },
      {
        t: "far fa-subway",
        sT: [],
      },
      {
        t: "far fa-suitcase",
        sT: [],
      },
      {
        t: "far fa-suitcase-rolling",
        sT: [],
      },
      {
        t: "far fa-sun",
        sT: [],
      },
      {
        t: "far fa-sun-cloud",
        sT: [],
      },
      {
        t: "far fa-sun-dust",
        sT: [],
      },
      {
        t: "far fa-sun-haze",
        sT: [],
      },
      {
        t: "far fa-sunglasses",
        sT: [],
      },
      {
        t: "far fa-sunrise",
        sT: [],
      },
      {
        t: "far fa-sunset",
        sT: [],
      },
      {
        t: "far fa-superscript",
        sT: [],
      },
      {
        t: "far fa-surprise",
        sT: [],
      },
      {
        t: "far fa-swatchbook",
        sT: [],
      },
      {
        t: "far fa-swimmer",
        sT: [],
      },
      {
        t: "far fa-swimming-pool",
        sT: [],
      },
      {
        t: "far fa-sword",
        sT: [],
      },
      {
        t: "far fa-sword-laser",
        sT: [],
      },
      {
        t: "far fa-sword-laser-alt",
        sT: [],
      },
      {
        t: "far fa-swords",
        sT: [],
      },
      {
        t: "far fa-swords-laser",
        sT: [],
      },
      {
        t: "far fa-synagogue",
        sT: [],
      },
      {
        t: "far fa-sync",
        sT: [],
      },
      {
        t: "far fa-sync-alt",
        sT: [],
      },
      {
        t: "far fa-syringe",
        sT: [],
      },
      {
        t: "far fa-table",
        sT: [],
      },
      {
        t: "far fa-table-tennis",
        sT: [],
      },
      {
        t: "far fa-tablet",
        sT: [],
      },
      {
        t: "far fa-tablet-alt",
        sT: [],
      },
      {
        t: "far fa-tablet-android",
        sT: [],
      },
      {
        t: "far fa-tablet-android-alt",
        sT: [],
      },
      {
        t: "far fa-tablet-rugged",
        sT: [],
      },
      {
        t: "far fa-tablets",
        sT: [],
      },
      {
        t: "far fa-tachometer",
        sT: [],
      },
      {
        t: "far fa-tachometer-alt",
        sT: [],
      },
      {
        t: "far fa-tachometer-alt-average",
        sT: [],
      },
      {
        t: "far fa-tachometer-alt-fast",
        sT: [],
      },
      {
        t: "far fa-tachometer-alt-fastest",
        sT: [],
      },
      {
        t: "far fa-tachometer-alt-slow",
        sT: [],
      },
      {
        t: "far fa-tachometer-alt-slowest",
        sT: [],
      },
      {
        t: "far fa-tachometer-average",
        sT: [],
      },
      {
        t: "far fa-tachometer-fast",
        sT: [],
      },
      {
        t: "far fa-tachometer-fastest",
        sT: [],
      },
      {
        t: "far fa-tachometer-slow",
        sT: [],
      },
      {
        t: "far fa-tachometer-slowest",
        sT: [],
      },
      {
        t: "far fa-taco",
        sT: [],
      },
      {
        t: "far fa-tag",
        sT: [],
      },
      {
        t: "far fa-tags",
        sT: [],
      },
      {
        t: "far fa-tally",
        sT: [],
      },
      {
        t: "far fa-tanakh",
        sT: [],
      },
      {
        t: "far fa-tape",
        sT: [],
      },
      {
        t: "far fa-tasks",
        sT: [],
      },
      {
        t: "far fa-tasks-alt",
        sT: [],
      },
      {
        t: "far fa-taxi",
        sT: [],
      },
      {
        t: "far fa-teeth",
        sT: [],
      },
      {
        t: "far fa-teeth-open",
        sT: [],
      },
      {
        t: "far fa-telescope",
        sT: [],
      },
      {
        t: "far fa-temperature-down",
        sT: [],
      },
      {
        t: "far fa-temperature-frigid",
        sT: [],
      },
      {
        t: "far fa-temperature-high",
        sT: [],
      },
      {
        t: "far fa-temperature-hot",
        sT: [],
      },
      {
        t: "far fa-temperature-low",
        sT: [],
      },
      {
        t: "far fa-temperature-up",
        sT: [],
      },
      {
        t: "far fa-tenge",
        sT: [],
      },
      {
        t: "far fa-tennis-ball",
        sT: [],
      },
      {
        t: "far fa-terminal",
        sT: [],
      },
      {
        t: "far fa-text",
        sT: [],
      },
      {
        t: "far fa-text-height",
        sT: [],
      },
      {
        t: "far fa-text-size",
        sT: [],
      },
      {
        t: "far fa-text-width",
        sT: [],
      },
      {
        t: "far fa-th",
        sT: [],
      },
      {
        t: "far fa-th-large",
        sT: [],
      },
      {
        t: "far fa-th-list",
        sT: [],
      },
      {
        t: "far fa-theater-masks",
        sT: [],
      },
      {
        t: "far fa-thermometer",
        sT: [],
      },
      {
        t: "far fa-thermometer-empty",
        sT: [],
      },
      {
        t: "far fa-thermometer-full",
        sT: [],
      },
      {
        t: "far fa-thermometer-half",
        sT: [],
      },
      {
        t: "far fa-thermometer-quarter",
        sT: [],
      },
      {
        t: "far fa-thermometer-three-quarters",
        sT: [],
      },
      {
        t: "far fa-theta",
        sT: [],
      },
      {
        t: "far fa-thumbs-down",
        sT: [],
      },
      {
        t: "far fa-thumbs-up",
        sT: [],
      },
      {
        t: "far fa-thumbtack",
        sT: [],
      },
      {
        t: "far fa-thunderstorm",
        sT: [],
      },
      {
        t: "far fa-thunderstorm-moon",
        sT: [],
      },
      {
        t: "far fa-thunderstorm-sun",
        sT: [],
      },
      {
        t: "far fa-ticket",
        sT: [],
      },
      {
        t: "far fa-ticket-alt",
        sT: [],
      },
      {
        t: "far fa-tilde",
        sT: [],
      },
      {
        t: "far fa-times",
        sT: [],
      },
      {
        t: "far fa-times-circle",
        sT: [],
      },
      {
        t: "far fa-times-hexagon",
        sT: [],
      },
      {
        t: "far fa-times-octagon",
        sT: [],
      },
      {
        t: "far fa-times-square",
        sT: [],
      },
      {
        t: "far fa-tint",
        sT: [],
      },
      {
        t: "far fa-tint-slash",
        sT: [],
      },
      {
        t: "far fa-tire",
        sT: [],
      },
      {
        t: "far fa-tire-flat",
        sT: [],
      },
      {
        t: "far fa-tire-pressure-warning",
        sT: [],
      },
      {
        t: "far fa-tire-rugged",
        sT: [],
      },
      {
        t: "far fa-tired",
        sT: [],
      },
      {
        t: "far fa-toggle-off",
        sT: [],
      },
      {
        t: "far fa-toggle-on",
        sT: [],
      },
      {
        t: "far fa-toilet",
        sT: [],
      },
      {
        t: "far fa-toilet-paper",
        sT: [],
      },
      {
        t: "far fa-toilet-paper-alt",
        sT: [],
      },
      {
        t: "far fa-toilet-paper-slash",
        sT: [],
      },
      {
        t: "far fa-tombstone",
        sT: [],
      },
      {
        t: "far fa-tombstone-alt",
        sT: [],
      },
      {
        t: "far fa-toolbox",
        sT: [],
      },
      {
        t: "far fa-tools",
        sT: [],
      },
      {
        t: "far fa-tooth",
        sT: [],
      },
      {
        t: "far fa-toothbrush",
        sT: [],
      },
      {
        t: "far fa-torah",
        sT: [],
      },
      {
        t: "far fa-torii-gate",
        sT: [],
      },
      {
        t: "far fa-tornado",
        sT: [],
      },
      {
        t: "far fa-tractor",
        sT: [],
      },
      {
        t: "far fa-trademark",
        sT: [],
      },
      {
        t: "far fa-traffic-cone",
        sT: [],
      },
      {
        t: "far fa-traffic-light",
        sT: [],
      },
      {
        t: "far fa-traffic-light-go",
        sT: [],
      },
      {
        t: "far fa-traffic-light-slow",
        sT: [],
      },
      {
        t: "far fa-traffic-light-stop",
        sT: [],
      },
      {
        t: "far fa-trailer",
        sT: [],
      },
      {
        t: "far fa-train",
        sT: [],
      },
      {
        t: "far fa-tram",
        sT: [],
      },
      {
        t: "far fa-transgender",
        sT: [],
      },
      {
        t: "far fa-transgender-alt",
        sT: [],
      },
      {
        t: "far fa-transporter",
        sT: [],
      },
      {
        t: "far fa-transporter-1",
        sT: [],
      },
      {
        t: "far fa-transporter-2",
        sT: [],
      },
      {
        t: "far fa-transporter-3",
        sT: [],
      },
      {
        t: "far fa-transporter-empty",
        sT: [],
      },
      {
        t: "far fa-trash",
        sT: [],
      },
      {
        t: "far fa-trash-alt",
        sT: [],
      },
      {
        t: "far fa-trash-restore",
        sT: [],
      },
      {
        t: "far fa-trash-restore-alt",
        sT: [],
      },
      {
        t: "far fa-trash-undo",
        sT: [],
      },
      {
        t: "far fa-trash-undo-alt",
        sT: [],
      },
      {
        t: "far fa-treasure-chest",
        sT: [],
      },
      {
        t: "far fa-tree",
        sT: [],
      },
      {
        t: "far fa-tree-alt",
        sT: [],
      },
      {
        t: "far fa-tree-christmas",
        sT: [],
      },
      {
        t: "far fa-tree-decorated",
        sT: [],
      },
      {
        t: "far fa-tree-large",
        sT: [],
      },
      {
        t: "far fa-tree-palm",
        sT: [],
      },
      {
        t: "far fa-trees",
        sT: [],
      },
      {
        t: "far fa-triangle",
        sT: [],
      },
      {
        t: "far fa-triangle-music",
        sT: [],
      },
      {
        t: "far fa-trophy",
        sT: [],
      },
      {
        t: "far fa-trophy-alt",
        sT: [],
      },
      {
        t: "far fa-truck",
        sT: [],
      },
      {
        t: "far fa-truck-container",
        sT: [],
      },
      {
        t: "far fa-truck-couch",
        sT: [],
      },
      {
        t: "far fa-truck-loading",
        sT: [],
      },
      {
        t: "far fa-truck-monster",
        sT: [],
      },
      {
        t: "far fa-truck-moving",
        sT: [],
      },
      {
        t: "far fa-truck-pickup",
        sT: [],
      },
      {
        t: "far fa-truck-plow",
        sT: [],
      },
      {
        t: "far fa-truck-ramp",
        sT: [],
      },
      {
        t: "far fa-trumpet",
        sT: [],
      },
      {
        t: "far fa-tshirt",
        sT: [],
      },
      {
        t: "far fa-tty",
        sT: [],
      },
      {
        t: "far fa-turkey",
        sT: [],
      },
      {
        t: "far fa-turntable",
        sT: [],
      },
      {
        t: "far fa-turtle",
        sT: [],
      },
      {
        t: "far fa-tv",
        sT: [],
      },
      {
        t: "far fa-tv-alt",
        sT: [],
      },
      {
        t: "far fa-tv-music",
        sT: [],
      },
      {
        t: "far fa-tv-retro",
        sT: [],
      },
      {
        t: "far fa-typewriter",
        sT: [],
      },
      {
        t: "far fa-ufo",
        sT: [],
      },
      {
        t: "far fa-ufo-beam",
        sT: [],
      },
      {
        t: "far fa-umbrella",
        sT: [],
      },
      {
        t: "far fa-umbrella-beach",
        sT: [],
      },
      {
        t: "far fa-underline",
        sT: [],
      },
      {
        t: "far fa-undo",
        sT: [],
      },
      {
        t: "far fa-undo-alt",
        sT: [],
      },
      {
        t: "far fa-unicorn",
        sT: [],
      },
      {
        t: "far fa-union",
        sT: [],
      },
      {
        t: "far fa-universal-access",
        sT: [],
      },
      {
        t: "far fa-university",
        sT: [],
      },
      {
        t: "far fa-unlink",
        sT: [],
      },
      {
        t: "far fa-unlock",
        sT: [],
      },
      {
        t: "far fa-unlock-alt",
        sT: [],
      },
      {
        t: "far fa-upload",
        sT: [],
      },
      {
        t: "far fa-usb-drive",
        sT: [],
      },
      {
        t: "far fa-usd-circle",
        sT: [],
      },
      {
        t: "far fa-usd-square",
        sT: [],
      },
      {
        t: "far fa-user",
        sT: [],
      },
      {
        t: "far fa-user-alien",
        sT: [],
      },
      {
        t: "far fa-user-alt",
        sT: [],
      },
      {
        t: "far fa-user-alt-slash",
        sT: [],
      },
      {
        t: "far fa-user-astronaut",
        sT: [],
      },
      {
        t: "far fa-user-chart",
        sT: [],
      },
      {
        t: "far fa-user-check",
        sT: [],
      },
      {
        t: "far fa-user-circle",
        sT: [],
      },
      {
        t: "far fa-user-clock",
        sT: [],
      },
      {
        t: "far fa-user-cog",
        sT: [],
      },
      {
        t: "far fa-user-cowboy",
        sT: [],
      },
      {
        t: "far fa-user-crown",
        sT: [],
      },
      {
        t: "far fa-user-edit",
        sT: [],
      },
      {
        t: "far fa-user-friends",
        sT: [],
      },
      {
        t: "far fa-user-graduate",
        sT: [],
      },
      {
        t: "far fa-user-hard-hat",
        sT: [],
      },
      {
        t: "far fa-user-headset",
        sT: [],
      },
      {
        t: "far fa-user-injured",
        sT: [],
      },
      {
        t: "far fa-user-lock",
        sT: [],
      },
      {
        t: "far fa-user-md",
        sT: [],
      },
      {
        t: "far fa-user-md-chat",
        sT: [],
      },
      {
        t: "far fa-user-minus",
        sT: [],
      },
      {
        t: "far fa-user-music",
        sT: [],
      },
      {
        t: "far fa-user-ninja",
        sT: [],
      },
      {
        t: "far fa-user-nurse",
        sT: [],
      },
      {
        t: "far fa-user-plus",
        sT: [],
      },
      {
        t: "far fa-user-robot",
        sT: [],
      },
      {
        t: "far fa-user-secret",
        sT: [],
      },
      {
        t: "far fa-user-shield",
        sT: [],
      },
      {
        t: "far fa-user-slash",
        sT: [],
      },
      {
        t: "far fa-user-tag",
        sT: [],
      },
      {
        t: "far fa-user-tie",
        sT: [],
      },
      {
        t: "far fa-user-times",
        sT: [],
      },
      {
        t: "far fa-user-unlock",
        sT: [],
      },
      {
        t: "far fa-user-visor",
        sT: [],
      },
      {
        t: "far fa-users",
        sT: [],
      },
      {
        t: "far fa-users-class",
        sT: [],
      },
      {
        t: "far fa-users-cog",
        sT: [],
      },
      {
        t: "far fa-users-crown",
        sT: [],
      },
      {
        t: "far fa-users-medical",
        sT: [],
      },
      {
        t: "far fa-users-slash",
        sT: [],
      },
      {
        t: "far fa-utensil-fork",
        sT: [],
      },
      {
        t: "far fa-utensil-knife",
        sT: [],
      },
      {
        t: "far fa-utensil-spoon",
        sT: [],
      },
      {
        t: "far fa-utensils",
        sT: [],
      },
      {
        t: "far fa-utensils-alt",
        sT: [],
      },
      {
        t: "far fa-vacuum",
        sT: [],
      },
      {
        t: "far fa-vacuum-robot",
        sT: [],
      },
      {
        t: "far fa-value-absolute",
        sT: [],
      },
      {
        t: "far fa-vector-square",
        sT: [],
      },
      {
        t: "far fa-venus",
        sT: [],
      },
      {
        t: "far fa-venus-double",
        sT: [],
      },
      {
        t: "far fa-venus-mars",
        sT: [],
      },
      {
        t: "far fa-vest",
        sT: [],
      },
      {
        t: "far fa-vest-patches",
        sT: [],
      },
      {
        t: "far fa-vhs",
        sT: [],
      },
      {
        t: "far fa-vial",
        sT: [],
      },
      {
        t: "far fa-vials",
        sT: [],
      },
      {
        t: "far fa-video",
        sT: [],
      },
      {
        t: "far fa-video-plus",
        sT: [],
      },
      {
        t: "far fa-video-slash",
        sT: [],
      },
      {
        t: "far fa-vihara",
        sT: [],
      },
      {
        t: "far fa-violin",
        sT: [],
      },
      {
        t: "far fa-virus",
        sT: [],
      },
      {
        t: "far fa-virus-slash",
        sT: [],
      },
      {
        t: "far fa-viruses",
        sT: [],
      },
      {
        t: "far fa-voicemail",
        sT: [],
      },
      {
        t: "far fa-volcano",
        sT: [],
      },
      {
        t: "far fa-volleyball-ball",
        sT: [],
      },
      {
        t: "far fa-volume",
        sT: [],
      },
      {
        t: "far fa-volume-down",
        sT: [],
      },
      {
        t: "far fa-volume-mute",
        sT: [],
      },
      {
        t: "far fa-volume-off",
        sT: [],
      },
      {
        t: "far fa-volume-slash",
        sT: [],
      },
      {
        t: "far fa-volume-up",
        sT: [],
      },
      {
        t: "far fa-vote-nay",
        sT: [],
      },
      {
        t: "far fa-vote-yea",
        sT: [],
      },
      {
        t: "far fa-vr-cardboard",
        sT: [],
      },
      {
        t: "far fa-wagon-covered",
        sT: [],
      },
      {
        t: "far fa-walker",
        sT: [],
      },
      {
        t: "far fa-walkie-talkie",
        sT: [],
      },
      {
        t: "far fa-walking",
        sT: [],
      },
      {
        t: "far fa-wallet",
        sT: [],
      },
      {
        t: "far fa-wand",
        sT: [],
      },
      {
        t: "far fa-wand-magic",
        sT: [],
      },
      {
        t: "far fa-warehouse",
        sT: [],
      },
      {
        t: "far fa-warehouse-alt",
        sT: [],
      },
      {
        t: "far fa-washer",
        sT: [],
      },
      {
        t: "far fa-watch",
        sT: [],
      },
      {
        t: "far fa-watch-calculator",
        sT: [],
      },
      {
        t: "far fa-watch-fitness",
        sT: [],
      },
      {
        t: "far fa-water",
        sT: [],
      },
      {
        t: "far fa-water-lower",
        sT: [],
      },
      {
        t: "far fa-water-rise",
        sT: [],
      },
      {
        t: "far fa-wave-sine",
        sT: [],
      },
      {
        t: "far fa-wave-square",
        sT: [],
      },
      {
        t: "far fa-wave-triangle",
        sT: [],
      },
      {
        t: "far fa-waveform",
        sT: [],
      },
      {
        t: "far fa-waveform-path",
        sT: [],
      },
      {
        t: "far fa-webcam",
        sT: [],
      },
      {
        t: "far fa-webcam-slash",
        sT: [],
      },
      {
        t: "far fa-weight",
        sT: [],
      },
      {
        t: "far fa-weight-hanging",
        sT: [],
      },
      {
        t: "far fa-whale",
        sT: [],
      },
      {
        t: "far fa-wheat",
        sT: [],
      },
      {
        t: "far fa-wheelchair",
        sT: [],
      },
      {
        t: "far fa-whistle",
        sT: [],
      },
      {
        t: "far fa-wifi",
        sT: [],
      },
      {
        t: "far fa-wifi-1",
        sT: [],
      },
      {
        t: "far fa-wifi-2",
        sT: [],
      },
      {
        t: "far fa-wifi-slash",
        sT: [],
      },
      {
        t: "far fa-wind",
        sT: [],
      },
      {
        t: "far fa-wind-turbine",
        sT: [],
      },
      {
        t: "far fa-wind-warning",
        sT: [],
      },
      {
        t: "far fa-window",
        sT: [],
      },
      {
        t: "far fa-window-alt",
        sT: [],
      },
      {
        t: "far fa-window-close",
        sT: [],
      },
      {
        t: "far fa-window-frame",
        sT: [],
      },
      {
        t: "far fa-window-frame-open",
        sT: [],
      },
      {
        t: "far fa-window-maximize",
        sT: [],
      },
      {
        t: "far fa-window-minimize",
        sT: [],
      },
      {
        t: "far fa-window-restore",
        sT: [],
      },
      {
        t: "far fa-windsock",
        sT: [],
      },
      {
        t: "far fa-wine-bottle",
        sT: [],
      },
      {
        t: "far fa-wine-glass",
        sT: [],
      },
      {
        t: "far fa-wine-glass-alt",
        sT: [],
      },
      {
        t: "far fa-won-sign",
        sT: [],
      },
      {
        t: "far fa-wreath",
        sT: [],
      },
      {
        t: "far fa-wrench",
        sT: [],
      },
      {
        t: "far fa-x-ray",
        sT: [],
      },
      {
        t: "far fa-yen-sign",
        sT: [],
      },
      {
        t: "far fa-yin-yang",
        sT: [],
      },
    ],
  });
});
