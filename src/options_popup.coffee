window.options_for_message = null 
window.relater_to_send = null 
window.relater_threads = null
window.transformed_message = null
loadMessages = ()->
	console.log "window.options_for_message"
	console.log window.options_for_message
	console.log "window.relater_to_send"
	console.log window.relater_to_send
	messages_container_view =  new MessagesViewContainer()
	$(".container").html messages_container_view.render().$el
	relater_threads_view = new ThreadsCollectionView({"collection":window.relater_threads})
	message_collection_view = new MessageCollectionView({"collection":window.options_for_messages})
	$("#messages_container").html message_collection_view.render().el
	$("#threads_container").html relater_threads_view.render().el
	$("#message_head").html window.transformed_message
	$("title").html window.transformed_message
	chrome.tts.speak(String(window.transformed_message))



# document.addEventListener("DOMContentLoaded",loadMessages)
