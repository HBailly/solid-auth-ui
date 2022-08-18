import { shapeTreeShex } from '@/shared/model/shapetree/shapetree.shapes';
import { NamedNode } from 'rdflib';
import { Shape } from 'shex-methods';
import { ExpectsTypeType, ShapeTreeType } from '@/shared/model/shapetree/enums/expectsType.enum';

export type ResourceShapeTreeShape = {
  id: string; // the url of a node of this shape
  type: ShapeTreeType.ShapeTree;
  expectsType: ExpectsTypeType.Resource;
  prefLabel: string;
  definition: string;
  hasData: string;
  shape: string;
  references: ReferenceShape;
};

export type ResourceShapeTreeShapeCreateArgs = {
  id?: string | NamedNode; // the url to match or create the node with e.g. 'https://example.com#this', 'https://example.com/profile/card#me'
  type: ShapeTreeType.ShapeTree;
  expectsType: ExpectsTypeType.Resource;
  prefLabel: string;
  definition: string;
  hasData: URL | NamedNode;
  shape: URL | NamedNode;
  references: ReferenceShapeCreateArgs;
};

export type ReferenceShape = {
  id: string; // the url of a node of this shape
  hasShapeTree: string;
  viaPredicate?: string;
  viaShapePath?: string;
};

export type ReferenceShapeCreateArgs = {
  hasShapeTree: URL | NamedNode;
  viaPredicate?: URL | NamedNode;
  viaShapePath?: URL | NamedNode;
};

export type ResourceShapeTreeUpdateArgs = Partial<ResourceShapeTreeShapeCreateArgs>;

export enum ResourceShapeTreeContext {
  type = 'rdf:type',
  expectsType = 'st:expectsType',
  shape = 'st:shape',
  prefLabel = 'skos:prefLabel',
  definition = 'skos:definition',
  hasData = 'st:hasData',
  references = 'st:references',
  hasShapeTree = 'st:hasShapeTree',
  viaPredicate = 'st:viaPredicate',
  viaShapePath = 'st:viaShapePath',
}

export const resourceShapeTree = new Shape<ResourceShapeTreeShape, ResourceShapeTreeShapeCreateArgs>({
  id: 'http://example.com/ResourceShapeTree',
  shape: shapeTreeShex,
  context: ResourceShapeTreeContext,
  type: ShapeTreeType,
});
