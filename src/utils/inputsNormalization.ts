export const normalizePhone = (phone: string) => {
  return phone.replace(/[^\d+]/g, '');
};
