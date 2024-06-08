import React from "react";
import PropTypes from "prop-types";

const TableRow = ({ data, rowNum }) => {
    return (
        <tbody className="bg-white divide-y divide-gray-200">
            <tr>
                <td className="px-6 py-4 whitespace-nowrap">{rowNum}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                    {data.tanggalJam}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                    {data.suhuRuang}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                    {data.kelembabanRuang}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                    {data.suhuKulkas}
                </td>
            </tr>
        </tbody>
    );
};

TableRow.propTypes = {
    data: PropTypes.shape({
        tanggalJam: PropTypes.string.isRequired,
        suhuRuang: PropTypes.string.isRequired,
        kelembabanRuang: PropTypes.string.isRequired,
        suhuKulkas: PropTypes.string.isRequired,
    }).isRequired,
    rowNum: PropTypes.number.isRequired,
};

export default TableRow;
