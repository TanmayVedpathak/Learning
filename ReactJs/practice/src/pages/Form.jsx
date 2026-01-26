import { useState } from "react";

const FormComponent = ({ formData, setFormData, userList, setUserList }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.firstName || !formData.lastName || !formData.phone) {
      alert("All fields are required");
      return;
    }

    const arr = [...userList];

    const index = arr.findIndex((contact) => contact.lastName.toLowerCase().localeCompare(formData.lastName.toLowerCase()) > 0);

    if (index === -1) {
      arr.push(formData);
    } else {
      arr.splice(index, 0, formData);
    }

    setUserList(arr);
    setFormData({ firstName: "", lastName: "", phone: "" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} />

      <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} />

      <input type="tel" name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} />

      <button type="submit">Submit</button>
    </form>
  );
};

const TableComponent = ({ userList }) => {
  return (
    <table border="1" cellPadding="8">
      <thead>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Phone</th>
        </tr>
      </thead>
      <tbody>
        {userList.map((item, index) => (
          <tr key={index}>
            <td>{item.firstName}</td>
            <td>{item.lastName}</td>
            <td>{item.phone}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const Form = () => {
  const [formData, setFormData] = useState({
    firstName: "Clara",
    lastName: "Fisher",
    phone: "6970505057",
  });

  const [userList, setUserList] = useState([]);

  return (
    <div className="container">
      <FormComponent formData={formData} setFormData={setFormData} userList={userList} setUserList={setUserList} />
      <TableComponent userList={userList} />
    </div>
  );
};

export default Form;
