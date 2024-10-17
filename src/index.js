import { run } from "./run.js";

function getMillisecondsToMidnightUTC() {
    const now = new Date();

    const nextMidnight = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + 1, 0, 0, 0));

    return nextMidnight - now;
}

function scheduleDailyAtMidnight() {
    const timeToMidnight = getMillisecondsToMidnightUTC();
    console.log(`Starting in ${(timeToMidnight / 1000)/3600} hours...`);
    run()
    setTimeout(() => {
        run();

        setInterval(runAtMidnight, 24 * 60 * 60 * 1000);
    }, timeToMidnight);
}

scheduleDailyAtMidnight();
