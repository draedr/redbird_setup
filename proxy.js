#!/usr/bin/env node)
//	########################
//	### RedBird Settings ###
//	########################

// Import helper function 'flbk'
var flbk = require('./flbk');

// Read .env file
require('dotenv').config();

// Directory where the certificates are stored
const CERTDIR = flbk(process.env.CERTDIR, _dirname + '/certs');

// Proxy general Settings
var proxySettings = {
	port: flbk(process.env.HTTP_PORT, 80),
	xfwd: flbk(process.env.ENABLE_XForwardBase, true),
	letsencrypt: {
		path: CERTDIR,
	},
	ssl: {
		http2: flbk(process.env.ENABLE_HTTP2, true),
		port: flbk(process.env.HTTPS_PORT, 443),
		key: CERTDIR + '/' + flbk(process.env.KEY_FILE, 'redbird.pem'),
		cert: CERTDIR + '/' + flbk(process.env.CERT_FILE, 'redbird.crt'),
	},
	resolvers: []
};

//	#################
//	### Resolvers ###
//	#################
// Create a custom resolver to a path, and then set the priority to 100

//	### Development resolver ###
proxySettings.resolvers[0] = function (host, url, req) {
	if (/^\/dev\//.test(url)) {
		return 'http://172.16.100.1';
	}
}
proxySettings.resolvers[0].priority = 100;	//	/dev -> dev
//	### Paperless resolver ###
proxySettings.resolvers[1] = function (host, url, req) {
	if (/^\/paper\//.test(url)) {
		return 'http://172.16.100.2';
	}
}
proxySettings.resolvers[1].priority = 100;	//	/paper -> paperless
//	### Terrairia resolver ###
proxySettings.resolvers[2] = function (host, url, req) {
	if (/^\/terraria\//.test(url)) {
		return 'http://172.16.100.3';
	}
}
proxySettings.resolvers[2].priority = 100;	//	/terraria -> terraria
//	### Torrent resolver ###
proxySettings.resolvers[3] = function (host, url, req) {
	if (/^\/torrent\//.test(url)) {
		return 'http://172.16.100.4';
	}
}
proxySettings.resolvers[3].priority = 100;	//	/torrent -> qbittorrent
//	### Share resolver ###
proxySettings.resolvers[4] = function (host, url, req) {
	if (/^\/share\//.test(url)) {
		return 'http://172.16.100.36';
	}
}
proxySettings.resolvers[4].priority = 100;	//	/share -> smb
//	### Nextcloud resolver ###
proxySettings.resolvers[5] = function (host, url, req) {
	if (/^\/nextcloud\//.test(url)) {
		return 'http://172.16.100.6';
	}
}
proxySettings.resolvers[5].priority = 100;	//	/nextcloud -> nextcloud

//	######################
//	### Initialization ###
//	######################

var proxy = require('redbird')(proxySettings);