import React from 'react';
import { Paper, Grid, Typography, Divider } from '@material-ui/core';

function CardLayout(props) {
    const { data, label, classes } = props.fields;
    return (
        <Paper className={classes.cardLayout}>
            <Typography variant="h6" component="h6" gutterBottom>
                {label}
            </Typography>
            <Divider />
            <Grid
                container spacing={8}
                container
                direction="row"
                justify="flex-start"
                alignItems="flex-start">
                <Grid item xs={12}>
                    {data.map(tempData =>
                        <>
                            <Grid item xs={12}>
                                <Typography component="body1" variant="body1" gutterBottom>
                                    {`${tempData.label}: ${tempData.value !== undefined && tempData.isLink ?
                                        <a href="javascript:void(0);" src={tempData.url}>
                                            {tempData.url}
                                        </a> :
                                        tempData.value}`}
                                </Typography>
                            </Grid>
                        </>
                    )}
                </Grid>
            </Grid>
        </Paper>

    );
}
export default CardLayout;
