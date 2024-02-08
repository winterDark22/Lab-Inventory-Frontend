import React, { useState } from "react";
import { useStorageContext } from "../../context/StorageContext";
import { ACTION } from "../../context/StorageContext";

export function AddNewItem(params) {
  const { dispatch } = useStorageContext();

  const [form, setForm] = useState({
    name: "",
    quantity: "",
    category: "",
    cost: "",
    description: "",
    image: "",
    permit: "",
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

    //console.log(equipment);

    const response = await fetch("/api/equipments/addnewequipment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(equipment),
    });

    const responseJSON = await response.json();

    if (response.ok) {
      // alert("Equipment added successfully");

      //console.log(responseJSON);
      dispatch({ type: ACTION.ADD_IN_STORAGE, payload: responseJSON });

      setForm({
        name: "",
        quantity: "",
        category: "",
        cost: "",
        description: "",
        image: "",
        permit: "",
      });
    }
  };

  return (
    <div className="flex flex-col items-center mt-8 h-screen">
      <div className="bg-white space-y-4 w-3/4 ml-60 font-roboto text-gray-700 p-6 mb-8 rounded-lg">
        <h2 className="text-xl font-extrabold mb-0.5">Add equipment</h2>
        <h3 className="text mb-4">
          Enter the Information of the new equipment
        </h3>
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

        <div className="flex flex-col">
          <input
            type="text"
            name="category"
            value={form.category}
            placeholder="Category"
            onChange={handleChange}
            className="border p-2 text-sm"
          />
        </div>

        <div className="flex flex-col">
          <input
            type="number"
            name="cost"
            value={form.cost}
            placeholder="Cost"
            onChange={handleChange}
            className="border p-2 text-sm"
          />
        </div>
        <div className="flex flex-col">
          <textarea
            name="description"
            value={form.description}
            placeholder="Description"
            onChange={handleChange}
            className="border p-2 text-sm"
          />
        </div>

        <div className="flex flex-col">
          <input
            type="text"
            name="image"
            value={form.image}
            placeholder="Image URL"
            onChange={handleChange}
            className="border p-2 text-sm"
          />
        </div>

        <div className="flex flex-col">
          <input
            type="number"
            name="permit"
            value={form.permit}
            placeholder="Permission Level"
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
