# 📺 SmartTV Canais — App para Android TV

App para Android TV que exibe uma grade de canais organizados por categoria,
abrindo cada canal em um WebView em tela cheia.

---

## 🗂️ Canais incluídos (55+)

| Categoria       | Exemplos                                        |
|-----------------|-------------------------------------------------|
| Abertos         | SBT, Record, Band, RedeTV, TV Cultura, Globo    |
| Notícias        | GloboNews, CNN Brasil, BandNews, Record News    |
| Esportes        | ESPN, ESPN 2/3/4, SporTV 1/2/3, Combate        |
| Entretenimento  | Multishow, GNT, Comedy Central, TNT, FX, Sony  |
| Filmes          | HBO, Telecine, AXN, Space, Cinemax              |
| Infantil        | Cartoon Network, Disney, Nickelodeon, Nick Jr   |
| Documentários   | Discovery, NatGeo, History, Animal Planet, TLC  |
| Música          | MTV, VH1, Bis                                   |

---

## 🛠️ Como compilar e gerar o APK

### Pré-requisitos
- **Android Studio** (versão mais recente) → https://developer.android.com/studio
- **Java 8+** (já incluso no Android Studio)
- Conexão com a internet (para baixar dependências)

---

### Passo a passo

#### 1. Abrir o projeto
1. Descompacte a pasta `SmartTVApp`
2. Abra o Android Studio
3. Clique em **File → Open**
4. Selecione a pasta `SmartTVApp`
5. Aguarde o sync do Gradle terminar (barra de progresso no rodapé)

#### 2. Sincronizar dependências
Se aparecer um aviso "Gradle sync needed":
- Clique em **Sync Now** no banner amarelo

#### 3. Gerar o APK de Debug (mais rápido, para testar)
1. No menu superior: **Build → Build Bundle(s)/APK(s) → Build APK(s)**
2. Aguarde a compilação (~2-3 minutos na primeira vez)
3. Clique em **locate** no popup "APK generated successfully"
4. O arquivo estará em:
   ```
   SmartTVApp/app/build/outputs/apk/debug/app-debug.apk
   ```

#### 4. Gerar APK de Release (para distribuição)
1. **Build → Generate Signed Bundle/APK**
2. Selecione **APK**
3. Crie uma nova keystore (ou use uma existente)
4. Preencha os dados e clique em **Finish**
5. O APK assinado estará em:
   ```
   SmartTVApp/app/build/outputs/apk/release/app-release.apk
   ```

---

## 📲 Como instalar na Smart TV Android

### Opção A — Pen Drive (mais fácil)
1. Copie o `app-debug.apk` para um pen drive
2. Conecte o pen drive na TV
3. Abra o gerenciador de arquivos da TV
4. Navegue até o pen drive e toque no APK
5. Confirme a instalação (pode ser necessário ativar "Fontes desconhecidas" nas configurações)

### Opção B — ADB via rede Wi-Fi
```bash
# Ative o ADB na TV: Configurações → Sobre → Build number (7x) → Opções do desenvolvedor → ADB por rede
# Descubra o IP da TV: Configurações → Rede → IP

adb connect IP_DA_TV:5555
adb install app-debug.apk
```

### Opção C — Google Drive / Dropbox
1. Faça upload do APK para o Google Drive
2. Acesse o Google Drive na TV
3. Baixe e instale o APK

---

## 🎮 Como usar na TV

| Ação                    | Controle remoto          |
|-------------------------|--------------------------|
| Navegar entre canais    | D-pad (↑ ↓ ← →)         |
| Selecionar canal        | OK / Enter               |
| Filtrar por categoria   | Navegue até a barra topo |
| Voltar ao menu          | Botão Voltar             |
| Play/Pause              | Botão Play do controle   |

---

## ⚙️ Personalização

Para adicionar/remover canais, edite o arquivo:
```
app/src/main/java/com/smarttv/app/ChannelRepository.kt
```

Exemplo para adicionar um canal:
```kotlin
Channel("Meu Canal", "https://canais.free.nf/player/meucanal.html", "Categoria")
```

---

## 📋 Requisitos mínimos da TV
- Android 5.0 (API 21) ou superior
- Android TV ou Google TV
- Conexão com internet
