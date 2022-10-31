import ApolloClient from 'apollo-client'
import { WebSocketLink } from 'apollo-link-ws'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { gql } from 'apollo-boost';
import { GET_QUEUED_SONGS} from './queries';


const client = new ApolloClient ({
    link: new WebSocketLink ({
        uri: 'wss://ram-music-share.hasura.app/v1/graphql',
        options: {
            reconnect: true,
            // connectionParams:{
            //     headers:{
            //         'x-hasura-admin-sceret': 'KzNq1bEuaooSbmpmn3uG82GR23MoK8sBTdk0DWWxilnP3KNUkvm0SH0wdpKcqO5e'
            //HASURA_GRAPHQL_ADMIN_SECRET : HASURA_GRAPHQL_ADMIN_SECRET
            //     }
            // }
        }
    }),
    cache: new InMemoryCache(),
    typeDefs: gql `
        type Song {
            id: uuid!
            title: String!
            artist: Sting!
            thumbnail: String!
            duration: Float!
            url: String!
        }

        type Query {
            queue: [Song]!
        }

        input SongInput {
            id: uuid!
            title: String!
            artist: Sting!
            thumbnail: String!
            duration: Float!
            url: String!
        }

        type Mutation {
            addOrRemoveFromQueue(input: SongInput!): [Song]!
        }
    `,
    resolvers: {
        Mutation: {
            addOrRemoveFromQueue: (_, { input }, { cache }) => {
                const queryResult = cache.readQuery({
                    query: GET_QUEUED_SONGS
                })
                if(queryResult) {
                    const { queue } = queryResult
                    const isInQueue = queue.some(song => song.id === input.id)
                    const newQueue = isInQueue ?
                        queue.filter(song => song.id !== input.id)
                        : [...queue, input]
                        cache.writeQuery({
                            query: GET_QUEUED_SONGS,
                            data: { queue: newQueue }
                        })
                        return newQueue;
                }
                return [];
            }
        }
    }

})

const hasQueue= Boolean(localStorage.getItem('queue'));



const data = {
    //convert to a normal Javascript array from the stringified values
    queue: hasQueue ? JSON.parse(localStorage.getItem('queue')) : []
}

client.writeData({ data })

export default client;


// import { HttpLink, InMemoryCache } from 'apollo-boost'
// import { ApolloClient } from '@apollo/client';
// //import newWebSocketLink from 'core-js/library/fn/reflect/es7/metadata'

// const client =new ApolloClient({
//     link:new HttpLink({
//         uri: 'https://ram-music-share.hasura.app/v1/graphql',
//         options:{
//             reconnect:true,
//             connectionParams: {
//                 headers:{
//                     'x-hasura-admin-secret':'KzNq1bEuaooSbmpmn3uG82GR23MoK8sBTdk0DWWxilnP3KNUkvm0SH0wdpKcqO5e'
//                 }
//             }
//         }
//     }),
//     cache: new InMemoryCache(),
        
//     });
    



