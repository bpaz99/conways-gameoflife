import {bridge} from "./presets/bridge"
import {blinker} from "./presets/blinker"
import {pulsar} from "./presets/pulsar"
import {tumbler} from "./presets/tumbler"

export const presets=[
    {
        name:"Tumbler",
        grid: tumbler,
        src:"./presets/tumbler.gif"
    },
    {
        name:"Pulsar",
        grid: pulsar,
        src:"./presets/pulsar.gif"
    },
    {
        name:"Blinker Period 2",
        grid: blinker,
        src:"./presets/blinker.gif"
    },
    {
        name:"Bridge",
        grid: bridge,
        src:"./presets/bridge.jpg"
    },

]