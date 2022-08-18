import namespace from '@rdfjs/namespace';

export const pref = {
  schema: 'http://schema.org/',
  xsd: 'http://www.w3.org/2001/XMLSchema#',

  dct: 'http://purl.org/dc/terms/',
  dc: 'http://purl.org/dc/elements/1.1/',

  owl: 'http://www.w3.org/2002/07/owl#',
  foaf: 'http://xmlns.com/foaf/0.1/',
  skos: 'http://www.w3.org/2004/02/skos/core#',

  rdf: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#',
  rdfs: 'http://www.w3.org/2000/01/rdf-schema#',

  solid: 'http://www.w3.org/ns/solid/terms',
  acl: 'http://www.w3.org/ns/auth/acl#',
  interop: 'http://www.w3.org/ns/solid/interop#',

  st: 'http://www.w3.org/ns/shapetree#',
  sts: 'http://www.w3.org/ns/shapetrees-schema#',

  dpv: 'https://w3id.org/dpv/dpv-owl#',
  spl: 'http://www.specialprivacy.eu/langs/usage-policy#>',
  svd: 'http://www.specialprivacy.eu/vocabs/data#>',
  svpr: 'http://www.specialprivacy.eu/vocabs/processing#>',
  svpu: 'http://www.specialprivacy.eu/vocabs/purposes#>',

  projectron: 'https://projectron.example/#',
  needs: 'https://projectron.example/needs#',
  pm: 'http://data.example/shapetrees/pm#',

  acme: 'https://acme.example/#',
};

export const ns = {
  schema: namespace(pref.schema),
  xsd: namespace(pref.xsd),

  dct: namespace(pref.dct),
  dc: namespace(pref.dc),

  owl: namespace(pref.owl),
  foaf: namespace(pref.foaf),
  skos: namespace(pref.skos),

  rdf: namespace(pref.rdf),
  rdfs: namespace(pref.rdfs),

  solid: namespace(pref.solid),
  acl: namespace(pref.acl),
  interop: namespace(pref.interop),

  st: namespace(pref.st),
  sts: namespace(pref.sts),

  dpv: namespace(pref.dpv),
  spl: namespace(pref.spl),
  svd: namespace(pref.svd),
  svpr: namespace(pref.svpr),
  svpu: namespace(pref.svpu),

  projectron: namespace(pref.projectron),
  needs: namespace(pref.needs),
  pm: namespace(pref.pm),

  acme: namespace(pref.acme),
};
