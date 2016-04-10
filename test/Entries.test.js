/* eslint no-unused-expressions: [0] */
import _ from 'underscore';
import Backbone from 'backbone';
import chai from 'chai';
import Entries from '../src/collections/Entries';
import data from '../src/data/entries.json';

const expect = chai.expect;

describe('Entries Collection must:', () => {
	let entries;

	beforeEach(() => entries = new Entries(data));
	afterEach(() => entries = null);

	it('be a Backbone Collection', () => expect(entries).to.be.an.instanceof(Backbone.Collection));

	it('have a length property with 59 entries', () => {
		expect(entries).to.have.property('length');
		expect(_.isNumber(entries.length)).to.be.true;
		expect(entries).length(61);
	});

	it('contains entry models with unique IDs', () => {
		const ids = [];
		entries.each((entry) => ids.push(entry.get('id')));
		expect(ids).to.eql(_.range(1, 62));
	});

	it('return an unviewed entry ID', () => {
		// View all entries
		entries.models.map((entry) => entry.set({ viewed: true }));

		// except these 3
		entries.at(0).set({ viewed: false });  // model.get('id') => 1
		entries.at(28).set({ viewed: false }); // model.get('id') => 29
		entries.at(31).set({ viewed: false }); // model.get('id') => 32

		expect(_.isNumber(entries.getUnviewedEntryID())).to.be.true;
		expect(_.contains([1, 29, 32], entries.getUnviewedEntryID())).to.be.true;
	});
});
