export const numberSeparatedWithCommas = (number) => {
    if (number === undefined || number === null) {
      return ""; // or return some default value, like '0'
    }
  
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  