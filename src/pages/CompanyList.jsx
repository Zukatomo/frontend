import { useState } from 'react';
import { Get } from '../api/Get';
import CompanyTable from '../components/CompanyTable';
import EditCompany from '../components/EditCompany';

const CompanyList = () => {
    const [company, setCompany] = useState({name:"", cui:"", _id:undefined});
    const [{ data:companys, isLoading, isError }, refresh] = Get('http://localhost:6900/company');

    return (
        <div className="p-grid">
            <div className="p-col">
                <CompanyTable onSelectedCompanyChange={setCompany} selectedCompany={company} companys={companys} isLoading={isLoading} isError={isError}></CompanyTable>
            </div>
            <div className="p-col">
                <EditCompany company={company} onCompanyChange={setCompany} onSave={refresh}></EditCompany>
            </div>
        </div>
    );
}

export default CompanyList;