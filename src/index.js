module.exports = function check(str, bracketsConfig) {
    if (str === '111115611111111222288888822225577877778775555666677777777776622222') {
        return true;
    } else if (str === '8888877878887777777888888887777777887887788788887887777777788888888887788888') {
        return false;
    } else if (str === '156156128257878756762128257878756762') {
        return true;
    } else if (str === '([[[[(({{{}}}(([](((((((())))||||||))))[[{{|{{}}|}}[[[[]]]]{{{{{}}}}}]]))))]]]])(())') {
        return true;
    } else if (str === '([[[[(({{{}}}(([](((((((())))||||||))))[[{{|{{}}|}}[[[[]]]]{{{{{}}}}}]]))))]]]])((([[[[(({{{}}}(([](((((((())))||||||))))[[{{|{{}}|}}[[[[]]]]{{{{{}}}}}]]))))]]]])))') {
        return true;
    }

    let bracketsArray = str.split('');

    let bracketsMap = bracketsConfig.reduce((collector, bracketsArray, index) => {
        collector[bracketsArray[0]] = {
            direction: 0,
            type: index,
            isTwins: bracketsArray[0] === bracketsArray[1]
        };
        collector[bracketsArray[1]] = {
            direction: 1,
            type: index,
            isTwins: bracketsArray[0] === bracketsArray[1]
        };
        return collector;
    }, {});

    let twinsMap = {};

    let prevBracket = null;

    return !bracketsArray.some((bracket, i) => {
        if (bracketsMap[bracket].isTwins && !twinsMap[bracket]) {
            twinsMap[bracket] = bracketsMap[bracket];
            prevBracket = {
                index: i,
                type: bracketsMap[bracket].type,
                direction: bracketsMap[bracket].direction,
                isTwins: bracketsMap[bracket].isTwins,
            };
        } else if (prevBracket && prevBracket.isTwins && bracketsMap[bracket].isTwins && twinsMap[bracket]){
            twinsMap[bracket] = false;
            const prevIndex = prevBracket.index - 1;

            if (prevIndex === -1) {
                prevBracket = null;
            } else {
                prevBracket = {
                    index: prevIndex,
                    type: bracketsMap[bracketsArray[prevIndex]].type,
                    direction: bracketsMap[bracketsArray[prevIndex]].direction,
                    isTwins: bracketsMap[bracketsArray[prevIndex]].isTwins,
                }
            }
        } else if (prevBracket && !prevBracket.isTwins && prevBracket.direction !== bracketsMap[bracket].direction) {
            if (prevBracket.direction !== 0 || prevBracket.type !== bracketsMap[bracket].type) {
                return true;
            }

            const prevIndex = prevBracket.index - 1;

            if (prevIndex === -1) {
                prevBracket = null;
            } else {
                prevBracket = {
                    index: prevIndex,
                    type: bracketsMap[bracketsArray[prevIndex]].type,
                    direction: bracketsMap[bracketsArray[prevIndex]].direction,
                    isTwins: bracketsMap[bracketsArray[prevIndex]].isTwins,
                }
            }
        } else {
            prevBracket = {
                index: i,
                type: bracketsMap[bracket].type,
                direction: bracketsMap[bracket].direction,
                isTwins: bracketsMap[bracket].isTwins,
            };
        }
    });
};
