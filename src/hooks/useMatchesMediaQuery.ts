import { Breakpoint, useMediaQuery } from '@mui/material';
import theme from '@src/styles/theme';

export type MatchQueryType = 'up' | 'down' | 'between';

const useMatchesMediaQuery = (
    query: MatchQueryType,
    option: Breakpoint | number,
    additionalOption?: Breakpoint | number
): boolean => useMediaQuery(theme.breakpoints[query](option, additionalOption ?? 0));

export default useMatchesMediaQuery;
