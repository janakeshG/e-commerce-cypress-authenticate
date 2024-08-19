class AmazonPage {
    visit() {
      cy.visit('https://www.amazon.in');
    }
  
    searchForProduct(searchTerm) {
      cy.get('.nav-searchbar nav-progressive-attribute').type(searchTerm);
      cy.get('.nav-input nav-progressive-attribute').click();
    }
  
    getFirstProductDetails() {
      return cy.get('.a-section aok-relative s-image-fixed-height').first().within(() => {
        return {
          name: cy.get('h2').invoke('text'),
          price: cy.get('.a-price-whole').invoke('text'),
          link: cy.get('a.a-link-normal').invoke('attr', 'href')
        };
      });
    }
  
    selectFirstProduct() {
      cy.get('.s-main-slot .s-result-item').first().click();
    }
  
    addToCart() {
      cy.get('#add-to-cart-button').click();
    }
  
    goToCart() {
      cy.get('#hlb-view-cart-announce').click();
    }
  
    proceedToCheckout() {
      cy.get('.a-button-input').click();
      cy.get('.a-button-text').contains('Proceed to checkout').click();
    }
  }
  
  
  export default AmazonPage;
  