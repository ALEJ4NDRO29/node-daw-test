import ApolloClient from "apollo-client";
import { ApolloLink, HttpLink } from "apollo-boost";
import { InMemoryCache } from "apollo-cache-inmemory";
import gql from 'graphql-tag';


export default class GraphqlService {
    constructor(AppConstants, JWT) {

        this.httpLink = new HttpLink({ uri: AppConstants.apiGrapql });

        // JWT TOKEN
        this.ApolloLink = new ApolloLink((operation, forward) => {
            const token = JWT.get()

            operation.setContext({
                headers: {
                    authorization: token ? `Token ${token}` : ''
                }
            });

            return forward(operation);
        });

        this.client = new ApolloClient({
            link: this.ApolloLink.concat(this.httpLink),
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