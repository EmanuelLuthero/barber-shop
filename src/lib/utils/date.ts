import { capitalize } from './string';

export const getCurrentDateMonthDays = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();

  // Quantos dias tem o mês atual?
  const ultimoDia = new Date(year, month + 1, 0).getDate();

  const days = [];

  for (let dia = 1; dia <= ultimoDia; dia++) {
    const data = new Date(year, month, dia);
    const weekday = data.getDay(); // 0 = dom, 6 = sáb

    if (weekday !== 0 && weekday !== 6) {
      days.push(dia);
    }
  }

  return days;
};
export const getDayName = (dayNumber: number) => {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth(); // 0 = janeiro, ..., 11 = dezembro

  // Cria o objeto Date para o dia desejado
  const data = new Date(year, month, dayNumber);

  // Formata apenas a parte weekday
  const formated = new Intl.DateTimeFormat('pt-BR', { weekday: 'short' })
    .format(data)
    .replace('.', '');

  return capitalize(formated);
};

export const getAllHoursFromRange = (start: number, end: number) => {
  const hours = [];
  for (let i = start; i <= end; i++) {
    hours.push(i);
  }

  return hours;
};
