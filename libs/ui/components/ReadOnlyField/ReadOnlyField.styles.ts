import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()((theme) => ({
  root: {
    marginBottom: theme.spacing(2),

    '& .MuiInputBase-input': {
      cursor: 'default',
    },
  },
  copyButton: {
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}));