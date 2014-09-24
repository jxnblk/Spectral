

var Vue = require('vue');
var Geomicons = require('geomicons-open');
var tinycolor = require('tinycolor2');

Vue.directive('icon', function(value) {
  this.el.dataset.icon = value;
  Geomicons.inject(this.el);
});

var app = {};
app.data = {};
app.data.spectrum = [
  ['#4488dd']
];
app.data.test = 'herro';

app.computed = {};

app.created = function() {
  console.log('app created');
};

app.methods = {};

app.methods.addColumn = function() {

  var self = this;
  var row = this.spectrum[0];
  var color = tinycolor(row[0]);
  row.push('#f00');
  //this.spectrum[0].push(color.toHexString());

  function updateColors() {
    var rotate = -360 / row.length;
    console.log(rotate);
    for (var i = 1; i < row.length; i++) {
      var hex = color.spin(rotate).toHexString();
      console.log(hex);
      self.spectrum[0][i] = hex;
    }
  };

  updateColors();

  //color.spin(rotate);
  //this.spectrum[0].push(color.toHexString());
};


var view = new Vue({
  el: '#app',
  created: app.created,
  data: app.data,
  computed: app.computed,
  methods: app.methods
});
