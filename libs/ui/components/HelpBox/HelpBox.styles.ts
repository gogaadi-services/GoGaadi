import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()((theme) => ({
  root: {
    borderRadius: 8,
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
    display: 'flex',
    alignItems: 'flex-start',
    gap: theme.spacing(2),
    border: '1px solid',
  },
  info: {
    backgroundColor: theme.palette.info.light,
    borderColor: theme.palette.info.main,
    color: theme.palette.info.dark,
  },
  warning: {
    backgroundColor: theme.palette.warning.light,
    borderColor: theme.palette.warning.main,
    color: theme.palette.warning.dark,
  },
  error: {
    backgroundColor: theme.palette.error.light,
    borderColor: theme.palette.error.main,
    color: theme.palette.error.dark,
  },
  success: {
    backgroundColor: theme.palette.success.light,
    borderColor: theme.palette.success.main,
    color: theme.palette.success.dark,
  },
  content: {
    flex: 1,
  },
  title: {
    fontWeight: 600,
    fontSize: '1rem',
    marginBottom: theme.spacing(0.5),
  },
  message: {
    fontSize: '0.875rem',
    lineHeight: 1.5,
  },
  closeButton: {
    cursor: 'pointer',
    border: 'none',
    background: 'none',
    fontSize: '1.25rem',
    padding: 0,
    color: 'inherit',
  },
  outlined: {
    backgroundColor: 'transparent',
  },
  filled: {
    color: theme.palette.common.white,
  },
  small: {
    padding: theme.spacing(1),
    fontSize: '0.875rem',
  },
  medium: {
    padding: theme.spacing(2),
    fontSize: '1rem',
  },
  large: {
    padding: theme.spacing(3),
    fontSize: '1.125rem',
  },
}));