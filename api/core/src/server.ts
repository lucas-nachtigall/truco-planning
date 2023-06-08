import express, { Response, Request } from "express";
import {routes} from "./routes";

const app = express();
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser')
const cors = require('cors');

app.use(bodyParser.json())
app.use(cors())
app.use(bodyParser.urlencoded({extended: false}))
app.use('/', routes)

app.get("/", function (req: Request, res: Response) {
  res.send("Bohr Express template");
});

if (!module.parent) {
  app.listen(port);
  console.log("Express started on port 3000");
}

export default app;
