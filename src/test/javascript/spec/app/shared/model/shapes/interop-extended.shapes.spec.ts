import path from 'path';
import { SolidNodeClient } from 'solid-node-client/dist/esm';
import { Shape } from 'shex-methods';
import { accessNeedDescription } from '@/shared/model/interop/shapes/accessNeedDescription.shape';
import { agentRegistry } from '@/shared/model/interop/shapes/agentRegistry.shape';
import { accessDescriptionSet } from '@/shared/model/interop/shapes/accessDescriptionSet.shape';
import { accessRequest } from '@/shared/model/interop/shapes/accessRequest.shape';
import { accessNeedGroup } from '@/shared/model/interop/shapes/accessNeedGroup.shape';
import { socialAgent } from '@/shared/model/interop/shapes/socialAgent.shape';
import { applicationRegistration } from '@/shared/model/interop/shapes/applicationRegistration.shape';
import { accessNeedGroupDescription } from '@/shared/model/interop/shapes/accessNeedGroupDescription.shape';
import { accessNeed } from '@/shared/model/interop/shapes/accessNeed.shape';
import { dataRegistration } from '@/shared/model/interop/shapes/dataRegistration.shape';
import { socialAgentRegistration } from '@/shared/model/interop/shapes/socialAgentRegistration.shape';
import { application } from '@/shared/model/interop/shapes/application.shape';
import { registrySet } from '@/shared/model/interop/shapes/registrySet.shape';
import { dataRegistry } from '@/shared/model/interop/shapes/dataRegistry.shape';

const client = new SolidNodeClient();

const cwd = process.cwd();
const resources = path.join(cwd, '..', 'files', 'data-extended');
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

describe('Agent Shex Shapes test suite', () => {
  it('should load application shape without error', async () => {
    const data = await getOne(application, 'https://projectron.example/#id', 'application');

    expect(data.errors).toBeUndefined();
    expect(data.data['applicationName']).toBe('Projectron');

    console.log(data);
  });

  it('should load social agent shape without error', async () => {
    const data = await getOne(socialAgent, 'https://alice.example/#id', 'agents');

    expect(data.errors).toBeUndefined();
    console.log(data);
  });
});

describe('Description Shex Shapes test suite', () => {
  it('should find all accessNeedDescription entities without error', async () => {
    const data = await getAll(accessNeedDescription, 'description-en');

    expect(data.errors).toBeUndefined();
    expect(data.data).toHaveLength(7);
    console.log(data);
  });

  it('should load access need set description shape without error', async () => {
    const data = await getOne(accessDescriptionSet, 'https://projectron.example/needs#access-en', 'description-en');

    expect(data.errors).toBeUndefined();
    console.log(data);
  });

  it('should load access need group description without error', async () => {
    const data = await getOne(accessNeedGroupDescription, 'https://projectron.example/needs#en-need-group-pm', 'description-en');

    expect(data.errors).toBeUndefined();
    console.log(data);
  });

  it('should load access need description without error', async () => {
    const project = await getOne(accessNeedDescription, 'https://projectron.example/needs#en-need-project', 'description-en');

    expect(project.errors).toBeUndefined();
    console.log(project);

    const task = await getOne(accessNeedDescription, 'https://projectron.example/needs#en-need-task', 'description-en');

    expect(task.errors).toBeUndefined();
    console.log(task);
  });
});

describe('Access Needs Shex Shapes test suite', () => {
  it('should load all access need shapes without error', async () => {
    const data = await getAll(accessNeed, 'needs');

    expect(data.errors).toBeUndefined();
    expect(data.data).toHaveLength(7);
    console.log(data);
  });

  it('should load access need group shape without error', async () => {
    const data = await getOne(accessNeedGroup, 'https://projectron.example/needs#need-group-pm', 'needs');

    expect(data.errors).toBeUndefined();
    console.log(data);
  });

  it('should load access need shape without error', async () => {
    const data = await getOne(accessNeed, 'https://projectron.example/needs#need-project', 'needs');

    expect(data.errors).toBeUndefined();
    console.log(data);
  });
});

describe('Request Shex Shapes test suite', () => {
  it('should load request shape without error', async () => {
    const data = await getOne(accessRequest, 'https://alice.example/#request', 'request');

    expect(data.errors).toBeUndefined();
    console.log(data);
  });
});

describe('Registry Shex Shapes test suite', () => {
  it('should load registry set shapes without error', async () => {
    const data = await getAll(registrySet, 'registries');

    expect(data.errors).toBeUndefined();
    expect(data.data).toHaveLength(1);
    console.log(data);
  });

  it('should load data registry shapes without error', async () => {
    const data = await getAll(dataRegistry, 'data-registries');

    expect(data.errors).toBeUndefined();
    expect(data.data).toHaveLength(2);
    console.log(data);
  });

  it('should load data registration shapes without error', async () => {
    const data = await getAll(dataRegistration, 'data-registries');

    expect(data.errors).toBeUndefined();
    expect(data.data).toHaveLength(6);
    console.log(data);
  });

  it('should load agent registry shapes without error', async () => {
    const data = await getAll(agentRegistry, 'agent-registries');

    expect(data.errors).toBeUndefined();
    expect(data.data).toHaveLength(1);
    console.log(data);
  });

  it('should load social agent registration shapes without error', async () => {
    const data = await getAll(socialAgentRegistration, 'agent-registries');

    expect(data.errors).toBeUndefined();
    expect(data.data).toHaveLength(3);
    console.log(data);
  });

  it('should load application registration shapes without error', async () => {
    const data = await getAll(applicationRegistration, 'agent-registries');

    expect(data.errors).toBeUndefined();
    expect(data.data).toHaveLength(2);
    console.log(data);
  });
});
