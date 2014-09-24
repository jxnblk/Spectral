

var Vue = require('vue');
var Geomicons = require('geomicons-open');

Vue.directive('icon', function(value) {
  this.el.dataset.icon = value;
  Geomicons.inject(this.el);
});

var app = {};
app.data = {};
app.data.spectrum = [
  ['#f30']
];
app.data.test = 'herro';

app.computed = {};
app.computed.baseColor = function() {
  return this.spectrum[0][0];
};

app.created = function() {
  console.log('app created');
};

app.methods = {};

app.methods.addColumn = function() {
  console.log(this.spectrum);
  this.spectrum[0].push('#555');
};

var view = new Vue({
  el: '#app',
  created: app.created,
  data: app.data,
  computed: app.computed,
  methods: app.methods
});
