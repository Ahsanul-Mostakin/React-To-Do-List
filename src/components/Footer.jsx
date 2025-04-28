import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      style={{
        textAlign: "center",
        padding: "5px",
        backgroundColor: "#f1f1f1",
        fontStyle: "normal",
        fontSize: "0.8rem",
      }}
    >
      <p style={{ margin: 0 }}>&#169; {currentYear} Ahsanul Mostakin.</p>
    </footer>
  );
};

export default Footer;
