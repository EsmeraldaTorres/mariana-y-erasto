export const sortGuests = (guests = []) => {
  return guests.sort((a, b) => {
    if (a.principalName < b.principalName) {
      return -1;
    }
    if (a.principalName > b.principalName) {
      return 1;
    }
    return 0;
  });
};

export const filterGuestsByEtiqueta = (guests, etiqueta) => {
  return etiqueta === "Todos"
    ? guests
    : guests.filter((g) => g.etiqueta === etiqueta);
};
