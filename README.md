# homebridge-tahoma

Supports TaHoma (Somfy), Connexoon (Somfy), Cozytouch (Atlantic,Thermor,Sauter) and E.Connect 2 (Rexel) platforms on HomeBridge

# Support

Any support request must follow this process :
1. Execute failling operations from official app then from Homekit
2. Report your config to [https://dev.duboc.pro/tahoma](https://dev.duboc.pro/tahoma)
3. Browse or open issue with title corresponding to your device widget name (see picture below)
4. Provide your bridge last 4 digits (number visible as SETUP-XXXX-XXXX-XXXX at step 2.)
![Widget](https://dev.duboc.pro/img/widgets.png)

# Installation

1. Install homebridge using: npm install -g homebridge
2. Install this plugin using: npm install -g homebridge-tahoma
3. Update your configuration file. See bellow for a sample.

# Configuration

Minimal configuration sample:
```
{
	"bridge": {
		...
	},

	"description": "...",

	"accessories": [],

	"platforms":[
		{
			"platform": "Tahoma",
			"name": "My TaHoma Box",

			"user": "user@me.com",
			"password": "MyPassw0rd",
		}
	]
}
```

Configuration parameters:

| Parameter                  | Type			| Default		| Note                                                                                                                                                                  |
|----------------------------|----------|-----------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `user`               		 | String		| null				| mandatory, your TaHoma/Connexoon/Cozytouch/E.Connect account username                                                                                                                     |
| `password`             	 | String		| null				| mandatory, your TaHoma/Connexoon/Cozytouch/E.Connect account password                                                                                                                     |
| `service`              	 | String		| 'TaHoma'			| optional, service name ('TaHoma', 'Connexoon', 'Connexoon RTS', 'Cozytouch' or 'Rexel')																																																											|
| `refreshPeriod`            | Integer	| 1800					| optional, device states refresh period in seconds							 																										 																										|
| `pollingPeriod`            | Integer	| 0						| optional, bridge polling period in seconds for sensors events (0: no polling)							 																										 																										|
| `exclude`		             | String[]	| []					| optional, list of protocols (hue,enocean,zwave,io,rts), device types (eg. RollerShutter), device definitions (eg. WindowCovering) or device (name) to exclude																																										|
| `exposeScenarios`	         | Boolean	| false					| optional, expose TaHoma/Connexoon/Cozytouch scenarios as HomeKit switches. Could also specify a list of string corresponding to scenarios names to expose												|
| `forceType`		         | Object		| {}				| optional, list of device (name) to force with another type (see below). Ex. Fan recognised as Light can be force to Fan type											|
| `Alarm`		             | Object		| {}				| optional, Alarm configuration object (see below)										|
| `WindowCovering`		     | Object		| {}				| optional, WindowCovering configuration object (see below)								|
| `GarageDoorOpener`		 | Object		| {}				| optional, GarageDoorOpener configuration object (see below)							|																			 																																|

| Alarm parameters           | Type			| Default			| Note                                                                                                                                                                  |
|----------------------------|--------------|-------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `STAY_ARM`               	 | String		| 'A'				| optional, active zones (A,B,C) in 'Stay' mode                                                                             																						|
| `NIGHT_ARM`             	 | String		| 'B'				| optional, active zones (A,B,C) in 'Night' mode                                                                          																							|
| `occupancySensor`        	 | Boolean		| false				| optional, add an occupancy widget linked to the alarm                                                                          																							|

| WindowCovering parameters   | Type			| Default		| Note                                                                                                                                                                  |
|----------------------------|----------|-----------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `initPosition`	         | Integer	| 50			| optional, default position for UpDown rollershutter												|
| `defaultPosition`	         | Integer	| 0				| optional, final position for UpDown rollershutter after any command												|
| `reverse`	         		 | Boolean	| false			| optional, reverse up/down in case of bad mounting												|
| `blindMode`	       		 | String	| null			| optional, define main slider action (slates orientation or closure). By default, both closure and orientation will be set. When setting ``blindMode: "orientation"`` the blinds work in the following way: Opening the blinds or setting them to 100% will fully open them. Closing the blinds or setting them to 0% will fully close them. Setting the blinds to a value between 1% and 99% will first close the blinds and then adjust thier horizontal tilt in a way that 99% means fully horizonal = more light, and 1% means nearly closed = less light. When setting ``blindMode: "closure"`` the blinds work in the following way: Closing the blinds or setting them to 0% will fully close them. Opening the blinds or setting them to 100% will open them with specified orientation. |

| GarageDoorOpener parameters| Type			| Default		| Note                                                                                                                                                                  |
|----------------------------|----------|-----------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `cycle`	         		| Boolean	| false			| optional, activate restoring initial state for cyclic device without							|
| `reverse`	         		 | Boolean	| false			| optional, reverse up/down in case of bad mounting												|
| `stateless`	       		 | Boolean	| false			| optional, force stateless device detection (if your device hasn't state reports but don't react as it in HomeKit) |


Full configuration example:
```
{
	"bridge": {
		...
	},

	"description": "...",

	"accessories": [],

	"platforms":[
		{
			"platform": "Tahoma",
			"name": "My Tahoma",

			"user": "user@me.com",
			"password": "MyPassw0rd",
			"service": "TaHoma",
			"exclude": ["hue","rts","Garage Door"],
			"forceType": {"Beedrom Fan": "Fan"}
			"Alarm": {
				"STAY_ARM": "A,C",
				"NIGHT_ARM": "B"
			}
		}
	]
}
```

# Limitation

Some devices or configurations could not operate properly due to limited tests. Don't hesitate to open an issue if your device doesn't work properly.
Before opening issue, please submit your config with [this form](http://dev.duboc.pro/tahoma)

# Contribute

You are welcome to contribute to this plugin development by adding new kind of devices by adding implementation `.js` file in `accessories` folder or improving existing 'js' file.
These documentations could help you developing plugin :
[Obtaining my config](https://dev.duboc.pro/tahoma),
[HomeKit services and characteristics](https://github.com/KhaosT/HAP-NodeJS/blob/master/src/lib/gen/HomeKit.ts)

I do not expect any reward concerning this plugin, however, some users ask me for a [![Donate](https://img.shields.io/badge/Donate-PayPal-green.svg)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=L4X489MG7FUCN) button as sign of contribution. Feel free to use it.
