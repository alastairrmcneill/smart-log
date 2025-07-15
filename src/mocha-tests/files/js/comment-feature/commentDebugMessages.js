const person = {
  fullName: 'John Doe',
  age: 25,
  address: {
    city: 'New York',
    state: 'NY',
  },
};

console.debug('📱 ~ person:', person);

const isMarried = true;

console.debug('📱 ~ isMarried:', isMarried);

function sayHello(person) {
  console.debug('📱 ~ sayHello ~ person:', person);
  console.debug(`Hello ${person.fullName}`);
}
