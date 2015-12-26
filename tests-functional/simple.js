casper.test.begin('site navigation: entry changed on click', function suite(test){
	var title;
	casper.start('http://127.0.0.1:8080', function() {
		test.assert(this.status().currentHTTPStatus == 200, "page loads successfully");
	});

	casper.wait(3000);

	casper.then(function() {
		title = this.fetchText('h1');
		test.assertTruthy(title, 'title has value');
		console.log(this.fetchText('h1'));
		casper.click('body');
	});

	casper.then(function() {
		test.assertNotEquals(this.fetchText('h1'), title, 'title changes after click');
		title = this.fetchText('h1');
		console.log(this.fetchText('h1'));
	});

	casper.run(function() {
		test.done();
	});
});

casper.test.begin('content: references are shown', function suite(test) {
	casper.start('http://127.0.0.1:8080/index.html#entry/31', function() {
		test.assert(this.status().currentHTTPStatus === 200, "page loads successfully");
	});

	casper.wait(3000);

	casper.then(function() {
		console.log(this.fetchText('h1'));
		test.assertTruthy(this.exists('ul.references'), 'reference list exists');
		test.assertElementCount('ul.references li', 2, 'there are two references for this entry');
	});

	casper.run(function() {
		test.done();
	});
});
