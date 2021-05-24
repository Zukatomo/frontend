import { Post } from '../api/Post';

import { InputText } from 'primereact/inputtext';
import { useEffect, useRef, useState } from 'react';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';

const EditCompany = ({ company, onCompanyChange, onSave }) => {
    const toast = useRef(null);
    const [{ isLoading, isError }, post] = Post('http://localhost:6900/company/add', onSave);

    let [editCompany, setEditCompany] = useState({ name: "", cui: "", _id: undefined });

    useEffect(() => { setEditCompany(company) }, [company]);
    useEffect(() => {
        if (!isLoading) {
            if (isError)
                toast.current.show({ severity: 'error', summary: 'Save failed', detail: 'Falied to save the company' });
            else
                newEditCompany();
        }
    }, [isLoading]) // eslint-disable-line react-hooks/exhaustive-deps

    const newEditCompany = async () => {
        setEditCompany({ name: "", cui: "", _id: undefined });
        onCompanyChange({ name: "", cui: "", _id: undefined });
    }
    const saveEditCompany = () => {
        post({ company: editCompany });

    }

    return (
        <div className="p-m-2">
            <Toast ref={toast} />
            <div className="p-grid">
                <div className="p-col p-fluid"><Button label="New" className="p-button-info p-d-block" onClick={newEditCompany} /></div>
            </div>
            <div className="p-grid">
                <div className="p-col p-fluid"><h3>Name:</h3></div>
                <div className="p-col p-fluid"><h3>Cui/Cnp:</h3></div>
            </div>
            <div className="p-grid">
                <div className="p-col p-fluid"><InputText value={editCompany.name} onChange={(e) => setEditCompany({ ...editCompany, name: e.target.value })} /></div>
                <div className="p-col p-fluid"><InputText value={editCompany.cui} onChange={(e) => setEditCompany({ ...editCompany, cui: e.target.value })} /></div>
            </div>
            <div className="p-grid">

                <div className="p-col p-fluid"><h3><Button label="Save" className="p-button-success" onClick={saveEditCompany} disabled={isLoading} /></h3></div>
            </div>
        </div>
    );
}

export default EditCompany;