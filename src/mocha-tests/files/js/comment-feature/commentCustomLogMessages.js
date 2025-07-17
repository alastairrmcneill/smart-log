const person = {
  fullName: 'John Doe',
  age: 25,
  address: {
    city: 'New York',
    state: 'NY',
  },
};

fancy.debug.func('🎯 ~ person:', person);

const isMarried = true;

fancy.debug.func('🎯 ~ isMarried:', isMarried);

function sayHello(person) {
  fancy.debug.func('🎯 ~ sayHello ~ person:', person);
  logger.info(`Hello ${person.fullName}`);
}
