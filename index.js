const zlib = require('zlib');
const zmq = require('zeromq/v5-compat');
const sock = zmq.socket('sub');

sock.connect('tcp://eddn.edcd.io:9500');
sock.subscribe('');
console.log('Subscriber connected to EDDN');

sock.on('message', topic => {
    let datum = JSON.parse(zlib.inflateSync(topic));
    if (datum['$schemaRef'] == 'https://eddn.edcd.io/schemas/commodity/3') {
        const system = datum.message.systemName;
        const station = datum.message.stationName;
        for (const commodity of datum.message.commodities) {
            if (commodity.name == 'painite') {
                const price = commodity.sellPrice;
                const demand = commodity.demand;
                if (price >= 950000 && demand >= 1000) {
                    console.log(station + ' in ' + system + ' buying ' + demand + ' tonnes painite for ' + price + ' CR');
                }
                break;
            }
        }
    }
});
