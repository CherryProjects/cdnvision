import stringify from './stringify';
import isEmpty from 'lodash/isEmpty';
import Host from '../constants/Host';

export function build(type, options = {}) {
  const { protocol, name, path } = options;
  if (!name) {
    throw new Error('Name is not defined');
  }

  const host = Host[type];
  if (!host) {
    throw new Error(`Host for type: ${type} does not exists`);
  }

  const parts = [host, name];
  if (path) {
    parts.push(encodeURIComponent(path));
    delete options.path;
  }

  const query = !isEmpty(options)
    ? `?${stringify(options)}`
    : '';

  const base = `//${parts.join('/')}${query}`;
  if (protocol) {
    return `${protocol}:${base}`;
  }

  return base;
}
