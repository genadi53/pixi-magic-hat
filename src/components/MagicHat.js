import { Container, Sprite, Texture, Text } from 'pixi.js';
import gsap from 'gsap/all';
import { random } from '../core/utils';

export default class MagicHat extends Container{
    constructor(){
        super();
        this._item = null;
        this._body = null;
        this.name = 'magic-hat';

        this.createItem();
        this.createBody();
        this._body.on('click', () => this.showEmoji());
    }

    /**
     *  @description Creates the hat 
     *  @private
     */
    createBody(){
        this._body = new Sprite(Texture.from('hat'));
        this._body.x = 0;
        this._body.y = 100;
        this._body.anchor.set(0.5);

        this._body.interactive = true;
        this._body.buttonMode = true;

        this.addChild(this._body);
    }


    /**
     *  @description Creates a Text object and its mask
     *  @private
     */
    createItem(){
        this._item = new Text('', { fontSize: 200 });
        this._item.y = 0;
        this._item.x = 0;
        this._item.anchor.set(0.5);
        this._item.alpha = 0;

        const mask = new Sprite(Texture.from('hatMask'));
        mask.x = 0;
        mask.y = -50;
        mask.anchor.set(0.5);

        this._item.mask = mask;
        this._item.addChild(mask);
        
        this.addChild(this._item);
    }

    /**
     *  @description Sets the text to random emoji and creates the animaton for its appearance
     */
    showEmoji(){
        const animation =  gsap.timeline();
        const emojis = ['😀','😘','🥶', '🎃','💩','👽','🥳'];

        this._item.text = emojis[Math.floor(random(0,emojis.length))];
        
        animation
            .to(this._body.scale, { y:1.1, x:1.1, duration: 0.1, yoyo: true, repeat: 1})
            .fromTo(this._item, {y: "50"}, {y: "-250", alpha: 1, ease: "back.out(3)"}, "<");   
    }
    
}