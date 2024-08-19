class AmazonApi {
    constructor() {
      this.productDetailsEndpoint = 'https://www.flipkart.com/search?q=titan&otracker=search&otracker1=search&marketplace=FLIPKART&as-show=on&as=off'; 
     
      this.searchEndpoint = 'https://www.amazon.in/'; 
     
    }

  
    searchTheProduct(searchedItem) {
      return cy.request({
        method: 'GET',
        url: `${this.searchEndpoint}?q=${searchedItem}`,
        failOnStatusCode: false
      });
    }
  
    getTheProductDetails(productIdForSearch) {
      return cy.request({
        method: 'GET',
        url: `${this.productDetailsEndpoint}/${productIdForSearch}`,
        failOnStatusCode: false
      });
    }
  }
  
  export default AmazonApi;
  