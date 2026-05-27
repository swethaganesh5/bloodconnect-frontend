import React, { useState } from 'react';
import {
  Box, Typography, TextField, Button, Grid,
  MenuItem, Card, CardContent, Checkbox,
  FormControlLabel, CircularProgress
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { registerDonor } from '../api';
import toast from 'react-hot-toast';

const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

function Donate() {
  const [loading, setLoading] = useState(false);
  const [locating, setLocating] = useState(false);
  const [form, setForm] = useState({
    name: '', email: '', phone: '',
    bloodGroup: '', latitude: '', longitude: '',
    available: true, willingToTravel: false,
    weightKg: '', hasRecentSurgery: false,
    hasHighBP: false, availableDays: '',
    availableTimeStart: '', availableTimeEnd: '',
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const detectLocation = () => {
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setForm(prev => ({
          ...prev,
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
        }));
        setLocating(false);
        toast.success('Location detected!');
      },
      () => {
        setLocating(false);
        toast.error('Location access denied!');
      }
    );
  };

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.phone || !form.bloodGroup) {
      toast.error('Please fill all required fields!');
      return;
    }
    setLoading(true);
    try {
      await registerDonor(form);
      toast.success('Registered successfully! Thank you for joining BloodConnect!');
      setForm({
        name: '', email: '', phone: '',
        bloodGroup: '', latitude: '', longitude: '',
        available: true, willingToTravel: false,
        weightKg: '', hasRecentSurgery: false,
        hasHighBP: false, availableDays: '',
        availableTimeStart: '', availableTimeEnd: '',
      });
    } catch (err) {
      toast.error(err.response?.data?.error || 'Registration failed!');
    }
    setLoading(false);
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f9f9f9' }}>
      {/* Header */}
      <Box sx={{
        background: 'linear-gradient(135deg, #8E0000, #C62828)',
        color: 'white', py: 6, textAlign: 'center'
      }}>
        <FavoriteIcon sx={{ fontSize: 50, mb: 1 }} />
        <Typography variant="h4" fontWeight={700}>
          Become a Blood Donor
        </Typography>
        <Typography sx={{ opacity: 0.9, mt: 1 }}>
          Register once. Save lives forever.
        </Typography>
      </Box>

      <Box sx={{ maxWidth: 700, mx: 'auto', p: 4 }}>
        <Card sx={{ boxShadow: '0 4px 20px rgba(0,0,0,0.1)', borderRadius: 3 }}>
          <CardContent sx={{ p: 4 }}>

            {/* Basic Info */}
            <Typography variant="h6" fontWeight={700}
              color="#C62828" gutterBottom>
              Basic Information
            </Typography>
            <Grid container spacing={2} mb={3}>
              <Grid item xs={12}>
                <TextField fullWidth label="Full Name *"
                  name="name" value={form.name}
                  onChange={handleChange} />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField fullWidth label="Email *"
                  name="email" value={form.email}
                  onChange={handleChange} type="email" />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField fullWidth label="Phone *"
                  name="phone" value={form.phone}
                  onChange={handleChange} />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField fullWidth select label="Blood Group *"
                  name="bloodGroup" value={form.bloodGroup}
                  onChange={handleChange}>
                  {bloodGroups.map(g => (
                    <MenuItem key={g} value={g}>{g}</MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField fullWidth label="Weight (kg)"
                  name="weightKg" value={form.weightKg}
                  onChange={handleChange} type="number" />
              </Grid>
            </Grid>

            {/* Location */}
            <Typography variant="h6" fontWeight={700}
              color="#C62828" gutterBottom>
              Your Location
            </Typography>
            <Grid container spacing={2} mb={3}>
              <Grid item xs={12}>
                <Button variant="outlined" color="error"
                  startIcon={locating
                    ? <CircularProgress size={18} />
                    : <LocationOnIcon />}
                  onClick={detectLocation}
                  disabled={locating} fullWidth
                  sx={{ py: 1.5 }}>
                  {locating ? 'Detecting...' : 'Auto Detect My Location'}
                </Button>
              </Grid>
              {form.latitude && (
                <Grid item xs={12}>
                  <Box sx={{
                    bgcolor: '#FFEBEE', p: 2,
                    borderRadius: 2, textAlign: 'center'
                  }}>
                    ✅ Location detected: {Number(form.latitude).toFixed(4)},
                    {Number(form.longitude).toFixed(4)}
                  </Box>
                </Grid>
              )}
            </Grid>

            {/* Availability */}
        <Typography fontWeight={700} mb={2} fontSize="1rem" color="#111">
  Availability Schedule
</Typography>
<Typography variant="caption" color="text.secondary" display="block" mb={2}>
  Select days you are available to donate. Leave empty = always available.
</Typography>

{/* Days - multi select chips */}
<Typography variant="body2" fontWeight={600} color="#555" mb={1}>
  Available Days
</Typography>
<Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => {
    const selected = (form.availableDays || []).includes(day);
    return (
      <Box key={day} onClick={() => {
        const current = form.availableDays || [];
        const updated = current.includes(day)
          ? current.filter(d => d !== day)
          : [...current, day];
        setForm(prev => ({ ...prev, availableDays: updated }));
      }} sx={{
        px: 2, py: 0.8,
        borderRadius: 2,
        border: selected ? '2px solid #C62828' : '2px solid #e0e0e0',
        bgcolor: selected ? '#FFEBEE' : 'white',
        color: selected ? '#C62828' : '#666',
        fontWeight: selected ? 700 : 500,
        fontSize: '0.85rem',
        cursor: 'pointer',
        userSelect: 'none',
        transition: 'all 0.2s',
        fontFamily: 'Poppins',
        '&:hover': { borderColor: '#C62828', color: '#C62828' },
      }}>
        {day}
      </Box>
    );
  })}
</Box>

{/* Time row */}
<Typography variant="body2" fontWeight={600} color="#555" mb={1}>
  Available Time Window <Typography component="span" variant="caption" color="text.secondary">(optional)</Typography>
</Typography>
<Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
  <Box sx={{ flex: 1 }}>
    <Typography variant="caption" color="text.secondary" display="block" mb={0.5}>From</Typography>
    <TextField fullWidth
      name="availableFrom" value={form.availableFrom || ''}
      onChange={handleChange} size="small"
      type="time" InputLabelProps={{ shrink: true }} />
  </Box>
  <Typography color="text.secondary" sx={{ mt: 2 }}>—</Typography>
  <Box sx={{ flex: 1 }}>
    <Typography variant="caption" color="text.secondary" display="block" mb={0.5}>Until</Typography>
    <TextField fullWidth
      name="availableUntil" value={form.availableUntil || ''}
      onChange={handleChange} size="small"
      type="time" InputLabelProps={{ shrink: true }} />
  </Box>
</Box>

            {/* Health & Options */}
            <Typography variant="h6" fontWeight={700}
              color="#C62828" gutterBottom>
              Health & Options
            </Typography>
            <Grid container spacing={1} mb={3}>
              <Grid item xs={12} md={6}>
                <FormControlLabel
                  control={<Checkbox checked={form.hasRecentSurgery}
                    name="hasRecentSurgery"
                    onChange={handleChange} color="error" />}
                  label="Had surgery in last 6 months" />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControlLabel
                  control={<Checkbox checked={form.hasHighBP}
                    name="hasHighBP"
                    onChange={handleChange} color="error" />}
                  label="Have High BP" />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControlLabel
                  control={<Checkbox checked={form.willingToTravel}
                    name="willingToTravel"
                    onChange={handleChange} color="error" />}
                  label="Willing to travel up to 50km (for rare blood)" />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControlLabel
                  control={<Checkbox checked={form.available}
                    name="available"
                    onChange={handleChange} color="error" />}
                  label="Currently available to donate" />
              </Grid>
            </Grid>

            {/* Submit */}
            <Button fullWidth variant="contained"
              size="large" onClick={handleSubmit}
              disabled={loading}
              sx={{
                bgcolor: '#C62828', py: 2,
                fontSize: '1.1rem', fontWeight: 700,
                '&:hover': { bgcolor: '#8E0000' },
              }}>
              {loading
                ? <CircularProgress size={24} color="inherit" />
                : '❤️ Register as Donor'}
            </Button>

          </CardContent>
        </Card>

        {/* Eligibility Info */}
        <Card sx={{ mt: 3, bgcolor: '#FFEBEE', boxShadow: 'none' }}>
          <CardContent>
            <Typography fontWeight={700} color="#C62828" gutterBottom>
              ✅ Eligibility Criteria
            </Typography>
            {[
              'Age between 18 and 65 years',
              'Weight minimum 50 kg',
              'No donation in last 90 days',
              'No recent surgery or illness',
              'Not diabetic or high BP patient',
            ].map((item, i) => (
              <Typography key={i} variant="body2" sx={{ mb: 0.5 }}>
                • {item}
              </Typography>
            ))}
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}

export default Donate;