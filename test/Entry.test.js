/* eslint no-unused-expressions: [0] */
import chai from 'chai';
import Backbone from '../node_modules/backbone/backbone-min';
import Entry from '../src/models/Entry';

let expect = chai.expect;

describe('Entry must', () => {
	let validEntry;

	beforeEach(() => {
		validEntry = new Entry({
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

	afterEach(() => validEntry = null);

	it('be a Backbone Model', () => expect(validEntry).to.be.instanceof(Entry));

	it('have correct JSON representation', () => {
		const expectedJSON = {
			id: 1,
			title: 'Title',
			description: 'Description',
			categories: [ 'cat 1', 'cat 2', 'cat 3' ],
			references: [ 'resource 1', 'resource 2' ],
			viewed: false,
			urlFriendlyTitle: 'title'
		};

		expect(validEntry.toJSON()).to.deep.eq(expectedJSON);
	});

});
