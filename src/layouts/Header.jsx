import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { deleteCookie } from "utils/cookie";
import { getProfile } from "services/user";

import styles from "./Header.module.css";
import { useEffect, useRef, useState } from "react";

function Header() {
  const navigate = useNavigate();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const { refetch } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
  });

  const handleToggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const logout = () => {
    deleteCookie("accessToken");
    deleteCookie("refreshToken");

    navigate("/");
    refetch();
  };

  const handleClick = () => {
    logout();
    handleToggleDropdown();
  };

  return (
    <header className={styles.header}>
      <div>
        <Link to="/">
          <img src="divar.svg" className={styles.logo} />
        </Link>
        <span>
          <img src="location.svg" />
          <p>تهران</p>
        </span>
      </div>
      <div>
        <span onClick={handleToggleDropdown}>
          <img src="profile.svg" />
          <p>دیوار من</p>
        </span>
        {isDropdownOpen && (
          <div className={styles.dropdown} ref={dropdownRef}>
            <Link to="/auth">
              <p onClick={handleToggleDropdown}>ورود</p>
            </Link>
            <p onClick={handleClick}>خروج</p>
          </div>
        )}
        <Link to="/dashboard" className={styles.button}>
          ثبت آگهی
        </Link>
      </div>
    </header>
  );
}

export default Header;
