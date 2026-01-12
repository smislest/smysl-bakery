$resp = Invoke-RestMethod -Uri "https://admin.smislest.ru/auth/login" -Method Post -ContentType "application/json" -Body '{"email":"pablomarokone@gmail.com","password":"gochacat1987S"}'
$token = $resp.data.access_token
$h = @{ Authorization = "Bearer $token" }

# 1. Create FAQ collection
Write-Host "Creating FAQ collection..."
$faqCollection = @{
  collection = "faq"
  meta = @{
    icon = "help"
    display_template = "{{ question }}"
    translation = "Frequently Asked Questions"
  }
  schema = @{
    name = "faq"
  }
} | ConvertTo-Json -Compress -Depth 10
$bytes = [System.Text.Encoding]::UTF8.GetBytes($faqCollection)
Invoke-RestMethod -Uri "https://admin.smislest.ru/collections" -Method Post -Headers $h -ContentType "application/json; charset=utf-8" -Body $bytes

# 2. Create fields for FAQ
Write-Host "Creating FAQ fields..."

# question field
$field1 = @{
  field = "question"
  type = "string"
  meta = @{ 
    interface = "input"
    display = "form"
  }
} | ConvertTo-Json -Compress -Depth 10
$bytes1 = [System.Text.Encoding]::UTF8.GetBytes($field1)
Invoke-RestMethod -Uri "https://admin.smislest.ru/fields/faq" -Method Post -Headers $h -ContentType "application/json; charset=utf-8" -Body $bytes1

# answer field
$field2 = @{
  field = "answer"
  type = "string"
  meta = @{ 
    interface = "input-rich-text-html"
    display = "form"
  }
} | ConvertTo-Json -Compress -Depth 10
$bytes2 = [System.Text.Encoding]::UTF8.GetBytes($field2)
Invoke-RestMethod -Uri "https://admin.smislest.ru/fields/faq" -Method Post -Headers $h -ContentType "application/json; charset=utf-8" -Body $bytes2

# 3. Create WhyGlutenFree collection
Write-Host "Creating WhyGlutenFree collection..."
$whyCollection = @{
  collection = "why_gluten_free"
  meta = @{
    icon = "info"
    display_template = "{{ title }}"
    translation = "Why Gluten Free"
  }
  schema = @{
    name = "why_gluten_free"
  }
} | ConvertTo-Json -Compress -Depth 10
$bytesWhy = [System.Text.Encoding]::UTF8.GetBytes($whyCollection)
Invoke-RestMethod -Uri "https://admin.smislest.ru/collections" -Method Post -Headers $h -ContentType "application/json; charset=utf-8" -Body $bytesWhy

# 4. Create fields for WhyGlutenFree
Write-Host "Creating WhyGlutenFree fields..."

# title field
$whyField1 = @{
  field = "title"
  type = "string"
  meta = @{ 
    interface = "input"
    display = "form"
  }
} | ConvertTo-Json -Compress -Depth 10
$bytesWhy1 = [System.Text.Encoding]::UTF8.GetBytes($whyField1)
Invoke-RestMethod -Uri "https://admin.smislest.ru/fields/why_gluten_free" -Method Post -Headers $h -ContentType "application/json; charset=utf-8" -Body $bytesWhy1

# description field
$whyField2 = @{
  field = "description"
  type = "string"
  meta = @{ 
    interface = "input-rich-text-html"
    display = "form"
  }
} | ConvertTo-Json -Compress -Depth 10
$bytesWhy2 = [System.Text.Encoding]::UTF8.GetBytes($whyField2)
Invoke-RestMethod -Uri "https://admin.smislest.ru/fields/why_gluten_free" -Method Post -Headers $h -ContentType "application/json; charset=utf-8" -Body $bytesWhy2

# icon field
$whyField3 = @{
  field = "icon"
  type = "string"
  meta = @{ 
    interface = "input"
    display = "form"
  }
} | ConvertTo-Json -Compress -Depth 10
$bytesWhy3 = [System.Text.Encoding]::UTF8.GetBytes($whyField3)
Invoke-RestMethod -Uri "https://admin.smislest.ru/fields/why_gluten_free" -Method Post -Headers $h -ContentType "application/json; charset=utf-8" -Body $bytesWhy3

Write-Host "Collections created successfully!"
