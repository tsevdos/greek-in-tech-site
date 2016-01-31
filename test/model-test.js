import chai from 'chai'
import Backbone from '../node_modules/backbone/backbone-min'
import EntryModel from '../js/app/models/Entry'

let expect = chai.expect;



describe('Entry Model must', function () {

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


	xit('be a Backbone Model', function () {
		expect(this.validEntryModel).to.be.an.instanceof(Backbone.Model);
	});

	it('have correct JSON representation', function () {

		const expectedJSON = {
			id: 1,
			title: 'Title',
			description: 'Description',
			categories: [ 'cat 1', 'cat 2', 'cat 3' ],
			references: [ 'resource 1', 'resource 2' ],
			viewed: false,
			urlFriendlyTitle: 'title'
		};

		expect(this.validEntryModel.toJSON()).to.deep.eq(expectedJSON);
	});

});
