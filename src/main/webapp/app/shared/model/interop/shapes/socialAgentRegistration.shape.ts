import { Literal, NamedNode } from 'rdflib';
import { Shape } from 'shex-methods';

const shex = `
PREFIX interop: <http://www.w3.org/ns/solid/interop#>
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
PREFIX sts: <http://www.w3.org/ns/shapetrees-schema#>
PREFIX shex: <http://www.w3.org/ns/shex>
PREFIX acl: <http://www.w3.org/ns/auth/acl#>
PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX ldp: <http://www.w3.org/ns/ldp#>

<SocialAgentRegistrationShape> {
  a [ interop:SocialAgentRegistration ] ,
    interop:registeredBy                    IRI // shex:reference <#AgentShape> ;
    interop:registeredWith                  IRI // shex:reference <#ApplicationShape> ;
    interop:registeredAt                    xsd:dateTime ;
    interop:updatedAt                       xsd:dateTime ;
  interop:registeredAgent                   IRI  // shex:reference <AgentShape> ,
  interop:hasAccessGrant                    IRI  // shex:reference <AccessGrantShape> ,
  interop:reciprocalRegistration            IRI? // shex:reference <SocialAgentShape>
}
`;

export type SocialAgentRegistrationShape = {
  id: string;
  type: SocialAgentRegistrationShapeType.SocialAgentRegistration;
  registeredBy: string;
  registeredWith: string;
  registeredAt: Date;
  updatedAt: Date;
  registeredAgent: string;
  hasAccessGrant: string;
  reciprocalRegistration?: string;
};

export type SocialAgentRegistrationShapeCreateArgs = {
  id?: string | NamedNode;
  type: SocialAgentRegistrationShapeType.SocialAgentRegistration;
  registeredBy: URL | NamedNode;
  registeredWith: URL | NamedNode;
  registeredAt: Date | Literal;
  updatedAt: Date | Literal;
  registeredAgent: URL | NamedNode;
  hasAccessGrant: URL | NamedNode;
  reciprocalRegistration?: URL | NamedNode;
};

export type SocialAgentRegistrationShapeUpdateArgs = Partial<SocialAgentRegistrationShapeCreateArgs>;

export enum SocialAgentRegistrationShapeType {
  SocialAgentRegistration = 'http://www.w3.org/ns/solid/interop#SocialAgentRegistration',
}

export enum SocialAgentRegistrationShapeContext {
  type = 'rdf:type',
  registeredBy = 'interop:registeredBy',
  registeredWith = 'interop:registeredWith',
  registeredAt = 'interop:registeredAt',
  updatedAt = 'interop:updatedAt',
  registeredAgent = 'interop:registeredAgent',
  hasAccessGrant = 'interop:hasAccessGrant',
  reciprocalRegistration = 'interop:reciprocalRegistration',
}

export const socialAgentRegistration = new Shape<SocialAgentRegistrationShape, SocialAgentRegistrationShapeCreateArgs>({
  id: 'http://example.com/SocialAgentRegistrationShape',
  shape: shex,
  context: SocialAgentRegistrationShapeContext,
  type: SocialAgentRegistrationShapeType,
});
