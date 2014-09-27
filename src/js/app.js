

var Vue = require('vue');
var Geomicons = require('geomicons-open');
var tinycolor = require('tinycolor2');


Vue.directive('icon', function(value) {
  this.el.dataset.icon = value;
  Geomicons.inject(this.el);
});


var app = {};
app.data = {};
app.data.baseColor = '#f00';
app.data.spectrumArray = [];
app.data.rows = [
  { s: -20, l: -20 }
];


app.computed = {};

app.computed.spectrum = function() {
  var self = this;
  var color = tinycolor(this.baseColor);
  var rotate = -360 / (self.spectrumArray.length + 1);
  for (var i = 0; i < self.spectrumArray.length; i++) {
    var hex = color.spin(rotate).toHexString();
    self.spectrumArray[i] = hex;
  }
  return this.spectrumArray;
};


app.methods = {};

app.methods.addColumn = function() {
  if (this.spectrumArray.length > 30) return false;
  var color = tinycolor(this.baseColor);
  this.spectrumArray.push(color.toHexString());
};

app.methods.removeColumn = function() {
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

