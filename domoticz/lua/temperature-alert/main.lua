--
-- # Temperature Alert script for Domoticz #
-- 
-- Shuts down the Digital Signage unit when the temperature goes over a given
-- threshold. After a while also sets the state to "Off" for Wireless Switch
-- that the unit is connected to, to give it time to power off correctly.
-- 
-- Options & default values:
--   temperature_sensor : the name of the sensor to get temperature from
--     Default : 'Weather Station - THB'
--   signage_switch : the name of the switch the Digital Signage unit is
--                    connected to
--     Default : 'Digital Signage - Office'
--   temperature_sensor_critical_value : the critical temperature threshold
--     Default : 23
--   signage_switch_off_after : the delay in minutes before sending the "Off"
--                              state to the Wireless Switch
--     Default : 90 (Wait 90 minutes before sending the "Off" state)
--   signage_device_command : The command to send to the Digital Signage unit
--                            when the critical temperature threshold is reached
--     Default : "nircmdc exitwin poweroff" (Use NirCmd to power off the unit)

--
-- Domoticz passes information to scripts through a number of global tables
--
-- otherdevices, otherdevices_lastupdate and otherdevices_svalues are arrays for all devices: 
--   otherdevices['yourotherdevicename'] = "On"
--   otherdevices_lastupdate['yourotherdevicename'] = "2015-12-27 14:26:40"
--   otherdevices_svalues['yourotherthermometer'] = string of svalues
--
-- uservariables and uservariables_lastupdate are arrays for all user variables: 
--   uservariables['yourvariablename'] = 'Test Value'
--   uservariables_lastupdate['yourvariablename'] = '2015-12-27 11:19:22'
--
-- other useful details are contained in the timeofday table
--   timeofday['Nighttime'] = true or false
--   timeofday['SunriseInMinutes'] = number
--   timeofday['Daytime'] = true or false
--   timeofday['SunsetInMinutes'] = number
--   globalvariables['Security'] = 'Disarmed', 'Armed Home' or 'Armed Away'
--
-- To see examples of commands see: http://www.domoticz.com/wiki/LUA_commands#General
-- To get a list of available values see: http://www.domoticz.com/wiki/LUA_commands#Function_to_dump_all_variables_supplied_to_the_script
--
-- Based on your logic, fill the commandArray with device commands. Device name is case sensitive. 
--

local temperature_sensor = uservariables['TemperatureAlert_SensorName'] -- 'Weather Station - THB'
local signage_switch = uservariables['TemperatureAlert_SwitchName'] -- 'Digital Signage - Office'
local signage_device_host = uservariables['TemperatureAlert_DeviceHost'] -- 'test:test@192.168.0.5:8080'

local temperature_sensor_critical_value = uservariables['TemperatureAlert_CriticalTemp'] -- 23 -- degrees
local signage_switch_off_after = uservariables['TemperatureAlert_SwitchOffAfter'] -- 90 -- minutes

-- local signage_device_command = "nircmdc exitwin poweroff" 

commandArray = {}

function mysplit(inputstr, sep)
        if sep == nil then
                sep = "%s"
        end
        local t={} ; i=1
        for str in string.gmatch(inputstr, "([^"..sep.."]+)") do
                t[i] = str
                i = i + 1
        end
        return t
end

function printf(s,...)
    print(s:format(...))
end

function format_str(s,...)
    return s:format(...)
end

if (temperature_sensor == nil or signage_switch == nil or signage_device_host == nil
    or temperature_sensor_critical_value == nil or signage_switch_off_after == null) then
    print("Error: Required User Variables are not defined")
else
    local signage_device_url = 'http://' .. signage_device_host .. '/json.htm?'
    local shutdown_cmd_uri_path = 'type=command&param=system_shutdown'

    local signage_switch_off_after_cmd = format_str("Off AFTER %d", signage_switch_off_after * 60)

    -- print ("All based event fired");
    print ("Device based event fired");
    print ("Processing 'Temperature Alert' script")
    local temperature_value = devicechanged[temperature_sensor .. '_Temperature']
    if temperature_value ~= nil and temperature_value >= temperature_sensor_critical_value then
        -- Only continue if the temperature has actually changed AND it has
        -- exceeded the critical threshold
        
        --os.execute("nircmd cdrom open") -- Only used for testing
        print("The outside temperature has exceeded the critical level")
        print("Checking if the Signage Switch is On")
        if otherdevices[signage_switch] == "On" then
            -- Only execute commands if the switch is actually on
            -- os.execute(signage_device_command)
            print("Sending the Shutdown signal to the Signage Device...")
            commandArray['OpenURL'] = signage_device_url .. shutdown_cmd_uri_path
            printf("The power will be cut in %d minutes", signage_switch_off_after)
            commandArray[signage_switch] = signage_switch_off_after_cmd
        end
    end
end
--os.execute("nircmd cdrom open")
-- loop through all the devices
--for deviceName,deviceValue in pairs(otherdevices) do
--    if (deviceName=='myDevice') then
--        if deviceValue == "On" then
--            print("Device is On")
--        elseif deviceValue == "Off" then
--            commandArray['a device name'] = "On"
--            commandArray['Scene:MyScene'] = "Off"
--        end
--    end
--end

-- loop through all the variables
--for variableName,variableValue in pairs(uservariables) do
--    if (variableName=='myVariable') then
--        if variableValue == 1 then
--            commandArray['a device name'] = "On"
--            commandArray['Group:My Group'] = "Off AFTER 30"
--        end
--    end
--end

return commandArray
