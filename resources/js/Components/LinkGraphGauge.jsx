// src/Components/LinkGraphGauge.jsx
import React from "react";
import { Link } from "@inertiajs/react";

const LinkGraphGauge = ({ value }) => {
    return (
        <div className="flex justify-center mt-2">
            <Link
                href={route(value)} 
                className="text-blue-600 underline cursor-pointer"
            >
                Graph
            </Link>
        </div>
    );
};

export default LinkGraphGauge;
