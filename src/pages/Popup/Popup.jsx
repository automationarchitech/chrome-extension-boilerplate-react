import React, { useEffect, useState } from 'react';
import logo from '../../assets/img/logo.svg';
import Greetings from '../../containers/Greetings/Greetings';
import './Popup.css';

// import { PuppeteerWebBaseLoader } from "langchain/document_loaders/web/puppeteer";
// import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
// import { Document } from "langchain/document";

const Popup = () => {
    const [count, setCount] = useState(0);
    const [currentUrl, setCurrentUrl] = useState('');
    const [result, setResult] = useState('');
    const [processedUrl, setProcessedUrl] = useState('');

    // // Create a function that allows langchain to go and fetch the data
    // const getUrlDoc = async () => {
    //     if (currentUrl) {
    //         const loader = new PuppeteerWebBaseLoader(currentUrl);
    //         const docs = await loader.load();
    //         console.log(docs);
    //         setUrlDocOutput(JSON.stringify(docs)); // Update the urlDocOutput state with the output of getUrlDoc
    //     } else {
    //         console.error("Current URL is undefined");
    //     }
    // };

    const processUrl = (url) => {
        // send a message to the background script requesting URL processing
        chrome.runtime.sendMessage({ type: 'processUrl', url }, (response) => {
            // handle the response (replace this with your own response handling logic)
            setProcessedUrl(response.processedUrl);
        });
    };

    useEffect(() => {
        chrome.action.setBadgeText({ text: count.toString() });
    }, [count]);

    useEffect(() => {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            console.log("Tabs array:", tabs);
            const url = tabs[0].url;
            setCurrentUrl(url);
            console.log("Updated currentUrl state:", currentUrl);
            console.log("Popup.jsx ->>>", url);
            processUrl(url);
        });
    }, []);

    return (
        <>
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <p>
                        Edit <code>src/pages/Popup/Popup.jsx</code> and save to reload.
                    </p>
                    <div className="current-url">
                        Current URL: {currentUrl}
                    </div>
                    <div className="processed-url">
                        Processed URL: {processedUrl}
                    </div>
                    <div className="processed-result">
                        Processed Result: {result}
                    </div>
                    <a
                        className="App-link"
                        href="https://reactjs.org"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Learn React!
                    </a>
                </header>
            </div>
        </>
    );
};

export default Popup;