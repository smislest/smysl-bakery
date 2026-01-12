$path = 'e:/site-smyslest/site/smysl-bakery/scripts/import-blog.ps1'
$text = [System.IO.File]::ReadAllText($path)
$enc = New-Object System.Text.UTF8Encoding $true
[System.IO.File]::WriteAllText($path, $text, $enc)
