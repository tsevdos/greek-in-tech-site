// credits for setting up the test suite https://gist.github.com/maicki/7781943
describe('Array', function(){
	it('should return -1 when val not present', function(){
		chai.assert.equal(-1, [1,2,3].indexOf(5));
		chai.assert.equal(-1, [1,2,3].indexOf(0));
	});
});