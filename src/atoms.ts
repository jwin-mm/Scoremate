import { atom } from 'jotai';

// Atom for form data
export const formDataAtom = atom({
  testName: '',
  experimenterName: '',
  ratNumber: '',
  experimentDate: new Date().toISOString().split('T')[0], // YYYY-MM-DD format
  flags: '',
  note: '',
});

// Atom for timer states
export const timersAtom = atom<{ [key: string]: number }>({
  Pouncing: 0,
  Pinning: 0,
  Chasing: 0,
  Boxing: 0,
  AGI: 0,
  'Novel Exploration': 0,
});

// Atom for tracking experiment timer
export const experimentTimeAtom = atom<number>(0);

// Atom to track how many times each Timer Button was toggled (activated + deactivated)
export const timerCountersAtom = atom<{ [key: string]: number }>({
  Pouncing: 0,
  Pinning: 0,
  Chasing: 0,
  Boxing: 0,
  AGI: 0,
  'Novel Exploration': 0,
});

// Atoms for test state
export const isTestStartedAtom = atom<boolean>(false);
export const isTestFinishedAtom = atom<boolean>(false);

// Atom for CSV data
export const csvDataAtom = atom<string | null>(null);
