import React, { useState, useEffect } from "react";
import RefundCard from '../components/RefundCard';
import Card from '../components/Card';
import AdminMenu from '../components/AdminMenu';
import axios from 'axios';

const RefundRequests = () => {
 
  const [ refunds, setRefunds ] = useState([]);
  const [ state, setState ] = useState("available");

  useEffect(() => {
    axios({
      method: "PUT",
      url: `/api/courses/getRefundRequests`
    })
    .then( (res) => {
        const refunds = res.data;
        setRefunds(refunds);
      }
    )

    if(refunds.length===0)
    {
      setState("empty");
    }
    if(refunds.length>0)
    {
      setState("available");
    }
  },[refunds.length])

  return (
    <>
    <AdminMenu/>
    <div className="refund-requests">
        {state==="available" && refunds && refunds.map((refund) => (
            <RefundCard refund={refund} key={refund._id} />
          ))}
        {state==="empty" && <Card/>}
    </div>
    </>
  )
}

export default RefundRequests