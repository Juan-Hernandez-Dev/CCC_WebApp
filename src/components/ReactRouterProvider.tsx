"use client"
import React from 'react'
import { BrowserRouter } from 'react-router-dom'

type Props = {
  children: React.ReactNode
}

export default function ReactRouterProvider({ children }: Props) {
  return <BrowserRouter>{children}</BrowserRouter>
}
