import React, { useState } from 'react';
import {
  Box, Typography, Grid, Card, CardContent,
  TextField, Button, MenuItem, CircularProgress, Chip
} from '@mui/material';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import toast from 'react-hot-toast';

const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

const surgeryTypes = [
  'Cardiac Surgery', 'Orthopedic Surgery', 'Abdominal Surgery',
  'Neurosurgery', 'Transplant Surgery', 'Emergency Surgery', 'Other',
];

const checklist = [
  { icon: '🩸', title: 'Blood Group Verified',  desc: 'Confirm patient blood group with lab report.' },
  { icon: '🏥', title: 'Units Required',         desc: 'Surgeon confirms how many units are needed.' },
  { icon: '📋', title: 'Cross-match Done',       desc: 'Blood bank performs cross-matching test.' },
  { icon: '✅', title: 'Donors Notified',        desc: 'BloodConnect alerts nearest matching donors.' },
  { icon: '🚚', title: 'Blood Reserved',         desc: 'Units reserved at hospital blood bank.' },
  { icon: '💉', title: 'Ready for Surgery',      desc: 'All units on standby before operation starts.' },
];

const urgencyLevels = [
  { label: 'Elective',   desc: 'Surgery planned 1–4 weeks ahead',      color: '#2E7D32', bg: '#E8F5E9' },
  { label: 'Urgent',     desc: 'Surgery needed within 24–72 hours',     color: '#E65100', bg: '#FFF3E0' },
  { label: 'Emergency',  desc: 'Surgery needed immediately',             color: '#C62828', bg: '#FFEBEE' },
];

const surgeryTable = [
  ['Cardiac Surgery',    '2–4 units', '6 units'],
  ['Orthopedic Surgery', '1–2 units', '3 units'],
  ['Abdominal Surgery',  '1–3 units', '4 units'],
  ['Neurosurgery',       '2–4 units', '5 units'],
  ['Transplant Surgery', '4–8 units', '10 units'],
  ['Emergency Surgery',  '2–6 units', '8 units'],
];

export default function PreSurgery() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [form, setForm] = useState({
    patientName: '',
    bloodGroup: '',
    surgeryType: '',
    unitsRequired: '',
    hospitalName: '',
    surgeryDate: '',
    urgency: '',
  });

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = () => {
    if (!form.patientName || !form.bloodGroup || !form.surgeryType || !form.unitsRequired || !form.hospitalName) {
      toast.error('Please fill all required fields!');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setResult({ recommendedUnits: parseInt(form.unitsRequired) + 2 });
      toast.success('Pre-surgery plan generated!');
      setLoading(false);
    }, 800);
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f9f9f9', fontFamily: 'Poppins, sans-serif' }}>

      {/* Header */}
      <Box sx={{
        background: 'linear-gradient(135deg, #8E0000, #C62828)',
        color: 'white', py: 6, textAlign: 'center',
      }}>
        <LocalHospitalIcon sx={{ fontSize: 52, mb: 1 }} />
        <Typography variant="h4" fontWeight={800}>Pre-Surgery Blood Planner</Typography>
        <Typography sx={{ opacity: 0.85, mt: 1 }}>
          Plan your blood requirements before a scheduled surgery
        </Typography>
      </Box>

      <Box sx={{ maxWidth: 900, mx: 'auto', p: { xs: 2, md: 4 } }}>

        {/* Urgency Cards */}
        <Grid container spacing={2} mb={4} mt={1}>
          {urgencyLevels.map((u, i) => (
            <Grid item xs={12} md={4} key={i}>
              <Box sx={{
                bgcolor: u.bg, borderRadius: 3, p: 2.5,
                border: `1px solid ${u.color}33`,
                transition: 'all 0.25s',
                '&:hover': { transform: 'translateY(-3px)' },
              }}>
                <Chip label={u.label} size="small"
                  sx={{ bgcolor: u.color, color: 'white', fontWeight: 700, mb: 1 }} />
                <Typography variant="body2" color="text.secondary">{u.desc}</Typography>
              </Box>
            </Grid>
          ))}
        </Grid>

        <Grid container spacing={4}>

          {/* LEFT — Form */}
          <Grid item xs={12} md={6}>
            <Card sx={{ borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.08)', border: '1px solid #FFEBEE' }}>
              <CardContent sx={{ p: 3 }}>
                <Typography fontWeight={800} color="#C62828" mb={2.5}>
                  📋 Patient & Surgery Details
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField fullWidth label="Patient Name *"
                      name="patientName" value={form.patientName}
                      onChange={handleChange} size="small" />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField fullWidth select label="Blood Group *"
                      name="bloodGroup" value={form.bloodGroup}
                      onChange={handleChange} size="small">
                      {bloodGroups.map(g => (
                        <MenuItem key={g} value={g}>{g}</MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item xs={6}>
                    <TextField fullWidth label="Units Required *"
                      name="unitsRequired" value={form.unitsRequired}
                      onChange={handleChange} size="small"
                      type="number" inputProps={{ min: 1 }} />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField fullWidth select label="Surgery Type *"
                      name="surgeryType" value={form.surgeryType}
                      onChange={handleChange} size="small">
                      {surgeryTypes.map(s => (
                        <MenuItem key={s} value={s}>{s}</MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField fullWidth label="Hospital Name *"
                      name="hospitalName" value={form.hospitalName}
                      onChange={handleChange} size="small" />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField fullWidth label="Surgery Date"
                      name="surgeryDate" value={form.surgeryDate}
                      onChange={handleChange} size="small"
                      type="date" InputLabelProps={{ shrink: true }}
                      inputProps={{ min: new Date().toISOString().split('T')[0] }} />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField fullWidth select label="Urgency Level"
                      name="urgency" value={form.urgency}
                      onChange={handleChange} size="small">
                      {urgencyLevels.map(u => (
                        <MenuItem key={u.label} value={u.label}>{u.label}</MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item xs={12}>
                    <Button fullWidth variant="contained"
                      onClick={handleSubmit} disabled={loading}
                      sx={{
                        bgcolor: '#C62828', py: 1.5, fontWeight: 700,
                        borderRadius: 2, textTransform: 'none', fontSize: '0.95rem',
                        '&:hover': { bgcolor: '#8E0000' },
                      }}>
                      {loading
                        ? <CircularProgress size={22} color="inherit" />
                        : '🔍 Check Blood Availability'}
                    </Button>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          {/* RIGHT — Checklist or Result */}
          <Grid item xs={12} md={6}>
            {result ? (
              <Card sx={{ borderRadius: 3, border: '2px solid #4CAF50', boxShadow: '0 4px 20px rgba(76,175,80,0.15)' }}>
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                    <CheckCircleIcon sx={{ color: '#2E7D32', fontSize: 28 }} />
                    <Typography fontWeight={800} color="#2E7D32" fontSize="1.05rem">
                      Blood Plan Generated
                    </Typography>
                  </Box>
                  {[
                    { label: 'Patient',              value: form.patientName },
                    { label: 'Blood Group',           value: form.bloodGroup },
                    { label: 'Units Requested',       value: form.unitsRequired },
                    { label: 'Recommended Reserve',   value: `${result.recommendedUnits} units` },
                    { label: 'Surgery Type',          value: form.surgeryType },
                    { label: 'Hospital',              value: form.hospitalName },
                    { label: 'Surgery Date',          value: form.surgeryDate || '—' },
                    { label: 'Urgency',               value: form.urgency || '—' },
                  ].map((row, i) => (
                    <Box key={i} sx={{
                      display: 'flex', justifyContent: 'space-between',
                      py: 1, borderBottom: i < 7 ? '1px solid #f0f0f0' : 'none',
                    }}>
                      <Typography variant="body2" color="text.secondary">{row.label}</Typography>
                      <Typography variant="body2" fontWeight={700}>{row.value}</Typography>
                    </Box>
                  ))}
                  <Button fullWidth variant="outlined" color="error"
                    onClick={() => setResult(null)}
                    sx={{ mt: 2, borderRadius: 2, textTransform: 'none', fontWeight: 600 }}>
                    Plan Another Surgery
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <Card sx={{ borderRadius: 3, border: '1px solid #FFEBEE', boxShadow: 'none' }}>
                <CardContent sx={{ p: 3 }}>
                  <Typography fontWeight={800} color="#C62828" mb={2.5}>
                    📌 Pre-Surgery Blood Checklist
                  </Typography>
                  {checklist.map((item, i) => (
                    <Box key={i} sx={{ display: 'flex', gap: 2, mb: 2, alignItems: 'flex-start' }}>
                      <Box sx={{
                        width: 40, height: 40, borderRadius: '50%',
                        bgcolor: '#FFF0F0', display: 'flex',
                        alignItems: 'center', justifyContent: 'center',
                        fontSize: '1.2rem', flexShrink: 0,
                        border: '1px solid #FFCDD2',
                      }}>
                        {item.icon}
                      </Box>
                      <Box>
                        <Typography fontWeight={700} fontSize="0.9rem">{item.title}</Typography>
                        <Typography variant="caption" color="text.secondary" lineHeight={1.6}>
                          {item.desc}
                        </Typography>
                      </Box>
                    </Box>
                  ))}
                </CardContent>
              </Card>
            )}
          </Grid>
        </Grid>

        {/* Surgery Table */}
        <Typography variant="h6" fontWeight={800} color="#C62828" mt={5} mb={2}>
          🏥 Typical Blood Requirements by Surgery Type
        </Typography>
        <Card sx={{ borderRadius: 3, border: '1px solid #FFEBEE', boxShadow: 'none', overflow: 'auto' }}>
          <Box component="table" sx={{ width: '100%', borderCollapse: 'collapse' }}>
            <Box component="thead">
              <Box component="tr" sx={{ bgcolor: '#C62828' }}>
                {['Surgery Type', 'Typical Units', 'Reserve Recommended'].map(h => (
                  <Box component="th" key={h} sx={{
                    color: 'white', fontWeight: 700, p: '12px 16px',
                    textAlign: 'left', fontSize: '0.85rem', fontFamily: 'Poppins',
                  }}>
                    {h}
                  </Box>
                ))}
              </Box>
            </Box>
            <Box component="tbody">
              {surgeryTable.map((row, i) => (
                <Box component="tr" key={i} sx={{
                  bgcolor: i % 2 === 0 ? 'white' : '#FFF8F8',
                  '&:hover': { bgcolor: '#FFEBEE' },
                }}>
                  {row.map((cell, j) => (
                    <Box component="td" key={j} sx={{
                      p: '10px 16px', fontSize: '0.85rem',
                      fontFamily: 'Poppins', fontWeight: j === 0 ? 600 : 400,
                    }}>
                      {cell}
                    </Box>
                  ))}
                </Box>
              ))}
            </Box>
          </Box>
        </Card>

      </Box>
    </Box>
  );
}