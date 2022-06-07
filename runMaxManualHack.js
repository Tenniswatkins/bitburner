/** @param {NS} ns */
export async function main(ns) {
	/**
	Launch Max threads of manualHack.js on host server targeting named server
	Example Usage: run runMaxManualHack.js foodnstuff n00dles;
	This will run 6 threads (16 GB total, each thread using 2.4 GB) on foodnstuff targeting n00dles
	*/
	//arg schema [0 host, 1 args for manual hack]
	const host = ns.args[0];
	const script = "manualHack.js";
	const target = ns.args[1];
	var freeram = (ns.getServerMaxRam(host) - ns.getServerUsedRam(host));
	var ramcost = ns.getScriptRam(script, host);
	if (ramcost == 0){
		await ns.scp(script, "home", host);
		ramcost = ns.getScriptRam(script, host);
	}
	var threads = Math.floor(freeram/ramcost);
	ns.exec(script, host, threads, target);
}
