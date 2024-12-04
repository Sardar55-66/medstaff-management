import type React from 'react';
import { useState } from 'react';
import { useUsers } from '../context/StaffContext';
import Modal from '../components/Modal';
// import StaffTable from '../components/StaffTable';

const AddUserPage: React.FC = () => {
  const {modalOpen, modalHandle } = useUsers();
  const [editingId, setEditingId] = useState<number | null>(null);

  return (
    <div className="container mx-auto">
      <Modal
        isOpen={modalOpen}
        onClose={() => modalHandle()}
        editingId={editingId}
        setEditingId={setEditingId}
      />
    </div>
  );
};

export default AddUserPage;
