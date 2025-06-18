import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// Layout components
import Layout from './components/layout/Layout';

// Authentication components
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ForgotPassword from './pages/auth/ForgotPassword';
import ResetPassword from './pages/auth/ResetPassword';

// Dashboard components
import Dashboard from './pages/dashboard/Dashboard';

// Venue management
import VenueList from './pages/venues/VenueList';
import VenueDetail from './pages/venues/VenueDetail';
import VenueForm from './pages/venues/VenueForm';

// Contact management
import ContactList from './pages/contacts/ContactList';
import ContactDetail from './pages/contacts/ContactDetail';
import ContactForm from './pages/contacts/ContactForm';

// Performance management
import PerformanceList from './pages/performances/PerformanceList';
import PerformanceDetail from './pages/performances/PerformanceDetail';
import PerformanceForm from './pages/performances/PerformanceForm';

// Communication management
import CommunicationList from './pages/communications/CommunicationList';
import CommunicationDetail from './pages/communications/CommunicationDetail';
import CommunicationForm from './pages/communications/CommunicationForm';

// Contract management
import ContractList from './pages/contracts/ContractList';
import ContractDetail from './pages/contracts/ContractDetail';
import ContractForm from './pages/contracts/ContractForm';

// Payment management
import PaymentList from './pages/payments/PaymentList';
import PaymentDetail from './pages/payments/PaymentDetail';
import PaymentForm from './pages/payments/PaymentForm';

// Analytics
import Analytics from './pages/analytics/Analytics';

// Settings
import Settings from './pages/settings/Settings';
import Profile from './pages/settings/Profile';

// Context providers
import { AuthProvider } from './context/AuthContext';

// Create theme
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#3f51b5',
    },
    secondary: {
      main: '#f50057',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: [
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
  },
});

// Protected route component
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('token');
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Router>
          <Routes>
            {/* Public routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            
            {/* Protected routes */}
            <Route path="/" element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }>
              <Route index element={<Dashboard />} />
              
              {/* Venue routes */}
              <Route path="venues" element={<VenueList />} />
              <Route path="venues/new" element={<VenueForm />} />
              <Route path="venues/:id" element={<VenueDetail />} />
              <Route path="venues/:id/edit" element={<VenueForm />} />
              
              {/* Contact routes */}
              <Route path="contacts" element={<ContactList />} />
              <Route path="contacts/new" element={<ContactForm />} />
              <Route path="contacts/:id" element={<ContactDetail />} />
              <Route path="contacts/:id/edit" element={<ContactForm />} />
              
              {/* Performance routes */}
              <Route path="performances" element={<PerformanceList />} />
              <Route path="performances/new" element={<PerformanceForm />} />
              <Route path="performances/:id" element={<PerformanceDetail />} />
              <Route path="performances/:id/edit" element={<PerformanceForm />} />
              
              {/* Communication routes */}
              <Route path="communications" element={<CommunicationList />} />
              <Route path="communications/new" element={<CommunicationForm />} />
              <Route path="communications/:id" element={<CommunicationDetail />} />
              <Route path="communications/:id/edit" element={<CommunicationForm />} />
              
              {/* Contract routes */}
              <Route path="contracts" element={<ContractList />} />
              <Route path="contracts/new" element={<ContractForm />} />
              <Route path="contracts/:id" element={<ContractDetail />} />
              <Route path="contracts/:id/edit" element={<ContractForm />} />
              
              {/* Payment routes */}
              <Route path="payments" element={<PaymentList />} />
              <Route path="payments/new" element={<PaymentForm />} />
              <Route path="payments/:id" element={<PaymentDetail />} />
              <Route path="payments/:id/edit" element={<PaymentForm />} />
              
              {/* Analytics route */}
              <Route path="analytics" element={<Analytics />} />
              
              {/* Settings routes */}
              <Route path="settings" element={<Settings />} />
              <Route path="profile" element={<Profile />} />
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;