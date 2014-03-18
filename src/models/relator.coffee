class @RelaterModel extends Backbone.Model
	initialize: (attributes) ->
		@user_id=attributes.user_id
		@name=attributes.name
		@friend_id=attributes.friend_id
		@rel_status=attributes.rel_status

	defaults :
		user_id:"sample_user_id"
		rel_status:"sample rel status"
		friend_id:"sample friend id"
		name:"name"
