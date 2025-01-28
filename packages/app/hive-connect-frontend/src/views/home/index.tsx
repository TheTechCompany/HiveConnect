import { gql, useQuery } from "@apollo/client"
import { Box, Paper, Typography } from "@mui/material"
import moment from "moment"
import { useMemo } from "react"

export const HomeView = () => {
    
    const start = useMemo(() =>  moment().subtract(1, 'week').toDate(), [])
    const start_2 = useMemo(() =>  moment().subtract(28, 'days').toDate(), [])
    const end = useMemo(() =>  moment().toDate(), [])

    const { data } = useQuery(gql`
        query Data ($start: DateTime, $start2: DateTime, $end: DateTime) {
            orders(start: $start, end: $end){
                id
            }

            monthOrders:orders(start: $start2, end: $end){
                id
            }
            
            requests(start: $start, end: $end){
                id
            }

            monthRequests:requests(start: $start2, end: $end){
                id
            }
            
            contacts(start: $start, end: $end){
                id
            }


            monthContacts:contacts(start: $start2, end: $end){
                id
            }
            
        }   
    `, {
        variables: {
            start,
            end
        }
    })

    const newOrders = (data?.orders || [])?.length;
    const newContacts = (data?.contacts || [])?.length;
    const newRequests = (data?.requests || [])?.length;


    const monthOrders = (data?.monthOrders || [])?.length;
    const monthContacts = (data?.monthContacts || [])?.length;
    const monthRequests = (data?.monthRequests || [])?.length;

    return (
        <Box sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            padding: '12px'
        }}>
            <Typography>Last 7 days</Typography>
            <Box sx={{display: 'flex', gap: '12px', alignItems: 'center'}}>
                <Paper sx={{height: '150px', width: '300px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '12px'}}>
                    <Typography fontSize={20}>Orders</Typography>
                    <Typography fontSize={25}>{newOrders}</Typography>
                </Paper>

                <Paper sx={{height: '150px', width: '300px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '12px'}}>
                    <Typography fontSize={20}>Order Requests</Typography>
                    <Typography fontSize={25}>{newRequests}</Typography>
                </Paper>

                <Paper sx={{height: '150px', width: '300px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',  padding: '12px'}}>
                    <Typography fontSize={20}>New Contacts</Typography>
                    <Typography fontSize={25}>{newContacts}</Typography>
                </Paper>
            </Box>
            <Typography>Last 28 days</Typography>
            <Box sx={{display: 'flex',gap: '12px', alignItems: 'center'}}>
                <Paper sx={{height: '150px', width: '300px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '12px'}}>
                    <Typography fontSize={20}>Orders</Typography>
                    <Typography fontSize={25}>{monthOrders}</Typography>
                </Paper>

                <Paper sx={{height: '150px', width: '300px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '12px'}}>
                    <Typography fontSize={20}>Order Requests</Typography>
                    <Typography fontSize={25}>{monthRequests}</Typography>
                </Paper>

                <Paper sx={{height: '150px', width: '300px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',  padding: '12px'}}>
                    <Typography fontSize={20}>New Contacts</Typography>
                    <Typography fontSize={25}>{monthContacts}</Typography>
                </Paper>
            </Box>
        </Box>
    )
}