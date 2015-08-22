#!/usr/bin/env node
var child_process = require('child_process');
var fs = require('fs');
var path = require('path');
var userfilepath = path.join(process.env.HOME, '.myi3status.js');
var fn;

if(fs.existsSync(userfilepath)){
  fn = require(userfilepath);
}else{
  fn = function(d) {return d; };
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
