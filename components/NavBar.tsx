import { useState } from 'react';
import '@/constants/styles/navbar.css';
import {
  AntDesign,
  Feather,
  FontAwesome6,
  Ionicons,
  MaterialIcons,
} from '@expo/vector-icons';
import { DashboardOptions } from '@/app/Dashboard';
import { logout } from '@/utils/api';
import { router } from 'expo-router';
import { Role } from '@/utils/constant';

type DisplaySettings = {
  [s in DashboardOptions]: boolean;
};
type DisplaySettingNames = {
  [s in DashboardOptions]: DashboardOptions;
};
const DISPLAY_OPTION_NAMES: DisplaySettingNames = {
  student_profile: 'student_profile',
  Evaluation: 'Evaluation',
  employee_profile: 'employee_profile',
  reports: 'reports',
  Link: 'Link',
};
const STUDENT_DISPLAY: DisplaySettings = {
  student_profile: true,
  Evaluation: false,
  employee_profile: false,
  reports: false,
  Link: false,
};
const INSTRUCTOR_DISPLAY: DisplaySettings = {
  student_profile: false,
  Evaluation: true,
  employee_profile: true,
  reports: false,
  Link: false,
};

const ADMIN_DISPLAY: DisplaySettings = {
  student_profile: false,
  Evaluation: false,
  employee_profile: false,
  reports: true,
  Link: true,
};

export const NavBar = ({
  role,
  selected,
  handleSelection,
}: {
  role: Role;
  handleSelection: (selected: DashboardOptions) => void;
  selected: DashboardOptions;
}) => {
  let display_settings = STUDENT_DISPLAY;
  switch (role) {
    case 'admin':
      display_settings = ADMIN_DISPLAY;
      break;
    case 'instructor':
      display_settings = INSTRUCTOR_DISPLAY;
      break;

    default:
      break;
  }
  const handleLogout = () => {
    logout().then(() => {
      role == 'admin' ? router.replace('/admin') : router.replace('/');
    });
  };
  return (
    <div className="sidebar">
      <div className="dashboard-logo-container">
        <img
          className="dashboard-logo"
          src="../assets/images/log-removebg-preview.png"
        ></img>
        <p className="system-name">Instructor Evaluation System</p>
      </div>
      <div className="dashboard-options">
        <Options
          display={display_settings}
          selectedOption={selected}
          selectorHandler={handleSelection}
        ></Options>
      </div>
      <div onClick={handleLogout} className="logout-container option">
        <AntDesign name="logout" size={ICON_SIZE} color="black" />
        <p>Logout</p>
      </div>
    </div>
  );
};
const ICON_SIZE = 35;
const OPTION_CLASS = 'option';
const SELECTED_CLASS = 'option , option-selected';
const Options = ({
  selectorHandler,
  display,
  selectedOption,
}: {
  selectorHandler: (selected: DashboardOptions) => void;
  display: DisplaySettings;
  selectedOption: DashboardOptions;
}) => {
  return (
    <>
      {display.employee_profile && (
        <div
          onClick={() => selectorHandler(DISPLAY_OPTION_NAMES.employee_profile)}
          className={
            selectedOption == DISPLAY_OPTION_NAMES.employee_profile
              ? SELECTED_CLASS
              : OPTION_CLASS
          }
        >
          <AntDesign name="user" size={ICON_SIZE} color="black" />
          <p>Employee Profile</p>
        </div>
      )}
      {display.reports && (
        <div
          onClick={() => selectorHandler(DISPLAY_OPTION_NAMES.reports)}
          className={
            selectedOption == DISPLAY_OPTION_NAMES.reports
              ? SELECTED_CLASS
              : OPTION_CLASS
          }
        >
          <MaterialIcons name="dashboard" size={ICON_SIZE} color="black" />
          <p>Reports</p>
        </div>
      )}

      {display.reports && (
        <div
          onClick={() => selectorHandler(DISPLAY_OPTION_NAMES.Link)}
          className={
            selectedOption == DISPLAY_OPTION_NAMES.Link
              ? SELECTED_CLASS
              : OPTION_CLASS
          }
        >
          <Ionicons name="create" size={ICON_SIZE} color="black" />
          <p>Evaluation</p>
        </div>
      )}
      {display.student_profile && (
        <div
          onClick={() => selectorHandler(DISPLAY_OPTION_NAMES.student_profile)}
          className={
            selectedOption == DISPLAY_OPTION_NAMES.student_profile
              ? SELECTED_CLASS
              : OPTION_CLASS
          }
        >
          <FontAwesome6
            name="user-graduate"
            size={ICON_SIZE - 2}
            color="black"
          />
          <p>Student Profile</p>
        </div>
      )}

      {display.Evaluation && (
        <div
          onClick={() => selectorHandler(DISPLAY_OPTION_NAMES.Evaluation)}
          className={
            selectedOption == DISPLAY_OPTION_NAMES.Evaluation
              ? SELECTED_CLASS
              : OPTION_CLASS
          }
        >
          <Feather name="check-square" size={ICON_SIZE} color="black" />
          <p>Evaluation</p>
        </div>
      )}
    </>
  );
};
