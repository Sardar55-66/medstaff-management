import { Link, useLocation } from 'react-router-dom';
import { useUsers } from '../context/StaffContext';

const Header: React.FC = () => {
  const { modalHandle } = useUsers();
  const location = useLocation(); // Хук для получения текущего пути

  return (
    <header className="bg-gray-800 text-white py-4">
      <nav className="container mx-auto flex justify-between">
        <Link
          to="/doctors"
          className={`text-lg font-bold ml-6 rounded w-[150px] text-center pt-2 ${
            location.pathname === '/doctors'
              ? 'bg-white text-gray-800 relative top-[20px]'
              : 'hover:bg-white hover:text-gray-800'
          }`}
        >
          Врачи
        </Link>
        <button
          type="button"
          onClick={modalHandle}
          className="w-[300px] h-[50px] bg-white text-black font-bold block rounded hover:bg-gray-800 hover:text-white"
        >
          Добавить персонал
        </button>
        <Link
          to="/nurses"
          className={`text-lg font-bold mr-6 rounded w-[150px] text-center pt-2 ${
            location.pathname === '/nurses'
              ? 'bg-white text-gray-800 relative top-[20px]'
              : 'hover:bg-white hover:text-gray-800'
          }`}
        >
          Медсестры
        </Link>
      </nav>
    </header>
  );
};

export default Header;
