#See https://aka.ms/customizecontainer to learn how to customize your debug container and how Visual Studio uses this Dockerfile to build your images for faster debugging.

#FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
#WORKDIR /app
#EXPOSE 80
#EXPOSE 443

#FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
#WORKDIR /src
#COPY ["StoreBE/StoreBE.csproj", "StoreBE/"]
#RUN dotnet restore "StoreBE/StoreBE.csproj"
#COPY . .
#WORKDIR "/src/StoreBE"
#RUN dotnet build "StoreBE.csproj" -c Release -o /app/build

#FROM build AS publish
#RUN dotnet publish "StoreBE.csproj" -c Release -o /app/publish /p:UseAppHost=false

#FROM base AS final
#WORKDIR /app
#COPY --from=publish /app/publish .
#ENTRYPOINT ["dotnet", "StoreBE.dll"]



# official .net image 
# net 6.0 -> 	Dockerfile	Ubuntu 22.04	06/07/2023
# https://github.com/dotnet/dotnet-docker/blob/e1984aaea51a796b68f6672749d280525c30e063/src/sdk/6.0/jammy/amd64/Dockerfile

ARG REPO=mcr.microsoft.com/dotnet/aspnet
FROM $REPO:6.0.16-jammy-amd64

ENV \
    ASPNETCORE_URLS= \
    DOTNET_GENERATE_ASPNET_CERTIFICATE=false \
    DOTNET_NOLOGO=true \
    DOTNET_SDK_VERSION=6.0.408 \
    DOTNET_USE_POLLING_FILE_WATCHER=true \
    NUGET_XMLDOC_MODE=skip \
    POWERSHELL_DISTRIBUTION_CHANNEL=PSDocker-DotnetSDK-Ubuntu-22.04

RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        curl \
        git \
        wget \
    && rm -rf /var/lib/apt/lists/*

RUN curl -fSL --output dotnet.tar.gz https://dotnetcli.azureedge.net/dotnet/Sdk/$DOTNET_SDK_VERSION/dotnet-sdk-$DOTNET_SDK_VERSION-linux-x64.tar.gz \
    && dotnet_sha512='d5eed37ce6c07546aa217d6e786f3b67be2b6d97c23d5888d9ee5d5398e8a9bfc06202b14e3529245f7ec78f4036778caf69bdbe099de805fe1f566277e8440e' \
    && echo "$dotnet_sha512  dotnet.tar.gz" | sha512sum -c - \
    && mkdir -p /usr/share/dotnet \
    && tar -oxzf dotnet.tar.gz -C /usr/share/dotnet ./packs ./sdk ./sdk-manifests ./templates ./LICENSE.txt ./ThirdPartyNotices.txt \
    && rm dotnet.tar.gz \
    && dotnet help

RUN powershell_version=7.2.10 \
    && curl -fSL --output PowerShell.Linux.x64.$powershell_version.nupkg https://pwshtool.blob.core.windows.net/tool/$powershell_version/PowerShell.Linux.x64.$powershell_version.nupkg \
    && powershell_sha512='3376b937529f7f6e35cadad67357cd67cc15b4775ff9aa56b9b8e35bc7f9e56f50df21fcca30aecaf23bca4d4999afc5e3d00eb990f891f71d750bc6eb2996a4' \
    && echo "$powershell_sha512  PowerShell.Linux.x64.$powershell_version.nupkg" | sha512sum -c - \
    && mkdir -p /usr/share/powershell \
    && dotnet tool install --add-source / --tool-path /usr/share/powershell --version $powershell_version PowerShell.Linux.x64 \
    && dotnet nuget locals all --clear \
    && rm PowerShell.Linux.x64.$powershell_version.nupkg \
    && ln -s /usr/share/powershell/pwsh /usr/bin/pwsh \
    && chmod 755 /usr/share/powershell/pwsh \
    && find /usr/share/powershell -print | grep -i '.*[.]nupkg$' | xargs rm

WORKDIR /app

EXPOSE 80
EXPOSE 443


