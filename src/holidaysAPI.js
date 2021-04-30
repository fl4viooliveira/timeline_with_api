//Holiday API: https://holidayapi.com/docs
const key = "8f36f978-c0ee-40cc-89b4-cdffc0d4b947";
let language = 'en';
let country = 'GB';
let year = '2020';
// API endpoint to get holiday data.
const apiUrl  = `https://holidayapi.com/v1/holidays?pretty&key=${key}&country=${country}&year=${year}&language=${language}`;

export const getData = async () => {
  try {
    const response = await fetch(apiUrl);
    if (response.ok) {
      const jsonResponse = await response.json();
      //console.log(jsonResponse.holidays);
      return jsonResponse.holidays;
    }
    throw new Error('Request Failes');
  } catch(error) {
    console.log(`Oops! ${error}!`)
  };
}
