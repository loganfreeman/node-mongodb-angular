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
            },
            'hostids': {
                'type': 'array',
                'description': 'Return only items with the given host IDs.'
            }
        }
    },

    'UserModification': {
        'id': 'UserModification',
        'properties': {
            'firstname': {
                'type': 'string'
            },
            'lastname': {
                'type': 'string'
            },
            'password': {
                'type': 'string'
            },
            'stacks': {
                'type': 'array'
            },
            'instances': {
                'type': 'array'
            }
        }
    },

    'StackModification': {
        'id': 'StackModification',
        'properties': {
            'name': {
                'type': 'string'
            },
            'description': {
                'type': 'string'
            },
            'instances': {
                'type': 'array'
            }
        }
    }
};

