  export function generateRandomId(length) {
    let randomNumber;
    if (length) {
      let number = '1';
      for (let i = 0; i < length; i++) {
        number += 0;
      }
      randomNumber = Math.floor(Math.random() * Number(number));
    } else {
      randomNumber = Math.floor(Math.random() * 10000000000000);
    }
    return randomNumber;
  }