import type React from 'react';
import { useState, useEffect } from 'react';
import { useUsers } from '../context/StaffContext';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  editingId: number | null;
  setEditingId: (id: number | null) => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, editingId, setEditingId }) => {
  const { addUser, updateUser, users } = useUsers();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [department, setDepartment] = useState<'surgery' | 'cardiology'>('surgery');
  const [role, setRole] = useState<'doctor' | 'nurse'>('nurse');
  const [isHeadOfDepartment, setIsHeadOfDepartment] = useState(false);

  useEffect(() => {
    if (editingId !== null) {
      const userToEdit = users.find((user) => user.id === editingId);
      if (userToEdit) {
        setFirstName(userToEdit.firstName);
        setLastName(userToEdit.lastName);
        setDepartment(userToEdit.department);
        setRole(userToEdit.role);
        setIsHeadOfDepartment(userToEdit.isHeadOfDepartment || false);
      }
    } else {
      setFirstName('');
      setLastName('');
      setRole('nurse');
      setDepartment('surgery')
      setIsHeadOfDepartment(false);
    }
  }, [editingId, users]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (firstName && lastName && department) {
      if (editingId !== null) {
        updateUser(editingId, {
          id: editingId,
          firstName,
          lastName,
          department,
          role,
          isHeadOfDepartment,
        });
        setEditingId(null);
      } else {
        addUser({
          id: Date.now(),
          firstName,
          lastName,
          department,
          role,
          isHeadOfDepartment,
        });
      }
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-96">
        <h2 className='font-bold text-center'>{editingId ? 'Редактирование данных работника' : 'Добавление работника'}</h2>
        <form onSubmit={handleSubmit}>
          <div>
            {/* biome-ignore lint/a11y/noLabelWithoutControl: <explanation> */}
        <label className='mt-2 mb-2 block'>Имя</label>
            <input
              className="border p-2 rounded w-full"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>
          <div>
            {/* biome-ignore lint/a11y/noLabelWithoutControl: <explanation> */}
        <label className='mt-2 mb-2 block'>Фамилия</label>
            <input
              className="border p-2 rounded w-full"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
          <div>
            {/* biome-ignore lint/a11y/noLabelWithoutControl: <explanation> */}
            <label className='mt-2 mb-2 block'>Отделение</label>
            <select
              className="border p-2 rounded w-full mt-4 mb-4"
              value={department}
              onChange={(e) => setDepartment(e.target.value as 'surgery' | 'cardiology')}
            >
              <option value="surgery">Хирургия</option>
              <option value="cardiology">Кардиология</option>
            </select>
          </div>
          <div>
            {/* biome-ignore lint/a11y/noLabelWithoutControl: <explanation> */}
            <label className='mt-2 mb-2 block'>Должность</label>
            <select
              className="border p-2 rounded w-full mt-4 mb-4"
              value={role}
              onChange={(e) => setRole(e.target.value as 'doctor' | 'nurse')}
            >
              <option value="nurse">Медсестра</option>
              <option value="doctor">Врач</option>
            </select>
          </div>
          {role === 'doctor' && (
            <div>
              <label className='mt-2 mb-2 ml-2 block'>
                <input
                  className='mr-2'
                  type="checkbox"
                  checked={isHeadOfDepartment}
                  onChange={(e) => setIsHeadOfDepartment(e.target.checked)}
                />
                Заведующий отделением
              </label>
            </div>
          )}
          <button className="bg-blue-500 text-white p-2 rounded mt-2 w-full mt-2 mb-2 block" type="submit">
            {editingId ? 'Сохранить' : 'Добавить'}
          </button>
        </form>
        {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
        <button
          className="bg-red-500 text-white p-2 rounded mt-2 w-full"
          onClick={onClose}
        >
          Закрыть
        </button>
      </div>
    </div>
  );
};

export default Modal;
