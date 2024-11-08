// input.onButtonPressed(Button.B, function () {
//     y = Math.min(y + 10, 100)
// })
// let y = 0
// const app = new microcode.App();
// const calc = (arg0: microcode.GraphableFunction) => {
//     app.popScene()
//     app.pushScene(new microcode.LiveDataViewer(app, [arg0]))
// }
// const gf = new microcode.GraphableFunction((x) => y)
// const w = new microcode.Window({
//     app,
//     components: [
//         new microcode.GUIBox({
//             alignment: microcode.GUIComponentAlignment.TOP,
//             xOffset: 10,
//             title: "Hello"
//         }),
//         // new microcode.GUIBox({
//         //     alignment: microcode.GUIComponentAlignment.LEFT,
//         //     xScaling: 0.8,
//         //     yScaling: 0.8,
//         //     colour: 4
//         // }),
//         // new microcode.GUISlider({
//         //     alignment: microcode.GUIComponentAlignment.LEFT,
//         //     xScaling: 0.8,
//         //     yScaling: 0.8,
//         //     colour: 4
//         // }),
//         // new microcode.GUIGraph({
//         //     alignment: microcode.GUIComponentAlignment.RIGHT,
//         //     graphableFns: [gf],
//         //     xOffset: -5,
//         //     yOffset: 0,
//         //     xScaling: 1,
//         //     yScaling: 1,
//         //     colour: 6
//         // }),
//         // new microcode.GUIBox({
//         //     alignment: microcode.GUIComponentAlignment.BOT,
//         //     xOffset: 0,
//         //     yOffset: 0,
//         //     xScaling: 0.6,
//         //     yScaling: 0.3,
//         //     colour: 7
//         // })
//     ]
// });
// app.pushScene(w)

const app = new microcode.App();



class A {
    public buttons: microcode.Button[]
    private bounds: microcode.Bounds
    private colour: number;

    constructor(bounds: microcode.Bounds, colour: number, buttons: microcode.Button[]) {
        this.bounds = bounds
        this.colour = colour
        this.buttons = buttons
    }

    draw() {
        this.bounds.fillRect(this.colour)
    }
}


class B extends microcode.CursorScene {
    private components: A[]
    private componentIndex: number

    constructor(app: microcode.App) {
        super(app, new microcode.GridNavigator(1, 1))
        this.components = []
        this.componentIndex = 0
    }

    startup() {
        super.startup()

        input.onButtonPressed(Button.A, function () {
            this.componentIndex = (this.componentIndex + 1) % 2
            // this.navigator.clear()
            this.navigator = new microcode.GridNavigator(1, 1)
            this.navigator.addButtons(this.components[this.componentIndex])
        })

        this.components.push(
            new A(
                new microcode.Bounds({
                    width: screen().width / 2,
                    height: screen().height / 2,
                    left: 0,
                    top: 0
                }),
                6,
                [
                    new microcode.Button({
                        icon: "hi",
                        x: -30,
                        y: -30
                    })
                ]
            )
        )
        this.components.push(
            new A(
                new microcode.Bounds({
                    width: screen().width / 2,
                    height: screen().height / 2,
                    left: -screen().width / 2,
                    top: -screen().height / 2
                }),
                5,
                [
                    new microcode.Button({
                        icon: "yo",
                        x: -30,
                        y: 0
                    })
                ]
            )
        )

        // new microcode.Button({
        //     icon: "wow",
        //     x: -30,
        //     y: -30
        // })

        this.navigator.addButtons(
            this.components[this.componentIndex].buttons
        )
    }

    draw() {
        screen().fill(12)

        this.components.forEach(comp => comp.draw())

        super.draw()
    }
}


app.pushScene(new B(app))