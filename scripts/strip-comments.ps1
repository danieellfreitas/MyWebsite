# Script para copiar src -> dist removendo comentários de HTML, CSS e JS

$srcRoot  = Resolve-Path ".\src"
$distRoot = ".\dist"

# Limpa a pasta dist antes de recriar
if (Test-Path $distRoot) {
    Remove-Item -Recurse -Force $distRoot
}
New-Item -ItemType Directory -Path $distRoot -Force | Out-Null

# Recria a estrutura de pastas
Get-ChildItem -Path $srcRoot -Recurse -Directory | ForEach-Object {
    $relative = $_.FullName.Substring($srcRoot.Path.Length).TrimStart('\','/')
    $destDir  = Join-Path $distRoot $relative
    New-Item -ItemType Directory -Path $destDir -Force | Out-Null
}

# Processa cada arquivo
Get-ChildItem -Path $srcRoot -Recurse -File | ForEach-Object {
    $file     = $_
    $relative = $file.FullName.Substring($srcRoot.Path.Length).TrimStart('\','/')
    $destFile = Join-Path $distRoot $relative
    $ext      = $file.Extension.ToLower()

    switch ($ext) {
        { $_ -in ".html", ".htm" } {
            $content = [System.IO.File]::ReadAllText($file.FullName, [System.Text.Encoding]::UTF8)
            # Remove comentários HTML  <!-- ... -->  (inclusive multilinhas)
            $content = [regex]::Replace($content, '<!--[\s\S]*?-->', '')
            # Remove linhas em branco excessivas (mais de 2 seguidas)
            $content = [regex]::Replace($content, '(\r?\n){3,}', "`r`n`r`n")
            [System.IO.File]::WriteAllText($destFile, $content, [System.Text.Encoding]::UTF8)
            Write-Host "HTML: $relative"
        }
        ".css" {
            $content = [System.IO.File]::ReadAllText($file.FullName, [System.Text.Encoding]::UTF8)
            # Remove comentários de bloco CSS  /* ... */
            $content = [regex]::Replace($content, '/\*[\s\S]*?\*/', '')
            # Remove linhas em branco excessivas
            $content = [regex]::Replace($content, '(\r?\n){3,}', "`r`n`r`n")
            [System.IO.File]::WriteAllText($destFile, $content, [System.Text.Encoding]::UTF8)
            Write-Host "CSS:  $relative"
        }
        ".js" {
            $content = [System.IO.File]::ReadAllText($file.FullName, [System.Text.Encoding]::UTF8)
            # Remove comentários de bloco  /* ... */
            $content = [regex]::Replace($content, '/\*[\s\S]*?\*/', '')
            # Remove comentários de linha  // ...  (exclui URLs com http://)
            $content = [regex]::Replace($content, '(?m)(?<!:)//[^\r\n]*', '')
            # Remove linhas em branco excessivas
            $content = [regex]::Replace($content, '(\r?\n){3,}', "`r`n`r`n")
            [System.IO.File]::WriteAllText($destFile, $content, [System.Text.Encoding]::UTF8)
            Write-Host "JS:   $relative"
        }
        default {
            # Copia binários e outros arquivos sem modificação (imagens, fontes, etc.)
            Copy-Item -LiteralPath $file.FullName -Destination $destFile -Force
            Write-Host "BIN:  $relative"
        }
    }
}

Write-Host ""
Write-Host "Concluido! Pasta dist atualizada em: $(Resolve-Path $distRoot)"
