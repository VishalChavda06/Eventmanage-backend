/**
 * Generates a unique ticket code in format: EVT-YYYY-XXXX
 * YYYY = current full year (e.g. 2026)
 * XXXX = 4 random uppercase letters
 * Example: EVT-2026-KQZM
 */
module.exports = function generateTicketCode() {
  const year = new Date().getFullYear();
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let randomLetters = '';

  for (let i = 0; i < 4; i++) {
    randomLetters += letters.charAt(Math.floor(Math.random() * letters.length));
  }

  return `EVT-${year}-${randomLetters}`;
};
