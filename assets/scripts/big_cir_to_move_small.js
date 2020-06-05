// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
		
		//转动盘的小白球
		SmallMoveCir: {
			default: null,
			type: cc.Node
		},
		
		//玩家控制的精灵
		spiritMain: {
			default: null,
			type: cc.Node
		},
		
		speedSin: 0,
		speedCos: 0,
		selfDistance: 0,
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

	//触摸开始
	on_touch_start(t){
		var pos = this.node.convertToNodeSpaceAR(t.getLocation());  //触摸的是世界坐标，要转化为本地坐标。
		this.SmallMoveCir.x = pos.x;
		this.SmallMoveCir.y = pos.y; 
		
		var distance = Math.sqrt(Math.pow(pos.x, 2) + Math.pow(pos.y, 2));  //先计算距离
		var selfDistance = this.node.width / 2;  //获取半径
		
		this.speedSin = pos.y / distance;   //单位向量
		this.speedCos = pos.x / distance;
	},
	
	//内离开和外离开
	on_touch_leave(t){
		//小球还原
		this.SmallMoveCir.x = 0;
		this.SmallMoveCir.y = 0; 
		
		//
		this.speedSin = 0;
		this.speedCos = 0;
	},
   
   //触摸移动
	on_touch_move(t){
	    	//定义一个pos变量存储当前触摸点的位置
	    	var pos = this.node.convertToNodeSpaceAR(t.getLocation());  //触摸的是世界坐标，要转化为本地坐标。
			var distance = Math.sqrt(Math.pow(pos.x, 2) + Math.pow(pos.y, 2));  //先计算距离
			
			this.speedSin = pos.y / distance;   //单位向量
			this.speedCos = pos.x / distance;
			
			if(distance < this.selfDistance){
				this.SmallMoveCir.x = pos.x;
				this.SmallMoveCir.y = pos.y;
			}
			else{
				this.SmallMoveCir.x = this.selfDistance * this.speedCos;
				this.SmallMoveCir.y = this.selfDistance * this.speedSin;
			}
			//console.log();
	},
	
	
    onLoad () {
		//初始化数据
		this.selfDistance = this.node.width / 2;  //获取半径
		
		
		//加载事件监听
		this.node.on(cc.Node.EventType.TOUCH_START, this.on_touch_start, this);  //触摸开始
		this.node.on(cc.Node.EventType.TOUCH_MOVE, this.on_touch_move, this);   //触摸移动
		this.node.on(cc.Node.EventType.TOUCH_END, this.on_touch_leave, this);   //触摸区域内离开
		this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.on_touch_leave, this);   //触摸区域外离开
	},
	
	onDestroy () {
		
		//销毁事件监听
		this.node.off(cc.Node.EventType.TOUCH_START, this.on_touch_start, this);   //触摸开始
		this.node.off(cc.Node.EventType.TOUCH_MOVE, this.on_touch_move, this);   //触摸移动
		this.node.off(cc.Node.EventType.TOUCH_END, this.on_touch_leave, this);   //触摸区域内离开
		this.node.off(cc.Node.EventType.TOUCH_CANCEL, this.on_touch_leave, this);    //触摸区域外离开
	},

    start () {

    },

    update (dt) {
		if(this.speedCos != 0 && this.speedSin != 0){
			//移动精灵
			this.spiritMain.x += 3 * this.speedCos;
			this.spiritMain.y += 3 * this.speedSin;
		}
	},
});
