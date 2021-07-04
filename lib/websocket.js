let web_socket = require("ws");
let atob = require('atob');
let pako = require('pako');

let triggers = {
     "connect": [],
     "tick": []
};

let WebSocket = function (params) {
     let self = this;

     let url = params.url || "wss://wsfeeds.angelbroking.com/NestHtml5Mobile/socket/stream";

     let ws = null,
          client_code = params.client_code || null,
          feed_token = params.feed_token || null,
          script = params.script || null;
     task = params.task || null;

     this.connect = function () {
          return new Promise((resolve, reject) => {
               if (client_code === null || feed_token === null) return "client_code or feed_token or task is missing";

               ws = new web_socket(url, null, { rejectUnauthorized: false });
               ws.onopen = function onOpen(evt) {
                    var _req = '{"task":"cn","channel":"","token":"' + feed_token + '","user": "' + client_code + '","acctid":"' + client_code + '"}';
                    ws.send(_req);

                    setInterval(function () {
                         var _hb_req = '{"task":"hb","channel":"","token":"' + feed_token + '","user": "' + client_code + '","acctid":"' + client_code + '"}';
                         ws.send(_hb_req);
                    }, 60000);
                    resolve()
               };
               ws.onmessage = function (evt) {
                    let strData = atob(evt.data);

                    // Convert binary string to character-number array
                    var charData = strData.split('').map(function (x) { return x.charCodeAt(0); });

                    // Turn number array into byte-array
                    var binData = new Uint8Array(charData);

                    // Pako magic
                    var result = _atos(pako.inflate(binData));

                    // console.log(result)
                    trigger("tick", [JSON.parse(result)]);
               };
               ws.onerror = function (evt) {
                    console.log("error::", evt)
                    self.connect();
                    reject(evt)
               };
               ws.onclose = function (evt) {
                    console.log("Socket closed")
               };
          })
     }

     this.runScript = function (script, task) {
          if (task === null) return "task is missing";
          if (task === "mw" || task === "sfi" || task === "dp") {
               var strwatchlistscrips = script;   //"nse_cm|2885&nse_cm|1594&nse_cm|11536";
               var _req = '{"task":"' + task + '","channel":"' + strwatchlistscrips + '","token":"' + feed_token + '","user": "' + client_code + '","acctid":"' + client_code + '"}';
               ws.send(_req);
          } else return "Invalid task provided";
     };

     this.on = function (e, callback) {
          if (triggers.hasOwnProperty(e)) {
               triggers[e].push(callback);
          }
     };


     this.close = function () {
          ws.close()
     }
     
     this.terminate = function () {
          ws.terminate()
     }
}

function _atos(array) {
     var newarray = [];
     try {
          for (var i = 0; i < array.length; i++) {
               newarray.push(String.fromCharCode(array[i]));
          }
     } catch (e) { }

     return newarray.join('');
}

// trigger event callbacks
function trigger(e, args) {
     if (!triggers[e]) return
     for (var n = 0; n < triggers[e].length; n++) {
          triggers[e][n].apply(triggers[e][n], args ? args : []);
     }
}

module.exports = WebSocket;
