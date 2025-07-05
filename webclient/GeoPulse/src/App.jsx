import React from "react"; // ← Required for JSX
import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "leaflet/dist/leaflet.css";
import Landing from './pages/common/Landing';
import './App.css';
import SignUp from './pages/common/Signup';
import Login from './pages/common/Login';
import VerifyOTP from './pages/common/VerifyOTP';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AboutUs from './pages/common/AboutUs';
import Contact from './pages/common/Contact';
import Services from './pages/common/Services';
import Feature from './pages/common/Feature';
import UserDashboard from "./pages/user/UserDashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";
import PageNotFound from "./pages/common/PageNotFound";
import AddTag from "./pages/user/AddTag";
import MyTag from "./pages/user/MyTag";
import Profile from "./pages/user/Profile";
import { useAuthStore } from './assets/store/authStore';
import CreateTagPage from "./pages/admin/CreateTag";
import UserTagList from "./pages/user/UserTagList";
import AdminTagList from './pages/admin/AdminTagList';
import TagDetailsPage from "./pages/common/tag/TagDetailsPage";
import GeofenceList from "./pages/common/geofence/GeofenceList";
import GeofenceCreate from "./pages/common/geofence/GeofenceCreate";
import GeofenceEdit from "./pages/common/geofence/GeofenceEdit";
import GeofenceDetailPage from "./pages/common/geofence/GeofenceDetail";
import GeofenceAlertsPage from "./pages/common/geofence/GeofenceAlerts";
import TagCard from "./components/cards/TagCard";
import TagLiveLocation from "./pages/user/TagLiveLocation";


function App() {
  const { user, isAdmin, checkAuth, isAuthenticated } = useAuthStore();
  const [loading, setLoading] = useState(true); // State to track loading


  useEffect(() => {
    const authenticate = async () => {
      await checkAuth();
      console.log("Authentication check completed");
      setLoading(false)
    };
    authenticate();
  }, []);

  if (loading) return <div>Loading...</div>;


  const ProtectedRoute = ({ children }) => {
    if (!isAuthenticated || !user)  {
      console.log("Redirecting to Signin...");
      return <Navigate to="/signin" replace />; // Redirect to signin if not authenticated
    }

    if (user && !user.isVerified) {
      console.log("Redirecting to Verify Email...");
      return <Navigate to="/verify-email" replace />; // Redirect to verify email if user is not verified
    }

    return children; // Render protected route if user is authenticated and verified
  };
  const AdminRoute = ({ children }) => {
    if (!isAdmin) {
      console.log("Redierecting to user Dashboard...");
      return <Navigate to="/user-dashboard" replace />; // Redirect to signin if not authenticated
    }

    return children; // Render protected route if user is authenticated and verified
  };
  const UserRoute = ({ children }) => {
    if (isAdmin) {
      console.log("Redirecting to Signin Admin Dashboard---");
      return <Navigate to="/admin-dashboard" replace />; // Redirect to signin if not authenticated
    }

    return children; // Render protected route if user is authenticated and verified
  };
  return (
    <BrowserRouter>
      {/* TODO: Arrage these route based on the call/module(Example for tag module list them seprately) */}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/test" element={<TagCard />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/admin-signin" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/features" element={<Feature />} />
        <Route path="/services" element={<Services />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/contact" element={<Contact />} />
        {/* TODO: Have to fix this route, that it will only open if user has yet to verify their Email otherwise route back to Landing Page */}
        <Route path="/verify-email" element={<VerifyOTP />} />
        {/* <Route path="/user-dashboard" element={<UserDashboard />} /> */}
        {/* <Route path="/admin-dashboard" element={<AdminDashboard />} /> */}
        

        <Route
          path="/user-dashboard"
          element={
            <ProtectedRoute>
              <UserRoute>
                <UserDashboard />
              </UserRoute>
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-new-tag"
          element={
            <ProtectedRoute>
              <UserRoute>
                <AddTag />
              </UserRoute>
            </ProtectedRoute>
          }
        />
       
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <UserRoute>
                <Profile />
              </UserRoute>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute>
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            </ProtectedRoute>
          }
        />

        <Route
          path="/create-tag"
          element={
            <ProtectedRoute>
              <AdminRoute>
                <CreateTagPage />
              </AdminRoute>
            </ProtectedRoute>
          }
        />

        

        <Route
          path="/my-tags"
          element={
            <ProtectedRoute>
              <UserRoute>
                <MyTag />
              </UserRoute>
            </ProtectedRoute>
          }
        />
        <Route
          path="/tag/live-location"
          element={
            <ProtectedRoute>
              <UserRoute>
                <TagLiveLocation/>
              </UserRoute>
            </ProtectedRoute>
          }
        />

        <Route
          path="/all-tags"
          element={
            <ProtectedRoute>
              <AdminRoute>
                <AdminTagList />
              </AdminRoute>
            </ProtectedRoute>
          }
        />

        <Route
          path="/tag/:id" element={
            <ProtectedRoute>
              <TagDetailsPage />
            </ProtectedRoute>
          }
        />

        {/* Geofence Route */}

        {/* Detail page */}
        <Route
          path="/tag/:tagId/geofence/:geofenceId"
          element={
            <ProtectedRoute>
              <GeofenceDetailPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/tag/:tagId/geofence/:geofenceId/edit"
          element={
            <ProtectedRoute>
              <GeofenceEdit />
            </ProtectedRoute>
          }
        />

        <Route
          path="/tag/:tagId/geofence/create"
          element={
            <ProtectedRoute>
              <GeofenceCreate />
            </ProtectedRoute>
          }
        />

        <Route
          path="/geofence/:tagId/alerts"
          element={
            <ProtectedRoute>
              <GeofenceAlertsPage />
            </ProtectedRoute>
          }
        />

        <Route path="/tag/:tagId/geofences" element={<GeofenceList />} />

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
