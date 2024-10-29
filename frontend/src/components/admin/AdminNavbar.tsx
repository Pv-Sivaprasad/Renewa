import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { RootState } from "../../redux/store";
import { logout } from "../../services/userApi";
import React from 'react';
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
} from "@nextui-org/react";
import { toast } from "react-toastify";

export default function NavbarComponent() {
  const dispatch=useDispatch()

  
  
  const navigate=useNavigate()
 
const handleLogout=async()=>{
  
  
  
}

  return (
    <Navbar className="bg-black-900">
      <NavbarBrand>
      
      </NavbarBrand>

      <NavbarContent className="hidden sm:flex text-white space-x-6" justify="center">
        <NavbarItem>
          <Link to="/about" className="text-white">Users</Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link to="/doctors" className="text-secondary">Dashboard</Link>
        </NavbarItem>
        <NavbarItem>
          <Link to="/specialities" className="text-white">Doctors</Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent as="div" justify="end">
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              color="secondary"
              name='Admin'
              size="sm"
              src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold">Signed in as Admin</p>
              <p className="font-semibold">Admin@renewa</p>
            </DropdownItem>
            <DropdownItem key="dashboard">
              <Link to="/users" className="text-current">Users</Link>
            </DropdownItem>
            <DropdownItem key="team_settings">
              <Link to="/doctors" className="text-current">Doctors</Link>
            </DropdownItem>
            <DropdownItem key="analytics">
              <Link to="/appoinments" className="text-current">Appoinments</Link>
            </DropdownItem>
            
            <DropdownItem  onClick={handleLogout} key="logout" color="danger" >
              Logout
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </Navbar>
  );
}



