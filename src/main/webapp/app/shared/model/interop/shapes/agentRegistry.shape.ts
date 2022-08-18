import { Shape } from 'shex-methods';
import { NamedNode } from 'rdflib';

const shex = `
PREFIX interop: <http://www.w3.org/ns/solid/interop#>
PREFIX shex: <http://www.w3.org/ns/shex>

<AgentRegistryShape> {
  a [ interop:AgentRegistry ] ,
  interop:hasSocialAgentRegistration        IRI* // shex:reference <SocialAgentRegistrationShape> ,
  interop:hasApplicationRegistration        IRI* // shex:reference <ApplicationRegistrationShape>
}
`;

export type AgentRegistryShape = {
  id: string; // the url of a node of this shape
  type: AgentRegistryShapeType.AgentRegistry;
  hasSocialAgentRegistration?: string | string[];
  hasApplicationRegistration?: string | string[];
};

export type AgentRegistryShapeCreateArgs = {
  id?: string | NamedNode; // the url to match or create the node with e.g. 'https://example.com#this', 'https://example.com/profile/card#me'
  type: AgentRegistryShapeType.AgentRegistry;
  hasSocialAgentRegistration?: URL | NamedNode | (URL | NamedNode)[];
  hasApplicationRegistration?: URL | NamedNode | (URL | NamedNode)[];
};

export type AgentRegistryShapeUpdateArgs = Partial<AgentRegistryShapeCreateArgs>;

export enum AgentRegistryShapeType {
  AgentRegistry = 'http://www.w3.org/ns/solid/interop#AgentRegistry',
}

export enum AgentRegistryShapeContext {
  type = 'rdf:type',
  hasSocialAgentRegistration = 'interop:hasSocialAgentRegistration',
  hasApplicationRegistration = 'interop:hasApplicationRegistration',
}

export const agentRegistry = new Shape<AgentRegistryShape, AgentRegistryShapeCreateArgs>({
  id: 'http://example.com/AgentRegistryShape',
  shape: shex,
  context: AgentRegistryShapeContext,
  type: AgentRegistryShapeType,
});
