const person = {
  fullName: 'John Doe',
  age: 25,
  address: {
    city: 'New York',
    state: 'NY',
  },
};

// console.table('📱 ~ uncommentTableMessages.js:10 ~ person:', person);

const isMarried = true;

// console.table('📱 ~ uncommentTableMessages.js:14 ~ isMarried:', isMarried);

function sayHello(person) {
  // console.table(
  //  '📱 ~ uncommentTableMessages.js:17 ~ sayHello ~ person:',
  //  person,
  // );
  console.debug(`Hello ${person.fullName}`);
}
