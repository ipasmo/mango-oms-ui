import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  IoGridOutline,
  IoCartOutline,
  IoCubeOutline,
  IoPeopleOutline,
  IoSettingsOutline,
} from 'react-icons/io5';
import clsx from 'clsx';

const Sidebar = () => {
  const menuItems = [
    { icon: IoGridOutline, label: 'Dashboard', path: '/admin' },
    { icon: IoCartOutline, label: 'Orders', path: '/admin/orders' },
    { icon: IoCubeOutline, label: 'Products', path: '/admin/products' },
    { icon: IoPeopleOutline, label: 'Users', path: '/admin/users' },
    { icon: IoSettingsOutline, label: 'Settings', path: '/admin/settings' },
  ];
  
  return (
    <aside className="w-64 bg-white border-r border-gray-200 min-h-screen">
      <nav className="p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  clsx(
                    'flex items-center gap-3 px-4 py-3 rounded-lg transition-colors',
                    isActive
                      ? 'bg-primary-50 text-primary-600'
                      : 'text-gray-700 hover:bg-gray-50'
                  )
                }
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;