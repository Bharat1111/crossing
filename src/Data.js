import React, { useEffect } from "react";
import { useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { database, db } from "./firebase-config";
const Data = ({ data }) => {
    const [color, setColor] = useState("green");
    const saveDataHandler = async () => {
        const ref = collection(db, "logs");
        const res = await addDoc(ref, {
            date: serverTimestamp(),
            time: data.Time,
        });
        console.log("res", res);
    };

    useEffect(() => {
        if (data.Distance < 4) {
            setColor("red");
        } else {
            setColor("green");
        }
        if (data.Distance <= 4) {
            saveDataHandler();
            console.log("kdhsfuik");
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
                    {data.Distance < 4 ? 0 : data.Distance} cms
                </td>
                <td
                    style={{
                        color: color,
                    }}
                >
                    {data.Distance < 4
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
