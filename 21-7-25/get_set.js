const person = {
  firstName: "John",
  lastName: "Doe",
  language: "",
  get lang(){
    return this.language;
  },
  set lang(lang) {
    this.language = lang;
  }
};

person.lang = 'Hindi'
console.log(person.lang)
console.log(person)

let personNew = structuredClone(person);
// personNew.lang = 'English'
console.log(personNew)
console.log(person)