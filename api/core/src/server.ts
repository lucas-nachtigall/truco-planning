import express, { Response, Request } from "express";
import {routes} from "./routes";

const app = express();
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser')
const cors = require('cors');
const Pusher = require('pusher');

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(cors());
app.use('/', routes)

export const pusher = new Pusher({
  appId: "1594774",
  key: "5918ae5c8a1c68cce96d",
  secret: "e90760e33013f1523e9b",
  cluster: "sa1",
  useTLS: true
});

app.get("/", function (req: Request, res: Response) {
  res.send("Bohr Express template");
});

if (!module.parent) {
  app.listen(port);
  console.log("Express started on port 3000");
}

export default app;
