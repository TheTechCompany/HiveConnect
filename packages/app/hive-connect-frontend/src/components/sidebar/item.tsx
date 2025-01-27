import { ListItem, ListItemButton } from "@mui/material"
import { useMatch, useNavigate, useResolvedPath } from "react-router-dom"

export const SidebarItem = (props: any) => {
    const navigate = useNavigate();

    const {pathname} = useResolvedPath(props.path);
    const match = useMatch(pathname)
    return (
        <ListItem sx={{
            background: match ? '#dfdfdf20' : undefined
        }} disablePadding>
            <ListItemButton onClick={() => navigate(props.path)}>
            {props.label}
            </ListItemButton>
        </ListItem>
    )
}