import React, { useEffect } from "react";
import { useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { database, db } from "./firebase-config";
const Data = ({ data }) => {
  //   const [arr, setArr] = useState([]);
  //   arr.push(data);
  //   console.log("arr", arr);
  const [distance, setDistance] = useState(data.Distance);
  const [estimate, setEstimate] = useState(600000);
  const [color, setColor] = useState("green");
  useEffect(() => {
    if (estimate > 0) {
      const res = setTimeout(() => {
        setEstimate(estimate - 30000);
        setDistance(distance - 0.5);
      }, 200);
      return () => clearTimeout(res);
    }
  }, [estimate, distance]);

  const saveDataHandler = async () => {
    const ref = collection(db, "logs");
    const res = await addDoc(ref, {
      date: serverTimestamp(),
      time: data.Time,
    });
    console.log("res", res);
  };

  useEffect(() => {
    if (distance < 5) {
      setColor("red");
    } else if (distance < 10) {
      setColor("gray");
    } else {
      setColor("green");
    }
    if (distance <= 0) {
      saveDataHandler();
      console.log("kdhsfuik");
    }
  }, [distance]);
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
          {distance} kms
        </td>
        <td
          style={{
            color: color,
          }}
        >
          {estimate < 0 ? 0 : parseFloat(estimate / 60000).toFixed(2)} mins
        </td>
        <td>
          <div className="open">
            <div
              style={{
                backgroundColor: estimate > 0 ? "red" : "black",
              }}
            ></div>
            <div
              style={{
                backgroundColor: estimate <= 0 ? "green" : "black",
              }}
            ></div>
          </div>
        </td>
      </tr>
    </>
  );
};

export default Data;
