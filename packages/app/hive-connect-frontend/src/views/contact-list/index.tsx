import { Box, Divider, IconButton, List, ListItem, ListItemButton, Paper, Typography } from "@mui/material";
import React, { useState } from "react";
import { Add } from '@mui/icons-material';
import { ContactModal } from "./modal";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";

export const ContactList = () => {

    const navigate = useNavigate();
    
    const [ modalOpen, openModal ] = useState(false);
    const [ selected, setSelected ] = useState<any>(null);

    const { data } = useQuery(gql`
        query GetContacts {
            contacts {
                id
                name
            }
        }    
    `)

    const [ createContact ] = useMutation(gql`
        mutation CreateContact($input: ContactInput){
            createContact(input: $input){
                id
                name
            }
        }    
    `, {
        refetchQueries: ['GetContacts']
    })

    const [ updateContact ] = useMutation(gql`
        mutation UpdateContact($id: ID, $input: ContactInput){
            updateContact(id: $id, input: $input){
                id
                name
            }
        }    
    `, {
        refetchQueries: ['GetContacts']
    })
    const contacts = data?.contacts || [];

    return (
            <Paper sx={{flex: 1}}>
                <ContactModal
                    open={modalOpen}
                    selected={selected}
                    onClose={() => {
                        openModal(false);
                        setSelected(null);
                    }}
                    onSubmit={(customer: any) => {
                        openModal(false);
                        if(customer.id){
                            updateContact({
                                variables: {
                                    id: customer.id,
                                    input: {
                                        name: customer.name, 
                                        email: customer.email, 
                                        address: customer.address 
                                    }
                                }
                            }).then(() => {
                                openModal(false);
                                setSelected(null);
                            })
                        }else{
                            createContact({variables: {input: { name: customer.name, email: customer.email, address: customer.address }}}).then(() => {
                                openModal(false);
                                setSelected(null);
                            })
                        }
                    }}
                    />
                <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px'}}>
                    <Typography>Contacts</Typography>
                    <IconButton onClick={() => openModal(true)} size="small">
                        <Add fontSize="inherit" />
                    </IconButton>
                </Box>
                <Divider />
                <List>
                    {contacts?.map((contact: any) => (
                        <ListItem disablePadding>
                            <ListItemButton onClick={() => {
                                // setSelected(contact)
                                // openModal(true)
                                navigate(contact.id)
                            }}>
                            {contact?.name}
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Paper>
    )
}