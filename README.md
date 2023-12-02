# nexpay-demo

This project is built as a tech demo for NexPay code challenge interview. It features a foreign exchange (FX) platform where users can create contracts selecting which currency they want to convert from and to. 
This repo includes:
 - **nexpay-spa** => Single Page Application providing user log-in and Contract management UIs for Users and Admins.
 - **NexPayBFF** => BFF API to manage calls to the other APIs. Provides a single point of entry for the Frontend to get the required data.
 - **FXRatesAPI** => The exchange Rate provider. Upon request, gets the current exchange rate between two currencies from an free open source API ([Frankfurter](https://www.frankfurter.app/)) and provides a Rate quote. This Rate is saved and has a validity of 2 minutes.
 - **PaymentsAPI** => Manages user contracts. To create a new contract, the rate has to be valid at the moment of placement. When a new Contract is placed, sends a notification email to select Admin.Admins can change the Contract status and mark them as Completed, Cancelled, etc.
 - **CZ.Common** => Common library package. Provides common use Classes, Extensions and Utils.

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
 - `CZ.Common`, `PaymentsAPI` and `FXRatesAPI` expose nuget packages for ease of use in other solutions. Upon changes on any of their Controllers, Services and/or Domains, they must be rebuilt and republished. To do that locally, use the `publish-nuget-packages.ps1` script. Please check and change package versions accordingly. Locally published packages are placed in the `_localfeed` folder.

### Frontend
This project was generated with Angular CLI version 17.0.2, using Ng-Zorro as UI Library.

 - Run `npm run serve` for a dev server. Navigate to http://localhost:4200/. The app will automatically reload if you change any of the source files.

## Screenshots

![image](https://github.com/Cezeta-hub/nexpay-demo/assets/73889711/664b1f36-ab78-4d9b-a228-c0ebec86070c)

![image](https://github.com/Cezeta-hub/nexpay-demo/assets/73889711/b765935d-86a6-47f0-aaf2-70ba2b7874d4)

![image](https://github.com/Cezeta-hub/nexpay-demo/assets/73889711/f373284d-8288-40a4-bb37-277bcb4c94b1)

![image](https://github.com/Cezeta-hub/nexpay-demo/assets/73889711/c422e3a7-0a66-4599-ac1b-adcab0a341ce)

