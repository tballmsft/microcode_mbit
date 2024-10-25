namespace microcode {
    // Auto-save slot
    export const SAVESLOT_AUTO = "sa"

    export interface SavedState {
        progdef: any
        version?: string
    }

    /**
     * If an Arcade Shield is not present when starting MicroData that Microbit will enter DistributedLoggingProtocol.
     *      It will show a :) on its LEDs and try to become a Target - where it will receive radio commands from a Commander Microbit (one with an Arcade Shield)
     */
    export class App {
        sceneManager: SceneManager 

        constructor() {
            // One interval delay to ensure all static constructors have executed.
            basic.pause(10)
            reportEvent("app.start")

            this.sceneManager = new SceneManager()
            // datalogger.deleteLog()
            datalogger.includeTimestamp(FlashLogTimeStampFormat.None)

            // for (let i = 0; i < 100; i++) {
            //     // datalogger.log(
            //     //     datalogger.createCV("Sensor", "Accel. X"),
            //     //     datalogger.createCV("Time (ms)", i * 1000),
            //     //     datalogger.createCV("Reading", Math.min(i * 1000, 2048)),
            //     //     datalogger.createCV("Event", "N/A")
            //     // )

            //     datalogger.log(
            //         datalogger.createCV("Sensor", "Accel. Y"),
            //         datalogger.createCV("Time (ms)", i * 100),
            //         datalogger.createCV("Reading", Math.min(Math.cos(i / 10) * 2035, 2035)),
            //         datalogger.createCV("Event", "N/A")
            //     )

            //     basic.pause(5)

            //     datalogger.log(
            //         datalogger.createCV("Sensor", "Accel. Z"),
            //         datalogger.createCV("Time (ms)", i * 100),
            //         datalogger.createCV("Reading", Math.min(Math.sin(i / 10) * 2035, 2035)),
            //         datalogger.createCV("Event", "N/A")
            //     )
            //     basic.pause(5)
            // }


            // // basic.showNumber(datalogger.getNumberOfRows())
            // this.pushScene(new GraphGenerator(this))

            if (shieldhelpers.shieldPresent())
                this.pushScene(new Home(this))
            else
                new DistributedLoggingProtocol(this, false);
        }

        public pushScene(scene: Scene) {
            this.sceneManager.pushScene(scene)
        }

        public popScene() {
            this.sceneManager.popScene()
        }
    }
}
