const { server } = require("./server");

const port = 8080;

server.listen(port, () => {
  console.log(`Servidor na porta ${port}`);
});