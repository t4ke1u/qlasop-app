export const FACULTIES: FacultyType = {
  jp: { 26: '基幹', 27: '創造', 28: '先進' },
  en: { 26: 'Fund', 27: 'Cre', 28: 'Adv' },
}

type FacultyType = { jp: { [key: number]: string }; en: { [key: number]: string } }
