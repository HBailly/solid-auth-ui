import { NamedNode } from 'rdflib';
import { Shape } from 'shex-methods';
import { AccessModeType } from '@/shared/model/interop/enums/accessModeType.enum';
import { AccessNecessityType } from '@/shared/model/interop/enums/accessNecessityType.enum';

const shex = `
PREFIX interop: <http://www.w3.org/ns/solid/interop#>
PREFIX sts: <http://www.w3.org/ns/shapetrees-schema#>
PREFIX shex: <http://www.w3.org/ns/shex>
PREFIX acl: <http://www.w3.org/ns/auth/acl#>

<AccessNeedShape> {
  a [ interop:AccessNeed ] ,
  interop:hasAccessNeedDescription          IRI+ // shex:reference <AccessNeedDescriptionShape> ,
  interop:registeredShapeTree               IRI  // shex:reference sts:ShapeTree ,
  interop:accessMode                        [ acl:Read  acl:Write  acl:Append  acl:Control  acl:Create  acl:Update acl:Delete ]+ ,
  interop:creatorAccessMode                 [ acl:Read  acl:Write  acl:Append  acl:Control  acl:Create  acl:Update acl:Delete ]* ,
  interop:accessNecessity                   [ interop:AccessRequired interop:AccessOptional ] ,
  interop:hasPurpose                        IRI* ,
  interop:hasDataInstance                   IRI* ,
  interop:hasAccessNeed                     IRI* // shex:reference <AccessNeedShape> ,
  interop:inheritsFromNeed                  IRI? // shex:reference <AccessNeedShape> ,
}
`;

export type AccessNeedShape = {
  id: string; // the url of a node of this shape
  type: AccessNeedShapeType.AccessNeed;
  hasAccessNeedDescription: string | string[];
  registeredShapeTree: string;
  accessMode: AccessModeType | AccessModeType[];
  creatorAccessMode?: AccessModeType | AccessModeType[];
  accessNecessity: AccessNecessityType.AccessRequired | AccessNecessityType.AccessOptional;
  hasPurpose?: string | string[];
  hasDataInstance?: string | string[];
  hasAccessNeed?: string | string[];
  inheritsFromNeed?: string;
};

export type AccessNeedShapeCreateArgs = {
  id?: string | NamedNode; // the url to match or create the node with e.g. 'https://example.com#this', 'https://example.com/profile/card#me'
  type: AccessNeedShapeType.AccessNeed;
  hasAccessNeedDescription: URL | NamedNode | (URL | NamedNode)[];
  registeredShapeTree: URL | NamedNode;
  accessMode: AccessModeType | AccessModeType[];
  creatorAccessMode?: AccessModeType | AccessModeType[];
  accessNecessity: AccessNecessityType.AccessRequired | AccessNecessityType.AccessOptional;
  hasPurpose?: URL | NamedNode | (URL | NamedNode)[];
  hasDataInstance?: URL | NamedNode | (URL | NamedNode)[];
  hasAccessNeed?: URL | NamedNode | (URL | NamedNode)[];
  inheritsFromNeed?: URL | NamedNode;
};

export type AccessNeedShapeUpdateArgs = Partial<AccessNeedShapeCreateArgs>;

export enum AccessNeedShapeType {
  AccessNeed = 'http://www.w3.org/ns/solid/interop#AccessNeed',
}

export enum AccessNeedShapeContext {
  type = 'rdf:type',
  hasAccessNeedDescription = 'interop:hasAccessNeedDescription',
  registeredShapeTree = 'interop:registeredShapeTree',
  accessMode = 'interop:accessMode',
  creatorAccessMode = 'interop:creatorAccessMode',
  accessNecessity = 'interop:accessNecessity',
  hasDataInstance = 'interop:hasDataInstance',
  hasPurpose = 'interop:hasPurpose',
  hasAccessNeed = 'interop:hasAccessNeed',
  inheritsFromNeed = 'interop:inheritsFromNeed',
}

export const accessNeed = new Shape<AccessNeedShape, AccessNeedShapeCreateArgs>({
  id: 'http://example.com/AccessNeedShape',
  shape: shex,
  context: AccessNeedShapeContext,
  type: AccessNeedShapeType,
});
