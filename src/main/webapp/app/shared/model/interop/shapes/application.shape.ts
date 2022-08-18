import { Literal, NamedNode } from 'rdflib';
import { Shape } from 'shex-methods';

const shex = `
PREFIX interop: <http://www.w3.org/ns/solid/interop#>
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
PREFIX shex: <http://www.w3.org/ns/shex>

<ApplicationShape> {
  a [ interop:Application ] ,
  interop:applicationName                   xsd:string ,
  interop:applicationDescription            xsd:string ,
  interop:applicationAuthor                 IRI  // shex:reference <AgentShape> ,
  interop:applicationThumbnail              IRI? ,
  interop:hasAccessNeedGroup                IRI* // shex:reference <AccessNeedGroupShape>
}
`;

export type ApplicationShape = {
  id: string; // the url of a node of this shape
  type: ApplicationShapeType.Application;
  applicationName: string;
  applicationDescription: string;
  applicationAuthor: string;
  applicationThumbnail?: string;
  hasAccessNeedGroup?: string | string[];
};

export type ApplicationShapeCreateArgs = {
  id?: string | NamedNode;
  type: ApplicationShapeType.Application;
  applicationName: string | Literal;
  applicationDescription: string | Literal;
  applicationAuthor: URL | NamedNode;
  applicationThumbnail?: URL | NamedNode;
  hasAccessNeedGroup?: URL | NamedNode | (URL | NamedNode)[];
};

export type ApplicationShapeUpdateArgs = Partial<ApplicationShapeCreateArgs>;

export enum ApplicationShapeType {
  Application = 'http://www.w3.org/ns/solid/interop#Application',
}

export enum ApplicationShapeContext {
  type = 'rdf:type',
  applicationName = 'interop:applicationName',
  applicationDescription = 'interop:applicationDescription',
  applicationAuthor = 'interop:applicationAuthor',
  applicationThumbnail = 'interop:applicationThumbnail',
  hasAccessNeedGroup = 'interop:hasAccessNeedGroup',
}

export const application = new Shape<ApplicationShape, ApplicationShapeCreateArgs>({
  id: 'http://example.com/ApplicationShape',
  shape: shex,
  context: ApplicationShapeContext,
  type: ApplicationShapeType,
});
