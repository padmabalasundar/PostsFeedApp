// Given 2 sorted arrays A and B with n and m elements respectively. A has enough space at the end of the array to fit in all elements of B. Write an algorithm to merge the elements of A and B ensuring the resultant A is sorted as well. The code cannot use an extra array.

// We can try assigning different values to the Array and check the Output in Online Editor - https://playcode.io/
// https://playcode.io/   - Online JavaScript Playgroung 


/*
Assumptions:
1. Two Arrays - contains only Numbers , +ve/-ve/Decimals
2. Both the Arrays are not empty
3. Array1 can accomodate Array2
4. Arrays - both are Sorted
5. Extra Array is not used for the implementation


Time Complexity - O(m+n+m+n) -> 0(n)
Space Complecity - O(m+n) -> O(n)

If Utility method is used to Merge and Sort the Two Arrays - the Time Complexity will be more , so not used it here
*/

var array1 = [-12.78,-11,0.7,3,16];
var array2 = [-1,2,4,8,9];

// Call the function with Two arrays and prints the Result in console
console.log(mergeSortArray(array1, array2));


// Function to Merge and Sort two Given Arrays
function mergeSortArray( array1, array2){

	// Check if the Arrays are empty
	if (checkEmptyArray(array1)){
		alert('Array 1 is Empty / Not defined');
		return;
	}
	
	if (checkEmptyArray(array2)){
		alert('Array 2 is Empty / Not defined');
		return;
	}
	
	// Check if the Arrays contains only Numbers
	if ( !checkNumberArray(array1) ){
		alert('Array 1 - contains values other than Numbers');
		return;
	}

	if ( !checkNumberArray(array2) ){
		alert('Array 2 - contains values other than Numbers');
		return;
	}

	//All the edge and error cases are Tested - the Arrays contain only number

	console.log("Array 1 - Before Merge & Sort: " +array1); //Prints the value to the Console
	console.log("Array 2 - Before Merge & Sort: " +array2);

	// Sort the two Arrays and store it in Array 1
	return (sortArrays(array1,array2));

}

//Method to check if the Array is defined and Not empty
// Time complexity - O(1)
function checkEmptyArray(arr){
	if (Array.isArray(arr) && arr.length){
		return false;
	}
	return true; // Array is undefined or Empty
}


//Method to check if the Array contains only Number values
// Time complexity - O(n) - worstcase - each element of the Array checked (Size 'n' )
function checkNumberArray(arr){

	//every - function - calls the callback function for each element of the array it is called upon
	return(arr.every( function(val){ 
		if(typeof val !== 'number'){ // check whether each element is  of type number
			return false;
		}
		return true;
	})); 
	
	

}

// Method to Merge and Sort the two Arrays
function sortArrays(arr1,arr2){

	var i,j,k;
	var m = arr1.length;
	var n = arr2.length;

    i=m-1; // i - Points to last element of Array 1
    j=n-1; // j - Points to last element of Array 2
    k=m+n-1; // k - Points to last empty position in Array 1

    while(i>=0&&j>=0) // Time Complexity - O(m+n) -> O(n)
    {
        if(arr1[i]>arr2[j]){ // Array 1 last element > Array 2 last element
        	arr1[k]=arr1[i--]; // Store it in last position of Array 1
        }
        else{ // Array 2 last element > Array 1 last element
        	arr1[k]=arr2[j--];  // Store it in last position of Array 1
        }
       
        k--; // Decrement the Array 1 pointer postion
    }
    while(j>=0) // Array 2 still has elements  that need to be stored in array 1
    arr1[k--]=arr2[j--];

	return arr1;

}



