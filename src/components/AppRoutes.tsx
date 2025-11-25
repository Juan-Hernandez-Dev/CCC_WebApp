"use client"
import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Home from './Home'
import Aboutus from '../app/aboutus'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<Aboutus  />} />

      {/* No mover, plox */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
