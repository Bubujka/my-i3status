#!/usr/bin/env node
var child_process = require('child_process');
var path = require('path');
var fn = function(d) {return d; };

if(path.join(process.env.HOME, '.myi3status/')){
  fn = require(path.join(process.env.HOME, '.myi3status/'));
}else if(path.join(process.env.HOME, '.myi3status.js')){
  fn = require(process.env.HOME, '.myi3status.js');
}

child_process
  .spawn('i3status').stdout.on('data', function(data){
    var d = data.toString();
    if(d.match(/^,\[.*\]/)){
      console.log(','+JSON.stringify(fn(JSON.parse(d.replace(/^,/,'')))));
    }else{
      return process.stdout.write(data.toString());
    }
  });
