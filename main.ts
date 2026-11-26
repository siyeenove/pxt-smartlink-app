/*
* This extension library was developed by jalen.
* Date: 2026-11-26  
*/

//% weight=9 color=#FF7F00 block="SmartLink" blockId="SmartLink" icon="\uf10b"
namespace smartlink {

    export enum Textview {
        //%block="1"
        View0 = 0,
        //%block="2"
        View1 = 1,
    }

    export enum AppDirectionButton {
        //%block="front pressed"
        F1 = 0,
        //%block="front release"
        F0 = 1,
        //%block="ok pressed"
        OK1 = 2,
        //%block="ok release"
        OK0 = 3,
        //%block="back pressed"
        B1 = 4,
        //%block="back release"
        B0 = 5,
        //%block="left pressed"
        L1 = 6,
        //%block="left release"
        L0 = 7,
        //%block="right pressed"
        R1 = 8,
        //%block="right release"
        R0 = 9
    }

    export enum AppFunctionButton {
        //%block="1 pressed"
        One1 = 0,
        //%block="1 release"
        One0 = 1,
        //%block="2 pressed"
        Two1 = 2,
        //%block="2 release"
        Two0 = 3,
        //%block="3 pressed"
        Three1 = 4,
        //%block="3 release"
        Three0 = 5,
        //%block="line walking pressed"
        LineWalking1 = 6,
        //%block="line walking release"
        LineWalking0 = 7,
        //%block="ai pressed"
        AI1 = 8,
        //%block="ai release"
        AI0 = 9,
        //%block="obstacle pressed"
        Obstacle1 = 10,
        //%block="obstacle release"
        Obstacle0 = 11,
        //%block="- pressed"
        Sub1 = 12,
        //%block="- release"
        Sub0 = 13,
        //%block="+ pressed"
        Add1 = 14,
        //%block="+ release"
        Add0 = 15

    }

    export enum AppMusicButton {
        //%block="DO pressed"
        DO1 = 0,
        //%block="DO release"
        DO0 = 1,
        //%block="RE pressed"
        RE1 = 2,
        //%block="RE release"
        RE0 = 3,
        //%block="ME pressed"
        ME1 = 4,
        //%block="ME release"
        ME0 = 5,
        //%block="FA pressed"
        FA1 = 6,
        //%block="FA release"
        FA0 = 7,
        //%block="SO pressed"
        SO1 = 8,
        //%block="SO release"
        SO0 = 9,
        //%block="LA pressed"
        LA1 = 10,
        //%block="LA release"
        LA0 = 11,
        //%block="SI pressed"
        SI1 = 12,
        //%block="SI release"
        SI0 = 13,
        //%block="DO pressed"
        DOU1 = 14,
        //%block="DO release"
        DOU0 = 15
    }

    export enum AppJoystick {
        //%block="X axis"
        X = 13,
        //%block="Y axis"
        Y = 14,
        //%block="strength"
        Strength = 15,
        //%block="angle"
        Angle = 16
    }

    export enum AppSeekBar {
        //%block="seek bar 1"
        SeekBar1 = 17,
        //%block="seek bar 2"
        SeekBar2 = 18,
        //%block="seek bar 3"
        SeekBar3 = 19,
        //%block="seek bar 4"
        SeekBar4 = 20
    }

    export enum AppGravity {
        //%block="X axis"
        X = 21,
        //%block="Y axis"
        Y = 22,
        //%block="Z axis"
        Z = 23
    }

    export enum AppRgbColor {
        //%block="red"
        R = 24,
        //%block="green"
        G = 25,
        //%block="blue"
        B = 26
    }

    // Joystick internal cache: The frame string of the last successful judgment
    let joystickCachedFrame: string = "";

    // Seek bat internal cache: The frame string of the last successful judgment
    let seekBarCachedFrame: string = "";

    // Gravity internal cache: The frame string of the last successful judgment
    let gravityCachedFrame: string = "";

    // RGB color internal cache: The frame string of the last successful judgment
    let rgbColorCachedFrame: string = "";

    /**
     * Send a string to the left and right text fields of the APP via Bluetooth serial port.
     * @param side - Text display box. eg: left, right
     * @param str - The string to display.
     */
    //% group="Text view"
    //% weight=94
    //% block="textview %view display %str"
    //% side.defl=pybit.Textview.Left
    export function display(view: Textview, str: string): string {
        let strCmd;
        if (view == Textview.View0) {
            strCmd = "$-6-1-11-" + str + "-#";
        } else if (view == Textview.View1) {
            strCmd = "$-6-1-12-" + str + "-#";
        }
        return strCmd;
    }

    /**
     * Check the buttons from the App.
     * @param myButton - Bluetooth serial port reads APP string instructions.
     * @param button - button type.
     */
    //% group="Button"
    //% weight=93
    //% block="serial port button %myButton equal %button"
    export function appButton(myButton: string, button: string): boolean {
        myButton = myButton + "#";
        if (myButton == button) {
            return true;
        }
        return false;
    }

    // APP direction button commands.
    let appDirectonCmdArray = [
        "$-6-1-0-1-#",   // F-pressed
        "$-6-1-0-0-#",   // F-release
        "$-6-1-1-1-#",   // OK-pressed
        "$-6-1-1-0-#",   // OK-release
        "$-6-1-2-1-#",   // B-pressed
        "$-6-1-2-0-#",   // B-release
        "$-6-1-3-1-#",   // L-pressed
        "$-6-1-3-0-#",   // L-release
        "$-6-1-4-1-#",   // R-pressed
        "$-6-1-4-0-#",   // R-release
    ];

    /**
     * APP direction button commands.
     * @param button - APP direction button command array.
     * Return APP direction button command.
     */
    //% group="Button"
    //% weight=92
    //% block="app direction button %button"
    export function appDirectionButton(button: AppDirectionButton): string {
        return appDirectonCmdArray[button];
    }

    // APP function button commands.
    let appFunctionCmdArray = [
        "$-6-1-5-1-#",   // 1-pressed
        "$-6-1-5-0-#",   // 1-release
        "$-6-1-6-1-#",   // 2-pressed
        "$-6-1-6-0-#",   // 2-release
        "$-6-1-7-1-#",   // 3-pressed
        "$-6-1-7-0-#",   // 3-release
        "$-6-1-8-1-#",   // line walking-pressed
        "$-6-1-8-0-#",   // line walking-release
        "$-6-1-9-1-#",   // ai-pressed
        "$-6-1-9-0-#",   // ai-release
        "$-6-1-10-1-#",  // obstacle-pressed
        "$-6-1-10-0-#",  // obstacle-release
        "$-6-1-35-1-#",  // sub-pressed
        "$-6-1-35-0-#",  // sub-release
        "$-6-1-36-1-#",  // add-pressed
        "$-6-1-36-0-#",  // add-release
    ];

    /**
     * APP function button commands.
     * @param button - APP function button command array.
     * Return APP function button command.
     */
    //% group="Button"
    //% weight=91
    //% block="app function button %button"
    export function appFunctionButton(button: AppFunctionButton): string {
        return appFunctionCmdArray[button];
    }

    // APP music button commands.
    let appMusicCmdArray = [
        "$-6-1-27-1-#",   // DO-pressed
        "$-6-1-27-0-#",   // DO-release
        "$-6-1-28-1-#",   // RE-pressed
        "$-6-1-28-0-#",   // RE-release
        "$-6-1-29-1-#",   // ME-pressed
        "$-6-1-29-0-#",   // ME-release
        "$-6-1-30-1-#",   // FA-pressed
        "$-6-1-30-0-#",   // FA-release
        "$-6-1-31-1-#",   // SO-pressed
        "$-6-1-31-0-#",   // SO-release
        "$-6-1-32-1-#",   // LA-pressed
        "$-6-1-32-0-#",   // LA-release
        "$-6-1-33-1-#",   // SI-pressed
        "$-6-1-33-0-#",   // SI-release
        "$-6-1-34-1-#",   // DOU-pressed
        "$-6-1-34-0-#",   // DOU-release
    ];

    /**
     * APP music button commands.
     * @param button - APP music button command array.
     * Return APP music button command.
     */
    //% group="Button"
    //% weight=90
    //% block="app music button %button"
    export function appMusicButton(button: AppMusicButton): string {
        return appMusicCmdArray[button];
    }

    /**
     * Joystick data frame parser
     * Supports 7 frame types (x ∈ [0,255]):
     *   $-7-1-13-1-x-#  X axis, positive
     *   $-7-1-13-0-x-#  X axis, negative
     *   $-7-1-14-1-x-#  Y axis, positive
     *   $-7-1-14-0-x-#  Y axis, negative
     *   $-7-1-15-1-x-#  Strength (positive only)
     *   $-7-1-16-1-x-#  Angle, positive
     *   $-7-1-16-0-x-#  Angle, negative
     */
    /** Strictly validates whether `s` matches the frame format for the specified axis type. */
    function joystickCheckFrame(s: string, axis: AppJoystick): boolean {
        if (!s) return false;
        const n = s.length;
        if (n < 14 || n > 16) return false;

        // 0 is the starting bit, 7 is the cut length
        // Fixed prefix "$-7-1-1"
        let s_cache = s.substr(0, 7);
        if (s_cache !== "$-7-1-1") return false;

        // Type segment（1 bit：3/4/5/6）
        const t2 = s.charCodeAt(7);
        let type: number = 0;
        if (t2 === 51) type = 13;      // 51 --> '3'
        else if (t2 === 52) type = 14; // 52 --> '4'
        else if (t2 === 53) type = 15; // 53 --> '5'
        else if (t2 === 54) type = 16; // 54 --> '6'
        else return false;

        if (type !== axis) return false;

        if (s.charCodeAt(8) !== 45) return false; // 45 --> '-'

        // sign bit（0/1）
        const sign = s.charCodeAt(9);
        if (sign !== 48 && sign !== 49) return false;  // 48 --> '0', 49 --> '1'
        // Strength has no negative numbers: 15, only '1' is accepted
        if (type === 15 && sign !== 49) return false;

        if (s.charCodeAt(10) !== 45) return false; // 45 --> '-'

        // Fixed suffix "-#"
        s_cache = s.substr(n - 2, 2);
        if (s_cache !== "-#") return false;

        // Numerical segment（1~3 bit，≤255）
        const xStart = 11;
        const xEnd = n - 2;
        if (xEnd - xStart < 1 || xEnd - xStart > 3) return false;
        let v = 0;
        for (let i = xStart; i < xEnd; i++) {
            const c = s.charCodeAt(i);
            if (c < 48 || c > 57) return false;  // '0' -- '9'
            v = v * 10 + (c - 48);
        }
        return v <= 255;
    }

    /** Extract values (0 to 255) from valid frames without checking */
    function extractJoystickValue(s: string): number {
        const n = s.length;
        const xStart = 11;
        const xEnd = n - 2;
        let v = 0;
        for (let i = xStart; i < xEnd; i++) {
            v = v * 10 + (s.charCodeAt(i) - 48);
        }
        // sign bit（0/1）
        const sign = s.charCodeAt(9);
        if (sign === 48) v = 0 - v;   // 48 --> 0

        return v;
    }

    /**
     * Check the joystick command from the App.
     * @param s - Bluetooth serial port reads APP string instructions.
     * @param axis - joystick data type
     */
    //% group="Joystick"
    //% weight=89
    //% block="serial port joystick data %s equal %axis"
    export function joystickIsFrame(s: string, axis: AppJoystick): boolean {
        s = s + "#";
        const ok = joystickCheckFrame(s, axis);
        if (ok) joystickCachedFrame = s;
        return ok;
    }

    /**
     * read the joystick data from the App.
     * @param axis - joystick data type.
     * Return joystick data
     */
    //% group="Joystick"
    //% weight=88
    //% block="read joystick %axis data"
    export function readJoystickValue(axis: AppJoystick): number {
        //if (!joystickCheckFrame(joystickCachedFrame, axis)) return 0;
        return extractJoystickValue(joystickCachedFrame);
    }

    /**
     * Seek bar data frame parser
     *   $-6-1-17-x-#  seek bar 1
     *   $-6-1-18-x-#  seek bar 2
     *   $-6-1-19-x-#  seek bar 3
     *   $-6-1-20-x-#  seek bar 4
     */
    /** Strictly validates whether `s` matches the frame format for the specified axis type. */
    function seekBarCheckFrame(s: string, bar: AppSeekBar): boolean {
        if (!s) return false;
        const n = s.length;
        if (n < 12 || n > 14) return false;

        // 0 is the starting bit, 6 is the cut length
        // Fixed prefix "$-6-1-"
        let s_cache = s.substr(0, 6);
        if (s_cache !== "$-6-1-") return false;

        // Type segment（2 bit：17/18/19/20）
        const t1 = s.charCodeAt(6);
        if (t1 !== 49 && t1 !== 50) return false;   // 49 --> '1', 50 --> '2'
        const t2 = s.charCodeAt(7);
        let type: number = 0;
        if (t2 === 55) type = 17;      // 51 --> '7'
        else if (t2 === 56) type = 18; // 52 --> '8'
        else if (t2 === 57) type = 19; // 53 --> '9'
        else if (t2 === 48) type = 20; // 54 --> '0'
        else return false;

        if (type !== bar) return false;

        if (s.charCodeAt(8) !== 45) return false; // 45 --> '-'

        // Fixed suffix "-#"
        s_cache = s.substr(n - 2, 2);
        if (s_cache !== "-#") return false;

        // Numerical segment（1~3 bit，≤255）
        const xStart = 9;
        const xEnd = n - 2;
        if (xEnd - xStart < 1 || xEnd - xStart > 3) return false;
        let v = 0;
        for (let i = xStart; i < xEnd; i++) {
            const c = s.charCodeAt(i);
            if (c < 48 || c > 57) return false;  // '0' -- '9'
            v = v * 10 + (c - 48);
        }
        return v <= 255;
    }

    /** Extract values (0 to 255) from valid frames without checking */
    function extractSeekBarValue(s: string): number {
        const n = s.length;
        const xStart = 9;
        const xEnd = n - 2;
        let v = 0;
        for (let i = xStart; i < xEnd; i++) {
            v = v * 10 + (s.charCodeAt(i) - 48);
        }

        return v;
    }

    /**
     * Check the seek bar command from the App.
     * @param s - Bluetooth serial port reads APP string instructions.
     * @param bar - seek bar
     */
    //% group="Seek bar"
    //% weight=87
    //% block="serial port seek bar data %s equal %bar"
    export function seekBarIsFrame(s: string, bar: AppSeekBar): boolean {
        s = s + "#";
        const ok = seekBarCheckFrame(s, bar);
        if (ok) seekBarCachedFrame = s;
        return ok;
    }

    /**
     * read the seek bar data from the App.
     * @param bar - seek bar
     * Return seek bar data
     */
    //% group="Seek bar"
    //% weight=86
    //% block="read seek bar %bar data"
    export function readSeekBarValue(bar: AppSeekBar): number {
        //if (!seekBarCheckFrame(joystickCachedFrame, bar)) return 0;
        return extractSeekBarValue(seekBarCachedFrame);
    }

    /**
     * Gravity data frame parser
     * Supports 7 frame types (x ∈ [0,255]):
     *   $-7-1-21-1-x-#  X axis, positive
     *   $-7-1-21-0-x-#  X axis, negative
     *   $-7-1-22-1-x-#  Y axis, positive
     *   $-7-1-22-0-x-#  Y axis, negative
     *   $-7-1-23-1-x-#  Z axis, positive
     *   $-7-1-23-0-x-#  Z axis, negative
     */
    /** Strictly validates whether `s` matches the frame format for the specified axis type. */
    function gravityCheckFrame(s: string, axis: AppGravity): boolean {
        if (!s) return false;
        const n = s.length;
        if (n < 14 || n > 16) return false;

        // 0 is the starting bit, 7 is the cut length
        // Fixed prefix "$-7-1-2"
        let s_cache = s.substr(0, 7);
        if (s_cache !== "$-7-1-2") return false;

        // Type segment（1 bit：1/2/3）
        const t2 = s.charCodeAt(7);
        let type: number = 0;
        if (t2 === 49) type = 21;      // 49 --> '1'
        else if (t2 === 50) type = 22; // 50 --> '2'
        else if (t2 === 51) type = 23; // 51 --> '3'
        else return false;

        if (type !== axis) return false;

        if (s.charCodeAt(8) !== 45) return false;      // 45 --> '-'

        // sign bit（0/1）
        const sign = s.charCodeAt(9);
        if (sign !== 48 && sign !== 49) return false;  // 48 --> '0', 49 --> '1'

        if (s.charCodeAt(10) !== 45) return false;     // 45 --> '-'

        // Fixed suffix "-#"
        s_cache = s.substr(n - 2, 2);
        if (s_cache !== "-#") return false;

        // Numerical segment（1~3 bit，≤255）
        const xStart = 11;
        const xEnd = n - 2;
        if (xEnd - xStart < 1 || xEnd - xStart > 3) return false;
        let v = 0;
        for (let i = xStart; i < xEnd; i++) {
            const c = s.charCodeAt(i);
            if (c < 48 || c > 57) return false;  // '0' -- '9'
            v = v * 10 + (c - 48);
        }
        return v <= 255;
    }

    /** Extract values (0 to 255) from valid frames without checking */
    function extractGravityValue(s: string): number {
        const n = s.length;
        const xStart = 11;
        const xEnd = n - 2;
        let v = 0;
        for (let i = xStart; i < xEnd; i++) {
            v = v * 10 + (s.charCodeAt(i) - 48);
        }
        // sign bit（0/1）
        const sign = s.charCodeAt(9);
        if (sign === 48) v = 0 - v;   // 48 --> 0

        return v;
    }

    /**
     * Check the gravity command from the App.
     * @param s - Bluetooth serial port reads APP string instructions.
     * @param axis - gravity data type
     */
    //% group="Gravity"
    //% weight=85
    //% block="serial port gravity data %s equal %axis"
    export function gravityIsFrame(s: string, axis: AppGravity): boolean {
        s = s + "#";
        const ok = gravityCheckFrame(s, axis);
        if (ok) gravityCachedFrame = s;
        return ok;
    }

    /**
     * read the gravity data from the App.
     * @param axis - gravity data type.
     * Return gravity data
     */
    //% group="Gravity"
    //% weight=84
    //% block="read gravity %axis data"
    export function readGravityValue(axis: AppGravity): number {
        //if (!gravityCheckFrame(gravityCachedFrame, axis)) return 0;
        return extractGravityValue(gravityCachedFrame);
    }

    /**
     * RGB color data frame parser
     *   $-6-1-24-x-#  red color
     *   $-6-1-25-x-#  green color
     *   $-6-1-26-x-#  blue color
     */
    /** Strictly validates whether `s` matches the frame format for the specified axis type. */
    function rgbColorCheckFrame(s: string, color: AppRgbColor): boolean {
        if (!s) return false;
        const n = s.length;
        if (n < 12 || n > 14) return false;

        // 0 is the starting bit, 6 is the cut length
        // Fixed prefix "$-6-1-2"
        let s_cache = s.substr(0, 7);
        if (s_cache !== "$-6-1-2") return false;

        // Type segment（1 bit：4/5/6）
        const t2 = s.charCodeAt(7);
        let type: number = 0;
        if (t2 === 52) type = 24;      // 52 --> '4'
        else if (t2 === 53) type = 25; // 53 --> '5'
        else if (t2 === 54) type = 26; // 54 --> '6'
        else return false;

        if (type !== color) return false;

        if (s.charCodeAt(8) !== 45) return false; // 45 --> '-'

        // Fixed suffix "-#"
        s_cache = s.substr(n - 2, 2);
        if (s_cache !== "-#") return false;

        // Numerical segment（1~3 bit，≤255）
        const xStart = 9;
        const xEnd = n - 2;
        if (xEnd - xStart < 1 || xEnd - xStart > 3) return false;
        let v = 0;
        for (let i = xStart; i < xEnd; i++) {
            const c = s.charCodeAt(i);
            if (c < 48 || c > 57) return false;  // '0' -- '9'
            v = v * 10 + (c - 48);
        }
        return v <= 255;
    }

    /** Extract values (0 to 255) from valid frames without checking */
    function extractRgbColorValue(s: string): number {
        const n = s.length;
        const xStart = 9;
        const xEnd = n - 2;
        let v = 0;
        for (let i = xStart; i < xEnd; i++) {
            v = v * 10 + (s.charCodeAt(i) - 48);
        }

        return v;
    }

    /**
     * Check the rgb color command from the App.
     * @param s - Bluetooth serial port reads APP string instructions.
     * @param color - r/g/b
     */
    //% group="RGB color"
    //% weight=83
    //% block="serial port rgb color data %s equal %color"
    export function rgbColorIsFrame(s: string, color: AppRgbColor): boolean {
        s = s + "#";
        const ok = rgbColorCheckFrame(s, color);
        if (ok) rgbColorCachedFrame = s;
        return ok;
    }

    /**
     * read the rgb color data from the App.
     * @param color - r/g/b
     * Return rgb color data
     */
    //% group="RGB color"
    //% weight=82
    //% block="read rgb color %color data"
    export function rgbColorValue(color: AppRgbColor): number {
        //if (!rgbColorCheckFrame(rgbColorCachedFrame, bar)) return 0;
        return extractRgbColorValue(rgbColorCachedFrame);
    }
}
