import React from 'react'
import { Card, CardActions, CardContent, CardMedia, CircularProgress, IconButton, Typography, makeStyles } from '@material-ui/core';
import { Pause, PlayArrow, Save, Visibility, VisibilityOff } from '@material-ui/icons';
import { useMutation, useSubscription } from '@apollo/client';
import { GET_SONGS } from '../graphql/subscriptions';
import { SongContext } from '../App';
import { ADD_OR_REMOVE_FROM_QUEUE } from '../graphql/mutations';

function SongList() {
    const { data, loading, error }= useSubscription(GET_SONGS)
    
    // const song ={
    //     title: "Say Nothing",
    //     artist: "Flume",
    //     thumbnail: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOVP.0whxsttkC4gNW3R1t2w9KwHgFo%26pid%3DApi&f=1"
    // }


    if(loading){
        return (
            <div style= {{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                marginTop: 50
            }}>
                <CircularProgress />
            </div>
        );
    }
    if(error) return<div>Error Fetching Songs</div>


    return (<div>{data.songs.map(song =>(
        <Song key={song.id} song={song} />
        ))}</div>
    );
}

const useStyles = makeStyles(theme => ({
    container: {
        margin: theme.spacing(5)
    },
    songInfoContainer: {
        display: 'flex',
        alignItems: 'center'
    },
    songInfo: {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between'
    },
    thumbnail: {
        objectFit: 'cover',
        width: 140,
        height: 140
    }
}))

//individual song Component
function Song({song}) {
    const {id} = song;
    const classes = useStyles();
    const [addOrRemoveFromQueue] = useMutation(ADD_OR_REMOVE_FROM_QUEUE, {
        //callback to store the queue in the browser
        onCompleted: data => {
            localStorage.setItem('queue', JSON.stringify(data.addOrRemoveFromQueue))
        }
    })
    //useContext and Use Reducer is used to sync the songlist songs and songplayer songs
    const { state, dispatch } = React.useContext(SongContext)
    const [currentSongPlaying, setCurrentSongPlaying] = React.useState(false)
    const { title, artist, thumbnail } = song

    // hide
    const [hideSong, setHideSong ] = React.useState()

React.useEffect(() => {
    const isSongPlaying = state.isPlaying && id === state.song.id;
    setCurrentSongPlaying(isSongPlaying)
}, [id, state.song.id, state.isPlaying, hideSong])

function handleHideSong() {
    setHideSong(current => !current)
}

function handleTogglePlay() {
    dispatch({ type: "SET_SONG", payload: { song }})
    dispatch(state.isPlaying ? { type: "PAUSE_SONG"}: { type: "PLAY_SONG"});
}

function handleAddOrRemoveFromQueue() {
    addOrRemoveFromQueue({
        variables: { input: { ...song, __typename: "Song"} }
    })
}

    return (
    <Card className={classes.container}>
        <div className={classes.songInfoContainer}>
            <CardMedia className={classes.thumbnail} image={thumbnail} />
            <div className={classes.songInfo} >
                {!hideSong ? 
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2" color="textSecondary">
                        {title}
                    </Typography>
                    <Typography variant="body1" component="p" color="textSecondary">
                        {artist}
                    </Typography>
                </CardContent>
                : 
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2" color="textSecondary">
                        hi
                    </Typography>
                </CardContent>}
                <CardActions>
                    <IconButton onClick={handleTogglePlay} size="small" color="primary">
                        {currentSongPlaying ? <Pause/> : <PlayArrow/>}
                    </IconButton>
                    <IconButton onClick={handleAddOrRemoveFromQueue} size="small" color="secondary">
                        <Save color="secondary"/>
                    </IconButton>
                    <IconButton onClick={handleHideSong} size="small" color="secondary">
                        {hideSong ? <VisibilityOff/> : <Visibility/>}
                    </IconButton>
                </CardActions>
            </div>
        </div>
    </Card>
    )
}

export default SongList;