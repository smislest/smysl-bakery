#!/usr/bin/env python3
"""Directus Schema Analyzer"""

import requests
import json
import urllib3

# Suppress SSL warnings
urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

# Configuration
BASE_URL = "https://admin.smislest.ru"
TOKEN = "Ysoj__Fjk6I8vddYHp_ZH7EbGxcf4pG8"

headers = {
    "Authorization": f"Bearer {TOKEN}",
    "Content-Type": "application/json"
}

print("🔗 Connecting to Directus...")
print(f"URL: {BASE_URL}\n")

try:
    # Get collections
    print("📚 Fetching collections...")
    collections_response = requests.get(
        f"{BASE_URL}/api/schema/collections",
        headers=headers,
        verify=False
    )
    collections_response.raise_for_status()
    collections_data = collections_response.json()
    
    # Get fields
    print("📋 Fetching fields...")
    fields_response = requests.get(
        f"{BASE_URL}/api/schema/fields",
        headers=headers,
        verify=False
    )
    fields_response.raise_for_status()
    fields_data = fields_response.json()
    
    # Group fields by collection
    fields_by_collection = {}
    for field in fields_data.get("data", []):
        collection = field.get("collection")
        if collection not in fields_by_collection:
            fields_by_collection[collection] = []
        fields_by_collection[collection].append(field)
    
    # Print report
    print("\n" + "=" * 80)
    print("СТРУКТУРА БД DIRECTUS")
    print("=" * 80 + "\n")
    
    # Sort collections
    for collection_name in sorted(fields_by_collection.keys()):
        fields = sorted(fields_by_collection[collection_name], key=lambda x: x.get("field", ""))
        
        print(f"КОЛЛЕКЦИЯ: {collection_name}")
        print(f"  Полей: {len(fields)}")
        
        for field in fields:
            field_name = field.get("field", "?")
            field_type = field.get("type", "?")
            print(f"  - {field_name} [{field_type}]")
        
        print()
    
    # Save to file
    with open("directus-schema-report.txt", "w", encoding="utf-8") as f:
        f.write("СТРУКТУРА БД DIRECTUS\n")
        f.write("=" * 80 + "\n\n")
        
        for collection_name in sorted(fields_by_collection.keys()):
            fields = sorted(fields_by_collection[collection_name], key=lambda x: x.get("field", ""))
            
            f.write(f"КОЛЛЕКЦИЯ: {collection_name}\n")
            f.write(f"  Полей: {len(fields)}\n")
            
            for field in fields:
                field_name = field.get("field", "?")
                field_type = field.get("type", "?")
                f.write(f"  - {field_name} [{field_type}]\n")
            
            f.write("\n")
    
    print("💾 Report saved to: directus-schema-report.txt")
    
except requests.exceptions.RequestException as e:
    print(f"❌ Error: {e}")
    exit(1)
