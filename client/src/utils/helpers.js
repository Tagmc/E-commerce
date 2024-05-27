export const createSlug = string => {
  return string.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").split(' ').join("-");
}
export const formatMoney = number => Number(number?.toFixed(1)).toLocaleString('de-DE')

export const renderStar = (number) => {
  if (!Number(number)) return;
  const stars = [];
  for (let i = 0; i < +number; i++) {
    stars.push(<i class="fa-solid fa-star"></i>);
  }
  for (let i = 0; i < 5 - +number; i++) {
    stars.push(<i class="fa-regular fa-star"></i>);
  }
  return stars;
}

export const formatPrice = number => Math.round(number / 1000) * 1000

export const generateRange = (start, end) => {
  const length = end - start + 1;
  return Array.from({ length }, (_, index) => start + index);
}

export const getBase64 = (file) => {
  if (!file) return '';
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  })
}