import { Theme } from '@mui/material/styles';
import { getBaseStyles } from './FastTag.styles.shared';
import { createAppStyles } from '@gogaadi/theme';

export const useStyles = createAppStyles((theme: Theme) => getBaseStyles(theme), {});
