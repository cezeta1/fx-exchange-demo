For each of these projects, please create a `appsettings.Development.ts` file and paste these configurations:
```
{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning"
    }
  },
  "CORS": [
    {
      "GeneralPolicy": {
        "AllowedOrigins": "*",
        "AllowedMethods": "*",
        "AllowedHeaders": "*"
      }
    }
  ]
}
```

In particular, for the following projects, add the following properties and fill with the respective data:

 - **NexPayBFF:**
```
{
  ...,
  "PaymentsAPI": {
    "baseUrl": "https://localhost:7005/"
  },
  "FXRatesAPI": {
    "baseUrl": "https://localhost:7006/"
  }
}
```

 - **PaymentsAPI:**
```
{
  ... ,
  "ConnectionStrings": {
    "CEZ_NexPayPaymentsDB": "<The Connection String to your local 'CEZ_NexPayPaymentsDB' database>"
  },
  "EmailHelperOptions": {
    "SmtpSourceAddress": "<SMTP address>",
    "SmtpPW": "<SMTP key>"
  }
}
```

 - **FXRatesAPI:**
```
{
  ... ,
  "ConnectionStrings": {
    "CEZ_NexPayFxDB": "<The Connection String to your local 'CEZ_NexPayFXDB' database>"
  }
}
```
