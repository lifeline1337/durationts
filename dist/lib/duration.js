"use strict";
/*

  _____                  _   _          _______ _____
 |  __ \                | | (_)        |__   __/ ____|
 | |  | |_   _ _ __ __ _| |_ _  ___  _ __ | | | (___
 | |  | | | | | '__/ _` | __| |/ _ \| '_ \| |  \___ \
 | |__| | |_| | | | (_| | |_| | (_) | | | | |  ____) |
 |_____/ \__,_|_|  \__,_|\__|_|\___/|_| |_|_| |_____/
                                                      

* Repository: https://github.com/lifeline1337
* License: MIT
*/
Object.defineProperty(exports, "__esModule", { value: true });
const Calendar = {
    Seconds: {
        per: {
            Minute: 60,
            Hour: 60 * 60,
            Day: 60 * 60 * 24,
            Week: 60 * 60 * 24 * 7,
            Month: 60 * 60 * 24 * 30.4368,
            Year: 60 * 60 * 24 * 365.242
        }
    },
    Minutes: {
        per: {
            Hour: 60,
            Day: 60 * 24,
            Week: 60 * 24 * 7,
            Month: 60 * 24 * 30.4368,
            Year: 60 * 24 * 365.242
        }
    },
    Hours: {
        per: {
            Day: 24,
            Week: 24 * 7,
            Month: 24 * 30.4368,
            Year: 24 * 365.242
        }
    },
    Days: {
        per: {
            Week: 7,
            Month: 30.4368,
            Year: 365.242
        }
    },
    Weeks: {
        per: {
            Month: 4.34812,
            Year: 52.1775
        }
    },
    Months: {
        per: {
            Year: 12
        }
    }
};
class Duration {
    /**
     * Duration
     * @constructor
     * @param representation
     */
    constructor(representation) {
        this.seconds = 0;
        this.Error = {
            UnexpectedFormat: "Unexpected duration format. Refer to ISO 8601.",
            NegativeValue: "Cannot create a negative duration.",
            Overflow: "Cannot represent a duration that large. Float overflow."
        };
        this.BasicParser = this.ExtendedParser;
        this.DurationFormat = {
            Extended: {
                pattern: /^P(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})$/,
                parser: this.ExtendedParser
            },
            Basic: {
                pattern: /^P(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})$/,
                parser: this.BasicParser
            },
            StandardWeeks: {
                pattern: /^P(\d+W)$/,
                parser: this.StandardWeeksParser
            },
            Standard: {
                pattern: /^P(\d+Y)*(\d+M)*(\d+D)*(?:(T)(\d+H)*(\d+M)*(\d+S)*)?$/,
                parser: this.StandardParser
            }
        };
        if (representation === "undefined" || representation === undefined || representation === '') {
            representation = 0;
        }
        if (typeof representation === "number" && representation < 0) {
            throw new Error(this.Error.NegativeValue);
        }
        else if (typeof representation === "number") {
            this.seconds = representation;
        }
        else {
            let isSupportedFormat = false;
            for (let format in this.DurationFormat) {
                const pattern = this.DurationFormat[format].pattern;
                const parser = this.DurationFormat[format].parser;
                if (pattern.test(representation)) {
                    isSupportedFormat = true;
                    this.seconds = parser(this.seconds, representation.match(pattern));
                    break;
                }
            }
            if (!isSupportedFormat) {
                throw new Error(this.Error.UnexpectedFormat);
            }
        }
        if (isNaN(this.seconds)) {
            throw new Error(this.Error.Overflow);
        }
    }
    // Parsing
    StandardParser(seconds, match) {
        let cal = Calendar;
        if (match[0] === "P" || match === "PT") {
            throw new Error(this.Error.UnexpectedFormat);
        }
        let hasFoundT = false;
        for (var groupIndex = 1; groupIndex < match.length; groupIndex++) {
            let value = match[groupIndex];
            if (/T/.test(value)) {
                hasFoundT = true;
            }
            else if (/\d+Y/.test(value)) {
                seconds += parseInt(value.replace('Y', ''), 10) * cal.Seconds.per.Year;
            }
            else if (/\d+M/.test(value) && !hasFoundT) {
                seconds += parseInt(value.replace('M', ''), 10) * cal.Seconds.per.Month;
            }
            else if (/\d+D/.test(value)) {
                seconds += parseInt(value.replace('D', ''), 10) * cal.Seconds.per.Day;
            }
            else if (/\d+H/.test(value)) {
                seconds += parseInt(value.replace('H', ''), 10) * cal.Seconds.per.Hour;
            }
            else if (/\d+M/.test(value) && hasFoundT) {
                seconds += parseInt(value.replace('M', ''), 10) * cal.Seconds.per.Minute;
            }
            else if (/\d+S/.test(value)) {
                seconds += parseInt(value.replace('S', ''), 10);
            }
            else if (/\d+[A-Z]/.test(value)) {
                throw new Error(Duration.prototype.Error.UnexpectedFormat);
            }
        }
        return seconds;
    }
    StandardWeeksParser(seconds, match) {
        let cal = Calendar;
        for (let i = 1; i < match.length; i++) {
            let value = match[i];
            if (/\d+W/.test(value)) {
                seconds += parseInt(value.replace('W', ''), 10) * cal.Seconds.per.Week;
            }
            else if (/\d+[A-Z]/.test(value)) {
                throw new Error(this.Error.UnexpectedFormat);
            }
        }
        return seconds;
    }
    ExtendedParser(seconds, match) {
        let cal = Calendar;
        for (let groupIndex = 1; groupIndex < match.length; groupIndex++) {
            let value = parseInt(match[groupIndex], 10);
            if (groupIndex === 1) {
                seconds += value * cal.Seconds.per.Year;
            }
            else if (groupIndex === 2) {
                if (value >= 12) {
                    throw new Error(Duration.prototype.Error.UnexpectedFormat);
                }
                seconds += value * cal.Seconds.per.Month;
            }
            else if (groupIndex === 3) {
                if (value > 31) {
                    throw new Error(Duration.prototype.Error.UnexpectedFormat);
                }
                seconds += value * cal.Seconds.per.Day;
            }
            else if (groupIndex === 4) {
                if (value >= 24) {
                    throw new Error(Duration.prototype.Error.UnexpectedFormat);
                }
                seconds += value * cal.Seconds.per.Hour;
            }
            else if (groupIndex === 5) {
                if (value >= 60) {
                    throw new Error(Duration.prototype.Error.UnexpectedFormat);
                }
                seconds += value * cal.Seconds.per.Minute;
            }
            else if (groupIndex === 6) {
                if (value >= 60) {
                    throw new Error(Duration.prototype.Error.UnexpectedFormat);
                }
                seconds += value;
            }
            return seconds;
        }
    }
    /**
     * inSeconds
     * @method
     * @returns {number} the druration value in seconds as a number
     */
    inSeconds() {
        return this.seconds;
    }
    /**
     * inMinutes
     * @method
     * @returns {number} the druration value in minutes as a number
     */
    inMinutes() {
        return this.seconds / Calendar.Seconds.per.Minute;
    }
    /**
     * inHours
     * @method
     * @returns {number} the druration value in hours as a number
     */
    inHours() {
        return this.seconds / Calendar.Seconds.per.Hour;
    }
    /**
     * inDays
     * @method
     * @returns {number} the druration value in days as a number
     */
    inDays() {
        return this.seconds / Calendar.Seconds.per.Day;
    }
    /**
     * inWeeks
     * @method
     * @returns {number} the druration value in weeks as a number
     */
    inWeeks() {
        return this.seconds / Calendar.Seconds.per.Week;
    }
    /**
     * inMonths
     * @method
     * @returns {number} the druration value in months as a number
     */
    inMonths() {
        return this.seconds / Calendar.Seconds.per.Month;
    }
    /**
     * inYears
     * @method
     * @returns {number} the druration value in days as a number
     */
    inYears() {
        return this.seconds / Calendar.Seconds.per.Year;
    }
}
exports.default = Duration;
