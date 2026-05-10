package com.smarttv.app

data class Channel(
    val name: String,
    val url: String,
    val category: String,
    val logoRes: Int = 0
)

object ChannelRepository {
    fun getChannels(): List<Channel> = listOf(
        // Canais Abertos
        Channel("SBT",           "https://canais.free.nf/player/sbt.html",           "Abertos"),
        Channel("Record",        "https://canais.free.nf/player/record.html",         "Abertos"),
        Channel("Band",          "https://canais.free.nf/player/band.html",           "Abertos"),
        Channel("RedeTV",        "https://canais.free.nf/player/redetv.html",         "Abertos"),
        Channel("TV Cultura",    "https://canais.free.nf/player/cultura.html",        "Abertos"),
        Channel("TV Brasil",     "https://canais.free.nf/player/tvbrasil.html",       "Abertos"),
        Channel("Globo",         "https://canais.free.nf/player/globo.html",          "Abertos"),

        // Notícias
        Channel("GloboNews",     "https://canais.free.nf/player/globonews.html",      "Notícias"),
        Channel("CNN Brasil",    "https://canais.free.nf/player/cnnbrasil.html",      "Notícias"),
        Channel("Record News",   "https://canais.free.nf/player/recordnews.html",     "Notícias"),
        Channel("BandNews",      "https://canais.free.nf/player/bandnews.html",       "Notícias"),
        Channel("TV Senado",     "https://canais.free.nf/player/senado.html",         "Notícias"),
        Channel("TV Câmara",     "https://canais.free.nf/player/camara.html",         "Notícias"),

        // Esportes
        Channel("ESPN",          "https://canais.free.nf/player/espn.html",           "Esportes"),
        Channel("ESPN 2",        "https://canais.free.nf/player/espn2.html",          "Esportes"),
        Channel("ESPN 3",        "https://canais.free.nf/player/espn3.html",          "Esportes"),
        Channel("ESPN 4",        "https://canais.free.nf/player/espn4.html",          "Esportes"),
        Channel("SporTV",        "https://canais.free.nf/player/sportv.html",         "Esportes"),
        Channel("SporTV 2",      "https://canais.free.nf/player/sportv2.html",        "Esportes"),
        Channel("SporTV 3",      "https://canais.free.nf/player/sportv3.html",        "Esportes"),
        Channel("Combate",       "https://canais.free.nf/player/combate.html",        "Esportes"),

        // Entretenimento
        Channel("Multishow",     "https://canais.free.nf/player/multishow.html",      "Entretenimento"),
        Channel("GNT",           "https://canais.free.nf/player/gnt.html",            "Entretenimento"),
        Channel("Viva",          "https://canais.free.nf/player/viva.html",           "Entretenimento"),
        Channel("Comedy Central","https://canais.free.nf/player/comedycentral.html",  "Entretenimento"),
        Channel("Sony Channel",  "https://canais.free.nf/player/sony.html",           "Entretenimento"),
        Channel("Universal",     "https://canais.free.nf/player/universal.html",      "Entretenimento"),
        Channel("TNT",           "https://canais.free.nf/player/tnt.html",            "Entretenimento"),
        Channel("TBS",           "https://canais.free.nf/player/tbs.html",            "Entretenimento"),
        Channel("TruTV",         "https://canais.free.nf/player/trutv.html",          "Entretenimento"),
        Channel("FX",            "https://canais.free.nf/player/fx.html",             "Entretenimento"),
        Channel("FXX",           "https://canais.free.nf/player/fxx.html",            "Entretenimento"),

        // Filmes
        Channel("HBO",           "https://canais.free.nf/player/hbo.html",            "Filmes"),
        Channel("HBO 2",         "https://canais.free.nf/player/hbo2.html",           "Filmes"),
        Channel("HBO Family",    "https://canais.free.nf/player/hbofamily.html",      "Filmes"),
        Channel("HBO Hits",      "https://canais.free.nf/player/hbohits.html",        "Filmes"),
        Channel("Cinemax",       "https://canais.free.nf/player/cinemax.html",        "Filmes"),
        Channel("Telecine Action","https://canais.free.nf/player/telecineaction.html","Filmes"),
        Channel("Telecine Fun",  "https://canais.free.nf/player/telecinefun.html",    "Filmes"),
        Channel("Telecine Premium","https://canais.free.nf/player/telecinepremium.html","Filmes"),
        Channel("Telecine Touch","https://canais.free.nf/player/telecinetouch.html",  "Filmes"),
        Channel("Telecine Cult", "https://canais.free.nf/player/telecinecult.html",   "Filmes"),
        Channel("Space",         "https://canais.free.nf/player/space.html",          "Filmes"),
        Channel("AXN",           "https://canais.free.nf/player/axn.html",            "Filmes"),

        // Infantil
        Channel("Cartoon Network","https://canais.free.nf/player/cartoon.html",       "Infantil"),
        Channel("Disney Channel","https://canais.free.nf/player/disney.html",         "Infantil"),
        Channel("Disney Junior", "https://canais.free.nf/player/disneyjunior.html",   "Infantil"),
        Channel("Nickelodeon",   "https://canais.free.nf/player/nickelodeon.html",    "Infantil"),
        Channel("Nick Jr",       "https://canais.free.nf/player/nickjr.html",         "Infantil"),
        Channel("Discovery Kids","https://canais.free.nf/player/discoverykids.html",  "Infantil"),
        Channel("Boomerang",     "https://canais.free.nf/player/boomerang.html",      "Infantil"),

        // Documentários
        Channel("Discovery",     "https://canais.free.nf/player/discovery.html",      "Documentários"),
        Channel("National Geographic","https://canais.free.nf/player/natgeo.html",    "Documentários"),
        Channel("History",       "https://canais.free.nf/player/history.html",        "Documentários"),
        Channel("Animal Planet", "https://canais.free.nf/player/animalplanet.html",   "Documentários"),
        Channel("ID",            "https://canais.free.nf/player/id.html",             "Documentários"),
        Channel("TLC",           "https://canais.free.nf/player/tlc.html",            "Documentários"),

        // Música
        Channel("MTV",           "https://canais.free.nf/player/mtv.html",            "Música"),
        Channel("VH1",           "https://canais.free.nf/player/vh1.html",            "Música"),
        Channel("Bis",           "https://canais.free.nf/player/bis.html",            "Música")
    )

    fun getCategories(): List<String> =
        listOf("Todos") + getChannels().map { it.category }.distinct()

    fun getByCategory(category: String): List<Channel> =
        if (category == "Todos") getChannels()
        else getChannels().filter { it.category == category }
}
