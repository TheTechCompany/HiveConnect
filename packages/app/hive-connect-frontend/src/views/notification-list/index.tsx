import { gql, useMutation, useQuery } from "@apollo/client"
import { Add, MoreVert } from "@mui/icons-material"
import { Box, Chip, Divider, IconButton, List, ListItem, Paper, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material"
import { Modal } from "./modal"
import { useState } from "react"

export const NotificationList = () => {

    const [ selected, setSelected ] = useState<any>(null);

    const [ modalOpen, openModal ] = useState(false);

    const { data } = useQuery(gql`
        query GetPathways {
            notificationPathways {
                id
                user {
                    id
                    name
                    email
                }
                notifyOn
                createdOn
            }

            users {
                id
                name
                email
            }
        }    
    `)

    const [ createPathway ] = useMutation(gql`
        mutation CreatePathway ($user: String, $email: String, $notifyOn: [String]) {
            createNotificationPathway(user: $user, email: $email, notifyOn: $notifyOn){
                id
            }
        }    
    `, {
        refetchQueries: ['GetPathways']
    })


    const [ updatePathway ] = useMutation(gql`
        mutation UpdatePathway ($user: String, $email: String, $notifyOn: [String]) {
            updateNotificationPathway(user: $user, email: $email, notifyOn: $notifyOn){
                id
            }
        }    
    `, {
        refetchQueries: ['GetPathways']
    })


    const [ deletePathway ] = useMutation(gql`
        mutation CreatePathway ($user: String) {
            createNotificationPathway(user: $user){
                id
            }
        }    
    `, {
        refetchQueries: ['GetPathways']
    })

    const notifications = data?.notificationPathways || [];

    return (
        <Paper sx={{flex: 1, padding: '8px'}}>
            <Modal
                selected={selected}
                open={modalOpen}
                users={data?.users}
                onDelete={() => {
                    deletePathway({
                        variables: {user: selected?.user?.id}
                    }).then(() => {
                        setSelected(null);
                        openModal(false)
                    })
                }}
                onSubmit={(form: any) => {
                    let promise : any;
                    if(form.id){
                        promise = updatePathway({
                            variables: {
                                user: form.user?.id,
                                email: form.user?.email,
                                notifyOn: form.notifyOn
                            }
                        })
                    }else{
                        promise = createPathway({
                            variables: {
                                user: form.user?.id,
                                email: form.user?.email,
                                notifyOn: form.notifyOn
                            }
                        })
                    }
                    promise.then(() => {
                        setSelected(null);
                        openModal(false);
                    })
                }}
                onClose={() => {
                    setSelected(null);
                    openModal(false)
                }} />
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <Typography>Notifications</Typography>
                <IconButton onClick={() => openModal(true)}><Add /></IconButton>
            </Box>
            <Divider />
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>User</TableCell>
                        <TableCell size="small">Notify on</TableCell>
                        <TableCell sx={{width: '50px'}}></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                {notifications?.map((notification: any) => (
                    <TableRow>
                        <TableCell>
                        {notification.user?.name}
                        </TableCell>
                        <TableCell size="small">
                        {notification.notifyOn?.map((x: any) => <Chip label={x} />)}
                        </TableCell>
                        <TableCell sx={{width: '50px'}}>
                            <IconButton onClick={() => {
                                setSelected(notification)
                                openModal(true);
                            }}><MoreVert /></IconButton>
                        </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
            <List>
             
            </List>
        </Paper>
    )
}