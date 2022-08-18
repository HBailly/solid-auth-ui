export interface Wrapper<T> {
  id: string;
  shape;

  wrap(shape: T): Wrapper<T>;

  graphify(store: WrapperStore): void;
}

export class WrapperStore {
  private cache: Map<string, Wrapper<any>> = new Map<string, Wrapper<any>>();

  public save(node: Wrapper<any>) {
    this.cache.set(node.id, node);
  }

  public has(id: string): boolean {
    return this.cache.has(id);
  }

  public get(id: string): unknown {
    return this.cache.get(id) as unknown;
  }

  graphify() {
    console.log('Building graph from cache...');
    this.cache.forEach(node => {
      node.graphify(this);
    });
    console.log('Graph built.');
  }
}
