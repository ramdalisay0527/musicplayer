import React from 'react';
import AddSong from './components/AddSong';
import Header from './components/Header';
import SongList from './components/SongList';
import SongPlayer from './components/SongPlayer';
import { Grid, useMediaQuery, Hidden } from '@material-ui/core';
import songReducer from './reducer';

export const SongContext = React.createContext({
  song: {
    id: "6b45d32b-7a2b-4a67-a175-a499e78c8393",
    title: "Matroda for Matroda & Friends - Insomniac Records Livestream (August 5, 2020)",
    artist: "Matroda",
    thumbnail: "http://img.youtube.com/vi/LSN21xvj0I4/0.jpg",
    url: "https://www.youtube.com/watch?v=LSN21xvj0I4",
    duration: "3580"
  },
  isPlaying: false
})


function App() {
  const initialSongState = React.useContext(SongContext)
  const [state, dispatch] = React.useReducer(songReducer, initialSongState)
  const greaterThanSm = useMediaQuery(theme => theme.breakpoints.up('sm'));
  const greaterThanMd = useMediaQuery(theme => theme.breakpoints.up('md'));
  

  return (
    
    <SongContext.Provider value={{ state, dispatch }}>
      <Hidden only="xs">
        <Header />
      </Hidden>
      
      <Grid container spacing={3}> 
          <Grid style={{
            paddingTop :greaterThanSm ? 80 : 10
          }}item xs={12} md={7}>
            <AddSong />
            <SongList />
          </Grid>
          <Grid style={
            greaterThanMd ? { 
            position: 'fixed',
            width: '100%',
            right: 0,
            top: 70
            }: {
              position:'fixed',
              width: '100%',
              left: 0,
              bottom: 0
            }} item xs={12} md={5}>
            <SongPlayer />
          </Grid>
      </Grid>
      </SongContext.Provider>
    
    
  );
}

export default App;
