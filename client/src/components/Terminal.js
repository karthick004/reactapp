import React, { useState, useEffect } from "react";
import Terminal, { TerminalOutput, TerminalInput } from "react-terminal-ui";
import io from "socket.io-client";

const socket = io("http://localhost:5000");

const TerminalComponent = () => {
    const [terminalLines, setTerminalLines] = useState([
        <TerminalOutput>Welcome to the React Web Terminal!</TerminalOutput>
    ]);

    const onInput = (input) => {
        setTerminalLines((prevLines) => [
            ...prevLines,
            <TerminalInput>{input}</TerminalInput>
        ]);
        socket.emit("command", input);
    };

    useEffect(() => {
        // Register event listener once
        const handleOutput = (data) => {
            setTerminalLines((prevLines) => [
                ...prevLines,
                <TerminalOutput>{data}</TerminalOutput>
            ]);
        };

        socket.on("output", handleOutput);

        // Cleanup function to prevent duplicate listeners
        return () => {
            socket.off("output", handleOutput);
        };
    }, []);

    return (
        <Terminal name="React Web Terminal" height="400px" onInput={onInput}>
            {terminalLines}
        </Terminal>
    );
};

export default TerminalComponent;

