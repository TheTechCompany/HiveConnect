import { Box, Paper, Typography } from "@mui/material"

export const HomeView = () => {
    return (
        <Box sx={{
            flex: 1,
            display: 'flex',
            gap: '12px'
        }}>
            <Paper sx={{height: '200px', width: '300px', padding: '12px'}}>
                <Typography>Orders</Typography>
            </Paper>

            <Paper sx={{height: '200px', width: '300px', padding: '12px'}}>
                <Typography>Order Requests</Typography>
            </Paper>

            <Paper sx={{height: '200px', width: '300px',  padding: '12px'}}>
                <Typography>New Contacts</Typography>
            </Paper>
        </Box>
    )
}