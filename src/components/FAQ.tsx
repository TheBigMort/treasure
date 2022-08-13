/* eslint-disable no-shadow */
import { Stack } from '@mui/material/';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import MuiAccordionSummary, { AccordionSummaryProps } from '@mui/material/AccordionSummary';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Title from '@src/components/Title';
import theme from '@src/styles/theme';
import { FC, useState } from 'react';
import { IoChevronForward } from 'react-icons/io5';

const Accordion = styled((props: AccordionProps) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    '&:not(:last-child)': {
        borderBottom: 0,
    },
    '&:before': {
        display: 'none',
    },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
    <MuiAccordionSummary
        expandIcon={
            <IoChevronForward
                style={{
                    fontSize: '0.9rem',
                    color: theme.palette.secondary.main,
                    fontWeight: 'bold',
                }}
            />
        }
        {...props}
    />
))(({ theme }) => ({
    backgroundColor:
        theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, .05)' : 'rgba(0, 0, 0, .03)',
    flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
        transform: 'rotate(90deg)',
    },
    '& .MuiAccordionSummary-content': {
        marginLeft: theme.spacing(1),
    },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

const faqData = [
    {
        q: `What is Treasure?`,
        a: `Treasure is randomized battle gear generated and stored on chain. Each Treasure chest contains a variety of gear that warriors will use in battle. Ranging from armour, to weapons and survival gear. Feel free to use your Treasure in any way you want.`,
    },
    {
        q: 'How many Treasures exist and what is in each Treasure?',
        a: 'Each Treasure has several items that pertain to a category: Head, Torso, Bottoms, Footwear, Weapon, Shield, Amulet, and Miscellaneous. There are only 10,000 but as the project progresses there might be expansions with completely new items, but there will be benefits only available to genesis Treasure holders.',
    },
    {
        q: 'How do I mint?',
        a: 'Connect your Metamask wallet on our website and choose the amount of Treasures you wish to mint. You can view your Treasures in Opensea. The official Opensea link will be provided closer to mint.',
    },
];

const FAQ: FC = () => {
    const [expanded, setExpanded] = useState(0);
    const handleExpand = (faqId: number) => setExpanded(faqId);

    return (
        <Stack id="faq" component="section" pt="2.5rem">
            <Title>FAQ</Title>
            {faqData.map((faq, index) => (
                <Accordion
                    key={faq.q}
                    expanded={expanded === index}
                    onChange={() => handleExpand(index)}
                >
                    <AccordionSummary aria-controls={`panel${index}-content`} id={`panel-${index}`}>
                        <Typography fontWeight="bold" color={expanded === index ? 'secondary' : ''}>
                            {faq.q}
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>{faq.a}</Typography>
                    </AccordionDetails>
                </Accordion>
            ))}
        </Stack>
    );
};

export default FAQ;
