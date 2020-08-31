import React from 'react';
import { TextField, MenuItem } from '@material-ui/core';

function InfiniteScrollDropDown(props) {
    /**
         * Generate list of Airports to feed to dropdown
         * Match the selection and display it on dropdown
         * @param {Obj} selectedAirport  - selected Airport
         */
    const generateAirportListItems = (data, selectedAirport) => {
        const menuElement = [];
        if (data.length === 0) {
            return <MenuItem
                value={''}
                name={''}
            >
                {props.fields.noDataMsg}
            </MenuItem >
        } else {
            data.forEach(obj => {
                menuElement.push(
                    <MenuItem
                        value={obj}
                        name={obj}
                    >
                        {`${obj.name} (${obj.code.toUpperCase()}) - ${obj.city} - ${obj.country}`}
                    </MenuItem >
                )
            });
        }
        return menuElement;
    }

    return (
        <TextField
            select
            label={props.fields.label}
            value={props.fields.selected.code}
            onChange={e => props.callbacks.handleSelected(e)}
            onScroll={props.callbacks.shouldLoadMoreItems}
            inputProps={{
                className: props.fields.classes.menu
            }}
            className={props.fields.classes.selectText}
        >
            {generateAirportListItems(props.fields.data, props.fields.selected)}
        </TextField>
    );
}
export default InfiniteScrollDropDown;
