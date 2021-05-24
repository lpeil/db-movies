export default function toMoney(value) {
  if (!value) return '';

  let money = value;
  const currency = '$';
  const decimal = '.';
  const thousands = ',';
  const decimalCount = 2;

  const negativeSign = money < 0 ? '-' : '';
  const i = parseInt(money = Math.abs(Number(money) || 0).toFixed(decimalCount), 10).toString();
  const j = (i.length > 3) ? i.length % 3 : 0;

  return `${currency} ${negativeSign}${j ? i.substr(0, j) + thousands : ''}${i.substr(j).replace(/(\d{3})(?=\d)/g, `$1${thousands}`)}${decimalCount ? decimal + Math.abs(money - i).toFixed(decimalCount).slice(2) : ''}`;
}
