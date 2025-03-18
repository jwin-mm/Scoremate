import { atom } from 'jotai';

// Atom for form data
export const formDataAtom = atom({
  testName: '',
  experimenterName: '',
  ratNumber: '',
  experimentDate: new Date().toISOString().split('T')[0], // YYYY-MM-DD format
});

// Atom for timer states
export const timersAtom = atom<{ [key: string]: number }>({
  pouncing: 0,
  pinning: 0,
  chasing: 0,
  boxing: 0,
  agi: 0,
  novelExploration: 0,
});

// Atom for tracking experiment timer
export const experimentTimeAtom = atom<number>(0);

// Atom to track how many times each Timer Button was toggled (activated + deactivated)
export const timerCountersAtom = atom<{ [key: string]: number }>({
  pouncing: 0,
  pinning: 0,
  chasing: 0,
  boxing: 0,
  agi: 0,
  novelExploration: 0,
});

// Atoms for test state
export const isTestStartedAtom = atom<boolean>(false);
export const isTestFinishedAtom = atom<boolean>(false);

// Atom for CSV data
export const csvDataAtom = atom<string | null>(null);
