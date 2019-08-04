function isValueNumber (value){
	return (/(^-?[0-9]+\.{1}\d+$)|(^-?[1-9][0-9]*$)|(^-?0{1}$)/).test(value + '')
}

Vue.component('input-number',{
	template:"#chidb",
	props:{
		max:{
			type:Number,
			default:Infinity//正无穷大			
		},
		min:{
			type:Number,
			default:-Infinity
		},
		value:{
			type:Number,
			default:0
		}		
	},
	data:function(){
		return{
			currentValue:this.value
		}
	},
	watch:{
		currentValue:function(val){//监听 currentValue 当 currentValue 改变时，更新value
			this.$emit('input',val);
			this.$emit('on-change',val);
		},
		value:function(val){ //监听 value 知晓 从父组件修改了value
			this.updateValue(val)
		}
	},
	methods:{
		updateValue(val){
			if(val>this.max) val = this.max;
			if(val<this.min) val = this.min;
			this.currentValue = val
		},
		handleDown(){
			if(this.currentValue <= this.min) return;
			this.currentValue -= 1;
		},
		handleUp(){
			if(this.currentValue >= this.max) return;
			this.currentValue += 1;
		},
		handleChange(event){
			var val = event.target.value.trim();//  trim() 方法 去除字符串的头尾空格
			var max = this.max;
			var min = this.min;
			if(isValueNumber(val)){
				val = Number(val);
				this.currentValue = val;
				
				if (val > max){
					this.currentValue = max;
				}else if( val < min){
					this.currentValue = min;
				}
			}else{
				event.target.value = this.currentValue;
			}
		}
	},
	mounted:function(){
		this.updateValue(this.value)
	}
})