(this["webpackJsonpvoice-bot-ui"]=this["webpackJsonpvoice-bot-ui"]||[]).push([[0],{11:function(t,e,n){t.exports=n(18)},16:function(t,e,n){},17:function(t,e,n){},18:function(t,e,n){"use strict";n.r(e);var a=n(0),s=n.n(a),i=n(5),o=n.n(i),r=(n(16),n(2)),c=n(3),u=n(9),l=n(6),p=n(1),h=n(10),m=n(7),d=n.n(m),f=(n(17),n(8)),y=n.n(f),g=function(){function t(e){Object(r.a)(this,t),this._artyom=e}return Object(c.a)(t,[{key:"loadCommands",value:function(t){var e=this._artyom;return e.addCommands([{indexes:["Hello","Hi","Hey"],action:function(){e.newPrompt({question:"Hello there! May I have your name please?",smart:!0,options:["My name is  *","This is *","* here"],onEndPrompt:function(){t("Hello there! May I have your name please?",!1)},onMatch:function(e,n){var a=n.charAt(0).toUpperCase()+n.slice(1);return function(){t("Welcome, "+a)}}})}},{indexes:["what's your name","your name"],action:function(){t("My name is Arya, what's yours?")}},{indexes:["Bye","Stop","Good Bye","Goodbye"],action:function(){t("stopAssistant")}},{indexes:["What's the time now?","time now"],action:function(){var e=new Date,n=e.getHours()+":"+e.getMinutes()+":"+e.getSeconds();t(n)}},{indexes:["What's the time in US East Coast?","US East Coast time"],action:function(){var e=(new Date).toLocaleString("en-US",{timeZone:"America/New_York"}),n=e.getHours()+":"+e.getMinutes()+":"+e.getSeconds();t(n)}},{indexes:[/How are you/,/Regular expressions supported/],smart:!0,action:function(){t("I'm fine, thanks for asking !")}}])}}]),t}(),v=new d.a,x=function(t){function e(t,n){var a;return Object(r.a)(this,e),(a=Object(u.a)(this,Object(l.a)(e).call(this,t,n))).transcriptCount=0,a.startAssistant=a.startAssistant.bind(Object(p.a)(a)),a.stopAssistant=a.stopAssistant.bind(Object(p.a)(a)),a.speakText=a.speakText.bind(Object(p.a)(a)),a.handleTextareaChange=a.handleTextareaChange.bind(Object(p.a)(a)),a.state={pulse:!1,micStatus:"",micText:"tap on microphone to get started...",transcripts:[],latestQuestion:""},new g(v).loadCommands(a.speakText),a}return Object(h.a)(e,t),Object(c.a)(e,[{key:"speakText",value:function(t){var e=!(arguments.length>1&&void 0!==arguments[1])||arguments[1],n=this;"stopAssistant"!==t?(n.transcriptCount=n.transcriptCount+1,n.setState({transcripts:n.state.transcripts.concat({id:n.transcriptCount,who:"Arya",text:t})}),e&&(n.setState({micText:"speaking..."}),v.say(t,{onEnd:function(){n.setState({micText:"listening..."})}}))):n.pulsate()}},{key:"startAssistant",value:function(){var t=this;console.log("Artyom succesfully started !"),v.initialize({lang:"en-GB",debug:!0,continuous:!0,soundex:!0,listen:!0}).then((function(){t.setState({micText:"listening..."})})).catch((function(t){console.error("Oopsy daisy, this shouldn't happen !",t)})),v.redirectRecognizedTextOutput((function(e,n){t.setState({micText:e}),n&&(t.setState({latestQuestion:e}),t.transcriptCount=t.transcriptCount+1,t.setState({transcripts:t.state.transcripts.concat({id:t.transcriptCount,who:"You",text:e})}),t.setState({micText:"listening..."}))})),v.when("NOT_COMMAND_MATCHED",(function(){t.speakText("Sorry, I can't answer that question. Contacting DeepMind for an answer. Please wait..."),setTimeout((function(){""!==t.state.latestQuestion&&(t.setState({latestQuestion:""}),fetch("https://tranquil-garden-78271.herokuapp.com/predict?q="+t.latestQuestion).then((function(t){return t.json()})).then((function(e){t.speakText(e.data)})))}),3e3)}))}},{key:"stopAssistant",value:function(){var t=this;v.fatality().then((function(){console.log("Arya has been succesfully stopped"),t.setState({micText:"tap on microphone to get started..."})})).catch((function(e){console.error("Oopsy daisy, this shouldn't happen neither!",e),t.setState({artyomActive:!1})}))}},{key:"handleTextareaChange",value:function(t){this.setState({textareaValue:t.target.value})}},{key:"pulsate",value:function(){var t=this;this.setState({pulse:!this.state.pulse},(function(){t.state.pulse?t.startAssistant():t.stopAssistant()}))}},{key:"render",value:function(){var t=this.state.pulse?"pulse pulse-active":"pulse",e=this.state.pulse?"transcript-show":"transcript-hide";return s.a.createElement("div",{className:"App"},s.a.createElement("header",{className:"App-header"},s.a.createElement("button",{onClick:this.pulsate.bind(this),className:t},s.a.createElement("img",{src:y.a,className:"App-logo",alt:"logo"})),s.a.createElement("p",{className:"micStatus anim-typewriter"},this.state.micText),s.a.createElement("div",{className:e},this.state.transcripts.map((function(t){return s.a.createElement("p",{className:"Arya"===t.who?"dialog-said":"dialog-heard",key:t.id},t.who+": "+t.text)})))))}}]),e}(s.a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(s.a.createElement(x,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(t){t.unregister()})).catch((function(t){console.error(t.message)}))},8:function(t,e,n){t.exports=n.p+"static/media/microphone.85e4dcb4.svg"}},[[11,1,2]]]);
//# sourceMappingURL=main.1db0bcfa.chunk.js.map