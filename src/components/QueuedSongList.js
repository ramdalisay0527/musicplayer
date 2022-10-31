import { useMutation } from '@apollo/client';
import { IconButton, Typography, Avatar, makeStyles, useMediaQuery } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import React from 'react'
import { ADD_OR_REMOVE_FROM_QUEUE } from '../graphql/mutations';

function QueuedSongList({ queue }) {
    console.log(queue)
    const greaterThanMd = useMediaQuery(theme => theme.breakpoints.up('md'));

    // const song = {
    //     title: "Say Nothing",
    //     artist: "Flume",
    //     thumbnail: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOVP.0whxsttkC4gNW3R1t2w9KwHgFo%26pid%3DApi&f=1"
    // };


    return greaterThanMd && (
        <div style={{ margin: '10px 0' }}>
            <Typography color="textSecondary" variant="button">
                QUEUE ({queue.length})
            </Typography>
            {queue.map((song, i) => (
                <QueuedSong key={i} song={song}/>
            ))}
        </div>
    )
    
    
}

const useStyles = makeStyles( theme => ({
    avatar: {
        width: 44,
        height: 44
    },
    text: {
        textOverflow: 'ellipsis',
        overflow: 'hidden'
    },
    container: {
        display: 'grid',
        gridAutoFlow: 'column',
        gridTemplateColumns: '50px auto 50px',
        gridGap: 12,
        alignItems: 'center',
        marginTop: 10
    },
    songInfoContainer: {
        overflow: 'hidden',
        whitespace: 'nowrap'

    }
}));

function QueuedSong({song}){
    const classes = useStyles()
    const [addOrRemoveFromQueue] = useMutation(ADD_OR_REMOVE_FROM_QUEUE, {
        onCompleted: data => {
            localStorage.setItem('queue', JSON.stringify(data.addOrRemoveFromQueue))
        }
    })
    const { thumbnail, artist, title } = song;

    function handleAddOrRemoveFromQueue() {
        addOrRemoveFromQueue({
            variables: { input: { ...song, __typename: "Song"} }
        })
    }




    return (
         <div className = {classes.container}>
             <Avatar className = {classes.avatar} src={thumbnail} alt="Song Thumbnail" />
             <div className= {classes.songInfoContainer}>
                 <Typography variant="subtitle2" className={classes.text}>
                     {title}
                 </Typography>
                 <Typography color="textSecondary" variant="body2">
                     {artist}
                 </Typography>
             </div>
             <IconButton onClick={handleAddOrRemoveFromQueue}>
                 <Delete color="error" />
             </IconButton>
         </div>
    )
   
}

export default QueuedSongList;