import "reflect-metadata";
import { InversifyExpressServer } from "inversify-express-utils";
import { AppDataSource } from "./configs/data-source.config";
import * as express from "express";
import { Request, Response, NextFunction } from "express";
import { PORT } from "./environment/variable.env";
import { container } from "./configs/inversify.config";
import { swaggerOptions } from "./swaggers";
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const server = new InversifyExpressServer(container);

const swaggerDocs = swaggerJsdoc(swaggerOptions);
server.setConfig((app) => {
  app.use(express.json());
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
});

server.setErrorConfig((app) => {
  app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.log(err);
    res.status(500).json({ error: "An unexpected error occurred" });
  });
});

AppDataSource.initialize()
  .then(() => {
    const app = server.build();
    const port = PORT || 3000;
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error("Error during Data Source initialization", err);
  });
