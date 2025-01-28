import { gql, useQuery } from "@apollo/client"
import { Box, Divider, Paper, Typography } from "@mui/material"
import { useParams } from "react-router-dom"

export const RequestView = () => {
    const { id } = useParams();

    const { data } = useQuery(gql`
        query GetRequest ($id: ID){
            requests(ids: [$id]){
                id

                data

                contact { 
                    name
                    email
                }
            }
        }
    `, {
        variables: {
            id
        }
    })

    const request = data?.requests?.[0] || {};

    const renderKey = (key: string) => {
        return <Typography>{key} : {request?.data?.[key]}</Typography>
    }

    return (
        <Paper sx={{flex: 1}}>
            <Box sx={{padding: '8px'}}>
                <Typography>Order Request</Typography>
            </Box>
            <Divider />
            <Box sx={{
                display: 'flex', 
                flexDirection: 'column', 
                padding: '8px', 
                gap: '12px'
            }}>
                <Paper sx={{padding: '8px', gap: '12px'}}>
                    <Typography>{request?.contact?.name}</Typography>
                    <Typography>{request?.contact?.email}</Typography>
                </Paper>
                <Paper sx={{display: 'flex', padding: '8px', gap: '12px', flexDirection: 'column'}}>
                    {Object.keys(request?.data || {}).map(renderKey)}
                </Paper>
            </Box>
        </Paper>
    )
}