import { gql, useMutation, useQuery } from "@apollo/client";
import { Add } from "@mui/icons-material";
import { Box, Divider, IconButton, List, ListItem, Paper, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import React, { useState } from "react";
import { OrderModal } from "./modal";
import moment from "moment";

export const OrderList = () => {

    const [ modalOpen, openModal ] = useState(false);

    const { data } = useQuery(gql`
            query GetOrders {
                orders {
                    id

                    humanId

                    status

                    contact {
                        name
                    }
                }

                contacts {
                    id
                    name
                }
            }    
        `)

    const [createOrder] = useMutation(gql`
            mutation CreateOrder($input: OrderInput){
                createOrder(input: $input){
                    id
                }
            }    
        `, {
        refetchQueries: ['GetOrders']
    })

    const [updateOrder] = useMutation(gql`
            mutation UpdateOrder($id: ID, $input: OrderInput){
                updateOrder(id: $id, input: $input){
                    id
                }
            }    
        `, {
        refetchQueries: ['GetOrders']
    })

    const contacts = data?.contacts || [];
    const orders = data?.orders || [];

    return (
        <Paper sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <OrderModal
                open={modalOpen}
                contacts={contacts}
                onSubmit={(order: any) => {
                    createOrder({
                        variables: {
                            input: {
                                contact: {id: order.contact?.id},
                                status: order.status,
                            }
                        }
                    })
                }}
                onClose={() => openModal(false)} />

            <Box sx={{ display: 'flex', padding: '8px', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography>Orders</Typography>
                <IconButton onClick={() => openModal(true)}>
                    <Add />
                </IconButton>
            </Box>
            <Divider />
            <Box sx={{flex: 1, overflow: 'scroll'}}>
            <Table stickyHeader>
                <TableHead sx={{
                    background: 'secondary.main'
                }}>
                    <TableRow>
                        <TableCell>
                            ID
                        </TableCell>
                        <TableCell>
                            Status
                        </TableCell>
                        <TableCell>
                            Contact
                        </TableCell>
                        <TableCell>
                            Address
                        </TableCell>
                        <TableCell>
                            Created On
                        </TableCell>
                        <TableCell>
                            Source
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                {orders?.map((order: any) => (
                    <TableRow>
                        <TableCell>
                            {order.humanId}
                        </TableCell>
                        <TableCell>
                            {order.status}
                        </TableCell>
                        <TableCell>
                            {order?.contact?.name}
                        </TableCell>
                        <TableCell>
                            {order?.contact?.address}
                        </TableCell>
                        <TableCell>
                            {moment(order?.createdOn).format('DD/MM/YYYY - hh:mma')}
                        </TableCell>
                        <TableCell>
                            {order?.source}
                        </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            
            </Table>
            </Box>
        </Paper>
    )
}