(function() {

  describe("controller: QuotController", function() {
    Given(function() {
      return module("app");
    });
    Given(inject(function($controller, $rootScope, $interval, $timeout, QuotService) {
      this.scope = $rootScope.$new();
      return $controller('QuotController', {
        $scope: this.scope,
        $interval: $interval,
        $timeout: $timeout,
        QuotService: QuotService
      });
    }));

    return describe("subtract last value", function() {

      Then("1200 - 1100 = '100.00'", function() {
        return expect(this.scope.subtract(1200,1100)).toBe('100.00');
      });

      Then("1200 - 0 = 'N/A'", function() {
        return expect(this.scope.subtract(1200,0)).toBe('N/A');
      });

      Then("1200 - null = 'N/A", function() {
        return expect(this.scope.subtract(1200,null)).toBe('N/A');
      });
    });
  });

}).call(this);
