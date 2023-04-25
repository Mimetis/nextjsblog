"use client";
import * as React from 'react';
import { useState } from 'react';



export default function Test () {
    const [inputValue, setInputValue] = useState("");
    const [listItems, setListItems] = useState<any>([]);
    const [showDialog, setShowDialog] = useState(false);
  
    const handleInputChange = (e) => {
      setInputValue(e.target.value);
    };
  
    const handleAddToList = () => {
        setShowDialog(true);
    };
  
    const handleDialogClose = () => {
      if (inputValue) {
        setListItems([...listItems, inputValue]);
        setInputValue("");
      }
      setShowDialog(false);
    };
  
    return (
      <div className="w-80 mx-auto mt-10">
        <input
          type="text"
          placeholder="Add item to list"
          className="w-full p-2 border border-gray-300 rounded mb-4"
          value={inputValue}
          onChange={handleInputChange}
        />
        <button
          className="bg-blue-500 text-white rounded p-2"
          onClick={handleAddToList}>
          Add to List
        </button>
        {showDialog && (
          <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen">
              <div className="bg-white rounded-lg w-80">
                <div className="p-4">
                  <input
                    type="text"
                    placeholder="Enter item"
                    className="w-full p-2 border border-gray-300 rounded mb-4"
                    value={inputValue}
                    onChange={handleInputChange}
                  />
                  <div className="flex justify-end">
                    <button
                      className="bg-gray-200 rounded p-2 mr-2"
                      onClick={() => setShowDialog(false)}
                    >
                      Cancel
                    </button>
                    <button
                      className="bg-blue-500 text-white rounded p-2"
                      onClick={handleDialogClose}
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        <ul className="list-disc list-inside mt-4">
          {listItems.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    );}
