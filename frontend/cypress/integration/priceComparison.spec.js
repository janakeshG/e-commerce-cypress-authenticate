// cypress/integration/priceComparison.spec.js
import AmazonPage from '../support/pages/amazonPage';
import FlipkartPage from '../support/pages/flipkartPage';

const searchTerm = 'Titan watch';

describe('Price Comparison Between Amazon and Flipkart', () => {
  const amazonPage = new AmazonPage();
  const flipkartPage = new FlipkartPage();

  let amazonPrice;
  let flipkartPrice;

  before(() => {
    cy.log('Fetching product.');
  });

  it('Fetch and compare prices from Amazon and Flipkart', () => {
    amazonPage.visit();
    cy.screenshot('amazon-open'); 
    amazonPage.searchForProduct(searchTerm);
    cy.wait(2000); 
    amazonPage.getFirstProductPrice().then(price => {
      amazonPrice = price;
      cy.log(`Amazon price: ₹${amazonPrice}`);
      cy.screenshot('amazon-product-list'); 
    });

    flipkartPage.visit();
    cy.screenshot('flipkart-open'); 
    flipkartPage.closeLoginPopup();
    flipkartPage.searchForProduct(searchTerm);
    cy.wait(2000);
    flipkartPage.getFirstProductPrice().then(price => {
      flipkartPrice = price;
      cy.log(`Flipkart price: ₹${flipkartPrice}`);
      cy.screenshot('flipkart-product-price'); 
    }).then(() => {
      if (amazonPrice < flipkartPrice) {
        cy.log(`Amazon offers the lowest price: ₹${amazonPrice}`);
        cy.screenshot('lowest-price-amazon');
      } else if (flipkartPrice < amazonPrice) {
        cy.log(`Flipkart offers the lowest price: ₹${flipkartPrice}`);
        cy.screenshot('lowest-price-flipkart'); 
      } else {
        cy.log(`Both platforms offer the same price: ₹${amazonPrice}`);
        cy.screenshot('same-price'); 
      }
    });
  });
});
