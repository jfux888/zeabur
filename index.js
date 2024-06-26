const uuid = (process.env.UUID || 'feefeb96-bfcf-4a9b-aac0-6aac771c1b98').replace(/-/g, "");
const wsPort = process.env.PORT || 8080;

const wsServer = new WebSocket.Server({ port: wsPort });

wsServer.on('connection', ws => {
  ws.on('message', msg => {
    const [VERSION] = msg;
    const id = msg.slice(1, 17);

    if (!id.every((v, i) => v === parseInt(uuid.substr(i * 2, 2), 16))) return;

    let i = msg.slice(17, 18).readUInt8() + 19;
    const port = msg.slice(i, i += 2).readUInt16BE(0);
    const ATYP = msg.slice(i, i += 1).readUInt8();

    const host = ATYP === 1 ? msg.slice(i, i += 4).join('.') :
      (ATYP === 2 ? new TextDecoder().decode(msg.slice(i + 1, i += 1 + msg.slice(i, i + 1).readUInt8())) :
      (ATYP === 3 ? msg.slice(i, i += 16).reduce((s, b, i, a) => (i % 2 ? s.concat(a.slice(i - 1, i + 1)) : s), [])
      .map(b => b.readUInt16BE(0).toString(16)).join(':') : ''));

    if (ws.readyState === WebSocket.OPEN) {
      try {
        ws.send(new Uint8Array([VERSION, 0]));
        const duplex = createWebSocketStream(ws);

        const connectWithRetry = (retries = 3) => {
          if (retries <= 0) return;

          const socket = net.connect({ host, port }, function () {
            this.write(msg.slice(i));
            duplex.on('error', () => {}).pipe(this).on('error', () => {}).pipe(duplex);
          });

          socket.on('error', () => {
            socket.setTimeout(5000, () => {
              socket.destroy();
              connectWithRetry(retries - 1);
            });
          });

          socket.on('close', () => {});
        };

        connectWithRetry();
      } catch (error) {}
    }
  }).on('error', () => {});
});

wsServer.on('error', () => {});
wsServer.on('close', () => {});
});
