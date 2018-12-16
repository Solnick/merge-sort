export const numberOfRecordsToGenerate = 14;
export const numberOfRecordsOnPage = 4;
export const sizeOfInt = 4;
export const numbersInRecord = 6;
export const sizeOfRecord = sizeOfInt * numbersInRecord;
export const sizeOfPage = sizeOfInt * numbersInRecord * numberOfRecordsOnPage;
export const numbersInIndexRecord = 2;
export const sizeOfIndexRecord = 24;
export const enum CLI_EVENTS {
  EXIT,
  CONTINUE,
}
export const enum events {
    EOF,
    SWITCH_FILE,
    SERIES_IN_FIRST_FILE_END,
    SERIES_IN_SECOND_FILE_END,
    FIRST_FILE_EOF,
    SORTING_ENDS
}
export const showFileAfterEveryPhase = true;
export let actions;// = [
//   {
//     action: 'add',
//     key: 123,
//   },
//   {
//     action: 'print record',
//     key: 123,
//   },
//   {
//     action: 'print file',
//   },
//   {
//     action: 'print index',
//   },
//   {
//     action: 'reorganise',
//   },
// ];
export let dataArray = [
  {
    "a": 10,
    "c": 5,
    "x": 4,
    "y": 8,
    "z": 3,
    "key": 9897
  },
  {
    "a": 10,
    "c": 8,
    "x": 4,
    "y": 4,
    "z": 3,
    "key": 2908
  },
  {
    "a": 5,
    "c": 7,
    "x": 7,
    "y": 3,
    "z": 1,
    "key": 294
  },
  {
    "a": 4,
    "c": 4,
    "x": 4,
    "y": 5,
    "z": 3,
    "key": 1133
  },
  {
    "a": 8,
    "c": 8,
    "x": 9,
    "y": 2,
    "z": 1,
    "key": 7213
  },
  {
    "a": 8,
    "c": 4,
    "x": 9,
    "y": 1,
    "z": 10,
    "key": 7886
  },
  {
    "a": 3,
    "c": 1,
    "x": 10,
    "y": 10,
    "z": 10,
    "key": 5746
  },
  {
    "a": 8,
    "c": 8,
    "x": 10,
    "y": 6,
    "z": 7,
    "key": 5812
  },
  {
    "a": 3,
    "c": 6,
    "x": 2,
    "y": 4,
    "z": 4,
    "key": 1233
  },
  {
    "a": 9,
    "c": 10,
    "x": 9,
    "y": 1,
    "z": 3,
    "key": 4738
  },
  {
    "a": 8,
    "c": 3,
    "x": 7,
    "y": 10,
    "z": 5,
    "key": 8566
  },
  {
    "a": 1,
    "c": 6,
    "x": 5,
    "y": 7,
    "z": 6,
    "key": 9955
  },
  {
    "a": 5,
    "c": 9,
    "x": 2,
    "y": 7,
    "z": 2,
    "key": 5157
  },
  {
    "a": 1,
    "c": 8,
    "x": 10,
    "y": 10,
    "z": 5,
    "key": 3319
  }
];