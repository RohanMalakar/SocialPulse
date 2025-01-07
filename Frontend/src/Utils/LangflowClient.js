// LangflowClient.js
export default class LangflowClient {
  constructor(baseURL, applicationToken) {
    this.baseURL = baseURL;
    this.applicationToken = applicationToken;
  }

  async post(endpoint, body) {
    const url = `${this.baseURL}${endpoint}`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.applicationToken}`,
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`${response.status} - ${error.message || "Unknown error"}`);
    }
    return response.json();
  }

  async runFlow(flowId, langflowId, inputValue, tweaks, stream, onUpdate, onClose, onError) {
    const endpoint = `/lf/${langflowId}/api/v1/run/${flowId}?stream=${stream}`;
    const response = await this.post(endpoint, {
      input_value: inputValue,
      tweaks,
    });

    // Handle streaming if enabled
    if (stream && response.outputs[0]?.outputs[0]?.artifacts?.stream_url) {
      const streamUrl = response.outputs[0].outputs[0].artifacts.stream_url;
      this.handleStream(streamUrl, onUpdate, onClose, onError);
    }
    return response;
  }

  handleStream(streamUrl, onUpdate, onClose, onError) {
    const eventSource = new EventSource(streamUrl);
    eventSource.onmessage = (event) => onUpdate(JSON.parse(event.data));
    eventSource.onerror = (error) => {
      onError(error);
      eventSource.close();
    };
    eventSource.addEventListener("close", () => {
      onClose();
      eventSource.close();
    });
  }
}


