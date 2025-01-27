//A @mui/material Dialog for creating a new customer

import { Autocomplete, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material"
import { useEffect, useState } from "react"

export const RequestModal = (props: any) => {

    const [request, setRequest] = useState<any>({});

    useEffect(() => {
        setRequest({ ...props.selected })
    }, [props.selected])

    const submit = () => {
        props.onSubmit?.(request)
    }

    return (
        <Dialog maxWidth="md" fullWidth open={props.open} onClose={props.onClose}>
            <DialogTitle>{request?.id ? "Update" : "Create"} Request</DialogTitle>
            <DialogContent>
                <Box sx={{ display: 'flex', paddingTop: '12px', flexDirection: 'column', gap: '12px' }}>
                    <Autocomplete
                        value={request.contact}
                        onChange={(e, newValue) => setRequest({ ...request, contact: newValue })}
                        options={props.contacts || []}
                        getOptionLabel={(option: any) => typeof (option) == 'string' ? option : option.name}
                        renderInput={(params) => <TextField {...params} size="small" label="Contact" />} />

                   
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.onClose}>
                    Cancel
                </Button>
                <Button variant="contained" onClick={submit}>
                    {request?.id ? "Save" : "Create"}
                </Button>
            </DialogActions>
        </Dialog>
    )
}