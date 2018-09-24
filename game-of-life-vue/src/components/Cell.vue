<template>
  <div class="cell" :class="{live:alive}"> 
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Cell extends Vue {
  public alive: boolean = false;

  public toggle(): void{
    this.alive = !this.alive;
    console.log(this.alive);
  }

  public isAlive():boolean {
    return this.alive;
  }

  public isDead():boolean{
    return !this.alive;
  }

  public ressurect(): void{
    this.alive = true;
  }

  public kill(): void {
    this.alive = false;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.cell {
  height: 15px;
  width: 15px;
  border: 1px solid #ccc;
  display: inline-block;
}

.live {
  background-color: #42b983;
}
</style>
