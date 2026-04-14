import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    padding: theme.spacing(2),

    '& .MuiPaginationItem-root': {
      borderRadius: 8,
    },
  },
}));