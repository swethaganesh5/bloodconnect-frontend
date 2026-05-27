import React, { useState, useEffect } from 'react';
import {
  Box, Typography, Card, CardContent,
  Grid, Chip, CircularProgress
} from '@mui/material';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { getLeaderboard } from '../api';

const medals = ['🥇', '🥈', '🥉'];
const rankColors = ['#FFD700', '#C0C0C0', '#CD7F32'];

export default function Leaderboard() {
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getLeaderboard()
      .then(res => setDonors(res.data))
      .catch(() => setDonors([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f9f9f9' }}>

      {/* Header */}
      <Box sx={{
        background: 'linear-gradient(135deg, #8E0000, #C62828)',
        color: 'white', py: 6, textAlign: 'center',
      }}>
        <EmojiEventsIcon sx={{ fontSize: 52, mb: 1 }} />
        <Typography variant="h4" fontWeight={800}>
          Top Blood Donors
        </Typography>
        <Typography sx={{ opacity: 0.85, mt: 1 }}>
          Heroes who donated the most — ranked by donation count
        </Typography>
      </Box>

      <Box sx={{ maxWidth: 750, mx: 'auto', p: { xs: 2, md: 4 } }}>

        {loading ? (
          <Box textAlign="center" py={8}>
            <CircularProgress sx={{ color: '#C62828' }} />
            <Typography mt={2} color="text.secondary">Loading donors...</Typography>
          </Box>
        ) : donors.length === 0 ? (
          <Box textAlign="center" py={8}>
            <Typography fontSize="3rem">🩸</Typography>
            <Typography fontWeight={700} mt={1}>No donors yet.</Typography>
            <Typography color="text.secondary">Be the first to register and donate!</Typography>
          </Box>
        ) : (
          <>
            {/* Top 3 podium */}
            {donors.slice(0, 3).length > 0 && (
              <Box sx={{ mb: 4, mt: 2 }}>
                <Typography fontWeight={800} color="#C62828" mb={2} fontSize="1rem">
                  🏆 Top 3 Heroes
                </Typography>
                <Grid container spacing={2}>
                  {donors.slice(0, 3).map((d, i) => (
                    <Grid item xs={4} key={i}>
                      <Card sx={{
                        textAlign: 'center', borderRadius: 3,
                        border: `2px solid ${rankColors[i]}`,
                        boxShadow: `0 4px 20px ${rankColors[i]}44`,
                        transition: 'all 0.25s',
                        '&:hover': { transform: 'translateY(-4px)' },
                      }}>
                        <CardContent sx={{ p: 2 }}>
                          <Typography fontSize="2rem">{medals[i]}</Typography>
                          <Box sx={{
                            width: 52, height: 52, borderRadius: '50%',
                            bgcolor: '#C62828', mx: 'auto', my: 1,
                            display: 'flex', alignItems: 'center',
                            justifyContent: 'center',
                          }}>
                            <Typography color="white" fontWeight={900} fontSize="0.9rem">
                              {d.bloodGroup}
                            </Typography>
                          </Box>
                          <Typography fontWeight={800} fontSize="0.85rem" noWrap>
                            {d.name}
                          </Typography>
                          <Chip
                            label={`${d.donationCount} donations`}
                            size="small"
                            sx={{ mt: 0.5, bgcolor: '#FFEBEE', color: '#C62828', fontWeight: 700, fontSize: '0.7rem' }}
                          />
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            )}

            {/* Full list */}
            <Typography fontWeight={800} color="#C62828" mb={2} fontSize="1rem">
              📋 All Donors
            </Typography>
            {donors.map((d, i) => (
              <Card key={i} sx={{
                mb: 1.5, borderRadius: 3,
                border: '1px solid #FFEBEE',
                boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
                transition: 'all 0.25s',
                '&:hover': { transform: 'translateX(4px)', borderColor: '#FFCDD2' },
              }}>
                <CardContent sx={{ py: 2, px: 3, '&:last-child': { pb: 2 } }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>

                    {/* rank */}
                    <Typography fontWeight={900} color="text.secondary"
                      sx={{ width: 28, textAlign: 'center', fontSize: '1rem' }}>
                      {i < 3 ? medals[i] : `#${i + 1}`}
                    </Typography>

                    {/* blood group circle */}
                    <Box sx={{
                      width: 46, height: 46, borderRadius: '50%',
                      bgcolor: '#C62828', flexShrink: 0,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <Typography color="white" fontWeight={900} fontSize="0.85rem">
                        {d.bloodGroup}
                      </Typography>
                    </Box>

                    {/* name + phone */}
                    <Box sx={{ flex: 1 }}>
                      <Typography fontWeight={700}>{d.name}</Typography>
                      <Typography variant="caption" color="text.secondary">
                        📞 {d.phone}
                      </Typography>
                    </Box>

                    {/* donations count */}
                    <Box sx={{ textAlign: 'right' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, justifyContent: 'flex-end' }}>
                        <FavoriteIcon sx={{ color: '#C62828', fontSize: 16 }} />
                        <Typography fontWeight={900} color="#C62828">
                          {d.donationCount}
                        </Typography>
                      </Box>
                      <Typography variant="caption" color="text.secondary">
                        donations
                      </Typography>
                    </Box>

                  </Box>
                </CardContent>
              </Card>
            ))}
          </>
        )}

        {/* Info box */}
        <Card sx={{ mt: 3, bgcolor: '#FFEBEE', boxShadow: 'none', borderRadius: 3 }}>
          <CardContent>
            <Typography fontWeight={700} color="#C62828" gutterBottom>
              🏅 How to climb the leaderboard?
            </Typography>
            {[
              'Register as a donor with your blood group',
              'Respond to blood requests near you',
              'Each donation increases your count',
              'Top donors get featured here!',
            ].map((item, i) => (
              <Typography key={i} variant="body2" sx={{ mb: 0.5 }}>• {item}</Typography>
            ))}
          </CardContent>
        </Card>

      </Box>
    </Box>
  );
}