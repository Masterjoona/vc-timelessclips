/*
 * Vencord, a Discord client mod
 * Copyright (c) 2024 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { definePluginSettings } from "@api/Settings";
import { Devs } from "@utils/constants";
import definePlugin, { makeRange, OptionType } from "@utils/types";

const settings = definePluginSettings({
    clipLength: {
        description: "The clip length to be added (in minutes)",
        type: OptionType.SLIDER,
        markers: makeRange(3, 30, 1),
        default: 5,
        stickToMarkers: true,
    },
});

export default definePlugin({
    name: "TimelessClips",
    authors: [Devs.Joona],
    description: "Add a your own clip length",
    patches: [
        {
            find: '"Save clip keybind unset"',
            replacement: {
                match: /MINUTES_2.+?(label:.+?count:).+?]/,
                replace: "$&.concat({value:$self.getClipLength(true),$1$self.getClipLength(false)})})"
            }
        },
    ],
    settings,
    getClipLength(millis: boolean) {
        const minutes = settings.store.clipLength;
        return millis ? minutes * 6e4 : minutes;
    }
});
