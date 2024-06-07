// src/Components/GaugeTittle.jsx
import React from "react";

const GaugeTittle = ({ value }) => {
    return (
        <div className="text-center text-xl font-bold my-2">
            {value}
        </div>
    );
};

export default GaugeTittle;
