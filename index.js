#!/usr/bin/env node
var child_process = require('child_process');
var path = require('path');
var fn = function(d) {return d; };
var i3statusargs    =   process.argv.splice(2);

if(i3statusargs.length > 0){
    fn  =   require(
            path.resolve(process.cwd(), i3statusargs.pop())
        );
}else if(path.join(process.env.HOME, '.myi3status/')){
  fn = require(path.join(process.env.HOME, '.myi3status/'));
}else if(path.join(process.env.HOME, '.myi3status.js')){
  fn = require(process.env.HOME, '.myi3status.js');
}

child_process
  .spawn('i3status', i3statusargs).stdout.on('data', function(data){
    var d = data.toString();
    if(d.match(/^,\[.*\]/)){
      console.log(','+JSON.stringify(fn(JSON.parse(d.replace(/^,/,'')))));
    }else{
      return process.stdout.write(data.toString());
    }
  });
