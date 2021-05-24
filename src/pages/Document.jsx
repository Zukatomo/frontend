import React, { useState } from 'react';
import { UMList } from '../utils/UM';
import { TVAList } from '../utils/TVA';
import { Get } from '../api/Get';
import { Panel } from 'primereact/panel';
import { Toolbar } from 'primereact/toolbar';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';

const Document = () => {
    let [{ data: companys }] = Get('http://localhost:6900/company');
    let [document, setDocument] = useState({ date: null, company: { name: '', cui: '', id: null }, fact: '' });
    let [currentItem, setCurrentItem] = useState({ id: undefined, name: undefined, um: undefined, tva: undefined, quantity: undefined, priceA: undefined, priceB: undefined });


    return (
        <div>
            <Toolbar left={leftContents}></Toolbar>
            <Panel header="Header" toggleable>
                <div className="p-grid">
                    <div className="p-col p-fluid">
                        <label htmlFor="datePicker">Select date:</label>
                        <Calendar id="datePicker" value={document.date} onChange={(e) => setDocument({ ...document, date: e.value })} showIcon />
                    </div>
                    <div className="p-col p-fluid">
                        <label htmlFor="companyPicker">Select a company:</label>
                        <Dropdown id="companyPicker" value={document.company} options={companys} onChange={(e) => setDocument({ ...document, company: e.value })} placeholder="Select a City"
                            itemTemplate={companyOptionTemplate} valueTemplate={selectedCompanyTemplate} optionLabel="name"
                            filter={true} />
                    </div>
                    <div className="p-col p-fluid">
                        <label htmlFor="facturaInput">FACTURA:</label>
                        <InputText id="facturaInput" value={document.fact} onChange={(e) => setDocument({ ...document, fact: e.target.value })} />
                    </div>
                </div>
            </Panel>
            <Panel>
                <div className="p-grid">
                    <div className="p-col p-fluid">
                        <label htmlFor="unitPicker">Select unit:</label>
                        <Dropdown id="unitPicker" options={UMList} value={currentItem.um} onChange={(e) => setCurrentItem({ ...currentItem, um: e.value })}></Dropdown>
                    </div>
                    <div className="p-col p-fluid">
                        <label htmlFor="tvaPicker">Select TVA:</label>
                        <Dropdown id="tvaPicker" options={TVAList} value={currentItem.tva} onChange={(e) => setCurrentItem({ ...currentItem, tva: e.value })}></Dropdown>
                    </div>
                    <div className="p-col p-fluid">
                        <label htmlFor="quantityInput">Input qunatity:</label>
                        {/* TODO: only allow 2 decimal */}
                        <InputNumber id="quantityInput" value={currentItem.quantity} onChange={(e) => setCurrentItem({ ...currentItem, quantity: e.value })} mode="decimal" minFractionDigits={2} maxFracionDigits={2}></InputNumber>
                    </div>
                    <div className="p-col p-fluid">
                        <label htmlFor="priceAInput">Input priceA:</label>
                        {/* TODO: only allow 2 decimal */}
                        <InputNumber id="priceAInput" value={currentItem.priceA} onChange={(e) => setCurrentItem({ ...currentItem, priceA: e.value })} mode="decimal" minFractionDigits={1} maxFracionDigits={2}></InputNumber>
                    </div>
                    <div className="p-col p-fluid">
                        <label htmlFor="priceBInput">Input priceB:</label>
                        {/* TODO: only allow 2 decimal */}
                        <InputNumber id="priceBInput" value={currentItem.priceB} onChange={(e) => setCurrentItem({ ...currentItem, priceB: e.value })} mode="decimal" minFractionDigits={2} maxFracionDigits={2}></InputNumber>
                    </div>
                    <div className="p-col p-fluid">
                        <label htmlFor="addCurrentItemButton">&nbsp;</label>
                        <Button id="addCurrentItemButton"label="Add" icon="pi pi-plus" className="p-button-success p-mr-2" />
                    </div>
                </div>
            </Panel>
        </div>
    );
}

const leftContents = (
    <React.Fragment>
        <Button label="New" icon="pi pi-plus" className="p-mr-2" />
        <Button label="Save" icon="pi pi-save" className="p-button-success p-mr-2" />
        <Button label="Print" icon="pi pi-print" className="p-button-warning p-mr-2" />
    </React.Fragment>
);

const companyOptionTemplate = (option) => {
    return (
        <span>{option.name}-{option.cui}</span>
    )
}

const selectedCompanyTemplate = (option, props) => {
    if (option) {
        return (
            <span>{option.name}</span>
        )
    }
    return (
        <span>{props.placeholder}</span>
    )
}

export default Document;