import React from "react";
import { Link } from 'react-router-dom'
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';

function Footer() {
  return (
    <div className="main-footer">
      <div className="container">
        <div className="row">
        <Link className="linkk" to="/">
            <img src="../logo.png" alt="logo"/>
        </Link>
           <div className="col">
            <h4>Support</h4>
            <div className="list-unstyled">
              <li>Contact Us</li>
              <li>Help and FAQ</li>
              <li>Service Status</li>
              <li><FacebookIcon/> <InstagramIcon/> <LinkedInIcon/> <TwitterIcon/></li>
            </div>
          </div>
           <div className="col">
            <h4>Resources</h4>
            <div className="list-unstyled">
              <li>Catalog</li>
              <li>Career Services</li>
              <li>Student Success</li>
            </div>
          </div>
           <div className="col">
            <h4>Featured Programs</h4>
            <div className="list-unstyled">
              <li>Business Analytics</li>
              <li>SQL</li>
              <li>Data Engineering with AWS</li>
            </div>
          </div>
          <div className="col">
            <h4>Company</h4>
            <div className="list-unstyled">
              <li>About</li>
              <li>Blog</li>
              <li>Partners</li>
            </div>
          </div>
          <div className="col">
            <h4>AMELIO INC</h4>
            <div className="list-unstyled">
              <li>342-420-6969</li>
              <li>Cairo, Egypt</li>
              <li>New Cairo 1, Cairo Governorate</li>
            </div>
          </div>
        </div>
        <br/>
        <hr />
        <div className="row">
          <p className="col-sm">
            &copy;{new Date().getFullYear()} Amelio | All rights reserved |
            Terms Of Service | Privacy
          </p>
        </div>
      </div>
    </div>
  );
}

export default Footer;