import { NamedNode } from 'rdflib';
import { Shape } from 'shex-methods';

const shex = `
PREFIX interop: <http://www.w3.org/ns/solid/interop#>
PREFIX shex: <http://www.w3.org/ns/shex>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX foaf: <http://xmlns.com/foaf/0.1/>

<SocialAgentShape> {
  a [ interop:SocialAgent ] ,
  foaf:name                                 rdf:langString  ,
  foaf:givenName                            rdf:langString? ,
  foaf:familyName                           rdf:langString? ,
  interop:hasRegistrySet                    IRI // shex:reference <RegistrySetShape> ,
  interop:hasAuthorizationAgent             IRI // shex:reference <ApplicationShape> ,
  interop:hasInbox                          IRI  ,
  interop:hasAccessInbox                    IRI
}
`;

export type SocialAgentShape = {
  id: string;
  type: SocialAgentShapeType.SocialAgent;
  name: string;
  givenName?: string;
  familyName?: string;
  hasRegistrySet: string;
  hasAuthorizationAgent: string;
  hasInbox: string;
  hasAccessInbox: string;
};

export type SocialAgentShapeCreateArgs = {
  id?: string | NamedNode;
  type: SocialAgentShapeType.SocialAgent;
  name: string;
  givenName?: string;
  familyName?: string;
  hasRegistrySet: URL | NamedNode;
  hasAuthorizationAgent: URL | NamedNode;
  hasInbox: URL | NamedNode;
  hasAccessInbox: URL | NamedNode;
};

export type SocialAgentShapeUpdateArgs = Partial<SocialAgentShapeCreateArgs>;

export enum SocialAgentShapeType {
  SocialAgent = 'http://www.w3.org/ns/solid/interop#SocialAgent',
}

export enum SocialAgentShapeContext {
  type = 'rdf:type',
  name = 'foaf:name',
  givenName = 'foaf:givenName',
  familyName = 'foaf:familyName',
  hasRegistrySet = 'interop:hasRegistrySet',
  hasAuthorizationAgent = 'interop:hasAuthorizationAgent',
  hasInbox = 'interop:hasInbox',
  hasAccessInbox = 'interop:hasAccessInbox',
}

export const socialAgent = new Shape<SocialAgentShape, SocialAgentShapeCreateArgs>({
  id: 'http://example.com/SocialAgentShape',
  shape: shex,
  context: SocialAgentShapeContext,
  type: SocialAgentShapeType,
});
