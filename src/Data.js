import React from "react";
import { useState } from "react";

const Data = ({ data }) => {
    var num = Math.floor(Math.random() * 90000) + 10000;
    const [arr, setArr] = useState([]);
    // data.Num = num;
    arr.push(data);
    console.log("arr", arr);
    localStorage.setItem("logs", JSON.stringify(arr));
    return (
        <>
            <tr>
                <td>1</td>
                <td>{num}</td>
                <td>{data.Time}</td>
                <td>{data.Open}</td>
                <td>Otto</td>
                <td>@mdo</td>
            </tr>
        </>
    );
};

export default Data;
