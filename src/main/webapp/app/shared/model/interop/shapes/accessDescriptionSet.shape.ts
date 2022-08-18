import { Literal, NamedNode } from 'rdflib';
import { Shape } from 'shex-methods';

const shex = `
PREFIX interop: <http://www.w3.org/ns/solid/interop#>
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>

<AccessDescriptionSetShape> {
  a [ interop:AccessDescriptionSet ] ,
  interop:usesLanguage                      xsd:language
}
`;

export type AccessDescriptionSetShape = {
  id: string; // the url of a node of this shape
  type: AccessDescriptionSetShapeType.AccessDescriptionSet;
  usesLanguage: string;
};

export type AccessDescriptionSetShapeCreateArgs = {
  id?: string | NamedNode; // the url to match or create the node with e.g. 'https://example.com#this', 'https://example.com/profile/card#me'
  type: AccessDescriptionSetShapeType.AccessDescriptionSet;
  usesLanguage: string | Literal;
};

export type AccessDescriptionSetShapeUpdateArgs = Partial<AccessDescriptionSetShapeCreateArgs>;

export enum AccessDescriptionSetShapeType {
  AccessDescriptionSet = 'http://www.w3.org/ns/solid/interop#AccessDescriptionSet',
}

export enum AccessDescriptionSetShapeContext {
  type = 'rdf:type',
  usesLanguage = 'interop:usesLanguage',
}

export const accessDescriptionSet = new Shape<AccessDescriptionSetShape, AccessDescriptionSetShapeCreateArgs>({
  id: 'http://example.com/AccessDescriptionSetShape',
  shape: shex,
  context: AccessDescriptionSetShapeContext,
  type: AccessDescriptionSetShapeType,
});
