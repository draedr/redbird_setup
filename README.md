# Redbird Setup
This is the redbird proxy server that i use on my home server.

Server settings are loaded from a .env file using *dotenv*, and custom resolvers are used for path resolving to various services hosted on LXC containers.

- /certs: contains the certificates. Path can be changed in .env
- /flbk.js: a helper function for a default value from .env