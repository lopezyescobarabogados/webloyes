'use client';

import { useState } from 'react';

interface UseSubscriptionModalReturn {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

export function useSubscriptionModal(): UseSubscriptionModalReturn {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return {
    isOpen,
    openModal,
    closeModal,
  };
}
