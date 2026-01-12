$resp = Invoke-RestMethod -Uri "https://admin.smislest.ru/auth/login" -Method Post -ContentType "application/json" -Body '{"email":"pablomarokone@gmail.com","password":"gochacat1987S"}'
$token = $resp.data.access_token
$headers = @{ Authorization = "Bearer $token" }

$url = "https://admin.smislest.ru/items/blog?fields=*&limit=20"
$data = Invoke-RestMethod -Uri $url -Headers $headers
$data | ConvertTo-Json -Depth 6
