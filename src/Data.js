import React, { useEffect, useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

import { db } from "./firebase-config";
const Data = ({ data }) => {
    const [estimate, setEstimate] = useState(0);
    const [color, setColor] = useState("green");
    const saveDataHandler = async () => {
        console.log("save");
        const ref = collection(db, "logs");
        const res = await addDoc(ref, {
            date: serverTimestamp(),
            time: data.Time,
            estimate: estimate,
        });
        console.log("res", res);
    };

    useEffect(() => {
        setEstimate(parseFloat(data.Distance / 60).toFixed(2));
    }, []);
    useEffect(() => {
        if (data.Distance < 7) {
            setColor("red");
        } else {
            setColor("green");
        }
        if (data.Distance <= 2) {
            saveDataHandler();
            console.log("saved");
        }
    }, [data.Distance]);

    return (
        <>
            <tr>
                <td>1</td>
                <td>{data.Time}</td>
                <td
                    style={{
                        color: color,
                    }}
                >
                    {data.Distance < 2 ? 0 : data.Distance} cms
                </td>
                <td
                    style={{
                        color: color,
                    }}
                >
                    {data.Distance < 2
                        ? 0
                        : parseFloat(data.Distance / 60).toFixed(2)}{" "}
                    secs
                </td>
                <td>
                    <div className="open">
                        <div
                            style={{
                                backgroundColor: data.Barrier_Down
                                    ? "red"
                                    : "black",
                            }}
                        ></div>
                        <div
                            style={{
                                backgroundColor: data.Barrier_Down
                                    ? "black"
                                    : "green",
                            }}
                        ></div>
                    </div>
                </td>
            </tr>
        </>
    );
};

export default Data;
