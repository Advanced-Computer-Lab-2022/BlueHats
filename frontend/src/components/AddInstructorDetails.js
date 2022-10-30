const AddInstructorDetails = ({ instructor }) => {

    return (
      <div className="addInstructor-details">
        <h4>{instructor.name}</h4>
        <p><strong>Username: </strong>{instructor.username}</p>
        <p><strong>Password: </strong>{instructor.password}</p>
        <p>{instructor.createdAt}</p>
      </div>
    )
  }
  
  export default AddInstructorDetails 