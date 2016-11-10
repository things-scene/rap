(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _rightAnglePath = require('./right-angle-path');

Object.defineProperty(exports, 'RAP', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_rightAnglePath).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

},{"./right-angle-path":2}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _scene = scene,
    Component = _scene.Component,
    Polyline = _scene.Polyline;


var NATURE = {
  mutable: false,
  resizable: true,
  rotatable: true,
  properties: [{
    type: 'select',
    label: 'direction',
    name: 'direction',
    property: {
      options: ['h', 'w']
    }
  }]
};

var controlHandler = {

  ondragstart: function ondragstart(point, index, component) {
    component.mutatePath(null, function (path) {
      path.splice(Math.floor(index / 2) + 1, 0, point); // array.insert(index, point) 의 의미임.
    });
  },

  ondragmove: function ondragmove(point, index, component) {
    component.mutatePath(null, function (path) {
      path[Math.floor(index / 2) + 1] = point;
    });
  },

  ondragend: function ondragend(point, index, component) {}
};

var RAP = function (_Polyline) {
  _inherits(RAP, _Polyline);

  function RAP() {
    _classCallCheck(this, RAP);

    return _possibleConstructorReturn(this, (RAP.__proto__ || Object.getPrototypeOf(RAP)).apply(this, arguments));
  }

  _createClass(RAP, [{
    key: '_draw',
    value: function _draw(ctx) {
      var _model = this.model,
          _model$alpha = _model.alpha,
          alpha = _model$alpha === undefined ? 1 : _model$alpha,
          _model$path = _model.path,
          path = _model$path === undefined ? [] : _model$path,
          direction = _model.direction,
          _model$begin = _model.begin,
          begin = _model$begin === undefined ? 'oval' : _model$begin,
          _model$end = _model.end,
          end = _model$end === undefined ? 'oval' : _model$end,
          _model$beginSize = _model.beginSize,
          beginSize = _model$beginSize === undefined ? 'size5' : _model$beginSize,
          _model$endSize = _model.endSize,
          endSize = _model$endSize === undefined ? 'size5' : _model$endSize,
          _model$lineWidth = _model.lineWidth,
          lineWidth = _model$lineWidth === undefined ? 2 : _model$lineWidth,
          _model$lineCap = _model.lineCap,
          lineCap = _model$lineCap === undefined ? false : _model$lineCap,
          _model$strokeStyle = _model.strokeStyle,
          strokeStyle = _model$strokeStyle === undefined ? '#000' : _model$strokeStyle;

      // 양 끝 라인 그리기.
      // if(begin != 'none' || end != 'none'){
      //
      //   beginSize = this.sizes(beginSize)
      //   endSize = this.sizes(endSize)
      //
      //   lineWidth = parseInt(lineWidth)
      //   ctx.lineCap = lineCap;
      //   ctx.lineWidth = lineWidth
      //   ctx.strokeStyle = strokeStyle
      //   ctx.fillStyle = strokeStyle
      //   ctx.globalAlpha = alpha
      //
      //   this._drawEndPoint(ctx, path[0].x, path[0].y, path[path.length - 1].x, path[path.length - 1].y, lineWidth, begin, end, beginSize, endSize)
      // }

      if (path.length <= 1) return;

      ctx.beginPath();
      ctx.globalAlpha = alpha;

      ctx.moveTo(path[0].x, path[0].y);
      if (direction == 'h') ctx.lineTo(path[1].x, path[0].y);else ctx.lineTo(path[0].x, path[1].y);

      for (var i = 1; i < path.length - 1; i++) {
        ctx.lineTo(path[i].x, path[i].y);
        if (direction == 'h') ctx.lineTo(path[i + 1].x, path[i].y);else ctx.lineTo(path[i].x, path[i + 1].y);
      }
      ctx.lineTo(path[i].x, path[i].y);

      this.drawStroke(ctx);
    }
  }, {
    key: 'contains',
    value: function contains(x, y) {
      var _model2 = this.model,
          path = _model2.path,
          direction = _model2.direction;

      var result = false;

      path.forEach(function (p, idx) {
        var j = (idx + path.length + 1) % path.length;

        var x1 = p.x;
        var y1 = p.y;
        var x3 = path[j].x;
        var y3 = path[j].y;
        var x2 = direction == 'h' ? x3 : x1;
        var y2 = direction == 'h' ? y1 : y3;

        if (y1 > y != y2 > y && x < (x2 - x1) * (y - y1) / (y2 - y1) + x1) result = !result;

        if (y2 > y != y3 > y && x < (x3 - x2) * (y - y2) / (y3 - y2) + x2) result = !result;
      });

      return result;
    }
  }, {
    key: 'isLine',
    value: function isLine() {
      return true;
    }
  }, {
    key: '_drawEndPoint',
    value: function _drawEndPoint(ctx, x1, y1, x2, y2, lineWidth, beginType, endType, beginSize, endSize) {
      var theta = Math.atan2(y2 - y1, x2 - x1);

      if (beginType) this._drawArrow(ctx, beginType, x1, y1, theta, lineWidth, beginSize);

      if (endType) this._drawArrow(ctx, endType, x2, y2, theta + Math.PI, lineWidth, endSize);
    }
  }, {
    key: '_drawArrow',
    value: function _drawArrow(ctx, type, x, y, theta, lineWidth, size) {

      ctx.beginPath();

      ctx.translate(x, y);
      ctx.rotate(theta);

      switch (type) {
        case 'oval':
          ctx.ellipse(0, 0, size.X, size.Y, 0, 0, 2 * Math.PI);
          ctx.fill();
          // ctx.scale(1, 1 / arc_scale_y)
          break;
        case 'diamond':
          ctx.moveTo(-size.X, 0);
          ctx.lineTo(0, -size.Y);
          ctx.lineTo(size.X, 0);
          ctx.lineTo(0, size.Y);
          ctx.fill();
          break;
        case 'arrow':
          ctx.moveTo(0, 0);
          ctx.lineTo(WING_FACTOR * size.X, -size.Y);
          ctx.lineTo(WING_FACTOR * size.X, size.Y);
          ctx.fill();
          break;
        case 'sharp-arrow':
          ctx.moveTo(0, 0);
          ctx.lineTo(WING_FACTOR * size.X, -size.Y);
          ctx.lineTo(-size.X / 1.5 + WING_FACTOR * size.X, 0);
          ctx.lineTo(WING_FACTOR * size.X, size.Y);
          ctx.fill();
          break;
        case 'open-arrow':
          ctx.moveTo(WING_FACTOR * size.X + lineWidth, -size.Y);
          ctx.lineTo(lineWidth, 0);
          ctx.lineTo(WING_FACTOR * size.X + lineWidth, size.Y);
          ctx.stroke();
          break;
        default:
          break;
      }

      ctx.rotate(-theta);
      ctx.translate(-x, -y);

      ctx.closePath();
    }
  }, {
    key: 'sizes',
    value: function sizes(size) {
      var length = {};
      var lineWidth = this.model.lineWidth * 1.2;

      switch (size) {
        case 'size1':
          length.X = lineWidth;
          length.Y = lineWidth;
          break;
        case 'size2':
          length.X = lineWidth * 1.5;
          length.Y = lineWidth;
          break;
        case 'size3':
          length.X = lineWidth * 2;
          length.Y = lineWidth;
          break;
        case 'size4':
          length.X = lineWidth;
          length.Y = lineWidth * 1.5;
          break;
        case 'size5':
          length.X = lineWidth * 1.5;
          length.Y = lineWidth * 1.5;
          break;
        case 'size6':
          length.X = lineWidth * 2;
          length.Y = lineWidth * 1.5;
          break;
        case 'size7':
          length.X = lineWidth;
          length.Y = lineWidth * 2;
          break;
        case 'size8':
          length.X = lineWidth * 1.5;
          length.Y = lineWidth * 2;
          break;
        case 'size9':
          length.X = lineWidth * 2;
          length.Y = lineWidth * 2;
          break;
        default:
          length.X = lineWidth * 1.5;
          length.Y = lineWidth * 1.5;
          break;
      }
      return length;
    }
  }, {
    key: 'pathExtendable',
    get: function get() {
      return true;
    }
  }, {
    key: 'controls',
    get: function get() {

      // 폴리라인에서의 control은 새로운 path를 추가하는 포인트이다.
      var _model3 = this.model,
          _model3$path = _model3.path,
          path = _model3$path === undefined ? [] : _model3$path,
          direction = _model3.direction;

      var controls = [];

      for (var i = 0; i < path.length - 1; i++) {
        var p1 = path[i];
        var p2 = path[i + 1];

        if (direction == 'h') {
          controls.push({
            x: path[i + 1].x - (path[i + 1].x - path[i].x) / 2,
            y: path[i].y,
            handler: controlHandler
          });
          controls.push({
            x: path[i + 1].x,
            y: path[i].y + (path[i + 1].y - path[i].y) / 2,
            handler: controlHandler
          });
        } else {
          controls.push({
            x: path[i].x + (path[i + 1].x - path[i].x) / 2,
            y: path[i + 1].y,
            handler: controlHandler
          });
          controls.push({
            x: path[i].x,
            y: path[i + 1].y - (path[i + 1].y - path[i].y) / 2,
            handler: controlHandler
          });
        }
      }

      return controls;
    }
  }, {
    key: 'nature',
    get: function get() {
      return NATURE;
    }
  }]);

  return RAP;
}(Polyline);

exports.default = RAP;


Component.memoize(RAP.prototype, 'controls', false);

Component.register('rap', RAP);

},{}]},{},[1]);
