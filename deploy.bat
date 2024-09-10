@echo off
call git checkout main
call git add --all
if %1.==. (
    call git commit -m "Release %date% %time%"
) else (
    call git commit -m "Release %date% %time%" -m %1
)

call git push
call git rebase main release
call git push origin -u release
call git checkout main