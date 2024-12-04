import type React from 'react';
import { useState } from 'react';
import { useUsers } from '../context/StaffContext';

interface FormData {
  firstName: string;
  lastName: string;
  department: 'surgery' | 'cardiology';
  role: 'doctor' | 'nurse';
  isHeadOfDepartment?: boolean; // Только для врачей
}

const DoctorsPage: React.FC = () => {
  const { users, deleteUser, updateUser } = useUsers();
  const doctors = users.filter((user) => user.role === 'doctor');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    department: 'surgery',
    role: 'doctor',
  });

  const handleEdit = (doctor: {
    id: number;
    firstName: string;
    lastName: string;
    department: 'surgery' | 'cardiology';
    role: 'doctor' | 'nurse';
    isHeadOfDepartment?: boolean;
  }) => {
    setEditingId(doctor.id);
    setFormData({
      firstName: doctor.firstName,
      lastName: doctor.lastName,
      department: doctor.department,
      role: doctor.role,
      isHeadOfDepartment: doctor.isHeadOfDepartment,
    });
  };

  const handleSave = () => {
    if (editingId !== null) {
      updateUser(editingId, {
        ...formData,
        isHeadOfDepartment: formData.role === 'doctor' ? formData.isHeadOfDepartment : undefined,
        id: editingId,
      });
      setEditingId(null);
      setFormData({ firstName: '', lastName: '', department: 'surgery', role: 'doctor' });
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setFormData({ firstName: '', lastName: '', department: 'surgery', role: 'doctor' });
  };

  return (
    <div>
      <h1 className="text-xl font-bold mb-4 text-center">Врачи</h1>
      {doctors.length === 0 ? (
        <div className="text-center">Нет данных для отображения</div>
      ) : (
        <table className="table-auto w-full border-collapse border border-gray-200 text-left">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2">Имя</th>
              <th className="border border-gray-300 px-4 py-2">Фамилия</th>
              <th className="border border-gray-300 px-4 py-2">Отделение</th>
              <th className="border border-gray-300 px-4 py-2">Должность</th>
              <th className="border border-gray-300 px-2 text-left">Заведующий отделением</th>
              <th className="border border-gray-300 px-4 py-2">Действия</th>
            </tr>
          </thead>
          <tbody>
            {doctors.map((doctor) =>
              editingId === doctor.id ? (
                <tr key={doctor.id} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2">
                    <input
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      className="border px-2 py-1 w-full"
                    />
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <input
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      className="border px-2 py-1 w-full"
                    />
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <select
                      value={formData.department}
                      onChange={(e) =>
                        setFormData({ ...formData, department: e.target.value as 'surgery' | 'cardiology' })
                      }
                      className="border px-2 py-1 w-full"
                    >
                      <option value="surgery">Хирургия</option>
                      <option value="cardiology">Кардиология</option>
                    </select>
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <select
                      value={formData.role}
                      onChange={(e) =>
                        setFormData({ ...formData, role: e.target.value as 'doctor' | 'nurse' })
                      }
                      className="border px-2 py-1 w-full"
                    >
                      <option value="doctor">Врач</option>
                      <option value="nurse">Медсестра</option>
                    </select>
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <input
                      type="checkbox"
                      checked={formData.isHeadOfDepartment || false}
                      disabled={formData.role !== 'doctor'}
                      onChange={(e) =>
                        setFormData({ ...formData, isHeadOfDepartment: e.target.checked })
                      }
                    />
                  </td>
                  <td className="border border-gray-300 px-4 py-2 flex">
                    <button
                      type="button"
                      onClick={handleSave}
                      className="bg-green-500 text-white px-2 py-1 rounded mr-2"
                    >
                      Сохранить
                    </button>
                    <button
                      type="button"
                      onClick={handleCancel}
                      className="bg-gray-500 text-white px-2 py-1 rounded"
                    >
                      Отменить
                    </button>
                  </td>
                </tr>
              ) : (
                <tr key={doctor.id} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2">{doctor.firstName}</td>
                  <td className="border border-gray-300 px-4 py-2">{doctor.lastName}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    {doctor.department === 'surgery' ? 'Хирургия' : 'Кардиология'}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {doctor.role === 'doctor' ? 'Врач' : 'Медсестра'}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-left">
                    {doctor.isHeadOfDepartment ? 'да' : 'нет'}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 flex">
                    <button
                      type="button"
                      onClick={() => handleEdit(doctor)}
                      className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                    >
                      Редактировать
                    </button>
                    <button
                      type="button"
                      onClick={() => deleteUser(doctor.id)}
                      className="bg-red-500 text-white px-2 py-1 rounded"
                    >
                      Удалить
                    </button>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default DoctorsPage;
