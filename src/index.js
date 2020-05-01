const LIBRARIES = {
  OS: require("os"),
  Skill: require("../../../Libraries/Skill")
};

class DeviceIPAddress extends LIBRARIES.Skill{
  constructor(_main, _settings) {
    super(_main, _settings);

    this.Main.Manager.addAction("DeviceIPAddress.get", function(_intent, _socket){
      const NETWORK_INTERFACES = LIBRARIES.OS.networkInterfaces();

      loppToBreak:
      for(const INTERFACE_NAME in NETWORK_INTERFACES){
        for(let index = 0; index < NETWORK_INTERFACES[INTERFACE_NAME].length; index++){
          if(NETWORK_INTERFACES[INTERFACE_NAME][index].family === "IPv4"){
            if(NETWORK_INTERFACES[INTERFACE_NAME][index].internal === false){
              _intent.Variables.address = NETWORK_INTERFACES[INTERFACE_NAME][index].address;
              _intent.answer(_socket);
              break loppToBreak;
            }
          }
        }
      }
    });
  }
}

module.exports = DeviceIPAddress;
