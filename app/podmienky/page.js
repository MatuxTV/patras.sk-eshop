import Nav from "../componets/nav";

const Podmienky = () => {
  return (
    <div>
      <Nav product={"Produkty"} />
      <div className=" justify-center p-8">
        <p className=" text-h3 font-plus-jakarta text-center">
          Obchodne Podmienky
        </p>
        <div>
          Názov spoločnosti: Branislav Patráš - PATRAS - Prevádzkovateľ
          internetového portálu Ulica a číslo: Mlynská 34 Mesto a PSČ: 976 11
          Selce Štát: Slovenská republika IČO: 33900825 DIČ: 1028808594 IČDPH:
          SK1028808594 Orgán dozoru spoločnosti: Slovenská obchodná inšpekcia,
          Inšpektorát Slovenskej obchodnej inšpekcie v Banskej Bystrici pre
          Banskobystrický kraj
        </div>
        <div class="container mx-auto px-4 py-8">
          <h1 class="text-3xl font-bold text-center mb-4">
            Obchodné podmienky internetového obchodu Patras.sk
          </h1>

          <h2 class="text-2xl font-semibold mt-6 mb-2">1. Úvod</h2>
          <p>
            Tieto obchodné podmienky (ďalej len „podmienky“) sú platné pre
            nákupy v internetovom obchode Patras.sk, ktorý je prevádzkovaný
            spoločnosťou Branislav Patráš - PATRAS, so sídlom na Mlynská 34, 976
            11 Selce, IČO: 33900825. Tieto podmienky definujú a upresňujú práva
            a povinnosti predávajúceho (e-shop) a kupujúceho (zákazník).
          </p>

          <h2 class="text-2xl font-semibold mt-6 mb-2">2. Nákupný proces</h2>
          <p>
            Nákupný proces začína výberom tovaru a jeho vložením do nákupného
            košíka. Po zadaní kontaktných údajov a výberu spôsobu dopravy a
            platby zákazník odoslaním objednávky potvrdzuje svoju objednávku.
          </p>

          <h2 class="text-2xl font-semibold mt-6 mb-2">
            3. Platba a doručenie
          </h2>
          <p>
            Zákazník môže za tovar zaplatiť prostriedkami uvedenými na webovej
            stránke. Tovar je doručovaný na adresu uvedenú zákazníkom pri
            objednávke.
          </p>

          <h2 class="text-2xl font-semibold mt-6 mb-2">
            4. Odstúpenie od zmluvy
          </h2>
          <p>
            Zákazník má právo odstúpiť od zmluvy bez udania dôvodu do 14 dní od
            prevzatia tovaru. Podrobné informácie a postup na odstúpenie od
            zmluvy sú popísané v časti o práve spotrebiteľa odstúpiť od zmluvy.
          </p>

          <h2 class="text-2xl font-semibold mt-6 mb-2">
            5. Reklamačný poriadok
          </h2>
          <p>
            V prípade reklamácie je potrebné postupovať v súlade s reklamačným
            poriadkom uverejneným na webovej stránke. Reklamáciu je možné
            uplatniť do 24 mesiacov od kúpy. Podrobnosti o postupoch reklamácie,
            vrátane kontaktov a adresy, sú dostupné v sekcii o reklamačnom
            poriadku.
          </p>

          <h2 class="text-2xl font-semibold mt-6 mb-2">
            6. Ochrana osobných údajov
          </h2>
          <p>
            Zákazník súhlasí so spracovaním svojich osobných údajov v súlade s
            platnými zákonmi o ochrane osobných údajov a podmienkami, ktoré sú
            uvedené v časti ochrany fyzických osôb pri spracúvaní osobných
            údajov.
          </p>

          <h2 class="text-2xl font-semibold mt-6 mb-2">
            7. Záverečné ustanovenia
          </h2>
          <p>
            Tieto podmienky sú platné vo forme, v akej sú zverejnené na
            stránkach e-shopu, a môžu byť zo strany predávajúceho kedykoľvek
            zmenené alebo doplnené. V prípade zmeny obchodných podmienok, sú
            platné obchodné podmienky, ktoré boli v platnosti k dátumu nákupu.
            Všetky zmeny a doplnenia sú efektívne po ich zverejnení.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Podmienky;
