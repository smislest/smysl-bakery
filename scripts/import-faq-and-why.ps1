$resp = Invoke-RestMethod -Uri "https://admin.smislest.ru/auth/login" -Method Post -ContentType "application/json" -Body '{"email":"pablomarokone@gmail.com","password":"gochacat1987S"}'
$token = $resp.data.access_token
$h = @{ Authorization = "Bearer $token" }

# Import FAQ items
$faqItems = @(
  @{
    question = "Что такое глютен и почему он вреден?"
    answer = "Глютен — это белок, содержащийся в пшенице, ржи и ячмене. Он может вызывать проблемы у людей с целиакией, непереносимостью глютена или чувствительностью к нему. Безглютеновая диета помогает избежать воспалений и улучшить общее самочувствие."
  }
  @{
    question = "Кому подходит безглютеновая выпечка?"
    answer = "Наша выпечка идеальна для людей с целиакией, непереносимостью глютена, а также для тех, кто просто хочет питаться более осознанно и разнообразно. Многие выбирают безглютеновые продукты для улучшения пищеварения и общего самочувствия."
  }
  @{
    question = "Из чего делается безглютеновая выпечка?"
    answer = "Мы используем только натуральные ингредиенты: рисовую, кукурузную, гречневую муку, миндальную муку, псиллиум и другие безглютеновые альтернативы. Все наши продукты изготавливаются из качественного сырья без искусственных добавок."
  }
  @{
    question = "Отличается ли вкус от обычной выпечки?"
    answer = "Нет! Мы гордимся тем, что наша безглютеновая выпечка такая же вкусная и ароматная, как традиционная. Благодаря тщательно подобранным рецептам и технологиям, наши изделия получаются мягкими, пышными и невероятно вкусными."
  }
  @{
    question = "Как долго хранится ваша выпечка?"
    answer = "Свежая выпечка хранится 3-5 дней при комнатной температуре в герметичной упаковке. Для более длительного хранения (до 1 месяца) рекомендуем заморозить продукты сразу после получения."
  }
  @{
    question = "Как оформить заказ?"
    answer = "Вы можете оформить заказ через наш сайт, написать нам в Telegram или Instagram, либо позвонить по телефону. Мы предлагаем доставку по Москве и самовывоз."
  }
  @{
    question = "Какая стоимость доставки?"
    answer = "Доставка по Москве стоит от 500 ₽. При заказе от 3000 ₽ доставка бесплатная. Самовывоз всегда бесплатный."
  }
  @{
    question = "Можно ли заказать торт на заказ?"
    answer = "Да! Мы принимаем индивидуальные заказы на торты и другую выпечку. Свяжитесь с нами для обсуждения деталей, и мы создадим для вас уникальный безглютеновый десерт."
  }
)

Write-Host "Importing FAQ items..."
foreach($item in $faqItems) {
  $json = $item | ConvertTo-Json -Compress -Depth 10
  $bytes = [System.Text.Encoding]::UTF8.GetBytes($json)
  Write-Host "  > $($item.question)"
  Invoke-RestMethod -Uri "https://admin.smislest.ru/items/faq" -Method Post -Headers $h -ContentType "application/json; charset=utf-8" -Body $bytes
}

# Import WhyGlutenFree items
$whyItems = @(
  @{
    title = "Для здоровья"
    description = "Безглютеновое питание помогает улучшить пищеварение, снизить воспаление и повысить уровень энергии"
    icon = "heart"
  }
  @{
    title = "100% натурально"
    description = "Используем только качественные натуральные ингредиенты без искусственных добавок и консервантов"
    icon = "check-circle"
  }
  @{
    title = "Вкусно"
    description = "Доказываем, что безглютеновая выпечка может быть не только полезной, но и невероятно вкусной"
    icon = "smile"
  }
  @{
    title = "Для всех"
    description = "Наша выпечка подходит людям с целиакией, непереносимостью глютена и тем, кто выбирает осознанное питание"
    icon = "users"
  }
)

Write-Host "Importing WhyGlutenFree items..."
foreach($item in $whyItems) {
  $json = $item | ConvertTo-Json -Compress -Depth 10
  $bytes = [System.Text.Encoding]::UTF8.GetBytes($json)
  Write-Host "  > $($item.title)"
  Invoke-RestMethod -Uri "https://admin.smislest.ru/items/why_gluten_free" -Method Post -Headers $h -ContentType "application/json; charset=utf-8" -Body $bytes
}

Write-Host "Import completed!"
