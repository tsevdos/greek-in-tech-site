define(function (require) {

	var data = require('text!data/entries.json'),
		Entries = require('collections/Entries');

	describe('Entries Collection must:', function () {

		beforeEach(function () {
			this.entries = new Entries(JSON.parse(data));
		});

		afterEach(function () {
			this.entries = null;
		});

		it('be a Backbone Collection', function () {
			expect(this.entries).to.be.an.instanceof(Backbone.Collection);
		});

		it('have a length property with 45 entries', function () {
			expect(this.entries).to.have.property('length');
			expect(_.isNumber(this.entries.length)).to.be.true;
			expect(this.entries).length(45);
		});

		it('contains entry models with unique IDs', function () {
			var ids = [];

			this.entries.each(function(entry){
				ids.push(entry.get('id'));
			});

			expect(ids).to.eql(_.range(1, 46));
		});

		it('return an unviewed entry ID', function () {
			// View all entries
			this.entries.models.map(function(entry){
				entry.set({ viewed : true });
			});

			// except these 3
			this.entries.at(0).set({ viewed : false });  // model.get('id') => 1
			this.entries.at(28).set({ viewed : false }); // model.get('id') => 29
			this.entries.at(31).set({ viewed : false }); // model.get('id') => 32

			expect(_.isNumber(this.entries.getUnviewedEntryID())).to.be.true;
			expect(_.contains([1, 29, 32], this.entries.getUnviewedEntryID())).to.be.true;
		});

	});

});