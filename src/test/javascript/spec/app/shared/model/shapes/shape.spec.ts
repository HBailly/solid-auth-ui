import path from 'path';
import { Shape } from 'shex-methods';
import { SolidNodeClient } from 'solid-node-client/dist/esm';
import { pref } from '@/shared/rdf/rdf.namespace';
import { resourceShapeTree, ResourceShapeTreeShape } from '@/shared/model/shapetree/shapes/resourceShapeTree.shape';
import { containerShapeTree, ContainerShapeTreeShape } from '@/shared/model/shapetree/shapes/containerShapeTree.shape';

const client = new SolidNodeClient();

const cwd = process.cwd();
const resources = path.join(cwd, '..', 'files', 'data-extended');
const target = path.join(cwd, 'target', 'files', 'data-extended');
const ttl_ext = '.ttl';

async function getOne(shape: Shape<any, any>, id: string, filename: string) {
  shape.fetcher._fetch = client.fetch.bind(client);
  const doc = 'file://' + path.join(resources, filename + ttl_ext);
  return await shape.findOne({
    where: { id: id },
    doc: doc,
  });
}

async function getAll(shape: Shape<any, any>, filename: string) {
  shape.fetcher._fetch = client.fetch.bind(client);
  const doc = 'file://' + path.join(resources, filename + ttl_ext);
  return await shape.findAll({
    doc: doc,
  });
}

describe('Shape tree Shapes test suite', () => {
  it('should load resource shape tree shapes without error', async () => {
    const data = await getAll(resourceShapeTree, 'shapes');

    expect(data.errors).toHaveLength(9);
    expect(data.data).toHaveLength(3);
    console.log(data);
  });

  it('should load ProjectTree shapes without error', async () => {
    const data = await getOne(resourceShapeTree, 'http://data.example/shapetrees/pm#ProjectTree', 'shapes');

    expect(data.errors).toBeUndefined();
    const project: ResourceShapeTreeShape = data.data;
    expect(project.references.hasShapeTree).toBeDefined();
  });

  it('should load container shape tree shapes without error', async () => {
    const data = await getAll(containerShapeTree, 'shapes');

    expect(data.errors).toHaveLength(9);
    expect(data.data).toHaveLength(3);
    console.log(data.data);
  });

  it('should load ProjectRegistrationTree shapes without error', async () => {
    const data = await getOne(containerShapeTree, 'http://data.example/shapetrees/pm#ProjectRegistrationTree', 'shapes');

    expect(data.errors).toBeUndefined();
    console.log(data.data);
    const project: ContainerShapeTreeShape = data.data;
    console.log(project.contains);
  });
});
