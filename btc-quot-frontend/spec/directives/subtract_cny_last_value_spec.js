describe("directive: subtract-cny-last-value", function() {
  beforeEach(function() {
    module("app");
  });
  beforeEach(inject(function($rootScope, $compile) {
    this.html = "<table><tr><td subtract-cny-last-value ></td></tr></table>";
    this.scope = $rootScope.$new();
    this.scope.qt = {
      "market": "mtgox",
      "title": "MT.GOX",
      "url": "https://www.mtgox.com",
      "CNY": {
        "time": "2013-12-03T01:21:44.106Z",
        "last": 6736.22404,
        "buy": 6534.05018,
        "sell": 6734.9683,
        "high": 6846.87168,
        "low": 6100,
        "vol": 7.29589213
      }
    };

    this.scope.q = {
      "market": "btcchina",
      "title": "BTC中国",
      "url": "http://www.btcchina.com",
      "CNY": {
        "time": "2013-12-03T01:21:44.130Z",
        "last": 6396.95,
        "buy": 6392.54,
        "sell": 6394.92,
        "high": 6449,
        "low": 6022.99,
        "vol": 74287.792
      }
    };
    this.elem = $compile(this.html)(this.scope);
    this.scope.$digest();
  }));

  describe("subtract last value", function() {
    it("6736.22404 - 6396.95 = '339.27404'", function() {
      expect(this.elem.text()).toBe('339.27');
    });
  });

});
