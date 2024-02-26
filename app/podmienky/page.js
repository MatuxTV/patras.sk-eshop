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
          <li >
            1. Úvod - Tieto obchodné podmienky (ďalej len „podmienky“) sú platné
            pre nákupy v internetovom obchode Patras.sk, ktorý je prevádzkovaný
            spoločnosťou Patras s.r.o., so sídlom na Mlynská 361, 976 11 ,Selce,
            IČO: 46923900. Tieto podmienky definujú a upresňujú práva a
            povinnosti predávajúceho (e-shop) a kupujúceho (zákazník).
          </li>
          <li>
            2. Nákupný proces - Nákupný proces začína výberom tovaru a jeho
            vložením do nákupného košíka. Po zadaní kontaktných údajov a výberu
            spôsobu dopravy a platby zákazník odoslaním objednávky potvrdzuje
            svoju objednávku.
          </li>
          <li>
            3. Platba a doručenie - Zákazník môže za tovar zaplatiť
            prostriedkami uvedenými na webovej stránke. Tovar je doručovaný na
            adresu uvedenú zákazníkom pri objednávke.
          </li>
          <li>
            4. Odstúpenie od zmluvy - Zákazník má právo odstúpiť od zmluvy bez
            udania dôvodu do 14 dní od prevzatia tovaru.
          </li>
          <li>
            5. Reklamačný poriadok - V prípade reklamácie je potrebné postupovať
            v súlade s reklamačným poriadkom uverejneným na webovej stránke.
            Reklamáciu je možné uplatniť do 24 mesiacov od kúpy.
          </li>
          <li>
            6. Ochrana osobných údajov - Zákazník súhlasí so spracovaním svojich
            osobných údajov v súlade s platnými zákonmi o ochrane osobných
            údajov.
          </li>
          <li>
            7. Záverečné ustanovenia -  Tieto podmienky sú platné vo forme, v akej
            sú zverejnené na stránkach e-shopu, a môžu byť zo strany
            predávajúceho kedykoľvek zmenené alebo doplnené.
          </li>
        </div>
      </div>
    </div>
  );
};

export default Podmienky;
