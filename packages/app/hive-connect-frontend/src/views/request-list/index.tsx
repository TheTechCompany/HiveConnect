import { Add } from "@mui/icons-material";
import { Box, Divider, IconButton, Paper, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import React, { useState } from "react";
import { RequestModal } from "./modal";
import { gql, useMutation, useQuery } from "@apollo/client";

export const RequestList = () => {

    const [ modalOpen, openModal ] = useState(false);

    const { data } = useQuery(gql`
            query GetRequests {
                requests {
                    id

                    humanId

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

                    }else{
                        createRequest({
                            variables: {
                                input: {
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
                    </TableRow>
                </TableHead>
                <TableBody>
                    {requests?.map((request: any) => (
                        <TableRow>
                            <TableCell>{request?.humanId}</TableCell>
                            <TableCell>{request?.contact?.name}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Paper>
    )
}