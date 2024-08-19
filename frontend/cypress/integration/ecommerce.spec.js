import AmazonPage from '../support/pages/amazonPage';
import FlipkartPage from '../support/pages/flipkartPage';
import AmazonApi from '../support/pages/Api-amazon';
import FlipkartApi from '../support/pages/Api-flipkart';

const searchTerm = 'Titan watch';

describe('amazon and flipkart', () => {
  const amazonPage = new AmazonPage();
  const flipkartPage = new FlipkartPage();
  const amazonApi = new AmazonApi();
  const flipkartApi = new FlipkartApi();

  it('Compare UI and API result', () => {
    amazonPage.visit();
    amazonPage.searchForProduct(searchTerm);

    cy.wait(2000); 

    amazonApi.searchProduct(searchTerm).then(apiResponse => {
      const apiProduct = apiResponse.body.products[0]; 
     
      amazonPage.getFirstProductDetails().then(frontendDetails => {
        expect(frontendDetails.name).to.eq(apiProduct.name);
        expect(frontendDetails.price).to.eq(apiProduct.price);
        expect(`https://www.amazon.in${frontendDetails.link}`).
        to.eq(apiProduct.link);
      });

      const productId = apiProduct.id;
      amazonApi.getProductDetails(productId).then(productDetailsResponse => {
        expect(productDetailsResponse.status).to.eq(200);
        expect(productDetailsResponse.body).to.have.property('id', productId);
      });
    });
  });

  it('Compare Flipkart Frontend Data with API Data', () => {
    flipkartPage.visit();
    flipkartPage.closeLoginPopup();
    flipkartPage.searchForProduct(searchTerm);

    cy.wait(2000); 

    flipkartApi.searchProduct(searchTerm).then(apiResponse => {
      const apiProduct = apiResponse.body.items[0];

      flipkartPage.getFirstProductDetails().then(frontendDetails => {
        expect(frontendDetails.name).to.eq(apiProduct.name);
        expect(frontendDetails.price).to.eq(apiProduct.price);
        expect(`https://www.flipkart.com${frontendDetails.link}`).to.eq(apiProduct.link);
      });

      const productId = apiProduct.id;
      flipkartApi.getProductDetails(productId).then(productDetailsResponse => {
        expect(productDetailsResponse.status).to.eq(200);
        expect(productDetailsResponse.body).to.have.property('id', productId);
      });
    });
  });
});
