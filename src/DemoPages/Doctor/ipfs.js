const ipfsClient = require("ipfs-http-client");
const ipfs = ipfsClient({
  host: "ipfs-api.healthcare.demo.latticelabs.io",
  port: "443",
  protocol: "https",
});

export default ipfs;
