function rotor (array, p){
    n = array.length
    alt = [];
    for(i = 0; i < n; i++){
        for(j = 0; j < 2; j++){
            array [i] += 1;
            array [i] *= p;
            array [i] %= n;
        }
    }
    for(j = 0; j < n; j++){
        if(j%2 == 0){
            alt [j] = array [n-1-(j/2)];
        }
        if(j%2 == 1){
            alt [j] = array [Math.floor(j/2)];
        }
    }
    return alt;
}
function dupecheck (array){
    dupe = false;
    for(i = 0; i < array.length; i++){
        for(j = i+1; j < array.length; j++){
            if(array[i] == array[j]){
                dupe = true;
                break;
            }
        }
    }
    return dupe;
}
function haschar (input, alphabet){
    has = false;
    for(i = 0; i < input.length(); i++){
        for(j = 0; i < alphabet.length(); j++){
            if(input.charAt(i) == j){
                has = true;
                break;
            }
        }
    }
    return has;
}
function positions (key, size, characters){
    position = [];
    for(i = 0; i < size/2; i++){
        x = key % (characters**i);
        position [i] = (key%(characters**(i+1))-x) / (characters**i);
    }
    return position;
}
function shift (array, length, degree){
    b = [];
    for(i = 0; i < length; i++){
        b [(i+degree) % length] = array [i];
    }
    return b;
}
function findIndex(array, t)
    {
        if(array == null){
            return -1;
        }
        console.log("JJ"+array.length);
        for(i = 0; i < array.length; i++){
            if(array[i] == t){
                return i;
            }
        }
        return -1;
    }
function rotate(matrix, zero, n){
    n+=2;
    console.log(n);
    matrix[n] = shift(matrix[n], 1);
    matrix[n+1] = shift(matrix[n+1], 1);
    if(matrix[n][0] == zero[n/2]){
        rotate(matrix, zero, n);
    }
    return matrix;
}
module.exports={
    rotor,
    dupecheck,
    haschar,
    positions,
    shift,
    findIndex,
    rotate
};