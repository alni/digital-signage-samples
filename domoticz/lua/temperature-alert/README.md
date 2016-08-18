# Temperature Alert for Domoticz #

Shuts down the Digital Signage unit when the temperature goes over a given threshold. After a while also sets the state to "Off" for Wireless Switch that the unit is connected to, to give it time to power off correctly.

## Requirements ##

Domoticz must be installed on both a Master (for example a Raspberry Pi) and the Digital Signage unit (preferable as a Service on Windows).

Both units must be connected to the same network.

The script must run from the Master.

### User Variables ###

The script need several User Variables to be defined before it can be used:

* `TemperatureAlert_SensorName` : (String) the name of the sensor to get temperature from
* `TemperatureAlert_SwitchName` : (String) the name of the switch the Digital Signage unit is connected to
* `TemperatureAlert_DeviceHost` : (String) the hostname of the Digital Signage unit (including username/password, ip-address and port)
* `TemperatureAlert_CriticalTemp` : (Integer) the critical temperature threshold
* `TemperatureAlert_SwitchOffAfter` : (Integer) the delay in minutes before sending the "Off" state to the Wireless Switch

## Options & default values: (Old/Deprecated) ##

* `temperature_sensor` : the name of the sensor to get temperature from
    * Default : 'Weather Station - THB'
* `signage_switch` : the name of the switch the Digital Signage unit is connected to
    * Default : 'Digital Signage - Office'
* `signage_device_host` : the hostname of the Digital Signage unit (including username/password, ip-address and port)
    * Default 'test:test@192.168.0.5:8080'
* `temperature_sensor_critical_value` : the critical temperature threshold
    * Default : 23
* `signage_switch_off_after` : the delay in minutes before sending the "Off" state to the Wireless Switch
    * Default : 90 (Wait 90 minutes before sending the "Off" state)
* `signage_device_command` : The command to send to the Digital Signage unit when the critical temperature threshold is reached
    * Default : "nircmdc exitwin poweroff" (Use NirCmd to power off the unit)