const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList
} = graphql;
const _ = require("lodash");

const books = [
  {
    id: "1",
    name: "Cheaper by the Dozzen",
    genre: "Comedy",
    authorId: "1"
  },
  {
    id: "2",
    name: "Froze",
    genre: "Anima",
    authorId: "2"
  },
  {
    id: "3",
    name: "Odogbu",
    genre: "Comedy",
    authorId: "3"
  },
  {
    id: "4",
    name: "some name",
    genre: "some genere",
    authorId: "3"
  },
  {
    id: "5",
    name: "some name",
    genre: "some genere",
    authorId: "2"
  },
  {
    id: "6",
    name: "some name",
    genre: "some genere",
    authorId: "3"
  }
];

const authors = [
  {
    id: "1",
    name: "David Moore",
    age: 40
  },
  {
    id: "2",
    name: "Sanmantha Frozen",
    age: 39
  },
  {
    id: "3",
    name: "Adeboye Adeola",
    age: 40
  }
];

const BookType = new GraphQLObjectType({
  name: "Book",
  description: "Book Type Structure",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve(parent, args) {
        return _.find(authors, { id: parent.id });
      }
    }
  })
});

const AuthorType = new GraphQLObjectType({
  name: "Author",
  description: "Author Type Structure",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return _.filter(books, { authorId: parent.id });
      }
    }
  })
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  description: "Queries for different types of Books",
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return _.find(books, { id: args.id });
      }
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return _.find(authors, { id: args.id });
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
