import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
dotenv.config();
import connect from "../db";
import { graphqlHTTP } from "express-graphql";
import cors from "cors";
import schema from "../graphql/schema";
import bodyParser from "body-parser";
import routes from "./routes";
import MMRouter from "./router/MMRouter";

const app = express();

app.set(`port`, process.env.PORT);
app.use(morgan(`dev`));
connect();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  "/graphql",
  cors(),
  bodyParser.json(),
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

app.post(routes.getProductDetail, MMRouter);

app.listen(app.get(`port`), () => {
  console.log(
    ` - 🍀 [INSTAR] GRAPHQL BACKEND SERVER START WITH MONGODB  PORT : ${process.env.PORT} 🍀 `
  );
});
