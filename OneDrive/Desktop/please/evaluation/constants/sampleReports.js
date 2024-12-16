import { Chart as ChartValue } from 'react-google-charts';

const chartOption1 = {
  pieHole: 0.4, // Creates a Donut Chart. Does not do anything when is3D is enabled
  is3D: true, // Enables 3D view

  pieStartAngle: 100, // Rotates the chart
  sliceVisibilityThreshold: 0.02, // Hides slices smaller than 2%
  legend: {
    position: 'bottom',
    alignment: 'center',
    textStyle: {
      color: '#233238',
      fontSize: 14,
    },
  },
  colors: ['#8AD1C2', '#9F8AD1', '#D18A99', '#BCD18A', '#D1C28A'],
  backgroundColor: 'white',
};

const chartOption2 = {
  backgroundColor: 'white',
};
const chartOption3 = {
  backgroundColor: 'white',
  sliceVisibilityThreshold: 0.2, // 20%
};

const CHART_DATA_COLLECTION = [
  [
    ['Rating', 'Distribution'],
    ['Terrible', 7],
    ['Poor', 18],
    ['Average', 25],
    ['Good', 35],
    ['Excellent', 15],
  ],
  [
    ['Rating', 'Distribution'],
    ['Terrible', 10],
    ['Poor', 20],
    ['Average', 22],
    ['Good', 30],
    ['Excellent', 18],
  ],
  [
    ['Rating', 'Distribution'],
    ['Terrible', 5],
    ['Poor', 15],
    ['Average', 28],
    ['Good', 40],
    ['Excellent', 12],
  ],
  [
    ['Rating', 'Distribution'],
    ['Terrible', 8],
    ['Poor', 22],
    ['Average', 20],
    ['Good', 32],
    ['Excellent', 18],
  ],
  [
    ['Rating', 'Distribution'],
    ['Terrible', 6],
    ['Poor', 17],
    ['Average', 24],
    ['Good', 34],
    ['Excellent', 19],
  ],
  [
    ['Rating', 'Distribution'],
    ['Terrible', 9],
    ['Poor', 21],
    ['Average', 23],
    ['Good', 36],
    ['Excellent', 11],
  ],
  [
    ['Rating', 'Distribution'],
    ['Terrible', 4],
    ['Poor', 16],
    ['Average', 29],
    ['Good', 39],
    ['Excellent', 12],
  ],
  [
    ['Rating', 'Distribution'],
    ['Terrible', 11],
    ['Poor', 19],
    ['Average', 26],
    ['Good', 33],
    ['Excellent', 11],
  ],
  [
    ['Rating', 'Distribution'],
    ['Terrible', 3],
    ['Poor', 14],
    ['Average', 30],
    ['Good', 37],
    ['Excellent', 16],
  ],
  [
    ['Rating', 'Distribution'],
    ['Terrible', 12],
    ['Poor', 23],
    ['Average', 21],
    ['Good', 34],
    ['Excellent', 10],
  ],
];
const Report1 = {
  prof_name: 'Professor Clara Devereux',
  chart: [
    {
      title: 'Course Content & Organization',
      data: CHART_DATA_COLLECTION[0],
      options: chartOption2,
    },
    {
      title: "Instructor's Knowledge & Expertise",
      data: CHART_DATA_COLLECTION[1],
      options: chartOption2,
    },
    {
      title: 'Communication skills',
      data: CHART_DATA_COLLECTION[2],
      options: chartOption2,
    },
    {
      title: 'Classroom Management & Engagement',
      data: CHART_DATA_COLLECTION[3],
      options: chartOption3,
    },
    {
      title: 'Feedback & Assessment',
      data: CHART_DATA_COLLECTION[4],
      options: chartOption3,
    },
    {
      title: 'Student Support & Availability',
      data: CHART_DATA_COLLECTION[5],
      options: chartOption3,
    },
    {
      title: 'Overall Experience',
      data: CHART_DATA_COLLECTION[6],
      options: chartOption1,
    },
    {
      title: 'Open-Ended Feedback',
      data: CHART_DATA_COLLECTION[7],
      options: chartOption1,
    },
  ],
};
const Report2 = {
  prof_name: 'Professor Theodore Linfield',
  chart: [
    {
      title: 'Course Content & Organization',
      data: CHART_DATA_COLLECTION[3],
      options: chartOption2,
    },
    {
      title: "Instructor's Knowledge & Expertise",
      data: CHART_DATA_COLLECTION[5],
      options: chartOption2,
    },
    {
      title: 'Communication skills',
      data: CHART_DATA_COLLECTION[7],
      options: chartOption2,
    },
    {
      title: 'Classroom Management & Engagement',
      data: CHART_DATA_COLLECTION[1],
      options: chartOption3,
    },
    {
      title: 'Feedback & Assessment',
      data: CHART_DATA_COLLECTION[9],
      options: chartOption3,
    },
    {
      title: 'Student Support & Availability',
      data: CHART_DATA_COLLECTION[2],
      options: chartOption3,
    },
    {
      title: 'Overall Experience',
      data: CHART_DATA_COLLECTION[4],
      options: chartOption1,
    },
    {
      title: 'Open-Ended Feedback',
      data: CHART_DATA_COLLECTION[6],
      options: chartOption1,
    },
  ],
};

const Report3 = {
  prof_name: 'Professor Estelle Marlowe',
  chart: [
    {
      title: 'Course Content & Organization',
      data: CHART_DATA_COLLECTION[8],
      options: chartOption2,
    },
    {
      title: "Instructor's Knowledge & Expertise",
      data: CHART_DATA_COLLECTION[2],
      options: chartOption2,
    },
    {
      title: 'Communication skills',
      data: CHART_DATA_COLLECTION[0],
      options: chartOption2,
    },
    {
      title: 'Classroom Management & Engagement',
      data: CHART_DATA_COLLECTION[4],
      options: chartOption3,
    },
    {
      title: 'Feedback & Assessment',
      data: CHART_DATA_COLLECTION[6],
      options: chartOption3,
    },
    {
      title: 'Student Support & Availability',
      data: CHART_DATA_COLLECTION[1],
      options: chartOption3,
    },
    {
      title: 'Overall Experience',
      data: CHART_DATA_COLLECTION[5],
      options: chartOption1,
    },
    {
      title: 'Open-Ended Feedback',
      data: CHART_DATA_COLLECTION[9],
      options: chartOption1,
    },
  ],
};

const Report4 = {
  prof_name: 'Professor Julian Ashcroft',
  chart: [
    {
      title: 'Course Content & Organization',
      data: CHART_DATA_COLLECTION[1],
      options: chartOption2,
    },
    {
      title: "Instructor's Knowledge & Expertise",
      data: CHART_DATA_COLLECTION[4],
      options: chartOption2,
    },
    {
      title: 'Communication skills',
      data: CHART_DATA_COLLECTION[6],
      options: chartOption2,
    },
    {
      title: 'Classroom Management & Engagement',
      data: CHART_DATA_COLLECTION[2],
      options: chartOption3,
    },
    {
      title: 'Feedback & Assessment',
      data: CHART_DATA_COLLECTION[8],
      options: chartOption3,
    },
    {
      title: 'Student Support & Availability',
      data: CHART_DATA_COLLECTION[3],
      options: chartOption3,
    },
    {
      title: 'Overall Experience',
      data: CHART_DATA_COLLECTION[7],
      options: chartOption1,
    },
    {
      title: 'Open-Ended Feedback',
      data: CHART_DATA_COLLECTION[9],
      options: chartOption1,
    },
  ],
};

const Report5 = {
  prof_name: 'Professor Agatha Bumbleton',
  chart: [
    {
      title: 'Course Content & Organization',
      data: CHART_DATA_COLLECTION[2],
      options: chartOption2,
    },
    {
      title: "Instructor's Knowledge & Expertise",
      data: CHART_DATA_COLLECTION[7],
      options: chartOption2,
    },
    {
      title: 'Communication skills',
      data: CHART_DATA_COLLECTION[4],
      options: chartOption2,
    },
    {
      title: 'Classroom Management & Engagement',
      data: CHART_DATA_COLLECTION[6],
      options: chartOption3,
    },
    {
      title: 'Feedback & Assessment',
      data: CHART_DATA_COLLECTION[9],
      options: chartOption3,
    },
    {
      title: 'Student Support & Availability',
      data: CHART_DATA_COLLECTION[1],
      options: chartOption3,
    },
    {
      title: 'Overall Experience',
      data: CHART_DATA_COLLECTION[8],
      options: chartOption1,
    },
    {
      title: 'Open-Ended Feedback',
      data: CHART_DATA_COLLECTION[5],
      options: chartOption1,
    },
  ],
};
const REPORTS = [Report1, Report2, Report3, Report4, Report5];
export { REPORTS };
