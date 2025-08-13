import type {View} from "rune-ts";

// @on('click') 용 시그니처
function on<K extends keyof HTMLElementEventMap>(
  eventType: K
): <T extends (event: HTMLElementEventMap[K]) => void>(
  target: View,
  propertyKey: string,
  descriptor: TypedPropertyDescriptor<T>
) => void;

// @on(Toggled) 용 시그니처
function on<E extends new (...args: any[]) => Event>(
  EventClass: E
): <T extends (event: InstanceType<E>) => void>( // InstanceType<E>로 E의 인스턴스 타입 추출
  view: View,
  propertyKey: string,
  descriptor: TypedPropertyDescriptor<T>
) => void;

function on(eventType: any) {
  return function <T extends (e: any) => void>(
    viewPrototype: any,
    propertyKey: string,
    descriptor: TypedPropertyDescriptor<T> // T는 데코레이터를 붙인 메서드의 타입
  ) {
    const method: T = descriptor.value!;
    const onRender: () => void = viewPrototype.onRender;
    viewPrototype.onRender = function() {
      this.addEventListener(eventType, method);
      onRender.call(this);
    }
  };
}

export { on };