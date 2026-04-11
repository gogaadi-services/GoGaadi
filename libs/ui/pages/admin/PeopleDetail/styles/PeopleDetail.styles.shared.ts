import { Theme } from '@mui/material/styles';
import { CSSObject } from 'tss-react';

export const getBaseStyles = (theme: Theme): Record<string, CSSObject> => ({
  container: {
    padding: theme.spacing(3),
    background: 'linear-gradient(160deg, #f0f4ff 0%, #fafbff 50%, #f0f4ff 100%)',
    minHeight: '100vh',
    [theme.breakpoints.down('sm')]: { padding: theme.spacing(1.5) },
  },

  backBtn: {
    marginBottom: theme.spacing(2),
    color: '#1d4ed8',
    fontWeight: 600,
    fontSize: '0.85rem',
    textTransform: 'none',
    '&:hover': { background: 'rgba(29,78,216,0.06)' },
  },

  card: {
    background: '#fff',
    borderRadius: 18,
    boxShadow: '0 4px 24px rgba(0,0,0,0.07)',
    border: '1px solid rgba(0,0,0,0.06)',
    overflow: 'hidden',
    marginBottom: theme.spacing(2.5),
  },

  cardHeader: {
    background: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 35%, #1d4ed8 70%, #0ea5e9 100%)',
    backgroundSize: '300% 300%',
    padding: theme.spacing(3, 4),
    position: 'relative',
    overflow: 'hidden',
    '&::before': {
      content: '""',
      position: 'absolute',
      top: -80,
      right: -80,
      width: 260,
      height: 260,
      borderRadius: '50%',
      background: 'radial-gradient(circle at center, rgba(96,165,250,0.32) 0%, transparent 70%)',
      pointerEvents: 'none',
    },
    [theme.breakpoints.down('sm')]: { padding: theme.spacing(2.5, 2) },
  },

  avatarWrap: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(2),
    position: 'relative',
    zIndex: 1,
  },

  avatar: {
    width: 64,
    height: 64,
    borderRadius: '50%',
    background: 'rgba(255,255,255,0.15)',
    border: '2px solid rgba(255,255,255,0.3)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },

  personName: {
    fontWeight: 800,
    color: '#fff',
    fontSize: '1.5rem',
    letterSpacing: '-0.02em',
    lineHeight: 1.2,
    textShadow: '0 2px 12px rgba(0,0,0,0.2)',
    [theme.breakpoints.down('sm')]: { fontSize: '1.2rem' },
  },

  personMeta: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: '0.85rem',
    marginTop: theme.spacing(0.3),
  },

  statusChipWrap: {
    marginTop: theme.spacing(1.5),
    position: 'relative',
    zIndex: 1,
  },

  cardBody: {
    padding: theme.spacing(3, 4),
    [theme.breakpoints.down('sm')]: { padding: theme.spacing(2) },
  },

  sectionTitle: {
    fontWeight: 700,
    fontSize: '0.82rem',
    color: '#64748b',
    letterSpacing: '0.08em',
    textTransform: 'uppercase' as const,
    marginBottom: theme.spacing(1.5),
    marginTop: theme.spacing(0.5),
  },

  fieldGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: theme.spacing(1.5),
    marginBottom: theme.spacing(2.5),
    [theme.breakpoints.down('sm')]: { gridTemplateColumns: '1fr', gap: theme.spacing(1) },
  },

  fieldBox: {
    background: 'rgba(248,250,252,0.9)',
    border: '1px solid rgba(0,0,0,0.06)',
    borderRadius: 10,
    padding: theme.spacing(1.25, 1.75),
  },

  fieldLabel: {
    fontSize: '0.68rem',
    fontWeight: 700,
    color: '#94a3b8',
    letterSpacing: '0.07em',
    textTransform: 'uppercase' as const,
    marginBottom: theme.spacing(0.3),
  },

  fieldValue: {
    fontSize: '0.88rem',
    fontWeight: 600,
    color: '#1e293b',
  },

  divider: {
    borderColor: 'rgba(0,0,0,0.06)',
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(0.5),
  },

  actionBar: {
    display: 'flex',
    gap: theme.spacing(1.5),
    flexWrap: 'wrap' as const,
    padding: theme.spacing(2, 4),
    borderTop: '1px solid rgba(0,0,0,0.06)',
    background: 'rgba(248,250,252,0.9)',
    [theme.breakpoints.down('sm')]: { padding: theme.spacing(1.5, 2) },
  },

  notesBox: {
    background: 'rgba(248,250,252,0.9)',
    border: '1px solid rgba(0,0,0,0.06)',
    borderRadius: 10,
    padding: theme.spacing(1.5),
    marginTop: theme.spacing(1),
  },
});
