import { NextFunction } from "express";

export function log(req: Request, res: Response, next: NextFunction) {
    const colors = new Map([
        ["GET", "\x1b[32m"],
        ["HEAD", "\x1b[32m"],
        ["POST", "\x1b[34m"],
        ["PUT", "\x1b[33m"],
        ["DELETE", "\x1b[31m"],
        ["PATCH", "\x1b[33m"],
    ]);

    const reset = `\x1b[0m`;

    if (colors.get(req.method)) {
        console.log(`${colors.get(req.method)}%s${reset}`, `${req.method} @ ${req.url}`)
    } else {
        console.log(`${req.method} @ ${req.url}`)
    }
    
    next()
}
