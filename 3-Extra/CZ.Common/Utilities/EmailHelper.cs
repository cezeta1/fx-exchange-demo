using MailKit.Security;
using MimeKit.Text;
using MimeKit;
using MailKit.Net.Smtp;
using CZ.Common.Entities;
using Microsoft.Extensions.Options;

namespace CZ.Common.Utilities;

public class EmailHelperOptions
{
    public const string SectionName = "EmailHelperOptions";

    public string SmtpSourceAddress { get; set; } = String.Empty;
    public string SmtpPW { get; set; } = String.Empty;
}

public class EmailHelper
{
    private SmtpCredentials _smtpCredentials;

    public EmailHelper(IOptions<EmailHelperOptions> options) {
        string errorBit = "missing from EmailHelper config";
        _smtpCredentials = new SmtpCredentials
        {
            Address = options.Value.SmtpSourceAddress ?? throw new Exception($"Smtp Source Address {errorBit}"),
            Password = options.Value.SmtpPW ?? throw new Exception($"Smtp Password {errorBit}")
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
