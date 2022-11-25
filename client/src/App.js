import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import Shortner from './components/Shortner';
import ShortnerListTable from './components/ShortnerListTable';
import LinkContext from './context/link-context';

export default function App() {
  const [ lastUpdate, setLastUpdate ] = React.useState(new Date());
  const updateDateTimeUpdate = () => setLastUpdate(new Date());
  const contextValue = {lastUpdate, updateDateTimeUpdate};
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar component="nav">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            Shortner Service
          </Typography>
        </Toolbar>
      </AppBar>
      <Box component="main" sx={{ p: 3, flexGrow: 1 }}>
        <LinkContext.Provider value={contextValue}>
          <Toolbar />
          <Shortner />
          <Toolbar />
          <ShortnerListTable />
        </LinkContext.Provider>
      </Box>
    </Box>
  );
}