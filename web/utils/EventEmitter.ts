interface EventsMap {
    [event: string]: readonly unknown[];
}

export type UnsubscribeFn = () => void;

export class EventEmitter<Events extends EventsMap> {
    private events: Partial<{
        [K in keyof Events]: Array<(...args: Events[K]) => void>;
    }> = {};

    /**
     * Calls each of the listeners registered for a given event.
     *
     * ```js
     * emitter.emit('tick', tickType, tickDuration)
     * ```
     *
     * @param event The event name.
     * @param args The arguments for listeners.
     */
    public emit<K extends keyof Events>(this: this, event: K, ...args: Events[K]): void {
        let callbacks = this.events[event] || [];
        for (let i = 0, length = callbacks.length; i < length; i++) {
            callbacks[i]!(...args);
        }
    }

    /**
     * Add a listener for a given event.
     *
     * ```js
     * const unbind = emitter.on('tick', (tickType, tickDuration) => {
     *   count += 1
     * })
     *
     * disable () {
     *   unbind()
     * }
     * ```
     *
     * @param event The event name.
     * @param cb The listener function.
     * @returns Unbind listener from event.
     */
    public on<K extends keyof Events>(this: this, event: K, cb: (...args: Events[K]) => void): UnsubscribeFn {
        this.events[event]?.push(cb) || (this.events[event] = [cb]);

        return () => {
            this.events[event] = this.events[event]?.filter((i) => cb !== i);
        };
    }

    public size<K extends keyof Events>(this: this, event: K): number {
        return this.events[event]?.length ?? 0;
    }
}
