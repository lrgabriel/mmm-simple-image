# Module: mmm-simple-image
The `mmm-simple-image` module is for MagicMirror. It is a simple way to add an image on the web (like a weather forecast) to your [MagicMirror](https://github.com/MichMich/MagicMirror).
## Using the module

To use this module, add it to the modules array in the `config/config.js` file:
````javascript
modules: [
	{
    module: "mmm-simple-image",
    position: "top_center",
    config: {
        url: "https://your‑site.com/path/to/image.jpg",
        width: "1080px",          // optional – defaults to 1080px
        refreshInterval: 30      // refresh every 30 seconds (change as you wish)
    }
}
]
````

## Configuration options

The following properties can be configured:


<table width="100%">
		<tr>
			<th>Option</th>
			<th width="100%">Description</th>
		</tr>
		<tr>
			<td><code>url</code></td>
			<td>the URL in the iFrame<br>
				<br><b>Example:</b><code>"http:http://example.com/" </code>
				<br><b>Default value:</b> <code>''</code>
			</td>
		</tr>
		<tr>
			<td><code>width</code></td>
			<td>the desired rendering width of the image<br>
				<br><b>Example:</b><code>"200px"</code>
				<br><b>Default value:</b> <code>"1080px"</code>
			</td>
		</tr>

</table>
