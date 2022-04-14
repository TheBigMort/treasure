import Progress from "@components/Progress";
import Title from "@components/Title";
import { JsonRpcSigner } from "@ethersproject/providers";
import LoadingButton from "@mui/lab/LoadingButton";
import { Alert, IconButton, Stack, TextField, Typography } from "@mui/material";
import useMatchesMediaQuery from "@src/hooks/useMatchesMediaQuery";
import { snackbarAtom } from "@src/store/jotai";
import track from "@src/utils/track";
import { useContractCall, useEthers } from "@usedapp/core";
import { ethers } from "ethers";
import { useAtom } from "jotai";
import { FC, useCallback, useState } from "react";
import { RiArrowLeftSFill, RiArrowRightSFill } from "react-icons/ri";
import ClubCardsS1 from "../../artifacts/contracts/ClubCardsS1.sol/ClubCardsS1.json";
import { contractAddress } from "../../config";



const Mint: FC = () => {
  const smDown = useMatchesMediaQuery("down", "sm");
  const [mintAmount, setMintAmount] = useState(0);
  const [, setSnackbar] = useAtom(snackbarAtom);
  const [isLoading, setIsLoading] = useState(false);

  const { active, library: provider, chainId } = useEthers();

  const [minted] =
    useContractCall({
      abi: new ethers.utils.Interface(ClubCardsS1.abi),
      address: "0x8780BFfc3AaC7eBc40194BCD70D20b7D4E6a92b6",
      method: "totalSupply",
      args: [],
    }) ?? [];

  const mint = async () => {
    setIsLoading(true);
    const signer = provider?.getSigner();
    const contract = new ethers.Contract(
      contractAddress as string,
      ClubCardsS1.abi,
      signer as JsonRpcSigner
    );

    try {
      const transaction = await contract.purchase(mintAmount, {
        value: ethers.utils.parseEther(`${0.06 * mintAmount}`),
      });
      await transaction.wait();

      setSnackbar({
        severity: "success",
        isOpen: true,
        message: "Success! Thank you for being a CC member 👊",
      });
      setIsLoading(false);
    } catch (err: any) {
      setIsLoading(false);
      console.warn("ERROR: ", {
        message: err?.reason ?? err?.message ?? "",
        err,
      });
      // console.warn("ERROR: ", {
      //   message: err?.error.data.originalError.message ?? "",
      // });
      setSnackbar({
        isOpen: true,
        message: err?.reason ?? err?.message ?? "An error occurred",
        severity: "error",
      });
    }
  };

  const decreaseMintAmount = useCallback(() => {
    track("mint_amount:decreased");
    setMintAmount((amount) => (amount >= 1 ? amount - 1 : amount));
  }, []);
  const increaseMintAmount = useCallback(() => {
    track("mint_amount:increased");
    setMintAmount((amount) => (amount <= 5 ? amount + 1 : amount));
  }, []);
  return (
    <Stack id="mint" alignItems="center">
      {active && chainId !== 1 && (
        <Alert severity="warning">Please connect to Ethereum Mainnet</Alert>
      )}
      <Title>Minting Now</Title>
      <Typography fontFamily="Mazzard" sx={{ mb: "1rem" }}>
        0.0420 ETH per chest
      </Typography>
      <Stack maxWidth="240px">

        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          mb="1.5rem"
        >
          <IconButton
            onClick={decreaseMintAmount}
            color="secondary"
            size="large"
          >
            <RiArrowLeftSFill fontSize="inherit" />
          </IconButton>
          <TextField
            sx={{
              maxWidth: "25%",
              mx: "1.5rem",
              input: {
                textAlign: "center",
              },
              "& input[type=number]": {
                MozAppearance: "textfield",
              },
              "& input[type=number]::-webkit-outer-spin-button": {
                WebkitAppearance: "none",
                margin: 0,
              },
              "& input[type=number]::-webkit-inner-spin-button": {
                WebkitAppearance: "none",
                margin: 0,
              },
            }}
            value={mintAmount}
            onChange={(e) =>
              setMintAmount(
                Number(e.target.value) <= 6 ? Number(e.target.value) : 6
              )
            }
            color="secondary"
            type="number"
            placeholder="amount"
            InputProps={{ inputProps: { min: 0, max: 6 } }}
          />
          <IconButton
            onClick={increaseMintAmount}
            color="secondary"
            size="large"
          >
            <RiArrowRightSFill fontSize="inherit" />
          </IconButton>
        </Stack>

        <Typography
          fontFamily="Aleo"
          textAlign="center"
          sx={{ mb: "0.5rem" }}
        >
          {mintAmount == 0 ? "0.00" : (0.0420 * mintAmount).toFixed(4)}
          <Typography component="span" fontFamily="Roboto">
            &Xi;
          </Typography>
        </Typography>

        <LoadingButton
          loading={isLoading}
          disabled={mintAmount === 0 || chainId !== 1}
          // disabled={mintAmount === 0 || chainId !== 1 || minted === 520}
          variant="contained"
          disableElevation
          color="secondary"
          sx={{ mb: "1.5rem" }}
          onClick={async () => {
            track("mint_button:clicked", mintAmount.toString());
            await mint();
          }}
          // {minted === 520 ? "Sold out!" : "Mint"}}
        >
          Mint
        </LoadingButton>
      </Stack>
      <Progress progress={chainId === 1 ? minted : 0} />
    </Stack>
  );
};

export default Mint;
