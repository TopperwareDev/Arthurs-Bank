function matchInArays(array1, array2, callback){

    let matches = 0;

    array1.forEach(element => {
            
        array2.forEach(purchasedNumbers => {
            
            if(element == purchasedNumbers){

                ++matches;

            }

        });

    });

    callback(matches);
}


module.exports = {

    matchInArays
  
};