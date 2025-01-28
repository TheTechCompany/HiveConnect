import { gql, useQuery } from "@apollo/client"
import { Box, Divider, List, ListItem, ListItemButton, Paper, Typography } from "@mui/material"
import moment from "moment";
import { useNavigate, useParams } from "react-router-dom"

export const ContactView = () => {

    const navigate = useNavigate();

    const { id } = useParams()

    const { data } = useQuery(gql`
        query GetContact ($id: ID){
            contacts(ids: [$id]){
                id
                name
                email
                address

                firstContact

                orders {
                    id
                    humanId
                    createdOn
                }

                requests {
                    id
                    humanId
                    createdOn
                }
            }
        }
    `, {
        variables: {
            id
        }
    })

    const contact = data?.contacts?.[0] || {};

    return (
        <Paper sx={{flex: 1, padding: '8px'}}>
            <Typography>{contact?.name}</Typography>

            <Typography>{contact?.email}</Typography>

            <Typography>{contact?.address}</Typography>

            <Typography>First contact: {moment(contact?.firstContact).format('DD/MM/YYYY - hh:mma')}</Typography>

            <Box sx={{display: 'flex', marginTop: '12px'}}>
                <Box sx={{flex: 1}}>
                    <Typography>Requests</Typography>
                    <Divider />
                    <List>
                        {contact?.requests?.map((request: any) => (
                            <ListItem disablePadding>
                                <ListItemButton onClick={() => navigate(`/requests/${request.id}`)}>
                                {request?.humanId} - {moment(request?.createdOn).format('DD/MM/YYYY - hh:mma')}
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </Box>
                <Box sx={{flex: 1}}>
                    <Typography>Orders</Typography>
                    <Divider />

                    <List>
                        {contact?.orders?.map((order: any) => (
                            <ListItem disablePadding>
                                <ListItemButton onClick={() => navigate(`/orders/${order.id}`)}>
                                {order?.humanId} - {moment(order?.createdOn).format('DD/MM/YYYY - hh:mma')}
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Box>
        </Paper>
    )
}