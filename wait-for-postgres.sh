#!/bin/sh
echo "Esperando Postgres..."
until pg_isready -h $POSTGRES_HOST -p 5432 -U postgres; do
  sleep 2
done

echo "Rodando migrations..."
dotnet ef database update --project OrderManagement.Infrastructure --startup-project OrderManagement.Api

echo "Iniciando API..."
dotnet OrderManagement.Api.dll
