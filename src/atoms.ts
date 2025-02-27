import { atom } from 'jotai';

// Atom for form data
export const formDataAtom = atom<{
  testName: string;
  experimenterName: string;
  animalNumber: string;
  experimentDate: string;
  experimentTime: string;
} | null>(null);

// Atom for timer states
export const timersAtom = atom<{ [key: string]: number }>({
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
