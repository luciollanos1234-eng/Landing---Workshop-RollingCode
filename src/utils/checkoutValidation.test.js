import test from 'node:test';
import assert from 'node:assert/strict';
import {
  isValidCardNumber,
  validatePersonal,
  validatePayment,
} from './checkoutValidation.js';

const person = {
  name: 'María José',
  surname: "O'Connor",
  email: 'prueba@example.com',
  dni: '12345678',
  phone: '+54 (381) 123-4567',
};
const payment = {
  holder: 'Persona de Prueba',
  number: '4242 4242 4242 4242',
  expiry: '10/26',
  cvv: '123',
};
const now = new Date(2026, 9, 27);

test('personal: acepta nombres con acentos y teléfono internacional', () => {
  assert.deepEqual(validatePersonal(person), {});
});
test('personal: detecta todos los campos vacíos y nombres solo con espacios', () => {
  assert.deepEqual(
    Object.keys(
      validatePersonal({
        name: ' ',
        surname: '',
        email: '',
        dni: '',
        phone: '',
      }),
    ),
    ['name', 'surname', 'email', 'dni', 'phone'],
  );
});
test('personal: rechaza letras en DNI/teléfono y un email mal formado', () => {
  const errors = validatePersonal({
    ...person,
    dni: '12.345.678',
    phone: '381abc1234567',
    email: 'nombre@',
  });
  assert.deepEqual(Object.keys(errors), ['email', 'dni', 'phone']);
  assert.ok(validatePersonal({ ...person, name: 'Nombre123' }).name);
});
test('tarjeta: acepta números de 13 a 19 dígitos sin validar Luhn', () => {
  assert.equal(isValidCardNumber('4242 4242 4242 4242'), true);
  assert.equal(isValidCardNumber('1234 5678 9012 3456'), true);
  for (const number of [
    '123456789012',
    '12345678901234567890',
    '42424242abcd4242',
  ])
    assert.equal(isValidCardNumber(number), false);
});
test('pago: acepta el mes actual hasta que termina y CVV de tres o cuatro dígitos', () => {
  assert.deepEqual(validatePayment(payment, now), {});
  assert.deepEqual(validatePayment({ ...payment, cvv: '1234' }, now), {});
});
test('pago: detecta vencimiento anterior y meses inexistentes', () => {
  for (const expiry of ['09/26', '12/25', '00/27', '13/27', '10/2026'])
    assert.ok(validatePayment({ ...payment, expiry }, now).expiry);
  assert.deepEqual(validatePayment({ ...payment, expiry: '01/27' }, now), {});
});
test('pago: exige titular y formato del código de seguridad', () => {
  for (const cvv of ['', '12', '12345', '1a3'])
    assert.ok(validatePayment({ ...payment, cvv }, now).cvv);
  assert.ok(validatePayment({ ...payment, holder: '   ' }, now).holder);
});
