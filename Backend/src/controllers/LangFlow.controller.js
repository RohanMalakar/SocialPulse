// controller.js

import LangflowClient from '../utils/LangflowClient.js';

// Define the controller method to handle requests
const runLangflow = async (req, res) => {
    const { inputValue, inputType = 'chat', outputType = 'chat', stream = false, tweaks = {} } = req.body;
    console.log('inputValue:', inputValue);
    const flowIdOrName = 'social_media';
    const langflowId = process.env.LANGFLOW_ID;
    const applicationToken = process.env.LANGFLOW_TOKEN;
    

    const langflowClient = new LangflowClient('https://api.langflow.astra.datastax.com', applicationToken);

    try {
        const response = await langflowClient.runFlow(
            flowIdOrName,
            langflowId,
            inputValue,
            inputType,
            outputType,
            tweaks,
            stream,
            (data) => res.write(JSON.stringify(data)), // stream response
            (message) => res.end(JSON.stringify({ message })), // stream closed
            (error) => res.status(500).json({ error })
        );
        if (!stream && response && response.outputs) {
            const flowOutputs = response.outputs[0];
            const firstComponentOutputs = flowOutputs.outputs[0];
            const output = firstComponentOutputs.outputs.message;
            res.json({ output: output.message.text });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error initiating session' });
    }
};

export default runLangflow;
