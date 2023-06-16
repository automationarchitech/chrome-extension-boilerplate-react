import React, { useEffect, useState } from 'react';
import logo from '../../assets/img/logo.svg';
import Greetings from '../../containers/Greetings/Greetings';
import './Popup.css';

const Popup = () => {
    const [count, setCount] = useState(0);
    const [currentUrl, setCurrentUrl] = useState('');
    const [result, setResult] = useState('');

    const processUrl = (url) => {
        // Your business logic here
        const processedResult = "Processed: " + url;
        setResult(processedResult);
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