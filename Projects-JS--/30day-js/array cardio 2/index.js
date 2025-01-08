// ## Array Cardio Day 2

const people = [
  { name: "Wes", year: 1988 },
  { name: "Kait", year: 1986 },
  { name: "Irv", year: 1970 },
  { name: "Lux", year: 2015 },
];

const comments = [
  { text: "Love this!", id: 523423 },
  { text: "Super good", id: 823423 },
  { text: "You are the best", id: 2039842 },
  { text: "Ramen is my fav food ever", id: 123523 },
  { text: "Nice Nice Nice!", id: 542328 },
];

// Some and Every Checks
// Array.prototype.some() // is at least one person 19 or older?
const isAdult = people.some((person) => {
  const currYear = new Date().getFullYear();
  // return currYear - people[0].year >= 19;
  if (currYear - person.year >= 19) {
    return true;
  }
});

const isAdultt = people.some((person) => {
  const currentYear = new Date().getFullYear();
  return currentYear - person.year >= 19;
});
const isAdulttt = people.some(
  (person) => new Date().getFullYear() - person.year >= 19
);

console.log(isAdult);

// Array.prototype.every() // is everyone 19 or older?
const allAdult = people.every(
  (person) => new Date().getFullYear() - person.year >= 19
);
console.log(allAdult);

// Array.prototype.find()
// Find is like filter, but instead returns just the one you are looking for
// find the comment with the ID of 823423

const commentt = comments.find(function (comment) {
  if (comment.id === 823423) {
    return true;
  }
});
const comment = comments.find((comment) => {
  return comment.id === 823423;
});
const commenttt = comments.find((comment) => comment.id === 823423);

console.log(commenttt);

// Array.prototype.findIndex()
// Find the comment with this ID
const index = comments.findIndex((comment) => comment.id === 823423);
console.log(index);

// delete the comment with the ID of 823423

// comments.splice(index, 1); //delete to usebelow because below one will make new table with 4 elemets

const newComments = [
  //makes new table with 4 elements while keeping commnets as original removing index1-id 823423
  ...comments.slice(0, index),
  ...comments.slice(index + 1),
];
