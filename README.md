![](https://github.com/DanielSiedlecki/otodom.pl-filter-skrypt/blob/main/otodom-script-logo.png)

# OtoDom.pl Filter Skrypt

![](https://github.com/DanielSiedlecki/otodom.pl-filter-skrypt/blob/main/demo.gif)

### Opis

Cześć jestem Daniel i razem z dziewczyną jak to studenci poszukiwaliśmy mieszkania do wynajęcia aczkolwiek bardzo irytowało mnie to,
że ludzie na jednym z najbardziej popularnych serwisów w Polsce jakim jest otodom.pl filtrowanie nie działa tak jakbym chciał,
więc napisałem swoję polega ono na tym, że sumuje nam _czynsz_ oraz _cene najmu_ i porównuje z naszym maksymalnym budżetem który
wpisujemy w okienku naszego skryptu.

Jeżeli w opisie jest napisane _czynsz: szukaj w opisie_ traktuje go jako "0zł" i nie usuwa jeżeli sama cena najmu nie przekracza
budżetu.

Skrypt nie sprawdza promowanych ogłoszeń bo stwierdziłem, że jednak ta stronka jest bardzo potrzebna więc zostawiłem je bo uważam,
że jeżeli ktoś już za nie zapłacił to niech sobie widnieją.

Niestety skrypt nie jest mocno rozwinięty to taka bardziej moja zajawka która pozwalała mi przefiltrować na szybko mieszkania.
Może z czasem dodam walidacje oraz jakieś opcje. Dlatego po przejściu na każdą podstronę musimy znowu kliknąć przycisk filtruj.
Nasz budżet się zapisuje w localStorage więc nie musimy go wpisywać co każde odświeżenie strony.

Na pewno w wolnym czasie napisze też wersję na OLX.pl.

### Uruchomienie

Krok Pierwszy:

    Do chrome pobieramy addons Tempermonkey;

Krok Drugi:

    Wchodzimy w niego i klikamy dodaj nowy skrypt i plik OtoDomFilter.user.js z pulpitu przeciągamy na okno w przeglądarce

Krok Trzeci:

    Klikamy zainstaluj
