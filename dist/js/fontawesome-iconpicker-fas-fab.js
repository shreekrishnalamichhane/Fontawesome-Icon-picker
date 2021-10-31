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
        t: "fas fa-abacus",
        sT: [],
      },
      {
        t: "fas fa-acorn",
        sT: [],
      },
      {
        t: "fas fa-ad",
        sT: [],
      },
      {
        t: "fas fa-address-book",
        sT: [],
      },
      {
        t: "fas fa-address-card",
        sT: [],
      },
      {
        t: "fas fa-adjust",
        sT: [],
      },
      {
        t: "fas fa-air-conditioner",
        sT: [],
      },
      {
        t: "fas fa-air-freshener",
        sT: [],
      },
      {
        t: "fas fa-alarm-clock",
        sT: [],
      },
      {
        t: "fas fa-alarm-exclamation",
        sT: [],
      },
      {
        t: "fas fa-alarm-plus",
        sT: [],
      },
      {
        t: "fas fa-alarm-snooze",
        sT: [],
      },
      {
        t: "fas fa-album",
        sT: [],
      },
      {
        t: "fas fa-album-collection",
        sT: [],
      },
      {
        t: "fas fa-alicorn",
        sT: [],
      },
      {
        t: "fas fa-alien",
        sT: [],
      },
      {
        t: "fas fa-alien-monster",
        sT: [],
      },
      {
        t: "fas fa-align-center",
        sT: [],
      },
      {
        t: "fas fa-align-justify",
        sT: [],
      },
      {
        t: "fas fa-align-left",
        sT: [],
      },
      {
        t: "fas fa-align-right",
        sT: [],
      },
      {
        t: "fas fa-align-slash",
        sT: [],
      },
      {
        t: "fas fa-allergies",
        sT: [],
      },
      {
        t: "fas fa-ambulance",
        sT: [],
      },
      {
        t: "fas fa-american-sign-language-interpreting",
        sT: [],
      },
      {
        t: "fas fa-amp-guitar",
        sT: [],
      },
      {
        t: "fas fa-analytics",
        sT: [],
      },
      {
        t: "fas fa-anchor",
        sT: [],
      },
      {
        t: "fas fa-angel",
        sT: [],
      },
      {
        t: "fas fa-angle-double-down",
        sT: [],
      },
      {
        t: "fas fa-angle-double-left",
        sT: [],
      },
      {
        t: "fas fa-angle-double-right",
        sT: [],
      },
      {
        t: "fas fa-angle-double-up",
        sT: [],
      },
      {
        t: "fas fa-angle-down",
        sT: [],
      },
      {
        t: "fas fa-angle-left",
        sT: [],
      },
      {
        t: "fas fa-angle-right",
        sT: [],
      },
      {
        t: "fas fa-angle-up",
        sT: [],
      },
      {
        t: "fas fa-angry",
        sT: [],
      },
      {
        t: "fas fa-ankh",
        sT: [],
      },
      {
        t: "fas fa-apple-alt",
        sT: [],
      },
      {
        t: "fas fa-apple-crate",
        sT: [],
      },
      {
        t: "fas fa-archive",
        sT: [],
      },
      {
        t: "fas fa-archway",
        sT: [],
      },
      {
        t: "fas fa-arrow-alt-circle-down",
        sT: [],
      },
      {
        t: "fas fa-arrow-alt-circle-left",
        sT: [],
      },
      {
        t: "fas fa-arrow-alt-circle-right",
        sT: [],
      },
      {
        t: "fas fa-arrow-alt-circle-up",
        sT: [],
      },
      {
        t: "fas fa-arrow-alt-down",
        sT: [],
      },
      {
        t: "fas fa-arrow-alt-from-bottom",
        sT: [],
      },
      {
        t: "fas fa-arrow-alt-from-left",
        sT: [],
      },
      {
        t: "fas fa-arrow-alt-from-right",
        sT: [],
      },
      {
        t: "fas fa-arrow-alt-from-top",
        sT: [],
      },
      {
        t: "fas fa-arrow-alt-left",
        sT: [],
      },
      {
        t: "fas fa-arrow-alt-right",
        sT: [],
      },
      {
        t: "fas fa-arrow-alt-square-down",
        sT: [],
      },
      {
        t: "fas fa-arrow-alt-square-left",
        sT: [],
      },
      {
        t: "fas fa-arrow-alt-square-right",
        sT: [],
      },
      {
        t: "fas fa-arrow-alt-square-up",
        sT: [],
      },
      {
        t: "fas fa-arrow-alt-to-bottom",
        sT: [],
      },
      {
        t: "fas fa-arrow-alt-to-left",
        sT: [],
      },
      {
        t: "fas fa-arrow-alt-to-right",
        sT: [],
      },
      {
        t: "fas fa-arrow-alt-to-top",
        sT: [],
      },
      {
        t: "fas fa-arrow-alt-up",
        sT: [],
      },
      {
        t: "fas fa-arrow-circle-down",
        sT: [],
      },
      {
        t: "fas fa-arrow-circle-left",
        sT: [],
      },
      {
        t: "fas fa-arrow-circle-right",
        sT: [],
      },
      {
        t: "fas fa-arrow-circle-up",
        sT: [],
      },
      {
        t: "fas fa-arrow-down",
        sT: [],
      },
      {
        t: "fas fa-arrow-from-bottom",
        sT: [],
      },
      {
        t: "fas fa-arrow-from-left",
        sT: [],
      },
      {
        t: "fas fa-arrow-from-right",
        sT: [],
      },
      {
        t: "fas fa-arrow-from-top",
        sT: [],
      },
      {
        t: "fas fa-arrow-left",
        sT: [],
      },
      {
        t: "fas fa-arrow-right",
        sT: [],
      },
      {
        t: "fas fa-arrow-square-down",
        sT: [],
      },
      {
        t: "fas fa-arrow-square-left",
        sT: [],
      },
      {
        t: "fas fa-arrow-square-right",
        sT: [],
      },
      {
        t: "fas fa-arrow-square-up",
        sT: [],
      },
      {
        t: "fas fa-arrow-to-bottom",
        sT: [],
      },
      {
        t: "fas fa-arrow-to-left",
        sT: [],
      },
      {
        t: "fas fa-arrow-to-right",
        sT: [],
      },
      {
        t: "fas fa-arrow-to-top",
        sT: [],
      },
      {
        t: "fas fa-arrow-up",
        sT: [],
      },
      {
        t: "fas fa-arrows",
        sT: [],
      },
      {
        t: "fas fa-arrows-alt",
        sT: [],
      },
      {
        t: "fas fa-arrows-alt-h",
        sT: [],
      },
      {
        t: "fas fa-arrows-alt-v",
        sT: [],
      },
      {
        t: "fas fa-arrows-h",
        sT: [],
      },
      {
        t: "fas fa-arrows-v",
        sT: [],
      },
      {
        t: "fas fa-assistive-listening-systems",
        sT: [],
      },
      {
        t: "fas fa-asterisk",
        sT: [],
      },
      {
        t: "fas fa-at",
        sT: [],
      },
      {
        t: "fas fa-atlas",
        sT: [],
      },
      {
        t: "fas fa-atom",
        sT: [],
      },
      {
        t: "fas fa-atom-alt",
        sT: [],
      },
      {
        t: "fas fa-audio-description",
        sT: [],
      },
      {
        t: "fas fa-award",
        sT: [],
      },
      {
        t: "fas fa-axe",
        sT: [],
      },
      {
        t: "fas fa-axe-battle",
        sT: [],
      },
      {
        t: "fas fa-baby",
        sT: [],
      },
      {
        t: "fas fa-baby-carriage",
        sT: [],
      },
      {
        t: "fas fa-backpack",
        sT: [],
      },
      {
        t: "fas fa-backspace",
        sT: [],
      },
      {
        t: "fas fa-backward",
        sT: [],
      },
      {
        t: "fas fa-bacon",
        sT: [],
      },
      {
        t: "fas fa-bacteria",
        sT: [],
      },
      {
        t: "fas fa-bacterium",
        sT: [],
      },
      {
        t: "fas fa-badge",
        sT: [],
      },
      {
        t: "fas fa-badge-check",
        sT: [],
      },
      {
        t: "fas fa-badge-dollar",
        sT: [],
      },
      {
        t: "fas fa-badge-percent",
        sT: [],
      },
      {
        t: "fas fa-badge-sheriff",
        sT: [],
      },
      {
        t: "fas fa-badger-honey",
        sT: [],
      },
      {
        t: "fas fa-bags-shopping",
        sT: [],
      },
      {
        t: "fas fa-bahai",
        sT: [],
      },
      {
        t: "fas fa-balance-scale",
        sT: [],
      },
      {
        t: "fas fa-balance-scale-left",
        sT: [],
      },
      {
        t: "fas fa-balance-scale-right",
        sT: [],
      },
      {
        t: "fas fa-ball-pile",
        sT: [],
      },
      {
        t: "fas fa-ballot",
        sT: [],
      },
      {
        t: "fas fa-ballot-check",
        sT: [],
      },
      {
        t: "fas fa-ban",
        sT: [],
      },
      {
        t: "fas fa-band-aid",
        sT: [],
      },
      {
        t: "fas fa-banjo",
        sT: [],
      },
      {
        t: "fas fa-barcode",
        sT: [],
      },
      {
        t: "fas fa-barcode-alt",
        sT: [],
      },
      {
        t: "fas fa-barcode-read",
        sT: [],
      },
      {
        t: "fas fa-barcode-scan",
        sT: [],
      },
      {
        t: "fas fa-bars",
        sT: [],
      },
      {
        t: "fas fa-baseball",
        sT: [],
      },
      {
        t: "fas fa-baseball-ball",
        sT: [],
      },
      {
        t: "fas fa-basketball-ball",
        sT: [],
      },
      {
        t: "fas fa-basketball-hoop",
        sT: [],
      },
      {
        t: "fas fa-bat",
        sT: [],
      },
      {
        t: "fas fa-bath",
        sT: [],
      },
      {
        t: "fas fa-battery-bolt",
        sT: [],
      },
      {
        t: "fas fa-battery-empty",
        sT: [],
      },
      {
        t: "fas fa-battery-full",
        sT: [],
      },
      {
        t: "fas fa-battery-half",
        sT: [],
      },
      {
        t: "fas fa-battery-quarter",
        sT: [],
      },
      {
        t: "fas fa-battery-slash",
        sT: [],
      },
      {
        t: "fas fa-battery-three-quarters",
        sT: [],
      },
      {
        t: "fas fa-bed",
        sT: [],
      },
      {
        t: "fas fa-bed-alt",
        sT: [],
      },
      {
        t: "fas fa-bed-bunk",
        sT: [],
      },
      {
        t: "fas fa-bed-empty",
        sT: [],
      },
      {
        t: "fas fa-beer",
        sT: [],
      },
      {
        t: "fas fa-bell",
        sT: [],
      },
      {
        t: "fas fa-bell-exclamation",
        sT: [],
      },
      {
        t: "fas fa-bell-on",
        sT: [],
      },
      {
        t: "fas fa-bell-plus",
        sT: [],
      },
      {
        t: "fas fa-bell-school",
        sT: [],
      },
      {
        t: "fas fa-bell-school-slash",
        sT: [],
      },
      {
        t: "fas fa-bell-slash",
        sT: [],
      },
      {
        t: "fas fa-bells",
        sT: [],
      },
      {
        t: "fas fa-betamax",
        sT: [],
      },
      {
        t: "fas fa-bezier-curve",
        sT: [],
      },
      {
        t: "fas fa-bible",
        sT: [],
      },
      {
        t: "fas fa-bicycle",
        sT: [],
      },
      {
        t: "fas fa-biking",
        sT: [],
      },
      {
        t: "fas fa-biking-mountain",
        sT: [],
      },
      {
        t: "fas fa-binoculars",
        sT: [],
      },
      {
        t: "fas fa-biohazard",
        sT: [],
      },
      {
        t: "fas fa-birthday-cake",
        sT: [],
      },
      {
        t: "fas fa-blanket",
        sT: [],
      },
      {
        t: "fas fa-blender",
        sT: [],
      },
      {
        t: "fas fa-blender-phone",
        sT: [],
      },
      {
        t: "fas fa-blind",
        sT: [],
      },
      {
        t: "fas fa-blinds",
        sT: [],
      },
      {
        t: "fas fa-blinds-open",
        sT: [],
      },
      {
        t: "fas fa-blinds-raised",
        sT: [],
      },
      {
        t: "fas fa-blog",
        sT: [],
      },
      {
        t: "fas fa-bold",
        sT: [],
      },
      {
        t: "fas fa-bolt",
        sT: [],
      },
      {
        t: "fas fa-bomb",
        sT: [],
      },
      {
        t: "fas fa-bone",
        sT: [],
      },
      {
        t: "fas fa-bone-break",
        sT: [],
      },
      {
        t: "fas fa-bong",
        sT: [],
      },
      {
        t: "fas fa-book",
        sT: [],
      },
      {
        t: "fas fa-book-alt",
        sT: [],
      },
      {
        t: "fas fa-book-dead",
        sT: [],
      },
      {
        t: "fas fa-book-heart",
        sT: [],
      },
      {
        t: "fas fa-book-medical",
        sT: [],
      },
      {
        t: "fas fa-book-open",
        sT: [],
      },
      {
        t: "fas fa-book-reader",
        sT: [],
      },
      {
        t: "fas fa-book-spells",
        sT: [],
      },
      {
        t: "fas fa-book-user",
        sT: [],
      },
      {
        t: "fas fa-bookmark",
        sT: [],
      },
      {
        t: "fas fa-books",
        sT: [],
      },
      {
        t: "fas fa-books-medical",
        sT: [],
      },
      {
        t: "fas fa-boombox",
        sT: [],
      },
      {
        t: "fas fa-boot",
        sT: [],
      },
      {
        t: "fas fa-booth-curtain",
        sT: [],
      },
      {
        t: "fas fa-border-all",
        sT: [],
      },
      {
        t: "fas fa-border-bottom",
        sT: [],
      },
      {
        t: "fas fa-border-center-h",
        sT: [],
      },
      {
        t: "fas fa-border-center-v",
        sT: [],
      },
      {
        t: "fas fa-border-inner",
        sT: [],
      },
      {
        t: "fas fa-border-left",
        sT: [],
      },
      {
        t: "fas fa-border-none",
        sT: [],
      },
      {
        t: "fas fa-border-outer",
        sT: [],
      },
      {
        t: "fas fa-border-right",
        sT: [],
      },
      {
        t: "fas fa-border-style",
        sT: [],
      },
      {
        t: "fas fa-border-style-alt",
        sT: [],
      },
      {
        t: "fas fa-border-top",
        sT: [],
      },
      {
        t: "fas fa-bow-arrow",
        sT: [],
      },
      {
        t: "fas fa-bowling-ball",
        sT: [],
      },
      {
        t: "fas fa-bowling-pins",
        sT: [],
      },
      {
        t: "fas fa-box",
        sT: [],
      },
      {
        t: "fas fa-box-alt",
        sT: [],
      },
      {
        t: "fas fa-box-ballot",
        sT: [],
      },
      {
        t: "fas fa-box-check",
        sT: [],
      },
      {
        t: "fas fa-box-fragile",
        sT: [],
      },
      {
        t: "fas fa-box-full",
        sT: [],
      },
      {
        t: "fas fa-box-heart",
        sT: [],
      },
      {
        t: "fas fa-box-open",
        sT: [],
      },
      {
        t: "fas fa-box-tissue",
        sT: [],
      },
      {
        t: "fas fa-box-up",
        sT: [],
      },
      {
        t: "fas fa-box-usd",
        sT: [],
      },
      {
        t: "fas fa-boxes",
        sT: [],
      },
      {
        t: "fas fa-boxes-alt",
        sT: [],
      },
      {
        t: "fas fa-boxing-glove",
        sT: [],
      },
      {
        t: "fas fa-brackets",
        sT: [],
      },
      {
        t: "fas fa-brackets-curly",
        sT: [],
      },
      {
        t: "fas fa-braille",
        sT: [],
      },
      {
        t: "fas fa-brain",
        sT: [],
      },
      {
        t: "fas fa-bread-loaf",
        sT: [],
      },
      {
        t: "fas fa-bread-slice",
        sT: [],
      },
      {
        t: "fas fa-briefcase",
        sT: [],
      },
      {
        t: "fas fa-briefcase-medical",
        sT: [],
      },
      {
        t: "fas fa-bring-forward",
        sT: [],
      },
      {
        t: "fas fa-bring-front",
        sT: [],
      },
      {
        t: "fas fa-broadcast-tower",
        sT: [],
      },
      {
        t: "fas fa-broom",
        sT: [],
      },
      {
        t: "fas fa-browser",
        sT: [],
      },
      {
        t: "fas fa-brush",
        sT: [],
      },
      {
        t: "fas fa-bug",
        sT: [],
      },
      {
        t: "fas fa-building",
        sT: [],
      },
      {
        t: "fas fa-bullhorn",
        sT: [],
      },
      {
        t: "fas fa-bullseye",
        sT: [],
      },
      {
        t: "fas fa-bullseye-arrow",
        sT: [],
      },
      {
        t: "fas fa-bullseye-pointer",
        sT: [],
      },
      {
        t: "fas fa-burger-soda",
        sT: [],
      },
      {
        t: "fas fa-burn",
        sT: [],
      },
      {
        t: "fas fa-burrito",
        sT: [],
      },
      {
        t: "fas fa-bus",
        sT: [],
      },
      {
        t: "fas fa-bus-alt",
        sT: [],
      },
      {
        t: "fas fa-bus-school",
        sT: [],
      },
      {
        t: "fas fa-business-time",
        sT: [],
      },
      {
        t: "fas fa-cabinet-filing",
        sT: [],
      },
      {
        t: "fas fa-cactus",
        sT: [],
      },
      {
        t: "fas fa-calculator",
        sT: [],
      },
      {
        t: "fas fa-calculator-alt",
        sT: [],
      },
      {
        t: "fas fa-calendar",
        sT: [],
      },
      {
        t: "fas fa-calendar-alt",
        sT: [],
      },
      {
        t: "fas fa-calendar-check",
        sT: [],
      },
      {
        t: "fas fa-calendar-day",
        sT: [],
      },
      {
        t: "fas fa-calendar-edit",
        sT: [],
      },
      {
        t: "fas fa-calendar-exclamation",
        sT: [],
      },
      {
        t: "fas fa-calendar-minus",
        sT: [],
      },
      {
        t: "fas fa-calendar-plus",
        sT: [],
      },
      {
        t: "fas fa-calendar-star",
        sT: [],
      },
      {
        t: "fas fa-calendar-times",
        sT: [],
      },
      {
        t: "fas fa-calendar-week",
        sT: [],
      },
      {
        t: "fas fa-camcorder",
        sT: [],
      },
      {
        t: "fas fa-camera",
        sT: [],
      },
      {
        t: "fas fa-camera-alt",
        sT: [],
      },
      {
        t: "fas fa-camera-home",
        sT: [],
      },
      {
        t: "fas fa-camera-movie",
        sT: [],
      },
      {
        t: "fas fa-camera-polaroid",
        sT: [],
      },
      {
        t: "fas fa-camera-retro",
        sT: [],
      },
      {
        t: "fas fa-campfire",
        sT: [],
      },
      {
        t: "fas fa-campground",
        sT: [],
      },
      {
        t: "fas fa-candle-holder",
        sT: [],
      },
      {
        t: "fas fa-candy-cane",
        sT: [],
      },
      {
        t: "fas fa-candy-corn",
        sT: [],
      },
      {
        t: "fas fa-cannabis",
        sT: [],
      },
      {
        t: "fas fa-capsules",
        sT: [],
      },
      {
        t: "fas fa-car",
        sT: [],
      },
      {
        t: "fas fa-car-alt",
        sT: [],
      },
      {
        t: "fas fa-car-battery",
        sT: [],
      },
      {
        t: "fas fa-car-building",
        sT: [],
      },
      {
        t: "fas fa-car-bump",
        sT: [],
      },
      {
        t: "fas fa-car-bus",
        sT: [],
      },
      {
        t: "fas fa-car-crash",
        sT: [],
      },
      {
        t: "fas fa-car-garage",
        sT: [],
      },
      {
        t: "fas fa-car-mechanic",
        sT: [],
      },
      {
        t: "fas fa-car-side",
        sT: [],
      },
      {
        t: "fas fa-car-tilt",
        sT: [],
      },
      {
        t: "fas fa-car-wash",
        sT: [],
      },
      {
        t: "fas fa-caravan",
        sT: [],
      },
      {
        t: "fas fa-caravan-alt",
        sT: [],
      },
      {
        t: "fas fa-caret-circle-down",
        sT: [],
      },
      {
        t: "fas fa-caret-circle-left",
        sT: [],
      },
      {
        t: "fas fa-caret-circle-right",
        sT: [],
      },
      {
        t: "fas fa-caret-circle-up",
        sT: [],
      },
      {
        t: "fas fa-caret-down",
        sT: [],
      },
      {
        t: "fas fa-caret-left",
        sT: [],
      },
      {
        t: "fas fa-caret-right",
        sT: [],
      },
      {
        t: "fas fa-caret-square-down",
        sT: [],
      },
      {
        t: "fas fa-caret-square-left",
        sT: [],
      },
      {
        t: "fas fa-caret-square-right",
        sT: [],
      },
      {
        t: "fas fa-caret-square-up",
        sT: [],
      },
      {
        t: "fas fa-caret-up",
        sT: [],
      },
      {
        t: "fas fa-carrot",
        sT: [],
      },
      {
        t: "fas fa-cars",
        sT: [],
      },
      {
        t: "fas fa-cart-arrow-down",
        sT: [],
      },
      {
        t: "fas fa-cart-plus",
        sT: [],
      },
      {
        t: "fas fa-cash-register",
        sT: [],
      },
      {
        t: "fas fa-cassette-tape",
        sT: [],
      },
      {
        t: "fas fa-cat",
        sT: [],
      },
      {
        t: "fas fa-cat-space",
        sT: [],
      },
      {
        t: "fas fa-cauldron",
        sT: [],
      },
      {
        t: "fas fa-cctv",
        sT: [],
      },
      {
        t: "fas fa-certificate",
        sT: [],
      },
      {
        t: "fas fa-chair",
        sT: [],
      },
      {
        t: "fas fa-chair-office",
        sT: [],
      },
      {
        t: "fas fa-chalkboard",
        sT: [],
      },
      {
        t: "fas fa-chalkboard-teacher",
        sT: [],
      },
      {
        t: "fas fa-charging-station",
        sT: [],
      },
      {
        t: "fas fa-chart-area",
        sT: [],
      },
      {
        t: "fas fa-chart-bar",
        sT: [],
      },
      {
        t: "fas fa-chart-line",
        sT: [],
      },
      {
        t: "fas fa-chart-line-down",
        sT: [],
      },
      {
        t: "fas fa-chart-network",
        sT: [],
      },
      {
        t: "fas fa-chart-pie",
        sT: [],
      },
      {
        t: "fas fa-chart-pie-alt",
        sT: [],
      },
      {
        t: "fas fa-chart-scatter",
        sT: [],
      },
      {
        t: "fas fa-check",
        sT: [],
      },
      {
        t: "fas fa-check-circle",
        sT: [],
      },
      {
        t: "fas fa-check-double",
        sT: [],
      },
      {
        t: "fas fa-check-square",
        sT: [],
      },
      {
        t: "fas fa-cheese",
        sT: [],
      },
      {
        t: "fas fa-cheese-swiss",
        sT: [],
      },
      {
        t: "fas fa-cheeseburger",
        sT: [],
      },
      {
        t: "fas fa-chess",
        sT: [],
      },
      {
        t: "fas fa-chess-bishop",
        sT: [],
      },
      {
        t: "fas fa-chess-bishop-alt",
        sT: [],
      },
      {
        t: "fas fa-chess-board",
        sT: [],
      },
      {
        t: "fas fa-chess-clock",
        sT: [],
      },
      {
        t: "fas fa-chess-clock-alt",
        sT: [],
      },
      {
        t: "fas fa-chess-king",
        sT: [],
      },
      {
        t: "fas fa-chess-king-alt",
        sT: [],
      },
      {
        t: "fas fa-chess-knight",
        sT: [],
      },
      {
        t: "fas fa-chess-knight-alt",
        sT: [],
      },
      {
        t: "fas fa-chess-pawn",
        sT: [],
      },
      {
        t: "fas fa-chess-pawn-alt",
        sT: [],
      },
      {
        t: "fas fa-chess-queen",
        sT: [],
      },
      {
        t: "fas fa-chess-queen-alt",
        sT: [],
      },
      {
        t: "fas fa-chess-rook",
        sT: [],
      },
      {
        t: "fas fa-chess-rook-alt",
        sT: [],
      },
      {
        t: "fas fa-chevron-circle-down",
        sT: [],
      },
      {
        t: "fas fa-chevron-circle-left",
        sT: [],
      },
      {
        t: "fas fa-chevron-circle-right",
        sT: [],
      },
      {
        t: "fas fa-chevron-circle-up",
        sT: [],
      },
      {
        t: "fas fa-chevron-double-down",
        sT: [],
      },
      {
        t: "fas fa-chevron-double-left",
        sT: [],
      },
      {
        t: "fas fa-chevron-double-right",
        sT: [],
      },
      {
        t: "fas fa-chevron-double-up",
        sT: [],
      },
      {
        t: "fas fa-chevron-down",
        sT: [],
      },
      {
        t: "fas fa-chevron-left",
        sT: [],
      },
      {
        t: "fas fa-chevron-right",
        sT: [],
      },
      {
        t: "fas fa-chevron-square-down",
        sT: [],
      },
      {
        t: "fas fa-chevron-square-left",
        sT: [],
      },
      {
        t: "fas fa-chevron-square-right",
        sT: [],
      },
      {
        t: "fas fa-chevron-square-up",
        sT: [],
      },
      {
        t: "fas fa-chevron-up",
        sT: [],
      },
      {
        t: "fas fa-child",
        sT: [],
      },
      {
        t: "fas fa-chimney",
        sT: [],
      },
      {
        t: "fas fa-church",
        sT: [],
      },
      {
        t: "fas fa-circle",
        sT: [],
      },
      {
        t: "fas fa-circle-notch",
        sT: [],
      },
      {
        t: "fas fa-city",
        sT: [],
      },
      {
        t: "fas fa-clarinet",
        sT: [],
      },
      {
        t: "fas fa-claw-marks",
        sT: [],
      },
      {
        t: "fas fa-clinic-medical",
        sT: [],
      },
      {
        t: "fas fa-clipboard",
        sT: [],
      },
      {
        t: "fas fa-clipboard-check",
        sT: [],
      },
      {
        t: "fas fa-clipboard-list",
        sT: [],
      },
      {
        t: "fas fa-clipboard-list-check",
        sT: [],
      },
      {
        t: "fas fa-clipboard-prescription",
        sT: [],
      },
      {
        t: "fas fa-clipboard-user",
        sT: [],
      },
      {
        t: "fas fa-clock",
        sT: [],
      },
      {
        t: "fas fa-clone",
        sT: [],
      },
      {
        t: "fas fa-closed-captioning",
        sT: [],
      },
      {
        t: "fas fa-cloud",
        sT: [],
      },
      {
        t: "fas fa-cloud-download",
        sT: [],
      },
      {
        t: "fas fa-cloud-download-alt",
        sT: [],
      },
      {
        t: "fas fa-cloud-drizzle",
        sT: [],
      },
      {
        t: "fas fa-cloud-hail",
        sT: [],
      },
      {
        t: "fas fa-cloud-hail-mixed",
        sT: [],
      },
      {
        t: "fas fa-cloud-meatball",
        sT: [],
      },
      {
        t: "fas fa-cloud-moon",
        sT: [],
      },
      {
        t: "fas fa-cloud-moon-rain",
        sT: [],
      },
      {
        t: "fas fa-cloud-music",
        sT: [],
      },
      {
        t: "fas fa-cloud-rain",
        sT: [],
      },
      {
        t: "fas fa-cloud-rainbow",
        sT: [],
      },
      {
        t: "fas fa-cloud-showers",
        sT: [],
      },
      {
        t: "fas fa-cloud-showers-heavy",
        sT: [],
      },
      {
        t: "fas fa-cloud-sleet",
        sT: [],
      },
      {
        t: "fas fa-cloud-snow",
        sT: [],
      },
      {
        t: "fas fa-cloud-sun",
        sT: [],
      },
      {
        t: "fas fa-cloud-sun-rain",
        sT: [],
      },
      {
        t: "fas fa-cloud-upload",
        sT: [],
      },
      {
        t: "fas fa-cloud-upload-alt",
        sT: [],
      },
      {
        t: "fas fa-clouds",
        sT: [],
      },
      {
        t: "fas fa-clouds-moon",
        sT: [],
      },
      {
        t: "fas fa-clouds-sun",
        sT: [],
      },
      {
        t: "fas fa-club",
        sT: [],
      },
      {
        t: "fas fa-cocktail",
        sT: [],
      },
      {
        t: "fas fa-code",
        sT: [],
      },
      {
        t: "fas fa-code-branch",
        sT: [],
      },
      {
        t: "fas fa-code-commit",
        sT: [],
      },
      {
        t: "fas fa-code-merge",
        sT: [],
      },
      {
        t: "fas fa-coffee",
        sT: [],
      },
      {
        t: "fas fa-coffee-pot",
        sT: [],
      },
      {
        t: "fas fa-coffee-togo",
        sT: [],
      },
      {
        t: "fas fa-coffin",
        sT: [],
      },
      {
        t: "fas fa-coffin-cross",
        sT: [],
      },
      {
        t: "fas fa-cog",
        sT: [],
      },
      {
        t: "fas fa-cogs",
        sT: [],
      },
      {
        t: "fas fa-coin",
        sT: [],
      },
      {
        t: "fas fa-coins",
        sT: [],
      },
      {
        t: "fas fa-columns",
        sT: [],
      },
      {
        t: "fas fa-comet",
        sT: [],
      },
      {
        t: "fas fa-comment",
        sT: [],
      },
      {
        t: "fas fa-comment-alt",
        sT: [],
      },
      {
        t: "fas fa-comment-alt-check",
        sT: [],
      },
      {
        t: "fas fa-comment-alt-dollar",
        sT: [],
      },
      {
        t: "fas fa-comment-alt-dots",
        sT: [],
      },
      {
        t: "fas fa-comment-alt-edit",
        sT: [],
      },
      {
        t: "fas fa-comment-alt-exclamation",
        sT: [],
      },
      {
        t: "fas fa-comment-alt-lines",
        sT: [],
      },
      {
        t: "fas fa-comment-alt-medical",
        sT: [],
      },
      {
        t: "fas fa-comment-alt-minus",
        sT: [],
      },
      {
        t: "fas fa-comment-alt-music",
        sT: [],
      },
      {
        t: "fas fa-comment-alt-plus",
        sT: [],
      },
      {
        t: "fas fa-comment-alt-slash",
        sT: [],
      },
      {
        t: "fas fa-comment-alt-smile",
        sT: [],
      },
      {
        t: "fas fa-comment-alt-times",
        sT: [],
      },
      {
        t: "fas fa-comment-check",
        sT: [],
      },
      {
        t: "fas fa-comment-dollar",
        sT: [],
      },
      {
        t: "fas fa-comment-dots",
        sT: [],
      },
      {
        t: "fas fa-comment-edit",
        sT: [],
      },
      {
        t: "fas fa-comment-exclamation",
        sT: [],
      },
      {
        t: "fas fa-comment-lines",
        sT: [],
      },
      {
        t: "fas fa-comment-medical",
        sT: [],
      },
      {
        t: "fas fa-comment-minus",
        sT: [],
      },
      {
        t: "fas fa-comment-music",
        sT: [],
      },
      {
        t: "fas fa-comment-plus",
        sT: [],
      },
      {
        t: "fas fa-comment-slash",
        sT: [],
      },
      {
        t: "fas fa-comment-smile",
        sT: [],
      },
      {
        t: "fas fa-comment-times",
        sT: [],
      },
      {
        t: "fas fa-comments",
        sT: [],
      },
      {
        t: "fas fa-comments-alt",
        sT: [],
      },
      {
        t: "fas fa-comments-alt-dollar",
        sT: [],
      },
      {
        t: "fas fa-comments-dollar",
        sT: [],
      },
      {
        t: "fas fa-compact-disc",
        sT: [],
      },
      {
        t: "fas fa-compass",
        sT: [],
      },
      {
        t: "fas fa-compass-slash",
        sT: [],
      },
      {
        t: "fas fa-compress",
        sT: [],
      },
      {
        t: "fas fa-compress-alt",
        sT: [],
      },
      {
        t: "fas fa-compress-arrows-alt",
        sT: [],
      },
      {
        t: "fas fa-compress-wide",
        sT: [],
      },
      {
        t: "fas fa-computer-classic",
        sT: [],
      },
      {
        t: "fas fa-computer-speaker",
        sT: [],
      },
      {
        t: "fas fa-concierge-bell",
        sT: [],
      },
      {
        t: "fas fa-construction",
        sT: [],
      },
      {
        t: "fas fa-container-storage",
        sT: [],
      },
      {
        t: "fas fa-conveyor-belt",
        sT: [],
      },
      {
        t: "fas fa-conveyor-belt-alt",
        sT: [],
      },
      {
        t: "fas fa-cookie",
        sT: [],
      },
      {
        t: "fas fa-cookie-bite",
        sT: [],
      },
      {
        t: "fas fa-copy",
        sT: [],
      },
      {
        t: "fas fa-copyright",
        sT: [],
      },
      {
        t: "fas fa-corn",
        sT: [],
      },
      {
        t: "fas fa-couch",
        sT: [],
      },
      {
        t: "fas fa-cow",
        sT: [],
      },
      {
        t: "fas fa-cowbell",
        sT: [],
      },
      {
        t: "fas fa-cowbell-more",
        sT: [],
      },
      {
        t: "fas fa-credit-card",
        sT: [],
      },
      {
        t: "fas fa-credit-card-blank",
        sT: [],
      },
      {
        t: "fas fa-credit-card-front",
        sT: [],
      },
      {
        t: "fas fa-cricket",
        sT: [],
      },
      {
        t: "fas fa-croissant",
        sT: [],
      },
      {
        t: "fas fa-crop",
        sT: [],
      },
      {
        t: "fas fa-crop-alt",
        sT: [],
      },
      {
        t: "fas fa-cross",
        sT: [],
      },
      {
        t: "fas fa-crosshairs",
        sT: [],
      },
      {
        t: "fas fa-crow",
        sT: [],
      },
      {
        t: "fas fa-crown",
        sT: [],
      },
      {
        t: "fas fa-crutch",
        sT: [],
      },
      {
        t: "fas fa-crutches",
        sT: [],
      },
      {
        t: "fas fa-cube",
        sT: [],
      },
      {
        t: "fas fa-cubes",
        sT: [],
      },
      {
        t: "fas fa-curling",
        sT: [],
      },
      {
        t: "fas fa-cut",
        sT: [],
      },
      {
        t: "fas fa-dagger",
        sT: [],
      },
      {
        t: "fas fa-database",
        sT: [],
      },
      {
        t: "fas fa-deaf",
        sT: [],
      },
      {
        t: "fas fa-debug",
        sT: [],
      },
      {
        t: "fas fa-deer",
        sT: [],
      },
      {
        t: "fas fa-deer-rudolph",
        sT: [],
      },
      {
        t: "fas fa-democrat",
        sT: [],
      },
      {
        t: "fas fa-desktop",
        sT: [],
      },
      {
        t: "fas fa-desktop-alt",
        sT: [],
      },
      {
        t: "fas fa-dewpoint",
        sT: [],
      },
      {
        t: "fas fa-dharmachakra",
        sT: [],
      },
      {
        t: "fas fa-diagnoses",
        sT: [],
      },
      {
        t: "fas fa-diamond",
        sT: [],
      },
      {
        t: "fas fa-dice",
        sT: [],
      },
      {
        t: "fas fa-dice-d10",
        sT: [],
      },
      {
        t: "fas fa-dice-d12",
        sT: [],
      },
      {
        t: "fas fa-dice-d20",
        sT: [],
      },
      {
        t: "fas fa-dice-d4",
        sT: [],
      },
      {
        t: "fas fa-dice-d6",
        sT: [],
      },
      {
        t: "fas fa-dice-d8",
        sT: [],
      },
      {
        t: "fas fa-dice-five",
        sT: [],
      },
      {
        t: "fas fa-dice-four",
        sT: [],
      },
      {
        t: "fas fa-dice-one",
        sT: [],
      },
      {
        t: "fas fa-dice-six",
        sT: [],
      },
      {
        t: "fas fa-dice-three",
        sT: [],
      },
      {
        t: "fas fa-dice-two",
        sT: [],
      },
      {
        t: "fas fa-digging",
        sT: [],
      },
      {
        t: "fas fa-digital-tachograph",
        sT: [],
      },
      {
        t: "fas fa-diploma",
        sT: [],
      },
      {
        t: "fas fa-directions",
        sT: [],
      },
      {
        t: "fas fa-disc-drive",
        sT: [],
      },
      {
        t: "fas fa-disease",
        sT: [],
      },
      {
        t: "fas fa-divide",
        sT: [],
      },
      {
        t: "fas fa-dizzy",
        sT: [],
      },
      {
        t: "fas fa-dna",
        sT: [],
      },
      {
        t: "fas fa-do-not-enter",
        sT: [],
      },
      {
        t: "fas fa-dog",
        sT: [],
      },
      {
        t: "fas fa-dog-leashed",
        sT: [],
      },
      {
        t: "fas fa-dollar-sign",
        sT: [],
      },
      {
        t: "fas fa-dolly",
        sT: [],
      },
      {
        t: "fas fa-dolly-empty",
        sT: [],
      },
      {
        t: "fas fa-dolly-flatbed",
        sT: [],
      },
      {
        t: "fas fa-dolly-flatbed-alt",
        sT: [],
      },
      {
        t: "fas fa-dolly-flatbed-empty",
        sT: [],
      },
      {
        t: "fas fa-donate",
        sT: [],
      },
      {
        t: "fas fa-door-closed",
        sT: [],
      },
      {
        t: "fas fa-door-open",
        sT: [],
      },
      {
        t: "fas fa-dot-circle",
        sT: [],
      },
      {
        t: "fas fa-dove",
        sT: [],
      },
      {
        t: "fas fa-download",
        sT: [],
      },
      {
        t: "fas fa-drafting-compass",
        sT: [],
      },
      {
        t: "fas fa-dragon",
        sT: [],
      },
      {
        t: "fas fa-draw-circle",
        sT: [],
      },
      {
        t: "fas fa-draw-polygon",
        sT: [],
      },
      {
        t: "fas fa-draw-square",
        sT: [],
      },
      {
        t: "fas fa-dreidel",
        sT: [],
      },
      {
        t: "fas fa-drone",
        sT: [],
      },
      {
        t: "fas fa-drone-alt",
        sT: [],
      },
      {
        t: "fas fa-drum",
        sT: [],
      },
      {
        t: "fas fa-drum-steelpan",
        sT: [],
      },
      {
        t: "fas fa-drumstick",
        sT: [],
      },
      {
        t: "fas fa-drumstick-bite",
        sT: [],
      },
      {
        t: "fas fa-dryer",
        sT: [],
      },
      {
        t: "fas fa-dryer-alt",
        sT: [],
      },
      {
        t: "fas fa-duck",
        sT: [],
      },
      {
        t: "fas fa-dumbbell",
        sT: [],
      },
      {
        t: "fas fa-dumpster",
        sT: [],
      },
      {
        t: "fas fa-dumpster-fire",
        sT: [],
      },
      {
        t: "fas fa-dungeon",
        sT: [],
      },
      {
        t: "fas fa-ear",
        sT: [],
      },
      {
        t: "fas fa-ear-muffs",
        sT: [],
      },
      {
        t: "fas fa-eclipse",
        sT: [],
      },
      {
        t: "fas fa-eclipse-alt",
        sT: [],
      },
      {
        t: "fas fa-edit",
        sT: [],
      },
      {
        t: "fas fa-egg",
        sT: [],
      },
      {
        t: "fas fa-egg-fried",
        sT: [],
      },
      {
        t: "fas fa-eject",
        sT: [],
      },
      {
        t: "fas fa-elephant",
        sT: [],
      },
      {
        t: "fas fa-ellipsis-h",
        sT: [],
      },
      {
        t: "fas fa-ellipsis-h-alt",
        sT: [],
      },
      {
        t: "fas fa-ellipsis-v",
        sT: [],
      },
      {
        t: "fas fa-ellipsis-v-alt",
        sT: [],
      },
      {
        t: "fas fa-empty-set",
        sT: [],
      },
      {
        t: "fas fa-engine-warning",
        sT: [],
      },
      {
        t: "fas fa-envelope",
        sT: [],
      },
      {
        t: "fas fa-envelope-open",
        sT: [],
      },
      {
        t: "fas fa-envelope-open-dollar",
        sT: [],
      },
      {
        t: "fas fa-envelope-open-text",
        sT: [],
      },
      {
        t: "fas fa-envelope-square",
        sT: [],
      },
      {
        t: "fas fa-equals",
        sT: [],
      },
      {
        t: "fas fa-eraser",
        sT: [],
      },
      {
        t: "fas fa-ethernet",
        sT: [],
      },
      {
        t: "fas fa-euro-sign",
        sT: [],
      },
      {
        t: "fas fa-exchange",
        sT: [],
      },
      {
        t: "fas fa-exchange-alt",
        sT: [],
      },
      {
        t: "fas fa-exclamation",
        sT: [],
      },
      {
        t: "fas fa-exclamation-circle",
        sT: [],
      },
      {
        t: "fas fa-exclamation-square",
        sT: [],
      },
      {
        t: "fas fa-exclamation-triangle",
        sT: [],
      },
      {
        t: "fas fa-expand",
        sT: [],
      },
      {
        t: "fas fa-expand-alt",
        sT: [],
      },
      {
        t: "fas fa-expand-arrows",
        sT: [],
      },
      {
        t: "fas fa-expand-arrows-alt",
        sT: [],
      },
      {
        t: "fas fa-expand-wide",
        sT: [],
      },
      {
        t: "fas fa-external-link",
        sT: [],
      },
      {
        t: "fas fa-external-link-alt",
        sT: [],
      },
      {
        t: "fas fa-external-link-square",
        sT: [],
      },
      {
        t: "fas fa-external-link-square-alt",
        sT: [],
      },
      {
        t: "fas fa-eye",
        sT: [],
      },
      {
        t: "fas fa-eye-dropper",
        sT: [],
      },
      {
        t: "fas fa-eye-evil",
        sT: [],
      },
      {
        t: "fas fa-eye-slash",
        sT: [],
      },
      {
        t: "fas fa-fan",
        sT: [],
      },
      {
        t: "fas fa-fan-table",
        sT: [],
      },
      {
        t: "fas fa-farm",
        sT: [],
      },
      {
        t: "fas fa-fast-backward",
        sT: [],
      },
      {
        t: "fas fa-fast-forward",
        sT: [],
      },
      {
        t: "fas fa-faucet",
        sT: [],
      },
      {
        t: "fas fa-faucet-drip",
        sT: [],
      },
      {
        t: "fas fa-fax",
        sT: [],
      },
      {
        t: "fas fa-feather",
        sT: [],
      },
      {
        t: "fas fa-feather-alt",
        sT: [],
      },
      {
        t: "fas fa-female",
        sT: [],
      },
      {
        t: "fas fa-field-hockey",
        sT: [],
      },
      {
        t: "fas fa-fighter-jet",
        sT: [],
      },
      {
        t: "fas fa-file",
        sT: [],
      },
      {
        t: "fas fa-file-alt",
        sT: [],
      },
      {
        t: "fas fa-file-archive",
        sT: [],
      },
      {
        t: "fas fa-file-audio",
        sT: [],
      },
      {
        t: "fas fa-file-certificate",
        sT: [],
      },
      {
        t: "fas fa-file-chart-line",
        sT: [],
      },
      {
        t: "fas fa-file-chart-pie",
        sT: [],
      },
      {
        t: "fas fa-file-check",
        sT: [],
      },
      {
        t: "fas fa-file-code",
        sT: [],
      },
      {
        t: "fas fa-file-contract",
        sT: [],
      },
      {
        t: "fas fa-file-csv",
        sT: [],
      },
      {
        t: "fas fa-file-download",
        sT: [],
      },
      {
        t: "fas fa-file-edit",
        sT: [],
      },
      {
        t: "fas fa-file-excel",
        sT: [],
      },
      {
        t: "fas fa-file-exclamation",
        sT: [],
      },
      {
        t: "fas fa-file-export",
        sT: [],
      },
      {
        t: "fas fa-file-image",
        sT: [],
      },
      {
        t: "fas fa-file-import",
        sT: [],
      },
      {
        t: "fas fa-file-invoice",
        sT: [],
      },
      {
        t: "fas fa-file-invoice-dollar",
        sT: [],
      },
      {
        t: "fas fa-file-medical",
        sT: [],
      },
      {
        t: "fas fa-file-medical-alt",
        sT: [],
      },
      {
        t: "fas fa-file-minus",
        sT: [],
      },
      {
        t: "fas fa-file-music",
        sT: [],
      },
      {
        t: "fas fa-file-pdf",
        sT: [],
      },
      {
        t: "fas fa-file-plus",
        sT: [],
      },
      {
        t: "fas fa-file-powerpoint",
        sT: [],
      },
      {
        t: "fas fa-file-prescription",
        sT: [],
      },
      {
        t: "fas fa-file-search",
        sT: [],
      },
      {
        t: "fas fa-file-signature",
        sT: [],
      },
      {
        t: "fas fa-file-spreadsheet",
        sT: [],
      },
      {
        t: "fas fa-file-times",
        sT: [],
      },
      {
        t: "fas fa-file-upload",
        sT: [],
      },
      {
        t: "fas fa-file-user",
        sT: [],
      },
      {
        t: "fas fa-file-video",
        sT: [],
      },
      {
        t: "fas fa-file-word",
        sT: [],
      },
      {
        t: "fas fa-files-medical",
        sT: [],
      },
      {
        t: "fas fa-fill",
        sT: [],
      },
      {
        t: "fas fa-fill-drip",
        sT: [],
      },
      {
        t: "fas fa-film",
        sT: [],
      },
      {
        t: "fas fa-film-alt",
        sT: [],
      },
      {
        t: "fas fa-film-canister",
        sT: [],
      },
      {
        t: "fas fa-filter",
        sT: [],
      },
      {
        t: "fas fa-fingerprint",
        sT: [],
      },
      {
        t: "fas fa-fire",
        sT: [],
      },
      {
        t: "fas fa-fire-alt",
        sT: [],
      },
      {
        t: "fas fa-fire-extinguisher",
        sT: [],
      },
      {
        t: "fas fa-fire-smoke",
        sT: [],
      },
      {
        t: "fas fa-fireplace",
        sT: [],
      },
      {
        t: "fas fa-first-aid",
        sT: [],
      },
      {
        t: "fas fa-fish",
        sT: [],
      },
      {
        t: "fas fa-fish-cooked",
        sT: [],
      },
      {
        t: "fas fa-fist-raised",
        sT: [],
      },
      {
        t: "fas fa-flag",
        sT: [],
      },
      {
        t: "fas fa-flag-alt",
        sT: [],
      },
      {
        t: "fas fa-flag-checkered",
        sT: [],
      },
      {
        t: "fas fa-flag-usa",
        sT: [],
      },
      {
        t: "fas fa-flame",
        sT: [],
      },
      {
        t: "fas fa-flashlight",
        sT: [],
      },
      {
        t: "fas fa-flask",
        sT: [],
      },
      {
        t: "fas fa-flask-poison",
        sT: [],
      },
      {
        t: "fas fa-flask-potion",
        sT: [],
      },
      {
        t: "fas fa-flower",
        sT: [],
      },
      {
        t: "fas fa-flower-daffodil",
        sT: [],
      },
      {
        t: "fas fa-flower-tulip",
        sT: [],
      },
      {
        t: "fas fa-flushed",
        sT: [],
      },
      {
        t: "fas fa-flute",
        sT: [],
      },
      {
        t: "fas fa-flux-capacitor",
        sT: [],
      },
      {
        t: "fas fa-fog",
        sT: [],
      },
      {
        t: "fas fa-folder",
        sT: [],
      },
      {
        t: "fas fa-folder-download",
        sT: [],
      },
      {
        t: "fas fa-folder-minus",
        sT: [],
      },
      {
        t: "fas fa-folder-open",
        sT: [],
      },
      {
        t: "fas fa-folder-plus",
        sT: [],
      },
      {
        t: "fas fa-folder-times",
        sT: [],
      },
      {
        t: "fas fa-folder-tree",
        sT: [],
      },
      {
        t: "fas fa-folder-upload",
        sT: [],
      },
      {
        t: "fas fa-folders",
        sT: [],
      },
      {
        t: "fas fa-font",
        sT: [],
      },
      {
        t: "fas fa-font-case",
        sT: [],
      },
      {
        t: "fas fa-football-ball",
        sT: [],
      },
      {
        t: "fas fa-football-helmet",
        sT: [],
      },
      {
        t: "fas fa-forklift",
        sT: [],
      },
      {
        t: "fas fa-forward",
        sT: [],
      },
      {
        t: "fas fa-fragile",
        sT: [],
      },
      {
        t: "fas fa-french-fries",
        sT: [],
      },
      {
        t: "fas fa-frog",
        sT: [],
      },
      {
        t: "fas fa-frosty-head",
        sT: [],
      },
      {
        t: "fas fa-frown",
        sT: [],
      },
      {
        t: "fas fa-frown-open",
        sT: [],
      },
      {
        t: "fas fa-function",
        sT: [],
      },
      {
        t: "fas fa-funnel-dollar",
        sT: [],
      },
      {
        t: "fas fa-futbol",
        sT: [],
      },
      {
        t: "fas fa-galaxy",
        sT: [],
      },
      {
        t: "fas fa-game-board",
        sT: [],
      },
      {
        t: "fas fa-game-board-alt",
        sT: [],
      },
      {
        t: "fas fa-game-console-handheld",
        sT: [],
      },
      {
        t: "fas fa-gamepad",
        sT: [],
      },
      {
        t: "fas fa-gamepad-alt",
        sT: [],
      },
      {
        t: "fas fa-garage",
        sT: [],
      },
      {
        t: "fas fa-garage-car",
        sT: [],
      },
      {
        t: "fas fa-garage-open",
        sT: [],
      },
      {
        t: "fas fa-gas-pump",
        sT: [],
      },
      {
        t: "fas fa-gas-pump-slash",
        sT: [],
      },
      {
        t: "fas fa-gavel",
        sT: [],
      },
      {
        t: "fas fa-gem",
        sT: [],
      },
      {
        t: "fas fa-genderless",
        sT: [],
      },
      {
        t: "fas fa-ghost",
        sT: [],
      },
      {
        t: "fas fa-gift",
        sT: [],
      },
      {
        t: "fas fa-gift-card",
        sT: [],
      },
      {
        t: "fas fa-gifts",
        sT: [],
      },
      {
        t: "fas fa-gingerbread-man",
        sT: [],
      },
      {
        t: "fas fa-glass",
        sT: [],
      },
      {
        t: "fas fa-glass-champagne",
        sT: [],
      },
      {
        t: "fas fa-glass-cheers",
        sT: [],
      },
      {
        t: "fas fa-glass-citrus",
        sT: [],
      },
      {
        t: "fas fa-glass-martini",
        sT: [],
      },
      {
        t: "fas fa-glass-martini-alt",
        sT: [],
      },
      {
        t: "fas fa-glass-whiskey",
        sT: [],
      },
      {
        t: "fas fa-glass-whiskey-rocks",
        sT: [],
      },
      {
        t: "fas fa-glasses",
        sT: [],
      },
      {
        t: "fas fa-glasses-alt",
        sT: [],
      },
      {
        t: "fas fa-globe",
        sT: [],
      },
      {
        t: "fas fa-globe-africa",
        sT: [],
      },
      {
        t: "fas fa-globe-americas",
        sT: [],
      },
      {
        t: "fas fa-globe-asia",
        sT: [],
      },
      {
        t: "fas fa-globe-europe",
        sT: [],
      },
      {
        t: "fas fa-globe-snow",
        sT: [],
      },
      {
        t: "fas fa-globe-stand",
        sT: [],
      },
      {
        t: "fas fa-golf-ball",
        sT: [],
      },
      {
        t: "fas fa-golf-club",
        sT: [],
      },
      {
        t: "fas fa-gopuram",
        sT: [],
      },
      {
        t: "fas fa-graduation-cap",
        sT: [],
      },
      {
        t: "fas fa-gramophone",
        sT: [],
      },
      {
        t: "fas fa-greater-than",
        sT: [],
      },
      {
        t: "fas fa-greater-than-equal",
        sT: [],
      },
      {
        t: "fas fa-grimace",
        sT: [],
      },
      {
        t: "fas fa-grin",
        sT: [],
      },
      {
        t: "fas fa-grin-alt",
        sT: [],
      },
      {
        t: "fas fa-grin-beam",
        sT: [],
      },
      {
        t: "fas fa-grin-beam-sweat",
        sT: [],
      },
      {
        t: "fas fa-grin-hearts",
        sT: [],
      },
      {
        t: "fas fa-grin-squint",
        sT: [],
      },
      {
        t: "fas fa-grin-squint-tears",
        sT: [],
      },
      {
        t: "fas fa-grin-stars",
        sT: [],
      },
      {
        t: "fas fa-grin-tears",
        sT: [],
      },
      {
        t: "fas fa-grin-tongue",
        sT: [],
      },
      {
        t: "fas fa-grin-tongue-squint",
        sT: [],
      },
      {
        t: "fas fa-grin-tongue-wink",
        sT: [],
      },
      {
        t: "fas fa-grin-wink",
        sT: [],
      },
      {
        t: "fas fa-grip-horizontal",
        sT: [],
      },
      {
        t: "fas fa-grip-lines",
        sT: [],
      },
      {
        t: "fas fa-grip-lines-vertical",
        sT: [],
      },
      {
        t: "fas fa-grip-vertical",
        sT: [],
      },
      {
        t: "fas fa-guitar",
        sT: [],
      },
      {
        t: "fas fa-guitar-electric",
        sT: [],
      },
      {
        t: "fas fa-guitars",
        sT: [],
      },
      {
        t: "fas fa-h-square",
        sT: [],
      },
      {
        t: "fas fa-h1",
        sT: [],
      },
      {
        t: "fas fa-h2",
        sT: [],
      },
      {
        t: "fas fa-h3",
        sT: [],
      },
      {
        t: "fas fa-h4",
        sT: [],
      },
      {
        t: "fas fa-hamburger",
        sT: [],
      },
      {
        t: "fas fa-hammer",
        sT: [],
      },
      {
        t: "fas fa-hammer-war",
        sT: [],
      },
      {
        t: "fas fa-hamsa",
        sT: [],
      },
      {
        t: "fas fa-hand-heart",
        sT: [],
      },
      {
        t: "fas fa-hand-holding",
        sT: [],
      },
      {
        t: "fas fa-hand-holding-box",
        sT: [],
      },
      {
        t: "fas fa-hand-holding-heart",
        sT: [],
      },
      {
        t: "fas fa-hand-holding-magic",
        sT: [],
      },
      {
        t: "fas fa-hand-holding-medical",
        sT: [],
      },
      {
        t: "fas fa-hand-holding-seedling",
        sT: [],
      },
      {
        t: "fas fa-hand-holding-usd",
        sT: [],
      },
      {
        t: "fas fa-hand-holding-water",
        sT: [],
      },
      {
        t: "fas fa-hand-lizard",
        sT: [],
      },
      {
        t: "fas fa-hand-middle-finger",
        sT: [],
      },
      {
        t: "fas fa-hand-paper",
        sT: [],
      },
      {
        t: "fas fa-hand-peace",
        sT: [],
      },
      {
        t: "fas fa-hand-point-down",
        sT: [],
      },
      {
        t: "fas fa-hand-point-left",
        sT: [],
      },
      {
        t: "fas fa-hand-point-right",
        sT: [],
      },
      {
        t: "fas fa-hand-point-up",
        sT: [],
      },
      {
        t: "fas fa-hand-pointer",
        sT: [],
      },
      {
        t: "fas fa-hand-receiving",
        sT: [],
      },
      {
        t: "fas fa-hand-rock",
        sT: [],
      },
      {
        t: "fas fa-hand-scissors",
        sT: [],
      },
      {
        t: "fas fa-hand-sparkles",
        sT: [],
      },
      {
        t: "fas fa-hand-spock",
        sT: [],
      },
      {
        t: "fas fa-hands",
        sT: [],
      },
      {
        t: "fas fa-hands-heart",
        sT: [],
      },
      {
        t: "fas fa-hands-helping",
        sT: [],
      },
      {
        t: "fas fa-hands-usd",
        sT: [],
      },
      {
        t: "fas fa-hands-wash",
        sT: [],
      },
      {
        t: "fas fa-handshake",
        sT: [],
      },
      {
        t: "fas fa-handshake-alt",
        sT: [],
      },
      {
        t: "fas fa-handshake-alt-slash",
        sT: [],
      },
      {
        t: "fas fa-handshake-slash",
        sT: [],
      },
      {
        t: "fas fa-hanukiah",
        sT: [],
      },
      {
        t: "fas fa-hard-hat",
        sT: [],
      },
      {
        t: "fas fa-hashtag",
        sT: [],
      },
      {
        t: "fas fa-hat-chef",
        sT: [],
      },
      {
        t: "fas fa-hat-cowboy",
        sT: [],
      },
      {
        t: "fas fa-hat-cowboy-side",
        sT: [],
      },
      {
        t: "fas fa-hat-santa",
        sT: [],
      },
      {
        t: "fas fa-hat-winter",
        sT: [],
      },
      {
        t: "fas fa-hat-witch",
        sT: [],
      },
      {
        t: "fas fa-hat-wizard",
        sT: [],
      },
      {
        t: "fas fa-hdd",
        sT: [],
      },
      {
        t: "fas fa-head-side",
        sT: [],
      },
      {
        t: "fas fa-head-side-brain",
        sT: [],
      },
      {
        t: "fas fa-head-side-cough",
        sT: [],
      },
      {
        t: "fas fa-head-side-cough-slash",
        sT: [],
      },
      {
        t: "fas fa-head-side-headphones",
        sT: [],
      },
      {
        t: "fas fa-head-side-mask",
        sT: [],
      },
      {
        t: "fas fa-head-side-medical",
        sT: [],
      },
      {
        t: "fas fa-head-side-virus",
        sT: [],
      },
      {
        t: "fas fa-head-vr",
        sT: [],
      },
      {
        t: "fas fa-heading",
        sT: [],
      },
      {
        t: "fas fa-headphones",
        sT: [],
      },
      {
        t: "fas fa-headphones-alt",
        sT: [],
      },
      {
        t: "fas fa-headset",
        sT: [],
      },
      {
        t: "fas fa-heart",
        sT: [],
      },
      {
        t: "fas fa-heart-broken",
        sT: [],
      },
      {
        t: "fas fa-heart-circle",
        sT: [],
      },
      {
        t: "fas fa-heart-rate",
        sT: [],
      },
      {
        t: "fas fa-heart-square",
        sT: [],
      },
      {
        t: "fas fa-heartbeat",
        sT: [],
      },
      {
        t: "fas fa-heat",
        sT: [],
      },
      {
        t: "fas fa-helicopter",
        sT: [],
      },
      {
        t: "fas fa-helmet-battle",
        sT: [],
      },
      {
        t: "fas fa-hexagon",
        sT: [],
      },
      {
        t: "fas fa-highlighter",
        sT: [],
      },
      {
        t: "fas fa-hiking",
        sT: [],
      },
      {
        t: "fas fa-hippo",
        sT: [],
      },
      {
        t: "fas fa-history",
        sT: [],
      },
      {
        t: "fas fa-hockey-mask",
        sT: [],
      },
      {
        t: "fas fa-hockey-puck",
        sT: [],
      },
      {
        t: "fas fa-hockey-sticks",
        sT: [],
      },
      {
        t: "fas fa-holly-berry",
        sT: [],
      },
      {
        t: "fas fa-home",
        sT: [],
      },
      {
        t: "fas fa-home-alt",
        sT: [],
      },
      {
        t: "fas fa-home-heart",
        sT: [],
      },
      {
        t: "fas fa-home-lg",
        sT: [],
      },
      {
        t: "fas fa-home-lg-alt",
        sT: [],
      },
      {
        t: "fas fa-hood-cloak",
        sT: [],
      },
      {
        t: "fas fa-horizontal-rule",
        sT: [],
      },
      {
        t: "fas fa-horse",
        sT: [],
      },
      {
        t: "fas fa-horse-head",
        sT: [],
      },
      {
        t: "fas fa-horse-saddle",
        sT: [],
      },
      {
        t: "fas fa-hospital",
        sT: [],
      },
      {
        t: "fas fa-hospital-alt",
        sT: [],
      },
      {
        t: "fas fa-hospital-symbol",
        sT: [],
      },
      {
        t: "fas fa-hospital-user",
        sT: [],
      },
      {
        t: "fas fa-hospitals",
        sT: [],
      },
      {
        t: "fas fa-hot-tub",
        sT: [],
      },
      {
        t: "fas fa-hotdog",
        sT: [],
      },
      {
        t: "fas fa-hotel",
        sT: [],
      },
      {
        t: "fas fa-hourglass",
        sT: [],
      },
      {
        t: "fas fa-hourglass-end",
        sT: [],
      },
      {
        t: "fas fa-hourglass-half",
        sT: [],
      },
      {
        t: "fas fa-hourglass-start",
        sT: [],
      },
      {
        t: "fas fa-house",
        sT: [],
      },
      {
        t: "fas fa-house-damage",
        sT: [],
      },
      {
        t: "fas fa-house-day",
        sT: [],
      },
      {
        t: "fas fa-house-flood",
        sT: [],
      },
      {
        t: "fas fa-house-leave",
        sT: [],
      },
      {
        t: "fas fa-house-night",
        sT: [],
      },
      {
        t: "fas fa-house-return",
        sT: [],
      },
      {
        t: "fas fa-house-signal",
        sT: [],
      },
      {
        t: "fas fa-house-user",
        sT: [],
      },
      {
        t: "fas fa-hryvnia",
        sT: [],
      },
      {
        t: "fas fa-humidity",
        sT: [],
      },
      {
        t: "fas fa-hurricane",
        sT: [],
      },
      {
        t: "fas fa-i-cursor",
        sT: [],
      },
      {
        t: "fas fa-ice-cream",
        sT: [],
      },
      {
        t: "fas fa-ice-skate",
        sT: [],
      },
      {
        t: "fas fa-icicles",
        sT: [],
      },
      {
        t: "fas fa-icons",
        sT: [],
      },
      {
        t: "fas fa-icons-alt",
        sT: [],
      },
      {
        t: "fas fa-id-badge",
        sT: [],
      },
      {
        t: "fas fa-id-card",
        sT: [],
      },
      {
        t: "fas fa-id-card-alt",
        sT: [],
      },
      {
        t: "fas fa-igloo",
        sT: [],
      },
      {
        t: "fas fa-image",
        sT: [],
      },
      {
        t: "fas fa-image-polaroid",
        sT: [],
      },
      {
        t: "fas fa-images",
        sT: [],
      },
      {
        t: "fas fa-inbox",
        sT: [],
      },
      {
        t: "fas fa-inbox-in",
        sT: [],
      },
      {
        t: "fas fa-inbox-out",
        sT: [],
      },
      {
        t: "fas fa-indent",
        sT: [],
      },
      {
        t: "fas fa-industry",
        sT: [],
      },
      {
        t: "fas fa-industry-alt",
        sT: [],
      },
      {
        t: "fas fa-infinity",
        sT: [],
      },
      {
        t: "fas fa-info",
        sT: [],
      },
      {
        t: "fas fa-info-circle",
        sT: [],
      },
      {
        t: "fas fa-info-square",
        sT: [],
      },
      {
        t: "fas fa-inhaler",
        sT: [],
      },
      {
        t: "fas fa-integral",
        sT: [],
      },
      {
        t: "fas fa-intersection",
        sT: [],
      },
      {
        t: "fas fa-inventory",
        sT: [],
      },
      {
        t: "fas fa-island-tropical",
        sT: [],
      },
      {
        t: "fas fa-italic",
        sT: [],
      },
      {
        t: "fas fa-jack-o-lantern",
        sT: [],
      },
      {
        t: "fas fa-jedi",
        sT: [],
      },
      {
        t: "fas fa-joint",
        sT: [],
      },
      {
        t: "fas fa-journal-whills",
        sT: [],
      },
      {
        t: "fas fa-joystick",
        sT: [],
      },
      {
        t: "fas fa-jug",
        sT: [],
      },
      {
        t: "fas fa-kaaba",
        sT: [],
      },
      {
        t: "fas fa-kazoo",
        sT: [],
      },
      {
        t: "fas fa-kerning",
        sT: [],
      },
      {
        t: "fas fa-key",
        sT: [],
      },
      {
        t: "fas fa-key-skeleton",
        sT: [],
      },
      {
        t: "fas fa-keyboard",
        sT: [],
      },
      {
        t: "fas fa-keynote",
        sT: [],
      },
      {
        t: "fas fa-khanda",
        sT: [],
      },
      {
        t: "fas fa-kidneys",
        sT: [],
      },
      {
        t: "fas fa-kiss",
        sT: [],
      },
      {
        t: "fas fa-kiss-beam",
        sT: [],
      },
      {
        t: "fas fa-kiss-wink-heart",
        sT: [],
      },
      {
        t: "fas fa-kite",
        sT: [],
      },
      {
        t: "fas fa-kiwi-bird",
        sT: [],
      },
      {
        t: "fas fa-knife-kitchen",
        sT: [],
      },
      {
        t: "fas fa-lambda",
        sT: [],
      },
      {
        t: "fas fa-lamp",
        sT: [],
      },
      {
        t: "fas fa-lamp-desk",
        sT: [],
      },
      {
        t: "fas fa-lamp-floor",
        sT: [],
      },
      {
        t: "fas fa-landmark",
        sT: [],
      },
      {
        t: "fas fa-landmark-alt",
        sT: [],
      },
      {
        t: "fas fa-language",
        sT: [],
      },
      {
        t: "fas fa-laptop",
        sT: [],
      },
      {
        t: "fas fa-laptop-code",
        sT: [],
      },
      {
        t: "fas fa-laptop-house",
        sT: [],
      },
      {
        t: "fas fa-laptop-medical",
        sT: [],
      },
      {
        t: "fas fa-lasso",
        sT: [],
      },
      {
        t: "fas fa-laugh",
        sT: [],
      },
      {
        t: "fas fa-laugh-beam",
        sT: [],
      },
      {
        t: "fas fa-laugh-squint",
        sT: [],
      },
      {
        t: "fas fa-laugh-wink",
        sT: [],
      },
      {
        t: "fas fa-layer-group",
        sT: [],
      },
      {
        t: "fas fa-layer-minus",
        sT: [],
      },
      {
        t: "fas fa-layer-plus",
        sT: [],
      },
      {
        t: "fas fa-leaf",
        sT: [],
      },
      {
        t: "fas fa-leaf-heart",
        sT: [],
      },
      {
        t: "fas fa-leaf-maple",
        sT: [],
      },
      {
        t: "fas fa-leaf-oak",
        sT: [],
      },
      {
        t: "fas fa-lemon",
        sT: [],
      },
      {
        t: "fas fa-less-than",
        sT: [],
      },
      {
        t: "fas fa-less-than-equal",
        sT: [],
      },
      {
        t: "fas fa-level-down",
        sT: [],
      },
      {
        t: "fas fa-level-down-alt",
        sT: [],
      },
      {
        t: "fas fa-level-up",
        sT: [],
      },
      {
        t: "fas fa-level-up-alt",
        sT: [],
      },
      {
        t: "fas fa-life-ring",
        sT: [],
      },
      {
        t: "fas fa-light-ceiling",
        sT: [],
      },
      {
        t: "fas fa-light-switch",
        sT: [],
      },
      {
        t: "fas fa-light-switch-off",
        sT: [],
      },
      {
        t: "fas fa-light-switch-on",
        sT: [],
      },
      {
        t: "fas fa-lightbulb",
        sT: [],
      },
      {
        t: "fas fa-lightbulb-dollar",
        sT: [],
      },
      {
        t: "fas fa-lightbulb-exclamation",
        sT: [],
      },
      {
        t: "fas fa-lightbulb-on",
        sT: [],
      },
      {
        t: "fas fa-lightbulb-slash",
        sT: [],
      },
      {
        t: "fas fa-lights-holiday",
        sT: [],
      },
      {
        t: "fas fa-line-columns",
        sT: [],
      },
      {
        t: "fas fa-line-height",
        sT: [],
      },
      {
        t: "fas fa-link",
        sT: [],
      },
      {
        t: "fas fa-lips",
        sT: [],
      },
      {
        t: "fas fa-lira-sign",
        sT: [],
      },
      {
        t: "fas fa-list",
        sT: [],
      },
      {
        t: "fas fa-list-alt",
        sT: [],
      },
      {
        t: "fas fa-list-music",
        sT: [],
      },
      {
        t: "fas fa-list-ol",
        sT: [],
      },
      {
        t: "fas fa-list-ul",
        sT: [],
      },
      {
        t: "fas fa-location",
        sT: [],
      },
      {
        t: "fas fa-location-arrow",
        sT: [],
      },
      {
        t: "fas fa-location-circle",
        sT: [],
      },
      {
        t: "fas fa-location-slash",
        sT: [],
      },
      {
        t: "fas fa-lock",
        sT: [],
      },
      {
        t: "fas fa-lock-alt",
        sT: [],
      },
      {
        t: "fas fa-lock-open",
        sT: [],
      },
      {
        t: "fas fa-lock-open-alt",
        sT: [],
      },
      {
        t: "fas fa-long-arrow-alt-down",
        sT: [],
      },
      {
        t: "fas fa-long-arrow-alt-left",
        sT: [],
      },
      {
        t: "fas fa-long-arrow-alt-right",
        sT: [],
      },
      {
        t: "fas fa-long-arrow-alt-up",
        sT: [],
      },
      {
        t: "fas fa-long-arrow-down",
        sT: [],
      },
      {
        t: "fas fa-long-arrow-left",
        sT: [],
      },
      {
        t: "fas fa-long-arrow-right",
        sT: [],
      },
      {
        t: "fas fa-long-arrow-up",
        sT: [],
      },
      {
        t: "fas fa-loveseat",
        sT: [],
      },
      {
        t: "fas fa-low-vision",
        sT: [],
      },
      {
        t: "fas fa-luchador",
        sT: [],
      },
      {
        t: "fas fa-luggage-cart",
        sT: [],
      },
      {
        t: "fas fa-lungs",
        sT: [],
      },
      {
        t: "fas fa-lungs-virus",
        sT: [],
      },
      {
        t: "fas fa-mace",
        sT: [],
      },
      {
        t: "fas fa-magic",
        sT: [],
      },
      {
        t: "fas fa-magnet",
        sT: [],
      },
      {
        t: "fas fa-mail-bulk",
        sT: [],
      },
      {
        t: "fas fa-mailbox",
        sT: [],
      },
      {
        t: "fas fa-male",
        sT: [],
      },
      {
        t: "fas fa-mandolin",
        sT: [],
      },
      {
        t: "fas fa-map",
        sT: [],
      },
      {
        t: "fas fa-map-marked",
        sT: [],
      },
      {
        t: "fas fa-map-marked-alt",
        sT: [],
      },
      {
        t: "fas fa-map-marker",
        sT: [],
      },
      {
        t: "fas fa-map-marker-alt",
        sT: [],
      },
      {
        t: "fas fa-map-marker-alt-slash",
        sT: [],
      },
      {
        t: "fas fa-map-marker-check",
        sT: [],
      },
      {
        t: "fas fa-map-marker-edit",
        sT: [],
      },
      {
        t: "fas fa-map-marker-exclamation",
        sT: [],
      },
      {
        t: "fas fa-map-marker-minus",
        sT: [],
      },
      {
        t: "fas fa-map-marker-plus",
        sT: [],
      },
      {
        t: "fas fa-map-marker-question",
        sT: [],
      },
      {
        t: "fas fa-map-marker-slash",
        sT: [],
      },
      {
        t: "fas fa-map-marker-smile",
        sT: [],
      },
      {
        t: "fas fa-map-marker-times",
        sT: [],
      },
      {
        t: "fas fa-map-pin",
        sT: [],
      },
      {
        t: "fas fa-map-signs",
        sT: [],
      },
      {
        t: "fas fa-marker",
        sT: [],
      },
      {
        t: "fas fa-mars",
        sT: [],
      },
      {
        t: "fas fa-mars-double",
        sT: [],
      },
      {
        t: "fas fa-mars-stroke",
        sT: [],
      },
      {
        t: "fas fa-mars-stroke-h",
        sT: [],
      },
      {
        t: "fas fa-mars-stroke-v",
        sT: [],
      },
      {
        t: "fas fa-mask",
        sT: [],
      },
      {
        t: "fas fa-meat",
        sT: [],
      },
      {
        t: "fas fa-medal",
        sT: [],
      },
      {
        t: "fas fa-medkit",
        sT: [],
      },
      {
        t: "fas fa-megaphone",
        sT: [],
      },
      {
        t: "fas fa-meh",
        sT: [],
      },
      {
        t: "fas fa-meh-blank",
        sT: [],
      },
      {
        t: "fas fa-meh-rolling-eyes",
        sT: [],
      },
      {
        t: "fas fa-memory",
        sT: [],
      },
      {
        t: "fas fa-menorah",
        sT: [],
      },
      {
        t: "fas fa-mercury",
        sT: [],
      },
      {
        t: "fas fa-meteor",
        sT: [],
      },
      {
        t: "fas fa-microchip",
        sT: [],
      },
      {
        t: "fas fa-microphone",
        sT: [],
      },
      {
        t: "fas fa-microphone-alt",
        sT: [],
      },
      {
        t: "fas fa-microphone-alt-slash",
        sT: [],
      },
      {
        t: "fas fa-microphone-slash",
        sT: [],
      },
      {
        t: "fas fa-microphone-stand",
        sT: [],
      },
      {
        t: "fas fa-microscope",
        sT: [],
      },
      {
        t: "fas fa-microwave",
        sT: [],
      },
      {
        t: "fas fa-mind-share",
        sT: [],
      },
      {
        t: "fas fa-minus",
        sT: [],
      },
      {
        t: "fas fa-minus-circle",
        sT: [],
      },
      {
        t: "fas fa-minus-hexagon",
        sT: [],
      },
      {
        t: "fas fa-minus-octagon",
        sT: [],
      },
      {
        t: "fas fa-minus-square",
        sT: [],
      },
      {
        t: "fas fa-mistletoe",
        sT: [],
      },
      {
        t: "fas fa-mitten",
        sT: [],
      },
      {
        t: "fas fa-mobile",
        sT: [],
      },
      {
        t: "fas fa-mobile-alt",
        sT: [],
      },
      {
        t: "fas fa-mobile-android",
        sT: [],
      },
      {
        t: "fas fa-mobile-android-alt",
        sT: [],
      },
      {
        t: "fas fa-money-bill",
        sT: [],
      },
      {
        t: "fas fa-money-bill-alt",
        sT: [],
      },
      {
        t: "fas fa-money-bill-wave",
        sT: [],
      },
      {
        t: "fas fa-money-bill-wave-alt",
        sT: [],
      },
      {
        t: "fas fa-money-check",
        sT: [],
      },
      {
        t: "fas fa-money-check-alt",
        sT: [],
      },
      {
        t: "fas fa-money-check-edit",
        sT: [],
      },
      {
        t: "fas fa-money-check-edit-alt",
        sT: [],
      },
      {
        t: "fas fa-monitor-heart-rate",
        sT: [],
      },
      {
        t: "fas fa-monkey",
        sT: [],
      },
      {
        t: "fas fa-monument",
        sT: [],
      },
      {
        t: "fas fa-moon",
        sT: [],
      },
      {
        t: "fas fa-moon-cloud",
        sT: [],
      },
      {
        t: "fas fa-moon-stars",
        sT: [],
      },
      {
        t: "fas fa-mortar-pestle",
        sT: [],
      },
      {
        t: "fas fa-mosque",
        sT: [],
      },
      {
        t: "fas fa-motorcycle",
        sT: [],
      },
      {
        t: "fas fa-mountain",
        sT: [],
      },
      {
        t: "fas fa-mountains",
        sT: [],
      },
      {
        t: "fas fa-mouse",
        sT: [],
      },
      {
        t: "fas fa-mouse-alt",
        sT: [],
      },
      {
        t: "fas fa-mouse-pointer",
        sT: [],
      },
      {
        t: "fas fa-mp3-player",
        sT: [],
      },
      {
        t: "fas fa-mug",
        sT: [],
      },
      {
        t: "fas fa-mug-hot",
        sT: [],
      },
      {
        t: "fas fa-mug-marshmallows",
        sT: [],
      },
      {
        t: "fas fa-mug-tea",
        sT: [],
      },
      {
        t: "fas fa-music",
        sT: [],
      },
      {
        t: "fas fa-music-alt",
        sT: [],
      },
      {
        t: "fas fa-music-alt-slash",
        sT: [],
      },
      {
        t: "fas fa-music-slash",
        sT: [],
      },
      {
        t: "fas fa-narwhal",
        sT: [],
      },
      {
        t: "fas fa-network-wired",
        sT: [],
      },
      {
        t: "fas fa-neuter",
        sT: [],
      },
      {
        t: "fas fa-newspaper",
        sT: [],
      },
      {
        t: "fas fa-not-equal",
        sT: [],
      },
      {
        t: "fas fa-notes-medical",
        sT: [],
      },
      {
        t: "fas fa-object-group",
        sT: [],
      },
      {
        t: "fas fa-object-ungroup",
        sT: [],
      },
      {
        t: "fas fa-octagon",
        sT: [],
      },
      {
        t: "fas fa-oil-can",
        sT: [],
      },
      {
        t: "fas fa-oil-temp",
        sT: [],
      },
      {
        t: "fas fa-om",
        sT: [],
      },
      {
        t: "fas fa-omega",
        sT: [],
      },
      {
        t: "fas fa-ornament",
        sT: [],
      },
      {
        t: "fas fa-otter",
        sT: [],
      },
      {
        t: "fas fa-outdent",
        sT: [],
      },
      {
        t: "fas fa-outlet",
        sT: [],
      },
      {
        t: "fas fa-oven",
        sT: [],
      },
      {
        t: "fas fa-overline",
        sT: [],
      },
      {
        t: "fas fa-page-break",
        sT: [],
      },
      {
        t: "fas fa-pager",
        sT: [],
      },
      {
        t: "fas fa-paint-brush",
        sT: [],
      },
      {
        t: "fas fa-paint-brush-alt",
        sT: [],
      },
      {
        t: "fas fa-paint-roller",
        sT: [],
      },
      {
        t: "fas fa-palette",
        sT: [],
      },
      {
        t: "fas fa-pallet",
        sT: [],
      },
      {
        t: "fas fa-pallet-alt",
        sT: [],
      },
      {
        t: "fas fa-paper-plane",
        sT: [],
      },
      {
        t: "fas fa-paperclip",
        sT: [],
      },
      {
        t: "fas fa-parachute-box",
        sT: [],
      },
      {
        t: "fas fa-paragraph",
        sT: [],
      },
      {
        t: "fas fa-paragraph-rtl",
        sT: [],
      },
      {
        t: "fas fa-parking",
        sT: [],
      },
      {
        t: "fas fa-parking-circle",
        sT: [],
      },
      {
        t: "fas fa-parking-circle-slash",
        sT: [],
      },
      {
        t: "fas fa-parking-slash",
        sT: [],
      },
      {
        t: "fas fa-passport",
        sT: [],
      },
      {
        t: "fas fa-pastafarianism",
        sT: [],
      },
      {
        t: "fas fa-paste",
        sT: [],
      },
      {
        t: "fas fa-pause",
        sT: [],
      },
      {
        t: "fas fa-pause-circle",
        sT: [],
      },
      {
        t: "fas fa-paw",
        sT: [],
      },
      {
        t: "fas fa-paw-alt",
        sT: [],
      },
      {
        t: "fas fa-paw-claws",
        sT: [],
      },
      {
        t: "fas fa-peace",
        sT: [],
      },
      {
        t: "fas fa-pegasus",
        sT: [],
      },
      {
        t: "fas fa-pen",
        sT: [],
      },
      {
        t: "fas fa-pen-alt",
        sT: [],
      },
      {
        t: "fas fa-pen-fancy",
        sT: [],
      },
      {
        t: "fas fa-pen-nib",
        sT: [],
      },
      {
        t: "fas fa-pen-square",
        sT: [],
      },
      {
        t: "fas fa-pencil",
        sT: [],
      },
      {
        t: "fas fa-pencil-alt",
        sT: [],
      },
      {
        t: "fas fa-pencil-paintbrush",
        sT: [],
      },
      {
        t: "fas fa-pencil-ruler",
        sT: [],
      },
      {
        t: "fas fa-pennant",
        sT: [],
      },
      {
        t: "fas fa-people-arrows",
        sT: [],
      },
      {
        t: "fas fa-people-carry",
        sT: [],
      },
      {
        t: "fas fa-pepper-hot",
        sT: [],
      },
      {
        t: "fas fa-percent",
        sT: [],
      },
      {
        t: "fas fa-percentage",
        sT: [],
      },
      {
        t: "fas fa-person-booth",
        sT: [],
      },
      {
        t: "fas fa-person-carry",
        sT: [],
      },
      {
        t: "fas fa-person-dolly",
        sT: [],
      },
      {
        t: "fas fa-person-dolly-empty",
        sT: [],
      },
      {
        t: "fas fa-person-sign",
        sT: [],
      },
      {
        t: "fas fa-phone",
        sT: [],
      },
      {
        t: "fas fa-phone-alt",
        sT: [],
      },
      {
        t: "fas fa-phone-laptop",
        sT: [],
      },
      {
        t: "fas fa-phone-office",
        sT: [],
      },
      {
        t: "fas fa-phone-plus",
        sT: [],
      },
      {
        t: "fas fa-phone-rotary",
        sT: [],
      },
      {
        t: "fas fa-phone-slash",
        sT: [],
      },
      {
        t: "fas fa-phone-square",
        sT: [],
      },
      {
        t: "fas fa-phone-square-alt",
        sT: [],
      },
      {
        t: "fas fa-phone-volume",
        sT: [],
      },
      {
        t: "fas fa-photo-video",
        sT: [],
      },
      {
        t: "fas fa-pi",
        sT: [],
      },
      {
        t: "fas fa-piano",
        sT: [],
      },
      {
        t: "fas fa-piano-keyboard",
        sT: [],
      },
      {
        t: "fas fa-pie",
        sT: [],
      },
      {
        t: "fas fa-pig",
        sT: [],
      },
      {
        t: "fas fa-piggy-bank",
        sT: [],
      },
      {
        t: "fas fa-pills",
        sT: [],
      },
      {
        t: "fas fa-pizza",
        sT: [],
      },
      {
        t: "fas fa-pizza-slice",
        sT: [],
      },
      {
        t: "fas fa-place-of-worship",
        sT: [],
      },
      {
        t: "fas fa-plane",
        sT: [],
      },
      {
        t: "fas fa-plane-alt",
        sT: [],
      },
      {
        t: "fas fa-plane-arrival",
        sT: [],
      },
      {
        t: "fas fa-plane-departure",
        sT: [],
      },
      {
        t: "fas fa-plane-slash",
        sT: [],
      },
      {
        t: "fas fa-planet-moon",
        sT: [],
      },
      {
        t: "fas fa-planet-ringed",
        sT: [],
      },
      {
        t: "fas fa-play",
        sT: [],
      },
      {
        t: "fas fa-play-circle",
        sT: [],
      },
      {
        t: "fas fa-plug",
        sT: [],
      },
      {
        t: "fas fa-plus",
        sT: [],
      },
      {
        t: "fas fa-plus-circle",
        sT: [],
      },
      {
        t: "fas fa-plus-hexagon",
        sT: [],
      },
      {
        t: "fas fa-plus-octagon",
        sT: [],
      },
      {
        t: "fas fa-plus-square",
        sT: [],
      },
      {
        t: "fas fa-podcast",
        sT: [],
      },
      {
        t: "fas fa-podium",
        sT: [],
      },
      {
        t: "fas fa-podium-star",
        sT: [],
      },
      {
        t: "fas fa-police-box",
        sT: [],
      },
      {
        t: "fas fa-poll",
        sT: [],
      },
      {
        t: "fas fa-poll-h",
        sT: [],
      },
      {
        t: "fas fa-poll-people",
        sT: [],
      },
      {
        t: "fas fa-poo",
        sT: [],
      },
      {
        t: "fas fa-poo-storm",
        sT: [],
      },
      {
        t: "fas fa-poop",
        sT: [],
      },
      {
        t: "fas fa-popcorn",
        sT: [],
      },
      {
        t: "fas fa-portal-enter",
        sT: [],
      },
      {
        t: "fas fa-portal-exit",
        sT: [],
      },
      {
        t: "fas fa-portrait",
        sT: [],
      },
      {
        t: "fas fa-pound-sign",
        sT: [],
      },
      {
        t: "fas fa-power-off",
        sT: [],
      },
      {
        t: "fas fa-pray",
        sT: [],
      },
      {
        t: "fas fa-praying-hands",
        sT: [],
      },
      {
        t: "fas fa-prescription",
        sT: [],
      },
      {
        t: "fas fa-prescription-bottle",
        sT: [],
      },
      {
        t: "fas fa-prescription-bottle-alt",
        sT: [],
      },
      {
        t: "fas fa-presentation",
        sT: [],
      },
      {
        t: "fas fa-print",
        sT: [],
      },
      {
        t: "fas fa-print-search",
        sT: [],
      },
      {
        t: "fas fa-print-slash",
        sT: [],
      },
      {
        t: "fas fa-procedures",
        sT: [],
      },
      {
        t: "fas fa-project-diagram",
        sT: [],
      },
      {
        t: "fas fa-projector",
        sT: [],
      },
      {
        t: "fas fa-pump-medical",
        sT: [],
      },
      {
        t: "fas fa-pump-soap",
        sT: [],
      },
      {
        t: "fas fa-pumpkin",
        sT: [],
      },
      {
        t: "fas fa-puzzle-piece",
        sT: [],
      },
      {
        t: "fas fa-qrcode",
        sT: [],
      },
      {
        t: "fas fa-question",
        sT: [],
      },
      {
        t: "fas fa-question-circle",
        sT: [],
      },
      {
        t: "fas fa-question-square",
        sT: [],
      },
      {
        t: "fas fa-quidditch",
        sT: [],
      },
      {
        t: "fas fa-quote-left",
        sT: [],
      },
      {
        t: "fas fa-quote-right",
        sT: [],
      },
      {
        t: "fas fa-quran",
        sT: [],
      },
      {
        t: "fas fa-rabbit",
        sT: [],
      },
      {
        t: "fas fa-rabbit-fast",
        sT: [],
      },
      {
        t: "fas fa-racquet",
        sT: [],
      },
      {
        t: "fas fa-radar",
        sT: [],
      },
      {
        t: "fas fa-radiation",
        sT: [],
      },
      {
        t: "fas fa-radiation-alt",
        sT: [],
      },
      {
        t: "fas fa-radio",
        sT: [],
      },
      {
        t: "fas fa-radio-alt",
        sT: [],
      },
      {
        t: "fas fa-rainbow",
        sT: [],
      },
      {
        t: "fas fa-raindrops",
        sT: [],
      },
      {
        t: "fas fa-ram",
        sT: [],
      },
      {
        t: "fas fa-ramp-loading",
        sT: [],
      },
      {
        t: "fas fa-random",
        sT: [],
      },
      {
        t: "fas fa-raygun",
        sT: [],
      },
      {
        t: "fas fa-receipt",
        sT: [],
      },
      {
        t: "fas fa-record-vinyl",
        sT: [],
      },
      {
        t: "fas fa-rectangle-landscape",
        sT: [],
      },
      {
        t: "fas fa-rectangle-portrait",
        sT: [],
      },
      {
        t: "fas fa-rectangle-wide",
        sT: [],
      },
      {
        t: "fas fa-recycle",
        sT: [],
      },
      {
        t: "fas fa-redo",
        sT: [],
      },
      {
        t: "fas fa-redo-alt",
        sT: [],
      },
      {
        t: "fas fa-refrigerator",
        sT: [],
      },
      {
        t: "fas fa-registered",
        sT: [],
      },
      {
        t: "fas fa-remove-format",
        sT: [],
      },
      {
        t: "fas fa-repeat",
        sT: [],
      },
      {
        t: "fas fa-repeat-1",
        sT: [],
      },
      {
        t: "fas fa-repeat-1-alt",
        sT: [],
      },
      {
        t: "fas fa-repeat-alt",
        sT: [],
      },
      {
        t: "fas fa-reply",
        sT: [],
      },
      {
        t: "fas fa-reply-all",
        sT: [],
      },
      {
        t: "fas fa-republican",
        sT: [],
      },
      {
        t: "fas fa-restroom",
        sT: [],
      },
      {
        t: "fas fa-retweet",
        sT: [],
      },
      {
        t: "fas fa-retweet-alt",
        sT: [],
      },
      {
        t: "fas fa-ribbon",
        sT: [],
      },
      {
        t: "fas fa-ring",
        sT: [],
      },
      {
        t: "fas fa-rings-wedding",
        sT: [],
      },
      {
        t: "fas fa-road",
        sT: [],
      },
      {
        t: "fas fa-robot",
        sT: [],
      },
      {
        t: "fas fa-rocket",
        sT: [],
      },
      {
        t: "fas fa-rocket-launch",
        sT: [],
      },
      {
        t: "fas fa-route",
        sT: [],
      },
      {
        t: "fas fa-route-highway",
        sT: [],
      },
      {
        t: "fas fa-route-interstate",
        sT: [],
      },
      {
        t: "fas fa-router",
        sT: [],
      },
      {
        t: "fas fa-rss",
        sT: [],
      },
      {
        t: "fas fa-rss-square",
        sT: [],
      },
      {
        t: "fas fa-ruble-sign",
        sT: [],
      },
      {
        t: "fas fa-ruler",
        sT: [],
      },
      {
        t: "fas fa-ruler-combined",
        sT: [],
      },
      {
        t: "fas fa-ruler-horizontal",
        sT: [],
      },
      {
        t: "fas fa-ruler-triangle",
        sT: [],
      },
      {
        t: "fas fa-ruler-vertical",
        sT: [],
      },
      {
        t: "fas fa-running",
        sT: [],
      },
      {
        t: "fas fa-rupee-sign",
        sT: [],
      },
      {
        t: "fas fa-rv",
        sT: [],
      },
      {
        t: "fas fa-sack",
        sT: [],
      },
      {
        t: "fas fa-sack-dollar",
        sT: [],
      },
      {
        t: "fas fa-sad-cry",
        sT: [],
      },
      {
        t: "fas fa-sad-tear",
        sT: [],
      },
      {
        t: "fas fa-salad",
        sT: [],
      },
      {
        t: "fas fa-sandwich",
        sT: [],
      },
      {
        t: "fas fa-satellite",
        sT: [],
      },
      {
        t: "fas fa-satellite-dish",
        sT: [],
      },
      {
        t: "fas fa-sausage",
        sT: [],
      },
      {
        t: "fas fa-save",
        sT: [],
      },
      {
        t: "fas fa-sax-hot",
        sT: [],
      },
      {
        t: "fas fa-saxophone",
        sT: [],
      },
      {
        t: "fas fa-scalpel",
        sT: [],
      },
      {
        t: "fas fa-scalpel-path",
        sT: [],
      },
      {
        t: "fas fa-scanner",
        sT: [],
      },
      {
        t: "fas fa-scanner-image",
        sT: [],
      },
      {
        t: "fas fa-scanner-keyboard",
        sT: [],
      },
      {
        t: "fas fa-scanner-touchscreen",
        sT: [],
      },
      {
        t: "fas fa-scarecrow",
        sT: [],
      },
      {
        t: "fas fa-scarf",
        sT: [],
      },
      {
        t: "fas fa-school",
        sT: [],
      },
      {
        t: "fas fa-screwdriver",
        sT: [],
      },
      {
        t: "fas fa-scroll",
        sT: [],
      },
      {
        t: "fas fa-scroll-old",
        sT: [],
      },
      {
        t: "fas fa-scrubber",
        sT: [],
      },
      {
        t: "fas fa-scythe",
        sT: [],
      },
      {
        t: "fas fa-sd-card",
        sT: [],
      },
      {
        t: "fas fa-search",
        sT: [],
      },
      {
        t: "fas fa-search-dollar",
        sT: [],
      },
      {
        t: "fas fa-search-location",
        sT: [],
      },
      {
        t: "fas fa-search-minus",
        sT: [],
      },
      {
        t: "fas fa-search-plus",
        sT: [],
      },
      {
        t: "fas fa-seedling",
        sT: [],
      },
      {
        t: "fas fa-send-back",
        sT: [],
      },
      {
        t: "fas fa-send-backward",
        sT: [],
      },
      {
        t: "fas fa-sensor",
        sT: [],
      },
      {
        t: "fas fa-sensor-alert",
        sT: [],
      },
      {
        t: "fas fa-sensor-fire",
        sT: [],
      },
      {
        t: "fas fa-sensor-on",
        sT: [],
      },
      {
        t: "fas fa-sensor-smoke",
        sT: [],
      },
      {
        t: "fas fa-server",
        sT: [],
      },
      {
        t: "fas fa-shapes",
        sT: [],
      },
      {
        t: "fas fa-share",
        sT: [],
      },
      {
        t: "fas fa-share-all",
        sT: [],
      },
      {
        t: "fas fa-share-alt",
        sT: [],
      },
      {
        t: "fas fa-share-alt-square",
        sT: [],
      },
      {
        t: "fas fa-share-square",
        sT: [],
      },
      {
        t: "fas fa-sheep",
        sT: [],
      },
      {
        t: "fas fa-shekel-sign",
        sT: [],
      },
      {
        t: "fas fa-shield",
        sT: [],
      },
      {
        t: "fas fa-shield-alt",
        sT: [],
      },
      {
        t: "fas fa-shield-check",
        sT: [],
      },
      {
        t: "fas fa-shield-cross",
        sT: [],
      },
      {
        t: "fas fa-shield-virus",
        sT: [],
      },
      {
        t: "fas fa-ship",
        sT: [],
      },
      {
        t: "fas fa-shipping-fast",
        sT: [],
      },
      {
        t: "fas fa-shipping-timed",
        sT: [],
      },
      {
        t: "fas fa-shish-kebab",
        sT: [],
      },
      {
        t: "fas fa-shoe-prints",
        sT: [],
      },
      {
        t: "fas fa-shopping-bag",
        sT: [],
      },
      {
        t: "fas fa-shopping-basket",
        sT: [],
      },
      {
        t: "fas fa-shopping-cart",
        sT: [],
      },
      {
        t: "fas fa-shovel",
        sT: [],
      },
      {
        t: "fas fa-shovel-snow",
        sT: [],
      },
      {
        t: "fas fa-shower",
        sT: [],
      },
      {
        t: "fas fa-shredder",
        sT: [],
      },
      {
        t: "fas fa-shuttle-van",
        sT: [],
      },
      {
        t: "fas fa-shuttlecock",
        sT: [],
      },
      {
        t: "fas fa-sickle",
        sT: [],
      },
      {
        t: "fas fa-sigma",
        sT: [],
      },
      {
        t: "fas fa-sign",
        sT: [],
      },
      {
        t: "fas fa-sign-in",
        sT: [],
      },
      {
        t: "fas fa-sign-in-alt",
        sT: [],
      },
      {
        t: "fas fa-sign-language",
        sT: [],
      },
      {
        t: "fas fa-sign-out",
        sT: [],
      },
      {
        t: "fas fa-sign-out-alt",
        sT: [],
      },
      {
        t: "fas fa-signal",
        sT: [],
      },
      {
        t: "fas fa-signal-1",
        sT: [],
      },
      {
        t: "fas fa-signal-2",
        sT: [],
      },
      {
        t: "fas fa-signal-3",
        sT: [],
      },
      {
        t: "fas fa-signal-4",
        sT: [],
      },
      {
        t: "fas fa-signal-alt",
        sT: [],
      },
      {
        t: "fas fa-signal-alt-1",
        sT: [],
      },
      {
        t: "fas fa-signal-alt-2",
        sT: [],
      },
      {
        t: "fas fa-signal-alt-3",
        sT: [],
      },
      {
        t: "fas fa-signal-alt-slash",
        sT: [],
      },
      {
        t: "fas fa-signal-slash",
        sT: [],
      },
      {
        t: "fas fa-signal-stream",
        sT: [],
      },
      {
        t: "fas fa-signature",
        sT: [],
      },
      {
        t: "fas fa-sim-card",
        sT: [],
      },
      {
        t: "fas fa-sink",
        sT: [],
      },
      {
        t: "fas fa-siren",
        sT: [],
      },
      {
        t: "fas fa-siren-on",
        sT: [],
      },
      {
        t: "fas fa-sitemap",
        sT: [],
      },
      {
        t: "fas fa-skating",
        sT: [],
      },
      {
        t: "fas fa-skeleton",
        sT: [],
      },
      {
        t: "fas fa-ski-jump",
        sT: [],
      },
      {
        t: "fas fa-ski-lift",
        sT: [],
      },
      {
        t: "fas fa-skiing",
        sT: [],
      },
      {
        t: "fas fa-skiing-nordic",
        sT: [],
      },
      {
        t: "fas fa-skull",
        sT: [],
      },
      {
        t: "fas fa-skull-cow",
        sT: [],
      },
      {
        t: "fas fa-skull-crossbones",
        sT: [],
      },
      {
        t: "fas fa-slash",
        sT: [],
      },
      {
        t: "fas fa-sledding",
        sT: [],
      },
      {
        t: "fas fa-sleigh",
        sT: [],
      },
      {
        t: "fas fa-sliders-h",
        sT: [],
      },
      {
        t: "fas fa-sliders-h-square",
        sT: [],
      },
      {
        t: "fas fa-sliders-v",
        sT: [],
      },
      {
        t: "fas fa-sliders-v-square",
        sT: [],
      },
      {
        t: "fas fa-smile",
        sT: [],
      },
      {
        t: "fas fa-smile-beam",
        sT: [],
      },
      {
        t: "fas fa-smile-plus",
        sT: [],
      },
      {
        t: "fas fa-smile-wink",
        sT: [],
      },
      {
        t: "fas fa-smog",
        sT: [],
      },
      {
        t: "fas fa-smoke",
        sT: [],
      },
      {
        t: "fas fa-smoking",
        sT: [],
      },
      {
        t: "fas fa-smoking-ban",
        sT: [],
      },
      {
        t: "fas fa-sms",
        sT: [],
      },
      {
        t: "fas fa-snake",
        sT: [],
      },
      {
        t: "fas fa-snooze",
        sT: [],
      },
      {
        t: "fas fa-snow-blowing",
        sT: [],
      },
      {
        t: "fas fa-snowboarding",
        sT: [],
      },
      {
        t: "fas fa-snowflake",
        sT: [],
      },
      {
        t: "fas fa-snowflakes",
        sT: [],
      },
      {
        t: "fas fa-snowman",
        sT: [],
      },
      {
        t: "fas fa-snowmobile",
        sT: [],
      },
      {
        t: "fas fa-snowplow",
        sT: [],
      },
      {
        t: "fas fa-soap",
        sT: [],
      },
      {
        t: "fas fa-socks",
        sT: [],
      },
      {
        t: "fas fa-solar-panel",
        sT: [],
      },
      {
        t: "fas fa-solar-system",
        sT: [],
      },
      {
        t: "fas fa-sort",
        sT: [],
      },
      {
        t: "fas fa-sort-alpha-down",
        sT: [],
      },
      {
        t: "fas fa-sort-alpha-down-alt",
        sT: [],
      },
      {
        t: "fas fa-sort-alpha-up",
        sT: [],
      },
      {
        t: "fas fa-sort-alpha-up-alt",
        sT: [],
      },
      {
        t: "fas fa-sort-alt",
        sT: [],
      },
      {
        t: "fas fa-sort-amount-down",
        sT: [],
      },
      {
        t: "fas fa-sort-amount-down-alt",
        sT: [],
      },
      {
        t: "fas fa-sort-amount-up",
        sT: [],
      },
      {
        t: "fas fa-sort-amount-up-alt",
        sT: [],
      },
      {
        t: "fas fa-sort-circle",
        sT: [],
      },
      {
        t: "fas fa-sort-circle-down",
        sT: [],
      },
      {
        t: "fas fa-sort-circle-up",
        sT: [],
      },
      {
        t: "fas fa-sort-down",
        sT: [],
      },
      {
        t: "fas fa-sort-numeric-down",
        sT: [],
      },
      {
        t: "fas fa-sort-numeric-down-alt",
        sT: [],
      },
      {
        t: "fas fa-sort-numeric-up",
        sT: [],
      },
      {
        t: "fas fa-sort-numeric-up-alt",
        sT: [],
      },
      {
        t: "fas fa-sort-shapes-down",
        sT: [],
      },
      {
        t: "fas fa-sort-shapes-down-alt",
        sT: [],
      },
      {
        t: "fas fa-sort-shapes-up",
        sT: [],
      },
      {
        t: "fas fa-sort-shapes-up-alt",
        sT: [],
      },
      {
        t: "fas fa-sort-size-down",
        sT: [],
      },
      {
        t: "fas fa-sort-size-down-alt",
        sT: [],
      },
      {
        t: "fas fa-sort-size-up",
        sT: [],
      },
      {
        t: "fas fa-sort-size-up-alt",
        sT: [],
      },
      {
        t: "fas fa-sort-up",
        sT: [],
      },
      {
        t: "fas fa-soup",
        sT: [],
      },
      {
        t: "fas fa-spa",
        sT: [],
      },
      {
        t: "fas fa-space-shuttle",
        sT: [],
      },
      {
        t: "fas fa-space-station-moon",
        sT: [],
      },
      {
        t: "fas fa-space-station-moon-alt",
        sT: [],
      },
      {
        t: "fas fa-spade",
        sT: [],
      },
      {
        t: "fas fa-sparkles",
        sT: [],
      },
      {
        t: "fas fa-speaker",
        sT: [],
      },
      {
        t: "fas fa-speakers",
        sT: [],
      },
      {
        t: "fas fa-spell-check",
        sT: [],
      },
      {
        t: "fas fa-spider",
        sT: [],
      },
      {
        t: "fas fa-spider-black-widow",
        sT: [],
      },
      {
        t: "fas fa-spider-web",
        sT: [],
      },
      {
        t: "fas fa-spinner",
        sT: [],
      },
      {
        t: "fas fa-spinner-third",
        sT: [],
      },
      {
        t: "fas fa-splotch",
        sT: [],
      },
      {
        t: "fas fa-spray-can",
        sT: [],
      },
      {
        t: "fas fa-sprinkler",
        sT: [],
      },
      {
        t: "fas fa-square",
        sT: [],
      },
      {
        t: "fas fa-square-full",
        sT: [],
      },
      {
        t: "fas fa-square-root",
        sT: [],
      },
      {
        t: "fas fa-square-root-alt",
        sT: [],
      },
      {
        t: "fas fa-squirrel",
        sT: [],
      },
      {
        t: "fas fa-staff",
        sT: [],
      },
      {
        t: "fas fa-stamp",
        sT: [],
      },
      {
        t: "fas fa-star",
        sT: [],
      },
      {
        t: "fas fa-star-and-crescent",
        sT: [],
      },
      {
        t: "fas fa-star-christmas",
        sT: [],
      },
      {
        t: "fas fa-star-exclamation",
        sT: [],
      },
      {
        t: "fas fa-star-half",
        sT: [],
      },
      {
        t: "fas fa-star-half-alt",
        sT: [],
      },
      {
        t: "fas fa-star-of-david",
        sT: [],
      },
      {
        t: "fas fa-star-of-life",
        sT: [],
      },
      {
        t: "fas fa-star-shooting",
        sT: [],
      },
      {
        t: "fas fa-starfighter",
        sT: [],
      },
      {
        t: "fas fa-starfighter-alt",
        sT: [],
      },
      {
        t: "fas fa-stars",
        sT: [],
      },
      {
        t: "fas fa-starship",
        sT: [],
      },
      {
        t: "fas fa-starship-freighter",
        sT: [],
      },
      {
        t: "fas fa-steak",
        sT: [],
      },
      {
        t: "fas fa-steering-wheel",
        sT: [],
      },
      {
        t: "fas fa-step-backward",
        sT: [],
      },
      {
        t: "fas fa-step-forward",
        sT: [],
      },
      {
        t: "fas fa-stethoscope",
        sT: [],
      },
      {
        t: "fas fa-sticky-note",
        sT: [],
      },
      {
        t: "fas fa-stocking",
        sT: [],
      },
      {
        t: "fas fa-stomach",
        sT: [],
      },
      {
        t: "fas fa-stop",
        sT: [],
      },
      {
        t: "fas fa-stop-circle",
        sT: [],
      },
      {
        t: "fas fa-stopwatch",
        sT: [],
      },
      {
        t: "fas fa-stopwatch-20",
        sT: [],
      },
      {
        t: "fas fa-store",
        sT: [],
      },
      {
        t: "fas fa-store-alt",
        sT: [],
      },
      {
        t: "fas fa-store-alt-slash",
        sT: [],
      },
      {
        t: "fas fa-store-slash",
        sT: [],
      },
      {
        t: "fas fa-stream",
        sT: [],
      },
      {
        t: "fas fa-street-view",
        sT: [],
      },
      {
        t: "fas fa-stretcher",
        sT: [],
      },
      {
        t: "fas fa-strikethrough",
        sT: [],
      },
      {
        t: "fas fa-stroopwafel",
        sT: [],
      },
      {
        t: "fas fa-subscript",
        sT: [],
      },
      {
        t: "fas fa-subway",
        sT: [],
      },
      {
        t: "fas fa-suitcase",
        sT: [],
      },
      {
        t: "fas fa-suitcase-rolling",
        sT: [],
      },
      {
        t: "fas fa-sun",
        sT: [],
      },
      {
        t: "fas fa-sun-cloud",
        sT: [],
      },
      {
        t: "fas fa-sun-dust",
        sT: [],
      },
      {
        t: "fas fa-sun-haze",
        sT: [],
      },
      {
        t: "fas fa-sunglasses",
        sT: [],
      },
      {
        t: "fas fa-sunrise",
        sT: [],
      },
      {
        t: "fas fa-sunset",
        sT: [],
      },
      {
        t: "fas fa-superscript",
        sT: [],
      },
      {
        t: "fas fa-surprise",
        sT: [],
      },
      {
        t: "fas fa-swatchbook",
        sT: [],
      },
      {
        t: "fas fa-swimmer",
        sT: [],
      },
      {
        t: "fas fa-swimming-pool",
        sT: [],
      },
      {
        t: "fas fa-sword",
        sT: [],
      },
      {
        t: "fas fa-sword-laser",
        sT: [],
      },
      {
        t: "fas fa-sword-laser-alt",
        sT: [],
      },
      {
        t: "fas fa-swords",
        sT: [],
      },
      {
        t: "fas fa-swords-laser",
        sT: [],
      },
      {
        t: "fas fa-synagogue",
        sT: [],
      },
      {
        t: "fas fa-sync",
        sT: [],
      },
      {
        t: "fas fa-sync-alt",
        sT: [],
      },
      {
        t: "fas fa-syringe",
        sT: [],
      },
      {
        t: "fas fa-table",
        sT: [],
      },
      {
        t: "fas fa-table-tennis",
        sT: [],
      },
      {
        t: "fas fa-tablet",
        sT: [],
      },
      {
        t: "fas fa-tablet-alt",
        sT: [],
      },
      {
        t: "fas fa-tablet-android",
        sT: [],
      },
      {
        t: "fas fa-tablet-android-alt",
        sT: [],
      },
      {
        t: "fas fa-tablet-rugged",
        sT: [],
      },
      {
        t: "fas fa-tablets",
        sT: [],
      },
      {
        t: "fas fa-tachometer",
        sT: [],
      },
      {
        t: "fas fa-tachometer-alt",
        sT: [],
      },
      {
        t: "fas fa-tachometer-alt-average",
        sT: [],
      },
      {
        t: "fas fa-tachometer-alt-fast",
        sT: [],
      },
      {
        t: "fas fa-tachometer-alt-fastest",
        sT: [],
      },
      {
        t: "fas fa-tachometer-alt-slow",
        sT: [],
      },
      {
        t: "fas fa-tachometer-alt-slowest",
        sT: [],
      },
      {
        t: "fas fa-tachometer-average",
        sT: [],
      },
      {
        t: "fas fa-tachometer-fast",
        sT: [],
      },
      {
        t: "fas fa-tachometer-fastest",
        sT: [],
      },
      {
        t: "fas fa-tachometer-slow",
        sT: [],
      },
      {
        t: "fas fa-tachometer-slowest",
        sT: [],
      },
      {
        t: "fas fa-taco",
        sT: [],
      },
      {
        t: "fas fa-tag",
        sT: [],
      },
      {
        t: "fas fa-tags",
        sT: [],
      },
      {
        t: "fas fa-tally",
        sT: [],
      },
      {
        t: "fas fa-tanakh",
        sT: [],
      },
      {
        t: "fas fa-tape",
        sT: [],
      },
      {
        t: "fas fa-tasks",
        sT: [],
      },
      {
        t: "fas fa-tasks-alt",
        sT: [],
      },
      {
        t: "fas fa-taxi",
        sT: [],
      },
      {
        t: "fas fa-teeth",
        sT: [],
      },
      {
        t: "fas fa-teeth-open",
        sT: [],
      },
      {
        t: "fas fa-telescope",
        sT: [],
      },
      {
        t: "fas fa-temperature-down",
        sT: [],
      },
      {
        t: "fas fa-temperature-frigid",
        sT: [],
      },
      {
        t: "fas fa-temperature-high",
        sT: [],
      },
      {
        t: "fas fa-temperature-hot",
        sT: [],
      },
      {
        t: "fas fa-temperature-low",
        sT: [],
      },
      {
        t: "fas fa-temperature-up",
        sT: [],
      },
      {
        t: "fas fa-tenge",
        sT: [],
      },
      {
        t: "fas fa-tennis-ball",
        sT: [],
      },
      {
        t: "fas fa-terminal",
        sT: [],
      },
      {
        t: "fas fa-text",
        sT: [],
      },
      {
        t: "fas fa-text-height",
        sT: [],
      },
      {
        t: "fas fa-text-size",
        sT: [],
      },
      {
        t: "fas fa-text-width",
        sT: [],
      },
      {
        t: "fas fa-th",
        sT: [],
      },
      {
        t: "fas fa-th-large",
        sT: [],
      },
      {
        t: "fas fa-th-list",
        sT: [],
      },
      {
        t: "fas fa-theater-masks",
        sT: [],
      },
      {
        t: "fas fa-thermometer",
        sT: [],
      },
      {
        t: "fas fa-thermometer-empty",
        sT: [],
      },
      {
        t: "fas fa-thermometer-full",
        sT: [],
      },
      {
        t: "fas fa-thermometer-half",
        sT: [],
      },
      {
        t: "fas fa-thermometer-quarter",
        sT: [],
      },
      {
        t: "fas fa-thermometer-three-quarters",
        sT: [],
      },
      {
        t: "fas fa-theta",
        sT: [],
      },
      {
        t: "fas fa-thumbs-down",
        sT: [],
      },
      {
        t: "fas fa-thumbs-up",
        sT: [],
      },
      {
        t: "fas fa-thumbtack",
        sT: [],
      },
      {
        t: "fas fa-thunderstorm",
        sT: [],
      },
      {
        t: "fas fa-thunderstorm-moon",
        sT: [],
      },
      {
        t: "fas fa-thunderstorm-sun",
        sT: [],
      },
      {
        t: "fas fa-ticket",
        sT: [],
      },
      {
        t: "fas fa-ticket-alt",
        sT: [],
      },
      {
        t: "fas fa-tilde",
        sT: [],
      },
      {
        t: "fas fa-times",
        sT: [],
      },
      {
        t: "fas fa-times-circle",
        sT: [],
      },
      {
        t: "fas fa-times-hexagon",
        sT: [],
      },
      {
        t: "fas fa-times-octagon",
        sT: [],
      },
      {
        t: "fas fa-times-square",
        sT: [],
      },
      {
        t: "fas fa-tint",
        sT: [],
      },
      {
        t: "fas fa-tint-slash",
        sT: [],
      },
      {
        t: "fas fa-tire",
        sT: [],
      },
      {
        t: "fas fa-tire-flat",
        sT: [],
      },
      {
        t: "fas fa-tire-pressure-warning",
        sT: [],
      },
      {
        t: "fas fa-tire-rugged",
        sT: [],
      },
      {
        t: "fas fa-tired",
        sT: [],
      },
      {
        t: "fas fa-toggle-off",
        sT: [],
      },
      {
        t: "fas fa-toggle-on",
        sT: [],
      },
      {
        t: "fas fa-toilet",
        sT: [],
      },
      {
        t: "fas fa-toilet-paper",
        sT: [],
      },
      {
        t: "fas fa-toilet-paper-alt",
        sT: [],
      },
      {
        t: "fas fa-toilet-paper-slash",
        sT: [],
      },
      {
        t: "fas fa-tombstone",
        sT: [],
      },
      {
        t: "fas fa-tombstone-alt",
        sT: [],
      },
      {
        t: "fas fa-toolbox",
        sT: [],
      },
      {
        t: "fas fa-tools",
        sT: [],
      },
      {
        t: "fas fa-tooth",
        sT: [],
      },
      {
        t: "fas fa-toothbrush",
        sT: [],
      },
      {
        t: "fas fa-torah",
        sT: [],
      },
      {
        t: "fas fa-torii-gate",
        sT: [],
      },
      {
        t: "fas fa-tornado",
        sT: [],
      },
      {
        t: "fas fa-tractor",
        sT: [],
      },
      {
        t: "fas fa-trademark",
        sT: [],
      },
      {
        t: "fas fa-traffic-cone",
        sT: [],
      },
      {
        t: "fas fa-traffic-light",
        sT: [],
      },
      {
        t: "fas fa-traffic-light-go",
        sT: [],
      },
      {
        t: "fas fa-traffic-light-slow",
        sT: [],
      },
      {
        t: "fas fa-traffic-light-stop",
        sT: [],
      },
      {
        t: "fas fa-trailer",
        sT: [],
      },
      {
        t: "fas fa-train",
        sT: [],
      },
      {
        t: "fas fa-tram",
        sT: [],
      },
      {
        t: "fas fa-transgender",
        sT: [],
      },
      {
        t: "fas fa-transgender-alt",
        sT: [],
      },
      {
        t: "fas fa-transporter",
        sT: [],
      },
      {
        t: "fas fa-transporter-1",
        sT: [],
      },
      {
        t: "fas fa-transporter-2",
        sT: [],
      },
      {
        t: "fas fa-transporter-3",
        sT: [],
      },
      {
        t: "fas fa-transporter-empty",
        sT: [],
      },
      {
        t: "fas fa-trash",
        sT: [],
      },
      {
        t: "fas fa-trash-alt",
        sT: [],
      },
      {
        t: "fas fa-trash-restore",
        sT: [],
      },
      {
        t: "fas fa-trash-restore-alt",
        sT: [],
      },
      {
        t: "fas fa-trash-undo",
        sT: [],
      },
      {
        t: "fas fa-trash-undo-alt",
        sT: [],
      },
      {
        t: "fas fa-treasure-chest",
        sT: [],
      },
      {
        t: "fas fa-tree",
        sT: [],
      },
      {
        t: "fas fa-tree-alt",
        sT: [],
      },
      {
        t: "fas fa-tree-christmas",
        sT: [],
      },
      {
        t: "fas fa-tree-decorated",
        sT: [],
      },
      {
        t: "fas fa-tree-large",
        sT: [],
      },
      {
        t: "fas fa-tree-palm",
        sT: [],
      },
      {
        t: "fas fa-trees",
        sT: [],
      },
      {
        t: "fas fa-triangle",
        sT: [],
      },
      {
        t: "fas fa-triangle-music",
        sT: [],
      },
      {
        t: "fas fa-trophy",
        sT: [],
      },
      {
        t: "fas fa-trophy-alt",
        sT: [],
      },
      {
        t: "fas fa-truck",
        sT: [],
      },
      {
        t: "fas fa-truck-container",
        sT: [],
      },
      {
        t: "fas fa-truck-couch",
        sT: [],
      },
      {
        t: "fas fa-truck-loading",
        sT: [],
      },
      {
        t: "fas fa-truck-monster",
        sT: [],
      },
      {
        t: "fas fa-truck-moving",
        sT: [],
      },
      {
        t: "fas fa-truck-pickup",
        sT: [],
      },
      {
        t: "fas fa-truck-plow",
        sT: [],
      },
      {
        t: "fas fa-truck-ramp",
        sT: [],
      },
      {
        t: "fas fa-trumpet",
        sT: [],
      },
      {
        t: "fas fa-tshirt",
        sT: [],
      },
      {
        t: "fas fa-tty",
        sT: [],
      },
      {
        t: "fas fa-turkey",
        sT: [],
      },
      {
        t: "fas fa-turntable",
        sT: [],
      },
      {
        t: "fas fa-turtle",
        sT: [],
      },
      {
        t: "fas fa-tv",
        sT: [],
      },
      {
        t: "fas fa-tv-alt",
        sT: [],
      },
      {
        t: "fas fa-tv-music",
        sT: [],
      },
      {
        t: "fas fa-tv-retro",
        sT: [],
      },
      {
        t: "fas fa-typewriter",
        sT: [],
      },
      {
        t: "fas fa-ufo",
        sT: [],
      },
      {
        t: "fas fa-ufo-beam",
        sT: [],
      },
      {
        t: "fas fa-umbrella",
        sT: [],
      },
      {
        t: "fas fa-umbrella-beach",
        sT: [],
      },
      {
        t: "fas fa-underline",
        sT: [],
      },
      {
        t: "fas fa-undo",
        sT: [],
      },
      {
        t: "fas fa-undo-alt",
        sT: [],
      },
      {
        t: "fas fa-unicorn",
        sT: [],
      },
      {
        t: "fas fa-union",
        sT: [],
      },
      {
        t: "fas fa-universal-access",
        sT: [],
      },
      {
        t: "fas fa-university",
        sT: [],
      },
      {
        t: "fas fa-unlink",
        sT: [],
      },
      {
        t: "fas fa-unlock",
        sT: [],
      },
      {
        t: "fas fa-unlock-alt",
        sT: [],
      },
      {
        t: "fas fa-upload",
        sT: [],
      },
      {
        t: "fas fa-usb-drive",
        sT: [],
      },
      {
        t: "fas fa-usd-circle",
        sT: [],
      },
      {
        t: "fas fa-usd-square",
        sT: [],
      },
      {
        t: "fas fa-user",
        sT: [],
      },
      {
        t: "fas fa-user-alien",
        sT: [],
      },
      {
        t: "fas fa-user-alt",
        sT: [],
      },
      {
        t: "fas fa-user-alt-slash",
        sT: [],
      },
      {
        t: "fas fa-user-astronaut",
        sT: [],
      },
      {
        t: "fas fa-user-chart",
        sT: [],
      },
      {
        t: "fas fa-user-check",
        sT: [],
      },
      {
        t: "fas fa-user-circle",
        sT: [],
      },
      {
        t: "fas fa-user-clock",
        sT: [],
      },
      {
        t: "fas fa-user-cog",
        sT: [],
      },
      {
        t: "fas fa-user-cowboy",
        sT: [],
      },
      {
        t: "fas fa-user-crown",
        sT: [],
      },
      {
        t: "fas fa-user-edit",
        sT: [],
      },
      {
        t: "fas fa-user-friends",
        sT: [],
      },
      {
        t: "fas fa-user-graduate",
        sT: [],
      },
      {
        t: "fas fa-user-hard-hat",
        sT: [],
      },
      {
        t: "fas fa-user-headset",
        sT: [],
      },
      {
        t: "fas fa-user-injured",
        sT: [],
      },
      {
        t: "fas fa-user-lock",
        sT: [],
      },
      {
        t: "fas fa-user-md",
        sT: [],
      },
      {
        t: "fas fa-user-md-chat",
        sT: [],
      },
      {
        t: "fas fa-user-minus",
        sT: [],
      },
      {
        t: "fas fa-user-music",
        sT: [],
      },
      {
        t: "fas fa-user-ninja",
        sT: [],
      },
      {
        t: "fas fa-user-nurse",
        sT: [],
      },
      {
        t: "fas fa-user-plus",
        sT: [],
      },
      {
        t: "fas fa-user-robot",
        sT: [],
      },
      {
        t: "fas fa-user-secret",
        sT: [],
      },
      {
        t: "fas fa-user-shield",
        sT: [],
      },
      {
        t: "fas fa-user-slash",
        sT: [],
      },
      {
        t: "fas fa-user-tag",
        sT: [],
      },
      {
        t: "fas fa-user-tie",
        sT: [],
      },
      {
        t: "fas fa-user-times",
        sT: [],
      },
      {
        t: "fas fa-user-unlock",
        sT: [],
      },
      {
        t: "fas fa-user-visor",
        sT: [],
      },
      {
        t: "fas fa-users",
        sT: [],
      },
      {
        t: "fas fa-users-class",
        sT: [],
      },
      {
        t: "fas fa-users-cog",
        sT: [],
      },
      {
        t: "fas fa-users-crown",
        sT: [],
      },
      {
        t: "fas fa-users-medical",
        sT: [],
      },
      {
        t: "fas fa-users-slash",
        sT: [],
      },
      {
        t: "fas fa-utensil-fork",
        sT: [],
      },
      {
        t: "fas fa-utensil-knife",
        sT: [],
      },
      {
        t: "fas fa-utensil-spoon",
        sT: [],
      },
      {
        t: "fas fa-utensils",
        sT: [],
      },
      {
        t: "fas fa-utensils-alt",
        sT: [],
      },
      {
        t: "fas fa-vacuum",
        sT: [],
      },
      {
        t: "fas fa-vacuum-robot",
        sT: [],
      },
      {
        t: "fas fa-value-absolute",
        sT: [],
      },
      {
        t: "fas fa-vector-square",
        sT: [],
      },
      {
        t: "fas fa-venus",
        sT: [],
      },
      {
        t: "fas fa-venus-double",
        sT: [],
      },
      {
        t: "fas fa-venus-mars",
        sT: [],
      },
      {
        t: "fas fa-vest",
        sT: [],
      },
      {
        t: "fas fa-vest-patches",
        sT: [],
      },
      {
        t: "fas fa-vhs",
        sT: [],
      },
      {
        t: "fas fa-vial",
        sT: [],
      },
      {
        t: "fas fa-vials",
        sT: [],
      },
      {
        t: "fas fa-video",
        sT: [],
      },
      {
        t: "fas fa-video-plus",
        sT: [],
      },
      {
        t: "fas fa-video-slash",
        sT: [],
      },
      {
        t: "fas fa-vihara",
        sT: [],
      },
      {
        t: "fas fa-violin",
        sT: [],
      },
      {
        t: "fas fa-virus",
        sT: [],
      },
      {
        t: "fas fa-virus-slash",
        sT: [],
      },
      {
        t: "fas fa-viruses",
        sT: [],
      },
      {
        t: "fas fa-voicemail",
        sT: [],
      },
      {
        t: "fas fa-volcano",
        sT: [],
      },
      {
        t: "fas fa-volleyball-ball",
        sT: [],
      },
      {
        t: "fas fa-volume",
        sT: [],
      },
      {
        t: "fas fa-volume-down",
        sT: [],
      },
      {
        t: "fas fa-volume-mute",
        sT: [],
      },
      {
        t: "fas fa-volume-off",
        sT: [],
      },
      {
        t: "fas fa-volume-slash",
        sT: [],
      },
      {
        t: "fas fa-volume-up",
        sT: [],
      },
      {
        t: "fas fa-vote-nay",
        sT: [],
      },
      {
        t: "fas fa-vote-yea",
        sT: [],
      },
      {
        t: "fas fa-vr-cardboard",
        sT: [],
      },
      {
        t: "fas fa-wagon-covered",
        sT: [],
      },
      {
        t: "fas fa-walker",
        sT: [],
      },
      {
        t: "fas fa-walkie-talkie",
        sT: [],
      },
      {
        t: "fas fa-walking",
        sT: [],
      },
      {
        t: "fas fa-wallet",
        sT: [],
      },
      {
        t: "fas fa-wand",
        sT: [],
      },
      {
        t: "fas fa-wand-magic",
        sT: [],
      },
      {
        t: "fas fa-warehouse",
        sT: [],
      },
      {
        t: "fas fa-warehouse-alt",
        sT: [],
      },
      {
        t: "fas fa-washer",
        sT: [],
      },
      {
        t: "fas fa-watch",
        sT: [],
      },
      {
        t: "fas fa-watch-calculator",
        sT: [],
      },
      {
        t: "fas fa-watch-fitness",
        sT: [],
      },
      {
        t: "fas fa-water",
        sT: [],
      },
      {
        t: "fas fa-water-lower",
        sT: [],
      },
      {
        t: "fas fa-water-rise",
        sT: [],
      },
      {
        t: "fas fa-wave-sine",
        sT: [],
      },
      {
        t: "fas fa-wave-square",
        sT: [],
      },
      {
        t: "fas fa-wave-triangle",
        sT: [],
      },
      {
        t: "fas fa-waveform",
        sT: [],
      },
      {
        t: "fas fa-waveform-path",
        sT: [],
      },
      {
        t: "fas fa-webcam",
        sT: [],
      },
      {
        t: "fas fa-webcam-slash",
        sT: [],
      },
      {
        t: "fas fa-weight",
        sT: [],
      },
      {
        t: "fas fa-weight-hanging",
        sT: [],
      },
      {
        t: "fas fa-whale",
        sT: [],
      },
      {
        t: "fas fa-wheat",
        sT: [],
      },
      {
        t: "fas fa-wheelchair",
        sT: [],
      },
      {
        t: "fas fa-whistle",
        sT: [],
      },
      {
        t: "fas fa-wifi",
        sT: [],
      },
      {
        t: "fas fa-wifi-1",
        sT: [],
      },
      {
        t: "fas fa-wifi-2",
        sT: [],
      },
      {
        t: "fas fa-wifi-slash",
        sT: [],
      },
      {
        t: "fas fa-wind",
        sT: [],
      },
      {
        t: "fas fa-wind-turbine",
        sT: [],
      },
      {
        t: "fas fa-wind-warning",
        sT: [],
      },
      {
        t: "fas fa-window",
        sT: [],
      },
      {
        t: "fas fa-window-alt",
        sT: [],
      },
      {
        t: "fas fa-window-close",
        sT: [],
      },
      {
        t: "fas fa-window-frame",
        sT: [],
      },
      {
        t: "fas fa-window-frame-open",
        sT: [],
      },
      {
        t: "fas fa-window-maximize",
        sT: [],
      },
      {
        t: "fas fa-window-minimize",
        sT: [],
      },
      {
        t: "fas fa-window-restore",
        sT: [],
      },
      {
        t: "fas fa-windsock",
        sT: [],
      },
      {
        t: "fas fa-wine-bottle",
        sT: [],
      },
      {
        t: "fas fa-wine-glass",
        sT: [],
      },
      {
        t: "fas fa-wine-glass-alt",
        sT: [],
      },
      {
        t: "fas fa-won-sign",
        sT: [],
      },
      {
        t: "fas fa-wreath",
        sT: [],
      },
      {
        t: "fas fa-wrench",
        sT: [],
      },
      {
        t: "fas fa-x-ray",
        sT: [],
      },
      {
        t: "fas fa-yen-sign",
        sT: [],
      },
      {
        t: "fas fa-yin-yang",
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
