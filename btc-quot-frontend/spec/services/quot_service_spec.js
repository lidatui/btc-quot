(function() {

  describe("service: QuotService", function() {
    Given(function() {
      return module("app");
    });
    Given(function() {
      var _this = this;
      return inject(function($http, QuotService) {
        _this.QuotService = QuotService;
        _this.$httpPost = spyOn($http, 'post');
        return _this.$httpGet = spyOn($http, 'get');
      });
    });
    describe("#find", function() {
      Given(function() {
      });
      When(function() {
        return this.QuotService.find();
      });
      return Then(function() {
        return expect(this.$httpGet).toHaveBeenCalledWith('/quot');
      });
    });
  });

}).call(this);
