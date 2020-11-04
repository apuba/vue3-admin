import store from '@/store/index';

export function hotUnregisterModule(name: string) {
  if (!name) return;
  console.log('store', store)
  if ((store.state as any)[name]) {
    store.unregisterModule(name);
  }
}
