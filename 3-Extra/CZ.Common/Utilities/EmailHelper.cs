using MailKit.Security;
using MimeKit.Text;
using MimeKit;
using MailKit.Net.Smtp;
using CZ.Common.Entities;

namespace CZ.Common.Utilities;

public class EmailHelper
{
    private SmtpCredentials _smtpCredentials;

    public EmailHelper(string sourceAddress, string pw) {
        _smtpCredentials = new SmtpCredentials
        {
            Address = sourceAddress,
            Password = pw
        };
    }

    public async Task SendEmailAsync(MailContents mailContents)
    {
        var email = new MimeMessage();
        email.Sender = MailboxAddress.Parse(mailContents.Sender);
        email.To.Add(MailboxAddress.Parse(mailContents.Receiver));
        email.Subject = mailContents.Subject;
        var builder = new BodyBuilder();

        email.Body = new TextPart(TextFormat.Html)
        {
            Text = mailContents.Body
        };

        using var smtp = new SmtpClient();
        smtp.ServerCertificateValidationCallback = (s, c, h, e) => true;
        smtp.Connect("smtp.gmail.com", 587, SecureSocketOptions.StartTlsWhenAvailable);
        smtp.Authenticate(_smtpCredentials.Address, _smtpCredentials.Password);

        await smtp.SendAsync(email);
        smtp.Disconnect(true);
    }
}
