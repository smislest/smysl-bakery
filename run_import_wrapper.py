#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import subprocess
import sys
import os

# Change to the correct directory
os.chdir("e:\\site-smyslest\\site\\smysl-bakery")

# Run the import script and capture output
try:
    result = subprocess.run([sys.executable, "scripts/import_data.py"], 
                          capture_output=True, 
                          text=True,
                          timeout=60)
    
    # Print stdout
    if result.stdout:
        print("=== STDOUT ===")
        print(result.stdout)
    
    # Print stderr
    if result.stderr:
        print("=== STDERR ===")
        print(result.stderr)
    
    # Print return code
    print(f"=== RETURN CODE: {result.returncode} ===")
    
except subprocess.TimeoutExpired:
    print("ERROR: Script execution timed out")
except Exception as e:
    print(f"ERROR: {str(e)}")
