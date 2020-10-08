var sailsDiskAdapter = require('sails-disk');

var config = {
    adapters: {
    'disk': sailsDiskAdapter
    },

    datastores: {
        default: {
            adapter: 'disk',
            retryWrites: false
        }
    }
};

export {config};