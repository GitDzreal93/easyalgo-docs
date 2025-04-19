'use client';

import React from 'react';
import { ErrorBoundary } from './ErrorBoundary';
import { ErrorState } from './ErrorState';

interface Props {
  children: React.ReactNode;
}

export function ClientDocumentWrapper({ children }: Props) {
  return (
    <ErrorBoundary fallback={(error) => <ErrorState error={error} />}>
      {children}
    </ErrorBoundary>
  );
} 