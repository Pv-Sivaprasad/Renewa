import { useSelector, UseSelector } from "react-redux";
import { Link } from 'react-router-dom'; 
import { RootState } from "../../redux/store";
import React from 'react'
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link as NextUILink,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
} from "@nextui-org/react";

export default function NavbarComponent() {

  const userName=useSelector((state:RootState)=>state.user.userName)
  const email=useSelector((state:RootState)=>state.user.email)
  console.log(userName,'this is in the navbar component');
  
  return (

    

    <Navbar className="bg-purple-950">
      <NavbarBrand>
       
      </NavbarBrand>  

      {/* Main navbar links */}
      <NavbarContent className="hidden sm:flex text-white space-x-6" justify="center">
        <NavbarItem>
          <Link to="/about" className="text-white">
            About
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link to="/doctors" className="text-secondary">
            Doctors
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link to="/specialities" className="text-white">
            Specialities
          </Link>
        </NavbarItem>
      </NavbarContent>

      {/* Avatar and dropdown menu */}
      <NavbarContent as="div" justify="end">
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              color="secondary"
              name="Jason Hughes"
              size="sm"
              src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold">Signed in as {userName || 'Guest'}</p>
              <p className="font-semibold">{ email|| 'Email'}</p>
            </DropdownItem>
            <DropdownItem key="dashboard">
              <Link to="/dashboard" className="text-current">
                Dashboard
              </Link>
            </DropdownItem>
            <DropdownItem key="team_settings">
              <Link to="/team-settings" className="text-current">
                Team Settings
              </Link>
            </DropdownItem>
            <DropdownItem key="analytics">
              <Link to="/analytics" className="text-current">
                Analytics
              </Link>
            </DropdownItem>
            <DropdownItem key="logout" color="danger">
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </Navbar>
  );
}
