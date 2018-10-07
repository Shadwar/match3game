export const random = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

export const printTable = (table) => {
  console.log('table');
  for (let row of table) {
    let result = '';
    for (let gem of row) {
      result += `${(gem && 'x') || ' ' }`;
    }
    console.log(result);
  }
}