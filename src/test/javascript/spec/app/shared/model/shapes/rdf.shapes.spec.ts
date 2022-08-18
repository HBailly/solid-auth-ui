import { term } from '@/shared/model/terms/shapes/term.shapes';
import path from 'path';
import { SolidNodeClient } from 'solid-node-client/dist/esm';

const cwd = process.cwd();
const resources = path.join(cwd, '..', 'files', 'ontologies');

const client = new SolidNodeClient();

describe('Shex Shapes test suite', () => {
  it('should load interop shapes without error', async () => {
    term.fetcher._fetch = client.fetch.bind(client);
    const doc = 'file://' + path.join(resources, 'interop.ttl');

    const terms = await term.findAll({ doc: doc });
    expect(terms.errors).toBeUndefined();
    expect(terms.data).toHaveLength(108);
    console.log(terms);
  });

  it('should load rdf shapes without error', async () => {
    term.fetcher._fetch = client.fetch.bind(client);
    const doc = 'file://' + path.join(resources, 'acl.ttl');

    const terms = await term.findAll({ doc: doc });
    expect(terms.errors).toBeUndefined();
    expect(terms.data).toHaveLength(26);
    console.log(terms);
  });

  it('should load shapetree shapes without error', async () => {
    client.debug = true;
    term.fetcher._fetch = client.fetch.bind(client);
    const doc = 'file://' + path.join(resources, 'shapetree.ttl');

    const terms = await term.findAll({ doc: doc });
    expect(terms.errors).toBeUndefined();
    expect(terms.data).toHaveLength(32);
    console.log(terms);
  });

  it('should load dpv shapes without error', async () => {
    term.fetcher._fetch = client.fetch.bind(client);
    const doc = 'file://' + path.join(resources, 'dpv-purposes.ttl');

    const terms = await term.findAll({ doc: doc });
    expect(terms.errors).toBeUndefined();
    expect(terms.data).toHaveLength(71);
    console.log(terms);
  });
});
