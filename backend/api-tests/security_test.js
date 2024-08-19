const securityTestPayloads = [
    "' OR '1'='1",    // SQL Injection
    "<script>alert('XSS')</script>", 
    "<img src = x onerror=alert(1)>", 
    "http://testing.com" // CSRF
  ];
  
  describe('Security Testing', () => {
    it('Security test', () => {
        securityTestPayloads.forEach(payload => {
        cy.request({
          method: 'POST',
          url: '/api/add-to-cart',
          body: { product_id: payload },
          failOnStatusCode: false 
        }).then((response) => {
         
          expect(response.status).to.be.oneOf([200, 400]); 
         
        });
      });
    });
  });
  