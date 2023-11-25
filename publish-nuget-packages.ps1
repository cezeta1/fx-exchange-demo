#$ProjectPath = ".\CZ.Common"
#$ProjectName = "CZ.Common"
#$Version = "1.0.6"
#$OutputPath = "..\..\..\_localfeed"

$ProjectPath = ".\PaymentsAPI\Sdk"
$ProjectName = "PaymentsAPI.Sdk"
$Version = "1.0.1"
$OutputPath = "..\..\..\..\_localfeed"

#$ProjectPath = ".\PaymentsAPI\Domain"
#$ProjectName = "PaymentsAPI.Domain"
#$Version = "1.0.1"
#$OutputPath = "..\..\..\..\_localfeed"

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
cd ..\..\..
