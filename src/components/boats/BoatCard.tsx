import React from 'react';
import { Boat } from '../../types';

interface BoatCardProps {
  boat: Boat;
  onEdit: (boat: Boat) => void;
  onDelete: (id: string) => void;
}

export const BoatCard: React.FC<BoatCardProps> = ({ boat, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-gray-900">{boat.name}</h3>
          <div className="mt-2 space-y-1">
            {boat.make && boat.model && (
              <p className="text-sm text-gray-600">
                {boat.make} {boat.model}
              </p>
            )}
            {boat.year && (
              <p className="text-sm text-gray-600">Year: {boat.year}</p>
            )}
            {boat.hin && (
              <p className="text-sm text-gray-500">HIN: {boat.hin}</p>
            )}
          </div>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => onEdit(boat)}
            className="text-sm text-primary-600 hover:text-primary-700 font-medium"
          >
            Edit
          </button>
          <button
            onClick={() => {
              if (window.confirm('Are you sure you want to delete this boat?')) {
                onDelete(boat.id);
              }
            }}
            className="text-sm text-red-600 hover:text-red-700 font-medium"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};
