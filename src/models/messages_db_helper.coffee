class @Messages
	init : ->
		@version = 2
		@database=null
		@transaction=null
		@messages_url=chrome.extension.getBackgroundPage().base_url+"/messages.json"
		@message_options_url=chrome.extension.getBackgroundPage().base_url+"/message_options.json"
		@db_name="calltheteam"
		@request = indexedDB.open(@db_name,@version)
		@request.onupgradeneeded = (event)->
			db = event.target.result
			if db.objectStoreNames.contains("messages") 
				db.deleteObjectStore("messages")
			if db.objectStoreNames.contains("message_options")
				db.deleteObjectStore("message_options")
			object_store_messages = db.createObjectStore("messages",{keyPath:"id"})
			object_store_message_options = db.createObjectStore("message_options",{keyPath:"id"})
		@request.onsuccess = (event)=>
			console.log "database opening good"
			@database=event.target.result
			getAllMessages()
		@request.onerror = (event)->
			console.log "database_logging_error" +event.value

	addMessage : (object_to_store)->
		if @database != null 
			@transaction=@database.transaction(["messages"],"readwrite")
			@store = @transaction.objectStore("messages");
			request = @store.put(object_to_store)
			request.onsuccess = (event)->
				console.log "message successfully written"
			request.onerror = (event)->
				console.log "insertion error"

	addMessageOptions : (object_to_store)->
		if @database != null 
			@transaction=@database.transaction(["message_options"],"readwrite")
			@store = @transaction.objectStore("message_options");
			request = @store.put(object_to_store)
			request.onsuccess = (event)->
				console.log "message successfully written"
			request.onerror = (event)->
				console.log "insertion error"

	fetch :()->
    	$.get(@messages_url,(data) => @.addMessage {"id":messages.msg_id,"user_message":messages.user_message,"transform_pattern":messages.transform_pattern} for messages in data)
    	$.get(@message_options_url,(data) => @.addMessageOptions {"id":message_option.id,"message_id":message_option.message_id,"options_id":message_option.options_id} for message_option in data)


	needToSync:()->
		now = new Date()

			
	getAllMessages:()->	
		objectstore = @database.transaction(["message_options"]).objectStore("message_options")
		objectstore.openCursor().onsuccess = (event)->
			cursor = event.target.result
			chrome.extension.getBackgroundPage().messages_with_options.push(cursor.value)
			if cursor 
			cursor.continue()
