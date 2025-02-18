import { Add } from "@mui/icons-material";
import { Box, Divider, IconButton, Paper, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import React, { useState } from "react";
import { RequestModal } from "./modal";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import moment from 'moment';

export const RequestList = () => {

    const navigate = useNavigate();

    const [ modalOpen, openModal ] = useState(false);

    const { data } = useQuery(gql`
            query GetRequests {
                requests {
                    id

                    humanId

                    source

                    createdOn

                    contact {
                        name
                        email
                    }
                }

                contacts {
                    id
                    name
                }
            }    
        `)

    const [createRequest] = useMutation(gql`
            mutation CreateRequest($input: RequestInput){
                createRequest(input: $input){
                    id
                }
            }    
        `, {
        refetchQueries: ['GetRequests']
    })

    const [updateRequest] = useMutation(gql`
            mutation UpdateRequest($id: ID, $input: RequestInput){
                updateRequest(id: $id, input: $input){
                    id
                }
            }    
        `, {
        refetchQueries: ['GetRequests']
    })

    const requests = data?.requests || [];
    const contacts = data?.contacts || [];

    return (
        <Paper sx={{flex: 1}}>
            <RequestModal
                open={modalOpen}
                contacts={contacts}
                onClose={() => openModal(false)}
                onSubmit={(request: any) => {
                    if(request.id){
                        updateRequest({
                            variables: {
                                id: request?.id,
                                input: {
                                    contact: { id: request?.contact?.id }
                                }
                            }
                        })
                    }else{
                        createRequest({
                            variables: {
                                input: {
                                    source: 'Manual',
                                    contact: {id: request?.contact?.id}
                                }
                            }
                        }).then(() => {
                            openModal(false)
                        })
                    }
                }}
                />
            <Box sx={{display: 'flex', padding: '8px', alignItems: 'center', justifyContent: 'space-between'}}>
                <Typography>Requests</Typography>
                <IconButton onClick={() => openModal(true)}>
                    <Add />
                </IconButton>
            </Box>
            <Divider />
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            ID
                        </TableCell>
                        <TableCell>
                            Contact
                        </TableCell>
                        <TableCell>
                            Source
                        </TableCell>
                        <TableCell>
                            Created On
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {requests?.map((request: any) => (
                        <TableRow onClick={() => navigate(request.id)}>
                            <TableCell>{request?.humanId}</TableCell>
                            <TableCell>{request?.contact?.name}</TableCell>
                            <TableCell>{request?.source}</TableCell>
                            <TableCell>{moment(request?.createdOn).format('DD/MM/YYYY - hh:mma')}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Paper>
    )
}