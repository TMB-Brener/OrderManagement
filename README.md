# OrderManagement

### Initial build project

```bash
# go to project path
cd \OrderManagement

# build with docker-compose
docker compose up -d --build

# apply migrations rules
dotnet ef database update --project OrderManagement.Infrastructure --startup-project OrderManagement.Api
```
