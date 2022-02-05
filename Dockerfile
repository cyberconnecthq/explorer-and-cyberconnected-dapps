#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:5.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:5.0 AS build
WORKDIR /src
COPY ["Cyber_Tool/Cyber_Tool.csproj", "Cyber_Tool/"]
RUN dotnet restore "Cyber_Tool/Cyber_Tool.csproj"
COPY . .
WORKDIR "/src/Cyber_Tool"
RUN dotnet build "Cyber_Tool.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "Cyber_Tool.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Cyber_Tool.dll"]