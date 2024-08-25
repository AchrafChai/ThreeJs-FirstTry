import * as THREE from 'three'
import Experience from '../Experience.js'

export default class Fox
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.time = this.experience.time
        this.debug = this.experience.debug

        // Debug
        if(this.debug.active)
        {
            this.debugFolder = this.debug.ui.addFolder('fox')
        }

        // Resource
        this.resource = this.resources.items.foxModel
        this.resource = this.resources.items.manModel

        this.setModel()
        this.setAnimation()
    }

    setModel()
    {
        this.model = this.resource.scene
        //this.model.scale.set(0.02, 0.02, 0.02)
        this.scene.add(this.model)

        this.model.traverse((child) =>
        {
            if(child instanceof THREE.Mesh)
            {
                child.castShadow = true
            }
        })
    }

    setAnimation()
    {
        this.animation = {}
        
        // Mixer
        this.animation.mixer = new THREE.AnimationMixer(this.model)
        
        // Actions
        this.animation.actions = {}
        
        this.animation.actions.dance = this.animation.mixer.clipAction(this.resource.animations[0])
        
        this.animation.actions.current = this.animation.actions.dance

        var audio = new Audio('chabi.mp3');
        window.addEventListener("click", () => {
            this.animation.actions.current.play()
            audio.play();
        })
    }

    update()
    {
        this.animation.mixer.update(this.time.delta * 0.001)
    }
}