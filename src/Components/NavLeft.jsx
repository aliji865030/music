import React from "react";

const NavLeft = () => {
  return (
    <div className="nav-left h-screen w-[20%] p-4 bg-gray-800 fixed">
      <img src="Logo.png" alt="Logo" className="w-[80%] mb-6" />
      <div className="mt-12">
        <label className="text-xs font-semibold text-gray-400 cursor-pointer">
          MENU
        </label>
        <ul className=" mt-2">
          <li className="flex items-center p-2 hover:bg-gray-700 rounded cursor-pointer">
            <img
              src="Vector.png"
              alt="Home"
              className="w-5 h-5 mr-2"
            />
            <span>Home</span>
          </li>
          <li className="flex items-center p-2 hover:bg-gray-700 rounded cursor-pointer">
            <img
              src="Vector1.png"
              alt="Trends"
              className="w-5 h-5 mr-2"
            />
            <span>Trends</span>
          </li>
          <li className="flex items-center p-2 hover:bg-gray-700 rounded cursor-pointer">
            <img
              src="Vector2.png"
              alt="Trends"
              className="w-5 h-5 mr-2"
            />
            <span>Library</span>
          </li>
          <li className="flex items-center p-2 hover:bg-gray-700 rounded cursor-pointer">
            <img
              src="Vector3.png"
              alt="Trends"
              className="w-5 h-5 mr-2"
            />
            <span>Discover</span>
          </li>
        </ul>
      </div>
      <div className=" mt-[15rem]">
        <label className="text-xs font-semibold text-gray-400 cursor-pointer">
          GENERAL
        </label>
        <div className="mt-2">
          <ul>
            <li className="flex items-center p-2 hover:bg-gray-700 rounded cursor-pointer">
              <img
                src="Settings.png"
                alt=""
                className="w-5 h-5 mr-2"
              />
              <span>Settings</span>
            </li>
            <li className="flex items-center p-2 hover:bg-gray-700 rounded cursor-pointer">
              <img
                src="Logout.png"
                alt=""
                className="w-5 h-5 mr-2"
              />
              <span>Log Out</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NavLeft;
