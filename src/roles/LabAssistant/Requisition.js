import React, { useState } from "react";
import { useStorageContext } from "../../context/StorageContext";
import { ACTION } from "../../context/StorageContext";
import { useAuthContext } from "../../context/AuthContext";

export function Requisition(params) {
  const { user } = useAuthContext();

  const [form, setForm] = useState({
    name: "",
    quantity: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const equipment = { ...form };

    const response = await fetch(
      `/api/requisition/createrequisition/${user.username}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          equipment_name: equipment.name,
          quantity: equipment.quantity,
        }),
      }
    );

    const responseJSON = await response.json();

    if (response.ok) {
      setForm({
        name: "",
        quantity: "",
      });
    }
  };

  return (
    <div className="flex flex-col items-center mt-8 h-screen">
      <div className="bg-white space-y-4 w-3/4 ml-24 font-roboto text-gray-700 p-6 mb-8 rounded-lg">
        <h3 className="text mb-4">
          Enter the Information of the new equipment
        </h3>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4 w-3/4 ml-24">
        <div className="flex flex-col">
          <input
            type="text"
            name="name"
            value={form.name}
            placeholder="Equipment Name"
            onChange={handleChange}
            className="border p-2 text-sm"
          />
        </div>

        <div className="flex flex-col">
          <input
            type="number"
            name="quantity"
            value={form.quantity}
            placeholder="Quantity"
            onChange={handleChange}
            className="border p-2 text-sm"
          />
        </div>

        <button
          type="submit"
          className="text-white text-sm bg-primary rounded-lg px-4 py-2 inline-block text-center hover:bg-red-500 hover:drop-shadow-xl w-full"
        >
          Add item
        </button>
      </form>
    </div>
  );
}
