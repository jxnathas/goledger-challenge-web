import React from 'react';
import { IoMdCreate, IoMdTrash } from 'react-icons/io';

type ActionButtonsProps = {
  onEdit: () => void;
  onRemove: () => void;
};

export const ActionButtons: React.FC<ActionButtonsProps> = ({ onEdit, onRemove }) => (
  <div className="flex space-x-2">
    <button className="" onClick={onEdit}>
      <IoMdCreate />
    </button>
    <button className="" onClick={onRemove}>
      <IoMdTrash />
    </button>
  </div>
);