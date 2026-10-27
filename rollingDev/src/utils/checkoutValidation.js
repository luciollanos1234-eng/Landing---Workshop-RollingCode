const personName = /^[\p{L}\p{M}][\p{L}\p{M} .'’-]*$/u
const digits = (value) => value.replace(/\s/g, '')

export function validatePersonal(data) {
  const errors = {}
  for (const [key, label] of [['name', 'nombre'], ['surname', 'apellido']]) {
    const value = data[key].trim()
    if (value.length < 2 || value.length > 80 || !personName.test(value)) {
      errors[key] = `Ingresá un ${label} de 2 a 80 caracteres, sin números.`
    }
  }
  if (data.email.trim().length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) {
    errors.email = 'Ingresá un email válido, por ejemplo nombre@correo.com.'
  }
  if (!/^\d{7,8}$/.test(data.dni.trim())) errors.dni = 'Ingresá un DNI de 7 u 8 dígitos, sin puntos.'
  const phone = data.phone.trim()
  if (!/^\+?[\d ()-]+$/.test(phone) || !/^\d{10,15}$/.test(phone.replace(/\D/g, ''))) {
    errors.phone = 'Ingresá un teléfono de 10 a 15 dígitos, incluido el código de área.'
  }
  return errors
}

export function isValidCardNumber(value) {
  const number = digits(value)
  if (!/^\d{13,19}$/.test(number) || /^(\d)\1+$/.test(number)) return false
  let sum = 0
  let double = false
  for (let index = number.length - 1; index >= 0; index--) {
    let digit = Number(number[index])
    if (double) { digit *= 2; if (digit > 9) digit -= 9 }
    sum += digit
    double = !double
  }
  return sum % 10 === 0
}

export function validatePayment(data, now = new Date()) {
  const errors = {}
  if (data.holder.trim().length < 2 || data.holder.trim().length > 100 || !personName.test(data.holder.trim())) {
    errors.holder = 'Ingresá el nombre del titular, sin números.'
  }
  if (!isValidCardNumber(data.number)) errors.number = 'Ingresá un número de tarjeta de prueba válido, de 13 a 19 dígitos.'
  const expiry = /^(0[1-9]|1[0-2])\/(\d{2})$/.exec(data.expiry)
  if (!expiry) errors.expiry = 'Usá el formato MM/AA, con un mes entre 01 y 12.'
  else {
    const month = Number(expiry[1])
    const year = 2000 + Number(expiry[2])
    if (year < now.getFullYear() || (year === now.getFullYear() && month < now.getMonth() + 1)) {
      errors.expiry = 'La tarjeta está vencida. Usá una fecha de prueba vigente.'
    }
  }
  if (!/^\d{3,4}$/.test(data.cvv)) errors.cvv = 'Ingresá un código de seguridad de prueba de 3 o 4 dígitos.'
  return errors
}
