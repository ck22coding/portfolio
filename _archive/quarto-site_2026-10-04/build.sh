#!/bin/bash
set -e

# Download and extract Quarto (tar.gz, no dpkg needed)
wget -q https://github.com/quarto-dev/quarto-cli/releases/download/v1.6.42/quarto-1.6.42-linux-amd64.tar.gz
tar -xzf quarto-1.6.42-linux-amd64.tar.gz
export PATH=$PATH:$(pwd)/quarto-1.6.42/bin

quarto render
