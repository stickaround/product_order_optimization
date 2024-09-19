## Route

Endpoint: /optimize
Method: POST

## Sample HTTP Request

POST /optimize HTTP/1.1
Host: example.com
Content-Type: application/json
Content-Length: 123

{
    "items": [
        {"productName": "Cherry Cola", "unitOfMeasure": "EACH", "quantity": 62},
        {"productName": "Cherry Cola", "unitOfMeasure": "PACK", "quantity": 1}
    ]
}

## Sample HTTP Response

HTTP/1.1 200 OK
Content-Type: application/json
Content-Length: 150

{
    "optimizedItems": [
        {"productName": "Cherry Cola", "unitOfMeasure": "CASE", "quantity": 2},
        {"productName": "Cherry Cola", "unitOfMeasure": "PACK", "quantity": 3},
        {"productName": "Cherry Cola", "unitOfMeasure": "EACH", "quantity": 2}
    ]
}

## Error handling

HTTP/1.1 400 Bad Request
Content-Type: application/json
Content-Length: 97

{
    "error": "Bad request. Please check the product names and quantities"
}