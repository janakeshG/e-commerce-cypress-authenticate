
class FlipkartPage {
    visit() {
      cy.visit('https://www.flipkart.com');
    }
  
    closeLoginPopup() {
    cy.get('button.pop-up-button').then($btn => {
      if ($btn.length) {
        cy.wrap($btn).click();
      } else {
        cy.log('Pop-up button not found');
      }
    });
  }


  
    searchForProduct(searchTerm) {
      cy.get('input.zDPmFV').type(searchTerm); 
      cy.get('button.MJG8Up').click();
    }
  
    getFirstProductDetails() {
      return cy.get('a._1sdMkc LFEi7Z Cd8ZYz').first().within(() => {
        return {
          name: cy.get('a.syl9yP').invoke('text'),
          price: cy.get('.Nx9bqj').invoke('text'),
          link: cy.get('a.s1Q9rs').invoke('attr', 'href')
        };
      });
    }
  
    getFirstProductPrice() {
      return cy.get('._1AtVbE').first().within(() => {
        return cy.get('._30jeq3').invoke('text').then(priceText => {
          return parseFloat(priceText.replace(/[^0-9.]/g, '')); 
        });
      });
    }
  
    selectFirstProduct() {
      cy.get('._2ABVdq').first().click();
    }
  
    switchAndaddToCart() {
      cy.get('a[target="_blank"]').then(($link) => {
        const href = $link.prop('href'); 
        cy.visit(href); 
      });
  
      cy.url().should('include', 'https://www.flipkart.com/titan'); 
      cy.title().should('match', new RegExp(`Titan`));
      cy.get('.QqFHMw vslbG+ In9uk2 _7dtcvJ').click(); 
    }
  }
  
    goToCart() {
      cy.get('._38VF5e').click(); 
    }
  
    proceedToCheckout() {
      cy.get('.QqFHMw zA2EfJ _7Pd1Fp').click();
      cy.url().should('eq', 'https://www.flipkart.com/checkout/init');
  }
  
  export default FlipkartPage;
