import { Book } from "../types/book";
import { UserPublic } from "../types/user";

export const html = (sender: UserPublic, receiver: UserPublic, senderBooks: Book[], message: string) => {
    return `
        <div style="font-family: Arial, sans-serif; background:#f6f8fa; padding:20px;">
        <div style="max-width:600px; margin:0 auto; background:#ffffff; border-radius:10px; padding:20px;">
            
            <h2 style="margin-top:0;">📚 Book Exchange Request</h2>
            
            <p>
            <b>${sender.name} (${sender.email})</b> wants to exchange books with you.
            </p>
        
            <p style="margin:15px 0;">
            <b>Message:</b><br/>
            ${message}
            </p>
        
            <div style="margin-top:20px;">
            <b>Sender books:</b>
            <ul style="padding-left:20px;">
                ${senderBooks.map(b => `<li>${b.name} — ${b.author}</li>`).join("")}
            </ul>
            </div>
        
            <hr style="margin:20px 0; border:none; border-top:1px solid #eee;" />
        
            <p style="font-size:12px; color:#888;">
            This email was sent automatically by Book Exchange service.
            </p>
        
        </div>
        </div>
    `
}