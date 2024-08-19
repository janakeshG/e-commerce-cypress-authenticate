describe('Security Tests', () => {
    before(() => {
      // Run OWASP ZAP security scans
      cy.exec('path/to/run_zap_scan.sh').then((result) => {
        cy.log('OWASP ZAP Scan Results:');
        cy.log(result.stdout);
      });
    });
  
    it('API Functional Test - Search Product', () => {
      cy.request('/api/search?query=Titan+watch')
        .its('status')
        .should('eq', 200);
    });
  
    it('API Functional Test - Product Details', () => {
      cy.request('/api/product/12345')
        .its('status')
        .should('eq', 200);
    });
  
    it('API Functional Test - Add to Cart', () => {
      cy.request({
        method: 'POST',
        url: '/api/add-to-cart',
        body: { product_id: '12345' },
      })
        .its('status')
        .should('eq', 200);
    });
  
    it('API Functional Test - Checkout', () => {
      cy.request({
        method: 'POST',
        url: '/api/checkout',
        body: { cart_id: '67890' },
      })
        .its('status')
        .should('eq', 200);
    });
  
    it('Frontend Security Test - HTTPS and Secure Cookies', () => {
      cy.visit('http://localhost:3000');
      
      cy.url().should('include', 'https');
      cy.getCookies().should('have.length', 1).then((cookies) => {
        expect(cookies[0].secure).to.be.true;
      });
    });
  
    after(() => {
      cy.log('test over');
    });
  });
  