import { Book } from "../types/book";
import { UserPublic } from "../types/user";

export const html = (sender: UserPublic, receiver: UserPublic, senderBook: Book, message: string) => {
    return `
        <div style="font-family: Arial, sans-serif; background:#f6f8fa; padding:20px;">
        <div style="max-width:600px; margin:0 auto; background:#ffffff; border-radius:10px; padding:20px;">
            
            <h2 style="margin-top:0;">📚 Book Exchange Request</h2>
            
            <p>
            <b>${sender.name} (${sender.email})</b> wants to exchange books with you.
            </p>
        
            <p style="margin:15px 0;">
                <b>Message:</b>
                <br/>
                ${message}
            </p>
        
            <div style="margin-top:20px;">
                <div style="font-weight:bold; font-size:18px; margin-bottom:10px;">
                    Sender book:
                </div>

                <div style="
                    border:1px solid #e5e7eb;
                    border-radius:12px;
                    padding:16px;
                    width:fit-content;
                    background:#fafafa;
                ">
                    <img
                        src="${senderBook.photoUrl}"
                        style="
                            width:120px;
                            height:auto;
                            border-radius:8px;
                            display:block;
                            margin-bottom:12px;
                        "
                    />

                    <div style="margin-bottom:6px;">
                        <span style="font-weight:bold;">Name:</span>
                        <span>${senderBook.name}</span>
                    </div>

                    <div>
                        <span style="font-weight:bold;">Author:</span>
                        <span>${senderBook.author}</span>
                    </div>
                </div>
            </div>
        
            <hr style="margin:20px 0; border:none; border-top:1px solid #eee;" />
        
            <p style="font-size:12px; color:#888;">
            This email was sent automatically by Book Exchange service.
            </p>
        
        </div>
        </div>
    `
}