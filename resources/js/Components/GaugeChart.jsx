// src/GaugeMonitor.jsx
import React from "react";
import GaugeComponent from "react-gauge-component";

const LowOrHigh = (value) => {
    if (value === 0) {
        return "low"
    } else {
        return "high"
    }
};

const GaugeMonitor = ({ value }) => {
    return (
        <GaugeComponent
            arc={{
                nbSubArcs: 150,
                colorArray: ["#5BE12C", "#F5CD19", "#EA4228"],
                width: 0.3,
                padding: 0.003,
            }}
            labels={{
                valueLabel: {
                    fontSize: 40,
                    formatTextValue: value => value + '%'
                },
                tickLabels: {
                    type: "outer",
                    defaultTickValueConfig: {
                        formatTextValue: LowOrHigh
                    }
                },
            }}
            value={value}
            maxValue={100}
        />
    );
};

export default GaugeMonitor;
