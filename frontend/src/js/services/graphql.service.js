import { createHttpLink } from "apollo-link-http";
import ApolloClient from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import gql from 'graphql-tag';

export default class GraphqlService {
    constructor(AppConstants) {
        this.client = new ApolloClient({
            link: createHttpLink({uri: `${AppConstants.apiGrapql}`}),
            cache: new InMemoryCache()
        });
    };
 
    get(query) {
        return this.client.query({
            query: gql`${query}`
        }).then(function (result) {
            return result;
        }).catch(function (err) {
            throw err; 
        });
    }

}