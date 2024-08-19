class FlipkartApi {
    constructor() {
      this.searchEndpoint = 'https://api.flipkart.com/search'; // Replace with the actual API endpoint
      this.productDetailsEndpoint = 'https://api.flipkart.com/product'; // Replace with the actual API endpoint
    }
  
    searchProduct(searchTerm) {
      return cy.request({
        method: 'GET',
        url: `${this.searchEndpoint}?q=${searchTerm}`,
        failOnStatusCode: false
      });
    }
  
    getProductDetails(productId) {
      return cy.request({
        method: 'GET',
        url: `${this.productDetailsEndpoint}/${productId}`,
        failOnStatusCode: false
      });
    }
  }
  
  export default FlipkartApi;
  