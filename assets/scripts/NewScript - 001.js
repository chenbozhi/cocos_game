// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
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
	
	onKeyDown (event) {
		// set a flag when key pressed
		switch(event.keyCode) {
			case cc.macro.KEY.a:
				this.accLeft = true;
				break;
			case cc.macro.KEY.d:
				this.accRight = true;
				break;
			case cc.macro.KEY.w:
				this.accUp = true;
				break;
			case cc.macro.KEY.s:
				this.accDown = true;
				break;
		}
	},

	onKeyUp (event) {
		// unset a flag when key released
		switch(event.keyCode) {
			case cc.macro.KEY.a:
				this.accLeft = false;
				break;
			case cc.macro.KEY.d:
				this.accRight = false;
				break;
			case cc.macro.KEY.w:
				this.accUp = false;
				break;
			case cc.macro.KEY.s:
				this.accDown = false;
				break;
		}
	},

	onLoad: function () {

		// 加速度方向开关
		this.accLeft = false;
		this.accRight = false;
		this.accUp = false;
		this.accDown = false;
		// 主角当前水平方向速度

		// 初始化键盘输入监听
		cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
		cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);   
	},

	onDestroy () {
		// 取消键盘输入监听
		cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
		cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
	},

	start () {

	},

	update: function (dt) {
		// 根据当前加速度方向每帧更新速度
		if (this.accLeft) {
			this.node.x -= 5;
		} else if (this.accRight) {
			this.node.x += 5;
		}
		if (this.accUp) {
			this.node.y += 5;
		} else if (this.accDown) {
			this.node.y -= 5;
		}
	},
});
