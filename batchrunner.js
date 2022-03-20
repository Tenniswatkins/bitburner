/** @param {NS} ns **/
export async function main(ns) {
    
/**
 * growPercent(server, threads, player, cores)	Calculate the percent a server would grow.
growTime(server, player)	Calculate grow time.
hackChance(server, player)	Calculate hack chance.
hackExp(server, player)	Calculate hack exp for one thread.
hackPercent(server, player)	Calculate hack percent for one thread.
hackTime(server, player)	Calculate hack time.
weakenTime(server, player)	Calculate weaken time.
 */
var hostname = ns.args[0];
//var hostname = "n00dles"
var server = ns.getServer(hostname);
var player = ns.getPlayer();
var localhost = ns.getServer().hostname;
var threads = 1;
var cores = ns.getServer().getcpucores;
var servermaxmoney = ns.getServerMaxMoney(hostname);
var hacktime = (ns.formulas.hacking.hackTime(server, player));
var hackpercent = (ns.formulas.hacking.hackPercent(server, player)*100);
var weakentime = (ns.formulas.hacking.weakenTime(server, player));
var weakenreduction = (ns.weakenAnalyze(threads,cores));
var growtime = (ns.formulas.hacking.growTime(server, player));
var growpercent = (ns.formulas.hacking.growPercent(server, threads, player, cores));
var weakenreduction = (ns.weakenAnalyze(threads,cores));
var hacksecurity = (ns.hackAnalyzeSecurity(threads));
var growsecurity = ns.growthAnalyzeSecurity(threads);
var batchhackthreads = 0;
var batchweakenhackthreads = 0;
var batchgrowthreads = 0;
var batchweakengrowthreads = 0;

//ns.tprint(hacktime/1000 + "s hack time seconds on " + hostname);
//ns.tprint(hackpercent + " hack percent on " + hostname);
//ns.tprint(hacksecurity + " hack security increase on " + hostname);
//ns.tprint(growtime/1000 + "s grow time  on " + hostname);
//ns.tprint(growsecurity + " grow security increase  on " + hostname);
//ns.tprint(weakentime/1000 + "s weaken time on " + hostname);
//ns.tprint(weakenreduction + " weakened amount on " + hostname + " for " + threads + " threads on " + cores + " cores.");
//ns.tprint(growpercent*100 + " grow percent on " + hostname + " for " + threads + " threads on " + cores + " cores.");
var aboveMinSec = (ns.getServerSecurityLevel(hostname) - ns.getServerMinSecurityLevel(hostname));
var weakenthreadsneeded = Math.ceil(aboveMinSec / weakenreduction);
//ns.tprint(aboveMinSec + "current sec level above min");
//ns.tprint(weakenthreadsneeded + " threads needed to weaken to Min Sec");

var growthtreadsneeded = Math.ceil(Math.log(((servermaxmoney)/(ns.getServerMoneyAvailable(hostname)))) / Math.log(growpercent));
//ns.tprint(growthtreadsneeded + " threads needed to grow server to max money");
var growthsecurityraised = ns.growthAnalyzeSecurity(growthtreadsneeded);
//ns.tprint(growthsecurityraised + " secuirty increase from " + growthtreadsneeded + " growth threads");


batchhackthreads = Math.ceil(90 / hackpercent);
var hackedpercentbatchtreads = (hackpercent * batchhackthreads)
//ns.tprint(batchhackthreads + " threads needed to hack 90% server max money");
//ns.tprint(hackedpercentbatchtreads + "closest approx % above 90% server max money");
var batchhacksecurityraised = ns.hackAnalyzeSecurity(batchhackthreads);
//ns.tprint(batchhacksecurityraised + " secuirty increase from " + batchhackthreads + " hack threads");
batchweakenhackthreads = (Math.ceil(batchhacksecurityraised/weakenreduction));
//ns.tprint(batchweakenhackthreads + " threads to reduce to min fom " + batchhackthreads + " hack threads");
var moneypercentremaining = (100-hackedpercentbatchtreads);
//ns.tprint(moneypercentremaining + " % remaining of money");
//ns.tprint((servermaxmoney/moneypercentremaining) + " value remaining");
batchgrowthreads = Math.ceil(Math.log(((servermaxmoney)/(servermaxmoney/moneypercentremaining))) / Math.log(growpercent));
//ns.tprint(batchgrowthreads + " batch threads needed to grow server to max money from approx 10%");
var batchgrowthsecurityraised = ns.growthAnalyzeSecurity(batchgrowthreads);
//ns.tprint(batchgrowthsecurityraised + " secuirty increase from " + batchgrowthreads + " batch growth threads");
batchweakengrowthreads = (Math.ceil(batchgrowthsecurityraised/weakenreduction));
//ns.tprint(batchweakengrowthreads + " threads to reduce to min fom " + batchgrowthreads + " batch growth threads");



ns.tprint(batchhackthreads + " H batch threads to run");
ns.tprint(batchweakenhackthreads + " W batch threads to run");
ns.tprint(batchgrowthreads  + " G batch threads to run");
ns.tprint(batchweakengrowthreads  + " W batch threads to run");
ns.tprint(hacktime + " ms hack time seconds on " + hostname);
ns.tprint(weakentime + " ms weaken time on " + hostname);
ns.tprint(growtime + " ms grow time  on " + hostname);

var executionwindow = 100;  //window of time in ms where each action finishs.
var hackstartdelay = ((weakentime-hacktime)-executionwindow); //this delay will make attack land at the same time as weaken
var growstartdelay = ((weakentime-growtime)+executionwindow); //this delay will make grow land at the same time as weaken

/*
HWGW, 
First weaken is baseline lenght, hack is always shorter so hack delays to run as weaken is in progress.
Second weaken starts 2x execution window after first weaken starts. this allows everything to land in succession within the execution windows
EX:
H 1000
W 2000
G 1500
Execution Window 100
Given the example times above weaken one would start. 
weaken1 starts and runs its 2000
at 200 delay, weaken2 starts, ends at 2200
at 600 delay grow starts runs its 1500, ends at 2100
at 900 delay hack starts runs its 1000 ends at 1900

*/

ns.tprint((hackstartdelay + hacktime) + "ms time hack and delay");
ns.tprint((weakentime) + "ms time weaken1 and delay");
ns.tprint((growstartdelay + growtime) + "ms time grow and delay");
ns.tprint((weakentime+(executionwindow*2)) + "ms time weaken2 and delay");
ns.tprint("These should all be in order and differ by " + executionwindow + "ms");
var totalbatchexecutiontime = (weakentime+(executionwindow*2));
ns.tprint(totalbatchexecutiontime + "ms total batch run time");

var starnewbatch = (executionwindow*5);
var totalneededbatches = Math.floor(totalbatchexecutiontime / starnewbatch);
ns.tprint(totalneededbatches + " needed batches");
var batch = 0
var batchactiondelay = 0
while (true) {
var i = 0;
	while (i < totalneededbatches) {
		ns.exec("weaken1.js", localhost, batchweakenhackthreads, hostname, 0, i, batch);
		batchactiondelay = (executionwindow*2);
		ns.exec("weaken2.js", localhost, batchweakengrowthreads, hostname, batchactiondelay, i, batch);
		batchactiondelay = (growstartdelay - (executionwindow*2));
		ns.exec("grow.js", localhost, batchgrowthreads, hostname, batchactiondelay, i, batch);
		batchactiondelay = (hackstartdelay - (growstartdelay + (executionwindow*2)));
		ns.exec("hack.js", localhost, batchhackthreads, hostname, batchactiondelay, i, batch);
		await ns.sleep(executionwindow*5);
		i++;
	}
	//wait partial time to start next batch to avoid sec penality and desync
	await ns.sleep((totalneededbatches - (totalbatchexecutiontime / starnewbatch))*starnewbatch)
	batch++;
}
}

