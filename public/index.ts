$("#form").alpaca({
    "data": [{
        "key": "key1",
        "title": "title1",
        "amount": 2.53
    }, {
        "key": "key2",
        "title": "title2",
        "amount": 1.80
    }, {
        "key": "key3",
        "title": "title3",
        "amount": 5.60
    }],
    "schema": {
        "type": "array",
        "items": {
            "type": "object",
            "properties": {
                "key": {
                    "type": "string",
                    "title": "Key"
                },
                "title": {
                    "type": "string",
                    "title": "Title"
                },
                "amount": {
                    "type": "number",
                    "title": "Amount"
                }
            }
        }
    },
    "options": {
        "type": "table"
    }
});