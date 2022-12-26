// 4. UTILITY GENERICS (some examples, only in TS)
// more https://www.typescriptlang.org/docs/handbook/utility-types.html 

// PARTIAL
interface CourseGoal {
  title: string;
  description: string;
  completeUntil: Date;
}

function createCourseGoal(title: string, description: string, date: Date): CourseGoal {
  let courseGoal: Partial<CourseGoal> = {};
  courseGoal.title = title;
  courseGoal.description = description;
  courseGoal.completeUntil = date;
  return courseGoal as CourseGoal;
}

// READONLY
const names: Readonly<string[]> = ['Niko', 'Ivan']; // we want this to be a locked array
// names.push('Luka'); // compile error
// names.pop('Niko'); // compile error