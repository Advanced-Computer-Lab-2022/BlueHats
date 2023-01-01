import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export var acceptedX = [];

const ContractForm = () => {
  const [agree, setAgree] = useState(false);
  const navigate = useNavigate();
  
  const location = useLocation();
  const accepted= location.state;

  var loggedinUser = JSON.parse(localStorage.getItem("user"));
  const savedID = loggedinUser.id;
  
  
  const navigateToInstructor = async () => {
    // const x = accepted.push('true')
    navigate("/createCourse");
    // acceptedX = x;
    // set currentuser.acceptedContract =true
    await  axios.patch(`http://localhost:4000/api/instructor/updateAccepted`, {
      id: savedID,
      acceptedContract: true,
    });
  };
  
  
  const checkboxHandler = () => {
    console.log(savedID)
    setAgree(!agree);
  };

  return (
    <div className="Contract">
      <div className="container">
        <div className="container mt-3">
          <h2> Instructor Terms</h2>

          <h2>1.Instructor Obligations</h2>
          <ul>
            <li>you will provide and maintain accurate account information;</li>
            <li>
              you own or have the necessary licenses, rights, consents,
              permissions, and authority to authorize Amelio to use your
              Submitted Content as specified in these Terms and the Terms of
              Use;
            </li>
            <li>
              your Submitted Content will not infringe or misappropriate any
              third party's intellectual property rights;{" "}
            </li>
            <li>
              you have the required qualifications, credentials, and expertise
              (including education, training, knowledge, and skill sets) to
              teach and offer the services that you offer through your Submitted
              Content and use of the Services;
            </li>
            <li>
              and you will ensure a quality of service that corresponds with the
              standards of your industry and instruction services in general.
            </li>
          </ul>
          <p>You warrant that you will not:</p>
          <ul>
            <li>
              post or provide any inappropriate, offensive, racist, hateful,
              sexist, pornographic, false, misleading, incorrect, infringing,
              defamatory or libelous content or information;
            </li>
            <li>
              post or transmit any unsolicited or unauthorized advertising,
              promotional materials, junk mail, spam, or any other form of
              solicitation (commercial or otherwise) through the Services or to
              any user;
            </li>
            <li>
              use the Services for business other than providing tutoring,
              teaching, and instructional services to students;
            </li>
            <li>
              engage in any activity that would require us to obtain licenses
              from or pay royalties to any third party, including the need to
              pay royalties for the public performance of a musical work or
              sound recording;
            </li>
            <li>
              frame or embed the Services (such as to embed a free version of a
              course) or otherwise circumvent the Services;
            </li>
            <li>
              impersonate another person or gain unauthorized access to another
              person's account;
            </li>
            <li>
              interfere with or otherwise prevent other instructors from
              providing their services or content; or
            </li>
            <li>abuse Amelio resources, including support services.</li>
          </ul>
          <h2>2.Pricing</h2>
          <h3>2.1 Price Setting</h3>

          <p>
            Price Setting When creating Submitted Content available for purchase
            on Amelio, you will be prompted to select a base price ("Base
            Price") for your Submitted Content from a list of available price
            tiers. Alternatively, you may choose to offer your Submitted Content
            for free. As a premium instructor, you will also be given the
            opportunity to participate in certain promotional programs under the
            terms of our Promotions Policy ("Promotional Programs").{" "}
          </p>
          <p className="lead">
            If you do not opt to participate in any Promotional Programs, we
            will list your Submitted Content for the Base Price or the closest
            local or mobile app equivalent (as detailed below). If you opt to
            participate in a Promotional Program, we may set a different
            discounted price or list price for your Submitted Content as
            described in the Promotions Policy.
          </p>
          <p className="lead">
            If you do not opt to participate in any Promotional Programs, we
            will list your Submitted Content for the Base Price or the closest
            local or mobile app equivalent (as detailed below). If you opt to
            participate in a Promotional Program, we may set a different
            discounted price or list price for your Submitted Content as
            described in the Promotions Policy.
          </p>
          <h3>2.2 Transaction Taxes</h3>

          <p>
            If a student purchases a product or service in a country that
            requires Amelio to remit national, state, or local sales or use
            taxes, value added taxes (VAT), or other similar transaction taxes
            ("Transaction Taxes"), under applicable law, we will collect and
            remit those Transaction Taxes to the competent tax authorities for
            those sales. We may increase the sale price at our discretion where
            we determine that such taxes may be due. For purchases through
            mobile applications, applicable Transaction Taxes are collected by
            the mobile platform (such as Apple's App Store or Google Play).
          </p>
          <h3>2.3 Promotional Programs</h3>
          <p className="lead">
            Amelio offers several optional marketing programs (Promotional
            Programs) in which you can choose to participate, as detailed in our
            Promotions Policy. These programs can help increase your revenue
            potential on Amelio by finding the optimal price point for your
            Submitted Content and offering them through subscriptions
            collections. There is no up-front cost to participate in these
            programs, and you can modify your participation status at any time,
            though changes you make will not apply to currently active campaigns
            and certain programs may have additional requirements on
            termination.
          </p>
          <h2>3. License to Amelio</h2>
          <p className="lead">
            You grant Amelio the rights detailed in the Terms of Use to offer,
            market, and otherwise exploit your Submitted Content. This includes
            the right to add captions or otherwise modify Submitted Content to
            ensure accessibility. You also authorize Amelio to sublicense these
            rights to your Submitted Content to third parties, including to
            students directly and through third parties such as resellers,
            distributors, affiliate sites, deal sites, and paid advertising on
            third-party platforms. Unless otherwise agreed (including within our
            Promotions Policy), you have the right to remove all or any portion
            of your Submitted Content from the Services at any time. Except as
            otherwise agreed, Amelio's right to sublicense the rights in this
            section will terminate with respect to new users 60 days after the
            Submitted Content's removal. However, (1) rights given to students
            before the Submitted Content's removal will continue in accordance
            with the terms of those licenses (including any grants of lifetime
            access) and (2) Amelio's right to use such Submitted Content for
            marketing purposes shall survive termination. We may record and use
            all or any part of your Submitted Content for quality control and
            for delivering, marketing, promoting, demonstrating, or operating
            the Services. You grant Amelio permission to use your name,
            likeness, voice, and image in connection with offering, delivering,
            marketing, promoting, demonstrating, and selling the Services, your
            Submitted Content, or Amelio's content, and you waive any rights of
            privacy, publicity, or other rights of a similar nature, to the
            extent permissible under applicable law.
          </p>
        </div>

        <div>
          <label htmlFor="agree">
            I agree to <b>terms and conditions </b>
            <input type="checkbox" id="agree" onChange={checkboxHandler} />
          </label>
        </div>
        <button disabled={!agree} className="btn" onClick={navigateToInstructor}>
          Accept
        </button>
      </div>
    </div>
  );
};

export default ContractForm;
