module.exports.models = {
    'Option': {
        'id': 'Option',
        //'required': ['id', 'name'],
        'properties': {
            'itemids': {
                'type': 'array',
                'description': 'return only items with the given IDs'
            },
            'groupids': {
                'type': 'array',
                'description': 'Return only items that belong to the hosts from the given groups'
            }
        }
    }
};

