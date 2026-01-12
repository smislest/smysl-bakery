@echo off
cd /d "e:\site-smyslest\site\smysl-bakery"
python scripts/import_data.py > import_output.txt 2>&1
type import_output.txt
