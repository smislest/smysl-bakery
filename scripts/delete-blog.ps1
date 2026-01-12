$resp = Invoke-RestMethod -Uri "https://admin.smislest.ru/auth/login" -Method Post -ContentType "application/json" -Body '{"email":"pablomarokone@gmail.com","password":"gochacat1987S"}'
$token = $resp.data.access_token
$h = @{ Authorization = "Bearer $token" }

1..8 | ForEach-Object {
  $id = $_
  Write-Host "Deleting id $id"
  Invoke-RestMethod -Uri "https://admin.smislest.ru/items/blog/$id" -Method Delete -Headers $h
}

Invoke-RestMethod -Uri "https://admin.smislest.ru/items/blog" -Headers $h
