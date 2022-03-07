/**
 * @version 1.0.0.0
 * @copyright Copyright ©  2018
 * @compiler Bridge.NET 16.8.2
 */
Bridge.assembly("JuiceBoxEngine", function ($asm, globals) {
    "use strict";

    Bridge.define("Humper.Base.Constants", {
        statics: {
            fields: {
                Threshold: 0
            },
            ctors: {
                init: function () {
                    this.Threshold = 1E-05;
                }
            }
        }
    });

    /** @namespace Humper.Base */

    /**
     * Contains commonly used precalculated values and mathematical operations.
     *
     * @static
     * @abstract
     * @public
     * @class Humper.Base.Maths
     */
    Bridge.define("Humper.Base.Maths", {
        statics: {
            fields: {
                /**
                 * Represents the mathematical constant e(2.71828175).
                 *
                 * @static
                 * @public
                 * @memberof Humper.Base.Maths
                 * @constant
                 * @default 2.71828175
                 * @type number
                 */
                E: 0,
                /**
                 * Represents the log base ten of e(0.4342945).
                 *
                 * @static
                 * @public
                 * @memberof Humper.Base.Maths
                 * @constant
                 * @default 0.4342945
                 * @type number
                 */
                Log10E: 0,
                /**
                 * Represents the log base two of e(1.442695).
                 *
                 * @static
                 * @public
                 * @memberof Humper.Base.Maths
                 * @constant
                 * @default 1.442695
                 * @type number
                 */
                Log2E: 0,
                /**
                 * Represents the value of pi(3.14159274).
                 *
                 * @static
                 * @public
                 * @memberof Humper.Base.Maths
                 * @constant
                 * @default 3.14159274
                 * @type number
                 */
                Pi: 0,
                /**
                 * Represents the value of pi divided by two(1.57079637).
                 *
                 * @static
                 * @public
                 * @memberof Humper.Base.Maths
                 * @constant
                 * @default 1.57079637
                 * @type number
                 */
                PiOver2: 0,
                /**
                 * Represents the value of pi divided by four(0.7853982).
                 *
                 * @static
                 * @public
                 * @memberof Humper.Base.Maths
                 * @constant
                 * @default 0.7853982
                 * @type number
                 */
                PiOver4: 0,
                /**
                 * Represents the value of pi times two(6.28318548).
                 *
                 * @static
                 * @public
                 * @memberof Humper.Base.Maths
                 * @constant
                 * @default 6.28318548
                 * @type number
                 */
                TwoPi: 0
            },
            ctors: {
                init: function () {
                    this.E = 2.71828175;
                    this.Log10E = 0.4342945;
                    this.Log2E = 1.442695;
                    this.Pi = 3.14159274;
                    this.PiOver2 = 1.57079637;
                    this.PiOver4 = 0.7853982;
                    this.TwoPi = 6.28318548;
                }
            },
            methods: {
                /**
                 * Returns the Cartesian coordinate for one axis of a point that is defined by a given triangle and two normalized barycentric (areal) coordinates.
                 *
                 * @static
                 * @public
                 * @this Humper.Base.Maths
                 * @memberof Humper.Base.Maths
                 * @param   {number}    value1     The coordinate on one axis of vertex 1 of the defining triangle.
                 * @param   {number}    value2     The coordinate on the same axis of vertex 2 of the defining triangle.
                 * @param   {number}    value3     The coordinate on the same axis of vertex 3 of the defining triangle.
                 * @param   {number}    amount1    The normalized barycentric (areal) coordinate b2, equal to the weighting factor for vertex 2, the coordinate of which is specified in value2.
                 * @param   {number}    amount2    The normalized barycentric (areal) coordinate b3, equal to the weighting factor for vertex 3, the coordinate of which is specified in value3.
                 * @return  {number}               Cartesian coordinate of the specified point with respect to the axis being used.
                 */
                Barycentric: function (value1, value2, value3, amount1, amount2) {
                    return value1 + (value2 - value1) * amount1 + (value3 - value1) * amount2;
                },
                /**
                 * Performs a Catmull-Rom interpolation using the specified positions.
                 *
                 * @static
                 * @public
                 * @this Humper.Base.Maths
                 * @memberof Humper.Base.Maths
                 * @param   {number}    value1    The first position in the interpolation.
                 * @param   {number}    value2    The second position in the interpolation.
                 * @param   {number}    value3    The third position in the interpolation.
                 * @param   {number}    value4    The fourth position in the interpolation.
                 * @param   {number}    amount    Weighting factor.
                 * @return  {number}              A position that is the result of the Catmull-Rom interpolation.
                 */
                CatmullRom: function (value1, value2, value3, value4, amount) {
                    // Using formula from http://www.mvps.org/directx/articles/catmull/
                    // Internally using doubles not to lose precission
                    var amountSquared = amount * amount;
                    var amountCubed = amountSquared * amount;
                    return 0.5 * (2.0 * value2 + (value3 - value1) * amount + (2.0 * value1 - 5.0 * value2 + 4.0 * value3 - value4) * amountSquared + (3.0 * value2 - value1 - 3.0 * value3 + value4) * amountCubed);
                },
                /**
                 * Restricts a value to be within a specified range.
                 *
                 * @static
                 * @public
                 * @this Humper.Base.Maths
                 * @memberof Humper.Base.Maths
                 * @param   {number}    value    The value to clamp.
                 * @param   {number}    min      The minimum value. If <pre><code>value</code></pre> is less than <pre><code>min</code></pre>, <pre><code>min</code></pre> will be returned.
                 * @param   {number}    max      The maximum value. If <pre><code>value</code></pre> is greater than <pre><code>max</code></pre>, <pre><code>max</code></pre> will be returned.
                 * @return  {number}             The clamped value.
                 */
                Clamp$1: function (value, min, max) {
                    // First we check to see if we're greater than the max
                    value = (value > max) ? max : value;

                    // Then we check to see if we're less than the min.
                    value = (value < min) ? min : value;

                    // There's no check to see if min > max.
                    return value;
                },
                /**
                 * Restricts a value to be within a specified range.
                 *
                 * @static
                 * @public
                 * @this Humper.Base.Maths
                 * @memberof Humper.Base.Maths
                 * @param   {number}    value    The value to clamp.
                 * @param   {number}    min      The minimum value. If <pre><code>value</code></pre> is less than <pre><code>min</code></pre>, <pre><code>min</code></pre> will be returned.
                 * @param   {number}    max      The maximum value. If <pre><code>value</code></pre> is greater than <pre><code>max</code></pre>, <pre><code>max</code></pre> will be returned.
                 * @return  {number}             The clamped value.
                 */
                Clamp: function (value, min, max) {
                    value = (value > max) ? max : value;
                    value = (value < min) ? min : value;
                    return value;
                },
                /**
                 * Calculates the absolute value of the difference of two values.
                 *
                 * @static
                 * @public
                 * @this Humper.Base.Maths
                 * @memberof Humper.Base.Maths
                 * @param   {number}    value1    Source value.
                 * @param   {number}    value2    Source value.
                 * @return  {number}              Distance between the two values.
                 */
                Distance: function (value1, value2) {
                    return Math.abs(value1 - value2);
                },
                /**
                 * Performs a Hermite spline interpolation.
                 *
                 * @static
                 * @public
                 * @this Humper.Base.Maths
                 * @memberof Humper.Base.Maths
                 * @param   {number}    value1      Source position.
                 * @param   {number}    tangent1    Source tangent.
                 * @param   {number}    value2      Source position.
                 * @param   {number}    tangent2    Source tangent.
                 * @param   {number}    amount      Weighting factor.
                 * @return  {number}                The result of the Hermite spline interpolation.
                 */
                Hermite: function (value1, tangent1, value2, tangent2, amount) {
                    // All transformed to double not to lose precission
                    // Otherwise, for high numbers of param:amount the result is NaN instead of Infinity
                    var v1 = value1, v2 = value2, t1 = tangent1, t2 = tangent2, s = amount, result;
                    var sCubed = s * s * s;
                    var sSquared = s * s;

                    if (amount === 0.0) {
                        result = value1;
                    } else {
                        if (amount === 1.0) {
                            result = value2;
                        } else {
                            result = (2 * v1 - 2 * v2 + t2 + t1) * sCubed + (3 * v2 - 3 * v1 - 2 * t1 - t2) * sSquared + t1 * s + v1;
                        }
                    }
                    return result;
                },
                /**
                 * Linearly interpolates between two values.
                 *
                 * @static
                 * @public
                 * @this Humper.Base.Maths
                 * @memberof Humper.Base.Maths
                 * @param   {number}    value1    Source value.
                 * @param   {number}    value2    Destination value.
                 * @param   {number}    amount    Value between 0 and 1 indicating the weight of value2.
                 * @return  {number}              Interpolated value.
                 */
                Lerp: function (value1, value2, amount) {
                    return value1 + (value2 - value1) * amount;
                },
                /**
                 * Linearly interpolates between two values.
                 This method is a less efficient, more precise version of {@link }.
                 See remarks for more info.
                 *
                 * @static
                 * @public
                 * @this Humper.Base.Maths
                 * @memberof Humper.Base.Maths
                 * @param   {number}    value1    Source value.
                 * @param   {number}    value2    Destination value.
                 * @param   {number}    amount    Value between 0 and 1 indicating the weight of value2.
                 * @return  {number}              Interpolated value.
                 */
                LerpPrecise: function (value1, value2, amount) {
                    return ((1 - amount) * value1) + (value2 * amount);
                },
                /**
                 * Returns the greater of two values.
                 *
                 * @static
                 * @public
                 * @this Humper.Base.Maths
                 * @memberof Humper.Base.Maths
                 * @param   {number}    value1    Source value.
                 * @param   {number}    value2    Source value.
                 * @return  {number}              The greater value.
                 */
                Max$1: function (value1, value2) {
                    return value1 > value2 ? value1 : value2;
                },
                /**
                 * Returns the greater of two values.
                 *
                 * @static
                 * @public
                 * @this Humper.Base.Maths
                 * @memberof Humper.Base.Maths
                 * @param   {number}    value1    Source value.
                 * @param   {number}    value2    Source value.
                 * @return  {number}              The greater value.
                 */
                Max: function (value1, value2) {
                    return value1 > value2 ? value1 : value2;
                },
                /**
                 * Returns the lesser of two values.
                 *
                 * @static
                 * @public
                 * @this Humper.Base.Maths
                 * @memberof Humper.Base.Maths
                 * @param   {number}    value1    Source value.
                 * @param   {number}    value2    Source value.
                 * @return  {number}              The lesser value.
                 */
                Min$1: function (value1, value2) {
                    return value1 < value2 ? value1 : value2;
                },
                /**
                 * Returns the lesser of two values.
                 *
                 * @static
                 * @public
                 * @this Humper.Base.Maths
                 * @memberof Humper.Base.Maths
                 * @param   {number}    value1    Source value.
                 * @param   {number}    value2    Source value.
                 * @return  {number}              The lesser value.
                 */
                Min: function (value1, value2) {
                    return value1 < value2 ? value1 : value2;
                },
                /**
                 * Interpolates between two values using a cubic equation.
                 *
                 * @static
                 * @public
                 * @this Humper.Base.Maths
                 * @memberof Humper.Base.Maths
                 * @param   {number}    value1    Source value.
                 * @param   {number}    value2    Source value.
                 * @param   {number}    amount    Weighting value.
                 * @return  {number}              Interpolated value.
                 */
                SmoothStep: function (value1, value2, amount) {
                    // It is expected that 0 < amount < 1
                    // If amount < 0, return value1
                    // If amount > 1, return value2
                    var result = Humper.Base.Maths.Clamp$1(amount, 0.0, 1.0);
                    result = Humper.Base.Maths.Hermite(value1, 0.0, value2, 0.0, result);

                    return result;
                },
                /**
                 * Converts radians to degrees.
                 *
                 * @static
                 * @public
                 * @this Humper.Base.Maths
                 * @memberof Humper.Base.Maths
                 * @param   {number}    radians    The angle in radians.
                 * @return  {number}               The angle in degrees.
                 */
                ToDegrees: function (radians) {
                    return radians * 57.295779513082323;
                },
                /**
                 * Converts degrees to radians.
                 *
                 * @static
                 * @public
                 * @this Humper.Base.Maths
                 * @memberof Humper.Base.Maths
                 * @param   {number}    degrees    The angle in degrees.
                 * @return  {number}               The angle in radians.
                 */
                ToRadians: function (degrees) {
                    return degrees * 0.017453292519943295;
                },
                /**
                 * Reduces a given angle to a value between π and -π.
                 *
                 * @static
                 * @public
                 * @this Humper.Base.Maths
                 * @memberof Humper.Base.Maths
                 * @param   {number}    angle    The angle to reduce, in radians.
                 * @return  {number}             The new angle, in radians.
                 */
                WrapAngle: function (angle) {
                    var $t;
                    angle = ($t = angle, $t - (6.2831854820251465 * Math.round($t / 6.2831854820251465)));
                    if (angle <= -3.14159274) {
                        angle += 6.28318548;
                    } else {
                        if (angle > 3.14159274) {
                            angle -= 6.28318548;
                        }
                    }
                    return angle;
                },
                /**
                 * Determines if value is powered by two.
                 *
                 * @static
                 * @public
                 * @this Humper.Base.Maths
                 * @memberof Humper.Base.Maths
                 * @param   {number}     value    A value.
                 * @return  {boolean}             <pre><code>true</code></pre> if <pre><code>value</code></pre> is powered by two; otherwise <pre><code>false</code></pre>.
                 */
                IsPowerOfTwo: function (value) {
                    return (value > 0) && ((value & (((value - 1) | 0))) === 0);
                }
            }
        }
    });

    /**
     * Describes a floating point 2D-rectangle.
     *
     * @public
     * @class Humper.Base.RectangleF
     * @implements  System.IEquatable$1
     */
    Bridge.define("Humper.Base.RectangleF", {
        inherits: function () { return [System.IEquatable$1(Humper.Base.RectangleF)]; },
        $kind: "struct",
        statics: {
            fields: {
                /**
                 * Returns a {@link } with X=0, Y=0, Width=0, Height=0.
                 *
                 * @static
                 * @public
                 * @memberof Humper.Base.RectangleF
                 * @function Empty
                 * @type Humper.Base.RectangleF
                 */
                Empty: null
            },
            ctors: {
                init: function () {
                    this.Empty = new Humper.Base.RectangleF();
                }
            },
            methods: {
                /**
                 * Creates a new {@link } that contains overlapping region of two other rectangles.
                 *
                 * @static
                 * @public
                 * @this Humper.Base.RectangleF
                 * @memberof Humper.Base.RectangleF
                 * @param   {Humper.Base.RectangleF}    value1    The first {@link }.
                 * @param   {Humper.Base.RectangleF}    value2    The second {@link }.
                 * @return  {Humper.Base.RectangleF}              Overlapping region of the two rectangles.
                 */
                Intersect: function (value1, value2) {
                    value1 = {v:value1};
                    value2 = {v:value2};
                    var rectangle = { v : new Humper.Base.RectangleF() };
                    Humper.Base.RectangleF.Intersect$1(value1, value2, rectangle);
                    return rectangle.v.$clone();
                },
                /**
                 * Creates a new {@link } that contains overlapping region of two other rectangles.
                 *
                 * @static
                 * @public
                 * @this Humper.Base.RectangleF
                 * @memberof Humper.Base.RectangleF
                 * @param   {Humper.Base.RectangleF}    value1    The first {@link }.
                 * @param   {Humper.Base.RectangleF}    value2    The second {@link }.
                 * @param   {Humper.Base.RectangleF}    result    Overlapping region of the two rectangles as an output parameter.
                 * @return  {void}
                 */
                Intersect$1: function (value1, value2, result) {
                    if (value1.v.Intersects(value2.v.$clone())) {
                        var rightSide = Math.min(value1.v.X + value1.v.Width, value2.v.X + value2.v.Width);
                        var leftSide = Math.max(value1.v.X, value2.v.X);
                        var topSide = Math.max(value1.v.Y, value2.v.Y);
                        var bottomSide = Math.min(value1.v.Y + value1.v.Height, value2.v.Y + value2.v.Height);
                        result.v = new Humper.Base.RectangleF.$ctor3(leftSide, topSide, rightSide - leftSide, bottomSide - topSide);
                    } else {
                        result.v = new Humper.Base.RectangleF.$ctor3(0, 0, 0, 0);
                    }
                },
                /**
                 * Creates a new {@link } that completely contains two other rectangles.
                 *
                 * @static
                 * @public
                 * @this Humper.Base.RectangleF
                 * @memberof Humper.Base.RectangleF
                 * @param   {Humper.Base.RectangleF}    value1    The first {@link }.
                 * @param   {Humper.Base.RectangleF}    value2    The second {@link }.
                 * @return  {Humper.Base.RectangleF}              The union of the two rectangles.
                 */
                Union: function (value1, value2) {
                    var x = Math.min(value1.X, value2.X);
                    var y = Math.min(value1.Y, value2.Y);
                    return new Humper.Base.RectangleF.$ctor3(x, y, Math.max(value1.Right, value2.Right) - x, Math.max(value1.Bottom, value2.Bottom) - y);
                },
                /**
                 * Creates a new {@link } that completely contains two other rectangles.
                 *
                 * @static
                 * @public
                 * @this Humper.Base.RectangleF
                 * @memberof Humper.Base.RectangleF
                 * @param   {Humper.Base.RectangleF}    value1    The first {@link }.
                 * @param   {Humper.Base.RectangleF}    value2    The second {@link }.
                 * @param   {Humper.Base.RectangleF}    result    The union of the two rectangles as an output parameter.
                 * @return  {void}
                 */
                Union$1: function (value1, value2, result) {
                    result.v.X = Math.min(value1.v.X, value2.v.X);
                    result.v.Y = Math.min(value1.v.Y, value2.v.Y);
                    result.v.Width = Math.max(value1.v.Right, value2.v.Right) - result.v.X;
                    result.v.Height = Math.max(value1.v.Bottom, value2.v.Bottom) - result.v.Y;
                },
                /**
                 * Creates a new {@link } from two points.
                 *
                 * @static
                 * @public
                 * @this Humper.Base.RectangleF
                 * @memberof Humper.Base.RectangleF
                 * @param   {Humper.Base.Vector2}       point0    The top left or bottom right corner
                 * @param   {Humper.Base.Vector2}       point1    The bottom left or top right corner
                 * @return  {Humper.Base.RectangleF}
                 */
                FromPoints: function (point0, point1) {
                    var x = Math.min(point0.X, point1.X);
                    var y = Math.min(point0.Y, point1.Y);
                    var width = Math.abs(point0.X - point1.X);
                    var height = Math.abs(point0.Y - point1.Y);
                    var rectangle = new Humper.Base.RectangleF.$ctor3(x, y, width, height);
                    return rectangle.$clone();
                }/**
                 * Compares whether two {@link } instances are equal.
                 *
                 * @static
                 * @public
                 * @this Humper.Base.RectangleF
                 * @memberof Humper.Base.RectangleF
                 * @param   {Humper.Base.RectangleF}    a    {@link } instance on the left of the equal sign.
                 * @param   {Humper.Base.RectangleF}    b    {@link } instance on the right of the equal sign.
                 * @return  {boolean}                        <pre><code>true</code></pre> if the instances are equal; <pre><code>false</code></pre> otherwise.
                 */
                ,
                op_Equality: function (a, b) {
                    var epsilon = 1E-05;
                    return Math.abs(a.X - b.X) < epsilon && Math.abs(a.Y - b.Y) < epsilon && Math.abs(a.Width - b.Width) < epsilon && Math.abs(a.Height - b.Height) < epsilon;
                }/**
                 * Compares whether two {@link } instances are not equal.
                 *
                 * @static
                 * @public
                 * @this Humper.Base.RectangleF
                 * @memberof Humper.Base.RectangleF
                 * @param   {Humper.Base.RectangleF}    a    {@link } instance on the left of the not equal sign.
                 * @param   {Humper.Base.RectangleF}    b    {@link } instance on the right of the not equal sign.
                 * @return  {boolean}                        <pre><code>true</code></pre> if the instances are not equal; <pre><code>false</code></pre> otherwise.
                 */
                ,
                op_Inequality: function (a, b) {
                    return !(Humper.Base.RectangleF.op_Equality(a.$clone(), b.$clone()));
                },
                getDefaultValue: function () { return new Humper.Base.RectangleF(); }
            }
        },
        fields: {
            /**
             * The x coordinate of the top-left corner of this {@link }.
             *
             * @instance
             * @public
             * @memberof Humper.Base.RectangleF
             * @type number
             */
            X: 0,
            /**
             * The y coordinate of the top-left corner of this {@link }.
             *
             * @instance
             * @public
             * @memberof Humper.Base.RectangleF
             * @type number
             */
            Y: 0,
            /**
             * The width of this {@link }.
             *
             * @instance
             * @public
             * @memberof Humper.Base.RectangleF
             * @type number
             */
            Width: 0,
            /**
             * The height of this {@link }.
             *
             * @instance
             * @public
             * @memberof Humper.Base.RectangleF
             * @type number
             */
            Height: 0
        },
        props: {
            /**
             * Returns the x coordinate of the left edge of this {@link }.
             *
             * @instance
             * @public
             * @readonly
             * @memberof Humper.Base.RectangleF
             * @function Left
             * @type number
             */
            Left: {
                get: function () {
                    return this.X;
                }
            },
            /**
             * Returns the x coordinate of the right edge of this {@link }.
             *
             * @instance
             * @public
             * @readonly
             * @memberof Humper.Base.RectangleF
             * @function Right
             * @type number
             */
            Right: {
                get: function () {
                    return this.X + this.Width;
                }
            },
            /**
             * Returns the y coordinate of the top edge of this {@link }.
             *
             * @instance
             * @public
             * @readonly
             * @memberof Humper.Base.RectangleF
             * @function Top
             * @type number
             */
            Top: {
                get: function () {
                    return this.Y;
                }
            },
            /**
             * Returns the y coordinate of the bottom edge of this {@link }.
             *
             * @instance
             * @public
             * @readonly
             * @memberof Humper.Base.RectangleF
             * @function Bottom
             * @type number
             */
            Bottom: {
                get: function () {
                    return this.Y + this.Height;
                }
            },
            /**
             * Whether or not this {@link } has a {@link } and
             {@link } of 0, and a {@link } of (0, 0).
             *
             * @instance
             * @public
             * @readonly
             * @memberof Humper.Base.RectangleF
             * @function IsEmpty
             * @type boolean
             */
            IsEmpty: {
                get: function () {
                    return this.Width === 0 && this.Height === 0 && this.X === 0 && this.Y === 0;
                }
            },
            /**
             * The top-left coordinates of this {@link }.
             *
             * @instance
             * @public
             * @memberof Humper.Base.RectangleF
             * @function Location
             * @type Humper.Base.Vector2
             */
            Location: {
                get: function () {
                    return new Humper.Base.Vector2.$ctor2(this.X, this.Y);
                },
                set: function (value) {
                    this.X = value.X;
                    this.Y = value.Y;
                }
            },
            /**
             * The width-height coordinates of this {@link }.
             *
             * @instance
             * @public
             * @memberof Humper.Base.RectangleF
             * @function Size
             * @type Humper.Base.Vector2
             */
            Size: {
                get: function () {
                    return new Humper.Base.Vector2.$ctor2(this.Width, this.Height);
                },
                set: function (value) {
                    this.Width = value.X;
                    this.Height = value.Y;
                }
            },
            /**
             * A {@link } located in the center of this {@link }.
             *
             * @instance
             * @public
             * @readonly
             * @memberof Humper.Base.RectangleF
             * @function Center
             * @type Humper.Base.Vector2
             */
            Center: {
                get: function () {
                    return new Humper.Base.Vector2.$ctor2(this.X + this.Width / 2.0, this.Y + this.Height / 2.0);
                }
            },
            DebugDisplayString: {
                get: function () {
                    return System.String.concat(Bridge.box(this.X, System.Single, System.Single.format, System.Single.getHashCode), "  ", Bridge.box(this.Y, System.Single, System.Single.format, System.Single.getHashCode), "  ", Bridge.box(this.Width, System.Single, System.Single.format, System.Single.getHashCode), "  ", Bridge.box(this.Height, System.Single, System.Single.format, System.Single.getHashCode));
                }
            }
        },
        alias: ["equalsT", "System$IEquatable$1$Humper$Base$RectangleF$equalsT"],
        ctors: {
            /**
             * Creates a new instance of {@link } struct, with the specified
             position, width, and height.
             *
             * @instance
             * @public
             * @this Humper.Base.RectangleF
             * @memberof Humper.Base.RectangleF
             * @param   {number}    x         The x coordinate of the top-left corner of the created {@link }.
             * @param   {number}    y         The y coordinate of the top-left corner of the created {@link }.
             * @param   {number}    width     The width of the created {@link }.
             * @param   {number}    height    The height of the created {@link }.
             * @return  {void}
             */
            $ctor3: function (x, y, width, height) {
                this.$initialize();
                this.X = x;
                this.Y = y;
                this.Width = width;
                this.Height = height;
            },
            /**
             * Initializes a new instance of the {@link } that contains the two given rectangles.
             *
             * @instance
             * @public
             * @this Humper.Base.RectangleF
             * @memberof Humper.Base.RectangleF
             * @param   {Humper.Base.RectangleF}    one    One.
             * @param   {Humper.Base.RectangleF}    two    Two.
             * @return  {void}
             */
            $ctor1: function (one, two) {
                this.$initialize();
                var left = Math.min(one.Left, two.Left);
                var right = Math.max(one.Right, two.Right);
                var top = Math.min(one.Top, two.Top);
                var bottom = Math.max(one.Bottom, two.Bottom);

                this.X = left;
                this.Y = top;
                this.Width = right - left;
                this.Height = bottom - top;
            },
            /**
             * Creates a new instance of {@link } struct, with the specified
             location and size.
             *
             * @instance
             * @public
             * @this Humper.Base.RectangleF
             * @memberof Humper.Base.RectangleF
             * @param   {Humper.Base.Vector2}    location    The x and y coordinates of the top-left corner of the created {@link }.
             * @param   {Humper.Base.Vector2}    size        The width and height of the created {@link }.
             * @return  {void}
             */
            $ctor2: function (location, size) {
                this.$initialize();
                this.X = location.X;
                this.Y = location.Y;
                this.Width = size.X;
                this.Height = size.Y;
            },
            ctor: function () {
                this.$initialize();
            }
        },
        methods: {
            /**
             * Gets whether or not the provided coordinates lie within the bounds of this {@link }.
             *
             * @instance
             * @public
             * @this Humper.Base.RectangleF
             * @memberof Humper.Base.RectangleF
             * @param   {number}     x    The x coordinate of the point to check for containment.
             * @param   {number}     y    The y coordinate of the point to check for containment.
             * @return  {boolean}         <pre><code>true</code></pre> if the provided coordinates lie inside this {@link }; <pre><code>false</code></pre> otherwise.
             */
            Contains$2: function (x, y) {
                return this.X <= x && x < this.X + this.Width && this.Y <= y && y < this.Y + this.Height;
            },
            /**
             * Gets whether or not the provided coordinates lie within the bounds of this {@link }.
             *
             * @instance
             * @public
             * @this Humper.Base.RectangleF
             * @memberof Humper.Base.RectangleF
             * @param   {number}     x    The x coordinate of the point to check for containment.
             * @param   {number}     y    The y coordinate of the point to check for containment.
             * @return  {boolean}         <pre><code>true</code></pre> if the provided coordinates lie inside this {@link }; <pre><code>false</code></pre> otherwise.
             */
            Contains$3: function (x, y) {
                return this.X <= x && x < this.X + this.Width && this.Y <= y && y < this.Y + this.Height;
            },
            /**
             * Gets whether or not the provided {@link } lies within the bounds of this {@link }.
             *
             * @instance
             * @public
             * @this Humper.Base.RectangleF
             * @memberof Humper.Base.RectangleF
             * @param   {Humper.Base.Vector2}    value    The coordinates to check for inclusion in this {@link }.
             * @return  {boolean}                         <pre><code>true</code></pre> if the provided {@link } lies inside this {@link }; <pre><code>false</code></pre> otherwise.
             */
            Contains$1: function (value) {
                return this.X <= value.X && value.X < this.X + this.Width && this.Y <= value.Y && value.Y < this.Y + this.Height;
            },
            /**
             * Gets whether or not the provided {@link } lies within the bounds of this {@link }.
             *
             * @instance
             * @public
             * @this Humper.Base.RectangleF
             * @memberof Humper.Base.RectangleF
             * @param   {Humper.Base.Vector2}    value     The coordinates to check for inclusion in this {@link }.
             * @param   {System.Boolean}         result    <pre><code>true</code></pre> if the provided {@link } lies inside this {@link }; <pre><code>false</code></pre> otherwise. As an output parameter.
             * @return  {void}
             */
            Contains$5: function (value, result) {
                result.v = (this.X <= value.v.X) && (value.v.X < this.X + this.Width) && (this.Y <= value.v.Y) && (value.v.Y < this.Y + this.Height);
            },
            /**
             * Gets whether or not the provided {@link } lies within the bounds of this {@link }.
             *
             * @instance
             * @public
             * @this Humper.Base.RectangleF
             * @memberof Humper.Base.RectangleF
             * @param   {Humper.Base.RectangleF}    value    The {@link } to check for inclusion in this {@link }.
             * @return  {boolean}                            <pre><code>true</code></pre> if the provided {@link }'s bounds lie entirely inside this {@link }; <pre><code>false</code></pre> otherwise.
             */
            Contains: function (value) {
                return (this.X <= value.X) && (value.X + value.Width <= this.X + this.Width) && (this.Y <= value.Y) && (value.Y + value.Height <= this.Y + this.Height);
            },
            /**
             * Gets whether or not the provided {@link } lies within the bounds of this {@link }.
             *
             * @instance
             * @public
             * @this Humper.Base.RectangleF
             * @memberof Humper.Base.RectangleF
             * @param   {Humper.Base.RectangleF}    value     The {@link } to check for inclusion in this {@link }.
             * @param   {System.Boolean}            result    <pre><code>true</code></pre> if the provided {@link }'s bounds lie entirely inside this {@link }; <pre><code>false</code></pre> otherwise. As an output parameter.
             * @return  {void}
             */
            Contains$4: function (value, result) {
                result.v = (this.X <= value.v.X) && (value.v.X + value.v.Width <= this.X + this.Width) && (this.Y <= value.v.Y) && (value.v.Y + value.v.Height <= this.Y + this.Height);
            },
            GetBoundingRectangle: function () {
                return this;
            },
            /**
             * Compares whether current instance is equal to specified {@link }.
             *
             * @instance
             * @public
             * @override
             * @this Humper.Base.RectangleF
             * @memberof Humper.Base.RectangleF
             * @param   {System.Object}    obj    The {@link } to compare.
             * @return  {boolean}                 <pre><code>true</code></pre> if the instances are equal; <pre><code>false</code></pre> otherwise.
             */
            equals: function (obj) {
                return Bridge.is(obj, Humper.Base.RectangleF) && Humper.Base.RectangleF.op_Equality(this, System.Nullable.getValue(Bridge.cast(Bridge.unbox(obj), Humper.Base.RectangleF)));
            },
            /**
             * Compares whether current instance is equal to specified {@link }.
             *
             * @instance
             * @public
             * @this Humper.Base.RectangleF
             * @memberof Humper.Base.RectangleF
             * @param   {Humper.Base.RectangleF}    other    The {@link } to compare.
             * @return  {boolean}                            <pre><code>true</code></pre> if the instances are equal; <pre><code>false</code></pre> otherwise.
             */
            equalsT: function (other) {
                return Humper.Base.RectangleF.op_Equality(this, other.$clone());
            },
            /**
             * Gets the hash code of this {@link }.
             *
             * @instance
             * @public
             * @override
             * @this Humper.Base.RectangleF
             * @memberof Humper.Base.RectangleF
             * @return  {number}        Hash code of this {@link }.
             */
            getHashCode: function () {
                // ReSharper disable NonReadonlyMemberInGetHashCode
                return System.Single.getHashCode(this.X) ^ System.Single.getHashCode(this.Y) ^ System.Single.getHashCode(this.Width) ^ System.Single.getHashCode(this.Height);
                // ReSharper restore NonReadonlyMemberInGetHashCode
            },
            /**
             * Adjusts the edges of this {@link } by specified horizontal and vertical amounts.
             *
             * @instance
             * @public
             * @this Humper.Base.RectangleF
             * @memberof Humper.Base.RectangleF
             * @param   {number}    horizontalAmount    Value to adjust the left and right edges.
             * @param   {number}    verticalAmount      Value to adjust the top and bottom edges.
             * @return  {void}
             */
            Inflate: function (horizontalAmount, verticalAmount) {
                this.X -= horizontalAmount;
                this.Y -= verticalAmount;
                this.Width += Bridge.Int.mul(horizontalAmount, 2);
                this.Height += Bridge.Int.mul(verticalAmount, 2);
            },
            /**
             * Adjusts the edges of this {@link } by specified horizontal and vertical amounts.
             *
             * @instance
             * @public
             * @this Humper.Base.RectangleF
             * @memberof Humper.Base.RectangleF
             * @param   {number}    horizontalAmount    Value to adjust the left and right edges.
             * @param   {number}    verticalAmount      Value to adjust the top and bottom edges.
             * @return  {void}
             */
            Inflate$1: function (horizontalAmount, verticalAmount) {
                this.X -= horizontalAmount;
                this.Y -= verticalAmount;
                this.Width += horizontalAmount * 2;
                this.Height += verticalAmount * 2;
            },
            /**
             * Gets whether or not the other {@link } intersects with this RectangleF.
             *
             * @instance
             * @public
             * @this Humper.Base.RectangleF
             * @memberof Humper.Base.RectangleF
             * @param   {Humper.Base.RectangleF}    value    The other rectangle for testing.
             * @return  {boolean}                            <pre><code>true</code></pre> if other {@link } intersects with this rectangle; <pre><code>false</code></pre> otherwise.
             */
            Intersects: function (value) {
                return value.Left < this.Right && this.Left < value.Right && value.Top < this.Bottom && this.Top < value.Bottom;
            },
            /**
             * Gets whether or not the other {@link } intersects with this rectangle.
             *
             * @instance
             * @public
             * @this Humper.Base.RectangleF
             * @memberof Humper.Base.RectangleF
             * @param   {Humper.Base.RectangleF}    value     The other rectangle for testing.
             * @param   {System.Boolean}            result    <pre><code>true</code></pre> if other {@link } intersects with this rectangle; <pre><code>false</code></pre> otherwise. As an output parameter.
             * @return  {void}
             */
            Intersects$1: function (value, result) {
                result.v = value.v.Left < this.Right && this.Left < value.v.Right && value.v.Top < this.Bottom && this.Top < value.v.Bottom;
            },
            /**
             * Changes the {@link } of this {@link }.
             *
             * @instance
             * @public
             * @this Humper.Base.RectangleF
             * @memberof Humper.Base.RectangleF
             * @param   {number}    offsetX    The x coordinate to add to this {@link }.
             * @param   {number}    offsetY    The y coordinate to add to this {@link }.
             * @return  {void}
             */
            Offset$1: function (offsetX, offsetY) {
                this.X += offsetX;
                this.Y += offsetY;
            },
            /**
             * Changes the {@link } of this {@link }.
             *
             * @instance
             * @public
             * @this Humper.Base.RectangleF
             * @memberof Humper.Base.RectangleF
             * @param   {number}    offsetX    The x coordinate to add to this {@link }.
             * @param   {number}    offsetY    The y coordinate to add to this {@link }.
             * @return  {void}
             */
            Offset$2: function (offsetX, offsetY) {
                this.X += offsetX;
                this.Y += offsetY;
            },
            /**
             * Changes the {@link } of this {@link }.
             *
             * @instance
             * @public
             * @this Humper.Base.RectangleF
             * @memberof Humper.Base.RectangleF
             * @param   {Humper.Base.Vector2}    amount    The x and y components to add to this {@link }.
             * @return  {void}
             */
            Offset: function (amount) {
                this.X += amount.X;
                this.Y += amount.Y;
            },
            /**
             * Returns a {@link } representation of this {@link } in the format:
             {X:[{@link }] Y:[{@link }] Width:[{@link }] Height:[{@link }]}
             *
             * @instance
             * @public
             * @override
             * @this Humper.Base.RectangleF
             * @memberof Humper.Base.RectangleF
             * @return  {string}        {@link } representation of this {@link }.
             */
            toString: function () {
                return "{X:" + System.Single.format(this.X) + " Y:" + System.Single.format(this.Y) + " Width:" + System.Single.format(this.Width) + " Height:" + System.Single.format(this.Height) + "}";
            },
            /**
             * Calculates the signed depth of intersection between two rectangles.
             *
             * @instance
             * @public
             * @this Humper.Base.RectangleF
             * @memberof Humper.Base.RectangleF
             * @param   {Humper.Base.RectangleF}    other
             * @return  {Humper.Base.Vector2}                The amount of overlap between two intersecting rectangles. These
             depth values can be negative depending on which wides the rectangles
             intersect. This allows callers to determine the correct direction
             to push objects in order to resolve collisions.
             If the rectangles are not intersecting, Vector2.Zero is returned.
             */
            IntersectionDepth: function (other) {
                // Calculate half sizes.
                var thisHalfWidth = this.Width / 2.0;
                var thisHalfHeight = this.Height / 2.0;
                var otherHalfWidth = other.Width / 2.0;
                var otherHalfHeight = other.Height / 2.0;

                // Calculate centers.
                var centerA = new Humper.Base.Vector2.$ctor2(this.Left + thisHalfWidth, this.Top + thisHalfHeight);
                var centerB = new Humper.Base.Vector2.$ctor2(other.Left + otherHalfWidth, other.Top + otherHalfHeight);

                // Calculate current and minimum-non-intersecting distances between centers.
                var distanceX = centerA.X - centerB.X;
                var distanceY = centerA.Y - centerB.Y;
                var minDistanceX = thisHalfWidth + otherHalfWidth;
                var minDistanceY = thisHalfHeight + otherHalfHeight;

                // If we are not intersecting at all, return (0, 0).
                if (Math.abs(distanceX) >= minDistanceX || Math.abs(distanceY) >= minDistanceY) {
                    return Humper.Base.Vector2.Zero.$clone();
                }

                // Calculate and return intersection depths.
                var depthX = distanceX > 0 ? minDistanceX - distanceX : -minDistanceX - distanceX;
                var depthY = distanceY > 0 ? minDistanceY - distanceY : -minDistanceY - distanceY;
                return new Humper.Base.Vector2.$ctor2(depthX, depthY);
            },
            $clone: function (to) {
                var s = to || new Humper.Base.RectangleF();
                s.X = this.X;
                s.Y = this.Y;
                s.Width = this.Width;
                s.Height = this.Height;
                return s;
            }
        }
    });

    /**
     * Describes a 2D-vector.
     *
     * @public
     * @class Humper.Base.Vector2
     * @implements  System.IEquatable$1
     */
    Bridge.define("Humper.Base.Vector2", {
        inherits: function () { return [System.IEquatable$1(Humper.Base.Vector2)]; },
        $kind: "struct",
        statics: {
            fields: {
                zeroVector: null,
                unitVector: null,
                unitXVector: null,
                unitYVector: null
            },
            props: {
                /**
                 * Returns a {@link } with components 0, 0.
                 *
                 * @static
                 * @public
                 * @readonly
                 * @memberof Humper.Base.Vector2
                 * @function Zero
                 * @type Humper.Base.Vector2
                 */
                Zero: {
                    get: function () {
                        return Humper.Base.Vector2.zeroVector.$clone();
                    }
                },
                /**
                 * Returns a {@link } with components 1, 1.
                 *
                 * @static
                 * @public
                 * @readonly
                 * @memberof Humper.Base.Vector2
                 * @function One
                 * @type Humper.Base.Vector2
                 */
                One: {
                    get: function () {
                        return Humper.Base.Vector2.unitVector.$clone();
                    }
                },
                /**
                 * Returns a {@link } with components 1, 0.
                 *
                 * @static
                 * @public
                 * @readonly
                 * @memberof Humper.Base.Vector2
                 * @function UnitX
                 * @type Humper.Base.Vector2
                 */
                UnitX: {
                    get: function () {
                        return Humper.Base.Vector2.unitXVector.$clone();
                    }
                },
                /**
                 * Returns a {@link } with components 0, 1.
                 *
                 * @static
                 * @public
                 * @readonly
                 * @memberof Humper.Base.Vector2
                 * @function UnitY
                 * @type Humper.Base.Vector2
                 */
                UnitY: {
                    get: function () {
                        return Humper.Base.Vector2.unitYVector.$clone();
                    }
                }
            },
            ctors: {
                init: function () {
                    this.zeroVector = new Humper.Base.Vector2();
                    this.unitVector = new Humper.Base.Vector2();
                    this.unitXVector = new Humper.Base.Vector2();
                    this.unitYVector = new Humper.Base.Vector2();
                    this.zeroVector = new Humper.Base.Vector2.$ctor2(0.0, 0.0);
                    this.unitVector = new Humper.Base.Vector2.$ctor2(1.0, 1.0);
                    this.unitXVector = new Humper.Base.Vector2.$ctor2(1.0, 0.0);
                    this.unitYVector = new Humper.Base.Vector2.$ctor2(0.0, 1.0);
                }
            },
            methods: {
                /**
                 * Performs vector addition on <b /> and <b />.
                 *
                 * @static
                 * @public
                 * @this Humper.Base.Vector2
                 * @memberof Humper.Base.Vector2
                 * @param   {Humper.Base.Vector2}    value1    The first vector to add.
                 * @param   {Humper.Base.Vector2}    value2    The second vector to add.
                 * @return  {Humper.Base.Vector2}              The result of the vector addition.
                 */
                Add: function (value1, value2) {
                    value1.X += value2.X;
                    value1.Y += value2.Y;
                    return value1.$clone();
                },
                /**
                 * Performs vector addition on <b /> and
                 <b />, storing the result of the
                 addition in <b />.
                 *
                 * @static
                 * @public
                 * @this Humper.Base.Vector2
                 * @memberof Humper.Base.Vector2
                 * @param   {Humper.Base.Vector2}    value1    The first vector to add.
                 * @param   {Humper.Base.Vector2}    value2    The second vector to add.
                 * @param   {Humper.Base.Vector2}    result    The result of the vector addition.
                 * @return  {void}
                 */
                Add$1: function (value1, value2, result) {
                    result.v.X = value1.v.X + value2.v.X;
                    result.v.Y = value1.v.Y + value2.v.Y;
                },
                /**
                 * Creates a new {@link } that contains the cartesian coordinates of a vector specified in barycentric coordinates and relative to 2d-triangle.
                 *
                 * @static
                 * @public
                 * @this Humper.Base.Vector2
                 * @memberof Humper.Base.Vector2
                 * @param   {Humper.Base.Vector2}    value1     The first vector of 2d-triangle.
                 * @param   {Humper.Base.Vector2}    value2     The second vector of 2d-triangle.
                 * @param   {Humper.Base.Vector2}    value3     The third vector of 2d-triangle.
                 * @param   {number}                 amount1    Barycentric scalar <pre><code>b2</code></pre> which represents a weighting factor towards second vector of 2d-triangle.
                 * @param   {number}                 amount2    Barycentric scalar <pre><code>b3</code></pre> which represents a weighting factor towards third vector of 2d-triangle.
                 * @return  {Humper.Base.Vector2}               The cartesian translation of barycentric coordinates.
                 */
                Barycentric: function (value1, value2, value3, amount1, amount2) {
                    return new Humper.Base.Vector2.$ctor2(Humper.Base.Maths.Barycentric(value1.X, value2.X, value3.X, amount1, amount2), Humper.Base.Maths.Barycentric(value1.Y, value2.Y, value3.Y, amount1, amount2));
                },
                /**
                 * Creates a new {@link } that contains the cartesian coordinates of a vector specified in barycentric coordinates and relative to 2d-triangle.
                 *
                 * @static
                 * @public
                 * @this Humper.Base.Vector2
                 * @memberof Humper.Base.Vector2
                 * @param   {Humper.Base.Vector2}    value1     The first vector of 2d-triangle.
                 * @param   {Humper.Base.Vector2}    value2     The second vector of 2d-triangle.
                 * @param   {Humper.Base.Vector2}    value3     The third vector of 2d-triangle.
                 * @param   {number}                 amount1    Barycentric scalar <pre><code>b2</code></pre> which represents a weighting factor towards second vector of 2d-triangle.
                 * @param   {number}                 amount2    Barycentric scalar <pre><code>b3</code></pre> which represents a weighting factor towards third vector of 2d-triangle.
                 * @param   {Humper.Base.Vector2}    result     The cartesian translation of barycentric coordinates as an output parameter.
                 * @return  {void}
                 */
                Barycentric$1: function (value1, value2, value3, amount1, amount2, result) {
                    result.v.X = Humper.Base.Maths.Barycentric(value1.v.X, value2.v.X, value3.v.X, amount1, amount2);
                    result.v.Y = Humper.Base.Maths.Barycentric(value1.v.Y, value2.v.Y, value3.v.Y, amount1, amount2);
                },
                /**
                 * Creates a new {@link } that contains CatmullRom interpolation of the specified vectors.
                 *
                 * @static
                 * @public
                 * @this Humper.Base.Vector2
                 * @memberof Humper.Base.Vector2
                 * @param   {Humper.Base.Vector2}    value1    The first vector in interpolation.
                 * @param   {Humper.Base.Vector2}    value2    The second vector in interpolation.
                 * @param   {Humper.Base.Vector2}    value3    The third vector in interpolation.
                 * @param   {Humper.Base.Vector2}    value4    The fourth vector in interpolation.
                 * @param   {number}                 amount    Weighting factor.
                 * @return  {Humper.Base.Vector2}              The result of CatmullRom interpolation.
                 */
                CatmullRom: function (value1, value2, value3, value4, amount) {
                    return new Humper.Base.Vector2.$ctor2(Humper.Base.Maths.CatmullRom(value1.X, value2.X, value3.X, value4.X, amount), Humper.Base.Maths.CatmullRom(value1.Y, value2.Y, value3.Y, value4.Y, amount));
                },
                /**
                 * Creates a new {@link } that contains CatmullRom interpolation of the specified vectors.
                 *
                 * @static
                 * @public
                 * @this Humper.Base.Vector2
                 * @memberof Humper.Base.Vector2
                 * @param   {Humper.Base.Vector2}    value1    The first vector in interpolation.
                 * @param   {Humper.Base.Vector2}    value2    The second vector in interpolation.
                 * @param   {Humper.Base.Vector2}    value3    The third vector in interpolation.
                 * @param   {Humper.Base.Vector2}    value4    The fourth vector in interpolation.
                 * @param   {number}                 amount    Weighting factor.
                 * @param   {Humper.Base.Vector2}    result    The result of CatmullRom interpolation as an output parameter.
                 * @return  {void}
                 */
                CatmullRom$1: function (value1, value2, value3, value4, amount, result) {
                    result.v.X = Humper.Base.Maths.CatmullRom(value1.v.X, value2.v.X, value3.v.X, value4.v.X, amount);
                    result.v.Y = Humper.Base.Maths.CatmullRom(value1.v.Y, value2.v.Y, value3.v.Y, value4.v.Y, amount);
                },
                /**
                 * Clamps the specified value within a range.
                 *
                 * @static
                 * @public
                 * @this Humper.Base.Vector2
                 * @memberof Humper.Base.Vector2
                 * @param   {Humper.Base.Vector2}    value1    The value to clamp.
                 * @param   {Humper.Base.Vector2}    min       The min value.
                 * @param   {Humper.Base.Vector2}    max       The max value.
                 * @return  {Humper.Base.Vector2}              The clamped value.
                 */
                Clamp: function (value1, min, max) {
                    return new Humper.Base.Vector2.$ctor2(Humper.Base.Maths.Clamp$1(value1.X, min.X, max.X), Humper.Base.Maths.Clamp$1(value1.Y, min.Y, max.Y));
                },
                /**
                 * Clamps the specified value within a range.
                 *
                 * @static
                 * @public
                 * @this Humper.Base.Vector2
                 * @memberof Humper.Base.Vector2
                 * @param   {Humper.Base.Vector2}    value1    The value to clamp.
                 * @param   {Humper.Base.Vector2}    min       The min value.
                 * @param   {Humper.Base.Vector2}    max       The max value.
                 * @param   {Humper.Base.Vector2}    result    The clamped value as an output parameter.
                 * @return  {void}
                 */
                Clamp$1: function (value1, min, max, result) {
                    result.v.X = Humper.Base.Maths.Clamp$1(value1.v.X, min.v.X, max.v.X);
                    result.v.Y = Humper.Base.Maths.Clamp$1(value1.v.Y, min.v.Y, max.v.Y);
                },
                /**
                 * Returns the distance between two vectors.
                 *
                 * @static
                 * @public
                 * @this Humper.Base.Vector2
                 * @memberof Humper.Base.Vector2
                 * @param   {Humper.Base.Vector2}    value1    The first vector.
                 * @param   {Humper.Base.Vector2}    value2    The second vector.
                 * @return  {number}                           The distance between two vectors.
                 */
                Distance: function (value1, value2) {
                    var v1 = value1.X - value2.X, v2 = value1.Y - value2.Y;
                    return Math.sqrt((v1 * v1) + (v2 * v2));
                },
                /**
                 * Returns the distance between two vectors.
                 *
                 * @static
                 * @public
                 * @this Humper.Base.Vector2
                 * @memberof Humper.Base.Vector2
                 * @param   {Humper.Base.Vector2}    value1    The first vector.
                 * @param   {Humper.Base.Vector2}    value2    The second vector.
                 * @param   {System.Single}          result    The distance between two vectors as an output parameter.
                 * @return  {void}
                 */
                Distance$1: function (value1, value2, result) {
                    var v1 = value1.v.X - value2.v.X, v2 = value1.v.Y - value2.v.Y;
                    result.v = Math.sqrt((v1 * v1) + (v2 * v2));
                },
                /**
                 * Returns the squared distance between two vectors.
                 *
                 * @static
                 * @public
                 * @this Humper.Base.Vector2
                 * @memberof Humper.Base.Vector2
                 * @param   {Humper.Base.Vector2}    value1    The first vector.
                 * @param   {Humper.Base.Vector2}    value2    The second vector.
                 * @return  {number}                           The squared distance between two vectors.
                 */
                DistanceSquared: function (value1, value2) {
                    var v1 = value1.X - value2.X, v2 = value1.Y - value2.Y;
                    return (v1 * v1) + (v2 * v2);
                },
                /**
                 * Returns the squared distance between two vectors.
                 *
                 * @static
                 * @public
                 * @this Humper.Base.Vector2
                 * @memberof Humper.Base.Vector2
                 * @param   {Humper.Base.Vector2}    value1    The first vector.
                 * @param   {Humper.Base.Vector2}    value2    The second vector.
                 * @param   {System.Single}          result    The squared distance between two vectors as an output parameter.
                 * @return  {void}
                 */
                DistanceSquared$1: function (value1, value2, result) {
                    var v1 = value1.v.X - value2.v.X, v2 = value1.v.Y - value2.v.Y;
                    result.v = (v1 * v1) + (v2 * v2);
                },
                /**
                 * Divides the components of a {@link } by the components of another {@link }.
                 *
                 * @static
                 * @public
                 * @this Humper.Base.Vector2
                 * @memberof Humper.Base.Vector2
                 * @param   {Humper.Base.Vector2}    value1    Source {@link }.
                 * @param   {Humper.Base.Vector2}    value2    Divisor {@link }.
                 * @return  {Humper.Base.Vector2}              The result of dividing the vectors.
                 */
                Divide: function (value1, value2) {
                    value1.X /= value2.X;
                    value1.Y /= value2.Y;
                    return value1.$clone();
                },
                /**
                 * Divides the components of a {@link } by the components of another {@link }.
                 *
                 * @static
                 * @public
                 * @this Humper.Base.Vector2
                 * @memberof Humper.Base.Vector2
                 * @param   {Humper.Base.Vector2}    value1    Source {@link }.
                 * @param   {Humper.Base.Vector2}    value2    Divisor {@link }.
                 * @param   {Humper.Base.Vector2}    result    The result of dividing the vectors as an output parameter.
                 * @return  {void}
                 */
                Divide$2: function (value1, value2, result) {
                    result.v.X = value1.v.X / value2.v.X;
                    result.v.Y = value1.v.Y / value2.v.Y;
                },
                /**
                 * Divides the components of a {@link } by a scalar.
                 *
                 * @static
                 * @public
                 * @this Humper.Base.Vector2
                 * @memberof Humper.Base.Vector2
                 * @param   {Humper.Base.Vector2}    value1     Source {@link }.
                 * @param   {number}                 divider    Divisor scalar.
                 * @return  {Humper.Base.Vector2}               The result of dividing a vector by a scalar.
                 */
                Divide$1: function (value1, divider) {
                    var factor = 1 / divider;
                    value1.X *= factor;
                    value1.Y *= factor;
                    return value1.$clone();
                },
                /**
                 * Divides the components of a {@link } by a scalar.
                 *
                 * @static
                 * @public
                 * @this Humper.Base.Vector2
                 * @memberof Humper.Base.Vector2
                 * @param   {Humper.Base.Vector2}    value1     Source {@link }.
                 * @param   {number}                 divider    Divisor scalar.
                 * @param   {Humper.Base.Vector2}    result     The result of dividing a vector by a scalar as an output parameter.
                 * @return  {void}
                 */
                Divide$3: function (value1, divider, result) {
                    var factor = 1 / divider;
                    result.v.X = value1.v.X * factor;
                    result.v.Y = value1.v.Y * factor;
                },
                /**
                 * Returns a dot product of two vectors.
                 *
                 * @static
                 * @public
                 * @this Humper.Base.Vector2
                 * @memberof Humper.Base.Vector2
                 * @param   {Humper.Base.Vector2}    value1    The first vector.
                 * @param   {Humper.Base.Vector2}    value2    The second vector.
                 * @return  {number}                           The dot product of two vectors.
                 */
                Dot: function (value1, value2) {
                    return (value1.X * value2.X) + (value1.Y * value2.Y);
                },
                /**
                 * Returns a dot product of two vectors.
                 *
                 * @static
                 * @public
                 * @this Humper.Base.Vector2
                 * @memberof Humper.Base.Vector2
                 * @param   {Humper.Base.Vector2}    value1    The first vector.
                 * @param   {Humper.Base.Vector2}    value2    The second vector.
                 * @param   {System.Single}          result    The dot product of two vectors as an output parameter.
                 * @return  {void}
                 */
                Dot$1: function (value1, value2, result) {
                    result.v = (value1.v.X * value2.v.X) + (value1.v.Y * value2.v.Y);
                },
                /**
                 * Creates a new {@link } that contains hermite spline interpolation.
                 *
                 * @static
                 * @public
                 * @this Humper.Base.Vector2
                 * @memberof Humper.Base.Vector2
                 * @param   {Humper.Base.Vector2}    value1      The first position vector.
                 * @param   {Humper.Base.Vector2}    tangent1    The first tangent vector.
                 * @param   {Humper.Base.Vector2}    value2      The second position vector.
                 * @param   {Humper.Base.Vector2}    tangent2    The second tangent vector.
                 * @param   {number}                 amount      Weighting factor.
                 * @return  {Humper.Base.Vector2}                The hermite spline interpolation vector.
                 */
                Hermite: function (value1, tangent1, value2, tangent2, amount) {
                    return new Humper.Base.Vector2.$ctor2(Humper.Base.Maths.Hermite(value1.X, tangent1.X, value2.X, tangent2.X, amount), Humper.Base.Maths.Hermite(value1.Y, tangent1.Y, value2.Y, tangent2.Y, amount));
                },
                /**
                 * Creates a new {@link } that contains hermite spline interpolation.
                 *
                 * @static
                 * @public
                 * @this Humper.Base.Vector2
                 * @memberof Humper.Base.Vector2
                 * @param   {Humper.Base.Vector2}    value1      The first position vector.
                 * @param   {Humper.Base.Vector2}    tangent1    The first tangent vector.
                 * @param   {Humper.Base.Vector2}    value2      The second position vector.
                 * @param   {Humper.Base.Vector2}    tangent2    The second tangent vector.
                 * @param   {number}                 amount      Weighting factor.
                 * @param   {Humper.Base.Vector2}    result      The hermite spline interpolation vector as an output parameter.
                 * @return  {void}
                 */
                Hermite$1: function (value1, tangent1, value2, tangent2, amount, result) {
                    result.v.X = Humper.Base.Maths.Hermite(value1.v.X, tangent1.v.X, value2.v.X, tangent2.v.X, amount);
                    result.v.Y = Humper.Base.Maths.Hermite(value1.v.Y, tangent1.v.Y, value2.v.Y, tangent2.v.Y, amount);
                },
                /**
                 * Creates a new {@link } that contains linear interpolation of the specified vectors.
                 *
                 * @static
                 * @public
                 * @this Humper.Base.Vector2
                 * @memberof Humper.Base.Vector2
                 * @param   {Humper.Base.Vector2}    value1    The first vector.
                 * @param   {Humper.Base.Vector2}    value2    The second vector.
                 * @param   {number}                 amount    Weighting value(between 0.0 and 1.0).
                 * @return  {Humper.Base.Vector2}              The result of linear interpolation of the specified vectors.
                 */
                Lerp: function (value1, value2, amount) {
                    return new Humper.Base.Vector2.$ctor2(Humper.Base.Maths.Lerp(value1.X, value2.X, amount), Humper.Base.Maths.Lerp(value1.Y, value2.Y, amount));
                },
                /**
                 * Creates a new {@link } that contains linear interpolation of the specified vectors.
                 *
                 * @static
                 * @public
                 * @this Humper.Base.Vector2
                 * @memberof Humper.Base.Vector2
                 * @param   {Humper.Base.Vector2}    value1    The first vector.
                 * @param   {Humper.Base.Vector2}    value2    The second vector.
                 * @param   {number}                 amount    Weighting value(between 0.0 and 1.0).
                 * @param   {Humper.Base.Vector2}    result    The result of linear interpolation of the specified vectors as an output parameter.
                 * @return  {void}
                 */
                Lerp$1: function (value1, value2, amount, result) {
                    result.v.X = Humper.Base.Maths.Lerp(value1.v.X, value2.v.X, amount);
                    result.v.Y = Humper.Base.Maths.Lerp(value1.v.Y, value2.v.Y, amount);
                },
                /**
                 * Creates a new {@link } that contains linear interpolation of the specified vectors.
                 Uses {@link } on MathHelper for the interpolation.
                 Less efficient but more precise compared to {@link }.
                 See remarks section of {@link } on MathHelper for more info.
                 *
                 * @static
                 * @public
                 * @this Humper.Base.Vector2
                 * @memberof Humper.Base.Vector2
                 * @param   {Humper.Base.Vector2}    value1    The first vector.
                 * @param   {Humper.Base.Vector2}    value2    The second vector.
                 * @param   {number}                 amount    Weighting value(between 0.0 and 1.0).
                 * @return  {Humper.Base.Vector2}              The result of linear interpolation of the specified vectors.
                 */
                LerpPrecise: function (value1, value2, amount) {
                    return new Humper.Base.Vector2.$ctor2(Humper.Base.Maths.LerpPrecise(value1.X, value2.X, amount), Humper.Base.Maths.LerpPrecise(value1.Y, value2.Y, amount));
                },
                /**
                 * Creates a new {@link } that contains linear interpolation of the specified vectors.
                 Uses {@link } on MathHelper for the interpolation.
                 Less efficient but more precise compared to {@link }.
                 See remarks section of {@link } on MathHelper for more info.
                 *
                 * @static
                 * @public
                 * @this Humper.Base.Vector2
                 * @memberof Humper.Base.Vector2
                 * @param   {Humper.Base.Vector2}    value1    The first vector.
                 * @param   {Humper.Base.Vector2}    value2    The second vector.
                 * @param   {number}                 amount    Weighting value(between 0.0 and 1.0).
                 * @param   {Humper.Base.Vector2}    result    The result of linear interpolation of the specified vectors as an output parameter.
                 * @return  {void}
                 */
                LerpPrecise$1: function (value1, value2, amount, result) {
                    result.v.X = Humper.Base.Maths.LerpPrecise(value1.v.X, value2.v.X, amount);
                    result.v.Y = Humper.Base.Maths.LerpPrecise(value1.v.Y, value2.v.Y, amount);
                },
                /**
                 * Creates a new {@link } that contains a maximal values from the two vectors.
                 *
                 * @static
                 * @public
                 * @this Humper.Base.Vector2
                 * @memberof Humper.Base.Vector2
                 * @param   {Humper.Base.Vector2}    value1    The first vector.
                 * @param   {Humper.Base.Vector2}    value2    The second vector.
                 * @return  {Humper.Base.Vector2}              The {@link } with maximal values from the two vectors.
                 */
                Max: function (value1, value2) {
                    return new Humper.Base.Vector2.$ctor2(value1.X > value2.X ? value1.X : value2.X, value1.Y > value2.Y ? value1.Y : value2.Y);
                },
                /**
                 * Creates a new {@link } that contains a maximal values from the two vectors.
                 *
                 * @static
                 * @public
                 * @this Humper.Base.Vector2
                 * @memberof Humper.Base.Vector2
                 * @param   {Humper.Base.Vector2}    value1    The first vector.
                 * @param   {Humper.Base.Vector2}    value2    The second vector.
                 * @param   {Humper.Base.Vector2}    result    The {@link } with maximal values from the two vectors as an output parameter.
                 * @return  {void}
                 */
                Max$1: function (value1, value2, result) {
                    result.v.X = value1.v.X > value2.v.X ? value1.v.X : value2.v.X;
                    result.v.Y = value1.v.Y > value2.v.Y ? value1.v.Y : value2.v.Y;
                },
                /**
                 * Creates a new {@link } that contains a minimal values from the two vectors.
                 *
                 * @static
                 * @public
                 * @this Humper.Base.Vector2
                 * @memberof Humper.Base.Vector2
                 * @param   {Humper.Base.Vector2}    value1    The first vector.
                 * @param   {Humper.Base.Vector2}    value2    The second vector.
                 * @return  {Humper.Base.Vector2}              The {@link } with minimal values from the two vectors.
                 */
                Min: function (value1, value2) {
                    return new Humper.Base.Vector2.$ctor2(value1.X < value2.X ? value1.X : value2.X, value1.Y < value2.Y ? value1.Y : value2.Y);
                },
                /**
                 * Creates a new {@link } that contains a minimal values from the two vectors.
                 *
                 * @static
                 * @public
                 * @this Humper.Base.Vector2
                 * @memberof Humper.Base.Vector2
                 * @param   {Humper.Base.Vector2}    value1    The first vector.
                 * @param   {Humper.Base.Vector2}    value2    The second vector.
                 * @param   {Humper.Base.Vector2}    result    The {@link } with minimal values from the two vectors as an output parameter.
                 * @return  {void}
                 */
                Min$1: function (value1, value2, result) {
                    result.v.X = value1.v.X < value2.v.X ? value1.v.X : value2.v.X;
                    result.v.Y = value1.v.Y < value2.v.Y ? value1.v.Y : value2.v.Y;
                },
                /**
                 * Creates a new {@link } that contains a multiplication of two vectors.
                 *
                 * @static
                 * @public
                 * @this Humper.Base.Vector2
                 * @memberof Humper.Base.Vector2
                 * @param   {Humper.Base.Vector2}    value1    Source {@link }.
                 * @param   {Humper.Base.Vector2}    value2    Source {@link }.
                 * @return  {Humper.Base.Vector2}              The result of the vector multiplication.
                 */
                Multiply: function (value1, value2) {
                    value1.X *= value2.X;
                    value1.Y *= value2.Y;
                    return value1.$clone();
                },
                /**
                 * Creates a new {@link } that contains a multiplication of two vectors.
                 *
                 * @static
                 * @public
                 * @this Humper.Base.Vector2
                 * @memberof Humper.Base.Vector2
                 * @param   {Humper.Base.Vector2}    value1    Source {@link }.
                 * @param   {Humper.Base.Vector2}    value2    Source {@link }.
                 * @param   {Humper.Base.Vector2}    result    The result of the vector multiplication as an output parameter.
                 * @return  {void}
                 */
                Multiply$2: function (value1, value2, result) {
                    result.v.X = value1.v.X * value2.v.X;
                    result.v.Y = value1.v.Y * value2.v.Y;
                },
                /**
                 * Creates a new {@link } that contains a multiplication of {@link } and a scalar.
                 *
                 * @static
                 * @public
                 * @this Humper.Base.Vector2
                 * @memberof Humper.Base.Vector2
                 * @param   {Humper.Base.Vector2}    value1         Source {@link }.
                 * @param   {number}                 scaleFactor    Scalar value.
                 * @return  {Humper.Base.Vector2}                   The result of the vector multiplication with a scalar.
                 */
                Multiply$1: function (value1, scaleFactor) {
                    value1.X *= scaleFactor;
                    value1.Y *= scaleFactor;
                    return value1.$clone();
                },
                /**
                 * Creates a new {@link } that contains a multiplication of {@link } and a scalar.
                 *
                 * @static
                 * @public
                 * @this Humper.Base.Vector2
                 * @memberof Humper.Base.Vector2
                 * @param   {Humper.Base.Vector2}    value1         Source {@link }.
                 * @param   {number}                 scaleFactor    Scalar value.
                 * @param   {Humper.Base.Vector2}    result         The result of the multiplication with a scalar as an output parameter.
                 * @return  {void}
                 */
                Multiply$3: function (value1, scaleFactor, result) {
                    result.v.X = value1.v.X * scaleFactor;
                    result.v.Y = value1.v.Y * scaleFactor;
                },
                /**
                 * Creates a new {@link } that contains the specified vector inversion.
                 *
                 * @static
                 * @public
                 * @this Humper.Base.Vector2
                 * @memberof Humper.Base.Vector2
                 * @param   {Humper.Base.Vector2}    value    Source {@link }.
                 * @return  {Humper.Base.Vector2}             The result of the vector inversion.
                 */
                Negate: function (value) {
                    value.X = -value.X;
                    value.Y = -value.Y;
                    return value.$clone();
                },
                /**
                 * Creates a new {@link } that contains the specified vector inversion.
                 *
                 * @static
                 * @public
                 * @this Humper.Base.Vector2
                 * @memberof Humper.Base.Vector2
                 * @param   {Humper.Base.Vector2}    value     Source {@link }.
                 * @param   {Humper.Base.Vector2}    result    The result of the vector inversion as an output parameter.
                 * @return  {void}
                 */
                Negate$1: function (value, result) {
                    result.v.X = -value.v.X;
                    result.v.Y = -value.v.Y;
                },
                /**
                 * Creates a new {@link } that contains a normalized values from another vector.
                 *
                 * @static
                 * @public
                 * @this Humper.Base.Vector2
                 * @memberof Humper.Base.Vector2
                 * @param   {Humper.Base.Vector2}    value    Source {@link }.
                 * @return  {Humper.Base.Vector2}             Unit vector.
                 */
                Normalize: function (value) {
                    var val = 1.0 / Math.sqrt((value.X * value.X) + (value.Y * value.Y));
                    value.X *= val;
                    value.Y *= val;
                    return value.$clone();
                },
                /**
                 * Creates a new {@link } that contains a normalized values from another vector.
                 *
                 * @static
                 * @public
                 * @this Humper.Base.Vector2
                 * @memberof Humper.Base.Vector2
                 * @param   {Humper.Base.Vector2}    value     Source {@link }.
                 * @param   {Humper.Base.Vector2}    result    Unit vector as an output parameter.
                 * @return  {void}
                 */
                Normalize$1: function (value, result) {
                    var val = 1.0 / Math.sqrt((value.v.X * value.v.X) + (value.v.Y * value.v.Y));
                    result.v.X = value.v.X * val;
                    result.v.Y = value.v.Y * val;
                },
                /**
                 * Creates a new {@link } that contains reflect vector of the given vector and normal.
                 *
                 * @static
                 * @public
                 * @this Humper.Base.Vector2
                 * @memberof Humper.Base.Vector2
                 * @param   {Humper.Base.Vector2}    vector    Source {@link }.
                 * @param   {Humper.Base.Vector2}    normal    Reflection normal.
                 * @return  {Humper.Base.Vector2}              Reflected vector.
                 */
                Reflect: function (vector, normal) {
                    var result = new Humper.Base.Vector2();
                    var val = 2.0 * ((vector.X * normal.X) + (vector.Y * normal.Y));
                    result.X = vector.X - (normal.X * val);
                    result.Y = vector.Y - (normal.Y * val);
                    return result.$clone();
                },
                /**
                 * Creates a new {@link } that contains reflect vector of the given vector and normal.
                 *
                 * @static
                 * @public
                 * @this Humper.Base.Vector2
                 * @memberof Humper.Base.Vector2
                 * @param   {Humper.Base.Vector2}    vector    Source {@link }.
                 * @param   {Humper.Base.Vector2}    normal    Reflection normal.
                 * @param   {Humper.Base.Vector2}    result    Reflected vector as an output parameter.
                 * @return  {void}
                 */
                Reflect$1: function (vector, normal, result) {
                    var val = 2.0 * ((vector.v.X * normal.v.X) + (vector.v.Y * normal.v.Y));
                    result.v.X = vector.v.X - (normal.v.X * val);
                    result.v.Y = vector.v.Y - (normal.v.Y * val);
                },
                /**
                 * Creates a new {@link } that contains cubic interpolation of the specified vectors.
                 *
                 * @static
                 * @public
                 * @this Humper.Base.Vector2
                 * @memberof Humper.Base.Vector2
                 * @param   {Humper.Base.Vector2}    value1    Source {@link }.
                 * @param   {Humper.Base.Vector2}    value2    Source {@link }.
                 * @param   {number}                 amount    Weighting value.
                 * @return  {Humper.Base.Vector2}              Cubic interpolation of the specified vectors.
                 */
                SmoothStep: function (value1, value2, amount) {
                    return new Humper.Base.Vector2.$ctor2(Humper.Base.Maths.SmoothStep(value1.X, value2.X, amount), Humper.Base.Maths.SmoothStep(value1.Y, value2.Y, amount));
                },
                /**
                 * Creates a new {@link } that contains cubic interpolation of the specified vectors.
                 *
                 * @static
                 * @public
                 * @this Humper.Base.Vector2
                 * @memberof Humper.Base.Vector2
                 * @param   {Humper.Base.Vector2}    value1    Source {@link }.
                 * @param   {Humper.Base.Vector2}    value2    Source {@link }.
                 * @param   {number}                 amount    Weighting value.
                 * @param   {Humper.Base.Vector2}    result    Cubic interpolation of the specified vectors as an output parameter.
                 * @return  {void}
                 */
                SmoothStep$1: function (value1, value2, amount, result) {
                    result.v.X = Humper.Base.Maths.SmoothStep(value1.v.X, value2.v.X, amount);
                    result.v.Y = Humper.Base.Maths.SmoothStep(value1.v.Y, value2.v.Y, amount);
                },
                /**
                 * Creates a new {@link } that contains subtraction of on {@link } from a another.
                 *
                 * @static
                 * @public
                 * @this Humper.Base.Vector2
                 * @memberof Humper.Base.Vector2
                 * @param   {Humper.Base.Vector2}    value1    Source {@link }.
                 * @param   {Humper.Base.Vector2}    value2    Source {@link }.
                 * @return  {Humper.Base.Vector2}              The result of the vector subtraction.
                 */
                Subtract: function (value1, value2) {
                    value1.X -= value2.X;
                    value1.Y -= value2.Y;
                    return value1.$clone();
                },
                /**
                 * Creates a new {@link } that contains subtraction of on {@link } from a another.
                 *
                 * @static
                 * @public
                 * @this Humper.Base.Vector2
                 * @memberof Humper.Base.Vector2
                 * @param   {Humper.Base.Vector2}    value1    Source {@link }.
                 * @param   {Humper.Base.Vector2}    value2    Source {@link }.
                 * @param   {Humper.Base.Vector2}    result    The result of the vector subtraction as an output parameter.
                 * @return  {void}
                 */
                Subtract$1: function (value1, value2, result) {
                    result.v.X = value1.v.X - value2.v.X;
                    result.v.Y = value1.v.Y - value2.v.Y;
                }/**
                 * Inverts values in the specified {@link }.
                 *
                 * @static
                 * @public
                 * @this Humper.Base.Vector2
                 * @memberof Humper.Base.Vector2
                 * @param   {Humper.Base.Vector2}    value    Source {@link } on the right of the sub sign.
                 * @return  {Humper.Base.Vector2}             Result of the inversion.
                 */
                ,
                op_UnaryNegation: function (value) {
                    value.X = -value.X;
                    value.Y = -value.Y;
                    return value.$clone();
                }/**
                 * Adds two vectors.
                 *
                 * @static
                 * @public
                 * @this Humper.Base.Vector2
                 * @memberof Humper.Base.Vector2
                 * @param   {Humper.Base.Vector2}    value1    Source {@link } on the left of the add sign.
                 * @param   {Humper.Base.Vector2}    value2    Source {@link } on the right of the add sign.
                 * @return  {Humper.Base.Vector2}              Sum of the vectors.
                 */
                ,
                op_Addition: function (value1, value2) {
                    value1.X += value2.X;
                    value1.Y += value2.Y;
                    return value1.$clone();
                }/**
                 * Subtracts a {@link } from a {@link }.
                 *
                 * @static
                 * @public
                 * @this Humper.Base.Vector2
                 * @memberof Humper.Base.Vector2
                 * @param   {Humper.Base.Vector2}    value1    Source {@link } on the left of the sub sign.
                 * @param   {Humper.Base.Vector2}    value2    Source {@link } on the right of the sub sign.
                 * @return  {Humper.Base.Vector2}              Result of the vector subtraction.
                 */
                ,
                op_Subtraction: function (value1, value2) {
                    value1.X -= value2.X;
                    value1.Y -= value2.Y;
                    return value1.$clone();
                }/**
                 * Multiplies the components of two vectors by each other.
                 *
                 * @static
                 * @public
                 * @this Humper.Base.Vector2
                 * @memberof Humper.Base.Vector2
                 * @param   {Humper.Base.Vector2}    value1    Source {@link } on the left of the mul sign.
                 * @param   {Humper.Base.Vector2}    value2    Source {@link } on the right of the mul sign.
                 * @return  {Humper.Base.Vector2}              Result of the vector multiplication.
                 */
                ,
                op_Multiply: function (value1, value2) {
                    value1.X *= value2.X;
                    value1.Y *= value2.Y;
                    return value1.$clone();
                }/**
                 * Multiplies the components of vector by a scalar.
                 *
                 * @static
                 * @public
                 * @this Humper.Base.Vector2
                 * @memberof Humper.Base.Vector2
                 * @param   {Humper.Base.Vector2}    value          Source {@link } on the left of the mul sign.
                 * @param   {number}                 scaleFactor    Scalar value on the right of the mul sign.
                 * @return  {Humper.Base.Vector2}                   Result of the vector multiplication with a scalar.
                 */
                ,
                op_Multiply$1: function (value, scaleFactor) {
                    value.X *= scaleFactor;
                    value.Y *= scaleFactor;
                    return value.$clone();
                }/**
                 * Multiplies the components of vector by a scalar.
                 *
                 * @static
                 * @public
                 * @this Humper.Base.Vector2
                 * @memberof Humper.Base.Vector2
                 * @param   {number}                 scaleFactor    Scalar value on the left of the mul sign.
                 * @param   {Humper.Base.Vector2}    value          Source {@link } on the right of the mul sign.
                 * @return  {Humper.Base.Vector2}                   Result of the vector multiplication with a scalar.
                 */
                ,
                op_Multiply$2: function (scaleFactor, value) {
                    value.X *= scaleFactor;
                    value.Y *= scaleFactor;
                    return value.$clone();
                }/**
                 * Divides the components of a {@link } by the components of another {@link }.
                 *
                 * @static
                 * @public
                 * @this Humper.Base.Vector2
                 * @memberof Humper.Base.Vector2
                 * @param   {Humper.Base.Vector2}    value1    Source {@link } on the left of the div sign.
                 * @param   {Humper.Base.Vector2}    value2    Divisor {@link } on the right of the div sign.
                 * @return  {Humper.Base.Vector2}              The result of dividing the vectors.
                 */
                ,
                op_Division: function (value1, value2) {
                    value1.X /= value2.X;
                    value1.Y /= value2.Y;
                    return value1.$clone();
                }/**
                 * Divides the components of a {@link } by a scalar.
                 *
                 * @static
                 * @public
                 * @this Humper.Base.Vector2
                 * @memberof Humper.Base.Vector2
                 * @param   {Humper.Base.Vector2}    value1     Source {@link } on the left of the div sign.
                 * @param   {number}                 divider    Divisor scalar on the right of the div sign.
                 * @return  {Humper.Base.Vector2}               The result of dividing a vector by a scalar.
                 */
                ,
                op_Division$1: function (value1, divider) {
                    var factor = 1 / divider;
                    value1.X *= factor;
                    value1.Y *= factor;
                    return value1.$clone();
                }/**
                 * Compares whether two {@link } instances are equal.
                 *
                 * @static
                 * @public
                 * @this Humper.Base.Vector2
                 * @memberof Humper.Base.Vector2
                 * @param   {Humper.Base.Vector2}    value1    {@link } instance on the left of the equal sign.
                 * @param   {Humper.Base.Vector2}    value2    {@link } instance on the right of the equal sign.
                 * @return  {boolean}                          <pre><code>true</code></pre> if the instances are equal; <pre><code>false</code></pre> otherwise.
                 */
                ,
                op_Equality: function (value1, value2) {
                    return value1.X === value2.X && value1.Y === value2.Y;
                }/**
                 * Compares whether two {@link } instances are not equal.
                 *
                 * @static
                 * @public
                 * @this Humper.Base.Vector2
                 * @memberof Humper.Base.Vector2
                 * @param   {Humper.Base.Vector2}    value1    {@link } instance on the left of the not equal sign.
                 * @param   {Humper.Base.Vector2}    value2    {@link } instance on the right of the not equal sign.
                 * @return  {boolean}                          <pre><code>true</code></pre> if the instances are not equal; <pre><code>false</code></pre> otherwise.
                 */
                ,
                op_Inequality: function (value1, value2) {
                    return value1.X !== value2.X || value1.Y !== value2.Y;
                },
                getDefaultValue: function () { return new Humper.Base.Vector2(); }
            }
        },
        fields: {
            /**
             * The x coordinate of this {@link }.
             *
             * @instance
             * @public
             * @memberof Humper.Base.Vector2
             * @type number
             */
            X: 0,
            /**
             * The y coordinate of this {@link }.
             *
             * @instance
             * @public
             * @memberof Humper.Base.Vector2
             * @type number
             */
            Y: 0
        },
        props: {
            DebugDisplayString: {
                get: function () {
                    return System.String.concat(System.Single.format(this.X), "  ", System.Single.format(this.Y));
                }
            }
        },
        alias: ["equalsT", "System$IEquatable$1$Humper$Base$Vector2$equalsT"],
        ctors: {
            /**
             * Constructs a 2d vector with X and Y from two values.
             *
             * @instance
             * @public
             * @this Humper.Base.Vector2
             * @memberof Humper.Base.Vector2
             * @param   {number}    x    The x coordinate in 2d-space.
             * @param   {number}    y    The y coordinate in 2d-space.
             * @return  {void}
             */
            $ctor2: function (x, y) {
                this.$initialize();
                this.X = x;
                this.Y = y;
            },
            /**
             * Constructs a 2d vector with X and Y set to the same value.
             *
             * @instance
             * @public
             * @this Humper.Base.Vector2
             * @memberof Humper.Base.Vector2
             * @param   {number}    value    The x and y coordinates in 2d-space.
             * @return  {void}
             */
            $ctor1: function (value) {
                this.$initialize();
                this.X = value;
                this.Y = value;
            },
            ctor: function () {
                this.$initialize();
            }
        },
        methods: {
            /**
             * Compares whether current instance is equal to specified {@link }.
             *
             * @instance
             * @public
             * @override
             * @this Humper.Base.Vector2
             * @memberof Humper.Base.Vector2
             * @param   {System.Object}    obj    The {@link } to compare.
             * @return  {boolean}                 <pre><code>true</code></pre> if the instances are equal; <pre><code>false</code></pre> otherwise.
             */
            equals: function (obj) {
                if (Bridge.is(obj, Humper.Base.Vector2)) {
                    return this.equalsT(System.Nullable.getValue(Bridge.cast(Bridge.unbox(obj), Humper.Base.Vector2)));
                }

                return false;
            },
            /**
             * Compares whether current instance is equal to specified {@link }.
             *
             * @instance
             * @public
             * @this Humper.Base.Vector2
             * @memberof Humper.Base.Vector2
             * @param   {Humper.Base.Vector2}    other    The {@link } to compare.
             * @return  {boolean}                         <pre><code>true</code></pre> if the instances are equal; <pre><code>false</code></pre> otherwise.
             */
            equalsT: function (other) {
                return (this.X === other.X) && (this.Y === other.Y);
            },
            /**
             * Gets the hash code of this {@link }.
             *
             * @instance
             * @public
             * @override
             * @this Humper.Base.Vector2
             * @memberof Humper.Base.Vector2
             * @return  {number}        Hash code of this {@link }.
             */
            getHashCode: function () {
                return ((System.Single.getHashCode(this.X) + System.Single.getHashCode(this.Y)) | 0);
            },
            /**
             * Returns the length of this {@link }.
             *
             * @instance
             * @public
             * @this Humper.Base.Vector2
             * @memberof Humper.Base.Vector2
             * @return  {number}        The length of this {@link }.
             */
            Length: function () {
                return Math.sqrt((this.X * this.X) + (this.Y * this.Y));
            },
            /**
             * Returns the squared length of this {@link }.
             *
             * @instance
             * @public
             * @this Humper.Base.Vector2
             * @memberof Humper.Base.Vector2
             * @return  {number}        The squared length of this {@link }.
             */
            LengthSquared: function () {
                return (this.X * this.X) + (this.Y * this.Y);
            },
            /**
             * Turns this {@link } to a unit vector with the same direction.
             *
             * @instance
             * @public
             * @this Humper.Base.Vector2
             * @memberof Humper.Base.Vector2
             * @return  {void}
             */
            Normalize: function () {
                var val = 1.0 / Math.sqrt((this.X * this.X) + (this.Y * this.Y));
                this.X *= val;
                this.Y *= val;
            },
            /**
             * Returns a {@link } representation of this {@link } in the format:
             {X:[{@link }] Y:[{@link }]}
             *
             * @instance
             * @public
             * @override
             * @this Humper.Base.Vector2
             * @memberof Humper.Base.Vector2
             * @return  {string}        A {@link } representation of this {@link }.
             */
            toString: function () {
                return "{X:" + System.Single.format(this.X) + " Y:" + System.Single.format(this.Y) + "}";
            },
            $clone: function (to) {
                var s = to || new Humper.Base.Vector2();
                s.X = this.X;
                s.Y = this.Y;
                return s;
            }
        }
    });

    /** @namespace Humper */

    /**
     * Represents a physical body in the world.
     *
     * @abstract
     * @public
     * @class Humper.IBox
     */
    Bridge.define("Humper.IBox", {
        $kind: "interface"
    });

    Bridge.define("Humper.ICollision", {
        $kind: "interface"
    });

    /**
     * Basic spacial hashing of world's boxes.
     *
     * @public
     * @class Humper.Grid
     */
    Bridge.define("Humper.Grid", {
        fields: {
            CellSize: 0,
            Cells: null
        },
        props: {
            Width: {
                get: function () {
                    return this.Columns * this.CellSize;
                }
            },
            Height: {
                get: function () {
                    return this.Rows * this.CellSize;
                }
            },
            Columns: {
                get: function () {
                    return System.Array.getLength(this.Cells, 0);
                }
            },
            Rows: {
                get: function () {
                    return System.Array.getLength(this.Cells, 1);
                }
            }
        },
        ctors: {
            ctor: function (width, height, cellSize) {
                this.$initialize();
                this.Cells = System.Array.create(null, null, Humper.Grid.Cell, width, height);
                this.CellSize = cellSize;
            }
        },
        methods: {
            QueryCells: function (x, y, w, h) {
                var minX = Bridge.Int.clip32(x / this.CellSize);
                var minY = Bridge.Int.clip32(y / this.CellSize);
                var maxX = (Bridge.Int.clip32(((x + w - 1) / this.CellSize)) + 1) | 0;
                var maxY = (Bridge.Int.clip32(((y + h - 1) / this.CellSize)) + 1) | 0;

                minX = Math.max(0, minX);
                minY = Math.max(0, minY);
                maxX = Math.min(((this.Columns - 1) | 0), maxX);
                maxY = Math.min(((this.Rows - 1) | 0), maxY);

                var result = new (System.Collections.Generic.List$1(Humper.Grid.Cell)).ctor();

                for (var ix = minX; ix <= maxX; ix = (ix + 1) | 0) {
                    for (var iy = minY; iy <= maxY; iy = (iy + 1) | 0) {
                        var cell = this.Cells.get([ix, iy]);

                        if (cell == null) {
                            cell = new Humper.Grid.Cell(ix, iy, this.CellSize);
                            this.Cells.set([ix, iy], cell);
                        }

                        result.add(cell);
                    }
                }

                return result;

            },
            QueryBoxes: function (x, y, w, h) {
                var cells = this.QueryCells(x, y, w, h);

                return System.Linq.Enumerable.from(cells).selectMany(function (cell) {
                        return cell.Children;
                    }).distinct();
            },
            Add: function (box) {
                var $t;
                var cells = this.QueryCells(box.Humper$IBox$X, box.Humper$IBox$Y, box.Humper$IBox$Width, box.Humper$IBox$Height);

                $t = Bridge.getEnumerator(cells, Humper.Grid.Cell);
                try {
                    while ($t.moveNext()) {
                        var cell = $t.Current;
                        if (!cell.Contains(box)) {
                            cell.Add(box);
                        }
                    }
                } finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$dispose();
                    }
                }},
            Update: function (box, from) {
                var $t;
                var fromCells = this.QueryCells(from.X, from.Y, from.Width, from.Height);
                var removed = false;
                $t = Bridge.getEnumerator(fromCells, Humper.Grid.Cell);
                try {
                    while ($t.moveNext()) {
                        var cell = $t.Current;
                        removed = !!(removed | cell.Remove(box));
                    }
                } finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$dispose();
                    }
                }
                if (removed) {
                    this.Add(box);
                }
            },
            Remove: function (box) {
                var $t;
                var cells = this.QueryCells(box.Humper$IBox$X, box.Humper$IBox$Y, box.Humper$IBox$Width, box.Humper$IBox$Height);

                var removed = false;
                $t = Bridge.getEnumerator(cells, Humper.Grid.Cell);
                try {
                    while ($t.moveNext()) {
                        var cell = $t.Current;
                        removed = !!(removed | cell.Remove(box));
                    }
                } finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$dispose();
                    }
                }
                return removed;
            },
            toString: function () {
                return System.String.format("[Grid: Width={0}, Height={1}, Columns={2}, Rows={3}]", Bridge.box(this.Width, System.Single, System.Single.format, System.Single.getHashCode), Bridge.box(this.Height, System.Single, System.Single.format, System.Single.getHashCode), Bridge.box(this.Columns, System.Int32), Bridge.box(this.Rows, System.Int32));
            }
        }
    });

    Bridge.define("Humper.Grid.Cell", {
        $kind: "nested class",
        fields: {
            Bounds: null,
            children: null
        },
        props: {
            Children: {
                get: function () {
                    return this.children;
                }
            }
        },
        ctors: {
            init: function () {
                this.Bounds = new Humper.Base.RectangleF();
                this.children = new (System.Collections.Generic.List$1(Humper.IBox)).ctor();
            },
            ctor: function (x, y, cellSize) {
                this.$initialize();
                this.Bounds = new Humper.Base.RectangleF.$ctor3(x * cellSize, y * cellSize, cellSize, cellSize);
            }
        },
        methods: {
            Add: function (box) {
                this.children.add(box);
            },
            Contains: function (box) {
                return this.children.contains(box);
            },
            Remove: function (box) {
                return this.children.remove(box);
            },
            Count: function () {
                return this.children.Count;
            }
        }
    });

    /**
     * Represents a hit point out of a collision.
     *
     * @abstract
     * @public
     * @class Humper.IHit
     */
    Bridge.define("Humper.IHit", {
        $kind: "interface"
    });

    Bridge.define("Humper.IMovement", {
        $kind: "interface"
    });

    /**
     * Represents a physical world that contains AABB box colliding bodies.
     *
     * @abstract
     * @public
     * @class Humper.IWorld
     */
    Bridge.define("Humper.IWorld", {
        $kind: "interface"
    });

    /** @namespace Humper.Responses */

    /**
     * The result of a collision reaction onto a box position.
     *
     * @abstract
     * @public
     * @class Humper.Responses.ICollisionResponse
     */
    Bridge.define("Humper.Responses.ICollisionResponse", {
        $kind: "interface"
    });

    Bridge.define("Humper.Responses.CollisionResponses", {
        $kind: "enum",
        statics: {
            fields: {
                None: 0,
                Touch: 1,
                Cross: 2,
                Slide: 3,
                Bounce: 4
            }
        }
    });

    Bridge.define("JuiceBoxEngine.Graphics.Debugging.DebugRenderer", {
        statics: {
            fields: {
                _instance: null
            },
            props: {
                Instance: {
                    get: function () {
                        if (JuiceBoxEngine.Graphics.Debugging.DebugRenderer._instance == null) {
                            JuiceBoxEngine.Graphics.Debugging.DebugRenderer._instance = new JuiceBoxEngine.Graphics.Debugging.DebugRenderer();
                        }
                        return JuiceBoxEngine.Graphics.Debugging.DebugRenderer._instance;
                    }
                }
            }
        },
        fields: {
            /**
             * The debug renderer has his own resrouce manager.
             *
             * @instance
             * @private
             * @memberof JuiceBoxEngine.Graphics.Debugging.DebugRenderer
             * @type JuiceBoxEngine.Resources.ResourceManager
             */
            _manager: null,
            _lines: null
        },
        ctors: {
            /**
             * Private contructor.
             *
             * @instance
             * @private
             * @this JuiceBoxEngine.Graphics.Debugging.DebugRenderer
             * @memberof JuiceBoxEngine.Graphics.Debugging.DebugRenderer
             * @return  {void}
             */
            ctor: function () {
                this.$initialize();
                // Create a own loader for the debug renderer.
                this._manager = new JuiceBoxEngine.Resources.ResourceManager();
                this._manager.RegisterResourceManager(new JuiceBoxEngine.Graphics.ShaderResourceLoader("DebugLoader", "vert"));
                this._manager.RegisterResourceManager(new JuiceBoxEngine.Graphics.ShaderResourceLoader("DebugLoader", "frag"));

                this._lines = new (System.Collections.Generic.List$1(JuiceBoxEngine.Graphics.Debugging.DebugRenderer.Line)).ctor();
            }
        },
        methods: {
            /**
             * Draws a rectangle in world space for debugging purposes.
             *
             * @instance
             * @public
             * @this JuiceBoxEngine.Graphics.Debugging.DebugRenderer
             * @memberof JuiceBoxEngine.Graphics.Debugging.DebugRenderer
             * @param   {JuiceBoxEngine.Math.Rectangle}    rect     The rectangle to draw.
             * @param   {JuiceBoxEngine.Math.Color32}      color    The color of the lines.
             * @param   {number}                           width    Width of the lines.
             * @return  {void}
             */
            DrawRect: function (rect, color, width) {
                this.DrawLine(new JuiceBoxEngine.Math.Vector2.$ctor2(rect.X, rect.Y), new JuiceBoxEngine.Math.Vector2.$ctor2(((rect.X + rect.Width) | 0), rect.Y), color.$clone(), width);
                this.DrawLine(new JuiceBoxEngine.Math.Vector2.$ctor2(rect.X, rect.Y), new JuiceBoxEngine.Math.Vector2.$ctor2(rect.X, ((rect.Y + rect.Height) | 0)), color.$clone(), width);
                this.DrawLine(new JuiceBoxEngine.Math.Vector2.$ctor2(rect.X, ((rect.Y + rect.Height) | 0)), new JuiceBoxEngine.Math.Vector2.$ctor2(((rect.X + rect.Width) | 0), ((rect.Y + rect.Height) | 0)), color.$clone(), width);
                this.DrawLine(new JuiceBoxEngine.Math.Vector2.$ctor2(((rect.X + rect.Width) | 0), rect.Y), new JuiceBoxEngine.Math.Vector2.$ctor2(((rect.X + rect.Width) | 0), ((rect.Y + rect.Height) | 0)), color.$clone(), width);
            },
            /**
             * Draws a straight line between two points in world space for debugging purposes.
             *
             * @instance
             * @public
             * @this JuiceBoxEngine.Graphics.Debugging.DebugRenderer
             * @memberof JuiceBoxEngine.Graphics.Debugging.DebugRenderer
             * @param   {JuiceBoxEngine.Math.Vector2}    start    The starting point.
             * @param   {JuiceBoxEngine.Math.Vector2}    end      The end point.
             * @param   {JuiceBoxEngine.Math.Color32}    color    Color of the line.
             * @param   {number}                         width    Width of the line.
             * @return  {void}
             */
            DrawLine: function (start, end, color, width) {
                if (width === void 0) { width = 1.0; }
                var line = new JuiceBoxEngine.Graphics.Debugging.DebugRenderer.Line.$ctor1(start.$clone(), end.$clone(), color.$clone(), width);
                line.command.Program = Bridge.as(this._manager.Load$1("Shaders/Debug.vert"), JuiceBoxEngine.Graphics.ShaderProgram);

                var direction = (JuiceBoxEngine.Math.Vector2.op_Subtraction(end.$clone(), start.$clone()));
                var perpendicular = new JuiceBoxEngine.Math.Vector2.$ctor2(direction.Y, -direction.X);
                perpendicular.Normalize();

                var hWidth = width / 2.0;

                var data = System.Array.init([start.X + (perpendicular.X * hWidth), start.Y + (perpendicular.Y * hWidth), 0.0, end.X + (perpendicular.X * hWidth), end.Y + (perpendicular.Y * hWidth), 0.0, start.X - (perpendicular.X * hWidth), start.Y - (perpendicular.Y * hWidth), 0.0, end.X + (perpendicular.X * hWidth), end.Y + (perpendicular.Y * hWidth), 0.0, end.X - (perpendicular.X * hWidth), end.Y - (perpendicular.Y * hWidth), 0.0, start.X - (perpendicular.X * hWidth), start.Y - (perpendicular.Y * hWidth), 0.0], System.Single);

                line.command.VertexBuffer = new JuiceBoxEngine.Graphics.VertexBuffer.$ctor1(data);
                line.command.VertexBuffer.SetAttribute(new JuiceBoxEngine.Graphics.VertexAttribute.$ctor1("a_pos", 3, false, 12, 0));
                line.command.Data.add("u_color", color.$clone());
                this._lines.add(line.$clone());
            },
            /**
             * Render all called debug calls.
             *
             * @instance
             * @public
             * @this JuiceBoxEngine.Graphics.Debugging.DebugRenderer
             * @memberof JuiceBoxEngine.Graphics.Debugging.DebugRenderer
             * @return  {void}
             */
            Render: function () {
                var $t;
                var context = JuiceBoxEngine.Graphics.GraphicsManager.Instance.Context;
                context.UseDepth(false);

                $t = Bridge.getEnumerator(this._lines);
                try {
                    while ($t.moveNext()) {
                        var l = $t.Current.$clone();
                        context.Command(l.command);
                        l.command.VertexBuffer.dispose();
                    }
                } finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$dispose();
                    }
                }
                this._lines.clear();

                context.UseDepth(true);
            }
        }
    });

    /** @namespace JuiceBoxEngine.Graphics.Debugging */

    /**
     * Line object, for storing calls to the Debug Renderer.
     *
     * @private
     * @class JuiceBoxEngine.Graphics.Debugging.DebugRenderer.Line
     */
    Bridge.define("JuiceBoxEngine.Graphics.Debugging.DebugRenderer.Line", {
        $kind: "nested struct",
        statics: {
            methods: {
                getDefaultValue: function () { return new JuiceBoxEngine.Graphics.Debugging.DebugRenderer.Line(); }
            }
        },
        fields: {
            start: null,
            end: null,
            color: null,
            width: 0,
            command: null
        },
        ctors: {
            init: function () {
                this.start = new JuiceBoxEngine.Math.Vector2();
                this.end = new JuiceBoxEngine.Math.Vector2();
                this.color = new JuiceBoxEngine.Math.Color32();
            },
            $ctor1: function (start, end, color, width) {
                this.$initialize();
                this.start = start.$clone();
                this.end = end.$clone();
                this.color = color.$clone();
                this.width = width;

                this.command = new JuiceBoxEngine.Graphics.GraphicsCommand();
            },
            ctor: function () {
                this.$initialize();
            }
        },
        methods: {
            getHashCode: function () {
                var h = Bridge.addHash([1701734732, this.start, this.end, this.color, this.width, this.command]);
                return h;
            },
            equals: function (o) {
                if (!Bridge.is(o, JuiceBoxEngine.Graphics.Debugging.DebugRenderer.Line)) {
                    return false;
                }
                return Bridge.equals(this.start, o.start) && Bridge.equals(this.end, o.end) && Bridge.equals(this.color, o.color) && Bridge.equals(this.width, o.width) && Bridge.equals(this.command, o.command);
            },
            $clone: function (to) {
                var s = to || new JuiceBoxEngine.Graphics.Debugging.DebugRenderer.Line();
                s.start = this.start.$clone();
                s.end = this.end.$clone();
                s.color = this.color.$clone();
                s.width = this.width;
                s.command = this.command;
                return s;
            }
        }
    });

    /** @namespace JuiceBoxEngine.Graphics */

    /**
     * Default shader values for usage in the shader.
     *
     * @public
     * @class JuiceBoxEngine.Graphics.DefaultShaderValues
     */
    Bridge.define("JuiceBoxEngine.Graphics.DefaultShaderValues", {
        $kind: "enum",
        statics: {
            fields: {
                /**
                 * The time in seconds of type {@link }
                 *
                 * @static
                 * @public
                 * @memberof JuiceBoxEngine.Graphics.DefaultShaderValues
                 * @constant
                 * @default 0
                 * @type JuiceBoxEngine.Graphics.DefaultShaderValues
                 */
                TIME: 0,
                /**
                 * The time since last frame. Type: {@link }
                 *
                 * @static
                 * @public
                 * @memberof JuiceBoxEngine.Graphics.DefaultShaderValues
                 * @constant
                 * @default 1
                 * @type JuiceBoxEngine.Graphics.DefaultShaderValues
                 */
                DELTATIME: 1,
                /**
                 * The position of the mouse ranging [0-1] on both axis of type {@link }
                 *
                 * @static
                 * @public
                 * @memberof JuiceBoxEngine.Graphics.DefaultShaderValues
                 * @constant
                 * @default 2
                 * @type JuiceBoxEngine.Graphics.DefaultShaderValues
                 */
                MOUSEPOS: 2,
                /**
                 * The current world matrix. Type: {@link }
                 *
                 * @static
                 * @public
                 * @memberof JuiceBoxEngine.Graphics.DefaultShaderValues
                 * @constant
                 * @default 3
                 * @type JuiceBoxEngine.Graphics.DefaultShaderValues
                 */
                WORLD: 3,
                /**
                 * The current view matrix. Type: {@link }
                 *
                 * @static
                 * @public
                 * @memberof JuiceBoxEngine.Graphics.DefaultShaderValues
                 * @constant
                 * @default 4
                 * @type JuiceBoxEngine.Graphics.DefaultShaderValues
                 */
                VIEW: 4,
                /**
                 * The current projection matrix. Type: {@link }
                 *
                 * @static
                 * @public
                 * @memberof JuiceBoxEngine.Graphics.DefaultShaderValues
                 * @constant
                 * @default 5
                 * @type JuiceBoxEngine.Graphics.DefaultShaderValues
                 */
                PROJ: 5,
                /**
                 * Size of the canvas. Type: {@link }
                 *
                 * @static
                 * @public
                 * @memberof JuiceBoxEngine.Graphics.DefaultShaderValues
                 * @constant
                 * @default 6
                 * @type JuiceBoxEngine.Graphics.DefaultShaderValues
                 */
                CANVASSIZE: 6,
                /**
                 * Current size of the viewport. Type: {@link }
                 *
                 * @static
                 * @public
                 * @memberof JuiceBoxEngine.Graphics.DefaultShaderValues
                 * @constant
                 * @default 7
                 * @type JuiceBoxEngine.Graphics.DefaultShaderValues
                 */
                VIEWPORTSIZE: 7,
                /**
                 * Current position of the camera. Type: {@link }
                 *
                 * @static
                 * @public
                 * @memberof JuiceBoxEngine.Graphics.DefaultShaderValues
                 * @constant
                 * @default 8
                 * @type JuiceBoxEngine.Graphics.DefaultShaderValues
                 */
                CAMERAPOSITION: 8
            }
        }
    });

    Bridge.define("JuiceBoxEngine.Resources.IResource", {
        $kind: "interface"
    });

    Bridge.define("JuiceBoxEngine.Resources.ResourceLoader", {
        fields: {
            Extension: null,
            Name: null
        },
        ctors: {
            ctor: function (name, extension) {
                this.$initialize();
                this.Extension = extension;
                this.Name = name;
            }
        }
    });

    Bridge.define("JuiceBoxEngine.Graphics.GraphicsCommand", {
        fields: {
            /**
             * The shader to use.
             *
             * @instance
             * @public
             * @memberof JuiceBoxEngine.Graphics.GraphicsCommand
             * @function Program
             * @type JuiceBoxEngine.Graphics.ShaderProgram
             */
            Program: null,
            /**
             * The vertexbuffer to use.
             *
             * @instance
             * @public
             * @memberof JuiceBoxEngine.Graphics.GraphicsCommand
             * @function VertexBuffer
             * @type JuiceBoxEngine.Graphics.VertexBuffer
             */
            VertexBuffer: null,
            /**
             * The world matrix to use.
             *
             * @instance
             * @public
             * @memberof JuiceBoxEngine.Graphics.GraphicsCommand
             * @function WorldMatrix
             * @type JuiceBoxEngine.Math.Matrix4
             */
            WorldMatrix: null,
            /**
             * Extra data for the shader.
             *
             * @instance
             * @public
             * @memberof JuiceBoxEngine.Graphics.GraphicsCommand
             * @function Data
             * @type System.Collections.Generic.Dictionary$2
             */
            Data: null
        },
        ctors: {
            init: function () {
                this.WorldMatrix = new JuiceBoxEngine.Math.Matrix4();
            },
            /**
             * Default constructor.
             *
             * @instance
             * @public
             * @this JuiceBoxEngine.Graphics.GraphicsCommand
             * @memberof JuiceBoxEngine.Graphics.GraphicsCommand
             * @return  {void}
             */
            ctor: function () {
                this.$initialize();
                this.Data = new (System.Collections.Generic.Dictionary$2(System.String,System.Object))();
                this.WorldMatrix = new JuiceBoxEngine.Math.Matrix4.$ctor1(1.0);
                this.VertexBuffer = null;
                this.Program = null;
            }
        }
    });

    Bridge.define("JuiceBoxEngine.Scene.IComponent", {
        $kind: "interface"
    });

    /**
     * Responsible for all rendering calls to WebGL.
     *
     * @public
     * @class JuiceBoxEngine.Graphics.GraphicsContext
     */
    Bridge.define("JuiceBoxEngine.Graphics.GraphicsContext", {
        fields: {
            /**
             * The GL context for a canvas.
             *
             * @instance
             * @private
             * @memberof JuiceBoxEngine.Graphics.GraphicsContext
             * @type Bridge.WebGL.WebGLRenderingContext
             */
            _gl: null,
            /**
             * The canvas to render to.
             *
             * @instance
             * @private
             * @memberof JuiceBoxEngine.Graphics.GraphicsContext
             * @type HTMLCanvasElement
             */
            _canvas: null,
            /**
             * The default shader values.
             *
             * @instance
             * @private
             * @memberof JuiceBoxEngine.Graphics.GraphicsContext
             * @type System.Collections.Generic.Dictionary$2
             */
            _shaderValues: null,
            _textureCount: 0
        },
        ctors: {
            /**
             * Constructor. Initializes GL context.
             *
             * @instance
             * @public
             * @this JuiceBoxEngine.Graphics.GraphicsContext
             * @memberof JuiceBoxEngine.Graphics.GraphicsContext
             * @param   {HTMLCanvasElement}    canvas
             * @return  {void}
             */
            ctor: function (canvas) {
                this.$initialize();
                this._canvas = canvas;
                this._gl = this.GetContext(canvas);

                if (this._gl == null) {
                    System.Console.WriteLine("Unable to initialize WebGL context!");
                } else {
                    System.Console.WriteLine("Initialized WebGL!");
                }

                this._shaderValues = new (System.Collections.Generic.Dictionary$2(JuiceBoxEngine.Graphics.DefaultShaderValues,System.Object))();

                this._gl.enable(this._gl.BLEND);
                this._gl.blendFunc(this._gl.SRC_ALPHA, this._gl.ONE_MINUS_SRC_ALPHA);
                this._gl.enable(this._gl.DEPTH_TEST);
            }
        },
        methods: {
            /**
             * Gets the WebGL context.
             *
             * @instance
             * @private
             * @this JuiceBoxEngine.Graphics.GraphicsContext
             * @memberof JuiceBoxEngine.Graphics.GraphicsContext
             * @param   {HTMLCanvasElement}                     canvas    The canvas to get the context on.
             * @return  {Bridge.WebGL.WebGLRenderingContext}              A {@link } or null if it fails.
             */
            GetContext: function (canvas) {
                var $t;
                var context = null;

                var names = System.Array.init(["webgl", "experimental-webgl", "webkit-3d", "moz-webgl"], System.String);

                $t = Bridge.getEnumerator(names);
                try {
                    while ($t.moveNext()) {
                        var name = $t.Current;
                        try {
                            context = canvas.getContext(name);
                        }
                        catch (ex) {
                            ex = System.Exception.create(ex);
                            System.Console.WriteLine(ex);
                        }

                        if (context != null) {
                            break;
                        }
                    }
                } finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$dispose();
                    }
                }
                return context;
            },
            /**
             * Clear the currently bound framebuffer and depth buffer.
             *
             * @instance
             * @public
             * @this JuiceBoxEngine.Graphics.GraphicsContext
             * @memberof JuiceBoxEngine.Graphics.GraphicsContext
             * @param   {JuiceBoxEngine.Math.Color32}    color    The color to clear to.
             * @return  {void}
             */
            Clear: function (color) {
                this._gl.clearColor(color.R, color.G, color.B, color.A);
                this._gl.clear(this._gl.COLOR_BUFFER_BIT | this._gl.DEPTH_BUFFER_BIT);
            },
            /**
             * Get pixels of a texture.
             *
             * @instance
             * @public
             * @this JuiceBoxEngine.Graphics.GraphicsContext
             * @memberof JuiceBoxEngine.Graphics.GraphicsContext
             * @param   {JuiceBoxEngine.Graphics.Texture2D}      texture    The texture to get pixels from.
             * @param   {JuiceBoxEngine.Math.Rectangle}          rect       An rectangle representing the area of pixels to get.
             * @return  {Array.<JuiceBoxEngine.Math.Color32>}
             */
            GetPixels: function (texture, rect) {
                this._gl.bindTexture(this._gl.TEXTURE_2D, texture.Texture);

                // Create framebuffer so we can read pixels from it using glReadPixels();
                var frameBuffer = this._gl.createFramebuffer();
                this._gl.bindFramebuffer(this._gl.FRAMEBUFFER, frameBuffer);
                this._gl.framebufferTexture2D(this._gl.FRAMEBUFFER, this._gl.COLOR_ATTACHMENT0, this._gl.TEXTURE_2D, texture.Texture, 0);

                if (this._gl.checkFramebufferStatus(this._gl.FRAMEBUFFER) === this._gl.FRAMEBUFFER_COMPLETE) {
                    // Create a float array with enough space for all colors in the rect.
                    var data = new Uint8Array(Bridge.Int.mul(Bridge.Int.mul(rect.Width, rect.Height), 4));

                    this._gl.readPixels(rect.X, rect.Y, rect.Width, rect.Height, this._gl.RGBA, this._gl.UNSIGNED_BYTE, data);

                    var colors = System.Array.init(Bridge.Int.mul(rect.Width, rect.Height), function (){
                        return new JuiceBoxEngine.Math.Color32();
                    }, JuiceBoxEngine.Math.Color32);
                    for (var i = 0; i < data.length; i = (i + 1) | 0) {
                        colors[System.Array.index(i, colors)] = new JuiceBoxEngine.Math.Color32.$ctor1(data[Bridge.Int.mul(i, 4)], data[((Bridge.Int.mul(i, 4) + 1) | 0)], data[((Bridge.Int.mul(i, 4) + 2) | 0)], data[((Bridge.Int.mul(i, 4) + 3) | 0)]);
                    }

                }

                // Clean up.
                this._gl.bindFramebuffer(this._gl.FRAMEBUFFER, null);
                this._gl.deleteFramebuffer(frameBuffer);

                return null;
            },
            /**
             * Set a global shader value.
             *
             * @instance
             * @public
             * @this JuiceBoxEngine.Graphics.GraphicsContext
             * @memberof JuiceBoxEngine.Graphics.GraphicsContext
             * @param   {JuiceBoxEngine.Graphics.DefaultShaderValues}    key      
             * @param   {System.Object}                                  value
             * @return  {void}
             */
            SetGlobalShaderValue: function (key, value) {
                if (this._shaderValues.containsKey(key)) {
                    this._shaderValues.set(key, value);
                } else {
                    this._shaderValues.add(key, value);
                }
            },
            /**
             * Render a command.
             Commands need at least a valid vertexbuffer and shader program.
             *
             * @instance
             * @public
             * @this JuiceBoxEngine.Graphics.GraphicsContext
             * @memberof JuiceBoxEngine.Graphics.GraphicsContext
             * @param   {JuiceBoxEngine.Graphics.GraphicsCommand}    command    The command to render.
             * @return  {void}
             */
            Command: function (command) {
                var $t, $t1;
                // Vertexbuffers vertex count must not be 0.
                if (command.VertexBuffer.VertCount === 0) {
                    return;
                }

                // Set world matrix.
                this.SetGlobalShaderValue(JuiceBoxEngine.Graphics.DefaultShaderValues.WORLD, command.WorldMatrix.$clone());

                // Set current program.
                this._gl.useProgram(command.Program.Program);
                this._gl.bindBuffer(this._gl.ARRAY_BUFFER, command.VertexBuffer.Buffer);

                // Set vertex attribs.
                var attribs = command.VertexBuffer.Attributes;
                for (var i = 0; i < attribs.Count; i = (i + 1) | 0) {
                    var attrib = attribs.getItem(i).$clone();

                    var loc = this._gl.getAttribLocation(command.Program.Program, attrib.Name);
                    this._gl.vertexAttribPointer(loc, attrib.Components, this._gl.FLOAT, attrib.Normalize, attrib.Stride, attrib.Offset);
                    this._gl.enableVertexAttribArray(i);
                }

                this._textureCount = 0;

                // Set uniforms from command data.
                $t = Bridge.getEnumerator(command.Data);
                try {
                    while ($t.moveNext()) {
                        var kvp = $t.Current;
                        this.SetUniform(command.Program, kvp.key, kvp.value);
                    }
                } finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$dispose();
                    }
                }
                // Set default values. (matrixes, time, mousepos etc)
                $t1 = Bridge.getEnumerator(this._shaderValues);
                try {
                    while ($t1.moveNext()) {
                        var kvp1 = $t1.Current;
                        this.SetUniform(command.Program, System.Enum.toString(JuiceBoxEngine.Graphics.DefaultShaderValues, Bridge.box(kvp1.key, JuiceBoxEngine.Graphics.DefaultShaderValues, System.Enum.toStringFn(JuiceBoxEngine.Graphics.DefaultShaderValues))), kvp1.value);
                    }
                } finally {
                    if (Bridge.is($t1, System.IDisposable)) {
                        $t1.System$IDisposable$dispose();
                    }
                }
                // Draw.
                this._gl.drawArrays(this._gl.TRIANGLES, 0, command.VertexBuffer.VertCount);

                // Disbale vertex attribs.
                for (var i1 = 0; i1 < attribs.Count; i1 = (i1 + 1) | 0) {
                    this._gl.disableVertexAttribArray(i1);
                }
            },
            /**
             * Set uniform value in shader.
             *
             * @instance
             * @private
             * @this JuiceBoxEngine.Graphics.GraphicsContext
             * @memberof JuiceBoxEngine.Graphics.GraphicsContext
             * @param   {JuiceBoxEngine.Graphics.ShaderProgram}    program    The current program.
             * @param   {string}                                   name       The name (in the shader).
             * @param   {System.Object}                            value      The object to set.
             * @return  {void}
             */
            SetUniform: function (program, name, value) {
                var $t;
                if (value == null) {
                    return;
                }

                // Get the uniform location.
                var loc;
                try {
                    loc = program.Locations.get(name).location;
                }
                catch ($e1) {
                    $e1 = System.Exception.create($e1);
                    loc = this._gl.getUniformLocation(program.Program, name);
                    program.Locations.add(name, ($t = new JuiceBoxEngine.Graphics.ShaderProgram.UniformLocation(), $t.location = loc, $t));
                }

                // If no location is found, exit out of the function.
                if (loc == null) {
                    return;
                }

                // Create a set uniform delegate if it does not exist yet.
                if (!program.SetUniformFunction.containsKey(name)) {
                    this.SetUniformLocation(program, name, value);
                }

                // Call the set uniform delegate.
                program.SetUniformFunction.get(name)(loc, value);
            },
            /**
             * Set a uniform location on a program.
             Creates delegate functions for the shader program. This way calling 'is' to check types every frame is not needed anymore. (Was VERY slow on web)
             *
             * @instance
             * @private
             * @this JuiceBoxEngine.Graphics.GraphicsContext
             * @memberof JuiceBoxEngine.Graphics.GraphicsContext
             * @param   {JuiceBoxEngine.Graphics.ShaderProgram}    program    The program to add to.
             * @param   {string}                                   name       The name of the uniform.
             * @param   {System.Object}                            value      The value of the uniform.
             * @return  {void}
             */
            SetUniformLocation: function (program, name, value) {
                if (Bridge.is(value, System.Single)) {
                    program.SetUniformFunction.add(name, Bridge.fn.bind(this, function (location, val) {
                        this._gl.uniform1f(location, System.Nullable.getValue(Bridge.cast(Bridge.unbox(val), System.Single)));
                    }));
                } else if (Bridge.is(value, JuiceBoxEngine.Math.Vector2)) {
                    program.SetUniformFunction.add(name, Bridge.fn.bind(this, function (location, val) {
                        var vec = System.Nullable.getValue(Bridge.cast(Bridge.unbox(val), JuiceBoxEngine.Math.Vector2));
                        this._gl.uniform2f(location, vec.X, vec.Y);
                    }));
                } else if (Bridge.is(value, JuiceBoxEngine.Math.Vector3)) {
                    program.SetUniformFunction.add(name, Bridge.fn.bind(this, function (location, val) {
                        var vec = System.Nullable.getValue(Bridge.cast(Bridge.unbox(val), JuiceBoxEngine.Math.Vector3));
                        this._gl.uniform3f(location, vec.X, vec.Y, vec.Z);
                    }));
                } else if (Bridge.is(value, JuiceBoxEngine.Math.Vector4)) {
                    program.SetUniformFunction.add(name, Bridge.fn.bind(this, function (location, val) {
                        var vec = System.Nullable.getValue(Bridge.cast(Bridge.unbox(val), JuiceBoxEngine.Math.Vector4));
                        this._gl.uniform4f(location, vec.X, vec.Y, vec.Z, vec.W);
                    }));
                } else if (Bridge.is(value, JuiceBoxEngine.Math.Color32)) {
                    program.SetUniformFunction.add(name, Bridge.fn.bind(this, function (location, val) {
                        var vec = System.Nullable.getValue(Bridge.cast(Bridge.unbox(val), JuiceBoxEngine.Math.Color32));
                        this._gl.uniform4f(location, vec.R, vec.G, vec.B, vec.A);
                    }));
                } else if (Bridge.is(value, JuiceBoxEngine.Math.Matrix4)) {
                    program.SetUniformFunction.add(name, Bridge.fn.bind(this, function (location, val) {
                        var mat = System.Nullable.getValue(Bridge.cast(Bridge.unbox(val), JuiceBoxEngine.Math.Matrix4));

                        var dat = System.Array.init(16, 0, System.Single);
                        for (var j = 0; j < dat.length; j = (j + 1) | 0) {
                            dat[System.Array.index(j, dat)] = mat.getItem(j);
                        }
                        this._gl.uniformMatrix4fv(location, false, dat);
                    }));
                } else if (Bridge.is(value, JuiceBoxEngine.Graphics.Texture2D)) {
                    program.SetUniformFunction.add(name, Bridge.fn.bind(this, function (location, val) {
                        var texture = Bridge.cast(val, JuiceBoxEngine.Graphics.Texture2D);

                        this._gl.activeTexture(((this._gl.TEXTURE0 + this._textureCount) | 0));
                        this._gl.bindTexture(this._gl.TEXTURE_2D, texture.Texture);

                        this._gl.uniform1i(location, this._textureCount);
                        this._textureCount = (this._textureCount + 1) | 0;
                    }));
                }
            },
            /**
             * Create a OpenGL vertexbuffer.
             *
             * @instance
             * @public
             * @this JuiceBoxEngine.Graphics.GraphicsContext
             * @memberof JuiceBoxEngine.Graphics.GraphicsContext
             * @param   {Array.<number>}              _data
             * @return  {Bridge.WebGL.WebGLBuffer}
             */
            CreateVertexBuffer: function (_data) {
                var buffer = this._gl.createBuffer();
                this._gl.bindBuffer(this._gl.ARRAY_BUFFER, buffer);

                var data = new Float32Array(_data);

                this._gl.bufferData(this._gl.ARRAY_BUFFER, data, this._gl.DYNAMIC_DRAW);

                return buffer;
            },
            /**
             * Updates data in a existing VBO.
             *
             * @instance
             * @public
             * @this JuiceBoxEngine.Graphics.GraphicsContext
             * @memberof JuiceBoxEngine.Graphics.GraphicsContext
             * @param   {JuiceBoxEngine.Graphics.VertexBuffer}    buffer    
             * @param   {number}                                  offset    
             * @param   {Array.<number>}                          _data
             * @return  {void}
             */
            UpdateVertexBufferData: function (buffer, offset, _data) {
                this._gl.bindBuffer(this._gl.ARRAY_BUFFER, buffer.Buffer);
                var data = new Float32Array(_data);
                this._gl.bufferSubData(this._gl.ARRAY_BUFFER, offset, data);
            },
            /**
             * Deletes a buffer. If it was already deleted it has no effect.
             *
             * @instance
             * @public
             * @this JuiceBoxEngine.Graphics.GraphicsContext
             * @memberof JuiceBoxEngine.Graphics.GraphicsContext
             * @param   {Bridge.WebGL.WebGLBuffer}    buffer    The buffer to delete.
             * @return  {void}
             */
            DestroyBuffer: function (buffer) {
                this._gl.deleteBuffer(buffer);
            },
            /**
             * Creates a render target.
             *
             * @instance
             * @public
             * @this JuiceBoxEngine.Graphics.GraphicsContext
             * @memberof JuiceBoxEngine.Graphics.GraphicsContext
             * @param   {number}                               width      Target width.
             * @param   {number}                               height     Target Height.
             * @param   {JuiceBoxEngine.Graphics.Texture2D}    texture    The texture to use for this target.
             * @return  {Bridge.WebGL.WebGLFramebuffer}
             */
            CreateRenderTarget: function (width, height, texture) {
                // Create frame buffer.
                var frameBuffer = this._gl.createFramebuffer();
                this._gl.bindFramebuffer(this._gl.FRAMEBUFFER, frameBuffer);

                // Create depth buffer.
                var renderBuffer = this._gl.createRenderbuffer();
                this._gl.bindRenderbuffer(this._gl.RENDERBUFFER, renderBuffer);
                this._gl.renderbufferStorage(this._gl.RENDERBUFFER, this._gl.DEPTH_COMPONENT16, width, height);

                // Attach to framebuffer.
                this._gl.framebufferTexture2D(this._gl.FRAMEBUFFER, this._gl.COLOR_ATTACHMENT0, this._gl.TEXTURE_2D, texture.Texture, 0);
                this._gl.framebufferRenderbuffer(this._gl.FRAMEBUFFER, this._gl.DEPTH_ATTACHMENT, this._gl.RENDERBUFFER, renderBuffer);

                var status = this._gl.checkFramebufferStatus(this._gl.FRAMEBUFFER);

                if (status !== this._gl.FRAMEBUFFER_COMPLETE) {
                    System.Console.WriteLine("Something went wrong creating the frame buffer!");
                }

                // Clean up.
                this._gl.bindTexture(this._gl.TEXTURE_2D, null);
                this._gl.bindRenderbuffer(this._gl.RENDERBUFFER, null);
                this._gl.bindFramebuffer(this._gl.FRAMEBUFFER, null);

                return frameBuffer;
            },
            /**
             * Sets a render target to draw to.
             *
             * @instance
             * @public
             * @this JuiceBoxEngine.Graphics.GraphicsContext
             * @memberof JuiceBoxEngine.Graphics.GraphicsContext
             * @param   {JuiceBoxEngine.Graphics.RenderTarget}    target    The render target.
             * @return  {void}
             */
            SetRenderTarget: function (target) {
                // Render to backbuffer if target is null.
                if (target == null) {
                    this._gl.viewport(0, 0, this._canvas.width, this._canvas.height);
                    this._gl.bindFramebuffer(this._gl.FRAMEBUFFER, null);
                    this.SetGlobalShaderValue(JuiceBoxEngine.Graphics.DefaultShaderValues.VIEWPORTSIZE, new JuiceBoxEngine.Math.Vector2.$ctor2(this._canvas.width, this._canvas.height).$clone());
                } else {
                    this._gl.viewport(0, 0, target.Width, target.Height);
                    this._gl.bindFramebuffer(this._gl.FRAMEBUFFER, target.Target);
                    this.SetGlobalShaderValue(JuiceBoxEngine.Graphics.DefaultShaderValues.VIEWPORTSIZE, new JuiceBoxEngine.Math.Vector2.$ctor2(target.Width, target.Height).$clone());
                }

                this.SetGlobalShaderValue(JuiceBoxEngine.Graphics.DefaultShaderValues.CANVASSIZE, new JuiceBoxEngine.Math.Vector2.$ctor2(this._canvas.width, this._canvas.height).$clone());
            },
            /**
             * Create a texture, with no color.
             *
             * @instance
             * @public
             * @this JuiceBoxEngine.Graphics.GraphicsContext
             * @memberof JuiceBoxEngine.Graphics.GraphicsContext
             * @param   {number}                       width     The width of the texture.
             * @param   {number}                       height    The height of the texture.
             * @return  {Bridge.WebGL.WebGLTexture}              An OpenGL texture.
             */
            CreateTexture$1: function (width, height) {
                var texture = this._gl.createTexture();
                this._gl.bindTexture(this._gl.TEXTURE_2D, texture);

                this._gl.texParameteri(this._gl.TEXTURE_2D, this._gl.TEXTURE_MAG_FILTER, this._gl.NEAREST);
                this._gl.texParameteri(this._gl.TEXTURE_2D, this._gl.TEXTURE_MIN_FILTER, this._gl.NEAREST);
                this._gl.texParameteri(this._gl.TEXTURE_2D, this._gl.TEXTURE_WRAP_S, this._gl.CLAMP_TO_EDGE);
                this._gl.texParameteri(this._gl.TEXTURE_2D, this._gl.TEXTURE_WRAP_T, this._gl.CLAMP_TO_EDGE);

                this._gl.texImage2D(this._gl.TEXTURE_2D, 0, this._gl.RGBA, width, height, 0, this._gl.RGBA, this._gl.UNSIGNED_BYTE, null);

                this._gl.bindTexture(this._gl.TEXTURE_2D, null);

                return texture;
            },
            /**
             * Create a texture from a HTML Image element.
             *
             * @instance
             * @public
             * @this JuiceBoxEngine.Graphics.GraphicsContext
             * @memberof JuiceBoxEngine.Graphics.GraphicsContext
             * @param   {HTMLImageElement}             image    The loaded image element.
             * @return  {Bridge.WebGL.WebGLTexture}             A WebGL texture.
             */
            CreateTexture: function (image) {
                var texture = this._gl.createTexture();
                this._gl.bindTexture(this._gl.TEXTURE_2D, texture);

                // FIXME: Hardcoded texture parameters.
                this._gl.texParameteri(this._gl.TEXTURE_2D, this._gl.TEXTURE_MAG_FILTER, this._gl.NEAREST);
                this._gl.texParameteri(this._gl.TEXTURE_2D, this._gl.TEXTURE_MIN_FILTER, this._gl.NEAREST);
                this._gl.texParameteri(this._gl.TEXTURE_2D, this._gl.TEXTURE_WRAP_S, this._gl.CLAMP_TO_EDGE);
                this._gl.texParameteri(this._gl.TEXTURE_2D, this._gl.TEXTURE_WRAP_T, this._gl.CLAMP_TO_EDGE);

                this._gl.texImage2D(this._gl.TEXTURE_2D, 0, this._gl.RGBA, this._gl.RGBA, this._gl.UNSIGNED_BYTE, image);

                this._gl.bindTexture(this._gl.TEXTURE_2D, null);

                return texture;
            },
            /**
             * Create a texture from a HTML Image element.
             *
             * @instance
             * @public
             * @this JuiceBoxEngine.Graphics.GraphicsContext
             * @memberof JuiceBoxEngine.Graphics.GraphicsContext
             * @param   {number}                       width     
             * @param   {number}                       height    
             * @param   {Array.<number>}               data
             * @return  {Bridge.WebGL.WebGLTexture}              A WebGL texture.
             */
            CreateTexture$2: function (width, height, data) {
                var texture = this._gl.createTexture();
                this._gl.bindTexture(this._gl.TEXTURE_2D, texture);

                // FIXME: Hardcoded texture parameters.
                this._gl.texParameteri(this._gl.TEXTURE_2D, this._gl.TEXTURE_MAG_FILTER, this._gl.NEAREST);
                this._gl.texParameteri(this._gl.TEXTURE_2D, this._gl.TEXTURE_MIN_FILTER, this._gl.NEAREST);
                this._gl.texParameteri(this._gl.TEXTURE_2D, this._gl.TEXTURE_WRAP_S, this._gl.CLAMP_TO_EDGE);
                this._gl.texParameteri(this._gl.TEXTURE_2D, this._gl.TEXTURE_WRAP_T, this._gl.CLAMP_TO_EDGE);

                var platformData = new Uint8Array(data);

                this._gl.texImage2D(this._gl.TEXTURE_2D, 0, this._gl.RGBA, width, height, 0, this._gl.RGBA, this._gl.UNSIGNED_BYTE, platformData);

                this._gl.bindTexture(this._gl.TEXTURE_2D, null);

                return texture;
            },
            /**
             * Disable or enable depth testing.
             *
             * @instance
             * @public
             * @this JuiceBoxEngine.Graphics.GraphicsContext
             * @memberof JuiceBoxEngine.Graphics.GraphicsContext
             * @param   {boolean}    use    True to use, false to disable depth testing.
             * @return  {void}
             */
            UseDepth: function ($use) {
                if ($use) {
                    this._gl.enable(this._gl.DEPTH_TEST);
                } else {
                    this._gl.disable(this._gl.DEPTH_TEST);
                }

            },
            /**
             * Create and compile shaders to use for rendering.
             *
             * @instance
             * @public
             * @this JuiceBoxEngine.Graphics.GraphicsContext
             * @memberof JuiceBoxEngine.Graphics.GraphicsContext
             * @param   {string}                       vertSource    The vertex shader.
             * @param   {string}                       fragSource    The fragment shader.
             * @return  {Bridge.WebGL.WebGLProgram}                  A linked program ready for use.
             */
            CompileShader: function (vertSource, fragSource) {
                // Create and compile vertex shader.
                var vertexShader = this._gl.createShader(this._gl.VERTEX_SHADER);

                this._gl.shaderSource(vertexShader, vertSource);
                this._gl.compileShader(vertexShader);

                // Log error.
                var vertError = this._gl.getShaderInfoLog(vertexShader);
                if (!System.String.isNullOrEmpty(vertError)) {
                    System.Console.WriteLine(vertError);
                }

                // Create and compile fragment shader.
                var fragmentShader = this._gl.createShader(this._gl.FRAGMENT_SHADER);

                this._gl.shaderSource(fragmentShader, fragSource);
                this._gl.compileShader(fragmentShader);

                // Log error.
                var fragError = this._gl.getShaderInfoLog(fragmentShader);
                if (!System.String.isNullOrEmpty(fragError)) {
                    System.Console.WriteLine(fragError);
                }

                // Create program.
                var program = this._gl.createProgram();
                this._gl.attachShader(program, vertexShader);
                this._gl.attachShader(program, fragmentShader);
                this._gl.linkProgram(program);

                this._gl.useProgram(program);

                return program;
            }
        }
    });

    Bridge.define("JuiceBoxEngine.Graphics.GraphicsManager", {
        statics: {
            fields: {
                _instance: null
            },
            props: {
                /**
                 * Singleton patern.
                 *
                 * @static
                 * @public
                 * @readonly
                 * @memberof JuiceBoxEngine.Graphics.GraphicsManager
                 * @function Instance
                 * @type JuiceBoxEngine.Graphics.GraphicsManager
                 */
                Instance: {
                    get: function () {
                        if (JuiceBoxEngine.Graphics.GraphicsManager._instance != null) {
                            return JuiceBoxEngine.Graphics.GraphicsManager._instance;
                        }

                        System.Console.WriteLine("Graphics Manager is not initialized!");
                        return null;
                    }
                }
            }
        },
        fields: {
            /**
             * The renderer responsible for all platform specific calls.
             *
             * @instance
             * @public
             * @memberof JuiceBoxEngine.Graphics.GraphicsManager
             * @type JuiceBoxEngine.Graphics.GraphicsContext
             */
            Context: null,
            _fullScreenQuad: null,
            _fullScreenQuadShader: null,
            _fadeTexture: null,
            /**
             * Current width of the backbuffer. (canvas)
             *
             * @instance
             * @public
             * @memberof JuiceBoxEngine.Graphics.GraphicsManager
             * @function Width
             * @type number
             */
            Width: 0,
            /**
             * Current height of the backbuffer. (canvas)
             *
             * @instance
             * @public
             * @memberof JuiceBoxEngine.Graphics.GraphicsManager
             * @function Height
             * @type number
             */
            Height: 0,
            /**
             * Size of the pixels (in screen pixels).
             *
             * @instance
             * @private
             * @memberof JuiceBoxEngine.Graphics.GraphicsManager
             * @type number
             */
            _pixelSize: 0
        },
        ctors: {
            /**
             * Initialize the graphics manager.
             *
             * @instance
             * @this JuiceBoxEngine.Graphics.GraphicsManager
             * @memberof JuiceBoxEngine.Graphics.GraphicsManager
             * @param   {HTMLCanvasElement}    canvas
             * @return  {void}
             */
            ctor: function (canvas) {
                this.$initialize();
                this.Context = new JuiceBoxEngine.Graphics.GraphicsContext(canvas);
                JuiceBoxEngine.Graphics.GraphicsManager._instance = this;

                this._pixelSize = JuiceBoxEngine.Util.Config.Instance.ConfigValues.PixelSize;

                this.Width = canvas.width;
                this.Height = canvas.height;

                var data = System.Array.init([-1.0, -1.0, 0.0, 0.0, 0.0, 1.0, -1.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0, -1.0, -1.0, 0.0, 0.0, 0.0, -1.0, 1.0, 0.0, 0.0, 1.0, 1.0, 1.0, 0.0, 1.0, 1.0], System.Single);

                this._fullScreenQuad = new JuiceBoxEngine.Graphics.VertexBuffer.$ctor1(data);

                this._fullScreenQuad.SetAttribute(new JuiceBoxEngine.Graphics.VertexAttribute.$ctor1("a_pos", 3, false, 20, 0));
                this._fullScreenQuad.SetAttribute(new JuiceBoxEngine.Graphics.VertexAttribute.$ctor1("a_tex", 2, false, 20, 12));
            }
        },
        methods: {
            /**
             * Register graphics resource loaders to a given resource manager.
             *
             * @instance
             * @public
             * @this JuiceBoxEngine.Graphics.GraphicsManager
             * @memberof JuiceBoxEngine.Graphics.GraphicsManager
             * @param   {JuiceBoxEngine.Resources.ResourceManager}    resourceManager    The resourcemanager to register the loaders to.
             * @return  {void}
             */
            RegisterLoaders: function (resourceManager) {
                // Register shader resource loaders.
                resourceManager.RegisterResourceManager(new JuiceBoxEngine.Graphics.ShaderResourceLoader("ShaderLoader", "vert"));
                resourceManager.RegisterResourceManager(new JuiceBoxEngine.Graphics.ShaderResourceLoader("ShaderLoader", "frag"));
                resourceManager.RegisterResourceManager(new JuiceBoxEngine.Graphics.TextureResourceLoader("TextureLoader", "png"));
                resourceManager.RegisterResourceManager(new JuiceBoxEngine.Graphics.FontResourceLoader("FontLoader", "bff"));

                //FIXME: Dirty hack. This should be done somewhere else.
                this._fullScreenQuadShader = Bridge.cast(resourceManager.Load$1("Shaders/FullScreen.vert"), JuiceBoxEngine.Graphics.ShaderProgram);
                this._fadeTexture = Bridge.cast(resourceManager.Load$1("Textures/ScreenFade.png"), JuiceBoxEngine.Graphics.Texture2D);
            },
            /**
             * TODO: Remove this, since this is not the GraphicsManager's responibility.
             Render camera viewport to current framebuffer.
             *
             * @instance
             * @public
             * @this JuiceBoxEngine.Graphics.GraphicsManager
             * @memberof JuiceBoxEngine.Graphics.GraphicsManager
             * @param   {JuiceBoxEngine.Scene.Camera}    camera    The camera to use.
             * @param   {JuiceBoxEngine.Scene.Scene}     scene
             * @return  {void}
             */
            RenderCamera: function (camera, scene) {
                var command = new JuiceBoxEngine.Graphics.GraphicsCommand();
                command.VertexBuffer = this._fullScreenQuad;
                command.WorldMatrix = new JuiceBoxEngine.Math.Matrix4.$ctor1(1.0);
                command.Program = this._fullScreenQuadShader;
                command.Data.add("texture", camera.Target);
                command.Data.add("screenFade", scene.FadeTexture);
                command.Data.add("fadeAmount", Bridge.box(scene.FadeAmount, System.Single, System.Single.format, System.Single.getHashCode));
                command.Data.add("pixelSize", Bridge.box(this._pixelSize, System.Single, System.Single.format, System.Single.getHashCode));

                this.Context.Command(command);
            },
            /**
             * Update the graphics manager.
             *
             * @instance
             * @public
             * @this JuiceBoxEngine.Graphics.GraphicsManager
             * @memberof JuiceBoxEngine.Graphics.GraphicsManager
             * @return  {void}
             */
            Update: function () {
                this.Context.SetGlobalShaderValue(JuiceBoxEngine.Graphics.DefaultShaderValues.TIME, Bridge.box(JuiceBoxEngine.Util.Time.TotalSeconds, System.Single, System.Single.format, System.Single.getHashCode));
                this.Context.SetGlobalShaderValue(JuiceBoxEngine.Graphics.DefaultShaderValues.DELTATIME, Bridge.box(JuiceBoxEngine.Util.Time.DeltaTime, System.Single, System.Single.format, System.Single.getHashCode));
            }
        }
    });

    Bridge.define("JuiceBoxEngine.Graphics.PostProcessingEffect", {
        fields: {
            Name: null,
            _command: null
        },
        ctors: {
            /**
             * Constructor
             *
             * @instance
             * @public
             * @this JuiceBoxEngine.Graphics.PostProcessingEffect
             * @memberof JuiceBoxEngine.Graphics.PostProcessingEffect
             * @param   {string}    name    Name of the shader of this effect.
             * @return  {void}
             */
            ctor: function (name) {
                this.$initialize();
                this.Name = name;
                this._command = new JuiceBoxEngine.Graphics.GraphicsCommand();

                var data = System.Array.init([-1.0, -1.0, 0.0, 0.0, 0.0, 1.0, -1.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0, -1.0, -1.0, 0.0, 0.0, 0.0, -1.0, 1.0, 0.0, 0.0, 1.0, 1.0, 1.0, 0.0, 1.0, 1.0], System.Single);

                this._command.VertexBuffer = new JuiceBoxEngine.Graphics.VertexBuffer.$ctor1(data);

                this._command.VertexBuffer.SetAttribute(new JuiceBoxEngine.Graphics.VertexAttribute.$ctor1("a_pos", 3, false, 20, 0));
                this._command.VertexBuffer.SetAttribute(new JuiceBoxEngine.Graphics.VertexAttribute.$ctor1("a_tex", 2, false, 20, 12));
            }
        },
        methods: {
            /**
             * Load the post processing effect by loading the shader program related to this effect.
             *
             * @instance
             * @protected
             * @this JuiceBoxEngine.Graphics.PostProcessingEffect
             * @memberof JuiceBoxEngine.Graphics.PostProcessingEffect
             * @param   {JuiceBoxEngine.Resources.ResourceManager}    manager    The resource manager.
             * @return  {void}
             */
            Load: function (manager) {
                this._command.Program = Bridge.as(manager.Load$1("Shaders/" + (this.Name || "") + ".vert"), JuiceBoxEngine.Graphics.ShaderProgram);
            }
        }
    });

    Bridge.define("JuiceBoxEngine.Graphics.GUI.GUIElement", {
        fields: {
            Position: null,
            Command: null,
            /**
             * Priority of rendering this component. Higher value keeps this on top.
             *
             * @instance
             * @public
             * @memberof JuiceBoxEngine.Graphics.GUI.GUIElement
             * @function Priority
             * @type number
             */
            Priority: 0
        },
        ctors: {
            init: function () {
                this.Position = new JuiceBoxEngine.Math.Vector2();
            },
            ctor: function () {
                this.$initialize();
                this.Position = new JuiceBoxEngine.Math.Vector2.$ctor2(0.0, 0.0);
            }
        }
    });

    Bridge.define("JuiceBoxEngine.Graphics.GUI.GUIManager", {
        fields: {
            _view: null,
            _projection: null,
            _context: null
        },
        ctors: {
            init: function () {
                this._view = new JuiceBoxEngine.Math.Matrix4();
                this._projection = new JuiceBoxEngine.Math.Matrix4();
            },
            ctor: function () {
                this.$initialize();
                this._context = JuiceBoxEngine.Graphics.GraphicsManager.Instance.Context;
                this._view = new JuiceBoxEngine.Math.Matrix4.$ctor1(1.0);
                this._projection = JuiceBoxEngine.Math.Matrix4.CreateOrthographic(JuiceBoxEngine.Graphics.GraphicsManager.Instance.Width, JuiceBoxEngine.Graphics.GraphicsManager.Instance.Height, 0.0, 100.0);
            }
        },
        methods: {
            StartUI: function () {
                this._context.UseDepth(false);
                this._context.SetGlobalShaderValue(JuiceBoxEngine.Graphics.DefaultShaderValues.CAMERAPOSITION, new JuiceBoxEngine.Math.Vector2.$ctor2(0.0, 0.0).$clone());
                this._context.SetGlobalShaderValue(JuiceBoxEngine.Graphics.DefaultShaderValues.VIEW, this._view.$clone());
                this._context.SetGlobalShaderValue(JuiceBoxEngine.Graphics.DefaultShaderValues.PROJ, this._projection.$clone());
            },
            GUIRender: function (element) {
                this._context.Command(element.Command);
            },
            EndUI: function () {
                this._context.UseDepth(true);
            }
        }
    });

    Bridge.define("JuiceBoxEngine.Graphics.PostProcessingManager", {
        fields: {
            _effects: null
        },
        ctors: {
            /**
             * Constructor.
             *
             * @instance
             * @public
             * @this JuiceBoxEngine.Graphics.PostProcessingManager
             * @memberof JuiceBoxEngine.Graphics.PostProcessingManager
             * @param   {JuiceBoxEngine.Scene.Camera}    camera    The camera this manager is attached to.
             * @return  {void}
             */
            ctor: function (camera) {
                this.$initialize();
                this._effects = new (System.Collections.Generic.List$1(JuiceBoxEngine.Graphics.PostProcessingEffect)).ctor();
            }
        },
        methods: {
            /**
             * Add a post processing effect to the camera.
             *
             * @instance
             * @public
             * @this JuiceBoxEngine.Graphics.PostProcessingManager
             * @memberof JuiceBoxEngine.Graphics.PostProcessingManager
             * @param   {JuiceBoxEngine.Graphics.PostProcessingEffect}    effect    The effect to add.
             * @return  {void}
             */
            AddPostProcessingEffect: function (effect) {
                this._effects.add(effect);
            },
            /**
             * Execute all post processing effects on the camera.
             *
             * @instance
             * @public
             * @this JuiceBoxEngine.Graphics.PostProcessingManager
             * @memberof JuiceBoxEngine.Graphics.PostProcessingManager
             * @param   {JuiceBoxEngine.Graphics.RenderTarget}    target           The final image to process.
             * @param   {JuiceBoxEngine.Graphics.RenderTarget}    postProcessed
             * @return  {void}                                                     A post processed image.
             */
            PostProcess: function (target, postProcessed) {
                var $t;
                var temp;

                JuiceBoxEngine.Graphics.GraphicsManager.Instance.Context.UseDepth(false);

                $t = Bridge.getEnumerator(this._effects);
                try {
                    while ($t.moveNext()) {
                        var effect = $t.Current;
                        JuiceBoxEngine.Graphics.GraphicsManager.Instance.Context.SetRenderTarget(postProcessed);

                        // Render the effect to Result.
                        effect.Render(target);

                        // Swap Result and source buffers.
                        temp = postProcessed;
                        postProcessed = target;
                        target = temp;
                    }
                } finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$dispose();
                    }
                }
                JuiceBoxEngine.Graphics.GraphicsManager.Instance.Context.UseDepth(true);
            }
        }
    });

    /**
     * Wrap WebGLUniformLocation to prevent Bridge.net errors.
     *
     * @class JuiceBoxEngine.Graphics.ShaderProgram.UniformLocation
     */
    Bridge.define("JuiceBoxEngine.Graphics.ShaderProgram.UniformLocation", {
        $kind: "nested class",
        fields: {
            location: null
        }
    });

    Bridge.define("JuiceBoxEngine.Graphics.TextAlignment", {
        $kind: "enum",
        statics: {
            fields: {
                Left: 0,
                Right: 1,
                Center: 2
            }
        }
    });

    Bridge.define("JuiceBoxEngine.Graphics.VertexAttribute", {
        $kind: "struct",
        statics: {
            methods: {
                getDefaultValue: function () { return new JuiceBoxEngine.Graphics.VertexAttribute(); }
            }
        },
        fields: {
            Name: null,
            Components: 0,
            Normalize: false,
            Stride: 0,
            Offset: 0
        },
        ctors: {
            /**
             * Construct a vertex attribute.
             *
             * @instance
             * @public
             * @this JuiceBoxEngine.Graphics.VertexAttribute
             * @memberof JuiceBoxEngine.Graphics.VertexAttribute
             * @param   {string}     name          
             * @param   {number}     components    
             * @param   {boolean}    normalize     
             * @param   {number}     stride        
             * @param   {number}     offset
             * @return  {void}
             */
            $ctor1: function (name, components, normalize, stride, offset) {
                this.$initialize();
                this.Name = name;
                this.Components = components;
                this.Normalize = normalize;
                this.Stride = stride;
                this.Offset = offset;
            },
            ctor: function () {
                this.$initialize();
            }
        },
        methods: {
            getHashCode: function () {
                var h = Bridge.addHash([5561828516, this.Name, this.Components, this.Normalize, this.Stride, this.Offset]);
                return h;
            },
            equals: function (o) {
                if (!Bridge.is(o, JuiceBoxEngine.Graphics.VertexAttribute)) {
                    return false;
                }
                return Bridge.equals(this.Name, o.Name) && Bridge.equals(this.Components, o.Components) && Bridge.equals(this.Normalize, o.Normalize) && Bridge.equals(this.Stride, o.Stride) && Bridge.equals(this.Offset, o.Offset);
            },
            $clone: function (to) {
                var s = to || new JuiceBoxEngine.Graphics.VertexAttribute();
                s.Name = this.Name;
                s.Components = this.Components;
                s.Normalize = this.Normalize;
                s.Stride = this.Stride;
                s.Offset = this.Offset;
                return s;
            }
        }
    });

    Bridge.define("JuiceBoxEngine.Graphics.VertexBuffer", {
        inherits: [System.IDisposable],
        fields: {
            _data: null,
            Buffer: null,
            _context: null,
            /**
             * The vertex attributes.
             *
             * @instance
             * @public
             * @memberof JuiceBoxEngine.Graphics.VertexBuffer
             * @function Attributes
             * @type System.Collections.Generic.List$1
             */
            Attributes: null,
            /**
             * The amount of verts in this buffer (in floats)
             *
             * @instance
             * @public
             * @memberof JuiceBoxEngine.Graphics.VertexBuffer
             * @type number
             */
            VertCount: 0,
            _stride: 0
        },
        alias: ["dispose", "System$IDisposable$dispose"],
        ctors: {
            ctor: function () {
                this.$initialize();
                this._context = JuiceBoxEngine.Graphics.GraphicsManager.Instance.Context;

                // Vertcount is 0 until attributes are given.
                this.VertCount = 0;
                this._stride = 0;
                this.Attributes = new (System.Collections.Generic.List$1(JuiceBoxEngine.Graphics.VertexAttribute)).ctor();
            },
            /**
             * Constructor.
             *
             * @instance
             * @public
             * @this JuiceBoxEngine.Graphics.VertexBuffer
             * @memberof JuiceBoxEngine.Graphics.VertexBuffer
             * @param   {Array.<number>}    data    Data for the vertex buffer.
             * @return  {void}
             */
            $ctor1: function (data) {
                JuiceBoxEngine.Graphics.VertexBuffer.ctor.call(this);
                this._data = data;
                this.Buffer = this._context.CreateVertexBuffer(this._data);
            }
        },
        methods: {
            /**
             * Set an attribute for the vertexbuffer.
             *
             * @instance
             * @public
             * @this JuiceBoxEngine.Graphics.VertexBuffer
             * @memberof JuiceBoxEngine.Graphics.VertexBuffer
             * @param   {JuiceBoxEngine.Graphics.VertexAttribute}    attribute    The vertexattribute. Can be created trough {@link }
             * @return  {void}
             */
            SetAttribute: function (attribute) {
                this.Attributes.add(attribute.$clone());
                this._stride = attribute.Stride;

                if (this._data != null) {
                    this.VertCount = this.CalculateVertexCount(this._data.length);
                }
            },
            CalculateVertexCount: function (length) {
                // Calculate vert count. ('4' is the size of a float in bytes)
                return ((Bridge.Int.div(length, (((Bridge.Int.div(this._stride, 4)) | 0)))) | 0);
            },
            /**
             * Update data in the vertex buffer.
             *
             * @instance
             * @public
             * @this JuiceBoxEngine.Graphics.VertexBuffer
             * @memberof JuiceBoxEngine.Graphics.VertexBuffer
             * @param   {Array.<number>}    data
             * @return  {void}
             */
            UpdateData: function (data) {
                if (this.CalculateVertexCount(data.length) > this.VertCount) {
                    this._context.DestroyBuffer(this.Buffer);
                    this.Buffer = this._context.CreateVertexBuffer(data);
                } else {
                    this._context.UpdateVertexBufferData(this, 0, data);
                }

                this._data = data;
                this.VertCount = this.CalculateVertexCount(this._data.length);
            },
            /**
             * Dispose of the vertex buffer. (Also in graphics memory)
             *
             * @instance
             * @public
             * @this JuiceBoxEngine.Graphics.VertexBuffer
             * @memberof JuiceBoxEngine.Graphics.VertexBuffer
             * @return  {void}
             */
            dispose: function () {
                this._context.DestroyBuffer(this.Buffer);
            }
        }
    });

    Bridge.define("JuiceBoxEngine.Graphics.Window");

    Bridge.define("JuiceBoxEngine.Input.InputManager", {
        statics: {
            fields: {
                Instance: null
            }
        },
        fields: {
            /**
             * The position of the mouse ranging from [0-1]. bottom left (0, 0)
             *
             * @instance
             * @public
             * @memberof JuiceBoxEngine.Input.InputManager
             * @function MousePosition
             * @type JuiceBoxEngine.Math.Vector2
             */
            MousePosition: null,
            KeyBoard: null,
            PrevKeyBoard: null,
            /**
             * Boolean showing if the left mouse button is clicked.
             *
             * @instance
             * @public
             * @memberof JuiceBoxEngine.Input.InputManager
             * @function LeftClick
             * @type boolean
             */
            LeftClick: false,
            _canvas: null
        },
        ctors: {
            init: function () {
                this.MousePosition = new JuiceBoxEngine.Math.Vector2();
            },
            ctor: function (canvas) {
                this.$initialize();
                JuiceBoxEngine.Input.InputManager.Instance = this;

                this.KeyBoard = new (System.Collections.Generic.Dictionary$2(System.String,System.Boolean))();

                this._canvas = canvas;
                this._canvas.addEventListener("mousemove", Bridge.fn.bind(this, function (x) {
                    this.UpdateMouse(x);
                }));
                this._canvas.addEventListener("mousedown", Bridge.fn.bind(this, function (x) {
                    this.UpdateMouse(x);
                }));
                this._canvas.addEventListener("mouseup", Bridge.fn.bind(this, function (x) {
                    this.UpdateMouse(x);
                }));
                document.addEventListener("keydown", Bridge.fn.bind(this, function (x) {
                    this.KeyDown(x);
                }));
                document.addEventListener("keyup", Bridge.fn.bind(this, function (x) {
                    this.KeyUp(x);
                }));
            }
        },
        methods: {
            IsKeyDown: function (key) {
                try {
                    return this.KeyBoard.get(key);
                }
                catch ($e1) {
                    $e1 = System.Exception.create($e1);
                    return false;
                }
            },
            KeyUp: function (e) {
                var ev = Bridge.as(e, KeyboardEvent);
                ev.preventDefault();
                try {
                    this.KeyBoard.set(ev.key, false);
                }
                catch ($e1) {
                    $e1 = System.Exception.create($e1);
                    this.KeyBoard.add(ev.key, false);
                }
            },
            KeyDown: function (e) {
                var ev = Bridge.as(e, KeyboardEvent);
                ev.preventDefault();

                try {
                    this.KeyBoard.set(ev.key, true);
                }
                catch ($e1) {
                    $e1 = System.Exception.create($e1);
                    this.KeyBoard.add(ev.key, true);
                }
            },
            UpdateMouse: function (e) {
                var rect = this._canvas.getBoundingClientRect();
                var ev = Bridge.as(e, MouseEvent);
                this.LeftClick = ev.buttons === 1;
                var xPos = (ev.clientX - Bridge.Int.clip32(rect.left)) | 0;
                var yPos = (Bridge.Int.clip32(rect.bottom) - ev.clientY) | 0;
                this.MousePosition = new JuiceBoxEngine.Math.Vector2.$ctor2(xPos / this._canvas.width, yPos / this._canvas.height);
            }
        }
    });

    Bridge.define("JuiceBoxEngine.JuiceboxEngine", {
        fields: {
            _graphicsManager: null,
            _inputManager: null,
            _defaultManager: null,
            /**
             * The currently active scene.
             *
             * @instance
             * @public
             * @memberof JuiceBoxEngine.JuiceboxEngine
             * @function CurrentScene
             * @type JuiceBoxEngine.Scene.Scene
             */
            CurrentScene: null,
            _nextScene: null,
            _sceneSwitch: 0
        },
        ctors: {
            /**
             * Initializes the Juicebox engine.
             *
             * @instance
             * @public
             * @this JuiceBoxEngine.JuiceboxEngine
             * @memberof JuiceBoxEngine.JuiceboxEngine
             * @return  {void}
             */
            ctor: function () {
                this.$initialize();
                var canvas = Bridge.as(document.getElementById("JuiceboxCanvas"), HTMLCanvasElement);

                if (canvas != null) {
                    this._graphicsManager = new JuiceBoxEngine.Graphics.GraphicsManager(canvas);
                    this._inputManager = new JuiceBoxEngine.Input.InputManager(canvas);
                } else {
                    System.Console.WriteLine("No canvas with name \"JuiceboxCanvas\" found!");
                }

                this._defaultManager = new JuiceBoxEngine.Resources.ResourceManager();
                this.RegisterLoaders(this._defaultManager);

                this.CurrentScene = new JuiceBoxEngine.Scene.Scene(this._defaultManager);
            }
        },
        methods: {
            SetScene: function (scene) {
                this.CurrentScene = scene;
                this.CurrentScene.Start();
            },
            SetScene$1: function (scene, transitionDuration, transitionTexture) {
                if (transitionDuration === void 0) { transitionDuration = 1.0; }
                if (transitionTexture === void 0) { transitionTexture = null; }
                if (Bridge.referenceEquals(scene, this._nextScene)) {
                    return;
                }

                this._nextScene = scene;
                this._nextScene.FadeAmount = 1.0;
                this._sceneSwitch = transitionDuration;
                this.CurrentScene.FadeTexture = transitionTexture;
                this._nextScene.FadeTexture = transitionTexture;
            },
            /**
             * Called to start the game engine.
             *
             * @instance
             * @public
             * @this JuiceBoxEngine.JuiceboxEngine
             * @memberof JuiceBoxEngine.JuiceboxEngine
             * @return  {void}
             */
            Run: function () {
                // Start updating the engine.
                this.Update();
            },
            /**
             * Register resourceloaders to the given resource manager.
             *
             * @instance
             * @public
             * @this JuiceBoxEngine.JuiceboxEngine
             * @memberof JuiceBoxEngine.JuiceboxEngine
             * @param   {JuiceBoxEngine.Resources.ResourceManager}    resourceManager    The resource manager to register all the loaders to.
             * @return  {void}
             */
            RegisterLoaders: function (resourceManager) {
                this._graphicsManager.RegisterLoaders(resourceManager);
                resourceManager.RegisterResourceManager(new JuiceBoxEngine.Sound.SoundResourceLoader("SoundLoader", "wav"));
            },
            /**
             * Update the engine.
             *
             * @instance
             * @public
             * @this JuiceBoxEngine.JuiceboxEngine
             * @memberof JuiceBoxEngine.JuiceboxEngine
             * @return  {void}
             */
            Update: function () {
                var $t;
                // Update the time.
                JuiceBoxEngine.Util.Time.Update();

                // If there is a scene to switch to.
                if (this._nextScene != null) {
                    this._sceneSwitch -= JuiceBoxEngine.Util.Time.DeltaTimeRealTime;

                    this.CurrentScene.FadeAmount = 1.0 - this._sceneSwitch;

                    if (this._sceneSwitch <= 0.0) {
                        this.CurrentScene = this._nextScene;
                        this.CurrentScene.Start();
                        this._nextScene = null;
                    }
                } else {
                    if (this.CurrentScene.FadeAmount > 0.0) {
                        $t = this.CurrentScene;
                        $t.FadeAmount -= JuiceBoxEngine.Util.Time.DeltaTimeRealTime;
                    }
                }

                try {
                    // Update the graphics manager.
                    this._graphicsManager.Update();

                    // Update all objects in the scene.
                    this.CurrentScene.Update();

                    // Render the scene.
                    this.CurrentScene.Render();
                }
                catch (e) {
                    e = System.Exception.create(e);
                    System.Console.WriteLine("Something went wrong in the update loop!" + (Bridge.toString(e) || ""));
                }

                //Bridge.Html5.Window.SetTimeout(() => Update(), 0);
                window.requestAnimationFrame(Bridge.fn.bind(this, function () {
                    this.Update();
                }));
            }
        }
    });

    Bridge.define("JuiceBoxEngine.Math.Color32", {
        $kind: "struct",
        statics: {
            methods: {
                getDefaultValue: function () { return new JuiceBoxEngine.Math.Color32(); }
            }
        },
        fields: {
            /**
             * The red value.
             *
             * @instance
             * @public
             * @memberof JuiceBoxEngine.Math.Color32
             * @type number
             */
            R: 0,
            /**
             * The green value.
             *
             * @instance
             * @public
             * @memberof JuiceBoxEngine.Math.Color32
             * @type number
             */
            G: 0,
            /**
             * The blue value.
             *
             * @instance
             * @public
             * @memberof JuiceBoxEngine.Math.Color32
             * @type number
             */
            B: 0,
            /**
             * The Alpha value.
             *
             * @instance
             * @public
             * @memberof JuiceBoxEngine.Math.Color32
             * @type number
             */
            A: 0
        },
        ctors: {
            /**
             * Constructs a color.
             *
             * @instance
             * @public
             * @this JuiceBoxEngine.Math.Color32
             * @memberof JuiceBoxEngine.Math.Color32
             * @param   {number}    r    Red value, ranging 0-1.
             * @param   {number}    g    Green value, ranging 0-1.
             * @param   {number}    b    Blue value, ranging 0-1.
             * @param   {number}    a    Alpha value, ranging 0-1.
             * @return  {void}
             */
            $ctor2: function (r, g, b, a) {
                this.$initialize();
                this.R = r;
                this.G = g;
                this.B = b;
                this.A = a;
            },
            $ctor1: function (r, g, b, a) {
                this.$initialize();
                this.R = r / 256.0;
                this.G = g / 256.0;
                this.B = b / 256.0;
                this.A = a / 256.0;
            },
            ctor: function () {
                this.$initialize();
            }
        },
        methods: {
            getHashCode: function () {
                var h = Bridge.addHash([1872667317, this.R, this.G, this.B, this.A]);
                return h;
            },
            equals: function (o) {
                if (!Bridge.is(o, JuiceBoxEngine.Math.Color32)) {
                    return false;
                }
                return Bridge.equals(this.R, o.R) && Bridge.equals(this.G, o.G) && Bridge.equals(this.B, o.B) && Bridge.equals(this.A, o.A);
            },
            $clone: function (to) {
                var s = to || new JuiceBoxEngine.Math.Color32();
                s.R = this.R;
                s.G = this.G;
                s.B = this.B;
                s.A = this.A;
                return s;
            }
        }
    });

    Bridge.define("JuiceBoxEngine.Math.Math", {
        statics: {
            methods: {
                /**
                 * Calculates the square root of a number.
                 *
                 * @static
                 * @public
                 * @this JuiceBoxEngine.Math.Math
                 * @memberof JuiceBoxEngine.Math.Math
                 * @param   {number}    value    The value to get the square root from.
                 * @return  {number}             The square root of a given number.
                 */
                Sqrt: function (value) {
                    return Math.sqrt(value);
                },
                /**
                 * Calculates b to the power p. (b^p)
                 *
                 * @static
                 * @public
                 * @this JuiceBoxEngine.Math.Math
                 * @memberof JuiceBoxEngine.Math.Math
                 * @param   {number}    b    The base.
                 * @param   {number}    p    The power.
                 * @return  {number}
                 */
                Pow: function (b, p) {
                    return Math.pow(b, p);
                },
                /**
                 * Sin function.
                 *
                 * @static
                 * @public
                 * @this JuiceBoxEngine.Math.Math
                 * @memberof JuiceBoxEngine.Math.Math
                 * @param   {number}    value    Value for the sin function.
                 * @return  {number}             A value from the sin function.
                 */
                Sin: function (value) {
                    return Math.sin(value);
                },
                /**
                 * Cos function.
                 *
                 * @static
                 * @public
                 * @this JuiceBoxEngine.Math.Math
                 * @memberof JuiceBoxEngine.Math.Math
                 * @param   {number}    value    Value for the cos function.
                 * @return  {number}             A value from the cos function.
                 */
                Cos: function (value) {
                    return Math.cos(value);
                },
                /**
                 * Tan function.
                 *
                 * @static
                 * @public
                 * @this JuiceBoxEngine.Math.Math
                 * @memberof JuiceBoxEngine.Math.Math
                 * @param   {number}    value    Value for the tan function.
                 * @return  {number}             A value from the tan function.
                 */
                Tan: function (value) {
                    return Math.tan(value);
                },
                /**
                 * Round the given value to the nearest integer.
                 *
                 * @static
                 * @public
                 * @this JuiceBoxEngine.Math.Math
                 * @memberof JuiceBoxEngine.Math.Math
                 * @param   {number}    value    The value to round.
                 * @return  {number}             The rounded value closest to the given value.
                 */
                Round: function (value) {
                    return Bridge.Math.round(value, 0, 6);
                },
                /**
                 * Ping pong a value between 0 and length
                 *
                 * @static
                 * @public
                 * @this JuiceBoxEngine.Math.Math
                 * @memberof JuiceBoxEngine.Math.Math
                 * @param   {number}    t         
                 * @param   {number}    length
                 * @return  {number}
                 */
                PingPong: function (t, length) {
                    var l = 2 * length;
                    var T = t % l;

                    if (0 <= T && T < length) {
                        return T;
                    } else {
                        return l - T;
                    }
                }
            }
        }
    });

    /** @namespace JuiceBoxEngine.Math */

    /**
     * Matrix class representing a 4x4 matrix. Mostly from MonoGame.
     *
     * @public
     * @class JuiceBoxEngine.Math.Matrix4
     */
    Bridge.define("JuiceBoxEngine.Math.Matrix4", {
        $kind: "struct",
        statics: {
            methods: {
                /**
                 * Transpose the given matrix.
                 *
                 * @static
                 * @public
                 * @this JuiceBoxEngine.Math.Matrix4
                 * @memberof JuiceBoxEngine.Math.Matrix4
                 * @param   {JuiceBoxEngine.Math.Matrix4}    matrix    The matrix to transpose.
                 * @return  {JuiceBoxEngine.Math.Matrix4}              A matrix tranposed to the given matrix.
                 */
                Transpose: function (matrix) {
                    var mat = new JuiceBoxEngine.Math.Matrix4.ctor();

                    mat.M11 = matrix.M11;
                    mat.M12 = matrix.M21;
                    mat.M13 = matrix.M31;
                    mat.M14 = matrix.M41;

                    mat.M21 = matrix.M12;
                    mat.M22 = matrix.M22;
                    mat.M23 = matrix.M32;
                    mat.M24 = matrix.M42;

                    mat.M31 = matrix.M13;
                    mat.M32 = matrix.M23;
                    mat.M33 = matrix.M33;
                    mat.M34 = matrix.M43;

                    mat.M41 = matrix.M14;
                    mat.M42 = matrix.M24;
                    mat.M43 = matrix.M34;
                    mat.M44 = matrix.M44;

                    return mat.$clone();
                },
                /**
                 * Add to matrixes to each other.
                 *
                 * @static
                 * @public
                 * @this JuiceBoxEngine.Math.Matrix4
                 * @memberof JuiceBoxEngine.Math.Matrix4
                 * @param   {JuiceBoxEngine.Math.Matrix4}    matrix1    The first matrix.
                 * @param   {JuiceBoxEngine.Math.Matrix4}    matrix2    The second matrix.
                 * @return  {JuiceBoxEngine.Math.Matrix4}               A matrix containing the sum of the given matrixes.
                 */
                Add: function (matrix1, matrix2) {
                    matrix1.M11 += matrix2.M11;
                    matrix1.M12 += matrix2.M12;
                    matrix1.M13 += matrix2.M13;
                    matrix1.M14 += matrix2.M14;
                    matrix1.M21 += matrix2.M21;
                    matrix1.M22 += matrix2.M22;
                    matrix1.M23 += matrix2.M23;
                    matrix1.M24 += matrix2.M24;
                    matrix1.M31 += matrix2.M31;
                    matrix1.M32 += matrix2.M32;
                    matrix1.M33 += matrix2.M33;
                    matrix1.M34 += matrix2.M34;
                    matrix1.M41 += matrix2.M41;
                    matrix1.M42 += matrix2.M42;
                    matrix1.M43 += matrix2.M43;
                    matrix1.M44 += matrix2.M44;
                    return matrix1.$clone();
                },
                Multiply: function (matrix1, matrix2) {
                    var m11 = (((matrix1.M11 * matrix2.M11) + (matrix1.M12 * matrix2.M21)) + (matrix1.M13 * matrix2.M31)) + (matrix1.M14 * matrix2.M41);
                    var m12 = (((matrix1.M11 * matrix2.M12) + (matrix1.M12 * matrix2.M22)) + (matrix1.M13 * matrix2.M32)) + (matrix1.M14 * matrix2.M42);
                    var m13 = (((matrix1.M11 * matrix2.M13) + (matrix1.M12 * matrix2.M23)) + (matrix1.M13 * matrix2.M33)) + (matrix1.M14 * matrix2.M43);
                    var m14 = (((matrix1.M11 * matrix2.M14) + (matrix1.M12 * matrix2.M24)) + (matrix1.M13 * matrix2.M34)) + (matrix1.M14 * matrix2.M44);
                    var m21 = (((matrix1.M21 * matrix2.M11) + (matrix1.M22 * matrix2.M21)) + (matrix1.M23 * matrix2.M31)) + (matrix1.M24 * matrix2.M41);
                    var m22 = (((matrix1.M21 * matrix2.M12) + (matrix1.M22 * matrix2.M22)) + (matrix1.M23 * matrix2.M32)) + (matrix1.M24 * matrix2.M42);
                    var m23 = (((matrix1.M21 * matrix2.M13) + (matrix1.M22 * matrix2.M23)) + (matrix1.M23 * matrix2.M33)) + (matrix1.M24 * matrix2.M43);
                    var m24 = (((matrix1.M21 * matrix2.M14) + (matrix1.M22 * matrix2.M24)) + (matrix1.M23 * matrix2.M34)) + (matrix1.M24 * matrix2.M44);
                    var m31 = (((matrix1.M31 * matrix2.M11) + (matrix1.M32 * matrix2.M21)) + (matrix1.M33 * matrix2.M31)) + (matrix1.M34 * matrix2.M41);
                    var m32 = (((matrix1.M31 * matrix2.M12) + (matrix1.M32 * matrix2.M22)) + (matrix1.M33 * matrix2.M32)) + (matrix1.M34 * matrix2.M42);
                    var m33 = (((matrix1.M31 * matrix2.M13) + (matrix1.M32 * matrix2.M23)) + (matrix1.M33 * matrix2.M33)) + (matrix1.M34 * matrix2.M43);
                    var m34 = (((matrix1.M31 * matrix2.M14) + (matrix1.M32 * matrix2.M24)) + (matrix1.M33 * matrix2.M34)) + (matrix1.M34 * matrix2.M44);
                    var m41 = (((matrix1.M41 * matrix2.M11) + (matrix1.M42 * matrix2.M21)) + (matrix1.M43 * matrix2.M31)) + (matrix1.M44 * matrix2.M41);
                    var m42 = (((matrix1.M41 * matrix2.M12) + (matrix1.M42 * matrix2.M22)) + (matrix1.M43 * matrix2.M32)) + (matrix1.M44 * matrix2.M42);
                    var m43 = (((matrix1.M41 * matrix2.M13) + (matrix1.M42 * matrix2.M23)) + (matrix1.M43 * matrix2.M33)) + (matrix1.M44 * matrix2.M43);
                    var m44 = (((matrix1.M41 * matrix2.M14) + (matrix1.M42 * matrix2.M24)) + (matrix1.M43 * matrix2.M34)) + (matrix1.M44 * matrix2.M44);
                    matrix1.M11 = m11;
                    matrix1.M12 = m12;
                    matrix1.M13 = m13;
                    matrix1.M14 = m14;
                    matrix1.M21 = m21;
                    matrix1.M22 = m22;
                    matrix1.M23 = m23;
                    matrix1.M24 = m24;
                    matrix1.M31 = m31;
                    matrix1.M32 = m32;
                    matrix1.M33 = m33;
                    matrix1.M34 = m34;
                    matrix1.M41 = m41;
                    matrix1.M42 = m42;
                    matrix1.M43 = m43;
                    matrix1.M44 = m44;
                    return matrix1.$clone();
                },
                /**
                 * Create a matrix which contains the rotation moment around a given axis.
                 *
                 * @static
                 * @public
                 * @this JuiceBoxEngine.Math.Matrix4
                 * @memberof JuiceBoxEngine.Math.Matrix4
                 * @param   {JuiceBoxEngine.Math.Vector3}    axis     The axis of rotation.
                 * @param   {number}                         angle    The angle of rotation.
                 * @return  {JuiceBoxEngine.Math.Matrix4}             The rotaion matrix.
                 */
                CreateFromAxisAngle: function (axis, angle) {
                    var result = new JuiceBoxEngine.Math.Matrix4();

                    var x = axis.X;
                    var y = axis.Y;
                    var z = axis.Z;
                    var num2 = JuiceBoxEngine.Math.Math.Sin(angle);
                    var num = JuiceBoxEngine.Math.Math.Cos(angle);
                    var num11 = x * x;
                    var num10 = y * y;
                    var num9 = z * z;
                    var num8 = x * y;
                    var num7 = x * z;
                    var num6 = y * z;

                    result.M11 = num11 + (num * (1.0 - num11));
                    result.M12 = (num8 - (num * num8)) + (num2 * z);
                    result.M13 = (num7 - (num * num7)) - (num2 * y);
                    result.M14 = 0;
                    result.M21 = (num8 - (num * num8)) - (num2 * z);
                    result.M22 = num10 + (num * (1.0 - num10));
                    result.M23 = (num6 - (num * num6)) + (num2 * x);
                    result.M24 = 0;
                    result.M31 = (num7 - (num * num7)) + (num2 * y);
                    result.M32 = (num6 - (num * num6)) - (num2 * x);
                    result.M33 = num9 + (num * (1.0 - num9));
                    result.M34 = 0;
                    result.M41 = 0;
                    result.M42 = 0;
                    result.M43 = 0;
                    result.M44 = 1;

                    return result.$clone();
                },
                /**
                 * Create a view-matrix.
                 *
                 * @static
                 * @public
                 * @this JuiceBoxEngine.Math.Matrix4
                 * @memberof JuiceBoxEngine.Math.Matrix4
                 * @param   {JuiceBoxEngine.Math.Vector3}    cameraPosition    Position of the camera in world space.
                 * @param   {JuiceBoxEngine.Math.Vector3}    cameraTarget      Lookup vector of the camera.
                 * @param   {JuiceBoxEngine.Math.Vector3}    cameraUpVector    Direction of the upper edge of the camera.
                 * @return  {JuiceBoxEngine.Math.Matrix4}
                 */
                CreateLookAt: function (cameraPosition, cameraTarget, cameraUpVector) {
                    var matrix = new JuiceBoxEngine.Math.Matrix4.ctor();

                    var vector = JuiceBoxEngine.Math.Vector3.Normalize(JuiceBoxEngine.Math.Vector3.op_Subtraction(cameraPosition.$clone(), cameraTarget.$clone()));
                    var vector2 = JuiceBoxEngine.Math.Vector3.Normalize(JuiceBoxEngine.Math.Vector3.Cross(cameraUpVector.$clone(), vector.$clone()));
                    var vector3 = JuiceBoxEngine.Math.Vector3.Cross(vector.$clone(), vector2.$clone());

                    matrix.M11 = vector2.X;
                    matrix.M12 = vector3.X;
                    matrix.M13 = vector.X;
                    matrix.M14 = 0.0;
                    matrix.M21 = vector2.Y;
                    matrix.M22 = vector3.Y;
                    matrix.M23 = vector.Y;
                    matrix.M24 = 0.0;
                    matrix.M31 = vector2.Z;
                    matrix.M32 = vector3.Z;
                    matrix.M33 = vector.Z;
                    matrix.M34 = 0.0;
                    matrix.M41 = -JuiceBoxEngine.Math.Vector3.Dot(vector2.$clone(), cameraPosition.$clone());
                    matrix.M42 = -JuiceBoxEngine.Math.Vector3.Dot(vector3.$clone(), cameraPosition.$clone());
                    matrix.M43 = -JuiceBoxEngine.Math.Vector3.Dot(vector.$clone(), cameraPosition.$clone());
                    matrix.M44 = 1.0;

                    return matrix.$clone();
                },
                /**
                 * Create an orthographic projection matrix.
                 *
                 * @static
                 * @public
                 * @this JuiceBoxEngine.Math.Matrix4
                 * @memberof JuiceBoxEngine.Math.Matrix4
                 * @param   {number}                         width         Width of viewing volume.
                 * @param   {number}                         height        Height of viewing volume.
                 * @param   {number}                         zNearPlane    Near clipping plane.
                 * @param   {number}                         zFarPlane     Far clipping plane.
                 * @return  {JuiceBoxEngine.Math.Matrix4}                  An orthographic projection matrix.
                 */
                CreateOrthographic: function (width, height, zNearPlane, zFarPlane) {
                    var matrix = new JuiceBoxEngine.Math.Matrix4.ctor();

                    matrix.M11 = 2.0 / width;
                    matrix.M12 = (matrix.M13 = (matrix.M14 = 0.0));
                    matrix.M22 = 2.0 / height;
                    matrix.M21 = (matrix.M23 = (matrix.M24 = 0.0));
                    matrix.M33 = 1.0 / (zNearPlane - zFarPlane);
                    matrix.M31 = (matrix.M32 = (matrix.M34 = 0.0));
                    matrix.M41 = (matrix.M42 = 0.0);
                    matrix.M43 = zNearPlane / (zNearPlane - zFarPlane);
                    matrix.M44 = 1.0;

                    return matrix.$clone();
                },
                /**
                 * Create a perspective projection matrix.
                 *
                 * @static
                 * @public
                 * @this JuiceBoxEngine.Math.Matrix4
                 * @memberof JuiceBoxEngine.Math.Matrix4
                 * @param   {number}                         fieldOfView          The field of view of the perspective projection matrix (in radians).
                 * @param   {number}                         aspectRatio          The aspect ratio.
                 * @param   {number}                         nearPlaneDistance    The near clipping plane.
                 * @param   {number}                         farPlaneDistance     The far clipping plane.
                 * @return  {JuiceBoxEngine.Math.Matrix4}                         A perspective projection matrix.
                 */
                CreatePerspectiveFieldOfView: function (fieldOfView, aspectRatio, nearPlaneDistance, farPlaneDistance) {
                    var matrix = new JuiceBoxEngine.Math.Matrix4.ctor();

                    var num = 1.0 / (JuiceBoxEngine.Math.Math.Tan((fieldOfView * 0.5)));
                    var num9 = num / aspectRatio;

                    matrix.M11 = num9;
                    matrix.M12 = (matrix.M13 = (matrix.M14 = 0));
                    matrix.M22 = num;
                    matrix.M21 = (matrix.M23 = (matrix.M24 = 0));
                    matrix.M31 = (matrix.M32 = 0.0);
                    matrix.M33 = farPlaneDistance / (nearPlaneDistance - farPlaneDistance);
                    matrix.M34 = -1;
                    matrix.M41 = (matrix.M42 = (matrix.M44 = 0));
                    matrix.M43 = (nearPlaneDistance * farPlaneDistance) / (nearPlaneDistance - farPlaneDistance);

                    return matrix.$clone();
                },
                /**
                 * Create rotation on the X-Axis.
                 *
                 * @static
                 * @public
                 * @this JuiceBoxEngine.Math.Matrix4
                 * @memberof JuiceBoxEngine.Math.Matrix4
                 * @param   {number}                         radians    Angle in radians.
                 * @return  {JuiceBoxEngine.Math.Matrix4}               The rotation matrix.
                 */
                CreateRotationX: function (radians) {
                    var result = new JuiceBoxEngine.Math.Matrix4.$ctor1(1.0);

                    var val1 = JuiceBoxEngine.Math.Math.Cos(radians);
                    var val2 = JuiceBoxEngine.Math.Math.Sin(radians);

                    result.M22 = val1;
                    result.M23 = val2;
                    result.M32 = -val2;
                    result.M33 = val1;

                    return result.$clone();
                },
                /**
                 * Create rotation on the Y-Axis.
                 *
                 * @static
                 * @public
                 * @this JuiceBoxEngine.Math.Matrix4
                 * @memberof JuiceBoxEngine.Math.Matrix4
                 * @param   {number}                         radians    Angle in radians.
                 * @return  {JuiceBoxEngine.Math.Matrix4}               The rotation matrix.
                 */
                CreateRotationY: function (radians) {
                    var result = new JuiceBoxEngine.Math.Matrix4.$ctor1(1.0);

                    var val1 = JuiceBoxEngine.Math.Math.Cos(radians);
                    var val2 = JuiceBoxEngine.Math.Math.Sin(radians);

                    result.M11 = val1;
                    result.M13 = -val2;
                    result.M31 = val2;
                    result.M33 = val1;

                    return result.$clone();
                },
                /**
                 * Create rotation on the Z-Axis.
                 *
                 * @static
                 * @public
                 * @this JuiceBoxEngine.Math.Matrix4
                 * @memberof JuiceBoxEngine.Math.Matrix4
                 * @param   {number}                         radians    Angle in radians.
                 * @return  {JuiceBoxEngine.Math.Matrix4}               The rotation matrix.
                 */
                CreateRotationZ: function (radians) {
                    var result = new JuiceBoxEngine.Math.Matrix4.$ctor1(1.0);

                    var val1 = JuiceBoxEngine.Math.Math.Cos(radians);
                    var val2 = JuiceBoxEngine.Math.Math.Sin(radians);

                    result.M11 = val1;
                    result.M12 = val2;
                    result.M21 = -val2;
                    result.M22 = val1;

                    return result.$clone();
                },
                /**
                 * Create a scaling matrix.
                 *
                 * @static
                 * @public
                 * @this JuiceBoxEngine.Math.Matrix4
                 * @memberof JuiceBoxEngine.Math.Matrix4
                 * @param   {JuiceBoxEngine.Math.Vector3}    scale    The scale on the x, y and z axis.
                 * @return  {JuiceBoxEngine.Math.Matrix4}             A scaling matrix.
                 */
                CreateScale: function (scale) {
                    var result = new JuiceBoxEngine.Math.Matrix4.ctor();
                    result.M11 = scale.X;
                    result.M12 = 0;
                    result.M13 = 0;
                    result.M14 = 0;
                    result.M21 = 0;
                    result.M22 = scale.Y;
                    result.M23 = 0;
                    result.M24 = 0;
                    result.M31 = 0;
                    result.M32 = 0;
                    result.M33 = scale.Z;
                    result.M34 = 0;
                    result.M41 = 0;
                    result.M42 = 0;
                    result.M43 = 0;
                    result.M44 = 1;
                    return result.$clone();
                },
                /**
                 * Create a translation matrix.
                 *
                 * @static
                 * @public
                 * @this JuiceBoxEngine.Math.Matrix4
                 * @memberof JuiceBoxEngine.Math.Matrix4
                 * @param   {JuiceBoxEngine.Math.Vector3}    translation    Translation.
                 * @return  {JuiceBoxEngine.Math.Matrix4}
                 */
                CreateTranslation: function (translation) {
                    var result = new JuiceBoxEngine.Math.Matrix4.$ctor1(1.0);
                    result.M41 = translation.X;
                    result.M42 = translation.Y;
                    result.M43 = translation.Z;
                    return result.$clone();
                },
                getDefaultValue: function () { return new JuiceBoxEngine.Math.Matrix4(); }
            }
        },
        fields: {
            /**
             * First row and first column value.
             *
             * @instance
             * @public
             * @memberof JuiceBoxEngine.Math.Matrix4
             * @type number
             */
            M11: 0,
            /**
             * First row and second column value.
             *
             * @instance
             * @public
             * @memberof JuiceBoxEngine.Math.Matrix4
             * @type number
             */
            M12: 0,
            /**
             * First row and third column value.
             *
             * @instance
             * @public
             * @memberof JuiceBoxEngine.Math.Matrix4
             * @type number
             */
            M13: 0,
            /**
             * First row and fouth column value.
             *
             * @instance
             * @public
             * @memberof JuiceBoxEngine.Math.Matrix4
             * @type number
             */
            M14: 0,
            /**
             * Second row and first column value.
             *
             * @instance
             * @public
             * @memberof JuiceBoxEngine.Math.Matrix4
             * @type number
             */
            M21: 0,
            /**
             * Second row and second column value.
             *
             * @instance
             * @public
             * @memberof JuiceBoxEngine.Math.Matrix4
             * @type number
             */
            M22: 0,
            /**
             * Second row and third column value.
             *
             * @instance
             * @public
             * @memberof JuiceBoxEngine.Math.Matrix4
             * @type number
             */
            M23: 0,
            /**
             * Second row and fouth column value.
             *
             * @instance
             * @public
             * @memberof JuiceBoxEngine.Math.Matrix4
             * @type number
             */
            M24: 0,
            /**
             * Third row and first column value.
             *
             * @instance
             * @public
             * @memberof JuiceBoxEngine.Math.Matrix4
             * @type number
             */
            M31: 0,
            /**
             * Third row and second column value.
             *
             * @instance
             * @public
             * @memberof JuiceBoxEngine.Math.Matrix4
             * @type number
             */
            M32: 0,
            /**
             * Third row and third column value.
             *
             * @instance
             * @public
             * @memberof JuiceBoxEngine.Math.Matrix4
             * @type number
             */
            M33: 0,
            /**
             * Third row and fouth column value.
             *
             * @instance
             * @public
             * @memberof JuiceBoxEngine.Math.Matrix4
             * @type number
             */
            M34: 0,
            /**
             * Fourth row and first column value.
             *
             * @instance
             * @public
             * @memberof JuiceBoxEngine.Math.Matrix4
             * @type number
             */
            M41: 0,
            /**
             * Fourth row and second column value.
             *
             * @instance
             * @public
             * @memberof JuiceBoxEngine.Math.Matrix4
             * @type number
             */
            M42: 0,
            /**
             * Fourth row and third column value.
             *
             * @instance
             * @public
             * @memberof JuiceBoxEngine.Math.Matrix4
             * @type number
             */
            M43: 0,
            /**
             * Fourth row and fouth column value.
             *
             * @instance
             * @public
             * @memberof JuiceBoxEngine.Math.Matrix4
             * @type number
             */
            M44: 0
        },
        ctors: {
            /**
             * Constructs a matrix with a diagonal with the given value.
             *
             * @instance
             * @public
             * @this JuiceBoxEngine.Math.Matrix4
             * @memberof JuiceBoxEngine.Math.Matrix4
             * @param   {number}    value    The value for the diagonal in the matrix.
             * @return  {void}
             */
            $ctor1: function (value) {
                this.$initialize();
                this.M11 = value;
                this.M12 = 0.0;
                this.M13 = 0.0;
                this.M14 = 0.0;
                this.M21 = 0.0;
                this.M22 = value;
                this.M23 = 0.0;
                this.M24 = 0.0;
                this.M31 = 0.0;
                this.M32 = 0.0;
                this.M33 = value;
                this.M34 = 0.0;
                this.M41 = 0.0;
                this.M42 = 0.0;
                this.M43 = 0.0;
                this.M44 = value;
            },
            /**
             * Constructs a matrix with the given values.
             *
             * @instance
             * @public
             * @this JuiceBoxEngine.Math.Matrix4
             * @memberof JuiceBoxEngine.Math.Matrix4
             * @param   {number}    m11    First row and first column value.
             * @param   {number}    m12    First row and second column value.
             * @param   {number}    m13    First row and third column value.
             * @param   {number}    m14    First row and fourth column value.
             * @param   {number}    m21    Second row and first column value.
             * @param   {number}    m22    Second row and second column value.
             * @param   {number}    m23    Second row and third column value.
             * @param   {number}    m24    Second row and fourth column value.
             * @param   {number}    m31    Third row and first column value.
             * @param   {number}    m32    Third row and second column value.
             * @param   {number}    m33    Third row and third column value.
             * @param   {number}    m34    Third row and fourth column value.
             * @param   {number}    m41    Fourth row and first column value.
             * @param   {number}    m42    Fourth row and second column value.
             * @param   {number}    m43    Fourth row and third column value.
             * @param   {number}    m44    Fourth row and fourth column value.
             * @return  {void}
             */
            $ctor2: function (m11, m12, m13, m14, m21, m22, m23, m24, m31, m32, m33, m34, m41, m42, m43, m44) {
                this.$initialize();
                this.M11 = m11;
                this.M12 = m12;
                this.M13 = m13;
                this.M14 = m14;
                this.M21 = m21;
                this.M22 = m22;
                this.M23 = m23;
                this.M24 = m24;
                this.M31 = m31;
                this.M32 = m32;
                this.M33 = m33;
                this.M34 = m34;
                this.M41 = m41;
                this.M42 = m42;
                this.M43 = m43;
                this.M44 = m44;
            },
            ctor: function () {
                this.$initialize();
            }
        },
        methods: {
            /**
             * Read and write the data inside the matrix. Stored row-major.
             *
             * @instance
             * @public
             * @this JuiceBoxEngine.Math.Matrix4
             * @memberof JuiceBoxEngine.Math.Matrix4
             * @param   {number}    index    A value ranging [0, 15] (inclusive).
             * @return  {number}             The value stored in the matrix.
             */
            getItem: function (index) {
                switch (index) {
                    case 0: 
                        return this.M11;
                    case 1: 
                        return this.M12;
                    case 2: 
                        return this.M13;
                    case 3: 
                        return this.M14;
                    case 4: 
                        return this.M21;
                    case 5: 
                        return this.M22;
                    case 6: 
                        return this.M23;
                    case 7: 
                        return this.M24;
                    case 8: 
                        return this.M31;
                    case 9: 
                        return this.M32;
                    case 10: 
                        return this.M33;
                    case 11: 
                        return this.M34;
                    case 12: 
                        return this.M41;
                    case 13: 
                        return this.M42;
                    case 14: 
                        return this.M43;
                    case 15: 
                        return this.M44;
                }
                throw new System.ArgumentOutOfRangeException();
            },
            /**
             * Read and write the data inside the matrix. Stored row-major.
             *
             * @instance
             * @public
             * @this JuiceBoxEngine.Math.Matrix4
             * @memberof JuiceBoxEngine.Math.Matrix4
             * @param   {number}    index    A value ranging [0, 15] (inclusive).
             * @param   {number}    value
             * @return  {void}               The value stored in the matrix.
             */
            setItem: function (index, value) {
                switch (index) {
                    case 0: 
                        this.M11 = value;
                        break;
                    case 1: 
                        this.M12 = value;
                        break;
                    case 2: 
                        this.M13 = value;
                        break;
                    case 3: 
                        this.M14 = value;
                        break;
                    case 4: 
                        this.M21 = value;
                        break;
                    case 5: 
                        this.M22 = value;
                        break;
                    case 6: 
                        this.M23 = value;
                        break;
                    case 7: 
                        this.M24 = value;
                        break;
                    case 8: 
                        this.M31 = value;
                        break;
                    case 9: 
                        this.M32 = value;
                        break;
                    case 10: 
                        this.M33 = value;
                        break;
                    case 11: 
                        this.M34 = value;
                        break;
                    case 12: 
                        this.M41 = value;
                        break;
                    case 13: 
                        this.M42 = value;
                        break;
                    case 14: 
                        this.M43 = value;
                        break;
                    case 15: 
                        this.M44 = value;
                        break;
                    default: 
                        throw new System.ArgumentOutOfRangeException();
                }
            },
            /**
             * Read and write the data inside the matrix. Stored row-major.
             *
             * @instance
             * @public
             * @this JuiceBoxEngine.Math.Matrix4
             * @memberof JuiceBoxEngine.Math.Matrix4
             * @param   {number}    row       The row to get ranging [0, 4] (inclusive)
             * @param   {number}    column    The column to get ranging [0, 4] (inclusive)
             * @return  {number}
             */
            getItem$1: function (row, column) {
                return this.getItem((((Bridge.Int.mul(row, 4)) + column) | 0));
            },
            /**
             * Read and write the data inside the matrix. Stored row-major.
             *
             * @instance
             * @public
             * @this JuiceBoxEngine.Math.Matrix4
             * @memberof JuiceBoxEngine.Math.Matrix4
             * @param   {number}    row       The row to get ranging [0, 4] (inclusive)
             * @param   {number}    column    The column to get ranging [0, 4] (inclusive)
             * @param   {number}    value
             * @return  {void}
             */
            setItem$1: function (row, column, value) {
                this.setItem((((Bridge.Int.mul(row, 4)) + column) | 0), value);
            },
            /**
             * Creates a string representing the matrix.
             *
             * @instance
             * @public
             * @override
             * @this JuiceBoxEngine.Math.Matrix4
             * @memberof JuiceBoxEngine.Math.Matrix4
             * @return  {string}        A string representing the matrix.
             */
            toString: function () {
                var retval = new System.Text.StringBuilder();
                retval.append("{ ");
                for (var i = 0; i < 15; i = (i + 1) | 0) {
                    retval.append((System.Single.format(this.getItem(i)) || "") + ", ");
                }
                retval.append(System.Single.format(this.getItem(15)) + " }");
                return retval.toString();
            },
            getHashCode: function () {
                var h = Bridge.addHash([1923668406, this.M11, this.M12, this.M13, this.M14, this.M21, this.M22, this.M23, this.M24, this.M31, this.M32, this.M33, this.M34, this.M41, this.M42, this.M43, this.M44]);
                return h;
            },
            equals: function (o) {
                if (!Bridge.is(o, JuiceBoxEngine.Math.Matrix4)) {
                    return false;
                }
                return Bridge.equals(this.M11, o.M11) && Bridge.equals(this.M12, o.M12) && Bridge.equals(this.M13, o.M13) && Bridge.equals(this.M14, o.M14) && Bridge.equals(this.M21, o.M21) && Bridge.equals(this.M22, o.M22) && Bridge.equals(this.M23, o.M23) && Bridge.equals(this.M24, o.M24) && Bridge.equals(this.M31, o.M31) && Bridge.equals(this.M32, o.M32) && Bridge.equals(this.M33, o.M33) && Bridge.equals(this.M34, o.M34) && Bridge.equals(this.M41, o.M41) && Bridge.equals(this.M42, o.M42) && Bridge.equals(this.M43, o.M43) && Bridge.equals(this.M44, o.M44);
            },
            $clone: function (to) {
                var s = to || new JuiceBoxEngine.Math.Matrix4();
                s.M11 = this.M11;
                s.M12 = this.M12;
                s.M13 = this.M13;
                s.M14 = this.M14;
                s.M21 = this.M21;
                s.M22 = this.M22;
                s.M23 = this.M23;
                s.M24 = this.M24;
                s.M31 = this.M31;
                s.M32 = this.M32;
                s.M33 = this.M33;
                s.M34 = this.M34;
                s.M41 = this.M41;
                s.M42 = this.M42;
                s.M43 = this.M43;
                s.M44 = this.M44;
                return s;
            }
        }
    });

    Bridge.define("JuiceBoxEngine.Math.Rectangle", {
        $kind: "struct",
        statics: {
            methods: {
                getDefaultValue: function () { return new JuiceBoxEngine.Math.Rectangle(); }
            }
        },
        fields: {
            X: 0,
            Y: 0,
            Width: 0,
            Height: 0
        },
        ctors: {
            $ctor1: function (x, y, width, height) {
                this.$initialize();
                this.X = x;
                this.Y = y;
                this.Width = width;
                this.Height = height;
            },
            ctor: function () {
                this.$initialize();
            }
        },
        methods: {
            getHashCode: function () {
                var h = Bridge.addHash([3771388952, this.X, this.Y, this.Width, this.Height]);
                return h;
            },
            equals: function (o) {
                if (!Bridge.is(o, JuiceBoxEngine.Math.Rectangle)) {
                    return false;
                }
                return Bridge.equals(this.X, o.X) && Bridge.equals(this.Y, o.Y) && Bridge.equals(this.Width, o.Width) && Bridge.equals(this.Height, o.Height);
            },
            $clone: function (to) {
                var s = to || new JuiceBoxEngine.Math.Rectangle();
                s.X = this.X;
                s.Y = this.Y;
                s.Width = this.Width;
                s.Height = this.Height;
                return s;
            }
        }
    });

    Bridge.define("JuiceBoxEngine.Math.Vector2", {
        inherits: function () { return [System.IEquatable$1(JuiceBoxEngine.Math.Vector2)]; },
        $kind: "struct",
        statics: {
            methods: {
                /**
                 * Returns the distance between two vectors.
                 *
                 * @static
                 * @public
                 * @this JuiceBoxEngine.Math.Vector2
                 * @memberof JuiceBoxEngine.Math.Vector2
                 * @param   {JuiceBoxEngine.Math.Vector2}    value1    The first vector.
                 * @param   {JuiceBoxEngine.Math.Vector2}    value2    The second vector.
                 * @return  {number}                                   The distance between two vectors.
                 */
                Distance: function (value1, value2) {
                    return JuiceBoxEngine.Math.Math.Sqrt(JuiceBoxEngine.Math.Vector2.DistanceSquared(value1.$clone(), value2.$clone()));
                },
                /**
                 * Returns the squared distance between two vectors.
                 *
                 * @static
                 * @public
                 * @this JuiceBoxEngine.Math.Vector2
                 * @memberof JuiceBoxEngine.Math.Vector2
                 * @param   {JuiceBoxEngine.Math.Vector2}    value1    The first vector.
                 * @param   {JuiceBoxEngine.Math.Vector2}    value2    The second vector.
                 * @return  {number}                                   The squared distance between two vectors.
                 */
                DistanceSquared: function (value1, value2) {
                    return (value1.X - value2.X) * (value1.X - value2.X) + (value1.Y - value2.Y) * (value1.Y - value2.Y);
                },
                /**
                 * Normalizes the given vector.
                 *
                 * @static
                 * @public
                 * @this JuiceBoxEngine.Math.Vector2
                 * @memberof JuiceBoxEngine.Math.Vector2
                 * @param   {JuiceBoxEngine.Math.Vector2}    vector    The vector to normalize.
                 * @return  {JuiceBoxEngine.Math.Vector2}              A normalized vector.
                 */
                Normalize: function (vector) {
                    vector.Normalize();
                    return vector.$clone();
                },
                /**
                 * Calculates the dot product.
                 *
                 * @static
                 * @public
                 * @this JuiceBoxEngine.Math.Vector2
                 * @memberof JuiceBoxEngine.Math.Vector2
                 * @param   {JuiceBoxEngine.Math.Vector2}    vector1    The first vector.
                 * @param   {JuiceBoxEngine.Math.Vector2}    vector2    The second vector.
                 * @return  {number}                                    The dot product of two vectors.
                 */
                Dot: function (vector1, vector2) {
                    return vector1.X * vector2.X + vector1.Y * vector2.Y;
                }/**
                 * Inverts the vector values.
                 *
                 * @static
                 * @public
                 * @this JuiceBoxEngine.Math.Vector2
                 * @memberof JuiceBoxEngine.Math.Vector2
                 * @param   {JuiceBoxEngine.Math.Vector2}    value    The vector to invert.
                 * @return  {JuiceBoxEngine.Math.Vector2}             Inverted vector.
                 */
                ,
                op_UnaryNegation: function (value) {
                    return new JuiceBoxEngine.Math.Vector2.$ctor2(-value.X, -value.Y);
                }/**
                 * Checks if two vectors are equal.
                 *
                 * @static
                 * @public
                 * @this JuiceBoxEngine.Math.Vector2
                 * @memberof JuiceBoxEngine.Math.Vector2
                 * @param   {JuiceBoxEngine.Math.Vector2}    value1    The first vector.
                 * @param   {JuiceBoxEngine.Math.Vector2}    value2    The second vector.
                 * @return  {boolean}                                  If the two vectors are equal true, otherwise false.
                 */
                ,
                op_Equality: function (value1, value2) {
                    return value1.X === value2.X && value1.Y === value2.Y;
                }/**
                 * Checks if the two vectors are not equal
                 *
                 * @static
                 * @public
                 * @this JuiceBoxEngine.Math.Vector2
                 * @memberof JuiceBoxEngine.Math.Vector2
                 * @param   {JuiceBoxEngine.Math.Vector2}    value1    The first vector.
                 * @param   {JuiceBoxEngine.Math.Vector2}    value2    The second vector.
                 * @return  {boolean}                                  If the two vectors are not equal true, otherwise false.
                 */
                ,
                op_Inequality: function (value1, value2) {
                    return value1.X !== value2.X && value1.Y !== value2.Y;
                }/**
                 * Adds two vectors.
                 *
                 * @static
                 * @public
                 * @this JuiceBoxEngine.Math.Vector2
                 * @memberof JuiceBoxEngine.Math.Vector2
                 * @param   {JuiceBoxEngine.Math.Vector2}    value1    The first vector.
                 * @param   {JuiceBoxEngine.Math.Vector2}    value2    The second vector.
                 * @return  {JuiceBoxEngine.Math.Vector2}              The sum of the two vectors.
                 */
                ,
                op_Addition: function (value1, value2) {
                    value1.X += value2.X;
                    value1.Y += value2.Y;
                    return value1.$clone();
                }/**
                 * Subtracts two vectors.
                 *
                 * @static
                 * @public
                 * @this JuiceBoxEngine.Math.Vector2
                 * @memberof JuiceBoxEngine.Math.Vector2
                 * @param   {JuiceBoxEngine.Math.Vector2}    value1    The first vector, on the left side.
                 * @param   {JuiceBoxEngine.Math.Vector2}    value2    The second vector, on the right side.
                 * @return  {JuiceBoxEngine.Math.Vector2}              The result of the substraction between the two vectors.
                 */
                ,
                op_Subtraction: function (value1, value2) {
                    value1.X -= value2.X;
                    value1.Y -= value2.Y;
                    return value1.$clone();
                }/**
                 * Multiplies two vectors.
                 *
                 * @static
                 * @public
                 * @this JuiceBoxEngine.Math.Vector2
                 * @memberof JuiceBoxEngine.Math.Vector2
                 * @param   {JuiceBoxEngine.Math.Vector2}    value1    The first vector.
                 * @param   {JuiceBoxEngine.Math.Vector2}    value2    The second vector.
                 * @return  {JuiceBoxEngine.Math.Vector2}              The multiplication between the given vectors.
                 */
                ,
                op_Multiply: function (value1, value2) {
                    value1.X *= value2.X;
                    value1.Y *= value2.Y;
                    return value1.$clone();
                }/**
                 * Multiplies a vector by a scalar.
                 *
                 * @static
                 * @public
                 * @this JuiceBoxEngine.Math.Vector2
                 * @memberof JuiceBoxEngine.Math.Vector2
                 * @param   {JuiceBoxEngine.Math.Vector2}    value1    The vector.
                 * @param   {number}                         scalar    The scaler value.
                 * @return  {JuiceBoxEngine.Math.Vector2}              The multiplication between the vector and scalar.
                 */
                ,
                op_Multiply$1: function (value1, scalar) {
                    value1.X *= scalar;
                    value1.Y *= scalar;
                    return value1.$clone();
                }/**
                 * Multiplies a vector by a scalar.
                 *
                 * @static
                 * @public
                 * @this JuiceBoxEngine.Math.Vector2
                 * @memberof JuiceBoxEngine.Math.Vector2
                 * @param   {number}                         scalar    The scaler value.
                 * @param   {JuiceBoxEngine.Math.Vector2}    value1    The vector.
                 * @return  {JuiceBoxEngine.Math.Vector2}              The multiplication between the vector and scalar.
                 */
                ,
                op_Multiply$2: function (scalar, value1) {
                    value1.X *= scalar;
                    value1.Y *= scalar;
                    return value1.$clone();
                }/**
                 * Divide two vectors.
                 *
                 * @static
                 * @public
                 * @this JuiceBoxEngine.Math.Vector2
                 * @memberof JuiceBoxEngine.Math.Vector2
                 * @param   {JuiceBoxEngine.Math.Vector2}    value1    The first vector, on the left side.
                 * @param   {JuiceBoxEngine.Math.Vector2}    value2    The first vector, on the right side.
                 * @return  {JuiceBoxEngine.Math.Vector2}              The devision between two vectors.
                 */
                ,
                op_Division: function (value1, value2) {
                    value1.X /= value2.X;
                    value1.Y /= value2.Y;
                    return value1.$clone();
                }/**
                 * Divide a vector by a scalar.
                 *
                 * @static
                 * @public
                 * @this JuiceBoxEngine.Math.Vector2
                 * @memberof JuiceBoxEngine.Math.Vector2
                 * @param   {JuiceBoxEngine.Math.Vector2}    value1     The vector, on the left side.
                 * @param   {number}                         divider    The value to divide by.
                 * @return  {JuiceBoxEngine.Math.Vector2}               The devision the vector and the scalar.
                 */
                ,
                op_Division$1: function (value1, divider) {
                    value1.X /= divider;
                    value1.Y /= divider;
                    return value1.$clone();
                },
                getDefaultValue: function () { return new JuiceBoxEngine.Math.Vector2(); }
            }
        },
        fields: {
            /**
             * The X-Coordinate.
             *
             * @instance
             * @public
             * @memberof JuiceBoxEngine.Math.Vector2
             * @type number
             */
            X: 0,
            /**
             * The Y-Coordinate.
             *
             * @instance
             * @public
             * @memberof JuiceBoxEngine.Math.Vector2
             * @type number
             */
            Y: 0
        },
        alias: ["equalsT", "System$IEquatable$1$JuiceBoxEngine$Math$Vector2$equalsT"],
        ctors: {
            /**
             * Constructors 2D vector.
             *
             * @instance
             * @public
             * @this JuiceBoxEngine.Math.Vector2
             * @memberof JuiceBoxEngine.Math.Vector2
             * @param   {number}    x    The X coordinate.
             * @param   {number}    y    The Y coordinate.
             * @return  {void}
             */
            $ctor2: function (x, y) {
                this.$initialize();
                this.X = x;
                this.Y = y;
            },
            /**
             * Constructs a 4D vector, all values equal to the given value.
             *
             * @instance
             * @public
             * @this JuiceBoxEngine.Math.Vector2
             * @memberof JuiceBoxEngine.Math.Vector2
             * @param   {number}    value    The value for all axis.
             * @return  {void}
             */
            $ctor1: function (value) {
                this.$initialize();
                this.X = value;
                this.Y = value;
            },
            ctor: function () {
                this.$initialize();
            }
        },
        methods: {
            /**
             * Returns the length of this vector.
             *
             * @instance
             * @public
             * @this JuiceBoxEngine.Math.Vector2
             * @memberof JuiceBoxEngine.Math.Vector2
             * @return  {number}        The length.
             */
            Length: function () {
                return JuiceBoxEngine.Math.Math.Sqrt((this.X * this.X) + (this.Y * this.Y));
            },
            /**
             * Returns the squared length of this vector.
             *
             * @instance
             * @public
             * @this JuiceBoxEngine.Math.Vector2
             * @memberof JuiceBoxEngine.Math.Vector2
             * @return  {number}        The squared length.
             */
            LengthSquared: function () {
                return (this.X * this.X) + (this.Y * this.Y);
            },
            /**
             * Makes this vector a normalized one.
             *
             * @instance
             * @public
             * @this JuiceBoxEngine.Math.Vector2
             * @memberof JuiceBoxEngine.Math.Vector2
             * @return  {void}
             */
            Normalize: function () {
                var factor = JuiceBoxEngine.Math.Math.Sqrt((this.X * this.X) + (this.Y * this.Y));
                factor = 1.0 / factor;
                this.X *= factor;
                this.Y *= factor;
            },
            /**
             * Gives a string representing the vector.
             *
             * @instance
             * @public
             * @override
             * @this JuiceBoxEngine.Math.Vector2
             * @memberof JuiceBoxEngine.Math.Vector2
             * @return  {string}        String representation of this vector.
             */
            toString: function () {
                return "(" + System.Single.format(this.X) + ", " + System.Single.format(this.Y) + ")";
            },
            /**
             * Check if the vector is equal to an other vector.
             *
             * @instance
             * @public
             * @this JuiceBoxEngine.Math.Vector2
             * @memberof JuiceBoxEngine.Math.Vector2
             * @param   {JuiceBoxEngine.Math.Vector2}    other    The vector to check against.
             * @return  {boolean}                                 False if not equal, true if the vectors are equal.
             */
            equalsT: function (other) {
                return this.X === other.X && this.Y === other.Y;
            },
            /**
             * Check if the vector is equal to the other object.
             *
             * @instance
             * @public
             * @override
             * @this JuiceBoxEngine.Math.Vector2
             * @memberof JuiceBoxEngine.Math.Vector2
             * @param   {System.Object}    o    The object to check against.
             * @return  {boolean}               False if not equal, true if the vectors are equal.
             */
            equals: function (o) {
                if (Bridge.is(o, JuiceBoxEngine.Math.Vector2)) {
                    return this.equalsT(System.Nullable.getValue(Bridge.cast(Bridge.unbox(o), JuiceBoxEngine.Math.Vector2)));
                }
                return false;
            },
            /**
             * Gets the hash code of this vector.
             *
             * @instance
             * @public
             * @override
             * @this JuiceBoxEngine.Math.Vector2
             * @memberof JuiceBoxEngine.Math.Vector2
             * @return  {number}        Hash code of this vector.
             */
            getHashCode: function () {
                var hashCode = System.Single.getHashCode(this.X);
                hashCode = (Bridge.Int.mul(hashCode, 397)) ^ System.Single.getHashCode(this.Y);
                return hashCode;
            },
            $clone: function (to) {
                var s = to || new JuiceBoxEngine.Math.Vector2();
                s.X = this.X;
                s.Y = this.Y;
                return s;
            }
        }
    });

    Bridge.define("JuiceBoxEngine.Math.Vector3", {
        inherits: function () { return [System.IEquatable$1(JuiceBoxEngine.Math.Vector3)]; },
        $kind: "struct",
        statics: {
            methods: {
                /**
                 * Returns the distance between two vectors.
                 *
                 * @static
                 * @public
                 * @this JuiceBoxEngine.Math.Vector3
                 * @memberof JuiceBoxEngine.Math.Vector3
                 * @param   {JuiceBoxEngine.Math.Vector3}    value1    The first vector.
                 * @param   {JuiceBoxEngine.Math.Vector3}    value2    The second vector.
                 * @return  {number}                                   The distance between two vectors.
                 */
                Distance: function (value1, value2) {
                    return JuiceBoxEngine.Math.Math.Sqrt(JuiceBoxEngine.Math.Vector3.DistanceSquared(value1.$clone(), value2.$clone()));
                },
                /**
                 * Returns the squared distance between two vectors.
                 *
                 * @static
                 * @public
                 * @this JuiceBoxEngine.Math.Vector3
                 * @memberof JuiceBoxEngine.Math.Vector3
                 * @param   {JuiceBoxEngine.Math.Vector3}    value1    The first vector.
                 * @param   {JuiceBoxEngine.Math.Vector3}    value2    The second vector.
                 * @return  {number}                                   The squared distance between two vectors.
                 */
                DistanceSquared: function (value1, value2) {
                    return (value1.X - value2.X) * (value1.X - value2.X) + (value1.Y - value2.Y) * (value1.Y - value2.Y) + (value1.Z - value2.Z) * (value1.Z - value2.Z);
                },
                /**
                 * Normalizes the given vector.
                 *
                 * @static
                 * @public
                 * @this JuiceBoxEngine.Math.Vector3
                 * @memberof JuiceBoxEngine.Math.Vector3
                 * @param   {JuiceBoxEngine.Math.Vector3}    vector    The vector to normalize.
                 * @return  {JuiceBoxEngine.Math.Vector3}              A normalized vector.
                 */
                Normalize: function (vector) {
                    vector.Normalize();
                    return vector.$clone();
                },
                /**
                 * Calculates the dot product.
                 *
                 * @static
                 * @public
                 * @this JuiceBoxEngine.Math.Vector3
                 * @memberof JuiceBoxEngine.Math.Vector3
                 * @param   {JuiceBoxEngine.Math.Vector3}    vector1    The first vector.
                 * @param   {JuiceBoxEngine.Math.Vector3}    vector2    The second vector.
                 * @return  {number}                                    The dot product of two vectors.
                 */
                Dot: function (vector1, vector2) {
                    return vector1.X * vector2.X + vector1.Y * vector2.Y + vector1.Z * vector2.Z;
                },
                /**
                 * Calculate the cross product.
                 *
                 * @static
                 * @public
                 * @this JuiceBoxEngine.Math.Vector3
                 * @memberof JuiceBoxEngine.Math.Vector3
                 * @param   {JuiceBoxEngine.Math.Vector3}    vector1    The first vector.
                 * @param   {JuiceBoxEngine.Math.Vector3}    vector2    The second vector.
                 * @return  {JuiceBoxEngine.Math.Vector3}               The cross product of the two vectors.
                 */
                Cross: function (vector1, vector2) {
                    var x = vector1.Y * vector2.Z - vector2.Y * vector1.Z;
                    var y = -(vector1.X * vector2.Z - vector2.X * vector1.Z);
                    var z = vector1.X * vector2.Y - vector2.X * vector1.Y;
                    vector1.X = x;
                    vector1.Y = y;
                    vector1.Z = z;
                    return vector1.$clone();
                }/**
                 * Inverts the vector values.
                 *
                 * @static
                 * @public
                 * @this JuiceBoxEngine.Math.Vector3
                 * @memberof JuiceBoxEngine.Math.Vector3
                 * @param   {JuiceBoxEngine.Math.Vector3}    value    The vector to invert.
                 * @return  {JuiceBoxEngine.Math.Vector3}             Inverted vector.
                 */
                ,
                op_UnaryNegation: function (value) {
                    return new JuiceBoxEngine.Math.Vector3.$ctor2(-value.X, -value.Y, -value.Z);
                }/**
                 * Checks if two vectors are equal.
                 *
                 * @static
                 * @public
                 * @this JuiceBoxEngine.Math.Vector3
                 * @memberof JuiceBoxEngine.Math.Vector3
                 * @param   {JuiceBoxEngine.Math.Vector3}    value1    The first vector.
                 * @param   {JuiceBoxEngine.Math.Vector3}    value2    The second vector.
                 * @return  {boolean}                                  If the two vectors are equal true, otherwise false.
                 */
                ,
                op_Equality: function (value1, value2) {
                    return value1.X === value2.X && value1.Y === value2.Y && value1.Z === value2.Z;
                }/**
                 * Checks if the two vectors are not equal
                 *
                 * @static
                 * @public
                 * @this JuiceBoxEngine.Math.Vector3
                 * @memberof JuiceBoxEngine.Math.Vector3
                 * @param   {JuiceBoxEngine.Math.Vector3}    value1    The first vector.
                 * @param   {JuiceBoxEngine.Math.Vector3}    value2    The second vector.
                 * @return  {boolean}                                  If the two vectors are not equal true, otherwise false.
                 */
                ,
                op_Inequality: function (value1, value2) {
                    return value1.X !== value2.X && value1.Y !== value2.Y && value1.Z !== value2.Z;
                }/**
                 * Adds two vectors.
                 *
                 * @static
                 * @public
                 * @this JuiceBoxEngine.Math.Vector3
                 * @memberof JuiceBoxEngine.Math.Vector3
                 * @param   {JuiceBoxEngine.Math.Vector3}    value1    The first vector.
                 * @param   {JuiceBoxEngine.Math.Vector3}    value2    The second vector.
                 * @return  {JuiceBoxEngine.Math.Vector3}              The sum of the two vectors.
                 */
                ,
                op_Addition: function (value1, value2) {
                    value1.X += value2.X;
                    value1.Y += value2.Y;
                    value1.Z += value2.Z;
                    return value1.$clone();
                }/**
                 * Subtracts two vectors.
                 *
                 * @static
                 * @public
                 * @this JuiceBoxEngine.Math.Vector3
                 * @memberof JuiceBoxEngine.Math.Vector3
                 * @param   {JuiceBoxEngine.Math.Vector3}    value1    The first vector, on the left side.
                 * @param   {JuiceBoxEngine.Math.Vector3}    value2    The second vector, on the right side.
                 * @return  {JuiceBoxEngine.Math.Vector3}              The result of the substraction between the two vectors.
                 */
                ,
                op_Subtraction: function (value1, value2) {
                    value1.X -= value2.X;
                    value1.Y -= value2.Y;
                    value1.Z -= value2.Z;
                    return value1.$clone();
                }/**
                 * Multiplies two vectors.
                 *
                 * @static
                 * @public
                 * @this JuiceBoxEngine.Math.Vector3
                 * @memberof JuiceBoxEngine.Math.Vector3
                 * @param   {JuiceBoxEngine.Math.Vector3}    value1    The first vector.
                 * @param   {JuiceBoxEngine.Math.Vector3}    value2    The second vector.
                 * @return  {JuiceBoxEngine.Math.Vector3}              The multiplication between the given vectors.
                 */
                ,
                op_Multiply: function (value1, value2) {
                    value1.X *= value2.X;
                    value1.Y *= value2.Y;
                    value1.Z *= value2.Z;
                    return value1.$clone();
                }/**
                 * Multiplies a vector by a scalar.
                 *
                 * @static
                 * @public
                 * @this JuiceBoxEngine.Math.Vector3
                 * @memberof JuiceBoxEngine.Math.Vector3
                 * @param   {JuiceBoxEngine.Math.Vector3}    value1    The vector.
                 * @param   {number}                         scalar    The scaler value.
                 * @return  {JuiceBoxEngine.Math.Vector3}              The multiplication between the vector and scalar.
                 */
                ,
                op_Multiply$1: function (value1, scalar) {
                    value1.X *= scalar;
                    value1.Y *= scalar;
                    value1.Z *= scalar;
                    return value1.$clone();
                }/**
                 * Multiplies a vector by a scalar.
                 *
                 * @static
                 * @public
                 * @this JuiceBoxEngine.Math.Vector3
                 * @memberof JuiceBoxEngine.Math.Vector3
                 * @param   {number}                         scalar    The scaler value.
                 * @param   {JuiceBoxEngine.Math.Vector3}    value1    The vector.
                 * @return  {JuiceBoxEngine.Math.Vector3}              The multiplication between the vector and scalar.
                 */
                ,
                op_Multiply$2: function (scalar, value1) {
                    value1.X *= scalar;
                    value1.Y *= scalar;
                    value1.Z *= scalar;
                    return value1.$clone();
                }/**
                 * Divide two vectors.
                 *
                 * @static
                 * @public
                 * @this JuiceBoxEngine.Math.Vector3
                 * @memberof JuiceBoxEngine.Math.Vector3
                 * @param   {JuiceBoxEngine.Math.Vector3}    value1    The first vector, on the left side.
                 * @param   {JuiceBoxEngine.Math.Vector3}    value2    The first vector, on the right side.
                 * @return  {JuiceBoxEngine.Math.Vector3}              The devision between two vectors.
                 */
                ,
                op_Division: function (value1, value2) {
                    value1.X /= value2.X;
                    value1.Y /= value2.Y;
                    value1.Z /= value2.Z;
                    return value1.$clone();
                }/**
                 * Divide a vector by a scalar.
                 *
                 * @static
                 * @public
                 * @this JuiceBoxEngine.Math.Vector3
                 * @memberof JuiceBoxEngine.Math.Vector3
                 * @param   {JuiceBoxEngine.Math.Vector3}    value1     The vector, on the left side.
                 * @param   {number}                         divider    The value to divide by.
                 * @return  {JuiceBoxEngine.Math.Vector3}               The devision the vector and the scalar.
                 */
                ,
                op_Division$1: function (value1, divider) {
                    value1.X /= divider;
                    value1.Y /= divider;
                    value1.Z /= divider;
                    return value1.$clone();
                },
                getDefaultValue: function () { return new JuiceBoxEngine.Math.Vector3(); }
            }
        },
        fields: {
            /**
             * The X-Coordinate.
             *
             * @instance
             * @public
             * @memberof JuiceBoxEngine.Math.Vector3
             * @type number
             */
            X: 0,
            /**
             * The Y-Coordinate.
             *
             * @instance
             * @public
             * @memberof JuiceBoxEngine.Math.Vector3
             * @type number
             */
            Y: 0,
            /**
             * The Z-Coordinate.
             *
             * @instance
             * @public
             * @memberof JuiceBoxEngine.Math.Vector3
             * @type number
             */
            Z: 0
        },
        alias: ["equalsT", "System$IEquatable$1$JuiceBoxEngine$Math$Vector3$equalsT"],
        ctors: {
            /**
             * Constructors 3D vector.
             *
             * @instance
             * @public
             * @this JuiceBoxEngine.Math.Vector3
             * @memberof JuiceBoxEngine.Math.Vector3
             * @param   {number}    x    The X coordinate.
             * @param   {number}    y    The Y coordinate.
             * @param   {number}    z    The Z coordinate.
             * @return  {void}
             */
            $ctor2: function (x, y, z) {
                this.$initialize();
                this.X = x;
                this.Y = y;
                this.Z = z;
            },
            /**
             * Constructs a 4D vector, all values equal to the given value.
             *
             * @instance
             * @public
             * @this JuiceBoxEngine.Math.Vector3
             * @memberof JuiceBoxEngine.Math.Vector3
             * @param   {number}    value    The value for all axis.
             * @return  {void}
             */
            $ctor1: function (value) {
                this.$initialize();
                this.X = value;
                this.Y = value;
                this.Z = value;
            },
            ctor: function () {
                this.$initialize();
            }
        },
        methods: {
            /**
             * Returns the length of this vector.
             *
             * @instance
             * @public
             * @this JuiceBoxEngine.Math.Vector3
             * @memberof JuiceBoxEngine.Math.Vector3
             * @return  {number}        The length.
             */
            Length: function () {
                return JuiceBoxEngine.Math.Math.Sqrt((this.X * this.X) + (this.Y * this.Y) + (this.Z * this.Z));
            },
            /**
             * Returns the squared length of this vector.
             *
             * @instance
             * @public
             * @this JuiceBoxEngine.Math.Vector3
             * @memberof JuiceBoxEngine.Math.Vector3
             * @return  {number}        The squared length.
             */
            LengthSquared: function () {
                return (this.X * this.X) + (this.Y * this.Y) + (this.Z * this.Z);
            },
            /**
             * Makes this vector a normalized one.
             *
             * @instance
             * @public
             * @this JuiceBoxEngine.Math.Vector3
             * @memberof JuiceBoxEngine.Math.Vector3
             * @return  {void}
             */
            Normalize: function () {
                var factor = JuiceBoxEngine.Math.Math.Sqrt((this.X * this.X) + (this.Y * this.Y) + (this.Z * this.Z));
                factor = 1.0 / factor;
                this.X *= factor;
                this.Y *= factor;
                this.Z *= factor;
            },
            /**
             * Gives a string representing the vector.
             *
             * @instance
             * @public
             * @override
             * @this JuiceBoxEngine.Math.Vector3
             * @memberof JuiceBoxEngine.Math.Vector3
             * @return  {string}        String representation of this vector.
             */
            toString: function () {
                return "(" + System.Single.format(this.X) + ", " + System.Single.format(this.Y) + ", " + System.Single.format(this.Z) + ")";
            },
            /**
             * Check if the vector is equal to an other vector.
             *
             * @instance
             * @public
             * @this JuiceBoxEngine.Math.Vector3
             * @memberof JuiceBoxEngine.Math.Vector3
             * @param   {JuiceBoxEngine.Math.Vector3}    other    The vector to check against.
             * @return  {boolean}                                 False if not equal, true if the vectors are equal.
             */
            equalsT: function (other) {
                return this.X === other.X && this.Y === other.Y && this.Z === other.Z;
            },
            /**
             * Check if the vector is equal to the other object.
             *
             * @instance
             * @public
             * @override
             * @this JuiceBoxEngine.Math.Vector3
             * @memberof JuiceBoxEngine.Math.Vector3
             * @param   {System.Object}    o    The object to check against.
             * @return  {boolean}               False if not equal, true if the vectors are equal.
             */
            equals: function (o) {
                if (Bridge.is(o, JuiceBoxEngine.Math.Vector3)) {
                    return this.equalsT(System.Nullable.getValue(Bridge.cast(Bridge.unbox(o), JuiceBoxEngine.Math.Vector3)));
                }
                return false;
            },
            /**
             * Gets the hash code of this vector.
             *
             * @instance
             * @public
             * @override
             * @this JuiceBoxEngine.Math.Vector3
             * @memberof JuiceBoxEngine.Math.Vector3
             * @return  {number}        Hash code of this vector.
             */
            getHashCode: function () {
                var hashCode = System.Single.getHashCode(this.X);
                hashCode = (Bridge.Int.mul(hashCode, 397)) ^ System.Single.getHashCode(this.Y);
                hashCode = (Bridge.Int.mul(hashCode, 397)) ^ System.Single.getHashCode(this.Z);
                return hashCode;
            },
            $clone: function (to) {
                var s = to || new JuiceBoxEngine.Math.Vector3();
                s.X = this.X;
                s.Y = this.Y;
                s.Z = this.Z;
                return s;
            }
        }
    });

    Bridge.define("JuiceBoxEngine.Math.Vector4", {
        inherits: function () { return [System.IEquatable$1(JuiceBoxEngine.Math.Vector4)]; },
        $kind: "struct",
        statics: {
            methods: {
                /**
                 * Returns the distance between two vectors.
                 *
                 * @static
                 * @public
                 * @this JuiceBoxEngine.Math.Vector4
                 * @memberof JuiceBoxEngine.Math.Vector4
                 * @param   {JuiceBoxEngine.Math.Vector4}    value1    The first vector.
                 * @param   {JuiceBoxEngine.Math.Vector4}    value2    The second vector.
                 * @return  {number}                                   The distance between two vectors.
                 */
                Distance: function (value1, value2) {
                    return JuiceBoxEngine.Math.Math.Sqrt(JuiceBoxEngine.Math.Vector4.DistanceSquared(value1.$clone(), value2.$clone()));
                },
                /**
                 * Returns the squared distance between two vectors.
                 *
                 * @static
                 * @public
                 * @this JuiceBoxEngine.Math.Vector4
                 * @memberof JuiceBoxEngine.Math.Vector4
                 * @param   {JuiceBoxEngine.Math.Vector4}    value1    The first vector.
                 * @param   {JuiceBoxEngine.Math.Vector4}    value2    The second vector.
                 * @return  {number}                                   The squared distance between two vectors.
                 */
                DistanceSquared: function (value1, value2) {
                    return (value1.W - value2.W) * (value1.W - value2.W) + (value1.X - value2.X) * (value1.X - value2.X) + (value1.Y - value2.Y) * (value1.Y - value2.Y) + (value1.Z - value2.Z) * (value1.Z - value2.Z);
                },
                /**
                 * Normalizes the given vector.
                 *
                 * @static
                 * @public
                 * @this JuiceBoxEngine.Math.Vector4
                 * @memberof JuiceBoxEngine.Math.Vector4
                 * @param   {JuiceBoxEngine.Math.Vector4}    vector    The vector to normalize.
                 * @return  {JuiceBoxEngine.Math.Vector4}              A normalized vector.
                 */
                Normalize: function (vector) {
                    vector.Normalize();
                    return vector.$clone();
                },
                /**
                 * Calculates the dot product.
                 *
                 * @static
                 * @public
                 * @this JuiceBoxEngine.Math.Vector4
                 * @memberof JuiceBoxEngine.Math.Vector4
                 * @param   {JuiceBoxEngine.Math.Vector4}    vector1    The first vector.
                 * @param   {JuiceBoxEngine.Math.Vector4}    vector2    The second vector.
                 * @return  {number}                                    The dot product of two vectors.
                 */
                Dot: function (vector1, vector2) {
                    return vector1.X * vector2.X + vector1.Y * vector2.Y + vector1.Z * vector2.Z + vector1.W * vector2.W;
                }/**
                 * Inverts the vector values.
                 *
                 * @static
                 * @public
                 * @this JuiceBoxEngine.Math.Vector4
                 * @memberof JuiceBoxEngine.Math.Vector4
                 * @param   {JuiceBoxEngine.Math.Vector4}    value    The vector to invert.
                 * @return  {JuiceBoxEngine.Math.Vector4}             Inverted vector.
                 */
                ,
                op_UnaryNegation: function (value) {
                    return new JuiceBoxEngine.Math.Vector4.$ctor2(-value.X, -value.Y, -value.Z, -value.W);
                }/**
                 * Checks if two vectors are equal.
                 *
                 * @static
                 * @public
                 * @this JuiceBoxEngine.Math.Vector4
                 * @memberof JuiceBoxEngine.Math.Vector4
                 * @param   {JuiceBoxEngine.Math.Vector4}    value1    The first vector.
                 * @param   {JuiceBoxEngine.Math.Vector4}    value2    The second vector.
                 * @return  {boolean}                                  If the two vectors are equal true, otherwise false.
                 */
                ,
                op_Equality: function (value1, value2) {
                    return value1.X === value2.X && value1.Y === value2.Y && value1.Z === value2.Z && value1.W === value2.W;
                }/**
                 * Checks if the two vectors are not equal
                 *
                 * @static
                 * @public
                 * @this JuiceBoxEngine.Math.Vector4
                 * @memberof JuiceBoxEngine.Math.Vector4
                 * @param   {JuiceBoxEngine.Math.Vector4}    value1    The first vector.
                 * @param   {JuiceBoxEngine.Math.Vector4}    value2    The second vector.
                 * @return  {boolean}                                  If the two vectors are not equal true, otherwise false.
                 */
                ,
                op_Inequality: function (value1, value2) {
                    return value1.X !== value2.X && value1.Y !== value2.Y && value1.Z !== value2.Z && value1.W !== value2.W;
                }/**
                 * Adds two vectors.
                 *
                 * @static
                 * @public
                 * @this JuiceBoxEngine.Math.Vector4
                 * @memberof JuiceBoxEngine.Math.Vector4
                 * @param   {JuiceBoxEngine.Math.Vector4}    value1    The first vector.
                 * @param   {JuiceBoxEngine.Math.Vector4}    value2    The second vector.
                 * @return  {JuiceBoxEngine.Math.Vector4}              The sum of the two vectors.
                 */
                ,
                op_Addition: function (value1, value2) {
                    value1.X += value2.X;
                    value1.Y += value2.Y;
                    value1.Z += value2.Z;
                    value1.W += value2.W;
                    return value1.$clone();
                }/**
                 * Subtracts two vectors.
                 *
                 * @static
                 * @public
                 * @this JuiceBoxEngine.Math.Vector4
                 * @memberof JuiceBoxEngine.Math.Vector4
                 * @param   {JuiceBoxEngine.Math.Vector4}    value1    The first vector, on the left side.
                 * @param   {JuiceBoxEngine.Math.Vector4}    value2    The second vector, on the right side.
                 * @return  {JuiceBoxEngine.Math.Vector4}              The result of the substraction between the two vectors.
                 */
                ,
                op_Subtraction: function (value1, value2) {
                    value1.X -= value2.X;
                    value1.Y -= value2.Y;
                    value1.Z -= value2.Z;
                    value1.W -= value2.W;
                    return value1.$clone();
                }/**
                 * Multiplies two vectors.
                 *
                 * @static
                 * @public
                 * @this JuiceBoxEngine.Math.Vector4
                 * @memberof JuiceBoxEngine.Math.Vector4
                 * @param   {JuiceBoxEngine.Math.Vector4}    value1    The first vector.
                 * @param   {JuiceBoxEngine.Math.Vector4}    value2    The second vector.
                 * @return  {JuiceBoxEngine.Math.Vector4}              The multiplication between the given vectors.
                 */
                ,
                op_Multiply: function (value1, value2) {
                    value1.X *= value2.X;
                    value1.Y *= value2.Y;
                    value1.Z *= value2.Z;
                    value1.W *= value2.W;
                    return value1.$clone();
                }/**
                 * Multiplies a vector by a scalar.
                 *
                 * @static
                 * @public
                 * @this JuiceBoxEngine.Math.Vector4
                 * @memberof JuiceBoxEngine.Math.Vector4
                 * @param   {JuiceBoxEngine.Math.Vector4}    value1    The vector.
                 * @param   {number}                         scalar    The scaler value.
                 * @return  {JuiceBoxEngine.Math.Vector4}              The multiplication between the vector and scalar.
                 */
                ,
                op_Multiply$1: function (value1, scalar) {
                    value1.X *= scalar;
                    value1.Y *= scalar;
                    value1.Z *= scalar;
                    value1.W *= scalar;
                    return value1.$clone();
                }/**
                 * Multiplies a vector by a scalar.
                 *
                 * @static
                 * @public
                 * @this JuiceBoxEngine.Math.Vector4
                 * @memberof JuiceBoxEngine.Math.Vector4
                 * @param   {number}                         scalar    The scaler value.
                 * @param   {JuiceBoxEngine.Math.Vector4}    value1    The vector.
                 * @return  {JuiceBoxEngine.Math.Vector4}              The multiplication between the vector and scalar.
                 */
                ,
                op_Multiply$2: function (scalar, value1) {
                    value1.X *= scalar;
                    value1.Y *= scalar;
                    value1.Z *= scalar;
                    value1.W *= scalar;
                    return value1.$clone();
                }/**
                 * Divide two vectors.
                 *
                 * @static
                 * @public
                 * @this JuiceBoxEngine.Math.Vector4
                 * @memberof JuiceBoxEngine.Math.Vector4
                 * @param   {JuiceBoxEngine.Math.Vector4}    value1    The first vector, on the left side.
                 * @param   {JuiceBoxEngine.Math.Vector4}    value2    The first vector, on the right side.
                 * @return  {JuiceBoxEngine.Math.Vector4}              The devision between two vectors.
                 */
                ,
                op_Division: function (value1, value2) {
                    value1.X /= value2.X;
                    value1.Y /= value2.Y;
                    value1.Z /= value2.Z;
                    value1.W /= value2.W;
                    return value1.$clone();
                }/**
                 * Divide a vector by a scalar.
                 *
                 * @static
                 * @public
                 * @this JuiceBoxEngine.Math.Vector4
                 * @memberof JuiceBoxEngine.Math.Vector4
                 * @param   {JuiceBoxEngine.Math.Vector4}    value1     The vector, on the left side.
                 * @param   {number}                         divider    The value to divide by.
                 * @return  {JuiceBoxEngine.Math.Vector4}               The devision the vector and the scalar.
                 */
                ,
                op_Division$1: function (value1, divider) {
                    value1.X /= divider;
                    value1.Y /= divider;
                    value1.Z /= divider;
                    value1.W /= divider;
                    return value1.$clone();
                },
                getDefaultValue: function () { return new JuiceBoxEngine.Math.Vector4(); }
            }
        },
        fields: {
            /**
             * The X-Coordinate.
             *
             * @instance
             * @public
             * @memberof JuiceBoxEngine.Math.Vector4
             * @type number
             */
            X: 0,
            /**
             * The Y-Coordinate.
             *
             * @instance
             * @public
             * @memberof JuiceBoxEngine.Math.Vector4
             * @type number
             */
            Y: 0,
            /**
             * The Z-Coordinate.
             *
             * @instance
             * @public
             * @memberof JuiceBoxEngine.Math.Vector4
             * @type number
             */
            Z: 0,
            /**
             * The W-Coordinate.
             *
             * @instance
             * @public
             * @memberof JuiceBoxEngine.Math.Vector4
             * @type number
             */
            W: 0
        },
        alias: ["equalsT", "System$IEquatable$1$JuiceBoxEngine$Math$Vector4$equalsT"],
        ctors: {
            /**
             * Constructors 4D vector.
             *
             * @instance
             * @public
             * @this JuiceBoxEngine.Math.Vector4
             * @memberof JuiceBoxEngine.Math.Vector4
             * @param   {number}    x    The X coordinate.
             * @param   {number}    y    The Y coordinate.
             * @param   {number}    z    The Z coordinate.
             * @param   {number}    w    The W coordinate.
             * @return  {void}
             */
            $ctor2: function (x, y, z, w) {
                this.$initialize();
                this.X = x;
                this.Y = y;
                this.Z = z;
                this.W = w;
            },
            /**
             * Constructs a 4D vector, all values equal to the given value.
             *
             * @instance
             * @public
             * @this JuiceBoxEngine.Math.Vector4
             * @memberof JuiceBoxEngine.Math.Vector4
             * @param   {number}    value    The value for all axis.
             * @return  {void}
             */
            $ctor1: function (value) {
                this.$initialize();
                this.X = value;
                this.Y = value;
                this.Z = value;
                this.W = value;
            },
            ctor: function () {
                this.$initialize();
            }
        },
        methods: {
            /**
             * Returns the length of this vector.
             *
             * @instance
             * @public
             * @this JuiceBoxEngine.Math.Vector4
             * @memberof JuiceBoxEngine.Math.Vector4
             * @return  {number}        The length.
             */
            Length: function () {
                return JuiceBoxEngine.Math.Math.Sqrt((this.X * this.X) + (this.Y * this.Y) + (this.Z * this.Z) + (this.W * this.W));
            },
            /**
             * Returns the squared length of this vector.
             *
             * @instance
             * @public
             * @this JuiceBoxEngine.Math.Vector4
             * @memberof JuiceBoxEngine.Math.Vector4
             * @return  {number}        The squared length.
             */
            LengthSquared: function () {
                return (this.X * this.X) + (this.Y * this.Y) + (this.Z * this.Z) + (this.W * this.W);
            },
            /**
             * Makes this vector a normalized one.
             *
             * @instance
             * @public
             * @this JuiceBoxEngine.Math.Vector4
             * @memberof JuiceBoxEngine.Math.Vector4
             * @return  {void}
             */
            Normalize: function () {
                var factor = JuiceBoxEngine.Math.Math.Sqrt((this.X * this.X) + (this.Y * this.Y) + (this.Z * this.Z) + (this.W * this.W));
                factor = 1.0 / factor;
                this.X *= factor;
                this.Y *= factor;
                this.Z *= factor;
                this.W *= factor;
            },
            /**
             * Gives a string representing the vector.
             *
             * @instance
             * @public
             * @override
             * @this JuiceBoxEngine.Math.Vector4
             * @memberof JuiceBoxEngine.Math.Vector4
             * @return  {string}        String representation of this vector.
             */
            toString: function () {
                return "(" + System.Single.format(this.X) + ", " + System.Single.format(this.Y) + ", " + System.Single.format(this.Z) + ", " + System.Single.format(this.W) + ")";
            },
            /**
             * Check if the vector is equal to an other vector.
             *
             * @instance
             * @public
             * @this JuiceBoxEngine.Math.Vector4
             * @memberof JuiceBoxEngine.Math.Vector4
             * @param   {JuiceBoxEngine.Math.Vector4}    other    The vector to check against.
             * @return  {boolean}                                 False if not equal, true if the vectors are equal.
             */
            equalsT: function (other) {
                return this.X === other.X && this.Y === other.Y && this.Z === other.Z && this.W === other.W;
            },
            /**
             * Check if the vector is equal to the other object.
             *
             * @instance
             * @public
             * @override
             * @this JuiceBoxEngine.Math.Vector4
             * @memberof JuiceBoxEngine.Math.Vector4
             * @param   {System.Object}    o    The object to check against.
             * @return  {boolean}               False if not equal, true if the vectors are equal.
             */
            equals: function (o) {
                if (Bridge.is(o, JuiceBoxEngine.Math.Vector4)) {
                    return this.equalsT(System.Nullable.getValue(Bridge.cast(Bridge.unbox(o), JuiceBoxEngine.Math.Vector4)));
                }
                return false;
            },
            /**
             * Gets the hash code of this vector.
             *
             * @instance
             * @public
             * @override
             * @this JuiceBoxEngine.Math.Vector4
             * @memberof JuiceBoxEngine.Math.Vector4
             * @return  {number}        Hash code of this vector.
             */
            getHashCode: function () {
                var hashCode = System.Single.getHashCode(this.X);
                hashCode = (Bridge.Int.mul(hashCode, 397)) ^ System.Single.getHashCode(this.Y);
                hashCode = (Bridge.Int.mul(hashCode, 397)) ^ System.Single.getHashCode(this.Z);
                hashCode = (Bridge.Int.mul(hashCode, 397)) ^ System.Single.getHashCode(this.W);
                return hashCode;
            },
            $clone: function (to) {
                var s = to || new JuiceBoxEngine.Math.Vector4();
                s.X = this.X;
                s.Y = this.Y;
                s.Z = this.Z;
                s.W = this.W;
                return s;
            }
        }
    });

    Bridge.define("JuiceBoxEngine.Resources.ResourceManager", {
        fields: {
            _resources: null,
            _resourceManagers: null
        },
        ctors: {
            /**
             * Constructor.
             *
             * @instance
             * @public
             * @this JuiceBoxEngine.Resources.ResourceManager
             * @memberof JuiceBoxEngine.Resources.ResourceManager
             * @return  {void}
             */
            ctor: function () {
                this.$initialize();
                this._resources = new (System.Collections.Generic.Dictionary$2(System.String,JuiceBoxEngine.Resources.IResource))();
                this._resourceManagers = new (System.Collections.Generic.Dictionary$2(System.String,JuiceBoxEngine.Resources.ResourceLoader))();
            }
        },
        methods: {
            /**
             * Register an resource manager.
             *
             * @instance
             * @public
             * @this JuiceBoxEngine.Resources.ResourceManager
             * @memberof JuiceBoxEngine.Resources.ResourceManager
             * @param   {JuiceBoxEngine.Resources.ResourceLoader}    manager    The resource manager to register.
             * @return  {void}
             */
            RegisterResourceManager: function (manager) {
                this._resourceManagers.add(manager.Extension, manager);

            },
            Load: function (T, path) {
                return Bridge.cast(Bridge.unbox(this.Load$1(path)), T);
            },
            /**
             * Load a resource with all registered {@link }s.
             *
             * @instance
             * @public
             * @this JuiceBoxEngine.Resources.ResourceManager
             * @memberof JuiceBoxEngine.Resources.ResourceManager
             * @param   {string}                                path    The path to the resource with extension.
             * @return  {JuiceBoxEngine.Resources.IResource}            Null it could not be loaded, or the loaded resource.
             */
            Load$1: function (path) {
                var $t;
                // If the resource exists, no need to load it again.
                if (this._resources.containsKey(path)) {
                    return this._resources.get(path);
                }

                // Try to load the resource.
                try {
                    var extension = ($t = System.String.split(path, [46].map(function(i) {{ return String.fromCharCode(i); }})))[System.Array.index(1, $t)];
                    var resource = this._resourceManagers.get(extension).Load(path);

                    if (resource == null) {
                        throw new System.Exception("File " + (path || "") + "not found!");
                    }

                    this._resources.add(path, resource);

                    return resource;
                }
                catch ($e1) {
                    $e1 = System.Exception.create($e1);
                    System.Console.WriteLine("Unable to load " + (path || ""));
                }

                return null;
            }
        }
    });

    Bridge.define("JuiceBoxEngine.Scene.GameObject", {
        fields: {
            /**
             * The name of the game object.
             *
             * @instance
             * @public
             * @memberof JuiceBoxEngine.Scene.GameObject
             * @function Name
             * @type string
             */
            Name: null,
            /**
             * Disabled game objects won't receive any updates. They won't update their components.
             *
             * @instance
             * @public
             * @memberof JuiceBoxEngine.Scene.GameObject
             * @function Enabled
             * @type boolean
             */
            Enabled: false,
            _components: null,
            _graphicsComponents: null,
            _currentScene: null,
            Transform: null
        },
        ctors: {
            /**
             * Constructor.
             *
             * @instance
             * @public
             * @this JuiceBoxEngine.Scene.GameObject
             * @memberof JuiceBoxEngine.Scene.GameObject
             * @param   {JuiceBoxEngine.Scene.Scene}    parent    The scene this object is in.
             * @return  {void}
             */
            ctor: function (parent) {
                this.$initialize();
                this._currentScene = parent;
                this.Name = "Gameobject";
                this._components = new (System.Collections.Generic.List$1(JuiceBoxEngine.Scene.IComponent)).ctor();
                this._graphicsComponents = new (System.Collections.Generic.List$1(JuiceBoxEngine.Graphics.GraphicsComponent)).ctor();
                this.Transform = this.AddComponent(JuiceBoxEngine.Scene.Transform);
                this.Enabled = true;
            },
            /**
             * Constructor.
             *
             * @instance
             * @public
             * @this JuiceBoxEngine.Scene.GameObject
             * @memberof JuiceBoxEngine.Scene.GameObject
             * @param   {JuiceBoxEngine.Scene.Scene}    parent    The scene this object is in.
             * @param   {string}                        name      The name of the game object.
             * @return  {void}
             */
            $ctor1: function (parent, name) {
                JuiceBoxEngine.Scene.GameObject.ctor.call(this, parent);
                this.Name = name;
            }
        },
        methods: {
            /**
             * Called every frame.
             *
             * @instance
             * @public
             * @this JuiceBoxEngine.Scene.GameObject
             * @memberof JuiceBoxEngine.Scene.GameObject
             * @return  {void}
             */
            Update: function () {
                for (var i = 0; i < this._components.Count; i = (i + 1) | 0) {
                    if (this._components.getItem(i).JuiceBoxEngine$Scene$IComponent$Enabled) {
                        this._components.getItem(i).JuiceBoxEngine$Scene$IComponent$Update();
                    }
                }
            },
            /**
             * Called every frame for rendering.
             *
             * @instance
             * @public
             * @this JuiceBoxEngine.Scene.GameObject
             * @memberof JuiceBoxEngine.Scene.GameObject
             * @return  {void}
             */
            Render: function () {
                for (var i = 0; i < this._graphicsComponents.Count; i = (i + 1) | 0) {
                    if (this._graphicsComponents.getItem(i).Enabled) {
                        this._graphicsComponents.getItem(i).Render();
                    }
                }
            },
            /**
             * Adds component T to the gameobject.
             *
             * @instance
             * @public
             * @this JuiceBoxEngine.Scene.GameObject
             * @memberof JuiceBoxEngine.Scene.GameObject
             * @param   {Function}    T    The type to add, must be a IComponent.
             * @return  {T}                The newly created component. Null if the object could not be added.
             */
            AddComponent: function (T) {
                var val = this.GetComponent(T);
                if (val == null || !val.JuiceBoxEngine$Scene$IComponent$Unique()) {
                    var newComp = Bridge.createInstance(T);

                    this._components.add(newComp);
                    newComp.JuiceBoxEngine$Scene$IComponent$Parent = this;
                    newComp.JuiceBoxEngine$Scene$IComponent$Enabled = true;

                    // Keep track of graphicscomponents.
                    if (Bridge.is(newComp, JuiceBoxEngine.Graphics.GraphicsComponent)) {
                        this._graphicsComponents.add(Bridge.as(newComp, JuiceBoxEngine.Graphics.GraphicsComponent));
                    }

                    // Register camera to the scene.
                    if (Bridge.is(newComp, JuiceBoxEngine.Scene.Camera)) {
                        this._currentScene.AddCamera(Bridge.as(newComp, JuiceBoxEngine.Scene.Camera));
                    }

                    if (Bridge.is(newComp, JuiceBoxEngine.Scene.Collider)) {
                        (Bridge.as(newComp, JuiceBoxEngine.Scene.Collider)).SetWorld(this._currentScene.GetWorld());
                    }

                    newComp.JuiceBoxEngine$Scene$IComponent$Initialize(this._currentScene.ResourceManager);

                    return newComp;
                }

                return Bridge.getDefaultValue(T);
            },
            /**
             * Gets the component from a game object.
             *
             * @instance
             * @public
             * @this JuiceBoxEngine.Scene.GameObject
             * @memberof JuiceBoxEngine.Scene.GameObject
             * @param   {Function}    T    The component type to get.
             * @return  {T}                The component, or null if not found.
             */
            GetComponent: function (T) {
                var retval = Bridge.cast(Bridge.unbox(System.Linq.Enumerable.from(this._components).where(function (x) {
                        return Bridge.is(x, T);
                    }).firstOrDefault(null, null)), T);
                return retval;
            }
        }
    });

    Bridge.define("JuiceBoxEngine.Scene.Scene", {
        fields: {
            /**
             * All Gameobjects of this scene are stored here.
             *
             * @instance
             * @private
             * @memberof JuiceBoxEngine.Scene.Scene
             * @type System.Collections.Generic.List$1
             */
            _objects: null,
            /**
             * All camera components of the scene are cached here.
             *
             * @instance
             * @private
             * @memberof JuiceBoxEngine.Scene.Scene
             * @type System.Collections.Generic.List$1
             */
            _cameras: null,
            DefaultCamera: null,
            /**
             * The resource manager for this scene.
             *
             * @instance
             * @public
             * @memberof JuiceBoxEngine.Scene.Scene
             * @function ResourceManager
             * @type JuiceBoxEngine.Resources.ResourceManager
             */
            ResourceManager: null,
            /**
             * The fade texture for the scene. Is a grayscale texture.
             *
             * @instance
             * @memberof JuiceBoxEngine.Scene.Scene
             * @function FadeTexture
             * @type JuiceBoxEngine.Graphics.Texture2D
             */
            FadeTexture: null,
            /**
             * Amount the screen fade is present. (0.0 is not, 1.0 is fully black)
             *
             * @instance
             * @memberof JuiceBoxEngine.Scene.Scene
             * @function FadeAmount
             * @type number
             */
            FadeAmount: 0,
            _world: null
        },
        ctors: {
            /**
             * Default constructor.
             *
             * @instance
             * @public
             * @this JuiceBoxEngine.Scene.Scene
             * @memberof JuiceBoxEngine.Scene.Scene
             * @param   {JuiceBoxEngine.Resources.ResourceManager}    manager
             * @return  {void}
             */
            ctor: function (manager) {
                this.$initialize();
                this._objects = new (System.Collections.Generic.List$1(JuiceBoxEngine.Scene.GameObject)).ctor();
                this._cameras = new (System.Collections.Generic.List$1(JuiceBoxEngine.Scene.Camera)).ctor();

                this.ResourceManager = manager;

                this._world = new Humper.World(512.0, 512.0, 16.0);

                // Get the pixel size stored in the config.
                var pixelSize = JuiceBoxEngine.Util.Config.Instance.ConfigValues.PixelSize;

                // Default scene stuffs.
                var cameraObj = this.AddGameObject$1("Camera");
                this.DefaultCamera = cameraObj.AddComponent(JuiceBoxEngine.Scene.Camera);
                this.DefaultCamera.Target = new JuiceBoxEngine.Graphics.RenderTarget(((Bridge.Int.div(JuiceBoxEngine.Graphics.GraphicsManager.Instance.Width, pixelSize)) | 0), ((Bridge.Int.div(JuiceBoxEngine.Graphics.GraphicsManager.Instance.Height, pixelSize)) | 0));
                this.DefaultCamera.PixelSize = pixelSize;
                this.DefaultCamera.ClearColor = new JuiceBoxEngine.Math.Color32.$ctor2(0.1, 0.1, 0.1, 1.0);
            }
        },
        methods: {
            /**
             * Add an empty gameobject to the scene.
             *
             * @instance
             * @public
             * @this JuiceBoxEngine.Scene.Scene
             * @memberof JuiceBoxEngine.Scene.Scene
             * @return  {JuiceBoxEngine.Scene.GameObject}        The created gameobject.
             */
            AddGameObject: function () {
                return this.AddGameObject$1("Gameobject");
            },
            /**
             * Add an empty gameobject to the scene.
             *
             * @instance
             * @public
             * @this JuiceBoxEngine.Scene.Scene
             * @memberof JuiceBoxEngine.Scene.Scene
             * @param   {string}                             name    Name of the object.
             * @return  {JuiceBoxEngine.Scene.GameObject}            The created gameobject.
             */
            AddGameObject$1: function (name) {
                var obj = new JuiceBoxEngine.Scene.GameObject.$ctor1(this, name);
                this._objects.add(obj);

                return obj;
            },
            /**
             * Get an object by name.
             *
             * @instance
             * @public
             * @this JuiceBoxEngine.Scene.Scene
             * @memberof JuiceBoxEngine.Scene.Scene
             * @param   {string}                             name    The name of the object.
             * @return  {JuiceBoxEngine.Scene.GameObject}            The object with the given name, null if no object was found.
             */
            GetObjectByName: function (name) {
                return System.Linq.Enumerable.from(this._objects).where(function (x) {
                        return System.String.equals(x.Name, name);
                    }).firstOrDefault(null, null);
            },
            /**
             * Get the physics simulation world.
             *
             * @instance
             * @this JuiceBoxEngine.Scene.Scene
             * @memberof JuiceBoxEngine.Scene.Scene
             * @return  {Humper.World}
             */
            GetWorld: function () {
                return this._world;
            },
            /**
             * Register a camera to the scene. (this is done automaticly by GameObject).
             *
             * @instance
             * @this JuiceBoxEngine.Scene.Scene
             * @memberof JuiceBoxEngine.Scene.Scene
             * @param   {JuiceBoxEngine.Scene.Camera}    cam
             * @return  {void}
             */
            AddCamera: function (cam) {
                this._cameras.add(cam);
            },
            /**
             * Called on the start of the scene.
             *
             * @instance
             * @public
             * @this JuiceBoxEngine.Scene.Scene
             * @memberof JuiceBoxEngine.Scene.Scene
             * @return  {void}
             */
            Start: function () {

            },
            /**
             * Update the scene, and all of its gameobjects.
             *
             * @instance
             * @public
             * @this JuiceBoxEngine.Scene.Scene
             * @memberof JuiceBoxEngine.Scene.Scene
             * @return  {void}
             */
            Update: function () {
                for (var i = 0; i < this._objects.Count; i = (i + 1) | 0) {
                    if (this._objects.getItem(i).Enabled) {
                        this._objects.getItem(i).Update();
                    }
                }
            },
            /**
             * Render the scene.
             *
             * @instance
             * @public
             * @this JuiceBoxEngine.Scene.Scene
             * @memberof JuiceBoxEngine.Scene.Scene
             * @return  {void}
             */
            Render: function () {
                var $t, $t1;
                // Render each camera.
                $t = Bridge.getEnumerator(this._cameras);
                try {
                    while ($t.moveNext()) {
                        var cam = $t.Current;
                        if (!cam.Enabled) {
                            continue;
                        }

                        JuiceBoxEngine.Graphics.GraphicsManager.Instance.Context.SetRenderTarget(cam.Target);
                        JuiceBoxEngine.Graphics.GraphicsManager.Instance.Context.Clear(cam.ClearColor.$clone());

                        // Set camrea matrixes.
                        JuiceBoxEngine.Graphics.GraphicsManager.Instance.Context.SetGlobalShaderValue(JuiceBoxEngine.Graphics.DefaultShaderValues.VIEW, cam.ViewMatrix.$clone());
                        JuiceBoxEngine.Graphics.GraphicsManager.Instance.Context.SetGlobalShaderValue(JuiceBoxEngine.Graphics.DefaultShaderValues.PROJ, cam.ProjMatrix.$clone());
                        var transform = cam.Parent.GetComponent(JuiceBoxEngine.Scene.Transform);
                        JuiceBoxEngine.Graphics.GraphicsManager.Instance.Context.SetGlobalShaderValue(JuiceBoxEngine.Graphics.DefaultShaderValues.CAMERAPOSITION, new JuiceBoxEngine.Math.Vector3.$ctor2(JuiceBoxEngine.Math.Math.Round(transform.Position.X), JuiceBoxEngine.Math.Math.Round(transform.Position.Y), Bridge.Int.clip32(transform.Position.Z)).$clone());

                        // Go through all objects.
                        for (var i = 0; i < this._objects.Count; i = (i + 1) | 0) {
                            if (this._objects.getItem(i).Enabled) {
                                this._objects.getItem(i).Render();
                            }
                        }

                        JuiceBoxEngine.Graphics.Debugging.DebugRenderer.Instance.Render();
                    }
                } finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$dispose();
                    }
                }
                JuiceBoxEngine.Graphics.GraphicsManager.Instance.Context.SetRenderTarget(null);

                // Render each camera to the backbuffer.
                $t1 = Bridge.getEnumerator(this._cameras);
                try {
                    while ($t1.moveNext()) {
                        var cam1 = $t1.Current;
                        cam1.PostProcess();
                        JuiceBoxEngine.Graphics.GraphicsManager.Instance.RenderCamera(cam1, this);
                    }
                } finally {
                    if (Bridge.is($t1, System.IDisposable)) {
                        $t1.System$IDisposable$dispose();
                    }
                }
                // Render UI.
                //manager.StartUI();
                //manager.GUIRender(text);
                //manager.EndUI();
            }
        }
    });

    Bridge.define("JuiceBoxEngine.Util.Config", {
        statics: {
            fields: {
                _config: null
            },
            props: {
                Instance: {
                    get: function () {
                        if (JuiceBoxEngine.Util.Config._config == null) {
                            JuiceBoxEngine.Util.Config._config = new JuiceBoxEngine.Util.Config();
                        }
                        return JuiceBoxEngine.Util.Config._config;
                    }
                }
            }
        },
        fields: {
            ConfigValues: null
        },
        ctors: {
            /**
             * Private constructor.
             *
             * @instance
             * @private
             * @this JuiceBoxEngine.Util.Config
             * @memberof JuiceBoxEngine.Util.Config
             * @return  {void}
             */
            ctor: function () {
                this.$initialize();
                this.ConfigValues = Bridge.merge(Bridge.createInstance(JuiceBoxEngine.Util.ConfigModel), JSON.parse(System.IO.File.ReadAllText("config.txt")));
            }
        }
    });

    Bridge.define("JuiceBoxEngine.Util.ConfigModel", {
        fields: {
            /**
             * Size of the on screen pixels.
             *
             * @instance
             * @public
             * @memberof JuiceBoxEngine.Util.ConfigModel
             * @function PixelSize
             * @type number
             */
            PixelSize: 0
        }
    });

    Bridge.define("JuiceBoxEngine.Util.Time", {
        statics: {
            fields: {
                /**
                 * Total amount of seconds gone by since startup.
                 *
                 * @static
                 * @public
                 * @memberof JuiceBoxEngine.Util.Time
                 * @function TotalSeconds
                 * @type number
                 */
                TotalSeconds: 0,
                /**
                 * Time of the previous frame.
                 *
                 * @static
                 * @public
                 * @memberof JuiceBoxEngine.Util.Time
                 * @function DeltaTime
                 * @type number
                 */
                DeltaTime: 0,
                DeltaTimeRealTime: 0,
                /**
                 * The current rate of time.
                 *
                 * @static
                 * @public
                 * @memberof JuiceBoxEngine.Util.Time
                 * @function TimeScale
                 * @type number
                 */
                TimeScale: 0,
                _previous: null
            },
            ctors: {
                init: function () {
                    this._previous = System.DateTime.getDefaultValue();
                    this.TimeScale = 1;
                    this._previous = System.DateTime.getNow();
                }
            },
            methods: {
                /**
                 * Update the time.
                 *
                 * @static
                 * @public
                 * @this JuiceBoxEngine.Util.Time
                 * @memberof JuiceBoxEngine.Util.Time
                 * @return  {void}
                 */
                Update: function () {
                    if (Bridge.equals(JuiceBoxEngine.Util.Time._previous, null)) {
                        JuiceBoxEngine.Util.Time._previous = System.DateTime.getNow();
                    }

                    var now = System.DateTime.getNow();

                    var span = System.DateTime.subdd(now, JuiceBoxEngine.Util.Time._previous);

                    JuiceBoxEngine.Util.Time.TotalSeconds += span.getTotalSeconds();
                    JuiceBoxEngine.Util.Time.DeltaTime = span.getTotalSeconds() * JuiceBoxEngine.Util.Time.TimeScale;
                    JuiceBoxEngine.Util.Time.DeltaTimeRealTime = span.getTotalSeconds();

                    JuiceBoxEngine.Util.Time._previous = now;
                }
            }
        }
    });

    Bridge.define("Humper.Box", {
        inherits: [Humper.IBox],
        fields: {
            world: null,
            bounds: null,
            Data: null
        },
        props: {
            Bounds: {
                get: function () {
                    return this.bounds.$clone();
                }
            },
            Height: {
                get: function () {
                    return this.Bounds.Height;
                }
            },
            Width: {
                get: function () {
                    return this.Bounds.Width;
                }
            },
            X: {
                get: function () {
                    return this.Bounds.X;
                }
            },
            Y: {
                get: function () {
                    return this.Bounds.Y;
                }
            }
        },
        alias: [
            "Bounds", "Humper$IBox$Bounds",
            "Data", "Humper$IBox$Data",
            "Height", "Humper$IBox$Height",
            "Width", "Humper$IBox$Width",
            "X", "Humper$IBox$X",
            "Y", "Humper$IBox$Y",
            "Simulate$1", "Humper$IBox$Simulate$1",
            "Simulate", "Humper$IBox$Simulate",
            "Move$1", "Humper$IBox$Move$1",
            "Move", "Humper$IBox$Move"
        ],
        ctors: {
            init: function () {
                this.bounds = new Humper.Base.RectangleF();
            },
            ctor: function (world, x, y, width, height) {
                this.$initialize();
                this.world = world;
                this.bounds = new Humper.Base.RectangleF.$ctor3(x, y, width, height);
            }
        },
        methods: {
            Simulate$1: function (x, y, filter) {
                return this.world.Simulate(this, x, y, filter);
            },
            Simulate: function (x, y, filter) {
                return this.Move$1(x, y, function (col) {
                    if (col.Humper$ICollision$Hit == null) {
                        return null;
                    }

                    return Humper.Responses.CollisionResponse.Create(col, filter(col));
                });
            },
            Move$1: function (x, y, filter) {
                var movement = this.Simulate$1(x, y, filter);
                this.bounds.X = movement.Humper$IMovement$Destination.X;
                this.bounds.Y = movement.Humper$IMovement$Destination.Y;
                this.world.Update(this, movement.Humper$IMovement$Origin.$clone());
                return movement;
            },
            Move: function (x, y, filter) {
                var movement = this.Simulate(x, y, filter);
                this.bounds.X = movement.Humper$IMovement$Destination.X;
                this.bounds.Y = movement.Humper$IMovement$Destination.Y;
                this.world.Update(this, movement.Humper$IMovement$Origin.$clone());
                return movement;
            }
        }
    });

    Bridge.define("Humper.Collision", {
        inherits: [Humper.ICollision],
        fields: {
            Box: null,
            Origin: null,
            Goal: null,
            Hit: null
        },
        props: {
            Other: {
                get: function () {
                    var $t;
                    return ($t = this.Hit) != null ? $t.Humper$IHit$Box : null;
                }
            },
            HasCollided: {
                get: function () {
                    return this.Hit != null;
                }
            }
        },
        alias: [
            "Box", "Humper$ICollision$Box",
            "Other", "Humper$ICollision$Other",
            "Origin", "Humper$ICollision$Origin",
            "Goal", "Humper$ICollision$Goal",
            "Hit", "Humper$ICollision$Hit"
        ],
        ctors: {
            init: function () {
                this.Origin = new Humper.Base.RectangleF();
                this.Goal = new Humper.Base.RectangleF();
            },
            ctor: function () {
                this.$initialize();
            }
        }
    });

    Bridge.define("Humper.Hit", {
        inherits: [Humper.IHit],
        statics: {
            methods: {
                Resolve$2: function (origin, destination, other) {
                    var result = Humper.Hit.Resolve(origin.$clone(), destination.$clone(), other.Humper$IBox$Bounds.$clone());
                    if (result != null) {
                        result.Box = other;
                    }
                    return result;
                },
                Resolve$3: function (origin, destination, other) {
                    var result = Humper.Hit.Resolve$1(origin.$clone(), destination.$clone(), other.Humper$IBox$Bounds.$clone());
                    if (result != null) {
                        result.Box = other;
                    }
                    return result;
                },
                Resolve: function (origin, destination, other) {
                    var broadphaseArea = Humper.Base.RectangleF.Union(origin.$clone(), destination.$clone());

                    if (broadphaseArea.Intersects(other.$clone()) || broadphaseArea.Contains(other.$clone())) {
                        return Humper.Hit.ResolveNarrow(origin.$clone(), destination.$clone(), other.$clone());
                    }

                    return null;
                },
                Resolve$1: function (origin, destination, other) {
                    var min = Humper.Base.Vector2.Min(origin.$clone(), destination.$clone());
                    var size = Humper.Base.Vector2.op_Subtraction(Humper.Base.Vector2.Max(origin.$clone(), destination.$clone()), min.$clone());

                    var broadphaseArea = new Humper.Base.RectangleF.$ctor2(min.$clone(), size.$clone());

                    if (broadphaseArea.Intersects(other.$clone()) || broadphaseArea.Contains(other.$clone())) {
                        return Humper.Hit.ResolveNarrow$1(origin.$clone(), destination.$clone(), other.$clone());
                    }

                    return null;
                },
                Resolve$4: function (point, other) {
                    var $t;
                    if (other.Humper$IBox$Bounds.Contains$1(point.$clone())) {
                        var outside = Humper.Hit.PushOutside$1(point.$clone(), other.Humper$IBox$Bounds.$clone());
                        return ($t = new Humper.Hit(), $t.Amount = 0, $t.Box = other, $t.Position = outside.item1.$clone(), $t.Normal = outside.item2.$clone(), $t);
                    }

                    return null;
                },
                PushOutside$1: function (origin, other) {
                    var position = origin.$clone();
                    var normal = Humper.Base.Vector2.Zero.$clone();

                    var top = origin.Y - other.Top;
                    var bottom = other.Bottom - origin.Y;
                    var left = origin.X - other.Left;
                    var right = other.Right - origin.X;

                    var min = Math.min(top, Math.min(bottom, Math.min(right, left)));

                    if (Math.abs(min - top) < Humper.Base.Constants.Threshold) {
                        normal = Humper.Base.Vector2.op_UnaryNegation(Humper.Base.Vector2.UnitY.$clone());
                        position = new Humper.Base.Vector2.$ctor2(position.X, other.Top);
                    } else if (Math.abs(min - bottom) < Humper.Base.Constants.Threshold) {
                        normal = Humper.Base.Vector2.UnitY.$clone();
                        position = new Humper.Base.Vector2.$ctor2(position.X, other.Bottom);
                    } else if (Math.abs(min - left) < Humper.Base.Constants.Threshold) {
                        normal = Humper.Base.Vector2.op_UnaryNegation(Humper.Base.Vector2.UnitX.$clone());
                        position = new Humper.Base.Vector2.$ctor2(other.Left, position.Y);
                    } else if (Math.abs(min - right) < Humper.Base.Constants.Threshold) {
                        normal = Humper.Base.Vector2.UnitX.$clone();
                        position = new Humper.Base.Vector2.$ctor2(other.Right, position.Y);
                    }

                    return { item1: position.$clone(), item2: normal.$clone() };
                },
                PushOutside: function (origin, other) {
                    var position = origin.$clone();
                    var normal = Humper.Base.Vector2.Zero.$clone();

                    var top = origin.Center.Y - other.Top;
                    var bottom = other.Bottom - origin.Center.Y;
                    var left = origin.Center.X - other.Left;
                    var right = other.Right - origin.Center.X;

                    var min = Math.min(top, Math.min(bottom, Math.min(right, left)));

                    if (Math.abs(min - top) < Humper.Base.Constants.Threshold) {
                        normal = Humper.Base.Vector2.op_UnaryNegation(Humper.Base.Vector2.UnitY.$clone());
                        position.Location = new Humper.Base.Vector2.$ctor2(position.Location.X, other.Top - position.Height);
                    } else if (Math.abs(min - bottom) < Humper.Base.Constants.Threshold) {
                        normal = Humper.Base.Vector2.UnitY.$clone();
                        position.Location = new Humper.Base.Vector2.$ctor2(position.Location.X, other.Bottom);
                    } else if (Math.abs(min - left) < Humper.Base.Constants.Threshold) {
                        normal = Humper.Base.Vector2.op_UnaryNegation(Humper.Base.Vector2.UnitX.$clone());
                        position.Location = new Humper.Base.Vector2.$ctor2(other.Left - position.Width, position.Location.Y);
                    } else if (Math.abs(min - right) < Humper.Base.Constants.Threshold) {
                        normal = Humper.Base.Vector2.UnitX.$clone();
                        position.Location = new Humper.Base.Vector2.$ctor2(other.Right, position.Location.Y);
                    }

                    return { item1: position.$clone(), item2: normal.$clone() };
                },
                ResolveNarrow: function (origin, destination, other) {
                    var $t;
                    // if starts inside, push it outside at the neareast place
                    if (other.Contains(origin.$clone()) || other.Intersects(origin.$clone())) {
                        var outside = Humper.Hit.PushOutside(origin.$clone(), other.$clone());
                        return ($t = new Humper.Hit(), $t.Amount = 0, $t.Position = outside.item1.Location.$clone(), $t.Normal = outside.item2.$clone(), $t);
                    }

                    var velocity = (Humper.Base.Vector2.op_Subtraction(destination.Location.$clone(), origin.Location.$clone()));

                    var invEntry = new Humper.Base.Vector2(), invExit = new Humper.Base.Vector2(), entry = new Humper.Base.Vector2(), exit = new Humper.Base.Vector2();

                    if (velocity.X > 0) {
                        invEntry.X = other.Left - origin.Right;
                        invExit.X = other.Right - origin.Left;
                    } else {
                        invEntry.X = other.Right - origin.Left;
                        invExit.X = other.Left - origin.Right;
                    }

                    if (velocity.Y > 0) {
                        invEntry.Y = other.Top - origin.Bottom;
                        invExit.Y = other.Bottom - origin.Top;
                    } else {
                        invEntry.Y = other.Bottom - origin.Top;
                        invExit.Y = other.Top - origin.Bottom;
                    }

                    if (Math.abs(velocity.X) < Humper.Base.Constants.Threshold) {
                        entry.X = -3.40282347E+38;
                        exit.X = 3.40282347E+38;
                    } else {
                        entry.X = invEntry.X / velocity.X;
                        exit.X = invExit.X / velocity.X;
                    }

                    if (Math.abs(velocity.Y) < Humper.Base.Constants.Threshold) {
                        entry.Y = -3.40282347E+38;
                        exit.Y = 3.40282347E+38;
                    } else {
                        entry.Y = invEntry.Y / velocity.Y;
                        exit.Y = invExit.Y / velocity.Y;
                    }

                    if (entry.Y > 1.0) {
                        entry.Y = -3.40282347E+38;
                    }
                    if (entry.X > 1.0) {
                        entry.X = -3.40282347E+38;
                    }

                    var entryTime = Math.max(entry.X, entry.Y);
                    var exitTime = Math.min(exit.X, exit.Y);

                    if ((entryTime > exitTime || entry.X < 0.0 && entry.Y < 0.0) || (entry.X < 0.0 && (origin.Right < other.Left || origin.Left > other.Right)) || entry.Y < 0.0 && (origin.Bottom < other.Top || origin.Top > other.Bottom)) {
                        return null;
                    }


                    var result = ($t = new Humper.Hit(), $t.Amount = entryTime, $t.Position = Humper.Base.Vector2.op_Addition(origin.Location.$clone(), Humper.Base.Vector2.op_Multiply$1(velocity.$clone(), entryTime)), $t.Normal = Humper.Hit.GetNormal(invEntry.$clone(), invExit.$clone(), entry.$clone()), $t);


                    return result;
                },
                ResolveNarrow$1: function (origin, destination, other) {
                    var $t;
                    // if starts inside, push it outside at the neareast place
                    if (other.Contains$1(origin.$clone())) {
                        var outside = Humper.Hit.PushOutside$1(origin.$clone(), other.$clone());
                        return ($t = new Humper.Hit(), $t.Amount = 0, $t.Position = outside.item1.$clone(), $t.Normal = outside.item2.$clone(), $t);
                    }

                    var velocity = (Humper.Base.Vector2.op_Subtraction(destination.$clone(), origin.$clone()));

                    var invEntry = new Humper.Base.Vector2(), invExit = new Humper.Base.Vector2(), entry = new Humper.Base.Vector2(), exit = new Humper.Base.Vector2();

                    if (velocity.X > 0) {
                        invEntry.X = other.Left - origin.X;
                        invExit.X = other.Right - origin.X;
                    } else {
                        invEntry.X = other.Right - origin.X;
                        invExit.X = other.Left - origin.X;
                    }

                    if (velocity.Y > 0) {
                        invEntry.Y = other.Top - origin.Y;
                        invExit.Y = other.Bottom - origin.Y;
                    } else {
                        invEntry.Y = other.Bottom - origin.Y;
                        invExit.Y = other.Top - origin.Y;
                    }

                    if (Math.abs(velocity.X) < Humper.Base.Constants.Threshold) {
                        entry.X = -3.40282347E+38;
                        exit.X = 3.40282347E+38;
                    } else {
                        entry.X = invEntry.X / velocity.X;
                        exit.X = invExit.X / velocity.X;
                    }

                    if (Math.abs(velocity.Y) < Humper.Base.Constants.Threshold) {
                        entry.Y = -3.40282347E+38;
                        exit.Y = 3.40282347E+38;
                    } else {
                        entry.Y = invEntry.Y / velocity.Y;
                        exit.Y = invExit.Y / velocity.Y;
                    }

                    if (entry.Y > 1.0) {
                        entry.Y = -3.40282347E+38;
                    }
                    if (entry.X > 1.0) {
                        entry.X = -3.40282347E+38;
                    }

                    var entryTime = Math.max(entry.X, entry.Y);
                    var exitTime = Math.min(exit.X, exit.Y);

                    if ((entryTime > exitTime || entry.X < 0.0 && entry.Y < 0.0) || (entry.X < 0.0 && (origin.X < other.Left || origin.X > other.Right)) || entry.Y < 0.0 && (origin.Y < other.Top || origin.Y > other.Bottom)) {
                        return null;
                    }

                    var result = ($t = new Humper.Hit(), $t.Amount = entryTime, $t.Position = Humper.Base.Vector2.op_Addition(origin.$clone(), Humper.Base.Vector2.op_Multiply$1(velocity.$clone(), entryTime)), $t.Normal = Humper.Hit.GetNormal(invEntry.$clone(), invExit.$clone(), entry.$clone()), $t);

                    return result;
                },
                GetNormal: function (invEntry, invExit, entry) {
                    if (entry.X > entry.Y) {
                        return (invEntry.X < 0.0) || (Math.abs(invEntry.X) < Humper.Base.Constants.Threshold && invExit.X < 0) ? Humper.Base.Vector2.UnitX : Humper.Base.Vector2.op_UnaryNegation(Humper.Base.Vector2.UnitX.$clone());
                    }

                    return (invEntry.Y < 0.0 || (Math.abs(invEntry.Y) < Humper.Base.Constants.Threshold && invExit.Y < 0)) ? Humper.Base.Vector2.UnitY : Humper.Base.Vector2.op_UnaryNegation(Humper.Base.Vector2.UnitY.$clone());
                }
            }
        },
        fields: {
            Box: null,
            Normal: null,
            Amount: 0,
            Position: null
        },
        props: {
            Remaining: {
                get: function () {
                    return 1.0 - this.Amount;
                }
            }
        },
        alias: [
            "Box", "Humper$IHit$Box",
            "Normal", "Humper$IHit$Normal",
            "Amount", "Humper$IHit$Amount",
            "Position", "Humper$IHit$Position",
            "Remaining", "Humper$IHit$Remaining",
            "IsNearest", "Humper$IHit$IsNearest"
        ],
        ctors: {
            init: function () {
                this.Normal = new Humper.Base.Vector2();
                this.Position = new Humper.Base.Vector2();
            },
            ctor: function () {
                this.$initialize();
                this.Normal = Humper.Base.Vector2.Zero.$clone();
                this.Amount = 1.0;
            }
        },
        methods: {
            IsNearest: function (than, origin) {
                if (this.Amount < than.Humper$IHit$Amount) {
                    return true;
                } else if (this.Amount > than.Humper$IHit$Amount) {
                    return true;
                }

                var thisDistance = (Humper.Base.Vector2.op_Subtraction(origin.$clone(), this.Position.$clone())).LengthSquared();
                var otherDistance = (Humper.Base.Vector2.op_Subtraction(origin.$clone(), than.Humper$IHit$Position.$clone())).LengthSquared();

                return thisDistance < otherDistance;
            }
        }
    });

    Bridge.define("Humper.Movement", {
        inherits: [Humper.IMovement],
        fields: {
            Hits: null,
            Origin: null,
            Destination: null,
            Goal: null
        },
        props: {
            HasCollided: {
                get: function () {
                    return System.Linq.Enumerable.from(this.Hits).any();
                }
            }
        },
        alias: [
            "Hits", "Humper$IMovement$Hits",
            "HasCollided", "Humper$IMovement$HasCollided",
            "Origin", "Humper$IMovement$Origin",
            "Destination", "Humper$IMovement$Destination",
            "Goal", "Humper$IMovement$Goal"
        ],
        ctors: {
            init: function () {
                this.Origin = new Humper.Base.RectangleF();
                this.Destination = new Humper.Base.RectangleF();
                this.Goal = new Humper.Base.RectangleF();
            },
            ctor: function () {
                this.$initialize();
                this.Hits = System.Array.init(0, null, Humper.IHit);
            }
        }
    });

    Bridge.define("Humper.Responses.BounceResponse", {
        inherits: [Humper.Responses.ICollisionResponse],
        fields: {
            Destination: null
        },
        alias: ["Destination", "Humper$Responses$ICollisionResponse$Destination"],
        ctors: {
            init: function () {
                this.Destination = new Humper.Base.RectangleF();
            },
            ctor: function (collision) {
                this.$initialize();
                var velocity = (Humper.Base.Vector2.op_Subtraction(collision.Humper$ICollision$Goal.Center.$clone(), collision.Humper$ICollision$Origin.Center.$clone()));
                var deflected = Humper.Base.Vector2.op_Multiply$1(velocity.$clone(), collision.Humper$ICollision$Hit.Humper$IHit$Amount);

                if (Math.abs(collision.Humper$ICollision$Hit.Humper$IHit$Normal.X) > 1E-05) {
                    deflected.X *= -1;
                }

                if (Math.abs(collision.Humper$ICollision$Hit.Humper$IHit$Normal.Y) > 1E-05) {
                    deflected.Y *= -1;
                }

                this.Destination = new Humper.Base.RectangleF.$ctor2(Humper.Base.Vector2.op_Addition(collision.Humper$ICollision$Hit.Humper$IHit$Position.$clone(), deflected.$clone()), collision.Humper$ICollision$Goal.Size.$clone());
            }
        }
    });

    Bridge.define("Humper.Responses.CollisionResponse", {
        inherits: [Humper.Responses.ICollisionResponse],
        statics: {
            methods: {
                Create: function (col, response) {
                    if (response === Humper.Responses.CollisionResponses.None) {
                        return null;
                    }

                    return new Humper.Responses.CollisionResponse(col, response);
                }
            }
        },
        fields: {
            child: null
        },
        props: {
            Destination: {
                get: function () {
                    return this.child.Humper$Responses$ICollisionResponse$Destination.$clone();
                }
            }
        },
        alias: ["Destination", "Humper$Responses$ICollisionResponse$Destination"],
        ctors: {
            ctor: function (col, response) {
                this.$initialize();
                switch (response) {
                    case Humper.Responses.CollisionResponses.Touch: 
                        this.child = new Humper.Responses.TouchResponse(col);
                        break;
                    case Humper.Responses.CollisionResponses.Cross: 
                        this.child = new Humper.Responses.CrossResponse(col);
                        break;
                    case Humper.Responses.CollisionResponses.Slide: 
                        this.child = new Humper.SlideResponse(col);
                        break;
                    case Humper.Responses.CollisionResponses.Bounce: 
                        this.child = new Humper.Responses.BounceResponse(col);
                        break;
                    default: 
                        throw new System.ArgumentException("Unsupported collision type");
                }
            }
        }
    });

    Bridge.define("Humper.Responses.CrossResponse", {
        inherits: [Humper.Responses.ICollisionResponse],
        fields: {
            Destination: null
        },
        alias: ["Destination", "Humper$Responses$ICollisionResponse$Destination"],
        ctors: {
            init: function () {
                this.Destination = new Humper.Base.RectangleF();
            },
            ctor: function (collision) {
                this.$initialize();
                this.Destination = collision.Humper$ICollision$Goal.$clone();
            }
        }
    });

    Bridge.define("Humper.Responses.TouchResponse", {
        inherits: [Humper.Responses.ICollisionResponse],
        fields: {
            Destination: null
        },
        alias: ["Destination", "Humper$Responses$ICollisionResponse$Destination"],
        ctors: {
            init: function () {
                this.Destination = new Humper.Base.RectangleF();
            },
            ctor: function (collision) {
                this.$initialize();
                this.Destination = new Humper.Base.RectangleF.$ctor2(collision.Humper$ICollision$Hit.Humper$IHit$Position.$clone(), collision.Humper$ICollision$Goal.Size.$clone());
            }
        }
    });

    Bridge.define("Humper.SlideResponse", {
        inherits: [Humper.Responses.ICollisionResponse],
        fields: {
            Destination: null
        },
        alias: ["Destination", "Humper$Responses$ICollisionResponse$Destination"],
        ctors: {
            init: function () {
                this.Destination = new Humper.Base.RectangleF();
            },
            ctor: function (collision) {
                this.$initialize();
                var velocity = (Humper.Base.Vector2.op_Subtraction(collision.Humper$ICollision$Goal.Center.$clone(), collision.Humper$ICollision$Origin.Center.$clone()));
                var normal = collision.Humper$ICollision$Hit.Humper$IHit$Normal.$clone();
                var dot = collision.Humper$ICollision$Hit.Humper$IHit$Remaining * (velocity.X * normal.Y + velocity.Y * normal.X);
                var slide = Humper.Base.Vector2.op_Multiply$1(new Humper.Base.Vector2.$ctor2(normal.Y, normal.X), dot);

                this.Destination = new Humper.Base.RectangleF.$ctor2(Humper.Base.Vector2.op_Addition(collision.Humper$ICollision$Hit.Humper$IHit$Position.$clone(), slide.$clone()), collision.Humper$ICollision$Goal.Size.$clone());
            }
        }
    });

    Bridge.define("Humper.World", {
        inherits: [Humper.IWorld],
        fields: {
            grid: null
        },
        props: {
            Bounds: {
                get: function () {
                    return new Humper.Base.RectangleF.$ctor3(0, 0, this.grid.Width, this.grid.Height);
                }
            }
        },
        alias: [
            "Create", "Humper$IWorld$Create",
            "Find$1", "Humper$IWorld$Find$1",
            "Find", "Humper$IWorld$Find",
            "Remove", "Humper$IWorld$Remove",
            "Update", "Humper$IWorld$Update",
            "Hit$2", "Humper$IWorld$Hit$2",
            "Hit$1", "Humper$IWorld$Hit$1",
            "Hit", "Humper$IWorld$Hit",
            "Simulate", "Humper$IWorld$Simulate",
            "DrawDebug", "Humper$IWorld$DrawDebug"
        ],
        ctors: {
            ctor: function (width, height, cellSize) {
                if (cellSize === void 0) { cellSize = 64.0; }

                this.$initialize();
                var iwidth = Bridge.Int.clip32(Math.ceil(width / cellSize));
                var iheight = Bridge.Int.clip32(Math.ceil(height / cellSize));

                this.grid = new Humper.Grid(iwidth, iheight, cellSize);
            }
        },
        methods: {
            Create: function (x, y, width, height) {
                var box = new Humper.Box(this, x, y, width, height);
                this.grid.Add(box);
                return box;
            },
            Find$1: function (x, y, w, h) {
                x = Math.max(0, Math.min(x, this.Bounds.Right - w));
                y = Math.max(0, Math.min(y, this.Bounds.Bottom - h));

                return this.grid.QueryBoxes(x, y, w, h);
            },
            Find: function (area) {
                return this.Find$1(area.X, area.Y, area.Width, area.Height);
            },
            Remove: function (box) {
                return this.grid.Remove(box);
            },
            Update: function (box, from) {
                this.grid.Update(box, from.$clone());
            },
            Hit$2: function (point, ignoring) {
                var $t;
                if (ignoring === void 0) { ignoring = null; }
                var boxes = this.Find$1(point.X, point.Y, 0, 0);

                if (ignoring != null) {
                    boxes = System.Linq.Enumerable.from(boxes).except(ignoring);
                }

                $t = Bridge.getEnumerator(boxes, Humper.IBox);
                try {
                    while ($t.moveNext()) {
                        var other = $t.Current;
                        var hit = Humper.Hit.Resolve$4(point.$clone(), other);

                        if (hit != null) {
                            return hit;
                        }
                    }
                } finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$dispose();
                    }
                }
                return null;
            },
            Hit$1: function (origin, destination, ignoring) {
                var $t;
                if (ignoring === void 0) { ignoring = null; }
                var min = Humper.Base.Vector2.Min(origin.$clone(), destination.$clone());
                var max = Humper.Base.Vector2.Max(origin.$clone(), destination.$clone());

                var wrap = new Humper.Base.RectangleF.$ctor2(min.$clone(), Humper.Base.Vector2.op_Subtraction(max.$clone(), min.$clone()));
                var boxes = this.Find$1(wrap.X, wrap.Y, wrap.Width, wrap.Height);

                if (ignoring != null) {
                    boxes = System.Linq.Enumerable.from(boxes).except(ignoring);
                }

                var nearest = null;

                $t = Bridge.getEnumerator(boxes, Humper.IBox);
                try {
                    while ($t.moveNext()) {
                        var other = $t.Current;
                        var hit = Humper.Hit.Resolve$3(origin.$clone(), destination.$clone(), other);

                        if (hit != null && (nearest == null || hit.Humper$IHit$IsNearest(nearest, origin.$clone()))) {
                            nearest = hit;
                        }
                    }
                } finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$dispose();
                    }
                }
                return nearest;
            },
            Hit: function (origin, destination, ignoring) {
                var $t;
                if (ignoring === void 0) { ignoring = null; }
                var wrap = new Humper.Base.RectangleF.$ctor1(origin.$clone(), destination.$clone());
                var boxes = this.Find$1(wrap.X, wrap.Y, wrap.Width, wrap.Height);

                if (ignoring != null) {
                    boxes = System.Linq.Enumerable.from(boxes).except(ignoring);
                }

                var nearest = null;

                $t = Bridge.getEnumerator(boxes, Humper.IBox);
                try {
                    while ($t.moveNext()) {
                        var other = $t.Current;
                        var hit = Humper.Hit.Resolve$2(origin.$clone(), destination.$clone(), other);

                        if (hit != null && (nearest == null || hit.Humper$IHit$IsNearest(nearest, origin.Location.$clone()))) {
                            nearest = hit;
                        }
                    }
                } finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$dispose();
                    }
                }
                return nearest;
            },
            Simulate: function (box, x, y, filter) {
                var $t;
                var origin = box.Bounds.$clone();
                var destination = new Humper.Base.RectangleF.$ctor3(x, y, box.Width, box.Height);

                var hits = new (System.Collections.Generic.List$1(Humper.IHit)).ctor();

                var result = ($t = new Humper.Movement(), $t.Origin = origin.$clone(), $t.Goal = destination.$clone(), $t.Destination = this.Simulate$1(hits, function (_o1) {
                        _o1.add(box);
                        return _o1;
                    }(new (System.Collections.Generic.List$1(Humper.IBox)).ctor()), box, origin.$clone(), destination.$clone(), filter), $t.Hits = hits, $t);

                return result;
            },
            Simulate$1: function (hits, ignoring, box, origin, destination, filter) {
                var $t;
                var nearest = this.Hit(origin.$clone(), destination.$clone(), ignoring);

                if (nearest != null) {
                    hits.add(nearest);

                    var impact = new Humper.Base.RectangleF.$ctor2(nearest.Humper$IHit$Position.$clone(), origin.Size.$clone());
                    var collision = ($t = new Humper.Collision(), $t.Box = box, $t.Hit = nearest, $t.Goal = destination.$clone(), $t.Origin = origin.$clone(), $t);
                    var response = filter(collision);

                    if (response != null && Humper.Base.RectangleF.op_Inequality(destination.$clone(), response.Humper$Responses$ICollisionResponse$Destination.$clone())) {
                        ignoring.add(nearest.Humper$IHit$Box);
                        return this.Simulate$1(hits, ignoring, box, impact.$clone(), response.Humper$Responses$ICollisionResponse$Destination.$clone(), filter);
                    }
                }

                return destination.$clone();
            },
            DrawDebug: function (x, y, w, h, drawCell, drawBox, drawString) {
                var $t, $t1;
                // Drawing boxes
                var boxes = this.grid.QueryBoxes(x, y, w, h);
                $t = Bridge.getEnumerator(boxes, Humper.IBox);
                try {
                    while ($t.moveNext()) {
                        var box = $t.Current;
                        drawBox(box);
                    }
                } finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$dispose();
                    }
                }
                // Drawing cells
                var cells = this.grid.QueryCells(x, y, w, h);
                $t1 = Bridge.getEnumerator(cells, Humper.Grid.Cell);
                try {
                    while ($t1.moveNext()) {
                        var cell = $t1.Current;
                        var count = cell.Count();
                        var alpha = count > 0 ? 1.0 : 0.4;
                        drawCell(Bridge.Int.clip32(cell.Bounds.X), Bridge.Int.clip32(cell.Bounds.Y), Bridge.Int.clip32(cell.Bounds.Width), Bridge.Int.clip32(cell.Bounds.Height), alpha);
                        drawString(Bridge.toString(count), Bridge.Int.clip32(cell.Bounds.Center.X), Bridge.Int.clip32(cell.Bounds.Center.Y), alpha);
                    }
                } finally {
                    if (Bridge.is($t1, System.IDisposable)) {
                        $t1.System$IDisposable$dispose();
                    }
                }}
        }
    });

    Bridge.define("JuiceBoxEngine.Graphics.Font", {
        inherits: [JuiceBoxEngine.Resources.IResource],
        fields: {
            /**
             * Name of this resource.
             *
             * @instance
             * @public
             * @memberof JuiceBoxEngine.Graphics.Font
             * @function Name
             * @type string
             */
            Name: null,
            /**
             * True if the resource is loaded, false otherwise.
             *
             * @instance
             * @public
             * @memberof JuiceBoxEngine.Graphics.Font
             * @function Loaded
             * @type boolean
             */
            Loaded: false,
            Texture: null,
            _bpp: 0,
            _charOffset: 0,
            _charWidths: null,
            _cellWidth: 0,
            _cellHeight: 0,
            _rowCount: 0,
            _bits: null
        },
        alias: [
            "Name", "JuiceBoxEngine$Resources$IResource$Name",
            "Loaded", "JuiceBoxEngine$Resources$IResource$Loaded"
        ],
        ctors: {
            ctor: function (width, height, bpp, charOffset, charWidths, cellWidth, cellHeight, bits) {
                this.$initialize();
                this._bpp = bpp;
                this._charOffset = charOffset;
                this._charWidths = charWidths;
                this._cellWidth = cellWidth;
                this._cellHeight = cellHeight;
                this._rowCount = (Bridge.Int.div(width, this._cellWidth)) | 0;
                this._bits = bits;

                this.Texture = new JuiceBoxEngine.Graphics.Texture2D.$ctor1(width, height, this._bits);
            }
        },
        methods: {
            /**
             * Generate a font vertex buffer.
             *
             * @instance
             * @public
             * @this JuiceBoxEngine.Graphics.Font
             * @memberof JuiceBoxEngine.Graphics.Font
             * @param   {string}                         text      The text.
             * @param   {JuiceBoxEngine.Math.Color32}    color     
             * @param   {JuiceBoxEngine.Math.Vector3}    offset    The offset from the origin. (object space)
             * @return  {Array.<number>}                           A float buffer with vertex data.
             */
            GenerateBuffer: function (text, color, offset) {
                // All vertex data.
                // Position 3 floats.
                // Tex Coord 2 floats.
                // Color 4 floats.
                // 6 verts per letter.
                var rawData = System.Array.init(Bridge.Int.mul(Bridge.Int.mul(text.length, 9), 6), 0, System.Single);

                var curPos = offset.$clone();

                for (var i = 0; i < text.length; i = (i + 1) | 0) {
                    var c = text.charCodeAt(i);
                    if (c < this._charOffset) {
                        continue;
                    }

                    var no = (c - this._charOffset) | 0;
                    var texWidth = this._charWidths[System.Array.index(no, this._charWidths)];
                    var texHeight = this._cellHeight;

                    var yCell = (Bridge.Int.div(no, (((Bridge.Int.div(this.Texture.Width, this._cellWidth)) | 0)))) | 0;
                    var xCell = (no - Bridge.Int.mul(yCell, (((Bridge.Int.div(this.Texture.Width, this._cellWidth)) | 0)))) | 0;

                    var charTexWidth = this._charWidths[System.Array.index(no, this._charWidths)] / this.Texture.Width;
                    var charTexHeight = this._cellHeight / this.Texture.Height;

                    var texX = (xCell) * (this._cellWidth / this.Texture.Width);
                    var texY = (((yCell + 1) | 0)) * (this._cellHeight / this.Texture.Height);

                    // Lower Left
                    this.BufferVertex(rawData, ((Bridge.Int.mul(Bridge.Int.mul(i, 9), 6) + 0) | 0), new JuiceBoxEngine.Math.Vector3.$ctor2(curPos.X, curPos.Y, curPos.Z), new JuiceBoxEngine.Math.Vector2.$ctor2(texX, texY), color.$clone());

                    // Lower Right
                    this.BufferVertex(rawData, ((Bridge.Int.mul(Bridge.Int.mul(i, 9), 6) + 9) | 0), new JuiceBoxEngine.Math.Vector3.$ctor2(curPos.X + texWidth, curPos.Y, curPos.Z), new JuiceBoxEngine.Math.Vector2.$ctor2(texX + charTexWidth, texY), color.$clone());

                    // Upper Left
                    this.BufferVertex(rawData, ((Bridge.Int.mul(Bridge.Int.mul(i, 9), 6) + 18) | 0), new JuiceBoxEngine.Math.Vector3.$ctor2(curPos.X, curPos.Y + texHeight, curPos.Z), new JuiceBoxEngine.Math.Vector2.$ctor2(texX, texY - charTexHeight), color.$clone());

                    // Lower Right
                    this.BufferVertex(rawData, ((Bridge.Int.mul(Bridge.Int.mul(i, 9), 6) + 27) | 0), new JuiceBoxEngine.Math.Vector3.$ctor2(curPos.X + texWidth, curPos.Y, curPos.Z), new JuiceBoxEngine.Math.Vector2.$ctor2(texX + charTexWidth, texY), color.$clone());

                    // Upper Left
                    this.BufferVertex(rawData, ((Bridge.Int.mul(Bridge.Int.mul(i, 9), 6) + 36) | 0), new JuiceBoxEngine.Math.Vector3.$ctor2(curPos.X, curPos.Y + texHeight, curPos.Z), new JuiceBoxEngine.Math.Vector2.$ctor2(texX, texY - charTexHeight), color.$clone());

                    // Upper Right
                    this.BufferVertex(rawData, ((Bridge.Int.mul(Bridge.Int.mul(i, 9), 6) + 45) | 0), new JuiceBoxEngine.Math.Vector3.$ctor2(curPos.X + texWidth, curPos.Y + texHeight, curPos.Z), new JuiceBoxEngine.Math.Vector2.$ctor2(texX + charTexWidth, texY - charTexHeight), color.$clone());

                    // Offset for the next character.
                    curPos = new JuiceBoxEngine.Math.Vector3.$ctor2(curPos.X + texWidth, curPos.Y, curPos.Z);
                }

                return rawData;
            },
            /**
             * Gets the width of how big the given string will be.
             *
             * @instance
             * @public
             * @this JuiceBoxEngine.Graphics.Font
             * @memberof JuiceBoxEngine.Graphics.Font
             * @param   {string}    text    The text
             * @return  {number}            The width of the string.
             */
            GetWidth: function (text) {
                var width = 0.0;

                for (var i = 0; i < text.length; i = (i + 1) | 0) {
                    var c = text.charCodeAt(i);
                    if (c < this._charOffset) {
                        continue;
                    }

                    var no = (c - this._charOffset) | 0;
                    var texWidth = this._charWidths[System.Array.index(no, this._charWidths)];

                    // Offset for the next character.
                    width += texWidth;
                }

                return width;
            },
            BufferVertex: function (buffer, offset, pos, texCoord, color) {
                // Pos
                buffer[System.Array.index(((offset + 0) | 0), buffer)] = pos.X;
                buffer[System.Array.index(((offset + 1) | 0), buffer)] = pos.Y;
                buffer[System.Array.index(((offset + 2) | 0), buffer)] = pos.Z;
                // Tex
                buffer[System.Array.index(((offset + 3) | 0), buffer)] = texCoord.X;
                buffer[System.Array.index(((offset + 4) | 0), buffer)] = texCoord.Y;
                // Col 
                buffer[System.Array.index(((offset + 5) | 0), buffer)] = color.R;
                buffer[System.Array.index(((offset + 6) | 0), buffer)] = color.G;
                buffer[System.Array.index(((offset + 7) | 0), buffer)] = color.B;
                buffer[System.Array.index(((offset + 8) | 0), buffer)] = color.A;
            }
        }
    });

    Bridge.define("JuiceBoxEngine.Graphics.FontResourceLoader", {
        inherits: [JuiceBoxEngine.Resources.ResourceLoader],
        ctors: {
            ctor: function (name, extension) {
                this.$initialize();
                JuiceBoxEngine.Resources.ResourceLoader.ctor.call(this, name, extension);

            }
        },
        methods: {
            /**
             * Loads a .bff file.
             *
             * @instance
             * @public
             * @override
             * @this JuiceBoxEngine.Graphics.FontResourceLoader
             * @memberof JuiceBoxEngine.Graphics.FontResourceLoader
             * @param   {string}                                path
             * @return  {JuiceBoxEngine.Resources.IResource}
             */
            Load: function (path) {
                var textureWidth;
                var textureHeight;
                var bpp;
                var charOffset;
                var charWidths;
                var cellWidth;
                var cellHeight;
                var bits;

                var filestream = new System.IO.FileStream.$ctor1(path, System.IO.FileMode.Open);
                try {
                    var reader = new System.IO.BinaryReader.ctor(filestream);

                    var h0 = reader.ReadByte();
                    var h1 = reader.ReadByte();

                    // First two bytes in the .bff file should be 0xBF and 0xF2.
                    if (h0 !== 191 || h1 !== 242) {
                        System.Console.WriteLine("Unable to load font format. Make sure it is a .bff file. This file should be generated from CBFG.");
                        return null;
                    }

                    textureWidth = reader.ReadInt32();
                    textureHeight = reader.ReadInt32();

                    cellWidth = reader.ReadInt32();
                    cellHeight = reader.ReadInt32();

                    bpp = reader.ReadByte();

                    charOffset = reader.ReadByte();

                    charWidths = System.Array.init(256, 0, System.Byte);
                    for (var i = 0; i < 256; i = (i + 1) | 0) {
                        charWidths[System.Array.index(i, charWidths)] = reader.ReadByte();
                    }

                    var bitLen = Bridge.Int.mul((Bridge.Int.mul(textureHeight, textureWidth)), (((Bridge.Int.div(bpp, 8)) | 0)));
                    bits = System.Array.init(bitLen, 0, System.Byte);
                    bits = reader.ReadBytes(bitLen);
                }
                finally {
                    if (Bridge.hasValue(filestream)) {
                        filestream.System$IDisposable$dispose();
                    }
                }

                return new JuiceBoxEngine.Graphics.Font(textureWidth, textureHeight, bpp, charOffset, charWidths, cellWidth, cellHeight, bits);
            }
        }
    });

    Bridge.define("JuiceBoxEngine.Graphics.GraphicsComponent", {
        inherits: [JuiceBoxEngine.Scene.IComponent],
        fields: {
            /**
             * Name of the component.
             *
             * @instance
             * @public
             * @memberof JuiceBoxEngine.Graphics.GraphicsComponent
             * @function Name
             * @type string
             */
            Name: null,
            /**
             * Parent game object.
             *
             * @instance
             * @public
             * @memberof JuiceBoxEngine.Graphics.GraphicsComponent
             * @function Parent
             * @type JuiceBoxEngine.Scene.GameObject
             */
            Parent: null,
            /**
             * Enabled graphics components get rendered.
             *
             * @instance
             * @public
             * @memberof JuiceBoxEngine.Graphics.GraphicsComponent
             * @function Enabled
             * @type boolean
             */
            Enabled: false
        },
        alias: [
            "Name", "JuiceBoxEngine$Scene$IComponent$Name",
            "Parent", "JuiceBoxEngine$Scene$IComponent$Parent",
            "Enabled", "JuiceBoxEngine$Scene$IComponent$Enabled"
        ]
    });

    Bridge.define("JuiceBoxEngine.Graphics.GrayScale", {
        inherits: [JuiceBoxEngine.Graphics.PostProcessingEffect],
        ctors: {
            ctor: function (resourceManager) {
                this.$initialize();
                JuiceBoxEngine.Graphics.PostProcessingEffect.ctor.call(this, "GrayScale");
                this.Load(resourceManager);
                this._command.Data.add("u_texture", null);
            }
        },
        methods: {
            Render: function (source) {
                this._command.Data.set("u_texture", source);
                JuiceBoxEngine.Graphics.GraphicsManager.Instance.Context.Command(this._command);
            }
        }
    });

    Bridge.define("JuiceBoxEngine.Graphics.GUI.GUIText", {
        inherits: [JuiceBoxEngine.Graphics.GUI.GUIElement],
        fields: {
            _text: null,
            Font: null
        },
        props: {
            Text: {
                get: function () {
                    return this._text;
                },
                set: function (value) {
                    if (!System.String.equals(this._text, value)) {
                        this._text = value;
                        this.Command.VertexBuffer.UpdateData(this.Font.GenerateBuffer(this._text, new JuiceBoxEngine.Math.Color32.$ctor2(1.0, 1.0, 1.0, 1.0), new JuiceBoxEngine.Math.Vector3.ctor()));
                    }
                }
            }
        },
        ctors: {
            ctor: function (manager) {
                this.$initialize();
                JuiceBoxEngine.Graphics.GUI.GUIElement.ctor.call(this);
                this.Command = new JuiceBoxEngine.Graphics.GraphicsCommand();
                this.Command.Program = manager.Load(JuiceBoxEngine.Graphics.ShaderProgram, "Shaders/Font.vert");
                this.Font = manager.Load(JuiceBoxEngine.Graphics.Font, "Arial.bff");

                this.Command.VertexBuffer = new JuiceBoxEngine.Graphics.VertexBuffer.ctor();
                this.Command.VertexBuffer.SetAttribute(new JuiceBoxEngine.Graphics.VertexAttribute.$ctor1("a_pos", 3, false, 36, 0));
                this.Command.VertexBuffer.SetAttribute(new JuiceBoxEngine.Graphics.VertexAttribute.$ctor1("a_tex", 2, false, 36, 12));
                this.Command.VertexBuffer.SetAttribute(new JuiceBoxEngine.Graphics.VertexAttribute.$ctor1("a_col", 4, false, 36, 20));

                this.Command.Data.add("texture", this.Font.Texture);
            }
        }
    });

    Bridge.define("JuiceBoxEngine.Graphics.Texture2D", {
        inherits: [JuiceBoxEngine.Resources.IResource],
        fields: {
            /**
             * Width in pixels.
             *
             * @instance
             * @public
             * @memberof JuiceBoxEngine.Graphics.Texture2D
             * @function Width
             * @type number
             */
            Width: 0,
            /**
             * Height in pixels.
             *
             * @instance
             * @public
             * @memberof JuiceBoxEngine.Graphics.Texture2D
             * @function Height
             * @type number
             */
            Height: 0,
            /**
             * The platform specific texture.
             *
             * @instance
             * @public
             * @memberof JuiceBoxEngine.Graphics.Texture2D
             * @function Texture
             * @type Bridge.WebGL.WebGLTexture
             */
            Texture: null,
            /**
             * The texture name.
             *
             * @instance
             * @public
             * @memberof JuiceBoxEngine.Graphics.Texture2D
             * @function Name
             * @type string
             */
            Name: null,
            /**
             * True if the texture is loaded.
             *
             * @instance
             * @public
             * @memberof JuiceBoxEngine.Graphics.Texture2D
             * @function Loaded
             * @type boolean
             */
            Loaded: false
        },
        alias: [
            "Name", "JuiceBoxEngine$Resources$IResource$Name",
            "Loaded", "JuiceBoxEngine$Resources$IResource$Loaded"
        ],
        ctors: {
            ctor: function () {
                this.$initialize();

            },
            $ctor1: function (width, height, data) {
                this.$initialize();
                this.Width = width;
                this.Height = height;
                this.Texture = JuiceBoxEngine.Graphics.GraphicsManager.Instance.Context.CreateTexture$2(width, height, data);
            }
        }
    });

    Bridge.define("JuiceBoxEngine.Graphics.ShaderProgram", {
        inherits: [JuiceBoxEngine.Resources.IResource],
        fields: {
            /**
             * The name of this shader, mostly for debugging purposes.
             *
             * @instance
             * @public
             * @memberof JuiceBoxEngine.Graphics.ShaderProgram
             * @function Name
             * @type string
             */
            Name: null,
            /**
             * The platform specific shader program.
             *
             * @instance
             * @public
             * @memberof JuiceBoxEngine.Graphics.ShaderProgram
             * @function Program
             * @type Bridge.WebGL.WebGLProgram
             */
            Program: null,
            /**
             * Cached uniform locations for faster rendering.
             *
             * @instance
             * @memberof JuiceBoxEngine.Graphics.ShaderProgram
             * @function Locations
             * @type System.Collections.Generic.Dictionary$2
             */
            Locations: null,
            /**
             * All Cached uniform setter functions. To improve performance.
             *
             * @instance
             * @memberof JuiceBoxEngine.Graphics.ShaderProgram
             * @function SetUniformFunction
             * @type System.Collections.Generic.Dictionary$2
             */
            SetUniformFunction: null,
            /**
             * Is the shader loaded?
             *
             * @instance
             * @public
             * @memberof JuiceBoxEngine.Graphics.ShaderProgram
             * @function Loaded
             * @type boolean
             */
            Loaded: false
        },
        alias: [
            "Name", "JuiceBoxEngine$Resources$IResource$Name",
            "Loaded", "JuiceBoxEngine$Resources$IResource$Loaded"
        ],
        ctors: {
            /**
             * Constructor.
             *
             * @instance
             * @public
             * @this JuiceBoxEngine.Graphics.ShaderProgram
             * @memberof JuiceBoxEngine.Graphics.ShaderProgram
             * @param   {string}    vertSource    The vertex shader code.
             * @param   {string}    fragSource    The fragment shader code.
             * @return  {void}
             */
            ctor: function (vertSource, fragSource) {
                this.$initialize();
                this.Program = JuiceBoxEngine.Graphics.GraphicsManager.Instance.Context.CompileShader(vertSource, fragSource);
                this.Locations = new (System.Collections.Generic.Dictionary$2(System.String,JuiceBoxEngine.Graphics.ShaderProgram.UniformLocation))();
                this.SetUniformFunction = new (System.Collections.Generic.Dictionary$2(System.String,Function))();
            }
        }
    });

    Bridge.define("JuiceBoxEngine.Graphics.ShaderResourceLoader", {
        inherits: [JuiceBoxEngine.Resources.ResourceLoader],
        ctors: {
            ctor: function (name, extension) {
                this.$initialize();
                JuiceBoxEngine.Resources.ResourceLoader.ctor.call(this, name, extension);
            }
        },
        methods: {
            /**
             * Load a shader program.(.vert and .frag combination)
             *
             * @instance
             * @public
             * @override
             * @this JuiceBoxEngine.Graphics.ShaderResourceLoader
             * @memberof JuiceBoxEngine.Graphics.ShaderResourceLoader
             * @param   {string}                                path    Path to the vert or fragment shader.
             * @return  {JuiceBoxEngine.Resources.IResource}            A shader likely to be compiled. (if all goes well)
             */
            Load: function (path) {
                var $t, $t1;
                if (!System.String.contains(path,".")) {
                    path = (path || "") + ".";
                }

                var vertPath = (($t = System.String.split(path, System.Array.init([46], System.Char).map(function(i) {{ return String.fromCharCode(i); }}), null, 1))[System.Array.index(0, $t)] || "") + ".vert";
                var fragPath = (($t1 = System.String.split(path, System.Array.init([46], System.Char).map(function(i) {{ return String.fromCharCode(i); }}), null, 1))[System.Array.index(0, $t1)] || "") + ".frag";

                var vertSource = System.IO.File.ReadAllText(vertPath);
                var fragSource = System.IO.File.ReadAllText(fragPath);

                var program = new JuiceBoxEngine.Graphics.ShaderProgram(vertSource, fragSource);
                program.Loaded = true;

                return program;
            }
        }
    });

    Bridge.define("JuiceBoxEngine.Graphics.TextureResourceLoader", {
        inherits: [JuiceBoxEngine.Resources.ResourceLoader],
        ctors: {
            /**
             * Constructor.
             *
             * @instance
             * @public
             * @this JuiceBoxEngine.Graphics.TextureResourceLoader
             * @memberof JuiceBoxEngine.Graphics.TextureResourceLoader
             * @param   {string}    name         Name of the loader.
             * @param   {string}    extension    Extension this type loads.
             * @return  {void}
             */
            ctor: function (name, extension) {
                this.$initialize();
                JuiceBoxEngine.Resources.ResourceLoader.ctor.call(this, name, extension);
            }
        },
        methods: {
            /**
             * Load in a 2D texture.
             *
             * @instance
             * @public
             * @override
             * @this JuiceBoxEngine.Graphics.TextureResourceLoader
             * @memberof JuiceBoxEngine.Graphics.TextureResourceLoader
             * @param   {string}                                path
             * @return  {JuiceBoxEngine.Resources.IResource}
             */
            Load: function (path) {
                var texture = new JuiceBoxEngine.Graphics.Texture2D.ctor();

                var image = new Image();
                image.onload = Bridge.fn.bind(this, function (x) {
                    texture.Texture = this.OnDataLoaded(image);
                    texture.Loaded = true;
                    texture.Width = image.width;
                    texture.Height = image.height;
                });
                image.src = path;

                return texture;
            },
            OnDataLoaded: function (element) {
                return JuiceBoxEngine.Graphics.GraphicsManager.Instance.Context.CreateTexture(element);
            }
        }
    });

    Bridge.define("JuiceBoxEngine.Scene.Camera", {
        inherits: [JuiceBoxEngine.Scene.IComponent],
        fields: {
            Name: null,
            Parent: null,
            /**
             * Color to clear the rendertarget to.
             *
             * @instance
             * @public
             * @memberof JuiceBoxEngine.Scene.Camera
             * @function ClearColor
             * @type JuiceBoxEngine.Math.Color32
             */
            ClearColor: null,
            /**
             * The camera view matrix.
             *
             * @instance
             * @public
             * @memberof JuiceBoxEngine.Scene.Camera
             * @function ViewMatrix
             * @type JuiceBoxEngine.Math.Matrix4
             */
            ViewMatrix: null,
            /**
             * The camera projection matrix.
             *
             * @instance
             * @public
             * @memberof JuiceBoxEngine.Scene.Camera
             * @function ProjMatrix
             * @type JuiceBoxEngine.Math.Matrix4
             */
            ProjMatrix: null,
            /**
             * When true, the camera snaps to the pixel grid.
             *
             * @instance
             * @public
             * @memberof JuiceBoxEngine.Scene.Camera
             * @function PixelPerfect
             * @type boolean
             */
            PixelPerfect: false,
            _target: null,
            _postProcessed: null,
            /**
             * Size of the pixels. (e.g. 1 is the same resolution as the canvas, 4 gives you pixels the size of 4 canvas pixels)
             *
             * @instance
             * @public
             * @memberof JuiceBoxEngine.Scene.Camera
             * @function PixelSize
             * @type number
             */
            PixelSize: 0,
            /**
             * An disabled camera won't render the scene.
             *
             * @instance
             * @public
             * @memberof JuiceBoxEngine.Scene.Camera
             * @function Enabled
             * @type boolean
             */
            Enabled: false,
            _transform: null,
            _ppManager: null
        },
        props: {
            /**
             * The camera render target.
             *
             * @instance
             * @public
             * @memberof JuiceBoxEngine.Scene.Camera
             * @function Target
             * @type JuiceBoxEngine.Graphics.RenderTarget
             */
            Target: {
                get: function () {
                    return this._target;
                },
                set: function (value) {
                    this._target = value;
                    this._postProcessed = new JuiceBoxEngine.Graphics.RenderTarget(this._target.Width, this._target.Height);
                }
            }
        },
        alias: [
            "Name", "JuiceBoxEngine$Scene$IComponent$Name",
            "Parent", "JuiceBoxEngine$Scene$IComponent$Parent",
            "Enabled", "JuiceBoxEngine$Scene$IComponent$Enabled",
            "Initialize", "JuiceBoxEngine$Scene$IComponent$Initialize",
            "Unique", "JuiceBoxEngine$Scene$IComponent$Unique",
            "Update", "JuiceBoxEngine$Scene$IComponent$Update"
        ],
        ctors: {
            init: function () {
                this.ClearColor = new JuiceBoxEngine.Math.Color32();
                this.ViewMatrix = new JuiceBoxEngine.Math.Matrix4();
                this.ProjMatrix = new JuiceBoxEngine.Math.Matrix4();
            }
        },
        methods: {
            Initialize: function (resourceManager) {
                this.PixelSize = 1;
                this.PixelPerfect = true;
                this._transform = this.Parent.GetComponent(JuiceBoxEngine.Scene.Transform);
                this._ppManager = new JuiceBoxEngine.Graphics.PostProcessingManager(this);
            },
            Unique: function () {
                return true;
            },
            /**
             * Add a post processing effect to the camera.
             *
             * @instance
             * @public
             * @this JuiceBoxEngine.Scene.Camera
             * @memberof JuiceBoxEngine.Scene.Camera
             * @param   {JuiceBoxEngine.Graphics.PostProcessingEffect}    effect    The loaded post processing effect.
             * @return  {void}
             */
            AddEffect: function (effect) {
                this._ppManager.AddPostProcessingEffect(effect);
            },
            /**
             * Post process the rendered image.
             *
             * @instance
             * @public
             * @this JuiceBoxEngine.Scene.Camera
             * @memberof JuiceBoxEngine.Scene.Camera
             * @return  {void}
             */
            PostProcess: function () {
                //FIXME: Postprocessing not working.
                //_ppManager.PostProcess(Target, _postProcessed);
            },
            ScreenPointToWorld: function (point) {
                return new JuiceBoxEngine.Math.Vector2.$ctor2((point.X * 2.0 - 1.0) * this.Target.Width / 2.0 + this._transform.Position.X, (point.Y * 2.0 - 1.0) * this.Target.Height / 2.0 + this._transform.Position.Y);
            },
            /**
             * Update View and Projection matrix.
             *
             * @instance
             * @public
             * @this JuiceBoxEngine.Scene.Camera
             * @memberof JuiceBoxEngine.Scene.Camera
             * @return  {void}
             */
            Update: function () {
                if (this.Target == null) {
                    return;
                }

                var pos = this._transform.Position.$clone();

                if (this.PixelPerfect) {
                    this._transform.Position = new JuiceBoxEngine.Math.Vector3.$ctor2(JuiceBoxEngine.Math.Math.Round(this._transform.Position.X), JuiceBoxEngine.Math.Math.Round(this._transform.Position.Y), Bridge.Int.clip32(this._transform.Position.Z));
                }

                this.ViewMatrix = JuiceBoxEngine.Math.Matrix4.CreateLookAt(new JuiceBoxEngine.Math.Vector3.$ctor2(this._transform.Position.X, this._transform.Position.Y, this._transform.Position.Z), new JuiceBoxEngine.Math.Vector3.$ctor2(this._transform.Position.X, this._transform.Position.Y, -1.0), new JuiceBoxEngine.Math.Vector3.$ctor2(0.0, 1.0, 0.0));
                this.ProjMatrix = JuiceBoxEngine.Math.Matrix4.CreateOrthographic(this.Target.Width, this.Target.Height, 0.0, 100.0);

                if (this.PixelPerfect) {
                    this._transform.Position = pos.$clone();
                }
            }
        }
    });

    Bridge.define("JuiceBoxEngine.Scene.Collider", {
        inherits: [JuiceBoxEngine.Scene.IComponent],
        fields: {
            Name: null,
            Enabled: false,
            Parent: null,
            _box: null,
            _aabb: null,
            _world: null
        },
        props: {
            AABB: {
                get: function () {
                    return this._aabb.$clone();
                },
                set: function (value) {
                    this._aabb = value.$clone();
                    this._box = Bridge.as(this._world.Create(this.Parent.Transform.Position.X + this._aabb.X, this.Parent.Transform.Position.Y + this._aabb.Y, this._aabb.Width, this._aabb.Height), Humper.Box);
                }
            }
        },
        alias: [
            "Name", "JuiceBoxEngine$Scene$IComponent$Name",
            "Enabled", "JuiceBoxEngine$Scene$IComponent$Enabled",
            "Parent", "JuiceBoxEngine$Scene$IComponent$Parent",
            "Initialize", "JuiceBoxEngine$Scene$IComponent$Initialize",
            "Unique", "JuiceBoxEngine$Scene$IComponent$Unique",
            "Update", "JuiceBoxEngine$Scene$IComponent$Update"
        ],
        ctors: {
            init: function () {
                this._aabb = new JuiceBoxEngine.Math.Rectangle();
            }
        },
        methods: {
            Initialize: function (resourceManager) {

            },
            SetWorld: function (world) {
                this._world = world;
            },
            Translate: function (direction) {
                this._box.Move(this.Parent.Transform.Position.X - this._aabb.X + direction.X, this.Parent.Transform.Position.Y - this._aabb.Y + direction.Y, function (c) {
                    return Humper.Responses.CollisionResponses.Slide;
                });
                this.UpdatePosition();
            },
            UpdatePosition: function () {
                this.Parent.Transform.Position = new JuiceBoxEngine.Math.Vector3.$ctor2(this._box.X + this._aabb.X, this._box.Y + this._aabb.Y, this.Parent.Transform.Position.Z);
            },
            Unique: function () {
                return false;
            },
            Update: function () {
                // debug hit boxes.
                //Graphics.Debugging.DebugRenderer.Instance.DrawRect(new Rectangle((int)_box.X, (int)_box.Y, (int)_box.Width, (int)_box.Height), new Color32(1.0f, 0.0f, 0.0f, 1.0f), 1.0f);
            }
        }
    });

    Bridge.define("JuiceBoxEngine.Scene.Transform", {
        inherits: [JuiceBoxEngine.Scene.IComponent],
        fields: {
            /**
             * The position in 3D space.
             *
             * @instance
             * @public
             * @memberof JuiceBoxEngine.Scene.Transform
             * @function Position
             * @type JuiceBoxEngine.Math.Vector3
             */
            Position: null,
            /**
             * The rotation in 3D space.
             *
             * @instance
             * @public
             * @memberof JuiceBoxEngine.Scene.Transform
             * @function Rotation
             * @type JuiceBoxEngine.Math.Vector3
             */
            Rotation: null,
            /**
             * The scale in 3D space.
             *
             * @instance
             * @public
             * @memberof JuiceBoxEngine.Scene.Transform
             * @function Scale
             * @type JuiceBoxEngine.Math.Vector3
             */
            Scale: null,
            /**
             * Name of the component.
             *
             * @instance
             * @public
             * @memberof JuiceBoxEngine.Scene.Transform
             * @function Name
             * @type string
             */
            Name: null,
            /**
             * Parent game object.
             *
             * @instance
             * @public
             * @memberof JuiceBoxEngine.Scene.Transform
             * @function Parent
             * @type JuiceBoxEngine.Scene.GameObject
             */
            Parent: null
        },
        props: {
            /**
             * @instance
             * @public
             * @memberof JuiceBoxEngine.Scene.Transform
             * @function Enabled
             * @type boolean
             */
            Enabled: {
                get: function () {
                    return true;
                },
                set: function (value) { }
            }
        },
        alias: [
            "Name", "JuiceBoxEngine$Scene$IComponent$Name",
            "Parent", "JuiceBoxEngine$Scene$IComponent$Parent",
            "Enabled", "JuiceBoxEngine$Scene$IComponent$Enabled",
            "Update", "JuiceBoxEngine$Scene$IComponent$Update",
            "Unique", "JuiceBoxEngine$Scene$IComponent$Unique",
            "Initialize", "JuiceBoxEngine$Scene$IComponent$Initialize"
        ],
        ctors: {
            init: function () {
                this.Position = new JuiceBoxEngine.Math.Vector3();
                this.Rotation = new JuiceBoxEngine.Math.Vector3();
                this.Scale = new JuiceBoxEngine.Math.Vector3();
            },
            /**
             * Default constructor.
             *
             * @instance
             * @public
             * @this JuiceBoxEngine.Scene.Transform
             * @memberof JuiceBoxEngine.Scene.Transform
             * @return  {void}
             */
            ctor: function () {
                this.$initialize();
                this.Position = new JuiceBoxEngine.Math.Vector3.$ctor2(0.0, 0.0, 0.0);
                this.Scale = new JuiceBoxEngine.Math.Vector3.$ctor1(1.0);
            }
        },
        methods: {
            /**
             * This function is called every frame, before the render.
             *
             * @instance
             * @public
             * @this JuiceBoxEngine.Scene.Transform
             * @memberof JuiceBoxEngine.Scene.Transform
             * @return  {void}
             */
            Update: function () {

            },
            /**
             * Gets the world matrix of this object for 2D rendering. (no rotation on x and y axis) Rounded down to the nearest pixel on the x and y axis. (assuming 1 unit = 1 pixel)
             *
             * @instance
             * @public
             * @this JuiceBoxEngine.Scene.Transform
             * @memberof JuiceBoxEngine.Scene.Transform
             * @return  {JuiceBoxEngine.Math.Matrix4}        An world matrix for 2D rendering.
             */
            GetWorldMatrix2D: function () {
                return JuiceBoxEngine.Math.Matrix4.Multiply(JuiceBoxEngine.Math.Matrix4.Multiply(JuiceBoxEngine.Math.Matrix4.CreateScale(this.Scale.$clone()), JuiceBoxEngine.Math.Matrix4.CreateRotationZ(this.Rotation.Z)), JuiceBoxEngine.Math.Matrix4.CreateTranslation(this.Position.$clone()));
            },
            /**
             * Gets the world matrix of this object for 2D rendering. (no rotation on x and y axis)
             *
             * @instance
             * @public
             * @this JuiceBoxEngine.Scene.Transform
             * @memberof JuiceBoxEngine.Scene.Transform
             * @return  {JuiceBoxEngine.Math.Matrix4}        An world matrix for 2D rendering.
             */
            GetWorldMatrixPixelPerfect2D: function () {
                return JuiceBoxEngine.Math.Matrix4.Multiply(JuiceBoxEngine.Math.Matrix4.Multiply(JuiceBoxEngine.Math.Matrix4.CreateScale(this.Scale.$clone()), JuiceBoxEngine.Math.Matrix4.CreateRotationZ(this.Rotation.Z)), JuiceBoxEngine.Math.Matrix4.CreateTranslation(new JuiceBoxEngine.Math.Vector3.$ctor2(JuiceBoxEngine.Math.Math.Round(this.Position.X), JuiceBoxEngine.Math.Math.Round(this.Position.Y), this.Position.Z)));
            },
            /**
             * If the component is unique, only one can be on a gameobject.
             *
             * @instance
             * @public
             * @this JuiceBoxEngine.Scene.Transform
             * @memberof JuiceBoxEngine.Scene.Transform
             * @return  {boolean}        A boolean, true if it is unique, false if multiple component may be on a gameobject.
             */
            Unique: function () {
                return true;
            },
            /**
             * Called on component initialisation.
             *
             * @instance
             * @public
             * @this JuiceBoxEngine.Scene.Transform
             * @memberof JuiceBoxEngine.Scene.Transform
             * @param   {JuiceBoxEngine.Resources.ResourceManager}    resourceManager
             * @return  {void}
             */
            Initialize: function (resourceManager) {

            }
        }
    });

    Bridge.define("JuiceBoxEngine.Sound.AudioSource", {
        inherits: [JuiceBoxEngine.Scene.IComponent],
        fields: {
            Name: null,
            Enabled: false,
            Parent: null,
            /**
             * Is the sound currently playing?
             *
             * @instance
             * @public
             * @memberof JuiceBoxEngine.Sound.AudioSource
             * @function Playing
             * @type boolean
             */
            Playing: false,
            /**
             * Is the sound currently looping?
             *
             * @instance
             * @public
             * @memberof JuiceBoxEngine.Sound.AudioSource
             * @function Looping
             * @type boolean
             */
            Looping: false,
            _resourceManager: null,
            _sound: null,
            _element: null
        },
        alias: [
            "Name", "JuiceBoxEngine$Scene$IComponent$Name",
            "Enabled", "JuiceBoxEngine$Scene$IComponent$Enabled",
            "Parent", "JuiceBoxEngine$Scene$IComponent$Parent",
            "Initialize", "JuiceBoxEngine$Scene$IComponent$Initialize",
            "Unique", "JuiceBoxEngine$Scene$IComponent$Unique",
            "Update", "JuiceBoxEngine$Scene$IComponent$Update"
        ],
        methods: {
            Initialize: function (resourceManager) {
                this._resourceManager = resourceManager;
                this._element = new Audio();
            },
            Unique: function () {
                return false;
            },
            SetAudio: function (sound) {
                this._sound = sound;
                this._element = new Audio();
                this._element.src = sound.Name;
            },
            /**
             * Play the audio.
             *
             * @instance
             * @public
             * @this JuiceBoxEngine.Sound.AudioSource
             * @memberof JuiceBoxEngine.Sound.AudioSource
             * @return  {void}
             */
            Play: function () {
                if (this._element != null) {
                    this._element.play();
                }
            },
            /**
             * Enable or disable looping.
             *
             * @instance
             * @public
             * @this JuiceBoxEngine.Sound.AudioSource
             * @memberof JuiceBoxEngine.Sound.AudioSource
             * @param   {boolean}    loop    True for looping, false for not.
             * @return  {void}
             */
            Loop: function (loop) {
                this.Looping = loop;

                if (this._element != null) {
                    this._element.loop = loop;
                }
            },
            Update: function () {

            }
        }
    });

    Bridge.define("JuiceBoxEngine.Sound.Sound", {
        inherits: [JuiceBoxEngine.Resources.IResource],
        fields: {
            Name: null,
            Loaded: false,
            SoundElement: null
        },
        alias: [
            "Name", "JuiceBoxEngine$Resources$IResource$Name",
            "Loaded", "JuiceBoxEngine$Resources$IResource$Loaded"
        ]
    });

    Bridge.define("JuiceBoxEngine.Sound.SoundResourceLoader", {
        inherits: [JuiceBoxEngine.Resources.ResourceLoader],
        ctors: {
            ctor: function (name, extension) {
                this.$initialize();
                JuiceBoxEngine.Resources.ResourceLoader.ctor.call(this, name, extension);
            }
        },
        methods: {
            /**
             * Load sound resource. This is done by using a HTML element.
             *
             * @instance
             * @public
             * @override
             * @this JuiceBoxEngine.Sound.SoundResourceLoader
             * @memberof JuiceBoxEngine.Sound.SoundResourceLoader
             * @param   {string}                                path    Path of the file.
             * @return  {JuiceBoxEngine.Resources.IResource}            The sound resource.
             */
            Load: function (path) {
                var sound = new JuiceBoxEngine.Sound.Sound();
                sound.Name = path;
                sound.Loaded = false;

                var element = new Audio();
                element.src = path;
                element.load();
                element.onload = function (x) {
                    sound.Loaded = true;
                    sound.SoundElement = element;
                };

                return sound;
            }
        }
    });

    Bridge.define("JuiceBoxEngine.Graphics.RenderTarget", {
        inherits: [JuiceBoxEngine.Graphics.Texture2D],
        fields: {
            Target: null
        },
        ctors: {
            ctor: function (width, height) {
                this.$initialize();
                JuiceBoxEngine.Graphics.Texture2D.ctor.call(this);
                this.Width = width;
                this.Height = height;

                this.Texture = JuiceBoxEngine.Graphics.GraphicsManager.Instance.Context.CreateTexture$1(width, height);

                this.Target = JuiceBoxEngine.Graphics.GraphicsManager.Instance.Context.CreateRenderTarget(width, height, this);
            }
        }
    });

    Bridge.define("JuiceBoxEngine.Graphics.Sprite", {
        inherits: [JuiceBoxEngine.Graphics.GraphicsComponent],
        fields: {
            _texture: null,
            /**
             * Pixel perfect sprites round their position to the nearest integer.
             *
             * @instance
             * @public
             * @memberof JuiceBoxEngine.Graphics.Sprite
             * @function PixelPerfect
             * @type boolean
             */
            PixelPerfect: false,
            _sourceRectangle: null,
            UsePositionForDepth: false,
            _offset: null,
            _vertexBuffer: null,
            _transform: null,
            _program: null,
            _command: null,
            _loaded: false
        },
        props: {
            /**
             * The texture to use.
             *
             * @instance
             * @public
             * @memberof JuiceBoxEngine.Graphics.Sprite
             * @function Texture
             * @type JuiceBoxEngine.Graphics.Texture2D
             */
            Texture: {
                get: function () {
                    return this._texture;
                },
                set: function (value) {
                    this._texture = value;
                    this.SourceRectangle = new JuiceBoxEngine.Math.Rectangle.$ctor1(0, 0, this._texture.Width, this._texture.Height);
                    this.UpdateSprite();
                }
            },
            SourceRectangle: {
                get: function () {
                    return this._sourceRectangle.$clone();
                },
                set: function (value) {
                    this._sourceRectangle = value.$clone();
                    this.UpdateSprite();
                }
            },
            Offset: {
                get: function () {
                    return this._offset.$clone();
                },
                set: function (value) {
                    this._offset = value.$clone();
                }
            }
        },
        alias: [
            "Initialize", "JuiceBoxEngine$Scene$IComponent$Initialize",
            "Unique", "JuiceBoxEngine$Scene$IComponent$Unique",
            "Update", "JuiceBoxEngine$Scene$IComponent$Update"
        ],
        ctors: {
            init: function () {
                this._sourceRectangle = new JuiceBoxEngine.Math.Rectangle();
                this._offset = new JuiceBoxEngine.Math.Vector2();
                this._loaded = false;
            },
            ctor: function () {
                this.$initialize();
                JuiceBoxEngine.Graphics.GraphicsComponent.ctor.call(this);
                this.PixelPerfect = true;
                this.UsePositionForDepth = true;
            }
        },
        methods: {
            /**
             * Called on component initialisation.
             *
             * @instance
             * @public
             * @override
             * @this JuiceBoxEngine.Graphics.Sprite
             * @memberof JuiceBoxEngine.Graphics.Sprite
             * @param   {JuiceBoxEngine.Resources.ResourceManager}    resourceManager
             * @return  {void}
             */
            Initialize: function (resourceManager) {
                this._transform = this.Parent.GetComponent(JuiceBoxEngine.Scene.Transform);
                this._texture = null;
                this._offset = new JuiceBoxEngine.Math.Vector2.ctor();
                this._program = Bridge.cast(resourceManager.Load$1("Shaders/Sprite.vert"), JuiceBoxEngine.Graphics.ShaderProgram);

                this._vertexBuffer = new JuiceBoxEngine.Graphics.VertexBuffer.ctor();
                this._vertexBuffer.SetAttribute(new JuiceBoxEngine.Graphics.VertexAttribute.$ctor1("a_pos", 3, false, 20, 0));
                this._vertexBuffer.SetAttribute(new JuiceBoxEngine.Graphics.VertexAttribute.$ctor1("a_tex", 2, false, 20, 12));

                // Init graphics command.
                this._command = new JuiceBoxEngine.Graphics.GraphicsCommand();
                this._command.Data.add("texture", null);
                this._command.VertexBuffer = this._vertexBuffer;
                this._command.Program = this._program;
            },
            /**
             * Generate vertexbuffer based on the source rectangle.
             *
             * @instance
             * @private
             * @this JuiceBoxEngine.Graphics.Sprite
             * @memberof JuiceBoxEngine.Graphics.Sprite
             * @return  {Array.<number>}
             */
            GenerateVertexBuffer: function () {
                if (!this._texture.Loaded) {
                    return null;
                }

                var width = this._sourceRectangle.Width;
                var height = this._sourceRectangle.Height;

                // The texture coords.
                var lowerLeft = new JuiceBoxEngine.Math.Vector2.$ctor2(this._sourceRectangle.X / this.Texture.Width, this._sourceRectangle.Y / this.Texture.Height + height / this.Texture.Height);
                var upperLeft = new JuiceBoxEngine.Math.Vector2.$ctor2(this._sourceRectangle.X / this.Texture.Width, this._sourceRectangle.Y / this.Texture.Height);

                var lowerRight = new JuiceBoxEngine.Math.Vector2.$ctor2(this._sourceRectangle.X / this.Texture.Width + width / this.Texture.Width, this._sourceRectangle.Y / this.Texture.Height + height / this.Texture.Height);
                var upperRight = new JuiceBoxEngine.Math.Vector2.$ctor2(this._sourceRectangle.X / this.Texture.Width + width / this.Texture.Width, this._sourceRectangle.Y / this.Texture.Height);

                var depth = this.Parent.Transform.Position.Z;

                // FIXME: 100 is the camera far plane.
                if (this.UsePositionForDepth) {
                    depth = 100.0 - this.Parent.Transform.Position.Y / 10.0;
                }

                var data = System.Array.init([-0.5 * width, -0.5 * height, depth, lowerLeft.X, lowerLeft.Y, 0.5 * width, -0.5 * height, depth, lowerRight.X, lowerRight.Y, 0.5 * width, 0.5 * height, depth, upperRight.X, upperRight.Y, -0.5 * width, -0.5 * height, depth, lowerLeft.X, lowerLeft.Y, -0.5 * width, 0.5 * height, depth, upperLeft.X, upperLeft.Y, 0.5 * width, 0.5 * height, depth, upperRight.X, upperRight.Y], System.Single);

                return data;
            },
            /**
             * Render the sprite.
             *
             * @instance
             * @public
             * @override
             * @this JuiceBoxEngine.Graphics.Sprite
             * @memberof JuiceBoxEngine.Graphics.Sprite
             * @return  {void}
             */
            Render: function () {
                if (this._texture == null || !this._texture.Loaded) {
                    return;
                }

                // Add offset to the position of the object and calculate the world matrix.
                this.Parent.Transform.Position = JuiceBoxEngine.Math.Vector3.op_Addition(this.Parent.Transform.Position.$clone(), new JuiceBoxEngine.Math.Vector3.$ctor2(this.Offset.X, this.Offset.Y, 0.0));
                if (this.PixelPerfect) {
                    this._command.WorldMatrix = this._transform.GetWorldMatrixPixelPerfect2D();
                } else {
                    this._command.WorldMatrix = this._transform.GetWorldMatrix2D();
                }
                this.Parent.Transform.Position = JuiceBoxEngine.Math.Vector3.op_Subtraction(this.Parent.Transform.Position.$clone(), new JuiceBoxEngine.Math.Vector3.$ctor2(this.Offset.X, this.Offset.Y, 0.0));

                this._command.Data.set("texture", this.Texture);

                // Execute command.
                JuiceBoxEngine.Graphics.GraphicsManager.Instance.Context.Command(this._command);
            },
            UpdateSprite: function () {
                var data = this.GenerateVertexBuffer();

                if (data != null) {
                    this._vertexBuffer.UpdateData(data);
                }
            },
            /**
             * Only one sprite may exist on a gameobject.
             *
             * @instance
             * @public
             * @override
             * @this JuiceBoxEngine.Graphics.Sprite
             * @memberof JuiceBoxEngine.Graphics.Sprite
             * @return  {boolean}
             */
            Unique: function () {
                return true;
            },
            /**
             * Called every frame.
             *
             * @instance
             * @public
             * @override
             * @this JuiceBoxEngine.Graphics.Sprite
             * @memberof JuiceBoxEngine.Graphics.Sprite
             * @return  {void}
             */
            Update: function () {
                if (!this._loaded && this._texture.Loaded) {
                    this._loaded = true;
                    if (this.SourceRectangle.Width === 0 && this.SourceRectangle.Height === 0) {
                        this.SourceRectangle = new JuiceBoxEngine.Math.Rectangle.$ctor1(0, 0, this._texture.Width, this._texture.Height);
                    }
                    this.UpdateSprite();
                }
            }
        }
    });

    Bridge.define("JuiceBoxEngine.Graphics.Text", {
        inherits: [JuiceBoxEngine.Graphics.GraphicsComponent],
        fields: {
            _text: null,
            _alignment: 0,
            _color: null,
            Font: null,
            _manager: null,
            _command: null
        },
        props: {
            DisplayText: {
                get: function () {
                    return this._text;
                },
                set: function (value) {
                    if (!System.String.equals(this._text, value)) {
                        this._text = value;
                        this.UpdateText();
                    }
                }
            },
            Alignment: {
                get: function () {
                    return this._alignment;
                },
                set: function (value) {
                    if (this._alignment !== value) {
                        this._alignment = value;
                        this.UpdateText();
                    }
                }
            },
            Color: {
                get: function () {
                    return this._color.$clone();
                },
                set: function (value) {
                    if (!Bridge.equals(this._color, value.$clone())) {
                        this._color = value.$clone();
                        this.UpdateText();
                    }
                }
            }
        },
        alias: [
            "Initialize", "JuiceBoxEngine$Scene$IComponent$Initialize",
            "Unique", "JuiceBoxEngine$Scene$IComponent$Unique",
            "Update", "JuiceBoxEngine$Scene$IComponent$Update"
        ],
        ctors: {
            init: function () {
                this._color = new JuiceBoxEngine.Math.Color32();
            }
        },
        methods: {
            Initialize: function (resourceManager) {
                this._manager = resourceManager;

                this.Font = resourceManager.Load(JuiceBoxEngine.Graphics.Font, "Arial.bff");
                this._alignment = JuiceBoxEngine.Graphics.TextAlignment.Left;
                this._color = new JuiceBoxEngine.Math.Color32.$ctor2(1.0, 1.0, 1.0, 1.0);

                this._command = new JuiceBoxEngine.Graphics.GraphicsCommand();
                this._command.Program = Bridge.as(resourceManager.Load$1("Shaders/Font.vert"), JuiceBoxEngine.Graphics.ShaderProgram);

                this._command.VertexBuffer = new JuiceBoxEngine.Graphics.VertexBuffer.ctor();
                this._command.VertexBuffer.SetAttribute(new JuiceBoxEngine.Graphics.VertexAttribute.$ctor1("a_pos", 3, false, 36, 0));
                this._command.VertexBuffer.SetAttribute(new JuiceBoxEngine.Graphics.VertexAttribute.$ctor1("a_tex", 2, false, 36, 12));
                this._command.VertexBuffer.SetAttribute(new JuiceBoxEngine.Graphics.VertexAttribute.$ctor1("a_col", 4, false, 36, 20));

                this._command.Data.add("texture", this.Font.Texture);
            },
            UpdateText: function () {
                var offset = this.Font.GetWidth(this._text);
                switch (this._alignment) {
                    case JuiceBoxEngine.Graphics.TextAlignment.Left: 
                        offset = 0;
                        break;
                    case JuiceBoxEngine.Graphics.TextAlignment.Right: 
                        offset = -offset;
                        break;
                    case JuiceBoxEngine.Graphics.TextAlignment.Center: 
                        offset /= -2.0;
                        break;
                }

                var offsetVec = new JuiceBoxEngine.Math.Vector3.$ctor2(offset, 0.0, 0.0);

                this._command.VertexBuffer.UpdateData(this.Font.GenerateBuffer(this._text, this._color.$clone(), offsetVec.$clone()));
            },
            Render: function () {
                this._command.WorldMatrix = this.Parent.Transform.GetWorldMatrixPixelPerfect2D();
                JuiceBoxEngine.Graphics.GraphicsManager.Instance.Context.Command(this._command);
            },
            Unique: function () {
                return false;
            },
            Update: function () {

            }
        }
    });

    Bridge.define("JuiceBoxEngine.Graphics.TileMap", {
        inherits: [JuiceBoxEngine.Graphics.GraphicsComponent],
        fields: {
            /**
             * Tilemap sprites.
             *
             * @instance
             * @public
             * @memberof JuiceBoxEngine.Graphics.TileMap
             * @function Sprites
             * @type JuiceBoxEngine.Graphics.Texture2D
             */
            Sprites: null,
            
            Map: null,
            Depth: 0,
            _tileSize: 0,
            _context: null,
            _vertexBuffer: null,
            _program: null,
            _command: null
        },
        props: {
            /**
             * The size of one tile in the sheet. (All tiles MUST be of same size)
             *
             * @instance
             * @public
             * @memberof JuiceBoxEngine.Graphics.TileMap
             * @function TileSize
             * @type number
             */
            TileSize: {
                get: function () {
                    return this._tileSize;
                },
                set: function (value) {
                    this._tileSize = value;
                    this._command.Data.set("tileSize", Bridge.box(this._tileSize, System.Single, System.Single.format, System.Single.getHashCode));
                }
            }
        },
        alias: [
            "Initialize", "JuiceBoxEngine$Scene$IComponent$Initialize",
            "Unique", "JuiceBoxEngine$Scene$IComponent$Unique",
            "Update", "JuiceBoxEngine$Scene$IComponent$Update"
        ],
        methods: {
            /**
             * Intializes the Tilemap.
             *
             * @instance
             * @public
             * @override
             * @this JuiceBoxEngine.Graphics.TileMap
             * @memberof JuiceBoxEngine.Graphics.TileMap
             * @param   {JuiceBoxEngine.Resources.ResourceManager}    resourceManager
             * @return  {void}
             */
            Initialize: function (resourceManager) {
                var data = System.Array.init([-1.0, -1.0, this.Depth, 0.0, 1.0, 1.0, -1.0, this.Depth, 1.0, 1.0, 1.0, 1.0, this.Depth, 1.0, 0.0, -1.0, -1.0, this.Depth, 0.0, 1.0, -1.0, 1.0, this.Depth, 0.0, 0.0, 1.0, 1.0, this.Depth, 1.0, 0.0], System.Single);


                this._context = JuiceBoxEngine.Graphics.GraphicsManager.Instance.Context;
                this._vertexBuffer = new JuiceBoxEngine.Graphics.VertexBuffer.$ctor1(data);

                this._vertexBuffer.SetAttribute(new JuiceBoxEngine.Graphics.VertexAttribute.$ctor1("a_pos", 3, false, 20, 0));
                this._vertexBuffer.SetAttribute(new JuiceBoxEngine.Graphics.VertexAttribute.$ctor1("a_tex", 2, false, 20, 12));

                this._program = Bridge.cast(resourceManager.Load$1("Shaders/TileMap.vert"), JuiceBoxEngine.Graphics.ShaderProgram);

                this._command = new JuiceBoxEngine.Graphics.GraphicsCommand();
                this._command.Data.add("sprites", null);
                this._command.Data.add("map", null);
                this._command.Data.add("tileSize", Bridge.box(16, System.Int32));
                this._command.VertexBuffer = this._vertexBuffer;
                this._command.Program = this._program;
            },
            /**
             * Render the tilemap.
             *
             * @instance
             * @public
             * @override
             * @this JuiceBoxEngine.Graphics.TileMap
             * @memberof JuiceBoxEngine.Graphics.TileMap
             * @return  {void}
             */
            Render: function () {
                if (this.Sprites != null && this.Map != null) {
                    this._command.Data.set("sprites", this.Sprites);
                    this._command.Data.set("spritesSize", new JuiceBoxEngine.Math.Vector2.$ctor2(this.Sprites.Width, this.Sprites.Height).$clone());
                    this._command.Data.set("mapSize", new JuiceBoxEngine.Math.Vector2.$ctor2(this.Map.Width, this.Map.Height).$clone());
                    this._command.Data.set("tileSize", Bridge.box(16.0, System.Single, System.Single.format, System.Single.getHashCode));

                    this._command.Data.set("map", this.Map);

                    this._context.Command(this._command);
                }
            },
            /**
             * Object can have multiple tilemap components.
             *
             * @instance
             * @public
             * @override
             * @this JuiceBoxEngine.Graphics.TileMap
             * @memberof JuiceBoxEngine.Graphics.TileMap
             * @return  {boolean}        False.
             */
            Unique: function () {
                return false;
            },
            /**
             * Called every frame.
             *
             * @instance
             * @public
             * @override
             * @this JuiceBoxEngine.Graphics.TileMap
             * @memberof JuiceBoxEngine.Graphics.TileMap
             * @return  {void}
             */
            Update: function () {

            }
        }
    });
});

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICJKdWljZUJveEVuZ2luZS5qcyIsCiAgInNvdXJjZVJvb3QiOiAiIiwKICAic291cmNlcyI6IFsiUGh5c2ljcy9CYXNlL01hdGhzLmNzIiwiUGh5c2ljcy9CYXNlL1JlY3RhbmdsZUYuY3MiLCJQaHlzaWNzL0Jhc2UvVmVjdG9yMi5jcyIsIlBoeXNpY3MvR3JpZC5jcyIsIkdyYXBoaWNzL0RlYnVnZ2luZy9EZWJ1Z1JlbmRlcmVyLmNzIiwiUmVzb3VyY2VzL1Jlc291cmNlTG9hZGVyLmNzIiwiR3JhcGhpY3MvR3JhcGhpY3NDb21tYW5kLmNzIiwiR3JhcGhpY3MvR3JhcGhpY3NDb250ZXh0LmNzIiwiR3JhcGhpY3MvR3JhcGhpY3NNYW5hZ2VyLmNzIiwiR3JhcGhpY3MvUG9zdFByb2Nlc3NpbmcvUG9zdFByb2Nlc3NpbmdFZmZlY3QuY3MiLCJHcmFwaGljcy9HVUkvR1VJRWxlbWVudC5jcyIsIkdyYXBoaWNzL0dVSS9HVUlNYW5hZ2VyLmNzIiwiR3JhcGhpY3MvUG9zdFByb2Nlc3NpbmcvUG9zdFByb2Nlc3NpbmdNYW5hZ2VyLmNzIiwiR3JhcGhpY3MvVmVydGV4QXR0cmlidXRlLmNzIiwiR3JhcGhpY3MvVmVydGV4QnVmZmVyLmNzIiwiSW5wdXQvSW5wdXRNYW5hZ2VyLmNzIiwiSnVpY2Vib3hFbmdpbmUuY3MiLCJNYXRoL0NvbG9yMzIuY3MiLCJNYXRoL01hdGguY3MiLCJNYXRoL01hdHJpeDQuY3MiLCJNYXRoL1JlY3RhbmdsZS5jcyIsIk1hdGgvVmVjdG9yMi5jcyIsIk1hdGgvVmVjdG9yMy5jcyIsIk1hdGgvVmVjdG9yNC5jcyIsIlJlc291cmNlcy9SZXNvdXJjZU1hbmFnZXIuY3MiLCJTY2VuZS9HYW1lT2JqZWN0LmNzIiwiU2NlbmUvU2NlbmUuY3MiLCJVdGlsL0NvbmZpZy5jcyIsIlV0aWwvVGltZS5jcyIsIlBoeXNpY3MvQm94LmNzIiwiUGh5c2ljcy9Db2xsaXNpb24uY3MiLCJQaHlzaWNzL0hpdC5jcyIsIlBoeXNpY3MvTW92ZW1lbnQuY3MiLCJQaHlzaWNzL1Jlc3BvbnNlcy9Cb3VuY2VSZXNwb25zZS5jcyIsIlBoeXNpY3MvUmVzcG9uc2VzL0NvbGxpc2lvblJlc3BvbnNlLmNzIiwiUGh5c2ljcy9SZXNwb25zZXMvQ3Jvc3NSZXNwb25zZS5jcyIsIlBoeXNpY3MvUmVzcG9uc2VzL1RvdWNoUmVzcG9uc2UuY3MiLCJQaHlzaWNzL1Jlc3BvbnNlcy9TbGlkZVJlc3BvbnNlLmNzIiwiUGh5c2ljcy9Xb3JsZC5jcyIsIkdyYXBoaWNzL0ZvbnQuY3MiLCJHcmFwaGljcy9Gb250UmVzb3VyY2VMb2FkZXIuY3MiLCJHcmFwaGljcy9Qb3N0UHJvY2Vzc2luZy9HcmF5U2NhbGUuY3MiLCJHcmFwaGljcy9HVUkvR1VJVGV4dC5jcyIsIkdyYXBoaWNzL1RleHR1cmUyRC5jcyIsIkdyYXBoaWNzL1NoYWRlclByb2dyYW0uY3MiLCJHcmFwaGljcy9TaGFkZXJSZXNvdXJjZUxvYWRlci5jcyIsIkdyYXBoaWNzL1RleHR1cmVSZXNvdXJjZUxvYWRlci5jcyIsIlNjZW5lL0NhbWVyYS5jcyIsIlNjZW5lL0NvbGxpZGVyLmNzIiwiU2NlbmUvVHJhbnNmb3JtLmNzIiwiU291bmQvQXVkaW9Tb3VyY2UuY3MiLCJTb3VuZC9Tb3VuZFJlc291cmNlTG9hZGVyLmNzIiwiR3JhcGhpY3MvUmVuZGVyVGFyZ2V0LmNzIiwiR3JhcGhpY3MvU3ByaXRlLmNzIiwiR3JhcGhpY3MvVGV4dC5jcyIsIkdyYXBoaWNzL1RpbGVNYXAuY3MiXSwKICAibmFtZXMiOiBbIiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs2QkFheUJBOzs7OEJBZUNBO21DQUtLQTttQ0FLQUE7aUNBS0ZBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7dUNBV0tBLFFBQWNBLFFBQWNBLFFBQWNBLFNBQWVBO29CQUV4RkEsT0FB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QUFDQSxjQUFjQSxnQkFBZ0JBLENBQUNBLGNBQWNBLGdCQUFnQkEsQ0FBQ0EsY0FBY0E7b0JBQ3pIQSxVQUFZQSxDQUFDQSxDQUFDQSxDQUFDQSxjQUFjQSxlQUFlQSxDQUFDQSxjQUFjQSxnQkFBZ0JBLENBQUNBLGNBQWNBLGdCQUFnQkEsQ0FBQ0EsY0FBY0E7b0JBQ3pIQSxVQUFZQSxDQUFDQSxDQUFDQSxDQUFDQSxjQUFjQSxlQUFlQSxDQUFDQSxjQUFjQSxnQkFBZ0JBLENBQUNBLGNBQWNBLGdCQUFnQkEsQ0FBQ0EsY0FBY0E7b0JBQ3pIQSxVQUFZQSxDQUFDQSxDQUFDQSxDQUFDQSxjQUFjQSxlQUFlQSxDQUFDQSxjQUFjQSxnQkFBZ0JBLENBQUNBLGNBQWNBLGdCQUFnQkEsQ0FBQ0EsY0FBY0E7b0JBQ3pIQSxVQUFZQSxDQUFDQSxDQUFDQSxDQUFDQSxjQUFjQSxlQUFlQSxDQUFDQSxjQUFjQSxnQkFBZ0JBLENBQUNBLGNBQWNBLGdCQUFnQkEsQ0FBQ0EsY0FBY0E7b0JBQ3pIQSxVQUFZQSxDQUFDQSxDQUFDQSxDQUFDQSxjQUFjQSxlQUFlQSxDQUFDQSxjQUFjQSxnQkFBZ0JBLENBQUNBLGNBQWNBLGdCQUFnQkEsQ0FBQ0EsY0FBY0E7b0JBQ3pIQSxVQUFZQSxDQUFDQSxDQUFDQSxDQUFDQSxjQUFjQSxlQUFlQSxDQUFDQSxjQUFjQSxnQkFBZ0JBLENBQUNBLGNBQWNBLGdCQUFnQkEsQ0FBQ0EsY0FBY0E7b0JBQ3pIQSxVQUFZQSxDQUFDQSxDQUFDQSxDQUFDQSxjQUFjQSxlQUFlQSxDQUFDQSxjQUFjQSxnQkFBZ0JBLENBQUNBLGNBQWNBLGdCQUFnQkEsQ0FBQ0EsY0FBY0E7b0JBQ3pIQSxVQUFZQSxDQUFDQSxDQUFDQSxDQUFDQSxjQUFjQSxlQUFlQSxDQUFDQSxjQUFjQSxnQkFBZ0JBLENBQUNBLGNBQWNBLGdCQUFnQkEsQ0FBQ0EsY0FBY0E7b0JBQ3pIQSxVQUFZQSxDQUFDQSxDQUFDQSxDQUFDQSxjQUFjQSxlQUFlQSxDQUFDQSxjQUFjQSxnQkFBZ0JBLENBQUNBLGNBQWNBLGdCQUFnQkEsQ0FBQ0EsY0FBY0E7b0JBQ3pIQSxVQUFZQSxDQUFDQSxDQUFDQSxDQUFDQSxjQUFjQSxlQUFlQSxDQUFDQSxjQUFjQSxnQkFBZ0JBLENBQUNBLGNBQWNBLGdCQUFnQkEsQ0FBQ0EsY0FBY0E7b0JBQ3pIQSxVQUFZQSxDQUFDQSxDQUFDQSxDQUFDQSxjQUFjQSxlQUFlQSxDQUFDQSxjQUFjQSxnQkFBZ0JBLENBQUNBLGNBQWNBLGdCQUFnQkEsQ0FBQ0EsY0FBY0E7b0JBQ3pIQSxVQUFZQSxDQUFDQSxDQUFDQSxDQUFDQSxjQUFjQSxlQUFlQSxDQUFDQSxjQUFjQSxnQkFBZ0JBLENBQUNBLGNBQWNBLGdCQUFnQkEsQ0FBQ0EsY0FBY0E7b0JBQ3pIQSxVQUFZQSxDQUFDQSxDQUFDQSxDQUFDQSxjQUFjQSxlQUFlQSxDQUFDQSxjQUFjQSxnQkFBZ0JBLENBQUNBLGNBQWNBLGdCQUFnQkEsQ0FBQ0EsY0FBY0E7b0JBQ3pIQSxVQUFZQSxDQUFDQSxDQUFDQSxDQUFDQSxjQUFjQSxlQUFlQSxDQUFDQSxjQUFjQSxnQkFBZ0JBLENBQUNBLGNBQWNBLGdCQUFnQkEsQ0FBQ0EsY0FBY0E7b0JBQ3pIQSxVQUFZQSxDQUFDQSxDQUFDQSxDQUFDQSxjQUFjQSxlQUFlQSxDQUFDQSxjQUFjQSxnQkFBZ0JBLENBQUNBLGNBQWNBLGdCQUFnQkEsQ0FBQ0EsY0FBY0E7b0JBQ3pIQSxjQUFjQTtvQkFDZEEsY0FBY0E7b0JBQ2RBLGNBQWNBO29CQUNkQSxjQUFjQTtvQkFDZEEsY0FBY0E7b0JBQ2RBLGNBQWNBO29CQUNkQSxjQUFjQTtvQkFDZEEsY0FBY0E7b0JBQ2RBLGNBQWNBO29CQUNkQSxjQUFjQTtvQkFDZEEsY0FBY0E7b0JBQ2RBLGNBQWNBO29CQUNkQSxjQUFjQTtvQkFDZEEsY0FBY0E7b0JBQ2RBLGNBQWNBO29CQUNkQSxjQUFjQTtvQkFDZEEsT0FBT0E7Ozs7Ozs7Ozs7Ozs7K0NBTytCQSxNQUFjQTtvQkFFcERBOztvQkFFQUEsUUFBVUE7b0JBQ1ZBLFFBQVVBO29CQUNWQSxRQUFVQTtvQkFDVkEsV0FBYUEsQUFBT0EsNkJBQVNBO29CQUM3QkEsVUFBWUEsQUFBT0EsNkJBQVNBO29CQUM1QkEsWUFBY0EsSUFBSUE7b0JBQ2xCQSxZQUFjQSxJQUFJQTtvQkFDbEJBLFdBQWFBLElBQUlBO29CQUNqQkEsV0FBYUEsSUFBSUE7b0JBQ2pCQSxXQUFhQSxJQUFJQTtvQkFDakJBLFdBQWFBLElBQUlBOztvQkFFakJBLGFBQWFBLFFBQVFBLENBQUNBLE1BQU1BLENBQUNBLE1BQUtBO29CQUNsQ0EsYUFBYUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsTUFBTUEsU0FBU0EsQ0FBQ0EsT0FBT0E7b0JBQzdDQSxhQUFhQSxDQUFDQSxPQUFPQSxDQUFDQSxNQUFNQSxTQUFTQSxDQUFDQSxPQUFPQTtvQkFDN0NBO29CQUNBQSxhQUFhQSxDQUFDQSxPQUFPQSxDQUFDQSxNQUFNQSxTQUFTQSxDQUFDQSxPQUFPQTtvQkFDN0NBLGFBQWFBLFFBQVFBLENBQUNBLE1BQU1BLENBQUNBLE1BQUtBO29CQUNsQ0EsYUFBYUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsTUFBTUEsU0FBU0EsQ0FBQ0EsT0FBT0E7b0JBQzdDQTtvQkFDQUEsYUFBYUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsTUFBTUEsU0FBU0EsQ0FBQ0EsT0FBT0E7b0JBQzdDQSxhQUFhQSxDQUFDQSxPQUFPQSxDQUFDQSxNQUFNQSxTQUFTQSxDQUFDQSxPQUFPQTtvQkFDN0NBLGFBQWFBLE9BQU9BLENBQUNBLE1BQU1BLENBQUNBLE1BQUtBO29CQUNqQ0E7b0JBQ0FBO29CQUNBQTtvQkFDQUE7b0JBQ0FBOztvQkFFQUEsT0FBT0E7Ozs7Ozs7Ozs7Ozs7O3dDQVF3QkEsZ0JBQXdCQSxjQUFzQkE7b0JBRTdFQSxhQUFpQkEsSUFBSUE7O29CQUVyQkEsYUFBaUJBLHNDQUFrQkEsb0VBQWlCQTtvQkFDcERBLGNBQWtCQSxzQ0FBa0JBLGtDQUFjQSx5QkFBZ0JBO29CQUNsRUEsY0FBa0JBLGtDQUFjQSxpQkFBUUE7O29CQUV4Q0EsYUFBYUE7b0JBQ2JBLGFBQWFBO29CQUNiQSxhQUFhQTtvQkFDYkE7b0JBQ0FBLGFBQWFBO29CQUNiQSxhQUFhQTtvQkFDYkEsYUFBYUE7b0JBQ2JBO29CQUNBQSxhQUFhQTtvQkFDYkEsYUFBYUE7b0JBQ2JBLGFBQWFBO29CQUNiQTtvQkFDQUEsYUFBYUEsQ0FBQ0EsZ0NBQVlBLGtCQUFTQTtvQkFDbkNBLGFBQWFBLENBQUNBLGdDQUFZQSxrQkFBU0E7b0JBQ25DQSxhQUFhQSxDQUFDQSxnQ0FBWUEsaUJBQVFBO29CQUNsQ0E7O29CQUVBQSxPQUFPQTs7Ozs7Ozs7Ozs7Ozs7OzhDQVc4QkEsT0FBYUEsUUFBY0EsWUFBa0JBO29CQUVsRkEsYUFBaUJBLElBQUlBOztvQkFFckJBLGFBQWFBLE1BQUtBO29CQUNsQkEsYUFBYUEsY0FBYUE7b0JBQzFCQSxhQUFhQSxNQUFLQTtvQkFDbEJBLGFBQWFBLGNBQWFBO29CQUMxQkEsYUFBYUEsTUFBS0EsQ0FBQ0EsYUFBYUE7b0JBQ2hDQSxhQUFhQSxjQUFhQTtvQkFDMUJBLGFBQWFBO29CQUNiQSxhQUFhQSxhQUFhQSxDQUFDQSxhQUFhQTtvQkFDeENBOztvQkFFQUEsT0FBT0E7Ozs7Ozs7Ozs7Ozs7Ozt3REFTd0NBLGFBQW1CQSxhQUFtQkEsbUJBQXlCQTtvQkFFOUdBLGFBQWlCQSxJQUFJQTs7b0JBRXJCQSxVQUFZQSxNQUFLQSxDQUFDQSw2QkFBU0EsQ0FBQ0E7b0JBQzVCQSxXQUFhQSxNQUFNQTs7b0JBRW5CQSxhQUFhQTtvQkFDYkEsYUFBYUEsY0FBYUE7b0JBQzFCQSxhQUFhQTtvQkFDYkEsYUFBYUEsY0FBYUE7b0JBQzFCQSxhQUFhQTtvQkFDYkEsYUFBYUEsbUJBQW1CQSxDQUFDQSxvQkFBb0JBO29CQUNyREEsYUFBYUE7b0JBQ2JBLGFBQWFBLGNBQWFBO29CQUMxQkEsYUFBYUEsQ0FBQ0Esb0JBQW9CQSxvQkFBb0JBLENBQUNBLG9CQUFvQkE7O29CQUUzRUEsT0FBT0E7Ozs7Ozs7Ozs7OzsyQ0FNMkJBO29CQUVsQ0EsYUFBaUJBLElBQUlBOztvQkFFckJBLFdBQWFBLEFBQU9BLDZCQUFTQTtvQkFDN0JBLFdBQWFBLEFBQU9BLDZCQUFTQTs7b0JBRTdCQSxhQUFhQTtvQkFDYkEsYUFBYUE7b0JBQ2JBLGFBQWFBLENBQUNBO29CQUNkQSxhQUFhQTs7b0JBRWJBLE9BQU9BOzs7Ozs7Ozs7Ozs7MkNBTTJCQTtvQkFFbENBLGFBQWlCQSxJQUFJQTs7b0JBRXJCQSxXQUFhQSxBQUFPQSw2QkFBU0E7b0JBQzdCQSxXQUFhQSxBQUFPQSw2QkFBU0E7O29CQUU3QkEsYUFBYUE7b0JBQ2JBLGFBQWFBLENBQUNBO29CQUNkQSxhQUFhQTtvQkFDYkEsYUFBYUE7O29CQUViQSxPQUFPQTs7Ozs7Ozs7Ozs7OzJDQU0yQkE7b0JBRWxDQSxhQUFpQkEsSUFBSUE7O29CQUVyQkEsV0FBYUEsQUFBT0EsNkJBQVNBO29CQUM3QkEsV0FBYUEsQUFBT0EsNkJBQVNBOztvQkFFN0JBLGFBQWFBO29CQUNiQSxhQUFhQTtvQkFDYkEsYUFBYUEsQ0FBQ0E7b0JBQ2RBLGFBQWFBOztvQkFFYkEsT0FBT0E7Ozs7Ozs7Ozs7Ozt1Q0FNdUJBO29CQUU5QkEsYUFBaUJBLElBQUlBO29CQUNyQkEsYUFBYUE7b0JBQ2JBO29CQUNBQTtvQkFDQUE7b0JBQ0FBO29CQUNBQSxhQUFhQTtvQkFDYkE7b0JBQ0FBO29CQUNBQTtvQkFDQUE7b0JBQ0FBLGFBQWFBO29CQUNiQTtvQkFDQUE7b0JBQ0FBO29CQUNBQTtvQkFDQUE7b0JBQ0FBLE9BQU9BOzs7Ozs7Ozs7Ozs7NkNBTTZCQTtvQkFFcENBLGFBQWlCQSxJQUFJQTtvQkFDckJBLGFBQWFBO29CQUNiQSxhQUFhQTtvQkFDYkEsYUFBYUE7b0JBQ2JBLE9BQU9BOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OEJBcFdJQTs7Z0JBRVhBLFdBQU1BO2dCQUFPQTtnQkFBWUE7Z0JBQVlBO2dCQUNyQ0E7Z0JBQVlBLFdBQU1BO2dCQUFPQTtnQkFBWUE7Z0JBQ3JDQTtnQkFBWUE7Z0JBQVlBLFdBQU1BO2dCQUFPQTtnQkFDckNBO2dCQUFZQTtnQkFBWUE7Z0JBQVlBLFdBQU1BOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OEJBb0IvQkEsS0FBV0EsS0FBV0EsS0FBV0EsS0FDaENBLEtBQVdBLEtBQVdBLEtBQVdBLEtBQ2pDQSxLQUFXQSxLQUFXQSxLQUFXQSxLQUNqQ0EsS0FBV0EsS0FBV0EsS0FBV0E7O2dCQUU3Q0EsV0FBTUE7Z0JBQ05BLFdBQU1BO2dCQUNOQSxXQUFNQTtnQkFDTkEsV0FBTUE7Z0JBQ05BLFdBQU1BO2dCQUNOQSxXQUFNQTtnQkFDTkEsV0FBTUE7Z0JBQ05BLFdBQU1BO2dCQUNOQSxXQUFNQTtnQkFDTkEsV0FBTUE7Z0JBQ05BLFdBQU1BO2dCQUNOQSxXQUFNQTtnQkFDTkEsV0FBTUE7Z0JBQ05BLFdBQU1BO2dCQUNOQSxXQUFNQTtnQkFDTkEsV0FBTUE7Ozs7Ozs7Ozs7Ozs7Ozs7OytCQTZUUUE7Z0JBSVZBLFFBQVFBO29CQUVKQTt3QkFBUUEsT0FBT0E7b0JBQ2ZBO3dCQUFRQSxPQUFPQTtvQkFDZkE7d0JBQVFBLE9BQU9BO29CQUNmQTt3QkFBUUEsT0FBT0E7b0JBQ2ZBO3dCQUFRQSxPQUFPQTtvQkFDZkE7d0JBQVFBLE9BQU9BO29CQUNmQTt3QkFBUUEsT0FBT0E7b0JBQ2ZBO3dCQUFRQSxPQUFPQTtvQkFDZkE7d0JBQVFBLE9BQU9BO29CQUNmQTt3QkFBUUEsT0FBT0E7b0JBQ2ZBO3dCQUFTQSxPQUFPQTtvQkFDaEJBO3dCQUFTQSxPQUFPQTtvQkFDaEJBO3dCQUFTQSxPQUFPQTtvQkFDaEJBO3dCQUFTQSxPQUFPQTtvQkFDaEJBO3dCQUFTQSxPQUFPQTtvQkFDaEJBO3dCQUFTQSxPQUFPQTs7Z0JBRXBCQSxNQUFNQSxJQUFJQTs7Ozs7Ozs7Ozs7OzsrQkF2QkFBO2dCQTJCVkEsUUFBUUE7b0JBRUpBO3dCQUFRQSxXQUFNQTt3QkFBT0E7b0JBQ3JCQTt3QkFBUUEsV0FBTUE7d0JBQU9BO29CQUNyQkE7d0JBQVFBLFdBQU1BO3dCQUFPQTtvQkFDckJBO3dCQUFRQSxXQUFNQTt3QkFBT0E7b0JBQ3JCQTt3QkFBUUEsV0FBTUE7d0JBQU9BO29CQUNyQkE7d0JBQVFBLFdBQU1BO3dCQUFPQTtvQkFDckJBO3dCQUFRQSxXQUFNQTt3QkFBT0E7b0JBQ3JCQTt3QkFBUUEsV0FBTUE7d0JBQU9BO29CQUNyQkE7d0JBQVFBLFdBQU1BO3dCQUFPQTtvQkFDckJBO3dCQUFRQSxXQUFNQTt3QkFBT0E7b0JBQ3JCQTt3QkFBU0EsV0FBTUE7d0JBQU9BO29CQUN0QkE7d0JBQVNBLFdBQU1BO3dCQUFPQTtvQkFDdEJBO3dCQUFTQSxXQUFNQTt3QkFBT0E7b0JBQ3RCQTt3QkFBU0EsV0FBTUE7d0JBQU9BO29CQUN0QkE7d0JBQVNBLFdBQU1BO3dCQUFPQTtvQkFDdEJBO3dCQUFTQSxXQUFNQTt3QkFBT0E7b0JBQ3RCQTt3QkFBU0EsTUFBTUEsSUFBSUE7Ozs7Ozs7Ozs7Ozs7O2lDQVNiQSxLQUFTQTtnQkFJbkJBLE9BQU9BLGFBQUtBLEdBQUNBLDBCQUFXQTs7Ozs7Ozs7Ozs7Ozs7aUNBSmRBLEtBQVNBO2dCQVNuQkEsYUFBS0EsR0FBQ0EsMEJBQVdBLGNBQVVBOzs7Ozs7Ozs7Ozs7O2dCQVEvQkEsYUFBdUJBLElBQUlBO2dCQUMzQkE7Z0JBQ0FBLEtBQUtBLFdBQVdBLFFBQVVBO29CQUV0QkEsY0FBY0EsbUNBQUtBOztnQkFFdkJBLGNBQWNBO2dCQUNkQSxPQUFPQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs4QkN6ZE1BLEdBQU9BLEdBQU9BLE9BQVdBOztnQkFFdENBLFNBQUlBO2dCQUNKQSxTQUFJQTtnQkFDSkEsYUFBUUE7Z0JBQ1JBLGNBQVNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztvQ0NjZ0JBLFFBQWdCQTtvQkFFekNBLE9BQU9BLDhCQUFVQSw0Q0FBZ0JBLGlCQUFRQTs7Ozs7Ozs7Ozs7OzsyQ0FPVEEsUUFBZ0JBO29CQUVoREEsT0FBUUEsQ0FBQ0EsV0FBV0EsWUFBWUEsQ0FBQ0EsV0FBV0EsWUFDcENBLENBQUNBLFdBQVdBLFlBQVlBLENBQUNBLFdBQVdBOzs7Ozs7Ozs7Ozs7cUNBNkJoQkE7b0JBRTVCQTtvQkFDQUEsT0FBT0E7Ozs7Ozs7Ozs7Ozs7K0JBT2FBLFNBQWlCQTtvQkFFckNBLE9BQU9BLFlBQVlBLFlBQVlBLFlBQVlBOzs7Ozs7Ozs7Ozs7NENBNENkQTtvQkFFN0JBLE9BQU9BLElBQUlBLG1DQUFRQSxDQUFDQSxTQUFTQSxDQUFDQTs7Ozs7Ozs7Ozs7Ozt1Q0FPSEEsUUFBZ0JBO29CQUUzQ0EsT0FBT0EsYUFBWUEsWUFDWkEsYUFBWUE7Ozs7Ozs7Ozs7Ozs7eUNBT1FBLFFBQWdCQTtvQkFFM0NBLE9BQU9BLGFBQVlBLFlBQ1pBLGFBQVlBOzs7Ozs7Ozs7Ozs7O3VDQU9VQSxRQUFnQkE7b0JBRTdDQSxZQUFZQTtvQkFDWkEsWUFBWUE7b0JBQ1pBLE9BQU9BOzs7Ozs7Ozs7Ozs7OzBDQU9zQkEsUUFBZ0JBO29CQUU3Q0EsWUFBWUE7b0JBQ1pBLFlBQVlBO29CQUNaQSxPQUFPQTs7Ozs7Ozs7Ozs7Ozt1Q0FPc0JBLFFBQWdCQTtvQkFFN0NBLFlBQVlBO29CQUNaQSxZQUFZQTtvQkFDWkEsT0FBT0E7Ozs7Ozs7Ozs7Ozs7eUNBT3NCQSxRQUFnQkE7b0JBRTdDQSxZQUFZQTtvQkFDWkEsWUFBWUE7b0JBQ1pBLE9BQU9BOzs7Ozs7Ozs7Ozs7O3lDQU9zQkEsUUFBY0E7b0JBRTNDQSxZQUFZQTtvQkFDWkEsWUFBWUE7b0JBQ1pBLE9BQU9BOzs7Ozs7Ozs7Ozs7O3VDQU9zQkEsUUFBZ0JBO29CQUU3Q0EsWUFBWUE7b0JBQ1pBLFlBQVlBO29CQUNaQSxPQUFPQTs7Ozs7Ozs7Ozs7Ozt5Q0FPc0JBLFFBQWdCQTtvQkFFN0NBLFlBQVlBO29CQUNaQSxZQUFZQTtvQkFDWkEsT0FBT0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzhCQXROSUEsR0FBU0E7O2dCQUVwQkEsU0FBSUE7Z0JBQ0pBLFNBQUlBOzs7Ozs7Ozs7Ozs7OEJBS09BOztnQkFFWEEsU0FBSUE7Z0JBQ0pBLFNBQUlBOzs7Ozs7Ozs7Ozs7Ozs7OztnQkEwQkpBLE9BQU9BLDhCQUFVQSxDQUFDQSxTQUFJQSxVQUFLQSxDQUFDQSxTQUFJQTs7Ozs7Ozs7Ozs7O2dCQU9oQ0EsT0FBT0EsQ0FBQ0EsU0FBSUEsVUFBS0EsQ0FBQ0EsU0FBSUE7Ozs7Ozs7Ozs7OztnQkFNdEJBLGFBQWVBLDhCQUFVQSxDQUFDQSxTQUFJQSxVQUFLQSxDQUFDQSxTQUFJQTtnQkFDeENBLFNBQVNBLE1BQU9BO2dCQUNoQkEsVUFBS0E7Z0JBQ0xBLFVBQUtBOzs7Ozs7Ozs7Ozs7O2dCQXlCTEEsT0FBT0EsMkJBQU1BLHNDQUFXQTs7Ozs7Ozs7Ozs7OytCQU1UQTtnQkFFZkEsT0FBT0EsV0FBS0EsV0FDTEEsV0FBS0E7Ozs7Ozs7Ozs7Ozs7OEJBTVlBO2dCQUV4QkEsSUFBSUE7b0JBQ0FBLE9BQU9BLGFBQU9BLHFDQUFTQTs7Z0JBQzNCQTs7Ozs7Ozs7Ozs7OztnQkFTSUEsZUFBZUE7Z0JBQ2ZBLFdBQVdBLENBQUNBLGlDQUFrQkE7Z0JBQzlCQSxPQUFPQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O29DQ3RGY0EsUUFBZ0JBO29CQUV6Q0EsT0FBT0EsOEJBQVVBLDRDQUFnQkEsaUJBQVFBOzs7Ozs7Ozs7Ozs7OzJDQU9UQSxRQUFnQkE7b0JBRWhEQSxPQUFTQSxDQUFDQSxXQUFXQSxZQUFZQSxDQUFDQSxXQUFXQSxZQUNwQ0EsQ0FBQ0EsV0FBV0EsWUFBWUEsQ0FBQ0EsV0FBV0EsWUFDcENBLENBQUNBLFdBQVdBLFlBQVlBLENBQUNBLFdBQVdBOzs7Ozs7Ozs7Ozs7cUNBOEJqQkE7b0JBRTVCQTtvQkFDQUEsT0FBT0E7Ozs7Ozs7Ozs7Ozs7K0JBT2FBLFNBQWlCQTtvQkFFckNBLE9BQU9BLFlBQVlBLFlBQVlBLFlBQVlBLFlBQVlBLFlBQVlBOzs7Ozs7Ozs7Ozs7O2lDQU8zQ0EsU0FBaUJBO29CQUV6Q0EsUUFBVUEsWUFBWUEsWUFBWUEsWUFBWUE7b0JBQzlDQSxRQUFVQSxDQUFDQSxDQUFDQSxZQUFZQSxZQUFZQSxZQUFZQTtvQkFDaERBLFFBQVVBLFlBQVlBLFlBQVlBLFlBQVlBO29CQUM5Q0EsWUFBWUE7b0JBQ1pBLFlBQVlBO29CQUNaQSxZQUFZQTtvQkFDWkEsT0FBT0E7Ozs7Ozs7Ozs7Ozs0Q0E4Q3NCQTtvQkFFN0JBLE9BQU9BLElBQUlBLG1DQUFRQSxDQUFDQSxTQUFTQSxDQUFDQSxTQUFTQSxDQUFDQTs7Ozs7Ozs7Ozs7Ozt1Q0FPYkEsUUFBZ0JBO29CQUUzQ0EsT0FBT0EsYUFBWUEsWUFDWkEsYUFBWUEsWUFDWkEsYUFBWUE7Ozs7Ozs7Ozs7Ozs7eUNBT1FBLFFBQWdCQTtvQkFFM0NBLE9BQU9BLGFBQVlBLFlBQ1pBLGFBQVlBLFlBQ1pBLGFBQVlBOzs7Ozs7Ozs7Ozs7O3VDQU9VQSxRQUFnQkE7b0JBRTdDQSxZQUFZQTtvQkFDWkEsWUFBWUE7b0JBQ1pBLFlBQVlBO29CQUNaQSxPQUFPQTs7Ozs7Ozs7Ozs7OzswQ0FPc0JBLFFBQWdCQTtvQkFFN0NBLFlBQVlBO29CQUNaQSxZQUFZQTtvQkFDWkEsWUFBWUE7b0JBQ1pBLE9BQU9BOzs7Ozs7Ozs7Ozs7O3VDQU9zQkEsUUFBZ0JBO29CQUU3Q0EsWUFBWUE7b0JBQ1pBLFlBQVlBO29CQUNaQSxZQUFZQTtvQkFDWkEsT0FBT0E7Ozs7Ozs7Ozs7Ozs7eUNBT3NCQSxRQUFnQkE7b0JBRTdDQSxZQUFZQTtvQkFDWkEsWUFBWUE7b0JBQ1pBLFlBQVlBO29CQUNaQSxPQUFPQTs7Ozs7Ozs7Ozs7Ozt5Q0FPc0JBLFFBQWNBO29CQUUzQ0EsWUFBWUE7b0JBQ1pBLFlBQVlBO29CQUNaQSxZQUFZQTtvQkFDWkEsT0FBT0E7Ozs7Ozs7Ozs7Ozs7dUNBT3NCQSxRQUFnQkE7b0JBRTdDQSxZQUFZQTtvQkFDWkEsWUFBWUE7b0JBQ1pBLFlBQVlBO29CQUNaQSxPQUFPQTs7Ozs7Ozs7Ozs7Ozt5Q0FPc0JBLFFBQWdCQTtvQkFFN0NBLFlBQVlBO29CQUNaQSxZQUFZQTtvQkFDWkEsWUFBWUE7b0JBQ1pBLE9BQU9BOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OEJBcFBJQSxHQUFTQSxHQUFTQTs7Z0JBRTdCQSxTQUFJQTtnQkFDSkEsU0FBSUE7Z0JBQ0pBLFNBQUlBOzs7Ozs7Ozs7Ozs7OEJBS09BOztnQkFFWEEsU0FBSUE7Z0JBQ0pBLFNBQUlBO2dCQUNKQSxTQUFJQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Z0JBMkJKQSxPQUFPQSw4QkFBVUEsQ0FBQ0EsU0FBSUEsVUFBS0EsQ0FBQ0EsU0FBSUEsVUFBS0EsQ0FBQ0EsU0FBSUE7Ozs7Ozs7Ozs7OztnQkFPMUNBLE9BQU9BLENBQUNBLFNBQUlBLFVBQUtBLENBQUNBLFNBQUlBLFVBQUtBLENBQUNBLFNBQUlBOzs7Ozs7Ozs7Ozs7Z0JBTWhDQSxhQUFlQSw4QkFBVUEsQ0FBQ0EsU0FBSUEsVUFBS0EsQ0FBQ0EsU0FBSUEsVUFBS0EsQ0FBQ0EsU0FBSUE7Z0JBQ2xEQSxTQUFTQSxNQUFPQTtnQkFDaEJBLFVBQUtBO2dCQUNMQSxVQUFLQTtnQkFDTEEsVUFBS0E7Ozs7Ozs7Ozs7Ozs7Z0JBd0NMQSxPQUFPQSwyQkFBTUEsc0NBQVdBLHNDQUFXQTs7Ozs7Ozs7Ozs7OytCQU1wQkE7Z0JBRWZBLE9BQU9BLFdBQUtBLFdBQ0xBLFdBQUtBLFdBQ0xBLFdBQUtBOzs7Ozs7Ozs7Ozs7OzhCQU1ZQTtnQkFFeEJBLElBQUlBO29CQUNBQSxPQUFPQSxhQUFPQSxxQ0FBU0E7O2dCQUMzQkE7Ozs7Ozs7Ozs7Ozs7Z0JBU0lBLGVBQWVBO2dCQUNmQSxXQUFXQSxDQUFDQSxpQ0FBa0JBO2dCQUM5QkEsV0FBV0EsQ0FBQ0EsaUNBQWtCQTtnQkFDOUJBLE9BQU9BOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O29DQ3pHY0EsUUFBZ0JBO29CQUV6Q0EsT0FBT0EsOEJBQVVBLDRDQUFnQkEsaUJBQVFBOzs7Ozs7Ozs7Ozs7OzJDQU9UQSxRQUFnQkE7b0JBRWhEQSxPQUFPQSxDQUFDQSxXQUFXQSxZQUFZQSxDQUFDQSxXQUFXQSxZQUNsQ0EsQ0FBQ0EsV0FBV0EsWUFBWUEsQ0FBQ0EsV0FBV0EsWUFDcENBLENBQUNBLFdBQVdBLFlBQVlBLENBQUNBLFdBQVdBLFlBQ3BDQSxDQUFDQSxXQUFXQSxZQUFZQSxDQUFDQSxXQUFXQTs7Ozs7Ozs7Ozs7O3FDQStCakJBO29CQUU1QkE7b0JBQ0FBLE9BQU9BOzs7Ozs7Ozs7Ozs7OytCQU9hQSxTQUFpQkE7b0JBRXJDQSxPQUFPQSxZQUFZQSxZQUFZQSxZQUFZQSxZQUFZQSxZQUFZQSxZQUFZQSxZQUFZQTs7Ozs7Ozs7Ozs7OzRDQWdEOURBO29CQUU3QkEsT0FBT0EsSUFBSUEsbUNBQVFBLENBQUNBLFNBQVNBLENBQUNBLFNBQVNBLENBQUNBLFNBQVNBLENBQUNBOzs7Ozs7Ozs7Ozs7O3VDQU92QkEsUUFBZ0JBO29CQUUzQ0EsT0FBT0EsYUFBWUEsWUFDWkEsYUFBWUEsWUFDWkEsYUFBWUEsWUFDWkEsYUFBWUE7Ozs7Ozs7Ozs7Ozs7eUNBT1FBLFFBQWdCQTtvQkFFM0NBLE9BQU9BLGFBQVlBLFlBQ1pBLGFBQVlBLFlBQ1pBLGFBQVlBLFlBQ1pBLGFBQVlBOzs7Ozs7Ozs7Ozs7O3VDQU9VQSxRQUFnQkE7b0JBRTdDQSxZQUFZQTtvQkFDWkEsWUFBWUE7b0JBQ1pBLFlBQVlBO29CQUNaQSxZQUFZQTtvQkFDWkEsT0FBT0E7Ozs7Ozs7Ozs7Ozs7MENBT3NCQSxRQUFnQkE7b0JBRTdDQSxZQUFZQTtvQkFDWkEsWUFBWUE7b0JBQ1pBLFlBQVlBO29CQUNaQSxZQUFZQTtvQkFDWkEsT0FBT0E7Ozs7Ozs7Ozs7Ozs7dUNBT3NCQSxRQUFnQkE7b0JBRTdDQSxZQUFZQTtvQkFDWkEsWUFBWUE7b0JBQ1pBLFlBQVlBO29CQUNaQSxZQUFZQTtvQkFDWkEsT0FBT0E7Ozs7Ozs7Ozs7Ozs7eUNBT3NCQSxRQUFnQkE7b0JBRTdDQSxZQUFZQTtvQkFDWkEsWUFBWUE7b0JBQ1pBLFlBQVlBO29CQUNaQSxZQUFZQTtvQkFDWkEsT0FBT0E7Ozs7Ozs7Ozs7Ozs7eUNBT3NCQSxRQUFjQTtvQkFFM0NBLFlBQVlBO29CQUNaQSxZQUFZQTtvQkFDWkEsWUFBWUE7b0JBQ1pBLFlBQVlBO29CQUNaQSxPQUFPQTs7Ozs7Ozs7Ozs7Ozt1Q0FPc0JBLFFBQWdCQTtvQkFFN0NBLFlBQVlBO29CQUNaQSxZQUFZQTtvQkFDWkEsWUFBWUE7b0JBQ1pBLFlBQVlBO29CQUNaQSxPQUFPQTs7Ozs7Ozs7Ozs7Ozt5Q0FPc0JBLFFBQWdCQTtvQkFFN0NBLFlBQVlBO29CQUNaQSxZQUFZQTtvQkFDWkEsWUFBWUE7b0JBQ1pBLFlBQVlBO29CQUNaQSxPQUFPQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs4QkFwUElBLEdBQVNBLEdBQVNBLEdBQVNBOztnQkFFdENBLFNBQUlBO2dCQUNKQSxTQUFJQTtnQkFDSkEsU0FBSUE7Z0JBQ0pBLFNBQUlBOzs7Ozs7Ozs7Ozs7OEJBS09BOztnQkFFWEEsU0FBSUE7Z0JBQ0pBLFNBQUlBO2dCQUNKQSxTQUFJQTtnQkFDSkEsU0FBSUE7Ozs7Ozs7Ozs7Ozs7Ozs7O2dCQTRCSkEsT0FBT0EsOEJBQVVBLENBQUNBLFNBQUlBLFVBQUtBLENBQUNBLFNBQUlBLFVBQUtBLENBQUNBLFNBQUlBLFVBQUtBLENBQUNBLFNBQUlBOzs7Ozs7Ozs7Ozs7Z0JBT3BEQSxPQUFPQSxDQUFDQSxTQUFJQSxVQUFLQSxDQUFDQSxTQUFJQSxVQUFLQSxDQUFDQSxTQUFJQSxVQUFLQSxDQUFDQSxTQUFJQTs7Ozs7Ozs7Ozs7O2dCQU0xQ0EsYUFBZUEsOEJBQVVBLENBQUNBLFNBQUlBLFVBQUtBLENBQUNBLFNBQUlBLFVBQUtBLENBQUNBLFNBQUlBLFVBQUtBLENBQUNBLFNBQUlBO2dCQUM1REEsU0FBU0EsTUFBT0E7Z0JBQ2hCQSxVQUFLQTtnQkFDTEEsVUFBS0E7Z0JBQ0xBLFVBQUtBO2dCQUNMQSxVQUFLQTs7Ozs7Ozs7Ozs7OztnQkF5QkxBLE9BQU9BLDJCQUFNQSxzQ0FBV0Esc0NBQVdBLHNDQUFXQTs7Ozs7Ozs7Ozs7OytCQU0vQkE7Z0JBRWZBLE9BQU9BLFdBQUtBLFdBQ0xBLFdBQUtBLFdBQ0xBLFdBQUtBLFdBQ0xBLFdBQUtBOzs7Ozs7Ozs7Ozs7OzhCQU1ZQTtnQkFFeEJBLElBQUlBO29CQUNBQSxPQUFPQSxhQUFPQSxxQ0FBU0E7O2dCQUMzQkE7Ozs7Ozs7Ozs7Ozs7Z0JBU0lBLGVBQWVBO2dCQUNmQSxXQUFXQSxDQUFDQSxpQ0FBa0JBO2dCQUM5QkEsV0FBV0EsQ0FBQ0EsaUNBQWtCQTtnQkFDOUJBLFdBQVdBLENBQUNBLGlDQUFrQkE7Z0JBQzlCQSxPQUFPQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2dCQ3pIWEEsa0JBQWFBLEtBQUlBO2dCQUNqQkEseUJBQW9CQSxLQUFJQTs7Ozs7Ozs7Ozs7Ozs7K0NBT1FBO2dCQUVoQ0EsMkJBQXNCQSxtQkFBbUJBOzs7NEJBSS9CQSxHQUFHQTtnQkFFYkEsT0FBT0EsWUFBR0EseUJBQUtBOzs7Ozs7Ozs7Ozs7OEJBUUdBOzs7Z0JBR2xCQSxJQUFJQSw0QkFBdUJBO29CQUN2QkEsT0FBT0Esb0JBQVdBOzs7O2dCQUd0QkE7b0JBRUlBLGdCQUFtQkE7b0JBQ25CQSxlQUFxQkEsMkJBQWtCQSxnQkFBZ0JBOztvQkFFdkRBLElBQUlBLFlBQVlBO3dCQUNaQSxNQUFNQSxJQUFJQSxpQkFBVUEsV0FBVUE7OztvQkFFbENBLG9CQUFlQSxNQUFNQTs7b0JBRXJCQSxPQUFPQTs7OztvQkFJUEEseUJBQWtCQSxxQkFBb0JBOzs7Z0JBRzFDQSxPQUFPQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs0QkNuQ09BOztnQkFFZEEscUJBQWdCQTtnQkFDaEJBO2dCQUNBQSxtQkFBY0EsS0FBSUE7Z0JBQ2xCQSwyQkFBc0JBLEtBQUlBO2dCQUMxQkEsaUJBQVlBO2dCQUNaQTs7Ozs7Ozs7Ozs7Ozs4QkFRY0EsUUFBY0E7Z0VBQ3JCQTtnQkFFUEEsWUFBT0E7Ozs7Ozs7Ozs7Ozs7O2dCQVFQQSxLQUFLQSxXQUFXQSxJQUFJQSx3QkFBcUJBO29CQUNyQ0EsSUFBR0EseUJBQVlBO3dCQUNYQSx5QkFBWUE7Ozs7Ozs7Ozs7Ozs7O2dCQVFwQkEsS0FBS0EsV0FBV0EsSUFBSUEsZ0NBQTZCQTtvQkFDN0NBLElBQUdBLGlDQUFvQkE7d0JBQ25CQSxpQ0FBb0JBOzs7Ozs7Ozs7Ozs7OztvQ0FNVkE7Z0JBR2xCQSxVQUFRQTtnQkFDUkEsSUFBSUEsT0FBT0EsUUFBUUEsQ0FBQ0E7b0JBRWhCQSxjQUFZQTs7b0JBRVpBLHFCQUFnQkE7b0JBQ2hCQSxpREFBaUJBO29CQUNqQkE7OztvQkFHQUEsSUFBSUE7d0JBQ0FBLDZCQUF3QkE7Ozs7b0JBRzVCQSxJQUFJQTt3QkFDQUEsNkJBQXdCQTs7O29CQUU1QkEsSUFBSUE7d0JBQ0FBLENBQUNBLDREQUE4QkE7OztvQkFFbkNBLG1EQUFtQkE7O29CQUVuQkEsT0FBT0E7OztnQkFHWEEsT0FBT0E7Ozs7Ozs7Ozs7OztvQ0FNV0E7Z0JBRWxCQSxhQUFXQSxZQUFHQSx5Q0FBc0VBLHdCQUFZQSxBQUFxRUE7K0JBQUtBOztnQkFDMUtBLE9BQU9BOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzRCQ3hFRUE7O2dCQUVUQSxnQkFBV0EsS0FBSUE7Z0JBQ2ZBLGdCQUFXQSxLQUFJQTs7Z0JBRWZBLHVCQUFrQkE7O2dCQUVsQkEsY0FBU0EsSUFBSUE7OztnQkFHYkEsZ0JBQWdCQTs7O2dCQUdoQkEsZ0JBQXVCQTtnQkFDdkJBLHFCQUFnQkE7Z0JBQ2hCQSw0QkFBdUJBLElBQUlBLHFDQUFhQSx5RUFBaUNBLGtCQUFXQSwwRUFBa0NBO2dCQUN0SEEsK0JBQTBCQTtnQkFDMUJBLGdDQUEyQkEsSUFBSUE7Ozs7Ozs7Ozs7Ozs7O2dCQVMvQkEsT0FBT0E7Ozs7Ozs7Ozs7Ozt1Q0FRcUJBO2dCQUU1QkEsVUFBaUJBLElBQUlBLHVDQUFXQSxNQUFNQTtnQkFDdENBLGtCQUFhQTs7Z0JBRWJBLE9BQU9BOzs7Ozs7Ozs7Ozs7dUNBUXVCQTtnQkFFOUJBLE9BQU9BLDRCQUFzRUEscUJBQVNBLEFBQXFFQTsrQkFBS0EsNkJBQWNBOzs7Ozs7Ozs7Ozs7Z0JBUzlLQSxPQUFPQTs7Ozs7Ozs7Ozs7aUNBTWFBO2dCQUVwQkEsa0JBQWFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Z0JBY2JBLEtBQUtBLFdBQVdBLElBQUlBLHFCQUFrQkE7b0JBQ2xDQSxJQUFHQSxzQkFBU0E7d0JBQ1JBLHNCQUFTQTs7Ozs7Ozs7Ozs7Ozs7OztnQkFPakJBLDBCQUF1QkE7Ozs7d0JBRW5CQSxJQUFJQSxDQUFDQTs0QkFDREE7Ozt3QkFFSkEseUVBQWlEQTt3QkFDakRBLCtEQUF1Q0E7Ozt3QkFHdkNBLDhFQUFzREEsa0RBQTBCQTt3QkFDaEZBLDhFQUFzREEsa0RBQTBCQTt3QkFDaEZBLGdCQUFzQkE7d0JBQ3RCQSw4RUFBc0RBLDREQUFvQ0EsSUFBSUEsbUNBQVFBLCtCQUFnQkEsdUJBQXVCQSwrQkFBZ0JBLHVCQUF1QkEsa0JBQUtBOzs7d0JBR3pMQSxLQUFLQSxXQUFXQSxJQUFJQSxxQkFBa0JBOzRCQUNsQ0EsSUFBR0Esc0JBQVNBO2dDQUNSQSxzQkFBU0E7Ozs7d0JBRWpCQTs7Ozs7OztnQkFHSkEseUVBQWlEQTs7O2dCQUdqREEsMkJBQXVCQTs7Ozt3QkFFbkJBO3dCQUNBQSw4REFBc0NBLE1BQUtBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozt3QkM5STNDQSxJQUFJQSxzQ0FBV0E7NEJBQ1hBLHFDQUFVQSxJQUFJQTs7d0JBQ2xCQSxPQUFPQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Z0JBV1hBLG9CQUFlQSxtQ0FBV0EsNkNBQWFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7cUNDRlBBOzs7Ozs7Ozs7Ozs7OztvQkFPaENBLElBQUlBLGtEQUFhQTt3QkFDYkEscUNBQVlBOzs7b0JBRWhCQSxVQUFlQTs7b0JBRWZBLFdBQWdCQSwyQkFBTUE7O29CQUV0QkEseUNBQWdCQSxBQUFPQTtvQkFDdkJBLHFDQUFZQSxBQUFPQSx5QkFBb0JBO29CQUN2Q0EsNkNBQW9CQSxBQUFPQTs7b0JBRTNCQSxxQ0FBWUE7Ozs7Ozs7Ozs7Ozs7Ozs7b0JDZGZBLE9BQU9BOzs7OztvQkFLV0EsT0FBT0E7Ozs7O29CQUVSQSxPQUFPQTs7Ozs7b0JBRVhBLE9BQU9BOzs7OztvQkFFUEEsT0FBT0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzRCQS9CaEJBLE9BQWFBLEdBQVNBLEdBQVNBLE9BQWFBOztnQkFFdERBLGFBQWFBO2dCQUNiQSxjQUFjQSxJQUFJQSw4QkFBV0EsR0FBR0EsR0FBR0EsT0FBT0E7Ozs7a0NBa0NqQkEsR0FBU0EsR0FBU0E7Z0JBRTNDQSxPQUFPQSxvQkFBZUEsTUFBTUEsR0FBR0EsR0FBR0EsQUFBNkZBOztnQ0FHdEdBLEdBQVNBLEdBQVNBO2dCQUUzQ0EsT0FBT0EsWUFBS0EsR0FBR0EsR0FBR0EsQUFBOEZBLFVBQUNBO29CQUVoSEEsSUFBSUEsNkJBQVdBO3dCQUNaQSxPQUFPQTs7O29CQUVSQSxPQUFPQSwwQ0FBeUJBLEtBQUtBLE9BQU9BOzs7OEJBSTFCQSxHQUFTQSxHQUFTQTtnQkFFdkNBLGVBQWVBLGdCQUFjQSxHQUFHQSxHQUFHQSxBQUE2RkE7Z0JBQ2hJQSxnQkFBZ0JBO2dCQUNoQkEsZ0JBQWdCQTtnQkFDaEJBLGtCQUFrQkEsTUFBTUE7Z0JBQ3hCQSxPQUFPQTs7NEJBR2NBLEdBQVNBLEdBQVNBO2dCQUV2Q0EsZUFBZUEsY0FBY0EsR0FBR0EsR0FBR0EsQUFBNkZBO2dCQUNoSUEsZ0JBQWdCQTtnQkFDaEJBLGdCQUFnQkE7Z0JBQ2hCQSxrQkFBa0JBLE1BQU1BO2dCQUN4QkEsT0FBT0E7Ozs7Ozs7Ozs7Ozs7Ozs7O29CQ25Fa0JBLE9BQU9BLE1BQW9DQSxhQUFXQSxPQUFLQSxxQkFBaURBLEFBQU1BOzs7OztvQkFRL0dBLE9BQU9BLFlBQVlBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztxQ0NLckJBLFFBQW1CQSxhQUF3QkE7b0JBRXJFQSxhQUFhQSxtQkFBUUEsaUJBQU9BLHNCQUFhQTtvQkFDekNBLElBQUlBLFVBQVVBO3dCQUFNQSxhQUFhQTs7b0JBQ2pDQSxPQUFPQTs7cUNBR21CQSxRQUFnQkEsYUFBcUJBO29CQUUvREEsYUFBYUEscUJBQVFBLGlCQUFRQSxzQkFBYUE7b0JBQzFDQSxJQUFJQSxVQUFVQTt3QkFBTUEsYUFBYUE7O29CQUNqQ0EsT0FBT0E7O21DQUdrQkEsUUFBbUJBLGFBQXdCQTtvQkFFcEVBLHFCQUFxQkEsNkJBQWlCQSxpQkFBT0E7O29CQUU3Q0EsSUFBSUEsMEJBQTBCQSxtQkFBVUEsd0JBQXdCQTt3QkFFL0RBLE9BQU9BLHlCQUFjQSxpQkFBUUEsc0JBQWFBOzs7b0JBRzNDQSxPQUFPQTs7cUNBR2tCQSxRQUFnQkEsYUFBcUJBO29CQUU5REEsVUFBVUEsd0JBQVlBLGlCQUFPQTtvQkFDN0JBLFdBQVdBLDJEQUFZQSxpQkFBUUEsdUJBQWVBOztvQkFFOUNBLHFCQUFxQkEsSUFBSUEsOEJBQVdBLGNBQUtBOztvQkFFekNBLElBQUlBLDBCQUEwQkEsbUJBQVVBLHdCQUF3QkE7d0JBRS9EQSxPQUFPQSwyQkFBY0EsaUJBQVFBLHNCQUFhQTs7O29CQUczQ0EsT0FBT0E7O3FDQUdtQkEsT0FBZUE7O29CQUV6Q0EsSUFBSUEsb0NBQXNCQTt3QkFFekJBLGNBQWNBLHlCQUFZQSxnQkFBT0E7d0JBQ2pDQSxPQUFPQSxVQUFJQSxzQ0FHSkEscUJBQ0tBLG9DQUNGQTs7O29CQUlYQSxPQUFPQTs7eUNBSzJDQSxRQUFnQkE7b0JBRWxFQSxlQUFlQTtvQkFDZkEsYUFBYUE7O29CQUViQSxVQUFVQSxXQUFXQTtvQkFDckJBLGFBQWFBLGVBQWVBO29CQUM1QkEsV0FBV0EsV0FBV0E7b0JBQ3RCQSxZQUFZQSxjQUFjQTs7b0JBRTFCQSxVQUFVQSxTQUFTQSxLQUFLQSxTQUFTQSxRQUFRQSxTQUFTQSxPQUFPQTs7b0JBRXpEQSxJQUFJQSxTQUFTQSxNQUFNQSxPQUFPQTt3QkFFekJBLFNBQVNBLHFDQUFDQTt3QkFDVkEsV0FBV0EsSUFBSUEsMkJBQVFBLFlBQVlBOzJCQUUvQkEsSUFBSUEsU0FBU0EsTUFBTUEsVUFBVUE7d0JBRWpDQSxTQUFTQTt3QkFDVEEsV0FBV0EsSUFBSUEsMkJBQVFBLFlBQVlBOzJCQUUvQkEsSUFBSUEsU0FBU0EsTUFBTUEsUUFBUUE7d0JBRS9CQSxTQUFTQSxxQ0FBQ0E7d0JBQ1ZBLFdBQVdBLElBQUlBLDJCQUFRQSxZQUFZQTsyQkFFL0JBLElBQUlBLFNBQVNBLE1BQU1BLFNBQVNBO3dCQUVoQ0EsU0FBU0E7d0JBQ1RBLFdBQVdBLElBQUlBLDJCQUFRQSxhQUFhQTs7O29CQUdyQ0EsT0FBT0EsU0FBNEJBLDBCQUFTQTs7dUNBR1FBLFFBQW1CQTtvQkFFdkVBLGVBQWVBO29CQUNmQSxhQUFhQTs7b0JBRWJBLFVBQVVBLGtCQUFrQkE7b0JBQzVCQSxhQUFhQSxlQUFlQTtvQkFDNUJBLFdBQVdBLGtCQUFrQkE7b0JBQzdCQSxZQUFZQSxjQUFjQTs7b0JBRTFCQSxVQUFVQSxTQUFTQSxLQUFLQSxTQUFTQSxRQUFRQSxTQUFTQSxPQUFPQTs7b0JBRXpEQSxJQUFJQSxTQUFTQSxNQUFNQSxPQUFPQTt3QkFFekJBLFNBQVNBLHFDQUFDQTt3QkFDVkEsb0JBQW9CQSxJQUFJQSwyQkFBUUEscUJBQXFCQSxZQUFZQTsyQkFFN0RBLElBQUlBLFNBQVNBLE1BQU1BLFVBQVVBO3dCQUVqQ0EsU0FBU0E7d0JBQ1RBLG9CQUFvQkEsSUFBSUEsMkJBQVFBLHFCQUFxQkE7MkJBRWpEQSxJQUFJQSxTQUFTQSxNQUFNQSxRQUFRQTt3QkFFL0JBLFNBQVNBLHFDQUFDQTt3QkFDVkEsb0JBQW9CQSxJQUFJQSwyQkFBUUEsYUFBYUEsZ0JBQWdCQTsyQkFFekRBLElBQUlBLFNBQVNBLE1BQU1BLFNBQVNBO3dCQUVoQ0EsU0FBU0E7d0JBQ1RBLG9CQUFvQkEsSUFBSUEsMkJBQVFBLGFBQWFBOzs7b0JBRzlDQSxPQUFPQSxTQUErQkEsMEJBQVNBOzt5Q0FHZkEsUUFBbUJBLGFBQXdCQTs7O29CQUczRUEsSUFBSUEsZUFBZUEsb0JBQVdBLGlCQUFpQkE7d0JBRTlDQSxjQUFjQSx1QkFBWUEsaUJBQVFBO3dCQUNsQ0EsT0FBT0EsVUFBSUEsMkNBR0NBLDZDQUNGQTs7O29CQUlYQSxlQUFlQSxDQUFDQSxrRUFBdUJBOztvQkFFdkNBOztvQkFFQUEsSUFBSUE7d0JBRUhBLGFBQWFBLGFBQWFBO3dCQUMxQkEsWUFBWUEsY0FBY0E7O3dCQUkxQkEsYUFBYUEsY0FBY0E7d0JBQzNCQSxZQUFZQSxhQUFhQTs7O29CQUcxQkEsSUFBSUE7d0JBRUhBLGFBQWFBLFlBQVlBO3dCQUN6QkEsWUFBWUEsZUFBZUE7O3dCQUkzQkEsYUFBYUEsZUFBZUE7d0JBQzVCQSxZQUFZQSxZQUFZQTs7O29CQUd6QkEsSUFBSUEsU0FBU0EsY0FBY0E7d0JBRTFCQSxVQUFVQTt3QkFDVkEsU0FBU0E7O3dCQUlUQSxVQUFVQSxhQUFhQTt3QkFDdkJBLFNBQVNBLFlBQVlBOzs7b0JBR3RCQSxJQUFJQSxTQUFTQSxjQUFjQTt3QkFFMUJBLFVBQVVBO3dCQUNWQSxTQUFTQTs7d0JBSVRBLFVBQVVBLGFBQWFBO3dCQUN2QkEsU0FBU0EsWUFBWUE7OztvQkFHdEJBLElBQUlBO3dCQUFnQkEsVUFBVUE7O29CQUM5QkEsSUFBSUE7d0JBQWdCQSxVQUFVQTs7O29CQUU5QkEsZ0JBQWdCQSxTQUFTQSxTQUFTQTtvQkFDbENBLGVBQWVBLFNBQVNBLFFBQVFBOztvQkFFaENBLElBQ0NBLENBQUNBLFlBQVlBLFlBQVlBLGlCQUFrQkEsa0JBQzNDQSxDQUFDQSxpQkFBa0JBLENBQUNBLGVBQWVBLGNBQWNBLGNBQWNBLGlCQUMvREEsaUJBQWtCQSxDQUFDQSxnQkFBZ0JBLGFBQWFBLGFBQWFBO3dCQUM3REEsT0FBT0E7Ozs7b0JBR1JBLGFBQWFBLFVBQUlBLDBCQUVQQSx5QkFDRUEsMERBQWtCQSxxREFBV0EseUJBQy9CQSxxQkFBVUEsbUJBQVVBLGtCQUFTQTs7O29CQUl2Q0EsT0FBT0E7OzJDQUd5QkEsUUFBZ0JBLGFBQXFCQTs7O29CQUdyRUEsSUFBSUEsaUJBQWVBO3dCQUVsQkEsY0FBY0EseUJBQVlBLGlCQUFRQTt3QkFDbENBLE9BQU9BLFVBQUlBLDJDQUdDQSxvQ0FDRkE7OztvQkFJWEEsZUFBZUEsQ0FBQ0EseURBQWNBOztvQkFFOUJBOztvQkFFQUEsSUFBSUE7d0JBRUhBLGFBQWFBLGFBQWFBO3dCQUMxQkEsWUFBWUEsY0FBY0E7O3dCQUkxQkEsYUFBYUEsY0FBY0E7d0JBQzNCQSxZQUFZQSxhQUFhQTs7O29CQUcxQkEsSUFBSUE7d0JBRUhBLGFBQWFBLFlBQVlBO3dCQUN6QkEsWUFBWUEsZUFBZUE7O3dCQUkzQkEsYUFBYUEsZUFBZUE7d0JBQzVCQSxZQUFZQSxZQUFZQTs7O29CQUd6QkEsSUFBSUEsU0FBU0EsY0FBY0E7d0JBRTFCQSxVQUFVQTt3QkFDVkEsU0FBU0E7O3dCQUlUQSxVQUFVQSxhQUFhQTt3QkFDdkJBLFNBQVNBLFlBQVlBOzs7b0JBR3RCQSxJQUFJQSxTQUFTQSxjQUFjQTt3QkFFMUJBLFVBQVVBO3dCQUNWQSxTQUFTQTs7d0JBSVRBLFVBQVVBLGFBQWFBO3dCQUN2QkEsU0FBU0EsWUFBWUE7OztvQkFHdEJBLElBQUlBO3dCQUFnQkEsVUFBVUE7O29CQUM5QkEsSUFBSUE7d0JBQWdCQSxVQUFVQTs7O29CQUU5QkEsZ0JBQWdCQSxTQUFTQSxTQUFTQTtvQkFDbENBLGVBQWVBLFNBQVNBLFFBQVFBOztvQkFFaENBLElBQ0NBLENBQUNBLFlBQVlBLFlBQVlBLGlCQUFrQkEsa0JBQzNDQSxDQUFDQSxpQkFBa0JBLENBQUNBLFdBQVdBLGNBQWNBLFdBQVdBLGlCQUN4REEsaUJBQWtCQSxDQUFDQSxXQUFXQSxhQUFhQSxXQUFXQTt3QkFDdERBLE9BQU9BOzs7b0JBRVJBLGFBQWFBLFVBQUlBLDBCQUVQQSx5QkFDRUEsaURBQVNBLHFEQUFXQSx5QkFDdEJBLHFCQUFVQSxtQkFBVUEsa0JBQVNBOztvQkFHdkNBLE9BQU9BOztxQ0FHeUJBLFVBQWtCQSxTQUFpQkE7b0JBRW5FQSxJQUFJQSxVQUFVQTt3QkFFYkEsT0FBT0EsQ0FBQ0EscUJBQXNCQSxDQUFDQSxTQUFTQSxjQUFjQSxtQ0FBdUJBLGlCQUFpQkEsNEJBQWdCQSxxQ0FBQ0E7OztvQkFHaEhBLE9BQU9BLENBQUNBLG9CQUFxQkEsQ0FBQ0EsU0FBU0EsY0FBY0EsbUNBQXVCQSxrQkFBa0JBLDRCQUFnQkEscUNBQUNBOzs7Ozs7Ozs7Ozs7O29CQXpUakZBLE9BQU9BLE1BQU9BOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O2dCQVo1Q0EsY0FBY0E7Z0JBQ2RBOzs7O2lDQXdVcUJBLE1BQVdBO2dCQUVoQ0EsSUFBSUEsY0FBY0E7b0JBRWpCQTt1QkFFSUEsSUFBSUEsY0FBY0E7b0JBRXRCQTs7O2dCQUdEQSxtQkFBbUJBLENBQUNBLG9EQUFTQTtnQkFDN0JBLG9CQUFvQkEsQ0FBQ0Esb0RBQVNBOztnQkFFOUJBLE9BQU9BLGVBQWVBOzs7Ozs7Ozs7Ozs7Ozs7O29CQ2pWU0EsT0FBT0EsNEJBQWdEQTs7Ozs7Ozs7Ozs7Ozs7Ozs7OztnQkFMdEZBLFlBQVlBOzs7Ozs7Ozs7Ozs7Ozs7NEJDSFNBOztnQkFFckJBLGVBQWVBLENBQUNBLHFGQUF3QkE7Z0JBQ3hDQSxnQkFBZ0JBLHFEQUFXQTs7Z0JBRTNCQSxJQUFJQSxTQUFTQTtvQkFFWkEsZUFBZUE7OztnQkFHaEJBLElBQUlBLFNBQVNBO29CQUVaQSxlQUFlQTs7O2dCQUdoQkEsbUJBQW1CQSxJQUFJQSw4QkFBV0EsK0ZBQXlCQSxxQkFBV0E7Ozs7Ozs7OztrQ0NDL0JBLEtBQWdCQTtvQkFFdkRBLElBQUlBLGFBQVlBO3dCQUNmQSxPQUFPQTs7O29CQUVSQSxPQUFPQSxJQUFJQSxtQ0FBa0JBLEtBQUtBOzs7Ozs7Ozs7O29CQVBHQSxPQUFPQTs7Ozs7OzRCQWRuQkEsS0FBZ0JBOztnQkFFekNBLFFBQVFBO29CQUVQQSxLQUFLQTt3QkFBMEJBLGFBQVFBLElBQUlBLCtCQUFjQTt3QkFBTUE7b0JBQy9EQSxLQUFLQTt3QkFBMEJBLGFBQVFBLElBQUlBLCtCQUFjQTt3QkFBTUE7b0JBQy9EQSxLQUFLQTt3QkFBMEJBLGFBQVFBLElBQUlBLHFCQUFjQTt3QkFBTUE7b0JBQy9EQSxLQUFLQTt3QkFBMkJBLGFBQVFBLElBQUlBLGdDQUFlQTt3QkFBTUE7b0JBQ2pFQTt3QkFBU0EsTUFBTUEsSUFBSUE7Ozs7Ozs7Ozs7Ozs7Ozs7NEJDVEFBOztnQkFFcEJBLG1CQUFtQkE7Ozs7Ozs7Ozs7Ozs7Ozs0QkNGQ0E7O2dCQUVwQkEsbUJBQW1CQSxJQUFJQSw4QkFBV0EsK0RBQXdCQTs7Ozs7Ozs7Ozs7Ozs7OzRCQ0R0Q0E7O2dCQUVwQkEsZUFBZUEsQ0FBQ0EscUZBQXdCQTtnQkFDeENBLGFBQWFBO2dCQUNiQSxVQUFVQSx3REFBMEJBLENBQUNBLGFBQWFBLFdBQVdBLGFBQWFBO2dCQUMxRUEsWUFBWUEsc0NBQUlBLDJCQUFRQSxVQUFVQSxXQUFZQTs7Z0JBRTlDQSxtQkFBbUJBLElBQUlBLDhCQUFXQSwrRkFBeUJBLGlCQUFPQTs7Ozs7Ozs7Ozs7OztvQkNJckNBLE9BQU9BLElBQUlBLG9DQUFpQkEsaUJBQWtCQTs7Ozs7Ozs7Ozs7Ozs7Ozs7NEJBUi9EQSxPQUFhQSxRQUFjQTs7OztnQkFFdkNBLGFBQWFBLGtCQUFLQSxVQUFhQSxRQUFRQTtnQkFDdkNBLGNBQWNBLGtCQUFLQSxVQUFhQSxTQUFTQTs7Z0JBRXpDQSxZQUFZQSxJQUFJQSxZQUFLQSxRQUFRQSxTQUFTQTs7Ozs4QkFTcEJBLEdBQVNBLEdBQVNBLE9BQWFBO2dCQUVqREEsVUFBVUEsSUFBSUEsV0FBSUEsTUFBTUEsR0FBR0EsR0FBR0EsT0FBT0E7Z0JBQ3JDQSxjQUFjQTtnQkFDZEEsT0FBT0E7OzhCQUdzQkEsR0FBU0EsR0FBU0EsR0FBU0E7Z0JBRXhEQSxJQUFJQSxZQUFZQSxTQUFTQSxHQUFHQSxvQkFBb0JBO2dCQUNoREEsSUFBSUEsWUFBWUEsU0FBU0EsR0FBR0EscUJBQXFCQTs7Z0JBRWpEQSxPQUFPQSxxQkFBcUJBLEdBQUdBLEdBQUdBLEdBQUdBOzs0QkFHUkE7Z0JBRTdCQSxPQUFPQSxZQUFVQSxRQUFRQSxRQUFRQSxZQUFZQTs7OEJBRzNCQTtnQkFFbEJBLE9BQU9BLGlCQUFpQkE7OzhCQUdOQSxLQUFVQTtnQkFFNUJBLGlCQUFpQkEsS0FBS0E7OzZCQU9QQSxPQUFlQTs7O2dCQUU5QkEsWUFBWUEsWUFBVUEsU0FBU0E7O2dCQUUvQkEsSUFBSUEsWUFBWUE7b0JBRWZBLFFBQVFBLDRCQUFtREEsY0FBTUE7OztnQkFHbEVBLDBCQUFzQkE7Ozs7d0JBRXJCQSxVQUFVQSxxQkFBbUJBLGdCQUFPQTs7d0JBRXBDQSxJQUFJQSxPQUFPQTs0QkFFVkEsT0FBT0E7Ozs7Ozs7O2dCQUlUQSxPQUFPQTs7NkJBR1FBLFFBQWdCQSxhQUFxQkE7OztnQkFFcERBLFVBQVVBLHdCQUFZQSxpQkFBUUE7Z0JBQzlCQSxVQUFVQSx3QkFBWUEsaUJBQVFBOztnQkFFOUJBLFdBQVdBLElBQUlBLDhCQUFXQSxjQUFLQSxpREFBTUE7Z0JBQ3JDQSxZQUFZQSxZQUFVQSxRQUFRQSxRQUFRQSxZQUFZQTs7Z0JBRWxEQSxJQUFJQSxZQUFZQTtvQkFFZkEsUUFBUUEsNEJBQW1EQSxjQUFNQTs7O2dCQUdsRUEsY0FBZUE7O2dCQUVmQSwwQkFBc0JBOzs7O3dCQUVyQkEsVUFBVUEscUJBQW1CQSxpQkFBUUEsc0JBQWFBOzt3QkFFbERBLElBQUlBLE9BQU9BLFFBQVFBLENBQUNBLFdBQVdBLFFBQVFBLDBCQUFjQSxTQUFRQTs0QkFFNURBLFVBQVVBOzs7Ozs7OztnQkFJWkEsT0FBT0E7OzJCQUdRQSxRQUFtQkEsYUFBd0JBOzs7Z0JBRTFEQSxXQUFXQSxJQUFJQSw4QkFBV0EsaUJBQVFBO2dCQUNsQ0EsWUFBWUEsWUFBVUEsUUFBUUEsUUFBUUEsWUFBWUE7O2dCQUVsREEsSUFBSUEsWUFBWUE7b0JBRWZBLFFBQVFBLDRCQUFtREEsY0FBTUE7OztnQkFHbEVBLGNBQWVBOztnQkFFZkEsMEJBQXNCQTs7Ozt3QkFFckJBLFVBQVVBLHFCQUFtQkEsaUJBQVFBLHNCQUFhQTs7d0JBRWxEQSxJQUFJQSxPQUFPQSxRQUFRQSxDQUFDQSxXQUFXQSxRQUFRQSwwQkFBY0EsU0FBU0E7NEJBRTdEQSxVQUFVQTs7Ozs7Ozs7Z0JBSVpBLE9BQU9BOztnQ0FPa0JBLEtBQVNBLEdBQVNBLEdBQVNBOztnQkFFcERBLGFBQWFBO2dCQUNiQSxrQkFBa0JBLElBQUlBLDhCQUFXQSxHQUFHQSxHQUFHQSxXQUFXQTs7Z0JBRWxEQSxXQUFXQSxLQUFJQTs7Z0JBRWZBLGFBQWFBLFVBQUlBLCtCQUVQQSwyQkFDRkEsdUNBQ09BLGdCQUFjQSxNQUFNQSxBQUErQ0EsVUFBQ0E7d0JBQU9BLFFBQVFBO3dCQUFLQSxPQUFPQTtzQkFBN0NBLEtBQUlBLHlEQUFpREEsS0FBS0EsaUJBQVFBLHNCQUFhQSxBQUE2RkEsbUJBQ3JPQTs7Z0JBR1JBLE9BQU9BOztrQ0FHb0JBLE1BQWlCQSxVQUFxQkEsS0FBU0EsUUFBbUJBLGFBQXdCQTs7Z0JBRXJIQSxjQUFjQSxTQUFTQSxpQkFBUUEsc0JBQWFBOztnQkFFNUNBLElBQUlBLFdBQVdBO29CQUVkQSxTQUFTQTs7b0JBRVRBLGFBQWFBLElBQUlBLDhCQUFXQSx1Q0FBa0JBO29CQUM5Q0EsZ0JBQWdCQSxVQUFJQSw2QkFBb0JBLGNBQVdBLG1CQUFnQkEsa0NBQXNCQTtvQkFDekZBLGVBQWVBLE9BQU9BOztvQkFFdEJBLElBQUlBLFlBQVlBLFFBQVFBLDJEQUFlQTt3QkFFdENBLGFBQWFBO3dCQUNiQSxPQUFPQSxnQkFBY0EsTUFBTUEsVUFBVUEsS0FBS0EsaUJBQVFBLG1FQUFzQkEsQUFBNkZBOzs7O2dCQUl2S0EsT0FBT0E7O2lDQU9jQSxHQUFPQSxHQUFPQSxHQUFPQSxHQUFPQSxVQUF3Q0EsU0FBc0JBOzs7Z0JBRy9HQSxZQUFZQSxxQkFBcUJBLEdBQUdBLEdBQUdBLEdBQUdBO2dCQUMxQ0EsMEJBQW9CQTs7Ozt3QkFFbkJBLFFBQVFBOzs7Ozs7OztnQkFJVEEsWUFBWUEscUJBQXFCQSxHQUFHQSxHQUFHQSxHQUFHQTtnQkFDMUNBLDJCQUFxQkE7Ozs7d0JBRXBCQSxZQUFZQTt3QkFDWkEsWUFBWUE7d0JBQ1pBLFNBQVNBLGtCQUFLQSxnQkFBZUEsa0JBQUtBLGdCQUFlQSxrQkFBS0Esb0JBQW1CQSxrQkFBS0EscUJBQW9CQTt3QkFDbEdBLFdBQVdBLHdCQUFrQkEsa0JBQUtBLHVCQUFzQkEsa0JBQUtBLHVCQUFxQkE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzRCQ25LbEVBLE9BQVdBLFFBQVlBLEtBQVVBLFlBQWlCQSxZQUFtQkEsV0FBZUEsWUFBZ0JBOztnQkFFNUdBLFlBQU9BO2dCQUNQQSxtQkFBY0E7Z0JBQ2RBLG1CQUFjQTtnQkFDZEEsa0JBQWFBO2dCQUNiQSxtQkFBY0E7Z0JBQ2RBLGlCQUFZQSx1QkFBUUE7Z0JBQ3BCQSxhQUFRQTs7Z0JBRVJBLGVBQVVBLElBQUlBLHlDQUFVQSxPQUFPQSxRQUFRQTs7Ozs7Ozs7Ozs7Ozs7OztzQ0FTYkEsTUFBYUEsT0FBZUE7Ozs7OztnQkFPdERBLGNBQWtCQSxrQkFBVUE7O2dCQUU1QkEsYUFBaUJBOztnQkFFakJBLEtBQUtBLFdBQVdBLElBQUlBLGFBQWVBO29CQUUvQkEsUUFBU0EsZ0JBQUtBO29CQUNkQSxJQUFJQSxJQUFJQTt3QkFDSkE7OztvQkFFSkEsU0FBU0EsS0FBSUE7b0JBQ2JBLGVBQWlCQSxvQ0FBWUEsSUFBWkE7b0JBQ2pCQSxnQkFBa0JBOztvQkFFbEJBLFlBQVlBLG9CQUFLQSxDQUFDQSxxQ0FBZ0JBO29CQUNsQ0EsWUFBWUEsTUFBS0Esc0JBQU1BLENBQUNBLHFDQUFnQkE7O29CQUV4Q0EsbUJBQXFCQSxBQUFPQSxvQ0FBWUEsSUFBWkEscUJBQWtCQTtvQkFDOUNBLG9CQUFzQkEsQUFBT0EsbUJBQWNBOztvQkFFM0NBLFdBQWFBLENBQUNBLFNBQVNBLENBQUNBLEFBQU9BLGtCQUFhQTtvQkFDNUNBLFdBQWFBLENBQUNBLHFCQUFhQSxDQUFDQSxBQUFPQSxtQkFBY0E7OztvQkFHakRBLGtCQUFhQSxTQUFTQSw0Q0FBWUEsU0FDOUJBLElBQUlBLG1DQUFRQSxVQUFVQSxVQUFVQSxXQUNoQ0EsSUFBSUEsbUNBQVFBLE1BQU1BLE9BQ2xCQTs7O29CQUdKQSxrQkFBYUEsU0FBU0EsNENBQVlBLFNBQzlCQSxJQUFJQSxtQ0FBUUEsV0FBV0EsVUFBVUEsVUFBVUEsV0FDM0NBLElBQUlBLG1DQUFRQSxPQUFPQSxjQUFjQSxPQUNqQ0E7OztvQkFHSkEsa0JBQWFBLFNBQVNBLDRDQUFZQSxVQUM5QkEsSUFBSUEsbUNBQVFBLFVBQVVBLFdBQVdBLFdBQVdBLFdBQzVDQSxJQUFJQSxtQ0FBUUEsTUFBTUEsT0FBT0EsZ0JBQ3pCQTs7O29CQUdKQSxrQkFBYUEsU0FBU0EsNENBQVlBLFVBQzlCQSxJQUFJQSxtQ0FBUUEsV0FBV0EsVUFBVUEsVUFBVUEsV0FDM0NBLElBQUlBLG1DQUFRQSxPQUFPQSxjQUFjQSxPQUNqQ0E7OztvQkFHSkEsa0JBQWFBLFNBQVNBLDRDQUFZQSxVQUM5QkEsSUFBSUEsbUNBQVFBLFVBQVVBLFdBQVdBLFdBQVdBLFdBQzVDQSxJQUFJQSxtQ0FBUUEsTUFBTUEsT0FBT0EsZ0JBQ3pCQTs7O29CQUdKQSxrQkFBYUEsU0FBU0EsNENBQVlBLFVBQzlCQSxJQUFJQSxtQ0FBUUEsV0FBV0EsVUFBVUEsV0FBV0EsV0FBV0EsV0FDdkRBLElBQUlBLG1DQUFRQSxPQUFPQSxjQUFjQSxPQUFPQSxnQkFDeENBOzs7b0JBR0pBLFNBQVNBLElBQUlBLG1DQUFRQSxXQUFXQSxVQUFVQSxVQUFVQTs7O2dCQUd4REEsT0FBT0E7Ozs7Ozs7Ozs7OztnQ0FRV0E7Z0JBRWxCQTs7Z0JBRUFBLEtBQUtBLFdBQVdBLElBQUlBLGFBQWVBO29CQUUvQkEsUUFBU0EsZ0JBQUtBO29CQUNkQSxJQUFJQSxJQUFJQTt3QkFDSkE7OztvQkFFSkEsU0FBU0EsS0FBSUE7b0JBQ2JBLGVBQWlCQSxvQ0FBWUEsSUFBWkE7OztvQkFHakJBLFNBQVNBOzs7Z0JBR2JBLE9BQU9BOztvQ0FHZUEsUUFBZ0JBLFFBQVlBLEtBQWFBLFVBQWtCQTs7Z0JBR2pGQSwwQkFBT0Esb0JBQVBBLFdBQXFCQTtnQkFDckJBLDBCQUFPQSxvQkFBUEEsV0FBcUJBO2dCQUNyQkEsMEJBQU9BLG9CQUFQQSxXQUFxQkE7O2dCQUVyQkEsMEJBQU9BLG9CQUFQQSxXQUFxQkE7Z0JBQ3JCQSwwQkFBT0Esb0JBQVBBLFdBQXFCQTs7Z0JBRXJCQSwwQkFBT0Esb0JBQVBBLFdBQXFCQTtnQkFDckJBLDBCQUFPQSxvQkFBUEEsV0FBcUJBO2dCQUNyQkEsMEJBQU9BLG9CQUFQQSxXQUFxQkE7Z0JBQ3JCQSwwQkFBT0Esb0JBQVBBLFdBQXFCQTs7Ozs7Ozs7NEJDeEpDQSxNQUFhQTs7d0VBQzVCQSxNQUFNQTs7Ozs7Ozs7Ozs7Ozs7Ozs0QkFVY0E7Z0JBRTNCQTtnQkFDQUE7Z0JBQ0FBO2dCQUNBQTtnQkFDQUE7Z0JBQ0FBO2dCQUNBQTtnQkFDQUE7O2dCQUVBQSxBQUFPQSxpQkFBd0JBLElBQUlBLDRCQUFXQSxNQUFNQTs7b0JBRWhEQSxhQUFzQkEsSUFBSUEsNEJBQWFBOztvQkFFdkNBLFNBQVVBO29CQUNWQSxTQUFVQTs7O29CQUdWQSxJQUFJQSxjQUFjQTt3QkFFZEE7d0JBQ0FBLE9BQU9BOzs7b0JBR1hBLGVBQWVBO29CQUNmQSxnQkFBZ0JBOztvQkFFaEJBLFlBQVlBO29CQUNaQSxhQUFhQTs7b0JBRWJBLE1BQU1BOztvQkFFTkEsYUFBYUE7O29CQUViQSxhQUFhQTtvQkFDYkEsS0FBSUEsV0FBV0EsU0FBV0E7d0JBQ3RCQSw4QkFBV0EsR0FBWEEsZUFBZ0JBOzs7b0JBRXBCQSxhQUFhQSxnQkFBQ0EsOEJBQWdCQSxnQkFBZ0JBLENBQUNBO29CQUMvQ0EsT0FBT0Esa0JBQVNBO29CQUNoQkEsT0FBT0EsaUJBQWlCQTs7Ozs7Ozs7Z0JBRzVCQSxPQUFPQSxJQUFJQSw2QkFBS0EsY0FBY0EsZUFBZUEsS0FBS0EsWUFBWUEsWUFBWUEsV0FBV0EsWUFBWUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7NEJDeERwRkE7OztnQkFHYkEsVUFBS0E7Z0JBQ0xBLG9DQUErQkE7Ozs7OEJBR1BBO2dCQUV4QkEsb0NBQTZCQTtnQkFDN0JBLGlFQUF5Q0E7Ozs7Ozs7Ozs7Ozs7O29CQ0xuQ0EsT0FBT0E7OztvQkFHVEEsSUFBR0EsQ0FBQ0EsaUNBQWFBO3dCQUViQSxhQUFRQTt3QkFDUkEscUNBQWdDQSx5QkFBb0JBLFlBQU9BLElBQUlBLHdEQUFzQ0EsSUFBSUE7Ozs7Ozs0QkFPdEdBOzs7Z0JBR1hBLGVBQVVBLElBQUlBO2dCQUNkQSx1QkFBa0JBO2dCQUNsQkEsWUFBT0E7O2dCQUVQQSw0QkFBdUJBLElBQUlBO2dCQUMzQkEsdUNBQWtDQSxJQUFJQTtnQkFDdENBLHVDQUFrQ0EsSUFBSUE7Z0JBQ3RDQSx1Q0FBa0NBLElBQUlBOztnQkFFdENBLGlDQUE0QkE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzhCQ0NmQSxPQUFXQSxRQUFZQTs7Z0JBRXBDQSxhQUFRQTtnQkFDUkEsY0FBU0E7Z0JBQ1RBLGVBQVVBLHlFQUErQ0EsT0FBT0EsUUFBUUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7NEJDR3ZEQSxZQUFtQkE7O2dCQUVwQ0EsZUFBVUEsdUVBQStDQSxZQUFZQTtnQkFDckVBLGlCQUFZQSxLQUFJQTtnQkFDaEJBLDBCQUFxQkEsS0FBSUE7Ozs7Ozs7OzRCQ3hDREEsTUFBYUE7O3dFQUM5QkEsTUFBTUE7Ozs7Ozs7Ozs7Ozs7Ozs0QkFTY0E7O2dCQUUzQkEsSUFBSUEsQ0FBQ0E7b0JBQ0RBOzs7Z0JBRUpBLGVBQWtCQSxpQ0FBV0Esa0dBQW9CQTtnQkFDakRBLGVBQWtCQSxrQ0FBV0Esa0dBQW9CQTs7Z0JBRWpEQSxpQkFBb0JBLDJCQUFpQkE7Z0JBQ3JDQSxpQkFBb0JBLDJCQUFpQkE7O2dCQUVyQ0EsY0FBd0JBLElBQUlBLHNDQUFjQSxZQUFZQTtnQkFDdERBOztnQkFFQUEsT0FBT0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7NEJDbkJrQkEsTUFBYUE7O3dFQUMvQkEsTUFBTUE7Ozs7Ozs7Ozs7Ozs7Ozs0QkFTY0E7Z0JBRTNCQSxjQUFvQkEsSUFBSUE7O2dCQUV4QkEsWUFBeUJBO2dCQUN6QkEsZUFBZUEsK0JBQUNBO29CQUVaQSxrQkFBa0JBLGtCQUFhQTtvQkFDL0JBO29CQUNBQSxnQkFBZ0JBO29CQUNoQkEsaUJBQWlCQTs7Z0JBRXJCQSxZQUFZQTs7Z0JBRVpBLE9BQU9BOztvQ0FHdUJBO2dCQUU5QkEsT0FBT0EsdUVBQStDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O29CQ0FsREEsT0FBT0E7OztvQkFJUEEsZUFBVUE7b0JBQ1ZBLHNCQUFpQkEsSUFBSUEscUNBQWFBLG9CQUFlQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7a0NBZ0JsQ0E7Z0JBRW5CQTtnQkFDQUE7Z0JBQ0FBLGtCQUFhQTtnQkFDYkEsa0JBQWFBLElBQUlBLDhDQUFzQkE7OztnQkFLdkNBOzs7Ozs7Ozs7Ozs7aUNBT2tCQTtnQkFFbEJBLHdDQUFtQ0E7Ozs7Ozs7Ozs7Ozs7OzswQ0FZTEE7Z0JBRTlCQSxPQUFPQSxJQUFJQSxtQ0FBUUEsQ0FBQ0EsdUJBQXlCQSwwQkFBc0JBLDRCQUF1QkEsQ0FBQ0EsdUJBQXlCQSwyQkFBdUJBOzs7Ozs7Ozs7Ozs7Z0JBUTNJQSxJQUFJQSxlQUFVQTtvQkFDVkE7OztnQkFFSkEsVUFBY0E7O2dCQUVkQSxJQUFHQTtvQkFDQ0EsMkJBQXNCQSxJQUFJQSxtQ0FBUUEsK0JBQWdCQSw2QkFBd0JBLCtCQUFnQkEsNkJBQXdCQSxrQkFBS0EsQUFBQ0E7OztnQkFFNUhBLGtCQUFhQSx5Q0FBcUJBLElBQUlBLG1DQUFRQSw0QkFBdUJBLDRCQUF1QkEsNkJBQXdCQSxJQUFJQSxtQ0FBUUEsNEJBQXVCQSw0QkFBdUJBLE9BQVFBLElBQUlBO2dCQUMxTEEsa0JBQWFBLCtDQUEyQkEsbUJBQWNBOztnQkFFdERBLElBQUdBO29CQUNDQSwyQkFBc0JBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O29CQy9GdEJBLE9BQU9BOzs7b0JBSVBBLGFBQVFBO29CQUNSQSxZQUFPQSw2QkFDSEEsbUNBQThCQSxjQUM5QkEsbUNBQThCQSxjQUM5QkEsa0JBQWFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7a0NBTUZBOzs7Z0NBS0ZBO2dCQUVqQkEsY0FBU0E7O2lDQUdTQTtnQkFFbEJBLGVBQVVBLG1DQUE4QkEsZUFBVUEsYUFBYUEsbUNBQThCQSxlQUFVQSxhQUFhQSxBQUE4RkEsVUFBQ0E7MkJBQU1BOztnQkFDek5BOzs7Z0JBS0FBLGlDQUE0QkEsSUFBSUEsbUNBQVFBLGNBQVNBLGNBQVNBLGNBQVNBLGNBQVNBOzs7Z0JBSzVFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztvQkNqQ01BOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Z0JBT05BLGdCQUFXQSxJQUFJQTtnQkFDZkEsYUFBUUEsSUFBSUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2dCQWVaQSxPQUFPQSxxQ0FBaUJBLHFDQUFpQkEsd0NBQW9CQSxzQkFBUUEsNENBQXdCQSxtQkFBY0EsOENBQTBCQTs7Ozs7Ozs7Ozs7O2dCQVNySUEsT0FBT0EscUNBQWlCQSxxQ0FBaUJBLHdDQUFvQkEsc0JBQVFBLDRDQUF3QkEsbUJBQWNBLDhDQUEwQkEsSUFBSUEsbUNBQVFBLCtCQUFnQkEsa0JBQWFBLCtCQUFnQkEsa0JBQWFBOzs7Ozs7Ozs7Ozs7Z0JBTzNNQTs7Ozs7Ozs7Ozs7O2tDQU1tQkE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztrQ0MxQ0FBO2dCQUVuQkEsd0JBQW1CQTtnQkFDbkJBLGdCQUFXQTs7O2dCQUtYQTs7Z0NBR2lCQTtnQkFFakJBLGNBQVNBO2dCQUNUQSxnQkFBV0E7Z0JBQ1hBLG9CQUFlQTs7Ozs7Ozs7Ozs7O2dCQVFmQSxJQUFHQSxpQkFBWUE7b0JBRVhBOzs7Ozs7Ozs7Ozs7OzRCQVFTQTtnQkFFYkEsZUFBVUE7O2dCQUVWQSxJQUFJQSxpQkFBWUE7b0JBQ1pBLHFCQUFnQkE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7NEJDM0RHQSxNQUFhQTs7d0VBQzdCQSxNQUFNQTs7Ozs7Ozs7Ozs7Ozs7OzRCQVNjQTtnQkFFM0JBLFlBQWNBLElBQUlBO2dCQUNsQkEsYUFBYUE7Z0JBQ2JBOztnQkFFQUEsY0FBMkJBO2dCQUMzQkEsY0FBY0E7Z0JBQ2RBO2dCQUNBQSxpQkFBaUJBLFVBQUNBO29CQUVkQTtvQkFDQUEscUJBQXFCQTs7O2dCQUd6QkEsT0FBT0E7Ozs7Ozs7Ozs7OzRCQ3hCU0EsT0FBV0E7OztnQkFFM0JBLGFBQVFBO2dCQUNSQSxjQUFTQTs7Z0JBRVRBLGVBQVVBLHlFQUErQ0EsT0FBT0E7O2dCQUVoRUEsY0FBU0EsNEVBQW9EQSxPQUFPQSxRQUFRQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztvQkNBdEVBLE9BQU9BOzs7b0JBR1RBLGdCQUFXQTtvQkFDWEEsdUJBQWtCQSxJQUFJQSwyQ0FBZ0JBLHFCQUFnQkE7b0JBQ3REQTs7Ozs7b0JBWUVBLE9BQU9BOzs7b0JBR1RBLHdCQUFtQkE7b0JBQ25CQTs7Ozs7b0JBU0VBLE9BQU9BOzs7b0JBQ1BBLGVBQVVBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Z0JBWWhCQTtnQkFDQUE7Ozs7Ozs7Ozs7Ozs7OztrQ0FNNEJBO2dCQUU1QkEsa0JBQWFBO2dCQUNiQSxnQkFBV0E7Z0JBQ1hBLGVBQVVBLElBQUlBO2dCQUNkQSxnQkFBV0EsWUFBZUE7O2dCQUUxQkEscUJBQWdCQSxJQUFJQTtnQkFDcEJBLGdDQUEyQkEsSUFBSUE7Z0JBQy9CQSxnQ0FBMkJBLElBQUlBOzs7Z0JBRy9CQSxnQkFBV0EsSUFBSUE7Z0JBQ2ZBLGtDQUE2QkE7Z0JBQzdCQSw2QkFBd0JBO2dCQUN4QkEsd0JBQW1CQTs7Ozs7Ozs7Ozs7O2dCQVFuQkEsSUFBSUEsQ0FBQ0E7b0JBQ0RBLE9BQU9BOzs7Z0JBRVhBLFlBQVlBO2dCQUNaQSxhQUFhQTs7O2dCQUdiQSxnQkFBb0JBLElBQUlBLG1DQUFRQSwwQkFBcUJBLEFBQU9BLG9CQUFlQSwwQkFBcUJBLEFBQU9BLHNCQUFpQkEsU0FBU0EsQUFBT0E7Z0JBQ3hJQSxnQkFBb0JBLElBQUlBLG1DQUFRQSwwQkFBcUJBLEFBQU9BLG9CQUFlQSwwQkFBcUJBLEFBQU9BOztnQkFFdkdBLGlCQUFxQkEsSUFBSUEsbUNBQVFBLDBCQUFxQkEsQUFBT0EscUJBQWdCQSxRQUFRQSxBQUFPQSxvQkFBZUEsMEJBQXFCQSxBQUFPQSxzQkFBaUJBLFNBQVNBLEFBQU9BO2dCQUN4S0EsaUJBQXFCQSxJQUFJQSxtQ0FBUUEsMEJBQXFCQSxBQUFPQSxxQkFBZ0JBLFFBQVFBLEFBQU9BLG9CQUFlQSwwQkFBcUJBLEFBQU9BOztnQkFFdklBLFlBQWNBOzs7Z0JBR2RBLElBQUlBO29CQUNDQSxRQUFRQSxRQUFTQTs7O2dCQUV0QkEsV0FBZUEsbUJBRVhBLE9BQVFBLE9BQU9BLE9BQVFBLFFBQVNBLE9BQVFBLGFBQWNBLGFBQ3JEQSxNQUFPQSxPQUFPQSxPQUFRQSxRQUFTQSxPQUFRQSxjQUFjQSxjQUNyREEsTUFBT0EsT0FBUUEsTUFBT0EsUUFBU0EsT0FBUUEsY0FBY0EsY0FFdERBLE9BQVFBLE9BQU9BLE9BQVFBLFFBQVNBLE9BQVFBLGFBQWFBLGFBQ3JEQSxPQUFRQSxPQUFRQSxNQUFPQSxRQUFTQSxPQUFRQSxhQUFhQSxhQUNwREEsTUFBT0EsT0FBUUEsTUFBT0EsUUFBU0EsT0FBUUEsY0FBY0E7O2dCQUcxREEsT0FBT0E7Ozs7Ozs7Ozs7Ozs7Z0JBUVBBLElBQUlBLGlCQUFZQSxRQUFRQSxDQUFDQTtvQkFDckJBOzs7O2dCQUdKQSxrSEFBNkJBLElBQUlBLG1DQUFRQSxlQUFVQTtnQkFDbkRBLElBQUlBO29CQUNBQSw0QkFBdUJBOztvQkFFdkJBLDRCQUF1QkE7O2dCQUMzQkEscUhBQTZCQSxJQUFJQSxtQ0FBUUEsZUFBVUE7O2dCQUVuREEsa0NBQTJCQTs7O2dCQUczQkEsaUVBQXlDQTs7O2dCQUt6Q0EsV0FBZUE7O2dCQUVmQSxJQUFHQSxRQUFRQTtvQkFDUEEsOEJBQXlCQTs7Ozs7Ozs7Ozs7Ozs7Z0JBUzdCQTs7Ozs7Ozs7Ozs7OztnQkFVQUEsSUFBSUEsQ0FBQ0EsZ0JBQVdBO29CQUVaQTtvQkFDQUEsSUFBR0Esb0NBQThCQTt3QkFDN0JBLHVCQUFrQkEsSUFBSUEsMkNBQWdCQSxxQkFBZ0JBOztvQkFDMURBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O29CQ3pKQUEsT0FBT0E7OztvQkFJUEEsSUFBSUEsQ0FBQ0EsaUNBQWFBO3dCQUVkQSxhQUFRQTt3QkFDUkE7Ozs7OztvQkFTRkEsT0FBT0E7OztvQkFHVEEsSUFBR0Esb0JBQWNBO3dCQUViQSxrQkFBYUE7d0JBQ2JBOzs7Ozs7b0JBU0ZBLE9BQU9BOzs7b0JBR1RBLElBQUlBLENBQUNBLDJCQUFjQTt3QkFFZkEsY0FBU0E7d0JBQ1RBOzs7Ozs7Ozs7Ozs7Ozs7O2tDQVVvQkE7Z0JBRTVCQSxnQkFBV0E7O2dCQUVYQSxZQUFPQTtnQkFDUEEsa0JBQWFBO2dCQUNiQSxjQUFTQSxJQUFJQTs7Z0JBRWJBLGdCQUFXQSxJQUFJQTtnQkFDZkEsd0JBQW1CQTs7Z0JBRW5CQSw2QkFBd0JBLElBQUlBO2dCQUM1QkEsd0NBQW1DQSxJQUFJQTtnQkFDdkNBLHdDQUFtQ0EsSUFBSUE7Z0JBQ3ZDQSx3Q0FBbUNBLElBQUlBOztnQkFFdkNBLGtDQUE2QkE7OztnQkFLN0JBLGFBQWVBLG1CQUFjQTtnQkFDN0JBLFFBQU9BO29CQUVIQSxLQUFLQTt3QkFDREE7d0JBQ0FBO29CQUNKQSxLQUFLQTt3QkFDREEsU0FBU0EsQ0FBQ0E7d0JBQ1ZBO29CQUNKQSxLQUFLQTt3QkFDREEsVUFBVUE7d0JBQ1ZBOzs7Z0JBR1JBLGdCQUFvQkEsSUFBSUEsbUNBQVFBOztnQkFFaENBLHNDQUFpQ0EseUJBQW9CQSxZQUFPQSxzQkFBUUE7OztnQkFLcEVBLDRCQUF1QkE7Z0JBQ3ZCQSxpRUFBeUNBOzs7Z0JBS3pDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O29CQ2xGSUEsT0FBT0E7OztvQkFJUEEsaUJBQVlBO29CQUNaQSxtQ0FBNEJBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7a0NBYUpBO2dCQUU1QkEsV0FBZUEsbUJBRVhBLE1BQU9BLE1BQVFBLDJCQUNSQSxNQUFRQSxnQ0FDQUEsc0JBRWZBLE1BQU9BLE1BQVFBLHNCQUNmQSxXQUFlQSxnQ0FDQUE7OztnQkFJbkJBLGdCQUFXQTtnQkFDWEEscUJBQWdCQSxJQUFJQSw0Q0FBYUE7O2dCQUVqQ0EsZ0NBQTJCQSxJQUFJQTtnQkFDL0JBLGdDQUEyQkEsSUFBSUE7O2dCQUUvQkEsZ0JBQVdBLFlBQWVBOztnQkFFMUJBLGdCQUFXQSxJQUFJQTtnQkFDZkEsa0NBQTZCQTtnQkFDN0JBLDhCQUF5QkE7Z0JBQ3pCQTtnQkFDQUEsNkJBQXdCQTtnQkFDeEJBLHdCQUFtQkE7Ozs7Ozs7Ozs7Ozs7Z0JBUW5CQSxJQUFJQSxnQkFBV0EsUUFBUUEsWUFBT0E7b0JBRTFCQSxrQ0FBMkJBO29CQUMzQkEsc0NBQStCQSxJQUFJQSxtQ0FBUUEsb0JBQWVBO29CQUMxREEsa0NBQTJCQSxJQUFJQSxtQ0FBUUEsZ0JBQVdBO29CQUNsREE7O29CQUVBQSw4QkFBdUJBOztvQkFFdkJBLHNCQUFpQkE7Ozs7Ozs7Ozs7Ozs7O2dCQVVyQkEiLAogICJzb3VyY2VzQ29udGVudCI6IFsiXHJcbnVzaW5nIFN5c3RlbTtcclxuXHJcbm5hbWVzcGFjZSBIdW1wZXIuQmFzZVxyXG57XHJcblx0Ly8vIDxzdW1tYXJ5PlxyXG5cdC8vLyBDb250YWlucyBjb21tb25seSB1c2VkIHByZWNhbGN1bGF0ZWQgdmFsdWVzIGFuZCBtYXRoZW1hdGljYWwgb3BlcmF0aW9ucy5cclxuXHQvLy8gPC9zdW1tYXJ5PlxyXG5cdHB1YmxpYyBzdGF0aWMgY2xhc3MgTWF0aHNcclxuXHR7XHJcblx0XHQvLy8gPHN1bW1hcnk+XHJcblx0XHQvLy8gUmVwcmVzZW50cyB0aGUgbWF0aGVtYXRpY2FsIGNvbnN0YW50IGUoMi43MTgyODE3NSkuXHJcblx0XHQvLy8gPC9zdW1tYXJ5PlxyXG5cdFx0cHVibGljIGNvbnN0IGZsb2F0IEUgPSAoZmxvYXQpTWF0aC5FO1xyXG5cclxuXHRcdC8vLyA8c3VtbWFyeT5cclxuXHRcdC8vLyBSZXByZXNlbnRzIHRoZSBsb2cgYmFzZSB0ZW4gb2YgZSgwLjQzNDI5NDUpLlxyXG5cdFx0Ly8vIDwvc3VtbWFyeT5cclxuXHRcdHB1YmxpYyBjb25zdCBmbG9hdCBMb2cxMEUgPSAwLjQzNDI5NDVmO1xyXG5cclxuXHRcdC8vLyA8c3VtbWFyeT5cclxuXHRcdC8vLyBSZXByZXNlbnRzIHRoZSBsb2cgYmFzZSB0d28gb2YgZSgxLjQ0MjY5NSkuXHJcblx0XHQvLy8gPC9zdW1tYXJ5PlxyXG5cdFx0cHVibGljIGNvbnN0IGZsb2F0IExvZzJFID0gMS40NDI2OTVmO1xyXG5cclxuXHRcdC8vLyA8c3VtbWFyeT5cclxuXHRcdC8vLyBSZXByZXNlbnRzIHRoZSB2YWx1ZSBvZiBwaSgzLjE0MTU5Mjc0KS5cclxuXHRcdC8vLyA8L3N1bW1hcnk+XHJcblx0XHRwdWJsaWMgY29uc3QgZmxvYXQgUGkgPSAoZmxvYXQpTWF0aC5QSTtcclxuXHJcblx0XHQvLy8gPHN1bW1hcnk+XHJcblx0XHQvLy8gUmVwcmVzZW50cyB0aGUgdmFsdWUgb2YgcGkgZGl2aWRlZCBieSB0d28oMS41NzA3OTYzNykuXHJcblx0XHQvLy8gPC9zdW1tYXJ5PlxyXG5cdFx0cHVibGljIGNvbnN0IGZsb2F0IFBpT3ZlcjIgPSAoZmxvYXQpKE1hdGguUEkgLyAyLjApO1xyXG5cclxuXHRcdC8vLyA8c3VtbWFyeT5cclxuXHRcdC8vLyBSZXByZXNlbnRzIHRoZSB2YWx1ZSBvZiBwaSBkaXZpZGVkIGJ5IGZvdXIoMC43ODUzOTgyKS5cclxuXHRcdC8vLyA8L3N1bW1hcnk+XHJcblx0XHRwdWJsaWMgY29uc3QgZmxvYXQgUGlPdmVyNCA9IChmbG9hdCkoTWF0aC5QSSAvIDQuMCk7XHJcblxyXG5cdFx0Ly8vIDxzdW1tYXJ5PlxyXG5cdFx0Ly8vIFJlcHJlc2VudHMgdGhlIHZhbHVlIG9mIHBpIHRpbWVzIHR3byg2LjI4MzE4NTQ4KS5cclxuXHRcdC8vLyA8L3N1bW1hcnk+XHJcblx0XHRwdWJsaWMgY29uc3QgZmxvYXQgVHdvUGkgPSAoZmxvYXQpKE1hdGguUEkgKiAyLjApO1xyXG5cclxuXHRcdC8vLyA8c3VtbWFyeT5cclxuXHRcdC8vLyBSZXR1cm5zIHRoZSBDYXJ0ZXNpYW4gY29vcmRpbmF0ZSBmb3Igb25lIGF4aXMgb2YgYSBwb2ludCB0aGF0IGlzIGRlZmluZWQgYnkgYSBnaXZlbiB0cmlhbmdsZSBhbmQgdHdvIG5vcm1hbGl6ZWQgYmFyeWNlbnRyaWMgKGFyZWFsKSBjb29yZGluYXRlcy5cclxuXHRcdC8vLyA8L3N1bW1hcnk+XHJcblx0XHQvLy8gPHBhcmFtIG5hbWU9XCJ2YWx1ZTFcIj5UaGUgY29vcmRpbmF0ZSBvbiBvbmUgYXhpcyBvZiB2ZXJ0ZXggMSBvZiB0aGUgZGVmaW5pbmcgdHJpYW5nbGUuPC9wYXJhbT5cclxuXHRcdC8vLyA8cGFyYW0gbmFtZT1cInZhbHVlMlwiPlRoZSBjb29yZGluYXRlIG9uIHRoZSBzYW1lIGF4aXMgb2YgdmVydGV4IDIgb2YgdGhlIGRlZmluaW5nIHRyaWFuZ2xlLjwvcGFyYW0+XHJcblx0XHQvLy8gPHBhcmFtIG5hbWU9XCJ2YWx1ZTNcIj5UaGUgY29vcmRpbmF0ZSBvbiB0aGUgc2FtZSBheGlzIG9mIHZlcnRleCAzIG9mIHRoZSBkZWZpbmluZyB0cmlhbmdsZS48L3BhcmFtPlxyXG5cdFx0Ly8vIDxwYXJhbSBuYW1lPVwiYW1vdW50MVwiPlRoZSBub3JtYWxpemVkIGJhcnljZW50cmljIChhcmVhbCkgY29vcmRpbmF0ZSBiMiwgZXF1YWwgdG8gdGhlIHdlaWdodGluZyBmYWN0b3IgZm9yIHZlcnRleCAyLCB0aGUgY29vcmRpbmF0ZSBvZiB3aGljaCBpcyBzcGVjaWZpZWQgaW4gdmFsdWUyLjwvcGFyYW0+XHJcblx0XHQvLy8gPHBhcmFtIG5hbWU9XCJhbW91bnQyXCI+VGhlIG5vcm1hbGl6ZWQgYmFyeWNlbnRyaWMgKGFyZWFsKSBjb29yZGluYXRlIGIzLCBlcXVhbCB0byB0aGUgd2VpZ2h0aW5nIGZhY3RvciBmb3IgdmVydGV4IDMsIHRoZSBjb29yZGluYXRlIG9mIHdoaWNoIGlzIHNwZWNpZmllZCBpbiB2YWx1ZTMuPC9wYXJhbT5cclxuXHRcdC8vLyA8cmV0dXJucz5DYXJ0ZXNpYW4gY29vcmRpbmF0ZSBvZiB0aGUgc3BlY2lmaWVkIHBvaW50IHdpdGggcmVzcGVjdCB0byB0aGUgYXhpcyBiZWluZyB1c2VkLjwvcmV0dXJucz5cclxuXHRcdHB1YmxpYyBzdGF0aWMgZmxvYXQgQmFyeWNlbnRyaWMoZmxvYXQgdmFsdWUxLCBmbG9hdCB2YWx1ZTIsIGZsb2F0IHZhbHVlMywgZmxvYXQgYW1vdW50MSwgZmxvYXQgYW1vdW50MilcclxuXHRcdHtcclxuXHRcdFx0cmV0dXJuIHZhbHVlMSArICh2YWx1ZTIgLSB2YWx1ZTEpICogYW1vdW50MSArICh2YWx1ZTMgLSB2YWx1ZTEpICogYW1vdW50MjtcclxuXHRcdH1cclxuXHJcblx0XHQvLy8gPHN1bW1hcnk+XHJcblx0XHQvLy8gUGVyZm9ybXMgYSBDYXRtdWxsLVJvbSBpbnRlcnBvbGF0aW9uIHVzaW5nIHRoZSBzcGVjaWZpZWQgcG9zaXRpb25zLlxyXG5cdFx0Ly8vIDwvc3VtbWFyeT5cclxuXHRcdC8vLyA8cGFyYW0gbmFtZT1cInZhbHVlMVwiPlRoZSBmaXJzdCBwb3NpdGlvbiBpbiB0aGUgaW50ZXJwb2xhdGlvbi48L3BhcmFtPlxyXG5cdFx0Ly8vIDxwYXJhbSBuYW1lPVwidmFsdWUyXCI+VGhlIHNlY29uZCBwb3NpdGlvbiBpbiB0aGUgaW50ZXJwb2xhdGlvbi48L3BhcmFtPlxyXG5cdFx0Ly8vIDxwYXJhbSBuYW1lPVwidmFsdWUzXCI+VGhlIHRoaXJkIHBvc2l0aW9uIGluIHRoZSBpbnRlcnBvbGF0aW9uLjwvcGFyYW0+XHJcblx0XHQvLy8gPHBhcmFtIG5hbWU9XCJ2YWx1ZTRcIj5UaGUgZm91cnRoIHBvc2l0aW9uIGluIHRoZSBpbnRlcnBvbGF0aW9uLjwvcGFyYW0+XHJcblx0XHQvLy8gPHBhcmFtIG5hbWU9XCJhbW91bnRcIj5XZWlnaHRpbmcgZmFjdG9yLjwvcGFyYW0+XHJcblx0XHQvLy8gPHJldHVybnM+QSBwb3NpdGlvbiB0aGF0IGlzIHRoZSByZXN1bHQgb2YgdGhlIENhdG11bGwtUm9tIGludGVycG9sYXRpb24uPC9yZXR1cm5zPlxyXG5cdFx0cHVibGljIHN0YXRpYyBmbG9hdCBDYXRtdWxsUm9tKGZsb2F0IHZhbHVlMSwgZmxvYXQgdmFsdWUyLCBmbG9hdCB2YWx1ZTMsIGZsb2F0IHZhbHVlNCwgZmxvYXQgYW1vdW50KVxyXG5cdFx0e1xyXG5cdFx0XHQvLyBVc2luZyBmb3JtdWxhIGZyb20gaHR0cDovL3d3dy5tdnBzLm9yZy9kaXJlY3R4L2FydGljbGVzL2NhdG11bGwvXHJcblx0XHRcdC8vIEludGVybmFsbHkgdXNpbmcgZG91YmxlcyBub3QgdG8gbG9zZSBwcmVjaXNzaW9uXHJcblx0XHRcdGRvdWJsZSBhbW91bnRTcXVhcmVkID0gYW1vdW50ICogYW1vdW50O1xyXG5cdFx0XHRkb3VibGUgYW1vdW50Q3ViZWQgPSBhbW91bnRTcXVhcmVkICogYW1vdW50O1xyXG5cdFx0XHRyZXR1cm4gKGZsb2F0KSgwLjUgKiAoMi4wICogdmFsdWUyICtcclxuXHRcdFx0XHQodmFsdWUzIC0gdmFsdWUxKSAqIGFtb3VudCArXHJcblx0XHRcdFx0KDIuMCAqIHZhbHVlMSAtIDUuMCAqIHZhbHVlMiArIDQuMCAqIHZhbHVlMyAtIHZhbHVlNCkgKiBhbW91bnRTcXVhcmVkICtcclxuXHRcdFx0XHQoMy4wICogdmFsdWUyIC0gdmFsdWUxIC0gMy4wICogdmFsdWUzICsgdmFsdWU0KSAqIGFtb3VudEN1YmVkKSk7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8vIDxzdW1tYXJ5PlxyXG5cdFx0Ly8vIFJlc3RyaWN0cyBhIHZhbHVlIHRvIGJlIHdpdGhpbiBhIHNwZWNpZmllZCByYW5nZS5cclxuXHRcdC8vLyA8L3N1bW1hcnk+XHJcblx0XHQvLy8gPHBhcmFtIG5hbWU9XCJ2YWx1ZVwiPlRoZSB2YWx1ZSB0byBjbGFtcC48L3BhcmFtPlxyXG5cdFx0Ly8vIDxwYXJhbSBuYW1lPVwibWluXCI+VGhlIG1pbmltdW0gdmFsdWUuIElmIDxjPnZhbHVlPC9jPiBpcyBsZXNzIHRoYW4gPGM+bWluPC9jPiwgPGM+bWluPC9jPiB3aWxsIGJlIHJldHVybmVkLjwvcGFyYW0+XHJcblx0XHQvLy8gPHBhcmFtIG5hbWU9XCJtYXhcIj5UaGUgbWF4aW11bSB2YWx1ZS4gSWYgPGM+dmFsdWU8L2M+IGlzIGdyZWF0ZXIgdGhhbiA8Yz5tYXg8L2M+LCA8Yz5tYXg8L2M+IHdpbGwgYmUgcmV0dXJuZWQuPC9wYXJhbT5cclxuXHRcdC8vLyA8cmV0dXJucz5UaGUgY2xhbXBlZCB2YWx1ZS48L3JldHVybnM+XHJcblx0XHRwdWJsaWMgc3RhdGljIGZsb2F0IENsYW1wKGZsb2F0IHZhbHVlLCBmbG9hdCBtaW4sIGZsb2F0IG1heClcclxuXHRcdHtcclxuXHRcdFx0Ly8gRmlyc3Qgd2UgY2hlY2sgdG8gc2VlIGlmIHdlJ3JlIGdyZWF0ZXIgdGhhbiB0aGUgbWF4XHJcblx0XHRcdHZhbHVlID0gKHZhbHVlID4gbWF4KSA/IG1heCA6IHZhbHVlO1xyXG5cclxuXHRcdFx0Ly8gVGhlbiB3ZSBjaGVjayB0byBzZWUgaWYgd2UncmUgbGVzcyB0aGFuIHRoZSBtaW4uXHJcblx0XHRcdHZhbHVlID0gKHZhbHVlIDwgbWluKSA/IG1pbiA6IHZhbHVlO1xyXG5cclxuXHRcdFx0Ly8gVGhlcmUncyBubyBjaGVjayB0byBzZWUgaWYgbWluID4gbWF4LlxyXG5cdFx0XHRyZXR1cm4gdmFsdWU7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8vIDxzdW1tYXJ5PlxyXG5cdFx0Ly8vIFJlc3RyaWN0cyBhIHZhbHVlIHRvIGJlIHdpdGhpbiBhIHNwZWNpZmllZCByYW5nZS5cclxuXHRcdC8vLyA8L3N1bW1hcnk+XHJcblx0XHQvLy8gPHBhcmFtIG5hbWU9XCJ2YWx1ZVwiPlRoZSB2YWx1ZSB0byBjbGFtcC48L3BhcmFtPlxyXG5cdFx0Ly8vIDxwYXJhbSBuYW1lPVwibWluXCI+VGhlIG1pbmltdW0gdmFsdWUuIElmIDxjPnZhbHVlPC9jPiBpcyBsZXNzIHRoYW4gPGM+bWluPC9jPiwgPGM+bWluPC9jPiB3aWxsIGJlIHJldHVybmVkLjwvcGFyYW0+XHJcblx0XHQvLy8gPHBhcmFtIG5hbWU9XCJtYXhcIj5UaGUgbWF4aW11bSB2YWx1ZS4gSWYgPGM+dmFsdWU8L2M+IGlzIGdyZWF0ZXIgdGhhbiA8Yz5tYXg8L2M+LCA8Yz5tYXg8L2M+IHdpbGwgYmUgcmV0dXJuZWQuPC9wYXJhbT5cclxuXHRcdC8vLyA8cmV0dXJucz5UaGUgY2xhbXBlZCB2YWx1ZS48L3JldHVybnM+XHJcblx0XHRwdWJsaWMgc3RhdGljIGludCBDbGFtcChpbnQgdmFsdWUsIGludCBtaW4sIGludCBtYXgpXHJcblx0XHR7XHJcblx0XHRcdHZhbHVlID0gKHZhbHVlID4gbWF4KSA/IG1heCA6IHZhbHVlO1xyXG5cdFx0XHR2YWx1ZSA9ICh2YWx1ZSA8IG1pbikgPyBtaW4gOiB2YWx1ZTtcclxuXHRcdFx0cmV0dXJuIHZhbHVlO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vLyA8c3VtbWFyeT5cclxuXHRcdC8vLyBDYWxjdWxhdGVzIHRoZSBhYnNvbHV0ZSB2YWx1ZSBvZiB0aGUgZGlmZmVyZW5jZSBvZiB0d28gdmFsdWVzLlxyXG5cdFx0Ly8vIDwvc3VtbWFyeT5cclxuXHRcdC8vLyA8cGFyYW0gbmFtZT1cInZhbHVlMVwiPlNvdXJjZSB2YWx1ZS48L3BhcmFtPlxyXG5cdFx0Ly8vIDxwYXJhbSBuYW1lPVwidmFsdWUyXCI+U291cmNlIHZhbHVlLjwvcGFyYW0+XHJcblx0XHQvLy8gPHJldHVybnM+RGlzdGFuY2UgYmV0d2VlbiB0aGUgdHdvIHZhbHVlcy48L3JldHVybnM+XHJcblx0XHRwdWJsaWMgc3RhdGljIGZsb2F0IERpc3RhbmNlKGZsb2F0IHZhbHVlMSwgZmxvYXQgdmFsdWUyKVxyXG5cdFx0e1xyXG5cdFx0XHRyZXR1cm4gKGZsb2F0KU1hdGguQWJzKHZhbHVlMSAtIHZhbHVlMik7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8vIDxzdW1tYXJ5PlxyXG5cdFx0Ly8vIFBlcmZvcm1zIGEgSGVybWl0ZSBzcGxpbmUgaW50ZXJwb2xhdGlvbi5cclxuXHRcdC8vLyA8L3N1bW1hcnk+XHJcblx0XHQvLy8gPHBhcmFtIG5hbWU9XCJ2YWx1ZTFcIj5Tb3VyY2UgcG9zaXRpb24uPC9wYXJhbT5cclxuXHRcdC8vLyA8cGFyYW0gbmFtZT1cInRhbmdlbnQxXCI+U291cmNlIHRhbmdlbnQuPC9wYXJhbT5cclxuXHRcdC8vLyA8cGFyYW0gbmFtZT1cInZhbHVlMlwiPlNvdXJjZSBwb3NpdGlvbi48L3BhcmFtPlxyXG5cdFx0Ly8vIDxwYXJhbSBuYW1lPVwidGFuZ2VudDJcIj5Tb3VyY2UgdGFuZ2VudC48L3BhcmFtPlxyXG5cdFx0Ly8vIDxwYXJhbSBuYW1lPVwiYW1vdW50XCI+V2VpZ2h0aW5nIGZhY3Rvci48L3BhcmFtPlxyXG5cdFx0Ly8vIDxyZXR1cm5zPlRoZSByZXN1bHQgb2YgdGhlIEhlcm1pdGUgc3BsaW5lIGludGVycG9sYXRpb24uPC9yZXR1cm5zPlxyXG5cdFx0cHVibGljIHN0YXRpYyBmbG9hdCBIZXJtaXRlKGZsb2F0IHZhbHVlMSwgZmxvYXQgdGFuZ2VudDEsIGZsb2F0IHZhbHVlMiwgZmxvYXQgdGFuZ2VudDIsIGZsb2F0IGFtb3VudClcclxuXHRcdHtcclxuXHRcdFx0Ly8gQWxsIHRyYW5zZm9ybWVkIHRvIGRvdWJsZSBub3QgdG8gbG9zZSBwcmVjaXNzaW9uXHJcblx0XHRcdC8vIE90aGVyd2lzZSwgZm9yIGhpZ2ggbnVtYmVycyBvZiBwYXJhbTphbW91bnQgdGhlIHJlc3VsdCBpcyBOYU4gaW5zdGVhZCBvZiBJbmZpbml0eVxyXG5cdFx0XHRkb3VibGUgdjEgPSB2YWx1ZTEsIHYyID0gdmFsdWUyLCB0MSA9IHRhbmdlbnQxLCB0MiA9IHRhbmdlbnQyLCBzID0gYW1vdW50LCByZXN1bHQ7XHJcblx0XHRcdGRvdWJsZSBzQ3ViZWQgPSBzICogcyAqIHM7XHJcblx0XHRcdGRvdWJsZSBzU3F1YXJlZCA9IHMgKiBzO1xyXG5cclxuXHRcdFx0aWYgKGFtb3VudCA9PSAwZilcclxuXHRcdFx0XHRyZXN1bHQgPSB2YWx1ZTE7XHJcblx0XHRcdGVsc2UgaWYgKGFtb3VudCA9PSAxZilcclxuXHRcdFx0XHRyZXN1bHQgPSB2YWx1ZTI7XHJcblx0XHRcdGVsc2VcclxuXHRcdFx0XHRyZXN1bHQgPSAoMiAqIHYxIC0gMiAqIHYyICsgdDIgKyB0MSkgKiBzQ3ViZWQgK1xyXG5cdFx0XHRcdFx0KDMgKiB2MiAtIDMgKiB2MSAtIDIgKiB0MSAtIHQyKSAqIHNTcXVhcmVkICtcclxuXHRcdFx0XHRcdHQxICogcyArXHJcblx0XHRcdFx0XHR2MTtcclxuXHRcdFx0cmV0dXJuIChmbG9hdClyZXN1bHQ7XHJcblx0XHR9XHJcblxyXG5cclxuXHRcdC8vLyA8c3VtbWFyeT5cclxuXHRcdC8vLyBMaW5lYXJseSBpbnRlcnBvbGF0ZXMgYmV0d2VlbiB0d28gdmFsdWVzLlxyXG5cdFx0Ly8vIDwvc3VtbWFyeT5cclxuXHRcdC8vLyA8cGFyYW0gbmFtZT1cInZhbHVlMVwiPlNvdXJjZSB2YWx1ZS48L3BhcmFtPlxyXG5cdFx0Ly8vIDxwYXJhbSBuYW1lPVwidmFsdWUyXCI+RGVzdGluYXRpb24gdmFsdWUuPC9wYXJhbT5cclxuXHRcdC8vLyA8cGFyYW0gbmFtZT1cImFtb3VudFwiPlZhbHVlIGJldHdlZW4gMCBhbmQgMSBpbmRpY2F0aW5nIHRoZSB3ZWlnaHQgb2YgdmFsdWUyLjwvcGFyYW0+XHJcblx0XHQvLy8gPHJldHVybnM+SW50ZXJwb2xhdGVkIHZhbHVlLjwvcmV0dXJucz4gXHJcblx0XHQvLy8gPHJlbWFya3M+VGhpcyBtZXRob2QgcGVyZm9ybXMgdGhlIGxpbmVhciBpbnRlcnBvbGF0aW9uIGJhc2VkIG9uIHRoZSBmb2xsb3dpbmcgZm9ybXVsYTpcclxuXHRcdC8vLyA8Y29kZT52YWx1ZTEgKyAodmFsdWUyIC0gdmFsdWUxKSAqIGFtb3VudDwvY29kZT4uXHJcblx0XHQvLy8gUGFzc2luZyBhbW91bnQgYSB2YWx1ZSBvZiAwIHdpbGwgY2F1c2UgdmFsdWUxIHRvIGJlIHJldHVybmVkLCBhIHZhbHVlIG9mIDEgd2lsbCBjYXVzZSB2YWx1ZTIgdG8gYmUgcmV0dXJuZWQuXHJcblx0XHQvLy8gU2VlIDxzZWUgY3JlZj1cIk1hdGhzLkxlcnBQcmVjaXNlXCIvPiBmb3IgYSBsZXNzIGVmZmljaWVudCB2ZXJzaW9uIHdpdGggbW9yZSBwcmVjaXNpb24gYXJvdW5kIGVkZ2UgY2FzZXMuXHJcblx0XHQvLy8gPC9yZW1hcmtzPlxyXG5cdFx0cHVibGljIHN0YXRpYyBmbG9hdCBMZXJwKGZsb2F0IHZhbHVlMSwgZmxvYXQgdmFsdWUyLCBmbG9hdCBhbW91bnQpXHJcblx0XHR7XHJcblx0XHRcdHJldHVybiB2YWx1ZTEgKyAodmFsdWUyIC0gdmFsdWUxKSAqIGFtb3VudDtcclxuXHRcdH1cclxuXHJcblxyXG5cdFx0Ly8vIDxzdW1tYXJ5PlxyXG5cdFx0Ly8vIExpbmVhcmx5IGludGVycG9sYXRlcyBiZXR3ZWVuIHR3byB2YWx1ZXMuXHJcblx0XHQvLy8gVGhpcyBtZXRob2QgaXMgYSBsZXNzIGVmZmljaWVudCwgbW9yZSBwcmVjaXNlIHZlcnNpb24gb2YgPHNlZSBjcmVmPVwiTWF0aHMuTGVycFwiLz4uXHJcblx0XHQvLy8gU2VlIHJlbWFya3MgZm9yIG1vcmUgaW5mby5cclxuXHRcdC8vLyA8L3N1bW1hcnk+XHJcblx0XHQvLy8gPHBhcmFtIG5hbWU9XCJ2YWx1ZTFcIj5Tb3VyY2UgdmFsdWUuPC9wYXJhbT5cclxuXHRcdC8vLyA8cGFyYW0gbmFtZT1cInZhbHVlMlwiPkRlc3RpbmF0aW9uIHZhbHVlLjwvcGFyYW0+XHJcblx0XHQvLy8gPHBhcmFtIG5hbWU9XCJhbW91bnRcIj5WYWx1ZSBiZXR3ZWVuIDAgYW5kIDEgaW5kaWNhdGluZyB0aGUgd2VpZ2h0IG9mIHZhbHVlMi48L3BhcmFtPlxyXG5cdFx0Ly8vIDxyZXR1cm5zPkludGVycG9sYXRlZCB2YWx1ZS48L3JldHVybnM+XHJcblx0XHQvLy8gPHJlbWFya3M+VGhpcyBtZXRob2QgcGVyZm9ybXMgdGhlIGxpbmVhciBpbnRlcnBvbGF0aW9uIGJhc2VkIG9uIHRoZSBmb2xsb3dpbmcgZm9ybXVsYTpcclxuXHRcdC8vLyA8Y29kZT4oKDEgLSBhbW91bnQpICogdmFsdWUxKSArICh2YWx1ZTIgKiBhbW91bnQpPC9jb2RlPi5cclxuXHRcdC8vLyBQYXNzaW5nIGFtb3VudCBhIHZhbHVlIG9mIDAgd2lsbCBjYXVzZSB2YWx1ZTEgdG8gYmUgcmV0dXJuZWQsIGEgdmFsdWUgb2YgMSB3aWxsIGNhdXNlIHZhbHVlMiB0byBiZSByZXR1cm5lZC5cclxuXHRcdC8vLyBUaGlzIG1ldGhvZCBkb2VzIG5vdCBoYXZlIHRoZSBmbG9hdGluZyBwb2ludCBwcmVjaXNpb24gaXNzdWUgdGhhdCA8c2VlIGNyZWY9XCJNYXRocy5MZXJwXCIvPiBoYXMuXHJcblx0XHQvLy8gaS5lLiBJZiB0aGVyZSBpcyBhIGJpZyBnYXAgYmV0d2VlbiB2YWx1ZTEgYW5kIHZhbHVlMiBpbiBtYWduaXR1ZGUgKGUuZy4gdmFsdWUxPTEwMDAwMDAwMDAwMDAwMDAwLCB2YWx1ZTI9MSksXHJcblx0XHQvLy8gcmlnaHQgYXQgdGhlIGVkZ2Ugb2YgdGhlIGludGVycG9sYXRpb24gcmFuZ2UgKGFtb3VudD0xKSwgPHNlZSBjcmVmPVwiTWF0aHMuTGVycFwiLz4gd2lsbCByZXR1cm4gMCAod2hlcmVhcyBpdCBzaG91bGQgcmV0dXJuIDEpLlxyXG5cdFx0Ly8vIFRoaXMgYWxzbyBob2xkcyBmb3IgdmFsdWUxPTEwXjE3LCB2YWx1ZTI9MTA7IHZhbHVlMT0xMF4xOCx2YWx1ZTI9MTBeMi4uLiBzbyBvbi5cclxuXHRcdC8vLyBGb3IgYW4gaW4gZGVwdGggZXhwbGFuYXRpb24gb2YgdGhlIGlzc3VlLCBzZWUgYmVsb3cgcmVmZXJlbmNlczpcclxuXHRcdC8vLyBSZWxldmFudCBXaWtpcGVkaWEgQXJ0aWNsZTogaHR0cHM6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvTGluZWFyX2ludGVycG9sYXRpb24jUHJvZ3JhbW1pbmdfbGFuZ3VhZ2Vfc3VwcG9ydFxyXG5cdFx0Ly8vIFJlbGV2YW50IFN0YWNrT3ZlcmZsb3cgQW5zd2VyOiBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzQzNTM1MjUvZmxvYXRpbmctcG9pbnQtbGluZWFyLWludGVycG9sYXRpb24jYW5zd2VyLTIzNzE2OTU2XHJcblx0XHQvLy8gPC9yZW1hcmtzPlxyXG5cdFx0cHVibGljIHN0YXRpYyBmbG9hdCBMZXJwUHJlY2lzZShmbG9hdCB2YWx1ZTEsIGZsb2F0IHZhbHVlMiwgZmxvYXQgYW1vdW50KVxyXG5cdFx0e1xyXG5cdFx0XHRyZXR1cm4gKCgxIC0gYW1vdW50KSAqIHZhbHVlMSkgKyAodmFsdWUyICogYW1vdW50KTtcclxuXHRcdH1cclxuXHJcblx0XHQvLy8gPHN1bW1hcnk+XHJcblx0XHQvLy8gUmV0dXJucyB0aGUgZ3JlYXRlciBvZiB0d28gdmFsdWVzLlxyXG5cdFx0Ly8vIDwvc3VtbWFyeT5cclxuXHRcdC8vLyA8cGFyYW0gbmFtZT1cInZhbHVlMVwiPlNvdXJjZSB2YWx1ZS48L3BhcmFtPlxyXG5cdFx0Ly8vIDxwYXJhbSBuYW1lPVwidmFsdWUyXCI+U291cmNlIHZhbHVlLjwvcGFyYW0+XHJcblx0XHQvLy8gPHJldHVybnM+VGhlIGdyZWF0ZXIgdmFsdWUuPC9yZXR1cm5zPlxyXG5cdFx0cHVibGljIHN0YXRpYyBmbG9hdCBNYXgoZmxvYXQgdmFsdWUxLCBmbG9hdCB2YWx1ZTIpXHJcblx0XHR7XHJcblx0XHRcdHJldHVybiB2YWx1ZTEgPiB2YWx1ZTIgPyB2YWx1ZTEgOiB2YWx1ZTI7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8vIDxzdW1tYXJ5PlxyXG5cdFx0Ly8vIFJldHVybnMgdGhlIGdyZWF0ZXIgb2YgdHdvIHZhbHVlcy5cclxuXHRcdC8vLyA8L3N1bW1hcnk+XHJcblx0XHQvLy8gPHBhcmFtIG5hbWU9XCJ2YWx1ZTFcIj5Tb3VyY2UgdmFsdWUuPC9wYXJhbT5cclxuXHRcdC8vLyA8cGFyYW0gbmFtZT1cInZhbHVlMlwiPlNvdXJjZSB2YWx1ZS48L3BhcmFtPlxyXG5cdFx0Ly8vIDxyZXR1cm5zPlRoZSBncmVhdGVyIHZhbHVlLjwvcmV0dXJucz5cclxuXHRcdHB1YmxpYyBzdGF0aWMgaW50IE1heChpbnQgdmFsdWUxLCBpbnQgdmFsdWUyKVxyXG5cdFx0e1xyXG5cdFx0XHRyZXR1cm4gdmFsdWUxID4gdmFsdWUyID8gdmFsdWUxIDogdmFsdWUyO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vLyA8c3VtbWFyeT5cclxuXHRcdC8vLyBSZXR1cm5zIHRoZSBsZXNzZXIgb2YgdHdvIHZhbHVlcy5cclxuXHRcdC8vLyA8L3N1bW1hcnk+XHJcblx0XHQvLy8gPHBhcmFtIG5hbWU9XCJ2YWx1ZTFcIj5Tb3VyY2UgdmFsdWUuPC9wYXJhbT5cclxuXHRcdC8vLyA8cGFyYW0gbmFtZT1cInZhbHVlMlwiPlNvdXJjZSB2YWx1ZS48L3BhcmFtPlxyXG5cdFx0Ly8vIDxyZXR1cm5zPlRoZSBsZXNzZXIgdmFsdWUuPC9yZXR1cm5zPlxyXG5cdFx0cHVibGljIHN0YXRpYyBmbG9hdCBNaW4oZmxvYXQgdmFsdWUxLCBmbG9hdCB2YWx1ZTIpXHJcblx0XHR7XHJcblx0XHRcdHJldHVybiB2YWx1ZTEgPCB2YWx1ZTIgPyB2YWx1ZTEgOiB2YWx1ZTI7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8vIDxzdW1tYXJ5PlxyXG5cdFx0Ly8vIFJldHVybnMgdGhlIGxlc3NlciBvZiB0d28gdmFsdWVzLlxyXG5cdFx0Ly8vIDwvc3VtbWFyeT5cclxuXHRcdC8vLyA8cGFyYW0gbmFtZT1cInZhbHVlMVwiPlNvdXJjZSB2YWx1ZS48L3BhcmFtPlxyXG5cdFx0Ly8vIDxwYXJhbSBuYW1lPVwidmFsdWUyXCI+U291cmNlIHZhbHVlLjwvcGFyYW0+XHJcblx0XHQvLy8gPHJldHVybnM+VGhlIGxlc3NlciB2YWx1ZS48L3JldHVybnM+XHJcblx0XHRwdWJsaWMgc3RhdGljIGludCBNaW4oaW50IHZhbHVlMSwgaW50IHZhbHVlMilcclxuXHRcdHtcclxuXHRcdFx0cmV0dXJuIHZhbHVlMSA8IHZhbHVlMiA/IHZhbHVlMSA6IHZhbHVlMjtcclxuXHRcdH1cclxuXHJcblx0XHQvLy8gPHN1bW1hcnk+XHJcblx0XHQvLy8gSW50ZXJwb2xhdGVzIGJldHdlZW4gdHdvIHZhbHVlcyB1c2luZyBhIGN1YmljIGVxdWF0aW9uLlxyXG5cdFx0Ly8vIDwvc3VtbWFyeT5cclxuXHRcdC8vLyA8cGFyYW0gbmFtZT1cInZhbHVlMVwiPlNvdXJjZSB2YWx1ZS48L3BhcmFtPlxyXG5cdFx0Ly8vIDxwYXJhbSBuYW1lPVwidmFsdWUyXCI+U291cmNlIHZhbHVlLjwvcGFyYW0+XHJcblx0XHQvLy8gPHBhcmFtIG5hbWU9XCJhbW91bnRcIj5XZWlnaHRpbmcgdmFsdWUuPC9wYXJhbT5cclxuXHRcdC8vLyA8cmV0dXJucz5JbnRlcnBvbGF0ZWQgdmFsdWUuPC9yZXR1cm5zPlxyXG5cdFx0cHVibGljIHN0YXRpYyBmbG9hdCBTbW9vdGhTdGVwKGZsb2F0IHZhbHVlMSwgZmxvYXQgdmFsdWUyLCBmbG9hdCBhbW91bnQpXHJcblx0XHR7XHJcblx0XHRcdC8vIEl0IGlzIGV4cGVjdGVkIHRoYXQgMCA8IGFtb3VudCA8IDFcclxuXHRcdFx0Ly8gSWYgYW1vdW50IDwgMCwgcmV0dXJuIHZhbHVlMVxyXG5cdFx0XHQvLyBJZiBhbW91bnQgPiAxLCByZXR1cm4gdmFsdWUyXHJcblx0XHRcdGZsb2F0IHJlc3VsdCA9IE1hdGhzLkNsYW1wKGFtb3VudCwgMGYsIDFmKTtcclxuXHRcdFx0cmVzdWx0ID0gTWF0aHMuSGVybWl0ZSh2YWx1ZTEsIDBmLCB2YWx1ZTIsIDBmLCByZXN1bHQpO1xyXG5cclxuXHRcdFx0cmV0dXJuIHJlc3VsdDtcclxuXHRcdH1cclxuXHJcblx0XHQvLy8gPHN1bW1hcnk+XHJcblx0XHQvLy8gQ29udmVydHMgcmFkaWFucyB0byBkZWdyZWVzLlxyXG5cdFx0Ly8vIDwvc3VtbWFyeT5cclxuXHRcdC8vLyA8cGFyYW0gbmFtZT1cInJhZGlhbnNcIj5UaGUgYW5nbGUgaW4gcmFkaWFucy48L3BhcmFtPlxyXG5cdFx0Ly8vIDxyZXR1cm5zPlRoZSBhbmdsZSBpbiBkZWdyZWVzLjwvcmV0dXJucz5cclxuXHRcdC8vLyA8cmVtYXJrcz5cclxuXHRcdC8vLyBUaGlzIG1ldGhvZCB1c2VzIGRvdWJsZSBwcmVjaXNzaW9uIGludGVybmFsbHksXHJcblx0XHQvLy8gdGhvdWdoIGl0IHJldHVybnMgc2luZ2xlIGZsb2F0XHJcblx0XHQvLy8gRmFjdG9yID0gMTgwIC8gcGlcclxuXHRcdC8vLyA8L3JlbWFya3M+XHJcblx0XHRwdWJsaWMgc3RhdGljIGZsb2F0IFRvRGVncmVlcyhmbG9hdCByYWRpYW5zKVxyXG5cdFx0e1xyXG5cdFx0XHRyZXR1cm4gKGZsb2F0KShyYWRpYW5zICogNTcuMjk1Nzc5NTEzMDgyMzIwODc2Nzk4MTU0ODE0MTA1KTtcclxuXHRcdH1cclxuXHJcblx0XHQvLy8gPHN1bW1hcnk+XHJcblx0XHQvLy8gQ29udmVydHMgZGVncmVlcyB0byByYWRpYW5zLlxyXG5cdFx0Ly8vIDwvc3VtbWFyeT5cclxuXHRcdC8vLyA8cGFyYW0gbmFtZT1cImRlZ3JlZXNcIj5UaGUgYW5nbGUgaW4gZGVncmVlcy48L3BhcmFtPlxyXG5cdFx0Ly8vIDxyZXR1cm5zPlRoZSBhbmdsZSBpbiByYWRpYW5zLjwvcmV0dXJucz5cclxuXHRcdC8vLyA8cmVtYXJrcz5cclxuXHRcdC8vLyBUaGlzIG1ldGhvZCB1c2VzIGRvdWJsZSBwcmVjaXNzaW9uIGludGVybmFsbHksXHJcblx0XHQvLy8gdGhvdWdoIGl0IHJldHVybnMgc2luZ2xlIGZsb2F0XHJcblx0XHQvLy8gRmFjdG9yID0gcGkgLyAxODBcclxuXHRcdC8vLyA8L3JlbWFya3M+XHJcblx0XHRwdWJsaWMgc3RhdGljIGZsb2F0IFRvUmFkaWFucyhmbG9hdCBkZWdyZWVzKVxyXG5cdFx0e1xyXG5cdFx0XHRyZXR1cm4gKGZsb2F0KShkZWdyZWVzICogMC4wMTc0NTMyOTI1MTk5NDMyOTU3NjkyMzY5MDc2ODQ4ODYpO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vLyA8c3VtbWFyeT5cclxuXHRcdC8vLyBSZWR1Y2VzIGEgZ2l2ZW4gYW5nbGUgdG8gYSB2YWx1ZSBiZXR3ZWVuIM+AIGFuZCAtz4AuXHJcblx0XHQvLy8gPC9zdW1tYXJ5PlxyXG5cdFx0Ly8vIDxwYXJhbSBuYW1lPVwiYW5nbGVcIj5UaGUgYW5nbGUgdG8gcmVkdWNlLCBpbiByYWRpYW5zLjwvcGFyYW0+XHJcblx0XHQvLy8gPHJldHVybnM+VGhlIG5ldyBhbmdsZSwgaW4gcmFkaWFucy48L3JldHVybnM+XHJcblx0XHRwdWJsaWMgc3RhdGljIGZsb2F0IFdyYXBBbmdsZShmbG9hdCBhbmdsZSlcclxuXHRcdHtcclxuXHRcdFx0YW5nbGUgPSAoZmxvYXQpTWF0aC5JRUVFUmVtYWluZGVyKChkb3VibGUpYW5nbGUsIDYuMjgzMTg1NDgyMDI1MTQ2NSk7XHJcblx0XHRcdGlmIChhbmdsZSA8PSAtMy4xNDE1OTI3NGYpXHJcblx0XHRcdHtcclxuXHRcdFx0XHRhbmdsZSArPSA2LjI4MzE4NTQ4ZjtcclxuXHRcdFx0fVxyXG5cdFx0XHRlbHNlXHJcblx0XHRcdHtcclxuXHRcdFx0XHRpZiAoYW5nbGUgPiAzLjE0MTU5Mjc0ZilcclxuXHRcdFx0XHR7XHJcblx0XHRcdFx0XHRhbmdsZSAtPSA2LjI4MzE4NTQ4ZjtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdFx0cmV0dXJuIGFuZ2xlO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vLyA8c3VtbWFyeT5cclxuXHRcdC8vLyBEZXRlcm1pbmVzIGlmIHZhbHVlIGlzIHBvd2VyZWQgYnkgdHdvLlxyXG5cdFx0Ly8vIDwvc3VtbWFyeT5cclxuXHRcdC8vLyA8cGFyYW0gbmFtZT1cInZhbHVlXCI+QSB2YWx1ZS48L3BhcmFtPlxyXG5cdFx0Ly8vIDxyZXR1cm5zPjxjPnRydWU8L2M+IGlmIDxjPnZhbHVlPC9jPiBpcyBwb3dlcmVkIGJ5IHR3bzsgb3RoZXJ3aXNlIDxjPmZhbHNlPC9jPi48L3JldHVybnM+XHJcblx0XHRwdWJsaWMgc3RhdGljIGJvb2wgSXNQb3dlck9mVHdvKGludCB2YWx1ZSlcclxuXHRcdHtcclxuXHRcdFx0cmV0dXJuICh2YWx1ZSA+IDApICYmICgodmFsdWUgJiAodmFsdWUgLSAxKSkgPT0gMCk7XHJcblx0XHR9XHJcblx0fVxyXG59IiwidXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uRGlhZ25vc3RpY3M7XHJcbnVzaW5nIFN5c3RlbS5SdW50aW1lLlNlcmlhbGl6YXRpb247XHJcblxyXG5uYW1lc3BhY2UgSHVtcGVyLkJhc2Vcclxue1xyXG5cdC8vLyA8c3VtbWFyeT5cclxuXHQvLy8gRGVzY3JpYmVzIGEgZmxvYXRpbmcgcG9pbnQgMkQtcmVjdGFuZ2xlLiBcclxuXHQvLy8gPC9zdW1tYXJ5PlxyXG5cdFtEZWJ1Z2dlckRpc3BsYXkoXCJ7RGVidWdEaXNwbGF5U3RyaW5nLG5xfVwiKV1cclxuXHRwdWJsaWMgc3RydWN0IFJlY3RhbmdsZUYgOiBJRXF1YXRhYmxlPFJlY3RhbmdsZUY+XHJcblx0e1xyXG5cdFx0Ly8vIDxzdW1tYXJ5PlxyXG5cdFx0Ly8vIFRoZSB4IGNvb3JkaW5hdGUgb2YgdGhlIHRvcC1sZWZ0IGNvcm5lciBvZiB0aGlzIDxzZWUgY3JlZj1cIlJlY3RhbmdsZUZcIi8+LlxyXG5cdFx0Ly8vIDwvc3VtbWFyeT5cclxuXHRcdHB1YmxpYyBmbG9hdCBYO1xyXG5cclxuXHRcdC8vLyA8c3VtbWFyeT5cclxuXHRcdC8vLyBUaGUgeSBjb29yZGluYXRlIG9mIHRoZSB0b3AtbGVmdCBjb3JuZXIgb2YgdGhpcyA8c2VlIGNyZWY9XCJSZWN0YW5nbGVGXCIvPi5cclxuXHRcdC8vLyA8L3N1bW1hcnk+XHJcblx0XHRwdWJsaWMgZmxvYXQgWTtcclxuXHJcblx0XHQvLy8gPHN1bW1hcnk+XHJcblx0XHQvLy8gVGhlIHdpZHRoIG9mIHRoaXMgPHNlZSBjcmVmPVwiUmVjdGFuZ2xlRlwiLz4uXHJcblx0XHQvLy8gPC9zdW1tYXJ5PlxyXG5cdFx0cHVibGljIGZsb2F0IFdpZHRoO1xyXG5cclxuXHRcdC8vLyA8c3VtbWFyeT5cclxuXHRcdC8vLyBUaGUgaGVpZ2h0IG9mIHRoaXMgPHNlZSBjcmVmPVwiUmVjdGFuZ2xlRlwiLz4uXHJcblx0XHQvLy8gPC9zdW1tYXJ5PlxyXG5cdFx0cHVibGljIGZsb2F0IEhlaWdodDtcclxuXHJcblx0XHQvLy8gPHN1bW1hcnk+XHJcblx0XHQvLy8gUmV0dXJucyBhIDxzZWUgY3JlZj1cIlJlY3RhbmdsZUZcIi8+IHdpdGggWD0wLCBZPTAsIFdpZHRoPTAsIEhlaWdodD0wLlxyXG5cdFx0Ly8vIDwvc3VtbWFyeT5cclxuXHRcdHB1YmxpYyBzdGF0aWMgUmVjdGFuZ2xlRiBFbXB0eSB7IGdldDsgcHJpdmF0ZSBzZXQ7IH1cclxuXHJcblx0XHQvLy8gPHN1bW1hcnk+XHJcblx0XHQvLy8gUmV0dXJucyB0aGUgeCBjb29yZGluYXRlIG9mIHRoZSBsZWZ0IGVkZ2Ugb2YgdGhpcyA8c2VlIGNyZWY9XCJSZWN0YW5nbGVGXCIvPi5cclxuXHRcdC8vLyA8L3N1bW1hcnk+XHJcblx0XHRwdWJsaWMgZmxvYXQgTGVmdCB7Z2V0e3JldHVybiBYO319XHJcblxyXG5cdFx0Ly8vIDxzdW1tYXJ5PlxyXG5cdFx0Ly8vIFJldHVybnMgdGhlIHggY29vcmRpbmF0ZSBvZiB0aGUgcmlnaHQgZWRnZSBvZiB0aGlzIDxzZWUgY3JlZj1cIlJlY3RhbmdsZUZcIi8+LlxyXG5cdFx0Ly8vIDwvc3VtbWFyeT5cclxuXHRcdHB1YmxpYyBmbG9hdCBSaWdodCB7Z2V0e3JldHVybiBYICsgV2lkdGg7fX1cclxuXHJcblx0XHQvLy8gPHN1bW1hcnk+XHJcblx0XHQvLy8gUmV0dXJucyB0aGUgeSBjb29yZGluYXRlIG9mIHRoZSB0b3AgZWRnZSBvZiB0aGlzIDxzZWUgY3JlZj1cIlJlY3RhbmdsZUZcIi8+LlxyXG5cdFx0Ly8vIDwvc3VtbWFyeT5cclxuXHRcdHB1YmxpYyBmbG9hdCBUb3Age2dldHtyZXR1cm4gWTt9fVxyXG5cclxuXHRcdC8vLyA8c3VtbWFyeT5cclxuXHRcdC8vLyBSZXR1cm5zIHRoZSB5IGNvb3JkaW5hdGUgb2YgdGhlIGJvdHRvbSBlZGdlIG9mIHRoaXMgPHNlZSBjcmVmPVwiUmVjdGFuZ2xlRlwiLz4uXHJcblx0XHQvLy8gPC9zdW1tYXJ5PlxyXG5cdFx0cHVibGljIGZsb2F0IEJvdHRvbSB7Z2V0e3JldHVybiBZICsgSGVpZ2h0O319XHJcblxyXG5cdFx0Ly8vIDxzdW1tYXJ5PlxyXG5cdFx0Ly8vIFdoZXRoZXIgb3Igbm90IHRoaXMgPHNlZSBjcmVmPVwiUmVjdGFuZ2xlRlwiLz4gaGFzIGEgPHNlZSBjcmVmPVwiV2lkdGhcIi8+IGFuZFxyXG5cdFx0Ly8vIDxzZWUgY3JlZj1cIkhlaWdodFwiLz4gb2YgMCwgYW5kIGEgPHNlZSBjcmVmPVwiTG9jYXRpb25cIi8+IG9mICgwLCAwKS5cclxuXHRcdC8vLyA8L3N1bW1hcnk+XHJcblx0XHRwdWJsaWMgYm9vbCBJc0VtcHR5IHtnZXR7cmV0dXJuIFdpZHRoLkVxdWFscygwKSAmJiBIZWlnaHQuRXF1YWxzKDApICYmIFguRXF1YWxzKDApICYmIFkuRXF1YWxzKDApO319XHJcblxyXG5cdFx0Ly8vIDxzdW1tYXJ5PlxyXG5cdFx0Ly8vIFRoZSB0b3AtbGVmdCBjb29yZGluYXRlcyBvZiB0aGlzIDxzZWUgY3JlZj1cIlJlY3RhbmdsZUZcIi8+LlxyXG5cdFx0Ly8vIDwvc3VtbWFyeT5cclxuXHRcdHB1YmxpYyBWZWN0b3IyIExvY2F0aW9uXHJcblx0XHR7XHJcblx0XHRcdGdldCB7IHJldHVybiBuZXcgVmVjdG9yMihYLCBZKTsgfVxyXG5cdFx0XHRzZXRcclxuXHRcdFx0e1xyXG5cdFx0XHRcdFggPSB2YWx1ZS5YO1xyXG5cdFx0XHRcdFkgPSB2YWx1ZS5ZO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8vIDxzdW1tYXJ5PlxyXG5cdFx0Ly8vIFRoZSB3aWR0aC1oZWlnaHQgY29vcmRpbmF0ZXMgb2YgdGhpcyA8c2VlIGNyZWY9XCJSZWN0YW5nbGVGXCIvPi5cclxuXHRcdC8vLyA8L3N1bW1hcnk+XHJcblx0XHRwdWJsaWMgVmVjdG9yMiBTaXplXHJcblx0XHR7XHJcblx0XHRcdGdldCB7IHJldHVybiBuZXcgVmVjdG9yMihXaWR0aCwgSGVpZ2h0KTsgfVxyXG5cdFx0XHRzZXRcclxuXHRcdFx0e1xyXG5cdFx0XHRcdFdpZHRoID0gdmFsdWUuWDtcclxuXHRcdFx0XHRIZWlnaHQgPSB2YWx1ZS5ZO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8vIDxzdW1tYXJ5PlxyXG5cdFx0Ly8vIEEgPHNlZSBjcmVmPVwiVmVjdG9yMlwiLz4gbG9jYXRlZCBpbiB0aGUgY2VudGVyIG9mIHRoaXMgPHNlZSBjcmVmPVwiUmVjdGFuZ2xlRlwiLz4uXHJcblx0XHQvLy8gPC9zdW1tYXJ5PlxyXG5cdFx0cHVibGljIFZlY3RvcjIgQ2VudGVyIHtnZXR7cmV0dXJuIG5ldyBWZWN0b3IyKFggKyBXaWR0aCAvIDJmLCBZICsgSGVpZ2h0IC8gMmYpO319XHJcblxyXG5cdFx0aW50ZXJuYWwgc3RyaW5nIERlYnVnRGlzcGxheVN0cmluZyB7Z2V0e3JldHVybiBzdHJpbmcuQ29uY2F0KFgsIFwiICBcIiwgWSwgXCIgIFwiLCBXaWR0aCwgXCIgIFwiLCBIZWlnaHQpO319XHJcblxyXG5cdFx0Ly8vIDxzdW1tYXJ5PlxyXG5cdFx0Ly8vIENyZWF0ZXMgYSBuZXcgaW5zdGFuY2Ugb2YgPHNlZSBjcmVmPVwiUmVjdGFuZ2xlRlwiLz4gc3RydWN0LCB3aXRoIHRoZSBzcGVjaWZpZWRcclxuXHRcdC8vLyBwb3NpdGlvbiwgd2lkdGgsIGFuZCBoZWlnaHQuXHJcblx0XHQvLy8gPC9zdW1tYXJ5PlxyXG5cdFx0Ly8vIDxwYXJhbSBuYW1lPVwieFwiPlRoZSB4IGNvb3JkaW5hdGUgb2YgdGhlIHRvcC1sZWZ0IGNvcm5lciBvZiB0aGUgY3JlYXRlZCA8c2VlIGNyZWY9XCJSZWN0YW5nbGVGXCIvPi48L3BhcmFtPlxyXG5cdFx0Ly8vIDxwYXJhbSBuYW1lPVwieVwiPlRoZSB5IGNvb3JkaW5hdGUgb2YgdGhlIHRvcC1sZWZ0IGNvcm5lciBvZiB0aGUgY3JlYXRlZCA8c2VlIGNyZWY9XCJSZWN0YW5nbGVGXCIvPi48L3BhcmFtPlxyXG5cdFx0Ly8vIDxwYXJhbSBuYW1lPVwid2lkdGhcIj5UaGUgd2lkdGggb2YgdGhlIGNyZWF0ZWQgPHNlZSBjcmVmPVwiUmVjdGFuZ2xlRlwiLz4uPC9wYXJhbT5cclxuXHRcdC8vLyA8cGFyYW0gbmFtZT1cImhlaWdodFwiPlRoZSBoZWlnaHQgb2YgdGhlIGNyZWF0ZWQgPHNlZSBjcmVmPVwiUmVjdGFuZ2xlRlwiLz4uPC9wYXJhbT5cclxuXHRcdHB1YmxpYyBSZWN0YW5nbGVGKGZsb2F0IHgsIGZsb2F0IHksIGZsb2F0IHdpZHRoLCBmbG9hdCBoZWlnaHQpXHJcblx0XHR7XHJcblx0XHRcdFggPSB4O1xyXG5cdFx0XHRZID0geTtcclxuXHRcdFx0V2lkdGggPSB3aWR0aDtcclxuXHRcdFx0SGVpZ2h0ID0gaGVpZ2h0O1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vLyA8c3VtbWFyeT5cclxuXHRcdC8vLyBJbml0aWFsaXplcyBhIG5ldyBpbnN0YW5jZSBvZiB0aGUgPHNlZSBjcmVmPVwiVDpIdW1wZXIuQmFzZS5SZWN0YW5nbGVGXCIvPiB0aGF0IGNvbnRhaW5zIHRoZSB0d28gZ2l2ZW4gcmVjdGFuZ2xlcy5cclxuXHRcdC8vLyA8L3N1bW1hcnk+XHJcblx0XHQvLy8gPHBhcmFtIG5hbWU9XCJvbmVcIj5PbmUuPC9wYXJhbT5cclxuXHRcdC8vLyA8cGFyYW0gbmFtZT1cInR3b1wiPlR3by48L3BhcmFtPlxyXG5cdFx0cHVibGljIFJlY3RhbmdsZUYoUmVjdGFuZ2xlRiBvbmUsIFJlY3RhbmdsZUYgdHdvKVxyXG5cdFx0e1xyXG5cdFx0XHR2YXIgbGVmdCA9IE1hdGguTWluKG9uZS5MZWZ0LCB0d28uTGVmdCk7XHJcblx0XHRcdHZhciByaWdodCA9IE1hdGguTWF4KG9uZS5SaWdodCwgdHdvLlJpZ2h0KTtcclxuXHRcdFx0dmFyIHRvcCA9IE1hdGguTWluKG9uZS5Ub3AsIHR3by5Ub3ApO1xyXG5cdFx0XHR2YXIgYm90dG9tID0gTWF0aC5NYXgob25lLkJvdHRvbSwgdHdvLkJvdHRvbSk7XHJcblxyXG5cdFx0XHRYID0gbGVmdDtcclxuXHRcdFx0WSA9IHRvcDtcclxuXHRcdFx0V2lkdGggPSByaWdodCAtIGxlZnQ7XHJcblx0XHRcdEhlaWdodCA9IGJvdHRvbSAtIHRvcDtcclxuXHRcdH1cclxuXHJcblx0XHQvLy8gPHN1bW1hcnk+XHJcblx0XHQvLy8gQ3JlYXRlcyBhIG5ldyBpbnN0YW5jZSBvZiA8c2VlIGNyZWY9XCJSZWN0YW5nbGVGXCIvPiBzdHJ1Y3QsIHdpdGggdGhlIHNwZWNpZmllZFxyXG5cdFx0Ly8vIGxvY2F0aW9uIGFuZCBzaXplLlxyXG5cdFx0Ly8vIDwvc3VtbWFyeT5cclxuXHRcdC8vLyA8cGFyYW0gbmFtZT1cImxvY2F0aW9uXCI+VGhlIHggYW5kIHkgY29vcmRpbmF0ZXMgb2YgdGhlIHRvcC1sZWZ0IGNvcm5lciBvZiB0aGUgY3JlYXRlZCA8c2VlIGNyZWY9XCJSZWN0YW5nbGVGXCIvPi48L3BhcmFtPlxyXG5cdFx0Ly8vIDxwYXJhbSBuYW1lPVwic2l6ZVwiPlRoZSB3aWR0aCBhbmQgaGVpZ2h0IG9mIHRoZSBjcmVhdGVkIDxzZWUgY3JlZj1cIlJlY3RhbmdsZUZcIi8+LjwvcGFyYW0+XHJcblx0XHRwdWJsaWMgUmVjdGFuZ2xlRihWZWN0b3IyIGxvY2F0aW9uLCBWZWN0b3IyIHNpemUpXHJcblx0XHR7XHJcblx0XHRcdFggPSBsb2NhdGlvbi5YO1xyXG5cdFx0XHRZID0gbG9jYXRpb24uWTtcclxuXHRcdFx0V2lkdGggPSBzaXplLlg7XHJcblx0XHRcdEhlaWdodCA9IHNpemUuWTtcclxuXHRcdH1cclxuXHJcblx0XHQvLy8gPHN1bW1hcnk+XHJcblx0XHQvLy8gQ29tcGFyZXMgd2hldGhlciB0d28gPHNlZSBjcmVmPVwiUmVjdGFuZ2xlRlwiLz4gaW5zdGFuY2VzIGFyZSBlcXVhbC5cclxuXHRcdC8vLyA8L3N1bW1hcnk+XHJcblx0XHQvLy8gPHBhcmFtIG5hbWU9XCJhXCI+PHNlZSBjcmVmPVwiUmVjdGFuZ2xlRlwiLz4gaW5zdGFuY2Ugb24gdGhlIGxlZnQgb2YgdGhlIGVxdWFsIHNpZ24uPC9wYXJhbT5cclxuXHRcdC8vLyA8cGFyYW0gbmFtZT1cImJcIj48c2VlIGNyZWY9XCJSZWN0YW5nbGVGXCIvPiBpbnN0YW5jZSBvbiB0aGUgcmlnaHQgb2YgdGhlIGVxdWFsIHNpZ24uPC9wYXJhbT5cclxuXHRcdC8vLyA8cmV0dXJucz48Yz50cnVlPC9jPiBpZiB0aGUgaW5zdGFuY2VzIGFyZSBlcXVhbDsgPGM+ZmFsc2U8L2M+IG90aGVyd2lzZS48L3JldHVybnM+XHJcblx0XHRwdWJsaWMgc3RhdGljIGJvb2wgb3BlcmF0b3IgPT0oUmVjdGFuZ2xlRiBhLCBSZWN0YW5nbGVGIGIpXHJcblx0XHR7XHJcblx0XHRcdGNvbnN0IGZsb2F0IGVwc2lsb24gPSAwLjAwMDAxZjtcclxuXHRcdFx0cmV0dXJuIE1hdGguQWJzKGEuWCAtIGIuWCkgPCBlcHNpbG9uXHJcblx0XHRcdFx0JiYgTWF0aC5BYnMoYS5ZIC0gYi5ZKSA8IGVwc2lsb25cclxuXHRcdFx0XHQmJiBNYXRoLkFicyhhLldpZHRoIC0gYi5XaWR0aCkgPCBlcHNpbG9uXHJcblx0XHRcdFx0JiYgTWF0aC5BYnMoYS5IZWlnaHQgLSBiLkhlaWdodCkgPCBlcHNpbG9uO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vLyA8c3VtbWFyeT5cclxuXHRcdC8vLyBDb21wYXJlcyB3aGV0aGVyIHR3byA8c2VlIGNyZWY9XCJSZWN0YW5nbGVGXCIvPiBpbnN0YW5jZXMgYXJlIG5vdCBlcXVhbC5cclxuXHRcdC8vLyA8L3N1bW1hcnk+XHJcblx0XHQvLy8gPHBhcmFtIG5hbWU9XCJhXCI+PHNlZSBjcmVmPVwiUmVjdGFuZ2xlRlwiLz4gaW5zdGFuY2Ugb24gdGhlIGxlZnQgb2YgdGhlIG5vdCBlcXVhbCBzaWduLjwvcGFyYW0+XHJcblx0XHQvLy8gPHBhcmFtIG5hbWU9XCJiXCI+PHNlZSBjcmVmPVwiUmVjdGFuZ2xlRlwiLz4gaW5zdGFuY2Ugb24gdGhlIHJpZ2h0IG9mIHRoZSBub3QgZXF1YWwgc2lnbi48L3BhcmFtPlxyXG5cdFx0Ly8vIDxyZXR1cm5zPjxjPnRydWU8L2M+IGlmIHRoZSBpbnN0YW5jZXMgYXJlIG5vdCBlcXVhbDsgPGM+ZmFsc2U8L2M+IG90aGVyd2lzZS48L3JldHVybnM+XHJcblx0XHRwdWJsaWMgc3RhdGljIGJvb2wgb3BlcmF0b3IgIT0oUmVjdGFuZ2xlRiBhLCBSZWN0YW5nbGVGIGIpXHJcblx0XHR7XHJcblx0XHRcdHJldHVybiAhKGEgPT0gYik7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8vIDxzdW1tYXJ5PlxyXG5cdFx0Ly8vIEdldHMgd2hldGhlciBvciBub3QgdGhlIHByb3ZpZGVkIGNvb3JkaW5hdGVzIGxpZSB3aXRoaW4gdGhlIGJvdW5kcyBvZiB0aGlzIDxzZWUgY3JlZj1cIlJlY3RhbmdsZUZcIi8+LlxyXG5cdFx0Ly8vIDwvc3VtbWFyeT5cclxuXHRcdC8vLyA8cGFyYW0gbmFtZT1cInhcIj5UaGUgeCBjb29yZGluYXRlIG9mIHRoZSBwb2ludCB0byBjaGVjayBmb3IgY29udGFpbm1lbnQuPC9wYXJhbT5cclxuXHRcdC8vLyA8cGFyYW0gbmFtZT1cInlcIj5UaGUgeSBjb29yZGluYXRlIG9mIHRoZSBwb2ludCB0byBjaGVjayBmb3IgY29udGFpbm1lbnQuPC9wYXJhbT5cclxuXHRcdC8vLyA8cmV0dXJucz48Yz50cnVlPC9jPiBpZiB0aGUgcHJvdmlkZWQgY29vcmRpbmF0ZXMgbGllIGluc2lkZSB0aGlzIDxzZWUgY3JlZj1cIlJlY3RhbmdsZUZcIi8+OyA8Yz5mYWxzZTwvYz4gb3RoZXJ3aXNlLjwvcmV0dXJucz5cclxuXHRcdHB1YmxpYyBib29sIENvbnRhaW5zKGludCB4LCBpbnQgeSlcclxuXHRcdHtcclxuXHRcdFx0cmV0dXJuIFggPD0geCAmJiB4IDwgWCArIFdpZHRoICYmIFkgPD0geSAmJiB5IDwgWSArIEhlaWdodDtcclxuXHRcdH1cclxuXHJcblx0XHRwdWJsaWMgUmVjdGFuZ2xlRiBHZXRCb3VuZGluZ1JlY3RhbmdsZSgpXHJcblx0XHR7XHJcblx0XHRcdHJldHVybiB0aGlzO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vLyA8c3VtbWFyeT5cclxuXHRcdC8vLyBHZXRzIHdoZXRoZXIgb3Igbm90IHRoZSBwcm92aWRlZCBjb29yZGluYXRlcyBsaWUgd2l0aGluIHRoZSBib3VuZHMgb2YgdGhpcyA8c2VlIGNyZWY9XCJSZWN0YW5nbGVGXCIvPi5cclxuXHRcdC8vLyA8L3N1bW1hcnk+XHJcblx0XHQvLy8gPHBhcmFtIG5hbWU9XCJ4XCI+VGhlIHggY29vcmRpbmF0ZSBvZiB0aGUgcG9pbnQgdG8gY2hlY2sgZm9yIGNvbnRhaW5tZW50LjwvcGFyYW0+XHJcblx0XHQvLy8gPHBhcmFtIG5hbWU9XCJ5XCI+VGhlIHkgY29vcmRpbmF0ZSBvZiB0aGUgcG9pbnQgdG8gY2hlY2sgZm9yIGNvbnRhaW5tZW50LjwvcGFyYW0+XHJcblx0XHQvLy8gPHJldHVybnM+PGM+dHJ1ZTwvYz4gaWYgdGhlIHByb3ZpZGVkIGNvb3JkaW5hdGVzIGxpZSBpbnNpZGUgdGhpcyA8c2VlIGNyZWY9XCJSZWN0YW5nbGVGXCIvPjsgPGM+ZmFsc2U8L2M+IG90aGVyd2lzZS48L3JldHVybnM+XHJcblx0XHRwdWJsaWMgYm9vbCBDb250YWlucyhmbG9hdCB4LCBmbG9hdCB5KVxyXG5cdFx0e1xyXG5cdFx0XHRyZXR1cm4gWCA8PSB4ICYmIHggPCBYICsgV2lkdGggJiYgWSA8PSB5ICYmIHkgPCBZICsgSGVpZ2h0O1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vLyA8c3VtbWFyeT5cclxuXHRcdC8vLyBHZXRzIHdoZXRoZXIgb3Igbm90IHRoZSBwcm92aWRlZCA8c2VlIGNyZWY9XCJWZWN0b3IyXCIvPiBsaWVzIHdpdGhpbiB0aGUgYm91bmRzIG9mIHRoaXMgPHNlZSBjcmVmPVwiUmVjdGFuZ2xlRlwiLz4uXHJcblx0XHQvLy8gPC9zdW1tYXJ5PlxyXG5cdFx0Ly8vIDxwYXJhbSBuYW1lPVwidmFsdWVcIj5UaGUgY29vcmRpbmF0ZXMgdG8gY2hlY2sgZm9yIGluY2x1c2lvbiBpbiB0aGlzIDxzZWUgY3JlZj1cIlJlY3RhbmdsZUZcIi8+LjwvcGFyYW0+XHJcblx0XHQvLy8gPHJldHVybnM+PGM+dHJ1ZTwvYz4gaWYgdGhlIHByb3ZpZGVkIDxzZWUgY3JlZj1cIlZlY3RvcjJcIi8+IGxpZXMgaW5zaWRlIHRoaXMgPHNlZSBjcmVmPVwiUmVjdGFuZ2xlRlwiLz47IDxjPmZhbHNlPC9jPiBvdGhlcndpc2UuPC9yZXR1cm5zPlxyXG5cdFx0cHVibGljIGJvb2wgQ29udGFpbnMoVmVjdG9yMiB2YWx1ZSlcclxuXHRcdHtcclxuXHRcdFx0cmV0dXJuIFggPD0gdmFsdWUuWCAmJiB2YWx1ZS5YIDwgWCArIFdpZHRoICYmIFkgPD0gdmFsdWUuWSAmJiB2YWx1ZS5ZIDwgWSArIEhlaWdodDtcclxuXHRcdH1cclxuXHJcblx0XHQvLy8gPHN1bW1hcnk+XHJcblx0XHQvLy8gR2V0cyB3aGV0aGVyIG9yIG5vdCB0aGUgcHJvdmlkZWQgPHNlZSBjcmVmPVwiVmVjdG9yMlwiLz4gbGllcyB3aXRoaW4gdGhlIGJvdW5kcyBvZiB0aGlzIDxzZWUgY3JlZj1cIlJlY3RhbmdsZUZcIi8+LlxyXG5cdFx0Ly8vIDwvc3VtbWFyeT5cclxuXHRcdC8vLyA8cGFyYW0gbmFtZT1cInZhbHVlXCI+VGhlIGNvb3JkaW5hdGVzIHRvIGNoZWNrIGZvciBpbmNsdXNpb24gaW4gdGhpcyA8c2VlIGNyZWY9XCJSZWN0YW5nbGVGXCIvPi48L3BhcmFtPlxyXG5cdFx0Ly8vIDxwYXJhbSBuYW1lPVwicmVzdWx0XCI+PGM+dHJ1ZTwvYz4gaWYgdGhlIHByb3ZpZGVkIDxzZWUgY3JlZj1cIlZlY3RvcjJcIi8+IGxpZXMgaW5zaWRlIHRoaXMgPHNlZSBjcmVmPVwiUmVjdGFuZ2xlRlwiLz47IDxjPmZhbHNlPC9jPiBvdGhlcndpc2UuIEFzIGFuIG91dHB1dCBwYXJhbWV0ZXIuPC9wYXJhbT5cclxuXHRcdHB1YmxpYyB2b2lkIENvbnRhaW5zKHJlZiBWZWN0b3IyIHZhbHVlLCBvdXQgYm9vbCByZXN1bHQpXHJcblx0XHR7XHJcblx0XHRcdHJlc3VsdCA9IChYIDw9IHZhbHVlLlgpICYmICh2YWx1ZS5YIDwgWCArIFdpZHRoKSAmJiAoWSA8PSB2YWx1ZS5ZKSAmJiAodmFsdWUuWSA8IFkgKyBIZWlnaHQpO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vLyA8c3VtbWFyeT5cclxuXHRcdC8vLyBHZXRzIHdoZXRoZXIgb3Igbm90IHRoZSBwcm92aWRlZCA8c2VlIGNyZWY9XCJSZWN0YW5nbGVGXCIvPiBsaWVzIHdpdGhpbiB0aGUgYm91bmRzIG9mIHRoaXMgPHNlZSBjcmVmPVwiUmVjdGFuZ2xlRlwiLz4uXHJcblx0XHQvLy8gPC9zdW1tYXJ5PlxyXG5cdFx0Ly8vIDxwYXJhbSBuYW1lPVwidmFsdWVcIj5UaGUgPHNlZSBjcmVmPVwiUmVjdGFuZ2xlRlwiLz4gdG8gY2hlY2sgZm9yIGluY2x1c2lvbiBpbiB0aGlzIDxzZWUgY3JlZj1cIlJlY3RhbmdsZUZcIi8+LjwvcGFyYW0+XHJcblx0XHQvLy8gPHJldHVybnM+PGM+dHJ1ZTwvYz4gaWYgdGhlIHByb3ZpZGVkIDxzZWUgY3JlZj1cIlJlY3RhbmdsZUZcIi8+J3MgYm91bmRzIGxpZSBlbnRpcmVseSBpbnNpZGUgdGhpcyA8c2VlIGNyZWY9XCJSZWN0YW5nbGVGXCIvPjsgPGM+ZmFsc2U8L2M+IG90aGVyd2lzZS48L3JldHVybnM+XHJcblx0XHRwdWJsaWMgYm9vbCBDb250YWlucyhSZWN0YW5nbGVGIHZhbHVlKVxyXG5cdFx0e1xyXG5cdFx0XHRyZXR1cm4gKFggPD0gdmFsdWUuWCkgJiYgKHZhbHVlLlggKyB2YWx1ZS5XaWR0aCA8PSBYICsgV2lkdGgpICYmIChZIDw9IHZhbHVlLlkpICYmICh2YWx1ZS5ZICsgdmFsdWUuSGVpZ2h0IDw9IFkgKyBIZWlnaHQpO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vLyA8c3VtbWFyeT5cclxuXHRcdC8vLyBHZXRzIHdoZXRoZXIgb3Igbm90IHRoZSBwcm92aWRlZCA8c2VlIGNyZWY9XCJSZWN0YW5nbGVGXCIvPiBsaWVzIHdpdGhpbiB0aGUgYm91bmRzIG9mIHRoaXMgPHNlZSBjcmVmPVwiUmVjdGFuZ2xlRlwiLz4uXHJcblx0XHQvLy8gPC9zdW1tYXJ5PlxyXG5cdFx0Ly8vIDxwYXJhbSBuYW1lPVwidmFsdWVcIj5UaGUgPHNlZSBjcmVmPVwiUmVjdGFuZ2xlRlwiLz4gdG8gY2hlY2sgZm9yIGluY2x1c2lvbiBpbiB0aGlzIDxzZWUgY3JlZj1cIlJlY3RhbmdsZUZcIi8+LjwvcGFyYW0+XHJcblx0XHQvLy8gPHBhcmFtIG5hbWU9XCJyZXN1bHRcIj48Yz50cnVlPC9jPiBpZiB0aGUgcHJvdmlkZWQgPHNlZSBjcmVmPVwiUmVjdGFuZ2xlRlwiLz4ncyBib3VuZHMgbGllIGVudGlyZWx5IGluc2lkZSB0aGlzIDxzZWUgY3JlZj1cIlJlY3RhbmdsZUZcIi8+OyA8Yz5mYWxzZTwvYz4gb3RoZXJ3aXNlLiBBcyBhbiBvdXRwdXQgcGFyYW1ldGVyLjwvcGFyYW0+XHJcblx0XHRwdWJsaWMgdm9pZCBDb250YWlucyhyZWYgUmVjdGFuZ2xlRiB2YWx1ZSwgb3V0IGJvb2wgcmVzdWx0KVxyXG5cdFx0e1xyXG5cdFx0XHRyZXN1bHQgPSAoWCA8PSB2YWx1ZS5YKSAmJiAodmFsdWUuWCArIHZhbHVlLldpZHRoIDw9IFggKyBXaWR0aCkgJiYgKFkgPD0gdmFsdWUuWSkgJiYgKHZhbHVlLlkgKyB2YWx1ZS5IZWlnaHQgPD0gWSArIEhlaWdodCk7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8vIDxzdW1tYXJ5PlxyXG5cdFx0Ly8vIENvbXBhcmVzIHdoZXRoZXIgY3VycmVudCBpbnN0YW5jZSBpcyBlcXVhbCB0byBzcGVjaWZpZWQgPHNlZSBjcmVmPVwiT2JqZWN0XCIvPi5cclxuXHRcdC8vLyA8L3N1bW1hcnk+XHJcblx0XHQvLy8gPHBhcmFtIG5hbWU9XCJvYmpcIj5UaGUgPHNlZSBjcmVmPVwiT2JqZWN0XCIvPiB0byBjb21wYXJlLjwvcGFyYW0+XHJcblx0XHQvLy8gPHJldHVybnM+PGM+dHJ1ZTwvYz4gaWYgdGhlIGluc3RhbmNlcyBhcmUgZXF1YWw7IDxjPmZhbHNlPC9jPiBvdGhlcndpc2UuPC9yZXR1cm5zPlxyXG5cdFx0cHVibGljIG92ZXJyaWRlIGJvb2wgRXF1YWxzKG9iamVjdCBvYmopXHJcblx0XHR7XHJcblx0XHRcdHJldHVybiBvYmogaXMgUmVjdGFuZ2xlRiAmJiB0aGlzID09IChSZWN0YW5nbGVGKW9iajtcclxuXHRcdH1cclxuXHJcblx0XHQvLy8gPHN1bW1hcnk+XHJcblx0XHQvLy8gQ29tcGFyZXMgd2hldGhlciBjdXJyZW50IGluc3RhbmNlIGlzIGVxdWFsIHRvIHNwZWNpZmllZCA8c2VlIGNyZWY9XCJSZWN0YW5nbGVGXCIvPi5cclxuXHRcdC8vLyA8L3N1bW1hcnk+XHJcblx0XHQvLy8gPHBhcmFtIG5hbWU9XCJvdGhlclwiPlRoZSA8c2VlIGNyZWY9XCJSZWN0YW5nbGVGXCIvPiB0byBjb21wYXJlLjwvcGFyYW0+XHJcblx0XHQvLy8gPHJldHVybnM+PGM+dHJ1ZTwvYz4gaWYgdGhlIGluc3RhbmNlcyBhcmUgZXF1YWw7IDxjPmZhbHNlPC9jPiBvdGhlcndpc2UuPC9yZXR1cm5zPlxyXG5cdFx0cHVibGljIGJvb2wgRXF1YWxzKFJlY3RhbmdsZUYgb3RoZXIpXHJcblx0XHR7XHJcblx0XHRcdHJldHVybiB0aGlzID09IG90aGVyO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vLyA8c3VtbWFyeT5cclxuXHRcdC8vLyBHZXRzIHRoZSBoYXNoIGNvZGUgb2YgdGhpcyA8c2VlIGNyZWY9XCJSZWN0YW5nbGVGXCIvPi5cclxuXHRcdC8vLyA8L3N1bW1hcnk+XHJcblx0XHQvLy8gPHJldHVybnM+SGFzaCBjb2RlIG9mIHRoaXMgPHNlZSBjcmVmPVwiUmVjdGFuZ2xlRlwiLz4uPC9yZXR1cm5zPlxyXG5cdFx0cHVibGljIG92ZXJyaWRlIGludCBHZXRIYXNoQ29kZSgpXHJcblx0XHR7XHJcblx0XHRcdC8vIFJlU2hhcnBlciBkaXNhYmxlIE5vblJlYWRvbmx5TWVtYmVySW5HZXRIYXNoQ29kZVxyXG5cdFx0XHRyZXR1cm4gWC5HZXRIYXNoQ29kZSgpIF4gWS5HZXRIYXNoQ29kZSgpIF4gV2lkdGguR2V0SGFzaENvZGUoKSBeIEhlaWdodC5HZXRIYXNoQ29kZSgpO1xyXG5cdFx0XHQvLyBSZVNoYXJwZXIgcmVzdG9yZSBOb25SZWFkb25seU1lbWJlckluR2V0SGFzaENvZGVcclxuXHRcdH1cclxuXHJcblx0XHQvLy8gPHN1bW1hcnk+XHJcblx0XHQvLy8gQWRqdXN0cyB0aGUgZWRnZXMgb2YgdGhpcyA8c2VlIGNyZWY9XCJSZWN0YW5nbGVGXCIvPiBieSBzcGVjaWZpZWQgaG9yaXpvbnRhbCBhbmQgdmVydGljYWwgYW1vdW50cy4gXHJcblx0XHQvLy8gPC9zdW1tYXJ5PlxyXG5cdFx0Ly8vIDxwYXJhbSBuYW1lPVwiaG9yaXpvbnRhbEFtb3VudFwiPlZhbHVlIHRvIGFkanVzdCB0aGUgbGVmdCBhbmQgcmlnaHQgZWRnZXMuPC9wYXJhbT5cclxuXHRcdC8vLyA8cGFyYW0gbmFtZT1cInZlcnRpY2FsQW1vdW50XCI+VmFsdWUgdG8gYWRqdXN0IHRoZSB0b3AgYW5kIGJvdHRvbSBlZGdlcy48L3BhcmFtPlxyXG5cdFx0cHVibGljIHZvaWQgSW5mbGF0ZShpbnQgaG9yaXpvbnRhbEFtb3VudCwgaW50IHZlcnRpY2FsQW1vdW50KVxyXG5cdFx0e1xyXG5cdFx0XHRYIC09IGhvcml6b250YWxBbW91bnQ7XHJcblx0XHRcdFkgLT0gdmVydGljYWxBbW91bnQ7XHJcblx0XHRcdFdpZHRoICs9IGhvcml6b250YWxBbW91bnQgKiAyO1xyXG5cdFx0XHRIZWlnaHQgKz0gdmVydGljYWxBbW91bnQgKiAyO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vLyA8c3VtbWFyeT5cclxuXHRcdC8vLyBBZGp1c3RzIHRoZSBlZGdlcyBvZiB0aGlzIDxzZWUgY3JlZj1cIlJlY3RhbmdsZUZcIi8+IGJ5IHNwZWNpZmllZCBob3Jpem9udGFsIGFuZCB2ZXJ0aWNhbCBhbW91bnRzLiBcclxuXHRcdC8vLyA8L3N1bW1hcnk+XHJcblx0XHQvLy8gPHBhcmFtIG5hbWU9XCJob3Jpem9udGFsQW1vdW50XCI+VmFsdWUgdG8gYWRqdXN0IHRoZSBsZWZ0IGFuZCByaWdodCBlZGdlcy48L3BhcmFtPlxyXG5cdFx0Ly8vIDxwYXJhbSBuYW1lPVwidmVydGljYWxBbW91bnRcIj5WYWx1ZSB0byBhZGp1c3QgdGhlIHRvcCBhbmQgYm90dG9tIGVkZ2VzLjwvcGFyYW0+XHJcblx0XHRwdWJsaWMgdm9pZCBJbmZsYXRlKGZsb2F0IGhvcml6b250YWxBbW91bnQsIGZsb2F0IHZlcnRpY2FsQW1vdW50KVxyXG5cdFx0e1xyXG5cdFx0XHRYIC09IGhvcml6b250YWxBbW91bnQ7XHJcblx0XHRcdFkgLT0gdmVydGljYWxBbW91bnQ7XHJcblx0XHRcdFdpZHRoICs9IGhvcml6b250YWxBbW91bnQgKiAyO1xyXG5cdFx0XHRIZWlnaHQgKz0gdmVydGljYWxBbW91bnQgKiAyO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vLyA8c3VtbWFyeT5cclxuXHRcdC8vLyBHZXRzIHdoZXRoZXIgb3Igbm90IHRoZSBvdGhlciA8c2VlIGNyZWY9XCJSZWN0YW5nbGVGXCIvPiBpbnRlcnNlY3RzIHdpdGggdGhpcyBSZWN0YW5nbGVGLlxyXG5cdFx0Ly8vIDwvc3VtbWFyeT5cclxuXHRcdC8vLyA8cGFyYW0gbmFtZT1cInZhbHVlXCI+VGhlIG90aGVyIHJlY3RhbmdsZSBmb3IgdGVzdGluZy48L3BhcmFtPlxyXG5cdFx0Ly8vIDxyZXR1cm5zPjxjPnRydWU8L2M+IGlmIG90aGVyIDxzZWUgY3JlZj1cIlJlY3RhbmdsZUZcIi8+IGludGVyc2VjdHMgd2l0aCB0aGlzIHJlY3RhbmdsZTsgPGM+ZmFsc2U8L2M+IG90aGVyd2lzZS48L3JldHVybnM+XHJcblx0XHRwdWJsaWMgYm9vbCBJbnRlcnNlY3RzKFJlY3RhbmdsZUYgdmFsdWUpXHJcblx0XHR7XHJcblx0XHRcdHJldHVybiB2YWx1ZS5MZWZ0IDwgUmlnaHQgJiYgTGVmdCA8IHZhbHVlLlJpZ2h0ICYmXHJcblx0XHRcdFx0ICAgdmFsdWUuVG9wIDwgQm90dG9tICYmIFRvcCA8IHZhbHVlLkJvdHRvbTtcclxuXHRcdH1cclxuXHJcblxyXG5cdFx0Ly8vIDxzdW1tYXJ5PlxyXG5cdFx0Ly8vIEdldHMgd2hldGhlciBvciBub3QgdGhlIG90aGVyIDxzZWUgY3JlZj1cIlJlY3RhbmdsZUZcIi8+IGludGVyc2VjdHMgd2l0aCB0aGlzIHJlY3RhbmdsZS5cclxuXHRcdC8vLyA8L3N1bW1hcnk+XHJcblx0XHQvLy8gPHBhcmFtIG5hbWU9XCJ2YWx1ZVwiPlRoZSBvdGhlciByZWN0YW5nbGUgZm9yIHRlc3RpbmcuPC9wYXJhbT5cclxuXHRcdC8vLyA8cGFyYW0gbmFtZT1cInJlc3VsdFwiPjxjPnRydWU8L2M+IGlmIG90aGVyIDxzZWUgY3JlZj1cIlJlY3RhbmdsZUZcIi8+IGludGVyc2VjdHMgd2l0aCB0aGlzIHJlY3RhbmdsZTsgPGM+ZmFsc2U8L2M+IG90aGVyd2lzZS4gQXMgYW4gb3V0cHV0IHBhcmFtZXRlci48L3BhcmFtPlxyXG5cdFx0cHVibGljIHZvaWQgSW50ZXJzZWN0cyhyZWYgUmVjdGFuZ2xlRiB2YWx1ZSwgb3V0IGJvb2wgcmVzdWx0KVxyXG5cdFx0e1xyXG5cdFx0XHRyZXN1bHQgPSB2YWx1ZS5MZWZ0IDwgUmlnaHQgJiYgTGVmdCA8IHZhbHVlLlJpZ2h0ICYmXHJcblx0XHRcdFx0XHQgdmFsdWUuVG9wIDwgQm90dG9tICYmIFRvcCA8IHZhbHVlLkJvdHRvbTtcclxuXHRcdH1cclxuXHJcblx0XHQvLy8gPHN1bW1hcnk+XHJcblx0XHQvLy8gQ3JlYXRlcyBhIG5ldyA8c2VlIGNyZWY9XCJSZWN0YW5nbGVGXCIvPiB0aGF0IGNvbnRhaW5zIG92ZXJsYXBwaW5nIHJlZ2lvbiBvZiB0d28gb3RoZXIgcmVjdGFuZ2xlcy5cclxuXHRcdC8vLyA8L3N1bW1hcnk+XHJcblx0XHQvLy8gPHBhcmFtIG5hbWU9XCJ2YWx1ZTFcIj5UaGUgZmlyc3QgPHNlZSBjcmVmPVwiUmVjdGFuZ2xlRlwiLz4uPC9wYXJhbT5cclxuXHRcdC8vLyA8cGFyYW0gbmFtZT1cInZhbHVlMlwiPlRoZSBzZWNvbmQgPHNlZSBjcmVmPVwiUmVjdGFuZ2xlRlwiLz4uPC9wYXJhbT5cclxuXHRcdC8vLyA8cmV0dXJucz5PdmVybGFwcGluZyByZWdpb24gb2YgdGhlIHR3byByZWN0YW5nbGVzLjwvcmV0dXJucz5cclxuXHRcdHB1YmxpYyBzdGF0aWMgUmVjdGFuZ2xlRiBJbnRlcnNlY3QoUmVjdGFuZ2xlRiB2YWx1ZTEsIFJlY3RhbmdsZUYgdmFsdWUyKVxyXG5cdFx0e1xyXG5cdFx0XHRSZWN0YW5nbGVGIHJlY3RhbmdsZTtcclxuXHRcdFx0SW50ZXJzZWN0KHJlZiB2YWx1ZTEsIHJlZiB2YWx1ZTIsIG91dCByZWN0YW5nbGUpO1xyXG5cdFx0XHRyZXR1cm4gcmVjdGFuZ2xlO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vLyA8c3VtbWFyeT5cclxuXHRcdC8vLyBDcmVhdGVzIGEgbmV3IDxzZWUgY3JlZj1cIlJlY3RhbmdsZUZcIi8+IHRoYXQgY29udGFpbnMgb3ZlcmxhcHBpbmcgcmVnaW9uIG9mIHR3byBvdGhlciByZWN0YW5nbGVzLlxyXG5cdFx0Ly8vIDwvc3VtbWFyeT5cclxuXHRcdC8vLyA8cGFyYW0gbmFtZT1cInZhbHVlMVwiPlRoZSBmaXJzdCA8c2VlIGNyZWY9XCJSZWN0YW5nbGVGXCIvPi48L3BhcmFtPlxyXG5cdFx0Ly8vIDxwYXJhbSBuYW1lPVwidmFsdWUyXCI+VGhlIHNlY29uZCA8c2VlIGNyZWY9XCJSZWN0YW5nbGVGXCIvPi48L3BhcmFtPlxyXG5cdFx0Ly8vIDxwYXJhbSBuYW1lPVwicmVzdWx0XCI+T3ZlcmxhcHBpbmcgcmVnaW9uIG9mIHRoZSB0d28gcmVjdGFuZ2xlcyBhcyBhbiBvdXRwdXQgcGFyYW1ldGVyLjwvcGFyYW0+XHJcblx0XHRwdWJsaWMgc3RhdGljIHZvaWQgSW50ZXJzZWN0KHJlZiBSZWN0YW5nbGVGIHZhbHVlMSwgcmVmIFJlY3RhbmdsZUYgdmFsdWUyLCBvdXQgUmVjdGFuZ2xlRiByZXN1bHQpXHJcblx0XHR7XHJcblx0XHRcdGlmICh2YWx1ZTEuSW50ZXJzZWN0cyh2YWx1ZTIpKVxyXG5cdFx0XHR7XHJcblx0XHRcdFx0dmFyIHJpZ2h0U2lkZSA9IE1hdGguTWluKHZhbHVlMS5YICsgdmFsdWUxLldpZHRoLCB2YWx1ZTIuWCArIHZhbHVlMi5XaWR0aCk7XHJcblx0XHRcdFx0dmFyIGxlZnRTaWRlID0gTWF0aC5NYXgodmFsdWUxLlgsIHZhbHVlMi5YKTtcclxuXHRcdFx0XHR2YXIgdG9wU2lkZSA9IE1hdGguTWF4KHZhbHVlMS5ZLCB2YWx1ZTIuWSk7XHJcblx0XHRcdFx0dmFyIGJvdHRvbVNpZGUgPSBNYXRoLk1pbih2YWx1ZTEuWSArIHZhbHVlMS5IZWlnaHQsIHZhbHVlMi5ZICsgdmFsdWUyLkhlaWdodCk7XHJcblx0XHRcdFx0cmVzdWx0ID0gbmV3IFJlY3RhbmdsZUYobGVmdFNpZGUsIHRvcFNpZGUsIHJpZ2h0U2lkZSAtIGxlZnRTaWRlLCBib3R0b21TaWRlIC0gdG9wU2lkZSk7XHJcblx0XHRcdH1cclxuXHRcdFx0ZWxzZVxyXG5cdFx0XHR7XHJcblx0XHRcdFx0cmVzdWx0ID0gbmV3IFJlY3RhbmdsZUYoMCwgMCwgMCwgMCk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHQvLy8gPHN1bW1hcnk+XHJcblx0XHQvLy8gQ2hhbmdlcyB0aGUgPHNlZSBjcmVmPVwiTG9jYXRpb25cIi8+IG9mIHRoaXMgPHNlZSBjcmVmPVwiUmVjdGFuZ2xlRlwiLz4uXHJcblx0XHQvLy8gPC9zdW1tYXJ5PlxyXG5cdFx0Ly8vIDxwYXJhbSBuYW1lPVwib2Zmc2V0WFwiPlRoZSB4IGNvb3JkaW5hdGUgdG8gYWRkIHRvIHRoaXMgPHNlZSBjcmVmPVwiUmVjdGFuZ2xlRlwiLz4uPC9wYXJhbT5cclxuXHRcdC8vLyA8cGFyYW0gbmFtZT1cIm9mZnNldFlcIj5UaGUgeSBjb29yZGluYXRlIHRvIGFkZCB0byB0aGlzIDxzZWUgY3JlZj1cIlJlY3RhbmdsZUZcIi8+LjwvcGFyYW0+XHJcblx0XHRwdWJsaWMgdm9pZCBPZmZzZXQoaW50IG9mZnNldFgsIGludCBvZmZzZXRZKVxyXG5cdFx0e1xyXG5cdFx0XHRYICs9IG9mZnNldFg7XHJcblx0XHRcdFkgKz0gb2Zmc2V0WTtcclxuXHRcdH1cclxuXHJcblx0XHQvLy8gPHN1bW1hcnk+XHJcblx0XHQvLy8gQ2hhbmdlcyB0aGUgPHNlZSBjcmVmPVwiTG9jYXRpb25cIi8+IG9mIHRoaXMgPHNlZSBjcmVmPVwiUmVjdGFuZ2xlRlwiLz4uXHJcblx0XHQvLy8gPC9zdW1tYXJ5PlxyXG5cdFx0Ly8vIDxwYXJhbSBuYW1lPVwib2Zmc2V0WFwiPlRoZSB4IGNvb3JkaW5hdGUgdG8gYWRkIHRvIHRoaXMgPHNlZSBjcmVmPVwiUmVjdGFuZ2xlRlwiLz4uPC9wYXJhbT5cclxuXHRcdC8vLyA8cGFyYW0gbmFtZT1cIm9mZnNldFlcIj5UaGUgeSBjb29yZGluYXRlIHRvIGFkZCB0byB0aGlzIDxzZWUgY3JlZj1cIlJlY3RhbmdsZUZcIi8+LjwvcGFyYW0+XHJcblx0XHRwdWJsaWMgdm9pZCBPZmZzZXQoZmxvYXQgb2Zmc2V0WCwgZmxvYXQgb2Zmc2V0WSlcclxuXHRcdHtcclxuXHRcdFx0WCArPSBvZmZzZXRYO1xyXG5cdFx0XHRZICs9IG9mZnNldFk7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8vIDxzdW1tYXJ5PlxyXG5cdFx0Ly8vIENoYW5nZXMgdGhlIDxzZWUgY3JlZj1cIkxvY2F0aW9uXCIvPiBvZiB0aGlzIDxzZWUgY3JlZj1cIlJlY3RhbmdsZUZcIi8+LlxyXG5cdFx0Ly8vIDwvc3VtbWFyeT5cclxuXHRcdC8vLyA8cGFyYW0gbmFtZT1cImFtb3VudFwiPlRoZSB4IGFuZCB5IGNvbXBvbmVudHMgdG8gYWRkIHRvIHRoaXMgPHNlZSBjcmVmPVwiUmVjdGFuZ2xlRlwiLz4uPC9wYXJhbT5cclxuXHRcdHB1YmxpYyB2b2lkIE9mZnNldChWZWN0b3IyIGFtb3VudClcclxuXHRcdHtcclxuXHRcdFx0WCArPSBhbW91bnQuWDtcclxuXHRcdFx0WSArPSBhbW91bnQuWTtcclxuXHRcdH1cclxuXHJcblx0XHQvLy8gPHN1bW1hcnk+XHJcblx0XHQvLy8gUmV0dXJucyBhIDxzZWUgY3JlZj1cIlN0cmluZ1wiLz4gcmVwcmVzZW50YXRpb24gb2YgdGhpcyA8c2VlIGNyZWY9XCJSZWN0YW5nbGVGXCIvPiBpbiB0aGUgZm9ybWF0OlxyXG5cdFx0Ly8vIHtYOls8c2VlIGNyZWY9XCJYXCIvPl0gWTpbPHNlZSBjcmVmPVwiWVwiLz5dIFdpZHRoOls8c2VlIGNyZWY9XCJXaWR0aFwiLz5dIEhlaWdodDpbPHNlZSBjcmVmPVwiSGVpZ2h0XCIvPl19XHJcblx0XHQvLy8gPC9zdW1tYXJ5PlxyXG5cdFx0Ly8vIDxyZXR1cm5zPjxzZWUgY3JlZj1cIlN0cmluZ1wiLz4gcmVwcmVzZW50YXRpb24gb2YgdGhpcyA8c2VlIGNyZWY9XCJSZWN0YW5nbGVGXCIvPi48L3JldHVybnM+XHJcblx0XHRwdWJsaWMgb3ZlcnJpZGUgc3RyaW5nIFRvU3RyaW5nKClcclxuXHRcdHtcclxuXHRcdFx0cmV0dXJuIFwie1g6XCIgKyBYICsgXCIgWTpcIiArIFkgKyBcIiBXaWR0aDpcIiArIFdpZHRoICsgXCIgSGVpZ2h0OlwiICsgSGVpZ2h0ICsgXCJ9XCI7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8vIDxzdW1tYXJ5PlxyXG5cdFx0Ly8vIENyZWF0ZXMgYSBuZXcgPHNlZSBjcmVmPVwiUmVjdGFuZ2xlRlwiLz4gdGhhdCBjb21wbGV0ZWx5IGNvbnRhaW5zIHR3byBvdGhlciByZWN0YW5nbGVzLlxyXG5cdFx0Ly8vIDwvc3VtbWFyeT5cclxuXHRcdC8vLyA8cGFyYW0gbmFtZT1cInZhbHVlMVwiPlRoZSBmaXJzdCA8c2VlIGNyZWY9XCJSZWN0YW5nbGVGXCIvPi48L3BhcmFtPlxyXG5cdFx0Ly8vIDxwYXJhbSBuYW1lPVwidmFsdWUyXCI+VGhlIHNlY29uZCA8c2VlIGNyZWY9XCJSZWN0YW5nbGVGXCIvPi48L3BhcmFtPlxyXG5cdFx0Ly8vIDxyZXR1cm5zPlRoZSB1bmlvbiBvZiB0aGUgdHdvIHJlY3RhbmdsZXMuPC9yZXR1cm5zPlxyXG5cdFx0cHVibGljIHN0YXRpYyBSZWN0YW5nbGVGIFVuaW9uKFJlY3RhbmdsZUYgdmFsdWUxLCBSZWN0YW5nbGVGIHZhbHVlMilcclxuXHRcdHtcclxuXHRcdFx0dmFyIHggPSBNYXRoLk1pbih2YWx1ZTEuWCwgdmFsdWUyLlgpO1xyXG5cdFx0XHR2YXIgeSA9IE1hdGguTWluKHZhbHVlMS5ZLCB2YWx1ZTIuWSk7XHJcblx0XHRcdHJldHVybiBuZXcgUmVjdGFuZ2xlRih4LCB5LFxyXG5cdFx0XHRcdE1hdGguTWF4KHZhbHVlMS5SaWdodCwgdmFsdWUyLlJpZ2h0KSAtIHgsXHJcblx0XHRcdFx0TWF0aC5NYXgodmFsdWUxLkJvdHRvbSwgdmFsdWUyLkJvdHRvbSkgLSB5KTtcclxuXHRcdH1cclxuXHJcblx0XHQvLy8gPHN1bW1hcnk+XHJcblx0XHQvLy8gQ3JlYXRlcyBhIG5ldyA8c2VlIGNyZWY9XCJSZWN0YW5nbGVGXCIvPiB0aGF0IGNvbXBsZXRlbHkgY29udGFpbnMgdHdvIG90aGVyIHJlY3RhbmdsZXMuXHJcblx0XHQvLy8gPC9zdW1tYXJ5PlxyXG5cdFx0Ly8vIDxwYXJhbSBuYW1lPVwidmFsdWUxXCI+VGhlIGZpcnN0IDxzZWUgY3JlZj1cIlJlY3RhbmdsZUZcIi8+LjwvcGFyYW0+XHJcblx0XHQvLy8gPHBhcmFtIG5hbWU9XCJ2YWx1ZTJcIj5UaGUgc2Vjb25kIDxzZWUgY3JlZj1cIlJlY3RhbmdsZUZcIi8+LjwvcGFyYW0+XHJcblx0XHQvLy8gPHBhcmFtIG5hbWU9XCJyZXN1bHRcIj5UaGUgdW5pb24gb2YgdGhlIHR3byByZWN0YW5nbGVzIGFzIGFuIG91dHB1dCBwYXJhbWV0ZXIuPC9wYXJhbT5cclxuXHRcdHB1YmxpYyBzdGF0aWMgdm9pZCBVbmlvbihyZWYgUmVjdGFuZ2xlRiB2YWx1ZTEsIHJlZiBSZWN0YW5nbGVGIHZhbHVlMiwgb3V0IFJlY3RhbmdsZUYgcmVzdWx0KVxyXG5cdFx0e1xyXG5cdFx0XHRyZXN1bHQuWCA9IE1hdGguTWluKHZhbHVlMS5YLCB2YWx1ZTIuWCk7XHJcblx0XHRcdHJlc3VsdC5ZID0gTWF0aC5NaW4odmFsdWUxLlksIHZhbHVlMi5ZKTtcclxuXHRcdFx0cmVzdWx0LldpZHRoID0gTWF0aC5NYXgodmFsdWUxLlJpZ2h0LCB2YWx1ZTIuUmlnaHQpIC0gcmVzdWx0Llg7XHJcblx0XHRcdHJlc3VsdC5IZWlnaHQgPSBNYXRoLk1heCh2YWx1ZTEuQm90dG9tLCB2YWx1ZTIuQm90dG9tKSAtIHJlc3VsdC5ZO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vLyA8c3VtbWFyeT5cclxuXHRcdC8vLyBDcmVhdGVzIGEgbmV3IDxzZWUgY3JlZj1cIlJlY3RhbmdsZUZcIi8+IGZyb20gdHdvIHBvaW50cy5cclxuXHRcdC8vLyA8L3N1bW1hcnk+XHJcblx0XHQvLy8gPHBhcmFtIG5hbWU9XCJwb2ludDBcIj5UaGUgdG9wIGxlZnQgb3IgYm90dG9tIHJpZ2h0IGNvcm5lcjwvcGFyYW0+XHJcblx0XHQvLy8gPHBhcmFtIG5hbWU9XCJwb2ludDFcIj5UaGUgYm90dG9tIGxlZnQgb3IgdG9wIHJpZ2h0IGNvcm5lcjwvcGFyYW0+XHJcblx0XHQvLy8gPHJldHVybnM+PC9yZXR1cm5zPlxyXG5cdFx0cHVibGljIHN0YXRpYyBSZWN0YW5nbGVGIEZyb21Qb2ludHMoVmVjdG9yMiBwb2ludDAsIFZlY3RvcjIgcG9pbnQxKVxyXG5cdFx0e1xyXG5cdFx0XHR2YXIgeCA9IE1hdGguTWluKHBvaW50MC5YLCBwb2ludDEuWCk7XHJcblx0XHRcdHZhciB5ID0gTWF0aC5NaW4ocG9pbnQwLlksIHBvaW50MS5ZKTtcclxuXHRcdFx0dmFyIHdpZHRoID0gTWF0aC5BYnMocG9pbnQwLlggLSBwb2ludDEuWCk7XHJcblx0XHRcdHZhciBoZWlnaHQgPSBNYXRoLkFicyhwb2ludDAuWSAtIHBvaW50MS5ZKTtcclxuXHRcdFx0dmFyIHJlY3RhbmdsZSA9IG5ldyBSZWN0YW5nbGVGKHgsIHksIChmbG9hdCl3aWR0aCwgKGZsb2F0KWhlaWdodCk7XHJcblx0XHRcdHJldHVybiByZWN0YW5nbGU7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8vIDxzdW1tYXJ5PlxyXG5cdFx0Ly8vIENhbGN1bGF0ZXMgdGhlIHNpZ25lZCBkZXB0aCBvZiBpbnRlcnNlY3Rpb24gYmV0d2VlbiB0d28gcmVjdGFuZ2xlcy5cclxuXHRcdC8vLyA8L3N1bW1hcnk+XHJcblx0XHQvLy8gPHJldHVybnM+XHJcblx0XHQvLy8gVGhlIGFtb3VudCBvZiBvdmVybGFwIGJldHdlZW4gdHdvIGludGVyc2VjdGluZyByZWN0YW5nbGVzLiBUaGVzZVxyXG5cdFx0Ly8vIGRlcHRoIHZhbHVlcyBjYW4gYmUgbmVnYXRpdmUgZGVwZW5kaW5nIG9uIHdoaWNoIHdpZGVzIHRoZSByZWN0YW5nbGVzXHJcblx0XHQvLy8gaW50ZXJzZWN0LiBUaGlzIGFsbG93cyBjYWxsZXJzIHRvIGRldGVybWluZSB0aGUgY29ycmVjdCBkaXJlY3Rpb25cclxuXHRcdC8vLyB0byBwdXNoIG9iamVjdHMgaW4gb3JkZXIgdG8gcmVzb2x2ZSBjb2xsaXNpb25zLlxyXG5cdFx0Ly8vIElmIHRoZSByZWN0YW5nbGVzIGFyZSBub3QgaW50ZXJzZWN0aW5nLCBWZWN0b3IyLlplcm8gaXMgcmV0dXJuZWQuXHJcblx0XHQvLy8gPC9yZXR1cm5zPlxyXG5cdFx0cHVibGljIFZlY3RvcjIgSW50ZXJzZWN0aW9uRGVwdGgoUmVjdGFuZ2xlRiBvdGhlcilcclxuXHRcdHtcclxuXHRcdFx0Ly8gQ2FsY3VsYXRlIGhhbGYgc2l6ZXMuXHJcblx0XHRcdHZhciB0aGlzSGFsZldpZHRoID0gV2lkdGggLyAyLjBmO1xyXG5cdFx0XHR2YXIgdGhpc0hhbGZIZWlnaHQgPSBIZWlnaHQgLyAyLjBmO1xyXG5cdFx0XHR2YXIgb3RoZXJIYWxmV2lkdGggPSBvdGhlci5XaWR0aCAvIDIuMGY7XHJcblx0XHRcdHZhciBvdGhlckhhbGZIZWlnaHQgPSBvdGhlci5IZWlnaHQgLyAyLjBmO1xyXG5cclxuXHRcdFx0Ly8gQ2FsY3VsYXRlIGNlbnRlcnMuXHJcblx0XHRcdHZhciBjZW50ZXJBID0gbmV3IFZlY3RvcjIoTGVmdCArIHRoaXNIYWxmV2lkdGgsIFRvcCArIHRoaXNIYWxmSGVpZ2h0KTtcclxuXHRcdFx0dmFyIGNlbnRlckIgPSBuZXcgVmVjdG9yMihvdGhlci5MZWZ0ICsgb3RoZXJIYWxmV2lkdGgsIG90aGVyLlRvcCArIG90aGVySGFsZkhlaWdodCk7XHJcblxyXG5cdFx0XHQvLyBDYWxjdWxhdGUgY3VycmVudCBhbmQgbWluaW11bS1ub24taW50ZXJzZWN0aW5nIGRpc3RhbmNlcyBiZXR3ZWVuIGNlbnRlcnMuXHJcblx0XHRcdHZhciBkaXN0YW5jZVggPSBjZW50ZXJBLlggLSBjZW50ZXJCLlg7XHJcblx0XHRcdHZhciBkaXN0YW5jZVkgPSBjZW50ZXJBLlkgLSBjZW50ZXJCLlk7XHJcblx0XHRcdHZhciBtaW5EaXN0YW5jZVggPSB0aGlzSGFsZldpZHRoICsgb3RoZXJIYWxmV2lkdGg7XHJcblx0XHRcdHZhciBtaW5EaXN0YW5jZVkgPSB0aGlzSGFsZkhlaWdodCArIG90aGVySGFsZkhlaWdodDtcclxuXHJcblx0XHRcdC8vIElmIHdlIGFyZSBub3QgaW50ZXJzZWN0aW5nIGF0IGFsbCwgcmV0dXJuICgwLCAwKS5cclxuXHRcdFx0aWYgKE1hdGguQWJzKGRpc3RhbmNlWCkgPj0gbWluRGlzdGFuY2VYIHx8IE1hdGguQWJzKGRpc3RhbmNlWSkgPj0gbWluRGlzdGFuY2VZKVxyXG5cdFx0XHRcdHJldHVybiBWZWN0b3IyLlplcm87XHJcblxyXG5cdFx0XHQvLyBDYWxjdWxhdGUgYW5kIHJldHVybiBpbnRlcnNlY3Rpb24gZGVwdGhzLlxyXG5cdFx0XHR2YXIgZGVwdGhYID0gZGlzdGFuY2VYID4gMCA/IG1pbkRpc3RhbmNlWCAtIGRpc3RhbmNlWCA6IC1taW5EaXN0YW5jZVggLSBkaXN0YW5jZVg7XHJcblx0XHRcdHZhciBkZXB0aFkgPSBkaXN0YW5jZVkgPiAwID8gbWluRGlzdGFuY2VZIC0gZGlzdGFuY2VZIDogLW1pbkRpc3RhbmNlWSAtIGRpc3RhbmNlWTtcclxuXHRcdFx0cmV0dXJuIG5ldyBWZWN0b3IyKGRlcHRoWCwgZGVwdGhZKTtcclxuXHRcdH1cclxuXG5cdFxucHJpdmF0ZSBzdGF0aWMgUmVjdGFuZ2xlRiBfX1Byb3BlcnR5X19Jbml0aWFsaXplcl9fRW1wdHk9bmV3IFJlY3RhbmdsZUYoKTt9XHJcbn0iLCJcclxubmFtZXNwYWNlIEh1bXBlci5CYXNlXHJcbntcclxuXHR1c2luZyBTeXN0ZW07XHJcblx0dXNpbmcgU3lzdGVtLkRpYWdub3N0aWNzO1xyXG5cdHVzaW5nIFN5c3RlbS5SdW50aW1lLlNlcmlhbGl6YXRpb247XHJcblxyXG5cdC8vLyA8c3VtbWFyeT5cclxuXHQvLy8gRGVzY3JpYmVzIGEgMkQtdmVjdG9yLlxyXG5cdC8vLyA8L3N1bW1hcnk+XHJcblx0W0RhdGFDb250cmFjdF1cclxuXHRbRGVidWdnZXJEaXNwbGF5KFwie0RlYnVnRGlzcGxheVN0cmluZyxucX1cIildXHJcblx0cHVibGljIHN0cnVjdCBWZWN0b3IyIDogSUVxdWF0YWJsZTxWZWN0b3IyPlxyXG5cdHtcclxuXHRcdCNyZWdpb24gUHJpdmF0ZSBGaWVsZHNcclxuXHJcblx0XHRwcml2YXRlIHN0YXRpYyByZWFkb25seSBWZWN0b3IyIHplcm9WZWN0b3IgPSBuZXcgVmVjdG9yMigwZiwgMGYpO1xyXG5cdFx0cHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgVmVjdG9yMiB1bml0VmVjdG9yID0gbmV3IFZlY3RvcjIoMWYsIDFmKTtcclxuXHRcdHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IFZlY3RvcjIgdW5pdFhWZWN0b3IgPSBuZXcgVmVjdG9yMigxZiwgMGYpO1xyXG5cdFx0cHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgVmVjdG9yMiB1bml0WVZlY3RvciA9IG5ldyBWZWN0b3IyKDBmLCAxZik7XHJcblxyXG5cdFx0I2VuZHJlZ2lvblxyXG5cclxuXHRcdCNyZWdpb24gUHVibGljIEZpZWxkc1xyXG5cclxuXHRcdC8vLyA8c3VtbWFyeT5cclxuXHRcdC8vLyBUaGUgeCBjb29yZGluYXRlIG9mIHRoaXMgPHNlZSBjcmVmPVwiVmVjdG9yMlwiLz4uXHJcblx0XHQvLy8gPC9zdW1tYXJ5PlxyXG5cdFx0W0RhdGFNZW1iZXJdXHJcblx0XHRwdWJsaWMgZmxvYXQgWDtcclxuXHJcblx0XHQvLy8gPHN1bW1hcnk+XHJcblx0XHQvLy8gVGhlIHkgY29vcmRpbmF0ZSBvZiB0aGlzIDxzZWUgY3JlZj1cIlZlY3RvcjJcIi8+LlxyXG5cdFx0Ly8vIDwvc3VtbWFyeT5cclxuXHRcdFtEYXRhTWVtYmVyXVxyXG5cdFx0cHVibGljIGZsb2F0IFk7XHJcblxyXG5cdFx0I2VuZHJlZ2lvblxyXG5cclxuXHRcdCNyZWdpb24gUHJvcGVydGllc1xyXG5cclxuXHRcdC8vLyA8c3VtbWFyeT5cclxuXHRcdC8vLyBSZXR1cm5zIGEgPHNlZSBjcmVmPVwiVmVjdG9yMlwiLz4gd2l0aCBjb21wb25lbnRzIDAsIDAuXHJcblx0XHQvLy8gPC9zdW1tYXJ5PlxyXG5cdFx0cHVibGljIHN0YXRpYyBWZWN0b3IyIFplcm9cclxuXHRcdHtcclxuXHRcdFx0Z2V0IHsgcmV0dXJuIHplcm9WZWN0b3I7IH1cclxuXHRcdH1cclxuXHJcblx0XHQvLy8gPHN1bW1hcnk+XHJcblx0XHQvLy8gUmV0dXJucyBhIDxzZWUgY3JlZj1cIlZlY3RvcjJcIi8+IHdpdGggY29tcG9uZW50cyAxLCAxLlxyXG5cdFx0Ly8vIDwvc3VtbWFyeT5cclxuXHRcdHB1YmxpYyBzdGF0aWMgVmVjdG9yMiBPbmVcclxuXHRcdHtcclxuXHRcdFx0Z2V0IHsgcmV0dXJuIHVuaXRWZWN0b3I7IH1cclxuXHRcdH1cclxuXHJcblx0XHQvLy8gPHN1bW1hcnk+XHJcblx0XHQvLy8gUmV0dXJucyBhIDxzZWUgY3JlZj1cIlZlY3RvcjJcIi8+IHdpdGggY29tcG9uZW50cyAxLCAwLlxyXG5cdFx0Ly8vIDwvc3VtbWFyeT5cclxuXHRcdHB1YmxpYyBzdGF0aWMgVmVjdG9yMiBVbml0WFxyXG5cdFx0e1xyXG5cdFx0XHRnZXQgeyByZXR1cm4gdW5pdFhWZWN0b3I7IH1cclxuXHRcdH1cclxuXHJcblx0XHQvLy8gPHN1bW1hcnk+XHJcblx0XHQvLy8gUmV0dXJucyBhIDxzZWUgY3JlZj1cIlZlY3RvcjJcIi8+IHdpdGggY29tcG9uZW50cyAwLCAxLlxyXG5cdFx0Ly8vIDwvc3VtbWFyeT5cclxuXHRcdHB1YmxpYyBzdGF0aWMgVmVjdG9yMiBVbml0WVxyXG5cdFx0e1xyXG5cdFx0XHRnZXQgeyByZXR1cm4gdW5pdFlWZWN0b3I7IH1cclxuXHRcdH1cclxuXHJcblx0XHQjZW5kcmVnaW9uXHJcblxyXG5cdFx0I3JlZ2lvbiBJbnRlcm5hbCBQcm9wZXJ0aWVzXHJcblxyXG5cdFx0aW50ZXJuYWwgc3RyaW5nIERlYnVnRGlzcGxheVN0cmluZ1xyXG5cdFx0e1xyXG5cdFx0XHRnZXRcclxuXHRcdFx0e1xyXG5cdFx0XHRcdHJldHVybiBzdHJpbmcuQ29uY2F0KFxyXG5cdFx0XHRcdFx0dGhpcy5YLlRvU3RyaW5nKCksIFwiICBcIixcclxuXHRcdFx0XHRcdHRoaXMuWS5Ub1N0cmluZygpXHJcblx0XHRcdFx0KTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdCNlbmRyZWdpb25cclxuXHJcblx0XHQjcmVnaW9uIENvbnN0cnVjdG9yc1xyXG5cclxuXHRcdC8vLyA8c3VtbWFyeT5cclxuXHRcdC8vLyBDb25zdHJ1Y3RzIGEgMmQgdmVjdG9yIHdpdGggWCBhbmQgWSBmcm9tIHR3byB2YWx1ZXMuXHJcblx0XHQvLy8gPC9zdW1tYXJ5PlxyXG5cdFx0Ly8vIDxwYXJhbSBuYW1lPVwieFwiPlRoZSB4IGNvb3JkaW5hdGUgaW4gMmQtc3BhY2UuPC9wYXJhbT5cclxuXHRcdC8vLyA8cGFyYW0gbmFtZT1cInlcIj5UaGUgeSBjb29yZGluYXRlIGluIDJkLXNwYWNlLjwvcGFyYW0+XHJcblx0XHRwdWJsaWMgVmVjdG9yMihmbG9hdCB4LCBmbG9hdCB5KVxyXG5cdFx0e1xyXG5cdFx0XHR0aGlzLlggPSB4O1xyXG5cdFx0XHR0aGlzLlkgPSB5O1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vLyA8c3VtbWFyeT5cclxuXHRcdC8vLyBDb25zdHJ1Y3RzIGEgMmQgdmVjdG9yIHdpdGggWCBhbmQgWSBzZXQgdG8gdGhlIHNhbWUgdmFsdWUuXHJcblx0XHQvLy8gPC9zdW1tYXJ5PlxyXG5cdFx0Ly8vIDxwYXJhbSBuYW1lPVwidmFsdWVcIj5UaGUgeCBhbmQgeSBjb29yZGluYXRlcyBpbiAyZC1zcGFjZS48L3BhcmFtPlxyXG5cdFx0cHVibGljIFZlY3RvcjIoZmxvYXQgdmFsdWUpXHJcblx0XHR7XHJcblx0XHRcdHRoaXMuWCA9IHZhbHVlO1xyXG5cdFx0XHR0aGlzLlkgPSB2YWx1ZTtcclxuXHRcdH1cclxuXHJcblx0XHQjZW5kcmVnaW9uXHJcblxyXG5cdFx0I3JlZ2lvbiBPcGVyYXRvcnNcclxuXHJcblx0XHQvLy8gPHN1bW1hcnk+XHJcblx0XHQvLy8gSW52ZXJ0cyB2YWx1ZXMgaW4gdGhlIHNwZWNpZmllZCA8c2VlIGNyZWY9XCJWZWN0b3IyXCIvPi5cclxuXHRcdC8vLyA8L3N1bW1hcnk+XHJcblx0XHQvLy8gPHBhcmFtIG5hbWU9XCJ2YWx1ZVwiPlNvdXJjZSA8c2VlIGNyZWY9XCJWZWN0b3IyXCIvPiBvbiB0aGUgcmlnaHQgb2YgdGhlIHN1YiBzaWduLjwvcGFyYW0+XHJcblx0XHQvLy8gPHJldHVybnM+UmVzdWx0IG9mIHRoZSBpbnZlcnNpb24uPC9yZXR1cm5zPlxyXG5cdFx0cHVibGljIHN0YXRpYyBWZWN0b3IyIG9wZXJhdG9yIC0oVmVjdG9yMiB2YWx1ZSlcclxuXHRcdHtcclxuXHRcdFx0dmFsdWUuWCA9IC12YWx1ZS5YO1xyXG5cdFx0XHR2YWx1ZS5ZID0gLXZhbHVlLlk7XHJcblx0XHRcdHJldHVybiB2YWx1ZTtcclxuXHRcdH1cclxuXHJcblx0XHQvLy8gPHN1bW1hcnk+XHJcblx0XHQvLy8gQWRkcyB0d28gdmVjdG9ycy5cclxuXHRcdC8vLyA8L3N1bW1hcnk+XHJcblx0XHQvLy8gPHBhcmFtIG5hbWU9XCJ2YWx1ZTFcIj5Tb3VyY2UgPHNlZSBjcmVmPVwiVmVjdG9yMlwiLz4gb24gdGhlIGxlZnQgb2YgdGhlIGFkZCBzaWduLjwvcGFyYW0+XHJcblx0XHQvLy8gPHBhcmFtIG5hbWU9XCJ2YWx1ZTJcIj5Tb3VyY2UgPHNlZSBjcmVmPVwiVmVjdG9yMlwiLz4gb24gdGhlIHJpZ2h0IG9mIHRoZSBhZGQgc2lnbi48L3BhcmFtPlxyXG5cdFx0Ly8vIDxyZXR1cm5zPlN1bSBvZiB0aGUgdmVjdG9ycy48L3JldHVybnM+XHJcblx0XHRwdWJsaWMgc3RhdGljIFZlY3RvcjIgb3BlcmF0b3IgKyhWZWN0b3IyIHZhbHVlMSwgVmVjdG9yMiB2YWx1ZTIpXHJcblx0XHR7XHJcblx0XHRcdHZhbHVlMS5YICs9IHZhbHVlMi5YO1xyXG5cdFx0XHR2YWx1ZTEuWSArPSB2YWx1ZTIuWTtcclxuXHRcdFx0cmV0dXJuIHZhbHVlMTtcclxuXHRcdH1cclxuXHJcblx0XHQvLy8gPHN1bW1hcnk+XHJcblx0XHQvLy8gU3VidHJhY3RzIGEgPHNlZSBjcmVmPVwiVmVjdG9yMlwiLz4gZnJvbSBhIDxzZWUgY3JlZj1cIlZlY3RvcjJcIi8+LlxyXG5cdFx0Ly8vIDwvc3VtbWFyeT5cclxuXHRcdC8vLyA8cGFyYW0gbmFtZT1cInZhbHVlMVwiPlNvdXJjZSA8c2VlIGNyZWY9XCJWZWN0b3IyXCIvPiBvbiB0aGUgbGVmdCBvZiB0aGUgc3ViIHNpZ24uPC9wYXJhbT5cclxuXHRcdC8vLyA8cGFyYW0gbmFtZT1cInZhbHVlMlwiPlNvdXJjZSA8c2VlIGNyZWY9XCJWZWN0b3IyXCIvPiBvbiB0aGUgcmlnaHQgb2YgdGhlIHN1YiBzaWduLjwvcGFyYW0+XHJcblx0XHQvLy8gPHJldHVybnM+UmVzdWx0IG9mIHRoZSB2ZWN0b3Igc3VidHJhY3Rpb24uPC9yZXR1cm5zPlxyXG5cdFx0cHVibGljIHN0YXRpYyBWZWN0b3IyIG9wZXJhdG9yIC0oVmVjdG9yMiB2YWx1ZTEsIFZlY3RvcjIgdmFsdWUyKVxyXG5cdFx0e1xyXG5cdFx0XHR2YWx1ZTEuWCAtPSB2YWx1ZTIuWDtcclxuXHRcdFx0dmFsdWUxLlkgLT0gdmFsdWUyLlk7XHJcblx0XHRcdHJldHVybiB2YWx1ZTE7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8vIDxzdW1tYXJ5PlxyXG5cdFx0Ly8vIE11bHRpcGxpZXMgdGhlIGNvbXBvbmVudHMgb2YgdHdvIHZlY3RvcnMgYnkgZWFjaCBvdGhlci5cclxuXHRcdC8vLyA8L3N1bW1hcnk+XHJcblx0XHQvLy8gPHBhcmFtIG5hbWU9XCJ2YWx1ZTFcIj5Tb3VyY2UgPHNlZSBjcmVmPVwiVmVjdG9yMlwiLz4gb24gdGhlIGxlZnQgb2YgdGhlIG11bCBzaWduLjwvcGFyYW0+XHJcblx0XHQvLy8gPHBhcmFtIG5hbWU9XCJ2YWx1ZTJcIj5Tb3VyY2UgPHNlZSBjcmVmPVwiVmVjdG9yMlwiLz4gb24gdGhlIHJpZ2h0IG9mIHRoZSBtdWwgc2lnbi48L3BhcmFtPlxyXG5cdFx0Ly8vIDxyZXR1cm5zPlJlc3VsdCBvZiB0aGUgdmVjdG9yIG11bHRpcGxpY2F0aW9uLjwvcmV0dXJucz5cclxuXHRcdHB1YmxpYyBzdGF0aWMgVmVjdG9yMiBvcGVyYXRvciAqKFZlY3RvcjIgdmFsdWUxLCBWZWN0b3IyIHZhbHVlMilcclxuXHRcdHtcclxuXHRcdFx0dmFsdWUxLlggKj0gdmFsdWUyLlg7XHJcblx0XHRcdHZhbHVlMS5ZICo9IHZhbHVlMi5ZO1xyXG5cdFx0XHRyZXR1cm4gdmFsdWUxO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vLyA8c3VtbWFyeT5cclxuXHRcdC8vLyBNdWx0aXBsaWVzIHRoZSBjb21wb25lbnRzIG9mIHZlY3RvciBieSBhIHNjYWxhci5cclxuXHRcdC8vLyA8L3N1bW1hcnk+XHJcblx0XHQvLy8gPHBhcmFtIG5hbWU9XCJ2YWx1ZVwiPlNvdXJjZSA8c2VlIGNyZWY9XCJWZWN0b3IyXCIvPiBvbiB0aGUgbGVmdCBvZiB0aGUgbXVsIHNpZ24uPC9wYXJhbT5cclxuXHRcdC8vLyA8cGFyYW0gbmFtZT1cInNjYWxlRmFjdG9yXCI+U2NhbGFyIHZhbHVlIG9uIHRoZSByaWdodCBvZiB0aGUgbXVsIHNpZ24uPC9wYXJhbT5cclxuXHRcdC8vLyA8cmV0dXJucz5SZXN1bHQgb2YgdGhlIHZlY3RvciBtdWx0aXBsaWNhdGlvbiB3aXRoIGEgc2NhbGFyLjwvcmV0dXJucz5cclxuXHRcdHB1YmxpYyBzdGF0aWMgVmVjdG9yMiBvcGVyYXRvciAqKFZlY3RvcjIgdmFsdWUsIGZsb2F0IHNjYWxlRmFjdG9yKVxyXG5cdFx0e1xyXG5cdFx0XHR2YWx1ZS5YICo9IHNjYWxlRmFjdG9yO1xyXG5cdFx0XHR2YWx1ZS5ZICo9IHNjYWxlRmFjdG9yO1xyXG5cdFx0XHRyZXR1cm4gdmFsdWU7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8vIDxzdW1tYXJ5PlxyXG5cdFx0Ly8vIE11bHRpcGxpZXMgdGhlIGNvbXBvbmVudHMgb2YgdmVjdG9yIGJ5IGEgc2NhbGFyLlxyXG5cdFx0Ly8vIDwvc3VtbWFyeT5cclxuXHRcdC8vLyA8cGFyYW0gbmFtZT1cInNjYWxlRmFjdG9yXCI+U2NhbGFyIHZhbHVlIG9uIHRoZSBsZWZ0IG9mIHRoZSBtdWwgc2lnbi48L3BhcmFtPlxyXG5cdFx0Ly8vIDxwYXJhbSBuYW1lPVwidmFsdWVcIj5Tb3VyY2UgPHNlZSBjcmVmPVwiVmVjdG9yMlwiLz4gb24gdGhlIHJpZ2h0IG9mIHRoZSBtdWwgc2lnbi48L3BhcmFtPlxyXG5cdFx0Ly8vIDxyZXR1cm5zPlJlc3VsdCBvZiB0aGUgdmVjdG9yIG11bHRpcGxpY2F0aW9uIHdpdGggYSBzY2FsYXIuPC9yZXR1cm5zPlxyXG5cdFx0cHVibGljIHN0YXRpYyBWZWN0b3IyIG9wZXJhdG9yICooZmxvYXQgc2NhbGVGYWN0b3IsIFZlY3RvcjIgdmFsdWUpXHJcblx0XHR7XHJcblx0XHRcdHZhbHVlLlggKj0gc2NhbGVGYWN0b3I7XHJcblx0XHRcdHZhbHVlLlkgKj0gc2NhbGVGYWN0b3I7XHJcblx0XHRcdHJldHVybiB2YWx1ZTtcclxuXHRcdH1cclxuXHJcblx0XHQvLy8gPHN1bW1hcnk+XHJcblx0XHQvLy8gRGl2aWRlcyB0aGUgY29tcG9uZW50cyBvZiBhIDxzZWUgY3JlZj1cIlZlY3RvcjJcIi8+IGJ5IHRoZSBjb21wb25lbnRzIG9mIGFub3RoZXIgPHNlZSBjcmVmPVwiVmVjdG9yMlwiLz4uXHJcblx0XHQvLy8gPC9zdW1tYXJ5PlxyXG5cdFx0Ly8vIDxwYXJhbSBuYW1lPVwidmFsdWUxXCI+U291cmNlIDxzZWUgY3JlZj1cIlZlY3RvcjJcIi8+IG9uIHRoZSBsZWZ0IG9mIHRoZSBkaXYgc2lnbi48L3BhcmFtPlxyXG5cdFx0Ly8vIDxwYXJhbSBuYW1lPVwidmFsdWUyXCI+RGl2aXNvciA8c2VlIGNyZWY9XCJWZWN0b3IyXCIvPiBvbiB0aGUgcmlnaHQgb2YgdGhlIGRpdiBzaWduLjwvcGFyYW0+XHJcblx0XHQvLy8gPHJldHVybnM+VGhlIHJlc3VsdCBvZiBkaXZpZGluZyB0aGUgdmVjdG9ycy48L3JldHVybnM+XHJcblx0XHRwdWJsaWMgc3RhdGljIFZlY3RvcjIgb3BlcmF0b3IgLyhWZWN0b3IyIHZhbHVlMSwgVmVjdG9yMiB2YWx1ZTIpXHJcblx0XHR7XHJcblx0XHRcdHZhbHVlMS5YIC89IHZhbHVlMi5YO1xyXG5cdFx0XHR2YWx1ZTEuWSAvPSB2YWx1ZTIuWTtcclxuXHRcdFx0cmV0dXJuIHZhbHVlMTtcclxuXHRcdH1cclxuXHJcblx0XHQvLy8gPHN1bW1hcnk+XHJcblx0XHQvLy8gRGl2aWRlcyB0aGUgY29tcG9uZW50cyBvZiBhIDxzZWUgY3JlZj1cIlZlY3RvcjJcIi8+IGJ5IGEgc2NhbGFyLlxyXG5cdFx0Ly8vIDwvc3VtbWFyeT5cclxuXHRcdC8vLyA8cGFyYW0gbmFtZT1cInZhbHVlMVwiPlNvdXJjZSA8c2VlIGNyZWY9XCJWZWN0b3IyXCIvPiBvbiB0aGUgbGVmdCBvZiB0aGUgZGl2IHNpZ24uPC9wYXJhbT5cclxuXHRcdC8vLyA8cGFyYW0gbmFtZT1cImRpdmlkZXJcIj5EaXZpc29yIHNjYWxhciBvbiB0aGUgcmlnaHQgb2YgdGhlIGRpdiBzaWduLjwvcGFyYW0+XHJcblx0XHQvLy8gPHJldHVybnM+VGhlIHJlc3VsdCBvZiBkaXZpZGluZyBhIHZlY3RvciBieSBhIHNjYWxhci48L3JldHVybnM+XHJcblx0XHRwdWJsaWMgc3RhdGljIFZlY3RvcjIgb3BlcmF0b3IgLyhWZWN0b3IyIHZhbHVlMSwgZmxvYXQgZGl2aWRlcilcclxuXHRcdHtcclxuXHRcdFx0ZmxvYXQgZmFjdG9yID0gMSAvIGRpdmlkZXI7XHJcblx0XHRcdHZhbHVlMS5YICo9IGZhY3RvcjtcclxuXHRcdFx0dmFsdWUxLlkgKj0gZmFjdG9yO1xyXG5cdFx0XHRyZXR1cm4gdmFsdWUxO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vLyA8c3VtbWFyeT5cclxuXHRcdC8vLyBDb21wYXJlcyB3aGV0aGVyIHR3byA8c2VlIGNyZWY9XCJWZWN0b3IyXCIvPiBpbnN0YW5jZXMgYXJlIGVxdWFsLlxyXG5cdFx0Ly8vIDwvc3VtbWFyeT5cclxuXHRcdC8vLyA8cGFyYW0gbmFtZT1cInZhbHVlMVwiPjxzZWUgY3JlZj1cIlZlY3RvcjJcIi8+IGluc3RhbmNlIG9uIHRoZSBsZWZ0IG9mIHRoZSBlcXVhbCBzaWduLjwvcGFyYW0+XHJcblx0XHQvLy8gPHBhcmFtIG5hbWU9XCJ2YWx1ZTJcIj48c2VlIGNyZWY9XCJWZWN0b3IyXCIvPiBpbnN0YW5jZSBvbiB0aGUgcmlnaHQgb2YgdGhlIGVxdWFsIHNpZ24uPC9wYXJhbT5cclxuXHRcdC8vLyA8cmV0dXJucz48Yz50cnVlPC9jPiBpZiB0aGUgaW5zdGFuY2VzIGFyZSBlcXVhbDsgPGM+ZmFsc2U8L2M+IG90aGVyd2lzZS48L3JldHVybnM+XHJcblx0XHRwdWJsaWMgc3RhdGljIGJvb2wgb3BlcmF0b3IgPT0oVmVjdG9yMiB2YWx1ZTEsIFZlY3RvcjIgdmFsdWUyKVxyXG5cdFx0e1xyXG5cdFx0XHRyZXR1cm4gdmFsdWUxLlggPT0gdmFsdWUyLlggJiYgdmFsdWUxLlkgPT0gdmFsdWUyLlk7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8vIDxzdW1tYXJ5PlxyXG5cdFx0Ly8vIENvbXBhcmVzIHdoZXRoZXIgdHdvIDxzZWUgY3JlZj1cIlZlY3RvcjJcIi8+IGluc3RhbmNlcyBhcmUgbm90IGVxdWFsLlxyXG5cdFx0Ly8vIDwvc3VtbWFyeT5cclxuXHRcdC8vLyA8cGFyYW0gbmFtZT1cInZhbHVlMVwiPjxzZWUgY3JlZj1cIlZlY3RvcjJcIi8+IGluc3RhbmNlIG9uIHRoZSBsZWZ0IG9mIHRoZSBub3QgZXF1YWwgc2lnbi48L3BhcmFtPlxyXG5cdFx0Ly8vIDxwYXJhbSBuYW1lPVwidmFsdWUyXCI+PHNlZSBjcmVmPVwiVmVjdG9yMlwiLz4gaW5zdGFuY2Ugb24gdGhlIHJpZ2h0IG9mIHRoZSBub3QgZXF1YWwgc2lnbi48L3BhcmFtPlxyXG5cdFx0Ly8vIDxyZXR1cm5zPjxjPnRydWU8L2M+IGlmIHRoZSBpbnN0YW5jZXMgYXJlIG5vdCBlcXVhbDsgPGM+ZmFsc2U8L2M+IG90aGVyd2lzZS48L3JldHVybnM+XHRcclxuXHRcdHB1YmxpYyBzdGF0aWMgYm9vbCBvcGVyYXRvciAhPShWZWN0b3IyIHZhbHVlMSwgVmVjdG9yMiB2YWx1ZTIpXHJcblx0XHR7XHJcblx0XHRcdHJldHVybiB2YWx1ZTEuWCAhPSB2YWx1ZTIuWCB8fCB2YWx1ZTEuWSAhPSB2YWx1ZTIuWTtcclxuXHRcdH1cclxuXHJcblx0XHQjZW5kcmVnaW9uXHJcblxyXG5cdFx0I3JlZ2lvbiBQdWJsaWMgTWV0aG9kc1xyXG5cclxuXHRcdC8vLyA8c3VtbWFyeT5cclxuXHRcdC8vLyBQZXJmb3JtcyB2ZWN0b3IgYWRkaXRpb24gb24gPHBhcmFtcmVmIG5hbWU9XCJ2YWx1ZTFcIi8+IGFuZCA8cGFyYW1yZWYgbmFtZT1cInZhbHVlMlwiLz4uXHJcblx0XHQvLy8gPC9zdW1tYXJ5PlxyXG5cdFx0Ly8vIDxwYXJhbSBuYW1lPVwidmFsdWUxXCI+VGhlIGZpcnN0IHZlY3RvciB0byBhZGQuPC9wYXJhbT5cclxuXHRcdC8vLyA8cGFyYW0gbmFtZT1cInZhbHVlMlwiPlRoZSBzZWNvbmQgdmVjdG9yIHRvIGFkZC48L3BhcmFtPlxyXG5cdFx0Ly8vIDxyZXR1cm5zPlRoZSByZXN1bHQgb2YgdGhlIHZlY3RvciBhZGRpdGlvbi48L3JldHVybnM+XHJcblx0XHRwdWJsaWMgc3RhdGljIFZlY3RvcjIgQWRkKFZlY3RvcjIgdmFsdWUxLCBWZWN0b3IyIHZhbHVlMilcclxuXHRcdHtcclxuXHRcdFx0dmFsdWUxLlggKz0gdmFsdWUyLlg7XHJcblx0XHRcdHZhbHVlMS5ZICs9IHZhbHVlMi5ZO1xyXG5cdFx0XHRyZXR1cm4gdmFsdWUxO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vLyA8c3VtbWFyeT5cclxuXHRcdC8vLyBQZXJmb3JtcyB2ZWN0b3IgYWRkaXRpb24gb24gPHBhcmFtcmVmIG5hbWU9XCJ2YWx1ZTFcIi8+IGFuZFxyXG5cdFx0Ly8vIDxwYXJhbXJlZiBuYW1lPVwidmFsdWUyXCIvPiwgc3RvcmluZyB0aGUgcmVzdWx0IG9mIHRoZVxyXG5cdFx0Ly8vIGFkZGl0aW9uIGluIDxwYXJhbXJlZiBuYW1lPVwicmVzdWx0XCIvPi5cclxuXHRcdC8vLyA8L3N1bW1hcnk+XHJcblx0XHQvLy8gPHBhcmFtIG5hbWU9XCJ2YWx1ZTFcIj5UaGUgZmlyc3QgdmVjdG9yIHRvIGFkZC48L3BhcmFtPlxyXG5cdFx0Ly8vIDxwYXJhbSBuYW1lPVwidmFsdWUyXCI+VGhlIHNlY29uZCB2ZWN0b3IgdG8gYWRkLjwvcGFyYW0+XHJcblx0XHQvLy8gPHBhcmFtIG5hbWU9XCJyZXN1bHRcIj5UaGUgcmVzdWx0IG9mIHRoZSB2ZWN0b3IgYWRkaXRpb24uPC9wYXJhbT5cclxuXHRcdHB1YmxpYyBzdGF0aWMgdm9pZCBBZGQocmVmIFZlY3RvcjIgdmFsdWUxLCByZWYgVmVjdG9yMiB2YWx1ZTIsIG91dCBWZWN0b3IyIHJlc3VsdClcclxuXHRcdHtcclxuXHRcdFx0cmVzdWx0LlggPSB2YWx1ZTEuWCArIHZhbHVlMi5YO1xyXG5cdFx0XHRyZXN1bHQuWSA9IHZhbHVlMS5ZICsgdmFsdWUyLlk7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8vIDxzdW1tYXJ5PlxyXG5cdFx0Ly8vIENyZWF0ZXMgYSBuZXcgPHNlZSBjcmVmPVwiVmVjdG9yMlwiLz4gdGhhdCBjb250YWlucyB0aGUgY2FydGVzaWFuIGNvb3JkaW5hdGVzIG9mIGEgdmVjdG9yIHNwZWNpZmllZCBpbiBiYXJ5Y2VudHJpYyBjb29yZGluYXRlcyBhbmQgcmVsYXRpdmUgdG8gMmQtdHJpYW5nbGUuXHJcblx0XHQvLy8gPC9zdW1tYXJ5PlxyXG5cdFx0Ly8vIDxwYXJhbSBuYW1lPVwidmFsdWUxXCI+VGhlIGZpcnN0IHZlY3RvciBvZiAyZC10cmlhbmdsZS48L3BhcmFtPlxyXG5cdFx0Ly8vIDxwYXJhbSBuYW1lPVwidmFsdWUyXCI+VGhlIHNlY29uZCB2ZWN0b3Igb2YgMmQtdHJpYW5nbGUuPC9wYXJhbT5cclxuXHRcdC8vLyA8cGFyYW0gbmFtZT1cInZhbHVlM1wiPlRoZSB0aGlyZCB2ZWN0b3Igb2YgMmQtdHJpYW5nbGUuPC9wYXJhbT5cclxuXHRcdC8vLyA8cGFyYW0gbmFtZT1cImFtb3VudDFcIj5CYXJ5Y2VudHJpYyBzY2FsYXIgPGM+YjI8L2M+IHdoaWNoIHJlcHJlc2VudHMgYSB3ZWlnaHRpbmcgZmFjdG9yIHRvd2FyZHMgc2Vjb25kIHZlY3RvciBvZiAyZC10cmlhbmdsZS48L3BhcmFtPlxyXG5cdFx0Ly8vIDxwYXJhbSBuYW1lPVwiYW1vdW50MlwiPkJhcnljZW50cmljIHNjYWxhciA8Yz5iMzwvYz4gd2hpY2ggcmVwcmVzZW50cyBhIHdlaWdodGluZyBmYWN0b3IgdG93YXJkcyB0aGlyZCB2ZWN0b3Igb2YgMmQtdHJpYW5nbGUuPC9wYXJhbT5cclxuXHRcdC8vLyA8cmV0dXJucz5UaGUgY2FydGVzaWFuIHRyYW5zbGF0aW9uIG9mIGJhcnljZW50cmljIGNvb3JkaW5hdGVzLjwvcmV0dXJucz5cclxuXHRcdHB1YmxpYyBzdGF0aWMgVmVjdG9yMiBCYXJ5Y2VudHJpYyhWZWN0b3IyIHZhbHVlMSwgVmVjdG9yMiB2YWx1ZTIsIFZlY3RvcjIgdmFsdWUzLCBmbG9hdCBhbW91bnQxLCBmbG9hdCBhbW91bnQyKVxyXG5cdFx0e1xyXG5cdFx0XHRyZXR1cm4gbmV3IFZlY3RvcjIoXHJcblx0XHRcdFx0TWF0aHMuQmFyeWNlbnRyaWModmFsdWUxLlgsIHZhbHVlMi5YLCB2YWx1ZTMuWCwgYW1vdW50MSwgYW1vdW50MiksXHJcblx0XHRcdFx0TWF0aHMuQmFyeWNlbnRyaWModmFsdWUxLlksIHZhbHVlMi5ZLCB2YWx1ZTMuWSwgYW1vdW50MSwgYW1vdW50MikpO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vLyA8c3VtbWFyeT5cclxuXHRcdC8vLyBDcmVhdGVzIGEgbmV3IDxzZWUgY3JlZj1cIlZlY3RvcjJcIi8+IHRoYXQgY29udGFpbnMgdGhlIGNhcnRlc2lhbiBjb29yZGluYXRlcyBvZiBhIHZlY3RvciBzcGVjaWZpZWQgaW4gYmFyeWNlbnRyaWMgY29vcmRpbmF0ZXMgYW5kIHJlbGF0aXZlIHRvIDJkLXRyaWFuZ2xlLlxyXG5cdFx0Ly8vIDwvc3VtbWFyeT5cclxuXHRcdC8vLyA8cGFyYW0gbmFtZT1cInZhbHVlMVwiPlRoZSBmaXJzdCB2ZWN0b3Igb2YgMmQtdHJpYW5nbGUuPC9wYXJhbT5cclxuXHRcdC8vLyA8cGFyYW0gbmFtZT1cInZhbHVlMlwiPlRoZSBzZWNvbmQgdmVjdG9yIG9mIDJkLXRyaWFuZ2xlLjwvcGFyYW0+XHJcblx0XHQvLy8gPHBhcmFtIG5hbWU9XCJ2YWx1ZTNcIj5UaGUgdGhpcmQgdmVjdG9yIG9mIDJkLXRyaWFuZ2xlLjwvcGFyYW0+XHJcblx0XHQvLy8gPHBhcmFtIG5hbWU9XCJhbW91bnQxXCI+QmFyeWNlbnRyaWMgc2NhbGFyIDxjPmIyPC9jPiB3aGljaCByZXByZXNlbnRzIGEgd2VpZ2h0aW5nIGZhY3RvciB0b3dhcmRzIHNlY29uZCB2ZWN0b3Igb2YgMmQtdHJpYW5nbGUuPC9wYXJhbT5cclxuXHRcdC8vLyA8cGFyYW0gbmFtZT1cImFtb3VudDJcIj5CYXJ5Y2VudHJpYyBzY2FsYXIgPGM+YjM8L2M+IHdoaWNoIHJlcHJlc2VudHMgYSB3ZWlnaHRpbmcgZmFjdG9yIHRvd2FyZHMgdGhpcmQgdmVjdG9yIG9mIDJkLXRyaWFuZ2xlLjwvcGFyYW0+XHJcblx0XHQvLy8gPHBhcmFtIG5hbWU9XCJyZXN1bHRcIj5UaGUgY2FydGVzaWFuIHRyYW5zbGF0aW9uIG9mIGJhcnljZW50cmljIGNvb3JkaW5hdGVzIGFzIGFuIG91dHB1dCBwYXJhbWV0ZXIuPC9wYXJhbT5cclxuXHRcdHB1YmxpYyBzdGF0aWMgdm9pZCBCYXJ5Y2VudHJpYyhyZWYgVmVjdG9yMiB2YWx1ZTEsIHJlZiBWZWN0b3IyIHZhbHVlMiwgcmVmIFZlY3RvcjIgdmFsdWUzLCBmbG9hdCBhbW91bnQxLCBmbG9hdCBhbW91bnQyLCBvdXQgVmVjdG9yMiByZXN1bHQpXHJcblx0XHR7XHJcblx0XHRcdHJlc3VsdC5YID0gTWF0aHMuQmFyeWNlbnRyaWModmFsdWUxLlgsIHZhbHVlMi5YLCB2YWx1ZTMuWCwgYW1vdW50MSwgYW1vdW50Mik7XHJcblx0XHRcdHJlc3VsdC5ZID0gTWF0aHMuQmFyeWNlbnRyaWModmFsdWUxLlksIHZhbHVlMi5ZLCB2YWx1ZTMuWSwgYW1vdW50MSwgYW1vdW50Mik7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8vIDxzdW1tYXJ5PlxyXG5cdFx0Ly8vIENyZWF0ZXMgYSBuZXcgPHNlZSBjcmVmPVwiVmVjdG9yMlwiLz4gdGhhdCBjb250YWlucyBDYXRtdWxsUm9tIGludGVycG9sYXRpb24gb2YgdGhlIHNwZWNpZmllZCB2ZWN0b3JzLlxyXG5cdFx0Ly8vIDwvc3VtbWFyeT5cclxuXHRcdC8vLyA8cGFyYW0gbmFtZT1cInZhbHVlMVwiPlRoZSBmaXJzdCB2ZWN0b3IgaW4gaW50ZXJwb2xhdGlvbi48L3BhcmFtPlxyXG5cdFx0Ly8vIDxwYXJhbSBuYW1lPVwidmFsdWUyXCI+VGhlIHNlY29uZCB2ZWN0b3IgaW4gaW50ZXJwb2xhdGlvbi48L3BhcmFtPlxyXG5cdFx0Ly8vIDxwYXJhbSBuYW1lPVwidmFsdWUzXCI+VGhlIHRoaXJkIHZlY3RvciBpbiBpbnRlcnBvbGF0aW9uLjwvcGFyYW0+XHJcblx0XHQvLy8gPHBhcmFtIG5hbWU9XCJ2YWx1ZTRcIj5UaGUgZm91cnRoIHZlY3RvciBpbiBpbnRlcnBvbGF0aW9uLjwvcGFyYW0+XHJcblx0XHQvLy8gPHBhcmFtIG5hbWU9XCJhbW91bnRcIj5XZWlnaHRpbmcgZmFjdG9yLjwvcGFyYW0+XHJcblx0XHQvLy8gPHJldHVybnM+VGhlIHJlc3VsdCBvZiBDYXRtdWxsUm9tIGludGVycG9sYXRpb24uPC9yZXR1cm5zPlxyXG5cdFx0cHVibGljIHN0YXRpYyBWZWN0b3IyIENhdG11bGxSb20oVmVjdG9yMiB2YWx1ZTEsIFZlY3RvcjIgdmFsdWUyLCBWZWN0b3IyIHZhbHVlMywgVmVjdG9yMiB2YWx1ZTQsIGZsb2F0IGFtb3VudClcclxuXHRcdHtcclxuXHRcdFx0cmV0dXJuIG5ldyBWZWN0b3IyKFxyXG5cdFx0XHRcdE1hdGhzLkNhdG11bGxSb20odmFsdWUxLlgsIHZhbHVlMi5YLCB2YWx1ZTMuWCwgdmFsdWU0LlgsIGFtb3VudCksXHJcblx0XHRcdFx0TWF0aHMuQ2F0bXVsbFJvbSh2YWx1ZTEuWSwgdmFsdWUyLlksIHZhbHVlMy5ZLCB2YWx1ZTQuWSwgYW1vdW50KSk7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8vIDxzdW1tYXJ5PlxyXG5cdFx0Ly8vIENyZWF0ZXMgYSBuZXcgPHNlZSBjcmVmPVwiVmVjdG9yMlwiLz4gdGhhdCBjb250YWlucyBDYXRtdWxsUm9tIGludGVycG9sYXRpb24gb2YgdGhlIHNwZWNpZmllZCB2ZWN0b3JzLlxyXG5cdFx0Ly8vIDwvc3VtbWFyeT5cclxuXHRcdC8vLyA8cGFyYW0gbmFtZT1cInZhbHVlMVwiPlRoZSBmaXJzdCB2ZWN0b3IgaW4gaW50ZXJwb2xhdGlvbi48L3BhcmFtPlxyXG5cdFx0Ly8vIDxwYXJhbSBuYW1lPVwidmFsdWUyXCI+VGhlIHNlY29uZCB2ZWN0b3IgaW4gaW50ZXJwb2xhdGlvbi48L3BhcmFtPlxyXG5cdFx0Ly8vIDxwYXJhbSBuYW1lPVwidmFsdWUzXCI+VGhlIHRoaXJkIHZlY3RvciBpbiBpbnRlcnBvbGF0aW9uLjwvcGFyYW0+XHJcblx0XHQvLy8gPHBhcmFtIG5hbWU9XCJ2YWx1ZTRcIj5UaGUgZm91cnRoIHZlY3RvciBpbiBpbnRlcnBvbGF0aW9uLjwvcGFyYW0+XHJcblx0XHQvLy8gPHBhcmFtIG5hbWU9XCJhbW91bnRcIj5XZWlnaHRpbmcgZmFjdG9yLjwvcGFyYW0+XHJcblx0XHQvLy8gPHBhcmFtIG5hbWU9XCJyZXN1bHRcIj5UaGUgcmVzdWx0IG9mIENhdG11bGxSb20gaW50ZXJwb2xhdGlvbiBhcyBhbiBvdXRwdXQgcGFyYW1ldGVyLjwvcGFyYW0+XHJcblx0XHRwdWJsaWMgc3RhdGljIHZvaWQgQ2F0bXVsbFJvbShyZWYgVmVjdG9yMiB2YWx1ZTEsIHJlZiBWZWN0b3IyIHZhbHVlMiwgcmVmIFZlY3RvcjIgdmFsdWUzLCByZWYgVmVjdG9yMiB2YWx1ZTQsIGZsb2F0IGFtb3VudCwgb3V0IFZlY3RvcjIgcmVzdWx0KVxyXG5cdFx0e1xyXG5cdFx0XHRyZXN1bHQuWCA9IE1hdGhzLkNhdG11bGxSb20odmFsdWUxLlgsIHZhbHVlMi5YLCB2YWx1ZTMuWCwgdmFsdWU0LlgsIGFtb3VudCk7XHJcblx0XHRcdHJlc3VsdC5ZID0gTWF0aHMuQ2F0bXVsbFJvbSh2YWx1ZTEuWSwgdmFsdWUyLlksIHZhbHVlMy5ZLCB2YWx1ZTQuWSwgYW1vdW50KTtcclxuXHRcdH1cclxuXHJcblx0XHQvLy8gPHN1bW1hcnk+XHJcblx0XHQvLy8gQ2xhbXBzIHRoZSBzcGVjaWZpZWQgdmFsdWUgd2l0aGluIGEgcmFuZ2UuXHJcblx0XHQvLy8gPC9zdW1tYXJ5PlxyXG5cdFx0Ly8vIDxwYXJhbSBuYW1lPVwidmFsdWUxXCI+VGhlIHZhbHVlIHRvIGNsYW1wLjwvcGFyYW0+XHJcblx0XHQvLy8gPHBhcmFtIG5hbWU9XCJtaW5cIj5UaGUgbWluIHZhbHVlLjwvcGFyYW0+XHJcblx0XHQvLy8gPHBhcmFtIG5hbWU9XCJtYXhcIj5UaGUgbWF4IHZhbHVlLjwvcGFyYW0+XHJcblx0XHQvLy8gPHJldHVybnM+VGhlIGNsYW1wZWQgdmFsdWUuPC9yZXR1cm5zPlxyXG5cdFx0cHVibGljIHN0YXRpYyBWZWN0b3IyIENsYW1wKFZlY3RvcjIgdmFsdWUxLCBWZWN0b3IyIG1pbiwgVmVjdG9yMiBtYXgpXHJcblx0XHR7XHJcblx0XHRcdHJldHVybiBuZXcgVmVjdG9yMihcclxuXHRcdFx0XHRNYXRocy5DbGFtcCh2YWx1ZTEuWCwgbWluLlgsIG1heC5YKSxcclxuXHRcdFx0XHRNYXRocy5DbGFtcCh2YWx1ZTEuWSwgbWluLlksIG1heC5ZKSk7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8vIDxzdW1tYXJ5PlxyXG5cdFx0Ly8vIENsYW1wcyB0aGUgc3BlY2lmaWVkIHZhbHVlIHdpdGhpbiBhIHJhbmdlLlxyXG5cdFx0Ly8vIDwvc3VtbWFyeT5cclxuXHRcdC8vLyA8cGFyYW0gbmFtZT1cInZhbHVlMVwiPlRoZSB2YWx1ZSB0byBjbGFtcC48L3BhcmFtPlxyXG5cdFx0Ly8vIDxwYXJhbSBuYW1lPVwibWluXCI+VGhlIG1pbiB2YWx1ZS48L3BhcmFtPlxyXG5cdFx0Ly8vIDxwYXJhbSBuYW1lPVwibWF4XCI+VGhlIG1heCB2YWx1ZS48L3BhcmFtPlxyXG5cdFx0Ly8vIDxwYXJhbSBuYW1lPVwicmVzdWx0XCI+VGhlIGNsYW1wZWQgdmFsdWUgYXMgYW4gb3V0cHV0IHBhcmFtZXRlci48L3BhcmFtPlxyXG5cdFx0cHVibGljIHN0YXRpYyB2b2lkIENsYW1wKHJlZiBWZWN0b3IyIHZhbHVlMSwgcmVmIFZlY3RvcjIgbWluLCByZWYgVmVjdG9yMiBtYXgsIG91dCBWZWN0b3IyIHJlc3VsdClcclxuXHRcdHtcclxuXHRcdFx0cmVzdWx0LlggPSBNYXRocy5DbGFtcCh2YWx1ZTEuWCwgbWluLlgsIG1heC5YKTtcclxuXHRcdFx0cmVzdWx0LlkgPSBNYXRocy5DbGFtcCh2YWx1ZTEuWSwgbWluLlksIG1heC5ZKTtcclxuXHRcdH1cclxuXHJcblx0XHQvLy8gPHN1bW1hcnk+XHJcblx0XHQvLy8gUmV0dXJucyB0aGUgZGlzdGFuY2UgYmV0d2VlbiB0d28gdmVjdG9ycy5cclxuXHRcdC8vLyA8L3N1bW1hcnk+XHJcblx0XHQvLy8gPHBhcmFtIG5hbWU9XCJ2YWx1ZTFcIj5UaGUgZmlyc3QgdmVjdG9yLjwvcGFyYW0+XHJcblx0XHQvLy8gPHBhcmFtIG5hbWU9XCJ2YWx1ZTJcIj5UaGUgc2Vjb25kIHZlY3Rvci48L3BhcmFtPlxyXG5cdFx0Ly8vIDxyZXR1cm5zPlRoZSBkaXN0YW5jZSBiZXR3ZWVuIHR3byB2ZWN0b3JzLjwvcmV0dXJucz5cclxuXHRcdHB1YmxpYyBzdGF0aWMgZmxvYXQgRGlzdGFuY2UoVmVjdG9yMiB2YWx1ZTEsIFZlY3RvcjIgdmFsdWUyKVxyXG5cdFx0e1xyXG5cdFx0XHRmbG9hdCB2MSA9IHZhbHVlMS5YIC0gdmFsdWUyLlgsIHYyID0gdmFsdWUxLlkgLSB2YWx1ZTIuWTtcclxuXHRcdFx0cmV0dXJuIChmbG9hdClNYXRoLlNxcnQoKHYxICogdjEpICsgKHYyICogdjIpKTtcclxuXHRcdH1cclxuXHJcblx0XHQvLy8gPHN1bW1hcnk+XHJcblx0XHQvLy8gUmV0dXJucyB0aGUgZGlzdGFuY2UgYmV0d2VlbiB0d28gdmVjdG9ycy5cclxuXHRcdC8vLyA8L3N1bW1hcnk+XHJcblx0XHQvLy8gPHBhcmFtIG5hbWU9XCJ2YWx1ZTFcIj5UaGUgZmlyc3QgdmVjdG9yLjwvcGFyYW0+XHJcblx0XHQvLy8gPHBhcmFtIG5hbWU9XCJ2YWx1ZTJcIj5UaGUgc2Vjb25kIHZlY3Rvci48L3BhcmFtPlxyXG5cdFx0Ly8vIDxwYXJhbSBuYW1lPVwicmVzdWx0XCI+VGhlIGRpc3RhbmNlIGJldHdlZW4gdHdvIHZlY3RvcnMgYXMgYW4gb3V0cHV0IHBhcmFtZXRlci48L3BhcmFtPlxyXG5cdFx0cHVibGljIHN0YXRpYyB2b2lkIERpc3RhbmNlKHJlZiBWZWN0b3IyIHZhbHVlMSwgcmVmIFZlY3RvcjIgdmFsdWUyLCBvdXQgZmxvYXQgcmVzdWx0KVxyXG5cdFx0e1xyXG5cdFx0XHRmbG9hdCB2MSA9IHZhbHVlMS5YIC0gdmFsdWUyLlgsIHYyID0gdmFsdWUxLlkgLSB2YWx1ZTIuWTtcclxuXHRcdFx0cmVzdWx0ID0gKGZsb2F0KU1hdGguU3FydCgodjEgKiB2MSkgKyAodjIgKiB2MikpO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vLyA8c3VtbWFyeT5cclxuXHRcdC8vLyBSZXR1cm5zIHRoZSBzcXVhcmVkIGRpc3RhbmNlIGJldHdlZW4gdHdvIHZlY3RvcnMuXHJcblx0XHQvLy8gPC9zdW1tYXJ5PlxyXG5cdFx0Ly8vIDxwYXJhbSBuYW1lPVwidmFsdWUxXCI+VGhlIGZpcnN0IHZlY3Rvci48L3BhcmFtPlxyXG5cdFx0Ly8vIDxwYXJhbSBuYW1lPVwidmFsdWUyXCI+VGhlIHNlY29uZCB2ZWN0b3IuPC9wYXJhbT5cclxuXHRcdC8vLyA8cmV0dXJucz5UaGUgc3F1YXJlZCBkaXN0YW5jZSBiZXR3ZWVuIHR3byB2ZWN0b3JzLjwvcmV0dXJucz5cclxuXHRcdHB1YmxpYyBzdGF0aWMgZmxvYXQgRGlzdGFuY2VTcXVhcmVkKFZlY3RvcjIgdmFsdWUxLCBWZWN0b3IyIHZhbHVlMilcclxuXHRcdHtcclxuXHRcdFx0ZmxvYXQgdjEgPSB2YWx1ZTEuWCAtIHZhbHVlMi5YLCB2MiA9IHZhbHVlMS5ZIC0gdmFsdWUyLlk7XHJcblx0XHRcdHJldHVybiAodjEgKiB2MSkgKyAodjIgKiB2Mik7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8vIDxzdW1tYXJ5PlxyXG5cdFx0Ly8vIFJldHVybnMgdGhlIHNxdWFyZWQgZGlzdGFuY2UgYmV0d2VlbiB0d28gdmVjdG9ycy5cclxuXHRcdC8vLyA8L3N1bW1hcnk+XHJcblx0XHQvLy8gPHBhcmFtIG5hbWU9XCJ2YWx1ZTFcIj5UaGUgZmlyc3QgdmVjdG9yLjwvcGFyYW0+XHJcblx0XHQvLy8gPHBhcmFtIG5hbWU9XCJ2YWx1ZTJcIj5UaGUgc2Vjb25kIHZlY3Rvci48L3BhcmFtPlxyXG5cdFx0Ly8vIDxwYXJhbSBuYW1lPVwicmVzdWx0XCI+VGhlIHNxdWFyZWQgZGlzdGFuY2UgYmV0d2VlbiB0d28gdmVjdG9ycyBhcyBhbiBvdXRwdXQgcGFyYW1ldGVyLjwvcGFyYW0+XHJcblx0XHRwdWJsaWMgc3RhdGljIHZvaWQgRGlzdGFuY2VTcXVhcmVkKHJlZiBWZWN0b3IyIHZhbHVlMSwgcmVmIFZlY3RvcjIgdmFsdWUyLCBvdXQgZmxvYXQgcmVzdWx0KVxyXG5cdFx0e1xyXG5cdFx0XHRmbG9hdCB2MSA9IHZhbHVlMS5YIC0gdmFsdWUyLlgsIHYyID0gdmFsdWUxLlkgLSB2YWx1ZTIuWTtcclxuXHRcdFx0cmVzdWx0ID0gKHYxICogdjEpICsgKHYyICogdjIpO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vLyA8c3VtbWFyeT5cclxuXHRcdC8vLyBEaXZpZGVzIHRoZSBjb21wb25lbnRzIG9mIGEgPHNlZSBjcmVmPVwiVmVjdG9yMlwiLz4gYnkgdGhlIGNvbXBvbmVudHMgb2YgYW5vdGhlciA8c2VlIGNyZWY9XCJWZWN0b3IyXCIvPi5cclxuXHRcdC8vLyA8L3N1bW1hcnk+XHJcblx0XHQvLy8gPHBhcmFtIG5hbWU9XCJ2YWx1ZTFcIj5Tb3VyY2UgPHNlZSBjcmVmPVwiVmVjdG9yMlwiLz4uPC9wYXJhbT5cclxuXHRcdC8vLyA8cGFyYW0gbmFtZT1cInZhbHVlMlwiPkRpdmlzb3IgPHNlZSBjcmVmPVwiVmVjdG9yMlwiLz4uPC9wYXJhbT5cclxuXHRcdC8vLyA8cmV0dXJucz5UaGUgcmVzdWx0IG9mIGRpdmlkaW5nIHRoZSB2ZWN0b3JzLjwvcmV0dXJucz5cclxuXHRcdHB1YmxpYyBzdGF0aWMgVmVjdG9yMiBEaXZpZGUoVmVjdG9yMiB2YWx1ZTEsIFZlY3RvcjIgdmFsdWUyKVxyXG5cdFx0e1xyXG5cdFx0XHR2YWx1ZTEuWCAvPSB2YWx1ZTIuWDtcclxuXHRcdFx0dmFsdWUxLlkgLz0gdmFsdWUyLlk7XHJcblx0XHRcdHJldHVybiB2YWx1ZTE7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8vIDxzdW1tYXJ5PlxyXG5cdFx0Ly8vIERpdmlkZXMgdGhlIGNvbXBvbmVudHMgb2YgYSA8c2VlIGNyZWY9XCJWZWN0b3IyXCIvPiBieSB0aGUgY29tcG9uZW50cyBvZiBhbm90aGVyIDxzZWUgY3JlZj1cIlZlY3RvcjJcIi8+LlxyXG5cdFx0Ly8vIDwvc3VtbWFyeT5cclxuXHRcdC8vLyA8cGFyYW0gbmFtZT1cInZhbHVlMVwiPlNvdXJjZSA8c2VlIGNyZWY9XCJWZWN0b3IyXCIvPi48L3BhcmFtPlxyXG5cdFx0Ly8vIDxwYXJhbSBuYW1lPVwidmFsdWUyXCI+RGl2aXNvciA8c2VlIGNyZWY9XCJWZWN0b3IyXCIvPi48L3BhcmFtPlxyXG5cdFx0Ly8vIDxwYXJhbSBuYW1lPVwicmVzdWx0XCI+VGhlIHJlc3VsdCBvZiBkaXZpZGluZyB0aGUgdmVjdG9ycyBhcyBhbiBvdXRwdXQgcGFyYW1ldGVyLjwvcGFyYW0+XHJcblx0XHRwdWJsaWMgc3RhdGljIHZvaWQgRGl2aWRlKHJlZiBWZWN0b3IyIHZhbHVlMSwgcmVmIFZlY3RvcjIgdmFsdWUyLCBvdXQgVmVjdG9yMiByZXN1bHQpXHJcblx0XHR7XHJcblx0XHRcdHJlc3VsdC5YID0gdmFsdWUxLlggLyB2YWx1ZTIuWDtcclxuXHRcdFx0cmVzdWx0LlkgPSB2YWx1ZTEuWSAvIHZhbHVlMi5ZO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vLyA8c3VtbWFyeT5cclxuXHRcdC8vLyBEaXZpZGVzIHRoZSBjb21wb25lbnRzIG9mIGEgPHNlZSBjcmVmPVwiVmVjdG9yMlwiLz4gYnkgYSBzY2FsYXIuXHJcblx0XHQvLy8gPC9zdW1tYXJ5PlxyXG5cdFx0Ly8vIDxwYXJhbSBuYW1lPVwidmFsdWUxXCI+U291cmNlIDxzZWUgY3JlZj1cIlZlY3RvcjJcIi8+LjwvcGFyYW0+XHJcblx0XHQvLy8gPHBhcmFtIG5hbWU9XCJkaXZpZGVyXCI+RGl2aXNvciBzY2FsYXIuPC9wYXJhbT5cclxuXHRcdC8vLyA8cmV0dXJucz5UaGUgcmVzdWx0IG9mIGRpdmlkaW5nIGEgdmVjdG9yIGJ5IGEgc2NhbGFyLjwvcmV0dXJucz5cclxuXHRcdHB1YmxpYyBzdGF0aWMgVmVjdG9yMiBEaXZpZGUoVmVjdG9yMiB2YWx1ZTEsIGZsb2F0IGRpdmlkZXIpXHJcblx0XHR7XHJcblx0XHRcdGZsb2F0IGZhY3RvciA9IDEgLyBkaXZpZGVyO1xyXG5cdFx0XHR2YWx1ZTEuWCAqPSBmYWN0b3I7XHJcblx0XHRcdHZhbHVlMS5ZICo9IGZhY3RvcjtcclxuXHRcdFx0cmV0dXJuIHZhbHVlMTtcclxuXHRcdH1cclxuXHJcblx0XHQvLy8gPHN1bW1hcnk+XHJcblx0XHQvLy8gRGl2aWRlcyB0aGUgY29tcG9uZW50cyBvZiBhIDxzZWUgY3JlZj1cIlZlY3RvcjJcIi8+IGJ5IGEgc2NhbGFyLlxyXG5cdFx0Ly8vIDwvc3VtbWFyeT5cclxuXHRcdC8vLyA8cGFyYW0gbmFtZT1cInZhbHVlMVwiPlNvdXJjZSA8c2VlIGNyZWY9XCJWZWN0b3IyXCIvPi48L3BhcmFtPlxyXG5cdFx0Ly8vIDxwYXJhbSBuYW1lPVwiZGl2aWRlclwiPkRpdmlzb3Igc2NhbGFyLjwvcGFyYW0+XHJcblx0XHQvLy8gPHBhcmFtIG5hbWU9XCJyZXN1bHRcIj5UaGUgcmVzdWx0IG9mIGRpdmlkaW5nIGEgdmVjdG9yIGJ5IGEgc2NhbGFyIGFzIGFuIG91dHB1dCBwYXJhbWV0ZXIuPC9wYXJhbT5cclxuXHRcdHB1YmxpYyBzdGF0aWMgdm9pZCBEaXZpZGUocmVmIFZlY3RvcjIgdmFsdWUxLCBmbG9hdCBkaXZpZGVyLCBvdXQgVmVjdG9yMiByZXN1bHQpXHJcblx0XHR7XHJcblx0XHRcdGZsb2F0IGZhY3RvciA9IDEgLyBkaXZpZGVyO1xyXG5cdFx0XHRyZXN1bHQuWCA9IHZhbHVlMS5YICogZmFjdG9yO1xyXG5cdFx0XHRyZXN1bHQuWSA9IHZhbHVlMS5ZICogZmFjdG9yO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vLyA8c3VtbWFyeT5cclxuXHRcdC8vLyBSZXR1cm5zIGEgZG90IHByb2R1Y3Qgb2YgdHdvIHZlY3RvcnMuXHJcblx0XHQvLy8gPC9zdW1tYXJ5PlxyXG5cdFx0Ly8vIDxwYXJhbSBuYW1lPVwidmFsdWUxXCI+VGhlIGZpcnN0IHZlY3Rvci48L3BhcmFtPlxyXG5cdFx0Ly8vIDxwYXJhbSBuYW1lPVwidmFsdWUyXCI+VGhlIHNlY29uZCB2ZWN0b3IuPC9wYXJhbT5cclxuXHRcdC8vLyA8cmV0dXJucz5UaGUgZG90IHByb2R1Y3Qgb2YgdHdvIHZlY3RvcnMuPC9yZXR1cm5zPlxyXG5cdFx0cHVibGljIHN0YXRpYyBmbG9hdCBEb3QoVmVjdG9yMiB2YWx1ZTEsIFZlY3RvcjIgdmFsdWUyKVxyXG5cdFx0e1xyXG5cdFx0XHRyZXR1cm4gKHZhbHVlMS5YICogdmFsdWUyLlgpICsgKHZhbHVlMS5ZICogdmFsdWUyLlkpO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vLyA8c3VtbWFyeT5cclxuXHRcdC8vLyBSZXR1cm5zIGEgZG90IHByb2R1Y3Qgb2YgdHdvIHZlY3RvcnMuXHJcblx0XHQvLy8gPC9zdW1tYXJ5PlxyXG5cdFx0Ly8vIDxwYXJhbSBuYW1lPVwidmFsdWUxXCI+VGhlIGZpcnN0IHZlY3Rvci48L3BhcmFtPlxyXG5cdFx0Ly8vIDxwYXJhbSBuYW1lPVwidmFsdWUyXCI+VGhlIHNlY29uZCB2ZWN0b3IuPC9wYXJhbT5cclxuXHRcdC8vLyA8cGFyYW0gbmFtZT1cInJlc3VsdFwiPlRoZSBkb3QgcHJvZHVjdCBvZiB0d28gdmVjdG9ycyBhcyBhbiBvdXRwdXQgcGFyYW1ldGVyLjwvcGFyYW0+XHJcblx0XHRwdWJsaWMgc3RhdGljIHZvaWQgRG90KHJlZiBWZWN0b3IyIHZhbHVlMSwgcmVmIFZlY3RvcjIgdmFsdWUyLCBvdXQgZmxvYXQgcmVzdWx0KVxyXG5cdFx0e1xyXG5cdFx0XHRyZXN1bHQgPSAodmFsdWUxLlggKiB2YWx1ZTIuWCkgKyAodmFsdWUxLlkgKiB2YWx1ZTIuWSk7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8vIDxzdW1tYXJ5PlxyXG5cdFx0Ly8vIENvbXBhcmVzIHdoZXRoZXIgY3VycmVudCBpbnN0YW5jZSBpcyBlcXVhbCB0byBzcGVjaWZpZWQgPHNlZSBjcmVmPVwiT2JqZWN0XCIvPi5cclxuXHRcdC8vLyA8L3N1bW1hcnk+XHJcblx0XHQvLy8gPHBhcmFtIG5hbWU9XCJvYmpcIj5UaGUgPHNlZSBjcmVmPVwiT2JqZWN0XCIvPiB0byBjb21wYXJlLjwvcGFyYW0+XHJcblx0XHQvLy8gPHJldHVybnM+PGM+dHJ1ZTwvYz4gaWYgdGhlIGluc3RhbmNlcyBhcmUgZXF1YWw7IDxjPmZhbHNlPC9jPiBvdGhlcndpc2UuPC9yZXR1cm5zPlxyXG5cdFx0cHVibGljIG92ZXJyaWRlIGJvb2wgRXF1YWxzKG9iamVjdCBvYmopXHJcblx0XHR7XHJcblx0XHRcdGlmIChvYmogaXMgVmVjdG9yMilcclxuXHRcdFx0e1xyXG5cdFx0XHRcdHJldHVybiBFcXVhbHMoKFZlY3RvcjIpb2JqKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vLyA8c3VtbWFyeT5cclxuXHRcdC8vLyBDb21wYXJlcyB3aGV0aGVyIGN1cnJlbnQgaW5zdGFuY2UgaXMgZXF1YWwgdG8gc3BlY2lmaWVkIDxzZWUgY3JlZj1cIlZlY3RvcjJcIi8+LlxyXG5cdFx0Ly8vIDwvc3VtbWFyeT5cclxuXHRcdC8vLyA8cGFyYW0gbmFtZT1cIm90aGVyXCI+VGhlIDxzZWUgY3JlZj1cIlZlY3RvcjJcIi8+IHRvIGNvbXBhcmUuPC9wYXJhbT5cclxuXHRcdC8vLyA8cmV0dXJucz48Yz50cnVlPC9jPiBpZiB0aGUgaW5zdGFuY2VzIGFyZSBlcXVhbDsgPGM+ZmFsc2U8L2M+IG90aGVyd2lzZS48L3JldHVybnM+XHJcblx0XHRwdWJsaWMgYm9vbCBFcXVhbHMoVmVjdG9yMiBvdGhlcilcclxuXHRcdHtcclxuXHRcdFx0cmV0dXJuIChYID09IG90aGVyLlgpICYmIChZID09IG90aGVyLlkpO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vLyA8c3VtbWFyeT5cclxuXHRcdC8vLyBHZXRzIHRoZSBoYXNoIGNvZGUgb2YgdGhpcyA8c2VlIGNyZWY9XCJWZWN0b3IyXCIvPi5cclxuXHRcdC8vLyA8L3N1bW1hcnk+XHJcblx0XHQvLy8gPHJldHVybnM+SGFzaCBjb2RlIG9mIHRoaXMgPHNlZSBjcmVmPVwiVmVjdG9yMlwiLz4uPC9yZXR1cm5zPlxyXG5cdFx0cHVibGljIG92ZXJyaWRlIGludCBHZXRIYXNoQ29kZSgpXHJcblx0XHR7XHJcblx0XHRcdHJldHVybiBYLkdldEhhc2hDb2RlKCkgKyBZLkdldEhhc2hDb2RlKCk7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8vIDxzdW1tYXJ5PlxyXG5cdFx0Ly8vIENyZWF0ZXMgYSBuZXcgPHNlZSBjcmVmPVwiVmVjdG9yMlwiLz4gdGhhdCBjb250YWlucyBoZXJtaXRlIHNwbGluZSBpbnRlcnBvbGF0aW9uLlxyXG5cdFx0Ly8vIDwvc3VtbWFyeT5cclxuXHRcdC8vLyA8cGFyYW0gbmFtZT1cInZhbHVlMVwiPlRoZSBmaXJzdCBwb3NpdGlvbiB2ZWN0b3IuPC9wYXJhbT5cclxuXHRcdC8vLyA8cGFyYW0gbmFtZT1cInRhbmdlbnQxXCI+VGhlIGZpcnN0IHRhbmdlbnQgdmVjdG9yLjwvcGFyYW0+XHJcblx0XHQvLy8gPHBhcmFtIG5hbWU9XCJ2YWx1ZTJcIj5UaGUgc2Vjb25kIHBvc2l0aW9uIHZlY3Rvci48L3BhcmFtPlxyXG5cdFx0Ly8vIDxwYXJhbSBuYW1lPVwidGFuZ2VudDJcIj5UaGUgc2Vjb25kIHRhbmdlbnQgdmVjdG9yLjwvcGFyYW0+XHJcblx0XHQvLy8gPHBhcmFtIG5hbWU9XCJhbW91bnRcIj5XZWlnaHRpbmcgZmFjdG9yLjwvcGFyYW0+XHJcblx0XHQvLy8gPHJldHVybnM+VGhlIGhlcm1pdGUgc3BsaW5lIGludGVycG9sYXRpb24gdmVjdG9yLjwvcmV0dXJucz5cclxuXHRcdHB1YmxpYyBzdGF0aWMgVmVjdG9yMiBIZXJtaXRlKFZlY3RvcjIgdmFsdWUxLCBWZWN0b3IyIHRhbmdlbnQxLCBWZWN0b3IyIHZhbHVlMiwgVmVjdG9yMiB0YW5nZW50MiwgZmxvYXQgYW1vdW50KVxyXG5cdFx0e1xyXG5cdFx0XHRyZXR1cm4gbmV3IFZlY3RvcjIoTWF0aHMuSGVybWl0ZSh2YWx1ZTEuWCwgdGFuZ2VudDEuWCwgdmFsdWUyLlgsIHRhbmdlbnQyLlgsIGFtb3VudCksIE1hdGhzLkhlcm1pdGUodmFsdWUxLlksIHRhbmdlbnQxLlksIHZhbHVlMi5ZLCB0YW5nZW50Mi5ZLCBhbW91bnQpKTtcclxuXHRcdH1cclxuXHJcblx0XHQvLy8gPHN1bW1hcnk+XHJcblx0XHQvLy8gQ3JlYXRlcyBhIG5ldyA8c2VlIGNyZWY9XCJWZWN0b3IyXCIvPiB0aGF0IGNvbnRhaW5zIGhlcm1pdGUgc3BsaW5lIGludGVycG9sYXRpb24uXHJcblx0XHQvLy8gPC9zdW1tYXJ5PlxyXG5cdFx0Ly8vIDxwYXJhbSBuYW1lPVwidmFsdWUxXCI+VGhlIGZpcnN0IHBvc2l0aW9uIHZlY3Rvci48L3BhcmFtPlxyXG5cdFx0Ly8vIDxwYXJhbSBuYW1lPVwidGFuZ2VudDFcIj5UaGUgZmlyc3QgdGFuZ2VudCB2ZWN0b3IuPC9wYXJhbT5cclxuXHRcdC8vLyA8cGFyYW0gbmFtZT1cInZhbHVlMlwiPlRoZSBzZWNvbmQgcG9zaXRpb24gdmVjdG9yLjwvcGFyYW0+XHJcblx0XHQvLy8gPHBhcmFtIG5hbWU9XCJ0YW5nZW50MlwiPlRoZSBzZWNvbmQgdGFuZ2VudCB2ZWN0b3IuPC9wYXJhbT5cclxuXHRcdC8vLyA8cGFyYW0gbmFtZT1cImFtb3VudFwiPldlaWdodGluZyBmYWN0b3IuPC9wYXJhbT5cclxuXHRcdC8vLyA8cGFyYW0gbmFtZT1cInJlc3VsdFwiPlRoZSBoZXJtaXRlIHNwbGluZSBpbnRlcnBvbGF0aW9uIHZlY3RvciBhcyBhbiBvdXRwdXQgcGFyYW1ldGVyLjwvcGFyYW0+XHJcblx0XHRwdWJsaWMgc3RhdGljIHZvaWQgSGVybWl0ZShyZWYgVmVjdG9yMiB2YWx1ZTEsIHJlZiBWZWN0b3IyIHRhbmdlbnQxLCByZWYgVmVjdG9yMiB2YWx1ZTIsIHJlZiBWZWN0b3IyIHRhbmdlbnQyLCBmbG9hdCBhbW91bnQsIG91dCBWZWN0b3IyIHJlc3VsdClcclxuXHRcdHtcclxuXHRcdFx0cmVzdWx0LlggPSBNYXRocy5IZXJtaXRlKHZhbHVlMS5YLCB0YW5nZW50MS5YLCB2YWx1ZTIuWCwgdGFuZ2VudDIuWCwgYW1vdW50KTtcclxuXHRcdFx0cmVzdWx0LlkgPSBNYXRocy5IZXJtaXRlKHZhbHVlMS5ZLCB0YW5nZW50MS5ZLCB2YWx1ZTIuWSwgdGFuZ2VudDIuWSwgYW1vdW50KTtcclxuXHRcdH1cclxuXHJcblx0XHQvLy8gPHN1bW1hcnk+XHJcblx0XHQvLy8gUmV0dXJucyB0aGUgbGVuZ3RoIG9mIHRoaXMgPHNlZSBjcmVmPVwiVmVjdG9yMlwiLz4uXHJcblx0XHQvLy8gPC9zdW1tYXJ5PlxyXG5cdFx0Ly8vIDxyZXR1cm5zPlRoZSBsZW5ndGggb2YgdGhpcyA8c2VlIGNyZWY9XCJWZWN0b3IyXCIvPi48L3JldHVybnM+XHJcblx0XHRwdWJsaWMgZmxvYXQgTGVuZ3RoKClcclxuXHRcdHtcclxuXHRcdFx0cmV0dXJuIChmbG9hdClNYXRoLlNxcnQoKFggKiBYKSArIChZICogWSkpO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vLyA8c3VtbWFyeT5cclxuXHRcdC8vLyBSZXR1cm5zIHRoZSBzcXVhcmVkIGxlbmd0aCBvZiB0aGlzIDxzZWUgY3JlZj1cIlZlY3RvcjJcIi8+LlxyXG5cdFx0Ly8vIDwvc3VtbWFyeT5cclxuXHRcdC8vLyA8cmV0dXJucz5UaGUgc3F1YXJlZCBsZW5ndGggb2YgdGhpcyA8c2VlIGNyZWY9XCJWZWN0b3IyXCIvPi48L3JldHVybnM+XHJcblx0XHRwdWJsaWMgZmxvYXQgTGVuZ3RoU3F1YXJlZCgpXHJcblx0XHR7XHJcblx0XHRcdHJldHVybiAoWCAqIFgpICsgKFkgKiBZKTtcclxuXHRcdH1cclxuXHJcblx0XHQvLy8gPHN1bW1hcnk+XHJcblx0XHQvLy8gQ3JlYXRlcyBhIG5ldyA8c2VlIGNyZWY9XCJWZWN0b3IyXCIvPiB0aGF0IGNvbnRhaW5zIGxpbmVhciBpbnRlcnBvbGF0aW9uIG9mIHRoZSBzcGVjaWZpZWQgdmVjdG9ycy5cclxuXHRcdC8vLyA8L3N1bW1hcnk+XHJcblx0XHQvLy8gPHBhcmFtIG5hbWU9XCJ2YWx1ZTFcIj5UaGUgZmlyc3QgdmVjdG9yLjwvcGFyYW0+XHJcblx0XHQvLy8gPHBhcmFtIG5hbWU9XCJ2YWx1ZTJcIj5UaGUgc2Vjb25kIHZlY3Rvci48L3BhcmFtPlxyXG5cdFx0Ly8vIDxwYXJhbSBuYW1lPVwiYW1vdW50XCI+V2VpZ2h0aW5nIHZhbHVlKGJldHdlZW4gMC4wIGFuZCAxLjApLjwvcGFyYW0+XHJcblx0XHQvLy8gPHJldHVybnM+VGhlIHJlc3VsdCBvZiBsaW5lYXIgaW50ZXJwb2xhdGlvbiBvZiB0aGUgc3BlY2lmaWVkIHZlY3RvcnMuPC9yZXR1cm5zPlxyXG5cdFx0cHVibGljIHN0YXRpYyBWZWN0b3IyIExlcnAoVmVjdG9yMiB2YWx1ZTEsIFZlY3RvcjIgdmFsdWUyLCBmbG9hdCBhbW91bnQpXHJcblx0XHR7XHJcblx0XHRcdHJldHVybiBuZXcgVmVjdG9yMihcclxuXHRcdFx0XHRNYXRocy5MZXJwKHZhbHVlMS5YLCB2YWx1ZTIuWCwgYW1vdW50KSxcclxuXHRcdFx0XHRNYXRocy5MZXJwKHZhbHVlMS5ZLCB2YWx1ZTIuWSwgYW1vdW50KSk7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8vIDxzdW1tYXJ5PlxyXG5cdFx0Ly8vIENyZWF0ZXMgYSBuZXcgPHNlZSBjcmVmPVwiVmVjdG9yMlwiLz4gdGhhdCBjb250YWlucyBsaW5lYXIgaW50ZXJwb2xhdGlvbiBvZiB0aGUgc3BlY2lmaWVkIHZlY3RvcnMuXHJcblx0XHQvLy8gPC9zdW1tYXJ5PlxyXG5cdFx0Ly8vIDxwYXJhbSBuYW1lPVwidmFsdWUxXCI+VGhlIGZpcnN0IHZlY3Rvci48L3BhcmFtPlxyXG5cdFx0Ly8vIDxwYXJhbSBuYW1lPVwidmFsdWUyXCI+VGhlIHNlY29uZCB2ZWN0b3IuPC9wYXJhbT5cclxuXHRcdC8vLyA8cGFyYW0gbmFtZT1cImFtb3VudFwiPldlaWdodGluZyB2YWx1ZShiZXR3ZWVuIDAuMCBhbmQgMS4wKS48L3BhcmFtPlxyXG5cdFx0Ly8vIDxwYXJhbSBuYW1lPVwicmVzdWx0XCI+VGhlIHJlc3VsdCBvZiBsaW5lYXIgaW50ZXJwb2xhdGlvbiBvZiB0aGUgc3BlY2lmaWVkIHZlY3RvcnMgYXMgYW4gb3V0cHV0IHBhcmFtZXRlci48L3BhcmFtPlxyXG5cdFx0cHVibGljIHN0YXRpYyB2b2lkIExlcnAocmVmIFZlY3RvcjIgdmFsdWUxLCByZWYgVmVjdG9yMiB2YWx1ZTIsIGZsb2F0IGFtb3VudCwgb3V0IFZlY3RvcjIgcmVzdWx0KVxyXG5cdFx0e1xyXG5cdFx0XHRyZXN1bHQuWCA9IE1hdGhzLkxlcnAodmFsdWUxLlgsIHZhbHVlMi5YLCBhbW91bnQpO1xyXG5cdFx0XHRyZXN1bHQuWSA9IE1hdGhzLkxlcnAodmFsdWUxLlksIHZhbHVlMi5ZLCBhbW91bnQpO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vLyA8c3VtbWFyeT5cclxuXHRcdC8vLyBDcmVhdGVzIGEgbmV3IDxzZWUgY3JlZj1cIlZlY3RvcjJcIi8+IHRoYXQgY29udGFpbnMgbGluZWFyIGludGVycG9sYXRpb24gb2YgdGhlIHNwZWNpZmllZCB2ZWN0b3JzLlxyXG5cdFx0Ly8vIFVzZXMgPHNlZSBjcmVmPVwiTWF0aHMuTGVycFByZWNpc2VcIi8+IG9uIE1hdGhIZWxwZXIgZm9yIHRoZSBpbnRlcnBvbGF0aW9uLlxyXG5cdFx0Ly8vIExlc3MgZWZmaWNpZW50IGJ1dCBtb3JlIHByZWNpc2UgY29tcGFyZWQgdG8gPHNlZSBjcmVmPVwiVmVjdG9yMi5MZXJwKFZlY3RvcjIsIFZlY3RvcjIsIGZsb2F0KVwiLz4uXHJcblx0XHQvLy8gU2VlIHJlbWFya3Mgc2VjdGlvbiBvZiA8c2VlIGNyZWY9XCJNYXRocy5MZXJwUHJlY2lzZVwiLz4gb24gTWF0aEhlbHBlciBmb3IgbW9yZSBpbmZvLlxyXG5cdFx0Ly8vIDwvc3VtbWFyeT5cclxuXHRcdC8vLyA8cGFyYW0gbmFtZT1cInZhbHVlMVwiPlRoZSBmaXJzdCB2ZWN0b3IuPC9wYXJhbT5cclxuXHRcdC8vLyA8cGFyYW0gbmFtZT1cInZhbHVlMlwiPlRoZSBzZWNvbmQgdmVjdG9yLjwvcGFyYW0+XHJcblx0XHQvLy8gPHBhcmFtIG5hbWU9XCJhbW91bnRcIj5XZWlnaHRpbmcgdmFsdWUoYmV0d2VlbiAwLjAgYW5kIDEuMCkuPC9wYXJhbT5cclxuXHRcdC8vLyA8cmV0dXJucz5UaGUgcmVzdWx0IG9mIGxpbmVhciBpbnRlcnBvbGF0aW9uIG9mIHRoZSBzcGVjaWZpZWQgdmVjdG9ycy48L3JldHVybnM+XHJcblx0XHRwdWJsaWMgc3RhdGljIFZlY3RvcjIgTGVycFByZWNpc2UoVmVjdG9yMiB2YWx1ZTEsIFZlY3RvcjIgdmFsdWUyLCBmbG9hdCBhbW91bnQpXHJcblx0XHR7XHJcblx0XHRcdHJldHVybiBuZXcgVmVjdG9yMihcclxuXHRcdFx0XHRNYXRocy5MZXJwUHJlY2lzZSh2YWx1ZTEuWCwgdmFsdWUyLlgsIGFtb3VudCksXHJcblx0XHRcdFx0TWF0aHMuTGVycFByZWNpc2UodmFsdWUxLlksIHZhbHVlMi5ZLCBhbW91bnQpKTtcclxuXHRcdH1cclxuXHJcblx0XHQvLy8gPHN1bW1hcnk+XHJcblx0XHQvLy8gQ3JlYXRlcyBhIG5ldyA8c2VlIGNyZWY9XCJWZWN0b3IyXCIvPiB0aGF0IGNvbnRhaW5zIGxpbmVhciBpbnRlcnBvbGF0aW9uIG9mIHRoZSBzcGVjaWZpZWQgdmVjdG9ycy5cclxuXHRcdC8vLyBVc2VzIDxzZWUgY3JlZj1cIk1hdGhzLkxlcnBQcmVjaXNlXCIvPiBvbiBNYXRoSGVscGVyIGZvciB0aGUgaW50ZXJwb2xhdGlvbi5cclxuXHRcdC8vLyBMZXNzIGVmZmljaWVudCBidXQgbW9yZSBwcmVjaXNlIGNvbXBhcmVkIHRvIDxzZWUgY3JlZj1cIlZlY3RvcjIuTGVycChyZWYgVmVjdG9yMiwgcmVmIFZlY3RvcjIsIGZsb2F0LCBvdXQgVmVjdG9yMilcIi8+LlxyXG5cdFx0Ly8vIFNlZSByZW1hcmtzIHNlY3Rpb24gb2YgPHNlZSBjcmVmPVwiTWF0aHMuTGVycFByZWNpc2VcIi8+IG9uIE1hdGhIZWxwZXIgZm9yIG1vcmUgaW5mby5cclxuXHRcdC8vLyA8L3N1bW1hcnk+XHJcblx0XHQvLy8gPHBhcmFtIG5hbWU9XCJ2YWx1ZTFcIj5UaGUgZmlyc3QgdmVjdG9yLjwvcGFyYW0+XHJcblx0XHQvLy8gPHBhcmFtIG5hbWU9XCJ2YWx1ZTJcIj5UaGUgc2Vjb25kIHZlY3Rvci48L3BhcmFtPlxyXG5cdFx0Ly8vIDxwYXJhbSBuYW1lPVwiYW1vdW50XCI+V2VpZ2h0aW5nIHZhbHVlKGJldHdlZW4gMC4wIGFuZCAxLjApLjwvcGFyYW0+XHJcblx0XHQvLy8gPHBhcmFtIG5hbWU9XCJyZXN1bHRcIj5UaGUgcmVzdWx0IG9mIGxpbmVhciBpbnRlcnBvbGF0aW9uIG9mIHRoZSBzcGVjaWZpZWQgdmVjdG9ycyBhcyBhbiBvdXRwdXQgcGFyYW1ldGVyLjwvcGFyYW0+XHJcblx0XHRwdWJsaWMgc3RhdGljIHZvaWQgTGVycFByZWNpc2UocmVmIFZlY3RvcjIgdmFsdWUxLCByZWYgVmVjdG9yMiB2YWx1ZTIsIGZsb2F0IGFtb3VudCwgb3V0IFZlY3RvcjIgcmVzdWx0KVxyXG5cdFx0e1xyXG5cdFx0XHRyZXN1bHQuWCA9IE1hdGhzLkxlcnBQcmVjaXNlKHZhbHVlMS5YLCB2YWx1ZTIuWCwgYW1vdW50KTtcclxuXHRcdFx0cmVzdWx0LlkgPSBNYXRocy5MZXJwUHJlY2lzZSh2YWx1ZTEuWSwgdmFsdWUyLlksIGFtb3VudCk7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8vIDxzdW1tYXJ5PlxyXG5cdFx0Ly8vIENyZWF0ZXMgYSBuZXcgPHNlZSBjcmVmPVwiVmVjdG9yMlwiLz4gdGhhdCBjb250YWlucyBhIG1heGltYWwgdmFsdWVzIGZyb20gdGhlIHR3byB2ZWN0b3JzLlxyXG5cdFx0Ly8vIDwvc3VtbWFyeT5cclxuXHRcdC8vLyA8cGFyYW0gbmFtZT1cInZhbHVlMVwiPlRoZSBmaXJzdCB2ZWN0b3IuPC9wYXJhbT5cclxuXHRcdC8vLyA8cGFyYW0gbmFtZT1cInZhbHVlMlwiPlRoZSBzZWNvbmQgdmVjdG9yLjwvcGFyYW0+XHJcblx0XHQvLy8gPHJldHVybnM+VGhlIDxzZWUgY3JlZj1cIlZlY3RvcjJcIi8+IHdpdGggbWF4aW1hbCB2YWx1ZXMgZnJvbSB0aGUgdHdvIHZlY3RvcnMuPC9yZXR1cm5zPlxyXG5cdFx0cHVibGljIHN0YXRpYyBWZWN0b3IyIE1heChWZWN0b3IyIHZhbHVlMSwgVmVjdG9yMiB2YWx1ZTIpXHJcblx0XHR7XHJcblx0XHRcdHJldHVybiBuZXcgVmVjdG9yMih2YWx1ZTEuWCA+IHZhbHVlMi5YID8gdmFsdWUxLlggOiB2YWx1ZTIuWCxcclxuXHRcdFx0XHRcdFx0XHQgICB2YWx1ZTEuWSA+IHZhbHVlMi5ZID8gdmFsdWUxLlkgOiB2YWx1ZTIuWSk7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8vIDxzdW1tYXJ5PlxyXG5cdFx0Ly8vIENyZWF0ZXMgYSBuZXcgPHNlZSBjcmVmPVwiVmVjdG9yMlwiLz4gdGhhdCBjb250YWlucyBhIG1heGltYWwgdmFsdWVzIGZyb20gdGhlIHR3byB2ZWN0b3JzLlxyXG5cdFx0Ly8vIDwvc3VtbWFyeT5cclxuXHRcdC8vLyA8cGFyYW0gbmFtZT1cInZhbHVlMVwiPlRoZSBmaXJzdCB2ZWN0b3IuPC9wYXJhbT5cclxuXHRcdC8vLyA8cGFyYW0gbmFtZT1cInZhbHVlMlwiPlRoZSBzZWNvbmQgdmVjdG9yLjwvcGFyYW0+XHJcblx0XHQvLy8gPHBhcmFtIG5hbWU9XCJyZXN1bHRcIj5UaGUgPHNlZSBjcmVmPVwiVmVjdG9yMlwiLz4gd2l0aCBtYXhpbWFsIHZhbHVlcyBmcm9tIHRoZSB0d28gdmVjdG9ycyBhcyBhbiBvdXRwdXQgcGFyYW1ldGVyLjwvcGFyYW0+XHJcblx0XHRwdWJsaWMgc3RhdGljIHZvaWQgTWF4KHJlZiBWZWN0b3IyIHZhbHVlMSwgcmVmIFZlY3RvcjIgdmFsdWUyLCBvdXQgVmVjdG9yMiByZXN1bHQpXHJcblx0XHR7XHJcblx0XHRcdHJlc3VsdC5YID0gdmFsdWUxLlggPiB2YWx1ZTIuWCA/IHZhbHVlMS5YIDogdmFsdWUyLlg7XHJcblx0XHRcdHJlc3VsdC5ZID0gdmFsdWUxLlkgPiB2YWx1ZTIuWSA/IHZhbHVlMS5ZIDogdmFsdWUyLlk7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8vIDxzdW1tYXJ5PlxyXG5cdFx0Ly8vIENyZWF0ZXMgYSBuZXcgPHNlZSBjcmVmPVwiVmVjdG9yMlwiLz4gdGhhdCBjb250YWlucyBhIG1pbmltYWwgdmFsdWVzIGZyb20gdGhlIHR3byB2ZWN0b3JzLlxyXG5cdFx0Ly8vIDwvc3VtbWFyeT5cclxuXHRcdC8vLyA8cGFyYW0gbmFtZT1cInZhbHVlMVwiPlRoZSBmaXJzdCB2ZWN0b3IuPC9wYXJhbT5cclxuXHRcdC8vLyA8cGFyYW0gbmFtZT1cInZhbHVlMlwiPlRoZSBzZWNvbmQgdmVjdG9yLjwvcGFyYW0+XHJcblx0XHQvLy8gPHJldHVybnM+VGhlIDxzZWUgY3JlZj1cIlZlY3RvcjJcIi8+IHdpdGggbWluaW1hbCB2YWx1ZXMgZnJvbSB0aGUgdHdvIHZlY3RvcnMuPC9yZXR1cm5zPlxyXG5cdFx0cHVibGljIHN0YXRpYyBWZWN0b3IyIE1pbihWZWN0b3IyIHZhbHVlMSwgVmVjdG9yMiB2YWx1ZTIpXHJcblx0XHR7XHJcblx0XHRcdHJldHVybiBuZXcgVmVjdG9yMih2YWx1ZTEuWCA8IHZhbHVlMi5YID8gdmFsdWUxLlggOiB2YWx1ZTIuWCxcclxuXHRcdFx0XHRcdFx0XHQgICB2YWx1ZTEuWSA8IHZhbHVlMi5ZID8gdmFsdWUxLlkgOiB2YWx1ZTIuWSk7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8vIDxzdW1tYXJ5PlxyXG5cdFx0Ly8vIENyZWF0ZXMgYSBuZXcgPHNlZSBjcmVmPVwiVmVjdG9yMlwiLz4gdGhhdCBjb250YWlucyBhIG1pbmltYWwgdmFsdWVzIGZyb20gdGhlIHR3byB2ZWN0b3JzLlxyXG5cdFx0Ly8vIDwvc3VtbWFyeT5cclxuXHRcdC8vLyA8cGFyYW0gbmFtZT1cInZhbHVlMVwiPlRoZSBmaXJzdCB2ZWN0b3IuPC9wYXJhbT5cclxuXHRcdC8vLyA8cGFyYW0gbmFtZT1cInZhbHVlMlwiPlRoZSBzZWNvbmQgdmVjdG9yLjwvcGFyYW0+XHJcblx0XHQvLy8gPHBhcmFtIG5hbWU9XCJyZXN1bHRcIj5UaGUgPHNlZSBjcmVmPVwiVmVjdG9yMlwiLz4gd2l0aCBtaW5pbWFsIHZhbHVlcyBmcm9tIHRoZSB0d28gdmVjdG9ycyBhcyBhbiBvdXRwdXQgcGFyYW1ldGVyLjwvcGFyYW0+XHJcblx0XHRwdWJsaWMgc3RhdGljIHZvaWQgTWluKHJlZiBWZWN0b3IyIHZhbHVlMSwgcmVmIFZlY3RvcjIgdmFsdWUyLCBvdXQgVmVjdG9yMiByZXN1bHQpXHJcblx0XHR7XHJcblx0XHRcdHJlc3VsdC5YID0gdmFsdWUxLlggPCB2YWx1ZTIuWCA/IHZhbHVlMS5YIDogdmFsdWUyLlg7XHJcblx0XHRcdHJlc3VsdC5ZID0gdmFsdWUxLlkgPCB2YWx1ZTIuWSA/IHZhbHVlMS5ZIDogdmFsdWUyLlk7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8vIDxzdW1tYXJ5PlxyXG5cdFx0Ly8vIENyZWF0ZXMgYSBuZXcgPHNlZSBjcmVmPVwiVmVjdG9yMlwiLz4gdGhhdCBjb250YWlucyBhIG11bHRpcGxpY2F0aW9uIG9mIHR3byB2ZWN0b3JzLlxyXG5cdFx0Ly8vIDwvc3VtbWFyeT5cclxuXHRcdC8vLyA8cGFyYW0gbmFtZT1cInZhbHVlMVwiPlNvdXJjZSA8c2VlIGNyZWY9XCJWZWN0b3IyXCIvPi48L3BhcmFtPlxyXG5cdFx0Ly8vIDxwYXJhbSBuYW1lPVwidmFsdWUyXCI+U291cmNlIDxzZWUgY3JlZj1cIlZlY3RvcjJcIi8+LjwvcGFyYW0+XHJcblx0XHQvLy8gPHJldHVybnM+VGhlIHJlc3VsdCBvZiB0aGUgdmVjdG9yIG11bHRpcGxpY2F0aW9uLjwvcmV0dXJucz5cclxuXHRcdHB1YmxpYyBzdGF0aWMgVmVjdG9yMiBNdWx0aXBseShWZWN0b3IyIHZhbHVlMSwgVmVjdG9yMiB2YWx1ZTIpXHJcblx0XHR7XHJcblx0XHRcdHZhbHVlMS5YICo9IHZhbHVlMi5YO1xyXG5cdFx0XHR2YWx1ZTEuWSAqPSB2YWx1ZTIuWTtcclxuXHRcdFx0cmV0dXJuIHZhbHVlMTtcclxuXHRcdH1cclxuXHJcblx0XHQvLy8gPHN1bW1hcnk+XHJcblx0XHQvLy8gQ3JlYXRlcyBhIG5ldyA8c2VlIGNyZWY9XCJWZWN0b3IyXCIvPiB0aGF0IGNvbnRhaW5zIGEgbXVsdGlwbGljYXRpb24gb2YgdHdvIHZlY3RvcnMuXHJcblx0XHQvLy8gPC9zdW1tYXJ5PlxyXG5cdFx0Ly8vIDxwYXJhbSBuYW1lPVwidmFsdWUxXCI+U291cmNlIDxzZWUgY3JlZj1cIlZlY3RvcjJcIi8+LjwvcGFyYW0+XHJcblx0XHQvLy8gPHBhcmFtIG5hbWU9XCJ2YWx1ZTJcIj5Tb3VyY2UgPHNlZSBjcmVmPVwiVmVjdG9yMlwiLz4uPC9wYXJhbT5cclxuXHRcdC8vLyA8cGFyYW0gbmFtZT1cInJlc3VsdFwiPlRoZSByZXN1bHQgb2YgdGhlIHZlY3RvciBtdWx0aXBsaWNhdGlvbiBhcyBhbiBvdXRwdXQgcGFyYW1ldGVyLjwvcGFyYW0+XHJcblx0XHRwdWJsaWMgc3RhdGljIHZvaWQgTXVsdGlwbHkocmVmIFZlY3RvcjIgdmFsdWUxLCByZWYgVmVjdG9yMiB2YWx1ZTIsIG91dCBWZWN0b3IyIHJlc3VsdClcclxuXHRcdHtcclxuXHRcdFx0cmVzdWx0LlggPSB2YWx1ZTEuWCAqIHZhbHVlMi5YO1xyXG5cdFx0XHRyZXN1bHQuWSA9IHZhbHVlMS5ZICogdmFsdWUyLlk7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8vIDxzdW1tYXJ5PlxyXG5cdFx0Ly8vIENyZWF0ZXMgYSBuZXcgPHNlZSBjcmVmPVwiVmVjdG9yMlwiLz4gdGhhdCBjb250YWlucyBhIG11bHRpcGxpY2F0aW9uIG9mIDxzZWUgY3JlZj1cIlZlY3RvcjJcIi8+IGFuZCBhIHNjYWxhci5cclxuXHRcdC8vLyA8L3N1bW1hcnk+XHJcblx0XHQvLy8gPHBhcmFtIG5hbWU9XCJ2YWx1ZTFcIj5Tb3VyY2UgPHNlZSBjcmVmPVwiVmVjdG9yMlwiLz4uPC9wYXJhbT5cclxuXHRcdC8vLyA8cGFyYW0gbmFtZT1cInNjYWxlRmFjdG9yXCI+U2NhbGFyIHZhbHVlLjwvcGFyYW0+XHJcblx0XHQvLy8gPHJldHVybnM+VGhlIHJlc3VsdCBvZiB0aGUgdmVjdG9yIG11bHRpcGxpY2F0aW9uIHdpdGggYSBzY2FsYXIuPC9yZXR1cm5zPlxyXG5cdFx0cHVibGljIHN0YXRpYyBWZWN0b3IyIE11bHRpcGx5KFZlY3RvcjIgdmFsdWUxLCBmbG9hdCBzY2FsZUZhY3RvcilcclxuXHRcdHtcclxuXHRcdFx0dmFsdWUxLlggKj0gc2NhbGVGYWN0b3I7XHJcblx0XHRcdHZhbHVlMS5ZICo9IHNjYWxlRmFjdG9yO1xyXG5cdFx0XHRyZXR1cm4gdmFsdWUxO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vLyA8c3VtbWFyeT5cclxuXHRcdC8vLyBDcmVhdGVzIGEgbmV3IDxzZWUgY3JlZj1cIlZlY3RvcjJcIi8+IHRoYXQgY29udGFpbnMgYSBtdWx0aXBsaWNhdGlvbiBvZiA8c2VlIGNyZWY9XCJWZWN0b3IyXCIvPiBhbmQgYSBzY2FsYXIuXHJcblx0XHQvLy8gPC9zdW1tYXJ5PlxyXG5cdFx0Ly8vIDxwYXJhbSBuYW1lPVwidmFsdWUxXCI+U291cmNlIDxzZWUgY3JlZj1cIlZlY3RvcjJcIi8+LjwvcGFyYW0+XHJcblx0XHQvLy8gPHBhcmFtIG5hbWU9XCJzY2FsZUZhY3RvclwiPlNjYWxhciB2YWx1ZS48L3BhcmFtPlxyXG5cdFx0Ly8vIDxwYXJhbSBuYW1lPVwicmVzdWx0XCI+VGhlIHJlc3VsdCBvZiB0aGUgbXVsdGlwbGljYXRpb24gd2l0aCBhIHNjYWxhciBhcyBhbiBvdXRwdXQgcGFyYW1ldGVyLjwvcGFyYW0+XHJcblx0XHRwdWJsaWMgc3RhdGljIHZvaWQgTXVsdGlwbHkocmVmIFZlY3RvcjIgdmFsdWUxLCBmbG9hdCBzY2FsZUZhY3Rvciwgb3V0IFZlY3RvcjIgcmVzdWx0KVxyXG5cdFx0e1xyXG5cdFx0XHRyZXN1bHQuWCA9IHZhbHVlMS5YICogc2NhbGVGYWN0b3I7XHJcblx0XHRcdHJlc3VsdC5ZID0gdmFsdWUxLlkgKiBzY2FsZUZhY3RvcjtcclxuXHRcdH1cclxuXHJcblx0XHQvLy8gPHN1bW1hcnk+XHJcblx0XHQvLy8gQ3JlYXRlcyBhIG5ldyA8c2VlIGNyZWY9XCJWZWN0b3IyXCIvPiB0aGF0IGNvbnRhaW5zIHRoZSBzcGVjaWZpZWQgdmVjdG9yIGludmVyc2lvbi5cclxuXHRcdC8vLyA8L3N1bW1hcnk+XHJcblx0XHQvLy8gPHBhcmFtIG5hbWU9XCJ2YWx1ZVwiPlNvdXJjZSA8c2VlIGNyZWY9XCJWZWN0b3IyXCIvPi48L3BhcmFtPlxyXG5cdFx0Ly8vIDxyZXR1cm5zPlRoZSByZXN1bHQgb2YgdGhlIHZlY3RvciBpbnZlcnNpb24uPC9yZXR1cm5zPlxyXG5cdFx0cHVibGljIHN0YXRpYyBWZWN0b3IyIE5lZ2F0ZShWZWN0b3IyIHZhbHVlKVxyXG5cdFx0e1xyXG5cdFx0XHR2YWx1ZS5YID0gLXZhbHVlLlg7XHJcblx0XHRcdHZhbHVlLlkgPSAtdmFsdWUuWTtcclxuXHRcdFx0cmV0dXJuIHZhbHVlO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vLyA8c3VtbWFyeT5cclxuXHRcdC8vLyBDcmVhdGVzIGEgbmV3IDxzZWUgY3JlZj1cIlZlY3RvcjJcIi8+IHRoYXQgY29udGFpbnMgdGhlIHNwZWNpZmllZCB2ZWN0b3IgaW52ZXJzaW9uLlxyXG5cdFx0Ly8vIDwvc3VtbWFyeT5cclxuXHRcdC8vLyA8cGFyYW0gbmFtZT1cInZhbHVlXCI+U291cmNlIDxzZWUgY3JlZj1cIlZlY3RvcjJcIi8+LjwvcGFyYW0+XHJcblx0XHQvLy8gPHBhcmFtIG5hbWU9XCJyZXN1bHRcIj5UaGUgcmVzdWx0IG9mIHRoZSB2ZWN0b3IgaW52ZXJzaW9uIGFzIGFuIG91dHB1dCBwYXJhbWV0ZXIuPC9wYXJhbT5cclxuXHRcdHB1YmxpYyBzdGF0aWMgdm9pZCBOZWdhdGUocmVmIFZlY3RvcjIgdmFsdWUsIG91dCBWZWN0b3IyIHJlc3VsdClcclxuXHRcdHtcclxuXHRcdFx0cmVzdWx0LlggPSAtdmFsdWUuWDtcclxuXHRcdFx0cmVzdWx0LlkgPSAtdmFsdWUuWTtcclxuXHRcdH1cclxuXHJcblx0XHQvLy8gPHN1bW1hcnk+XHJcblx0XHQvLy8gVHVybnMgdGhpcyA8c2VlIGNyZWY9XCJWZWN0b3IyXCIvPiB0byBhIHVuaXQgdmVjdG9yIHdpdGggdGhlIHNhbWUgZGlyZWN0aW9uLlxyXG5cdFx0Ly8vIDwvc3VtbWFyeT5cclxuXHRcdHB1YmxpYyB2b2lkIE5vcm1hbGl6ZSgpXHJcblx0XHR7XHJcblx0XHRcdGZsb2F0IHZhbCA9IDEuMGYgLyAoZmxvYXQpTWF0aC5TcXJ0KChYICogWCkgKyAoWSAqIFkpKTtcclxuXHRcdFx0WCAqPSB2YWw7XHJcblx0XHRcdFkgKj0gdmFsO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vLyA8c3VtbWFyeT5cclxuXHRcdC8vLyBDcmVhdGVzIGEgbmV3IDxzZWUgY3JlZj1cIlZlY3RvcjJcIi8+IHRoYXQgY29udGFpbnMgYSBub3JtYWxpemVkIHZhbHVlcyBmcm9tIGFub3RoZXIgdmVjdG9yLlxyXG5cdFx0Ly8vIDwvc3VtbWFyeT5cclxuXHRcdC8vLyA8cGFyYW0gbmFtZT1cInZhbHVlXCI+U291cmNlIDxzZWUgY3JlZj1cIlZlY3RvcjJcIi8+LjwvcGFyYW0+XHJcblx0XHQvLy8gPHJldHVybnM+VW5pdCB2ZWN0b3IuPC9yZXR1cm5zPlxyXG5cdFx0cHVibGljIHN0YXRpYyBWZWN0b3IyIE5vcm1hbGl6ZShWZWN0b3IyIHZhbHVlKVxyXG5cdFx0e1xyXG5cdFx0XHRmbG9hdCB2YWwgPSAxLjBmIC8gKGZsb2F0KU1hdGguU3FydCgodmFsdWUuWCAqIHZhbHVlLlgpICsgKHZhbHVlLlkgKiB2YWx1ZS5ZKSk7XHJcblx0XHRcdHZhbHVlLlggKj0gdmFsO1xyXG5cdFx0XHR2YWx1ZS5ZICo9IHZhbDtcclxuXHRcdFx0cmV0dXJuIHZhbHVlO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vLyA8c3VtbWFyeT5cclxuXHRcdC8vLyBDcmVhdGVzIGEgbmV3IDxzZWUgY3JlZj1cIlZlY3RvcjJcIi8+IHRoYXQgY29udGFpbnMgYSBub3JtYWxpemVkIHZhbHVlcyBmcm9tIGFub3RoZXIgdmVjdG9yLlxyXG5cdFx0Ly8vIDwvc3VtbWFyeT5cclxuXHRcdC8vLyA8cGFyYW0gbmFtZT1cInZhbHVlXCI+U291cmNlIDxzZWUgY3JlZj1cIlZlY3RvcjJcIi8+LjwvcGFyYW0+XHJcblx0XHQvLy8gPHBhcmFtIG5hbWU9XCJyZXN1bHRcIj5Vbml0IHZlY3RvciBhcyBhbiBvdXRwdXQgcGFyYW1ldGVyLjwvcGFyYW0+XHJcblx0XHRwdWJsaWMgc3RhdGljIHZvaWQgTm9ybWFsaXplKHJlZiBWZWN0b3IyIHZhbHVlLCBvdXQgVmVjdG9yMiByZXN1bHQpXHJcblx0XHR7XHJcblx0XHRcdGZsb2F0IHZhbCA9IDEuMGYgLyAoZmxvYXQpTWF0aC5TcXJ0KCh2YWx1ZS5YICogdmFsdWUuWCkgKyAodmFsdWUuWSAqIHZhbHVlLlkpKTtcclxuXHRcdFx0cmVzdWx0LlggPSB2YWx1ZS5YICogdmFsO1xyXG5cdFx0XHRyZXN1bHQuWSA9IHZhbHVlLlkgKiB2YWw7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8vIDxzdW1tYXJ5PlxyXG5cdFx0Ly8vIENyZWF0ZXMgYSBuZXcgPHNlZSBjcmVmPVwiVmVjdG9yMlwiLz4gdGhhdCBjb250YWlucyByZWZsZWN0IHZlY3RvciBvZiB0aGUgZ2l2ZW4gdmVjdG9yIGFuZCBub3JtYWwuXHJcblx0XHQvLy8gPC9zdW1tYXJ5PlxyXG5cdFx0Ly8vIDxwYXJhbSBuYW1lPVwidmVjdG9yXCI+U291cmNlIDxzZWUgY3JlZj1cIlZlY3RvcjJcIi8+LjwvcGFyYW0+XHJcblx0XHQvLy8gPHBhcmFtIG5hbWU9XCJub3JtYWxcIj5SZWZsZWN0aW9uIG5vcm1hbC48L3BhcmFtPlxyXG5cdFx0Ly8vIDxyZXR1cm5zPlJlZmxlY3RlZCB2ZWN0b3IuPC9yZXR1cm5zPlxyXG5cdFx0cHVibGljIHN0YXRpYyBWZWN0b3IyIFJlZmxlY3QoVmVjdG9yMiB2ZWN0b3IsIFZlY3RvcjIgbm9ybWFsKVxyXG5cdFx0e1xyXG5cdFx0XHRWZWN0b3IyIHJlc3VsdDtcclxuXHRcdFx0ZmxvYXQgdmFsID0gMi4wZiAqICgodmVjdG9yLlggKiBub3JtYWwuWCkgKyAodmVjdG9yLlkgKiBub3JtYWwuWSkpO1xyXG5cdFx0XHRyZXN1bHQuWCA9IHZlY3Rvci5YIC0gKG5vcm1hbC5YICogdmFsKTtcclxuXHRcdFx0cmVzdWx0LlkgPSB2ZWN0b3IuWSAtIChub3JtYWwuWSAqIHZhbCk7XHJcblx0XHRcdHJldHVybiByZXN1bHQ7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8vIDxzdW1tYXJ5PlxyXG5cdFx0Ly8vIENyZWF0ZXMgYSBuZXcgPHNlZSBjcmVmPVwiVmVjdG9yMlwiLz4gdGhhdCBjb250YWlucyByZWZsZWN0IHZlY3RvciBvZiB0aGUgZ2l2ZW4gdmVjdG9yIGFuZCBub3JtYWwuXHJcblx0XHQvLy8gPC9zdW1tYXJ5PlxyXG5cdFx0Ly8vIDxwYXJhbSBuYW1lPVwidmVjdG9yXCI+U291cmNlIDxzZWUgY3JlZj1cIlZlY3RvcjJcIi8+LjwvcGFyYW0+XHJcblx0XHQvLy8gPHBhcmFtIG5hbWU9XCJub3JtYWxcIj5SZWZsZWN0aW9uIG5vcm1hbC48L3BhcmFtPlxyXG5cdFx0Ly8vIDxwYXJhbSBuYW1lPVwicmVzdWx0XCI+UmVmbGVjdGVkIHZlY3RvciBhcyBhbiBvdXRwdXQgcGFyYW1ldGVyLjwvcGFyYW0+XHJcblx0XHRwdWJsaWMgc3RhdGljIHZvaWQgUmVmbGVjdChyZWYgVmVjdG9yMiB2ZWN0b3IsIHJlZiBWZWN0b3IyIG5vcm1hbCwgb3V0IFZlY3RvcjIgcmVzdWx0KVxyXG5cdFx0e1xyXG5cdFx0XHRmbG9hdCB2YWwgPSAyLjBmICogKCh2ZWN0b3IuWCAqIG5vcm1hbC5YKSArICh2ZWN0b3IuWSAqIG5vcm1hbC5ZKSk7XHJcblx0XHRcdHJlc3VsdC5YID0gdmVjdG9yLlggLSAobm9ybWFsLlggKiB2YWwpO1xyXG5cdFx0XHRyZXN1bHQuWSA9IHZlY3Rvci5ZIC0gKG5vcm1hbC5ZICogdmFsKTtcclxuXHRcdH1cclxuXHJcblx0XHQvLy8gPHN1bW1hcnk+XHJcblx0XHQvLy8gQ3JlYXRlcyBhIG5ldyA8c2VlIGNyZWY9XCJWZWN0b3IyXCIvPiB0aGF0IGNvbnRhaW5zIGN1YmljIGludGVycG9sYXRpb24gb2YgdGhlIHNwZWNpZmllZCB2ZWN0b3JzLlxyXG5cdFx0Ly8vIDwvc3VtbWFyeT5cclxuXHRcdC8vLyA8cGFyYW0gbmFtZT1cInZhbHVlMVwiPlNvdXJjZSA8c2VlIGNyZWY9XCJWZWN0b3IyXCIvPi48L3BhcmFtPlxyXG5cdFx0Ly8vIDxwYXJhbSBuYW1lPVwidmFsdWUyXCI+U291cmNlIDxzZWUgY3JlZj1cIlZlY3RvcjJcIi8+LjwvcGFyYW0+XHJcblx0XHQvLy8gPHBhcmFtIG5hbWU9XCJhbW91bnRcIj5XZWlnaHRpbmcgdmFsdWUuPC9wYXJhbT5cclxuXHRcdC8vLyA8cmV0dXJucz5DdWJpYyBpbnRlcnBvbGF0aW9uIG9mIHRoZSBzcGVjaWZpZWQgdmVjdG9ycy48L3JldHVybnM+XHJcblx0XHRwdWJsaWMgc3RhdGljIFZlY3RvcjIgU21vb3RoU3RlcChWZWN0b3IyIHZhbHVlMSwgVmVjdG9yMiB2YWx1ZTIsIGZsb2F0IGFtb3VudClcclxuXHRcdHtcclxuXHRcdFx0cmV0dXJuIG5ldyBWZWN0b3IyKFxyXG5cdFx0XHRcdE1hdGhzLlNtb290aFN0ZXAodmFsdWUxLlgsIHZhbHVlMi5YLCBhbW91bnQpLFxyXG5cdFx0XHRcdE1hdGhzLlNtb290aFN0ZXAodmFsdWUxLlksIHZhbHVlMi5ZLCBhbW91bnQpKTtcclxuXHRcdH1cclxuXHJcblx0XHQvLy8gPHN1bW1hcnk+XHJcblx0XHQvLy8gQ3JlYXRlcyBhIG5ldyA8c2VlIGNyZWY9XCJWZWN0b3IyXCIvPiB0aGF0IGNvbnRhaW5zIGN1YmljIGludGVycG9sYXRpb24gb2YgdGhlIHNwZWNpZmllZCB2ZWN0b3JzLlxyXG5cdFx0Ly8vIDwvc3VtbWFyeT5cclxuXHRcdC8vLyA8cGFyYW0gbmFtZT1cInZhbHVlMVwiPlNvdXJjZSA8c2VlIGNyZWY9XCJWZWN0b3IyXCIvPi48L3BhcmFtPlxyXG5cdFx0Ly8vIDxwYXJhbSBuYW1lPVwidmFsdWUyXCI+U291cmNlIDxzZWUgY3JlZj1cIlZlY3RvcjJcIi8+LjwvcGFyYW0+XHJcblx0XHQvLy8gPHBhcmFtIG5hbWU9XCJhbW91bnRcIj5XZWlnaHRpbmcgdmFsdWUuPC9wYXJhbT5cclxuXHRcdC8vLyA8cGFyYW0gbmFtZT1cInJlc3VsdFwiPkN1YmljIGludGVycG9sYXRpb24gb2YgdGhlIHNwZWNpZmllZCB2ZWN0b3JzIGFzIGFuIG91dHB1dCBwYXJhbWV0ZXIuPC9wYXJhbT5cclxuXHRcdHB1YmxpYyBzdGF0aWMgdm9pZCBTbW9vdGhTdGVwKHJlZiBWZWN0b3IyIHZhbHVlMSwgcmVmIFZlY3RvcjIgdmFsdWUyLCBmbG9hdCBhbW91bnQsIG91dCBWZWN0b3IyIHJlc3VsdClcclxuXHRcdHtcclxuXHRcdFx0cmVzdWx0LlggPSBNYXRocy5TbW9vdGhTdGVwKHZhbHVlMS5YLCB2YWx1ZTIuWCwgYW1vdW50KTtcclxuXHRcdFx0cmVzdWx0LlkgPSBNYXRocy5TbW9vdGhTdGVwKHZhbHVlMS5ZLCB2YWx1ZTIuWSwgYW1vdW50KTtcclxuXHRcdH1cclxuXHJcblx0XHQvLy8gPHN1bW1hcnk+XHJcblx0XHQvLy8gQ3JlYXRlcyBhIG5ldyA8c2VlIGNyZWY9XCJWZWN0b3IyXCIvPiB0aGF0IGNvbnRhaW5zIHN1YnRyYWN0aW9uIG9mIG9uIDxzZWUgY3JlZj1cIlZlY3RvcjJcIi8+IGZyb20gYSBhbm90aGVyLlxyXG5cdFx0Ly8vIDwvc3VtbWFyeT5cclxuXHRcdC8vLyA8cGFyYW0gbmFtZT1cInZhbHVlMVwiPlNvdXJjZSA8c2VlIGNyZWY9XCJWZWN0b3IyXCIvPi48L3BhcmFtPlxyXG5cdFx0Ly8vIDxwYXJhbSBuYW1lPVwidmFsdWUyXCI+U291cmNlIDxzZWUgY3JlZj1cIlZlY3RvcjJcIi8+LjwvcGFyYW0+XHJcblx0XHQvLy8gPHJldHVybnM+VGhlIHJlc3VsdCBvZiB0aGUgdmVjdG9yIHN1YnRyYWN0aW9uLjwvcmV0dXJucz5cclxuXHRcdHB1YmxpYyBzdGF0aWMgVmVjdG9yMiBTdWJ0cmFjdChWZWN0b3IyIHZhbHVlMSwgVmVjdG9yMiB2YWx1ZTIpXHJcblx0XHR7XHJcblx0XHRcdHZhbHVlMS5YIC09IHZhbHVlMi5YO1xyXG5cdFx0XHR2YWx1ZTEuWSAtPSB2YWx1ZTIuWTtcclxuXHRcdFx0cmV0dXJuIHZhbHVlMTtcclxuXHRcdH1cclxuXHJcblx0XHQvLy8gPHN1bW1hcnk+XHJcblx0XHQvLy8gQ3JlYXRlcyBhIG5ldyA8c2VlIGNyZWY9XCJWZWN0b3IyXCIvPiB0aGF0IGNvbnRhaW5zIHN1YnRyYWN0aW9uIG9mIG9uIDxzZWUgY3JlZj1cIlZlY3RvcjJcIi8+IGZyb20gYSBhbm90aGVyLlxyXG5cdFx0Ly8vIDwvc3VtbWFyeT5cclxuXHRcdC8vLyA8cGFyYW0gbmFtZT1cInZhbHVlMVwiPlNvdXJjZSA8c2VlIGNyZWY9XCJWZWN0b3IyXCIvPi48L3BhcmFtPlxyXG5cdFx0Ly8vIDxwYXJhbSBuYW1lPVwidmFsdWUyXCI+U291cmNlIDxzZWUgY3JlZj1cIlZlY3RvcjJcIi8+LjwvcGFyYW0+XHJcblx0XHQvLy8gPHBhcmFtIG5hbWU9XCJyZXN1bHRcIj5UaGUgcmVzdWx0IG9mIHRoZSB2ZWN0b3Igc3VidHJhY3Rpb24gYXMgYW4gb3V0cHV0IHBhcmFtZXRlci48L3BhcmFtPlxyXG5cdFx0cHVibGljIHN0YXRpYyB2b2lkIFN1YnRyYWN0KHJlZiBWZWN0b3IyIHZhbHVlMSwgcmVmIFZlY3RvcjIgdmFsdWUyLCBvdXQgVmVjdG9yMiByZXN1bHQpXHJcblx0XHR7XHJcblx0XHRcdHJlc3VsdC5YID0gdmFsdWUxLlggLSB2YWx1ZTIuWDtcclxuXHRcdFx0cmVzdWx0LlkgPSB2YWx1ZTEuWSAtIHZhbHVlMi5ZO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vLyA8c3VtbWFyeT5cclxuXHRcdC8vLyBSZXR1cm5zIGEgPHNlZSBjcmVmPVwiU3RyaW5nXCIvPiByZXByZXNlbnRhdGlvbiBvZiB0aGlzIDxzZWUgY3JlZj1cIlZlY3RvcjJcIi8+IGluIHRoZSBmb3JtYXQ6XHJcblx0XHQvLy8ge1g6WzxzZWUgY3JlZj1cIlhcIi8+XSBZOls8c2VlIGNyZWY9XCJZXCIvPl19XHJcblx0XHQvLy8gPC9zdW1tYXJ5PlxyXG5cdFx0Ly8vIDxyZXR1cm5zPkEgPHNlZSBjcmVmPVwiU3RyaW5nXCIvPiByZXByZXNlbnRhdGlvbiBvZiB0aGlzIDxzZWUgY3JlZj1cIlZlY3RvcjJcIi8+LjwvcmV0dXJucz5cclxuXHRcdHB1YmxpYyBvdmVycmlkZSBzdHJpbmcgVG9TdHJpbmcoKVxyXG5cdFx0e1xyXG5cdFx0XHRyZXR1cm4gXCJ7WDpcIiArIFggKyBcIiBZOlwiICsgWSArIFwifVwiO1xyXG5cdFx0fVxyXG5cclxuXHRcdCNlbmRyZWdpb25cclxuXHR9XHJcbn0iLCJuYW1lc3BhY2UgSHVtcGVyXHJcbntcclxuXHR1c2luZyBTeXN0ZW07XHJcblx0dXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcblx0dXNpbmcgU3lzdGVtLkxpbnE7XHJcblx0dXNpbmcgQmFzZTtcclxuXHJcblx0Ly8vIDxzdW1tYXJ5PlxyXG5cdC8vLyBCYXNpYyBzcGFjaWFsIGhhc2hpbmcgb2Ygd29ybGQncyBib3hlcy5cclxuXHQvLy8gPC9zdW1tYXJ5PlxyXG5cdHB1YmxpYyBjbGFzcyBHcmlkXHJcblx0e1xyXG5cdFx0cHVibGljIGNsYXNzIENlbGxcclxuXHRcdHtcclxuXHRcdFx0cHVibGljIENlbGwoaW50IHgsIGludCB5LCBmbG9hdCBjZWxsU2l6ZSlcclxuXHRcdFx0e1xyXG5cdFx0XHRcdHRoaXMuQm91bmRzID0gbmV3IFJlY3RhbmdsZUYoeCAqIGNlbGxTaXplLCB5ICogY2VsbFNpemUsIGNlbGxTaXplLCBjZWxsU2l6ZSk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHB1YmxpYyBSZWN0YW5nbGVGIEJvdW5kcyB7IGdldDsgcHJpdmF0ZSBzZXQ7IH1cclxuXHJcblx0XHRcdHB1YmxpYyBJRW51bWVyYWJsZTxJQm94PiBDaGlsZHJlbiB7Z2V0e3JldHVybiB0aGlzLmNoaWxkcmVuO319XHJcblxyXG5cdFx0XHRwcml2YXRlIExpc3Q8SUJveD4gY2hpbGRyZW4gPSBuZXcgTGlzdDxJQm94PigpO1xyXG5cclxuXHRcdFx0cHVibGljIHZvaWQgQWRkKElCb3ggYm94KVxyXG5cdFx0XHR7XHJcblx0XHRcdFx0dGhpcy5jaGlsZHJlbi5BZGQoYm94KTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0cHVibGljIGJvb2wgQ29udGFpbnMoSUJveCBib3gpXHJcblx0XHRcdHtcclxuXHRcdFx0XHRyZXR1cm4gdGhpcy5jaGlsZHJlbi5Db250YWlucyhib3gpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRwdWJsaWMgYm9vbCBSZW1vdmUoSUJveCBib3gpXHJcblx0XHRcdHtcclxuXHRcdFx0XHRyZXR1cm4gdGhpcy5jaGlsZHJlbi5SZW1vdmUoYm94KTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0cHVibGljIGludCBDb3VudCgpXHJcblx0XHRcdHtcclxuXHRcdFx0XHRyZXR1cm4gdGhpcy5jaGlsZHJlbi5Db3VudDtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdHB1YmxpYyBHcmlkKGludCB3aWR0aCwgaW50IGhlaWdodCwgZmxvYXQgY2VsbFNpemUpXHJcblx0XHR7XHJcblx0XHRcdHRoaXMuQ2VsbHMgPSBuZXcgQ2VsbFt3aWR0aCwgaGVpZ2h0XTtcclxuXHRcdFx0dGhpcy5DZWxsU2l6ZSA9IGNlbGxTaXplO1xyXG5cdFx0fVxyXG5cclxuXHRcdHB1YmxpYyBmbG9hdCBDZWxsU2l6ZSB7IGdldDsgc2V0OyB9XHJcblxyXG5cdFx0I3JlZ2lvbiBTaXplXHJcblxyXG5cdFx0cHVibGljIGZsb2F0IFdpZHRoIHtnZXR7cmV0dXJuIHRoaXMuQ29sdW1ucyAqIENlbGxTaXplO319XHJcblxyXG5cdFx0cHVibGljIGZsb2F0IEhlaWdodCB7Z2V0e3JldHVybiB0aGlzLlJvd3MgKiBDZWxsU2l6ZTt9fVxyXG5cclxuXHRcdHB1YmxpYyBpbnQgQ29sdW1ucyB7Z2V0e3JldHVybiB0aGlzLkNlbGxzLkdldExlbmd0aCgwKTt9fVxyXG5cclxuXHRcdHB1YmxpYyBpbnQgUm93cyB7Z2V0e3JldHVybiB0aGlzLkNlbGxzLkdldExlbmd0aCgxKTt9fVxyXG5cclxuXHRcdCNlbmRyZWdpb25cclxuXHJcblx0XHRwdWJsaWMgQ2VsbFssXSBDZWxscyB7IGdldDsgcHJpdmF0ZSBzZXQ7IH1cclxuXHJcblx0XHRwdWJsaWMgSUVudW1lcmFibGU8Q2VsbD4gUXVlcnlDZWxscyhmbG9hdCB4LCBmbG9hdCB5LCBmbG9hdCB3LCBmbG9hdCBoKVxyXG5cdFx0e1xyXG5cdFx0XHR2YXIgbWluWCA9IChpbnQpKHggLyB0aGlzLkNlbGxTaXplKTtcclxuXHRcdFx0dmFyIG1pblkgPSAoaW50KSh5IC8gdGhpcy5DZWxsU2l6ZSk7XHJcblx0XHRcdHZhciBtYXhYID0gKGludCkoKHggKyB3IC0gMSkgLyB0aGlzLkNlbGxTaXplKSArIDE7XHJcblx0XHRcdHZhciBtYXhZID0gKGludCkoKHkgKyBoIC0gMSkgLyB0aGlzLkNlbGxTaXplKSArIDE7XHJcblxyXG5cdFx0XHRtaW5YID0gTWF0aC5NYXgoMCwgbWluWCk7XHJcblx0XHRcdG1pblkgPSBNYXRoLk1heCgwLCBtaW5ZKTtcclxuXHRcdFx0bWF4WCA9IE1hdGguTWluKHRoaXMuQ29sdW1ucyAtIDEsIG1heFgpO1xyXG5cdFx0XHRtYXhZID0gTWF0aC5NaW4odGhpcy5Sb3dzIC0gMSwgbWF4WSk7XHJcblxyXG5cdFx0XHRMaXN0PENlbGw+IHJlc3VsdCA9IG5ldyBMaXN0PENlbGw+KCk7XHJcblxyXG5cdFx0XHRmb3IgKGludCBpeCA9IG1pblg7IGl4IDw9IG1heFg7IGl4KyspXHJcblx0XHRcdHtcclxuXHRcdFx0XHRmb3IgKGludCBpeSA9IG1pblk7IGl5IDw9IG1heFk7IGl5KyspXHJcblx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0dmFyIGNlbGwgPSBDZWxsc1tpeCwgaXldO1xyXG5cclxuXHRcdFx0XHRcdGlmIChjZWxsID09IG51bGwpXHJcblx0XHRcdFx0XHR7XHJcblx0XHRcdFx0XHRcdGNlbGwgPSBuZXcgQ2VsbChpeCxpeSxDZWxsU2l6ZSk7XHJcblx0XHRcdFx0XHRcdENlbGxzW2l4LCBpeV0gPSBjZWxsO1xyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdHJlc3VsdC5BZGQoY2VsbCk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRyZXR1cm4gcmVzdWx0O1xyXG5cclxuXHRcdH1cclxuXHJcblx0XHRwdWJsaWMgSUVudW1lcmFibGU8SUJveD4gUXVlcnlCb3hlcyhmbG9hdCB4LCBmbG9hdCB5LCBmbG9hdCB3LCBmbG9hdCBoKVxyXG5cdFx0e1xyXG5cdFx0XHR2YXIgY2VsbHMgPSB0aGlzLlF1ZXJ5Q2VsbHMoeCwgeSwgdywgaCk7XHJcblxyXG5cdFx0XHRyZXR1cm4gU3lzdGVtLkxpbnEuRW51bWVyYWJsZS5TZWxlY3RNYW55PGdsb2JhbDo6SHVtcGVyLkdyaWQuQ2VsbCxnbG9iYWw6Okh1bXBlci5JQm94PihjZWxscywoZ2xvYmFsOjpTeXN0ZW0uRnVuYzxnbG9iYWw6Okh1bXBlci5HcmlkLkNlbGwsIGdsb2JhbDo6U3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWMuSUVudW1lcmFibGU8Z2xvYmFsOjpIdW1wZXIuSUJveD4+KSgoY2VsbCkgPT4gY2VsbC5DaGlsZHJlbikpLkRpc3RpbmN0KCk7XHJcblx0XHR9XHJcblxyXG5cdFx0cHVibGljIHZvaWQgQWRkKElCb3ggYm94KVxyXG5cdFx0e1xyXG5cdFx0XHR2YXIgY2VsbHMgPSB0aGlzLlF1ZXJ5Q2VsbHMoYm94LlgsIGJveC5ZLCBib3guV2lkdGgsIGJveC5IZWlnaHQpO1xyXG5cclxuXHRcdFx0Zm9yZWFjaCAodmFyIGNlbGwgaW4gY2VsbHMpXHJcblx0XHRcdHtcclxuXHRcdFx0XHRpZighY2VsbC5Db250YWlucyhib3gpKVxyXG5cdFx0XHRcdFx0Y2VsbC5BZGQoYm94KTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdHB1YmxpYyB2b2lkIFVwZGF0ZShJQm94IGJveCwgUmVjdGFuZ2xlRiBmcm9tKVxyXG5cdFx0e1xyXG5cdFx0XHR2YXIgZnJvbUNlbGxzID0gdGhpcy5RdWVyeUNlbGxzKGZyb20uWCwgZnJvbS5ZLCBmcm9tLldpZHRoLCBmcm9tLkhlaWdodCk7XHJcblx0XHRcdHZhciByZW1vdmVkID0gZmFsc2U7XHJcblx0XHRcdGZvcmVhY2ggKHZhciBjZWxsIGluIGZyb21DZWxscylcclxuXHRcdFx0e1xyXG5cdFx0XHRcdHJlbW92ZWQgfD0gY2VsbC5SZW1vdmUoYm94KTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYocmVtb3ZlZClcclxuXHRcdFx0XHR0aGlzLkFkZChib3gpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHB1YmxpYyBib29sIFJlbW92ZShJQm94IGJveClcclxuXHRcdHtcclxuXHRcdFx0dmFyIGNlbGxzID0gdGhpcy5RdWVyeUNlbGxzKGJveC5YLCBib3guWSwgYm94LldpZHRoLCBib3guSGVpZ2h0KTtcclxuXHJcblx0XHRcdHZhciByZW1vdmVkID0gZmFsc2U7XHJcblx0XHRcdGZvcmVhY2ggKHZhciBjZWxsIGluIGNlbGxzKVxyXG5cdFx0XHR7XHJcblx0XHRcdFx0cmVtb3ZlZCB8PSBjZWxsLlJlbW92ZShib3gpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRyZXR1cm4gcmVtb3ZlZDtcclxuXHRcdH1cclxuXHJcblx0XHRwdWJsaWMgb3ZlcnJpZGUgc3RyaW5nIFRvU3RyaW5nKClcclxuXHRcdHtcclxuXHRcdFx0cmV0dXJuIHN0cmluZy5Gb3JtYXQoXCJbR3JpZDogV2lkdGg9ezB9LCBIZWlnaHQ9ezF9LCBDb2x1bW5zPXsyfSwgUm93cz17M31dXCIsIFdpZHRoLCBIZWlnaHQsIENvbHVtbnMsIFJvd3MpO1xyXG5cdFx0fVxyXG5cdH1cclxufVxyXG5cclxuIiwidXNpbmcgSnVpY2VCb3hFbmdpbmUuTWF0aDtcclxudXNpbmcgSnVpY2VCb3hFbmdpbmUuUmVzb3VyY2VzO1xyXG51c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uTGlucTtcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcbnVzaW5nIFN5c3RlbS5UaHJlYWRpbmcuVGFza3M7XHJcblxyXG5uYW1lc3BhY2UgSnVpY2VCb3hFbmdpbmUuR3JhcGhpY3MuRGVidWdnaW5nXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBEZWJ1Z1JlbmRlcmVyXHJcbiAgICB7XHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgRGVidWdSZW5kZXJlciBfaW5zdGFuY2U7XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBEZWJ1Z1JlbmRlcmVyIEluc3RhbmNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBnZXRcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYgKF9pbnN0YW5jZSA9PSBudWxsKVxyXG4gICAgICAgICAgICAgICAgICAgIF9pbnN0YW5jZSA9IG5ldyBEZWJ1Z1JlbmRlcmVyKCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gX2luc3RhbmNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8vIFRoZSBkZWJ1ZyByZW5kZXJlciBoYXMgaGlzIG93biByZXNyb3VjZSBtYW5hZ2VyLlxyXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgcHJpdmF0ZSBSZXNvdXJjZU1hbmFnZXIgX21hbmFnZXI7XHJcblxyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cclxuICAgICAgICAvLy8gTGluZSBvYmplY3QsIGZvciBzdG9yaW5nIGNhbGxzIHRvIHRoZSBEZWJ1ZyBSZW5kZXJlci5cclxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgICAgIHByaXZhdGUgc3RydWN0IExpbmVcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHB1YmxpYyBWZWN0b3IyIHN0YXJ0O1xyXG4gICAgICAgICAgICBwdWJsaWMgVmVjdG9yMiBlbmQ7XHJcbiAgICAgICAgICAgIHB1YmxpYyBDb2xvcjMyIGNvbG9yO1xyXG4gICAgICAgICAgICBwdWJsaWMgZmxvYXQgd2lkdGg7XHJcblxyXG4gICAgICAgICAgICBwdWJsaWMgTGluZShWZWN0b3IyIHN0YXJ0LCBWZWN0b3IyIGVuZCwgQ29sb3IzMiBjb2xvciwgZmxvYXQgd2lkdGgpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RhcnQgPSBzdGFydDtcclxuICAgICAgICAgICAgICAgIHRoaXMuZW5kID0gZW5kO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jb2xvciA9IGNvbG9yO1xyXG4gICAgICAgICAgICAgICAgdGhpcy53aWR0aCA9IHdpZHRoO1xyXG5cclxuICAgICAgICAgICAgICAgIGNvbW1hbmQgPSBuZXcgR3JhcGhpY3NDb21tYW5kKCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHB1YmxpYyBHcmFwaGljc0NvbW1hbmQgY29tbWFuZDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgTGlzdDxMaW5lPiBfbGluZXM7XHJcblxyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cclxuICAgICAgICAvLy8gRHJhd3MgYSByZWN0YW5nbGUgaW4gd29ybGQgc3BhY2UgZm9yIGRlYnVnZ2luZyBwdXJwb3Nlcy5cclxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cInJlY3RcIj5UaGUgcmVjdGFuZ2xlIHRvIGRyYXcuPC9wYXJhbT5cclxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJjb2xvclwiPlRoZSBjb2xvciBvZiB0aGUgbGluZXMuPC9wYXJhbT5cclxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJ3aWR0aFwiPldpZHRoIG9mIHRoZSBsaW5lcy48L3BhcmFtPlxyXG4gICAgICAgIHB1YmxpYyB2b2lkIERyYXdSZWN0KFJlY3RhbmdsZSByZWN0LCBDb2xvcjMyIGNvbG9yLCBmbG9hdCB3aWR0aClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIERyYXdMaW5lKG5ldyBWZWN0b3IyKHJlY3QuWCwgcmVjdC5ZKSwgbmV3IFZlY3RvcjIocmVjdC5YICsgcmVjdC5XaWR0aCwgcmVjdC5ZKSwgY29sb3IsIHdpZHRoKTtcclxuICAgICAgICAgICAgRHJhd0xpbmUobmV3IFZlY3RvcjIocmVjdC5YLCByZWN0LlkpLCBuZXcgVmVjdG9yMihyZWN0LlgsIHJlY3QuWSArIHJlY3QuSGVpZ2h0KSwgY29sb3IsIHdpZHRoKTtcclxuICAgICAgICAgICAgRHJhd0xpbmUobmV3IFZlY3RvcjIocmVjdC5YLCByZWN0LlkgKyByZWN0LkhlaWdodCksIG5ldyBWZWN0b3IyKHJlY3QuWCArIHJlY3QuV2lkdGgsIHJlY3QuWSArIHJlY3QuSGVpZ2h0KSwgY29sb3IsIHdpZHRoKTtcclxuICAgICAgICAgICAgRHJhd0xpbmUobmV3IFZlY3RvcjIocmVjdC5YICsgcmVjdC5XaWR0aCwgcmVjdC5ZKSwgbmV3IFZlY3RvcjIocmVjdC5YICsgcmVjdC5XaWR0aCwgcmVjdC5ZICsgcmVjdC5IZWlnaHQpLCBjb2xvciwgd2lkdGgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgICAgIC8vLyBEcmF3cyBhIHN0cmFpZ2h0IGxpbmUgYmV0d2VlbiB0d28gcG9pbnRzIGluIHdvcmxkIHNwYWNlIGZvciBkZWJ1Z2dpbmcgcHVycG9zZXMuXHJcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cclxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJzdGFydFwiPlRoZSBzdGFydGluZyBwb2ludC48L3BhcmFtPlxyXG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cImVuZFwiPlRoZSBlbmQgcG9pbnQuPC9wYXJhbT5cclxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJjb2xvclwiPkNvbG9yIG9mIHRoZSBsaW5lLjwvcGFyYW0+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwid2lkdGhcIj5XaWR0aCBvZiB0aGUgbGluZS48L3BhcmFtPlxyXG4gICAgICAgIHB1YmxpYyB2b2lkIERyYXdMaW5lKFZlY3RvcjIgc3RhcnQsIFZlY3RvcjIgZW5kLCBDb2xvcjMyIGNvbG9yLCBmbG9hdCB3aWR0aCA9IDEuMGYpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBMaW5lIGxpbmUgPSBuZXcgTGluZShzdGFydCwgZW5kLCBjb2xvciwgd2lkdGgpO1xyXG4gICAgICAgICAgICBsaW5lLmNvbW1hbmQuUHJvZ3JhbSA9IF9tYW5hZ2VyLkxvYWQoXCJTaGFkZXJzL0RlYnVnLnZlcnRcIikgYXMgU2hhZGVyUHJvZ3JhbTtcclxuXHJcbiAgICAgICAgICAgIFZlY3RvcjIgZGlyZWN0aW9uID0gKGVuZCAtIHN0YXJ0KTtcclxuICAgICAgICAgICAgVmVjdG9yMiBwZXJwZW5kaWN1bGFyID0gbmV3IFZlY3RvcjIoZGlyZWN0aW9uLlksIC1kaXJlY3Rpb24uWCk7XHJcbiAgICAgICAgICAgIHBlcnBlbmRpY3VsYXIuTm9ybWFsaXplKCk7XHJcblxyXG4gICAgICAgICAgICBmbG9hdCBoV2lkdGggPSB3aWR0aCAvIDIuMGY7XHJcblxyXG4gICAgICAgICAgICBmbG9hdFtdIGRhdGEgPSBuZXcgZmxvYXRbMThdXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHN0YXJ0LlggKyAocGVycGVuZGljdWxhci5YICogaFdpZHRoKSwgc3RhcnQuWSArIChwZXJwZW5kaWN1bGFyLlkgKiBoV2lkdGgpLCAwLjBmLFxyXG4gICAgICAgICAgICAgICAgZW5kLlggKyAocGVycGVuZGljdWxhci5YICogaFdpZHRoKSwgZW5kLlkgKyAocGVycGVuZGljdWxhci5ZICogaFdpZHRoKSwgMC4wZixcclxuICAgICAgICAgICAgICAgIHN0YXJ0LlggLSAocGVycGVuZGljdWxhci5YICogaFdpZHRoKSwgc3RhcnQuWSAtIChwZXJwZW5kaWN1bGFyLlkgKiBoV2lkdGgpLCAwLjBmLFxyXG5cclxuICAgICAgICAgICAgICAgIGVuZC5YICsgKHBlcnBlbmRpY3VsYXIuWCAqIGhXaWR0aCksIGVuZC5ZICsgKHBlcnBlbmRpY3VsYXIuWSAqIGhXaWR0aCksIDAuMGYsXHJcbiAgICAgICAgICAgICAgICBlbmQuWCAtIChwZXJwZW5kaWN1bGFyLlggKiBoV2lkdGgpLCBlbmQuWSAtIChwZXJwZW5kaWN1bGFyLlkgKiBoV2lkdGgpLCAwLjBmLFxyXG4gICAgICAgICAgICAgICAgc3RhcnQuWCAtIChwZXJwZW5kaWN1bGFyLlggKiBoV2lkdGgpLCBzdGFydC5ZIC0gKHBlcnBlbmRpY3VsYXIuWSAqIGhXaWR0aCksIDAuMGYsXHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICBsaW5lLmNvbW1hbmQuVmVydGV4QnVmZmVyID0gbmV3IFZlcnRleEJ1ZmZlcihkYXRhKTtcclxuICAgICAgICAgICAgbGluZS5jb21tYW5kLlZlcnRleEJ1ZmZlci5TZXRBdHRyaWJ1dGUobmV3IFZlcnRleEF0dHJpYnV0ZShcImFfcG9zXCIsIDMsIGZhbHNlLCAxMiwgMCkpO1xyXG4gICAgICAgICAgICBsaW5lLmNvbW1hbmQuRGF0YS5BZGQoXCJ1X2NvbG9yXCIsIGNvbG9yKTtcclxuICAgICAgICAgICAgX2xpbmVzLkFkZChsaW5lKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cclxuICAgICAgICAvLy8gUmVuZGVyIGFsbCBjYWxsZWQgZGVidWcgY2FsbHMuXHJcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cclxuICAgICAgICBwdWJsaWMgdm9pZCBSZW5kZXIoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgR3JhcGhpY3NDb250ZXh0IGNvbnRleHQgPSBHcmFwaGljc01hbmFnZXIuSW5zdGFuY2UuQ29udGV4dDtcclxuICAgICAgICAgICAgY29udGV4dC5Vc2VEZXB0aChmYWxzZSk7XHJcblxyXG4gICAgICAgICAgICBmb3JlYWNoKExpbmUgbCBpbiBfbGluZXMpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGNvbnRleHQuQ29tbWFuZChsLmNvbW1hbmQpO1xyXG4gICAgICAgICAgICAgICAgbC5jb21tYW5kLlZlcnRleEJ1ZmZlci5EaXNwb3NlKCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIF9saW5lcy5DbGVhcigpO1xyXG5cclxuICAgICAgICAgICAgY29udGV4dC5Vc2VEZXB0aCh0cnVlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cclxuICAgICAgICAvLy8gUHJpdmF0ZSBjb250cnVjdG9yLlxyXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgcHJpdmF0ZSBEZWJ1Z1JlbmRlcmVyKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8vIENyZWF0ZSBhIG93biBsb2FkZXIgZm9yIHRoZSBkZWJ1ZyByZW5kZXJlci5cclxuICAgICAgICAgICAgX21hbmFnZXIgPSBuZXcgUmVzb3VyY2VNYW5hZ2VyKCk7XHJcbiAgICAgICAgICAgIF9tYW5hZ2VyLlJlZ2lzdGVyUmVzb3VyY2VNYW5hZ2VyKG5ldyBTaGFkZXJSZXNvdXJjZUxvYWRlcihcIkRlYnVnTG9hZGVyXCIsIFwidmVydFwiKSk7XHJcbiAgICAgICAgICAgIF9tYW5hZ2VyLlJlZ2lzdGVyUmVzb3VyY2VNYW5hZ2VyKG5ldyBTaGFkZXJSZXNvdXJjZUxvYWRlcihcIkRlYnVnTG9hZGVyXCIsIFwiZnJhZ1wiKSk7XHJcblxyXG4gICAgICAgICAgICBfbGluZXMgPSBuZXcgTGlzdDxMaW5lPigpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJ1c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uTGlucTtcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcbnVzaW5nIFN5c3RlbS5UaHJlYWRpbmcuVGFza3M7XHJcblxyXG5uYW1lc3BhY2UgSnVpY2VCb3hFbmdpbmUuUmVzb3VyY2VzXHJcbntcclxuICAgIHB1YmxpYyBhYnN0cmFjdCBjbGFzcyBSZXNvdXJjZUxvYWRlclxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBzdHJpbmcgRXh0ZW5zaW9uIHsgZ2V0OyBwcml2YXRlIHNldDsgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RyaW5nIE5hbWUgeyBnZXQ7IHByaXZhdGUgc2V0OyB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBSZXNvdXJjZUxvYWRlcihzdHJpbmcgbmFtZSwgc3RyaW5nIGV4dGVuc2lvbilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIEV4dGVuc2lvbiA9IGV4dGVuc2lvbjtcclxuICAgICAgICAgICAgTmFtZSA9IG5hbWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgYWJzdHJhY3QgSVJlc291cmNlIExvYWQoc3RyaW5nIHBhdGgpO1xyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIEp1aWNlQm94RW5naW5lLk1hdGg7XHJcbnVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5MaW5xO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxudXNpbmcgU3lzdGVtLlRocmVhZGluZy5UYXNrcztcclxuXHJcbm5hbWVzcGFjZSBKdWljZUJveEVuZ2luZS5HcmFwaGljc1xyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgR3JhcGhpY3NDb21tYW5kXHJcbiAgICB7XHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlRoZSBzaGFkZXIgdG8gdXNlLjwvc3VtbWFyeT5cclxuICAgICAgICBwdWJsaWMgU2hhZGVyUHJvZ3JhbSBQcm9ncmFtIHsgZ2V0OyBzZXQ7IH1cclxuXHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlRoZSB2ZXJ0ZXhidWZmZXIgdG8gdXNlLjwvc3VtbWFyeT5cclxuICAgICAgICBwdWJsaWMgVmVydGV4QnVmZmVyIFZlcnRleEJ1ZmZlciB7IGdldDsgc2V0OyB9XHJcblxyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5UaGUgd29ybGQgbWF0cml4IHRvIHVzZS48L3N1bW1hcnk+XHJcbiAgICAgICAgcHVibGljIE1hdHJpeDQgV29ybGRNYXRyaXggeyBnZXQ7IHNldDsgfVxyXG5cclxuICAgICAgICAvLy8gPHN1bW1hcnk+RXh0cmEgZGF0YSBmb3IgdGhlIHNoYWRlci48L3N1bW1hcnk+XHJcbiAgICAgICAgcHVibGljIERpY3Rpb25hcnk8c3RyaW5nLCBvYmplY3Q+IERhdGEgeyBnZXQ7IHByaXZhdGUgc2V0OyB9XHJcblxyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cclxuICAgICAgICAvLy8gRGVmYXVsdCBjb25zdHJ1Y3Rvci5cclxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgICAgIHB1YmxpYyBHcmFwaGljc0NvbW1hbmQoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgRGF0YSA9IG5ldyBEaWN0aW9uYXJ5PHN0cmluZywgb2JqZWN0PigpO1xyXG4gICAgICAgICAgICBXb3JsZE1hdHJpeCA9IG5ldyBNYXRyaXg0KDEuMGYpO1xyXG4gICAgICAgICAgICBWZXJ0ZXhCdWZmZXIgPSBudWxsO1xyXG4gICAgICAgICAgICBQcm9ncmFtID0gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwidXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLkxpbnE7XHJcbnVzaW5nIFN5c3RlbS5UZXh0O1xyXG51c2luZyBTeXN0ZW0uVGhyZWFkaW5nLlRhc2tzO1xyXG51c2luZyBCcmlkZ2UuV2ViR0w7XHJcbnVzaW5nIEJyaWRnZS5IdG1sNTtcclxudXNpbmcgSnVpY2VCb3hFbmdpbmUuTWF0aDtcclxudXNpbmcgSnVpY2VCb3hFbmdpbmUuVXRpbDtcclxuXHJcbm5hbWVzcGFjZSBKdWljZUJveEVuZ2luZS5HcmFwaGljc1xyXG57XHJcbiAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAvLy8gUmVzcG9uc2libGUgZm9yIGFsbCByZW5kZXJpbmcgY2FsbHMgdG8gV2ViR0wuXHJcbiAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgcHVibGljIGNsYXNzIEdyYXBoaWNzQ29udGV4dFxyXG4gICAge1xyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cclxuICAgICAgICAvLy8gVGhlIEdMIGNvbnRleHQgZm9yIGEgY2FudmFzLlxyXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgcHJpdmF0ZSBXZWJHTFJlbmRlcmluZ0NvbnRleHQgX2dsO1xyXG5cclxuICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8vIFRoZSBjYW52YXMgdG8gcmVuZGVyIHRvLlxyXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgcHJpdmF0ZSBIVE1MQ2FudmFzRWxlbWVudCBfY2FudmFzO1xyXG5cclxuICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8vIFRoZSBkZWZhdWx0IHNoYWRlciB2YWx1ZXMuXHJcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cclxuICAgICAgICBwcml2YXRlIERpY3Rpb25hcnk8RGVmYXVsdFNoYWRlclZhbHVlcywgb2JqZWN0PiBfc2hhZGVyVmFsdWVzO1xyXG5cclxuICAgICAgICBwcml2YXRlIGludCBfdGV4dHVyZUNvdW50O1xyXG5cclxuICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8vIENvbnN0cnVjdG9yLiBJbml0aWFsaXplcyBHTCBjb250ZXh0LlxyXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwiY2FudmFzXCI+PC9wYXJhbT5cclxuICAgICAgICBwdWJsaWMgR3JhcGhpY3NDb250ZXh0KEhUTUxDYW52YXNFbGVtZW50IGNhbnZhcylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIF9jYW52YXMgPSBjYW52YXM7XHJcbiAgICAgICAgICAgIF9nbCA9IEdldENvbnRleHQoY2FudmFzKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChfZ2wgPT0gbnVsbClcclxuICAgICAgICAgICAgICAgIFN5c3RlbS5Db25zb2xlLldyaXRlTGluZShcIlVuYWJsZSB0byBpbml0aWFsaXplIFdlYkdMIGNvbnRleHQhXCIpO1xyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICBTeXN0ZW0uQ29uc29sZS5Xcml0ZUxpbmUoXCJJbml0aWFsaXplZCBXZWJHTCFcIik7XHJcblxyXG4gICAgICAgICAgICBfc2hhZGVyVmFsdWVzID0gbmV3IERpY3Rpb25hcnk8RGVmYXVsdFNoYWRlclZhbHVlcywgb2JqZWN0PigpO1xyXG5cclxuICAgICAgICAgICAgX2dsLkVuYWJsZShfZ2wuQkxFTkQpO1xyXG4gICAgICAgICAgICBfZ2wuQmxlbmRGdW5jKF9nbC5TUkNfQUxQSEEsIF9nbC5PTkVfTUlOVVNfU1JDX0FMUEhBKTtcclxuICAgICAgICAgICAgX2dsLkVuYWJsZShfZ2wuREVQVEhfVEVTVCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8vIEdldHMgdGhlIFdlYkdMIGNvbnRleHQuXHJcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cclxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJjYW52YXNcIj5UaGUgY2FudmFzIHRvIGdldCB0aGUgY29udGV4dCBvbi48L3BhcmFtPlxyXG4gICAgICAgIC8vLyA8cmV0dXJucz5BIDxzZWUgY3JlZj1cIldlYkdMUmVuZGVyaW5nQ29udGV4dFwiLz4gb3IgbnVsbCBpZiBpdCBmYWlscy48L3JldHVybnM+XHJcbiAgICAgICAgcHJpdmF0ZSBXZWJHTFJlbmRlcmluZ0NvbnRleHQgR2V0Q29udGV4dChIVE1MQ2FudmFzRWxlbWVudCBjYW52YXMpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBXZWJHTFJlbmRlcmluZ0NvbnRleHQgY29udGV4dCA9IG51bGw7XHJcblxyXG4gICAgICAgICAgICBzdHJpbmdbXSBuYW1lcyA9IG5ldyBzdHJpbmdbXVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBcIndlYmdsXCIsXHJcbiAgICAgICAgICAgICAgICBcImV4cGVyaW1lbnRhbC13ZWJnbFwiLFxyXG4gICAgICAgICAgICAgICAgXCJ3ZWJraXQtM2RcIixcclxuICAgICAgICAgICAgICAgIFwibW96LXdlYmdsXCJcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIGZvcmVhY2ggKHN0cmluZyBuYW1lIGluIG5hbWVzKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0cnlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBjb250ZXh0ID0gY2FudmFzLkdldENvbnRleHQobmFtZSkuQXM8V2ViR0xSZW5kZXJpbmdDb250ZXh0PigpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY2F0Y2ggKEV4Y2VwdGlvbiBleClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBTeXN0ZW0uQ29uc29sZS5Xcml0ZUxpbmUoZXgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmIChjb250ZXh0ICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBjb250ZXh0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgICAgIC8vLyBDbGVhciB0aGUgY3VycmVudGx5IGJvdW5kIGZyYW1lYnVmZmVyIGFuZCBkZXB0aCBidWZmZXIuXHJcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cclxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJjb2xvclwiPlRoZSBjb2xvciB0byBjbGVhciB0by48L3BhcmFtPlxyXG4gICAgICAgIHB1YmxpYyB2b2lkIENsZWFyKENvbG9yMzIgY29sb3IpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBfZ2wuQ2xlYXJDb2xvcihjb2xvci5SLCBjb2xvci5HLCBjb2xvci5CLCBjb2xvci5BKTtcclxuICAgICAgICAgICAgX2dsLkNsZWFyKF9nbC5DT0xPUl9CVUZGRVJfQklUIHwgX2dsLkRFUFRIX0JVRkZFUl9CSVQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgICAgIC8vLyBHZXQgcGl4ZWxzIG9mIGEgdGV4dHVyZS5cclxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cInRleHR1cmVcIj5UaGUgdGV4dHVyZSB0byBnZXQgcGl4ZWxzIGZyb20uPC9wYXJhbT5cclxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJyZWN0XCI+QW4gcmVjdGFuZ2xlIHJlcHJlc2VudGluZyB0aGUgYXJlYSBvZiBwaXhlbHMgdG8gZ2V0LjwvcGFyYW0+XHJcbiAgICAgICAgLy8vIDxyZXR1cm5zPjwvcmV0dXJucz5cclxuICAgICAgICBwdWJsaWMgQ29sb3IzMltdIEdldFBpeGVscyhUZXh0dXJlMkQgdGV4dHVyZSwgUmVjdGFuZ2xlIHJlY3QpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBfZ2wuQmluZFRleHR1cmUoX2dsLlRFWFRVUkVfMkQsIHRleHR1cmUuVGV4dHVyZSk7XHJcblxyXG4gICAgICAgICAgICAvLyBDcmVhdGUgZnJhbWVidWZmZXIgc28gd2UgY2FuIHJlYWQgcGl4ZWxzIGZyb20gaXQgdXNpbmcgZ2xSZWFkUGl4ZWxzKCk7XHJcbiAgICAgICAgICAgIFdlYkdMRnJhbWVidWZmZXIgZnJhbWVCdWZmZXIgPSBfZ2wuQ3JlYXRlRnJhbWVidWZmZXIoKTtcclxuICAgICAgICAgICAgX2dsLkJpbmRGcmFtZWJ1ZmZlcihfZ2wuRlJBTUVCVUZGRVIsIGZyYW1lQnVmZmVyKTtcclxuICAgICAgICAgICAgX2dsLkZyYW1lYnVmZmVyVGV4dHVyZTJEKF9nbC5GUkFNRUJVRkZFUiwgX2dsLkNPTE9SX0FUVEFDSE1FTlQwLCBfZ2wuVEVYVFVSRV8yRCwgdGV4dHVyZS5UZXh0dXJlLCAwKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChfZ2wuQ2hlY2tGcmFtZWJ1ZmZlclN0YXR1cyhfZ2wuRlJBTUVCVUZGRVIpID09IF9nbC5GUkFNRUJVRkZFUl9DT01QTEVURSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgLy8gQ3JlYXRlIGEgZmxvYXQgYXJyYXkgd2l0aCBlbm91Z2ggc3BhY2UgZm9yIGFsbCBjb2xvcnMgaW4gdGhlIHJlY3QuXHJcbiAgICAgICAgICAgICAgICBVaW50OEFycmF5IGRhdGEgPSBuZXcgVWludDhBcnJheShyZWN0LldpZHRoICogcmVjdC5IZWlnaHQgKiA0KTtcclxuXHJcbiAgICAgICAgICAgICAgICBfZ2wuUmVhZFBpeGVscyhyZWN0LlgsIHJlY3QuWSwgcmVjdC5XaWR0aCwgcmVjdC5IZWlnaHQsIF9nbC5SR0JBLCBfZ2wuVU5TSUdORURfQllURSwgZGF0YSk7XHJcblxyXG4gICAgICAgICAgICAgICAgQ29sb3IzMltdIGNvbG9ycyA9IG5ldyBDb2xvcjMyW3JlY3QuV2lkdGggKiByZWN0LkhlaWdodF07XHJcbiAgICAgICAgICAgICAgICBmb3IgKGludCBpID0gMDsgaSA8IGRhdGEuTGVuZ3RoOyArK2kpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29sb3JzW2ldID0gbmV3IENvbG9yMzIoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGFbaSAqIDRdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhW2kgKiA0ICsgMV0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGFbaSAqIDQgKyAyXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YVtpICogNCArIDNdXHJcbiAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIENsZWFuIHVwLlxyXG4gICAgICAgICAgICBfZ2wuQmluZEZyYW1lYnVmZmVyKF9nbC5GUkFNRUJVRkZFUiwgbnVsbCk7XHJcbiAgICAgICAgICAgIF9nbC5EZWxldGVGcmFtZWJ1ZmZlcihmcmFtZUJ1ZmZlcik7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cclxuICAgICAgICAvLy8gU2V0IGEgZ2xvYmFsIHNoYWRlciB2YWx1ZS5cclxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgICAgIHB1YmxpYyB2b2lkIFNldEdsb2JhbFNoYWRlclZhbHVlKERlZmF1bHRTaGFkZXJWYWx1ZXMga2V5LCBvYmplY3QgdmFsdWUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAoX3NoYWRlclZhbHVlcy5Db250YWluc0tleShrZXkpKVxyXG4gICAgICAgICAgICAgICAgX3NoYWRlclZhbHVlc1trZXldID0gdmFsdWU7XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIF9zaGFkZXJWYWx1ZXMuQWRkKGtleSwgdmFsdWUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgICAgIC8vLyBSZW5kZXIgYSBjb21tYW5kLlxyXG4gICAgICAgIC8vLyBDb21tYW5kcyBuZWVkIGF0IGxlYXN0IGEgdmFsaWQgdmVydGV4YnVmZmVyIGFuZCBzaGFkZXIgcHJvZ3JhbS5cclxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cImNvbW1hbmRcIj5UaGUgY29tbWFuZCB0byByZW5kZXIuPC9wYXJhbT5cclxuICAgICAgICBwdWJsaWMgdm9pZCBDb21tYW5kKEdyYXBoaWNzQ29tbWFuZCBjb21tYW5kKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy8gVmVydGV4YnVmZmVycyB2ZXJ0ZXggY291bnQgbXVzdCBub3QgYmUgMC5cclxuICAgICAgICAgICAgaWYgKGNvbW1hbmQuVmVydGV4QnVmZmVyLlZlcnRDb3VudCA9PSAwKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgLy8gU2V0IHdvcmxkIG1hdHJpeC5cclxuICAgICAgICAgICAgU2V0R2xvYmFsU2hhZGVyVmFsdWUoRGVmYXVsdFNoYWRlclZhbHVlcy5XT1JMRCwgY29tbWFuZC5Xb3JsZE1hdHJpeCk7XHJcblxyXG4gICAgICAgICAgICAvLyBTZXQgY3VycmVudCBwcm9ncmFtLlxyXG4gICAgICAgICAgICBfZ2wuVXNlUHJvZ3JhbShjb21tYW5kLlByb2dyYW0uUHJvZ3JhbSk7XHJcbiAgICAgICAgICAgIF9nbC5CaW5kQnVmZmVyKF9nbC5BUlJBWV9CVUZGRVIsIGNvbW1hbmQuVmVydGV4QnVmZmVyLkJ1ZmZlcik7XHJcblxyXG4gICAgICAgICAgICAvLyBTZXQgdmVydGV4IGF0dHJpYnMuXHJcbiAgICAgICAgICAgIExpc3Q8VmVydGV4QXR0cmlidXRlPiBhdHRyaWJzID0gY29tbWFuZC5WZXJ0ZXhCdWZmZXIuQXR0cmlidXRlcztcclxuICAgICAgICAgICAgZm9yIChpbnQgaSA9IDA7IGkgPCBhdHRyaWJzLkNvdW50OyArK2kpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFZlcnRleEF0dHJpYnV0ZSBhdHRyaWIgPSBhdHRyaWJzW2ldO1xyXG5cclxuICAgICAgICAgICAgICAgIGludCBsb2MgPSBfZ2wuR2V0QXR0cmliTG9jYXRpb24oY29tbWFuZC5Qcm9ncmFtLlByb2dyYW0sIGF0dHJpYi5OYW1lKTtcclxuICAgICAgICAgICAgICAgIF9nbC5WZXJ0ZXhBdHRyaWJQb2ludGVyKGxvYywgYXR0cmliLkNvbXBvbmVudHMsIF9nbC5GTE9BVCwgYXR0cmliLk5vcm1hbGl6ZSwgYXR0cmliLlN0cmlkZSwgYXR0cmliLk9mZnNldCk7XHJcbiAgICAgICAgICAgICAgICBfZ2wuRW5hYmxlVmVydGV4QXR0cmliQXJyYXkoaSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIF90ZXh0dXJlQ291bnQgPSAwO1xyXG5cclxuICAgICAgICAgICAgLy8gU2V0IHVuaWZvcm1zIGZyb20gY29tbWFuZCBkYXRhLlxyXG4gICAgICAgICAgICBmb3JlYWNoIChLZXlWYWx1ZVBhaXI8c3RyaW5nLCBvYmplY3Q+IGt2cCBpbiBjb21tYW5kLkRhdGEpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFNldFVuaWZvcm0oY29tbWFuZC5Qcm9ncmFtLCBrdnAuS2V5LCBrdnAuVmFsdWUpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBTZXQgZGVmYXVsdCB2YWx1ZXMuIChtYXRyaXhlcywgdGltZSwgbW91c2Vwb3MgZXRjKVxyXG4gICAgICAgICAgICBmb3JlYWNoIChLZXlWYWx1ZVBhaXI8RGVmYXVsdFNoYWRlclZhbHVlcywgb2JqZWN0PiBrdnAgaW4gX3NoYWRlclZhbHVlcylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgU2V0VW5pZm9ybShjb21tYW5kLlByb2dyYW0sIEVudW0uVG9TdHJpbmcodHlwZW9mKERlZmF1bHRTaGFkZXJWYWx1ZXMpLCBrdnAuS2V5KSwga3ZwLlZhbHVlKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gRHJhdy5cclxuICAgICAgICAgICAgX2dsLkRyYXdBcnJheXMoX2dsLlRSSUFOR0xFUywgMCwgY29tbWFuZC5WZXJ0ZXhCdWZmZXIuVmVydENvdW50KTtcclxuXHJcbiAgICAgICAgICAgIC8vIERpc2JhbGUgdmVydGV4IGF0dHJpYnMuXHJcbiAgICAgICAgICAgIGZvciAoaW50IGkgPSAwOyBpIDwgYXR0cmlicy5Db3VudDsgKytpKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBfZ2wuRGlzYWJsZVZlcnRleEF0dHJpYkFycmF5KGkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8vIFNldCB1bmlmb3JtIHZhbHVlIGluIHNoYWRlci5cclxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cInByb2dyYW1cIj5UaGUgY3VycmVudCBwcm9ncmFtLjwvcGFyYW0+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwibmFtZVwiPlRoZSBuYW1lIChpbiB0aGUgc2hhZGVyKS48L3BhcmFtPlxyXG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cInZhbHVlXCI+VGhlIG9iamVjdCB0byBzZXQuPC9wYXJhbT5cclxuICAgICAgICBwcml2YXRlIHZvaWQgU2V0VW5pZm9ybShTaGFkZXJQcm9ncmFtIHByb2dyYW0sIHN0cmluZyBuYW1lLCBvYmplY3QgdmFsdWUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAodmFsdWUgPT0gbnVsbClcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgIC8vIEdldCB0aGUgdW5pZm9ybSBsb2NhdGlvbi5cclxuICAgICAgICAgICAgV2ViR0xVbmlmb3JtTG9jYXRpb24gbG9jO1xyXG4gICAgICAgICAgICB0cnlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbG9jID0gcHJvZ3JhbS5Mb2NhdGlvbnNbbmFtZV0ubG9jYXRpb247XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2F0Y2hcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbG9jID0gX2dsLkdldFVuaWZvcm1Mb2NhdGlvbihwcm9ncmFtLlByb2dyYW0sIG5hbWUpO1xyXG4gICAgICAgICAgICAgICAgcHJvZ3JhbS5Mb2NhdGlvbnMuQWRkKG5hbWUsIG5ldyBTaGFkZXJQcm9ncmFtLlVuaWZvcm1Mb2NhdGlvbigpIHsgbG9jYXRpb24gPSBsb2MgfSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIElmIG5vIGxvY2F0aW9uIGlzIGZvdW5kLCBleGl0IG91dCBvZiB0aGUgZnVuY3Rpb24uXHJcbiAgICAgICAgICAgIGlmIChsb2MgPT0gbnVsbClcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgIC8vIENyZWF0ZSBhIHNldCB1bmlmb3JtIGRlbGVnYXRlIGlmIGl0IGRvZXMgbm90IGV4aXN0IHlldC5cclxuICAgICAgICAgICAgaWYgKCFwcm9ncmFtLlNldFVuaWZvcm1GdW5jdGlvbi5Db250YWluc0tleShuYW1lKSlcclxuICAgICAgICAgICAgICAgIFNldFVuaWZvcm1Mb2NhdGlvbihwcm9ncmFtLCBuYW1lLCB2YWx1ZSk7XHJcblxyXG4gICAgICAgICAgICAvLyBDYWxsIHRoZSBzZXQgdW5pZm9ybSBkZWxlZ2F0ZS5cclxuICAgICAgICAgICAgcHJvZ3JhbS5TZXRVbmlmb3JtRnVuY3Rpb25bbmFtZV0obG9jLCB2YWx1ZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8vIFNldCBhIHVuaWZvcm0gbG9jYXRpb24gb24gYSBwcm9ncmFtLlxyXG4gICAgICAgIC8vLyBDcmVhdGVzIGRlbGVnYXRlIGZ1bmN0aW9ucyBmb3IgdGhlIHNoYWRlciBwcm9ncmFtLiBUaGlzIHdheSBjYWxsaW5nICdpcycgdG8gY2hlY2sgdHlwZXMgZXZlcnkgZnJhbWUgaXMgbm90IG5lZWRlZCBhbnltb3JlLiAoV2FzIFZFUlkgc2xvdyBvbiB3ZWIpXHJcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cclxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJwcm9ncmFtXCI+VGhlIHByb2dyYW0gdG8gYWRkIHRvLjwvcGFyYW0+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwibmFtZVwiPlRoZSBuYW1lIG9mIHRoZSB1bmlmb3JtLjwvcGFyYW0+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwidmFsdWVcIj5UaGUgdmFsdWUgb2YgdGhlIHVuaWZvcm0uPC9wYXJhbT5cclxuICAgICAgICBwcml2YXRlIHZvaWQgU2V0VW5pZm9ybUxvY2F0aW9uKFNoYWRlclByb2dyYW0gcHJvZ3JhbSwgc3RyaW5nIG5hbWUsIG9iamVjdCB2YWx1ZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmICh2YWx1ZSBpcyBmbG9hdClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcHJvZ3JhbS5TZXRVbmlmb3JtRnVuY3Rpb24uQWRkKG5hbWUsIChnbG9iYWw6Okp1aWNlQm94RW5naW5lLkdyYXBoaWNzLlNoYWRlclByb2dyYW0uU2V0VW5pZm9ybSkoKGxvY2F0aW9uLCB2YWwpID0+XHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgX2dsLlVuaWZvcm0xZihsb2NhdGlvbiwgKGZsb2F0KXZhbCk7XHJcbiAgICAgICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAodmFsdWUgaXMgVmVjdG9yMilcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcHJvZ3JhbS5TZXRVbmlmb3JtRnVuY3Rpb24uQWRkKG5hbWUsIChnbG9iYWw6Okp1aWNlQm94RW5naW5lLkdyYXBoaWNzLlNoYWRlclByb2dyYW0uU2V0VW5pZm9ybSkoKGxvY2F0aW9uLCB2YWwpID0+XHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgVmVjdG9yMiB2ZWMgPSAoVmVjdG9yMil2YWw7XHJcbiAgICAgICAgICAgICAgICAgICAgX2dsLlVuaWZvcm0yZihsb2NhdGlvbiwgdmVjLlgsIHZlYy5ZKTtcclxuICAgICAgICAgICAgICAgIH0pKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmICh2YWx1ZSBpcyBWZWN0b3IzKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBwcm9ncmFtLlNldFVuaWZvcm1GdW5jdGlvbi5BZGQobmFtZSwgKGdsb2JhbDo6SnVpY2VCb3hFbmdpbmUuR3JhcGhpY3MuU2hhZGVyUHJvZ3JhbS5TZXRVbmlmb3JtKSgobG9jYXRpb24sIHZhbCkgPT5cclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBWZWN0b3IzIHZlYyA9IChWZWN0b3IzKXZhbDtcclxuICAgICAgICAgICAgICAgICAgICBfZ2wuVW5pZm9ybTNmKGxvY2F0aW9uLCB2ZWMuWCwgdmVjLlksIHZlYy5aKTtcclxuICAgICAgICAgICAgICAgIH0pKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmICh2YWx1ZSBpcyBWZWN0b3I0KVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBwcm9ncmFtLlNldFVuaWZvcm1GdW5jdGlvbi5BZGQobmFtZSwgKGdsb2JhbDo6SnVpY2VCb3hFbmdpbmUuR3JhcGhpY3MuU2hhZGVyUHJvZ3JhbS5TZXRVbmlmb3JtKSgobG9jYXRpb24sIHZhbCkgPT5cclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBWZWN0b3I0IHZlYyA9IChWZWN0b3I0KXZhbDtcclxuICAgICAgICAgICAgICAgICAgICBfZ2wuVW5pZm9ybTRmKGxvY2F0aW9uLCB2ZWMuWCwgdmVjLlksIHZlYy5aLCB2ZWMuVyk7XHJcbiAgICAgICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAodmFsdWUgaXMgQ29sb3IzMilcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcHJvZ3JhbS5TZXRVbmlmb3JtRnVuY3Rpb24uQWRkKG5hbWUsIChnbG9iYWw6Okp1aWNlQm94RW5naW5lLkdyYXBoaWNzLlNoYWRlclByb2dyYW0uU2V0VW5pZm9ybSkoKGxvY2F0aW9uLCB2YWwpID0+XHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgQ29sb3IzMiB2ZWMgPSAoQ29sb3IzMil2YWw7XHJcbiAgICAgICAgICAgICAgICAgICAgX2dsLlVuaWZvcm00Zihsb2NhdGlvbiwgdmVjLlIsIHZlYy5HLCB2ZWMuQiwgdmVjLkEpO1xyXG4gICAgICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKHZhbHVlIGlzIE1hdHJpeDQpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHByb2dyYW0uU2V0VW5pZm9ybUZ1bmN0aW9uLkFkZChuYW1lLCAoZ2xvYmFsOjpKdWljZUJveEVuZ2luZS5HcmFwaGljcy5TaGFkZXJQcm9ncmFtLlNldFVuaWZvcm0pKChsb2NhdGlvbiwgdmFsKSA9PlxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIE1hdHJpeDQgbWF0ID0gKE1hdHJpeDQpdmFsO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBmbG9hdFtdIGRhdCA9IG5ldyBmbG9hdFsxNl07XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChpbnQgaiA9IDA7IGogPCBkYXQuTGVuZ3RoOyArK2opXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdFtqXSA9IG1hdFtqXTtcclxuICAgICAgICAgICAgICAgICAgICBfZ2wuVW5pZm9ybU1hdHJpeDRmdihsb2NhdGlvbiwgZmFsc2UsIGRhdCk7XHJcbiAgICAgICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAodmFsdWUgaXMgVGV4dHVyZTJEKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBwcm9ncmFtLlNldFVuaWZvcm1GdW5jdGlvbi5BZGQobmFtZSwgKGdsb2JhbDo6SnVpY2VCb3hFbmdpbmUuR3JhcGhpY3MuU2hhZGVyUHJvZ3JhbS5TZXRVbmlmb3JtKSgobG9jYXRpb24sIHZhbCkgPT5cclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBUZXh0dXJlMkQgdGV4dHVyZSA9IChUZXh0dXJlMkQpdmFsO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBfZ2wuQWN0aXZlVGV4dHVyZShfZ2wuVEVYVFVSRTAgKyBfdGV4dHVyZUNvdW50KTtcclxuICAgICAgICAgICAgICAgICAgICBfZ2wuQmluZFRleHR1cmUoX2dsLlRFWFRVUkVfMkQsIHRleHR1cmUuVGV4dHVyZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIF9nbC5Vbmlmb3JtMWkobG9jYXRpb24sIF90ZXh0dXJlQ291bnQpO1xyXG4gICAgICAgICAgICAgICAgICAgIF90ZXh0dXJlQ291bnQrKztcclxuICAgICAgICAgICAgICAgIH0pKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgICAgIC8vLyBDcmVhdGUgYSBPcGVuR0wgdmVydGV4YnVmZmVyLlxyXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwiX2RhdGFcIj48L3BhcmFtPlxyXG4gICAgICAgIC8vLyA8cmV0dXJucz48L3JldHVybnM+XHJcbiAgICAgICAgcHVibGljIFdlYkdMQnVmZmVyIENyZWF0ZVZlcnRleEJ1ZmZlcihmbG9hdFtdIF9kYXRhKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgV2ViR0xCdWZmZXIgYnVmZmVyID0gX2dsLkNyZWF0ZUJ1ZmZlcigpO1xyXG4gICAgICAgICAgICBfZ2wuQmluZEJ1ZmZlcihfZ2wuQVJSQVlfQlVGRkVSLCBidWZmZXIpO1xyXG5cclxuICAgICAgICAgICAgRmxvYXQzMkFycmF5IGRhdGEgPSBuZXcgRmxvYXQzMkFycmF5KF9kYXRhKTtcclxuXHJcbiAgICAgICAgICAgIF9nbC5CdWZmZXJEYXRhKF9nbC5BUlJBWV9CVUZGRVIsIGRhdGEsIF9nbC5EWU5BTUlDX0RSQVcpO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGJ1ZmZlcjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cclxuICAgICAgICAvLy8gVXBkYXRlcyBkYXRhIGluIGEgZXhpc3RpbmcgVkJPLiBcclxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cImJ1ZmZlclwiPjwvcGFyYW0+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwib2Zmc2V0XCI+PC9wYXJhbT5cclxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJfZGF0YVwiPjwvcGFyYW0+XHJcbiAgICAgICAgcHVibGljIHZvaWQgVXBkYXRlVmVydGV4QnVmZmVyRGF0YShWZXJ0ZXhCdWZmZXIgYnVmZmVyLCBpbnQgb2Zmc2V0LCBmbG9hdFtdIF9kYXRhKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgX2dsLkJpbmRCdWZmZXIoX2dsLkFSUkFZX0JVRkZFUiwgYnVmZmVyLkJ1ZmZlcik7XHJcbiAgICAgICAgICAgIEZsb2F0MzJBcnJheSBkYXRhID0gbmV3IEZsb2F0MzJBcnJheShfZGF0YSk7XHJcbiAgICAgICAgICAgIF9nbC5CdWZmZXJTdWJEYXRhKF9nbC5BUlJBWV9CVUZGRVIsIG9mZnNldCwgZGF0YSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8vIERlbGV0ZXMgYSBidWZmZXIuIElmIGl0IHdhcyBhbHJlYWR5IGRlbGV0ZWQgaXQgaGFzIG5vIGVmZmVjdC5cclxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cImJ1ZmZlclwiPlRoZSBidWZmZXIgdG8gZGVsZXRlLjwvcGFyYW0+XHJcbiAgICAgICAgcHVibGljIHZvaWQgRGVzdHJveUJ1ZmZlcihXZWJHTEJ1ZmZlciBidWZmZXIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBfZ2wuRGVsZXRlQnVmZmVyKGJ1ZmZlcik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8vIENyZWF0ZXMgYSByZW5kZXIgdGFyZ2V0LlxyXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwid2lkdGhcIj5UYXJnZXQgd2lkdGguPC9wYXJhbT5cclxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJoZWlnaHRcIj5UYXJnZXQgSGVpZ2h0LjwvcGFyYW0+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwidGV4dHVyZVwiPlRoZSB0ZXh0dXJlIHRvIHVzZSBmb3IgdGhpcyB0YXJnZXQuPC9wYXJhbT5cclxuICAgICAgICAvLy8gPHJldHVybnM+PC9yZXR1cm5zPlxyXG4gICAgICAgIHB1YmxpYyBXZWJHTEZyYW1lYnVmZmVyIENyZWF0ZVJlbmRlclRhcmdldChpbnQgd2lkdGgsIGludCBoZWlnaHQsIFRleHR1cmUyRCB0ZXh0dXJlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy8gQ3JlYXRlIGZyYW1lIGJ1ZmZlci5cclxuICAgICAgICAgICAgV2ViR0xGcmFtZWJ1ZmZlciBmcmFtZUJ1ZmZlciA9IF9nbC5DcmVhdGVGcmFtZWJ1ZmZlcigpO1xyXG4gICAgICAgICAgICBfZ2wuQmluZEZyYW1lYnVmZmVyKF9nbC5GUkFNRUJVRkZFUiwgZnJhbWVCdWZmZXIpO1xyXG5cclxuICAgICAgICAgICAgLy8gQ3JlYXRlIGRlcHRoIGJ1ZmZlci5cclxuICAgICAgICAgICAgV2ViR0xSZW5kZXJidWZmZXIgcmVuZGVyQnVmZmVyID0gX2dsLkNyZWF0ZVJlbmRlcmJ1ZmZlcigpO1xyXG4gICAgICAgICAgICBfZ2wuQmluZFJlbmRlcmJ1ZmZlcihfZ2wuUkVOREVSQlVGRkVSLCByZW5kZXJCdWZmZXIpO1xyXG4gICAgICAgICAgICBfZ2wuUmVuZGVyYnVmZmVyU3RvcmFnZShfZ2wuUkVOREVSQlVGRkVSLCBfZ2wuREVQVEhfQ09NUE9ORU5UMTYsIHdpZHRoLCBoZWlnaHQpO1xyXG5cclxuICAgICAgICAgICAgLy8gQXR0YWNoIHRvIGZyYW1lYnVmZmVyLlxyXG4gICAgICAgICAgICBfZ2wuRnJhbWVidWZmZXJUZXh0dXJlMkQoX2dsLkZSQU1FQlVGRkVSLCBfZ2wuQ09MT1JfQVRUQUNITUVOVDAsIF9nbC5URVhUVVJFXzJELCB0ZXh0dXJlLlRleHR1cmUsIDApO1xyXG4gICAgICAgICAgICBfZ2wuRnJhbWVidWZmZXJSZW5kZXJidWZmZXIoX2dsLkZSQU1FQlVGRkVSLCBfZ2wuREVQVEhfQVRUQUNITUVOVCwgX2dsLlJFTkRFUkJVRkZFUiwgcmVuZGVyQnVmZmVyKTtcclxuXHJcbiAgICAgICAgICAgIGludCBzdGF0dXMgPSBfZ2wuQ2hlY2tGcmFtZWJ1ZmZlclN0YXR1cyhfZ2wuRlJBTUVCVUZGRVIpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHN0YXR1cyAhPSBfZ2wuRlJBTUVCVUZGRVJfQ09NUExFVEUpXHJcbiAgICAgICAgICAgICAgICBTeXN0ZW0uQ29uc29sZS5Xcml0ZUxpbmUoXCJTb21ldGhpbmcgd2VudCB3cm9uZyBjcmVhdGluZyB0aGUgZnJhbWUgYnVmZmVyIVwiKTtcclxuXHJcbiAgICAgICAgICAgIC8vIENsZWFuIHVwLlxyXG4gICAgICAgICAgICBfZ2wuQmluZFRleHR1cmUoX2dsLlRFWFRVUkVfMkQsIG51bGwpO1xyXG4gICAgICAgICAgICBfZ2wuQmluZFJlbmRlcmJ1ZmZlcihfZ2wuUkVOREVSQlVGRkVSLCBudWxsKTtcclxuICAgICAgICAgICAgX2dsLkJpbmRGcmFtZWJ1ZmZlcihfZ2wuRlJBTUVCVUZGRVIsIG51bGwpO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGZyYW1lQnVmZmVyO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgICAgIC8vLyBTZXRzIGEgcmVuZGVyIHRhcmdldCB0byBkcmF3IHRvLlxyXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwidGFyZ2V0XCI+VGhlIHJlbmRlciB0YXJnZXQuPC9wYXJhbT5cclxuICAgICAgICBwdWJsaWMgdm9pZCBTZXRSZW5kZXJUYXJnZXQoUmVuZGVyVGFyZ2V0IHRhcmdldClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8vIFJlbmRlciB0byBiYWNrYnVmZmVyIGlmIHRhcmdldCBpcyBudWxsLlxyXG4gICAgICAgICAgICBpZiAodGFyZ2V0ID09IG51bGwpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIF9nbC5WaWV3cG9ydCgwLCAwLCBfY2FudmFzLldpZHRoLCBfY2FudmFzLkhlaWdodCk7XHJcbiAgICAgICAgICAgICAgICBfZ2wuQmluZEZyYW1lYnVmZmVyKF9nbC5GUkFNRUJVRkZFUiwgbnVsbCk7XHJcbiAgICAgICAgICAgICAgICBTZXRHbG9iYWxTaGFkZXJWYWx1ZShEZWZhdWx0U2hhZGVyVmFsdWVzLlZJRVdQT1JUU0laRSwgbmV3IFZlY3RvcjIoX2NhbnZhcy5XaWR0aCwgX2NhbnZhcy5IZWlnaHQpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBTZXQgcmVuZGVydGFyZ2V0IGFuZCB2aWV3cG9ydCBzaXplcy5cclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBfZ2wuVmlld3BvcnQoMCwgMCwgdGFyZ2V0LldpZHRoLCB0YXJnZXQuSGVpZ2h0KTtcclxuICAgICAgICAgICAgICAgIF9nbC5CaW5kRnJhbWVidWZmZXIoX2dsLkZSQU1FQlVGRkVSLCB0YXJnZXQuVGFyZ2V0KTtcclxuICAgICAgICAgICAgICAgIFNldEdsb2JhbFNoYWRlclZhbHVlKERlZmF1bHRTaGFkZXJWYWx1ZXMuVklFV1BPUlRTSVpFLCBuZXcgVmVjdG9yMih0YXJnZXQuV2lkdGgsIHRhcmdldC5IZWlnaHQpKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgU2V0R2xvYmFsU2hhZGVyVmFsdWUoRGVmYXVsdFNoYWRlclZhbHVlcy5DQU5WQVNTSVpFLCBuZXcgVmVjdG9yMihfY2FudmFzLldpZHRoLCBfY2FudmFzLkhlaWdodCkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgICAgIC8vLyBDcmVhdGUgYSB0ZXh0dXJlLCB3aXRoIG5vIGNvbG9yLlxyXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwid2lkdGhcIj5UaGUgd2lkdGggb2YgdGhlIHRleHR1cmUuPC9wYXJhbT5cclxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJoZWlnaHRcIj5UaGUgaGVpZ2h0IG9mIHRoZSB0ZXh0dXJlLjwvcGFyYW0+XHJcbiAgICAgICAgLy8vIDxyZXR1cm5zPkFuIE9wZW5HTCB0ZXh0dXJlLjwvcmV0dXJucz5cclxuICAgICAgICBwdWJsaWMgV2ViR0xUZXh0dXJlIENyZWF0ZVRleHR1cmUoaW50IHdpZHRoLCBpbnQgaGVpZ2h0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgV2ViR0xUZXh0dXJlIHRleHR1cmUgPSBfZ2wuQ3JlYXRlVGV4dHVyZSgpO1xyXG4gICAgICAgICAgICBfZ2wuQmluZFRleHR1cmUoX2dsLlRFWFRVUkVfMkQsIHRleHR1cmUpO1xyXG5cclxuICAgICAgICAgICAgX2dsLlRleFBhcmFtZXRlcmkoX2dsLlRFWFRVUkVfMkQsIF9nbC5URVhUVVJFX01BR19GSUxURVIsIF9nbC5ORUFSRVNUKTtcclxuICAgICAgICAgICAgX2dsLlRleFBhcmFtZXRlcmkoX2dsLlRFWFRVUkVfMkQsIF9nbC5URVhUVVJFX01JTl9GSUxURVIsIF9nbC5ORUFSRVNUKTtcclxuICAgICAgICAgICAgX2dsLlRleFBhcmFtZXRlcmkoX2dsLlRFWFRVUkVfMkQsIF9nbC5URVhUVVJFX1dSQVBfUywgX2dsLkNMQU1QX1RPX0VER0UpO1xyXG4gICAgICAgICAgICBfZ2wuVGV4UGFyYW1ldGVyaShfZ2wuVEVYVFVSRV8yRCwgX2dsLlRFWFRVUkVfV1JBUF9ULCBfZ2wuQ0xBTVBfVE9fRURHRSk7XHJcblxyXG4gICAgICAgICAgICBfZ2wuVGV4SW1hZ2UyRChfZ2wuVEVYVFVSRV8yRCwgMCwgX2dsLlJHQkEsIHdpZHRoLCBoZWlnaHQsIDAsIF9nbC5SR0JBLCBfZ2wuVU5TSUdORURfQllURSwgbnVsbCk7XHJcblxyXG4gICAgICAgICAgICBfZ2wuQmluZFRleHR1cmUoX2dsLlRFWFRVUkVfMkQsIG51bGwpO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHRleHR1cmU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8vIENyZWF0ZSBhIHRleHR1cmUgZnJvbSBhIEhUTUwgSW1hZ2UgZWxlbWVudC5cclxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cImltYWdlXCI+VGhlIGxvYWRlZCBpbWFnZSBlbGVtZW50LjwvcGFyYW0+XHJcbiAgICAgICAgLy8vIDxyZXR1cm5zPkEgV2ViR0wgdGV4dHVyZS48L3JldHVybnM+XHJcbiAgICAgICAgcHVibGljIFdlYkdMVGV4dHVyZSBDcmVhdGVUZXh0dXJlKEhUTUxJbWFnZUVsZW1lbnQgaW1hZ2UpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBXZWJHTFRleHR1cmUgdGV4dHVyZSA9IF9nbC5DcmVhdGVUZXh0dXJlKCk7XHJcbiAgICAgICAgICAgIF9nbC5CaW5kVGV4dHVyZShfZ2wuVEVYVFVSRV8yRCwgdGV4dHVyZSk7XHJcblxyXG4gICAgICAgICAgICAvLyBGSVhNRTogSGFyZGNvZGVkIHRleHR1cmUgcGFyYW1ldGVycy5cclxuICAgICAgICAgICAgX2dsLlRleFBhcmFtZXRlcmkoX2dsLlRFWFRVUkVfMkQsIF9nbC5URVhUVVJFX01BR19GSUxURVIsIF9nbC5ORUFSRVNUKTtcclxuICAgICAgICAgICAgX2dsLlRleFBhcmFtZXRlcmkoX2dsLlRFWFRVUkVfMkQsIF9nbC5URVhUVVJFX01JTl9GSUxURVIsIF9nbC5ORUFSRVNUKTtcclxuICAgICAgICAgICAgX2dsLlRleFBhcmFtZXRlcmkoX2dsLlRFWFRVUkVfMkQsIF9nbC5URVhUVVJFX1dSQVBfUywgX2dsLkNMQU1QX1RPX0VER0UpO1xyXG4gICAgICAgICAgICBfZ2wuVGV4UGFyYW1ldGVyaShfZ2wuVEVYVFVSRV8yRCwgX2dsLlRFWFRVUkVfV1JBUF9ULCBfZ2wuQ0xBTVBfVE9fRURHRSk7XHJcblxyXG4gICAgICAgICAgICBfZ2wuVGV4SW1hZ2UyRChfZ2wuVEVYVFVSRV8yRCwgMCwgX2dsLlJHQkEsIF9nbC5SR0JBLCBfZ2wuVU5TSUdORURfQllURSwgaW1hZ2UpO1xyXG5cclxuICAgICAgICAgICAgX2dsLkJpbmRUZXh0dXJlKF9nbC5URVhUVVJFXzJELCBudWxsKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiB0ZXh0dXJlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgICAgIC8vLyBDcmVhdGUgYSB0ZXh0dXJlIGZyb20gYSBIVE1MIEltYWdlIGVsZW1lbnQuXHJcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cclxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJpbWFnZVwiPlRoZSBsb2FkZWQgaW1hZ2UgZWxlbWVudC48L3BhcmFtPlxyXG4gICAgICAgIC8vLyA8cmV0dXJucz5BIFdlYkdMIHRleHR1cmUuPC9yZXR1cm5zPlxyXG4gICAgICAgIHB1YmxpYyBXZWJHTFRleHR1cmUgQ3JlYXRlVGV4dHVyZShpbnQgd2lkdGgsIGludCBoZWlnaHQsIGJ5dGVbXSBkYXRhKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgV2ViR0xUZXh0dXJlIHRleHR1cmUgPSBfZ2wuQ3JlYXRlVGV4dHVyZSgpO1xyXG4gICAgICAgICAgICBfZ2wuQmluZFRleHR1cmUoX2dsLlRFWFRVUkVfMkQsIHRleHR1cmUpO1xyXG5cclxuICAgICAgICAgICAgLy8gRklYTUU6IEhhcmRjb2RlZCB0ZXh0dXJlIHBhcmFtZXRlcnMuXHJcbiAgICAgICAgICAgIF9nbC5UZXhQYXJhbWV0ZXJpKF9nbC5URVhUVVJFXzJELCBfZ2wuVEVYVFVSRV9NQUdfRklMVEVSLCBfZ2wuTkVBUkVTVCk7XHJcbiAgICAgICAgICAgIF9nbC5UZXhQYXJhbWV0ZXJpKF9nbC5URVhUVVJFXzJELCBfZ2wuVEVYVFVSRV9NSU5fRklMVEVSLCBfZ2wuTkVBUkVTVCk7XHJcbiAgICAgICAgICAgIF9nbC5UZXhQYXJhbWV0ZXJpKF9nbC5URVhUVVJFXzJELCBfZ2wuVEVYVFVSRV9XUkFQX1MsIF9nbC5DTEFNUF9UT19FREdFKTtcclxuICAgICAgICAgICAgX2dsLlRleFBhcmFtZXRlcmkoX2dsLlRFWFRVUkVfMkQsIF9nbC5URVhUVVJFX1dSQVBfVCwgX2dsLkNMQU1QX1RPX0VER0UpO1xyXG5cclxuICAgICAgICAgICAgVWludDhBcnJheSBwbGF0Zm9ybURhdGEgPSBuZXcgVWludDhBcnJheShkYXRhKTtcclxuXHJcbiAgICAgICAgICAgIF9nbC5UZXhJbWFnZTJEKF9nbC5URVhUVVJFXzJELCAwLCBfZ2wuUkdCQSwgd2lkdGgsIGhlaWdodCwgMCwgX2dsLlJHQkEsIF9nbC5VTlNJR05FRF9CWVRFLCBwbGF0Zm9ybURhdGEpO1xyXG5cclxuICAgICAgICAgICAgX2dsLkJpbmRUZXh0dXJlKF9nbC5URVhUVVJFXzJELCBudWxsKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiB0ZXh0dXJlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgICAgIC8vLyBEaXNhYmxlIG9yIGVuYWJsZSBkZXB0aCB0ZXN0aW5nLlxyXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwidXNlXCI+VHJ1ZSB0byB1c2UsIGZhbHNlIHRvIGRpc2FibGUgZGVwdGggdGVzdGluZy48L3BhcmFtPlxyXG4gICAgICAgIHB1YmxpYyB2b2lkIFVzZURlcHRoKGJvb2wgdXNlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKHVzZSlcclxuICAgICAgICAgICAgICAgIF9nbC5FbmFibGUoX2dsLkRFUFRIX1RFU1QpO1xyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICBfZ2wuRGlzYWJsZShfZ2wuREVQVEhfVEVTVCk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgICAgIC8vLyBDcmVhdGUgYW5kIGNvbXBpbGUgc2hhZGVycyB0byB1c2UgZm9yIHJlbmRlcmluZy5cclxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cInZlcnRTb3VyY2VcIj5UaGUgdmVydGV4IHNoYWRlci48L3BhcmFtPlxyXG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cImZyYWdTb3VyY2VcIj5UaGUgZnJhZ21lbnQgc2hhZGVyLjwvcGFyYW0+XHJcbiAgICAgICAgLy8vIDxyZXR1cm5zPkEgbGlua2VkIHByb2dyYW0gcmVhZHkgZm9yIHVzZS48L3JldHVybnM+XHJcbiAgICAgICAgcHVibGljIFdlYkdMUHJvZ3JhbSBDb21waWxlU2hhZGVyKHN0cmluZyB2ZXJ0U291cmNlLCBzdHJpbmcgZnJhZ1NvdXJjZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8vIENyZWF0ZSBhbmQgY29tcGlsZSB2ZXJ0ZXggc2hhZGVyLlxyXG4gICAgICAgICAgICBXZWJHTFNoYWRlciB2ZXJ0ZXhTaGFkZXIgPSBfZ2wuQ3JlYXRlU2hhZGVyKF9nbC5WRVJURVhfU0hBREVSKTtcclxuXHJcbiAgICAgICAgICAgIF9nbC5TaGFkZXJTb3VyY2UodmVydGV4U2hhZGVyLCB2ZXJ0U291cmNlKTtcclxuICAgICAgICAgICAgX2dsLkNvbXBpbGVTaGFkZXIodmVydGV4U2hhZGVyKTtcclxuXHJcbiAgICAgICAgICAgIC8vIExvZyBlcnJvci5cclxuICAgICAgICAgICAgc3RyaW5nIHZlcnRFcnJvciA9IF9nbC5HZXRTaGFkZXJJbmZvTG9nKHZlcnRleFNoYWRlcik7XHJcbiAgICAgICAgICAgIGlmICghU3RyaW5nLklzTnVsbE9yRW1wdHkodmVydEVycm9yKSlcclxuICAgICAgICAgICAgICAgIFN5c3RlbS5Db25zb2xlLldyaXRlTGluZSh2ZXJ0RXJyb3IpO1xyXG5cclxuICAgICAgICAgICAgLy8gQ3JlYXRlIGFuZCBjb21waWxlIGZyYWdtZW50IHNoYWRlci5cclxuICAgICAgICAgICAgV2ViR0xTaGFkZXIgZnJhZ21lbnRTaGFkZXIgPSBfZ2wuQ3JlYXRlU2hhZGVyKF9nbC5GUkFHTUVOVF9TSEFERVIpO1xyXG5cclxuICAgICAgICAgICAgX2dsLlNoYWRlclNvdXJjZShmcmFnbWVudFNoYWRlciwgZnJhZ1NvdXJjZSk7XHJcbiAgICAgICAgICAgIF9nbC5Db21waWxlU2hhZGVyKGZyYWdtZW50U2hhZGVyKTtcclxuXHJcbiAgICAgICAgICAgIC8vIExvZyBlcnJvci5cclxuICAgICAgICAgICAgc3RyaW5nIGZyYWdFcnJvciA9IF9nbC5HZXRTaGFkZXJJbmZvTG9nKGZyYWdtZW50U2hhZGVyKTtcclxuICAgICAgICAgICAgaWYgKCFTdHJpbmcuSXNOdWxsT3JFbXB0eShmcmFnRXJyb3IpKVxyXG4gICAgICAgICAgICAgICAgU3lzdGVtLkNvbnNvbGUuV3JpdGVMaW5lKGZyYWdFcnJvcik7XHJcblxyXG4gICAgICAgICAgICAvLyBDcmVhdGUgcHJvZ3JhbS5cclxuICAgICAgICAgICAgV2ViR0xQcm9ncmFtIHByb2dyYW0gPSBfZ2wuQ3JlYXRlUHJvZ3JhbSgpLkFzPFdlYkdMUHJvZ3JhbT4oKTtcclxuICAgICAgICAgICAgX2dsLkF0dGFjaFNoYWRlcihwcm9ncmFtLCB2ZXJ0ZXhTaGFkZXIpO1xyXG4gICAgICAgICAgICBfZ2wuQXR0YWNoU2hhZGVyKHByb2dyYW0sIGZyYWdtZW50U2hhZGVyKTtcclxuICAgICAgICAgICAgX2dsLkxpbmtQcm9ncmFtKHByb2dyYW0pO1xyXG5cclxuICAgICAgICAgICAgX2dsLlVzZVByb2dyYW0ocHJvZ3JhbSk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gcHJvZ3JhbTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwidXNpbmcgQnJpZGdlLkh0bWw1O1xyXG51c2luZyBKdWljZUJveEVuZ2luZS5NYXRoO1xyXG51c2luZyBKdWljZUJveEVuZ2luZS5SZXNvdXJjZXM7XHJcbnVzaW5nIEp1aWNlQm94RW5naW5lLlNjZW5lO1xyXG51c2luZyBKdWljZUJveEVuZ2luZS5VdGlsO1xyXG51c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uTGlucTtcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcbnVzaW5nIFN5c3RlbS5UaHJlYWRpbmcuVGFza3M7XHJcblxyXG5uYW1lc3BhY2UgSnVpY2VCb3hFbmdpbmUuR3JhcGhpY3Ncclxue1xyXG4gICAgcHVibGljIGNsYXNzIEdyYXBoaWNzTWFuYWdlclxyXG4gICAge1xyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cclxuICAgICAgICAvLy8gVGhlIHJlbmRlcmVyIHJlc3BvbnNpYmxlIGZvciBhbGwgcGxhdGZvcm0gc3BlY2lmaWMgY2FsbHMuXHJcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cclxuICAgICAgICBwdWJsaWMgR3JhcGhpY3NDb250ZXh0IENvbnRleHQ7XHJcblxyXG4gICAgICAgIHByaXZhdGUgVmVydGV4QnVmZmVyIF9mdWxsU2NyZWVuUXVhZDtcclxuICAgICAgICBwcml2YXRlIFNoYWRlclByb2dyYW0gX2Z1bGxTY3JlZW5RdWFkU2hhZGVyO1xyXG5cclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBHcmFwaGljc01hbmFnZXIgX2luc3RhbmNlO1xyXG5cclxuICAgICAgICAvLyBGSVhNRTogVGhpcyBzaG91bGQgYmUgZG9uZSBzb21ld2hlcmUgZWxzZSFcclxuICAgICAgICBwcml2YXRlIFRleHR1cmUyRCBfZmFkZVRleHR1cmU7XHJcblxyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cclxuICAgICAgICAvLy8gQ3VycmVudCB3aWR0aCBvZiB0aGUgYmFja2J1ZmZlci4gKGNhbnZhcylcclxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgICAgIHB1YmxpYyBpbnQgV2lkdGggeyBnZXQ7IHByaXZhdGUgc2V0OyB9XHJcblxyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cclxuICAgICAgICAvLy8gQ3VycmVudCBoZWlnaHQgb2YgdGhlIGJhY2tidWZmZXIuIChjYW52YXMpXHJcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cclxuICAgICAgICBwdWJsaWMgaW50IEhlaWdodCB7IGdldDsgcHJpdmF0ZSBzZXQ7IH1cclxuXHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgICAgIC8vLyBTaXplIG9mIHRoZSBwaXhlbHMgKGluIHNjcmVlbiBwaXhlbHMpLlxyXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgcHJpdmF0ZSBmbG9hdCBfcGl4ZWxTaXplO1xyXG5cclxuICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8vIFNpbmdsZXRvbiBwYXRlcm4uXHJcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIEdyYXBoaWNzTWFuYWdlciBJbnN0YW5jZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZ2V0XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmIChfaW5zdGFuY2UgIT0gbnVsbClcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gX2luc3RhbmNlO1xyXG5cclxuICAgICAgICAgICAgICAgIFN5c3RlbS5Db25zb2xlLldyaXRlTGluZShcIkdyYXBoaWNzIE1hbmFnZXIgaXMgbm90IGluaXRpYWxpemVkIVwiKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLy8gPHN1bW1hcnk+SW5pdGlhbGl6ZSB0aGUgZ3JhcGhpY3MgbWFuYWdlci48L3N1bW1hcnk+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwiY29udGV4dFwiPlRoZSBpbml0aWFsaXplZCBjb250ZXh0LjwvcGFyYW0+XHJcbiAgICAgICAgaW50ZXJuYWwgR3JhcGhpY3NNYW5hZ2VyKEhUTUxDYW52YXNFbGVtZW50IGNhbnZhcylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIENvbnRleHQgPSBuZXcgR3JhcGhpY3NDb250ZXh0KGNhbnZhcyk7XHJcbiAgICAgICAgICAgIF9pbnN0YW5jZSA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICBfcGl4ZWxTaXplID0gQ29uZmlnLkluc3RhbmNlLkNvbmZpZ1ZhbHVlcy5QaXhlbFNpemU7XHJcblxyXG4gICAgICAgICAgICBXaWR0aCA9IGNhbnZhcy5XaWR0aDtcclxuICAgICAgICAgICAgSGVpZ2h0ID0gY2FudmFzLkhlaWdodDtcclxuXHJcbiAgICAgICAgICAgIGZsb2F0W10gZGF0YSA9IG5ldyBmbG9hdFtdXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIC0xLjBmLCAtMS4wZiwgIDAuMGYsICAwLjBmLCAgMC4wZixcclxuICAgICAgICAgICAgICAgICAxLjBmLCAtMS4wZiwgIDAuMGYsICAxLjBmLCAgMC4wZixcclxuICAgICAgICAgICAgICAgICAxLjBmLCAgMS4wZiwgIDAuMGYsICAxLjBmLCAgMS4wZixcclxuXHJcbiAgICAgICAgICAgICAgICAtMS4wZiwgLTEuMGYsICAwLjBmLCAgMC4wZiwgIDAuMGYsXHJcbiAgICAgICAgICAgICAgICAtMS4wZiwgIDEuMGYsICAwLjBmLCAgMC4wZiwgIDEuMGYsXHJcbiAgICAgICAgICAgICAgICAgMS4wZiwgIDEuMGYsICAwLjBmLCAgMS4wZiwgIDEuMGYsXHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICBfZnVsbFNjcmVlblF1YWQgPSBuZXcgVmVydGV4QnVmZmVyKGRhdGEpO1xyXG5cclxuICAgICAgICAgICAgX2Z1bGxTY3JlZW5RdWFkLlNldEF0dHJpYnV0ZShuZXcgVmVydGV4QXR0cmlidXRlKFwiYV9wb3NcIiwgMywgZmFsc2UsIDIwLCAwKSk7XHJcbiAgICAgICAgICAgIF9mdWxsU2NyZWVuUXVhZC5TZXRBdHRyaWJ1dGUobmV3IFZlcnRleEF0dHJpYnV0ZShcImFfdGV4XCIsIDIsIGZhbHNlLCAyMCwgMTIpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cclxuICAgICAgICAvLy8gUmVnaXN0ZXIgZ3JhcGhpY3MgcmVzb3VyY2UgbG9hZGVycyB0byBhIGdpdmVuIHJlc291cmNlIG1hbmFnZXIuXHJcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cclxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJyZXNvdXJjZU1hbmFnZXJcIj5UaGUgcmVzb3VyY2VtYW5hZ2VyIHRvIHJlZ2lzdGVyIHRoZSBsb2FkZXJzIHRvLjwvcGFyYW0+XHJcbiAgICAgICAgcHVibGljIHZvaWQgUmVnaXN0ZXJMb2FkZXJzKFJlc291cmNlTWFuYWdlciByZXNvdXJjZU1hbmFnZXIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAvLyBSZWdpc3RlciBzaGFkZXIgcmVzb3VyY2UgbG9hZGVycy5cclxuICAgICAgICAgICAgcmVzb3VyY2VNYW5hZ2VyLlJlZ2lzdGVyUmVzb3VyY2VNYW5hZ2VyKG5ldyBTaGFkZXJSZXNvdXJjZUxvYWRlcihcIlNoYWRlckxvYWRlclwiLCBcInZlcnRcIikpO1xyXG4gICAgICAgICAgICByZXNvdXJjZU1hbmFnZXIuUmVnaXN0ZXJSZXNvdXJjZU1hbmFnZXIobmV3IFNoYWRlclJlc291cmNlTG9hZGVyKFwiU2hhZGVyTG9hZGVyXCIsIFwiZnJhZ1wiKSk7XHJcbiAgICAgICAgICAgIHJlc291cmNlTWFuYWdlci5SZWdpc3RlclJlc291cmNlTWFuYWdlcihuZXcgVGV4dHVyZVJlc291cmNlTG9hZGVyKFwiVGV4dHVyZUxvYWRlclwiLCBcInBuZ1wiKSk7XHJcbiAgICAgICAgICAgIHJlc291cmNlTWFuYWdlci5SZWdpc3RlclJlc291cmNlTWFuYWdlcihuZXcgRm9udFJlc291cmNlTG9hZGVyKFwiRm9udExvYWRlclwiLCBcImJmZlwiKSk7XHJcblxyXG4gICAgICAgICAgICAvL0ZJWE1FOiBEaXJ0eSBoYWNrLiBUaGlzIHNob3VsZCBiZSBkb25lIHNvbWV3aGVyZSBlbHNlLlxyXG4gICAgICAgICAgICBfZnVsbFNjcmVlblF1YWRTaGFkZXIgPSAoU2hhZGVyUHJvZ3JhbSlyZXNvdXJjZU1hbmFnZXIuTG9hZChcIlNoYWRlcnMvRnVsbFNjcmVlbi52ZXJ0XCIpO1xyXG4gICAgICAgICAgICBfZmFkZVRleHR1cmUgPSAoVGV4dHVyZTJEKXJlc291cmNlTWFuYWdlci5Mb2FkKFwiVGV4dHVyZXMvU2NyZWVuRmFkZS5wbmdcIik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8vIFRPRE86IFJlbW92ZSB0aGlzLCBzaW5jZSB0aGlzIGlzIG5vdCB0aGUgR3JhcGhpY3NNYW5hZ2VyJ3MgcmVzcG9uaWJpbGl0eS5cclxuICAgICAgICAvLy8gUmVuZGVyIGNhbWVyYSB2aWV3cG9ydCB0byBjdXJyZW50IGZyYW1lYnVmZmVyLlxyXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwiY2FtZXJhXCI+VGhlIGNhbWVyYSB0byB1c2UuPC9wYXJhbT5cclxuICAgICAgICBwdWJsaWMgdm9pZCBSZW5kZXJDYW1lcmEoQ2FtZXJhIGNhbWVyYSwgU2NlbmUuU2NlbmUgc2NlbmUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBHcmFwaGljc0NvbW1hbmQgY29tbWFuZCA9IG5ldyBHcmFwaGljc0NvbW1hbmQoKTtcclxuICAgICAgICAgICAgY29tbWFuZC5WZXJ0ZXhCdWZmZXIgPSBfZnVsbFNjcmVlblF1YWQ7XHJcbiAgICAgICAgICAgIGNvbW1hbmQuV29ybGRNYXRyaXggPSBuZXcgTWF0cml4NCgxLjBmKTtcclxuICAgICAgICAgICAgY29tbWFuZC5Qcm9ncmFtID0gX2Z1bGxTY3JlZW5RdWFkU2hhZGVyO1xyXG4gICAgICAgICAgICBjb21tYW5kLkRhdGEuQWRkKFwidGV4dHVyZVwiLCBjYW1lcmEuVGFyZ2V0KTtcclxuICAgICAgICAgICAgY29tbWFuZC5EYXRhLkFkZChcInNjcmVlbkZhZGVcIiwgc2NlbmUuRmFkZVRleHR1cmUpO1xyXG4gICAgICAgICAgICBjb21tYW5kLkRhdGEuQWRkKFwiZmFkZUFtb3VudFwiLCBzY2VuZS5GYWRlQW1vdW50KTtcclxuICAgICAgICAgICAgY29tbWFuZC5EYXRhLkFkZChcInBpeGVsU2l6ZVwiLCBfcGl4ZWxTaXplKTsgXHJcblxyXG4gICAgICAgICAgICBDb250ZXh0LkNvbW1hbmQoY29tbWFuZCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8vIFVwZGF0ZSB0aGUgZ3JhcGhpY3MgbWFuYWdlci5cclxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgICAgIHB1YmxpYyB2b2lkIFVwZGF0ZSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBDb250ZXh0LlNldEdsb2JhbFNoYWRlclZhbHVlKERlZmF1bHRTaGFkZXJWYWx1ZXMuVElNRSwgVGltZS5Ub3RhbFNlY29uZHMpO1xyXG4gICAgICAgICAgICBDb250ZXh0LlNldEdsb2JhbFNoYWRlclZhbHVlKERlZmF1bHRTaGFkZXJWYWx1ZXMuREVMVEFUSU1FLCBUaW1lLkRlbHRhVGltZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIEp1aWNlQm94RW5naW5lLlJlc291cmNlcztcclxudXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLkxpbnE7XHJcbnVzaW5nIFN5c3RlbS5UZXh0O1xyXG51c2luZyBTeXN0ZW0uVGhyZWFkaW5nLlRhc2tzO1xyXG5cclxubmFtZXNwYWNlIEp1aWNlQm94RW5naW5lLkdyYXBoaWNzXHJcbntcclxuICAgIHB1YmxpYyBhYnN0cmFjdCBjbGFzcyBQb3N0UHJvY2Vzc2luZ0VmZmVjdFxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBzdHJpbmcgTmFtZSB7IGdldDsgc2V0OyB9XHJcblxyXG4gICAgICAgIHByb3RlY3RlZCBHcmFwaGljc0NvbW1hbmQgX2NvbW1hbmQ7XHJcblxyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cclxuICAgICAgICAvLy8gQ29uc3RydWN0b3JcclxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cIm5hbWVcIj5OYW1lIG9mIHRoZSBzaGFkZXIgb2YgdGhpcyBlZmZlY3QuPC9wYXJhbT5cclxuICAgICAgICBwdWJsaWMgUG9zdFByb2Nlc3NpbmdFZmZlY3Qoc3RyaW5nIG5hbWUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBOYW1lID0gbmFtZTtcclxuICAgICAgICAgICAgX2NvbW1hbmQgPSBuZXcgR3JhcGhpY3NDb21tYW5kKCk7XHJcblxyXG4gICAgICAgICAgICBmbG9hdFtdIGRhdGEgPSBuZXcgZmxvYXRbXVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAtMS4wZiwgLTEuMGYsICAwLjBmLCAgMC4wZiwgIDAuMGYsXHJcbiAgICAgICAgICAgICAgICAgMS4wZiwgLTEuMGYsICAwLjBmLCAgMS4wZiwgIDAuMGYsXHJcbiAgICAgICAgICAgICAgICAgMS4wZiwgIDEuMGYsICAwLjBmLCAgMS4wZiwgIDEuMGYsXHJcblxyXG4gICAgICAgICAgICAgICAgLTEuMGYsIC0xLjBmLCAgMC4wZiwgIDAuMGYsICAwLjBmLFxyXG4gICAgICAgICAgICAgICAgLTEuMGYsICAxLjBmLCAgMC4wZiwgIDAuMGYsICAxLjBmLFxyXG4gICAgICAgICAgICAgICAgIDEuMGYsICAxLjBmLCAgMC4wZiwgIDEuMGYsICAxLjBmLFxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgX2NvbW1hbmQuVmVydGV4QnVmZmVyID0gbmV3IFZlcnRleEJ1ZmZlcihkYXRhKTtcclxuXHJcbiAgICAgICAgICAgIF9jb21tYW5kLlZlcnRleEJ1ZmZlci5TZXRBdHRyaWJ1dGUobmV3IFZlcnRleEF0dHJpYnV0ZShcImFfcG9zXCIsIDMsIGZhbHNlLCAyMCwgMCkpO1xyXG4gICAgICAgICAgICBfY29tbWFuZC5WZXJ0ZXhCdWZmZXIuU2V0QXR0cmlidXRlKG5ldyBWZXJ0ZXhBdHRyaWJ1dGUoXCJhX3RleFwiLCAyLCBmYWxzZSwgMjAsIDEyKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8vIExvYWQgdGhlIHBvc3QgcHJvY2Vzc2luZyBlZmZlY3QgYnkgbG9hZGluZyB0aGUgc2hhZGVyIHByb2dyYW0gcmVsYXRlZCB0byB0aGlzIGVmZmVjdC5cclxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cIm1hbmFnZXJcIj5UaGUgcmVzb3VyY2UgbWFuYWdlci48L3BhcmFtPlxyXG4gICAgICAgIHByb3RlY3RlZCB2b2lkIExvYWQoUmVzb3VyY2VNYW5hZ2VyIG1hbmFnZXIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBfY29tbWFuZC5Qcm9ncmFtID0gbWFuYWdlci5Mb2FkKFwiU2hhZGVycy9cIiArIE5hbWUgKyBcIi52ZXJ0XCIpIGFzIFNoYWRlclByb2dyYW07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8vIFJlbmRlciB0aGUgcG9zdCBwcm9jZXNzaW5nIGVmZmVjdC5cclxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cInNvdXJjZVwiPlRoZSBzb3VyY2UgaW1hZ2UuPC9wYXJhbT5cclxuICAgICAgICBwdWJsaWMgYWJzdHJhY3Qgdm9pZCBSZW5kZXIoVGV4dHVyZTJEIHNvdXJjZSk7XHJcbiAgICB9XHJcbn1cclxuIiwidXNpbmcgSnVpY2VCb3hFbmdpbmUuTWF0aDtcclxudXNpbmcgSnVpY2VCb3hFbmdpbmUuUmVzb3VyY2VzO1xyXG51c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uTGlucTtcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcbnVzaW5nIFN5c3RlbS5UaHJlYWRpbmcuVGFza3M7XHJcblxyXG5uYW1lc3BhY2UgSnVpY2VCb3hFbmdpbmUuR3JhcGhpY3MuR1VJXHJcbntcclxuICAgIHB1YmxpYyBhYnN0cmFjdCBjbGFzcyBHVUlFbGVtZW50XHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIFZlY3RvcjIgUG9zaXRpb24geyBnZXQ7IHNldDsgfVxyXG5cclxuICAgICAgICBpbnRlcm5hbCBHcmFwaGljc0NvbW1hbmQgQ29tbWFuZCB7IGdldDsgc2V0OyB9XHJcblxyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cclxuICAgICAgICAvLy8gUHJpb3JpdHkgb2YgcmVuZGVyaW5nIHRoaXMgY29tcG9uZW50LiBIaWdoZXIgdmFsdWUga2VlcHMgdGhpcyBvbiB0b3AuXHJcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cclxuICAgICAgICBwdWJsaWMgaW50IFByaW9yaXR5IHsgZ2V0OyBzZXQ7IH1cclxuXHJcbiAgICAgICAgcHVibGljIEdVSUVsZW1lbnQoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgUG9zaXRpb24gPSBuZXcgVmVjdG9yMigwLjBmLCAwLjBmKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwidXNpbmcgSnVpY2VCb3hFbmdpbmUuTWF0aDtcclxudXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLkxpbnE7XHJcbnVzaW5nIFN5c3RlbS5UZXh0O1xyXG51c2luZyBTeXN0ZW0uVGhyZWFkaW5nLlRhc2tzO1xyXG5cclxubmFtZXNwYWNlIEp1aWNlQm94RW5naW5lLkdyYXBoaWNzLkdVSVxyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgR1VJTWFuYWdlclxyXG4gICAge1xyXG4gICAgICAgIHByaXZhdGUgTWF0cml4NCBfdmlldztcclxuICAgICAgICBwcml2YXRlIE1hdHJpeDQgX3Byb2plY3Rpb247XHJcblxyXG4gICAgICAgIHByaXZhdGUgR3JhcGhpY3NDb250ZXh0IF9jb250ZXh0O1xyXG5cclxuICAgICAgICBwdWJsaWMgR1VJTWFuYWdlcigpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBfY29udGV4dCA9IEdyYXBoaWNzTWFuYWdlci5JbnN0YW5jZS5Db250ZXh0O1xyXG4gICAgICAgICAgICBfdmlldyA9IG5ldyBNYXRyaXg0KDEuMGYpO1xyXG4gICAgICAgICAgICBfcHJvamVjdGlvbiA9IE1hdHJpeDQuQ3JlYXRlT3J0aG9ncmFwaGljKEdyYXBoaWNzTWFuYWdlci5JbnN0YW5jZS5XaWR0aCwgR3JhcGhpY3NNYW5hZ2VyLkluc3RhbmNlLkhlaWdodCwgMC4wZiwgMTAwLjBmKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIFN0YXJ0VUkoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgX2NvbnRleHQuVXNlRGVwdGgoZmFsc2UpO1xyXG4gICAgICAgICAgICBfY29udGV4dC5TZXRHbG9iYWxTaGFkZXJWYWx1ZShEZWZhdWx0U2hhZGVyVmFsdWVzLkNBTUVSQVBPU0lUSU9OLCBuZXcgVmVjdG9yMigwLjBmLCAwLjBmKSk7XHJcbiAgICAgICAgICAgIF9jb250ZXh0LlNldEdsb2JhbFNoYWRlclZhbHVlKERlZmF1bHRTaGFkZXJWYWx1ZXMuVklFVywgX3ZpZXcpO1xyXG4gICAgICAgICAgICBfY29udGV4dC5TZXRHbG9iYWxTaGFkZXJWYWx1ZShEZWZhdWx0U2hhZGVyVmFsdWVzLlBST0osIF9wcm9qZWN0aW9uKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIEdVSVJlbmRlcihHVUlFbGVtZW50IGVsZW1lbnQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBfY29udGV4dC5Db21tYW5kKGVsZW1lbnQuQ29tbWFuZCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBFbmRVSSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBfY29udGV4dC5Vc2VEZXB0aCh0cnVlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwidXNpbmcgSnVpY2VCb3hFbmdpbmUuU2NlbmU7XHJcbnVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5MaW5xO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxudXNpbmcgU3lzdGVtLlRocmVhZGluZy5UYXNrcztcclxuXHJcbm5hbWVzcGFjZSBKdWljZUJveEVuZ2luZS5HcmFwaGljc1xyXG57XHJcbiAgICBpbnRlcm5hbCBjbGFzcyBQb3N0UHJvY2Vzc2luZ01hbmFnZXJcclxuICAgIHtcclxuICAgICAgICBMaXN0PFBvc3RQcm9jZXNzaW5nRWZmZWN0PiBfZWZmZWN0cztcclxuXHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgICAgIC8vLyBDb25zdHJ1Y3Rvci5cclxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cImNhbWVyYVwiPlRoZSBjYW1lcmEgdGhpcyBtYW5hZ2VyIGlzIGF0dGFjaGVkIHRvLjwvcGFyYW0+XHJcbiAgICAgICAgcHVibGljIFBvc3RQcm9jZXNzaW5nTWFuYWdlcihDYW1lcmEgY2FtZXJhKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgX2VmZmVjdHMgPSBuZXcgTGlzdDxQb3N0UHJvY2Vzc2luZ0VmZmVjdD4oKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cclxuICAgICAgICAvLy8gQWRkIGEgcG9zdCBwcm9jZXNzaW5nIGVmZmVjdCB0byB0aGUgY2FtZXJhLlxyXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwiZWZmZWN0XCI+VGhlIGVmZmVjdCB0byBhZGQuPC9wYXJhbT5cclxuICAgICAgICBwdWJsaWMgdm9pZCBBZGRQb3N0UHJvY2Vzc2luZ0VmZmVjdChQb3N0UHJvY2Vzc2luZ0VmZmVjdCBlZmZlY3QpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBfZWZmZWN0cy5BZGQoZWZmZWN0KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cclxuICAgICAgICAvLy8gRXhlY3V0ZSBhbGwgcG9zdCBwcm9jZXNzaW5nIGVmZmVjdHMgb24gdGhlIGNhbWVyYS5cclxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cInRhcmdldFwiPlRoZSBmaW5hbCBpbWFnZSB0byBwcm9jZXNzLjwvcGFyYW0+XHJcbiAgICAgICAgLy8vIDxyZXR1cm5zPkEgcG9zdCBwcm9jZXNzZWQgaW1hZ2UuPC9yZXR1cm5zPlxyXG4gICAgICAgIHB1YmxpYyB2b2lkIFBvc3RQcm9jZXNzKFJlbmRlclRhcmdldCB0YXJnZXQsIFJlbmRlclRhcmdldCBwb3N0UHJvY2Vzc2VkKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgUmVuZGVyVGFyZ2V0IHRlbXA7XHJcblxyXG4gICAgICAgICAgICBHcmFwaGljc01hbmFnZXIuSW5zdGFuY2UuQ29udGV4dC5Vc2VEZXB0aChmYWxzZSk7XHJcblxyXG4gICAgICAgICAgICBmb3JlYWNoIChQb3N0UHJvY2Vzc2luZ0VmZmVjdCBlZmZlY3QgaW4gX2VmZmVjdHMpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIEdyYXBoaWNzTWFuYWdlci5JbnN0YW5jZS5Db250ZXh0LlNldFJlbmRlclRhcmdldChwb3N0UHJvY2Vzc2VkKTtcclxuICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAvLyBSZW5kZXIgdGhlIGVmZmVjdCB0byBSZXN1bHQuXHJcbiAgICAgICAgICAgICAgICBlZmZlY3QuUmVuZGVyKHRhcmdldCk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gU3dhcCBSZXN1bHQgYW5kIHNvdXJjZSBidWZmZXJzLlxyXG4gICAgICAgICAgICAgICAgdGVtcCA9IHBvc3RQcm9jZXNzZWQ7XHJcbiAgICAgICAgICAgICAgICBwb3N0UHJvY2Vzc2VkID0gdGFyZ2V0O1xyXG4gICAgICAgICAgICAgICAgdGFyZ2V0ID0gdGVtcDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgR3JhcGhpY3NNYW5hZ2VyLkluc3RhbmNlLkNvbnRleHQuVXNlRGVwdGgodHJ1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5MaW5xO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxudXNpbmcgU3lzdGVtLlRocmVhZGluZy5UYXNrcztcclxuXHJcbm5hbWVzcGFjZSBKdWljZUJveEVuZ2luZS5HcmFwaGljc1xyXG57XHJcbiAgICBwdWJsaWMgc3RydWN0IFZlcnRleEF0dHJpYnV0ZVxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBzdHJpbmcgTmFtZTtcclxuICAgICAgICBwdWJsaWMgaW50IENvbXBvbmVudHM7XHJcbiAgICAgICAgcHVibGljIGJvb2wgTm9ybWFsaXplO1xyXG4gICAgICAgIHB1YmxpYyBpbnQgU3RyaWRlO1xyXG4gICAgICAgIHB1YmxpYyBpbnQgT2Zmc2V0O1xyXG5cclxuICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8vIENvbnN0cnVjdCBhIHZlcnRleCBhdHRyaWJ1dGUuXHJcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cclxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJuYW1lXCI+PC9wYXJhbT5cclxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJjb21wb25lbnRzXCI+PC9wYXJhbT5cclxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJ0eXBlXCI+PC9wYXJhbT5cclxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJub3JtYWxpemVcIj48L3BhcmFtPlxyXG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cInN0cmlkZVwiPjwvcGFyYW0+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwib2Zmc2V0XCI+PC9wYXJhbT5cclxuICAgICAgICBwdWJsaWMgVmVydGV4QXR0cmlidXRlKHN0cmluZyBuYW1lLCBpbnQgY29tcG9uZW50cywgYm9vbCBub3JtYWxpemUsIGludCBzdHJpZGUsIGludCBvZmZzZXQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBOYW1lID0gbmFtZTtcclxuICAgICAgICAgICAgQ29tcG9uZW50cyA9IGNvbXBvbmVudHM7XHJcbiAgICAgICAgICAgIE5vcm1hbGl6ZSA9IG5vcm1hbGl6ZTtcclxuICAgICAgICAgICAgU3RyaWRlID0gc3RyaWRlO1xyXG4gICAgICAgICAgICBPZmZzZXQgPSBvZmZzZXQ7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5MaW5xO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxudXNpbmcgU3lzdGVtLlRocmVhZGluZy5UYXNrcztcclxudXNpbmcgQnJpZGdlLkh0bWw1O1xyXG51c2luZyBCcmlkZ2UuV2ViR0w7XHJcblxyXG5uYW1lc3BhY2UgSnVpY2VCb3hFbmdpbmUuR3JhcGhpY3Ncclxue1xyXG4gICAgcHVibGljIGNsYXNzIFZlcnRleEJ1ZmZlciA6IElEaXNwb3NhYmxlXHJcbiAgICB7XHJcbiAgICAgICAgcHJpdmF0ZSBmbG9hdFtdIF9kYXRhO1xyXG4gICAgICAgIGludGVybmFsIFdlYkdMQnVmZmVyIEJ1ZmZlciB7IGdldDsgcHJpdmF0ZSBzZXQ7IH1cclxuICAgICAgICBwcml2YXRlIEdyYXBoaWNzQ29udGV4dCBfY29udGV4dDtcclxuXHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgICAgIC8vLyBUaGUgdmVydGV4IGF0dHJpYnV0ZXMuXHJcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cclxuICAgICAgICBwdWJsaWMgTGlzdDxWZXJ0ZXhBdHRyaWJ1dGU+IEF0dHJpYnV0ZXMgeyBnZXQ7IHByaXZhdGUgc2V0OyB9XHJcblxyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cclxuICAgICAgICAvLy8gVGhlIGFtb3VudCBvZiB2ZXJ0cyBpbiB0aGlzIGJ1ZmZlciAoaW4gZmxvYXRzKVxyXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgcHVibGljIGludCBWZXJ0Q291bnQ7XHJcblxyXG4gICAgICAgIHByaXZhdGUgaW50IF9zdHJpZGU7XHJcblxyXG4gICAgICAgIHB1YmxpYyBWZXJ0ZXhCdWZmZXIoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgX2NvbnRleHQgPSBHcmFwaGljc01hbmFnZXIuSW5zdGFuY2UuQ29udGV4dDtcclxuXHJcbiAgICAgICAgICAgIC8vIFZlcnRjb3VudCBpcyAwIHVudGlsIGF0dHJpYnV0ZXMgYXJlIGdpdmVuLlxyXG4gICAgICAgICAgICBWZXJ0Q291bnQgPSAwO1xyXG4gICAgICAgICAgICBfc3RyaWRlID0gMDtcclxuICAgICAgICAgICAgQXR0cmlidXRlcyA9IG5ldyBMaXN0PFZlcnRleEF0dHJpYnV0ZT4oKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cclxuICAgICAgICAvLy8gQ29uc3RydWN0b3IuXHJcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cclxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJkYXRhXCI+RGF0YSBmb3IgdGhlIHZlcnRleCBidWZmZXIuPC9wYXJhbT5cclxuICAgICAgICBwdWJsaWMgVmVydGV4QnVmZmVyKGZsb2F0W10gZGF0YSlcclxuICAgICAgICAgICAgOiB0aGlzKClcclxuICAgICAgICB7ICAgICAgICAgIFxyXG4gICAgICAgICAgICBfZGF0YSA9IGRhdGE7XHJcbiAgICAgICAgICAgIEJ1ZmZlciA9IF9jb250ZXh0LkNyZWF0ZVZlcnRleEJ1ZmZlcihfZGF0YSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8vIFNldCBhbiBhdHRyaWJ1dGUgZm9yIHRoZSB2ZXJ0ZXhidWZmZXIuXHJcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cclxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJhdHRyaWJ1dGVcIj5UaGUgdmVydGV4YXR0cmlidXRlLiBDYW4gYmUgY3JlYXRlZCB0cm91Z2ggPHNlZSBjcmVmPVwiR3JhcGhpY3NDb250ZXh0XCIvPjwvcGFyYW0+XHJcbiAgICAgICAgcHVibGljIHZvaWQgU2V0QXR0cmlidXRlKFZlcnRleEF0dHJpYnV0ZSBhdHRyaWJ1dGUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBBdHRyaWJ1dGVzLkFkZChhdHRyaWJ1dGUpO1xyXG4gICAgICAgICAgICBfc3RyaWRlID0gYXR0cmlidXRlLlN0cmlkZTtcclxuXHJcbiAgICAgICAgICAgIGlmIChfZGF0YSAhPSBudWxsKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBWZXJ0Q291bnQgPSBDYWxjdWxhdGVWZXJ0ZXhDb3VudChfZGF0YS5MZW5ndGgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIGludCBDYWxjdWxhdGVWZXJ0ZXhDb3VudChpbnQgbGVuZ3RoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy8gQ2FsY3VsYXRlIHZlcnQgY291bnQuICgnNCcgaXMgdGhlIHNpemUgb2YgYSBmbG9hdCBpbiBieXRlcylcclxuICAgICAgICAgICAgcmV0dXJuIGxlbmd0aCAvIChfc3RyaWRlIC8gNCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8vIFVwZGF0ZSBkYXRhIGluIHRoZSB2ZXJ0ZXggYnVmZmVyLlxyXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgcHVibGljIHZvaWQgVXBkYXRlRGF0YShmbG9hdFtdIGRhdGEpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZihDYWxjdWxhdGVWZXJ0ZXhDb3VudChkYXRhLkxlbmd0aCkgPiBWZXJ0Q291bnQpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIF9jb250ZXh0LkRlc3Ryb3lCdWZmZXIoQnVmZmVyKTtcclxuICAgICAgICAgICAgICAgIEJ1ZmZlciA9IF9jb250ZXh0LkNyZWF0ZVZlcnRleEJ1ZmZlcihkYXRhKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIF9jb250ZXh0LlVwZGF0ZVZlcnRleEJ1ZmZlckRhdGEodGhpcywgMCwgZGF0YSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIF9kYXRhID0gZGF0YTtcclxuICAgICAgICAgICAgVmVydENvdW50ID0gQ2FsY3VsYXRlVmVydGV4Q291bnQoX2RhdGEuTGVuZ3RoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cclxuICAgICAgICAvLy8gRGlzcG9zZSBvZiB0aGUgdmVydGV4IGJ1ZmZlci4gKEFsc28gaW4gZ3JhcGhpY3MgbWVtb3J5KVxyXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgcHVibGljIHZvaWQgRGlzcG9zZSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBfY29udGV4dC5EZXN0cm95QnVmZmVyKEJ1ZmZlcik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIEJyaWRnZS5IdG1sNTtcclxudXNpbmcgSnVpY2VCb3hFbmdpbmUuTWF0aDtcclxudXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLkxpbnE7XHJcbnVzaW5nIFN5c3RlbS5UZXh0O1xyXG51c2luZyBTeXN0ZW0uVGhyZWFkaW5nLlRhc2tzO1xyXG5cclxubmFtZXNwYWNlIEp1aWNlQm94RW5naW5lLklucHV0XHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBJbnB1dE1hbmFnZXJcclxuICAgIHtcclxuICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8vIFRoZSBwb3NpdGlvbiBvZiB0aGUgbW91c2UgcmFuZ2luZyBmcm9tIFswLTFdLiBib3R0b20gbGVmdCAoMCwgMClcclxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgICAgIHB1YmxpYyBWZWN0b3IyIE1vdXNlUG9zaXRpb24geyBnZXQ7IHByaXZhdGUgc2V0OyB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgRGljdGlvbmFyeTxzdHJpbmcsIGJvb2w+IEtleUJvYXJkIHsgZ2V0OyBzZXQ7IH1cclxuICAgICAgICBwcml2YXRlIERpY3Rpb25hcnk8c3RyaW5nLCBib29sPiBQcmV2S2V5Qm9hcmQgeyBnZXQ7IHNldDsgfVxyXG5cclxuICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8vIEJvb2xlYW4gc2hvd2luZyBpZiB0aGUgbGVmdCBtb3VzZSBidXR0b24gaXMgY2xpY2tlZC5cclxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgICAgIHB1YmxpYyBib29sIExlZnRDbGljayB7IGdldDsgcHJpdmF0ZSBzZXQ7IH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBIVE1MQ2FudmFzRWxlbWVudCBfY2FudmFzO1xyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIElucHV0TWFuYWdlciBJbnN0YW5jZSB7IGdldDsgcHJpdmF0ZSBzZXQ7IH1cclxuXHJcbiAgICAgICAgcHVibGljIElucHV0TWFuYWdlcihIVE1MQ2FudmFzRWxlbWVudCBjYW52YXMpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBJbnN0YW5jZSA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICBLZXlCb2FyZCA9IG5ldyBEaWN0aW9uYXJ5PHN0cmluZywgYm9vbD4oKTtcclxuXHJcbiAgICAgICAgICAgIF9jYW52YXMgPSBjYW52YXM7XHJcbiAgICAgICAgICAgIF9jYW52YXMuQWRkRXZlbnRMaXN0ZW5lcihFdmVudFR5cGUuTW91c2VNb3ZlLCAoZ2xvYmFsOjpTeXN0ZW0uQWN0aW9uPGdsb2JhbDo6QnJpZGdlLkh0bWw1LkV2ZW50PikoeCA9PiBVcGRhdGVNb3VzZSh4KSkpO1xyXG4gICAgICAgICAgICBfY2FudmFzLkFkZEV2ZW50TGlzdGVuZXIoRXZlbnRUeXBlLk1vdXNlRG93biwgKGdsb2JhbDo6U3lzdGVtLkFjdGlvbjxnbG9iYWw6OkJyaWRnZS5IdG1sNS5FdmVudD4pKHggPT4gVXBkYXRlTW91c2UoeCkpKTtcclxuICAgICAgICAgICAgX2NhbnZhcy5BZGRFdmVudExpc3RlbmVyKEV2ZW50VHlwZS5Nb3VzZVVwLCAoZ2xvYmFsOjpTeXN0ZW0uQWN0aW9uPGdsb2JhbDo6QnJpZGdlLkh0bWw1LkV2ZW50PikoeCA9PiBVcGRhdGVNb3VzZSh4KSkpO1xyXG4gICAgICAgICAgICBEb2N1bWVudC5BZGRFdmVudExpc3RlbmVyKEV2ZW50VHlwZS5LZXlEb3duLCAoZ2xvYmFsOjpTeXN0ZW0uQWN0aW9uPGdsb2JhbDo6QnJpZGdlLkh0bWw1LkV2ZW50PikoeCA9PiBLZXlEb3duKHgpKSk7XHJcbiAgICAgICAgICAgIERvY3VtZW50LkFkZEV2ZW50TGlzdGVuZXIoRXZlbnRUeXBlLktleVVwLCAoZ2xvYmFsOjpTeXN0ZW0uQWN0aW9uPGdsb2JhbDo6QnJpZGdlLkh0bWw1LkV2ZW50PikoeCA9PiBLZXlVcCh4KSkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGJvb2wgSXNLZXlEb3duKHN0cmluZyBrZXkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0cnlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIEtleUJvYXJkW2tleV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2F0Y2hcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHZvaWQgS2V5VXAoRXZlbnQgZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIEtleWJvYXJkRXZlbnQgZXYgPSBlIGFzIEtleWJvYXJkRXZlbnQ7XHJcbiAgICAgICAgICAgIGV2LlByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIHRyeVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBLZXlCb2FyZFtldi5LZXldID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2F0Y2hcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgS2V5Qm9hcmQuQWRkKGV2LktleSwgZmFsc2UpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHZvaWQgS2V5RG93bihFdmVudCBlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgS2V5Ym9hcmRFdmVudCBldiA9IGUgYXMgS2V5Ym9hcmRFdmVudDtcclxuICAgICAgICAgICAgZXYuUHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgICAgIHRyeVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBLZXlCb2FyZFtldi5LZXldID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXRjaFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBLZXlCb2FyZC5BZGQoZXYuS2V5LCB0cnVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSB2b2lkIFVwZGF0ZU1vdXNlKEV2ZW50IGUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBDbGllbnRSZWN0IHJlY3QgPSBfY2FudmFzLkdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG4gICAgICAgICAgICBNb3VzZUV2ZW50IGV2ID0gZSBhcyBNb3VzZUV2ZW50O1xyXG4gICAgICAgICAgICBMZWZ0Q2xpY2sgPSBldi5CdXR0b25zID09IDE7XHJcbiAgICAgICAgICAgIGludCB4UG9zID0gZXYuQ2xpZW50WCAtIChpbnQpcmVjdC5MZWZ0O1xyXG4gICAgICAgICAgICBpbnQgeVBvcyA9IChpbnQpcmVjdC5Cb3R0b20gLSBldi5DbGllbnRZO1xyXG4gICAgICAgICAgICBNb3VzZVBvc2l0aW9uID0gbmV3IFZlY3RvcjIoeFBvcyAvIChmbG9hdClfY2FudmFzLldpZHRoLCB5UG9zIC8gKGZsb2F0KV9jYW52YXMuSGVpZ2h0KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwidXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLkxpbnE7XHJcbnVzaW5nIFN5c3RlbS5UZXh0O1xyXG51c2luZyBTeXN0ZW0uVGhyZWFkaW5nLlRhc2tzO1xyXG51c2luZyBKdWljZUJveEVuZ2luZS5HcmFwaGljcztcclxudXNpbmcgSnVpY2VCb3hFbmdpbmUuU2NlbmU7XHJcbnVzaW5nIEJyaWRnZS5IdG1sNTtcclxudXNpbmcgSnVpY2VCb3hFbmdpbmUuVXRpbDtcclxudXNpbmcgSnVpY2VCb3hFbmdpbmUuSW5wdXQ7XHJcbnVzaW5nIEp1aWNlQm94RW5naW5lLlJlc291cmNlcztcclxuXHJcbm5hbWVzcGFjZSBKdWljZUJveEVuZ2luZVxyXG57XHJcbiAgICBwdWJsaWMgYWJzdHJhY3QgY2xhc3MgSnVpY2Vib3hFbmdpbmVcclxuICAgIHsgXHJcbiAgICAgICAgcHJpdmF0ZSBHcmFwaGljc01hbmFnZXIgX2dyYXBoaWNzTWFuYWdlcjtcclxuICAgICAgICBwcml2YXRlIElucHV0TWFuYWdlciBfaW5wdXRNYW5hZ2VyO1xyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgUmVzb3VyY2VNYW5hZ2VyIF9kZWZhdWx0TWFuYWdlcjtcclxuXHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgICAgIC8vLyBUaGUgY3VycmVudGx5IGFjdGl2ZSBzY2VuZS5cclxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgICAgIHB1YmxpYyBTY2VuZS5TY2VuZSBDdXJyZW50U2NlbmUgeyBnZXQ7IHByaXZhdGUgc2V0OyB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgU2NlbmUuU2NlbmUgX25leHRTY2VuZTtcclxuICAgICAgICBwcml2YXRlIGZsb2F0IF9zY2VuZVN3aXRjaDtcclxuXHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PkluaXRpYWxpemVzIHRoZSBKdWljZWJveCBlbmdpbmUuPC9zdW1tYXJ5PlxyXG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cImNhbnZhc1wiPlRoZSBjYW52YXMgdG8gdXNlLjwvcGFyYW0+XHJcbiAgICAgICAgcHVibGljIEp1aWNlYm94RW5naW5lKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIEhUTUxDYW52YXNFbGVtZW50IGNhbnZhcyA9IERvY3VtZW50LkdldEVsZW1lbnRCeUlkKFwiSnVpY2Vib3hDYW52YXNcIikgYXMgSFRNTENhbnZhc0VsZW1lbnQ7XHJcblxyXG4gICAgICAgICAgICBpZiAoY2FudmFzICE9IG51bGwpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIF9ncmFwaGljc01hbmFnZXIgPSBuZXcgR3JhcGhpY3NNYW5hZ2VyKGNhbnZhcyk7XHJcbiAgICAgICAgICAgICAgICBfaW5wdXRNYW5hZ2VyID0gbmV3IElucHV0TWFuYWdlcihjYW52YXMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIFN5c3RlbS5Db25zb2xlLldyaXRlTGluZShcIk5vIGNhbnZhcyB3aXRoIG5hbWUgXFxcIkp1aWNlYm94Q2FudmFzXFxcIiBmb3VuZCFcIik7XHJcblxyXG4gICAgICAgICAgICBfZGVmYXVsdE1hbmFnZXIgPSBuZXcgUmVzb3VyY2VNYW5hZ2VyKCk7XHJcbiAgICAgICAgICAgIFJlZ2lzdGVyTG9hZGVycyhfZGVmYXVsdE1hbmFnZXIpO1xyXG5cclxuICAgICAgICAgICAgQ3VycmVudFNjZW5lID0gbmV3IFNjZW5lLlNjZW5lKF9kZWZhdWx0TWFuYWdlcik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBTZXRTY2VuZShTY2VuZS5TY2VuZSBzY2VuZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIEN1cnJlbnRTY2VuZSA9IHNjZW5lO1xyXG4gICAgICAgICAgICBDdXJyZW50U2NlbmUuU3RhcnQoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIFNldFNjZW5lKFNjZW5lLlNjZW5lIHNjZW5lLCBmbG9hdCB0cmFuc2l0aW9uRHVyYXRpb24gPSAxLjBmLCBUZXh0dXJlMkQgdHJhbnNpdGlvblRleHR1cmUgPSBudWxsKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKHNjZW5lID09IF9uZXh0U2NlbmUpXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgICAgICBfbmV4dFNjZW5lID0gc2NlbmU7XHJcbiAgICAgICAgICAgIF9uZXh0U2NlbmUuRmFkZUFtb3VudCA9IDEuMGY7XHJcbiAgICAgICAgICAgIF9zY2VuZVN3aXRjaCA9IHRyYW5zaXRpb25EdXJhdGlvbjtcclxuICAgICAgICAgICAgQ3VycmVudFNjZW5lLkZhZGVUZXh0dXJlID0gdHJhbnNpdGlvblRleHR1cmU7XHJcbiAgICAgICAgICAgIF9uZXh0U2NlbmUuRmFkZVRleHR1cmUgPSB0cmFuc2l0aW9uVGV4dHVyZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cclxuICAgICAgICAvLy8gQ2FsbGVkIHRvIHN0YXJ0IHRoZSBnYW1lIGVuZ2luZS5cclxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgICAgIHB1YmxpYyB2aXJ0dWFsIHZvaWQgUnVuKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8vIFN0YXJ0IHVwZGF0aW5nIHRoZSBlbmdpbmUuXHJcbiAgICAgICAgICAgIFVwZGF0ZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgICAgIC8vLyBSZWdpc3RlciByZXNvdXJjZWxvYWRlcnMgdG8gdGhlIGdpdmVuIHJlc291cmNlIG1hbmFnZXIuXHJcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cclxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJyZXNvdXJjZU1hbmFnZXJcIj5UaGUgcmVzb3VyY2UgbWFuYWdlciB0byByZWdpc3RlciBhbGwgdGhlIGxvYWRlcnMgdG8uPC9wYXJhbT5cclxuICAgICAgICBwdWJsaWMgdmlydHVhbCB2b2lkIFJlZ2lzdGVyTG9hZGVycyhSZXNvdXJjZU1hbmFnZXIgcmVzb3VyY2VNYW5hZ2VyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgX2dyYXBoaWNzTWFuYWdlci5SZWdpc3RlckxvYWRlcnMocmVzb3VyY2VNYW5hZ2VyKTtcclxuICAgICAgICAgICAgcmVzb3VyY2VNYW5hZ2VyLlJlZ2lzdGVyUmVzb3VyY2VNYW5hZ2VyKG5ldyBTb3VuZC5Tb3VuZFJlc291cmNlTG9hZGVyKFwiU291bmRMb2FkZXJcIiwgXCJ3YXZcIikpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlVwZGF0ZSB0aGUgZW5naW5lLjwvc3VtbWFyeT5cclxuICAgICAgICBwdWJsaWMgdmlydHVhbCB2b2lkIFVwZGF0ZSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAvLyBVcGRhdGUgdGhlIHRpbWUuXHJcbiAgICAgICAgICAgIFRpbWUuVXBkYXRlKCk7XHJcblxyXG4gICAgICAgICAgICAvLyBJZiB0aGVyZSBpcyBhIHNjZW5lIHRvIHN3aXRjaCB0by5cclxuICAgICAgICAgICAgaWYoX25leHRTY2VuZSAhPSBudWxsKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBfc2NlbmVTd2l0Y2ggLT0gVGltZS5EZWx0YVRpbWVSZWFsVGltZTtcclxuXHJcbiAgICAgICAgICAgICAgICBDdXJyZW50U2NlbmUuRmFkZUFtb3VudCA9IDEuMGYgLSBfc2NlbmVTd2l0Y2g7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKF9zY2VuZVN3aXRjaCA8PSAwLjBmKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIEN1cnJlbnRTY2VuZSA9IF9uZXh0U2NlbmU7XHJcbiAgICAgICAgICAgICAgICAgICAgQ3VycmVudFNjZW5lLlN0YXJ0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgX25leHRTY2VuZSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZihDdXJyZW50U2NlbmUuRmFkZUFtb3VudCA+IDAuMGYpXHJcbiAgICAgICAgICAgICAgICBDdXJyZW50U2NlbmUuRmFkZUFtb3VudCAtPSBUaW1lLkRlbHRhVGltZVJlYWxUaW1lO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0cnlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgLy8gVXBkYXRlIHRoZSBncmFwaGljcyBtYW5hZ2VyLlxyXG4gICAgICAgICAgICAgICAgX2dyYXBoaWNzTWFuYWdlci5VcGRhdGUoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBVcGRhdGUgYWxsIG9iamVjdHMgaW4gdGhlIHNjZW5lLlxyXG4gICAgICAgICAgICAgICAgQ3VycmVudFNjZW5lLlVwZGF0ZSgpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIFJlbmRlciB0aGUgc2NlbmUuXHJcbiAgICAgICAgICAgICAgICBDdXJyZW50U2NlbmUuUmVuZGVyKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2F0Y2ggKEV4Y2VwdGlvbiBlKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBTeXN0ZW0uQ29uc29sZS5Xcml0ZUxpbmUoXCJTb21ldGhpbmcgd2VudCB3cm9uZyBpbiB0aGUgdXBkYXRlIGxvb3AhXCIgKyBlLlRvU3RyaW5nKCkpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvL0JyaWRnZS5IdG1sNS5XaW5kb3cuU2V0VGltZW91dCgoKSA9PiBVcGRhdGUoKSwgMCk7XHJcbiAgICAgICAgICAgIEJyaWRnZS5IdG1sNS5XaW5kb3cuUmVxdWVzdEFuaW1hdGlvbkZyYW1lKChnbG9iYWw6OlN5c3RlbS5BY3Rpb24pKCgpID0+IFVwZGF0ZSgpKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwidXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLkxpbnE7XHJcbnVzaW5nIFN5c3RlbS5UZXh0O1xyXG51c2luZyBTeXN0ZW0uVGhyZWFkaW5nLlRhc2tzO1xyXG5cclxubmFtZXNwYWNlIEp1aWNlQm94RW5naW5lLk1hdGhcclxue1xyXG4gICAgcHVibGljIHN0cnVjdCBDb2xvcjMyXHJcbiAgICB7XHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlRoZSByZWQgdmFsdWUuPC9zdW1tYXJ5PlxyXG4gICAgICAgIHB1YmxpYyBmbG9hdCBSO1xyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5UaGUgZ3JlZW4gdmFsdWUuPC9zdW1tYXJ5PlxyXG4gICAgICAgIHB1YmxpYyBmbG9hdCBHO1xyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5UaGUgYmx1ZSB2YWx1ZS48L3N1bW1hcnk+XHJcbiAgICAgICAgcHVibGljIGZsb2F0IEI7XHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlRoZSBBbHBoYSB2YWx1ZS48L3N1bW1hcnk+XHJcbiAgICAgICAgcHVibGljIGZsb2F0IEE7XHJcblxyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cclxuICAgICAgICAvLy8gQ29uc3RydWN0cyBhIGNvbG9yLlxyXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwiclwiPlJlZCB2YWx1ZSwgcmFuZ2luZyAwLTEuPC9wYXJhbT5cclxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJnXCI+R3JlZW4gdmFsdWUsIHJhbmdpbmcgMC0xLjwvcGFyYW0+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwiYlwiPkJsdWUgdmFsdWUsIHJhbmdpbmcgMC0xLjwvcGFyYW0+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwiYVwiPkFscGhhIHZhbHVlLCByYW5naW5nIDAtMS48L3BhcmFtPlxyXG4gICAgICAgIHB1YmxpYyBDb2xvcjMyKGZsb2F0IHIsIGZsb2F0IGcsIGZsb2F0IGIsIGZsb2F0IGEpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBSID0gcjtcclxuICAgICAgICAgICAgRyA9IGc7XHJcbiAgICAgICAgICAgIEIgPSBiO1xyXG4gICAgICAgICAgICBBID0gYTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBDb2xvcjMyKGludCByLCBpbnQgZywgaW50IGIsIGludCBhKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgUiA9IHIgLyAyNTYuMGY7XHJcbiAgICAgICAgICAgIEcgPSBnIC8gMjU2LjBmO1xyXG4gICAgICAgICAgICBCID0gYiAvIDI1Ni4wZjtcclxuICAgICAgICAgICAgQSA9IGEgLyAyNTYuMGY7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5MaW5xO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxudXNpbmcgU3lzdGVtLlRocmVhZGluZy5UYXNrcztcclxuXHJcbm5hbWVzcGFjZSBKdWljZUJveEVuZ2luZS5NYXRoXHJcbntcclxuICAgIHB1YmxpYyBzdGF0aWMgY2xhc3MgTWF0aFxyXG4gICAge1xyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5DYWxjdWxhdGVzIHRoZSBzcXVhcmUgcm9vdCBvZiBhIG51bWJlci48L3N1bW1hcnk+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwidmFsdWVcIj5UaGUgdmFsdWUgdG8gZ2V0IHRoZSBzcXVhcmUgcm9vdCBmcm9tLjwvcGFyYW0+XHJcbiAgICAgICAgLy8vIDxyZXR1cm5zPlRoZSBzcXVhcmUgcm9vdCBvZiBhIGdpdmVuIG51bWJlci48L3JldHVybnM+XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBmbG9hdCBTcXJ0KGZsb2F0IHZhbHVlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIChmbG9hdClTeXN0ZW0uTWF0aC5TcXJ0KHZhbHVlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cclxuICAgICAgICAvLy8gQ2FsY3VsYXRlcyBiIHRvIHRoZSBwb3dlciBwLiAoYl5wKVxyXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwiYlwiPlRoZSBiYXNlLjwvcGFyYW0+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwicFwiPlRoZSBwb3dlci48L3BhcmFtPlxyXG4gICAgICAgIC8vLyA8cmV0dXJucz48L3JldHVybnM+XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBmbG9hdCBQb3coZmxvYXQgYiwgZmxvYXQgcClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiAoZmxvYXQpU3lzdGVtLk1hdGguUG93KGIsIHApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlNpbiBmdW5jdGlvbi48L3N1bW1hcnk+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwidmFsdWVcIj5WYWx1ZSBmb3IgdGhlIHNpbiBmdW5jdGlvbi48L3BhcmFtPlxyXG4gICAgICAgIC8vLyA8cmV0dXJucz5BIHZhbHVlIGZyb20gdGhlIHNpbiBmdW5jdGlvbi48L3JldHVybnM+XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBmbG9hdCBTaW4oZmxvYXQgdmFsdWUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gKGZsb2F0KVN5c3RlbS5NYXRoLlNpbih2YWx1ZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLy8gPHN1bW1hcnk+Q29zIGZ1bmN0aW9uLjwvc3VtbWFyeT5cclxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJ2YWx1ZVwiPlZhbHVlIGZvciB0aGUgY29zIGZ1bmN0aW9uLjwvcGFyYW0+XHJcbiAgICAgICAgLy8vIDxyZXR1cm5zPkEgdmFsdWUgZnJvbSB0aGUgY29zIGZ1bmN0aW9uLjwvcmV0dXJucz5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIGZsb2F0IENvcyhmbG9hdCB2YWx1ZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiAoZmxvYXQpU3lzdGVtLk1hdGguQ29zKHZhbHVlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5UYW4gZnVuY3Rpb24uPC9zdW1tYXJ5PlxyXG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cInZhbHVlXCI+VmFsdWUgZm9yIHRoZSB0YW4gZnVuY3Rpb24uPC9wYXJhbT5cclxuICAgICAgICAvLy8gPHJldHVybnM+QSB2YWx1ZSBmcm9tIHRoZSB0YW4gZnVuY3Rpb24uPC9yZXR1cm5zPlxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgZmxvYXQgVGFuKGZsb2F0IHZhbHVlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIChmbG9hdClTeXN0ZW0uTWF0aC5UYW4odmFsdWUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgICAgIC8vLyBSb3VuZCB0aGUgZ2l2ZW4gdmFsdWUgdG8gdGhlIG5lYXJlc3QgaW50ZWdlci5cclxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cInZhbHVlXCI+VGhlIHZhbHVlIHRvIHJvdW5kLjwvcGFyYW0+XHJcbiAgICAgICAgLy8vIDxyZXR1cm5zPlRoZSByb3VuZGVkIHZhbHVlIGNsb3Nlc3QgdG8gdGhlIGdpdmVuIHZhbHVlLjwvcmV0dXJucz5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIGZsb2F0IFJvdW5kKGZsb2F0IHZhbHVlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIChmbG9hdClTeXN0ZW0uTWF0aC5Sb3VuZCh2YWx1ZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8vIFBpbmcgcG9uZyBhIHZhbHVlIGJldHdlZW4gMCBhbmQgbGVuZ3RoXHJcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cclxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJ0XCI+PC9wYXJhbT5cclxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJsZW5ndGhcIj48L3BhcmFtPlxyXG4gICAgICAgIC8vLyA8cmV0dXJucz48L3JldHVybnM+XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBmbG9hdCBQaW5nUG9uZyhmbG9hdCB0LCBmbG9hdCBsZW5ndGgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmbG9hdCBsID0gMiAqIGxlbmd0aDtcclxuICAgICAgICAgICAgZmxvYXQgVCA9IHQgJSBsO1xyXG5cclxuICAgICAgICAgICAgaWYgKDAgPD0gVCAmJiBUIDwgbGVuZ3RoKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFQ7XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHJldHVybiBsIC0gVDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwidXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLkxpbnE7XHJcbnVzaW5nIFN5c3RlbS5UZXh0O1xyXG51c2luZyBTeXN0ZW0uVGhyZWFkaW5nLlRhc2tzO1xyXG5cclxubmFtZXNwYWNlIEp1aWNlQm94RW5naW5lLk1hdGhcclxue1xyXG4gICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgLy8vIE1hdHJpeCBjbGFzcyByZXByZXNlbnRpbmcgYSA0eDQgbWF0cml4LiBNb3N0bHkgZnJvbSBNb25vR2FtZS5cclxuICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICBwdWJsaWMgc3RydWN0IE1hdHJpeDRcclxuICAgIHtcclxuICAgICAgICAvLy8gPHN1bW1hcnk+Rmlyc3Qgcm93IGFuZCBmaXJzdCBjb2x1bW4gdmFsdWUuPC9zdW1tYXJ5PlxyXG4gICAgICAgIHB1YmxpYyBmbG9hdCBNMTE7XHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PkZpcnN0IHJvdyBhbmQgc2Vjb25kIGNvbHVtbiB2YWx1ZS48L3N1bW1hcnk+XHJcbiAgICAgICAgcHVibGljIGZsb2F0IE0xMjtcclxuICAgICAgICAvLy8gPHN1bW1hcnk+Rmlyc3Qgcm93IGFuZCB0aGlyZCBjb2x1bW4gdmFsdWUuPC9zdW1tYXJ5PlxyXG4gICAgICAgIHB1YmxpYyBmbG9hdCBNMTM7XHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PkZpcnN0IHJvdyBhbmQgZm91dGggY29sdW1uIHZhbHVlLjwvc3VtbWFyeT5cclxuICAgICAgICBwdWJsaWMgZmxvYXQgTTE0O1xyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5TZWNvbmQgcm93IGFuZCBmaXJzdCBjb2x1bW4gdmFsdWUuPC9zdW1tYXJ5PlxyXG4gICAgICAgIHB1YmxpYyBmbG9hdCBNMjE7XHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlNlY29uZCByb3cgYW5kIHNlY29uZCBjb2x1bW4gdmFsdWUuPC9zdW1tYXJ5PlxyXG4gICAgICAgIHB1YmxpYyBmbG9hdCBNMjI7XHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlNlY29uZCByb3cgYW5kIHRoaXJkIGNvbHVtbiB2YWx1ZS48L3N1bW1hcnk+XHJcbiAgICAgICAgcHVibGljIGZsb2F0IE0yMztcclxuICAgICAgICAvLy8gPHN1bW1hcnk+U2Vjb25kIHJvdyBhbmQgZm91dGggY29sdW1uIHZhbHVlLjwvc3VtbWFyeT5cclxuICAgICAgICBwdWJsaWMgZmxvYXQgTTI0O1xyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5UaGlyZCByb3cgYW5kIGZpcnN0IGNvbHVtbiB2YWx1ZS48L3N1bW1hcnk+XHJcbiAgICAgICAgcHVibGljIGZsb2F0IE0zMTtcclxuICAgICAgICAvLy8gPHN1bW1hcnk+VGhpcmQgcm93IGFuZCBzZWNvbmQgY29sdW1uIHZhbHVlLjwvc3VtbWFyeT5cclxuICAgICAgICBwdWJsaWMgZmxvYXQgTTMyO1xyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5UaGlyZCByb3cgYW5kIHRoaXJkIGNvbHVtbiB2YWx1ZS48L3N1bW1hcnk+XHJcbiAgICAgICAgcHVibGljIGZsb2F0IE0zMztcclxuICAgICAgICAvLy8gPHN1bW1hcnk+VGhpcmQgcm93IGFuZCBmb3V0aCBjb2x1bW4gdmFsdWUuPC9zdW1tYXJ5PlxyXG4gICAgICAgIHB1YmxpYyBmbG9hdCBNMzQ7XHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PkZvdXJ0aCByb3cgYW5kIGZpcnN0IGNvbHVtbiB2YWx1ZS48L3N1bW1hcnk+XHJcbiAgICAgICAgcHVibGljIGZsb2F0IE00MTtcclxuICAgICAgICAvLy8gPHN1bW1hcnk+Rm91cnRoIHJvdyBhbmQgc2Vjb25kIGNvbHVtbiB2YWx1ZS48L3N1bW1hcnk+XHJcbiAgICAgICAgcHVibGljIGZsb2F0IE00MjtcclxuICAgICAgICAvLy8gPHN1bW1hcnk+Rm91cnRoIHJvdyBhbmQgdGhpcmQgY29sdW1uIHZhbHVlLjwvc3VtbWFyeT5cclxuICAgICAgICBwdWJsaWMgZmxvYXQgTTQzO1xyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5Gb3VydGggcm93IGFuZCBmb3V0aCBjb2x1bW4gdmFsdWUuPC9zdW1tYXJ5PlxyXG4gICAgICAgIHB1YmxpYyBmbG9hdCBNNDQ7XHJcblxyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5Db25zdHJ1Y3RzIGEgbWF0cml4IHdpdGggYSBkaWFnb25hbCB3aXRoIHRoZSBnaXZlbiB2YWx1ZS48L3N1bW1hcnk+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwidmFsdWVcIj5UaGUgdmFsdWUgZm9yIHRoZSBkaWFnb25hbCBpbiB0aGUgbWF0cml4LjwvcGFyYW0+XHJcbiAgICAgICAgcHVibGljIE1hdHJpeDQoZmxvYXQgdmFsdWUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBNMTEgPSB2YWx1ZTsgTTEyID0gMC4wZjsgTTEzID0gMC4wZjsgTTE0ID0gMC4wZjtcclxuICAgICAgICAgICAgTTIxID0gMC4wZjsgTTIyID0gdmFsdWU7IE0yMyA9IDAuMGY7IE0yNCA9IDAuMGY7XHJcbiAgICAgICAgICAgIE0zMSA9IDAuMGY7IE0zMiA9IDAuMGY7IE0zMyA9IHZhbHVlOyBNMzQgPSAwLjBmO1xyXG4gICAgICAgICAgICBNNDEgPSAwLjBmOyBNNDIgPSAwLjBmOyBNNDMgPSAwLjBmOyBNNDQgPSB2YWx1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5Db25zdHJ1Y3RzIGEgbWF0cml4IHdpdGggdGhlIGdpdmVuIHZhbHVlcy48L3N1bW1hcnk+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwibTExXCI+Rmlyc3Qgcm93IGFuZCBmaXJzdCBjb2x1bW4gdmFsdWUuPC9wYXJhbT5cclxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJtMTJcIj5GaXJzdCByb3cgYW5kIHNlY29uZCBjb2x1bW4gdmFsdWUuPC9wYXJhbT5cclxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJtMTNcIj5GaXJzdCByb3cgYW5kIHRoaXJkIGNvbHVtbiB2YWx1ZS48L3BhcmFtPlxyXG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cIm0xNFwiPkZpcnN0IHJvdyBhbmQgZm91cnRoIGNvbHVtbiB2YWx1ZS48L3BhcmFtPlxyXG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cIm0yMVwiPlNlY29uZCByb3cgYW5kIGZpcnN0IGNvbHVtbiB2YWx1ZS48L3BhcmFtPlxyXG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cIm0yMlwiPlNlY29uZCByb3cgYW5kIHNlY29uZCBjb2x1bW4gdmFsdWUuPC9wYXJhbT5cclxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJtMjNcIj5TZWNvbmQgcm93IGFuZCB0aGlyZCBjb2x1bW4gdmFsdWUuPC9wYXJhbT5cclxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJtMjRcIj5TZWNvbmQgcm93IGFuZCBmb3VydGggY29sdW1uIHZhbHVlLjwvcGFyYW0+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwibTMxXCI+VGhpcmQgcm93IGFuZCBmaXJzdCBjb2x1bW4gdmFsdWUuPC9wYXJhbT5cclxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJtMzJcIj5UaGlyZCByb3cgYW5kIHNlY29uZCBjb2x1bW4gdmFsdWUuPC9wYXJhbT5cclxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJtMzNcIj5UaGlyZCByb3cgYW5kIHRoaXJkIGNvbHVtbiB2YWx1ZS48L3BhcmFtPlxyXG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cIm0zNFwiPlRoaXJkIHJvdyBhbmQgZm91cnRoIGNvbHVtbiB2YWx1ZS48L3BhcmFtPlxyXG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cIm00MVwiPkZvdXJ0aCByb3cgYW5kIGZpcnN0IGNvbHVtbiB2YWx1ZS48L3BhcmFtPlxyXG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cIm00MlwiPkZvdXJ0aCByb3cgYW5kIHNlY29uZCBjb2x1bW4gdmFsdWUuPC9wYXJhbT5cclxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJtNDNcIj5Gb3VydGggcm93IGFuZCB0aGlyZCBjb2x1bW4gdmFsdWUuPC9wYXJhbT5cclxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJtNDRcIj5Gb3VydGggcm93IGFuZCBmb3VydGggY29sdW1uIHZhbHVlLjwvcGFyYW0+XHJcbiAgICAgICAgcHVibGljIE1hdHJpeDQoZmxvYXQgbTExLCBmbG9hdCBtMTIsIGZsb2F0IG0xMywgZmxvYXQgbTE0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmbG9hdCBtMjEsIGZsb2F0IG0yMiwgZmxvYXQgbTIzLCBmbG9hdCBtMjQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZsb2F0IG0zMSwgZmxvYXQgbTMyLCBmbG9hdCBtMzMsIGZsb2F0IG0zNCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmxvYXQgbTQxLCBmbG9hdCBtNDIsIGZsb2F0IG00MywgZmxvYXQgbTQ0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgTTExID0gbTExO1xyXG4gICAgICAgICAgICBNMTIgPSBtMTI7XHJcbiAgICAgICAgICAgIE0xMyA9IG0xMztcclxuICAgICAgICAgICAgTTE0ID0gbTE0O1xyXG4gICAgICAgICAgICBNMjEgPSBtMjE7XHJcbiAgICAgICAgICAgIE0yMiA9IG0yMjtcclxuICAgICAgICAgICAgTTIzID0gbTIzO1xyXG4gICAgICAgICAgICBNMjQgPSBtMjQ7XHJcbiAgICAgICAgICAgIE0zMSA9IG0zMTtcclxuICAgICAgICAgICAgTTMyID0gbTMyO1xyXG4gICAgICAgICAgICBNMzMgPSBtMzM7XHJcbiAgICAgICAgICAgIE0zNCA9IG0zNDtcclxuICAgICAgICAgICAgTTQxID0gbTQxO1xyXG4gICAgICAgICAgICBNNDIgPSBtNDI7XHJcbiAgICAgICAgICAgIE00MyA9IG00MztcclxuICAgICAgICAgICAgTTQ0ID0gbTQ0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgICAgIC8vLyBUcmFuc3Bvc2UgdGhlIGdpdmVuIG1hdHJpeC5cclxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cIm1hdHJpeFwiPlRoZSBtYXRyaXggdG8gdHJhbnNwb3NlLjwvcGFyYW0+XHJcbiAgICAgICAgLy8vIDxyZXR1cm5zPkEgbWF0cml4IHRyYW5wb3NlZCB0byB0aGUgZ2l2ZW4gbWF0cml4LjwvcmV0dXJucz5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIE1hdHJpeDQgVHJhbnNwb3NlKE1hdHJpeDQgbWF0cml4KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgTWF0cml4NCBtYXQgPSBuZXcgTWF0cml4NCgpO1xyXG5cclxuICAgICAgICAgICAgbWF0Lk0xMSA9IG1hdHJpeC5NMTE7XHJcbiAgICAgICAgICAgIG1hdC5NMTIgPSBtYXRyaXguTTIxO1xyXG4gICAgICAgICAgICBtYXQuTTEzID0gbWF0cml4Lk0zMTtcclxuICAgICAgICAgICAgbWF0Lk0xNCA9IG1hdHJpeC5NNDE7XHJcblxyXG4gICAgICAgICAgICBtYXQuTTIxID0gbWF0cml4Lk0xMjtcclxuICAgICAgICAgICAgbWF0Lk0yMiA9IG1hdHJpeC5NMjI7XHJcbiAgICAgICAgICAgIG1hdC5NMjMgPSBtYXRyaXguTTMyO1xyXG4gICAgICAgICAgICBtYXQuTTI0ID0gbWF0cml4Lk00MjtcclxuXHJcbiAgICAgICAgICAgIG1hdC5NMzEgPSBtYXRyaXguTTEzO1xyXG4gICAgICAgICAgICBtYXQuTTMyID0gbWF0cml4Lk0yMztcclxuICAgICAgICAgICAgbWF0Lk0zMyA9IG1hdHJpeC5NMzM7XHJcbiAgICAgICAgICAgIG1hdC5NMzQgPSBtYXRyaXguTTQzO1xyXG5cclxuICAgICAgICAgICAgbWF0Lk00MSA9IG1hdHJpeC5NMTQ7XHJcbiAgICAgICAgICAgIG1hdC5NNDIgPSBtYXRyaXguTTI0O1xyXG4gICAgICAgICAgICBtYXQuTTQzID0gbWF0cml4Lk0zNDtcclxuICAgICAgICAgICAgbWF0Lk00NCA9IG1hdHJpeC5NNDQ7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gbWF0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgICAgIC8vLyBBZGQgdG8gbWF0cml4ZXMgdG8gZWFjaCBvdGhlci5cclxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cIm1hdHJpeDFcIj5UaGUgZmlyc3QgbWF0cml4LjwvcGFyYW0+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwibWF0cml4MlwiPlRoZSBzZWNvbmQgbWF0cml4LjwvcGFyYW0+XHJcbiAgICAgICAgLy8vIDxyZXR1cm5zPkEgbWF0cml4IGNvbnRhaW5pbmcgdGhlIHN1bSBvZiB0aGUgZ2l2ZW4gbWF0cml4ZXMuPC9yZXR1cm5zPlxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgTWF0cml4NCBBZGQoTWF0cml4NCBtYXRyaXgxLCBNYXRyaXg0IG1hdHJpeDIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBtYXRyaXgxLk0xMSArPSBtYXRyaXgyLk0xMTtcclxuICAgICAgICAgICAgbWF0cml4MS5NMTIgKz0gbWF0cml4Mi5NMTI7XHJcbiAgICAgICAgICAgIG1hdHJpeDEuTTEzICs9IG1hdHJpeDIuTTEzO1xyXG4gICAgICAgICAgICBtYXRyaXgxLk0xNCArPSBtYXRyaXgyLk0xNDtcclxuICAgICAgICAgICAgbWF0cml4MS5NMjEgKz0gbWF0cml4Mi5NMjE7XHJcbiAgICAgICAgICAgIG1hdHJpeDEuTTIyICs9IG1hdHJpeDIuTTIyO1xyXG4gICAgICAgICAgICBtYXRyaXgxLk0yMyArPSBtYXRyaXgyLk0yMztcclxuICAgICAgICAgICAgbWF0cml4MS5NMjQgKz0gbWF0cml4Mi5NMjQ7XHJcbiAgICAgICAgICAgIG1hdHJpeDEuTTMxICs9IG1hdHJpeDIuTTMxO1xyXG4gICAgICAgICAgICBtYXRyaXgxLk0zMiArPSBtYXRyaXgyLk0zMjtcclxuICAgICAgICAgICAgbWF0cml4MS5NMzMgKz0gbWF0cml4Mi5NMzM7XHJcbiAgICAgICAgICAgIG1hdHJpeDEuTTM0ICs9IG1hdHJpeDIuTTM0O1xyXG4gICAgICAgICAgICBtYXRyaXgxLk00MSArPSBtYXRyaXgyLk00MTtcclxuICAgICAgICAgICAgbWF0cml4MS5NNDIgKz0gbWF0cml4Mi5NNDI7XHJcbiAgICAgICAgICAgIG1hdHJpeDEuTTQzICs9IG1hdHJpeDIuTTQzO1xyXG4gICAgICAgICAgICBtYXRyaXgxLk00NCArPSBtYXRyaXgyLk00NDtcclxuICAgICAgICAgICAgcmV0dXJuIG1hdHJpeDE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIE1hdHJpeDQgTXVsdGlwbHkoTWF0cml4NCBtYXRyaXgxLCBNYXRyaXg0IG1hdHJpeDIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmbG9hdCBtMTEgPSAoKChtYXRyaXgxLk0xMSAqIG1hdHJpeDIuTTExKSArIChtYXRyaXgxLk0xMiAqIG1hdHJpeDIuTTIxKSkgKyAobWF0cml4MS5NMTMgKiBtYXRyaXgyLk0zMSkpICsgKG1hdHJpeDEuTTE0ICogbWF0cml4Mi5NNDEpO1xyXG4gICAgICAgICAgICBmbG9hdCBtMTIgPSAoKChtYXRyaXgxLk0xMSAqIG1hdHJpeDIuTTEyKSArIChtYXRyaXgxLk0xMiAqIG1hdHJpeDIuTTIyKSkgKyAobWF0cml4MS5NMTMgKiBtYXRyaXgyLk0zMikpICsgKG1hdHJpeDEuTTE0ICogbWF0cml4Mi5NNDIpO1xyXG4gICAgICAgICAgICBmbG9hdCBtMTMgPSAoKChtYXRyaXgxLk0xMSAqIG1hdHJpeDIuTTEzKSArIChtYXRyaXgxLk0xMiAqIG1hdHJpeDIuTTIzKSkgKyAobWF0cml4MS5NMTMgKiBtYXRyaXgyLk0zMykpICsgKG1hdHJpeDEuTTE0ICogbWF0cml4Mi5NNDMpO1xyXG4gICAgICAgICAgICBmbG9hdCBtMTQgPSAoKChtYXRyaXgxLk0xMSAqIG1hdHJpeDIuTTE0KSArIChtYXRyaXgxLk0xMiAqIG1hdHJpeDIuTTI0KSkgKyAobWF0cml4MS5NMTMgKiBtYXRyaXgyLk0zNCkpICsgKG1hdHJpeDEuTTE0ICogbWF0cml4Mi5NNDQpO1xyXG4gICAgICAgICAgICBmbG9hdCBtMjEgPSAoKChtYXRyaXgxLk0yMSAqIG1hdHJpeDIuTTExKSArIChtYXRyaXgxLk0yMiAqIG1hdHJpeDIuTTIxKSkgKyAobWF0cml4MS5NMjMgKiBtYXRyaXgyLk0zMSkpICsgKG1hdHJpeDEuTTI0ICogbWF0cml4Mi5NNDEpO1xyXG4gICAgICAgICAgICBmbG9hdCBtMjIgPSAoKChtYXRyaXgxLk0yMSAqIG1hdHJpeDIuTTEyKSArIChtYXRyaXgxLk0yMiAqIG1hdHJpeDIuTTIyKSkgKyAobWF0cml4MS5NMjMgKiBtYXRyaXgyLk0zMikpICsgKG1hdHJpeDEuTTI0ICogbWF0cml4Mi5NNDIpO1xyXG4gICAgICAgICAgICBmbG9hdCBtMjMgPSAoKChtYXRyaXgxLk0yMSAqIG1hdHJpeDIuTTEzKSArIChtYXRyaXgxLk0yMiAqIG1hdHJpeDIuTTIzKSkgKyAobWF0cml4MS5NMjMgKiBtYXRyaXgyLk0zMykpICsgKG1hdHJpeDEuTTI0ICogbWF0cml4Mi5NNDMpO1xyXG4gICAgICAgICAgICBmbG9hdCBtMjQgPSAoKChtYXRyaXgxLk0yMSAqIG1hdHJpeDIuTTE0KSArIChtYXRyaXgxLk0yMiAqIG1hdHJpeDIuTTI0KSkgKyAobWF0cml4MS5NMjMgKiBtYXRyaXgyLk0zNCkpICsgKG1hdHJpeDEuTTI0ICogbWF0cml4Mi5NNDQpO1xyXG4gICAgICAgICAgICBmbG9hdCBtMzEgPSAoKChtYXRyaXgxLk0zMSAqIG1hdHJpeDIuTTExKSArIChtYXRyaXgxLk0zMiAqIG1hdHJpeDIuTTIxKSkgKyAobWF0cml4MS5NMzMgKiBtYXRyaXgyLk0zMSkpICsgKG1hdHJpeDEuTTM0ICogbWF0cml4Mi5NNDEpO1xyXG4gICAgICAgICAgICBmbG9hdCBtMzIgPSAoKChtYXRyaXgxLk0zMSAqIG1hdHJpeDIuTTEyKSArIChtYXRyaXgxLk0zMiAqIG1hdHJpeDIuTTIyKSkgKyAobWF0cml4MS5NMzMgKiBtYXRyaXgyLk0zMikpICsgKG1hdHJpeDEuTTM0ICogbWF0cml4Mi5NNDIpO1xyXG4gICAgICAgICAgICBmbG9hdCBtMzMgPSAoKChtYXRyaXgxLk0zMSAqIG1hdHJpeDIuTTEzKSArIChtYXRyaXgxLk0zMiAqIG1hdHJpeDIuTTIzKSkgKyAobWF0cml4MS5NMzMgKiBtYXRyaXgyLk0zMykpICsgKG1hdHJpeDEuTTM0ICogbWF0cml4Mi5NNDMpO1xyXG4gICAgICAgICAgICBmbG9hdCBtMzQgPSAoKChtYXRyaXgxLk0zMSAqIG1hdHJpeDIuTTE0KSArIChtYXRyaXgxLk0zMiAqIG1hdHJpeDIuTTI0KSkgKyAobWF0cml4MS5NMzMgKiBtYXRyaXgyLk0zNCkpICsgKG1hdHJpeDEuTTM0ICogbWF0cml4Mi5NNDQpO1xyXG4gICAgICAgICAgICBmbG9hdCBtNDEgPSAoKChtYXRyaXgxLk00MSAqIG1hdHJpeDIuTTExKSArIChtYXRyaXgxLk00MiAqIG1hdHJpeDIuTTIxKSkgKyAobWF0cml4MS5NNDMgKiBtYXRyaXgyLk0zMSkpICsgKG1hdHJpeDEuTTQ0ICogbWF0cml4Mi5NNDEpO1xyXG4gICAgICAgICAgICBmbG9hdCBtNDIgPSAoKChtYXRyaXgxLk00MSAqIG1hdHJpeDIuTTEyKSArIChtYXRyaXgxLk00MiAqIG1hdHJpeDIuTTIyKSkgKyAobWF0cml4MS5NNDMgKiBtYXRyaXgyLk0zMikpICsgKG1hdHJpeDEuTTQ0ICogbWF0cml4Mi5NNDIpO1xyXG4gICAgICAgICAgICBmbG9hdCBtNDMgPSAoKChtYXRyaXgxLk00MSAqIG1hdHJpeDIuTTEzKSArIChtYXRyaXgxLk00MiAqIG1hdHJpeDIuTTIzKSkgKyAobWF0cml4MS5NNDMgKiBtYXRyaXgyLk0zMykpICsgKG1hdHJpeDEuTTQ0ICogbWF0cml4Mi5NNDMpO1xyXG4gICAgICAgICAgICBmbG9hdCBtNDQgPSAoKChtYXRyaXgxLk00MSAqIG1hdHJpeDIuTTE0KSArIChtYXRyaXgxLk00MiAqIG1hdHJpeDIuTTI0KSkgKyAobWF0cml4MS5NNDMgKiBtYXRyaXgyLk0zNCkpICsgKG1hdHJpeDEuTTQ0ICogbWF0cml4Mi5NNDQpO1xyXG4gICAgICAgICAgICBtYXRyaXgxLk0xMSA9IG0xMTtcclxuICAgICAgICAgICAgbWF0cml4MS5NMTIgPSBtMTI7XHJcbiAgICAgICAgICAgIG1hdHJpeDEuTTEzID0gbTEzO1xyXG4gICAgICAgICAgICBtYXRyaXgxLk0xNCA9IG0xNDtcclxuICAgICAgICAgICAgbWF0cml4MS5NMjEgPSBtMjE7XHJcbiAgICAgICAgICAgIG1hdHJpeDEuTTIyID0gbTIyO1xyXG4gICAgICAgICAgICBtYXRyaXgxLk0yMyA9IG0yMztcclxuICAgICAgICAgICAgbWF0cml4MS5NMjQgPSBtMjQ7XHJcbiAgICAgICAgICAgIG1hdHJpeDEuTTMxID0gbTMxO1xyXG4gICAgICAgICAgICBtYXRyaXgxLk0zMiA9IG0zMjtcclxuICAgICAgICAgICAgbWF0cml4MS5NMzMgPSBtMzM7XHJcbiAgICAgICAgICAgIG1hdHJpeDEuTTM0ID0gbTM0O1xyXG4gICAgICAgICAgICBtYXRyaXgxLk00MSA9IG00MTtcclxuICAgICAgICAgICAgbWF0cml4MS5NNDIgPSBtNDI7XHJcbiAgICAgICAgICAgIG1hdHJpeDEuTTQzID0gbTQzO1xyXG4gICAgICAgICAgICBtYXRyaXgxLk00NCA9IG00NDtcclxuICAgICAgICAgICAgcmV0dXJuIG1hdHJpeDE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLy8gPHN1bW1hcnk+Q3JlYXRlIGEgbWF0cml4IHdoaWNoIGNvbnRhaW5zIHRoZSByb3RhdGlvbiBtb21lbnQgYXJvdW5kIGEgZ2l2ZW4gYXhpcy48L3N1bW1hcnk+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwiYXhpc1wiPlRoZSBheGlzIG9mIHJvdGF0aW9uLjwvcGFyYW0+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwiYW5nbGVcIj5UaGUgYW5nbGUgb2Ygcm90YXRpb24uPC9wYXJhbT5cclxuICAgICAgICAvLy8gPHJldHVybnM+VGhlIHJvdGFpb24gbWF0cml4LjwvcmV0dXJucz5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIE1hdHJpeDQgQ3JlYXRlRnJvbUF4aXNBbmdsZShWZWN0b3IzIGF4aXMsIGZsb2F0IGFuZ2xlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgTWF0cml4NCByZXN1bHQ7XHJcblxyXG4gICAgICAgICAgICBmbG9hdCB4ID0gYXhpcy5YO1xyXG4gICAgICAgICAgICBmbG9hdCB5ID0gYXhpcy5ZO1xyXG4gICAgICAgICAgICBmbG9hdCB6ID0gYXhpcy5aO1xyXG4gICAgICAgICAgICBmbG9hdCBudW0yID0gKGZsb2F0KU1hdGguU2luKGFuZ2xlKTtcclxuICAgICAgICAgICAgZmxvYXQgbnVtID0gKGZsb2F0KU1hdGguQ29zKGFuZ2xlKTtcclxuICAgICAgICAgICAgZmxvYXQgbnVtMTEgPSB4ICogeDtcclxuICAgICAgICAgICAgZmxvYXQgbnVtMTAgPSB5ICogeTtcclxuICAgICAgICAgICAgZmxvYXQgbnVtOSA9IHogKiB6O1xyXG4gICAgICAgICAgICBmbG9hdCBudW04ID0geCAqIHk7XHJcbiAgICAgICAgICAgIGZsb2F0IG51bTcgPSB4ICogejtcclxuICAgICAgICAgICAgZmxvYXQgbnVtNiA9IHkgKiB6O1xyXG5cclxuICAgICAgICAgICAgcmVzdWx0Lk0xMSA9IG51bTExICsgKG51bSAqICgxZiAtIG51bTExKSk7XHJcbiAgICAgICAgICAgIHJlc3VsdC5NMTIgPSAobnVtOCAtIChudW0gKiBudW04KSkgKyAobnVtMiAqIHopO1xyXG4gICAgICAgICAgICByZXN1bHQuTTEzID0gKG51bTcgLSAobnVtICogbnVtNykpIC0gKG51bTIgKiB5KTtcclxuICAgICAgICAgICAgcmVzdWx0Lk0xNCA9IDA7XHJcbiAgICAgICAgICAgIHJlc3VsdC5NMjEgPSAobnVtOCAtIChudW0gKiBudW04KSkgLSAobnVtMiAqIHopO1xyXG4gICAgICAgICAgICByZXN1bHQuTTIyID0gbnVtMTAgKyAobnVtICogKDFmIC0gbnVtMTApKTtcclxuICAgICAgICAgICAgcmVzdWx0Lk0yMyA9IChudW02IC0gKG51bSAqIG51bTYpKSArIChudW0yICogeCk7XHJcbiAgICAgICAgICAgIHJlc3VsdC5NMjQgPSAwO1xyXG4gICAgICAgICAgICByZXN1bHQuTTMxID0gKG51bTcgLSAobnVtICogbnVtNykpICsgKG51bTIgKiB5KTtcclxuICAgICAgICAgICAgcmVzdWx0Lk0zMiA9IChudW02IC0gKG51bSAqIG51bTYpKSAtIChudW0yICogeCk7XHJcbiAgICAgICAgICAgIHJlc3VsdC5NMzMgPSBudW05ICsgKG51bSAqICgxZiAtIG51bTkpKTtcclxuICAgICAgICAgICAgcmVzdWx0Lk0zNCA9IDA7XHJcbiAgICAgICAgICAgIHJlc3VsdC5NNDEgPSAwO1xyXG4gICAgICAgICAgICByZXN1bHQuTTQyID0gMDtcclxuICAgICAgICAgICAgcmVzdWx0Lk00MyA9IDA7XHJcbiAgICAgICAgICAgIHJlc3VsdC5NNDQgPSAxO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5DcmVhdGUgYSB2aWV3LW1hdHJpeC48L3N1bW1hcnk+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwiY2FtZXJhUG9zaXRpb25cIj5Qb3NpdGlvbiBvZiB0aGUgY2FtZXJhIGluIHdvcmxkIHNwYWNlLjwvcGFyYW0+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwiY2FtZXJhVGFyZ2V0XCI+TG9va3VwIHZlY3RvciBvZiB0aGUgY2FtZXJhLjwvcGFyYW0+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwiY2FtZXJhVXBWZWN0b3JcIj5EaXJlY3Rpb24gb2YgdGhlIHVwcGVyIGVkZ2Ugb2YgdGhlIGNhbWVyYS48L3BhcmFtPlxyXG4gICAgICAgIC8vLyA8cmV0dXJucz48L3JldHVybnM+XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBNYXRyaXg0IENyZWF0ZUxvb2tBdChWZWN0b3IzIGNhbWVyYVBvc2l0aW9uLCBWZWN0b3IzIGNhbWVyYVRhcmdldCwgVmVjdG9yMyBjYW1lcmFVcFZlY3RvcilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIE1hdHJpeDQgbWF0cml4ID0gbmV3IE1hdHJpeDQoKTtcclxuXHJcbiAgICAgICAgICAgIFZlY3RvcjMgdmVjdG9yID0gVmVjdG9yMy5Ob3JtYWxpemUoY2FtZXJhUG9zaXRpb24gLSBjYW1lcmFUYXJnZXQpO1xyXG4gICAgICAgICAgICBWZWN0b3IzIHZlY3RvcjIgPSBWZWN0b3IzLk5vcm1hbGl6ZShWZWN0b3IzLkNyb3NzKGNhbWVyYVVwVmVjdG9yLCB2ZWN0b3IpKTtcclxuICAgICAgICAgICAgVmVjdG9yMyB2ZWN0b3IzID0gVmVjdG9yMy5Dcm9zcyh2ZWN0b3IsIHZlY3RvcjIpO1xyXG5cclxuICAgICAgICAgICAgbWF0cml4Lk0xMSA9IHZlY3RvcjIuWDtcclxuICAgICAgICAgICAgbWF0cml4Lk0xMiA9IHZlY3RvcjMuWDtcclxuICAgICAgICAgICAgbWF0cml4Lk0xMyA9IHZlY3Rvci5YO1xyXG4gICAgICAgICAgICBtYXRyaXguTTE0ID0gMGY7XHJcbiAgICAgICAgICAgIG1hdHJpeC5NMjEgPSB2ZWN0b3IyLlk7XHJcbiAgICAgICAgICAgIG1hdHJpeC5NMjIgPSB2ZWN0b3IzLlk7XHJcbiAgICAgICAgICAgIG1hdHJpeC5NMjMgPSB2ZWN0b3IuWTtcclxuICAgICAgICAgICAgbWF0cml4Lk0yNCA9IDBmO1xyXG4gICAgICAgICAgICBtYXRyaXguTTMxID0gdmVjdG9yMi5aO1xyXG4gICAgICAgICAgICBtYXRyaXguTTMyID0gdmVjdG9yMy5aO1xyXG4gICAgICAgICAgICBtYXRyaXguTTMzID0gdmVjdG9yLlo7XHJcbiAgICAgICAgICAgIG1hdHJpeC5NMzQgPSAwZjtcclxuICAgICAgICAgICAgbWF0cml4Lk00MSA9IC1WZWN0b3IzLkRvdCh2ZWN0b3IyLCBjYW1lcmFQb3NpdGlvbik7XHJcbiAgICAgICAgICAgIG1hdHJpeC5NNDIgPSAtVmVjdG9yMy5Eb3QodmVjdG9yMywgY2FtZXJhUG9zaXRpb24pO1xyXG4gICAgICAgICAgICBtYXRyaXguTTQzID0gLVZlY3RvcjMuRG90KHZlY3RvciwgY2FtZXJhUG9zaXRpb24pO1xyXG4gICAgICAgICAgICBtYXRyaXguTTQ0ID0gMWY7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gbWF0cml4O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgICAgIC8vLyBDcmVhdGUgYW4gb3J0aG9ncmFwaGljIHByb2plY3Rpb24gbWF0cml4LlxyXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwid2lkdGhcIj5XaWR0aCBvZiB2aWV3aW5nIHZvbHVtZS48L3BhcmFtPlxyXG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cImhlaWdodFwiPkhlaWdodCBvZiB2aWV3aW5nIHZvbHVtZS48L3BhcmFtPlxyXG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cInpOZWFyUGxhbmVcIj5OZWFyIGNsaXBwaW5nIHBsYW5lLjwvcGFyYW0+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwiekZhclBsYW5lXCI+RmFyIGNsaXBwaW5nIHBsYW5lLjwvcGFyYW0+XHJcbiAgICAgICAgLy8vIDxyZXR1cm5zPkFuIG9ydGhvZ3JhcGhpYyBwcm9qZWN0aW9uIG1hdHJpeC48L3JldHVybnM+XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBNYXRyaXg0IENyZWF0ZU9ydGhvZ3JhcGhpYyhmbG9hdCB3aWR0aCwgZmxvYXQgaGVpZ2h0LCBmbG9hdCB6TmVhclBsYW5lLCBmbG9hdCB6RmFyUGxhbmUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBNYXRyaXg0IG1hdHJpeCA9IG5ldyBNYXRyaXg0KCk7XHJcblxyXG4gICAgICAgICAgICBtYXRyaXguTTExID0gMmYgLyB3aWR0aDtcclxuICAgICAgICAgICAgbWF0cml4Lk0xMiA9IG1hdHJpeC5NMTMgPSBtYXRyaXguTTE0ID0gMGY7XHJcbiAgICAgICAgICAgIG1hdHJpeC5NMjIgPSAyZiAvIGhlaWdodDtcclxuICAgICAgICAgICAgbWF0cml4Lk0yMSA9IG1hdHJpeC5NMjMgPSBtYXRyaXguTTI0ID0gMGY7XHJcbiAgICAgICAgICAgIG1hdHJpeC5NMzMgPSAxZiAvICh6TmVhclBsYW5lIC0gekZhclBsYW5lKTtcclxuICAgICAgICAgICAgbWF0cml4Lk0zMSA9IG1hdHJpeC5NMzIgPSBtYXRyaXguTTM0ID0gMGY7XHJcbiAgICAgICAgICAgIG1hdHJpeC5NNDEgPSBtYXRyaXguTTQyID0gMGY7XHJcbiAgICAgICAgICAgIG1hdHJpeC5NNDMgPSB6TmVhclBsYW5lIC8gKHpOZWFyUGxhbmUgLSB6RmFyUGxhbmUpO1xyXG4gICAgICAgICAgICBtYXRyaXguTTQ0ID0gMWY7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gbWF0cml4O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PkNyZWF0ZSBhIHBlcnNwZWN0aXZlIHByb2plY3Rpb24gbWF0cml4Ljwvc3VtbWFyeT5cclxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJmaWVsZE9mVmlld1wiPlRoZSBmaWVsZCBvZiB2aWV3IG9mIHRoZSBwZXJzcGVjdGl2ZSBwcm9qZWN0aW9uIG1hdHJpeCAoaW4gcmFkaWFucykuPC9wYXJhbT5cclxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJhc3BlY3RSYXRpb1wiPlRoZSBhc3BlY3QgcmF0aW8uPC9wYXJhbT5cclxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJuZWFyUGxhbmVEaXN0YW5jZVwiPlRoZSBuZWFyIGNsaXBwaW5nIHBsYW5lLjwvcGFyYW0+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwiZmFyUGxhbmVEaXN0YW5jZVwiPlRoZSBmYXIgY2xpcHBpbmcgcGxhbmUuPC9wYXJhbT5cclxuICAgICAgICAvLy8gPHJldHVybnM+QSBwZXJzcGVjdGl2ZSBwcm9qZWN0aW9uIG1hdHJpeC48L3JldHVybnM+XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBNYXRyaXg0IENyZWF0ZVBlcnNwZWN0aXZlRmllbGRPZlZpZXcoZmxvYXQgZmllbGRPZlZpZXcsIGZsb2F0IGFzcGVjdFJhdGlvLCBmbG9hdCBuZWFyUGxhbmVEaXN0YW5jZSwgZmxvYXQgZmFyUGxhbmVEaXN0YW5jZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIE1hdHJpeDQgbWF0cml4ID0gbmV3IE1hdHJpeDQoKTtcclxuXHJcbiAgICAgICAgICAgIGZsb2F0IG51bSA9IDFmIC8gKE1hdGguVGFuKChmaWVsZE9mVmlldyAqIDAuNWYpKSk7XHJcbiAgICAgICAgICAgIGZsb2F0IG51bTkgPSBudW0gLyBhc3BlY3RSYXRpbztcclxuXHJcbiAgICAgICAgICAgIG1hdHJpeC5NMTEgPSBudW05O1xyXG4gICAgICAgICAgICBtYXRyaXguTTEyID0gbWF0cml4Lk0xMyA9IG1hdHJpeC5NMTQgPSAwO1xyXG4gICAgICAgICAgICBtYXRyaXguTTIyID0gbnVtO1xyXG4gICAgICAgICAgICBtYXRyaXguTTIxID0gbWF0cml4Lk0yMyA9IG1hdHJpeC5NMjQgPSAwO1xyXG4gICAgICAgICAgICBtYXRyaXguTTMxID0gbWF0cml4Lk0zMiA9IDBmO1xyXG4gICAgICAgICAgICBtYXRyaXguTTMzID0gZmFyUGxhbmVEaXN0YW5jZSAvIChuZWFyUGxhbmVEaXN0YW5jZSAtIGZhclBsYW5lRGlzdGFuY2UpO1xyXG4gICAgICAgICAgICBtYXRyaXguTTM0ID0gLTE7XHJcbiAgICAgICAgICAgIG1hdHJpeC5NNDEgPSBtYXRyaXguTTQyID0gbWF0cml4Lk00NCA9IDA7XHJcbiAgICAgICAgICAgIG1hdHJpeC5NNDMgPSAobmVhclBsYW5lRGlzdGFuY2UgKiBmYXJQbGFuZURpc3RhbmNlKSAvIChuZWFyUGxhbmVEaXN0YW5jZSAtIGZhclBsYW5lRGlzdGFuY2UpO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIG1hdHJpeDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5DcmVhdGUgcm90YXRpb24gb24gdGhlIFgtQXhpcy48L3N1bW1hcnk+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwicmFkaWFuc1wiPkFuZ2xlIGluIHJhZGlhbnMuPC9wYXJhbT5cclxuICAgICAgICAvLy8gPHJldHVybnM+VGhlIHJvdGF0aW9uIG1hdHJpeC48L3JldHVybnM+XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBNYXRyaXg0IENyZWF0ZVJvdGF0aW9uWChmbG9hdCByYWRpYW5zKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgTWF0cml4NCByZXN1bHQgPSBuZXcgTWF0cml4NCgxLjBmKTtcclxuXHJcbiAgICAgICAgICAgIGZsb2F0IHZhbDEgPSAoZmxvYXQpTWF0aC5Db3MocmFkaWFucyk7XHJcbiAgICAgICAgICAgIGZsb2F0IHZhbDIgPSAoZmxvYXQpTWF0aC5TaW4ocmFkaWFucyk7XHJcblxyXG4gICAgICAgICAgICByZXN1bHQuTTIyID0gdmFsMTtcclxuICAgICAgICAgICAgcmVzdWx0Lk0yMyA9IHZhbDI7XHJcbiAgICAgICAgICAgIHJlc3VsdC5NMzIgPSAtdmFsMjtcclxuICAgICAgICAgICAgcmVzdWx0Lk0zMyA9IHZhbDE7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PkNyZWF0ZSByb3RhdGlvbiBvbiB0aGUgWS1BeGlzLjwvc3VtbWFyeT5cclxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJyYWRpYW5zXCI+QW5nbGUgaW4gcmFkaWFucy48L3BhcmFtPlxyXG4gICAgICAgIC8vLyA8cmV0dXJucz5UaGUgcm90YXRpb24gbWF0cml4LjwvcmV0dXJucz5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIE1hdHJpeDQgQ3JlYXRlUm90YXRpb25ZKGZsb2F0IHJhZGlhbnMpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBNYXRyaXg0IHJlc3VsdCA9IG5ldyBNYXRyaXg0KDEuMGYpO1xyXG5cclxuICAgICAgICAgICAgZmxvYXQgdmFsMSA9IChmbG9hdClNYXRoLkNvcyhyYWRpYW5zKTtcclxuICAgICAgICAgICAgZmxvYXQgdmFsMiA9IChmbG9hdClNYXRoLlNpbihyYWRpYW5zKTtcclxuXHJcbiAgICAgICAgICAgIHJlc3VsdC5NMTEgPSB2YWwxO1xyXG4gICAgICAgICAgICByZXN1bHQuTTEzID0gLXZhbDI7XHJcbiAgICAgICAgICAgIHJlc3VsdC5NMzEgPSB2YWwyO1xyXG4gICAgICAgICAgICByZXN1bHQuTTMzID0gdmFsMTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLy8gPHN1bW1hcnk+Q3JlYXRlIHJvdGF0aW9uIG9uIHRoZSBaLUF4aXMuPC9zdW1tYXJ5PlxyXG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cInJhZGlhbnNcIj5BbmdsZSBpbiByYWRpYW5zLjwvcGFyYW0+XHJcbiAgICAgICAgLy8vIDxyZXR1cm5zPlRoZSByb3RhdGlvbiBtYXRyaXguPC9yZXR1cm5zPlxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgTWF0cml4NCBDcmVhdGVSb3RhdGlvblooZmxvYXQgcmFkaWFucylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIE1hdHJpeDQgcmVzdWx0ID0gbmV3IE1hdHJpeDQoMS4wZik7XHJcblxyXG4gICAgICAgICAgICBmbG9hdCB2YWwxID0gKGZsb2F0KU1hdGguQ29zKHJhZGlhbnMpO1xyXG4gICAgICAgICAgICBmbG9hdCB2YWwyID0gKGZsb2F0KU1hdGguU2luKHJhZGlhbnMpO1xyXG5cclxuICAgICAgICAgICAgcmVzdWx0Lk0xMSA9IHZhbDE7XHJcbiAgICAgICAgICAgIHJlc3VsdC5NMTIgPSB2YWwyO1xyXG4gICAgICAgICAgICByZXN1bHQuTTIxID0gLXZhbDI7XHJcbiAgICAgICAgICAgIHJlc3VsdC5NMjIgPSB2YWwxO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5DcmVhdGUgYSBzY2FsaW5nIG1hdHJpeC48L3N1bW1hcnk+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwic2NhbGVcIj5UaGUgc2NhbGUgb24gdGhlIHgsIHkgYW5kIHogYXhpcy48L3BhcmFtPlxyXG4gICAgICAgIC8vLyA8cmV0dXJucz5BIHNjYWxpbmcgbWF0cml4LjwvcmV0dXJucz5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIE1hdHJpeDQgQ3JlYXRlU2NhbGUoVmVjdG9yMyBzY2FsZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIE1hdHJpeDQgcmVzdWx0ID0gbmV3IE1hdHJpeDQoKTtcclxuICAgICAgICAgICAgcmVzdWx0Lk0xMSA9IHNjYWxlLlg7XHJcbiAgICAgICAgICAgIHJlc3VsdC5NMTIgPSAwO1xyXG4gICAgICAgICAgICByZXN1bHQuTTEzID0gMDtcclxuICAgICAgICAgICAgcmVzdWx0Lk0xNCA9IDA7XHJcbiAgICAgICAgICAgIHJlc3VsdC5NMjEgPSAwO1xyXG4gICAgICAgICAgICByZXN1bHQuTTIyID0gc2NhbGUuWTtcclxuICAgICAgICAgICAgcmVzdWx0Lk0yMyA9IDA7XHJcbiAgICAgICAgICAgIHJlc3VsdC5NMjQgPSAwO1xyXG4gICAgICAgICAgICByZXN1bHQuTTMxID0gMDtcclxuICAgICAgICAgICAgcmVzdWx0Lk0zMiA9IDA7XHJcbiAgICAgICAgICAgIHJlc3VsdC5NMzMgPSBzY2FsZS5aO1xyXG4gICAgICAgICAgICByZXN1bHQuTTM0ID0gMDtcclxuICAgICAgICAgICAgcmVzdWx0Lk00MSA9IDA7XHJcbiAgICAgICAgICAgIHJlc3VsdC5NNDIgPSAwO1xyXG4gICAgICAgICAgICByZXN1bHQuTTQzID0gMDtcclxuICAgICAgICAgICAgcmVzdWx0Lk00NCA9IDE7XHJcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLy8gPHN1bW1hcnk+Q3JlYXRlIGEgdHJhbnNsYXRpb24gbWF0cml4Ljwvc3VtbWFyeT5cclxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJ0cmFuc2xhdGlvblwiPlRyYW5zbGF0aW9uLjwvcGFyYW0+XHJcbiAgICAgICAgLy8vIDxyZXR1cm5zPjwvcmV0dXJucz5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIE1hdHJpeDQgQ3JlYXRlVHJhbnNsYXRpb24oVmVjdG9yMyB0cmFuc2xhdGlvbilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIE1hdHJpeDQgcmVzdWx0ID0gbmV3IE1hdHJpeDQoMS4wZik7XHJcbiAgICAgICAgICAgIHJlc3VsdC5NNDEgPSB0cmFuc2xhdGlvbi5YO1xyXG4gICAgICAgICAgICByZXN1bHQuTTQyID0gdHJhbnNsYXRpb24uWTtcclxuICAgICAgICAgICAgcmVzdWx0Lk00MyA9IHRyYW5zbGF0aW9uLlo7XHJcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLy8gPHN1bW1hcnk+UmVhZCBhbmQgd3JpdGUgdGhlIGRhdGEgaW5zaWRlIHRoZSBtYXRyaXguIFN0b3JlZCByb3ctbWFqb3IuPC9zdW1tYXJ5PlxyXG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cImluZGV4XCI+QSB2YWx1ZSByYW5naW5nIFswLCAxNV0gKGluY2x1c2l2ZSkuPC9wYXJhbT5cclxuICAgICAgICAvLy8gPHJldHVybnM+VGhlIHZhbHVlIHN0b3JlZCBpbiB0aGUgbWF0cml4LjwvcmV0dXJucz5cclxuICAgICAgICBwdWJsaWMgZmxvYXQgdGhpc1tpbnQgaW5kZXhdXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBnZXRcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgc3dpdGNoIChpbmRleClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDA6IHJldHVybiBNMTE7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxOiByZXR1cm4gTTEyO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMjogcmV0dXJuIE0xMztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDM6IHJldHVybiBNMTQ7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA0OiByZXR1cm4gTTIxO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgNTogcmV0dXJuIE0yMjtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDY6IHJldHVybiBNMjM7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA3OiByZXR1cm4gTTI0O1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgODogcmV0dXJuIE0zMTtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDk6IHJldHVybiBNMzI7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxMDogcmV0dXJuIE0zMztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDExOiByZXR1cm4gTTM0O1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTI6IHJldHVybiBNNDE7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxMzogcmV0dXJuIE00MjtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDE0OiByZXR1cm4gTTQzO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTU6IHJldHVybiBNNDQ7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgQXJndW1lbnRPdXRPZlJhbmdlRXhjZXB0aW9uKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc2V0XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHN3aXRjaCAoaW5kZXgpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAwOiBNMTEgPSB2YWx1ZTsgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxOiBNMTIgPSB2YWx1ZTsgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAyOiBNMTMgPSB2YWx1ZTsgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAzOiBNMTQgPSB2YWx1ZTsgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA0OiBNMjEgPSB2YWx1ZTsgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA1OiBNMjIgPSB2YWx1ZTsgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA2OiBNMjMgPSB2YWx1ZTsgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA3OiBNMjQgPSB2YWx1ZTsgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA4OiBNMzEgPSB2YWx1ZTsgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA5OiBNMzIgPSB2YWx1ZTsgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxMDogTTMzID0gdmFsdWU7IGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTE6IE0zNCA9IHZhbHVlOyBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDEyOiBNNDEgPSB2YWx1ZTsgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxMzogTTQyID0gdmFsdWU7IGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTQ6IE00MyA9IHZhbHVlOyBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDE1OiBNNDQgPSB2YWx1ZTsgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDogdGhyb3cgbmV3IEFyZ3VtZW50T3V0T2ZSYW5nZUV4Y2VwdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLy8gPHN1bW1hcnk+UmVhZCBhbmQgd3JpdGUgdGhlIGRhdGEgaW5zaWRlIHRoZSBtYXRyaXguIFN0b3JlZCByb3ctbWFqb3IuPC9zdW1tYXJ5PlxyXG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cInJvd1wiPlRoZSByb3cgdG8gZ2V0IHJhbmdpbmcgWzAsIDRdIChpbmNsdXNpdmUpPC9wYXJhbT5cclxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJjb2x1bW5cIj5UaGUgY29sdW1uIHRvIGdldCByYW5naW5nIFswLCA0XSAoaW5jbHVzaXZlKTwvcGFyYW0+XHJcbiAgICAgICAgLy8vIDxyZXR1cm5zPjwvcmV0dXJucz5cclxuICAgICAgICBwdWJsaWMgZmxvYXQgdGhpc1tpbnQgcm93LCBpbnQgY29sdW1uXVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZ2V0XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzWyhyb3cgKiA0KSArIGNvbHVtbl07XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHNldFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzWyhyb3cgKiA0KSArIGNvbHVtbl0gPSB2YWx1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PkNyZWF0ZXMgYSBzdHJpbmcgcmVwcmVzZW50aW5nIHRoZSBtYXRyaXguPC9zdW1tYXJ5PlxyXG4gICAgICAgIC8vLyA8cmV0dXJucz5BIHN0cmluZyByZXByZXNlbnRpbmcgdGhlIG1hdHJpeC48L3JldHVybnM+XHJcbiAgICAgICAgcHVibGljIG92ZXJyaWRlIHN0cmluZyBUb1N0cmluZygpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBTdHJpbmdCdWlsZGVyIHJldHZhbCA9IG5ldyBTdHJpbmdCdWlsZGVyKCk7XHJcbiAgICAgICAgICAgIHJldHZhbC5BcHBlbmQoXCJ7IFwiKTtcclxuICAgICAgICAgICAgZm9yIChpbnQgaSA9IDA7IGkgPCAxNTsgKytpKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR2YWwuQXBwZW5kKHRoaXNbaV0uVG9TdHJpbmcoKSArIFwiLCBcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dmFsLkFwcGVuZCh0aGlzWzE1XSArIFwiIH1cIik7XHJcbiAgICAgICAgICAgIHJldHVybiByZXR2YWwuVG9TdHJpbmcoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwidXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLkxpbnE7XHJcbnVzaW5nIFN5c3RlbS5UZXh0O1xyXG51c2luZyBTeXN0ZW0uVGhyZWFkaW5nLlRhc2tzO1xyXG5cclxubmFtZXNwYWNlIEp1aWNlQm94RW5naW5lLk1hdGhcclxue1xyXG4gICAgcHVibGljIHN0cnVjdCBSZWN0YW5nbGVcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgaW50IFg7XHJcbiAgICAgICAgcHVibGljIGludCBZO1xyXG4gICAgICAgIHB1YmxpYyBpbnQgV2lkdGg7XHJcbiAgICAgICAgcHVibGljIGludCBIZWlnaHQ7XHJcblxyXG4gICAgICAgIHB1YmxpYyBSZWN0YW5nbGUoaW50IHgsIGludCB5LCBpbnQgd2lkdGgsIGludCBoZWlnaHQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBYID0geDtcclxuICAgICAgICAgICAgWSA9IHk7XHJcbiAgICAgICAgICAgIFdpZHRoID0gd2lkdGg7XHJcbiAgICAgICAgICAgIEhlaWdodCA9IGhlaWdodDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwidXNpbmcgU3lzdGVtO1xyXG5cclxubmFtZXNwYWNlIEp1aWNlQm94RW5naW5lLk1hdGhcclxue1xyXG4gICAgcHVibGljIHN0cnVjdCBWZWN0b3IyIDogSUVxdWF0YWJsZTxWZWN0b3IyPlxyXG4gICAge1xyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5UaGUgWC1Db29yZGluYXRlLjwvc3VtbWFyeT5cclxuICAgICAgICBwdWJsaWMgZmxvYXQgWDtcclxuICAgICAgICAvLy8gPHN1bW1hcnk+VGhlIFktQ29vcmRpbmF0ZS48L3N1bW1hcnk+XHJcbiAgICAgICAgcHVibGljIGZsb2F0IFk7XHJcblxyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5Db25zdHJ1Y3RvcnMgMkQgdmVjdG9yLjwvc3VtbWFyeT5cclxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJ4XCI+VGhlIFggY29vcmRpbmF0ZS48L3BhcmFtPlxyXG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cInlcIj5UaGUgWSBjb29yZGluYXRlLjwvcGFyYW0+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwielwiPlRoZSBaIGNvb3JkaW5hdGUuPC9wYXJhbT5cclxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJ3XCI+VGhlIFcgY29vcmRpbmF0ZS48L3BhcmFtPlxyXG4gICAgICAgIHB1YmxpYyBWZWN0b3IyKGZsb2F0IHgsIGZsb2F0IHkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBYID0geDtcclxuICAgICAgICAgICAgWSA9IHk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLy8gPHN1bW1hcnk+Q29uc3RydWN0cyBhIDREIHZlY3RvciwgYWxsIHZhbHVlcyBlcXVhbCB0byB0aGUgZ2l2ZW4gdmFsdWUuPC9zdW1tYXJ5PlxyXG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cInZhbHVlXCI+VGhlIHZhbHVlIGZvciBhbGwgYXhpcy48L3BhcmFtPlxyXG4gICAgICAgIHB1YmxpYyBWZWN0b3IyKGZsb2F0IHZhbHVlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgWCA9IHZhbHVlO1xyXG4gICAgICAgICAgICBZID0gdmFsdWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLy8gPHN1bW1hcnk+UmV0dXJucyB0aGUgZGlzdGFuY2UgYmV0d2VlbiB0d28gdmVjdG9ycy48L3N1bW1hcnk+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwidmFsdWUxXCI+VGhlIGZpcnN0IHZlY3Rvci48L3BhcmFtPlxyXG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cInZhbHVlMlwiPlRoZSBzZWNvbmQgdmVjdG9yLjwvcGFyYW0+XHJcbiAgICAgICAgLy8vIDxyZXR1cm5zPlRoZSBkaXN0YW5jZSBiZXR3ZWVuIHR3byB2ZWN0b3JzLjwvcmV0dXJucz5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIGZsb2F0IERpc3RhbmNlKFZlY3RvcjIgdmFsdWUxLCBWZWN0b3IyIHZhbHVlMilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBNYXRoLlNxcnQoRGlzdGFuY2VTcXVhcmVkKHZhbHVlMSwgdmFsdWUyKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLy8gPHN1bW1hcnk+UmV0dXJucyB0aGUgc3F1YXJlZCBkaXN0YW5jZSBiZXR3ZWVuIHR3byB2ZWN0b3JzLjwvc3VtbWFyeT5cclxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJ2YWx1ZTFcIj5UaGUgZmlyc3QgdmVjdG9yLjwvcGFyYW0+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwidmFsdWUyXCI+VGhlIHNlY29uZCB2ZWN0b3IuPC9wYXJhbT5cclxuICAgICAgICAvLy8gPHJldHVybnM+VGhlIHNxdWFyZWQgZGlzdGFuY2UgYmV0d2VlbiB0d28gdmVjdG9ycy48L3JldHVybnM+XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBmbG9hdCBEaXN0YW5jZVNxdWFyZWQoVmVjdG9yMiB2YWx1ZTEsIFZlY3RvcjIgdmFsdWUyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuICAodmFsdWUxLlggLSB2YWx1ZTIuWCkgKiAodmFsdWUxLlggLSB2YWx1ZTIuWCkgK1xyXG4gICAgICAgICAgICAgICAgICAgICh2YWx1ZTEuWSAtIHZhbHVlMi5ZKSAqICh2YWx1ZTEuWSAtIHZhbHVlMi5ZKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5SZXR1cm5zIHRoZSBsZW5ndGggb2YgdGhpcyB2ZWN0b3IuPC9zdW1tYXJ5PlxyXG4gICAgICAgIC8vLyA8cmV0dXJucz5UaGUgbGVuZ3RoLjwvcmV0dXJucz5cclxuICAgICAgICBwdWJsaWMgZmxvYXQgTGVuZ3RoKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBNYXRoLlNxcnQoKFggKiBYKSArIChZICogWSkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlJldHVybnMgdGhlIHNxdWFyZWQgbGVuZ3RoIG9mIHRoaXMgdmVjdG9yLjwvc3VtbWFyeT5cclxuICAgICAgICAvLy8gPHJldHVybnM+VGhlIHNxdWFyZWQgbGVuZ3RoLjwvcmV0dXJucz5cclxuICAgICAgICBwdWJsaWMgZmxvYXQgTGVuZ3RoU3F1YXJlZCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gKFggKiBYKSArIChZICogWSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLy8gPHN1bW1hcnk+TWFrZXMgdGhpcyB2ZWN0b3IgYSBub3JtYWxpemVkIG9uZS48L3N1bW1hcnk+XHJcbiAgICAgICAgcHVibGljIHZvaWQgTm9ybWFsaXplKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZsb2F0IGZhY3RvciA9IE1hdGguU3FydCgoWCAqIFgpICsgKFkgKiBZKSk7XHJcbiAgICAgICAgICAgIGZhY3RvciA9IDEuMGYgLyBmYWN0b3I7XHJcbiAgICAgICAgICAgIFggKj0gZmFjdG9yO1xyXG4gICAgICAgICAgICBZICo9IGZhY3RvcjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5Ob3JtYWxpemVzIHRoZSBnaXZlbiB2ZWN0b3IuPC9zdW1tYXJ5PlxyXG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cInZlY3RvclwiPlRoZSB2ZWN0b3IgdG8gbm9ybWFsaXplLjwvcGFyYW0+XHJcbiAgICAgICAgLy8vIDxyZXR1cm5zPkEgbm9ybWFsaXplZCB2ZWN0b3IuPC9yZXR1cm5zPlxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgVmVjdG9yMiBOb3JtYWxpemUoVmVjdG9yMiB2ZWN0b3IpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2ZWN0b3IuTm9ybWFsaXplKCk7XHJcbiAgICAgICAgICAgIHJldHVybiB2ZWN0b3I7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLy8gPHN1bW1hcnk+Q2FsY3VsYXRlcyB0aGUgZG90IHByb2R1Y3QuPC9zdW1tYXJ5PlxyXG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cInZlY3RvcjFcIj5UaGUgZmlyc3QgdmVjdG9yLjwvcGFyYW0+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwidmVjdG9yMlwiPlRoZSBzZWNvbmQgdmVjdG9yLjwvcGFyYW0+XHJcbiAgICAgICAgLy8vIDxyZXR1cm5zPlRoZSBkb3QgcHJvZHVjdCBvZiB0d28gdmVjdG9ycy48L3JldHVybnM+XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBmbG9hdCBEb3QoVmVjdG9yMiB2ZWN0b3IxLCBWZWN0b3IyIHZlY3RvcjIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gdmVjdG9yMS5YICogdmVjdG9yMi5YICsgdmVjdG9yMS5ZICogdmVjdG9yMi5ZO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PkdpdmVzIGEgc3RyaW5nIHJlcHJlc2VudGluZyB0aGUgdmVjdG9yLjwvc3VtbWFyeT5cclxuICAgICAgICAvLy8gPHJldHVybnM+U3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIHRoaXMgdmVjdG9yLjwvcmV0dXJucz5cclxuICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgc3RyaW5nIFRvU3RyaW5nKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBcIihcIiArIFggKyBcIiwgXCIgKyBZICsgXCIpXCI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLy8gPHN1bW1hcnk+Q2hlY2sgaWYgdGhlIHZlY3RvciBpcyBlcXVhbCB0byBhbiBvdGhlciB2ZWN0b3IuPC9zdW1tYXJ5PlxyXG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cIm90aGVyXCI+VGhlIHZlY3RvciB0byBjaGVjayBhZ2FpbnN0LjwvcGFyYW0+XHJcbiAgICAgICAgLy8vIDxyZXR1cm5zPkZhbHNlIGlmIG5vdCBlcXVhbCwgdHJ1ZSBpZiB0aGUgdmVjdG9ycyBhcmUgZXF1YWwuPC9yZXR1cm5zPlxyXG4gICAgICAgIHB1YmxpYyBib29sIEVxdWFscyhWZWN0b3IyIG90aGVyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIFggPT0gb3RoZXIuWFxyXG4gICAgICAgICAgICAgICAgJiYgWSA9PSBvdGhlci5ZO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PkNoZWNrIGlmIHRoZSB2ZWN0b3IgaXMgZXF1YWwgdG8gdGhlIG90aGVyIG9iamVjdC48L3N1bW1hcnk+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwib1wiPlRoZSBvYmplY3QgdG8gY2hlY2sgYWdhaW5zdC48L3BhcmFtPlxyXG4gICAgICAgIC8vLyA8cmV0dXJucz5GYWxzZSBpZiBub3QgZXF1YWwsIHRydWUgaWYgdGhlIHZlY3RvcnMgYXJlIGVxdWFsLjwvcmV0dXJucz5cclxuICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgYm9vbCBFcXVhbHMob2JqZWN0IG8pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAobyBpcyBWZWN0b3IyKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIEVxdWFscygoVmVjdG9yMilvKTtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PkdldHMgdGhlIGhhc2ggY29kZSBvZiB0aGlzIHZlY3Rvci48L3N1bW1hcnk+XHJcbiAgICAgICAgLy8vIDxyZXR1cm5zPkhhc2ggY29kZSBvZiB0aGlzIHZlY3Rvci48L3JldHVybnM+XHJcbiAgICAgICAgcHVibGljIG92ZXJyaWRlIGludCBHZXRIYXNoQ29kZSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB1bmNoZWNrZWRcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaW50IGhhc2hDb2RlID0gWC5HZXRIYXNoQ29kZSgpO1xyXG4gICAgICAgICAgICAgICAgaGFzaENvZGUgPSAoaGFzaENvZGUgKiAzOTcpIF4gWS5HZXRIYXNoQ29kZSgpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGhhc2hDb2RlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLy8gPHN1bW1hcnk+SW52ZXJ0cyB0aGUgdmVjdG9yIHZhbHVlcy48L3N1bW1hcnk+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwidmFsdWVcIj5UaGUgdmVjdG9yIHRvIGludmVydC48L3BhcmFtPlxyXG4gICAgICAgIC8vLyA8cmV0dXJucz5JbnZlcnRlZCB2ZWN0b3IuPC9yZXR1cm5zPlxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgVmVjdG9yMiBvcGVyYXRvciAtKFZlY3RvcjIgdmFsdWUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IFZlY3RvcjIoLXZhbHVlLlgsIC12YWx1ZS5ZKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5DaGVja3MgaWYgdHdvIHZlY3RvcnMgYXJlIGVxdWFsLjwvc3VtbWFyeT5cclxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJ2YWx1ZTFcIj5UaGUgZmlyc3QgdmVjdG9yLjwvcGFyYW0+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwidmFsdWUyXCI+VGhlIHNlY29uZCB2ZWN0b3IuPC9wYXJhbT5cclxuICAgICAgICAvLy8gPHJldHVybnM+SWYgdGhlIHR3byB2ZWN0b3JzIGFyZSBlcXVhbCB0cnVlLCBvdGhlcndpc2UgZmFsc2UuPC9yZXR1cm5zPlxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgYm9vbCBvcGVyYXRvciA9PShWZWN0b3IyIHZhbHVlMSwgVmVjdG9yMiB2YWx1ZTIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gdmFsdWUxLlggPT0gdmFsdWUyLlhcclxuICAgICAgICAgICAgICAgICYmIHZhbHVlMS5ZID09IHZhbHVlMi5ZO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PkNoZWNrcyBpZiB0aGUgdHdvIHZlY3RvcnMgYXJlIG5vdCBlcXVhbDwvc3VtbWFyeT5cclxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJ2YWx1ZTFcIj5UaGUgZmlyc3QgdmVjdG9yLjwvcGFyYW0+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwidmFsdWUyXCI+VGhlIHNlY29uZCB2ZWN0b3IuPC9wYXJhbT5cclxuICAgICAgICAvLy8gPHJldHVybnM+SWYgdGhlIHR3byB2ZWN0b3JzIGFyZSBub3QgZXF1YWwgdHJ1ZSwgb3RoZXJ3aXNlIGZhbHNlLjwvcmV0dXJucz5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIGJvb2wgb3BlcmF0b3IgIT0oVmVjdG9yMiB2YWx1ZTEsIFZlY3RvcjIgdmFsdWUyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlMS5YICE9IHZhbHVlMi5YXHJcbiAgICAgICAgICAgICAgICAmJiB2YWx1ZTEuWSAhPSB2YWx1ZTIuWTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5BZGRzIHR3byB2ZWN0b3JzLjwvc3VtbWFyeT5cclxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJ2YWx1ZTFcIj5UaGUgZmlyc3QgdmVjdG9yLjwvcGFyYW0+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwidmFsdWUyXCI+VGhlIHNlY29uZCB2ZWN0b3IuPC9wYXJhbT5cclxuICAgICAgICAvLy8gPHJldHVybnM+VGhlIHN1bSBvZiB0aGUgdHdvIHZlY3RvcnMuPC9yZXR1cm5zPlxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgVmVjdG9yMiBvcGVyYXRvciArKFZlY3RvcjIgdmFsdWUxLCBWZWN0b3IyIHZhbHVlMilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhbHVlMS5YICs9IHZhbHVlMi5YO1xyXG4gICAgICAgICAgICB2YWx1ZTEuWSArPSB2YWx1ZTIuWTtcclxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlMTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5TdWJ0cmFjdHMgdHdvIHZlY3RvcnMuPC9zdW1tYXJ5PlxyXG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cInZhbHVlMVwiPlRoZSBmaXJzdCB2ZWN0b3IsIG9uIHRoZSBsZWZ0IHNpZGUuPC9wYXJhbT5cclxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJ2YWx1ZTJcIj5UaGUgc2Vjb25kIHZlY3Rvciwgb24gdGhlIHJpZ2h0IHNpZGUuPC9wYXJhbT5cclxuICAgICAgICAvLy8gPHJldHVybnM+VGhlIHJlc3VsdCBvZiB0aGUgc3Vic3RyYWN0aW9uIGJldHdlZW4gdGhlIHR3byB2ZWN0b3JzLjwvcmV0dXJucz5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFZlY3RvcjIgb3BlcmF0b3IgLShWZWN0b3IyIHZhbHVlMSwgVmVjdG9yMiB2YWx1ZTIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YWx1ZTEuWCAtPSB2YWx1ZTIuWDtcclxuICAgICAgICAgICAgdmFsdWUxLlkgLT0gdmFsdWUyLlk7XHJcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLy8gPHN1bW1hcnk+TXVsdGlwbGllcyB0d28gdmVjdG9ycy48L3N1bW1hcnk+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwidmFsdWUxXCI+VGhlIGZpcnN0IHZlY3Rvci48L3BhcmFtPlxyXG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cInZhbHVlMlwiPlRoZSBzZWNvbmQgdmVjdG9yLjwvcGFyYW0+XHJcbiAgICAgICAgLy8vIDxyZXR1cm5zPlRoZSBtdWx0aXBsaWNhdGlvbiBiZXR3ZWVuIHRoZSBnaXZlbiB2ZWN0b3JzLjwvcmV0dXJucz5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFZlY3RvcjIgb3BlcmF0b3IgKihWZWN0b3IyIHZhbHVlMSwgVmVjdG9yMiB2YWx1ZTIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YWx1ZTEuWCAqPSB2YWx1ZTIuWDtcclxuICAgICAgICAgICAgdmFsdWUxLlkgKj0gdmFsdWUyLlk7XHJcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLy8gPHN1bW1hcnk+TXVsdGlwbGllcyBhIHZlY3RvciBieSBhIHNjYWxhci48L3N1bW1hcnk+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwidmFsdWUxXCI+VGhlIHZlY3Rvci48L3BhcmFtPlxyXG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cInNjYWxhclwiPlRoZSBzY2FsZXIgdmFsdWUuPC9wYXJhbT5cclxuICAgICAgICAvLy8gPHJldHVybnM+VGhlIG11bHRpcGxpY2F0aW9uIGJldHdlZW4gdGhlIHZlY3RvciBhbmQgc2NhbGFyLjwvcmV0dXJucz5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFZlY3RvcjIgb3BlcmF0b3IgKihWZWN0b3IyIHZhbHVlMSwgZmxvYXQgc2NhbGFyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFsdWUxLlggKj0gc2NhbGFyO1xyXG4gICAgICAgICAgICB2YWx1ZTEuWSAqPSBzY2FsYXI7XHJcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLy8gPHN1bW1hcnk+TXVsdGlwbGllcyBhIHZlY3RvciBieSBhIHNjYWxhci48L3N1bW1hcnk+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwic2NhbGFyXCI+VGhlIHNjYWxlciB2YWx1ZS48L3BhcmFtPlxyXG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cInZhbHVlMVwiPlRoZSB2ZWN0b3IuPC9wYXJhbT5cclxuICAgICAgICAvLy8gPHJldHVybnM+VGhlIG11bHRpcGxpY2F0aW9uIGJldHdlZW4gdGhlIHZlY3RvciBhbmQgc2NhbGFyLjwvcmV0dXJucz5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFZlY3RvcjIgb3BlcmF0b3IgKihmbG9hdCBzY2FsYXIsIFZlY3RvcjIgdmFsdWUxKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFsdWUxLlggKj0gc2NhbGFyO1xyXG4gICAgICAgICAgICB2YWx1ZTEuWSAqPSBzY2FsYXI7XHJcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLy8gPHN1bW1hcnk+RGl2aWRlIHR3byB2ZWN0b3JzLjwvc3VtbWFyeT5cclxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJ2YWx1ZTFcIj5UaGUgZmlyc3QgdmVjdG9yLCBvbiB0aGUgbGVmdCBzaWRlLjwvcGFyYW0+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwidmFsdWUyXCI+VGhlIGZpcnN0IHZlY3Rvciwgb24gdGhlIHJpZ2h0IHNpZGUuPC9wYXJhbT5cclxuICAgICAgICAvLy8gPHJldHVybnM+VGhlIGRldmlzaW9uIGJldHdlZW4gdHdvIHZlY3RvcnMuPC9yZXR1cm5zPlxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgVmVjdG9yMiBvcGVyYXRvciAvKFZlY3RvcjIgdmFsdWUxLCBWZWN0b3IyIHZhbHVlMilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhbHVlMS5YIC89IHZhbHVlMi5YO1xyXG4gICAgICAgICAgICB2YWx1ZTEuWSAvPSB2YWx1ZTIuWTtcclxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlMTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5EaXZpZGUgYSB2ZWN0b3IgYnkgYSBzY2FsYXIuPC9zdW1tYXJ5PlxyXG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cInZhbHVlMVwiPlRoZSB2ZWN0b3IsIG9uIHRoZSBsZWZ0IHNpZGUuPC9wYXJhbT5cclxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJkaXZpZGVyXCI+VGhlIHZhbHVlIHRvIGRpdmlkZSBieS48L3BhcmFtPlxyXG4gICAgICAgIC8vLyA8cmV0dXJucz5UaGUgZGV2aXNpb24gdGhlIHZlY3RvciBhbmQgdGhlIHNjYWxhci48L3JldHVybnM+XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBWZWN0b3IyIG9wZXJhdG9yIC8oVmVjdG9yMiB2YWx1ZTEsIGZsb2F0IGRpdmlkZXIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YWx1ZTEuWCAvPSBkaXZpZGVyO1xyXG4gICAgICAgICAgICB2YWx1ZTEuWSAvPSBkaXZpZGVyO1xyXG4gICAgICAgICAgICByZXR1cm4gdmFsdWUxO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJ1c2luZyBTeXN0ZW07XHJcblxyXG5uYW1lc3BhY2UgSnVpY2VCb3hFbmdpbmUuTWF0aFxyXG57XHJcbiAgICBwdWJsaWMgc3RydWN0IFZlY3RvcjMgOiBJRXF1YXRhYmxlPFZlY3RvcjM+XHJcbiAgICB7XHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlRoZSBYLUNvb3JkaW5hdGUuPC9zdW1tYXJ5PlxyXG4gICAgICAgIHB1YmxpYyBmbG9hdCBYO1xyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5UaGUgWS1Db29yZGluYXRlLjwvc3VtbWFyeT5cclxuICAgICAgICBwdWJsaWMgZmxvYXQgWTtcclxuICAgICAgICAvLy8gPHN1bW1hcnk+VGhlIFotQ29vcmRpbmF0ZS48L3N1bW1hcnk+XHJcbiAgICAgICAgcHVibGljIGZsb2F0IFo7XHJcblxyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5Db25zdHJ1Y3RvcnMgM0QgdmVjdG9yLjwvc3VtbWFyeT5cclxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJ4XCI+VGhlIFggY29vcmRpbmF0ZS48L3BhcmFtPlxyXG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cInlcIj5UaGUgWSBjb29yZGluYXRlLjwvcGFyYW0+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwielwiPlRoZSBaIGNvb3JkaW5hdGUuPC9wYXJhbT5cclxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJ3XCI+VGhlIFcgY29vcmRpbmF0ZS48L3BhcmFtPlxyXG4gICAgICAgIHB1YmxpYyBWZWN0b3IzKGZsb2F0IHgsIGZsb2F0IHksIGZsb2F0IHopXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBYID0geDtcclxuICAgICAgICAgICAgWSA9IHk7XHJcbiAgICAgICAgICAgIFogPSB6O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PkNvbnN0cnVjdHMgYSA0RCB2ZWN0b3IsIGFsbCB2YWx1ZXMgZXF1YWwgdG8gdGhlIGdpdmVuIHZhbHVlLjwvc3VtbWFyeT5cclxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJ2YWx1ZVwiPlRoZSB2YWx1ZSBmb3IgYWxsIGF4aXMuPC9wYXJhbT5cclxuICAgICAgICBwdWJsaWMgVmVjdG9yMyhmbG9hdCB2YWx1ZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFggPSB2YWx1ZTtcclxuICAgICAgICAgICAgWSA9IHZhbHVlO1xyXG4gICAgICAgICAgICBaID0gdmFsdWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLy8gPHN1bW1hcnk+UmV0dXJucyB0aGUgZGlzdGFuY2UgYmV0d2VlbiB0d28gdmVjdG9ycy48L3N1bW1hcnk+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwidmFsdWUxXCI+VGhlIGZpcnN0IHZlY3Rvci48L3BhcmFtPlxyXG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cInZhbHVlMlwiPlRoZSBzZWNvbmQgdmVjdG9yLjwvcGFyYW0+XHJcbiAgICAgICAgLy8vIDxyZXR1cm5zPlRoZSBkaXN0YW5jZSBiZXR3ZWVuIHR3byB2ZWN0b3JzLjwvcmV0dXJucz5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIGZsb2F0IERpc3RhbmNlKFZlY3RvcjMgdmFsdWUxLCBWZWN0b3IzIHZhbHVlMilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBNYXRoLlNxcnQoRGlzdGFuY2VTcXVhcmVkKHZhbHVlMSwgdmFsdWUyKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLy8gPHN1bW1hcnk+UmV0dXJucyB0aGUgc3F1YXJlZCBkaXN0YW5jZSBiZXR3ZWVuIHR3byB2ZWN0b3JzLjwvc3VtbWFyeT5cclxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJ2YWx1ZTFcIj5UaGUgZmlyc3QgdmVjdG9yLjwvcGFyYW0+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwidmFsdWUyXCI+VGhlIHNlY29uZCB2ZWN0b3IuPC9wYXJhbT5cclxuICAgICAgICAvLy8gPHJldHVybnM+VGhlIHNxdWFyZWQgZGlzdGFuY2UgYmV0d2VlbiB0d28gdmVjdG9ycy48L3JldHVybnM+XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBmbG9hdCBEaXN0YW5jZVNxdWFyZWQoVmVjdG9yMyB2YWx1ZTEsIFZlY3RvcjMgdmFsdWUyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuICAgKHZhbHVlMS5YIC0gdmFsdWUyLlgpICogKHZhbHVlMS5YIC0gdmFsdWUyLlgpICtcclxuICAgICAgICAgICAgICAgICAgICAgKHZhbHVlMS5ZIC0gdmFsdWUyLlkpICogKHZhbHVlMS5ZIC0gdmFsdWUyLlkpICtcclxuICAgICAgICAgICAgICAgICAgICAgKHZhbHVlMS5aIC0gdmFsdWUyLlopICogKHZhbHVlMS5aIC0gdmFsdWUyLlopO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlJldHVybnMgdGhlIGxlbmd0aCBvZiB0aGlzIHZlY3Rvci48L3N1bW1hcnk+XHJcbiAgICAgICAgLy8vIDxyZXR1cm5zPlRoZSBsZW5ndGguPC9yZXR1cm5zPlxyXG4gICAgICAgIHB1YmxpYyBmbG9hdCBMZW5ndGgoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIE1hdGguU3FydCgoWCAqIFgpICsgKFkgKiBZKSArIChaICogWikpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlJldHVybnMgdGhlIHNxdWFyZWQgbGVuZ3RoIG9mIHRoaXMgdmVjdG9yLjwvc3VtbWFyeT5cclxuICAgICAgICAvLy8gPHJldHVybnM+VGhlIHNxdWFyZWQgbGVuZ3RoLjwvcmV0dXJucz5cclxuICAgICAgICBwdWJsaWMgZmxvYXQgTGVuZ3RoU3F1YXJlZCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gKFggKiBYKSArIChZICogWSkgKyAoWiAqIFopO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5Pk1ha2VzIHRoaXMgdmVjdG9yIGEgbm9ybWFsaXplZCBvbmUuPC9zdW1tYXJ5PlxyXG4gICAgICAgIHB1YmxpYyB2b2lkIE5vcm1hbGl6ZSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmbG9hdCBmYWN0b3IgPSBNYXRoLlNxcnQoKFggKiBYKSArIChZICogWSkgKyAoWiAqIFopKTtcclxuICAgICAgICAgICAgZmFjdG9yID0gMS4wZiAvIGZhY3RvcjtcclxuICAgICAgICAgICAgWCAqPSBmYWN0b3I7XHJcbiAgICAgICAgICAgIFkgKj0gZmFjdG9yO1xyXG4gICAgICAgICAgICBaICo9IGZhY3RvcjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5Ob3JtYWxpemVzIHRoZSBnaXZlbiB2ZWN0b3IuPC9zdW1tYXJ5PlxyXG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cInZlY3RvclwiPlRoZSB2ZWN0b3IgdG8gbm9ybWFsaXplLjwvcGFyYW0+XHJcbiAgICAgICAgLy8vIDxyZXR1cm5zPkEgbm9ybWFsaXplZCB2ZWN0b3IuPC9yZXR1cm5zPlxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgVmVjdG9yMyBOb3JtYWxpemUoVmVjdG9yMyB2ZWN0b3IpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2ZWN0b3IuTm9ybWFsaXplKCk7XHJcbiAgICAgICAgICAgIHJldHVybiB2ZWN0b3I7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLy8gPHN1bW1hcnk+Q2FsY3VsYXRlcyB0aGUgZG90IHByb2R1Y3QuPC9zdW1tYXJ5PlxyXG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cInZlY3RvcjFcIj5UaGUgZmlyc3QgdmVjdG9yLjwvcGFyYW0+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwidmVjdG9yMlwiPlRoZSBzZWNvbmQgdmVjdG9yLjwvcGFyYW0+XHJcbiAgICAgICAgLy8vIDxyZXR1cm5zPlRoZSBkb3QgcHJvZHVjdCBvZiB0d28gdmVjdG9ycy48L3JldHVybnM+XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBmbG9hdCBEb3QoVmVjdG9yMyB2ZWN0b3IxLCBWZWN0b3IzIHZlY3RvcjIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gdmVjdG9yMS5YICogdmVjdG9yMi5YICsgdmVjdG9yMS5ZICogdmVjdG9yMi5ZICsgdmVjdG9yMS5aICogdmVjdG9yMi5aO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PkNhbGN1bGF0ZSB0aGUgY3Jvc3MgcHJvZHVjdC48L3N1bW1hcnk+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwidmVjdG9yMVwiPlRoZSBmaXJzdCB2ZWN0b3IuPC9wYXJhbT5cclxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJ2ZWN0b3IyXCI+VGhlIHNlY29uZCB2ZWN0b3IuPC9wYXJhbT5cclxuICAgICAgICAvLy8gPHJldHVybnM+VGhlIGNyb3NzIHByb2R1Y3Qgb2YgdGhlIHR3byB2ZWN0b3JzLjwvcmV0dXJucz5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFZlY3RvcjMgQ3Jvc3MoVmVjdG9yMyB2ZWN0b3IxLCBWZWN0b3IzIHZlY3RvcjIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmbG9hdCB4ID0gdmVjdG9yMS5ZICogdmVjdG9yMi5aIC0gdmVjdG9yMi5ZICogdmVjdG9yMS5aO1xyXG4gICAgICAgICAgICBmbG9hdCB5ID0gLSh2ZWN0b3IxLlggKiB2ZWN0b3IyLlogLSB2ZWN0b3IyLlggKiB2ZWN0b3IxLlopO1xyXG4gICAgICAgICAgICBmbG9hdCB6ID0gdmVjdG9yMS5YICogdmVjdG9yMi5ZIC0gdmVjdG9yMi5YICogdmVjdG9yMS5ZO1xyXG4gICAgICAgICAgICB2ZWN0b3IxLlggPSB4O1xyXG4gICAgICAgICAgICB2ZWN0b3IxLlkgPSB5O1xyXG4gICAgICAgICAgICB2ZWN0b3IxLlogPSB6O1xyXG4gICAgICAgICAgICByZXR1cm4gdmVjdG9yMTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5HaXZlcyBhIHN0cmluZyByZXByZXNlbnRpbmcgdGhlIHZlY3Rvci48L3N1bW1hcnk+XHJcbiAgICAgICAgLy8vIDxyZXR1cm5zPlN0cmluZyByZXByZXNlbnRhdGlvbiBvZiB0aGlzIHZlY3Rvci48L3JldHVybnM+XHJcbiAgICAgICAgcHVibGljIG92ZXJyaWRlIHN0cmluZyBUb1N0cmluZygpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gXCIoXCIgKyBYICsgXCIsIFwiICsgWSArIFwiLCBcIiArIFogKyBcIilcIjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5DaGVjayBpZiB0aGUgdmVjdG9yIGlzIGVxdWFsIHRvIGFuIG90aGVyIHZlY3Rvci48L3N1bW1hcnk+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwib3RoZXJcIj5UaGUgdmVjdG9yIHRvIGNoZWNrIGFnYWluc3QuPC9wYXJhbT5cclxuICAgICAgICAvLy8gPHJldHVybnM+RmFsc2UgaWYgbm90IGVxdWFsLCB0cnVlIGlmIHRoZSB2ZWN0b3JzIGFyZSBlcXVhbC48L3JldHVybnM+XHJcbiAgICAgICAgcHVibGljIGJvb2wgRXF1YWxzKFZlY3RvcjMgb3RoZXIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gWCA9PSBvdGhlci5YXHJcbiAgICAgICAgICAgICAgICAmJiBZID09IG90aGVyLllcclxuICAgICAgICAgICAgICAgICYmIFogPT0gb3RoZXIuWjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5DaGVjayBpZiB0aGUgdmVjdG9yIGlzIGVxdWFsIHRvIHRoZSBvdGhlciBvYmplY3QuPC9zdW1tYXJ5PlxyXG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cIm9cIj5UaGUgb2JqZWN0IHRvIGNoZWNrIGFnYWluc3QuPC9wYXJhbT5cclxuICAgICAgICAvLy8gPHJldHVybnM+RmFsc2UgaWYgbm90IGVxdWFsLCB0cnVlIGlmIHRoZSB2ZWN0b3JzIGFyZSBlcXVhbC48L3JldHVybnM+XHJcbiAgICAgICAgcHVibGljIG92ZXJyaWRlIGJvb2wgRXF1YWxzKG9iamVjdCBvKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKG8gaXMgVmVjdG9yMylcclxuICAgICAgICAgICAgICAgIHJldHVybiBFcXVhbHMoKFZlY3RvcjMpbyk7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5HZXRzIHRoZSBoYXNoIGNvZGUgb2YgdGhpcyB2ZWN0b3IuPC9zdW1tYXJ5PlxyXG4gICAgICAgIC8vLyA8cmV0dXJucz5IYXNoIGNvZGUgb2YgdGhpcyB2ZWN0b3IuPC9yZXR1cm5zPlxyXG4gICAgICAgIHB1YmxpYyBvdmVycmlkZSBpbnQgR2V0SGFzaENvZGUoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdW5jaGVja2VkXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGludCBoYXNoQ29kZSA9IFguR2V0SGFzaENvZGUoKTtcclxuICAgICAgICAgICAgICAgIGhhc2hDb2RlID0gKGhhc2hDb2RlICogMzk3KSBeIFkuR2V0SGFzaENvZGUoKTtcclxuICAgICAgICAgICAgICAgIGhhc2hDb2RlID0gKGhhc2hDb2RlICogMzk3KSBeIFouR2V0SGFzaENvZGUoKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBoYXNoQ29kZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PkludmVydHMgdGhlIHZlY3RvciB2YWx1ZXMuPC9zdW1tYXJ5PlxyXG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cInZhbHVlXCI+VGhlIHZlY3RvciB0byBpbnZlcnQuPC9wYXJhbT5cclxuICAgICAgICAvLy8gPHJldHVybnM+SW52ZXJ0ZWQgdmVjdG9yLjwvcmV0dXJucz5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFZlY3RvcjMgb3BlcmF0b3IgLShWZWN0b3IzIHZhbHVlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBWZWN0b3IzKC12YWx1ZS5YLCAtdmFsdWUuWSwgLXZhbHVlLlopO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PkNoZWNrcyBpZiB0d28gdmVjdG9ycyBhcmUgZXF1YWwuPC9zdW1tYXJ5PlxyXG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cInZhbHVlMVwiPlRoZSBmaXJzdCB2ZWN0b3IuPC9wYXJhbT5cclxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJ2YWx1ZTJcIj5UaGUgc2Vjb25kIHZlY3Rvci48L3BhcmFtPlxyXG4gICAgICAgIC8vLyA8cmV0dXJucz5JZiB0aGUgdHdvIHZlY3RvcnMgYXJlIGVxdWFsIHRydWUsIG90aGVyd2lzZSBmYWxzZS48L3JldHVybnM+XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBib29sIG9wZXJhdG9yID09KFZlY3RvcjMgdmFsdWUxLCBWZWN0b3IzIHZhbHVlMilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTEuWCA9PSB2YWx1ZTIuWFxyXG4gICAgICAgICAgICAgICAgJiYgdmFsdWUxLlkgPT0gdmFsdWUyLllcclxuICAgICAgICAgICAgICAgICYmIHZhbHVlMS5aID09IHZhbHVlMi5aO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PkNoZWNrcyBpZiB0aGUgdHdvIHZlY3RvcnMgYXJlIG5vdCBlcXVhbDwvc3VtbWFyeT5cclxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJ2YWx1ZTFcIj5UaGUgZmlyc3QgdmVjdG9yLjwvcGFyYW0+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwidmFsdWUyXCI+VGhlIHNlY29uZCB2ZWN0b3IuPC9wYXJhbT5cclxuICAgICAgICAvLy8gPHJldHVybnM+SWYgdGhlIHR3byB2ZWN0b3JzIGFyZSBub3QgZXF1YWwgdHJ1ZSwgb3RoZXJ3aXNlIGZhbHNlLjwvcmV0dXJucz5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIGJvb2wgb3BlcmF0b3IgIT0oVmVjdG9yMyB2YWx1ZTEsIFZlY3RvcjMgdmFsdWUyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlMS5YICE9IHZhbHVlMi5YXHJcbiAgICAgICAgICAgICAgICAmJiB2YWx1ZTEuWSAhPSB2YWx1ZTIuWVxyXG4gICAgICAgICAgICAgICAgJiYgdmFsdWUxLlogIT0gdmFsdWUyLlo7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLy8gPHN1bW1hcnk+QWRkcyB0d28gdmVjdG9ycy48L3N1bW1hcnk+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwidmFsdWUxXCI+VGhlIGZpcnN0IHZlY3Rvci48L3BhcmFtPlxyXG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cInZhbHVlMlwiPlRoZSBzZWNvbmQgdmVjdG9yLjwvcGFyYW0+XHJcbiAgICAgICAgLy8vIDxyZXR1cm5zPlRoZSBzdW0gb2YgdGhlIHR3byB2ZWN0b3JzLjwvcmV0dXJucz5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFZlY3RvcjMgb3BlcmF0b3IgKyhWZWN0b3IzIHZhbHVlMSwgVmVjdG9yMyB2YWx1ZTIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YWx1ZTEuWCArPSB2YWx1ZTIuWDtcclxuICAgICAgICAgICAgdmFsdWUxLlkgKz0gdmFsdWUyLlk7XHJcbiAgICAgICAgICAgIHZhbHVlMS5aICs9IHZhbHVlMi5aO1xyXG4gICAgICAgICAgICByZXR1cm4gdmFsdWUxO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlN1YnRyYWN0cyB0d28gdmVjdG9ycy48L3N1bW1hcnk+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwidmFsdWUxXCI+VGhlIGZpcnN0IHZlY3Rvciwgb24gdGhlIGxlZnQgc2lkZS48L3BhcmFtPlxyXG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cInZhbHVlMlwiPlRoZSBzZWNvbmQgdmVjdG9yLCBvbiB0aGUgcmlnaHQgc2lkZS48L3BhcmFtPlxyXG4gICAgICAgIC8vLyA8cmV0dXJucz5UaGUgcmVzdWx0IG9mIHRoZSBzdWJzdHJhY3Rpb24gYmV0d2VlbiB0aGUgdHdvIHZlY3RvcnMuPC9yZXR1cm5zPlxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgVmVjdG9yMyBvcGVyYXRvciAtKFZlY3RvcjMgdmFsdWUxLCBWZWN0b3IzIHZhbHVlMilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhbHVlMS5YIC09IHZhbHVlMi5YO1xyXG4gICAgICAgICAgICB2YWx1ZTEuWSAtPSB2YWx1ZTIuWTtcclxuICAgICAgICAgICAgdmFsdWUxLlogLT0gdmFsdWUyLlo7XHJcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLy8gPHN1bW1hcnk+TXVsdGlwbGllcyB0d28gdmVjdG9ycy48L3N1bW1hcnk+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwidmFsdWUxXCI+VGhlIGZpcnN0IHZlY3Rvci48L3BhcmFtPlxyXG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cInZhbHVlMlwiPlRoZSBzZWNvbmQgdmVjdG9yLjwvcGFyYW0+XHJcbiAgICAgICAgLy8vIDxyZXR1cm5zPlRoZSBtdWx0aXBsaWNhdGlvbiBiZXR3ZWVuIHRoZSBnaXZlbiB2ZWN0b3JzLjwvcmV0dXJucz5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFZlY3RvcjMgb3BlcmF0b3IgKihWZWN0b3IzIHZhbHVlMSwgVmVjdG9yMyB2YWx1ZTIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YWx1ZTEuWCAqPSB2YWx1ZTIuWDtcclxuICAgICAgICAgICAgdmFsdWUxLlkgKj0gdmFsdWUyLlk7XHJcbiAgICAgICAgICAgIHZhbHVlMS5aICo9IHZhbHVlMi5aO1xyXG4gICAgICAgICAgICByZXR1cm4gdmFsdWUxO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5Pk11bHRpcGxpZXMgYSB2ZWN0b3IgYnkgYSBzY2FsYXIuPC9zdW1tYXJ5PlxyXG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cInZhbHVlMVwiPlRoZSB2ZWN0b3IuPC9wYXJhbT5cclxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJzY2FsYXJcIj5UaGUgc2NhbGVyIHZhbHVlLjwvcGFyYW0+XHJcbiAgICAgICAgLy8vIDxyZXR1cm5zPlRoZSBtdWx0aXBsaWNhdGlvbiBiZXR3ZWVuIHRoZSB2ZWN0b3IgYW5kIHNjYWxhci48L3JldHVybnM+XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBWZWN0b3IzIG9wZXJhdG9yICooVmVjdG9yMyB2YWx1ZTEsIGZsb2F0IHNjYWxhcilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhbHVlMS5YICo9IHNjYWxhcjtcclxuICAgICAgICAgICAgdmFsdWUxLlkgKj0gc2NhbGFyO1xyXG4gICAgICAgICAgICB2YWx1ZTEuWiAqPSBzY2FsYXI7XHJcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLy8gPHN1bW1hcnk+TXVsdGlwbGllcyBhIHZlY3RvciBieSBhIHNjYWxhci48L3N1bW1hcnk+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwic2NhbGFyXCI+VGhlIHNjYWxlciB2YWx1ZS48L3BhcmFtPlxyXG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cInZhbHVlMVwiPlRoZSB2ZWN0b3IuPC9wYXJhbT5cclxuICAgICAgICAvLy8gPHJldHVybnM+VGhlIG11bHRpcGxpY2F0aW9uIGJldHdlZW4gdGhlIHZlY3RvciBhbmQgc2NhbGFyLjwvcmV0dXJucz5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFZlY3RvcjMgb3BlcmF0b3IgKihmbG9hdCBzY2FsYXIsIFZlY3RvcjMgdmFsdWUxKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFsdWUxLlggKj0gc2NhbGFyO1xyXG4gICAgICAgICAgICB2YWx1ZTEuWSAqPSBzY2FsYXI7XHJcbiAgICAgICAgICAgIHZhbHVlMS5aICo9IHNjYWxhcjtcclxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlMTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5EaXZpZGUgdHdvIHZlY3RvcnMuPC9zdW1tYXJ5PlxyXG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cInZhbHVlMVwiPlRoZSBmaXJzdCB2ZWN0b3IsIG9uIHRoZSBsZWZ0IHNpZGUuPC9wYXJhbT5cclxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJ2YWx1ZTJcIj5UaGUgZmlyc3QgdmVjdG9yLCBvbiB0aGUgcmlnaHQgc2lkZS48L3BhcmFtPlxyXG4gICAgICAgIC8vLyA8cmV0dXJucz5UaGUgZGV2aXNpb24gYmV0d2VlbiB0d28gdmVjdG9ycy48L3JldHVybnM+XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBWZWN0b3IzIG9wZXJhdG9yIC8oVmVjdG9yMyB2YWx1ZTEsIFZlY3RvcjMgdmFsdWUyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFsdWUxLlggLz0gdmFsdWUyLlg7XHJcbiAgICAgICAgICAgIHZhbHVlMS5ZIC89IHZhbHVlMi5ZO1xyXG4gICAgICAgICAgICB2YWx1ZTEuWiAvPSB2YWx1ZTIuWjtcclxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlMTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5EaXZpZGUgYSB2ZWN0b3IgYnkgYSBzY2FsYXIuPC9zdW1tYXJ5PlxyXG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cInZhbHVlMVwiPlRoZSB2ZWN0b3IsIG9uIHRoZSBsZWZ0IHNpZGUuPC9wYXJhbT5cclxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJkaXZpZGVyXCI+VGhlIHZhbHVlIHRvIGRpdmlkZSBieS48L3BhcmFtPlxyXG4gICAgICAgIC8vLyA8cmV0dXJucz5UaGUgZGV2aXNpb24gdGhlIHZlY3RvciBhbmQgdGhlIHNjYWxhci48L3JldHVybnM+XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBWZWN0b3IzIG9wZXJhdG9yIC8oVmVjdG9yMyB2YWx1ZTEsIGZsb2F0IGRpdmlkZXIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YWx1ZTEuWCAvPSBkaXZpZGVyO1xyXG4gICAgICAgICAgICB2YWx1ZTEuWSAvPSBkaXZpZGVyO1xyXG4gICAgICAgICAgICB2YWx1ZTEuWiAvPSBkaXZpZGVyO1xyXG4gICAgICAgICAgICByZXR1cm4gdmFsdWUxO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJ1c2luZyBTeXN0ZW07XHJcblxyXG5uYW1lc3BhY2UgSnVpY2VCb3hFbmdpbmUuTWF0aFxyXG57XHJcbiAgICBwdWJsaWMgc3RydWN0IFZlY3RvcjQgOiBJRXF1YXRhYmxlPFZlY3RvcjQ+XHJcbiAgICB7XHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlRoZSBYLUNvb3JkaW5hdGUuPC9zdW1tYXJ5PlxyXG4gICAgICAgIHB1YmxpYyBmbG9hdCBYO1xyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5UaGUgWS1Db29yZGluYXRlLjwvc3VtbWFyeT5cclxuICAgICAgICBwdWJsaWMgZmxvYXQgWTtcclxuICAgICAgICAvLy8gPHN1bW1hcnk+VGhlIFotQ29vcmRpbmF0ZS48L3N1bW1hcnk+XHJcbiAgICAgICAgcHVibGljIGZsb2F0IFo7XHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlRoZSBXLUNvb3JkaW5hdGUuPC9zdW1tYXJ5PlxyXG4gICAgICAgIHB1YmxpYyBmbG9hdCBXO1xyXG5cclxuICAgICAgICAvLy8gPHN1bW1hcnk+Q29uc3RydWN0b3JzIDREIHZlY3Rvci48L3N1bW1hcnk+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwieFwiPlRoZSBYIGNvb3JkaW5hdGUuPC9wYXJhbT5cclxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJ5XCI+VGhlIFkgY29vcmRpbmF0ZS48L3BhcmFtPlxyXG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cInpcIj5UaGUgWiBjb29yZGluYXRlLjwvcGFyYW0+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwid1wiPlRoZSBXIGNvb3JkaW5hdGUuPC9wYXJhbT5cclxuICAgICAgICBwdWJsaWMgVmVjdG9yNChmbG9hdCB4LCBmbG9hdCB5LCBmbG9hdCB6LCBmbG9hdCB3KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgWCA9IHg7XHJcbiAgICAgICAgICAgIFkgPSB5O1xyXG4gICAgICAgICAgICBaID0gejtcclxuICAgICAgICAgICAgVyA9IHc7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLy8gPHN1bW1hcnk+Q29uc3RydWN0cyBhIDREIHZlY3RvciwgYWxsIHZhbHVlcyBlcXVhbCB0byB0aGUgZ2l2ZW4gdmFsdWUuPC9zdW1tYXJ5PlxyXG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cInZhbHVlXCI+VGhlIHZhbHVlIGZvciBhbGwgYXhpcy48L3BhcmFtPlxyXG4gICAgICAgIHB1YmxpYyBWZWN0b3I0KGZsb2F0IHZhbHVlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgWCA9IHZhbHVlO1xyXG4gICAgICAgICAgICBZID0gdmFsdWU7XHJcbiAgICAgICAgICAgIFogPSB2YWx1ZTtcclxuICAgICAgICAgICAgVyA9IHZhbHVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlJldHVybnMgdGhlIGRpc3RhbmNlIGJldHdlZW4gdHdvIHZlY3RvcnMuPC9zdW1tYXJ5PlxyXG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cInZhbHVlMVwiPlRoZSBmaXJzdCB2ZWN0b3IuPC9wYXJhbT5cclxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJ2YWx1ZTJcIj5UaGUgc2Vjb25kIHZlY3Rvci48L3BhcmFtPlxyXG4gICAgICAgIC8vLyA8cmV0dXJucz5UaGUgZGlzdGFuY2UgYmV0d2VlbiB0d28gdmVjdG9ycy48L3JldHVybnM+XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBmbG9hdCBEaXN0YW5jZShWZWN0b3I0IHZhbHVlMSwgVmVjdG9yNCB2YWx1ZTIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gTWF0aC5TcXJ0KERpc3RhbmNlU3F1YXJlZCh2YWx1ZTEsIHZhbHVlMikpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlJldHVybnMgdGhlIHNxdWFyZWQgZGlzdGFuY2UgYmV0d2VlbiB0d28gdmVjdG9ycy48L3N1bW1hcnk+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwidmFsdWUxXCI+VGhlIGZpcnN0IHZlY3Rvci48L3BhcmFtPlxyXG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cInZhbHVlMlwiPlRoZSBzZWNvbmQgdmVjdG9yLjwvcGFyYW0+XHJcbiAgICAgICAgLy8vIDxyZXR1cm5zPlRoZSBzcXVhcmVkIGRpc3RhbmNlIGJldHdlZW4gdHdvIHZlY3RvcnMuPC9yZXR1cm5zPlxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgZmxvYXQgRGlzdGFuY2VTcXVhcmVkKFZlY3RvcjQgdmFsdWUxLCBWZWN0b3I0IHZhbHVlMilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiAodmFsdWUxLlcgLSB2YWx1ZTIuVykgKiAodmFsdWUxLlcgLSB2YWx1ZTIuVykgK1xyXG4gICAgICAgICAgICAgICAgICAgICAodmFsdWUxLlggLSB2YWx1ZTIuWCkgKiAodmFsdWUxLlggLSB2YWx1ZTIuWCkgK1xyXG4gICAgICAgICAgICAgICAgICAgICAodmFsdWUxLlkgLSB2YWx1ZTIuWSkgKiAodmFsdWUxLlkgLSB2YWx1ZTIuWSkgK1xyXG4gICAgICAgICAgICAgICAgICAgICAodmFsdWUxLlogLSB2YWx1ZTIuWikgKiAodmFsdWUxLlogLSB2YWx1ZTIuWik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLy8gPHN1bW1hcnk+UmV0dXJucyB0aGUgbGVuZ3RoIG9mIHRoaXMgdmVjdG9yLjwvc3VtbWFyeT5cclxuICAgICAgICAvLy8gPHJldHVybnM+VGhlIGxlbmd0aC48L3JldHVybnM+XHJcbiAgICAgICAgcHVibGljIGZsb2F0IExlbmd0aCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gTWF0aC5TcXJ0KChYICogWCkgKyAoWSAqIFkpICsgKFogKiBaKSArIChXICogVykpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlJldHVybnMgdGhlIHNxdWFyZWQgbGVuZ3RoIG9mIHRoaXMgdmVjdG9yLjwvc3VtbWFyeT5cclxuICAgICAgICAvLy8gPHJldHVybnM+VGhlIHNxdWFyZWQgbGVuZ3RoLjwvcmV0dXJucz5cclxuICAgICAgICBwdWJsaWMgZmxvYXQgTGVuZ3RoU3F1YXJlZCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gKFggKiBYKSArIChZICogWSkgKyAoWiAqIFopICsgKFcgKiBXKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5NYWtlcyB0aGlzIHZlY3RvciBhIG5vcm1hbGl6ZWQgb25lLjwvc3VtbWFyeT5cclxuICAgICAgICBwdWJsaWMgdm9pZCBOb3JtYWxpemUoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZmxvYXQgZmFjdG9yID0gTWF0aC5TcXJ0KChYICogWCkgKyAoWSAqIFkpICsgKFogKiBaKSArIChXICogVykpO1xyXG4gICAgICAgICAgICBmYWN0b3IgPSAxLjBmIC8gZmFjdG9yO1xyXG4gICAgICAgICAgICBYICo9IGZhY3RvcjtcclxuICAgICAgICAgICAgWSAqPSBmYWN0b3I7XHJcbiAgICAgICAgICAgIFogKj0gZmFjdG9yO1xyXG4gICAgICAgICAgICBXICo9IGZhY3RvcjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5Ob3JtYWxpemVzIHRoZSBnaXZlbiB2ZWN0b3IuPC9zdW1tYXJ5PlxyXG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cInZlY3RvclwiPlRoZSB2ZWN0b3IgdG8gbm9ybWFsaXplLjwvcGFyYW0+XHJcbiAgICAgICAgLy8vIDxyZXR1cm5zPkEgbm9ybWFsaXplZCB2ZWN0b3IuPC9yZXR1cm5zPlxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgVmVjdG9yNCBOb3JtYWxpemUoVmVjdG9yNCB2ZWN0b3IpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2ZWN0b3IuTm9ybWFsaXplKCk7XHJcbiAgICAgICAgICAgIHJldHVybiB2ZWN0b3I7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLy8gPHN1bW1hcnk+Q2FsY3VsYXRlcyB0aGUgZG90IHByb2R1Y3QuPC9zdW1tYXJ5PlxyXG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cInZlY3RvcjFcIj5UaGUgZmlyc3QgdmVjdG9yLjwvcGFyYW0+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwidmVjdG9yMlwiPlRoZSBzZWNvbmQgdmVjdG9yLjwvcGFyYW0+XHJcbiAgICAgICAgLy8vIDxyZXR1cm5zPlRoZSBkb3QgcHJvZHVjdCBvZiB0d28gdmVjdG9ycy48L3JldHVybnM+XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBmbG9hdCBEb3QoVmVjdG9yNCB2ZWN0b3IxLCBWZWN0b3I0IHZlY3RvcjIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gdmVjdG9yMS5YICogdmVjdG9yMi5YICsgdmVjdG9yMS5ZICogdmVjdG9yMi5ZICsgdmVjdG9yMS5aICogdmVjdG9yMi5aICsgdmVjdG9yMS5XICogdmVjdG9yMi5XO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PkdpdmVzIGEgc3RyaW5nIHJlcHJlc2VudGluZyB0aGUgdmVjdG9yLjwvc3VtbWFyeT5cclxuICAgICAgICAvLy8gPHJldHVybnM+U3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIHRoaXMgdmVjdG9yLjwvcmV0dXJucz5cclxuICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgc3RyaW5nIFRvU3RyaW5nKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBcIihcIiArIFggKyBcIiwgXCIgKyBZICsgXCIsIFwiICsgWiArIFwiLCBcIiArIFcgKyBcIilcIjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5DaGVjayBpZiB0aGUgdmVjdG9yIGlzIGVxdWFsIHRvIGFuIG90aGVyIHZlY3Rvci48L3N1bW1hcnk+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwib3RoZXJcIj5UaGUgdmVjdG9yIHRvIGNoZWNrIGFnYWluc3QuPC9wYXJhbT5cclxuICAgICAgICAvLy8gPHJldHVybnM+RmFsc2UgaWYgbm90IGVxdWFsLCB0cnVlIGlmIHRoZSB2ZWN0b3JzIGFyZSBlcXVhbC48L3JldHVybnM+XHJcbiAgICAgICAgcHVibGljIGJvb2wgRXF1YWxzKFZlY3RvcjQgb3RoZXIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gWCA9PSBvdGhlci5YXHJcbiAgICAgICAgICAgICAgICAmJiBZID09IG90aGVyLllcclxuICAgICAgICAgICAgICAgICYmIFogPT0gb3RoZXIuWlxyXG4gICAgICAgICAgICAgICAgJiYgVyA9PSBvdGhlci5XO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PkNoZWNrIGlmIHRoZSB2ZWN0b3IgaXMgZXF1YWwgdG8gdGhlIG90aGVyIG9iamVjdC48L3N1bW1hcnk+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwib1wiPlRoZSBvYmplY3QgdG8gY2hlY2sgYWdhaW5zdC48L3BhcmFtPlxyXG4gICAgICAgIC8vLyA8cmV0dXJucz5GYWxzZSBpZiBub3QgZXF1YWwsIHRydWUgaWYgdGhlIHZlY3RvcnMgYXJlIGVxdWFsLjwvcmV0dXJucz5cclxuICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgYm9vbCBFcXVhbHMob2JqZWN0IG8pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAobyBpcyBWZWN0b3I0KVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIEVxdWFscygoVmVjdG9yNClvKTtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PkdldHMgdGhlIGhhc2ggY29kZSBvZiB0aGlzIHZlY3Rvci48L3N1bW1hcnk+XHJcbiAgICAgICAgLy8vIDxyZXR1cm5zPkhhc2ggY29kZSBvZiB0aGlzIHZlY3Rvci48L3JldHVybnM+XHJcbiAgICAgICAgcHVibGljIG92ZXJyaWRlIGludCBHZXRIYXNoQ29kZSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB1bmNoZWNrZWRcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaW50IGhhc2hDb2RlID0gWC5HZXRIYXNoQ29kZSgpO1xyXG4gICAgICAgICAgICAgICAgaGFzaENvZGUgPSAoaGFzaENvZGUgKiAzOTcpIF4gWS5HZXRIYXNoQ29kZSgpO1xyXG4gICAgICAgICAgICAgICAgaGFzaENvZGUgPSAoaGFzaENvZGUgKiAzOTcpIF4gWi5HZXRIYXNoQ29kZSgpO1xyXG4gICAgICAgICAgICAgICAgaGFzaENvZGUgPSAoaGFzaENvZGUgKiAzOTcpIF4gVy5HZXRIYXNoQ29kZSgpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGhhc2hDb2RlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLy8gPHN1bW1hcnk+SW52ZXJ0cyB0aGUgdmVjdG9yIHZhbHVlcy48L3N1bW1hcnk+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwidmFsdWVcIj5UaGUgdmVjdG9yIHRvIGludmVydC48L3BhcmFtPlxyXG4gICAgICAgIC8vLyA8cmV0dXJucz5JbnZlcnRlZCB2ZWN0b3IuPC9yZXR1cm5zPlxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgVmVjdG9yNCBvcGVyYXRvciAtKFZlY3RvcjQgdmFsdWUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IFZlY3RvcjQoLXZhbHVlLlgsIC12YWx1ZS5ZLCAtdmFsdWUuWiwgLXZhbHVlLlcpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PkNoZWNrcyBpZiB0d28gdmVjdG9ycyBhcmUgZXF1YWwuPC9zdW1tYXJ5PlxyXG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cInZhbHVlMVwiPlRoZSBmaXJzdCB2ZWN0b3IuPC9wYXJhbT5cclxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJ2YWx1ZTJcIj5UaGUgc2Vjb25kIHZlY3Rvci48L3BhcmFtPlxyXG4gICAgICAgIC8vLyA8cmV0dXJucz5JZiB0aGUgdHdvIHZlY3RvcnMgYXJlIGVxdWFsIHRydWUsIG90aGVyd2lzZSBmYWxzZS48L3JldHVybnM+XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBib29sIG9wZXJhdG9yID09KFZlY3RvcjQgdmFsdWUxLCBWZWN0b3I0IHZhbHVlMilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTEuWCA9PSB2YWx1ZTIuWFxyXG4gICAgICAgICAgICAgICAgJiYgdmFsdWUxLlkgPT0gdmFsdWUyLllcclxuICAgICAgICAgICAgICAgICYmIHZhbHVlMS5aID09IHZhbHVlMi5aXHJcbiAgICAgICAgICAgICAgICAmJiB2YWx1ZTEuVyA9PSB2YWx1ZTIuVztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5DaGVja3MgaWYgdGhlIHR3byB2ZWN0b3JzIGFyZSBub3QgZXF1YWw8L3N1bW1hcnk+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwidmFsdWUxXCI+VGhlIGZpcnN0IHZlY3Rvci48L3BhcmFtPlxyXG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cInZhbHVlMlwiPlRoZSBzZWNvbmQgdmVjdG9yLjwvcGFyYW0+XHJcbiAgICAgICAgLy8vIDxyZXR1cm5zPklmIHRoZSB0d28gdmVjdG9ycyBhcmUgbm90IGVxdWFsIHRydWUsIG90aGVyd2lzZSBmYWxzZS48L3JldHVybnM+XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBib29sIG9wZXJhdG9yICE9KFZlY3RvcjQgdmFsdWUxLCBWZWN0b3I0IHZhbHVlMilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTEuWCAhPSB2YWx1ZTIuWFxyXG4gICAgICAgICAgICAgICAgJiYgdmFsdWUxLlkgIT0gdmFsdWUyLllcclxuICAgICAgICAgICAgICAgICYmIHZhbHVlMS5aICE9IHZhbHVlMi5aXHJcbiAgICAgICAgICAgICAgICAmJiB2YWx1ZTEuVyAhPSB2YWx1ZTIuVztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5BZGRzIHR3byB2ZWN0b3JzLjwvc3VtbWFyeT5cclxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJ2YWx1ZTFcIj5UaGUgZmlyc3QgdmVjdG9yLjwvcGFyYW0+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwidmFsdWUyXCI+VGhlIHNlY29uZCB2ZWN0b3IuPC9wYXJhbT5cclxuICAgICAgICAvLy8gPHJldHVybnM+VGhlIHN1bSBvZiB0aGUgdHdvIHZlY3RvcnMuPC9yZXR1cm5zPlxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgVmVjdG9yNCBvcGVyYXRvciArKFZlY3RvcjQgdmFsdWUxLCBWZWN0b3I0IHZhbHVlMilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhbHVlMS5YICs9IHZhbHVlMi5YO1xyXG4gICAgICAgICAgICB2YWx1ZTEuWSArPSB2YWx1ZTIuWTtcclxuICAgICAgICAgICAgdmFsdWUxLlogKz0gdmFsdWUyLlo7XHJcbiAgICAgICAgICAgIHZhbHVlMS5XICs9IHZhbHVlMi5XO1xyXG4gICAgICAgICAgICByZXR1cm4gdmFsdWUxO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlN1YnRyYWN0cyB0d28gdmVjdG9ycy48L3N1bW1hcnk+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwidmFsdWUxXCI+VGhlIGZpcnN0IHZlY3Rvciwgb24gdGhlIGxlZnQgc2lkZS48L3BhcmFtPlxyXG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cInZhbHVlMlwiPlRoZSBzZWNvbmQgdmVjdG9yLCBvbiB0aGUgcmlnaHQgc2lkZS48L3BhcmFtPlxyXG4gICAgICAgIC8vLyA8cmV0dXJucz5UaGUgcmVzdWx0IG9mIHRoZSBzdWJzdHJhY3Rpb24gYmV0d2VlbiB0aGUgdHdvIHZlY3RvcnMuPC9yZXR1cm5zPlxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgVmVjdG9yNCBvcGVyYXRvciAtKFZlY3RvcjQgdmFsdWUxLCBWZWN0b3I0IHZhbHVlMilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhbHVlMS5YIC09IHZhbHVlMi5YO1xyXG4gICAgICAgICAgICB2YWx1ZTEuWSAtPSB2YWx1ZTIuWTtcclxuICAgICAgICAgICAgdmFsdWUxLlogLT0gdmFsdWUyLlo7XHJcbiAgICAgICAgICAgIHZhbHVlMS5XIC09IHZhbHVlMi5XO1xyXG4gICAgICAgICAgICByZXR1cm4gdmFsdWUxO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5Pk11bHRpcGxpZXMgdHdvIHZlY3RvcnMuPC9zdW1tYXJ5PlxyXG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cInZhbHVlMVwiPlRoZSBmaXJzdCB2ZWN0b3IuPC9wYXJhbT5cclxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJ2YWx1ZTJcIj5UaGUgc2Vjb25kIHZlY3Rvci48L3BhcmFtPlxyXG4gICAgICAgIC8vLyA8cmV0dXJucz5UaGUgbXVsdGlwbGljYXRpb24gYmV0d2VlbiB0aGUgZ2l2ZW4gdmVjdG9ycy48L3JldHVybnM+XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBWZWN0b3I0IG9wZXJhdG9yICooVmVjdG9yNCB2YWx1ZTEsIFZlY3RvcjQgdmFsdWUyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFsdWUxLlggKj0gdmFsdWUyLlg7XHJcbiAgICAgICAgICAgIHZhbHVlMS5ZICo9IHZhbHVlMi5ZO1xyXG4gICAgICAgICAgICB2YWx1ZTEuWiAqPSB2YWx1ZTIuWjtcclxuICAgICAgICAgICAgdmFsdWUxLlcgKj0gdmFsdWUyLlc7XHJcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLy8gPHN1bW1hcnk+TXVsdGlwbGllcyBhIHZlY3RvciBieSBhIHNjYWxhci48L3N1bW1hcnk+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwidmFsdWUxXCI+VGhlIHZlY3Rvci48L3BhcmFtPlxyXG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cInNjYWxhclwiPlRoZSBzY2FsZXIgdmFsdWUuPC9wYXJhbT5cclxuICAgICAgICAvLy8gPHJldHVybnM+VGhlIG11bHRpcGxpY2F0aW9uIGJldHdlZW4gdGhlIHZlY3RvciBhbmQgc2NhbGFyLjwvcmV0dXJucz5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFZlY3RvcjQgb3BlcmF0b3IgKihWZWN0b3I0IHZhbHVlMSwgZmxvYXQgc2NhbGFyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFsdWUxLlggKj0gc2NhbGFyO1xyXG4gICAgICAgICAgICB2YWx1ZTEuWSAqPSBzY2FsYXI7XHJcbiAgICAgICAgICAgIHZhbHVlMS5aICo9IHNjYWxhcjtcclxuICAgICAgICAgICAgdmFsdWUxLlcgKj0gc2NhbGFyO1xyXG4gICAgICAgICAgICByZXR1cm4gdmFsdWUxO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5Pk11bHRpcGxpZXMgYSB2ZWN0b3IgYnkgYSBzY2FsYXIuPC9zdW1tYXJ5PlxyXG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cInNjYWxhclwiPlRoZSBzY2FsZXIgdmFsdWUuPC9wYXJhbT5cclxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJ2YWx1ZTFcIj5UaGUgdmVjdG9yLjwvcGFyYW0+XHJcbiAgICAgICAgLy8vIDxyZXR1cm5zPlRoZSBtdWx0aXBsaWNhdGlvbiBiZXR3ZWVuIHRoZSB2ZWN0b3IgYW5kIHNjYWxhci48L3JldHVybnM+XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBWZWN0b3I0IG9wZXJhdG9yICooZmxvYXQgc2NhbGFyLCBWZWN0b3I0IHZhbHVlMSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhbHVlMS5YICo9IHNjYWxhcjtcclxuICAgICAgICAgICAgdmFsdWUxLlkgKj0gc2NhbGFyO1xyXG4gICAgICAgICAgICB2YWx1ZTEuWiAqPSBzY2FsYXI7XHJcbiAgICAgICAgICAgIHZhbHVlMS5XICo9IHNjYWxhcjtcclxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlMTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5EaXZpZGUgdHdvIHZlY3RvcnMuPC9zdW1tYXJ5PlxyXG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cInZhbHVlMVwiPlRoZSBmaXJzdCB2ZWN0b3IsIG9uIHRoZSBsZWZ0IHNpZGUuPC9wYXJhbT5cclxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJ2YWx1ZTJcIj5UaGUgZmlyc3QgdmVjdG9yLCBvbiB0aGUgcmlnaHQgc2lkZS48L3BhcmFtPlxyXG4gICAgICAgIC8vLyA8cmV0dXJucz5UaGUgZGV2aXNpb24gYmV0d2VlbiB0d28gdmVjdG9ycy48L3JldHVybnM+XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBWZWN0b3I0IG9wZXJhdG9yIC8oVmVjdG9yNCB2YWx1ZTEsIFZlY3RvcjQgdmFsdWUyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFsdWUxLlggLz0gdmFsdWUyLlg7XHJcbiAgICAgICAgICAgIHZhbHVlMS5ZIC89IHZhbHVlMi5ZO1xyXG4gICAgICAgICAgICB2YWx1ZTEuWiAvPSB2YWx1ZTIuWjtcclxuICAgICAgICAgICAgdmFsdWUxLlcgLz0gdmFsdWUyLlc7XHJcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTE7ICBcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5EaXZpZGUgYSB2ZWN0b3IgYnkgYSBzY2FsYXIuPC9zdW1tYXJ5PlxyXG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cInZhbHVlMVwiPlRoZSB2ZWN0b3IsIG9uIHRoZSBsZWZ0IHNpZGUuPC9wYXJhbT5cclxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJkaXZpZGVyXCI+VGhlIHZhbHVlIHRvIGRpdmlkZSBieS48L3BhcmFtPlxyXG4gICAgICAgIC8vLyA8cmV0dXJucz5UaGUgZGV2aXNpb24gdGhlIHZlY3RvciBhbmQgdGhlIHNjYWxhci48L3JldHVybnM+XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBWZWN0b3I0IG9wZXJhdG9yIC8oVmVjdG9yNCB2YWx1ZTEsIGZsb2F0IGRpdmlkZXIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YWx1ZTEuWCAvPSBkaXZpZGVyO1xyXG4gICAgICAgICAgICB2YWx1ZTEuWSAvPSBkaXZpZGVyO1xyXG4gICAgICAgICAgICB2YWx1ZTEuWiAvPSBkaXZpZGVyO1xyXG4gICAgICAgICAgICB2YWx1ZTEuVyAvPSBkaXZpZGVyO1xyXG4gICAgICAgICAgICByZXR1cm4gdmFsdWUxO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJ1c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uTGlucTtcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcbnVzaW5nIFN5c3RlbS5UaHJlYWRpbmcuVGFza3M7XHJcblxyXG5uYW1lc3BhY2UgSnVpY2VCb3hFbmdpbmUuUmVzb3VyY2VzXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBSZXNvdXJjZU1hbmFnZXJcclxuICAgIHtcclxuICAgICAgICBwcml2YXRlIERpY3Rpb25hcnk8c3RyaW5nLCBJUmVzb3VyY2U+IF9yZXNvdXJjZXM7XHJcblxyXG4gICAgICAgIHByaXZhdGUgRGljdGlvbmFyeTxzdHJpbmcsIFJlc291cmNlTG9hZGVyPiBfcmVzb3VyY2VNYW5hZ2VycztcclxuXHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgICAgIC8vLyBDb25zdHJ1Y3Rvci5cclxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgICAgIHB1YmxpYyBSZXNvdXJjZU1hbmFnZXIoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgX3Jlc291cmNlcyA9IG5ldyBEaWN0aW9uYXJ5PHN0cmluZywgSVJlc291cmNlPigpO1xyXG4gICAgICAgICAgICBfcmVzb3VyY2VNYW5hZ2VycyA9IG5ldyBEaWN0aW9uYXJ5PHN0cmluZywgUmVzb3VyY2VMb2FkZXI+KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8vIFJlZ2lzdGVyIGFuIHJlc291cmNlIG1hbmFnZXIuXHJcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cclxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJtYW5hZ2VyXCI+VGhlIHJlc291cmNlIG1hbmFnZXIgdG8gcmVnaXN0ZXIuPC9wYXJhbT5cclxuICAgICAgICBwdWJsaWMgdm9pZCBSZWdpc3RlclJlc291cmNlTWFuYWdlcihSZXNvdXJjZUxvYWRlciBtYW5hZ2VyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgX3Jlc291cmNlTWFuYWdlcnMuQWRkKG1hbmFnZXIuRXh0ZW5zaW9uLCBtYW5hZ2VyKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgVCBMb2FkPFQ+KHN0cmluZyBwYXRoKSB3aGVyZSBUIDogSVJlc291cmNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gKFQpTG9hZChwYXRoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cclxuICAgICAgICAvLy8gTG9hZCBhIHJlc291cmNlIHdpdGggYWxsIHJlZ2lzdGVyZWQgPHNlZSBjcmVmPVwiUmVzb3VyY2VMb2FkZXJcIi8+cy5cclxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cInBhdGhcIj5UaGUgcGF0aCB0byB0aGUgcmVzb3VyY2Ugd2l0aCBleHRlbnNpb24uPC9wYXJhbT5cclxuICAgICAgICAvLy8gPHJldHVybnM+TnVsbCBpdCBjb3VsZCBub3QgYmUgbG9hZGVkLCBvciB0aGUgbG9hZGVkIHJlc291cmNlLjwvcmV0dXJucz5cclxuICAgICAgICBwdWJsaWMgSVJlc291cmNlIExvYWQoc3RyaW5nIHBhdGgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAvLyBJZiB0aGUgcmVzb3VyY2UgZXhpc3RzLCBubyBuZWVkIHRvIGxvYWQgaXQgYWdhaW4uXHJcbiAgICAgICAgICAgIGlmIChfcmVzb3VyY2VzLkNvbnRhaW5zS2V5KHBhdGgpKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIF9yZXNvdXJjZXNbcGF0aF07XHJcblxyXG4gICAgICAgICAgICAvLyBUcnkgdG8gbG9hZCB0aGUgcmVzb3VyY2UuXHJcbiAgICAgICAgICAgIHRyeVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBzdHJpbmcgZXh0ZW5zaW9uID0gcGF0aC5TcGxpdCgnLicpWzFdO1xyXG4gICAgICAgICAgICAgICAgSVJlc291cmNlIHJlc291cmNlID0gX3Jlc291cmNlTWFuYWdlcnNbZXh0ZW5zaW9uXS5Mb2FkKHBhdGgpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChyZXNvdXJjZSA9PSBudWxsKVxyXG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFeGNlcHRpb24oXCJGaWxlIFwiICsgcGF0aCArIFwibm90IGZvdW5kIVwiKTtcclxuXHJcbiAgICAgICAgICAgICAgICBfcmVzb3VyY2VzLkFkZChwYXRoLCByZXNvdXJjZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc291cmNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhdGNoXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIENvbnNvbGUuV3JpdGVMaW5lKFwiVW5hYmxlIHRvIGxvYWQgXCIgKyBwYXRoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIEp1aWNlQm94RW5naW5lLkdyYXBoaWNzO1xyXG51c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uTGlucTtcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcbnVzaW5nIFN5c3RlbS5UaHJlYWRpbmcuVGFza3M7XHJcblxyXG5uYW1lc3BhY2UgSnVpY2VCb3hFbmdpbmUuU2NlbmVcclxue1xyXG4gICAgcHVibGljIGNsYXNzIEdhbWVPYmplY3RcclxuICAgIHtcclxuICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8vIFRoZSBuYW1lIG9mIHRoZSBnYW1lIG9iamVjdC5cclxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgICAgIHB1YmxpYyBzdHJpbmcgTmFtZSB7IGdldDsgc2V0OyB9XHJcblxyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cclxuICAgICAgICAvLy8gRGlzYWJsZWQgZ2FtZSBvYmplY3RzIHdvbid0IHJlY2VpdmUgYW55IHVwZGF0ZXMuIFRoZXkgd29uJ3QgdXBkYXRlIHRoZWlyIGNvbXBvbmVudHMuXHJcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cclxuICAgICAgICBwdWJsaWMgYm9vbCBFbmFibGVkIHsgZ2V0OyBzZXQ7IH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBMaXN0PElDb21wb25lbnQ+IF9jb21wb25lbnRzO1xyXG4gICAgICAgIHByaXZhdGUgTGlzdDxHcmFwaGljc0NvbXBvbmVudD4gX2dyYXBoaWNzQ29tcG9uZW50cztcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBTY2VuZSBfY3VycmVudFNjZW5lO1xyXG5cclxuICAgICAgICBwdWJsaWMgVHJhbnNmb3JtIFRyYW5zZm9ybSB7IGdldDsgcHJpdmF0ZSBzZXQ7IH1cclxuXHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgICAgIC8vLyBDb25zdHJ1Y3Rvci5cclxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cInBhcmVudFwiPlRoZSBzY2VuZSB0aGlzIG9iamVjdCBpcyBpbi48L3BhcmFtPlxyXG4gICAgICAgIHB1YmxpYyBHYW1lT2JqZWN0KFNjZW5lIHBhcmVudClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIF9jdXJyZW50U2NlbmUgPSBwYXJlbnQ7XHJcbiAgICAgICAgICAgIE5hbWUgPSBcIkdhbWVvYmplY3RcIjtcclxuICAgICAgICAgICAgX2NvbXBvbmVudHMgPSBuZXcgTGlzdDxJQ29tcG9uZW50PigpO1xyXG4gICAgICAgICAgICBfZ3JhcGhpY3NDb21wb25lbnRzID0gbmV3IExpc3Q8R3JhcGhpY3NDb21wb25lbnQ+KCk7XHJcbiAgICAgICAgICAgIFRyYW5zZm9ybSA9IEFkZENvbXBvbmVudDxUcmFuc2Zvcm0+KCk7XHJcbiAgICAgICAgICAgIEVuYWJsZWQgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgICAgIC8vLyBDb25zdHJ1Y3Rvci5cclxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cInBhcmVudFwiPlRoZSBzY2VuZSB0aGlzIG9iamVjdCBpcyBpbi48L3BhcmFtPlxyXG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cIm5hbWVcIj5UaGUgbmFtZSBvZiB0aGUgZ2FtZSBvYmplY3QuPC9wYXJhbT5cclxuICAgICAgICBwdWJsaWMgR2FtZU9iamVjdChTY2VuZSBwYXJlbnQsIHN0cmluZyBuYW1lKSBcclxuICAgICAgICAgICAgOiB0aGlzKHBhcmVudClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIE5hbWUgPSBuYW1lO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgICAgIC8vLyBDYWxsZWQgZXZlcnkgZnJhbWUuXHJcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cclxuICAgICAgICBwdWJsaWMgdm9pZCBVcGRhdGUoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZm9yIChpbnQgaSA9IDA7IGkgPCBfY29tcG9uZW50cy5Db3VudDsgKytpKVxyXG4gICAgICAgICAgICAgICAgaWYoX2NvbXBvbmVudHNbaV0uRW5hYmxlZClcclxuICAgICAgICAgICAgICAgICAgICBfY29tcG9uZW50c1tpXS5VcGRhdGUoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cclxuICAgICAgICAvLy8gQ2FsbGVkIGV2ZXJ5IGZyYW1lIGZvciByZW5kZXJpbmcuXHJcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cclxuICAgICAgICBwdWJsaWMgdm9pZCBSZW5kZXIoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZm9yIChpbnQgaSA9IDA7IGkgPCBfZ3JhcGhpY3NDb21wb25lbnRzLkNvdW50OyArK2kpXHJcbiAgICAgICAgICAgICAgICBpZihfZ3JhcGhpY3NDb21wb25lbnRzW2ldLkVuYWJsZWQpXHJcbiAgICAgICAgICAgICAgICAgICAgX2dyYXBoaWNzQ29tcG9uZW50c1tpXS5SZW5kZXIoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5BZGRzIGNvbXBvbmVudCBUIHRvIHRoZSBnYW1lb2JqZWN0Ljwvc3VtbWFyeT5cclxuICAgICAgICAvLy8gPHR5cGVwYXJhbSBuYW1lPVwiVFwiPlRoZSB0eXBlIHRvIGFkZCwgbXVzdCBiZSBhIElDb21wb25lbnQuPC90eXBlcGFyYW0+XHJcbiAgICAgICAgLy8vIDxyZXR1cm5zPlRoZSBuZXdseSBjcmVhdGVkIGNvbXBvbmVudC4gTnVsbCBpZiB0aGUgb2JqZWN0IGNvdWxkIG5vdCBiZSBhZGRlZC48L3JldHVybnM+XHJcbiAgICAgICAgcHVibGljIFQgQWRkQ29tcG9uZW50PFQ+KCkgXHJcbiAgICAgICAgICAgIHdoZXJlIFQgOiBJQ29tcG9uZW50LCBuZXcoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgVCB2YWwgPSBHZXRDb21wb25lbnQ8VD4oKTtcclxuICAgICAgICAgICAgaWYgKHZhbCA9PSBudWxsIHx8ICF2YWwuVW5pcXVlKCkpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFQgbmV3Q29tcCA9IG5ldyBUKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgX2NvbXBvbmVudHMuQWRkKG5ld0NvbXApO1xyXG4gICAgICAgICAgICAgICAgbmV3Q29tcC5QYXJlbnQgPSB0aGlzO1xyXG4gICAgICAgICAgICAgICAgbmV3Q29tcC5FbmFibGVkID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBLZWVwIHRyYWNrIG9mIGdyYXBoaWNzY29tcG9uZW50cy5cclxuICAgICAgICAgICAgICAgIGlmIChuZXdDb21wIGlzIEdyYXBoaWNzQ29tcG9uZW50KVxyXG4gICAgICAgICAgICAgICAgICAgIF9ncmFwaGljc0NvbXBvbmVudHMuQWRkKG5ld0NvbXAgYXMgR3JhcGhpY3NDb21wb25lbnQpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIFJlZ2lzdGVyIGNhbWVyYSB0byB0aGUgc2NlbmUuXHJcbiAgICAgICAgICAgICAgICBpZiAobmV3Q29tcCBpcyBDYW1lcmEpXHJcbiAgICAgICAgICAgICAgICAgICAgX2N1cnJlbnRTY2VuZS5BZGRDYW1lcmEobmV3Q29tcCBhcyBDYW1lcmEpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChuZXdDb21wIGlzIENvbGxpZGVyKVxyXG4gICAgICAgICAgICAgICAgICAgIChuZXdDb21wIGFzIENvbGxpZGVyKS5TZXRXb3JsZChfY3VycmVudFNjZW5lLkdldFdvcmxkKCkpO1xyXG5cclxuICAgICAgICAgICAgICAgIG5ld0NvbXAuSW5pdGlhbGl6ZShfY3VycmVudFNjZW5lLlJlc291cmNlTWFuYWdlcik7XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ld0NvbXA7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBkZWZhdWx0KFQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PkdldHMgdGhlIGNvbXBvbmVudCBmcm9tIGEgZ2FtZSBvYmplY3QuPC9zdW1tYXJ5PlxyXG4gICAgICAgIC8vLyA8dHlwZXBhcmFtIG5hbWU9XCJUXCI+VGhlIGNvbXBvbmVudCB0eXBlIHRvIGdldC48L3R5cGVwYXJhbT5cclxuICAgICAgICAvLy8gPHJldHVybnM+VGhlIGNvbXBvbmVudCwgb3IgbnVsbCBpZiBub3QgZm91bmQuPC9yZXR1cm5zPlxyXG4gICAgICAgIHB1YmxpYyBUIEdldENvbXBvbmVudDxUPigpIHdoZXJlIFQ6IElDb21wb25lbnQsIG5ldygpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBUIHJldHZhbCA9IChUKVN5c3RlbS5MaW5xLkVudW1lcmFibGUuV2hlcmU8Z2xvYmFsOjpKdWljZUJveEVuZ2luZS5TY2VuZS5JQ29tcG9uZW50PihfY29tcG9uZW50cywoZ2xvYmFsOjpTeXN0ZW0uRnVuYzxnbG9iYWw6Okp1aWNlQm94RW5naW5lLlNjZW5lLklDb21wb25lbnQsIGJvb2w+KSh4ID0+IHggaXMgVCkpLkZpcnN0T3JEZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIHJldHVybiByZXR2YWw7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIEp1aWNlQm94RW5naW5lLkdyYXBoaWNzO1xyXG51c2luZyBKdWljZUJveEVuZ2luZS5NYXRoO1xyXG51c2luZyBKdWljZUJveEVuZ2luZS5SZXNvdXJjZXM7XHJcbnVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5MaW5xO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxudXNpbmcgU3lzdGVtLlRocmVhZGluZy5UYXNrcztcclxudXNpbmcgSHVtcGVyO1xyXG51c2luZyBKdWljZUJveEVuZ2luZS5HcmFwaGljcy5HVUk7XHJcblxyXG5uYW1lc3BhY2UgSnVpY2VCb3hFbmdpbmUuU2NlbmVcclxue1xyXG4gICAgcHVibGljIGNsYXNzIFNjZW5lXHJcbiAgICB7XHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PkFsbCBHYW1lb2JqZWN0cyBvZiB0aGlzIHNjZW5lIGFyZSBzdG9yZWQgaGVyZS48L3N1bW1hcnk+XHJcbiAgICAgICAgcHJpdmF0ZSBMaXN0PEdhbWVPYmplY3Q+IF9vYmplY3RzO1xyXG5cclxuICAgICAgICAvLy8gPHN1bW1hcnk+QWxsIGNhbWVyYSBjb21wb25lbnRzIG9mIHRoZSBzY2VuZSBhcmUgY2FjaGVkIGhlcmUuPC9zdW1tYXJ5PlxyXG4gICAgICAgIHByaXZhdGUgTGlzdDxDYW1lcmE+IF9jYW1lcmFzO1xyXG5cclxuICAgICAgICBwdWJsaWMgQ2FtZXJhIERlZmF1bHRDYW1lcmE7XHJcblxyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cclxuICAgICAgICAvLy8gVGhlIHJlc291cmNlIG1hbmFnZXIgZm9yIHRoaXMgc2NlbmUuXHJcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cclxuICAgICAgICBwdWJsaWMgUmVzb3VyY2VNYW5hZ2VyIFJlc291cmNlTWFuYWdlciB7IGdldDsgcHJpdmF0ZSBzZXQ7IH1cclxuXHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgICAgIC8vLyBUaGUgZmFkZSB0ZXh0dXJlIGZvciB0aGUgc2NlbmUuIElzIGEgZ3JheXNjYWxlIHRleHR1cmUuXHJcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cclxuICAgICAgICBpbnRlcm5hbCBUZXh0dXJlMkQgRmFkZVRleHR1cmUgeyBnZXQ7IHNldDsgfVxyXG5cclxuICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8vIEFtb3VudCB0aGUgc2NyZWVuIGZhZGUgaXMgcHJlc2VudC4gKDAuMCBpcyBub3QsIDEuMCBpcyBmdWxseSBibGFjaylcclxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgICAgIGludGVybmFsIGZsb2F0IEZhZGVBbW91bnQgeyBnZXQ7IHNldDsgfVxyXG5cclxuICAgICAgICBwcml2YXRlIFdvcmxkIF93b3JsZDtcclxuXHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PiBEZWZhdWx0IGNvbnN0cnVjdG9yLjwvc3VtbWFyeT5cclxuICAgICAgICBwdWJsaWMgU2NlbmUoUmVzb3VyY2VNYW5hZ2VyIG1hbmFnZXIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBfb2JqZWN0cyA9IG5ldyBMaXN0PEdhbWVPYmplY3Q+KCk7XHJcbiAgICAgICAgICAgIF9jYW1lcmFzID0gbmV3IExpc3Q8Q2FtZXJhPigpO1xyXG5cclxuICAgICAgICAgICAgUmVzb3VyY2VNYW5hZ2VyID0gbWFuYWdlcjtcclxuXHJcbiAgICAgICAgICAgIF93b3JsZCA9IG5ldyBXb3JsZCg1MTIuMGYsIDUxMi4wZiwgMTYuMGYpO1xyXG5cclxuICAgICAgICAgICAgLy8gR2V0IHRoZSBwaXhlbCBzaXplIHN0b3JlZCBpbiB0aGUgY29uZmlnLlxyXG4gICAgICAgICAgICBpbnQgcGl4ZWxTaXplID0gVXRpbC5Db25maWcuSW5zdGFuY2UuQ29uZmlnVmFsdWVzLlBpeGVsU2l6ZTtcclxuXHJcbiAgICAgICAgICAgIC8vIERlZmF1bHQgc2NlbmUgc3R1ZmZzLlxyXG4gICAgICAgICAgICBHYW1lT2JqZWN0IGNhbWVyYU9iaiA9IEFkZEdhbWVPYmplY3QoXCJDYW1lcmFcIik7XHJcbiAgICAgICAgICAgIERlZmF1bHRDYW1lcmEgPSBjYW1lcmFPYmouQWRkQ29tcG9uZW50PENhbWVyYT4oKTtcclxuICAgICAgICAgICAgRGVmYXVsdENhbWVyYS5UYXJnZXQgPSBuZXcgUmVuZGVyVGFyZ2V0KEdyYXBoaWNzTWFuYWdlci5JbnN0YW5jZS5XaWR0aCAvIHBpeGVsU2l6ZSwgR3JhcGhpY3NNYW5hZ2VyLkluc3RhbmNlLkhlaWdodCAvIHBpeGVsU2l6ZSk7XHJcbiAgICAgICAgICAgIERlZmF1bHRDYW1lcmEuUGl4ZWxTaXplID0gcGl4ZWxTaXplO1xyXG4gICAgICAgICAgICBEZWZhdWx0Q2FtZXJhLkNsZWFyQ29sb3IgPSBuZXcgQ29sb3IzMigwLjFmLCAwLjFmLCAwLjFmLCAxLjBmKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cclxuICAgICAgICAvLy8gQWRkIGFuIGVtcHR5IGdhbWVvYmplY3QgdG8gdGhlIHNjZW5lLlxyXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgLy8vIDxyZXR1cm5zPlRoZSBjcmVhdGVkIGdhbWVvYmplY3QuPC9yZXR1cm5zPlxyXG4gICAgICAgIHB1YmxpYyBHYW1lT2JqZWN0IEFkZEdhbWVPYmplY3QoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIEFkZEdhbWVPYmplY3QoXCJHYW1lb2JqZWN0XCIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgICAgIC8vLyBBZGQgYW4gZW1wdHkgZ2FtZW9iamVjdCB0byB0aGUgc2NlbmUuXHJcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cclxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJuYW1lXCI+TmFtZSBvZiB0aGUgb2JqZWN0LjwvcGFyYW0+XHJcbiAgICAgICAgLy8vIDxyZXR1cm5zPlRoZSBjcmVhdGVkIGdhbWVvYmplY3QuPC9yZXR1cm5zPlxyXG4gICAgICAgIHB1YmxpYyBHYW1lT2JqZWN0IEFkZEdhbWVPYmplY3Qoc3RyaW5nIG5hbWUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBHYW1lT2JqZWN0IG9iaiA9IG5ldyBHYW1lT2JqZWN0KHRoaXMsIG5hbWUpO1xyXG4gICAgICAgICAgICBfb2JqZWN0cy5BZGQob2JqKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBvYmo7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8vIEdldCBhbiBvYmplY3QgYnkgbmFtZS5cclxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cIm5hbWVcIj5UaGUgbmFtZSBvZiB0aGUgb2JqZWN0LjwvcGFyYW0+XHJcbiAgICAgICAgLy8vIDxyZXR1cm5zPlRoZSBvYmplY3Qgd2l0aCB0aGUgZ2l2ZW4gbmFtZSwgbnVsbCBpZiBubyBvYmplY3Qgd2FzIGZvdW5kLjwvcmV0dXJucz5cclxuICAgICAgICBwdWJsaWMgR2FtZU9iamVjdCBHZXRPYmplY3RCeU5hbWUoc3RyaW5nIG5hbWUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gU3lzdGVtLkxpbnEuRW51bWVyYWJsZS5XaGVyZTxnbG9iYWw6Okp1aWNlQm94RW5naW5lLlNjZW5lLkdhbWVPYmplY3Q+KF9vYmplY3RzLChnbG9iYWw6OlN5c3RlbS5GdW5jPGdsb2JhbDo6SnVpY2VCb3hFbmdpbmUuU2NlbmUuR2FtZU9iamVjdCwgYm9vbD4pKHggPT4geC5OYW1lLkVxdWFscyhuYW1lKSkpLkZpcnN0T3JEZWZhdWx0KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8vIEdldCB0aGUgcGh5c2ljcyBzaW11bGF0aW9uIHdvcmxkLlxyXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgLy8vIDxyZXR1cm5zPjwvcmV0dXJucz5cclxuICAgICAgICBpbnRlcm5hbCBXb3JsZCBHZXRXb3JsZCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gX3dvcmxkO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgICAgIC8vLyBSZWdpc3RlciBhIGNhbWVyYSB0byB0aGUgc2NlbmUuICh0aGlzIGlzIGRvbmUgYXV0b21hdGljbHkgYnkgR2FtZU9iamVjdCkuXHJcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cclxuICAgICAgICBpbnRlcm5hbCB2b2lkIEFkZENhbWVyYShDYW1lcmEgY2FtKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgX2NhbWVyYXMuQWRkKGNhbSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8vIENhbGxlZCBvbiB0aGUgc3RhcnQgb2YgdGhlIHNjZW5lLlxyXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgcHVibGljIHZpcnR1YWwgdm9pZCBTdGFydCgpXHJcbiAgICAgICAge1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5VcGRhdGUgdGhlIHNjZW5lLCBhbmQgYWxsIG9mIGl0cyBnYW1lb2JqZWN0cy48L3N1bW1hcnk+XHJcbiAgICAgICAgcHVibGljIHZpcnR1YWwgdm9pZCBVcGRhdGUoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZm9yIChpbnQgaSA9IDA7IGkgPCBfb2JqZWN0cy5Db3VudDsgKytpKVxyXG4gICAgICAgICAgICAgICAgaWYoX29iamVjdHNbaV0uRW5hYmxlZClcclxuICAgICAgICAgICAgICAgICAgICBfb2JqZWN0c1tpXS5VcGRhdGUoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5SZW5kZXIgdGhlIHNjZW5lLjwvc3VtbWFyeT5cclxuICAgICAgICBwdWJsaWMgdm9pZCBSZW5kZXIoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy8gUmVuZGVyIGVhY2ggY2FtZXJhLlxyXG4gICAgICAgICAgICBmb3JlYWNoIChDYW1lcmEgY2FtIGluIF9jYW1lcmFzKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIWNhbS5FbmFibGVkKVxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG5cclxuICAgICAgICAgICAgICAgIEdyYXBoaWNzTWFuYWdlci5JbnN0YW5jZS5Db250ZXh0LlNldFJlbmRlclRhcmdldChjYW0uVGFyZ2V0KTtcclxuICAgICAgICAgICAgICAgIEdyYXBoaWNzTWFuYWdlci5JbnN0YW5jZS5Db250ZXh0LkNsZWFyKGNhbS5DbGVhckNvbG9yKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBTZXQgY2FtcmVhIG1hdHJpeGVzLlxyXG4gICAgICAgICAgICAgICAgR3JhcGhpY3NNYW5hZ2VyLkluc3RhbmNlLkNvbnRleHQuU2V0R2xvYmFsU2hhZGVyVmFsdWUoRGVmYXVsdFNoYWRlclZhbHVlcy5WSUVXLCBjYW0uVmlld01hdHJpeCk7XHJcbiAgICAgICAgICAgICAgICBHcmFwaGljc01hbmFnZXIuSW5zdGFuY2UuQ29udGV4dC5TZXRHbG9iYWxTaGFkZXJWYWx1ZShEZWZhdWx0U2hhZGVyVmFsdWVzLlBST0osIGNhbS5Qcm9qTWF0cml4KTtcclxuICAgICAgICAgICAgICAgIFRyYW5zZm9ybSB0cmFuc2Zvcm0gPSBjYW0uUGFyZW50LkdldENvbXBvbmVudDxUcmFuc2Zvcm0+KCk7XHJcbiAgICAgICAgICAgICAgICBHcmFwaGljc01hbmFnZXIuSW5zdGFuY2UuQ29udGV4dC5TZXRHbG9iYWxTaGFkZXJWYWx1ZShEZWZhdWx0U2hhZGVyVmFsdWVzLkNBTUVSQVBPU0lUSU9OLCBuZXcgVmVjdG9yMyhNYXRoLk1hdGguUm91bmQodHJhbnNmb3JtLlBvc2l0aW9uLlgpLCBNYXRoLk1hdGguUm91bmQodHJhbnNmb3JtLlBvc2l0aW9uLlkpLCAoaW50KXRyYW5zZm9ybS5Qb3NpdGlvbi5aKSk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gR28gdGhyb3VnaCBhbGwgb2JqZWN0cy5cclxuICAgICAgICAgICAgICAgIGZvciAoaW50IGkgPSAwOyBpIDwgX29iamVjdHMuQ291bnQ7ICsraSlcclxuICAgICAgICAgICAgICAgICAgICBpZihfb2JqZWN0c1tpXS5FbmFibGVkKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBfb2JqZWN0c1tpXS5SZW5kZXIoKTtcclxuXHJcbiAgICAgICAgICAgICAgICBHcmFwaGljcy5EZWJ1Z2dpbmcuRGVidWdSZW5kZXJlci5JbnN0YW5jZS5SZW5kZXIoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgR3JhcGhpY3NNYW5hZ2VyLkluc3RhbmNlLkNvbnRleHQuU2V0UmVuZGVyVGFyZ2V0KG51bGwpO1xyXG5cclxuICAgICAgICAgICAgLy8gUmVuZGVyIGVhY2ggY2FtZXJhIHRvIHRoZSBiYWNrYnVmZmVyLlxyXG4gICAgICAgICAgICBmb3JlYWNoIChDYW1lcmEgY2FtIGluIF9jYW1lcmFzKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBjYW0uUG9zdFByb2Nlc3MoKTtcclxuICAgICAgICAgICAgICAgIEdyYXBoaWNzTWFuYWdlci5JbnN0YW5jZS5SZW5kZXJDYW1lcmEoY2FtLCB0aGlzKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gUmVuZGVyIFVJLlxyXG4gICAgICAgICAgICAvL21hbmFnZXIuU3RhcnRVSSgpO1xyXG4gICAgICAgICAgICAvL21hbmFnZXIuR1VJUmVuZGVyKHRleHQpO1xyXG4gICAgICAgICAgICAvL21hbmFnZXIuRW5kVUkoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwidXNpbmcgQnJpZGdlLkh0bWw1O1xyXG51c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uTGlucTtcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcbnVzaW5nIFN5c3RlbS5UaHJlYWRpbmcuVGFza3M7XHJcblxyXG5uYW1lc3BhY2UgSnVpY2VCb3hFbmdpbmUuVXRpbFxyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgQ29uZmlnXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBDb25maWcgX2NvbmZpZztcclxuICAgICAgICBwdWJsaWMgc3RhdGljIENvbmZpZyBJbnN0YW5jZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZ2V0XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmIChfY29uZmlnID09IG51bGwpXHJcbiAgICAgICAgICAgICAgICAgICAgX2NvbmZpZyA9IG5ldyBDb25maWcoKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBfY29uZmlnO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgQ29uZmlnTW9kZWwgQ29uZmlnVmFsdWVzIHsgZ2V0OyBwcml2YXRlIHNldDsgfVxyXG5cclxuICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8vIFByaXZhdGUgY29uc3RydWN0b3IuXHJcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cclxuICAgICAgICBwcml2YXRlIENvbmZpZygpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBDb25maWdWYWx1ZXMgPSBKU09OLlBhcnNlPENvbmZpZ01vZGVsPihTeXN0ZW0uSU8uRmlsZS5SZWFkQWxsVGV4dChcImNvbmZpZy50eHRcIikpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJ1c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uTGlucTtcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcbnVzaW5nIFN5c3RlbS5UaHJlYWRpbmcuVGFza3M7XHJcblxyXG5uYW1lc3BhY2UgSnVpY2VCb3hFbmdpbmUuVXRpbFxyXG57XHJcbiAgICBwdWJsaWMgc3RhdGljIGNsYXNzIFRpbWVcclxuICAgIHtcclxuICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8vIFRvdGFsIGFtb3VudCBvZiBzZWNvbmRzIGdvbmUgYnkgc2luY2Ugc3RhcnR1cC5cclxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgZmxvYXQgVG90YWxTZWNvbmRzIHsgZ2V0OyBwcml2YXRlIHNldDsgfVxyXG5cclxuICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8vIFRpbWUgb2YgdGhlIHByZXZpb3VzIGZyYW1lLlxyXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBmbG9hdCBEZWx0YVRpbWUgeyBnZXQ7IHByaXZhdGUgc2V0OyB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgZmxvYXQgRGVsdGFUaW1lUmVhbFRpbWUgeyBnZXQ7IHByaXZhdGUgc2V0OyB9XHJcblxyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cclxuICAgICAgICAvLy8gVGhlIGN1cnJlbnQgcmF0ZSBvZiB0aW1lLlxyXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBmbG9hdCBUaW1lU2NhbGUgeyBnZXQ7IHNldDsgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBEYXRlVGltZSBfcHJldmlvdXMgPSBEYXRlVGltZS5Ob3c7XHJcblxyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cclxuICAgICAgICAvLy8gVXBkYXRlIHRoZSB0aW1lLlxyXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyB2b2lkIFVwZGF0ZSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAoX3ByZXZpb3VzID09IG51bGwpXHJcbiAgICAgICAgICAgICAgICBfcHJldmlvdXMgPSBEYXRlVGltZS5Ob3c7XHJcblxyXG4gICAgICAgICAgICBEYXRlVGltZSBub3cgPSBEYXRlVGltZS5Ob3c7XHJcblxyXG4gICAgICAgICAgICBUaW1lU3BhbiBzcGFuID0gbm93IC0gX3ByZXZpb3VzO1xyXG5cclxuICAgICAgICAgICAgVG90YWxTZWNvbmRzICs9IChmbG9hdClzcGFuLlRvdGFsU2Vjb25kcztcclxuICAgICAgICAgICAgRGVsdGFUaW1lID0gKGZsb2F0KXNwYW4uVG90YWxTZWNvbmRzICogVGltZVNjYWxlO1xyXG4gICAgICAgICAgICBEZWx0YVRpbWVSZWFsVGltZSA9IChmbG9hdClzcGFuLlRvdGFsU2Vjb25kcztcclxuXHJcbiAgICAgICAgICAgIF9wcmV2aW91cyA9IG5vdztcclxuICAgICAgICB9XHJcblxuICAgIFxucHJpdmF0ZSBzdGF0aWMgZmxvYXQgX19Qcm9wZXJ0eV9fSW5pdGlhbGl6ZXJfX1RpbWVTY2FsZT0xO31cclxufVxyXG4iLCJuYW1lc3BhY2UgSHVtcGVyXHJcbntcclxuXHR1c2luZyBTeXN0ZW07XHJcblx0dXNpbmcgU3lzdGVtLkxpbnE7XHJcblx0dXNpbmcgQmFzZTtcclxuXHR1c2luZyBSZXNwb25zZXM7XHJcblxyXG5cdHB1YmxpYyBjbGFzcyBCb3ggOiBJQm94XHJcblx0e1xyXG5cdFx0I3JlZ2lvbiBDb25zdHJ1Y3RvcnMgXHJcblxyXG5cdFx0cHVibGljIEJveChXb3JsZCB3b3JsZCwgZmxvYXQgeCwgZmxvYXQgeSwgZmxvYXQgd2lkdGgsIGZsb2F0IGhlaWdodClcclxuXHRcdHtcclxuXHRcdFx0dGhpcy53b3JsZCA9IHdvcmxkO1xyXG5cdFx0XHR0aGlzLmJvdW5kcyA9IG5ldyBSZWN0YW5nbGVGKHgsIHksIHdpZHRoLCBoZWlnaHQpO1xyXG5cdFx0fVxyXG5cclxuXHRcdCNlbmRyZWdpb25cclxuXHJcblx0XHQjcmVnaW9uIEZpZWxkc1xyXG5cclxuXHRcdHByaXZhdGUgV29ybGQgd29ybGQ7XHJcblxyXG5cdFx0cHJpdmF0ZSBSZWN0YW5nbGVGIGJvdW5kcztcclxuXHJcblx0XHQjZW5kcmVnaW9uXHJcblxyXG5cdFx0I3JlZ2lvbiBQcm9wZXJ0aWVzXHJcblxyXG5cdFx0cHVibGljIFJlY3RhbmdsZUYgQm91bmRzXHJcblx0XHR7XHJcblx0XHRcdGdldCB7IHJldHVybiBib3VuZHM7IH0gXHJcblx0XHR9XHJcblxyXG5cdFx0cHVibGljIG9iamVjdCBEYXRhIHsgZ2V0OyBzZXQ7IH1cclxuXHJcblx0XHRwdWJsaWMgZmxvYXQgSGVpZ2h0IHtnZXR7cmV0dXJuIEJvdW5kcy5IZWlnaHQ7fX1cclxuXHJcblx0XHRwdWJsaWMgZmxvYXQgV2lkdGgge2dldHtyZXR1cm4gQm91bmRzLldpZHRoO319XHJcblxyXG5cdFx0cHVibGljIGZsb2F0IFgge2dldHtyZXR1cm4gQm91bmRzLlg7fX1cclxuXHJcblx0XHRwdWJsaWMgZmxvYXQgWSB7Z2V0e3JldHVybiBCb3VuZHMuWTt9fVxyXG5cclxuXHRcdCNlbmRyZWdpb25cclxuXHJcblx0XHQjcmVnaW9uIE1vdmVtZW50c1xyXG5cclxuXHRcdHB1YmxpYyBJTW92ZW1lbnQgU2ltdWxhdGUoZmxvYXQgeCwgZmxvYXQgeSwgRnVuYzxJQ29sbGlzaW9uLCBJQ29sbGlzaW9uUmVzcG9uc2U+IGZpbHRlcilcclxuXHRcdHtcclxuXHRcdFx0cmV0dXJuIHdvcmxkLlNpbXVsYXRlKHRoaXMsIHgsIHksIChnbG9iYWw6OlN5c3RlbS5GdW5jPGdsb2JhbDo6SHVtcGVyLklDb2xsaXNpb24sIGdsb2JhbDo6SHVtcGVyLlJlc3BvbnNlcy5JQ29sbGlzaW9uUmVzcG9uc2U+KWZpbHRlcik7XHJcblx0XHR9XHJcblxyXG5cdFx0cHVibGljIElNb3ZlbWVudCBTaW11bGF0ZShmbG9hdCB4LCBmbG9hdCB5LCBGdW5jPElDb2xsaXNpb24sIENvbGxpc2lvblJlc3BvbnNlcz4gZmlsdGVyKVxyXG5cdFx0e1xyXG5cdFx0XHRyZXR1cm4gTW92ZSh4LCB5LCAoZ2xvYmFsOjpTeXN0ZW0uRnVuYzxnbG9iYWw6Okh1bXBlci5JQ29sbGlzaW9uLCBnbG9iYWw6Okh1bXBlci5SZXNwb25zZXMuSUNvbGxpc2lvblJlc3BvbnNlPikoKGNvbCkgPT5cclxuXHRcdFx0ICB7XHJcblx0XHRcdFx0aWYgKGNvbC5IaXQgPT0gbnVsbClcclxuXHRcdFx0XHRcdCAgcmV0dXJuIG51bGw7XHJcblxyXG5cdFx0XHRcdCAgcmV0dXJuIENvbGxpc2lvblJlc3BvbnNlLkNyZWF0ZShjb2wsIGZpbHRlcihjb2wpKTtcclxuXHRcdFx0ICB9KSk7XHJcblx0XHR9XHJcblxyXG5cdFx0cHVibGljIElNb3ZlbWVudCBNb3ZlKGZsb2F0IHgsIGZsb2F0IHksIEZ1bmM8SUNvbGxpc2lvbiwgSUNvbGxpc2lvblJlc3BvbnNlPiBmaWx0ZXIpXHJcblx0XHR7XHJcblx0XHRcdHZhciBtb3ZlbWVudCA9IHRoaXMuU2ltdWxhdGUoeCwgeSwgKGdsb2JhbDo6U3lzdGVtLkZ1bmM8Z2xvYmFsOjpIdW1wZXIuSUNvbGxpc2lvbiwgZ2xvYmFsOjpIdW1wZXIuUmVzcG9uc2VzLklDb2xsaXNpb25SZXNwb25zZT4pZmlsdGVyKTtcclxuXHRcdFx0dGhpcy5ib3VuZHMuWCA9IG1vdmVtZW50LkRlc3RpbmF0aW9uLlg7XHJcblx0XHRcdHRoaXMuYm91bmRzLlkgPSBtb3ZlbWVudC5EZXN0aW5hdGlvbi5ZO1xyXG5cdFx0XHR0aGlzLndvcmxkLlVwZGF0ZSh0aGlzLCBtb3ZlbWVudC5PcmlnaW4pO1xyXG5cdFx0XHRyZXR1cm4gbW92ZW1lbnQ7XHJcblx0XHR9XHJcblxyXG5cdFx0cHVibGljIElNb3ZlbWVudCBNb3ZlKGZsb2F0IHgsIGZsb2F0IHksIEZ1bmM8SUNvbGxpc2lvbiwgQ29sbGlzaW9uUmVzcG9uc2VzPiBmaWx0ZXIpXHJcblx0XHR7XHJcblx0XHRcdHZhciBtb3ZlbWVudCA9IHRoaXMuU2ltdWxhdGUoeCwgeSwgKGdsb2JhbDo6U3lzdGVtLkZ1bmM8Z2xvYmFsOjpIdW1wZXIuSUNvbGxpc2lvbiwgZ2xvYmFsOjpIdW1wZXIuUmVzcG9uc2VzLkNvbGxpc2lvblJlc3BvbnNlcz4pZmlsdGVyKTtcclxuXHRcdFx0dGhpcy5ib3VuZHMuWCA9IG1vdmVtZW50LkRlc3RpbmF0aW9uLlg7XHJcblx0XHRcdHRoaXMuYm91bmRzLlkgPSBtb3ZlbWVudC5EZXN0aW5hdGlvbi5ZO1xyXG5cdFx0XHR0aGlzLndvcmxkLlVwZGF0ZSh0aGlzLCBtb3ZlbWVudC5PcmlnaW4pO1xyXG5cdFx0XHRyZXR1cm4gbW92ZW1lbnQ7XHJcblx0XHR9XHJcblxyXG5cdFx0I2VuZHJlZ2lvblxyXG5cdH1cclxufVxyXG5cclxuIiwidXNpbmcgSHVtcGVyLkJhc2U7XHJcblxyXG5uYW1lc3BhY2UgSHVtcGVyXHJcbntcclxuXHRwdWJsaWMgY2xhc3MgQ29sbGlzaW9uIDogSUNvbGxpc2lvblxyXG5cdHtcclxuXHRcdHB1YmxpYyBDb2xsaXNpb24oKVxyXG5cdFx0e1xyXG5cdFx0fVxyXG5cclxuXHRcdHB1YmxpYyBJQm94IEJveCB7IGdldDsgc2V0OyB9XHJcblxyXG5cdFx0cHVibGljIElCb3ggT3RoZXIgeyBnZXQgeyByZXR1cm4gZ2xvYmFsOjpCcmlkZ2UuU2NyaXB0LlRvVGVtcChcImtleTFcIix0aGlzLkhpdCkhPW51bGw/Z2xvYmFsOjpCcmlkZ2UuU2NyaXB0LkZyb21UZW1wPElIaXQ+KFwia2V5MVwiKS5Cb3g6KElCb3gpbnVsbDsgfSB9XHJcblxyXG5cdFx0cHVibGljIFJlY3RhbmdsZUYgT3JpZ2luIHsgZ2V0OyBzZXQ7IH1cclxuXHJcblx0XHRwdWJsaWMgUmVjdGFuZ2xlRiBHb2FsIHsgZ2V0OyBzZXQ7IH1cclxuXHJcblx0XHRwdWJsaWMgSUhpdCBIaXQgeyBnZXQ7IHNldDsgfVxyXG5cclxuXHRcdHB1YmxpYyBib29sIEhhc0NvbGxpZGVkIHtnZXR7cmV0dXJuIHRoaXMuSGl0ICE9IG51bGw7fX1cclxuXHR9XHJcbn1cclxuXHJcbiIsIm5hbWVzcGFjZSBIdW1wZXJcclxue1xyXG5cdHVzaW5nIFN5c3RlbTtcclxuXHR1c2luZyBCYXNlO1xyXG5cclxuXHRwdWJsaWMgY2xhc3MgSGl0IDogSUhpdFxyXG5cdHtcclxuXHRcdHB1YmxpYyBIaXQoKVxyXG5cdFx0e1xyXG5cdFx0XHR0aGlzLk5vcm1hbCA9IFZlY3RvcjIuWmVybztcclxuXHRcdFx0dGhpcy5BbW91bnQgPSAxLjBmO1xyXG5cdFx0fVxyXG5cclxuXHRcdHB1YmxpYyBJQm94IEJveCB7IGdldDsgc2V0OyB9XHJcblxyXG5cdFx0cHVibGljIFZlY3RvcjIgTm9ybWFsIHsgZ2V0OyBzZXQ7IH1cclxuXHJcblx0XHRwdWJsaWMgZmxvYXQgQW1vdW50IHsgZ2V0OyBzZXQ7IH1cclxuXHJcblx0XHRwdWJsaWMgVmVjdG9yMiBQb3NpdGlvbiB7IGdldDsgc2V0OyB9XHJcblxyXG5cdFx0cHVibGljIGZsb2F0IFJlbWFpbmluZyB7IGdldCB7IHJldHVybiAxLjBmIC0gdGhpcy5BbW91bnQ7IH0gfVxyXG5cclxuXHRcdCNyZWdpb24gUHVibGljIGZ1bmN0aW9uc1xyXG5cclxuXHRcdHB1YmxpYyBzdGF0aWMgSUhpdCBSZXNvbHZlKFJlY3RhbmdsZUYgb3JpZ2luLCBSZWN0YW5nbGVGIGRlc3RpbmF0aW9uLCBJQm94IG90aGVyKVxyXG5cdFx0e1xyXG5cdFx0XHR2YXIgcmVzdWx0ID0gUmVzb2x2ZShvcmlnaW4sZGVzdGluYXRpb24sIG90aGVyLkJvdW5kcyk7XHJcblx0XHRcdGlmIChyZXN1bHQgIT0gbnVsbCkgcmVzdWx0LkJveCA9IG90aGVyO1xyXG5cdFx0XHRyZXR1cm4gcmVzdWx0O1xyXG5cdFx0fVxyXG5cclxuXHRcdHB1YmxpYyBzdGF0aWMgSUhpdCBSZXNvbHZlKFZlY3RvcjIgb3JpZ2luLCBWZWN0b3IyIGRlc3RpbmF0aW9uLCBJQm94IG90aGVyKVxyXG5cdFx0e1xyXG5cdFx0XHR2YXIgcmVzdWx0ID0gUmVzb2x2ZShvcmlnaW4sIGRlc3RpbmF0aW9uLCBvdGhlci5Cb3VuZHMpO1xyXG5cdFx0XHRpZiAocmVzdWx0ICE9IG51bGwpIHJlc3VsdC5Cb3ggPSBvdGhlcjtcclxuXHRcdFx0cmV0dXJuIHJlc3VsdDtcclxuXHRcdH1cclxuXHJcblx0XHRwdWJsaWMgc3RhdGljIEhpdCBSZXNvbHZlKFJlY3RhbmdsZUYgb3JpZ2luLCBSZWN0YW5nbGVGIGRlc3RpbmF0aW9uLCBSZWN0YW5nbGVGIG90aGVyKVxyXG5cdFx0e1xyXG5cdFx0XHR2YXIgYnJvYWRwaGFzZUFyZWEgPSBSZWN0YW5nbGVGLlVuaW9uKG9yaWdpbixkZXN0aW5hdGlvbik7XHJcblxyXG5cdFx0XHRpZiAoYnJvYWRwaGFzZUFyZWEuSW50ZXJzZWN0cyhvdGhlcikgfHwgYnJvYWRwaGFzZUFyZWEuQ29udGFpbnMob3RoZXIpKVxyXG5cdFx0XHR7XHJcblx0XHRcdFx0cmV0dXJuIFJlc29sdmVOYXJyb3cob3JpZ2luLCBkZXN0aW5hdGlvbiwgb3RoZXIpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRyZXR1cm4gbnVsbDtcclxuXHRcdH1cclxuXHJcblx0XHRwdWJsaWMgc3RhdGljIEhpdCBSZXNvbHZlKFZlY3RvcjIgb3JpZ2luLCBWZWN0b3IyIGRlc3RpbmF0aW9uLCBSZWN0YW5nbGVGIG90aGVyKVxyXG5cdFx0e1xyXG5cdFx0XHR2YXIgbWluID0gVmVjdG9yMi5NaW4ob3JpZ2luLGRlc3RpbmF0aW9uKTtcclxuXHRcdFx0dmFyIHNpemUgPSBWZWN0b3IyLk1heChvcmlnaW4sIGRlc3RpbmF0aW9uKSAtIG1pbjtcclxuXHJcblx0XHRcdHZhciBicm9hZHBoYXNlQXJlYSA9IG5ldyBSZWN0YW5nbGVGKG1pbiwgc2l6ZSk7XHJcblxyXG5cdFx0XHRpZiAoYnJvYWRwaGFzZUFyZWEuSW50ZXJzZWN0cyhvdGhlcikgfHwgYnJvYWRwaGFzZUFyZWEuQ29udGFpbnMob3RoZXIpKVxyXG5cdFx0XHR7XHJcblx0XHRcdFx0cmV0dXJuIFJlc29sdmVOYXJyb3cob3JpZ2luLCBkZXN0aW5hdGlvbiwgb3RoZXIpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRyZXR1cm4gbnVsbDtcclxuXHRcdH1cclxuXHJcblx0XHRwdWJsaWMgc3RhdGljIElIaXQgUmVzb2x2ZShWZWN0b3IyIHBvaW50LCBJQm94IG90aGVyKVxyXG5cdFx0e1xyXG5cdFx0XHRpZiAob3RoZXIuQm91bmRzLkNvbnRhaW5zKHBvaW50KSlcclxuXHRcdFx0e1xyXG5cdFx0XHRcdHZhciBvdXRzaWRlID0gUHVzaE91dHNpZGUocG9pbnQsIG90aGVyLkJvdW5kcyk7XHJcblx0XHRcdFx0cmV0dXJuIG5ldyBIaXQoKVxyXG5cdFx0XHRcdHtcclxuXHRcdFx0XHRcdEFtb3VudCA9IDAsXHJcblx0XHRcdFx0XHRCb3ggPSBvdGhlcixcclxuXHRcdFx0XHRcdFBvc2l0aW9uID0gb3V0c2lkZS5JdGVtMSxcclxuXHRcdFx0XHRcdE5vcm1hbCA9IG91dHNpZGUuSXRlbTIsXHJcblx0XHRcdFx0fTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0cmV0dXJuIG51bGw7XHJcblx0XHR9XHJcblxyXG5cdFx0I2VuZHJlZ2lvblxyXG5cclxuXHRcdHByaXZhdGUgc3RhdGljIFR1cGxlPFZlY3RvcjIsIFZlY3RvcjI+IFB1c2hPdXRzaWRlKFZlY3RvcjIgb3JpZ2luLCBSZWN0YW5nbGVGIG90aGVyKVxyXG5cdFx0e1xyXG5cdFx0XHR2YXIgcG9zaXRpb24gPSBvcmlnaW47XHJcblx0XHRcdHZhciBub3JtYWwgPSBWZWN0b3IyLlplcm87XHJcblxyXG5cdFx0XHR2YXIgdG9wID0gb3JpZ2luLlkgLSBvdGhlci5Ub3A7XHJcblx0XHRcdHZhciBib3R0b20gPSBvdGhlci5Cb3R0b20gLSBvcmlnaW4uWTtcclxuXHRcdFx0dmFyIGxlZnQgPSBvcmlnaW4uWCAtIG90aGVyLkxlZnQ7XHJcblx0XHRcdHZhciByaWdodCA9IG90aGVyLlJpZ2h0IC0gb3JpZ2luLlg7XHJcblxyXG5cdFx0XHR2YXIgbWluID0gTWF0aC5NaW4odG9wLCBNYXRoLk1pbihib3R0b20sIE1hdGguTWluKHJpZ2h0LCBsZWZ0KSkpO1xyXG5cclxuXHRcdFx0aWYgKE1hdGguQWJzKG1pbiAtIHRvcCkgPCBDb25zdGFudHMuVGhyZXNob2xkKVxyXG5cdFx0XHR7XHJcblx0XHRcdFx0bm9ybWFsID0gLVZlY3RvcjIuVW5pdFk7XHJcblx0XHRcdFx0cG9zaXRpb24gPSBuZXcgVmVjdG9yMihwb3NpdGlvbi5YLCBvdGhlci5Ub3ApO1xyXG5cdFx0XHR9XHJcblx0XHRcdGVsc2UgaWYgKE1hdGguQWJzKG1pbiAtIGJvdHRvbSkgPCBDb25zdGFudHMuVGhyZXNob2xkKVxyXG5cdFx0XHR7XHJcblx0XHRcdFx0bm9ybWFsID0gVmVjdG9yMi5Vbml0WTtcclxuXHRcdFx0XHRwb3NpdGlvbiA9IG5ldyBWZWN0b3IyKHBvc2l0aW9uLlgsIG90aGVyLkJvdHRvbSk7XHJcblx0XHRcdH1cclxuXHRcdFx0ZWxzZSBpZiAoTWF0aC5BYnMobWluIC0gbGVmdCkgPCBDb25zdGFudHMuVGhyZXNob2xkKVxyXG5cdFx0XHR7XHJcblx0XHRcdFx0bm9ybWFsID0gLVZlY3RvcjIuVW5pdFg7XHJcblx0XHRcdFx0cG9zaXRpb24gPSBuZXcgVmVjdG9yMihvdGhlci5MZWZ0LCBwb3NpdGlvbi5ZKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRlbHNlIGlmIChNYXRoLkFicyhtaW4gLSByaWdodCkgPCBDb25zdGFudHMuVGhyZXNob2xkKVxyXG5cdFx0XHR7XHJcblx0XHRcdFx0bm9ybWFsID0gVmVjdG9yMi5Vbml0WDtcclxuXHRcdFx0XHRwb3NpdGlvbiA9IG5ldyBWZWN0b3IyKG90aGVyLlJpZ2h0LCBwb3NpdGlvbi5ZKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0cmV0dXJuIG5ldyBUdXBsZTxWZWN0b3IyLCBWZWN0b3IyPihwb3NpdGlvbixub3JtYWwpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHByaXZhdGUgc3RhdGljIFR1cGxlPFJlY3RhbmdsZUYsVmVjdG9yMj4gUHVzaE91dHNpZGUoUmVjdGFuZ2xlRiBvcmlnaW4sIFJlY3RhbmdsZUYgb3RoZXIpXHJcblx0XHR7XHJcblx0XHRcdHZhciBwb3NpdGlvbiA9IG9yaWdpbjtcclxuXHRcdFx0dmFyIG5vcm1hbCA9IFZlY3RvcjIuWmVybztcclxuXHJcblx0XHRcdHZhciB0b3AgPSBvcmlnaW4uQ2VudGVyLlkgLSBvdGhlci5Ub3A7XHJcblx0XHRcdHZhciBib3R0b20gPSBvdGhlci5Cb3R0b20gLSBvcmlnaW4uQ2VudGVyLlk7XHJcblx0XHRcdHZhciBsZWZ0ID0gb3JpZ2luLkNlbnRlci5YIC0gb3RoZXIuTGVmdDtcclxuXHRcdFx0dmFyIHJpZ2h0ID0gb3RoZXIuUmlnaHQgLSBvcmlnaW4uQ2VudGVyLlg7XHJcblxyXG5cdFx0XHR2YXIgbWluID0gTWF0aC5NaW4odG9wLCBNYXRoLk1pbihib3R0b20sIE1hdGguTWluKHJpZ2h0LCBsZWZ0KSkpO1xyXG5cclxuXHRcdFx0aWYgKE1hdGguQWJzKG1pbiAtIHRvcCkgPCBDb25zdGFudHMuVGhyZXNob2xkKVxyXG5cdFx0XHR7XHJcblx0XHRcdFx0bm9ybWFsID0gLVZlY3RvcjIuVW5pdFk7XHJcblx0XHRcdFx0cG9zaXRpb24uTG9jYXRpb24gPSBuZXcgVmVjdG9yMihwb3NpdGlvbi5Mb2NhdGlvbi5YLCBvdGhlci5Ub3AgLSBwb3NpdGlvbi5IZWlnaHQpO1xyXG5cdFx0XHR9XHJcblx0XHRcdGVsc2UgaWYgKE1hdGguQWJzKG1pbiAtIGJvdHRvbSkgPCBDb25zdGFudHMuVGhyZXNob2xkKVxyXG5cdFx0XHR7XHJcblx0XHRcdFx0bm9ybWFsID0gVmVjdG9yMi5Vbml0WTtcclxuXHRcdFx0XHRwb3NpdGlvbi5Mb2NhdGlvbiA9IG5ldyBWZWN0b3IyKHBvc2l0aW9uLkxvY2F0aW9uLlgsIG90aGVyLkJvdHRvbSk7XHJcblx0XHRcdH1cclxuXHRcdFx0ZWxzZSBpZiAoTWF0aC5BYnMobWluIC0gbGVmdCkgPCBDb25zdGFudHMuVGhyZXNob2xkKVxyXG5cdFx0XHR7XHJcblx0XHRcdFx0bm9ybWFsID0gLVZlY3RvcjIuVW5pdFg7XHJcblx0XHRcdFx0cG9zaXRpb24uTG9jYXRpb24gPSBuZXcgVmVjdG9yMihvdGhlci5MZWZ0IC0gcG9zaXRpb24uV2lkdGgsIHBvc2l0aW9uLkxvY2F0aW9uLlkpO1xyXG5cdFx0XHR9XHJcblx0XHRcdGVsc2UgaWYgKE1hdGguQWJzKG1pbiAtIHJpZ2h0KSA8IENvbnN0YW50cy5UaHJlc2hvbGQpXHJcblx0XHRcdHtcclxuXHRcdFx0XHRub3JtYWwgPSBWZWN0b3IyLlVuaXRYO1xyXG5cdFx0XHRcdHBvc2l0aW9uLkxvY2F0aW9uID0gbmV3IFZlY3RvcjIob3RoZXIuUmlnaHQsIHBvc2l0aW9uLkxvY2F0aW9uLlkpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRyZXR1cm4gbmV3IFR1cGxlPFJlY3RhbmdsZUYsIFZlY3RvcjI+KHBvc2l0aW9uLG5vcm1hbCk7XHJcblx0XHR9XHJcblxyXG5cdFx0cHJpdmF0ZSBzdGF0aWMgSGl0IFJlc29sdmVOYXJyb3coUmVjdGFuZ2xlRiBvcmlnaW4sIFJlY3RhbmdsZUYgZGVzdGluYXRpb24sIFJlY3RhbmdsZUYgb3RoZXIpXHJcblx0XHR7XHJcblx0XHRcdC8vIGlmIHN0YXJ0cyBpbnNpZGUsIHB1c2ggaXQgb3V0c2lkZSBhdCB0aGUgbmVhcmVhc3QgcGxhY2VcclxuXHRcdFx0aWYgKG90aGVyLkNvbnRhaW5zKG9yaWdpbikgfHwgb3RoZXIuSW50ZXJzZWN0cyhvcmlnaW4pKVxyXG5cdFx0XHR7XHJcblx0XHRcdFx0dmFyIG91dHNpZGUgPSBQdXNoT3V0c2lkZShvcmlnaW4sIG90aGVyKTtcclxuXHRcdFx0XHRyZXR1cm4gbmV3IEhpdCgpXHJcblx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0QW1vdW50ID0gMCxcclxuXHRcdFx0XHRcdFBvc2l0aW9uID0gb3V0c2lkZS5JdGVtMS5Mb2NhdGlvbixcclxuXHRcdFx0XHRcdE5vcm1hbCA9IG91dHNpZGUuSXRlbTIsXHJcblx0XHRcdFx0fTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0dmFyIHZlbG9jaXR5ID0gKGRlc3RpbmF0aW9uLkxvY2F0aW9uIC0gb3JpZ2luLkxvY2F0aW9uKTtcclxuXHJcblx0XHRcdFZlY3RvcjIgaW52RW50cnksIGludkV4aXQsIGVudHJ5LCBleGl0O1xyXG5cclxuXHRcdFx0aWYgKHZlbG9jaXR5LlggPiAwKVxyXG5cdFx0XHR7XHJcblx0XHRcdFx0aW52RW50cnkuWCA9IG90aGVyLkxlZnQgLSBvcmlnaW4uUmlnaHQ7XHJcblx0XHRcdFx0aW52RXhpdC5YID0gb3RoZXIuUmlnaHQgLSBvcmlnaW4uTGVmdDtcclxuXHRcdFx0fVxyXG5cdFx0XHRlbHNlXHJcblx0XHRcdHtcclxuXHRcdFx0XHRpbnZFbnRyeS5YID0gb3RoZXIuUmlnaHQgLSBvcmlnaW4uTGVmdDtcclxuXHRcdFx0XHRpbnZFeGl0LlggPSBvdGhlci5MZWZ0IC0gb3JpZ2luLlJpZ2h0O1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAodmVsb2NpdHkuWSA+IDApXHJcblx0XHRcdHtcclxuXHRcdFx0XHRpbnZFbnRyeS5ZID0gb3RoZXIuVG9wIC0gb3JpZ2luLkJvdHRvbTtcclxuXHRcdFx0XHRpbnZFeGl0LlkgPSBvdGhlci5Cb3R0b20gLSBvcmlnaW4uVG9wO1xyXG5cdFx0XHR9XHJcblx0XHRcdGVsc2VcclxuXHRcdFx0e1xyXG5cdFx0XHRcdGludkVudHJ5LlkgPSBvdGhlci5Cb3R0b20gLSBvcmlnaW4uVG9wO1xyXG5cdFx0XHRcdGludkV4aXQuWSA9IG90aGVyLlRvcCAtIG9yaWdpbi5Cb3R0b207XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmIChNYXRoLkFicyh2ZWxvY2l0eS5YKSA8IENvbnN0YW50cy5UaHJlc2hvbGQpXHJcblx0XHRcdHtcclxuXHRcdFx0XHRlbnRyeS5YID0gZmxvYXQuTWluVmFsdWU7XHJcblx0XHRcdFx0ZXhpdC5YID0gZmxvYXQuTWF4VmFsdWU7XHJcblx0XHRcdH1cclxuXHRcdFx0ZWxzZVxyXG5cdFx0XHR7XHJcblx0XHRcdFx0ZW50cnkuWCA9IGludkVudHJ5LlggLyB2ZWxvY2l0eS5YO1xyXG5cdFx0XHRcdGV4aXQuWCA9IGludkV4aXQuWCAvIHZlbG9jaXR5Llg7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmIChNYXRoLkFicyh2ZWxvY2l0eS5ZKSA8IENvbnN0YW50cy5UaHJlc2hvbGQpXHJcblx0XHRcdHtcclxuXHRcdFx0XHRlbnRyeS5ZID0gZmxvYXQuTWluVmFsdWU7XHJcblx0XHRcdFx0ZXhpdC5ZID0gZmxvYXQuTWF4VmFsdWU7XHJcblx0XHRcdH1cclxuXHRcdFx0ZWxzZVxyXG5cdFx0XHR7XHJcblx0XHRcdFx0ZW50cnkuWSA9IGludkVudHJ5LlkgLyB2ZWxvY2l0eS5ZO1xyXG5cdFx0XHRcdGV4aXQuWSA9IGludkV4aXQuWSAvIHZlbG9jaXR5Llk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmIChlbnRyeS5ZID4gMS4wZikgZW50cnkuWSA9IGZsb2F0Lk1pblZhbHVlO1xyXG5cdFx0XHRpZiAoZW50cnkuWCA+IDEuMGYpIGVudHJ5LlggPSBmbG9hdC5NaW5WYWx1ZTtcclxuXHJcblx0XHRcdHZhciBlbnRyeVRpbWUgPSBNYXRoLk1heChlbnRyeS5YLCBlbnRyeS5ZKTtcclxuXHRcdFx0dmFyIGV4aXRUaW1lID0gTWF0aC5NaW4oZXhpdC5YLCBleGl0LlkpO1xyXG5cclxuXHRcdFx0aWYgKFxyXG5cdFx0XHRcdChlbnRyeVRpbWUgPiBleGl0VGltZSB8fCBlbnRyeS5YIDwgMC4wZiAmJiBlbnRyeS5ZIDwgMC4wZikgfHxcclxuXHRcdFx0XHQoZW50cnkuWCA8IDAuMGYgJiYgKG9yaWdpbi5SaWdodCA8IG90aGVyLkxlZnQgfHwgb3JpZ2luLkxlZnQgPiBvdGhlci5SaWdodCkpIHx8XHJcblx0XHRcdFx0ZW50cnkuWSA8IDAuMGYgJiYgKG9yaWdpbi5Cb3R0b20gPCBvdGhlci5Ub3AgfHwgb3JpZ2luLlRvcCA+IG90aGVyLkJvdHRvbSkpXHJcblx0XHRcdFx0cmV0dXJuIG51bGw7IFxyXG5cclxuXHJcblx0XHRcdHZhciByZXN1bHQgPSBuZXcgSGl0KClcclxuXHRcdFx0e1xyXG5cdFx0XHRcdEFtb3VudCA9IGVudHJ5VGltZSxcclxuXHRcdFx0XHRQb3NpdGlvbiA9IG9yaWdpbi5Mb2NhdGlvbiArIHZlbG9jaXR5ICogZW50cnlUaW1lLFxyXG5cdFx0XHRcdE5vcm1hbCA9IEdldE5vcm1hbChpbnZFbnRyeSwgaW52RXhpdCwgZW50cnkpLFxyXG5cdFx0XHR9O1xyXG5cclxuXHJcblx0XHRcdHJldHVybiByZXN1bHQ7XHJcblx0XHR9XHJcblxyXG5cdFx0cHJpdmF0ZSBzdGF0aWMgSGl0IFJlc29sdmVOYXJyb3coVmVjdG9yMiBvcmlnaW4sIFZlY3RvcjIgZGVzdGluYXRpb24sIFJlY3RhbmdsZUYgb3RoZXIpXHJcblx0XHR7XHJcblx0XHRcdC8vIGlmIHN0YXJ0cyBpbnNpZGUsIHB1c2ggaXQgb3V0c2lkZSBhdCB0aGUgbmVhcmVhc3QgcGxhY2VcclxuXHRcdFx0aWYgKG90aGVyLkNvbnRhaW5zKG9yaWdpbikpXHJcblx0XHRcdHtcclxuXHRcdFx0XHR2YXIgb3V0c2lkZSA9IFB1c2hPdXRzaWRlKG9yaWdpbiwgb3RoZXIpO1xyXG5cdFx0XHRcdHJldHVybiBuZXcgSGl0KClcclxuXHRcdFx0XHR7XHJcblx0XHRcdFx0XHRBbW91bnQgPSAwLFxyXG5cdFx0XHRcdFx0UG9zaXRpb24gPSBvdXRzaWRlLkl0ZW0xLFxyXG5cdFx0XHRcdFx0Tm9ybWFsID0gb3V0c2lkZS5JdGVtMixcclxuXHRcdFx0XHR9O1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR2YXIgdmVsb2NpdHkgPSAoZGVzdGluYXRpb24gLSBvcmlnaW4pO1xyXG5cclxuXHRcdFx0VmVjdG9yMiBpbnZFbnRyeSwgaW52RXhpdCwgZW50cnksIGV4aXQ7XHJcblxyXG5cdFx0XHRpZiAodmVsb2NpdHkuWCA+IDApXHJcblx0XHRcdHtcclxuXHRcdFx0XHRpbnZFbnRyeS5YID0gb3RoZXIuTGVmdCAtIG9yaWdpbi5YO1xyXG5cdFx0XHRcdGludkV4aXQuWCA9IG90aGVyLlJpZ2h0IC0gb3JpZ2luLlg7XHJcblx0XHRcdH1cclxuXHRcdFx0ZWxzZVxyXG5cdFx0XHR7XHJcblx0XHRcdFx0aW52RW50cnkuWCA9IG90aGVyLlJpZ2h0IC0gb3JpZ2luLlg7XHJcblx0XHRcdFx0aW52RXhpdC5YID0gb3RoZXIuTGVmdCAtIG9yaWdpbi5YO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAodmVsb2NpdHkuWSA+IDApXHJcblx0XHRcdHtcclxuXHRcdFx0XHRpbnZFbnRyeS5ZID0gb3RoZXIuVG9wIC0gb3JpZ2luLlk7XHJcblx0XHRcdFx0aW52RXhpdC5ZID0gb3RoZXIuQm90dG9tIC0gb3JpZ2luLlk7XHJcblx0XHRcdH1cclxuXHRcdFx0ZWxzZVxyXG5cdFx0XHR7XHJcblx0XHRcdFx0aW52RW50cnkuWSA9IG90aGVyLkJvdHRvbSAtIG9yaWdpbi5ZO1xyXG5cdFx0XHRcdGludkV4aXQuWSA9IG90aGVyLlRvcCAtIG9yaWdpbi5ZO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAoTWF0aC5BYnModmVsb2NpdHkuWCkgPCBDb25zdGFudHMuVGhyZXNob2xkKVxyXG5cdFx0XHR7XHJcblx0XHRcdFx0ZW50cnkuWCA9IGZsb2F0Lk1pblZhbHVlO1xyXG5cdFx0XHRcdGV4aXQuWCA9IGZsb2F0Lk1heFZhbHVlO1xyXG5cdFx0XHR9XHJcblx0XHRcdGVsc2VcclxuXHRcdFx0e1xyXG5cdFx0XHRcdGVudHJ5LlggPSBpbnZFbnRyeS5YIC8gdmVsb2NpdHkuWDtcclxuXHRcdFx0XHRleGl0LlggPSBpbnZFeGl0LlggLyB2ZWxvY2l0eS5YO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAoTWF0aC5BYnModmVsb2NpdHkuWSkgPCBDb25zdGFudHMuVGhyZXNob2xkKVxyXG5cdFx0XHR7XHJcblx0XHRcdFx0ZW50cnkuWSA9IGZsb2F0Lk1pblZhbHVlO1xyXG5cdFx0XHRcdGV4aXQuWSA9IGZsb2F0Lk1heFZhbHVlO1xyXG5cdFx0XHR9XHJcblx0XHRcdGVsc2VcclxuXHRcdFx0e1xyXG5cdFx0XHRcdGVudHJ5LlkgPSBpbnZFbnRyeS5ZIC8gdmVsb2NpdHkuWTtcclxuXHRcdFx0XHRleGl0LlkgPSBpbnZFeGl0LlkgLyB2ZWxvY2l0eS5ZO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAoZW50cnkuWSA+IDEuMGYpIGVudHJ5LlkgPSBmbG9hdC5NaW5WYWx1ZTtcclxuXHRcdFx0aWYgKGVudHJ5LlggPiAxLjBmKSBlbnRyeS5YID0gZmxvYXQuTWluVmFsdWU7XHJcblxyXG5cdFx0XHR2YXIgZW50cnlUaW1lID0gTWF0aC5NYXgoZW50cnkuWCwgZW50cnkuWSk7XHJcblx0XHRcdHZhciBleGl0VGltZSA9IE1hdGguTWluKGV4aXQuWCwgZXhpdC5ZKTtcclxuXHJcblx0XHRcdGlmIChcclxuXHRcdFx0XHQoZW50cnlUaW1lID4gZXhpdFRpbWUgfHwgZW50cnkuWCA8IDAuMGYgJiYgZW50cnkuWSA8IDAuMGYpIHx8XHJcblx0XHRcdFx0KGVudHJ5LlggPCAwLjBmICYmIChvcmlnaW4uWCA8IG90aGVyLkxlZnQgfHwgb3JpZ2luLlggPiBvdGhlci5SaWdodCkpIHx8XHJcblx0XHRcdFx0ZW50cnkuWSA8IDAuMGYgJiYgKG9yaWdpbi5ZIDwgb3RoZXIuVG9wIHx8IG9yaWdpbi5ZID4gb3RoZXIuQm90dG9tKSlcclxuXHRcdFx0XHRyZXR1cm4gbnVsbDtcclxuXHRcdFx0XHJcblx0XHRcdHZhciByZXN1bHQgPSBuZXcgSGl0KClcclxuXHRcdFx0e1xyXG5cdFx0XHRcdEFtb3VudCA9IGVudHJ5VGltZSxcclxuXHRcdFx0XHRQb3NpdGlvbiA9IG9yaWdpbiArIHZlbG9jaXR5ICogZW50cnlUaW1lLFxyXG5cdFx0XHRcdE5vcm1hbCA9IEdldE5vcm1hbChpbnZFbnRyeSwgaW52RXhpdCwgZW50cnkpLFxyXG5cdFx0XHR9O1xyXG5cclxuXHRcdFx0cmV0dXJuIHJlc3VsdDtcclxuXHRcdH1cclxuXHJcblx0XHRwcml2YXRlIHN0YXRpYyBWZWN0b3IyIEdldE5vcm1hbChWZWN0b3IyIGludkVudHJ5LCBWZWN0b3IyIGludkV4aXQsIFZlY3RvcjIgZW50cnkpXHJcblx0XHR7XHJcblx0XHRcdGlmIChlbnRyeS5YID4gZW50cnkuWSlcclxuXHRcdFx0e1xyXG5cdFx0XHRcdHJldHVybiAoaW52RW50cnkuWCA8IDAuMGYpIHx8IChNYXRoLkFicyhpbnZFbnRyeS5YKSA8IENvbnN0YW50cy5UaHJlc2hvbGQgJiYgaW52RXhpdC5YIDwgMCkgPyBWZWN0b3IyLlVuaXRYIDogLVZlY3RvcjIuVW5pdFg7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHJldHVybiAoaW52RW50cnkuWSA8IDAuMGYgfHwgKE1hdGguQWJzKGludkVudHJ5LlkpIDwgQ29uc3RhbnRzLlRocmVzaG9sZCAmJiBpbnZFeGl0LlkgPCAwKSkgPyBWZWN0b3IyLlVuaXRZIDogLVZlY3RvcjIuVW5pdFk7XHJcblx0XHR9XHJcblx0XHRcdFx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG5cclxuXHRcdHB1YmxpYyBib29sIElzTmVhcmVzdChJSGl0IHRoYW4sIFZlY3RvcjIgb3JpZ2luKVxyXG5cdFx0e1xyXG5cdFx0XHRpZiAodGhpcy5BbW91bnQgPCB0aGFuLkFtb3VudClcclxuXHRcdFx0e1xyXG5cdFx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0XHR9XHJcblx0XHRcdGVsc2UgaWYgKHRoaXMuQW1vdW50ID4gdGhhbi5BbW91bnQpXHJcblx0XHRcdHtcclxuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0dmFyIHRoaXNEaXN0YW5jZSA9IChvcmlnaW4gLSB0aGlzLlBvc2l0aW9uKS5MZW5ndGhTcXVhcmVkKCk7XHJcblx0XHRcdHZhciBvdGhlckRpc3RhbmNlID0gKG9yaWdpbiAtIHRoYW4uUG9zaXRpb24pLkxlbmd0aFNxdWFyZWQoKTtcclxuXHJcblx0XHRcdHJldHVybiB0aGlzRGlzdGFuY2UgPCBvdGhlckRpc3RhbmNlO1xyXG5cdFx0fVxyXG5cdH1cclxufVxyXG5cclxuIiwibmFtZXNwYWNlIEh1bXBlclxyXG57XHJcblx0dXNpbmcgQmFzZTtcclxuXHR1c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxuXHR1c2luZyBTeXN0ZW0uTGlucTtcclxuXHJcblx0cHVibGljIGNsYXNzIE1vdmVtZW50IDogSU1vdmVtZW50XHJcblx0e1xyXG5cdFx0cHVibGljIE1vdmVtZW50KClcclxuXHRcdHtcclxuXHRcdFx0dGhpcy5IaXRzID0gbmV3IElIaXRbMF07XHJcblx0XHR9XHJcblxyXG5cdFx0cHVibGljIElFbnVtZXJhYmxlPElIaXQ+IEhpdHMgeyBnZXQ7IHNldDsgfVxyXG5cclxuXHRcdHB1YmxpYyBib29sIEhhc0NvbGxpZGVkIHsgZ2V0IHsgcmV0dXJuIFN5c3RlbS5MaW5xLkVudW1lcmFibGUuQW55PGdsb2JhbDo6SHVtcGVyLklIaXQ+KHRoaXMuSGl0cyk7IH0gfVxyXG5cclxuXHRcdHB1YmxpYyBSZWN0YW5nbGVGIE9yaWdpbiB7IGdldDsgc2V0OyB9XHJcblxyXG5cdFx0cHVibGljIFJlY3RhbmdsZUYgRGVzdGluYXRpb24geyBnZXQ7IHNldDsgfVxyXG5cclxuXHRcdHB1YmxpYyBSZWN0YW5nbGVGIEdvYWwgeyBnZXQ7IHNldDsgfVxyXG5cdH1cclxufVxyXG5cclxuIiwibmFtZXNwYWNlIEh1bXBlci5SZXNwb25zZXNcclxue1xyXG5cdHVzaW5nIEJhc2U7XHJcblx0dXNpbmcgU3lzdGVtO1xyXG5cclxuXHRwdWJsaWMgY2xhc3MgQm91bmNlUmVzcG9uc2UgOiBJQ29sbGlzaW9uUmVzcG9uc2VcclxuXHR7XHJcblx0XHRwdWJsaWMgQm91bmNlUmVzcG9uc2UoSUNvbGxpc2lvbiBjb2xsaXNpb24pXHJcblx0XHR7XHJcblx0XHRcdHZhciB2ZWxvY2l0eSA9IChjb2xsaXNpb24uR29hbC5DZW50ZXIgLSBjb2xsaXNpb24uT3JpZ2luLkNlbnRlcik7XHJcblx0XHRcdHZhciBkZWZsZWN0ZWQgPSB2ZWxvY2l0eSAqIGNvbGxpc2lvbi5IaXQuQW1vdW50O1xyXG5cclxuXHRcdFx0aWYgKE1hdGguQWJzKGNvbGxpc2lvbi5IaXQuTm9ybWFsLlgpID4gMC4wMDAwMWYpXHJcblx0XHRcdHtcclxuXHRcdFx0XHRkZWZsZWN0ZWQuWCAqPSAtMTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKE1hdGguQWJzKGNvbGxpc2lvbi5IaXQuTm9ybWFsLlkpID4gMC4wMDAwMWYpXHJcblx0XHRcdHtcclxuXHRcdFx0XHRkZWZsZWN0ZWQuWSAqPSAtMTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0dGhpcy5EZXN0aW5hdGlvbiA9IG5ldyBSZWN0YW5nbGVGKGNvbGxpc2lvbi5IaXQuUG9zaXRpb24gKyBkZWZsZWN0ZWQsIGNvbGxpc2lvbi5Hb2FsLlNpemUpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHB1YmxpYyBSZWN0YW5nbGVGIERlc3RpbmF0aW9uIHsgZ2V0OyBwcml2YXRlIHNldDsgfVxyXG5cdH1cclxufVxyXG5cclxuIiwidXNpbmcgU3lzdGVtO1xyXG51c2luZyBIdW1wZXIuQmFzZTtcclxuXHJcbm5hbWVzcGFjZSBIdW1wZXIuUmVzcG9uc2VzXHJcbntcclxuXHRwdWJsaWMgY2xhc3MgQ29sbGlzaW9uUmVzcG9uc2UgOiBJQ29sbGlzaW9uUmVzcG9uc2VcclxuXHR7XHJcblx0XHRwcml2YXRlIENvbGxpc2lvblJlc3BvbnNlKElDb2xsaXNpb24gY29sLCBDb2xsaXNpb25SZXNwb25zZXMgcmVzcG9uc2UpXHJcblx0XHR7XHJcblx0XHRcdHN3aXRjaCAocmVzcG9uc2UpXHJcblx0XHRcdHtcclxuXHRcdFx0XHRjYXNlIENvbGxpc2lvblJlc3BvbnNlcy5Ub3VjaDogY2hpbGQgPSBuZXcgVG91Y2hSZXNwb25zZShjb2wpOyBicmVhaztcclxuXHRcdFx0XHRjYXNlIENvbGxpc2lvblJlc3BvbnNlcy5Dcm9zczogY2hpbGQgPSBuZXcgQ3Jvc3NSZXNwb25zZShjb2wpOyBicmVhaztcclxuXHRcdFx0XHRjYXNlIENvbGxpc2lvblJlc3BvbnNlcy5TbGlkZTogY2hpbGQgPSBuZXcgU2xpZGVSZXNwb25zZShjb2wpOyBicmVhaztcclxuXHRcdFx0XHRjYXNlIENvbGxpc2lvblJlc3BvbnNlcy5Cb3VuY2U6IGNoaWxkID0gbmV3IEJvdW5jZVJlc3BvbnNlKGNvbCk7IGJyZWFrO1xyXG5cdFx0XHRcdGRlZmF1bHQ6IHRocm93IG5ldyBBcmd1bWVudEV4Y2VwdGlvbihcIlVuc3VwcG9ydGVkIGNvbGxpc2lvbiB0eXBlXCIpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0cHJpdmF0ZSBJQ29sbGlzaW9uUmVzcG9uc2UgY2hpbGQ7XHJcblxyXG5cdFx0cHVibGljIFJlY3RhbmdsZUYgRGVzdGluYXRpb24geyBnZXQgeyByZXR1cm4gY2hpbGQuRGVzdGluYXRpb247IH0gfVxyXG5cclxuXHRcdHB1YmxpYyBzdGF0aWMgSUNvbGxpc2lvblJlc3BvbnNlIENyZWF0ZShJQ29sbGlzaW9uIGNvbCwgQ29sbGlzaW9uUmVzcG9uc2VzIHJlc3BvbnNlKVxyXG5cdFx0e1xyXG5cdFx0XHRpZiAocmVzcG9uc2UgPT0gQ29sbGlzaW9uUmVzcG9uc2VzLk5vbmUpXHJcblx0XHRcdFx0cmV0dXJuIG51bGw7XHJcblxyXG5cdFx0XHRyZXR1cm4gbmV3IENvbGxpc2lvblJlc3BvbnNlKGNvbCwgcmVzcG9uc2UpO1xyXG5cdFx0fVxyXG5cdH1cclxufVxyXG5cclxuIiwibmFtZXNwYWNlIEh1bXBlci5SZXNwb25zZXNcclxue1xyXG5cdHVzaW5nIEJhc2U7XHJcblxyXG5cdHB1YmxpYyBjbGFzcyBDcm9zc1Jlc3BvbnNlIDogSUNvbGxpc2lvblJlc3BvbnNlXHJcblx0e1xyXG5cdFx0cHVibGljIENyb3NzUmVzcG9uc2UoSUNvbGxpc2lvbiBjb2xsaXNpb24pXHJcblx0XHR7XHJcblx0XHRcdHRoaXMuRGVzdGluYXRpb24gPSBjb2xsaXNpb24uR29hbDtcclxuXHRcdH1cclxuXHJcblx0XHRwdWJsaWMgUmVjdGFuZ2xlRiBEZXN0aW5hdGlvbiB7IGdldDsgcHJpdmF0ZSBzZXQ7IH1cclxuXHR9XHJcbn1cclxuXHJcbiIsIm5hbWVzcGFjZSBIdW1wZXIuUmVzcG9uc2VzXHJcbntcclxuXHR1c2luZyBCYXNlO1xyXG5cclxuXHRwdWJsaWMgY2xhc3MgVG91Y2hSZXNwb25zZSA6IElDb2xsaXNpb25SZXNwb25zZVxyXG5cdHtcclxuXHRcdHB1YmxpYyBUb3VjaFJlc3BvbnNlKElDb2xsaXNpb24gY29sbGlzaW9uKVxyXG5cdFx0e1xyXG5cdFx0XHR0aGlzLkRlc3RpbmF0aW9uID0gbmV3IFJlY3RhbmdsZUYoY29sbGlzaW9uLkhpdC5Qb3NpdGlvbiwgY29sbGlzaW9uLkdvYWwuU2l6ZSk7XHJcblx0XHR9XHJcblxyXG5cdFx0cHVibGljIFJlY3RhbmdsZUYgRGVzdGluYXRpb24geyBnZXQ7IHByaXZhdGUgc2V0OyB9XHJcblx0fVxyXG59XHJcblxyXG4iLCJuYW1lc3BhY2UgSHVtcGVyXHJcbntcclxuXHR1c2luZyBCYXNlO1xyXG5cdHVzaW5nIFJlc3BvbnNlcztcclxuXHJcblx0cHVibGljIGNsYXNzIFNsaWRlUmVzcG9uc2UgOiBJQ29sbGlzaW9uUmVzcG9uc2VcclxuXHR7XHJcblx0XHRwdWJsaWMgU2xpZGVSZXNwb25zZShJQ29sbGlzaW9uIGNvbGxpc2lvbilcclxuXHRcdHtcclxuXHRcdFx0dmFyIHZlbG9jaXR5ID0gKGNvbGxpc2lvbi5Hb2FsLkNlbnRlciAtIGNvbGxpc2lvbi5PcmlnaW4uQ2VudGVyKTtcclxuXHRcdFx0dmFyIG5vcm1hbCA9IGNvbGxpc2lvbi5IaXQuTm9ybWFsO1xyXG5cdFx0XHR2YXIgZG90ID0gY29sbGlzaW9uLkhpdC5SZW1haW5pbmcgKiAodmVsb2NpdHkuWCAqIG5vcm1hbC5ZICsgdmVsb2NpdHkuWSAqIG5vcm1hbC5YKTtcclxuXHRcdFx0dmFyIHNsaWRlID0gbmV3IFZlY3RvcjIobm9ybWFsLlksIG5vcm1hbC5YKSAqIGRvdDtcclxuXHJcblx0XHRcdHRoaXMuRGVzdGluYXRpb24gPSBuZXcgUmVjdGFuZ2xlRihjb2xsaXNpb24uSGl0LlBvc2l0aW9uICsgc2xpZGUsIGNvbGxpc2lvbi5Hb2FsLlNpemUpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHB1YmxpYyBSZWN0YW5nbGVGIERlc3RpbmF0aW9uIHsgZ2V0OyBwcml2YXRlIHNldDsgfVxyXG5cdH1cclxufVxyXG5cclxuIiwibmFtZXNwYWNlIEh1bXBlclxyXG57XHJcblx0dXNpbmcgU3lzdGVtO1xyXG5cdHVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG5cdHVzaW5nIFN5c3RlbS5MaW5xO1xyXG5cdHVzaW5nIEJhc2U7XHJcblx0dXNpbmcgUmVzcG9uc2VzO1xyXG5cclxuXHRwdWJsaWMgY2xhc3MgV29ybGQgOiBJV29ybGRcclxuXHR7XHJcblx0XHRwdWJsaWMgV29ybGQoZmxvYXQgd2lkdGgsIGZsb2F0IGhlaWdodCwgZmxvYXQgY2VsbFNpemUgPSA2NClcclxuXHRcdHtcclxuXHRcdFx0dmFyIGl3aWR0aCA9IChpbnQpTWF0aC5DZWlsaW5nKHdpZHRoIC8gY2VsbFNpemUpO1xyXG5cdFx0XHR2YXIgaWhlaWdodCA9IChpbnQpTWF0aC5DZWlsaW5nKGhlaWdodCAvIGNlbGxTaXplKTtcclxuXHJcblx0XHRcdHRoaXMuZ3JpZCA9IG5ldyBHcmlkKGl3aWR0aCwgaWhlaWdodCwgY2VsbFNpemUpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHB1YmxpYyBSZWN0YW5nbGVGIEJvdW5kcyB7Z2V0e3JldHVybiBuZXcgUmVjdGFuZ2xlRigwLCAwLCB0aGlzLmdyaWQuV2lkdGggLCB0aGlzLmdyaWQuSGVpZ2h0KTt9fVxyXG5cclxuXHRcdCNyZWdpb24gQm94ZXNcclxuXHJcblx0XHRwcml2YXRlIEdyaWQgZ3JpZDtcclxuXHJcblx0XHRwdWJsaWMgSUJveCBDcmVhdGUoZmxvYXQgeCwgZmxvYXQgeSwgZmxvYXQgd2lkdGgsIGZsb2F0IGhlaWdodClcclxuXHRcdHtcclxuXHRcdFx0dmFyIGJveCA9IG5ldyBCb3godGhpcywgeCwgeSwgd2lkdGgsIGhlaWdodCk7XHJcblx0XHRcdHRoaXMuZ3JpZC5BZGQoYm94KTtcclxuXHRcdFx0cmV0dXJuIGJveDtcclxuXHRcdH1cclxuXHJcblx0XHRwdWJsaWMgSUVudW1lcmFibGU8SUJveD4gRmluZChmbG9hdCB4LCBmbG9hdCB5LCBmbG9hdCB3LCBmbG9hdCBoKVxyXG5cdFx0e1xyXG5cdFx0XHR4ID0gTWF0aC5NYXgoMCwgTWF0aC5NaW4oeCwgdGhpcy5Cb3VuZHMuUmlnaHQgLSB3KSk7XHJcblx0XHRcdHkgPSBNYXRoLk1heCgwLCBNYXRoLk1pbih5LCB0aGlzLkJvdW5kcy5Cb3R0b20gLSBoKSk7XHJcblxyXG5cdFx0XHRyZXR1cm4gdGhpcy5ncmlkLlF1ZXJ5Qm94ZXMoeCwgeSwgdywgaCk7XHJcblx0XHR9XHJcblxyXG5cdFx0cHVibGljIElFbnVtZXJhYmxlPElCb3g+IEZpbmQoUmVjdGFuZ2xlRiBhcmVhKVxyXG5cdFx0e1xyXG5cdFx0XHRyZXR1cm4gdGhpcy5GaW5kKGFyZWEuWCwgYXJlYS5ZLCBhcmVhLldpZHRoLCBhcmVhLkhlaWdodCk7XHJcblx0XHR9XHJcblxyXG5cdFx0cHVibGljIGJvb2wgUmVtb3ZlKElCb3ggYm94KVxyXG5cdFx0e1xyXG5cdFx0XHRyZXR1cm4gdGhpcy5ncmlkLlJlbW92ZShib3gpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHB1YmxpYyB2b2lkIFVwZGF0ZShJQm94IGJveCwgUmVjdGFuZ2xlRiBmcm9tKVxyXG5cdFx0e1xyXG5cdFx0XHR0aGlzLmdyaWQuVXBkYXRlKGJveCwgZnJvbSk7XHJcblx0XHR9XHJcblxyXG5cdFx0I2VuZHJlZ2lvblxyXG5cclxuXHRcdCNyZWdpb24gSGl0c1xyXG5cclxuXHRcdHB1YmxpYyBJSGl0IEhpdChWZWN0b3IyIHBvaW50LCBJRW51bWVyYWJsZTxJQm94PiBpZ25vcmluZyA9IG51bGwpXHJcblx0XHR7XHJcblx0XHRcdHZhciBib3hlcyA9IHRoaXMuRmluZChwb2ludC5YLCBwb2ludC5ZLCAwLCAwKTtcclxuXHJcblx0XHRcdGlmIChpZ25vcmluZyAhPSBudWxsKVxyXG5cdFx0XHR7XHJcblx0XHRcdFx0Ym94ZXMgPSBTeXN0ZW0uTGlucS5FbnVtZXJhYmxlLkV4Y2VwdDxnbG9iYWw6Okh1bXBlci5JQm94Pihib3hlcyxpZ25vcmluZyk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGZvcmVhY2ggKHZhciBvdGhlciBpbiBib3hlcylcclxuXHRcdFx0e1xyXG5cdFx0XHRcdHZhciBoaXQgPSBIdW1wZXIuSGl0LlJlc29sdmUocG9pbnQsIG90aGVyKTtcclxuXHJcblx0XHRcdFx0aWYgKGhpdCAhPSBudWxsKVxyXG5cdFx0XHRcdHtcclxuXHRcdFx0XHRcdHJldHVybiBoaXQ7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRyZXR1cm4gbnVsbDtcclxuXHRcdH1cclxuXHJcblx0XHRwdWJsaWMgSUhpdCBIaXQoVmVjdG9yMiBvcmlnaW4sIFZlY3RvcjIgZGVzdGluYXRpb24sIElFbnVtZXJhYmxlPElCb3g+IGlnbm9yaW5nID0gbnVsbClcclxuXHRcdHtcclxuXHRcdFx0dmFyIG1pbiA9IFZlY3RvcjIuTWluKG9yaWdpbiwgZGVzdGluYXRpb24pO1xyXG5cdFx0XHR2YXIgbWF4ID0gVmVjdG9yMi5NYXgob3JpZ2luLCBkZXN0aW5hdGlvbik7XHJcblxyXG5cdFx0XHR2YXIgd3JhcCA9IG5ldyBSZWN0YW5nbGVGKG1pbiwgbWF4IC0gbWluKTtcclxuXHRcdFx0dmFyIGJveGVzID0gdGhpcy5GaW5kKHdyYXAuWCwgd3JhcC5ZLCB3cmFwLldpZHRoLCB3cmFwLkhlaWdodCk7XHJcblxyXG5cdFx0XHRpZiAoaWdub3JpbmcgIT0gbnVsbClcclxuXHRcdFx0e1xyXG5cdFx0XHRcdGJveGVzID0gU3lzdGVtLkxpbnEuRW51bWVyYWJsZS5FeGNlcHQ8Z2xvYmFsOjpIdW1wZXIuSUJveD4oYm94ZXMsaWdub3JpbmcpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRJSGl0IG5lYXJlc3QgPSBudWxsO1xyXG5cclxuXHRcdFx0Zm9yZWFjaCAodmFyIG90aGVyIGluIGJveGVzKVxyXG5cdFx0XHR7XHJcblx0XHRcdFx0dmFyIGhpdCA9IEh1bXBlci5IaXQuUmVzb2x2ZShvcmlnaW4sIGRlc3RpbmF0aW9uLCBvdGhlcik7XHJcblxyXG5cdFx0XHRcdGlmIChoaXQgIT0gbnVsbCAmJiAobmVhcmVzdCA9PSBudWxsIHx8IGhpdC5Jc05lYXJlc3QobmVhcmVzdCxvcmlnaW4pKSlcclxuXHRcdFx0XHR7XHJcblx0XHRcdFx0XHRuZWFyZXN0ID0gaGl0O1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0cmV0dXJuIG5lYXJlc3Q7XHJcblx0XHR9XHJcblxyXG5cdFx0cHVibGljIElIaXQgSGl0KFJlY3RhbmdsZUYgb3JpZ2luLCBSZWN0YW5nbGVGIGRlc3RpbmF0aW9uLCBJRW51bWVyYWJsZTxJQm94PiBpZ25vcmluZyA9IG51bGwpXHJcblx0XHR7XHJcblx0XHRcdHZhciB3cmFwID0gbmV3IFJlY3RhbmdsZUYob3JpZ2luLCBkZXN0aW5hdGlvbik7XHJcblx0XHRcdHZhciBib3hlcyA9IHRoaXMuRmluZCh3cmFwLlgsIHdyYXAuWSwgd3JhcC5XaWR0aCwgd3JhcC5IZWlnaHQpO1xyXG5cclxuXHRcdFx0aWYgKGlnbm9yaW5nICE9IG51bGwpXHJcblx0XHRcdHtcclxuXHRcdFx0XHRib3hlcyA9IFN5c3RlbS5MaW5xLkVudW1lcmFibGUuRXhjZXB0PGdsb2JhbDo6SHVtcGVyLklCb3g+KGJveGVzLGlnbm9yaW5nKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0SUhpdCBuZWFyZXN0ID0gbnVsbDtcclxuXHJcblx0XHRcdGZvcmVhY2ggKHZhciBvdGhlciBpbiBib3hlcylcclxuXHRcdFx0e1xyXG5cdFx0XHRcdHZhciBoaXQgPSBIdW1wZXIuSGl0LlJlc29sdmUob3JpZ2luLCBkZXN0aW5hdGlvbiwgb3RoZXIpO1xyXG5cclxuXHRcdFx0XHRpZiAoaGl0ICE9IG51bGwgJiYgKG5lYXJlc3QgPT0gbnVsbCB8fCBoaXQuSXNOZWFyZXN0KG5lYXJlc3QsIG9yaWdpbi5Mb2NhdGlvbikpKVxyXG5cdFx0XHRcdHtcclxuXHRcdFx0XHRcdG5lYXJlc3QgPSBoaXQ7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRyZXR1cm4gbmVhcmVzdDtcclxuXHRcdH1cclxuXHJcblx0XHQjZW5kcmVnaW9uXHJcblxyXG5cdFx0I3JlZ2lvbiBNb3ZlbWVudHNcclxuXHJcblx0XHRwdWJsaWMgSU1vdmVtZW50IFNpbXVsYXRlKEJveCBib3gsIGZsb2F0IHgsIGZsb2F0IHksIEZ1bmM8SUNvbGxpc2lvbiwgSUNvbGxpc2lvblJlc3BvbnNlPiBmaWx0ZXIpXHJcblx0XHR7XHJcblx0XHRcdHZhciBvcmlnaW4gPSBib3guQm91bmRzO1xyXG5cdFx0XHR2YXIgZGVzdGluYXRpb24gPSBuZXcgUmVjdGFuZ2xlRih4LCB5LCBib3guV2lkdGgsIGJveC5IZWlnaHQpO1xyXG5cclxuXHRcdFx0dmFyIGhpdHMgPSBuZXcgTGlzdDxJSGl0PigpO1xyXG5cclxuXHRcdFx0dmFyIHJlc3VsdCA9IG5ldyBNb3ZlbWVudCgpXHJcblx0XHRcdHtcclxuXHRcdFx0XHRPcmlnaW4gPSBvcmlnaW4sXHJcblx0XHRcdFx0R29hbCA9IGRlc3RpbmF0aW9uLFxyXG5cdFx0XHRcdERlc3RpbmF0aW9uID0gdGhpcy5TaW11bGF0ZShoaXRzLCBnbG9iYWw6OkJyaWRnZS5TY3JpcHQuQ2FsbEZvcihuZXcgTGlzdDxJQm94PigpLChfbzEpPT57X28xLkFkZChib3gpO3JldHVybiBfbzE7fSksIGJveCwgb3JpZ2luLCBkZXN0aW5hdGlvbiwgKGdsb2JhbDo6U3lzdGVtLkZ1bmM8Z2xvYmFsOjpIdW1wZXIuSUNvbGxpc2lvbiwgZ2xvYmFsOjpIdW1wZXIuUmVzcG9uc2VzLklDb2xsaXNpb25SZXNwb25zZT4pZmlsdGVyKSxcclxuXHRcdFx0XHRIaXRzID0gaGl0cyxcclxuXHRcdFx0fTtcclxuXHJcblx0XHRcdHJldHVybiByZXN1bHQ7XHJcblx0XHR9XHJcblxyXG5cdFx0cHJpdmF0ZSBSZWN0YW5nbGVGIFNpbXVsYXRlKExpc3Q8SUhpdD4gaGl0cywgTGlzdDxJQm94PiBpZ25vcmluZywgQm94IGJveCwgUmVjdGFuZ2xlRiBvcmlnaW4sIFJlY3RhbmdsZUYgZGVzdGluYXRpb24sIEZ1bmM8SUNvbGxpc2lvbiwgSUNvbGxpc2lvblJlc3BvbnNlPiBmaWx0ZXIpXHJcblx0XHR7XHJcblx0XHRcdHZhciBuZWFyZXN0ID0gdGhpcy5IaXQob3JpZ2luLCBkZXN0aW5hdGlvbiwgaWdub3JpbmcpO1xyXG5cdFx0XHRcdFxyXG5cdFx0XHRpZiAobmVhcmVzdCAhPSBudWxsKVxyXG5cdFx0XHR7XHJcblx0XHRcdFx0aGl0cy5BZGQobmVhcmVzdCk7XHJcblxyXG5cdFx0XHRcdHZhciBpbXBhY3QgPSBuZXcgUmVjdGFuZ2xlRihuZWFyZXN0LlBvc2l0aW9uLCBvcmlnaW4uU2l6ZSk7XHJcblx0XHRcdFx0dmFyIGNvbGxpc2lvbiA9IG5ldyBDb2xsaXNpb24oKSB7IEJveCA9IGJveCwgSGl0ID0gbmVhcmVzdCwgR29hbCA9IGRlc3RpbmF0aW9uLCBPcmlnaW4gPSBvcmlnaW4gfTtcclxuXHRcdFx0XHR2YXIgcmVzcG9uc2UgPSBmaWx0ZXIoY29sbGlzaW9uKTtcclxuXHJcblx0XHRcdFx0aWYgKHJlc3BvbnNlICE9IG51bGwgJiYgZGVzdGluYXRpb24gIT0gcmVzcG9uc2UuRGVzdGluYXRpb24pXHJcblx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0aWdub3JpbmcuQWRkKG5lYXJlc3QuQm94KTtcclxuXHRcdFx0XHRcdHJldHVybiB0aGlzLlNpbXVsYXRlKGhpdHMsIGlnbm9yaW5nLCBib3gsIGltcGFjdCwgcmVzcG9uc2UuRGVzdGluYXRpb24sIChnbG9iYWw6OlN5c3RlbS5GdW5jPGdsb2JhbDo6SHVtcGVyLklDb2xsaXNpb24sIGdsb2JhbDo6SHVtcGVyLlJlc3BvbnNlcy5JQ29sbGlzaW9uUmVzcG9uc2U+KWZpbHRlcik7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRyZXR1cm4gZGVzdGluYXRpb247XHJcblx0XHR9XHJcblxyXG5cdFx0I2VuZHJlZ2lvblxyXG5cclxuXHRcdCNyZWdpb24gRGlhZ25vc3RpY3NcclxuXHJcblx0XHRwdWJsaWMgdm9pZCBEcmF3RGVidWcoaW50IHgsIGludCB5LCBpbnQgdywgaW50IGgsIEFjdGlvbjxpbnQsaW50LGludCxpbnQsZmxvYXQ+IGRyYXdDZWxsLCBBY3Rpb248SUJveD4gZHJhd0JveCwgQWN0aW9uPHN0cmluZyxpbnQsaW50LCBmbG9hdD4gZHJhd1N0cmluZylcclxuXHRcdHtcclxuXHRcdFx0Ly8gRHJhd2luZyBib3hlc1xyXG5cdFx0XHR2YXIgYm94ZXMgPSB0aGlzLmdyaWQuUXVlcnlCb3hlcyh4LCB5LCB3LCBoKTtcclxuXHRcdFx0Zm9yZWFjaCAodmFyIGJveCBpbiBib3hlcylcclxuXHRcdFx0e1xyXG5cdFx0XHRcdGRyYXdCb3goYm94KTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Ly8gRHJhd2luZyBjZWxsc1xyXG5cdFx0XHR2YXIgY2VsbHMgPSB0aGlzLmdyaWQuUXVlcnlDZWxscyh4LCB5LCB3LCBoKTtcclxuXHRcdFx0Zm9yZWFjaCAodmFyIGNlbGwgaW4gY2VsbHMpXHJcblx0XHRcdHtcclxuXHRcdFx0XHR2YXIgY291bnQgPSBjZWxsLkNvdW50KCk7XHJcblx0XHRcdFx0dmFyIGFscGhhID0gY291bnQgPiAwID8gMWYgOiAwLjRmO1xyXG5cdFx0XHRcdGRyYXdDZWxsKChpbnQpY2VsbC5Cb3VuZHMuWCwgKGludCljZWxsLkJvdW5kcy5ZLCAoaW50KWNlbGwuQm91bmRzLldpZHRoLCAoaW50KWNlbGwuQm91bmRzLkhlaWdodCwgYWxwaGEpO1xyXG5cdFx0XHRcdGRyYXdTdHJpbmcoY291bnQuVG9TdHJpbmcoKSwgKGludCljZWxsLkJvdW5kcy5DZW50ZXIuWCwgKGludCljZWxsLkJvdW5kcy5DZW50ZXIuWSxhbHBoYSk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHQjZW5kcmVnaW9uXHJcblx0fVxyXG59XHJcblxyXG4iLCJ1c2luZyBCcmlkZ2UuSHRtbDU7XHJcbnVzaW5nIEp1aWNlQm94RW5naW5lLk1hdGg7XHJcbnVzaW5nIEp1aWNlQm94RW5naW5lLlJlc291cmNlcztcclxudXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLkxpbnE7XHJcbnVzaW5nIFN5c3RlbS5UZXh0O1xyXG51c2luZyBTeXN0ZW0uVGhyZWFkaW5nLlRhc2tzO1xyXG5cclxubmFtZXNwYWNlIEp1aWNlQm94RW5naW5lLkdyYXBoaWNzXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBGb250IDogSVJlc291cmNlXHJcbiAgICB7XHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgICAgIC8vLyBOYW1lIG9mIHRoaXMgcmVzb3VyY2UuXHJcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cclxuICAgICAgICBwdWJsaWMgc3RyaW5nIE5hbWUgeyBnZXQ7IHNldDsgfVxyXG5cclxuICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8vIFRydWUgaWYgdGhlIHJlc291cmNlIGlzIGxvYWRlZCwgZmFsc2Ugb3RoZXJ3aXNlLlxyXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgcHVibGljIGJvb2wgTG9hZGVkIHsgZ2V0OyBzZXQ7IH1cclxuXHJcbiAgICAgICAgcHVibGljIFRleHR1cmUyRCBUZXh0dXJlIHsgZ2V0OyBwcml2YXRlIHNldDsgfVxyXG5cclxuICAgICAgICAvLyBwcml2YXRlIG1lbWJlcnMgb2YgdGhpcyBjbGFzcy5cclxuICAgICAgICBwcml2YXRlIGJ5dGUgX2JwcDtcclxuICAgICAgICBwcml2YXRlIGJ5dGUgX2NoYXJPZmZzZXQ7XHJcbiAgICAgICAgcHJpdmF0ZSBieXRlW10gX2NoYXJXaWR0aHM7XHJcbiAgICAgICAgcHJpdmF0ZSBpbnQgX2NlbGxXaWR0aDtcclxuICAgICAgICBwcml2YXRlIGludCBfY2VsbEhlaWdodDtcclxuICAgICAgICBwcml2YXRlIGludCBfcm93Q291bnQ7XHJcbiAgICAgICAgcHJpdmF0ZSBieXRlW10gX2JpdHM7XHJcblxyXG4gICAgICAgIHB1YmxpYyBGb250KGludCB3aWR0aCwgaW50IGhlaWdodCwgYnl0ZSBicHAsIGJ5dGUgY2hhck9mZnNldCwgYnl0ZVtdIGNoYXJXaWR0aHMsIGludCBjZWxsV2lkdGgsIGludCBjZWxsSGVpZ2h0LCBieXRlW10gYml0cylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIF9icHAgPSBicHA7XHJcbiAgICAgICAgICAgIF9jaGFyT2Zmc2V0ID0gY2hhck9mZnNldDtcclxuICAgICAgICAgICAgX2NoYXJXaWR0aHMgPSBjaGFyV2lkdGhzO1xyXG4gICAgICAgICAgICBfY2VsbFdpZHRoID0gY2VsbFdpZHRoO1xyXG4gICAgICAgICAgICBfY2VsbEhlaWdodCA9IGNlbGxIZWlnaHQ7XHJcbiAgICAgICAgICAgIF9yb3dDb3VudCA9IHdpZHRoIC8gX2NlbGxXaWR0aDtcclxuICAgICAgICAgICAgX2JpdHMgPSBiaXRzO1xyXG5cclxuICAgICAgICAgICAgVGV4dHVyZSA9IG5ldyBUZXh0dXJlMkQod2lkdGgsIGhlaWdodCwgX2JpdHMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgICAgIC8vLyBHZW5lcmF0ZSBhIGZvbnQgdmVydGV4IGJ1ZmZlci5cclxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cInRleHRcIj5UaGUgdGV4dC48L3BhcmFtPlxyXG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cIm9mZnNldFwiPlRoZSBvZmZzZXQgZnJvbSB0aGUgb3JpZ2luLiAob2JqZWN0IHNwYWNlKTwvcGFyYW0+XHJcbiAgICAgICAgLy8vIDxyZXR1cm5zPkEgZmxvYXQgYnVmZmVyIHdpdGggdmVydGV4IGRhdGEuPC9yZXR1cm5zPlxyXG4gICAgICAgIHB1YmxpYyBmbG9hdFtdIEdlbmVyYXRlQnVmZmVyKHN0cmluZyB0ZXh0LCBDb2xvcjMyIGNvbG9yLCBWZWN0b3IzIG9mZnNldClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8vIEFsbCB2ZXJ0ZXggZGF0YS5cclxuICAgICAgICAgICAgLy8gUG9zaXRpb24gMyBmbG9hdHMuXHJcbiAgICAgICAgICAgIC8vIFRleCBDb29yZCAyIGZsb2F0cy5cclxuICAgICAgICAgICAgLy8gQ29sb3IgNCBmbG9hdHMuXHJcbiAgICAgICAgICAgIC8vIDYgdmVydHMgcGVyIGxldHRlci5cclxuICAgICAgICAgICAgZmxvYXRbXSByYXdEYXRhID0gbmV3IGZsb2F0W3RleHQuTGVuZ3RoICogOSAqIDZdO1xyXG5cclxuICAgICAgICAgICAgVmVjdG9yMyBjdXJQb3MgPSBvZmZzZXQ7XHJcblxyXG4gICAgICAgICAgICBmb3IgKGludCBpID0gMDsgaSA8IHRleHQuTGVuZ3RoOyArK2kpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGNoYXIgYyA9IHRleHRbaV07XHJcbiAgICAgICAgICAgICAgICBpZiAoYyA8IF9jaGFyT2Zmc2V0KVxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG5cclxuICAgICAgICAgICAgICAgIGludCBubyA9IGMgLSBfY2hhck9mZnNldDtcclxuICAgICAgICAgICAgICAgIGZsb2F0IHRleFdpZHRoID0gX2NoYXJXaWR0aHNbbm9dO1xyXG4gICAgICAgICAgICAgICAgZmxvYXQgdGV4SGVpZ2h0ID0gX2NlbGxIZWlnaHQ7XHJcblxyXG4gICAgICAgICAgICAgICAgaW50IHlDZWxsID0gbm8gLyAoVGV4dHVyZS5XaWR0aCAvIF9jZWxsV2lkdGgpO1xyXG4gICAgICAgICAgICAgICAgaW50IHhDZWxsID0gbm8gLSB5Q2VsbCooVGV4dHVyZS5XaWR0aCAvIF9jZWxsV2lkdGgpO1xyXG5cclxuICAgICAgICAgICAgICAgIGZsb2F0IGNoYXJUZXhXaWR0aCA9IChmbG9hdClfY2hhcldpZHRoc1tub10gLyBUZXh0dXJlLldpZHRoO1xyXG4gICAgICAgICAgICAgICAgZmxvYXQgY2hhclRleEhlaWdodCA9IChmbG9hdClfY2VsbEhlaWdodCAvIFRleHR1cmUuSGVpZ2h0O1xyXG5cclxuICAgICAgICAgICAgICAgIGZsb2F0IHRleFggPSAoeENlbGwpICogKChmbG9hdClfY2VsbFdpZHRoIC8gVGV4dHVyZS5XaWR0aCk7XHJcbiAgICAgICAgICAgICAgICBmbG9hdCB0ZXhZID0gKHlDZWxsICsgMSkgKiAoKGZsb2F0KV9jZWxsSGVpZ2h0IC8gVGV4dHVyZS5IZWlnaHQpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIExvd2VyIExlZnRcclxuICAgICAgICAgICAgICAgIEJ1ZmZlclZlcnRleChyYXdEYXRhLCBpICogOSAqIDYgKyAwICogOSxcclxuICAgICAgICAgICAgICAgICAgICBuZXcgVmVjdG9yMyhjdXJQb3MuWCwgY3VyUG9zLlksIGN1clBvcy5aKSxcclxuICAgICAgICAgICAgICAgICAgICBuZXcgVmVjdG9yMih0ZXhYLCB0ZXhZKSxcclxuICAgICAgICAgICAgICAgICAgICBjb2xvcik7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gTG93ZXIgUmlnaHRcclxuICAgICAgICAgICAgICAgIEJ1ZmZlclZlcnRleChyYXdEYXRhLCBpICogOSAqIDYgKyAxICogOSxcclxuICAgICAgICAgICAgICAgICAgICBuZXcgVmVjdG9yMyhjdXJQb3MuWCArIHRleFdpZHRoLCBjdXJQb3MuWSwgY3VyUG9zLlopLFxyXG4gICAgICAgICAgICAgICAgICAgIG5ldyBWZWN0b3IyKHRleFggKyBjaGFyVGV4V2lkdGgsIHRleFkpLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbG9yKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBVcHBlciBMZWZ0XHJcbiAgICAgICAgICAgICAgICBCdWZmZXJWZXJ0ZXgocmF3RGF0YSwgaSAqIDkgKiA2ICsgMiAqIDksXHJcbiAgICAgICAgICAgICAgICAgICAgbmV3IFZlY3RvcjMoY3VyUG9zLlgsIGN1clBvcy5ZICsgdGV4SGVpZ2h0LCBjdXJQb3MuWiksXHJcbiAgICAgICAgICAgICAgICAgICAgbmV3IFZlY3RvcjIodGV4WCwgdGV4WSAtIGNoYXJUZXhIZWlnaHQpLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbG9yKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBMb3dlciBSaWdodFxyXG4gICAgICAgICAgICAgICAgQnVmZmVyVmVydGV4KHJhd0RhdGEsIGkgKiA5ICogNiArIDMgKiA5LFxyXG4gICAgICAgICAgICAgICAgICAgIG5ldyBWZWN0b3IzKGN1clBvcy5YICsgdGV4V2lkdGgsIGN1clBvcy5ZLCBjdXJQb3MuWiksXHJcbiAgICAgICAgICAgICAgICAgICAgbmV3IFZlY3RvcjIodGV4WCArIGNoYXJUZXhXaWR0aCwgdGV4WSksXHJcbiAgICAgICAgICAgICAgICAgICAgY29sb3IpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIFVwcGVyIExlZnRcclxuICAgICAgICAgICAgICAgIEJ1ZmZlclZlcnRleChyYXdEYXRhLCBpICogOSAqIDYgKyA0ICogOSxcclxuICAgICAgICAgICAgICAgICAgICBuZXcgVmVjdG9yMyhjdXJQb3MuWCwgY3VyUG9zLlkgKyB0ZXhIZWlnaHQsIGN1clBvcy5aKSxcclxuICAgICAgICAgICAgICAgICAgICBuZXcgVmVjdG9yMih0ZXhYLCB0ZXhZIC0gY2hhclRleEhlaWdodCksXHJcbiAgICAgICAgICAgICAgICAgICAgY29sb3IpO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAvLyBVcHBlciBSaWdodFxyXG4gICAgICAgICAgICAgICAgQnVmZmVyVmVydGV4KHJhd0RhdGEsIGkgKiA5ICogNiArIDUgKiA5LFxyXG4gICAgICAgICAgICAgICAgICAgIG5ldyBWZWN0b3IzKGN1clBvcy5YICsgdGV4V2lkdGgsIGN1clBvcy5ZICsgdGV4SGVpZ2h0LCBjdXJQb3MuWiksXHJcbiAgICAgICAgICAgICAgICAgICAgbmV3IFZlY3RvcjIodGV4WCArIGNoYXJUZXhXaWR0aCwgdGV4WSAtIGNoYXJUZXhIZWlnaHQpLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbG9yKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBPZmZzZXQgZm9yIHRoZSBuZXh0IGNoYXJhY3Rlci5cclxuICAgICAgICAgICAgICAgIGN1clBvcyA9IG5ldyBWZWN0b3IzKGN1clBvcy5YICsgdGV4V2lkdGgsIGN1clBvcy5ZLCBjdXJQb3MuWik7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiByYXdEYXRhO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8vIEdldHMgdGhlIHdpZHRoIG9mIGhvdyBiaWcgdGhlIGdpdmVuIHN0cmluZyB3aWxsIGJlLlxyXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwidGV4dFwiPlRoZSB0ZXh0PC9wYXJhbT5cclxuICAgICAgICAvLy8gPHJldHVybnM+VGhlIHdpZHRoIG9mIHRoZSBzdHJpbmcuPC9yZXR1cm5zPlxyXG4gICAgICAgIHB1YmxpYyBmbG9hdCBHZXRXaWR0aChzdHJpbmcgdGV4dClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZsb2F0IHdpZHRoID0gMC4wZjtcclxuXHJcbiAgICAgICAgICAgIGZvciAoaW50IGkgPSAwOyBpIDwgdGV4dC5MZW5ndGg7ICsraSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY2hhciBjID0gdGV4dFtpXTtcclxuICAgICAgICAgICAgICAgIGlmIChjIDwgX2NoYXJPZmZzZXQpXHJcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XHJcblxyXG4gICAgICAgICAgICAgICAgaW50IG5vID0gYyAtIF9jaGFyT2Zmc2V0O1xyXG4gICAgICAgICAgICAgICAgZmxvYXQgdGV4V2lkdGggPSBfY2hhcldpZHRoc1tub107XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gT2Zmc2V0IGZvciB0aGUgbmV4dCBjaGFyYWN0ZXIuXHJcbiAgICAgICAgICAgICAgICB3aWR0aCArPSB0ZXhXaWR0aDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHdpZHRoO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSB2b2lkIEJ1ZmZlclZlcnRleChmbG9hdFtdIGJ1ZmZlciwgaW50IG9mZnNldCwgVmVjdG9yMyBwb3MsIFZlY3RvcjIgdGV4Q29vcmQsIENvbG9yMzIgY29sb3IpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAvLyBQb3NcclxuICAgICAgICAgICAgYnVmZmVyW29mZnNldCArIDBdID0gcG9zLlg7XHJcbiAgICAgICAgICAgIGJ1ZmZlcltvZmZzZXQgKyAxXSA9IHBvcy5ZO1xyXG4gICAgICAgICAgICBidWZmZXJbb2Zmc2V0ICsgMl0gPSBwb3MuWjtcclxuICAgICAgICAgICAgLy8gVGV4XHJcbiAgICAgICAgICAgIGJ1ZmZlcltvZmZzZXQgKyAzXSA9IHRleENvb3JkLlg7XHJcbiAgICAgICAgICAgIGJ1ZmZlcltvZmZzZXQgKyA0XSA9IHRleENvb3JkLlk7XHJcbiAgICAgICAgICAgIC8vIENvbCBcclxuICAgICAgICAgICAgYnVmZmVyW29mZnNldCArIDVdID0gY29sb3IuUjtcclxuICAgICAgICAgICAgYnVmZmVyW29mZnNldCArIDZdID0gY29sb3IuRztcclxuICAgICAgICAgICAgYnVmZmVyW29mZnNldCArIDddID0gY29sb3IuQjtcclxuICAgICAgICAgICAgYnVmZmVyW29mZnNldCArIDhdID0gY29sb3IuQTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwidXNpbmcgSnVpY2VCb3hFbmdpbmUuUmVzb3VyY2VzO1xyXG51c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uSU87XHJcbnVzaW5nIFN5c3RlbS5MaW5xO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxudXNpbmcgU3lzdGVtLlRocmVhZGluZy5UYXNrcztcclxuXHJcbm5hbWVzcGFjZSBKdWljZUJveEVuZ2luZS5HcmFwaGljc1xyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgRm9udFJlc291cmNlTG9hZGVyIDogUmVzb3VyY2VMb2FkZXJcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgRm9udFJlc291cmNlTG9hZGVyKHN0cmluZyBuYW1lLCBzdHJpbmcgZXh0ZW5zaW9uKVxyXG4gICAgICAgICAgICA6IGJhc2UobmFtZSwgZXh0ZW5zaW9uKVxyXG4gICAgICAgIHtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8vIExvYWRzIGEgLmJmZiBmaWxlLlxyXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwicGF0aFwiPjwvcGFyYW0+XHJcbiAgICAgICAgLy8vIDxyZXR1cm5zPjwvcmV0dXJucz5cclxuICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgSVJlc291cmNlIExvYWQoc3RyaW5nIHBhdGgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpbnQgdGV4dHVyZVdpZHRoO1xyXG4gICAgICAgICAgICBpbnQgdGV4dHVyZUhlaWdodDtcclxuICAgICAgICAgICAgYnl0ZSBicHA7XHJcbiAgICAgICAgICAgIGJ5dGUgY2hhck9mZnNldDtcclxuICAgICAgICAgICAgYnl0ZVtdIGNoYXJXaWR0aHM7XHJcbiAgICAgICAgICAgIGludCBjZWxsV2lkdGg7XHJcbiAgICAgICAgICAgIGludCBjZWxsSGVpZ2h0O1xyXG4gICAgICAgICAgICBieXRlW10gYml0cztcclxuXHJcbiAgICAgICAgICAgIHVzaW5nIChGaWxlU3RyZWFtIGZpbGVzdHJlYW0gPSBuZXcgRmlsZVN0cmVhbShwYXRoLCBGaWxlTW9kZS5PcGVuKSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgQmluYXJ5UmVhZGVyIHJlYWRlciA9IG5ldyBCaW5hcnlSZWFkZXIoZmlsZXN0cmVhbSk7XHJcblxyXG4gICAgICAgICAgICAgICAgYnl0ZSBoMCA9IHJlYWRlci5SZWFkQnl0ZSgpO1xyXG4gICAgICAgICAgICAgICAgYnl0ZSBoMSA9IHJlYWRlci5SZWFkQnl0ZSgpO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAvLyBGaXJzdCB0d28gYnl0ZXMgaW4gdGhlIC5iZmYgZmlsZSBzaG91bGQgYmUgMHhCRiBhbmQgMHhGMi5cclxuICAgICAgICAgICAgICAgIGlmIChoMCAhPSAweEJGIHx8IGgxICE9IDB4RjIpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgQ29uc29sZS5Xcml0ZUxpbmUoXCJVbmFibGUgdG8gbG9hZCBmb250IGZvcm1hdC4gTWFrZSBzdXJlIGl0IGlzIGEgLmJmZiBmaWxlLiBUaGlzIGZpbGUgc2hvdWxkIGJlIGdlbmVyYXRlZCBmcm9tIENCRkcuXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHRleHR1cmVXaWR0aCA9IHJlYWRlci5SZWFkSW50MzIoKTtcclxuICAgICAgICAgICAgICAgIHRleHR1cmVIZWlnaHQgPSByZWFkZXIuUmVhZEludDMyKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgY2VsbFdpZHRoID0gcmVhZGVyLlJlYWRJbnQzMigpO1xyXG4gICAgICAgICAgICAgICAgY2VsbEhlaWdodCA9IHJlYWRlci5SZWFkSW50MzIoKTtcclxuXHJcbiAgICAgICAgICAgICAgICBicHAgPSByZWFkZXIuUmVhZEJ5dGUoKTtcclxuXHJcbiAgICAgICAgICAgICAgICBjaGFyT2Zmc2V0ID0gcmVhZGVyLlJlYWRCeXRlKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgY2hhcldpZHRocyA9IG5ldyBieXRlWzI1Nl07XHJcbiAgICAgICAgICAgICAgICBmb3IoaW50IGkgPSAwOyBpIDwgMjU2OyArK2kpXHJcbiAgICAgICAgICAgICAgICAgICAgY2hhcldpZHRoc1tpXSA9IHJlYWRlci5SZWFkQnl0ZSgpO1xyXG5cclxuICAgICAgICAgICAgICAgIGludCBiaXRMZW4gPSAodGV4dHVyZUhlaWdodCAqIHRleHR1cmVXaWR0aCkgKiAoYnBwIC8gOCk7XHJcbiAgICAgICAgICAgICAgICBiaXRzID0gbmV3IGJ5dGVbYml0TGVuXTtcclxuICAgICAgICAgICAgICAgIGJpdHMgPSByZWFkZXIuUmVhZEJ5dGVzKGJpdExlbik7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgRm9udCh0ZXh0dXJlV2lkdGgsIHRleHR1cmVIZWlnaHQsIGJwcCwgY2hhck9mZnNldCwgY2hhcldpZHRocywgY2VsbFdpZHRoLCBjZWxsSGVpZ2h0LCBiaXRzKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwidXNpbmcgSnVpY2VCb3hFbmdpbmUuUmVzb3VyY2VzO1xyXG51c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uTGlucTtcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcbnVzaW5nIFN5c3RlbS5UaHJlYWRpbmcuVGFza3M7XHJcblxyXG5uYW1lc3BhY2UgSnVpY2VCb3hFbmdpbmUuR3JhcGhpY3Ncclxue1xyXG4gICAgcHVibGljIGNsYXNzIEdyYXlTY2FsZSA6IFBvc3RQcm9jZXNzaW5nRWZmZWN0XHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIEdyYXlTY2FsZShSZXNvdXJjZU1hbmFnZXIgcmVzb3VyY2VNYW5hZ2VyKVxyXG4gICAgICAgICAgICA6IGJhc2UoXCJHcmF5U2NhbGVcIilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIExvYWQocmVzb3VyY2VNYW5hZ2VyKTtcclxuICAgICAgICAgICAgX2NvbW1hbmQuRGF0YS5BZGQoXCJ1X3RleHR1cmVcIiwgbnVsbCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgdm9pZCBSZW5kZXIoVGV4dHVyZTJEIHNvdXJjZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIF9jb21tYW5kLkRhdGFbXCJ1X3RleHR1cmVcIl0gPSBzb3VyY2U7XHJcbiAgICAgICAgICAgIEdyYXBoaWNzTWFuYWdlci5JbnN0YW5jZS5Db250ZXh0LkNvbW1hbmQoX2NvbW1hbmQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJ1c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uTGlucTtcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcbnVzaW5nIFN5c3RlbS5UaHJlYWRpbmcuVGFza3M7XHJcbnVzaW5nIEp1aWNlQm94RW5naW5lLk1hdGg7XHJcbnVzaW5nIEp1aWNlQm94RW5naW5lLlJlc291cmNlcztcclxuXHJcbm5hbWVzcGFjZSBKdWljZUJveEVuZ2luZS5HcmFwaGljcy5HVUlcclxue1xyXG4gICAgcHVibGljIGNsYXNzIEdVSVRleHQgOiBHVUlFbGVtZW50XHJcbiAgICB7XHJcbiAgICAgICAgcHJpdmF0ZSBzdHJpbmcgX3RleHQ7XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdHJpbmcgVGV4dFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZ2V0IHsgcmV0dXJuIF90ZXh0OyB9XHJcbiAgICAgICAgICAgIHNldFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZighX3RleHQuRXF1YWxzKHZhbHVlKSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBfdGV4dCA9IHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgIENvbW1hbmQuVmVydGV4QnVmZmVyLlVwZGF0ZURhdGEoRm9udC5HZW5lcmF0ZUJ1ZmZlcihfdGV4dCwgbmV3IE1hdGguQ29sb3IzMigxLjBmLCAxLjBmLCAxLjBmLCAxLjBmKSwgbmV3IE1hdGguVmVjdG9yMygpKSk7ICAgXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBGb250IEZvbnQgeyBnZXQ7IHNldDsgfVxyXG5cclxuICAgICAgICBwdWJsaWMgR1VJVGV4dChSZXNvdXJjZU1hbmFnZXIgbWFuYWdlcilcclxuICAgICAgICAgICAgOiBiYXNlKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIENvbW1hbmQgPSBuZXcgR3JhcGhpY3NDb21tYW5kKCk7XHJcbiAgICAgICAgICAgIENvbW1hbmQuUHJvZ3JhbSA9IG1hbmFnZXIuTG9hZDxTaGFkZXJQcm9ncmFtPihcIlNoYWRlcnMvRm9udC52ZXJ0XCIpO1xyXG4gICAgICAgICAgICBGb250ID0gbWFuYWdlci5Mb2FkPEZvbnQ+KFwiQXJpYWwuYmZmXCIpO1xyXG5cclxuICAgICAgICAgICAgQ29tbWFuZC5WZXJ0ZXhCdWZmZXIgPSBuZXcgVmVydGV4QnVmZmVyKCk7XHJcbiAgICAgICAgICAgIENvbW1hbmQuVmVydGV4QnVmZmVyLlNldEF0dHJpYnV0ZShuZXcgVmVydGV4QXR0cmlidXRlKFwiYV9wb3NcIiwgMywgZmFsc2UsIDM2LCAwKSk7XHJcbiAgICAgICAgICAgIENvbW1hbmQuVmVydGV4QnVmZmVyLlNldEF0dHJpYnV0ZShuZXcgVmVydGV4QXR0cmlidXRlKFwiYV90ZXhcIiwgMiwgZmFsc2UsIDM2LCAxMikpO1xyXG4gICAgICAgICAgICBDb21tYW5kLlZlcnRleEJ1ZmZlci5TZXRBdHRyaWJ1dGUobmV3IFZlcnRleEF0dHJpYnV0ZShcImFfY29sXCIsIDQsIGZhbHNlLCAzNiwgMjApKTtcclxuXHJcbiAgICAgICAgICAgIENvbW1hbmQuRGF0YS5BZGQoXCJ0ZXh0dXJlXCIsIEZvbnQuVGV4dHVyZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIEJyaWRnZS5XZWJHTDtcclxudXNpbmcgSnVpY2VCb3hFbmdpbmUuUmVzb3VyY2VzO1xyXG51c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uTGlucTtcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcbnVzaW5nIFN5c3RlbS5UaHJlYWRpbmcuVGFza3M7XHJcblxyXG5uYW1lc3BhY2UgSnVpY2VCb3hFbmdpbmUuR3JhcGhpY3Ncclxue1xyXG4gICAgcHVibGljIGNsYXNzIFRleHR1cmUyRCA6IElSZXNvdXJjZVxyXG4gICAge1xyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cclxuICAgICAgICAvLy8gV2lkdGggaW4gcGl4ZWxzLlxyXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgcHVibGljIGludCBXaWR0aCB7IGdldDsgc2V0OyB9XHJcblxyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cclxuICAgICAgICAvLy8gSGVpZ2h0IGluIHBpeGVscy5cclxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgICAgIHB1YmxpYyBpbnQgSGVpZ2h0IHsgZ2V0OyBzZXQ7IH1cclxuXHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgICAgIC8vLyBUaGUgcGxhdGZvcm0gc3BlY2lmaWMgdGV4dHVyZS5cclxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgICAgIHB1YmxpYyBXZWJHTFRleHR1cmUgVGV4dHVyZSB7IGdldDsgc2V0OyB9XHJcblxyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cclxuICAgICAgICAvLy8gVGhlIHRleHR1cmUgbmFtZS5cclxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgICAgIHB1YmxpYyBzdHJpbmcgTmFtZSB7IGdldDsgc2V0OyB9XHJcblxyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cclxuICAgICAgICAvLy8gVHJ1ZSBpZiB0aGUgdGV4dHVyZSBpcyBsb2FkZWQuXHJcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cclxuICAgICAgICBwdWJsaWMgYm9vbCBMb2FkZWQgeyBnZXQ7IHNldDsgfVxyXG5cclxuICAgICAgICBwdWJsaWMgVGV4dHVyZTJEKClcclxuICAgICAgICB7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIFRleHR1cmUyRChpbnQgd2lkdGgsIGludCBoZWlnaHQsIGJ5dGVbXSBkYXRhKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgV2lkdGggPSB3aWR0aDtcclxuICAgICAgICAgICAgSGVpZ2h0ID0gaGVpZ2h0O1xyXG4gICAgICAgICAgICBUZXh0dXJlID0gR3JhcGhpY3NNYW5hZ2VyLkluc3RhbmNlLkNvbnRleHQuQ3JlYXRlVGV4dHVyZSh3aWR0aCwgaGVpZ2h0LCBkYXRhKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwidXNpbmcgQnJpZGdlLldlYkdMO1xyXG51c2luZyBKdWljZUJveEVuZ2luZS5SZXNvdXJjZXM7XHJcbnVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5MaW5xO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxudXNpbmcgU3lzdGVtLlRocmVhZGluZy5UYXNrcztcclxuXHJcbm5hbWVzcGFjZSBKdWljZUJveEVuZ2luZS5HcmFwaGljc1xyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgU2hhZGVyUHJvZ3JhbSA6IElSZXNvdXJjZVxyXG4gICAge1xyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cclxuICAgICAgICAvLy8gVGhlIG5hbWUgb2YgdGhpcyBzaGFkZXIsIG1vc3RseSBmb3IgZGVidWdnaW5nIHB1cnBvc2VzLlxyXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgcHVibGljIHN0cmluZyBOYW1lIHsgZ2V0OyBzZXQ7IH1cclxuXHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgICAgIC8vLyBUaGUgcGxhdGZvcm0gc3BlY2lmaWMgc2hhZGVyIHByb2dyYW0uXHJcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cclxuICAgICAgICBwdWJsaWMgV2ViR0xQcm9ncmFtIFByb2dyYW0geyBnZXQ7IHByaXZhdGUgc2V0OyB9XHJcblxyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cclxuICAgICAgICAvLy8gQ2FjaGVkIHVuaWZvcm0gbG9jYXRpb25zIGZvciBmYXN0ZXIgcmVuZGVyaW5nLlxyXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgaW50ZXJuYWwgRGljdGlvbmFyeTxzdHJpbmcsIFVuaWZvcm1Mb2NhdGlvbj4gTG9jYXRpb25zIHsgZ2V0OyBwcml2YXRlIHNldDsgfVxyXG5cclxuICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8vIERlbGVnYXRlIGZvciBzZXR0aW5nIGEgdmFsdWUgaW4gdGhlIHNoYWRlci4gRG9uZSB3aXRoIGEgZGVsZWdhdGUgdG8gcHJlZmVudCBjb25zdGFudCBjaGVja2luZyBvbiB0eXBlIChpcyBWRVJZIHNsb3cgb24gd2ViKVxyXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwibG9jYXRpb25cIj5UaGUgdW5pZm9ybSBsb2NhdGlvbi48L3BhcmFtPlxyXG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cInZhbHVlXCI+VGhlIHZhbHVlIHRvIHNldC48L3BhcmFtPlxyXG4gICAgICAgIGludGVybmFsIGRlbGVnYXRlIHZvaWQgU2V0VW5pZm9ybShXZWJHTFVuaWZvcm1Mb2NhdGlvbiBsb2NhdGlvbiwgb2JqZWN0IHZhbHVlKTtcclxuXHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgICAgIC8vLyBBbGwgQ2FjaGVkIHVuaWZvcm0gc2V0dGVyIGZ1bmN0aW9ucy4gVG8gaW1wcm92ZSBwZXJmb3JtYW5jZS5cclxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgICAgIGludGVybmFsIERpY3Rpb25hcnk8c3RyaW5nLCBTZXRVbmlmb3JtPiBTZXRVbmlmb3JtRnVuY3Rpb24geyBnZXQ7IHByaXZhdGUgc2V0OyB9XHJcblxyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cclxuICAgICAgICAvLy8gSXMgdGhlIHNoYWRlciBsb2FkZWQ/XHJcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cclxuICAgICAgICBwdWJsaWMgYm9vbCBMb2FkZWQgeyBnZXQ7IHNldDsgfVxyXG5cclxuICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8vIENvbnN0cnVjdG9yLlxyXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwidmVydFNvdXJjZVwiPlRoZSB2ZXJ0ZXggc2hhZGVyIGNvZGUuPC9wYXJhbT5cclxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJmcmFnU291cmNlXCI+VGhlIGZyYWdtZW50IHNoYWRlciBjb2RlLjwvcGFyYW0+XHJcbiAgICAgICAgcHVibGljIFNoYWRlclByb2dyYW0oc3RyaW5nIHZlcnRTb3VyY2UsIHN0cmluZyBmcmFnU291cmNlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgUHJvZ3JhbSA9IEdyYXBoaWNzTWFuYWdlci5JbnN0YW5jZS5Db250ZXh0LkNvbXBpbGVTaGFkZXIodmVydFNvdXJjZSwgZnJhZ1NvdXJjZSk7XHJcbiAgICAgICAgICAgIExvY2F0aW9ucyA9IG5ldyBEaWN0aW9uYXJ5PHN0cmluZywgVW5pZm9ybUxvY2F0aW9uPigpO1xyXG4gICAgICAgICAgICBTZXRVbmlmb3JtRnVuY3Rpb24gPSBuZXcgRGljdGlvbmFyeTxzdHJpbmcsIFNldFVuaWZvcm0+KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLy8gPHN1bW1hcnk+V3JhcCBXZWJHTFVuaWZvcm1Mb2NhdGlvbiB0byBwcmV2ZW50IEJyaWRnZS5uZXQgZXJyb3JzLjwvc3VtbWFyeT5cclxuICAgICAgICBpbnRlcm5hbCBjbGFzcyBVbmlmb3JtTG9jYXRpb25cclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHB1YmxpYyBXZWJHTFVuaWZvcm1Mb2NhdGlvbiBsb2NhdGlvbjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwidXNpbmcgSnVpY2VCb3hFbmdpbmUuR3JhcGhpY3M7XHJcbnVzaW5nIEp1aWNlQm94RW5naW5lLlJlc291cmNlcztcclxudXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLklPO1xyXG51c2luZyBTeXN0ZW0uTGlucTtcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcbnVzaW5nIFN5c3RlbS5UaHJlYWRpbmcuVGFza3M7XHJcblxyXG5uYW1lc3BhY2UgSnVpY2VCb3hFbmdpbmUuR3JhcGhpY3Ncclxue1xyXG4gICAgcHVibGljIGNsYXNzIFNoYWRlclJlc291cmNlTG9hZGVyIDogUmVzb3VyY2VMb2FkZXJcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgU2hhZGVyUmVzb3VyY2VMb2FkZXIoc3RyaW5nIG5hbWUsIHN0cmluZyBleHRlbnNpb24pIFxyXG4gICAgICAgICAgICA6IGJhc2UobmFtZSwgZXh0ZW5zaW9uKVxyXG4gICAgICAgIHtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cclxuICAgICAgICAvLy8gTG9hZCBhIHNoYWRlciBwcm9ncmFtLigudmVydCBhbmQgLmZyYWcgY29tYmluYXRpb24pXHJcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cclxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJwYXRoXCI+UGF0aCB0byB0aGUgdmVydCBvciBmcmFnbWVudCBzaGFkZXIuPC9wYXJhbT5cclxuICAgICAgICAvLy8gPHJldHVybnM+QSBzaGFkZXIgbGlrZWx5IHRvIGJlIGNvbXBpbGVkLiAoaWYgYWxsIGdvZXMgd2VsbCk8L3JldHVybnM+XHJcbiAgICAgICAgcHVibGljIG92ZXJyaWRlIElSZXNvdXJjZSBMb2FkKHN0cmluZyBwYXRoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKCFwYXRoLkNvbnRhaW5zKFwiLlwiKSlcclxuICAgICAgICAgICAgICAgIHBhdGggKz0gXCIuXCI7XHJcblxyXG4gICAgICAgICAgICBzdHJpbmcgdmVydFBhdGggPSBwYXRoLlNwbGl0KG5ldyBjaGFyW10geyAnLicgfSwgU3RyaW5nU3BsaXRPcHRpb25zLlJlbW92ZUVtcHR5RW50cmllcylbMF0gKyBcIi52ZXJ0XCI7XHJcbiAgICAgICAgICAgIHN0cmluZyBmcmFnUGF0aCA9IHBhdGguU3BsaXQobmV3IGNoYXJbXSB7ICcuJyB9LCBTdHJpbmdTcGxpdE9wdGlvbnMuUmVtb3ZlRW1wdHlFbnRyaWVzKVswXSArIFwiLmZyYWdcIjtcclxuXHJcbiAgICAgICAgICAgIHN0cmluZyB2ZXJ0U291cmNlID0gRmlsZS5SZWFkQWxsVGV4dCh2ZXJ0UGF0aCk7XHJcbiAgICAgICAgICAgIHN0cmluZyBmcmFnU291cmNlID0gRmlsZS5SZWFkQWxsVGV4dChmcmFnUGF0aCk7XHJcblxyXG4gICAgICAgICAgICBTaGFkZXJQcm9ncmFtIHByb2dyYW0gPSBuZXcgU2hhZGVyUHJvZ3JhbSh2ZXJ0U291cmNlLCBmcmFnU291cmNlKTtcclxuICAgICAgICAgICAgcHJvZ3JhbS5Mb2FkZWQgPSB0cnVlO1xyXG4gICAgICAgICAgIFxyXG4gICAgICAgICAgICByZXR1cm4gcHJvZ3JhbTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwidXNpbmcgSnVpY2VCb3hFbmdpbmUuUmVzb3VyY2VzO1xyXG51c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uTGlucTtcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcbnVzaW5nIFN5c3RlbS5UaHJlYWRpbmcuVGFza3M7XHJcbnVzaW5nIEJyaWRnZS5IdG1sNTtcclxudXNpbmcgQnJpZGdlLldlYkdMO1xyXG5cclxubmFtZXNwYWNlIEp1aWNlQm94RW5naW5lLkdyYXBoaWNzXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBUZXh0dXJlUmVzb3VyY2VMb2FkZXIgOiBSZXNvdXJjZUxvYWRlclxyXG4gICAge1xyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cclxuICAgICAgICAvLy8gQ29uc3RydWN0b3IuXHJcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cclxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJuYW1lXCI+TmFtZSBvZiB0aGUgbG9hZGVyLjwvcGFyYW0+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwiZXh0ZW5zaW9uXCI+RXh0ZW5zaW9uIHRoaXMgdHlwZSBsb2Fkcy48L3BhcmFtPlxyXG4gICAgICAgIHB1YmxpYyBUZXh0dXJlUmVzb3VyY2VMb2FkZXIoc3RyaW5nIG5hbWUsIHN0cmluZyBleHRlbnNpb24pIFxyXG4gICAgICAgICAgICA6IGJhc2UobmFtZSwgZXh0ZW5zaW9uKVxyXG4gICAgICAgIHtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cclxuICAgICAgICAvLy8gTG9hZCBpbiBhIDJEIHRleHR1cmUuXHJcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cclxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJwYXRoXCI+PC9wYXJhbT5cclxuICAgICAgICAvLy8gPHJldHVybnM+PC9yZXR1cm5zPlxyXG4gICAgICAgIHB1YmxpYyBvdmVycmlkZSBJUmVzb3VyY2UgTG9hZChzdHJpbmcgcGF0aClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFRleHR1cmUyRCB0ZXh0dXJlID0gbmV3IFRleHR1cmUyRCgpO1xyXG5cclxuICAgICAgICAgICAgSFRNTEltYWdlRWxlbWVudCBpbWFnZSA9IG5ldyBIVE1MSW1hZ2VFbGVtZW50KCk7XHJcbiAgICAgICAgICAgIGltYWdlLk9uTG9hZCA9ICh4KSA9PiBcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGV4dHVyZS5UZXh0dXJlID0gT25EYXRhTG9hZGVkKGltYWdlKTtcclxuICAgICAgICAgICAgICAgIHRleHR1cmUuTG9hZGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRleHR1cmUuV2lkdGggPSBpbWFnZS5XaWR0aDtcclxuICAgICAgICAgICAgICAgIHRleHR1cmUuSGVpZ2h0ID0gaW1hZ2UuSGVpZ2h0O1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBpbWFnZS5TcmMgPSBwYXRoO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHRleHR1cmU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIFdlYkdMVGV4dHVyZSBPbkRhdGFMb2FkZWQoSFRNTEltYWdlRWxlbWVudCBlbGVtZW50KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIEdyYXBoaWNzTWFuYWdlci5JbnN0YW5jZS5Db250ZXh0LkNyZWF0ZVRleHR1cmUoZWxlbWVudCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIEp1aWNlQm94RW5naW5lLkdyYXBoaWNzO1xyXG51c2luZyBKdWljZUJveEVuZ2luZS5JbnB1dDtcclxudXNpbmcgSnVpY2VCb3hFbmdpbmUuTWF0aDtcclxudXNpbmcgSnVpY2VCb3hFbmdpbmUuUmVzb3VyY2VzO1xyXG51c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uTGlucTtcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcbnVzaW5nIFN5c3RlbS5UaHJlYWRpbmcuVGFza3M7XHJcblxyXG5uYW1lc3BhY2UgSnVpY2VCb3hFbmdpbmUuU2NlbmVcclxue1xyXG4gICAgcHVibGljIGNsYXNzIENhbWVyYSA6IElDb21wb25lbnRcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgc3RyaW5nIE5hbWUgeyBnZXQ7IHNldDsgfVxyXG4gICAgICAgIHB1YmxpYyBHYW1lT2JqZWN0IFBhcmVudCB7IGdldDsgc2V0OyB9XHJcblxyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cclxuICAgICAgICAvLy8gQ29sb3IgdG8gY2xlYXIgdGhlIHJlbmRlcnRhcmdldCB0by5cclxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgICAgIHB1YmxpYyBDb2xvcjMyIENsZWFyQ29sb3IgeyBnZXQ7IHNldDsgfVxyXG5cclxuICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8vIFRoZSBjYW1lcmEgdmlldyBtYXRyaXguXHJcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cclxuICAgICAgICBwdWJsaWMgTWF0cml4NCBWaWV3TWF0cml4IHsgZ2V0OyBzZXQ7IH1cclxuXHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgICAgIC8vLyBUaGUgY2FtZXJhIHByb2plY3Rpb24gbWF0cml4LlxyXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgcHVibGljIE1hdHJpeDQgUHJvak1hdHJpeCB7IGdldDsgc2V0OyB9XHJcblxyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cclxuICAgICAgICAvLy8gV2hlbiB0cnVlLCB0aGUgY2FtZXJhIHNuYXBzIHRvIHRoZSBwaXhlbCBncmlkLlxyXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgcHVibGljIGJvb2wgUGl4ZWxQZXJmZWN0IHsgZ2V0OyBzZXQ7IH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBSZW5kZXJUYXJnZXQgX3RhcmdldDtcclxuICAgICAgICBwcml2YXRlIFJlbmRlclRhcmdldCBfcG9zdFByb2Nlc3NlZDtcclxuXHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgICAgIC8vLyBUaGUgY2FtZXJhIHJlbmRlciB0YXJnZXQuXHJcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cclxuICAgICAgICBwdWJsaWMgUmVuZGVyVGFyZ2V0IFRhcmdldFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZ2V0XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBfdGFyZ2V0O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHNldFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBfdGFyZ2V0ID0gdmFsdWU7XHJcbiAgICAgICAgICAgICAgICBfcG9zdFByb2Nlc3NlZCA9IG5ldyBSZW5kZXJUYXJnZXQoX3RhcmdldC5XaWR0aCwgX3RhcmdldC5IZWlnaHQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8vIFNpemUgb2YgdGhlIHBpeGVscy4gKGUuZy4gMSBpcyB0aGUgc2FtZSByZXNvbHV0aW9uIGFzIHRoZSBjYW52YXMsIDQgZ2l2ZXMgeW91IHBpeGVscyB0aGUgc2l6ZSBvZiA0IGNhbnZhcyBwaXhlbHMpXHJcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cclxuICAgICAgICBwdWJsaWMgaW50IFBpeGVsU2l6ZSB7IGdldDsgc2V0OyB9XHJcblxyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5BbiBkaXNhYmxlZCBjYW1lcmEgd29uJ3QgcmVuZGVyIHRoZSBzY2VuZS48L3N1bW1hcnk+XHJcbiAgICAgICAgcHVibGljIGJvb2wgRW5hYmxlZCB7IGdldDsgc2V0OyB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgVHJhbnNmb3JtIF90cmFuc2Zvcm07XHJcblxyXG4gICAgICAgIHByaXZhdGUgUG9zdFByb2Nlc3NpbmdNYW5hZ2VyIF9wcE1hbmFnZXI7XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIEluaXRpYWxpemUoUmVzb3VyY2VNYW5hZ2VyIHJlc291cmNlTWFuYWdlcilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFBpeGVsU2l6ZSA9IDE7XHJcbiAgICAgICAgICAgIFBpeGVsUGVyZmVjdCA9IHRydWU7XHJcbiAgICAgICAgICAgIF90cmFuc2Zvcm0gPSBQYXJlbnQuR2V0Q29tcG9uZW50PFRyYW5zZm9ybT4oKTtcclxuICAgICAgICAgICAgX3BwTWFuYWdlciA9IG5ldyBQb3N0UHJvY2Vzc2luZ01hbmFnZXIodGhpcyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgYm9vbCBVbmlxdWUoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8vIEFkZCBhIHBvc3QgcHJvY2Vzc2luZyBlZmZlY3QgdG8gdGhlIGNhbWVyYS5cclxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cImVmZmVjdFwiPlRoZSBsb2FkZWQgcG9zdCBwcm9jZXNzaW5nIGVmZmVjdC48L3BhcmFtPlxyXG4gICAgICAgIHB1YmxpYyB2b2lkIEFkZEVmZmVjdChQb3N0UHJvY2Vzc2luZ0VmZmVjdCBlZmZlY3QpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBfcHBNYW5hZ2VyLkFkZFBvc3RQcm9jZXNzaW5nRWZmZWN0KGVmZmVjdCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8vIFBvc3QgcHJvY2VzcyB0aGUgcmVuZGVyZWQgaW1hZ2UuXHJcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cclxuICAgICAgICBwdWJsaWMgdm9pZCBQb3N0UHJvY2VzcygpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAvL0ZJWE1FOiBQb3N0cHJvY2Vzc2luZyBub3Qgd29ya2luZy5cclxuICAgICAgICAgICAgLy9fcHBNYW5hZ2VyLlBvc3RQcm9jZXNzKFRhcmdldCwgX3Bvc3RQcm9jZXNzZWQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIFZlY3RvcjIgU2NyZWVuUG9pbnRUb1dvcmxkKFZlY3RvcjIgcG9pbnQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IFZlY3RvcjIoKHBvaW50LlggKiAyLjBmIC0gMS4wZikgKiBUYXJnZXQuV2lkdGggLyAyLjBmICsgX3RyYW5zZm9ybS5Qb3NpdGlvbi5YLCAocG9pbnQuWSAqIDIuMGYgLSAxLjBmKSAqIFRhcmdldC5IZWlnaHQgLyAyLjBmICsgX3RyYW5zZm9ybS5Qb3NpdGlvbi5ZKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cclxuICAgICAgICAvLy8gVXBkYXRlIFZpZXcgYW5kIFByb2plY3Rpb24gbWF0cml4LlxyXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgcHVibGljIHZvaWQgVXBkYXRlKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmIChUYXJnZXQgPT0gbnVsbClcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgIFZlY3RvcjMgcG9zID0gX3RyYW5zZm9ybS5Qb3NpdGlvbjtcclxuXHJcbiAgICAgICAgICAgIGlmKFBpeGVsUGVyZmVjdClcclxuICAgICAgICAgICAgICAgIF90cmFuc2Zvcm0uUG9zaXRpb24gPSBuZXcgVmVjdG9yMyhNYXRoLk1hdGguUm91bmQoX3RyYW5zZm9ybS5Qb3NpdGlvbi5YKSwgTWF0aC5NYXRoLlJvdW5kKF90cmFuc2Zvcm0uUG9zaXRpb24uWSksIChpbnQpKF90cmFuc2Zvcm0uUG9zaXRpb24uWikpO1xyXG5cclxuICAgICAgICAgICAgVmlld01hdHJpeCA9IE1hdHJpeDQuQ3JlYXRlTG9va0F0KG5ldyBWZWN0b3IzKF90cmFuc2Zvcm0uUG9zaXRpb24uWCwgX3RyYW5zZm9ybS5Qb3NpdGlvbi5ZLCBfdHJhbnNmb3JtLlBvc2l0aW9uLlopLCBuZXcgVmVjdG9yMyhfdHJhbnNmb3JtLlBvc2l0aW9uLlgsIF90cmFuc2Zvcm0uUG9zaXRpb24uWSwgLTEuMGYpLCBuZXcgVmVjdG9yMygwLjBmLCAxLjBmLCAwLjBmKSk7XHJcbiAgICAgICAgICAgIFByb2pNYXRyaXggPSBNYXRyaXg0LkNyZWF0ZU9ydGhvZ3JhcGhpYyhUYXJnZXQuV2lkdGgsIFRhcmdldC5IZWlnaHQsIDAuMGYsIDEwMC4wZik7XHJcblxyXG4gICAgICAgICAgICBpZihQaXhlbFBlcmZlY3QpXHJcbiAgICAgICAgICAgICAgICBfdHJhbnNmb3JtLlBvc2l0aW9uID0gcG9zO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJ1c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uTGlucTtcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcbnVzaW5nIFN5c3RlbS5UaHJlYWRpbmcuVGFza3M7XHJcbnVzaW5nIEp1aWNlQm94RW5naW5lLlJlc291cmNlcztcclxudXNpbmcgSHVtcGVyO1xyXG51c2luZyBKdWljZUJveEVuZ2luZS5NYXRoO1xyXG51c2luZyBIdW1wZXIuUmVzcG9uc2VzO1xyXG5cclxubmFtZXNwYWNlIEp1aWNlQm94RW5naW5lLlNjZW5lXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBDb2xsaWRlciA6IElDb21wb25lbnRcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgc3RyaW5nIE5hbWUgeyBnZXQ7IHNldDsgfVxyXG4gICAgICAgIHB1YmxpYyBib29sIEVuYWJsZWQgeyBnZXQ7IHNldDsgfVxyXG4gICAgICAgIHB1YmxpYyBHYW1lT2JqZWN0IFBhcmVudCB7IGdldDsgc2V0OyB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgQm94IF9ib3g7XHJcblxyXG4gICAgICAgIHByaXZhdGUgUmVjdGFuZ2xlIF9hYWJiO1xyXG5cclxuICAgICAgICBwdWJsaWMgUmVjdGFuZ2xlIEFBQkJcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGdldFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gX2FhYmI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc2V0XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIF9hYWJiID0gdmFsdWU7XHJcbiAgICAgICAgICAgICAgICBfYm94ID0gX3dvcmxkLkNyZWF0ZSggXHJcbiAgICAgICAgICAgICAgICAgICAgUGFyZW50LlRyYW5zZm9ybS5Qb3NpdGlvbi5YICsgX2FhYmIuWCxcclxuICAgICAgICAgICAgICAgICAgICBQYXJlbnQuVHJhbnNmb3JtLlBvc2l0aW9uLlkgKyBfYWFiYi5ZLCBcclxuICAgICAgICAgICAgICAgICAgICBfYWFiYi5XaWR0aCwgX2FhYmIuSGVpZ2h0KSBhcyBCb3g7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgV29ybGQgX3dvcmxkO1xyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBJbml0aWFsaXplKFJlc291cmNlTWFuYWdlciByZXNvdXJjZU1hbmFnZXIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgU2V0V29ybGQoV29ybGQgd29ybGQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBfd29ybGQgPSB3b3JsZDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIFRyYW5zbGF0ZShWZWN0b3IyIGRpcmVjdGlvbilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIF9ib3guTW92ZShQYXJlbnQuVHJhbnNmb3JtLlBvc2l0aW9uLlggLSBfYWFiYi5YICsgZGlyZWN0aW9uLlgsIFBhcmVudC5UcmFuc2Zvcm0uUG9zaXRpb24uWSAtIF9hYWJiLlkgKyBkaXJlY3Rpb24uWSwgKGdsb2JhbDo6U3lzdGVtLkZ1bmM8Z2xvYmFsOjpIdW1wZXIuSUNvbGxpc2lvbiwgZ2xvYmFsOjpIdW1wZXIuUmVzcG9uc2VzLkNvbGxpc2lvblJlc3BvbnNlcz4pKChjKSA9PiBDb2xsaXNpb25SZXNwb25zZXMuU2xpZGUpKTtcclxuICAgICAgICAgICAgVXBkYXRlUG9zaXRpb24oKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgdm9pZCBVcGRhdGVQb3NpdGlvbigpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBQYXJlbnQuVHJhbnNmb3JtLlBvc2l0aW9uID0gbmV3IFZlY3RvcjMoX2JveC5YICsgX2FhYmIuWCwgX2JveC5ZICsgX2FhYmIuWSwgUGFyZW50LlRyYW5zZm9ybS5Qb3NpdGlvbi5aKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBib29sIFVuaXF1ZSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBVcGRhdGUoKVxyXG4gICAgICAgIHsgXHJcbiAgICAgICAgICAgIC8vIGRlYnVnIGhpdCBib3hlcy5cclxuICAgICAgICAgICAgLy9HcmFwaGljcy5EZWJ1Z2dpbmcuRGVidWdSZW5kZXJlci5JbnN0YW5jZS5EcmF3UmVjdChuZXcgUmVjdGFuZ2xlKChpbnQpX2JveC5YLCAoaW50KV9ib3guWSwgKGludClfYm94LldpZHRoLCAoaW50KV9ib3guSGVpZ2h0KSwgbmV3IENvbG9yMzIoMS4wZiwgMC4wZiwgMC4wZiwgMS4wZiksIDEuMGYpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJ1c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uTGlucTtcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcbnVzaW5nIFN5c3RlbS5UaHJlYWRpbmcuVGFza3M7XHJcbnVzaW5nIEp1aWNlQm94RW5naW5lLk1hdGg7XHJcbnVzaW5nIEp1aWNlQm94RW5naW5lLlJlc291cmNlcztcclxuXHJcbm5hbWVzcGFjZSBKdWljZUJveEVuZ2luZS5TY2VuZVxyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgVHJhbnNmb3JtIDogSUNvbXBvbmVudFxyXG4gICAge1xyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5UaGUgcG9zaXRpb24gaW4gM0Qgc3BhY2UuPC9zdW1tYXJ5PlxyXG4gICAgICAgIHB1YmxpYyBWZWN0b3IzIFBvc2l0aW9uIHsgZ2V0OyBzZXQ7IH1cclxuXHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlRoZSByb3RhdGlvbiBpbiAzRCBzcGFjZS48L3N1bW1hcnk+XHJcbiAgICAgICAgcHVibGljIFZlY3RvcjMgUm90YXRpb24geyBnZXQ7IHNldDsgfVxyXG5cclxuICAgICAgICAvLy8gPHN1bW1hcnk+VGhlIHNjYWxlIGluIDNEIHNwYWNlLjwvc3VtbWFyeT5cclxuICAgICAgICBwdWJsaWMgVmVjdG9yMyBTY2FsZSB7IGdldDsgc2V0OyB9XHJcblxyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5OYW1lIG9mIHRoZSBjb21wb25lbnQuPC9zdW1tYXJ5PlxyXG4gICAgICAgIHB1YmxpYyBzdHJpbmcgTmFtZSB7IGdldDsgc2V0OyB9XHJcblxyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5QYXJlbnQgZ2FtZSBvYmplY3QuPC9zdW1tYXJ5PlxyXG4gICAgICAgIHB1YmxpYyBHYW1lT2JqZWN0IFBhcmVudCB7IGdldDsgc2V0OyB9XHJcblxyXG4gICAgICAgIC8vLyA8c3VtbWFyeT48L3N1bW1hcnk+XHJcbiAgICAgICAgcHVibGljIGJvb2wgRW5hYmxlZFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZ2V0IHsgcmV0dXJuIHRydWU7IH1cclxuICAgICAgICAgICAgc2V0IHsgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PkRlZmF1bHQgY29uc3RydWN0b3IuPC9zdW1tYXJ5PlxyXG4gICAgICAgIHB1YmxpYyBUcmFuc2Zvcm0oKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgUG9zaXRpb24gPSBuZXcgVmVjdG9yMygwLjBmLCAwLjBmLCAwLjBmKTtcclxuICAgICAgICAgICAgU2NhbGUgPSBuZXcgVmVjdG9yMygxLjBmKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5UaGlzIGZ1bmN0aW9uIGlzIGNhbGxlZCBldmVyeSBmcmFtZSwgYmVmb3JlIHRoZSByZW5kZXIuPC9zdW1tYXJ5PlxyXG4gICAgICAgIHB1YmxpYyB2b2lkIFVwZGF0ZSgpXHJcbiAgICAgICAge1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cclxuICAgICAgICAvLy8gR2V0cyB0aGUgd29ybGQgbWF0cml4IG9mIHRoaXMgb2JqZWN0IGZvciAyRCByZW5kZXJpbmcuIChubyByb3RhdGlvbiBvbiB4IGFuZCB5IGF4aXMpIFJvdW5kZWQgZG93biB0byB0aGUgbmVhcmVzdCBwaXhlbCBvbiB0aGUgeCBhbmQgeSBheGlzLiAoYXNzdW1pbmcgMSB1bml0ID0gMSBwaXhlbClcclxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgICAgIC8vLyA8cmV0dXJucz5BbiB3b3JsZCBtYXRyaXggZm9yIDJEIHJlbmRlcmluZy48L3JldHVybnM+XHJcbiAgICAgICAgcHVibGljIE1hdHJpeDQgR2V0V29ybGRNYXRyaXgyRCgpXHJcbiAgICAgICAgeyBcclxuICAgICAgICAgICAgcmV0dXJuIE1hdHJpeDQuTXVsdGlwbHkoTWF0cml4NC5NdWx0aXBseShNYXRyaXg0LkNyZWF0ZVNjYWxlKFNjYWxlKSwgTWF0cml4NC5DcmVhdGVSb3RhdGlvblooUm90YXRpb24uWikpLCBNYXRyaXg0LkNyZWF0ZVRyYW5zbGF0aW9uKFBvc2l0aW9uKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8vIEdldHMgdGhlIHdvcmxkIG1hdHJpeCBvZiB0aGlzIG9iamVjdCBmb3IgMkQgcmVuZGVyaW5nLiAobm8gcm90YXRpb24gb24geCBhbmQgeSBheGlzKVxyXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgLy8vIDxyZXR1cm5zPkFuIHdvcmxkIG1hdHJpeCBmb3IgMkQgcmVuZGVyaW5nLjwvcmV0dXJucz5cclxuICAgICAgICBwdWJsaWMgTWF0cml4NCBHZXRXb3JsZE1hdHJpeFBpeGVsUGVyZmVjdDJEKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBNYXRyaXg0Lk11bHRpcGx5KE1hdHJpeDQuTXVsdGlwbHkoTWF0cml4NC5DcmVhdGVTY2FsZShTY2FsZSksIE1hdHJpeDQuQ3JlYXRlUm90YXRpb25aKFJvdGF0aW9uLlopKSwgTWF0cml4NC5DcmVhdGVUcmFuc2xhdGlvbihuZXcgVmVjdG9yMyhNYXRoLk1hdGguUm91bmQoUG9zaXRpb24uWCksIE1hdGguTWF0aC5Sb3VuZChQb3NpdGlvbi5ZKSwgUG9zaXRpb24uWikpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5JZiB0aGUgY29tcG9uZW50IGlzIHVuaXF1ZSwgb25seSBvbmUgY2FuIGJlIG9uIGEgZ2FtZW9iamVjdC48L3N1bW1hcnk+XHJcbiAgICAgICAgLy8vIDxyZXR1cm5zPkEgYm9vbGVhbiwgdHJ1ZSBpZiBpdCBpcyB1bmlxdWUsIGZhbHNlIGlmIG11bHRpcGxlIGNvbXBvbmVudCBtYXkgYmUgb24gYSBnYW1lb2JqZWN0LjwvcmV0dXJucz5cclxuICAgICAgICBwdWJsaWMgYm9vbCBVbmlxdWUoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8vIENhbGxlZCBvbiBjb21wb25lbnQgaW5pdGlhbGlzYXRpb24uXHJcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cclxuICAgICAgICBwdWJsaWMgdm9pZCBJbml0aWFsaXplKFJlc291cmNlTWFuYWdlciByZXNvdXJjZU1hbmFnZXIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwidXNpbmcgQnJpZGdlLkh0bWw1O1xyXG51c2luZyBKdWljZUJveEVuZ2luZS5SZXNvdXJjZXM7XHJcbnVzaW5nIEp1aWNlQm94RW5naW5lLlNjZW5lO1xyXG51c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uTGlucTtcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcbnVzaW5nIFN5c3RlbS5UaHJlYWRpbmcuVGFza3M7XHJcblxyXG5uYW1lc3BhY2UgSnVpY2VCb3hFbmdpbmUuU291bmRcclxue1xyXG4gICAgcHVibGljIGNsYXNzIEF1ZGlvU291cmNlIDogSUNvbXBvbmVudFxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBzdHJpbmcgTmFtZSB7IGdldDsgc2V0OyB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBib29sIEVuYWJsZWQgeyBnZXQ7IHNldDsgfVxyXG5cclxuICAgICAgICBwdWJsaWMgR2FtZU9iamVjdCBQYXJlbnQgeyBnZXQ7IHNldDsgfVxyXG5cclxuICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8vIElzIHRoZSBzb3VuZCBjdXJyZW50bHkgcGxheWluZz9cclxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgICAgIHB1YmxpYyBib29sIFBsYXlpbmcgeyBnZXQ7IHByaXZhdGUgc2V0OyB9XHJcblxyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cclxuICAgICAgICAvLy8gSXMgdGhlIHNvdW5kIGN1cnJlbnRseSBsb29waW5nP1xyXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgcHVibGljIGJvb2wgTG9vcGluZyB7IGdldDsgcHJpdmF0ZSBzZXQ7IH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBSZXNvdXJjZU1hbmFnZXIgX3Jlc291cmNlTWFuYWdlcjtcclxuICAgICAgICBwcml2YXRlIFNvdW5kIF9zb3VuZDtcclxuICAgICAgICBwcml2YXRlIEhUTUxBdWRpb0VsZW1lbnQgX2VsZW1lbnQ7XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIEluaXRpYWxpemUoUmVzb3VyY2VNYW5hZ2VyIHJlc291cmNlTWFuYWdlcilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIF9yZXNvdXJjZU1hbmFnZXIgPSByZXNvdXJjZU1hbmFnZXI7XHJcbiAgICAgICAgICAgIF9lbGVtZW50ID0gbmV3IEhUTUxBdWRpb0VsZW1lbnQoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBib29sIFVuaXF1ZSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBTZXRBdWRpbyhTb3VuZCBzb3VuZClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIF9zb3VuZCA9IHNvdW5kO1xyXG4gICAgICAgICAgICBfZWxlbWVudCA9IG5ldyBIVE1MQXVkaW9FbGVtZW50KCk7XHJcbiAgICAgICAgICAgIF9lbGVtZW50LlNyYyA9IHNvdW5kLk5hbWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8vIFBsYXkgdGhlIGF1ZGlvLlxyXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgcHVibGljIHZvaWQgUGxheSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZihfZWxlbWVudCAhPSBudWxsKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBfZWxlbWVudC5QbGF5KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cclxuICAgICAgICAvLy8gRW5hYmxlIG9yIGRpc2FibGUgbG9vcGluZy5cclxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cImxvb3BcIj5UcnVlIGZvciBsb29waW5nLCBmYWxzZSBmb3Igbm90LjwvcGFyYW0+XHJcbiAgICAgICAgcHVibGljIHZvaWQgTG9vcChib29sIGxvb3ApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBMb29waW5nID0gbG9vcDtcclxuXHJcbiAgICAgICAgICAgIGlmIChfZWxlbWVudCAhPSBudWxsKVxyXG4gICAgICAgICAgICAgICAgX2VsZW1lbnQuTG9vcCA9IGxvb3A7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBVcGRhdGUoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIEJyaWRnZS5IdG1sNTtcclxudXNpbmcgSnVpY2VCb3hFbmdpbmUuUmVzb3VyY2VzO1xyXG51c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uTGlucTtcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcbnVzaW5nIFN5c3RlbS5UaHJlYWRpbmcuVGFza3M7XHJcblxyXG5uYW1lc3BhY2UgSnVpY2VCb3hFbmdpbmUuU291bmRcclxue1xyXG4gICAgcHVibGljIGNsYXNzIFNvdW5kUmVzb3VyY2VMb2FkZXIgOiBSZXNvdXJjZUxvYWRlclxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBTb3VuZFJlc291cmNlTG9hZGVyKHN0cmluZyBuYW1lLCBzdHJpbmcgZXh0ZW5zaW9uKSBcclxuICAgICAgICAgICAgOiBiYXNlKG5hbWUsIGV4dGVuc2lvbilcclxuICAgICAgICB7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8vIExvYWQgc291bmQgcmVzb3VyY2UuIFRoaXMgaXMgZG9uZSBieSB1c2luZyBhIEhUTUwgZWxlbWVudC5cclxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cInBhdGhcIj5QYXRoIG9mIHRoZSBmaWxlLjwvcGFyYW0+XHJcbiAgICAgICAgLy8vIDxyZXR1cm5zPlRoZSBzb3VuZCByZXNvdXJjZS48L3JldHVybnM+XHJcbiAgICAgICAgcHVibGljIG92ZXJyaWRlIElSZXNvdXJjZSBMb2FkKHN0cmluZyBwYXRoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgU291bmQgc291bmQgPSBuZXcgU291bmQoKTtcclxuICAgICAgICAgICAgc291bmQuTmFtZSA9IHBhdGg7XHJcbiAgICAgICAgICAgIHNvdW5kLkxvYWRlZCA9IGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgSFRNTEF1ZGlvRWxlbWVudCBlbGVtZW50ID0gbmV3IEhUTUxBdWRpb0VsZW1lbnQoKTtcclxuICAgICAgICAgICAgZWxlbWVudC5TcmMgPSBwYXRoO1xyXG4gICAgICAgICAgICBlbGVtZW50LkxvYWQoKTtcclxuICAgICAgICAgICAgZWxlbWVudC5PbkxvYWQgPSAoeCkgPT5cclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgc291bmQuTG9hZGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHNvdW5kLlNvdW5kRWxlbWVudCA9IGVsZW1lbnQ7XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gc291bmQ7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIEJyaWRnZS5XZWJHTDtcclxudXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLkxpbnE7XHJcbnVzaW5nIFN5c3RlbS5UZXh0O1xyXG51c2luZyBTeXN0ZW0uVGhyZWFkaW5nLlRhc2tzO1xyXG5cclxubmFtZXNwYWNlIEp1aWNlQm94RW5naW5lLkdyYXBoaWNzXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBSZW5kZXJUYXJnZXQgOiBUZXh0dXJlMkRcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgV2ViR0xGcmFtZWJ1ZmZlciBUYXJnZXQgeyBnZXQ7IHByaXZhdGUgc2V0OyB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBSZW5kZXJUYXJnZXQoaW50IHdpZHRoLCBpbnQgaGVpZ2h0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgV2lkdGggPSB3aWR0aDtcclxuICAgICAgICAgICAgSGVpZ2h0ID0gaGVpZ2h0O1xyXG5cclxuICAgICAgICAgICAgVGV4dHVyZSA9IEdyYXBoaWNzTWFuYWdlci5JbnN0YW5jZS5Db250ZXh0LkNyZWF0ZVRleHR1cmUod2lkdGgsIGhlaWdodCk7XHJcblxyXG4gICAgICAgICAgICBUYXJnZXQgPSBHcmFwaGljc01hbmFnZXIuSW5zdGFuY2UuQ29udGV4dC5DcmVhdGVSZW5kZXJUYXJnZXQod2lkdGgsIGhlaWdodCwgdGhpcyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIEp1aWNlQm94RW5naW5lLk1hdGg7XHJcbnVzaW5nIEp1aWNlQm94RW5naW5lLlJlc291cmNlcztcclxudXNpbmcgSnVpY2VCb3hFbmdpbmUuU2NlbmU7XHJcbnVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5MaW5xO1xyXG51c2luZyBTeXN0ZW0uVGV4dDtcclxudXNpbmcgU3lzdGVtLlRocmVhZGluZy5UYXNrcztcclxuXHJcbm5hbWVzcGFjZSBKdWljZUJveEVuZ2luZS5HcmFwaGljc1xyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgU3ByaXRlIDogR3JhcGhpY3NDb21wb25lbnRcclxuICAgIHtcclxuICAgICAgICBwcml2YXRlIFRleHR1cmUyRCBfdGV4dHVyZTtcclxuXHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgICAgIC8vLyBUaGUgdGV4dHVyZSB0byB1c2UuXHJcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cclxuICAgICAgICBwdWJsaWMgVGV4dHVyZTJEIFRleHR1cmVcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGdldCB7IHJldHVybiBfdGV4dHVyZTsgfVxyXG4gICAgICAgICAgICBzZXRcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgX3RleHR1cmUgPSB2YWx1ZTtcclxuICAgICAgICAgICAgICAgIFNvdXJjZVJlY3RhbmdsZSA9IG5ldyBSZWN0YW5nbGUoMCwgMCwgX3RleHR1cmUuV2lkdGgsIF90ZXh0dXJlLkhlaWdodCk7XHJcbiAgICAgICAgICAgICAgICBVcGRhdGVTcHJpdGUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgICAgIC8vLyBQaXhlbCBwZXJmZWN0IHNwcml0ZXMgcm91bmQgdGhlaXIgcG9zaXRpb24gdG8gdGhlIG5lYXJlc3QgaW50ZWdlci5cclxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgICAgIHB1YmxpYyBib29sIFBpeGVsUGVyZmVjdCB7IGdldDsgc2V0OyB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgUmVjdGFuZ2xlIF9zb3VyY2VSZWN0YW5nbGU7XHJcbiAgICAgICAgcHVibGljIFJlY3RhbmdsZSBTb3VyY2VSZWN0YW5nbGVcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGdldCB7IHJldHVybiBfc291cmNlUmVjdGFuZ2xlOyB9XHJcbiAgICAgICAgICAgIHNldFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBfc291cmNlUmVjdGFuZ2xlID0gdmFsdWU7XHJcbiAgICAgICAgICAgICAgICBVcGRhdGVTcHJpdGUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGJvb2wgVXNlUG9zaXRpb25Gb3JEZXB0aCB7IGdldDsgc2V0OyB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgVmVjdG9yMiBfb2Zmc2V0O1xyXG4gICAgICAgIHB1YmxpYyBWZWN0b3IyIE9mZnNldFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZ2V0IHsgcmV0dXJuIF9vZmZzZXQ7IH1cclxuICAgICAgICAgICAgc2V0IHsgX29mZnNldCA9IHZhbHVlOyB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL0ZJWE1FOiBSZW1vdmUgc3RhdGljIGFuZCBmaW5kIGFuIG90aGVyIHNvbHV0aW9uIGZvciB0aGlzLlxyXG4gICAgICAgIHByaXZhdGUgVmVydGV4QnVmZmVyIF92ZXJ0ZXhCdWZmZXI7XHJcbiAgICAgICAgcHJpdmF0ZSBUcmFuc2Zvcm0gX3RyYW5zZm9ybTtcclxuICAgICAgICBwcml2YXRlIFNoYWRlclByb2dyYW0gX3Byb2dyYW07XHJcbiAgICAgICAgcHJpdmF0ZSBHcmFwaGljc0NvbW1hbmQgX2NvbW1hbmQ7XHJcblxyXG5cclxuICAgICAgICBwdWJsaWMgU3ByaXRlKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFBpeGVsUGVyZmVjdCA9IHRydWU7XHJcbiAgICAgICAgICAgIFVzZVBvc2l0aW9uRm9yRGVwdGggPSB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgICAgIC8vLyBDYWxsZWQgb24gY29tcG9uZW50IGluaXRpYWxpc2F0aW9uLlxyXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgcHVibGljIG92ZXJyaWRlIHZvaWQgSW5pdGlhbGl6ZShSZXNvdXJjZU1hbmFnZXIgcmVzb3VyY2VNYW5hZ2VyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgX3RyYW5zZm9ybSA9IFBhcmVudC5HZXRDb21wb25lbnQ8VHJhbnNmb3JtPigpO1xyXG4gICAgICAgICAgICBfdGV4dHVyZSA9IG51bGw7XHJcbiAgICAgICAgICAgIF9vZmZzZXQgPSBuZXcgVmVjdG9yMigpO1xyXG4gICAgICAgICAgICBfcHJvZ3JhbSA9IChTaGFkZXJQcm9ncmFtKXJlc291cmNlTWFuYWdlci5Mb2FkKFwiU2hhZGVycy9TcHJpdGUudmVydFwiKTtcclxuXHJcbiAgICAgICAgICAgIF92ZXJ0ZXhCdWZmZXIgPSBuZXcgVmVydGV4QnVmZmVyKCk7XHJcbiAgICAgICAgICAgIF92ZXJ0ZXhCdWZmZXIuU2V0QXR0cmlidXRlKG5ldyBWZXJ0ZXhBdHRyaWJ1dGUoXCJhX3Bvc1wiLCAzLCBmYWxzZSwgMjAsIDApKTtcclxuICAgICAgICAgICAgX3ZlcnRleEJ1ZmZlci5TZXRBdHRyaWJ1dGUobmV3IFZlcnRleEF0dHJpYnV0ZShcImFfdGV4XCIsIDIsIGZhbHNlLCAyMCwgMTIpKTtcclxuXHJcbiAgICAgICAgICAgIC8vIEluaXQgZ3JhcGhpY3MgY29tbWFuZC5cclxuICAgICAgICAgICAgX2NvbW1hbmQgPSBuZXcgR3JhcGhpY3NDb21tYW5kKCk7XHJcbiAgICAgICAgICAgIF9jb21tYW5kLkRhdGEuQWRkKFwidGV4dHVyZVwiLCBudWxsKTtcclxuICAgICAgICAgICAgX2NvbW1hbmQuVmVydGV4QnVmZmVyID0gX3ZlcnRleEJ1ZmZlcjtcclxuICAgICAgICAgICAgX2NvbW1hbmQuUHJvZ3JhbSA9IF9wcm9ncmFtO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgICAgIC8vLyBHZW5lcmF0ZSB2ZXJ0ZXhidWZmZXIgYmFzZWQgb24gdGhlIHNvdXJjZSByZWN0YW5nbGUuXHJcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cclxuICAgICAgICBwcml2YXRlIGZsb2F0W10gR2VuZXJhdGVWZXJ0ZXhCdWZmZXIoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKCFfdGV4dHVyZS5Mb2FkZWQpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuXHJcbiAgICAgICAgICAgIGludCB3aWR0aCA9IF9zb3VyY2VSZWN0YW5nbGUuV2lkdGg7XHJcbiAgICAgICAgICAgIGludCBoZWlnaHQgPSBfc291cmNlUmVjdGFuZ2xlLkhlaWdodDtcclxuXHJcbiAgICAgICAgICAgIC8vIFRoZSB0ZXh0dXJlIGNvb3Jkcy5cclxuICAgICAgICAgICAgVmVjdG9yMiBsb3dlckxlZnQgPSBuZXcgVmVjdG9yMihfc291cmNlUmVjdGFuZ2xlLlggLyAoZmxvYXQpVGV4dHVyZS5XaWR0aCwgX3NvdXJjZVJlY3RhbmdsZS5ZIC8gKGZsb2F0KVRleHR1cmUuSGVpZ2h0ICsgaGVpZ2h0IC8gKGZsb2F0KVRleHR1cmUuSGVpZ2h0KTtcclxuICAgICAgICAgICAgVmVjdG9yMiB1cHBlckxlZnQgPSBuZXcgVmVjdG9yMihfc291cmNlUmVjdGFuZ2xlLlggLyAoZmxvYXQpVGV4dHVyZS5XaWR0aCwgX3NvdXJjZVJlY3RhbmdsZS5ZIC8gKGZsb2F0KVRleHR1cmUuSGVpZ2h0KTtcclxuXHJcbiAgICAgICAgICAgIFZlY3RvcjIgbG93ZXJSaWdodCA9IG5ldyBWZWN0b3IyKF9zb3VyY2VSZWN0YW5nbGUuWCAvIChmbG9hdClUZXh0dXJlLldpZHRoICsgd2lkdGggLyAoZmxvYXQpVGV4dHVyZS5XaWR0aCwgX3NvdXJjZVJlY3RhbmdsZS5ZIC8gKGZsb2F0KVRleHR1cmUuSGVpZ2h0ICsgaGVpZ2h0IC8gKGZsb2F0KVRleHR1cmUuSGVpZ2h0KTtcclxuICAgICAgICAgICAgVmVjdG9yMiB1cHBlclJpZ2h0ID0gbmV3IFZlY3RvcjIoX3NvdXJjZVJlY3RhbmdsZS5YIC8gKGZsb2F0KVRleHR1cmUuV2lkdGggKyB3aWR0aCAvIChmbG9hdClUZXh0dXJlLldpZHRoLCBfc291cmNlUmVjdGFuZ2xlLlkgLyAoZmxvYXQpVGV4dHVyZS5IZWlnaHQpO1xyXG5cclxuICAgICAgICAgICAgZmxvYXQgZGVwdGggPSBQYXJlbnQuVHJhbnNmb3JtLlBvc2l0aW9uLlo7XHJcblxyXG4gICAgICAgICAgICAvLyBGSVhNRTogMTAwIGlzIHRoZSBjYW1lcmEgZmFyIHBsYW5lLlxyXG4gICAgICAgICAgICBpZiAoVXNlUG9zaXRpb25Gb3JEZXB0aClcclxuICAgICAgICAgICAgICAgICBkZXB0aCA9IDEwMC4wZiAtIFBhcmVudC5UcmFuc2Zvcm0uUG9zaXRpb24uWSAvIDEwLjBmO1xyXG5cclxuICAgICAgICAgICAgZmxvYXRbXSBkYXRhID0gbmV3IGZsb2F0W11cclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgLTAuNWYgKiB3aWR0aCwgLTAuNWYgKiBoZWlnaHQsICBkZXB0aCwgIGxvd2VyTGVmdC5YLCAgbG93ZXJMZWZ0LlksXHJcbiAgICAgICAgICAgICAgICAgMC41ZiAqIHdpZHRoLCAtMC41ZiAqIGhlaWdodCwgIGRlcHRoLCAgbG93ZXJSaWdodC5YLCBsb3dlclJpZ2h0LlksXHJcbiAgICAgICAgICAgICAgICAgMC41ZiAqIHdpZHRoLCAgMC41ZiAqIGhlaWdodCwgIGRlcHRoLCAgdXBwZXJSaWdodC5YLCB1cHBlclJpZ2h0LlksXHJcblxyXG4gICAgICAgICAgICAgICAgLTAuNWYgKiB3aWR0aCwgLTAuNWYgKiBoZWlnaHQsICBkZXB0aCwgIGxvd2VyTGVmdC5YLCBsb3dlckxlZnQuWSxcclxuICAgICAgICAgICAgICAgIC0wLjVmICogd2lkdGgsICAwLjVmICogaGVpZ2h0LCAgZGVwdGgsICB1cHBlckxlZnQuWCwgdXBwZXJMZWZ0LlksXHJcbiAgICAgICAgICAgICAgICAgMC41ZiAqIHdpZHRoLCAgMC41ZiAqIGhlaWdodCwgIGRlcHRoLCAgdXBwZXJSaWdodC5YLCB1cHBlclJpZ2h0LllcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBkYXRhO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgICAgIC8vLyBSZW5kZXIgdGhlIHNwcml0ZS5cclxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgICAgIHB1YmxpYyBvdmVycmlkZSB2b2lkIFJlbmRlcigpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAoX3RleHR1cmUgPT0gbnVsbCB8fCAhX3RleHR1cmUuTG9hZGVkKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgLy8gQWRkIG9mZnNldCB0byB0aGUgcG9zaXRpb24gb2YgdGhlIG9iamVjdCBhbmQgY2FsY3VsYXRlIHRoZSB3b3JsZCBtYXRyaXguXHJcbiAgICAgICAgICAgIFBhcmVudC5UcmFuc2Zvcm0uUG9zaXRpb24gKz0gbmV3IFZlY3RvcjMoT2Zmc2V0LlgsIE9mZnNldC5ZLCAwLjBmKTtcclxuICAgICAgICAgICAgaWYgKFBpeGVsUGVyZmVjdClcclxuICAgICAgICAgICAgICAgIF9jb21tYW5kLldvcmxkTWF0cml4ID0gX3RyYW5zZm9ybS5HZXRXb3JsZE1hdHJpeFBpeGVsUGVyZmVjdDJEKCk7XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIF9jb21tYW5kLldvcmxkTWF0cml4ID0gX3RyYW5zZm9ybS5HZXRXb3JsZE1hdHJpeDJEKCk7XHJcbiAgICAgICAgICAgIFBhcmVudC5UcmFuc2Zvcm0uUG9zaXRpb24gLT0gbmV3IFZlY3RvcjMoT2Zmc2V0LlgsIE9mZnNldC5ZLCAwLjBmKTtcclxuXHJcbiAgICAgICAgICAgIF9jb21tYW5kLkRhdGFbXCJ0ZXh0dXJlXCJdID0gVGV4dHVyZTtcclxuXHJcbiAgICAgICAgICAgIC8vIEV4ZWN1dGUgY29tbWFuZC5cclxuICAgICAgICAgICAgR3JhcGhpY3NNYW5hZ2VyLkluc3RhbmNlLkNvbnRleHQuQ29tbWFuZChfY29tbWFuZCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHZvaWQgVXBkYXRlU3ByaXRlKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZsb2F0W10gZGF0YSA9IEdlbmVyYXRlVmVydGV4QnVmZmVyKCk7XHJcblxyXG4gICAgICAgICAgICBpZihkYXRhICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICBfdmVydGV4QnVmZmVyLlVwZGF0ZURhdGEoZGF0YSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8vIE9ubHkgb25lIHNwcml0ZSBtYXkgZXhpc3Qgb24gYSBnYW1lb2JqZWN0LlxyXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgLy8vIDxyZXR1cm5zPjwvcmV0dXJucz5cclxuICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgYm9vbCBVbmlxdWUoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIGJvb2wgX2xvYWRlZCA9IGZhbHNlO1xyXG5cclxuICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8vIENhbGxlZCBldmVyeSBmcmFtZS5cclxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgICAgIHB1YmxpYyBvdmVycmlkZSB2b2lkIFVwZGF0ZSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAoIV9sb2FkZWQgJiYgX3RleHR1cmUuTG9hZGVkKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBfbG9hZGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGlmKFNvdXJjZVJlY3RhbmdsZS5XaWR0aCA9PSAwICYmIFNvdXJjZVJlY3RhbmdsZS5IZWlnaHQgPT0gMClcclxuICAgICAgICAgICAgICAgICAgICBTb3VyY2VSZWN0YW5nbGUgPSBuZXcgUmVjdGFuZ2xlKDAsIDAsIF90ZXh0dXJlLldpZHRoLCBfdGV4dHVyZS5IZWlnaHQpO1xyXG4gICAgICAgICAgICAgICAgVXBkYXRlU3ByaXRlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwidXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxudXNpbmcgU3lzdGVtLkxpbnE7XHJcbnVzaW5nIFN5c3RlbS5UZXh0O1xyXG51c2luZyBTeXN0ZW0uVGhyZWFkaW5nLlRhc2tzO1xyXG51c2luZyBKdWljZUJveEVuZ2luZS5NYXRoO1xyXG51c2luZyBKdWljZUJveEVuZ2luZS5SZXNvdXJjZXM7XHJcblxyXG5uYW1lc3BhY2UgSnVpY2VCb3hFbmdpbmUuR3JhcGhpY3Ncclxue1xyXG4gICAgcHVibGljIGVudW0gVGV4dEFsaWdubWVudFxyXG4gICAge1xyXG4gICAgICAgIExlZnQsXHJcbiAgICAgICAgUmlnaHQsXHJcbiAgICAgICAgQ2VudGVyXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNsYXNzIFRleHQgOiBHcmFwaGljc0NvbXBvbmVudFxyXG4gICAge1xyXG4gICAgICAgIHByaXZhdGUgc3RyaW5nIF90ZXh0O1xyXG4gICAgICAgIHB1YmxpYyBzdHJpbmcgRGlzcGxheVRleHRcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGdldFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gX3RleHQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc2V0XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmICghX3RleHQuRXF1YWxzKHZhbHVlKSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBfdGV4dCA9IHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgIFVwZGF0ZVRleHQoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBUZXh0QWxpZ25tZW50IF9hbGlnbm1lbnQ7XHJcblxyXG4gICAgICAgIHB1YmxpYyBUZXh0QWxpZ25tZW50IEFsaWdubWVudFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZ2V0IHsgcmV0dXJuIF9hbGlnbm1lbnQ7IH1cclxuICAgICAgICAgICAgc2V0XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmKF9hbGlnbm1lbnQgIT0gdmFsdWUpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgX2FsaWdubWVudCA9IHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgIFVwZGF0ZVRleHQoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBDb2xvcjMyIF9jb2xvcjtcclxuXHJcbiAgICAgICAgcHVibGljIENvbG9yMzIgQ29sb3JcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGdldCB7IHJldHVybiBfY29sb3I7IH1cclxuICAgICAgICAgICAgc2V0XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmICghX2NvbG9yLkVxdWFscyh2YWx1ZSkpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgX2NvbG9yID0gdmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgVXBkYXRlVGV4dCgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgRm9udCBGb250IHsgZ2V0OyBzZXQ7IH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBSZXNvdXJjZU1hbmFnZXIgX21hbmFnZXI7XHJcbiAgICAgICAgcHJpdmF0ZSBHcmFwaGljc0NvbW1hbmQgX2NvbW1hbmQ7XHJcblxyXG4gICAgICAgIHB1YmxpYyBvdmVycmlkZSB2b2lkIEluaXRpYWxpemUoUmVzb3VyY2VNYW5hZ2VyIHJlc291cmNlTWFuYWdlcilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIF9tYW5hZ2VyID0gcmVzb3VyY2VNYW5hZ2VyO1xyXG5cclxuICAgICAgICAgICAgRm9udCA9IHJlc291cmNlTWFuYWdlci5Mb2FkPEZvbnQ+KFwiQXJpYWwuYmZmXCIpO1xyXG4gICAgICAgICAgICBfYWxpZ25tZW50ID0gVGV4dEFsaWdubWVudC5MZWZ0O1xyXG4gICAgICAgICAgICBfY29sb3IgPSBuZXcgQ29sb3IzMigxLjBmLCAxLjBmLCAxLjBmLCAxLjBmKTtcclxuXHJcbiAgICAgICAgICAgIF9jb21tYW5kID0gbmV3IEdyYXBoaWNzQ29tbWFuZCgpO1xyXG4gICAgICAgICAgICBfY29tbWFuZC5Qcm9ncmFtID0gcmVzb3VyY2VNYW5hZ2VyLkxvYWQoXCJTaGFkZXJzL0ZvbnQudmVydFwiKSBhcyBTaGFkZXJQcm9ncmFtO1xyXG5cclxuICAgICAgICAgICAgX2NvbW1hbmQuVmVydGV4QnVmZmVyID0gbmV3IFZlcnRleEJ1ZmZlcigpO1xyXG4gICAgICAgICAgICBfY29tbWFuZC5WZXJ0ZXhCdWZmZXIuU2V0QXR0cmlidXRlKG5ldyBWZXJ0ZXhBdHRyaWJ1dGUoXCJhX3Bvc1wiLCAzLCBmYWxzZSwgMzYsIDApKTtcclxuICAgICAgICAgICAgX2NvbW1hbmQuVmVydGV4QnVmZmVyLlNldEF0dHJpYnV0ZShuZXcgVmVydGV4QXR0cmlidXRlKFwiYV90ZXhcIiwgMiwgZmFsc2UsIDM2LCAxMikpO1xyXG4gICAgICAgICAgICBfY29tbWFuZC5WZXJ0ZXhCdWZmZXIuU2V0QXR0cmlidXRlKG5ldyBWZXJ0ZXhBdHRyaWJ1dGUoXCJhX2NvbFwiLCA0LCBmYWxzZSwgMzYsIDIwKSk7XHJcblxyXG4gICAgICAgICAgICBfY29tbWFuZC5EYXRhLkFkZChcInRleHR1cmVcIiwgRm9udC5UZXh0dXJlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgdm9pZCBVcGRhdGVUZXh0KClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZsb2F0IG9mZnNldCA9IEZvbnQuR2V0V2lkdGgoX3RleHQpO1xyXG4gICAgICAgICAgICBzd2l0Y2goX2FsaWdubWVudClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY2FzZSBUZXh0QWxpZ25tZW50LkxlZnQ6XHJcbiAgICAgICAgICAgICAgICAgICAgb2Zmc2V0ID0gMDtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgVGV4dEFsaWdubWVudC5SaWdodDpcclxuICAgICAgICAgICAgICAgICAgICBvZmZzZXQgPSAtb2Zmc2V0O1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBUZXh0QWxpZ25tZW50LkNlbnRlcjpcclxuICAgICAgICAgICAgICAgICAgICBvZmZzZXQgLz0gLTIuMGY7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIFZlY3RvcjMgb2Zmc2V0VmVjID0gbmV3IFZlY3RvcjMob2Zmc2V0LCAwLjBmLCAwLjBmKTtcclxuXHJcbiAgICAgICAgICAgIF9jb21tYW5kLlZlcnRleEJ1ZmZlci5VcGRhdGVEYXRhKEZvbnQuR2VuZXJhdGVCdWZmZXIoX3RleHQsIF9jb2xvciwgb2Zmc2V0VmVjKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgdm9pZCBSZW5kZXIoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgX2NvbW1hbmQuV29ybGRNYXRyaXggPSBQYXJlbnQuVHJhbnNmb3JtLkdldFdvcmxkTWF0cml4UGl4ZWxQZXJmZWN0MkQoKTtcclxuICAgICAgICAgICAgR3JhcGhpY3NNYW5hZ2VyLkluc3RhbmNlLkNvbnRleHQuQ29tbWFuZChfY29tbWFuZCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgYm9vbCBVbmlxdWUoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIG92ZXJyaWRlIHZvaWQgVXBkYXRlKClcclxuICAgICAgICB7XHJcblxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJ1c2luZyBKdWljZUJveEVuZ2luZS5JbnB1dDtcclxudXNpbmcgSnVpY2VCb3hFbmdpbmUuTWF0aDtcclxudXNpbmcgSnVpY2VCb3hFbmdpbmUuUmVzb3VyY2VzO1xyXG51c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uTGlucTtcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcbnVzaW5nIFN5c3RlbS5UaHJlYWRpbmcuVGFza3M7XHJcblxyXG5uYW1lc3BhY2UgSnVpY2VCb3hFbmdpbmUuR3JhcGhpY3Ncclxue1xyXG4gICAgcHVibGljIGNsYXNzIFRpbGVNYXAgOiBHcmFwaGljc0NvbXBvbmVudFxyXG4gICAge1xyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cclxuICAgICAgICAvLy8gVGlsZW1hcCBzcHJpdGVzLlxyXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgcHVibGljIFRleHR1cmUyRCBTcHJpdGVzIHsgZ2V0OyBzZXQ7IH1cclxuXHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgICAgIC8vLyBUaWxlbWFwIG1hcCBkYXRhLiBcclxuICAgICAgICAvLy8gUiBjaGFubmVsIGlzIHRoZSB4LXBvc2l0aW9uIG9mIHRoZSB0aWxlIGluIHRoZSBzcHJpdGVtYXAuXHJcbiAgICAgICAgLy8vIEcgY2hhbm5lbCBpcyB0aGUgeS1wb3NpdGlvbiBvZiB0aGUgdGlsZSBpbiB0aGUgc3ByaXRlbWFwLlxyXG4gICAgICAgIC8vLyBCIGNoYW5uZWwgaXMgdGhlIGFtb3VudCBvZiBhbmltYXRpb24gZnJhbWVzIHRvIHRoZSBsZWZ0IG9mIHRoZSBvcmlnaW5hbCBwb3NpdGlvbiAoUiAmIEcpLlxyXG4gICAgICAgIC8vLyBBIGNoYW5uZWwgaXMgdGhlIHNwZWVkIG9mIHRoZSBhbmltYXRpb24uIFxyXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgcHVibGljIFRleHR1cmUyRCBNYXAgeyBnZXQ7IHNldDsgfVxyXG5cclxuICAgICAgICBwdWJsaWMgZmxvYXQgRGVwdGggeyBnZXQ7IHNldDsgfVxyXG5cclxuICAgICAgICBwcml2YXRlIGZsb2F0IF90aWxlU2l6ZTtcclxuICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8vIFRoZSBzaXplIG9mIG9uZSB0aWxlIGluIHRoZSBzaGVldC4gKEFsbCB0aWxlcyBNVVNUIGJlIG9mIHNhbWUgc2l6ZSlcclxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgICAgIHB1YmxpYyBmbG9hdCBUaWxlU2l6ZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZ2V0XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBfdGlsZVNpemU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc2V0XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIF90aWxlU2l6ZSA9IHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgX2NvbW1hbmQuRGF0YVtcInRpbGVTaXplXCJdID0gX3RpbGVTaXplO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIFByaXZhdGVzLlxyXG4gICAgICAgIHByaXZhdGUgR3JhcGhpY3NDb250ZXh0IF9jb250ZXh0O1xyXG4gICAgICAgIHByaXZhdGUgVmVydGV4QnVmZmVyIF92ZXJ0ZXhCdWZmZXI7XHJcbiAgICAgICAgcHJpdmF0ZSBTaGFkZXJQcm9ncmFtIF9wcm9ncmFtO1xyXG4gICAgICAgIHByaXZhdGUgR3JhcGhpY3NDb21tYW5kIF9jb21tYW5kO1xyXG5cclxuICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8vIEludGlhbGl6ZXMgdGhlIFRpbGVtYXAuXHJcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cclxuICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgdm9pZCBJbml0aWFsaXplKFJlc291cmNlTWFuYWdlciByZXNvdXJjZU1hbmFnZXIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmbG9hdFtdIGRhdGEgPSBuZXcgZmxvYXRbXVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAtMS4wZiwgLTEuMGYsICBEZXB0aCwgIDAuMGYsICAxLjBmLFxyXG4gICAgICAgICAgICAgICAgIDEuMGYsIC0xLjBmLCAgRGVwdGgsICAxLjBmLCAgMS4wZixcclxuICAgICAgICAgICAgICAgICAxLjBmLCAgMS4wZiwgIERlcHRoLCAgMS4wZiwgIDAuMGYsXHJcblxyXG4gICAgICAgICAgICAgICAgLTEuMGYsIC0xLjBmLCAgRGVwdGgsICAwLjBmLCAgMS4wZixcclxuICAgICAgICAgICAgICAgIC0xLjBmLCAgMS4wZiwgIERlcHRoLCAgMC4wZiwgIDAuMGYsXHJcbiAgICAgICAgICAgICAgICAgMS4wZiwgIDEuMGYsICBEZXB0aCwgIDEuMGYsICAwLjBmLFxyXG4gICAgICAgICAgICB9O1xyXG5cclxuXHJcbiAgICAgICAgICAgIF9jb250ZXh0ID0gR3JhcGhpY3NNYW5hZ2VyLkluc3RhbmNlLkNvbnRleHQ7XHJcbiAgICAgICAgICAgIF92ZXJ0ZXhCdWZmZXIgPSBuZXcgVmVydGV4QnVmZmVyKGRhdGEpO1xyXG5cclxuICAgICAgICAgICAgX3ZlcnRleEJ1ZmZlci5TZXRBdHRyaWJ1dGUobmV3IFZlcnRleEF0dHJpYnV0ZShcImFfcG9zXCIsIDMsIGZhbHNlLCAyMCwgMCkpO1xyXG4gICAgICAgICAgICBfdmVydGV4QnVmZmVyLlNldEF0dHJpYnV0ZShuZXcgVmVydGV4QXR0cmlidXRlKFwiYV90ZXhcIiwgMiwgZmFsc2UsIDIwLCAxMikpO1xyXG5cclxuICAgICAgICAgICAgX3Byb2dyYW0gPSAoU2hhZGVyUHJvZ3JhbSlyZXNvdXJjZU1hbmFnZXIuTG9hZChcIlNoYWRlcnMvVGlsZU1hcC52ZXJ0XCIpO1xyXG5cclxuICAgICAgICAgICAgX2NvbW1hbmQgPSBuZXcgR3JhcGhpY3NDb21tYW5kKCk7XHJcbiAgICAgICAgICAgIF9jb21tYW5kLkRhdGEuQWRkKFwic3ByaXRlc1wiLCBudWxsKTtcclxuICAgICAgICAgICAgX2NvbW1hbmQuRGF0YS5BZGQoXCJtYXBcIiwgbnVsbCk7XHJcbiAgICAgICAgICAgIF9jb21tYW5kLkRhdGEuQWRkKFwidGlsZVNpemVcIiwgMTYpO1xyXG4gICAgICAgICAgICBfY29tbWFuZC5WZXJ0ZXhCdWZmZXIgPSBfdmVydGV4QnVmZmVyO1xyXG4gICAgICAgICAgICBfY29tbWFuZC5Qcm9ncmFtID0gX3Byb2dyYW07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8vIFJlbmRlciB0aGUgdGlsZW1hcC5cclxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgICAgIHB1YmxpYyBvdmVycmlkZSB2b2lkIFJlbmRlcigpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAoU3ByaXRlcyAhPSBudWxsICYmIE1hcCAhPSBudWxsKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBfY29tbWFuZC5EYXRhW1wic3ByaXRlc1wiXSA9IFNwcml0ZXM7XHJcbiAgICAgICAgICAgICAgICBfY29tbWFuZC5EYXRhW1wic3ByaXRlc1NpemVcIl0gPSBuZXcgVmVjdG9yMihTcHJpdGVzLldpZHRoLCBTcHJpdGVzLkhlaWdodCk7XHJcbiAgICAgICAgICAgICAgICBfY29tbWFuZC5EYXRhW1wibWFwU2l6ZVwiXSA9IG5ldyBWZWN0b3IyKE1hcC5XaWR0aCwgTWFwLkhlaWdodCk7XHJcbiAgICAgICAgICAgICAgICBfY29tbWFuZC5EYXRhW1widGlsZVNpemVcIl0gPSAxNi4wZjtcclxuXHJcbiAgICAgICAgICAgICAgICBfY29tbWFuZC5EYXRhW1wibWFwXCJdID0gTWFwO1xyXG5cclxuICAgICAgICAgICAgICAgIF9jb250ZXh0LkNvbW1hbmQoX2NvbW1hbmQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8vIE9iamVjdCBjYW4gaGF2ZSBtdWx0aXBsZSB0aWxlbWFwIGNvbXBvbmVudHMuXHJcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cclxuICAgICAgICAvLy8gPHJldHVybnM+RmFsc2UuPC9yZXR1cm5zPlxyXG4gICAgICAgIHB1YmxpYyBvdmVycmlkZSBib29sIFVuaXF1ZSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8vIENhbGxlZCBldmVyeSBmcmFtZS5cclxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgICAgIHB1YmxpYyBvdmVycmlkZSB2b2lkIFVwZGF0ZSgpXHJcbiAgICAgICAge1xyXG5cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIl0KfQo=
