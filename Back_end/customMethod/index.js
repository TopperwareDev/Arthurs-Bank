
function matchInArays(array1, array2, callback){

    let matches = 0;

    let matchedValues = new Array();

    array1.forEach(element => {
            
        array2.forEach(purchasedNumbers => {
            
            if(element == purchasedNumbers){

                ++matches;
                matchedValues.push(element);
            }

        });

    });

    callback(matches, matchedValues.toString());
}


module.exports = {

    matchInArays
  
};