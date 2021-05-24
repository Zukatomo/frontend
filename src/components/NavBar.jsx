import { Menubar } from 'primereact/menubar';
import { useHistory } from 'react-router-dom'

const Navbar = () => {

    let history = useHistory();

    const items = [
        {label: 'Home', icon: 'pi pi-fw pi-home',
        command:()=>{
            history.push('/');
        }},
        {label: 'Companies', icon: 'pi pi-fw pi-calendar',
        command:()=>{
            history.push('/Company');
        }},
        {label: 'Edit', icon: 'pi pi-fw pi-pencil',
        command:()=>{
            history.push('/Document');
        }},
        {label: 'Documentation', icon: 'pi pi-fw pi-file'},
        {label: 'Settings', icon: 'pi pi-fw pi-cog'}
    ];

    return ( 
        <div>
            <Menubar model={items} />
        </div>
     );
}
 
export default Navbar;