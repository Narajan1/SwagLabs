let randomeNumbers_arr = [];

module.exports = {
    
    /*generateRandomeNumberOfRandomeItems(itemsQnt, items_arr_lenght) {
        while(randomeNumbers_arr.length < itemsQnt){
            let rndNum = Math.floor(Math.random() * items_arr_lenght) + 1;
            if(randomeNumbers_arr.indexOf(rndNum) === -1) {
                randomeNumbers_arr.push(rndNum);
            };
        };
        return randomeNumbers_arr;
     }*/

     generateRandomeNumberOfRandomeItems(itemsQnt) {
        while(randomeNumbers_arr.length < itemsQnt){
            let rndNum = Math.floor(Math.random() * itemsQnt) + 1;
            if(randomeNumbers_arr.indexOf(rndNum) === -1) {
                randomeNumbers_arr.push(rndNum);
            };
        };
        return randomeNumbers_arr;
     }
}