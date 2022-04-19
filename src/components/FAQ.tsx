/* eslint-disable no-shadow */
import Title from '@components/Title';
import { Stack } from '@mui/material/';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import MuiAccordionSummary, { AccordionSummaryProps } from '@mui/material/AccordionSummary';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import theme from '@styles/theme';
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
        q: 'test1',
        a: 'stuff stuff stuff stuff stuff stuff stuff stuff stuff stuff stuff stuff stuff stuff stuff stuff stuff stuff stuff stuff ',
    },
    {
        q: 'test 2',
        a: 'more stuff more stuff more stuff more stuff more stuff more stuff more stuff more stuff more stuff more stuff more stuff more stuff ',
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
