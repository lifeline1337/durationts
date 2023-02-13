declare class Duration {
    private seconds;
    private Error;
    /**
     * Duration
     * @constructor
     * @param representation
     */
    constructor(representation: string | number);
    private StandardParser;
    private StandardWeeksParser;
    private ExtendedParser;
    private BasicParser;
    private DurationFormat;
    /**
     * inSeconds
     * @method
     * @returns {number} the druration value in seconds as a number
     */
    inSeconds(): number;
    /**
     * inMinutes
     * @method
     * @returns {number} the druration value in minutes as a number
     */
    inMinutes(): number;
    /**
     * inHours
     * @method
     * @returns {number} the druration value in hours as a number
     */
    inHours(): number;
    /**
     * inDays
     * @method
     * @returns {number} the druration value in days as a number
     */
    inDays(): number;
    /**
     * inWeeks
     * @method
     * @returns {number} the druration value in weeks as a number
     */
    inWeeks(): number;
    /**
     * inMonths
     * @method
     * @returns {number} the druration value in months as a number
     */
    inMonths(): number;
    /**
     * inYears
     * @method
     * @returns {number} the druration value in days as a number
     */
    inYears(): number;
}
export default Duration;
