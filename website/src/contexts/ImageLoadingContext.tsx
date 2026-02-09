'use client'

import React, { createContext, useContext } from 'react'

interface ImageLoadingContextType {
  priority?: boolean
}

const ImageLoadingContext = createContext<ImageLoadingContextType>({
  priority: false,
})

export const useImageLoading = () => useContext(ImageLoadingContext)

interface ImageLoadingProviderProps {
  priority?: boolean
  children: React.ReactNode
}

export const ImageLoadingProvider: React.FC<ImageLoadingProviderProps> = ({
  priority = false,
  children,
}) => {
  return (
    <ImageLoadingContext.Provider value={{ priority }}>{children}</ImageLoadingContext.Provider>
  )
}
