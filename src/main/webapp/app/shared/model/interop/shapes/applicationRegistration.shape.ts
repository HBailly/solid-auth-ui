import { Shape } from 'shex-methods';
import { Literal, NamedNode } from 'rdflib';

const shex = `
PREFIX interop: <http://www.w3.org/ns/solid/interop#>
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
PREFIX shex: <http://www.w3.org/ns/shex>

<ApplicationRegistrationShape> {
  a [ interop:ApplicationRegistration ] ,
    interop:registeredBy                    IRI // shex:reference <#AgentShape> ;
    interop:registeredWith                  IRI // shex:reference <#ApplicationShape> ;
    interop:registeredAt                    xsd:dateTime ;
    interop:updatedAt                       xsd:dateTime ;
  interop:registeredAgent                   IRI  // shex:reference <AgentShape> ,
  interop:hasAccessGrant                    IRI  // shex:reference <AccessGrantShape>
}
`;

export type ApplicationRegistrationShape = {
  id: string; // the url of a node of this shape
  type: ApplicationRegistrationShapeType.ApplicationRegistration;
  registeredBy: string;
  registeredWith: string;
  registeredAt: Date;
  updatedAt: Date;
  registeredAgent: string;
  hasAccessGrant: string;
};

export type ApplicationRegistrationShapeCreateArgs = {
  id?: string | NamedNode; // the url to match or create the node with e.g. 'https://example.com#this', 'https://example.com/profile/card#me'
  type: ApplicationRegistrationShapeType.ApplicationRegistration;
  registeredBy: URL | NamedNode;
  registeredWith: URL | NamedNode;
  registeredAt: Date | Literal;
  updatedAt: Date | Literal;
  registeredAgent: URL | NamedNode;
  hasAccessGrant: URL | NamedNode;
};

export type ApplicationRegistrationShapeUpdateArgs = Partial<ApplicationRegistrationShapeCreateArgs>;

export enum ApplicationRegistrationShapeType {
  ApplicationRegistration = 'http://www.w3.org/ns/solid/interop#ApplicationRegistration',
}

export enum ApplicationRegistrationShapeContext {
  type = 'rdf:type',
  registeredBy = 'interop:registeredBy',
  registeredWith = 'interop:registeredWith',
  registeredAt = 'interop:registeredAt',
  updatedAt = 'interop:updatedAt',
  registeredAgent = 'interop:registeredAgent',
  hasAccessGrant = 'interop:hasAccessGrant',
}

export const applicationRegistration = new Shape<ApplicationRegistrationShape, ApplicationRegistrationShapeCreateArgs>({
  id: 'http://example.com/ApplicationRegistrationShape',
  shape: shex,
  context: ApplicationRegistrationShapeContext,
  type: ApplicationRegistrationShapeType,
});
