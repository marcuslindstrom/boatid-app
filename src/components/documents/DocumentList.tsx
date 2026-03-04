import React from 'react';
import { Document } from '../../types';

interface DocumentListProps {
  documents: Document[];
  onDelete: (id: string, fileUrl: string) => void;
}

const getCategoryLabel = (category: Document['category']): string => {
  const labels: Record<Document['category'], string> = {
    receipt: 'Receipt',
    manual: 'Manual',
    insurance: 'Insurance',
    registration: 'Registration',
    protocol: 'Protocol',
    other: 'Other',
  };
  return labels[category];
};

const getCategoryColor = (category: Document['category']): string => {
  const colors: Record<Document['category'], string> = {
    receipt: 'bg-blue-100 text-blue-800',
    manual: 'bg-green-100 text-green-800',
    insurance: 'bg-purple-100 text-purple-800',
    registration: 'bg-yellow-100 text-yellow-800',
    protocol: 'bg-red-100 text-red-800',
    other: 'bg-gray-100 text-gray-800',
  };
  return colors[category];
};

export const DocumentList: React.FC<DocumentListProps> = ({ documents, onDelete }) => {
  if (documents.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-12 text-center">
        <p className="text-gray-600">No documents uploaded yet</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <ul className="divide-y divide-gray-200">
        {documents.map((doc) => (
          <li key={doc.id} className="p-4 hover:bg-gray-50">
            <div className="flex items-center justify-between">
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-3">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(
                      doc.category
                    )}`}
                  >
                    {getCategoryLabel(doc.category)}
                  </span>
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {doc.file_name}
                  </p>
                </div>
                {doc.notes && (
                  <p className="mt-1 text-sm text-gray-500">{doc.notes}</p>
                )}
                <p className="mt-1 text-xs text-gray-400">
                  Uploaded {new Date(doc.created_at).toLocaleDateString()}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <a
                  href={doc.file_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary-600 hover:text-primary-700 font-medium"
                >
                  View
                </a>
                <button
                  onClick={() => {
                    if (window.confirm('Are you sure you want to delete this document?')) {
                      onDelete(doc.id, doc.file_url);
                    }
                  }}
                  className="text-sm text-red-600 hover:text-red-700 font-medium"
                >
                  Delete
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
