<template>
  <div class="home">
    <div class="cellContainer" :style="{'width':minWidth}" style="overlow-x:scroll">
    	<div class="gridRow" v-for="row in cell">
    		<Cell v-for="item in row"  :key="item" :ref="item" @click.native="cellClick(item)" />
    	</div>
    </div>
    <button @click="tick()">Next Iteration</button>
    <button @click="keepTicking()" :class="{btnActive:timer}">Play/Pause</button>
    <button @click="faster()">faster</button>
    <span>{{interval}}ms </span>
    <button @click="slower()">slower</button>
    <br>
    <i>Not Responsive, refresh to fill page</i>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Cell from '@/components/Cell.vue'; // @ is an alias to /src

@Component({
  components: {
    Cell
  },
})
export default class Home extends Vue {	  		
private cell = [[]];
private timer:any = null;
private interval = 500;
private minWidth:string = '';
tick(){
	let status = this.getStatus();
	this.updateStatus(status);
}

faster(){
	
	if(this.interval>100){
		this.interval-=100;
	}
	this.clearInterval();
	this.keepTicking();
}

slower(){
	this.interval+=100;
	this.clearInterval();
	this.keepTicking();
}

clearInterval(){
	clearInterval(this.timer);
	this.timer = null;
}

keepTicking(){
	if(this.timer){
		this.clearInterval();
	}else{
		this.timer = setInterval(this.tick,this.interval);
	}
}
getStatus(){
	let status:boolean[][] = Object.assign([],this.cell);
	for (var i = 0; i < status.length; i++) {
		status[i] = Object.assign([],this.cell[i]);
		for (var j= 0; j < status[i].length;j++) {
			status[i][j] = this.getCell(this.cell[i][j]).isAlive();
		}
	}
	return status;
}

updateStatus(status:any){
	for(let i=0;i<status.length ;i++){
		for(let j=1;j<status[i].length ;j++){
			let neighbours = this.getAliveNeighbours(status,i,j,status.length,status[i].length);
			if(status[i][j]){
				if(neighbours<2 || neighbours > 3){
					this.kill(i,j);
				}else{
					this.makeAlive(i,j);
				}
			}else if (neighbours == 3){
				this.makeAlive(i,j);
			}
		}
	}

}

getAliveNeighbours(status:any,r:number,c:number,rmax:number,cmax:number){
	let alive = 0;
	for(let i=-1;i<=1;i++){
		for(let j=-1;j<=1;j++){
			let x = r+i;
			let y = c+j;

			if(x < 0 || y < 0 || x>=rmax || y>=cmax)
				continue;

			if(i==0 && j == 0)
				continue;

			if(status[x][y])
				alive++;
		}
	}
	return alive;
}

cellClick (ref:string): void {
	this.getCell(ref).toggle();
}

makeAlive(x:number,y:number):void{
	this.getCell(this.cell[x][y]).ressurect();
}

kill(x:number,y:number):void{
	this.getCell(this.cell[x][y]).kill();
}

getCell(ref:string): Cell{
	let item = this.$refs[ref] as any;
	return item[0] as Cell;
}

data(){
	this.minWidth = ''+(window.innerWidth) + 'px';
  	let rows = (window.innerHeight - 200)/15;
  	let cols = (window.innerWidth - 100)/15;
	let cell = [];
	for(let i =0;i<rows;i++){
		let row = [];
		for(let j =0;j<cols;j++)
			row.push(this.getIndexRef(i,j));
		cell.push(row);	
	}
	return {
		cell:cell
	}
}

getIndexRef(i:Number,j:Number):string{
	let rowIndex = ''+i;
	let colIndex = ''+j;
	rowIndex = rowIndex.padStart(5, '0');
	colIndex = colIndex.padStart(5, '0');
	return 'cell'+rowIndex+colIndex;
}
}

</script>


<style scoped>
	.gridRow{
		line-height: 10px;

	}
.btnActive{
	background-color: #2f875f;
}
	button{
 background-color: #42b983; 
 color: white;
 border: none;
 border-radius: 4px;
 margin: 10px;
}
</style>