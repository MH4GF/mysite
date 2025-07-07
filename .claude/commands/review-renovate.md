---
description: Review and merge renovate PRs with automerge configuration updates
allowed-tools: Bash(gh pr list:*), Bash(gh pr checks:*), Bash(gh pr checkout:*), Bash(pnpm install), Bash(pnpm test), Bash(pnpm build), Bash(pnpm lint)
---

## Task
Review renovate PRs following this workflow:

```mermaid
flowchart TD
    Start([開始]) --> ListPR[gh pr list --author="app/renovate" --state open]
    
    ListPR --> SelectPR{PRを選択}
    SelectPR --> ViewPR[gh pr view でPR詳細確認]
    
    ViewPR --> CheckCI{CI通過?}
    CheckCI -->|No| Investigation[問題調査]
    CheckCI -->|Yes| VersionType{バージョン変更タイプ}
    
    Investigation --> Checkout[gh pr checkout でローカルに取得]
    Checkout --> Install[pnpm install で依存関係を更新]
    Install --> RunTests[pnpm test/build/lint 実行]
    RunTests --> FixIssue{修正可能?}
    FixIssue -->|Yes| ApplyFix[修正を適用]
    FixIssue -->|No| Comment[gh pr comment で報告]
    
    ApplyFix --> CommitPush[git commit & push]
    CommitPush --> WaitCI[CI再実行を待つ]
    WaitCI --> CheckCI
    
    VersionType -->|patch| LowRisk[低リスク]
    VersionType -->|minor| MediumRisk[中リスク]
    VersionType -->|major| HighRisk[高リスク]
    
    LowRisk --> CheckChangelog[CHANGELOG/リリースノート確認]
    MediumRisk --> CheckChangelog
    HighRisk --> DetailedReview[詳細レビュー必須]
    
    DetailedReview --> CheckChangelog
    CheckChangelog --> CheckSecurity{セキュリティ修正?}
    
    CheckSecurity -->|Yes| Priority[優先度高]
    CheckSecurity -->|No| CheckDeps{依存関係確認}
    Priority --> CheckDeps
    
    CheckDeps --> PeerDeps{peer deps互換性OK?}
    PeerDeps -->|Yes| CheckAutomerge{automerge可能な<br/>パッケージ?}
    PeerDeps -->|No| Investigation
    
    CheckAutomerge -->|Yes| UpdateConfig[renovate.json5更新]
    CheckAutomerge -->|No| Approve[gh pr merge で承認・マージ]
    
    UpdateConfig --> CreatePR[automerge設定追加PR作成]
    CreatePR --> Approve[gh pr merge で承認・マージ]
    
    Approve --> NextPR{他のPRあり?}
    
    Comment --> Reject[PR却下/延期]
    
    Reject --> NextPR
    NextPR -->|Yes| SelectPR
    NextPR -->|No| End([完了])
```

### Review Criteria
- **Security updates**: Always HIGH priority
- **Patch updates**: LOW risk - quick review
- **Minor updates**: MEDIUM risk - check for new features
- **Major updates**: HIGH risk - detailed review required

### Automerge Groups
After merging, check if the package could be added to these automerge groups in renovate.json5:
- `test`: Testing libraries (vitest, playwright, msw, etc.)
- `tools`: Dev tools with no production impact (typescript, eslint, biome, etc.)
- `definitelyTyped`: @types/* packages
- `vrt`: UI libraries covered by visual regression tests (tailwindcss, radix-ui, etc.)
- `e2e`: Libraries covered by E2E tests

### Arguments
$ARGUMENTS