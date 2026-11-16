---
title: "Pulling a VM Inventory from Prism Central with PowerShell"
tags: [nutanix, powershell, automation]
---

Clicking through Prism to answer "how many VMs do we have and where are they?" gets old fast. The Prism Central **v3 REST API** makes it a few lines of PowerShell.

<!--more-->

## The idea

Prism Central exposes a `POST /api/nutanix/v3/vms/list` endpoint. Send it a small JSON body, get back every VM with its cluster, power state, vCPU and memory.

## The script

```powershell
$pc   = "prism-central.example.local"
$cred = Get-Credential

$body = @{ kind = "vm"; length = 500 } | ConvertTo-Json

$params = @{
    Uri                  = "https://${pc}:9440/api/nutanix/v3/vms/list"
    Method               = "Post"
    Body                 = $body
    ContentType          = "application/json"
    Credential           = $cred
    Authentication       = "Basic"
    SkipCertificateCheck = $true   # lab only — use a trusted cert in prod!
}

$result = Invoke-RestMethod @params

$result.entities | ForEach-Object {
    [pscustomobject]@{
        Name     = $_.spec.name
        Cluster  = $_.spec.cluster_reference.name
        Power    = $_.spec.resources.power_state
        vCPU     = $_.spec.resources.num_sockets * $_.spec.resources.num_vcpus_per_socket
        MemoryGB = [math]::Round($_.spec.resources.memory_size_mib / 1024, 1)
    }
} | Sort-Object Cluster, Name | Export-Csv .\vm-inventory.csv -NoTypeInformation
```

*(Requires PowerShell 7+ for `-Authentication` and `-SkipCertificateCheck`.)*

## Gotchas

- **Paging:** `length` caps the results. For big environments, loop with `offset` until you've got `metadata.total_matches`.
- **Service accounts:** use a read-only Prism role, not your admin account.
- **Certificates:** `SkipCertificateCheck` is fine in a homelab. In production, fix the cert.

Next step: turn this into a scheduled job that emails a weekly capacity report.
