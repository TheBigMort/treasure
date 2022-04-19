/* eslint-disable import/prefer-default-export */
import Typography from '@mui/material/Typography';
import { useEtherBalance, useEthers } from '@usedapp/core';
import { utils } from 'ethers';

/**
 * Component to display account's balance
 */
// eslint-disable-next-line no-undef
function Balance(): JSX.Element {
    const { account } = useEthers();
    const etherBalance = useEtherBalance(account);
    const finalBalance = etherBalance ? utils.formatEther(etherBalance) : '';

    return <Typography>{finalBalance} ETH</Typography>;
}
export { Balance };
