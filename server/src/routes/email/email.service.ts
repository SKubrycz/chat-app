import { Injectable } from "@nestjs/common";
import * as nodemailer from "nodemailer";

@Injectable()
export class EmailService {
    constructor() {

    }

    async send(email: IEmail): Promise<boolean | null> {
        const transporter = nodemailer.createTransport({
            host: "localhost",
            port: 1025,
            secure: false,
        });

        try {
            const mail = await transporter.sendMail({
                from: email.from,
                to: email.to,
                subject: email.subject,
                html: email.html
            });
        } catch (error) {
            return null;
        }

        return true;
    }
}