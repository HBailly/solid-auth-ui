import { Shape } from 'shex-methods';
import { DataAuthorizationShapeType } from '@/shared/model/interop/shapes/dataAuthorization.shape';
import { ScopeOfAuthorizationType } from '@/shared/model/interop/enums/scopeOfAuthorization.enum';
import { AccessModeType } from '@/shared/model/interop/enums/accessModeType.enum';
import { NamedNode } from 'rdflib';

const shex = `
PREFIX interop: <http://www.w3.org/ns/solid/interop#>
PREFIX sts: <http://www.w3.org/ns/shapetrees-schema#>
PREFIX shex: <http://www.w3.org/ns/shex>
PREFIX acl: <http://www.w3.org/ns/auth/acl#>

<#AccessModes> [ acl:Read acl:Write acl:Append acl:Control acl:Create acl:Update acl:Delete ]

<DataAuthorizationAllShape> {
  a [ interop:DataAuthorization ] ;
    interop:grantee                         IRI  // shex:reference <#AgentShape> ;
    interop:registeredShapeTree             IRI  // shex:reference sts:ShapeTree ;
    interop:satisfiesAccessNeed             IRI? // shex:reference <#AccessNeedShape> ;
    interop:accessMode                      @<#AccessModes>+ ;
    interop:creatorAccessMode               @<#AccessModes>* ;
  interop:scopeOfAuthorization                    [ interop:All ]
}
`;

export type DataAuthorizationAllShape = {
  id: string; // the url of a node of this shape
  type: DataAuthorizationShapeType.DataAuthorization;
  grantee: string;
  registeredShapeTree: string;
  satisfiesAccessNeed?: string;
  accessMode: string | string[];
  creatorAccessMode?: string | string[];
  scopeOfAuthorization: ScopeOfAuthorizationType.All;
};

export type DataAuthorizationAllShapeCreateArgs = {
  id?: string | NamedNode; // the url to match or create the node with e.g. 'https://example.com#this', 'https://example.com/profile/card#me'
  type: DataAuthorizationShapeType.DataAuthorization;
  grantee: URL | NamedNode;
  registeredShapeTree: URL | NamedNode;
  satisfiesAccessNeed?: URL | NamedNode;
  accessMode: AccessModeType | AccessModeType[];
  creatorAccessMode?: AccessModeType | AccessModeType[];
  scopeOfAuthorization: ScopeOfAuthorizationType.All;
};

export type DataAuthorizationAllShapeUpdateArgs = Partial<DataAuthorizationAllShapeCreateArgs>;

export enum DataAuthorizationAllShapeType {
  DataAuthorization = 'http://www.w3.org/ns/solid/interop#DataAuthorization',
}

export enum DataAuthorizationAllShapeContext {
  type = 'rdf:type',
  grantee = 'interop:grantee',
  registeredShapeTree = 'interop:registeredShapeTree',
  satisfiesAccessNeed = 'interop:satisfiesAccessNeed',
  accessMode = 'interop:accessMode',
  creatorAccessMode = 'interop:creatorAccessMode',
  scopeOfAuthorization = 'interop:scopeOfAuthorization',
}

export const dataAuthorizationAll = new Shape<DataAuthorizationAllShape, DataAuthorizationAllShapeCreateArgs>({
  id: 'http://example.com/DataAuthorizationAllShape',
  shape: shex,
  context: DataAuthorizationAllShapeContext,
  type: DataAuthorizationAllShapeType,
});
