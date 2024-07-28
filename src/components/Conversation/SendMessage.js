const sendMessage = ({ socket, value, id, messageList, setMessageList, setIsLoading, setValue }) => {
    // Cập nhật trạng thái messageList và sau đó gửi tin nhắn
    setIsLoading(true)
    setMessageList(prevList => {
        const newList = [...prevList.slice(0, id), { Role: 'user', Content: value }, { Role: 'assistant', Content: '' }];
        
       
        const message = JSON.stringify({ index: id, content: value });
        
        socket.send(message);

        socket.onmessage = (event) => {
            setMessageList(prevList => {
                const updatedList = [...prevList];
                // Cập nhật nội dung của tin nhắn cuối cùng
                updatedList[updatedList.length - 1].Content += event.data;
                // console.log(event.data)
                return updatedList;
            });
        };

            if (setValue) setValue('');
            setIsLoading(false);

        return newList;
    });
};

export default sendMessage;