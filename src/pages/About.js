import React from 'react';
import {
  Box, Typography, Grid, Card, CardContent, Chip
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

const team = [
  {
    name: 'Swetha G',
    role: 'Developer & Designer',
    dept: 'B.E ECE — R.M.D Engineering College, Chennai',
    icon: '👩‍💻',
  },
];

const features = [
  { icon: '🤖', title: 'AI Donor Matching',      desc: 'Finds nearest compatible donor using location-based AI algorithm.' },
  { icon: '📧', title: 'Instant Email Alerts',   desc: 'Donors get notified immediately when a matching request is made.' },
  { icon: '🗺️', title: 'Location Based',          desc: 'Uses GPS coordinates to match within closest possible distance.' },
  { icon: '🩸', title: 'All Blood Groups',        desc: 'Supports all 8 blood groups with compatibility matching.' },
  { icon: '🏥', title: 'Pre-Surgery Planning',   desc: 'Helps hospitals plan blood requirements before scheduled surgeries.' },
  { icon: '🏆', title: 'Donor Leaderboard',      desc: 'Recognizes top donors and motivates community participation.' },
];

const techStack = [
  { label: 'React.js',      color: '#61DAFB', bg: '#E3F7FF' },
  { label: 'Material UI',   color: '#007FFF', bg: '#E8F4FF' },
  { label: 'Spring Boot',   color: '#6DB33F', bg: '#F0F7E8' },
  { label: 'Java',          color: '#E76F00', bg: '#FFF3E0' },
  { label: 'MySQL',         color: '#00618A', bg: '#E0F2FF' },
  { label: 'REST API',      color: '#C62828', bg: '#FFEBEE' },
  { label: 'Geolocation',   color: '#7B1FA2', bg: '#F3E5F5' },
  { label: 'JavaMail',      color: '#C62828', bg: '#FFEBEE' },
];

const timeline = [
  { phase: 'Phase 1', title: 'Donor Registration',    desc: 'Register donors with blood group, location, and availability.' },
  { phase: 'Phase 2', title: 'Blood Request System',  desc: 'Emergency request form with instant AI-based donor matching.' },
  { phase: 'Phase 3', title: 'Email Notification',    desc: 'Auto-email alerts sent to matched donors immediately.' },
  { phase: 'Phase 4', title: 'Pre-Surgery Planner',   desc: 'Blood planning tool for scheduled hospital surgeries.' },
  { phase: 'Phase 5', title: 'Leaderboard & Guide',   desc: 'Gamification and educational content for donor engagement.' },
];

export default function About() {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f9f9f9', fontFamily: 'Poppins, sans-serif' }}>

      {/* Header */}
      <Box sx={{
        background: 'linear-gradient(135deg, #8E0000, #C62828)',
        color: 'white', py: 6, textAlign: 'center',
      }}>
        <InfoIcon sx={{ fontSize: 52, mb: 1 }} />
        <Typography variant="h4" fontWeight={800}>About BloodConnect</Typography>
        <Typography sx={{ opacity: 0.85, mt: 1 }}>
          AI-Powered Emergency Blood Donor Finder
        </Typography>
      </Box>

      <Box sx={{ maxWidth: 900, mx: 'auto', p: { xs: 2, md: 4 } }}>

        {/* Mission */}
        <Card sx={{
          borderRadius: 3, border: '2px solid #FFCDD2',
          boxShadow: 'none', my: 4, overflow: 'hidden',
        }}>
          <Box sx={{ bgcolor: '#C62828', px: 3, py: 1.5 }}>
            <Typography color="white" fontWeight={800} fontSize="0.9rem">
              🎯 OUR MISSION
            </Typography>
          </Box>
          <CardContent sx={{ p: 3 }}>
            <Typography fontSize="1.05rem" lineHeight={1.9} color="text.secondary">
              BloodConnect was built to solve a real crisis — India needs over{' '}
              <strong style={{ color: '#C62828' }}>12 million units</strong> of blood every year,
              but faces a shortage of{' '}
              <strong style={{ color: '#C62828' }}>3 million units</strong> annually.
              In emergencies, patients and families waste critical time searching for donors.
              BloodConnect uses AI to instantly connect patients with the nearest
              compatible donor — because every second counts.
            </Typography>
          </CardContent>
        </Card>

        {/* Features */}
        <Typography variant="h6" fontWeight={800} color="#C62828" mb={2}>
          ⚡ Key Features
        </Typography>
        <Grid container spacing={2} mb={4}>
          {features.map((f, i) => (
            <Grid item xs={12} sm={6} md={4} key={i}>
              <Box sx={{
                bgcolor: 'white', borderRadius: 3, p: 2.5,
                border: '1px solid #FFEBEE', height: '100%',
                transition: 'all 0.25s',
                '&:hover': { transform: 'translateY(-4px)', borderColor: '#FFCDD2', boxShadow: '0 8px 24px rgba(198,40,40,0.10)' },
              }}>
                <Typography fontSize="1.8rem" mb={1}>{f.icon}</Typography>
                <Typography fontWeight={700} fontSize="0.92rem" mb={0.5}>{f.title}</Typography>
                <Typography variant="caption" color="text.secondary" lineHeight={1.6}>
                  {f.desc}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>

        {/* Tech Stack */}
        <Typography variant="h6" fontWeight={800} color="#C62828" mb={2}>
          🛠️ Tech Stack
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5, mb: 4 }}>
          {techStack.map((t, i) => (
            <Box key={i} sx={{
              bgcolor: t.bg, color: t.color,
              px: 2.5, py: 1, borderRadius: 10,
              fontWeight: 700, fontSize: '0.85rem',
              border: `1px solid ${t.color}33`,
              fontFamily: 'Poppins',
            }}>
              {t.label}
            </Box>
          ))}
        </Box>

        {/* Project Timeline */}
        <Typography variant="h6" fontWeight={800} color="#C62828" mb={3}>
          🗓️ Project Phases
        </Typography>
        <Box sx={{ mb: 4 }}>
          {timeline.map((t, i) => (
            <Box key={i} sx={{
              display: 'flex', gap: 2, mb: 2, alignItems: 'flex-start',
            }}>
              <Box sx={{
                flexShrink: 0, display: 'flex',
                flexDirection: 'column', alignItems: 'center',
              }}>
                <Box sx={{
                  width: 40, height: 40, borderRadius: '50%',
                  bgcolor: '#C62828', color: 'white',
                  display: 'flex', alignItems: 'center',
                  justifyContent: 'center', fontWeight: 900,
                  fontSize: '0.8rem',
                }}>
                  {i + 1}
                </Box>
                {i < timeline.length - 1 && (
                  <Box sx={{ width: 2, height: 30, bgcolor: '#FFCDD2', mt: 0.5 }} />
                )}
              </Box>
              <Box sx={{
                bgcolor: 'white', borderRadius: 3, p: 2,
                border: '1px solid #FFEBEE', flex: 1,
                transition: 'all 0.25s',
                '&:hover': { borderColor: '#FFCDD2' },
              }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                  <Chip label={t.phase} size="small"
                    sx={{ bgcolor: '#FFEBEE', color: '#C62828', fontWeight: 700, fontSize: '0.7rem' }} />
                  <Typography fontWeight={700} fontSize="0.9rem">{t.title}</Typography>
                </Box>
                <Typography variant="caption" color="text.secondary" lineHeight={1.6}>
                  {t.desc}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>

        {/* Developer */}
        <Typography variant="h6" fontWeight={800} color="#C62828" mb={2}>
          👩‍💻 Developer
        </Typography>
        {team.map((member, i) => (
          <Card key={i} sx={{
            borderRadius: 3, border: '1px solid #FFEBEE',
            boxShadow: 'none', mb: 2,
          }}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', gap: 3, alignItems: 'center' }}>
                <Box sx={{
                  width: 70, height: 70, borderRadius: '50%',
                  bgcolor: '#C62828', display: 'flex',
                  alignItems: 'center', justifyContent: 'center',
                  fontSize: '2rem', flexShrink: 0,
                }}>
                  {member.icon}
                </Box>
                <Box>
                  <Typography fontWeight={800} fontSize="1.1rem">{member.name}</Typography>
                  <Typography color="#C62828" fontWeight={600} fontSize="0.9rem">
                    {member.role}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {member.dept}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        ))}

        {/* Built with love */}
        <Box sx={{
          textAlign: 'center', py: 4,
          borderTop: '1px solid #FFEBEE', mt: 2,
        }}>
          <FavoriteIcon sx={{ color: '#C62828', fontSize: 28, animation: 'heartbeat 1.4s infinite' }} />
          <Typography color="text.secondary" variant="body2" mt={1}>
            Built with passion to save lives — BloodConnect 2025
          </Typography>
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
      `}</style>
    </Box>
  );
}