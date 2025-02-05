import React, { useContext, useState } from 'react';
import { Container, Table, Form, Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Sidebar from '../../components/Navbar'; // Corrected import path
import Header from '../../components/Header'; // Corrected import path
import { EmployeeContext } from './EmployeeContext';
import '../../components/css/EmployeeList.css'; // Corrected import path

function EmployeeList() {
  const { employees, addEmployee } = useContext(EmployeeContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('');

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleStatusFilterChange = (e) => {
    setStatusFilter(e.target.value);
  };

  const handleDepartmentFilterChange = (e) => {
    setDepartmentFilter(e.target.value);
  };

  const filteredEmployees = employees.filter((employee) => {
    const firstName = employee.personalInfo.firstName || '';
    const lastName = employee.personalInfo.lastName || '';
    const department = employee.employmentDetails.department || '';
    const status = employee.status || '';

    return (
      (firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lastName.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (statusFilter ? status === statusFilter : true) &&
      (departmentFilter ? department === departmentFilter : true)
    );
  });

  const handleExport = () => {
    const dataStr = JSON.stringify(employees);
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);

    const exportFileDefaultName = 'employees.json';

    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const handleImport = (e) => {
    const fileReader = new FileReader();
    fileReader.onload = (event) => {
      const importedEmployees = JSON.parse(event.target.result);
      importedEmployees.forEach((employee) => addEmployee(employee));
    };
    fileReader.readAsText(e.target.files[0]);
  };

  return (
    <div className="d-flex flex-column vh-100">
      <Header user={{ firstName: 'John', lastName: 'Doe', position: 'Manager', image: 'default-image-url' }} />
      <div className="d-flex flex-grow-1">
        <Sidebar />
        <Container className="mt-2 flex-grow-1">
          <h1>Employee List</h1>
          <Row className="mb-3">
            <Col md={8}>
              <Form.Control
                type="text"
                placeholder="Search by name"
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </Col>
            <Col md={4} className="text-right">
              <Link to="/add-employee" className="btn add-link align-item-end">Add Employee</Link>
            </Col>
          <Row>
            <Col md={3}>
              <Form.Control  className='filter' as="select" value={statusFilter} onChange={handleStatusFilterChange}>
                <option value="">Filter by status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </Form.Control>
            </Col>
            <Col md={3}>
              <Form.Control  className='filter' as="select" value={departmentFilter} onChange={handleDepartmentFilterChange}>
                <option value="">Filter by department</option>
                <option value="HR">HR</option>
                <option value="Engineering">Engineering</option>
                <option value="Sales">Sales</option>
                <option value="Marketing">Marketing</option>
              </Form.Control>
            </Col>
            </Row>
        
          </Row>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Department</th>
                <th>Position</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Start Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.map((employee, index) => (
                <tr key={index}>
                  <td>{employee.employeeNumber}</td>
                  <td>{`${employee.personalInfo.firstName} ${employee.personalInfo.lastName}`}</td>
                  <td>{employee.employmentDetails.department}</td>
                  <td>{employee.employmentDetails.position}</td>
                  <td>{employee.personalInfo.phone}</td>
                  <td>{employee.personalInfo.email}</td>
                  <td>{employee.employmentDetails.startDate}</td>
                  <td>
                    <Button variant="warning" size="sm" className="mr-2">Edit</Button>
                    <Button variant="danger" size="sm">Delete</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>
      </div>
    </div>
  );
}

export default EmployeeList;