import React,{useState} from 'react'
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
const Controller = ({onCreate,onSearch,onFilter}) => {
    const filters = [
        {label: 'All', value: 'All'},
        {label: 'Pending', value: 'Pending'},
        {label: 'Completed', value: 'Completed'}
    ];
    const [searchKey, setSearchKey] = useState('');
    const [filter, setFilter] = useState("")
    const onChangeSearch = (value) => {
        setSearchKey(value);
        onSearch(value)
    }
    const onChangeFilter = (value) => {
        setFilter(value)
        onFilter(value)
    }
    return (
        <div className="p-grid p-col-12 border-bottom p0 mlr0">
            <div className="p-col-9 p-md-9 p-sm-12 p-grid align-left">
                <div className="p-col-12 p-md-9 p-sm-6">
                    <div className="p-inputgroup mtb10">
                        <span className="p-inputgroup-addon white">
                            <i className="pi pi-search"></i>
                        </span>
                        <InputText
                            className="w100"
                            placeholder="Search Workflow"
                            value={searchKey}
                            onChange={e => onChangeSearch(e.target.value)} />
                    </div>
                </div>
                <div className="p-col-12 p-md-3 p-sm-6 flex p-justify-center p-align-center">
                    <Dropdown
                        className="w100"
                        value={filter}
                        options={filters}
                        onChange={(e) => { onChangeFilter(  e.value ) }}
                        placeholder="Filter"
                    />
                </div>
            </div>
            <div className="p-col p-md-3 p-sm-12 align-right flex p-justify-center p-align-center">
                <Button label="Create Workflow" className="p-button-success" onClick={onCreate} icon="pi pi-plus" />
            </div>
        </div>
    )
}

export default Controller;