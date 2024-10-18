// src/BluetoothButton.js
import React, { useState } from 'react';
import './BluetoothButton.css'; // Import the CSS file
import bluetoothImage from './assets/bluetooth_image.png'; // Import the image

function BluetoothButton() {
    const [device, setDevice] = useState(null);
    const [range, setRange] = useState(null);

    const connectToBluetooth = async () => {
        try {
            const device = await navigator.bluetooth.requestDevice({
                acceptAllDevices: true,
            });
            setDevice(device);
            const server = await device.gatt.connect();

            // Simulate checking range after connection
            setRange(Math.floor(Math.random() * 100) + ' meters');

            // Listen for disconnection events
            device.addEventListener('gattserverdisconnected', onDisconnected);
        } catch (error) {
            console.error('Error connecting to Bluetooth device:', error);
        }
    };

    const onDisconnected = () => {
        console.log('Device disconnected. Resetting state.');
        setDevice(null);
        setRange(null); // Reset range when disconnected
    };

    const disconnectDevice = () => {
        if (device && device.gatt.connected) {
            device.gatt.disconnect();
            onDisconnected(); // Call the disconnect handler to reset state
        }
    };

    return (
        <div className="container">
            <img src={bluetoothImage} alt=""></img>
            <button onClick={connectToBluetooth}>Connect to Bluetooth</button>
            {device && (
                <div className="device-info">
                    <p>Connected to: {device.name || 'Unnamed Device'}</p>
                    <p>Range: {range}</p>
                    <button onClick={disconnectDevice}>Disconnect</button>
                </div>
            )}
        </div>
    );
}

export default BluetoothButton;
