import { Shape } from 'shex-methods';

// TODO: fix URL
export const baseUrl = 'https://solid-auth-ui.computing.dcu.ie/rdf/';

// export const baseUrl = 'http://localhost:8080/rdf/';

export enum TurtleType {
  ONTOLOGY = 'ontology',
  BASE = 'data',
  DATA = 'data-1',
  DATA_EXT = 'data-2',
  DATA_SUPER_EXT = 'data-3',
  AUTH = 'auth',
}

export async function findOne(shape: Shape<any, any>, id: string, type: TurtleType, filename: string) {
  const url = baseUrl + type + '?name=' + filename;
  console.log('Fetching [%s] in [ %s ]', id, url);
  return shape.findOne({
    where: { id: id },
    doc: url,
  });
}

export async function findAll(shape: Shape<any, any>, type: TurtleType, filename: string) {
  const url = baseUrl + type + '/' + filename;
  console.log('Fetching all from [ %s ]', url);
  return shape.findAll({
    doc: url,
  });
}
