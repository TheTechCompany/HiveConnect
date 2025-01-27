//A @mui/material Dialog for creating a new customer

import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material"
import { useEffect, useState } from "react"

export const ContactModal = (props: any) => {
    
    const [ contact, setContact ] = useState<any>({});

    useEffect(() => {
        setContact({...props.selected})
    }, [props.selected])

    const submit = () => {
        props.onSubmit?.(contact)
    }

    return (
        <Dialog maxWidth="md" fullWidth open={props.open} onClose={props.onClose}>
            <DialogTitle>{contact?.id ? "Update" : "Create"} Customer</DialogTitle>
            <DialogContent>
                <Box sx={{display: 'flex', paddingTop: '12px', flexDirection: 'column', gap: '12px'}}>
                    <TextField 
                        value={contact?.name || ''}
                        onChange={(e) => setContact({...contact, name: e.target.value})}
                        size="small" 
                        label="Name" />
                    <TextField 
                        value={contact?.email || ''}
                        onChange={(e) => setContact({...contact, email: e.target.value})}
                        size="small" 
                        label="E-mail" />

                    <TextField 
                        value={contact?.address || ''}
                        onChange={(e) => setContact({...contact, address: e.target.value})}
                        size="small" 
                        label="Address" />
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.onClose}>
                    Cancel
                </Button>
                <Button variant="contained" onClick={submit}>
                    {contact?.id ? "Save": "Create"}
                </Button>
            </DialogActions>
        </Dialog>
    )
}