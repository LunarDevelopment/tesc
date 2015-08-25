'use strict';

describe('Controller: PayCtrl', function () {

  // load the controller's module
  beforeEach(module('tweadsApp'));

  var PayCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PayCtrl = $controller('PayCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(PayCtrl.awesomeThings.length).toBe(3);
  });
});
