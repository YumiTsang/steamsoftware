# GitHub 推送腳本
# 使用方式：.\push-to-github.ps1 -GitHubUsername "your-username" -RepoName "portfolio_web"

param(
    [string]$GitHubUsername = "your-username",
    [string]$RepoName = "portfolio_web"
)

$projectPath = "C:\Users\Yumi\Downloads\portfolio_web"
$repoUrl = "https://github.com/$GitHubUsername/$RepoName.git"

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "GitHub 推送腳本" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "GitHub Username: $GitHubUsername" -ForegroundColor Yellow
Write-Host "Repo Name: $RepoName" -ForegroundColor Yellow
Write-Host "Repo URL: $repoUrl" -ForegroundColor Yellow
Write-Host ""

# 檢查 Git 是否可用
Write-Host "⏳ 檢查 Git..." -ForegroundColor Green
try {
    $gitVersion = & git --version
    Write-Host "✅ Git 已安裝: $gitVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Git 未找到，請先安裝 Git: https://git-scm.com/download/win" -ForegroundColor Red
    exit 1
}

# 進入專案目錄
Set-Location $projectPath

# 檢查是否已初始化 git
if (!(Test-Path .git)) {
    Write-Host "⏳ 初始化 Git 倉庫..." -ForegroundColor Green
    git init
    Write-Host "✅ Git 倉庫已初始化" -ForegroundColor Green
} else {
    Write-Host "✅ Git 倉庫已存在" -ForegroundColor Green
}

# 設定 Git 使用者（可選，如果尚未設定全域的話）
Write-Host ""
Write-Host "⏳ 設定 Git 用戶信息..." -ForegroundColor Green
$email = Read-Host "輸入你的 GitHub 郵箱 (或按 Enter 跳過)"
$name = Read-Host "輸入你的 GitHub 用戶名 (或按 Enter 跳過)"

if ($email) {
    git config user.email $email
    Write-Host "✅ 郵箱已設定: $email" -ForegroundColor Green
}
if ($name) {
    git config user.name $name
    Write-Host "✅ 用戶名已設定: $name" -ForegroundColor Green
}

# 添加所有文件並提交
Write-Host ""
Write-Host "⏳ 添加文件到 Git..." -ForegroundColor Green
git add .
Write-Host "✅ 文件已添加" -ForegroundColor Green

Write-Host ""
Write-Host "⏳ 提交初始版本..." -ForegroundColor Green
$commitMessage = "Initial commit: first version with auth, drawing tools, and learning modules"
git commit -m $commitMessage
Write-Host "✅ 初始版本已提交" -ForegroundColor Green

# 檢查遠端是否已存在
if (git remote get-url origin 2>$null) {
    Write-Host ""
    Write-Host "⚠️  遠端倉庫已存在，移除舊的..." -ForegroundColor Yellow
    git remote remove origin
}

# 設定遠端倉庫
Write-Host ""
Write-Host "⏳ 設定遠端倉庫..." -ForegroundColor Green
git remote add origin $repoUrl
Write-Host "✅ 遠端倉庫已設定: $repoUrl" -ForegroundColor Green

# 重命名分支為 main（如果需要）
Write-Host ""
Write-Host "⏳ 檢查分支..." -ForegroundColor Green
$currentBranch = git rev-parse --abbrev-ref HEAD
if ($currentBranch -ne "main") {
    Write-Host "⏳ 將 $currentBranch 重命名為 main..." -ForegroundColor Green
    git branch -M main
    Write-Host "✅ 分支已重命名為 main" -ForegroundColor Green
}

# 推送到 GitHub
Write-Host ""
Write-Host "⏳ 推送到 GitHub（首次會要求登錄）..." -ForegroundColor Green
Write-Host "提示：GitHub 已停用密碼驗證。請使用以下方式之一："
Write-Host "  1. Personal Access Token (PAT)"
Write-Host "  2. SSH Key"
Write-Host "  3. GitHub CLI (gh auth)"
Write-Host ""

try {
    git push -u origin main
    Write-Host ""
    Write-Host "✅ 推送成功！" -ForegroundColor Green
} catch {
    Write-Host ""
    Write-Host "❌ 推送失敗。請檢查：" -ForegroundColor Red
    Write-Host "  1. GitHub 帳號和倉庫名稱是否正確"
    Write-Host "  2. 是否已建立 GitHub 倉庫: https://github.com/new"
    Write-Host "  3. 是否已設定正確的認證方式（PAT 或 SSH）"
    exit 1
}

# GitHub Pages 配置指南
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "GitHub Pages 配置" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "📋 後續步驟：" -ForegroundColor Yellow
Write-Host ""
Write-Host "1️⃣  進入 GitHub 倉庫設置：" -ForegroundColor White
Write-Host "   https://github.com/$GitHubUsername/$RepoName/settings/pages" -ForegroundColor Cyan
Write-Host ""
Write-Host "2️⃣  設定 GitHub Pages:" -ForegroundColor White
Write-Host "   - Source: 選擇 'Deploy from a branch'" -ForegroundColor Gray
Write-Host "   - Branch: 選擇 'gh-pages' 和 '/ (root)'" -ForegroundColor Gray
Write-Host ""
Write-Host "3️⃣  部署前端到 GitHub Pages:" -ForegroundColor White
Write-Host "   cd 'C:\Users\Yumi\Downloads\portfolio_web\my-app'" -ForegroundColor Gray
Write-Host "   npm run deploy" -ForegroundColor Gray
Write-Host ""
Write-Host "4️⃣  等待 1-2 分鐘，你的應用將在以下地址上線：" -ForegroundColor White
Write-Host "   https://$GitHubUsername.github.io/$RepoName" -ForegroundColor Cyan
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "✨ 所有步驟完成！" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
