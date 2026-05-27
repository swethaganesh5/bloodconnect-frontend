import React from 'react';
import { Box, Typography, Button, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import PeopleIcon from '@mui/icons-material/People';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const facts = [
  { icon: '🩸', text: 'Every 2 seconds someone in India needs blood' },
  { icon: '💉', text: 'Blood cannot be manufactured — only humans can donate' },
  { icon: '⚡', text: 'O- blood can be given to anyone in an emergency' },
  { icon: '🎯', text: 'One donation can save up to 3 lives' },
  { icon: '💪', text: 'Healthy adults can donate safely every 90 days' },
  { icon: '🏥', text: 'India faces a shortage of 3 million units every year' },
];

const steps = [
  { icon: '📋', num: 1, title: 'Register as Donor', desc: 'Add your blood group and location. Takes 2 minutes.' },
  { icon: '🚨', num: 2, title: 'Patient Requests',  desc: 'Patient fills name, blood group, and hospital.' },
  { icon: '🤖', num: 3, title: 'AI Finds Match',    desc: 'System finds nearest compatible donors instantly.' },
  { icon: '📧', num: 4, title: 'Donor Gets Alert',  desc: 'Matching donors receive an immediate email.' },
];

export default function Home() {
  return (
    <Box sx={{ fontFamily: 'Poppins, sans-serif' }}>

      {/* HERO */}
      <Box sx={{
        minHeight: '92vh',
        background: 'linear-gradient(135deg, #fff6f6 0%, #ffffff 100%)',
        display: 'flex', alignItems: 'center',
        px: { xs: 3, md: 12 },
        py: { xs: 8, md: 0 },
      }}>
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={6}>
            <Box sx={{
              display: 'inline-block',
              bgcolor: '#FFF0F0', border: '1px solid #FFCDD2',
              borderRadius: 10, px: 2, py: 0.6, mb: 3,
            }}>
              <Typography fontSize="0.75rem" fontWeight={700} color="#C62828">
                 AI-POWERED EMERGENCY BLOOD FINDER
              </Typography>
            </Box>

            <Typography fontWeight={900} color="#111"
              sx={{ fontSize: { xs: '2.6rem', md: '3.8rem' }, lineHeight: 1.1, mb: 1 }}>
              Every Second
            </Typography>
            <Typography fontWeight={900} color="#C62828"
              sx={{ fontSize: { xs: '2.6rem', md: '3.8rem' }, lineHeight: 1.1, mb: 3 }}>
              Counts.{' '}
              <FavoriteIcon sx={{ fontSize: 'inherit', verticalAlign: 'middle', animation: 'heartbeat 1.4s infinite' }} />
            </Typography>

            <Typography color="text.secondary"
              sx={{ fontSize: '1.1rem', lineHeight: 1.8, maxWidth: 460, mb: 5 }}>
              BloodConnect uses AI to instantly connect emergency patients
              with the nearest compatible blood donors — no login required.
            </Typography>

            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              <Button component={Link} to="/request"
                variant="contained" size="large"
                startIcon={<LocalHospitalIcon />}
                sx={{
                  bgcolor: '#C62828', px: 4, py: 1.6,
                  fontWeight: 700, fontSize: '1rem',
                  borderRadius: 2.5, textTransform: 'none',
                  boxShadow: '0 8px 24px rgba(198,40,40,0.38)',
                  '&:hover': { bgcolor: '#8E0000', transform: 'translateY(-2px)' },
                  transition: 'all 0.25s',
                }}>
                🚨 Request Blood Now
              </Button>
              <Button component={Link} to="/donate"
                variant="outlined" size="large"
                startIcon={<PeopleIcon />}
                sx={{
                  borderColor: '#C62828', color: '#C62828',
                  px: 4, py: 1.6, fontWeight: 700,
                  fontSize: '1rem', borderRadius: 2.5,
                  textTransform: 'none',
                  '&:hover': { bgcolor: '#FFF5F5', transform: 'translateY(-2px)' },
                  transition: 'all 0.25s',
                }}>
                ❤️ Become a Donor
              </Button>
            </Box>
          </Grid>

          {/* RIGHT — visual with blood drop animation */}
          <Grid item xs={12} md={6}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {/* top row */}
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Box sx={{
                  flex: 1, bgcolor: '#C62828', borderRadius: 4,
                  p: 3, color: 'white', textAlign: 'center',
                }}>
                  <Typography fontSize="2.2rem" fontWeight={900}>12M+</Typography>
                  <Typography variant="body2" sx={{ opacity: 0.85 }}>Units needed in India yearly</Typography>
                </Box>
                <Box sx={{
                  flex: 1, bgcolor: 'white', borderRadius: 4,
                  p: 3, textAlign: 'center',
                  border: '2px solid #FFCDD2',
                  boxShadow: '0 4px 20px rgba(198,40,40,0.08)',
                }}>
                  <Typography fontSize="2.2rem" fontWeight={900} color="#C62828">3M+</Typography>
                  <Typography variant="body2" color="text.secondary">Unit shortage every year</Typography>
                </Box>
              </Box>

              {/* center — animated blood drop */}
              <Box sx={{
                bgcolor: 'white', borderRadius: 4,
                border: '2px solid #FFCDD2',
                boxShadow: '0 8px 40px rgba(198,40,40,0.10)',
                p: 4, textAlign: 'center',
                position: 'relative', overflow: 'hidden',
              }}>
                {/* Blood drop SVG animation */}
                <Box sx={{ position: 'relative', display: 'inline-block', mb: 2 }}>
                  {/* Ripple rings */}
                  {[0, 1, 2].map((i) => (
                    <Box key={i} sx={{
                      position: 'absolute',
                      top: '50%', left: '50%',
                      transform: 'translate(-50%, -50%)',
                      width: 80 + i * 30,
                      height: 80 + i * 30,
                      borderRadius: '50%',
                      border: '2px solid rgba(198,40,40,0.3)',
                      animation: `ripple 2s ease-out infinite`,
                      animationDelay: `${i * 0.6}s`,
                    }} />
                  ))}
                  {/* Blood drop shape */}
                  <svg width="90" height="110" viewBox="0 0 90 110" style={{ display: 'block' }}>
                    <defs>
                      <linearGradient id="dropGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#FF5252" />
                        <stop offset="100%" stopColor="#B71C1C" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M45 5 C45 5, 10 50, 10 70 C10 90, 26 105, 45 105 C64 105, 80 90, 80 70 C80 50, 45 5, 45 5 Z"
                      fill="url(#dropGrad)"
                      style={{ animation: 'dropFloat 2s ease-in-out infinite' }}
                    />
                    {/* shine */}
                    <ellipse cx="35" cy="55" rx="8" ry="14"
                      fill="rgba(255,255,255,0.25)" transform="rotate(-20 35 55)" />
                  </svg>
                </Box>
                <Typography fontWeight={800} fontSize="1.1rem" color="#111">
                  No login. No delay.
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Request blood in under 60 seconds.
                </Typography>
              </Box>

              {/* bottom row */}
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Box sx={{
                  flex: 1, bgcolor: 'white', borderRadius: 4,
                  p: 3, textAlign: 'center',
                  border: '2px solid #FFCDD2',
                  boxShadow: '0 4px 20px rgba(198,40,40,0.08)',
                }}>
                  <Typography fontSize="2.2rem" fontWeight={900} color="#C62828">1 in 3</Typography>
                  <Typography variant="body2" color="text.secondary">People need blood in lifetime</Typography>
                </Box>
                <Box sx={{
                  flex: 1, bgcolor: '#111', borderRadius: 4,
                  p: 3, color: 'white', textAlign: 'center',
                }}>
                  <Typography fontSize="2.2rem" fontWeight={900}>90</Typography>
                  <Typography variant="body2" sx={{ opacity: 0.75 }}>Days between safe donations</Typography>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>

      {/* HOW IT WORKS */}
      <Box sx={{ py: 9, px: { xs: 3, md: 12 }, bgcolor: '#fff' }}>
        <Typography variant="overline" color="#C62828" fontWeight={700}
          display="block" textAlign="center" letterSpacing={2} mb={1}>
          HOW IT WORKS
        </Typography>
        <Typography variant="h4" fontWeight={900} textAlign="center" mb={7}
          sx={{ fontSize: { xs: '1.7rem', md: '2.2rem' } }}>
          Simple Steps, Big Impact
        </Typography>
        <Grid container spacing={3}>
          {steps.map((s, i) => (
            <Grid item xs={12} sm={6} md={3} key={i}>
              <Box sx={{
                p: 3.5, borderRadius: 4, border: '1px solid #FFEBEE',
                height: '100%', textAlign: 'center',
                transition: 'all 0.25s',
                '&:hover': { boxShadow: '0 10px 35px rgba(198,40,40,0.12)', transform: 'translateY(-6px)', borderColor: '#FFCDD2' },
              }}>
                <Box sx={{
                  width: 65, height: 65, borderRadius: '50%',
                  bgcolor: '#FFF0F0', display: 'flex',
                  alignItems: 'center', justifyContent: 'center',
                  fontSize: '1.8rem', mx: 'auto', mb: 2,
                  border: '2px solid #FFCDD2', position: 'relative',
                }}>
                  {s.icon}
                  <Box sx={{
                    position: 'absolute', bottom: -5, right: -5,
                    width: 22, height: 22, borderRadius: '50%',
                    bgcolor: '#C62828', color: 'white',
                    fontSize: '0.65rem', fontWeight: 900,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    border: '2px solid white',
                  }}>
                    {s.num}
                  </Box>
                </Box>
                <Typography fontWeight={800} mb={1}>{s.title}</Typography>
                <Typography variant="body2" color="text.secondary" lineHeight={1.7}>
                  {s.desc}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* WHY DONATE */}
      <Box sx={{ py: 8, px: { xs: 3, md: 12 }, bgcolor: '#FFF5F5' }}>
        <Typography variant="h4" textAlign="center" fontWeight={900}
          color="#C62828" mb={1} sx={{ fontSize: { xs: '1.6rem', md: '2rem' } }}>
          Why Donate Blood?
        </Typography>
        <Typography textAlign="center" color="text.secondary" mb={5}>
          Every drop counts.
        </Typography>
        <Grid container spacing={2}>
          {facts.map((f, i) => (
            <Grid item xs={12} md={6} key={i}>
              <Box sx={{
                bgcolor: 'white', p: 2.5, borderRadius: 3,
                border: '1px solid #FFEBEE', display: 'flex',
                alignItems: 'center', gap: 2,
                transition: 'all 0.25s',
                '&:hover': { transform: 'translateX(6px)', borderColor: '#FFCDD2', boxShadow: '0 4px 20px rgba(198,40,40,0.08)' },
              }}>
                <Box sx={{
                  width: 44, height: 44, borderRadius: '50%',
                  bgcolor: '#FFF0F0', display: 'flex',
                  alignItems: 'center', justifyContent: 'center',
                  fontSize: '1.3rem', flexShrink: 0,
                }}>
                  {f.icon}
                </Box>
                <Typography fontSize="0.95rem" fontWeight={500}>{f.text}</Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* CTA */}
      <Box sx={{
        py: 10, px: 3, textAlign: 'center',
        background: 'linear-gradient(135deg, #C62828 0%, #7B0000 100%)',
        color: 'white',
      }}>
        <FavoriteIcon sx={{ fontSize: 56, mb: 2, animation: 'heartbeat 1.4s infinite' }} />
        <Typography variant="h4" fontWeight={900} gutterBottom
          sx={{ fontSize: { xs: '1.7rem', md: '2.3rem' } }}>
          Be a Hero. Donate Blood.
        </Typography>
        <Typography sx={{ mb: 5, opacity: 0.85, fontSize: '1.1rem' }}>
          No registration needed to request. Register once to save lives forever.
        </Typography>
        <Box sx={{ display: 'flex', gap: 2.5, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Button component={Link} to="/donate"
            variant="contained" size="large"
            endIcon={<ArrowForwardIcon />}
            sx={{
              bgcolor: 'white', color: '#C62828',
              fontWeight: 700, px: 5, py: 1.6,
              fontSize: '1rem', borderRadius: 2.5,
              textTransform: 'none',
              '&:hover': { bgcolor: '#FFEBEE', transform: 'scale(1.04)' },
              transition: 'all 0.25s',
            }}>
            Register as Donor
          </Button>
          <Button component={Link} to="/request"
            variant="outlined" size="large"
            endIcon={<LocalHospitalIcon />}
            sx={{
              borderColor: 'rgba(255,255,255,0.7)', color: 'white',
              fontWeight: 700, px: 5, py: 1.6,
              fontSize: '1rem', borderRadius: 2.5,
              textTransform: 'none',
              '&:hover': { borderColor: 'white', bgcolor: 'rgba(255,255,255,0.1)' },
              transition: 'all 0.25s',
            }}>
            Request Blood Now
          </Button>
        </Box>
      </Box>

      <style>{`
        @keyframes heartbeat {
          0%  { transform: scale(1); }
          14% { transform: scale(1.25); }
          28% { transform: scale(1); }
          42% { transform: scale(1.15); }
          70% { transform: scale(1); }
        }
        @keyframes dropFloat {
          0%   { transform: translateY(0px); }
          50%  { transform: translateY(-8px); }
          100% { transform: translateY(0px); }
        }
        @keyframes ripple {
          0%   { transform: translate(-50%, -50%) scale(0.5); opacity: 0.8; }
          100% { transform: translate(-50%, -50%) scale(1.8); opacity: 0; }
        }
      `}</style>
    </Box>
  );
}