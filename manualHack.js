/** @param {NS} ns */
export async function main(ns) {
//args  0: target, 1: loop
	const loop = ns.args.length > 1 ? ns.args[1] : true; // Loop set to expressed arg or set to default value (condition to test ? If true : If false)
    do {
        await ns.hack(ns.args[0])
        if (loop) await ns.sleep(10); //Sleep 10 if looping to prevent lockout
    } while (loop);
}
