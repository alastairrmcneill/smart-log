const error = new Error('Something went wrong');
console.error('📱 ~ deleteErrorMessages.js:2 ~ error:', error);
function processData(data) {
  if (!data) {
    console.error('📱 ~ deleteErrorMessages.js:6 ~ processData ~ data:', data);
    return null;
  }

  console.error(
    '📱 ~ deleteErrorMessages.js:10 ~ processData ~ data.length:',
    data.length,
  );
  return data.map((item) => item * 2);
}
const sampleData = [1, 2, 3];
processData(sampleData);
processData(null);
