import { Literal, NamedNode } from 'rdflib';
import { Shape } from 'shex-methods';

const shex = `
PREFIX interop: <http://www.w3.org/ns/solid/interop#>
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
PREFIX shex: <http://www.w3.org/ns/shex>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>

<AccessReceiptShape> {
  a [interop:AccessReceipt] ,
  interop:providedAt                        xsd:dateTime ,
  interop:grantedBy                         IRI  // shex:reference <SocialAgentShape>
}
`;

export type AccessReceiptShape = {
  id: string; // the url of a node of this shape
  type: AccessReceiptShapeType.AccessReceipt;
  providedAt: Date;
  grantedBy: string;
};

export type AccessReceiptShapeCreateArgs = {
  id?: string | NamedNode; // the url to match or create the node with e.g. 'https://example.com#this', 'https://example.com/profile/card#me'
  type: AccessReceiptShapeType.AccessReceipt;
  providedAt: Date | Literal;
  grantedBy: URL | NamedNode;
};

export type AccessReceiptShapeUpdateArgs = Partial<AccessReceiptShapeCreateArgs>;

export enum AccessReceiptShapeType {
  AccessReceipt = 'http://www.w3.org/ns/solid/interop#AccessReceipt',
}

export enum AccessReceiptShapeContext {
  type = 'rdf:type',
  providedAt = 'interop:providedAt',
  grantedBy = 'interop:grantedBy',
}

export const accessReceipt = new Shape<AccessReceiptShape, AccessReceiptShapeCreateArgs>({
  id: 'http://example.com/AccessReceiptShape',
  shape: shex,
  context: AccessReceiptShapeContext,
  type: AccessReceiptShapeType,
});
