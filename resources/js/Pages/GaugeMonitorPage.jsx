import React, { useEffect, useState } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import GaugeLayout from "../Layouts/GaugeLayout";
import { initializeApp } from "firebase/app";
import HeaderGauge from "@/Layouts/HeaderGauge";
import GaugeTable from "@/Layouts/GaugeTable";
import TableRow from "@/Layouts/TableRow";

const GaugeMonitorPage = () => {
    const [gaugeData, setGaugeData] = useState([]);
    const [tableData, setTableData] = useState([]);
    const [isFetching, setIsFetching] = useState(false);
    console.log('API Key:', process.env.REACT_APP_FIREBASE_API_KEY);
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

    useEffect(() => {
        const app = initializeApp(firebaseConfig);
        const database = getDatabase(app);

        const gaugeRef = ref(database, "gauge");

        const unsubscribeGauge = onValue(gaugeRef, (snapshot) => {
            if (snapshot.exists()) {
                const dataGauge = snapshot.val();
                const transformedDataGauge = transformDataGauge(dataGauge);
                console.log(transformedDataGauge);
                setGaugeData(transformedDataGauge);
            } else {
                setGaugeData([]);
            }
        });

        return () => {
            unsubscribeGauge();
        };
    }, []);

    const transformDataGauge = (data) => {
        return Object.entries(data).reduce((acc, [room, gauges]) => {
            acc[room] = Object.entries(gauges).map(([title, gaugeData]) => ({
                title,
                ...gaugeData,
            }));
            return acc;
        }, {});
    };

    const transformDataTable = (data) => {
        return {
            no: tableData.length + 1, // Incremental row number
            tanggalJam: data.tanggalJam || "",
            suhuRuang: data.suhuRuang || "",
            kelembabanRuang: data.kelembabanRuang || "",
            suhuKulkas: data.suhuKulkas || "",
        };
    };

    const fetchData = () => {
        setIsFetching(true);
        const app = initializeApp(firebaseConfig);
        const database = getDatabase(app);
        const tableRef = ref(database, "table");

        onValue(
            tableRef,
            (snapshot) => {
                if (snapshot.exists()) {
                    const dataTable = snapshot.val();
                    console.log("Raw data from Firebase:", dataTable);
                    const transformedDataTable = transformDataTable(dataTable);
                    console.log("Transformed data:", transformedDataTable);
                    setTableData((prevData) => [
                        ...prevData,
                        transformedDataTable,
                    ]);
                    setIsFetching(false);
                } else {
                    setIsFetching(false);
                }
            },
            { onlyOnce: true }
        );
    };

    return (
        <>
            <HeaderGauge />
            <div className="flex flex-col items-center pt-6 sm:pt-0 bg-gray-100">
                <GaugeLayout groupedGauges={gaugeData} />
            </div>
            <div className="flex justify-center mt-4">
                <button
                    onClick={fetchData}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    disabled={isFetching}
                >
                    {isFetching ? "Fetching..." : "Fetch Data"}
                </button>
            </div>
            <table className="min-w-full divide-y divide-gray-200">
                <GaugeTable />
                {tableData.map((row, index) => (
                    <TableRow key={index} data={row} rowNum={index + 1} />
                ))}
            </table>
        </>
    );
};

export default GaugeMonitorPage;
