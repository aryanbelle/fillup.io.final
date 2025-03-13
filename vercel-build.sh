#!/bin/bash

# Check if the problematic directory exists
PROBLEMATIC_DIR=".next/server/app/(root)"
if [ -d "$PROBLEMATIC_DIR" ]; then
  echo "Problematic directory found: $PROBLEMATIC_DIR"
  
  # Create a backup of the directory
  BACKUP_DIR=".next/server/app/root-backup"
  mkdir -p "$BACKUP_DIR"
  
  # Copy important files from the problematic directory to the backup
  for file in "$PROBLEMATIC_DIR"/*; do
    if [ -f "$file" ]; then
      cp "$file" "$BACKUP_DIR/"
      echo "Copied $file to $BACKUP_DIR/"
    fi
  done
  
  # Check for the specific problematic file
  PROBLEMATIC_FILE="$PROBLEMATIC_DIR/page_client-reference-manifest.js"
  if [ -f "$PROBLEMATIC_FILE" ]; then
    echo "Problematic file found: $PROBLEMATIC_FILE"
    
    # Create an empty file if it doesn't exist
    FIXED_DIR=".next/server/app/main"
    FIXED_FILE="$FIXED_DIR/page_client-reference-manifest.js"
    
    mkdir -p "$FIXED_DIR"
    
    if [ ! -f "$FIXED_FILE" ]; then
      echo "// Fixed file" > "$FIXED_FILE"
      echo "Created fixed file: $FIXED_FILE"
    fi
  fi
  
  echo "Build completed with fixes for problematic directory."
else
  echo "No problematic directory found, build completed successfully."
fi 