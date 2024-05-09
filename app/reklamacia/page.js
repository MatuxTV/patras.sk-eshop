import Nav from "../componets/nav";

const Reklamacia = () => {
  return (
    <div>
      <Nav product={"Produkty"} />
      <div class="container mx-auto px-4 py-8">
        <h1 class=" font-bold text-center mb-4">
          Reklamačný poriadok Patras.sk
        </h1>

        <p class="mt-4">
          Tento reklamačný poriadok upravuje spôsob uplatnenia práva z
          odpovednosti za vady tovaru (reklamáciu) kúpeného prostredníctvom
          internetového obchodu Patras.sk.
        </p>

        <h2 class="text-2xl font-semibold mt-6 mb-2">Postup pri reklamácii</h2>
        <ol class="list-decimal ml-6">
          <li>
            V prípade zistenia vady tovaru by mal zákazník bez zbytočného
            odkladu kontaktovať obchod prostredníctvom e-mailu patras@patras.sk
            alebo telefonicky.
          </li>
          <li>
            Zákazník by mal predávajúcemu poskytnúť popis vady a
            fotodokumentáciu prípadných viditeľných vád.
          </li>
          <li>
            Tovar je potrebné zaslať na adresu predajcu: Branislav Patráš - PATRAS, Mlynská 34,
            976 11 Selce. Odporúčame tovar zaslať doporučene a poistený, aby sa
            predišlo možným komplikáciám spojeným s jeho strátou alebo
            poškodením počas prepravy.
          </li>
          <li>
            Predávajúci sa zaväzuje reklamáciu vybaviť v čo najkratšom možnom
            čase, najneskôr však do 30 dní od jej prijatia, ak nie je dohodnuté
            inak.
          </li>
        </ol>

        <h2 class="text-2xl font-semibold mt-6 mb-2">Práva zákazníka</h2>
        <p>
          Zákazník má právo na odstránenie vady tovaru bezplatnou opravou,
          výmenou vadného tovaru, primeranou zľavou z ceny alebo odstúpením od
          kúpnej zmluvy (vrátenie kúpnej ceny) v závislosti od charakteru vady.
        </p>

        <h2 class="text-2xl font-semibold mt-6 mb-2">
          Výnimky z práva na reklamáciu
        </h2>
        <p>
          Právo na reklamáciu sa nevzťahuje na prípady, kde vada tovaru vznikla:
        </p>
          <ul class="list-disc ml-8">
            <li>mechanickým poškodením tovaru zákazníkom,</li>
            <li>
              používaním tovaru v podmienkach, ktoré nezodpovedajú s jeho
              prirodzeným prostredím alebo nevhodnou starostlivosťou,
            </li>
            <li>
              neodborným zásahom, poškodením počas prepravy (ktoré nebolo
              spôsobené predávajúcim),
            </li>
            <li>vplyvom vyššej moci.</li>
          </ul>
        

        <h2 class="text-2xl font-semibold mt-6 mb-2">Záverečné ustanovenia</h2>
        <p>
          Tento reklamačný poriadok je platný vo forme, v akej je zverejnený na
          stránkach obchodu, a môže byť zo strany predávajúceho kedykoľvek
          zmenený alebo doplnený. Akékoľvek zmeny sú efektívne ihneď po ich
          zverejnení na stránke obchodu.
        </p>
      </div>
    </div>
  );
};

export default Reklamacia;
