class @RelaterCollection extends Backbone.Collection
	model : User
	url : chrome.extension.getBackgroundPage().base_url

	initialize :(attributes) ->
		@url = chrome.extension.getBackgroundPage().base_url+"/user/"+attributes.user_id+"/contacts"


class @RelaterView extends Backbone.View
	tagName:'li'
	className:'available_contact'
	events : {
		'click' : 	'sendRelaterModel'
	}
	initialize:(attributes) ->


	render: ->
		@$el.html HAML["relater"](user_model:@model)
		@

	sendRelaterModel:(event) ->
		console.log "relater clicked"
		chrome.extension.getBackgroundPage().user_to_send = @model

class @RelatersCollectionView extends Backbone.View
	tagName:'ul'
	render : ->
		for users_model in @collection.models
			relater = new RelaterView({"model":users_model})
			@$el.append relater.render().$el
		@
class @Message extends Backbone.Model
	initialize :(attributes)->
		@msg_id=attributes.msg_id
		@user_message=attributes.user_message
		@transform_pattern=attributes.transform_pattern

class @MessageCollection extends Backbone.Collection
	model:Message
	url:chrome.extension.getBackgroundPage().base_url
	initialize : (attributes)->
		@url=@url+"/messages.json"

class @MessageView extends Backbone.View
	tagName:'li'

	className:'messages_li_element'

	events :{
		"click": "send_message" 		
	}

	
	initialize :(attributes)->

	render : ->
		@$el.html HAML["message"](message_view_model:@model)
		@
	send_message :(event)->
		console.log "message clicked"
		chrome.extension.getBackgroundPage().message_to_send = @model
		chrome.extension.getBackgroundPage().sendMessage()
		

class @MessageCollectionView extends Backbone.View
	tagName:'ul'
	className:'messages_container'
	initialize :(attributes)->
	
	render : ()->
		for message_models in @collection
			relater= new MessageView({"model":message_models})
			@$el.append relater.render().$el
		@