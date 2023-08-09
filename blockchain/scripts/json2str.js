let jsonArray = [
    {
      "standard": 2,
      "subject": "BC",
      "teacher": "Ms Cholee",
      "day": "tue",
      "time": "8:30pm-9:30pm"
    },
    {
      "standard": 2,
      "subject": "MATH",
      "teacher": "Ms Cholee",
      "day": "tue",
      "time": "7:30pm-8:30pm"
    },
    {
      "standard": 2,
      "subject": "BM",
      "teacher": "Mr Lee",
      "day": "wed",
      "time": "7:30pm-8:30pm"
    },
    {
      "standard": 2,
      "subject": "BI",
      "teacher": "Mr Lee",
      "day": "wed",
      "time": "8:30pm-9:30pm"
    },
    {
      "standard": 2,
      "subject": "SCIENCE",
      "teacher": "Ms Ruth",
      "day": "fri",
      "time": "7:30pm-8:30pm"
    },
    {
      "standard": 3,
      "subject": "BM",
      "teacher": "Ms Cholee",
      "day": "thur",
      "time": "7:30pm-8:30pm"
    },
    {
      "standard": 3,
      "subject": "BC",
      "teacher": "Ms Cholee",
      "day": "thur",
      "time": "8:30pm-9:30pm"
    },
    {
      "standard": 3,
      "subject": "BI",
      "teacher": "Mr Nick",
      "day": "tue",
      "time": "8:30pm-9:30pm"
    },
    {
      "standard": 3,
      "subject": "MATH",
      "teacher": "Ms Cholee",
      "day": "fri",
      "time": "7:30pm-8:30pm"
    },
    {
      "standard": 3,
      "subject": "SCIENCE",
      "teacher": "Ms Ruth",
      "day": "fri",
      "time": "8:30pm-9:30pm"
    },
    {
      "standard": 4,
      "subject": "BC COMP",
      "teacher": "ms tang",
      "day": "wed",
      "time": "4:00pm-5:30pm"
    },
    {
      "standard": 4,
      "subject": "BC ESSAY",
      "teacher": "ms tang",
      "day": "wed",
      "time": "5:30pm-7:00pm"
    },
    {
      "standard": 4,
      "subject": "BM COMP",
      "teacher": "ms tang",
      "day": "tue",
      "time": "4:00pm-5:30pm"
    },
    {
      "standard": 4,
      "subject": "BM ESSAY",
      "teacher": "ms tang",
      "day": "thur",
      "time": "4:00pm-5:30pm"
    },
    {
      "standard": 4,
      "subject": "BI COMP",
      "teacher": "mr nick",
      "day": "tue",
      "time": "5:30pm-7:00pm"
    },
    {
      "standard": 4,
      "subject": "BI ESSAY",
      "teacher": "ms chloee",
      "day": "fri",
      "time": "5:30pm-7:00pm"
    },
    {
      "standard": 4,
      "subject": "MATH",
      "teacher": "mr yap",
      "day": "fri",
      "time": "4:00pm-5:30pm"
    },
    {
      "standard": 4,
      "subject": "SCIENCE",
      "teacher": "mr yap",
      "day": "mon",
      "time": "4:00pm-5:30pm"
    },
    {
      "standard": 6,
      "subject": "BC COMP",
      "teacher": "Mr Lim",
      "day": "tue",
      "time": "7:00pm-8:30pm"
    },
    {
      "standard": 6,
      "subject": "BC ESSAY",
      "teacher": "Mr Lim",
      "day": "thur",
      "time": "7:00pm-8:30pm"
    },
    {
      "standard": 6,
      "subject": "BM COMP",
      "teacher": "Mr Nick",
      "day": "thur",
      "time": "5:30pm-7:00pm"
    },
    {
      "standard": 6,
      "subject": "BM ESSAY",
      "teacher": "Mr Nick",
      "day": "fri",
      "time": "5:30pm-7:00pm"
    },
    {
      "standard": 6,
      "subject": "BI COMP",
      "teacher": "Mr Nick",
      "day": "mon",
      "time": "5:30pm-7:00pm"
    },
    {
      "standard": 6,
      "subject": "BI ESSAY",
      "teacher": "Mr Nick",
      "day": "fri",
      "time": "7:00pm-8:30pm"
    },
    {
      "standard": 6,
      "subject": "MATH",
      "teacher": "Mr Ng",
      "day": "wed",
      "time": "4:00pm-5:30pm"
    },
    {
      "standard": 6,
      "subject": "SCIENCE",
      "teacher": "Mr Lim",
      "day": "wed",
      "time": "5:30pm-7:00pm"
    }
   ];

let stringArray = jsonArray.map(item => 
  `"standard": "${item.standard}", "subject": "${item.subject.toLowerCase()}", "teacher": "${item.teacher.toLowerCase()}", "day": "${item.day.toLowerCase()}", "time": "${item.time}"`
);

console.log(stringArray);