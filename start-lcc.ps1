# start-lcc.ps1 — Start LocalCodeCli proxy + Claude Code
# Usage: .\start-lcc.ps1  (from any directory)

# Ensure uv tool bins are on PATH for this session
$uvBin = "$env:USERPROFILE\.local\bin"
if ($env:PATH -notlike "*$uvBin*") {
    $env:PATH = "$uvBin;$env:PATH"
    Write-Host "[LCC] Added $uvBin to PATH" -ForegroundColor DarkGray
}

# Start lcc-server in a new PowerShell window (keep it running as the proxy)
Write-Host "[LCC] Starting lcc-server in a new window..." -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoExit", "-NoProfile", "-Command", "lcc-server" -WindowStyle Normal

# Wait for the server to bind its port
Start-Sleep -Seconds 2

# Launch lcc-claude in the current window
Write-Host "[LCC] Launching lcc-claude..." -ForegroundColor Green
lcc-claude
