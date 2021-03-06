var Log, Service, Characteristic;
var AbstractService = require('./AbstractService');
var { Command, ExecutionState } = require('../overkiz-api');

class Fan extends AbstractService {
    constructor (homebridge, log, device, config) {
        super(homebridge, log, device);
		Log = log;
		Service = homebridge.hap.Service;
		Characteristic = homebridge.hap.Characteristic;

        this.service = new Service.Fan(device.getName());
        this.onState = this.service.getCharacteristic(Characteristic.On);
        this.onState.on('set', this.setOn.bind(this));
    
        if(this.device.widget.includes('Dimmer')) {
            this.speedState = this.service.addCharacteristic(Characteristic.RotationSpeed);
            this.speedState.on('set', this.setSpeed.bind(this));
        }
    }

    /**
	* Triggered when Homekit try to modify the Characteristic.On
	**/
    setOn(value, callback) {
        var commands = [];
        
        switch(this.device.widget) {
            case 'DimmerLight':
                if(value == 1) { callback(); break; } // Ignore 'on' command for dimmable light as homekit send 'on' + 'brightness'
            default:
                commands.push(new Command(value ? 'on' : 'off'));
            break;
        }
        if(commands.length) {
            this.device.executeCommand(commands, function(status, error, data) {}.bind(this), callback);
        }
    }
    
    /**
	* Triggered when Homekit try to modify the Characteristic.RotationSpeed
	**/
    setSpeed(value, callback) {
        var commands = new Command('setIntensity', [value]);
        this.device.executeCommand(commands, function(status, error, data) {}.bind(this), callback);
    }

    onStateUpdate(name, value) {
        var onState = null, speedState = null;

        switch(name) {
            case 'core:OnOffState':
                onState = value == 'on' ? true : false;
            break;
            case 'core:IntensityState':
            case 'core:LightIntensityState':
                speedState = value;
            break;
        }

        if (this.onState != null && onState != null)
            this.onState.updateValue(onState);
        if (this.speedState != null && speedState != null)
            this.speedState.updateValue(speedState);
    }
}

module.exports = Fan