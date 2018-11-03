# Coap API

# Installation
```bash
npm install coap-api --save
```

# Usage
**discover**
```javascript
var coapApi = require("coap-api");
coapApi.discover(host)
  .then(discovered => {...})
  .catch(err => {...});
```
**GET**
```javascript
var coapApi = require("coap-api");
coapApi.GET(host,resourceEndpoint,getQueryString)
  .then(response => {...})
  .catch(error => {...});
```

**POST**
```javascript
var coapApi = require("coap-api");
coapApi.POST(host,resourceEndpoint,getQueryString,postPayloadString)
  .then(response => {...})
  .catch(error => {...});
```

**PUT**
```javascript
var coapApi = require("coap-api");
coapApi.PUT(host,resourceEndpoint,getQueryString,postPayloadString)
  .then(response => {...})
  .catch(error => {...});
```
**DELETE**
```javascript
var coapApi = require("coap-api");
coapApi.DELETE(host,resourceEndpoint)
  .then(response => {...})
  .catch(error => {...});
```

**observe**
```javascript
var coapApi = require("coap-api");
coapApi.PUT(host,resourceEndpoint,getQueryString,(response) => {...})
```
