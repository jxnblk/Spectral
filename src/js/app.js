

var Vue = require('vue');
var Geomicons = require('geomicons-open');
var tinycolor = require('tinycolor2');

Vue.directive('icon', function(value) {
  this.el.dataset.icon = value;
  Geomicons.inject(this.el);
});

var app = {};
app.data = {};
app.data.spectrum = [];
app.data.baseColor = '';

app.computed = {};

//app.computed.baseColor = function() {
//  return this.baseColor;
//};

app.created = function() {
  console.log('app created');
};

app.methods = {};

app.methods.updateColors = function() {
  var self = this;
  var color = tinycolor(this.baseColor);
  var rotate = -360 / (self.spectrum.length + 1);
  for (var i = 0; i < self.spectrum.length; i++) {
    var hex = color.spin(rotate).toHexString();
    self.spectrum[i] = hex;
  }
};

app.methods.addColumn = function() {
  var color = tinycolor(this.baseColor);
  this.spectrum.push(color.toHexString());
  this.updateColors();
};

app.methods.removeColumn = function() {
  this.spectrum.splice(this.spectrum.length - 1);
};


var view = new Vue({
  el: '#app',
  created: app.created,
  data: app.data,
  computed: app.computed,
  methods: app.methods
});

