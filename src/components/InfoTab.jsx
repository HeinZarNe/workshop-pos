import React, { useState } from "react";
import "./InfoTab.css";

const InfoTab = ({ onTabClick, detail }) => {
  const [activeTab, setActiveTab] = useState("tab1");
  const { phone_number, date_of_birth, gender, address, position, email } =
    detail;
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  const handleParaClick = (event) => {
    event.stopPropagation(); // Prevent the click event from bubbling up
    onTabClick(); // Call the parent's onTabClick function
  };
  const renderActiveTab = () => {
    switch (activeTab) {
      case "tab1":
        return (
          <div className="tab-pane h-[200px] active-tab" id="tab1">
            <div className="flex gap-20">
              <div className="space-y-4 text-white">
                <p>Phone Number</p>
                <p>Address</p>
                <p>Gender</p>
                <p>Date Of Birth</p>
              </div>
              <div className="space-y-4 text-white">
                <p>: {phone_number}</p>
                <p>: {address}</p>
                <p>: {gender}</p>
                <p>: {date_of_birth}</p>
              </div>
            </div>
          </div>
        );
      case "tab2":
        return (
          <div className="tab-pane h-[200px] active-tab" id="tab2">
            <div className="flex gap-32">
              <div className="space-y-4 text-white">
                <p>Position</p>
                <p>Email</p>
              </div>
              <div className="space-y-4 text-white">
                <p>: {position}</p>
                <p>: {email}</p>
              </div>
            </div>
          </div>
        );

      default:
        break;
    }
  };
  return (
    <div>
      <ul className="flex gap-20 mx-5 text-lg border-b-[1px]">
        <li
          className={`tab-item mb-2  text-white ${
            activeTab === "tab1" ? "active-tab" : ""
          }`}
          onClick={handleParaClick}
        >
          <p
            className="cursor-pointer hover:text-[#B19777] "
            onClick={() => handleTabClick("tab1")}
          >
            Personal Information
          </p>
        </li>
        <li
          className={`tab-item mb-2 text-white ${
            activeTab === "tab2" ? "active-tab" : ""
          }`}
          onClick={handleParaClick}
        >
          <p
            className="cursor-pointer hover:text-[#B19777]"
            onClick={() => handleTabClick("tab2")}
          >
            Login Information
          </p>
        </li>
      </ul>
      <div className="tab-content mt-3 mx-5">{renderActiveTab()}</div>
    </div>
  );
};

export default InfoTab;
