
export function stdChannel() {
    let currentTakers = [];
    function take(cb, matcher) {
        cb['MATCH'] = matcher;
        cb.cancel = () => {
            currentTakers = currentTakers.filter(item => item !== cb);
        }
        currentTakers.push(cb);
    }

    function put(input) {
        for(let i = 0; i < currentTakers.length; i++) {
            const taker = currentTakers[i];
            if(taker['MATCH'](input))  {
                taker.cancel();
                taker(input);
            }
        }
    }

    return { take, put };
}