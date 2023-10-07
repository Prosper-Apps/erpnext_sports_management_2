// Copyright (c) 2023, KAINOTOMO PH LTD and contributors
// For license information, please see license.txt

frappe.ui.form.on('Team Roster', {

	// When the team is changed, update the positions
	team: function (frm) {
		// Refresh the positions
		frm.refresh_field("positions");

		// Get the team sports type
		var sports_type = frappe.db.get_value("Team", frm.doc.team, "sports_type", function (r) {
			// Set the sports type
			frm.set_query("position", function () {			
				return {
					"filters": [
						["Position", "role", "=", "Player"],
						["Position", "sports_type", "=", r.sports_type]
					]
				};
			}
			);
		});
	},

	refresh: function (frm) {
		// Limit the position column to only show the coach position
		frm.set_query("position", function () {			
			return {
				"filters": [
					["Position", "role", "=", "Player"],
					["Position", "sports_type", "=", ""]
				]
			};
		}
		);
	}
});
