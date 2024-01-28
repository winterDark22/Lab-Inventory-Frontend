import React, { useState } from "react";
import { useEquipmentsContext } from "../../context/EquipmentsContext";
import { ACTION } from "../../context/EquipmentsContext";
import { useAuthContext } from "../../context/AuthContext";

export function UpdateStorage(params) {
  const { user } = useAuthContext();

  const { dispatch } = useEquipmentsContext();

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
    console.log(equipment);

    const response = await fetch(
      `/api/storage/updatestorage/${user.username}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(equipment),
      }
    );

    const responseJSON = await response.json();

    if (response.ok) {
      // dispatch({ type: ACTION.UPDATE_STORAGE, payload: responseJSON });
      console.log(equipment);
      setForm({
        name: "",
        quantity: "",
      });
    }
  };

  return (
    <div className="flex flex-col items-center mt-8 h-screen">
      <div className="bg-white space-y-4 w-3/4 ml-60 font-roboto text-gray-700 p-6 mb-8 rounded-lg">
        <h2 className="text-xl font-extrabold mb-0.5">Add item</h2>
        <h3 className="text mb-4">Enter the Information of the new item</h3>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4 w-3/4 ml-64">
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
          className=" bg-primary text-white p-2 rounded-2xl"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
