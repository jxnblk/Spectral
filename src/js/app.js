

var Vue = require('vue');
var Geomicons = require('geomicons-open');
var tinycolor = require('tinycolor2');


Vue.directive('icon', function(value) {
  this.el.dataset.icon = value;
  Geomicons.inject(this.el);
});


var app = {};
app.data = {};
app.data.baseHex = '#00c9fc';
app.data.rows = [];



app.computed = {};

app.computed.base = {
  $get: function() {
    return this.baseHex;
  },
  $set: function(val) {
    this.baseHex = tinycolor(val).toHexString();
    return this.baseHex;
  }
};

app.computed.baseHsl = {
  $get: function() {
    var hex = this.base;
    var color = tinycolor(hex);
    return color.toHsl();
  },
  $set: function(obj) {
    var color = tinycolor(obj);
    this.base = tinycolor(color).toHexString();
    return color.toHsl();
  }
};

app.computed.baseH = {
  $get: function() {
    return this.baseHsl.h;
  },
  $set: function(val) {
    var hsl = this.baseHsl;
    hsl.h = val;
    this.baseHsl = hsl;
    return this.baseHsl.h;
  }
};

app.computed.baseS = {
  $get: function() {
    return this.baseHsl.s;
  },
  $set: function(val) {
    var hsl = this.baseHsl;
    hsl.s = val;
    this.baseHsl = hsl;
    return this.baseHsl.s;
  }
};

app.computed.baseL = {
  $get: function() {
    return this.baseHsl.l;
  },
  $set: function(val) {
    var hsl = this.baseHsl;
    hsl.l = val;
    this.baseHsl = hsl;
    return this.baseHsl.l;
  }
};

app.computed.hGradient = function() {
  var hsl = tinycolor(this.base).toHsl();
  hsl.h = 0;
  min = tinycolor(hsl).toHexString();
  hsl.h = 119;
  third = tinycolor(hsl).toHexString();
  hsl.h = 239;
  twoThirds = tinycolor(hsl).toHexString();
  hsl.h = 359;
  max = tinycolor(hsl).toHexString();
  var bg = 'linear-gradient(90deg, ' + min + ', ' + third + ', ' + twoThirds + ', ' + max + ')';
  return bg;
};

app.computed.sGradient = function() {
  var hsl = tinycolor(this.base).toHsl();
  hsl.s = 0;
  var min = tinycolor(hsl).toHexString();
  hsl.s = 1;
  var max = tinycolor(hsl).toHexString();
  var bg = 'linear-gradient(90deg, ' + min + ', ' + max + ')';
  return bg;
};

app.computed.lGradient = function() {
  var hsl = tinycolor(this.base).toHsl();
  hsl.l = .5;
  var half = tinycolor(hsl).toHexString();
  hsl.l = 0.1;
  var min = tinycolor(hsl).toHexString();
  hsl.l = 0.9;
  var max = tinycolor(hsl).toHexString();
  var bg = 'linear-gradient(90deg, ' + min + ', ' + half + ', ' + max + ')';
  return bg;
};

app.computed.shift = function() {
  return {
    s: 20,
    l: 10
  };
};
/**
app.computed.spectrum = {
  $get: function() {
    var self = this;
    this.base;
    this.baseColor;
    var color = tinycolor(this.base);
    var rotate = -360 / (self.spectrum.length + 1);
    for (var i = 0; i < self.spectrum.length; i++) {
      var hex = color.spin(rotate).toHexString();
      self.spectrum[i] = hex;
    }
    return this.spectrum;
  },
  $set: function(val) {
    this.spectrum= val;
  }
};
*/

app.data.spectrumArray = [];

app.computed.spectrum = {
  $get: function() {
    this.baseHex;
    var color = tinycolor(this.baseHex);
    var rotate = -360 / (this.spectrumArray.length + 1);
    for (var i = 0; i < this.spectrumArray.length; i++) {
      this.spectrumArray[i] = { color: color.spin(rotate).toHexString() };
    }
    return this.spectrumArray;
  },
  $set: function(arr) {
    this.spectrumArray = arr;
    return this.spectrumArray;
  }
};

app.computed.tileWidth = function() {
  return 100 / (this.spectrum.length + 1);
};


app.methods = {};

app.methods.addColumn = function() {
  if (this.spectrumArray.length > 30) return false;
  var color = tinycolor(this.baseHex);
  var arr = this.spectrumArray;
  arr.push({ color: color.toHexString() });
  this.spectrumArray = arr;
};

app.methods.removeColumn = function() {
  if (this.spectrumArray.length < 1) return false;
  this.spectrumArray.splice(this.spectrumArray.length - 1);
};


app.created = function() {
  console.log('app created');
};

var view = new Vue({
  el: '#app',
  created: app.created,
  data: app.data,
  computed: app.computed,
  methods: app.methods
});

