# Hópverkefni 2 í vefforritun 1
---
__Hópameðlimir:__
  * Fannar Skúli Birgisson
    * Github notendanafn: fsb2
    * HÍ notendanafn: fsb2
  * Gunnar Páll Júlíusson
    * Github notendanafn: Gunnzter
    * HÍ notendanafn: gpj7
  * Kári Steinn Aðalsteinsson
    * Github notendanafn: KariSt1
    * HÍ notendanafn: ksa13
---
## Uppsetning á verkefni:
Til að keyra verkefnið:

```sh
npm install
npm run dev
```
Þegar þetta er keyrt þá er framleidd `dist` mappa þar sem búið er að þjappa saman öllum javascript skránum í `bundle.js` skrá og `bundle.js-map`. Einnig er búinn til css kóði fyrir allar scss skrárnar og er hann settur í `styles.css` skránna. Þessar skrár innihalda allar upplýsingar um útlit og virkni síðunnar.

Til að linta verkefni, bæði fyrir javascript og scss:

```sh
npm run test
```
---
## Lýsing á verkefni:
Verkefnið sérist um að smíða fyrirlestrarvef fyrir vefforritun 1.
Vefsíðunni er skipt niður í:
  * Forsíðu, html skjal fyrir hana er `index.html` og er staðsett í rót verkefnis.
  * Síðu fyrir fyrirlestrana, html skjal fyrir hana er `fyrirlestur.html` sem er einnig staðsett í rót verkefnis.

### Útlit:
  Í `styles` möppunni sem staðsett er í `src` möppunni er `styles.scss` skráin þar sem skráðar eru grunnupplýsingar og hún inniheldur einnig import fyrir allar hinar scss skránnar sem gerðar voru.
Við skiptum ýmsum elementum síðunnar niður í sér scss skrár sem staðsettar eru í `styles` möppunni:
  * Í `config.scss` eru skilgreindar gunnstærðir og föll sem notuð eru í verkefninu.
  * Fyrir hausinn á síðunum er skráin `header.scss`.
  * Fyrir `index.html` var gerð `list.scss`skrá,`buttons.scss`skrá og `listLecture.scss` skrá.
  * Fyrir `fyrirlestrar.html`voru gerðar skrárnar `element.scss`, `lecture.scss` og `footer.scss`.

### Virkni:
  Undir `src` möppunni er `index.js` skrá sem fylgist með þegar vefsíðunni er hlaðið upp og keyrir upp viðeigandi javascript eftir því hvort við erum á `fyrirlestur.html` eða `index.html`. Í `lib` möppunni sem staðsett er í `src` möppunni eru ýmsar javascript skrár staðsettar sem sjá um virkni vefsíðunnar.
  * Í `helpers.js` eru ýmis hjálparföll skilgreind sem nýtt eru í öðrum javascript skrám.
  * Í `lecture.js` er séð um að birta öll element sem eru skilgreind í viðeigandi fyrirlestri í `lecture.json` skránni á `fyrirlestur.html`. Einnig er takki skilgreindur sem ef ýtt er á hann er vistað í localStorage að fyrirlesturinn sé kláraður.
  * Í `list.js` er virknin fyrir `index.html` skilgreind. Þar eru takkar þar sem hægt er að filtera fyrirlestra eftir því af hvaða týpu þeir eru, þ.e. HTML, CSS eða JavaScript. Síðan eru takkar fyrir hvern fyrirlestur skilgreindir sem taka þig yfir á `fyrirlestur.html` fyrir þann fyrirlestur þegar smellt er á hann. Einnig er birt með tékkmarki hvort fyrirlestur hafi verið kláraður með því að sækja kláraða fyrirlestra í localStorage.
  * Í `storage.js` eru tvö foll sem vista fyrirlestur í localStorage og nær í alla fyrirlestra í localStorage.

### Annað:
  * Í `img` möppunni eru allar myndir sem notaðar voru í verkefninu.
  * Í `package.json` skránni eru skilgreind script sem nota má til að keyra verkefnið ásamt því að hin ýmsu dependancies eru skilgreind. Í `node_modules` möppunni eru pakkarnir sem notaðir eru til að keyra verkefnið staðsettir.
  * Í `lecture.json` eru allar upplýsingar um hvern fyrirlestur geymdar á json formi.

---
# Upprunaleg verkefnalýsing:
---
# Hópverkefni 2

Verkefnið felst í því að smíða prótótýpu af fyrirlestravef fyrir vefforritun. Gefin eru gögn sem unnin eru uppúr námsefni vetrarins.

Gefnar eru [fyrirmyndir](utlit/) í `500px` og `1500px` án grindar ásamt `1500px` með grind. Allt efni skal skalast snyrtilega á milli.

## Almennt

Gögn eru gefin í `lectures.json` sem sækja skal með _ajax_ virkni. Keyra verður verkefnið með `browser-sync` til að það virki.

Efni síðu skal ekki vera breiðara en `1200px`. Litir og myndir í haus skulu fylla út í allt lárétt pláss. Yfir myndum er 60% gegnsær hvítur litur. Myndir fyrir hvern fyrirlestur eru skilgreindir í `json` skrá.

Grunn leturstærð er 16px og fylgja allar aðrar leturgerðir eftirfarandi skala: `16 24 32 48`.

Litapalletta fyrir vef er `#000`, `#999`, `#aaa`, `#ccc`, `#2d2`, `#1a1`, `#fcffd2` og `#cc9694`.

Letur fyrir meginmál er Lora, Times New Roman eða serif letur.
Letur fyrir fyrirsagnir er Roboto Mono, Courier New eða monospace.

Flest allt er sett upp í 12 dálka grind með `20px` gutter.

Öll bil eru hálft, heilt, tvöfalt eða þrefalt margfeldi af gutter. Hægt er að nota reglustiku tól (t.d. http://www.arulerforwindows.com/ eða http://www.pascal.com/software/freeruler/) til að finna nákvæmar stærðir en mestu skiptir að lausn svipi til en sé ekki nákvæmlega eins og fyrirmynd.

Allar hreyfingar gerast á `300ms` með `ease-in-out` hröðunarfalli. Hreyfingar eru þegar svimað er yfir fyrirlestri í lista og síunar tökkum.

## Forsíða

Forsíða inniheldur lista af öllum fyrirlestrum. Fram kemur hvort búið sé að klára fyrirlestur eða ekki. Nota skal `✓` til að tákna að fyrirlestri séð lokið, sjá að neðan hvernig virkni er.

Fyrir ofan lista skulu vera þrír takkar fyrir hvern af flokkunum: `HTML`, `CSS` og `JavaScript`. Í byrjun er engin takki virkur en um leið og takki er virkur skal aðeins sýna fyrirlestra í þeim flokk og takki litaður með `#2d2`. Ef fleiri takkar eru virkjaðir skal einnig sína þá fyrirlestra. Ef allir takkar eru virkir sést það sama og ef allir eru óvirkir—allir fyrirlestrar.

Þegar smellt er á fyrirlestur er farið yfir á `fyrirlestur.html?slug=<slug>` þar sem `<slug>` er _slug_ fyrir fyrirlesturinn, t.d. `fyrirlestur.html?slug=html-sagan`. Hægt er að nota `URLSearchParams` og `window.location.search` til að vita hvaða fyrirlestur átt er við á `fyrirlestur.html` síðu.

## Fyrirlestur

Fyrir hvern fyrirlestur skal birta haus og allt efni fyrirlesturs á eftir honum. Í haus kemur fram flokkur og titill.

Efni fyrirlesturs er geymt í fylki og skal birta það í sömu röð og það er skilgreint. Útbúa þarf birtingu fyrir hverja einingu eftir útliti.

Neðst er takki til að merkja fyrirlestur kláraðann og hlekkur til að fara til baka.

### Kláraður fyrirlestur

Ef fyrirlestur er merktur kláraður skal sýna `✓ Fyrirlestur kláraður` í `#2d2`. Annars `Klára fyrirlestur`. Þegar fyrirlestur er kláraður skal vista upplýsingar um það í `localStorage` og birta í lista og á fyrirlestra síðu.

Nota skal `slug` sem auðkenni yfir kláraða fyrirlestra.

## Fyrirlestragögn

`lectures.json` inniheldur fylki af fyrirlestrum sem birta skal. Hver fyrirlestur getur haft:

* `slug`, notað til að hlekkja á fyrirlestur
* `title`, titill fyrirlesturs
* `category`, flokkur fyrirlesturs
* `image`, mynd í hausi fyrirlesturs, má sleppa, þá skal birta gráan lit í staðinn
* `thumbnail`, mynd á yfirliti fyrirlestra, má sleppa, þá skal birta gráan lit í staðinn
* `content`, fylki af efni fyrirlesturs

Fyrir efni fyrirlesturs er efni alltaf með:

* `type`, gerð efnis
* `data`, gögn efnis

þar sem `type` getur verið:

* `youtube`, `data` inniheldur hlekk á youtube myndband. Innifela skal mynband með `<iframe src="<URL>" frameborder="0" allowfullscreen="0"></iframe>`
* `text`, `data` inniheldur gögn þar sem `\n` merkir á milli málsgreina, þ.e.a.s. texta skal birta innan `<p>`, skipt á `\n`
* `quote`, `data` inniheldur tilvitnun, aukalega getur verið `attribute` með þeim sem vitnað er í
* `image`, `data` inniheldur slóð á mynd, aukalega getur verið `caption` með texta með mynd
* `heading`, `data` inniheldur fyrirsögn
* `list`, `data` inniheldur fylki af textum í lista
* `code`, `data` inniheldur kóða þar sem bil og nýjar línur skipta máli

Athugið að meira efni mun bætast við það sem gefið er í byrjun. Virkni ætti að ráða við hvaða efni sem er í hvaða formi sem er, svo lengi sem það fylgir reglum að ofan.

## Hópavinna

Verkefnið skal unnið í hóp með þremur einstaklingum. Hafið samband við kennara ef ekki er mögulegt að vinna í hóp.

Notast skal við Git og GitHub. Engar zip skrár með kóða ættu að ganga á milli í hópavinnu, heldur á að „committa“ allan kóða og vinna gegnum Git.

## Lýsing á verkefni

`README.md` skrá skal vera í rót verkefnis og innihalda:

* Upplýsingar um hvernig keyra skuli verkefnið
* Lýsingu á uppsetningu verkefnis, hvernig því er skipt í möppur, hvernig CSS og JavaScript er skipulagt og fleira sem á við
* Upplýsingar um alla sem unnu verkefni
* Leyfilegt er að halda eftir þessari verkefnalýsingu en hún skal þá koma _á eftir_ ykkar lýsingu

## Tæki og tól

Eftirfarandi er sett upp í verkefni:

* `.stylelintrc` með upplýsingum um hvernig stylelint eigi að haga sér. Setja þarf upp `stylelint-config-primer` pakkann
* `.eslintrc` skrá sem segir til um hvernig lint fyrir JavaScript skrár skuli háttað
* `.gitignore` sem hunsar algengar skrár, [sjá nánar](https://help.github.com/ignore-files/)
  - Allt undir `./dist` hunsað sem þýðir að það verður _ekki_ checkað inn. Það er gert vegna þess að þær skrár eru útbúnar af tólum þegar verkefni er keyrt.
* `.gitattributes` sem kemur í veg fyrir ósamræmi sem geta komið upp þegar unnið er á milli stýrikerfa
* `.editorconfig` sem samræmir notkun á tabs og spaces, bilum [og fleira](https://editorconfig.org/)
* `grid.css` til að sjá grid sem fyrirmynd er unnin eftir
* `src/` mappa með
  - `styles/` undirmöppu með `styles.scss` grunni
  - `lib/` undirmappa sem gæti innihaldið JavaScript kóða auk tillögu að grunni fyrir virkni á forsíðu
  - `index.js` skrá sem vísar í `lib/`
* `dist/` mappa sem ætti að innihalda _þýddar_ sass og JavaScript skrár
* `img/` með öllum myndum sem þarf í verkefnið
* `package.json` hefur uppsett script ásamt dependencies
  - `eslint` til að keyra eslint
  - `stylelint` til að keyra stylelint
  - `test` til að keyra bæði `eslint` og `stylelint`
  - `browser-sync` til að keyra verkefni, bæta þarf við skrám sem vaktaðar eru
  - `sass` til að keyra fyrstu þýðingu
  - `sass-watch` til að fylgjast með sass skrám og þýða
  - `dev` til að keyra `sass` og `browser-sync`

Setja þarf upp

* `rollup` til að pakka saman JavaScript kóða
* `babel` til að _transpila_ kóða

og bæta við í tól að ofan.

## Mat

* 30% - `README` eftir forskrift, tæki og tól uppsett. Snyrtilegt, gilt (skv. eslint) JavaScript. Snyrtilegt, gilt (skv. stylelint) CSS/Sass, gilt og aðgengilegt HTML. Git notað
* 30% – Yfirlitssíða með síu
* 30% – Fyrirlestrarsíða útfærð með efni
* 10% – Hægt að skrá að fyrirlestur sér kláraður

## Sett fyrir

Verkefni sett fyrir á Uglu föstudaginn 9. nóvember 2018.

## Skil

Einn aðili úr hóp skal skila fyrir hönd allra og skila skal undir „Verkefni og hlutaprófa“ á Uglu í seinasta lagi fyrir lok dags föstudaginn 29. nóvember 2019, seinustu dæmatímar eru þann fimmtudag.

Skil skulu innihalda:

* Nöfn allra í hóp ásamt notendanafni
* Slóð á GitHub repo fyrir verkefni, og **öllum** dæmatímakennurum skal hafa verið boðið í repo ([sjá leiðbeiningar](https://help.github.com/articles/inviting-collaborators-to-a-personal-repository/)). Notendanöfn þeirra eru `anz1e`, `gunnnnii`, `magdadianaa`, `OlafurjonHI` og `Wolfcoder13`.
* Slóð á verkefnið keyrandi á vefnum

## Einkunn

Sett verða fyrir tíu minni verkefni þar sem átta bestu gilda 3,5% hvert, samtals 28% af lokaeinkunn.

Sett verða fyrir tvö stærri verkefni þar sem hvort um sig gildir 11%, samtals 22% af lokaeinkunn.

## Myndir

Myndir frá:

* https://unsplash.com/photos/xekxE_VR0Ec
* https://unsplash.com/photos/C4G18Paw0d4
* https://unsplash.com/photos/iar-afB0QQw

---

> Útgáfa 0.2

### Útgáfusaga

| Útgáfa | Lýsing                                |
|--------|---------------------------------------|
| 0.1    | Fyrsta útgáfa                         |
