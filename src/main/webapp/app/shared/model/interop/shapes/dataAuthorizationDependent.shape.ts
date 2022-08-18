import { NamedNode } from 'rdflib';
import { Shape } from 'shex-methods';
import { DataAuthorizationShapeType } from '@/shared/model/interop/shapes/dataAuthorization.shape';
import { ScopeOfAuthorizationType } from '@/shared/model/interop/enums/scopeOfAuthorization.enum';
import { AccessModeType } from '@/shared/model/interop/enums/accessModeType.enum';

const shex = `
PREFIX interop: <http://www.w3.org/ns/solid/interop#>
PREFIX sts: <http://www.w3.org/ns/shapetrees-schema#>
PREFIX shex: <http://www.w3.org/ns/shex>
PREFIX acl: <http://www.w3.org/ns/auth/acl#>

<#AccessModes> [ acl:Read acl:Write acl:Append acl:Control acl:Create acl:Update acl:Delete ]

<DataAuthorizationDependentShape> {
  a [ interop:DataAuthorization ] ;
    interop:grantee                         IRI  // shex:reference <#AgentShape> ;
    interop:registeredShapeTree             IRI  // shex:reference sts:ShapeTree ;
    interop:satisfiesAccessNeed             IRI? // shex:reference <#AccessNeedShape> ;
    interop:accessMode                      @<#AccessModes>+ ;
    interop:creatorAccessMode               @<#AccessModes>* ;
  interop:scopeOfAuthorization                    [ interop:Dependent ] ;
  interop:dependsFromAuthorization          IRI  // shex:reference <#DataAuthorizationShape>
}
`;

export type DataAuthorizationDependentShape = {
  id: string; // the url of a node of this shape
  type: DataAuthorizationShapeType.DataAuthorization;
  grantee: string;
  registeredShapeTree: string;
  satisfiesAccessNeed?: string;
  accessMode: string | string[];
  creatorAccessMode?: string | string[];
  scopeOfAuthorization: ScopeOfAuthorizationType.Dependent;
  inheritsFromAuthorization: string;
};

export type DataAuthorizationDependentShapeCreateArgs = {
  id?: string | NamedNode; // the url to match or create the node with e.g. 'https://example.com#this', 'https://example.com/profile/card#me'
  type: DataAuthorizationShapeType.DataAuthorization;
  grantee: URL | NamedNode;
  registeredShapeTree: URL | NamedNode;
  satisfiesAccessNeed?: URL | NamedNode;
  accessMode: AccessModeType | AccessModeType[];
  creatorAccessMode?: AccessModeType | AccessModeType[];
  scopeOfAuthorization: ScopeOfAuthorizationType.Dependent;
  dependsFromAuthorization: URL | NamedNode;
};

export type DataAuthorizationDependentShapeUpdateArgs = Partial<DataAuthorizationDependentShapeCreateArgs>;

export enum DataAuthorizationDependentShapeType {
  DataAuthorization = 'http://www.w3.org/ns/solid/interop#DataAuthorization',
}

export enum DataAuthorizationDependentShapeContext {
  type = 'rdf:type',
  grantee = 'interop:grantee',
  registeredShapeTree = 'interop:registeredShapeTree',
  satisfiesAccessNeed = 'interop:satisfiesAccessNeed',
  accessMode = 'interop:accessMode',
  creatorAccessMode = 'interop:creatorAccessMode',
  scopeOfAuthorization = 'interop:scopeOfAuthorization',
  dependsFromAuthorization = 'interop:dependsFromAuthorization',
}

export const dataAuthorizationDependent = new Shape<DataAuthorizationDependentShape, DataAuthorizationDependentShapeCreateArgs>({
  id: 'http://example.com/DataAuthorizationDependentShape',
  shape: shex,
  context: DataAuthorizationDependentShapeContext,
  type: DataAuthorizationDependentShapeType,
});
