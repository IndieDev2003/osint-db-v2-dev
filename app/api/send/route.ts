
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function GET() {
    try {
        const { data, error } = await resend.emails.send({
            from: 'Onboarding Osint Engine <onboarding@osintengine.space>',
            to: ['fbdgagansuman@gmail.com'],
            subject: 'Hello world',
            text:'Gagan Suman Send Email'
        });

        if (error) {
            return Response.json({ error }, { status: 500 });
        }

        return Response.json(data);
    } catch (error) {
        return Response.json({ error }, { status: 500 });
    }
}