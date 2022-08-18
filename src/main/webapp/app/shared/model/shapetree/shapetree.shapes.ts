export const shapeTreeShex = `
PREFIX : <>
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX st: <http://www.w3.org/ns/shapetrees#>
PREFIX dpv: <https://w3id.org/dpv/dpv-owl#>
PREFIX skos: <http://www.w3.org/2004/02/skos/core#>

<ContainerShapeTree> {
  a [ st:ShapeTree ] ;
    st:expectsType  [ st:Container ] ;
    st:contains     IRI
}

<ResourceShapeTree> {
  a [ st:ShapeTree ] ;
    st:expectsType  [ st:Resource ] ;
    st:shape IRI ;
    skos:prefLabel rdf:langString+ ;
    skos:definition rdf:langString* ;
    st:hasData [
      dpv:Data
      dpv:PersonalData
      dpv:SensitivePersonalData
      dpv:SpecialCategoryPersonalData
      dpv:DerivedPersonalData
      dpv:InferredPersonalData
      dpv:PseudoAnonymisedData
      dpv:NonPersonalData
      dpv:AnonymisedData
     ] ;
    st:references {
       st:hasShapeTree IRI ;
      ( st:viaShapePath IRI | st:viaPredicate IRI )
      }?
}
`;
