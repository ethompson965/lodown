'use strict';

// YOU KNOW WHAT TO DO //

/**
 * each: Designed to loop over a collection, Array or Object, and applies the 
 * action Function to each value in the collection.
 * 
 * @param {Array or Object} collection: The collection over which to iterate.
 * @param {Function} action: The Function to be applied to each value in the 
 * collection
 * @return {undefined}: it just calls a provided function on each element in an array
 * in which the function can mutate the calling array 
 */
function each(collection, action) {
    if (Array.isArray(collection)) {
        for (var i = 0; i < collection.length; i++) {
            action(collection[i], i, collection);
        }
    }
    else {
        for (var key in collection) {
            action(collection[key], key, collection);
        }
    }
}
module.exports.each = each;

/*identity: Designed to return the same value used as an argument 
 *
 *@param {value}: The value to be returned in the function body 
 *@return {value} the first value or argument given to identity 
 */

function identity(value) {
    return value;
}
module.exports.identity = identity;

/*first: Designed to return the first element in an array 
 *@param:{array}
 @param: {number}
 *@return {the first element or first numbered elements}- If a number is passed in, then 
 first will return that number of elements in the array
 */

function first(array, number) {
    if (Array.isArray(array) === false || number < 0) {
        return [];
    }
    else if (number === undefined && isNaN(number)) {
        return array[0];
    }
    else if (number > array.length) {
        return array;
    }
    else {
        return array.slice(0, number);
    }

}
module.exports.first = first;

/*last:Designed to return the last element in an array
 *@param {array} 
  @param {number}
 *@return {array}: the last element in an array or a number of multiple values if
 * a number is passed in
 */



function last(array, number) {
    
    if (Array.isArray(array) === false || number < 0) {
        return [];
    }
    else if (number === undefined && isNaN(number)) {
        return array[array.length - 1];
    }
    else if (number > array.length) {
        return array;
    }
    else {
        return array.slice(-number);
    }



}
module.exports.first = first;

/*indexOf: returns the index of a value found in an array or -1 if the value is not in array
 *@param: {array}-Array is iterated over
 *@param{value}
 *@return{index, number}: if the value is found in an array, the index is return, if not 
 *then -1 is returned
 */


function indexOf(array, value) {
    for (var i = 0; i < array.length; i++) {
        if (value === array[i]) {
            return i;
        }

    }
    return -1;
}

module.exports.indexOf = indexOf;

/*typeOf: returns any type of given value as a string
 *@param{any value( i.e. string, array, object, undefined, etc.)}: to be returned as a string
 *after meeting the conditions
 *@return{any Datatype}: the name of any datatype is printed in the console the typeof is applied to 
 * that value 
 */

function typeOf(val) {
    if (typeof val === "string") {
        return "string";
    }
    else if (Array.isArray(val)) {
        return "array";
    }
    else if (val === null) {
        return "null";
    }
    else if (val instanceof Date) {
        return "date";
    }
    else if (typeof val === 'object') {
        return "object";
    }
    return typeof(val);
}
module.exports.typeOf = typeOf;

/*contains: returns a true when an array contains a value or false when value is not present
 *@param{array}: array is iterated over
 *@param{value}
 *@return{Boolean} true if a value is an element in an array, false otherwise
 */

function contains(array, value) {
    for (var i = 0; i < array.length; i++) {
        if (value === array[i]) {
            return true;
        }
    }
    return false;
}
module.exports.contains = contains;

/*unique: returns a new array of all elements from an array with duplicates removed. Only the first
 *occurrence of each value is kept in the array.
 *@parameters{array}-the array is looped over and elemments are pushed into a new array 
 *@return {array} a new array with all duplicate elements removed
 */

function unique(array) {
    let arr = [];
    for (let i = 0; i < array.length; i++) {
        if (arr.indexOf(array[i]) == -1) {
            arr.push(array[i]);
        }

    }
    return arr;
}
module.exports.unique = unique;

/*filter: filters through each value in an array, and passes values that meet true conditions into
*a new array
*@param{array, function}-the array is looped over and elements that pass the condition inside the
function are pushed into a new array.
*@param:{Function} func-applies to a new array with all the elements that meet the conditions
@return {array}: like reject, except the array returned in filter holds all the truthy values from
* the conditions of the function arguments
*/


function filter(array, funct) {
    let myFilter = [];
    for (var i = 0; i < array.length; i++) {
        if (funct(array[i], i, array)) {

            myFilter.push(array[i]);
        }
    }
    return myFilter;
}
module.exports.filter = filter;

/*reject: returns elements in a new array with elements that did not return true
 *@param{array, function}: If the elements in an array of a function do not return true, 
 * those elements are returned
 *@param{Function}func-applies to the elements that did not return true
 @return{array} an array of all the falsy elements in the reject function
 */
function reject(array, funct) {
    return filter(array, function(element, index, array) {
            if (funct(element, index, array) !== true) {
                return element;
            }

        }

    )
}
module.exports.reject = reject;


/*partition: returns a new array with two sub arrays: one that holds elements with truthy values
 *and one that holds elements with falsy values
 *@param:{array, function}: function is passed in that checks to see if elements in array
 *are truthy or falsey values
 *@{Function} func-applies to a the new array holding two sub arrays with different types of 
 *@return{array}: a new array with the two sub arrays created inside;
 *values*/

function partition(array, funct) {
    //create two arrays 
    let arr1 = [];
    let arr2 = [];
    
    reject(array, function(element, key, arr) {
        
        if (funct(element, key, arr) === true) {
            
            arr1.push(element);


            

        }
           
        if (funct(element, key, arr) === false) {
            
            arr2.push(element);
        }
    });
    
    return [arr1, arr2];
}
module.exports.partition = partition;

/*map:looks through each value in an array and returns a new array of values 
*@param{collection, function}-the each function can be used to loop over a collection, an array
*or object, which applies to each value in the collection
@{Function} func-applies to the new array created with values pushed into it
*@return{array}: a new array with the modiefied values of the passed in callback function
*/

function map(collection, funct) {
    let myArr = [];
    each(collection, function(element, i, collection) {
        myArr.push(funct(element, i, collection));
    });
    return myArr;
}
module.exports.map = map;

/*pluck: returns a new array of property values 
 *@param:{array}:array contains objects whose properties are mapped through and elements 
 *are returned. 
 @param{property}:The lists of the given property are then extracted
 @return{array}:the array includes the information of the extracted property
 */



function pluck(array, property) {
    

    
    let arr = map(array, function(element) {
        return element[property];
    });
    return arr;
}

module.exports.pluck = pluck;


/*every: returns a boolean based on the values in a collection, array or object
*If the elements in the collection meet the conditions of the function passed in as an argument of
every, every returns true, if the conditions
*are false, it returns false
*@param:{collection}:The collection is passed through the each function
*@param:{Function}func:applies to the boolean that returns true or false depending on what 
condition the function values meet
*@return{Boolean}-true if all the elements in array meet the condition of the argument function,
*or false if at least one element does not meeet the condition
*/

function every(collection, funct) {
    
    var bool = true;


    if (typeof funct === 'function') {
        
        each(collection, function(element, i, collection) {
        
            if (funct(element, i, collection) === false) {
                bool = false;
            }
        });
    }
    else {
        each(collection, function(element) {
            if (!element) {
                bool = false;
            }
        });

    }
    return bool;
}
module.exports.every = every;


/*some: Designed to return a value of true if at least one of the elements in the array return meet
 *the condition of true; it returns false when none of the elements in an array return true
 *@param{collection, function}-The collection is passed through the each function
 *@param{Function}action-applies to the boolean being returned based on the conditions the function
 *meets
 *If there's no function provided, only one element returns true for the function return true. 
 * else the function will return false.
 @return{Boolean}-true if at least one of the elements meet the conditions, false otherwise 
 */

function some(collection, funct) {

    var bool = false;
    
    
    each(collection, function(element, i, collection) {
        if (funct === undefined) {
            if (!!element) {
                bool = true;
            }
        }
        else if (funct(element, i, collection)) {
            bool = true;
        }
    });
    return bool;
}
module.exports.some = some;

/*reduce: Designed to consolidate a list of values into a single value
*@parameter{array, function, seed): seed is passed in iterations until it references the entire
list
*@parameter{Function} funct-applies to the seed being returned after it has referenced the entire 
*return{accumulator} where the total result function or value is stored
*list*/

function reduce(array, funct, seed) {
    
    each(array, function(element, index, array) {
        if (seed === undefined) {
            seed = array[0];
        }
        else {
            seed = funct(seed, element, index);
        }
    });
    return seed;
}
module.exports.reduce = reduce;


/*extend: Designed to shallow copy all properties in the source object to the target object
@parameter{object1, object2, other objects}-object2 is the source object whose properties are
*copied into object1, the target object. If the other objects are passed in, their properties are
sourced into object1. The assign property, used to copy object properties can be incorporated in the 
*extend function.
*@return{object}: an object with its properties along with all the other properties of other objects
*passed into the function
*objects in it;*/

function extend(object1, object2, object3) {
    
    var args = Array.from(arguments);
    console.log(args);
    var arrWo = args.slice(1);
    
    for (var i = 0; i < arrWo.length; i++) {
        
        Object.assign(args[0], arrWo[i]);
    }

    

    return object1;
}
module.exports.extend = extend;
