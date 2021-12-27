
function matchInArays(array1, array2, callback){

    let matches = 0;

    let matchedValues = new Array();

    console.log(array1);
    console.log(array2);

        array1.forEach(requestedNumbers => {
            
            array2.forEach(purchasedNumbers => {
                
                if(requestedNumbers == purchasedNumbers){
    
                    ++matches;
                    matchedValues.push(requestedNumbers);

                }
    
            });
    
        });

        callback(matches, matchedValues.toString());

}


module.exports = {

    matchInArays
  
};