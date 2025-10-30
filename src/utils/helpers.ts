export const generateId = (existingIds: number[]): number => {
  if (existingIds.length === 0) return 1;
  return Math.max(...existingIds) + 1;
};

export const filterUsers = (
  users: any[],
  searchTerm: string
): any[] => {
  const term = searchTerm.toLowerCase().trim();
  if (!term) return users;

  return users.filter(
    (user) =>
      user.name.toLowerCase().includes(term) ||
      user.email.toLowerCase().includes(term) ||
      user.company.name.toLowerCase().includes(term)
  );
};

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhone = (phone: string): boolean => {
  return phone.length >= 10;
};

export const formatPhone = (phone: string): string => {
  return phone.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
};