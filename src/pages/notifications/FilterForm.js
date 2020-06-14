import React from 'react';
import Filters from '../../filters.js'
import { Form, Card, Button } from 'react-bootstrap'



const FilterForm = ({ remove, onChange, filter }) => {
    let fields = Object.keys(Filters.fields)
    return (
        <Card>
            <Card.Body>
                <Form.Control className="filter-dropdown" as="select" value={filter.field ? filter.field : "default"} onChange={(e) => { onChange(e, "field") }}>
                    <option value="default" disabled={true}>Please select a field</option>
                    {fields.map((prop, key) => {
                        return (
                            <option key={key} value={prop}>{Filters.fields[prop].displayName}</option>
                        );
                    })}
                </Form.Control>
                {filter.field ? <Form.Control className="filter-dropdown" as="select" value={filter.filter ? filter.filter : "default"} onChange={(e) => { onChange(e, "filter") }}>
                    <option value="default" disabled={true}>Please select a filter</option>
                    {Filters.fields[filter.field].filters.map((prop, key) => {
                        return (
                            <option key={key} value={prop}>{Filters.filters[prop].displayName}</option>
                        );
                    })}
                </Form.Control> :
                    <Form.Control className="filter-dropdown" as="select" disabled={true} />}
                {filter.field ? Filters.fields[filter.field].enum ? <Form.Control as="select" value={filter.value ? filter.value : "default"} onChange={(e) => { onChange(e, "value") }}>
                    <option value="default" disabled={true}>Please select a value</option>
                    {Object.keys(Filters.fields[filter.field].enum).map((prop, key) => {
                        return (
                            <option key={key} value={prop}>{Filters.fields[filter.field].enum[prop].displayName}</option>
                        );
                    })}
                </Form.Control> : <Form.Control value={filter.value ? filter.value : ""} onChange={(e) => { onChange(e, "value") }} /> : <Form.Control as="select" disabled={true} />}

            </Card.Body>
            <Card.Footer>
                <Button variant="danger" onClick={remove}>Remove</Button>
            </Card.Footer>
        </Card>
    );
}

export default FilterForm;