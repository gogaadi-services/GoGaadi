import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()((theme) => ({
  root: {
    width: '100%',
  },

  content: {
    padding: theme.spacing(3, 0),
    minHeight: 300,
  },

  actions: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: theme.spacing(2, 0),
    borderTop: `1px solid ${theme.palette.divider}`,
  },

  buttonGroup: {
    display: 'flex',
    gap: theme.spacing(1),
  },
}));