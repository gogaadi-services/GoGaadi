import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    borderRadius: 8,
  },

  listItem: {
    borderRadius: 4,

    '&:hover': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}));