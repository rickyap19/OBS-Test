import React from 'react';
import { Loader } from 'lucide-react';

export const LoadingSpinner: React.FC = () => (
  <div className="flex items-center justify-center p-12">
    <Loader className="animate-spin text-blue-600" size={48} />
  </div>
);