require("dotenv").config();

import app from "./app";

const server = app({
  logger: {
    level: "debug",
    prettyPrint: true,
  },
});

server.listen(
  { port: parseInt(process.env.PORT!) || 3000, host: "0.0.0.0" },
  (err, addr) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    // Server is now listening on ${addr}
  }
);
