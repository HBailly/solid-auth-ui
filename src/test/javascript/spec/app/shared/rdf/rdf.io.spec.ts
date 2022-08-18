import { SolidNodeClient } from 'solid-node-client/dist/esm';
import { pref } from '@/shared/rdf/rdf.namespace';
import path from 'path';
import { Shape } from 'shex-methods';
import { application, ApplicationShapeType } from '@/shared/model/interop/shapes/application.shape';

const client = new SolidNodeClient();

const cwd = process.cwd();
const resources = path.join(cwd, 'target', 'files', 'ttl');
const ttl_ext = '.ttl';

async function getOne(shape: Shape<any, any>, id: string, filename: string) {
  const doc = 'file://' + path.join(resources, filename + ttl_ext);
  return await shape.findOne({
    where: { id: id },
    doc: doc,
  });
}

async function getAll(shape: Shape<any, any>, filename: string) {
  const doc = 'file://' + path.join(resources, filename + ttl_ext);
  return await shape.findAll({
    doc: doc,
  });
}

describe('Shex Objects test suite', () => {
  it('should read application shape without error', async () => {
    application.fetcher._fetch = client.fetch.bind(client);

    const doc = 'file://' + path.join(resources, 'test' + ttl_ext);
    const appli = await application.create({
      doc: doc,
      data: {
        id: pref.acme + 'test',
        type: ApplicationShapeType.Application,
        applicationAuthor: new URL(pref.acme + 'id'),
        applicationName: 'Test',
        applicationDescription: 'a test application',
        applicationThumbnail: new URL(pref.acme + 'thumbnail.svg'),
        hasAccessNeedGroup: new URL(pref.acme + 'need-group-pm'),
      },
    });
    expect(appli).toBeDefined();
  });

  it('should write application shape without error', async () => {
    application.fetcher._fetch = client.fetch.bind(client);

    const doc = 'file://' + path.join(resources, 'test' + ttl_ext);
    await application.create({
      doc: doc,
      data: {
        id: pref.acme + 'test',
        type: ApplicationShapeType.Application,
        applicationAuthor: new URL(pref.acme + 'id'),
        applicationName: 'Test',
        applicationDescription: 'a test application',
        applicationThumbnail: new URL(pref.acme + 'thumbnail.svg'),
        hasAccessNeedGroup: new URL(pref.acme + 'need-group-pm'),
      },
    });

    const file = getOne(application, pref.acme + 'test', 'test');
    expect(file).toBeDefined();
    console.log(file);
  });
});
