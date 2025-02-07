import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{ textAlign: "center", padding: "20px", marginTop: "30px", backgroundColor: "#f1f1f1", fontStyle: "normal" }}>
      <p>&#169; {currentYear} Ahsanul Mostakin. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
