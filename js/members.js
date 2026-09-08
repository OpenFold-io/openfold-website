/* OpenFold, consortium member logos.
 *
 * Single source of truth for member logos and their links, rendered into the
 * homepage strip (#member-logos) and the full community grid (#member-logos-full).
 *
 * NOTE: the SandboxAQ / Structure Therapeutics logos were previously linked to
 * each other's sites; and likewise Daiichi Sankyo / Dyno. Both are corrected
 * here so every logo links to the correct organization.
 */
(function () {
  'use strict';

  var MEMBERS = [
    { img: 'abiologics.png',          alt: 'abiologics',        url: 'https://www.abiologics.com/' },
    { img: 'aalphabio.png',           alt: 'AAlphaBio',         url: 'https://www.aalphabio.com/' },
    { img: 'absci.png',               alt: 'Absci',             url: 'https://www.absci.com/' },
    { img: 'achira.png',              alt: 'Achira',            url: 'https://achira.ai/' },
    { img: 'adaptivebiotech.png',     alt: 'Adaptive Biotechnologies', url: 'https://www.adaptivebiotech.com/' },
    { img: 'amd.jpg',                 alt: 'AMD',               url: 'https://www.amd.com/' },
    { img: 'apheris.png',             alt: 'Apheris',           url: 'https://www.apheris.com/' },
    { img: 'arzeda.png',              alt: 'Arzeda',            url: 'https://www.arzeda.com/' },
    { img: 'astex.png',               alt: 'Astex',             url: 'https://astx.com/' },
    { img: 'basecamp.png',            alt: 'BaseCamp Research', url: 'https://www.basecamp-research.com/' },
    { img: 'bayer.png',               alt: 'Bayer',             url: 'https://www.bayer.com/' },
    { img: 'benchling.png',           alt: 'Benchling',         url: 'https://www.benchling.com/' },
    { img: 'biogen.png',              alt: 'Biogen',            url: 'https://www.biogen.com/' },
    { img: 'boltzmann.png',           alt: 'Boltzmann Labs',    url: 'https://boltzmann.co/' },
    { img: 'BMS.png',                 alt: 'Bristol Myers Squibb', url: 'https://www.bms.com/' },
    { img: 'charm.png',               alt: 'CHARM Therapeutics', url: 'https://charmtx.com/' },
    { img: 'cognano.png',             alt: 'COGNANO',           url: 'https://cognanous.com/' },
    { img: 'congruence.png',          alt: 'Congruence Therapeutics', url: 'https://congruencetx.com/' },
    { img: 'cyrus.png',               alt: 'Cyrus Biotechnology', url: 'https://cyrusbio.com/' },
    { img: 'daiichisankyo.jpg',       alt: 'Daiichi Sankyo',    url: 'https://www.daiichisankyo.com/' },
    { img: 'dassault.png',            alt: 'Dassault Systèmes', url: 'https://www.3ds.com/' },
    { img: 'dyno.png',                alt: 'Dyno Therapeutics', url: 'https://www.dynotx.com/' },
    { img: 'flagship.jpg',            alt: 'Flagship Pioneering', url: 'https://www.flagshippioneering.com/' },
    { img: 'JohnsonAndJohnson.png',   alt: 'Johnson & Johnson', url: 'https://www.jnj.com/' },
    { img: 'kiin.png',                alt: 'Kiin Bio',          url: 'https://kiin.bio/' },
    { img: 'lambda.png',              alt: 'Lambda',            url: 'https://lambdalabs.com/' },
    { img: 'Nanome.jpg',              alt: 'Nanome',            url: 'https://nanome.ai/' },
    { img: 'NovoNordisk.png',         alt: 'Novo Nordisk',      url: 'https://www.novonordisk.com/' },
    { img: 'nxera.png',               alt: 'Nxera Pharma',      url: 'https://www.nxera.life/' },
    { img: 'outpace.png',             alt: 'Outpace Bio',       url: 'https://www.outpacebio.com/' },
    { img: 'pledge.png',              alt: 'Pledge Therapeutics', url: 'https://pledge-tx.com/' },
    { img: 'PolarisQB_Logo.png',      alt: 'Polaris Quantum Biotech', url: 'https://polarisqb.com/' },
    { img: 'proteinevolution.png',    alt: 'Protein Evolution', url: 'https://www.protein-evolution.com/' },
    { img: 'PsiThera.png',            alt: 'Psivant Therapeutics', url: 'https://psithera.com/' },
    { img: 'puxano.png',              alt: 'Puxano',            url: 'https://puxano.com/' },
    { img: 'roche.png',               alt: 'Roche',             url: 'https://www.roche.com/' },
    { img: 'SandboxAQ.png',           alt: 'SandboxAQ',         url: 'https://www.sandboxaq.com/' },
    { img: 'StructureTherapeutics.png', alt: 'Structure Therapeutics', url: 'https://structuretx.com/' },
    { img: 'Tamarind.png',            alt: 'Tamarind Bio',      url: 'https://www.tamarind.bio/' },
    { img: 'ucb.jpeg',                alt: 'UCB',               url: 'https://www.ucb.com/' },
    { img: 'UnnaturalProducts.png',   alt: 'Unnatural Products', url: 'https://www.unnaturalproducts.com/' },
    { img: 'valence.png',             alt: 'Valence Labs',      url: 'https://www.valencelabs.com/' },
    { img: 'visterra.png',            alt: 'Visterra',          url: 'https://visterrainc.com/' }
  ];

  function cellHtml(m) {
    return (
      '<a class="logo-cell" href="' + m.url + '" target="_blank" rel="noopener noreferrer">' +
      '<img src="assets/images/' + m.img + '" alt="' + m.alt + '" loading="lazy">' +
      '</a>'
    );
  }

  function render(id) {
    var el = document.getElementById(id);
    if (!el) return;
    el.innerHTML = MEMBERS.map(cellHtml).join('');
  }

  function init() {
    render('member-logos');       // homepage strip
    render('member-logos-full');  // community page (larger grid)
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
