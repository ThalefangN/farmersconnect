export const validateSignUpForm = (formData: {
  email: string;
  password: string;
  fullName: string;
  phone: string;
  location: string;
  farmingType: string;
}) => {
  const errors: string[] = [];

  if (!formData.email) errors.push("Email is required");
  if (!formData.password) errors.push("Password is required");
  if (formData.password.length < 6) errors.push("Password must be at least 6 characters");
  if (!formData.fullName) errors.push("Full name is required");
  if (!formData.location) errors.push("Location is required");
  if (!formData.farmingType) errors.push("Farming type is required");

  return errors;
};