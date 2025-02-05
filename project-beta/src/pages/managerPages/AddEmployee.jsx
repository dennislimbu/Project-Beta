import React, { useState, useContext } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/Navbar';
import Header from '../../components/Header';
import { EmployeeContext } from './EmployeeContext';
import '../../components/css/addEmployee.css'; // Corrected import path

function AddEmployee() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    personalInfo: {},
    employmentDetails: {},
    payrollTaxInfo: {
      salaryType: 'hourly', // Default to hourly
    },
    workPreference: {},
    complianceDocumentation: {},
  });

  const { addEmployee } = useContext(EmployeeContext);
  const navigate = useNavigate();
  const totalSteps = 6;

  const handleNext = () => {
    setStep(step + 1);
  };

  const handlePrev = () => {
    setStep(step - 1);
  };

  const handleChange = (section, field, value) => {
    setFormData({
      ...formData,
      [section]: {
        ...formData[section],
        [field]: value,
      },
    });
  };

  const generateEmployeeNumber = () => {
    return 'EMP' + Math.floor(Math.random() * 1000000);
  };

  const handleSubmit = () => {
    const employeeNumber = generateEmployeeNumber();
    const employeeData = {
      ...formData,
      employeeNumber,
    };
    addEmployee(employeeData);
    navigate('/employees/list');
  };

  const steps = [
    { label: 'Personal Information', step: 1 },
    { label: 'Employment Details', step: 2 },
    { label: 'Payroll and Tax Info', step: 3 },
    { label: 'Work Preference', step: 4 },
    { label: 'Compliance and Documentation', step: 5 },
    { label: 'Review', step: 6 },
  ];

  return (
    <div className="d-flex flex-column vh-100 add-employee-page">
      <Header user={{ firstName: 'John', lastName: 'Doe', position: 'Manager', image: 'default-image-url' }} />
      <div className="d-flex flex-grow-1">
        <Sidebar />
        <Container className="mt-5 flex-grow-1 overflow-auto">
          <div className="text-center">
            <h1>New Employee Form</h1>
          </div>
          <div className="steps-indicator mb-4">
            {steps.map((s) => (
              <div key={s.step} className={`step ${step === s.step ? 'active' : ''}`}>
                <div className="circle">{s.step}</div>
                <div className="label">{s.label}</div>
              </div>
            ))}
          </div>
          {step === 1 && (
            <Form className='form-container form-content'>
              <h2 className='page-title'>Personal Information</h2>
              <Row>
                <Col md={6}>
                  <Form.Group controlId="title">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                      as="select"
                      value={formData.personalInfo.title || ''}
                      onChange={(e) => handleChange('personalInfo', 'title', e.target.value)}
                    >
                      <option value="">Select Title</option>
                      <option value="Mr.">Mr.</option>
                      <option value="Ms.">Ms.</option>
                      <option value="Mrs.">Mrs.</option>
                      <option value="Miss">Miss</option>
                      <option value="Mx.">Mx.</option>
                      <option value="Dr.">Dr.</option>
                      <option value="Prof.">Prof.</option>
                      <option value="Other">Other</option>
                    </Form.Control>
                  </Form.Group>
                  <Form.Group controlId="firstName">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      type="text"
                      value={formData.personalInfo.firstName || ''}
                      onChange={(e) => handleChange('personalInfo', 'firstName', e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group controlId="lastName">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                      type="text"
                      value={formData.personalInfo.lastName || ''}
                      onChange={(e) => handleChange('personalInfo', 'lastName', e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group controlId="phone">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control
                      type="text"
                      value={formData.personalInfo.phone || ''}
                      onChange={(e) => handleChange('personalInfo', 'phone', e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group controlId="email">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                      type="email"
                      value={formData.personalInfo.email || ''}
                      onChange={(e) => handleChange('personalInfo', 'email', e.target.value)}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="gender">
                    <Form.Label>Gender</Form.Label>
                    <Form.Control
                      as="select"
                      value={formData.personalInfo.gender || ''}
                      onChange={(e) => handleChange('personalInfo', 'gender', e.target.value)}
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Non-binary">Non-binary</option>
                      <option value="Prefer not to say">Prefer not to say</option>
                      <option value="Other">Other</option>
                    </Form.Control>
                  </Form.Group>
                  <Form.Group controlId="middleName">
                    <Form.Label>Middle Name (optional)</Form.Label>
                    <Form.Control
                      type="text"
                      value={formData.personalInfo.middleName || ''}
                      onChange={(e) => handleChange('personalInfo', 'middleName', e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group controlId="dob">
                    <Form.Label>Date of Birth</Form.Label>
                    <Form.Control
                      type="date"
                      value={formData.personalInfo.dob || ''}
                      onChange={(e) => handleChange('personalInfo', 'dob', e.target.value)}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <div className="button-container">
                <Button variant="primary" onClick={handleNext}>
                  Next
                </Button>
              </div>
            </Form>
          )}
          {step === 2 && (
            <Form className='form-container form-content'>
              <h2 className='page-title'>Employment Details</h2>
              <Row>
                <Col md={6}>
                  <Form.Group controlId="position">
                    <Form.Label>Position</Form.Label>
                    <Form.Control
                      type="text"
                      value={formData.employmentDetails.position || ''}
                      onChange={(e) => handleChange('employmentDetails', 'position', e.target.value)}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="department">
                    <Form.Label>Department</Form.Label>
                    <Form.Control
                      type="text"
                      value={formData.employmentDetails.department || ''}
                      onChange={(e) => handleChange('employmentDetails', 'department', e.target.value)}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <div className="button-container">
                <Button variant="secondary" onClick={handlePrev}>
                  Previous
                </Button>
                <Button variant="primary" onClick={handleNext}>
                  Next
                </Button>
              </div>
            </Form>
          )}
          {step === 3 && (
            <Form className='form-container form-content'>
              <h2 className='page-title'>Payroll and Tax Information</h2>
              <Row>
                <Col md={6}>
                  <Form.Group controlId="salaryType">
                    <Form.Label>Salary Type</Form.Label>
                    <Form.Control
                      as="select"
                      value={formData.payrollTaxInfo.salaryType}
                      onChange={(e) => handleChange('payrollTaxInfo', 'salaryType', e.target.value)}
                    >
                      <option value="hourly">Hourly</option>
                      <option value="annually">Annually</option>
                    </Form.Control>
                  </Form.Group>
                  <Form.Group controlId="payFrequency">
                    <Form.Label>Pay Frequency</Form.Label>
                    <Form.Control
                      as="select"
                      value={formData.payrollTaxInfo.payFrequency || ''}
                      onChange={(e) => handleChange('payrollTaxInfo', 'payFrequency', e.target.value)}
                    >
                      <option value="">Select Frequency</option>
                      <option value="Weekly">Weekly</option>
                      <option value="Bi-weekly">Bi-weekly</option>
                      <option value="Monthly">Monthly</option>
                    </Form.Control>
                  </Form.Group>
                  <Form.Group controlId="baseSalary">
                    <Form.Label>Base Salary/Wage</Form.Label>
                    <Form.Control
                      type="number"
                      value={formData.payrollTaxInfo.baseSalary || ''}
                      onChange={(e) => handleChange('payrollTaxInfo', 'baseSalary', e.target.value)}
                      min="0"
                      step="0.01"
                    />
                  </Form.Group>
                  <Form.Group controlId="bonuses">
                    <Form.Label>Bonuses/Incentives</Form.Label>
                    <Form.Control
                      type="number"
                      value={formData.payrollTaxInfo.bonuses || ''}
                      onChange={(e) => handleChange('payrollTaxInfo', 'bonuses', e.target.value)}
                      min="0"
                      step="0.01"
                    />
                  </Form.Group>
                  <Form.Group controlId="overtimePay">
                    <Form.Label>Overtime Pay (if applicable)</Form.Label>
                    <Form.Control
                      type="number"
                      value={formData.payrollTaxInfo.overtimePay || ''}
                      onChange={(e) => handleChange('payrollTaxInfo', 'overtimePay', e.target.value)}
                      min="0"
                      step="0.01"
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="taxDeductions">
                    <Form.Label>Tax Deductions (Income Tax, National Insurance, etc.)</Form.Label>
                    <Form.Control
                      type="number"
                      value={formData.payrollTaxInfo.taxDeductions || ''}
                      onChange={(e) => handleChange('payrollTaxInfo', 'taxDeductions', e.target.value)}
                      min="0"
                      step="0.01"
                    />
                  </Form.Group>
                  <Form.Group controlId="pensionContributions">
                    <Form.Label>Pension Contributions</Form.Label>
                    <Form.Control
                      type="number"
                      value={formData.payrollTaxInfo.pensionContributions || ''}
                      onChange={(e) => handleChange('payrollTaxInfo', 'pensionContributions', e.target.value)}
                      min="0"
                      step="0.01"
                    />
                  </Form.Group>
                  
                  <Form.Group controlId="taxCode">
                    <Form.Label>Tax Code</Form.Label>
                    <Form.Control
                      type="text"
                      value={formData.payrollTaxInfo.taxCode || ''}
                      onChange={(e) => handleChange('payrollTaxInfo', 'taxCode', e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group controlId="nationalInsuranceNumber">
                    <Form.Label>National Insurance Number</Form.Label>
                    <Form.Control
                      type="text"
                      value={formData.payrollTaxInfo.nationalInsuranceNumber || ''}
                      onChange={(e) => handleChange('payrollTaxInfo', 'nationalInsuranceNumber', e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group controlId="studentLoanRepayment">
                    <Form.Label>Student Loan Repayment (if applicable)</Form.Label>
                    <Form.Control
                      type="number"
                      value={formData.payrollTaxInfo.studentLoanRepayment || ''}
                      onChange={(e) => handleChange('payrollTaxInfo', 'studentLoanRepayment', e.target.value)}
                      min="0"
                      step="0.01"
                    />
                  </Form.Group>
                </Col>
              </Row>
              <div className="button-container">
                <Button variant="secondary" onClick={handlePrev}>
                  Previous
                </Button>
                <Button variant="primary" onClick={handleNext}>
                  Next
                </Button>
              </div>
            </Form>
          )}
          {step === 4 && (
            <Form className='form-container form-content'>
              <h2 className='page-title'>Work Preference</h2>
              <Row>
                <Col md={6}>
                  <Form.Group controlId="workEnvironment">
                    <Form.Label>Preferred Work Environment</Form.Label>
                    <Form.Control
                      as="select"
                      value={formData.workPreference.workEnvironment || ''}
                      onChange={(e) => handleChange('workPreference', 'workEnvironment', e.target.value)}
                    >
                      <option value="">Select Environment</option>
                      <option value="Remote">Remote</option>
                      <option value="Hybrid">Hybrid</option>
                      <option value="On-site">On-site</option>
                    </Form.Control>
                  </Form.Group>
                  
                </Col>
                <Col md={6}>
                  <Form.Group controlId="workSchedule">
                    <Form.Label>Work Schedule</Form.Label>
                    <Form.Control
                      as="select"
                      value={formData.workPreference.workSchedule || ''}
                      onChange={(e) => handleChange('workPreference', 'workSchedule', e.target.value)}
                    >
                      <option value="">Select Schedule</option>
                      <option value="Full-time">Full-time</option>
                      <option value="Part-time">Part-time</option>
                      <option value="Flexible Hours">Flexible Hours</option>
                    </Form.Control>
                  </Form.Group>
                  
                  {(formData.workPreference.workSchedule === 'Full-time' || formData.workPreference.workSchedule === 'Part-time') && (
                    <Form.Group controlId="guaranteedHours">
                      <Form.Label>Guaranteed Hours</Form.Label>
                      <Form.Control
                        type="number"
                        value={formData.workPreference.guaranteedHours || ''}
                        onChange={(e) => handleChange('workPreference', 'guaranteedHours', e.target.value)}
                        min="0"
                        step="1"
                      />
                    </Form.Group>
                  )}
                </Col>
              </Row>
              <div className="button-container">
                <Button variant="secondary" onClick={handlePrev}>
                  Previous
                </Button>
                <Button variant="primary" onClick={handleNext}>
                  Next
                </Button>
              </div>
            </Form>
          )}
          {step === 5 && (
            <Form className='form-container form-content'>
              <h2 className='page-title'>Compliance and Documentation</h2>
              <Row>
                <Col md={6}>
                  <Form.Group controlId="compliance">
                    <Form.Label>Compliance</Form.Label>
                    <Form.Control
                      type="text"
                      value={formData.complianceDocumentation.compliance || ''}
                      onChange={(e) => handleChange('complianceDocumentation', 'compliance', e.target.value)}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="documents">
                    <Form.Label>Documents</Form.Label>
                    <Form.Control
                      type="text"
                      value={formData.complianceDocumentation.documents || ''}
                      onChange={(e) => handleChange('complianceDocumentation', 'documents', e.target.value)}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <div className="button-container">
                <Button variant="secondary" onClick={handlePrev}>
                  Previous
                </Button>
                <Button variant="primary" onClick={handleNext}>
                  Next
                </Button>
              </div>
            </Form>
          )}
          {step === 6 && (
            <div className="form-container form-content" style={{ height: '100%', overflow: 'auto' }}>
              <Form>
                <h2 className='page-title'>Review</h2>
                <Row>
                  <Col md={6}>
                    <h4>Personal Information</h4>
                    <p>Title: {formData.personalInfo.title}</p>
                    <p>First Name: {formData.personalInfo.firstName}</p>
                    <p>Last Name: {formData.personalInfo.lastName}</p>
                    <p>Gender: {formData.personalInfo.gender}</p>
                    <p>Middle Name: {formData.personalInfo.middleName}</p>
                    <p>Date of Birth: {formData.personalInfo.dob}</p>
                  </Col>
                  <Col md={6}>
                    <h4>Employment Details</h4>
                    <p>Position: {formData.employmentDetails.position}</p>
                    <p>Department: {formData.employmentDetails.department}</p>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <h4>Payroll and Tax Information</h4>
                    <p>Salary Type: {formData.payrollTaxInfo.salaryType}</p>
                    <p>Salary: {formData.payrollTaxInfo.salary}</p>
                    <p>Tax ID: {formData.payrollTaxInfo.taxId}</p>
                  </Col>
                  <Col md={6}>
                    <h4>Work Preference</h4>
                    <p>Work Hours: {formData.workPreference.workHours}</p>
                    <p>Remote Work: {formData.workPreference.remoteWork}</p>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <h4>Compliance and Documentation</h4>
                    <p>Compliance: {formData.complianceDocumentation.compliance}</p>
                    <p>Documents: {formData.complianceDocumentation.documents}</p>
                  </Col>
                </Row>
                <div className="button-container">
                  <Button variant="secondary" onClick={handlePrev}>
                    Previous
                  </Button>
                  <Button variant="primary" onClick={handleSubmit}>
                    Submit
                  </Button>
                </div>
              </Form>
            </div>
          )}
        </Container>
      </div>
    </div>
  );
}

export default AddEmployee;