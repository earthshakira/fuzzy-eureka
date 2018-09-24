<template>
  <div class="about">
    <h1>The game of <a href="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life">Life</a>  </h1>
    The rules are simple:
    <ul>
    	<li>A cell Dies from Underpopulation : Neighbours &lt; 2 </li>
    	<li>A cell Dies from Overpopulation : Neighbours &gt; 3</li>
    	<li>A cell is reproduced : Neighbours = 3</li>
    </ul>
  </div>
</template>

<style type="text/css">
	a {
  color: #42b983;
}
</style>
