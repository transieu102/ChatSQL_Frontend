const Config = {
    login_url : "http://127.0.0.1:8000/auth/login",
    register_url : "http://127.0.0.1:8000/auth/register",
    update_api_key : "http://127.0.0.1:8000/auth/apikey_update",
    get_conversations_list : "http://127.0.0.1:8000/conversations/get_by_uid",
    get_database_list : "http://127.0.0.1:8000/databases/get_by_uid",
    new_conversation_url : "http://127.0.0.1:8000/conversations/create",
    delete_conversation_url : "http://127.0.0.1:8000/conversations/delete_conversation",
    add_database_url : "http://127.0.0.1:8000/databases/create",
    delete_database_url : "http://127.0.0.1:8000/databases/delete",
    get_messages_url : "http://127.0.0.1:8000/messages/get_by_conid",
    get_conversation: "http://127.0.0.1:8000/conversations/conversation_info",
    chat_socket_url : "ws://localhost:8000/messages/ws/chat"


    
}

export default Config