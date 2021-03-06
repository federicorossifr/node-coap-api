var coap = require("coap");
var writable = require("stream");
function getResrouceTitle(uri) {
	for(ind in uri) {
		if(uri[ind].startsWith("title=")) {
			var title = uri[ind].split('="')[1].replace(/"/g,"");
			return title;
		}
	}
}

function parseCOAPURIs(uriString) {
	var URIs = uriString.split(",<");
	var resources = [];
	for(u in URIs) {
		var uri = URIs[u].split(";");
		var resource = {
			path: uri[0].replace("<","").replace(">",""),
			desc: getResrouceTitle(uri)
		}
		resources.push(resource);
	}
	return resources;
}

function discover(host) {
	return new Promise(function(resolve,reject) {
		GET(host,"/.well-known/core","").then(res => {
			resolve(parseCOAPURIs(res.data));
		}).catch(err => {
			reject(err);
		});
	});
}

function GET(host,endpoint,query) {
	return new Promise(function(resolve,reject) {
		var req = coap.request({
			host: host,
			method: "GET",
			pathname: endpoint,
			query: query
		}).on('response', res => {
			var r = {
				data:res.payload.toString('utf8'),
				status: res._packet.code
			}
			resolve(r);
		}).on('error',err => {
			reject(err);
		}).end();
	});
}

function POST(host,endpoint,query,payload) {
	return new Promise(function(resolve,reject) {
		var req = coap.request({
			host: host,
			method: "POST",
			pathname: endpoint,
			query: query
		});
		req.write(payload);
		req.on('response', res => {
			var r = {
				data:res.payload.toString('utf8'),
				status: res._packet.code
			}
			resolve(r);
		}).on('error',err => {
			reject(err);
		}).end();
	});
}

function PUT(host,endpoint,query,payload) {
	return new Promise(function(resolve,reject) {
		var req = coap.request({
			host: host,
			method: "PUT",
			pathname: endpoint,
			query: query
		});
		req.write(payload);
		req.on('response', res => {
			var r = {
				data:res.payload.toString('utf8'),
				status: res._packet.code
			}
			resolve(r);
		}).on('error',err => {
			reject(err);
		}).end();
	});
}

function DELETE(host,endpoint) {
	return new Promise(function(resolve,reject) {
		var req = coap.request({
			host: host,
			method: "DELETE",
			pathname: endpoint
		});
		req.on('response', res => {
			var r = {
				data:res.payload.toString('utf8'),
				status: res._packet.code
			}
			resolve(r);
		}).on('error',err => {
			reject(err);
		}).end();
	});
}

function observe(host,endpoint,query,callback) {
	var req = coap.request({
			host: host,
			pathname: endpoint,
			observe:true
		}).on('response', res => {
			res.on('data',d => {callback(res,d)});
		}).on('error',err => {
			callback(res,null);
		}).end();
}

module.exports = {
	"discover": discover,
	"GET":GET,
	"POST":POST,
	"PUT":PUT,
	"DELETE":DELETE,
	"observe":observe
}
