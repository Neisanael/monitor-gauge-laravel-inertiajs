// src/Layouts/GaugeLayout.jsx
import React from "react";
import GaugeMonitor from "@/Components/GaugeChart";
import GaugeTittle from "@/Components/GaugeTittle";
import AmbangBatas from "@/Components/AmbangBatas";
import TanggalGauge from "@/Components/TanggalGauge";
import LinkGraphGauge from "@/Components/LinkGraphGauge";

const GaugeLayout = ({ groupedGauges }) => {
    return (
        <div className="flex flex-row justify-center flex-wrap">
            {Object.keys(groupedGauges).map((group, groupIndex) => (
                <div
                    key={groupIndex}
                    className="flex flex-col items-center m-4"
                >
                    <div className="bg-gray-200 rounded-lg p-4 mb-4 w-full">
                        <h2 className="text-center text-2xl font-bold mb-2">
                            {group}
                        </h2>
                        <div className="flex flex-wrap justify-center">
                            {groupedGauges[group].map((gauge, gaugeIndex) => (
                                <div key={gaugeIndex} className="m-4">
                                    <GaugeTittle value={gauge.title} />
                                    <div className="w-full sm:max-w-md mt-2 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg">
                                        <GaugeMonitor value={gauge.value} />
                                    </div>
                                    <AmbangBatas value={gauge.value}/>
                                    <TanggalGauge value={gauge.date} />
                                    <LinkGraphGauge value="login" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default GaugeLayout;
