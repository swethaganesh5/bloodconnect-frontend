import React, { useState, useEffect, useRef } from 'react';
import {
  Box, Typography, Grid, Card, CardContent,
  TextField, Button, MenuItem, CircularProgress, Chip
} from '@mui/material';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import { createBloodRequest } from '../api';
import toast from 'react-hot-toast';

const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

const urgencyOptions = [
  { label: 'Critical',  sub: 'Needed right now',  value: 'CRITICAL',  color: '#C62828', bg: '#FFEBEE', dot: '🔴' },
  { label: 'Urgent',    sub: 'Within 6 hours',    value: 'URGENT',    color: '#E65100', bg: '#FFF3E0', dot: '🟠' },
  { label: 'Standard',  sub: 'Within 24 hours',   value: 'STANDARD',  color: '#1565C0', bg: '#E3F2FD', dot: '🔵' },
];

const Label = ({ children, required }) => (
  <Typography sx={{
    fontWeight: 800, fontSize: '0.97rem', color: '#1a1a1a',
    mb: 1, display: 'block', letterSpacing: '-0.1px',
  }}>
    {children}
    {required && <span style={{ color: '#C62828', marginLeft: 4 }}>*</span>}
  </Typography>
);

const inputSx = {
  '& .MuiOutlinedInput-root': {
    borderRadius: 2, fontSize: '0.97rem', bgcolor: 'white',
  },
};

export default function RequestBlood() {
  const [loading,       setLoading]       = useState(false);
  const [success,       setSuccess]       = useState(false);
  const [locating,      setLocating]      = useState(false);
  const [mapReady,      setMapReady]      = useState(false);
  const [matchedDonors, setMatchedDonors] = useState([]);
  const mapRef     = useRef(null);
  const leafletRef = useRef(null);
  const markerRef  = useRef(null);

  const [form, setForm] = useState({
    patientName: '', bloodGroup: '', hospital: '',
    phone: '', urgency: '', unitsRequired: '1',
    notes: '', latitude: '', longitude: '', city: '',
  });

  const handleChange = (e) =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  // ── MAP INIT ──
  useEffect(() => {
    if (!mapRef.current || leafletRef.current) return;
    if (!document.querySelector('#leaflet-css')) {
      const link = document.createElement('link');
      link.id = 'leaflet-css'; link.rel = 'stylesheet';
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      document.head.appendChild(link);
    }
    const makeIcon = () => window.L.divIcon({
      html: `<div style="width:22px;height:22px;background:#C62828;border-radius:50% 50% 50% 0;transform:rotate(-45deg);border:3px solid white;box-shadow:0 2px 8px rgba(0,0,0,0.4);"></div>`,
      iconSize: [22, 22], iconAnchor: [11, 22], className: '',
    });
    const initMap = () => {
      try {
        if (!window.L || leafletRef.current) return;
        const L = window.L;
        const map = L.map(mapRef.current).setView([20.5937, 78.9629], 5);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap',
        }).addTo(map);
        map.on('click', async (e) => {
          const { lat, lng } = e.latlng;
          if (markerRef.current) markerRef.current.remove();
          markerRef.current = L.marker([lat, lng], { icon: makeIcon() }).addTo(map);
          let city = '';
          try {
            const res  = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`);
            const data = await res.json();
            city = data.address?.city || data.address?.town || data.address?.village || '';
          } catch {}
          setForm(prev => ({ ...prev, latitude: lat, longitude: lng, city }));
          toast.success(city ? `📍 ${city} selected` : '📍 Location set!');
        });
        leafletRef.current = map;
        setMapReady(true);
      } catch (err) { console.error(err); }
    };
    if (window.L) { initMap(); }
    else if (!document.querySelector('#leaflet-js')) {
      const script = document.createElement('script');
      script.id = 'leaflet-js';
      script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
      script.onload = initMap;
      script.onerror = () => setMapReady(true);
      document.head.appendChild(script);
    }
    return () => {
      if (leafletRef.current) { leafletRef.current.remove(); leafletRef.current = null; }
    };
  }, []);

  // ── AUTO DETECT ──
  const detectLocation = () => {
    if (!navigator.geolocation) { toast.error('Geolocation not supported'); return; }
    setLocating(true);
    navigator.geolocation.getCurrentPosition(async (pos) => {
      const { latitude: lat, longitude: lng } = pos.coords;
      let city = '';
      try {
        const res  = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`);
        const data = await res.json();
        city = data.address?.city || data.address?.town || data.address?.village || '';
      } catch {}
      setForm(prev => ({ ...prev, latitude: lat, longitude: lng, city }));
      if (leafletRef.current && window.L) {
        leafletRef.current.setView([lat, lng], 14);
        if (markerRef.current) markerRef.current.remove();
        markerRef.current = window.L.marker([lat, lng], {
          icon: window.L.divIcon({
            html: `<div style="width:22px;height:22px;background:#C62828;border-radius:50% 50% 50% 0;transform:rotate(-45deg);border:3px solid white;box-shadow:0 2px 8px rgba(0,0,0,0.4);"></div>`,
            iconSize: [22, 22], iconAnchor: [11, 22], className: '',
          }),
        }).addTo(leafletRef.current);
      }
      toast.success(city ? `📍 ${city} detected!` : '📍 Location detected!');
      setLocating(false);
    }, () => { toast.error('Allow location access and try again.'); setLocating(false); });
  };

  // ── SUBMIT ──
  const handleSubmit = async () => {
    if (!form.patientName || !form.bloodGroup || !form.hospital || !form.phone || !form.urgency) {
      toast.error('Please fill all required fields!'); return;
    }
    if (!form.latitude || !form.longitude) {
      toast.error('Please pin your location on the map!'); return;
    }
    setLoading(true);
    try {
      const res = await createBloodRequest(form);
      setMatchedDonors(res.data.matchedDonors || []);
      setSuccess(true);
      toast.success('Request sent! Donors are being notified.');
    } catch { toast.error('Failed. Check if backend is running.'); }
    setLoading(false);
  };

  const resetForm = () => {
    setSuccess(false);
    setMatchedDonors([]);
    setForm({ patientName:'', bloodGroup:'', hospital:'', phone:'', urgency:'', unitsRequired:'1', notes:'', latitude:'', longitude:'', city:'' });
    if (markerRef.current) { markerRef.current.remove(); markerRef.current = null; }
    if (leafletRef.current) leafletRef.current.setView([20.5937, 78.9629], 5);
  };

  // ── SUCCESS SCREEN ──
  if (success) {
    return (
      <Box sx={{ minHeight: '100vh', bgcolor: '#f9f9f9', display: 'flex', alignItems: 'center', justifyContent: 'center', p: 3 }}>
        <Box sx={{ maxWidth: 500, width: '100%', textAlign: 'center' }}>
          <Box sx={{ width: 96, height: 96, borderRadius: '50%', bgcolor: '#E8F5E9', display: 'flex', alignItems: 'center', justifyContent: 'center', mx: 'auto', mb: 3 }}>
            <CheckCircleIcon sx={{ fontSize: 56, color: '#2E7D32' }} />
          </Box>
          <Typography sx={{ fontWeight: 900, fontSize: '2rem', mb: 1 }}>Request Sent!</Typography>
          <Typography color="text.secondary" fontSize="1rem" mb={4}>
            Nearest <strong style={{ color: '#C62828' }}>{form.bloodGroup}</strong> donors near{' '}
            <strong>{form.hospital}</strong> are being notified by email right now.
          </Typography>

          {/* ── Request Summary ── */}
          <Card sx={{ borderRadius: 3, border: '1px solid #FFEBEE', boxShadow: 'none', mb: 3, textAlign: 'left' }}>
            <CardContent sx={{ p: 3 }}>
              <Typography sx={{ fontWeight: 900, fontSize: '1rem', color: '#C62828', mb: 2 }}>
                Request Summary
              </Typography>
              {[
                ['Patient',     form.patientName],
                ['Blood Group', form.bloodGroup],
                ['Units',       form.unitsRequired],
                ['Hospital',    form.hospital],
                ['Phone',       form.phone],
                ['Urgency',     form.urgency],
                ['Location',    form.city || 'Pinned on map'],
              ].map(([label, value], i) => (
                <Box key={i} sx={{ display: 'flex', justifyContent: 'space-between', py: 1, borderBottom: i < 6 ? '1px solid #f5f5f5' : 'none' }}>
                  <Typography variant="body2" color="text.secondary">{label}</Typography>
                  <Typography variant="body2" fontWeight={700}>{value}</Typography>
                </Box>
              ))}
            </CardContent>
          </Card>

          {/* ── Matched Donors List ── */}
          {matchedDonors.length > 0 ? (
            <Card sx={{ borderRadius: 3, border: '1px solid #E3F2FD', boxShadow: 'none', mb: 3, textAlign: 'left' }}>
              <CardContent sx={{ p: 3 }}>
                <Typography sx={{ fontWeight: 900, fontSize: '1rem', color: '#1565C0', mb: 2 }}>
                  🩸 {matchedDonors.length} Eligible Donor{matchedDonors.length > 1 ? 's' : ''} Notified
                </Typography>
                {matchedDonors.map((donor, i) => (
                  <Box key={i} sx={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    py: 1.5, borderBottom: i < matchedDonors.length - 1 ? '1px solid #f5f5f5' : 'none'
                  }}>
                    <Box>
                      <Typography fontWeight={700} fontSize="0.95rem">{donor.name}</Typography>
                      <Typography fontSize="0.82rem" color="text.secondary">
                        {donor.bloodGroup} • 📞 {donor.phone}
                      </Typography>
                    </Box>
                    <Chip label={donor.bloodGroup} size="small"
                      sx={{ bgcolor: '#C62828', color: 'white', fontWeight: 800 }} />
                  </Box>
                ))}
              </CardContent>
            </Card>
          ) : (
            <Card sx={{ borderRadius: 3, border: '1px solid #FFF3E0', boxShadow: 'none', mb: 3 }}>
              <CardContent sx={{ p: 3 }}>
                <Typography sx={{ fontWeight: 700, fontSize: '0.95rem', color: '#E65100' }}>
                  ⚠️ No matching donors found nearby. Try registering more donors or expanding the search area.
                </Typography>
              </CardContent>
            </Card>
          )}

          <Button fullWidth variant="contained" onClick={resetForm}
            sx={{ bgcolor: '#C62828', py: 1.6, borderRadius: 2.5, fontWeight: 700, fontSize: '1rem', textTransform: 'none', '&:hover': { bgcolor: '#8E0000' } }}>
            Submit Another Request
          </Button>
        </Box>
      </Box>
    );
  }

  // ── MAIN FORM ──
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f5f5f5', fontFamily: 'Poppins, sans-serif' }}>

      {/* ── HEADER ── */}
      <Box sx={{ background: 'linear-gradient(135deg, #8E0000 0%, #C62828 100%)', color: 'white', py: 7, textAlign: 'center', px: 3 }}>
        <LocalHospitalIcon sx={{ fontSize: 54, mb: 1.5 }} />
        <Typography sx={{ fontWeight: 900, fontSize: { xs: '2rem', md: '2.8rem' }, letterSpacing: '-0.5px', mb: 1 }}>
          Request Blood
        </Typography>
        <Typography sx={{ opacity: 0.9, fontSize: '1.05rem', fontWeight: 500 }}>
          No login needed — AI finds the nearest donors instantly
        </Typography>
      </Box>

      {/* ── STEPS BAR ── */}
      <Box sx={{ bgcolor: '#1a1a1a', py: 2.5 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2, flexWrap: 'wrap', px: 3 }}>
          {[
            { icon: '📋', text: 'Fill patient details' },
            { icon: '📍', text: 'Pin hospital on map' },
            { icon: '🤖', text: 'AI matches donors' },
            { icon: '📧', text: 'Donors get alerted' },
          ].map((s, i) => (
            <React.Fragment key={i}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
                <Typography fontSize="1.1rem">{s.icon}</Typography>
                <Typography sx={{ color: '#ccc', fontSize: '0.88rem', fontWeight: 500 }}>{s.text}</Typography>
              </Box>
              {i < 3 && <Typography sx={{ color: '#555', fontSize: '1rem' }}>›</Typography>}
            </React.Fragment>
          ))}
        </Box>
      </Box>

      {/* ── FORM CARD ── */}
      <Box sx={{ maxWidth: 780, mx: 'auto', px: { xs: 2, md: 4 }, py: 5 }}>
        <Card sx={{ borderRadius: 4, boxShadow: '0 4px 30px rgba(0,0,0,0.09)', border: '1px solid #FFEBEE' }}>
          <CardContent sx={{ p: { xs: 3, md: 5 } }}>

            <Typography sx={{ fontWeight: 900, fontSize: { xs: '1.5rem', md: '1.8rem' }, color: '#111', mb: 0.5, letterSpacing: '-0.3px' }}>
              Patient Details
            </Typography>
            <Typography color="text.secondary" fontSize="0.93rem" mb={4}>
              Fields marked <span style={{ color: '#C62828', fontWeight: 800 }}>*</span> are required
            </Typography>

            <Box mb={3.5}>
              <Label required>Patient Name</Label>
              <TextField fullWidth placeholder="Full name of the patient"
                name="patientName" value={form.patientName}
                onChange={handleChange} sx={inputSx} />
            </Box>

            <Grid container spacing={3} mb={3.5}>
              <Grid item xs={12} sm={6}>
                <Label required>Blood Group</Label>
                <TextField fullWidth select
                  name="bloodGroup" value={form.bloodGroup}
                  onChange={handleChange} sx={inputSx}>
                  <MenuItem value=""><em>Select blood group</em></MenuItem>
                  {bloodGroups.map(g => <MenuItem key={g} value={g}>{g}</MenuItem>)}
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Label required>Units Required</Label>
                <TextField fullWidth type="number"
                  name="unitsRequired" value={form.unitsRequired}
                  onChange={handleChange}
                  inputProps={{ min: 1, max: 20 }} sx={inputSx} />
              </Grid>
            </Grid>

            <Box mb={3.5}>
              <Label required>Hospital Name</Label>
              <TextField fullWidth placeholder="e.g. Apollo Hospital, Chennai"
                name="hospital" value={form.hospital}
                onChange={handleChange} sx={inputSx} />
            </Box>

            <Box mb={3.5}>
              <Label required>Contact Phone</Label>
              <TextField fullWidth placeholder="10-digit mobile number"
                name="phone" value={form.phone}
                onChange={handleChange}
                inputProps={{ maxLength: 10 }} sx={inputSx} />
            </Box>

            <Box mb={3.5}>
              <Label required>Urgency Level</Label>
              <Grid container spacing={2}>
                {urgencyOptions.map((u) => (
                  <Grid item xs={4} key={u.value}>
                    <Box onClick={() => setForm(prev => ({ ...prev, urgency: u.value }))}
                      sx={{
                        p: 2.5, borderRadius: 3, cursor: 'pointer', textAlign: 'center',
                        border: form.urgency === u.value ? `2px solid ${u.color}` : '2px solid #e8e8e8',
                        bgcolor: form.urgency === u.value ? u.bg : '#fafafa',
                        transition: 'all 0.2s',
                        '&:hover': { borderColor: u.color, bgcolor: u.bg },
                      }}>
                      <Typography fontSize="1.6rem" lineHeight={1} mb={1}>{u.dot}</Typography>
                      <Typography sx={{ fontWeight: 800, fontSize: '0.9rem', mb: 0.4, color: form.urgency === u.value ? u.color : '#222' }}>
                        {u.label}
                      </Typography>
                      <Typography sx={{ fontSize: '0.75rem', color: '#888', lineHeight: 1.4 }}>
                        {u.sub}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Box>

            <Box mb={3.5}>
              <Label required>Hospital Location</Label>
              <Typography variant="body2" color="text.secondary" mb={1.5} fontSize="0.88rem">
                Click anywhere on the map to pin, or use the auto-detect button below
              </Typography>
              <Button fullWidth variant="outlined"
                onClick={detectLocation} disabled={locating}
                startIcon={locating ? <CircularProgress size={16} color="inherit" /> : <MyLocationIcon />}
                sx={{
                  mb: 2, py: 1.3, borderRadius: 2,
                  fontWeight: 700, textTransform: 'none', fontSize: '0.95rem',
                  borderColor: form.latitude ? '#2E7D32' : '#C62828',
                  color: form.latitude ? '#2E7D32' : '#C62828',
                  bgcolor: form.latitude ? '#F1F8E9' : 'transparent',
                  '&:hover': { bgcolor: form.latitude ? '#E8F5E9' : '#FFF5F5' },
                }}>
                {locating ? 'Detecting your location...'
                  : form.latitude ? `✓  ${form.city || 'Location pinned'} — click map to change`
                  : 'Auto Detect My Location'}
              </Button>
              <Box sx={{
                borderRadius: 3, overflow: 'hidden', height: 260,
                border: form.latitude ? '2px solid #C62828' : '2px solid #ddd',
                position: 'relative',
              }}>
                <div ref={mapRef} style={{ width: '100%', height: '100%' }} />
                {!mapReady && (
                  <Box sx={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: '#f0f0f0' }}>
                    <CircularProgress size={30} sx={{ color: '#C62828' }} />
                  </Box>
                )}
                {mapReady && !form.latitude && (
                  <Box sx={{
                    position: 'absolute', top: 12, left: '50%', transform: 'translateX(-50%)',
                    bgcolor: 'rgba(0,0,0,0.65)', color: 'white',
                    px: 2.5, py: 0.8, borderRadius: 10,
                    fontSize: '0.8rem', fontWeight: 600,
                    pointerEvents: 'none', whiteSpace: 'nowrap',
                  }}>
                    📍 Tap anywhere on the map to set location
                  </Box>
                )}
              </Box>
            </Box>

            <Box mb={4}>
              <Typography sx={{ fontWeight: 800, fontSize: '0.97rem', color: '#1a1a1a', mb: 1 }}>
                Additional Notes
                <span style={{ fontWeight: 400, color: '#999', fontSize: '0.82rem', marginLeft: 8 }}>(optional)</span>
              </Typography>
              <TextField fullWidth multiline rows={2}
                placeholder="e.g. Patient is in ICU, need donor before 3 PM today"
                name="notes" value={form.notes}
                onChange={handleChange} sx={inputSx} />
            </Box>

            <Box sx={{ bgcolor: '#FFF8F8', borderRadius: 3, p: 3, mb: 3.5, border: '1px solid #FFCDD2' }}>
              <Typography sx={{ fontWeight: 900, fontSize: '0.97rem', color: '#C62828', mb: 2 }}>
                ⚡ What happens after you submit?
              </Typography>
              <Grid container spacing={1.5}>
                {[
                  { num: '1', text: 'Request is received instantly by our system' },
                  { num: '2', text: 'AI finds nearest compatible blood donors' },
                  { num: '3', text: 'Matching donors get an immediate email alert' },
                  { num: '4', text: 'Donor calls you on the number you provided' },
                ].map((s, i) => (
                  <Grid item xs={12} sm={6} key={i}>
                    <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'flex-start' }}>
                      <Box sx={{
                        width: 24, height: 24, borderRadius: '50%',
                        bgcolor: '#C62828', color: 'white',
                        fontSize: '0.72rem', fontWeight: 900, flexShrink: 0,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}>
                        {s.num}
                      </Box>
                      <Typography variant="body2" color="#444" lineHeight={1.7} fontSize="0.9rem">
                        {s.text}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Box>

            <Box sx={{ bgcolor: '#fafafa', borderRadius: 3, p: 3, mb: 4, border: '1px solid #eee' }}>
              <Typography sx={{ fontWeight: 900, fontSize: '0.97rem', color: '#C62828', mb: 2 }}>
                🩸 Quick Blood Compatibility
              </Typography>
              <Grid container spacing={1.5}>
                {[
                  { group: 'O−',  note: 'Universal donor — can give to anyone' },
                  { group: 'AB+', note: 'Universal receiver — accepts all types' },
                  { group: 'O+',  note: 'Can give to A+, B+, O+, AB+' },
                  { group: 'A+',  note: 'Can receive from A+, A−, O+, O−' },
                ].map((r, i) => (
                  <Grid item xs={12} sm={6} key={i}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                      <Chip label={r.group} size="small"
                        sx={{ bgcolor: '#C62828', color: 'white', fontWeight: 800, fontSize: '0.8rem', minWidth: 46 }} />
                      <Typography variant="caption" color="text.secondary" lineHeight={1.6} fontSize="0.84rem">
                        {r.note}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Box>

            <Box sx={{ bgcolor: '#E8F5E9', borderRadius: 3, p: 2.5, border: '1px solid #C8E6C9', mb: 4 }}>
              <Typography sx={{ fontWeight: 900, fontSize: '0.92rem', color: '#2E7D32', mb: 0.5 }}>
                ✅ No Login Required
              </Typography>
              <Typography variant="body2" color="#388E3C" lineHeight={1.7}>
                Emergency platform — anyone can request blood without creating an account. Every second counts.
              </Typography>
            </Box>

            <Button fullWidth variant="contained"
              onClick={handleSubmit} disabled={loading}
              sx={{
                bgcolor: '#C62828', py: 2,
                fontWeight: 900, fontSize: '1.05rem',
                borderRadius: 2.5, textTransform: 'none',
                letterSpacing: 0.3,
                boxShadow: '0 6px 22px rgba(198,40,40,0.38)',
                '&:hover': { bgcolor: '#8E0000', transform: 'translateY(-2px)', boxShadow: '0 10px 30px rgba(198,40,40,0.45)' },
                transition: 'all 0.25s',
              }}>
              {loading
                ? <CircularProgress size={24} color="inherit" />
                : '🚨  Send Emergency Request'}
            </Button>

          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}