import React from 'react';
import Filters from '../../filters.js'


const Description = ({ filters }) => {
    let filterString = ""
    filters.forEach((element, idx, array) => {
        filterString +=
            Filters.fields[element.field].displayName + " " +
            Filters.filters[element.filter].displayName + " " + 
            (Filters.fields[element.field].enum ? Filters.fields[element.field].enum[element.value].displayName :element.value)+
            (idx === array.length - 1? "": " and ")
    })
    return (
        <div className="filters">
            {filterString}
        </div>
    );
}

export default Description;