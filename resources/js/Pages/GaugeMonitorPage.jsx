import React, { useEffect, useState } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import GaugeLayout from "../Layouts/GaugeLayout";
import { initializeApp } from "firebase/app";

const GaugeMonitorPage = () => {
    const [groupedGauges, setGroupedGauges] = useState({});

    useEffect(() => {
        const firebaseConfig = {
            apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
            authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
            databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
            projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
            storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
            messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
            appId: process.env.REACT_APP_FIREBASE_APP_ID,
            measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
        };
        

        const app = initializeApp(firebaseConfig);
        const database = getDatabase(app);

        // Reference to the 'gauge' node in the database
        const gaugeRef = ref(database, "gauge");

        // Listener for changes in the 'gauge' node
        const unsubscribe = onValue(gaugeRef, (snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                const transformedData = transformData(data);
                setGroupedGauges(transformedData);
            } else {
                setGroupedGauges({});
            }
        });
        return () => {
            unsubscribe();
        };
    }, []);

    const transformData = (data) => {
        // Convert the received data into the desired format
        return Object.entries(data).reduce((acc, [room, gauges]) => {
            acc[room] = Object.entries(gauges).map(([title, gaugeData]) => ({
                title,
                ...gaugeData,
            }));
            return acc;
        }, {});
    };

    return (
        <div className="min-h-screen flex flex-col items-center pt-6 sm:pt-0 bg-gray-100">
            <GaugeLayout groupedGauges={groupedGauges} />
        </div>
    );
};

export default GaugeMonitorPage;
