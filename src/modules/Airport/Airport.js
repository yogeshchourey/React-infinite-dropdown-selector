import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import styles from './Airport.style';
import config from '../../configs'
import http from "../../apis/http";
import InfiniteScrollDropDown from '../CommonComponents/InfiniteScrollDropDown/InfiniteScrollDropDown';
import CardLayout from '../CommonComponents/CardLayout/CardLayout';
class Airport extends Component {
    constructor(props) {
        super(props);
        this.state = {
            airports: [],
            page: 0,
            size: 50,
            selectedAirport: ''
        }
        this.getAirport = this.getAirport.bind(this);
        this.handleSelected = this.handleSelected.bind(this);
        //Lets fetch some data to populate in drop-down
        this.getAirport();
    }
    /**
     * Fetch Airports list (using  fake-server)
     */
    getAirport = () => {
        const { page, size } = this.state;
        const self = this;
        http.get(
            `${config.REACT_APP_FAKESERVER}/airports?_page=${page}&_limit=${size}`
        ).then(
            rsp => {
                if (rsp.status === 200) {
                    let { airports } = self.state;
                    airports.push(...rsp.data);
                    this.setState({
                        airports
                    });
                } else {
                    console.log('Error in fetching airports data')
                }
            },
            err => {
                console.log('Error in fetching airports data')
            }
        ).catch(err => {
            console.log('Error in fetching airports data')
        })
    }

    shouldLoadMoreItems = (event) => {
        const self = this;
        if (event.target.scrollTop === (event.target.scrollHeight - event.target.offsetHeight)) {
            const { page } = self.state;
            self.setState({
                page: page + 1
            })
            self.getAirport();
        }
    }

    handleSelected = (event) => {
        const airportObj = event.target.value;
        this.setState({
            selectedAirport: airportObj
        })
    }

    render() {
        const { classes } = this.props;
        const { selectedAirport, airports } = this.state;
        debugger;
        return (
            <>
                <Paper className={classes.paperRoot} elevation={3}>
                    {airports.length > 0 &&
                        <InfiniteScrollDropDown
                            fields={{
                                data: airports,
                                selected: selectedAirport,
                                label: `Select an airport:`,
                                noDataMsg: 'No airports to list',
                                classes: classes
                            }}
                            callbacks={{
                                handleSelected: this.handleSelected,
                                shouldLoadMoreItems: this.shouldLoadMoreItems
                            }}
                        />
                    }
                </Paper>
                <br />
                {
                    Object.keys(selectedAirport).length > 0 &&
                    <CardLayout
                        fields={{
                            data: [
                                { label: 'Airport', value: `${selectedAirport.name}(${selectedAirport.code})` },
                                { label: 'City', value: selectedAirport.city || 'Not Available' },
                                { label: 'Country', value: selectedAirport.country || 'Not Available' },
                                { label: 'Latitude', value: selectedAirport.lat || 'Not Available' },
                                { label: 'Longitude', value: selectedAirport.lon || 'Not Available' },
                                { label: 'Phone', value: selectedAirport.phone || 'Not Available' },
                                { label: 'Runway Length', value: selectedAirport.runway_length || 'Not Available' },
                                { label: 'Website ', value: selectedAirport.url || 'Not Available', isLink: selectedAirport.url || false },
                            ],
                            label: 'Airport Details',
                            classes: classes
                        }}
                    />
                }
            </>
        );
    }
}

export default withStyles(styles)(Airport);
