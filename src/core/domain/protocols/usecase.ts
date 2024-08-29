export abstract class UseCase<T, K> {
  abstract perform: (account: T) => Promise<K>;
}
