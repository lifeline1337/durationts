declare class Duration {
    seconds: number;
    Error: {
        UnexpectedFormat: string;
        NegativeValue: string;
        Overflow: string;
    };
    /**
     * @constructor
     * @param representation
     */
    constructor(representation: string | number);
    StandardParser(seconds: number, match: any): number;
    StandardWeeksParser(seconds: number, match: any): number;
    ExtendedParser(seconds: number, match: any): number;
    BasicParser: (seconds: number, match: any) => number;
    DurationFormat: {
        Extended: {
            pattern: RegExp;
            parser: (seconds: number, match: any) => number;
        };
        Basic: {
            pattern: RegExp;
            parser: (seconds: number, match: any) => number;
        };
        StandardWeeks: {
            pattern: RegExp;
            parser: (seconds: number, match: any) => number;
        };
        Standard: {
            pattern: RegExp;
            parser: (seconds: number, match: any) => number;
        };
    };
    inSeconds(): number;
    inMinutes(): number;
    inHours(): number;
    inDays(): number;
    inWeeks(): number;
    inMonths(): number;
    inYears(): number;
}
export default Duration;
