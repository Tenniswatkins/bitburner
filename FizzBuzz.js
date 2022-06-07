/** @param {NS} ns */
export async function main(ns) {
	const maxCount = ns.args[0];
	let i;
	let fizzbuzzstring = "";
    for (i=1; i<=maxCount; i++)
    {
		let thisI = await findDivisors(ns, i);
		await insertionSort(ns, thisI);
		let l = thisI.length
		let thisIString = null;
		for (j=1; j<=l; j++){
			thisIString = await fizzbuzzchecks(ns, thisI[j]);		
		}
		if(thisIString == null){
			fizzbuzzstring += i
		} else {
			fizzbuzzstring += thisIString
		}
		
    }
	ns.print(fizzbuzzstring);
	ns.tprint(fizzbuzzstring);
	
	
	let divisorslist = await findDivisors(ns, maxCount);
	ns.tprint(divisorslist);
	await insertionSort(ns, divisorslist); //sorts exisiting array, no need for secodnary array.
	ns.tprint(divisorslist);

}

/** @param {NS} ns */
        export async function fizzbuzzchecks(ns, i){
			// number divisible by 3? print 'Fizz' in place of the number
            if (i%3 == 0) {return "Fizz" } 
			// number divisible by 5, print 'Buzz' in place of the number
            if (i%5 == 0) {return "Buzz"} 
			// number divisible by 7, print 'Woof' in place of the number
			if (i%7 == 0) {return "Woof"}
			return null
			/** Arbitray Case
			 * // number divisible by somenumber, print 'something' in place of the number
			 * if (i%somenumber == 0) {return "something"}
			 */		
        }


/** @param {NS} ns */
    export async function findDivisors(ns, n){
		let divisors = [];
		 for (let i = 1; i <= Math.sqrt(n); i++){
        	if (n%i==0){
				    // If divisors are equal, print only one
          			if ((n / i) == i){
                		divisors.push(i);}
                	// Otherwise print both
            		else{
						divisors.push(i)
						divisors.push(n / i)}
			}
		 }
		 return divisors
}


//Insertion Sort (efficent for small arrays) Time Complexity: O(N^2) 



/** @param {NS} ns */
    export async function insertionSort(ns, arr){
	let n = arr.length;		
    let i, key, j; 
    for (i = 1; i < n; i++)
    { 
        key = arr[i]; 
        j = i - 1; 
   
        /* Move elements of arr[0..i-1], that are 
        greater than key, to one position ahead 
        of their current position */
        while (j >= 0 && arr[j] > key)
        { 
            arr[j + 1] = arr[j]; 
            j = j - 1; 
        } 
        arr[j + 1] = key; 
    } 
}
