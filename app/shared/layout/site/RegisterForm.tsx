import {
  useState,
  ChangeEvent,
  Dispatch,
  SetStateAction,
  MouseEvent,
} from 'react';
import {
  Box,
  TextField,
  InputAdornment,
  IconButton,
  Button,
  Typography,
  Checkbox,
  Link,
  CircularProgress,
  Menu,
  MenuItem,
} from '@mui/material';
import {
  PersonOutline, MailOutline, SmartphoneOutlined, VisibilityOutlined, VisibilityOffOutlined,
} from '@mui/icons-material';
import countryCodes from '@/app/mocks/countryCodes';

export default function RegisterForm({
  onRegister,
  loading,
  termsAccepted,
  onCheckboxChange,
  userData,
  setUserData,
  userErrors,
}: {
  onRegister: () => void,
  loading: boolean,
  termsAccepted: boolean,
  // eslint-disable-next-line no-unused-vars
  onCheckboxChange: (e: ChangeEvent<HTMLInputElement>) => void,
  userData: {
    curp: string,
    correo: string,
    celular: string,
    password: string,
  },
  setUserData: Dispatch<SetStateAction<{
    curp: string,
    correo: string,
    celular: string,
    password: string,
  }>>,
  userErrors: {
    curpError: string,
    emailError: string,
    celularError: string,
    passwordError: string,
  },
}) {
  const [showPassword, setShowPassword] = useState(false);
  const [countryCode, setCountryCode] = useState<{
    code: string; label: string }>({ code: '52', label: '🇲🇽 +52' });
  const [rawPhoneNumber, setRawPhoneNumber] = useState('');
  const [curpError, setCurpError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [celularError, setCelularError] = useState('');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleCountryMenuClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCountrySelect = (country: { code: string; label: string }) => {
    setCountryCode(country);
    setAnchorEl(null);
  };

  const handleCelularChange = (e: ChangeEvent<HTMLInputElement>) => {
    const rawNumber = e.target.value.replace(/[^0-9]/g, '');
    setRawPhoneNumber(rawNumber);
  };

  const handleCelularBlur = () => {
    const formattedCelular = `${countryCode.code}-${rawPhoneNumber}`;
    if (!/^\d{2,3}-\d{10}$/.test(formattedCelular)) {
      setCelularError('El número de celular debe tener 10 dígitos.');
    } else {
      setCelularError('');
      setUserData((prevData) => ({
        ...prevData,
        celular: formattedCelular,
      }));
    }
  };

  const isValidCurp = (crp: string) => crp.length === 18;
  const handleCurpBlur = () => {
    if (!isValidCurp(userData.curp)) {
      setCurpError('La CURP debe tener exactamente 18 caracteres.');
    } else {
      setCurpError('');
    }
  };

  const isValidEmail = (correo: string) => /\S+@\S+\.\S+/.test(correo);
  const handleEmailBlur = () => {
    if (!isValidEmail(userData.correo)) {
      setEmailError('Ingrese un correo electrónico válido.');
    } else {
      setEmailError('');
    }
  };

  const handleRegister = () => {
    const formattedCelular = `${countryCode.code}-${rawPhoneNumber}`;
    setUserData((prevData) => ({
      ...prevData,
      celular: formattedCelular,
    }));
    onRegister();
  };

  return (
    <>
      <TextField
        label='CURP'
        variant='outlined'
        fullWidth
        placeholder='CURP'
        value={userData.curp}
        onChange={(e) => setUserData(
          (prevData) => ({ ...prevData, curp: e.target.value.toUpperCase() }),
        )}
        onBlur={handleCurpBlur}
        error={Boolean(curpError)}
        helperText={curpError}
        InputProps={{
          endAdornment: (
            <InputAdornment position='end'>
              <PersonOutline />
            </InputAdornment>
          ),
        }}
      />
      <TextField
        label='Correo'
        variant='outlined'
        fullWidth
        placeholder='Correo electrónico'
        value={userData.correo}
        onChange={(e) => setUserData((prevData) => ({ ...prevData, correo: e.target.value }))}
        onBlur={handleEmailBlur}
        error={Boolean(emailError)}
        helperText={emailError}
        InputProps={{
          endAdornment: (
            <InputAdornment position='end'>
              <MailOutline />
            </InputAdornment>
          ),
        }}
      />
      <TextField
        label='Celular'
        variant='outlined'
        fullWidth
        placeholder='Celular'
        value={rawPhoneNumber}
        onChange={handleCelularChange}
        onBlur={handleCelularBlur}
        error={Boolean(celularError)}
        helperText={celularError || userErrors.celularError}
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              <Box
                onClick={handleCountryMenuClick}
                sx={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
              >
                <Typography>{countryCode.label}</Typography>
              </Box>
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position='end'>
              <SmartphoneOutlined />
            </InputAdornment>
          ),
        }}
      />
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        MenuListProps={{
          style: {
            maxHeight: 200,
            width: '20ch',
          },
        }}
      >
        {countryCodes.map((country) => (
          <MenuItem key={country.code} onClick={() => handleCountrySelect(country)}>
            {country.label}
          </MenuItem>
        ))}
      </Menu>
      <TextField
        label='Contraseña'
        variant='outlined'
        type={showPassword ? 'text' : 'password'}
        fullWidth
        value={userData.password}
        onChange={(e) => setUserData((prevData) => ({ ...prevData, password: e.target.value }))}
        error={Boolean(userErrors.passwordError)}
        helperText={userErrors.passwordError}
        InputProps={{
          endAdornment: (
            <InputAdornment position='end'>
              <IconButton onClick={togglePasswordVisibility} edge='end'>
                {showPassword ? <VisibilityOutlined /> : <VisibilityOffOutlined />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Checkbox
          checked={termsAccepted}
          onChange={onCheckboxChange}
        />
        <Typography>
          Acepto los
          {' '}
          <Link
            href='/terminos'
            target='_blank'
            rel='noopener noreferrer'
            color='primary'
            sx={{
              textDecoration: 'underline',
            }}
          >
            términos y condiciones de privacidad
          </Link>
        </Typography>
      </Box>
      <Button
        variant='contained'
        color='primary'
        fullWidth
        onClick={handleRegister}
        disabled={!termsAccepted || loading}
        sx={{
          py: 2,
          textTransform: 'capitalize',
          borderRadius: '10px',
          backgroundColor: '#32169b',
          '&:hover': { backgroundColor: '#14005E' },
          '&.Mui-disabled': {
            backgroundColor: '#32169b',
            color: '#fff',
            opacity: 1,
          },
        }}
      >
        {loading ? <CircularProgress size={24} color='inherit' /> : 'Registrate'}
      </Button>
    </>
  );
}
