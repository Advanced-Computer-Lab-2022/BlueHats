const CorporateTraineeDetails = ({ corporateTrainee }) => {

    return (
      <div className="corporateTrainee-details">
        <h4>{corporateTrainee.name}</h4>
        <p><strong>Username: </strong>{corporateTrainee.username}</p>
        <p><strong>Password: </strong>{corporateTrainee.password}</p>
        <p>{corporateTrainee.createdAt}</p>
      </div>
    )
  }
  
  export default CorporateTraineeDetails 