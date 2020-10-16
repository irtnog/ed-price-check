const zlib = require('zlib');
const zmq = require('zeromq/v5-compat');
const sock = zmq.socket('sub');
var seen = new Map();

sock.connect('tcp://eddn.edcd.io:9500');
sock.subscribe('');
console.log('Subscriber connected to EDDN');

sock.on('message', topic => {
    let datum = JSON.parse(zlib.inflateSync(topic));
    if (datum['$schemaRef'] == 'https://eddn.edcd.io/schemas/commodity/3') {
        const system = datum.message.systemName;
        const station = datum.message.stationName;
        const timestamp = Math.floor(Date.now() / 1000);
        for (const commodity of datum.message.commodities) {
            if (commodity.name == 'painite') {
                const price = commodity.sellPrice;
                const demand = commodity.demand;
                if (price >= 950000 && demand >= 1000 && !seen[system+station] || seen[system+station] < timestamp) {
                    console.log(station + ' in ' + system + ' buying ' + demand + ' tonnes painite for ' + price + ' CR');
                    // limit alerts to one every 24 hours
                    seen[system+station] = timestamp + 86400;
                }
                break;
            }
        }
    }
});
