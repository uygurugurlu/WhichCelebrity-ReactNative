export const GetUserAge = (birth_date) => {
  if (birth_date !== null && typeof birth_date !== 'undefined') {
    const birth_date_year = Number(birth_date.substring(6));
    const date = new Date();
    const current_year = date.getFullYear();

    return current_year - birth_date_year;
  }
};
