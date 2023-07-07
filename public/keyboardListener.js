export default function createKeyboardListener(document) {

    const state = {
        observers: []
    };

    function subscribe(observerFunction) {
        state.observers.push(observerFunction);
    }

    function notify(command) {
        for (const observerFunction of state.observers) {
            observerFunction(command);
        }
    }

    document.addEventListener('keydown', handleKeyDown);

    function handleKeyDown(event) {
        const keyPressed = event.key;

        const command = {
            playerId: 0,
            keyPressed
        };

        notify(command);
    }

    return { subscribe };
}
