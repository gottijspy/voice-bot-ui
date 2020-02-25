import React from "react";
import Artyom from "artyom.js";
import "./App.css";
import microphone from "./microphone.svg";
import ArtyomCommandsManager from "./ArtyomCommands.js";

const Arya = new Artyom();

class App extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.transcriptCount = 0;

    // Add `this` context to the handler functions
    this.startAssistant = this.startAssistant.bind(this);
    this.stopAssistant = this.stopAssistant.bind(this);
    this.speakText = this.speakText.bind(this);
    this.handleTextareaChange = this.handleTextareaChange.bind(this);

    this.state = {
      pulse: false,
      micStatus: "",
      micText: "tap on microphone to get started...",
      transcripts: [],
      latestQuestion: ""
    };

    // Load some commands to Artyom using the commands manager
    let CommandsManager = new ArtyomCommandsManager(Arya);
    CommandsManager.loadCommands(this.speakText);
  }

  speakText(msg, speak = true) {
    let _this = this;

    if (msg === "stopAssistant") {
      _this.pulsate();
      return;
    }

    _this.transcriptCount = _this.transcriptCount + 1;
    _this.setState({
      transcripts: _this.state.transcripts.concat({
        id: _this.transcriptCount,
        who: "Arya",
        text: msg
      })
    });

    if (speak) {
      _this.setState({ micText: "speaking..." });
      Arya.say(msg, {
        onEnd: function() {
          _this.setState({ micText: "listening..." });
        }
      });
    }
  }

  startAssistant() {
    let _this = this;

    console.log("Artyom succesfully started !");

    Arya.initialize({
      lang: "en-GB",
      debug: true,
      continuous: true,
      soundex: true,
      listen: true
    })
      .then(() => {
        _this.setState({ micText: "listening..." });
      })
      .catch(err => {
        console.error("Oopsy daisy, this shouldn't happen !", err);
      });

    Arya.redirectRecognizedTextOutput(function(text, isFinal) {
      _this.setState({ micText: text });
      if (isFinal) {
        _this.setState({ latestQuestion: text });
        _this.transcriptCount = _this.transcriptCount + 1;
        _this.setState({
          transcripts: _this.state.transcripts.concat({
            id: _this.transcriptCount,
            who: "You",
            text: text
          })
        });

        _this.setState({ micText: "listening..." });
      }
    });

    // Add the event listener
    Arya.when("NOT_COMMAND_MATCHED", () => {
      _this.speakText(
        "Sorry, I can't answer that question. Contacting DeepMind for an answer. Please wait..."
      );

      setTimeout(function() {
        var question = _this.state.latestQuestion;

        if (question !== "") {
          _this.setState({ latestQuestion: "" });
          fetch(
            "https://tranquil-garden-78271.herokuapp.com/predict?q=" +
              _this.latestQuestion
          )
            .then(res => res.json())
            .then(res => {
              _this.speakText(res.data);
            });
        }
      }, 3000);
    });
  }

  stopAssistant() {
    let _this = this;

    Arya.fatality()
      .then(() => {
        console.log("Arya has been succesfully stopped");
        _this.setState({ micText: "tap on microphone to get started..." });
      })
      .catch(err => {
        console.error("Oopsy daisy, this shouldn't happen neither!", err);

        _this.setState({
          artyomActive: false
        });
      });
  }

  handleTextareaChange(event) {
    this.setState({
      textareaValue: event.target.value
    });
  }

  pulsate() {
    this.setState({ pulse: !this.state.pulse }, () => {
      if (this.state.pulse) {
        this.startAssistant();
      } else {
        this.stopAssistant();
      }
    });
  }

  render() {
    let btn_class = this.state.pulse ? "pulse pulse-active" : "pulse";
    let dialog_class = this.state.pulse ? "transcript-show" : "transcript-hide";

    return (
      <div className="App">
        <header className="App-header">
          {/* Microphone */}
          <button onClick={this.pulsate.bind(this)} className={btn_class}>
            <img src={microphone} className="App-logo" alt="logo" />
          </button>

          {/* recognition in progress */}
          <p className="micStatus anim-typewriter">{this.state.micText}</p>

          {/* Speech Transcripts */}
          <div className={dialog_class}>
            {this.state.transcripts.map(transcript => (
              <p
                className={
                  transcript.who === "Arya" ? "dialog-said" : "dialog-heard"
                }
                key={transcript.id}
              >
                {transcript.who + ": " + transcript.text}
              </p>
            ))}
          </div>
        </header>
      </div>
    );
  }
}

export default App;
