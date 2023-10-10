export const FACULTIES: FacultyType = {
  en: { 26: 'Fund', 27: 'Cre', 28: 'Adv' },
  jp: { 26: '基幹', 27: '創造', 28: '先進' },
}

type FacultyType = { en: { [key: number]: string }, jp: { [key: number]: string }; }
