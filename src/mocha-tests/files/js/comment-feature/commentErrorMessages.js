const person = {
  fullName: 'John Doe',
  age: 25,
  address: {
    city: 'New York',
    state: 'NY',
  },
};

console.error('📱 ~ commentErrorMessages.js:10 ~ person:', person);

const isMarried = true;

console.error('📱 ~ commentErrorMessages.js:14 ~ isMarried:', isMarried);

function sayHello(person) {
  console.error('📱 ~ commentErrorMessages:17 ~ sayHello ~ person:', person);
  console.debug(`Hello ${person.fullName}`);
}
