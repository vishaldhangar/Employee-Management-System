import * as yup from 'yup';

export const employeeSchema = yup.object().shape({
  name: yup
    .string()
    .required('Name is required')
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters'),
  
  email: yup
    .string()
    .required('Email is required')
    .email('Please enter a valid email address'),
  
  employeeId: yup
    .string()
    .required('Employee ID is required')
    .min(3, 'Employee ID must be at least 3 characters'),
  
  dob: yup
    .date()
    .required('Date of birth is required')
    .max(new Date(), 'Date of birth cannot be in the future')
    .test('age', 'Employee must be at least 18 years old', function(value) {
      if (!value) return false;
      const today = new Date();
      const birthDate = new Date(value);
      const age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        return age - 1 >= 18;
      }
      return age >= 18;
    }),
  
  gender: yup
    .string()
    .required('Gender is required')
    .oneOf(['male', 'female', 'other'], 'Please select a valid gender'),
  
  maritalStatus: yup
    .string()
    .required('Marital status is required')
    .oneOf(['single', 'married'], 'Please select a valid marital status'),
  
  designation: yup
    .string()
    .required('Designation is required')
    .min(2, 'Designation must be at least 2 characters'),
  
  department: yup
    .string()
    .required('Department is required'),
  
  salary: yup
    .number()
    .required('Salary is required')
    .positive('Salary must be a positive number')
    .min(1000, 'Salary must be at least $1,000')
    .max(1000000, 'Salary must be less than $1,000,000'),
  
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'Password must contain at least one lowercase letter, one uppercase letter, and one number'
    ),
  
  role: yup
    .string()
    .required('Role is required')
    .oneOf(['manager', 'employee'], 'Please select a valid role'),
});

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .required('Email is required')
    .email('Please enter a valid email address'),
  
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters'),
});