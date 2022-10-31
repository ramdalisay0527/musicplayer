import { gql } from 'apollo-boost'


export const GET_SONGS = gql `
subscription getSongs {
    songs{
      artist
      duration
      id
      thumbnail
      title
      url
    }
  }
`