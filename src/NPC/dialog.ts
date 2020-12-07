import { Dialog } from '../../node_modules/@dcl/ui-utils/utils/types'

import { farmer } from '../game'

let poapSent = false

let fillInCanvas: UIInputText

let submittedText: string = ''

export let farmerTalk: Dialog[] = [
  {
    text: `Hey mate, welcome to Gamer District!`,
    triggeredByNext: () => {
      farmer.playAnimation(`Acknowledging`, true, 3.03)
    },
  },
  {
    text: `Hope you enjoy the games and the music as much as my friend here does!`,
    triggeredByNext: () => {
      farmer.playAnimation(`Happy Hand Gesture`, true, 2.97)
    }
  },
  {
    text: `Look around the venue, you'll find new games and competitions going on at all times. You might get some rewards! Cheers`,
    triggeredByNext: () => {
      farmer.playAnimation(`Relieved`, true, 2.97)
    },
    isEndOfDialog: true,
  },
]