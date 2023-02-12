# durationts
A TypeScript library for parsing ISO 8601 formatted duration strings.

## Features
*  Parsing available for three duration string formats:
	*  P[#Y][#M][#D]T[#H][#M][#S]  or  P#W
	*  PYYYY-MM-DDTHH:MM:SS
	*  PYYYYMMDDTHHMMSS

## Installation
`npm install --save durationts`

## Examples

```javascript
// A duration of 10 years, 10 months, 10 days, 10 hours, 10 minutes and 10 seconds
let duration = new Duration('P10Y10M10DT10H10M10S');
duration.inYears(); // 10.861871654551917
duration.inMonths(); // 130.34260260118842
duration.inWeeks(); // 566.7445324074074
duration.inDays(); // 3967.211726851852
duration.inHours(); // 95213.08144444444
duration.inMinutes(); // 5712784.886666667
duration.inSeconds(); // 342767093.2
```