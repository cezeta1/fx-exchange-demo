$ProjectPath = ".\CZ.Common"
$Version = "1.0.4"
$OutputPath = "..\..\..\_localfeed"

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
dotnet build
dotnet pack
cd bin\Debug
nuget add "CZ.Common.${Version}.nupkg" -Source $OutputPath
cd ..\..\..
