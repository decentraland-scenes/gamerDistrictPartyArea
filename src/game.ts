import utils from '../node_modules/decentraland-ecs-utils/index'
import {
  farmerTalk,
} from './NPC/dialog'
import { NPC } from './NPC/npc'
import * as ui from '../node_modules/@dcl/ui-utils/index'

let party = new Entity()
party.addComponent(new GLTFShape('models/party_area.glb'))
party.addComponent(
  new Transform({
    position: new Vector3(32, 0, 24),
    rotation: Quaternion.Euler(0, 90, 0),
  })
)
engine.addEntity(party)

let partySwitch: boolean = false

const streamSource = new Entity()
streamSource.addComponent(new Transform({ position: new Vector3(56, 1, 55) }))
let music = new AudioStream(
  'https://icecast.ravepartyradio.org/ravepartyradio-192.mp3'
)
streamSource.addComponent(music)
music.playing = false
engine.addEntity(streamSource)

const MusicTrigger = new Entity()
MusicTrigger.addComponent(new Transform({ position: new Vector3(32, 0, 26) }))

let roofMusicrTriggerBox = new utils.TriggerBoxShape(
  new Vector3(65, 10, 54),
  Vector3.Zero()
)
MusicTrigger.addComponent(
  new utils.TriggerComponent(
    roofMusicrTriggerBox, //shape
    0, //layer
    0, //triggeredByLayer
    null, //onTriggerEnter
    null, //onTriggerExit
    () => {
      partySwitch = true
      musicVideo.playing = true
      music.playing = true
      log('triggered!')
    },
    () => {
      partySwitch = false
      musicVideo.playing = false
      music.playing = false
      //music.playing = false
    },
    false
  )
)
engine.addEntity(MusicTrigger)

const musicVideo = new VideoTexture(
  new VideoClip('https://theuniverse.club/live/consensys/index.m3u8')
)
musicVideo.playing = false

const musicVideoMaterial = new Material()
musicVideoMaterial.albedoTexture = musicVideo
musicVideoMaterial.roughness = 1

const smallCube1 = new Entity()
smallCube1.addComponent(new BoxShape())
smallCube1.addComponent(
  new Transform({
    position: new Vector3(51, 7, 7.5),
    rotation: Quaternion.Euler(45, 0, 45),
    scale: new Vector3(3, 3, 3),
  })
)
smallCube1.addComponent(musicVideoMaterial)
engine.addEntity(smallCube1)

const smallCube2 = new Entity()
smallCube2.addComponent(new BoxShape())
smallCube2.addComponent(
  new Transform({
    position: new Vector3(51, 7, 40.5),
    rotation: Quaternion.Euler(45, 0, 45),
    scale: new Vector3(3, 3, 3),
  })
)
smallCube2.addComponent(musicVideoMaterial)
engine.addEntity(smallCube2)

const smallCube3 = new Entity()
smallCube3.addComponent(new BoxShape())
smallCube3.addComponent(
  new Transform({
    position: new Vector3(12.6, 7, 40.5),
    rotation: Quaternion.Euler(45, 0, 45),
    scale: new Vector3(3, 3, 3),
  })
)
smallCube3.addComponent(musicVideoMaterial)
engine.addEntity(smallCube3)

const smallCube4 = new Entity()
smallCube4.addComponent(new BoxShape())
smallCube4.addComponent(
  new Transform({
    position: new Vector3(12.6, 7, 8),
    rotation: Quaternion.Euler(45, 0, 45),
    scale: new Vector3(3, 3, 3),
  })
)
smallCube4.addComponent(musicVideoMaterial)
engine.addEntity(smallCube4)

class RotatorSystem implements ISystem {
  cubeRotate: Vector3 = new Vector3(0, 0, 1)
  coneRotate: Vector3 = new Vector3(1, 0, 1)

  update(dt: number) {
    if (!partySwitch) {
      return
    }

    const small1Transform = smallCube1.getComponent(Transform)
    small1Transform.rotate(this.cubeRotate, dt * 20)

    const small2Transform = smallCube2.getComponent(Transform)
    small2Transform.rotate(this.cubeRotate, dt * 20)

    const small3Transform = smallCube3.getComponent(Transform)
    small3Transform.rotate(this.cubeRotate, dt * 20)

    const small4Transform = smallCube4.getComponent(Transform)
    small4Transform.rotate(this.cubeRotate, dt * 20)
  }
}

engine.addSystem(new RotatorSystem())

const monster = new Entity()
monster.addComponent(new GLTFShape('models/monster.glb'))
monster.addComponent(
  new Transform({
    position: new Vector3(26.35, 0, 31.23),
    rotation: Quaternion.Euler(0, 145, 0),
  })
)
engine.addEntity(monster)

export let halloweenTheme = new Texture('images/HalloweentAtlas.png')

export let farmer = new NPC(
  {
    position: new Vector3(35, 0.5, 24.24),
    rotation: Quaternion.Euler(0, 90, 0),
  },
  new GLTFShape('models/farmer.glb'),
  () => {
    if (farmer.introduced) return
    farmer.talk(farmerTalk)

    farmer.playAnimation(`Cocky`, true, 1.83)
  },
  'images/portraits/farmer.png',
  4,
  'Weight_Shift',
  true,
  false
)
farmer.dialog = new ui.DialogWindow(
  { path: 'images/portraits/farmer.png' },
  true,
  halloweenTheme
)
farmer.dialog.leftClickIcon.positionX = 340 - 60
farmer.dialog.text.color = Color4.FromHexString('#8DFF34FF')

// Input.instance.subscribe('BUTTON_DOWN', ActionButton.PRIMARY, false, (e) => {
//   console.log(
//     `{ position: new Vector3(`,
//     Camera.instance.position.x,
//     ',',
//     Camera.instance.position.y,
//     ',',
//     Camera.instance.position.z,
//     `),}`
//   )
// })


Input.instance.subscribe('BUTTON_DOWN', ActionButton.PRIMARY, true, (e) => {
  if (e.hit) 
    console.log(
      'POS: ',
      engine.entities[e.hit.entityId].getComponent(Transform)
    )

    console.log(
      `{ position: new Vector3(`,
      Camera.instance.position.x,
      ',',
      Camera.instance.position.y,
      ',',
      Camera.instance.position.z,
      `),}`
    )
  }
})