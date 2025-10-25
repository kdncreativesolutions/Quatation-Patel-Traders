Add-Type -AssemblyName System.Drawing

# Third image - remove dropdown button
$img3 = [System.Drawing.Image]::FromFile('c:\Users\thene\AppData\Local\Temp\zencoder\pasted\images\20251025120340-5nyvgq-image.png')
$newHeight3 = [int]$img3.Height - 80
$bitmap3 = New-Object System.Drawing.Bitmap([int]$img3.Width, $newHeight3)
$graphics3 = [System.Drawing.Graphics]::FromImage($bitmap3)
$rect3 = New-Object System.Drawing.Rectangle(0, 0, [int]$img3.Width, $newHeight3)
$graphics3.DrawImage($img3, 0, 0, $rect3, [System.Drawing.GraphicsUnit]::Pixel)
$bitmap3.Save('n:\Personal Project\Quatation-Patel-Traders\buttons_image_1_cleaned.png')
$graphics3.Dispose()
$bitmap3.Dispose()
$img3.Dispose()

# Fourth image - remove discount buttons
$img4 = [System.Drawing.Image]::FromFile('c:\Users\thene\AppData\Local\Temp\zencoder\pasted\images\20251025120344-ahusvc-image.png')
$newHeight4 = [int]$img4.Height - 50
$bitmap4 = New-Object System.Drawing.Bitmap([int]$img4.Width, $newHeight4)
$graphics4 = [System.Drawing.Graphics]::FromImage($bitmap4)
$rect4 = New-Object System.Drawing.Rectangle(0, 0, [int]$img4.Width, $newHeight4)
$graphics4.DrawImage($img4, 0, 0, $rect4, [System.Drawing.GraphicsUnit]::Pixel)
$bitmap4.Save('n:\Personal Project\Quatation-Patel-Traders\buttons_image_2_cleaned.png')
$graphics4.Dispose()
$bitmap4.Dispose()
$img4.Dispose()

Write-Host '✓ Done! Files saved:'
Write-Host '  - buttons_image_1_cleaned.png'
Write-Host '  - buttons_image_2_cleaned.png'