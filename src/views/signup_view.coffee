class @SignupView extends Backbone.View
	
	tagName : 'div'
	
	className : 'sign_up'
	
	events : 
		'click button#google_sign_in' :'register'

	initialize : ->
		console.log "signup view initialized"

	register : (event) ->
		event.preventDefault()		
		chrome.pushMessaging.getChannelId(false,complete_registration)
		#oauth=chrome.extension.getBackgroundPage().oauth
		#oauth.authorize(onauthorized)
	complete_registration = (google_chrome_channel_id) ->
		email_id_value = $("#user_email_id").val()
		##Need to be changed later
		new_user = new User({email_id:email_id_value,channel_id:google_chrome_channel_id.channelId,name:'sample_username'})
		new_user.save {} ,
			success : (model) ->
				console.log model
				if model.get("status")=="success"
					new_user.set({"id":model.get("user_id")})
					$(".status").html("Registered successfully")
					localStorage["registered"]=true
					localStorage["registered_user_id"]=model.get("user_id")					
				else if model.get("status")=="failure"
					$(".status").html("For some reasons registration failed.Please try again later")
					localStorage["registered"]=false
					localStorage["registered_user_id"]=null
				else
					$(".status").html(model.get("status"))
					localStorage["registered"]=false
					localStorage["registered_user_id"]=null
			error : ->
					$(".status").html("For some reasons registration failed.Please try again later")

	render : ->
		@$el.html HAML['signup']()
		@

	onauthorized = ->
		URL = "https://www.googleapis.com/auth/userinfo#email"
		REQUEST =
			"method" : "GET"
			"parameters" :
						"alt" : "json"
		oauth.sendSignedRequest(URL,onresultcomplete,REQUEST)						

	onresultcomplete = (response,xhr) ->
		console.log("response "+response);
		console.log("xhr "+xhr);