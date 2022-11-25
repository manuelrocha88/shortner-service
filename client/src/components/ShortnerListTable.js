import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import { API_PATH, getBaseUrl, getData } from '../api/utils';
import LinkContext from '../context/link-context';
import LaunchIcon from '@mui/icons-material/Launch';
const redirectTo = (url) => {
  window.open(url, '_blank', 'noopener,noreferrer');
}

const columns = [
  { field: 'id', headerName: 'ID', hide: true },
  {
    field: 'redirectToUrl',
    headerName: 'Long Url',
    flex: 1,
  },
  {
    field: 'shortId',
    headerName: 'Short Url',
    flex: 1,
    valueGetter: (params) => `${getBaseUrl()}/${params.row.shortId}`
  },
  {
    field: 'clickCount',
    type: 'number',
    headerName: 'Nr. of Clicks',
  },
  {
    field: 'actions',
    type: 'actions',
    headerName: 'Actions',
    width: 100,
    cellClassName: 'actions',
    getActions: ({ id, row }) => {
      return [
        <GridActionsCellItem
          icon={<LaunchIcon />}
          label="Redirect"
          className="textPrimary"
          onClick={() => redirectTo(`${getBaseUrl()}/${row.shortId}`)}
          color="inherit"
        />,
      ];
    },
  },
];

export default function ShortnerListTable() {
  const { lastUpdate } = React.useContext(LinkContext);
    const [ rows, setRows ] = React.useState([]);

    React.useEffect(() => {
      getData(API_PATH.LIST).then((r) => setRows(r));
    }, [lastUpdate]);

    return (
        <Box sx={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                disableSelectionOnClick
                experimentalFeatures={{ newEditingApi: true }}
            />
        </Box>
    );
}