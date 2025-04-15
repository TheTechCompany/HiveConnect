import { Autocomplete, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography } from "@mui/material"
import { useEffect, useState } from "react"

export const Modal = (props: any) => {

    const [ form, setForm ] = useState<any>({});

    useEffect(() => {
        setForm({...props.selected})
    }, [props.selected])

    const submit = () => {
        props.onSubmit?.(form)
    }

    return (
        <Dialog 
            fullWidth
            open={props.open} onClose={props.onClose}>
            <DialogTitle>{props.selected?.id ? "Update" : "Create"} Notification Pathway</DialogTitle>
            <DialogContent>
                <Box sx={{paddingTop: '8px', gap: '8px', display: 'flex', flexDirection: 'column'}}>
                    <Typography>Notify user</Typography>
                    <Autocomplete 
                        value={form.user || ''}
                        onChange={(e, value) => setForm({...form, user: value})}
                        options={props.users || []}
                        getOptionLabel={(option: any) => typeof(option) == 'string' ? option : option.name}
                        renderInput={(params) => <TextField {...params} size="small" />} />
                    
                    <Typography>Notify on</Typography>
                    <Autocomplete
                        multiple
                        value={form.notifyOn || []}
                        onChange={(e, value) => setForm({...form, notifyOn: value})}
                        options={["Order", "Request", "Contact", "Company"]}
                        getOptionLabel={(option: any) => typeof(option) == 'string' ? option : option.name} 
                        renderInput={(params) => <TextField {...params} size="small" />}/>
                </Box>
            </DialogContent>
            <DialogActions sx={{display: 'flex', alignItems: 'center', justifyContent: props.selected?.id ? 'space-between' : 'flex-end' }}>
                {props.selected?.id && <Button variant="contained" color="error" onClick={props.onDelete}>Delete</Button>}
                <Box sx={{display: 'flex'}}>
                    <Button onClick={props.onClose}>Close</Button>
                    <Button onClick={submit} variant="contained">Save</Button>
                </Box>
            </DialogActions>
        </Dialog>
    )
}