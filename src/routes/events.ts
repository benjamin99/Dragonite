import {Event} from '../models/Events';

export function create(title: string, content: string): any {
  return new Event({
    title: title,
    content: content
  });
};
