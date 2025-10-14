import React, { useState, useEffect } from 'react';
import { MapPin, Upload, List, BarChart3, User, LogOut, Bell, CheckCircle, Clock, AlertCircle } from 'lucide-react';

const CATEGORIES = [
  'Pothole', 'Garbage', 'Streetlight', 'Water Supply', 'Drainage', 'Other'
];

const LANGUAGES = {
  en: {
    home: 'Home',
    reportIssue: 'Report Issue',
    myReports: 'My Reports',
    publicMap: 'Public Map',
    admin: 'Admin Dashboard',
    logout: 'Logout',
    category: 'Category',
    description: 'Description',
    location: 'Location',
    uploadPhoto: 'Upload Photo',
    submit: 'Submit Report',
    status: 'Status',
    pending: 'Pending',
    inProgress: 'In Progress',
    resolved: 'Resolved',
    viewDetails: 'View Details'
  },
  hi: {
    home: 'होम',
    reportIssue: 'समस्या रिपोर्ट करें',
    myReports: 'मेरी रिपोर्ट्स',
    publicMap: 'सार्वजनिक मानचित्र',
    admin: 'एडमिन डैशबोर्ड',
    logout: 'लॉग आउट',
    category: 'श्रेणी',
    description: 'विवरण',
    location: 'स्थान',
    uploadPhoto: 'फोटो अपलोड करें',
    submit: 'रिपोर्ट जमा करें',
    status: 'स्थिति',
    pending: 'लंबित',
    inProgress: 'प्रगति में',
    resolved: 'हल हो गया',
    viewDetails: 'विवरण देखें'
  }
};

const mockReports = [
  {
    id: 1,
    category: 'Pothole',
    description: 'Large pothole on Main Street',
    location: { lat: 30.7333, lng: 76.7794, address: 'Sector 17, Chandigarh' },
    status: 'pending',
    createdAt: new Date('2025-10-10'),
    priority: 'high',
    photo: 'https://via.placeholder.com/300x200?text=Pothole'
  },
  {
    id: 2,
    category: 'Garbage',
    description: 'Garbage pile not collected',
    location: { lat: 30.7194, lng: 76.8103, address: 'Sector 22, Chandigarh' },
    status: 'inProgress',
    createdAt: new Date('2025-10-12'),
    priority: 'medium',
    photo: 'https://via.placeholder.com/300x200?text=Garbage'
  },
  {
    id: 3,
    category: 'Streetlight',
    description: 'Broken streetlight',
    location: { lat: 30.7408, lng: 76.7806, address: 'Sector 35, Chandigarh' },
    status: 'resolved',
    createdAt: new Date('2025-10-08'),
    priority: 'low',
    photo: 'https://via.placeholder.com/300x200?text=Streetlight'
  }
];

const CityCareApp = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [language, setLanguage] = useState('en');
  const [user, setUser] = useState({ role: 'admin', name: 'John Doe' });
  const [reports, setReports] = useState(mockReports);
  const [newReport, setNewReport] = useState({
    category: '',
    description: '',
    photo: null
  });
  
  const t = LANGUAGES[language];

  const captureLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          alert(`Location captured: ${position.coords.latitude}, ${position.coords.longitude}`);
        },
        () => {
          alert('Using default location: Chandigarh, India');
        }
      );
    }
  };

  const handleReportSubmit = () => {
    if (!newReport.category || !newReport.description) {
      alert('Please fill all required fields');
      return;
    }
    const report = {
      id: reports.length + 1,
      ...newReport,
      location: { lat: 30.7333, lng: 76.7794, address: 'Current Location' },
      status: 'pending',
      createdAt: new Date(),
      priority: 'medium',
      photo: newReport.photo || 'https://via.placeholder.com/300x200?text=New+Issue'
    };
    setReports([report, ...reports]);
    setNewReport({ category: '', description: '', photo: null });
    setCurrentPage('myReports');
    alert('Report submitted successfully!');
  };

  const updateReportStatus = (id, newStatus) => {
    setReports(reports.map(r => r.id === id ? { ...r, status: newStatus } : r));
    alert(`Report #${id} status updated to ${newStatus}`);
  };

  const StatusBadge = ({ status }) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      inProgress: 'bg-blue-100 text-blue-800',
      resolved: 'bg-green-100 text-green-800'
    };
    const icons = {
      pending: <Clock className="w-4 h-4" />,
      inProgress: <AlertCircle className="w-4 h-4" />,
      resolved: <CheckCircle className="w-4 h-4" />
    };
    return (
      <span className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1 ${colors[status]}`}>
        {icons[status]}
        {t[status]}
      </span>
    );
  };

  const HomePage = () => (
    <div className="text-center py-16">
      <h1 className="text-5xl font-bold text-blue-900 mb-4">CityCare</h1>
      <p className="text-xl text-gray-600 mb-8">Civic Issue Reporting Portal</p>
      <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <Upload className="w-12 h-12 text-blue-600 mx-auto mb-4" />
          <h3 className="font-bold text-lg mb-2">Report Issues</h3>
          <p className="text-gray-600">Easily report civic problems with photos and GPS</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <MapPin className="w-12 h-12 text-green-600 mx-auto mb-4" />
          <h3 className="font-bold text-lg mb-2">Track Progress</h3>
          <p className="text-gray-600">Monitor your reports in real-time</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <CheckCircle className="w-12 h-12 text-purple-600 mx-auto mb-4" />
          <h3 className="font-bold text-lg mb-2">See Results</h3>
          <p className="text-gray-600">View resolved issues on public map</p>
        </div>
      </div>
      <button
        onClick={() => setCurrentPage('reportIssue')}
        className="mt-8 bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition"
      >
        {t.reportIssue}
      </button>
    </div>
  );

  const ReportIssuePage = () => (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">{t.reportIssue}</h2>
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">{t.category}</label>
          <select
            value={newReport.category}
            onChange={(e) => setNewReport({ ...newReport, category: e.target.value })}
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
          >
            <option value="">Select category</option>
            {CATEGORIES.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">{t.description}</label>
          <textarea
            value={newReport.description}
            onChange={(e) => setNewReport({ ...newReport, description: e.target.value })}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 h-32"
            placeholder="Describe the issue..."
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">{t.uploadPhoto}</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setNewReport({ ...newReport, photo: e.target.files[0]?.name })}
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
          />
        </div>
        <button
          onClick={captureLocation}
          className="w-full mb-4 bg-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700 transition flex items-center justify-center gap-2"
        >
          <MapPin className="w-5 h-5" />
          Capture GPS Location
        </button>
        <button
          onClick={handleReportSubmit}
          className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          {t.submit}
        </button>
      </div>
    </div>
  );

  const MyReportsPage = () => (
    <div>
      <h2 className="text-3xl font-bold text-gray-900 mb-6">{t.myReports}</h2>
      <div className="space-y-4">
        {reports.map(report => (
          <div key={report.id} className="bg-white p-6 rounded-lg shadow-lg flex gap-4">
            <img src={report.photo} alt={report.category} className="w-32 h-32 object-cover rounded" />
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-900">{report.category}</h3>
              <p className="text-gray-600 mb-2">{report.description}</p>
              <p className="text-sm text-gray-500 mb-2">
                <MapPin className="w-4 h-4 inline" /> {report.location.address}
              </p>
              <p className="text-sm text-gray-500 mb-2">
                Reported: {report.createdAt.toLocaleDateString()}
              </p>
              <StatusBadge status={report.status} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const PublicMapPage = () => (
    <div>
      <h2 className="text-3xl font-bold text-gray-900 mb-6">{t.publicMap}</h2>
      <div className="bg-white p-4 rounded-lg shadow-lg">
        <div className="bg-gray-200 h-96 rounded flex items-center justify-center text-gray-600">
          <div className="text-center">
            <MapPin className="w-16 h-16 mx-auto mb-4" />
            <p className="text-lg">Interactive Map with Report Markers</p>
            <p className="text-sm">(Leaflet/Google Maps integration)</p>
          </div>
        </div>
        <div className="mt-4 flex gap-2">
          <button className="px-4 py-2 bg-yellow-100 text-yellow-800 rounded-lg font-semibold">
            Pending ({reports.filter(r => r.status === 'pending').length})
          </button>
          <button className="px-4 py-2 bg-blue-100 text-blue-800 rounded-lg font-semibold">
            In Progress ({reports.filter(r => r.status === 'inProgress').length})
          </button>
          <button className="px-4 py-2 bg-green-100 text-green-800 rounded-lg font-semibold">
            Resolved ({reports.filter(r => r.status === 'resolved').length})
          </button>
        </div>
      </div>
    </div>
  );

  const AdminDashboard = () => (
    <div>
      <h2 className="text-3xl font-bold text-gray-900 mb-6">{t.admin}</h2>
      <div className="grid md:grid-cols-3 gap-6 mb-6">
        <div className="bg-yellow-100 p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-bold text-yellow-800">Pending</h3>
          <p className="text-4xl font-bold text-yellow-900">
            {reports.filter(r => r.status === 'pending').length}
          </p>
        </div>
        <div className="bg-blue-100 p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-bold text-blue-800">In Progress</h3>
          <p className="text-4xl font-bold text-blue-900">
            {reports.filter(r => r.status === 'inProgress').length}
          </p>
        </div>
        <div className="bg-green-100 p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-bold text-green-800">Resolved</h3>
          <p className="text-4xl font-bold text-green-900">
            {reports.filter(r => r.status === 'resolved').length}
          </p>
        </div>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-bold mb-4">Recent Reports</h3>
        <div className="space-y-3">
          {reports.slice(0, 5).map(report => (
            <div key={report.id} className="flex justify-between items-center border-b pb-3">
              <div>
                <p className="font-semibold">{report.category}</p>
                <p className="text-sm text-gray-600">{report.location.address}</p>
              </div>
              <div className="flex gap-2">
                <StatusBadge status={report.status} />
                {report.status === 'pending' && (
                  <button 
                    onClick={() => updateReportStatus(report.id, 'inProgress')}
                    className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    Assign
                  </button>
                )}
                {report.status === 'inProgress' && (
                  <button 
                    onClick={() => updateReportStatus(report.id, 'resolved')}
                    className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                  >
                    Resolve
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white shadow-lg">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <MapPin className="w-8 h-8" />
            <h1 className="text-2xl font-bold">CityCare</h1>
          </div>
          <nav className="flex items-center gap-6">
            <button onClick={() => setCurrentPage('home')} className="hover:underline">{t.home}</button>
            <button onClick={() => setCurrentPage('reportIssue')} className="hover:underline">{t.reportIssue}</button>
            <button onClick={() => setCurrentPage('myReports')} className="hover:underline">{t.myReports}</button>
            <button onClick={() => setCurrentPage('publicMap')} className="hover:underline">{t.publicMap}</button>
            {user.role === 'admin' && (
              <button onClick={() => setCurrentPage('admin')} className="hover:underline">{t.admin}</button>
            )}
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-blue-700 px-2 py-1 rounded"
            >
              <option value="en">EN</option>
              <option value="hi">हिं</option>
            </select>
            <div className="flex items-center gap-2">
              <User className="w-5 h-5" />
              <span>{user.name}</span>
            </div>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {currentPage === 'home' && <HomePage />}
        {currentPage === 'reportIssue' && <ReportIssuePage />}
        {currentPage === 'myReports' && <MyReportsPage />}
        {currentPage === 'publicMap' && <PublicMapPage />}
        {currentPage === 'admin' && <AdminDashboard />}
      </main>

      <footer className="bg-gray-800 text-white py-6 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2025 CityCare. Making cities better, one report at a time.</p>
        </div>
      </footer>
    </div>
  );
};

export default CityCareApp