const graphql = require("graphql");
const lodash = require("lodash");
const { GraphQLObjectType, GraphQLString, GraphQLSchema } = graphql;

const assessments = [
  {
    name: "Programming Assessment",
    description: "basic programming test",
    id: "1"
  },
  {
    name: "Solution Architect",
    description: "solution Architect test",
    id: "2"
  },
  { name: "BA", description: "BA Assessment Test", id: "3" }
];

const AssessmentType = new GraphQLObjectType({
  name: "Assessment",
  description: "Structure of an Assessment",
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    description: { type: GraphQLString }
  })
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  description: "Query for Assesment Type",
  fields: {
    Assessment: {
      type: AssessmentType,
      args: { id: { type: GraphQLString } },
      resolve(parent, args) {
        return lodash.find(assessments, { id: args.id });
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
