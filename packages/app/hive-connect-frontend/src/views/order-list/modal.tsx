//A @mui/material Dialog for creating a new customer

import { Autocomplete, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material"
import { useEffect, useState } from "react"

export const OrderModal = (props: any) => {
    
    const [ order, setOrder ] = useState<any>({source: 'Manual'});

    useEffect(() => {
        setOrder({source: 'Manual', ...props.selected})
    }, [props.selected])

    const submit = () => {
        props.onSubmit?.(order)
    }

    return (
        <Dialog maxWidth="md" fullWidth open={props.open} onClose={props.onClose}>
            <DialogTitle>{order?.id ? "Update" : "Create"} Order</DialogTitle>
            <DialogContent>
                <Box sx={{display: 'flex', paddingTop: '12px', flexDirection: 'column', gap: '12px'}}>
                    <Autocomplete 
                        value={order.contact}
                        onChange={(e, newValue) => setOrder({...order, contact: newValue})}
                        options={props.contacts || []}
                        getOptionLabel={(option: any) => typeof(option) == 'string' ? option : option.name}
                        renderInput={(params) => <TextField {...params} size="small" label="Contact" />} />
                    
                    <TextField 
                        size="small"
                        label="Source"
                        onChange={(e) => setOrder({...order, source: e.target.value})}
                        value={order.source || ''} />

                    <Autocomplete
                        freeSolo
                        options={props.statuses || []}
                        value={order.status || ''}
                        onChange={(e, newValue) => {
                            setOrder({...order, status: newValue})
                        }}
                        renderInput={(params) => 
                            <TextField {...params} size="small" label="Status" onChange={(e) => setOrder({...order, status: e.target.value})} />
                        }
                        />

                    <Autocomplete
                        options={[]}
                        value={order.request}
                        onChange={(e, newValue) => {
                            setOrder({...order, request: newValue})
                        }}
                        renderInput={(params) => <TextField {...params} size="small" label="Request" />} />


                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.onClose}>
                    Cancel
                </Button>
                <Button variant="contained" onClick={submit}>
                    {order?.id ? "Save": "Create"}
                </Button>
            </DialogActions>
        </Dialog>
    )
}