define(function (require) {

	var EntryModel = require('models/Entry');

	describe('Entry Model must:', function () {

		beforeEach(function () {

			this.validEntryModel = new EntryModel({
				"id": 1,
				"title": "Title",
				"description": "Description",
				"categories": [
					"cat 1",
					"cat 2",
					"cat 3"
				],
				"references": [
					'resource 1',
					'resource 2'
				]
			});


		});

		afterEach(function () {
			this.entryModel = null;
		});

		it('be a Backbone Model', function () {
			expect(this.validEntryModel).to.to.be.an.instanceof(Backbone.Model);
		});

	});

});