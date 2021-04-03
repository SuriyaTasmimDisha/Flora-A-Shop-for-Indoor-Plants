import React from 'react';
import { Link } from 'react-router-dom';
import {Button, Typography, Grid} from '@material-ui/core';
import { buttonStyles } from '../../assets/styles/ButtonStyle';
import StoreIcon from '@material-ui/icons/Store';
import {makeStyles} from '@material-ui/styles'

const useStyles = makeStyles({
    textColor: {
        color: '#097E23'
    },
    customPadding: {
        paddingTop: '10rem'
    }
});

export default function HomePage() {
    const classes = useStyles();
    const button = buttonStyles();

    return (
            <Grid container spacing={2} justify='space-around'>
            <Grid container item xs={12} md={6} justify='center'>
                <Typography className={classes.customPadding} display='inline' variant='h3' color='secondary'>
                   MAKE YOUR ROOM <span className={classes.textColor}>GREEN</span> 
                </Typography>
                <Typography display='inline' variant='h5' color='textPrimary'>
                    Decorate your room with various types of indoor plants
                </Typography>
                <Link to='/catalogue'>
                    <Button 
                    endIcon={<StoreIcon />}
                    className={button.mediumStyle}
                    variant='contained' 
                    color='primary'>
                         Shop Now   
                     </Button>
                    </Link>
            </Grid>
            <Grid container item xs={12} md={6} justify='center'>
                <img src="./images/cover-img.png" alt="plant" />
            </Grid>
            </Grid>
    )
}
