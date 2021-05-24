import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Skeleton } from 'primereact/skeleton';
import '../styles/Skeleton.css';
import { Message } from 'primereact/message';

const CompanyTable = ({selectedCompany, onSelectedCompanyChange, companys, isLoading, isError}) => {
    let companysSkeleton = new Array(10);


    const bodyTemplate = () => {
        return <Skeleton></Skeleton>
    }
    return (
        <div className='p-p-2'>
            {isError && <Message severity="error" text="Falied to fetch company data!" />}
            {!isLoading && !isError &&
                <DataTable value={companys} className='p-datatable-striped' scrollable scrollHeight="75vh"
                selectionMode="single" selection={selectedCompany} onSelectionChange={e => {onSelectedCompanyChange(e.value);}} dataKey="_id">
                    <Column field="name" header="Name" sortable></Column>
                    <Column field="cui" header="Cui"></Column>
                </DataTable>
            }
            { isLoading && !isError &&
                <DataTable value={companysSkeleton} className='p-datatable-striped' scrollable scrollHeight="75vh">
                    <Column field="name" header="Name" body={bodyTemplate}></Column>
                    <Column field="cui" header="Cui" body={bodyTemplate}></Column>
                </DataTable>
            }
        </div>
    );
}

export default CompanyTable;