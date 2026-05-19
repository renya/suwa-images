# suwa-images

Image repository for i.suwa.info

## Structure

/p/
  Photos for pages

## Rules

- Use lowercase filenames only
- Use ASCII filenames only
- Use lowercase folder names only
- Keep original images locally
- This repository is for public web images
- Access via https://i.suwa.info/

## Example URLs

https://i.suwa.info/p/yashima/img_0001.jpg
https://i.suwa.info/p/onbashira/img_0002.jpg

## PowerShell

Convert filenames to lowercase:

```powershell
Get-ChildItem -File -Recurse | Rename-Item -NewName { $_.Name.ToLower() }
```

Run in PowerShell, not cmd.exe.
