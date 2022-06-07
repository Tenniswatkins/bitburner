/** @param {NS} ns */
export async function main(ns) {
    ns.disableLog("ALL");
    ns.enableLog("hack");
    ns.enableLog("weaken");
    ns.enableLog("grow");
      
    //args schema  0: target, 1: loop
    const target = ns.args[0];
    const loop = ns.args.length > 1 ? ns.args[1] : true; // Loop set to expressed arg or set to default value (condition to test ? If true : If false)
    const moneyThresh = ns.getServerMaxMoney(target) * 0.99; // Defines how much money a server should have before we hack it
    const securityThresh = ns.getServerMinSecurityLevel(target) + 3;// Defines the maximum security level the target server can have.
    var actionnumber = 0;
    do {
        actionnumber = await guardedhack(ns, moneyThresh, securityThresh, target);
        //ns.print("action number " + actionnumber);
        await actions(ns, actionnumber , target);
             if (loop) await ns.sleep(10); //Sleep 10 if looping to prevent lockout
        } while (loop);
}
/** @param {NS} ns */
        export async function guardedhack(ns, moneyThresh, securityThresh, target) {
            //ns.print("guarded hack");
            if (ns.getServerSecurityLevel(target) > securityThresh) return 1;
            if (ns.getServerMoneyAvailable(target) < moneyThresh) return 2;
            return 3;
        }
/** @param {NS} ns */
        export async function actions(ns, num, target){
            //ns.print("actions " + num + " " + target); 
            if (num == 1) {await ns.weaken(target); return} 
            if (num == 2) {await ns.grow(target); return} 
            if (num == 3) {await ns.hack(target); return} 
        }
