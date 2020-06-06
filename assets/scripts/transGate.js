// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,
	
    properties: {
		distance: 30,   //如果相距30以内就触发新场景
		
		spirit: {
			default: null,
			type: cc.Node
		},
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    update (dt) {
		/*
		if(Math.sqrt(Math.pow(this.node.x - this.spirit.x) + Math.pow(this.node.y - this.spirit.y)) <= this.distance){
			console.log('here');
		}
		*/
	   if( Math.sqrt(Math.pow(this.node.x - this.spirit.x, 2) + Math.pow(this.node.y - this.spirit.y, 2)) <= this.distance )
	   {
		   cc.director.loadScene("Game");
	   }
	},
});
