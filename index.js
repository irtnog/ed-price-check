const zlib = require('zlib');
const zmq = require('zeromq/v5-compat');
const sock = zmq.socket('sub');

sock.connect('tcp://eddn.edcd.io:9500');
sock.subscribe('');
console.log('Subscriber connected to EDDN');

sock.on('message', topic => {
  console.log(JSON.parse(zlib.inflateSync(topic)));
});
