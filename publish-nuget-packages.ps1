$RootPath = $MyInvocation.MyCommand.Path
$BackPath = "..\..\..\"

<#
$ProjectPath = ".\3-Extra\CZ.Common"
$BackPath = "..\..\"
$ProjectName = "CZ.Common"
$Version = "1.0.17"
$OutputPath = "..\..\..\..\_localfeed"
>

<#
$ProjectPath = ".\2-Backend\PaymentsAPI\Sdk"
$ProjectName = "PaymentsAPI.Sdk"
$Version = "1.0.7"
$OutputPath = "..\..\..\..\..\_localfeed"
#>

<#
$ProjectPath = ".\2-Backend\PaymentsAPI\Domain"
$ProjectName = "PaymentsAPI.Domain"
$Version = "1.0.7"
$OutputPath = "..\..\..\..\..\_localfeed"
#>

<#
$ProjectPath = ".\2-Backend\FXRatesAPI\Sdk"
$ProjectName = "FXRatesAPI.Sdk"
$Version = "1.0.16"
$OutputPath = "..\..\..\..\..\_localfeed"
#>

#<#
$ProjectPath = ".\2-Backend\FXRatesAPI\Domain"
$ProjectName = "FXRatesAPI.Domain"
$Version = "1.0.16"
$OutputPath = "..\..\..\..\..\_localfeed"
#>

cd $ProjectPath

# Input directory paths.
$paths = 'bin', 'obj'
foreach ($path in $paths) {
    if (Test-Path -LiteralPath $path) {
      Remove-Item -LiteralPath $path -Verbose -Force -Recurse
    } else {
      "Path doesn't exist: $path"
    }
} 
dotnet build -c "Debug"
dotnet pack
cd bin\Debug
nuget add "${ProjectName}.${Version}.nupkg" -Source $OutputPath
cd "..\..\${BackPath}"