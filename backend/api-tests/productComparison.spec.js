const axios = require('axios');

describe('APperform comparison', () => {
  it('fetch titan', async () => {
    const amazonResponse = await axios.get('https://www.amazon.in/s/ref=nb_sb_noss?url=search-alias%3Daps&field-keywords=titan');
    const flipkartResponse = await axios.get('https://flipkart.com/product');

    const amazonProduct = amazonResponse.data;
    const flipkartProduct = flipkartResponse.data;

    // Compare prices and capture the leasr
    const lowestPrice = Math.min(amazonProduct.price, flipkartProduct.price);
    console.log('Lowest Price:', lowestPrice);
  });
});
