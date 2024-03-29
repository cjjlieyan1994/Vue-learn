Vue.component("tabs",{
	template:"#chidb",
	props:{
		//这里的value是为了可以使用v-model
		value:{
			type:[String,Number]
		}
	},
	data:function(){
		return{
			//用于渲染 tabs 标题
			//因为不能修改 value 所以复制 一份自己维护
			currentValue:this.value,
			navList:[]
		}
	},
	methods:{
		getTabs(){
			//通过遍历子组件 得到所有的pane组件
			return this.$children.filter(function (item){
				return item.$options.name === 'pane';
			});  
		},
		updateNav(){
			this.navList = [];
			//设置对比 this 的引用 在function 回调里 this 指向的并不是 Vue 实例
			var _this = this;
			this.getTabs().forEach(function (pane,index){
				_this.navList.push({
					label:pane.label,
					name:pane.name || index
				});
				//如果没有给pane设置name 默认设置它的索引
				if(!pane.name) pane.name = index;
				//设置当前选中的tab 的索引 
				if(index === 0){
					if(!_this.currentValue){
						_this.currentValue = pane.name || index;
					}
				}
			});
			this.updateStatus();
		},
		updateStatus(){
			var tabs = this.getTabs();
			var _this = this;
			//显示当前选中的tab 对应的pane 组件 隐藏没有选中的
			tabs.forEach(function(tab){
				return tab.show = tab.name === _this.currentValue;
			})
		},
		tabCls(item){
			return [
				'tabs-tab',
				{
					//给当前选中的tab加一个 class
					'tabs-tab-active': item.name === this.currentValue
				}
			]
		},
		//点击 tab 标题触发
		handleChange(index){
			var nav =this.navList[index];
			var name = nav.name;
			//改变当前选中的tab 并触发下面的watch
			this.currentValue = name ;
			//更新value
			this.$emit('input',name);
			//触发一个自定义事件 供父级使用
			this.$emit('on-click',name);
		}
	},
	watch:{
		value:function(val){
			this.currentValue = val;
		},
		currentValue:function(){
			//在当前选中的tab发生变化时 更新 pane 的显示状态
			this.updateStatus()
		}
	}
})