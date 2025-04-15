import { List, ListItem, ListItemButton, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { SidebarItem } from './item';

export const Sidebar = () => {
  
    const menu = [
    {
        label: 'Home',
        path: ''
    },
    {
        label: "Contacts",
        path: 'contacts'
     },
     {
        label: "Requests", 
        path: 'requests'
     },
     {
        label: "Orders",
        path: 'orders'
    },
    {
        label: "Notifications",
        path: 'notifications'
    }];

    const navigate = useNavigate();

    return (
        <Paper sx={{bgcolor: 'primary.main', color: 'white', flex: 1}}>
            <List>
            {menu.map((menu_item) => (
                <SidebarItem {...menu_item} />
            ))}
            </List>
        </Paper>
    )
}