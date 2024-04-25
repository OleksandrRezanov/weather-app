export const dividePeople = (people) => {
  const sortedPeople = people.sort((a, b) => b - a);

  const firstGroup = [];
  const secondGroup = [];

  let firstGroupSum = 0;
  let secondGroupSum = 0;

  sortedPeople.forEach(personWeight => {
    
    if (firstGroupSum >= secondGroupSum) {
      secondGroup.push(personWeight);
      secondGroupSum += personWeight;
    } else {
      firstGroup.push(personWeight);
      firstGroupSum += personWeight;
    }
  });

  return [firstGroup, secondGroup];
};
