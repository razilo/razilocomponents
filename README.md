# Razilo Components


__Browser Support__ - IE9+, Chrome, FF, Safari, Opera


Razilo Components are a set of custom web components, aimed at simplifying the development of web sites/applications with a set of tools to allow you to do things such as icons, pagination, page and menu setup, routing etc. They consist of several sets of web components that offer types of functionality like structure, control, overlay etc. They can be used as simply as adding the component import (.html) or the group import. You can either import in the base index.html linked dependancy file using html caching and async the loading, or you can use the single vulcanized import, again, all usable with the import async attribute. Once you have imported the components, you will be able to use the new custom element wherever and whenever you like in your html.

The web components are not built on top of any framework, they are built using a custom razilo component helper library Razilo Component [https://github.com/smiffy6969/razilocomponent], an ES6 compiled tool using native JS and requiring a few polyfills such as webcomponentsjs [https://github.com/webcomponents/webcomponentsjs] for polyfilling support for web components and promise polyfill [https://github.com/taylorhakes/promise-polyfill].

The web components can be used with vanilla JS, jQuery, or used with frameworks such as angularJS, Polymer or X-tags as they satisfy their own needs with the helper Razilo Component .


## Installation  


It is best to install the components via npm in order to satisfy any dependencies, in such cases where you wish to install manually, I suggest you take a peek at the **package.json** file to satisfy dependences listed under the dependencies section manually. Please ensure when installing manually, that correct directory structure is adhered to as per [github](https://github.com) (as the dependencies are structured on github), with all components being placed in a shared folder (called node_modules).


```
npm install razilocomponents
```


## Setup


In order to use the web components, all you need to do is add in hte requirement for Razilo Component and the Razilo Components Import, thats it. Your html file could look like this.


```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
		<meta name="description" content="Razilo Components">
		<title>Razilo Components</title>

		<link rel="shortcut icon" href="assets/favicon.ico" type="image/x-icon"/>

		<script type="text/javascript" src="/node_modules/razilocomponent/build/razilocomponent.min.js"></script>
		<link rel="import" href="/node_modules/razilocomponents/index.html" async/>
	</head>
	<body>
		<razilo-icon name="refresh" spin></razilo-icon>
	</body>
</html>
```

Three things to note here...

First we pulled in the Razilo Component dependency from build, now you can build your own app js file in es6, add razilo component as an import and build from this, adding that in above instead. Benefits to this are the ability to build in other es6 modules too. So Razilo Component is an ES6 module, we just offer a built file as it needs to be built to global variable RaziloComponent. See this project for more on this.

Second we imported the actual web components from root of the node modules project. This will run the source files directly by chaining imports for each web component as well as any dependencies they need. This will cause a lots of requests for html files (which are all cached), this can be good and bad, good for dev as we do not have to keep building when developing. Bad as its lots of requests. It is up to you the way you go, run this way in production (which will load in what it needs when it needs it, and do this from cache), or import the build file __index.vulc.html__ which will pull in all web components in a single call regardless of what is needed.

Third, we used the async attribute on the import to defer importing it, doing this out of synch with teh dom/load process. This offers decoupling, don't worry all components will work fine, they will be injected once ready. This can cause a FOUC to happen, you should prevent this using a cloaking technique.

So thats enough to get you going, a better way to approach this would be to create an application component yourself, and let that pull in the dep for the components...


__index.html__

```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
		<meta name="description" content="Razilo Components">
		<title>Razilo Components</title>

		<!-- Add cloak to ensure applied before page shown -->
		<style>*[cloak] { display: block; opacity: 0; -webkit-transition: opacity 0.5s ease-in-out; -moz-transition: opacity 0.5s ease-in-out; transition: opacity 0.5s ease-in-out; } *[uncloak] { opacity: 1; }</style>

		<link rel="shortcut icon" href="assets/favicon.ico" type="image/x-icon"/>

		<script type="text/javascript" src="/node_modules/razilocomponent/build/razilocomponent.min.js"></script>
		<link rel="import" href="/assets/app.html" async/>
	</head>
	<body>
		<demo-app cloak></demo-app>
	</body>
</html>
```


You could now create a custom component called demo app, and add the Razilo Components dep in that file, you could even vulcanize from this, and substitute the import for that.


__/app/demo-app.html__

```html
<!--
* demo-app - Simple single page demo app start point
-->

<!-- DEPENDANCIES -->
<link rel="import" href="/node_modules/razilocomponents/index.html" />

<!-- STYLE - Encapsulate all css to tag name -->
<style>
	demo-app { margin: 0; padding: 0; display: block; }
</style>

<!-- TEMPLATE -->
<template id="demo-app">
	<razilo-icon name="refresh" spin></razilo-icon>
	<p bind-text="test"></p>
</template>

<!-- LOGIC -->
<script>
	new RaziloComponent('demo-app', {
		test: 'Hello',

		attached: function () {
			this.getHost().setAttribute('uncloak', '');
		}
	});
</script>
```

We have now creeted a demo app, putting deps in that (we used a razilo we component called razilo-icon, so we added the components import here) we also set an attached function on it to uncloak the demo-app cloak to stop FOUC.


As you can see, we can use the Razilo Component helper to create our own mini components, great for modularising your app into smaller apps, these can even be pulled in using razilo-partial to load stuff on the fly to enable us to use routing in an app with razilo-route. It is up to you how far you go, at it's simplest, these web components can be used on their own or with jquery, angular etc or you can use the Razilo Component helper as the basic start point for a webcomponent, binding solution.


# Usage


Using the web components is as simple as writing HTML, all the components come with there own logic and style and deps loaded in, with all access and usage being through the attributes or the 'razilobind' property on the element (yes we have binding, see razilobind). The two exceptions to this rule are element.value and element.model both which are mapped to the element root for ease. Razilo Components not designed to be used with other web component frameworks, however they will function just fine in any environment that does not apply any shadow dom to its host element (as styling logic will not bleed in). This is due to limitations with polyfills for shadow dom and the lack of native shadow dom support at present. We structure all style and encapsulate to tag name anyway, so this will need to be alloud to bleed into the shadow dom.

For details on how to use the web components, please see the components.razilo.net demo site.

The components are split into groups, with a extended components having a name that matches a current html element such as razilo-button (extends button) razilo-insert (is a custom element). Custom elements are used as any other html element, extended components are used by using the proper html element and extending it with an is attribute `is="razilo-button"`.


# Base Components


## razilo-icon (base)


```html
<razilo-icon name="" size="" rotate="" flip="" border spin pulse inverse fw></razilo-icon>
```


All icons are supplied via [font-awesome](http://fortawesome.github.io/Font-Awesome/) which sould auto install if you pulled in razilocomponents via npm, all we do is abstract out the different class names allowing you to add them as attirbutes (better for binding tools), thes are then written to the class as a name (or you can alter the class directly). Basically this component allows you to use a dedicate icon tag instead of the 'i' tag which is not meant for icons really. For a full list of icons available please see their site. NOTE: you can add the attribute 'spin' to make icons spin. Styling can be applied direct to the element via standard css means, or you can have control via attributes such as size="2".


* __name__ - The icon to use as per font-awesome list (without the need for 'fa-' we only need the icon name).
* __size__ - The size as per font-awesome docs lg, 2, 3, 4, 5.
* __rotate__ - The orientation of the icon reotated from the current position such as 90, 80, 270.
* __flip__ - The orientation of the icon flipped across an axis such as horizontal, vertical.
* __border__ - Apply a border to the icon.
* __spin__ - Make the icon spin.
* __pulse__ - Make the icon spin in steps.
* __inverse__ - Invert the icon color (white icon).
* __fw__ - Set the icon to a fixed width (great for aligning icons).


__events__


* __attributechanged__ - Fired when a change to the attribute happens, contains detail of changes in event.detail.


## razilo-tag (base)


```html
<razilo-tag shape="" size="" color=""></razilo-tag>
```


Adds a tag with the contents being shown in a colored box in several shapes, use this for highlighting text.


* __size__ - The size as extra-small, small, medium, large, extra-large.
* __shape__ - The shape as round, rounded, oval or square.
* __color__ - The color as grey, blue, red, green, orange, black, pink, purple, yellow, aqua, white.


__events__


* __attributechanged__ - Fired when a change to the attribute happens, contains detail of changes in event.detail.


# Control Components


## is="razilo-button" (control)


```html
<button is="razilo-button" size="" color="" shape="" disabled></button>
```


A nice set of buttons that extend the default button element that allow us to control the look and feel like size, colour etc. Use with on-click attribute or click event listener.


* __size__ - Sizes include extra-small, small, medium, large, extra-large buttons.
* __color__ - Colours include grey, blue, red, green, orange, black, pink, purple, yellow, aqua, white.
* __shape__ - Shapes include square, round, rounded and oval.
* __disabled__ - Disables the button.


__events__


* __attributechanged__ - Fired when a change to the attribute happens, contains detail of changes in event.detail.


## razilo-choose (control)


```html
<razilo-choose placeholder="Choose something" value="" add disabled>
	<option value=""></option>
</razilo-choose>
```


A nice simple multiple select tool that lets you choose values from a drop down list like a select box works, but allows you to see your seelctions and remove them.


* __placeholder__ - Text to show with no selection.
* __add__ - Stops auto add on select and provides an add button to select values.
* __disabled__ - Disables the input.


__events__


* __change__ - Fired when a change to the selection happens.
* __attributechanged__ - Fired when a change to the attribute happens, contains detail of changes in event.detail.


__properties__


* __.value__ - The value set, usually an object.


## razilo-error (control)


```html
<razilo-error refresh="anything" error></razilo-error>
```


Any razilo-control element used inside razilo-error that has validation regex set will be checked by this when any value changes. You can use this to capture blocks of controls (will also check native controls like inputs for required attributes), adding to the error if value not set. The form will set the error attribute when any razilo-control element errors or any contained control is required and empty (skipping disabled ones) to allow you to easily error check your form contents in one go.


* __error__ - Set to 1 for an error and 0 for ok.
* __refresh__ - Change the value in this attribute, to refresh the error check.


__events__


* __attributechanged__ - Fired when a change to the attribute happens, contains detail of changes in event.detail.


__properties__


* __.value__ - Is there an error with the form, 0 for no 1 for yes


## razilo-insert (control)


```html
<razilo-insert name="testName" type="text" value="hello" placeholder="Type Something" match="Text to match" match-message="does not match" validate="^(\s*|[0-9-]+)$" validateMessage="Numbers only dude!" disabled error></razilo-insert>
```


A more advanced input with intgral error checking, validating values entered to regex supplied and outputting a message under the input on failure. In addition to validation, you may also send in an additional match attribute, meaning you can have validation, and if pass, will then move on to ensure matches the match value. This is great for email and password confirmation by using bind-attributes="{'match': someToMatch}" to send in the password to confirm against for the confirmation input. Sets error on validation or match fail.


* __name__ - The name of the form input.
* __type__ - The type of form input just like a normal input element.
* __value__ - The value of of the live input just like a normal input element.
* __placeholder__ - Text to show in the input box when empty.
* __match__ - A tet string to match, can be used to send in password to confirm using razilo-match="path.to.password".
* __matchMessage__ - Message to show if match is set and validation passes, good for confirming things like emails or passwords.
* __validate__ - A regex to validate to.
* __validateMessage__ - Message to show under input when error happens.
* __disabled__ - Disables the input.
* __error__ - Set to 1 for an error and 0 for ok, add this attribute manually to force check on load.


__events__


* __change__ - Fired when a change to the input value is complete.
* __keypress__ - Fired when a key is pressed, returning the event of the keypress.
* __error__ - Fired when an error in validation occurs, returning the validation error message.
* __attributechanged__ - Fired when a change to the attribute happens, contains detail of changes in event.detail.


__properties__


* __.value__ - The value as it would be on a normal input element


## razilo-level (control)


```html
<razilo-level level="3" maximum="5" icon-filled="" icon-empty="" disabled></razilo-level>
```


A nice way to show a level using icons (default to stars). Will show filled in icons 'level' amount of times continuing with empty icons until 'maximum' reached. Click the icon to set the level at that point.


* __level__ - The level currently set.
* __maximum__ - The maximum amount of level to be had.
* __icon-filled__ - [optional] The icon to use as filled icon as per razilo-icon name (default is 'star').
* __icon-empty__ - [optional] The icon to use as empty icon as per razilo-icon name (default is 'star-o').
* __disabled__ - Disables the level clicking.


__events__


* __change__ - Fired when a level is changed along with the level.
* __attributechanged__ - Fired when a change to the attribute happens, contains detail of changes in event.detail.


__properties__


* __.value__ - A number representing the level selected.


## razilo-paginate (control)


```html
<razilo-paginate value="2" pages="5"></razilo-paginate>
```


A nice way to manage pagination of tables. Use this to set a number of pages to something like a table, and the value of the selected page, the component will show controls to allow you to change the page selected. You can use value to control your pagination function, updating the table when change is fired on the pagination component. Will automatically do step forward, back and start end, restricting changes to pages only.


* __pages__ - The total number of pages.
* __value__ - The page selected.


__events__


* __change__ - Fired when a page is selected.
* __attributechanged__ - Fired when a change to the attribute happens, contains detail of changes in event.detail.


__properties__


* __.value__ - A number representing the page selected.


## is="razilo-select" (control)


```html
<select is="razilo-select">
    <option></option>
</select>
```


A simple wrapper for select boxes to style them like the razilo-input box. You can use razilo-repeat on options to output options for the select box.


__events__


* __attributechanged__ - Fired when a change to the attribute happens, contains detail of changes in event.detail.


## razilo-switch (control)


```html
<razilo-switch toggle="1" on-color="red" disabled></razilo-switch>
```


A nice toggle switch giving an off or on status showing as a gray off and green filled on switch, can be disabled and toggled manually by changing the toggle attribute.


* __toggle__ - The status of the switch in real time as 0 or 1. Change this value to toggle the switch.
* __on-color__ - Change the default green on color of the filled switch to red, blue or orange.
* __disabled__ - Disables the switch.


__events__


* __change__ - Fired when a switch has toggled.
* __attributechanged__ - Fired when a change to the attribute happens, contains detail of changes in event.detail.


__properties__


* __.value__ - A number, 0 for off, 1 for on.


# Overlay Components


## razilo-date-picker (overlay)


```html
<razilo-date-picker color="" value="" show></razilo-date-picker>
```


A modal box with a date picker inside, allowing you to select a date. This date picker does not require a format, as it does this correctly, setting a Date() object on the value (element.value) on change.


* __show__ - Show the date picker by adding this attribute, rmeove to hide.
* __color__ - The colour of the modal such as red, blue, green, orange, black or white [default].
* __value__ - The details of what was saved to element.value, i.e. [object]@12345678 retrive this object from element.value or via binding to the element value.


__events__


* __change__ - Fired when date is changed.
* __next*__ - Fired when next button clicked where * is day/month/year.
* __previous*__ - Fired when previous button clicked where * is day/month/year.
* __attributechanged__ - Fired when a change to the attribute happens, contains detail of changes in event.detail.


__properties__


* __.value__ - Date() object representing the data selected, format this as you wish.


__methods__


* __.razilobind.show()__ - Show the modal.
* __.razilobind.hide()__ - Hide the modal.


## razilo-message (overlay)


```html
<razilo-message delay="" color="" position="" shape="" show persist>
	<razilo-icon name="..." color="..." fw></razilo-icon>
	Your message here
</razilo-message>
```


A notification message that can be displayed in various positions around the screen and in various colours, auto hides after 'delay' amount of seconds. If fired whilst already in view, promotes the message to jiggle, resetting the delay timer to prolong the visibility. To trigger a message to be shown, set toggle attribute to 1 or hit show function on scope.


* __show__ - Set to show the overlay in animation mode (auto clears after 3 seconds, re-throw whilst shown will promote jiggle).
* __persist__ - Set to show the overlay in persistant mode.
* __position__ - Set to bottom, bottom-left, bottom-right, top, top-left or top-right to position the message when shown.
* __color__ - The colour of the message to help set message types, red, blue, green, orange, black or white [default].
* __shape__ - The shape of the box, such as round, rounded, oval or square [default].
* __delay__ - The delay amount in seconds, such as triple (9s), double (6s) or single (3) [default]


__events__


* __show__ - Fired when message is shown.
* __hide__ - Fired when message auto hides.
* __attributechanged__ - Fired when a change to the attribute happens, contains detail of changes in event.detail.


__methods__


* __.razilobind.show()__ - Show the message, which then auto hides after 'delay' seconds.
* __.razilobind.hide()__ - Hide a persistent message.


## razilo-modal (overlay)


```html
<razilo-modal size="" color="" show>
    <heading>
        Heading with close icon, omit this element to remove heading title block
    </heading>
    <main>
        Main Content
    </main>
    <footer>
        Footer content
    </footer>
</razilo-modal>
```


A modal box positioned centrally on the screen that auto adjusts height and width, When visible, the modal will show at XX% width dependant in size="" (or you can change with css "width: XXXpx; margin: -half_width;"). Adds scroll bar when reaching the limit of the browser window, adapting this to mobiles with a force full on devices less than certain width.


* __show__ - Set attribute to show modal, remove to hide.
* __color__ - The colour of the message to help set message types, red, blue, green, orange, black or white [default].
* __size__ - The basic size of the modal width such as small, large or medium [default] alternatively set the element width and -left margin.


__content__


* __<heading></heading>__ - Any content you want to show as a heading, also shows close icon.
* __<main></main>__ - Any content you want to show in the main area of the modal with scroll on large content.
* __<footer></footer>__ - Any content you want to show in the footer area of the modal.


__events__


* __show__ - Fired when modal is shown.
* __hide__ - Fired when modal is hidden.
* __attributechanged__ - Fired when a change to the attribute happens, contains detail of changes in event.detail.


__methods__


* __.razilobind.show()__ - Show the modal.
* __.razilobind.hide()__ - Hide the modal.


## razilo-time-picker (razilo-overlay)


```html
<razilo-time-picker format="" color="" value="" show></razilo-time-picker>
```


A modal box with a time picker inside, allowing you to select a time HH:MM format. Chang eth format attribute to add seconds, switch to 12 hour etc. Sets the time as a Date() object as of today with the correct time set, to allow you to format the time easily. Retrieve this value from element.value.


* __show__ - Show the time picker by adding this attribute, rmeove to hide.
* __format__ - The format to show the time in, defaulted to HH:MM, lookup dateFormat https://github.com/felixge/node-dateformat for details of the boundled dep.
* __color__ - The colour of the modal such as red, blue, green, orange, black or white [default].
* __value__ - The details of what was saved to element.value, i.e. [object]@12345678 retrieve this object from element.value or via binding to the element value.


__events__


* __change__ - Fired when time picker time is changed, also sends detail of time in set format.
* __attributechanged__ - Fired when a change to the attribute happens, contains detail of changes in event.detail.


__properties__


* __.value__ - Date() object representing today at the time selected, format this as you wish.


__methods__


* __.razilobind.show()__ - Show the modal.
* __.razilobind.hide()__ - Hide the modal.


# Resource Components


## razilo-partial (resource)


```html
<razilo-partial basepath="application/my-partials" partial="partial-one"></razilo-partial>
```


A partial loader to load content from a html file (html extension only) and render the contents in the element. On change of attributes, reload of partial happens meaning this can be used in conjunction with routing to create single page apps with multiple traversable app pages (without reload, see razilo-route and razilo-menu). Only works for same domain loading and requires javascript embedded tags to be swapped for html import with embedded script tags to promote loading of script from partial. this will happily load any razilo web component.

example of partial dependancy resolution, inside your partial html file (load js as html import with js embedded inside html script tags)


application/my-partials/partial-one.html

```html
<!-- partial dependancies -->
<link rel="stylesheet" type="text/css" href="....../style.css">
<link rel="import" href="...../logic.js.html">

<div>
    <!-- stuff here in partial -->
</div>
```


* __basepath__ - The base path for all your partials.
* __partial__ - The partial to load (without the .html part) this must resolve to a .html file and can include sub folders


__events__


* __loaded__ - Fired when partial hase finished being rendered onto screen.
* __attributechanged__ - Fired when a change to the attribute happens, contains detail of changes in event.detail.


__methods__


* __.razilobind.load()__ - Loads the modal based on internal reference of basepath and partial, use attributes to change these values and prmote auto load.


## razilo-route (resource)


```html
<razilo-route default="" value=""></razilo-route>
```


A nice element to hold route for a single page app, pushing changes on value to url and vice versa. Uses hashbang routing on url path. Use this in conjunection with razilo-partial and razilo-menu to get single page app with routing.


* __default__ - The route to use when no route is set, like your home page route.
* __value__ - The route selected by the url, set this to promote a change to url hash bang route and vice versa.


__events__


* __change__ - Fired when partial hase finished being rendered onto screen.
* __attributechanged__ - Fired when a change to the attribute happens, contains detail of changes in event.detail.


# Structure Components


## razilo-menu (structure)


```html
<razilo-menu side-logo="" side-logo-test="" top-logo="" top-logo-text="" children="" position="" home="" model="" value=""></razilo-menu>
```


Displays a mobile friendly left/right hand menu that takes up full length of the screen. When screen shrinks to mobile layout, menu changes to top menu with toggle menu icon. Menus can be nested up to 5 children and can also have navigable or benign parents (by omiting the route completely). To finsh off, you can add logo text that will automatically direct the user to home. Style the menu directly to have alter color, font etc. Data can either be set on model attribute as a valid JSON string (by using single quotes as the model attribute quotes, e.g. model='[{...}]') or can be set by altering the element.model property to a valid object. Use this in conjunction with razilo-page and razilo-route to create a basic page structure of menu and page area.


* __side-logo__ - Path to a logo image to use in menu when showing side menu.
* __side-logo-text__ - Any logo text to display under logo and above menu when showing side menu.
* __top-logo__ - Path to a logo image to use in top menu when showing top menu.
* __top-logo-text__ - Any logo text to display after logo when showing top menu.
* __children__ - Set to expandable to have child menu items hidden until parent is clicked.
* __position__ - Place menu on left or right side of the screen.
* __home__ - The default route to go to when none is set i.e. your home page.
* __model__ - The menu items to display as a JSON string, use single quotes for model='' to ensure you get a valid JSON string.
* __value__ - The value selected by the menu, set to update menu item selected, detect change and read value to pick up new selection by user.


Example of data structure for menus...

```json
model: [
	{"route":"one","label":"One long menu item","icon":"trash","menuItems":[
		{"route":"aaa","label":"AAA","icon":"spinner"},
		{"label":"BBB","icon":"car","menuItems":[
			{"route":"1111","label":"1111","icon":"cog"},
			{"route":"2222","label":"2222","icon":"home"}
		]}
	]},
	{"route":"two","label":"Two","icon":"refresh"},
	{"route":"three","label":"Three","icon":"user"}
]
```

__events__


* __attributechanged__ - Fired when a change to the attribute happens, contains detail of changes in event.detail.


__properties__


* __.value__ - The menu item selected.
* __.razilobind.model__ - The menu items to display as an array of objects containing label, route [optional], icon [optional], menuItems [optional] (use same structure for child menus).


## razilo-page (structure)


```html
<razilo-page position="right"></razilo-page>
```


Works along side razilo-menu to provide an area for page/application content to be placed. Places content in a scrollable area that adapts to mobile views along with razilo-menu. Set to left or right side of page when menu is always visible. If you use a left menu, use a right page and vice versa.


* __position__ - Place page on left or right side of the screen.
