import { Shape } from 'shex-methods';
import { shapeTreeShex } from '@/shared/model/shapetree/shapetree.shapes';
import { NamedNode } from 'rdflib';
import { ExpectsTypeType, ShapeTreeType } from '@/shared/model/shapetree/enums/expectsType.enum';

export type ContainerShapeTreeShape = {
  id: string; // the url of a node of this shape
  type: ShapeTreeType.ShapeTree;
  expectsType: ExpectsTypeType.Container;
  contains: string;
};

export type ContainerShapeTreeShapeCreateArgs = {
  id?: string | NamedNode; // the url to match or create the node with e.g. 'https://example.com#this', 'https://example.com/profile/card#me'
  type: ShapeTreeType.ShapeTree;
  expectsType: ExpectsTypeType.Container;
  contains: URL | NamedNode;
};

export type ContainerShapeTreeUpdateArgs = Partial<ContainerShapeTreeShapeCreateArgs>;

export enum ContainerShapeTreeContext {
  type = 'rdf:type',
  expectsType = 'st:expectsType',
  contains = 'st:contains',
}

export const containerShapeTree = new Shape<ContainerShapeTreeShape, ContainerShapeTreeShapeCreateArgs>({
  id: 'http://example.com/ContainerShapeTree',
  shape: shapeTreeShex,
  context: ContainerShapeTreeContext,
  type: ShapeTreeType,
});
