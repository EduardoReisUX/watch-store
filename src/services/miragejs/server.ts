import { createServer, Factory, Model, Response } from "miragejs";
import { faker } from "@faker-js/faker";

type Product = {
  id: string;
  title: string;
  price: string;
  image: string;
};

export const makeServer = ({ environment = "development" } = {}) => {
  return createServer({
    environment,

    models: {
      product: Model.extend<Partial<Product>>({}),
    },

    factories: {
      product: Factory.extend({
        title() {
          return faker.commerce.productName();
        },
        price() {
          return faker.commerce.price(100, 5000);
        },
        image() {
          return faker.image.business(600, 600, true);
        },
      }),
    },

    seeds(server) {
      server.createList("product", 200);
    },

    routes() {
      this.namespace = "api";
      this.timing = 750;

      this.get("/products", (schema, request) => {
        return schema.all("product").slice(0, 12);
      });

      this.namespace = "";
      this.passthrough();
    },
  });
};
