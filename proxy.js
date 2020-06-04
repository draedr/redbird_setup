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

//	######################
//	### Initialization ###
//	######################

var proxy = require('redbird')(proxySettings);

//	#################
//	### Resolvers ###
//	#################
// Create a custom resolver to a path, and then set the priority to 100

proxy.register("neet.ddns.net/", "192.168.10.10:8080");
proxy.register("neet.ddns.net/dev", "192.168.10.20");
proxy.register("neet.ddns.net/paper", "192.168.10.21");
proxy.register("neet.ddns.net/terraria", "192.168.10.22");
proxy.register("neet.ddns.net/torrent", "192.168.10.23");
proxy.register("neet.ddns.net/share", "192.168.10.24");
proxy.register("neet.ddns.net/docker", "192.168.10.25");
proxy.register("neet.ddns.net/nextcloud", "192.168.10.26");
