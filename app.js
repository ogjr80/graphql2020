const express = require("express");
const GraphqlHTTP = require("express-graphql");
//const schema = require('./schema/schema');
const schema = require("./schema/bookSchema");

const app = express();
app.use(
  "/graphql",
  GraphqlHTTP({
    schema,
    graphiql: true
  })
);

app.listen(4000, () => {
  console.log("server now running on port 4000");
});
