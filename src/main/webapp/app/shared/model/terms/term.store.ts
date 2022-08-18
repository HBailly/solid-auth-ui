import { TermShape } from '@/shared/model/terms/shapes/term.shapes';
import { pref } from '@/shared/rdf/rdf.namespace';

const defaultTerm: TermShape = { id: undefined, type: undefined, label: '', comment: '' };

export class TermStore {
  public prefixes = pref;
  private cache: Map<string, TermShape> = new Map<string, TermShape>();

  public save(term: TermShape) {
    this.cache.set(term.id, term);
  }

  public has(id: string): boolean {
    return this.cache.has(id);
  }

  public get(id: string) {
    const term = this.cache.get(id);
    if (term) {
      return term;
    } else {
      console.log('Term not found [ %s ]', id);
      return defaultTerm;
    }
  }

  getAll(clazz: string, subClass?: string): TermShape[] {
    const entities: Array<TermShape> = [];
    this.cache.forEach(entity => {
      if (entity.type == clazz) {
        if (!subClass || subClass == entity.subClassOf) {
          entities.push(entity);
        }
      }
    });
    return entities;
  }
}

export const termStore = new TermStore();
