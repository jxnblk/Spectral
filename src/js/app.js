

var Geomicons = require('geomicons-open');
var tinycolor = require('tinycolor2');
var vueTouch = require('vue-touch');

Vue.use(vueTouch);

var app = {};
app.data = {};
app.data.baseHex = '#00c9fc';
app.data.spectrumArray = [];
app.data.rowsArray = [];


app.computed = {};

app.computed.base = {
  $get: function() {
    return this.baseHex;
  },
  $set: function(val) {
    this.baseHex = tinycolor(val).toHexString();
    this.updateState();
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

app.computed.spectrum = {
  $get: function() {
    this.baseHex;
    var color = tinycolor(this.baseHex);
    var rotate = -360 / (this.spectrumArray.length + 1);
    if (this.spectrumArray[0] && this.spectrumArray[0].color == this.baseHex) {
      this.spectrumArray[0].color = this.baseHex;
    } else {
      this.spectrumArray[0] = { color: color.toHexString() };
    }
    for (var i = 1; i < this.spectrumArray.length; i++) {
      if (!this.spectrumArray[i]) this.spectrumArray[i] = {};
      this.spectrumArray[i].color = color.spin(rotate).toHexString();
    }
    return this.spectrumArray;
  },
  $set: function(arr) {
    this.spectrumArray = arr;
    return this.spectrumArray;
  }
};

app.computed.rows = {
  $get: function() {
    this.baseHex;
    this.shiftS;
    this.shiftL;
    this.spectrum;
    //this.spectrumArray;
    var spectrum = this.spectrumArray;
    for (var i = 0; i < this.rowsArray.length; i++) {
      var row = this.rowsArray[i] || [{ colors: [] }];
      row.colors.splice(this.spectrum.length, 32);
      for (var j = 0; j < spectrum.length; j++) {
        var hsl = tinycolor(spectrum[j].color).toHsl();
        hsl.s += this.shiftS * (i + 1);
        hsl.l += this.shiftL * (i + 1);
        if (hsl.s > 1) hsl.s = 1;
        if (hsl.s < 0) hsl.s = 0;
        if (hsl.l > 1) hsl.l = 1;
        if (hsl.l < 0) hsl.l = 0;
        var color = tinycolor(hsl).toHexString();
        row.colors[j] = row.colors[j] || {};
        row.colors[j].color = color;
      }
    }
    return this.rowsArray;
  },
  $set: function(val) {
    this.rowsArray = val;
    return this.rowsArray;
  }
};


app.data.customShiftS = null;
app.computed.shiftS = {
  $get: function() {
    if (this.customShiftS) {
      return this.customShiftS;
    } else {
      var hsl = tinycolor(this.baseHex).toHsl();
      var s;
      if (hsl.s > .5) {
        s = -.1;
      } else {
        s = .1;
      }
      return s;
    }
  },
  $set: function(val) {
    this.customShiftS = val;
    this.updateState();
    return this.customShiftS;
  }
};

app.data.customShiftL = null;
app.computed.shiftL = {
  $get: function() {
    if (this.customShiftL) {
      return this.customShiftL;
    } else {
      var hsl = tinycolor(this.baseHex).toHsl();
      var s;
      if (hsl.s > .5) {
        s = -.1;
      } else {
        s = .1;
      }
      return s;
    }
  },
  $set: function(val) {
    this.customShiftL = val;
    this.updateState();
    return this.customShiftL;
  }
};

app.computed.tileWidth = function() {
  return 100 / (this.spectrum.length);
};

app.computed.showCoach = function() {
  if (this.spectrum.length == 1 && this.rows.length == 0){
    return true;
  } else {
    return false;
  }
};

app.methods = {};

app.methods.addColumn = function(e) {
  if (e) e.preventDefault();
  if (this.spectrumArray.length > 15) return false;
  var color = tinycolor(this.baseHex);
  var arr = this.spectrumArray;
  arr.push({ color: color.toHexString() });
  this.spectrumArray = arr;
  this.updateState();
};

app.methods.removeColumn = function() {
  if (this.spectrumArray.length < 1) return false;
  this.spectrumArray.splice(this.spectrumArray.length - 1);
  this.updateState();
};

app.methods.addRow = function(e) {
  if (e) e.preventDefault();
  if (this.rowsArray.length > 7) return false;
  this.rowsArray.push({ colors: [] });
  this.updateState();
};

app.methods.removeRow = function(e) {
  if (e) e.preventDefault();
  if (this.rowsArray.length < 1) return false;
  this.rowsArray.splice(this.rowsArray.length - 1);
  this.updateState();
};

app.methods.reset = function() {
  this.rowsArray = [];
  this.spectrum = [];
  this.shiftS = null;
  this.shiftL = null;
  this.baseHex = '#00c9fc';
  window.location.hash = '';
};

app.methods.updateState = function() {
  var str = this.baseHex +
    '&hues=' + this.spectrum.length +
    '&rows=' + this.rows.length +
    '&shiftS=' + this.shiftS +
    '&shiftL=' + this.shiftL;
  window.history.pushState({ base: this.baseHex }, '', str);
};


app.data.flashMessage = false;

app.methods.flash = function(value) {
  var self = this;
  var timeout = window.setTimeout(clearMessage, 2000);
  function clearMessage() {
    self.flashMessage = false;
    window.clearTimeout(timeout);
  };
  this.flashMessage = value;
};


Vue.directive('icon', function(value) {
  //this.el.dataset.icon = value;
  Geomicons.inject(this.el);
});

Vue.directive('zeroclip', function(value) {
  var root = this.vm.$root;
  var self = this;
  var clip = new ZeroClipboard(this.el);
  clip.on('ready', function() {
    clip.on('copy', function() {
      clip.setText(value);
    });
    clip.on('aftercopy', function(e) {
      root.flash(value + ' copied to clipboard');
    });
  });
});



app.created = function() {

  console.log('S P E C T R A L');
  var self = this;

  function parseHash(str) {
    var obj = {};
    obj.base = str.split('&')[0];
    var arr = str.split('&');
    for (var i = 1; i < arr.length; i++) {
      var a = arr[i].split('=');
      obj[a[0]] = a[1];
    }
    return obj;
  };

  if (window.location.hash) {
    var obj = parseHash(window.location.hash);
    this.base = obj.base;
    for (var i = 1; i < obj.hues; i++) {
      self.addColumn();
    }
    for (var i = 0; i < obj.rows; i++) {
      self.addRow();
    }
    if (obj.shiftS) this.shiftS = obj.shiftS;
    if (obj.shiftL) this.shiftL = obj.shiftL;
  };

};

var view = new Vue({
  el: '#app',
  created: app.created,
  data: app.data,
  computed: app.computed,
  methods: app.methods
});

