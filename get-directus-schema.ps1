param(
    [string]$Token = "Ysoj__Fjk6I8vddYHp_ZH7EbGxcf4pG8",
    [string]$DirectusUrl = "https://admin.smislest.ru"
)

$headers = @{
    "Authorization" = "Bearer $Token"
    "Content-Type" = "application/json"
}

try {
    Write-Host "🔗 Подключение к Directus..." -ForegroundColor Cyan
    Write-Host "URL: $DirectusUrl" -ForegroundColor Gray
    Write-Host ""
    
    # Получаем коллекции
    Write-Host "📚 Получение списка коллекций..." -ForegroundColor Yellow
    $collectionsUri = "$DirectusUrl/api/schema/collections"
    $collectionsResponse = Invoke-WebRequest -Uri $collectionsUri -Headers $headers -UseBasicParsing -SkipCertificateCheck
    $collectionsData = ConvertFrom-Json $collectionsResponse.Content
    
    $collections = $collectionsData.data
    Write-Host "✅ Найдено коллекций: $($collections.Count)" -ForegroundColor Green
    Write-Host ""
    
    # Получаем поля
    Write-Host "📋 Получение информации о полях..." -ForegroundColor Yellow
    $fieldsUri = "$DirectusUrl/api/schema/fields"
    $fieldsResponse = Invoke-WebRequest -Uri $fieldsUri -Headers $headers -UseBasicParsing -SkipCertificateCheck
    $fieldsData = ConvertFrom-Json $fieldsResponse.Content
    
    Write-Host "✅ Найдено полей: $($fieldsData.data.Count)" -ForegroundColor Green
    Write-Host ""
    Write-Host ("=" * 80) -ForegroundColor Cyan
    Write-Host ""
    
    # Группируем поля по коллекциям
    $grouped = $fieldsData.data | Group-Object -Property collection
    
    $report = @()
    $report += "СТРУКТУРА БД DIRECTUS"
    $report += "=" * 80
    $report += ""
    
    foreach ($group in $grouped | Sort-Object Name) {
        $collectionName = $group.Name
        $report += "КОЛЛЕКЦИЯ: $collectionName"
        $report += "  Полей: $($group.Count)"
        
        $fields = $group.Group | Sort-Object field
        foreach ($field in $fields) {
            $report += "  - $($field.field) [$($field.type)]"
        }
        
        $report += ""
    }
    
    # Выводим в консоль
    $report | ForEach-Object { Write-Host $_ }
    
    # Сохраняем в файл
    $reportFile = "directus-schema-report.txt"
    $report | Out-File -FilePath $reportFile -Encoding UTF8
    Write-Host "💾 Отчет сохранен: $reportFile" -ForegroundColor Green
    
} catch {
    Write-Host "❌ Ошибка: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "Детали: $_" -ForegroundColor Red
    exit 1
}
