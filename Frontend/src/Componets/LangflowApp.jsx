import React, { useState } from 'react';

function LangflowApp() {
    const [inputMessage, setInputMessage] = useState('');
    const [response, setResponse] = useState('');
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleInputChange = (e) => {
        setInputMessage(e.target.value);
    };

    const formatResponse = (responseText) => {
        const cleanedResponse = responseText.replace(/###/g, '').replace(/\*\*/g, '').trim(); // Remove ### and **
        const lines = cleanedResponse.split('\n');
    
        const formattedResponse = lines.map((line, index) => {
            const trimmedLine = line.trim();
    
            // Check for main headings
            if (/^\d+\./.test(trimmedLine) === false && trimmedLine.endsWith(':')) {
                return (
                    <h2 key={index} className="font-extrabold text-xl mt-4">
                        {trimmedLine}
                    </h2>
                );
            }
    
            // Check for subheadings
            if (/^\d+\./.test(trimmedLine)) {
                return (
                    <h3 key={index} className="font-bold text-lg mt-2">
                        {trimmedLine}
                    </h3>
                );
            }
    
            // Check for paragraphs or bullet points
            if (/^[-•]/.test(trimmedLine)) {
                return (
                    <p key={index} className="ml-4 text-base">
                        {trimmedLine}
                    </p>
                );
            }
    
            // Regular paragraphs
            if (trimmedLine) {
                return (
                    <p key={index} className="text-base mt-5 text-white">
                        {trimmedLine}
                    </p>
                );
            }
    
            return null; // Ignore blank lines
        });
    
        return formattedResponse;
    };
    

    const handleSendMessage = async () => {
        if (!inputMessage) return;
        setLoading(true);
        try {
            const res = await fetch('http://localhost:4001/api/v1/langflow/run-flow', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    inputValue: inputMessage,
                    inputType: 'chat',
                    outputType: 'chat',
                    stream: false,
                }),
            });
            const data = await res.json();
            if(data.output){
                const newHistory = { 
                    que: inputMessage,
                    response: ""
                };
                newHistory.response = data.output;
                setHistory([...history, newHistory]);
            }
        } catch (error) {
            console.error('Error:', error);
            setResponse('Failed to get a response from the server.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-w-full  items-center min-h-screen  bg-cover bg-center bg-gray-100">
            <div className="bg-purple-950 p-4    mr-1 h-[100vh] w-[30%]">
                <div className="flex justify-center">
                    <h1 className="text-3xl text-gray-400 font-extrabold mb-4">Social-Pulse Chatbot</h1>
                </div>
                <div className="mb-4">
                    <textarea
                        value={inputMessage}
                        onChange={handleInputChange}
                        className="w-full h-64 p-3 border bg-[#25004a] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 resize-none"
                        rows="4"
                        placeholder="Ask your query here..."
                    ></textarea>
                </div>
                <div className="flex justify-center">
                    <button
                        onClick={handleSendMessage}
                        className="w-80 py-2 bg-[#2e005b] text-white font-semibold shadow-lg rounded-lg hover:bg-gray-200 hover:text-black hover:shadow-md transition duration-300"
                        disabled={loading}
                    >
                        {loading ? 'Sending...' : 'Send Message'}
                    </button>
                </div>
            </div>
            <div className=" bg-purple-950 w-[70%] h-[100vh] overflow-y-auto ">
                {history && (
                    history.map((item, index) => (
                        <div key={index} className="mt-4 flex flex-col gap-1 w-full p-4 bg-purple-950 text-white rounded-lg">
                            <span className="font-bold mb-2">Question:</span>
                            <div className="text-sm w-full border rounded-md p-5 text-white">
                                {item.que}
                            </div>
                            <h3 className="font-bold mb-2">Response:</h3>
                            <div className="text-sm w-full border rounded-md p-5 text-white">
                                {formatResponse(item.response)}
                            </div>
                        </div>
                    ))
                )}
                {response && (
                    <div className="mt-4 flex flex-col gap-1 w-full p-4 bg-purple-950 text-white rounded-lg">
                        <span className="font-bold mb-2">error:</span>
                        <div className="text-sm w-full border rounded-md p-5 text-white">
                            {(response)}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default LangflowApp;
