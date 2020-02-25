// ArtyomCommands.js
export default class ArtyomCommandsManager {
  // The ArtyomCommandsManager class expects as argument in the constructor
  // an already declared instance of Artyom.js
  constructor(ArtyomInstance) {
    this._artyom = ArtyomInstance;
  }

  // Execute the loadCommands method to inject the methods to the instance of Artyom
  loadCommands(callback) {
    let Artyom = this._artyom;

    // Here you can load all the commands that you want to Artyom
    return Artyom.addCommands([
      {
        indexes: ["Hello", "Hi", "Hey"],
        action: () => {
          Artyom.newPrompt({
            question: "Hello there! May I have your name please?",
            smart: true, //We set the smart property to true to accept wildcards
            options: ["My name is  *", "This is *", "* here"],
            onEndPrompt: () => {
              callback("Hello there! May I have your name please?", false);
            },
            onMatch: (i, wildcard) => {
              // i returns the index of the given options
              var action;
              var name = wildcard.charAt(0).toUpperCase() + wildcard.slice(1);
              action = () => {
                callback("Welcome, " + name);
              };

              // A function needs to be returned in onMatch event
              // in order to accomplish what you want to execute
              return action;
            }
          });
          //callback("Hello there! May I have your name please?");
        }
      },
      {
        indexes: ["what's your name", "your name"],
        action: () => {
          callback("My name is Arya, what's yours?");
        }
      },
      {
        indexes: ["Bye", "Stop", "Good Bye", "Goodbye"],
        action: () => {
          callback("stopAssistant");
        }
      },
      {
        indexes: ["What's the time now?", "time now"],
        action: () => {
          var today = new Date();
          var time =
            today.getHours() +
            ":" +
            today.getMinutes() +
            ":" +
            today.getSeconds();
          callback(time);
        }
      },
      {
        indexes: ["What's the time in US East Coast?", "US East Coast time"],
        action: () => {
          var usaToday = new Date().toLocaleString("en-US", {
            timeZone: "America/New_York"
          });
          var usaTime =
            usaToday.getHours() +
            ":" +
            usaToday.getMinutes() +
            ":" +
            usaToday.getSeconds();
          callback(usaTime);
        }
      },
      {
        indexes: [/How are you/, /Regular expressions supported/],
        smart: true,
        action: () => {
          callback("I'm fine, thanks for asking !");
        }
      }
    ]);
  }
}
