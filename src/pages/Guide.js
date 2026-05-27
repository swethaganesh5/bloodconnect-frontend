import React, { useState } from 'react';
import {
  Box, Typography, Grid, Card, CardContent,
  Accordion, AccordionSummary, AccordionDetails, Chip
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MenuBookIcon from '@mui/icons-material/MenuBook';

const eligibility = [
  { icon: '✅', label: 'Age 18–65 years' },
  { icon: '✅', label: 'Weight minimum 50 kg' },
  { icon: '✅', label: 'Haemoglobin ≥ 12.5 g/dL' },
  { icon: '✅', label: 'No donation in last 90 days' },
  { icon: '❌', label: 'No recent surgery (6 months)' },
  { icon: '❌', label: 'Not diabetic or high BP' },
  { icon: '❌', label: 'No fever or cold currently' },
  { icon: '❌', label: 'Not pregnant or breastfeeding' },
];

const beforeDonation = [
  'Drink plenty of water — at least 2–3 glasses before donating',
  'Eat a light healthy meal 2–3 hours before donation',
  'Avoid fatty foods — they affect blood test results',
  'Get 7–8 hours of sleep the night before',
  'Avoid alcohol for at least 24 hours before donating',
  'Wear a shirt with sleeves that roll up easily',
];

const afterDonation = [
  'Rest for 10–15 minutes at the donation center before leaving',
  'Drink extra fluids for the next 24–48 hours',
  'Avoid heavy exercise or lifting for the rest of the day',
  'Keep the bandage on for at least 4–5 hours',
  'Eat iron-rich foods — spinach, lentils, meat, beans',
  'If you feel dizzy, sit or lie down and call for help',
];

const compatibility = [
  { group: 'A+',  donateTo: 'A+, AB+',           receiveFrom: 'A+, A-, O+, O-' },
  { group: 'A-',  donateTo: 'A+, A-, AB+, AB-',   receiveFrom: 'A-, O-' },
  { group: 'B+',  donateTo: 'B+, AB+',             receiveFrom: 'B+, B-, O+, O-' },
  { group: 'B-',  donateTo: 'B+, B-, AB+, AB-',   receiveFrom: 'B-, O-' },
  { group: 'AB+', donateTo: 'AB+ only',            receiveFrom: 'Everyone (Universal Receiver)' },
  { group: 'AB-', donateTo: 'AB+, AB-',            receiveFrom: 'A-, B-, O-, AB-' },
  { group: 'O+',  donateTo: 'A+, B+, O+, AB+',    receiveFrom: 'O+, O-' },
  { group: 'O-',  donateTo: 'Everyone (Universal Donor)', receiveFrom: 'O- only' },
];

const faqs = [
  {
    q: 'Does donating blood hurt?',
    a: 'You will feel a small pinch when the needle is inserted, but the donation process itself is painless. Most donors say it feels no worse than a blood test.',
  },
  {
    q: 'How long does donation take?',
    a: 'The actual blood drawing takes only 8–10 minutes. Including registration and rest time, plan for about 45–60 minutes total.',
  },
  {
    q: 'Will I feel weak after donating?',
    a: 'Most people feel completely fine. Your body replaces the plasma within 24 hours and red blood cells within a few weeks. Drink water and eat well.',
  },
  {
    q: 'How often can I donate?',
    a: 'Whole blood can be donated every 90 days (3 months). Platelets can be donated every 7 days, plasma every 28 days.',
  },
  {
    q: 'Is donated blood tested?',
    a: 'Yes. Every unit is tested for HIV, Hepatitis B, Hepatitis C, malaria, and syphilis before being used.',
  },
  {
    q: 'Can I donate if I take medicines?',
    a: 'It depends on the medicine. Common vitamins and mild pain relievers are usually fine. Consult with the blood bank doctor before donating.',
  },
];

export default function Guide() {
  const [expanded, setExpanded] = useState(false);

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f9f9f9', fontFamily: 'Poppins, sans-serif' }}>

      {/* Header */}
      <Box sx={{
        background: 'linear-gradient(135deg, #8E0000, #C62828)',
        color: 'white', py: 6, textAlign: 'center',
      }}>
        <MenuBookIcon sx={{ fontSize: 52, mb: 1 }} />
        <Typography variant="h4" fontWeight={800}>Donor Guide</Typography>
        <Typography sx={{ opacity: 0.85, mt: 1 }}>
          Everything you need to know before and after donating blood
        </Typography>
      </Box>

      <Box sx={{ maxWidth: 900, mx: 'auto', p: { xs: 2, md: 4 } }}>

        {/* Eligibility */}
        <Typography variant="h6" fontWeight={800} color="#C62828" mb={2} mt={2}>
          ✅ Am I Eligible to Donate?
        </Typography>
        <Grid container spacing={2} mb={4}>
          {eligibility.map((e, i) => (
            <Grid item xs={6} md={3} key={i}>
              <Box sx={{
                bgcolor: 'white', borderRadius: 3, p: 2,
                textAlign: 'center', border: '1px solid #FFEBEE',
                boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
                transition: 'all 0.25s',
                '&:hover': { transform: 'translateY(-3px)', borderColor: '#FFCDD2' },
              }}>
                <Typography fontSize="1.5rem">{e.icon}</Typography>
                <Typography variant="body2" fontWeight={600} mt={0.5}>
                  {e.label}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>

        {/* Before & After */}
        <Grid container spacing={3} mb={4}>
          <Grid item xs={12} md={6}>
            <Card sx={{ borderRadius: 3, border: '1px solid #FFEBEE', boxShadow: 'none', height: '100%' }}>
              <CardContent sx={{ p: 3 }}>
                <Typography fontWeight={800} color="#C62828" mb={2} fontSize="1rem">
                  🕐 Before Donation
                </Typography>
                {beforeDonation.map((item, i) => (
                  <Box key={i} sx={{
                    display: 'flex', gap: 1.5, mb: 1.5,
                    alignItems: 'flex-start',
                  }}>
                    <Box sx={{
                      width: 22, height: 22, borderRadius: '50%',
                      bgcolor: '#C62828', color: 'white',
                      fontSize: '0.65rem', fontWeight: 900,
                      display: 'flex', alignItems: 'center',
                      justifyContent: 'center', flexShrink: 0, mt: 0.2,
                    }}>
                      {i + 1}
                    </Box>
                    <Typography variant="body2" lineHeight={1.6}>{item}</Typography>
                  </Box>
                ))}
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card sx={{ borderRadius: 3, border: '1px solid #E8F5E9', boxShadow: 'none', height: '100%' }}>
              <CardContent sx={{ p: 3 }}>
                <Typography fontWeight={800} color="#2E7D32" mb={2} fontSize="1rem">
                  ✔️ After Donation
                </Typography>
                {afterDonation.map((item, i) => (
                  <Box key={i} sx={{
                    display: 'flex', gap: 1.5, mb: 1.5,
                    alignItems: 'flex-start',
                  }}>
                    <Box sx={{
                      width: 22, height: 22, borderRadius: '50%',
                      bgcolor: '#2E7D32', color: 'white',
                      fontSize: '0.65rem', fontWeight: 900,
                      display: 'flex', alignItems: 'center',
                      justifyContent: 'center', flexShrink: 0, mt: 0.2,
                    }}>
                      {i + 1}
                    </Box>
                    <Typography variant="body2" lineHeight={1.6}>{item}</Typography>
                  </Box>
                ))}
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Blood Compatibility Table */}
        <Typography variant="h6" fontWeight={800} color="#C62828" mb={2}>
          🩸 Blood Group Compatibility
        </Typography>
        <Card sx={{ borderRadius: 3, border: '1px solid #FFEBEE', boxShadow: 'none', mb: 4, overflow: 'auto' }}>
          <Box component="table" sx={{ width: '100%', borderCollapse: 'collapse' }}>
            <Box component="thead">
              <Box component="tr" sx={{ bgcolor: '#C62828' }}>
                {['Blood Group', 'Can Donate To', 'Can Receive From'].map((h) => (
                  <Box component="th" key={h} sx={{
                    color: 'white', fontWeight: 700,
                    p: '12px 16px', textAlign: 'left',
                    fontSize: '0.85rem', fontFamily: 'Poppins',
                  }}>
                    {h}
                  </Box>
                ))}
              </Box>
            </Box>
            <Box component="tbody">
              {compatibility.map((row, i) => (
                <Box component="tr" key={i} sx={{
                  bgcolor: i % 2 === 0 ? 'white' : '#FFF8F8',
                  '&:hover': { bgcolor: '#FFEBEE' },
                }}>
                  <Box component="td" sx={{ p: '10px 16px' }}>
                    <Chip label={row.group}
                      sx={{ bgcolor: '#C62828', color: 'white', fontWeight: 800, fontSize: '0.85rem' }} />
                  </Box>
                  <Box component="td" sx={{ p: '10px 16px', fontSize: '0.85rem', fontFamily: 'Poppins' }}>
                    {row.donateTo}
                  </Box>
                  <Box component="td" sx={{ p: '10px 16px', fontSize: '0.85rem', fontFamily: 'Poppins' }}>
                    {row.receiveFrom}
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        </Card>

        {/* FAQs */}
        <Typography variant="h6" fontWeight={800} color="#C62828" mb={2}>
          ❓ Frequently Asked Questions
        </Typography>
        {faqs.map((faq, i) => (
          <Accordion key={i} expanded={expanded === i}
            onChange={() => setExpanded(expanded === i ? false : i)}
            sx={{
              mb: 1, borderRadius: '12px !important',
              border: '1px solid #FFEBEE', boxShadow: 'none',
              '&:before': { display: 'none' },
              '&.Mui-expanded': { borderColor: '#FFCDD2' },
            }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: '#C62828' }} />}>
              <Typography fontWeight={700} fontSize="0.95rem">{faq.q}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2" color="text.secondary" lineHeight={1.8}>
                {faq.a}
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}

      </Box>
    </Box>
  );
}