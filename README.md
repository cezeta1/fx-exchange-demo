# nexpay-demo

This project is built as a tech demo for NexPay code challenge interview. It features a foreign exchange (FX) platform where users can create contracts selecting which currency they want to convert from and to. The exchange rate is calculated and provided by an FX API. The PaymentAPI receives the contract requests, saves them, and checks if they are completed.

## Instructions

### Database
These solutions' DBs are managed using Entity Framework 8.0 and follow a code-first strategy. For `PaymentsAPI` and `FXRatesAPI`, the DB related code is placed inside the `Persistence` project. Follow [code-first conventions](https://learn.microsoft.com/en-us/ef/ef6/modeling/code-first/conventions/built-in).

 - In the Package Manager Console run `update-database` to create the database and apply all the migrations. Alternatively, using a cmd console in the Persistence project, run `dotnet ef database update`.
 - Repeat this process for projects `PaymentsAPI` and `FXRatesAPI`. To check or change the connection string go to the respective `appsettings.json` files.

#### Make a change in the database (structure, constraints, etc)
Change the entity or the context and run `add-migration <migration-name>` in the Package Manager Console to create a new migration with the changes made. Alternatively, using a cmd console in the Persistence project, run `dotnet ef migrations add <migration-name>`. After that, run `update-database`/`dotnet ef database update` to perform the changes in the database.

### Backend
Developed with .NET 8.0 using swagger for endpoint documentation. Use of the [restful API guidelines](https://restfulapi.net/resource-naming/).

 - Each solution can be run using Visual Studio OR using the `run-backend-solutions.bat` script in the root directory.
 - `CZ.Common`, `PaymentsAPI` and `FXRatesAPI` expose nuget packages for ease of use in other solutions. Upon changes on any of their Controllers, Services and/or Domains, they must be rebuilt and republished. To do that locally, use the `publish-nuget-packages.ps1` script. Please check and change package versions accordingly.

### Frontend
This project was generated with Angular CLI version 17.0.2.

 - Run `npm run serve` for a dev server. Navigate to http://localhost:4200/. The app will automatically reload if you change any of the source files.
