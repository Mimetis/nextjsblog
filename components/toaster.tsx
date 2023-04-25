"use client";

import * as React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function Toaster() {
    return (<ToastContainer
        position="top-center"
        autoClose={2000}

    />);
}
