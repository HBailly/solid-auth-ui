import { NamedNode } from 'rdflib';
import { ScopeOfAuthorizationType } from '@/shared/model/interop/enums/scopeOfAuthorization.enum';
import { Shape } from 'shex-methods';

const shex = `
PREFIX interop: <http://www.w3.org/ns/solid/interop#>
PREFIX sts: <http://www.w3.org/ns/shapetrees-schema#>
PREFIX shex: <http://www.w3.org/ns/shex>
PREFIX acl: <http://www.w3.org/ns/auth/acl#>

<DataAuthorizationShape>
  <#DataAuthorizationAllShape> OR
  <#DataAuthorizationAllFromAgentShape> OR
  <#DataAuthorizationAllFromRegistryShape> OR
  <#DataAuthorizationSelectedFromRegistryShape> OR
  <#DataAuthorizationInheritedShape> OR
  <#DataAuthorizationDependentShape>

<#AccessModes> [ acl:Read acl:Write acl:Append acl:Control acl:Create acl:Update acl:Delete ]

<DataAuthorizationAllShape> {
  a [ interop:DataAuthorization ] ;
  $<#CommonDataAuthorizationProperties> (
    interop:grantee                         IRI  // shex:reference <#AgentShape> ;
    interop:registeredShapeTree             IRI  // shex:reference sts:ShapeTree ;
    interop:satisfiesAccessNeed             IRI? // shex:reference <#AccessNeedShape> ;
    interop:accessMode                      @<#AccessModes>+ ;
    interop:creatorAccessMode               @<#AccessModes>* ;
  ) ;
  interop:scopeOfAuthorization                    [ interop:All ]
}

<DataAuthorizationAllFromAgentShape> {
  a [ interop:DataAuthorization ] ;
  &<#CommonDataAuthorizationProperties> ;
  interop:dataOwner                         IRI+ // shex:reference <#SocialAgentShape> ;
  interop:scopeOfAuthorization                    [ interop:AllFromAgent ]
}

<DataAuthorizationAllFromRegistryShape> {
  a [ interop:DataAuthorization ] ;
  &<#CommonDataAuthorizationProperties> ;
  interop:dataOwner                         IRI  // shex:reference <#SocialAgentShape> ;
  interop:scopeOfAuthorization                    [ interop:AllFromRegistry ] ;
  interop:hasDataRegistration               IRI+ // shex:reference <#DataRegistrationShape>
}

<DataAuthorizationSelectedFromRegistryShape> {
  a [ interop:DataAuthorization ] ;
  &<#CommonDataAuthorizationProperties> ;
  interop:dataOwner                         IRI  // shex:reference <#SocialAgentShape> ;
  interop:scopeOfAuthorization                    [ interop:SelectedFromRegistry ] ;
  interop:hasDataRegistration               IRI+ // shex:reference <#DataRegistrationShape> ;
  interop:hasDataInstance                   IRI+
}

<DataAuthorizationDependentShape> {
  a [ interop:DataAuthorization ] ;
  &<#CommonDataAuthorizationProperties> ;
  interop:scopeOfAuthorization                    [ interop:Dependent ] ;
  interop:dependsFromAuthorization         IRI  // shex:reference <#DataAuthorizationShape>
}

<DataAuthorizationInheritedShape> {
  a [ interop:DataAuthorization ] ;
  &<#CommonDataAuthorizationProperties> ;
  interop:dataOwner                         IRI*  // shex:reference <#SocialAgentShape> ;
  interop:scopeOfAuthorization                    [ interop:Inherited ] ;
  interop:hasDataRegistration               IRI* // shex:reference <#DataRegistrationShape> ;
  interop:hasDataInstance                   IRI* ;
  interop:dependsFromAuthorization          IRI  // shex:reference <#DataAuthorizationShape> ;
  interop:inheritsFromAuthorization         IRI  // shex:reference <#DataAuthorizationShape>
}
`;

export type DataAuthorizationShape = {
  id: string; // the url of a node of this shape
  type: DataAuthorizationShapeType.DataAuthorization;
  grantee: string;
  registeredShapeTree: string;
  satisfiesAccessNeed?: string;
  accessMode: string | string[];
  creatorAccessMode?: string | string[];
} & (
  | {
      scopeOfAuthorization: ScopeOfAuthorizationType.All;
    }
  | {
      scopeOfAuthorization: ScopeOfAuthorizationType.AllFromAgent;
      dataOwner: string | string[];
    }
  | {
      scopeOfAuthorization: ScopeOfAuthorizationType.AllFromRegistry;
      dataOwner: string;
      hasDataRegistration: string | string[];
    }
  | {
      dataOwner: string;
      scopeOfAuthorization: ScopeOfAuthorizationType.SelectedFromRegistry;
      hasDataRegistration: string | string[];
      hasDataInstance: string | string[];
    }
  | {
      scopeOfAuthorization: ScopeOfAuthorizationType.Dependent;
      dependsFromAuthorization: string;
    }
  | {
      dataOwner: string | string[];
      scopeOfAuthorization: ScopeOfAuthorizationType.Inherited;
      hasDataRegistration?: string | string[];
      dependsFromAuthorization: string;
      inheritsFromAuthorization: string;
    }
);

export type DataAuthorizationShapeCreateArgs = {
  id?: string | NamedNode; // the url to match or create the node with e.g. 'https://example.com#this', 'https://example.com/profile/card#me'
  type: DataAuthorizationShapeType.DataAuthorization;
  grantee: URL | NamedNode;
  registeredShapeTree: URL | NamedNode;
  satisfiesAccessNeed?: URL | NamedNode;
  accessMode: string | string[];
  creatorAccessMode?: string | string[];
} & (
  | {
      scopeOfAuthorization: ScopeOfAuthorizationType.All;
    }
  | {
      scopeOfAuthorization: ScopeOfAuthorizationType.AllFromAgent;
      dataOwner: URL | NamedNode | (URL | NamedNode)[];
    }
  | {
      scopeOfAuthorization: ScopeOfAuthorizationType.AllFromRegistry;
      dataOwner: URL | NamedNode;
      hasDataRegistration: URL | NamedNode | (URL | NamedNode)[];
    }
  | {
      dataOwner: URL | NamedNode;
      scopeOfAuthorization: ScopeOfAuthorizationType.SelectedFromRegistry;
      hasDataRegistration: URL | NamedNode | (URL | NamedNode)[];
      hasDataInstance: URL | NamedNode | (URL | NamedNode)[];
    }
  | {
      scopeOfAuthorization: ScopeOfAuthorizationType.Dependent;
      dependsFromAuthorization: URL | NamedNode;
    }
  | {
      dataOwner: URL | NamedNode | (URL | NamedNode)[];
      scopeOfAuthorization: ScopeOfAuthorizationType.Inherited;
      hasDataRegistration?: URL | NamedNode | (URL | NamedNode)[];
      hasDataInstance: URL | NamedNode | (URL | NamedNode)[];
      dependsFromAuthorization: URL | NamedNode;
      inheritsFromAuthorization: URL | NamedNode;
    }
);

export type DataAuthorizationShapeUpdateArgs = Partial<DataAuthorizationShapeCreateArgs>;

export enum DataAuthorizationShapeType {
  DataAuthorization = 'http://www.w3.org/ns/solid/interop#DataAuthorization',
}

export enum DataAuthorizationShapeContext {
  type = 'rdf:type',
  grantee = 'interop:grantee',
  registeredShapeTree = 'interop:registeredShapeTree',
  satisfiesAccessNeed = 'interop:satisfiesAccessNeed',
  accessMode = 'interop:accessMode',
  creatorAccessMode = 'interop:creatorAccessMode',
  scopeOfAuthorization = 'interop:scopeOfAuthorization',
  dataOwner = 'interop:dataOwner',
  hasDataRegistration = 'interop:hasDataRegistration',
  hasDataInstance = 'interop:hasDataInstance',
  dependsFromAuthorization = 'interop:dependsFromAuthorization',
  inheritsFromAuthorization = 'interop:inheritsFromAuthorization',
}

export const dataAuthorization = new Shape<DataAuthorizationShape, DataAuthorizationShapeCreateArgs>({
  id: 'http://example.com/DataAuthorizationAllShape',
  shape: shex,
  context: DataAuthorizationShapeContext,
  type: DataAuthorizationShapeType,
});
