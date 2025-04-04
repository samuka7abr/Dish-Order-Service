#!/bin/bash

echo "Commitando em: $(pwd)"
echo "Selecione o tipo de commit:"
echo "1 - feat"
echo "2 - fix"
echo "3 - delete"
echo "4 - chore"
echo "5 - style"
echo "6 - docs"
read -p "Digite o número correspondente: " tipo

case $tipo in
  1) prefixo="feat" ;;
  2) prefixo="fix" ;;
  3) prefixo="delete" ;;
  4) prefixo="chore" ;;
  5) prefixo="style" ;;
  6) prefixo="docs" ;;
  *) echo "Tipo inválido"; exit 1 ;;
esac

read -p "Mensagem do commit: " msg

if [ -z "$msg" ]; then
  echo "A mensagem do commit não pode estar vazia."
  exit 1
fi

git add .
git commit -m "$prefixo: $msg" || {
  echo "Erro ao tentar commitar. Verifique se há validações ou hooks ativos."
  exit 1
}
git push
