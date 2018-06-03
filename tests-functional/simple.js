/* eslint prefer-arrow-callback: 0, no-var: 0 */
casper.test.begin('site navigation: entry changed on click', function suite(test) {
	var title;
	casper.start('http://127.0.0.1:8080', function () {
		test.assert(this.status().currentHTTPStatus === 200, 'page loads successfully');
	});

	casper.wait(3000);

	casper.then(function () {
		title = this.fetchText('h1');
		test.assertTruthy(title, 'title has value');
		casper.click('body');
	});

	casper.then(function () {
		test.assertNotEquals(this.fetchText('h1'), title, 'title changes after click');
		title = this.fetchText('h1');
	});

	casper.run(function () {
		test.done();
	});
});

casper.test.begin('site navigation: random entry is shown when id was not found', function suite(test) {
	casper.start('http://127.0.0.1:8080/index.html#entry/a_non_existing_id', function () {
		test.assert(this.status().currentHTTPStatus === 200, 'page loads successfully');
	});

	casper.wait(3000);

	casper.then(function () {
		test.assertElementCount('article > *', 3, 'a non-empty random entry has been loaded');
	});

	casper.run(function () {
		test.done();
	});
});

casper.test.begin('content: references are shown', function suite(test) {
	casper.start('http://127.0.0.1:8080/index.html#entry/31', function () {
		test.assert(this.status().currentHTTPStatus === 200, 'page loads successfully');
	});

	casper.wait(3000);

	casper.then(function () {
		test.assertTruthy(this.exists('ul.references'), 'reference list exists');
		test.assertElementCount('ul.references li', 2, 'there are two references for this entry');
	});

	casper.run(function () {
		test.done();
	});
});
