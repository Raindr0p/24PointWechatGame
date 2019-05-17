function cal(a, b, op)		// op: 0:+,1:-,2:*,3:/
{
    a = parseFloat(a)
    b = parseFloat(b)
    switch (op)		// +-x/ operations
    {


        case 0: return (a + b); break;
        case 1: return (a - b); break;
        case 2: return (a * b); break;
        case 3: return (a / b); break;
    }

}

function isEqual(d1, d2)		// are two floating numbers equal to certain accuracy
{
    var d = Math.abs(d1 - d2);
    // find the absolute value of the difference
    return (d <= 0.001);
}

function D24(v0, v1, v2, v3)		// 24 points exhuastion fuction
{

    var op = ["+", "-", "*", "/"];		//  +:0  -:1 *:2  /:3

    var v = new Array();		// the 4 integers  saved in this array

    v[0] = v0; v[1] = v1; v[2] = v2; v[3] = v3;

    /*-----------EXHUAST INTEGER POSITIONS USING QUADRUPLE LOOP: 4!=24 SITUATIONS-----------*/

    var count = 0;		// how many ways to 24
    var res = [];
    res[0] = false

    for (var i1 = 0; i1 < 4; i1++) {

        for (var i2 = 0; i2 < 4; i2++) {		// quadruple loop starts

            if (i2 != i1) {

                for (var i3 = 0; i3 < 4; i3++) {

                    if (i3 != i2 && i3 != i1) {

                        for (var i4 = 0; i4 < 4; i4++) {

                            if (i4 != i3 && i4 != i2 && i4 != i1) {

                                /*-----------EXHUAST OPERATORS USING TRIPLE LOOP: 4X4X4=64 SITUATIONS-----------*/

                                for (var f1 = 0; f1 < 4; f1++)		// triple loop starts

                                    for (var f2 = 0; f2 < 4; f2++)

                                        for (var f3 = 0; f3 < 4; f3++)		// operators f1,f2,f3

                                        {
                                            ;

                                            /*-----------LIST OPERATOR PRIORITES: 3!-1=5 SITUATIONS-----------*/

                                            var t1, t2, t3;		// intermediate values

                                            // #1: ((a 。b)。c)。d

                                            t1 = cal(v[i1], v[i2], f1);

                                            t2 = cal(t1, v[i3], f2);

                                            t3 = cal(t2, v[i4], f3);


                                            if (isEqual(t3, 24))		// check 24

                                            {
                                                res[0] = true
                                                res.push("((" + v[i1] + op[f1] + v[i2] + ")" + op[f2] + v[i3] + ")" + op[f3] + v[i4]);
                                                return (res)
                                                count++;

                                            }

                                            // #2: (a 。b)。(c。 d)

                                            t1 = cal(v[i1], v[i2], f1);

                                            t2 = cal(v[i3], v[i4], f3);

                                            t3 = cal(t1, t2, f2);


                                            if (isEqual(t3, 24))		// check 24

                                            {
                                                res[0] = true
                                                res.push("(" + v[i1] + op[f1] + v[i2] + ")" + op[f2] + "(" + v[i3] + op[f3] + v[i4] + ")");
                                                return res
                                                count++;

                                            }

                                            // #3: (a。(b。c))。d

                                            t1 = cal(v[i2], v[i3], f2);

                                            t2 = cal(v[i1], t1, f1);

                                            t3 = cal(t2, v[i4], f3);


                                            if (isEqual(t3, 24))		// check 24

                                            {
                                                res[0] = true
                                                res.push("(" + v[i1] + op[f1] + "(" + v[i2] + op[f2] + v[i3] + "))" + op[f3] + v[i4]);
                                                return res
                                                count++;

                                            }

                                            // #4: a。((b。c)。d )：

                                            t1 = cal(v[i2], v[i3], f2);

                                            t2 = cal(t1, v[i4], f3);

                                            t3 = cal(v[i1], t2, f1);


                                            if (isEqual(t3, 24))		// check 24

                                            {
                                                res[0] = true
                                                res.push(v[i1] + op[f1] + "((" + v[i2] + op[f2] + v[i3] + ")" + op[f3] + v[i4] + ")");
                                                return res
                                                count++;

                                            }

                                            // #5: a。(b。(c。d))

                                            t1 = cal(v[i3], v[i4], f3);

                                            t2 = cal(v[i2], t1, f2);

                                            t3 = cal(v[i1], t2, f1)


                                            if (isEqual(t3, 24))		// check 24

                                            {
                                                res[0] = true
                                                res.push(v[i1] + op[f1] + "(" + v[i2] + op[f2] + "(" + v[i3] + op[f3] + v[i4] + "))");
                                                return res
                                                count++;

                                            }

                                        }

                            }
                        }
                    }
                }
            }
        }
    }
    return res


    /*-----------EXHUASTION OVER: 24*64*5=7680 EXPRESSIONS IN TOTAL-----------*/

    //if (count==0)

    //printf("\n%d,%d,%d,%d CANNOT RESULT IN 24.",v0,v1,v2,v3);

    //else

}
function isNumber(element) // 判断该元素的ascii码是否在48-57之间
{
    var ascii = element.charCodeAt();
    if (ascii >= 48 && ascii <= 58)
        return true;
    else
        return false;
}

function isLegal(v0, v1, v2, v3, expression) {
    //---------记录数字&&判断数字个数是否为3------------

    var foundNumbers = new Array();     // 记录表达式中出现的数字，数组下标为1-4
    var numberCount = 0;     // 记录数字出现区间的个数，以判断是否为4个
    var inTheMiddleOfANumber = false;       // 用于判断是否正在记录一个数字

    for (var i = 0; i < expression.length; i++) {

        if (numberCount > 4) return false;       // 如果多于4个数则则不符合要求

        if (isNumber(expression[i])) {        // 该元素是一个数字

            if (inTheMiddleOfANumber == false) {      // 该元素是首位数字
                inTheMiddleOfANumber = true;        // 开始记录该数字
                numberCount++;      // 计数器记录这是找到的第几个数字
                foundNumbers[numberCount - 1] = expression[i];       // 因为是首位数字直接将该元素赋值字符串
            } else {      // 该元素不是首位数字
                foundNumbers[numberCount - 1] += expression[i]       // 将该元素添加到原有字符串的末尾
            }

        } else {      // 该元素不是一个数字
            inTheMiddleOfANumber = false;       // 从头开始寻找数字
        }
    }

    // document.write("Numbers found in the expression are:" + "<br>");
    // for (var i = 0; i < 4; i++) {
    //     document.write(foundNumbers[i] + "<br>");
    // }

    // document.write("There are " + numberCount + " numbers found in total." + "<br>");
    // if (numberCount < 4) return false;       // 如果少于4个数则则不符合要求

    //---------判断4个数字是否与给出的数字一一对应------------

    var originalNumbers = new Array();      // 给出数字
    var hasMet = [false, false, false, false];       // 给出数字是否被使用

    originalNumbers[0] = v0; originalNumbers[1] = v1;
    originalNumbers[2] = v2; originalNumbers[3] = v3;

    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            if (hasMet[j] == false && foundNumbers[i] == originalNumbers[j]) {
                hasMet[j] = true;
                break;
            }
        }
    }

    for (var i = 0; i < 4; i++) {
        if (hasMet[i] == false)
            return false;
    }

    return true;

}


module.exports = {
    D24: D24,
    isLegal: isLegal
}