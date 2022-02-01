const { assert, expect } = require("chai");

let searchDishes;
const X=TEST_PREFIX;
try {
    const dishSource = require("../src/" + X + "dishSource.js");
    if(dishSource.searchDishes)
        searchDishes= dishSource.searchDishes;
    else
        searchDishes= dishSource.default.searchDishes;
} catch(e) {};


describe("TW2.2 searchDishes", function() {
    this.timeout(200000);

    before(function(){
        if(!searchDishes) this.skip();
    });

    function testPromise(text, p, searchq) {
        it(text, async() => {
            let start = new Date();
            let dishes = await p();
            let finish = new Date();
            expect(finish-start, "promise searchDishes should take minimum 2 ms").to.be.above(2);
            expect(dishes).to.be.a("array");
            expect(dishes.length).to.not.equal(0);
            dishes.forEach(dish => {
                expect(dish).to.have.property("id");
                expect(dish).to.have.property("title");
                expect(dish).to.have.property("image");
                expect(dish.title.toLowerCase()).to.contain(searchq);
            });
        }).timeout(4000);
    }
    testPromise("searchDishes promise #1", ()=>searchDishes({query: "pizza", type: "main course"}), "pizza");
})