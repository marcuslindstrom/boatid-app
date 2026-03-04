import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/layout/Header';
import { AuthProvider } from './contexts/AuthContext';
import { LoginForm } from './components/auth/LoginForm';
import { SignupForm } from './components/auth/SignupForm';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { useBoats } from './hooks/useBoats';
import { useDocuments } from './hooks/useDocuments';
import { useServiceEvents } from './hooks/useServiceEvents';
import { BoatCard } from './components/boats/BoatCard';
import { BoatForm } from './components/boats/BoatForm';
import { DocumentUpload } from './components/documents/DocumentUpload';
import { DocumentList } from './components/documents/DocumentList';
import { ServiceEventForm } from './components/service/ServiceEventForm';
import { ServiceTimeline } from './components/service/ServiceTimeline';
import { Boat, ServiceEvent } from './types';

const HomePage = () => {
  const { boats, loading, createBoat, updateBoat, deleteBoat } = useBoats();
  const [showForm, setShowForm] = useState(false);
  const [editingBoat, setEditingBoat] = useState<Boat | undefined>();

  const handleSubmit = async (boatData: Partial<Boat>) => {
    if (editingBoat) {
      await updateBoat(editingBoat.id, boatData);
    } else {
      await createBoat(boatData);
    }
    setShowForm(false);
    setEditingBoat(undefined);
  };

  const handleEdit = (boat: Boat) => {
    setEditingBoat(boat);
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingBoat(undefined);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center text-gray-600">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Boats</h1>
            <p className="mt-2 text-gray-600">
              Manage your boat profiles and access documents, service logs, and more
            </p>
          </div>
          {!showForm && (
            <button
              onClick={() => setShowForm(true)}
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              Add Boat
            </button>
          )}
        </div>

        {showForm && (
          <div className="mb-8 bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">
              {editingBoat ? 'Edit Boat' : 'Add New Boat'}
            </h2>
            <BoatForm
              boat={editingBoat}
              onSubmit={handleSubmit}
              onCancel={handleCancel}
            />
          </div>
        )}

        {boats.length === 0 && !showForm ? (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <h3 className="text-lg font-medium text-gray-900 mb-2">No boats yet</h3>
            <p className="text-gray-600 mb-6">
              Get started by adding your first boat profile
            </p>
            <button
              onClick={() => setShowForm(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              Add Your First Boat
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {boats.map((boat) => (
              <BoatCard
                key={boat.id}
                boat={boat}
                onEdit={handleEdit}
                onDelete={deleteBoat}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const DocumentsPage = () => {
  const { boats } = useBoats();
  const [selectedBoatId, setSelectedBoatId] = useState<string>('');
  const { documents, loading, uploadDocument, deleteDocument } = useDocuments(
    selectedBoatId || undefined
  );

  React.useEffect(() => {
    if (boats.length > 0 && !selectedBoatId) {
      setSelectedBoatId(boats[0].id);
    }
  }, [boats, selectedBoatId]);

  if (boats.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No boats found
            </h3>
            <p className="text-gray-600">
              Please add a boat first to manage documents
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Documents</h1>
          <label htmlFor="boat-select" className="block text-sm font-medium text-gray-700 mb-2">
            Select Boat
          </label>
          <select
            id="boat-select"
            value={selectedBoatId}
            onChange={(e) => setSelectedBoatId(e.target.value)}
            className="block w-full max-w-xs rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
          >
            {boats.map((boat) => (
              <option key={boat.id} value={boat.id}>
                {boat.name}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <DocumentUpload onUpload={uploadDocument} />
          </div>
          <div className="lg:col-span-2">
            {loading ? (
              <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                <p className="text-gray-600">Loading documents...</p>
              </div>
            ) : (
              <DocumentList documents={documents} onDelete={deleteDocument} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const ServicePage = () => {
  const { boats } = useBoats();
  const [selectedBoatId, setSelectedBoatId] = useState<string>('');
  const { events, loading, createEvent, updateEvent, deleteEvent } = useServiceEvents(
    selectedBoatId || undefined
  );
  const [showForm, setShowForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState<ServiceEvent | undefined>();

  React.useEffect(() => {
    if (boats.length > 0 && !selectedBoatId) {
      setSelectedBoatId(boats[0].id);
    }
  }, [boats, selectedBoatId]);

  const handleSubmit = async (eventData: Partial<ServiceEvent>) => {
    if (editingEvent) {
      await updateEvent(editingEvent.id, eventData);
    } else {
      await createEvent(eventData);
    }
    setShowForm(false);
    setEditingEvent(undefined);
  };

  const handleEdit = (event: ServiceEvent) => {
    setEditingEvent(event);
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingEvent(undefined);
  };

  if (boats.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No boats found
            </h3>
            <p className="text-gray-600">
              Please add a boat first to track service history
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Service Log</h1>
            <p className="mt-2 text-gray-600">
              Track maintenance and service history
            </p>
          </div>
          {!showForm && (
            <button
              onClick={() => setShowForm(true)}
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              Add Service Event
            </button>
          )}
        </div>

        <div className="mb-6">
          <label htmlFor="boat-select" className="block text-sm font-medium text-gray-700 mb-2">
            Select Boat
          </label>
          <select
            id="boat-select"
            value={selectedBoatId}
            onChange={(e) => setSelectedBoatId(e.target.value)}
            className="block w-full max-w-xs rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
          >
            {boats.map((boat) => (
              <option key={boat.id} value={boat.id}>
                {boat.name}
              </option>
            ))}
          </select>
        </div>

        {showForm && (
          <div className="mb-6 bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">
              {editingEvent ? 'Edit Service Event' : 'Add Service Event'}
            </h2>
            <ServiceEventForm
              event={editingEvent}
              onSubmit={handleSubmit}
              onCancel={handleCancel}
            />
          </div>
        )}

        {loading ? (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <p className="text-gray-600">Loading service history...</p>
          </div>
        ) : (
          <ServiceTimeline events={events} onEdit={handleEdit} onDelete={deleteEvent} />
        )}
      </div>
    </div>
  );
};

const RemindersPage = () => (
  <div className="min-h-screen bg-gray-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Reminders</h1>
      <div className="bg-white rounded-lg shadow-sm p-6">
        <p className="text-gray-600">Maintenance reminders coming soon...</p>
      </div>
    </div>
  </div>
);

const CostsPage = () => (
  <div className="min-h-screen bg-gray-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Costs</h1>
      <div className="bg-white rounded-lg shadow-sm p-6">
        <p className="text-gray-600">Cost tracking coming soon...</p>
      </div>
    </div>
  </div>
);

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route
            path="/*"
            element={
              <ProtectedRoute>
                <div className="min-h-screen bg-gray-50">
                  <Header />
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/documents" element={<DocumentsPage />} />
                    <Route path="/service" element={<ServicePage />} />
                    <Route path="/reminders" element={<RemindersPage />} />
                    <Route path="/costs" element={<CostsPage />} />
                  </Routes>
                </div>
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
