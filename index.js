'use strict';

// YOU KNOW WHAT TO DO //

/**
 * each: Designed to loop over a collection, Array or Object, and applies the 
 * action Function to each value in the collection.
 * 
 * @param {Array or Object} collection: The collection over which to iterate.
 * @param {Function} action: The Function to be applied to each value in the 
 * collection
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
 *@param{function} action: applies to the returned value in the function body
 *
 */

function identity(value) {
    return value;
}
module.exports.identity = identity;

/*first: Designed to return the first element in an array 
 *@param:{array, number}
 *@param:{Function} action-applies to the first number items of an array
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
 *@param: {array, number} 
 *@param: {Function} action- applies to the last number items in an array
 */



function last(array, number) {
    // debugger 
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
 *@param: {array, value}-Array is iterated over
 *@param{Function} action-applies to the index of the elements in an array
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
 *@param{Function} action-applies to any value in Javascript 
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
 *@param{array, value}: array is iterated over
 *@param{Function} action: applies to the value in an array that returns true if the conditions are met
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

/*unique: returns a new array of all elements from an array with duplicates rempved. Only the first
 *occurrance of each value is kept in the array.
 *@parameters{array}-the array is looped over and elemments are pushed into a new array 
 *@paramters{Function} action-applies to a new array being returned
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
*@param:{Function} action-applies to a new array with all the elements that meet the conditions
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
 *@param{Function}action-applies to the elements that did not return true
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
 *@{Function} action-applies to a the new array holding two sub arrays with different types of 
 *values*/

function partition(array, funct) {
    //create two arrays 
    let arr1 = [];
    let arr2 = [];
    //call function that rejects elements in array
    reject(array, function(element, key, arr) {
        //return if function conditions strictly equal true or false 
        if (funct(element, key, arr) === true) {
            //push the truthy values in 1st array
            arr1.push(element);


            //return the array with conditions

        }
        //if function conditions strictly equal false    
        if (funct(element, key, arr) === false) {
            //push falsy values in 2nd array
            arr2.push(element);
        }
    });
    //return statement
    return [arr1, arr2];
}
module.exports.partition = partition;

/*map:looks through each value in an array and returns a new array of values 
*@param{collection, function}-the each function can be used to loop over a collection, an array
*or object, which applies to each value in the collection
@{Function} action-applies to the new array created with values pushed into it
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
 *@param:{array, property}:array contains objects whose properties are mapped through and elements 
 *are returned
 *@param: {Function}action-applies to the array being returned and containing the property values
 */



function pluck(array, property) {
    //create an array to return the values

    //use the _.map function to access the values 
    let arr = map(array, function(element) {
        return element[property];
    });
    return arr;
}

module.exports.pluck = pluck;


/*every: returns a boolean based on the values in a collection, array or object
*If the values meet the conditions of the each functions, every returns true, if the conditions
*are false, it returns false
*@param:{collection, function}:The collection is passed through the each function
#@param:{Function}action:applies to the boolean that returns true or false depending on what 
condition the function values meet*/

function every(collection, funct) {
    //assign a boolean to true
    var bool = true;


    if (typeof funct === 'function') {
        //use the each function to reference objective 1
        each(collection, function(element, i, collection) {
            //create an if else chain checking the conditions for true or false
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


/*some: Designed to return a value of true if at least some of the values in the array return meet
 *the condition of true
 *@param{collection, function}-The collection is passed through the each function
 *@param{Function}action-applies to the boolean being returned based on the conditions the function
 *meets
 */

function some(collection, funct) {
    //assign boolean of true
    var bool = false;
    //check if function is provided
    //use _.each function to reference objective 1
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
*@parameter{Function} action-applies to the seed being returned after it has referenced the entire 
*list*/

function reduce(array, funct, seed) {
    //use _.each function for objective 1
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
@param:{Function} action-applies to an updated object returned with the properties of the other 
*objects in it;*/

function extend(object1, object2, object3) {
    //access the function object arguments by using the Array.from() method
    var args = Array.from(arguments);
    console.log(args);
    var arrWo = args.slice(1);
    //To locate the elements in the objects array, loop through it with a for loop
    for (var i = 0; i < arrWo.length; i++) {
        //use the assign property
        Object.assign(args[0], arrWo[i]);
    }

    //to copy the other arguments into the 0 index of object1, use the assign property

    return object1;
}
module.exports.extend = extend;
