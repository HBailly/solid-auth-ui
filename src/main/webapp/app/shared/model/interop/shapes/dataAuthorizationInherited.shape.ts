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

<DataAuthorizationInheritedShape> {
  a [ interop:DataAuthorization ] ;
    interop:grantee                         IRI  // shex:reference <#AgentShape> ;
    interop:registeredShapeTree             IRI  // shex:reference sts:ShapeTree ;
    interop:satisfiesAccessNeed             IRI? // shex:reference <#AccessNeedShape> ;
    interop:accessMode                      @<#AccessModes>+ ;
    interop:creatorAccessMode               @<#AccessModes>* ;
  interop:dataOwner                         IRI*  // shex:reference <#SocialAgentShape> ;
  interop:scopeOfAuthorization                    [ interop:Inherited ] ;
  interop:hasDataRegistration               IRI* // shex:reference <#DataRegistrationShape> ;
  interop:hasDataInstance                   IRI* ;
  interop:dependsFromAuthorization          IRI?  // shex:reference <#DataAuthorizationShape> ;
  interop:inheritsFromAuthorization         IRI  // shex:reference <#DataAuthorizationShape>
}
`;

export type DataAuthorizationInheritedShape = {
  id: string; // the url of a node of this shape
  type: DataAuthorizationShapeType.DataAuthorization;
  grantee: string;
  registeredShapeTree: string;
  satisfiesAccessNeed?: string;
  accessMode: string | string[];
  creatorAccessMode?: string | string[];
  dataOwner: string | string[];
  scopeOfAuthorization: ScopeOfAuthorizationType.Inherited;
  hasDataRegistration?: string | string[];
  dependsFromAuthorization: string;
  inheritsFromAuthorization: string;
};

export type DataAuthorizationInheritedShapeCreateArgs = {
  id?: string | NamedNode; // the url to match or create the node with e.g. 'https://example.com#this', 'https://example.com/profile/card#me'
  type: DataAuthorizationShapeType.DataAuthorization;
  grantee: URL | NamedNode;
  registeredShapeTree: URL | NamedNode;
  satisfiesAccessNeed?: URL | NamedNode;
  accessMode: AccessModeType | AccessModeType[];
  creatorAccessMode?: AccessModeType | AccessModeType[];
  dataOwner: URL | NamedNode;
  scopeOfAuthorization: ScopeOfAuthorizationType.Inherited;
  hasDataRegistration?: URL | NamedNode;
  dependsFromAuthorization: URL | NamedNode;
  inheritsFromAuthorization: URL | NamedNode;
};

export type DataAuthorizationInheritedShapeUpdateArgs = Partial<DataAuthorizationInheritedShapeCreateArgs>;

export enum DataAuthorizationInheritedShapeType {
  DataAuthorization = 'http://www.w3.org/ns/solid/interop#DataAuthorization',
}

export enum DataAuthorizationInheritedShapeContext {
  type = 'rdf:type',
  grantee = 'interop:grantee',
  registeredShapeTree = 'interop:registeredShapeTree',
  satisfiesAccessNeed = 'interop:satisfiesAccessNeed',
  accessMode = 'interop:accessMode',
  creatorAccessMode = 'interop:creatorAccessMode',
  dataOwner = 'interop:dataOwner',
  scopeOfAuthorization = 'interop:scopeOfAuthorization',
  hasDataRegistration = 'interop:hasDataRegistration',
  hasDataInstance = 'interop:hasDataInstance',
  dependsFromAuthorization = 'interop:dependsFromAuthorization',
  inheritsFromAuthorization = 'interop:inheritsFromAuthorization',
}

export const dataAuthorizationInherited = new Shape<DataAuthorizationInheritedShape, DataAuthorizationInheritedShapeCreateArgs>({
  id: 'http://example.com/DataAuthorizationInheritedShape',
  shape: shex,
  context: DataAuthorizationInheritedShapeContext,
  type: DataAuthorizationInheritedShapeType,
});
