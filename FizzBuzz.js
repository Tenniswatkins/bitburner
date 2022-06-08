/** @param {NS} ns */
export async function main(ns) {
	const maxCount = ns.args[0];
	let i;
	let fizzbuzzstring = "";
    for (i=1; i<=maxCount; i++)
    {
		let thisI = await findDivisors(ns, i);
		//ns.print("Divisors found for " + i + " are " + thisI);	
		await insertionSort(ns, thisI);
		//ns.print("Divisors found and sorted for " + i + " are " + thisI);	
		let thisIString = null;
		thisIString = await fizzbuzzbuilder(ns, thisI);
		//ns.print("Builder returned " + thisIString);	
		if(thisIString == null){
			fizzbuzzstring += " "
			fizzbuzzstring += i
		} 
		if (thisIString != null) {
			fizzbuzzstring += " "
			fizzbuzzstring += thisIString
		}
				
    }
	ns.print(fizzbuzzstring);
	ns.tprint(fizzbuzzstring);
}


//returns for each divisor that is a multiple  (IE FizzFizz for 6, 3 and 6 both returning 1 fizz)
/** @param {NS} ns */
        export async function fizzbuzzbuilder(ns, fizzbuzzarray){
			// itterate through array of divisors to lenght     Ex: [1,2,4,5,10,20,25,50,100]
			let builtreturn;
			let pos = 0;
			let length = fizzbuzzarray.length;
			for(let j=1; j<=length; j++){
				let thisreturn = null;
				let value = fizzbuzzarray[pos]
				thisreturn = await fizzbuzzchecks(ns, value)
				if (!(thisreturn === null)){
					if (typeof builtreturn === 'undefined'){
						builtreturn = thisreturn;
					} else {	
						builtreturn = builtreturn + thisreturn;
						}
					}
				pos++;
			}
			if (!(typeof builtreturn === 'undefined')){return builtreturn}
			return null	
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
